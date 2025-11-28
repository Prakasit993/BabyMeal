
import { Baby, Edit2 } from 'lucide-react';

export default function ChildProfileCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-baby-blue flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-baby-blue rounded-full flex items-center justify-center text-3xl">
          👶
        </div>
        <div>
          <h2 className="text-lg font-bold text-baby-text">น้องมะลิ</h2>
          <p className="text-gray-500">อายุ 9 เดือน • หญิง</p>
        </div>
      </div>
      <button className="text-gray-400 hover:text-primary transition-colors">
        <Edit2 className="w-5 h-5" />
      </button>
    </div>
  );
}