/* =====================================================================
   BATTERY-ELECTRIC - Ultium platform (BT1)
   Chevrolet Silverado EV · GMC Sierra EV · GMC HUMMER EV Pickup / SUV
   Cadillac Escalade IQ / IQL
   No oil, plugs or transmission service. DIY items: tires, cabin filter,
   brake fluid, wipers, 12 V battery, washer fluid, coolant level check.
   Independent reference data - NOT official GM data. See data-core.js.
   ===================================================================== */

const EV_BASE = {
  washer: "≈ 4.5 qt (4.3 L)",
  coolant: "Battery / power-electronics coolant: GM-specified DEX-COOL-type - level check only, dealer service",
  coolantMi: null, coolantMo: null, coolantNote: "",
  rearAxle: "N/A - integrated drive unit", rearAxleCap: "N/A", frontDiff: null, frontDiffCap: null, transferCase: null,
  airFilter: "N/A - no engine", fuelFilter: "N/A", fuelFilterMi: null,
  cabinFilter: "Equipped - " + AC_VIN,
  brakeFluid: "DOT 3 / DOT 4 per reservoir cap (GM spec)", brakeMo: 60,
  lugThread: "M14 x 1.5"
};

GENERATIONS.push(
  { ...EV_BASE, id: "ev_sev", models: ["chev_sev"], code: "Silverado EV (BT1)", platform: "Ultium BT1 pickup", years: [2024, 2099],
    lugTorque: "140 lb-ft (190 N·m) - confirm", lugPattern: "6 x 139.7 mm", fuelTank: "N/A - battery electric",
    notes: ["Work Truck (WT) 2024 is eAWD. Some 2025+ WT trims offer RWD.",
      "Regenerative braking means pads last a long time, but slide pins and rotors still rust. Clean and lube the caliper slides every 2 years in salt states."],
    verify: ["lugTorque", "washer", "cabinFilter"] },
  { ...EV_BASE, id: "ev_sierra", models: ["gmc_sev"], code: "Sierra EV (BT1)", platform: "Ultium BT1 pickup", years: [2025, 2099],
    lugTorque: "140 lb-ft (190 N·m) - confirm", lugPattern: "6 x 139.7 mm", fuelTank: "N/A - battery electric",
    notes: ["Denali Edition 1 / AT4 / Elevation - air suspension on some trims: use jack mode before lifting."],
    verify: ["lugTorque", "washer", "cabinFilter"] },
  { ...EV_BASE, id: "ev_hummer", models: ["gmc_hummer"], code: "HUMMER EV (BT1)", platform: "Ultium BT1 - Pickup (2022+) / SUV (2024+)", years: [2022, 2099],
    lugTorque: "≈ 140 lb-ft (190 N·m) - confirm", lugPattern: "6 x 139.7 mm", fuelTank: "N/A - battery electric",
    notes: ["35 in tires (Extract Mode / Adaptive Air Suspension). Use the service mode before lifting.", "Very heavy vehicle (≈ 9,000 lb) - use jack stands rated for it."],
    verify: ["lugTorque", "lugPattern", "washer", "cabinFilter"] },
  { ...EV_BASE, id: "ev_esciq", models: ["cad_iq"], code: "Escalade IQ (BT1)", platform: "Ultium BT1 SUV - IQ / IQL", years: [2025, 2099],
    lugTorque: "≈ 140 lb-ft (190 N·m) - confirm", lugPattern: "6 x 139.7 mm - confirm", fuelTank: "N/A - battery electric",
    notes: ["Air Ride Adaptive Suspension and rear-wheel steer - use service/jack mode before lifting."],
    verify: ["lugTorque", "lugPattern", "washer", "cabinFilter"] }
);

const EV_ENG = {
  family: "Ultium Battery Electric", isEV: true,
  oilCap: "N/A - no engine oil", oilVisc: "N/A", oilSpec: "N/A", filter: "N/A (cabin air filter only)", drainTorque: "N/A",
  trans: ["edu"], intervalMi: 7500, intervalMo: 12,
  plug: "N/A", gap: "N/A", plugMi: null, airFilter: "N/A - no engine", fuelFilter: "N/A", fuelFilterMi: null,
  notes: ["Tracker defaults to tire rotation every 7,500 mi.", "Orange cables are high voltage - do not touch or service HV components.", "The 12 V battery is a DIY item. Disconnect it only per the Owner's Manual procedure."]
};

ENGINES.push(
  { ...EV_ENG, id: "ev_sev_m", models: ["chev_sev"], name: "Ultium Dual-Motor eAWD / Single-Motor RWD", years: [2024, 2099],
    fuel: "Electricity - Standard Range ≈ 160-170 kWh / Max Range ≈ 200+ kWh usable (by trim)", fuelTank: "N/A - battery electric", verify: ["fuel"] },
  { ...EV_ENG, id: "ev_sierra_m", models: ["gmc_sev"], name: "Ultium Dual-Motor eAWD", years: [2025, 2099], drives: ["eAWD"],
    fuel: "Electricity - Standard / Extended / Max Range packs (≈ 160-205+ kWh usable, by trim)", fuelTank: "N/A - battery electric", verify: ["fuel"] },
  { ...EV_ENG, id: "ev_hummer_m", models: ["gmc_hummer"], name: "Ultium 2-Motor / 3-Motor eAWD (e4WD)", years: [2022, 2099], drives: ["eAWD"],
    fuel: "Electricity - ≈ 170-212 kWh usable (by edition / pack)", fuelTank: "N/A - battery electric", verify: ["fuel"] },
  { ...EV_ENG, id: "ev_esciq_m", models: ["cad_iq"], name: "Ultium Dual-Motor eAWD", years: [2025, 2099], drives: ["eAWD"],
    fuel: "Electricity - ≈ 200 kWh usable", fuelTank: "N/A - battery electric", verify: ["fuel"] }
);
