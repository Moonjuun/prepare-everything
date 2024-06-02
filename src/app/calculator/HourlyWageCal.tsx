import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { formatThousandsCommas } from "@/libs/utils";
import styled from "styled-components";

const HourlyWageCal: React.FC = () => {
  const [hour, setHour] = useState<number | string>(48);
  const [hourlyWage, setHourlyWage] = useState<string>("9,860");
  const [holidayPay, setHolidayPay] = useState<number>(0);
  const [weekPay, setWeekPay] = useState<number>(0);
  const [result, setResult] = useState<number | string>("");

  const formatNumber = (num: number): string => {
    return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateWage = (): void => {
    const hourlyWageNumber = parseInt(hourlyWage.replace(/,/g, ""), 10);
    if (hour === 0 || hour === "") {
      alert("시간을 넣어주세요!");
    } else if (typeof hour === "number" && hour >= 15) {
      setHour(hour);
      setHourlyWage(formatThousandsCommas(hourlyWageNumber.toString()));
      const weekPayCalculated = hour * hourlyWageNumber;
      const holidayPayCalculated = hour * 0.2 * hourlyWageNumber;
      const resultCalculated = (weekPayCalculated + holidayPayCalculated) * 4;
      setWeekPay(weekPayCalculated);
      setHolidayPay(holidayPayCalculated);
      setResult(resultCalculated);
    } else if (typeof hour === "number" && hour < 15) {
      setHour(hour);
      setHourlyWage(formatThousandsCommas(hourlyWageNumber.toString()));
      const weekPayCalculated = hour * hourlyWageNumber;
      const resultCalculated = weekPayCalculated * 4;
      setWeekPay(weekPayCalculated);
      setHolidayPay(0);
      setResult(resultCalculated);
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ marginTop: 2 }}>
          <Box>
            <TextField
              fullWidth
              type="number"
              label="주간 업무 시간(일주일 총 일하는 시간)"
              value={hour}
              onChange={(e) => {
                const value = e.target.value;
                setHour(value === "" ? "" : Number(value));
                setResult(""); // input 타입 수정 시 result 상태값을 false로 변경
              }}
              margin="normal"
            />
            <TextField
              fullWidth
              type="text"
              label="시급 (2024년 최저임금은 시간당 9,860원입니다.)"
              value={hourlyWage}
              onChange={(e) => {
                setHourlyWage(formatThousandsCommas(e.target.value));
                setResult(""); // input 타입 수정 시 result 상태값을 false로 변경
              }}
              margin="normal"
            />
            <Button
              fullWidth
              variant="contained"
              style={{ marginTop: "30px", marginBottom: "20px" }}
              onClick={calculateWage}
            >
              계산
            </Button>
            {result && (
              <Box>
                <Typography variant="body1">
                  시급{" "}
                  <RedBold>
                    {hourlyWage
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  </RedBold>
                  원
                </Typography>
                <Typography variant="body1">
                  총근무시간 <RedBold>{hour}</RedBold>
                  시간
                </Typography>
                <Typography variant="body1">
                  1. 주급 <RedBold>{formatNumber(weekPay)}</RedBold>원
                </Typography>
                <Typography variant="body1">
                  2. 예상 주휴수당 :{" "}
                  <RedBold>{formatNumber(holidayPay)}</RedBold>원
                </Typography>
                <Typography variant="body1">
                  3. 예상 총 주급(주급 + 예상 주휴수당) :{" "}
                  <RedBold>{formatNumber(weekPay + holidayPay)}</RedBold>원
                </Typography>
                <Typography variant="body1">
                  4. 예상 월급(예상 총 주급 x 4) :{" "}
                  <RedBold>{formatNumber(Number(result))}</RedBold>원
                </Typography>
                <Typography sx={{ marginTop: 2 }}>
                  *2024년 최저임금은 시간당 9,860원입니다. <br />
                  *교통비, 식대 및 다른 수당들은 제외된 금액입니다. <br />
                  *업장 및 회사의 규정에 따라 주휴수당 금액이 다를 수 있습니다.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HourlyWageCal;

const RedBold = styled.span`
  color: red;
  font-weight: bold;
`;
