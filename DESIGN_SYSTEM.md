# Design System

## Typography

Three Google Fonts are loaded in `app/layout.tsx`:

| Font                 | CSS Variable      | Role                       | Weights            |
| -------------------- | ----------------- | -------------------------- | ------------------ |
| **Inter**            | `--font-inter`    | Sans-serif (body, UI text) | Default (variable) |
| **Playfair Display** | `--font-playfair` | Serif (headlines, display) | 400, 700           |
| **Space Mono**       | `--font-mono`     | Monospace (labels, badges) | 400, 700           |

These are mapped to Tailwind theme families in `globals.css`:

```css
@theme inline {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-playfair), ui-serif, Georgia, 'Times New Roman', serif;
  --font-mono: var(--font-mono), ui-monospace, 'SF Mono', 'Cascadia Code', monospace;
}
```

### Usage patterns

- **Serif (Playfair)** — Hero titles, result level numbers, FOMO counter numbers. Always bold (`font-weight: 700`), often italic for subtitles.
- **Sans (Inter)** — Body copy, descriptions, button labels, form inputs. Sizes range from `12px` to `17px`.
- **Mono (Space Mono)** — The "ACCIONABLES" brand badge, the "SELF-ASSESSMENT" label, the FOMO "LIVE" label. Always uppercase with wide letter-spacing (`0.12em`–`0.3em`).

---

## Color Palette

### CSS Custom Properties (`:root`)

| Token         | Hex       | Usage                                              |
| ------------- | --------- | -------------------------------------------------- |
| `--bg-soft`   | `#f3f4f7` | Page background (light warm gray)                  |
| `--brand-700` | `#1f36a9` | Deepest brand blue (headlines, CTA text)           |
| `--brand-600` | `#365cff` | Primary brand blue (progress bars, links, borders) |
| `--brand-500` | `#4e6bff` | Mid brand blue (hover states, glitch accents)      |
| `--brand-300` | `#8a9ff0` | Light brand blue (secondary accents)               |

### Additional Colors Used Inline

| Color           | Hex / Value     | Where                                     |
| --------------- | --------------- | ----------------------------------------- |
| Body text       | `neutral-900`   | Base body color                           |
| Muted text      | `#4d5b9a`       | Hero subtitle                             |
| Brand at 80%    | `#365cff` / 80% | Meta text                                 |
| Progress track  | `#d8defa`       | Quiz progress bar background              |
| Green accent    | `#4ade80`       | "Yes" buttons, score bars, newsletter CTA |
| Green hover     | `#22c55e`       | "Yes" button hover                        |
| Dark green text | `#052e16`       | Text on green buttons                     |
| Green at 70%    | `#4ade80` / 70% | Level name labels                         |
| Error red       | `red-400`       | Email validation error                    |
| White card      | `#ffffff`       | Quiz question card                        |

### Transparency / Glassmorphism Values

The project makes heavy use of `rgba()` with alpha channels for a glassy, layered feel:

- **White glass** — `rgba(255, 255, 255, 0.18)` for CTA backgrounds, pills
- **Brand overlays** — `rgba(54, 92, 255, 0.06)` to `rgba(54, 92, 255, 0.5)` for grid lines, borders, cube faces, aurora blobs
- **Dark overlays** — `rgba(31, 54, 169, 0.04)` to `rgba(31, 54, 169, 0.4)` for shadows, muted labels

---

## Visual Style & Effects

### Background Treatment

- **Grid pattern** — 42px grid using subtle blue lines on `--bg-soft`
- **Aurora blobs** — 4 large radial-gradient circles (blurred, animated, 35% opacity) for an organic glow
- **Grain overlay** — Tiny dot pattern at 16% opacity with `mix-blend-mode: multiply`
- **3D floating shapes** — Two translucent cubes (42px, 48px) and a pyramid (36px) with CSS 3D transforms on long orbital keyframe animations

### Component Styles

- **Glass CTA buttons** — `backdrop-filter: blur(16px) saturate(180%)`, white glass border, 3D perspective tilt, hover fills with solid gradient `#2b4cf0` → `#4e6bff`
- **Tech brand badge** — Monospace, uppercase with a scanning light animation and shimmer gradient on hover
- **Glitch title** — Dual `::before` / `::after` pseudo-elements with clip-path and offset transforms for a subtle digital glitch
- **Marquee pills** — Frosted glass pills with `backdrop-filter: blur(12px)`, subtle borders and inset highlights
- **Blueprint SVG "AI"** — Animated stroke-draw with anchor points that scale in/out on a 16s cycle, with a breathing glow

---

## Responsive Breakpoints

- Primary breakpoint at `640px` (Tailwind `sm:`) adjusting font sizes, padding, and spacing
- `clamp()` used for fluid typography:
  - Hero AI SVG: `clamp(56px, 9vw, 96px)`
  - Hero title: `clamp(26px, 4.5vw, 44px)`
  - FOMO number: `clamp(44px, 7vw, 58px)`

---

## Motion

- All animations respect `prefers-reduced-motion: reduce` with a blanket `animation: none` fallback
- Animation durations are long and organic:
  - **Background blobs / floating shapes** — 50s–110s
  - **UI microinteractions** — 4s–16s
  - **Marquee scroll** — 400s

---

## Summary

The design language is a **light-mode glassmorphism** built on a blue monochromatic palette (`#1f36a9` through `#8a9ff0`) with green (`#4ade80`) as the sole accent for affirmative actions. Typography combines a classical serif (Playfair) for editorial weight, a clean sans (Inter) for readability, and a monospace (Space Mono) for technical branding. The overall aesthetic is layered, translucent, and subtly animated.
