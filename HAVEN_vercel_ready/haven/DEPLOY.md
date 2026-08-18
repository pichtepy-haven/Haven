# Deploying Haven to Vercel

This project is a Vite + React 18 SPA (exported from Figma Make) and is ready to deploy as-is.

## Option A — Import from GitHub (auto-redeploys on every push)

1. Create an empty repo on GitHub (no README, no .gitignore).
2. From this folder:

   ```bash
   git init
   git add -A
   git commit -m "Haven web app"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

3. Go to https://vercel.com/new, pick the repo, and click **Deploy**.
   Vercel reads `vercel.json` and needs no manual settings. Leave everything default.

## Option B — Deploy straight from your machine

```bash
npm i -g vercel
vercel login
vercel --prod
```

Accept the defaults when prompted; `vercel.json` supplies the framework, build command, and output directory.

## Build settings (already configured in `vercel.json`)

| Setting          | Value        |
| ---------------- | ------------ |
| Framework        | Vite         |
| Build command    | `vite build` |
| Output directory | `dist`       |
| Install command  | `npm install` |
| Node version     | 22.x (default) |

The `rewrites` rule in `vercel.json` sends every path to `index.html`. This is required —
the app uses `BrowserRouter`, so without it a hard refresh on `/patient/dashboard` would 404.

## Routes to show in a demo

| Path                  | Screen                       |
| --------------------- | ---------------------------- |
| `/`                   | Landing page                 |
| `/select-account`     | Patient / Doctor chooser     |
| `/patient/signin`     | Patient sign in              |
| `/patient/dashboard`  | Patient home, health score   |
| `/patient/records`    | Records vault                |
| `/patient/ai`         | AI health assistant          |
| `/patient/sharing`    | Sharing centre               |
| `/patient/profile`    | Patient profile              |
| `/doctor/signin`      | Doctor sign in               |
| `/doctor/dashboard`   | Doctor home                  |
| `/admin/signin`       | Admin sign in (direct URL)   |
| `/admin/dashboard`    | Admin console                |

Auth is mocked in `src/app/context/AuthContext.tsx` — any credentials sign you in.

## Changes made to the Figma export

- Added `react` and `react-dom` 18.3.1 as real dependencies. Figma listed them as
  *optional peer dependencies*, so a clean `npm install` on Vercel would have failed
  to resolve them.
- Added `vercel.json` with the SPA rewrite (see above) and immutable caching for `/assets`.
- Replaced the logo asset. The export shipped a 5226x5481 **CMYK** JPEG at 6.65 MB,
  carrying a ~500 KB embedded ICC profile, loaded on every screen. It is now a 320 px
  RGB PNG at 31 KB. Total build output went from 7.2 MB to 628 KB.
- Fixed `index.html`: the title was still Figma's placeholder ("Complete current task")
  with a task-management meta description. Now titled Haven, with a favicon and OG tags.
