// src/app/auth/callback/route.ts
import { type EmailOtpType } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const searchParams = url.searchParams

  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'
  const code = searchParams.get('code') // ใช้กับ Google / LINE OAuth

  try {
    const cookieStore = cookies()

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
            } catch (e) {
              console.warn('[AUTH CALLBACK] setAll failed', e)
            }
          },
        },
      }
    )

    // 1) เคส Email OTP / magic link
    if (token_hash && type) {
      console.log('[AUTH CALLBACK] verifyOtp', { type })

      const { error } = await supabase.auth.verifyOtp({ token_hash, type })

      if (error) {
        console.error('[SUPABASE verifyOtp error]', error)
        return NextResponse.redirect(`${url.origin}/auth/auth-code-error`)
      }

      const redirectUrl = new URL(next, url.origin)
      redirectUrl.searchParams.delete('token_hash')
      redirectUrl.searchParams.delete('type')
      redirectUrl.searchParams.delete('next')

      return NextResponse.redirect(redirectUrl.toString())
    }

    // 2) เคส OAuth (Google / LINE)
    if (code) {
      console.log('[AUTH CALLBACK] exchangeCodeForSession with code', code)

      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      console.log('[AUTH CALLBACK] exchange result', {
        userId: data?.user?.id,
        error,
      })

      if (error) {
        console.error('[SUPABASE exchangeCodeForSession error]', error)
        return NextResponse.redirect(`${url.origin}/auth/auth-code-error`)
      }

      const redirectUrl = new URL(next, url.origin)
      return NextResponse.redirect(redirectUrl.toString())
    }

      const { data: userData, error: getUserError } = await supabase.auth.getUser()

    if (userData.user) {
      console.log(
        '[AUTH CALLBACK] no code/token but user is logged in -> redirect next',
        userData.user.id
      )
      const redirectUrl = new URL(next, url.origin)
      return NextResponse.redirect(redirectUrl.toString())
    }

    // ❗ กรณีไม่มีทั้ง token_hash และ code และไม่เจอ user
    // ใน dev เราไม่พาไปหน้า error แล้ว แต่ให้เด้งกลับหน้า next เฉย ๆ
    console.warn('[AUTH CALLBACK] missing token_hash and code and no user', {
      url: url.toString(),
      getUserError,
    })

    const redirectUrl = new URL(next, url.origin)
    return NextResponse.redirect(redirectUrl.toString())
  } catch (error) {
    console.error('[AUTH CALLBACK FATAL ERROR]', error)
    // ถ้าอยากให้ safe สุดจะพาไป /login แทนก็ได้
    return NextResponse.redirect(`${url.origin}/login`)
  }
}