import { MenuItem } from "@/types";

export const mockMenus: MenuItem[] = [
  {
    id: "1",
    name: "ข้าวตุ๋นตำลึงตับบด",
    ageRange: "6-8 เดือน",
    mealType: "lunch",
    description: "เมนูธาตุเหล็กสูง ช่วยเรื่องเลือดจาง บดละเอียดทานง่าย",
    imageUrl: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=500",
    ingredients: ["ข้าวสวยหุงสุก 2 ช้อนโต๊ะ", "ตับไก่ 1 ชิ้น", "ใบตำลึง 5-6 ใบ", "น้ำซุปผัก"],
    instructions: ["ลวกตับไก่ให้สุก", "ต้มข้าวกับน้ำซุปจนนิ่ม", "ใส่ใบตำลึงและตับลงไปต้มต่อ", "นำไปปั่นละเอียด"],
    tags: ["ธาตุเหล็กสูง", "บดละเอียด"]
  },
  {
    id: "2",
    name: "ซุปฟักทองไข่แดง",
    ageRange: "6-8 เดือน",
    mealType: "dinner",
    description: "วิตามินเอสูง บำรุงสายตา รสชาติหวานทานง่าย",
    imageUrl: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&q=80&w=500",
    ingredients: ["ฟักทองนึ่ง 2 ชิ้น", "ไข่แดงต้มสุก 1 ฟอง", "นมแม่/นมผง 2 ออนซ์"],
    instructions: ["บดฟักทองขณะร้อน", "ผสมไข่แดงและนม", "คนให้เข้ากันจนเนียน"],
    tags: ["บำรุงสายตา", "เพิ่มน้ำหนัก"]
  },
  {
    id: "3",
    name: "แพนเค้กกล้วยน้ำว้า",
    ageRange: "8-12 เดือน",
    mealType: "snack",
    description: "ของว่างทานเล่น ฝึกการหยิบจับ (Finger Food)",
    imageUrl: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=500",
    ingredients: ["กล้วยน้ำว้าสุกงอม 1 ลูก", "ไข่ไก่ 1 ฟอง", "ข้าวโอ๊ต 2 ช้อนโต๊ะ"],
    instructions: ["บดกล้วยให้ละเอียด", "ตอกไข่ใส่ข้าวโอ๊ต ผสมให้เข้ากัน", "จี่บนกระทะไฟอ่อนจนสุกเหลือง"],
    tags: ["Finger Food", "ขับถ่ายดี"]
  },
  {
    id: "4",
    name: "ข้าวผัดปลาแซลมอน",
    ageRange: "1 ปี+",
    mealType: "lunch",
    description: "โอเมก้า 3 สูง บำรุงสมอง ฝึกเคี้ยว",
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=500",
    ingredients: ["ข้าวสวย 1 ถ้วย", "ปลาแซลมอนหั่นเต๋า", "แครอทหั่นเต๋า", "บร็อคโคลี่"],
    instructions: ["ผัดผักให้สุก", "ใส่ปลาแซลมอนผัดให้สุก", "ใส่ข้าวลงไปผัด ปรุงรสอ่อนๆ"],
    tags: ["บำรุงสมอง", "ฝึกเคี้ยว"]
  }
];