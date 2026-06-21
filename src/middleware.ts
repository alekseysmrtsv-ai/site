import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Защищаем только роуты начинающиеся с /crm
  if (request.nextUrl.pathname.startsWith('/crm')) {
    const crmSession = request.cookies.get('crm_session');
    
    if (!crmSession || crmSession.value !== 'authenticated') {
      // Редирект на логин, если куки нет
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/crm/:path*'],
};
