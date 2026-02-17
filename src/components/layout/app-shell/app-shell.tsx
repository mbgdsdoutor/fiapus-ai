import { Flex } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import Header from '@/components/layout/header/header';
import { Loading } from '@/components/overlays';

export default function AppShell() {
  return (
    <div style={{ height: '100%' }}>
      <Header />

      <Flex
        component="main"
        maw={1150}
        justify="center"
        px="md"
        py="xl"
        m="0 auto"
      >
        <Outlet />
        <Loading />
      </Flex>
    </div>
  );
}
