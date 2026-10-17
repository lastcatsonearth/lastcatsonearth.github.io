# Adding photos to the booking gallery

## How it works
- **Originals** → `src/assets/booking/photos/<show>/` (used only in the lightbox)
- **Thumbs** → `src/assets/booking/thumbs/<show>/` (auto-generated, 640px WebP, used in the grid)
- Both are loaded in `src/components/booking/bookingData.ts` via `import.meta.glob`, grouped by folder name.
- Show info (title, date, city, text) lives in `src/content/shows.ts` – used by the EPK gallery **and** the `/shows` pages.

## New photos for an existing show
1. Drop the files into `src/assets/booking/photos/<show>/`
   - Name them numerically: `1.webp`, `2.webp`, ... (natural sort, so 10 comes after 9)
2. Run:
   ```bash
   npm run thumbs
   ```
   (also shrinks originals bigger than 2048px)
3. Check that `thumbs/<show>/` has the same files.
4. Commit both `photos/` and `thumbs/`.

## New show
1. Create `src/assets/booking/photos/<new_show>/` and add photos.
2. Run `npm run thumbs`.
3. In `src/content/shows.ts`, add an entry (newest first). `gallery` must match the folder name exactly.
4. Add `/shows/<slug>` and `/en/shows/<slug>` to `public/sitemap.xml`.

## Gotchas
- Forgot to run the script → empty gallery row.
- Grid shows only the first 5 photos per show; the rest appear as `+N`.
- "Zamanand Festival" has special layout/crop in `PhotoGalleryGrid.tsx` (matched by title).
- Lightbox must read `show.fullPhotos[photoIdx]`, not `show.photos`.
- Thumb should be under ~100KB. If not, lower `quality` or `width` in `scripts/thumbs.mjs`.

## Optional: auto-generate on build
In `package.json`:
```json
"prebuild": "npm run thumbs"
```
