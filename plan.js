// Studieplanen: hvilke moduler der hører til hvilke dage frem til aflevering (30/10-2026 kl. 12) og eksamen (6/11-2026).
// Et forslag — ret datoer og moduler her, hvis planen skal lægges om. Forsiden og siden "Plan" læser denne liste.
// valgfri: true = tæller ikke som "bagud", hvis den ikke bliver færdig. lektioner: [...] = kun de lektioner fra modulerne.
// Lagt om 27/10: projektet (SkadeApp, modul 30) bygges færdigt før afleveringen; grundforløbet fortsætter efter eksamen.
window.STUDIEPLAN = [
  { fra: "2026-10-13", til: "2026-10-26", titel: "Grundforløbet: modul 0–3", moduler: ["m00", "m01", "m02", "m03"], valgfri: true,
    tekst: "Det, du har nået før projektet. Resten af grundforløbet (modul 4 og frem) venter til efter eksamen: det, projektet bruger fra dem, bliver forklaret i modul 30." },
  { fra: "2026-10-27", til: "2026-10-27", titel: "Projektet, dag 1: opret projektet og modellerne", moduler: ["m30"], lektioner: ["m30l1", "m30l2", "m30l3"],
    tekst: "Modul 30, lektion 1–3: hvad du bygger, projektet oprettes, og klasserne `Kunde` og `Skade` med deres relation. Skriv koden selv i {{Visual Studio||Rider}}, og byg efter hver lektion." },
  { fra: "2026-10-28", til: "2026-10-28", titel: "Projektet, dag 2: LINQ, regler, database og services", moduler: ["m30"], lektioner: ["m30l4", "m30l5", "m30l6", "m30l7"],
    tekst: "Modul 30, lektion 4–7. Når lektion 7 er færdig, kører appen med en rigtig database bag sig. Det er den tungeste dag: hold en pause mellem hver lektion." },
  { fra: "2026-10-29", til: "2026-10-29", titel: "Projektet, dag 3: siderne, test og aflevering", moduler: ["m30"], lektioner: ["m30l8", "m30l9", "m30l10", "m30l11"],
    tekst: "Modul 30, lektion 8–11: de fire sider og en test af hele appen. Lav zip-filen og dispositionen, og **upload begge på WISEflow i dag**. Værkstedets opgaver er ekstra: tag dem, hvis der er tid." },
  { fra: "2026-10-30", til: "2026-10-30", titel: "Aflevering senest kl. 12:00", moduler: [],
    tekst: "Fristen er **fredag 30/10 kl. 12:00** på WISEflow: dispositionen som pdf og projektet som zip-fil. Er alt uploadet i går, er dagen fri for projekt." },
  { fra: "2026-10-31", til: "2026-11-05", titel: "Træn til den mundtlige eksamen", moduler: ["m28"],
    tekst: "Hver dag: Repetition, og alle \"Forklar med egne ord\"-trin i modul 30. Modul 28 viser, hvordan eksamen foregår, og træner svarene på de typiske spørgsmål. Hold din præsentation på tid (ca. 10 minutter) med stikord, ikke en tekst, du skal huske ordret. Vis din app og peg i din egen kode, mens du forklarer." },
  { fra: "2026-11-06", til: "2026-11-06", titel: "Mundtlig eksamen", moduler: [],
    tekst: "Kun en kort Repetition om morgenen. Du kender dit projekt bedre end nogen anden i lokalet." },
  { fra: "2026-11-07", til: "2026-12-31", titel: "Efter eksamen: resten af kurset", valgfri: true,
    moduler: ["m04", "m05", "m06", "m07", "m08", "m09", "m10", "m11", "m12", "m13", "m14", "m15", "m16", "m17", "m18", "m19", "m20", "m21", "m22", "m23", "m24", "m25", "m26", "m27", "m29"],
    tekst: "Nu er der tid til at lære det hele ordentligt, i dit eget tempo. Fortsæt med modul 4, hvor du slap. Meget af det kender du allerede fra dit projekt, så det bliver lettere, end det ville have været før." }
];
