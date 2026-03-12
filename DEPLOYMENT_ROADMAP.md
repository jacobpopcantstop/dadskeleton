# Deployment Audit & Production Roadmap

## Executive summary
This repo is close to deployable, but **not launch-ready** yet. Four categories need closure before full production rollout:

1. **Build gates**: lint fails and build fails in this environment.
2. **Security hygiene**: dependency vulnerabilities include one high-severity advisory.
3. **Content readiness**: launch pages still use placeholder media blocks.
4. **Operations readiness**: no documented CI/CD, monitoring, or rollback workflow.

---

## Audit evidence

### Commands run
- `npm ci`
- `npm run lint`
- `npm run build`
- `npm audit --json`

### Result summary
- `npm ci`: pass
- `npm run lint`: fail
- `npm run build`: fail in this environment (Google font fetch/TLS issue)
- `npm audit --json`: 11 vulnerabilities (10 moderate, 1 high)

---

## Detailed findings

### 1) Build & quality gates (blocker)
- Lint currently fails with React hook/effect purity violations in:
  - `app/bone-zone/page.tsx`
  - `components/Confetti.tsx`
  - `contexts/SkeletonHuntContext.tsx`
- Build fails in this environment because `app/layout.tsx` uses `next/font/google` (`Inter`) and build-time font fetch fails.

**Risk**: CI/CD instability and non-deterministic deploy outcomes.

### 2) Security posture (blocker)
- Dependency audit reports 11 vulnerabilities total.
- `next@16.1.3` is behind patched releases and has a reported high-severity advisory.

**Risk**: avoidable exposure during production operation.

### 3) Product/content readiness (blocker)
- Core marketing pages still display intentional placeholders (hero/photo/headshot/grid placeholders).
- Gallery page explicitly calls out placeholder replacement.

**Risk**: launch quality and trust impact.

### 4) Operational maturity (high priority)
Repository currently lacks explicit artifacts for:
- CI workflow enforcing install/lint/build (and optional tests).
- Environment contract (`.env.example`, env matrix, ownership).
- Monitoring & alert routing docs.
- Release runbook and rollback instructions.

**Risk**: weak repeatability, slower incident response.

---

## Production deployment plan

## Phase 0 — Close blockers (target: 1–2 days)
1. Fix lint errors in the three failing files.
2. Make builds deterministic:
   - Preferred: use local fonts (`next/font/local`) for deployment independence.
   - Alternate: configure trusted TLS certs in build environment and validate repeatably.
3. Upgrade `next` to a patched release and re-run full checks.

**Deliverables**
- Green `npm run lint`.
- Green `npm run build` from clean checkout.
- Updated lockfile and audit report.

**Exit criteria**
- CI passes on at least one clean run for default branch.

## Phase 1 — Content freeze for launch pages (target: 2–4 days)
1. Replace placeholder blocks/assets on Home, About, Calendar, Get Involved, Gallery.
2. Verify contact links, socials, ticket CTA paths.
3. Add/verify route-level metadata and OG sharing image.

**Deliverables**
- Final approved media assets in `public/` and references in pages.
- Content QA checklist with sign-off.

**Exit criteria**
- No placeholder text/media on launch-critical routes.

## Phase 2 — CI/CD hardening (target: 2–3 days)
1. Add CI workflow with required checks:
   - install
   - lint
   - build
   - optional type-check/test
2. Enforce branch protection and required status checks.
3. Standardize deployment path:
   - PR previews
   - staging promotion
   - production deployment
4. Document rollback procedure.

**Deliverables**
- CI config + branch rules + deployment docs.

**Exit criteria**
- Every merge to main is validated and deployable.

## Phase 3 — Observability & reliability (target: 2–3 days)
1. Add error monitoring and performance telemetry.
2. Add uptime checks and alert routing.
3. Add analytics for primary conversion events.

**Deliverables**
- Dashboards/alerts + runbook links.

**Exit criteria**
- Team can detect, triage, and respond to issues quickly.

## Phase 4 — Launch readiness and go-live (target: 1 day)
1. Cross-browser and mobile smoke tests.
2. Broken-link scan and accessibility spot-check.
3. Final security review (patched or risk accepted with owner/date).
4. Go-live + post-deploy verification.

**Exit criteria**
- Explicit launch approval from engineering + content owner.

---

## Prioritized task backlog

### P0 (must finish before launch)
- [ ] Fix lint errors in listed files.
- [ ] Resolve deterministic build for fonts.
- [ ] Patch Next.js and clear high-severity advisory.
- [ ] Replace placeholder content on launch pages.

### P1 (strongly recommended pre-launch)
- [ ] Add CI with required checks.
- [ ] Add `.env.example` and environment matrix.
- [ ] Add release + rollback runbook.

### P2 (early post-launch acceptable)
- [ ] Add richer observability dashboards.
- [ ] Add deeper product analytics instrumentation.

---

## Definition of “full deployment ready”
The project is considered full-production ready when all conditions are true:
- [ ] Clean install works from scratch.
- [ ] Lint/build checks are green in CI.
- [ ] No unresolved high-severity dependency advisories.
- [ ] Launch pages have final content/assets.
- [ ] Monitoring/alerts and rollback process are documented and tested.
