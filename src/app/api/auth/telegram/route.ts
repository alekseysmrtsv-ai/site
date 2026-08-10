import { NextResponse } from 'next/server';
import crypto from 'crypto';

function checkSignature(data: any, botToken: string): boolean {
  if (!botToken) return false;
  
  const { hash, ...dataToCheck } = data;
  
  // 1. Сортируем ключи по алфавиту и собираем строку
  const checkString = Object.keys(dataToCheck)
    .sort()
    .map(k => `${k}=${dataToCheck[k]}`)
    .join('\n');

  // 2. Генерируем секретный ключ (SHA256 от токена)
  const secretKey = crypto.createHash('sha256').update(botToken).digest();

  // 3. Считаем HMAC-SHA256
  const hmac = crypto.createHmac('sha256', secretKey).update(checkString).digest('hex');

  // 4. Сравниваем
  return hmac === hash;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = Object.fromEntries(searchParams.entries());

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const adminIdStr = process.env.TELEGRAM_ADMIN_ID;

  if (!botToken) {
    return NextResponse.json({ error: "Telegram Bot Token is not configured on the server." }, { status: 500 });
  }

  // 1. Проверяем подпись Telegram (чтобы никто не мог подделать данные)
  const isValid = checkSignature(data, botToken);
  if (!isValid) {
    return NextResponse.redirect(new URL('/login?error=invalid_signature', request.url));
  }

  // 2. Проверяем, есть ли этот пользователь в белом списке (Admin ID)
  const allowedAdminIds = adminIdStr ? adminIdStr.split(',').map(id => id.trim()) : [];
  if (!allowedAdminIds.includes(data.id?.toString())) {
    return NextResponse.redirect(new URL('/login?error=unauthorized_id', request.url));
  }

  // 3. Все проверки пройдены, ставим криптографически подписанный токен сессии (auth_ID.HMAC)
  const hmac = crypto.createHmac('sha256', botToken).update(data.id.toString()).digest('hex');
  const sessionToken = `auth_${data.id}.${hmac}`;

  const response = NextResponse.redirect(new URL('/crm', request.url));
  response.cookies.set({
    name: 'crm_session',
    value: sessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 неделя
    path: '/',
  });

  return response;
}
