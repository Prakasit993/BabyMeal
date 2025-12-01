'use client'; // ต้องมีบรรทัดนี้เพื่อให้กดปุ่มได้

import { useState, useEffect } from 'react';
import { Baby, Edit2, Plus, Save, X, User } from 'lucide-react';

// โครงสร้างข้อมูลลูก
interface ChildData {
  name: string;
  age: string;
  gender: string;
}

export default function ChildProfileCard() {
  // สถานะ: มีข้อมูลหรือไม่?
  const [hasData, setHasData] = useState(false);
  // สถานะ: กำลังแก้ไขอยู่หรือไม่?
  const [isEditing, setIsEditing] = useState(false);
  
  // ข้อมูลลูก (ค่าเริ่มต้นว่างๆ)
  const [child, setChild] = useState<ChildData>({
    name: '',
    age: '',
    gender: 'หญิง'
  });

  // โหลดข้อมูลจาก LocalStorage ตอนเปิดเว็บ (เพื่อให้ข้อมูลไม่หายตอนรีเฟรช)
  useEffect(() => {
    const savedData = localStorage.getItem('baby_profile');
    if (savedData) {
      setChild(JSON.parse(savedData));
      setHasData(true);
    }
  }, []);

  // ฟังก์ชันบันทึกข้อมูล
  const handleSave = () => {
    localStorage.setItem('baby_profile', JSON.stringify(child));
    setHasData(true);
    setIsEditing(false);
  };

  // ฟังก์ชันลบ/แก้ไข
  const handleEdit = () => {
    setIsEditing(true);
  };

  // --- ส่วนที่ 1: ฟอร์มกรอกข้อมูล (แสดงตอนกดเพิ่ม หรือ กดแก้ไข) ---
  if (isEditing || !hasData) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-baby-blue flex flex-col gap-4 transition-all">
        
        {!hasData && !isEditing ? (
          // 1.1 ยังไม่มีข้อมูล (แสดงปุ่มให้กดเพิ่ม)
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center gap-3 py-4 text-gray-400 hover:text-primary transition-colors"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>
            <span className="font-medium">เพิ่มข้อมูลลูกน้อย เพื่อรับคำแนะนำที่ตรงใจ</span>
          </button>
        ) : (
          // 1.2 ฟอร์มกรอกข้อมูล (แสดงตอนกด Edit หรือกดเพิ่ม)
          <div className="space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-700 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> ข้อมูลลูกน้อย
              </h3>
              {hasData && (
                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-red-500">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="grid gap-3">
              <div>
                <label className="text-xs text-gray-500 ml-1">ชื่อเล่น</label>
                <input 
                  type="text" 
                  value={child.name}
                  onChange={(e) => setChild({...child, name: e.target.value})}
                  placeholder="เช่น น้องมะลิ"
                  className="w-full p-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-baby-blue bg-gray-50"
                />
              </div>
              
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 ml-1">อายุ (เดือน/ขวบ)</label>
                  <input 
                    type="text" 
                    value={child.age}
                    onChange={(e) => setChild({...child, age: e.target.value})}
                    placeholder="เช่น 9 เดือน"
                    className="w-full p-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-baby-blue bg-gray-50"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 ml-1">เพศ</label>
                  <select 
                    value={child.gender}
                    onChange={(e) => setChild({...child, gender: e.target.value})}
                    className="w-full p-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-baby-blue bg-gray-50"
                  >
                    <option value="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSave}
              className="w-full py-2 bg-primary text-white rounded-xl font-bold shadow-sm hover:bg-primary-hover flex items-center justify-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" /> บันทึกข้อมูล
            </button>
          </div>
        )}
      </div>
    );
  }

  // --- ส่วนที่ 2: การ์ดแสดงผล (เมื่อมีข้อมูลแล้ว) ---
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-baby-blue flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-baby-blue/50 rounded-full flex items-center justify-center text-3xl shadow-inner border border-white">
          {child.gender === 'ชาย' ? '👦' : '👧'}
        </div>
        <div>
          <h2 className="text-lg font-bold text-baby-text">{child.name}</h2>
          <p className="text-gray-500 text-sm">อายุ {child.age} • {child.gender}</p>
        </div>
      </div>
      <button 
        onClick={handleEdit}
        className="p-2 text-gray-300 hover:text-primary hover:bg-baby-blue/20 rounded-full transition-all"
      >
        <Edit2 className="w-5 h-5" />
      </button>
    </div>
  );
}