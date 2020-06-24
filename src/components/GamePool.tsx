import React, { useState, useEffect, useContext } from "react";
import cn from "classnames";
import { useObserver } from "mobx-react";

import { StoreContext } from "../utils/store";

interface Props {
  mode: string;
}

const renderPool = (n: number) => {
  const num = Math.pow(n, 2);
  return [...Array(num)].map((x: any, i: number) => <li key={i}></li>);
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

  const handleClick = () => {
    console.log(`handleClick item`);
  };

  return useObserver(() => (
    <div className="pool-wrapper">
      {/* I am GamePool */}
      <ul onClick={handleClick}>{renderPool(settings.easyMode.field)}</ul>
    </div>
  ));
};

export default GamePool;
