'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod/v4';
import { getNextAuthToken } from '@/src/shared/lib/utils/auth.utils';
import { HEADERS } from '@/src/shared/constant/api.constant';
import { RESPONSES } from '@/src/shared/constant/api.responses';
import { IAddress } from '../types/address';

const createAddressSchema = z.object({
    title:     z.string().min(2),
    city:      z.string().min(2),
    street:    z.string().min(5),
    phone:     z.string().min(7),
    latitude:  z.number(),
    longitude: z.number(),
});

export type CreateAddressInput = z.infer<typeof createAddressSchema>;

export async function createAddressAction(input: CreateAddressInput) {
    const parsed = createAddressSchema.safeParse(input);
    if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message ?? 'Invalid input');
    }

    const token = await getNextAuthToken();
    if (!token?.token) return RESPONSES.unauthorized;

    const res = await fetch(`${process.env.API_URL}/addresses`, {
        method: 'POST',
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token.token),
        },
        body: JSON.stringify({
            ...parsed.data,
            latitude:  String(parsed.data.latitude),
            longitude: String(parsed.data.longitude),
        }),
    });

    const data: ApiResponse<{ address: IAddress }> = await res.json();

    if (!data.status) {
        throw new Error(data.message || 'Failed to create address');
    }

    revalidatePath('/[locale]/(website)/cart/checkout', 'page');
    return data;
}
