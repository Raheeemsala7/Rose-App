'use server';

import { getNextAuthToken } from '@/src/shared/lib/utils/auth.utils';
import { CheckoutResponse, PayloadCheckOut } from '../types/checkout';
import { RESPONSES } from '@/src/shared/constant/api.responses';
import { HEADERS } from '@/src/shared/constant/api.constant';

interface CheckoutApiResponse {
    status: boolean;
    message?: string;
    payload: CheckoutResponse;
}

export async function checkoutAction(payload: PayloadCheckOut): Promise<CheckoutApiResponse> {
    const token = await getNextAuthToken();

    if (!token?.token) {
        throw new Error(RESPONSES.unauthorized.message);
    }

    const res = await fetch(`${process.env.API_URL}/orders`, {
        method: 'POST',
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token),
        },
        body: JSON.stringify(payload),
    });

    const data: CheckoutApiResponse = await res.json();

    if (!data.status) {
        throw new Error(data.message || 'Checkout failed');
    }

    return data;
}
