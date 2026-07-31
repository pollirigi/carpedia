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

| Marca | Categoría | Modelos | Cobertura |
|---|---|---|---|
| Porsche | actual | 18 | Lineup completo de calle |
| Lotus | actual | 18 | Lineup completo de calle |
| Alfa Romeo | actual | 40 | Lineup completo (post-1922) |
| Ferrari | actual | 45 | Lineup completo de producción |
| BMW | actual | 31 | Nameplates principales (primera pasada) |
| Mercedes-Benz | actual | 31 | Nameplates principales (primera pasada) |
| Toyota | actual | 33 | Nameplates globales principales (primera pasada) |
| Volkswagen | actual | 29 | Nameplates principales (primera pasada) |
| Chevrolet | actual | 34 | Nameplates principales (primera pasada) |
| Saab | clásica | 14 | Lineup completo |
| DeLorean | clásica | 1 | Lineup completo |

**Total: 11 marcas, 294 modelos.**

Criterio: modelos de producción con nameplate propio (no cada trim ni variantes regionales; los derivados exclusivos de circuito, como el Lotus 2-Eleven, quedan fuera). Series ultralimitadas y one-offs también quedan fuera: Ferrari Icona (Monza SP1/SP2, Daytona SP3); Alfa 33 Stradale (1967 y 2023) y Disco Volante; los Alfa pre-1922 carrozados artesanalmente.

Para las marcas gigantes (BMW, Mercedes, Toyota, VW, Chevrolet) esta es una **primera pasada** con los nameplates principales de su historia global; faltan modelos regionales o menores (p. ej. BMW 600 y X2/X4; Mercedes CLK/CL/Clase V; Toyota Carina/Cressida/Soarer/Sequoia; VW Derby/Bora regionales; Chevrolet Corsica/Beretta/Uplander…). Completar esos huecos es tan simple como agregar entradas a `models.json` y correr `node tools/fetch-images.mjs`.

Próximas marcas sugeridas: Ford, Honda, Nissan, Audi, Lamborghini, Jaguar, Fiat, Peugeot, Renault; y clásicas como Studebaker, Packard, Tucker, DeSoto, Lancia.

## Imágenes

Cada modelo muestra la imagen principal de su artículo de Wikipedia (en inglés), hotlinkeada desde **Wikimedia Commons**:

- `images[0]`: URL del thumbnail (1200 px) en `upload.wikimedia.org`.
- `imageSource`: artículo o página de Commons de origen — el detalle de cada modelo la enlaza como crédito. Las licencias varían por imagen (CC BY-SA, dominio público, etc.) y figuran en esa página.
- Si una imagen remota falla, la UI cae automáticamente al placeholder de gradiente.

Para poblar imágenes de modelos nuevos (solo procesa los que no tienen):

```
node tools/fetch-images.mjs
```

El script intenta, en orden: el campo `wiki` del modelo, un mapa de títulos especiales (`OVERRIDES`), variantes de "Marca Nombre", y como último recurso una búsqueda de archivos en Commons. Para forzar otro título, agregá `"wiki": "Título exacto del artículo"` a la entrada del modelo. También podés pegar cualquier URL de imagen a mano en `images` — el script no la pisa.

## Guardados

El "perfil" usa `localStorage` (clave `carpedia:saved`): los guardados viven solo en el dispositivo/navegador donde se marcaron. El sitio lo aclara en el footer y en la página de guardados.
