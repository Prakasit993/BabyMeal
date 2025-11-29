import { mockFaqs } from '../../src/data/faqs';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8 pb-20 max-w-3xl">
      
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-baby-text mb-2 flex items-center justify-center gap-2">
          ปัญหาที่พบบ่อย <HelpCircle className="text-secondary" />
        </h1>
        <p className="text-gray-500">รวมคำถามยอดฮิตที่คุณพ่อคุณแม่มือใหม่สงสัย</p>
      </div>

      <div className="space-y-4">
        {mockFaqs.map((faq, index) => (
          <details key={index} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden open:shadow-md transition-all">
            <summary className="flex items-center justify-between p-6 cursor-pointer list-none bg-white hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-baby-blue text-blue-600 text-xs font-bold rounded-full">
                  {faq.category}
                </span>
                <h3 className="font-bold text-gray-800 text-lg group-open:text-primary transition-colors">
                  {faq.question}
                </h3>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-300" />
            </summary>
            <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed border-t border-gray-50 bg-baby-green/10">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>

      {/* กล่องติดต่อแพทย์ */}
      <div className="mt-12 bg-orange-50 rounded-2xl p-6 text-center border border-orange-100">
        <p className="text-orange-800 font-medium">
          ⚠️ หมายเหตุ: ข้อมูลนี้เป็นคำแนะนำเบื้องต้นเท่านั้น หากลูกมีอาการป่วยรุนแรง ควรพาลูกไปพบแพทย์ทันที
        </p>
      </div>

    </div>
  );
}