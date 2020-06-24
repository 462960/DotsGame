import React, { useState, useEffect, useContext } from "react";

import { StoreContext } from "../utils/store";
import GameControls from "./GameControls";
import GamePool from "./GamePool";

interface Props {}

const GameContainer: React.FC<Props> = () => {
  const store = useContext(StoreContext);
  const [mode, setMode] = useState("easyMode");
  const [name, setName] = useState("");

  useEffect(() => {
    store.getSettings();
    // store.getWinners();
  }, []);

  return (
    <div className="game-container">
      <GameControls
        mode={mode}
        name={name}
        setMode={setMode}
        setName={setName}
      />
      <GamePool mode={mode} />
    </div>
  );
};

export default GameContainer;
