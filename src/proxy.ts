import { NextResponse, type NextRequest, userAgent } from 'next/server'
import { make, verify } from '@/libs/uid.lib';

const _COOKIES_UID_KEY_ = 'uid'

export function proxy(request: NextRequest) {
  let uid = request.cookies.get(_COOKIES_UID_KEY_)?.value;
  const { device, isBot, ua, os } = userAgent(request)

  if (isBot) {
    return NextResponse.next();
  }

  if (!uid || !verify(uid)) {
    const uid = make(JSON.stringify({device, ua, os}));
    const response = NextResponse.next();

    response.cookies.set(_COOKIES_UID_KEY_, uid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: (365 * 24 * 60 * 60) * 2, // 2 years
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
