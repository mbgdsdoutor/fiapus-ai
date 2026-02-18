import { atom } from 'jotai';

const isLoadingAtom = atom<boolean>(true);
const diagramImageAtom = atom<string | null>(null);

export const globalStore = {
  isLoadingAtom,
  diagramImageAtom,
};
