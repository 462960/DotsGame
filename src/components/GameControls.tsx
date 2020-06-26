import React, { useContext } from "react";
import { useObserver } from "mobx-react";

import { StoreContext } from "../utils/store";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

interface Props {
  name: string;
  mode: string;
  isGame: boolean;
  buttonText: string;
  setName: (x: string) => void;
  setMode: (x: string) => void;
  startGame: () => void;
}

const GameControls: React.FC<Props> = ({
  name,
  mode,
  isGame,
  buttonText,
  setName,
  setMode,
  startGame,
}) => {
  const store = useContext(StoreContext);

  const handleSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMode(event.target.value as string);
  };

  const handleInput = (event: React.ChangeEvent<{ value: unknown }>) => {
    setName(event.target.value as string);
  };

  return useObserver(() => (
    <ul className="controls">
      <li className="select">
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="user-mode">Pick mode</InputLabel>
          <Select
            fullWidth
            labelId="user-mode"
            value={mode}
            onChange={handleSelect}
            label="Mode pick"
          >
            {store.selectorsModes.map((x: string, i: number) => {
              return (
                <MenuItem key={i} value={x}>
                  {x}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </li>
      <li className="name">
        <TextField
          fullWidth
          label="Gamer's name"
          variant="outlined"
          onChange={handleInput}
          value={name}
        />
      </li>
      <li className="start">
        <Button
          onClick={startGame}
          color="primary"
          variant="contained"
          disabled={!name || !mode || isGame}
          fullWidth
        >
          {buttonText}
        </Button>
      </li>
    </ul>
  ));
};

export default GameControls;
