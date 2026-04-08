"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import Link from "next/link";
import { adminFetch } from "@/lib/admin/fetch";

interface QuestionData {
  id: string;
  assessment_type_id: string;
  role_id: string | null;
  dimension_id: string | null;
  level: number;
  level_label_en: string;
  level_label_es: string;
  statement_en: string;
  statement_es: string;
  options: { value: number; label_en: string; label_es: string }[];
  sort_order: number;
  is_active: boolean;
  is_new: boolean;
  metadata: Record<string, unknown>;
}

export default function EditQuestion() {
  const params = useParams();
  const router = useRouter();
  const [q, setQ] = useState<QuestionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminFetch(`/api/admin/questions/${params.id}`)
      .then((r) => r.json())
      .then(setQ)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [params.id]);

  const save = async () => {
    if (!q) return;
    setSaving(true);
    try {
      await adminFetch(`/api/admin/questions/${q.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(q),
      });
      router.push("/admin/questions");
    } catch {
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <><AdminNav /><p className="p-8 text-gray-500">Loading...</p></>;
  if (!q) return <><AdminNav /><p className="p-8 text-red-500">Not found</p></>;

  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-3xl px-6 py-8">
        <Link href="/admin/questions" className="mb-4 inline-block text-sm text-[#365cff] hover:underline">
          &larr; Back to questions
        </Link>
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Edit Question #{q.id}
        </h1>

        <div className="space-y-5 rounded-lg bg-white p-6 shadow-sm">
          {/* Type info (read-only) */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <label className="mb-1 block text-xs text-gray-400">Type</label>
              <p className="capitalize text-gray-700">{q.assessment_type_id}</p>
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Role</label>
              <p className="text-gray-700">{q.role_id ?? "-"}</p>
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Dimension</label>
              <p className="text-gray-700">{q.dimension_id ?? "-"}</p>
            </div>
          </div>

          {/* Level + Sort Order */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1 block text-xs text-gray-400">Level (0-4)</label>
              <input
                type="number"
                min={0}
                max={4}
                value={q.level}
                onChange={(e) => setQ({ ...q, level: Number(e.target.value) })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Sort Order</label>
              <input
                type="number"
                value={q.sort_order}
                onChange={(e) => setQ({ ...q, sort_order: Number(e.target.value) })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={q.is_active}
                  onChange={(e) => setQ({ ...q, is_active: e.target.checked })}
                />
                Active
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={q.is_new}
                  onChange={(e) => setQ({ ...q, is_new: e.target.checked })}
                />
                New
              </label>
            </div>
          </div>

          {/* Level labels */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs text-gray-400">Level Label (EN)</label>
              <input
                value={q.level_label_en}
                onChange={(e) => setQ({ ...q, level_label_en: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Level Label (ES)</label>
              <input
                value={q.level_label_es}
                onChange={(e) => setQ({ ...q, level_label_es: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Statements */}
          <div>
            <label className="mb-1 block text-xs text-gray-400">Statement (EN)</label>
            <textarea
              rows={3}
              value={q.statement_en}
              onChange={(e) => setQ({ ...q, statement_en: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-gray-400">Statement (ES)</label>
            <textarea
              rows={3}
              value={q.statement_es}
              onChange={(e) => setQ({ ...q, statement_es: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          {/* Options (JSON) */}
          <div>
            <label className="mb-1 block text-xs text-gray-400">Options (JSON)</label>
            <textarea
              rows={6}
              value={JSON.stringify(q.options, null, 2)}
              onChange={(e) => {
                try {
                  setQ({ ...q, options: JSON.parse(e.target.value) });
                } catch {
                  // Invalid JSON — don't update
                }
              }}
              className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-xs"
            />
          </div>

          {/* Metadata (JSON) */}
          <div>
            <label className="mb-1 block text-xs text-gray-400">Metadata (JSON)</label>
            <textarea
              rows={3}
              value={JSON.stringify(q.metadata, null, 2)}
              onChange={(e) => {
                try {
                  setQ({ ...q, metadata: JSON.parse(e.target.value) });
                } catch {
                  // Invalid JSON — don't update
                }
              }}
              className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-xs"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => void save()}
              disabled={saving}
              className="rounded-md bg-[#365cff] px-5 py-2 text-sm font-medium text-white hover:bg-[#2a4acc] disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <Link
              href="/admin/questions"
              className="rounded-md bg-gray-100 px-5 py-2 text-sm text-gray-600 hover:bg-gray-200"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
