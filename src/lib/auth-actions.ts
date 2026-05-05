"use client";

import { authClient } from "@/lib/auth-client";

/**
 * Shared logout helper. Works in any client component.
 * Calls better-auth signOut and redirects to /login.
 */
export async function logOut(): Promise<void> {
  await authClient.signOut();
  // Use window.location for a hard redirect that clears all client state
  window.location.href = "/login";
}
