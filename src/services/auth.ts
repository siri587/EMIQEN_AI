/**
 * EMIQEN Authentication Service
 *
 * This is the central integration point for authentication.
 *
 * CURRENT STATUS: Frontend-only — no backend is configured.
 * All auth operations return a pending signal so the UI can
 * show an honest "requires configuration" state instead of
 * simulating a fake successful login.
 *
 * ─── TO ENABLE REAL AUTH ────────────────────────────────────
 * 1. Pick a provider (Supabase, Firebase Auth, Auth0, Clerk …).
 * 2. Add the provider SDK to package.json.
 * 3. Set the required environment variables in a .env file:
 *      VITE_AUTH_PROVIDER_URL=...
 *      VITE_AUTH_ANON_KEY=...        (Supabase example)
 *      VITE_AUTH_CLIENT_ID=...       (OAuth / Auth0 example)
 *    Never put secret/service-role keys here — browser only.
 * 4. Replace the stub bodies below with real SDK calls.
 * 5. Set IS_AUTH_CONFIGURED = true.
 * ────────────────────────────────────────────────────────────
 */

export const IS_AUTH_CONFIGURED = false;

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export interface AuthResult {
  user: AuthUser | null;
  error: string | null;
  requiresConfiguration: boolean;
}

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  company?: string;
}

export interface SignInData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Sign in with email and password.
 * Replace body with real provider call when IS_AUTH_CONFIGURED = true.
 */
export async function signIn(_data: SignInData): Promise<AuthResult> {
  if (!IS_AUTH_CONFIGURED) {
    return {
      user: null,
      error: null,
      requiresConfiguration: true,
    };
  }

  // ── Real implementation goes here ──
  // e.g. const { data, error } = await supabase.auth.signInWithPassword({ ... });
  return { user: null, error: 'Not implemented', requiresConfiguration: false };
}

/**
 * Create a new account.
 * Replace body with real provider call when IS_AUTH_CONFIGURED = true.
 */
export async function signUp(_data: SignUpData): Promise<AuthResult> {
  if (!IS_AUTH_CONFIGURED) {
    return {
      user: null,
      error: null,
      requiresConfiguration: true,
    };
  }

  // ── Real implementation goes here ──
  return { user: null, error: 'Not implemented', requiresConfiguration: false };
}

/**
 * Sign the current user out.
 */
export async function signOut(): Promise<void> {
  if (!IS_AUTH_CONFIGURED) return;
  // ── Real implementation goes here ──
}

/**
 * Get the currently authenticated user from the provider session.
 * Returns null if no session or auth not configured.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!IS_AUTH_CONFIGURED) return null;
  // ── Real implementation goes here ──
  return null;
}

