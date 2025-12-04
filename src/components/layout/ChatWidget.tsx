'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';

// Types
type ChatMessage = {
  role: 'user' | 'ai';
  text: string;
};

// Constants
const INITIAL_MESSAGE: ChatMessage = {
  role: 'ai',
  text: 'สวัสดีครับ พี่หมี BabyMeal ยินดีช่วยแนะนำเมนูสำหรับลูกน้อย 😊 บอกวัยลูกกับปัญหาที่กังวลมาได้เลยครับ',
};

const ERROR_MESSAGE = 'ขออภัยครับ ระบบขัดข้องชั่วคราว';

// Sub-components
function ChatHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-primary p-4 flex justify-between items-center text-white">
      <div className="flex items-center gap-2">
        <div className="bg-white/20 p-1.5 rounded-full">
          <Bot className="w-5 h-5" />
        </div>
        <span className="font-bold">พี่หมี BabyMeal 🐻</span>
      </div>
      <button onClick={onClose}>
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

function ChatMessages({
  messages,
  loading,
  messagesEndRef,
}: {
  messages: ChatMessage[];
  loading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
      {messages.length === 0 && (
        <p className="text-center text-gray-400 text-sm mt-10">
          สวัสดีครับ! มีอะไรให้พี่หมีช่วยมั้ยครับ? <br />
          เช่น &quot;ลูก 9 เดือนเบื่อข้าวทำไงดี?&quot;
        </p>
      )}

      {messages.map((m, i) => (
        <div
          key={i}
          className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-line ${
              m.role === 'user'
                ? 'bg-primary text-white rounded-tr-none'
                : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'
            }`}
          >
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

      {/* ให้ scroll มาที่ตรงนี้ทุกครั้งที่ messages เปลี่ยน */}
      <div ref={messagesEndRef} />
    </div>
  );
}

function ChatInput({
  input,
  loading,
  onInputChange,
  onSend,
}: {
  input: string;
  loading: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
      <input
        type="text"
        value={input}
        onChange={e => onInputChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onSend()}
        placeholder="พิมพ์คำถาม..."
        className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
      <button
        onClick={onSend}
        disabled={loading}
        className="p-2 bg-primary text-white rounded-full hover:bg-primary-hover disabled:opacity-50 transition-colors"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}

function ChatWindow({
  isOpen,
  onClose,
  messages,
  input,
  loading,
  messagesEndRef,
  onInputChange,
  onSend,
}: {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  input: string;
  loading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  onInputChange: (value: string) => void;
  onSend: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-2xl shadow-2xl w-[350px] h-[500px] flex flex-col border border-gray-100 overflow-hidden">
      <ChatHeader onClose={onClose} />
      <ChatMessages
        messages={messages}
        loading={loading}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput
        input={input}
        loading={loading}
        onInputChange={onInputChange}
        onSend={onSend}
      />
    </div>
  );
}

// Main component
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize sessionId from localStorage
  useEffect(() => {
    const existingSessionId = localStorage.getItem('chatSessionId');
    if (existingSessionId) {
      setSessionId(existingSessionId);
    } else {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chatSessionId', newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();

    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const raw = (await response.text()).trim();
      console.log('AI reply from /api/chat:', response.status, raw);

      const replyText =
        response.ok && raw && raw !== 'undefined' ? raw : ERROR_MESSAGE;

      setMessages(prev => [...prev, { role: 'ai', text: replyText }]);
    } catch (error) {
      console.error('fetch error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: ERROR_MESSAGE }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        input={input}
        loading={loading}
        messagesEndRef={messagesEndRef}
        onInputChange={setInput}
        onSend={handleSend}
      />

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary hover:bg-primary-hover text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
      </button>
    </div>
  );
}
