import ChildProfileCard from '../src/components/home/ChildProfileCard';
import TodaySummaryCards from '../src/components/home/TodaySummaryCards';
import { ChefHat } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '../lib/supabase'; // <-- เพิ่มบรรทัดนี้

export default async function Home() {
  // --- โซนทดสอบ Supabase ---
  const { data: menus, error } = await supabase.from('menus').select('*');
  
  if (error) {
    console.error("❌ เชื่อมต่อ Supabase ไม่สำเร็จ:", error.message);
  } else {
    console.log("✅ เชื่อมต่อสำเร็จ! เจอเมนูจำนวน:", menus?.length);
    console.log("ตัวอย่างข้อมูล:", menus);
  }
  // -------------------------
  return (
    <div className="pb-20">
      
      {/* 1. Hero Section (ส่วนหัวทักทาย) */}
      <section className="bg-gradient-to-b from-baby-blue/30 to-white px-4 pt-8 pb-6 rounded-b-[2rem]">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-baby-text mb-2">
            สวัสดีคุณพ่อคุณแม่! 👋
          </h1>
          <p className="text-gray-600 mb-6">
            วันนี้ลูกควรกินอะไรดี? ให้ BabyMeal ช่วยคิดนะครับ
          </p>
          
          {/* การ์ดข้อมูลลูก */}
          <ChildProfileCard />
        </div>
      </section>

      {/* 2. Main Content (เนื้อหาหลัก) */}
      <section className="container mx-auto max-w-2xl px-4 mt-6">
        
        {/* หัวข้อส่วนสรุป */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-baby-text">📌 สรุปสำหรับวันนี้</h2>
          <span className="text-sm text-gray-400">9 เดือน 12 วัน</span>
        </div>

        {/* การ์ดสรุป 3 ใบ */}
        <TodaySummaryCards />

        {/* ปุ่มไปหน้าเมนูแบบเต็ม */}
        <div className="mt-8">
          <Link href="/menus" className="w-full bg-primary hover:bg-primary-hover text-white p-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-primary/20 transition-all">
            <ChefHat className="w-6 h-6" />
            <span className="font-bold text-lg">ค้นหาเมนูอาหารทั้งหมด</span>
          </Link>
        </div>

      </section>
    </div>
  );
}