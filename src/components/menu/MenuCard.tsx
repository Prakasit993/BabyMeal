// src/components/menu/MenuCard.tsx
import { MenuItem } from '@/types';
import { User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface MenuCardProps {
  menu: MenuItem;
}

export default function MenuCard({ menu }: MenuCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
      
      {/* 1. ส่วนรูปภาพ */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={menu.imageUrl || "https://placehold.co/600x400?text=No+Image"} 
          alt={menu.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge บอกวัย */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm flex items-center gap-1">
          <User className="w-3 h-3" />
          {menu.ageRange}
        </div>
      </div>

      {/* 2. ส่วนเนื้อหา */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
            {/* Tag ประเภทมื้อ */}
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded text-white
              ${menu.mealType === 'breakfast' ? 'bg-orange-400' : 
                menu.mealType === 'lunch' ? 'bg-blue-400' :
                menu.mealType === 'dinner' ? 'bg-indigo-400' : 'bg-pink-400'}
            `}>
              {menu.mealType.toUpperCase()}
            </span>
        </div>

        <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">
          {menu.name}
        </h3>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 h-10">
          {menu.description}
        </p>

        {/* 3. ส่วน Tags และ ปุ่ม (Footer) */}
        <div className="flex items-center justify-between mt-4 border-t border-gray-50 pt-3">
          <div className="flex gap-2 text-xs text-gray-400">
             {(() => {
               let firstTag = "";
               if (Array.isArray(menu.tags) && menu.tags.length > 0) {
                 firstTag = menu.tags[0];
               } else if (typeof menu.tags === 'string') {
                 try {
                   const parsed = JSON.parse(menu.tags);
                   if (Array.isArray(parsed) && parsed.length > 0) firstTag = parsed[0];
                 } catch {
                   firstTag = (menu.tags as string).replace(/[\[\]"]/g, '').split(',')[0];
                 }
               }

               if (firstTag) {
                 return (
                   <span className="bg-gray-100 px-2 py-1 rounded-md text-gray-500">
                     #{firstTag}
                   </span>
                 );
               }
               return null;
             })()}
          </div>
          
          <Link 
            href={`/menus/${menu.id}`}
            className="text-sm font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all"
          >
            ดูวิธีทำ <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}