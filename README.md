This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# 👶 BabyMeal (Version 1.0 - Frontend MVP)

> **"วันนี้ลูกควรกินอะไรดี?"**
> BabyMeal คือเว็บแอปพลิเคชันที่ช่วยพ่อแม่มือใหม่ค้นหาเมนูอาหารสำหรับลูกน้อยวัย 6 เดือน - 3 ขวบ พร้อมคำแนะนำด้านโภชนาการ และการจัดการวัตถุดิบที่มีในตู้เย็น

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Custom Theme: Baby Soft Tones)
* **Icons:** Lucide React
* **Font:** Kanit (Google Fonts)
* **Data:** Static Mock Data (เตรียมเชื่อมต่อ Backend)

---

## ✨ ฟีเจอร์ที่ใช้งานได้แล้ว (Completed Features)

### 1. 🏠 หน้าแรก (Home)
* **Child Profile:** การ์ดแสดงข้อมูลลูกน้อย (ชื่อ, อายุ)
* **Daily Summary:** สรุปคำแนะนำรายวัน (เมนูหลัก, ของว่าง, สิ่งที่ควรระวัง)
* **Navigation:** เมนูนำทางที่รองรับทั้ง Desktop และ Mobile

### 2. 🍲 ค้นหาเมนูอาหาร (Smart Search)
* **Menu Grid:** แสดงรายการอาหารพร้อมป้ายกำกับช่วงวัยและประเภทมื้อ
* **Search Bar:** ค้นหาได้ทันทีด้วยชื่อเมนู
* **Fridge-to-Pan:** ฟีเจอร์ "วัตถุดิบที่มี" กรองเมนูจากของในตู้เย็น (เช่น มีไข่, ฟักทอง ทำอะไรได้บ้าง?)

### 3. 📖 รายละเอียดเมนู (Recipe Detail)
* **Dynamic Routing:** รองรับเมนูไม่จำกัดด้วยระบบ `/menus/[id]`
* **Step-by-Step:** แสดงวัตถุดิบและวิธีทำที่อ่านง่าย
* **Nutrients:** แท็กบอกประโยชน์ทางโภชนาการ

### 4. ❓ ปัญหาที่พบบ่อย (FAQ)
* รวบรวมคำถามยอดฮิตเกี่ยวกับการกินของเด็ก
* รูปแบบ Accordion (ยืด-หดได้) เพื่อความสบายตา

### 5. 🛍️ ดีลเด็ด (Deals)
* หน้ารวมสินค้าแม่และเด็ก (Affiliate Model)
* แสดงราคาส่วนลดและลิงก์ไปยังร้านค้า

---

## 📂 โครงสร้างโฟลเดอร์ (Folder Structure)

```text
/src
├── /app                # หน้าเว็บต่างๆ (App Router)
│   ├── /deals          # หน้าดีล
│   ├── /faq            # หน้าคำถามที่พบบ่อย
│   ├── /menus          # หน้าค้นหาเมนู
│   │   └── /[id]       # หน้ารายละเอียดเมนู (Dynamic)
│   └── page.tsx        # หน้า Home
├── /components         # ชิ้นส่วน UI
│   ├── /home           # (ChildCard, SummaryCards)
│   ├── /layout         # (Header, Footer)
│   └── /menu           # (MenuCard)
├── /data               # ข้อมูลจำลอง (Mock Data)
│   ├── deals.ts
│   ├── faqs.ts
│   └── menus.ts
└── /types              # TypeScript Interfaces

🚀 วิธีติดตั้งและรันโปรเจกต์ (Installation)
Clone โปรเจกต์:

Bash

git clone <your-repo-url>
ติดตั้ง Dependencies:

Bash

npm install
รันเซิร์ฟเวอร์ (Development Mode):

Bash

npm run dev
เปิด Browser ไปที่ http://localhost:3000

🔜 แผนงานถัดไป (Roadmap to Backend)
[ ] Database Setup: เชื่อมต่อฐานข้อมูล (Supabase/PostgreSQL)

[ ] API Routes: สร้าง API สำหรับดึงข้อมูลเมนูจริง แทน Mock Data

[ ] Authentication: ระบบล็อกอินสมาชิก

[ ] Admin Panel: ระบบหลังบ้านสำหรับเพิ่ม/แก้ไขเมนูอาหาร

Developed by Prakasit for BabyMeal Project