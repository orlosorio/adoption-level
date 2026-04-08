"use client";

import { useEffect, useState, useCallback } from "react";
import AdminNav from "@/components/admin/AdminNav";
import Link from "next/link";

interface Submission {
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
  completed_at: string;
}

interface PageData {
  submissions: Submission[];
  total: number;
  page: number;
  totalPages: number;
}

export default function AdminSubmissions() {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "25" });
    if (typeFilter) params.set("type", typeFilter);

    try {
      const res = await fetch(`/api/admin/submissions?${params}`);
      setData(await res.json());
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [page, typeFilter]);

  useEffect(() => { void fetchData(); }, [fetchData]);

  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Submissions</h1>
          <a
            href="/api/admin/submissions/export"
            className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200"
          >
            Export CSV
          </a>
        </div>

        {/* Filters */}
        <div className="mb-4 flex gap-2">
          {["", "general", "company", "role"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setTypeFilter(t); setPage(1); }}
              className={`rounded-md px-3 py-1 text-sm transition ${
                typeFilter === t
                  ? "bg-[#365cff] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t || "All"}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-xs text-gray-400">
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Industry</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Level</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                      Loading...
                    </td>
                  </tr>
                ) : data?.submissions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                      No submissions found
                    </td>
                  </tr>
                ) : (
                  data?.submissions.map((s) => (
                    <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-2.5 text-gray-500">
                        {new Date(s.completed_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2.5 capitalize text-gray-700">
                        {s.assessment_type_id}
                        {s.role_id ? ` / ${s.role_id}` : ""}
                      </td>
                      <td className="px-4 py-2.5 text-gray-500">{s.email ?? "-"}</td>
                      <td className="px-4 py-2.5 text-gray-500">{s.country ?? "-"}</td>
                      <td className="px-4 py-2.5 text-gray-500">{s.industry ?? "-"}</td>
                      <td className="px-4 py-2.5 font-mono text-gray-700">
                        {s.total_score}/{s.max_score}
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                          L{s.result_level}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <Link
                          href={`/admin/submissions/${s.id}`}
                          className="text-xs text-[#365cff] hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between border-t px-4 py-3 text-sm">
              <span className="text-gray-400">
                {data.total} total - Page {data.page} of {data.totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="rounded bg-gray-100 px-3 py-1 text-gray-600 hover:bg-gray-200 disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  type="button"
                  disabled={page >= data.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded bg-gray-100 px-3 py-1 text-gray-600 hover:bg-gray-200 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
