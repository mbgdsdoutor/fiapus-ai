import { ActionIcon, Flex, Image, Menu } from '@mantine/core';

import BellIcon from '@/assets/bell-icon.svg';

export function NotificationsMenu() {
  return (
    <Menu shadow="md" width={360}>
      <Menu.Target>
        <ActionIcon
          variant="outline"
          aria-label="Menu"
          radius="lg"
          w={56}
          h={40}
        >
          <Image src={BellIcon} alt="icone de notificacoes" w={24} h={24} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Flex justify="space-between" align="center" px="md" py="xs">
          <Menu.Label fz="md" fw={400} p={0}>
            Notificações
          </Menu.Label>
        </Flex>
      </Menu.Dropdown>
    </Menu>
  );
}
