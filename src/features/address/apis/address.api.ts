import { getNextAuthToken } from '@/src/shared/lib/utils/auth.utils';
import { IAddress } from '../types/address';
import { HEADERS } from '@/src/shared/constant/api.constant';
import { redirect } from '@/src/i18n/navigation';

export async function getAddresses(locale: 'en' | 'ar'): Promise<IAddress[]> {
    const jwt = await getNextAuthToken();
    const token = jwt?.token;

    if (!token) {
        redirect({ href: '/login', locale });
    }

    const res = await fetch(`${process.env.API_URL}/addresses`, {
        headers: {
            ...HEADERS.JsonBody,
            ...HEADERS.authorize(token!),
        },
        // No caching — address list must always be fresh (user-specific data)
        cache: 'no-store',
    });

    if (res.status === 401) {
        redirect({ href: '/login', locale });
    }

    const data: ApiResponse<{ addresses: IAddress[] }> = await res.json();

    if (!data.status) {
        throw new Error(data.message || 'Failed to fetch addresses');
    }

    return data.payload.addresses;
}
