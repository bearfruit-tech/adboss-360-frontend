import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  basePath: 'auth'
});

export const { signIn, signOut, signUp, useSession,  } = authClient;
