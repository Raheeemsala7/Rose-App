import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function getNextAuthToken() {
  const cookieStore = await cookies();
  const token =
    cookieStore.get('__Secure-next-auth.session-token')?.value ??
    cookieStore.get('next-auth.session-token')?.value;

  try {
    const jwt = await decode({
      token,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    return jwt;
  } catch (error) {
    void error;
    return null;
  }
}
