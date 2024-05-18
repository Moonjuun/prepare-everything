"use client";
import * as React from "react";
import styles from "./page.module.css";
import MainRoulette from "./play/roullete/page";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <MainRoulette />
      </main>
    </>
  );
}
