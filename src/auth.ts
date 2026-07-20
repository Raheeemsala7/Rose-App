import { JWT } from 'next-auth/jwt';
import { sessionMaxAge } from './shared/constant/auth.constant';
import Credentials from 'next-auth/providers/credentials';
import { NextAuthOptions, Session, User } from 'next-auth';
import { loginApi } from './features/auth/apis/auth.api';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }
        const loginData = await loginApi({
          username: credentials.username,
          password: credentials.password,
        });
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
  pages: {
    signIn: '/login',
    error: '/login',
  },
};
