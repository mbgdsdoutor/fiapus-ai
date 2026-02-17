import { Button, Card, Flex, LoadingOverlay, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

import { fileToBase64 } from '@/common/utils/file.utils';
import { ColorfulAnimatedBorder } from '@/components/animations/colorful-border/colorful-border';
import { SendIcon } from '@/components/icons';
import { openai } from '@/openai-client';

import { ReportInputFileList } from './report-input-file-list';
import { ReportInputTypeMenu } from './report-input-type-menu';
import classes from './report-input.module.css';

const diagramTypes = [
  'Diagrama Conceitual (High-level)',
  'Diagrama Lógico / Funcional',
  'Diagrama Físico / Infraestrutura',
  'Outro tipo de diagrama',
];

export type DiagramType = (typeof diagramTypes)[number];

export function ReportInput() {
  const [selectedDiagramType, setSelectedDiagramType] = useState<
    string | undefined
  >();
  const [uploadedFile, setUploadedFile] = useState<File | undefined>();
  const [isSending, setIsSending] = useState(false);

  const isReadyToSend = !!uploadedFile;

  const analyzeDiagram = async (imageFile: File, diagramType: DiagramType) => {
    const imageBase64 = await fileToBase64(imageFile);

    const promptByDiagramType: Record<DiagramType, string> = {
      'Diagrama Conceitual (High-level)': `
O diagrama é conceitual e de alto nível.
Foque em:
- Trust boundaries implícitos
- Falta de controles de identidade
- Pontos únicos de falha (SPOF)
- Riscos arquiteturais gerais
Evite detalhes de infraestrutura ou configuração específica.
    `,

      'Diagrama Lógico / Funcional': `
O diagrama é lógico/funcional.
Foque em:
- Fluxos entre componentes
- Comunicação entre serviços
- Autenticação e autorização
- Possíveis falhas de segregação de responsabilidades
    `,

      'Diagrama Físico / Infraestrutura': `
O diagrama representa infraestrutura.
Foque em:
- Exposição de rede
- Isolamento (subnets, zonas, regiões)
- Serviços públicos vs privados
- Alta disponibilidade, escalabilidade e resiliência
- Misconfigurações comuns de cloud
    `,

      'Outro tipo de diagrama': `
O tipo de diagrama não é totalmente claro.
Faça suposições explícitas e indique incertezas na análise.
    `,
    };

    const response = await openai.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content:
            'Você é um especialista em segurança de software e threat modeling usando o modelo STRIDE.',
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: `
O usuário informou que o tipo do diagrama é:
"${diagramType}"

${promptByDiagramType[diagramType]}

Tarefas:
1. Identifique os principais componentes do sistema
2. Identifique trust boundaries
3. Classifique riscos usando STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)
4. Liste vulnerabilidades e gargalos arquiteturais
5. Sugira melhorias práticas e arquiteturais
            `,
            },
            {
              type: 'input_image',
              image_url: imageBase64,
              detail: 'high',
            },
          ],
        },
      ],
    });

    return response.output_text;
  };

  const handleSelectDiagramType = (diagramType: string | undefined) => {
    setSelectedDiagramType(diagramType);
  };

  const handleUpload = (file: File) => {
    setUploadedFile(file);
  };

  const handleRemoveFile = () => {
    setUploadedFile(undefined);
    setSelectedDiagramType(undefined);
  };

  const handleSendReport = async () => {
    setIsSending(true);

    notifications.show({
      title: 'Erro ao enviar arquivos',
      message: 'Tente novamente mais tarde',
      color: 'red.7',
    });
  };

  return (
    <ColorfulAnimatedBorder radius="lg" withBoxShadow={false} animated>
      <LoadingOverlay
        visible={isSending}
        zIndex={1000}
        overlayProps={{ radius: 'lg', blur: 2 }}
      />
      <Flex className={classes.reportInputContainer} direction="column">
        <Card bg="secondaryLight" p="xs" w="100%" radius="lg">
          <Flex justify="space-between">
            <Flex gap="xs">
              <ReportInputTypeMenu
                diagramTypes={diagramTypes}
                selectedDiagramType={selectedDiagramType}
                handleSelectDiagramType={handleSelectDiagramType}
                handleUpload={handleUpload}
              />
            </Flex>

            <Button
              className={classes.sendButton}
              disabled={!isReadyToSend || isSending}
              onClick={handleSendReport}
            >
              <Flex gap="md" align="center">
                {isReadyToSend && <Text>Enviar</Text>}
                <SendIcon color={isReadyToSend ? 'white' : '#D7D7D7'} />
              </Flex>
            </Button>
          </Flex>
        </Card>

        {selectedDiagramType && uploadedFile && (
          <ReportInputFileList
            diagramType={selectedDiagramType}
            uploadedFile={uploadedFile}
            handleRemoveFile={handleRemoveFile}
          />
        )}
      </Flex>
    </ColorfulAnimatedBorder>
  );
}
