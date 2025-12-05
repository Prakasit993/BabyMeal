import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import MainHeader from "../src/components/layout/MainHeader";
import ChatWidget from "../src/components/layout/ChatWidget";


const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "BabyMeal - วันนี้ลูกกินอะไรดี?",
  description: "ผู้ช่วยพ่อแม่มือใหม่ในการจัดเมนูอาหารลูกน้อย",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${kanit.className} bg-baby-blue/30`}>
        {/* หัวเว็บ */}
        <MainHeader />

        {children}

        {/* 👇 ปุ่มแชทบอท ให้โผล่ทุกหน้า */}
        <ChatWidget />
      </body>
    </html>
  );
}