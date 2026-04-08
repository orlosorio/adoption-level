import { NextRequest, NextResponse } from "next/server";
import { validateAdminToken } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!(await validateAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = request.nextUrl.searchParams;
  const page = Math.max(1, Number(params.get("page") ?? 1));
  const limit = Math.min(100, Math.max(1, Number(params.get("limit") ?? 25)));
  const offset = (page - 1) * limit;
  const type = params.get("type");
  const country = params.get("country");
  const hasEmail = params.get("hasEmail");

  const supabase = getSupabaseAdmin();

  let query = supabase
    .from("submissions")
    .select(
      "id, assessment_type_id, role_id, language, email, country, salary_range, company_type, industry, total_score, max_score, result_level, completed_at",
      { count: "exact" },
    )
    .order("completed_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (type) query = query.eq("assessment_type_id", type);
  if (country) query = query.eq("country", country);
  if (hasEmail === "true") query = query.not("email", "is", null);
  if (hasEmail === "false") query = query.is("email", null);

  const { data, count, error } = await query;

  if (error) {
    console.error("Admin submissions error:", error);
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }

  return NextResponse.json({
    submissions: data ?? [],
    total: count ?? 0,
    page,
    limit,
    totalPages: Math.ceil((count ?? 0) / limit),
  });
}
