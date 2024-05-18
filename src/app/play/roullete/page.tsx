"use client";

// import Roulette from "./Roulette";
import nameData from "./nameData.json";
import styled from "styled-components";
import dynamic from "next/dynamic";

interface NameInfo {
  colors: any;
  info: any;
}

const Roulette = dynamic(
  () => {
    return import("./Roulette");
  },
  { ssr: false }
);

const MainRoulette: React.FC = () => {
  return (
    <Layout>
      {nameData.map((v: NameInfo, i: number) => {
        return <Roulette key={i} colors={v.colors} info={v.info} n={i} />;
      })}
    </Layout>
  );
};

export default MainRoulette;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;
