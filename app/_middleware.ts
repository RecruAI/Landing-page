import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()
  const {
    data: { session },
  } = await supabase.auth.getSession();

  
  if (req.nextUrl.pathname.startsWith('/app') && !session) {
    return NextResponse.rewrite(new URL('/', req.url));
  }

}

export const config = {
  matcher: ["/", "/app/", '/app'],
};