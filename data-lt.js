/* =====================================================================
   1/2-TON FULL-SIZE PICKUPS - C/K 1500, Silverado 1500, Sierra 1500
   + shared ENGINE TEMPLATES (T.*) reused by data-hd / data-suv.
   Independent reference data - NOT official GM data. See data-core.js.
   ===================================================================== */

/* ---------------------------------------------------------------------
   ENGINE TEMPLATES - oil / ignition data shared across body styles.
   Concrete ENGINES entries spread a template and add id/models/years/trans.
   --------------------------------------------------------------------- */
const OIL_OLD = "SAE 10W-30 (5W-30 in cold climates)";
const OIL_OLDSPEC = "API SG/SH/SJ";
const OIL_GM6094 = "GM 6094M / GM 4718M (synthetic) · dexos1 approved oil is backward compatible";
const OIL_DEX1 = "dexos1 (Gen 2 or Gen 3 on later models)";
const OIL_DSL = "SAE 15W-40 Heavy Duty Diesel";

const T = {
  sbc43tbi: { family: "4.3L Vortec-family V6 (90°)", oilCap: "≈ 5.0 qt (4.7 L)", oilVisc: OIL_OLD, oilSpec: OIL_OLDSPEC,
    filter: "ACDelco PF52 (verify by VIN)", drainTorque: "≈ 18 lb-ft (25 N·m)", intervalMi: 5000, intervalMo: 6,
    fuel: R87, plug: "ACDelco CR43TS / R43TS (copper)", gap: "0.035 in (0.89 mm)", plugMi: 30000,
    verify: ["oilCap", "filter", "drainTorque", "plug"] },
  sbc43v: { family: "4.3L Vortec 4300 V6", oilCap: "≈ 4.5 qt (4.3 L)", oilVisc: "SAE 5W-30", oilSpec: "API SJ/SL · " + OIL_GM6094,
    filter: "ACDelco PF52 (verify by VIN)", drainTorque: "≈ 18 lb-ft (25 N·m)", intervalMi: 5000, intervalMo: 6,
    fuel: R87, plug: "ACDelco 41-932 platinum (verify by VIN)", gap: "0.060 in (1.52 mm)", plugMi: 100000,
    notes: ["Vortec 4300 'spider' CSFI injector (1996-2002) can leak - fuel smell or hard start after sitting."],
    verify: ["oilCap", "filter", "drainTorque", "plug"] },
  sbc50tbi: { family: "Small-Block V8 (Gen I, TBI)", oilCap: "≈ 5.0 qt (4.7 L)", oilVisc: OIL_OLD, oilSpec: OIL_OLDSPEC,
    filter: "ACDelco PF52 (or longer PF35)", drainTorque: "≈ 18 lb-ft (25 N·m)", intervalMi: 5000, intervalMo: 6,
    fuel: R87, plug: "ACDelco R45TS (copper)", gap: "0.035 in (0.89 mm)", plugMi: 30000,
    notes: ["Throttle-body injection. Replace the distributor cap & rotor with the plugs."],
    verify: ["oilCap", "drainTorque", "plug"] },
  sbcVortec: { family: "Small-Block V8 Vortec (Gen I)", oilCap: "≈ 5.0 qt (4.7 L)", oilVisc: "SAE 5W-30 (10W-30 above 0 °F OK)", oilSpec: "API SJ · " + OIL_GM6094,
    filter: "ACDelco PF52 (or longer PF35)", drainTorque: "≈ 18 lb-ft (25 N·m)", intervalMi: 5000, intervalMo: 6,
    fuel: R87, plug: "ACDelco 41-932 platinum", gap: "0.060 in (1.52 mm)", plugMi: 100000,
    notes: ["Vortec 5000/5700 (L30/L31): intake manifold gasket coolant leaks are common at 80-120k mi."],
    verify: ["oilCap", "drainTorque", "plug", "gap"] },
  bb74tbi: { family: "Big-Block V8 (Mark IV / Gen V)", oilCap: "≈ 6.0 qt (5.7 L)", oilVisc: "SAE 10W-30 (15W-40 for heavy towing in heat)", oilSpec: OIL_OLDSPEC,
    filter: "ACDelco PF35 (verify by VIN)", drainTorque: "≈ 18 lb-ft (25 N·m)", intervalMi: 3000, intervalMo: 3,
    fuel: R87, plug: AC_VIN + " (copper)", gap: "0.035 in (0.89 mm)", plugMi: 30000,
    verify: ["oilCap", "filter", "drainTorque", "gap"] },
  bb74v: { family: "Big-Block V8 Vortec 7400 (Gen VI)", oilCap: "≈ 6.0 qt (5.7 L)", oilVisc: "SAE 10W-30 / 15W-40 for heavy towing", oilSpec: "API SJ",
    filter: "ACDelco PF35 (verify by VIN)", drainTorque: "≈ 18 lb-ft (25 N·m)", intervalMi: 3000, intervalMo: 6,
    fuel: R87, plug: AC_VIN + " (platinum)", gap: "0.060 in (1.52 mm)", plugMi: 100000,
    verify: ["oilCap", "filter", "drainTorque", "gap"] },
  ls3: { family: "Gen III Small-Block (LS) Vortec", oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: OIL_GM6094,
    filter: "ACDelco PF48 / PF48E (1999-2000: PF59 on some)", drainTorque: "18 lb-ft (25 N·m)", intervalMi: 7500, intervalMo: 12,
    fuel: R87, plug: "ACDelco 41-985 iridium (orig. 41-932) - verify by VIN", gap: "0.060 in (1.52 mm)", plugMi: 100000,
    notes: [OLS + ". Check the oil level between changes - LS truck engines can consume oil at higher mileage."],
    verify: ["filter", "plug"] },
  ls4: { family: "Gen IV Small-Block (LS) Vortec", oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 5W-30", oilSpec: "GM 6094M / 4718M (2007-10) · dexos1 (2011+)",
    filter: "ACDelco PF48E (verify by VIN)", drainTorque: "18 lb-ft (25 N·m)", intervalMi: 7500, intervalMo: 12,
    fuel: R87FFV, plug: LS_PLUG, gap: "0.040 in (1.02 mm)", plugMi: 100000,
    notes: [OLS + ".", "AFM (Active Fuel Management) engines: lifter failure and oil consumption are known issues - use quality oil, keep it full, don't stretch changes."],
    verify: ["filter"] },
  et3: { family: "Gen V Small-Block EcoTec3 (DI)", oilCap: "8.0 qt (7.6 L)", oilVisc: "SAE 0W-20", oilSpec: OIL_DEX1,
    filter: "ACDelco PF63E (verify by VIN)", drainTorque: "18 lb-ft (25 N·m)", intervalMi: 7500, intervalMo: 12,
    fuel: R87FFV, plug: AC_VIN + " (iridium)", gap: "0.040 in (1.02 mm)", plugMi: 97500,
    notes: [OLS + ". Direct injection - intake valve carbon builds up over time.", "AFM / DFM lifter failures are a known concern - use dexos1 oil and keep it at the full mark."],
    verify: ["filter", "plug", "gap"] }
};

/* ---------------------------------------------------------------------
   1500 GENERATIONS
   --------------------------------------------------------------------- */
GENERATIONS.push(
  {
    id: "lt_gmt400", models: G.LT, code: "GMT400 'OBS'", platform: "C/K 1500", years: [1990, 1998],
    lugTorque: "120 lb-ft (163 N·m)", lugPattern: "6 x 5.5 in (6 x 139.7 mm)", lugThread: "M12 x 1.5",
    washer: "≈ 3.0 qt (2.8 L)",
    coolant: "1990-95: " + GREEN + " · 1996+: " + DEXCOOL,
    coolantMi: 30000, coolantMo: 24, coolantNote: "Green: every 2 yr / 30,000 mi · DEX-COOL (1996+): every 5 yr / 150,000 mi",
    rearAxle: "GM 8.5\" (10-bolt) or 9.5\" (14-bolt semi-float) - SAE 80W-90 GL-5 (G80 locker needs no friction modifier)",
    rearAxleCap: "8.5\": ≈ 4.2 pt (2.0 L) · 9.5\": ≈ 5.5 pt (2.6 L)",
    frontDiff: "GM 8.25\" IFS - SAE 80W-90 GL-5", frontDiffCap: "≈ 3.5 pt (1.7 L)",
    transferCase: "NP241 / NV241 (manual shift) - DEXRON ATF (DEXRON VI) - ≈ 2.25 qt (2.1 L)",
    fuelTank: "Short bed ≈ 25 gal (95 L) · Long bed ≈ 34 gal (129 L)",
    airFilter: AC_VIN, cabinFilter: "Not equipped",
    fuelFilter: "Inline, frame rail - " + AC_VIN, fuelFilterMi: 30000,
    brakeFluid: DOT3, brakeMo: 36, diffMi: 50000, tcaseMi: 50000,
    notes: ["Check the RPO label (glovebox) for the axle code: GU5/GU6/GT4 = ratio, G80 = locking rear differential."],
    verify: ["lugTorque", "lugThread", "washer", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank", "fuelFilter"]
  },
  {
    id: "lt_gmt800", models: G.LT, code: "GMT800", platform: "Silverado / Sierra 1500 (incl. 1500HD)", years: [1999, 2006],
    lugTorque: "140 lb-ft (190 N·m)", lugPattern: "6 x 139.7 mm (1500HD: 8 x 165.1 mm)", lugThread: "M14 x 1.5",
    washer: "≈ 3.7 qt (3.5 L)",
    coolant: DEXCOOL, coolantMi: 150000, coolantMo: 60, coolantNote: DEXCOOL_NOTE,
    rearAxle: "GM 8.6\" or 9.5\" - SAE 75W-90 synthetic (GM spec) / 80W-90 GL-5",
    rearAxleCap: "8.6\": ≈ 2.0 qt (1.9 L) · 9.5\": ≈ 2.5 qt (2.4 L)",
    frontDiff: "GM 8.25\" IFS - SAE 75W-90 synthetic / 80W-90 GL-5", frontDiffCap: "≈ 1.7 qt (1.6 L)",
    transferCase: "NV246 Autotrac (auto 4WD): AUTO-TRAK II fluid · NV263 manual shift: DEXRON VI - ≈ 1.5-2.0 qt",
    fuelTank: "Short bed ≈ 26 gal (98 L) · Long bed ≈ 34 gal (129 L)",
    airFilter: AC_VIN, cabinFilter: "Not equipped",
    fuelFilter: "Inline frame-rail filter (most 1999-2003) - " + AC_VIN, fuelFilterMi: 30000,
    brakeFluid: DOT3, brakeMo: 36, diffMi: 100000, tcaseMi: 50000,
    notes: ["2007 'Classic' Silverado/Sierra (old body) use GMT800 specs - select 2006.", "1999-2000 'Silverado 2500' (non-HD, 6-lug or 8-lug light duty) shares many 1500 specs."],
    verify: ["washer", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank", "fuelFilter"]
  },
  {
    id: "lt_gmt900", models: G.LT, code: "GMT900", platform: "Silverado / Sierra 1500", years: [2007, 2013],
    lugTorque: "140 lb-ft (190 N·m)", lugPattern: "6 x 139.7 mm", lugThread: "M14 x 1.5",
    washer: "≈ 4.0 qt (3.8 L)",
    coolant: DEXCOOL, coolantMi: 150000, coolantMo: 60, coolantNote: DEXCOOL_NOTE,
    rearAxle: "GM 8.6\" or 9.76\" - SAE 75W-90 synthetic (GM spec)",
    rearAxleCap: "8.6\": ≈ 2.0 qt (1.9 L) · 9.76\": ≈ 2.5 qt (2.4 L)",
    frontDiff: "GM 8.25\" IFS - SAE 75W-90 synthetic", frontDiffCap: "≈ 1.7 qt (1.6 L)",
    transferCase: "Autotrac (NV246/261/263 family) - AUTO-TRAK II or DEXRON VI per case tag - ≈ 1.5-2.0 qt",
    fuelTank: "Short bed ≈ 26 gal (98 L) · Long bed ≈ 34 gal (129 L)",
    airFilter: AC_VIN, cabinFilter: "Not equipped (most builds)",
    fuelFilter: "In-tank, part of the fuel pump module - not a maintenance item", fuelFilterMi: null,
    brakeFluid: DOT3, brakeMo: 36, diffMi: 100000, tcaseMi: 50000,
    notes: ["2014 Silverado/Sierra 1500 is the new K2XX body. HD trucks stayed on GMT900 through 2014."],
    verify: ["washer", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank", "cabinFilter"]
  },
  {
    id: "lt_k2xx", models: G.LT, code: "K2XX", platform: "Silverado / Sierra 1500", years: [2014, 2018],
    lugTorque: "140 lb-ft (190 N·m)", lugPattern: "6 x 139.7 mm", lugThread: "M14 x 1.5",
    washer: "≈ 4.5 qt (4.3 L)",
    coolant: DEXCOOL, coolantMi: 150000, coolantMo: 60, coolantNote: DEXCOOL_NOTE,
    rearAxle: "GM 9.5\" / 9.76\" (some 8.6\") - SAE 75W-90 synthetic (GM spec)",
    rearAxleCap: "≈ 2.0-2.5 qt (1.9-2.4 L) by axle",
    frontDiff: "GM 8.25\" / 9.25\" IFS - SAE 75W-90 synthetic", frontDiffCap: "≈ 1.7 qt (1.6 L)",
    transferCase: "DEXRON VI or AUTO-TRAK II per case tag - ≈ 1.5-2.0 qt",
    fuelTank: "Standard ≈ 26 gal (98 L) · Long bed ≈ 36 gal (136 L)",
    airFilter: AC_VIN, cabinFilter: "Equipped (behind glovebox) - " + AC_VIN,
    fuelFilter: "In-tank, part of the fuel pump module - not a maintenance item", fuelFilterMi: null,
    brakeFluid: DOT3, brakeMo: 60, diffMi: 100000, tcaseMi: 50000,
    notes: ["Reset Oil Life in the DIC after every oil change (hold SELECT on the oil life screen)."],
    verify: ["washer", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank", "brakeMo"]
  },
  {
    id: "lt_t1", models: G.LT, code: "T1 (GMT T1XX)", platform: "Silverado / Sierra 1500", years: [2019, 2099],
    lugTorque: "140 lb-ft (190 N·m)", lugPattern: "6 x 139.7 mm", lugThread: "M14 x 1.5",
    washer: "≈ 4.5 qt (4.3 L)",
    coolant: DEXCOOL, coolantMi: 150000, coolantMo: 60, coolantNote: DEXCOOL_NOTE,
    rearAxle: "GM 9.5\" / 9.76\" - SAE 75W-85 or 75W-90 synthetic per axle tag / Owner's Manual",
    rearAxleCap: "≈ 2.0-2.5 qt (1.9-2.4 L) by axle",
    frontDiff: "GM 8.25\" / 9.25\" IFS - SAE 75W-90 synthetic", frontDiffCap: "≈ 1.7 qt (1.6 L)",
    transferCase: "DEXRON VI or AUTO-TRAK II per case tag - ≈ 1.5-2.0 qt",
    fuelTank: "Short box ≈ 24 gal · Standard ≈ 26 gal · Long bed / diesel ≈ 28-34 gal - by cab/box",
    airFilter: AC_VIN, cabinFilter: "Equipped (behind glovebox) - " + AC_VIN,
    fuelFilter: "Gas: in-tank, lifetime · Diesel: see engine", fuelFilterMi: null,
    brakeFluid: "DOT 3 (GM spec) - from a sealed container", brakeMo: 60, diffMi: 100000, tcaseMi: 50000,
    notes: ["2022+ refresh shares these specs. 2022 'LTD' (Chevrolet) / 'Limited' (GMC) trucks are carry-over 2021 models.",
      "ZR2 / AT4X: Multimatic DSSV dampers and front/rear e-lockers - same fluid specs, check axle tag for capacity."],
    verify: ["washer", "rearAxle", "rearAxleCap", "frontDiffCap", "transferCase", "fuelTank", "brakeMo"]
  }
);

/* ---------------------------------------------------------------------
   1500 ENGINES
   --------------------------------------------------------------------- */
ENGINES.push(
  // GMT400
  { ...T.sbc43tbi, id: "lt_43tbi", models: G.LT, name: "4.3L V6 TBI (LB4)", years: [1990, 1995], trans: ["nv3500", "th700", "4l60e"],
    transYears: { th700: [1990, 1992], "4l60e": [1993, 1995] } },
  { ...T.sbc43v, id: "lt_43v", models: G.LT, name: "4.3L V6 Vortec (L35)", years: [1996, 1998], trans: ["nv3500", "4l60e"] },
  { ...T.sbc50tbi, id: "lt_50tbi", models: G.LT, name: "5.0L V8 TBI (305 / L03)", years: [1990, 1995], trans: ["nv3500", "th700", "4l60e"],
    transYears: { th700: [1990, 1992], "4l60e": [1993, 1995] } },
  { ...T.sbc50tbi, id: "lt_57tbi", models: G.LT, name: "5.7L V8 TBI (350 / L05)", years: [1990, 1995], trans: ["nv3500", "th700", "4l60e", "4l80e"],
    transYears: { th700: [1990, 1992], "4l60e": [1993, 1995], "4l80e": [1991, 1995] } },
  { ...T.sbcVortec, id: "lt_50v", models: G.LT, name: "5.0L V8 Vortec 5000 (L30)", years: [1996, 1998], trans: ["nv3500", "4l60e"] },
  { ...T.sbcVortec, id: "lt_57v", models: G.LT, name: "5.7L V8 Vortec 5700 (L31)", years: [1996, 1998], trans: ["nv3500", "4l60e"] },
  { ...T.bb74tbi, id: "lt_454ss", models: ["chev_lt"], name: "7.4L V8 TBI (454 SS, L19)", years: [1990, 1993], trans: ["th400", "4l80e"],
    drives: ["4x2"], transYears: { th400: [1990, 1990], "4l80e": [1991, 1993] }, notes: ["454 SS - C1500 regular cab short box, 4x2 only."] },

  // GMT800
  { ...T.sbc43v, id: "lt_43v8", models: G.LT, name: "4.3L V6 Vortec 4300 (L35 / LU3)", years: [1999, 2006], trans: ["nv3500", "4l60e"] },
  { ...T.ls3, id: "lt_48_3", models: G.LT, name: "4.8L V8 Vortec 4800 (LR4)", years: [1999, 2006], trans: ["nv3500", "4l60e"] },
  { ...T.ls3, id: "lt_53_3", models: G.LT, name: "5.3L V8 Vortec 5300 (LM7 / L59 FlexFuel)", years: [1999, 2006], trans: ["4l60e"], fuel: R87FFV },
  { ...T.ls3, id: "lt_60_3", models: G.LT, name: "6.0L V8 Vortec 6000 (LQ4 1500HD / LQ9 SS & Denali)", years: [2001, 2006], trans: ["4l60e", "4l80e"],
    fuel: "LQ4: " + R87 + " · LQ9 (high output): premium 91+ recommended",
    transYears: { "4l60e": [2002, 2006], "4l80e": [2001, 2006] },
    notes: ["LQ4 + 4L80E = 1500HD (8-lug). LQ9 = Silverado SS (2003-07, AWD) and Sierra Denali (2002-06)."] },

  // GMT900
  { ...T.ls4, id: "lt_43v9", models: G.LT, name: "4.3L V6 Vortec 4300 (LU3)", years: [2007, 2013], trans: ["4l60e"],
    family: "4.3L Vortec 4300 V6", oilCap: "≈ 4.5 qt (4.3 L)", plug: AC_VIN + " (platinum)", fuel: R87, verify: ["oilCap", "filter", "plug"] },
  { ...T.ls4, id: "lt_48_4", models: G.LT, name: "4.8L V8 Vortec 4800 (LY2 / L20)", years: [2007, 2013], trans: ["4l60e"], fuel: R87 },
  { ...T.ls4, id: "lt_53_4", models: G.LT, name: "5.3L V8 Vortec 5300 (LMG / LY5 / LC9 / LH9, AFM)", years: [2007, 2013], trans: ["4l60e", "6l80"],
    transYears: { "4l60e": [2007, 2010], "6l80": [2009, 2013] } },
  { ...T.ls4, id: "lt_62_4", models: G.LT, name: "6.2L V8 Vortec 6200 (L92 / L9H)", years: [2007, 2013], trans: ["6l80"],
    fuel: P91, notes: ["Sierra Denali 2007+; Silverado LTZ / High Country 2009+.", OLS + "."] },

  // K2XX
  { ...T.et3, id: "lt_43et", models: G.LT, name: "4.3L V6 EcoTec3 (LV3)", years: [2014, 2018], trans: ["6l80"], family: "EcoTec3 V6 (DI)",
    oilCap: "6.0 qt (5.7 L)", verify: ["oilCap", "filter", "plug", "gap"] },
  { ...T.et3, id: "lt_53et", models: G.LT, name: "5.3L V8 EcoTec3 (L83)", years: [2014, 2018], trans: ["6l80", "8l90"],
    transYears: { "6l80": [2014, 2018], "8l90": [2016, 2018] } },
  { ...T.et3, id: "lt_62et", models: G.LT, name: "6.2L V8 EcoTec3 (L86)", years: [2014, 2018], trans: ["6l80", "8l90"],
    transYears: { "6l80": [2014, 2014], "8l90": [2015, 2018] }, fuel: P91 },

  // T1
  { ...T.et3, id: "lt_43t1", models: G.LT, name: "4.3L V6 EcoTec3 (LV3)", years: [2019, 2021], trans: ["6l80"], family: "EcoTec3 V6 (DI)",
    oilCap: "6.0 qt (5.7 L)", notes: ["2019-21 Work Truck / base trims."], verify: ["oilCap", "filter", "plug", "gap"] },
  { id: "lt_27t", models: G.LT, name: "2.7L I4 Turbo (L3B 'TurboMax' 2024+)", family: "2.7L Turbo I4 (DI)", years: [2019, 2099],
    oilCap: "6.0 qt (5.7 L)", oilVisc: "SAE 0W-20", oilSpec: OIL_DEX1, filter: AC_VIN, drainTorque: TQ_CONFIRM,
    trans: ["8l90"], intervalMi: 5000, intervalMo: 6,
    fuel: R87 + " · premium recommended when towing", plug: AC_VIN + " (iridium)", gap: "≈ 0.028 in (0.7 mm) - confirm", plugMi: 60000,
    notes: ["Turbo engine: 5,000 mi / 6 mo is a conservative DIY interval, especially when towing.", OLS + "."],
    verify: ["oilCap", "gap", "plugMi"] },
  { ...T.et3, id: "lt_53t1", models: G.LT, name: "5.3L V8 EcoTec3 (L82 / L84 DFM)", years: [2019, 2099], trans: ["6l80", "8l90", "10l80"],
    transYears: { "6l80": [2019, 2021], "8l90": [2019, 2022], "10l80": [2019, 2099] },
    notes: ["Transmission depends on trim and year: 6-speed (L82, 2019-21), 8-speed (L84 2019-22), 10-speed (2019+ and all 2023+). Check the RPO label: MYC = 6L80, M5U = 8L90, MQB = 10L80.", OLS + "."] },
  { ...T.et3, id: "lt_62t1", models: G.LT, name: "6.2L V8 EcoTec3 (L87 DFM)", years: [2019, 2099], trans: ["10l80"], fuel: P91 },
  { id: "lt_30d", models: G.LT, name: "3.0L I6 Duramax Turbo-Diesel (LM2 / LZ0)", family: "Duramax I6 Diesel", years: [2020, 2099],
    oilCap: "≈ 7.0 qt (6.6 L)", oilVisc: "SAE 0W-20", oilSpec: "dexosD", filter: AC_VIN, drainTorque: TQ_CONFIRM,
    trans: ["10l80"], intervalMi: 7500, intervalMo: 12, isDiesel: true,
    fuel: ULSD_DEF, plug: "N/A - diesel", gap: "N/A", plugMi: null,
    fuelFilter: "Engine-bay fuel filter / water separator - " + AC_VIN, fuelFilterMi: 30000,
    notes: ["Uses a wet timing belt (oil pump) on LM2 - inspection/replacement is a dealer item at high mileage.", "Only dexosD 0W-20 oil. DEF fill is next to the fuel filler.", OLS + "."],
    verify: ["oilCap", "fuelFilterMi"] }
);
