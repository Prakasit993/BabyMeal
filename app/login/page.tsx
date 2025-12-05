'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../src/lib/supabase'; // ถ้า path ไม่ตรงค่อยเปลี่ยน
import { Chrome, MessageCircle } from 'lucide-react';

const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID;

export default function LoginPage() {
  const router = useRouter();

  // ✅ ถ้ามี session (เคยล็อกอินแล้ว) ให้เด้งไปหน้า Home
  useEffect(() => {
    const checkSession = async () => {
      try {
        // ใช้ getSession แทน getUser เพื่อไม่ให้เกิด AuthSessionMissingError
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error checking session', error);
          return;
        }

        if (data.session?.user) {
          // ล็อกอินอยู่แล้ว → ไปหน้าแรก
          router.replace('/');
        }
      } catch (err) {
        // กัน error ที่ Supabase โยนออกมา
        console.error('checkSession error', err);
      }
    };

    void checkSession();
  }, [router]);

  // Login Google
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/`,
      },
    });
  };

  // Login LINE (ผ่าน LIFF โดยตรง)
  const handleLineLogin = () => {
    if (!LIFF_ID) {
      console.error('LIFF_ID is missing');
      alert('ยังไม่ได้ตั้งค่า NEXT_PUBLIC_LIFF_ID ใน .env.local');
      return;
    }

    window.location.href = `https://liff.line.me/${LIFF_ID}`;
  };

  return (
    <div className="min-h-screen bg-baby-blue/30 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center border border-white/50">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          👶
        </div>

        <h1 className="text-2xl font-bold text-baby-text mb-2">
          ยินดีต้อนรับสู่ BabyMeal
        </h1>
        <p className="text-gray-500 mb-8">
          เข้าสู่ระบบเพื่อบันทึกข้อมูลลูกน้อย
          <br />
          และดูเมนูอาหารสุดพิเศษ
        </p>

        <div className="space-y-3">
          {/* ปุ่ม Google */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50 text-gray-700 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 group"
          >
            <Chrome className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
            <span>เข้าสู่ระบบด้วย Google</span>
          </button>

          {/* ปุ่ม LINE */}
          <button
            onClick={handleLineLogin}
            className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 group shadow-lg shadow-green-500/20"
          >
            <MessageCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform fill-current" />
            <span>เข้าสู่ระบบด้วย LINE</span>
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          การเข้าสู่ระบบถือว่าท่านยอมรับข้อกำหนดและเงื่อนไขการใช้งาน
        </p>
      </div>
    </div>
  );
}
