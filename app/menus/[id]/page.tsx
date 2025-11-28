// src/app/menus/[id]/page.tsx
import { mockMenus } from '../../../src/data/menus';
import { ChevronLeft, Clock, ChefHat, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 1. เปลี่ยนเป็น async function และกำหนด Type ของ params เป็น Promise
export default async function MenuDetailPage(props: { params: Promise<{ id: string }> }) {
  
  // 2. ใช้ await เพื่อดึงค่า params ออกมา
  const params = await props.params;
  
  // 3. ใช้ params.id ที่ได้มาค้นหาเมนู
  const menu = mockMenus.find((m) => m.id === params.id);

  if (!menu) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* ส่วนรูปภาพ Header */}
      <div className="relative h-72 md:h-96 w-full">
        <img 
          src={menu.imageUrl} 
          alt={menu.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <Link 
          href="/menus"
          className="absolute top-6 left-4 bg-white/20 backdrop-blur hover:bg-white/40 text-white p-2 rounded-full transition-all"
        >
          <ChevronLeft className="w-8 h-8" />
        </Link>

        <div className="absolute bottom-6 left-4 md:left-8 right-4 text-white">
          <div className="flex gap-2 mb-2">
            <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm">
              {menu.ageRange}
            </span>
            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white border border-white/30">
              {menu.mealType.toUpperCase()}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-shadow">{menu.name}</h1>
        </div>
      </div>

      {/* ส่วนเนื้อหา */}
      <div className="container mx-auto px-4 py-8 -mt-6 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100">
          
          <p className="text-gray-600 text-lg mb-8 leading-relaxed border-l-4 border-primary pl-4">
            {menu.description}
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-bold text-baby-text flex items-center gap-2 mb-4">
                <ChefHat className="text-secondary" /> วัตถุดิบ
              </h2>
              <ul className="space-y-3 bg-baby-green/30 p-6 rounded-2xl">
                {menu.ingredients.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-baby-text flex items-center gap-2 mb-4">
                <Clock className="text-orange-400" /> วิธีทำ
              </h2>
              <div className="space-y-6">
                {menu.instructions.map((step, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-baby-blue text-blue-600 rounded-full flex items-center justify-center font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {index + 1}
                    </div>
                    <p className="text-gray-600 pt-1 border-b border-gray-100 pb-4 w-full group-hover:text-gray-900 transition-colors">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {menu.tags && (
            <div className="mt-10 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">ประโยชน์ที่ได้รับ</h3>
              <div className="flex flex-wrap gap-2">
                {menu.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200">
                    <CheckCircle2 className="w-3 h-3 text-green-500" /> {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}