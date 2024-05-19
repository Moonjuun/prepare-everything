import React, { useState, ChangeEvent } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  FormControl,
  FormLabel,
  Divider,
} from "@mui/material";
import { formatThousandsCommas } from "@/libs/utils";

interface InputValues {
  monthlyDeposit: string;
  termLength: string;
  termUnit: "months" | "years";
  interestRate: string;
  isCompoundInterest: "simple" | "compound";
}
const Interest = () => {
  const [inputValues, setInputValues] = useState<InputValues>({
    monthlyDeposit: "",
    termLength: "",
    termUnit: "months",
    interestRate: "",
    isCompoundInterest: "simple",
  });

  const [result, setResult] = useState<(string | number)[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const calculateInterest = (inputValues: InputValues): (string | number)[] => {
    const {
      monthlyDeposit,
      termLength,
      termUnit,
      interestRate,
      isCompoundInterest,
    } = inputValues;

    const monthlyDepositNumber = Number(monthlyDeposit.replace(/,/g, ""));
    const termLengthNumber = Number(termLength);
    const interestRateNumber = Number(interestRate);

    let totalAmount = 0;
    let totalDeposit = 0;
    let totalInterest = 0;

    // 개월
    if (termUnit === "months") {
      // 단리
      if (isCompoundInterest === "simple") {
        const monthlyInterestRate = (interestRateNumber * 0.01) / 12; // 월 이자율 계산

        for (let i = 1; i <= termLengthNumber; i++) {
          totalDeposit += monthlyDepositNumber; // 월 적금액을 더함
          totalInterest += totalDeposit * monthlyInterestRate; // 단리 이자 계산
        }
        totalAmount = totalDeposit + totalInterest;
        const totalInterestTax = totalInterest * 0.154;
        const totalAmountTax = totalAmount - totalInterestTax;

        return [
          totalAmount.toFixed(),
          totalAmountTax.toFixed(),
          totalDeposit.toFixed(),
          totalInterest.toFixed(),
          totalInterestTax.toFixed(),
        ];
      }
      // 복리(o)
      else {
        const monthlyInterestRate = (interestRateNumber * 0.01) / 12; // 월 이자율 계산
        for (let i = 1; i <= termLengthNumber; i++) {
          totalAmount += monthlyDepositNumber; // 월적금액을 더함
          totalAmount += totalAmount * monthlyInterestRate; // 복리 이자 계산
        }
        let totalDeposit = monthlyDepositNumber * termLengthNumber;
        let totalInterest = totalAmount - totalDeposit;
        let totalInterestTax = totalInterest * 0.154;
        let totalAmountTax = totalAmount - totalInterestTax;

        return [
          totalAmount.toFixed(),
          totalAmountTax.toFixed(),
          totalDeposit.toFixed(),
          totalInterest.toFixed(),
          totalInterestTax.toFixed(),
        ];
      }
    }
    // 년
    else {
      const makeMonth = Number(termLength) * 12;
      // 단리
      if (isCompoundInterest === "simple") {
        const monthlyInterestRate = (interestRateNumber * 0.01) / 12; // 월 이자율 계산

        for (let i = 1; i <= makeMonth; i++) {
          totalDeposit += monthlyDepositNumber; // 월 적금액을 더함
          totalInterest += totalDeposit * monthlyInterestRate; // 단리 이자 계산
        }
        totalAmount = totalDeposit + totalInterest;
        const totalInterestTax = totalInterest * 0.154;
        const totalAmountTax = totalAmount - totalInterestTax;

        return [
          totalAmount.toFixed(),
          totalAmountTax.toFixed(),
          totalDeposit.toFixed(),
          totalInterest.toFixed(),
          totalInterestTax.toFixed(),
        ];
      }
      // 복리
      else {
        const monthlyInterestRate = (interestRateNumber * 0.01) / 12; // 월 이자율 계산
        for (let i = 1; i <= makeMonth; i++) {
          totalAmount += monthlyDepositNumber; // 월적금액을 더함
          totalAmount += totalAmount * monthlyInterestRate; // 복리 이자 계산
        }
        let totalDeposit = monthlyDepositNumber * makeMonth;
        let totalInterest = totalAmount - totalDeposit;
        let totalInterestTax = totalInterest * 0.154;
        let totalAmountTax = totalAmount - totalInterestTax;

        return [
          totalAmount.toFixed(),
          totalAmountTax.toFixed(),
          totalDeposit.toFixed(),
          totalInterest.toFixed(),
          totalInterestTax.toFixed(),
        ];
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Calculate the result based on the input values
    const calculatedResult = calculateInterest(inputValues);
    setResult(calculatedResult);
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormLabel>
            <Typography variant="h6">예치금액</Typography>
          </FormLabel>
          <TextField
            type="string"
            name="monthlyDeposit"
            value={formatThousandsCommas(inputValues.monthlyDeposit)}
            onChange={handleInputChange}
            required
            size="small"
            sx={{ width: "50%" }}
          />
        </Box>

        <Box
          mt={1}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormLabel>
            <Typography variant="h6">예금 기간</Typography>
          </FormLabel>
          <TextField
            type="number"
            name="termLength"
            value={inputValues.termLength}
            onChange={handleInputChange}
            required
            size="small"
            sx={{ width: "50%" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
            alignItems: "center",
          }}
        >
          <Box>
            <FormControlLabel
              control={
                <Radio
                  name="termUnit"
                  value="months"
                  checked={inputValues.termUnit === "months"}
                  onChange={handleRadioChange}
                />
              }
              label="개월"
            />
            <FormControlLabel
              control={
                <Radio
                  name="termUnit"
                  value="years"
                  checked={inputValues.termUnit === "years"}
                  onChange={handleRadioChange}
                />
              }
              label="년"
            />
          </Box>
        </Box>

        <Box
          mt={1}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormLabel>
            <Typography variant="h6">이자율(%)</Typography>
          </FormLabel>
          <TextField
            type="number"
            name="interestRate"
            value={inputValues.interestRate}
            onChange={handleInputChange}
            required
            size="small"
            sx={{ width: "50%" }}
          />
        </Box>
        <Box
          mt={1}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
            alignItems: "center",
          }}
        >
          <Box>
            <FormControlLabel
              control={
                <Radio
                  value="simple"
                  name="isCompoundInterest"
                  checked={inputValues.isCompoundInterest === "simple"}
                  onChange={handleRadioChange}
                />
              }
              label="단리"
            />
            <FormControlLabel
              control={
                <Radio
                  value="compound"
                  name="isCompoundInterest"
                  checked={inputValues.isCompoundInterest === "compound"}
                  onChange={handleRadioChange}
                />
              }
              label="복리"
            />
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          계산
        </Button>

        {result[0] && (
          <Box sx={{ maxWidth: 240 }}>
            <Typography variant="h6">일반과세</Typography>
            <Typography>
              원금합계:{" "}
              <span style={{ fontWeight: 700 }}>
                {formatThousandsCommas(result[2])} 원
              </span>
            </Typography>
            <Typography>
              세전이자:{" "}
              <span style={{ fontWeight: 700 }}>
                {formatThousandsCommas(result[3])} 원
              </span>
            </Typography>
            <Typography color="error">
              이자과세(15.4%):{" "}
              <span style={{ fontWeight: 700 }}>
                -{formatThousandsCommas(result[4])} 원
              </span>
            </Typography>
            <Typography>
              세후 수령액:{" "}
              <span style={{ fontWeight: 700 }}>
                {formatThousandsCommas(result[1])} 원
              </span>
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">비과세</Typography>
            <Typography>
              원금합계:{" "}
              <span style={{ fontWeight: 700 }}>
                {formatThousandsCommas(result[2])} 원
              </span>
            </Typography>
            <Typography>
              세전이자:{" "}
              <span style={{ fontWeight: 700 }}>
                {formatThousandsCommas(result[3])} 원
              </span>
            </Typography>
            <Typography color="error">
              이자과세(0%): <span style={{ fontWeight: 700 }}>0 원</span>
            </Typography>
            <Typography>
              세후 수령액:{" "}
              <span style={{ fontWeight: 700 }}>
                {formatThousandsCommas(result[0])} 원
              </span>
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body2" gutterBottom>
              ※ 월단위로 계산된 이자이기 때문에 일단위로 계산되는 금융기관의
              적금이자와는 차이가 있습니다.
            </Typography>
            <Typography variant="body2">
              ※ 오차 가능성 안내 <br />본 대출금 상환 계산기는 월 단위로 계산 한
              것이므로, 실제 대출 시작 일자에 일할 계산에 따른 약간의 차이는
              있을 수 있습니다.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Interest;
