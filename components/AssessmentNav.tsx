"use client";

import { usePathname, useRouter } from "next/navigation";
import { UI } from "@/lib/content";

export default function AssessmentNav() {
  const pathname = usePathname();
  const router = useRouter();
  const isEntry = pathname === "/assessment";

  return (
    <div className="relative z-10 flex w-full items-center justify-center pt-2">
      {!isEntry && (
        <button
          type="button"
          onClick={() => router.push("/assessment")}
          className="absolute left-0 flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/40 bg-white/25 px-3 py-1.5 text-[13px] font-medium text-[#1f36a9]/60 backdrop-blur-md transition-all hover:bg-white/40 hover:text-[#1f36a9]"
          aria-label="Back to home"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="hidden sm:inline">Home</span>
        </button>
      )}
      <p className="tech-brand" data-text={UI.brand}>
        <span className="tech-brand-inner">{UI.brand}</span>
      </p>
    </div>
  );
}
