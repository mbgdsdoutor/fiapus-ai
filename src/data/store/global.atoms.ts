import { atom } from 'jotai';

const isLoadingAtom = atom<boolean>(false);

export const globalStore = {
  isLoadingAtom,
};
