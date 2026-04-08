"use client";

import { useEffect, useState, useCallback } from "react";
import AdminNav from "@/components/admin/AdminNav";
import Link from "next/link";

interface Question {
  id: number;
  assessment_type_id: string;
  role_id: string | null;
  dimension_id: string | null;
  level: number;
  statement_en: string;
  statement_es: string;
  sort_order: number;
  is_active: boolean;
  is_new: boolean;
}

export default function AdminQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("general");
  const [roleFilter, setRoleFilter] = useState("");

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ type: typeFilter });
    if (roleFilter) params.set("roleId", roleFilter);

    try {
      const res = await fetch(`/api/admin/questions?${params}`);
      setQuestions(await res.json());
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [typeFilter, roleFilter]);

  useEffect(() => { void fetchQuestions(); }, [fetchQuestions]);

  const toggleActive = async (id: number, currentActive: boolean) => {
    await fetch(`/api/admin/questions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !currentActive }),
    });
    void fetchQuestions();
  };

  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Questions</h1>
          <Link
            href="/admin/questions/new"
            className="rounded-md bg-[#365cff] px-4 py-2 text-sm font-medium text-white hover:bg-[#2a4acc]"
          >
            + New Question
          </Link>
        </div>

        {/* Type filter */}
        <div className="mb-4 flex gap-2">
          {["general", "company", "role"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setTypeFilter(t); setRoleFilter(""); }}
              className={`rounded-md px-3 py-1 text-sm capitalize transition ${
                typeFilter === t
                  ? "bg-[#365cff] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Role sub-filter */}
        {typeFilter === "role" && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Filter by role ID (e.g. ux-ui-design)"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full max-w-md rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>
        )}

        {/* Table */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-xs text-gray-400">
                  <th className="px-4 py-3 w-12">#</th>
                  <th className="px-4 py-3 w-12">Lvl</th>
                  <th className="px-4 py-3">Statement (EN)</th>
                  {typeFilter === "company" && <th className="px-4 py-3">Dimension</th>}
                  {typeFilter === "role" && <th className="px-4 py-3">Role</th>}
                  <th className="px-4 py-3 w-20">Active</th>
                  <th className="px-4 py-3 w-16"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                      Loading...
                    </td>
                  </tr>
                ) : questions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                      No questions found
                    </td>
                  </tr>
                ) : (
                  questions.map((q) => (
                    <tr key={q.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-2 font-mono text-gray-400">{q.sort_order}</td>
                      <td className="px-4 py-2">
                        <span className="rounded bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700">
                          {q.level}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {q.statement_en.length > 80
                          ? q.statement_en.slice(0, 80) + "..."
                          : q.statement_en}
                        {q.is_new && (
                          <span className="ml-2 rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-600">
                            NEW
                          </span>
                        )}
                      </td>
                      {typeFilter === "company" && (
                        <td className="px-4 py-2 text-xs text-gray-500">{q.dimension_id}</td>
                      )}
                      {typeFilter === "role" && (
                        <td className="px-4 py-2 text-xs text-gray-500">{q.role_id}</td>
                      )}
                      <td className="px-4 py-2">
                        <button
                          type="button"
                          onClick={() => void toggleActive(q.id, q.is_active)}
                          className={`h-5 w-9 rounded-full transition ${
                            q.is_active ? "bg-green-400" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                              q.is_active ? "translate-x-4" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-4 py-2">
                        <Link
                          href={`/admin/questions/${q.id}/edit`}
                          className="text-xs text-[#365cff] hover:underline"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t px-4 py-3 text-sm text-gray-400">
            {questions.length} questions
          </div>
        </div>
      </div>
    </>
  );
}
