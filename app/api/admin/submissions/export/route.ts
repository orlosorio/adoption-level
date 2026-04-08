import { NextRequest, NextResponse } from "next/server";
import { validateAdminToken } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!(await validateAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("submissions")
    .select(
      "id, assessment_type_id, role_id, language, email, country, salary_range, company_type, industry, total_score, max_score, result_level, completed_at",
    )
    .order("completed_at", { ascending: false })
    .limit(10000);

  if (error) {
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }

  const rows = data ?? [];
  const headers = [
    "id", "assessment_type", "role", "language", "email", "country",
    "salary_range", "company_type", "industry", "score", "max_score",
    "result_level", "completed_at",
  ];

  const csvLines = [headers.join(",")];
  for (const r of rows) {
    csvLines.push(
      [
        r.id,
        r.assessment_type_id,
        r.role_id ?? "",
        r.language,
        `"${(r.email ?? "").replace(/"/g, '""')}"`,
        r.country ?? "",
        r.salary_range ?? "",
        r.company_type ?? "",
        r.industry ?? "",
        r.total_score,
        r.max_score,
        r.result_level,
        r.completed_at,
      ].join(","),
    );
  }

  return new NextResponse(csvLines.join("\n"), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="submissions-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
