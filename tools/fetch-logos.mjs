// Busca el logo de cada marca (imagen principal del artículo de Wikipedia,
// con fallback a búsqueda en Commons) y lo guarda en docs/data/brands.json.
// Solo procesa marcas sin logo:  node tools/fetch-logos.mjs

import fs from "fs";

const BRANDS = "docs/data/brands.json";
const UA = "CarpediaImageBot/1.0 (https://github.com/pollirigi/carpedia)";

const ARTICLES = {
  porsche: "Porsche",
  lotus: "Lotus Cars",
  "alfa-romeo": "Alfa Romeo",
  ferrari: "Ferrari",
  bmw: "BMW",
  "mercedes-benz": "Mercedes-Benz",
  toyota: "Toyota",
  volkswagen: "Volkswagen",
  chevrolet: "Chevrolet",
  saab: "Saab Automobile",
  delorean: "DeLorean Motor Company"
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function pageImage(title) {
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2" +
    "&redirects=1&prop=pageimages&piprop=thumbnail|name&pithumbsize=400&titles=" +
    encodeURIComponent(title);
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  const p = (await res.json())?.query?.pages?.[0];
  if (!p || p.missing || !p.thumbnail?.source) return null;
  return { src: p.thumbnail.source, file: p.pageimage || "" };
}

async function commonsLogo(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2" +
    "&generator=search&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url&iiurlwidth=400" +
    "&gsrsearch=" + encodeURIComponent(query);
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  for (const p of (await res.json())?.query?.pages ?? []) {
    const src = p?.imageinfo?.[0]?.thumburl;
    if (src) return { src, file: p.title };
  }
  return null;
}

const brands = JSON.parse(fs.readFileSync(BRANDS, "utf8"));
for (const b of brands) {
  if (b.logo) { console.log(b.id, "ya tenía"); continue; }
  let hit = await pageImage(ARTICLES[b.id] ?? b.name);
  // Si la imagen del artículo no parece un logo, buscar explícitamente.
  if (!hit || !/logo/i.test(hit.file)) {
    const alt = await commonsLogo(`${b.name} car logo`);
    if (alt) hit = alt;
  }
  if (hit) {
    b.logo = hit.src;
    console.log(b.id, "->", hit.file || hit.src.split("/").pop());
  } else {
    console.log(b.id, "SIN LOGO");
  }
  await sleep(300);
}
fs.writeFileSync(BRANDS, JSON.stringify(brands, null, 2) + "\n");
