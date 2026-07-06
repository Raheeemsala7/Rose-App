import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import { Session, User } from 'next-auth';
import { AuthResponse } from './features/auth/types/auth';
import { sessionMaxAge } from './shared/constant/auth.constant';

export const authOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.API_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data: IApiResponse<AuthResponse> = await res.json();
        if (!data.status) {
          throw new Error(data.message);
        }
        const loginData = data.payload;
        return {
          id: loginData.user.id,
          token: loginData.token,
          user: loginData.user,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user?: User }) => {
      if (user) {
        token.token = user.token;
        token.user = user.user;
      }
      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: sessionMaxAge,
  },
  jwt: {
    maxAge: sessionMaxAge,
  },
};
