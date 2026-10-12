# Verification — 12 October 2026

## Local release gate

- `npm test`: five catalogue tests passed (record counts/unique routes, combined filters, rental separation/monthly pricing, keyword/lifestyle matching, hidden listings and sorting).
- `npm run typecheck`: passed.
- `npm run build`: passed with Next.js 16.4.0.
- Browser preview shown at http://localhost:3000 before publication.
- 130 rendered route/viewport inspections saved in `browser-qa.json`; no document horizontal overflow, clipped heading boxes or broken loaded images were found.
- Requested viewport configurations: 320, 360, 375, 390, 430, 768, 1024, 1366, 1440, 1920px. Main page layouts were checked at each width; all 18 property routes were additionally checked on desktop and mobile. In-app browser effective widths can differ slightly due to scrollbar/device scaling.

## Interaction checks

- House chapter navigation reached the completed exterior and returned to the blueprint. Scroll pinning and reversible image transitions were inspected on desktop/mobile. The no-motion option removed pinning and retained manual stage access.
- Purchase location filters returned two Borrowdale homes; a restrictive budget reached the empty state. Clear filters, grid/list switching and sorting were exercised.
- Saved homes persisted across navigation/reload and were visible in the saved collection.
- Property gallery opened, advanced and responded to keyboard arrows/Escape. Touch-swipe handling is implemented; physical-device touch performance has not been independently measured.
- Copy link placed the actual property URL in the browser clipboard. Native Web Share is implemented where supported; no external sharing destination was selected during QA.
- A viewing request with preferred date/time was saved locally and appeared in management. A seller enquiry also returned the truthful local-only confirmation.
- A disposable property was added with an uploaded photo, survived reload, was changed to rental/featured, then removed. The original 18 samples remain.
- The finder returned the expected two Borrowdale purchase matches.
- Mobile menu and filter sheet opened and filtered results. Keyboard comparison advanced from 50% to 52%, and End revealed the full early-stage image.

## Limits

This is browser-local prototype storage, not cross-device persistence or authenticated production CMS. No real enquiry delivery, agent contact, property availability or booking integration is claimed. Core Web Vitals and physical iPhone/Android performance have not been certified. OS reduced-motion behavior is implemented using media queries; the equivalent still-scene path was exercised with the visitor-facing toggle.

Public deployment evidence is recorded after the GitHub push and Vercel release.
