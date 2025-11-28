import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
// 1. นำเข้า Header ที่เพิ่งสร้าง
import MainHeader from "../src/components/layout/MainHeader";

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
    <html lang="th">
      <body className={`${kanit.className} antialiased bg-slate-50 text-slate-900`}>
        {/* 2. วาง Header ไว้ด้านบนสุด */}
        <MainHeader />
        
        {/* ส่วนเนื้อหาของแต่ละหน้าจะมาแทนที่ children */}
        <main className="min-h-screen">
            {children}
        </main>
      </body>
    </html>
  );
}