import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // console.log(token)

  if (!token && req.nextUrl.pathname.startsWith('/register')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
