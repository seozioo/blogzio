import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get('RT');

  if (!refreshToken) {
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/write'],
};
