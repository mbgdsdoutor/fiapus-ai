import { Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconComponents } from '@tabler/icons-react';

import { ComponentCard } from './components-section-card';

import type {
  ComponentThreatAnalysis,
  Threat,
} from '@/modules/report/report.types';

interface ComponentsSectionProps {
  components: ComponentThreatAnalysis[];
  onThreatClick: (threat: Threat) => void;
}

export function ComponentsSection({
  components,
  onThreatClick,
}: ComponentsSectionProps) {
  const totalThreats = components.reduce((acc, c) => acc + c.threats.length, 0);

  return (
    <Stack gap="lg">
      <Group gap="sm">
        <ThemeIcon variant="light" color="cyan" size="lg" radius="md">
          <IconComponents size={20} />
        </ThemeIcon>
        <div>
          <Title order={3} size="h4">
            Análise de Componentes
          </Title>
          <Text size="sm" c="dimmed">
            {components.length} componentes · {totalThreats} ameaças
          </Text>
        </div>
      </Group>

      <Stack gap="md">
        {components.map((comp) => (
          <ComponentCard
            key={comp.id}
            component={comp}
            onThreatClick={onThreatClick}
          />
        ))}
      </Stack>
    </Stack>
  );
}
