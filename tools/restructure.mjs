// Reestructura docs/data/models.json al esquema por GENERACIÓN:
//   generations: [{ code, years, trims?, image, imageSource, q?, al?,
//                   sport: [{ name, image, imageSource, q?, al? }] }]
// - Los modelos presentes en GEN_MAP con "gens" reciben la lista curada.
// - El resto conserva sus generaciones, convertidas al nuevo esquema.
// - TODAS las imágenes actuales se eliminan (se vuelven a traer verificadas
//   desde la API de Wikimedia Commons con tools/fetch-commons.mjs).
//   node tools/restructure.mjs

import fs from "fs";
import { GEN_MAP } from "./gen-map.mjs";

const MODELS = "docs/data/models.json";
const models = JSON.parse(fs.readFileSync(MODELS, "utf8"));

// Palabras de códigos de generación que no sirven para verificar imágenes.
const STOP = new Set([
  "gen", "serie", "series", "unidades", "restyling", "coupé", "coupe", "cabrio",
  "roadster", "spider", "spyder", "berlina", "sedán", "sedan", "hatch", "solo",
  "producción", "produccion", "motor", "plataforma", "base", "era", "incl",
  "luego", "con", "las", "los", "del", "por", "hasta", "desde", "gran", "the"
]);

// Tokens útiles de un código de generación existente → aliases de verificación.
const tokensFromCode = (code) => {
  const clean = code.normalize("NFD").replace(/[̀-ͯ]/g, "");
  const toks = clean.split(/[\s/(),."«»""]+/).filter(Boolean);
  const out = [];
  for (const t of toks) {
    const low = t.toLowerCase();
    if (STOP.has(low) || low.length < 2) continue;
    if (/^\d{1,2}ª?$/.test(low)) continue;              // ordinales sueltos
    if (!/[a-z0-9]/.test(low)) continue;
    out.push(low.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  }
  return [...new Set(out)].slice(0, 4);
};

const SPORT_RE = /(gta\b|gto\b|turbodelta|pista|speciale|scuderia|challenge stradale|tdf|competizione|csl|batmobile|\bss\b|ss \d|z06|zl1|zr-?1|gt-four|quadrifoglio|evoluzione|viggen|\bm3\b|\bm5\b|2002 turbo|99 turbo|750 turbo)/i;

let curated = 0;
let converted = 0;

for (const m of models) {
  const map = GEN_MAP[m.id];

  // Limpieza total de imágenes (modelo y lo que hubiera).
  delete m.images;
  delete m.imageSource;

  if (map?.base) m.searchBase = map.base;
  if (map?.aliases) m.searchAliases = map.aliases;

  if (map?.gens) {
    m.generations = map.gens.map((g) => ({
      code: g.code,
      years: g.years,
      ...(g.trims ? { trims: g.trims } : {}),
      q: g.q,
      al: g.al,
      image: null,
      imageSource: null,
      sport: (g.sport || []).map((s) => ({
        name: s.name,
        q: s.q,
        al: s.al,
        image: null,
        imageSource: null
      }))
    }));
    curated++;
  } else {
    m.generations = (m.generations || []).map((g) => {
      const toks = tokensFromCode(g.code);
      return {
        code: g.code,
        years: g.years,
        ...(SPORT_RE.test(g.code) ? { tipo: "deportiva" } : {}),
        ...(toks.length ? { genTokens: toks } : {}),
        image: null,
        imageSource: null,
        sport: []
      };
    });
    converted++;
  }
}

fs.writeFileSync(MODELS, JSON.stringify(models, null, 2) + "\n");
const gens = models.reduce((n, m) => n + m.generations.length, 0);
const sports = models.reduce((n, m) => n + m.generations.reduce((k, g) => k + g.sport.length, 0), 0);
console.log(`Modelos: ${models.length} · curados: ${curated} · convertidos: ${converted}`);
console.log(`Generaciones totales: ${gens} · versiones deportivas: ${sports}`);
