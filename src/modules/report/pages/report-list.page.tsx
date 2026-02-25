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
import { FiapusStatusEnum, type Threat } from '../report.types';

export default function ReportListPage() {
  const diagramImage = useAtomValue(globalStore.diagramImageAtom);
  const diagramReportResult = useAtomValue(globalStore.diagramReportResultAtom);
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const handleThreatClick = (threat: Threat) => {
    setSelectedThreat(threat);
    openDrawer();
  };

  const getResultStatus = (): FiapusStatusEnum => {
    if (diagramReportResult) {
      const isHighOrCriticalRisk =
        diagramReportResult.riskOverview.overallRisk === 'High' ||
        diagramReportResult.riskOverview.overallRisk === 'Critical';
      const isMediumCriticalRisk =
        diagramReportResult.riskOverview.overallRisk === 'Medium';

      if (isHighOrCriticalRisk) return FiapusStatusEnum.SAD_RESULT;

      if (isMediumCriticalRisk) return FiapusStatusEnum.NEUTRAL;

      return FiapusStatusEnum.HAPPY_RESULT;
    }

    return FiapusStatusEnum.NEUTRAL;
  };

  if (!diagramImage || !diagramReportResult) {
    return <Navigate to={reportRoutesPaths.root} replace />;
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <FiapusSpeechBubble status={getResultStatus()} />
        <ReportHeader
          metadata={diagramReportResult.metadata}
          overallRisk={diagramReportResult.riskOverview.overallRisk}
        />
        <ArchitectureSummaryCard
          summary={diagramReportResult.architectureSummary}
          diagramImage={diagramImage}
        />
        <RiskOverviewDashboard
          riskOverview={diagramReportResult.riskOverview}
        />
        <ComponentsSection
          components={diagramReportResult.components}
          onThreatClick={handleThreatClick}
        />
        <GlobalRecommendations
          recommendations={diagramReportResult.globalRecommendations}
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
