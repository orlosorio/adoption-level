import { getSupabaseAdmin } from "@/lib/supabase/server";

const TOKEN_TTL_HOURS = 24;

/** Generate a random session token */
function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Validate password and create a session token */
export async function createAdminSession(): Promise<string | null> {
  const token = generateToken();
  const expiresAt = new Date(
    Date.now() + TOKEN_TTL_HOURS * 60 * 60 * 1000,
  ).toISOString();

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("admin_sessions")
    .insert({ token, expires_at: expiresAt });

  if (error) {
    console.error("Failed to create admin session:", error);
    return null;
  }

  return token;
}

/** Check if a token is valid (exists and not expired) */
export async function validateAdminToken(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("admin_sessions")
    .select("id")
    .eq("token", token)
    .gt("expires_at", new Date().toISOString())
    .limit(1)
    .single();

  if (error || !data) return false;
  return true;
}

/** Verify the admin password from env */
export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return password === adminPassword;
}

/** Clean up expired sessions */
export async function cleanExpiredSessions(): Promise<void> {
  const supabase = getSupabaseAdmin();
  await supabase
    .from("admin_sessions")
    .delete()
    .lt("expires_at", new Date().toISOString());
}
