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
  const num = Math.pow(row, 2);
  return [...Array(num)].map((x: any, i: any) => (
    <li
      id={i}
      className={cn("easyMode", { normalMode, hardMode })}
      key={i}
    ></li>
  ));
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
      <ul onClick={handleClick}>{mode && renderPool(settings, mode)}</ul>
    </div>
  ));
};

export default GamePool;
