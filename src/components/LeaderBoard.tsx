import React, { FC, useContext } from "react";
import { useObserver } from "mobx-react";
import { StoreContext } from "../utils/store";
import Paper from "@material-ui/core/Paper";

interface Winner {
  id: number;
  winner: string;
  date: string;
}

const renderWinners = (winners: []) => {
  return (
    <ul>
      {winners.map((x: Winner) => {
        return (
          <li key={x.id}>
            <Paper>
              <div className="winner-info">
                <span>{x.winner}</span>
                <span>{x.date}</span>
              </div>
            </Paper>
          </li>
        );
      })}
    </ul>
  );
};

const LeaderBoard: FC = () => {
  const store = useContext(StoreContext);

  return useObserver(() => (
    <div className="board-container">
      <h4>Leader Board</h4>
      {renderWinners(store.winners)}
    </div>
  ));
};

export default LeaderBoard;
