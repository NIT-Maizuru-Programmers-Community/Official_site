---
name: procon-content-support
description: Add or edit content for the Maizuru Kosen Programmers Community Club site, following its TypeScript schemas and publication rules.
---

# Club site content support

Use this skill for updates to the site's news, results, works, activities, links, school or club details, contact information, and related content pages. For general code or visual redesign work, follow the repository instructions without loading this skill.

## Ground the change in the repository

- Read `AGENTS.md` and `docs/content-guide.md`, then inspect the relevant type in `src/types/content.ts`, the target data file, and nearby entries.
- Follow the existing data shape and local writing style. Keep content in `src/content/`; do not duplicate facts in page components when shared data already supplies them.
- For page copy or links, inspect the page/component that renders the selected content when needed.

## Protect publication accuracy

- Use facts supplied by the user or verified in the cited official source. Do not invent event dates, results, participant names, activity schedules, contact details, privacy terms, image permissions, or organization claims.
- If required facts are missing, ask for them or leave a clearly identified draft rather than filling gaps with plausible details.
- Keep new news, results, and works unpublished with `draft: true` unless the user explicitly says the content is approved for publication. Do not publish a placeholder or sample entry.
- For competition results, include the official source URLs and ensure each outcome is supported by those sources. Include participant names only when permission to publish is confirmed.
- For external links, use HTTPS, a descriptive title and description, and make sure the destination supports the description. Prefer official sources.
- For images, require confirmed publication permission, remove EXIF metadata, use an appropriately sized WebP/AVIF in `public/images/`, and provide meaningful alt text where the schema calls for it. Do not use design mockups as published photos.
- Keep contact and privacy information consistent with `src/content/site.ts`; do not enable collection of personal information without confirmed provider, purpose, and retention details.

## Validate the entry

- Check the schema, unique lowercase hyphenated slug, real `YYYY-MM-DD` publication date, draft state, required fields, links, and image paths against nearby entries and `docs/content-guide.md`.
- For changes to content data or its rendering, run `pnpm check:quick` and report the result. For a documentation-only change, inspect edited links and commands instead of running unrelated app checks.
- Report any unverified facts, publication approval still needed, and checks not run. Do not claim visual verification unless the relevant page was opened and inspected.
