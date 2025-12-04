// app/api/chat/route.ts

import { NextRequest } from 'next/server';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL!;

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId } = await req.json();

    // ตรวจสอบ message
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Missing "message" in request body' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // ตรวจสอบ N8N_WEBHOOK_URL
    if (!N8N_WEBHOOK_URL) {
      return new Response(
        JSON.stringify({ error: 'N8N_WEBHOOK_URL is not set' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // ส่งไป n8n พร้อม sessionId
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sessionId }),
    });

    const text = await res.text();
    console.log('[n8n raw response]', res.status, text);

    return new Response(text, {
      status: res.status,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (err) {
    console.error('[api/chat] error', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
