import { Badge, Table, Text, UnstyledButton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

import {
  RISK_MANTINE_COLORS,
  STRIDE_COLORS,
  STRIDE_LABELS,
  type Threat,
} from '@/modules/report/report.types';

interface ThreatTableProps {
  threats: Threat[];
  onThreatClick: (threat: Threat) => void;
}

export function ThreatTable({ threats, onThreatClick }: ThreatTableProps) {
  return (
    <Table
      highlightOnHover
      verticalSpacing="sm"
      horizontalSpacing="md"
      style={{ tableLayout: 'fixed' }}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ width: '38%' }}>Threat</Table.Th>
          <Table.Th style={{ width: '22%' }}>Category</Table.Th>
          <Table.Th style={{ width: '15%' }}>Risk</Table.Th>
          <Table.Th style={{ width: '17%' }}>Confidence</Table.Th>
          <Table.Th style={{ width: '8%' }}></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {threats.map((threat) => (
          <Table.Tr
            key={threat.id}
            style={{ cursor: 'pointer' }}
            onClick={() => onThreatClick(threat)}
          >
            <Table.Td>
              <Text size="sm" fw={500} lineClamp={1}>
                {threat.title}
              </Text>
            </Table.Td>
            <Table.Td>
              <Badge
                size="sm"
                variant="light"
                style={{
                  backgroundColor: `${STRIDE_COLORS[threat.stride]}18`,
                  color: STRIDE_COLORS[threat.stride],
                }}
              >
                {STRIDE_LABELS[threat.stride]}
              </Badge>
            </Table.Td>
            <Table.Td>
              <Badge size="sm" color={RISK_MANTINE_COLORS[threat.riskLevel]}>
                {threat.riskLevel}
              </Badge>
            </Table.Td>
            <Table.Td>
              <Text size="sm" c="dimmed">
                {threat.confidence}
              </Text>
            </Table.Td>
            <Table.Td>
              <UnstyledButton>
                <IconChevronRight
                  size={16}
                  color="var(--mantine-color-dimmed)"
                />
              </UnstyledButton>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
