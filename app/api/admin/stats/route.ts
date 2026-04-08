import { NextRequest, NextResponse } from "next/server";
import { validateAdminToken } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!(await validateAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  // Total submissions
  const { count: totalSubmissions } = await supabase
    .from("submissions")
    .select("*", { count: "exact", head: true });

  // Submissions last 30 days
  const thirtyDaysAgo = new Date(
    Date.now() - 30 * 24 * 60 * 60 * 1000,
  ).toISOString();
  const { count: last30Days } = await supabase
    .from("submissions")
    .select("*", { count: "exact", head: true })
    .gte("completed_at", thirtyDaysAgo);

  // By assessment type
  const types = ["general", "company", "role"];
  const byTypeResult: { assessment_type_id: string; count: number }[] = [];
  for (const t of types) {
    const { count } = await supabase
      .from("submissions")
      .select("*", { count: "exact", head: true })
      .eq("assessment_type_id", t);
    byTypeResult.push({ assessment_type_id: t, count: count ?? 0 });
  }

  // Recent submissions
  const { data: recent } = await supabase
    .from("submissions")
    .select(
      "id, assessment_type_id, role_id, language, email, country, total_score, max_score, result_level, completed_at",
    )
    .order("completed_at", { ascending: false })
    .limit(10);

  // By country (top 10)
  const { data: allSubmissions } = await supabase
    .from("submissions")
    .select("country")
    .not("country", "is", null);

  const countryCounts: Record<string, number> = {};
  for (const s of allSubmissions ?? []) {
    if (s.country) {
      countryCounts[s.country] = (countryCounts[s.country] ?? 0) + 1;
    }
  }
  const byCountry = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([country, count]) => ({ country, count }));

  return NextResponse.json({
    totalSubmissions: totalSubmissions ?? 0,
    last30Days: last30Days ?? 0,
    byType: byTypeResult,
    byCountry,
    recent: recent ?? [],
  });
}
