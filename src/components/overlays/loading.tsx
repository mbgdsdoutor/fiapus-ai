import { LoadingOverlay } from '@mantine/core';
import { useAtomValue } from 'jotai';

import { globalStore } from '@/data/store/global.atoms';

export function Loading() {
  const isLoading = useAtomValue(globalStore.isLoadingAtom);

  return (
    <LoadingOverlay
      visible={isLoading}
      zIndex={1000}
      overlayProps={{ radius: 'sm', blur: 2 }}
    />
  );
}
