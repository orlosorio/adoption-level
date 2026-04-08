import { NextRequest, NextResponse } from "next/server";
import { validateAdminToken } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = request.cookies.get("admin_token")?.value;
  if (!(await validateAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = getSupabaseAdmin();

  const { data: submission, error: subErr } = await supabase
    .from("submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (subErr || !submission) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { data: answers } = await supabase
    .from("submission_answers")
    .select("question_id, answer_value, questions(statement_en, statement_es, level)")
    .eq("submission_id", id)
    .order("question_id", { ascending: true });

  return NextResponse.json({ submission, answers: answers ?? [] });
}
