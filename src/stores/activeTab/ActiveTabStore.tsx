'use client';
import { createWithEqualityFn } from 'zustand/traditional';

interface ActiveTabState {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

export const useActiveTabStore = createWithEqualityFn<ActiveTabState>(
  (set) => ({
    activeTab: 0, //TabsMap.Exchange.index,
    setActiveTab: (tab: number) => set({ activeTab: tab }),
  }),
  Object.is,
);
