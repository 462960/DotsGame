import React, { useState, useEffect, useContext } from "react";

import { StoreContext } from "../utils/store";
import GameControls from "./GameControls";
import GamePool from "./GamePool";

interface Props {}

const GameContainer: React.FC<Props> = () => {
  const store = useContext(StoreContext);
  const [mode, setMode] = useState("easyMode");
  const [name, setName] = useState("");
  const [timerID, setTimerID] = useState(null);
  const [cellID, setCellID] = useState(null);
  const [userSettings, setUserSettings] = useState(null);

  useEffect(() => {
    store.getSettings();
    // store.getWinners();
  }, []);

  useEffect(() => {
    // console.log(`I am useEffect ${}`)
  }, [mode]);

  const startGame = () => {
    console.log(`I am startGame`);
  };

  const generateCellID = () => {
    function checkIfCellUsed() {}

    checkIfCellUsed();
  };

  return (
    <div className="game-container">
      <GameControls
        mode={mode}
        name={name}
        setMode={setMode}
        setName={setName}
        startGame={startGame}
      />
      <GamePool mode={mode} />
    </div>
  );
};

export default GameContainer;
