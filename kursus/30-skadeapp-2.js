// Modul 30, del 2 af 3: lektion 5–8 (validering, database, services, første side). Se 30-skadeapp-1.js.
(function () {
const R = String.raw;
var m = window.KURSUS.filter(function (x) { return x.id === "m30"; })[0];
if (!m) return;

m.lektioner.push(

  // ------------------------------------------------------------------
  { id: "m30l5", nr: 5, titel: "Validering: regler på modellen", min: 20,
    ord: [
      ["Validering", "At tjekke, at det, brugeren har skrevet, overholder reglerne, før det bliver gemt."],
      ["Attribut", "En markering i firkantede parenteser over en property, fx `[Required]`. Den giver propertyen en regel."],
      ["Data annotations", "De færdige valideringsattributter i .NET: `[Required]`, `[EmailAddress]`, `[StringLength]`, `[Range]`, `[RegularExpression]`."],
      ["Regulært udtryk", "Et mønster, som en tekst skal passe til. `^\\d{8}$` betyder: præcis 8 cifre og intet andet."],
      ["ErrorMessage", "Den tekst, brugeren ser, når reglen ikke er overholdt."]
    ],
    trin: [
      { t: "laes", h: "Reglerne står på modellen",
        md: "En bruger kan skrive hvad som helst i en formular: intet navn, en e-mail uden @, et telefonnummer med bogstaver. Reglerne skrives som **attributter** over hver property i modellen. Så gælder de overalt, hvor modellen bruges, og formularerne viser selv fejlbeskederne.",
        kode: R`public class Kunde
{
    [Required(ErrorMessage = "Skriv kundens navn.")]
    [StringLength(100, ErrorMessage = "Navnet må højst være 100 tegn.")]
    public string Navn { get; set; } = "";

    [Required(ErrorMessage = "Skriv kundens e-mail.")]
    [EmailAddress(ErrorMessage = "Det er ikke en gyldig e-mail.")]
    public string Email { get; set; } = "";
}`,
        frag: true,
        noter: [
          ["[Required]", "Feltet skal udfyldes. En tom tekst tæller som ikke udfyldt."],
          ["[StringLength(100)]", "Højst 100 tegn."],
          ["[EmailAddress]", "Teksten skal ligne en e-mail (have et @)."],
          ["ErrorMessage = …", "Beskeden på dansk. Uden den skriver .NET en engelsk besked."]
        ] },
      { t: "valg", q: "Navnet på en kunde skal altid udfyldes. Hvor skriver du den regel i SkadeApp?",
        svar: ["Som `[Required]` over `Navn` i klassen Kunde", "I Program.cs", "I databasen med SQL", "I NavMenu.razor"],
        ret: 0, fordi: "Reglen står på modellen. Så gælder den i alle formularer, der bruger `Kunde`, uden at du skal skrive den igen." },
      { t: "laes", h: "Regulære udtryk: et mønster for teksten",
        md: "Et dansk telefonnummer er præcis 8 cifre. Det kan man ikke sige med `[Required]`. Et **regulært udtryk** er et mønster, som teksten skal passe til. `Regex.IsMatch` svarer `True`, hvis teksten passer.",
        kode: R`using System.Text.RegularExpressions;

Console.WriteLine(Regex.IsMatch("22334455", @"^\d{8}$"));
Console.WriteLine(Regex.IsMatch("2233 4455", @"^\d{8}$"));
Console.WriteLine(Regex.IsMatch("1234", @"^\d{8}$"));`,
        noter: [
          ["using System.Text.RegularExpressions;", "Regulære udtryk ligger i dette namespace. Uden linjen kender compileren ikke `Regex`."],
          ["^", "Mønsteret starter ved tekstens begyndelse."],
          ["\\d", "Ét ciffer (0–9)."],
          ["{8}", "Det forrige skal gentages præcis 8 gange."],
          ["$", "Teksten skal slutte her. Uden `^` og `$` ville 8 cifre et sted inde i en længere tekst også passe."],
          ["@\"…\"", "Med `@` foran betyder `\\` bare en skråstreg. Det gør mønstre nemmere at skrive."]
        ],
        output: "True\nFalse\nFalse",
        md2: "\"2233 4455\" passer ikke, fordi mellemrummet ikke er et ciffer." },
      { t: "forudsig",
        kode: R`using System.Text.RegularExpressions;

string moenster = @"^\d{4}$";
Console.WriteLine(Regex.IsMatch("8000", moenster));
Console.WriteLine(Regex.IsMatch("800", moenster));
Console.WriteLine(Regex.IsMatch("8000 Aarhus", moenster));`,
        output: "True\nFalse\nFalse",
        fordi: "Mønsteret kræver præcis 4 cifre og intet andet. \"800\" har kun 3, og \"8000 Aarhus\" har tekst efter cifrene, så `$` passer ikke." },
      { t: "valg", q: "Hvilket regulært udtryk passer til en tekst, der består af præcis 2 cifre og intet andet?",
        svar: ["`^\\d{2}$`", "`\\d{2}`", "`^\\d$`", "`^{2}\\d$`"],
        ret: 0, fordi: "`\\d{2}` er to cifre, og `^` og `$` sikrer, at der ikke står andet før eller efter. Uden `^` og `$` passer `abc12xyz` også." },
      { t: "udfyld", q: "Udfyld, så mønsteret tjekker, at teksten er præcis 8 cifre.",
        kode: R`using System.Text.RegularExpressions;

Console.WriteLine(Regex.IsMatch("40506070", @"^\d{[[8]]}[[$]]"));`,
        output: "True",
        fordi: "`{8}` gentager cifferet 8 gange, og `$` kræver, at teksten slutter der." },
      { t: "laes", h: "Reglerne virker også uden en formular",
        md: "Her kører .NET's validering direkte på et objekt. Det er præcis det samme, der sker, når formularen i din app tjekker en ny kunde: hver attribut bliver prøvet, og beskeden fra `ErrorMessage` kommer frem for hver regel, der ikke er overholdt.",
        kode: R`using System.ComponentModel.DataAnnotations;

Kunde k = new Kunde { Navn = "", Email = "mette", Telefon = "123" };
List<ValidationResult> fejl = new List<ValidationResult>();
Validator.TryValidateObject(k, new ValidationContext(k), fejl, true);

foreach (ValidationResult f in fejl)
{
    Console.WriteLine(f.ErrorMessage);
}

class Kunde
{
    [Required(ErrorMessage = "Skriv kundens navn.")]
    public string Navn { get; set; } = "";

    [Required(ErrorMessage = "Skriv kundens e-mail.")]
    [EmailAddress(ErrorMessage = "Det er ikke en gyldig e-mail.")]
    public string Email { get; set; } = "";

    [Required(ErrorMessage = "Skriv kundens telefonnummer.")]
    [RegularExpression(@"^\d{8}$", ErrorMessage = "Telefonnummeret skal være 8 cifre.")]
    public string Telefon { get; set; } = "";
}`,
        noter: [
          ["using System.ComponentModel.DataAnnotations;", "Her bor attributterne og `Validator`."],
          ["TryValidateObject", "Prøver alle reglerne og lægger fejlene i listen `fejl`."],
          ["ValidationResult og ValidationContext", "Det, `Validator` skal bruge: en liste til fejlene og oplysninger om objektet. Det skal du ikke kunne skrive selv; i din app gør formularen det for dig."]
        ],
        output: "Skriv kundens navn.\nDet er ikke en gyldig e-mail.\nTelefonnummeret skal være 8 cifre." },
      { t: "forudsig",
        q: "Samme `Kunde`-klasse og samme validering som i trin 7. Nu er kunden `new Kunde { Navn = \"Ali\", Email = \"ali@eksempel.dk\", Telefon = \"4050607\" }`. Hvad skriver programmet?",
        kode: R`using System.ComponentModel.DataAnnotations;

Kunde k = new Kunde { Navn = "Ali", Email = "ali@eksempel.dk", Telefon = "4050607" };
List<ValidationResult> fejl = new List<ValidationResult>();
Validator.TryValidateObject(k, new ValidationContext(k), fejl, true);
Console.WriteLine(fejl.Count);
foreach (ValidationResult f in fejl)
{
    Console.WriteLine(f.ErrorMessage);
}

class Kunde
{
    [Required(ErrorMessage = "Skriv kundens navn.")]
    public string Navn { get; set; } = "";

    [Required(ErrorMessage = "Skriv kundens e-mail.")]
    [EmailAddress(ErrorMessage = "Det er ikke en gyldig e-mail.")]
    public string Email { get; set; } = "";

    [Required(ErrorMessage = "Skriv kundens telefonnummer.")]
    [RegularExpression(@"^\d{8}$", ErrorMessage = "Telefonnummeret skal være 8 cifre.")]
    public string Telefon { get; set; } = "";
}`,
        output: "1\nTelefonnummeret skal være 8 cifre.",
        fordi: "Navn og e-mail er i orden. Telefonnummeret har kun 7 cifre, så kun det regulære udtryk fejler." },
      { t: "opgave", h: "Sæt reglerne på dine modeller", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "csharp",
        md: "Nu får dine to modeller deres regler. Skriv attributterne selv over de rigtige properties. Fejlbeskederne skal være præcis dem i kravene, for senere lektioner tjekker, at de kommer frem.\n\nØverst i begge filer skal der stå `using System.ComponentModel.DataAnnotations;`, ellers kan compileren ikke finde attributterne.",
        krav: [
          "`Kunde.Navn`: `[Required]` med beskeden `Skriv kundens navn.` og `[StringLength(100)]` med `Navnet må højst være 100 tegn.`",
          "`Kunde.Email`: `[Required]` med `Skriv kundens e-mail.` og `[EmailAddress]` med `Det er ikke en gyldig e-mail.`",
          "`Kunde.Telefon`: `[Required]` med `Skriv kundens telefonnummer.` og `[RegularExpression]` med mønsteret for præcis 8 cifre og beskeden `Telefonnummeret skal være 8 cifre.`",
          "`Skade.Beskrivelse`: `[Required]` med `Beskriv skaden.` og `[StringLength(500)]` med `Beskrivelsen må højst være 500 tegn.`",
          "`Skade.Beloeb`: `[Range]` fra 1 til 10.000.000 med `Beløbet skal være mellem 1 og 10.000.000 kr.`",
          "Begge filer har `using System.ComponentModel.DataAnnotations;`, og projektet kan bygges uden fejl"
        ],
        tip: [
          "En attribut står på linjen over propertyen, i firkantede parenteser. Beskeden gives sådan: `[Required(ErrorMessage = \"Skriv kundens navn.\")]`",
          "Har en attribut et tal, står tallet først: `[StringLength(100, ErrorMessage = \"…\")]` og `[Range(1, 10_000_000, ErrorMessage = \"…\")]`",
          "Mønsteret til telefonnummeret står i trin 7: `[RegularExpression(@\"^\\d{8}$\", ErrorMessage = \"Telefonnummeret skal være 8 cifre.\")]`"
        ],
        output: "Ingen ændring i appen endnu. Reglerne viser sig, når formularerne kommer i lektion 10.",
        loesning: R`// ===== Models/Kunde.cs =====
using System.ComponentModel.DataAnnotations;

namespace SkadeApp.Models;

// En kunde i forsikringsselskabet. Én kunde kan have mange skader (en-til-mange).
public class Kunde
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Skriv kundens navn.")]
    [StringLength(100, ErrorMessage = "Navnet må højst være 100 tegn.")]
    public string Navn { get; set; } = "";

    [Required(ErrorMessage = "Skriv kundens e-mail.")]
    [EmailAddress(ErrorMessage = "Det er ikke en gyldig e-mail.")]
    public string Email { get; set; } = "";

    // Regulært udtryk: præcis 8 cifre og intet andet (et dansk telefonnummer).
    [Required(ErrorMessage = "Skriv kundens telefonnummer.")]
    [RegularExpression(@"^\d{8}$", ErrorMessage = "Telefonnummeret skal være 8 cifre.")]
    public string Telefon { get; set; } = "";

    // Navigation property: kundens skader. EF Core fylder listen, når vi beder om det med Include.
    public List<Skade> Skader { get; set; } = new();

    // Udregnes med LINQ ud fra skaderne. Den har ingen set, så EF Core gemmer den ikke i databasen.
    public decimal Udbetalt => Skader.Where(s => s.Status == SkadeStatus.Godkendt).Sum(s => s.Beloeb);

    public int AabneSkader => Skader.Count(s => s.ErAaben);
}

// ===== Models/Skade.cs =====
using System.ComponentModel.DataAnnotations;

namespace SkadeApp.Models;

// En skadesanmeldelse. Hver skade hører til præcis én kunde.
public class Skade
{
    public int Id { get; set; }

    public DateTime Dato { get; set; } = DateTime.Today;

    public SkadeType Type { get; set; } = SkadeType.Indbo;

    [Required(ErrorMessage = "Beskriv skaden.")]
    [StringLength(500, ErrorMessage = "Beskrivelsen må højst være 500 tegn.")]
    public string Beskrivelse { get; set; } = "";

    // decimal til penge: den regner præcist med kroner og øre (double kan give afrundingsfejl).
    [Range(1, 10_000_000, ErrorMessage = "Beløbet skal være mellem 1 og 10.000.000 kr.")]
    public decimal Beloeb { get; set; }

    public SkadeStatus Status { get; set; } = SkadeStatus.Anmeldt;

    // Fremmednøgle: id'et på den kunde, skaden hører til.
    public int KundeId { get; set; }

    // Navigation property: selve kunde-objektet.
    public Kunde? Kunde { get; set; }

    // En skade er åben, så længe der ikke er truffet en afgørelse.
    public bool ErAaben => Status == SkadeStatus.Anmeldt || Status == SkadeStatus.Behandles;
}

public enum SkadeType { Bil, Indbo, Rejse, Ulykke }

public enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`,
        md2: "`10_000_000` er bare 10 millioner. Understregningerne gør tallet nemmere at læse; C# ser bort fra dem." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvordan sikrer du, at et telefonnummer er gyldigt, før det bliver gemt?",
        svar: "Over propertyen Telefon i Kunde står en RegularExpression-attribut med mønsteret ^\\d{8}$, som betyder præcis 8 cifre og intet andet, og en Required-attribut. Formularen bruger DataAnnotationsValidator, så den tjekker reglerne, før der bliver gemt, og viser min danske fejlbesked under feltet, hvis nummeret ikke passer.",
        noegle: ["RegularExpression", "^\\d{8}$", "attribut", "Required", "fejlbesked"] }
  ] },

  // ------------------------------------------------------------------
  { id: "m30l6", nr: 6, titel: "Databasen: EF Core og SQLite", min: 25,
    ord: [
      ["Database", "Et program, der gemmer data i tabeller, så de er der endnu, når appen starter igen."],
      ["EF Core", "Entity Framework Core: et bibliotek, der oversætter mellem dine C#-klasser og databasens tabeller. Du skriver C#, og EF Core skriver SQL'en."],
      ["SQLite", "En database, der ligger i én fil (`Data/skader.db`). Kræver ingen databaseserver."],
      ["NuGet-pakke", "Et færdigt bibliotek, som projektet bruger, fx `Microsoft.EntityFrameworkCore.Sqlite`. Står i `SkadeApp.csproj`."],
      ["DbContext", "Klassen, der er forbindelsen til databasen. Hvert `DbSet` i den bliver til en tabel."],
      ["DbSet", "En tabel set fra C#: `DbSet<Kunde> Kunder` er tabellen med kunder."],
      ["Connection string", "Teksten, der fortæller, hvor databasen er: `Data Source=Data/skader.db`."],
      ["Seed data", "Startdata, som databasen fyldes med, når den laves første gang."],
      ["EnsureCreated", "Laver databasen med alle tabeller, hvis den ikke findes. Findes den, gør den ingenting."]
    ],
    trin: [
      { t: "laes", h: "Fra klasser til tabeller",
        md: "Når appen lukkes, forsvinder alt, der kun ligger i variabler. Derfor gemmes kunder og skader i en **database**.\n\nDu skriver ikke selv SQL. **EF Core** oversætter: hver klasse bliver til en tabel, hver property til en kolonne, og hvert objekt til en række. Beder du om alle kunder i C#, skriver EF Core den SQL, der henter dem.\n\nDatabasen er **SQLite**: hele databasen ligger i én fil, `skader.db`, i mappen `Data`. Der er ingen databaseserver at installere, og censor kan køre din zip-fil uden opsætning.\n\nSkabelonen har allerede lavet en SQLite-database til brugerne, `app.db`, med sin egen `ApplicationDbContext`. Kunder og skader får deres egen database ved siden af. Så er login og forretningsdata adskilt.",
        kode: R`C#                              Database
class Kunde                 →   tabellen Kunder
public string Navn          →   kolonnen Navn
new Kunde { Navn = "Ali" }  →   en række i Kunder`,
        sprog: "text" },
      { t: "valg", q: "Hvad gør EF Core i dit projekt?",
        svar: ["Oversætter mellem dine C#-klasser og databasens tabeller og skriver SQL'en for dig", "Tegner siderne i browseren", "Tjekker, at e-mails er gyldige", "Er selve databasefilen"],
        ret: 0, fordi: "EF Core er bindeleddet: du arbejder med objekter i C#, og EF Core gemmer og henter dem i tabellerne. Databasefilen er `skader.db`, og SQLite er databasen." },
      { t: "ide", h: "EF Core er allerede i projektet",
        md: "EF Core er et færdigt bibliotek, en **NuGet-pakke**. Fordi du lavede projektet med login, har skabelonen allerede hentet EF Core til SQLite: login-siderne gemmer brugerne i en database. Du skal bare se, at den er der.",
        win: ["Dobbeltklik på projektet **SkadeApp** i Solution Explorer. Filen `SkadeApp.csproj` åbner.", "Find linjen med `Microsoft.EntityFrameworkCore.Sqlite`. Tallet efter `Version` er pakkens version.", "Højreklik på projektet → **Manage NuGet Packages…** → fanen **Installed**. Her står de samme pakker."],
        mac: ["Dobbeltklik på projektet **SkadeApp** i Rider. Filen `SkadeApp.csproj` åbner.", "Find linjen med `Microsoft.EntityFrameworkCore.Sqlite`. Tallet efter `Version` er pakkens version."],
        md2: "Havde du lavet projektet uden login, skulle du selv hente pakken: {{højreklik på projektet → **Manage NuGet Packages…** → **Browse**||i terminalen med `dotnet add package Microsoft.EntityFrameworkCore.Sqlite`}}." },
      { t: "laes", h: "DbContext: forbindelsen til databasen",
        md: "EF Core skal vide, hvilke tabeller databasen har. Det står i en klasse, der arver fra `DbContext`. At **arve** betyder, at din klasse får alt det, `DbContext` kan, og selv lægger lidt til: her de to tabeller.",
        kode: R`using Microsoft.EntityFrameworkCore;
using SkadeApp.Models;

namespace SkadeApp.Data;

public class SkadeContext : DbContext
{
    public SkadeContext(DbContextOptions<SkadeContext> options) : base(options)
    {
    }

    public DbSet<Kunde> Kunder { get; set; }
    public DbSet<Skade> Skader { get; set; }
}`,
        frag: true,
        noter: [
          [": DbContext", "Klassen arver fra `DbContext`, som kan tale med databasen."],
          ["konstruktøren", "En metode med klassens navn, der kører, når objektet laves. `options` indeholder bl.a. hvilken database der bruges. `: base(options)` giver dem videre til `DbContext`."],
          ["DbSet<Kunde> Kunder", "Tabellen `Kunder`. EF Core ser selv, at `Skade.KundeId` er en fremmednøgle til den."]
        ] },
      { t: "valg", q: "`SkadeContext` har linjen `public DbSet<Skade> Skader { get; set; }`. Hvad bliver det til i databasen?",
        svar: ["En tabel, der hedder Skader, med en kolonne for hver property i Skade", "En kolonne i tabellen Kunder", "En fil, der hedder Skader.cs", "Ingenting, før man skriver SQL"],
        ret: 0, fordi: "Hvert `DbSet` bliver til en tabel. Properties med `get` og `set` bliver til kolonner. Beregnede properties som `ErAaben` har ingen `set` og bliver ikke til kolonner." },
      { t: "laes", h: "Tekst i tabellen og startdata",
        md: "To ting mere i `SkadeContext`. De står i metoden `OnModelCreating`, som EF Core kalder, når den finder ud af, hvordan tabellerne skal se ud.\n\n- `HasConversion<string>()`: en enum gemmes som tekst (`Godkendt`) i stedet for et tal (`2`). Så kan man læse tabellen.\n- `HasData(…)`: **startdata**. Når databasen laves, kommer disse kunder og skader med, så appen ikke er tom første gang.",
        kode: R`protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Skade>().Property(s => s.Status).HasConversion<string>();

    modelBuilder.Entity<Kunde>().HasData(
        new Kunde { Id = 1, Navn = "Mette Jensen", Email = "mette@eksempel.dk", Telefon = "22334455" });

    modelBuilder.Entity<Skade>().HasData(
        new Skade { Id = 1, KundeId = 1, Dato = new DateTime(2026, 8, 14), Type = SkadeType.Bil,
                    Beskrivelse = "Ridse i døren efter parkering", Beloeb = 4500m, Status = SkadeStatus.Godkendt });
}`,
        frag: true,
        noter: [
          ["modelBuilder.Entity<Skade>()", "Vælger tabellen for `Skade`, så du kan give regler for den, fx hvordan en kolonne gemmes."],
          ["protected override", "Metoden findes i `DbContext`. `override` betyder: brug min udgave i stedet. `protected` betyder: kun klassen selv og klasser, der arver fra den, må kalde metoden."],
          ["Id = 1", "Startdata skal have faste id'er, så skaden kan pege på kunden med `KundeId = 1`."],
          ["new DateTime(2026, 8, 14)", "En fast dato: 14. august 2026."]
        ] },
      { t: "valg", q: "Hvorfor har startdataene i `HasData` faste id'er, fx `Id = 1`?",
        svar: ["Så skaderne kan pege på den rigtige kunde med KundeId, og EF Core ved, hvilken række er hvilken", "Fordi id'er altid skal skrives i hånden", "For at gøre databasen hurtigere", "Fordi SQLite ikke kan tælle"],
        ret: 0, fordi: "En skade i startdataene skal vide, hvilken kunde den hører til (`KundeId = 1`). Det kræver, at kunden har et kendt id. Nye kunder, som brugeren opretter, får automatisk det næste id." },
      { t: "laes", h: "Program.cs: sådan starter appen",
        md: "Før du retter i `Program.cs`, skal du vide, hvad der står i den. Den kører først, når appen starter, og den har fem dele i fast rækkefølge:",
        kode: R`var builder = WebApplication.CreateBuilder(args);      // 1. lav en "bygger" til appen

builder.Services.AddRazorComponents()                   // 2. registrér, hvad appen skal kunne:
    .AddInteractiveServerComponents();                  //    Blazor-sider, login, databaser, dine services …

var app = builder.Build();                               // 3. byg appen

app.UseAntiforgery();                                    // 4. hvordan en forespørgsel behandles:
app.MapStaticAssets();                                   //    sikkerhed, filer fra wwwroot, siderne …
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();                                               // 5. start webserveren`,
        frag: true,
        noter: [
          ["builder.Services.Add…", "Registrerer en **service**: noget, appen skal kunne. Alle `Add`-linjer skal stå **før** `builder.Build()`."],
          ["app.Use… og app.Map…", "Står **efter** `Build()`. `Map` siger, hvilke adresser appen svarer på, fx dine sider."],
          ["app.Run()", "Starter webserveren. Den kører, indtil du stopper appen."],
          ["if (app.Environment.IsDevelopment())", "Kun mens du udvikler på din egen computer, fx en side med detaljer om fejl."]
        ],
        md2: "I dit projekt står der også mange linjer om login: `AddAuthentication`, `AddIdentityCookies`, `AddIdentityCore`, `AddDbContext<ApplicationDbContext>` og `MapAdditionalIdentityEndpoints`. Dem har skabelonen skrevet. Til eksamen er det nok at sige, at de sætter **ASP.NET Core Identity** op: brugere, adgangskoder og login.\n\nEn af dem slutter med `?? throw new InvalidOperationException(…)`. `??` betyder: er det til venstre `null`, så gør det til højre. `throw` stopper programmet med en fejl og en besked. Så får man en klar besked, hvis connection stringen mangler i `appsettings.json`." },
      { t: "valg", q: "Du skal registrere en ny service med `builder.Services.AddScoped<…>()`. Hvor i `Program.cs` skal linjen stå?",
        svar: ["Før `var app = builder.Build();`, sammen med de andre `builder.Services`-linjer", "Efter `app.Run();`", "Hvor som helst", "Inde i `appsettings.json`"],
        ret: 0, fordi: "Services registreres på byggeren, før appen bygges. Efter `Build()` kan man ikke tilføje flere, og efter `app.Run()` kører der ikke mere kode, før appen stopper." },
      { t: "laes", h: "Fortæl appen, hvor databasen er",
        md: "Til sidst skal appen vide, hvor databasen ligger, og den skal laves, første gang appen starter. Det sker to steder.\n\nI `appsettings.json` står **connection string**en. I `Program.cs` registreres databasen, og `EnsureCreated()` laver filen med tabeller og startdata, hvis den ikke findes.",
        kode: R`// appsettings.json (nederst, før den sidste })
"ConnectionStrings": {
  "SkadeDb": "Data Source=Data/skader.db"
}

// Program.cs
builder.Services.AddDbContextFactory<SkadeContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("SkadeDb")));

using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<ApplicationDbContext>().Database.Migrate();

    var factory = scope.ServiceProvider.GetRequiredService<IDbContextFactory<SkadeContext>>();
    using var db = factory.CreateDbContext();
    db.Database.EnsureCreated();
}`,
        frag: true,
        noter: [
          ["GetConnectionString(\"SkadeDb\")", "Henter teksten med navnet `SkadeDb` fra `ConnectionStrings` i `appsettings.json`."],
          ["using (var scope …) og GetRequiredService", "Henter en service et øjeblik, mens appen starter, så databaserne kan laves, før den første side vises."],
          ["Migrate()", "Laver brugernes database (`app.db`) ud fra skabelonens *migrations*, hvis den mangler. Så virker login også, når projektet køres første gang et nyt sted."],
          ["Data Source=Data/skader.db", "Databasen er filen `skader.db` i mappen `Data`, ved siden af brugernes `app.db`."],
          ["AddDbContextFactory", "Registrerer en **fabrik**, der kan lave en ny `SkadeContext`, når en service beder om det. Den bruges i næste lektion."],
          ["UseSqlite(…)", "Brug SQLite med den connection string, der hedder `SkadeDb`."],
          ["EnsureCreated()", "Laver databasen, hvis filen ikke findes. Findes den, sker der ingenting."]
        ] },
      { t: "opgave", h: "Lav SkadeContext", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "csharp",
        md: "Nu laver du forbindelsen til databasen. Mappen `Data` findes allerede: skabelonen har lagt brugernes database der. {{Højreklik på `Data` → **Add → Class…** → `SkadeContext.cs`.||Højreklik på `Data` → **Add → Class/Interface** → `SkadeContext`.}} Skriv klassen selv ud fra kravene og trin 4 og 6.\n\nStartdataene (de fire kunder og syv skader) er ikke kode, du skal lære, kun data. Dem må du kopiere nedenfor og sætte ind nederst i `OnModelCreating`.",
        krav: [
          "Filen har `using Microsoft.EntityFrameworkCore;`, `using SkadeApp.Models;` og `namespace SkadeApp.Data;`",
          "`public class SkadeContext : DbContext` med en konstruktør, der tager `DbContextOptions<SkadeContext> options` og giver dem videre med `: base(options)`",
          "To tabeller: `public DbSet<Kunde> Kunder { get; set; }` og `public DbSet<Skade> Skader { get; set; }`",
          "`protected override void OnModelCreating(ModelBuilder modelBuilder)`, der gemmer både `Status` og `Type` på `Skade` som tekst med `HasConversion<string>()`",
          "Startdataene fra kopi-feltet står nederst i `OnModelCreating`",
          "Projektet kan bygges uden fejl"
        ],
        tip: [
          "Konstruktøren står i trin 4: den har samme navn som klassen og en tom krop `{ }`.",
          "`HasConversion` står i trin 6. Du skal bruge den to gange: én gang med `s => s.Status` og én gang med `s => s.Type`.",
          "Rækkefølgen i klassen: konstruktøren, de to `DbSet`, og til sidst `OnModelCreating` med de to `HasConversion`-linjer og startdataene."
        ],
        start: R`// Startdata, så appen ikke er tom første gang, den kører.
modelBuilder.Entity<Kunde>().HasData(
    new Kunde { Id = 1, Navn = "Mette Jensen", Email = "mette@eksempel.dk", Telefon = "22334455" },
    new Kunde { Id = 2, Navn = "Ali Hassan", Email = "ali@eksempel.dk", Telefon = "40506070" },
    new Kunde { Id = 3, Navn = "Søren Nielsen", Email = "soeren@eksempel.dk", Telefon = "31415926" },
    new Kunde { Id = 4, Navn = "Camilla Holm", Email = "camilla@eksempel.dk", Telefon = "60708090" });

modelBuilder.Entity<Skade>().HasData(
    new Skade { Id = 1, KundeId = 1, Dato = new DateTime(2026, 8, 14), Type = SkadeType.Bil, Beskrivelse = "Ridse i døren efter parkering", Beloeb = 4500m, Status = SkadeStatus.Godkendt },
    new Skade { Id = 2, KundeId = 1, Dato = new DateTime(2026, 10, 2), Type = SkadeType.Indbo, Beskrivelse = "Vandskade under opvaskemaskinen", Beloeb = 18750m, Status = SkadeStatus.Behandles },
    new Skade { Id = 3, KundeId = 2, Dato = new DateTime(2026, 7, 21), Type = SkadeType.Rejse, Beskrivelse = "Kuffert forsvundet i lufthavnen", Beloeb = 6200m, Status = SkadeStatus.Godkendt },
    new Skade { Id = 4, KundeId = 2, Dato = new DateTime(2026, 9, 30), Type = SkadeType.Indbo, Beskrivelse = "Cykel stjålet fra kælderen", Beloeb = 7999m, Status = SkadeStatus.Afvist },
    new Skade { Id = 5, KundeId = 3, Dato = new DateTime(2026, 10, 12), Type = SkadeType.Ulykke, Beskrivelse = "Brækket håndled efter fald på cykel", Beloeb = 25000m, Status = SkadeStatus.Anmeldt },
    new Skade { Id = 6, KundeId = 4, Dato = new DateTime(2026, 9, 5), Type = SkadeType.Bil, Beskrivelse = "Stenslag i forruden", Beloeb = 3200m, Status = SkadeStatus.Godkendt },
    new Skade { Id = 7, KundeId = 4, Dato = new DateTime(2026, 10, 20), Type = SkadeType.Indbo, Beskrivelse = "Tabt mobiltelefon med knust skærm", Beloeb = 2400m, Status = SkadeStatus.Anmeldt });`,
        output: "Ingen ændring i appen endnu. Databasen bliver lavet i næste opgave.",
        loesning: R`using Microsoft.EntityFrameworkCore;
using SkadeApp.Models;

namespace SkadeApp.Data;

// Forbindelsen til databasen. Hvert DbSet bliver til en tabel.
public class SkadeContext : DbContext
{
    public SkadeContext(DbContextOptions<SkadeContext> options) : base(options)
    {
    }

    public DbSet<Kunde> Kunder { get; set; }
    public DbSet<Skade> Skader { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Enums gemmes som tekst ("Godkendt") i stedet for tal (2), så tabellen kan læses.
        modelBuilder.Entity<Skade>().Property(s => s.Status).HasConversion<string>();
        modelBuilder.Entity<Skade>().Property(s => s.Type).HasConversion<string>();

        // Startdata, så appen ikke er tom første gang, den kører.
        modelBuilder.Entity<Kunde>().HasData(
            new Kunde { Id = 1, Navn = "Mette Jensen", Email = "mette@eksempel.dk", Telefon = "22334455" },
            new Kunde { Id = 2, Navn = "Ali Hassan", Email = "ali@eksempel.dk", Telefon = "40506070" },
            new Kunde { Id = 3, Navn = "Søren Nielsen", Email = "soeren@eksempel.dk", Telefon = "31415926" },
            new Kunde { Id = 4, Navn = "Camilla Holm", Email = "camilla@eksempel.dk", Telefon = "60708090" });

        modelBuilder.Entity<Skade>().HasData(
            new Skade { Id = 1, KundeId = 1, Dato = new DateTime(2026, 8, 14), Type = SkadeType.Bil, Beskrivelse = "Ridse i døren efter parkering", Beloeb = 4500m, Status = SkadeStatus.Godkendt },
            new Skade { Id = 2, KundeId = 1, Dato = new DateTime(2026, 10, 2), Type = SkadeType.Indbo, Beskrivelse = "Vandskade under opvaskemaskinen", Beloeb = 18750m, Status = SkadeStatus.Behandles },
            new Skade { Id = 3, KundeId = 2, Dato = new DateTime(2026, 7, 21), Type = SkadeType.Rejse, Beskrivelse = "Kuffert forsvundet i lufthavnen", Beloeb = 6200m, Status = SkadeStatus.Godkendt },
            new Skade { Id = 4, KundeId = 2, Dato = new DateTime(2026, 9, 30), Type = SkadeType.Indbo, Beskrivelse = "Cykel stjålet fra kælderen", Beloeb = 7999m, Status = SkadeStatus.Afvist },
            new Skade { Id = 5, KundeId = 3, Dato = new DateTime(2026, 10, 12), Type = SkadeType.Ulykke, Beskrivelse = "Brækket håndled efter fald på cykel", Beloeb = 25000m, Status = SkadeStatus.Anmeldt },
            new Skade { Id = 6, KundeId = 4, Dato = new DateTime(2026, 9, 5), Type = SkadeType.Bil, Beskrivelse = "Stenslag i forruden", Beloeb = 3200m, Status = SkadeStatus.Godkendt },
            new Skade { Id = 7, KundeId = 4, Dato = new DateTime(2026, 10, 20), Type = SkadeType.Indbo, Beskrivelse = "Tabt mobiltelefon med knust skærm", Beloeb = 2400m, Status = SkadeStatus.Anmeldt });
    }
}` },
      { t: "opgave", h: "Forbind databasen: appsettings.json og Program.cs", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "csharp",
        md: "Nu skal appen vide, hvor databasen ligger, og den skal laves, første gang appen starter. Trin 10 viser de nye linjer, og trin 8 viser, hvor i filen de hører til. Det meste af `Program.cs` står der allerede: skabelonens linjer til login. Du tilføjer kun det, kravene nævner.",
        krav: [
          "`appsettings.json`: under `ConnectionStrings` står en ny linje `\"SkadeDb\": \"Data Source=Data/skader.db\"` efter `DefaultConnection` (husk kommaet mellem dem)",
          "`Program.cs` øverst: `using System.Globalization;` og de to linjer, der sætter `CultureInfo.DefaultThreadCurrentCulture` og `DefaultThreadCurrentUICulture` til `new CultureInfo(\"da-DK\")`",
          "`Program.cs` før `var app = builder.Build();`: `AddDbContextFactory<SkadeContext>` med `UseSqlite` og connection stringen `SkadeDb`",
          "`Program.cs` lige efter `var app = builder.Build();`: en `using (var scope = …)`-blok, der kalder `Migrate()` på `ApplicationDbContext` og `EnsureCreated()` på en `SkadeContext` fra fabrikken",
          "Appen starter, og filen `skader.db` ligger i mappen `Data` ({{højreklik på `Data` → **Open Folder in File Explorer**||se i Finder}})"
        ],
        tip: [
          "I JSON står der komma mellem to linjer i samme `{ }`, men ikke efter den sidste.",
          "Alle tre stykker kode i `Program.cs` står i trin 10. `using System.Globalization;` skal stå øverst sammen med de andre `using`-linjer.",
          "Får du fejlen, at `SkadeContext` ikke findes, mangler `using SkadeApp.Data;` øverst. Den har skabelonen sat ind, fordi `ApplicationDbContext` også ligger i `Data`."
        ],
        output: "Appen starter som før. I mappen Data ligger nu skader.db ved siden af app.db. Vinduet med serverens log viser CREATE TABLE \"Kunder\" og CREATE TABLE \"Skader\" første gang.",
        loesning: R`// ===== appsettings.json =====
{
  "ConnectionStrings": {
    "DefaultConnection": "DataSource=Data/app.db;Cache=Shared",
    "SkadeDb": "Data Source=Data/skader.db"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}

// ===== Program.cs =====
using System.Globalization;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SkadeApp.Components;
using SkadeApp.Components.Account;
using SkadeApp.Data;

// Dansk format på tal og beløb (fx 4.500,00 kr.).
CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("da-DK");
CultureInfo.DefaultThreadCurrentUICulture = new CultureInfo("da-DK");

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

// ---- Login: lavet af skabelonen (Individual Accounts) med ASP.NET Core Identity ----
builder.Services.AddCascadingAuthenticationState();
builder.Services.AddScoped<IdentityRedirectManager>();
builder.Services.AddScoped<AuthenticationStateProvider, IdentityRevalidatingAuthenticationStateProvider>();

builder.Services.AddAuthentication(options =>
    {
        options.DefaultScheme = IdentityConstants.ApplicationScheme;
        options.DefaultSignInScheme = IdentityConstants.ExternalScheme;
    })
    .AddIdentityCookies();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddIdentityCore<ApplicationUser>(options =>
    {
        options.SignIn.RequireConfirmedAccount = true;
        options.Stores.SchemaVersion = IdentitySchemaVersions.Version3;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddSignInManager()
    .AddDefaultTokenProviders();

builder.Services.AddSingleton<IEmailSender<ApplicationUser>, IdentityNoOpEmailSender>();

// ---- SkadeApp: kunder og skader ----
// Databasen: SQLite-filen fra appsettings.json. En fabrik laver en ny DbContext, hver gang en service beder om det.
builder.Services.AddDbContextFactory<SkadeContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("SkadeDb")));

var app = builder.Build();

// Lav databaserne, hvis de ikke findes: brugerne (med skabelonens migrations) og kunder og skader (med startdata).
using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<ApplicationDbContext>().Database.Migrate();

    var factory = scope.ServiceProvider.GetRequiredService<IDbContextFactory<SkadeContext>>();
    using var db = factory.CreateDbContext();
    db.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
}
app.UseStatusCodePagesWithReExecute("/not-found", createScopeForStatusCodePages: true);
app.UseAntiforgery();

app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

// Ekstra adresser, som login-siderne i Components/Account bruger (fx log ud).
app.MapAdditionalIdentityEndpoints();

app.Run();`,
        md2: "De to linjer med `CultureInfo` gør, at beløb vises på dansk, fx `4.500,00 kr.`, uanset hvordan computeren er sat op." },
      { t: "valg", q: "Du tilføjer en ny property i `Kunde`, starter appen, og den går ned med en fejl om en kolonne, der ikke findes. `Data/skader.db` lå der i forvejen. Hvad er årsagen?",
        svar: ["EnsureCreated laver kun databasen, når filen ikke findes. Den gamle fil har ikke den nye kolonne. Stop appen, slet Data/skader.db, og kør igen", "Propertyen skal også skrives i appsettings.json", "SQLite kan ikke have mere end fire kolonner", "NuGet-pakken er forkert"],
        ret: 0, fordi: "`EnsureCreated()` ændrer ikke en database, der allerede findes. Slet filen, så laves den forfra med den nye kolonne og startdataene. (Store projekter bruger i stedet *migrations*, som kan ændre en database uden at slette data.)" },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er EF Core, og hvorfor har du valgt SQLite?",
        svar: "EF Core er en ORM: den oversætter mellem mine C#-klasser og databasens tabeller, så jeg arbejder med objekter, og EF Core skriver SQL'en. SkadeContext har et DbSet for hver tabel. Jeg har valgt SQLite, fordi hele databasen ligger i én fil, så projektet kan køres uden en databaseserver, fx af censor. EnsureCreated laver databasen med startdata første gang.",
        noegle: ["ORM", "tabeller", "DbContext", "DbSet", "én fil", "EnsureCreated"] }
  ] },

  // ------------------------------------------------------------------
  { id: "m30l7", nr: 7, titel: "Services: interface, async og dependency injection", min: 25,
    ord: [
      ["Interface", "En kontrakt: en liste af metoder uden indhold. En klasse, der skriver `: IKundeService`, lover at have dem alle."],
      ["Dependency injection", "Programmet laver selv de objekter, en klasse har brug for, og giver dem til den. Klassen beder om dem i sin konstruktør eller med `@inject`."],
      ["AddScoped", "Registrerer en service i `Program.cs`: når nogen beder om interfacet, får de et objekt af klassen."],
      ["async / await", "`await` venter på et svar, der tager tid (fx fra databasen), uden at låse programmet. Metoden skal være `async`."],
      ["Task", "Det, en `async`-metode giver tilbage. `Task<List<Kunde>>` er et løfte om en liste af kunder, når arbejdet er færdigt."],
      ["Include", "Beder EF Core om at hente de relaterede data med, fx kundens skader."],
      ["SaveChangesAsync", "Gemmer alle ændringer i databasen. Uden den bliver intet gemt."]
    ],
    trin: [
      { t: "laes", h: "Interface: en kontrakt",
        md: "Et **interface** er en liste af metoder uden indhold: det siger **hvad** der kan gøres, ikke **hvordan**. En klasse, der skriver `: IHilsen` efter sit navn, lover at have alle metoderne. Navnet på et interface starter med stort I.",
        kode: R`IHilsen h = new DanskHilsen();
Console.WriteLine(h.Hils("Mette"));

interface IHilsen
{
    string Hils(string navn);
}

class DanskHilsen : IHilsen
{
    public string Hils(string navn)
    {
        return "Hej " + navn;
    }
}`,
        noter: [
          ["interface IHilsen", "Kontrakten: der skal være en metode `Hils`, der tager et navn og giver en tekst."],
          [": IHilsen", "`DanskHilsen` opfylder kontrakten. Mangler metoden, giver compileren en fejl."],
          ["IHilsen h = new DanskHilsen();", "Variablen har interfacets type. Koden, der bruger `h`, ved kun, at den kan hilse."]
        ],
        output: "Hej Mette" },
      { t: "forudsig",
        q: "To klasser opfylder samme interface. Hvad skriver programmet?",
        kode: R`IHilsen h = new DanskHilsen();
Console.WriteLine(h.Hils("Ali"));
h = new EngelskHilsen();
Console.WriteLine(h.Hils("Ali"));

interface IHilsen
{
    string Hils(string navn);
}

class DanskHilsen : IHilsen
{
    public string Hils(string navn) { return "Hej " + navn; }
}

class EngelskHilsen : IHilsen
{
    public string Hils(string navn) { return "Hello " + navn; }
}`,
        output: "Hej Ali\nHello Ali",
        fordi: "Linjen `h.Hils(\"Ali\")` er den samme begge gange. Det er objektet i `h`, der bestemmer, hvad der sker. Sådan kan man skifte en klasse ud uden at ændre den kode, der bruger den." },
      { t: "laes", h: "Hvorfor dine sider bruger et interface",
        md: "Dine sider skal hente og gemme kunder. De får en `IKundeService` og kender kun dens metoder. Den rigtige klasse, `KundeService`, taler med databasen.\n\nHvem laver `KundeService`-objektet? Det gør Blazor selv. Det hedder **dependency injection**: i `Program.cs` står, at den, der beder om en `IKundeService`, skal have en `KundeService`. En side beder om den med `@inject`.",
        kode: R`// Program.cs: når nogen beder om IKundeService, så giv dem en KundeService.
builder.Services.AddScoped<IKundeService, KundeService>();

// På en side (.razor):
@inject IKundeService KundeService`,
        frag: true,
        md2: "Fordelen: siderne afhænger kun af kontrakten. Vil du gemme i en anden database, skriver du en ny klasse og ændrer én linje i `Program.cs`. Siderne er uændrede. Det er det, censor mener med *løs kobling*." },
      { t: "valg", q: "En side har linjen `@inject IKundeService KundeService`. Hvor kommer objektet fra?",
        svar: ["Blazor laver en KundeService, fordi Program.cs har registreret den med AddScoped<IKundeService, KundeService>()", "Siden laver det selv med new", "Det kommer fra databasen", "Fra NuGet-pakken"],
        ret: 0, fordi: "Det er dependency injection: registreringen i `Program.cs` siger, hvilken klasse der passer til interfacet, og Blazor laver objektet og giver det til siden." },
      { t: "laes", h: "async og await: vent uden at låse",
        md: "Det tager tid at hente fra en database. Med `await` venter metoden på svaret, uden at resten af programmet står stille imens. En metode, der bruger `await`, skal være markeret `async` og give en `Task` tilbage. Navnet slutter med `Async`, så man kan se det.",
        kode: R`Console.WriteLine("Henter …");
string navn = await HentNavnAsync();
Console.WriteLine(navn);

async Task<string> HentNavnAsync()
{
    await Task.Delay(100);
    return "Mette Jensen";
}`,
        noter: [
          ["async Task<string>", "Metoden er asynkron og giver en `string`, når den er færdig."],
          ["await Task.Delay(100)", "Venter 100 millisekunder. Her efterligner det databasen, der tager tid."],
          ["await HentNavnAsync()", "Vent på svaret, og læg det i `navn`."]
        ],
        output: "Henter …\nMette Jensen" },
      { t: "forudsig",
        kode: R`Console.WriteLine("Start");
int antal = await TaelKunderAsync();
Console.WriteLine("Kunder: " + antal);

async Task<int> TaelKunderAsync()
{
    await Task.Delay(50);
    Console.WriteLine("Databasen svarer");
    return 4;
}`,
        output: "Start\nDatabasen svarer\nKunder: 4",
        fordi: "`await` venter, til metoden er færdig. Først skrives \"Start\", så kører metoden og skriver \"Databasen svarer\", og bagefter skrives antallet." },
      { t: "laes", h: "KundeService: servicen, der taler med databasen",
        md: "Her er den rigtige service. Hver metode laver sin egen korte forbindelse med fabrikken fra lektion 6, gør sit arbejde og lukker forbindelsen igen.",
        kode: R`public class KundeService : IKundeService
{
    private readonly IDbContextFactory<SkadeContext> _factory;

    public KundeService(IDbContextFactory<SkadeContext> factory)
    {
        _factory = factory;
    }

    public async Task<List<Kunde>> HentAlleAsync()
    {
        using var db = _factory.CreateDbContext();
        return await db.Kunder.Include(k => k.Skader).ToListAsync();
    }

    public async Task OpretAsync(Kunde kunde)
    {
        using var db = _factory.CreateDbContext();
        db.Kunder.Add(kunde);
        await db.SaveChangesAsync();
    }
}`,
        frag: true,
        noter: [
          ["private readonly … _factory", "Et felt: en variabel, der hører til objektet og lever, så længe objektet gør. `private`: kun klassen selv kan bruge det. `readonly`: det kan kun sættes i konstruktøren."],
          ["konstruktøren", "Servicen beder om fabrikken. Dependency injection giver den, ligesom en side får sin service."],
          ["using var db", "Laver en `SkadeContext`, som lukkes automatisk, når metoden er færdig."],
          ["Include(k => k.Skader)", "Hent kundernes skader med. Uden den er listen `Skader` tom."],
          ["ToListAsync()", "Kør SQL'en, og lav resultatet om til en `List<Kunde>`."],
          ["FirstOrDefaultAsync(k => k.Id == id)", "Bruges i `HentAsync`: finder den første kunde, der passer, eller `null`, hvis der ingen er."],
          ["FindAsync(id) og Remove", "Bruges til at rette og slette: `FindAsync` finder en række ud fra dens id, og `Remove` markerer den til sletning."],
          ["SaveChangesAsync()", "Gem ændringerne. Uden den bliver kunden ikke gemt."]
        ] },
      { t: "valg", q: "I `HentAlleAsync` står `db.Kunder.Include(k => k.Skader)`. Hvad sker der, hvis du fjerner `.Include(k => k.Skader)`?",
        svar: ["Kunderne hentes, men deres lister med skader er tomme, så fx antallet af skader viser 0", "Ingen kunder bliver hentet", "Appen kan ikke bygge", "Skaderne bliver slettet"],
        ret: 0, fordi: "EF Core henter kun det, du beder om. `Include` siger, at de relaterede skader skal med. Uden den er `Skader` den tomme liste fra `= new();`." },
      { t: "valg", q: "En kollega har skrevet `OpretAsync` uden linjen `await db.SaveChangesAsync();`. Hvad sker der, når brugeren opretter en kunde?",
        svar: ["Intet bliver gemt i databasen, så kunden er væk, når listen hentes igen", "Kunden bliver gemt to gange", "Appen går ned med det samme", "Kunden bliver gemt, men uden navn"],
        ret: 0, fordi: "`Add` fortæller kun EF Core, at kunden skal tilføjes. Det er `SaveChangesAsync` der sender det til databasen." },
      { t: "opgave", h: "Lav interfacet IKundeService", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "csharp",
        md: "Først kontrakten. Lav mappen `Services` ({{højreklik på projektet → **Add → New Folder**||højreklik på projektet → **Add → Directory**}}), og lav interfacet `IKundeService` i den ({{**Add → New Item… → Interface**||**Add → Class/Interface**, vælg **Interface**}}).",
        krav: [
          "`Services/IKundeService.cs` har `using SkadeApp.Models;`, `namespace SkadeApp.Services;` og `public interface IKundeService`",
          "`HentAlleAsync()`, der giver en `Task<List<Kunde>>`",
          "`HentAsync(int id)`, der giver en `Task<Kunde?>` (spørgsmålstegnet: kunden findes måske ikke)",
          "`OpretAsync(Kunde kunde)` og `OpdaterAsync(Kunde kunde)`, der begge giver en `Task`",
          "`SletAsync(int id)`, der giver en `Task`",
          "Projektet kan bygges uden fejl"
        ],
        tip: [
          "Et interface har kun metodernes første linje, afsluttet med semikolon. Ingen `{ }` og ingen `public` foran metoderne.",
          "`Task` uden `<…>` betyder: metoden er asynkron og giver ingenting tilbage.",
          "Den første linje i interfacet: `Task<List<Kunde>> HentAlleAsync();`"
        ],
        output: "Ingen ændring i appen endnu.",
        loesning: R`using SkadeApp.Models;

namespace SkadeApp.Services;

// Kontrakten: hvad siderne kan bede om. Siderne kender kun interfacet, ikke databasen.
public interface IKundeService
{
    Task<List<Kunde>> HentAlleAsync();
    Task<Kunde?> HentAsync(int id);
    Task OpretAsync(Kunde kunde);
    Task OpdaterAsync(Kunde kunde);
    Task SletAsync(int id);
}` },
      { t: "opgave", h: "Lav KundeService", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "csharp",
        md: "Nu den rigtige service. Lav klassen `KundeService` i `Services`. Konstruktøren og `HentAlleAsync` er skrevet for dig i kopi-feltet: de er dit mønster. De fire andre metoder skriver du selv ud fra trin 7 og kravene.",
        krav: [
          "Klassen hedder `KundeService` og skriver `: IKundeService` (startkoden har det)",
          "`HentAsync(int id)` henter én kunde med sine skader: `Include(k => k.Skader)` og så `FirstOrDefaultAsync(k => k.Id == id)`",
          "`OpretAsync(Kunde kunde)` lægger kunden i `db.Kunder` med `Add` og gemmer med `SaveChangesAsync`",
          "`OpdaterAsync(Kunde kunde)` finder den gemte kunde med `FindAsync(kunde.Id)`, stopper hvis den er `null`, sætter `Navn`, `Email` og `Telefon` og gemmer",
          "`SletAsync(int id)` finder kunden med `FindAsync`, stopper hvis den er `null`, fjerner den med `Remove` og gemmer",
          "Alle fire metoder er `public async Task…` og starter med `using var db = _factory.CreateDbContext();`, og projektet kan bygges"
        ],
        tip: [
          "Kopiér `HentAlleAsync`, og ret den. `HentAsync` er næsten den samme, bare med `FirstOrDefaultAsync(…)` i stedet for `ToListAsync()`, og typen `Task<Kunde?>`.",
          "\"Stop, hvis den er null\" skrives `if (gemt == null) return;` lige efter `FindAsync`.",
          "`OpretAsync`: tre linjer i kroppen: `using var db = …;`, `db.Kunder.Add(kunde);` og `await db.SaveChangesAsync();`"
        ],
        start: R`using Microsoft.EntityFrameworkCore;
using SkadeApp.Data;
using SkadeApp.Models;

namespace SkadeApp.Services;

// Den rigtige udgave af IKundeService. Den taler med databasen gennem EF Core.
public class KundeService : IKundeService
{
    private readonly IDbContextFactory<SkadeContext> _factory;

    // Dependency injection: Program.cs giver servicen fabrikken, når den bliver lavet.
    public KundeService(IDbContextFactory<SkadeContext> factory)
    {
        _factory = factory;
    }

    public async Task<List<Kunde>> HentAlleAsync()
    {
        // Hver metode laver sin egen korte forbindelse og lukker den igen (using).
        using var db = _factory.CreateDbContext();
        return await db.Kunder.Include(k => k.Skader).ToListAsync();
    }

    // Skriv HentAsync, OpretAsync, OpdaterAsync og SletAsync her.
}`,
        output: "Ingen ændring i appen endnu.",
        loesning: R`using Microsoft.EntityFrameworkCore;
using SkadeApp.Data;
using SkadeApp.Models;

namespace SkadeApp.Services;

// Den rigtige udgave af IKundeService. Den taler med databasen gennem EF Core.
public class KundeService : IKundeService
{
    private readonly IDbContextFactory<SkadeContext> _factory;

    // Dependency injection: Program.cs giver servicen fabrikken, når den bliver lavet.
    public KundeService(IDbContextFactory<SkadeContext> factory)
    {
        _factory = factory;
    }

    public async Task<List<Kunde>> HentAlleAsync()
    {
        // Hver metode laver sin egen korte forbindelse og lukker den igen (using).
        using var db = _factory.CreateDbContext();
        return await db.Kunder.Include(k => k.Skader).ToListAsync();
    }

    public async Task<Kunde?> HentAsync(int id)
    {
        using var db = _factory.CreateDbContext();
        return await db.Kunder.Include(k => k.Skader).FirstOrDefaultAsync(k => k.Id == id);
    }

    public async Task OpretAsync(Kunde kunde)
    {
        using var db = _factory.CreateDbContext();
        db.Kunder.Add(kunde);
        await db.SaveChangesAsync();
    }

    public async Task OpdaterAsync(Kunde kunde)
    {
        using var db = _factory.CreateDbContext();
        var gemt = await db.Kunder.FindAsync(kunde.Id);
        if (gemt == null) return;

        gemt.Navn = kunde.Navn;
        gemt.Email = kunde.Email;
        gemt.Telefon = kunde.Telefon;
        await db.SaveChangesAsync();
    }

    public async Task SletAsync(int id)
    {
        using var db = _factory.CreateDbContext();
        var kunde = await db.Kunder.FindAsync(id);
        if (kunde == null) return;

        // Kundens skader slettes automatisk med (cascade delete), fordi en skade ikke kan stå uden kunde.
        db.Kunder.Remove(kunde);
        await db.SaveChangesAsync();
    }
}`,
        md2: "`FindAsync` finder en række ud fra dens id. `Remove` markerer rækken til sletning, og først `SaveChangesAsync` sletter den. Kundens skader slettes automatisk med (cascade delete)." },
      { t: "opgave", h: "Lav SkadeService, og registrér begge services", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "csharp",
        md: "Servicen til skader er bygget på samme måde som `KundeService`. Skriv både interfacet og klassen selv, og registrér så begge services i `Program.cs` (trin 3).",
        krav: [
          "`ISkadeService` har `HentAlleAsync()` (giver `Task<List<Skade>>`), `OpretAsync(Skade skade)`, `SkiftStatusAsync(int id, SkadeStatus status)` og `SletAsync(int id)`",
          "`SkadeService : ISkadeService` får fabrikken i konstruktøren, ligesom `KundeService`",
          "`HentAlleAsync` henter alle skader med deres kunde: `Include(s => s.Kunde)`",
          "`SkiftStatusAsync` finder skaden med `FindAsync`, stopper hvis den er `null`, sætter `Status` og gemmer",
          "`Program.cs`: `using SkadeApp.Services;` øverst og to linjer med `AddScoped` lige under `AddDbContextFactory`: `IKundeService` → `KundeService` og `ISkadeService` → `SkadeService`",
          "Appen kører som før"
        ],
        tip: [
          "Kopiér `KundeService`, og ret navnene. `OpretAsync` og `SletAsync` er de samme, bare med `Skade` og `db.Skader`.",
          "`SkiftStatusAsync` ligner `OpdaterAsync`, men sætter kun én property: `skade.Status = status;`",
          "Registreringen står i trin 3: `builder.Services.AddScoped<IKundeService, KundeService>();` og det samme for skader."
        ],
        output: "Appen ser ud som før, men nu kan siderne bede om IKundeService og ISkadeService.",
        loesning: R`// ===== Services/ISkadeService.cs =====
using SkadeApp.Models;

namespace SkadeApp.Services;

public interface ISkadeService
{
    Task<List<Skade>> HentAlleAsync();
    Task OpretAsync(Skade skade);
    Task SkiftStatusAsync(int id, SkadeStatus status);
    Task SletAsync(int id);
}

// ===== Services/SkadeService.cs =====
using Microsoft.EntityFrameworkCore;
using SkadeApp.Data;
using SkadeApp.Models;

namespace SkadeApp.Services;

public class SkadeService : ISkadeService
{
    private readonly IDbContextFactory<SkadeContext> _factory;

    public SkadeService(IDbContextFactory<SkadeContext> factory)
    {
        _factory = factory;
    }

    public async Task<List<Skade>> HentAlleAsync()
    {
        using var db = _factory.CreateDbContext();
        return await db.Skader.Include(s => s.Kunde).ToListAsync();
    }

    public async Task OpretAsync(Skade skade)
    {
        using var db = _factory.CreateDbContext();
        db.Skader.Add(skade);
        await db.SaveChangesAsync();
    }

    public async Task SkiftStatusAsync(int id, SkadeStatus status)
    {
        using var db = _factory.CreateDbContext();
        var skade = await db.Skader.FindAsync(id);
        if (skade == null) return;

        skade.Status = status;
        await db.SaveChangesAsync();
    }

    public async Task SletAsync(int id)
    {
        using var db = _factory.CreateDbContext();
        var skade = await db.Skader.FindAsync(id);
        if (skade == null) return;

        db.Skader.Remove(skade);
        await db.SaveChangesAsync();
    }
}

// ===== I Program.cs, lige under AddDbContextFactory =====
// Dependency injection: når en side beder om IKundeService, får den en KundeService.
builder.Services.AddScoped<IKundeService, KundeService>();
builder.Services.AddScoped<ISkadeService, SkadeService>();`,
        md2: "`AddScoped` betyder, at hver browserfane får sit eget service-objekt, som lever, så længe fanen er åben." },
      { t: "laes", h: "Nu kan du se lagene",
        md: "Med services på plads har dit projekt alle tre lag fra lektion 1, og du har selv bygget dem:\n\n- **Siderne** (`Components/Pages`, kommer i de næste lektioner) viser data og tager imod klik. De kender kun interfacene `IKundeService` og `ISkadeService`.\n- **Services** (`Services`) bestemmer, hvordan data hentes og gemmes. Det er det eneste lag, der bruger `SkadeContext`.\n- **Modeller og database** (`Models` og `Data`) beskriver kunder og skader og gemmer dem.\n\nHvert lag taler kun med laget lige under sig. Det kaldes **lagdelt arkitektur**. Fordelen: ændrer du, hvordan data gemmes, skal du kun rette i servicen, ikke i siderne. Og hver del er lille nok til, at man kan forstå den for sig.",
        kode: R`Sider          @inject IKundeService      viser og tager imod klik
   │
Services       KundeService               henter og gemmer
   │
Database       SkadeContext + SQLite      tabeller med data`,
        sprog: "text" },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er lagdelt arkitektur, og hvordan ser man den i dit projekt?",
        svar: "Lagdelt arkitektur betyder, at programmet er delt i lag, der hver har ét ansvar. I SkadeApp viser siderne i Components/Pages data, services i mappen Services henter og gemmer data, og modellerne og databasen i Models og Data beskriver og gemmer kunder og skader. Siderne taler kun med services, aldrig direkte med databasen, så jeg kan skifte databasen ud uden at røre siderne.",
        noegle: ["ansvar", "sider", "services", "database", "skifte ud"] },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er dependency injection, og hvorfor bruger du interfaces til dine services?",
        svar: "Dependency injection betyder, at programmet selv laver de objekter, en klasse har brug for, og giver dem til den. I Program.cs registrerer jeg AddScoped<IKundeService, KundeService>(), og siderne beder om IKundeService med @inject. KundeService får på samme måde sin DbContext-fabrik i konstruktøren. Siderne kender kun interfacet, så de er løst koblet: jeg kan skifte KundeService ud med en anden klasse uden at ændre siderne.",
        noegle: ["Program.cs", "AddScoped", "@inject", "interface", "løs kobling", "konstruktør"] }
  ] },

  // ------------------------------------------------------------------
  { id: "m30lh", nr: 8, titel: "HTML: det, siderne er lavet af", min: 25,
    ord: [
      ["Tag", "Et ord i vinkelparenteser, der fortæller browseren, hvad noget er: `<h1>` er en overskrift. De fleste tags har et start-tag og et slut-tag med skråstreg: `<h1>…</h1>`."],
      ["Element", "Et start-tag, indholdet og slut-tagget tilsammen: `<p>Hej</p>` er et afsnit-element."],
      ["Attribut", "En ekstra oplysning i et start-tag, skrevet `navn=\"værdi\"`, fx `href=\"kunder\"` eller `class=\"table\"`."],
      ["class", "En attribut, der giver et element et udseende fra CSS. I din app kommer udseendet fra Bootstrap, fx `class=\"btn btn-primary\"`."],
      ["div", "En boks uden eget udseende. Bruges til at samle og placere andre elementer."],
      ["Komponent (i HTML)", "Et tag med stort forbogstav, fx `<NavLink>` eller `<EditForm>`, er ikke HTML, men en Blazor-komponent. Den laver selv HTML, når siden vises."]
    ],
    trin: [
      { t: "laes", h: "Tags: browseren får at vide, hvad noget er",
        md: "HTML er tekst med **tags** omkring. Et tag står i vinkelparenteser og fortæller browseren, hvad teksten er. De fleste tags kommer i par: et start-tag og et slut-tag med en skråstreg. Alt imellem dem hører til.",
        kode: R`<h1>Kunder</h1>
<h2>Seneste skader</h2>
<p>Her er alle selskabets kunder.</p>
<p>Udbetalt i alt: <b>4.500,00 kr.</b></p>
<a href="kunder/1">Mette Jensen</a>`,
        sprog: "html",
        noter: [
          ["<h1> … </h1>", "Den store overskrift. `<h2>` er en mindre overskrift."],
          ["<p>", "Et afsnit tekst (p for *paragraph*)."],
          ["<b>", "Fed skrift."],
          ["<a href=\"kunder/1\">", "Et link. `href` er adressen, linket fører til, og teksten mellem tags er det, man klikker på."]
        ] },
      { t: "valg", q: "Hvad viser `<a href=\"skader\">Alle skader</a>` i browseren?",
        svar: ["Et link med teksten Alle skader, der fører til adressen /skader", "Overskriften skader", "Teksten <a href=\"skader\"> på skærmen", "En knap, der sletter skader"],
        ret: 0, fordi: "`<a>` er et link. `href` er adressen, og teksten mellem start- og slut-tagget er det, brugeren ser og klikker på." },
      { t: "laes", h: "Bokse inden i hinanden og class",
        md: "Elementer kan stå **inden i** hinanden. Så står det indre element mellem det ydres start- og slut-tag. Man rykker ind, så det er nemt at se, hvad der hører til hvad.\n\n`<div>` er en boks uden eget udseende. Den bruges til at samle ting. Udseendet kommer fra attributten **class**, som peger på regler i CSS. I din app kommer de fra Bootstrap.",
        kode: R`<div class="card">
    <div class="card-body">
        <div class="text-muted">Kunder</div>
        <div class="fs-2">4</div>
    </div>
</div>

<span class="badge text-bg-success">Godkendt</span>
<button class="btn btn-primary">Opret kunde</button>`,
        sprog: "html",
        noter: [
          ["class=\"card\"", "Bootstrap: en boks med kant. `card-body` giver luft indeni."],
          ["text-muted / fs-2", "Grå tekst / stor skrift. Flere klasser skrives med mellemrum imellem."],
          ["<span>", "Som `div`, men til et lille stykke inde i en linje, fx et farvet mærke."],
          ["<button>", "En knap. `btn btn-primary` gør den til Bootstraps blå hovedknap."]
        ],
        md2: "Andre attributter, du møder: `style=\"max-width: 400px\"` skriver CSS direkte på ét element, og `title=\"…\"` er en lille tekst, der vises, når musen står over elementet." },
      { t: "orden", sprog: "html", q: "Sæt linjerne i rækkefølge, så tallet står inde i `card-body`, og `card-body` står inde i `card`.",
        linjer: [R`<div class="card">`, R`    <div class="card-body">`, R`        <div class="fs-2">13.900,00 kr.</div>`, R`    </div>`, R`</div>`],
        fordi: "Det ydre element åbnes først og lukkes sidst. Indenfor åbnes `card-body`, så kommer tallet, og `card-body` lukkes, før `card` lukkes." },
      { t: "laes", h: "Tabeller",
        md: "Kundelisten og skaderne er tabeller. En tabel er bygget af rækker (`<tr>`), og hver række har celler: `<th>` til overskrifter og `<td>` til data. Overskriftsrækken står i `<thead>`, datarækkerne i `<tbody>`.",
        kode: R`<table class="table">
    <thead>
        <tr><th>Navn</th><th>Telefon</th></tr>
    </thead>
    <tbody>
        <tr><td>Mette Jensen</td><td>22334455</td></tr>
        <tr><td>Ali Hassan</td><td>40506070</td></tr>
    </tbody>
</table>`,
        sprog: "html",
        noter: [
          ["<tr>", "En række (*table row*)."],
          ["<th> / <td>", "En overskriftscelle / en almindelig celle."],
          ["class=\"table\"", "Bootstrap giver tabellen streger og luft."],
          ["I din app", "Rækkerne i `<tbody>` laves med en `@foreach` i C#: én `<tr>` pr. kunde."]
        ] },
      { t: "orden", sprog: "html", q: "Sæt linjerne i rækkefølge, så tabellen har overskriftsrækken først og så én række med data.",
        linjer: [R`<table class="table">`, R`    <tr><th>Dato</th><th>Beløb</th></tr>`, R`    <tr><td>14-08-2026</td><td>4.500,00 kr.</td></tr>`, R`</table>`],
        fordi: "`<table>` åbner tabellen. Overskriftsrækken med `<th>` kommer før datarækken med `<td>`, og `</table>` lukker til sidst." },
      { t: "laes", h: "Felter, knapper og rullelister",
        md: "Formularer er bygget af felter, man kan skrive i, og knapper. Nogle tags har intet indhold og intet slut-tag. De lukkes med `/>` i stedet.",
        kode: R`<label>Søg</label>
<input placeholder="Skriv et navn …" />
<button type="submit">Søg</button>

<select>
    <option value="Alle">Alle</option>
    <option value="Godkendt">Godkendt</option>
</select>`,
        sprog: "html",
        noter: [
          ["<label>", "Teksten over et felt."],
          ["<input … />", "Et felt, man kan skrive i. `placeholder` er den grå hjælpetekst, der står, indtil man skriver."],
          ["type=\"submit\"", "Knappen sender formularen, den står i."],
          ["<select> og <option>", "En rulleliste. Hver `option` er en mulighed. `value` er værdien, programmet får, når den vælges."]
        ] },
      { t: "udfyld", sprog: "html", q: "Udfyld, så siden har et felt med den grå hjælpetekst `Søg …` og en knap med teksten `Søg`.",
        kode: R`<[[input]] [[placeholder]]="Søg …" />
<[[button]]>Søg</button>`,
        fordi: "`<input />` er feltet, og `placeholder` er hjælpeteksten. `<button>` er knappen; teksten mellem tags er det, der står på den." },
      { t: "laes", h: "Razor: HTML med C# og Blazor-komponenter",
        md: "En `.razor`-fil er HTML, hvor `@` skifter til C#. Det ser du i lektionen om den første side.\n\nNogle tags har **stort forbogstav**, fx `<NavLink>`, `<PageTitle>` og `<EditForm>`. De er ikke HTML. De er **Blazor-komponenter**: små færdige dele, der selv laver HTML, når siden vises. Du bruger dem, som om de var tags.\n\nSådan ser ét link i din menu ud (`Components/Layout/NavMenu.razor`):",
        kode: R`<div class="nav-item px-3">
    <NavLink class="nav-link" href="kunder">
        <span class="bi bi-plus-square-fill-nav-menu" aria-hidden="true"></span> Kunder
    </NavLink>
</div>`,
        sprog: "razor",
        noter: [
          ["<div class=\"nav-item px-3\">", "Én række i menuen. `px-3` er Bootstrap: luft i siderne."],
          ["<NavLink … href=\"kunder\">", "Blazors udgave af `<a>`. Den farver selv linket, når du står på den side."],
          ["<span class=\"bi …\">", "Det lille ikon foran teksten. `aria-hidden=\"true\"` gør, at skærmlæsere springer ikonet over."],
          ["Match=\"NavLinkMatch.All\"", "Står kun på linket til forsiden (`href=\"\"`): så lyser det kun, når man står præcis på forsiden."],
          ["<PageTitle>", "Teksten på browserens fane."]
        ],
        md2: "Længere nede i `NavMenu.razor` står `<AuthorizeView>` med links til at logge ind og ud. Den del handler om login, som du lærer i lektion 13. Lad den stå uændret indtil da." },
      { t: "valg", q: "I en `.razor`-fil står både `<div>` og `<NavLink>`. Hvordan kan du se, at `<NavLink>` er en Blazor-komponent og ikke HTML?",
        svar: ["Den starter med stort bogstav", "Den står altid øverst i filen", "Den har en class", "Det kan man ikke se"],
        ret: 0, fordi: "HTML-tags skrives med små bogstaver. Tags med stort forbogstav er komponenter, og Blazor laver dem om til almindelig HTML, når siden vises." },
      { t: "opgave", h: "Lav menuen", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "razor",
        md: "Nu ved du, hvad menuen er lavet af. Åbn `Components/Layout/NavMenu.razor` i dit projekt. Øverst står fire links fra skabelonen: **Home**, **Counter**, **Weather** og **Auth Required**. Dem skal du erstatte med dine tre sider. Linkene, der står der, er dit mønster (trin 9 viser opbygningen).",
        krav: [
                    "I `NavMenu.razor` er de fire første links (**Home**, **Counter**, **Weather** og **Auth Required**) erstattet af tre: **Overblik** til forsiden, **Kunder** til adressen `kunder` og **Skader** til adressen `skader`",
          "Resten af `NavMenu.razor`, delen med `AuthorizeView`, er uændret",
          "Appen kører, og menuen viser Overblik, Kunder og Skader"
        ],
        tip: [
          "Hvert link er en `<div class=\"nav-item px-3\">` med en `<NavLink>` indeni. Kopiér hele Home-linket tre gange, og ret teksten og `href` i hver.",
          "Forsiden har `href=\"\"` og `Match=\"NavLinkMatch.All\"`: så lyser linket kun, når du står præcis på forsiden. Kunder og Skader har kun `href=\"kunder\"` og `href=\"skader\"`.",
          "Ikonet er `<span class=\"bi …\">` foran teksten. Genbrug ikonerne fra Home, Counter og Weather."
        ],
        output: "Menuen viser Overblik, Kunder og Skader, og under dem Register og Login. Klikker du på Kunder eller Skader, står der, at siden ikke findes: dem laver du i de næste lektioner.",
        loesning: R`<div class="nav-item px-3">
    <NavLink class="nav-link" href="" Match="NavLinkMatch.All">
        <span class="bi bi-house-door-fill-nav-menu" aria-hidden="true"></span> Overblik
    </NavLink>
</div>

<div class="nav-item px-3">
    <NavLink class="nav-link" href="kunder">
        <span class="bi bi-plus-square-fill-nav-menu" aria-hidden="true"></span> Kunder
    </NavLink>
</div>

<div class="nav-item px-3">
    <NavLink class="nav-link" href="skader">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Skader
    </NavLink>
</div>`,
        md2: "`NavLink` er et link, som Blazor selv markerer med en farve, når du står på den side. `<span class=\"bi …\">` er det lille ikon foran teksten." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er forskellen på HTML, CSS og en Blazor-komponent i din app?",
        svar: "HTML bestemmer indholdet, fx overskrifter, tabeller, felter og knapper. CSS bestemmer udseendet; i min app kommer det meste fra Bootstrap gennem class-attributter som btn og table. En Blazor-komponent er et tag med stort forbogstav, fx NavLink eller EditForm, eller mine egne som StatusMaerke. Den indeholder HTML og C# og laver selv HTML, når siden vises.",
        noegle: ["indhold", "udseende", "Bootstrap", "class", "komponent", "stort forbogstav"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m30l8", nr: 9, titel: "Den første side: Overblik", min: 25,
    ord: [
      ["Razor", "Måden, man skriver HTML og C# sammen på i en `.razor`-fil. `@` skifter fra HTML til C#."],
      ["@page", "Giver siden en adresse, fx `@page \"/\"` for forsiden."],
      ["@inject", "Beder om en service: `@inject IKundeService KundeService`."],
      ["@code", "Blokken nederst i en `.razor`-fil med sidens felter og metoder."],
      ["OnInitializedAsync", "En metode, Blazor kalder, når siden åbnes. Her henter man data."],
      ["Parameter", "En property med `[Parameter]` i en komponent. Den, der bruger komponenten, giver den en værdi: `<StatusMaerke Status=\"…\" />`."],
      ["Prerendering", "Serveren tegner siden én gang som almindelig HTML, før forbindelsen er oppe. Så kører `OnInitializedAsync` to gange. Slået fra i SkadeApp."],
      ["switch-udtryk", "Vælger en værdi ud fra flere muligheder: `status switch { … => \"grøn\", _ => \"rød\" }`. `_` betyder alle andre."]
    ],
    trin: [
      { t: "laes", h: "En .razor-fil: HTML og C# sammen",
        md: "En side i Blazor er HTML med C# indimellem. Tegnet `@` skifter til C#. Her er en lille side:",
        kode: R`@page "/hej"
@inject IKundeService KundeService

<h1>Kunder</h1>

@if (kunder == null)
{
    <p>Henter …</p>
}
else
{
    @foreach (var k in kunder)
    {
        <p>@k.Navn</p>
    }
}

@code {
    private List<Kunde>? kunder;

    protected override async Task OnInitializedAsync()
    {
        kunder = await KundeService.HentAlleAsync();
    }
}`,
        sprog: "razor", frag: true,
        noter: [
          ["@page \"/hej\"", "Siden har adressen `/hej`."],
          ["@inject", "Siden får en `IKundeService`, som den kalder `KundeService`."],
          ["@if / @foreach", "Almindelig C# midt i HTML. Det, der står i krøllede parenteser, er HTML igen."],
          ["@k.Navn", "Skriver værdien ind i siden."],
          ["@code { … }", "Sidens felter og metoder."],
          ["private List<Kunde>? kunder", "Et felt på siden. `private`: kun siden selv bruger det. `?`: det må være `null`, indtil kunderne er hentet."],
          ["protected override … OnInitializedAsync", "Din egen udgave (`override`) af en metode, som Blazor kalder, når siden åbnes. Her hentes kunderne."]
        ] },
      { t: "valg", q: "Øverst i en `.razor`-fil står `@page \"/skader\"`. Hvad betyder det?",
        svar: ["Siden vises, når adressen i browseren er /skader", "Siden hedder Skader i menuen", "Siden henter skader fra databasen", "Filen skal ligge i en mappe, der hedder skader"],
        ret: 0, fordi: "`@page` giver siden en adresse. Menuen er noget andet: den står i `NavMenu.razor` og har et link til den adresse." },
      { t: "laes", h: "Mens data er på vej",
        md: "Når siden åbnes, tegner Blazor den med det samme, mens `OnInitializedAsync` stadig venter på databasen. På det tidspunkt er listen `null`. Derfor tjekker siden `@if (kunder == null)` og viser \"Henter …\". Når data er kommet, tegner Blazor siden igen, nu med listen.",
        md2: "Uden det tjek ville `foreach` prøve at gennemgå `null`, og siden ville gå ned. Spørgsmålstegnet i `List<Kunde>?` fortæller, at feltet må være `null`." },
      { t: "valg", q: "Hvorfor står der `@if (skader == null)` på overbliksiden, før tabellen tegnes?",
        svar: ["Fordi siden tegnes, før data er hentet. Indtil da er skader null, og så vises \"Henter data …\"", "Fordi der måske ikke er nogen skader i databasen", "For at skjule siden for brugere uden login", "Fordi null betyder 0"],
        ret: 0, fordi: "`OnInitializedAsync` venter på databasen, men siden tegnes med det samme. En tom database giver en tom liste, ikke `null`." },
      { t: "laes", h: "Slå prerendering fra",
        md: "Normalt tegner serveren siden to gange, når den åbnes: én gang som almindelig HTML, så den kommer hurtigt frem (det hedder **prerendering**), og én gang mere, når forbindelsen til browseren er oppe. Så kører `OnInitializedAsync` også to gange: databasen spørges to gange, og et breakpoint stopper to gange. Det forvirrer, når man fejlsøger.\n\nI SkadeApp er prerendering slået fra i `App.razor`. Så kører alt kun én gang.\n\nI `App.razor` bestemmer en property, `PageRenderMode`, hvordan siderne kører. Login-siderne i `Components/Account` skal være almindelige sider uden interaktivitet, og for dem giver den `null`. Alle andre sider bliver Interactive Server, nu uden prerendering.",
        kode: R`@code {
    [CascadingParameter]
    private HttpContext HttpContext { get; set; } = default!;

    private IComponentRenderMode? PageRenderMode =>
        HttpContext.AcceptsInteractiveRouting() ? new InteractiveServerRenderMode(prerender: false) : null;
}`,
        sprog: "razor", frag: true,
        noter: [
          ["HttpContext og [CascadingParameter]", "Oplysninger om den forespørgsel, der kører lige nu. Blazor giver dem selv til komponenten. Skabelonens kode, som du ikke skal ændre."],
          ["AcceptsInteractiveRouting()", "Sand for dine egne sider, falsk for login-siderne."],
          ["? … : null", "Er betingelsen sand, bruges det før kolonet, ellers `null` (ingen interaktivitet)."],
          ["prerender: false", "Rettelsen: skabelonen skrev bare `InteractiveServer`."],
          ["new InteractiveServerRenderMode(…)", "Et objekt, der betyder \"Interactive Server\" med de indstillinger, du giver det. `IComponentRenderMode?` er typen; `?` fordi den kan være `null`."]
        ],
        md2: "Prisen er, at siden er et kort øjeblik om at komme frem, mens forbindelsen åbnes. Det er fint i en app til sagsbehandlere." },
      { t: "ide", h: "Ret App.razor og _Imports.razor",
        md: "To små rettelser, før du laver siderne.",
        win: ["Åbn `Components/App.razor`. Find linjen `HttpContext.AcceptsInteractiveRouting() ? InteractiveServer : null;` nederst, og ret `InteractiveServer` til `new InteractiveServerRenderMode(prerender: false)`, som vist nedenfor.", "Åbn `Components/_Imports.razor`, og tilføj de to `using`-linjer nederst. Så kan alle sider bruge dine modeller og services uden at skrive `using` selv.", "Byg projektet."],
        mac: ["Åbn `Components/App.razor`. Find linjen `HttpContext.AcceptsInteractiveRouting() ? InteractiveServer : null;` nederst, og ret `InteractiveServer` til `new InteractiveServerRenderMode(prerender: false)`, som vist nedenfor.", "Åbn `Components/_Imports.razor`, og tilføj de to `using`-linjer nederst. Så kan alle sider bruge dine modeller og services uden at skrive `using` selv.", "Byg projektet."],
        kode: R`@* Components/App.razor: linjen nederst i @code *@
HttpContext.AcceptsInteractiveRouting() ? new InteractiveServerRenderMode(prerender: false) : null;

@* Components/_Imports.razor: nederst *@
@using SkadeApp.Models
@using SkadeApp.Services`,
        sprog: "razor", frag: true,
        md2: "`@using` i en `.razor`-fil er det samme som `using` i en `.cs`-fil. Linjerne i `_Imports.razor` gælder for alle `.razor`-filer i projektet.\n\nSkriv også `<html lang=\"da\">` i stedet for `<html lang=\"en\">` øverst i `App.razor`. Det fortæller browseren, at siden er på dansk." },
      { t: "laes", h: "En lille genbrugelig komponent",
        md: "Status skal vises på tre sider som et farvet mærke: grå, gul, grøn eller rød. I stedet for at skrive det tre gange laver man én **komponent**, som får en værdi udefra som **parameter**. Farven vælges med et **switch-udtryk**.\n\nHer er en anden komponent bygget på samme måde, `TypeMaerke`, der viser en skades **type** som et mærke. Din `StatusMaerke` skal du selv skrive i trin 9 ud fra dette mønster.",
        kode: R`@* Viser en skadetype som et farvet mærke. *@
<span class="badge @Farve">@Type</span>

@code {
    [Parameter] public SkadeType Type { get; set; }

    private string Farve => Type switch
    {
        SkadeType.Bil => "text-bg-primary",
        SkadeType.Indbo => "text-bg-info",
        _ => "text-bg-light"
    };
}`,
        sprog: "razor", frag: true,
        noter: [
          ["@* … *@", "En kommentar i en `.razor`-fil."],
          ["<span class=\"badge @Farve\">", "Et mærke. `badge` er Bootstraps klasse til mærker, og `@Farve` sætter farveklassen ind fra C#."],
          ["[Parameter]", "Værdien kommer udefra, når komponenten bruges: `<TypeMaerke Type=\"skade.Type\" />`."],
          ["Type switch { … }", "Vælger klassen ud fra typen. `_` betyder alle andre, her `Rejse` og `Ulykke`."],
          ["text-bg-…", "Bootstrap-klasser til farve: `secondary` er grå, `warning` gul, `success` grøn og `danger` rød. Bootstrap følger med skabelonen."]
        ] },
      { t: "forudsig",
        q: "Et switch-udtryk som i komponenten, nu med statusser og farvenavne og i et almindeligt program. Hvad skriver det?",
        kode: R`Console.WriteLine(Farve(SkadeStatus.Godkendt));
Console.WriteLine(Farve(SkadeStatus.Afvist));
Console.WriteLine(Farve(SkadeStatus.Anmeldt));

string Farve(SkadeStatus status) => status switch
{
    SkadeStatus.Anmeldt => "grå",
    SkadeStatus.Behandles => "gul",
    SkadeStatus.Godkendt => "grøn",
    _ => "rød"
};

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`,
        output: "grøn\nrød\ngrå",
        fordi: "`Godkendt` passer til linjen med \"grøn\", og `Anmeldt` til \"grå\". `Afvist` står ikke på nogen linje, så den rammer `_` og giver \"rød\"." },
      { t: "opgave", h: "Lav StatusMaerke.razor", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "razor",
        md: "Lav komponenten i mappen `Components` (ikke i `Pages`: den er ikke en side og har ingen `@page`). {{Højreklik på `Components` → **Add → Razor Component…** → `StatusMaerke.razor`.||Højreklik på `Components` → **Add → File**, og kald filen `StatusMaerke.razor`.}} Skriv den selv ud fra kravene. Trin 7 og 8 viser byggestenene.",
        krav: [
          "Filen viser et `<span>` med Bootstrap-klassen `badge` og statussen som tekst",
          "Komponenten har en parameter: `[Parameter] public SkadeStatus Status { get; set; }`",
          "En property `Farve` vælger klassen med et switch-udtryk: `text-bg-secondary` for Anmeldt, `text-bg-warning` for Behandles, `text-bg-success` for Godkendt og `text-bg-danger` for alt andet",
          "`<span>` bruger både `badge` og `Farve` i sin `class`",
          "Projektet kan bygges uden fejl"
        ],
        tip: [
          "To klasser i samme `class` står med mellemrum. Den ene kommer fra C#: `class=\"badge @Farve\"`.",
          "`TypeMaerke` i trin 7 er bygget på samme måde. Skift `Type` ud med `Status`, og giv hver status sin farveklasse.",
          "`private string Farve => Status switch { SkadeStatus.Anmeldt => \"text-bg-secondary\", … , _ => \"text-bg-danger\" };`"
        ],
        output: "Ingen ændring endnu. Komponenten bruges på overbliksiden i næste opgave.",
        loesning: R`@* En lille genbrugelig komponent: viser en status som et farvet mærke. Bruges på alle tre sider. *@
<span class="badge @Farve">@Status</span>

@code {
    [Parameter] public SkadeStatus Status { get; set; }

    private string Farve => Status switch
    {
        SkadeStatus.Anmeldt => "text-bg-secondary",
        SkadeStatus.Behandles => "text-bg-warning",
        SkadeStatus.Godkendt => "text-bg-success",
        _ => "text-bg-danger"
    };
}` },
      { t: "laes", h: "Tre små ting til visningen",
        md: "Tre ting bruges på alle dine sider, når data skal vises pænt:",
        kode: R`@skade.Beloeb.ToString("C")          4.500,00 kr.
@skade.Dato.ToString("dd-MM-yyyy")    14-08-2026
@skade.Kunde?.Navn                    Mette Jensen (eller ingenting, hvis Kunde er null)`,
        sprog: "text",
        noter: [
          ["ToString(\"C\")", "Skriver et tal som et beløb i landets valuta (C for *currency*). Med dansk opsætning: `4.500,00 kr.`"],
          ["ToString(\"dd-MM-yyyy\")", "Skriver en dato: dag, måned og år med bindestreger."],
          ["?.", "Er det til venstre `null`, gives `null` i stedet for at gå ned. På en side skrives `null` som ingenting."]
        ] },
      { t: "opgave", h: "Overblik, del 1: hent data, og vis tre tal", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "razor",
        md: "Nu skal forsiden vise rigtige data. Erstat indholdet af `Components/Pages/Home.razor` med startkoden nedenfor. HTML-delen med de tre bokse er skrevet for dig (det er Bootstrap). Du skriver C#-delen: hvor data kommer fra, og hvad der står i boksene. Trin 1 og 3 viser byggestenene.",
        krav: [
          "Øverst: `@page \"/\"` og `@inject` af både `IKundeService` og `ISkadeService`",
          "`@code` har to felter: `List<Skade>? skader` og `int antalKunder`",
          "`OnInitializedAsync` henter alle skader med `SkadeService` og tæller kunderne med `KundeService.HentAlleAsync()` og `.Count`",
          "Mens `skader` er `null`, står der `Henter data …`",
          "Boksene viser antal kunder, antal åbne skader (`Count` med `ErAaben`) og det samlede beløb for de godkendte skader skrevet som kroner (`ToString(\"C\")`)",
          "Appen viser **4** kunder, **3** åbne skader og **13.900,00 kr.** udbetalt"
        ],
        tip: [
          "Hele siden efter `<h1>` står inde i `@if (skader == null) { … } else { … }`, ligesom i trin 1.",
          "Antallet af åbne skader: `@skader.Count(s => s.ErAaben)`. Beløbet: `Where` på status `Godkendt`, så `Sum` på `Beloeb`, og til sidst `.ToString(\"C\")`.",
          "Antal kunder: `antalKunder = (await KundeService.HentAlleAsync()).Count;`. Parentesen sørger for, at listen er hentet, før der tælles."
        ],
        start: R`@* Skriv @page og de to @inject her *@

<PageTitle>Overblik</PageTitle>

<h1>Overblik</h1>

@* Vis "Henter data …", mens skader er null. Ellers boksene: *@
    <div class="row g-3 mb-4">
        <div class="col-md-4">
            <div class="card"><div class="card-body">
                <div class="text-muted">Kunder</div>
                <div class="fs-2">@* antal kunder *@</div>
            </div></div>
        </div>
        <div class="col-md-4">
            <div class="card"><div class="card-body">
                <div class="text-muted">Åbne skader</div>
                <div class="fs-2">@* antal åbne skader *@</div>
            </div></div>
        </div>
        <div class="col-md-4">
            <div class="card"><div class="card-body">
                <div class="text-muted">Udbetalt i alt</div>
                <div class="fs-2">@* summen af de godkendte skader i kroner *@</div>
            </div></div>
        </div>
    </div>

@code {
    @* felterne og OnInitializedAsync *@
}`,
        output: "Forsiden viser tre bokse: Kunder 4, Åbne skader 3 og Udbetalt i alt 13.900,00 kr.",
        loesning: R`@page "/"
@inject IKundeService KundeService
@inject ISkadeService SkadeService

<PageTitle>Overblik</PageTitle>

<h1>Overblik</h1>

@if (skader == null)
{
    <p>Henter data …</p>
}
else
{
    <div class="row g-3 mb-4">
        <div class="col-md-4">
            <div class="card"><div class="card-body">
                <div class="text-muted">Kunder</div>
                <div class="fs-2">@antalKunder</div>
            </div></div>
        </div>
        <div class="col-md-4">
            <div class="card"><div class="card-body">
                <div class="text-muted">Åbne skader</div>
                <div class="fs-2">@skader.Count(s => s.ErAaben)</div>
            </div></div>
        </div>
        <div class="col-md-4">
            <div class="card"><div class="card-body">
                <div class="text-muted">Udbetalt i alt</div>
                <div class="fs-2">@skader.Where(s => s.Status == SkadeStatus.Godkendt).Sum(s => s.Beloeb).ToString("C")</div>
            </div></div>
        </div>
    </div>
}

@code {
    private List<Skade>? skader;
    private int antalKunder;

    // Kører én gang, når siden åbnes: hent data gennem servicene.
    protected override async Task OnInitializedAsync()
    {
        skader = await SkadeService.HentAlleAsync();
        antalKunder = (await KundeService.HentAlleAsync()).Count;
    }
}`,
        md2: "`row` og `col-md-4` er Bootstrap: de lægger tre bokse ved siden af hinanden. `card` er en boks med kant." },
      { t: "opgave", h: "Overblik, del 2: skader pr. status og de seneste", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "razor",
        md: "Under de tre bokse kommer to tabeller. Skriv dem selv inde i `else`-delen, lige efter boksene. Brug `GroupBy`, `OrderByDescending` og `Take` fra lektion 4, og din `StatusMaerke` til statussen.",
        krav: [
          "Overskriften `Skader pr. status` og en tabel med kolonnerne Status, Antal og Beløb",
          "Én række pr. status: `GroupBy(s => s.Status)` sorteret med `OrderBy(g => g.Key)`. Status vises med `<StatusMaerke Status=\"gruppe.Key\" />`, antal med `Count()` og beløb med `Sum(…)` som kroner",
          "Overskriften `Seneste skader` og en tabel med Dato, Kunde, Type, Beskrivelse, Beløb og Status",
          "De fem nyeste skader: `OrderByDescending(s => s.Dato).Take(5)`. Datoen skrives `ToString(\"dd-MM-yyyy\")`, og kundens navn er et link til `kunder/@skade.KundeId`",
          "Forsiden viser fire statusrækker og fem skader med den nyeste (20-10-2026) øverst"
        ],
        tip: [
          "En tabel: `<table class=\"table\">` med `<thead>` (overskrifterne i `<th>`) og `<tbody>`, hvor en `@foreach` laver én `<tr>` pr. række med `<td>`-celler.",
          "`@foreach (var gruppe in skader.GroupBy(s => s.Status).OrderBy(g => g.Key))` og inde i rækken `@gruppe.Count()` og `@gruppe.Sum(s => s.Beloeb).ToString(\"C\")`.",
          "Kundens navn: `<a href=\"kunder/@skade.KundeId\">@skade.Kunde?.Navn</a>`. Spørgsmålstegnet: er `Kunde` `null`, skrives ingenting."
        ],
        output: "Under boksene: tabellen Skader pr. status (Anmeldt 2, Behandles 1, Godkendt 3, Afvist 1) og Seneste skader med fem skader.",
        loesning: R`@page "/"
@inject IKundeService KundeService
@inject ISkadeService SkadeService

<PageTitle>Overblik</PageTitle>

<h1>Overblik</h1>

@if (skader == null)
{
    <p>Henter data …</p>
}
else
{
    <div class="row g-3 mb-4">
        <div class="col-md-4">
            <div class="card"><div class="card-body">
                <div class="text-muted">Kunder</div>
                <div class="fs-2">@antalKunder</div>
            </div></div>
        </div>
        <div class="col-md-4">
            <div class="card"><div class="card-body">
                <div class="text-muted">Åbne skader</div>
                <div class="fs-2">@skader.Count(s => s.ErAaben)</div>
            </div></div>
        </div>
        <div class="col-md-4">
            <div class="card"><div class="card-body">
                <div class="text-muted">Udbetalt i alt</div>
                <div class="fs-2">@skader.Where(s => s.Status == SkadeStatus.Godkendt).Sum(s => s.Beloeb).ToString("C")</div>
            </div></div>
        </div>
    </div>

    <h2 class="h4">Skader pr. status</h2>
    <table class="table w-auto">
        <thead>
            <tr><th>Status</th><th>Antal</th><th class="text-end">Beløb</th></tr>
        </thead>
        <tbody>
            @* GroupBy samler skaderne i én gruppe pr. status. gruppe.Key er statussen. *@
            @foreach (var gruppe in skader.GroupBy(s => s.Status).OrderBy(g => g.Key))
            {
                <tr>
                    <td><StatusMaerke Status="gruppe.Key" /></td>
                    <td>@gruppe.Count()</td>
                    <td class="text-end">@gruppe.Sum(s => s.Beloeb).ToString("C")</td>
                </tr>
            }
        </tbody>
    </table>

    <h2 class="h4 mt-4">Seneste skader</h2>
    <table class="table">
        <thead>
            <tr><th>Dato</th><th>Kunde</th><th>Type</th><th>Beskrivelse</th><th class="text-end">Beløb</th><th>Status</th></tr>
        </thead>
        <tbody>
            @foreach (var skade in skader.OrderByDescending(s => s.Dato).Take(5))
            {
                <tr>
                    <td class="text-nowrap">@skade.Dato.ToString("dd-MM-yyyy")</td>
                    <td><a href="kunder/@skade.KundeId">@skade.Kunde?.Navn</a></td>
                    <td>@skade.Type</td>
                    <td>@skade.Beskrivelse</td>
                    <td class="text-end text-nowrap">@skade.Beloeb.ToString("C")</td>
                    <td><StatusMaerke Status="skade.Status" /></td>
                </tr>
            }
        </tbody>
    </table>
}

@code {
    private List<Skade>? skader;
    private int antalKunder;

    // Kører én gang, når siden åbnes: hent data gennem servicene.
    protected override async Task OnInitializedAsync()
    {
        skader = await SkadeService.HentAlleAsync();
        antalKunder = (await KundeService.HentAlleAsync()).Count;
    }
}`,
        md2: "`class=\"text-end\"` højrestiller beløbene. `text-nowrap` sørger for, at dato og beløb ikke deles over to linjer." },
      { t: "ide", h: "Se data komme ind med debuggeren",
        md: "Nu bruger du debuggeren til at se, hvad servicen henter.",
        win: ["Sæt et breakpoint på linjen `skader = await SkadeService.HentAlleAsync();` i `Home.razor` (klik i den grå kant til venstre for linjen).", "Start med **F5**. Browseren åbner, og Visual Studio stopper på linjen.", "Tryk **F10** (Step Over) én gang. Se i vinduet **Locals**: `skader` har nu `Count = 7`.", "Fold `skader` ud med den lille pil, og fold den første skade ud. `Kunde` er udfyldt med en kunde, fordi servicen bruger `Include(s => s.Kunde)`.", "Fortsæt med **F5**, og stop debuggeren med den røde firkant."],
        mac: ["Sæt et breakpoint på linjen `skader = await SkadeService.HentAlleAsync();` i `Home.razor` (klik i kanten ved linjenummeret).", "Start med den **grønne bille** 🐞. Browseren åbner, og Rider stopper på linjen.", "Klik på **Step Over** én gang. Se i vinduet **Threads & Variables**: `skader` har nu 7 elementer.", "Fold `skader` ud med den lille pil, og fold den første skade ud. `Kunde` er udfyldt med en kunde, fordi servicen bruger `Include(s => s.Kunde)`.", "Fortsæt med den grønne pil i Debug-vinduet, og stop debuggeren med den røde firkant."],
        md2: "Det er en god ting at vise til eksamen: et breakpoint i siden, og så kan man se, hvad der kommer fra databasen." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad sker der, fra man åbner forsiden, til tallene står på skærmen?",
        svar: "Adressen / passer til @page \"/\" i Home.razor, så Blazor laver siden og giver den IKundeService og ISkadeService med dependency injection. Siden tegnes med \"Henter data …\", og OnInitializedAsync kalder servicene. De laver en DbContext, og EF Core henter kunder og skader fra SQLite-databasen. Når data er kommet, tegnes siden igen, og LINQ regner antal, åbne skader og det udbetalte beløb ud.",
        noegle: ["@page", "@inject", "OnInitializedAsync", "service", "EF Core", "LINQ"] }
  ] }

);
})();
