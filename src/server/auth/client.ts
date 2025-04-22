import { customSessionClient, emailOTPClient } from "better-auth/client/plugins"
import {
  createAuthClient
} from "better-auth/react";
import { auth } from "./config";


export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL!,
  plugins: [emailOTPClient(), customSessionClient<typeof auth>()],
})

