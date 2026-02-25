import { atom } from 'jotai';

import type { StrideReport } from '@/modules/report/report.types';

const isLoadingAtom = atom<boolean>(true);
const diagramImageAtom = atom<string | null>(null);
const diagramReportResultAtom = atom<StrideReport | null>();

export const globalStore = {
  isLoadingAtom,
  diagramImageAtom,
  diagramReportResultAtom,
};
