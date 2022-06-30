import produce, { Draft } from "immer";
import create, { State, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

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

const immer =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (partial, replace) => {
        const nextState =
          typeof partial === "function"
            ? produce(partial as (state: Draft<T>) => T)
            : (partial as T);
        return set(nextState, replace);
      },
      get,
      api
    );

export const useBeta = create<BetaState>(
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
