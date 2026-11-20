/* =====================================================================
   FINALIZE - runs after every data-*.js file.
   - de-duplicates `verify` arrays and normalises `notes`
   - era-correct display names (C/K -> Silverado, Blazer -> Tahoe, ...)
   ===================================================================== */

GENERATIONS.forEach((g) => { g.verify = [...new Set(g.verify || [])]; g.notes = g.notes || []; });
ENGINES.forEach((e) => { e.verify = [...new Set(e.verify || [])]; e.notes = [...new Set(e.notes || [])]; });

/* [fromYear, toYear, display name] - first match wins */
const MODEL_NAMES = {
  chev_lt:    [[1990, 1998, "C/K 1500"], [1999, 2099, "Silverado 1500"]],
  gmc_lt:     [[1990, 1998, "Sierra C/K 1500"], [1999, 2099, "Sierra 1500"]],
  chev_hd:    [[1990, 2000, "C/K 2500 / 3500"], [2001, 2099, "Silverado 2500HD / 3500HD"]],
  gmc_hd:     [[1990, 2000, "Sierra C/K 2500 / 3500"], [2001, 2099, "Sierra 2500HD / 3500HD"]],
  chev_tahoe: [[1990, 1994, "Blazer (full-size K5)"], [1995, 2099, "Tahoe"]],
  gmc_yukon:  [[1990, 1991, "Jimmy (full-size)"], [1992, 2099, "Yukon"]],
  chev_sub:   [[1990, 2099, "Suburban"]],
  gmc_xl:     [[1990, 1999, "Suburban (GMC)"], [2000, 2099, "Yukon XL"]],
  gmc_sonoma: [[1990, 1990, "S-15 Pickup"], [1991, 1991, "S-15 Sonoma"], [1992, 2099, "Sonoma"]],
  cad_esc:    [[1990, 2002, "Escalade"], [2003, 2099, "Escalade / ESV"]]
};
function modelDisplay(id, year) {
  const m = MODELS.find((x) => x.id === id);
  const n = (MODEL_NAMES[id] || []).find((r) => year >= r[0] && year <= r[1]);
  return n ? n[2] : m ? m.name : id;
}
