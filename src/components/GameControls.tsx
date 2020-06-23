import React, { useState, useEffect } from "react";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

interface Props {}

const GameControls: React.FC<Props> = () => {
  return (
    <ul className="controls">
      <li className="select">
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Pick mode</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value="age"
            //   onChange={handleChange}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </li>
      <li className="name">
        <TextField fullWidth label="Outlined" variant="outlined" />
      </li>
      <li className="start">
        <Button color="primary" variant="contained">
          Start
        </Button>
      </li>
    </ul>
  );
};

export default GameControls;
