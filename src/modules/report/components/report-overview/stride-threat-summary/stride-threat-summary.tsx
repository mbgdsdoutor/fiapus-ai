import { Badge, Group, Progress, Stack, Text } from '@mantine/core';

import {
  STRIDE_COLORS,
  STRIDE_LABELS,
  type StrideCategory,
} from '@/modules/report/report.types';

interface StrideThreatSummaryProps {
  threats: { stride: StrideCategory }[];
}

export function StrideThreatSummary({ threats }: StrideThreatSummaryProps) {
  const counts: Partial<Record<StrideCategory, number>> = {};
  threats.forEach((t) => {
    counts[t.stride] = (counts[t.stride] || 0) + 1;
  });

  const total = threats.length;
  const entries = Object.entries(counts) as [StrideCategory, number][];

  return (
    <Stack gap={6}>
      <Text
        size="xs"
        fw={600}
        c="dimmed"
        tt="uppercase"
        style={{ letterSpacing: '0.05em' }}
      >
        STRIDE Distribution
      </Text>
      <Progress.Root size="sm" radius="xl">
        {entries.map(([cat, count]) => (
          <Progress.Section
            key={cat}
            value={(count / total) * 100}
            color={STRIDE_COLORS[cat]}
          >
            <Progress.Label>{count}</Progress.Label>
          </Progress.Section>
        ))}
      </Progress.Root>
      <Group gap={6} wrap="wrap">
        {entries.map(([cat, count]) => (
          <Badge
            key={cat}
            size="xs"
            variant="light"
            style={{
              backgroundColor: `${STRIDE_COLORS[cat]}18`,
              color: STRIDE_COLORS[cat],
            }}
          >
            {STRIDE_LABELS[cat]}: {count}
          </Badge>
        ))}
      </Group>
    </Stack>
  );
}
