import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code');

    if (!code) {
        return NextResponse.json(
            { status: false, message: 'Coupon code is required' },
            { status: 400 }
        );
    }

    const res = await fetch(
        `${process.env.API_URL}/coupons?search=${encodeURIComponent(code)}&isActive=true`
    );

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
}
