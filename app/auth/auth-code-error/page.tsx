import Link from 'next/link';

export default function AuthErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">เกิดข้อผิดพลาดในการเข้าสู่ระบบ</h1>
      <p className="text-gray-600 mb-8">อาจเกิดจากปัญหาระบบ หรือคุณยกเลิกการเข้าสู่ระบบ</p>
      <Link href="/login" className="text-blue-500 hover:underline">
        กลับไปหน้าเข้าสู่ระบบ
      </Link>
    </div>
  );
}