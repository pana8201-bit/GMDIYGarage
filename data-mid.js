/* =====================================================================
   MIDSIZE / COMPACT PICKUPS
   Chevrolet S-10 · GMC Sonoma (S-15 Sonoma 1991) · Chevrolet Colorado · GMC Canyon
   Note: the 1996-2000 Isuzu Hombre was a rebadged S-10 (not a GM make here).
   US Colorado/Canyon skipped MY 2013-2014 (gap is intentional).
   Independent reference data - NOT official GM data. See data-core.js.
   ===================================================================== */

GENERATIONS.push(
  {
    id: "s10_g1", models: G.S10, code: "S-10 / S-15 Gen 1", platform: "GMT325 (first gen)", years: [1990, 1993],
    lugTorque: "≈ 80 lb-ft (108 N·m)", lugPattern: "5 x 4.75 in (5 x 120.7 mm) · 4x4 6 x 5.5 in on some", lugThread: "7/16-20",
    washer: "≈ 2.5 qt (2.4 L)",
    coolant: GREEN, coolantMi: 30000, coolantMo: 24, coolantNote: "Green: every 2 yr / 30,000 mi",
    rearAxle: "GM 7.625\" or 8.5\" 10-bolt - SAE 80W-90 GL-5 (G80 locker: no friction modifier needed)",
    rearAxleCap: "7.625\": ≈ 3.5 pt · 8.5\": ≈ 4.2 pt",
    frontDiff: "GM 7.25\" IFS - SAE 80W-90 GL-5", frontDiffCap: "≈ 2.6 pt (1.2 L)",
    transferCase: "NP231 / NP233 - DEXRON ATF (DEXRON VI) - ≈ 2.5 pt",
    fuelTank: "≈ 13-20 gal by cab / wheelbase",
    airFilter: AC_VIN, cabinFilter: "Not equipped",
    fuelFilter: "Inline frame-rail filter - " + AC_VIN, fuelFilterMi: 30000,
    brakeFluid: DOT3, brakeMo: 36, diffMi: 50000, tcaseMi: 50000,
    notes: ["GMC model was badged 'S-15 Sonoma' for 1991 and 'Sonoma' from 1992. Syclone (1991) is a turbo 4.3L AWD special - not listed."],
    verify: ["lugTorque", "lugPattern", "washer", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank", "fuelFilter"]
  },
  {
    id: "s10_g2", models: G.S10, code: "S-10 / Sonoma Gen 2", platform: "GMT325 (second gen)", years: [1994, 2004],
    lugTorque: "≈ 95 lb-ft (129 N·m)", lugPattern: "5 x 4.75 in (5 x 120.7 mm) · ZR2 / 4x4: 6 x 5.5 in on some", lugThread: "M12 x 1.5",
    washer: "≈ 2.5 qt (2.4 L)",
    coolant: "1994-95: " + GREEN + " · 1996+: " + DEXCOOL,
    coolantMi: 30000, coolantMo: 24, coolantNote: "Green: every 2 yr / 30,000 mi · DEX-COOL (1996+): every 5 yr / 150,000 mi",
    rearAxle: "GM 7.625\" or 8.5\" 10-bolt - SAE 80W-90 GL-5",
    rearAxleCap: "7.625\": ≈ 3.5 pt · 8.5\": ≈ 4.2 pt",
    frontDiff: "GM 7.25\" IFS - SAE 80W-90 GL-5", frontDiffCap: "≈ 2.6 pt (1.2 L)",
    transferCase: "NV233 (push-button) - DEXRON VI - ≈ 2.5 pt",
    fuelTank: "Regular cab ≈ 19 gal · Extended / Crew ≈ 18-20 gal",
    airFilter: AC_VIN, cabinFilter: "Not equipped",
    fuelFilter: "Inline frame-rail filter - " + AC_VIN, fuelFilterMi: 30000,
    brakeFluid: DOT3, brakeMo: 36, diffMi: 50000, tcaseMi: 50000,
    notes: ["ZR2 / Highrider: wider track, 8.5\" rear axle, larger front axle components - same fluids.", "Isuzu Hombre (1996-2000) is mechanically an S-10 - use these specs."],
    verify: ["lugTorque", "lugThread", "washer", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank", "fuelFilter"]
  },
  {
    id: "colo_g1", models: G.COLO, code: "Colorado / Canyon Gen 1", platform: "GMT355", years: [2004, 2012],
    lugTorque: "≈ 100 lb-ft (140 N·m)", lugPattern: "6 x 5.0 in (6 x 127 mm)", lugThread: "M12 x 1.5",
    washer: "≈ 3.0 qt (2.8 L)",
    coolant: DEXCOOL, coolantMi: 150000, coolantMo: 60, coolantNote: DEXCOOL_NOTE,
    rearAxle: "GM 8.6\" (some 7.6\") - SAE 75W-90 synthetic (GM spec)", rearAxleCap: "≈ 2.0 qt (1.9 L)",
    frontDiff: "GM 7.25\" / 8.25\" IFS - SAE 75W-90 synthetic", frontDiffCap: "≈ 1.2 qt (1.1 L)",
    transferCase: "Borg-Warner 4472 / 4473 - DEXRON VI or AUTO-TRAK II per tag - ≈ 1.25 qt",
    fuelTank: "≈ 19.6 gal (74 L)",
    airFilter: AC_VIN, cabinFilter: "Not equipped",
    fuelFilter: "In-tank, part of the fuel pump module - not a maintenance item", fuelFilterMi: null,
    brakeFluid: DOT3, brakeMo: 36, diffMi: 100000, tcaseMi: 50000,
    notes: ["Inline-5 and I4 Atlas engines have a single overhead-cam timing chain; check engine light for cam/crank codes suggests chain wear.", OLS + "."],
    verify: ["lugTorque", "washer", "rearAxleCap", "frontDiffCap", "transferCase"]
  },
  {
    id: "colo_g2", models: G.COLO, code: "Colorado / Canyon Gen 2", platform: "GMT31XX", years: [2015, 2022],
    lugTorque: "≈ 103 lb-ft (140 N·m)", lugPattern: "6 x 120 mm", lugThread: "M14 x 1.5",
    washer: "≈ 3.5 qt (3.3 L)",
    coolant: DEXCOOL, coolantMi: 150000, coolantMo: 60, coolantNote: DEXCOOL_NOTE,
    rearAxle: "GM 8.6\" (ZR2: AAM 9.5\" e-locker) - SAE 75W-90 synthetic (GM spec)", rearAxleCap: "≈ 1.7-2.2 qt (1.6-2.1 L)",
    frontDiff: "GM 7.6\" IFS (ZR2: 8.25\" e-locker) - SAE 75W-90 synthetic", frontDiffCap: "≈ 1.2-1.7 qt",
    transferCase: "Borg-Warner (2-speed Autotrac on some) - AUTO-TRAK II or DEXRON VI per tag - ≈ 1.1-1.5 qt",
    fuelTank: "≈ 21 gal (79.5 L)",
    airFilter: AC_VIN, cabinFilter: "Equipped (behind glovebox) - " + AC_VIN,
    fuelFilter: "Gas: in-tank (lifetime) · Diesel: see engine", fuelFilterMi: null,
    brakeFluid: DOT3, brakeMo: 60, diffMi: 100000, tcaseMi: 50000,
    notes: ["ZR2 / AT4 / Bison: Multimatic DSSV dampers and front/rear e-lockers - same fluid types, check axle tag for capacity."],
    verify: ["lugTorque", "washer", "rearAxleCap", "frontDiffCap", "transferCase", "brakeMo"]
  },
  {
    id: "colo_g3", models: G.COLO, code: "Colorado / Canyon Gen 3", platform: "GMT31XX-2", years: [2023, 2099],
    lugTorque: "≈ 103 lb-ft (140 N·m)", lugPattern: "6 x 120 mm", lugThread: "M14 x 1.5",
    washer: "≈ 3.5 qt (3.3 L)",
    coolant: DEXCOOL, coolantMi: 150000, coolantMo: 60, coolantNote: DEXCOOL_NOTE,
    rearAxle: "GM 9.5\" / 9.76\" (ZR2 / AT4X: e-locker) - SAE 75W-90 synthetic (GM spec)", rearAxleCap: "≈ 2.0-2.5 qt",
    frontDiff: "GM 8.25\" IFS (ZR2 / AT4X: e-locker) - SAE 75W-90 synthetic", frontDiffCap: "≈ 1.5-1.8 qt",
    transferCase: "2-speed Autotrac - AUTO-TRAK II or DEXRON VI per tag - ≈ 1.1-1.5 qt",
    fuelTank: "≈ 21 gal (79.5 L)",
    airFilter: AC_VIN, cabinFilter: "Equipped (behind glovebox) - " + AC_VIN,
    fuelFilter: "In-tank, part of the fuel pump module - not a maintenance item", fuelFilterMi: null,
    brakeFluid: DOT3, brakeMo: 60, diffMi: 100000, tcaseMi: 50000,
    notes: ["All Gen 3 trucks use the 2.7L turbo I4 (three outputs) with the 8-speed automatic."],
    verify: ["lugTorque", "washer", "rearAxleCap", "frontDiffCap", "transferCase", "brakeMo"]
  }
);

const S10_TRANS_OLD = ["s10man", "th700", "4l60e"];

ENGINES.push(
  // ---- S-10 / Sonoma Gen 1 ----
  { id: "s10_25", models: G.S10, name: "2.5L I4 TBI (LN8 'Iron Duke')", family: "Pontiac 2.5L I4", years: [1990, 1993],
    oilCap: "≈ 3.0 qt (2.8 L)", oilVisc: OIL_OLD, oilSpec: OIL_OLDSPEC, filter: "ACDelco PF47 (verify by VIN)", drainTorque: "≈ 18 lb-ft (25 N·m)",
    trans: S10_TRANS_OLD, transYears: { th700: [1990, 1992], "4l60e": [1993, 1993] }, intervalMi: 3000, intervalMo: 3,
    fuel: R87, plug: AC_VIN + " (copper)", gap: "0.060 in (1.52 mm)", plugMi: 30000,
    verify: ["oilCap", "filter", "drainTorque", "plug", "gap"] },
  { ...T.sbc43tbi, id: "s10_43tbi", models: G.S10, name: "4.3L V6 TBI (LB4) / CPI (LU2, 1992-93)", years: [1990, 1993], trans: S10_TRANS_OLD,
    transYears: { th700: [1990, 1992], "4l60e": [1993, 1993] } },

  // ---- S-10 / Sonoma Gen 2 ----
  { id: "s10_22", models: G.S10, name: "2.2L I4 (LN2 / L43 / LO3 FlexFuel)", family: "GM 2200 OHV I4", years: [1994, 2003],
    oilCap: "≈ 4.0 qt (3.8 L)", oilVisc: "SAE 5W-30", oilSpec: "API SJ · " + OIL_GM6094, filter: "ACDelco PF47 (verify by VIN)", drainTorque: "≈ 18 lb-ft (25 N·m)",
    trans: ["s10man", "4l60e"], intervalMi: 5000, intervalMo: 6, fuel: R87,
    plug: AC_VIN + " (platinum)", gap: "0.060 in (1.52 mm)", plugMi: 100000, notes: ["4x2 only."], drives: ["4x2"],
    verify: ["oilCap", "filter", "drainTorque", "plug"] },
  { ...T.sbc43tbi, id: "s10_43a", models: G.S10, name: "4.3L V6 CPI (L35 / LF6)", years: [1994, 1995], trans: ["s10man", "4l60e"],
    plug: "ACDelco 41-932 platinum (verify by VIN)", gap: "0.045 in (1.14 mm)", plugMi: 60000, verify: ["oilCap", "filter", "drainTorque", "plug", "gap"] },
  { ...T.sbc43v, id: "s10_43v", models: G.S10, name: "4.3L V6 Vortec 4300 (L35 / LU3)", years: [1996, 2004], trans: ["s10man", "4l60e"] },

  // ---- Colorado / Canyon Gen 1 ----
  { id: "colo_28", models: G.COLO, name: "2.8L I4 Vortec 2800 (LK5)", family: "Atlas I4 (DOHC)", years: [2004, 2006],
    oilCap: "≈ 5.0 qt (4.7 L)", oilVisc: "SAE 5W-30", oilSpec: OIL_GM6094, filter: "ACDelco PF61 (verify by VIN)", drainTorque: "≈ 18 lb-ft (25 N·m)",
    trans: ["ar5", "4l60e"], intervalMi: 7500, intervalMo: 12, fuel: R87,
    plug: AC_VIN + " (iridium)", gap: "0.040 in (1.02 mm)", plugMi: 100000, verify: ["oilCap", "filter", "drainTorque", "plug"] },
  { id: "colo_29", models: G.COLO, name: "2.9L I4 Vortec 2900 (LLV)", family: "Atlas I4 (DOHC)", years: [2007, 2012],
    oilCap: "≈ 5.0 qt (4.7 L)", oilVisc: "SAE 5W-30", oilSpec: "GM 6094M · dexos1 (2011+)", filter: "ACDelco PF61 (verify by VIN)", drainTorque: "≈ 18 lb-ft (25 N·m)",
    trans: ["ar5", "4l60e"], intervalMi: 7500, intervalMo: 12, fuel: R87,
    plug: AC_VIN + " (iridium)", gap: "0.040 in (1.02 mm)", plugMi: 100000, verify: ["oilCap", "filter", "drainTorque", "plug"] },
  { id: "colo_35", models: G.COLO, name: "3.5L I5 Vortec 3500 (L52)", family: "Atlas I5 (DOHC)", years: [2004, 2006],
    oilCap: "≈ 6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: OIL_GM6094, filter: "ACDelco PF61 (verify by VIN)", drainTorque: "≈ 18 lb-ft (25 N·m)",
    trans: ["ar5", "4l60e"], intervalMi: 7500, intervalMo: 12, fuel: R87,
    plug: AC_VIN + " (iridium)", gap: "0.040 in (1.02 mm)", plugMi: 100000, verify: ["oilCap", "filter", "drainTorque", "plug"] },
  { id: "colo_37", models: G.COLO, name: "3.7L I5 Vortec 3700 (LLR)", family: "Atlas I5 (DOHC)", years: [2007, 2012],
    oilCap: "≈ 6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "GM 6094M · dexos1 (2011+)", filter: "ACDelco PF61 (verify by VIN)", drainTorque: "≈ 18 lb-ft (25 N·m)",
    trans: ["ar5", "4l60e"], intervalMi: 7500, intervalMo: 12, fuel: R87,
    plug: AC_VIN + " (iridium)", gap: "0.040 in (1.02 mm)", plugMi: 100000, verify: ["oilCap", "filter", "drainTorque", "plug"] },
  { ...T.ls4, id: "colo_53", models: G.COLO, name: "5.3L V8 Vortec 5300 (LH8)", years: [2009, 2012], trans: ["4l60e"], fuel: R87,
    notes: ["V8 Colorado / Canyon 2009-12 (no AFM)."] },

  // ---- Colorado / Canyon Gen 2 ----
  { id: "colo_25", models: G.COLO, name: "2.5L I4 (LCV)", family: "Ecotec 2.5L I4 (DI)", years: [2015, 2022],
    oilCap: "5.0 qt (4.7 L)", oilVisc: "SAE 5W-30", oilSpec: OIL_DEX1, filter: "ACDelco PF64 (verify by VIN)", drainTorque: "≈ 18 lb-ft (25 N·m)",
    trans: ["6man", "6l50", "8l45"], transYears: { "6man": [2015, 2018], "6l50": [2015, 2022], "8l45": [2017, 2018] }, intervalMi: 7500, intervalMo: 12, fuel: R87,
    plug: AC_VIN + " (iridium)", gap: "0.035 in (0.9 mm)", plugMi: 97500, notes: [OLS + "."],
    verify: ["filter", "drainTorque", "plug", "gap"] },
  { id: "colo_36", models: G.COLO, name: "3.6L V6 (LFX 2015-16 / LGZ 2017+)", family: "High Feature V6 (DI)", years: [2015, 2022],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30 (LFX) · SAE 0W-20 (LGZ)", oilSpec: OIL_DEX1, filter: "ACDelco PF63E (verify by VIN)", drainTorque: "≈ 18 lb-ft (25 N·m)",
    trans: ["6l50", "8l45"], transYears: { "6l50": [2015, 2016], "8l45": [2017, 2022] }, intervalMi: 7500, intervalMo: 12, fuel: R87,
    plug: AC_VIN + " (iridium)", gap: "0.040 in (1.02 mm)", plugMi: 97500,
    notes: ["Timing chains wear early if oil changes are stretched - keep the oil fresh.", OLS + "."],
    verify: ["filter", "drainTorque", "plug"] },
  { ...DSL, id: "colo_28d", models: G.COLO, name: "2.8L I4 Duramax Turbo-Diesel (LWN)", family: "Duramax I4 Diesel", years: [2016, 2022],
    oilCap: "≈ 6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "dexos2 (2016-19) / dexosD (2020+)", filter: AC_VIN, drainTorque: TQ_CONFIRM,
    trans: ["6l50"], intervalMi: 7500, intervalMo: 12, fuel: ULSD_DEF,
    fuelFilter: "Underhood fuel filter / water separator - " + AC_VIN, fuelFilterMi: 45000,
    notes: [HD_DSL_NOTE, OLS + "."], verify: ["oilCap", "fuelFilterMi"] },

  // ---- Colorado / Canyon Gen 3 ----
  { ...ENGINES.find((e) => e.id === "lt_27t"), id: "colo_27t", models: G.COLO, name: "2.7L I4 TurboMax (L2R / L3B)", years: [2023, 2099],
    trans: ["8l90"], oilCap: "≈ 6.0 qt (5.7 L)",
    notes: ["Base 'Turbo', 'Turbo Plus' and 'TurboMax' are all the 2.7L I4 at different power levels.", OLS + "."] }
);
