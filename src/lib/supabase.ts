import { createClient } from '@supabase/supabase-js';

// ดึงค่ากุญแจจากไฟล์ .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// สร้างตัวเชื่อมต่อ
export const supabase = createClient(supabaseUrl, supabaseKey);