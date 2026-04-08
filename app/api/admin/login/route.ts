import { NextResponse } from "next/server";
import { verifyPassword, createAdminSession, cleanExpiredSessions } from "@/lib/admin/auth";

export async function POST(request: Request) {
  try {
    const { password } = (await request.json()) as { password?: string };

    if (!password || !verifyPassword(password)) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 },
      );
    }

    const token = await createAdminSession();
    if (!token) {
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: 500 },
      );
    }

    // Clean up expired sessions in the background
    cleanExpiredSessions().catch(() => {});

    const response = NextResponse.json({ ok: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
