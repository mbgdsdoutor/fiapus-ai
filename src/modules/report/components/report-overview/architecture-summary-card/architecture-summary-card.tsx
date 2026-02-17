import {
  Badge,
  Group,
  List,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconCloud,
  IconComponents,
  IconShieldLock,
  IconTopologyRing,
} from '@tabler/icons-react';

import type { StrideReport } from '@/modules/report/report.types';

interface ArchitectureSummaryCardProps {
  summary: StrideReport['architectureSummary'];
}

export function ArchitectureSummaryCard({
  summary,
}: ArchitectureSummaryCardProps) {
  const sections = [
    {
      icon: IconComponents,
      color: 'cyan',
      title: 'Main Components',
      items: summary.mainComponents,
    },
    {
      icon: IconShieldLock,
      color: 'yellow',
      title: 'Trust Boundaries',
      items: summary.trustBoundaries,
    },
    {
      icon: IconCloud,
      color: 'violet',
      title: 'External Dependencies',
      items: summary.externalDependencies,
    },
  ];

  return (
    <Paper p="lg" radius="md" withBorder>
      <Group gap="sm" mb="md">
        <ThemeIcon variant="light" color="cyan" size="lg" radius="md">
          <IconTopologyRing size={20} />
        </ThemeIcon>
        <div>
          <Title order={3} size="h4">
            Architecture Summary
          </Title>
          <Badge variant="dot" color="cyan" mt={4}>
            {summary.detectedArchitectureStyle}
          </Badge>
        </div>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        {sections.map((section) => (
          <Stack key={section.title} gap="xs">
            <Group gap={6}>
              <section.icon
                size={16}
                color={`var(--mantine-color-${section.color}-5)`}
              />
              <Text fw={600} size="sm">
                {section.title}
              </Text>
            </Group>
            <List size="sm" spacing={4} center>
              {section.items.map((item) => (
                <List.Item key={item}>
                  <Text size="sm" c="dimmed">
                    {item}
                  </Text>
                </List.Item>
              ))}
            </List>
          </Stack>
        ))}
      </SimpleGrid>
    </Paper>
  );
}
