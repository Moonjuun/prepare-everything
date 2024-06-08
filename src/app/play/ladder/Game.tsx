import { TextField, Button, Container, Box } from "@mui/material";
import { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";

interface Props {
  participants: number;
  winners: number;
  setWorking: any;
}

const Game: React.FC<Props> = ({ participants, winners, setWorking }) => {
  const canvas = useRef<any>([]);
  const playerInput = useRef<HTMLInputElement[]>([]);
  const targetInput = useRef<HTMLInputElement[]>([]);

  const [canvasLeft, setCanvasLeft] = useState(0);
  const [canvasTop, setCanvasTop] = useState(0);
  const [ctx, setCtx] = useState(null);
  const [goNext, setGoNext] = useState(false);
  const [resultArr, setResultArr] = useState<any>([]);

  let target;
  let all_result: any[] = [];
  let winnerIndices: any = [];

  let inputClickNum = 0;

  let inputWidth = 100;
  let inputHeight = 30;

  const playerInputRefCallback = useCallback((el: HTMLInputElement | null) => {
    if (el) {
      playerInput.current.push(el);
    }
  }, []);

  const targetInputRefCallback = useCallback((el: HTMLInputElement | null) => {
    if (el) {
      targetInput.current.push(el);
    }
  }, []);

  const handleSetPlayerInput = () => {
    let inputNameArray = [];

    for (let i = 0; i < participants; i++) {
      let left = canvasLeft + i * 150;
      let top = canvasTop + 20;

      inputNameArray.push(
        <input
          key={i}
          value={i + 1}
          id={`line${i}`}
          onChange={() => {}}
          style={{
            position: "absolute",
            left: `${left}px`,
            top: `${top}px`,
            width: `${inputWidth}px`,
            height: `${inputHeight}px`,
            backgroundColor: "#ececec",
            textAlign: "center",
          }}
          onClick={(event) => handleDrawClickRoute(event, ctx)}
          ref={playerInputRefCallback}
          readOnly={goNext}
        />
      );
    }

    return inputNameArray;
  };

  const handleSetTargetInput = (winners: number) => {
    let inputTargetArray: any = [];

    // winners 개수만큼 랜덤한 인덱스를 생성하여 winnerIndices 배열에 추가
    while (winnerIndices.length < winners) {
      let randomIndex = Math.floor(Math.random() * participants);
      if (!winnerIndices.includes(randomIndex)) {
        winnerIndices.push(randomIndex);
      }
    }

    for (let i = 0; i < participants; i++) {
      let value = winnerIndices.includes(i) ? "Winner" : "꽝"; // winnerIndices에 속한 위치는 Winner, 아닌 곳은 꽝으로 설정
      inputTargetArray.push(
        <input
          key={i}
          style={{
            position: "absolute",
            left: `${canvasLeft + i * 150}px`,
            top: `${
              canvasTop + (canvas.current ? canvas.current.height : 0) - 37
            }px`,
            width: `${inputWidth}px`,
            height: `${inputHeight}px`,
            backgroundColor: "#ececec",
            textAlign: "center",
          }}
          onChange={() => {}}
          ref={targetInputRefCallback}
          readOnly={goNext}
          value={value}
        />
      );
    }
    target = inputTargetArray;
    return inputTargetArray;
  };

  const handleDrawClickRoute = (event: any, ctx: any) => {
    ctx.strokeStyle = "skyBlue";

    if (ctx && goNext) {
      inputClickNum++;
      const lineId = event.target.id;
      const lineIndex = Number(lineId.slice(-1));

      if (!isNaN(lineIndex)) {
        // 유효한 lineIndex인지 확인
        let result = drawGhostLegs(lineIndex);
        all_result.push([result, event.target.value]);

        if (resultArr.length >= participants) {
          return;
        } else {
          resultArr.push(all_result);
        }
      }
    }
  };

  // ---------------------- draw --------------------------

  let initialPointX = 50;
  let initialPointY = 50;
  let endLineY = 750;
  const lineIdObj: { [key: string]: any } = {};
  let randomCrossPointArrays: any[][] = [];
  let baseArrays: any[] = [];
  let moveRight = 150;
  let moveLeft = -150;
  let playersInitialXCoord: any;
  let numRandomLadders: number;
  let player: any[] = [];
  let playPen: any[] = [];
  let colorArr: any[] = [
    "red",
    "red",
    "red",
    "red",
    "red",
    "red",
    "red",
    "red",
    "red",
  ];
  let yValue: any;

  const setLadderNum = () => {
    // numRandomLadders = Math.random() < 0.5 ? 3 : 4;
    numRandomLadders = 4;
  };

  const drawVerticalLines = (ctx: any) => {
    setLadderNum();
    generateRandomCrossPoints();

    ctx.beginPath();

    // Calculate the dynamic interval between Y axes
    const interval = canvas.current.height / 10; // canvas 높이를 10등분하여 간격 계산

    for (let i = 0; i < participants; i++) {
      makeLineIdObj(i);
      // create players and initialize their start point
      player[i] = {};
      player[i].xCoord = initialPointX + i * 150;

      // Calculate the Y coordinate for each ladder without overlapping
      const startY = initialPointY + i * interval;
      const endY = startY + interval * (participants - 1);

      ctx.moveTo(player[i].xCoord, startY); // Move to the initial Y coordinate
      ctx.lineTo(player[i].xCoord, endY); // Draw line to the end Y coordinate
    }

    ctx.strokeStyle = "skyBlue";
    ctx.lineWidth = 6;
    ctx.stroke();
  };

  const makeLineIdObj = (i: any) => {
    lineIdObj[`line${i}`] = i;
  };

  const generateRandomCrossPoints = () => {
    const minGap = 100; // Minimum gap between horizontal lines
    const maxGap = 200; // Maximum gap between horizontal lines

    for (let i = 0; i < participants; i++) {
      if (i < participants - 1) {
        if (!randomCrossPointArrays[i]) {
          randomCrossPointArrays[i] = [];
        }
        if (!randomCrossPointArrays[i + 1]) {
          randomCrossPointArrays[i + 1] = [];
        }

        let previousPoint = 0;

        for (let j = 0; j < numRandomLadders; j++) {
          let randomCrossPoints =
            Math.floor(Math.random() * (maxGap - minGap) + minGap) +
            previousPoint;
          randomCrossPointArrays[i].push(randomCrossPoints);
          randomCrossPointArrays[i + 1].push(randomCrossPoints);

          previousPoint = randomCrossPoints;
        }
      }
      randomCrossPointArrays[i] = randomCrossPointArrays[i].sort(
        (a, b) => a - b
      );
      baseArrays[i] = [...randomCrossPointArrays[i]];
    }
  };

  const handleDrawBaseLine = (ctx: any) => {
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.beginPath();

    // draw 수직 baseline
    for (let i = 0; i < participants; i++) {
      player[i] = {};
      player[i].xCoord = initialPointX + i * 150;
      player[i].yCoord = initialPointY;
      ctx.moveTo(player[i].xCoord, player[i].yCoord);
      ctx.lineTo(player[i].xCoord, endLineY);
    }

    // draw 수평 baseline
    for (let i = 0; i < participants - 1; i++) {
      for (let j = 0; j < baseArrays[i].length; j++) {
        ctx.moveTo(player[i].xCoord, baseArrays[i][j]);
        ctx.lineTo(player[i].xCoord + moveRight, baseArrays[i][j]);

        if (baseArrays[i + 1] !== undefined) {
          baseArrays[i + 1] = baseArrays[i + 1].filter(function (x: any) {
            return x !== baseArrays[i][j];
          });
        }
      }
    }

    ctx.lineWidth = 6;
    ctx.stroke();
  };

  const hadnleClearCanvas = (ctx: any) => {
    if (ctx) {
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    }
  };

  const drawGhostLegs = (lineIndex: any) => {
    let i = lineIndex;

    if (ctx && i !== undefined) {
      let currentY;
      let firstY = randomCrossPointArrays[i][0];

      playPen[i] = canvas.current.getContext("2d");
      hadnleClearCanvas(ctx);
      playPen[i].lineWidth = 0.5;
      handleDrawBaseLine(ctx);

      playPen[i].beginPath();
      playPen[i].moveTo(player[i].xCoord, player[i].yCoord);

      player[i].yCoord = firstY;
      playPen[i].lineTo(player[i].xCoord, firstY);
      playPen[i].strokeStyle = colorArr[i];

      while (currentY !== player[i].yCoord) {
        currentY = player[i].yCoord;

        if (lineIndex > 0) {
          if (
            randomCrossPointArrays[lineIndex - 1].includes(player[i].yCoord)
          ) {
            player[i].xCoord += moveLeft;
            playPen[i].lineTo(player[i].xCoord, player[i].yCoord);

            lineIndex--;

            for (let j = 0; j < randomCrossPointArrays[lineIndex].length; j++) {
              yValue = randomCrossPointArrays[lineIndex][j];
              if (yValue > player[i].yCoord) {
                player[i].yCoord = yValue;
                playPen[i].lineTo(player[i].xCoord, player[i].yCoord);
                j = randomCrossPointArrays[lineIndex].length;
              }
            }
          } else if (lineIndex < participants - 1) {
            if (
              randomCrossPointArrays[lineIndex + 1].includes(player[i].yCoord)
            ) {
              player[i].xCoord += moveRight;
              playPen[i].lineTo(player[i].xCoord, player[i].yCoord);

              lineIndex++;

              for (
                let j = 0;
                j < randomCrossPointArrays[lineIndex].length;
                j++
              ) {
                yValue = randomCrossPointArrays[lineIndex][j];
                if (yValue > player[i].yCoord) {
                  player[i].yCoord = yValue;
                  playPen[i].lineTo(player[i].xCoord, player[i].yCoord);
                  j = randomCrossPointArrays[lineIndex].length;
                }
              }
            }
          }
        } else if (lineIndex < participants - 1) {
          if (
            randomCrossPointArrays[lineIndex + 1].includes(player[i].yCoord)
          ) {
            lineIndex++;
            player[i].xCoord += moveRight;
            playPen[i].lineTo(player[i].xCoord, player[i].yCoord);

            for (let j = 0; j < randomCrossPointArrays[lineIndex].length; j++) {
              yValue = randomCrossPointArrays[lineIndex][j];
              if (yValue > player[i].yCoord) {
                player[i].yCoord = yValue;
                playPen[i].lineTo(player[i].xCoord, player[i].yCoord);
                j = randomCrossPointArrays[lineIndex].length;
              }
            }
          }
        }
      }
      playPen[i].lineTo(player[i].xCoord, endLineY);
      playPen[i].lineWidth = 6;
      playPen[i].stroke();

      let result = targetInput.current[lineIndex].value;
      return result;
    }
  };

  useEffect(() => {
    if (canvas.current) {
      const context = canvas.current.getContext("2d");
      setCtx(context);
      setCanvasLeft(canvas.current.offsetLeft);
      setCanvasTop(canvas.current.offsetTop);
      drawVerticalLines(context);
      setGoNext(true);
      handleDrawBaseLine(context);
    }
  }, [canvas, ctx]);

  return (
    <Container>
      <Box>
        <Layout>
          <InputField>
            {handleSetPlayerInput()}
            <canvas
              ref={canvas}
              width={participants * 145}
              height="790"
            ></canvas>
            {handleSetTargetInput(winners)}
          </InputField>
        </Layout>
      </Box>
      <Box display="flex" sx={{ justifyContent: "right" }}>
        <Button
          style={{
            backgroundColor: "#3399FF",
            height: "10%",
          }}
          variant="contained"
          onClick={() => {
            setWorking(false);
          }}
        >
          다시하기
        </Button>
      </Box>
    </Container>
  );
};

export default Game;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;
const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
