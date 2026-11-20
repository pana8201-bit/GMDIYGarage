# DIY Garage - GM Truck & SUV Parts & Spec Reference

An independent quick-reference app for doing your own work on **1990-present Chevrolet, GMC and Cadillac trucks and SUVs**. You choose the make, model, year, engine, transmission and driveline, and it shows:

- **Engine oil:** capacity, viscosity, dexos / GM spec, ACDelco filter P/N, drain plug torque
- **Transmission:** fluid type (DEXRON VI / HP / ULV), capacity, drain plug and level-check procedure
- **Fuel and ignition:** fuel type (gas / FlexFuel / diesel + DEF / electric), tank capacity, spark plug P/N, gap and interval
- **Filters:** engine air, cabin air and fuel filter / water separator
- **Differentials:** front and rear fluid type and capacity, transfer case fluid (AUTO-TRAK II vs. DEXRON)
- **Chassis:** lug nut torque, bolt pattern, stud thread, washer fluid, coolant (green / DEX-COOL), brake fluid
- **DIY maintenance schedule:** intervals for each owner-serviceable item, with severe-duty notes
- **Tech notes:** known issues (AFM/DFM lifters, LB7 injectors, 6.5L PMD, CP4 pump, 8-speed shudder, ...)

## Coverage
| Make | Models |
|---|---|
| Chevrolet | C/K 1500 & Silverado 1500 · C/K 2500/3500 & Silverado HD · full-size Blazer (K5) & Tahoe · Suburban · Avalanche · S-10 · Colorado · Silverado EV |
| GMC | Sierra 1500 · Sierra HD · full-size Jimmy & Yukon · Suburban & Yukon XL · S-15 Sonoma / Sonoma · Canyon · Sierra EV · HUMMER EV |
| Cadillac | Escalade / ESV (incl. Escalade-V) · Escalade EXT · Escalade IQ / IQL |

Engines range from the TBI 4.3/5.0/5.7/7.4 and Vortec small and big blocks, through the LS / Vortec 4.8/5.3/6.0/6.2 and 8.1L, to the EcoTec3 4.3/5.3/6.2, L8T 6.6, 2.7L Turbo, LT4 and Atlas I4/I5. Diesels covered are the 6.2L, 6.5L TD, Duramax LB7 / LLY / LBZ / LMM / LML / L5P, 2.8L LWN and 3.0L LM2/LZ0. EVs use the Ultium drive units.

Colorado / Canyon have no 2013-2014 model years in the US, and the Escalade has no 2001 model year. Those gaps are intentional.

## Trackers
- **Service log:** counts down to the next oil change (or the next tire rotation on EVs), shows schedule status for every item, sends reminder notifications and creates calendar (`.ics`) alerts
- **Expense tracker:** logs mods, maintenance, repairs, parts, tools, tires, accessories, fuel/charging and more. It shows totals by period, a category breakdown, mods vs. maintenance spend and lifetime cost per mile, with CSV export. Costs entered on service records are included automatically.
- **Backup:** JSON export/import of the vehicle, service history and expenses

It is a static Progressive Web App (plain HTML/CSS/JS, no build step, works offline). All user data stays on the device in `localStorage` under the key `gmdiy.v1`.

**Live app:** https://pana8201-bit.github.io/GMDIYGarage/

## Install on your phone
Open the live link, then:
- **iPhone (Safari):** Share → *Add to Home Screen*
- **Android (Chrome):** ⋮ menu → *Install app* / *Add to Home screen*

## Run locally
```
python -m http.server 8160
```
Then open http://localhost:8160

## Files
| File | Purpose |
|---|---|
| `index.html` | Layout / tabs |
| `styles.css` | Theme |
| `data-core.js` | Models, transmissions, maintenance schedule, shared wording, `DATA_VERSION` |
| `data-lt.js` | 1500 pickups + shared engine templates |
| `data-hd.js` | 2500 / 3500 HD pickups |
| `data-suv.js` | Blazer/Jimmy (full-size), Tahoe, Yukon, Suburban, Yukon XL, Escalade, Avalanche, Escalade EXT |
| `data-mid.js` | S-10, Sonoma, Colorado, Canyon |
| `data-ev.js` | Silverado EV, Sierra EV, HUMMER EV, Escalade IQ |
| `data-finalize.js` | Cleans up data and sets the model name for each era (C/K → Silverado, Blazer → Tahoe, ...) |
| `app.js` | Selector, spec sheet, service tracker, expenses, reminders |
| `sw.js` | Offline cache (network-first, `gmdiy-` prefix only). **Bump `CACHE` on each release.** |
| `manifest.webmanifest`, `icon.svg` | PWA install metadata |

## Data accuracy
These values were compiled as reference data from my own general knowledge. They have **not** been checked against official GM service information. Fields that vary by build date, RPO code, axle or calibration appear with a **VERIFY** tag. Part numbers we're not confident about read "confirm P/N by VIN" instead of being guessed.

HD trucks and SUVs vary a lot by SRW/DRW, axle and GVWR. Before final torque, check the RPO label (glovebox or console lid), the axle tag and the Owner's Manual, and confirm with a VIN lookup at a parts retailer or a dealer. To correct a value, edit the relevant `data-*.js` file, then bump `DATA_VERSION` in `data-core.js` and `CACHE` in `sw.js`.

## Disclaimer
This is an independent project. It is **not affiliated with, endorsed by, or sponsored by General Motors.** It is not an official GM, Chevrolet, GMC, Cadillac or ACDelco parts catalog. GM, Chevrolet, GMC, Cadillac, ACDelco, Silverado, Sierra, Tahoe, Suburban, Yukon, Escalade, Avalanche, Colorado, Canyon, S-10, Sonoma, Blazer, Jimmy, Denali, Duramax, Vortec, EcoTec3, Hydra-Matic, dexos, DEX-COOL and HUMMER are trademarks of their respective owners. Allison is a trademark of Allison Transmission. These names appear here only to identify compatible vehicles and parts. The software is provided "as is" with no warranty, and you perform all work at your own risk.
