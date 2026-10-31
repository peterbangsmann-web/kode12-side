// Emner (kategorier), som testen og ordbogen deler.
//   liste:       emnerne i den rækkefølge, de vises
//   modul:       hvilket emne et moduls spørgsmål og fagord hører til
//   lektion:     undtagelser for enkelte lektioner (vinder over modul)
//   skadeappFag: fagord fra SkadeApp-lektionerne (modul 30 og 31) får dette emne i ordbogen; i testen hører spørgsmålene til "SkadeApp"
//   ord:         fagord, der skal have et bestemt emne i ordbogen uanset modul (nøglen er ordet med små bogstaver, uden en parentes til sidst)
//   testUde / testUdeLektioner: spørgsmål, der ikke kan stå alene i en test, fordi de bygger på et tidligere trin
window.KATEGORIER = {
  liste: [
    { id: "grund", navn: "Grundbegreber", ikon: "🧭", tekst: "Værktøjerne og de store ord: compiler, IDE, debugger, server, HTTP og frameworks." },
    { id: "csharp", navn: "C#", ikon: "⌨️", tekst: "Selve sproget: variabler, løkker, metoder, klasser, LINQ, async og meget mere." },
    { id: "sql", navn: "SQL og databaser", ikon: "🗄️", tekst: "Tabeller, SELECT, JOIN og godt databasedesign." },
    { id: "html", navn: "HTML og CSS", ikon: "🎨", tekst: "Det, en side er lavet af, og hvordan den ser ud." },
    { id: "js", navn: "JavaScript", ikon: "✨", tekst: "Sproget i browseren, TypeScript og Angular." },
    { id: "aspnet", navn: "ASP.NET Core", ikon: "🌐", tekst: "MVC, routing, Web API, login og SignalR." },
    { id: "ef", navn: "EF Core", ikon: "🔗", tekst: "Entity Framework Core: C#-klasser, der gemmes som tabeller i en database." },
    { id: "blazor", navn: "Blazor", ikon: "🔥", tekst: "Komponenter, render modes, formularer og data i Blazor." },
    { id: "ai", navn: "AI og machine learning", ikon: "🤖", tekst: "ML.NET og sprogmodeller i en web-app." },
    { id: "drift", navn: "Docker og servere", ikon: "🐳", tekst: "Containere, SQL Server og at få en app ud at køre." },
    { id: "eksamen", navn: "Projekt og eksamen", ikon: "🎓", tekst: "Disposition, præsentation og vejen til 12." },
    { id: "skadeapp", navn: "SkadeApp", ikon: "🛡️", tekst: "Dit eksamensprojekt, trin for trin." }
  ],
  modul: {
    m00: "csharp", m01: "csharp", m02: "csharp", m03: "csharp", m04: "csharp", m05: "csharp", m06: "csharp", m07: "csharp",
    m08: "csharp", m09: "csharp", m10: "csharp", m11: "csharp",
    m12: "sql", m13: "html", m14: "js", m15: "js",
    m16: "aspnet", m17: "ef", m18: "aspnet", m19: "aspnet", m20: "aspnet",
    m21: "js", m22: "blazor", m23: "blazor", m24: "blazor",
    m25: "ai", m26: "ai", m27: "js", m28: "eksamen", m29: "drift", m30: "skadeapp", m31: "skadeapp"
  },
  lektion: {
    m00l3: "grund",   // Røde streger: fejl er helt normale
    m16l1: "grund",   // Sådan virker nettet: forespørgsel og svar
    m29l1: "grund",   // Hvad er en server?
    m30l0: "grund",   // Det store overblik: hvad er alle ordene?
    m18l1: "ef",      // Code first eller database first
    m18l2: "ef",      // Scaffold-DbContext
    m31l0: "eksamen"  // Sådan træner du til den mundtlige eksamen
  },
  skadeappFag: {
    m30l1: "blazor", m30lc: "csharp", m30l2: "csharp", m30l3: "csharp", m30l4: "csharp", m30l5: "csharp",
    m30l6: "ef", m30l7: "csharp", m30lh: "html", m30l8: "blazor", m30l9: "blazor", m30l10: "blazor",
    m30l11: "blazor", m30l12: "aspnet", m30l13: "html", m30v: "blazor",
    m31l1: "grund", m31l2: "csharp", m31l3: "ef", m31l4: "csharp", m31l5: "aspnet", m31l6: "blazor", m31l7: "blazor",
    m31l8: "blazor", m31l9: "csharp", m31l10: "aspnet", m31l11: "eksamen", m31l12: "eksamen", m31l13: "eksamen", m31l14: "blazor", m31v: "blazor"
  },
  ord: {
    "browser": "grund", "server": ["grund", "drift"], "klient": "grund", "http": "grund", "https": ["grund", "aspnet"], "url": "grund",
    "framework": "grund", "api": "grund", "full stack": "grund", "fullstack": "grund", "frontend": "grund", "backend": "grund",
    "json": ["grund", "csharp", "js"], "ide": "grund", "compiler": "grund", "debugger": "grund", "breakpoint": "grund",
    "betinget breakpoint": "grund", "step over": "grund", "step into": "grund", "step out": "grund", "locals": "grund",
    "watch": "grund", "call stack": "grund", "threads & variables": "grund", "nuget-pakke": "grund", ".net": "grund",
    "terminal": "grund", "localhost": "grund", "port": ["grund", "drift"], "bibliotek": "grund", "cdn": "grund",
    "udviklerværktøjer": "grund", "request": "grund", "response": "grund", "statuskode": "grund", "syntaks": "grund",
    "syntaksfejl": "grund", "logisk fejl": "grund", "error list / problems": "grund", "pseudokode": "grund",
    "case-sensitive": "grund", "program": "grund", "konsol": "grund", "kommentar": "grund", "statement": "grund",
    "kodeblok": "grund", "trin": "grund", "repetition": "grund", "get og post": "grund", "get / post": "grund"
  },
  testUde: ["m22l3#11"],
  testUdeLektioner: ["m00l1"]
};
