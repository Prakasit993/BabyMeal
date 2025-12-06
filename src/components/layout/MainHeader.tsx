'use client'; // 1. ต้องเป็น Client Component

import Link from 'next/link';
import { Baby, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase'; // เรียกใช้ Supabase
import { User as SupabaseUser } from '@supabase/supabase-js';

export default function MainHeader() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // 2. เช็คว่าล็อกอินอยู่ไหม เมื่อเปิดเว็บ
  useEffect(() => {
    // ดึงสถานะ session/ผู้ใช้จาก Supabase (ใช้ getSession เพื่ออ่านจากระบบจริง)
    const fetchSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        // session?.user มีค่าถ้าล็อกอินอยู่
        setUser(data?.session?.user ?? null);
      } catch (err) {
        setUser(null);
      } finally {
        setIsAuthChecked(true);
      }
    };
    fetchSession();

    // ฟังเหตุการณ์ Login/Logout (เพื่อให้ UI เปลี่ยนทันทีไม่ต้องรีเฟรช)
    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsAuthChecked(true);
    });

    // ทำความสะอาดเมื่อ component ถูกยกเลิก
    const subscription = authListener?.data?.subscription;
    return () => subscription?.unsubscribe?.();
  }, []);

  // ฟังก์ชัน Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/'; // รีเฟรชหน้าเว็บ
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-baby-pink/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* โลโก้ */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
            <Baby className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold text-baby-text tracking-tight">
            BabyMeal
          </span>
        </Link>

        {/* เมนู Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-600 hover:text-primary font-medium transition-colors">หน้าแรก</Link>
          <Link href="/menus" className="text-gray-600 hover:text-primary font-medium transition-colors">ค้นหาเมนู</Link>
          <Link href="/faq" className="text-gray-600 hover:text-primary font-medium transition-colors">ปัญหาที่พบบ่อย</Link>
        </nav>

        {/* ปุ่มขวา */}
        <div className="flex items-center gap-3">
          <Link href="/deals" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-full font-medium transition-all">
            <ShoppingBag className="w-4 h-4" />
            <span>ดีลเด็ด</span>
          </Link>

          {/* 3. เงื่อนไขการแสดงปุ่ม Login / Profile */}
          {isAuthChecked ? (
            user ? (
              // ถ้าล็อกอินแล้ว: แสดงรูปโปรไฟล์ + ปุ่ม Logout
              <div className="flex items-center gap-3 ml-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                      <img 
                          src={user.user_metadata?.avatar_url || "https://placehold.co/100x100?text=U"} 
                          alt="User" 
                          className="w-full h-full object-cover"
                      />
                  </div>
                  <button 
                      onClick={handleLogout}
                      className="text-xs text-red-500 hover:underline"
                  >
                      ออก
                  </button>
              </div>
            ) : (
              // ถ้ายังไม่ล็อกอิน: แสดงปุ่มเข้าสู่ระบบ
              <Link href="/login" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary-hover shadow-sm shadow-primary/20 transition-all">
                <User className="w-4 h-4" />
                <span>เข้าสู่ระบบ</span>
              </Link>
            )
          ) : null}

          <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* เมนูมือถือ */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-baby-pink/50 bg-white/90 backdrop-blur-md">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-primary font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              หน้าแรก
            </Link>
            <Link 
              href="/menus" 
              className="text-gray-600 hover:text-primary font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              ค้นหาเมนู
            </Link>
            <Link 
              href="/faq" 
              className="text-gray-600 hover:text-primary font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              ปัญหาที่พบบ่อย
            </Link>
            <Link 
              href="/deals" 
              className="text-secondary hover:text-primary font-medium transition-colors py-2 sm:hidden"
              onClick={() => setIsMenuOpen(false)}
            >
              ดีลเด็ด
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}