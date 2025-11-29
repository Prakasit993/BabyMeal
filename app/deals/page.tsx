import { mockDeals } from '../../src/data/deals';
import { ShoppingBag, Tag, ExternalLink } from 'lucide-react';

export default function DealsPage() {
  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-baby-text mb-2 flex items-center gap-2">
          ดีลเด็ดสำหรับลูกน้อย <ShoppingBag className="text-secondary" />
        </h1>
        <p className="text-gray-500">คัดสรรสินค้าคุณภาพ ราคาพิเศษ เพื่อคุณพ่อคุณแม่</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockDeals.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
            
            {/* รูปสินค้า */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Tag className="w-3 h-3" /> ลด {item.discount}
              </div>
            </div>

            {/* รายละเอียด */}
            <div className="p-4">
              <span className="text-xs font-medium text-gray-400 mb-1 block">{item.category}</span>
              <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 h-12">{item.title}</h3>
              
              <div className="flex items-end justify-between mt-4">
                <div>
                  <p className="text-xs text-gray-400 line-through">฿{item.originalPrice}</p>
                  <p className="text-xl font-bold text-primary">฿{item.price}</p>
                </div>
                <button className="bg-baby-blue text-blue-600 p-2 rounded-xl hover:bg-blue-600 hover:text-white transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}