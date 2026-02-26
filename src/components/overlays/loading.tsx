import { Image, LoadingOverlay } from '@mantine/core';
import { useAtomValue } from 'jotai';

import FiapusHappy from '@/assets/fiapus-happy.png';
import { globalStore } from '@/data/store/global.atoms';

import classes from './loading.module.css';

export function Loading() {
  const isLoading = useAtomValue(globalStore.isLoadingAtom);

  return (
    <LoadingOverlay
      visible={isLoading}
      zIndex={1000}
      overlayProps={{ radius: 'sm', blur: 2 }}
      styles={{
        root: {
          position: 'fixed',
        },
      }}
      loaderProps={{
        children: (
          <div className={classes.loadingContainer}>
            <div className={classes.loader}></div>
            <div className={classes.loaderImg}>
              <Image src={FiapusHappy} alt="fiapus feliz" w={60} h="auto" />
            </div>
          </div>
        ),
      }}
    />
  );
}
