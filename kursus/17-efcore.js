// Modul 17 — Entity Framework Core: code first og CRUD. Forudsætter: modul 0–16.
// Al EF-kode er afprøvet i et rigtigt MVC-projekt (.NET 10, EF Core 10.0.12) med SQLite: modeller, DbContext,
// migrationer, scaffolding (dotnet aspnet-codegenerator), CRUD over HTTP, relationer, HasData og fejlbeskederne.
// SQL Server-udgaven (UseSqlServer, LocalDB-connection string) er bygget og har fået lavet sine migrationer,
// men er ikke kørt mod LocalDB (ingen Windows i testmiljøet).
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m17", nr: 17, del: "Del 5 · ASP.NET Core", ikon: "🗄️",
  titel: "Entity Framework Core: code first og CRUD",
  dag: "Kursusdag 14 · MVC Core med code first",
  intro: "I modul 12 skrev du SQL i hånden, og i modul 16 lavede du sider med MVC. Nu kobler du de to sammen. **Entity Framework Core** (EF Core) lader dig arbejde med almindelige C#-objekter, mens den selv skriver SQL'en og laver databasen ud fra dine klasser.\n\nGennem hele modulet bygger du **én** app, `FirmaApp`, med afdelinger og medarbejdere: fra tom skabelon til en side, hvor man kan oprette, se, rette og slette — gemt i en rigtig database. På Windows bruger du **LocalDB**, på Mac **SQLite**. Det er præcis det fundament, dit eksamensprojekt står på.",
  video: ["14_Tors_MVCCore_CodeFirst.mp4 (4 t 9 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m17l1", titel: "ORM: klasser bliver til tabeller", min: 17,
    ord: [
      ["Entity Framework Core (EF Core)", "Microsofts bibliotek, der lader C#-kode arbejde med en database gennem almindelige objekter. Det skriver SQL'en for dig."],
      ["ORM", "Object-Relational Mapper. Et værktøj, der oversætter mellem objekter i koden og rækker i databasens tabeller."],
      ["Code first", "Man skriver C#-klasserne først, og EF Core laver databasen ud fra dem. Det modsatte (database first) kommer i modul 18."],
      ["Entitet", "En modelklasse, som EF Core gemmer i en tabel, fx `Department`. Ét objekt = én række."],
      ["DbContext", "Klassen, der er din forbindelse til databasen. Du laver din egen, der arver fra `DbContext`."],
      ["DbSet", "En property i din DbContext, der står for én tabel, fx `DbSet<Department> Departments`."],
      ["NuGet-pakke", "Et færdigt bibliotek, man henter ind i sit projekt. EF Core er ikke med i MVC-skabelonen og skal hentes som pakker."],
      ["Provider", "Den del af EF Core, der kan tale med én bestemt slags database: SQL Server (Windows) eller SQLite (Mac)."]
    ],
    trin: [
      { t: "laes", h: "Problemet: C# taler objekter, databasen taler tabeller",
        md: "I modul 12 lagde du data i tabeller med SQL: `INSERT`, `SELECT`, `UPDATE`, `DELETE`. I modul 16 lavede du sider, hvor data lå i en `List` i hukommelsen — og forsvandt, når programmet stoppede.\n\nEt rigtigt webprogram skal gemme sine data i en **database**. Men C# arbejder med **objekter**, og databasen arbejder med **rækker i tabeller**. Uden hjælp skal du selv skrive SQL som tekst, sende den af sted og flytte hver kolonne over i en property. Det er meget kode, og en stavefejl i SQL-teksten opdages først, når programmet kører.\n\nEn **ORM** (Object-Relational Mapper) gør det arbejde for dig. Microsofts ORM hedder **Entity Framework Core**, forkortet **EF Core**. Du arbejder med objekter. EF Core oversætter til SQL og tilbage." },
      { t: "laes", h: "Klasse → tabel, property → kolonne, objekt → række",
        md: "Med **code first** begynder du med en helt almindelig klasse i mappen `Models`. EF Core laver bagefter en tabel ud fra den. Her er den første klasse i FirmaApp:",
        kode: R`using System.ComponentModel.DataAnnotations;

namespace FirmaApp.Models
{
    public class Department
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; } = "";
    }
}`,
        omkring: ["", "class __Start { static void Main() { } }"],
        noter: [
          ["public class Department", "Klassen bliver til en tabel (navnet `Departments` kommer fra DbContext, trin 5). Et objekt af klassen bliver til én række."],
          ["public int Id { get; set; }", "En property, der hedder `Id` (eller `DepartmentId`), bliver automatisk tabellens **primærnøgle**. Databasen giver selv rækkerne numre 1, 2, 3 …"],
          ["[Required]", "Kolonnen må ikke være tom (`NOT NULL`). Attributten kender du fra validering i modul 16 — EF Core bruger den også."],
          ["[StringLength(50)]", "Højst 50 tegn. På SQL Server bliver kolonnen `nvarchar(50)`."],
          ["= \"\";", "Startværdien er en tom tekst, så `Name` aldrig er `null`. Så slipper du for en gul advarsel."]
        ],
        md2: "Reglen at huske:\n\n- **klasse** → tabel\n- **property** → kolonne\n- **objekt** → række\n- `Id` → primærnøgle" },
      { t: "valg", q: "Klassen `Department` har en property `public int Id { get; set; }`. Hvad gør EF Core med den?",
        svar: ["Den bliver tabellens primærnøgle, og databasen giver selv hver række et nyt tal", "Ingenting — man skal selv skrive `PRIMARY KEY` i SQL", "Den bliver en fremmednøgle til en anden tabel", "Den bliver ikke gemt, fordi den er et tal"],
        ret: 0, fordi: "EF Core kigger efter en property, der hedder `Id` eller klassens navn plus `Id` (`DepartmentId`). Den bliver primærnøgle og tæller selv op. Hedder nøglen noget andet, fx `DId`, skal du sætte `[Key]` over den — det gjorde underviseren med `CId` i sit eksempel." },
      { t: "forudsig",
        kode: R`Department d = new Department();
d.Name = "Salg";
Console.WriteLine(d.Id);
Console.WriteLine(d.Name);

class Department
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
}`,
        output: "0\nSalg",
        fordi: "Et nyt objekt har `Id` = 0, for en `int` starter på 0. Det er først, når objektet bliver **gemt** i databasen, at databasen giver det et rigtigt nummer. EF Core skriver bagefter nummeret tilbage i objektets `Id`. Så når du opretter noget, lader du `Id` være." },
      { t: "laes", h: "DbContext: din forbindelse til databasen",
        md: "Klassen `Department` ved intet om databaser. Forbindelsen er en klasse mere, som du selv skriver: en **DbContext**. Den arver fra EF Cores klasse `DbContext` (arv fra modul 5) og har én **DbSet** pr. tabel.\n\nUnderviseren lagde den i `Models`. Her ligger den i en ny mappe, `Data`, så modeller og database er adskilt. Begge dele virker.",
        kode: R`using FirmaApp.Models;
using Microsoft.EntityFrameworkCore;

namespace FirmaApp.Data
{
    public class FirmaContext : DbContext
    {
        public FirmaContext(DbContextOptions<FirmaContext> options) : base(options)
        {
        }

        public DbSet<Department> Departments { get; set; }
    }
}`,
        frag: true,
        noter: [
          ["using Microsoft.EntityFrameworkCore;", "Her ligger `DbContext` og `DbSet`. Linjen virker først, når pakkerne er installeret."],
          ["class FirmaContext : DbContext", "Din egen databaseklasse. Den **er en** DbContext og arver alt det, der kan tale med databasen."],
          ["DbContextOptions<FirmaContext> options", "Indstillingerne: hvilken database og hvilken connection string. De bliver givet til konstruktøren udefra (lektion 2)."],
          [": base(options)", "Constructor chaining fra modul 5: send indstillingerne videre til superklassen `DbContext`, som skal bruge dem. Kroppen er tom."],
          ["DbSet<Department> Departments", "Tabellen. Navnet på propertyen, `Departments`, bliver tabellens navn i databasen."]
        ] },
      { t: "udfyld", q: "Udfyld databaseklassen, så den arver fra EF Core og har en tabel med afdelinger.",
        kode: R`public class FirmaContext : [[DbContext]]
{
    public FirmaContext(DbContextOptions<FirmaContext> options) : [[base]](options)
    {
    }

    public [[DbSet]]<Department> Departments { get; set; }
}`,
        frag: true,
        fordi: "`: DbContext` er arven. `: base(options)` sender indstillingerne videre til superklassen. `DbSet<Department>` er tabellen. Glemmer du `: base(options)`, kan projektet godt bygges, men bagefter stopper alt med fejlen **No database provider has been configured for this DbContext** — DbContext har aldrig fået at vide, hvilken database den skal bruge." },
      { t: "valg", q: "I `FirmaContext` står `public DbSet<Department> Departments { get; set; }`. Hvad bliver tabellen i databasen kaldt?",
        svar: ["`Departments` — navnet på DbSet-propertyen", "`Department` — navnet på klassen", "`FirmaContext` — navnet på databaseklassen", "`DbSet` — typen"],
        ret: 0, fordi: "EF Core bruger propertyens navn. Derfor skriver man det i **flertal**: én `Department`-klasse, en tabel med mange `Departments`." },
      { t: "laes", h: "Pakkerne: EF Core skal hentes",
        md: "MVC-skabelonen har ikke EF Core med. Det er delt op i **NuGet-pakker**, så du kun henter det, du skal bruge:\n\n- **Provideren**: den del, der taler med din database. Windows: `Microsoft.EntityFrameworkCore.SqlServer` (LocalDB er en lille SQL Server). Mac: `Microsoft.EntityFrameworkCore.Sqlite`.\n- `Microsoft.EntityFrameworkCore.Tools`: kommandoerne til migrationer i Visual Studio (lektion 3).\n- `Microsoft.EntityFrameworkCore.Design`: det, kommandoerne bruger til at læse dine klasser.\n\nSelve `Microsoft.EntityFrameworkCore` kommer automatisk med provideren.\n\nSkriv **versionen** med: `10.0.12`. Så får du en udgave, der passer til .NET 10, også når der kommer en nyere.",
        win: ["Åbn **Tools → NuGet Package Manager → Package Manager Console**. Et vindue åbner nederst, og linjen begynder med `PM>`.", "Skriv `Install-Package Microsoft.EntityFrameworkCore.SqlServer -Version 10.0.12` og tryk Enter.", "Skriv `Install-Package Microsoft.EntityFrameworkCore.Tools -Version 10.0.12` og tryk Enter. (Pil op henter den forrige linje, så du kun skal rette navnet.)", "Skriv `Install-Package Microsoft.EntityFrameworkCore.Design -Version 10.0.12` og tryk Enter.", "Tjek i **Solution Explorer** under **Dependencies → Packages**, at alle tre er der."],
        mac: ["Åbn Riders **Terminal** (fanen nederst i vinduet). Den står i projektets mappe.", "Skriv `dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 10.0.12` og tryk Enter.", "Skriv `dotnet add package Microsoft.EntityFrameworkCore.Tools --version 10.0.12` og tryk Enter.", "Skriv `dotnet add package Microsoft.EntityFrameworkCore.Design --version 10.0.12` og tryk Enter.", "Tjek i **Explorer**, at alle tre står under **Dependencies** (fold mapperne ud). Eller dobbeltklik på `FirmaApp.csproj`: der skal stå tre linjer med `PackageReference`."] },
      { t: "valg", q: "Du laver projektet på din Mac. Hvilken provider-pakke skal du bruge?",
        svar: ["`Microsoft.EntityFrameworkCore.Sqlite`", "`Microsoft.EntityFrameworkCore.SqlServer`", "`Microsoft.EntityFrameworkCore.Tools`", "`Microsoft.EntityFrameworkCore.Mac`"],
        ret: 0, fordi: "LocalDB findes kun på Windows. På Mac bruger du **SQLite**: hele databasen er én fil i projektmappen. Resten af koden er den samme — kun provideren og connection stringen er forskellige." },
      { t: "ide", h: "Opret FirmaApp med den første model",
        md: "Lav projektet, som hele modulet bygger videre på. Skriv koden selv — kopiér ikke.",
        win: ["**Create a new project** → søg efter **ASP.NET Core Web App (Model-View-Controller)** → Next.", "Navn: `FirmaApp` → Next.", "Framework: **.NET 10.0**. Authentication type: **None**. Fjern fluebenet ved **Configure for HTTPS**. Lad **Do not use top-level statements** være uden flueben → Create.", "Installér de tre pakker fra trin 8 i Package Manager Console.", "Højreklik på mappen **Models** → **Add → Class…** → `Department.cs`. Skriv klassen fra trin 2.", "Højreklik på projektet → **Add → New Folder** → `Data`. Højreklik på `Data` → **Add → Class…** → `FirmaContext.cs`. Skriv klassen fra trin 5.", "Byg med **Build → Build Solution**. Der må ikke være røde fejl i **Error List**."],
        mac: ["**File → New Solution…** → vælg **ASP.NET Core Web Application** → type **Web App (Model-View-Controller)**, navn `FirmaApp`, framework **net10.0** → Create. (Kan du ikke finde skabelonen, så skriv `dotnet new mvc -n FirmaApp --no-https` i Terminal og åbn mappen i Rider.)", "Installér de tre pakker fra trin 8 i Terminal.", "Højreklik på mappen **Models** → **Add → Class/Interface** → `Department`. Skriv klassen fra trin 2.", "Højreklik på projektet → **Add → Directory** → `Data`. Lav klassen `FirmaContext` i den, og skriv koden fra trin 5.", "Byg med hammeren (**Build**). Der må ikke være røde fejl i **Problems**."],
        md2: "Projektet kører endnu præcis som før — der er ingen database endnu. Det kommer i de næste to lektioner." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er en ORM, og hvad betyder code first?",
        svar: "En **ORM** som Entity Framework Core oversætter mellem **objekter** i C# og **rækker i tabeller** i en relationel database, så jeg ikke selv skal skrive SQL. Med **code first** skriver jeg modelklasserne først — fx `Department` med `Id` og `Name` — og EF Core laver tabellerne ud fra dem: klassen bliver til en tabel, hver property til en kolonne, hvert objekt til en række. Forbindelsen til databasen er min egen klasse, der arver fra `DbContext`, med en `DbSet` pr. tabel.",
        noegle: ["objekter", "tabeller", "SQL", "modelklasser", "DbContext", "DbSet"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m17l2", titel: "Connection string og Program.cs", min: 17,
    ord: [
      ["Connection string", "En tekst, der fortæller, hvilken database programmet skal forbinde til, og hvordan."],
      ["appsettings.json", "Projektets indstillingsfil i JSON-format. Connection strings står under `\"ConnectionStrings\"`."],
      ["LocalDB", "En lille udgave af SQL Server, der følger med Visual Studio på Windows. Adressen er `(localdb)\\MSSQLLocalDB`."],
      ["SQLite", "En database, der ligger i én fil. Bruges på Mac, hvor LocalDB ikke findes."],
      ["Service", "Et objekt, som ASP.NET Core laver og deler ud til de klasser, der beder om det. Man registrerer det i `Program.cs` med `builder.Services.Add…`."],
      ["Dependency injection (DI)", "En klasse laver ikke selv de objekter, den er afhængig af. Den beder om dem i sin konstruktør, og nogen andre giver dem."],
      ["AddDbContext", "Registrerer din DbContext som en service, så controllerne kan få den. Her siger man også, hvilken database der skal bruges."]
    ],
    trin: [
      { t: "laes", h: "Hvor ligger databasen? Connection stringen",
        md: "`FirmaContext` ved endnu ikke, *hvilken* database den skal bruge. Det står i en **connection string**: en tekst med adressen på databasen. Den skal ikke stå inde i koden, men i indstillingsfilen `appsettings.json`.\n\nÅbn filen. Sæt et komma efter linjen med `\"AllowedHosts\"`, og tilføj afsnittet `\"ConnectionStrings\"`. Sådan ser hele filen ud på **Windows** med LocalDB:",
        sprog: "js",
        kode: R`{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "FirmaContext": "Server=(localdb)\\MSSQLLocalDB;Database=FirmaAppDB;Trusted_Connection=True;TrustServerCertificate=True"
  }
}`,
        noter: [
          ["\"FirmaContext\":", "Navnet på connection stringen. Du finder selv på det; her hedder den det samme som databaseklassen."],
          ["Server=(localdb)\\\\MSSQLLocalDB", "Serveren: LocalDB på din egen pc. **To** omvendte skråstreger — se næste trin."],
          ["Database=FirmaAppDB", "Navnet på databasen, der bliver lavet. Du har måske allerede en `FirmaDB` fra undervisningen, så denne hedder noget andet."],
          ["Trusted_Connection=True", "Log ind med din Windows-bruger. Ingen adgangskode i filen."],
          ["TrustServerCertificate=True", "Stol på serverens certifikat. Uden den kan du få en fejl om certifikatet."],
          ["Mac: \"FirmaContext\": \"Data Source=firma.db\"", "På Mac er hele linjen bare den. SQLite laver filen `firma.db` i projektmappen."]
        ],
        md2: "Brug **aldrig** `Server=.` — det betyder en fuld SQL Server installeret på maskinen, og sådan en har du ikke. LocalDB er `(localdb)\\MSSQLLocalDB`." },
      { t: "valg", q: "Hvorfor står der `(localdb)\\\\MSSQLLocalDB` med **to** omvendte skråstreger i `appsettings.json`, når serveren hedder `(localdb)\\MSSQLLocalDB` med én?",
        svar: ["I JSON betyder én omvendt skråstreg noget særligt, så en rigtig skråstreg skal skrives som to", "Fordi LocalDB har to servere", "Det er en tastefejl, der tilfældigvis virker", "Fordi Windows altid kræver to"],
        ret: 0, fordi: "Det er samme regel som i C#-tekster: `\\n` betyder linjeskift, og `\\\\` betyder én skråstreg. Med kun én skråstreg kan filen slet ikke læses, og programmet stopper ved start." },
      { t: "fejl", sprog: "js", frag: true,
        q: "Programmet stopper, så snart det starter, med en fejl om, at `appsettings.json` ikke kan læses. Klik på linjen med fejlen.",
        kode: R`{
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "FirmaContext": "Server=(localdb)\MSSQLLocalDB;Database=FirmaAppDB;Trusted_Connection=True;TrustServerCertificate=True"
  }
}`,
        linje: 4,
        fordi: "Der står kun **én** omvendt skråstreg før `MSSQLLocalDB`. I JSON starter `\\` en særlig tegnkode, og `\\M` findes ikke. Skriv to: `(localdb)\\\\MSSQLLocalDB`.",
        rettet: R`{
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "FirmaContext": "Server=(localdb)\\MSSQLLocalDB;Database=FirmaAppDB;Trusted_Connection=True;TrustServerCertificate=True"
  }
}` },
      { t: "laes", h: "Program.cs, linje for linje",
        md: "Nu skal de to filer kobles sammen: databaseklassen og connection stringen. Det sker i `Program.cs`, hvor hele webprogrammet bliver sat op og startet. Til eksamen kan du blive bedt om at forklare hver linje, så her er de alle. Det nye er linjen med `AddDbContext` og de to `using`-linjer øverst.",
        kode: R`using FirmaApp.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<FirmaContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("FirmaContext")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

app.Run();`,
        frag: true,
        noter: [
          ["using FirmaApp.Data;", "Så `Program.cs` kan se `FirmaContext`. Visual Studio og Rider tilbyder selv linjen, når der er en rød streg."],
          ["using Microsoft.EntityFrameworkCore;", "Her ligger `UseSqlServer` og `UseSqlite`."],
          ["WebApplication.CreateBuilder(args)", "Laver en **builder**: objektet, man sætter programmet op med, før det startes. Den læser også `appsettings.json`."],
          ["builder.Services.AddControllersWithViews()", "Registrerer MVC: controllere og views. Linjen, der gør projektet til et MVC-projekt."],
          ["builder.Services.AddDbContext<FirmaContext>(…)", "**Det nye.** Registrerer `FirmaContext` som en service, så controllere kan få den."],
          ["options => options.UseSqlServer(…)", "En lambda (modul 10): \"når du laver indstillingerne, så brug SQL Server\". **Mac:** `options.UseSqlite(…)`."],
          ["builder.Configuration.GetConnectionString(\"FirmaContext\")", "Slår connection stringen med navnet `FirmaContext` op i `appsettings.json`. Navnet skal staves præcis som i filen."],
          ["var app = builder.Build();", "Bygger selve webprogrammet ud fra opsætningen. Efter denne linje kan der ikke tilføjes flere services."],
          ["if (!app.Environment.IsDevelopment()) { … UseExceptionHandler … }", "Kører programmet **ikke** på din egen maskine, vises en pæn fejlside i stedet for den tekniske."],
          ["app.UseRouting();", "Slår adressen op og finder ud af, hvilken controller og action der skal køre."],
          ["app.UseAuthorization();", "Tjekker adgang. Bliver vigtig med login i modul 20."],
          ["app.MapStaticAssets();", "Gør filerne i `wwwroot` (CSS, JavaScript, billeder) tilgængelige for browseren."],
          ["MapControllerRoute(… \"{controller=Home}/{action=Index}/{id?}\")", "Standard-ruten fra modul 16: `/Departments/Details/3` → `DepartmentsController`, action `Details`, `id` = 3."],
          ["app.Run();", "Starter webserveren. Den kører, indtil du stopper den."]
        ] },
      { t: "udfyld", frag: true, q: "Registrér databaseklassen i `Program.cs`, så den bruger SQL Server med connection stringen `FirmaContext`.",
        kode: R`builder.Services.[[AddDbContext]]<FirmaContext>(options =>
    options.[[UseSqlServer]](builder.Configuration.[[GetConnectionString]]("FirmaContext")));`,
        fordi: "`AddDbContext` registrerer servicen, `UseSqlServer` vælger databasen (på Mac: `UseSqlite`), og `GetConnectionString` henter teksten fra `appsettings.json`." },
      { t: "laes", h: "Dependency injection: controlleren beder om databasen",
        md: "Hvorfor registrere `FirmaContext` som en **service**? Fordi controlleren ikke selv skal lave den med `new`. Den **beder om** den i sin konstruktør, og ASP.NET Core giver den. Det hedder **dependency injection** (DI): afhængigheden bliver *sprøjtet ind* udefra.\n\nSådan begynder den controller, du får i lektion 4:",
        kode: R`public class DepartmentsController : Controller
{
    private readonly FirmaContext _context;

    public DepartmentsController(FirmaContext context)
    {
        _context = context;
    }
}`,
        frag: true,
        noter: [
          ["private readonly FirmaContext _context;", "Et felt til databaseobjektet. `readonly` betyder: kan kun sættes i konstruktøren og aldrig ændres bagefter."],
          ["public DepartmentsController(FirmaContext context)", "Konstruktøren **beder om** en `FirmaContext`. Controlleren siger ikke `new FirmaContext(…)` nogen steder."],
          ["_context = context;", "Gem objektet i feltet, så alle actions kan bruge det."]
        ],
        md2: "Hver gang en side bliver bedt om, laver ASP.NET Core en ny controller — og en ny `FirmaContext` med de indstillinger, du skrev i `AddDbContext`. Når siden er sendt, bliver begge smidt væk. Så holder ingen forbindelse sig åben unødigt.\n\nFordelen: controlleren ved ikke, om databasen er LocalDB eller SQLite. Det bestemmes ét sted, i `Program.cs`." },
      { t: "forudsig",
        q: "Her er dependency injection uden ASP.NET Core: et lille konsolprogram, hvor de første to linjer gør det, som ASP.NET Core ellers gør for dig. Hvad skriver programmet?",
        kode: R`var lager = new AfdelingsLager();
var controller = new AfdelingController(lager);
controller.Index();

class AfdelingsLager
{
    public List<string> Navne = new List<string> { "Salg", "Lager" };
}

class AfdelingController
{
    private readonly AfdelingsLager _lager;

    public AfdelingController(AfdelingsLager lager)
    {
        _lager = lager;
    }

    public void Index()
    {
        foreach (string navn in _lager.Navne)
        {
            Console.WriteLine(navn);
        }
    }
}`,
        output: "Salg\nLager",
        fordi: "`AfdelingController` laver ikke selv sit lager. Det bliver givet til konstruktøren (linje 2) og gemt i `_lager`. `Index` bruger det bagefter. I MVC er det præcis sådan, `DepartmentsController` får sin `FirmaContext` — bare uden at du selv skriver de første to linjer." },
      { t: "valg", q: "Du kører FirmaApp og klikker på en side med afdelinger. Du får fejlen: `Unable to resolve service for type 'FirmaApp.Data.FirmaContext' while attempting to activate 'FirmaApp.Controllers.DepartmentsController'`. Hvad mangler?",
        svar: ["Linjen `builder.Services.AddDbContext<FirmaContext>(…)` i `Program.cs`", "Connection stringen i `appsettings.json`", "En migration", "`[Required]` på `Name`"],
        ret: 0, fordi: "Beskeden siger: \"jeg skulle lave en `DepartmentsController`, og den beder om en `FirmaContext`, men sådan en service kender jeg ikke\". Den er aldrig registreret. Afprøvet: uden `AddDbContext`-linjen kommer præcis den besked." },
      { t: "ide", h: "Kobl databasen på FirmaApp",
        md: "Tilføj connection stringen og servicen i dit projekt fra lektion 1.",
        win: ["Åbn `appsettings.json`, og tilføj afsnittet `\"ConnectionStrings\"` fra trin 1 — med **to** skråstreger.", "Åbn `Program.cs`. Skriv `builder.Services.AddDbContext<FirmaContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString(\"FirmaContext\")));` under `AddControllersWithViews`.", "Hold musen over de røde streger, og vælg at tilføje `using FirmaApp.Data;` og `using Microsoft.EntityFrameworkCore;`.", "**Build → Build Solution**. Ingen røde fejl.", "Kør programmet (grøn pil). Forsiden virker stadig. Databasen findes ikke endnu — den laver du i næste lektion."],
        mac: ["Åbn `appsettings.json`. Sæt et komma efter linjen `\"AllowedHosts\": \"*\"`, og tilføj under den `\"ConnectionStrings\": { \"FirmaContext\": \"Data Source=firma.db\" }`.", "Åbn `Program.cs`. Skriv `builder.Services.AddDbContext<FirmaContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString(\"FirmaContext\")));` under `AddControllersWithViews`.", "Tilføj `using FirmaApp.Data;` og `using Microsoft.EntityFrameworkCore;` øverst (Rider tilbyder dem, når du klikker på den røde tekst og vælger den gule pære).", "Byg med hammeren. Ingen røde fejl.", "Kør programmet (grøn pil ▶). Forsiden virker stadig. Databasen findes ikke endnu — den laver du i næste lektion."] },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad gør linjen `builder.Services.AddDbContext<FirmaContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString(\"FirmaContext\")));` i `Program.cs`, og hvordan får controlleren fat i databasen?",
        svar: "Linjen registrerer min `FirmaContext` som en **service**. Den siger, at databasen er SQL Server, og at connection stringen skal hentes fra `appsettings.json` under navnet `FirmaContext`. Controlleren laver ikke selv databaseobjektet med `new`; den beder om en `FirmaContext` i sin **konstruktør** og gemmer den i et felt. Det hedder **dependency injection**. Fordelen er, at databasen kun er valgt ét sted, og at controlleren ikke er bundet til en bestemt database.",
        noegle: ["service", "connection string", "appsettings.json", "konstruktør", "dependency injection"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m17l3", titel: "Migrationer: databasen bliver lavet", min: 18,
    ord: [
      ["Migration", "En C#-fil, som EF Core skriver, med opskriften på at ændre databasen, så den passer til dine klasser."],
      ["Add-Migration", "Kommandoen i Visual Studio (Package Manager Console), der laver en ny migration. På Mac: `dotnet ef migrations add`."],
      ["Update-Database", "Kommandoen, der udfører de migrationer, databasen ikke har fået endnu. På Mac: `dotnet ef database update`."],
      ["Up og Down", "Migrationens to metoder: `Up` laver ændringen, `Down` fortryder den."],
      ["__EFMigrationsHistory", "En tabel, EF Core selv laver i databasen, med én række pr. migration, der er udført."],
      ["Model snapshot", "Filen `…ModelSnapshot.cs` i mappen Migrations: EF Cores notat om, hvordan modellen så ud ved sidste migration."],
      ["dotnet-ef", "Kommandolinjeværktøjet til migrationer på Mac (og alle andre steder uden Package Manager Console)."]
    ],
    trin: [
      { t: "laes", h: "Fra klasser til tabeller: to skridt",
        md: "Nu kender projektet modellen, databaseklassen og connection stringen. Men databasen findes ikke. Den laves i **to skridt**, og forskellen er vigtig:\n\n1. **Add-Migration**: EF Core sammenligner dine klasser med det, den sidst noterede, og skriver forskellen ned som en C#-fil — en **migration**. Der sker **intet** i databasen. Det er kun en opskrift.\n2. **Update-Database**: EF Core forbinder til databasen og udfører de opskrifter, databasen ikke har fået endnu. Findes databasen ikke, bliver den lavet.\n\nHvorfor ikke bare rette tabellerne i hånden? Fordi migrationerne er **kode i projektet**. De kan gemmes i Git, køres igen på en anden computer og fortrydes. Databasen og klasserne passer altid sammen.\n\nEn migration får et navn, som du selv finder på. Det skal sige, hvad den gør. Den første kalder man ofte `Init`.",
        win: ["Åbn **Package Manager Console** (Tools → NuGet Package Manager).", "Skriv `Add-Migration Init` og tryk Enter. Visual Studio bygger projektet først.", "Der kommer en ny mappe, **Migrations**, med tre filer, og migrationen åbner sig.", "Skriv `Update-Database` og tryk Enter. Nu bliver databasen `FirmaAppDB` lavet i LocalDB."],
        mac: ["Åbn Riders **Terminal**. Første gang i et projekt skal værktøjet `dotnet-ef` hentes. Skriv `dotnet new tool-manifest` og tryk Enter.", "Skriv `dotnet tool install dotnet-ef --version 10.0.12` og tryk Enter.", "Skriv `dotnet ef migrations add Init` og tryk Enter. Projektet bliver bygget først, og der kommer en ny mappe, **Migrations**.", "Skriv `dotnet ef database update` og tryk Enter. Nu bliver filen `firma.db` lavet i projektmappen.", "På en anden computer, hvor projektet allerede har en tool-manifest (filen `dotnet-tools.json`), skriver du bare `dotnet tool restore` i stedet for linje 1 og 2."],
        md2: "Sådan kører du de to kommandoer:" },
      { t: "valg", q: "Du har lige kørt `Add-Migration Init`, og den lykkedes. Findes databasen `FirmaAppDB` nu?",
        svar: ["Nej. Der er kun kommet en fil i projektet. Databasen laves først af `Update-Database`", "Ja, `Add-Migration` laver altid databasen", "Ja, men den er tom og har ingen tabeller", "Nej, databasen laves først, når man kører programmet"],
        ret: 0, fordi: "`Add-Migration` skriver opskriften. `Update-Database` udfører den. Den rækkefølge sidder i underviserens liste som punkt 6 og 7." },
      { t: "laes", h: "Hvad står der i migrationen?",
        md: "Åbn filen `…_Init.cs` i mappen Migrations. Navnet begynder med dato og klokkeslæt, så migrationerne altid står i rækkefølge. Metoden `Up` er opskriften. Sådan ser den ud med SQL Server:",
        kode: R`protected override void Up(MigrationBuilder migrationBuilder)
{
    migrationBuilder.CreateTable(
        name: "Departments",
        columns: table => new
        {
            Id = table.Column<int>(type: "int", nullable: false)
                .Annotation("SqlServer:Identity", "1, 1"),
            Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
        },
        constraints: table =>
        {
            table.PrimaryKey("PK_Departments", x => x.Id);
        });
}

protected override void Down(MigrationBuilder migrationBuilder)
{
    migrationBuilder.DropTable(
        name: "Departments");
}`,
        frag: true,
        noter: [
          ["CreateTable(name: \"Departments\"", "Lav tabellen. Navnet kommer fra din `DbSet`-property."],
          ["Id … type: \"int\" … \"SqlServer:Identity\", \"1, 1\"", "`Id` er et tal, der tæller op fra 1 af sig selv — `IDENTITY(1,1)` fra modul 12."],
          ["Name … \"nvarchar(50)\", maxLength: 50, nullable: false", "Det er dine attributter oversat: `[StringLength(50)]` → 50 tegn, `[Required]` → `nullable: false`."],
          ["table.PrimaryKey(\"PK_Departments\", x => x.Id)", "`Id` er primærnøgle."],
          ["Down … DropTable", "Opskriften på at fortryde: slet tabellen igen."]
        ],
        md2: "På **Mac** står der `\"INTEGER\"`, `\"TEXT\"` og `\"Sqlite:Autoincrement\"` i stedet. Det er SQLites navne for det samme.\n\nMappen har to filer mere. `…_Init.Designer.cs` og `FirmaContextModelSnapshot.cs` er EF Cores egne notater om, hvordan modellen så ud. Dem retter du aldrig i — men de skal med i Git." },
      { t: "valg", q: "I migrationen står `Name = table.Column<string>(type: \"nvarchar(50)\", maxLength: 50, nullable: false)`. Hvor kommer `nullable: false` fra?",
        svar: ["Fra `[Required]` over `Name` i klassen `Department`", "Fra `[StringLength(50)]`", "Fra connection stringen", "Det er altid sådan for tekst"],
        ret: 0, fordi: "`[Required]` betyder, at kolonnen ikke må være tom: `NOT NULL`. `[StringLength(50)]` giver `nvarchar(50)` og `maxLength: 50`. En `string?` uden `[Required]` ville give `nullable: true`." },
      { t: "laes", h: "Update-Database, og hvordan EF Core holder styr på det",
        md: "Efter `Update-Database` har databasen to tabeller:\n\n- `Departments` — din tabel, med kolonnerne `Id` og `Name`.\n- `__EFMigrationsHistory` — EF Cores egen tabel. Den har **én række pr. migration, der er udført**, med migrationens navn.\n\nNæste gang du skriver `Update-Database`, kigger EF Core i `__EFMigrationsHistory` og udfører **kun** de migrationer, der ikke står der. Derfor kan du køre kommandoen igen uden at noget går i stykker.\n\nPå Mac er der også en tabel, der hedder `__EFMigrationsLock`. Den bruger EF Core kun, mens en migration kører.",
        win: ["Åbn **View → SQL Server Object Explorer**.", "Fold **SQL Server → (localdb)\\MSSQLLocalDB → Databases → FirmaAppDB → Tables** ud.", "Du ser `dbo.Departments` og `dbo.__EFMigrationsHistory`.", "Højreklik på `dbo.__EFMigrationsHistory` → **View Data**. Der er én række: `…_Init`."],
        mac: ["Åbn Riders **Database**-vindue (View → Tool Windows → Database).", "Klik på **+** → **Data Source → SQLite**, og vælg filen `firma.db` i projektmappen. Beder Rider om at hente en driver, så sig ja.", "Fold databasen ud: du ser tabellerne `Departments`, `__EFMigrationsHistory` og `__EFMigrationsLock`.", "Dobbeltklik på `__EFMigrationsHistory`. Der er én række: `…_Init`."] },
      { t: "spor", h: "Spor: hvilke migrationer bliver udført?",
        q: "Programmet efterligner det, `Update-Database` gør. `historik` er tabellen `__EFMigrationsHistory`, og `migrationer` er filerne i mappen Migrations. Databasen har allerede fået `Init`. Skriv `m` og `historik.Count`, lige efter at linjen er udført.",
        kode: R`List<string> historik = new List<string> { "Init" };
string[] migrationer = { "Init", "AddEmployee" };
foreach (string m in migrationer)
{
    if (!historik.Contains(m))
    {
        historik.Add(m);
    }
}
Console.WriteLine(historik.Count);`,
        kolonner: ["m", "historik.Count"],
        raekker: [[1, "=–", "=1"], [3, "=Init", "=1"], [5, "Init", "1"], [3, "AddEmployee", "1"], [5, "AddEmployee", "1"], [7, "AddEmployee", "2"]],
        slut: false,
        output: "2",
        fordi: "`Init` står allerede i historikken, så betingelsen i linje 5 er falsk, og intet sker. `AddEmployee` står der ikke, så den bliver udført (linje 7) og skrevet i historikken. Kører du `Update-Database` én gang til, står begge der — og der sker ingenting." },
      { t: "laes", h: "Når migrationen ikke vil",
        md: "To fejl ser du næsten helt sikkert, så her er de på forhånd:\n\n- **Build failed.** Kommandoerne bygger projektet først. Er der én rød fejl et sted i koden, stopper de. Ret fejlen i Error List / Problems, og prøv igen.\n- **\"The running command stopped because the preference variable ErrorActionPreference …\"** (kun Visual Studio). Det er ikke en fejl i din kode. Vælg **Build → Clean Solution**, derefter **Build → Build Solution**, og kør kommandoen igen. Underviseren og flere på holdet fik den, og det hjalp hver gang.\n\nPå Mac giver `dotnet ef` fejlen **\"Could not execute because the specified command or file was not found\"**, hvis værktøjet ikke er hentet. Skriv `dotnet tool restore`, eller installér det som i trin 1." },
      { t: "valg", q: "I Package Manager Console skriver du `Add-Migration Init`. Der står \"Build succeeded\", og bagefter en rød tekst om **ErrorActionPreference**. Hvad gør du?",
        svar: ["Build → Clean Solution, så Build → Build Solution, og kør `Add-Migration Init` igen", "Sletter projektet og begynder forfra", "Retter i migrationsfilen i hånden", "Skriver `Update-Database` i stedet"],
        ret: 0, fordi: "Fejlen kommer fra Package Manager Console, ikke fra din kode. En ren build løser den." },
      { t: "udfyld", sprog: "text", frag: true, q: "Skriv de to kommandoer i Package Manager Console, der først laver en migration, der hedder `Init`, og derefter laver databasen.",
        kode: R`PM> [[Add-Migration]] Init
PM> [[Update-Database]]`,
        fordi: "Først opskriften, så udførelsen. På Mac er det `dotnet ef migrations add Init` og `dotnet ef database update`." },
      { t: "ide", h: "Lav databasen til FirmaApp",
        md: "Kør de to kommandoer fra trin 1 i dit projekt, og find tabellerne bagefter som i trin 5.",
        md2: "Du skal se tabellen `Departments` med kolonnerne `Id` og `Name`, og `__EFMigrationsHistory` med én række. Gik det galt, så læs trin 7 igen.\n\nÅbn også `…_Init.cs` i mappen Migrations, og find dine to attributter i koden: `maxLength: 50` og `nullable: false`." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er en migration, og hvad er forskellen på `Add-Migration` og `Update-Database`?",
        svar: "En **migration** er en C#-fil, som EF Core skriver ud fra forskellen mellem mine modelklasser og den model, den sidst noterede. Den har en `Up`-metode, der laver ændringen, og en `Down`-metode, der fortryder den. **Add-Migration** laver kun filen — der sker intet i databasen. **Update-Database** forbinder til databasen og udfører de migrationer, der ikke står i tabellen `__EFMigrationsHistory` endnu. Fordelen er, at ændringer af databasen er kode i projektet, som kan versionsstyres og køres igen på en anden maskine.",
        noegle: ["opskrift", "Up", "Down", "Add-Migration", "Update-Database", "__EFMigrationsHistory"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m17l4", titel: "Scaffolding: CRUD-siderne bliver skrevet for dig", min: 20,
    ord: [
      ["CRUD", "Create, Read, Update, Delete: opret, vis, ret og slet. De fire ting, næsten alle sider med data gør."],
      ["Scaffolding", "Visual Studio (eller et værktøj) skriver en controller og fem views til en model for dig. Du læser og retter koden bagefter."],
      ["ToListAsync", "Henter alle rækkerne fra en tabel som en liste, uden at blokere imens. Svarer til `SELECT * FROM …`."],
      ["SaveChangesAsync", "Sender alle ændringer (nye, rettede og slettede objekter) til databasen som SQL. Før den linje er intet gemt."],
      ["[Bind]", "Attribut, der siger, hvilke felter fra formularen der må komme ind i objektet. Resten bliver ignoreret."],
      ["Overposting", "Et angreb, hvor nogen sender ekstra felter med en formular, som de ikke burde kunne ændre. `[Bind]` stopper det."],
      ["[ValidateAntiForgeryToken]", "Tjekker, at formularen kom fra din egen side (en skjult kode i formularen). Ellers svarer serveren 400."],
      ["NotFound", "Svarer med statuskode 404: det, der blev bedt om, findes ikke."]
    ],
    trin: [
      { t: "laes", h: "CRUD — og hvem der skriver koden",
        md: "En side med data skal næsten altid kunne fire ting. De hedder samlet **CRUD**, og du kender dem fra SQL:\n\n- **C**reate — opret → `INSERT`\n- **R**ead — vis → `SELECT`\n- **U**pdate — ret → `UPDATE`\n- **D**elete — slet → `DELETE`\n\nKoden til CRUD ser næsten ens ud for alle modeller. Derfor kan Visual Studio skrive den for dig. Det hedder **scaffolding** (stillads): du får en controller med alle actions og fem views — `Index`, `Details`, `Create`, `Edit` og `Delete`. Din opgave er at **forstå** koden, så du kan rette i den og forklare den til eksamen." },
      { t: "orden", sprog: "text",
        q: "Du har nu lavet de første syv af underviserens otte punkter i FirmaApp. Sæt alle otte i underviserens rækkefølge, før du laver det sidste.",
        linjer: ["Skriv modelklasserne i Models", "Installér EF Core-pakkerne", "Skriv DbContext-klassen med en DbSet pr. tabel", "Skriv connection stringen i appsettings.json", "Registrér AddDbContext i Program.cs", "Add-Migration", "Update-Database", "Scaffold controllere og views, og tjek mappenavnene i Views"],
        fordi: "Modellen først — alt andet bygger på den. Pakkerne skal være der, før `DbContext` kan skrives. `AddDbContext` skal bruge både klassen og connection stringen. Migrationen kræver det hele, og controllerne kræver en database." },
      { t: "laes", h: "Lav controlleren",
        md: "Projektet skal kunne bygges, og migrationen skal være lavet, før du scaffolder.",
        win: ["Højreklik på mappen **Controllers** → **Add → Controller…**", "Vælg **MVC Controller with views, using Entity Framework** → Add.", "**Model class:** `Department`. **DbContext class:** `FirmaContext`. Er der et felt til database provider, så vælg **SQL Server**.", "Sæt flueben ved **Generate views**, **Reference script libraries** og **Use a layout page**.", "**Controller name:** `DepartmentsController` → Add. Visual Studio henter selv de pakker, scaffoldingen mangler.", "Tjek i Solution Explorer: under **Views** skal mappen hedde `Departments` (flertal, som controlleren). Hedder den `Department`, så omdøb den — ellers får du fejlen **The view 'Index' was not found**."],
        mac: ["Scaffolding laver du i Terminal. Hent værktøjet: `dotnet tool install dotnet-aspnet-codegenerator --version 10.0.2`", "Hent den pakke, værktøjet skal bruge: `dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design --version 10.0.2`", "Lav controller og views (alt på én linje): `dotnet aspnet-codegenerator controller -name DepartmentsController -m Department -dc FirmaContext -dbProvider sqlite --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries`", "Der står **Added Controller** og fem gange **Added View**. Filerne dukker op i Rider under `Controllers` og `Views/Departments`.", "Gule advarsler (NU1901) om `NuGet.Packaging` og `NuGet.Protocol` fra den nye pakke kan du se bort fra."],
        md2: "Tilføj et menupunkt, så du kan komme til siden. Åbn `Views/Shared/_Layout.cshtml`, find `<li class=\"nav-item\">` med **Privacy**, og lav et nyt `li` under det med dette link:\n\n`<a class=\"nav-link text-dark\" asp-area=\"\" asp-controller=\"Departments\" asp-action=\"Index\">Afdelinger</a>`\n\n`asp-controller` og `asp-action` er tag helpers fra modul 16: serveren laver dem om til `href=\"/Departments\"`. Teksten i menuen må gerne være dansk, selv om koden er engelsk." },
      { t: "laes", h: "Index og Details: læs data",
        md: "Åbn `Controllers/DepartmentsController.cs`. Øverst står konstruktøren med dependency injection fra lektion 2. Så kommer de to actions, der **læser**: `Index` viser alle afdelinger, `Details` viser én. Adressen til Details er fx `/Departments/Details/2`, og ruten `{id?}` lægger 2 i parameteren `id`.",
        kode: R`// GET: Departments
public async Task<IActionResult> Index()
{
    return View(await _context.Departments.ToListAsync());
}

// GET: Departments/Details/5
public async Task<IActionResult> Details(int? id)
{
    if (id == null)
    {
        return NotFound();
    }

    var department = await _context.Departments
        .FirstOrDefaultAsync(m => m.Id == id);
    if (department == null)
    {
        return NotFound();
    }

    return View(department);
}`,
        frag: true,
        noter: [
          ["async Task<IActionResult>", "Actionen er `async` (modul 8). Mens databasen arbejder, kan serveren tage sig af andre besøgende."],
          ["_context.Departments.ToListAsync()", "Hent alle rækker fra tabellen som en `List<Department>`. EF Core sender `SELECT … FROM Departments`."],
          ["await", "Vent på svaret uden at blokere."],
          ["return View(…)", "Send data til viewet med samme navn som actionen, fx `Views/Departments/Index.cshtml`, som model."],
          ["int? id", "`int?` (modul 7): et tal, der også kan være `null`. Står der intet id i adressen, er det `null`."],
          ["return NotFound();", "Svar med **404**. To gange: når der ikke er noget id, og når der ikke er en afdeling med det id."],
          [".FirstOrDefaultAsync(m => m.Id == id)", "LINQ fra modul 9: den første afdeling med det id — eller `null`. EF Core laver det om til `SELECT … WHERE Id = …`."]
        ],
        md2: "I viewet `Index.cshtml` står `@model IEnumerable<FirmaApp.Models.Department>` øverst og en `@foreach`, der laver en tabelrække pr. afdeling. Det kender du fra modul 16 — nu kommer listen bare fra databasen." },
      { t: "valg", q: "Hvilken SQL svarer `await _context.Departments.ToListAsync()` til?",
        svar: ["`SELECT * FROM Departments`", "`INSERT INTO Departments`", "`CREATE TABLE Departments`", "`SELECT TOP 1 * FROM Departments`"],
        ret: 0, fordi: "Hele tabellen hentes. EF Core skriver kolonnerne ud i stedet for `*`, men resultatet er det samme." },
      { t: "forudsig",
        q: "Her er `Details`-logikken med en almindelig liste i stedet for databasen. Hvad skriver programmet?",
        kode: R`List<Department> afdelinger = new List<Department>
{
    new Department { Id = 1, Name = "Salg" },
    new Department { Id = 2, Name = "Lager" }
};

Console.WriteLine(Details(2));
Console.WriteLine(Details(7));
Console.WriteLine(Details(null));

string Details(int? id)
{
    if (id == null)
    {
        return "404";
    }
    var department = afdelinger.FirstOrDefault(m => m.Id == id);
    if (department == null)
    {
        return "404";
    }
    return department.Name;
}

class Department
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
}`,
        output: "Lager\n404\n404",
        fordi: "Id 2 findes, så navnet kommer tilbage. Id 7 findes ikke: `FirstOrDefault` giver `null`, og det bliver 404. Uden id er `id` selv `null`, og det giver også 404. Den rigtige `Details` gør præcis det samme — bare mod databasen." },
      { t: "laes", h: "Create: to actions med samme navn",
        md: "At oprette kræver **to** actions. Den første (GET) viser den tomme formular. Den anden (POST) modtager formularen, når brugeren klikker **Create**:",
        kode: R`// GET: Departments/Create
public IActionResult Create()
{
    return View();
}

// POST: Departments/Create
[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Create([Bind("Id,Name")] Department department)
{
    if (ModelState.IsValid)
    {
        _context.Add(department);
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }
    return View(department);
}`,
        frag: true,
        noter: [
          ["[HttpPost]", "Denne udgave kører kun, når formularen bliver sendt (POST, modul 13 og 16)."],
          ["[ValidateAntiForgeryToken]", "Tjek den skjulte kode, som `<form>` i viewet selv lægger ind. Kommer formularen et andet sted fra, svarer serveren 400. Afprøvet: en POST uden koden giver 400."],
          ["[Bind(\"Id,Name\")] Department department", "**Model binding**: ASP.NET Core laver et `Department`-objekt ud fra formularens felter. `[Bind]` siger, at kun `Id` og `Name` må komme ind — beskyttelse mod **overposting**."],
          ["if (ModelState.IsValid)", "Overholder objektet `[Required]` og `[StringLength(50)]`? Hvis ikke, vises formularen igen med fejlbeskeden."],
          ["_context.Add(department);", "Fortæl EF Core, at objektet er **nyt**. Der er endnu ikke sendt noget til databasen."],
          ["await _context.SaveChangesAsync();", "**Nu** bliver det gemt: EF Core sender `INSERT`. Databasen giver rækken et `Id`, og EF Core skriver det tilbage i objektet."],
          ["return RedirectToAction(nameof(Index));", "Send browseren videre til listen (statuskode 302). Så bliver formularen ikke sendt igen, hvis man trykker opdatér."]
        ] },
      { t: "spor", h: "Spor: Edit modtager formularen",
        q: "Når du retter en afdeling, sender formularen til adressen `/Departments/Edit/3`, og model binding laver et objekt ud fra felterne. Programmet her gør det samme i hånden. Skriv værdierne, lige efter at linjen er udført. `\"\"` i skemaet betyder en tom tekst.",
        kode: R`int id = 3;
Department d = new Department();
d.Id = 3;
d.Name = "Lager og logistik";
string svar = id != d.Id ? "NotFound" : "Gem";
Console.WriteLine(svar);

class Department
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
}`,
        kolonner: ["id", "d.Id", "d.Name", "svar"],
        raekker: [[1, "=3", "=–", "=–", "=–"], [2, "=3", "=0", "=\"\"", "=–"], [3, "3", "3", "=\"\"", "–"], [4, "3", "3", "Lager og logistik", "–"], [5, "3", "3", "Lager og logistik", "Gem"]],
        slut: false,
        output: "Gem",
        fordi: "`id` kommer fra **adressen**, `d.Id` fra et **skjult felt** i formularen. Den rigtige `Edit` begynder med `if (id != department.Id) return NotFound();` — er de to forskellige, har nogen pillet ved formularen, og intet bliver gemt. Her er de ens, så afdelingen bliver gemt. Bemærk linje 2: et nyt objekt har `Name` = tom tekst, fordi klassen skriver `= \"\"`." },
      { t: "laes", h: "Edit og Delete",
        md: "**Edit** ligner Create: en GET, der viser formularen udfyldt, og en POST, der gemmer. Forskellen er `_context.Update(department)` i stedet for `Add` — så sender `SaveChangesAsync` en `UPDATE`.\n\n**Delete** har også to actions. GET viser en side med \"Are you sure you want to delete this?\". Først POST sletter:",
        kode: R`// POST: Departments/Delete/5
[HttpPost, ActionName("Delete")]
[ValidateAntiForgeryToken]
public async Task<IActionResult> DeleteConfirmed(int id)
{
    var department = await _context.Departments.FindAsync(id);
    if (department != null)
    {
        _context.Departments.Remove(department);
    }

    await _context.SaveChangesAsync();
    return RedirectToAction(nameof(Index));
}`,
        frag: true,
        noter: [
          ["[HttpPost, ActionName(\"Delete\")]", "Metoden hedder `DeleteConfirmed`, men adressen er stadig `/Departments/Delete/5`. Se næste trin for hvorfor."],
          ["FindAsync(id)", "Find en række ud fra primærnøglen. Kortere end `FirstOrDefaultAsync`, når man søger på `Id`."],
          ["Remove(department)", "Markér objektet som slettet. `SaveChangesAsync` sender `DELETE`."]
        ],
        md2: "Hvorfor sletter man ikke bare med et link? Et link er en **GET**, og GET må aldrig ændre noget: en søgemaskine eller en browser, der henter sider i forvejen, ville kunne slette dine data. Derfor bekræfter man med en formular, der sender POST." },
      { t: "valg", q: "Hvorfor hedder POST-udgaven af Delete `DeleteConfirmed` med `[ActionName(\"Delete\")]` over, i stedet for bare `Delete`?",
        svar: ["GET-udgaven er allerede `Delete(int? id)`, og to metoder med samme navn og næsten samme parameter giver en compilerfejl eller en tvetydig adresse. `ActionName` holder adressen `/Delete`", "Fordi `Delete` er et reserveret ord i C#", "Fordi POST-metoder altid skal ende på `Confirmed`", "Det har ingen betydning — det er bare scaffoldingens stil"],
        ret: 0, fordi: "Create og Edit kan have samme navn til GET og POST, fordi POST-udgaven har en ekstra parameter (objektet). Delete har kun `id` i begge, så C# kan ikke skelne dem. Løsningen er et andet metodenavn og samme **action**-navn." },
      { t: "fejl", frag: true, logisk: true,
        q: "En kollega har ændret `Details` i `DepartmentsController`. Nu giver **alle** links \"Details\" på listen fejl 404 — også for afdelinger, der findes. Adressen er fx `/Departments/Details/2`. Klik på linjen med fejlen.",
        kode: R`public async Task<IActionResult> Details(int? afdId)
{
    if (afdId == null)
    {
        return NotFound();
    }

    var department = await _context.Departments
        .FirstOrDefaultAsync(m => m.Id == afdId);
    if (department == null)
    {
        return NotFound();
    }

    return View(department);
}`,
        linje: 1,
        fordi: "Ruten er `{controller}/{action}/{id?}`, så tallet i adressen hedder **`id`**. Der findes ingen parameter med det navn, så `afdId` bliver `null` — og linje 5 svarer 404. Navnet på parameteren skal være præcis det samme som i ruten. Underviseren havde samme fejl med `cid` i sit projekt. Afprøvet: med `afdId` giver `/Departments/Details/2` 404, med `id` virker den.",
        rettet: R`public async Task<IActionResult> Details(int? id)
{
    if (id == null)
    {
        return NotFound();
    }

    var department = await _context.Departments
        .FirstOrDefaultAsync(m => m.Id == id);
    if (department == null)
    {
        return NotFound();
    }

    return View(department);
}` },
      { t: "ide", h: "CRUD på afdelinger",
        md: "Scaffold `DepartmentsController`, og tilføj menupunktet **Afdelinger** som i trin 3. Kør programmet, og prøv alle fire bogstaver i CRUD:",
        win: ["Kør med den grønne pil. Klik på **Afdelinger** i menuen.", "Klik **Create New**, skriv `Salg`, og klik **Create**. Opret også `Lager` og `IT`.", "Klik **Create New**, lad navnet være tomt, og klik **Create**: du får \"The Name field is required.\"", "Ret `IT` til `IT og support` med **Edit**. Se den med **Details**. Slet den med **Delete**.", "Åbn tabellen `Departments` i SQL Server Object Explorer (højreklik → **View Data**). Rækkerne står der."],
        mac: ["Kør med den grønne pil ▶. Klik på **Afdelinger** i menuen.", "Klik **Create New**, skriv `Salg`, og klik **Create**. Opret også `Lager` og `IT`.", "Klik **Create New**, lad navnet være tomt, og klik **Create**: du får \"The Name field is required.\"", "Ret `IT` til `IT og support` med **Edit**. Se den med **Details**. Slet den med **Delete**.", "Åbn tabellen `Departments` i Riders Database-vindue (dobbeltklik). Rækkerne står der. Klik på opdatér-knappen, hvis du ikke ser de nyeste."],
        md2: "**Debug det:** sæt et breakpoint på linjen `_context.Add(department);` i POST-udgaven af `Create` (klik i den grå margen til venstre for linjenummeret). Start med debuggeren ({{F5||den grønne bille}}), og opret en afdeling. Programmet stopper på linjen. Kig på `department` i {{Locals||Threads & Variables}}: `Id` er 0. Gå to skridt frem med **Step Over**, og kig igen: nu har `Id` fået det tal, databasen gav." },
      { t: "forklar", q: "Forklar med dine egne ord, hvad der sker, fra brugeren klikker **Create** på formularen, til den nye afdeling står i databasen.",
        svar: "Browseren sender formularen som en **POST** til `/Departments/Create`. Routing finder POST-udgaven af `Create`. `[ValidateAntiForgeryToken]` tjekker, at formularen kommer fra min egen side. **Model binding** laver et `Department`-objekt ud fra felterne, og `[Bind]` tillader kun `Id` og `Name`. `ModelState.IsValid` tjekker valideringen, fx `[Required]`. Er det i orden, markerer `_context.Add` objektet som nyt, og `await _context.SaveChangesAsync()` sender en `INSERT` til databasen, som giver rækken et id. Til sidst sender `RedirectToAction` brugeren tilbage til `Index`, som henter listen med `ToListAsync`.",
        noegle: ["POST", "model binding", "Bind", "ModelState.IsValid", "Add", "SaveChangesAsync", "INSERT", "RedirectToAction"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m17l5", titel: "Relationer: afdelinger og medarbejdere", min: 20,
    ord: [
      ["Én-til-mange", "En relation, hvor én række i den ene tabel hører sammen med mange rækker i den anden: én afdeling, mange medarbejdere."],
      ["Fremmednøgle-property", "En almindelig `int`-property, fx `DepartmentId`, der bliver til fremmednøglen i tabellen."],
      ["Navigation property", "En property, der ikke er en kolonne, men en vej i koden til de rækker i en anden tabel, der hører til: `Department` eller `Employees`."],
      ["Include", "Beder EF Core om også at hente de relaterede rækker (en `JOIN`). Uden `Include` er navigation propertyen tom."],
      ["SelectList", "Et objekt med de valgmuligheder, en `<select>`-dropdown skal vise: hvilken værdi der sendes, og hvilken tekst der vises."],
      ["Cascade delete", "Når en afdeling slettes, sletter databasen automatisk dens medarbejdere med."]
    ],
    trin: [
      { t: "laes", h: "Én afdeling, mange medarbejdere",
        md: "Fra modul 12 ved du, hvordan en relation ser ud i en database: tabellen med \"de mange\" (`Employees`) har en kolonne med id'et fra \"den ene\" (`DepartmentId`). Det er en **fremmednøgle**.\n\nI code first skriver du relationen i klasserne. En ny model, `Employee`, og en linje mere i `Department`:",
        kode: R`using System.ComponentModel.DataAnnotations;

namespace FirmaApp.Models
{
    public class Employee
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; } = "";

        [StringLength(50)]
        public string? Title { get; set; }

        public int DepartmentId { get; set; }
        public Department? Department { get; set; }
    }

    public class Department
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; } = "";

        public List<Employee> Employees { get; set; } = new List<Employee>();
    }
}`,
        omkring: ["", "class __Start { static void Main() { } }"],
        noter: [
          ["string? Title", "Stillingsbetegnelse. `string?` uden `[Required]`: den må være tom."],
          ["int DepartmentId", "**Fremmednøgle-propertyen.** Navnet er klassens navn + `Id`, så EF Core forstår selv, at den peger på `Department`. Bliver til kolonnen `DepartmentId`."],
          ["Department? Department", "**Navigation property**: vejen fra en medarbejder til afdelingen. Ikke en kolonne. Spørgsmålstegnet er vigtigt — se lektion 6 og værkstedet."],
          ["List<Employee> Employees", "Navigation property den anden vej: afdelingens medarbejdere. Heller ikke en kolonne. Starter som en tom liste."]
        ],
        md2: "Klasserne ligger hver i sin fil i projektet (`Employee.cs` og `Department.cs`). Her står de sammen, så du kan se begge sider af relationen.\n\nTilføj også tabellen i `FirmaContext`: `public DbSet<Employee> Employees { get; set; }`." },
      { t: "valg", q: "Klassen `Employee` har fem properties: `Id`, `Name`, `Title`, `DepartmentId` og `Department`. Hvor mange kolonner får tabellen `Employees`?",
        svar: ["Fire: `Id`, `Name`, `Title` og `DepartmentId`", "Fem — én pr. property", "Tre: `Id`, `Name` og `Title`", "Seks, fordi afdelingens navn også kommer med"],
        ret: 0, fordi: "`Department` er en navigation property — et objekt, ikke en værdi, der kan stå i en celle. Forbindelsen ligger i `DepartmentId`. Afprøvet: migrationen laver præcis de fire kolonner." },
      { t: "forudsig",
        q: "Navigation properties er helt almindelige properties. Her bruges de uden database. Hvad skriver programmet?",
        kode: R`Department salg = new Department { Id = 1, Name = "Salg" };
Employee anna = new Employee { Name = "Anna", DepartmentId = 1, Department = salg };
Employee cy = new Employee { Name = "Cy", DepartmentId = 1, Department = salg };
salg.Employees.Add(anna);
salg.Employees.Add(cy);

Console.WriteLine(anna.Department.Name);
Console.WriteLine(salg.Employees.Count);
Console.WriteLine(salg.Employees[1].Name);

class Employee
{
    public string Name { get; set; } = "";
    public int DepartmentId { get; set; }
    public Department? Department { get; set; }
}

class Department
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public List<Employee> Employees { get; set; } = new List<Employee>();
}`,
        output: "Salg\n2\nCy",
        fordi: "`anna.Department` peger på objektet `salg`, så `.Name` er `Salg`. `salg.Employees` er en liste med to medarbejdere, og plads 1 er den anden: `Cy`. Fra en medarbejder kan du gå til afdelingen, og fra afdelingen til medarbejderne." },
      { t: "laes", h: "Migrationen for relationen",
        md: "Kør `Add-Migration AddEmployee` og `Update-Database` (Mac: `dotnet ef migrations add AddEmployee` og `dotnet ef database update`). Migrationen laver tabellen `Employees` med en fremmednøgle. Den vigtige del:",
        kode: R`constraints: table =>
{
    table.PrimaryKey("PK_Employees", x => x.Id);
    table.ForeignKey(
        name: "FK_Employees_Departments_DepartmentId",
        column: x => x.DepartmentId,
        principalTable: "Departments",
        principalColumn: "Id",
        onDelete: ReferentialAction.Cascade);
});`,
        frag: true,
        noter: [
          ["column: x => x.DepartmentId", "Kolonnen, der er fremmednøgle."],
          ["principalTable: \"Departments\", principalColumn: \"Id\"", "Den peger på `Id` i `Departments`. Databasen afviser en medarbejder med et `DepartmentId`, der ikke findes. Afprøvet: `FOREIGN KEY constraint failed`."],
          ["onDelete: ReferentialAction.Cascade", "**Cascade delete**: slettes en afdeling, slettes dens medarbejdere med."]
        ],
        md2: "Migrationen indeholder **kun forskellen** siden `Init`: tabellen `Departments` findes allerede og bliver ikke rørt." },
      { t: "valg", q: "Afdelingen `Salg` har to medarbejdere. Du sletter `Salg` på Delete-siden. Hvad sker der med de to medarbejdere?",
        svar: ["De bliver slettet med, fordi fremmednøglen har `onDelete: Cascade`", "De bliver liggende med `DepartmentId` = 0", "Sletningen bliver afvist med en fejl", "De bliver flyttet til den første afdeling i tabellen"],
        ret: 0, fordi: "EF Core vælger **Cascade**, når fremmednøglen er en `int` (påkrævet): en medarbejder kan ikke findes uden en afdeling. Afprøvet i FirmaApp: efter sletning af en afdeling er dens medarbejdere væk. Vil du hellere have en fejl, så du ikke sletter noget ved et uheld, kommer det i modul 18." },
      { t: "laes", h: "Include: hent afdelingen med",
        md: "Scaffold `EmployeesController` ligesom før (model `Employee`). Kig på `Index`:",
        kode: R`// GET: Employees
public async Task<IActionResult> Index()
{
    var firmaContext = _context.Employees.Include(e => e.Department);
    return View(await firmaContext.ToListAsync());
}`,
        frag: true,
        noter: [
          ["_context.Employees", "Tabellen med medarbejdere."],
          [".Include(e => e.Department)", "\"Hent også hver medarbejders afdeling.\" EF Core laver en `JOIN` på `DepartmentId`, og fylder navigation propertyen `Department` ud."],
          ["ToListAsync()", "Først her bliver forespørgslen sendt til databasen."]
        ],
        md2: "Viewet viser afdelingens navn med `@Html.DisplayFor(modelItem => item.Department.Name)`.\n\nEF Core henter **kun det, du beder om**. Uden `Include` er `Department` `null` på hver medarbejder, og kolonnen med afdelingen bliver tom — uden nogen fejlbesked. Det er den fejl, du skal finde i næste trin." },
      { t: "fejl", frag: true, logisk: true,
        q: "Listen over medarbejdere virker, men kolonnen **Department** er tom på alle rækker, selv om hver medarbejder har en afdeling i databasen. Klik på linjen med fejlen.",
        kode: R`public async Task<IActionResult> Index()
{
    var firmaContext = _context.Employees;
    return View(await firmaContext.ToListAsync());
}`,
        linje: 3,
        fordi: "Der mangler `.Include(e => e.Department)`. Uden den henter EF Core kun kolonnerne fra `Employees`. `DepartmentId` er sat, men objektet `Department` er `null`, så `item.Department.Name` viser ingenting. Afprøvet: uden `Include` er cellen tom, med `Include` står afdelingens navn der.",
        rettet: R`public async Task<IActionResult> Index()
{
    var firmaContext = _context.Employees.Include(e => e.Department);
    return View(await firmaContext.ToListAsync());
}` },
      { t: "spor", h: "Spor: tæl medarbejderne i én afdeling",
        q: "Programmet tæller, hvor mange medarbejdere der har `DepartmentId` 1. Skriv `e.Name` og `antal` efter linje 2, og hver gang linje 3 eller linje 7 er udført.",
        kode: R`List<Employee> alle = new List<Employee> { new Employee { Name = "Anna", DepartmentId = 1 }, new Employee { Name = "Bo", DepartmentId = 2 }, new Employee { Name = "Cy", DepartmentId = 1 } };
int antal = 0;
foreach (Employee e in alle)
{
    if (e.DepartmentId == 1)
    {
        antal++;
    }
}
Console.WriteLine(antal);

class Employee
{
    public string Name { get; set; } = "";
    public int DepartmentId { get; set; }
}`,
        kolonner: ["e.Name", "antal"],
        raekker: [[2, "=–", "=0"], [3, "=Anna", "=0"], [7, "Anna", "1"], [3, "Bo", "1"], [3, "Cy", "1"], [7, "Cy", "2"]],
        slut: false,
        output: "2",
        fordi: "Bo har `DepartmentId` 2, så betingelsen er falsk for ham, og `antal` bliver ikke talt op. Det er det, en `WHERE DepartmentId = 1` gør i SQL. Med EF Core skriver du det som `_context.Employees.Where(e => e.DepartmentId == 1)` — eller du henter afdelingen med `Include(d => d.Employees)` og bruger `.Count`." },
      { t: "laes", h: "Dropdown: vælg afdeling med SelectList",
        md: "Når man opretter en medarbejder, skal man vælge afdeling. Brugeren skal se **navne**, men formularen skal sende **id'et**. Det klarer en `SelectList`. Sådan står det i GET-udgaven af `Create`:",
        kode: R`// GET: Employees/Create
public IActionResult Create()
{
    ViewData["DepartmentId"] = new SelectList(_context.Departments, "Id", "Name");
    return View();
}`,
        frag: true,
        noter: [
          ["ViewData[\"DepartmentId\"]", "Tasken fra modul 16. Listen lægges under navnet `DepartmentId`, så viewet kan finde den."],
          ["_context.Departments", "Valgmulighederne: alle afdelinger fra databasen."],
          ["\"Id\"", "Det, der bliver **sendt** med formularen: afdelingens id."],
          ["\"Name\"", "Det, brugeren **ser** i listen. Står der `\"Id\"` to gange, ser brugeren kun tal — så ret det andet til `\"Name\"`."]
        ],
        md2: "I viewet `Create.cshtml` står dropdownen som `<select asp-for=\"DepartmentId\" class=\"form-control\" asp-items=\"ViewBag.DepartmentId\"></select>`. `asp-for` binder den til propertyen `DepartmentId`, og `asp-items` henter valgmulighederne. Afprøvet: HTML'en bliver til `<option value=\"1\">Salg</option>`." },
      { t: "udfyld", frag: true, q: "Lav dropdownen, så brugeren ser afdelingernes **navne**, mens formularen sender deres **id**.",
        kode: R`ViewData["DepartmentId"] = new [[SelectList]](_context.Departments, "[[Id]]", "[[Name]]");`,
        fordi: "Først hvad der sendes (`Id`), så hvad der vises (`Name`)." },
      { t: "laes", h: "Den anden vej: afdelingens medarbejdere",
        md: "På siden **Details** for en afdeling vil du gerne se dens medarbejdere. Så skal `Details` i `DepartmentsController` hente dem med — `Include` den anden vej. Tilføj én linje i forespørgslen:\n\n`var department = await _context.Departments.Include(d => d.Employees).FirstOrDefaultAsync(m => m.Id == id);`\n\nOg nederst i `Views/Departments/Details.cshtml`, før det sidste `</div>` i den første blok, en liste. `Model` er afdelingen, og `Model.Employees` er dens medarbejdere:",
        sprog: "razor",
        kode: R`<h4>Medarbejdere (@Model.Employees.Count)</h4>
<ul>
    @foreach (var e in Model.Employees)
    {
        <li>@e.Name – @e.Title</li>
    }
</ul>`,
        noter: [
          ["@Model.Employees.Count", "Antallet. Uden `Include` i controlleren ville der altid stå 0."],
          ["@foreach (var e in Model.Employees)", "Én `<li>` pr. medarbejder (Razor fra modul 16)."]
        ],
        md2: "Afprøvet: med Anna og Cy i Salg viser `/Departments/Details/1` overskriften \"Medarbejdere (2)\" og de to navne." },
      { t: "ide", h: "Medarbejdere i FirmaApp",
        md: "Byg relationen ind i dit eget projekt:",
        win: ["Lav `Employee.cs` i Models, og tilføj `Employees`-listen i `Department` (trin 1). Tilføj `DbSet<Employee> Employees` i `FirmaContext`.", "Package Manager Console: `Add-Migration AddEmployee` og derefter `Update-Database`.", "Scaffold **MVC Controller with views, using Entity Framework** med model `Employee` og `FirmaContext`. Tjek, at mappen hedder `Views/Employees`.", "Tilføj menupunktet **Medarbejdere** i `_Layout.cshtml` (`asp-controller=\"Employees\"`).", "Kør. Opret tre medarbejdere i to afdelinger. Tjek, at dropdownen viser navne, og at listen viser afdelingen.", "Tilføj `Include(d => d.Employees)` og listen i afdelingens Details (trin 11). Se, at medarbejderne står der."],
        mac: ["Lav `Employee.cs` i Models, og tilføj `Employees`-listen i `Department` (trin 1). Tilføj `DbSet<Employee> Employees` i `FirmaContext`.", "Terminal: `dotnet ef migrations add AddEmployee` og derefter `dotnet ef database update`.", "Terminal: `dotnet aspnet-codegenerator controller -name EmployeesController -m Employee -dc FirmaContext -dbProvider sqlite --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries`", "Tilføj menupunktet **Medarbejdere** i `_Layout.cshtml` (`asp-controller=\"Employees\"`).", "Kør. Opret tre medarbejdere i to afdelinger. Tjek, at dropdownen viser navne, og at listen viser afdelingen.", "Tilføj `Include(d => d.Employees)` og listen i afdelingens Details (trin 11). Se, at medarbejderne står der."],
        md2: "Prøv også cascade delete: opret en afdeling med én medarbejder, slet afdelingen, og se, at medarbejderen er væk fra listen." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på `DepartmentId` og `Department` i klassen `Employee`, og hvorfor skal man bruge `Include`?",
        svar: "`DepartmentId` er **fremmednøgle-propertyen**: et tal, der bliver til en kolonne i tabellen `Employees` og peger på primærnøglen i `Departments`. `Department` er en **navigation property**: ikke en kolonne, men en vej i koden til selve afdelingsobjektet. Den anden vej har `Department` en liste `Employees`. EF Core henter kun det, man beder om, så navigation propertyen er `null` (eller listen tom), medmindre man skriver `Include` — så laver EF Core en `JOIN` og fylder den ud.",
        noegle: ["fremmednøgle", "kolonne", "navigation property", "Include", "JOIN", "null"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m17l6", titel: "Startdata, ændringer og fejlbeskeder", min: 20,
    ord: [
      ["Seeding", "At fylde startdata i databasen, fx de afdelinger, der altid skal findes."],
      ["HasData", "Metoden, der beskriver startdata i `OnModelCreating`. Dataene kommer med i en migration."],
      ["OnModelCreating", "En metode i `DbContext`, som du kan override for at give EF Core ekstra oplysninger om modellen, fx startdata."],
      ["Drop-Database", "Sletter hele databasen (med alle data). På Mac: `dotnet ef database drop`. Bagefter laver `Update-Database` den forfra."],
      ["Remove-Migration", "Fjerner den seneste migration, så længe den ikke er sendt til databasen. På Mac: `dotnet ef migrations remove`."],
      ["Pending changes", "Modellen er ændret, men der er ikke lavet en migration for ændringen."]
    ],
    trin: [
      { t: "laes", h: "Startdata med HasData",
        md: "Nogle data skal altid være der — fx firmaets afdelinger. I stedet for at oprette dem i hånden på hver computer, skriver du dem i `FirmaContext`. EF Core lægger dem så i en migration.\n\nDet sker i metoden `OnModelCreating`, som `DbContext` har i forvejen. Du **override**'r den (modul 5) og bruger `HasData`:",
        kode: R`public class FirmaContext : DbContext
{
    public FirmaContext(DbContextOptions<FirmaContext> options) : base(options)
    {
    }

    public DbSet<Department> Departments { get; set; }
    public DbSet<Employee> Employees { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Department>().HasData(
            new Department { Id = 1, Name = "Salg" },
            new Department { Id = 2, Name = "Lager" },
            new Department { Id = 3, Name = "IT" });
    }
}`,
        frag: true,
        noter: [
          ["protected override void OnModelCreating(ModelBuilder modelBuilder)", "Din egen udgave af en metode fra `DbContext`. EF Core kalder den, når den bygger sin model."],
          ["modelBuilder.Entity<Department>()", "\"Om klassen `Department` …\""],
          [".HasData(…)", "\"… skal disse rækker findes.\" Et objekt pr. række."],
          ["Id = 1", "Ved startdata **skal** du selv skrive `Id`. Ellers kan EF Core ikke vide, hvilken række den skal rette eller slette, hvis du senere ændrer startdataene."]
        ],
        md2: "Bagefter: `Add-Migration SeedDepartments` og `Update-Database` (Mac: `dotnet ef migrations add SeedDepartments` og `dotnet ef database update`)." },
      { t: "laes", h: "Migrationen med startdata — og når id'et er taget",
        md: "Migrationen bliver til en `InsertData`, altså en `INSERT` med de tre rækker:",
        kode: R`migrationBuilder.InsertData(
    table: "Departments",
    columns: new[] { "Id", "Name" },
    values: new object[,]
    {
        { 1, "Salg" },
        { 2, "Lager" },
        { 3, "IT" }
    });`,
        frag: true,
        md2: "Har du allerede oprettet afdelinger i hånden, findes der måske allerede en række med `Id` 1. Så stopper `Update-Database` med en fejl om, at primærnøglen allerede findes (på Mac: `UNIQUE constraint failed: Departments.Id`). Afprøvet.\n\nMens du udvikler, er den nemmeste løsning at starte databasen forfra. **Det sletter alle data i databasen**, men migrationerne er der jo stadig:\n\n- {{`Drop-Database` (bekræft, hvis du bliver spurgt), derefter `Update-Database`||`dotnet ef database drop --force`, derefter `dotnet ef database update`}}\n\nSå bliver alle migrationer kørt igen fra `Init`, og startdataene kommer ind uden at støde ind i noget." },
      { t: "valg", q: "Hvorfor skal du selv skrive `Id = 1`, `Id = 2` … i `HasData`, når databasen ellers selv giver id'er?",
        svar: ["EF Core skal kunne genkende præcis de rækker igen, hvis startdataene ændres i en senere migration", "Fordi databasen ikke kan tælle op for startdata", "Det er ikke nødvendigt — det er bare pænere", "Fordi `HasData` kun virker med lige tal"],
        ret: 0, fordi: "Retter du senere `\"IT\"` til `\"IT og support\"`, laver EF Core en migration med `UpdateData … keyValue: 3`. Det kan den kun, fordi den ved, at rækken har id 3." },
      { t: "laes", h: "Når modellen ændrer sig",
        md: "Chefen vil have medarbejdernes e-mail med. Du retter **aldrig** tabellen i hånden. Du retter klassen og laver en migration mere:\n\n1. Tilføj propertyen `public string? Email { get; set; }` med attributten `[EmailAddress]` over i `Employee`.\n2. {{`Add-Migration AddEmail`||`dotnet ef migrations add AddEmail`}} — migrationen indeholder kun forskellen: `AddColumn` med kolonnen `Email`.\n3. {{`Update-Database`||`dotnet ef database update`}}.\n4. **Ret views og controller.** Scaffoldingen skrev koden én gang; den opdaterer sig ikke selv. Tilføj et felt til `Email` i `Create.cshtml` og `Edit.cshtml`, en kolonne i `Index.cshtml`, og skriv `Email` i `[Bind(…)]` i **både** Create og Edit.\n\n`[EmailAddress]` er en valideringsattribut som `[Required]`: teksten skal ligne en e-mailadresse." },
      { t: "orden", sprog: "text",
        q: "Du skal have en ny kolonne `Phone` på medarbejderne. Sæt arbejdet i rækkefølge.", alt: [[0, 3, 1, 2, 4], [0, 1, 3, 2, 4]],
        linjer: ["Tilføj public string? Phone { get; set; } i Employee.cs", "Add-Migration AddPhone", "Update-Database", "Tilføj Phone i formularerne og i [Bind] i Create og Edit", "Kør programmet, og ret en medarbejder"],
        fordi: "Klassen først, så opskriften, så databasen. Views og `[Bind]` kan rettes før eller efter migrationen — men de skal rettes, før du afprøver det." },
      { t: "fejl", frag: true, logisk: true,
        q: "Du har tilføjet `Email` til `Employee`, lavet migration og database, og der er et e-mailfelt på formularen. Men når du opretter en medarbejder med en e-mail, er `Email` altid tom bagefter. Klik på linjen med fejlen.",
        kode: R`[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Create([Bind("Id,Name,Title,DepartmentId")] Employee employee)
{
    if (ModelState.IsValid)
    {
        _context.Add(employee);
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }
    ViewData["DepartmentId"] = new SelectList(_context.Departments, "Id", "Name", employee.DepartmentId);
    return View(employee);
}`,
        linje: 3,
        fordi: "`[Bind]` er en liste over de felter, der **må** komme ind. `Email` står der ikke, så model binding smider værdien væk — uden fejl. Afprøvet: med den gamle `[Bind]` bliver `Email` gemt som tom, og den bliver ikke engang valideret. Skriv `[Bind(\"Id,Name,Title,Email,DepartmentId\")]`, og gør det samme i Edit.",
        rettet: R`[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Create([Bind("Id,Name,Title,Email,DepartmentId")] Employee employee)
{
    if (ModelState.IsValid)
    {
        _context.Add(employee);
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }
    ViewData["DepartmentId"] = new SelectList(_context.Departments, "Id", "Name", employee.DepartmentId);
    return View(employee);
}` },
      { t: "valg", q: "Du har tilføjet `Email` i `Employee` og rettet views. Du kører programmet og klikker på **Medarbejdere**. Fejlsiden siger `SQLite Error 1: 'no such column: e.Email'` (på SQL Server: `Invalid column name 'Email'`). Hvad har du glemt?",
        svar: ["At lave migrationen og køre `Update-Database`, så kolonnen findes i databasen", "At tilføje `Email` i `[Bind]`", "`Include(e => e.Department)`", "At registrere `FirmaContext` i `Program.cs`"],
        ret: 0, fordi: "Klassen har propertyen, så EF Core spørger efter kolonnen — men tabellen har den ikke endnu. Afprøvet på SQLite: præcis den besked." },
      { t: "valg", q: "Du skriver `Update-Database` og får: **The model for context 'FirmaContext' has pending changes. Add a new migration before updating the database.** Hvad betyder det?",
        svar: ["Du har ændret en modelklasse uden at lave en migration for ændringen. Lav den med `Add-Migration`, og kør `Update-Database` igen", "Databasen er gået i stykker og skal slettes", "Connection stringen er forkert", "Der er en stavefejl i en migration"],
        ret: 0, fordi: "EF Core sammenligner dine klasser med den seneste migration og ser, at noget mangler. Afprøvet: beskeden kommer, når `Email` er tilføjet uden `Add-Migration`." },
      { t: "laes", h: "Opslag: fejlbeskeder og hvad de betyder",
        md: "Alle beskederne her er fremkaldt med vilje i FirmaApp. Find den, der ligner din, og læs, hvad du skal gøre.",
        noter: [
          ["Unable to resolve service for type 'FirmaContext' while attempting to activate '…Controller'", "`AddDbContext` mangler i `Program.cs`."],
          ["No database provider has been configured for this DbContext", "`: base(options)` mangler i konstruktøren i `FirmaContext` — eller `UseSqlServer`/`UseSqlite` mangler i `AddDbContext`."],
          ["The model for context '…' has pending changes", "Du har ændret en model. Lav `Add-Migration` først."],
          ["no such column / Invalid column name", "Migrationen er lavet, men ikke kørt — eller slet ikke lavet. `Add-Migration`, så `Update-Database`."],
          ["no such table / Invalid object name", "Databasen er der, men tabellen ikke: kør `Update-Database`. Ellers: tjek, at navnet i `GetConnectionString(…)` er stavet som i `appsettings.json`."],
          ["UNIQUE constraint failed / PRIMARY KEY", "Startdata eller en ny række har et `Id`, der allerede findes. Under udvikling: `Drop-Database` og `Update-Database`."],
          ["FOREIGN KEY constraint failed", "En medarbejder peger på et `DepartmentId`, der ikke findes."],
          ["The view 'Index' was not found", "Mappen under `Views` hedder ikke det samme som controlleren (fx `Department` i stedet for `Departments`)."],
          ["404 på Edit/Details/Delete", "Parameteren i actionen hedder ikke `id`, så tallet fra adressen når aldrig frem."],
          ["Kolonnen med afdelingen er tom", "`Include` mangler i forespørgslen."],
          ["En værdi fra formularen bliver ikke gemt", "Feltet står ikke i `[Bind(…)]`."],
          ["Create gør ingenting — formularen kommer bare tilbage uden fejltekst", "`ModelState.IsValid` er `false` på grund af et felt, der ikke står på formularen. Find det med debuggeren — det træner du i værkstedet."],
          ["ErrorActionPreference (Package Manager Console)", "Build → Clean Solution, Build → Build Solution, og kør kommandoen igen."]
        ] },
      { t: "valg", q: "Du klikker på **Afdelinger** og får **The view 'Index' was not found. The following locations were searched: /Views/Departments/Index.cshtml, /Views/Shared/Index.cshtml**. I Solution Explorer står viewsene i mappen `Views/Department`. Hvad gør du?",
        svar: ["Omdøber mappen til `Departments`, så den hedder det samme som controlleren", "Laver en ny migration", "Tilføjer `Include` i `Index`", "Retter connection stringen"],
        ret: 0, fordi: "MVC leder efter viewet i en mappe med controllerens navn uden `Controller`: `DepartmentsController` → `Views/Departments`. Underviseren fik den fejl, fordi Visual Studio havde lavet mappen i ental. Afprøvet: med mappen i ental kommer præcis den besked." },
      { t: "ide", h: "Startdata og e-mail i FirmaApp",
        md: "Gør det hele i dit eget projekt:",
        win: ["Tilføj `OnModelCreating` med de tre afdelinger i `FirmaContext` (trin 1).", "`Add-Migration SeedDepartments` og `Update-Database`. Får du fejlen om primærnøglen, så kør `Drop-Database` (bekræft, hvis du bliver spurgt) og `Update-Database`.", "Tilføj `Email` med `[EmailAddress]` i `Employee`. Kør `Update-Database` **uden** at lave en migration først, og læs beskeden. Lav så `Add-Migration AddEmail` og `Update-Database`.", "Tilføj e-mailfeltet i `Create.cshtml` og `Edit.cshtml` (kopiér blokken med `Title`, og ret navnet), og en kolonne i `Index.cshtml`.", "Tilføj `Email` i `[Bind]` i Create og Edit.", "Opret en medarbejder med en e-mail. Prøv også `ikke-en-mail`: den skal afvises med en fejlbesked."],
        mac: ["Tilføj `OnModelCreating` med de tre afdelinger i `FirmaContext` (trin 1).", "`dotnet ef migrations add SeedDepartments` og `dotnet ef database update`. Får du fejlen `UNIQUE constraint failed`, så kør `dotnet ef database drop --force` og `dotnet ef database update`.", "Tilføj `Email` med `[EmailAddress]` i `Employee`. Kør `dotnet ef database update` **uden** at lave en migration først, og læs beskeden. Lav så `dotnet ef migrations add AddEmail` og `dotnet ef database update`.", "Tilføj e-mailfeltet i `Create.cshtml` og `Edit.cshtml` (kopiér blokken med `Title`, og ret navnet), og en kolonne i `Index.cshtml`.", "Tilføj `Email` i `[Bind]` i Create og Edit.", "Opret en medarbejder med en e-mail. Prøv også `ikke-en-mail`: den skal afvises med en fejlbesked."],
        md2: "Kig til sidst i `__EFMigrationsHistory`: der er nu én række pr. migration, i den rækkefølge, du lavede dem." },
      { t: "forklar", q: "Forklar med dine egne ord: Du skal have en ny kolonne i en tabel i et code first-projekt. Hvordan gør du, og hvorfor retter du ikke bare tabellen i databasen?",
        svar: "Jeg tilføjer propertyen i **modelklassen**, laver en ny **migration** med `Add-Migration` og et navn, der siger, hvad den gør, og kører `Update-Database`. Migrationen indeholder kun **forskellen**, fx en `AddColumn`. Derefter retter jeg views og `[Bind]`, fordi den scaffoldede kode ikke opdaterer sig selv. Jeg retter ikke tabellen i hånden, fordi klasserne og databasen så ikke passer sammen længere: EF Core ville klage over **pending changes**, og ændringen ville ikke komme med, når databasen laves på en anden maskine. Med migrationer er databasens historik kode i projektet.",
        noegle: ["modelklasse", "Add-Migration", "Update-Database", "forskellen", "Bind", "pending changes"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m17v", titel: "Værksted: Bibliotek med forfattere og bøger", vaerksted: true, min: 120, ord: [], trin: [

    { t: "laes", h: "Sådan arbejder du i værkstedet",
      md: "Nu bygger du selv. Først en lille udvidelse af FirmaApp. Derefter en **ny app helt fra bunden**, `Bibliotek`, med forfattere og bøger — ud fra krav, ikke fra en opskrift. Det er den samme slags arbejde som i dit eksamensprojekt.\n\nEn webapp skriver ikke noget i et sort vindue, som siden her kan sammenligne. Derfor gør du sådan: læs kravene, byg, kør, og klik dig igennem siderne i browseren. Sæt flueben ved hvert krav, når du kan **se**, at det virker. Til sidst krydser du af, at programmet virker.",
      noter: [
        ["Skriv selv", "Skriv koden med dine egne fingre. Brug FirmaApp som opslag, men kopiér ikke. Det er skrivningen, der får det til at sidde."],
        ["Ét skridt ad gangen", "Byg efter hver lille ændring. Kør efter hver migration. Så ved du præcis, hvad der lavede en fejl."],
        ["Debuggeren", "Sæt et breakpoint i en action (klik i margenen), og start med debuggeren (Visual Studio: F5 · Rider: den grønne bille). Når du klikker på siden, stopper programmet i din action, og du kan se alle variabler i Locals (Visual Studio) / Threads & Variables (Rider)."],
        ["Fejlbeskeder", "Læs den røde tekst. Find den i opslaget i lektion 6, trin 9."],
        ["Tips før løsning", "Sidder du fast, så åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af."]
      ] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Afdelingernes adresse",
      md: "Afdelingerne i FirmaApp skal have en **lokation** — byen, de ligger i. Den må gerne være tom. Det er præcis samme arbejdsgang som med `Email` i lektion 6, bare på `Department`.",
      krav: [
        "`Department` har en property `Location` af typen `string?` med højst 50 tegn",
        "Der er en migration, der hedder `AddLocation`, og den er kørt på databasen",
        "Create- og Edit-siden for afdelinger har et felt til `Location`",
        "Listen over afdelinger har en kolonne med `Location`",
        "Når du retter `Lager` til at ligge i `Kolding`, står `Kolding` på listen bagefter"
      ],
      tip: [
        "Rækkefølgen: klassen → Add-Migration → Update-Database → views → `[Bind]`.",
        "Propertyen: `[StringLength(50)]` over `public string? Location { get; set; }`. Kopiér en hel `<div class=\"form-group\">…</div>`-blok i viewet, og ret `Name` til `Location` tre steder.",
        "Glemmer du `Location` i `[Bind(\"Id,Name,Location\")]` i Create **og** Edit, bliver værdien aldrig gemt — uden fejlbesked."
      ],
      frag: true, fri: true,
      output: "Afdelinger\nName      Location\nSalg\nLager     Kolding\nIT",
      loesning: R`// Models/Department.cs — ny property
[StringLength(50)]
public string? Location { get; set; }

// Package Manager Console:  Add-Migration AddLocation  og  Update-Database
// Mac (Terminal):           dotnet ef migrations add AddLocation  og  dotnet ef database update

// Controllers/DepartmentsController.cs — i Create OG Edit (POST)
[Bind("Id,Name,Location")] Department department

// Views/Departments/Create.cshtml og Edit.cshtml — under blokken med Name
// <div class="form-group">
//     <label asp-for="Location" class="control-label"></label>
//     <input asp-for="Location" class="form-control" />
//     <span asp-validation-for="Location" class="text-danger"></span>
// </div>

// Views/Departments/Index.cshtml — en kolonne mere
// <th>@Html.DisplayNameFor(model => model.Location)</th>
// <td>@Html.DisplayFor(modelItem => item.Location)</td>`,
      fordi: "Afprøvet i FirmaApp. Migrationen indeholder en `AddColumn` for `Location` — og en `UpdateData` for hver af de tre afdelinger fra `HasData`, fordi startdataene nu har en kolonne mere. Det er normalt.",
      ekstra: ["Vis også `Location` på Details- og Delete-siden.", "Giv feltet en dansk ledetekst med `[Display(Name = \"Lokation\")]` over propertyen — det kommer mere om i modul 18."] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Bibliotek: forfattere fra bunden",
      md: "Lav et **nyt** MVC-projekt, `Bibliotek`. Det skal holde styr på forfattere i en database, med startdata og CRUD-sider. Ingen opskrift denne gang — kun krav. Brug underviserens otte punkter fra lektion 4 (dem, du satte i rækkefølge) som tjekliste.\n\n**Du har allerede en mappe `Bibliotek`** fra værkstedet i modul 16. Projektet her skal også hedde `Bibliotek`, så navnene i koden passer. Læg det derfor i en ny, tom mappe, fx `Modul17`: {{skriv den nye mappe i feltet **Location**, når du opretter projektet||skriv den nye mappe i feltet **Solution directory**, når du opretter projektet (bruger du Terminal, så lav mappen, og kør kommandoen inde i den)}}. Det gamle projekt bliver liggende urørt.",
      krav: [
        "Nyt projekt `Bibliotek` (ASP.NET Core Web App, Model-View-Controller, .NET 10)",
        "Modellen `Author` har `Id`, `Name` (påkrævet, højst 60 tegn) og `Country` (må være tom, højst 40 tegn)",
        "Databaseklassen `BibliotekContext` ligger i mappen `Data` og har en `DbSet<Author> Authors`",
        "Connection stringen hedder `BibliotekContext`. Windows: databasen `BibliotekDB` i LocalDB. Mac: `Data Source=bibliotek.db`",
        "Startdata med `HasData`: forfatter 1 er `Tove Ditlevsen` fra `Danmark`, forfatter 2 er `Frank Herbert` fra `USA`",
        "Migrationen hedder `Init` og er kørt",
        "`AuthorsController` med views er scaffoldet, og menuen har punktet **Forfattere**",
        "Listen viser de to forfattere fra start. Du kan oprette, rette og slette en tredje"
      ],
      tip: [
        "Gå trinene igennem i rækkefølge: model → pakker → DbContext → connection string → `AddDbContext` → `Add-Migration Init` → `Update-Database` → scaffold → menu.",
        "Startdataene står i `OnModelCreating` i `BibliotekContext`: `modelBuilder.Entity<Author>().HasData(new Author { Id = 1, Name = \"Tove Ditlevsen\", Country = \"Danmark\" }, …);` Skriv dem **før** `Add-Migration Init`, så kommer de med i samme migration.",
        "På Mac skal værktøjerne hentes igen i det nye projekt: `dotnet new tool-manifest`, `dotnet tool install dotnet-ef --version 10.0.12` og `dotnet tool install dotnet-aspnet-codegenerator --version 10.0.2` — og `dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design --version 10.0.2`."
      ],
      frag: true, fri: true,
      output: "Forfattere\nName             Country\nTove Ditlevsen   Danmark\nFrank Herbert    USA",
      loesning: R`// Models/Author.cs
using System.ComponentModel.DataAnnotations;

namespace Bibliotek.Models
{
    public class Author
    {
        public int Id { get; set; }

        [Required]
        [StringLength(60)]
        public string Name { get; set; } = "";

        [StringLength(40)]
        public string? Country { get; set; }
    }
}

// Data/BibliotekContext.cs
using Bibliotek.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliotek.Data
{
    public class BibliotekContext : DbContext
    {
        public BibliotekContext(DbContextOptions<BibliotekContext> options) : base(options)
        {
        }

        public DbSet<Author> Authors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Author>().HasData(
                new Author { Id = 1, Name = "Tove Ditlevsen", Country = "Danmark" },
                new Author { Id = 2, Name = "Frank Herbert", Country = "USA" });
        }
    }
}

// appsettings.json — efter "AllowedHosts": "*",
//   Windows: "ConnectionStrings": { "BibliotekContext": "Server=(localdb)\\MSSQLLocalDB;Database=BibliotekDB;Trusted_Connection=True;TrustServerCertificate=True" }
//   Mac:     "ConnectionStrings": { "BibliotekContext": "Data Source=bibliotek.db" }

// Program.cs — under AddControllersWithViews (Mac: UseSqlite)
builder.Services.AddDbContext<BibliotekContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BibliotekContext")));

// Add-Migration Init, Update-Database, scaffold AuthorsController (model Author, BibliotekContext)

// Views/Shared/_Layout.cshtml — nyt menupunkt
// <li class="nav-item">
//     <a class="nav-link text-dark" asp-area="" asp-controller="Authors" asp-action="Index">Forfattere</a>
// </li>`,
      fordi: "Afprøvet med SQLite: efter `Update-Database` viser `/Authors` de to forfattere fra startdataene, før man har oprettet noget." },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Bøger med en forfatter",
      md: "Biblioteket skal have **bøger**. Hver bog har én forfatter, og en forfatter kan have mange bøger — en én-til-mange-relation som afdelinger og medarbejdere.",
      krav: [
        "Modellen `Book` har `Id`, `Title` (påkrævet, højst 100 tegn), `Year` (et heltal), `AuthorId` og en navigation property `Author`",
        "`Author` har en liste `Books`",
        "`BibliotekContext` har en `DbSet<Book> Books`",
        "Migrationen hedder `AddBook` og er kørt. Tabellen `Books` har en fremmednøgle til `Authors`",
        "`BooksController` er scaffoldet, og menuen har punktet **Bøger**",
        "På Create-siden for bøger vælger man forfatter i en dropdown, der viser **navne**",
        "Opret bøgerne `Barndom` (1967), `Ungdom` (1967) og `Gift` (1971) af Tove Ditlevsen og `Dune` (1965) af Frank Herbert",
        "Listen over bøger viser forfatterens navn i hver række"
      ],
      tip: [
        "Kig på `Employee` og `Department` i FirmaApp. `Book` svarer til `Employee`, og `Author` svarer til `Department`.",
        "Fremmednøglen hedder `AuthorId` (klassens navn + `Id`), og navigation propertyen er `public Author? Author { get; set; }` — **med** spørgsmålstegn. I `Author`: `public List<Book> Books { get; set; } = new List<Book>();`",
        "Viser listen ikke forfatternavnet, så tjek, at `Index` i `BooksController` har `.Include(b => b.Author)`. Viser dropdownen tal, så ret `SelectList(_context.Authors, \"Id\", \"Id\")` til `\"Id\", \"Name\"`."
      ],
      frag: true, fri: true,
      output: "Bøger\nTitle     Year   Author\nBarndom   1967   Tove Ditlevsen\nUngdom    1967   Tove Ditlevsen\nGift      1971   Tove Ditlevsen\nDune      1965   Frank Herbert",
      loesning: R`// Models/Book.cs
using System.ComponentModel.DataAnnotations;

namespace Bibliotek.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; } = "";

        public int Year { get; set; }

        public int AuthorId { get; set; }
        public Author? Author { get; set; }
    }
}

// Models/Author.cs — ny property
public List<Book> Books { get; set; } = new List<Book>();

// Data/BibliotekContext.cs — ny tabel
public DbSet<Book> Books { get; set; }

// Add-Migration AddBook, Update-Database, scaffold BooksController (model Book)
// Menupunkt: asp-controller="Books" med teksten Bøger

// BooksController — scaffoldingen skriver selv:
// Index:  _context.Books.Include(b => b.Author)
// Create: ViewData["AuthorId"] = new SelectList(_context.Authors, "Id", "Name");`,
      fordi: "Afprøvet med SQLite: migrationen laver `Books` med fremmednøglen `FK_Books_Authors_AuthorId`, dropdownen viser forfatternes navne, og listen viser forfatteren ved hver bog." },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Fejlfinding: Create gør ingenting",
      md: "En kollega fik en gul advarsel ved `Author` i `Book.cs` og \"rettede\" den. Siden da virker det ikke at oprette bøger: man udfylder formularen, klikker **Create** — og formularen kommer bare tilbage. Ingen rød tekst, ingen ny bog på listen.\n\nErstat navigation propertyen i **din** `Book.cs` med kollegaens linje herunder (resten af klassen er uændret). Find fejlen **med debuggeren**, før du retter den — det er hele øvelsen.",
      start: R`// Models/Book.cs — kollegaens linje i stedet for den med Author?
public Author Author { get; set; } = new Author();`,
      startFejler: true,
      krav: [
        "Du har set fejlen ske: Create giver ingen fejltekst og gemmer intet",
        "Du har sat et breakpoint på `if (ModelState.IsValid)` i POST-udgaven af `Create` i `BooksController` og startet med debuggeren",
        "Du har set, at `ModelState.IsValid` er `false`, selv om titel, år og forfatter er udfyldt",
        "Du har fundet, **hvilket felt** fejlen står på, og hvad fejlteksten er",
        "Du har rettet `Book.cs`, så det virker igen, og der er ingen gul advarsel"
      ],
      tip: [
        "Når programmet står stille på breakpointet, så hold musen over `ModelState`, eller find den i {{Locals||Threads & Variables}}. Den har en `ErrorCount`, og hvert felt har sine fejl under `Values` / `Errors`.",
        "Er det svært at finde i debuggeren, så sæt disse linjer lige over `if (ModelState.IsValid)` og kig i {{det sorte konsolvindue, som åbner sammen med programmet||Run-vinduet i Rider}}: `foreach (var felt in ModelState) { foreach (var fejl in felt.Value.Errors) { Console.WriteLine($\"{felt.Key}: {fejl.ErrorMessage}\"); } }`",
        "Fejlen står på `Author.Name`: The Name field is required. `new Author()` laver en tom forfatter, og den bliver valideret sammen med bogen — den tomme forfatters `Name` er `[Required]` og tomt. Feltet står ikke på formularen, så fejlen vises ingen steder."
      ],
      frag: true, fri: true,
      output: "Author.Name: The Name field is required.",
      loesning: R`// Models/Book.cs — navigation propertyen skal kunne være null:
public Author? Author { get; set; }

// Hvorfor:
// MVC validerer hele objektet, også objekter inde i det.
// = new Author() giver bogen en tom forfatter med Name = "".
// Author.Name er [Required], så ModelState.IsValid bliver false.
// Formularen har intet felt til Author.Name, så fejlteksten vises ingen steder.
//
// Uden "= new Author()" (public Author Author { get; set; }) sker det samme
// med fejlen "Author: The Author field is required.", fordi en property
// uden ? i et projekt med <Nullable>enable</Nullable> tæller som påkrævet.
//
// Med Author? må den være null, når formularen kommer ind. EF Core bruger
// AuthorId til at gemme forbindelsen.`,
      fordi: "Afprøvet: med `= new Author()` skriver løkken fra tip 2 `Author.Name: The Name field is required.`, og intet bliver gemt. Med `public Author Author { get; set; }` (ingen `?`, ingen startværdi) kommer `Author: The Author field is required.` — samme fejl som i FirmaApp med `Department`. Med `Author?` virker det. Husk det til eksamen: **navigation properties skal have `?`**." },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Forfatterens side",
      md: "Til sidst samler du det hele: forfatterlisten skal vise, hvor mange bøger hver forfatter har, og forfatterens Details-side skal vise bøgerne sorteret efter år.",
      krav: [
        "Listen over forfattere (`/Authors`) har en kolonne **Antal bøger** med det rigtige tal: Tove Ditlevsen 3, Frank Herbert 1",
        "Details for Tove Ditlevsen (`/Authors/Details/1`) har overskriften **Bøger** og en punktliste med hendes bøger",
        "Hvert punkt viser titel og år sådan: `Barndom (1967)`",
        "Bøgerne står sorteret efter år, ældste først",
        "Sletter du en forfatter, forsvinder forfatterens bøger også fra bogsiden (cascade delete)"
      ],
      tip: [
        "Både `Index` og `Details` i `AuthorsController` skal hente bøgerne med: `.Include(a => a.Books)`. Uden det er antallet altid 0.",
        "I `Index.cshtml`: en `<th>Antal bøger</th>` i hovedet og en `<td>@item.Books.Count</td>` i rækken.",
        "I `Details.cshtml`: `<h4>Bøger</h4>`, så `<ul>` med `@foreach (var b in Model.Books.OrderBy(b => b.Year))` og `<li>@b.Title (@b.Year)</li>` — `OrderBy` fra modul 9."
      ],
      frag: true, fri: true,
      output: "Forfattere\nName             Country   Antal bøger\nTove Ditlevsen   Danmark   3\nFrank Herbert    USA       1\n\n/Authors/Details/1:\nBøger\n• Barndom (1967)\n• Ungdom (1967)\n• Gift (1971)",
      loesning: R`// Controllers/AuthorsController.cs — Index
public async Task<IActionResult> Index()
{
    return View(await _context.Authors.Include(a => a.Books).ToListAsync());
}

// Controllers/AuthorsController.cs — Details
var author = await _context.Authors
    .Include(a => a.Books)
    .FirstOrDefaultAsync(m => m.Id == id);

// Views/Authors/Index.cshtml
//   i <thead>, efter kolonnen med Country:   <th>Antal bøger</th>
//   i rækken, efter cellen med Country:      <td>@item.Books.Count</td>

// Views/Authors/Details.cshtml — efter </dl>
// <h4>Bøger</h4>
// <ul>
//     @foreach (var b in Model.Books.OrderBy(b => b.Year))
//     {
//         <li>@b.Title (@b.Year)</li>
//     }
// </ul>`,
      fordi: "Afprøvet: listen viser 3 og 1, og Details for forfatter 1 viser Barndom (1967), Ungdom (1967) og Gift (1971). Barndom og Ungdom er begge fra 1967; `OrderBy` lader dem stå i den rækkefølge, de blev oprettet.",
      ekstra: ["Vis antallet af bøger i overskriften: `Bøger (3)`.", "Lav en side, der kun viser bøger fra før 1970 — med `Where` i en ny action i `BooksController`.", "Forklar højt, som til eksamen, hvad `Include` gør, og hvad der sker uden den."] }
  ] }
  ]
});
})();
