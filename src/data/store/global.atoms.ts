import { atom } from 'jotai';

const isLoadingAtom = atom<boolean>(true);

export const globalStore = {
  isLoadingAtom,
};
