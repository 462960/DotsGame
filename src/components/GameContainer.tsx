import React, { useState, useEffect, useContext } from "react";

import { StoreContext } from "../utils/store";
import GameControls from "./GameControls";
import GamePool from "./GamePool";

interface Props {}

const GameContainer: React.FC<Props> = () => {
  const store = useContext(StoreContext);
  const [mode, setMode] = useState("");
  const [name, setName] = useState("");
  const [timerID, setTimerID] = useState(null);
  const [cellID, setCellID] = useState(null);
  const [userSettings, setUserSettings] = useState<object[] | null>(null);

  useEffect(() => {
    store.getSettings();
    // store.getWinners();
  }, []);

  useEffect(() => {
    const row = store.preSet !== null && store.preSet[mode].field;
    // Calculated total cells number for chosen level
    const num = row && Math.pow(row, 2);
    let setOfCells: {
      id: number;
      color: string;
    }[] = [];
    // Let's create chosen set of cells
    for (let i = 0; i < num; i++) {
      let item = {
        id: i,
        color: "d",
      };
      setOfCells.push(item);
    }
    setUserSettings(setOfCells);
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
      <GamePool mode={mode} userSettings={userSettings} />
    </div>
  );
};

export default GameContainer;
