import React, { createContext } from "react";
import { useLocalStore } from "mobx-react";
import dateFormat from "dateformat";

import * as API from "./api";

export const StoreContext = createContext<any>(undefined);

type Props = {
  children: JSX.Element | null;
};

interface Store {
  getSettings: () => void;
  preSet: object | null;
  selectorsModes: string[];
  getWinners: () => void;
  winners: object[];
  updateWinners: (x: string) => void;
}

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const store = useLocalStore<Store>(() => ({
    preSet: null,
    selectorsModes: [],
    // selectorsModes: ["easyMode", "normalMode", "hardMode"],
    winners: [],
    getSettings: async () => {
      const res = await API.gameSettings();
      store.preSet = res;
      store.selectorsModes = Object.keys(res);
    },
    getWinners: async () => {
      const res = await API.gameWinners();
      store.winners = res;
    },

    updateWinners: (name: string) => {
      const now = new Date();
      const formatted = dateFormat(now, "mmmm dS, yyyy, h:MM:ss TT");
      console.log(`Date: ${formatted}, Name: ${name}`);
      API.winnersUpdater(name, formatted);
      // API.winnersUpdater("Dev", "Email obmanutogo mozno?");
    },
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
