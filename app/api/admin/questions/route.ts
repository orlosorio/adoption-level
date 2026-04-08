import { NextRequest, NextResponse } from "next/server";
import { validateAdminToken } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!(await validateAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = request.nextUrl.searchParams;
  const type = params.get("type");
  const roleId = params.get("roleId");

  const supabase = getSupabaseAdmin();

  let query = supabase
    .from("questions")
    .select("*")
    .order("sort_order", { ascending: true });

  if (type) query = query.eq("assessment_type_id", type);
  if (roleId) query = query.eq("role_id", roleId);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!(await validateAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("questions")
    .insert({
      assessment_type_id: body.assessment_type_id,
      role_id: body.role_id || null,
      dimension_id: body.dimension_id || null,
      level: body.level,
      level_label_en: body.level_label_en,
      level_label_es: body.level_label_es,
      statement_en: body.statement_en,
      statement_es: body.statement_es,
      options: body.options,
      sort_order: body.sort_order ?? 0,
      is_active: body.is_active ?? true,
      is_new: body.is_new ?? false,
      metadata: body.metadata ?? {},
    })
    .select()
    .single();

  if (error) {
    console.error("Create question error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
