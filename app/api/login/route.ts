"use server"

import {sealData} from "iron-session/edge";
import {login} from "@/services/auth-service";
import {NextResponse} from "next/server";
import { cookies } from 'next/headers';


export async function POST(req : Request, res: Response) {
    const data : { username: string, password: string} = await req.json()
    let token: string = '';

    try {
        await login(data.username, data.password).
            then(r => token = r.data.token)
    } catch (e) {
        return NextResponse.json({
            message: 'Unauthorized'
        }, {
            status: 401
        })
    }
    const session = JSON.stringify({
        token: token
    })
    const encryptedSession= await sealData(session, {
        password: process.env.APP_SECRET!!,
        ttl: 60 * 60 * 24 * 7
    })

    cookies().set({
        name: '_finances_session',
        value: encryptedSession,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
    })

    return new Response('Authorization successful', {
        status: 200,
    })
}
