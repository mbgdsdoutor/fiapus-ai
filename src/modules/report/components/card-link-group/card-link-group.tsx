import { Box, Flex } from '@mantine/core';

import { ContactIcon } from '@/components/icons/contact-icon';
import { StatisticsIcon } from '@/components/icons/statistics-icon';
import { SupportIcon } from '@/components/icons/support-icon';
import { statisticsRoutesPaths } from '@/modules/statistics/statistics-routes';

import { CardLink } from '../card-link';

export default function CardLinkGroup() {
  return (
    <Box>
      <Flex justify="center" gap="sm" mb="sm" mt="xl">
        <CardLink
          title="Acompanhe seus diagramas"
          description="Consulte e analise os relatórios dos seus diagramas."
          icon={<StatisticsIcon />}
          link={statisticsRoutesPaths.root}
        />
      </Flex>
      <Flex justify="center" gap="sm" mb="sm">
        <CardLink
          title="Dúvidas Frequentes"
          description="Ficou em dúvida? Tire suas dúvidas aqui."
          icon={<SupportIcon />}
          link=""
        />
        <CardLink
          title="Suporte"
          description="Entre em contato sempre que precisar."
          icon={<ContactIcon />}
          link=""
        />
      </Flex>
    </Box>
  );
}
