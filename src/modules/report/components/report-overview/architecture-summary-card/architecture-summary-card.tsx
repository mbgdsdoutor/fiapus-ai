import {
  Badge,
  Box,
  Flex,
  Group,
  Image,
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
  diagramImage: string;
}

export function ArchitectureSummaryCard({
  summary,
  diagramImage,
}: ArchitectureSummaryCardProps) {
  const sections = [
    {
      icon: IconComponents,
      color: 'cyan',
      title: 'Componentes Principais',
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
      title: 'Dependências Externas',
      items: summary.externalDependencies,
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
      <Flex gap="md">
        <Box w="50%">
          <Image
            src={diagramImage}
            alt="imagem do diagrama analisado"
            w="100%"
            height="auto"
          />
        </Box>
        <Box>
          <Group gap="sm" mb="md">
            <ThemeIcon variant="light" color="cyan" size="lg" radius="md">
              <IconTopologyRing size={20} />
            </ThemeIcon>
            <div>
              <Title
                order={3}
                size="h4"
                c="var(--mantine-color-secondaryLight-filled)"
              >
                Resumo da Arquitetura
              </Title>
              <Badge variant="outline" color="secondaryLight" mt={4}>
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
                  <Text
                    fw={600}
                    size="sm"
                    c="var(--mantine-color-secondaryLight-filled)"
                  >
                    {section.title}
                  </Text>
                </Group>
                <List size="sm" spacing={4} center>
                  {section.items.map((item) => (
                    <List.Item key={item}>
                      <Text
                        size="sm"
                        c="var(--mantine-color-secondaryLight-filled)"
                      >
                        {item}
                      </Text>
                    </List.Item>
                  ))}
                </List>
              </Stack>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </Paper>
  );
}
