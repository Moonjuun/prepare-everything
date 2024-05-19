import React, { useState, ChangeEvent } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import moment from "moment";

const AgeCal: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  const [referenceDate, setReferenceDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  const [age, setAge] = useState<string>("");
  const [zodiac, setZodiac] = useState<string>("");
  const [days, setDays] = useState<string>("");
  const [daysToBirthday, setDaysToBirthday] = useState<string>("");

  const calculateAge = () => {
    if (!birthDate || !referenceDate) {
      alert("생년월일과 기준일을 입력해주세요.");
      return;
    }

    if (birthDate > referenceDate) {
      window.alert("생년월일은 기준일보다 클 수 없습니다.");
      return;
    }

    const ageInMilliseconds =
      new Date(referenceDate).getTime() - new Date(birthDate).getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    const birthYear = new Date(birthDate).getFullYear();
    const zodiacIndex = (birthYear - 4) % 12;
    const zodiacs = [
      "쥐",
      "소",
      "범",
      "토끼",
      "용",
      "뱀",
      "말",
      "양",
      "원숭이",
      "닭",
      "개",
      "돼지",
    ];
    const zodiacResult = zodiacs[zodiacIndex];

    const nextBirthday = new Date(referenceDate);
    nextBirthday.setMonth(new Date(birthDate).getMonth());
    nextBirthday.setDate(new Date(birthDate).getDate());
    let daysToNextBirthday = Math.ceil(
      (nextBirthday.getTime() - new Date(referenceDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (daysToNextBirthday < 0) {
      daysToNextBirthday += 365;
    }
    setDaysToBirthday(daysToNextBirthday.toString());

    const daysInMilliseconds =
      new Date(referenceDate).getTime() - new Date(birthDate).getTime();
    const daysResult = daysInMilliseconds / (1000 * 60 * 60 * 24);

    setAge(Math.floor(ageInYears).toString());
    setZodiac(zodiacResult);
    setDays(Math.floor(daysResult).toString());
  };

  return (
    <Container maxWidth="sm">
      <Box mt={1}>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            margin="normal"
            id="birthDate"
            label="생년월일"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={birthDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setBirthDate(e.target.value);
              setAge("");
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            id="referenceDate"
            label="기준일"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={referenceDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setReferenceDate(e.target.value);
              setAge("");
            }}
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
          onClick={(e) => {
            e.preventDefault();
            calculateAge();
          }}
        >
          나이 및 띠 계산하기
        </Button>
        {age !== "" && (
          <Typography variant="body1">
            만 <span style={{ fontWeight: "bold" }}>{age}세</span> 이며,{" "}
            <span style={{ fontWeight: "bold", color: "red" }}>{zodiac}띠</span>{" "}
            입니다. 태어난 지{" "}
            <span style={{ fontWeight: "bold" }}>
              {parseInt(days).toLocaleString()}일
            </span>
            째입니다.
            <br />
            다음 생일까지{" "}
            <span style={{ fontWeight: "bold" }}>{daysToBirthday}</span>일
            남았습니다.
          </Typography>
        )}
        <Typography
          variant="body2"
          sx={{ color: parseInt(age) >= 18 ? "blue" : "red", mt: 2 }}
        >
          * 투표 가능 (만18세 이상) <br />
          * 운전면허 취득 가능 (만18세 이상) <br />
          * 아르바이트 및 취업 가능 (만18세 이상) <br />
          * 청소년 관람불가 영화 관람 가능 (만18세 이상, * 재학 중인 고등학생
          제외) <br />
          * 군대 입영 가능 (만18세 이상) <br />* 9급 공무원 지원 가능 (만18세
          이상)
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2">
          - 날짜계산은 기준일을 1일로 포함하여 계산됩니다. <br />
          - 주관처에 의해 기념일이 변경될 수 있습니다. <br />- 본 정보는 실제와
          다를 수 있습니다. 정확한 내용은 각 주관기관을 통해 확인하시기
          바랍니다.
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Box>
    </Container>
  );
};

export default AgeCal;
