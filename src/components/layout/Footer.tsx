import { Baby, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="bg-primary/10 p-1.5 rounded-full">
                <Baby className="w-5 h-5 text-primary" />
              </div>
              <span className="text-lg font-bold text-baby-text">BabyMeal</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 BabyMeal. ช่วยคุณพ่อคุณแม่ดูแลลูกน้อย
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-pink-600 hover:bg-pink-50 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-sky-500 hover:bg-sky-50 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}