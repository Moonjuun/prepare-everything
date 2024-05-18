"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { Alert } from "@mui/material";
interface Name {
  option: string;
}

interface Props {
  myName: any;
  setMyName: any;
}

const AddNames: React.FC<Props> = ({ myName, setMyName }) => {
  const [name, setName] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const onAddNames = (e: React.FormEvent) => {
    e.preventDefault();
    if (name === "") {
      alert("값을 입력해 주세요!");
    } else {
      setShowAlert(false);
      setMyName([...myName, { option: name }]);
      setName("");
    }
  };

  const removeName = () => {
    if (myName.length === 1) {
      setShowAlert(true);
    } else {
      setMyName(myName.slice(0, myName.length - 1));
    }
  };

  return (
    <InputField>
      <TextField
        label="항목"
        variant="filled"
        onChange={(e) => setName(e.target.value)}
        value={name}
        size="small"
      />
      <Button
        style={{ backgroundColor: "#3399FF" }}
        variant="contained"
        onClick={onAddNames}
      >
        추가
      </Button>
      <Button
        style={{ backgroundColor: "red" }}
        variant="contained"
        onClick={removeName}
      >
        삭제
      </Button>
      {showAlert && <Alert severity="error">더 이상 삭제 할 수 없어요.</Alert>}
    </InputField>
  );
};

export default AddNames;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%;
  margin: 0 auto;
  height: 21vh;

  @media (max-width: 768px) {
    width: 80%;
    margin: 0 auto;
    height: 30vh;
  }
`;
