// layout.tsx
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kuri, 이 중에 하나쯤은???",
  description: "Kuri, 쿠리, 룰렛, 계산기, 사다리 게임, 게시판, 심리 테스트",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "쿠리 Kuri, 이 중에 하나쯤은??? ",
    url: "https://www.ai-ai.link",
    siteName: "쿠리 Kuri",
    locale: "ko",
    type: "website",
  },
  keywords: [
    "쿠리 Kuri",
    "계산기",
    "룰렛",
    "유용한 정보",
    "심리 테스트",
    "사다리 게임",
    "게시판",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
