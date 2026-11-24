// scripts/press.mjs  –  run with: npm run press
// Builds the downloadable press kit in public/press/:
//   - all live photos of the SHOWS below as JPG (max 2400px) + last-cats-on-earth-presskit.zip
//   - logo PNGs (transparent) + last-cats-on-earth-logos.zip
// To change the photos, edit SHOWS below.
import sharp from "sharp";
import { mkdirSync, readFileSync, writeFileSync, statSync, readdirSync, rmSync } from "fs";
import { crc32 } from "zlib";
import path from "path";

const OUT = "public/press";
// Every photo of these show folders goes into the press ZIP (promoters pick what they need).
const SHOWS = [
    { folder: "renazzo", name: "renazzo" },
    { folder: "zamanand", name: "zamanand-festival" },
];
const natural = (a, b) => a.localeCompare(b, undefined, { numeric: true });
const PHOTOS = SHOWS.flatMap(({ folder, name }) =>
    readdirSync(path.join("src/assets/booking/photos", folder))
        .filter((f) => f.endsWith(".webp"))
        .sort(natural)
        .map((f, i) => ({ src: `${folder}/${f}`, out: `last-cats-on-earth-live-${name}-${String(i + 1).padStart(2, "0")}.jpg` })),
);

mkdirSync(OUT, { recursive: true });
const files = [];

// Remove photos from older press-kit builds so only the current set is shipped.
for (const f of readdirSync(OUT)) if (/^last-cats-on-earth-live-.*\.jpg$/.test(f)) rmSync(path.join(OUT, f));

for (const { src, out } of PHOTOS) {
    await sharp(path.join("src/assets/booking/photos", src))
        .rotate()
        .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 86, mozjpeg: true })
        .toFile(path.join(OUT, out));
    files.push(out);
}

await sharp("src/assets/only_cat.webp").png().toFile(path.join(OUT, "last-cats-on-earth-logo.png"));
await sharp("public/favicon.png").png().toFile(path.join(OUT, "last-cats-on-earth-logo-round.png"));
const logos = ["last-cats-on-earth-logo.png", "last-cats-on-earth-logo-round.png"];

// Minimal "stored" ZIP writer (photos/PNGs are already compressed, so no deflate needed).
const now = new Date();
const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
const writeZip = (zipName, folder, names) => {
const parts = [];
const central = [];
let offset = 0;
for (const name of names) {
    const data = readFileSync(path.join(OUT, name));
    const nameBuf = Buffer.from(`${folder}/${name}`);
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
end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(names.length, 8); end.writeUInt16LE(names.length, 10);
end.writeUInt32LE(centralBuf.length, 12); end.writeUInt32LE(offset, 16);
const zipPath = path.join(OUT, zipName);
writeFileSync(zipPath, Buffer.concat([...parts, centralBuf, end]));

console.log(`${zipName}: ${names.length} files, ${(statSync(zipPath).size / 1048576).toFixed(1)} MB`);
};

writeZip("last-cats-on-earth-presskit.zip", "last-cats-on-earth-photos", files);
writeZip("last-cats-on-earth-logos.zip", "last-cats-on-earth-logos", logos);
