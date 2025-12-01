'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔴 ใส่ลิงก์ Production URL ของ n8n ตรงนี้ครับ
  const N8N_WEBHOOK_URL = 'https://casinos-dinner-appendix-package.trycloudflare.com/webhook/Chatbot'; 

  const handleSend = async () => {
    if (!input.trim()) return;

    // 1. เพิ่มข้อความเราในหน้าจอ
    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      // 2. ส่งไปหา n8n AI
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      // 3. เพิ่มคำตอบ AI ในหน้าจอ
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }]); // data.reply ต้องตรงกับที่ตั้งใน Respond to Webhook
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: 'ขออภัยครับ ระบบขัดข้องชั่วคราว' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      
      {/* หน้าต่างแชท */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-[350px] h-[500px] flex flex-col border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-primary p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full"><Bot className="w-5 h-5" /></div>
              <span className="font-bold">พี่หมี BabyMeal 🐻</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages.length === 0 && (
              <p className="text-center text-gray-400 text-sm mt-10">
                สวัสดีครับ! มีอะไรให้พี่หมีช่วยมั้ยครับ? <br/>
                เช่น "ลูก 9 เดือนเบื่อข้าวทำไงดี?"
              </p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="พิมพ์คำถาม..." 
              className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="p-2 bg-primary text-white rounded-full hover:bg-primary-hover disabled:opacity-50 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ปุ่มเปิดปิด */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary hover:bg-primary-hover text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
      </button>
    </div>
  );
}