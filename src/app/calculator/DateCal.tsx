import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import moment from "moment";
import Divider from "@mui/material/Divider";

const DateCal: React.FC = () => {
  // 기준일
  const [firstDateInput, setFirstDateInput] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  // 날짜 계산1
  const [secondDateInput, setSecondDateInput] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  const [dateResult, setDateResult] = useState<{ days: number }>({ days: 0 });

  function getDays(dateOne: string, dateTwo: string) {
    const firstDate = moment(dateOne);
    const secondDate = moment(dateTwo);
    const days = secondDate.diff(firstDate, "days");
    setDateResult({ days });
  }

  // 날짜 계산2
  const [dateInput1, setDateInput1] = useState<string>("1");
  const [afterDate, setAfterDate] = useState<string>(
    moment().add(1, "days").format("YYYY-MM-DD")
  );

  function calculateDate() {
    if (!dateInput1) {
      window.alert("값 넣어주세요");
      return;
    }
    const date = moment(firstDateInput).add(Number(dateInput1) - 1, "days");
    setAfterDate(date.format("YYYY-MM-DD"));
  }
  // 날짜 계산3
  const [dateInput2, setDateInput2] = useState<string>("1");
  const [dayminusDate, setDayMinusDate] = useState<string>(
    moment().subtract(1, "days").format("YYYY-MM-DD")
  );

  function calcuateDDay() {
    if (!dateInput2) {
      window.alert("값 넣어주세요");
      return;
    }
    const date = moment(firstDateInput).subtract(Number(dateInput2), "days");

    setDayMinusDate(date.format("YYYY-MM-DD"));
  }

  return (
    <Container maxWidth="sm">
      <Box mt={2} gap={2} sx={{ display: "flex", flexDirection: "column" }}>
        <Box>
          <TextField
            label="기준일"
            type="date"
            value={firstDateInput}
            onChange={(e) => setFirstDateInput(e.target.value)}
            fullWidth
          />
          <TextField
            label="날짜 입력"
            type="date"
            value={secondDateInput}
            onChange={(e) => {
              setSecondDateInput(e.target.value);
              setDateResult({ days: 0 });
            }}
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
          />
          기준일을 1일로 포함하여 계산
          <Typography
            variant="body1"
            sx={{
              color: "blue",
              display: "flex",
              justifyContent: "right",
              fontWeight: "bold",
            }}
          >
            {dateResult.days} 일
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => getDays(firstDateInput, secondDateInput)}
        >
          계산하기
        </Button>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            label="기준일로부터 몇 일 후"
            type="number"
            value={dateInput1}
            onChange={(e) => {
              setDateInput1(e.target.value);
              setAfterDate("0");
            }}
          />
          <Typography variant="body1">
            <span style={{ color: "blue", fontWeight: "bold" }}>
              {afterDate && `${afterDate}`}
            </span>
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            calculateDate();
          }}
          style={{ marginTop: "10px" }}
        >
          계산하기
        </Button>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            label="기준일로부터 몇 일 전"
            type="number"
            value={dateInput2}
            onChange={(e) => {
              setDateInput2(e.target.value);
              setDayMinusDate("0");
            }}
          />
          <Typography variant="body1">
            <span style={{ color: "blue", fontWeight: "bold" }}>
              {dayminusDate && `${dayminusDate}`}
            </span>
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            calcuateDDay();
          }}
          style={{ marginTop: "10px" }}
        >
          계산하기
        </Button>
      </Box>
    </Container>
  );
};

export default DateCal;
