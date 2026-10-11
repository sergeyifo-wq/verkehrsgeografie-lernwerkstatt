/* Verkehrsgeografie Lernwerkstatt – App: Router, Ansichten, Prüfungsmodus, Glossar, Lernkarten, Suche. */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = V.esc;
  const LS = (k, d) => { try { const v = localStorage.getItem("vg:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } };
  const SS = (k, v) => { try { localStorage.setItem("vg:" + k, JSON.stringify(v)); } catch (e) {} };
  const main = $("#main");
  const KAP = window.KAP.slice().sort((a, b) => a.nr - b.nr);
  const kapById = Object.fromEntries(KAP.map((k) => [k.id, k]));
  const FILMS = window.FILMS, filmById = Object.fromEntries(FILMS.map((f) => [f.id, f]));
  const FR = window.FRAGEN, frById = Object.fromEntries(FR.map((q) => [q.id, q]));
  const kc = (id) => `var(--${id})`;
  const PRIO = { S: ["S", "Schwerpunkt"], K: ["K", "Klausur sicher"], U: ["U", "Überblick"], "-": ["N", "Nebenthema"] };
  const badge = (p) => (PRIO[p] ? `<span class="badge ${PRIO[p][0]}">${PRIO[p][1]}</span>` : "");
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmtMin = (s) => `${Math.max(1, Math.round(s / 60))} min`;

  /* ================= Glossar-Index ================= */
  const GL = window.GLOSSAR.map(([t, k, d]) => ({ t, k, d, n: t.toLowerCase() }));
  function glFind(key) {
    const n = key.toLowerCase().trim();
    return GL.find((g) => g.n === n) || GL.find((g) => g.n.startsWith(n)) || GL.find((g) => g.n.includes(n)) || GL.find((g) => n.startsWith(g.n.split(/[ (/]/)[0]) && g.n.split(/[ (/]/)[0].length > 5) || null;
  }

  /* ================= Mini-Markup → HTML ================= */
  function inline(s) {
    s = esc(s);
    s = s.replace(/\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g, (m, a, b) => {
      const key = b || a, g = glFind(key);
      return g ? `<span class="gl" role="button" tabindex="0" data-gl="${esc(g.t)}">${a}</span>` : a;
    });
    s = s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/==(.+?)==/g, "<mark>$1</mark>").replace(/(^|[\s(„])\*([^*\s][^*]*?)\*(?=[\s).,;:!?“]|$)/g, "$1<i>$2</i>");
    return s;
  }
  const BOXLAB = { def: "Definition", merke: "Merke", bsp: "Beispiel", exk: "Exkurs", upd: "Aktualitäts-Check · Update", korr: "Aktualitäts-Check · Korrektur", klausur: "Klausur-Tipp" };
  function blocks(lines) {
    let out = "", i = 0;
    const para = [];
    const flush = () => { if (para.length) { out += `<p>${inline(para.join(" "))}</p>`; para.length = 0; } };
    while (i < lines.length) {
      const l = lines[i];
      const t = l.trim();
      if (!t) { flush(); i++; continue; }
      if (t.startsWith(":::") && t.length > 3) {
        flush();
        const m = t.slice(3).match(/^(\w+)\s*(.*)$/);
        const kind = m[1], title = m[2];
        const inner = [];
        i++;
        while (i < lines.length && lines[i].trim() !== ":::") inner.push(lines[i++]);
        i++;
        out += `<div class="box ${kind}"><div class="lab">${BOXLAB[kind] || kind}</div>${title ? `<div class="ttl">${inline(title)}</div>` : ""}<div>${blocks(inner)}</div></div>`;
        continue;
      }
      if (t.startsWith("### ")) { flush(); out += `<h3>${inline(t.slice(4))}</h3>`; i++; continue; }
      if (t.startsWith("@fig ")) { flush(); out += figHTML(t.slice(5).trim()); i++; continue; }
      if (t.startsWith("|")) {
        flush();
        const rows = [];
        while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(lines[i++].trim().slice(1).split("|").map((c) => c.trim()));
        const head = rows.shift();
        out += `<div class="tblw"><table><thead><tr>${head.map((h) => `<th>${inline(h)}</th>`).join("")}</tr></thead><tbody>${rows
          .map((r) => `<tr>${r.map((c, k) => `<td data-l="${esc(head[k] || "")}">${inline(c)}</td>`).join("")}</tr>`)
          .join("")}</tbody></table></div>`;
        continue;
      }
      if (/^- /.test(t)) {
        flush();
        const items = [];
        while (i < lines.length && /^- /.test(lines[i].trim())) items.push(lines[i++].trim().slice(2));
        out += `<ul>${items.map((x) => `<li>${inline(x)}</li>`).join("")}</ul>`;
        continue;
      }
      if (/^\d+\. /.test(t)) {
        flush();
        const items = [];
        while (i < lines.length && /^\d+\. /.test(lines[i].trim())) items.push(lines[i++].trim().replace(/^\d+\. /, ""));
        out += `<ol>${items.map((x) => `<li>${inline(x)}</li>`).join("")}</ol>`;
        continue;
      }
      para.push(t);
      flush();
      i++;
    }
    flush();
    return out;
  }
  function figHTML(id) {
    const f = FIGS[id];
    if (!f) return "";
    let inner = "";
    try { inner = f.html({}); } catch (e) { console.error(id, e); inner = "<p>Schaubild konnte nicht gezeichnet werden.</p>"; }
    return `<figure class="fig ${f.wide ? "wide" : ""}" data-fig="${id}"><figcaption><b>${esc(f.cap)}</b><small>${esc(f.src || "")}</small></figcaption>${inner}</figure>`;
  }
  function sections(kap) {
    if (kap._secs) return kap._secs;
    const parts = kap.body.split(/\n(?=## )/).filter((p) => p.trim().startsWith("## "));
    kap._secs = parts.map((p, idx) => {
      const lines = p.trim().split("\n");
      const [nr, title, prio] = lines[0].slice(3).split("|").map((s) => s.trim());
      const body = lines.slice(1);
      const plain = body.join(" ").replace(/\[\[([^\]|]+?)(?:\|[^\]]+)?\]\]/g, "$1").replace(/[*=:@|#]/g, " ").replace(/\s+/g, " ");
      return { idx, nr, title, prio: prio || "-", lines: body, plain, key: `${kap.id}:${idx}` };
    });
    return kap._secs;
  }
  const doneMap = () => LS("done", {});
  function kapProgress(k) {
    const s = sections(k), d = doneMap();
    return s.length ? s.filter((x) => d[x.key]).length / s.length : 0;
  }

  /* ================= Router ================= */
  let current = "";
  function route() {
    const h = location.hash.replace(/^#\/?/, "").split("?")[0] || "start";
    const [view, a, b] = h.split("/");
    Player.stopAll();
    hidePop();
    $$(".tabs a").forEach((x) => x.setAttribute("aria-current", x.dataset.tab === (view === "film" ? "filme" : view) ? "page" : "false"));
    const prev = current;
    current = h;
    const fn = { start: viewStart, kapitel: viewKapitel, filme: viewFilme, film: viewFilm, pruefung: viewPruefung, glossar: viewGlossar, karten: viewKarten, labor: viewLabor, kompass: viewKompass }[view] || viewStart;
    fn(a, b);
    if (!(view === "kapitel" && b) && prev.split("/")[0] + prev.split("/")[1] !== view + a) window.scrollTo(0, 0);
    V.map.load().then(() => V.map.hydrate(main));
  }
  window.addEventListener("hashchange", route);

  /* ================= Start ================= */
  function viewStart() {
    const total = KAP.reduce((a, k) => a + sections(k).length, 0);
    const d = doneMap(), done = Object.keys(d).filter((k) => d[k]).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const seen = LS("films", {});
    const qs = LS("qstats", {});
    const exam = LS("examDate", "");
    const days = exam ? Math.ceil((new Date(exam) - new Date(new Date().toDateString())) / 864e5) : null;
    const sure = FR.filter((q) => q.sicher);
    const sureFilm = { "q-bri": "f14", "q-kennz": "f7", "q-hyper": "f7", "q-2008": "f7", "q-irland": "f12" };
    const weak = Object.entries(qs).filter(([id]) => frById[id]).map(([id, s]) => [frById[id], s.last]).sort((a, b) => a[1] - b[1]).slice(0, 3);
    main.innerHTML = `
      <section class="hero">
        <div class="hero-main">
          <svg class="hero-lines" viewBox="0 0 400 300" aria-hidden="true"><g fill="none" stroke-width="10" stroke-linecap="round">
            <path d="M10 250 C120 240 140 120 260 110 S380 40 400 30" stroke="#e8590c"/><path d="M0 180 C100 190 160 260 280 240 S370 200 400 210" stroke="#1c7ed6"/>
            <path d="M60 300 C80 200 200 200 220 120 S300 10 330 0" stroke="#2f9e44"/></g>
            <g fill="#fff" stroke="#0f3d5c" stroke-width="4"><circle cx="260" cy="110" r="9"/><circle cx="280" cy="240" r="9"/><circle cx="220" cy="122" r="9"/><circle cx="140" cy="168" r="9"/></g></svg>
          <span class="eyebrow" style="color:#ffb380">Wirtschafts- und Verkehrsgeografie · Semester 1</span>
          <h1>Den ganzen Stoff lernen – mit Filmen, Karten und echtem Klausurtraining.</h1>
          <p>Sechs Kapitel als Liniennetz, 15 Erklärfilme mit Sprachausgabe, über 40 neu gezeichnete Schaubilder und Karten, 230 Glossarbegriffe und ein Prüfungsmodus mit offenen Fragen – so wie in der Klausur.</p>
          <div class="row">
            <a class="btn accent" href="#/kapitel/${nextKap().id}">▶ Weiterlernen: Kapitel ${nextKap().nr}</a>
            <a class="btn" href="#/pruefung">Klausur simulieren</a>
            <a class="btn" href="#/kompass">Was kommt dran?</a>
          </div>
        </div>
        <div class="hero-side">
          <div class="card count">
            <svg class="ring" viewBox="0 0 100 100"><circle class="tr" cx="50" cy="50" r="40"/><circle class="vl" cx="50" cy="50" r="40" stroke-dasharray="${(pct / 100) * 251.3} 251.3"/><text x="50" y="57" text-anchor="middle" font-size="22">${pct}%</text></svg>
            <div><b style="font-family:var(--f-display);font-size:18px">Lernfortschritt</b><p class="empty" style="margin:2px 0 0">${done} von ${total} Abschnitten als gelernt markiert · ${Object.keys(seen).length} von ${FILMS.length} Filmen gesehen</p></div>
          </div>
          <div class="card count">
            <div class="num">${days == null ? "–" : days < 0 ? "✓" : days}</div>
            <div><b style="font-family:var(--f-display);font-size:18px">${days == null ? "Klausurtermin eintragen" : days < 0 ? "Klausur vorbei" : days === 0 ? "Heute ist Klausur – viel Erfolg!" : days === 1 ? "Tag bis zur Klausur" : "Tage bis zur Klausur"}</b>
              <div class="row" style="margin-top:6px"><label class="empty" for="examdate">Datum:</label><input id="examdate" type="date" value="${esc(exam)}"></div></div>
          </div>
          <div class="card" style="display:grid;gap:8px">
            <b style="font-family:var(--f-display);font-size:16px">Klausur-Steckbrief</b>
            <div class="row"><span class="chip">60–90 Minuten</span><span class="chip">kein Multiple Choice</span><span class="chip">ganze Sätze</span><span class="chip">Belt and Road kommt sicher</span></div>
          </div>
        </div>
      </section>

      <div class="sec-h"><h2>Diese 5 Fragen kommen sicher</h2><a class="btn sm" href="#/pruefung/sicher">Alle 5 hintereinander üben</a></div>
      <div class="sure">${sure.map((q, i) => `<div class="sure-item"><span class="n">${i + 1}</span><div><b>${esc(q.q)}</b><small>Kapitel ${kapById[q.kap].nr} · ${q.pts} Punkte${qs[q.id] ? ` · zuletzt ${Math.round(qs[q.id].last * 100)} %` : ""}</small></div>
        <div class="row"><a class="btn sm" href="#/film/${sureFilm[q.id]}">▶ Film</a><a class="btn sm primary" href="#/pruefung/frage/${q.id}">Antwort schreiben</a></div></div>`).join("")}</div>

      <div class="sec-h"><h2>Das Liniennetz: alle Kapitel</h2><span class="empty">Orange markiert = Schwerpunkt laut Professor</span></div>
      <div class="lines">${KAP.map((k) => {
        const p = Math.round(kapProgress(k) * 100);
        return `<a class="line-card" href="#/kapitel/${k.id}" style="--kc:${kc(k.id)}"><span class="ln">${k.nr}</span><div><h3>${esc(k.title)}</h3><p>${esc(k.teaser)}</p><div class="bar"><i style="width:${p}%"></i></div></div>
          <div class="meta">${badge(k.prio)}<small class="empty">${p}% · ${k.films.length} Film${k.films.length > 1 ? "e" : ""}</small></div></a>`;
      }).join("")}</div>
      ${weak.length ? `<div class="sec-h"><h2>Hier solltest du nachlegen</h2></div><div class="grid g3">${weak.map(([q, s]) => `<a class="card" style="text-decoration:none;color:inherit;display:grid;gap:6px" href="#/pruefung/frage/${q.id}"><span class="eyebrow">Kapitel ${kapById[q.kap].nr} · zuletzt ${Math.round(s * 100)} %</span><b style="font-family:var(--f-display)">${esc(q.q)}</b></a>`).join("")}</div>` : ""}
      <div class="sec-h"><h2>Was du hier findest</h2></div>
      <div class="grid g3">
        ${[["#/filme", "Erklärfilme", "15 animierte Filme mit Sprachausgabe und Untertiteln – ideal zum Einstieg oder Wiederholen."], ["#/pruefung", "Prüfungsmodus", "Offene Fragen mit Timer, Erwartungshorizont, Musterantwort und Notenschätzung."], ["#/glossar", "Glossar", "230 Fachbegriffe – überall im Text antippen, um die Erklärung zu sehen."], ["#/karten", "Lernkarten", "Begriffe und Kontrollfragen im Karteikasten-System (Leitner)."], ["#/labor", "Labor", "Christaller, Hägerstrand, Demografischer Übergang und Suez-Rechner zum Ausprobieren."], ["#/kompass", "Klausur-Kompass", "Schwerpunkte des Professors, Lernplan, Antwort-Rezept und Zeitleiste."]]
          .map(([h, t, p]) => `<a class="card" href="${h}" style="text-decoration:none;color:inherit;display:grid;gap:6px"><b style="font-family:var(--f-display);font-size:18px">${t} →</b><span class="empty" style="font-size:14.5px">${p}</span></a>`).join("")}
      </div>`;
    $("#examdate").onchange = (e) => { SS("examDate", e.target.value); viewStart(); };
  }
  function nextKap() {
    return KAP.find((k) => k.prio !== "-" && kapProgress(k) < 1) || KAP.find((k) => kapProgress(k) < 1) || KAP[0];
  }

  /* ================= Kapitel ================= */
  function sideNav(curId) {
    const d = doneMap();
    const closed = window.innerWidth < 960 ? "true" : "false";
    return `<aside class="side"><button class="btn side-toggle" aria-expanded="${closed === "false"}">Liniennetz <span>▾</span></button><div class="side-list" data-closed="${closed}">
      ${KAP.map((k) => `<a class="side-k" href="#/kapitel/${k.id}" style="--kc:${kc(k.id)}" aria-current="${k.id === curId}"><span class="ln">${k.nr}</span><span>${esc(k.short)}</span></a>
        ${k.id === curId ? `<ul class="stations" style="--kc:${kc(k.id)}">${sections(k).map((s) => `<li class="${d[s.key] ? "done" : ""}"><a href="#/kapitel/${k.id}/${s.idx}"><span class="nr">${esc(s.nr)}</span>${esc(s.title)}${s.prio === "K" ? badge("K") : s.prio === "U" ? badge("U") : ""}</a></li>`).join("")}
          <li><a href="#/kapitel/${k.id}/fazit"><span class="nr">✓</span>Auf einen Blick & Kontrollfragen</a></li></ul>` : ""}`).join("")}
    </div></aside>`;
  }
  function filmCard(f) {
    const seen = LS("films", {})[f.id];
    const k = kapById[f.kap];
    return `<a class="filmcard" href="#/film/${f.id}" style="--kc:${kc(f.kap)}"><div class="thumb">
      <div class="tmini fpal" aria-hidden="true">${(() => { try { return f.scenes[f.thumb || 0].v(); } catch (e) { return ""; } })()}</div>
      <span class="play">▶</span><span class="dur">≈ ${fmtMin(filmSeconds(f))}</span>${seen ? `<span class="badge ok seen">✓ gesehen</span>` : f.prio === "K" ? `<span class="badge K seen">Klausur sicher</span>` : ""}</div>
      <div class="body"><small>Kapitel ${k.nr} · ${f.scenes.length} Szenen</small><b>${esc(f.t)}</b><small>${esc(f.sub || "")}</small></div></a>`;
  }
  function viewKapitel(id, sec) {
    const k = kapById[id] || KAP[0];
    const d = doneMap();
    const secs = sections(k);
    main.innerHTML = `<div class="learn" style="--kc:${kc(k.id)}">${sideNav(k.id)}
      <article class="article">
        <header class="k-head">
          <span class="eyebrow">Kapitel ${k.nr} ${badge(k.prio)}</span>
          <h1>${esc(k.title)}</h1>
          <p class="lede">${esc(k.teaser)}</p>
          <details><summary class="eyebrow" style="cursor:pointer">Lernziele – nach diesem Kapitel kannst du …</summary><ul class="goals" style="margin-top:8px">${k.lernziele.map((g) => `<li>${esc(g)}</li>`).join("")}</ul></details>
        </header>
        <section><div class="sec-h" style="margin-top:0"><h2 style="font-size:19px">Erklärfilme zu diesem Kapitel</h2></div><div class="filmrow">${k.films.map((fid) => filmCard(filmById[fid])).join("")}</div></section>
        ${secs.map((s) => `<section class="ksec" id="sec-${s.idx}">
          <div class="ksec-h"><span class="nr">${esc(s.nr)}</span><h2>${esc(s.title)}</h2>${s.prio !== "-" ? badge(s.prio) : ""}
          <button class="done-btn" data-key="${s.key}" aria-pressed="${!!d[s.key]}">${d[s.key] ? "✓ gelernt" : "○ als gelernt markieren"}</button></div>
          <div class="prose">${blocks(s.lines)}</div></section>`).join("")}
        <section class="ksec" id="sec-fazit">
          <div class="summary"><span class="eyebrow">Auf einen Blick · Kapitel ${k.nr}</span><ul>${k.summary.map((x) => `<li>${inline(x)}</li>`).join("")}</ul></div>
          <div class="sec-h"><h2>Kontrollfragen</h2><a class="btn sm" href="#/pruefung/kapitel/${k.id}">Mit Bewertung im Prüfungsmodus üben</a></div>
          <div class="qa">${k.fragen.map(([q, a], i) => `<details><summary><span class="n">${i + 1}.</span><span>${esc(q)}</span><span class="hint">Lösung zeigen</span></summary><div class="ans">${inline(a)}</div></details>`).join("")}</div>
        </section>
        <nav class="pager">${prevNext(k)}</nav>
      </article></div>`;
    $$(".done-btn").forEach((b) => (b.onclick = () => {
      const m = doneMap(); m[b.dataset.key] = !m[b.dataset.key]; SS("done", m);
      b.setAttribute("aria-pressed", !!m[b.dataset.key]); b.textContent = m[b.dataset.key] ? "✓ gelernt" : "○ als gelernt markieren";
      const li = $$(".stations li")[+b.dataset.key.split(":")[1]]; if (li) li.classList.toggle("done", !!m[b.dataset.key]);
    }));
    const tg = $(".side-toggle");
    tg.onclick = () => { const l = $(".side-list"); const c = l.dataset.closed === "true"; l.dataset.closed = c ? "false" : "true"; tg.setAttribute("aria-expanded", c); };
    if (sec != null) {
      const el = $(sec === "fazit" ? "#sec-fazit" : "#sec-" + sec);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
    }
  }
  function prevNext(k) {
    const i = KAP.indexOf(k), p = KAP[i - 1], n = KAP[i + 1];
    return `${p ? `<a class="btn" href="#/kapitel/${p.id}">← Kapitel ${p.nr}: ${esc(p.short)}</a>` : "<span></span>"}${n ? `<a class="btn primary" href="#/kapitel/${n.id}">Kapitel ${n.nr}: ${esc(n.short)} →</a>` : `<a class="btn primary" href="#/pruefung">Zur Klausursimulation →</a>`}`;
  }

  /* ================= Filme ================= */
  function viewFilme() {
    main.innerHTML = `<div class="k-head" style="--kc:var(--accent)"><span class="eyebrow">Erklärfilme</span><h1>15 Filme – der ganze Stoff zum Zuschauen</h1>
      <p class="lede">Animierte Schaubilder und Karten mit Sprachausgabe. Tipp: Ton an, Tempo nach Geschmack einstellen. Die Filme zu den sicheren Klausurfragen sind markiert.</p></div>
      ${KAP.map((k) => `<div class="sec-h"><h2 style="display:flex;gap:10px;align-items:center"><span class="kdot" style="--kc:${kc(k.id)}"></span>Kapitel ${k.nr} · ${esc(k.short)}</h2>${badge(k.prio)}</div>
        <div class="filmrow">${FILMS.filter((f) => f.kap === k.id).map(filmCard).join("")}</div>`).join("")}`;
  }
  function viewFilm(id) {
    const f = filmById[id] || FILMS[0];
    const k = kapById[f.kap];
    const i = FILMS.indexOf(f), nx = FILMS[i + 1];
    main.innerHTML = `<div class="row" style="margin-bottom:12px"><a class="btn sm ghost" href="#/filme">← alle Filme</a><a class="btn sm ghost" href="#/kapitel/${k.id}">Kapitel ${k.nr}: ${esc(k.short)}</a>${f.prio ? badge(f.prio) : ""}</div>
      <div class="film-page"><div><div id="pl"></div><p class="player-note">Leertaste = Play/Pause · ← → = Szene wechseln. Die Sprachausgabe nutzt die Stimmen deines Browsers/Systems (Edge und Chrome klingen am natürlichsten).</p></div>
      <aside class="film-side"><div class="card"><h3 style="font-size:16px;margin-bottom:8px">Szenen</h3><ol class="scenes">${f.scenes.map((s, j) => `<li><button data-i="${j}"><span>${j + 1}</span>${esc(s.h)}</button></li>`).join("")}</ol></div>
      <details class="card"><summary style="cursor:pointer;font-family:var(--f-display);font-weight:800">Mitlesen (Transkript)</summary><div class="transcript">${f.scenes.map((s, j) => `<h4>${j + 1}. ${esc(s.h)}</h4>${s.say.map((t, m) => `<p data-k="${j}-${m}">${esc(t)}</p>`).join("")}`).join("")}</div></details>
      ${nx ? `<a class="card" href="#/film/${nx.id}" style="text-decoration:none;color:inherit"><span class="eyebrow">Nächster Film</span><br><b style="font-family:var(--f-display)">${esc(nx.t)} →</b></a>` : ""}</aside></div>`;
    const ctl = Player.mount($("#pl"), f, {
      nextHtml: nx ? `<a class="btn accent" href="#/film/${nx.id}">Nächster Film →</a>` : "",
      onScene: (j) => $$(".scenes button").forEach((b) => b.setAttribute("aria-current", +b.dataset.i === j)),
      onSentence: (j, m) => { $$(".transcript p").forEach((p) => p.classList.toggle("cur", p.dataset.k === `${j}-${m}`)); }
    });
    $$(".scenes button").forEach((b) => (b.onclick = () => ctl.goto(+b.dataset.i, true)));
    $(".player").focus({ preventScroll: true });
  }

  /* ================= Prüfung ================= */
  const norm = (s) => s.toLowerCase().replace(/[„“"]/g, "").replace(/ß/g, "ß");
  function autoKP(q, text) {
    const t = norm(text || "");
    if (t.split(/\s+/).filter(Boolean).length < 8) return q.kp.map(() => false);
    return q.kp.map(([, , pats]) => pats.some((p) => { try { return new RegExp(p, "i").test(t); } catch (e) { return t.includes(p.toLowerCase()); } }));
  }
  const maxPts = (q) => q.kp.reduce((a, k) => a + k[1], 0);
  const ptsOf = (q, marks) => q.kp.reduce((a, k, i) => a + (marks[i] ? k[1] : 0), 0);
  function styleInfo(text, q) {
    const t = (text || "").trim();
    const w = t ? t.split(/\s+/).length : 0;
    const bullets = (t.match(/^\s*([-•*–]|\d+[.)])\s+/gm) || []).length;
    const sents = t ? t.split(/[.!?](\s|$)/).filter((s) => s.trim().split(/\s+/).length >= 3).length : 0;
    const target = Math.round(maxPts(q) * 11);
    return { w, bullets, sents, target };
  }
  function styleLine(text, q) {
    const s = styleInfo(text, q);
    const parts = [`${s.w} Wörter`, `${s.sents} Sätze`, `Richtwert ≈ ${s.target}+ Wörter`];
    let warn = "";
    if (s.bullets > 1) warn = `<span class="warn">⚠ Stichpunkte erkannt – in der Klausur in ganzen Sätzen antworten!</span>`;
    else if (s.w > 20 && s.sents && s.w / s.sents < 6) warn = `<span class="warn">⚠ Sehr kurze Satzfragmente – formuliere ganze Sätze.</span>`;
    else if (s.w >= s.target) warn = `<span class="good">✓ Umfang passt</span>`;
    return parts.map((p) => `<span>${p}</span>`).join("") + warn;
  }
  function grade(p) {
    if (p >= 87.5) return ["Sehr gut", 1]; if (p >= 75) return ["Gut", 2]; if (p >= 62.5) return ["Befriedigend", 3]; if (p >= 50) return ["Genügend", 4]; return ["Nicht genügend", 5];
  }
  function recordQ(id, frac) {
    const s = LS("qstats", {}); const o = s[id] || { n: 0, best: 0 };
    o.n++; o.best = Math.max(o.best, frac); o.last = frac; s[id] = o; SS("qstats", s);
  }
  let examTick = null;
  function viewPruefung(a, b) {
    clearInterval(examTick);
    const ex = LS("exam", null);
    if (a === "frage" && b && frById[b]) return practice([b], 0);
    if (a === "sicher") return practice(FR.filter((q) => q.sicher).map((q) => q.id), 0);
    if (a === "kapitel" && kapById[b]) return practice(shuffle(FR.filter((q) => q.kap === b).map((q) => q.id)), 0);
    if (ex && !ex.finished) return runExam();
    if (ex && ex.finished && a === "ergebnis") return results();
    setupExam();
  }
  function setupExam() {
    const hist = LS("hist", []);
    const cfg = LS("examCfg", { mode: "sim", n: 5, dur: 75, bri: true, kaps: KAP.filter((k) => k.prio !== "-").map((k) => k.id) });
    main.innerHTML = `<div class="exam">
      <div class="panel">
        <span class="eyebrow">Prüfungsmodus</span>
        <h2>Klausur wie echt: offene Fragen, ganze Sätze, Zeitdruck</h2>
        <p class="lede">Die Klausur dauert 60–90 Minuten, hat <b>keine Multiple-Choice-Fragen</b> und verlangt Antworten <b>in ganzen Sätzen</b>. Nach dem Abgeben vergleichst du deine Antwort mit dem Erwartungshorizont; die Seite markiert erkannte Punkte vor – du entscheidest selbst, ob sie wirklich erfüllt sind.</p>
        <div class="modes">
          <button class="mode" data-m="sim" aria-pressed="${cfg.mode === "sim"}"><b>🕒 Klausursimulation</b><small>Mehrere Fragen, Timer, Auswertung mit Note am Ende.</small></button>
          <button class="mode" data-m="practice" aria-pressed="${cfg.mode === "practice"}"><b>✍️ Übungsmodus</b><small>Eine Frage nach der anderen, sofortiges Feedback mit Musterantwort.</small></button>
          <button class="mode" data-m="sicher" aria-pressed="${cfg.mode === "sicher"}"><b>⭐ Sichere Fragen</b><small>Die 5 Fragen, die laut Professor sicher kommen – inkl. Belt and Road.</small></button>
        </div>
        <div class="opts">
          <div class="opt" data-for="sim"><span class="lbl">Dauer</span><div class="seg" id="o-dur">${[60, 75, 90].map((m) => `<button data-v="${m}" aria-pressed="${cfg.dur === m}">${m} min</button>`).join("")}</div></div>
          <div class="opt" data-for="sim"><span class="lbl">Anzahl Fragen</span><div class="seg" id="o-n">${[3, 4, 5, 6, 8].map((m) => `<button data-v="${m}" aria-pressed="${cfg.n === m}">${m}</button>`).join("")}</div><span class="hint">Pro 10 Punkte ca. 12–15 Minuten einplanen.</span></div>
          <div class="opt" data-for="sim"><span class="lbl">Belt and Road</span><label class="tick"><input type="checkbox" id="o-bri" ${cfg.bri ? "checked" : ""}> immer dabei (kommt sicher)</label></div>
          <div class="opt" data-for="sim practice" style="grid-column:1/-1"><span class="lbl">Kapitel</span><div class="ticks">${KAP.map((k) => `<label class="tick" style="--kc:${kc(k.id)}"><input type="checkbox" value="${k.id}" ${cfg.kaps.includes(k.id) ? "checked" : ""}> ${k.nr} · ${esc(k.short)} <span class="empty" style="font-size:11px">${FR.filter((q) => q.kap === k.id).length}</span></label>`).join("")}</div></div>
        </div>
        <div class="startbar"><span class="sum" id="o-sum"></span><button class="btn accent" id="o-go">Los geht’s →</button></div>
      </div>
      ${hist.length ? `<div class="panel"><h3>Bisherige Simulationen</h3><div class="hist">${hist.slice().reverse().slice(0, 10).map((h) => `<div class="hrow"><span class="d">${new Date(h.t).toLocaleDateString("de-AT")}</span><div class="bar"><i style="width:${h.pct}%;--kc:${h.pct >= 50 ? "var(--ok)" : "var(--bad)"}"></i></div><b>${Math.round(h.pct)} %</b><span class="gx">${grade(h.pct)[0]} (${h.n} Fragen)</span></div>`).join("")}</div></div>` : ""}
      <div class="panel"><h3>Alle ${FR.length} Fragen im Pool</h3><div class="qa">${KAP.map((k) => FR.filter((q) => q.kap === k.id).map((q) => `<a class="chip" style="display:block;border-left:5px solid ${kc(k.id)};border-radius:8px;padding:8px 12px" href="#/pruefung/frage/${q.id}">${q.sicher ? "⭐ " : ""}${esc(q.q)} <span class="empty">· ${maxPts(q)} P.</span></a>`).join("")).join("")}</div></div>
    </div>`;
    const save = () => SS("examCfg", cfg);
    const upd = () => {
      $$(".mode").forEach((m) => m.setAttribute("aria-pressed", m.dataset.m === cfg.mode));
      $$(".opt").forEach((o) => (o.style.display = o.dataset.for.split(" ").includes(cfg.mode) ? "" : "none"));
      const pool = FR.filter((q) => cfg.kaps.includes(q.kap));
      $("#o-sum").textContent = cfg.mode === "sim" ? `${cfg.n} Fragen · ${cfg.dur} Minuten · Pool: ${pool.length} Fragen` : cfg.mode === "sicher" ? "5 sichere Fragen nacheinander" : `Übung mit ${pool.length} Fragen aus ${cfg.kaps.length} Kapiteln`;
      save();
    };
    $$(".mode").forEach((m) => (m.onclick = () => { cfg.mode = m.dataset.m; upd(); }));
    $$("#o-dur button").forEach((x) => (x.onclick = () => { cfg.dur = +x.dataset.v; $$("#o-dur button").forEach((y) => y.setAttribute("aria-pressed", y === x)); upd(); }));
    $$("#o-n button").forEach((x) => (x.onclick = () => { cfg.n = +x.dataset.v; $$("#o-n button").forEach((y) => y.setAttribute("aria-pressed", y === x)); upd(); }));
    $("#o-bri").onchange = (e) => { cfg.bri = e.target.checked; upd(); };
    $$(".ticks input").forEach((c) => (c.onchange = () => { cfg.kaps = $$(".ticks input").filter((x) => x.checked).map((x) => x.value); upd(); }));
    $("#o-go").onclick = () => {
      if (cfg.mode === "sicher") { location.hash = "#/pruefung/sicher"; return; }
      let pool = FR.filter((q) => cfg.kaps.includes(q.kap));
      if (!pool.length) pool = FR.slice();
      if (cfg.mode === "practice") { practice(shuffle(pool.map((q) => q.id)), 0); return; }
      const pick = [];
      if (cfg.bri) pick.push("q-bri");
      shuffle(FR.filter((q) => q.sicher && !pick.includes(q.id))).slice(0, Math.max(0, Math.ceil(cfg.n / 2) - pick.length)).forEach((q) => pick.push(q.id));
      const rest = shuffle(pool.filter((q) => !pick.includes(q.id)));
      rest.sort((x, y) => (kapById[y.kap].prio === "S") - (kapById[x.kap].prio === "S"));
      shuffle(rest.slice(0, cfg.n * 2)).forEach((q) => { if (pick.length < cfg.n) pick.push(q.id); });
      SS("exam", { qs: shuffle(pick), ans: {}, flags: {}, cur: 0, start: Date.now(), dur: cfg.dur, finished: false, marks: {} });
      runExam();
    };
    upd();
  }
  function runExam() {
    const ex = LS("exam", null);
    if (!ex) return setupExam();
    const qs = ex.qs.map((id) => frById[id]);
    const total = qs.reduce((a, q) => a + maxPts(q), 0);
    const draw = () => {
      const q = qs[ex.cur];
      const recMin = Math.round((maxPts(q) / total) * ex.dur);
      main.innerHTML = `<div class="exam"><div class="panel">
        <div class="qhead"><span class="qn">Frage ${ex.cur + 1} von ${qs.length}</span><span class="badge U">Kapitel ${kapById[q.kap].nr}</span><span class="badge N">${maxPts(q)} Punkte · ca. ${recMin} min</span><span class="timer" id="timer">–:–</span></div>
        <p class="qtext">${esc(q.q)}</p>
        <textarea class="answer" id="ans" placeholder="Antworte in ganzen Sätzen: Definition → Erklärung → Beispiele mit Zahlen → Bewertung …" spellcheck="true">${esc(ex.ans[q.id] || "")}</textarea>
        <div class="wstat" id="wstat"></div>
        <div class="qnav"><div class="qmap">${qs.map((x, i) => `<button class="${(ex.ans[x.id] || "").trim() ? "done" : ""} ${i === ex.cur ? "cur" : ""} ${ex.flags[x.id] ? "flag" : ""}" data-i="${i}" aria-label="Frage ${i + 1}">${i + 1}</button>`).join("")}</div>
          <div class="row"><button class="btn sm" id="flag">${ex.flags[q.id] ? "⚑ Markierung entfernen" : "⚐ Markieren"}</button><button class="btn" id="prev" ${ex.cur === 0 ? "disabled" : ""}>←</button><button class="btn" id="next" ${ex.cur === qs.length - 1 ? "disabled" : ""}>→</button><button class="btn accent" id="submit">Abgeben</button></div></div>
        <div id="conf"></div></div>
        <p class="empty" style="text-align:center">Deine Antworten werden automatisch in diesem Browser gespeichert – du kannst die Seite schließen und später weitermachen.</p></div>`;
      const ta = $("#ans");
      const st = () => ($("#wstat").innerHTML = styleLine(ta.value, q));
      st();
      ta.oninput = () => { ex.ans[q.id] = ta.value; SS("exam", ex); st(); $$(".qmap button")[ex.cur].classList.toggle("done", !!ta.value.trim()); };
      ta.focus();
      $$(".qmap button").forEach((b) => (b.onclick = () => { ex.cur = +b.dataset.i; SS("exam", ex); draw(); }));
      $("#prev").onclick = () => { ex.cur--; SS("exam", ex); draw(); };
      $("#next").onclick = () => { ex.cur++; SS("exam", ex); draw(); };
      $("#flag").onclick = () => { ex.flags[q.id] = !ex.flags[q.id]; SS("exam", ex); draw(); };
      $("#submit").onclick = () => {
        const open = qs.filter((x) => !(ex.ans[x.id] || "").trim()).length;
        $("#conf").innerHTML = `<div class="confirm"><b>${open ? `Noch ${open} Frage(n) unbeantwortet.` : "Alle Fragen beantwortet."} Wirklich abgeben?</b><div class="row"><button class="btn accent" id="really">Ja, abgeben und auswerten</button><button class="btn" id="nope">Weiterschreiben</button><button class="btn ghost" id="abort">Simulation abbrechen</button></div></div>`;
        $("#really").onclick = finishExam;
        $("#nope").onclick = () => ($("#conf").innerHTML = "");
        $("#abort").onclick = () => { SS("exam", null); clearInterval(examTick); setupExam(); };
      };
    };
    const tick = () => {
      const left = ex.start + ex.dur * 60000 - Date.now();
      const t = $("#timer");
      if (!t) return;
      if (left <= 0) { clearInterval(examTick); finishExam(true); return; }
      const m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
      t.textContent = `${m}:${String(s).padStart(2, "0")}`;
      t.classList.toggle("low", left < 5 * 60000);
    };
    function finishExam(timeout) {
      clearInterval(examTick);
      ex.finished = true; ex.end = Date.now(); ex.timeout = !!timeout;
      qs.forEach((q) => (ex.marks[q.id] = autoKP(q, ex.ans[q.id])));
      SS("exam", ex);
      const pts = qs.reduce((a, q) => a + ptsOf(q, ex.marks[q.id]), 0);
      const hist = LS("hist", []); hist.push({ t: Date.now(), pct: (pts / total) * 100, n: qs.length }); SS("hist", hist);
      ex.histIdx = hist.length - 1; SS("exam", ex);
      qs.forEach((q) => recordQ(q.id, ptsOf(q, ex.marks[q.id]) / maxPts(q)));
      location.hash = "#/pruefung/ergebnis";
    }
    draw();
    tick();
    examTick = setInterval(tick, 1000);
  }
  function evalBlock(q, text, marks, onChange, prefix) {
    const auto = autoKP(q, text);
    return `<div class="rv" data-q="${q.id}">
      <div class="rv-top"><span class="badge U">Kapitel ${kapById[q.kap].nr}</span>${q.sicher ? badge("K") : ""}<b>${esc(q.q)}</b><span class="sc" id="${prefix}-sc-${q.id}"></span></div>
      <div><span class="eyebrow">Deine Antwort</span><div class="youranswer ${text && text.trim() ? "" : "empty"}">${text && text.trim() ? esc(text) : "keine Antwort"}</div><div class="wstat" style="margin-top:6px">${styleLine(text, q)}</div></div>
      <div><span class="eyebrow">Erwartungshorizont – hake ab, was du wirklich erklärt hast</span>
      <ul class="kp">${q.kp.map((k, i) => `<li><label><input type="checkbox" data-i="${i}" ${marks[i] ? "checked" : ""}><span>${esc(k[0])}<span class="auto ${auto[i] ? "y" : "n"}">${auto[i] ? "erkannt" : "nicht erkannt"}</span></span><span class="pt">${k[1]} P.</span></label></li>`).join("")}</ul></div>
      <details><summary class="btn sm">Musterantwort in ganzen Sätzen anzeigen</summary><div class="model" style="margin-top:8px">${esc(q.model)}</div></details>
    </div>`;
  }
  function bindEval(root, q, marks, onChange, prefix) {
    const upd = () => { const p = ptsOf(q, marks), m = maxPts(q); const el = $(`#${prefix}-sc-${q.id}`); el.textContent = `${p} / ${m} P.`; const rv = el.closest(".rv"); rv.classList.remove("good", "mid", "low"); rv.classList.add(p / m >= 0.75 ? "good" : p / m >= 0.5 ? "mid" : "low"); };
    $$(`.rv[data-q="${q.id}"] .kp input`, root).forEach((c) => (c.onchange = () => { marks[+c.dataset.i] = c.checked; upd(); onChange && onChange(); }));
    upd();
  }
  function results() {
    const ex = LS("exam", null);
    if (!ex) return setupExam();
    const qs = ex.qs.map((id) => frById[id]);
    const total = qs.reduce((a, q) => a + maxPts(q), 0);
    main.innerHTML = `<div class="exam"><div class="panel" id="sumpanel"></div><div class="exam" id="rvlist">${qs.map((q) => evalBlock(q, ex.ans[q.id], ex.marks[q.id], null, "r")).join("")}</div>
      <div class="row" style="justify-content:center"><button class="btn accent" id="again">Neue Simulation</button><a class="btn" href="#/start">Zur Startseite</a></div></div>`;
    const sum = () => {
      const pts = qs.reduce((a, q) => a + ptsOf(q, ex.marks[q.id]), 0), pct = (pts / total) * 100, g = grade(pct);
      const used = Math.round(((ex.end || Date.now()) - ex.start) / 60000);
      const byK = {};
      qs.forEach((q) => { const o = (byK[q.kap] = byK[q.kap] || [0, 0]); o[0] += ptsOf(q, ex.marks[q.id]); o[1] += maxPts(q); });
      $("#sumpanel").innerHTML = `<div class="res-hero"><svg class="ring" viewBox="0 0 100 100" style="width:130px;height:130px"><circle class="tr" cx="50" cy="50" r="40"/><circle class="vl" cx="50" cy="50" r="40" stroke-dasharray="${(pct / 100) * 251.3} 251.3" style="stroke:${pct >= 50 ? "var(--ok)" : "var(--bad)"}"/><text x="50" y="57" text-anchor="middle" font-size="21">${Math.round(pct)}%</text></svg>
        <div class="grade"><span class="eyebrow">Geschätzte Note${ex.timeout ? " · Zeit abgelaufen" : ""}</span><div class="g">${g[0]} (${g[1]})</div>
        <div class="stats"><div class="stat"><b>${pts} / ${total}</b><small>Punkte</small></div><div class="stat"><b>${used} / ${ex.dur}</b><small>Minuten</small></div><div class="stat"><b>${qs.length}</b><small>Fragen</small></div></div>
        <p class="empty" style="margin:0">Notenschlüssel zur Orientierung: ab 87,5 % Sehr gut · 75 % Gut · 62,5 % Befriedigend · 50 % Genügend. Die Haken unten sind vorausgefüllt – korrigiere sie ehrlich, die Note rechnet sofort neu.</p></div></div>
        <div class="grid g2">${Object.entries(byK).map(([k, [p, m]]) => `<div><div class="row" style="justify-content:space-between;font-family:var(--f-display);font-size:14px"><span><span class="kdot" style="--kc:${kc(k)}"></span> Kapitel ${kapById[k].nr} · ${esc(kapById[k].short)}</span><b>${p}/${m}</b></div><div class="bar" style="--kc:${kc(k)}"><i style="width:${(p / m) * 100}%"></i></div></div>`).join("")}</div>`;
      const hist = LS("hist", []); if (ex.histIdx != null && hist[ex.histIdx]) { hist[ex.histIdx].pct = pct; SS("hist", hist); }
      SS("exam", ex);
    };
    qs.forEach((q) => bindEval(main, q, ex.marks[q.id], () => { sum(); recordQ(q.id, ptsOf(q, ex.marks[q.id]) / maxPts(q)); }, "r"));
    sum();
    $("#again").onclick = () => { SS("exam", null); location.hash = "#/pruefung"; setupExam(); };
  }
  function practice(ids, i) {
    const q = frById[ids[i]];
    const drafts = LS("drafts", {});
    main.innerHTML = `<div class="exam"><div class="row"><a class="btn sm ghost" href="#/pruefung">← Prüfungsmodus</a><span class="empty">Übung · Frage ${i + 1} von ${ids.length}</span></div>
      <div class="panel" id="pp">
        <div class="qhead"><span class="badge U">Kapitel ${kapById[q.kap].nr}</span>${q.sicher ? badge("K") : ""}<span class="badge N">${maxPts(q)} Punkte · ca. ${Math.round(maxPts(q) * 1.4)} min</span></div>
        <p class="qtext">${esc(q.q)}</p>
        <textarea class="answer" id="ans" placeholder="Antworte in ganzen Sätzen …">${esc(drafts[q.id] || "")}</textarea>
        <div class="wstat" id="wstat"></div>
        <div class="row"><button class="btn accent" id="check">Antwort auswerten</button><button class="btn" id="skip">${i < ids.length - 1 ? "Überspringen →" : "Fertig"}</button><span class="empty">Tipp: erst ohne Hilfe schreiben, dann auswerten.</span></div>
      </div><div id="fb"></div></div>`;
    const ta = $("#ans");
    const st = () => ($("#wstat").innerHTML = styleLine(ta.value, q));
    st();
    ta.oninput = () => { const d = LS("drafts", {}); d[q.id] = ta.value; SS("drafts", d); st(); };
    const next = () => (i < ids.length - 1 ? practice(ids, i + 1) : (location.hash = "#/pruefung"));
    $("#skip").onclick = next;
    $("#check").onclick = () => {
      const marks = autoKP(q, ta.value);
      $("#fb").innerHTML = evalBlock(q, ta.value, marks, null, "p") + `<div class="row" style="justify-content:center;margin-top:14px"><button class="btn" id="retry">Überarbeiten</button>${i < ids.length - 1 ? `<button class="btn primary" id="nx">Nächste Frage →</button>` : `<a class="btn primary" href="#/pruefung">Fertig</a>`}</div>`;
      bindEval($("#fb"), q, marks, () => recordQ(q.id, ptsOf(q, marks) / maxPts(q)), "p");
      recordQ(q.id, ptsOf(q, marks) / maxPts(q));
      $("#fb").scrollIntoView({ behavior: "smooth", block: "start" });
      $("#retry").onclick = () => { $("#fb").innerHTML = ""; ta.focus(); };
      if ($("#nx")) $("#nx").onclick = next;
    };
  }

  /* ================= Glossar ================= */
  function viewGlossar() {
    const params = new URLSearchParams(location.hash.split("?")[1] || "");
    const want = params.get("t");
    let filt = "", kf = "all";
    main.innerHTML = `<div class="k-head" style="--kc:var(--brand-2)"><span class="eyebrow">Glossar</span><h1>${GL.length} Fachbegriffe von A bis Z</h1><p class="lede">Alle Begriffe aus der Randspalte des Lernbuchs plus die Verkehrsbegriffe aus dem Anhang. Im Lerntext sind sie unterstrichen – antippen zeigt die Erklärung.</p></div>
      <div class="card" style="margin-top:18px;display:grid;gap:12px;position:sticky;top:70px;z-index:5">
        <div class="gl-tools"><input type="search" id="gq" placeholder="Begriff suchen, z. B. TEU, Cluster, Taylorismus …"><a class="btn" href="#/karten">Als Lernkarten üben</a></div>
        <div class="row"><div class="seg" id="gk"><button data-k="all" aria-pressed="true">Alle</button>${KAP.map((k) => `<button data-k="${k.nr}">Kap. ${k.nr}</button>`).join("")}<button data-k="V">Verkehr</button></div></div>
        <div class="az" id="az"></div>
      </div><div class="gl-list" id="gl" style="margin-top:16px"></div>`;
    const draw = () => {
      const f = filt.toLowerCase();
      const items = GL.filter((g) => (kf === "all" || g.k === kf) && (!f || g.n.includes(f) || g.d.toLowerCase().includes(f))).sort((a, b) => a.t.localeCompare(b.t, "de"));
      let html = "", last = "";
      items.forEach((g) => {
        const L = g.t[0].toUpperCase().replace(/[ÄÖÜ]/, (c) => ({ Ä: "A", Ö: "O", Ü: "U" }[c]));
        if (L !== last) { html += `<div class="gl-letter" id="L-${L}">${L}</div>`; last = L; }
        const kk = g.k === "V" ? null : "k" + g.k;
        html += `<div class="gl-item" id="g-${slug(g.t)}" style="--kc:${kk ? kc(kk) : "var(--muted)"}"><span class="k">${g.k === "V" ? "Verkehrsbegriff" : `Kapitel ${g.k}`}</span><b>${esc(g.t)}</b><p>${esc(g.d)}</p></div>`;
      });
      $("#gl").innerHTML = html || `<p class="empty">Kein Begriff gefunden.</p>`;
      const letters = [...new Set(items.map((g) => g.t[0].toUpperCase().replace(/[ÄÖÜ]/, (c) => ({ Ä: "A", Ö: "O", Ü: "U" }[c]))))];
      $("#az").innerHTML = letters.map((l) => `<a href="#" data-l="${l}">${l}</a>`).join("");
      $$("#az a").forEach((a) => (a.onclick = (e) => { e.preventDefault(); $("#L-" + a.dataset.l).scrollIntoView({ behavior: "smooth" }); }));
    };
    $("#gq").oninput = (e) => { filt = e.target.value; draw(); };
    $$("#gk button").forEach((b) => (b.onclick = () => { kf = b.dataset.k; $$("#gk button").forEach((x) => x.setAttribute("aria-pressed", x === b)); draw(); }));
    draw();
    if (want) { const el = document.getElementById("g-" + slug(want)); if (el) setTimeout(() => { el.scrollIntoView({ block: "center" }); el.classList.add("flash"); }, 60); }
  }
  const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-");

  /* ================= Glossar-Popover ================= */
  const pop = $("#gl-pop");
  function hidePop() { pop.hidden = true; }
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".gl");
    if (b) {
      const g = GL.find((x) => x.t === b.dataset.gl);
      if (!g) return;
      pop.innerHTML = `<b>${esc(g.t)}</b><p style="margin:4px 0 8px">${esc(g.d)}</p><small>${g.k === "V" ? "Verkehrsbegriff" : "erklärt in Kapitel " + g.k}</small> · <a href="#/glossar?t=${encodeURIComponent(g.t)}">im Glossar</a>`;
      pop.hidden = false;
      const r = b.getBoundingClientRect(), w = Math.min(340, window.innerWidth - 24);
      pop.style.width = w + "px";
      pop.style.left = Math.max(12, Math.min(window.innerWidth - w - 12, r.left)) + "px";
      const ph = pop.offsetHeight;
      pop.style.top = (r.bottom + ph + 12 < window.innerHeight ? r.bottom + 8 : Math.max(12, r.top - ph - 8)) + "px";
      e.stopPropagation();
      return;
    }
    if (!e.target.closest("#gl-pop")) hidePop();
  });
  window.addEventListener("scroll", hidePop, { passive: true });
  document.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("gl")) { e.preventDefault(); e.target.click(); } });

  /* ================= Lernkarten (Leitner) ================= */
  function viewKarten() {
    const deckCfg = LS("fcCfg", { deck: "glossar", kap: "prio" });
    const prioK = KAP.filter((k) => k.prio !== "-").map((k) => k.nr);
    const cards = () => {
      if (deckCfg.deck === "fragen") return KAP.flatMap((k) => k.fragen.map(([q, a], i) => ({ id: `kf:${k.id}:${i}`, f: q, b: a, k: k.id, tag: `Kontrollfrage · Kapitel ${k.nr}` }))).filter((c) => deckCfg.kap === "all" || deckCfg.kap === "prio" ? (deckCfg.kap === "all" || prioK.includes(kapById[c.k].nr)) : c.k === "k" + deckCfg.kap);
      return GL.filter((g) => deckCfg.kap === "all" || (deckCfg.kap === "prio" ? prioK.includes(g.k) || g.k === "V" : g.k === deckCfg.kap)).map((g) => ({ id: "gl:" + g.t, f: g.t, b: g.d, k: g.k === "V" ? null : "k" + g.k, tag: g.k === "V" ? "Verkehrsbegriff" : `Kapitel ${g.k}` }));
    };
    let boxes = LS("fc", {});
    let queue = [], idx = 0, flipped = false, got = 0, missed = 0;
    const build = () => {
      const all = cards();
      const w = (c) => boxes[c.id] || 1;
      queue = shuffle(all).sort((a, b) => w(a) - w(b)).slice(0, 20);
      idx = 0; got = 0; missed = 0;
    };
    main.innerHTML = `<div class="fc-wrap"><div class="k-head" style="--kc:var(--accent)"><span class="eyebrow">Lernkarten</span><h1>Karteikasten nach Leitner</h1><p class="lede">Karte antippen zum Umdrehen. „Gewusst“ schiebt sie ein Fach weiter, „Nochmal“ zurück ins erste Fach. Karten in niedrigen Fächern kommen öfter.</p></div>
      <div class="card" style="display:grid;gap:10px"><div class="row"><div class="seg" id="fd"><button data-d="glossar" aria-pressed="${deckCfg.deck === "glossar"}">Begriffe (Glossar)</button><button data-d="fragen" aria-pressed="${deckCfg.deck === "fragen"}">Kontrollfragen</button></div>
      <select id="fk" class="btn sm"><option value="prio">nur Schwerpunkt-Kapitel</option><option value="all">alle Kapitel</option>${KAP.map((k) => `<option value="${k.nr}">Kapitel ${k.nr}</option>`).join("")}</select></div>
      <div class="boxes" id="bx"></div></div>
      <div id="stage"></div></div>`;
    $("#fk").value = deckCfg.kap;
    const drawBoxes = () => {
      const all = cards(), cnt = [0, 0, 0, 0, 0];
      all.forEach((c) => cnt[Math.min(5, boxes[c.id] || 1) - 1]++);
      $("#bx").innerHTML = cnt.map((n, i) => `<div><b>${n}</b><small>Fach ${i + 1}</small></div>`).join("");
    };
    const draw = () => {
      drawBoxes();
      if (idx >= queue.length) {
        $("#stage").innerHTML = `<div class="card" style="text-align:center;display:grid;gap:10px;justify-items:center"><h3 style="font-size:22px">Runde geschafft!</h3><p class="lede">${got} gewusst · ${missed} nochmal</p><button class="btn accent" id="again">Neue Runde</button></div>`;
        $("#again").onclick = () => { build(); draw(); };
        return;
      }
      const c = queue[idx];
      flipped = false;
      $("#stage").innerHTML = `<div class="fc" id="fc" tabindex="0" style="--kc:${c.k ? kc(c.k) : "var(--muted)"}"><div class="fc-in">
        <div class="fc-face"><small>${esc(c.tag)} · Fach ${boxes[c.id] || 1}</small><h3>${esc(c.f)}</h3><small>antippen oder Leertaste zum Umdrehen</small></div>
        <div class="fc-face back"><small>${esc(c.f)}</small><p>${inline(c.b)}</p></div></div></div>
        <div class="row" style="justify-content:center;margin-top:14px"><span class="empty">${idx + 1} / ${queue.length}</span><button class="btn" id="no">✗ Nochmal</button><button class="btn primary" id="yes">✓ Gewusst</button></div>`;
      const fc = $("#fc");
      const flip = () => { flipped = !flipped; fc.classList.toggle("flip", flipped); };
      fc.onclick = (e) => { if (!e.target.closest(".gl")) flip(); };
      fc.onkeydown = (e) => { if (e.key === " ") { e.preventDefault(); flip(); } };
      fc.focus();
      $("#yes").onclick = () => { boxes[c.id] = Math.min(5, (boxes[c.id] || 1) + 1); SS("fc", boxes); got++; idx++; draw(); };
      $("#no").onclick = () => { boxes[c.id] = 1; SS("fc", boxes); missed++; idx++; draw(); };
    };
    $$("#fd button").forEach((b) => (b.onclick = () => { deckCfg.deck = b.dataset.d; SS("fcCfg", deckCfg); $$("#fd button").forEach((x) => x.setAttribute("aria-pressed", x === b)); build(); draw(); }));
    $("#fk").onchange = (e) => { deckCfg.kap = e.target.value; SS("fcCfg", deckCfg); build(); draw(); };
    build(); draw();
  }

  /* ================= Labor ================= */
  function viewLabor(tool) {
    const tools = LAB.list;
    const t = tools.find((x) => x.id === tool) || tools[0];
    main.innerHTML = `<div class="k-head" style="--kc:var(--k3)"><span class="eyebrow">Labor</span><h1>Modelle zum Anfassen</h1><p class="lede">Probiere die Theorien selbst aus – wer an den Reglern dreht, versteht, warum die Modelle so funktionieren.</p></div>
      <div class="lab-tabs" style="margin:18px 0">${tools.map((x) => `<a class="btn ${x.id === t.id ? "primary" : ""}" href="#/labor/${x.id}">${esc(x.t)}</a>`).join("")}</div>
      <div id="labroot"></div>`;
    t.mount($("#labroot"));
  }

  /* ================= Klausur-Kompass ================= */
  function viewKompass() {
    const L = (k, s, t) => `<a href="#/kapitel/${k}${s != null ? "/" + s : ""}">${t}</a>`;
    main.innerHTML = `<div class="k-head" style="--kc:var(--accent)"><span class="eyebrow">Klausur-Kompass</span><h1>Was kommt dran – und wie schreibe ich die Antwort?</h1>
      <p class="lede">Die Hinweise des Professors, übersetzt in einen Lernplan. Grundregel: <b>Schwerpunkte gründlich, Überblicks-Kapitel im Großen, sichere Fragen auswendig strukturieren.</b></p></div>
      <div class="grid g2" style="margin-top:20px">
        <div class="card" style="display:grid;gap:10px"><h3>Format der Klausur</h3>
          <div class="row"><span class="chip">⏱ 60–90 Minuten</span><span class="chip">✍️ offene Fragen</span><span class="chip">🚫 kein Multiple Choice</span><span class="chip">📝 ganze Sätze</span></div>
          <h3 style="margin-top:6px">Sicher dabei</h3>
          <ul style="margin:0;padding-left:20px;display:grid;gap:4px">
            <li><b>Belt and Road</b> (Neue Seidenstraße) – ${L("k5", 4, "Kapitel 5.4")} · <a href="#/film/f14">Film</a></li>
            <li>Kennzeichen der Globalisierung – ${L("k3", 0, "3.1")}/${L("k3", 1, "3.2")}</li>
            <li>Gründe für die Hyperglobalisierung – ${L("k3", 1, "3.2")}</li>
            <li>Warum ist der Welthandel 2008/09 eingebrochen? – ${L("k3", 1, "3.2")}/${L("k3", 2, "3.3")}</li>
            <li>Aufstieg Irlands – ${L("k4", 2, "4.3")} · <a href="#/film/f12">Film</a></li></ul>
          <a class="btn accent" href="#/pruefung/sicher" style="justify-self:start">Diese 5 jetzt üben →</a></div>
        <div class="card" style="display:grid;gap:10px"><h3>Antwort-Rezept für offene Fragen</h3>
          <ol class="recipe"><li><span><b>Einstieg mit Definition</b> – ein Satz, der den Begriff sauber erklärt (wer, was, wann).</span></li>
            <li><span><b>Gliedern</b> – „Erstens … Zweitens … Drittens …“ – aber in ganzen Sätzen, nicht als Stichpunkte.</span></li>
            <li><span><b>Konkret werden</b> – Zahlen, Jahreszahlen, Orte, Beispiele (Piräus 2016, Irland 63 %, 1.500 → 300 USD …).</span></li>
            <li><span><b>Zusammenhänge zeigen</b> – Theorie verknüpfen (Zentrum–Peripherie, Postfordismus, Produktlebenszyklus).</span></li>
            <li><span><b>Bewerten</b> – Chancen und Kritik, aktueller Bezug (Ukraine-Krieg, Zölle 2025, Iran-Krieg 2026).</span></li></ol>
          <p class="empty" style="margin:0">Richtwert: pro 10 Punkte etwa 110–150 Wörter in 6–10 Sätzen.</p></div>
      </div>
      <div class="sec-h"><h2>Schwerpunkte laut Professor</h2></div>
      <div class="tblw prio-tbl"><table><thead><tr><th>Thema</th><th>Gewicht</th><th>Wo im Lernbuch</th></tr></thead><tbody>
        ${[["Große und kleine Theorien: Grand Theory, Fordismus, Postfordismus", "S", L("k2", 0, "2.1") + ", " + L("k2", 1, "2.2") + ", " + L("k2", 2, "2.3")],
           ["Kapitel 2.3 bis Seite 21 (Fordismus, Formation des Postfordismus, Krise)", "S", L("k2", 2, "2.3")],
           ["2.4 Regionale Wachstums- und Entwicklungsmodelle (Gleichgewicht, Polarisation, Z-P, Wallerstein, Integration, Krugman)", "S", L("k2", 3, "2.4")],
           ["2.5 Christaller · 2.6 Hägerstrand", "S", L("k2", 4, "2.5") + ", " + L("k2", 5, "2.6")],
           ["3.2 Globalisierung allgemein", "S", L("k3", 1, "3.2")],
           ["Seefracht im Detail", "S", L("k3", 2, "3.3") + " · <a href='#/film/f8'>Film</a>"],
           ["3.3 Covid – was hat Politik mit Logistik und Wirtschaft zu tun?", "S", L("k3", 2, "3.3") + " · <a href='#/film/f9'>Film</a>"],
           ["Digitalisierung als Wirtschaftstrend", "S", L("k3", 2, "3.3")],
           ["Kapitel 4, besonders 4.3 · Peripherie vs. Zentrum", "S", L("k4", 0, "4.1") + ", " + L("k4", 2, "4.3")],
           ["Kapitel 5 (China, Indien, Landbrücken, BRI)", "S", L("k5", null, "Kapitel 5")],
           ["Kapitel 6 (MOE, Transformation, Wien)", "S", L("k6", null, "Kapitel 6")],
           ["Im Überblick: 3.3 und 4.2", "U", L("k3", 2, "3.3") + ", " + L("k4", 1, "4.2")],
           ["Nicht genannt: Kapitel 1, 2.7 Demografischer Übergang", "-", L("k1", null, "Kapitel 1") + ", " + L("k2", 6, "2.7")]]
          .map(([t, p, w]) => `<tr><td data-l="Thema">${t}</td><td data-l="Gewicht">${badge(p)}</td><td data-l="Wo">${w}</td></tr>`).join("")}
      </tbody></table></div>
      <div class="sec-h"><h2>Lernplan für 7 Tage</h2><span class="empty">anpassbar – Hauptsache, jeder Schwerpunkt kommt zweimal dran</span></div>
      <div class="plan">${[["Tag 1", ["Film „Regulationstheorie“", "Kapitel 2.1–2.3 lesen", "Lernkarten Kap. 2"]], ["Tag 2", ["Filme „Zentrum und Peripherie“, „Christaller“, „Hägerstrand“", "Kapitel 2.4–2.6", "Labor: Christaller + Hägerstrand"]], ["Tag 3", ["Film „Globalisierung“ + „Seefracht“", "Kapitel 3 komplett", "3 sichere Fragen schreiben (Kennzeichen, Hyper, 2008/09)"]], ["Tag 4", ["Film „Covid, Politik, Digitalisierung“", "Kapitel 4.1 + 4.3, Überblick 4.2", "Irland-Frage schreiben"]], ["Tag 5", ["Filme „China & Indien“ + „Belt and Road“", "Kapitel 5", "BRI-Frage schreiben – zweimal!"]], ["Tag 6", ["Film „Mittel- und Osteuropa“", "Kapitel 6", "Lernkarten: Kontrollfragen"]], ["Tag 7", ["Klausursimulation 90 min", "Schwächen gezielt wiederholen", "Zeitleiste durchgehen"]]]
        .map(([d, l]) => `<div class="day"><b>${d}</b><ul>${l.map((x) => `<li>${x}</li>`).join("")}</ul></div>`).join("")}</div>
      <div class="sec-h"><h2>Zeitleiste zum Auswendiglernen</h2></div>
      ${figHTML("zeitleiste")}`;
  }

  /* ================= Suche ================= */
  let IDX = null;
  function buildIndex() {
    IDX = [];
    KAP.forEach((k) => sections(k).forEach((s) => IDX.push({ kind: `Kapitel ${k.nr}`, t: `${s.nr} ${s.title}`, x: s.plain, href: `#/kapitel/${k.id}/${s.idx}` })));
    GL.forEach((g) => IDX.push({ kind: "Glossar", t: g.t, x: g.d, href: `#/glossar?t=${encodeURIComponent(g.t)}` }));
    FILMS.forEach((f) => IDX.push({ kind: "Film", t: f.t, x: f.scenes.map((s) => s.h + " " + s.say.join(" ")).join(" "), href: `#/film/${f.id}` }));
    FR.forEach((q) => IDX.push({ kind: "Prüfungsfrage", t: q.q, x: q.model, href: `#/pruefung/frage/${q.id}` }));
    IDX.forEach((e) => { e.tl = e.t.toLowerCase(); e.xl = e.x.toLowerCase(); });
  }
  function doSearch(qs) {
    if (!IDX) buildIndex();
    const w = qs.toLowerCase().split(/\s+/).filter((x) => x.length > 1);
    if (!w.length) return [];
    return IDX.map((e) => {
      let s = 0;
      for (const x of w) { const inT = e.tl.includes(x), inX = e.xl.includes(x); if (!inT && !inX) return null; s += (inT ? 10 : 0) + (inX ? 1 + Math.min(4, e.xl.split(x).length - 2) : 0); }
      if (e.kind === "Glossar" && e.tl.startsWith(w[0])) s += 8;
      return [s, e];
    }).filter(Boolean).sort((a, b) => b[0] - a[0]).slice(0, 14).map(([, e]) => {
      const i = e.xl.indexOf(w[0]);
      const snip = i >= 0 ? (i > 40 ? "… " : "") + e.x.slice(Math.max(0, i - 40), i + 120) + " …" : e.x.slice(0, 140);
      return { ...e, snip };
    });
  }
  const sbox = $("#search"), sin = $("#search-in"), sout = $("#search-out");
  function openSearch() { sbox.hidden = false; sin.value = ""; sout.innerHTML = `<p class="empty" style="padding:8px">Suche in Kapiteln, Glossar, Filmen und Prüfungsfragen.</p>`; setTimeout(() => sin.focus(), 10); }
  function closeSearch() { sbox.hidden = true; }
  $("#btn-search").onclick = openSearch;
  sbox.onclick = (e) => { if (e.target === sbox) closeSearch(); };
  sin.oninput = () => {
    const r = doSearch(sin.value);
    const hl = (s) => { let out = esc(s); sin.value.split(/\s+/).filter((x) => x.length > 1).forEach((x) => { out = out.replace(new RegExp(`(${x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"), "<mark>$1</mark>"); }); return out; };
    sout.innerHTML = r.length ? r.map((e, i) => `<a href="${e.href}" class="${i === 0 ? "act" : ""}"><span class="kind">${esc(e.kind)}</span><b>${hl(e.t)}</b><small>${hl(e.snip)}</small></a>`).join("") : `<p class="empty" style="padding:8px">Nichts gefunden.</p>`;
    $$("a", sout).forEach((a) => (a.onclick = closeSearch));
  };
  sin.onkeydown = (e) => { if (e.key === "Enter") { const a = $("a", sout); if (a) { location.hash = a.getAttribute("href"); closeSearch(); } } };
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); }
    if (e.key === "Escape") { closeSearch(); hidePop(); }
  });

  /* ================= Theme ================= */
  $("#btn-theme").onclick = () => {
    const cur = document.documentElement.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const nx = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nx);
    SS("theme", nx);
  };

  V.map.load();
  route();
})();
