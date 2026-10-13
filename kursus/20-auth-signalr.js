// Modul 20 — Login, roller og realtid. Forudsætter: modul 0–19.
// Al ASP.NET-kode er afprøvet i et rigtigt projekt (KlubWeb og Bibliotek, .NET 10, SQLite) og derefter sat ind med frag: true.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m20", nr: 20, del: "Del 5 · ASP.NET Core", ikon: "🔐",
  titel: "Login, roller og realtid",
  dag: "Kursusdag 17 · WebSocket og authentication",
  intro: "Næsten alle eksamensprojekter har brugere: nogen skal logge ind, og nogle må mere end andre. I dette modul bygger du **KlubWeb**, en hjemmeside for en sportsklub, trin for trin: login med **ASP.NET Core Identity**, sider kun for medlemmer, **roller** (admin, træner, medlem), en admin-side, der opretter brugere, og en **chat**, der opdaterer sig selv i realtid med **SignalR**.\n\nTil sidst ved du, hvordan adgangskoder gemmes sikkert, hvad HTTPS og anti-forgery beskytter imod, og hvorfor hemmeligheder ikke må stå i koden. I værkstedet bygger du selv en ny app, **Bibliotek**, ud fra en liste med krav.",
  video: ["17_Tirs_Auth_WS.mp4 (3 t 47 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m20l1", titel: "Hvem er du? Login med ASP.NET Core Identity", min: 18,
    ord: [
      ["Authentication", "At finde ud af, **hvem** brugeren er — typisk med e-mail og adgangskode. Det er det, der sker ved login. På dansk: autentificering."],
      ["Authorization", "At afgøre, hvad en kendt bruger **må** — fx at kun administratorer må se admin-siden. På dansk: autorisation."],
      ["ASP.NET Core Identity", "Microsofts færdige system til brugere: registrering, login, logout, hashede adgangskoder, roller og tabellerne i databasen til det hele."],
      ["Individual Accounts", "Valget i projektskabelonen, der lægger Identity ind i et nyt projekt, så hver bruger har sin egen konto i appens database."],
      ["IdentityUser", "Klassen for én bruger i Identity. Har bl.a. `Id`, `UserName`, `Email` og `PasswordHash`. Én række i tabellen AspNetUsers."],
      ["IdentityDbContext", "En DbContext, der allerede har et DbSet til hver Identity-tabel. Projektets `ApplicationDbContext` arver fra den."],
      ["Cookie", "En lille tekst, som serveren beder browseren gemme og sende med ved hver forespørgsel. Identity bruger en cookie til at huske, at du er logget ind."],
      ["Razor Pages", "En anden måde at lave sider på i ASP.NET Core: siden og dens kode hører sammen uden en controller. Identitys sider (Login, Register …) er Razor Pages."]
    ],
    trin: [
      { t: "laes", h: "To spørgsmål: hvem er du, og hvad må du?",
        md: "Når en side kræver login, er der altid to spørgsmål, og de har hvert sit navn:\n\n- **Authentication** — *hvem er du?* Brugeren beviser, hvem hun er, typisk med e-mail og adgangskode. Det er det, der sker, når man logger ind.\n- **Authorization** — *hvad må du?* Serveren kender nu brugeren og afgør, om hun må se netop denne side.\n\nDet svarer til et hotel: i receptionen viser du dit pas og får et nøglekort (authentication). Nøglekortet åbner kun dit eget værelse, ikke de andres (authorization).\n\nRækkefølgen ligger fast: man kan ikke afgøre, hvad en person må, før man ved, hvem personen er.",
        noter: [
          ["Authentication", "Hvem er du? Det sker ved login."],
          ["Authorization", "Hvad må du? Det sker, hver gang du beder om en side."],
          ["Ordene i koden", "De står på engelsk i koden (`UseAuthentication`, `[Authorize]`), så brug de engelske ord, når du forklarer til eksamen."]
        ] },
      { t: "valg", q: "Ida skriver sin e-mail og adgangskode og trykker **Log in**. Hvilken del er det?",
        svar: ["Authentication — serveren finder ud af, hvem hun er", "Authorization — serveren afgør, hvad hun må", "Begge dele på én gang", "Ingen af delene — det er bare en formular"],
        ret: 0, fordi: "Login er at **bevise, hvem man er**. Det er authentication. Hvad hun bagefter må se, afgøres først, når hun beder om en bestemt side." },
      { t: "valg", q: "Bo er logget ind, men får siden **Access denied**, da han prøver at åbne admin-siden. Hvilken del sagde nej?",
        svar: ["Authorization — serveren kender ham, men han har ikke lov", "Authentication — serveren ved ikke, hvem han er", "Databasen — den er gået ned", "Browseren — den blokerer siden"],
        ret: 0, fordi: "Serveren **ved**, at det er Bo, så authentication lykkedes. Den har bare afgjort, at Bo ikke **må** se siden. \"Access denied\" er altid et authorization-svar." },
      { t: "laes", h: "ASP.NET Core Identity: et færdigt login-system",
        md: "At bygge login selv er svært og farligt: adgangskoder skal gemmes sikkert, login skal huskes fra side til side, glemte adgangskoder skal kunne nulstilles. Derfor bruger man **ASP.NET Core Identity**, som Microsoft har lavet og testet.\n\nVælger du **Individual Accounts**, når du laver et nyt MVC-projekt, får du:\n\n- sider til **Register**, **Login**, **Logout** og **Manage** (skift adgangskode m.m.) — de ligger færdige i en NuGet-pakke, så du ser dem ikke som filer\n- en **database** med tabeller til brugere og roller\n- adgangskoder, der gemmes som en **hash** (lektion 6) og aldrig som klartekst\n- en **cookie**, der husker, at brugeren er logget ind\n\nDin første app i modulet hedder **KlubWeb**: en hjemmeside for en sportsklub, hvor medlemmerne logger ind." },
      { t: "ide", h: "Opret KlubWeb med Individual Accounts",
        md: "Lav projektet nu. På Windows bruger det LocalDB, på Mac SQLite. Resten af modulet er ens på de to.",
        win: [
          "Start Visual Studio, og vælg **Create a new project**.",
          "Vælg **ASP.NET Core Web App (Model-View-Controller)** → **Next**.",
          "Project name: `KlubWeb` → **Next**.",
          "Framework: **.NET 10.0**. Authentication type: **Individual Accounts**. Klik **Create**.",
          "Åbn `appsettings.json`. Connection string peger på LocalDB: `Server=(localdb)\\\\mssqllocaldb;Database=aspnet-KlubWeb-…;Trusted_Connection=True;MultipleActiveResultSets=true`.",
          "Åbn **Tools → NuGet Package Manager → Package Manager Console**, og skriv `Update-Database`. Den opretter databasen og tabellerne ud fra den migration, der fulgte med skabelonen.",
          "Kør projektet med den grønne pil ▶. Øverst til højre står **Register** og **Login**."
        ],
        mac: [
          "Åbn en terminal i den mappe, projektet skal ligge i, og skriv: `dotnet new mvc --auth Individual -o KlubWeb`. `--auth Individual` er det samme som Individual Accounts.",
          "Åbn mappen `KlubWeb` i Rider med **File → Open**.",
          "Åbn `appsettings.json`. Connection string er `DataSource=app.db;Cache=Shared` — en SQLite-fil i projektmappen. Skabelonen har allerede lagt tabellerne ind i `app.db`.",
          "Skriv i terminalen, mens du står i projektmappen: `dotnet ef database update`. Står der `Done.`, er databasen opdateret. (Værktøjet `dotnet-ef` installerede du i modul 17.)",
          "Kør projektet med den grønne pil ▶. Øverst til højre står **Register** og **Login**."
        ],
        md2: "Registrér ikke en bruger endnu. Der er én linje i `Program.cs`, der skal rettes først — det kommer om lidt." },
      { t: "laes", h: "Filerne, Individual Accounts har lagt ind",
        md: "Ud over det, du kender fra modul 16, har skabelonen lagt nogle filer ind. Den vigtigste er `Data/ApplicationDbContext.cs`:",
        kode: R`using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace KlubWeb.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext(options)
{
}`,
        frag: true,
        noter: [
          ["(DbContextOptions<ApplicationDbContext> options)", "En **primær konstruktør**: parentesen lige efter klassenavnet er en kort måde at skrive en konstruktør, der tager `options` og sender dem videre til basisklassen."],
          [": IdentityDbContext(options)", "Arver fra `IdentityDbContext`, der allerede har et DbSet til hver Identity-tabel. Dine egne `DbSet`s kan du skrive inde i klassen som i modul 17."],
          ["Data/Migrations/…CreateIdentitySchema.cs", "Migrationen, der laver Identity-tabellerne."],
          ["Views/Shared/_LoginPartial.cshtml", "Den lille menu øverst til højre: Register og Login — eller Hello …! og Logout, når man er logget ind."],
          ["Areas/Identity/Pages/_ViewStart.cshtml", "Får Identitys sider til at bruge dit `_Layout.cshtml`. Selve siderne ligger i NuGet-pakken `Microsoft.AspNetCore.Identity.UI`."],
          ["KlubWeb.csproj", "NuGet-pakkerne til Identity og EF Core og en `UserSecretsId`, som du bruger i lektion 6."]
        ] },
      { t: "laes", h: "Program.cs: de linjer, Identity har lagt ind",
        md: "Til eksamen kan du blive spurgt, hvad linjerne i `Program.cs` gør. Her er dem, der har med databasen og Identity at gøre. Resten kender du fra modul 16 og 17.",
        kode: R`var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddControllersWithViews();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}

app.UseAuthorization();

app.MapRazorPages()
   .WithStaticAssets();`,
        frag: true,
        noter: [
          ["GetConnectionString(\"DefaultConnection\")", "Henter forbindelsen til databasen fra `appsettings.json`. Findes den ikke, stopper programmet med en tydelig fejl (`?? throw`)."],
          ["AddDbContext<ApplicationDbContext>", "Registrerer databasen i dependency injection som i modul 17. På Mac står der `UseSqlite` i stedet for `UseSqlServer`."],
          ["AddDatabaseDeveloperPageExceptionFilter()", "Viser en hjælpsom fejlside under udvikling, hvis databasen mangler en migration."],
          ["AddDefaultIdentity<IdentityUser>", "Slår Identity til med `IdentityUser` som brugerklasse. Registrerer også `UserManager` og `SignInManager`, som du får brug for senere."],
          ["RequireConfirmedAccount = true", "En ny bruger skal bekræfte sin e-mail, før hun kan logge ind. Det retter vi om lidt."],
          [".AddEntityFrameworkStores<ApplicationDbContext>()", "Brugerne gemmes med EF Core i din database gennem `ApplicationDbContext`."],
          ["UseMigrationsEndPoint()", "Kun under udvikling: mangler databasen en migration, kan du køre den med en knap på fejlsiden."],
          ["UseAuthorization()", "Tjekker adgangen til siderne. Det er emnet i næste lektion."],
          ["MapRazorPages()", "Identitys sider er **Razor Pages**, ikke MVC-views. Linjen gør dem tilgængelige under `/Identity/Account/…`, fx `/Identity/Account/Login`."]
        ] },
      { t: "valg", q: "Hvad betyder `.AddEntityFrameworkStores<ApplicationDbContext>()` i `Program.cs`?",
        svar: ["At Identity gemmer brugere og roller i databasen gennem ApplicationDbContext", "At der laves en ny database for hver bruger", "At adgangskoderne gemmes i appsettings.json", "At projektet skifter fra MVC til Razor Pages"],
        ret: 0, fordi: "Identity skal have et sted at gemme brugerne. Linjen siger: brug EF Core og den DbContext, der hedder `ApplicationDbContext`. Derfor havner Identity-tabellerne i samme database som resten af dine data." },
      { t: "udfyld", q: "Med `RequireConfirmedAccount = true` kan en ny bruger ikke logge ind, før e-mailen er bekræftet — og projektet kan ikke sende e-mails. Ret linjen, så man kan logge ind lige efter registreringen.",
        kode: R`builder.Services.AddDefaultIdentity<[[IdentityUser]]>(options => options.SignIn.RequireConfirmedAccount = [[false]])
    .AddEntityFrameworkStores<ApplicationDbContext>();`,
        frag: true,
        fordi: "Under udvikling slår man kravet fra. I en rigtig app ville man koble en e-mail-tjeneste på og lade kravet stå. Typen i de spidse parenteser er brugerklassen, `IdentityUser`." },
      { t: "ide", h: "Registrér den første bruger",
        md: "Ret `RequireConfirmedAccount` til `false` i `Program.cs`, og kør projektet igen.\n\n1. Klik **Register**. Skriv `ida@klubweb.dk` og en adgangskode, fx `Ida123!`, i begge adgangskodefelter, og klik **Register**.\n2. Adgangskoden skal have mindst 6 tegn, både store og små bogstaver, et tal og et tegn, der hverken er bogstav eller tal. Ellers viser siden engelske fejlbeskeder om netop det, fx **Passwords must have at least one digit ('0'-'9').**\n3. Bagefter er du logget ind: øverst til højre står **Hello ida@klubweb.dk!** og **Logout**.\n4. Klik **Logout**, og log ind igen med **Login**.",
        md2: "Siderne er på engelsk, fordi de kommer færdige fra Identity. Det er helt normalt i et skoleprojekt." },
      { t: "laes", h: "Tabellerne, Identity har lavet",
        md: "Åbn databasen: {{**View → SQL Server Object Explorer** → `(localdb)\\MSSQLLocalDB` → Databases → `aspnet-KlubWeb-…` → Tables||åbn `app.db` i Riders **Database**-vindue, som du gjorde med SQLite i modul 12}}. Du ser disse tabeller:",
        noter: [
          ["AspNetUsers", "Én række pr. bruger: Id, UserName, Email, PasswordHash …"],
          ["AspNetRoles", "Én række pr. rolle, fx Admin. Tom indtil lektion 3."],
          ["AspNetUserRoles", "Forbinder brugere og roller med `UserId` og `RoleId`. En koblingstabel (many-to-many) som i modul 12."],
          ["AspNetUserClaims og AspNetRoleClaims", "Ekstra oplysninger om en bruger eller rolle, såkaldte *claims*."],
          ["AspNetUserLogins", "Login via fx Google eller Microsoft i stedet for adgangskode."],
          ["AspNetUserTokens", "Koder til fx nulstilling af adgangskode og to-faktor-login."],
          ["__EFMigrationsHistory", "EF Cores liste over de migrationer, der er kørt (modul 17)."]
        ],
        md2: "Find Idas række i `AspNetUsers`. Kolonnen `PasswordHash` indeholder en lang, uforståelig tekst — ikke `Ida123!`. Hvorfor, lærer du i lektion 6." },
      { t: "valg", q: "Hvilken tabel fortæller, at en bestemt bruger er administrator?",
        svar: ["AspNetUserRoles — den kobler en bruger til en rolle", "AspNetUsers — rollen står i en kolonne", "AspNetRoles — den har en kolonne med brugere", "__EFMigrationsHistory"],
        ret: 0, fordi: "En bruger kan have flere roller, og en rolle kan have mange brugere. Det er many-to-many, og det løses med en koblingstabel: **AspNetUserRoles** med `UserId` og `RoleId`." },
      { t: "valg", q: "Ida er logget ind og klikker videre til en ny side. HTTP husker ikke noget fra én forespørgsel til den næste. Hvordan ved serveren, at det stadig er Ida?",
        svar: ["Browseren sender login-cookien med i hver forespørgsel", "Browseren sender e-mail og adgangskode med hver gang", "Serveren husker computerens IP-adresse", "Det ved den ikke — hun skal logge ind på hver side"],
        ret: 0, fordi: "Ved login sender serveren en **cookie**, der hedder `.AspNetCore.Identity.Application`. Browseren sender den automatisk med i alle de efterfølgende forespørgsler. Cookien er krypteret, så brugeren ikke kan rette i den. Logout sletter den." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er forskellen på authentication og authorization? Giv et eksempel fra en webapp.",
        svar: "**Authentication** er at finde ud af, **hvem** brugeren er. I min app sker det, når man logger ind med e-mail og adgangskode gennem ASP.NET Core Identity; bagefter genkender serveren brugeren på login-**cookien**. **Authorization** er at afgøre, **hvad** brugeren må — fx at kun brugere med **rollen** Admin må åbne admin-siden. Authentication kommer altid **først**, for man kan ikke afgøre, hvad en person må, før man ved, hvem det er.",
        noegle: ["hvem", "hvad", "login", "cookie", "rolle", "først"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m20l2", titel: "Lås siderne: [Authorize] og pipelinen", min: 18,
    ord: [
      ["[Authorize]", "Attribut på en action eller controller: kun brugere, der er logget ind, må komme ind."],
      ["[AllowAnonymous]", "Attribut, der laver en undtagelse: denne action må alle se, selvom controlleren har [Authorize]."],
      ["Anonym bruger", "En besøgende, der ikke er logget ind."],
      ["ReturnUrl", "Adressen, brugeren prøvede at åbne. Login-siden sender brugeren tilbage dertil efter login."],
      ["Middleware", "Et led i den kæde (pipeline), som hver forespørgsel løber igennem, i den rækkefølge linjerne står i `Program.cs`."],
      ["UseAuthentication", "Middleware, der læser login-cookien og finder ud af, hvem brugeren er."],
      ["UseAuthorization", "Middleware, der kigger på [Authorize] og afgør, om brugeren må komme ind."],
      ["ClaimsPrincipal", "Typen på `User` i controllere og views: den aktuelle bruger med en liste af claims."],
      ["Claim", "Én oplysning om brugeren, fx navnet eller en rolle."]
    ],
    trin: [
      { t: "laes", h: "[Authorize]: kun for brugere, der er logget ind",
        md: "KlubWeb skal have en **medlemsside**, som kun brugere, der er logget ind, må se. Det kræver én linje: attributten `[Authorize]` over actionen.",
        kode: R`using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using KlubWeb.Models;

namespace KlubWeb.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    [Authorize]
    public IActionResult Medlemsside()
    {
        return View();
    }
}`,
        frag: true,
        noter: [
          ["using Microsoft.AspNetCore.Authorization;", "Her bor `[Authorize]`. Uden den linje kender compileren ikke attributten."],
          ["[Authorize]", "Gælder kun den action, den står over. `Index` er stadig åben for alle."]
        ],
        md2: "Hvad sker der, hvis en, der **ikke** er logget ind, går til `/Home/Medlemsside`? Serveren sender ikke siden. Den svarer med statuskode **302** (\"gå et andet sted hen\") og adressen\n\n`/Identity/Account/Login?ReturnUrl=%2FHome%2FMedlemsside`\n\n`ReturnUrl` er den side, man prøvede at åbne (`%2F` er en kodet `/`). Når man har logget ind, sender login-siden én tilbage dertil." },
      { t: "valg", q: "Actionen `Medlemsside` har `[Authorize]`. En besøgende, der ikke er logget ind, skriver `/Home/Medlemsside` i adresselinjen. Hvad sker der?",
        svar: ["Browseren sendes til login-siden, og efter login kommer den tilbage til medlemssiden", "Siden vises, men uden indhold", "Serveren svarer 404 Not Found", "Programmet går ned med en exception"],
        ret: 0, fordi: "`[Authorize]` giver et **302-svar** til login-siden med `ReturnUrl=%2FHome%2FMedlemsside`. Efter login bruger login-siden `ReturnUrl` til at sende brugeren tilbage." },
      { t: "laes", h: "På hele controlleren — med én undtagelse",
        md: "Står `[Authorize]` over **klassen**, gælder den alle controllerens actions. Skal én af dem alligevel være åben for alle, sætter du `[AllowAnonymous]` på den.",
        kode: R`[Authorize]
public class TraenerController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    [AllowAnonymous]
    public IActionResult Tider()
    {
        return Content("Træning: tirsdag og torsdag kl. 18");
    }
}`,
        frag: true,
        md2: "`/Traener` kræver login. `/Traener/Tider` kan alle se. I lektion 3 strammer vi `[Authorize]` op, så kun trænere kommer ind på `/Traener`." },
      { t: "valg", q: "Hvilke adresser kan en besøgende, der **ikke** er logget ind, se?",
        kode: R`[Authorize]
public class KampController : Controller
{
    public IActionResult Index() { return View(); }

    [AllowAnonymous]
    public IActionResult Resultater() { return View(); }

    public IActionResult Opstilling() { return View(); }
}`,
        frag: true,
        svar: ["Kun /Kamp/Resultater", "/Kamp/Resultater og /Kamp/Opstilling", "Alle tre", "Ingen af dem"],
        ret: 0, fordi: "`[Authorize]` på klassen gælder alle actions. Kun `Resultater` har en undtagelse med `[AllowAnonymous]`. `Opstilling` står efter undtagelsen, men attributten gælder kun den ene action, den står lige over." },
      { t: "skriv", q: "Skriv controlleren `KlubController` med to actions, `Medlemmer` og `Aabningstider`, der begge returnerer `View()`. Alle actions skal kræve login — undtagen `Aabningstider`, som alle må se. Brug `[Authorize]` og `[AllowAnonymous]`.",
        tjek: [
          [/\[Authorize\]public class KlubController/, "Sæt `[Authorize]` lige over klassen"],
          [/\[AllowAnonymous\]public IActionResult Aabningstider\(\)/, "Sæt `[AllowAnonymous]` lige over `Aabningstider`"],
          [/public IActionResult Medlemmer\(\)/, "Lav actionen `Medlemmer`"],
          [/\[AllowAnonymous\]public IActionResult Medlemmer/, "`Medlemmer` må ikke være åben for alle", "ikke"]
        ],
        forkert: [R`[AllowAnonymous]
public class KlubController : Controller
{
    public IActionResult Medlemmer() { return View(); }

    [Authorize]
    public IActionResult Aabningstider() { return View(); }
}`],
        loesning: R`[Authorize]
public class KlubController : Controller
{
    public IActionResult Medlemmer()
    {
        return View();
    }

    [AllowAnonymous]
    public IActionResult Aabningstider()
    {
        return View();
    }
}`,
        frag: true },
      { t: "laes", h: "Pipelinen: først hvem, så hvad",
        md: "Hver forespørgsel løber gennem en kæde af **middleware** i `Program.cs`, i den rækkefølge linjerne står. To af leddene handler om login:",
        kode: R`app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

app.MapRazorPages()
   .WithStaticAssets();`,
        frag: true,
        noter: [
          ["UseRouting()", "Finder ud af, hvilken controller og action adressen passer til — og dermed om den har `[Authorize]`."],
          ["UseAuthentication()", "Læser login-cookien og fylder `User` ud: hvem er det?"],
          ["UseAuthorization()", "Kigger på `[Authorize]` og `User`: må personen komme ind? Hvis ikke, sendes hun til login eller til Access denied."],
          ["MapControllerRoute / MapRazorPages", "Først nu kører din controller eller Identitys side og laver HTML'en."]
        ],
        md2: "**Bemærk:** Skabelonen i .NET 10 skriver kun `app.UseAuthorization();`. Det virker alligevel, fordi ASP.NET Core selv sætter authentication ind i pipelinen, når Identity er slået til. Skriv alligevel `app.UseAuthentication();` selv — så kan du se og forklare rækkefølgen. Og skriver du den, skal den stå **før** `UseAuthorization`." },
      { t: "orden", q: "Sæt linjerne i den rækkefølge, de skal stå i `Program.cs`.",
        linjer: [R`app.UseRouting();`, R`app.UseAuthentication();`, R`app.UseAuthorization();`, R`app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");`],
        frag: true,
        fordi: "Først findes ruten, så findes brugeren (authentication), så tjekkes adgangen (authorization), og til sidst kører controlleren. Man kan ikke tjekke, hvad en bruger må, før man ved, hvem det er." },
      { t: "fejl", q: "Programmet efterligner pipelinen med to metoder. Ida *er* logget ind — hendes cookie er med — men hun bliver alligevel sendt til login. To linjer står i forkert rækkefølge. Klik på den af dem, der kører for tidligt.",
        kode: R`string? bruger = null;
string svar = "";

Authorization();
Authentication();
Console.WriteLine(svar);

void Authentication()
{
    bruger = "ida@klubweb.dk";
}

void Authorization()
{
    svar = bruger == null ? "Send til login" : "Vis siden";
}`,
        linje: 4, logisk: true, output: "Send til login",
        fordi: "`Authorization` kører, før nogen har læst cookien, så `bruger` er stadig `null`. Præcis det sker i en rigtig app, hvis `app.UseAuthorization();` står før `app.UseAuthentication();`: menuen siger **Hello ida@klubweb.dk!**, fordi viewet laves til sidst, men alle sider med `[Authorize]` sender hende til login.",
        rettet: R`string? bruger = null;
string svar = "";

Authentication();
Authorization();
Console.WriteLine(svar);

void Authentication()
{
    bruger = "ida@klubweb.dk";
}

void Authorization()
{
    svar = bruger == null ? "Send til login" : "Vis siden";
}`,
        rettetOutput: "Vis siden" },
      { t: "laes", h: "User: hvem er det, der spørger?",
        md: "Når `UseAuthentication` har læst cookien, ligger svaret i objektet **`User`**, som du kan bruge i alle controllere og views. `User` er af typen `ClaimsPrincipal`: en bruger med en liste af **claims** — små oplysninger som navnet og rollerne.\n\nHer laves en `ClaimsPrincipal` i et almindeligt konsolprogram, så du kan se, hvad der er i den. I webappen gør Identity det for dig ud fra cookien.",
        kode: R`using System.Security.Claims;

ClaimsPrincipal gaest = new ClaimsPrincipal(new ClaimsIdentity());
Console.WriteLine(gaest.Identity?.IsAuthenticated);

List<Claim> claims = new List<Claim>
{
    new Claim(ClaimTypes.Name, "ida@klubweb.dk")
};
ClaimsPrincipal ida = new ClaimsPrincipal(new ClaimsIdentity(claims, "Identity.Application"));
Console.WriteLine(ida.Identity?.IsAuthenticated);
Console.WriteLine(ida.Identity?.Name);`,
        noter: [
          ["new ClaimsIdentity()", "En identitet uden login-type: en anonym gæst."],
          ["ClaimTypes.Name", "Claimet med brugerens navn. Identity bruger e-mailen som brugernavn."],
          ["\"Identity.Application\"", "Login-typen. Når den er sat, er brugeren *authenticated*. Det er netop Identitys login-cookie, der hedder sådan."],
          ["Identity?.Name", "`?.` fra modul 7: er `Identity` null, bliver resultatet null i stedet for en exception."]
        ],
        output: "False\nTrue\nida@klubweb.dk",
        md2: "I en controller skriver du bare `User.Identity?.Name`, og i et view `@User.Identity?.Name`. Det er præcis det, `_LoginPartial.cshtml` gør, når der står **Hello ida@klubweb.dk!**" },
      { t: "forudsig",
        kode: R`using System.Security.Claims;

List<Claim> claims = new List<Claim>
{
    new Claim(ClaimTypes.Name, "bo@klubweb.dk")
};
ClaimsPrincipal user = new ClaimsPrincipal(new ClaimsIdentity(claims, "Identity.Application"));

if (user.Identity?.IsAuthenticated == true)
{
    Console.WriteLine($"Hej {user.Identity.Name}");
}
else
{
    Console.WriteLine("Log ind først");
}

ClaimsPrincipal gaest = new ClaimsPrincipal(new ClaimsIdentity());
Console.WriteLine(gaest.Identity?.Name == null);`,
        output: "Hej bo@klubweb.dk\nTrue",
        fordi: "Bo har en login-type, så han er authenticated, og hans navn kommer fra Name-claimet. Gæsten har ingen claims, så navnet er `null`." },
      { t: "skriv", q: "Skriv en action `Profil`, som kun brugere, der er logget ind, må åbne. Den skal svare med teksten `Du er logget ind som ` efterfulgt af brugerens navn. Brug `[Authorize]`, `return Content(...)` og `User.Identity?.Name`.",
        tjek: [
          [/\[Authorize\]public IActionResult Profil\(\)/, "Sæt `[Authorize]` lige over actionen `Profil`"],
          [/return Content\(/, "Svar med `return Content(...)`"],
          [/User\.Identity\??\.Name/, "Brug `User.Identity?.Name` til navnet"],
          ["Du er logget ind som", "Teksten skal begynde med `Du er logget ind som`"]
        ],
        forkert: [R`public IActionResult Profil()
{
    return Content($"Du er logget ind som {User.Identity?.Name}");
}`],
        loesning: R`[Authorize]
public IActionResult Profil()
{
    return Content($"Du er logget ind som {User.Identity?.Name}");
}`,
        frag: true },
      { t: "ide", h: "Byg medlemssiden",
        md: "Tilføj medlemssiden til KlubWeb, og afprøv den både logget ud og logget ind.\n\n1. Sæt actionen `Medlemsside` med `[Authorize]` ind i `HomeController` (første trin i lektionen). Husk `using Microsoft.AspNetCore.Authorization;`.\n2. Lav viewet `Views/Home/Medlemsside.cshtml` med koden herunder.\n3. Lav `TraenerController` fra trin 3 og et view `Views/Traener/Index.cshtml` med overskriften `<h1>Kun for trænere</h1>`.\n4. Log ud. Skriv `/Home/Medlemsside` efter adressen i browseren. Du havner på login-siden, og adressen slutter med `?ReturnUrl=%2FHome%2FMedlemsside`.\n5. Log ind som `ida@klubweb.dk`. Du kommer direkte videre til medlemssiden: **Du er logget ind som ida@klubweb.dk.**\n6. Log ud igen, og åbn `/Traener/Tider`. Den virker uden login. `/Traener` gør ikke.",
        kode: R`@{
    ViewData["Title"] = "Medlemsside";
}

<h1>Medlemsside</h1>
<p>Du er logget ind som <strong>@User.Identity?.Name</strong>.</p>`,
        sprog: "razor",
        md2: "Sæt et breakpoint på `return View();` i `Medlemsside`, og kør med debuggeren, mens du er logget ind. Når programmet står stille, så hold musen over ordet `User`, og fold det ud til `Identity` → `Name`. Navnet er der, fordi `UseAuthentication` har læst cookien, før din action kørte." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad sker der, fra en bruger, der ikke er logget ind, beder om en side med `[Authorize]`, til siden bliver vist?",
        svar: "Forespørgslen løber gennem **pipelinen**. `UseRouting` finder actionen. `UseAuthentication` leder efter login-cookien — der er ingen, så brugeren er anonym. `UseAuthorization` ser **`[Authorize]`** og svarer med en **302**-redirect til login-siden med en **ReturnUrl**. Brugeren logger ind, Identity tjekker adgangskoden og sætter en **cookie**, og login-siden sender brugeren tilbage til ReturnUrl. Nu finder `UseAuthentication` cookien, `User` er udfyldt, og `UseAuthorization` lukker brugeren ind.",
        noegle: ["UseAuthentication", "UseAuthorization", "302", "ReturnUrl", "cookie", "[Authorize]"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m20l3", titel: "Roller: admin, træner og medlem", min: 20,
    ord: [
      ["Rolle", "En gruppe af brugere med de samme rettigheder, fx Admin. En bruger kan have flere roller."],
      ["IdentityRole", "Klassen for én rolle i Identity. Én række i tabellen AspNetRoles."],
      ["AddRoles", "`.AddRoles<IdentityRole>()` i Program.cs slår roller til i Identity."],
      ["RoleManager", "Identitys service til roller: oprette dem og tjekke, om de findes."],
      ["UserManager", "Identitys service til brugere: oprette, finde, give roller, tjekke adgangskoder."],
      ["Seeding", "At lægge startdata i databasen, når appen starter — her rollerne og den første administrator."],
      ["Scope", "En afgrænset levetid for scoped services (modul 19). `CreateScope()` laver et, så man kan hente fx UserManager uden for en forespørgsel."],
      ["IsInRole", "Metode på `User`: er brugeren i denne rolle? Giver true eller false. Skelner mellem store og små bogstaver."]
    ],
    trin: [
      { t: "laes", h: "Roller: grupper af rettigheder",
        md: "Indtil nu er der kun to slags besøgende: logget ind eller ej. KlubWeb skal skelne mellem tre **roller**:\n\n- **Admin** — må alt, også oprette brugere\n- **Traener** — må se holdlisterne\n- **Medlem** — må se medlemssiden og chatte\n\nRoller er slået fra som standard. Du slår dem til med én linje i `Program.cs`:",
        kode: R`builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();`,
        frag: true,
        md2: "Du skal **ikke** lave en ny migration: tabellerne `AspNetRoles` og `AspNetUserRoles` blev lavet sammen med de andre i lektion 1. Linjen sørger for, at `RoleManager` bliver registreret, og at brugerens roller kommer med i login-cookien.\n\nRollen skrives uden æ: `Traener`. Det er en almindelig tekst, og den skal staves præcis ens alle steder." },
      { t: "udfyld", q: "Slå roller til i Identity.",
        kode: R`builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = false)
    .[[AddRoles]]<[[IdentityRole]]>()
    .AddEntityFrameworkStores<ApplicationDbContext>();`,
        frag: true,
        fordi: "`AddRoles<IdentityRole>()` skal stå **før** `AddEntityFrameworkStores`. Ellers ved EF-delen ikke, at der er roller, og `RoleManager` bliver aldrig registreret." },
      { t: "laes", h: "Seeding: roller og den første admin",
        md: "Hvem skal give den første bruger rollen Admin? Der er jo ingen admin endnu. Løsningen er **seeding**: når appen starter, opretter den selv rollerne og en administrator, hvis de ikke findes. Lav filen `Data/SeedData.cs`:",
        kode: R`using Microsoft.AspNetCore.Identity;

namespace KlubWeb.Data;

public static class SeedData
{
    public static async Task OpretRollerOgAdminAsync(IServiceProvider services)
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = services.GetRequiredService<UserManager<IdentityUser>>();

        string[] roller = { "Admin", "Traener", "Medlem" };
        foreach (string rolle in roller)
        {
            if (!await roleManager.RoleExistsAsync(rolle))
            {
                await roleManager.CreateAsync(new IdentityRole(rolle));
            }
        }

        string adminEmail = "admin@klubweb.dk";
        IdentityUser? admin = await userManager.FindByEmailAsync(adminEmail);
        if (admin == null)
        {
            admin = new IdentityUser { UserName = adminEmail, Email = adminEmail, EmailConfirmed = true };
            await userManager.CreateAsync(admin, "Admin123!");
            await userManager.AddToRoleAsync(admin, "Admin");
        }
    }
}`,
        frag: true,
        noter: [
          ["static class SeedData", "En klasse med kun én metode. `static`, fordi vi ikke skal lave objekter af den."],
          ["GetRequiredService<RoleManager<IdentityRole>>()", "Henter RoleManager fra dependency injection (modul 19). Identity har registreret den."],
          ["RoleExistsAsync(rolle)", "Findes rollen allerede? `!` vender svaret, så rollen kun oprettes, hvis den mangler."],
          ["CreateAsync(new IdentityRole(rolle))", "Opretter rollen: én ny række i AspNetRoles."],
          ["FindByEmailAsync(adminEmail)", "Leder efter brugeren. Giver `null`, hvis den ikke findes — derfor `IdentityUser?`."],
          ["EmailConfirmed = true", "Admin skal kunne logge ind med det samme."],
          ["CreateAsync(admin, \"Admin123!\")", "Opretter brugeren. Adgangskoden bliver hashet, før den gemmes. I lektion 6 flytter vi den ud af koden."],
          ["AddToRoleAsync(admin, \"Admin\")", "Giver brugeren rollen: én ny række i AspNetUserRoles."]
        ] },
      { t: "spor", h: "Spor: seeding, der kan køre igen og igen",
        q: "Seedingen kører, **hver gang** appen starter. Her er samme logik med en liste i stedet for databasen. Databasen har allerede rollen Medlem fra sidste start. Skriv `oprettet` og antallet af roller i databasen lige efter hver kørt linje. Kun linje 3, 6, 8 og 9 er med i skemaet. Linje 6 kører én gang for hver rolle, og den ændrer ikke noget.",
        kode: R`List<string> database = new List<string> { "Medlem" };
string[] roller = { "Admin", "Traener", "Medlem" };
int oprettet = 0;
foreach (string rolle in roller)
{
    if (!database.Contains(rolle))
    {
        database.Add(rolle);
        oprettet++;
    }
}
Console.WriteLine($"{oprettet} nye, {database.Count} i alt");`,
        kolonner: ["oprettet", "database.Count"],
        raekker: [[3, "=0", "=1"], [6, "=0", "=1"], [8, "0", "2"], [9, "1", "2"], [6, "1", "2"], [8, "1", "3"], [9, "2", "3"], [6, "2", "3"]],
        output: "2 nye, 3 i alt",
        fordi: "Admin og Traener manglede og blev oprettet. Medlem fandtes, så `if` sprang den over (sidste række: kun linje 6 kørte). Starter appen igen, giver det `0 nye, 3 i alt` — derfor kan seedingen trygt køre ved hver start." },
      { t: "valg", q: "Hvorfor står der `if (!await roleManager.RoleExistsAsync(rolle))` i seedingen?",
        svar: ["Så rollen kun oprettes første gang — seedingen kører ved hver start", "Fordi CreateAsync kun virker inde i en if", "For at gøre appen hurtigere første gang", "Fordi rollerne skal oprettes i omvendt rækkefølge"],
        ret: 0, fordi: "Uden tjekket ville appen prøve at oprette Admin igen ved næste start. Identity ville afvise det, fordi navnet allerede findes, og du ville ikke opdage det, for fejlen ligger bare i det `IdentityResult`, metoden returnerer. Med tjekket giver seedingen samme resultat, uanset hvor mange gange den kører." },
      { t: "laes", h: "Kald seedingen, når appen starter",
        md: "Seedingen skal køre én gang, lige efter `var app = builder.Build();` og før appen begynder at tage imod forespørgsler:",
        kode: R`var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    await SeedData.OpretRollerOgAdminAsync(scope.ServiceProvider);
}`,
        frag: true,
        noter: [
          ["app.Services", "Alle de services, der er registreret i dependency injection."],
          ["CreateScope()", "`UserManager` og `RoleManager` er **scoped** (modul 19): de lever normalt i én forespørgsel. Uden for en forespørgsel må man lave sit eget scope."],
          ["using (…) { … }", "Scopet — og databaseforbindelsen i det — lukkes, når blokken er færdig. Samme `using` som ved filer i modul 9."],
          ["await", "Seedingen er async, og `Program.cs` må gerne bruge `await` direkte."]
        ],
        md2: "`SeedData` ligger i namespacet `KlubWeb.Data`. Øverst i `Program.cs` står der allerede `using KlubWeb.Data;`, fordi `ApplicationDbContext` ligger samme sted." },
      { t: "laes", h: "[Authorize(Roles = …)]: kun for bestemte roller",
        md: "Nu kan du låse sider til en rolle. Skriv rollens navn i `[Authorize]`:",
        kode: R`[Authorize(Roles = "Admin")]
public class AdminController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}

[Authorize(Roles = "Traener,Admin")]
public class TraenerController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}`,
        frag: true,
        noter: [
          ["Roles = \"Admin\"", "Kun brugere i rollen Admin."],
          ["Roles = \"Traener,Admin\"", "Komma betyder **eller**: Traener eller Admin."],
          ["Ikke logget ind", "Sendes til login, som før."],
          ["Logget ind, men forkert rolle", "Sendes til `/Identity/Account/AccessDenied`, der viser **Access denied**."]
        ] },
      { t: "valg", q: "En controller har `[Authorize(Roles = \"Traener,Admin\")]`. Hvem kommer ind?",
        svar: ["Brugere med rollen Traener og brugere med rollen Admin", "Kun brugere, der har begge roller på én gang", "Alle, der er logget ind", "Kun Admin"],
        ret: 0, fordi: "Komma i én attribut betyder **eller**. En træner kommer ind, og en admin kommer ind." },
      { t: "valg", q: "Her står der **to** attributter over hinanden. Admin-brugeren, som kun har rollen Admin, prøver at åbne siden. Hvad sker der?",
        kode: R`[Authorize(Roles = "Traener")]
[Authorize(Roles = "Admin")]
public class HoldController : Controller
{
    public IActionResult Index() { return View(); }
}`,
        frag: true,
        svar: ["Access denied — med to attributter skal brugeren opfylde begge", "Siden vises — Admin står jo i den ene", "Login-siden vises", "Compilerfejl — man må kun have én [Authorize]"],
        ret: 0, fordi: "To attributter betyder **og**: brugeren skal både være Traener og Admin. Skal det være *eller*, skrives rollerne med komma i én attribut: `[Authorize(Roles = \"Traener,Admin\")]`." },
      { t: "forudsig", q: "Rollerne ligger som claims i `User`. Hvad skriver programmet?",
        kode: R`using System.Security.Claims;

List<Claim> claims = new List<Claim>
{
    new Claim(ClaimTypes.Name, "bo@klubweb.dk"),
    new Claim(ClaimTypes.Role, "Traener"),
    new Claim(ClaimTypes.Role, "Medlem")
};
ClaimsPrincipal user = new ClaimsPrincipal(new ClaimsIdentity(claims, "Identity.Application"));

Console.WriteLine(user.IsInRole("Traener"));
Console.WriteLine(user.IsInRole("Admin"));
Console.WriteLine(user.IsInRole("traener"));`,
        output: "True\nFalse\nFalse",
        fordi: "Bo har to rolle-claims: Traener og Medlem. `IsInRole` leder efter præcis den tekst, og der skelnes mellem store og små bogstaver. Derfor skal rollenavnet staves ens i seedingen, i `[Authorize]` og i `IsInRole`." },
      { t: "laes", h: "Roller i views: vis kun det, brugeren må",
        md: "I et view kan du også spørge på `User`. Her viser menuen i `Views/Shared/_Layout.cshtml` et link til medlemssiden for alle, der er logget ind, og et Admin-link kun for administratorer. Koden står lige under `<li>` med Privacy:",
        kode: R`@if (User.Identity?.IsAuthenticated == true)
{
    <li class="nav-item">
        <a class="nav-link text-dark" asp-area="" asp-controller="Home" asp-action="Medlemsside">Medlemsside</a>
    </li>
}
@if (User.IsInRole("Admin"))
{
    <li class="nav-item">
        <a class="nav-link text-dark" asp-area="" asp-controller="Admin" asp-action="Index">Admin</a>
    </li>
}`,
        sprog: "razor",
        noter: [
          ["asp-area=\"\"", "Står på alle links i layoutet. Det betyder \"ikke i et område\", så linket også virker, når du står på en af Identitys sider i området Identity."]
        ],
        md2: "**Vigtigt:** at skjule et link er kun pænt — det er ikke sikkerhed. Skriver en almindelig bruger `/Admin` i adresselinjen, er det `[Authorize(Roles = \"Admin\")]` på controlleren, der stopper hende. Brug altid begge dele: attributten låser, og `IsInRole` rydder op i menuen." },
      { t: "skriv", sprog: "razor", q: "Skriv Razor-kode til et view: er brugeren i rollen `Traener`, skal der vises linket `<a href=\"/Traener\">Holdlister</a>`. Brug `@if` og `User.IsInRole`.",
        tjek: [
          [/@if\(User\.IsInRole\("Traener"\)\)/, "Brug `@if (User.IsInRole(\"Traener\"))`"],
          ['<a href="/Traener">Holdlister</a>', "Linket skal være `<a href=\"/Traener\">Holdlister</a>`"],
          [/IsInRole\("traener"\)/, "Rollenavnet staves med stort T: `Traener`", "ikke"]
        ],
        forkert: [R`@if (User.IsInRole("Admin"))
{
    <a href="/Traener">Holdlister</a>
}`],
        loesning: R`@if (User.IsInRole("Traener"))
{
    <a href="/Traener">Holdlister</a>
}`,
        frag: true },
      { t: "ide", h: "Seed rollerne, og afprøv adgangen",
        md: "1. Tilføj `.AddRoles<IdentityRole>()` i `Program.cs`.\n2. Lav `Data/SeedData.cs`, og kald den fra `Program.cs` med et scope.\n3. Ret `TraenerController` til `[Authorize(Roles = \"Traener,Admin\")]`.\n4. Lav `AdminController` med `[Authorize(Roles = \"Admin\")]` og en `Index`-action, og et view `Views/Admin/Index.cshtml` med `<h1>Brugere</h1>`. Husk `using Microsoft.AspNetCore.Authorization;`.\n5. Tilføj menupunkterne fra trin 11 i `_Layout.cshtml`.\n6. Sæt et breakpoint på linjen `if (admin == null)` i `SeedData`, og start med debuggeren. Første gang er `admin` `null`, og blokken kører. Stop, og start igen: nu er `admin` udfyldt, og blokken springes over.\n7. Log ind som `admin@klubweb.dk` med adgangskoden `Admin123!`. Menuen viser **Admin**, og både `/Admin` og `/Traener` virker.\n8. Log ind som `ida@klubweb.dk`. Hun har ingen rolle: ingen Admin i menuen, og `/Admin` giver **Access denied**.\n9. Kig i tabellerne `AspNetRoles` og `AspNetUserRoles`. Der er tre roller og én række, der kobler admin til rollen Admin." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvordan har du lavet roller i din app, og hvordan sikrer du, at kun administratorer kan åbne admin-siden?",
        svar: "Jeg har slået roller til med `AddRoles<IdentityRole>()` i Program.cs. Når appen starter, kører en **seed**-metode i et scope. Den bruger **RoleManager** til at oprette rollerne, hvis de ikke findes, og **UserManager** til at oprette en admin-bruger og give den rollen Admin. Admin-controlleren har `[Authorize(Roles = \"Admin\")]`, så authorization-middlewaren afviser alle andre: er man ikke logget ind, sendes man til login, og har man en forkert rolle, får man Access denied. I menuen bruger jeg `User.IsInRole(\"Admin\")` til at skjule linket, men det er **attributten**, der er selve låsen.",
        noegle: ["AddRoles", "seed", "RoleManager", "UserManager", "[Authorize(Roles", "IsInRole", "attributten"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m20l4", titel: "En admin-side, der opretter brugere", min: 22,
    ord: [
      ["View model", "En klasse, der er lavet til ét bestemt view eller én formular — ikke til databasen."],
      ["[Compare]", "Valideringsattribut: værdien skal være lig med en anden property, fx \"gentag adgangskode\"."],
      ["IdentityResult", "Svaret fra fx `CreateAsync`: `Succeeded` er true eller false, og `Errors` indeholder fejlene."],
      ["AddModelError", "`ModelState.AddModelError(\"\", tekst)` lægger en fejlbesked ind, så den vises i formularen som en valideringsfejl."],
      ["TempData", "Gemmer en værdi til den **næste** forespørgsel — fx en besked, der skal vises efter en redirect. Læses én gang og forsvinder så."],
      ["GetRolesAsync", "UserManager-metode, der giver en brugers roller som en liste af tekster."],
      ["ApplicationUser", "En egen brugerklasse, der arver fra IdentityUser for at få flere properties. Bruger man den, skal den bruges alle steder i stedet for IdentityUser."]
    ],
    trin: [
      { t: "laes", h: "Hvorfor en view model?",
        md: "Admin skal kunne oprette brugere og vælge deres rolle. Formularen har fire felter: e-mail, adgangskode, **gentag adgangskode** og rolle.\n\nDet passer ikke til `IdentityUser`: den har intet felt til \"gentag adgangskode\", og den gemmer kun **hashen** af adgangskoden. Derfor laver man en **view model** — en klasse, der passer præcis til formularen. Lav `Models/OpretBrugerViewModel.cs`:",
        kode: R`using System.ComponentModel.DataAnnotations;

namespace KlubWeb.Models;

public class OpretBrugerViewModel
{
    [Required(ErrorMessage = "Skriv en e-mail")]
    [EmailAddress(ErrorMessage = "Det er ikke en gyldig e-mail")]
    public string Email { get; set; } = "";

    [Required(ErrorMessage = "Skriv en adgangskode")]
    [DataType(DataType.Password)]
    [Display(Name = "Adgangskode")]
    public string Password { get; set; } = "";

    [DataType(DataType.Password)]
    [Display(Name = "Gentag adgangskode")]
    [Compare("Password", ErrorMessage = "De to adgangskoder er ikke ens")]
    public string GentagPassword { get; set; } = "";

    [Required(ErrorMessage = "Vælg en rolle")]
    public string Rolle { get; set; } = "";
}`,
        frag: true,
        noter: [
          ["[EmailAddress]", "Værdien skal ligne en e-mailadresse."],
          ["[DataType(DataType.Password)]", "Feltet vises som et adgangskodefelt med prikker."],
          ["[Display(Name = \"Adgangskode\")]", "Teksten i `<label>` (modul 18)."],
          ["[Compare(\"Password\", …)]", "**Nyt:** værdien skal være lig med propertyen `Password`. Ellers vises fejlbeskeden."],
          ["= \"\";", "Startværdi, så propertyen aldrig er null."]
        ] },
      { t: "forudsig", q: "Valideringen kan også køres i et konsolprogram med `Validator` — det er det samme, MVC gør bag `ModelState.IsValid`. De to adgangskoder er forskellige. Hvad skriver programmet?",
        kode: R`using System.ComponentModel.DataAnnotations;

OpretBrugerViewModel model = new OpretBrugerViewModel
{
    Email = "ida@klubweb.dk",
    Password = "Ida123!",
    GentagPassword = "Ida124!",
    Rolle = "Medlem"
};

List<ValidationResult> fejl = new List<ValidationResult>();
bool gyldig = Validator.TryValidateObject(model, new ValidationContext(model), fejl, true);

Console.WriteLine(gyldig);
foreach (ValidationResult f in fejl)
{
    Console.WriteLine(f.ErrorMessage);
}

class OpretBrugerViewModel
{
    [Required(ErrorMessage = "Skriv en e-mail")]
    [EmailAddress(ErrorMessage = "Det er ikke en gyldig e-mail")]
    public string Email { get; set; } = "";

    [Required(ErrorMessage = "Skriv en adgangskode")]
    public string Password { get; set; } = "";

    [Compare("Password", ErrorMessage = "De to adgangskoder er ikke ens")]
    public string GentagPassword { get; set; } = "";

    [Required(ErrorMessage = "Vælg en rolle")]
    public string Rolle { get; set; } = "";
}`,
        output: "False\nDe to adgangskoder er ikke ens",
        fordi: "E-mail, adgangskode og rolle er udfyldt og gyldige. Kun `[Compare]` fejler, fordi `Ida124!` ikke er lig med `Ida123!`. Så er hele modellen ugyldig, og der er præcis én fejlbesked." },
      { t: "udfyld", q: "Feltet `GentagKode` skal være lig med feltet `NyKode`. Hvad mangler?",
        kode: R`using System.ComponentModel.DataAnnotations;

Skift s = new Skift { NyKode = "Bold2026!", GentagKode = "Bold2026!" };
List<ValidationResult> fejl = new List<ValidationResult>();
Console.WriteLine(Validator.TryValidateObject(s, new ValidationContext(s), fejl, true));

class Skift
{
    public string NyKode { get; set; } = "";

    [Compare("[[NyKode]]", ErrorMessage = "Koderne er ikke ens")]
    public string GentagKode { get; set; } = "";
}`,
        output: "True",
        fordi: "`[Compare]` får navnet på den **anden** property som tekst. De to koder er ens, så valideringen giver `True`." },
      { t: "laes", h: "AdminController: brugere og roller via dependency injection",
        md: "`AdminController` får `UserManager` og `RoleManager` gennem konstruktøren — **constructor injection**, som du kender fra modul 19. Identity har registreret dem, så du skal ikke skrive noget i `Program.cs`.",
        kode: R`[Authorize(Roles = "Admin")]
public class AdminController : Controller
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public AdminController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<IActionResult> Index()
    {
        var liste = new List<BrugerMedRoller>();
        foreach (var bruger in _userManager.Users.ToList())
        {
            var roller = await _userManager.GetRolesAsync(bruger);
            liste.Add(new BrugerMedRoller { Email = bruger.Email ?? "", Roller = string.Join(", ", roller) });
        }
        return View(liste);
    }
}`,
        frag: true,
        noter: [
          ["_userManager.Users", "Alle brugere fra AspNetUsers."],
          ["ToList()", "Henter alle brugerne fra databasen **før** løkken. Ellers ville databasen stadig være i gang med at sende brugerne, når `GetRolesAsync` spørger igen — og en DbContext kan kun én ting ad gangen."],
          ["GetRolesAsync(bruger)", "Brugerens roller som en liste af tekster."],
          ["BrugerMedRoller", "En lille view model med `Email` og `Roller` (begge `string`), som viewet viser i en tabel."]
        ],
        md2: "Øverst i filen skal der stå `using Microsoft.AspNetCore.Authorization;`, `using Microsoft.AspNetCore.Identity;`, `using Microsoft.AspNetCore.Mvc;`, `using Microsoft.AspNetCore.Mvc.Rendering;` (til `SelectList`) og `using KlubWeb.Models;`." },
      { t: "valg", q: "Hvor får `AdminController` sin `UserManager` fra?",
        svar: ["Dependency injection giver den gennem konstruktøren — Identity har registreret den", "Controlleren skriver selv new UserManager<IdentityUser>()", "Den hentes fra appsettings.json", "Den er en statisk klasse, som alle kan kalde direkte"],
        ret: 0, fordi: "`AddDefaultIdentity` og `AddRoles` registrerer `UserManager` og `RoleManager`. Når MVC laver controlleren, ser den konstruktørens parametre og giver dem med. Det er **constructor injection**." },
      { t: "laes", h: "Opret brugeren: GET og POST",
        md: "Formularen har to actions med samme navn, som du kender fra modul 16: GET viser den tomme formular, POST tager imod den udfyldte.",
        kode: R`public IActionResult OpretBruger()
{
    ViewBag.Roller = new SelectList(_roleManager.Roles.Select(r => r.Name).ToList());
    return View();
}

[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> OpretBruger(OpretBrugerViewModel model)
{
    if (ModelState.IsValid)
    {
        var bruger = new IdentityUser { UserName = model.Email, Email = model.Email, EmailConfirmed = true };
        var resultat = await _userManager.CreateAsync(bruger, model.Password);

        if (resultat.Succeeded)
        {
            await _userManager.AddToRoleAsync(bruger, model.Rolle);
            TempData["Besked"] = $"{model.Email} er oprettet som {model.Rolle}.";
            return RedirectToAction("Index");
        }

        foreach (var fejl in resultat.Errors)
        {
            ModelState.AddModelError("", fejl.Description);
        }
    }

    ViewBag.Roller = new SelectList(_roleManager.Roles.Select(r => r.Name).ToList());
    return View(model);
}`,
        frag: true,
        noter: [
          ["new SelectList(…)", "Rollernes navne til dropdownen (modul 17)."],
          ["[ValidateAntiForgeryToken]", "Beskytter formularen mod snyd fra andre hjemmesider. Forklares i lektion 6."],
          ["CreateAsync(bruger, model.Password)", "Opretter brugeren og hasher adgangskoden. Svaret er et `IdentityResult`."],
          ["resultat.Succeeded", "Lykkedes det? Det fejler fx, hvis e-mailen er taget, eller adgangskoden er for svag."],
          ["AddToRoleAsync(bruger, model.Rolle)", "Giver den nye bruger den valgte rolle."],
          ["TempData[\"Besked\"] = …", "Gemmer en besked til den **næste** side."],
          ["RedirectToAction(\"Index\")", "Send browseren videre til brugerlisten, så F5 ikke sender formularen igen."],
          ["ModelState.AddModelError(\"\", fejl.Description)", "Identitys fejl (på engelsk) vises øverst i formularen. Tom tekst som første argument betyder \"gælder hele formularen\"."],
          ["ViewBag.Roller igen", "Viewet vises igen, og dropdownen skal have rollerne igen."]
        ] },
      { t: "orden", q: "Sæt linjerne i rækkefølge, så den nye bruger først oprettes, så får sin rolle, og browseren til sidst sendes videre.",
        linjer: [
          R`var bruger = new IdentityUser { UserName = model.Email, Email = model.Email, EmailConfirmed = true };`,
          R`var resultat = await _userManager.CreateAsync(bruger, model.Password);`,
          R`if (resultat.Succeeded)`,
          R`{`,
          R`    await _userManager.AddToRoleAsync(bruger, model.Rolle);`,
          R`    return RedirectToAction("Index");`,
          R`}`
        ],
        frag: true,
        fordi: "Objektet skal laves, før det kan oprettes i databasen. Rollen kan først gives, når brugeren findes. Og `return` skal stå sidst, for intet efter `return` bliver kørt." },
      { t: "spor", h: "Spor: TempData lever én gang",
        q: "TempData lever kun til den næste forespørgsel: når beskeden er læst, er den væk. Her er det efterlignet med en `Dictionary`. Linje 4 er POST'en, linje 6–10 er den side, redirecten fører til, og linje 12–16 er, når brugeren trykker F5. Skriv `vist` og antallet i `tempData` lige efter hver kørt linje.",
        kode: R`Dictionary<string, string> tempData = new Dictionary<string, string>();
string vist = "ingen";

tempData["Besked"] = "Ida er oprettet";

if (tempData.ContainsKey("Besked"))
{
    vist = tempData["Besked"];
    tempData.Remove("Besked");
}

vist = "ingen";
if (tempData.ContainsKey("Besked"))
{
    vist = tempData["Besked"];
}
Console.WriteLine(vist);`,
        kolonner: ["vist", "tempData.Count"],
        raekker: [[2, "=ingen", "=0"], [4, "=ingen", "=1"], [8, "Ida er oprettet", "1"], [9, "Ida er oprettet", "0"], [12, "ingen", "0"], [13, "ingen", "0"]],
        output: "ingen",
        fordi: "Beskeden overlever præcis én redirect. Den side, der læser den, fjerner den — så et tryk på F5 viser den ikke igen. ASP.NET Core gør det samme: når viewet læser `TempData[\"Besked\"]`, markeres den som læst og slettes efter forespørgslen." },
      { t: "valg", q: "Hvorfor bruger `OpretBruger` `TempData` og ikke `ViewBag` til beskeden \"… er oprettet\"?",
        svar: ["Fordi der kommer en redirect: ViewBag lever kun i den forespørgsel, den er sat i, mens TempData overlever til den næste", "Fordi ViewBag ikke kan indeholde tekst", "Fordi TempData gemmes i databasen for altid", "Fordi ViewBag kun virker i Razor Pages"],
        ret: 0, fordi: "Efter `RedirectToAction` beder browseren om en **ny** side — en ny forespørgsel. Alt i `ViewBag` og `ViewData` er glemt. `TempData` gemmes (som standard i en cookie) til den næste forespørgsel og slettes, når den er læst." },
      { t: "laes", h: "Viewet: formularen",
        md: "Lav `Views/Admin/OpretBruger.cshtml`. Det er en almindelig MVC-formular som i modul 16 — med en dropdown til rollen:",
        kode: R`@model OpretBrugerViewModel
@{
    ViewData["Title"] = "Opret bruger";
}

<h1>Opret bruger</h1>

<form asp-action="OpretBruger" method="post">
    <div asp-validation-summary="ModelOnly" class="text-danger"></div>

    <div class="mb-3">
        <label asp-for="Email" class="form-label"></label>
        <input asp-for="Email" class="form-control" />
        <span asp-validation-for="Email" class="text-danger"></span>
    </div>
    <div class="mb-3">
        <label asp-for="Password" class="form-label"></label>
        <input asp-for="Password" class="form-control" />
        <span asp-validation-for="Password" class="text-danger"></span>
    </div>
    <div class="mb-3">
        <label asp-for="GentagPassword" class="form-label"></label>
        <input asp-for="GentagPassword" class="form-control" />
        <span asp-validation-for="GentagPassword" class="text-danger"></span>
    </div>
    <div class="mb-3">
        <label asp-for="Rolle" class="form-label"></label>
        <select asp-for="Rolle" asp-items="ViewBag.Roller" class="form-select">
            <option value="">-- Vælg rolle --</option>
        </select>
        <span asp-validation-for="Rolle" class="text-danger"></span>
    </div>
    <button type="submit" class="btn btn-primary">Opret</button>
</form>

@section Scripts {
    <partial name="_ValidationScriptsPartial" />
}`,
        sprog: "razor",
        noter: [
          ["asp-validation-summary=\"ModelOnly\"", "Viser fejl, der gælder hele formularen — fx Identitys \"Username 'ida@klubweb.dk' is already taken.\""],
          ["asp-for=\"Password\"", "Bliver til et adgangskodefelt på grund af `[DataType(DataType.Password)]`."],
          ["asp-items=\"ViewBag.Roller\"", "Fylder dropdownen med rollerne."],
          ["<option value=\"\">", "Første valg er tomt, så `[Required]` på `Rolle` slår til, hvis admin glemmer at vælge."],
          ["_ValidationScriptsPartial", "Tjekker felterne i browseren, før formularen sendes."]
        ] },
      { t: "fejl", sprog: "razor", q: "`Program.cs` registrerer `AddDefaultIdentity<IdentityUser>`. En kursist har lavet sin egen klasse `ApplicationUser : IdentityUser` og rettet toppen af `_LoginPartial.cshtml`. Nu giver **alle** sider fejl 500, også login-siden. Klik på den linje, der er skyld i det.",
        kode: R`@using Microsoft.AspNetCore.Identity
@using KlubWeb.Data
@inject SignInManager<IdentityUser> SignInManager
@inject UserManager<ApplicationUser> UserManager`,
        linje: 4, frag: true,
        fordi: "`Program.cs` siger `IdentityUser`, så der findes kun en `UserManager<IdentityUser>`. Fejlsiden siger: **InvalidOperationException: No service for type '…UserManager…[KlubWeb.Data.ApplicationUser]' has been registered.** Reglen: vælg **én** brugerklasse, og brug den alle steder — i `Program.cs`, i `ApplicationDbContext`, i `_LoginPartial` og i dine controllere. Den samme forveksling skete på kursusdagen.",
        rettet: R`@using Microsoft.AspNetCore.Identity
@using KlubWeb.Data
@inject SignInManager<IdentityUser> SignInManager
@inject UserManager<IdentityUser> UserManager` },
      { t: "laes", h: "Et andet layout til administratorer",
        md: "Underviseren gav administratorerne deres eget layout, så man altid kan se, at man er logget ind som admin. Det styres i `Views/_ViewStart.cshtml`, som kører før hvert view:",
        kode: R`@{
    if (User.IsInRole("Admin"))
    {
        Layout = "_LayoutAdmin";
    }
    else
    {
        Layout = "_Layout";
    }
}`,
        sprog: "razor",
        md2: "Lav `Views/Shared/_LayoutAdmin.cshtml` som en kopi af `_Layout.cshtml`, og skift `bg-white` i `<nav>`-linjen ud med `bg-warning`, så menuen bliver gul. Identitys egne sider (Login, Register …) har deres egen `_ViewStart` i `Areas/Identity/Pages` og bruger stadig `_Layout`." },
      { t: "ide", h: "Byg admin-siden",
        md: "1. Lav `Models/OpretBrugerViewModel.cs` (trin 1) og `Models/BrugerMedRoller.cs` med to properties, `Email` og `Roller`, begge `string` med `= \"\"`.\n2. Udbyg `AdminController` med konstruktøren, `Index` og de to `OpretBruger`-actions.\n3. Erstat `Views/Admin/Index.cshtml` med koden herunder, og lav `Views/Admin/OpretBruger.cshtml` (trin 10).\n4. Log ind som admin, og gå til **Admin** → **Opret bruger**.\n5. Skriv to forskellige adgangskoder: **De to adgangskoder er ikke ens**.\n6. Skriv adgangskoden `ida` to gange: Identity svarer med fire engelske linjer, fx **Passwords must be at least 6 characters.**\n7. Opret `bo@klubweb.dk` som Traener med adgangskoden `Bo1234!`: listen viser en grøn boks med **bo@klubweb.dk er oprettet som Traener.** Tryk F5: boksen er væk.\n8. Log ind som Bo, og åbn `/Traener`. Han kommer ind. `/Admin` giver Access denied.\n9. Lav til sidst `_LayoutAdmin` (trin 12), og se, at menuen er gul, når du er logget ind som admin.",
        kode: R`@model List<BrugerMedRoller>
@{
    ViewData["Title"] = "Administration";
}

<h1>Brugere</h1>

@if (TempData["Besked"] != null)
{
    <div class="alert alert-success">@TempData["Besked"]</div>
}

<p><a asp-action="OpretBruger" class="btn btn-primary">Opret bruger</a></p>

<table class="table">
    <tr>
        <th>E-mail</th>
        <th>Roller</th>
    </tr>
    @foreach (var b in Model)
    {
        <tr>
            <td>@b.Email</td>
            <td>@b.Roller</td>
        </tr>
    }
</table>`,
        sprog: "razor" },
      { t: "forklar", q: "Eksamensspørgsmål: Hvorfor bruger du en view model til at oprette brugere i stedet for at sende `IdentityUser` direkte til viewet?",
        svar: "Formularen og databasen har ikke de samme felter. Formularen har **gentag adgangskode** og et rollevalg, som ikke findes på `IdentityUser`, og `IdentityUser` gemmer kun en **hash** af adgangskoden — aldrig selve adgangskoden. En **view model** passer præcis til formularen og har sine egne valideringsattributter, fx `[Compare]`. I controlleren laver jeg så en `IdentityUser` og giver adgangskoden til `UserManager.CreateAsync`, som hasher den. På den måde kan brugeren heller ikke sende felter med, som de ikke må sætte.",
        noegle: ["view model", "gentag adgangskode", "[Compare]", "hash", "CreateAsync", "validering"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m20l5", titel: "Realtid: WebSocket og SignalR", min: 22,
    ord: [
      ["Realtid", "At brugeren ser en ændring med det samme, uden at genindlæse siden."],
      ["Polling", "At browseren spørger serveren igen og igen med faste mellemrum: \"Er der noget nyt?\""],
      ["WebSocket", "En forbindelse mellem browser og server, der bliver ved med at være åben, og hvor begge parter kan sende når som helst. Adresser starter med `ws://` eller `wss://` (krypteret)."],
      ["SignalR", "Microsofts bibliotek til realtid i ASP.NET Core. Bruger WebSocket, når det kan, og andre teknikker, når det ikke kan."],
      ["Hub", "En klasse på serveren, som browserne forbinder sig til. Browserne kan kalde dens metoder, og den kan kalde funktioner i browserne."],
      ["Clients.All", "I en hub: alle forbundne browsere. `Clients.All.SendAsync(\"Navn\", …)` kalder en JavaScript-funktion i dem alle."],
      ["connection.on", "I JavaScript: \"når serveren kalder denne funktion, så gør dette\"."],
      ["connection.invoke", "I JavaScript: kald en metode i hubben på serveren."],
      ["LibMan", "Library Manager: værktøjet, der henter JavaScript-biblioteker som `signalr.js` ned i `wwwroot`."]
    ],
    trin: [
      { t: "laes", h: "HTTP kan ikke selv sende noget",
        md: "HTTP virker altid på samme måde: browseren **spørger**, serveren **svarer**, og så er samtalen slut (modul 16). Serveren kan aldrig selv tage initiativet.\n\nDet er et problem i en chat. Når Bo skriver en besked, skal den dukke op hos Ida **med det samme**, uden at hun trykker F5. Der er to løsninger:\n\n- **Polling**: Idas browser spørger fx hvert sekund: \"Er der noget nyt?\" Det virker, men de fleste svar er \"nej\", og beskeden kan være op til et sekund forsinket.\n- **WebSocket**: browseren åbner én forbindelse, som **bliver ved med at være åben**. Begge parter kan sende når som helst. Serveren kan altså sende Bos besked til Ida i samme øjeblik, den kommer ind.\n\nEn WebSocket starter som en almindelig HTTP-forespørgsel, der beder om at \"opgradere\" forbindelsen. Adressen begynder med `ws://` — eller `wss://`, når den er krypteret, ligesom `https://`.",
        noter: [
          ["HTTP", "Browseren spørger, serveren svarer. Én forespørgsel ad gangen."],
          ["WebSocket", "Én åben forbindelse. Begge veje, når som helst."]
        ] },
      { t: "valg", q: "Hvilken funktion har mest brug for en WebSocket?",
        svar: ["En liveopdatering af en fodboldkamps stilling på mange skærme", "En kontaktformular, der sendes én gang", "En side med klubbens adresse", "Login-siden"],
        ret: 0, fordi: "Stillingen ændrer sig, mens folk kigger, og serveren skal kunne skubbe den ud til alle med det samme. De andre er almindelige spørg-og-svar-sider, hvor HTTP er fint." },
      { t: "laes", h: "SignalR og hubben",
        md: "At skrive WebSocket-kode selv er bøvlet: forbindelser falder ud, nogle netværk blokerer WebSockets, og beskederne skal pakkes ind og ud. **SignalR** gør det for dig. Det bruger WebSocket, når det kan, og falder tilbage til andre teknikker, når det ikke kan — din kode er den samme.\n\nCentrum er en **hub**: en klasse på serveren, som alle browsere forbinder sig til. Sådan kommer en chatbesked rundt:",
        noter: [
          ["1. Browser A", "JavaScript kalder `connection.invoke(\"SendMessage\", tekst)`."],
          ["2. Hubben", "Metoden `SendMessage` kører på serveren."],
          ["3. Hubben", "`Clients.All.SendAsync(\"ReceiveMessage\", user, message)` sender til **alle** forbundne browsere."],
          ["4. Alle browsere", "Funktionen, der er registreret med `connection.on(\"ReceiveMessage\", …)`, kører og viser beskeden."]
        ],
        md2: "Læg mærke til, at navnene er **tekster**: `\"SendMessage\"` og `\"ReceiveMessage\"`. Compileren kan ikke tjekke dem. Staves de forskelligt i C# og JavaScript, sker der ingenting — eller der kommer en fejl i browserens konsol." },
      { t: "laes", h: "Hubben i C#",
        md: "SignalR er en del af ASP.NET Core, så serveren skal ikke have en ny NuGet-pakke. Lav mappen `Hubs` og filen `Hubs/ChatHub.cs`:",
        kode: R`using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace KlubWeb.Hubs;

[Authorize]
public class ChatHub : Hub
{
    public async Task SendMessage(string message)
    {
        string user = Context.User?.Identity?.Name ?? "Ukendt";
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}`,
        frag: true,
        noter: [
          ["using Microsoft.AspNetCore.SignalR;", "Her bor `Hub`."],
          ["[Authorize]", "Kun brugere, der er logget ind, kan forbinde sig. Andre får 401 Unauthorized."],
          [": Hub", "Klassen arver fra `Hub` — så er den en hub."],
          ["public async Task SendMessage(string message)", "En metode, som browserne kan kalde med `invoke`."],
          ["Context.User?.Identity?.Name", "Hubbens udgave af `User`: hvem der sendte beskeden. Navnet kommer fra login-cookien, ikke fra browseren — så ingen kan udgive sig for at være en anden."],
          ["Clients.All", "Alle forbundne browsere. Der findes også `Clients.Caller` (kun afsenderen) og `Clients.Others` (alle andre end afsenderen)."],
          ["SendAsync(\"ReceiveMessage\", user, message)", "Kald JavaScript-funktionen `ReceiveMessage` i hver browser med to argumenter: først `user`, så `message`."]
        ],
        md2: "Microsofts egen chat-vejledning lader browseren sende navnet med: `SendMessage(string user, string message)`. Her tager vi navnet fra login i stedet. Det er sikrere, og det er en god ting at kunne forklare til eksamen." },
      { t: "udfyld", q: "Registrér SignalR i `Program.cs`, og gør hubben tilgængelig på adressen `/chathub`.",
        kode: R`builder.Services.AddControllersWithViews();
builder.Services.[[AddSignalR]]();

var app = builder.Build();

app.MapRazorPages()
   .WithStaticAssets();

app.[[MapHub]]<[[ChatHub]]>("/chathub");

app.Run();`,
        frag: true,
        fordi: "`AddSignalR` registrerer SignalR's services. `MapHub<ChatHub>(\"/chathub\")` siger: forbindelser til `/chathub` går til `ChatHub` — ligesom `MapControllerRoute` gør for controllere. Husk `using KlubWeb.Hubs;` øverst." },
      { t: "laes", h: "Klientbiblioteket: signalr.js",
        md: "Browseren skal have SignalR's JavaScript-bibliotek. Det hentes ned i `wwwroot` med **LibMan** (Library Manager):",
        win: [
          "Højreklik på projektet i Solution Explorer → **Add → Client-Side Library…**",
          "Provider: **unpkg**. Library: `@microsoft/signalr@latest`.",
          "Vælg **Choose specific files**, og sæt flueben ved `dist/browser/signalr.js` og `dist/browser/signalr.min.js`.",
          "Target Location: `wwwroot/js/signalr/` → **Install**."
        ],
        mac: [
          "Installér LibMan én gang i terminalen: `dotnet tool install -g Microsoft.Web.LibraryManager.Cli`",
          "Stå i projektmappen, og skriv: `libman install @microsoft/signalr@latest -p unpkg -d wwwroot/js/signalr --files dist/browser/signalr.js --files dist/browser/signalr.min.js`"
        ],
        md2: "Bagefter ligger filen i `wwwroot/js/signalr/dist/browser/signalr.js`. Det er den sti, viewet skal bruge. Der er også kommet en fil, `libman.json`, som husker, hvad der er hentet." },
      { t: "laes", h: "chat.js: forbind, lyt og send",
        md: "Selve chatten i browseren er almindelig JavaScript (modul 14 og 15). Lav `wwwroot/js/chat.js`:",
        kode: R`const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chathub")
    .build();

const sendKnap = document.getElementById("sendKnap");

connection.on("ReceiveMessage", (user, message) => {
    const li = document.createElement("li");
    li.textContent = user + ": " + message;
    document.getElementById("beskeder").appendChild(li);
});

sendKnap.addEventListener("click", async () => {
    const input = document.getElementById("beskedInput");
    try {
        await connection.invoke("SendMessage", input.value);
        input.value = "";
    } catch (err) {
        console.error(err.toString());
    }
});

async function start() {
    try {
        await connection.start();
        sendKnap.disabled = false;
    } catch (err) {
        console.error(err.toString());
    }
}

start();`,
        sprog: "js",
        noter: [
          ["new signalR.HubConnectionBuilder().withUrl(\"/chathub\").build()", "Lav en forbindelse til hubben på `/chathub` — samme adresse som i `MapHub`."],
          ["connection.on(\"ReceiveMessage\", (user, message) => …)", "Lyt efter, at serveren kalder `ReceiveMessage`. Argumenterne kommer i **samme rækkefølge**, som hubben sendte dem."],
          ["li.textContent = …", "`textContent` og ikke `innerHTML`: skriver nogen HTML i en besked, vises det som tekst og bliver ikke til rigtig HTML hos de andre."],
          ["connection.invoke(\"SendMessage\", input.value)", "Kald hubbens metode `SendMessage` med teksten."],
          ["await connection.start()", "Åbn forbindelsen. Først derefter slås knappen til."],
          ["try … catch", "Går noget galt, skrives fejlen i browserens konsol (F12)."]
        ] },
      { t: "orden", sprog: "text", q: "Sæt trinnene i den rækkefølge, de sker, når Bo sender en besked, og Ida ser den.",
        linjer: [
          "Bo skriver en besked og klikker Send",
          "chat.js kalder connection.invoke(\"SendMessage\", tekst)",
          "Hubbens metode SendMessage kører på serveren",
          "Clients.All.SendAsync(\"ReceiveMessage\", user, message) sender til alle",
          "connection.on(\"ReceiveMessage\") kører i Idas browser",
          "Idas side viser et nyt punkt i listen"
        ],
        fordi: "Browser → hub med `invoke`. Hub → alle browsere med `SendAsync`. I browserne fanger `connection.on` beskeden og viser den." },
      { t: "spor", h: "Spor: en hub sender til alle",
        q: "Her er en hub efterlignet i C#: hver browser er en liste af linjer på skærmen, og `SendMessage` sender til dem alle — ligesom `Clients.All`. Skriv antallet af linjer på hver skærm og den sidste linje på Idas skærm lige efter hver kørt linje.",
        kode: R`List<string> skaermIda = new List<string>();
List<string> skaermBo = new List<string>();

SendMessage("ida", "Hej Bo");
SendMessage("bo", "Hej Ida");
SendMessage("bo", "Træning kl. 18?");

void SendMessage(string user, string message)
{
    ReceiveMessage(skaermIda, user, message);
    ReceiveMessage(skaermBo, user, message);
}

void ReceiveMessage(List<string> skaerm, string user, string message)
{
    skaerm.Add(user + ": " + message);
}`,
        kolonner: ["skaermIda.Count", "skaermBo.Count", "skaermIda[skaermIda.Count - 1]"],
        raekker: [[1, "=0", "=–", "=–"], [2, "=0", "=0", "=–"], [4, "1", "1", "ida: Hej Bo"], [5, "2", "2", "bo: Hej Ida"], [6, "3", "3", "bo: Træning kl. 18?"]],
        fordi: "Hver besked lander på **begge** skærme, også hos afsenderen selv — `Clients.All` betyder alle. Vil man ikke have sin egen besked tilbage, kan hubben bruge `Clients.Others`." },
      { t: "fejl", q: "Hubben og JavaScript-funktionen skal være enige om rækkefølgen af argumenterne. Her er det efterlignet i C#: `ReceiveMessage` venter først navnet og så beskeden. Ida ser `Hej Bo: ida@klubweb.dk` i stedet for `ida@klubweb.dk: Hej Bo`. Klik på den forkerte linje.",
        kode: R`string user = "ida@klubweb.dk";
string message = "Hej Bo";

ReceiveMessage(message, user);

void ReceiveMessage(string fra, string tekst)
{
    Console.WriteLine(fra + ": " + tekst);
}`,
        linje: 4, logisk: true, output: "Hej Bo: ida@klubweb.dk",
        fordi: "Argumenter matches på **plads**, ikke på navn. I SignalR er det det samme: `SendAsync(\"ReceiveMessage\", user, message)` i hubben og `connection.on(\"ReceiveMessage\", (user, message) => …)` i JavaScript skal have samme rækkefølge. Bytter du om det ene sted, får du hverken en compilerfejl eller en fejl i konsollen — bare forkert tekst på skærmen.",
        rettet: R`string user = "ida@klubweb.dk";
string message = "Hej Bo";

ReceiveMessage(user, message);

void ReceiveMessage(string fra, string tekst)
{
    Console.WriteLine(fra + ": " + tekst);
}`,
        rettetOutput: "ida@klubweb.dk: Hej Bo" },
      { t: "valg", q: "Ida klikker **Send**, men intet sker. I browserens konsol (F12) står: `Failed to invoke 'Send' due to an error on the server. HubException: Method does not exist.` Hvad er der galt?",
        svar: ["JavaScript kalder invoke(\"Send\", …), men metoden i hubben hedder SendMessage", "Hubben mangler [Authorize]", "Ida er ikke logget ind", "Der står Clients.All i stedet for Clients.Others"],
        ret: 0, fordi: "Navnet i `invoke` skal være **præcis** navnet på en `public` metode i hubben. Serveren fandt ingen metode, der hedder `Send`. Ret JavaScript til `invoke(\"SendMessage\", …)`." },
      { t: "ide", h: "Byg klubchatten",
        md: "1. Lav `Hubs/ChatHub.cs`, og tilføj `AddSignalR` og `MapHub` i `Program.cs` (husk `using KlubWeb.Hubs;`).\n2. Hent klientbiblioteket (trin 6).\n3. Lav `ChatController` med `[Authorize]` over klassen og en `Index`-action, der returnerer `View()`.\n4. Lav `Views/Chat/Index.cshtml` med koden herunder og `wwwroot/js/chat.js` fra trin 7.\n5. Tilføj et **Chat**-link i menuen for brugere, der er logget ind.\n6. Kør appen, og log ind som Ida. Åbn et **privat vindue** fra browserens menu (eller en anden browser) — ellers deler de to faner samme login-cookie — og log ind som Bo der.\n7. Gå til **Chat** i begge vinduer, og skriv. Beskeden dukker op i begge med det samme, fx **ida@klubweb.dk: Hej Bo**.\n8. Tryk F12, og åbn **Console**. Der står en linje med `WebSocket connected to` og en adresse, der begynder med `ws://` eller `wss://` og slutter med `/chathub?id=…`. Det er beviset på, at chatten bruger en WebSocket.",
        kode: R`@{
    ViewData["Title"] = "Klubchat";
}

<h1>Klubchat</h1>

<div class="mb-3">
    <input type="text" id="beskedInput" class="form-control" placeholder="Skriv en besked" />
    <button type="button" id="sendKnap" class="btn btn-primary mt-2" disabled>Send</button>
</div>

<ul id="beskeder"></ul>

@section Scripts {
    <script src="~/js/signalr/dist/browser/signalr.js"></script>
    <script src="~/js/chat.js"></script>
}`,
        sprog: "razor",
        md2: "Sæt et breakpoint i `SendMessage` i hubben, og send en besked. Debuggeren stopper på **serveren**, og du kan se `message` og `user` i {{Locals||Threads & Variables}}. Tryk Continue, og beskeden kommer frem i begge vinduer." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er forskellen på HTTP og WebSocket, og hvordan bruger din chat SignalR?",
        svar: "Med **HTTP** spørger browseren, og serveren svarer — serveren kan ikke selv sende noget. En **WebSocket** er én forbindelse, der bliver ved med at være åben, så begge parter kan sende når som helst. **SignalR** bygger oven på WebSocket og falder tilbage til andre teknikker, hvis WebSocket ikke kan bruges. På serveren har jeg en **hub**, `ChatHub`, registreret med `AddSignalR` og `MapHub`. Browseren forbinder med `signalr.js`, sender med `connection.invoke(\"SendMessage\", …)`, og hubben sender videre til alle med `Clients.All.SendAsync(\"ReceiveMessage\", user, message)`, som browserne fanger med `connection.on`. Navnene og argumenternes rækkefølge skal passe på begge sider.",
        noegle: ["HTTP", "WebSocket", "åben", "begge veje", "hub", "Clients.All", "connection.on", "invoke"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m20l6", titel: "Sikkerhed: hashing, HTTPS, anti-forgery og hemmeligheder", min: 18,
    ord: [
      ["Hash", "En envejs-omregning af en tekst til en kode af fast længde. Samme tekst giver altid samme hash, men man kan ikke regne baglæns."],
      ["Salt", "Tilfældige bytes, der blandes ind, før der hashes, så to brugere med samme adgangskode får forskellige hashes."],
      ["PBKDF2", "Den hash-metode, Identity bruger: den hasher 100.000 gange i træk, så det tager lang tid at gætte sig frem."],
      ["HTTPS", "HTTP, hvor alt mellem browser og server er krypteret. Nødvendigt, når der sendes adgangskoder og login-cookies."],
      ["HSTS", "Besked til browseren om altid at bruge HTTPS til siden fremover."],
      ["CSRF", "Cross-Site Request Forgery: en fremmed side får din browser til at sende en formular til en side, du er logget ind på."],
      ["Anti-forgery token", "Et skjult, hemmeligt felt i dine formularer, som en fremmed side ikke kan kende. `[ValidateAntiForgeryToken]` tjekker det."],
      ["User secrets", "En fil uden for projektmappen, hvor man gemmer hemmeligheder under udvikling, så de aldrig kommer med i Git."]
    ],
    trin: [
      { t: "laes", h: "Adgangskoder gemmes aldrig",
        md: "Åbn tabellen `AspNetUsers`, og se kolonnen `PasswordHash`. Hos admin står der noget i denne stil:\n\n`AQAAAAIAAYagAAAAEP4tZ/jsLJXnST4NbtEjFVawPxb/RZear86yK1Q/…`\n\nDet er ikke adgangskoden, og den kan ikke regnes tilbage til adgangskoden. Det er en **hash**: resultatet af en envejs-beregning.\n\nNår du logger ind, gør Identity sådan:\n\n1. Find brugeren ud fra e-mailen.\n2. Hash den adgangskode, du lige har skrevet, på præcis samme måde.\n3. Er de to hashes ens, er adgangskoden rigtig.\n\nSå hverken en administrator eller en hacker, der stjæler databasen, kan læse brugernes adgangskoder." },
      { t: "forudsig", q: "Her hashes tre tekster med SHA-256, en kendt hash-funktion. Hvad skriver programmet?",
        kode: R`using System.Security.Cryptography;
using System.Text;

string a = Hash("Ida123!");
string b = Hash("Ida123!");
string c = Hash("Ida124!");

Console.WriteLine(a == b);
Console.WriteLine(a == c);
Console.WriteLine(a.Length);

string Hash(string tekst)
{
    byte[] bytes = SHA256.HashData(Encoding.UTF8.GetBytes(tekst));
    return Convert.ToHexString(bytes);
}`,
        output: "True\nFalse\n64",
        fordi: "Samme tekst giver altid samme hash, så login kan sammenligne. Én ændret karakter giver en helt anden hash. Og hashen er altid lige lang: 32 bytes, skrevet som 64 hex-tegn — uanset om adgangskoden er 3 eller 300 tegn lang." },
      { t: "laes", h: "Salt: samme adgangskode, forskellig hash",
        md: "Problemet med en ren hash: har Ida og Bo samme adgangskode, har de også samme hash. En angriber kan desuden lave en kæmpe liste med hashes af almindelige adgangskoder og slå op i den.\n\nDerfor laver Identity et tilfældigt **salt** til hver bruger og hasher adgangskoden **sammen med** saltet. Saltet gemmes i `PasswordHash` sammen med resultatet. Desuden bruger Identity **PBKDF2**, som hasher 100.000 gange i træk: det tager et øjeblik ved login, men gør det ekstremt langsomt at gætte millioner af adgangskoder.",
        noter: [
          ["Starten AQAAAAIAAYag…", "Fortæller, hvilken metode og hvor mange gentagelser hashen er lavet med, så Identity kan tjekke den igen senere."],
          ["Salt", "Er ikke hemmeligt — det skal bare være forskelligt for hver bruger."]
        ] },
      { t: "forudsig", q: "Ida og Bo har valgt samme adgangskode, men har hvert sit salt. (I virkeligheden er saltet tilfældigt; her står det fast i koden, så resultatet altid er det samme.) Hvad skriver programmet?",
        kode: R`using System.Security.Cryptography;

byte[] saltIda = { 1, 2, 3, 4, 5, 6, 7, 8 };
byte[] saltBo = { 8, 7, 6, 5, 4, 3, 2, 1 };

string gemtIda = Hash("Sommer2026!", saltIda);
string gemtBo = Hash("Sommer2026!", saltBo);
Console.WriteLine(gemtIda == gemtBo);

Console.WriteLine(Hash("Sommer2026!", saltIda) == gemtIda);
Console.WriteLine(Hash("sommer2026!", saltIda) == gemtIda);

string Hash(string password, byte[] salt)
{
    byte[] h = Rfc2898DeriveBytes.Pbkdf2(password, salt, 100000, HashAlgorithmName.SHA512, 32);
    return Convert.ToHexString(h);
}`,
        output: "False\nTrue\nFalse",
        fordi: "Samme adgangskode med forskelligt salt giver forskellige hashes, så man kan ikke se, at Ida og Bo har samme adgangskode. Ved login hashes det, Ida skriver, med **hendes** salt og sammenlignes: rigtig adgangskode giver `True`, et lille `s` giver `False`." },
      { t: "valg", q: "En bruger skriver til klubbens admin: \"Jeg har glemt min adgangskode — kan du slå den op?\" Hvad er det rigtige svar?",
        svar: ["Nej, den findes ikke i databasen — kun en hash. Brugeren må nulstille den og vælge en ny", "Ja, den står i AspNetUsers i kolonnen PasswordHash", "Ja, admin kan dekryptere hashen med appens nøgle", "Ja, den står i appsettings.json"],
        ret: 0, fordi: "En hash er **envejs**: den kan ikke regnes tilbage. Derfor har Identity en side til at nulstille adgangskoden i stedet for en side til at vise den." },
      { t: "laes", h: "HTTPS: krypter alt, der sendes",
        md: "Login-formularen sender adgangskoden, og bagefter sender browseren login-cookien med **hver** forespørgsel. Over almindelig `http://` kan andre på samme netværk, fx et åbent café-wifi, læse med. Får nogen fat i cookien, kan de bruge kontoen uden at kende adgangskoden.\n\nDerfor kører ASP.NET Core-projekter på **HTTPS**, og skabelonen har to linjer til det i `Program.cs`:",
        kode: R`if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();`,
        frag: true,
        noter: [
          ["UseHttpsRedirection()", "Kommer der en forespørgsel på `http://`, sendes browseren videre til `https://`."],
          ["UseHsts()", "Fortæller browseren: brug altid HTTPS til denne side fremover. Kun uden for udvikling, så det ikke driller på din egen maskine."],
          ["Udviklingscertifikat", "Første gang du kører et projekt, bliver du spurgt, om du stoler på et certifikat til `localhost`. Sig ja. Kommer spørgsmålet ikke, kan du skrive `dotnet dev-certs https --trust` i en terminal."]
        ],
        md2: "SignalR følger med: på en `https://`-side bliver forbindelsen til hubben `wss://` — en krypteret WebSocket." },
      { t: "valg", q: "Hvad gør `app.UseHttpsRedirection();`?",
        svar: ["Sender browseren videre fra http:// til https://, så alt bliver krypteret", "Krypterer adgangskoderne i databasen", "Logger brugeren ud, når hun lukker browseren", "Sender brugeren til login-siden"],
        ret: 0, fordi: "Linjen handler om **transporten** mellem browser og server. Adgangskoderne i databasen er beskyttet af hashing, ikke af HTTPS — de to ting løser hver sit problem." },
      { t: "laes", h: "Anti-forgery: formularer fra fremmede sider",
        md: "Et angreb, der hedder **CSRF** (*Cross-Site Request Forgery*), virker sådan: admin er logget ind på KlubWeb. I en anden fane åbner hun en ondsindet side. Den side har en skjult formular, der sender et POST til `/Admin/OpretBruger` på KlubWeb — og browseren sender automatisk admins login-cookie med. Uden beskyttelse ville KlubWeb tro, at det var admin selv.\n\nForsvaret er et **anti-forgery token**: en hemmelig værdi, som kun dine egne sider kender.",
        noter: [
          ["<form asp-action=…>", "Form-tag-helperen lægger selv et skjult felt ind: `<input name=\"__RequestVerificationToken\" type=\"hidden\" value=\"CfDJ8…\" />`. Du kan se det med **Vis sidens kilde** i browseren."],
          ["[ValidateAntiForgeryToken]", "På POST-actionen: mangler tokenet, eller passer det ikke, afvises forespørgslen med **400 Bad Request**, og actionen kører slet ikke."],
          ["Den fremmede side", "Kan ikke læse tokenets værdi fra din side, så den kan ikke lave en gyldig formular."],
          ["Identitys sider", "Razor Pages tjekker tokenet automatisk. I dine egne controllere skal du selv skrive attributten på hver POST-action."]
        ] },
      { t: "valg", q: "En fremmed hjemmeside sender et POST til `/Admin/OpretBruger`, mens admin er logget ind i samme browser. Actionen har `[ValidateAntiForgeryToken]`. Hvad sker der?",
        svar: ["Serveren svarer 400 Bad Request, fordi tokenet mangler — der oprettes ingen bruger", "Brugeren oprettes, fordi admins cookie er med", "Admin bliver logget ud", "Serveren svarer 404 Not Found"],
        ret: 0, fordi: "Cookien er med, men tokenet er ikke. `[ValidateAntiForgeryToken]` stopper forespørgslen, før actionen kører. Det er derfor, attributten står på alle POST-actions, som Visual Studio scaffolder." },
      { t: "laes", h: "Hemmeligheder hører ikke til i koden",
        md: "I `SeedData` står admins adgangskode `\"Admin123!\"` direkte i koden. Lægger du projektet på GitHub, kan alle læse den. Det samme gælder adgangskoder til databaser og API-nøgler.\n\nUnder udvikling bruger man **user secrets**: en fil, `secrets.json`, der ligger i din brugermappe **uden for** projektet, så den aldrig kommer med i Git. ASP.NET Core læser den automatisk, når appen kører i Development, og du henter værdien gennem `IConfiguration` — ligesom connection string fra `appsettings.json`.",
        win: [
          "Højreklik på projektet i Solution Explorer → **Manage User Secrets**.",
          "Filen `secrets.json` åbner. Skriv `{ \"Admin:Password\": \"Admin123!\" }`, og gem."
        ],
        mac: [
          "Åbn en terminal i projektmappen.",
          "Skriv: `dotnet user-secrets set \"Admin:Password\" \"Admin123!\"`",
          "Svaret er `Successfully saved Admin:Password to the secret store.` Med `dotnet user-secrets list` kan du se, hvad der er gemt."
        ],
        kode: R`var config = services.GetRequiredService<IConfiguration>();

string adminPassword = config["Admin:Password"]
    ?? throw new InvalidOperationException("Admin:Password mangler i user secrets.");
await userManager.CreateAsync(admin, adminPassword);`,
        frag: true,
        noter: [
          ["GetRequiredService<IConfiguration>()", "Konfigurationen: `appsettings.json`, user secrets og miljøvariabler samlet ét sted."],
          ["config[\"Admin:Password\"]", "Kolon betyder et niveau: nøglen `Password` under `Admin`. Findes den ikke, er svaret `null`."],
          ["?? throw …", "Mangler hemmeligheden, stopper appen med en tydelig besked i stedet for at oprette en admin uden adgangskode."]
        ] },
      { t: "udfyld", q: "Hent admins adgangskode fra konfigurationen i stedet for at skrive den i koden.",
        kode: R`var config = services.GetRequiredService<[[IConfiguration]]>();
string adminPassword = config["[[Admin:Password]]"]
    ?? throw new InvalidOperationException("Admin:Password mangler i user secrets.");`,
        frag: true,
        fordi: "`IConfiguration` er typen på konfigurationen. Nøglen skal staves præcis som i user secrets: `Admin:Password`." },
      { t: "ide", h: "Ryd op i sikkerheden",
        md: "1. Gem admins adgangskode i user secrets (trin 10), og ret `SeedData`, så den læser `config[\"Admin:Password\"]`. Søg i projektet efter `Admin123!` — der må ikke være noget tilbage i koden.\n2. Seedingen opretter kun admin, hvis den ikke findes. Vil du se den nye kode køre, så slet admin-rækken i `AspNetUsers` (rækken i `AspNetUserRoles` forsvinder med), og start appen igen. Log ind med adgangskoden fra user secrets.\n3. Kig i `AspNetUsers`: `PasswordHash` er helt forskellig for alle brugere, også dem med samme adgangskode.\n4. Åbn **Opret bruger**, og vælg **Vis sidens kilde** i browseren. Find det skjulte felt `__RequestVerificationToken`.\n5. Se i adresselinjen, at appen kører på `https://`. Står der `http://`, kører du profilen **http**: vælg **https** i listen ved siden af den grønne pil ▶, og kør igen.",
        md2: "User secrets er kun til din egen maskine under udvikling. På en rigtig server lægger man hemmeligheder i miljøvariabler eller en nøgleboks, fx Azure Key Vault. Princippet er det samme: ikke i koden." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvordan gemmer din app brugernes adgangskoder, og hvordan tjekkes de ved login?",
        svar: "Adgangskoderne gemmes aldrig i **klartekst**. ASP.NET Core Identity gemmer en **hash** i kolonnen PasswordHash. Hashen er **envejs**, så den kan ikke regnes tilbage. Hver bruger får sit eget tilfældige **salt**, så to ens adgangskoder giver forskellige hashes, og Identity bruger **PBKDF2** med mange gentagelser, så det er langsomt at gætte. Ved login hasher Identity den indtastede adgangskode med brugerens salt og **sammenligner** med den gemte hash. Derudover kører appen på HTTPS, så adgangskoden og login-cookien ikke kan læses undervejs.",
        noegle: ["hash", "envejs", "salt", "PBKDF2", "sammenligner", "klartekst", "HTTPS"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m20v", titel: "Værksted: Bibliotek med login, roller og opslagstavle", vaerksted: true, min: 120,
    ord: [],
    trin: [
      { t: "laes", h: "Sådan arbejder du i værkstedet",
        md: "Nu bygger du **en ny app selv**: et bibliotek, hvor lånere logger ind, bibliotekaren har sine egne sider, og nyheder dukker op hos alle med det samme. Siden giver dig opgaven og kravene. Koden skriver du i {{Visual Studio||Rider}}.\n\nOpgaverne bygger oven på hinanden i det samme projekt. Den første er let. Den tredje er en fejlfindingsopgave. Den sidste samler hele modulet.",
        noter: [
          ["Skriv selv", "Skriv koden med dine egne fingre. Kig gerne i lektionerne, men kopiér ikke KlubWeb. Det er skrivningen, der får det til at sidde."],
          ["Kør tit", "Kør appen efter hver lille ændring. Så ved du præcis, hvilken ændring der lavede en fejl."],
          ["Brug debuggeren", "Virker det ikke, så sæt et breakpoint, og gå ét skridt ad gangen. Se værdierne i Locals (Visual Studio) eller Threads & Variables (Rider) i stedet for at gætte."],
          ["To brugere", "Brug et privat vindue til den anden bruger, så de to ikke deler login-cookie."],
          ["Tips før løsning", "Sidder du fast, så åbn ét tip ad gangen. Løsningen er sidste udvej."]
        ] },
      { t: "opgave", h: "Bibliotek med login", projekt: "Bibliotek",
        md: "Lav en ny MVC-app til et bibliotek. Alle kan se forsiden, men siden **Mine lån** kræver login.",
        krav: [
          "Projektet hedder `Bibliotek` og er lavet med Individual Accounts (Mac: `dotnet new mvc --auth Individual -o Bibliotek`)",
          "`RequireConfirmedAccount` er sat til `false` i `Program.cs`",
          "Databasen er oprettet (Windows: `Update-Database`, Mac: `dotnet ef database update`)",
          "`HomeController` har en action `MineLaan` med `[Authorize]`, der svarer med `Content` og teksten `Hej, {navn}. Du har ingen lån endnu.` — hvor `{navn}` er brugerens navn",
          "Logget ud fører `/Home/MineLaan` til login-siden, og efter login kommer du tilbage til teksten"
        ],
        tip: [
          "Projektet laves præcis som KlubWeb i lektion 1. Ret `RequireConfirmedAccount`, før du registrerer en bruger.",
          "`[Authorize]` kræver `using Microsoft.AspNetCore.Authorization;` øverst i controlleren.",
          "`return Content($\"Hej, {User.Identity?.Name}. Du har ingen lån endnu.\");`"
        ],
        output: "Hej, sara@bibliotek.dk. Du har ingen lån endnu.",
        fri: true, frag: true,
        loesning: R`// Program.cs (udsnit)
builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddEntityFrameworkStores<ApplicationDbContext>();

// Controllers/HomeController.cs (udsnit)
using Microsoft.AspNetCore.Authorization;

[Authorize]
public IActionResult MineLaan()
{
    return Content($"Hej, {User.Identity?.Name}. Du har ingen lån endnu.");
}`,
        ekstra: ["Lav et menupunkt **Mine lån**, der kun vises for brugere, der er logget ind (`User.Identity?.IsAuthenticated == true`)."] },
      { t: "opgave", h: "Roller: bibliotekar og låner", projekt: "Bibliotek",
        md: "Biblioteket har to roller. Bibliotekaren oprettes automatisk, når appen starter, og har sin egen side, som ingen andre må se.",
        krav: [
          "Roller er slået til med `.AddRoles<IdentityRole>()` før `.AddEntityFrameworkStores<ApplicationDbContext>()`",
          "`Data/SeedData.cs` opretter rollerne `Bibliotekar` og `Laaner`, hvis de ikke findes",
          "Seedingen opretter brugeren `bibliotekar@bibliotek.dk` med `EmailConfirmed = true` og rollen Bibliotekar, hvis den ikke findes",
          "Bibliotekarens adgangskode ligger i user secrets under nøglen `Bibliotekar:Password` — ikke i koden",
          "Seedingen kaldes fra `Program.cs` i et scope lige efter `builder.Build()`",
          "`BibliotekarController` har `[Authorize(Roles = \"Bibliotekar\")]` og en `Index`-action med et view, der viser overskriften **Bibliotekarens side**",
          "Menuen viser kun linket **Bibliotekar** for brugere i rollen Bibliotekar",
          "En almindelig bruger, der går til `/Bibliotekar`, får **Access denied**"
        ],
        tip: [
          "Se lektion 3, trin 3 og 6, for seedingen og scopet, og lektion 6, trin 10, for user secrets.",
          "Adgangskoden skal opfylde Identitys krav (store og små bogstaver, tal og tegn), ellers fejler `CreateAsync` uden at sige noget. Brug fx `Bog2026!`.",
          "Menupunktet: `@if (User.IsInRole(\"Bibliotekar\")) { <li class=\"nav-item\"><a class=\"nav-link text-dark\" asp-area=\"\" asp-controller=\"Bibliotekar\" asp-action=\"Index\">Bibliotekar</a></li> }`"
        ],
        output: "Bibliotekarens side",
        fri: true, frag: true,
        loesning: R`// Program.cs (udsnit)
builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddControllersWithViews();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    await SeedData.OpretAsync(scope.ServiceProvider);
}

// Data/SeedData.cs
using Microsoft.AspNetCore.Identity;

namespace Bibliotek.Data;

public static class SeedData
{
    public static async Task OpretAsync(IServiceProvider services)
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = services.GetRequiredService<UserManager<IdentityUser>>();
        var config = services.GetRequiredService<IConfiguration>();

        string[] roller = { "Bibliotekar", "Laaner" };
        foreach (string rolle in roller)
        {
            if (!await roleManager.RoleExistsAsync(rolle))
            {
                await roleManager.CreateAsync(new IdentityRole(rolle));
            }
        }

        string email = "bibliotekar@bibliotek.dk";
        IdentityUser? bibliotekar = await userManager.FindByEmailAsync(email);
        if (bibliotekar == null)
        {
            bibliotekar = new IdentityUser { UserName = email, Email = email, EmailConfirmed = true };
            string password = config["Bibliotekar:Password"]
                ?? throw new InvalidOperationException("Bibliotekar:Password mangler i user secrets.");
            await userManager.CreateAsync(bibliotekar, password);
            await userManager.AddToRoleAsync(bibliotekar, "Bibliotekar");
        }
    }
}

// Controllers/BibliotekarController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bibliotek.Controllers;

[Authorize(Roles = "Bibliotekar")]
public class BibliotekarController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}

// Views/Bibliotekar/Index.cshtml
// <h1>Bibliotekarens side</h1>`,
        ekstra: ["Lad `Index` på bibliotekarens side skrive, hvem der er logget ind, med `@User.Identity?.Name`."] },
      { t: "opgave", h: "Fejlfinding: bibliotekaren kan ikke logge ind", projekt: "Bibliotek",
        md: "En kollega har skrevet seedingen herunder. Appen starter uden fejl, og rollerne kommer i databasen — men når man logger ind som `bibliotekar@bibliotek.dk`, svarer login-siden **Invalid login attempt.** Adgangskoden i user secrets er rigtig.\n\nErstat din egen `SeedData.cs` med kollegaens, slet databasen og lav den igen (eller slet alle rækker i `AspNetUsers`), og find fejlen **med debuggeren** — ikke ved at gætte.",
        start: R`using Microsoft.AspNetCore.Identity;

namespace Bibliotek.Data;

public static class SeedData
{
    public static async Task OpretAsync(IServiceProvider services)
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = services.GetRequiredService<UserManager<IdentityUser>>();
        var config = services.GetRequiredService<IConfiguration>();

        string[] roller = { "Bibliotekar", "Laaner" };
        foreach (string rolle in roller)
        {
            if (!await roleManager.RoleExistsAsync(rolle))
            {
                await roleManager.CreateAsync(new IdentityRole(rolle));
            }
        }

        string email = "bibliotekar@bibliotek.dk";
        IdentityUser? bibliotekar = await userManager.FindByEmailAsync(email);
        if (bibliotekar != null)
        {
            bibliotekar = new IdentityUser { UserName = email, Email = email, EmailConfirmed = true };
            string password = config["Bibliotekar:Password"]
                ?? throw new InvalidOperationException("Bibliotekar:Password mangler i user secrets.");
            await userManager.CreateAsync(bibliotekar, password);
            await userManager.AddToRoleAsync(bibliotekar, "Bibliotekar");
        }
    }
}`,
        krav: [
          "Sæt et breakpoint på linjen `IdentityUser? bibliotekar = await userManager.FindByEmailAsync(email);`, og start med debuggeren",
          "Gå ét skridt frem (Step Over), og se værdien af `bibliotekar` i Locals (Visual Studio) eller Threads & Variables (Rider)",
          "Gå et skridt mere, og se, om blokken med `CreateAsync` bliver kørt",
          "Ret fejlen, og kør igen: login som bibliotekar virker, og menuen viser **Bibliotekar**",
          "Tjek i tabellen `AspNetUsers`, at bibliotekaren nu findes"
        ],
        tip: [
          "Kig i `AspNetUsers`: tabellen er tom. Brugeren er altså aldrig blevet oprettet. Hvilken linje skulle have gjort det?",
          "Første gang er `bibliotekar` `null`. Hvad giver `if`-betingelsen så?",
          "Der står `!= null`. Blokken kører kun, hvis brugeren **allerede findes** — altså aldrig første gang. Det skal være `== null`."
        ],
        output: "Login virker, og menuen viser Bibliotekar",
        fri: true, frag: true,
        loesning: R`string email = "bibliotekar@bibliotek.dk";
IdentityUser? bibliotekar = await userManager.FindByEmailAsync(email);
if (bibliotekar == null)
{
    bibliotekar = new IdentityUser { UserName = email, Email = email, EmailConfirmed = true };
    string password = config["Bibliotekar:Password"]
        ?? throw new InvalidOperationException("Bibliotekar:Password mangler i user secrets.");
    await userManager.CreateAsync(bibliotekar, password);
    await userManager.AddToRoleAsync(bibliotekar, "Bibliotekar");
}`,
        fordi: "Fejlen var ét tegn: `!=` i stedet for `==`. Appen gav ingen fejl, for koden er gyldig — den gjorde bare ingenting. Den slags fejl finder man hurtigst ved at se værdierne i debuggeren i stedet for at læse koden igen og igen." },
      { t: "opgave", h: "Bibliotekaren opretter lånere", projekt: "Bibliotek",
        md: "Bibliotekaren skal kunne oprette nye lånere fra sin egen side. En ny låner får altid rollen Laaner. Siden viser alle lånere og en grøn besked, når en ny er oprettet.",
        krav: [
          "`Models/OpretLaanerViewModel.cs` har `Email` (`[Required]`, `[EmailAddress]`), `Password` (`[Required]`, `[DataType(DataType.Password)]`) og `GentagPassword` (`[Compare(\"Password\", ErrorMessage = \"De to adgangskoder er ikke ens\")]`)",
          "`BibliotekarController` får `UserManager<IdentityUser>` gennem konstruktøren",
          "`OpretLaaner` findes som GET og som POST med `[HttpPost]` og `[ValidateAntiForgeryToken]`",
          "POST opretter brugeren med `EmailConfirmed = true` og giver den rollen `Laaner`",
          "Fejler `CreateAsync`, vises Identitys fejl i formularen med `ModelState.AddModelError`",
          "Lykkes det, sættes `TempData[\"Besked\"]` til `Låneren {email} er oprettet.`, og browseren sendes til `Index`",
          "`Index` viser beskeden i en grøn boks (`alert alert-success`), overskriften `Lånere ({antal})` og alle lånere i en liste — hent dem med `await _userManager.GetUsersInRoleAsync(\"Laaner\")`"
        ],
        tip: [
          "Formularen og POST-actionen ligner KlubWebs `OpretBruger` i lektion 4 — bare uden rollevalg.",
          "`GetUsersInRoleAsync` giver en `IList<IdentityUser>`. Send den til viewet med `return View(laanere);`, og skriv `@model IList<Microsoft.AspNetCore.Identity.IdentityUser>` øverst i viewet.",
          "Antallet står i `@Model.Count`. Lånernes e-mail i en `@foreach (var l in Model) { <li>@l.Email</li> }`."
        ],
        output: "Låneren sara@bibliotek.dk er oprettet.\nLånere (1)\nsara@bibliotek.dk",
        fri: true, frag: true,
        loesning: R`// Models/OpretLaanerViewModel.cs
using System.ComponentModel.DataAnnotations;

namespace Bibliotek.Models;

public class OpretLaanerViewModel
{
    [Required(ErrorMessage = "Skriv en e-mail")]
    [EmailAddress(ErrorMessage = "Det er ikke en gyldig e-mail")]
    public string Email { get; set; } = "";

    [Required(ErrorMessage = "Skriv en adgangskode")]
    [DataType(DataType.Password)]
    [Display(Name = "Adgangskode")]
    public string Password { get; set; } = "";

    [DataType(DataType.Password)]
    [Display(Name = "Gentag adgangskode")]
    [Compare("Password", ErrorMessage = "De to adgangskoder er ikke ens")]
    public string GentagPassword { get; set; } = "";
}

// Controllers/BibliotekarController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Bibliotek.Models;

namespace Bibliotek.Controllers;

[Authorize(Roles = "Bibliotekar")]
public class BibliotekarController : Controller
{
    private readonly UserManager<IdentityUser> _userManager;

    public BibliotekarController(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<IActionResult> Index()
    {
        var laanere = await _userManager.GetUsersInRoleAsync("Laaner");
        return View(laanere);
    }

    public IActionResult OpretLaaner()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> OpretLaaner(OpretLaanerViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var bruger = new IdentityUser { UserName = model.Email, Email = model.Email, EmailConfirmed = true };
        var resultat = await _userManager.CreateAsync(bruger, model.Password);
        if (!resultat.Succeeded)
        {
            foreach (var fejl in resultat.Errors)
            {
                ModelState.AddModelError("", fejl.Description);
            }
            return View(model);
        }

        await _userManager.AddToRoleAsync(bruger, "Laaner");
        TempData["Besked"] = $"Låneren {model.Email} er oprettet.";
        return RedirectToAction("Index");
    }
}

// Views/Bibliotekar/Index.cshtml
// @model IList<Microsoft.AspNetCore.Identity.IdentityUser>
// <h1>Bibliotekarens side</h1>
// @if (TempData["Besked"] != null)
// {
//     <div class="alert alert-success">@TempData["Besked"]</div>
// }
// <p><a asp-action="OpretLaaner" class="btn btn-primary">Opret låner</a></p>
// <h2>Lånere (@Model.Count)</h2>
// <ul>
//     @foreach (var l in Model)
//     {
//         <li>@l.Email</li>
//     }
// </ul>

// Views/Bibliotekar/OpretLaaner.cshtml: som OpretBruger.cshtml i lektion 4,
// med felterne Email, Password og GentagPassword og uden dropdown.`,
        ekstra: ["Lav en knap **Slet** ud for hver låner. Brug `FindByIdAsync` og `DeleteAsync` på `UserManager`, og husk `[HttpPost]` og `[ValidateAntiForgeryToken]`."] },
      { t: "opgave", h: "Live opslagstavle med SignalR", projekt: "Bibliotek",
        md: "Bibliotekaren skal kunne slå nyheder op, som dukker op med det samme hos alle, der er logget ind og har opslagstavlen åben — uden at de trykker F5. Kun bibliotekaren må sende nyheder. Opgaven samler hele modulet: login, roller, views efter rolle og SignalR.",
        krav: [
          "`Hubs/NyhedHub.cs` arver fra `Hub` og har `[Authorize]` over klassen",
          "Hubben har metoden `SendNyhed(string tekst)` med `[Authorize(Roles = \"Bibliotekar\")]` over metoden",
          "`SendNyhed` sender `\"NyNyhed\"` til alle med to argumenter: afsenderens navn (fra `Context.User`) og teksten — i den rækkefølge",
          "`AddSignalR` og `MapHub<NyhedHub>(\"/nyhedhub\")` står i `Program.cs`",
          "`signalr.js` er hentet med LibMan til `wwwroot/js/signalr/`",
          "`NyhederController` med `[Authorize]` viser siden **Opslagstavle** med en tom liste `<ul id=\"nyheder\"></ul>` og et menupunkt for alle, der er logget ind",
          "Kun bibliotekaren ser et tekstfelt og en knap **Send nyhed** (brug `User.IsInRole` i viewet)",
          "`wwwroot/js/nyheder.js` forbinder til `/nyhedhub`, lytter på `\"NyNyhed\"` og viser hver nyhed som `{tekst} ({navn})`",
          "Test med bibliotekaren i ét vindue og en låner i et privat vindue: nyheden dukker op begge steder med det samme"
        ],
        tip: [
          "Hubben ligner `ChatHub` i lektion 5. Den eneste nye ting er, at `[Authorize(Roles = \"Bibliotekar\")]` står over **metoden** — så må alle, der er logget ind, forbinde og lytte, men kun bibliotekaren må sende.",
          "Knappen findes kun på bibliotekarens side. I JavaScript: `const sendKnap = document.getElementById(\"sendKnap\"); if (sendKnap) { … }` — så går lånerens side ikke ned.",
          "Rækkefølgen: hubben sender `SendAsync(\"NyNyhed\", navn, tekst)`, så JavaScript skal være `connection.on(\"NyNyhed\", (navn, tekst) => { … })`. Byt om ét sted, og nyheden vises som `{navn} ({tekst})`."
        ],
        output: "Nye krimier på hylden (bibliotekar@bibliotek.dk)",
        fri: true, frag: true,
        loesning: R`// Hubs/NyhedHub.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Bibliotek.Hubs;

[Authorize]
public class NyhedHub : Hub
{
    [Authorize(Roles = "Bibliotekar")]
    public async Task SendNyhed(string tekst)
    {
        string navn = Context.User?.Identity?.Name ?? "Ukendt";
        await Clients.All.SendAsync("NyNyhed", navn, tekst);
    }
}

// Program.cs (udsnit)
using Bibliotek.Hubs;

builder.Services.AddSignalR();
// ...
app.MapHub<NyhedHub>("/nyhedhub");

// Controllers/NyhederController.cs
[Authorize]
public class NyhederController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}

// Views/Nyheder/Index.cshtml
// <h1>Opslagstavle</h1>
// @if (User.IsInRole("Bibliotekar"))
// {
//     <div class="mb-3">
//         <input type="text" id="nyhedInput" class="form-control" placeholder="Skriv en nyhed" />
//         <button type="button" id="sendKnap" class="btn btn-primary mt-2">Send nyhed</button>
//     </div>
// }
// <ul id="nyheder"></ul>
// @section Scripts {
//     <script src="~/js/signalr/dist/browser/signalr.js"></script>
//     <script src="~/js/nyheder.js"></script>
// }

// wwwroot/js/nyheder.js
// const connection = new signalR.HubConnectionBuilder()
//     .withUrl("/nyhedhub")
//     .build();
//
// connection.on("NyNyhed", (navn, tekst) => {
//     const li = document.createElement("li");
//     li.textContent = tekst + " (" + navn + ")";
//     document.getElementById("nyheder").appendChild(li);
// });
//
// const sendKnap = document.getElementById("sendKnap");
// if (sendKnap) {
//     sendKnap.addEventListener("click", async () => {
//         const input = document.getElementById("nyhedInput");
//         try {
//             await connection.invoke("SendNyhed", input.value);
//             input.value = "";
//         } catch (err) {
//             console.error(err.toString());
//         }
//     });
// }
//
// connection.start().catch(err => console.error(err.toString()));`,
        ekstra: [
          "Prøv i lånerens browser: tryk F12, gå til **Console**, og skriv `connection.invoke(\"SendNyhed\", \"snyd\")`. Svaret er en fejl: `Failed to invoke 'SendNyhed' because user is unauthorized`. Attributten på metoden beskytter, selvom knappen er skjult.",
          "Brug `Clients.Others` i stedet for `Clients.All`, og se forskellen i bibliotekarens eget vindue."
        ] },
      { t: "forklar", q: "Forklar som til eksamen: Hvordan sikrer din opslagstavle, at kun bibliotekaren kan sende nyheder, selvom alle lånere er forbundet til samme hub?",
        svar: "Hubben har `[Authorize]` over **klassen**, så kun brugere, der er logget ind, kan forbinde sig og modtage nyheder. Metoden `SendNyhed` har desuden `[Authorize(Roles = \"Bibliotekar\")]`, så SignalR afviser kaldet, hvis afsenderen ikke har rollen — så får browseren fejlen \"user is unauthorized\". At knappen kun vises for bibliotekaren med `User.IsInRole` er kun for brugervenlighedens skyld; det er **attributten på serveren**, der er sikkerheden. Navnet på afsenderen tages fra `Context.User`, altså login-cookien, så ingen kan udgive sig for at være bibliotekaren.",
        noegle: ["[Authorize]", "Roles", "metoden", "Context.User", "IsInRole", "serveren"] }
    ] }
  ]
});
})();
