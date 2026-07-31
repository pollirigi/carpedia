# 🏁 Carpedia — Enciclopedia visual de autos

Catálogo visual tipo "Pinterest de autos": marcas actuales y clásicas con su **lineup histórico completo de modelos**, fichas técnicas detalladas, guardados en un perfil local y comparador de dos modelos.

**100% estático** — sin backend, sin base de datos, sin build. Vanilla HTML/CSS/JS servido desde `docs/`, listo para GitHub Pages.

## Estructura

```
carpedia/
├── docs/                  ← raíz del sitio (lo que se publica)
│   ├── index.html
│   ├── css/styles.css
│   ├── js/app.js          ← router de hash, vistas, guardados, comparador
│   └── data/
│       ├── brands.json    ← marcas
│       └── models.json    ← modelos con ficha técnica
└── .github/workflows/deploy.yml  ← deploy automático a Pages en cada push a main
```

## Cómo correrlo local

Los JSON se cargan por `fetch`, así que hace falta un servidor (no funciona abriendo el archivo con `file://`):

```
cd docs
python -m http.server 8000
```

y abrir <http://localhost:8000>.

## Deploy a GitHub Pages (automático)

1. Creá un repo en GitHub y pusheá este proyecto a la rama `main`.
2. En el repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Listo: cada push a `main` dispara `.github/workflows/deploy.yml`, que valida los JSON y publica `docs/` en `https://<tu-usuario>.github.io/<repo>/`.

(Alternativa sin Action: Settings → Pages → Source: *Deploy from a branch* → `main` / `/docs`.)

## Cómo agregar marcas y modelos (sin tocar código)

Todo el catálogo vive en `docs/data/`. El home muestra **solo** las marcas presentes en `brands.json` — no hay marcas "próximamente".

### Nueva marca → `brands.json`

```json
{
  "id": "toyota",
  "name": "Toyota",
  "country": "Japón",
  "founded": 1937,
  "defunct": null,
  "category": "actual",
  "logo": "",
  "description": "…"
}
```

- `category`: `"actual"` o `"clasica"` (decide en qué sección del home aparece).
- `defunct`: año de cierre para marcas clásicas, `null` si sigue activa.
- `logo`: URL de imagen; si queda `""` se genera un monograma de color automático.

### Nuevo modelo → `models.json`

```json
{
  "id": "toyota-corolla",
  "brandId": "toyota",
  "name": "Corolla",
  "years": "1966–presente",
  "generations": [{ "code": "E10", "years": "1966–1970" }],
  "category": "sedán",
  "images": [],
  "specsVersion": "Corolla 1.8 (2020)",
  "specs": { "engine": { "powerCv": 140, "torqueNm": null, "…": "…" } },
  "trivia": "…",
  "dataNotes": "opcional: aclaraciones sobre datos no confirmados"
}
```

Reglas de datos:

- `brandId` tiene que coincidir con el `id` de la marca.
- **Dato no confirmado → `null`** (la UI muestra "sin dato confirmado"), nunca un número inventado. Usá `dataNotes` para aclarar.
- `images`: array de URLs; vacío ⇒ placeholder de gradiente con el nombre del modelo. La primera imagen es la principal.
- `specsVersion` indica de qué versión/año es la ficha (un modelo con 60 años de historia no tiene "una" potencia).

## Catálogo actual

| Marca | Categoría | Modelos |
|---|---|---|
| Porsche | actual | 18 (lineup completo de calle: 356, 550, 911, 912, 914, 924, 928, 944, 959, 968, Boxster, Cayman, Carrera GT, Cayenne, Macan, Panamera, 918 Spyder, Taycan) |
| Lotus | actual | 18 (del Seven al Emeya, incl. Elite ×2, Elan, Elan +2, Europa, Eclat, Esprit, Excel, Elan M100, Elise, Exige, Europa S, Evora, Evija, Emira, Eletre) |
| Alfa Romeo | actual | 40 (de la RL de 1922 al Junior 2024: 6C, 8C, 1900, Giulietta ×3, Giulia clásica y moderna, coupés 105, Spider, Montreal, Alfasud, Alfetta, GTV6, 33, Arna, 75, 164, SZ, 155, 156, 147, 159, Brera, 8C Competizione, 4C, Stelvio, Tonale…) |
| Ferrari | actual | 45 (del 166 Inter de 1948 al F80: familia 250, 275, Daytona, Dinos, Berlinetta Boxer, 308→F8, Testarossa, F40, F50, Enzo, LaFerrari, SF90, 296, Purosangue, 12Cilindri…) |
| Saab | clásica | 14 (92, 93, Sonett, 95, 96, 99, 90, 900, 9000, 9-5, 9-3, 9-2X, 9-7X, 9-4X) |
| DeLorean | clásica | 1 (DMC-12) |

Criterio: modelos de producción con nameplate propio (no cada trim ni variantes regionales; los derivados exclusivos de circuito, como el Lotus 2-Eleven, quedan fuera). Series ultralimitadas y one-offs también quedan fuera: Ferrari Icona (Monza SP1/SP2, Daytona SP3) y programas Speciale/one-off; Alfa 33 Stradale (1967 y 2023) y Disco Volante. Los Alfa anteriores a 1922 (24 HP, RM…) eran chasis carrozados artesanalmente y quedan pendientes. Próximas marcas sugeridas para llegar a 20-25: Lamborghini, Jaguar, Studebaker, Tucker, Packard, DeSoto, Lancia, Mazda…

## Guardados

El "perfil" usa `localStorage` (clave `carpedia:saved`): los guardados viven solo en el dispositivo/navegador donde se marcaron. El sitio lo aclara en el footer y en la página de guardados.
