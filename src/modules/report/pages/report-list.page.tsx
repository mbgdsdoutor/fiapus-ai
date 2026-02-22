import { Container, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { FiapusSpeechBubble } from '@/components/data-display/fiapus-speech-bubble';
import { globalStore } from '@/data/store/global.atoms';

import {
  ArchitectureSummaryCard,
  ComponentsSection,
  GlobalRecommendations,
  ReportHeader,
  RiskOverviewDashboard,
  ThreatDrawer,
} from '../components/report-overview';
import { reportRoutesPaths } from '../report-routes';
import {
  FiapusStatusEnum,
  type StrideReport,
  type Threat,
} from '../report.types';

const mockReport: StrideReport = {
  metadata: {
    diagramType: 'Diagrama Lógico / Funcional',
    analysisDate: '2026-02-17T12:00:00Z',
    assumptions: [
      'O diagrama representa um fluxo de integração em ambiente Azure',
      'A autenticação é feita via Azure Entra ID utilizando OAuth 2.0',
      'A comunicação entre componentes ocorre via HTTPS',
      'Logic Apps possuem conectores para serviços internos e externos',
    ],
    limitations: [
      'Configurações detalhadas de segurança não estão visíveis no diagrama',
      'Não é possível validar políticas específicas de RBAC',
      'Não há informações sobre firewall ou WAF',
      'O diagrama não explicita mecanismos de monitoramento e alertas',
    ],
  },

  architectureSummary: {
    detectedArchitectureStyle: 'API Gateway com Orquestração de Workflows',
    mainComponents: [
      'Usuário / Cliente HTTP',
      'Azure Entra ID',
      'Azure API Management',
      'Azure Logic Apps',
      'Serviços Azure',
      'Serviços SaaS externos',
      'Web Services REST e SOAP',
    ],
    trustBoundaries: [
      'Usuário para Azure API Management',
      'API Management para Logic Apps',
      'Logic Apps para serviços externos',
    ],
    externalDependencies: [
      'Azure Entra ID',
      'Serviços SaaS de terceiros',
      'Web Services REST',
      'Web Services SOAP',
    ],
  },

  riskOverview: {
    overallRisk: 'Medium',
    riskDistribution: {
      spoofing: 3,
      tampering: 3,
      repudiation: 2,
      informationDisclosure: 4,
      denialOfService: 2,
      elevationOfPrivilege: 2,
    },
    mostCriticalComponents: ['Azure API Management', 'Azure Logic Apps'],
  },

  components: [
    {
      id: 'api-management',
      componentName: 'Azure API Management',
      componentType: 'api-gateway',
      trustBoundaryCrossed: true,
      threats: [
        {
          id: 'apim-01',
          stride: 'spoofing',
          title: 'Uso de token OAuth comprometido',
          description:
            'Um atacante pode reutilizar um token OAuth roubado para se passar por um cliente legítimo.',
          attackScenario:
            'O token é interceptado em um endpoint inseguro ou vazado via logs e reutilizado para chamadas à API.',
          impact: 'Acesso não autorizado a APIs e workflows internos.',
          riskLevel: 'Medium',
          confidence: 'High',
          assumptions: [
            'Tokens possuem tempo de vida elevado',
            'Não há validação adicional de contexto do cliente',
          ],
          recommendations: [
            'Utilizar tokens de curta duração',
            'Validar issuer, audience e assinatura do token',
            'Habilitar Conditional Access no Entra ID',
          ],
        },
        {
          id: 'apim-02',
          stride: 'tampering',
          title: 'Manipulação de payload de requisição',
          description:
            'Payloads enviados ao gateway podem ser alterados para explorar falhas nas Logic Apps.',
          attackScenario:
            'Um atacante envia parâmetros maliciosos para modificar o fluxo de execução.',
          impact: 'Execução indevida de workflows e corrupção de dados.',
          riskLevel: 'Medium',
          confidence: 'Medium',
          assumptions: [
            'Não há validação rigorosa de schema',
            'Logic Apps confiam nos dados recebidos',
          ],
          recommendations: [
            'Aplicar validação de schema no API Management',
            'Sanitizar inputs',
            'Rejeitar campos inesperados',
          ],
        },
        {
          id: 'apim-03',
          stride: 'informationDisclosure',
          title: 'Exposição de dados sensíveis em respostas da API',
          description:
            'Respostas da API podem incluir informações internas ou sensíveis.',
          attackScenario:
            'Mensagens de erro detalhadas ou payloads excessivos retornam dados confidenciais.',
          impact: 'Vazamento de informações sensíveis.',
          riskLevel: 'High',
          confidence: 'High',
          assumptions: [
            'APIs retornam mensagens de erro detalhadas',
            'Não há mascaramento de dados',
          ],
          recommendations: [
            'Mascarar dados sensíveis',
            'Padronizar mensagens de erro',
            'Revisar contratos de API',
          ],
        },
      ],
    },

    {
      id: 'logic-apps',
      componentName: 'Azure Logic Apps',
      componentType: 'workflow-orchestration',
      trustBoundaryCrossed: true,
      threats: [
        {
          id: 'logic-01',
          stride: 'informationDisclosure',
          title: 'Envio indevido de dados para serviços externos',
          description:
            'Logic Apps podem encaminhar dados sensíveis para serviços SaaS ou Web Services externos.',
          attackScenario:
            'Um workflow envia informações confidenciais para um conector externo sem validação.',
          impact: 'Exposição de dados sensíveis a terceiros.',
          riskLevel: 'High',
          confidence: 'Medium',
          assumptions: [
            'Conectores externos possuem acesso amplo',
            'Não há classificação de dados',
          ],
          recommendations: [
            'Classificar dados sensíveis',
            'Criptografar dados em trânsito',
            'Revisar conectores externos',
          ],
        },
        {
          id: 'logic-02',
          stride: 'elevationOfPrivilege',
          title: 'Uso excessivo de permissões em conectores',
          description:
            'Logic Apps podem operar com permissões maiores do que o necessário.',
          attackScenario:
            'Um workflow comprometido acessa recursos além de sua função original.',
          impact: 'Acesso indevido a sistemas internos ou externos.',
          riskLevel: 'Medium',
          confidence: 'Medium',
          assumptions: [
            'Managed Identity com escopo amplo',
            'Permissões não revisadas periodicamente',
          ],
          recommendations: [
            'Aplicar princípio do menor privilégio',
            'Revisar permissões regularmente',
            'Separar responsabilidades por workflow',
          ],
        },
      ],
    },
  ],

  globalRecommendations: {
    shortTerm: [
      'Habilitar logs detalhados no API Management',
      'Aplicar rate limiting em APIs públicas',
      'Revisar permissões das Logic Apps',
    ],
    mediumTerm: [
      'Automatizar validações de segurança',
      'Revisar conectores externos',
      'Padronizar tratamento de erros',
    ],
    longTerm: [
      'Adotar threat modeling contínuo',
      'Integrar com SIEM',
      'Redesenhar fluxos para reduzir trust boundaries',
    ],
  },
};

export default function ReportListPage() {
  const diagramImage = useAtomValue(globalStore.diagramImageAtom);
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const handleThreatClick = (threat: Threat) => {
    setSelectedThreat(threat);
    openDrawer();
  };

  const getResultStatus = (): FiapusStatusEnum => {
    const isHighOrCriticalRisk =
      mockReport.riskOverview.overallRisk === 'High' ||
      mockReport.riskOverview.overallRisk === 'Critical';
    const isMediumCriticalRisk =
      mockReport.riskOverview.overallRisk === 'Medium';

    if (isHighOrCriticalRisk) return FiapusStatusEnum.SAD_RESULT;

    if (isMediumCriticalRisk) return FiapusStatusEnum.NEUTRAL;

    return FiapusStatusEnum.HAPPY_RESULT;
  };

  if (!diagramImage) {
    return <Navigate to={reportRoutesPaths.root} replace />;
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <FiapusSpeechBubble status={getResultStatus()} />
        <ReportHeader
          metadata={mockReport.metadata}
          overallRisk={mockReport.riskOverview.overallRisk}
        />
        <ArchitectureSummaryCard
          summary={mockReport.architectureSummary}
          diagramImage={diagramImage}
        />
        <RiskOverviewDashboard riskOverview={mockReport.riskOverview} />
        <ComponentsSection
          components={mockReport.components}
          onThreatClick={handleThreatClick}
        />
        <GlobalRecommendations
          recommendations={mockReport.globalRecommendations}
        />
      </Stack>

      <ThreatDrawer
        threat={selectedThreat}
        opened={drawerOpened}
        onClose={closeDrawer}
      />
    </Container>
  );
}
