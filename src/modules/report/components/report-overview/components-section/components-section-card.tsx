import { Badge, Group, Paper, Stack, ThemeIcon, Title } from '@mantine/core';
import { IconArrowsExchange, IconBox } from '@tabler/icons-react';

import { StrideThreatSummary } from '../stride-threat-summary/stride-threat-summary';
import { ThreatTable } from '../threat-table/threat-table';

import type {
  ComponentThreatAnalysis,
  Threat,
} from '@/modules/report/report.types';

interface ComponentCardProps {
  component: ComponentThreatAnalysis;
  onThreatClick: (threat: Threat) => void;
}

export function ComponentCard({
  component,
  onThreatClick,
}: ComponentCardProps) {
  const criticalCount = component.threats.filter(
    (t) => t.riskLevel === 'Critical',
  ).length;
  const highCount = component.threats.filter(
    (t) => t.riskLevel === 'High',
  ).length;

  return (
    <Paper
      p="lg"
      radius="md"
      withBorder
      bg="var(--mantine-color-secondary-filled)"
      style={{ borderColor: 'var(--mantine-color-secondaryLight-filled)' }}
    >
      <Stack gap="md">
        {/* Component Header */}
        <Group justify="space-between" wrap="wrap">
          <Group gap="sm">
            <ThemeIcon
              variant="light"
              color={
                criticalCount > 0 ? 'red' : highCount > 0 ? 'orange' : 'cyan'
              }
              size="lg"
              radius="md"
            >
              <IconBox size={20} />
            </ThemeIcon>
            <div>
              <Title order={4}>{component.componentName}</Title>
              <Badge size="xs" variant="light" color="gray" mt={2}>
                {component.componentType}
              </Badge>
            </div>
          </Group>
          <Group gap="xs">
            {component.trustBoundaryCrossed && (
              <Badge
                size="sm"
                variant="light"
                color="yellow"
                leftSection={<IconArrowsExchange size={12} />}
              >
                Trust Boundary
              </Badge>
            )}
            <Badge size="sm" variant="filled" color="gray">
              {component.threats.length} threats
            </Badge>
          </Group>
        </Group>

        <StrideThreatSummary threats={component.threats} />
        <ThreatTable
          threats={component.threats}
          onThreatClick={onThreatClick}
        />
      </Stack>
    </Paper>
  );
}
