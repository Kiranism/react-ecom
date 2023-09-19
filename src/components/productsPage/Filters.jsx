import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack } from "@mui/material";
const Filters = ({ handlePriceFilter, priceFilter }) => {
  return (
    <Stack direction={"row"}>
      {/* price filter  */}
      <FormControl
        variant="standard"
        size="small"
        sx={{ m: 1, minWidth: { xs: 150, md: 220 } }}
      >
        <InputLabel id="demo-simple-select-filled-label">
          Price Filter
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          size="small"
          value={priceFilter}
          onChange={(e) => handlePriceFilter(e)}
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          <MenuItem value={1}>LOW TO HIGH</MenuItem>
          <MenuItem value={-1}>HIGH TO LOW </MenuItem>
          {/* <MenuItem value={-1}>SORT BY PRICE : HIGH TO LOW</MenuItem>
          <MenuItem value={1}>SORT BY PRICE : LOW TO HIGH</MenuItem> */}
        </Select>
      </FormControl>

      {/* price filter  ends */}
      {/* Name filter  */}

      {/* <FormControl variant="filled" sx={{ m: 1, minWidth: 245 }}>
        <InputLabel id="demo-simple-select-filled-label">
          Name Filter
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={nameFilter}
          onChange={(e) => handlePriceFilter(e)}
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
      {/* <MenuItem value={1}>SORT BY NAME asc</MenuItem>
          <MenuItem value={-1}>SORT BY NAME dec</MenuItem> */}
      {/* <MenuItem value={-1}>SORT BY PRICE : HIGH TO LOW</MenuItem>
          <MenuItem value={1}>SORT BY PRICE : LOW TO HIGH</MenuItem> */}
      {/* </Select>
      </FormControl> */}
      {/* Name filter ends  */}
    </Stack>
  );
};

export default Filters;
