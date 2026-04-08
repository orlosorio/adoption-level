"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/components/admin/AdminNav";
import { adminFetch } from "@/lib/admin/fetch";

interface Session {
  id: string;
  token_preview: string;
  created_at: string;
  expires_at: string;
  is_current: boolean;
}

export default function AdminSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [closingId, setClosingId] = useState<string | null>(null);

  function loadSessions() {
    adminFetch("/api/admin/sessions")
      .then((r) => r.json())
      .then((data) => setSessions(data.sessions ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadSessions();
  }, []);

  async function handleClose(id: string, isCurrent: boolean) {
    const msg = isCurrent
      ? "This is your current session. You will be logged out. Continue?"
      : "Close this session? The user will be logged out.";
    if (!confirm(msg)) return;

    setClosingId(id);
    try {
      const res = await adminFetch("/api/admin/sessions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.self) {
        window.location.href = "/admin/login";
        return;
      }
      loadSessions();
    } catch {
      // adminFetch handles 401 redirect
    } finally {
      setClosingId(null);
    }
  }

  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Sessions</h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <>
            <div className="mb-6 rounded-lg bg-white p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-400">
                Active Sessions
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-800">
                {sessions.length}
              </p>
            </div>

            <div className="rounded-lg bg-white p-5 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b text-xs text-gray-400">
                      <th className="pb-2 pr-4">Token</th>
                      <th className="pb-2 pr-4">Created</th>
                      <th className="pb-2 pr-4">Expires</th>
                      <th className="pb-2 pr-4">Status</th>
                      <th className="pb-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((s) => (
                      <tr key={s.id} className="border-b border-gray-50">
                        <td className="py-2 pr-4 font-mono text-gray-700">
                          ...{s.token_preview}
                        </td>
                        <td className="py-2 pr-4 text-gray-500">
                          {new Date(s.created_at).toLocaleString()}
                        </td>
                        <td className="py-2 pr-4 text-gray-500">
                          {new Date(s.expires_at).toLocaleString()}
                        </td>
                        <td className="py-2 pr-4">
                          {s.is_current ? (
                            <span className="rounded bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                              Current
                            </span>
                          ) : (
                            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                              Other
                            </span>
                          )}
                        </td>
                        <td className="py-2">
                          <button
                            onClick={() => handleClose(s.id, s.is_current)}
                            disabled={closingId === s.id}
                            className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50"
                          >
                            {closingId === s.id ? "Closing..." : "Close"}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {sessions.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-4 text-center text-gray-400">
                          No active sessions
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
