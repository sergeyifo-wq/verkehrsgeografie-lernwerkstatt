/* Visual-Baukasten: Karten, Diagramme, Schaubilder.
   Alles wird als HTML/SVG-String erzeugt und nutzt nur --v-*-Farbvariablen,
   damit dieselben Bausteine in Lernseite (hell/dunkel) und Filmbühne funktionieren.
   data-s="n" markiert Elemente, die im Film erst beim n-ten Satz erscheinen. */
(function () {
  const V = (window.V = {});
  const esc = (V.esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])));
  const S = (V.S = (n) => (n == null ? "" : ` data-s="${n}"`));
  const fmt = (V.fmt = (n, d = 0) => Number(n).toLocaleString("de-AT", { minimumFractionDigits: d, maximumFractionDigits: d }));
  /* einfache Silbentrennung für lange deutsche Wörter (weiches Trennzeichen), damit schmale Karten nicht überlaufen */
  const ONSETS = new Set(["b","c","d","f","g","h","j","k","l","m","n","p","r","s","t","v","w","x","z","ß","bl","br","dr","fl","fr","gl","gr","kl","kn","kr","pf","pl","pr","sch","schl","schm","schn","schr","schw","sp","spr","st","str","tr","zw","ch","ph","qu","th","sk","sl"]);
  const VOW = /[aeiouäöüy]/i;
  const HYX = { umweltauflagen: "Umwelt-auflagen", direktinvestitionen: "Direkt-investitionen", wertschöpfungsketten: "Wert-schöpfungs-ketten", supercontainerschiffe: "Super-container-schiffe", weltwirtschaftskrise: "Welt-wirtschafts-krise", industrieproduktion: "Industrie-produktion", transportkosten: "Transport-kosten", hochgeschwindigkeitsnetz: "Hoch-geschwindigkeits-netz", investitionsquote: "Investitions-quote", verkehrsinfrastruktur: "Verkehrs-infrastruktur", kontrollkapazitäten: "Kontroll-kapazitäten", umweltbelastung: "Umwelt-belastung", fachkräftemangel: "Fachkräfte-mangel", schiffskapazität: "Schiffs-kapazität", ressourcenverbrauch: "Ressourcen-verbrauch", dienstleistungsbeschäftigte: "Dienstleistungs-beschäftigte", standortfaktoren: "Standort-faktoren", verteidigungspolitik: "Verteidigungs-politik", marktorientierte: "markt-orientierte", konsummuster: "Konsum-muster", arbeitsorganisation: "Arbeits-organisation", gesellschaftlichen: "gesellschaft-lichen", individualisierung: "Individuali-sierung", produktivität: "Produktivi-tät", kooperationsabkommen: "Kooperations-abkommen", schuldenfalle: "Schulden-falle" };
  const hy = (V.hy = (w) => {
    const ex = HYX[w.toLowerCase()];
    if (ex) return (w[0] + ex.slice(1)).replace(/-/g, "­");
    if (w.length < 12 || /[^A-Za-zÄÖÜäöüß]/.test(w)) return w;
    const out = [];
    let i = 0, last = 0;
    const L = w.length;
    while (i < L) {
      if (VOW.test(w[i])) {
        let j = i + 1;
        while (j < L && VOW.test(w[j])) j++;
        let k = j;
        while (k < L && !VOW.test(w[k])) k++;
        if (k < L && k > j) {
          const cons = w.slice(j, k).toLowerCase();
          let cut = k - 1;
          for (let n = Math.min(4, cons.length); n >= 1; n--) { const on = cons.slice(cons.length - n); if (ONSETS.has(on) && !(on[0] === "s" && !on.startsWith("sch") && n > 1 && cons[cons.length - n - 1] === "g")) { cut = k - n; break; } }
          if (cons.length === 1) cut = j;
          if (cut - last >= 4 && L - cut >= 4) { out.push(w.slice(last, cut)); last = cut; }
        }
        i = k;
      } else i++;
    }
    out.push(w.slice(last));
    return out.join("­");
  });
  const inl = (s) => esc(s).replace(/[A-Za-zÄÖÜäöüß]{12,}/g, hy).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  V.inl = inl;

  /* ---------- HTML-Bausteine ---------- */
  V.cards = (items, o = {}) =>
    `<div class="vz-cards" style="--cols:${o.cols || Math.min(items.length, 3)}">` +
    items
      .map(
        (it, i) =>
          `<div class="vz-card ${it.tone || ""}"${S(it.s)}>${it.k ? `<span class="vz-k">${esc(it.k)}</span>` : ""}<b>${inl(it.h)}</b>${it.p ? `<small>${inl(it.p)}</small>` : ""}</div>`
      )
      .join("") +
    `</div>`;

  V.flow = (items, o = {}) =>
    `<div class="vz-flow ${o.col ? "col" : ""}">` +
    items
      .map(
        (it, i) =>
          (i ? `<span class="vz-arrow"${S(it.s)}>${o.arrow || "→"}</span>` : "") +
          `<div class="vz-card ${it.tone || ""}"${S(it.s)}>${it.k ? `<span class="vz-k">${esc(it.k)}</span>` : ""}<b>${inl(it.h)}</b>${it.p ? `<small>${inl(it.p)}</small>` : ""}</div>`
      )
      .join("") +
    `</div>`;

  V.vs = (L, R, o = {}) =>
    `<div class="vz-vs">` +
    [L, R]
      .map(
        (c, i) =>
          `<div class="vz-col ${i ? "r" : "l"}"${S(c.s)}><h5>${inl(c.h)}</h5>${(c.items || [])
            .map((t, j) => `<div${S(c.ss ? c.ss[j] : null)}>${inl(t)}</div>`)
            .join("")}</div>` + (i === 0 ? `<div class="vz-vsmid"${S(o.s)}>${esc(o.mid || "vs.")}</div>` : "")
      )
      .join("") +
    `</div>`;

  V.big = (val, sub, o = {}) =>
    `<div class="vz-big"${S(o.s)}><div class="val ${o.long ? "long" : ""}">${inl(val)}</div>${sub ? `<div class="sub"${S(o.s2)}>${inl(sub)}</div>` : ""}</div>`;

  V.steps = (items, o = {}) =>
    `<ol class="vz-steps">${items.map((it) => `<li${S(it.s)}><b>${inl(it.h)}</b>${it.p ? ` <span>${inl(it.p)}</span>` : ""}</li>`).join("")}</ol>`;

  V.timeline = (items) =>
    `<div class="vz-tl">${items
      .map((it) => `<div class="vz-tli ${it.tone || ""}"${S(it.s)}><span class="y">${esc(it.y)}</span><b>${inl(it.h)}</b>${it.p ? `<small>${inl(it.p)}</small>` : ""}</div>`)
      .join("")}</div>`;

  V.table = (head, rows, o = {}) =>
    `<div class="vz-tbl"><table><thead><tr>${head.map((h) => `<th>${inl(h)}</th>`).join("")}</tr></thead><tbody>${rows
      .map((r, i) => `<tr${S(o.ss ? o.ss[i] : null)}>${r.map((c) => `<td>${inl(c)}</td>`).join("")}</tr>`)
      .join("")}</tbody></table></div>`;

  V.quote = (t, who, o = {}) => `<figure class="vz-quote"${S(o.s)}><blockquote>${inl(t)}</blockquote>${who ? `<figcaption>${esc(who)}</figcaption>` : ""}</figure>`;

  V.stack = (...parts) => `<div class="vz-stack">${parts.join("")}</div>`;
  V.two = (a, b, o = {}) => `<div class="vz-two" style="--split:${o.split || "1fr 1fr"}">${a}${b}</div>`;

  /* ---------- SVG-Hilfen ---------- */
  const svg = (V.svg = (w, h, inner, cls = "") =>
    `<svg class="vz-svg ${cls}" viewBox="0 0 ${w} ${h}" role="img" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`);
  const T = (V.T = (x, y, t, o = {}) =>
    `<text x="${x}" y="${y}" class="${o.cls || "vt"}"${o.anchor ? ` text-anchor="${o.anchor}"` : ""}${o.size ? ` font-size="${o.size}"` : ""}${
      o.weight ? ` font-weight="${o.weight}"` : ""
    }${o.fill ? ` fill="${o.fill}"` : ""}${o.rot ? ` transform="rotate(${o.rot} ${x} ${y})"` : ""}${S(o.s)}>${esc(t)}</text>`);
  V.wrap = (x, y, t, max, o = {}) => {
    const words = String(t).split(" ");
    const lines = [];
    let cur = "";
    words.forEach((w) => {
      if ((cur + " " + w).trim().length > max) {
        lines.push(cur.trim());
        cur = w;
      } else cur += " " + w;
    });
    if (cur.trim()) lines.push(cur.trim());
    const lh = o.lh || (o.size || 14) * 1.25;
    const y0 = o.middle ? y - ((lines.length - 1) * lh) / 2 : y;
    return `<text class="${o.cls || "vt"}"${o.anchor ? ` text-anchor="${o.anchor}"` : ""}${o.size ? ` font-size="${o.size}"` : ""}${
      o.weight ? ` font-weight="${o.weight}"` : ""
    }${o.fill ? ` fill="${o.fill}"` : ""}${S(o.s)}>${lines.map((l, i) => `<tspan x="${x}" y="${y0 + i * lh}">${esc(l)}</tspan>`).join("")}</text>`;
  };
  // Catmull-Rom → kubische Bézier (glatte Linien durch Punkte)
  const smooth = (V.smooth = (pts, closed = false) => {
    if (pts.length < 3) return "M" + pts.map((p) => p.map((v) => v.toFixed(1)).join(",")).join("L");
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    const P = closed ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
    for (let i = 1; i < P.length - 2; i++) {
      const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d + (closed ? "Z" : "");
  });
  V.arrowDefs = (id = "ah") =>
    `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="context-stroke"/></marker></defs>`;
  let uid = 0;
  V.uid = (p = "u") => p + ++uid;

  const niceStep = (raw) => { const p = Math.pow(10, Math.floor(Math.log10(raw))); const f = raw / p; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p; };
  V.nice = (max, ticks) => { const st = niceStep(max / ticks); return { max: st * Math.ceil(max / st - 1e-9), ticks: Math.ceil(max / st - 1e-9) }; };
  /* ---------- Balkendiagramm (horizontal) ---------- */
  V.bars = (o) => {
    const data = o.data; // [label, val, val2?]
    const W = o.w || 720, rowH = o.rowH || 30, top = o.legend || o.ref ? 34 : 10, left = o.left || 150, right = 70;
    const H = top + data.length * rowH + 30;
    const nb = o.max ? { max: o.max, ticks: o.ticks || 5 } : V.nice(Math.max(...data.map((d) => Math.max(d[1] || 0, d[2] || 0))) * 1.02, o.ticks || 5);
    const max = nb.max, ticks = nb.ticks;
    const x = (v) => left + (v / max) * (W - left - right);
    let g = "";
    for (let i = 0; i <= ticks; i++) {
      const v = (max / ticks) * i, xx = x(v);
      g += `<line x1="${xx}" y1="${top - 4}" x2="${xx}" y2="${H - 26}" class="vgrid"/>` + T(xx, H - 10, fmt(v, o.tickDec || 0), { anchor: "middle", cls: "vt vsm" });
    }
    if (o.ref) {
      const xx = x(o.ref[0]);
      g += `<line x1="${xx}" y1="${top - 26}" x2="${xx}" y2="${H - 26}" class="vref"${S(o.refS)}/>` + T(xx + 4, top - 12, o.ref[1], { cls: "vt vsm vacc", s: o.refS });
    }
    data.forEach((d, i) => {
      const y = top + i * rowH;
      const hl = o.highlight && o.highlight.includes(d[0]);
      const s = o.stagger ? (o.s0 || 0) + Math.floor(i / (o.per || 99)) : o.s;
      const two = d.length > 2 && d[2] != null;
      const bh = two ? rowH * 0.32 : rowH * 0.62;
      g += `<g${S(s)} class="vbar-row">` + T(left - 8, y + rowH / 2 + 4, d[0], { anchor: "end", cls: "vt" + (hl ? " vstrong" : "") });
      if (d[1] != null)
        g += `<rect x="${left}" y="${y + (two ? rowH * 0.14 : rowH * 0.19)}" width="${Math.max(1, x(d[1]) - left)}" height="${bh}" rx="3" class="vb ${hl ? "vb-hl" : "vb-1"}"/>` +
          T(x(d[1]) + 5, y + (two ? rowH * 0.14 : rowH * 0.19) + bh - 2, (o.pre || "") + fmt(d[1], o.dec || 0) + (o.unit || ""), { cls: "vt vsm" });
      if (two)
        g += `<rect x="${left}" y="${y + rowH * 0.5}" width="${Math.max(1, x(d[2]) - left)}" height="${bh}" rx="3" class="vb vb-2"/>` +
          T(x(d[2]) + 5, y + rowH * 0.5 + bh - 2, fmt(d[2], o.dec || 0) + (o.unit || ""), { cls: "vt vsm vmuted" });
      g += `</g>`;
    });
    if (o.legend)
      g += `<rect x="${left}" y="6" width="12" height="12" rx="2" class="vb vb-1"/>` + T(left + 18, 16, o.legend[0], { cls: "vt vsm" }) +
        (o.legend[1] ? `<rect x="${left + 190}" y="6" width="12" height="12" rx="2" class="vb vb-2"/>` + T(left + 208, 16, o.legend[1], { cls: "vt vsm" }) : "");
    return svg(W, H, g, "vz-bars vz-chart");
  };

  /* ---------- Säulendiagramm (vertikal) ---------- */
  V.cols = (o) => {
    const data = o.data, W = o.w || 720, H = o.h || 300, top = 24, bottom = 40, left = 54, right = o.right || 16;
    const nc = o.max ? { max: o.max, ticks: o.ticks || 4 } : V.nice(Math.max(...data.map((d) => d[1])) * 1.05, o.ticks || 4);
    const max = nc.max, min = o.min || 0;
    const y = (v) => top + (1 - (v - min) / (max - min)) * (H - top - bottom);
    const bw = (W - left - right) / data.length;
    let g = "";
    const ticks = o.max ? o.ticks || 4 : nc.ticks;
    for (let i = 0; i <= ticks; i++) {
      const v = min + ((max - min) / ticks) * i;
      g += `<line x1="${left}" y1="${y(v)}" x2="${W - right}" y2="${y(v)}" class="vgrid"/>` + T(left - 6, y(v) + 4, fmt(v, o.tickDec || 0), { anchor: "end", cls: "vt vsm" });
    }
    if (min < 0) g += `<line x1="${left}" y1="${y(0)}" x2="${W - right}" y2="${y(0)}" class="vaxis"/>`;
    data.forEach((d, i) => {
      const x = left + i * bw + bw * 0.15, v = d[1];
      const y0 = y(Math.max(0, min)), y1 = y(v);
      const s = o.stagger ? (o.s0 || 0) + Math.floor(i / (o.per || 99)) : o.s;
      const cls = d[2] || (v < 0 ? "vb-neg" : o.hl && o.hl.includes(d[0]) ? "vb-hl" : "vb-1");
      g += `<g${S(s)} class="vbar-row"><rect x="${x}" y="${Math.min(y0, y1)}" width="${bw * 0.7}" height="${Math.max(1, Math.abs(y1 - y0))}" rx="2" class="vb ${cls}"/>`;
      if (o.labels !== false && (o.labelEvery ? i % o.labelEvery === 0 : true)) g += T(x + bw * 0.35, H - bottom + 16, d[0], { anchor: "middle", cls: "vt vsm" });
      if (o.values) g += T(x + bw * 0.35, (v < 0 ? y1 + 14 : y1 - 5), (v > 0 && o.plus ? "+" : "") + fmt(v, o.dec || 0) + (o.unit || ""), { anchor: "middle", cls: "vt vxs" });
      g += `</g>`;
    });
    if (o.ylabel) g += T(14, top + (H - top - bottom) / 2, o.ylabel, { anchor: "middle", cls: "vt vsm vmuted", rot: -90 });
    (o.notes || []).forEach((n) => (g += T(n.x, n.y, n.t, { cls: "vt vsm vacc", anchor: n.anchor, s: n.s })));
    return svg(W, H, g, "vz-cols vz-chart");
  };

  /* ---------- Liniendiagramm ---------- */
  V.lines = (o) => {
    const W = o.w || 720, H = o.h || 320, top = 20, bottom = 44, left = 56, right = o.right || 110;
    const xs = o.x, n = xs.length;
    const all = o.series.flatMap((s) => s.vals.filter((v) => v != null));
    const max = o.max ?? Math.max(...all) * 1.08, min = o.min ?? Math.min(0, ...all);
    const X = (i) => left + (i / (n - 1)) * (W - left - right);
    const Y = (v) => top + (1 - (v - min) / (max - min)) * (H - top - bottom);
    let g = "";
    const ticks = o.ticks || 4;
    for (let i = 0; i <= ticks; i++) {
      const v = min + ((max - min) / ticks) * i;
      g += `<line x1="${left}" y1="${Y(v)}" x2="${W - right}" y2="${Y(v)}" class="vgrid"/>` + T(left - 6, Y(v) + 4, fmt(v, o.tickDec || 0), { anchor: "end", cls: "vt vsm" });
    }
    if (min < 0) g += `<line x1="${left}" y1="${Y(0)}" x2="${W - right}" y2="${Y(0)}" class="vaxis"/>`;
    xs.forEach((xv, i) => {
      if (o.xEvery ? i % o.xEvery === 0 : true) g += T(X(i), H - bottom + 18, xv, { anchor: "middle", cls: "vt vsm" });
    });
    (o.bands || []).forEach((b) => {
      g += `<rect x="${X(b.from)}" y="${top}" width="${X(b.to) - X(b.from)}" height="${H - top - bottom}" class="vband ${b.cls || ""}"${S(b.s)}/>` +
        T((X(b.from) + X(b.to)) / 2, top + 14, b.t, { anchor: "middle", cls: "vt vsm vstrong", s: b.s });
    });
    if (o.area) {
      const [a, b] = o.area.between;
      const A = o.series[a].vals, B = o.series[b].vals;
      let d = "M" + A.map((v, i) => `${X(i)},${Y(v)}`).join("L") + "L" + B.map((v, i) => `${X(i)},${Y(v)}`).reverse().join("L") + "Z";
      g += `<path d="${d}" class="varea"${S(o.area.s)}/>`;
      if (o.area.t) g += T(o.area.tx, o.area.ty, o.area.t, { cls: "vt vsm vacc", anchor: "middle", s: o.area.s });
    }
    o.series.forEach((s, k) => {
      const pts = s.vals.map((v, i) => (v == null ? null : [X(i), Y(v)])).filter(Boolean);
      const d = s.smooth ? smooth(pts) : "M" + pts.map((p) => p.join(",")).join("L");
      g += `<path d="${d}" class="vline draw ${s.cls || "vl-" + (k + 1)}" ${s.dash ? `stroke-dasharray="${s.dash}"` : ""}${S(s.s)}/>`;
      const last = pts[pts.length - 1];
      if (s.name && s.labelAt != null) g += T(X(s.labelAt), Y(s.vals[s.labelAt]) - 9, s.name, { anchor: "middle", cls: "vt vsm vl-t-" + (k + 1), s: s.s });
      else if (s.name) g += T(last[0] + 6, last[1] + 4 + (s.dy || 0), s.name, { cls: "vt vsm vl-t-" + (k + 1) + (s.cls ? " " + s.cls + "-t" : ""), s: s.s });
      (s.marks || []).forEach((m) => {
        const p = [X(m.i), Y(s.vals[m.i])];
        g += `<g${S(m.s ?? s.s)}><circle cx="${p[0]}" cy="${p[1]}" r="4" class="vdot"/>` + T(p[0] + (m.dx || 0), p[1] + (m.dy ?? -10), m.t, { anchor: m.anchor || "middle", cls: "vt vsm vstrong" }) + `</g>`;
      });
    });
    if (o.ylabel) g += T(14, top + (H - top - bottom) / 2, o.ylabel, { anchor: "middle", cls: "vt vsm vmuted", rot: -90 });
    (o.notes || []).forEach((n) => (g += V.wrap(n.x, n.y, n.t, n.max || 30, { cls: "vt vsm " + (n.cls || "vacc"), anchor: n.anchor, s: n.s })));
    return svg(W, H, g, "vz-lines vz-chart");
  };

  /* ---------- Kreislauf (kumulative Verursachung) ---------- */
  V.cycle = (o) => {
    const W = o.w || 640, H = o.h || 420, cx = W / 2, cy = H / 2, R = o.r || 150, n = o.nodes.length;
    const id = V.uid("cy");
    let g = V.arrowDefs(id);
    const pos = o.nodes.map((_, i) => {
      const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
      return [cx + Math.cos(a) * R * 1.25, cy + Math.sin(a) * R];
    });
    o.nodes.forEach((nd, i) => {
      const a1 = -Math.PI / 2 + ((i + 0.22) / n) * Math.PI * 2, a2 = -Math.PI / 2 + ((i + 0.78) / n) * Math.PI * 2;
      const p1 = [cx + Math.cos(a1) * R * 1.25, cy + Math.sin(a1) * R], p2 = [cx + Math.cos(a2) * R * 1.25, cy + Math.sin(a2) * R];
      g += `<path d="M${p1[0]},${p1[1]} A${R * 1.25},${R} 0 0 1 ${p2[0]},${p2[1]}" class="vcyc draw" marker-end="url(#${id})"${S(nd.s)}/>`;
    });
    o.nodes.forEach((nd, i) => {
      const [x, y] = pos[i];
      g += `<g${S(nd.s)}><rect x="${x - 92}" y="${y - 28}" width="184" height="56" rx="10" class="vnode"/>` + V.wrap(x, y + 5, nd.h, 22, { anchor: "middle", middle: true, size: 13.5, weight: 700 }) + `</g>`;
    });
    if (o.center) g += `<g${S(o.centerS)}>` + V.wrap(cx, cy + 4, o.center, 16, { anchor: "middle", middle: true, size: 17, weight: 800, cls: "vt vacc" }) + `</g>`;
    return svg(W, H, g, "vz-cycle");
  };

  /* ---------- Karten (d3-geo + world-atlas, lazy) ---------- */
  const VIEWS = {
    world: { proj: "naturalEarth", w: 1000, h: 520, sphere: true },
    afroeurasia: { proj: "naturalEarth", w: 1000, h: 620, bbox: [[-22, -38], [128, 58]] },
    eurasia: { proj: "conic", w: 1000, h: 560, bbox: [[-12, 18], [146, 66]], par: [30, 60], rot: [-70, 0] },
    europe: { proj: "conic", w: 1000, h: 760, bbox: [[-11, 35], [32, 62]], par: [40, 58], rot: [-12, 0] },
    europefilm: { proj: "conic", w: 1000, h: 600, bbox: [[-7, 38.5], [27, 60]], par: [40, 58], rot: [-10, 0] },
    ceurope: { proj: "conic", w: 1000, h: 640, bbox: [[5, 42], [30.5, 52.5]], par: [43, 52], rot: [-17, 0] },
    eastasia: { proj: "mercator", w: 1000, h: 760, bbox: [[96, -3], [134, 42]] },
    ireland: { proj: "mercator", w: 1000, h: 640, bbox: [[-12, 49.6], [3, 56.5]] },
    centralasia: { proj: "conic", w: 1000, h: 560, bbox: [[1, 33], [118, 57]], par: [35, 55], rot: [-60, 0] }
  };
  const M = (V.map = {});
  M.ready = false;
  M.waiters = [];
  M.whenReady = (cb) => (M.ready ? cb() : M.waiters.push(cb));
  let world = null, feats = null;
  const cache = {};
  M.load = () => {
    if (M.loading) return M.loading;
    M.loading = new Promise((res) => {
      const ok = () => window.d3 && d3.geoPath && window.topojson;
      const go = () => {
        fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")
          .then((r) => r.json())
          .then((t) => {
            world = t;
            feats = topojson.feature(t, t.objects.countries).features;
            M.ready = true;
            M.waiters.splice(0).forEach((f) => f());
            res(true);
          })
          .catch(() => {
            M.failed = true;
            M.ready = true;
            M.waiters.splice(0).forEach((f) => f());
            res(false);
          });
      };
      let tries = 0;
      (function wait() {
        if (ok()) return go();
        if (++tries > 120) {
          M.failed = true;
          M.ready = true;
          M.waiters.splice(0).forEach((f) => f());
          return res(false);
        }
        setTimeout(wait, 100);
      })();
    });
    return M.loading;
  };
  function proj(view) {
    const v = VIEWS[view];
    if (cache[view]) return cache[view];
    let p;
    if (v.proj === "naturalEarth") p = d3.geoNaturalEarth1();
    else if (v.proj === "mercator") p = d3.geoMercator();
    else p = d3.geoConicConformal().parallels(v.par).rotate(v.rot);
    const pad = 6;
    if (v.sphere) p.fitExtent([[pad, pad], [v.w - pad, v.h - pad]], { type: "Sphere" });
    else {
      const [[x0, y0], [x1, y1]] = v.bbox;
      const ring = [];
      for (let i = 0; i <= 20; i++) ring.push([x0 + ((x1 - x0) * i) / 20, y0]);
      for (let i = 0; i <= 20; i++) ring.push([x1, y0 + ((y1 - y0) * i) / 20]);
      for (let i = 20; i >= 0; i--) ring.push([x0 + ((x1 - x0) * i) / 20, y1]);
      for (let i = 20; i >= 0; i--) ring.push([x0, y0 + ((y1 - y0) * i) / 20]);
      p.fitExtent([[0, 0], [v.w, v.h]], { type: "MultiPoint", coordinates: ring });
    }
    p.clipExtent([[-4, -4], [v.w + 4, v.h + 4]]);
    const path = d3.geoPath(p);
    if (path.digits) path.digits(1);
    const land = feats.map((f) => ({ id: f.id, name: f.properties.name, d: path(f) || "" })).filter((c) => c.d);
    const sphere = path({ type: "Sphere" });
    const grat = path(d3.geoGraticule().step([20, 20])());
    return (cache[view] = { p, land, sphere, grat, v });
  }
  M.project = (view, ll) => (M.ready && !M.failed ? proj(view).p(ll) : null);
  /* opts: highlight {id:cls}, routes [{pts,cls,label,s,lpos,w,arrow,dash}], points [{p,t,s,r,cls,anchor,dx,dy}], areas [{pts,cls,s,t}], labels [{p,t,cls,s}] */
  M.render = (view, o = {}) => {
    const v = VIEWS[view];
    if (!M.ready) return `<div class="vz-mapwait" data-map="${esc(JSON.stringify({ view, o }))}">${svg(v.w, v.h, T(v.w / 2, v.h / 2, "Karte wird geladen …", { anchor: "middle", cls: "vt vmuted" }), "vz-map")}</div>`;
    if (M.failed) return svg(v.w, v.h, `<rect width="${v.w}" height="${v.h}" class="vsea"/>` + T(v.w / 2, v.h / 2, "Karte offline nicht verfügbar", { anchor: "middle", cls: "vt vmuted" }) + overlay(null, o), "vz-map");
    const P = proj(view);
    let g = `<rect width="${v.w}" height="${v.h}" class="vsea"/>`;
    if (v.sphere) g += `<path d="${P.sphere}" class="vsphere"/>`;
    g += `<path d="${P.grat}" class="vgrat"/>`;
    const hl = o.highlight || {};
    g += `<g class="vland">` + P.land.map((c) => (c.d ? `<path d="${c.d}"${hl[c.id] ? ` class="${hl[c.id].cls || hl[c.id]}"` + S(hl[c.id].s) : ""}><title>${esc(c.name)}</title></path>` : "")).join("") + `</g>`;
    g += overlay(P.p, o);
    return svg(v.w, v.h, g, "vz-map");
  };
  function overlay(p, o) {
    if (!p) return "";
    let g = "";
    const id = V.uid("mk");
    g += V.arrowDefs(id);
    (o.areas || []).forEach((a) => {
      const pts = a.pts.map((ll) => p(ll));
      g += `<path d="${a.smooth === false ? "M" + pts.map((q) => q.join(",")).join("L") + "Z" : smooth(pts, true)}" class="varea-map ${a.cls || ""}"${S(a.s)}/>`;
      if (a.t) {
        const c = p(a.tp || a.pts[0]);
        g += T(c[0], c[1], a.t, { cls: "vt vmaplabel " + (a.tcls || ""), anchor: "middle", s: a.s });
      }
    });
    (o.routes || []).forEach((r) => {
      const pts = r.pts.map((ll) => p(ll));
      const d = r.straight ? "M" + pts.map((q) => q.join(",")).join("L") : smooth(pts);
      g += `<path d="${d}" class="vroute draw ${r.cls || ""}"${r.w ? ` style="stroke-width:${r.w}"` : ""}${r.arrow ? ` marker-end="url(#${id})"` : ""}${S(r.s)}/>`;
      if (r.label) {
        const q = r.lpos ? p(r.lpos) : pts[Math.floor(pts.length / 2)];
        g += `<g${S(r.s)}><text x="${q[0]}" y="${q[1]}" class="vt vroutelabel ${r.cls || ""}-t" text-anchor="${r.anchor || "middle"}">${esc(r.label)}</text></g>`;
      }
    });
    (o.points || []).forEach((pt) => {
      const q = p(pt.p);
      if (!q) return;
      const r = pt.r || 4.5;
      g += `<g${S(pt.s)} class="vpt ${pt.cls || ""}"><circle cx="${q[0]}" cy="${q[1]}" r="${r}"/>` +
        (pt.t ? `<text x="${q[0] + (pt.dx ?? (pt.anchor === "end" ? -8 : 8))}" y="${q[1] + (pt.dy ?? 4)}" class="vt vptlabel" text-anchor="${pt.anchor || "start"}">${esc(pt.t)}</text>` : "") + `</g>`;
    });
    (o.labels || []).forEach((l) => {
      const q = p(l.p);
      g += T(q[0], q[1], l.t, { cls: "vt vmaplabel " + (l.cls || ""), anchor: "middle", s: l.s, size: l.size });
    });
    return g;
  }
  // Platzhalter nach dem Laden ersetzen
  M.hydrate = (root = document) => {
    root.querySelectorAll(".vz-mapwait").forEach((el) => {
      if (!M.ready) return;
      try {
        const { view, o } = JSON.parse(el.getAttribute("data-map"));
        el.outerHTML = M.render(view, o);
      } catch (e) {}
    });
  };

  /* Beschriftungen auf Karten entzerren: jedes Label probiert mehrere Positionen, bis es nichts überdeckt. */
  V.declutter = (root = document) => {
    root.querySelectorAll("svg.vz-map").forEach((svg) => {
      const vb = svg.viewBox.baseVal;
      if (!vb || !vb.width) return;
      const placed = [];
      const pad = 2;
      const box = (el) => { const b = el.getBBox(); return { x: b.x - pad, y: b.y - pad, w: b.width + 2 * pad, h: b.height + 2 * pad }; };
      const hit = (a) => placed.some((b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y);
      const inside = (a) => a.x >= 2 && a.y >= 2 && a.x + a.w <= vb.width - 2 && a.y + a.h <= vb.height - 2;
      try {
        svg.querySelectorAll(".vpt circle").forEach((c) => placed.push(box(c)));
        const labs = [...svg.querySelectorAll("text.vroutelabel, text.vmaplabel"), ...svg.querySelectorAll("text.vptlabel")];
        labs.forEach((t) => {
          if (!t.dataset.ox) { t.dataset.ox = t.getAttribute("x"); t.dataset.oy = t.getAttribute("y"); t.dataset.oa = t.getAttribute("text-anchor") || "start"; }
          const x0 = +t.dataset.ox, y0 = +t.dataset.oy, a0 = t.dataset.oa;
          const fs = parseFloat(getComputedStyle(t).fontSize) || 13;
          let cands;
          if (t.classList.contains("vptlabel")) {
            const c = t.parentNode.querySelector("circle");
            const cx = +c.getAttribute("cx"), cy = +c.getAttribute("cy"), g = fs * 0.5 + 5;
            cands = [[x0, y0, a0], [cx + g, cy + fs * 0.35, "start"], [cx - g, cy + fs * 0.35, "end"], [cx, cy - g, "middle"], [cx, cy + fs + g * 0.5, "middle"],
              [cx + g, cy - g * 0.6, "start"], [cx - g, cy - g * 0.6, "end"], [cx + g, cy + fs + 2, "start"], [cx - g, cy + fs + 2, "end"]];
          } else cands = [0, -1, 1, -2, 2, -3, 3].map((k) => [x0, y0 + k * fs * 1.25, a0]);
          let best = null;
          for (const [x, y, a] of cands) {
            t.setAttribute("x", x); t.setAttribute("y", y); t.setAttribute("text-anchor", a);
            const b = box(t);
            if (!hit(b) && inside(b)) { best = b; break; }
          }
          if (!best) { t.setAttribute("x", x0); t.setAttribute("y", y0); t.setAttribute("text-anchor", a0); best = box(t); }
          placed.push(best);
        });
      } catch (e) {}
    });
  };

  /* ---------- Orte & Routen (Längengrad, Breitengrad) ---------- */
  V.P = {
    shanghai: [121.5, 31.2], ningbo: [121.9, 29.9], shenzhen: [114.1, 22.5], hongkong: [114.2, 22.3], guangzhou: [113.3, 23.1], qingdao: [120.4, 36.1],
    tianjin: [117.7, 39.0], busan: [129.0, 35.1], singapur: [103.8, 1.3], dubai: [55.0, 25.0], rotterdam: [4.1, 51.95], hamburg: [9.97, 53.55],
    piraeus: [23.6, 37.94], duisburg: [6.76, 51.43], lianyungang: [119.2, 34.6], wladiwostok: [131.9, 43.1], chongqing: [106.5, 29.6], xian: [108.9, 34.3],
    urumqi: [87.6, 43.8], khorgos: [80.4, 44.2], almaty: [76.9, 43.2], astana: [71.4, 51.2], moskau: [37.6, 55.75], minsk: [27.6, 53.9], warschau: [21.0, 52.2],
    berlin: [13.4, 52.5], wien: [16.37, 48.21], budapest: [19.05, 47.5], prag: [14.42, 50.08], belgrad: [20.46, 44.8], istanbul: [28.98, 41.0], aktau: [51.2, 43.65],
    baku: [49.87, 40.4], tiflis: [44.8, 41.7], kars: [43.1, 40.6], constanta: [28.65, 44.17], peking: [116.4, 39.9], london: [-0.12, 51.5], paris: [2.35, 48.86],
    mailand: [9.19, 45.46], muenchen: [11.58, 48.14], bruessel: [4.35, 50.85], amsterdam: [4.9, 52.37], frankfurt: [8.68, 50.11], zuerich: [8.54, 47.37],
    stockholm: [18.07, 59.33], kopenhagen: [12.57, 55.68], barcelona: [2.17, 41.39], marseille: [5.37, 43.3], genua: [8.93, 44.41], dublin: [-6.26, 53.35],
    hambantota: [81.1, 6.12], colombo: [79.86, 6.93], gwadar: [62.33, 25.12], mombasa: [39.66, -4.05], dschibuti: [43.15, 11.6], teheran: [51.39, 35.69],
    samarkand: [66.97, 39.65], venedig: [12.33, 45.44], jakarta: [106.85, -6.2], kualalumpur: [101.7, 3.14], kashgar: [75.99, 39.47], lanzhou: [103.8, 36.06],
    kapstadt: [18.4, -33.9], nachodka: [132.9, 42.8], kelheim: [11.88, 48.92], ulm: [9.99, 48.4], linz: [14.29, 48.31], bratislava: [17.11, 48.15],
    sulina: [29.65, 45.15], galati: [28.05, 45.43], ruse: [25.95, 43.85], passau: [13.46, 48.57], regensburg: [12.1, 49.02], nuernberg: [11.08, 49.45],
    mainz: [8.27, 50.0], koeln: [6.96, 50.94], basel: [7.59, 47.56], hormus: [56.4, 26.5], suez: [32.55, 29.95], malakka: [100.5, 3.5], limerick: [-8.63, 52.66],
    cork: [-8.47, 51.9], galway: [-9.05, 53.27], belfast: [-5.93, 54.6], lodz: [19.46, 51.76], manchester: [-2.24, 53.48], warsaw: [21.0, 52.2]
  };
  const P = V.P;
  V.R = {
    suez: [P.shanghai, [122.5, 27], [119.5, 23], [114, 16], [109, 9], P.singapur, [99.5, 4.5], [95, 6.5], [86, 5.3], [80, 5.4], [72, 8], [62, 12.3], [52, 12.8], [44.5, 12.2], [41.5, 15], [38.5, 20], [35, 26], [32.6, 29.6], [32.4, 31.4], [26, 33.8], [15, 36.3], [5, 37.6], [-5.6, 35.95], [-9.8, 37.5], [-9.8, 42.5], [-6.5, 47.5], [-3, 49.6], [1.4, 50.6], P.rotterdam],
    kap: [P.shanghai, [122.5, 27], [119.5, 23], [114, 16], [109, 9], P.singapur, [99.5, 4.5], [95, 6.5], [86, 5.3], [80, 4.6], [68, -2], [58, -12], [53, -24], [40, -33], [33, -35.5], [26, -36], [18.4, -35.6], [12, -31], [4, -22], [-6, -10], [-14, 2], [-19, 14], [-17.5, 26], [-12, 34], [-10.2, 40], [-9.8, 44], [-6.5, 47.8], [-3, 49.6], [1.4, 50.6], P.rotterdam],
    transsib: [P.wladiwostok, [134.5, 47.5], [127.5, 50.3], [113.5, 52.0], [104.3, 52.3], [92.9, 56.0], [82.9, 55.0], [73.4, 55.0], [60.6, 56.8], P.moskau, P.minsk, P.warschau, P.berlin, P.duisburg, P.rotterdam],
    nelb: [P.lianyungang, [113.6, 34.7], P.xian, P.lanzhou, [98, 40], P.urumqi, [82.6, 45.2], [79.6, 46.9], P.astana, [61, 53.5], [50.1, 53.2], P.moskau, P.minsk, P.warschau, P.berlin, P.duisburg, P.rotterdam],
    yuxinou: [P.chongqing, P.xian, P.lanzhou, P.urumqi, [82.6, 45.2], [79.6, 46.9], P.astana, [61, 53.5], [50.1, 53.2], P.moskau, P.minsk, P.warschau, P.berlin, P.duisburg],
    mittlerer: [P.xian, P.lanzhou, P.urumqi, P.khorgos, P.almaty, [68, 42.3], [59, 43.6], P.aktau, P.baku, P.tiflis, P.kars, [37, 39.8], P.istanbul, [23.3, 42.7], P.belgrad, P.budapest, P.wien, P.muenchen, P.duisburg],
    schwarzmeer: [P.tiflis, [41.65, 42.15], [36, 43], P.constanta, [26.1, 44.43], [21.2, 45.75], P.budapest],
    sued: [P.shenzhen, [108, 23], [100, 22], [92, 25], [80, 28.5], [70, 30], [61, 31], P.teheran, [44, 38.5], P.istanbul],
    belt: [P.xian, P.lanzhou, P.urumqi, P.almaty, [74.6, 42.9], P.samarkand, P.teheran, P.istanbul, [27, 45], P.moskau, P.minsk, P.warschau, P.duisburg, P.rotterdam],
    road: [[118.6, 24.9], [114, 18], [109, 10], P.kualalumpur, [99.5, 4.5], [95, 6.5], P.colombo, [72, 8], P.gwadar, [58, 18], P.mombasa, [48, 8], P.dschibuti, [41.5, 15], [38.5, 20], [35, 26], [32.6, 29.6], [32.4, 31.4], [28, 34], P.piraeus, [19.5, 38.5], [18.5, 41], P.venedig],
    donau: [[8.5, 47.95], P.ulm, [11.4, 48.75], P.kelheim, P.regensburg, P.passau, P.linz, [15.6, 48.4], P.wien, P.bratislava, [18.1, 47.75], [18.75, 47.8], P.budapest, [18.85, 46.4], [18.7, 45.9], [19.0, 45.35], [19.85, 45.25], P.belgrad, [21.5, 44.65], [22.5, 44.62], [22.88, 44.0], [24.2, 43.7], P.ruse, [27.25, 44.1], [28.0, 44.35], [27.97, 45.27], P.galati, [28.8, 45.17], P.sulina],
    maindonau: [P.kelheim, P.nuernberg, [10.9, 49.9], [9.9, 49.8], [9.15, 50.0], P.frankfurt, P.mainz, P.koeln, P.duisburg, [5.9, 51.85], P.rotterdam],
    banane: [P.manchester, P.london, P.bruessel, P.koeln, P.frankfurt, P.basel, P.zuerich, P.mailand, P.genua],
    sunbelt: [[-0.38, 39.47], P.barcelona, P.marseille, [7.27, 43.7], P.genua, P.mailand],
    banane2: [P.stockholm, P.kopenhagen, P.berlin, P.prag, P.wien, P.budapest, P.belgrad]
  };
})();
