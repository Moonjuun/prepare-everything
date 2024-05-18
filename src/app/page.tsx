"use client";
import * as React from "react";
import styles from "./page.module.css";
import { PaletteMode } from "@mui/material";
import Footer2 from "@/common/Footer2";
import AppAppBar from "@/common/AppAppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getLPTheme from "@/common/getLPTheme";
import Banner from "@/common/Banner";

export default function Home() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
        <CssBaseline />
        <Box sx={{ bgcolor: "background.default" }}>
          <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
          <main className={styles.main}></main>
          <Footer2 />
        </Box>
      </ThemeProvider>
    </>
  );
}
