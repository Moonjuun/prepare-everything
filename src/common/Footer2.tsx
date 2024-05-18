import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import Typography from "@mui/material/Typography";

import { Facebook } from "@mui/icons-material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useScript } from "@/hooks/useScript";
import { Tooltip } from "@mui/material";

const logoStyle = {
  width: "140px",
  height: "auto",
};
declare global {
  interface Window {
    Kakao: any;
  }
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {"Copyright © "}
      cmoonjun11@gmail.com&nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer2() {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [onTooltip, setOnTooltip] = useState<boolean>(false);

  // useEffect 내에서 window 객체를 사용하기 위해 useEffect 내부에서 처리해야 함
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // kakao SDK import하기
  const status = useScript(
    "https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
  );

  // kakao sdk 초기화하기
  // status가 변경될 때마다 실행되며, status가 ready일 때 초기화를 시도합니다.
  useEffect(() => {
    if (status === "ready" && typeof window !== "undefined" && window) {
      // Kakao SDK 로드 및 초기화
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("56d33c0ea3b0fb39d7745e96d23467d1");
      }
    }
  }, [status]);

  const handleKakaoButton = () => {
    // Kakao SDK가 로드되고 초기화되었는지 확인
    if (typeof window !== "undefined" && window.Kakao) {
      window.Kakao.Share.sendScrap({
        requestUrl: currentUrl,
      });
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <div>
          {/* <Link color="text.secondary" href="#">
            Privacy Policy
          </Link> */}
          {/* <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography> */}
          <Link
            color="text.secondary"
            href="https://mui.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made of MUI
          </Link>
          <Copyright />
        </div>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body1" textAlign="center" sx={{ mx: 1 }}>
            공유하기
          </Typography>
          <Stack
            direction="row"
            justifyContent="left"
            spacing={1}
            useFlexGap
            sx={{
              color: "text.secondary",
            }}
          >
            <FacebookShareButton url={currentUrl}>
              <FacebookIcon
                size={48}
                round={true}
                borderRadius={24}
              ></FacebookIcon>
            </FacebookShareButton>
            <TwitterShareButton url={currentUrl}>
              <TwitterIcon
                size={48}
                round={true}
                borderRadius={24}
              ></TwitterIcon>
            </TwitterShareButton>
            <CopyToClipboard
              text={currentUrl}
              onCopy={() => setOnTooltip(true)}
            >
              <Tooltip
                placement="top"
                open={onTooltip}
                onClose={() => setOnTooltip(false)}
                title="URL 복사됨"
              >
                <URLShareButton>URL</URLShareButton>
              </Tooltip>
            </CopyToClipboard>
            <KakaoButtonWrapper>
              <KakaoShareButton onClick={handleKakaoButton}>
                <KakaoIcon
                  src="/assets/kakaoIcon.png"
                  alt="KakaoIcon"
                ></KakaoIcon>
              </KakaoShareButton>
            </KakaoButtonWrapper>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

const URLShareButton = styled.button`
  width: 48px;
  height: 48px;
  color: white;
  border-radius: 24px;
  border: 0px;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  background-color: #7362ff;
  &:hover {
    background-color: #a99fee;
  }
  padding: 0px;
`;

// 카카오버튼
const KakaoButtonWrapper = styled.div`
  display: flex;
`;

const KakaoShareButton = styled.a`
  cursor: pointer;
`;

const KakaoIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;
