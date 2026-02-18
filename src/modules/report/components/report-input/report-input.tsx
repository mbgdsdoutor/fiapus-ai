import { Button, Card, Flex, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fileToBase64 } from '@/common/utils/file.utils';
import { ColorfulAnimatedBorder } from '@/components/animations/colorful-border/colorful-border';
import { SendIcon } from '@/components/icons';
import { globalStore } from '@/data/store/global.atoms';

import { reportRoutesPaths } from '../../report-routes';

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
  const navigate = useNavigate();
  const setDiagramImage = useSetAtom(globalStore.diagramImageAtom);
  const [selectedDiagramType, setSelectedDiagramType] = useState<
    string | undefined
  >();
  const [uploadedFile, setUploadedFile] = useState<File | undefined>();
  const [isSending, setIsSending] = useState(false);

  const isReadyToSend = !!uploadedFile;

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
    if (uploadedFile) {
      setIsSending(true);
      fileToBase64(uploadedFile)
        .then((file) => {
          setDiagramImage(file);
          navigate(reportRoutesPaths.list);
        })
        .catch(() => {
          notifications.show({
            title: 'Erro ao enviar arquivos',
            message: 'Tente novamente mais tarde',
            color: 'red.7',
          });
        })
        .finally(() => {
          setIsSending(false);
        });
    } else {
      notifications.show({
        title: 'Erro ao enviar arquivos',
        message: 'Tente novamente mais tarde',
        color: 'red.7',
      });
    }
  };

  return (
    <ColorfulAnimatedBorder radius="lg" withBoxShadow={false} animated>
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
