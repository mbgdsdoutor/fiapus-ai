import { Flex, Title } from '@mantine/core';

import { AppMenu } from './app-menu';
import classes from './header.module.css';
import { NotificationsMenu } from './notifications-menu';
import { ProfileMenu } from './profile-menu';

export default function Header() {
  return (
    <header className={classes.header}>
      <Flex className={classes.headerOptions}>
        <AppMenu />
        <Title order={1} className={classes.headerTitle}>
          Fiapus <span>AI</span>
        </Title>
        <Flex gap="xs">
          <NotificationsMenu />
          <ProfileMenu />
        </Flex>
      </Flex>
    </header>
  );
}
