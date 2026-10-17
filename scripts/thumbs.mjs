// scripts/thumbs.mjs  –  run with: npm run thumbs
// 1. Shrinks full-size photos in src/assets/booking/photos/<show>/ to max 2048px (in place).
// 2. Generates 640px thumbs into src/assets/booking/thumbs/<show>/.
import sharp from "sharp";
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import path from "path";

const IN = "src/assets/booking/photos";
const OUT = "src/assets/booking/thumbs";
const FULL_MAX = 2048;

for (const show of readdirSync(IN, { withFileTypes: true }).filter((d) => d.isDirectory())) {
    mkdirSync(path.join(OUT, show.name), { recursive: true });
    for (const f of readdirSync(path.join(IN, show.name)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))) {
        const src = path.join(IN, show.name, f);
        const buf = readFileSync(src);

        const { width = 0, height = 0 } = await sharp(buf).metadata();
        if (Math.max(width, height) > FULL_MAX) {
            const smaller = await sharp(buf).rotate().resize({ width: FULL_MAX, height: FULL_MAX, fit: "inside" }).webp({ quality: 80 }).toBuffer();
            writeFileSync(src, smaller);
        }

        await sharp(buf)
            .rotate()
            .resize({ width: 640, withoutEnlargement: true })
            .webp({ quality: 70 })
            .toFile(path.join(OUT, show.name, f.replace(/\.\w+$/, ".webp")));
    }
}
