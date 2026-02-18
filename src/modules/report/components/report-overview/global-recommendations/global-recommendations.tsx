import {
  Group,
  List,
  Paper,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconClock, IconRocket, IconTelescope } from '@tabler/icons-react';

import type { StrideReport } from '@/modules/report/report.types';

interface GlobalRecommendationsProps {
  recommendations: StrideReport['globalRecommendations'];
}

export function GlobalRecommendations({
  recommendations,
}: GlobalRecommendationsProps) {
  const sections = [
    {
      icon: IconRocket,
      color: 'red',
      title: 'Short Term',
      subtitle: 'Immediate actions',
      items: recommendations.shortTerm,
    },
    {
      icon: IconClock,
      color: 'yellow',
      title: 'Medium Term',
      subtitle: '1-3 months',
      items: recommendations.mediumTerm,
    },
    {
      icon: IconTelescope,
      color: 'cyan',
      title: 'Long Term',
      subtitle: '3-12 months',
      items: recommendations.longTerm,
    },
  ];

  return (
    <Paper
      p="lg"
      radius="md"
      withBorder
      bg="var(--mantine-color-secondary-filled)"
      style={{ borderColor: 'var(--mantine-color-secondaryLight-filled)' }}
    >
      <Group gap="sm" mb="lg">
        <ThemeIcon variant="light" color="cyan" size="lg" radius="md">
          <IconRocket size={20} />
        </ThemeIcon>
        <Title order={3} size="h4">
          Global Recommendations
        </Title>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
        {sections.map((section) => (
          <Paper
            key={section.title}
            p="md"
            radius="md"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <Group gap="sm" mb="sm">
              <ThemeIcon
                variant="light"
                color={section.color}
                size="md"
                radius="md"
              >
                <section.icon size={16} />
              </ThemeIcon>
              <div>
                <Text fw={600} size="sm">
                  {section.title}
                </Text>
                <Text size="xs" c="dimmed">
                  {section.subtitle}
                </Text>
              </div>
            </Group>
            <List size="sm" spacing={8} type="ordered">
              {section.items.map((item, i) => (
                <List.Item key={i}>
                  <Text size="sm" c="dimmed" style={{ lineHeight: 1.5 }}>
                    {item}
                  </Text>
                </List.Item>
              ))}
            </List>
          </Paper>
        ))}
      </SimpleGrid>
    </Paper>
  );
}
