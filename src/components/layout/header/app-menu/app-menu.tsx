import { ActionIcon, Image, Menu } from '@mantine/core';
import { NavLink } from 'react-router-dom';

import MenuIcon from '@/assets/menu-icon.svg';
import ReportIcon from '@/assets/report-icon.svg';
import StatisticsIcon from '@/assets/statistics-icon.svg';
import SupportIcon from '@/assets/support-icon.svg';
import { PlusIcon } from '@/components/icons';
import { reportRoutesPaths } from '@/modules/report/report-routes';
import { statisticsRoutesPaths } from '@/modules/statistics/statistics-routes';

export function AppMenu() {
  return (
    <Menu shadow="md" width={280}>
      <Menu.Target>
        <ActionIcon
          variant="outline"
          aria-label="Menu"
          radius="lg"
          w={56}
          h={40}
        >
          <Image src={MenuIcon} alt="menu icon" w={24} h={24} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={NavLink}
          to={reportRoutesPaths.root}
          leftSection={<PlusIcon color="#ed145b" />}
        >
          Novo laudo
        </Menu.Item>
        <Menu.Item
          component={NavLink}
          to={reportRoutesPaths.list}
          leftSection={
            <Image
              src={ReportIcon}
              alt="icone de acompanhar laudos"
              w={16}
              h={16}
            />
          }
        >
          Acompanhe seus laudos
        </Menu.Item>
        <Menu.Item
          component={NavLink}
          to={statisticsRoutesPaths.root}
          leftSection={
            <Image
              src={StatisticsIcon}
              alt="icone de relatórios"
              w={16}
              h={16}
            />
          }
        >
          Relatórios
        </Menu.Item>
        <Menu.Item
          component={NavLink}
          to={reportRoutesPaths.root}
          leftSection={
            <Image src={SupportIcon} alt="icone de suporte" w={16} h={16} />
          }
        >
          Suporte
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
