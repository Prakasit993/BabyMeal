'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../src/lib/supabase'; // เรียกใช้ Supabase
import MenuCard from '../../src/components/menu/MenuCard';
import { Search, Filter, X, ChefHat, Loader2 } from 'lucide-react';
import { MenuItem } from '@/types'; // เรียกใช้ Type

const POPULAR_INGREDIENTS = ["ไข่", "ฟักทอง", "ข้าว", "ไก่", "ปลา", "ผัก", "กล้วย", "ตับ"];

export default function MenuPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  
  // สร้างตัวแปรเก็บข้อมูลเมนูจริง
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. ดึงข้อมูลจาก Supabase เมื่อเปิดหน้าเว็บ
  useEffect(() => {
    async function fetchMenus() {
      const { data, error } = await supabase.from('menus').select('*');
      
      if (error) {
        console.error('Error fetching menus:', error);
      } else if (data) {
        // แปลงข้อมูลจาก Database (snake_case) ให้เข้ากับ Code เรา (camelCase)
        const mappedMenus: MenuItem[] = data.map((item: any) => ({
          id: item.id.toString(),
          name: item.name,
          description: item.description,
          ageRange: item.age_range,   // แปลงตรงนี้
          mealType: item.meal_type,   // แปลงตรงนี้
          imageUrl: item.image_url,   // แปลงตรงนี้
          ingredients: item.ingredients || [],
          instructions: item.instructions || [],
          tags: item.tags || []
        }));
        setMenus(mappedMenus);
      }
      setLoading(false);
    }

    fetchMenus();
  }, []);

  const toggleIngredient = (ing: string) => {
    if (selectedIngredients.includes(ing)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ing));
    } else {
      setSelectedIngredients([...selectedIngredients, ing]);
    }
  };

  // Logic การกรอง (เหมือนเดิม)
  const filteredMenus = menus.filter((menu) => {
    const matchesSearch = 
      menu.name.toLowerCase().includes(searchText.toLowerCase()) ||
      menu.ingredients.some(i => i.toLowerCase().includes(searchText.toLowerCase()));

    const matchesIngredients = 
      selectedIngredients.length === 0 || 
      selectedIngredients.some(selected => 
        menu.ingredients.some(menuIng => menuIng.includes(selected))
      );

    return matchesSearch && matchesIngredients;
  });

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-baby-text mb-2">ค้นหาเมนูอาหาร 🍲</h1>
        <p className="text-gray-500">เมนูจริงจาก Database (Supabase)</p>
      </div>

      {/* Search Bar */}
      <div className="sticky top-16 z-40 bg-slate-50/95 backdrop-blur pt-4 pb-6 -mx-4 px-4 border-b border-gray-100/50">
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="ค้นหาเมนู..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white shadow-sm"
            />
             {searchText && (
              <button onClick={() => setSearchText("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        
        {/* Ingredients Chips */}
        <div>
           <div className="flex flex-wrap gap-2">
            {POPULAR_INGREDIENTS.map((ing) => {
              const isSelected = selectedIngredients.includes(ing);
              return (
                <button
                  key={ing}
                  onClick={() => toggleIngredient(ing)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                    isSelected ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200'
                  }`}
                >
                  {ing}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      ) : (
        /* Grid Result */
        filteredMenus.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {filteredMenus.map((menu) => (
              <MenuCard key={menu.id} menu={menu} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 mt-4">
            <h3 className="text-lg font-bold text-gray-600">ไม่พบเมนู</h3>
            <button onClick={() => {setSearchText(""); setSelectedIngredients([]);}} className="mt-4 text-primary underline">
              ล้างคำค้นหา
            </button>
          </div>
        )
      )}

    </div>
  );
}