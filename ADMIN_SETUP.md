# Admin Publish Setup

The `/admin` page supports one-click publish:

1. Edit copy rows.
2. Click `Publish`.
3. Server creates a branch, commits `content/copywriting-sheet.csv`, and opens a PR.

## Required Environment Variables

Set these in Vercel Project Settings -> Environment Variables:

- `ADMIN_PASSWORD`
  - Password required to access admin APIs.
- `GITHUB_TOKEN`
  - GitHub PAT with `repo` permissions for this repository.
- `GITHUB_OWNER`
  - Example: `jacobpopcantstop`
- `GITHUB_REPO`
  - Example: `dadskeleton`
- `GITHUB_BASE_BRANCH`
  - Usually: `main`

Optional:

- `ADMIN_AUTO_MERGE`
  - Set to `true` to auto-merge PRs created by admin publish.
  - Recommended to keep unset/false until reviewed.

## Routes

- `GET /api/admin/session`
- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET /api/admin/copy`
- `POST /api/admin/copy`
- `POST /api/admin/publish`

## Notes

- If `ADMIN_PASSWORD` is not set, admin routes are open by default.
- Admin currently edits and publishes `content/copywriting-sheet.csv`.
