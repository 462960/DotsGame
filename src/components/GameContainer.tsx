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
  const [isGame, setIsGame] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [buttonText, setButtonText] = useState<string>("Play");
  const [mode, setMode] = useState("");
  const [name, setName] = useState("");
  const [winner, setWinner] = useState("");
  const [timerID, setTimerID] = useState(undefined);
  const [cellID, setCellID] = useState<any>(undefined);
  const [cellIdPickedByUser, setCellIdPickedByUser] = useState<
    number | undefined
  >(undefined);
  const [userSettings, setUserSettings] = useState<Settings[] | null>(null);
  const [userScore, setUserScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);

  useEffect(() => {
    if (isNext) {
      setCellID(undefined);
      setTimerID(undefined);
    }
  }, [isNext]);

  useEffect(() => {
    // Fetches initial data from the server
    store.getSettings();
    // store.getWinners();

    createCellsGrid();

    // Clears timeout if user quits abruptly
    return () => clearTimeout(timerID);
  }, [mode]);

  useEffect(() => {
    isGame && createCellsGrid();
  }, [isGame]);

  useEffect(() => {
    cellIdPickedByUser && setGreen();
    cellIdPickedByUser && setRed();
  }, [cellIdPickedByUser]);

  useEffect(() => {
    userSettings !== null && calculateScores();
  }, [userSettings]);

  useEffect(() => {
    userSettings !== null && calculateWinner();
  }, [userScore, computerScore]);

  useEffect(() => {
    const checkAvailability =
      userSettings !== null && userSettings.some((x: any) => !x.color);
    cellID !== undefined && isGame && startTimer();
    cellID === undefined && isGame && checkAvailability && generateCellID();
    !isGame && setCellID(undefined);
  }, [isGame, cellID, userSettings]);

  const createCellsGrid = () => {
    // Creates cells grid
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
  };

  const startGame = () => {
    setIsGame(true);
  };

  const colorsUpdater = (color: string) => {
    setUserSettings((x: any) => [
      ...x.slice(0, cellID),
      { id: cellID, color },
      ...x.slice(cellID + 1),
    ]);
  };

  const setBlue = () => {
    userSettings !== null &&
      !userSettings[cellID].color &&
      colorsUpdater("blue");
  };

  const setGreen = () => {
    userSettings !== null &&
      userSettings[cellID].color &&
      cellID == cellIdPickedByUser &&
      colorsUpdater("green");
  };

  const setRed = () => {
    userSettings !== null &&
      userSettings[cellID].color &&
      cellID != cellIdPickedByUser &&
      colorsUpdater("red");
  };

  const calculateScores = () => {
    setUserScore(0);
    setComputerScore(0);
    userSettings?.forEach((x) => {
      x.color === "green" && setUserScore((x: number) => x + 1);
      x.color === "red" && setComputerScore((x: number) => x + 1);
    });
  };

  const calculateWinner = () => {
    const cellsRange =
      userSettings !== null && Math.floor(userSettings?.length / 2);

    if (userScore > cellsRange) {
      setIsGame(false);
      setWinner(name);
      setButtonText("Play again");
      clearTimeout(timerID);
    } else if (computerScore > cellsRange) {
      setIsGame(false);
      setWinner("Computer");
      setCellID(undefined);
      setButtonText("Play again");
      clearTimeout(timerID);
    }
  };

  const startTimer = () => {
    const delay = store.preSet[mode].delay;
    setBlue();
    setCellIdPickedByUser(undefined);
    setIsNext(false);
    clearTimeout(timerID);

    const timer: any = setTimeout(() => {
      colorsUpdater("red");
      setCellID(undefined);
    }, delay);

    setTimerID(timer);
  };

  const generateCellID = () => {
    let cellsTotal: number | any =
      userSettings !== null && userSettings?.length;

    function checkIfCellUsed() {
      const num: number = Math.floor(Math.random() * cellsTotal);
      // Check if cell is already colored
      const checkUsage = userSettings !== null && userSettings[num].color;
      checkUsage ? checkIfCellUsed() : setCellID(num);
    }

    checkIfCellUsed();
  };

  const handleCellClick = (e: any) => {
    setCellIdPickedByUser(e.target.id);
    clearTimeout(timerID);
    setIsNext(true);
  };

  return (
    <div className="game-container">
      <div>
        User Score: {userScore}, Comp Score: {computerScore}
      </div>
      <GameControls
        mode={mode}
        name={name}
        isGame={isGame}
        buttonText={buttonText}
        setMode={setMode}
        setName={setName}
        startGame={startGame}
      />
      <GamePool
        mode={mode}
        userSettings={userSettings}
        handleCellClick={handleCellClick}
      />
    </div>
  );
};

export default GameContainer;
