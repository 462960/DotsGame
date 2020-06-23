import React, { createContext } from "react";
import { useLocalStore } from "mobx-react";

import * as API from "./api";

export const StoreContext = createContext<any>(undefined);

type Props = {
  children: JSX.Element | null;
};

interface Store {
  getSettings: () => void;
  preSet: object | null;
  userSettings: object | null;
  getWinners: () => void;
  winners: object[];
  // loaders: Array<object>;
  // Interchangable in many cases
  loaders: object[];
  addLoader: (loader: object) => void;
  removeLoader: (i: number) => void;
}

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const store = useLocalStore<Store>(() => ({
    preSet: null,
    userSettings: null,
    winners: [],
    getSettings: async () => {
      const res = await API.gameSettings();
      store.preSet = res;
      //   console.log(`getSettings: ${res.easyMode.field}`);
    },
    getWinners: async () => {
      const res = await API.gameWinners();
      store.winners = res;
      //   console.log(`getWinners: ${res[0]}`);
    },

    loaders: [{ name: "probe" }],
    addLoader: (loader) => {
      store.loaders.push(loader);
    },
    removeLoader: (i) => {
      store.loaders = [
        ...store.loaders.slice(0, i),
        ...store.loaders.slice(i + 1),
      ];
    },
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
