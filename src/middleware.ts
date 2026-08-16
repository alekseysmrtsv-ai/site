import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function verifySessionToken(token: string, botToken: string): Promise<boolean> {
  if (!token || !token.startsWith('auth_')) return false;
  const parts = token.slice(5).split('.');
  if (parts.length !== 2) return false;
  const [telegramId, hmacHex] = parts;
  if (!telegramId || !hmacHex || !botToken) return false;

  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(botToken),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const signature = await crypto.subtle.sign('HMAC', key, enc.encode(telegramId));
    const expectedHmacHex = Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    return hmacHex === expectedHmacHex;
  } catch (e) {
    console.error('Error verifying HMAC session in middleware:', e);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedPath = path.startsWith('/crm') || path.startsWith('/api/leads') || path.startsWith('/api/parser');

  if (isProtectedPath) {
    const crmSession = request.cookies.get('crm_session');
    const authHeader = request.headers.get('Authorization');
    const botToken = process.env.TELEGRAM_BOT_TOKEN || '';
    
    // Проверка подлинности HMAC сессии или Bearer токена API
    const isValidSession = crmSession ? await verifySessionToken(crmSession.value, botToken) : false;
    const isValidToken = authHeader && process.env.API_SECRET_KEY && authHeader === `Bearer ${process.env.API_SECRET_KEY}`;

    if (!isValidSession && !isValidToken) {
      if (path.startsWith('/api/')) {
        return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/crm/:path*', '/api/leads/:path*', '/api/parser/:path*'],
};
