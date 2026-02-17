import {
  Badge,
  Group,
  Paper,
  RingProgress,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  RISK_MANTINE_COLORS,
  STRIDE_COLORS,
  STRIDE_LABELS,
  type StrideReport,
} from '@/modules/report/report.types';

interface RiskOverviewDashboardProps {
  riskOverview: StrideReport['riskOverview'];
}

export function RiskOverviewDashboard({
  riskOverview,
}: RiskOverviewDashboardProps) {
  const total = Object.values(riskOverview.riskDistribution).reduce(
    (a, b) => a + b,
    0,
  );

  const chartData = Object.entries(riskOverview.riskDistribution).map(
    ([key, value]) => ({
      name: STRIDE_LABELS[key as keyof typeof STRIDE_LABELS],
      shortName: STRIDE_LABELS[key as keyof typeof STRIDE_LABELS].slice(0, 4),
      value,
      color: STRIDE_COLORS[key as keyof typeof STRIDE_COLORS],
    }),
  );

  const ringData = chartData.map((d) => ({
    value: (d.value / total) * 100,
    color: d.color,
    tooltip: `${d.name}: ${d.value}`,
  }));

  return (
    <Paper p="lg" radius="md" withBorder>
      <Group gap="sm" mb="lg">
        <ThemeIcon
          variant="light"
          color={RISK_MANTINE_COLORS[riskOverview.overallRisk]}
          size="lg"
          radius="md"
        >
          <IconAlertTriangle size={20} />
        </ThemeIcon>
        <div>
          <Title order={3} size="h4">
            Risk Overview
          </Title>
          <Text size="sm" c="dimmed">
            {total} threats identified across all components
          </Text>
        </div>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
        {/* Ring Progress */}
        <Stack align="center" gap="sm">
          <RingProgress
            size={160}
            thickness={14}
            roundCaps
            sections={ringData}
            label={
              <Stack align="center" gap={0}>
                <Text size="xl" fw={700}>
                  {total}
                </Text>
                <Text size="xs" c="dimmed">
                  Threats
                </Text>
              </Stack>
            }
          />
          <Group gap="xs" wrap="wrap" justify="center">
            {chartData.map((d) => (
              <Badge
                key={d.name}
                size="xs"
                variant="dot"
                color={d.color}
                style={{ '--badge-dot-size': '8px' } as React.CSSProperties}
              >
                {d.shortName} ({d.value})
              </Badge>
            ))}
          </Group>
        </Stack>

        {/* Bar Chart */}
        <div style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 0, right: 16, top: 0, bottom: 0 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="shortName"
                width={40}
                tick={{ fill: '#999', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: '#1f1f1f',
                  border: '1px solid #333',
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(value, _name, item) => {
                  const safeValue = typeof value === 'number' ? value : 0;
                  return [safeValue, item.payload.name];
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Critical Components */}
        <Stack gap="sm">
          <Text fw={600} size="sm">
            Most Critical Components
          </Text>
          {riskOverview.mostCriticalComponents.map((comp) => (
            <Paper
              key={comp}
              p="sm"
              radius="sm"
              style={{
                background: 'rgba(224,49,49,0.08)',
                border: '1px solid rgba(224,49,49,0.2)',
              }}
            >
              <Group gap="xs">
                <IconAlertTriangle size={14} color="#e03131" />
                <Text size="sm" fw={500}>
                  {comp}
                </Text>
              </Group>
            </Paper>
          ))}
        </Stack>
      </SimpleGrid>
    </Paper>
  );
}
