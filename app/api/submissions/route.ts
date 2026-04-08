import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

interface SubmissionAnswer {
  questionId?: number;
  sortOrder?: number;
  value: number;
}

interface SubmissionBody {
  assessmentTypeId: string;
  roleId?: string | null;
  language: "en" | "es";
  email?: string | null;
  country?: string | null;
  salaryRange?: string | null;
  companyType?: string | null;
  industry?: string | null;
  totalScore: number;
  maxScore: number;
  resultLevel: number;
  dimensionScores?: { dim: string; score: number; max: number }[] | null;
  answers: SubmissionAnswer[];
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmissionBody;

    if (
      !body.assessmentTypeId ||
      !body.language ||
      body.totalScore == null ||
      body.maxScore == null ||
      body.resultLevel == null ||
      !Array.isArray(body.answers) ||
      body.answers.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdmin();

    // Insert submission
    const { data: submission, error: subErr } = await supabase
      .from("submissions")
      .insert({
        assessment_type_id: body.assessmentTypeId,
        role_id: body.roleId || null,
        language: body.language,
        email: body.email || null,
        country: body.country || null,
        salary_range: body.salaryRange || null,
        company_type: body.companyType || null,
        industry: body.industry || null,
        total_score: body.totalScore,
        max_score: body.maxScore,
        result_level: body.resultLevel,
        dimension_scores: body.dimensionScores || null,
      })
      .select("id")
      .single();

    if (subErr) {
      console.error("Submission insert error:", subErr);
      return NextResponse.json(
        { error: "Failed to save submission" },
        { status: 500 },
      );
    }

    // Resolve question IDs if only sort_order was provided
    const needsIdResolution = body.answers.some(
      (a) => a.questionId == null && a.sortOrder != null,
    );

    let questionIdMap: Map<number, number> | null = null;
    if (needsIdResolution) {
      let query = supabase
        .from("questions")
        .select("id, sort_order")
        .eq("assessment_type_id", body.assessmentTypeId)
        .eq("is_active", true);

      if (body.roleId) {
        query = query.eq("role_id", body.roleId);
      } else if (body.assessmentTypeId === "general" || body.assessmentTypeId === "company") {
        query = query.is("role_id", null);
      }

      const { data: questions } = await query.order("sort_order");
      if (questions) {
        questionIdMap = new Map(
          questions.map((q) => [q.sort_order as number, q.id as number]),
        );
      }
    }

    // Build answer rows
    const answerRows = body.answers
      .map((a) => {
        const qId =
          a.questionId ?? (questionIdMap?.get(a.sortOrder ?? -1) ?? null);
        if (qId == null) return null;
        return {
          submission_id: submission.id,
          question_id: qId,
          answer_value: a.value,
        };
      })
      .filter((row): row is NonNullable<typeof row> => row !== null);

    // Insert in batches
    const batchSize = 100;
    for (let i = 0; i < answerRows.length; i += batchSize) {
      const batch = answerRows.slice(i, i + batchSize);
      const { error: ansErr } = await supabase
        .from("submission_answers")
        .insert(batch);

      if (ansErr) {
        console.error("Answer insert error:", ansErr);
        break;
      }
    }

    return NextResponse.json({ id: submission.id }, { status: 201 });
  } catch (err) {
    console.error("Submission route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
