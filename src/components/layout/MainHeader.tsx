// src/components/layout/MainHeader.tsx
import Link from 'next/link';
import { Baby, Menu, Search, ShoppingBag } from 'lucide-react'; // ดึงไอคอนมาใช้

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-baby-pink/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* 1. โลโก้ (ซ้ายสุด) */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
            <Baby className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold text-baby-text tracking-tight">
            BabyMeal
          </span>
        </Link>

        {/* 2. เมนู Desktop (ซ่อนในมือถือ) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-600 hover:text-primary font-medium transition-colors">
            หน้าแรก
          </Link>
          <Link href="/menus" className="text-gray-600 hover:text-primary font-medium transition-colors">
            ค้นหาเมนู
          </Link>
          <Link href="/faq" className="text-gray-600 hover:text-primary font-medium transition-colors">
            ปัญหาที่พบบ่อย
          </Link>
        </nav>

        {/* 3. ปุ่มขวาสุด (ค้นหา + ดีล + เมนูมือถือ) */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:text-primary hover:bg-baby-blue rounded-full transition-all">
            <Search className="w-5 h-5" />
          </button>
          
          <Link href="/deals" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-full font-medium transition-all">
            <ShoppingBag className="w-4 h-4" />
            <span>ดีลเด็ด</span>
          </Link>

          {/* ปุ่มเมนูสำหรับมือถือ (Mobile Menu Button) */}
          <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>
    </header>
  );
}