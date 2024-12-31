import { createAuthClient } from "better-auth/client";

export const auth = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});