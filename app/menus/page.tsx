// src/app/menus/page.tsx
import { mockMenus } from '../../src/data/menus';       // <-- แก้แล้ว
import MenuCard from '../../src/components/menu/MenuCard'; // <-- แก้แล้ว
import { Search, Filter } from 'lucide-react';

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      
      {/* 1. Header ของหน้านี้ */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-baby-text mb-2">ค้นหาเมนูอาหาร 🍲</h1>
        <p className="text-gray-500">รวมเมนูเด็ด มีประโยชน์ สำหรับลูกน้อยวัย 6 เดือน - 3 ขวบ</p>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 sticky top-20 z-40 bg-slate-50/95 backdrop-blur py-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="ค้นหาเมนู... (เช่น ข้าวผัด, ฟักทอง)" 
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white shadow-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
          <Filter className="w-5 h-5" />
          ตัวกรอง
        </button>
      </div>

      {/* 3. Grid แสดงรายการอาหาร */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMenus.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>

    </div>
  );
}