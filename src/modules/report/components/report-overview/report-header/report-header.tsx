import { Badge, Group, Paper, Stack, Text, Title } from '@mantine/core';
import {
  IconCalendar,
  IconChartDots,
  IconShieldCheck,
} from '@tabler/icons-react';

import { RISK_MANTINE_COLORS, type StrideReport } from '../../../report.types';

interface ReportHeaderProps {
  metadata: StrideReport['metadata'];
  overallRisk: StrideReport['riskOverview']['overallRisk'];
}

export function ReportHeader({ metadata, overallRisk }: ReportHeaderProps) {
  const date = new Date(metadata.analysisDate);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Paper
      p="xl"
      radius="lg"
      style={{
        background:
          'linear-gradient(135deg, rgba(0,200,200,0.08) 0%, rgba(0,100,150,0.04) 100%)',
        borderLeft: '4px solid var(--mantine-color-cyan-6)',
      }}
    >
      <Group justify="space-between" align="flex-start" wrap="wrap">
        <Stack gap="xs">
          <Group gap="sm">
            <IconShieldCheck size={32} color="var(--mantine-color-cyan-5)" />
            <Title
              order={1}
              style={{ fontSize: '1.8rem', letterSpacing: '-0.02em' }}
            >
              STRIDE Threat Analysis Report
            </Title>
          </Group>
          <Group gap="lg" mt={4}>
            <Group gap={6}>
              <IconChartDots size={16} color="var(--mantine-color-dimmed)" />
              <Text size="sm" c="dimmed">
                {metadata.diagramType}
              </Text>
            </Group>
            <Group gap={6}>
              <IconCalendar size={16} color="var(--mantine-color-dimmed)" />
              <Text size="sm" c="dimmed">
                {formattedDate}
              </Text>
            </Group>
          </Group>
        </Stack>
        <Badge
          size="xl"
          variant="light"
          color={RISK_MANTINE_COLORS[overallRisk]}
          style={{ fontSize: '0.85rem', padding: '12px 20px' }}
        >
          Overall Risk: {overallRisk}
        </Badge>
      </Group>
    </Paper>
  );
}
