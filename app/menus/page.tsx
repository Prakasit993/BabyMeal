'use client'; // 1. ต้องใส่บรรทัดนี้เพื่อให้ใช้ useState ได้

import { useState } from 'react';
import { mockMenus } from '../../src/data/menus';
import MenuCard from '../../src/components/menu/MenuCard';
import { Search, Filter, X, ChefHat } from 'lucide-react';

// รายการวัตถุดิบยอดฮิตสำหรับทำปุ่มกดเร็ว
const POPULAR_INGREDIENTS = ["ไข่", "ฟักทอง", "ข้าว", "ไก่", "ปลา", "ผัก", "กล้วย", "ตับ"];

export default function MenuPage() {
  // 2. สร้างตัวแปรเก็บค่าการค้นหา
  const [searchText, setSearchText] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  // ฟังก์ชันเลือก/ยกเลิกเลือกวัตถุดิบ
  const toggleIngredient = (ing: string) => {
    if (selectedIngredients.includes(ing)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ing));
    } else {
      setSelectedIngredients([...selectedIngredients, ing]);
    }
  };

  // 3. Logic การกรองเมนู (หัวใจหลัก)
  const filteredMenus = mockMenus.filter((menu) => {
    // 3.1 กรองจากช่องค้นหา (หาในชื่อเมนู หรือ ในวัตถุดิบก็ได้)
    const matchesSearch = 
      menu.name.toLowerCase().includes(searchText.toLowerCase()) ||
      menu.ingredients.some(i => i.toLowerCase().includes(searchText.toLowerCase()));

    // 3.2 กรองจากปุ่มวัตถุดิบที่เลือก (ถ้ามีการเลือก)
    const matchesIngredients = 
      selectedIngredients.length === 0 || 
      selectedIngredients.some(selected => 
        menu.ingredients.some(menuIng => menuIng.includes(selected))
      );

    return matchesSearch && matchesIngredients;
  });

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-baby-text mb-2">ค้นหาเมนูอาหาร 🍲</h1>
        <p className="text-gray-500">มีวัตถุดิบอะไรบ้าง? ลองพิมพ์หรือเลือกด้านล่างได้เลยครับ</p>
      </div>

      {/* Search & Filter Section */}
      <div className="sticky top-16 z-40 bg-slate-50/95 backdrop-blur pt-4 pb-6 -mx-4 px-4 border-b border-gray-100/50">
        
        {/* ช่องค้นหา */}
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="พิมพ์ชื่อเมนู หรือ วัตถุดิบ (เช่น ข้าวผัด, แครอท)..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white shadow-sm"
            />
            {searchText && (
              <button 
                onClick={() => setSearchText("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* ปุ่มเลือกวัตถุดิบด่วน (Chips) */}
        <div>
          <span className="text-xs font-bold text-gray-400 mb-2 block flex items-center gap-1">
            <ChefHat className="w-3 h-3" /> วัตถุดิบที่มีในตู้เย็น:
          </span>
          <div className="flex flex-wrap gap-2">
            {POPULAR_INGREDIENTS.map((ing) => {
              const isSelected = selectedIngredients.includes(ing);
              return (
                <button
                  key={ing}
                  onClick={() => toggleIngredient(ing)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                    isSelected 
                      ? 'bg-primary text-white border-primary shadow-md shadow-primary/20' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                  }`}
                >
                  {ing}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid แสดงรายการอาหาร */}
      {filteredMenus.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {filteredMenus.map((menu) => (
            <MenuCard key={menu.id} menu={menu} />
          ))}
        </div>
      ) : (
        // กรณีไม่เจอเมนู
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 mt-4">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            🤔
          </div>
          <h3 className="text-lg font-bold text-gray-600">ไม่พบเมนูที่คุณค้นหา</h3>
          <p className="text-gray-400">ลองเปลี่ยนคำค้นหา หรือเลือกวัตถุดิบอื่นดูนะครับ</p>
          <button 
            onClick={() => {setSearchText(""); setSelectedIngredients([]);}}
            className="mt-4 text-primary hover:underline"
          >
            ล้างคำค้นหาทั้งหมด
          </button>
        </div>
      )}

    </div>
  );
}