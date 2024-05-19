"use client";
import React, { useState, useEffect } from "react";
import { Container, Button, Box, Stack } from "@mui/material";
import { formatThousandsCommas } from "@/libs/utils";

const CommonCal: React.FC = () => {
  const [result, setResult] = useState<string>("0");
  const [previousNum, setPreviousNum] = useState<string>("");
  const [operator, setOperator] = useState<string>("");

  const handleClick = (button: string) => {
    if (button === "AC") {
      setResult("0");
      setPreviousNum("");
      setOperator("");
    } else if (button === "+/-") {
      setResult((parseFloat(result) * -1).toString());
    } else if (button === "%") {
      setResult((parseFloat(result) / 100).toString());
    } else if (button === ".") {
      if (!result.includes(".")) {
        setResult(result + ".");
      }
    } else if (button === "=") {
      calculate();
    } else if (button === "←") {
      setResult(result.slice(0, -1));
    } else if (["+", "-", "*", "/"].includes(button)) {
      setPreviousNum(result);
      setResult("0");
      setOperator(button);
    } else {
      setResult(result === "0" ? button : result + button);
    }
  };

  const calculate = () => {
    const num1 = parseFloat(previousNum);
    const num2 = parseFloat(result);

    if (operator === "+") {
      setResult((num1 + num2).toString());
    } else if (operator === "-") {
      setResult((num1 - num2).toString());
    } else if (operator === "*") {
      setResult((num1 * num2).toString());
    } else if (operator === "/") {
      setResult((num1 / num2).toString());
    }
    setPreviousNum("");
    setOperator("");
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const keyPressed = e.key;
      if (!isNaN(parseInt(keyPressed)) || keyPressed === ".") {
        handleClick(keyPressed);
      } else if (["+", "-", "*", "/"].includes(keyPressed)) {
        handleClick(keyPressed);
      } else if (keyPressed === "=" || keyPressed === "Enter") {
        handleClick("=");
      } else if (keyPressed === "Escape") {
        handleClick("AC");
      } else if (keyPressed === "Backspace") {
        setResult(result.slice(0, -1));
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <Stack>
      <Box
        my={1}
        p={2}
        textAlign={"right"}
        sx={{
          border: "2px solid #ececec",
          borderRadius: 1,
          justifyContent: "right",
        }}
      >
        {formatThousandsCommas(Number(result))}
      </Box>
      <Stack gap={0.4} p={0.2} direction={{ xs: "row", sm: "row" }}>
        <Button variant="contained" onClick={() => handleClick("AC")}>
          AC
        </Button>
        <Button variant="contained" onClick={() => handleClick("+/-")}>
          +/-
        </Button>
        <Button variant="contained" onClick={() => handleClick("%")}>
          %
        </Button>
        <Button variant="contained" onClick={() => handleClick("/")}>
          ÷
        </Button>
      </Stack>
      <Stack gap={0.4} p={0.2} direction={{ xs: "row", sm: "row" }}>
        <Button variant="contained" onClick={() => handleClick("7")}>
          7
        </Button>
        <Button variant="contained" onClick={() => handleClick("8")}>
          8
        </Button>
        <Button variant="contained" onClick={() => handleClick("9")}>
          9
        </Button>
        <Button variant="contained" onClick={() => handleClick("*")}>
          ×
        </Button>
      </Stack>
      <Stack gap={0.4} p={0.2} direction={{ xs: "row", sm: "row" }}>
        <Button variant="contained" onClick={() => handleClick("4")}>
          4
        </Button>
        <Button variant="contained" onClick={() => handleClick("5")}>
          5
        </Button>
        <Button variant="contained" onClick={() => handleClick("6")}>
          6
        </Button>
        <Button variant="contained" onClick={() => handleClick("-")}>
          -
        </Button>
      </Stack>
      <Stack gap={0.4} p={0.2} direction={{ xs: "row", sm: "row" }}>
        <Button variant="contained" onClick={() => handleClick("1")}>
          1
        </Button>
        <Button variant="contained" onClick={() => handleClick("2")}>
          2
        </Button>
        <Button variant="contained" onClick={() => handleClick("3")}>
          3
        </Button>
        <Button variant="contained" onClick={() => handleClick("+")}>
          +
        </Button>
      </Stack>
      <Stack gap={0.4} p={0.2} direction={{ xs: "row", sm: "row" }}>
        <Button variant="contained" onClick={() => handleClick("0")}>
          0
        </Button>
        <Button variant="contained" onClick={() => handleClick(".")}>
          .
        </Button>
        <Button variant="contained" onClick={() => handleClick("←")}>
          ←
        </Button>
        <Button variant="contained" onClick={() => handleClick("=")}>
          =
        </Button>
      </Stack>
    </Stack>
  );
};

export default CommonCal;
