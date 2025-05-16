import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";
import { Cookies } from "@/constants/cookies";
import { setCookie, getCookie } from "cookies-next";

export const authClient = createAuthClient({
  baseURL: "https://staging-adboss-360-8z72.encr.app",
  basePath: "/api/auth",
  plugins: [ 
    organizationClient()
  ],
  fetchOptions: {
    async onResponse(context) {
      const setCookieHeader = context.response.headers.get('set-auth-token');
      
      if(setCookieHeader) {
        setCookie(Cookies.BEARER_TOKEN, setCookieHeader)
      }
    },
    credentials: 'include',
    auth: {
      type:"Bearer",
      token: () => {
        return getCookie(Cookies.BEARER_TOKEN) || ""
      }
    }
  }
});

export const { signIn, signOut, signUp, useSession, organization } = authClient;
