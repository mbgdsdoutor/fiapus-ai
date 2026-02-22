import { BarChart, DonutChart } from '@mantine/charts';
import {
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

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

  const donutData = Object.entries(riskOverview.riskDistribution).map(
    ([key, value]) => ({
      name: STRIDE_LABELS[key as keyof typeof STRIDE_LABELS],
      value,
      color: STRIDE_COLORS[key as keyof typeof STRIDE_COLORS],
    }),
  );

  const barData = Object.entries(riskOverview.riskDistribution).map(
    ([key, value]) => ({
      category: STRIDE_LABELS[key as keyof typeof STRIDE_LABELS],
      Threats: value,
    }),
  );

  return (
    <Paper
      p="lg"
      radius="md"
      withBorder
      bg="var(--mantine-color-secondary-filled)"
      style={{ borderColor: 'var(--mantine-color-secondaryLight-filled)' }}
    >
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
            Visão geral dos riscos
          </Title>
          <Text size="sm" c="dimmed">
            {total} ameaças identificadas
          </Text>
        </div>
      </Group>

      <Grid>
        <Grid.Col span={3}>
          <Stack align="center" gap="sm">
            <DonutChart
              size={160}
              thickness={14}
              data={donutData}
              tooltipDataSource="segment"
              chartLabel={`${total} Threats`}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={9}>
          <BarChart
            h={200}
            data={barData}
            dataKey="category"
            orientation="vertical"
            series={[{ name: 'Threats', color: 'primary' }]}
            tickLine="none"
            gridAxis="none"
            yAxisProps={{ width: 180 }}
            barProps={{ radius: [0, 4, 4, 0], barSize: 16 }}
          />
        </Grid.Col>
      </Grid>

      <Stack gap="sm">
        <Text fw={600} size="sm">
          Componentes mais críticos
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
    </Paper>
  );
}
