// scripts/press.mjs  –  run with: npm run press
// Builds the downloadable press kit in public/press/:
//   - 6 press photos as JPG (from src/assets/booking/photos, max 2400px)
//   - logo PNGs (transparent)
//   - one ZIP with all of the above
// To change the photos, edit PHOTOS below AND the thumbs in src/content/press.ts (same order).
import sharp from "sharp";
import { mkdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { crc32 } from "zlib";
import path from "path";

const OUT = "public/press";
const PHOTOS = [
    "zamanand/18.webp",
    "zamanand/5.webp",
    "zamanand/11.webp",
    "zamanand/16.webp",
    "alte_utting/photo_2.webp",
    "renazzo/7.webp",
];

mkdirSync(OUT, { recursive: true });
const files = [];

for (const [i, photo] of PHOTOS.entries()) {
    const name = `last-cats-on-earth-live-0${i + 1}.jpg`;
    await sharp(path.join("src/assets/booking/photos", photo))
        .rotate()
        .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 88, mozjpeg: true })
        .toFile(path.join(OUT, name));
    files.push(name);
}

await sharp("src/assets/only_cat.webp").png().toFile(path.join(OUT, "last-cats-on-earth-logo.png"));
await sharp("public/favicon.png").png().toFile(path.join(OUT, "last-cats-on-earth-logo-round.png"));
files.push("last-cats-on-earth-logo.png", "last-cats-on-earth-logo-round.png");

// Minimal "stored" ZIP writer (photos/PNGs are already compressed, so no deflate needed).
const now = new Date();
const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
const parts = [];
const central = [];
let offset = 0;
for (const name of files) {
    const data = readFileSync(path.join(OUT, name));
    const nameBuf = Buffer.from(`last-cats-on-earth-presskit/${name}`);
    const crc = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0, 6); local.writeUInt16LE(0, 8);
    local.writeUInt16LE(0, 10); local.writeUInt16LE(dosDate, 12); local.writeUInt32LE(crc, 14); local.writeUInt32LE(data.length, 18); local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26); local.writeUInt16LE(0, 28);
    parts.push(local, nameBuf, data);
    const c = Buffer.alloc(46);
    c.writeUInt32LE(0x02014b50, 0); c.writeUInt16LE(20, 4); c.writeUInt16LE(20, 6); c.writeUInt16LE(0, 8); c.writeUInt16LE(0, 10);
    c.writeUInt16LE(0, 12); c.writeUInt16LE(dosDate, 14); c.writeUInt32LE(crc, 16); c.writeUInt32LE(data.length, 20); c.writeUInt32LE(data.length, 24);
    c.writeUInt16LE(nameBuf.length, 28); c.writeUInt32LE(0, 30); c.writeUInt32LE(0, 34); c.writeUInt32LE(0, 38); c.writeUInt32LE(offset, 42);
    central.push(c, nameBuf);
    offset += 30 + nameBuf.length + data.length;
}
const centralBuf = Buffer.concat(central);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(centralBuf.length, 12); end.writeUInt32LE(offset, 16);
const zipPath = path.join(OUT, "last-cats-on-earth-presskit.zip");
writeFileSync(zipPath, Buffer.concat([...parts, centralBuf, end]));

console.log(`press kit: ${files.length} files, zip ${(statSync(zipPath).size / 1048576).toFixed(1)} MB`);
