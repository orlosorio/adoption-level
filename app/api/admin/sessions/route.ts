import { NextRequest, NextResponse } from "next/server";
import { validateAdminToken, cleanExpiredSessions } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!(await validateAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("admin_sessions")
    .select("id, token, created_at, expires_at")
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const sessions = (data ?? []).map((s) => ({
    id: s.id,
    token_preview: s.token.slice(-8),
    created_at: s.created_at,
    expires_at: s.expires_at,
    is_current: s.token === token,
  }));

  // Clean expired sessions in the background
  cleanExpiredSessions().catch(() => {});

  return NextResponse.json({ sessions, total: sessions.length });
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!(await validateAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = (await request.json()) as { id?: string };
  if (!id) {
    return NextResponse.json({ error: "Missing session id" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // Check if deleting own session
  const { data: session } = await supabase
    .from("admin_sessions")
    .select("token")
    .eq("id", id)
    .single();

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  const isSelf = session.token === token;

  await supabase.from("admin_sessions").delete().eq("id", id);

  const response = NextResponse.json({ ok: true, self: isSelf });

  if (isSelf) {
    response.cookies.set("admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  }

  return response;
}
