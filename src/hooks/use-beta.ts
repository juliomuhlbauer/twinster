import create from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface BetaState {
  isBeta: boolean;
  threads: {
    downloaded: number;
    resetedMonth: number;
  };
  activateUser: () => void;
  onThreadDownload: () => void;
  resetBeta: () => void;
  resetThreadDownloaded: () => void;
}

export const useBeta = create<BetaState>()(
  persist(
    immer((set) => ({
      isBeta: false,
      threads: {
        downloaded: 0,
        resetedMonth: new Date().getMonth(),
      },
      activateUser: () => set((state) => ({ isBeta: true })),
      onThreadDownload: () => {
        set((state) => ({
          threads: {
            downloaded: state.threads.downloaded + 1,
            resetedMonth: new Date().getMonth(),
          },
        }));
      },
      resetThreadDownloaded: () => {
        set((state) => ({
          threads: {
            downloaded: 0,
            resetedMonth: new Date().getMonth(),
          },
        }));
      },
      resetBeta: () => set((state) => ({ isBeta: false })),
    })),
    {
      name: "twinster-beta",
      version: 1,
    }
  )
);
