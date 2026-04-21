---
name: code-convention
description: Project code conventions — folder structure, file naming, and styling precedence. Triggers when creating or moving files, naming a new module, or choosing where styles should live.
allowed-tools: Read, Grep, Glob
model: haiku
effort: low
---

# Code Conventions

## Folder Structure

Next.js App Router, route-first layout.

- `app/<route>/` — one folder per route. `page.tsx`, `layout.tsx`, and route-only metadata (`sitemap.ts`, `opengraph-image.tsx`, etc.) live here.
- `app/<route>/_components/` — components used only by that route. The leading underscore marks the folder as private (Next.js ignores it for routing).
- Nested routes nest their own `_components/` (e.g. `app/assessment/company/_components/`). Do not reach across routes; if two routes need the same component, lift it to the nearest common ancestor's `_components/` or to `components/` at the project root.
- `lib/` — shared non-UI code: domain logic, data, stores, config, clients. Subfolder only when a topic grows past ~3 files (`lib/supabase/`, `lib/stores/`).
- `components/` (root) — only for UI reused across unrelated routes. Prefer colocation first; promote to `components/` when a second consumer appears.

Do not create `utils/`, `helpers/`, or `shared/` folders. Put it in `lib/` with a topical name.

## File Naming

- **Files and folders**: `kebab-case` — `article-header.tsx`, `scale-buttons.tsx`, `about-content.ts`.
- **React components (export name)**: `PascalCase` — `export function ArticleHeader()`.
- **Hooks**: `use-*.ts` file, `useFoo` export.
- **Pure logic / data**: `.ts` (no JSX). UI: `.tsx`.
- **Next.js reserved filenames** stay lowercase as Next requires: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`, `sitemap.ts`, `robots.ts`, `middleware.ts`.
- **One component per file**. Filename matches the component (`article-header.tsx` → `ArticleHeader`). Small subcomponents used only by that file can live alongside it; extract the moment a second file needs them.
- **Types and constants** live next to the code that owns them. Only split into a `types.ts` / `constants.ts` when the owning file would otherwise get noisy.

## Styling Precedence

Use the first option that fits. Do not skip ahead.

1. **Tailwind utility classes** — default for all component styling. Compose with `clsx` / `cn` when conditional.
2. **CSS Modules** (`*.module.css`) — only when Tailwind can't express it cleanly: complex `:has()`/`:is()` selectors, keyframes tied to one component, pseudo-element stacks (`::before`/`::after` choreography), or style that would become an unreadable utility string. Scope stays local; colocate the `.module.css` next to its component.
3. **Global CSS** (`app/globals.css`) — reserved for: design tokens (`@theme`, `:root` custom properties), base element resets, and page-wide background effects that genuinely span multiple routes (e.g. the quiz grid + aurora layers). Do not add component-specific rules here.

When in doubt, start with Tailwind. Promote to a CSS Module only after the Tailwind version is written and demonstrably worse. Never reach for global CSS to avoid writing a module.
