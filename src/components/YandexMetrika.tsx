'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const YM_ID = 111790160;

// Хелпер для вызова ym() с проверкой
export function ymEvent(target: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.ym === 'function') {
    window.ym(YM_ID, 'reachGoal', target, params);
  }
}

export default function YandexMetrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.ym === 'function') {
      window.ym(YM_ID, 'hit', pathname + (searchParams?.toString() ? '?' + searchParams.toString() : ''));
    }
  }, [pathname, searchParams]);

  return null;
}
