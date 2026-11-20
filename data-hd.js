/* =====================================================================
   HEAVY-DUTY PICKUPS - C/K 2500/3500, Silverado / Sierra 2500HD/3500HD
   Independent reference data - NOT official GM data. See data-core.js.
   HD specs vary a lot by SRW/DRW, axle, GVWR and cab/chassis. Always
   check the axle tag and the RPO label in the glovebox.
   ===================================================================== */

const HD_DSL_NOTE = "Diesel: drain the fuel filter / water separator at the 'Water in Fuel' warning. Prime the system after a filter change (hand primer or key-cycle procedure).";

GENERATIONS.push(
  {
    id: "hd_gmt400", models: G.HD, code: "GMT400 'OBS' HD", platform: "C/K 2500 / 3500", years: [1990, 2000],
    lugTorque: "140 lb-ft (190 N·m) · DRW: 175 lb-ft - retorque after 100 mi", lugPattern: "8 x 6.5 in (8 x 165.1 mm)", lugThread: "M14 x 1.5 (9/16-18 on some DRW)",
    washer: "≈ 3.0 qt (2.8 L)",
    coolant: "1990-95: " + GREEN + " · 1996+: " + DEXCOOL + " · Diesel: add SCA per Owner's Manual",
    coolantMi: 30000, coolantMo: 24, coolantNote: "Green: every 2 yr / 30,000 mi · DEX-COOL (1996+): every 5 yr / 150,000 mi",
    rearAxle: "GM 10.5\" 14-bolt full-float (most) / Dana 70 or 80 (DRW) - SAE 80W-90 or 75W-90 GL-5",
    rearAxleCap: "14-bolt FF: ≈ 6.5 pt (3.1 L) · Dana 70/80: ≈ 6.5-8.0 pt",
    frontDiff: "Dana 60 (K3500, some K2500) or GM 9.25\" IFS - SAE 80W-90 GL-5", frontDiffCap: "≈ 3.5-6.0 pt by axle",
    transferCase: "NP241 / NV241 HD (manual shift) - DEXRON ATF (DEXRON VI) - ≈ 2.25-4.0 qt",
    fuelTank: "Short bed ≈ 25 gal · Long bed ≈ 34 gal (dual tanks on some crew/chassis)",
    airFilter: AC_VIN, cabinFilter: "Not equipped",
    fuelFilter: "Gas: inline frame-rail filter · Diesel: engine-mounted filter - " + AC_VIN, fuelFilterMi: 15000,
    brakeFluid: DOT3, brakeMo: 36, diffMi: 50000, tcaseMi: 50000,
    notes: ["1999-2000 C/K 2500/3500 'Classic' HD and chassis cabs stay on this OBS body after the 1999 Silverado launch.",
      "1999-2000 'Silverado 2500' (GMT800 body, non-HD) - select Silverado 1500 2000 for its 4.8/5.3/6.0 engine specs."],
    verify: ["lugTorque", "lugThread", "washer", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank", "fuelFilter", "fuelFilterMi"]
  },
  {
    id: "hd_gmt800", models: G.HD, code: "GMT800 HD", platform: "Silverado / Sierra 2500HD / 3500", years: [2001, 2007],
    lugTorque: "140 lb-ft (190 N·m) · retorque DRW after 100 mi", lugPattern: "8 x 6.5 in (8 x 165.1 mm)", lugThread: "M14 x 1.5",
    washer: "≈ 3.7 qt (3.5 L)",
    coolant: DEXCOOL, coolantMi: 150000, coolantMo: 60, coolantNote: DEXCOOL_NOTE,
    rearAxle: "AAM 11.5\" full-float - SAE 75W-90 synthetic (GM spec)",
    rearAxleCap: "≈ 3.5-4.0 qt (3.3-3.8 L) - fill to bottom of fill hole",
    frontDiff: "AAM 9.25\" IFS - SAE 75W-90 synthetic", frontDiffCap: "≈ 1.8 qt (1.7 L)",
    transferCase: "NP261 / NP263 HD (manual or push-button) - DEXRON VI - ≈ 2.0 qt",
    fuelTank: "Short bed ≈ 26 gal · Long bed ≈ 34 gal",
    airFilter: AC_VIN, cabinFilter: "Not equipped",
    fuelFilter: "Gas: inline frame-rail filter · Diesel: engine-mounted filter head - " + AC_VIN, fuelFilterMi: 15000,
    brakeFluid: DOT3, brakeMo: 36, diffMi: 100000, tcaseMi: 50000,
    notes: ["2007 'Classic' HD trucks (old body) use these specs - pick 2007 here."],
    verify: ["washer", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank", "fuelFilterMi"]
  },
  {
    id: "hd_gmt900", models: G.HD, code: "GMT900 HD", platform: "Silverado / Sierra 2500HD / 3500HD", years: [2008, 2014],
    lugTorque: "140 lb-ft (190 N·m) · retorque DRW after 100 mi", lugPattern: "8 x 180 mm", lugThread: "M14 x 1.5",
    washer: "≈ 4.0 qt (3.8 L)",
    coolant: DEXCOOL, coolantMi: 150000, coolantMo: 60, coolantNote: DEXCOOL_NOTE,
    rearAxle: "AAM 11.5\" full-float (most) / 10.5\" (some 2500) - SAE 75W-90 synthetic (GM spec)",
    rearAxleCap: "11.5\": ≈ 3.5-4.0 qt · 10.5\": ≈ 3.5 qt",
    frontDiff: "AAM 9.25\" IFS - SAE 75W-90 synthetic", frontDiffCap: "≈ 1.8 qt (1.7 L)",
    transferCase: "Borg-Warner / NV HD case - DEXRON VI or AUTO-TRAK II per tag - ≈ 2.0 qt",
    fuelTank: "Short bed ≈ 26 gal · Long bed ≈ 36 gal",
    airFilter: AC_VIN, cabinFilter: "Not equipped (most builds)",
    fuelFilter: "Gas: in-tank (lifetime) · Diesel: engine-mounted filter - " + AC_VIN, fuelFilterMi: null,
    brakeFluid: DOT3, brakeMo: 36, diffMi: 100000, tcaseMi: 50000,
    notes: ["Bolt pattern changed to 8 x 180 mm for 2011 on the new HD frame. 2008-10 HD trucks are 8 x 6.5 in - confirm before buying wheels."],
    verify: ["lugPattern", "washer", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank", "cabinFilter"]
  },
  {
    id: "hd_k2xx", models: G.HD, code: "K2XX HD", platform: "Silverado / Sierra 2500HD / 3500HD", years: [2015, 2019],
    lugTorque: "140 lb-ft (190 N·m) · DRW: retorque after 100 mi", lugPattern: "8 x 180 mm", lugThread: "M14 x 1.5",
    washer: "≈ 4.5 qt (4.3 L)",
    coolant: DEXCOOL, coolantMi: 150000, coolantMo: 60, coolantNote: DEXCOOL_NOTE,
    rearAxle: "AAM 11.5\" full-float - SAE 75W-90 synthetic (GM spec)", rearAxleCap: "≈ 3.5-4.0 qt (3.3-3.8 L)",
    frontDiff: "AAM 9.25\" IFS - SAE 75W-90 synthetic", frontDiffCap: "≈ 1.8 qt (1.7 L)",
    transferCase: "Borg-Warner 4481 / 4482 - DEXRON VI or AUTO-TRAK II per tag - ≈ 2.0 qt",
    fuelTank: "Short bed ≈ 26 gal · Long bed ≈ 36 gal",
    airFilter: AC_VIN, cabinFilter: "Equipped (behind glovebox) - " + AC_VIN,
    fuelFilter: "Gas: in-tank (lifetime) · Diesel: engine-mounted filter - " + AC_VIN, fuelFilterMi: null,
    brakeFluid: DOT3, brakeMo: 60, diffMi: 100000, tcaseMi: 50000,
    notes: [],
    verify: ["washer", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank", "brakeMo"]
  },
  {
    id: "hd_t1", models: G.HD, code: "T1 HD (GMT T1XX)", platform: "Silverado / Sierra 2500HD / 3500HD", years: [2020, 2099],
    lugTorque: "140 lb-ft (190 N·m) · DRW: retorque after 100 mi", lugPattern: "8 x 180 mm", lugThread: "M14 x 1.5",
    washer: "≈ 4.5 qt (4.3 L)",
    coolant: DEXCOOL, coolantMi: 150000, coolantMo: 60, coolantNote: DEXCOOL_NOTE,
    rearAxle: "AAM 11.5\" / 12\" full-float - SAE 75W-90 synthetic (GM spec)", rearAxleCap: "≈ 3.5-4.5 qt by axle",
    frontDiff: "AAM 9.25\" / 10\" IFS - SAE 75W-90 synthetic", frontDiffCap: "≈ 1.8-2.0 qt",
    transferCase: "DEXRON VI or AUTO-TRAK II per tag - ≈ 2.0 qt",
    fuelTank: "Gas ≈ 36 gal · Diesel ≈ 36 gal (long bed) - varies by cab/box",
    airFilter: AC_VIN, cabinFilter: "Equipped (behind glovebox) - " + AC_VIN,
    fuelFilter: "Gas: in-tank (lifetime) · Diesel: engine-bay filter - " + AC_VIN, fuelFilterMi: null,
    brakeFluid: DOT3, brakeMo: 60, diffMi: 100000, tcaseMi: 50000,
    notes: ["AT4X / ZR2 HD (2024+): Multimatic DSSV dampers - same fluid specs."],
    verify: ["washer", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank", "brakeMo"]
  }
);

const DSL = { isDiesel: true, plug: "N/A - diesel (glow plugs are a shop item)", gap: "N/A", plugMi: null };

ENGINES.push(
  // ---- GMT400 HD ----
  { ...T.sbc50tbi, id: "hd_57tbi", models: G.HD, name: "5.7L V8 TBI (350 / L05)", years: [1990, 1995], trans: ["nv4500", "sm465", "th400", "4l80e"],
    transYears: { sm465: [1990, 1991], nv4500: [1992, 1995], th400: [1990, 1990], "4l80e": [1991, 1995] } },
  { ...T.sbcVortec, id: "hd_57v", models: G.HD, name: "5.7L V8 Vortec 5700 (L31)", years: [1996, 2000], trans: ["nv4500", "4l80e"] },
  { ...T.bb74tbi, id: "hd_74tbi", models: G.HD, name: "7.4L V8 TBI (454 / L19)", years: [1990, 1995], trans: ["nv4500", "sm465", "th400", "4l80e"],
    transYears: { sm465: [1990, 1991], nv4500: [1992, 1995], th400: [1990, 1990], "4l80e": [1991, 1995] } },
  { ...T.bb74v, id: "hd_74v", models: G.HD, name: "7.4L V8 Vortec 7400 (L29)", years: [1996, 2000], trans: ["nv4500", "4l80e"] },
  { ...DSL, id: "hd_62d", models: G.HD, name: "6.2L V8 Diesel (LH6 / LL4)", family: "Detroit Diesel 6.2L IDI", years: [1990, 1993],
    oilCap: "≈ 7.0 qt (6.6 L)", oilVisc: OIL_DSL, oilSpec: "API CD/CE (CK-4 today)", filter: "ACDelco PF1218 (verify by VIN)", drainTorque: "≈ 20 lb-ft (27 N·m)",
    trans: ["sm465", "nv4500", "th400", "4l80e"], transYears: { sm465: [1990, 1991], nv4500: [1992, 1993], th400: [1990, 1990], "4l80e": [1991, 1993] },
    intervalMi: 3000, intervalMo: 3, fuel: ULSD,
    fuelFilter: "Engine-mounted fuel filter / water separator - " + AC_VIN, fuelFilterMi: 15000,
    notes: ["Indirect-injection diesel. Short oil intervals - soot loads the oil fast.", HD_DSL_NOTE],
    verify: ["oilCap", "filter", "drainTorque", "fuelFilterMi"] },
  { ...DSL, id: "hd_65td", models: G.HD, name: "6.5L V8 Turbo-Diesel (L56 / L65 / L57)", family: "Detroit Diesel 6.5L IDI", years: [1992, 2000],
    oilCap: "≈ 8.0 qt (7.6 L)", oilVisc: OIL_DSL, oilSpec: "API CF-4 / CG-4 (CK-4 today)", filter: "ACDelco PF1218 (verify by VIN)", drainTorque: "≈ 20 lb-ft (27 N·m)",
    trans: ["nv4500", "4l80e"], intervalMi: 3000, intervalMo: 3, fuel: ULSD,
    fuelFilter: "Engine-mounted fuel filter / water separator - " + AC_VIN, fuelFilterMi: 15000,
    notes: ["PMD (pump-mounted driver / FSD) failures cause stalling. A remote-mount kit with a heat sink is the common fix.", HD_DSL_NOTE],
    verify: ["oilCap", "filter", "drainTorque", "fuelFilterMi"] },

  // ---- GMT800 HD ----
  { ...T.ls3, id: "hd_60_3", models: G.HD, name: "6.0L V8 Vortec 6000 (LQ4)", years: [2001, 2007], trans: ["nv4500", "zf6", "4l80e"],
    transYears: { nv4500: [2001, 2001], zf6: [2001, 2006] } },
  { ...T.bb74v, id: "hd_81", models: G.HD, name: "8.1L V8 Vortec 8100 (L18)", family: "Big-Block Vortec 8100 (Gen VII)", years: [2001, 2007],
    oilCap: "≈ 6.5 qt (6.2 L)", oilVisc: "SAE 15W-40 (GM spec) / 5W-30 in cold climates", oilSpec: "API SL/CI-4", filter: "ACDelco PF454 (verify by VIN)",
    trans: ["zf6", "allison5", "allison6"], transYears: { zf6: [2001, 2006], allison5: [2001, 2005], allison6: [2006, 2007] },
    intervalMi: 5000, intervalMo: 6, plug: "ACDelco 41-993 platinum (verify by VIN)", gap: "0.060 in (1.52 mm)",
    notes: ["Heavy-towing gas big block. 15W-40 is GM's listed oil for this engine - check the cap.", "Rear plugs are hard to reach - use extensions and a swivel."],
    verify: ["oilCap", "oilVisc", "filter", "drainTorque", "plug"] },
  { ...DSL, id: "hd_lb7", models: G.HD, name: "6.6L V8 Duramax LB7", family: "Duramax V8 Diesel", years: [2001, 2004],
    oilCap: "10.0 qt (9.5 L)", oilVisc: OIL_DSL + " (5W-40 synthetic in cold)", oilSpec: "API CH-4 / CI-4 (CK-4 today)", filter: "ACDelco PF2232", drainTorque: "≈ 52 lb-ft (70 N·m) - check",
    trans: ["zf6", "allison5"], intervalMi: 5000, intervalMo: 6, fuel: ULSD,
    fuelFilter: "ACDelco TP3018 (engine-mounted head, rear of engine)", fuelFilterMi: 15000,
    notes: ["LB7 injectors are a known failure item (fuel in oil, smoke, high return). Watch the oil level for rising fuel dilution.", HD_DSL_NOTE],
    verify: ["drainTorque", "fuelFilterMi"] },
  { ...DSL, id: "hd_lly", models: G.HD, name: "6.6L V8 Duramax LLY", family: "Duramax V8 Diesel", years: [2004, 2005],
    oilCap: "10.0 qt (9.5 L)", oilVisc: OIL_DSL, oilSpec: "API CI-4 (CK-4 today)", filter: "ACDelco PF2232", drainTorque: "≈ 52 lb-ft (70 N·m) - check",
    trans: ["zf6", "allison5"], intervalMi: 5000, intervalMo: 6, fuel: ULSD,
    fuelFilter: "ACDelco TP3018 (engine-mounted head)", fuelFilterMi: 15000,
    notes: ["LLY overheating when towing: an upgraded turbo mouthpiece and fan clutch/radiator care are popular fixes.", HD_DSL_NOTE],
    verify: ["drainTorque", "fuelFilterMi"] },
  { ...DSL, id: "hd_lbz", models: G.HD, name: "6.6L V8 Duramax LBZ", family: "Duramax V8 Diesel", years: [2006, 2007],
    oilCap: "10.0 qt (9.5 L)", oilVisc: OIL_DSL, oilSpec: "API CI-4 (CK-4 today)", filter: "ACDelco PF2232", drainTorque: "≈ 52 lb-ft (70 N·m) - check",
    trans: ["zf6", "allison6"], intervalMi: 5000, intervalMo: 6, fuel: ULSD,
    fuelFilter: "ACDelco TP3018 (engine-mounted head)", fuelFilterMi: 15000,
    notes: ["LBZ + Allison 6-speed: highly regarded combo - no DPF/DEF.", HD_DSL_NOTE],
    verify: ["drainTorque", "fuelFilterMi"] },

  // ---- GMT900 HD ----
  { ...T.ls4, id: "hd_60_4", models: G.HD, name: "6.0L V8 Vortec 6000 (LY6 / L96)", years: [2008, 2014], trans: ["6l90"],
    oilVisc: "SAE 5W-30", fuel: R87FFV, notes: ["No AFM on HD 6.0L. FlexFuel (L96) from 2010.", OLS + "."] },
  { ...DSL, id: "hd_lmm", models: G.HD, name: "6.6L V8 Duramax LMM", family: "Duramax V8 Diesel", years: [2008, 2010],
    oilCap: "10.0 qt (9.5 L)", oilVisc: OIL_DSL, oilSpec: "API CJ-4 (CK-4 today)", filter: "ACDelco PF2232", drainTorque: "≈ 52 lb-ft (70 N·m) - check",
    trans: ["allison6"], intervalMi: 7500, intervalMo: 12, fuel: ULSD,
    fuelFilter: "ACDelco TP3018 (engine-mounted head)", fuelFilterMi: 30000,
    notes: ["First Duramax with a DPF. Let regens finish; avoid lots of short trips.", HD_DSL_NOTE, OLS + "."],
    verify: ["drainTorque", "fuelFilterMi"] },
  { ...DSL, id: "hd_lml", models: G.HD, name: "6.6L V8 Duramax LML / LGH", family: "Duramax V8 Diesel", years: [2011, 2014],
    oilCap: "10.0 qt (9.5 L)", oilVisc: OIL_DSL + " (5W-40 in cold)", oilSpec: "API CJ-4 / dexos2 HD (CK-4 today)", filter: "ACDelco PF2232 (verify by VIN)", drainTorque: "≈ 52 lb-ft (70 N·m) - check",
    trans: ["allison6"], intervalMi: 7500, intervalMo: 12, fuel: ULSD_DEF,
    fuelFilter: "Frame-rail fuel filter / water separator - " + AC_VIN, fuelFilterMi: 22500,
    notes: ["Bosch CP4.2 high-pressure pump - a known failure point. Use good fuel and keep the fuel filter fresh. Many owners fit a lift pump or CP4 bypass kit.", HD_DSL_NOTE, OLS + "."],
    verify: ["filter", "drainTorque", "fuelFilterMi"] },

  // ---- K2XX HD ----
  { ...T.ls4, id: "hd_60_k2", models: G.HD, name: "6.0L V8 Vortec 6000 (L96)", years: [2015, 2019], trans: ["6l90"],
    fuel: R87FFV, notes: ["No AFM on HD 6.0L.", OLS + "."] },
  { ...DSL, id: "hd_lml_k2", models: G.HD, name: "6.6L V8 Duramax LML", family: "Duramax V8 Diesel", years: [2015, 2016],
    oilCap: "10.0 qt (9.5 L)", oilVisc: OIL_DSL + " (5W-40 in cold)", oilSpec: "dexos2 HD / API CJ-4 (CK-4 today)", filter: "ACDelco PF2232 (verify by VIN)", drainTorque: "≈ 52 lb-ft (70 N·m) - check",
    trans: ["allison6"], intervalMi: 7500, intervalMo: 12, fuel: ULSD_DEF,
    fuelFilter: "Frame-rail fuel filter / water separator - " + AC_VIN, fuelFilterMi: 22500,
    notes: ["Bosch CP4.2 high-pressure pump - keep the fuel filter fresh and avoid contaminated fuel.", HD_DSL_NOTE, OLS + "."],
    verify: ["filter", "drainTorque", "fuelFilterMi"] },
  { ...DSL, id: "hd_l5p_k2", models: G.HD, name: "6.6L V8 Duramax L5P", family: "Duramax V8 Diesel", years: [2017, 2019],
    oilCap: "10.0 qt (9.5 L)", oilVisc: "SAE 15W-40 (5W-40 or 0W-40 dexosD in cold)", oilSpec: "dexos2 / dexosD (API CK-4)", filter: "ACDelco PF26 (verify by VIN)", drainTorque: TQ_CONFIRM,
    trans: ["allison6"], intervalMi: 7500, intervalMo: 12, fuel: ULSD_DEF,
    fuelFilter: "Frame-rail fuel filter / water separator - " + AC_VIN, fuelFilterMi: 22500,
    notes: ["Denso HP4 pump (more robust than CP4).", HD_DSL_NOTE, OLS + "."],
    verify: ["filter", "fuelFilterMi"] },

  // ---- T1 HD ----
  { ...T.et3, id: "hd_66g", models: G.HD, name: "6.6L V8 Gas (L8T)", family: "Gen V Small-Block (DI, iron block)", years: [2020, 2099],
    oilCap: "≈ 8.0 qt (7.6 L)", oilVisc: "SAE 0W-20 (5W-30 HD tow use per manual)", oilSpec: OIL_DEX1, trans: ["6l90", "10l1000"],
    transYears: { "6l90": [2020, 2023], "10l1000": [2024, 2099] },
    notes: ["No AFM/DFM on L8T.", OLS + "."], verify: ["oilCap", "oilVisc", "filter", "plug", "gap"] },
  { ...DSL, id: "hd_l5p_t1", models: G.HD, name: "6.6L V8 Duramax L5P (Gen 2 2024+)", family: "Duramax V8 Diesel", years: [2020, 2099],
    oilCap: "10.0 qt (9.5 L)", oilVisc: "SAE 15W-40 (5W-40 / 0W-40 dexosD in cold)", oilSpec: "dexosD (API CK-4)", filter: "ACDelco PF26 (verify by VIN)", drainTorque: TQ_CONFIRM,
    trans: ["10l1000"], intervalMi: 7500, intervalMo: 12, fuel: ULSD_DEF,
    fuelFilter: "Frame-rail fuel filter / water separator - " + AC_VIN, fuelFilterMi: 22500,
    notes: ["Allison 10L1000 10-speed. 2024+ L5P has revised turbo and pistons - same service items.", HD_DSL_NOTE, OLS + "."],
    verify: ["filter", "fuelFilterMi"] }
);
