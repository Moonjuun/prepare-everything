import React, { useState, ChangeEvent } from "react";
import { Container, TextField, Typography } from "@mui/material";

const WordCal: React.FC = () => {
  const [text, setText] = useState<string>("");

  const totalCharacters: number = text.length;
  const charactersWithoutSpaces: number = text.replace(/\s/g, "").length;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  return (
    <>
      <Container maxWidth="sm">
        <form noValidate autoComplete="off">
          <TextField
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            value={text}
            onChange={handleChange}
            margin="normal"
          />
        </form>

        <Typography
          variant="body1"
          style={{ fontWeight: "bold", color: "blue" }}
        >
          공백 포함: {totalCharacters}
        </Typography>
        <Typography
          variant="body1"
          style={{ fontWeight: "bold", color: "blue" }}
        >
          공백 제외: {charactersWithoutSpaces}
        </Typography>
      </Container>
    </>
  );
};

export default WordCal;
