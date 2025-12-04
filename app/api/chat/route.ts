// app/api/chat/route.ts

export async function POST(req: Request) {
  try {
    // 1) รับข้อความจาก frontend
    const body = await req.json();
    const message = body.message as string | undefined;

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Missing "message" in request body' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 2) ส่งต่อไปที่ n8n Webhook
    const n8nUrl = process.env.N8N_WEBHOOK_URL;
    if (!n8nUrl) {
      return new Response(
        JSON.stringify({ error: 'N8N_WEBHOOK_URL is not set' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const n8nRes = await fetch(n8nUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const text = await n8nRes.text();
    console.log('[n8n raw response]', n8nRes.status, text);

    // 3) ส่ง body จาก n8n กลับไปให้ frontend ตรง ๆ
    // (ใน n8n Respond to Webhook ต้องส่ง { "reply": "..." })
    return new Response(text, {
      status: n8nRes.status,
      headers: { 'Content-Type': 'application/json' },
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
