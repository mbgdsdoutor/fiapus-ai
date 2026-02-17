import { fileToBase64 } from '@/common/utils/file.utils';
import { openai } from '@/openai-client';

import type { DiagramType } from '../components/report-input';

export const analyzeDiagram = async (
  imageFile: File,
  diagramType: DiagramType,
) => {
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
