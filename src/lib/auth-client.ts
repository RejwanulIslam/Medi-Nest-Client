import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "https://medinest-client-pearl.vercel.app",
  fetchOptions: {
    credentials: "include", 
  },
});