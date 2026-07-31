// Busca la imagen principal del artículo de Wikipedia (en) de cada modelo y la
// guarda en docs/data/models.json (images[0] + imageSource). Solo procesa los
// modelos SIN imagen, así se puede re-ejecutar al agregar modelos nuevos:
//   node tools/fetch-images.mjs
// Las imágenes quedan hotlinkeadas desde upload.wikimedia.org (Wikimedia
// Commons); imageSource enlaza al artículo de origen para la atribución.

import fs from "fs";

const MODELS = "docs/data/models.json";
const BRANDS = "docs/data/brands.json";
const UA = "CarpediaImageBot/1.0 (https://github.com/pollirigi/carpedia)";
const THUMB = 1200;

// Títulos exactos para modelos cuyo nombre no coincide con el artículo.
const OVERRIDES = {
  "porsche-550": ["Porsche 550"],
  "lotus-elite-type14": ["Lotus Elite"],
  "lotus-elite-type75": ["Lotus Elite (1974)", "Lotus Elite"],
  "lotus-elan-m100": ["Lotus Elan (M100)"],
  "lotus-eclat": ["Lotus Éclat", "Lotus Eclat"],
  "alfa-8c": ["Alfa Romeo 8C 2900", "Alfa Romeo 8C 2300"],
  "alfa-giulietta-750": ["Alfa Romeo Giulietta (750/101)"],
  "alfa-gt-105": ["Alfa Romeo 105/115 Series Coupés", "Alfa Romeo Giulia Sprint GT"],
  "alfa-1750-2000-berlina": ["Alfa Romeo 1750 Berlina"],
  "alfa-alfetta-gt": ["Alfa Romeo Alfetta GT/GTV", "Alfa Romeo GTV6", "Alfa Romeo Alfetta"],
  "alfa-sprint": ["Alfa Romeo Sprint", "Alfa Romeo Alfasud Sprint"],
  "alfa-giulietta-116": ["Alfa Romeo Giulietta (116)"],
  "alfa-6-flagship": ["Alfa Romeo 6"],
  "alfa-sz-rz": ["Alfa Romeo SZ"],
  "alfa-145-146": ["Alfa Romeo 145 and 146", "Alfa Romeo 145"],
  "alfa-gtv-spider-916": ["Alfa Romeo GTV and Spider", "Alfa Romeo GTV (916)"],
  "alfa-giulietta-940": ["Alfa Romeo Giulietta (940)"],
  "alfa-giulia-952": ["Alfa Romeo Giulia (952)"],
  "ferrari-america": ["Ferrari America"],
  "ferrari-365-family": ["Ferrari 365 GT 2+2", "Ferrari 365"],
  "ferrari-daytona": ["Ferrari Daytona"],
  "ferrari-dino-206-246": ["Dino 206 GT and 246 GT", "Dino (automobile)"],
  "ferrari-dino-308gt4": ["Dino 308 GT4", "Ferrari Dino 308 GT4"],
  "ferrari-bb": ["Ferrari Berlinetta Boxer"],
  "ferrari-400": ["Ferrari 412", "Ferrari 400"],
  "ferrari-308": ["Ferrari 308 GTB/GTS", "Ferrari 308 GTB"],
  "ferrari-testarossa": ["Ferrari Testarossa"],
  "ferrari-456": ["Ferrari 456"],
  "ferrari-550": ["Ferrari 550"],
  "ferrari-360": ["Ferrari 360"],
  "ferrari-enzo": ["Enzo Ferrari (automobile)", "Ferrari Enzo"],
  "ferrari-599": ["Ferrari 599"],
  "ferrari-458": ["Ferrari 458"],
  "ferrari-488": ["Ferrari 488"],
  "delorean-dmc12": ["DMC DeLorean", "DeLorean DMC-12"],
  "alfa-junior": ["Alfa Romeo Junior (2024)"]
};

const models = JSON.parse(fs.readFileSync(MODELS, "utf8"));
const brands = JSON.parse(fs.readFileSync(BRANDS, "utf8"));
const brandName = Object.fromEntries(brands.map((b) => [b.id, b.name]));

const candidatesFor = (m) => {
  const out = [];
  if (m.wiki) out.push(m.wiki);
  if (OVERRIDES[m.id]) out.push(...OVERRIDES[m.id]);
  const brand = brandName[m.brandId] ?? "";
  const clean = m.name.replace(/["“”]/g, "").trim();
  const noParen = clean.replace(/\s*\([^)]*\)/g, "").trim();
  const first = clean.split("/")[0].trim();
  const firstNoParen = noParen.split("/")[0].trim();
  for (const n of [clean, noParen, first, firstNoParen]) {
    if (n) out.push(`${brand} ${n}`.trim());
  }
  return [...new Set(out)];
};

const badImage = (src) => /logo|badge|emblem|flag|wordmark|\.svg/i.test(src);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchThumb(title) {
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2" +
    "&redirects=1&prop=pageimages&piprop=thumbnail&pithumbsize=" + THUMB +
    "&titles=" + encodeURIComponent(title);
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.ok) {
      const data = await res.json();
      const page = data?.query?.pages?.[0];
      const src = page?.thumbnail?.source;
      if (!page || page.missing || !src || badImage(src)) return null;
      return { src, title: page.title };
    }
    // 429/5xx: esperar y reintentar
    await sleep(1500 * attempt);
  }
  return null;
}

// Fallback: búsqueda directa de archivos en Wikimedia Commons.
async function commonsSearch(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2" +
    "&generator=search&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url&iiurlwidth=" + THUMB +
    "&gsrsearch=" + encodeURIComponent(query + " filetype:bitmap");
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  const data = await res.json();
  for (const p of data?.query?.pages ?? []) {
    const src = p?.imageinfo?.[0]?.thumburl;
    if (src && !badImage(src)) {
      return { src, page: "https://commons.wikimedia.org/wiki/" + p.title.replace(/ /g, "_") };
    }
  }
  return null;
}

async function processModel(m) {
  if (m.images && m.images.length) return { id: m.id, status: "ya tenía" };
  for (const cand of candidatesFor(m)) {
    try {
      const hit = await fetchThumb(cand);
      if (hit) {
        m.images = [hit.src];
        m.imageSource = "https://en.wikipedia.org/wiki/" + hit.title.replace(/ /g, "_");
        return { id: m.id, status: "ok", title: hit.title };
      }
    } catch (e) {
      // reintento con el siguiente candidato
    }
  }
  // Sin artículo con imagen: buscar el archivo directo en Commons.
  const brand = brandName[m.brandId] ?? "";
  const q = `${brand} ${m.name.replace(/["“”]/g, "").replace(/\s*\([^)]*\)/g, "").split("/")[0].trim()}`;
  try {
    const hit = await commonsSearch(q);
    if (hit) {
      m.images = [hit.src];
      m.imageSource = hit.page;
      return { id: m.id, status: "ok", title: "Commons: " + q };
    }
  } catch (e) { /* sin fallback */ }
  return { id: m.id, status: "SIN IMAGEN" };
}

// Concurrencia limitada para no castigar la API (subirla dispara rate limits).
const LIMIT = 2;
const queue = [...models];
const results = [];
async function worker() {
  while (queue.length) {
    const m = queue.shift();
    results.push(await processModel(m));
    await sleep(150);
  }
}
await Promise.all(Array.from({ length: LIMIT }, worker));

fs.writeFileSync(MODELS, JSON.stringify(models, null, 2) + "\n");

const ok = results.filter((r) => r.status === "ok").length;
const had = results.filter((r) => r.status === "ya tenía").length;
const miss = results.filter((r) => r.status === "SIN IMAGEN");
console.log(`OK: ${ok} · ya tenían: ${had} · sin imagen: ${miss.length}`);
for (const m of miss) console.log("  MISS:", m.id);
