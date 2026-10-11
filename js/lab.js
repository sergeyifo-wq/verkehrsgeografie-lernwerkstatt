/* Labor: interaktive Modelle (Christaller, Hägerstrand, Demografischer Übergang, Suez vs. Kap). */
(function () {
  const esc = V.esc, fmt = V.fmt;
  const R3 = Math.sqrt(3);

  /* ---------- 1. Christaller ---------- */
  function christaller(root) {
    let K = 3, sel = null, showLow = true;
    root.innerHTML = `<div class="lab"><div class="lab-stage"><svg id="cs" viewBox="0 0 760 560" role="img" aria-label="Sechsecknetz zentraler Orte"></svg></div>
      <div class="lab-ctl"><div class="card" style="display:grid;gap:12px">
        <b style="font-family:var(--f-display);font-size:18px">Theorie der zentralen Orte</b>
        <div class="seg" id="ck"><button data-k="3" aria-pressed="true">K = 3</button><button data-k="4">K = 4</button><button data-k="7">K = 7</button></div>
        <label class="tick"><input type="checkbox" id="clow" checked> Marktgebiete der unteren Stufe zeigen</label>
        <div class="lab-out" id="cout"></div>
        <p class="empty" style="margin:0;font-size:13.5px">Klicke auf einen orangen Ort höherer Stufe: Grün leuchten die Orte, die er mitversorgt.</p>
      </div></div></div>`;
    const svg = root.querySelector("#cs");
    const a = 46, W = 760, H = 560, ox = W / 2, oy = H / 2;
    const pts = [];
    for (let j = -8; j <= 8; j++) for (let i = -12; i <= 12; i++) {
      const x = ox + i * a + j * a / 2, y = oy + j * a * R3 / 2;
      if (x > -a && x < W + a && y > -a && y < H + a) pts.push({ i, j, x, y });
    }
    const mod = (n, m) => ((n % m) + m) % m;
    const isHigh = (p) => (K === 3 ? mod(p.i - p.j, 3) === 0 : K === 4 ? mod(p.i, 2) === 0 && mod(p.j, 2) === 0 : mod(p.i - 2 * p.j, 7) === 0);
    const hex = (x, y, r, rotDeg) => "M" + Array.from({ length: 6 }, (_, k) => { const t = ((rotDeg + 60 * k) * Math.PI) / 180; return `${(x + r * Math.cos(t)).toFixed(1)},${(y + r * Math.sin(t)).toFixed(1)}`; }).join("L") + "Z";
    const areaSpec = () => (K === 3 ? [a, 0] : K === 4 ? [(2 * a) / R3, 30] : [(Math.sqrt(7) * a) / R3, 30 + (Math.atan2(R3 / 2, 2.5) * 180) / Math.PI]);
    const info = {
      3: ["Versorgungs- (Markt-)prinzip", "Die Orte der unteren Stufe liegen auf den Ecken der großen Sechsecke – jeder wird zwischen drei Zentren geteilt.", "1 + 6 × ⅓ = 3"],
      4: ["Verkehrsprinzip", "Die Orte der unteren Stufe liegen auf den Kanten – also auf geraden Verkehrslinien zwischen zwei Zentren.", "1 + 6 × ½ = 4"],
      7: ["Verwaltungs- (Absonderungs-)prinzip", "Die Orte der unteren Stufe liegen ganz innerhalb – jeder gehört eindeutig zu einem Zentrum.", "1 + 6 × 1 = 7"]
    };
    function draw() {
      const [rA, rot] = areaSpec();
      let g = `<rect width="${W}" height="${H}" fill="var(--paper)"/>`;
      if (showLow) pts.forEach((p) => (g += `<path d="${hex(p.x, p.y, a / R3, 30)}" class="hx-cell"/>`));
      pts.filter(isHigh).forEach((p) => (g += `<path d="${hex(p.x, p.y, rA, rot)}" class="hx-area ${sel && sel.i === p.i && sel.j === p.j ? "sel" : ""}"/>`));
      const served = sel ? pts.filter((p) => Math.abs(Math.hypot(p.x - sel.x, p.y - sel.y) - a) < 1) : [];
      pts.forEach((p) => {
        if (isHigh(p)) return;
        const s = served.includes(p);
        g += `<circle cx="${p.x}" cy="${p.y}" r="${s ? 8 : 5}" class="${s ? "hx-served" : "hx-low"}"/>`;
      });
      pts.filter(isHigh).forEach((p) => (g += `<circle cx="${p.x}" cy="${p.y}" r="11" class="hx-high ${sel && sel.i === p.i && sel.j === p.j ? "sel" : ""}" data-i="${p.i}" data-j="${p.j}"><title>Ort höherer Stufe</title></circle>`));
      svg.innerHTML = g;
      svg.querySelectorAll(".hx-high").forEach((c) => (c.onclick = () => { sel = pts.find((p) => p.i === +c.dataset.i && p.j === +c.dataset.j); draw(); }));
      const [t, d, f] = info[K];
      root.querySelector("#cout").innerHTML = `<b>K = ${K} · ${t}</b><span>${d}</span><span class="mono" style="font-size:18px;color:var(--accent);font-weight:700">${f}</span>${sel ? `<span>Ausgewählter Ort versorgt <b>sich selbst</b> und <b>6 Orte</b> der unteren Stufe (grün) – ${K === 7 ? "ganz" : K === 4 ? "jeweils zur Hälfte" : "jeweils zu einem Drittel"}.</span>` : ""}`;
    }
    root.querySelectorAll("#ck button").forEach((b) => (b.onclick = () => { K = +b.dataset.k; sel = null; root.querySelectorAll("#ck button").forEach((x) => x.setAttribute("aria-pressed", x === b)); draw(); }));
    root.querySelector("#clow").onchange = (e) => { showLow = e.target.checked; draw(); };
    draw();
  }

  /* ---------- 2. Hägerstrand ---------- */
  function diffusion(root) {
    const N = 31, MIF = [[.0096, .0140, .0168, .0140, .0096], [.0140, .0301, .0547, .0301, .0140], [.0168, .0547, .4431, .0547, .0168], [.0140, .0301, .0547, .0301, .0140], [.0096, .0140, .0168, .0140, .0096]];
    const flat = []; let acc = 0;
    MIF.forEach((r, y) => r.forEach((p, x) => { acc += p; flat.push([acc, x - 2, y - 2]); }));
    let grid, gen, hist, timer = null, barrier = false, media = false, speed = 400;
    root.innerHTML = `<div class="lab"><div class="lab-stage"><svg id="ds" viewBox="0 0 620 620" role="img" aria-label="Diffusionssimulation"></svg>
        <svg id="dc" viewBox="0 0 620 170" style="margin-top:10px"></svg></div>
      <div class="lab-ctl"><div class="card" style="display:grid;gap:12px">
        <b style="font-family:var(--f-display);font-size:18px">Monte-Carlo-Simulation nach Hägerstrand</b>
        <div class="row"><button class="btn primary" id="dgo">▶ Start</button><button class="btn" id="dstep">+1 Generation</button><button class="btn" id="dreset">↺ Neu</button></div>
        <label>Tempo<input type="range" id="dspd" min="80" max="900" value="400" style="direction:rtl"></label>
        <label class="tick"><input type="checkbox" id="dbar"> Diffusionsbarriere (Fluss/Gebirge: nur 25 % kommen durch)</label>
        <label class="tick"><input type="checkbox" id="dmed"> Internet & Medien (zusätzliche Fernkontakte)</label>
        <div class="kpi"><div><b id="kg">0</b><small>Generation</small></div><div><b id="ka">1</b><small>Übernehmer</small></div><div><b id="kp">0 %</b><small>Anteil</small></div><div><b id="kn">–</b><small>neu in letzter Gen.</small></div></div>
        <div class="lab-out"><b>Was du sehen solltest</b><span>Jede:r Übernehmer:in erzählt pro Generation einer Person davon – meist in der Nähe (<b>mittleres Informationsfeld</b>: 44 % bleiben in der eigenen Zelle). So entsteht eine <b>Welle</b> und eine <b>S-Kurve</b> der Adoption. Barrieren bremsen, Medien beschleunigen und erzeugen „Sprünge“ (Relokation).</span></div>
      </div></div></div>`;
    const svg = root.querySelector("#ds"), chart = root.querySelector("#dc");
    const cs = 620 / N;
    const color = (g) => { if (g < 0) return "var(--paper)"; const t = Math.min(1, g / 22); return `hsl(${24 + t * 180}, ${80 - t * 25}%, ${48 + t * 18}%)`; };
    function reset() {
      grid = Array.from({ length: N }, () => Array(N).fill(-1));
      const c = (N - 1) / 2; grid[c][c] = 0; gen = 0; hist = [1];
      draw();
    }
    function step() {
      const adopters = [];
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (grid[y][x] >= 0) adopters.push([x, y]);
      let nw = 0;
      gen++;
      adopters.forEach(([x, y]) => {
        const r = Math.random(); const f = flat.find((e) => r <= e[0]) || flat[12];
        let tx = x + f[1], ty = y + f[2];
        if (media && Math.random() < 0.06) { tx = Math.floor(Math.random() * N); ty = Math.floor(Math.random() * N); }
        if (tx < 0 || ty < 0 || tx >= N || ty >= N) return;
        if (barrier) { const bx = 20; if ((x < bx) !== (tx < bx) && Math.random() > 0.25) return; }
        if (grid[ty][tx] < 0) { grid[ty][tx] = gen; nw++; }
      });
      hist.push(hist[hist.length - 1] + nw);
      draw(nw);
      if (hist[hist.length - 1] >= N * N || gen > 80) stop();
    }
    function draw(nw) {
      let g = "";
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) g += `<rect x="${x * cs}" y="${y * cs}" width="${cs - 1}" height="${cs - 1}" fill="${color(grid[y][x])}"/>`;
      if (barrier) g += `<rect x="${20 * cs - 3}" y="0" width="5" height="620" fill="var(--brand-2)" opacity=".7"/>`;
      g += `<circle cx="${((N - 1) / 2 + 0.5) * cs}" cy="${((N - 1) / 2 + 0.5) * cs}" r="6" fill="none" stroke="var(--ink)" stroke-width="2"/>`;
      svg.innerHTML = g;
      const tot = hist[hist.length - 1];
      root.querySelector("#kg").textContent = gen;
      root.querySelector("#ka").textContent = fmt(tot);
      root.querySelector("#kp").textContent = Math.round((tot / (N * N)) * 100) + " %";
      root.querySelector("#kn").textContent = nw == null ? "–" : fmt(nw);
      const W = 620, H = 170, L = 40, n = Math.max(20, hist.length - 1);
      const X = (i) => L + (i / n) * (W - L - 10), Y = (v) => H - 22 - (v / (N * N)) * (H - 34);
      const news = hist.map((v, i) => (i ? v - hist[i - 1] : v)), maxN = Math.max(1, ...news);
      let c = `<line x1="${L}" y1="${H - 22}" x2="${W - 10}" y2="${H - 22}" class="vaxis"/><text x="${L}" y="12" class="vt vsm vstrong">Kumulierte Übernehmer (S-Kurve) und neue Übernehmer je Generation</text>`;
      c += news.map((v, i) => `<rect x="${X(i) - 3}" y="${H - 22 - (v / maxN) * 60}" width="6" height="${(v / maxN) * 60}" fill="var(--v-s2)" opacity=".55"/>`).join("");
      c += `<polyline points="${hist.map((v, i) => `${X(i)},${Y(v)}`).join(" ")}" fill="none" stroke="var(--v-s1)" stroke-width="3"/>`;
      c += `<text x="${W - 12}" y="${H - 6}" text-anchor="end" class="vt vxs vmuted">Generation →</text>`;
      chart.innerHTML = c;
    }
    const stop = () => { clearInterval(timer); timer = null; root.querySelector("#dgo").textContent = "▶ Start"; };
    root.querySelector("#dgo").onclick = () => { if (timer) return stop(); root.querySelector("#dgo").textContent = "⏸ Pause"; timer = setInterval(step, speed); };
    root.querySelector("#dstep").onclick = step;
    root.querySelector("#dreset").onclick = () => { stop(); reset(); };
    root.querySelector("#dspd").oninput = (e) => { speed = +e.target.value; if (timer) { clearInterval(timer); timer = setInterval(step, speed); } };
    root.querySelector("#dbar").onchange = (e) => { barrier = e.target.checked; draw(); };
    root.querySelector("#dmed").onchange = (e) => (media = e.target.checked);
    window.addEventListener("hashchange", stop, { once: true });
    reset();
  }

  /* ---------- 3. Demografischer Übergang ---------- */
  function demografie(root) {
    const T = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const GR = [38, 38, 37.5, 37, 35, 30, 22, 15, 11, 10, 8.5];
    const SR = [36, 36, 33, 25, 18, 14, 12, 11, 10.5, 11, 12];
    const lerp = (arr, t) => { const i = Math.min(9, Math.floor(t / 10)), f = (t - i * 10) / 10; return arr[i] + (arr[i + 1] - arr[i]) * f; };
    const phase = (t) => (t < 22 ? 1 : t < 48 ? 2 : t < 70 ? 3 : t < 88 ? 4 : 5);
    const ex = { 1: ["prätransformativ", "vorindustrielle Agrargesellschaft – Österreich um 1800–1850", "Pyramide"], 2: ["frühtransformativ", "heute z. B. Niger (6,7 Kinder je Frau), Somalia, DR Kongo · Österreich 1850–1900", "verbreiterte Pyramide"], 3: ["mitteltransformativ", "z. B. viele Länder Süd- und Südostasiens · Österreich 1900–1950", "Glocke"], 4: ["spättransformativ", "Österreich 1950–2000 – kaum natürlicher Zuwachs", "Urne"], 5: ["Schrumpfung (Phase 5)", "Japan, Italien, Südkorea, viele Länder Ost- und Südosteuropas", "Urne / Tropfen"] };
    root.innerHTML = `<div class="lab"><div class="lab-stage"><svg id="dm" viewBox="0 0 720 360"></svg><svg id="py" viewBox="0 0 720 200" style="margin-top:8px"></svg></div>
      <div class="lab-ctl"><div class="card" style="display:grid;gap:12px"><b style="font-family:var(--f-display);font-size:18px">Demografischer Übergang</b>
        <label>Zeit / Entwicklungsstand<input type="range" id="dt" min="0" max="100" value="35"></label>
        <div class="kpi"><div><b id="vgr"></b><small>Geburtenrate ‰</small></div><div><b id="vsr"></b><small>Sterberate ‰</small></div><div><b id="vw"></b><small>Wachstum pro Jahr</small></div><div><b id="vd"></b><small>Verdoppelung</small></div></div>
        <div class="lab-out" id="vout"></div></div></div></div>`;
    const svg = root.querySelector("#dm"), py = root.querySelector("#py");
    function draw(t) {
      const W = 720, H = 360, L = 50, Rr = 20, top = 20, bot = 40;
      const X = (v) => L + (v / 100) * (W - L - Rr), Y = (v) => top + (1 - v / 45) * (H - top - bot);
      const line = (arr) => V.smooth(T.map((x, i) => [X(x), Y(arr[i])]));
      let g = "";
      [[0, 22, "Phase 1"], [22, 48, "Phase 2"], [48, 70, "Phase 3"], [70, 88, "Phase 4"], [88, 100, "Phase 5"]].forEach(([a, b, l], i) => (g += `<rect x="${X(a)}" y="${top}" width="${X(b) - X(a)}" height="${H - top - bot}" class="vband ${i % 2 ? "b2" : ""}"/><text x="${(X(a) + X(b)) / 2}" y="${top + 14}" text-anchor="middle" class="vt vsm vstrong">${l}</text>`));
      [0, 15, 30, 45].forEach((v) => (g += `<line x1="${L}" x2="${W - Rr}" y1="${Y(v)}" y2="${Y(v)}" class="vgrid"/><text x="${L - 6}" y="${Y(v) + 4}" text-anchor="end" class="vt vsm">${v}</text>`));
      const pa = T.map((x, i) => [X(x), Y(GR[i])]), pb = T.map((x, i) => [X(x), Y(SR[i])]);
      g += `<path d="M${pa.map((p) => p.join(",")).join("L")}L${pb.slice().reverse().map((p) => p.join(",")).join("L")}Z" class="varea"/>`;
      g += `<path d="${line(GR)}" class="vline vl-1"/><path d="${line(SR)}" class="vline vl-2"/>`;
      g += `<text x="${X(100) - 4}" y="${Y(8.5) + 16}" text-anchor="end" class="vt vsm vl-t-1">Geburtenrate</text><text x="${X(100) - 4}" y="${Y(12) - 8}" text-anchor="end" class="vt vsm vl-t-2">Sterberate</text>`;
      g += `<line x1="${X(t)}" x2="${X(t)}" y1="${top}" y2="${H - bot}" stroke="var(--ink)" stroke-width="2"/><circle cx="${X(t)}" cy="${Y(lerp(GR, t))}" r="6" class="vdot"/><circle cx="${X(t)}" cy="${Y(lerp(SR, t))}" r="6" class="vdot"/>`;
      g += `<text x="${L}" y="${H - 12}" class="vt vsm vmuted">Zeit →</text>`;
      svg.innerHTML = g;
      const gr = lerp(GR, t), sr = lerp(SR, t), w = (gr - sr) / 10;
      root.querySelector("#vgr").textContent = fmt(gr, 1);
      root.querySelector("#vsr").textContent = fmt(sr, 1);
      root.querySelector("#vw").textContent = (w > 0 ? "+" : "") + fmt(w, 2) + " %";
      root.querySelector("#vd").textContent = w > 0.05 ? "≈ " + Math.round(70 / w) + " J." : w < -0.05 ? "schrumpft" : "–";
      const ph = phase(t), e = ex[ph];
      root.querySelector("#vout").innerHTML = `<b>Phase ${ph} · ${e[0]}</b><span>${e[1]}</span><span>Typische Alterspyramide: <b>${e[2]}</b></span>`;
      // Pyramide: Kohortengrößen aus Geburten- und Sterberate abgeleitet
      const rows = 9, base = Math.max(0.15, gr / 38), mort = sr / 36;
      let p = "";
      const widths = [];
      for (let k = 0; k < rows; k++) {
        const born = lerp(GR, Math.max(0, t - k * 9)) / 38;
        const surv = Math.pow(1 - Math.min(0.5, 0.06 + mort * 0.18), k) * (k > 6 ? 0.8 : 1);
        widths.push(born * surv);
      }
      const mx = Math.max(...widths);
      widths.forEach((wv, k) => { const ww = (wv / mx) * 300, y = 180 - (k + 1) * 19; p += `<rect x="${360 - ww}" y="${y}" width="${ww}" height="16" class="vpy m"/><rect x="360" y="${y}" width="${ww}" height="16" class="vpy f"/>`; });
      p += `<text x="20" y="18" class="vt vsm vstrong">Altersaufbau (schematisch)</text><text x="20" y="190" class="vt vxs vmuted">jung</text><text x="20" y="20" class="vt vxs vmuted" dy="16">alt</text>`;
      py.innerHTML = p;
      void base;
    }
    const r = root.querySelector("#dt");
    r.oninput = () => draw(+r.value);
    draw(+r.value);
  }

  /* ---------- 4. Suez vs. Kap ---------- */
  function seeroute(root) {
    root.innerHTML = `<div class="lab"><div class="lab-stage">${V.map.render("afroeurasia", { routes: [{ pts: V.R.suez, cls: "r1", label: "via Suez", lpos: [60, 20] }, { pts: V.R.kap, cls: "r4", label: "ums Kap", lpos: [12, -24], anchor: "start" }], points: [{ p: V.P.shanghai, t: "Shanghai" }, { p: V.P.rotterdam, t: "Rotterdam", anchor: "end", dy: -8 }, { p: V.P.suez, t: "Suez", cls: "choke", anchor: "end" }] })}</div>
      <div class="lab-ctl"><div class="card" style="display:grid;gap:12px"><b style="font-family:var(--f-display);font-size:18px">Rechner: Shanghai → Rotterdam</b>
        <label>Geschwindigkeit: <span id="lv"></span><input type="range" id="sv" min="12" max="24" value="17"></label>
        <label>Charterrate (USD/Tag): <span id="lc"></span><input type="range" id="sc" min="10000" max="150000" step="5000" value="60000"></label>
        <label>Treibstoffpreis (USD/t): <span id="lf"></span><input type="range" id="sf" min="400" max="1200" step="50" value="650"></label>
        <label>Ladung (TEU): <span id="lt"></span><input type="range" id="st" min="4000" max="24000" step="1000" value="15000"></label>
        <div class="kpi" id="sout"></div>
        <div class="lab-out" id="stxt"></div>
        <p class="empty" style="margin:0;font-size:12.5px">Modellannahmen (gerundet): 19.500 km via Suez, 25.700 km ums Kap; Verbrauch ≈ 150 t/Tag bei 20 Knoten, steigt mit der 3. Potenz der Geschwindigkeit; Suezkanal-Gebühr ≈ 600.000 USD. Kein echter Frachttarif!</p>
      </div></div></div>`;
    V.map.load().then(() => V.map.hydrate(root));
    const g = (id) => +root.querySelector(id).value;
    function calc() {
      const v = g("#sv"), ch = g("#sc"), fuel = g("#sf"), teu = g("#st");
      const kmDay = v * 1.852 * 24, cons = 150 * Math.pow(v / 20, 3);
      const dS = 19500 / kmDay, dK = 25700 / kmDay;
      const cS = dS * (ch + cons * fuel) + 600000, cK = dK * (ch + cons * fuel);
      root.querySelector("#lv").textContent = v + " Knoten";
      root.querySelector("#lc").textContent = fmt(ch);
      root.querySelector("#lf").textContent = fmt(fuel);
      root.querySelector("#lt").textContent = fmt(teu);
      root.querySelector("#sout").innerHTML = `<div><b>${fmt(dS, 1)} Tage</b><small>via Suez</small></div><div><b>${fmt(dK, 1)} Tage</b><small>ums Kap</small></div><div><b>${fmt(cS / teu)} USD</b><small>Kosten je TEU (Suez)</small></div><div><b>${fmt(cK / teu)} USD</b><small>Kosten je TEU (Kap)</small></div>`;
      const diff = cK - cS;
      root.querySelector("#stxt").innerHTML = `<b>Umweg: +${fmt(dK - dS, 1)} Tage · ${diff > 0 ? "+" : ""}${fmt(diff / 1e6, 2)} Mio. USD pro Rundreise-Hälfte</b><span>Dazu kommen höhere Versicherungsprämien, mehr gebundene Schiffe (für denselben Wochenfahrplan braucht man mehr Schiffe) und Verspätungen im Hinterland – deshalb steigen die <b>Frachtraten</b> stärker als die reinen Mehrkosten. Langsam fahren (Slow Steaming) spart Treibstoff, kostet aber Zeit.</span>`;
    }
    root.querySelectorAll("input[type=range]").forEach((r) => (r.oninput = calc));
    calc();
  }

  window.LAB = {
    list: [
      { id: "christaller", t: "Christaller: K = 3 / 4 / 7", mount: christaller },
      { id: "diffusion", t: "Hägerstrand: Diffusion simulieren", mount: diffusion },
      { id: "demografie", t: "Demografischer Übergang", mount: demografie },
      { id: "seeroute", t: "Suez oder Kap?", mount: seeroute }
    ]
  };
})();
