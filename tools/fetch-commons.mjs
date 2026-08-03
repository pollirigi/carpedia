// Trae imágenes usando EXCLUSIVAMENTE la API oficial de Wikimedia Commons
// (commons.wikimedia.org/w/api.php — sin login, sin scraping).
//
// Verificación: una imagen solo se acepta si su TÍTULO DE ARCHIVO o sus
// CATEGORÍAS en Commons matchean marca + modelo + generación (regexes del
// mapa curado o tokens derivados). Si nada matchea, el hueco queda en null
// y el sitio muestra un placeholder — nunca una foto de otro auto.
//
//   node tools/fetch-commons.mjs
//
// Reprocesa solo huecos (image === null), así se puede re-ejecutar.

import fs from "fs";

const MODELS = "docs/data/models.json";
const BRANDS = "docs/data/brands.json";
const REPORT = "tools/image-report.json";
const UA = "CarpediaImageBot/2.0 (https://github.com/pollirigi/carpedia)";
const WIDTH = 1024;

const models = JSON.parse(fs.readFileSync(MODELS, "utf8"));
const brands = JSON.parse(fs.readFileSync(BRANDS, "utf8"));
const brandName = Object.fromEntries(brands.map((b) => [b.id, b.name]));

const BRAND_ALIASES = {
  porsche: "porsche",
  lotus: "lotus",
  "alfa-romeo": "alfa",
  ferrari: "ferrari|dino",
  bmw: "bmw",
  "mercedes-benz": "mercedes|benz|amg",
  toyota: "toyota",
  volkswagen: "volkswagen|vw",
  chevrolet: "chevrolet|chevy",
  saab: "saab|nevs",
  delorean: "delorean|dmc"
};

const norm = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/_/g, " ")
    .toLowerCase();

const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Nunca aceptar: logos, dibujos, interiores puros, motores, folletos…
const BAD = /\.svg|logo|badge|emblem|wordmark|flag |drawing|sketch|brochure|advertis|scale model|toy |lego|diecast|interior|dashboard|instrument|\bengine\b|motorraum|innenraum|armaturen|gauge|speedometer|seat[s ]|trunk|boot[ .]|underside|chassis only/;
// Penalizaciones suaves para elegir la mejor foto (traseras, detalles).
const MEH = /rear|back view|heck|detail|wheel|rim|tail ?light|headlight|door|mirror|crash|wreck|rust|abandoned/;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(params) {
  const url = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({
    action: "query", format: "json", formatversion: "2", origin: "*", ...params
  });
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (res.ok) return await res.json();
      if (res.status === 404) return null;
    } catch { /* red: reintentar */ }
    await sleep(1200 * attempt);
  }
  return null;
}

// Busca archivos (ns 6) con título+categorías+URL en una sola llamada.
async function searchFiles(query) {
  const data = await api({
    generator: "search",
    gsrnamespace: "6",
    gsrlimit: "12",
    gsrsearch: query + " filetype:bitmap",
    prop: "imageinfo|categories",
    iiprop: "url|mime|size",
    iiurlwidth: String(WIDTH),
    clshow: "!hidden",
    cllimit: "100"
  });
  return data?.query?.pages ?? [];
}

// Fallback final: buscar CATEGORÍAS de Commons que matcheen la consulta y
// listar sus archivos (con sus categorías, para la misma verificación).
async function categoryFiles(query) {
  const cats = await api({ list: "search", srnamespace: "14", srlimit: "4", srsearch: query });
  const out = [];
  for (const c of cats?.query?.search ?? []) {
    const data = await api({
      generator: "categorymembers",
      gcmtitle: c.title,
      gcmtype: "file",
      gcmlimit: "15",
      prop: "imageinfo|categories",
      iiprop: "url|mime|size",
      iiurlwidth: String(WIDTH),
      clshow: "!hidden",
      cllimit: "100"
    });
    out.push(...(data?.query?.pages ?? []));
    if (out.length >= 15) break;
  }
  return out;
}

// groups: lista de regex; TODAS deben matchear el título+categorías.
// avoid: regex penalizado (p. ej. versiones deportivas al buscar la estándar).
function pickVerified(pages, groups, exclude, avoid) {
  const res = groups.map((g) => new RegExp(g, "i"));
  const exc = exclude?.length ? new RegExp(exclude.join("|"), "i") : null;
  const av = avoid ? new RegExp(avoid, "i") : null;
  let best = null;
  let bestScore = -Infinity;
  for (const p of pages) {
    const info = p.imageinfo?.[0];
    if (!info?.thumburl) continue;
    if (!/^image\/(jpe?g|png|webp)$/i.test(info.mime || "")) continue;
    const titleHay = norm(p.title);
    const hay = titleHay + " | " + norm((p.categories || []).map((c) => c.title).join(" | "));
    if (BAD.test(hay)) continue;
    if (!res.every((r) => r.test(hay))) continue;
    // La exclusión de generaciones hermanas se aplica SOLO al título: en las
    // categorías Commons agrupa familias enteras (un 512 TR cuelga de la
    // categoría Testarossa) y excluiría archivos correctos.
    if (exc && exc.test(titleHay)) continue;
    let score = 0;
    if (MEH.test(hay)) score -= 2;
    if (av && av.test(hay)) score -= 3;
    if ((info.width || 0) >= 1000) score += 1;
    if (/^file:\d{4} /.test(norm(p.title))) score += 1; // "File:1995 …" suele ser foto de auto completa
    if (score > bestScore) {
      bestScore = score;
      best = p;
    }
  }
  if (!best) return null;
  return {
    src: best.imageinfo[0].thumburl,
    page: "https://commons.wikimedia.org/wiki/" + encodeURIComponent(best.title.replace(/ /g, "_"))
  };
}

// Igual que pickVerified pero devuelve varias imágenes distintas (galería).
function pickVerifiedMany(pages, groups, exclude, max) {
  const out = [];
  const seen = new Set();
  let pool = [...pages];
  while (out.length < max && pool.length) {
    const hit = pickVerified(pool, groups, exclude);
    if (!hit) break;
    if (!seen.has(hit.src)) {
      seen.add(hit.src);
      out.push(hit);
    }
    pool = pool.filter((p) => p.imageinfo?.[0]?.thumburl !== hit.src);
  }
  return out;
}

// Aliases del modelo (para verificar que la foto sea de ESTE modelo).
function modelGroups(m) {
  if (m.searchAliases) return m.searchAliases;
  const base = (m.searchBase || `${brandName[m.brandId]} ${m.name}`)
    .replace(/["“”]/g, "")
    .replace(/\s*\([^)]*\)/g, "")
    .split("/")[0]
    .trim();
  const brandRe = new RegExp("^(" + (BRAND_ALIASES[m.brandId] || "") + ")\\s+", "i");
  const phrase = norm(base.replace(brandRe, "")).trim();
  if (!phrase) return [];
  return [escRe(phrase).replace(/\s+/g, "[\\s_-]+")];
}

const brandGroup = (m) => BRAND_ALIASES[m.brandId] || norm(brandName[m.brandId] || "");

const report = [];
const queue = [];

// ONLY=bmw-3-series,vw-golf node tools/fetch-commons.mjs  → prueba parcial
const only = process.env.ONLY ? new Set(process.env.ONLY.split(",")) : null;

// ---------- armar la cola de trabajos ----------
for (const m of models) {
  if (only && !only.has(m.id)) continue;
  const bG = brandGroup(m);
  const mG = modelGroups(m);
  const base = m.searchBase || `${brandName[m.brandId]} ${String(m.name).replace(/["“”]/g, "").replace(/\s*\([^)]*\)/g, "").split("/")[0].trim()}`;

  const curated = m.generations.some((g) => g.q);

  const baseToks = new Set(norm(base).split(/\s+/).filter(Boolean));

  for (const g of m.generations) {
    // Exclusión: tokens de las generaciones hermanas que no comparte esta.
    // Nunca excluir tokens del propio nombre del modelo/marca ("porsche",
    // "928"…), y siempre con límites de palabra ("430" no debe matar "F430").
    const sibTokens = m.generations
      .filter((x) => x !== g)
      .flatMap((x) => x.genTokens || [])
      .filter(
        (t) =>
          !(g.genTokens || []).includes(t) &&
          t.length >= 3 &&
          !baseToks.has(t.replace(/\\b|\\/g, ""))
      )
      .map((t) => "\\b" + t + "\\b");

    // Al buscar la generación estándar, penalizar las versiones deportivas.
    const sportAvoid = [
      ...(g.sport || []).flatMap((s) => s.al || []),
      "gti|r32|vr6 swap|quadrifoglio|z06|zl1|\\bm[2-8]\\b|amg|\\bgr\\b|viggen|\\baero\\b|turbo"
    ].join("|");

    // Consultas de fallback: se relaja la BÚSQUEDA (nunca la verificación)
    // sacando términos, porque el buscador de Commons usa AND entre palabras.
    const dropLast = (q) => {
      const w = q.trim().split(/\s+/);
      return w.length > 2 ? w.slice(0, -1).join(" ") : null;
    };

    if (g.q && g.image === null) {
      queue.push({
        kind: "gen", model: m, gen: g,
        qs: [g.q, dropLast(g.q)].filter(Boolean),
        groups: [bG, ...(g.al || [])], exclude: [], avoid: sportAvoid,
        label: `${m.id} · ${g.code}`
      });
    } else if (!g.q && g.genTokens && g.image === null) {
      const clean = (t) => t.replace(/\\b|\\/g, "");
      const toks = g.genTokens.map(clean);
      // Con una sola generación, el modelo ES la generación: verificar
      // marca+modelo alcanza y los tokens del código solo meten ruido.
      const single = m.generations.length === 1;
      queue.push({
        kind: "gen", model: m, gen: g,
        qs: [...new Set([`${base} ${toks.slice(0, 2).join(" ")}`, ...toks.map((t) => `${base} ${t}`), base])],
        groups: single ? [bG, ...mG] : [bG, ...mG, "(" + g.genTokens.join("|") + ")"],
        exclude: single ? [] : sibTokens, label: `${m.id} · ${g.code}`
      });
    }

    // Tokens del modelo, para no dejar que satisfagan el discriminador de gen.
    const modelToks = new Set(norm(base).split(/\s+/).filter(Boolean));

    for (const sv of g.sport || []) {
      if (sv.image !== null) continue;
      // Discriminador de generación: alias del padre O tokens del propio q que
      // NO sean ni la marca, ni el modelo, ni el nombre de la versión (si no,
      // un "M3" de otra generación pasaría la verificación).
      const svAl = (sv.al || []).map((a) => new RegExp(a, "i"));
      const qToks = norm(sv.q)
        .split(/\s+/)
        .filter((t) =>
          t.length >= 2 &&
          !new RegExp("^(" + bG + ")$", "i").test(t) &&
          !modelToks.has(t) &&
          !svAl.some((r) => r.test(t))
        )
        .map(escRe);
      const genDisc = [...(g.al || []), ...qToks].join("|");
      queue.push({
        kind: "sport", model: m, gen: g, sport: sv,
        qs: [sv.q, dropLast(sv.q)].filter(Boolean),
        groups: [bG, ...(sv.al || []), ...(genDisc ? [genDisc] : [])],
        exclude: [], label: `${m.id} · ${g.code} · ${sv.name}`
      });
    }
  }

  // Galería a nivel modelo (para la card y el carrusel).
  if (!m.images || !m.images.length) {
    queue.push({
      kind: "gallery", model: m, qs: [base],
      groups: [bG, ...mG], exclude: [], curated, label: `${m.id} · galería`
    });
  }
}

console.log(`Trabajos en cola: ${queue.length}`);

// ---------- workers ----------
let done = 0;
async function worker() {
  while (queue.length) {
    const job = queue.shift();
    const qs = job.qs || [job.q];
    try {
      if (job.kind === "gallery") {
        let hits = [];
        for (const q of qs) {
          hits = pickVerifiedMany(await searchFiles(q), job.groups, job.exclude, 4);
          if (hits.length) break;
        }
        if (!hits.length) hits = pickVerifiedMany(await categoryFiles(qs[qs.length - 1]), job.groups, job.exclude, 4);
        if (hits.length) {
          job.model.images = hits.map((h) => h.src);
          job.model.imageSource = hits[0].page;
          report.push({ label: job.label, status: "ok", n: hits.length });
        } else {
          job.model.images = [];
          report.push({ label: job.label, status: "SIN IMAGEN", q: qs[0] });
        }
      } else {
        let hit = null;
        for (const q of qs) {
          hit = pickVerified(await searchFiles(q), job.groups, job.exclude, job.avoid);
          if (hit) break;
        }
        if (!hit) hit = pickVerified(await categoryFiles(qs[qs.length - 1]), job.groups, job.exclude, job.avoid);
        const target = job.kind === "sport" ? job.sport : job.gen;
        if (hit) {
          target.image = hit.src;
          target.imageSource = hit.page;
          report.push({ label: job.label, status: "ok" });
        } else {
          report.push({ label: job.label, status: "SIN IMAGEN", q: qs[0] });
        }
      }
    } catch (e) {
      report.push({ label: job.label, status: "ERROR", err: String(e).slice(0, 120) });
    }
    done++;
    if (done % 50 === 0) console.log(`  … ${done} trabajos listos`);
    await sleep(120);
  }
}
await Promise.all(Array.from({ length: 3 }, worker));

// La galería de los modelos curados privilegia las fotos por generación.
for (const m of models) {
  const genImgs = m.generations.flatMap((g) => [g.image, ...g.sport.map((s) => s.image)]).filter(Boolean);
  if (genImgs.length) {
    const merged = [...new Set([...genImgs, ...(m.images || [])])].slice(0, 6);
    m.images = merged;
    if (!m.imageSource) {
      const g0 = m.generations.find((g) => g.imageSource);
      if (g0) m.imageSource = g0.imageSource;
    }
  }
}

fs.writeFileSync(MODELS, JSON.stringify(models, null, 2) + "\n");
fs.writeFileSync(REPORT, JSON.stringify(report, null, 2) + "\n");

const ok = report.filter((r) => r.status === "ok").length;
const miss = report.filter((r) => r.status === "SIN IMAGEN");
const err = report.filter((r) => r.status === "ERROR");
console.log(`\nOK: ${ok} · sin imagen: ${miss.length} · errores: ${err.length}`);
for (const r of miss) console.log("  MISS:", r.label);
for (const r of err) console.log("  ERR :", r.label, r.err);
