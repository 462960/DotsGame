import React, { useState, useEffect, useContext } from "react";
import cn from "classnames";
import { useObserver } from "mobx-react";

import { StoreContext } from "../utils/store";

interface Props {
  mode: string;
}

const renderPool = (settings: any, mode: string) => {
  const normalMode = mode === "normalMode";
  const hardMode = mode === "hardMode";
  const row = settings[mode].field;
  // Calculated total cells number for chosen level
  const num = Math.pow(row, 2);
  let setOfCells = [];

  for (let i = 0; i < num; i++) {
    let item = {
      id: i,
      color: "d",
    };
    setOfCells.push(item);
  }
  // console.log(`setOfCells: ${setOfCells[0]}`);

  return setOfCells.map((x: { id: any; color: any }) => {
    const color = x.color;
    return (
      <li
        id={x.id}
        className={cn("easyMode", color, { normalMode, hardMode })}
        key={x.id}
      ></li>
    );
  });
};

const settings = {
  easyMode: { field: 5, delay: 2000 },
  normalMode: { field: 10, delay: 1000 },
  hardMode: { field: 15, delay: 900 },
};

const GamePool: React.FC<Props> = ({ mode }) => {
  const store = useContext(StoreContext);
  //   const [pool, setPool] = useState(null);

  //   useEffect(() => {

  //     console.log(`I am useEffect ${store.settings}`);
  //   }, []);

  const handleClick = (e: any) => {
    console.log(`handleClick item id ${e.target.id}`);
  };

  return useObserver(() => (
    <div className="pool-wrapper">
      <ul onClick={handleClick}>
        {mode && store.preSet !== null && renderPool(store.preSet, mode)}
      </ul>
    </div>
  ));
};

export default GamePool;
