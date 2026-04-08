"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import Link from "next/link";

interface SubmissionDetail {
  submission: {
    id: number;
    assessment_type_id: string;
    role_id: string | null;
    language: string;
    email: string | null;
    country: string | null;
    salary_range: string | null;
    company_type: string | null;
    industry: string | null;
    total_score: number;
    max_score: number;
    result_level: number;
    dimension_scores: { dim: string; score: number; max: number }[] | null;
    completed_at: string;
  };
  answers: {
    question_id: number;
    answer_value: number;
    questions: { statement_en: string; statement_es: string; level: number } | null;
  }[];
}

export default function SubmissionDetailPage() {
  const params = useParams();
  const [data, setData] = useState<SubmissionDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/submissions/${params.id}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-4xl px-6 py-8">
        <Link href="/admin/submissions" className="mb-4 inline-block text-sm text-[#365cff] hover:underline">
          &larr; Back to submissions
        </Link>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : !data ? (
          <p className="text-red-500">Not found</p>
        ) : (
          <>
            <h1 className="mb-6 text-2xl font-bold text-gray-800">
              Submission #{data.submission.id}
            </h1>

            {/* Demographics */}
            <div className="mb-6 grid grid-cols-2 gap-4 rounded-lg bg-white p-5 shadow-sm sm:grid-cols-4">
              <Field label="Type" value={data.submission.assessment_type_id} />
              <Field label="Role" value={data.submission.role_id ?? "-"} />
              <Field label="Language" value={data.submission.language} />
              <Field label="Email" value={data.submission.email ?? "-"} />
              <Field label="Country" value={data.submission.country ?? "-"} />
              <Field label="Salary" value={data.submission.salary_range ?? "-"} />
              <Field label="Company" value={data.submission.company_type ?? "-"} />
              <Field label="Industry" value={data.submission.industry ?? "-"} />
              <Field
                label="Score"
                value={`${data.submission.total_score}/${data.submission.max_score} (L${data.submission.result_level})`}
              />
              <Field
                label="Date"
                value={new Date(data.submission.completed_at).toLocaleString()}
              />
            </div>

            {/* Dimension scores (company only) */}
            {data.submission.dimension_scores && (
              <div className="mb-6 rounded-lg bg-white p-5 shadow-sm">
                <h2 className="mb-3 text-sm font-semibold text-gray-600">Dimension Scores</h2>
                {data.submission.dimension_scores.map((d) => (
                  <div key={d.dim} className="mb-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">{d.dim}</span>
                      <span className="font-mono text-gray-500">{d.score}/{d.max}</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-[#365cff]"
                        style={{ width: `${d.max > 0 ? (d.score / d.max) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Individual answers */}
            <div className="rounded-lg bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold text-gray-600">
                Answers ({data.answers.length})
              </h2>
              <div className="space-y-2">
                {data.answers.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 border-b border-gray-50 py-2 text-sm">
                    <span className="mt-0.5 shrink-0 rounded bg-blue-50 px-2 py-0.5 text-xs font-mono font-medium text-blue-700">
                      {a.answer_value}/4
                    </span>
                    <span className="text-gray-600">
                      {a.questions?.statement_en ?? `Q#${a.question_id}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-700">{value}</p>
    </div>
  );
}
