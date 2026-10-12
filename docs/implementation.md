# Jaeger Properties — implementation notes

## Art direction

Three opening directions were evaluated: an editorial property cover, an interactive architectural model, and a pinned same-residence transformation. The third directly serves the brief and construction reference. A model would require a suitable real asset; distorted photographs are not a substitute.

Primary methods: ST-07 progressive storytelling and ST-08 conversion. ST-01 editorial composition supports catalogue and lifestyle discovery. The provisional JP mark is original SVG geometry. Cormorant Garamond carries editorial headlines; Manrope carries interface and body text. The supplied ivory, forest, sage, sand and bronze palette informs the site.

## Signature imagery

The supplied luxury residence is the final exterior. Four matching stage images were made with the built-in image tool using that image as the edit target. Each prompt required fixed camera framing, the same footprint, flat roof and matching environmental anchor. The prompts requested: cyan-white architectural wireframe on slate, foundation slabs/footings, concrete/steel structural framing, and a weatherproof unfinished shell. No text, new house design or gabled roof were requested. The welcome stage moves gently closer to the finished exterior.

Assets: `public/images/stage-blueprint.webp`, `stage-foundation.webp`, `stage-framing.webp`, `stage-dried-in.webp` and the supplied finished `residence.webp`. These are conceptual visualizations, not construction records or engineering specifications. The other supplied blueprint and timber-frame images depict different buildings and remain separate references. Built-in image generation was used, without an API-key workflow.

GSAP maps active chapters and crossfades to scroll progress. It reverses, cleans up on navigation and recomputes on resize. Mobile keeps a central house and places text below its principal structure. Reduced motion replaces pinning with a still composition and manual chapter selection. A visitor can also select “View without motion.”

## Functional demo

### Construction-video refinement

The 17.53-second supplied construction recording was reviewed again. Its primary lesson is a house-dominant scene, a consistent setting, small captions near the lower edge, progressive construction reveal and a final approach toward the home. The revised homepage and residence case study use full-width imagery, lower-left editorial captions, bottom-up reveal masks with short crossfades, and a final 1.24x camera push. This is prepared conceptual image choreography, not an interactive 3D model or a record of a built project. The entire property platform remains behind the sequence.

- 12 purchase and six rental samples with USD sample pricing, eight Harare suburbs and illustrative specifications.
- URL filters, keyword search, sorting, list/grid views, lifestyle destinations and a three-step finder.
- Individual property URLs, fullscreen galleries, keyboard/swipe controls, local favourites and URL sharing.
- Contact, seller and viewing forms validate and show explicit browser-local confirmations.
- localStorage holds favourites. IndexedDB holds listings, compressed uploads and enquiries.
- `/admin` implements add/edit/delete, sale/rent, photo uploads/removal, featured and visibility controls, and enquiry review/clearing. It is an open local demo, not secured production administration.
- The separate supplied Jaeger Media WhatsApp link is the real business handoff. Demo property enquiries are never sent there automatically.

Photo upload limits: JPEG/PNG/WebP, eight per listing, 20 MB source file limit, maximum 1200px edge, compressed WebP. Storage failures are reported, not shown as successful saves.

## Release and future upgrade

Repository: `RonanJaeger721/Jaeger-Properties`, `main`. New Vercel project: `jaeger-properties`, team `ronannyaks92-9747s-projects`, framework Next.js. Existing client projects are not release targets. Credentials, build state and dependencies are ignored.

Run `npm install` and `npm run dev`; validate with `npm run typecheck` and `npm run build`. For production business use, replace local persistence with a server database/media storage, add authenticated administrator access and authorization, and configure enquiry delivery or actual booking. Replace all illustrative records with authorized data. The demo deliberately carries noindex metadata.
