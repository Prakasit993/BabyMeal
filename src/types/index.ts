// src/types/index.ts

// ประเภทมื้ออาหาร
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

// โครงสร้างข้อมูลเมนูอาหาร
export interface MenuItem {
  id: string;
  name: string;
  ageRange: string;      // เช่น "6-8 เดือน"
  mealType: MealType;
  description: string;   // คำอธิบายสั้นๆ 1 บรรทัด
  imageUrl?: string;     // URL รูปภาพ
  ingredients: string[]; // รายการวัตถุดิบ
  instructions: string[];// วิธีทำ
  caution?: string;      // ข้อควรระวัง
  tags?: string[];       // เช่น ["แก้ท้องผูก", "เพิ่มน้ำหนัก"]
}

// โครงสร้างข้อมูลบทความ
export interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;       // เกริ่นนำสั้นๆ
  category: string;
}