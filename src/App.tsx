import React from "react";
// import logo from "./logo.svg";
import "./App.scss";

import TopBar from "./components/TopBar";
import LeaderBoard from "./components/LeaderBoard";
import GameContainer from "./components/GameContainer";

function App() {
  return (
    <div>
      <TopBar />
      <div className="wrapper">
        <div>
          <GameContainer />
        </div>
        <div>
          <LeaderBoard />
        </div>
      </div>
    </div>
  );
}

export default App;
