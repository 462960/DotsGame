import React, { useState, useEffect, useContext } from "react";

import { StoreContext } from "../utils/store";
import GameControls from "./GameControls";
import GamePool from "./GamePool";

interface Props {}

const GameContainer: React.FC<Props> = () => {
  const store = useContext(StoreContext);

  useEffect(() => {
    store.getSettings();
    store.getWinners();
  }, []);

  return (
    <div className="game-container">
      <GameControls />
      <GamePool />
    </div>
  );
};

export default GameContainer;
