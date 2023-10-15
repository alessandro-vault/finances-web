import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from "iron-session/edge";

export async function middleware(request: NextRequest ) {
    const response = NextResponse.next();
    let cookie = request.cookies.get('_finances_session')

    const session = await getIronSession(request, response, {
        cookieName: '_finances_session',
        password: process.env.APP_SECRET!!,
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production',
        }
    })

    console.log(session)

    if (!cookie) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/loans/:path*',
        '/plans/:path*',
    ],
}