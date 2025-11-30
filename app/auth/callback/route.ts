// src/app/auth/callback/route.ts
import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'
  const code = searchParams.get('code') // Google จะส่ง code มาทางนี้

  // ถ้ามี Code ส่งมา (จาก Google/Line)
  if (code) {
    const cookieStore = await cookies()
    
    // สร้างตัว Client ชั่วคราวเพื่อแลกเปลี่ยน Code เป็น Session
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    )
    
    // แลกเปลี่ยน Code เป็น Session จริงๆ
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        // ถ้าเป็น localhost ให้เด้งไปหน้าแรกเลย
        return NextResponse.redirect(`${request.nextUrl.origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${request.nextUrl.origin}${next}`)
      }
    }
  }

  // ถ้าเกิด Error ให้เด้งไปหน้า Error
  return NextResponse.redirect(`${request.nextUrl.origin}/auth/auth-code-error`)
}