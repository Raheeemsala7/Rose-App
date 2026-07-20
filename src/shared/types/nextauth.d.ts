import { UserData } from "@/src/features/auth/types/auth";

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User {
    user: UserData;
    token: string;
  }

  interface Session {
    user: AppUser;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: AppUser;
    token: string;
  }
}
