import { fileToBase64 } from '@/common/utils/file.utils';
import { openai } from '@/openai-client';

import type { DiagramType } from '../components/report-input';

const STRIDE_SCHEMA_JSON = `
{
  "metadata": {
    "diagramType": "string",
    "analysisDate": "ISO-8601 date string",
    "assumptions": ["string"],
    "limitations": ["string"]
  },
  "architectureSummary": {
    "detectedArchitectureStyle": "string",
    "mainComponents": ["string"],
    "trustBoundaries": ["string"],
    "externalDependencies": ["string"]
  },
  "riskOverview": {
    "overallRisk": "Low | Medium | High | Critical",
    "riskDistribution": {
      "Spoofing": "number",
      "Tampering": "number",
      "Repudiation": "number",
      "Information Disclosure": "number",
      "Denial of Service": "number",
      "Elevation of Privilege": "number"
    },
    "mostCriticalComponents": ["string"]
  },
  "components": [
    {
      "componentName": "string",
      "componentType": "string",
      "trustBoundaryCrossed": "boolean",
      "threats": [
        {
          "id": "string",
          "stride": "Spoofing | Tampering | Repudiation | Information Disclosure | Denial of Service | Elevation of Privilege",
          "title": "string",
          "description": "string",
          "attackScenario": "string",
          "impact": "string",
          "riskLevel": "Low | Medium | High | Critical",
          "confidence": "Low | Medium | High",
          "assumptions": ["string"],
          "recommendations": ["string"]
        }
      ]
    }
  ],
  "globalRecommendations": {
    "shortTerm": ["string"],
    "mediumTerm": ["string"],
    "longTerm": ["string"]
  }
}
`;

const diagramTypeGuidance: Record<DiagramType, string> = {
  'Diagrama Conceitual (High-level)': `
O diagrama é conceitual e de alto nível.
- Priorize trust boundaries implícitos
- Identifique ausência de controles explícitos
- Evite detalhes de infraestrutura ou configuração
`,

  'Diagrama Lógico / Funcional': `
O diagrama é lógico/funcional.
- Analise fluxos entre componentes
- Autenticação, autorização e comunicação entre serviços
- Segregação de responsabilidades
`,

  'Diagrama Físico / Infraestrutura': `
O diagrama representa infraestrutura.
- Exposição de rede e isolamento
- Serviços públicos vs privados
- Alta disponibilidade, escalabilidade e resiliência
- Misconfigurações comuns de cloud
`,

  'Outro tipo de diagrama': `
O tipo do diagrama não está totalmente claro.
- Declare suposições explicitamente
- Indique incertezas na análise
`,
};

export async function analyzeDiagram(
  imageFile: File,
  diagramType: DiagramType,
): Promise<string> {
  const imageBase64 = await fileToBase64(imageFile);

  const response = await openai.responses.create({
    model: 'gpt-4.1-mini',
    input: [
      {
        type: 'message',
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: `
Você é um especialista em segurança de software e threat modeling usando a metodologia STRIDE.

OBJETIVO:
Gerar um relatório em pt-br de ameaças STRIDE estruturado em JSON a partir do diagrama fornecido.

TIPO DE DIAGRAMA INFORMADO PELO USUÁRIO:
"${diagramType}"

DIRETRIZES:
${diagramTypeGuidance[diagramType]}

REGRAS OBRIGATÓRIAS:
- Retorne EXCLUSIVAMENTE um JSON válido
- NÃO inclua texto fora do JSON
- Siga ESTRITAMENTE o schema fornecido
- Baseie-se apenas no que é visível ou inferível no diagrama
- Declare suposições e incertezas explicitamente
- Não invente componentes inexistentes

METODOLOGIA STRIDE:
Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege

SCHEMA DE RETORNO (JSON):
${STRIDE_SCHEMA_JSON}
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
}
