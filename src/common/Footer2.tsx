"use client";
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
      {"제작/광고 문의 "}
      cmoonjun11@gmail.com
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer2() {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [onTooltip, setOnTooltip] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const status = useScript(
    "https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
  );

  useEffect(() => {
    if (status === "ready" && typeof window !== "undefined" && window) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("56d33c0ea3b0fb39d7745e96d23467d1");
      }
    }
  }, [status]);

  const handleKakaoButton = () => {
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
        textAlign: { xs: "center", sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
          pt: { xs: 4, sm: 4 },
        }}
      >
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          공유하기
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          sx={{
            color: "text.secondary",
            flexWrap: "wrap",
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
            <TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
          </TwitterShareButton>
          <CopyToClipboard text={currentUrl} onCopy={() => setOnTooltip(true)}>
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
        <Copyright />
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
