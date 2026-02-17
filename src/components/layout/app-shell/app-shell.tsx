import { Flex } from '@mantine/core';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/layout/header/header';
import { Loading } from '@/components/overlays';
import { globalStore } from '@/data/store/global.atoms';

export default function AppShell() {
  const [isLoading, setIsLoading] = useAtom(globalStore.isLoadingAtom);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div
      style={{
        height: '100%',
        overflow: isLoading ? 'hidden' : 'auto',
        position: 'relative',
      }}
    >
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
