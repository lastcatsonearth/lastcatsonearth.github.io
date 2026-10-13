// scripts/thumbs.mjs
import sharp from "sharp";
import { readdirSync, mkdirSync } from "fs";
import path from "path";

const IN = "src/assets/booking/photos";
const OUT = "src/assets/booking/thumbs";

for (const show of readdirSync(IN, { withFileTypes: true }).filter(d => d.isDirectory())) {
    mkdirSync(path.join(OUT, show.name), { recursive: true });
    for (const f of readdirSync(path.join(IN, show.name)).filter(f => /\.(jpe?g|png|webp)$/i.test(f))) {
        await sharp(path.join(IN, show.name, f))
            .rotate()
            .resize({ width: 640, withoutEnlargement: true })
            .webp({ quality: 70 })
            .toFile(path.join(OUT, show.name, f.replace(/\.\w+$/, ".webp")));
    }
}