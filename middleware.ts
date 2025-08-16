import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Якщо користувач йде на /notes, перенаправляємо на /notes/filter/All
  if (request.nextUrl.pathname === '/notes') {
    return NextResponse.redirect(new URL('/notes/filter/All', request.url));
  }
}

export const config = {
  matcher: '/notes',
};
