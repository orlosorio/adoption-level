"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/components/admin/AdminNav";
import Link from "next/link";
import { adminFetch } from "@/lib/admin/fetch";

interface Stats {
  totalSubmissions: number;
  last30Days: number;
  byType: { assessment_type_id: string; count: number }[];
  byCountry: { country: string; count: number }[];
  recent: {
    id: string;
    assessment_type_id: string;
    role_id: string | null;
    email: string | null;
    country: string | null;
    total_score: number;
    max_score: number;
    result_level: number;
    completed_at: string;
  }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Dashboard</h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : stats ? (
          <>
            {/* Stat cards */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StatCard label="Total Submissions" value={stats.totalSubmissions} />
              <StatCard label="Last 30 Days" value={stats.last30Days} />
              <StatCard
                label="Avg / Day (30d)"
                value={
                  stats.last30Days > 0
                    ? (stats.last30Days / 30).toFixed(1)
                    : "0"
                }
              />
            </div>

            {/* By type */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <h2 className="mb-3 text-sm font-semibold text-gray-600">By Type</h2>
                {stats.byType.map((t) => (
                  <div key={t.assessment_type_id} className="flex justify-between py-1 text-sm">
                    <span className="capitalize text-gray-700">{t.assessment_type_id}</span>
                    <span className="font-mono text-gray-500">{t.count}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-lg bg-white p-5 shadow-sm">
                <h2 className="mb-3 text-sm font-semibold text-gray-600">Top Countries</h2>
                {stats.byCountry.length === 0 && (
                  <p className="text-sm text-gray-400">No data yet</p>
                )}
                {stats.byCountry.map((c) => (
                  <div key={c.country} className="flex justify-between py-1 text-sm">
                    <span className="text-gray-700">{c.country}</span>
                    <span className="font-mono text-gray-500">{c.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent submissions */}
            <div className="rounded-lg bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-600">Recent Submissions</h2>
                <Link href="/admin/submissions" className="text-xs text-[#365cff] hover:underline">
                  View all
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b text-xs text-gray-400">
                      <th className="pb-2 pr-4">Date</th>
                      <th className="pb-2 pr-4">Type</th>
                      <th className="pb-2 pr-4">Email</th>
                      <th className="pb-2 pr-4">Country</th>
                      <th className="pb-2 pr-4">Score</th>
                      <th className="pb-2">Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recent.map((s) => (
                      <tr key={s.id} className="border-b border-gray-50">
                        <td className="py-2 pr-4 text-gray-500">
                          {new Date(s.completed_at).toLocaleDateString()}
                        </td>
                        <td className="py-2 pr-4 capitalize text-gray-700">
                          {s.assessment_type_id}
                          {s.role_id ? ` / ${s.role_id}` : ""}
                        </td>
                        <td className="py-2 pr-4 text-gray-500">
                          {s.email ?? "-"}
                        </td>
                        <td className="py-2 pr-4 text-gray-500">
                          {s.country ?? "-"}
                        </td>
                        <td className="py-2 pr-4 font-mono text-gray-700">
                          {s.total_score}/{s.max_score}
                        </td>
                        <td className="py-2">
                          <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                            L{s.result_level}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <p className="text-red-500">Failed to load stats</p>
        )}
      </div>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <p className="text-xs font-medium text-gray-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
