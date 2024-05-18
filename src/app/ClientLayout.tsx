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
  const [mode, setMode] = React.useState<PaletteMode>("light");

  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
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
