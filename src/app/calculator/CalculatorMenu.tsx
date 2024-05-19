"use client";
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// calculator
import CommonCal from "./CommonCal";

export default function CalculatorMenu() {
  const [calculator, setCalculator] = useState<string>("1");

  const handleChange = (event: SelectChangeEvent) => {
    setCalculator(event.target.value as string);
  };

  return (
    <Box
      sx={{
        minWidth: 240,
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">계산기</InputLabel>
        <Select value={calculator} label="Calculator" onChange={handleChange}>
          <MenuItem value={1}>일반 계산기</MenuItem>
          <MenuItem value={2}>Twenty</MenuItem>
          <MenuItem value={3}>Thirty</MenuItem>
        </Select>
      </FormControl>
      {calculator == "1" && <CommonCal />}
    </Box>
  );
}
