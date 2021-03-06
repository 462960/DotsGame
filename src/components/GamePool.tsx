import React from "react";
import cn from "classnames";

interface Props {
  mode: string;
  userSettings: object[] | null;
  handleCellClick: (x: any) => void;
}

const renderPool = (settings: any, mode: string) => {
  const normalMode = mode === "normalMode";
  const hardMode = mode === "hardMode";

  return settings.map((x: { id: any; color: any }) => {
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

// const settings = {
//   easyMode: { field: 5, delay: 2000 },
//   normalMode: { field: 10, delay: 1000 },
//   hardMode: { field: 15, delay: 900 },
// };

const GamePool: React.FC<Props> = ({ mode, userSettings, handleCellClick }) => {
  return (
    <div className="pool-wrapper">
      <ul onClick={handleCellClick}>
        {mode && userSettings !== null && renderPool(userSettings, mode)}
      </ul>
    </div>
  );
};

export default GamePool;
