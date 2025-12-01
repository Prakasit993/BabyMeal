import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
// 1. นำเข้า Header และ Footer
import MainHeader from "../src/components/layout/MainHeader";
import Footer from "../src/components/layout/Footer"; // <-- เพิ่มบรรทัดนี้
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
    <html lang="th">
      <body className={`${kanit.className} antialiased bg-slate-50 text-slate-900`}>
        {/* ส่วน Header */}
        <MainHeader />

        {/* ส่วนเนื้อหาหลัก (จะยืดเต็มจอด้วย min-h-screen) */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* 2. วาง Footer ไว้ตรงนี้ (ต่อจาก main) */}
        <Footer /> 
        <ChatWidget /> {/* <-- วางตรงนี้ */}

      </body>
    </html>
  );
}