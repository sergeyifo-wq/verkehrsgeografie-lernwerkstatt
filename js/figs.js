/* Schaubilder: alle Abbildungen der Lernseite, neu gezeichnet als SVG/HTML.
   Jede Abbildung: { cap, src, wide, html(o) } – o.film = true, wenn sie im Film läuft. */
(function () {
  const { svg, T, wrap, smooth, S, esc, fmt } = V;
  const F = (window.FIGS = {});
  const P = V.P, R = V.R;

  /* ---------- Kapitel 1 ---------- */
  F.wenden = {
    cap: "Die drei Wenden der umweltorientierten Wirtschaftsgeografie (schematisch)",
    src: "nach Suwala (2023) und Affolderbach u. Schulz (2024)",
    html: () => {
      const W = 720, H = 340;
      const X = (t) => 60 + t * 600, Y = (v) => 290 - v * 240;
      const base = [[0, 0.08], [0.25, 0.3], [0.5, 0.55], [0.75, 0.78], [1, 1]];
      const real = [[0, 0.08], [0.25, 0.3], [0.42, 0.42], [0.58, 0.49], [0.72, 0.5], [0.85, 0.4], [1, 0.26]];
      let g = V.arrowDefs("wa");
      g += `<line x1="60" y1="290" x2="680" y2="290" class="vaxis" marker-end="url(#wa)"/><line x1="60" y1="290" x2="60" y2="30" class="vaxis" marker-end="url(#wa)"/>`;
      g += T(670, 312, "Wohlstand / Zeit", { anchor: "end", cls: "vt vsm vmuted" }) + T(20, 160, "Umweltbelastung", { anchor: "middle", rot: -90, cls: "vt vsm vmuted" });
      g += `<path d="${smooth(base.map(([t, v]) => [X(t), Y(v)]))}" class="vline vdash draw"${S(0)}/>` + T(X(0.98), Y(1) - 8, "ohne Wende", { anchor: "end", cls: "vt vsm vmuted", s: 0 });
      g += `<path d="${smooth(real.map(([t, v]) => [X(t), Y(v)]))}" class="vline vl-1 draw"${S(1)}/>`;
      [[0.25, 0.3, "1", "Effizienzwende", "weniger Ressourcen je Einheit", 1], [0.58, 0.49, "2", "Konsistenzwende", "neue, saubere Technologien", 2], [0.85, 0.4, "3", "Suffizienzwende", "weniger produzieren", 3]].forEach(
        ([t, v, n, h, p, s]) => {
          g += `<g${S(s)}><circle cx="${X(t)}" cy="${Y(v)}" r="13" class="vnum"/>` + T(X(t), Y(v) + 5, n, { anchor: "middle", cls: "vt vnumt" }) +
            T(X(t), Y(v) + 36, h, { anchor: "middle", cls: "vt vstrong vsm" }) + T(X(t), Y(v) + 52, p, { anchor: "middle", cls: "vt vxs vmuted" }) + `</g>`;
        }
      );
      return svg(W, H, g);
    }
  };

  /* ---------- Kapitel 2 ---------- */
  F.grandsmall = {
    cap: "Große und kleine Theorien",
    src: "nach Weichhart (1997)",
    html: () =>
      V.vs(
        { h: "„Small Theories“", items: ["kein allgemeiner Erklärungsanspruch", "**hohe Tiefen- und Trennschärfe**", "aber: Reduktionismus – Blick aufs Ganze fehlt", "Bsp.: **Christaller**, Hägerstrand"], s: 0 },
        { h: "„Grand Theories“", items: ["erklären Zusammenhänge **über Bereiche hinweg**", "**übergreifende Erklärungskompetenz**", "aber: im Detail unscharf", "Bsp.: **Regulationstheorie**"], s: 1 },
        { mid: "↔" }
      ) + `<p class="vz-note"${S(2)}>Trend: Die Forschungsfront verschiebt sich Richtung <b>Grand Theories</b> (Vernetzung mit Nachbarwissenschaften, komplexe Humangeografie).</p>`
  };

  const regBox = (o) => `
    <div class="vz-reg">
      <div class="vz-reg-top"${S(o.s0)}>${esc(o.top)}</div>
      <div class="vz-reg-col"${S(o.s1)}><h5>${esc(o.L.t)}<small>${esc(o.L.sub)}</small></h5>${o.L.groups.map((gr) => `<div class="g"><b>${esc(gr[0])}</b><ul>${gr[1].map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("")}</div>
      <div class="vz-reg-mid"${S(o.s3)}><span>Auswirkungen auf das<br>Akkumulationsregime ←</span><b>${esc(o.mid)}</b><span>→ Anforderungen an die<br>Regulationsweise</span></div>
      <div class="vz-reg-col r"${S(o.s2)}><h5>${esc(o.R.t)}<small>${esc(o.R.sub)}</small></h5>${o.R.groups.map((gr) => `<div class="g"><b>${esc(gr[0])}</b><ul>${gr[1].map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("")}</div>
      <div class="vz-reg-bot ${o.botCls || ""}"${S(o.s4)}>${esc(o.bottom)}</div>
    </div>`;
  F.regulation = {
    cap: "Schema der Regulationstheorie", src: "Weichhart (1997) nach Bathelt (1994), verändert", wide: true,
    html: () => regBox({
      top: "Entwicklungspfad", mid: "Wechselwirkung", bottom: "Passen beide nicht mehr zusammen → Krise → neue Formation",
      L: { t: "Akkumulationsregime", sub: "Wie wird produziert und konsumiert?", groups: [["Produktionsstruktur", ["industrielles Paradigma", "Arbeitsorganisation, Arbeitsteilung", "Produktionskonzepte"]], ["Konsummuster", ["Präferenzsystem", "Einkommensverteilung", "demografische Struktur, kulturelle Traditionen"]]] },
      R: { t: "Regulationsweise", sub: "Die gesellschaftlichen Spielregeln", groups: [["Medien der Koordination", ["Normen, Regeln, Gesetze", "Interventionen, Sektoralpolitiken", "Aushandlung, Diskurskultur"]], ["Institutionen", ["Nationalstaat, Gebietskörperschaften", "Sozialpartner, Parteien"]]] },
      s0: 0, s1: 1, s2: 2, s3: 3, s4: 4, botCls: "warn"
    })
  };
  F.fordismus = {
    cap: "Die Formation des Fordismus (ca. 1900–1975)", src: "nach Weichhart (1997), neu gezeichnet", wide: true,
    html: () => regBox({
      top: "längerfristig stabiler Entwicklungszusammenhang · kumulative Wachstumsprozesse", mid: "Großserie, Lohn ↔ Produktivität gekoppelt",
      bottom: "Märkte gesättigt + Ölpreisschocks 1973/79 + differenzierte Nachfrage → KRISE",
      L: { t: "Intensive Akkumulation", sub: "Akkumulationsregime", groups: [["Produktionsstruktur", ["Taylorismus, Fließband", "Produktivitätszunahme, steigende Investitionen", "standardisierte Massenproduktion"]], ["Konsummuster", ["standardisierte Präferenzen", "permanente Kaufkraftsteigerung", "Massenkonsum"]]] },
      R: { t: "Monopolistische Regulation", sub: "Regulationsweise", groups: [["Koordination", ["kollektive Lohnverhandlungen", "wohlfahrtsstaatliche Umverteilung", "korporatistische Diskurskultur"]], ["Institutionen", ["starker Nationalstaat", "Sozialpartner, Parteien"]]] },
      s0: 0, s1: 1, s2: 2, s3: 3, s4: 4, botCls: "warn"
    })
  };
  F.postfordismus = {
    cap: "Die Formation des Postfordismus (ab ca. 1975)", src: "nach Weichhart (1997), S. 87, neu gezeichnet", wide: true,
    html: () => regBox({
      top: "Krise des Fordismus → selektive Wachstumsprozesse", mid: "Kleinserie, Produktivität ↮ Masseneinkommen",
      bottom: "Folgen: Deregulierung, soziale Polarisierung, Globalisierung",
      L: { t: "Flexible Akkumulation", sub: "Akkumulationsregime", groups: [["Produktionsstruktur", ["flexible Produktion: CAD, CAM, CIM", "neue Managementstrategien, Lean Production", "flexible Beschäftigung, Fragmentierung"]], ["Konsummuster", ["Differenzierung der Konsummuster", "instabile, segmentierte Märkte", "Pluralisierung der Lebensstile"]]] },
      R: { t: "Dezentrale, marktorientierte Regulation", sub: "Regulationsweise", groups: [["Koordination", ["Individualisierung von Beschäftigung und Löhnen", "Deregulierung von Politikfeldern", "Flexibilisierung der Aushandlung"]], ["Institutionen", ["abnehmende Bedeutung des Staates", "Public-Private-Partnership", "lokale, regionale, supranationale Institutionen"]]] },
      s0: 0, s1: 1, s2: 2, s3: 3, s4: 4
    })
  };

  F.gleichpol = {
    cap: "Gleichgewichts- und Polarisationstheorien im Vergleich (schematisch)", src: "eigene Darstellung", wide: true,
    html: () => {
      const x = ["", "", "", "", "", ""];
      const a = V.lines({ w: 380, h: 240, right: 86, x, min: 0, max: 10, ticks: 2, series: [{ name: "Zentrum", vals: [7, 7.6, 8, 8.2, 8.3, 8.4], smooth: true, s: 0 }, { name: "Peripherie", vals: [2, 3.5, 5, 6.3, 7.3, 8], smooth: true, s: 0 }], notes: [] });
      const b = V.lines({ w: 380, h: 240, right: 86, x, min: 0, max: 10, ticks: 2, series: [{ name: "Zentrum", vals: [5, 5.8, 6.8, 7.8, 8.8, 9.7], smooth: true, s: 1 }, { name: "Peripherie", vals: [3, 2.9, 2.7, 2.5, 2.2, 2], smooth: true, s: 1 }] });
      return V.two(
        `<div class="vz-panel"${S(0)}><h5>Gleichgewichtstheorien (Neoklassik)</h5>${a}<p>Faktorwanderungen gleichen Unterschiede aus → <b>Konvergenz</b></p></div>`,
        `<div class="vz-panel"${S(1)}><h5>Polarisationstheorien (Myrdal, Dependenz)</h5>${b}<p>Entzugseffekte verstärken Unterschiede kumulativ → <b>Divergenz</b></p></div>`
      );
    }
  };

  F.zpmodell = {
    cap: "Das Zentrum-Peripherie-Modell", src: "eigene Darstellung nach dem Skriptum", wide: true,
    html: () => {
      const W = 760, H = 380;
      let g = V.arrowDefs("zp");
      g += `<g${S(0)}><circle cx="170" cy="190" r="118" class="vcenter"/>` + T(170, 160, "ZENTRUM", { anchor: "middle", cls: "vt vbigt" }) + wrap(170, 188, "Industrie, Dienste, Headquarters, hohe Einkommen", 20, { anchor: "middle", size: 13 }) + `</g>`;
      g += `<g${S(0)}><circle cx="590" cy="190" r="118" class="vperi"/>` + T(590, 160, "PERIPHERIE", { anchor: "middle", cls: "vt vbigt" }) + wrap(590, 188, "Landwirtschaft, Rohstoffe, gestreute Bevölkerung, wenig Infrastruktur", 22, { anchor: "middle", size: 13 }) + `</g>`;
      const arrow = (y, l2r, label, s) =>
        `<g${S(s)}><line x1="${l2r ? 300 : 460}" y1="${y}" x2="${l2r ? 460 : 300}" y2="${y}" class="vflow ${l2r ? "a" : "b"}" marker-end="url(#zp)"/>` + T(380, y - 7, label, { anchor: "middle", cls: "vt vsm vstrong" }) + `</g>`;
      g += arrow(105, false, "Rohstoffe", 1) + arrow(150, false, "Arbeitskräfte („Brain Drain“)", 1) + arrow(195, false, "Gewinne (Kapitalrückfluss)", 1);
      g += arrow(245, true, "Kapital, Know-how", 2) + arrow(290, true, "Fertigprodukte", 2) + arrow(335, true, "Entscheidungen (Abhängigkeit)", 3);
      return svg(W, H, g);
    }
  };

  F.integration = {
    cap: "Stufen der wirtschaftlichen Integration", src: "nach Lindner u. a. (2002), Kulke (2009), aktualisiert", wide: true,
    html: () => {
      const st = [["Ökonomische Zusammenarbeit", "Förderung der Entwicklung", "APEC, ASEAN"], ["Freihandelszone", "keine Binnenzölle", "EFTA, USMCA, RCEP"], ["Zollunion", "+ gemeinsamer Außenzoll", "Mercosur, EU–Türkei"], ["Binnenmarkt", "+ vier Freiheiten", "EU-Binnenmarkt 1993"], ["Wirtschaftsunion", "+ harmonisierte Politik", "EU"], ["Währungsunion", "+ gemeinsame Währung", "Euroraum (21)"], ["Politische Union", "+ Außen- u. Verteidigungspolitik", "(Diskussion)"]];
      const W = 900, H = 410, bw = 122;
      let g = "";
      st.forEach((s, i) => {
        const x = 10 + i * bw, h = 112 + i * 34, y = H - 30 - h;
        const two = s[0].length > 14;
        g += `<g${S(i)}><rect x="${x}" y="${y}" width="${bw - 6}" height="${h}" rx="6" class="vstep ${i === 6 ? "dash" : ""}"/>` + T(x + 10, y + 22, String(i + 1), { cls: "vt vstepn" }) +
          wrap(x + 8, y + 44, s[0], 13, { size: 12.5, weight: 800 }) + wrap(x + 8, y + 44 + (two ? 34 : 18), s[1], 16, { size: 11, cls: "vt vmuted" }) +
          T(x + (bw - 6) / 2, H - 12, s[2], { anchor: "middle", cls: "vt vxs vacc" }) + `</g>`;
      });
      g += T(W - 10, 20, "zunehmender Integrationsgrad →", { anchor: "end", cls: "vt vsm vmuted" });
      return svg(W, H, g);
    }
  };

  F.krugman = {
    cap: "Kumulative Ballung in der New Economic Geography", src: "nach Haas u. Neumair (2008), S. 67 f.",
    html: () =>
      V.cycle({ w: 680, h: 420, r: 150, center: "kumulative Ballung", centerS: 5, nodes: [
        { h: "Steigende Skalenerträge: Produktion an EINEM Standort", s: 0 },
        { h: "Beschäftigte sind Kund:innen: große Nachfrage vor Ort", s: 1 },
        { h: "Großer Markt zieht weitere Unternehmen an", s: 2 },
        { h: "Zulieferer, Fachkräfte-Pool, Wissens-Spillovers", s: 3 },
        { h: "Sinkende Kosten, steigende Attraktivität", s: 4 }
      ] }) +
      V.vs({ h: "Zentripetale Kräfte", items: ["Nachfrage- und Absatzbeziehungen", "Skaleneffekte", "Spillovers"], s: 6 }, { h: "Zentrifugale Kräfte", items: ["Transportkosten zur Peripherie", "steigende Preise und Bodenkosten", "Wettbewerb im Zentrum"], s: 6 }, { mid: "⇄", s: 6 }) +
      `<p class="vz-note"${S(7)}>Ballung am stärksten bei <b>mittleren Transportkosten</b>.</p>`
  };

  const hexPts = (cx, cy, r, rot = 0) => Array.from({ length: 6 }, (_, i) => { const a = (Math.PI / 3) * i + rot; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  const hexPath = (cx, cy, r, rot = 0) => "M" + hexPts(cx, cy, r, rot).map((p) => p.map((v) => v.toFixed(1)).join(",")).join("L") + "Z";
  F.hexagon = {
    cap: "Vom Kreis zum Sechseck nach Christaller", src: "nach Haggett (1991), S. 465", wide: true,
    html: () => {
      const W = 920, H = 260, r = 34;
      let g = "";
      const centers = (ox, d) => [[0, 0], [d, 0], [-d, 0], [d / 2, d * 0.866], [-d / 2, d * 0.866], [d / 2, -d * 0.866], [-d / 2, -d * 0.866]].map(([x, y]) => [ox + x, 120 + y]);
      const panel = (i, title, inner) => `<g${S(i)}>${inner}${T(115 + i * 230, 245, title, { anchor: "middle", cls: "vt vsm vstrong" })}</g>`;
      g += panel(0, "(a) isolierte Kreise → Lücken", centers(115, 82).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" class="vmkt"/><circle cx="${x}" cy="${y}" r="3" class="vdot"/>`).join(""));
      g += panel(1, "(b) dichteste Packung → Lücken", centers(345, 68).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" class="vmkt"/><circle cx="${x}" cy="${y}" r="3" class="vdot"/>`).join(""));
      g += panel(2, "(c) Überlappung", centers(575, 58).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" class="vmkt ov"/><circle cx="${x}" cy="${y}" r="3" class="vdot"/>`).join(""));
      g += panel(3, "(d) lückenloses Sechsecknetz", centers(805, 58).map(([x, y]) => `<path d="${hexPath(x, y, 58 / 1.732, Math.PI / 6)}" class="vhex"/><circle cx="${x}" cy="${y}" r="3" class="vdot"/>`).join(""));
      return svg(W, H, g);
    }
  };

  F.kwerte = {
    cap: "Hierarchie und K-Werte: Wie viele Orte versorgt ein zentraler Ort?", src: "nach Haggett (1991), Reichart (1999)", wide: true,
    html: () => {
      const W = 930, H = 330;
      let g = "";
      const R = 92;
      const panel = (i, ox, K, title, sub) => {
        const cx = ox, cy = 150;
        let s = `<g${S(i)}>`;
        s += `<path d="${hexPath(cx, cy, R, 0)}" class="vhex big"/>`;
        let small = [];
        if (K === 3) small = hexPts(cx, cy, R, 0);
        if (K === 4) small = hexPts(cx, cy, R * 0.866, Math.PI / 6);
        if (K === 7) small = hexPts(cx, cy, R * 0.58, Math.PI / 12);
        small.forEach(([x, y]) => (s += `<circle cx="${x}" cy="${y}" r="9" class="vlow"/>`));
        if (K === 4) s += hexPts(cx, cy, R * 0.866, Math.PI / 6).map(([x, y]) => `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" class="vtrans"/>`).join("");
        s += `<circle cx="${cx}" cy="${cy}" r="16" class="vhigh"/>`;
        s += T(cx, 30, title, { anchor: "middle", cls: "vt vstrong" }) + T(cx, 300, sub, { anchor: "middle", cls: "vt vsm vmuted" });
        s += T(cx, 322, K === 3 ? "1 + 6 × ⅓ = 3" : K === 4 ? "1 + 6 × ½ = 4" : "1 + 6 × 1 = 7", { anchor: "middle", cls: "vt vsm vacc" });
        return s + `</g>`;
      };
      g += panel(0, 155, 3, "K = 3 · Versorgungsprinzip", "abhängige Orte auf den Ecken → 3 Zentren teilen sie");
      g += panel(1, 465, 4, "K = 4 · Verkehrsprinzip", "Orte auf den Kanten → an geraden Verkehrslinien");
      g += panel(2, 775, 7, "K = 7 · Verwaltungsprinzip", "Orte innen → eindeutig einem Zentrum zugeordnet");
      return svg(W, H, g) + `<div class="vz-legend"><span><i class="lg-high"></i>Ort höherer Stufe</span><span><i class="lg-low"></i>Ort niedrigerer Stufe</span><span><i class="lg-hex"></i>Marktgebiet des höheren Ortes</span></div>`;
    }
  };

  F.zeitpfad = {
    cap: "Raum-Zeit-Pfad eines Tages und Hägerstrands drei Constraints", src: "nach Gather u. a. (2008), S. 164", wide: true,
    html: () => {
      const W = 880, H = 360;
      const x = { Wohnung: 110, Arbeit: 300, Geschäft: 440 };
      const Y = (h) => 320 - (h / 24) * 290;
      let g = V.arrowDefs("zt");
      g += `<line x1="70" y1="320" x2="520" y2="320" class="vaxis" marker-end="url(#zt)"/><line x1="70" y1="320" x2="70" y2="20" class="vaxis" marker-end="url(#zt)"/>`;
      g += T(515, 342, "Raum", { anchor: "end", cls: "vt vsm vmuted" }) + T(40, 170, "Zeit", { anchor: "middle", rot: -90, cls: "vt vsm vmuted" });
      [0, 8, 12, 17, 24].forEach((h) => (g += T(64, Y(h) + 4, h + (h === 0 || h === 24 ? " Uhr" : ""), { anchor: "end", cls: "vt vxs vmuted" }) + `<line x1="70" y1="${Y(h)}" x2="520" y2="${Y(h)}" class="vgrid"/>`));
      Object.entries(x).forEach(([k, v]) => (g += `<line x1="${v}" y1="320" x2="${v}" y2="25" class="vstation"/>` + T(v, 338, k, { anchor: "middle", cls: "vt vsm vstrong" })));
      const path = [[x.Wohnung, Y(0)], [x.Wohnung, Y(7.4)], [x.Arbeit, Y(8)], [x.Arbeit, Y(12)], [x.Geschäft, Y(12.4)], [x.Geschäft, Y(12.8)], [x.Arbeit, Y(13.2)], [x.Arbeit, Y(17)], [x.Geschäft, Y(17.4)], [x.Geschäft, Y(17.9)], [x.Wohnung, Y(18.6)], [x.Wohnung, Y(24)]];
      g += `<path d="M${path.map((p) => p.join(",")).join("L")}" class="vline vl-1 draw thick"${S(0)}/>`;
      g += T(x.Wohnung + 8, Y(3), "Schlaf", { cls: "vt vxs", s: 0 }) + T(x.Arbeit + 8, Y(10), "Arbeit", { cls: "vt vxs", s: 0 }) + T(x.Geschäft + 8, Y(12.6), "Mittagspause", { cls: "vt vxs", s: 0 }) + T(x.Geschäft + 8, Y(17.6), "Einkauf", { cls: "vt vxs", s: 0 }) + T(x.Wohnung + 8, Y(21), "Freizeit / Schlaf", { cls: "vt vxs", s: 0 });
      const box = (y, h, t, p, s, cls) => `<g${S(s)}><rect x="560" y="${y}" width="300" height="86" rx="10" class="vcon ${cls}"/>` + T(576, y + 26, t, { cls: "vt vstrong" }) + wrap(576, y + 48, p, 40, { size: 12.5, cls: "vt vmuted" }) + `</g>`;
      g += box(20, 0, "Capability Constraints", "Biologie und Mobilitätsressourcen: Schlaf, Essen, Tempo des Verkehrsmittels", 1, "c1");
      g += box(120, 0, "Coupling Constraints", "Koordination mit anderen: Arbeitszeiten, Termine, Familienessen", 2, "c2");
      g += box(220, 0, "Authority Constraints", "Zugangsregeln: Öffnungszeiten, Erlaubnisse, private Räume", 3, "c3");
      return svg(W, H, g) + `<p class="vz-note">Senkrecht = man bleibt an einem Ort; schräg = man bewegt sich (je flacher, desto schneller).</p>`;
    }
  };

  F.diffusion = {
    cap: "Formen der Diffusion nach Hägerstrand (schematisch)", src: "eigene Darstellung", wide: true,
    html: () => {
      const W = 900, H = 270;
      let g = "";
      const dots = (cx, cy, n, r, seed, cls) => {
        let s = "", a = seed;
        for (let i = 0; i < n; i++) {
          a = (a * 9301 + 49297) % 233280;
          const ang = (a / 233280) * Math.PI * 2;
          a = (a * 9301 + 49297) % 233280;
          const rr = Math.sqrt(a / 233280) * r;
          s += `<circle cx="${(cx + Math.cos(ang) * rr).toFixed(1)}" cy="${(cy + Math.sin(ang) * rr).toFixed(1)}" r="3.6" class="${cls}"/>`;
        }
        return s;
      };
      const panel = (i, ox, title, sub, t1, t2) =>
        `<g${S(i)}>${T(ox + 140, 24, title, { anchor: "middle", cls: "vt vstrong" })}${T(ox + 140, 44, sub, { anchor: "middle", cls: "vt vxs vmuted" })}
         <rect x="${ox}" y="60" width="130" height="170" rx="8" class="vpanel"/><rect x="${ox + 150}" y="60" width="130" height="170" rx="8" class="vpanel"/>
         ${T(ox + 65, 252, "Zeitpunkt t₁", { anchor: "middle", cls: "vt vxs" })}${T(ox + 215, 252, "Zeitpunkt t₂", { anchor: "middle", cls: "vt vxs" })}${t1}${t2}</g>`;
      g += panel(0, 10, "Expansionsdiffusion", "bleibt am Ursprung, breitet sich aus", dots(75, 145, 6, 18, 3, "vd1"), dots(225, 145, 22, 55, 7, "vd1"));
      g += panel(1, 310, "Relokationsdiffusion", "verlässt den Ursprung", dots(375, 145, 7, 20, 5, "vd2"), `<circle cx="525" cy="145" r="24" class="vghost"/>` + dots(545, 95, 5, 14, 9, "vd2") + dots(505, 200, 5, 14, 11, "vd2"));
      g += panel(2, 610, "Kombinierte Diffusion", "häufigste Form", dots(675, 145, 7, 20, 13, "vd3"), dots(825, 145, 14, 40, 17, "vd3") + dots(860, 85, 4, 10, 19, "vd3"));
      return svg(W, H, g);
    }
  };

  F.welle = {
    cap: "Ausbreitung einer Diffusionswelle in Raum und Zeit", src: "nach Morrill (1970), zit. nach Haggett (1991)",
    html: () => {
      const x = Array.from({ length: 13 }, (_, i) => (i === 0 ? "Ursprung" : i === 12 ? "weit entfernt" : ""));
      const wave = (c, h, w) => x.map((_, i) => +(h * Math.exp(-((i - c) ** 2) / (2 * w * w))).toFixed(2));
      return V.lines({
        w: 720, h: 300, right: 40, x, min: 0, max: 10, ticks: 2, tickDec: 0,
        series: [
          { name: "t₁", vals: wave(0.5, 9.4, 1.0), smooth: true, s: 0 },
          { name: "t₂", vals: wave(2.6, 7.6, 1.4), smooth: true, s: 1 },
          { name: "t₃", vals: wave(5, 5.8, 1.8), smooth: true, s: 2 },
          { name: "t₄", vals: wave(7.6, 4.2, 2.1), smooth: true, s: 3 },
          { name: "t₅", vals: wave(10.2, 3, 2.4), smooth: true, s: 4 }
        ],
        ylabel: "Neuübernahmen",
        notes: [{ x: 520, y: 70, t: "Der Scheitel wandert nach außen – die Welle wird flacher", max: 26, s: 5 }]
      });
    }
  };

  F.dmt = {
    cap: "Die Phasen des Demografischen Übergangs", src: "nach Haggett (1999), S. 211",
    wide: true,
    html: () => {
      const x = ["", "Phase 1", "", "", "Phase 2", "", "", "Phase 3", "", "", "Phase 4", ""];
      const gr = [38, 38, 37, 38, 37, 36, 32, 25, 18, 13, 11, 11];
      const sr = [36, 37, 35, 30, 23, 17, 14, 12, 11, 11, 11, 11];
      return V.lines({
        w: 820, h: 320, right: 110, x, min: 0, max: 45, ticks: 3,
        bands: [{ from: 0, to: 2.6, t: "prätransformativ", s: 0 }, { from: 2.6, to: 5.6, t: "frühtransformativ", s: 1, cls: "b2" }, { from: 5.6, to: 8.6, t: "mitteltransformativ", s: 2 }, { from: 8.6, to: 11, t: "spättransformativ", s: 3, cls: "b2" }],
        series: [{ name: "Geburtenrate", vals: gr, smooth: true, s: 0 }, { name: "Sterberate", vals: sr, smooth: true, s: 0, dy: 10 }],
        area: { between: [0, 1], s: 1, t: "starkes Wachstum", tx: 360, ty: 150 },
        ylabel: "‰ pro Jahr"
      });
    }
  };

  F.pyramiden = {
    cap: "Grundformen der Alterspyramide", src: "nach de Lange u. a. (2012)", wide: true,
    html: () => {
      const shapes = [
        ["Pyramide", "hohe GR, hohe SR", [1, 0.85, 0.7, 0.55, 0.4, 0.27, 0.15, 0.06]],
        ["verbreiterte Pyramide", "stark wachsend", [1, 0.8, 0.62, 0.46, 0.33, 0.22, 0.12, 0.05]],
        ["stationär", "gleichbleibend", [0.62, 0.62, 0.61, 0.6, 0.57, 0.5, 0.36, 0.16]],
        ["Glocke", "Rückgang beginnt", [0.5, 0.55, 0.6, 0.6, 0.57, 0.5, 0.36, 0.16]],
        ["Urne", "schrumpfend", [0.36, 0.42, 0.52, 0.62, 0.64, 0.57, 0.42, 0.2]],
        ["Birne", "Geburteneinbruch", [0.25, 0.3, 0.55, 0.62, 0.6, 0.52, 0.38, 0.18]],
        ["Tropfen", "sehr niedrige GR", [0.2, 0.26, 0.34, 0.46, 0.6, 0.66, 0.5, 0.24]]
      ];
      const W = 910, H = 190;
      let g = "";
      shapes.forEach(([t, p, rows], i) => {
        const cx = 65 + i * 130, base = 140, rh = 13;
        g += `<g${S(i)}>`;
        rows.forEach((w, k) => {
          const y = base - (k + 1) * rh, ww = w * 52;
          g += `<rect x="${cx - ww}" y="${y}" width="${ww}" height="${rh - 2}" class="vpy m"/><rect x="${cx}" y="${y}" width="${ww}" height="${rh - 2}" class="vpy f"/>`;
        });
        g += T(cx, 162, t, { anchor: "middle", cls: "vt vsm vstrong" }) + T(cx, 178, p, { anchor: "middle", cls: "vt vxs vmuted" }) + `</g>`;
      });
      return svg(W, H, g) + `<div class="vz-legend"><span><i class="lg-m"></i>Männer</span><span><i class="lg-f"></i>Frauen</span><span>Westeuropa heute: <b>Urne</b></span></div>`;
    }
  };

  /* ---------- Kapitel 3 ---------- */
  F.schrumpfung = {
    cap: "Die „Schrumpfung“ der Erde durch Innovationen im Transportwesen", src: "nach Nuhn u. Hesse (2006), S. 12",
    html: () => {
      const eras = [["1500–1840", "Pferdekutsche & Segelschiff", "≈ 15 km/h", 92], ["1850–1930", "Dampflok 100 km/h, Dampfschiff 60 km/h", "≈ 65–100 km/h", 64], ["1950–1960", "Propellerflugzeug", "≈ 550 km/h", 40], ["ab 1960", "Düsenflugzeug", "≈ 1.000 km/h", 24]];
      const W = 860, H = 250;
      let g = "";
      eras.forEach(([y, t, v, r], i) => {
        const cx = 110 + i * 210;
        g += `<g${S(i)}><circle cx="${cx}" cy="110" r="${r}" class="vglobe"/><path d="M${cx - r},110 Q${cx},${110 + r * 0.45} ${cx + r},110" class="vglobel"/><path d="M${cx},${110 - r} Q${cx - r * 0.45},110 ${cx},${110 + r}" class="vglobel"/>` +
          T(cx, 222, y, { anchor: "middle", cls: "vt vstrong" }) + T(cx, 240, v, { anchor: "middle", cls: "vt vsm vacc" }) + wrap(cx, 20, t, 26, { anchor: "middle", size: 12, cls: "vt vmuted" }) + `</g>`;
      });
      return svg(W, H, g);
    }
  };

  F.kosten1930 = {
    cap: "Transport- und Kommunikationskosten 1930–2005 (Index 1930 = 100, konstante Preise)", src: "HWWA (2002), S. 5; Verlauf vereinfacht nachgezeichnet",
    html: () =>
      V.lines({
        w: 720, h: 320, right: 150, x: ["1930", "1940", "1950", "1960", "1970", "1980", "1990", "2000", "2005"], min: 0, max: 110, ticks: 4,
        series: [
          { name: "Seefracht 35", vals: [100, 64, 38, 28, 29, 24, 30, 33, 35], s: 0 },
          { name: "Lufttransport 11,8", vals: [100, 68, 30, 24, 16, 10, 11, 9, 11.8], s: 1 },
          { name: "Telefon NY–London 0,12", vals: [100, 82, 53, 45, 31, 15, 3, 0.6, 0.12], s: 2, dy: 6 }
        ],
        ylabel: "Index"
      }) + `<p class="vz-note">Seefracht: Kosten je short ton inkl. Hafengebühren · Luft: Umsatz je Passagiermeile · Telefon: 3-Minuten-Gespräch New York–London.</p>`
  };

  F.kostendistanz = {
    cap: "Kostenverläufe der Verkehrsträger nach Distanz (schematisch)", src: "nach Nuhn u. Hesse (2006), Flotzinger u. a. (2008)",
    html: () => {
      const W = 720, H = 330;
      const X = (d) => 70 + d * 560, Y = (c) => 290 - c * 250;
      let g = V.arrowDefs("kd");
      g += `<line x1="70" y1="290" x2="660" y2="290" class="vaxis" marker-end="url(#kd)"/><line x1="70" y1="290" x2="70" y2="25" class="vaxis" marker-end="url(#kd)"/>`;
      g += T(650, 312, "Transportdistanz", { anchor: "end", cls: "vt vsm vmuted" }) + T(34, 160, "Transportkosten", { anchor: "middle", rot: -90, cls: "vt vsm vmuted" });
      const ln = (f, v, cls, name, s) => `<g${S(s)}><line x1="${X(0)}" y1="${Y(f)}" x2="${X(1)}" y2="${Y(f + v)}" class="vline ${cls} draw"/>` + T(X(1) + 6, Y(f + v) + 4, name, { cls: "vt vsm vstrong" }) + `<circle cx="${X(0)}" cy="${Y(f)}" r="4" class="vdot"/></g>`;
      g += ln(0.05, 0.9, "vl-1", "Lkw", 0) + ln(0.25, 0.45, "vl-2", "Bahn", 1) + ln(0.42, 0.22, "vl-3", "Schiff", 2);
      // Schnittpunkte
      const i1 = (0.25 - 0.05) / (0.9 - 0.45), i2 = (0.42 - 0.25) / (0.45 - 0.22);
      g += `<g${S(3)}><line x1="${X(i1)}" y1="${Y(0.05 + 0.9 * i1)}" x2="${X(i1)}" y2="290" class="vref"/>` + T(X(i1), 306, "ca. 300 km", { anchor: "middle", cls: "vt vsm vacc" }) +
        `<line x1="${X(i2)}" y1="${Y(0.25 + 0.45 * i2)}" x2="${X(i2)}" y2="290" class="vref"/>` + T(X(i2), 306, "ca. 1.000 km", { anchor: "middle", cls: "vt vsm vacc" }) + `</g>`;
      g += T(78, Y(0.42) - 8, "Fixkosten", { cls: "vt vxs vmuted", s: 2 });
      return svg(W, H, g) + `<p class="vz-note">Ab dem Schnittpunkt wird der Verkehrsträger mit höheren Fixkosten günstiger.</p>`;
    }
  };

  F.internet = {
    cap: "Internetnutzung nach Weltregionen 2018 – mit Aktualisierung 2024", src: "Statista (2019); ITU (2024)",
    html: () => V.bars({ data: [["Nordamerika", 95], ["Europa", 85.2, 91], ["Australien/Ozeanien", 68.9], ["Lateinamerika", 67], ["Naher Osten", 64.5], ["Weltdurchschnitt", 54.4, 68], ["Asien", 48.1], ["Afrika", 35.2, 38]], max: 100, unit: " %", dec: 1, legend: ["2018", "2024 (ITU)"], left: 170, s: 0 })
  };

  F.fdiindex = {
    cap: "Grenzüberschreitende Verflechtung 1980–2009 (schematisch, Index 1980 = 100)", src: "nach Braun u. Schulz (2012), S. 172 (WTO, UNCTAD) – Größenordnungen vereinfacht",
    html: () =>
      V.lines({
        w: 720, h: 320, right: 170, x: ["1980", "1985", "1990", "1995", "2000", "2005", "2009"], min: 0, max: 1700, ticks: 4,
        series: [
          { name: "Direktinvestitionen (ADI)", vals: [100, 140, 450, 680, 1500, 1180, 1250], s: 0, marks: [{ i: 4, t: "Einbruch 2001", dy: -12, s: 1 }] },
          { name: "Exporte", vals: [100, 100, 170, 260, 320, 520, 620], s: 0 },
          { name: "Welt-BIP", vals: [100, 106, 180, 250, 270, 380, 480], s: 0, dy: 8 }
        ],
        notes: [{ x: 70, y: 40, t: "ADI wachsen weit schneller als Handel – und der schneller als das BIP", max: 26, s: 2 }]
      })
  };

  F.hyperslow = {
    cap: "Hyperglobalisierung und Slowbalisation (schematisch, Index 1990 = 100)", src: "nach Felbermayr u. Görg (2020) – vereinfachte Darstellung", wide: true,
    html: () =>
      V.lines({
        w: 820, h: 330, right: 150, x: ["1990", "1993", "1996", "1999", "2002", "2005", "2008", "2009", "2012", "2015", "2018", "2021", "2024"], min: 80, max: 340, ticks: 4,
        bands: [{ from: 0, to: 6, t: "Hyperglobalisierung", s: 0 }, { from: 7, to: 12, t: "Slowbalisation", s: 2, cls: "b2" }],
        series: [
          { name: "Welthandel", vals: [100, 112, 135, 160, 182, 222, 262, 230, 262, 272, 292, 300, 312], s: 0, marks: [{ i: 7, t: "2009: Einbruch", dy: 22, s: 1 }] },
          { name: "Industrieproduktion", vals: [100, 104, 113, 122, 130, 146, 162, 152, 172, 184, 200, 205, 215], s: 0, dy: 8 }
        ],
        notes: [{ x: 210, y: 60, t: "Handel wächst ~3 Prozentpunkte schneller", max: 22, s: 0 }, { x: 590, y: 112, t: "seit 2009 nur noch im Gleichschritt", max: 20, s: 3, anchor: "middle" }]
      })
  };

  F.restriktionen = {
    cap: "Wert der aktiven weltweiten Einfuhrbeschränkungen 2009–2023 (Mrd. US-$)", src: "WTO (2024)",
    html: () => V.cols({ w: 760, h: 300, data: [["2009", 73], ["2010", 126], ["2011", 234], ["2012", 306], ["2013", 404], ["2014", 467], ["2015", 598], ["2016", 570], ["2017", 814], ["2018", 1457], ["2019", 1646], ["2020", 1516], ["2021", 2042], ["2022", 2359], ["2023", 2480]], values: true, labelEvery: 2, stagger: true, per: 5, ticks: 6, max: 3000 }) + `<p class="vz-note">Protektionismus nimmt zu – ab 2025 verstärkt durch die Zollpolitik der zweiten Trump-Administration.</p>`
  };

  F.seewege = {
    cap: "Wichtige Seeverkehrswege, Nadelöhre und Containerhäfen", src: "eigene Darstellung nach Woitschützke (2006) und UNCTAD", wide: true,
    html: () =>
      V.map.render("world", {
        routes: [
          { pts: R.suez, cls: "r1", label: "Asien–Europa (Suez)", lpos: [70, 16], s: 0 },
          { pts: [P.shanghai, [140, 33], [160, 38], [180, 40]], cls: "r2", s: 1 },
          { pts: [[-180, 40], [-150, 39], [-130, 36], [-118.2, 33.7]], cls: "r2", label: "Transpazifik", lpos: [-150, 44], s: 1 },
          { pts: [[-74, 40.6], [-50, 44], [-25, 47], [-6, 49], [1.4, 50.6], P.rotterdam], cls: "r3", label: "Transatlantik", lpos: [-42, 41.5], s: 1 }
        ],
        points: [
          { p: P.shanghai, t: "Shanghai", anchor: "end", dy: -6, s: 0 }, { p: P.singapur, t: "Singapur", dy: 14, s: 0 }, { p: P.rotterdam, t: "Rotterdam", anchor: "end", dy: -6, s: 0 },
          { p: [101, 3], t: "Malakka", cls: "choke", dx: -10, anchor: "end", s: 2 }, { p: P.suez, t: "Suez", cls: "choke", anchor: "end", s: 2 }, { p: [43.4, 12.6], t: "Bab-el-Mandeb", cls: "choke", dy: 16, s: 2 },
          { p: P.hormus, t: "Hormus", cls: "choke", dy: -8, s: 2 }, { p: [-79.6, 9.1], t: "Panama", cls: "choke", s: 2 }, { p: [-5.6, 35.95], t: "Gibraltar", cls: "choke", anchor: "end", dy: 14, s: 2 }, { p: [18.5, -34.4], t: "Kap der Guten Hoffnung", cls: "choke", s: 2 }
        ]
      }) + `<p class="vz-note">Über 80 % des Welthandels nach Volumen laufen über See (UNCTAD). Nadelöhre in Rot.</p>`
  };

  F.frachtraten = {
    cap: "Frachtraten als Fieberthermometer des Welthandels", src: "nach Skriptum (Maersk/FAZ, Breinbauer), gerundet",
    html: () =>
      V.timeline([
        { y: "Dez. 2007", h: "1.500 USD", p: "20-Fuß-Container China–Europa", s: 0 },
        { y: "Dez. 2008", h: "300 USD", p: "Weltwirtschaftskrise: Absturz um 80 %", tone: "bad", s: 1 },
        { y: "2016", h: "BDI-Allzeittief ~290", p: "Februar 2016", s: 2 },
        { y: "vor Covid", h: "1.300–1.500 USD", p: "40-Fuß-Container China–Europa", s: 3 },
        { y: "2021", h: "13.000–20.000 USD", p: "≈ das Zehnfache – Staus, gleichzeitige Nachfrage", tone: "hot", s: 4 },
        { y: "2024", h: "erneuter Anstieg", p: "Huthi-Angriffe im Roten Meer", tone: "hot", s: 5 },
        { y: "2026", h: "Iran-Krieg", p: "Hormus kaum, Suez gar nicht befahrbar → Umweg ums Kap", tone: "hot", s: 6 }
      ])
  };

  F.suezkap = {
    cap: "Shanghai–Rotterdam: Suezkanal oder Kap der Guten Hoffnung?", src: "eigene Darstellung; Distanzen und Fahrtzeiten gerundet", wide: true,
    html: () =>
      V.map.render("afroeurasia", {
        routes: [{ pts: R.suez, cls: "r1", label: "via Suez ≈ 19.500 km · 30–35 Tage", lpos: [56, 20.5], anchor: "middle", s: 0 }, { pts: R.kap, cls: "r4", label: "ums Kap ≈ 25.700 km · 40–45 Tage", lpos: [8, -24], anchor: "start", s: 1 }],
        points: [{ p: P.shanghai, t: "Shanghai", s: 0 }, { p: P.rotterdam, t: "Rotterdam", anchor: "end", dy: -8, s: 0 }, { p: P.suez, t: "Suez", cls: "choke", anchor: "end", s: 2 }, { p: [43.4, 12.6], t: "Rotes Meer / Bab-el-Mandeb", cls: "choke", dy: 18, anchor: "end", s: 2 }, { p: P.hormus, t: "Hormus", cls: "choke", dy: -8, s: 2 }]
      }) + `<p class="vz-note">Umweg um Afrika: rund <b>6.000 km und 10–14 Tage mehr</b> – höhere Treibstoff-, Personal- und Versicherungskosten, gebundene Schiffskapazität, steigende Frachtraten.</p>`
  };

  /* ---------- Kapitel 4 ---------- */
  F.europamodelle = {
    cap: "Raumstrukturmodelle Europas: Blaue Banane, Sunbelt, Blaue Banane 2, Pentagon", src: "nach Brunet (1989), DATAR, EUREK (1999)", wide: true,
    html: () =>
      V.map.render("europe", {
        areas: [{ pts: [P.london, P.paris, P.mailand, P.muenchen, P.hamburg], cls: "pent", smooth: false, s: 3, t: "Pentagon", tp: [3.6, 48.3] }],
        routes: [
          { pts: R.banane, cls: "banana", w: 34, label: "Blaue Banane", lpos: [-5.6, 54.6], s: 0 },
          { pts: R.sunbelt, cls: "sunbelt", w: 22, label: "Sunbelt", lpos: [2.6, 40.1], s: 1 },
          { pts: R.banane2, cls: "banana2", w: 22, label: "Blaue Banane 2", lpos: [23.5, 53.4], s: 2 }
        ],
        points: [P.london, P.paris, P.bruessel, P.amsterdam, P.koeln, P.frankfurt, P.zuerich, P.mailand, P.muenchen, P.hamburg, P.berlin, P.prag, P.wien, P.budapest, P.stockholm, P.barcelona].map((p) => ({ p, r: 3.5 })).concat([{ p: P.wien, t: "Wien", dy: 16, s: 2 }, { p: P.london, t: "London", anchor: "end", s: 0 }, { p: P.mailand, t: "Mailand", dy: 16, anchor: "end", s: 0 }])
      })
  };

  F.plz = {
    cap: "Produktlebenszyklus und Standortverlagerung", src: "nach Vernon (1966), Haas u. Neumair (2008), S. 55", wide: true,
    html: () => {
      const W = 860, H = 430;
      const xs = [70, 250, 430, 610, 790];
      let g = "";
      const curve = [[70, 300], [160, 285], [250, 240], [340, 140], [430, 80], [520, 70], [610, 95], [700, 170], [790, 250]];
      g += `<line x1="70" y1="300" x2="800" y2="300" class="vaxis"/><line x1="70" y1="300" x2="70" y2="40" class="vaxis"/>`;
      g += T(795, 318, "Zeit", { anchor: "end", cls: "vt vsm vmuted" }) + T(40, 170, "Absatz / Produktion", { anchor: "middle", rot: -90, cls: "vt vsm vmuted" });
      const ph = [["Einführung", "zentral", "Hochschulen, F&E, Fachkräfte, Fühlungsvorteile", "c"], ["Wachstum", "zentral → halbperipher", "Ausbau der Serienfertigung", "c"], ["Reife", "peripher", "Standardisierung, Kostendruck: Niedriglohnländer", "p"], ["Schrumpfung", "peripher", "Verlagerung oder Aufgabe der Produktion", "p"]];
      ph.forEach(([t, w, p, c], i) => {
        g += `<g${S(i)}><rect x="${xs[i]}" y="40" width="${xs[i + 1] - xs[i]}" height="260" class="vband ${i % 2 ? "b2" : ""}"/>` + T((xs[i] + xs[i + 1]) / 2, 58, t, { anchor: "middle", cls: "vt vstrong" }) +
          `<rect x="${xs[i] + 6}" y="326" width="${xs[i + 1] - xs[i] - 12}" height="30" rx="6" class="vloc ${c}"/>` + T((xs[i] + xs[i + 1]) / 2, 346, w, { anchor: "middle", cls: "vt vsm vstrong" }) +
          wrap((xs[i] + xs[i + 1]) / 2, 378, p, 26, { anchor: "middle", size: 12, cls: "vt vmuted" }) + `</g>`;
      });
      g += `<path d="${smooth(curve)}" class="vline vl-1 draw thick"${S(0)}/>`;
      return svg(W, H, g);
    }
  };

  F.cluster = {
    cap: "Akteure eines Clusters (nach Porter)", src: "nach Porter (1999), Haas u. Neumair (2008)", wide: true,
    html: () => {
      const W = 820, H = 420, cx = 410, cy = 205;
      const nodes = [["Zulieferer", "spezialisierte Vorleistungen"], ["Abnehmer / Nachfrage", "anspruchsvolle Kundschaft"], ["Hochschulen & Forschung", "Wissen, Spin-offs"], ["Aus- und Weiterbildung", "Fachkräfte-Pool"], ["Spezialisierte Dienste", "Beratung, Recht, Logistik"], ["Politik & Infrastruktur", "Förderung, Netze, Flächen"], ["Kapitalgeber", "Venture Capital, Banken"]];
      let g = "";
      nodes.forEach(([t, p], i) => {
        const a = -Math.PI / 2 + (i / nodes.length) * Math.PI * 2, x = cx + Math.cos(a) * 300, y = cy + Math.sin(a) * 160;
        g += `<g${S(1 + Math.floor(i / 3))}><line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" class="vspoke"/><rect x="${x - 96}" y="${y - 27}" width="192" height="54" rx="10" class="vnode"/>` + T(x, y - 4, t, { anchor: "middle", cls: "vt vsm vstrong" }) + T(x, y + 14, p, { anchor: "middle", cls: "vt vxs vmuted" }) + `</g>`;
      });
      g += `<g${S(0)}><circle cx="${cx}" cy="${cy}" r="70" class="vcenter"/>` + T(cx, cy - 4, "Unternehmen", { anchor: "middle", cls: "vt vstrong" }) + T(cx, cy + 14, "des Clusters", { anchor: "middle", cls: "vt vstrong" }) + T(cx, cy + 34, "Kooperation & Wettbewerb", { anchor: "middle", cls: "vt vxs vmuted" }) + `</g>`;
      return svg(W, H, g);
    }
  };

  F.irland = {
    cap: "Wirtschaftswachstum Irlands (reales BIP, % zum Vorjahr)", src: "Eurostat, Statista – Werte gerundet", wide: true,
    html: () => {
      const d = [["1991", 1.9], ["", 3.3], ["", 2.7], ["", 5.8], ["1995", 9.6], ["", 9.1], ["", 10.8], ["", 8.8], ["", 10.7], ["2000", 9.4], ["", 5.7], ["", 5.9], ["", 3.0], ["", 6.7], ["2005", 5.7], ["", 5.5], ["", 5.3], ["", -4.0], ["", -5.1], ["2010", 1.8], ["", 0.8], ["", 0.0], ["", 1.3], ["", 8.6], ["2015", 24.7], ["", 2.0], ["", 9.3], ["", 8.5], ["", 5.4], ["2020", 6.6], ["", 16.3], ["", 8.6], ["", -3.2], ["", 1.2], ["2025", 12.4]];
      return V.cols({ w: 860, h: 320, data: d, min: -10, max: 30, ticks: 4, stagger: true, per: 9, ylabel: "%", notes: [{ x: 560, y: 46, t: "2015: +24,7 % „Leprechaun Economics“", s: 3 }, { x: 405, y: 290, t: "2008/09: Finanzkrise", s: 1, anchor: "middle" }] }) +
        `<p class="vz-note">Die Sprünge ab 2015 spiegeln v. a. Buchungen multinationaler Konzerne; das modifizierte BNE (GNI*) verläuft viel ruhiger.</p>`;
    }
  };

  /* ---------- Kapitel 5 ---------- */
  F.hsr = {
    cap: "Länge des chinesischen Hochgeschwindigkeitsnetzes 2008–2025 (km)", src: "UIC (2024), China State Railway Group; gerundet",
    html: () => V.cols({ w: 680, h: 280, data: [["2008", 700], ["2011", 9700], ["2015", 19000], ["2019", 35000], ["2022", 42000], ["2024", 48000], ["2025", 50000]], values: true, stagger: true, per: 1, max: 75000, ticks: 3, ref: null, notes: [{ x: 370, y: 40, t: "Weltnetz gesamt ≈ 70.000 km → China > ⅔", s: 7 }] })
  };

  F.chinaindien = {
    cap: "China und Indien im Vergleich", src: "UN DESA (2024), IWF (2025), Weltbank (2023), UIC",
    html: () => V.table(["", "China", "Indien"], [["Bevölkerung 2024", "≈ 1,41 Mrd.", "≈ 1,45 Mrd."], ["Kinder je Frau", "≈ 1,0", "≈ 2,0"], ["Wirtschaftsöffnung", "ab 1978", "ab 1991"], ["Rang Volkswirtschaft (nominal)", "2", "4"], ["Hochgeschwindigkeitsbahn", "> 50.000 km", "im Bau (Mumbai–Ahmedabad)"], ["Logistics Performance Index 2023", "3,7", "3,4"], ["Handelsbilanz", "hoher Überschuss", "Defizit"]], { ss: [0, 0, 1, 1, 2, 2, 3] })
  };

  F.hubfeeder = {
    cap: "Hub-and-Feeder-System in der Containerschifffahrt (schematisch)", src: "eigene Darstellung",
    html: () => {
      const W = 760, H = 330;
      let g = V.arrowDefs("hf");
      g += `<rect width="${W}" height="${H}" class="vsea" rx="10"/>`;
      const hub = [380, 165];
      g += `<g${S(0)}><path d="M20,140 C150,150 260,160 ${hub[0]},${hub[1]} C500,170 610,180 740,190" class="vmainline"/>` + T(24, 176, "Hauptlinie: Großcontainerschiffe (> 20.000 TEU)", { cls: "vt vsm vstrong" }) + `</g>`;
      const feeders = [[200, 60], [300, 40], [500, 50], [600, 80], [210, 280], [380, 300], [560, 280]];
      feeders.forEach((f, i) => (g += `<g${S(1)}><path d="M${hub[0]},${hub[1]} Q${(hub[0] + f[0]) / 2 + 30},${(hub[1] + f[1]) / 2} ${f[0]},${f[1]}" class="vfeeder"/><circle cx="${f[0]}" cy="${f[1]}" r="8" class="vport"/></g>`));
      g += T(560, 312, "Feeder (Zubringer) → kleine Häfen", { cls: "vt vsm", s: 1 });
      g += `<g${S(2)}><circle cx="${hub[0]}" cy="${hub[1]}" r="24" class="vhub"/>` + T(hub[0], hub[1] + 5, "HUB", { anchor: "middle", cls: "vt vnumt" }) + T(hub[0] + 34, hub[1] + 44, "Transshipment, z. B. Singapur", { cls: "vt vsm vacc" }) + `</g>`;
      return svg(W, H, g);
    }
  };

  F.haefen = {
    cap: "Die größten Containerhäfen der Welt (Mio. TEU)", src: "Statista (2019); Hafenbetreiber, Lloyd’s List (2025)",
    html: () => V.bars({ data: [["Shanghai", 51.5, 42.0], ["Singapur", 41.1, 36.6], ["Ningbo-Zhoushan", 39.3, 26.4], ["Shenzhen", 33.4, 25.7], ["Qingdao", 30.9, 19.3], ["Guangzhou", 26.1, 21.9], ["Busan", 24.4, 21.6], ["Tianjin", 23.3, 16.0], ["Dubai (Jebel Ali)", 15.5, 14.9], ["Hongkong", 13.7, 19.6]], legend: ["2024", "2018/19"], dec: 1, left: 150, rowH: 32, max: 60, ticks: 6, highlight: ["Hongkong"], stagger: true, per: 3 })
  };

  F.landbruecken = {
    cap: "Eurasische Landbrücken: Transsib und Neue Eurasische Landbrücke", src: "nach Shu (1997), Zhang (2013)", wide: true,
    html: () =>
      V.map.render("eurasia", {
        routes: [
          { pts: R.transsib, cls: "r1", label: "Transsib · 10.900 km", lpos: [100, 58.5], s: 0 },
          { pts: R.nelb, cls: "r2", label: "Neue Eurasische Landbrücke · 11.870 km", lpos: [92, 37.5], s: 1 },
          { pts: R.yuxinou.slice(0, 3), cls: "r2 thin", s: 2 }
        ],
        points: [
          { p: P.wladiwostok, t: "Wladiwostok", dy: 16, s: 0 }, { p: P.moskau, t: "Moskau", dy: -8, s: 0 }, { p: P.rotterdam, t: "Rotterdam", anchor: "end", s: 0 },
          { p: P.lianyungang, t: "Lianyungang", s: 1 }, { p: P.duisburg, t: "Duisburg", anchor: "end", dy: 16, s: 2 }, { p: P.chongqing, t: "Chongqing", dy: 16, s: 2 }, { p: P.urumqi, t: "Ürümqi", dy: 16, s: 1 }
        ]
      })
  };

  F.bri = {
    cap: "Die Neue Seidenstraße (Belt and Road Initiative): Belt zu Land, Road zu Wasser", src: "eigene Darstellung (schematisch)", wide: true,
    html: () =>
      V.map.render("afroeurasia", {
        highlight: { "156": { cls: "hl-china" } },
        routes: [{ pts: R.belt, cls: "belt", w: 4, label: "Silk Road Economic Belt", lpos: [62, 47], s: 0 }, { pts: R.road, cls: "road", w: 4, label: "Maritime Silk Road", lpos: [70, 1.5], s: 1 }],
        points: [
          { p: P.xian, t: "Xi’an", s: 0 }, { p: P.khorgos, t: "Khorgos", dy: 16, s: 0 }, { p: P.duisburg, t: "Duisburg", anchor: "end", dy: -6, s: 0 },
          { p: P.piraeus, t: "Piräus (COSCO)", dy: 16, s: 2, cls: "key" }, { p: P.hambantota, t: "Hambantota", dy: 16, s: 2, cls: "warn" }, { p: P.gwadar, t: "Gwadar (CPEC)", anchor: "end", s: 2 },
          { p: P.mombasa, t: "Mombasa", anchor: "end", s: 2 }, { p: P.venedig, t: "Venedig", anchor: "end", dy: -6, s: 1 }, { p: [71.4, 51.2], t: "Kasachstan 2013", dy: -8, s: 3, cls: "key" }, { p: P.jakarta, t: "Indonesien 2013", dy: 16, s: 3, cls: "key" }
        ]
      })
  };

  /* ---------- Kapitel 6 ---------- */
  F.kollaps = {
    cap: "Ursachen für den Zusammenbruch der sozialistischen Planwirtschaften", src: "eigene Darstellung nach dem Skriptum", wide: true,
    html: () => {
      const W = 860, H = 400, cx = 430, cy = 200;
      const it = [["Fixe Preise", "Menge statt Effizienz; Angebot ≠ Nachfrage"], ["Mangelnde Arbeitsteilung", "veraltete Technik, zu breites Sortiment"], ["Überindustrialisierung", "Industrie bis ⅓ größer, hoher Ressourcenverbrauch"], ["Chronische Knappheit", "Zwischenprodukte selbst erzeugt → hohe Kosten"], ["Westverschuldung", "1971: 5,7 → 1981: 75 Mrd. USD („Schirmtheorie“)"], ["Rüstungsausgaben", "UdSSR real 25–30 % des BSP"]];
      let g = "";
      it.forEach(([t, p], i) => {
        const a = -Math.PI / 2 + (i / it.length) * Math.PI * 2, x = cx + Math.cos(a) * 300, y = cy + Math.sin(a) * 150;
        g += `<g${S(i + 1)}><line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" class="vspoke"/><rect x="${x - 118}" y="${y - 30}" width="236" height="60" rx="10" class="vnode"/>` + T(x, y - 7, t, { anchor: "middle", cls: "vt vsm vstrong" }) + wrap(x, y + 11, p, 34, { anchor: "middle", size: 11.5, cls: "vt vmuted" }) + `</g>`;
      });
      g += `<g${S(0)}><circle cx="${cx}" cy="${cy}" r="62" class="vcenter bad"/>` + T(cx, cy - 4, "Kollaps der", { anchor: "middle", cls: "vt vstrong" }) + T(cx, cy + 16, "Planwirtschaften", { anchor: "middle", cls: "vt vstrong" }) + `</g>`;
      return svg(W, H, g);
    }
  };

  F.donau = {
    cap: "Die Donau als Verkehrsachse – mit Main-Donau-Kanal zum Rhein", src: "eigene Darstellung nach Woitschützke (2006) und Donaukommission", wide: true,
    html: () =>
      V.map.render("ceurope", {
        routes: [{ pts: R.donau, cls: "river", w: 4, label: "Donau · 2.857 km (≈ 2.588 km schiffbar)", lpos: [22.3, 46.6], s: 0 }, { pts: R.maindonau, cls: "canal", w: 3, label: "Main-Donau-Kanal + Rhein (seit 1992)", lpos: [10.6, 51.2], anchor: "start", s: 1 }],
        points: [
          { p: P.ulm, t: "Ulm", dy: 16, anchor: "end", s: 0 }, { p: P.kelheim, t: "Kelheim", dy: -8, s: 1 }, { p: P.passau, t: "Passau", dy: -8, s: 0 }, { p: P.linz, t: "Linz", dy: 16, s: 0 }, { p: P.wien, t: "Wien", dy: -8, s: 0, cls: "key" },
          { p: P.bratislava, t: "Bratislava", dy: 16, s: 0 }, { p: P.budapest, t: "Budapest", s: 0 }, { p: P.belgrad, t: "Belgrad", s: 0 }, { p: P.ruse, t: "Ruse", dy: 16, s: 2 }, { p: P.constanta, t: "Constanța", s: 2 }, { p: P.sulina, t: "Sulina", s: 2 }, { p: P.rotterdam, t: "Rotterdam", s: 1 }
        ],
        labels: [{ p: [24.5, 43.4], t: "Grenze RO–BG ≈ 470 km · Schubverbände bis 20.000 t", s: 2, cls: "small" }, { p: [14.6, 47.55], t: "Österreich ≈ 350 km, 10 Schleusen", s: 0, cls: "small" }]
      })
  };

  F.korridore = {
    cap: "Schienenkorridore China–Europa und Kapazitäten pro Woche (2022, gerundet)", src: "nach Breinbauer (2022a, b)", wide: true,
    html: () =>
      V.map.render("centralasia", {
        routes: [
          { pts: R.nelb.slice(2), cls: "r2", label: "Nordroute (Iron Silk Road)", lpos: [68, 55.5], s: 0 },
          { pts: R.mittlerer, cls: "r1", label: "Mittlerer Korridor", lpos: [60, 40.8], s: 1 },
          { pts: R.schwarzmeer, cls: "r1 thin dash", s: 2 },
          { pts: R.sued, cls: "r5 dash", label: "Südroute (geplant)", lpos: [80, 27.5], s: 3 }
        ],
        points: [{ p: P.xian, t: "Xi’an", s: 0 }, { p: P.duisburg, t: "Duisburg", anchor: "end", s: 0 }, { p: P.aktau, t: "Aktau", dy: -8, s: 1 }, { p: P.baku, t: "Baku", dy: 16, s: 1 }, { p: P.tiflis, t: "Tiflis", dy: -8, s: 1 }, { p: P.constanta, t: "Constanța", anchor: "end", s: 2 }, { p: P.moskau, t: "Moskau", s: 0 }, { p: P.istanbul, t: "Istanbul", dy: 16, s: 1 }],
        labels: [{ p: [50.6, 42.2], t: "⛴ Kaspisches Meer", s: 1, cls: "small" }]
      }) + V.bars({ data: [["Seeweg Fernost–Europa", 450000], ["Transsib / Nordroute", 27500], ["Mittlerer Korridor", 3000]], unit: " TEU", left: 190, rowH: 34, s: 4, max: 500000, highlight: ["Mittlerer Korridor"] })
  };

  F.dunning = {
    cap: "Motive für Direktinvestitionen nach Dunning", src: "Dunning (2003), zit. nach Keppel u. Sieber (2008)",
    html: () =>
      V.cards([
        { k: "Hauptmotiv Österreichs", h: "Market Seeking", p: "neue Absatzmärkte – z. B. Banken, Handel, Versicherungen in MOE", tone: "acc", s: 0 },
        { h: "Efficiency Seeking", p: "Produktionskosten senken – Verlagerung lohnintensiver Fertigung", s: 1 },
        { h: "Resource Seeking", p: "Rohstoffe, Energie, Fachkräfte sichern", s: 2 },
        { h: "Strategic Seeking", p: "strategische Positionen – Marken, Technologie, Netze übernehmen", s: 3 }
      ], { cols: 2 })
  };

  F.zeitleiste = {
    cap: "Zeitleiste: die wichtigsten Daten auf einen Blick", src: "aus dem Lernbuch zusammengestellt", wide: true,
    html: () =>
      V.timeline([
        { y: "1908–1927", h: "Ford Model T", p: "Fließband 1913 – Prototyp des Fordismus" },
        { y: "1933", h: "Christaller", p: "„Die zentralen Orte in Süddeutschland“" },
        { y: "1953", h: "Hägerstrand", p: "Monte-Carlo-Simulation der Innovationsdiffusion" },
        { y: "1957", h: "Myrdal · Fairchild", p: "kumulative Verursachung · „verräterische Acht“" },
        { y: "1966", h: "Vernon", p: "Produktlebenszyklus" },
        { y: "1973 / 1979", h: "Ölpreisschocks", p: "Krise des Fordismus · Irland tritt 1973 der EWG bei" },
        { y: "1978", h: "Chinas Öffnung", p: "Reform- und Öffnungspolitik unter Deng Xiaoping" },
        { y: "1989", h: "Fall der Mauer", p: "Brunet: Blaue Banane · Ende der Planwirtschaften" },
        { y: "1990", h: "Polen: Schocktherapie", p: "Balcerowicz-Plan, 1. 1. 1990" },
        { y: "1991", h: "Indiens Liberalisierung", p: "Krugman: New Economic Geography · Zerfall der UdSSR" },
        { y: "1992", h: "Maastricht · Main-Donau-Kanal", p: "TEN-Grundlage · Neue Eurasische Landbrücke ab Lianyungang" },
        { y: "1995", h: "WTO / GATS", p: "Finnland in der EU" },
        { y: "2001", h: "China tritt der WTO bei", p: "„Push“ für die Hyperglobalisierung" },
        { y: "2008/09", h: "Weltwirtschaftskrise", p: "Welthandel bricht ein → Slowbalisation; Krugman-Nobelpreis 2008" },
        { y: "2010", h: "Irland unter dem Rettungsschirm", p: "85 Mrd. € von EU und IWF; Ausstieg Ende 2013" },
        { y: "2013", h: "Belt and Road Initiative", p: "Xi Jinping in Kasachstan und Indonesien" },
        { y: "2015", h: "Irland +24,7 %", p: "„Leprechaun Economics“" },
        { y: "2016", h: "Piräus an COSCO", p: "Panamakanal-Erweiterung" },
        { y: "2020/21", h: "Covid-Krise", p: "Rekordfrachtraten 2021, Bullwhip-Effekt" },
        { y: "2022", h: "Ukraine-Krieg", p: "Sanktionen, Mittlerer Korridor gewinnt; MSC größte Reederei" },
        { y: "2023", h: "Indien überholt China", p: "bevölkerungsreichstes Land · Italien verlässt die BRI" },
        { y: "2024", h: "Rotes Meer · TEN-V-Verordnung", p: "Huthi-Angriffe; neun Korridore, Kernnetz bis 2030" },
        { y: "2025", h: "Zölle der Trump-Administration", p: "Deglobalisierung? · Indien überholt Japan" },
        { y: "2026", h: "Iran-Krieg · Euro in Bulgarien", p: "Hormus/Suez blockiert → Kap-Route; 21 Euro-Staaten" }
      ])
  };
})();
