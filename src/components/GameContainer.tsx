import React, { useState, useEffect, useContext } from "react";

import { StoreContext } from "../utils/store";
import GameControls from "./GameControls";
import GamePool from "./GamePool";

interface Props {}
interface Settings {
  id: number;
  color: string;
}

const GameContainer: React.FC<Props> = () => {
  const store = useContext(StoreContext);
  const [mode, setMode] = useState("");
  const [name, setName] = useState("");
  const [timerID, setTimerID] = useState(undefined);
  const [cellID, setCellID] = useState<any>(undefined);
  // const [cellID, setCellID] = useState<number | undefined>(undefined);
  const [cellIdPickedByUser, setCellIdPickedByUser] = useState<
    number | undefined
  >(undefined);
  const [userSettings, setUserSettings] = useState<Settings[] | null>(null);
  const [userScore, setUserScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);

  useEffect(() => {
    store.getSettings();
    // store.getWinners();

    return () => clearTimeout(timerID);
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
        color: "",
      };
      setOfCells.push(item);
    }
    setUserSettings(setOfCells);
  }, [mode]);

  useEffect(() => {
    console.log(`Picked ID ${cellIdPickedByUser}, Generated ID ${cellID}`);
  }, [cellIdPickedByUser]);

  useEffect(() => {
    userSettings !== null && manageCellColors();
  }, [cellID]);

  const startGame = () => {
    // console.log(`I am startGame`);
    generateCellID();
    // startTimer();
    // manageCellColors();
  };

  const manageCellColors = () => {
    userSettings !== null &&
      !userSettings[cellID].color &&
      setUserSettings((x: any) => [...x, (x[cellID].color = "blue")]);
  };

  const calculateScores = () => {
    userSettings?.forEach((x) => {
      x.color === "green" && setUserScore((x: number) => x + 1);
      x.color === "red" && setComputerScore((x: number) => x + 1);
    });
  };

  const startTimer = () => {
    const delay = store.preSet[mode].delay;
    const timer: any = setTimeout(() => {
      console.log(`delay: ${delay}`);
    }, delay);

    setTimerID(timer);
  };

  const generateCellID = () => {
    // let random: number | undefined;
    let cellsTotal: number | any =
      userSettings !== null && userSettings?.length;

    function checkIfCellUsed() {
      const num: number = Math.floor(Math.random() * cellsTotal);
      // Check if cell is already colored
      const checkUsage = userSettings !== null && userSettings[num].color;
      // checkUsage
      //   ? console.log(`I am Virgin: id ${num}`)
      //   : console.log(`I am Used: id ${num}`);
      // If not colored assign the id
      checkUsage ? checkIfCellUsed() : setCellID(num);
    }

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
      <GamePool
        mode={mode}
        userSettings={userSettings}
        setCellIdPickedByUser={setCellIdPickedByUser}
      />
    </div>
  );
};

export default GameContainer;
