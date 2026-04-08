import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Status AI",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      {children}
    </div>
  );
}
