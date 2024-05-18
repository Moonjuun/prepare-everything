"use client";
import AddNames from "./AddNames";
import React, { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import KakaoAdFit from "@/atomics/KakaoAds/KakaoAdFit";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textColor: "black",
};

interface Props {
  colors: string;
  info: string[];
  n: number;
}

const Roulette: React.FC<Props> = ({ colors, info, n }) => {
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState<number>(1);
  const [myName, setMyName] = useState<any>(info);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * myName.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const onStopSpinning = () => {
    setMustSpin(false);
    // alert(`Selected item: ${myName[prizeNumber].option}`);
    setOpen(true); // 모달 열기
  };

  useEffect(() => {
    if (mustSpin === true) {
      console.log(prizeNumber);
    }
  }, [mustSpin, prizeNumber]);

  return (
    <Box>
      <AddNames myName={myName} setMyName={setMyName} />
      <Wheel
        mustStartSpinning={mustSpin}
        outerBorderWidth={3}
        radiusLineWidth={3}
        spinDuration={1}
        prizeNumber={prizeNumber}
        data={myName}
        onStopSpinning={onStopSpinning}
        backgroundColors={[
          "#ececec",
          "#00FF7F",
          "#FF69B4",
          "#ADD8E6",
          "#ABF200",
          "#FFE400",
          "#00D8FF",
          "#FF5E00",
          "#1DDB16",
          "#CC723D",
        ]}
      />
      <Box display="flex" justifyContent="flex-end" marginBottom={5}>
        <Button
          style={{ backgroundColor: "#3399FF" }}
          variant="contained"
          onClick={handleSpinClick}
        >
          돌려 돌려
        </Button>
      </Box>
      {/* <KakaoAdFit /> */}
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, textAlign: "center" }}>
            <Typography variant="h6" component="h2" color="text.primary">
              당첨!!!!
            </Typography>
            <Typography sx={{ mt: 2 }} color="text.primary">
              {myName[prizeNumber]?.option}
            </Typography>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default Roulette;
