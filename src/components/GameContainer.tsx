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
    setGreen();
    setRed();
    // console.log(`Picked ID ${cellIdPickedByUser}, Generated ID ${cellID}`);
  }, [cellIdPickedByUser]);

  useEffect(() => {
    userSettings !== null && calculateScores();
  }, [userSettings]);

  useEffect(() => {
    userSettings !== null && calculateWinner();
  }, [userScore, computerScore]);

  useEffect(() => {
    cellID && setBlue();
  }, [cellID]);

  const startGame = () => {
    generateCellID();
    // startTimer();
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
      setWinner(name);
      setIsGame(false);
      setButtonText("Play again");
    } else if (computerScore > cellsRange) {
      setWinner("Computer");
      setIsGame(false);
      setButtonText("Play again");
    }
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
        isGame={isGame}
        buttonText={buttonText}
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
