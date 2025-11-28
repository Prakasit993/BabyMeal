import { Utensils, Apple, Ban, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TodaySummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      
      {/* 1. มื้อหลัก */}
      <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
            <Utensils className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium bg-white px-2 py-1 rounded-full text-orange-600 border border-orange-100">
            มื้อเช้า/เย็น
          </span>
        </div>
        <h3 className="font-bold text-gray-800 mb-1">มื้อหลักวันนี้</h3>
        <p className="text-sm text-gray-600 mb-4">เน้นธาตุเหล็กและวิตามิน C จากตับและผักใบเขียว</p>
        <Link href="/menus" className="text-sm font-semibold text-orange-600 flex items-center gap-1 hover:gap-2 transition-all">
          ดูเมนูแนะนำ <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 2. ของว่าง */}
      <div className="bg-green-50 rounded-2xl p-5 border border-green-100 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 bg-green-100 rounded-lg text-green-600">
            <Apple className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium bg-white px-2 py-1 rounded-full text-green-600 border border-green-100">
            1-2 มื้อ
          </span>
        </div>
        <h3 className="font-bold text-gray-800 mb-1">ของว่างวันนี้</h3>
        <p className="text-sm text-gray-600 mb-4">ผลไม้เนื้อนิ่ม หรือโยเกิร์ตรสธรรมชาติ</p>
        <button className="text-sm font-semibold text-green-600 flex items-center gap-1 hover:gap-2 transition-all">
          ดูไอเดีย <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3. สิ่งที่ควรเลี่ยง */}
      <div className="bg-red-50 rounded-2xl p-5 border border-red-100 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 bg-red-100 rounded-lg text-red-600">
            <Ban className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium bg-white px-2 py-1 rounded-full text-red-600 border border-red-100">
            ระวัง!
          </span>
        </div>
        <h3 className="font-bold text-gray-800 mb-1">อาหารต้องห้าม</h3>
        <p className="text-sm text-gray-600 mb-4">น้ำผึ้ง (เสี่ยงโบทูลินัม) และไข่ขาวดิบ</p>
        <button className="text-sm font-semibold text-red-600 flex items-center gap-1 hover:gap-2 transition-all">
          อ่านเพิ่มเติม <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}