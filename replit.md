# CEM NMAT Mock Exam Simulator

A browser-based NMAT mock exam simulator with a Question Bank Manager, 3-phase timer (Part I / Break / Part II), and a full results review page with per-item rationale support.

## Run & Operate

- `pnpm --filter @workspace/nmat-exam run dev` — run the exam app (Vite dev server)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Exam app: Vite static site, single `artifacts/nmat-exam/index.html` (all CSS/JS inline)
- API: Express 5
- DB: PostgreSQL + Drizzle ORM

## Where things live

- `artifacts/nmat-exam/index.html` — entire exam app (HTML + CSS + JS, all inline)
- `artifacts/nmat-exam/public/answers.json` — filename-keyed answer key (source of truth)
- `artifacts/nmat-exam/public/rationales.json` — question ID → explanation text map (source of truth)
- `artifacts/nmat-exam/public/questions/` — 8 subfolders of question PNG images

## Architecture decisions

- Single-file app (`index.html`) for zero-build portability and easy Vercel deployment.
- Answer key stored in `public/answers.json` keyed by filename (e.g. `p1_verbal_001_q.png`) so images and answers stay decoupled from source code.
- Rationales stored in `public/rationales.json` keyed by question ID (e.g. `p1_verbal_001`) derived by stripping folder prefix and `_q.png` suffix from the image path.
- 3-phase timer: Part I (02:15:00 shared) → Break (00:10:00) → Part II (01:30:00 shared). No per-section timer resets.
- Part I sections (indices 0–3) are locked once break starts; section dropdown rebuilds to show only the current part's subtests.

## Gotchas

- **After editing `public/answers.json`**: push to GitHub and redeploy to Vercel — the file is fetched at runtime.
- **After editing `public/rationales.json`**: copy it to `dist/public/` if a built dist exists:
  ```
  cp artifacts/nmat-exam/public/rationales.json artifacts/nmat-exam/dist/public/rationales.json
  ```
  Then push to GitHub and redeploy to Vercel to make the rationales live in production.
- Do NOT call `downloadAnswerKey()` automatically — only via the "Save & Export Key" button.
- Section images must follow the naming convention: `<folderKey>_<NNN>_q.png` and `<folderKey>_<NNN>_c.png`.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
