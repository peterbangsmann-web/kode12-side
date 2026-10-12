// Hele kursusplanen. Moduler, der endnu ikke har en fil, vises som "kommer snart" på forsiden.
// Skal indlæses EFTER alle modulfiler. Når et modul får sin egen fil, forsvinder pladsholderen af sig selv.
(function () {
var PLAN = [
  [2, "Del 1 · C# fra bunden", "🔀", "Valg og løkker", "Kursusdag 2 · Syntaks og typer"],
  [3, "Del 1 · C# fra bunden", "🧰", "Metoder og arrays", "Kursusdag 2 · Syntaks og typer"],
  [4, "Del 2 · Objektorienteret C#", "🏗️", "Klasser og objekter", "Kursusdag 1–2 · Introduktion til OOP"],
  [5, "Del 2 · Objektorienteret C#", "🧬", "Arv og polymorfi", "Kursusdag 3 · Arv"],
  [6, "Del 2 · Objektorienteret C#", "🗂️", "Collections og datastrukturer", "Kursusdag 5 · Collections og datastrukturer"],
  [7, "Del 2 · Objektorienteret C#", "🎭", "Abstraktion, interfaces og typer", "Kursusdag 6 · Abstraktion og enumeration"],
  [8, "Del 3 · Videregående C#", "⚡", "Tråde, Task og async", "Kursusdag 7 · Performance"],
  [9, "Del 3 · Videregående C#", "🔎", "LINQ, filer og Parallel", "Kursusdag 7–8 · LINQ, IO og parallel programmering"],
  [10, "Del 3 · Videregående C#", "📣", "Delegates, lambda og events", "Kursusdag 8 · Delegates"],
  [11, "Del 3 · Videregående C#", "🧩", "Fejlhåndtering, regex, algoritmer og designmønstre", "Læringsmål · på tværs af kurset"],
  [12, "Del 4 · Database og frontend", "🗄️", "SQL og databaser", "Kursusdag 9 · Backend: SQL og SQL Server"],
  [13, "Del 4 · Database og frontend", "🎨", "HTML og CSS", "Kursusdag 10 · Frontend basics"],
  [14, "Del 4 · Database og frontend", "✨", "JavaScript", "Kursusdag 11 · JavaScript og grafik"],
  [15, "Del 4 · Database og frontend", "🧱", "Objektorienteret JavaScript og AJAX", "Kursusdag 12–13 · Objektorienteret JavaScript"],
  [16, "Del 5 · ASP.NET Core", "🌐", "ASP.NET Core MVC", "Kursusdag 13–14 · Intro til ASP.NET MVC"],
  [17, "Del 5 · ASP.NET Core", "💾", "Entity Framework Core: code first og CRUD", "Kursusdag 14 · MVC Core med code first"],
  [18, "Del 5 · ASP.NET Core", "🧭", "Database first, layout og routing", "Kursusdag 15 · MVC Core database first"],
  [19, "Del 5 · ASP.NET Core", "🔌", "REST og Web API", "Kursusdag 16 · REST og Core Web API"],
  [20, "Del 5 · ASP.NET Core", "🔐", "Login, roller og realtid", "Kursusdag 17 · WebSocket og authentication"],
  [21, "Del 6 · SPA og Blazor", "📄", "Single Page Application", "Kursusdag 18 · Single Page Application"],
  [22, "Del 6 · SPA og Blazor", "🔥", "Introduktion til Blazor", "Kursusdag 19 · Introduktion til Blazor"],
  [23, "Del 6 · SPA og Blazor", "🖥️", "Blazor Server med database", "Kursusdag 20 · SPA med Blazor (Blazor Server)"],
  [24, "Del 6 · SPA og Blazor", "📦", "Blazor WebAssembly og web storage", "Kursusdag 21 · Blazor WASM"],
  [25, "Del 7 · Ekstra emner", "🤖", "Machine learning med ML.NET", "Uge 6 · Introduction to ML with .NET"],
  [26, "Del 7 · Ekstra emner", "💬", "AI i webapplikationer", "Uge 6 · Integrating AI with WebApps"],
  [27, "Del 7 · Ekstra emner", "🖼️", "HTML5 API'er og grafik", "Uge 6 · HTML5 API'er og grafik"],
  [29, "Del 7 · Ekstra emner", "🐳", "Docker og SQL Server: din egen databaseserver", "Ekstra · til job som udvikler", 27.5],   // nr 27.5: skal stå før eksamensmodulet på forsiden
  [28, "Eksamen", "🎓", "Projekt og eksamen: vejen til 12", "Aflevering 30/10 · Mundtlig eksamen 6/11"]
];
PLAN.forEach(function (p) {
  var id = "m" + ("0" + p[0]).slice(-2);
  if (window.KURSUS.some(function (m) { return m.id === id; })) return;
  window.KURSUS.push({ id: id, nr: p[5] || p[0], del: p[1], ikon: p[2], titel: p[3], dag: p[4], intro: "Dette modul er på vej.", lektioner: [] });
});
})();
