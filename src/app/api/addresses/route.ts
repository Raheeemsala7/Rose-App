import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { HEADERS } from '@/src/shared/constant/api.constant';

export async function GET(req: NextRequest) {
    const token = await getToken({
        req,
        cookieName: process.env.NEXT_AUTH_SESSION_COOKIE_NAME,
    });

    if (!token?.token) {
        return NextResponse.json({ status: false, message: 'Unauthorized' }, { status: 401 });
    }

    const res = await fetch(`${process.env.API_URL}/addresses`, {
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token as string),
        },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}
