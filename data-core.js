/* =====================================================================
   DIY GARAGE - GM TRUCK & SUV SPEC DATABASE (1990 - present)  · CORE
   ---------------------------------------------------------------------
   Independent reference data. NOT official General Motors data.
   Values were compiled from general owner's-manual-style and aftermarket
   application knowledge and have NOT been verified against GM service
   information. Any key listed in an item's `verify` array shows a
   "VERIFY" tag in the UI. Part numbers we are not confident about read
   "confirm P/N by VIN" instead of being guessed.

   Load order: data-core.js -> data-lt.js -> data-hd.js -> data-suv.js
               -> data-mid.js -> data-ev.js -> data-finalize.js -> app.js
   ===================================================================== */

const DATA_VERSION = "2026.11a";

/* ---------------------------------------------------------------------
   MODELS - what the user picks after MAKE.
   drives = driveline buttons offered. Years come from generation +
   engine coverage, so gaps (e.g. Colorado 2013-14) appear automatically.
   --------------------------------------------------------------------- */
const MODELS = [
  { id: "chev_lt",    make: "Chevrolet", name: "Silverado 1500 / C/K 1500",               cls: "Pickup",  drives: ["4x2", "4x4"] },
  { id: "chev_hd",    make: "Chevrolet", name: "Silverado 2500HD/3500HD / C/K 2500/3500",   cls: "HD Pickup", drives: ["4x2", "4x4"] },
  { id: "chev_tahoe", make: "Chevrolet", name: "Tahoe / Blazer (full-size K5)",            cls: "SUV",     drives: ["4x2", "4x4"] },
  { id: "chev_sub",   make: "Chevrolet", name: "Suburban",                                 cls: "SUV",     drives: ["4x2", "4x4"] },
  { id: "chev_ava",   make: "Chevrolet", name: "Avalanche",                                cls: "Pickup",  drives: ["4x2", "4x4"] },
  { id: "chev_s10",   make: "Chevrolet", name: "S-10 Pickup",                              cls: "Midsize", drives: ["4x2", "4x4"] },
  { id: "chev_colo",  make: "Chevrolet", name: "Colorado",                                 cls: "Midsize", drives: ["4x2", "4x4"] },
  { id: "chev_sev",   make: "Chevrolet", name: "Silverado EV",                             cls: "EV",      drives: ["eAWD", "RWD"] },

  { id: "gmc_lt",     make: "GMC", name: "Sierra 1500 / C/K 1500",                         cls: "Pickup",  drives: ["4x2", "4x4"] },
  { id: "gmc_hd",     make: "GMC", name: "Sierra 2500HD/3500HD / C/K 2500/3500",             cls: "HD Pickup", drives: ["4x2", "4x4"] },
  { id: "gmc_yukon",  make: "GMC", name: "Yukon / Jimmy (full-size)",                      cls: "SUV",     drives: ["4x2", "4x4"] },
  { id: "gmc_xl",     make: "GMC", name: "Yukon XL / Suburban",                            cls: "SUV",     drives: ["4x2", "4x4"] },
  { id: "gmc_sonoma", make: "GMC", name: "Sonoma / S-15 Pickup",                           cls: "Midsize", drives: ["4x2", "4x4"] },
  { id: "gmc_canyon", make: "GMC", name: "Canyon",                                         cls: "Midsize", drives: ["4x2", "4x4"] },
  { id: "gmc_sev",    make: "GMC", name: "Sierra EV",                                      cls: "EV",      drives: ["eAWD"] },
  { id: "gmc_hummer", make: "GMC", name: "HUMMER EV (Pickup / SUV)",                       cls: "EV",      drives: ["eAWD"] },

  { id: "cad_esc",    make: "Cadillac", name: "Escalade / Escalade ESV",                   cls: "SUV",     drives: ["RWD", "AWD/4WD"] },
  { id: "cad_ext",    make: "Cadillac", name: "Escalade EXT",                              cls: "Pickup",  drives: ["AWD/4WD"] },
  { id: "cad_iq",     make: "Cadillac", name: "Escalade IQ / IQL",                         cls: "EV",      drives: ["eAWD"] }
];

/* Model groups used by generation/engine records */
const G = {
  LT: ["chev_lt", "gmc_lt"],
  HD: ["chev_hd", "gmc_hd"],
  TAHOE: ["chev_tahoe", "gmc_yukon"],
  SUB: ["chev_sub", "gmc_xl"],
  ESC: ["cad_esc"], EXT: ["cad_ext"], AVA: ["chev_ava"],
  S10: ["chev_s10", "gmc_sonoma"],
  COLO: ["chev_colo", "gmc_canyon"]
};
G.FS = [...G.TAHOE, ...G.SUB];                      // full-size SUVs (Chevy/GMC)
G.FS_ALL = [...G.FS, ...G.ESC];                     // + Escalade
G.UTE = [...G.AVA, ...G.EXT];                       // Avalanche + Escalade EXT
G.LT_ALL = [...G.LT, ...G.FS_ALL, ...G.UTE];        // everything on the 1/2-ton full-size chassis

const GENERATIONS = [];   // filled by the data-*.js files
const ENGINES = [];

/* Shared wording */
const AC_VIN = "ACDelco - confirm P/N by VIN";
const TQ_CONFIRM = "Confirm torque in service info (new gasket/washer each change)";
const R87 = "Regular unleaded 87 AKI";
const R87FFV = "Regular unleaded 87 AKI · E85 OK on Flex-Fuel builds (yellow fuel cap / FlexFuel badge)";
const P91 = "Premium unleaded 91+ AKI recommended (87 acceptable - reduced performance)";
const ULSD = "Ultra-Low Sulfur Diesel (ULSD) only - up to B20 biodiesel";
const ULSD_DEF = ULSD + " · DEF: API-certified, ISO 22241";
const GREEN = "Green ethylene glycol (conventional), 50/50";
const DEXCOOL = "GM DEX-COOL (orange), 50/50 - do not mix with green";
const DEXCOOL_NOTE = "DEX-COOL: every 5 yr / 150,000 mi (whichever first). Keep the cap and reservoir sealed - low coolant + air causes DEX-COOL sludge.";
const DOT3 = "DOT 3 (GM spec) - from a sealed container";
const LS_PLUG = "ACDelco 41-110 iridium (GM 12621258) - confirm by VIN";
const OLS = "Change at Oil Life System 0-15% message, or at least once a year";

/* ---------------------------------------------------------------------
   TRANSMISSIONS
   svcMi = DIY drain-and-fill interval used by the schedule (normal duty).
   --------------------------------------------------------------------- */
const TRANSMISSIONS = [
  // ---- manuals ----
  { id: "sm465", name: "SM465 4-Speed Manual", type: "Manual", years: [1990, 1991],
    fluid: "SAE 80W-90 GL-5 gear oil (some builds: SAE 30 motor oil - check fill plug tag)", capacity: "≈ 8.4 pt (4.0 L)",
    drain: "Drain / fill plugs: ≈ 17-25 lb-ft", pan: "No pan - fill to bottom of fill-plug hole", svcMi: 60000, verify: ["fluid", "capacity", "drain"] },
  { id: "nv3500", name: "NV3500 5-Speed Manual", type: "Manual", years: [1990, 2005],
    fluid: "GM Synchromesh Transmission Fluid (or equivalent MTF)", capacity: "≈ 4.4 pt (2.1 L)",
    drain: "Drain / fill plugs: ≈ 18 lb-ft (24 N·m)", pan: "No pan - fill to bottom of fill-plug hole", svcMi: 60000, verify: ["capacity", "drain"] },
  { id: "nv4500", name: "NV4500 5-Speed Manual (HD)", type: "Manual", years: [1992, 2004],
    fluid: "GM Synchromesh Transmission Fluid / GL-4 75W-85 synthetic (per tag)", capacity: "≈ 8.0 pt (3.8 L)",
    drain: "Drain / fill plugs: ≈ 30 lb-ft (40 N·m)", pan: "No pan - fill to bottom of fill-plug hole", svcMi: 60000, verify: ["fluid", "capacity", "drain"] },
  { id: "zf6", name: "ZF S6-650 6-Speed Manual (HD)", type: "Manual", years: [2001, 2006],
    fluid: "DEXRON VI ATF (originally DEXRON III)", capacity: "≈ 9.0 pt (4.3 L)",
    drain: "Drain / fill plugs: ≈ 37 lb-ft (50 N·m)", pan: "No pan - fill to bottom of fill-plug hole", svcMi: 60000, verify: ["capacity", "drain"] },
  { id: "s10man", name: "5-Speed Manual (NV1500 / NV3500 / Borg-Warner T5)", type: "Manual", years: [1990, 2004],
    fluid: "GM Synchromesh Transmission Fluid", capacity: "≈ 2.6-4.4 pt by unit",
    drain: "Drain / fill plugs: ≈ 15-18 lb-ft", pan: "No pan - fill to bottom of fill-plug hole", svcMi: 60000, verify: ["capacity", "drain"] },
  { id: "ar5", name: "Aisin AR5 5-Speed Manual", type: "Manual", years: [2004, 2012],
    fluid: "GM Manual Transmission Fluid (DEXRON VI ATF on some builds - check tag)", capacity: "≈ 3.0 pt (1.4 L)",
    drain: "Drain / fill plugs: ≈ 26 lb-ft (35 N·m)", pan: "No pan - fill to bottom of fill-plug hole", svcMi: 60000, verify: ["fluid", "capacity", "drain"] },
  { id: "6man", name: "6-Speed Manual (Aisin AY6)", type: "Manual", years: [2015, 2018],
    fluid: "GM Manual Transmission Fluid", capacity: "≈ 3.3 pt (1.6 L)",
    drain: "Drain / fill plugs - confirm torque in service info", pan: "No pan - fill to bottom of fill-plug hole", svcMi: 60000, verify: ["capacity", "drain"] },

  // ---- 3/4-speed automatics ----
  { id: "th400", name: "TH400 / 3L80 3-Speed Automatic", type: "Automatic", years: [1990, 1991],
    fluid: "DEXRON VI (replaces DEXRON II/III)", capacity: "Pan drop refill: ≈ 4.5-5 qt · Total ≈ 11 qt",
    drain: "No drain plug - pan drop, replace filter", pan: "Pan bolts: ≈ 12 lb-ft (16 N·m)", svcMi: 50000, verify: ["capacity", "pan"] },
  { id: "th700", name: "TH700-R4 / 4L60 4-Speed Automatic", type: "Automatic", years: [1990, 1993],
    fluid: "DEXRON VI (replaces DEXRON II/III)", capacity: "Pan drop refill: ≈ 5 qt · Total ≈ 11 qt",
    drain: "No drain plug - pan drop, replace filter", pan: "Pan bolts: ≈ 8 lb-ft (11 N·m)", svcMi: 50000, verify: ["capacity"] },
  { id: "4l60e", name: "4L60-E / 4L65-E / 4L70-E 4-Speed Automatic", type: "Automatic", years: [1993, 2013],
    fluid: "DEXRON VI (replaces DEXRON III)", capacity: "Pan drop refill: ≈ 5 qt · Total ≈ 11-12 qt (dry)",
    drain: "No drain plug - pan drop, replace filter (pry out old filter seal)", pan: "Pan bolts: ≈ 8 lb-ft (11 N·m) - do not overtighten", svcMi: 50000,
    verify: ["capacity"] },
  { id: "4l80e", name: "4L80-E / 4L85-E 4-Speed Automatic (HD)", type: "Automatic", years: [1991, 2009],
    fluid: "DEXRON VI (replaces DEXRON III)", capacity: "Pan drop refill: ≈ 7.5 qt · Total ≈ 13-14 qt (dry)",
    drain: "Some pans have a drain plug - otherwise pan drop", pan: "Pan bolts: ≈ 18 lb-ft (24 N·m)", svcMi: 50000, verify: ["capacity", "pan"] },
  { id: "allison5", name: "Allison 1000 5-Speed Automatic", type: "Automatic", years: [2001, 2005],
    fluid: "TranSynd / TES-295 synthetic (DEXRON VI acceptable)", capacity: "Drain & filter: ≈ 7 qt · Total ≈ 12.7 qt (dry)",
    drain: "Drain plug: ≈ 18 lb-ft (25 N·m)", pan: "Spin-on/cartridge internal filter - change with fluid. Check level hot, engine idling, in Park", svcMi: 50000,
    verify: ["capacity", "drain"] },
  { id: "allison6", name: "Allison 1000 6-Speed Automatic", type: "Automatic", years: [2006, 2019],
    fluid: "DEXRON VI (TranSynd / TES-295 also approved)", capacity: "Drain & filter: ≈ 7 qt · Total ≈ 12.7 qt (dry)",
    drain: "Drain plug: ≈ 18 lb-ft (25 N·m)", pan: "Internal filter - change with fluid. Check level hot, engine idling, in Park", svcMi: 50000,
    verify: ["capacity", "drain"] },

  // ---- 6/8/10-speed automatics ----
  { id: "6l50", name: "6L50 6-Speed Automatic", type: "Automatic", years: [2015, 2022],
    fluid: "DEXRON VI", capacity: "Drain & fill: ≈ 5 qt · Total ≈ 8.9 qt (dry)",
    drain: "Drain plug: ≈ 12 lb-ft (17 N·m) - confirm", pan: "Level check: fluid at ~95-110 °F, engine running, via check plug", svcMi: 45000, verify: ["capacity", "drain"] },
  { id: "6l80", name: "6L80 6-Speed Automatic", type: "Automatic", years: [2007, 2021],
    fluid: "DEXRON VI", capacity: "Drain & fill: ≈ 5-6 qt · Total ≈ 12 qt (dry)",
    drain: "Drain plug: ≈ 13 lb-ft (18 N·m) - confirm", pan: "Pan bolts: ≈ 8 lb-ft (11 N·m) · Level check via check plug at ~95-110 °F, engine running", svcMi: 45000,
    verify: ["capacity", "drain"] },
  { id: "6l90", name: "6L90 6-Speed Automatic (HD)", type: "Automatic", years: [2008, 2023],
    fluid: "DEXRON VI", capacity: "Drain & fill: ≈ 5-6 qt · Total ≈ 13 qt (dry)",
    drain: "Drain plug: ≈ 13 lb-ft (18 N·m) - confirm", pan: "Level check via check plug at ~95-110 °F, engine running", svcMi: 45000,
    verify: ["capacity", "drain"] },
  { id: "8l90", name: "8L90 / 8L80 8-Speed Automatic", type: "Automatic", years: [2015, 2099],
    fluid: "DEXRON HP (Mobil 1 LV ATF HP) - NOT DEXRON VI", capacity: "Drain & fill: ≈ 5-6 qt · Total ≈ 9.5-10 qt (dry)",
    drain: "Drain plug - confirm torque in service info", pan: "Level check via check plug at ~95-110 °F, engine running", svcMi: 45000,
    notes: ["Shudder at 25-80 mph on 2015-2019 8-speeds: GM bulletins call for a full flush to DEXRON HP (Mobil 1 LV ATF HP). Original fluid absorbs moisture."],
    verify: ["capacity", "drain"] },
  { id: "8l45", name: "8L45 8-Speed Automatic", type: "Automatic", years: [2017, 2022],
    fluid: "DEXRON HP (Mobil 1 LV ATF HP)", capacity: "Drain & fill: ≈ 4-5 qt · Total ≈ 8.4 qt (dry)",
    drain: "Drain plug - confirm torque in service info", pan: "Level check via check plug at ~95-110 °F, engine running", svcMi: 45000,
    verify: ["capacity", "drain"] },
  { id: "10l80", name: "10L80 10-Speed Automatic", type: "Automatic", years: [2018, 2099],
    fluid: "DEXRON ULV - NOT compatible with DEXRON VI / HP", capacity: "Drain & fill: ≈ 4-5 qt · Total ≈ 11-12 qt (dry)",
    drain: "Drain plug - confirm torque in service info", pan: "Level check via check plug at ~95-110 °F, engine running (shop procedure)", svcMi: 45000,
    verify: ["capacity", "drain"] },
  { id: "10l1000", name: "Allison 10L1000 10-Speed Automatic (HD)", type: "Automatic", years: [2020, 2099],
    fluid: "DEXRON ULV", capacity: "Drain & fill: ≈ 6-7 qt · Total ≈ 13+ qt (dry)",
    drain: "Drain plug - confirm torque in service info", pan: "Level check via check plug, hot, engine running (shop procedure)", svcMi: 45000,
    verify: ["capacity", "drain"] },

  // ---- EV ----
  { id: "edu", name: "Ultium Drive Units (single-speed, front / rear)", type: "EV", years: [2022, 2099],
    fluid: "GM-specified drive-unit fluid - dealer service", capacity: "N/A for DIY", drain: "N/A", pan: "N/A", svcMi: null, verify: [] }
];

/* ---------------------------------------------------------------------
   DIY MAINTENANCE SCHEDULE
   ctx = { year, gen, eng, trans, drive }.  `when(ctx)` false hides a row.
   Intervals follow typical GM "normal" owner schedules; DIY-friendly
   values are used where GM relies on the Oil Life System only.
   --------------------------------------------------------------------- */
const is4wd = (d) => !["4x2", "RWD"].includes(d);

const SCHEDULE = [
  { type: "Oil & Filter Change", mi: (c) => c.eng.intervalMi, mo: (c) => c.eng.intervalMo,
    severe: (c) => (c.year >= 1999
      ? "Follow the Oil Life System, but use 3,000-5,000 mi when towing, idling, on dusty roads or making short trips. Reset Oil Life after every change."
      : "Every 3,000 mi or 3 months when towing, idling a lot, on dusty roads, or making short trips"),
    when: (c) => !c.eng.isEV },
  { type: "Tire Rotation", mi: () => 7500, mo: () => null, severe: "Every 5,000 mi (DRW: inner/outer per Owner's Manual)", when: () => true },
  { type: "Engine Air Filter", mi: (c) => (c.year >= 2007 ? 45000 : 30000), mo: () => null,
    severe: "Inspect at every oil change and replace sooner in dust / off-road use",
    part: (c) => c.eng.airFilter || c.gen.airFilter, when: (c) => !c.eng.isEV },
  { type: "Cabin Air Filter", mi: () => 22500, mo: () => 24, severe: "Every 15,000 mi in dusty or high-pollen areas",
    part: (c) => c.gen.cabinFilter, when: (c) => !/^Not equipped/.test(c.gen.cabinFilter || "") },
  { type: "Fuel Filter", mi: (c) => c.eng.fuelFilterMi ?? c.gen.fuelFilterMi, mo: () => null,
    part: (c) => c.eng.fuelFilter || c.gen.fuelFilter,
    severe: (c) => (c.eng.isDiesel ? "Replace when the DIC says so; drain the water separator at the 'Water in Fuel' warning" : ""),
    when: (c) => !!(c.eng.fuelFilterMi ?? c.gen.fuelFilterMi) },
  { type: "Spark Plugs", mi: (c) => c.eng.plugMi, mo: () => null, part: (c) => c.eng.plug, when: (c) => !!c.eng.plugMi },
  { type: "Brake Fluid", mi: () => null, mo: (c) => c.gen.brakeMo || 36, part: (c) => c.gen.brakeFluid, when: () => true },
  { type: "Coolant Flush", mi: (c) => c.gen.coolantMi, mo: (c) => c.gen.coolantMo, part: (c) => c.gen.coolant,
    severe: (c) => c.gen.coolantNote, when: (c) => !c.eng.isEV },
  { type: "Transmission Fluid", mi: (c) => c.trans.svcMi, mo: () => null, part: (c) => c.trans.fluid,
    severe: "Towing / plowing / hot climate: every 45,000 mi or sooner. Never flush an old high-mileage unit with unknown history - drain and fill instead.",
    when: (c) => c.trans.type !== "EV" && !!c.trans.svcMi },
  { type: "Rear Differential Fluid", mi: (c) => c.gen.diffMi || 100000, mo: () => null, part: (c) => c.gen.rearAxle,
    severe: "Towing, off-road, or after the axle has been under water: every 30,000-45,000 mi",
    when: (c) => !c.eng.isEV },
  { type: "Front Differential Fluid", mi: (c) => c.gen.diffMi || 100000, mo: () => null, part: (c) => c.gen.frontDiff,
    severe: "Off-road or after water crossings: every 30,000-45,000 mi",
    when: (c) => is4wd(c.drive) && !c.eng.isEV && !!c.gen.frontDiff },
  { type: "Transfer Case Fluid", mi: (c) => c.gen.tcaseMi || 50000, mo: () => null, part: (c) => c.gen.transferCase,
    severe: "Severe / off-road / heavy towing: every 30,000 mi",
    when: (c) => is4wd(c.drive) && !c.eng.isEV && !!c.gen.transferCase },
  { type: "Drive Belt", mi: () => 150000, mo: () => null, severe: "Inspect at every oil change after 60,000 mi (cracks, glazing, chirp)",
    when: (c) => !c.eng.isEV },
  { type: "EV Coolant / Battery Thermal Check", mi: () => null, mo: () => 12, severe: "Inspect level only - HV coolant service is a dealer item",
    when: (c) => !!c.eng.isEV },
  { type: "Wiper Blades", mi: () => null, mo: () => 12, when: () => true },
  { type: "Battery Test", mi: () => null, mo: () => 12, severe: "Load-test yearly once the battery is 3+ years old (diesels: test both batteries)",
    when: () => true }
];

const SERVICE_TYPES = [
  "Oil & Filter Change", "Tire Rotation", "Engine Air Filter", "Cabin Air Filter",
  "Fuel Filter", "Spark Plugs", "Transmission Fluid", "Rear Differential Fluid",
  "Front Differential Fluid", "Transfer Case Fluid", "Coolant Flush", "Brake Fluid",
  "Brake Pads / Rotors", "Drive Belt", "DEF Fill", "EV Coolant / Battery Thermal Check",
  "Battery Test", "Battery Replacement", "Wiper Blades", "Other"
];
const SERVICE_ALIASES = { "Battery": "Battery Replacement" };
