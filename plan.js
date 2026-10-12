// Studieplanen: hvilke moduler der hører til hvilke dage frem til aflevering (30/10-2026) og eksamen (6/11-2026).
// Et forslag — ret datoer og moduler her, hvis planen skal lægges om. Forsiden og siden "Plan" læser denne liste.
// valgfri: true = tæller ikke som "bagud", hvis den ikke bliver færdig.
window.STUDIEPLAN = [
  { fra: "2026-10-13", til: "2026-10-14", titel: "Grundlaget: første program, variabler, valg og løkker", moduler: ["m00", "m01", "m02"],
    tekst: "To dage til det, alt andet står på. Tag debugger-lektionen i modul 1 alvorligt: resten af kurset bliver lettere, når du kan se variablerne i stedet for at holde dem i hovedet." },
  { fra: "2026-10-15", til: "2026-10-15", titel: "Metoder, arrays og dine første klasser", moduler: ["m03", "m04"],
    tekst: "Modul 4 er starten på objektorienteret programmering — det første, du bliver spurgt om til eksamen." },
  { fra: "2026-10-16", til: "2026-10-16", titel: "Arv, polymorfi og collections", moduler: ["m05", "m06"],
    tekst: "`List` og `Dictionary` fra modul 6 bruger du i hver eneste webside senere." },
  { fra: "2026-10-17", til: "2026-10-17", titel: "Interfaces og LINQ", moduler: ["m07", "m09"],
    tekst: "Interfaces er grundlaget for dependency injection i ASP.NET Core. LINQ er måden, man spørger en database på fra C#." },
  { fra: "2026-10-18", til: "2026-10-18", titel: "Databaser og HTML/CSS", moduler: ["m12", "m13"],
    tekst: "Nu begynder web-delen. Skriv SQL'en selv i {{Visual Studios databasevindue||Riders Database-vindue}} — spring ikke opgaverne over." },
  { fra: "2026-10-19", til: "2026-10-19", titel: "JavaScript og ASP.NET Core MVC", moduler: ["m14", "m16"],
    tekst: "Har du kun kræfter til ét modul i dag, så tag modul 16 (MVC). JavaScript kan læses hurtigere." },
  { fra: "2026-10-20", til: "2026-10-20", titel: "Entity Framework Core", moduler: ["m17"],
    tekst: "Det vigtigste modul for dit projekt: modeller, database, migrationer og sider, der kan oprette, vise, rette og slette. Byg FirmaApp helt færdig." },
  { fra: "2026-10-21", til: "2026-10-21", titel: "Database first og routing — og vælg dit projekt", moduler: ["m18"],
    tekst: "Læs også de første lektioner i modul 28 (projekt og eksamen) i dag, og **vælg skabelon og emne**. Vælg noget, der ligner det, du lige har bygget — så kan du forklare det." },
  { fra: "2026-10-22", til: "2026-10-22", titel: "Web API og login", moduler: ["m19", "m20"],
    tekst: "Tag det, dit projekt får brug for. Skal projektet have login, er modul 20 vigtigst. Start projektet i dag, hvis du når det." },
  { fra: "2026-10-23", til: "2026-10-28", titel: "Byg projektet", moduler: ["m28", "m11", "m08", "m10"],
    tekst: "Projektet først hver dag — mens hovedet er friskt. Har du valgt Blazor, så tag modul 22–24 de første to dage.\n\nNår du ikke orker mere projekt: én lektion fra modul 11, 8 eller 10. De dækker læringsmål, du kan blive spurgt om (designmønstre, algoritmer, regulære udtryk, async, delegates). Start hver dag med Repetition." },
  { fra: "2026-10-29", til: "2026-10-30", titel: "Aflevér projekt og disposition", moduler: [],
    tekst: "Skriv dispositionen færdig (modul 28). Hent projektet ned i en tom mappe, og tjek, at det kan bygges og køres derfra. **Aflevér torsdag den 29.** — fredag den 30. er reserve, hvis noget driller. Tjek selv klokkeslættet for fristen i WISEflow." },
  { fra: "2026-10-31", til: "2026-11-05", titel: "Træn til den mundtlige eksamen", moduler: ["m15", "m21", "m22", "m23", "m24", "m25", "m26", "m27"], valgfri: true,
    tekst: "Hver dag: Repetition, og alle \"Forklar med egne ord\"-trin i de moduler, dit projekt bruger. Hold din præsentation på tid (ca. 10 minutter) — brug stikord, ikke en tekst, du skal huske ordret.\n\nModulerne her er dem, planen sprang over. Tag dem på læse-niveau, så du ved, hvad de handler om, hvis du bliver spurgt. Modul 29 (Docker) kan vente til efter eksamen." },
  { fra: "2026-11-06", til: "2026-11-06", titel: "Mundtlig eksamen", moduler: [],
    tekst: "Kun en kort Repetition om morgenen. Du kender dit projekt bedre end nogen anden i lokalet." }
];
