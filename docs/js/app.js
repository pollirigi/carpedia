/* =========================================================================
   Carpedia — SPA estática con rutas de hash. Sin backend: los datos viven
   en docs/data/*.json y los guardados en localStorage de este navegador.
   ========================================================================= */

(() => {
  "use strict";

  const app = document.getElementById("app");
  const SAVED_KEY = "carpedia:saved";

  let brands = [];
  let models = [];

  // ---------- Utilidades ----------

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );

  const hashCode = (str) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    return Math.abs(h);
  };

  // Placeholder visual determinístico (gradiente por id) mientras no haya foto.
  const placeholderStyle = (id) => {
    const h = hashCode(id);
    const hue1 = h % 360;
    const hue2 = (hue1 + 40 + (h % 60)) % 360;
    return `background: linear-gradient(135deg, hsl(${hue1}, 45%, 26%), hsl(${hue2}, 55%, 16%));`;
  };

  const placeholderSize = (id) => ["ph-s", "ph-m", "ph-l"][hashCode(id + "sz") % 3];

  const brandById = (id) => brands.find((b) => b.id === id);
  const modelById = (id) => models.find((m) => m.id === id);
  const modelsOfBrand = (brandId) => models.filter((m) => m.brandId === brandId);

  // ---------- Guardados (localStorage) ----------

  const getSaved = () => {
    try {
      const raw = JSON.parse(localStorage.getItem(SAVED_KEY));
      return Array.isArray(raw) ? raw : [];
    } catch {
      return [];
    }
  };

  const isSaved = (id) => getSaved().includes(id);

  const toggleSaved = (id) => {
    const saved = getSaved();
    const i = saved.indexOf(id);
    if (i >= 0) saved.splice(i, 1);
    else saved.push(id);
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    updateSavedBadge();
  };

  const updateSavedBadge = () => {
    const badge = document.getElementById("saved-count");
    const n = getSaved().length;
    badge.hidden = n === 0;
    badge.textContent = n;
  };

  // ---------- Componentes ----------

  const brandLogoHtml = (brand, cls = "brand-logo") => {
    if (brand.logo) return `<div class="${cls}"><img src="${esc(brand.logo)}" alt="Logo ${esc(brand.name)}"></div>`;
    const initials = brand.name.slice(0, 2).toUpperCase();
    return `<div class="${cls}" style="${placeholderStyle(brand.id)}">${esc(initials)}</div>`;
  };

  const saveButtonHtml = (modelId, inline = false) => {
    const saved = isSaved(modelId);
    return `<button class="save-btn ${inline ? "save-btn-inline" : ""} ${saved ? "saved" : ""}"
      data-save="${esc(modelId)}" aria-pressed="${saved}"
      title="${saved ? "Quitar de guardados" : "Guardar en mi perfil"}">
      ${saved ? "❤️" : "🤍"}${inline ? (saved ? " Guardado" : " Guardar") : ""}
    </button>`;
  };

  const modelCardHtml = (model) => {
    const brand = brandById(model.brandId);
    const img = model.images && model.images[0];
    const media = img
      ? `<div class="model-img has-photo" data-ph-name="${esc(model.name)}" data-ph-style="${placeholderStyle(model.id)}"><img src="${esc(img)}" alt="${esc(model.name)}" loading="lazy"></div>`
      : `<div class="model-img ${placeholderSize(model.id)}" style="${placeholderStyle(model.id)}">${esc(model.name)}</div>`;
    return `
      <article class="model-card">
        ${saveButtonHtml(model.id)}
        <a href="#/modelo/${esc(model.id)}">
          ${media}
          <div class="model-card-body">
            <h3>${esc(brand ? brand.name : "")} ${esc(model.name)}</h3>
            <div class="meta">${esc(model.years)}</div>
            <span class="chip">${esc(model.category)}</span>
          </div>
        </a>
      </article>`;
  };

  const specRow = (label, value, suffix = "") => {
    const has = value !== null && value !== undefined && value !== "";
    return `<div class="spec-row"><span class="k">${esc(label)}</span>
      <span class="v ${has ? "" : "na"}">${has ? esc(value) + esc(suffix) : "sin dato confirmado"}</span></div>`;
  };

  // ---------- Vistas ----------

  const viewHome = () => {
    const current = brands.filter((b) => b.category === "actual");
    const classic = brands.filter((b) => b.category === "clasica");

    const brandCards = (list) =>
      list
        .map(
          (b) => `
        <a class="brand-card" href="#/marca/${esc(b.id)}">
          ${brandLogoHtml(b)}
          <h3>${esc(b.name)}</h3>
          <p>${esc(b.country)} · ${esc(String(b.founded))}${b.defunct ? "–" + esc(String(b.defunct)) : ""}</p>
          <p>${modelsOfBrand(b.id).length} modelos</p>
        </a>`
        )
        .join("");

    app.innerHTML = `
      <h1 class="page-title">Explorá marcas y modelos</h1>
      <p class="page-subtitle">Catálogo curado con el lineup histórico completo de cada marca cargada. Se agregan marcas nuevas ampliando los JSON de datos, sin tocar código.</p>
      <input type="search" class="search" id="brand-search" placeholder="Buscar marca… (ej. Porsche)" autocomplete="off">
      <div id="brand-sections">
        <h2 class="section-title">Autos actuales</h2>
        <div class="brand-grid" data-section="actual">${brandCards(current)}</div>
        <h2 class="section-title">Autos clásicos</h2>
        <div class="brand-grid" data-section="clasica">${brandCards(classic)}</div>
      </div>`;

    document.getElementById("brand-search").addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      document.querySelectorAll(".brand-card").forEach((card) => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = name.includes(q) ? "" : "none";
      });
    });
  };

  const viewBrand = (brandId) => {
    const brand = brandById(brandId);
    if (!brand) return viewNotFound(`No existe la marca "${brandId}" en el catálogo.`);
    const list = modelsOfBrand(brandId);

    app.innerHTML = `
      <a class="back-link" href="#/">← Todas las marcas</a>
      <header class="brand-header">
        ${brandLogoHtml(brand)}
        <div class="info">
          <h1>${esc(brand.name)}</h1>
          <p class="facts">${esc(brand.country)} · Fundada en ${esc(String(brand.founded))}${
            brand.defunct ? ` · Cesó en ${esc(String(brand.defunct))}` : " · En actividad"
          } · ${list.length} modelos en el catálogo</p>
          <p class="desc">${esc(brand.description)}</p>
        </div>
      </header>
      <div class="masonry">${list.map(modelCardHtml).join("")}</div>`;
  };

  const viewModel = (modelId) => {
    const model = modelById(modelId);
    if (!model) return viewNotFound(`No existe el modelo "${modelId}" en el catálogo.`);
    const brand = brandById(model.brandId);
    const s = model.specs || {};
    const eng = s.engine || {};
    const tr = s.transmission || {};
    const susp = s.suspension || {};
    const perf = s.performance || {};
    const dim = s.dimensions || {};
    const img = model.images && model.images[0];

    const hero = img
      ? `<div class="detail-hero" data-ph-style="${placeholderStyle(model.id)}"><img src="${esc(img)}" alt="${esc(model.name)}">`
      : `<div class="detail-hero" style="${placeholderStyle(model.id)}">`;

    const credit = img && model.imageSource
      ? `<p class="img-credit">Foto: <a href="${esc(model.imageSource)}" target="_blank" rel="noopener">Wikipedia / Wikimedia Commons</a> (la licencia de cada imagen figura en la página de origen)</p>`
      : "";

    app.innerHTML = `
      <div class="detail">
        <a class="back-link" href="#/marca/${esc(model.brandId)}">← ${esc(brand ? brand.name : "Marca")}</a>
        ${hero}
          <div class="hero-text">
            <h1>${esc(brand ? brand.name : "")} ${esc(model.name)}</h1>
            <p>${esc(model.years)} · ${esc(model.category)}</p>
          </div>
        </div>
        ${credit}
        <div class="detail-actions">
          ${saveButtonHtml(model.id, true)}
          <a class="btn" href="#/comparar?a=${esc(model.id)}">⚖️ Comparar este modelo</a>
        </div>
        ${model.specsVersion ? `<p class="specs-version-note">Ficha técnica de referencia: <strong>${esc(model.specsVersion)}</strong> (otras versiones/generaciones varían).</p>` : ""}
        <div class="spec-grid">
          <section class="spec-card">
            <h3>🔧 Motor</h3>
            ${specRow("Tipo", eng.type)}
            ${specRow("Cilindrada", eng.displacement)}
            ${specRow("Cilindros", eng.cylinders)}
            ${specRow("Configuración", eng.configuration)}
            ${specRow("Aspiración", eng.aspiration)}
            ${specRow("Potencia", eng.powerCv, " CV")}
            ${specRow("Torque", eng.torqueNm, " Nm")}
          </section>
          <section class="spec-card">
            <h3>⚙️ Transmisión y tracción</h3>
            ${specRow("Caja", tr.gearbox)}
            ${specRow("Marchas", tr.gears)}
            ${specRow("Tracción", s.drivetrain)}
          </section>
          <section class="spec-card">
            <h3>🛞 Suspensión y frenos</h3>
            ${specRow("Susp. delantera", susp.front)}
            ${specRow("Susp. trasera", susp.rear)}
            ${specRow("Frenos", s.brakes)}
          </section>
          <section class="spec-card">
            <h3>⏱️ Prestaciones</h3>
            ${specRow("0–100 km/h", perf.zeroTo100, " s")}
            ${specRow("Velocidad máxima", perf.topSpeed, " km/h")}
            ${specRow("Consumo", perf.consumption)}
          </section>
          <section class="spec-card">
            <h3>📐 Dimensiones y peso</h3>
            ${specRow("Largo", dim.length, " mm")}
            ${specRow("Ancho", dim.width, " mm")}
            ${specRow("Alto", dim.height, " mm")}
            ${specRow("Distancia entre ejes", dim.wheelbase, " mm")}
            ${specRow("Peso", dim.weight, " kg")}
          </section>
          <section class="spec-card">
            <h3>📅 Generaciones</h3>
            <ul class="gen-list">
              ${(model.generations || [])
                .map((g) => `<li><span>${esc(g.code)}</span><span class="years">${esc(g.years)}</span></li>`)
                .join("")}
            </ul>
          </section>
          ${model.trivia ? `<section class="spec-card wide trivia-card"><h3>💡 Dato curioso</h3><p>${esc(model.trivia)}</p></section>` : ""}
        </div>
        ${model.dataNotes ? `<p class="data-note">Nota sobre los datos: ${esc(model.dataNotes)}</p>` : ""}
      </div>`;
  };

  const viewSaved = () => {
    const savedModels = getSaved().map(modelById).filter(Boolean);
    app.innerHTML = `
      <h1 class="page-title">❤️ Tus guardados</h1>
      <p class="page-subtitle">Se guardan en el localStorage de este dispositivo/navegador — no hay cuentas ni sincronización.</p>
      ${
        savedModels.length
          ? `<div class="masonry">${savedModels.map(modelCardHtml).join("")}</div>`
          : `<div class="empty">Todavía no guardaste ningún modelo. Tocá el 🤍 en cualquier card para empezar tu colección.</div>`
      }`;
  };

  // ---------- Comparador ----------

  const COMPARE_METRICS = [
    { key: "power", label: "Potencia", get: (m) => m.specs?.engine?.powerCv, fmt: (v) => `${v} CV`, better: "high" },
    { key: "torque", label: "Torque", get: (m) => m.specs?.engine?.torqueNm, fmt: (v) => `${v} Nm`, better: "high" },
    { key: "accel", label: "0–100 km/h", get: (m) => m.specs?.performance?.zeroTo100, fmt: (v) => `${v} s`, better: "low" },
    { key: "vmax", label: "Velocidad máxima", get: (m) => m.specs?.performance?.topSpeed, fmt: (v) => `${v} km/h`, better: "high" },
    { key: "weight", label: "Peso", get: (m) => m.specs?.dimensions?.weight, fmt: (v) => `${v} kg`, better: "low" },
    { key: "category", label: "Categoría", get: (m) => m.category, fmt: (v) => v, better: null },
    { key: "drivetrain", label: "Tracción", get: (m) => m.specs?.drivetrain, fmt: (v) => v, better: null },
    { key: "engine", label: "Motor", get: (m) => m.specs?.engine?.type, fmt: (v) => v, better: null }
  ];

  const modelOptionsHtml = (selectedId) =>
    brands
      .map((b) => {
        const opts = modelsOfBrand(b.id)
          .map(
            (m) =>
              `<option value="${esc(m.id)}" ${m.id === selectedId ? "selected" : ""}>${esc(b.name)} ${esc(m.name)}</option>`
          )
          .join("");
        return `<optgroup label="${esc(b.name)}">${opts}</optgroup>`;
      })
      .join("");

  const compareTableHtml = (a, b) => {
    const nameOf = (m) => `${brandById(m.brandId)?.name ?? ""} ${m.name}`;
    const rows = COMPARE_METRICS.map((metric) => {
      const va = metric.get(a);
      const vb = metric.get(b);
      let winA = false;
      let winB = false;
      if (metric.better && va != null && vb != null && va !== vb) {
        const aWins = metric.better === "high" ? va > vb : va < vb;
        winA = aWins;
        winB = !aWins;
      }
      const cell = (v, win) =>
        `<td class="${win ? "winner" : ""}">${v != null && v !== "" ? esc(metric.fmt(v)) : "<span class='na'>—</span>"}</td>`;
      return `<tr>${cell(va, winA)}<td class="metric">${esc(metric.label)}</td>${cell(vb, winB)}</tr>`;
    }).join("");

    return `
      <div class="compare-table-wrap">
        <table class="compare-table">
          <thead><tr>
            <th><a href="#/modelo/${esc(a.id)}">${esc(nameOf(a))}</a></th>
            <th>vs.</th>
            <th><a href="#/modelo/${esc(b.id)}">${esc(nameOf(b))}</a></th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <p class="notice" style="margin-top:1rem">🏆 marca la mejor cifra de cada métrica comparable. Las fichas corresponden a la versión de referencia de cada modelo.</p>`;
  };

  const viewCompare = (params) => {
    const idA = params.get("a") || "";
    const idB = params.get("b") || "";

    app.innerHTML = `
      <h1 class="page-title">⚖️ Comparador</h1>
      <p class="page-subtitle">Elegí dos modelos de cualquier marca y compará sus cifras clave lado a lado.</p>
      <div class="compare-pickers">
        <select id="cmp-a">
          <option value="">— Elegí el primer modelo —</option>
          ${modelOptionsHtml(idA)}
        </select>
        <select id="cmp-b">
          <option value="">— Elegí el segundo modelo —</option>
          ${modelOptionsHtml(idB)}
        </select>
      </div>
      <div id="cmp-result">
        <div class="empty">Seleccioná dos modelos para ver la comparación.</div>
      </div>`;

    const selA = document.getElementById("cmp-a");
    const selB = document.getElementById("cmp-b");
    const result = document.getElementById("cmp-result");

    const render = () => {
      const a = modelById(selA.value);
      const b = modelById(selB.value);
      // Actualiza el hash sin re-navegar, para que la comparación sea compartible.
      const qs = new URLSearchParams();
      if (selA.value) qs.set("a", selA.value);
      if (selB.value) qs.set("b", selB.value);
      history.replaceState(null, "", `#/comparar${qs.toString() ? "?" + qs : ""}`);
      if (a && b) result.innerHTML = compareTableHtml(a, b);
      else result.innerHTML = `<div class="empty">Seleccioná dos modelos para ver la comparación.</div>`;
    };

    selA.addEventListener("change", render);
    selB.addEventListener("change", render);
    render();
  };

  const viewNotFound = (msg) => {
    app.innerHTML = `
      <div class="empty">
        <p>${esc(msg || "Página no encontrada.")}</p>
        <p style="margin-top:0.8rem"><a class="btn" href="#/">Volver al inicio</a></p>
      </div>`;
  };

  // ---------- Router ----------

  const router = () => {
    const raw = location.hash.replace(/^#\/?/, "");
    const [pathPart, queryPart] = raw.split("?");
    const segments = pathPart.split("/").filter(Boolean);
    const params = new URLSearchParams(queryPart || "");

    let active = "home";
    if (segments.length === 0) viewHome();
    else if (segments[0] === "marca" && segments[1]) viewBrand(decodeURIComponent(segments[1]));
    else if (segments[0] === "modelo" && segments[1]) viewModel(decodeURIComponent(segments[1]));
    else if (segments[0] === "guardados") (active = "guardados"), viewSaved();
    else if (segments[0] === "comparar") (active = "comparar"), viewCompare(params);
    else viewNotFound();

    document.querySelectorAll(".nav a").forEach((a) => a.classList.toggle("active", a.dataset.nav === active));
    window.scrollTo({ top: 0 });
  };

  // Si una imagen remota falla (404, hotlink caído), vuelve al placeholder.
  document.addEventListener(
    "error",
    (e) => {
      const img = e.target;
      if (!(img instanceof HTMLImageElement)) return;
      const wrap = img.closest(".model-img, .detail-hero");
      if (!wrap) return;
      img.remove();
      wrap.style.cssText = wrap.dataset.phStyle || "";
      if (wrap.classList.contains("model-img")) {
        wrap.classList.remove("has-photo");
        wrap.classList.add("ph-m");
        wrap.textContent = wrap.dataset.phName || "";
      }
    },
    true
  );

  // Delegación global del botón guardar (cards y detalle).
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-save]");
    if (!btn) return;
    e.preventDefault();
    const id = btn.dataset.save;
    toggleSaved(id);
    const saved = isSaved(id);
    btn.classList.toggle("saved", saved);
    btn.setAttribute("aria-pressed", saved);
    btn.title = saved ? "Quitar de guardados" : "Guardar en mi perfil";
    const inline = btn.classList.contains("save-btn-inline");
    btn.innerHTML = (saved ? "❤️" : "🤍") + (inline ? (saved ? " Guardado" : " Guardar") : "");
    // En la vista de guardados, sacar un modelo lo quita de la grilla al instante.
    if (location.hash.startsWith("#/guardados")) router();
  });

  // ---------- Arranque ----------

  const init = async () => {
    try {
      const [bRes, mRes] = await Promise.all([fetch("data/brands.json"), fetch("data/models.json")]);
      if (!bRes.ok || !mRes.ok) throw new Error("No se pudieron cargar los JSON de datos");
      brands = await bRes.json();
      models = await mRes.json();
    } catch (err) {
      app.innerHTML = `<div class="empty">Error cargando el catálogo: ${esc(err.message)}.<br>
        Si abriste el archivo directamente (file://), serví la carpeta con un servidor local, p. ej. <code>python -m http.server</code> dentro de <code>docs/</code>.</div>`;
      return;
    }
    updateSavedBadge();
    router();
    window.addEventListener("hashchange", router);
  };

  init();
})();
