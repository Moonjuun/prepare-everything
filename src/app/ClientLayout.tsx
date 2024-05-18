"use client";

import * as React from "react";
import { PaletteMode, Grid } from "@mui/material";
import Footer2 from "@/common/Footer2";
import AppAppBar from "@/common/AppAppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import styles from "./page.module.css";
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 로컬 스토리지에서 이전에 선택한 모드 불러오기
  const savedMode = localStorage.getItem("colorMode");
  const [mode, setMode] = React.useState<PaletteMode>(
    savedMode === "dark" ? "dark" : "light"
  );

  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    // 토글 후 현재 모드를 로컬 스토리지에 저장
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("colorMode", newMode);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ bgcolor: "background.default" }}>
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <Grid container className={styles.main}>
          <Grid item maxWidth={"20%"} className={styles.leftsection}>
            Left Section
          </Grid>
          <Grid item maxWidth={"60%"}>
            {children}
          </Grid>
          <Grid item maxWidth={"20%"}>
            Right Section
          </Grid>
        </Grid>

        <Footer2 />
      </Box>
    </ThemeProvider>
  );
}
