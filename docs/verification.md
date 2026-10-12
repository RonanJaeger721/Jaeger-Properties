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

## Latest motion revision
TypeScript, five catalogue logic tests and production compilation passed before the caption-clock refinement; repeat build recorded during release. Desktop 1440 and mobile 390 scenes were visually reviewed locally, including keyboard range Home/End. A subsequent broad responsive sweep was interrupted by user input, and browser reconnection was rejected by browser security policy. The full previous responsive report therefore describes the preceding release; broad rendered QA for this latest global typography revision is not claimed complete.

## Collection and image-motion release
40 rendered route/width checks passed: home, buy, contact and residence at 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 and 1920. No document overflow or horizontally clipped heading was found. Desktop collage and collection were visually inspected; collage text contrast was corrected. Catalogue Borrowdale filtering produced two records; list view, gallery next image (2/4), gallery close, viewing modal fields and before/after keyboard End (100) responded. House scrubbing and discovery link were exercised. No browser error logs were recorded in this review. Submission/storage, admin CRUD and finder have the earlier end-to-end verification above; they were not changed in this release. Five catalogue tests and final production build passed.
