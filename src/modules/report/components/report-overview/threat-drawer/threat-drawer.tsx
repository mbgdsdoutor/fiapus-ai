import {
  Badge,
  Divider,
  Drawer,
  Group,
  List,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconBomb,
  IconBulb,
  IconFlame,
  IconTarget,
} from '@tabler/icons-react';

import {
  RISK_MANTINE_COLORS,
  STRIDE_COLORS,
  STRIDE_LABELS,
  type Threat,
} from '@/modules/report/report.types';

interface ThreatDrawerProps {
  threat: Threat | null;
  opened: boolean;
  onClose: () => void;
}

export function ThreatDrawer({ threat, opened, onClose }: ThreatDrawerProps) {
  if (!threat) return null;

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm">
          <ThemeIcon
            variant="light"
            color={RISK_MANTINE_COLORS[threat.riskLevel]}
            size="lg"
            radius="md"
          >
            <IconFlame size={18} />
          </ThemeIcon>
          <div>
            <Title order={4} style={{ lineHeight: 1.2 }}>
              {threat.title}
            </Title>
            <Group gap={6} mt={4}>
              <Badge size="sm" color={RISK_MANTINE_COLORS[threat.riskLevel]}>
                {threat.riskLevel}
              </Badge>
              <Badge
                size="sm"
                variant="outline"
                style={{
                  borderColor: STRIDE_COLORS[threat.stride],
                  color: STRIDE_COLORS[threat.stride],
                }}
              >
                {STRIDE_LABELS[threat.stride]}
              </Badge>
              <Badge size="sm" variant="dot" color="gray">
                Credibilidade: {threat.confidence}
              </Badge>
            </Group>
          </div>
        </Group>
      }
      position="right"
      size="lg"
      padding="lg"
      overlayProps={{ backgroundOpacity: 0.4, blur: 4 }}
      styles={{
        header: {
          backgroundColor: 'var(--mantine-color-secondary-filled)',
        },
        content: {
          backgroundColor: 'var(--mantine-color-secondary-filled)',
        },
      }}
    >
      <Stack gap="lg">
        <div>
          <Text fw={600} size="sm" mb={6}>
            Descrição
          </Text>
          <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
            {threat.description}
          </Text>
        </div>

        <Paper
          p="md"
          radius="md"
          style={{
            background: 'rgba(224,49,49,0.06)',
            border: '1px solid rgba(224,49,49,0.15)',
          }}
        >
          <Group gap={6} mb={8}>
            <IconBomb size={16} color="#e03131" />
            <Text fw={600} size="sm">
              Cenário de Ataque
            </Text>
          </Group>
          <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
            {threat.attackScenario}
          </Text>
        </Paper>

        <Paper
          p="md"
          radius="md"
          style={{
            background: 'rgba(247,103,7,0.06)',
            border: '1px solid rgba(247,103,7,0.15)',
          }}
        >
          <Group gap={6} mb={8}>
            <IconTarget size={16} color="#f76707" />
            <Text fw={600} size="sm">
              Impacto
            </Text>
          </Group>
          <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
            {threat.impact}
          </Text>
        </Paper>

        <Divider />

        {threat.assumptions.length > 0 && (
          <div>
            <Group gap={6} mb={8}>
              <IconAlertCircle
                size={16}
                color="var(--mantine-color-yellow-5)"
              />
              <Text fw={600} size="sm">
                Suposições
              </Text>
            </Group>
            <List size="sm" spacing={4}>
              {threat.assumptions.map((a, i) => (
                <List.Item key={i}>
                  <Text size="sm" c="dimmed">
                    {a}
                  </Text>
                </List.Item>
              ))}
            </List>
          </div>
        )}

        <div>
          <Group gap={6} mb={8}>
            <IconBulb size={16} color="var(--mantine-color-cyan-5)" />
            <Text fw={600} size="sm">
              Recomendações
            </Text>
          </Group>
          <List size="sm" spacing={6} type="ordered">
            {threat.recommendations.map((r, i) => (
              <List.Item key={i}>
                <Text size="sm" c="dimmed">
                  {r}
                </Text>
              </List.Item>
            ))}
          </List>
        </div>
      </Stack>
    </Drawer>
  );
}
