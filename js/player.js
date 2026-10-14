/* Film-Player: Szenen mit gestaffelten Bildelementen, Untertiteln und Sprachausgabe (Web Speech API). */
(function () {
  const synth = window.speechSynthesis;
  const LS = (k, d) => { try { const v = localStorage.getItem("vg:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } };
  const SS = (k, v) => { try { localStorage.setItem("vg:" + k, JSON.stringify(v)); } catch (e) {} };
  let voices = [];
  const loadVoices = () => { if (!synth) return; voices = synth.getVoices().filter((v) => /^de/i.test(v.lang)); };
  if (synth) { loadVoices(); synth.onvoiceschanged = () => { loadVoices(); document.querySelectorAll(".cvoice").forEach(fillVoices); }; }
  function pickVoice() {
    const want = LS("voice", "");
    if (want) { const v = voices.find((x) => x.name === want); if (v) return v; }
    const pref = [/natural/i, /online/i, /google/i, /katja|conrad|amala|seraphina|florian/i, /de-AT/i];
    for (const p of pref) { const v = voices.find((x) => p.test(x.name) || p.test(x.lang)); if (v) return v; }
    return voices[0] || null;
  }
  function fillVoices(sel) {
    const cur = pickVoice();
    sel.innerHTML = voices.length ? voices.map((v) => `<option value="${V.esc(v.name)}"${cur && v.name === cur.name ? " selected" : ""}>${V.esc(v.name.replace(/Microsoft |Google /, "").slice(0, 28))}</option>`).join("") : `<option>keine deutsche Stimme</option>`;
  }
  const words = (s) => s.split(/\s+/).length;
  window.filmSeconds = (film) => film.scenes.reduce((a, sc) => a + sc.say.reduce((b, s) => b + words(s) / 2.5 + 0.4, 0) + 1, 0);

  let active = null;
  window.Player = {
    stopAll() { if (active) active.destroy(); active = null; },
    mount(root, film, o = {}) {
      if (active) active.destroy();
      const st = { sc: 0, si: -1, playing: false, timer: null, guard: null, utt: null, dead: false, started: false };
      const voiceOn = () => LS("voiceOn", true) && !!synth;
      const capsOn = () => LS("caps", true);
      const rate = () => LS("rate", 1);
      root.innerHTML = `
        <div class="player" tabindex="0">
          <div class="fstage">
            <div class="fhead"><div class="fmeta-l"><span class="rec">REC</span><span class="ftc">00:00</span><span>Kap. 0${(film.kap || "k0").slice(1)} // ${film.id.toUpperCase()}</span></div><h3 class="ftitle"></h3><span class="meta fmeta"></span></div>
            <div class="fvis"><div class="fit"></div></div>
            <div class="fcap" aria-live="polite"></div>
            <div class="fcover">
              <div class="inner">
                <span class="fbadge">ERKLÄRFILM · ${film.scenes.length} SZENEN · ≈ ${Math.max(1, Math.round(filmSeconds(film) / 60))} MIN</span>
                <h3>${V.esc(film.t)}</h3>
                <p>${V.esc(film.sub || "")}</p>
                <button class="playbig" aria-label="Film abspielen">▶</button>
                <p style="font-size:13px">${synth ? "Mit Sprachausgabe – Ton an. Untertitel lassen sich unten ein- und ausschalten." : "Dein Browser hat keine Sprachausgabe – der Film läuft mit Untertiteln."}</p>
              </div>
            </div>
          </div>
          <div class="fctl">
            <button class="cbtn b-prev" title="Vorige Szene" aria-label="Vorige Szene">⏮</button>
            <button class="cbtn b-play" title="Abspielen / Pause (Leertaste)" aria-label="Abspielen">▶</button>
            <button class="cbtn b-next" title="Nächste Szene" aria-label="Nächste Szene">⏭</button>
            <div class="segs">${film.scenes.map((s, i) => `<button title="Szene ${i + 1}: ${V.esc(s.h)}" aria-label="Szene ${i + 1}"><i></i></button>`).join("")}</div>
            <button class="cbtn b-cc" aria-pressed="${capsOn()}" title="Untertitel">CC</button>
            <button class="cbtn b-voice" aria-pressed="${voiceOn()}" title="Sprachausgabe">🔊</button>
            <select class="cspeed" title="Tempo" aria-label="Tempo">${[0.8, 0.9, 1, 1.1, 1.25, 1.5].map((r) => `<option value="${r}"${r == rate() ? " selected" : ""}>${r}×</option>`).join("")}</select>
            ${synth ? `<select class="cspeed cvoice" title="Stimme" aria-label="Stimme"></select>` : ""}
            <button class="cbtn b-full" title="Vollbild" aria-label="Vollbild">⛶</button>
          </div>
        </div>`;
      const q = (s) => root.querySelector(s);
      const P = q(".player"), fit = q(".fit"), vis = q(".fvis"), cap = q(".fcap"), cover = q(".fcover");
      const segs = [...root.querySelectorAll(".segs button")];
      if (q(".cvoice")) fillVoices(q(".cvoice"));
      cap.hidden = !capsOn();

      function fitNow() {
        if (st.dead) return;
        const sm = vis.clientWidth < 500, aw = vis.clientWidth - (sm ? 20 : 72), ah = vis.clientHeight - (sm ? 12 : 28);
        fit.style.transform = "translate(-50%,-50%) scale(1)";
        const w = fit.offsetWidth, h = fit.scrollHeight;
        if (!w || !h) return;
        const k = Math.min(1.7, ah / h, aw / w);
        fit.style.transform = `translate(-50%,-50%) scale(${Math.max(0.3, k)})`;
      }
      const ro = new ResizeObserver(fitNow);
      ro.observe(vis);
      ro.observe(fit);

      function renderScene(i) {
        const sc = film.scenes[i];
        q(".ftitle").textContent = sc.h;
        q(".fmeta").textContent = `${String(i + 1).padStart(2, "0")}/${String(film.scenes.length).padStart(2, "0")}`;
        try { fit.innerHTML = sc.v(); } catch (e) { fit.innerHTML = `<p>Bild konnte nicht geladen werden.</p>`; console.error(e); }
        if (fit.querySelector(".vz-mapwait")) V.map.load().then(() => { if (!st.dead && st.sc === i) { V.map.hydrate(fit); V.declutter(fit); prepDraw(); reveal(st.si); fitNow(); } });
        V.declutter(fit);
        prepDraw();
        reveal(st.si);
        requestAnimationFrame(fitNow);
        setTimeout(fitNow, 250);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!st.dead) { V.declutter(fit); fitNow(); } });
        segs.forEach((b, k) => (b.querySelector("i").style.width = k < i ? "100%" : "0"));
        o.onScene && o.onScene(i);
      }
      function prepDraw() {
        fit.querySelectorAll(".draw[data-s]").forEach((p) => {
          if (!p.getTotalLength) return;
          let L = 0;
          try { L = p.getTotalLength(); } catch (e) {}
          if (!L) return;
          p.dataset.len = L;
          p.classList.remove("prep");
          p.style.strokeDasharray = `${L} ${L}`;
          p.style.strokeDashoffset = L;
        });
      }
      function reveal(si) {
        fit.querySelectorAll("[data-s]").forEach((el) => {
          const on = +el.dataset.s <= si;
          if (el.classList.contains("draw") && el.dataset.len) {
            if (on && !el.classList.contains("on")) {
              el.classList.add("prep", "on");
              requestAnimationFrame(() => (el.style.strokeDashoffset = 0));
              setTimeout(() => { if (el.classList.contains("on")) { el.style.strokeDasharray = ""; el.style.strokeDashoffset = ""; } }, 1750);
            } else if (!on && el.classList.contains("on")) {
              el.classList.remove("on", "prep");
              el.style.strokeDasharray = `${el.dataset.len} ${el.dataset.len}`;
              el.style.strokeDashoffset = el.dataset.len;
            }
          } else el.classList.toggle("on", on);
        });
      }
      function clearTimers() { clearTimeout(st.timer); clearTimeout(st.guard); st.timer = st.guard = null; }
      function stopSpeech() { if (synth) { st.utt && (st.utt.onend = st.utt.onerror = null); synth.cancel(); } st.utt = null; }

      function sayCurrent() {
        if (st.dead || !st.playing) return;
        const sc = film.scenes[st.sc];
        const text = sc.say[st.si];
        cap.textContent = text;
        reveal(st.si);
        segs[st.sc].querySelector("i").style.width = ((st.si + 1) / sc.say.length) * 100 + "%";
        o.onSentence && o.onSentence(st.sc, st.si);
        const est = (words(text) * 0.42 + 0.6) / rate();
        const next = () => { if (st.dead || !st.playing) return; clearTimers(); st.timer = setTimeout(advance, 380 / rate()); };
        if (voiceOn()) {
          stopSpeech();
          const u = new SpeechSynthesisUtterance(text);
          u.lang = "de-DE";
          const v = pickVoice();
          if (v) { u.voice = v; u.lang = v.lang; }
          u.rate = rate();
          u.onend = next;
          u.onerror = (e) => { if (e.error !== "interrupted" && e.error !== "canceled") next(); };
          st.utt = u;
          synth.speak(u);
          st.guard = setTimeout(next, est * 2600 + 4000);
        } else {
          st.timer = setTimeout(advance, est * 1000 + 400);
        }
      }
      function advance() {
        if (st.dead) return;
        clearTimers();
        const sc = film.scenes[st.sc];
        if (st.si < sc.say.length - 1) { st.si++; sayCurrent(); return; }
        // Szene fertig → alles zeigen, kurz halten, weiter
        reveal(99);
        st.timer = setTimeout(() => {
          if (st.sc < film.scenes.length - 1) { st.sc++; st.si = 0; renderScene(st.sc); sayCurrent(); }
          else finish();
        }, 1100 / rate());
      }
      function finish() {
        st.playing = false;
        setBtn();
        const seen = LS("films", {}); seen[film.id] = Date.now(); SS("films", seen);
        cover.hidden = false;
        cover.querySelector(".inner").innerHTML = `<span class="fbadge">GESCHAFFT</span><h3>${V.esc(film.t)}</h3><p>Der Film ist als gesehen markiert.</p><div class="row" style="justify-content:center"><button class="btn b-replay">↺ Nochmal ansehen</button>${o.nextHtml || ""}</div>`;
        cover.querySelector(".b-replay").onclick = () => { st.sc = 0; st.si = 0; cover.hidden = true; renderScene(0); play(); };
        o.onEnd && o.onEnd();
      }
      function setBtn() { const b = q(".b-play"); b.textContent = st.playing ? "⏸" : "▶"; b.setAttribute("aria-label", st.playing ? "Pause" : "Abspielen"); P.classList.toggle("playing", st.playing);
        clearInterval(st.tc); if (st.playing) st.tc = setInterval(() => { st.el = (st.el || 0) + 1; const t = q(".ftc"); if (t) t.textContent = `${String(Math.floor(st.el / 60)).padStart(2, "0")}:${String(st.el % 60).padStart(2, "0")}`; }, 1000); }
      function play() {
        if (st.dead) return;
        if (active && active !== ctl) active.pause();
        active = ctl;
        cover.hidden = true;
        st.playing = true; setBtn();
        if (st.si < 0) st.si = 0;
        if (!st.started) { st.started = true; renderScene(st.sc); }
        sayCurrent();
      }
      function pause() { st.playing = false; clearTimers(); stopSpeech(); setBtn(); }
      function goto(i, autoplay = st.playing) {
        clearTimers(); stopSpeech();
        st.sc = Math.max(0, Math.min(film.scenes.length - 1, i)); st.si = 0; st.started = true;
        cover.hidden = true;
        renderScene(st.sc);
        cap.textContent = film.scenes[st.sc].say[0];
        if (autoplay) { st.playing = true; setBtn(); sayCurrent(); } else { reveal(0); setBtn(); }
      }
      const ctl = { play, pause, goto, get state() { return st; },
        destroy() { st.dead = true; clearInterval(st.tc); clearTimers(); stopSpeech(); ro.disconnect(); if (active === ctl) active = null; } };

      q(".playbig").onclick = play;
      q(".b-play").onclick = () => (st.playing ? pause() : play());
      q(".b-prev").onclick = () => goto(st.sc - (st.si > 0 && st.sc >= 0 ? 0 : 1));
      q(".b-next").onclick = () => goto(st.sc + 1);
      segs.forEach((b, i) => (b.onclick = () => goto(i)));
      q(".b-cc").onclick = (e) => { const v = !capsOn(); SS("caps", v); cap.hidden = !v; e.currentTarget.setAttribute("aria-pressed", v); };
      q(".b-voice").onclick = (e) => {
        if (!synth) return;
        const v = !LS("voiceOn", true); SS("voiceOn", v); e.currentTarget.setAttribute("aria-pressed", v);
        if (st.playing) { clearTimers(); stopSpeech(); sayCurrent(); }
      };
      root.querySelectorAll(".cspeed:not(.cvoice)").forEach((s) => (s.onchange = () => { SS("rate", +s.value); if (st.playing) { clearTimers(); stopSpeech(); sayCurrent(); } }));
      if (q(".cvoice")) q(".cvoice").onchange = (e) => { SS("voice", e.target.value); if (st.playing) { clearTimers(); stopSpeech(); sayCurrent(); } };
      q(".b-full").onclick = () => { if (document.fullscreenElement) document.exitFullscreen(); else P.requestFullscreen && P.requestFullscreen().catch(() => {}); };
      P.addEventListener("keydown", (e) => {
        if (e.target.tagName === "SELECT") return;
        if (e.key === " " || e.key === "k") { e.preventDefault(); st.playing ? pause() : play(); }
        if (e.key === "ArrowRight") goto(st.sc + 1);
        if (e.key === "ArrowLeft") goto(st.sc - 1);
      });
      // Vorschau: erste Szene vollständig, unter dem Cover
      renderScene(0); reveal(99); st.si = -1;
      if (o.startScene) { goto(o.startScene, false); cover.hidden = false; }
      if (o.autoplay) play();
      return ctl;
    }
  };
})();
