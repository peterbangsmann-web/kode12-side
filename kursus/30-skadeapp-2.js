// Modul 30, del 2 af 3: lektion 5–8 (validering, database, services, første side). Se 30-skadeapp-1.js.
(function () {
const R = String.raw;
var m = window.KURSUS.filter(function (x) { return x.id === "m30"; })[0];
if (!m) return;

m.lektioner.push(

  // ------------------------------------------------------------------
  { id: "m30l5", titel: "Validering: regler på modellen", min: 20,
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
          ["TryValidateObject", "Prøver alle reglerne og lægger fejlene i listen `fejl`."]
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
      { t: "ide", h: "Sæt reglerne på dine modeller",
        md: "Nu får dine to modeller deres regler. Her er de færdige filer. Du har allerede det meste: tilføj linjen `using System.ComponentModel.DataAnnotations;` øverst og attributterne over properties.",
        win: ["Ret `Models/Kunde.cs`, så den ser ud som den første fil nedenfor.", "Ret `Models/Skade.cs`, så den ser ud som den anden fil nedenfor.", "Byg projektet."],
        mac: ["Ret `Models/Kunde.cs`, så den ser ud som den første fil nedenfor.", "Ret `Models/Skade.cs`, så den ser ud som den anden fil nedenfor.", "Byg projektet."],
        kode: R`// ===== Models/Kunde.cs =====
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
        frag: true,
        md2: "`[Range(1, 10_000_000)]` betyder: mindst 1 og højst 10 millioner. Understregningerne i tallet gør det bare nemmere at læse; C# ser bort fra dem." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvordan sikrer du, at et telefonnummer er gyldigt, før det bliver gemt?",
        svar: "Over propertyen Telefon i Kunde står en RegularExpression-attribut med mønsteret ^\\d{8}$, som betyder præcis 8 cifre og intet andet, og en Required-attribut. Formularen bruger DataAnnotationsValidator, så den tjekker reglerne, før der bliver gemt, og viser min danske fejlbesked under feltet, hvis nummeret ikke passer.",
        noegle: ["RegularExpression", "^\\d{8}$", "attribut", "Required", "fejlbesked"] }
  ] },

  // ------------------------------------------------------------------
  { id: "m30l6", titel: "Databasen: EF Core og SQLite", min: 25,
    ord: [
      ["Database", "Et program, der gemmer data i tabeller, så de er der endnu, når appen starter igen."],
      ["EF Core", "Entity Framework Core: et bibliotek, der oversætter mellem dine C#-klasser og databasens tabeller. Du skriver C#, og EF Core skriver SQL'en."],
      ["SQLite", "En database, der ligger i én fil (`skader.db`). Kræver ingen databaseserver."],
      ["NuGet-pakke", "Et færdigt bibliotek, man henter ind i sit projekt, fx `Microsoft.EntityFrameworkCore.Sqlite`."],
      ["DbContext", "Klassen, der er forbindelsen til databasen. Hvert `DbSet` i den bliver til en tabel."],
      ["DbSet", "En tabel set fra C#: `DbSet<Kunde> Kunder` er tabellen med kunder."],
      ["Connection string", "Teksten, der fortæller, hvor databasen er: `Data Source=skader.db`."],
      ["Seed data", "Startdata, som databasen fyldes med, når den laves første gang."],
      ["EnsureCreated", "Laver databasen med alle tabeller, hvis den ikke findes. Findes den, gør den ingenting."]
    ],
    trin: [
      { t: "laes", h: "Fra klasser til tabeller",
        md: "Når appen lukkes, forsvinder alt, der kun ligger i variabler. Derfor gemmes kunder og skader i en **database**.\n\nDu skriver ikke selv SQL. **EF Core** oversætter: hver klasse bliver til en tabel, hver property til en kolonne, og hvert objekt til en række. Beder du om alle kunder i C#, skriver EF Core den SQL, der henter dem.\n\nDatabasen er **SQLite**: hele databasen ligger i én fil, `skader.db`, i projektmappen. Der er ingen databaseserver at installere, og censor kan køre din zip-fil uden opsætning.",
        kode: R`C#                              Database
class Kunde                 →   tabellen Kunder
public string Navn          →   kolonnen Navn
new Kunde { Navn = "Ali" }  →   en række i Kunder`,
        sprog: "text" },
      { t: "valg", q: "Hvad gør EF Core i dit projekt?",
        svar: ["Oversætter mellem dine C#-klasser og databasens tabeller og skriver SQL'en for dig", "Tegner siderne i browseren", "Tjekker, at e-mails er gyldige", "Er selve databasefilen"],
        ret: 0, fordi: "EF Core er bindeleddet: du arbejder med objekter i C#, og EF Core gemmer og henter dem i tabellerne. Databasefilen er `skader.db`, og SQLite er databasen." },
      { t: "ide", h: "Hent EF Core til SQLite",
        md: "EF Core er ikke en del af projektet fra starten. Du henter det som en **NuGet-pakke**. Versionen skal passe til .NET 10.",
        win: ["Højreklik på projektet **SkadeApp** i Solution Explorer → **Manage NuGet Packages…**.", "Klik på fanen **Browse**, og søg efter `Microsoft.EntityFrameworkCore.Sqlite`.", "Vælg pakken, vælg version **10.0.12** i listen til højre, og klik **Install**. Godkend, hvis du bliver spurgt."],
        mac: ["Åbn terminalen i Rider (vinduet **Terminal** nederst). Den står i mappen med `SkadeApp.csproj`.", "Skriv `dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 10.0.12`, og tryk Enter.", "Vent, til der står, at pakken er tilføjet."],
        md2: "Åbn `SkadeApp.csproj` (dobbeltklik på projektet). Nu står der en linje med `PackageReference` og pakkens navn." },
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
          ["override", "Metoden findes i `DbContext`. `override` betyder: brug min udgave i stedet."],
          ["Id = 1", "Startdata skal have faste id'er, så skaden kan pege på kunden med `KundeId = 1`."],
          ["new DateTime(2026, 8, 14)", "En fast dato: 14. august 2026."]
        ] },
      { t: "valg", q: "Hvorfor har startdataene i `HasData` faste id'er, fx `Id = 1`?",
        svar: ["Så skaderne kan pege på den rigtige kunde med KundeId, og EF Core ved, hvilken række er hvilken", "Fordi id'er altid skal skrives i hånden", "For at gøre databasen hurtigere", "Fordi SQLite ikke kan tælle"],
        ret: 0, fordi: "En skade i startdataene skal vide, hvilken kunde den hører til (`KundeId = 1`). Det kræver, at kunden har et kendt id. Nye kunder, som brugeren opretter, får automatisk det næste id." },
      { t: "laes", h: "Fortæl appen, hvor databasen er",
        md: "Til sidst skal appen vide, hvor databasen ligger, og den skal laves, første gang appen starter. Det sker to steder.\n\nI `appsettings.json` står **connection string**en. I `Program.cs` registreres databasen, og `EnsureCreated()` laver filen med tabeller og startdata, hvis den ikke findes.",
        kode: R`// appsettings.json (nederst, før den sidste })
"ConnectionStrings": {
  "SkadeDb": "Data Source=skader.db"
}

// Program.cs
builder.Services.AddDbContextFactory<SkadeContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("SkadeDb")));

using (var scope = app.Services.CreateScope())
{
    var factory = scope.ServiceProvider.GetRequiredService<IDbContextFactory<SkadeContext>>();
    using var db = factory.CreateDbContext();
    db.Database.EnsureCreated();
}`,
        frag: true,
        noter: [
          ["Data Source=skader.db", "Databasen er filen `skader.db` i projektmappen."],
          ["AddDbContextFactory", "Registrerer en **fabrik**, der kan lave en ny `SkadeContext`, når en service beder om det. Den bruges i næste lektion."],
          ["UseSqlite(…)", "Brug SQLite med den connection string, der hedder `SkadeDb`."],
          ["EnsureCreated()", "Laver databasen, hvis filen ikke findes. Findes den, sker der ingenting."]
        ] },
      { t: "ide", h: "Byg databasen ind i dit projekt",
        md: "Nu laver du databasen. Det er tre filer.",
        win: ["Højreklik på projektet → **Add → New Folder** → `Data`. Højreklik på `Data` → **Add → Class…** → `SkadeContext.cs`. Skriv den første fil nedenfor.", "Åbn `appsettings.json`, og ret den, så den ser ud som den anden fil.", "Åbn `Program.cs`, og ret den, så den ser ud som den tredje fil.", "Kør appen. Den starter som før. Se i mappen med projektet (højreklik på projektet → **Open Folder in File Explorer**): nu ligger filen `skader.db` der."],
        mac: ["Højreklik på projektet → **Add → Directory** → `Data`. Højreklik på `Data` → **Add → Class/Interface** → `SkadeContext`. Skriv den første fil nedenfor.", "Åbn `appsettings.json`, og ret den, så den ser ud som den anden fil.", "Åbn `Program.cs`, og ret den, så den ser ud som den tredje fil.", "Kør appen. Den starter som før. Se i projektmappen i Finder: nu ligger filen `skader.db` der."],
        kode: R`// ===== Data/SkadeContext.cs =====
using Microsoft.EntityFrameworkCore;
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
}

// ===== appsettings.json =====
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "SkadeDb": "Data Source=skader.db"
  }
}

// ===== Program.cs =====
using System.Globalization;
using Microsoft.EntityFrameworkCore;
using SkadeApp.Components;
using SkadeApp.Data;

// Dansk format på tal, beløb og datoer (fx 4.500,00 kr. og 14-08-2026).
CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("da-DK");
CultureInfo.DefaultThreadCurrentUICulture = new CultureInfo("da-DK");

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

// Databasen: SQLite-filen fra appsettings.json. En fabrik laver en ny DbContext, hver gang en service beder om det.
builder.Services.AddDbContextFactory<SkadeContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("SkadeDb")));

var app = builder.Build();

// Lav databasen med tabeller og startdata, hvis filen ikke findes endnu.
using (var scope = app.Services.CreateScope())
{
    var factory = scope.ServiceProvider.GetRequiredService<IDbContextFactory<SkadeContext>>();
    using var db = factory.CreateDbContext();
    db.Database.EnsureCreated();
}

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
}
app.UseStatusCodePagesWithReExecute("/not-found", createScopeForStatusCodePages: true);
app.UseAntiforgery();

app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();`,
        frag: true,
        md2: "De to linjer med `CultureInfo` gør, at beløb vises på dansk, fx `4.500,00 kr.`, og datoer som `14-08-2026`, uanset hvordan computeren er sat op. Når appen kører, skriver vinduet med serverens log de SQL-sætninger, EF Core sender til databasen. Kig efter `CREATE TABLE` første gang." },
      { t: "valg", q: "Du tilføjer en ny property i `Kunde`, starter appen, og den går ned med en fejl om en kolonne, der ikke findes. `skader.db` lå der i forvejen. Hvad er årsagen?",
        svar: ["EnsureCreated laver kun databasen, når filen ikke findes. Den gamle fil har ikke den nye kolonne. Stop appen, slet skader.db, og kør igen", "Propertyen skal også skrives i appsettings.json", "SQLite kan ikke have mere end fire kolonner", "NuGet-pakken er forkert"],
        ret: 0, fordi: "`EnsureCreated()` ændrer ikke en database, der allerede findes. Slet filen, så laves den forfra med den nye kolonne og startdataene. (Store projekter bruger i stedet *migrations*, som kan ændre en database uden at slette data.)" },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er EF Core, og hvorfor har du valgt SQLite?",
        svar: "EF Core er en ORM: den oversætter mellem mine C#-klasser og databasens tabeller, så jeg arbejder med objekter, og EF Core skriver SQL'en. SkadeContext har et DbSet for hver tabel. Jeg har valgt SQLite, fordi hele databasen ligger i én fil, så projektet kan køres uden en databaseserver, fx af censor. EnsureCreated laver databasen med startdata første gang.",
        noegle: ["ORM", "tabeller", "DbContext", "DbSet", "én fil", "EnsureCreated"] }
  ] },

  // ------------------------------------------------------------------
  { id: "m30l7", titel: "Services: interface, async og dependency injection", min: 25,
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
          ["private readonly … _factory", "Et felt, der husker fabrikken. `readonly`: den kan kun sættes i konstruktøren."],
          ["konstruktøren", "Servicen beder om fabrikken. Dependency injection giver den, ligesom en side får sin service."],
          ["using var db", "Laver en `SkadeContext`, som lukkes automatisk, når metoden er færdig."],
          ["Include(k => k.Skader)", "Hent kundernes skader med. Uden den er listen `Skader` tom."],
          ["ToListAsync()", "Kør SQL'en, og lav resultatet om til en `List<Kunde>`."],
          ["SaveChangesAsync()", "Gem ændringerne. Uden den bliver kunden ikke gemt."]
        ] },
      { t: "valg", q: "I `HentAlleAsync` står `db.Kunder.Include(k => k.Skader)`. Hvad sker der, hvis du fjerner `.Include(k => k.Skader)`?",
        svar: ["Kunderne hentes, men deres lister med skader er tomme, så fx antallet af skader viser 0", "Ingen kunder bliver hentet", "Appen kan ikke bygge", "Skaderne bliver slettet"],
        ret: 0, fordi: "EF Core henter kun det, du beder om. `Include` siger, at de relaterede skader skal med. Uden den er `Skader` den tomme liste fra `= new();`." },
      { t: "valg", q: "En kollega har skrevet `OpretAsync` uden linjen `await db.SaveChangesAsync();`. Hvad sker der, når brugeren opretter en kunde?",
        svar: ["Intet bliver gemt i databasen, så kunden er væk, når listen hentes igen", "Kunden bliver gemt to gange", "Appen går ned med det samme", "Kunden bliver gemt, men uden navn"],
        ret: 0, fordi: "`Add` fortæller kun EF Core, at kunden skal tilføjes. Det er `SaveChangesAsync` der sender det til databasen." },
      { t: "ide", h: "Lav KundeService",
        md: "Nu laver du servicen til kunder: først interfacet, så klassen.",
        win: ["Højreklik på projektet → **Add → New Folder** → `Services`.", "Højreklik på `Services` → **Add → New Item… → Interface** → `IKundeService.cs`. Skriv den første fil nedenfor.", "Højreklik på `Services` → **Add → Class…** → `KundeService.cs`. Skriv den anden fil.", "Byg projektet."],
        mac: ["Højreklik på projektet → **Add → Directory** → `Services`.", "Højreklik på `Services` → **Add → Class/Interface**, vælg **Interface**, og kald den `IKundeService`. Skriv den første fil nedenfor.", "Højreklik på `Services` → **Add → Class/Interface** → `KundeService`. Skriv den anden fil.", "Byg projektet."],
        kode: R`// ===== Services/IKundeService.cs =====
using SkadeApp.Models;

namespace SkadeApp.Services;

// Kontrakten: hvad siderne kan bede om. Siderne kender kun interfacet, ikke databasen.
public interface IKundeService
{
    Task<List<Kunde>> HentAlleAsync();
    Task<Kunde?> HentAsync(int id);
    Task OpretAsync(Kunde kunde);
    Task OpdaterAsync(Kunde kunde);
    Task SletAsync(int id);
}

// ===== Services/KundeService.cs =====
using Microsoft.EntityFrameworkCore;
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
        frag: true,
        md2: "Nye ord i filen: `FirstOrDefaultAsync` finder den første kunde med det id, eller `null`, hvis der ingen er. `FindAsync` finder en række ud fra dens id. `Remove` markerer rækken til sletning. `Task` uden `<…>` betyder, at metoden ikke giver noget tilbage, når den er færdig." },
      { t: "ide", h: "Lav SkadeService, og registrér begge services",
        md: "Servicen til skader er bygget på samme måde. Bagefter registrerer du begge services i `Program.cs`.",
        win: ["Lav `ISkadeService.cs` (**Add → New Item… → Interface**) og `SkadeService.cs` (**Add → Class…**) i `Services`, og skriv koden nedenfor.", "Åbn `Program.cs`. Tilføj `using SkadeApp.Services;` øverst, og de to linjer med `AddScoped` lige under `AddDbContextFactory`.", "Kør appen. Den ser ud som før, men nu er alt klar til siderne."],
        mac: ["Lav interfacet `ISkadeService` og klassen `SkadeService` i `Services` (**Add → Class/Interface**), og skriv koden nedenfor.", "Åbn `Program.cs`. Tilføj `using SkadeApp.Services;` øverst, og de to linjer med `AddScoped` lige under `AddDbContextFactory`.", "Kør appen. Den ser ud som før, men nu er alt klar til siderne."],
        kode: R`// ===== Services/ISkadeService.cs =====
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
        frag: true,
        md2: "`AddScoped` betyder, at hver browserfane får sit eget service-objekt, som lever, så længe fanen er åben." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er dependency injection, og hvorfor bruger du interfaces til dine services?",
        svar: "Dependency injection betyder, at programmet selv laver de objekter, en klasse har brug for, og giver dem til den. I Program.cs registrerer jeg AddScoped<IKundeService, KundeService>(), og siderne beder om IKundeService med @inject. KundeService får på samme måde sin DbContext-fabrik i konstruktøren. Siderne kender kun interfacet, så de er løst koblet: jeg kan skifte KundeService ud med en anden klasse uden at ændre siderne.",
        noegle: ["Program.cs", "AddScoped", "@inject", "interface", "løs kobling", "konstruktør"] }
  ] },

  // ------------------------------------------------------------------
  { id: "m30l8", titel: "Den første side: Overblik", min: 25,
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
          ["OnInitializedAsync", "Kører, når siden åbnes: her hentes kunderne."]
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
        md: "Normalt tegner serveren siden to gange, når den åbnes: én gang som almindelig HTML, så den kommer hurtigt frem (det hedder **prerendering**), og én gang mere, når forbindelsen til browseren er oppe. Så kører `OnInitializedAsync` også to gange: databasen spørges to gange, og et breakpoint stopper to gange. Det forvirrer, når man fejlsøger.\n\nI SkadeApp er prerendering slået fra i `App.razor`. Så kører alt kun én gang.",
        kode: R`<HeadOutlet @rendermode="new InteractiveServerRenderMode(prerender: false)" />
...
<Routes @rendermode="new InteractiveServerRenderMode(prerender: false)" />`,
        sprog: "razor", frag: true,
        md2: "Prisen er, at siden er et kort øjeblik om at komme frem, mens forbindelsen åbnes. Det er fint i en app til sagsbehandlere." },
      { t: "ide", h: "Ret App.razor og _Imports.razor",
        md: "To små rettelser, før du laver siderne.",
        win: ["Åbn `Components/App.razor`. Find de to linjer med `@rendermode=\"InteractiveServer\"`, og ret dem til `@rendermode=\"new InteractiveServerRenderMode(prerender: false)\"`, som vist nedenfor.", "Åbn `Components/_Imports.razor`, og tilføj de to `using`-linjer nederst. Så kan alle sider bruge dine modeller og services uden at skrive `using` selv.", "Byg projektet."],
        mac: ["Åbn `Components/App.razor`. Find de to linjer med `@rendermode=\"InteractiveServer\"`, og ret dem til `@rendermode=\"new InteractiveServerRenderMode(prerender: false)\"`, som vist nedenfor.", "Åbn `Components/_Imports.razor`, og tilføj de to `using`-linjer nederst. Så kan alle sider bruge dine modeller og services uden at skrive `using` selv.", "Byg projektet."],
        kode: R`<!-- Components/App.razor: de to linjer -->
<HeadOutlet @rendermode="new InteractiveServerRenderMode(prerender: false)" />
<Routes @rendermode="new InteractiveServerRenderMode(prerender: false)" />

<!-- Components/_Imports.razor: nederst -->
@using SkadeApp.Models
@using SkadeApp.Services`,
        sprog: "razor", frag: true,
        md2: "Skriv også `<html lang=\"da\">` i stedet for `<html lang=\"en\">` øverst i `App.razor`. Det fortæller browseren, at siden er på dansk." },
      { t: "laes", h: "En lille genbrugelig komponent",
        md: "Status vises på tre sider som et farvet mærke: grå, gul, grøn eller rød. I stedet for at skrive det tre gange laver du én **komponent**, `StatusMaerke`, som får statussen som **parameter**. Farven vælges med et **switch-udtryk**.",
        kode: R`@* En lille genbrugelig komponent: viser en status som et farvet mærke. Bruges på alle tre sider. *@
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
}`,
        sprog: "razor", frag: true,
        noter: [
          ["@* … *@", "En kommentar i en `.razor`-fil."],
          ["[Parameter]", "Værdien kommer udefra: `<StatusMaerke Status=\"skade.Status\" />`."],
          ["Status switch { … }", "Vælger farven ud fra statussen. `_` betyder alle andre, her `Afvist`."],
          ["text-bg-success", "Bootstrap-klasser, der giver mærket farve. Bootstrap følger med skabelonen."]
        ] },
      { t: "forudsig",
        q: "Samme switch-udtryk som i komponenten, bare i et almindeligt program. Hvad skriver det?",
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
      { t: "ide", h: "Lav StatusMaerke.razor",
        md: "Lav komponenten i mappen `Components` (ikke i `Pages`, for den er ikke en side og har ingen `@page`). Koden står i trin 7.",
        win: ["Højreklik på mappen `Components` → **Add → Razor Component…** → `StatusMaerke.razor` → **Add**.", "Erstat indholdet med koden fra trin 7.", "Byg projektet."],
        mac: ["Højreklik på mappen `Components` → **Add → File**, og kald filen `StatusMaerke.razor`.", "Skriv koden fra trin 7.", "Byg projektet."],
        md2: "Filnavnet bliver komponentens navn. Derfor kan de andre sider skrive `<StatusMaerke … />`." },
      { t: "ide", h: "Lav overbliksiden",
        md: "Nu skal forsiden vise rigtige data. Erstat hele indholdet af `Components/Pages/Home.razor` med koden nedenfor, og kør appen.",
        win: ["Åbn `Components/Pages/Home.razor`, og erstat indholdet med koden nedenfor.", "Kør appen. Forsiden skal vise **4** kunder, **3** åbne skader og **13.900,00 kr.** udbetalt i alt.", "Tabellen **Skader pr. status** viser fire rækker, og **Seneste skader** viser fem skader med den nyeste øverst."],
        mac: ["Åbn `Components/Pages/Home.razor`, og erstat indholdet med koden nedenfor.", "Kør appen. Forsiden skal vise **4** kunder, **3** åbne skader og **13.900,00 kr.** udbetalt i alt.", "Tabellen **Skader pr. status** viser fire rækker, og **Seneste skader** viser fem skader med den nyeste øverst."],
        kode: R`@page "/"
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
                    <td class="text-nowrap">@skade.Dato.ToShortDateString()</td>
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
        sprog: "razor", frag: true,
        md2: "`ToString(\"C\")` skriver et beløb som kroner: `4.500,00 kr.` `ToShortDateString()` skriver datoen som `14-08-2026`. `@skade.Kunde?.Navn`: spørgsmålstegnet betyder, at hvis `Kunde` er `null`, skrives ingenting i stedet for at gå ned. `class=\"…\"` er Bootstrap: `card` er en boks, `row` og `col-md-4` lægger tre bokse ved siden af hinanden." },
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
