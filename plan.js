// Studieplanen: hvilke moduler der hører til hvilke dage frem til aflevering (30/10-2026 kl. 12) og eksamen (6/11-2026).
// Et forslag — ret datoer og moduler her, hvis planen skal lægges om. Forsiden og siden "Plan" læser denne liste.
// valgfri: true = tæller ikke som "bagud", hvis den ikke bliver færdig. lektioner: [...] = kun de lektioner fra modulerne.
// Lagt om 27/10: projektet (SkadeApp, modul 30) bygges færdigt før afleveringen; grundforløbet fortsætter efter eksamen.
// Lagt om 31/10: projektet er afleveret. Ugen før eksamen bruges på modul 31 (forklar din egen SkadeApp). Projektdagene er nu valgfri.
window.STUDIEPLAN = [
  { fra: "2026-10-13", til: "2026-10-26", titel: "Grundforløbet: modul 0–3", moduler: ["m00", "m01", "m02", "m03"], valgfri: true,
    tekst: "Det, du har nået før projektet. Resten af grundforløbet (modul 4 og frem) venter til efter eksamen: det, projektet bruger fra dem, bliver forklaret i modul 30." },
  { fra: "2026-10-27", til: "2026-10-27", titel: "Projektet, dag 1: opret projektet og modellerne", moduler: ["m30"], lektioner: ["m30l0", "m30l1", "m30lc", "m30l2", "m30l3"], valgfri: true,
    tekst: "Modul 30, lektion 0–3: de store ord (Blazor, ASP.NET Core, API …), projektet oprettes, C# fra bunden (lektion 1b), og klasserne `Kunde` og `Skade` med deres relation. Skriv koden selv i {{Visual Studio||Rider}}, og byg efter hver lektion." },
  { fra: "2026-10-28", til: "2026-10-28", titel: "Projektet, dag 2: LINQ, regler, database, services og HTML", moduler: ["m30"], lektioner: ["m30l4", "m30l5", "m30l6", "m30l7", "m30lh"], valgfri: true,
    tekst: "Modul 30, lektion 4–8. Når lektion 7 er færdig, kører appen med en rigtig database bag sig. Lektion 8 er HTML, som siderne i morgen er lavet af. Hold en pause mellem hver lektion." },
  { fra: "2026-10-29", til: "2026-10-29", titel: "Projektet, dag 3: siderne, login og aflevering", moduler: ["m30"], lektioner: ["m30l8", "m30l9", "m30l10", "m30l11", "m30l12"], valgfri: true,
    tekst: "Modul 30, lektion 9–13: de fire sider, en test af hele appen og login. Lav zip-filen og dispositionen, og **upload begge på WISEflow i dag**. Lektion 14 (egne farver og SVG-diagram) og værkstedet er ekstra: tag dem, hvis der er tid." },
  { fra: "2026-10-30", til: "2026-10-30", titel: "Aflevering senest kl. 12:00", moduler: [],
    tekst: "Fristen er **fredag 30/10 kl. 12:00** på WISEflow: dispositionen som pdf og projektet som zip-fil. Er alt uploadet i går, er dagen fri for projekt." },
  { fra: "2026-10-31", til: "2026-10-31", titel: "Hviledag (eller lektion 0, hvis du har lyst)", moduler: ["m31"], lektioner: ["m31l0"], valgfri: true,
    tekst: "Projektet er afleveret. I dag må du gerne holde fri. Har du lyst, så tag lektion 0 i modul 31: den forklarer, hvordan ugen er bygget op, og hvorfor." },
  { fra: "2026-11-01", til: "2026-11-01", titel: "Søndag: rundvisning, modellerne og databasen", moduler: ["m31"], lektioner: ["m31l0", "m31l1", "m31l2", "m31l3"],
    tekst: "Modul 31, lektion 0–3. Hav din egen app åben ved siden af, og find hver kodelinje i dine filer, mens du læser. Svar højt, før du trykker. 25 minutter ad gangen og så en pause." },
  { fra: "2026-11-02", til: "2026-11-02", titel: "Mandag: services, Program.cs og læringsmålene", moduler: ["m31"], lektioner: ["m31l4", "m31l5", "m31l11"],
    tekst: "Start med **Repetition**: det er gårsdagens spørgsmål, der kommer igen. Så modul 31, lektion 4, 5 og 11. Lektion 11 viser, hvor læringsmålene står i din kode. Det er det, censor bedømmer." },
  { fra: "2026-11-03", til: "2026-11-03", titel: "Tirsdag: siderne og login", moduler: ["m31"], lektioner: ["m31l6", "m31l7", "m31l8", "m31l9", "m31l10"],
    tekst: "Start med **Repetition**. Så modul 31, lektion 6–10: Overblik, Kunder, kundesiden, Skader og login. Afslut med en kort **Test**: emnet SkadeApp, slags Spørgsmål, siden retter." },
  { fra: "2026-11-04", til: "2026-11-04", titel: "Onsdag: svære spørgsmål og ændringer i en kopi", moduler: ["m31"], lektioner: ["m31l12", "m31v"],
    tekst: "Start med **Repetition**. Så lektion 12 (valg, du skal forsvare) og værkstedet, hvor du laver små ændringer i en kopi af din app. Hold præsentationen højt én gang med uret (lektion 13 viser hvordan)." },
  { fra: "2026-11-05", til: "2026-11-05", titel: "Torsdag: præsentationen og generalprøven", moduler: ["m31"], lektioner: ["m31l13", "m31l14"],
    tekst: "Start med **Repetition**. Så lektion 13 og 14. Hold præsentationen højt to gange, og tag en **Test** med emnet SkadeApp og slags Forklar med egne ord. Stop i god tid, og sov." },
  { fra: "2026-11-06", til: "2026-11-06", titel: "Mundtlig eksamen", moduler: [],
    tekst: "Kun en kort Repetition om morgenen. Start appen og åbn koden og dispositionen, før Zoom-mødet begynder. Du kender dit projekt bedre end nogen anden i mødet." },
  { fra: "2026-11-07", til: "2026-12-31", titel: "Efter eksamen: resten af kurset", valgfri: true,
    moduler: ["m04", "m05", "m06", "m07", "m08", "m09", "m10", "m11", "m12", "m13", "m14", "m15", "m16", "m17", "m18", "m19", "m20", "m21", "m22", "m23", "m24", "m25", "m26", "m27", "m29"],
    tekst: "Nu er der tid til at lære det hele ordentligt, i dit eget tempo. Fortsæt med modul 4, hvor du slap. Meget af det kender du allerede fra dit projekt, så det bliver lettere, end det ville have været før." }
];
