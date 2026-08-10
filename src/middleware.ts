import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';

function verifySessionToken(token: string, botToken: string): boolean {
  if (!token || !token.startsWith('auth_')) return false;
  const parts = token.slice(5).split('.');
  if (parts.length !== 2) return false;
  const [telegramId, hmac] = parts;
  if (!telegramId || !hmac || !botToken) return false;

  const expectedHmac = crypto.createHmac('sha256', botToken).update(telegramId).digest('hex');
  return hmac === expectedHmac;
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedPath = path.startsWith('/crm') || path.startsWith('/api/leads') || path.startsWith('/api/parser');

  if (isProtectedPath) {
    const crmSession = request.cookies.get('crm_session');
    const authHeader = request.headers.get('Authorization');
    const botToken = process.env.TELEGRAM_BOT_TOKEN || '';
    
    // Проверка подлинности HMAC сессии или Bearer токена API
    const isValidSession = crmSession && verifySessionToken(crmSession.value, botToken);
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

