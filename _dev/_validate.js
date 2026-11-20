/* Validation harness - loaded only by _test.html (not deployed). */
(() => {
  const out = [], errs = [], warn = [];
  const H = window.__gmdiy;
  const MAX = new Date().getFullYear() + 1;
  const REQ_GEN = ["lugTorque", "lugPattern", "lugThread", "washer", "coolant", "rearAxle", "rearAxleCap", "fuelTank", "cabinFilter", "brakeFluid"];
  const REQ_ENG = ["name", "family", "oilCap", "oilVisc", "oilSpec", "filter", "drainTorque", "fuel", "intervalMi", "intervalMo"];
  const ids = new Set();
  ENGINES.forEach((e) => { if (ids.has(e.id)) errs.push("dup engine id " + e.id); ids.add(e.id);
    REQ_ENG.forEach((k) => { if (e[k] == null || e[k] === "") errs.push(`engine ${e.id} missing ${k}`); });
    if (!e.isEV && !e.isDiesel && (!e.plug || !e.gap)) errs.push(`engine ${e.id} missing plug/gap`);
    e.trans.forEach((t) => { if (!TRANSMISSIONS.find((x) => x.id === t)) errs.push(`engine ${e.id} unknown trans ${t}`); });
    e.models.forEach((m) => { if (!MODELS.find((x) => x.id === m)) errs.push(`engine ${e.id} unknown model ${m}`); });
  });
  const gids = new Set();
  GENERATIONS.forEach((g) => { if (gids.has(g.id)) errs.push("dup gen id " + g.id); gids.add(g.id);
    REQ_GEN.forEach((k) => { if (g[k] == null || g[k] === "") errs.push(`gen ${g.id} missing ${k}`); });
  });
  // overlapping generations for the same model
  MODELS.forEach((m) => {
    for (let y = 1990; y <= MAX; y++) {
      const n = GENERATIONS.filter((g) => g.models.includes(m.id) && y >= g.years[0] && y <= g.years[1]).length;
      if (n > 1) errs.push(`${m.id} ${y}: ${n} overlapping generations`);
    }
  });

  let configs = 0, schedRows = 0;
  const cover = {};
  MODELS.forEach((m) => {
    const ys = H.yearsFor(m.id);
    cover[m.id] = ys.length ? `${Math.min(...ys)}-${Math.max(...ys)} (${ys.length} yrs)` : "NONE";
    const missing = [];
    for (let y = Math.min(...ys); y <= Math.max(...ys); y++) if (!ys.includes(y)) missing.push(y);
    if (missing.length) warn.push(`${m.id} year gaps: ${missing.join(",")}`);
    ys.forEach((y) => {
      const engs = H.enginesFor(y, m.id).filter((e) => H.transFor(y, e).length);
      if (!engs.length) errs.push(`${m.id} ${y}: no engines`);
      engs.forEach((e) => {
        H.transFor(y, e).forEach((t) => {
          H.drivesFor(m.id, y, e).forEach((d) => {
            configs++;
            try {
              H.setSel({ make: m.make, model: m.id, year: y, engine: e.id, trans: t.id, drive: d });
              H.renderSpecs();
              const html = document.querySelector("#specOut").innerHTML;
              if (!html || html.length < 500) errs.push(`${m.id} ${y} ${e.id} ${t.id} ${d}: empty render`);
              if (/undefined|NaN|\[object/.test(html)) errs.push(`${m.id} ${y} ${e.id} ${t.id} ${d}: bad token in render`);
              schedRows += document.querySelectorAll("#specOut .sched li").length;
            } catch (ex) { errs.push(`${m.id} ${y} ${e.id} ${t.id} ${d}: ${ex.message}`); }
          });
        });
      });
    });
  });
  out.push(`MODELS ${MODELS.length} · GENERATIONS ${GENERATIONS.length} · ENGINES ${ENGINES.length} · TRANSMISSIONS ${TRANSMISSIONS.length}`);
  out.push(`CONFIGS ${configs} · SCHEDULE ROWS ${schedRows}`);
  Object.entries(cover).forEach(([k, v]) => out.push(`  ${k}: ${v}`));
  out.push(`WARN ${warn.length}`); warn.forEach((w) => out.push("  " + w));
  out.push(`ERRORS ${errs.length}`); errs.slice(0, 80).forEach((w) => out.push("  " + w));
  const pre = document.createElement("pre"); pre.id = "result"; pre.textContent = out.join("\n");
  document.body.innerHTML = ""; document.body.appendChild(pre);
})();
