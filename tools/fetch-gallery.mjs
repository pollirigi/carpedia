// Amplía la galería de cada modelo buscando fotos adicionales en Wikimedia
// Commons (hasta MAX_IMAGES en total por modelo). Solo procesa modelos con
// menos fotos que el máximo, así es re-ejecutable:
//   node tools/fetch-gallery.mjs

import fs from "fs";

const MODELS = "docs/data/models.json";
const BRANDS = "docs/data/brands.json";
const UA = "CarpediaImageBot/1.0 (https://github.com/pollirigi/carpedia)";
const THUMB = 1200;
const MAX_IMAGES = 4;

const models = JSON.parse(fs.readFileSync(MODELS, "utf8"));
const brands = JSON.parse(fs.readFileSync(BRANDS, "utf8"));
const brandName = Object.fromEntries(brands.map((b) => [b.id, b.name]));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const badImage = (src) =>
  /logo|badge|emblem|flag|wordmark|brochure|advert|map_|\.svg|\.pdf|\.tif/i.test(src);

// clave para deduplicar: nombre de archivo sin ruta ni prefijo de tamaño
const fileKey = (url) =>
  decodeURIComponent(url.split("/").pop() || "").replace(/^\d+px-/, "").toLowerCase();

async function commonsSearch(query, limit) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2" +
    "&generator=search&gsrnamespace=6&gsrlimit=" + limit +
    "&prop=imageinfo&iiprop=url&iiurlwidth=" + THUMB +
    "&gsrsearch=" + encodeURIComponent(query + " filetype:bitmap");
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.ok) return (await res.json())?.query?.pages ?? [];
    await sleep(1500 * attempt);
  }
  return [];
}

const queue = [...models];
let added = 0, done = 0;

async function worker() {
  while (queue.length) {
    const m = queue.shift();
    done++;
    m.images = m.images || [];
    if (m.images.length >= MAX_IMAGES) continue;
    const brand = brandName[m.brandId] ?? "";
    const clean = m.name.replace(/["“”]/g, "").replace(/\s*\([^)]*\)/g, "").split("/")[0].trim();
    const pages = await commonsSearch(`${brand} ${clean}`, 10);
    const seen = new Set(m.images.map(fileKey));
    for (const p of pages) {
      if (m.images.length >= MAX_IMAGES) break;
      const src = p?.imageinfo?.[0]?.thumburl;
      if (!src || badImage(src)) continue;
      const key = fileKey(src);
      if (seen.has(key)) continue;
      seen.add(key);
      m.images.push(src);
      added++;
    }
    if (done % 50 === 0) console.log(`…${done}/${models.length}`);
    await sleep(150);
  }
}

await Promise.all(Array.from({ length: 2 }, worker));
fs.writeFileSync(MODELS, JSON.stringify(models, null, 2) + "\n");

const counts = models.reduce((a, m) => { a[m.images.length] = (a[m.images.length] || 0) + 1; return a; }, {});
console.log(`Fotos agregadas: ${added}. Distribución (fotos→modelos):`, counts);
