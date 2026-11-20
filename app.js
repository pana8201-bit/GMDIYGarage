/* DIY Garage - GM truck & SUV parts/spec reference - application logic
   Independent project. Not affiliated with General Motors. */
(() => {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const LS = "gmdiy.v1";               // unique key - the Ford app on the same origin uses "f150fsr.v1"
  const MAX_YEAR = new Date().getFullYear() + 1;
  const MAKES = ["Chevrolet", "GMC", "Cadillac"];

  // ---------------- state ----------------
  const defaults = {
    truck: null,              // {make, model, year, engine, trans, drive}
    name: "", vin: "",
    odo: null,
    settings: { mi: null, mo: null, warn: 500 },
    log: [],
    expenses: [],
    lastNotified: null
  };
  let S = load();
  let sel = { make: "Chevrolet", model: "chev_lt", year: null, engine: null, trans: null, drive: "4x4" };

  function load() {
    const base = JSON.parse(JSON.stringify(defaults));
    try {
      const d = JSON.parse(localStorage.getItem(LS)) || {};
      const s = Object.assign(base, d, { settings: Object.assign(base.settings, d.settings || {}) });
      if (!Array.isArray(s.expenses)) s.expenses = [];
      if (!Array.isArray(s.log)) s.log = [];
      if (s.truck && !MODELS.some((m) => m.id === s.truck.model)) s.truck = null;
      return s;
    } catch { return base; }
  }
  function save() { localStorage.setItem(LS, JSON.stringify(S)); }

  // ---------------- helpers ----------------
  const inRange = (y, r) => y >= r[0] && y <= r[1];
  const modelById = (id) => MODELS.find((m) => m.id === id);
  const genFor = (y, m = sel.model) => GENERATIONS.find((g) => g.models.includes(m) && inRange(y, g.years));
  const engById = (id) => ENGINES.find((e) => e.id === id);
  const trById = (id) => TRANSMISSIONS.find((t) => t.id === id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmtMi = (n) => (n == null || isNaN(n) ? "---" : Number(n).toLocaleString("en-US"));
  const fmtDate = (d) => new Date(d + (d.length === 10 ? "T12:00:00" : "")).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  const addMonths = (iso, m) => { const d = new Date(iso + "T12:00:00"); d.setMonth(d.getMonth() + Number(m)); return d; };
  const todayISO = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
  const money = (n) => "$" + Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  // short value for summary tiles
  const short = (v) => (/confirm/i.test(v || "") ? "See VIN" : String(v || "-").replace("ACDelco ", "").split(" (")[0].split(" / ")[0]);
  const vehName = (t) => `${t.year} ${t.make || modelById(t.model)?.make || ""} ${modelDisplay(t.model, t.year)}`.replace(/\s+/g, " ");

  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2200);
  }

  function enginesFor(y, m = sel.model) { return ENGINES.filter((e) => e.models.includes(m) && inRange(y, e.years)); }
  function transFor(y, eng) {
    if (!eng) return [];
    return eng.trans.map(trById).filter((t) => t && inRange(y, (eng.transYears && eng.transYears[t.id]) || t.years));
  }
  function drivesFor(m, y, e) {
    const g = genFor(y, m);
    return (e && e.drives) || (g && g.drives) || modelById(m).drives;
  }

  // ---------------- selector ----------------
  function yearsFor(m) {
    const out = [];
    for (let y = MAX_YEAR; y >= 1990; y--) if (genFor(y, m) && enginesFor(y, m).some((e) => transFor(y, e).length)) out.push(y);
    return out;
  }
  function setMake(mk) {
    sel.make = mk;
    $$("#segMake button").forEach((b) => b.classList.toggle("on", b.dataset.v === mk));
  }
  function fillModels() {
    const s = $("#selModel"); s.innerHTML = "";
    const list = MODELS.filter((m) => m.make === sel.make && yearsFor(m.id).length);
    list.forEach((m) => s.add(new Option(m.name, m.id)));
    if (!list.some((m) => m.id === sel.model)) sel.model = list[0]?.id;
    s.value = sel.model;
  }
  function fillYears() {
    const s = $("#selYear"); s.innerHTML = "";
    const ys = yearsFor(sel.model);
    ys.forEach((y) => s.add(new Option(y, y)));
    if (!ys.includes(sel.year)) {
      const target = sel.year || new Date().getFullYear();
      sel.year = ys.reduce((a, b) => (Math.abs(b - target) < Math.abs(a - target) ? b : a), ys[0]);
    }
    s.value = sel.year;
  }
  function fillEngines() {
    const s = $("#selEngine"); s.innerHTML = "";
    const list = enginesFor(sel.year).filter((e) => transFor(sel.year, e).length);
    list.forEach((e) => s.add(new Option(e.name, e.id)));
    if (!list.some((e) => e.id === sel.engine)) sel.engine = list[0]?.id;
    s.value = sel.engine;
  }
  function fillTrans() {
    const s = $("#selTrans"); s.innerHTML = "";
    const list = transFor(sel.year, engById(sel.engine));
    list.forEach((t) => s.add(new Option(t.name, t.id)));
    if (!list.some((t) => t.id === sel.trans)) sel.trans = list[0]?.id;
    s.value = sel.trans;
  }
  function fillDrives() {
    const ds = drivesFor(sel.model, sel.year, engById(sel.engine));
    if (!ds.includes(sel.drive)) sel.drive = ds.includes("4x4") ? "4x4" : ds[0];
    $("#segDrive").innerHTML = ds.map((d) => `<button type="button" data-v="${esc(d)}" class="${d === sel.drive ? "on" : ""}">${esc(d)}</button>`).join("");
    $$("#segDrive button").forEach((b) => (b.onclick = () => { sel.drive = b.dataset.v; fillDrives(); renderSpecs(); }));
  }
  const refillFrom = (lvl) => {
    if (lvl <= 0) fillModels();
    if (lvl <= 1) fillYears();
    if (lvl <= 2) fillEngines();
    if (lvl <= 3) fillTrans();
    fillDrives(); renderSpecs();
  };

  function bindSelector() {
    $$("#segMake button").forEach((b) => (b.onclick = () => { setMake(b.dataset.v); refillFrom(0); }));
    $("#selModel").onchange = (e) => { sel.model = e.target.value; refillFrom(1); };
    $("#selYear").onchange = (e) => { sel.year = +e.target.value; refillFrom(2); };
    $("#selEngine").onchange = (e) => { sel.engine = e.target.value; refillFrom(3); };
    $("#selTrans").onchange = (e) => { sel.trans = e.target.value; renderSpecs(); };
    $("#btnSaveTruck").onclick = () => {
      const prev = S.truck && engById(S.truck.engine);
      S.truck = { ...sel };
      const e = engById(sel.engine);
      // reset the oil interval when the engine changes (e.g. gas -> diesel)
      if (S.settings.mi == null || !prev || prev.id !== e.id) { S.settings.mi = e.intervalMi; S.settings.mo = e.intervalMo; }
      save(); renderAll(); toast(`Saved ${vehName(sel)} as My Vehicle`);
    };
  }

  // ---------------- spec sheet ----------------
  function row(label, value, { big = false, flag = false, copy = false } = {}) {
    if (value == null || value === "") return "";
    const c = copy && value && !/^N\/A|confirm|Not equipped|In-tank|Equipped/i.test(value)
      ? `<button class="copy" data-copy="${esc(String(value).split(" (")[0])}" title="Copy">⧉</button>` : "";
    return `<tr><th>${esc(label)}</th><td class="${big ? "big" : ""}${big && String(value).length > 28 ? " long" : ""}">${esc(value)}${flag ? '<span class="vtag">VERIFY</span>' : ""}${c}</td></tr>`;
  }

  function renderSpecs() {
    const g = genFor(sel.year), e = engById(sel.engine), t = trById(sel.trans);
    if (!g || !e || !t) { $("#specOut").innerHTML = ""; $("#genLine").textContent = ""; return; }
    const ev = (k) => (e.verify || []).includes(k);
    const tv = (k) => (t.verify || []).includes(k);
    const gv = (k) => (g.verify || []).includes(k);
    const is4 = is4wd(sel.drive) && !e.isEV;
    const pick = (k) => (e[k] !== undefined ? e[k] : g[k]);          // engine overrides generation
    const pv = (k) => (e[k] !== undefined ? ev(k) : gv(k));
    const mName = modelDisplay(sel.model, sel.year);

    $("#genLine").textContent =
      `${sel.make} ${mName} · ${g.code} · ${g.platform} · MY ${g.years[0]}-${g.years[1] > 2090 ? "present" : g.years[1]} · ${e.family}`;

    const hero = e.isEV ? `
      <div class="hero">
        <div class="kpi"><div class="k">LUG NUT TORQUE</div><div class="v">${esc(short(g.lugTorque))}</div></div>
        <div class="kpi"><div class="k">BOLT PATTERN</div><div class="v">${esc(short(g.lugPattern))}</div></div>
        <div class="kpi"><div class="k">DRIVE</div><div class="v">${esc(sel.drive)}</div></div>
        <div class="kpi"><div class="k">ROTATE EVERY</div><div class="v">${fmtMi(e.intervalMi)} mi</div></div>
      </div>` : `
      <div class="hero">
        <div class="kpi"><div class="k">OIL CAPACITY</div><div class="v">${esc(short(e.oilCap))}</div></div>
        <div class="kpi"><div class="k">OIL GRADE</div><div class="v">${esc(short(e.oilVisc).replace("SAE ", ""))}</div></div>
        <div class="kpi"><div class="k">OIL FILTER</div><div class="v">${esc(short(e.filter))}</div></div>
        <div class="kpi"><div class="k">LUG TORQUE</div><div class="v">${esc(short(g.lugTorque))}</div></div>
      </div>`;

    const engineCard = e.isEV ? "" : `
      <div class="card">
        <div class="card-h"><span class="sec">02</span> ENGINE LUBRICATION</div>
        <table class="spec">
          ${row("Oil capacity (w/ filter)", e.oilCap, { big: true, flag: ev("oilCap") })}
          ${row("Oil viscosity", e.oilVisc, { flag: ev("oilVisc") })}
          ${row("Oil specification", e.oilSpec, { flag: ev("oilSpec") })}
          ${row("Oil filter (ACDelco)", e.filter, { big: true, flag: ev("filter"), copy: true })}
          ${row("Oil pan drain plug torque", e.drainTorque, { flag: ev("drainTorque") })}
        </table>
      </div>`;

    const transCard = `
      <div class="card">
        <div class="card-h"><span class="sec">03</span> ${e.isEV ? "DRIVE UNITS" : "TRANSMISSION"} · ${esc(t.type.toUpperCase())}</div>
        <table class="spec">
          ${row("Unit", t.name)}
          ${row("Fluid type", t.fluid, { big: true, flag: tv("fluid") })}
          ${row("Fluid capacity", t.capacity, { flag: tv("capacity") })}
          ${row("Drain plug torque", t.drain, { flag: tv("drain") })}
          ${row("Pan / level check", t.pan, { flag: tv("pan") })}
        </table>
        ${(t.notes || []).length ? `<ul class="notes">${t.notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}
      </div>`;

    const fuelCard = `
      <div class="card">
        <div class="card-h"><span class="sec">04</span> ${e.isEV ? "ENERGY" : "FUEL · IGNITION"}</div>
        <table class="spec">
          ${row(e.isEV ? "Energy" : "Fuel type", e.fuel, { big: true, flag: ev("fuel") })}
          ${row(e.isEV ? "Fuel tank" : "Fuel tank capacity", pick("fuelTank"), { flag: pv("fuelTank") })}
          ${e.isEV || e.isDiesel ? "" : row("Spark plug", e.plug, { big: true, flag: ev("plug"), copy: true })}
          ${e.isEV || e.isDiesel ? "" : row("Spark plug gap", e.gap, { flag: ev("gap") })}
          ${e.isDiesel ? row("Ignition", "Compression ignition - glow plugs (not a routine DIY item)") : ""}
          ${e.plugMi ? row("Plug replacement", `Every ${fmtMi(e.plugMi)} mi`, { flag: ev("plugMi") }) : ""}
        </table>
      </div>`;

    const filterCard = `
      <div class="card">
        <div class="card-h"><span class="sec">05</span> FILTERS</div>
        <table class="spec">
          ${e.isEV ? "" : row("Oil filter", e.filter, { flag: ev("filter"), copy: true })}
          ${e.isEV ? "" : row("Engine air filter", pick("airFilter"), { big: true, flag: pv("airFilter"), copy: true })}
          ${row("Cabin air filter", g.cabinFilter, { flag: gv("cabinFilter"), copy: true })}
          ${e.isEV ? "" : row("Fuel filter", pick("fuelFilter"), { flag: pv("fuelFilter"), copy: true })}
          ${e.isEV ? "" : row("Fuel filter interval", (pick("fuelFilterMi") ? `Every ${fmtMi(pick("fuelFilterMi"))} mi` : "Not scheduled"), { flag: pv("fuelFilterMi") })}
        </table>
      </div>`;

    const diffCard = e.isEV ? "" : `
      <div class="card">
        <div class="card-h"><span class="sec">06</span> DIFFERENTIALS · TRANSFER CASE</div>
        <table class="spec">
          ${row("Rear differential fluid", g.rearAxle, { big: true, flag: gv("rearAxle") })}
          ${row("Rear differential capacity", g.rearAxleCap, { flag: gv("rearAxleCap") })}
          ${is4 ? row("Front differential fluid", g.frontDiff, { big: true }) : ""}
          ${is4 ? row("Front differential capacity", g.frontDiffCap, { flag: gv("frontDiffCap") }) : ""}
          ${is4 ? row("Transfer case", g.transferCase, { flag: gv("transferCase") }) : ""}
          ${row("Fill level", "To the bottom edge of the fill-plug hole, vehicle level. Remove the FILL plug first.")}
          ${row("Axle ID", "RPO label (glovebox / console lid): G80 = locking rear diff, GU/GT codes = ratio")}
        </table>
        ${is4 ? "" : '<p class="hint" style="margin-bottom:12px">Select 4x4 / AWD to see front differential and transfer case specs.</p>'}
      </div>`;

    const chassisCard = `
      <div class="card">
        <div class="card-h"><span class="sec">07</span> WHEELS · CHASSIS · FLUIDS</div>
        <table class="spec">
          ${row("Lug nut torque", g.lugTorque, { big: true, flag: gv("lugTorque") })}
          ${row("Bolt pattern", g.lugPattern, { flag: gv("lugPattern") })}
          ${row("Stud thread", g.lugThread, { flag: gv("lugThread") })}
          ${row("Washer fluid reservoir", g.washer, { flag: gv("washer") })}
          ${row(e.isEV ? "Coolant (battery / electronics)" : "Engine coolant", g.coolant)}
          ${row("Brake fluid", g.brakeFluid)}
        </table>
      </div>`;

    const schedCard = renderSchedule({ year: sel.year, gen: g, eng: e, trans: t, drive: sel.drive });

    const notes = [...(e.notes || []), ...(g.notes || [])];
    const notesCard = notes.length ? `
      <div class="card">
        <div class="card-h"><span class="sec">09</span> TECH NOTES</div>
        <ul class="notes">${notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>
      </div>` : "";

    $("#specOut").innerHTML = `
      <div class="card">
        <div class="card-h"><span class="sec">SUM</span> ${esc(sel.year + " " + sel.make + " " + mName)} · ${esc(e.name)} · ${esc(sel.drive.toUpperCase())}</div>
        ${hero}
      </div>
      ${engineCard}${transCard}${fuelCard}${filterCard}${diffCard}${chassisCard}${schedCard}${notesCard}`;

    $$("#specOut .copy").forEach((b) => (b.onclick = () => {
      navigator.clipboard?.writeText(b.dataset.copy).then(() => toast(`Copied ${b.dataset.copy}`));
    }));
  }

  // ---------------- DIY maintenance schedule ----------------
  const normType = (t) => SERVICE_ALIASES[t] || t;
  const resolve = (v, c) => (typeof v === "function" ? v(c) : v);

  function isMyTruck(c) {
    return S.truck && S.truck.model === sel.model && S.truck.year === c.year && S.truck.engine === c.eng.id && S.truck.trans === c.trans.id && S.truck.drive === c.drive;
  }

  function scheduleStatus(item, c) {
    const mi = resolve(item.mi, c), mo = resolve(item.mo, c);
    if (!isMyTruck(c)) return { mi, mo };
    const last = S.log.filter((l) => normType(l.type) === item.type)
      .sort((a, b) => b.date.localeCompare(a.date) || b.miles - a.miles)[0];
    if (!last) return { mi, mo, never: true };
    const odo = S.odo != null ? Math.max(S.odo, last.miles) : last.miles;
    const miLeft = mi ? last.miles + mi - odo : null;
    const dueDate = mo ? addMonths(last.date, mo) : null;
    const dLeft = dueDate ? Math.ceil((dueDate - new Date()) / 864e5) : null;
    const over = (miLeft != null && miLeft <= 0) || (dLeft != null && dLeft <= 0);
    const soon = !over && ((miLeft != null && miLeft <= Math.max(500, mi * 0.1)) || (dLeft != null && dLeft <= 30));
    return { mi, mo, last, miLeft, dueDate, dLeft, lvl: over ? "bad" : soon ? "warn" : "ok", dueMi: mi ? last.miles + mi : null };
  }

  function renderSchedule(c) {
    const mine = isMyTruck(c);
    const items = SCHEDULE.filter((s) => s.when(c));
    const rows = items.map((s) => {
      const st = scheduleStatus(s, c);
      const every = [st.mi ? `${fmtMi(st.mi)} mi` : null, st.mo ? `${st.mo} mo` : null].filter(Boolean).join(" / ") || "Inspect";
      const part = s.part ? resolve(s.part, c) : "";
      const sev = s.severe ? resolve(s.severe, c) : "";
      let status = "";
      if (mine) {
        if (st.never) status = `<span class="chip">NOT LOGGED</span>`;
        else {
          const bits = [];
          if (st.dueMi) bits.push(st.miLeft <= 0 ? `${fmtMi(-st.miLeft)} mi over` : `${fmtMi(st.miLeft)} mi left`);
          if (st.dueDate) bits.push(st.dLeft <= 0 ? "date passed" : `${st.dLeft} d left`);
          status = `<span class="chip ${st.lvl}">${st.lvl === "bad" ? "OVERDUE" : st.lvl === "warn" ? "DUE SOON" : "OK"}</span>
                    <div class="sub">Last ${fmtMi(st.last.miles)} mi · ${fmtDate(st.last.date)} · ${bits.join(" · ")}</div>`;
        }
      }
      return `<li>
        <div class="sx-h"><b>${esc(s.type)}</b><span class="every">${every}</span></div>
        ${part ? `<div class="sub">${esc(part)}</div>` : ""}
        ${sev ? `<div class="sub sev">Severe duty: ${esc(sev)}</div>` : ""}
        ${status}
      </li>`;
    }).join("");
    return `
      <div class="card">
        <div class="card-h"><span class="sec">08</span> DIY MAINTENANCE SCHEDULE</div>
        <p class="hint">Typical "normal" schedule. Replace at whichever comes first, miles or months. 1999+ vehicles: follow the Oil Life System if it calls for service sooner.
          ${mine ? "Status comes from your Service Log." : "Tap <b>★ MY VEHICLE</b> to see how each item compares with your Service Log."}</p>
        <ul class="sched">${rows}</ul>
      </div>`;
  }

  // ---------------- service tracker ----------------
  function primaryService() {
    const e = S.truck && engById(S.truck.engine);
    return e && e.isEV ? "Tire Rotation" : "Oil & Filter Change";
  }

  function computeDue() {
    if (!S.truck) return null;
    const type = primaryService();
    const last = S.log.filter((l) => normType(l.type) === type).sort((a, b) => b.miles - a.miles || b.date.localeCompare(a.date))[0];
    if (!last) return { type, none: true };
    const mi = +S.settings.mi, mo = +S.settings.mo, warn = +S.settings.warn || 0;
    const dueMiles = last.miles + mi;
    const dueDate = addMonths(last.date, mo);
    const odo = S.odo != null ? Math.max(S.odo, last.miles) : last.miles;
    const milesLeft = dueMiles - odo;
    const daysLeft = Math.ceil((dueDate - new Date()) / 864e5);
    const totalDays = Math.max(1, Math.round((dueDate - new Date(last.date + "T12:00:00")) / 864e5));
    const lvl = (left, w) => (left <= 0 ? "bad" : left <= w ? "warn" : "ok");
    return {
      type, last, dueMiles, dueDate, milesLeft, daysLeft,
      miPct: Math.min(100, Math.max(0, ((odo - last.miles) / mi) * 100)),
      dPct: Math.min(100, Math.max(0, ((totalDays - daysLeft) / totalDays) * 100)),
      miLvl: lvl(milesLeft, warn), dLvl: lvl(daysLeft, 14)
    };
  }

  function renderDue() {
    const d = computeDue(), box = $("#nextDue"), ban = $("#dueBanner");
    ban.className = "banner hidden";
    if (!S.truck) { box.innerHTML = `<div class="empty" style="grid-column:1/-1">Select your vehicle on the SPECS tab and tap <b>★ MY VEHICLE</b>.</div>`; return; }
    if (d.none) { box.innerHTML = `<div class="empty" style="grid-column:1/-1">No ${esc(d.type)} logged yet. Record your last one below to start reminders.</div>`; return; }

    box.innerHTML = `
      <div class="gauge ${d.miLvl}">
        <div class="k">MILES REMAINING</div>
        <div class="v">${d.milesLeft <= 0 ? "OVERDUE" : fmtMi(d.milesLeft)}</div>
        <div class="s">due @ ${fmtMi(d.dueMiles)} mi</div>
        <div class="bar"><i style="width:${d.miPct}%"></i></div>
      </div>
      <div class="gauge ${d.dLvl}">
        <div class="k">DAYS REMAINING</div>
        <div class="v">${d.daysLeft <= 0 ? "OVERDUE" : d.daysLeft}</div>
        <div class="s">due ${d.dueDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
        <div class="bar"><i style="width:${d.dPct}%"></i></div>
      </div>
      <div class="s" style="grid-column:1/-1;font-size:11px;color:var(--muted);text-align:center">
        ${esc(d.type)} · whichever comes first: ${fmtMi(S.settings.mi)} mi or ${S.settings.mo} months · last @ ${fmtMi(d.last.miles)} mi on ${fmtDate(d.last.date)}
      </div>`;

    const worst = [d.miLvl, d.dLvl].includes("bad") ? "bad" : [d.miLvl, d.dLvl].includes("warn") ? "warn" : null;
    if (worst) {
      ban.className = `banner ${worst}`;
      ban.innerHTML = worst === "bad"
        ? `🛢 ${esc(d.type).toUpperCase()} OVERDUE - service your vehicle now.`
        : `🛢 ${esc(d.type)} due soon - ${d.milesLeft > 0 ? fmtMi(d.milesLeft) + " mi" : ""}${d.milesLeft > 0 && d.daysLeft > 0 ? " / " : ""}${d.daysLeft > 0 ? d.daysLeft + " days" : ""} left.`;
      maybeNotify(d, worst);
    }
  }

  function renderHistory() {
    const h = $("#history");
    if (!S.log.length) { h.innerHTML = `<div class="empty">No services recorded.</div>`; return; }
    const list = [...S.log].sort((a, b) => b.date.localeCompare(a.date) || b.miles - a.miles);
    h.innerHTML = `<ul class="hist">${list.map((l) => `
      <li>
        <div class="ty">${esc(l.type)}</div><div class="mi">${fmtMi(l.miles)} mi</div>
        <div class="dt">${fmtDate(l.date)}${l.cost ? " · $" + Number(l.cost).toFixed(2) : ""}</div>
        <button class="del" data-id="${esc(l.id)}">DELETE</button>
        ${l.notes ? `<div class="nt">${esc(l.notes)}</div>` : ""}
      </li>`).join("")}</ul>`;
    $$("#history .del").forEach((b) => (b.onclick = () => {
      if (!confirm("Delete this service record?")) return;
      S.log = S.log.filter((l) => l.id !== b.dataset.id); save(); renderAll();
    }));
  }

  function bindLog() {
    const t = $("#logType"); SERVICE_TYPES.forEach((s) => t.add(new Option(s, s)));
    $("#logDate").value = todayISO();

    $("#logForm").onsubmit = (ev) => {
      ev.preventDefault();
      const miles = +$("#logMiles").value;
      if (!miles || miles < 0) return toast("Enter a valid mileage");
      S.log.push({
        id: newId(),
        type: t.value, date: $("#logDate").value, miles,
        cost: $("#logCost").value ? +$("#logCost").value : null,
        notes: $("#logNotes").value.trim()
      });
      if (S.odo == null || miles > S.odo) S.odo = miles;
      S.lastNotified = null;
      save(); $("#logForm").reset(); $("#logDate").value = todayISO();
      renderAll(); toast("Service recorded");
    };

    $("#btnOdo").onclick = () => {
      const v = +$("#odoInput").value;
      if (!v) return toast("Enter odometer reading");
      S.odo = v; save(); $("#odoInput").value = ""; renderAll(); toast("Odometer updated");
    };

    $("#btnExport").onclick = () => {
      const blob = new Blob([JSON.stringify({ app: "gmdiy", ...S }, null, 2)], { type: "application/json" });
      download(blob, `gm-vehicle-backup-${todayISO()}.json`);
    };
    $("#fileImport").onchange = async (e) => {
      const f = e.target.files[0]; if (!f) return;
      try {
        const d = JSON.parse(await f.text());
        if (!Array.isArray(d.log)) throw 0;
        if (d.truck && !MODELS.some((m) => m.id === d.truck.model)) {
          if (!confirm("This backup's vehicle isn't a GM model in this app (maybe a Ford DIY Garage backup). Import service history and expenses only?")) return;
          d.truck = null;
        }
        if (!confirm(`Import ${d.log.length} service records and ${(d.expenses || []).length} expenses? This replaces current data.`)) return;
        delete d.app;
        localStorage.setItem(LS, JSON.stringify(d)); S = load(); init(); toast("Data imported");
      } catch { toast("Invalid backup file"); }
      e.target.value = "";
    };

    $("#btnNotify").onclick = async () => {
      if (!("Notification" in window)) return toast("Notifications not supported - use Add to Calendar");
      const p = await Notification.requestPermission();
      toast(p === "granted" ? "Reminders enabled" : "Permission denied");
      if (p === "granted") { S.lastNotified = null; save(); renderDue(); }
    };
    $("#btnIcs").onclick = makeIcs;
  }

  function download(blob, name) {
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  async function maybeNotify(d, lvl) {
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    const key = `${d.last.id}:${lvl}:${todayISO()}`;
    if (S.lastNotified === key) return;
    S.lastNotified = key; save();
    const body = lvl === "bad" ? `${d.type} is overdue (due at ${fmtMi(d.dueMiles)} mi).`
      : `${d.type} due in ${fmtMi(Math.max(0, d.milesLeft))} mi or ${Math.max(0, d.daysLeft)} days.`;
    try {
      const reg = await navigator.serviceWorker?.getRegistration();
      const title = `${modelDisplay(S.truck.model, S.truck.year)} Service Reminder`;
      if (reg) reg.showNotification(title, { body, icon: "icon.svg", tag: "gmdiy-due" });
      else new Notification(title, { body, icon: "icon.svg" });
    } catch { /* ignore */ }
  }

  // Calendar file with alarms - the most reliable "automatic" reminder on iOS/Android
  function makeIcs() {
    const d = computeDue();
    if (!d || d.none) return toast(`Log a ${primaryService()} first`);
    const ymd = (dt) => dt.toISOString().slice(0, 10).replace(/-/g, "");
    const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const nm = S.name ? ` (${S.name})` : "";
    const md = modelDisplay(S.truck.model, S.truck.year);
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//DIY Garage GM//EN", "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:gmdiy-${d.last.id}@diygarage`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${ymd(d.dueDate)}`,
      `DTEND;VALUE=DATE:${ymd(new Date(d.dueDate.getTime() + 864e5))}`,
      `SUMMARY:${md} ${d.type} due${nm}`,
      `DESCRIPTION:${d.type} due by ${fmtMi(d.dueMiles)} mi or this date (whichever first).\\nLast service: ${fmtMi(d.last.miles)} mi on ${d.last.date}.`,
      "BEGIN:VALARM", "TRIGGER:-P7D", "ACTION:DISPLAY", `DESCRIPTION:${md} service due in 1 week`, "END:VALARM",
      "BEGIN:VALARM", "TRIGGER:PT9H", "ACTION:DISPLAY", `DESCRIPTION:${md} service due today`, "END:VALARM",
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    download(new Blob([ics], { type: "text/calendar" }), "gm-service-due.ics");
    toast("Open the file to add to your calendar");
  }

  // ---------------- expenses ----------------
  const EXP_CATS = ["Modification", "Maintenance", "Repair", "Parts", "Tools", "Tires & Wheels",
    "Accessories", "Detailing", "Insurance", "Registration / Fees", "Fuel / Charging", "Other"];
  const CAT_COLORS = ["#b8860b", "#2e3b52", "#c41e1e", "#0a7d38", "#c77700", "#6b3fa0",
    "#00838f", "#ad1457", "#5d4037", "#455a64", "#7cb342", "#8a96ad"];
  const catColor = (c) => CAT_COLORS[EXP_CATS.indexOf(c === "Fuel" ? "Fuel / Charging" : c)] || "#8a96ad";

  // all money spent: manual expenses + costs entered on service log records
  function allExpenses() {
    const svc = S.log.filter((l) => l.cost > 0).map((l) => ({
      id: "svc-" + l.id, date: l.date, amount: +l.cost, category: "Maintenance",
      desc: normType(l.type), vendor: "", miles: l.miles, notes: l.notes || "", fromLog: true
    }));
    return [...S.expenses, ...svc].sort((a, b) => b.date.localeCompare(a.date));
  }

  function expPeriodFilter(list) {
    const p = $("#expPeriod").value, now = new Date();
    if (p === "all") return list;
    if (p === "ytd") return list.filter((x) => x.date.slice(0, 4) === String(now.getFullYear()));
    const cut = new Date(now.getTime() - +p * 864e5).toISOString().slice(0, 10);
    return list.filter((x) => x.date >= cut);
  }

  function renderExpenses() {
    const cat = $("#expFilterCat").value;
    const all = allExpenses();
    let list = expPeriodFilter(all);
    const periodTotal = list.reduce((s, x) => s + x.amount, 0);
    const byCat = {};
    list.forEach((x) => (byCat[x.category] = (byCat[x.category] || 0) + x.amount));
    if (cat !== "all") list = list.filter((x) => x.category === cat);

    // cost per mile (lifetime): needs a span of mileage readings
    const miles = all.map((x) => x.miles).filter((m) => m > 0);
    if (S.odo) miles.push(S.odo);
    const span = miles.length > 1 ? Math.max(...miles) - Math.min(...miles) : 0;
    const lifetime = all.reduce((s, x) => s + x.amount, 0);
    const mods = all.filter((x) => x.category === "Modification").reduce((s, x) => s + x.amount, 0);
    const maint = all.filter((x) => ["Maintenance", "Repair"].includes(x.category)).reduce((s, x) => s + x.amount, 0);

    $("#expKpis").innerHTML = `
      <div class="kpi"><div class="k">PERIOD TOTAL</div><div class="v">${money(periodTotal)}</div></div>
      <div class="kpi"><div class="k">LIFETIME</div><div class="v">${money(lifetime)}</div></div>
      <div class="kpi"><div class="k">MODS (ALL TIME)</div><div class="v">${money(mods)}</div></div>
      <div class="kpi"><div class="k">MAINT + REPAIR</div><div class="v">${money(maint)}</div></div>
      <div class="kpi wide"><div class="k">COST PER MILE (LIFETIME)</div><div class="v">${span > 0 ? "$" + (lifetime / span).toFixed(3) + " / mi" : "—"}</div>
        <div class="kk">${span > 0 ? `over ${fmtMi(span)} logged miles` : "Add mileage to entries to calculate"}</div></div>`;

    const cats = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
    const max = cats.length ? cats[0][1] : 1;
    $("#expBreakdown").innerHTML = cats.length ? `<ul class="bars">${cats.map(([c, v]) => `
      <li><span class="bl">${esc(c)}</span><span class="bt"><i style="width:${(v / max) * 100}%;background:${catColor(c)}"></i></span>
        <span class="bv">${money(v)}</span><span class="bp">${periodTotal ? Math.round((v / periodTotal) * 100) : 0}%</span></li>`).join("")}</ul>`
      : `<div class="empty">No expenses in this period.</div>`;

    $("#expList").innerHTML = list.length ? `<ul class="hist">${list.map((x) => `
      <li>
        <div class="ty">${esc(x.desc || x.category)}</div><div class="mi">${money(x.amount)}</div>
        <div class="dt"><span class="cat" style="background:${catColor(x.category)}">${esc(x.category)}</span>
          ${fmtDate(x.date)}${x.miles ? " · " + fmtMi(x.miles) + " mi" : ""}${x.vendor ? " · " + esc(x.vendor) : ""}</div>
        ${x.fromLog ? `<span class="src">SERVICE LOG</span>` : `<button class="del" data-id="${esc(x.id)}">DELETE</button>`}
        ${x.notes ? `<div class="nt">${esc(x.notes)}</div>` : ""}
      </li>`).join("")}</ul>` : `<div class="empty">No expenses recorded.</div>`;

    $$("#expList .del").forEach((b) => (b.onclick = () => {
      if (!confirm("Delete this expense?")) return;
      S.expenses = S.expenses.filter((x) => x.id !== b.dataset.id); save(); renderExpenses();
    }));
  }

  function bindExpenses() {
    const c = $("#expCat"), f = $("#expFilterCat");
    EXP_CATS.forEach((x) => { c.add(new Option(x, x)); f.add(new Option(x, x)); });
    $("#expDate").value = todayISO();
    $("#expPeriod").onchange = renderExpenses;
    f.onchange = renderExpenses;

    $("#expForm").onsubmit = (ev) => {
      ev.preventDefault();
      const amount = +$("#expAmt").value;
      if (!(amount > 0)) return toast("Enter an amount");
      const miles = +$("#expMiles").value || null;
      S.expenses.push({
        id: newId(), date: $("#expDate").value, amount, category: c.value,
        desc: $("#expDesc").value.trim(), vendor: $("#expVendor").value.trim(),
        miles, notes: $("#expNotes").value.trim()
      });
      if (miles && (S.odo == null || miles > S.odo)) S.odo = miles;
      save(); $("#expForm").reset(); $("#expDate").value = todayISO();
      renderExpenses(); renderTruck(); toast("Expense recorded");
    };

    $("#btnExpCsv").onclick = () => {
      const q = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
      const rows = [["Date", "Category", "Description", "Vendor", "Amount", "Mileage", "Notes", "Source"]]
        .concat(allExpenses().map((x) => [x.date, x.category, x.desc, x.vendor, x.amount.toFixed(2), x.miles || "", x.notes, x.fromLog ? "Service Log" : "Expense"]));
      download(new Blob([rows.map((r) => r.map(q).join(",")).join("\r\n")], { type: "text/csv" }), `gm-vehicle-expenses-${todayISO()}.csv`);
    };
  }

  // ---------------- my vehicle / settings ----------------
  function renderTruck() {
    const m = $("#myTruck");
    if (!S.truck) { m.innerHTML = `<div class="empty">No vehicle saved yet.</div>`; }
    else {
      const e = engById(S.truck.engine), t = trById(S.truck.trans);
      m.innerHTML = `<table class="spec">
        ${row("Vehicle", vehName(S.truck), { big: true })}
        ${row("Engine", e?.name || "-")}
        ${row("Transmission", t?.name || "-")}
        ${row("Driveline", S.truck.drive.toUpperCase())}
        ${row("Odometer", S.odo != null ? fmtMi(S.odo) + " mi" : "---")}
      </table>`;
    }
    $("#setName").value = S.name || "";
    $("#setVin").value = S.vin || "";
    $("#setMi").value = S.settings.mi ?? "";
    $("#setMo").value = S.settings.mo ?? "";
    $("#setWarn").value = S.settings.warn ?? 500;
    $("#odoChip").textContent = S.odo != null ? `${fmtMi(S.odo)} mi` : "--- mi";
  }

  function bindSettings() {
    $("#btnSaveSettings").onclick = () => {
      S.name = $("#setName").value.trim();
      S.vin = $("#setVin").value.trim().toUpperCase();
      const mi = +$("#setMi").value, mo = +$("#setMo").value;
      if (mi > 0) S.settings.mi = mi;
      if (mo > 0) S.settings.mo = mo;
      S.settings.warn = Math.max(0, +$("#setWarn").value || 0);
      S.lastNotified = null; save(); renderAll(); toast("Settings saved");
    };
    $("#btnDefaults").onclick = () => {
      const e = S.truck && engById(S.truck.engine);
      if (!e) return toast("Save a vehicle first");
      $("#setMi").value = e.intervalMi; $("#setMo").value = e.intervalMo;
    };
    $("#btnWipe").onclick = () => {
      if (!confirm("Erase vehicle, settings, ALL service history and ALL expenses from this device?")) return;
      localStorage.removeItem(LS); S = load(); init(); toast("Data erased");
    };
  }

  // ---------------- tabs ----------------
  function bindTabs() {
    $$(".tabbar button").forEach((b) => (b.onclick = () => {
      $$(".tabbar button").forEach((x) => x.classList.toggle("on", x === b));
      $$(".tab").forEach((t) => t.classList.toggle("active", t.id === "tab-" + b.dataset.tab));
      window.scrollTo(0, 0);
    }));
  }

  function renderAll() { renderDue(); renderHistory(); renderTruck(); renderSpecs(); renderExpenses(); }

  function init() {
    $("#rev").textContent = "REV " + DATA_VERSION;
    sel = S.truck ? { ...S.truck } : { make: "Chevrolet", model: "chev_lt", year: new Date().getFullYear(), engine: null, trans: null, drive: "4x4" };
    if (!sel.make) sel.make = modelById(sel.model)?.make || "Chevrolet";
    if (!MAKES.includes(sel.make)) sel.make = "Chevrolet";
    setMake(sel.make);
    fillModels(); fillYears(); fillEngines(); fillTrans(); fillDrives();
    renderAll();
  }

  let bound = false;
  function boot() {
    if (!bound) { bindSelector(); bindLog(); bindExpenses(); bindSettings(); bindTabs(); bound = true; }
    init();
    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
    // Re-check reminders whenever the app returns to the foreground
    document.addEventListener("visibilitychange", () => { if (!document.hidden) renderDue(); });
  }
  boot();
  // deep-link: ?tab=log
  const qt = new URLSearchParams(location.search).get("tab");
  if (qt) document.querySelector(`.tabbar button[data-tab="${qt}"]`)?.click();

  // test hook (used by the validation page only)
  window.__gmdiy = { yearsFor, enginesFor, transFor, drivesFor, genFor, renderSpecs, sel: () => sel, setSel: (o) => { Object.assign(sel, o); } };
})();
