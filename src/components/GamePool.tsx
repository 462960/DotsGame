import React, { useState, useEffect, useContext } from "react";
import { useObserver } from "mobx-react";

import { StoreContext } from "../utils/store";

interface Props {}

const renderPool = (store: any) => {
  return (
    <ul>
      {store.settings !== null && <li>{store.settings.easyMode.delay}</li>}
    </ul>
  );
};

const GamePool: React.FC<Props> = () => {
  const store = useContext(StoreContext);
  //   const [pool, setPool] = useState(null);

  //   useEffect(() => {

  //     console.log(`I am useEffect ${store.settings}`);
  //   }, []);

  return useObserver(() => (
    <div className="pool-wrapper">
      I am GamePool
      {/* <ul>
        {store.settings !== null && <li>{store.settings.easyMode.delay}</li>}
      </ul> */}
      {store.userSettings !== null ? (
        // renderPool()
        renderPool(store.userSettings)
      ) : (
        <div>Choose settings</div>
      )}
    </div>
  ));
};

export default GamePool;
