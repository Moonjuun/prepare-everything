"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button, Container } from "@mui/material";
import Game from "./Game";

interface LadderNode {
  change: boolean;
  draw: boolean;
}

interface FootPrint {
  [key: string]: boolean;
}

const LadderGame: React.FC = () => {
  const [participants, setParticipants] = useState<number>(9); // 참가자 수
  const [winners, setWinners] = useState<number>(1); // 당첨자 수
  const [ladderNode, setLadderNode] = useState<LadderNode[][]>([]); // 사다리 노드

  const [working, setWorking] = useState<boolean>(false); // 게임 진행 여부

  // 사다리 생성 함수
  const generateLadder = () => {
    const newLadder: LadderNode[][] = [];
    for (let i = 0; i < participants; i++) {
      const row: LadderNode[] = [];
      for (let j = 0; j < winners - 1; j++) {
        row.push({ change: Math.random() < 0.5, draw: false });
      }
      row.push({ change: false, draw: true }); // 마지막은 항상 당첨
      newLadder.push(row);
    }
    setLadderNode(newLadder);
  };

  // 사다리 게임 시작
  const startGame = () => {
    setWorking(true);
    generateLadder();
  };

  return (
    <Container maxWidth="sm">
      {!working && (
        <InputField>
          <TextField
            label="참가자 수"
            type="number"
            value={participants}
            size="small"
            inputProps={{
              min: 2,
            }}
            onChange={(e: any) => {
              const input = e.target.value;
              const regex = /^\d{0,1}$/; //
              if (regex.test(input) || input === "") {
                setParticipants(input);
              }
            }}
          />

          <TextField
            label="당첨"
            size="small"
            type="number"
            inputProps={{
              min: 1,
              max: 8,
            }}
            value={winners}
            onChange={(e: any) => {
              setWinners(e.target.value);
            }}
          />
          <Button
            style={{ backgroundColor: "#3399FF" }}
            variant="contained"
            onClick={startGame}
          >
            시작
          </Button>
        </InputField>
      )}
      {working && (
        <Game
          participants={participants}
          winners={winners}
          setWorking={setWorking}
        />
      )}
    </Container>
  );
};

export default LadderGame;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
