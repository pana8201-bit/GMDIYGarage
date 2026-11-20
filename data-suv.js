/* =====================================================================
   FULL-SIZE SUVs & UTES
   Chevrolet Blazer (K5, full-size) / Tahoe · GMC Jimmy (full-size) / Yukon
   Chevrolet Suburban · GMC Suburban / Yukon XL · Cadillac Escalade / ESV
   Chevrolet Avalanche · Cadillac Escalade EXT
   Independent reference data - NOT official GM data. See data-core.js.
   ===================================================================== */

/* Clone a 1500 generation record and override fields (chassis is shared). */
function likeGen(srcId, over) {
  const src = GENERATIONS.find((g) => g.id === srcId);
  return Object.assign(JSON.parse(JSON.stringify(src)), { notes: [] }, over,
    { verify: [...(src.verify || []), ...((over && over.verify) || [])] });
}

GENERATIONS.push(
  // ---- 1990-91 square body (R/V) Blazer / Jimmy / Suburban ----
  {
    id: "suv_rv", models: [...G.FS], code: "R/V 'Square Body'", platform: "Blazer (K5) / Jimmy / Suburban R/V", years: [1990, 1991],
    lugTorque: "1/2-ton: 100 lb-ft · 3/4-ton (Suburban 2500): 140 lb-ft", lugPattern: "1/2-ton: 6 x 5.5 in · 3/4-ton: 8 x 6.5 in", lugThread: "7/16-20 (1/2-ton) / 9/16-18 (3/4-ton)",
    washer: "≈ 2.5 qt (2.4 L)",
    coolant: GREEN, coolantMi: 30000, coolantMo: 24, coolantNote: "Green: every 2 yr / 30,000 mi",
    rearAxle: "GM 10-bolt 8.5\" (1/2-ton) or 14-bolt (3/4-ton) - SAE 80W-90 GL-5",
    rearAxleCap: "10-bolt: ≈ 4.2 pt · 14-bolt: ≈ 5.5-6.5 pt",
    frontDiff: "GM 10-bolt 8.5\" solid axle (1/2-ton) / Dana 60 (3/4-ton) - SAE 80W-90 GL-5", frontDiffCap: "≈ 2.6-6.0 pt by axle",
    transferCase: "NP208 / NP241 - DEXRON ATF (DEXRON VI) - ≈ 4.5-5 pt",
    fuelTank: "Blazer ≈ 30-31 gal · Suburban ≈ 40 gal",
    airFilter: AC_VIN, cabinFilter: "Not equipped",
    fuelFilter: "Inline frame-rail filter - " + AC_VIN, fuelFilterMi: 30000,
    brakeFluid: DOT3, brakeMo: 36, diffMi: 50000, tcaseMi: 50000,
    notes: ["Solid front axle on 4x4. Grease the front axle U-joints and steering linkage at each oil change."],
    verify: ["lugTorque", "lugThread", "washer", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank", "fuelFilter"]
  },
  // ---- GMT400 SUVs ----
  likeGen("lt_gmt400", { id: "suv_gmt400", models: [...G.FS], code: "GMT400 'OBS' SUV", platform: "Blazer -> Tahoe (1995) / Yukon / Suburban",
    years: [1992, 1999],
    fuelTank: "Tahoe / Yukon 2-door ≈ 30 gal · 4-door ≈ 30 gal · Suburban ≈ 42 gal",
    lugPattern: "1500: 6 x 5.5 in · Suburban 2500: 8 x 6.5 in",
    notes: ["Full-size Blazer was renamed Tahoe for 1995. GMC Jimmy (full-size) became Yukon for 1992.",
      "2000 Tahoe Limited / Z71 are carry-over GMT400 trucks - select 1999 for their specs."] }),
  // ---- GMT800 SUVs ----
  likeGen("lt_gmt800", { id: "suv_gmt800", models: [...G.FS], code: "GMT800 SUV", platform: "Tahoe / Yukon / Suburban / Yukon XL", years: [2000, 2006],
    fuelTank: "Tahoe / Yukon ≈ 26 gal · Suburban / Yukon XL ≈ 33 gal (1500) / 38 gal (2500)",
    lugPattern: "1500: 6 x 139.7 mm · 2500: 8 x 165.1 mm",
    cabinFilter: "Not equipped",
    notes: ["Autoride / rear air leveling on Denali and some LT/SLT - check level-control air lines when inspecting the rear."] }),
  // ---- GMT900 SUVs ----
  likeGen("lt_gmt900", { id: "suv_gmt900", models: [...G.FS], code: "GMT900 SUV", platform: "Tahoe / Yukon / Suburban / Yukon XL", years: [2007, 2014],
    fuelTank: "Tahoe / Yukon ≈ 26 gal · Suburban / Yukon XL ≈ 31.5 gal (1500) / 39 gal (2500)",
    lugPattern: "1500: 6 x 139.7 mm · 2500: 8 x 165.1 mm",
    cabinFilter: "Equipped on some trims - " + AC_VIN,
    notes: ["Tahoe / Yukon Hybrid (2008-13, 6.0L + 2-mode) is not listed. Its HV system and 2ML70 transmission are dealer items."] }),
  // ---- K2XX SUVs ----
  likeGen("lt_k2xx", { id: "suv_k2xx", models: [...G.FS], code: "K2XX SUV", platform: "Tahoe / Yukon / Suburban / Yukon XL", years: [2015, 2020],
    fuelTank: "Tahoe / Yukon ≈ 26 gal · Suburban / Yukon XL ≈ 31 gal",
    notes: ["Magnetic Ride Control on Denali / Premier / RST - shocks are not DIY-rebuildable."] }),
  // ---- T1 SUVs (IRS) ----
  likeGen("lt_t1", { id: "suv_t1", models: [...G.FS], code: "T1 SUV (GMT T1XX)", platform: "Tahoe / Yukon / Suburban / Yukon XL - IRS", years: [2021, 2099],
    rearAxle: "Independent rear (IRS) differential - SAE 75W-85 synthetic per Owner's Manual / diff tag",
    rearAxleCap: "≈ 1.6-2.0 qt (1.5-1.9 L)",
    fuelTank: "Tahoe / Yukon ≈ 24 gal (28 gal diesel) · Suburban / Yukon XL ≈ 28 gal",
    notes: ["Independent rear suspension from 2021. Air Ride Adaptive Suspension on some trims - lift with the air suspension in service / jack mode."],
    verify: ["rearAxle", "rearAxleCap"] })
);

/* ---- Escalade (shares SUV chassis; RWD or AWD/4WD) ---- */
GENERATIONS.push(
  likeGen("suv_gmt400", { id: "esc_gmt400", models: G.ESC, code: "Escalade Gen 1 (GMT400)", platform: "Escalade (Yukon Denali-based)", years: [1999, 2000],
    drives: ["AWD/4WD"], fuelTank: "≈ 30 gal (114 L)",
    notes: ["1999-2000 Escalade: 4WD (Autotrac) only. No 2001 model year."] }),
  likeGen("suv_gmt800", { id: "esc_gmt800", models: G.ESC, code: "Escalade Gen 2 (GMT800)", platform: "Escalade / ESV (2003+)", years: [2002, 2006],
    fuelTank: "Escalade ≈ 26 gal · ESV ≈ 31 gal",
    transferCase: "AWD (BorgWarner 4476 viscous) - AUTO-TRAK II fluid - ≈ 1.5 qt",
    notes: ["Rear air / Road Sensing Suspension - check rear level-control lines and compressor operation."] }),
  likeGen("suv_gmt900", { id: "esc_gmt900", models: G.ESC, code: "Escalade Gen 3 (GMT900)", platform: "Escalade / ESV", years: [2007, 2014],
    fuelTank: "Escalade ≈ 26 gal · ESV ≈ 31 gal",
    cabinFilter: "Equipped - " + AC_VIN,
    notes: ["Magnetic Ride Control standard. Escalade Hybrid (2009-13) not listed - HV items are dealer service."] }),
  likeGen("suv_k2xx", { id: "esc_k2xx", models: G.ESC, code: "Escalade Gen 4 (K2XX)", platform: "Escalade / ESV", years: [2015, 2020],
    fuelTank: "Escalade ≈ 26 gal · ESV ≈ 31 gal", notes: ["Magnetic Ride Control standard."] }),
  likeGen("suv_t1", { id: "esc_t1", models: G.ESC, code: "Escalade Gen 5 (T1)", platform: "Escalade / ESV / Escalade-V", years: [2021, 2099],
    fuelTank: "Escalade ≈ 24 gal · ESV ≈ 28 gal",
    notes: ["Air Ride Adaptive Suspension + Magnetic Ride Control 4.0 - use service/jack mode before lifting."] })
);

/* ---- Avalanche / Escalade EXT (sport-utility trucks) ---- */
GENERATIONS.push(
  likeGen("lt_gmt800", { id: "ute_gmt800", models: G.UTE, code: "GMT800 Avalanche / EXT", platform: "Avalanche 1500/2500 · Escalade EXT", years: [2002, 2006],
    fuelTank: "≈ 31 gal (117 L) (Avalanche 2500 ≈ 38 gal)",
    lugPattern: "1500 / EXT: 6 x 139.7 mm · Avalanche 2500: 8 x 165.1 mm",
    notes: ["Escalade EXT: AWD only.", "Avalanche 'Midgate' - keep the seals clean and lubricated; check cargo-bed drains."] }),
  likeGen("lt_gmt900", { id: "ute_gmt900", models: G.UTE, code: "GMT900 Avalanche / EXT", platform: "Avalanche · Escalade EXT", years: [2007, 2013],
    fuelTank: "≈ 31.5 gal (119 L)",
    notes: ["Escalade EXT: AWD only.", "Midgate / cargo cover seals: check drains for water in the cab."] })
);

/* ---------------------------------------------------------------------
   ENGINES
   --------------------------------------------------------------------- */
const ESC_AWD_NOTE = "Escalade AWD: transfer case uses AUTO-TRAK II fluid - do not substitute ATF.";

ENGINES.push(
  // ---- R/V 1990-91 ----
  { ...T.sbc50tbi, id: "rv_57", models: [...G.FS], name: "5.7L V8 TBI (350 / L05)", years: [1990, 1991], trans: ["sm465", "th700", "th400"],
    notes: ["TH400 on Suburban 2500 / heavy-duty builds; TH700-R4 on 1/2-ton."] },
  { ...T.bb74tbi, id: "rv_74", models: [...G.SUB], name: "7.4L V8 TBI (454 / L19) - Suburban 2500", years: [1990, 1991], trans: ["th400"] },
  { ...DSL, id: "rv_62d", models: [...G.FS], name: "6.2L V8 Diesel (LH6 / LL4)", family: "Detroit Diesel 6.2L IDI", years: [1990, 1991],
    oilCap: "≈ 7.0 qt (6.6 L)", oilVisc: OIL_DSL, oilSpec: "API CD/CE (CK-4 today)", filter: "ACDelco PF1218 (verify by VIN)", drainTorque: "≈ 20 lb-ft (27 N·m)",
    trans: ["sm465", "th400", "th700"], intervalMi: 3000, intervalMo: 3, fuel: ULSD,
    fuelFilter: "Engine-mounted fuel filter / water separator - " + AC_VIN, fuelFilterMi: 15000,
    notes: [HD_DSL_NOTE], verify: ["oilCap", "filter", "drainTorque", "fuelFilterMi"] },

  // ---- GMT400 SUVs ----
  { ...T.sbc50tbi, id: "suv_57tbi", models: [...G.FS], name: "5.7L V8 TBI (350 / L05)", years: [1992, 1995], trans: ["nv4500", "th700", "4l60e", "4l80e"],
    transYears: { nv4500: [1992, 1995], th700: [1992, 1992], "4l60e": [1993, 1995], "4l80e": [1992, 1995] },
    notes: ["4L80-E on Suburban 2500 / heavy-duty builds; TH700-R4 (1992) / 4L60-E (1993+) on 1/2-ton."] },
  { ...T.sbcVortec, id: "suv_57v", models: [...G.FS], name: "5.7L V8 Vortec 5700 (L31)", years: [1996, 1999], trans: ["4l60e", "4l80e"],
    notes: ["4L80-E on Suburban 2500 only.", "Vortec intake manifold gasket coolant leaks are common."] },
  { ...T.bb74tbi, id: "suv_74tbi", models: [...G.SUB], name: "7.4L V8 TBI (454 / L19) - Suburban 2500", years: [1992, 1995], trans: ["4l80e"] },
  { ...T.bb74v, id: "suv_74v", models: [...G.SUB], name: "7.4L V8 Vortec 7400 (L29) - Suburban 2500", years: [1996, 1999], trans: ["4l80e"] },
  { ...DSL, id: "suv_65td", models: [...G.FS], name: "6.5L V8 Turbo-Diesel (L56 / L65)", family: "Detroit Diesel 6.5L IDI", years: [1994, 1999],
    oilCap: "≈ 8.0 qt (7.6 L)", oilVisc: OIL_DSL, oilSpec: "API CF-4 / CG-4 (CK-4 today)", filter: "ACDelco PF1218 (verify by VIN)", drainTorque: "≈ 20 lb-ft (27 N·m)",
    trans: ["4l80e"], intervalMi: 3000, intervalMo: 3, fuel: ULSD,
    fuelFilter: "Engine-mounted fuel filter / water separator - " + AC_VIN, fuelFilterMi: 15000,
    notes: ["PMD (FSD) failures cause stalling - relocating the module is the common fix.", HD_DSL_NOTE],
    verify: ["oilCap", "filter", "drainTorque", "fuelFilterMi"] },

  // ---- GMT800 SUVs ----
  { ...T.ls3, id: "suv_48_3", models: [...G.TAHOE], name: "4.8L V8 Vortec 4800 (LR4)", years: [2000, 2006], trans: ["4l60e"] },
  { ...T.ls3, id: "suv_53_3", models: [...G.FS], name: "5.3L V8 Vortec 5300 (LM7 / L59 / LM4)", years: [2000, 2006], trans: ["4l60e"], fuel: R87FFV },
  { ...T.ls3, id: "suv_60_3", models: [...G.FS], name: "6.0L V8 (LQ4 Suburban 2500 / LQ9 Denali)", years: [2001, 2006], trans: ["4l60e", "4l80e"],
    fuel: "LQ4: " + R87 + " · LQ9 Denali: premium 91+ recommended",
    notes: ["LQ9 + 4L60-E/4L65-E = Yukon / Yukon XL Denali (AWD). LQ4 + 4L80-E = Suburban / Yukon XL 2500."] },
  { ...T.bb74v, id: "suv_81", models: [...G.SUB], name: "8.1L V8 Vortec 8100 (L18) - 2500", family: "Big-Block Vortec 8100 (Gen VII)", years: [2001, 2006],
    oilCap: "≈ 6.5 qt (6.2 L)", oilVisc: "SAE 15W-40 (GM spec) / 5W-30 cold", oilSpec: "API SL/CI-4", filter: "ACDelco PF454 (verify by VIN)",
    trans: ["4l80e"], intervalMi: 5000, intervalMo: 6, plug: "ACDelco 41-993 platinum (verify by VIN)", gap: "0.060 in (1.52 mm)",
    notes: ["Rear plugs are hard to reach - use extensions and a swivel."], verify: ["oilCap", "oilVisc", "filter", "drainTorque", "plug"] },

  // ---- GMT900 SUVs ----
  { ...T.ls4, id: "suv_48_4", models: [...G.TAHOE], name: "4.8L V8 Vortec 4800 (LY2 / L20) - 2WD", years: [2007, 2013], trans: ["4l60e", "6l80"],
    transYears: { "4l60e": [2007, 2009], "6l80": [2010, 2013] }, fuel: R87 },
  { ...T.ls4, id: "suv_53_4", models: [...G.FS], name: "5.3L V8 Vortec 5300 (LMG / LY5 / LC9 / LH6, AFM)", years: [2007, 2014], trans: ["4l60e", "6l80"],
    transYears: { "4l60e": [2007, 2009], "6l80": [2009, 2014] } },
  { ...T.ls4, id: "suv_62_4", models: [...G.FS], name: "6.2L V8 Vortec 6200 (L92 / L94) - Denali / LTZ", years: [2007, 2014], trans: ["6l80"], fuel: P91 },
  { ...T.ls4, id: "suv_60_4", models: [...G.SUB], name: "6.0L V8 Vortec 6000 (LY6 / L96) - 2500", years: [2007, 2013], trans: ["4l80e", "6l90"],
    transYears: { "4l80e": [2007, 2008], "6l90": [2009, 2013] }, fuel: R87FFV, notes: ["No AFM on the 2500 6.0L.", OLS + "."] },

  // ---- K2XX SUVs ----
  { ...T.et3, id: "suv_53et", models: [...G.FS], name: "5.3L V8 EcoTec3 (L83)", years: [2015, 2020], trans: ["6l80", "8l90"],
    transYears: { "6l80": [2015, 2020], "8l90": [2019, 2020] } },
  { ...T.et3, id: "suv_62et", models: [...G.FS], name: "6.2L V8 EcoTec3 (L86) - Denali / Premier / RST", years: [2015, 2020], trans: ["6l80", "8l90", "10l80"],
    transYears: { "6l80": [2015, 2015], "8l90": [2016, 2017], "10l80": [2018, 2020] }, fuel: P91 },

  // ---- T1 SUVs ----
  { ...T.et3, id: "suv_53t1", models: [...G.FS], name: "5.3L V8 EcoTec3 (L84 DFM)", years: [2021, 2099], trans: ["10l80"] },
  { ...T.et3, id: "suv_62t1", models: [...G.FS], name: "6.2L V8 EcoTec3 (L87 DFM)", years: [2021, 2099], trans: ["10l80"], fuel: P91 },
  { ...ENGINES.find((e) => e.id === "lt_30d"), id: "suv_30d", models: [...G.FS], years: [2021, 2099] },

  // ---- Escalade ----
  { ...T.sbcVortec, id: "esc_57", models: G.ESC, name: "5.7L V8 Vortec 5700 (L31)", years: [1999, 2000], trans: ["4l60e"] },
  { ...T.ls3, id: "esc_53", models: G.ESC, name: "5.3L V8 Vortec 5300 (LM7) - RWD", years: [2002, 2003], trans: ["4l60e"] },
  { ...T.ls3, id: "esc_60", models: G.ESC, name: "6.0L V8 Vortec 6000 HO (LQ9)", years: [2002, 2006], trans: ["4l60e"],
    fuel: "Premium unleaded 91+ AKI recommended", notes: [ESC_AWD_NOTE, OLS + "."] },
  { ...T.ls4, id: "esc_62_4", models: G.ESC, name: "6.2L V8 Vortec 6200 (L92 / L94)", years: [2007, 2014], trans: ["6l80"], fuel: P91,
    notes: [ESC_AWD_NOTE, OLS + "."] },
  { ...T.et3, id: "esc_62et", models: G.ESC, name: "6.2L V8 EcoTec3 (L86)", years: [2015, 2020], trans: ["6l80", "8l90", "10l80"],
    transYears: { "6l80": [2015, 2015], "8l90": [2016, 2017], "10l80": [2018, 2020] }, fuel: P91 },
  { ...T.et3, id: "esc_62t1", models: G.ESC, name: "6.2L V8 (L87 DFM)", years: [2021, 2099], trans: ["10l80"], fuel: P91 },
  { ...ENGINES.find((e) => e.id === "lt_30d"), id: "esc_30d", models: G.ESC, years: [2021, 2099] },
  { ...T.et3, id: "esc_lt4", models: G.ESC, name: "6.2L V8 Supercharged (LT4) - Escalade-V", family: "Gen V Small-Block Supercharged", years: [2023, 2099],
    drives: ["AWD/4WD"], trans: ["10l80"], oilCap: "≈ 9.8 qt (9.3 L) - confirm", oilVisc: "SAE 0W-40 (dexos R) - confirm on oil cap", oilSpec: "dexos R",
    fuel: "Premium unleaded 91+ AKI required", intervalMi: 5000, intervalMo: 6,
    notes: ["Supercharger intercooler has its own low-temperature coolant loop - separate DEX-COOL reservoir.", "AWD only."],
    verify: ["oilCap", "oilVisc", "oilSpec", "filter", "plug", "gap"] },

  // ---- Avalanche / Escalade EXT ----
  { ...T.ls3, id: "ute_53_3", models: [...G.AVA], name: "5.3L V8 Vortec 5300 (LM7 / L59) - Avalanche 1500", years: [2002, 2006], trans: ["4l60e"], fuel: R87FFV },
  { ...T.bb74v, id: "ute_81", models: [...G.AVA], name: "8.1L V8 Vortec 8100 (L18) - Avalanche 2500", family: "Big-Block Vortec 8100 (Gen VII)", years: [2002, 2006],
    oilCap: "≈ 6.5 qt (6.2 L)", oilVisc: "SAE 15W-40 (GM spec) / 5W-30 cold", oilSpec: "API SL/CI-4", filter: "ACDelco PF454 (verify by VIN)",
    trans: ["4l80e"], intervalMi: 5000, intervalMo: 6, plug: "ACDelco 41-993 platinum (verify by VIN)", gap: "0.060 in (1.52 mm)",
    verify: ["oilCap", "oilVisc", "filter", "drainTorque", "plug"] },
  { ...T.ls3, id: "ute_60_ext", models: G.EXT, name: "6.0L V8 Vortec 6000 HO (LQ9)", years: [2002, 2006], trans: ["4l60e"],
    fuel: "Premium unleaded 91+ AKI recommended", notes: [ESC_AWD_NOTE, OLS + "."] },
  { ...T.ls4, id: "ute_53_4", models: [...G.AVA], name: "5.3L V8 Vortec 5300 (LMG / LC9, AFM)", years: [2007, 2013], trans: ["4l60e", "6l80"],
    transYears: { "4l60e": [2007, 2009], "6l80": [2009, 2013] } },
  { ...T.ls4, id: "ute_60_4", models: [...G.AVA], name: "6.0L V8 Vortec 6000 (LY6) - Avalanche LTZ", years: [2007, 2008], trans: ["4l60e"],
    notes: ["Rare 6.0L Avalanche option 2007-08."] },
  { ...T.ls4, id: "ute_62_ext", models: G.EXT, name: "6.2L V8 Vortec 6200 (L92 / L94)", years: [2007, 2013], trans: ["6l80"], fuel: P91,
    notes: [ESC_AWD_NOTE, OLS + "."] }
);
