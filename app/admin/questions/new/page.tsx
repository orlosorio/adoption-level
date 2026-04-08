"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import Link from "next/link";

const DEFAULT_OPTIONS = [
  { value: 0, label_en: "Never done this", label_es: "Nunca he hecho esto" },
  { value: 1, label_en: "Tried it once or twice", label_es: "Lo probé una o dos veces" },
  { value: 2, label_en: "Done it a few times, still figuring it out", label_es: "Lo hago a veces, todavía lo estoy aprendiendo" },
  { value: 3, label_en: "Do it regularly and it works well", label_es: "Lo hago regularmente y me funciona bien" },
  { value: 4, label_en: "Do it daily, confidently — could teach someone else", label_es: "Lo hago diario con confianza — podría enseñárselo a alguien" },
];

export default function NewQuestion() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    assessment_type_id: "general",
    role_id: "",
    dimension_id: "",
    level: 0,
    level_label_en: "Level 1 — Explorer",
    level_label_es: "Nivel 1 — Explorador",
    statement_en: "",
    statement_es: "",
    sort_order: 0,
    is_new: false,
  });

  const save = async () => {
    if (!form.statement_en || !form.statement_es) {
      alert("Statements are required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          role_id: form.role_id || null,
          dimension_id: form.dimension_id || null,
          options: DEFAULT_OPTIONS,
          metadata: {},
        }),
      });
      if (res.ok) {
        router.push("/admin/questions");
      } else {
        alert("Failed to create");
      }
    } catch {
      alert("Error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-3xl px-6 py-8">
        <Link href="/admin/questions" className="mb-4 inline-block text-sm text-[#365cff] hover:underline">
          &larr; Back to questions
        </Link>
        <h1 className="mb-6 text-2xl font-bold text-gray-800">New Question</h1>

        <div className="space-y-5 rounded-lg bg-white p-6 shadow-sm">
          {/* Type */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1 block text-xs text-gray-400">Assessment Type</label>
              <select
                value={form.assessment_type_id}
                onChange={(e) => setForm({ ...form, assessment_type_id: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="general">General</option>
                <option value="company">Company</option>
                <option value="role">Role</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Role ID</label>
              <input
                placeholder="e.g. ux-ui-design"
                value={form.role_id}
                onChange={(e) => setForm({ ...form, role_id: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                disabled={form.assessment_type_id !== "role"}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Dimension ID</label>
              <input
                placeholder="e.g. strategy-leadership"
                value={form.dimension_id}
                onChange={(e) => setForm({ ...form, dimension_id: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                disabled={form.assessment_type_id !== "company"}
              />
            </div>
          </div>

          {/* Level + sort */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1 block text-xs text-gray-400">Level (0-4)</label>
              <input
                type="number"
                min={0}
                max={4}
                value={form.level}
                onChange={(e) => setForm({ ...form, level: Number(e.target.value) })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Sort Order</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={form.is_new}
                  onChange={(e) => setForm({ ...form, is_new: e.target.checked })}
                />
                Mark as New
              </label>
            </div>
          </div>

          {/* Level labels */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs text-gray-400">Level Label (EN)</label>
              <input
                value={form.level_label_en}
                onChange={(e) => setForm({ ...form, level_label_en: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Level Label (ES)</label>
              <input
                value={form.level_label_es}
                onChange={(e) => setForm({ ...form, level_label_es: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Statements */}
          <div>
            <label className="mb-1 block text-xs text-gray-400">Statement (EN) *</label>
            <textarea
              rows={3}
              value={form.statement_en}
              onChange={(e) => setForm({ ...form, statement_en: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-gray-400">Statement (ES) *</label>
            <textarea
              rows={3}
              value={form.statement_es}
              onChange={(e) => setForm({ ...form, statement_es: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
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
              {saving ? "Creating..." : "Create Question"}
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
