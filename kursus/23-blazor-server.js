// Modul 23 — Blazor Server med database. Forudsætter: modul 0–22.
// Al Blazor-kode er afprøvet i rigtige projekter (.NET 10 SDK 10.0.112, `dotnet new blazor --interactivity Server
// --all-interactive`, EF Core 10.0.12) med SQLite: KundeApp (lektion 1–6) og VareLager (værkstedet). Siderne er
// klikket igennem i en rigtig browser (Chromium/Playwright): opret med validering, ret, slet med confirm-dialog,
// detaljer, huskeliste og kurv i menuen, søgefelt, to faner med Singleton/Scoped, prerendering (OnInitialized to gange),
// genbrug af sidekomponent (OnParametersSet), NavLink-markering, og fejlbeskederne (manglende :int, manglende service,
// manglende DbContextFactory, JS interop under prerendering, EditForm uden Model, CS0542, for-løkke-fejlen).
// SQL Server-udgaven (UseSqlServer, LocalDB-connection string) er bygget og har fået lavet sin migration,
// men er ikke kørt mod LocalDB (ingen Windows i testmiljøet).
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m23", nr: 23, del: "Del 6 · SPA og Blazor", ikon: "⚡",
  titel: "Blazor Server med database",
  dag: "Kursusdag 20 · SPA med Blazor (Blazor Server)",
  intro: "I modul 22 lærte du, hvad en Blazor-komponent er. Nu bygger du en **rigtig app** med Blazor Server: sider, der henter, opretter, retter og sletter data i en database — uden en eneste controller og uden JavaScript.\n\nGennem hele modulet bygger du **KundeApp**, et lille kunderegister: services med `@inject`, EF Core med en `DbContextFactory`, CRUD-sider med `EditForm`, en menu, ruter med parametre og en huskeliste, der opdaterer menuen med det samme. På Windows bruger du **LocalDB**, på Mac **SQLite**. I værkstedet bygger du selv en ny app, **VareLager**, ud fra krav. Det er præcis den slags app, dit eksamensprojekt kan være.",
  video: ["20_Fre_SPA_With_Blazor.mp4 (3 t 38 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m23l1", titel: "Interactive Server: hvad kører hvor?", min: 18,
    ord: [
      ["Interactive Server", "Render mode, hvor komponenternes C#-kode kører på serveren, og browseren kun viser resultatet. Klik bliver sendt til serveren over en åben forbindelse."],
      ["Circuit", "Serverens hukommelse for én browserfane i Blazor Server: komponent-objekterne og deres felter. Hver fane har sin egen circuit."],
      ["blazor.web.js", "Det lille JavaScript-program, Blazor selv lægger i siden. Det åbner forbindelsen til serveren, sender klik af sted og retter siden, når serveren svarer."],
      ["Prerendering", "Serveren tegner siden som almindelig HTML første gang, så den vises hurtigt. Bagefter bliver komponenten lavet igen, når forbindelsen er oppe."],
      ["Static SSR", "Static server-side rendering: serveren sender færdig HTML, og så er det slut. Knapper med `@onclick` gør ingenting."],
      ["@rendermode", "Bestemmer, hvordan en komponent kører, fx `InteractiveServer`. Kan sættes på én side eller på hele appen."],
      ["Global interaktivitet", "Hele appen er interaktiv, fordi `<Routes @rendermode=\"InteractiveServer\" />` står i `App.razor`. Så slipper man for at skrive `@rendermode` på hver side."]
    ],
    trin: [
      { t: "laes", h: "Hvad sker der, når du klikker på en knap?",
        md: "I modul 22 lærte du, hvad en **Blazor-komponent** er, og du så de fire render modes i overblik. I dette modul bruger du kun **Interactive Server** — det, underviseren kaldte *Blazor Server*. Det er det nemmeste valg til en app med database, for al C#-koden kører på serveren, lige ved siden af databasen. Først skal du vide præcis, **hvad der kører hvor**. Det er et typisk eksamensspørgsmål.\n\nSådan går det til, når du åbner en side og klikker på en knap:\n\n1. Browseren beder om `/counter` med en almindelig HTTP-forespørgsel (modul 16).\n2. Serveren kører komponenten og sender **færdig HTML** tilbage. Siden vises med det samme.\n3. I siden ligger `blazor.web.js`. Det åbner en **WebSocket**-forbindelse til serveren med **SignalR** — samme teknik som chatten i modul 20. Adressen er `ws://localhost:…/_blazor?id=…`. Forbindelsen bliver ved med at være åben.\n4. Du klikker. `blazor.web.js` sender beskeden \"knap nr. X blev klikket\" over forbindelsen.\n5. Serveren kører din C#-metode, fx `IncrementCount`, og tegner komponenten igen **i sin hukommelse**.\n6. Serveren sammenligner den nye udgave med den gamle og sender kun **forskellen**, fx \"teksten i `<p>` er nu 1\".\n7. `blazor.web.js` retter netop den bid af siden. Resten bliver stående.\n\nDin C#-kode bliver altså **aldrig sendt til browseren**. Browseren viser bare HTML og sender klik tilbage.",
        noter: [
          ["HTTP én gang", "Kun det første kald er almindelig HTTP. Resten foregår over den åbne forbindelse."],
          ["SignalR", "Biblioteket fra modul 20. Blazor Server bruger det selv — du skal ikke skrive en hub."],
          ["Forskellen", "Serveren sender ikke hele siden igen, kun det, der er ændret. Derfor føles det hurtigt."]
        ] },
      { t: "valg", q: "En side i Blazor Server har en knap med `@onclick=\"IncrementCount\"`. Hvor kører metoden `IncrementCount`, når brugeren klikker?",
        svar: ["På serveren. Browseren sender klikket over SignalR-forbindelsen, og serveren sender ændringen tilbage", "I browseren, fordi Blazor oversætter C# til JavaScript", "I databasen", "Både i browseren og på serveren, så de passer sammen"],
        ret: 0, fordi: "I **Interactive Server** kører al C# på serveren. Browseren har kun HTML og `blazor.web.js`, som sender klik af sted og retter siden. (I WebAssembly-udgaven, modul 24, kører C# i browseren — det er den store forskel.)" },
      { t: "laes", h: "Circuit: én pr. browserfane",
        md: "Når forbindelsen er åben, holder serveren komponent-objekterne i sin hukommelse — med alle deres felter, fx `currentCount`. Den samling hedder en **circuit**.\n\nHver **browserfane** får sin egen circuit. Åbner du `/counter` i to faner, er der to `Counter`-objekter på serveren med hver sin `currentCount`. Trykker du **F5**, bliver den gamle circuit smidt væk, og du får en ny, hvor alt starter forfra.\n\nFordele og ulemper, som du skal kunne sige til eksamen:\n\n- **+** Koden kan tale direkte med databasen. Der skal ikke laves et Web API imellem.\n- **+** Koden og hemmeligheder som connection strings bliver på serveren.\n- **+** Browseren skal kun hente lidt, så første side kommer hurtigt.\n- **−** Forbindelsen skal være oppe hele tiden. Mister du nettet, kan du ikke klikke.\n- **−** Hver bruger fylder i serverens hukommelse.\n- **−** Hvert klik er en tur frem og tilbage til serveren.",
        md2: "Mister siden forbindelsen, viser skabelonen en boks med teksten **Rejoining the server…**. Den kommer fra filen `Components/Layout/ReconnectModal.razor`." },
      { t: "valg", q: "Du åbner `/counter` i to browserfaner og klikker tre gange i fane 1. Derefter skifter du til fane 2. Hvad står der dér?",
        svar: ["`Current count: 0` — hver fane har sin egen circuit med sit eget Counter-objekt", "`Current count: 3` — alle faner deler den samme tæller", "Fane 2 er gået i stå, fordi fane 1 har forbindelsen", "`Current count: 3`, men først når man trykker F5"],
        ret: 0, fordi: "Hver fane har sin egen forbindelse og sin egen circuit. Feltet `currentCount` hører til **det objekt**, der hører til fane 1. Vil du dele data mellem faner, skal de ligge et sted, som begge kan nå — en service eller en database. Det er emnet for lektion 2 og 3." },
      { t: "forudsig",
        q: "Her er circuits efterlignet med almindelige objekter: hver fane har sit eget `Counter`-objekt. Hvad skriver programmet?",
        kode: R`Counter fane1 = new Counter();
Counter fane2 = new Counter();

fane1.IncrementCount();
fane1.IncrementCount();
fane1.IncrementCount();

Console.WriteLine(fane1.CurrentCount);
Console.WriteLine(fane2.CurrentCount);

class Counter
{
    public int CurrentCount { get; private set; } = 0;

    public void IncrementCount()
    {
        CurrentCount++;
    }
}`,
        output: "3\n0",
        fordi: "To objekter af samme klasse har hver sine felter (modul 4). Det er præcis sådan, to faner opfører sig i Blazor Server: to circuits, to `Counter`-objekter." },
      { t: "laes", h: "Prerendering: komponenten bliver lavet to gange",
        md: "Trin 2 i gennemgangen før var **prerendering**: serveren tegner siden én gang som almindelig HTML, så den vises hurtigt. Når forbindelsen derefter er oppe, laver Blazor **et nyt komponent-objekt** i circuiten, og det er det, du klikker på.\n\nDet har to følger, som du vil møde:\n\n- `OnInitializedAsync` (modul 22) kører **to gange**, når siden indlæses første gang — én gang for HTML'en og én gang i circuiten. Henter metoden fra databasen, sker det altså to gange. Det er normalt.\n- Under prerenderingen findes browseren ikke endnu for serveren. Derfor kan du **ikke kalde JavaScript** fra `OnInitializedAsync` (lektion 6).",
        md2: "Afprøvet: en side, der skriver en linje ud i `OnInitialized`, skrev den **to gange** i terminalen, da siden blev åbnet." },
      { t: "valg", q: "Du skriver `Console.WriteLine(\"Henter kunder\");` i `OnInitializedAsync` på en side. Når du åbner siden, står linjen to gange i terminalen. Hvorfor?",
        svar: ["Prerendering: komponenten bliver lavet én gang for den første HTML og én gang til, når forbindelsen er oppe", "Du har trykket to gange på linket", "Der er en fejl i Blazor, som skal rettes", "Fordi der er to brugere på siden"],
        ret: 0, fordi: "Med prerendering laver serveren først HTML'en, og så laver circuiten komponenten igen. Begge gange kører `OnInitializedAsync`. Det er ikke en fejl, så lad være med at prøve at \"rette\" den." },
      { t: "laes", h: "Global eller pr. side?",
        md: "Når du laver et Blazor-projekt, vælger du, **hvor** interaktiviteten skal gælde:\n\n- **Per page/component** (standard): siderne er Static SSR, medmindre de har `@rendermode InteractiveServer` øverst. Glemmer du linjen, gør knapperne **ingenting** — og der kommer ingen fejlbesked. Afprøvet: `Counter` uden linjen blev ved med at vise 0.\n- **Global**: `App.razor` sætter render mode på hele appen. Så er alle sider interaktive, også menuen.\n\nI KundeApp vælger du **Global**. Alle sider skal alligevel have knapper og formularer, og så kan du ikke glemme linjen. Sådan ser de to vigtige linjer i `App.razor` ud:",
        sprog: "razor", frag: true,
        kode: R`<HeadOutlet @rendermode="InteractiveServer" />
...
<Routes @rendermode="InteractiveServer" />`,
        noter: [
          ["<Routes @rendermode=\"InteractiveServer\" />", "`Routes` er komponenten, der vælger siden ud fra adressen. Er den interaktiv, er alle sider under den det også."],
          ["<HeadOutlet …/>", "Den del af `<head>`, som `<PageTitle>` skriver i. Også interaktiv, så fanens titel følger med."]
        ] },
      { t: "valg", q: "Et projekt er lavet med **Interactivity location: Per page/component**. Du laver en ny side med `@page \"/test\"` og en knap med `@onclick`, men glemmer `@rendermode InteractiveServer`. Hvad sker der, når du klikker?",
        svar: ["Ingenting. Siden er Static SSR, så der er ingen forbindelse, der kan sende klikket — og der kommer ingen fejlbesked", "Programmet går ned med en rød fejl", "Klikket bliver kørt i browseren i stedet", "Compileren nægter at bygge projektet"],
        ret: 0, fordi: "Uden render mode er siden bare HTML. Det er en lumsk fejl, fordi intet fortæller dig, hvad der er galt. Med **Global** interaktivitet, som i KundeApp, kan den ikke ske." },
      { t: "ide", h: "Opret KundeApp",
        md: "Lav projektet, som hele modulet bygger videre på.",
        win: ["**Create a new project** → søg efter **Blazor Web App** → Next.", "Navn: `KundeApp` → Next.", "Framework: **.NET 10.0**. Authentication type: **None**. Fjern fluebenet ved **Configure for HTTPS**.", "**Interactive render mode: Server**. **Interactivity location: Global**. Lad **Include sample pages** have flueben → Create.", "Kør med den grønne pil ▶. Klik på **Counter** i menuen, og klik på knappen et par gange."],
        mac: ["Åbn en terminal i den mappe, hvor dine projekter ligger.", "Skriv `dotnet new blazor -n KundeApp --interactivity Server --all-interactive --no-https` og tryk Enter.", "Åbn mappen `KundeApp` i Rider (**File → Open…**).", "Kør med den grønne pil ▶. Klik på **Counter** i menuen, og klik på knappen et par gange."],
        md2: "Prøv så de tre ting fra lektionen:\n\n1. Åbn `/counter` i en fane mere. Den starter på 0.\n2. Tryk **F5** i den første fane. Tælleren starter forfra: ny circuit.\n3. Stop programmet med den røde firkant, mens siden er åben. Efter et øjeblik kommer boksen **Rejoining the server…**. Start programmet igen, og tryk på **Retry** (eller F5)." },
      { t: "laes", h: "Program.cs i en Blazor-app, linje for linje",
        md: "`Program.cs` ligner den fra MVC (modul 16), men et par linjer er nye. Til eksamen skal du kunne forklare dem alle.",
        kode: R`using KundeApp.Components;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

var app = builder.Build();

// Configure the HTTP request pipeline.
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
        noter: [
          ["AddRazorComponents()", "Registrerer Blazor-komponenterne. Svarer til `AddControllersWithViews()` i MVC."],
          [".AddInteractiveServerComponents()", "Slår Interactive Server til: SignalR-forbindelsen og circuits."],
          ["UseExceptionHandler(\"/Error\", …)", "Kører appen ikke på din egen maskine, vises siden `Error.razor` ved en fejl."],
          ["UseStatusCodePagesWithReExecute(\"/not-found\", …)", "Findes en adresse ikke (404), vises siden `NotFound.razor` i stedet for en tom side."],
          ["UseAntiforgery()", "Beskyttelse mod falske formularer fra andre hjemmesider (modul 20). Blazor kræver linjen."],
          ["MapStaticAssets()", "Gør filerne i `wwwroot` (CSS, billeder) tilgængelige."],
          ["MapRazorComponents<App>()", "`App.razor` er rod-komponenten: hele HTML-siden med `<head>` og `<body>`."],
          [".AddInteractiveServerRenderMode()", "Åbner adressen `/_blazor`, som `blazor.web.js` forbinder sig til."]
        ] },
      { t: "udfyld", frag: true, q: "Udfyld de to linjer i `Program.cs`, der slår Interactive Server til.",
        kode: R`builder.Services.AddRazorComponents()
    .[[AddInteractiveServerComponents]]();
...
app.MapRazorComponents<[[App]]>()
    .[[AddInteractiveServerRenderMode]]();`,
        fordi: "`AddInteractiveServerComponents` registrerer det, der skal til (services). `AddInteractiveServerRenderMode` åbner forbindelsen i pipelinen. `App` er rod-komponenten i `App.razor`." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad sker der, når brugeren klikker på en knap i en Blazor Server-app?",
        svar: "Første gang siden hentes, sender serveren **færdig HTML** (prerendering). Derefter åbner `blazor.web.js` en **SignalR-forbindelse** (WebSocket) til serveren, som bliver ved med at være åben. Når brugeren klikker, sendes klikket over forbindelsen. **Serveren** kører min C#-metode, tegner komponenten igen i sin hukommelse — sin **circuit**, én pr. browserfane — og sender kun **forskellen** tilbage. `blazor.web.js` retter så den del af siden. C#-koden bliver aldrig sendt til browseren.",
        noegle: ["SignalR", "server", "circuit", "forskellen", "HTML"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m23l2", titel: "Services og @inject: komponenten beder om data", min: 20,
    ord: [
      ["@inject", "Linje øverst i en `.razor`-fil, der beder om en service: `@inject ICustomerService CustomerService`. Komponentens svar på konstruktør-injection."],
      ["Service", "Et objekt, som ASP.NET Core laver og deler ud til dem, der beder om det. Registreres i `Program.cs` med `builder.Services.Add…`."],
      ["Levetid (lifetime)", "Hvor længe ét service-objekt lever, og hvem der deler det: Singleton, Scoped eller Transient."],
      ["AddSingleton", "Ét objekt i hele appens levetid. Alle brugere og alle faner deler det."],
      ["AddScoped", "I Blazor Server: ét objekt pr. circuit, altså pr. browserfane. (I MVC var det pr. forespørgsel.)"],
      ["AddTransient", "Et nyt objekt, hver gang nogen beder om servicen."],
      ["_Imports.razor", "Fil med `@using`-linjer, der gælder for alle komponenter i mappen og mapperne under den."]
    ],
    trin: [
      { t: "laes", h: "Hvor skal dataene ligge?",
        md: "Du kunne lægge en `List<Customer>` direkte i `@code` på kundesiden. Men så har hver fane sin egen liste (lektion 1), og den forsvinder ved F5. Og skal flere sider bruge kunderne — listen, opret-siden, ret-siden — har de hver sin kopi.\n\nLøsningen er den samme som i Web API'et i modul 19: dataene ligger i en **service**, bag et **interface**. Komponenterne **beder om** servicen, og ASP.NET Core giver dem den. Det er **dependency injection** (DI).\n\nI Blazor beder en komponent ikke om servicen i en konstruktør. Den skriver en linje øverst i `.razor`-filen:\n\n`@inject ICustomerService CustomerService`\n\nFørst typen (interfacet), så det navn, du vil bruge i komponenten." },
      { t: "laes", h: "Modellen: Customer",
        md: "Først klassen for én kunde. Den ligger i en ny mappe, `Models`. Navnet er engelsk, `Customer`, ligesom hos underviseren — adresserne på siderne bliver danske.",
        kode: R`using System.ComponentModel.DataAnnotations;

namespace KundeApp.Models
{
    public class Customer
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Skriv et navn")]
        [StringLength(60)]
        public string Name { get; set; } = "";

        [Required(ErrorMessage = "Skriv en e-mail")]
        [EmailAddress(ErrorMessage = "Det er ikke en gyldig e-mail")]
        public string Email { get; set; } = "";

        [StringLength(40)]
        public string? City { get; set; }
    }
}`,
        omkring: ["", "class __Start { static void Main() { } }"],
        noter: [
          ["public int Id", "Primærnøglen, når kunderne kommer i databasen (lektion 3)."],
          ["[Required(ErrorMessage = \"Skriv et navn\")]", "Valideringen fra modul 16. `ErrorMessage` er den tekst, brugeren ser. Uden den er beskeden på engelsk."],
          ["[EmailAddress(…)]", "Teksten skal ligne en e-mail-adresse (indeholde et @)."],
          ["string? City", "Byen må være tom (`null`). Spørgsmålstegnet fra modul 7."]
        ] },
      { t: "valg", q: "I `Customer` står `[Required(ErrorMessage = \"Skriv et navn\")]` over `Name`. Hvad gør `ErrorMessage`?",
        svar: ["Det er den tekst, brugeren ser, hvis feltet er tomt, når formularen sendes", "Den skriver en fejl i terminalen, når en kunde oprettes", "Den gør navnet til primærnøgle", "Den gemmer teksten i databasen, hvis navnet mangler"],
        ret: 0, fordi: "`[Required]` siger, at feltet skal udfyldes. `ErrorMessage` er beskeden, der vises i formularen (lektion 4). Uden den skriver .NET en engelsk standardtekst." },
      { t: "udfyld", h: "Interfacet: hvad servicen kan",
        q: "Interfacet (modul 7) siger, **hvad** servicen kan — ikke hvordan. Alle metoder giver en `Task` (modul 8), for senere skal de tale med en database, og så må siden ikke stå og vente. `GetByIdAsync` giver `null`, hvis kunden ikke findes. Udfyld hullerne.",
        kode: R`using KundeApp.Models;

namespace KundeApp.Services
{
    public [[interface]] ICustomerService
    {
        Task<List<Customer>> GetAllAsync();
        Task<[[Customer?]]> GetByIdAsync(int id);
        [[Task]] CreateAsync(Customer customer);
        Task UpdateAsync(Customer customer);
        Task DeleteAsync(int id);
    }
}`,
        omkring: ["", "namespace KundeApp.Models { public class Customer { public int Id { get; set; } public string Name { get; set; } = \"\"; public string Email { get; set; } = \"\"; public string? City { get; set; } } }\nclass __Start { static void Main() { } }"],
        fordi: "`interface` i stedet for `class`. `Customer?` med spørgsmålstegn, fordi der måske ikke er nogen kunde med det id. `CreateAsync` giver ikke noget tilbage, så typen er bare `Task`. Get, Create, Update og Delete er tilsammen **CRUD** (modul 6)." },
      { t: "laes", h: "Første udgave: kunderne i en liste i hukommelsen",
        md: "Den første klasse, der opfylder interfacet, gemmer kunderne i en `List`. Det er nok til at bygge siderne. I lektion 3 kommer en udgave med database — uden at siderne skal ændres.",
        kode: R`using KundeApp.Models;

namespace KundeApp.Services
{
    public class MemoryCustomerService : ICustomerService
    {
        private readonly List<Customer> _customers = new List<Customer>
        {
            new Customer { Id = 1, Name = "Anna Jensen", Email = "anna@mail.dk", City = "Aarhus" },
            new Customer { Id = 2, Name = "Bo Nielsen", Email = "bo@mail.dk", City = "Odense" }
        };
        private int _nextId = 3;

        public Task<List<Customer>> GetAllAsync()
        {
            return Task.FromResult(_customers.ToList());
        }

        public Task<Customer?> GetByIdAsync(int id)
        {
            return Task.FromResult(_customers.FirstOrDefault(c => c.Id == id));
        }

        public Task CreateAsync(Customer customer)
        {
            customer.Id = _nextId++;
            _customers.Add(customer);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(Customer customer)
        {
            return Task.CompletedTask;
        }

        public Task DeleteAsync(int id)
        {
            _customers.RemoveAll(c => c.Id == id);
            return Task.CompletedTask;
        }
    }
}`,
        omkring: ["", "namespace KundeApp.Models { public class Customer { public int Id { get; set; } public string Name { get; set; } = \"\"; public string Email { get; set; } = \"\"; public string? City { get; set; } } }\nnamespace KundeApp.Services { public interface ICustomerService { Task<List<KundeApp.Models.Customer>> GetAllAsync(); Task<KundeApp.Models.Customer?> GetByIdAsync(int id); Task CreateAsync(KundeApp.Models.Customer customer); Task UpdateAsync(KundeApp.Models.Customer customer); Task DeleteAsync(int id); } }\nclass __Start { static void Main() { } }"],
        noter: [
          [": ICustomerService", "Klassen lover at have alle interfacets metoder."],
          ["Task.FromResult(…)", "Laver en færdig `Task` med et resultat. Listen svarer med det samme, men skal stadig give en `Task`, fordi interfacet siger det."],
          ["_customers.ToList()", "En **kopi** af listen. Så kan en side ikke komme til at ændre servicens egen liste."],
          ["FirstOrDefault(c => c.Id == id)", "LINQ fra modul 9: den første med det id — eller `null`."],
          ["customer.Id = _nextId++;", "Giv kunden det næste nummer, og tæl op bagefter. Et nummer bliver aldrig brugt to gange."],
          ["UpdateAsync gør ingenting", "Siden retter i selve `Customer`-objektet, som allerede ligger i listen. Med en database (lektion 3) skal ændringen gemmes."],
          ["Task.CompletedTask", "En færdig `Task` uden resultat."]
        ] },
      { t: "forudsig",
        q: "Programmet bruger `MemoryCustomerService` fra forrige trin (med Anna som nr. 1 og Bo som nr. 2). Hvad skriver det?",
        kode: R`using KundeApp.Models;
using KundeApp.Services;

var service = new MemoryCustomerService();
await service.CreateAsync(new Customer { Name = "Carl Holm", Email = "carl@mail.dk" });
await service.DeleteAsync(1);

var alle = await service.GetAllAsync();
foreach (var c in alle)
{
    Console.WriteLine($"{c.Id}: {c.Name}");
}`,
        omkring: ["", "namespace KundeApp.Models { public class Customer { public int Id { get; set; } public string Name { get; set; } = \"\"; public string Email { get; set; } = \"\"; public string? City { get; set; } } }\nnamespace KundeApp.Services { public class MemoryCustomerService { private readonly List<KundeApp.Models.Customer> _customers = new List<KundeApp.Models.Customer> { new KundeApp.Models.Customer { Id = 1, Name = \"Anna Jensen\", Email = \"anna@mail.dk\", City = \"Aarhus\" }, new KundeApp.Models.Customer { Id = 2, Name = \"Bo Nielsen\", Email = \"bo@mail.dk\", City = \"Odense\" } }; private int _nextId = 3;\n public Task<List<KundeApp.Models.Customer>> GetAllAsync() { return Task.FromResult(_customers.ToList()); }\n public Task CreateAsync(KundeApp.Models.Customer customer) { customer.Id = _nextId++; _customers.Add(customer); return Task.CompletedTask; }\n public Task DeleteAsync(int id) { _customers.RemoveAll(c => c.Id == id); return Task.CompletedTask; } } }"],
        output: "2: Bo Nielsen\n3: Carl Holm",
        fordi: "Carl får nummer 3, fordi `_nextId` starter på 3. Anna (nr. 1) bliver slettet. Tilbage er Bo og Carl, i den rækkefølge de blev lagt i listen." },
      { t: "laes", h: "Levetider i Blazor Server",
        md: "Når du registrerer en service, vælger du dens **levetid**. Du kender de tre fra modul 19, men i Blazor Server betyder **Scoped** noget andet, for der er ingen forespørgsel pr. klik — kun én circuit pr. fane.\n\n- `AddSingleton`: **ét objekt** til hele appen. Alle faner og alle brugere deler det.\n- `AddScoped`: **ét objekt pr. circuit**, altså pr. browserfane. Lever, til fanen lukkes eller genindlæses.\n- `AddTransient`: **et nyt objekt** hver gang, nogen beder om det.\n\nFor `MemoryCustomerService` er valget vigtigt. Afprøvet med to faner:\n\n- Med **Singleton** så fane 2 den kunde, der blev oprettet i fane 1.\n- Med **Scoped** så fane 2 den **ikke**. Hver fane havde sin egen liste.",
        md2: "Pas på med Singleton til data, der hører til **én** bruger, fx en indkøbskurv: så ser alle brugere hinandens kurv. Det, der hører til én fane, skal være Scoped (lektion 6)." },
      { t: "spor",
        q: "Klassen er bare `class Liste { public int Antal; }`. `faelles` spiller Singleton-servicen, som alle faner deler. `fane1` og `fane2` spiller hver fanes egen Scoped-service. Begge faner opretter én kunde i hver af deres lister.",
        kode: R`Liste faelles = new Liste();
Liste fane1 = new Liste();
Liste fane2 = new Liste();
faelles.Antal++;
fane1.Antal++;
faelles.Antal++;
fane2.Antal++;`,
        omkring: ["", "class Liste { public int Antal; }"],
        kolonner: ["faelles.Antal", "fane1.Antal", "fane2.Antal"],
        raekker: [[1, "=0", "=–", "=–"], [2, "=0", "=0", "=–"], [3, "0", "0", "0"], [4, "1", "0", "0"], [5, "1", "1", "0"], [6, "2", "1", "0"], [7, "2", "1", "1"]],
        fordi: "Den fælles liste ender med **2** — begge fanernes kunder. Hver Scoped-liste har kun **1**, sin egen fanes. Derfor skal `MemoryCustomerService` være Singleton, hvis alle skal se de samme kunder." },
      { t: "valg", q: "KundeApp gemmer kunderne i `MemoryCustomerService`. Alle, der åbner appen, skal se de samme kunder. Hvilken registrering skal stå i `Program.cs`?",
        svar: ["`builder.Services.AddSingleton<ICustomerService, MemoryCustomerService>();`", "`builder.Services.AddScoped<ICustomerService, MemoryCustomerService>();`", "`builder.Services.AddTransient<ICustomerService, MemoryCustomerService>();`", "Ingen — `@inject` laver selv objektet"],
        ret: 0, fordi: "Singleton giver ét objekt med én liste til alle. Med Scoped får hver fane sin egen liste. Med Transient får hver komponent sin egen — så kan opret-siden ikke engang se, hvad listesiden har. `@inject` laver ikke noget selv: servicen skal være registreret." },
      { t: "laes", h: "Registrér servicen, og brug den på en side",
        md: "To ting skal til. Først registreringen i `Program.cs`, **før** `builder.Build()`:\n\n`builder.Services.AddSingleton<ICustomerService, MemoryCustomerService>();`\n\nLæs den som: \"Når nogen beder om en `ICustomerService`, så giv dem den ene `MemoryCustomerService`.\" Øverst i `Program.cs` skal der også stå `using KundeApp.Services;`.\n\nSå siden. Lav mappen `Components/Pages/Customers`, og læg filen `CustomerList.razor` i den. Knappen **Tilføj testkunde** er der kun, så du kan afprøve levetiderne. Den forsvinder i lektion 4.",
        sprog: "razor", frag: true,
        kode: R`@page "/kunder"
@inject ICustomerService CustomerService

<PageTitle>Kunder</PageTitle>

<h1>Kunder</h1>

<button class="btn btn-secondary mb-3" @onclick="TilfoejTest">Tilføj testkunde</button>

@if (customers == null)
{
    <p><em>Henter kunder …</em></p>
}
else
{
    <table class="table">
        <thead>
            <tr>
                <th>Nr.</th>
                <th>Navn</th>
                <th>E-mail</th>
                <th>By</th>
            </tr>
        </thead>
        <tbody>
            @foreach (var c in customers)
            {
                <tr>
                    <td>@c.Id</td>
                    <td>@c.Name</td>
                    <td>@c.Email</td>
                    <td>@c.City</td>
                </tr>
            }
        </tbody>
    </table>
}

@code {
    private List<Customer>? customers;

    protected override async Task OnInitializedAsync()
    {
        customers = await CustomerService.GetAllAsync();
    }

    private async Task TilfoejTest()
    {
        await CustomerService.CreateAsync(new Customer { Name = "Test", Email = "test@mail.dk" });
        customers = await CustomerService.GetAllAsync();
    }
}`,
        noter: [
          ["@inject ICustomerService CustomerService", "Bed om servicen. Bagefter kan hele komponenten skrive `CustomerService.…`."],
          ["List<Customer>? customers", "Starter som `null`: \"ikke hentet endnu\"."],
          ["@if (customers == null)", "Første gang komponenten tegnes, er dataene måske ikke kommet. Så vises \"Henter kunder …\"."],
          ["OnInitializedAsync", "Livscyklus-metoden fra modul 22: kører, når komponenten bliver lavet. Her hentes kunderne."],
          ["TilfoejTest", "Opretter en kunde og henter listen igen. Blazor tegner siden igen af sig selv efter et klik."]
        ],
        md2: "Siden bruger `Customer` og `ICustomerService`, som ligger i andre namespaces. I stedet for `@using` øverst i hver `.razor`-fil skriver du to linjer **én gang** nederst i `Components/_Imports.razor`:\n\n`@using KundeApp.Models`\n\n`@using KundeApp.Services`\n\nLinjerne i `_Imports.razor` gælder for alle komponenter i `Components` og mapperne under den." },
      { t: "udfyld", frag: true, q: "Udfyld: registrér servicen i `Program.cs`, og bed om den på en side.",
        kode: R`// Program.cs
builder.Services.[[AddSingleton]]<ICustomerService, [[MemoryCustomerService]]>();

// CustomerList.razor
@page "/kunder"
[[@inject]] ICustomerService CustomerService`,
        fordi: "`AddSingleton<interface, klasse>` registrerer. `@inject type navn` beder om den i en komponent." },
      { t: "valg", q: "Du åbner `/kunder` og får fejlen: *There is no registered service of type 'KundeApp.Services.ICustomerService'*. Hvad mangler?",
        svar: ["Linjen `builder.Services.AddSingleton<ICustomerService, MemoryCustomerService>();` i `Program.cs`", "`@using KundeApp.Services` i `_Imports.razor`", "En konstruktør i `CustomerList.razor`", "`@page \"/kunder\"` øverst i siden"],
        ret: 0, fordi: "Afprøvet: uden registreringen stopper siden med præcis den fejl: *Cannot provide a value for property 'CustomerService' … There is no registered service of type …*. `@inject` kan kun give det, der er registreret. (Mangler `@using`, får du i stedet en rød compilerfejl, før programmet overhovedet starter.)" },
      { t: "ide", h: "Byg servicen og kundelisten",
        md: "Byg videre på KundeApp. Skriv koden selv.",
        win: ["Højreklik på projektet → **Add → New Folder** → `Models`. Højreklik på `Models` → **Add → Class…** → `Customer.cs`. Skriv klassen fra trin 2.", "Lav mappen `Services` med `ICustomerService.cs` (**Add → New Item… → Interface**) og `MemoryCustomerService.cs`.", "Tilføj de to `@using`-linjer nederst i `Components/_Imports.razor`.", "Tilføj registreringen med `AddSingleton` i `Program.cs` under `AddInteractiveServerComponents()`, og `using KundeApp.Services;` øverst.", "Højreklik på `Components/Pages` → **Add → New Folder** → `Customers`. Højreklik på den → **Add → Razor Component…** → `CustomerList.razor`. Skriv siden fra trin 10.", "Kør, og gå til `/kunder` i adresselinjen."],
        mac: ["Højreklik på projektet → **Add → Directory** → `Models`. Højreklik på `Models` → **Add → Class/Interface** → `Customer`. Skriv klassen fra trin 2.", "Lav mappen `Services` med interfacet `ICustomerService` og klassen `MemoryCustomerService`.", "Tilføj de to `@using`-linjer nederst i `Components/_Imports.razor`.", "Tilføj registreringen med `AddSingleton` i `Program.cs` under `AddInteractiveServerComponents()`, og `using KundeApp.Services;` øverst.", "Lav mappen `Components/Pages/Customers`. Højreklik på den → **Add → File**, og kald filen `CustomerList.razor`. Skriv siden fra trin 10.", "Kør, og gå til `/kunder` i adresselinjen."],
        md2: "Afprøv levetiderne:\n\n1. Åbn `/kunder` i to faner. Klik **Tilføj testkunde** i fane 1. Tryk F5 i fane 2: Test er der (Singleton).\n2. Stop programmet. Ret `AddSingleton` til `AddScoped`, og kør igen. Gentag. Nu ser fane 2 **ikke** kunden fra fane 1.\n3. Ret tilbage til `AddSingleton`.\n\nVil du se det med dine egne øjne: sæt et breakpoint i `CreateAsync` (klik i margenen), og start med debuggeren (Visual Studio: F5 · Rider: den grønne bille). Når du klikker på knappen, stopper programmet, og du kan se `_customers` og `_nextId` i **Locals** (Visual Studio) / **Threads & Variables** (Rider)." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på `AddSingleton` og `AddScoped` i en Blazor Server-app, og hvornår bruger du hvilken?",
        svar: "Begge registrerer en **service**, som komponenter kan få med `@inject`. **Singleton** giver **ét objekt til hele appen**, som alle brugere og faner deler — fx en liste i hukommelsen, som alle skal se. **Scoped** giver i Blazor Server **ét objekt pr. circuit**, altså pr. browserfane, så det passer til ting, der hører til én bruger, fx en kurv. I MVC betød Scoped ét objekt pr. forespørgsel; i Blazor Server lever det, så længe fanen er åben.",
        noegle: ["@inject", "ét objekt", "circuit", "fane", "dele"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m23l3", titel: "EF Core i Blazor: DbContextFactory og en service", min: 20,
    ord: [
      ["IDbContextFactory", "En fabrik, der laver nye DbContext-objekter. Man beder om den med DI og kalder `CreateDbContext()`, hver gang man skal bruge databasen."],
      ["AddDbContextFactory", "Registrerer fabrikken i `Program.cs`. Microsofts anbefaling til EF Core i Blazor Server."],
      ["CreateDbContext", "Laver en ny, kortlivet DbContext. Den skal lukkes igen, når man er færdig — med `using`."],
      ["using var", "Kort form af `using`-blokken fra modul 9: objektet bliver lukket (`Dispose`), når metoden slutter."],
      ["Kortlivet", "Lever kun kort: her én databaseoperation. Det modsatte er en DbContext, der lever, så længe fanen er åben."],
      ["ToListAsync", "EF Cores asynkrone udgave af `ToList()`: henter rækkerne uden at blokere tråden, mens databasen svarer."],
      ["FindAsync", "Finder én række ud fra primærnøglen. Giver `null`, hvis den ikke findes."]
    ],
    trin: [
      { t: "laes", h: "Hvorfor ikke bare AddDbContext som i MVC?",
        md: "I modul 17 registrerede du databaseklassen med `AddDbContext`. Den er **Scoped**: i MVC får hver forespørgsel sin egen DbContext, som bliver smidt væk, når siden er sendt. Den lever et splitsekund.\n\nI Blazor Server betyder Scoped **pr. circuit** (lektion 2). Så ville én DbContext leve, **så længe fanen er åben** — måske i timer. Det giver to problemer:\n\n- En DbContext husker alle de objekter, den har hentet. Den vokser, og den kan vise gamle data, som en anden har rettet i mellemtiden.\n- En DbContext kan kun lave **én ting ad gangen**. Laver to dele af siden et databasekald samtidig, stopper programmet med fejlen *A second operation was started on this context instance before a previous operation completed*.\n\nMicrosofts anbefaling til Blazor Server er derfor en **DbContextFactory**: en fabrik, der laver en **ny, kortlivet** DbContext til hver operation. Den bliver lukket, så snart operationen er færdig.",
        md2: "Underviseren brugte `AddDbContext` i sin Blazor-app, og det virker også i en lille app med én bruger. Men fabrikken er den sikre vej, og du kan forklare hvorfor — det giver point til eksamen." },
      { t: "valg", q: "Hvorfor bruger man `AddDbContextFactory` i stedet for `AddDbContext` i Blazor Server?",
        svar: ["Fordi Scoped i Blazor Server betyder pr. circuit, så én DbContext ville leve, mens fanen er åben. Fabrikken laver en ny, kortlivet DbContext til hver operation", "Fordi `AddDbContext` ikke findes i Blazor-projekter", "Fordi fabrikken gør databasen hurtigere at oprette", "Fordi SQLite kræver det"],
        ret: 0, fordi: "Det handler om **levetid**. En DbContext skal leve kort og kun lave én ting ad gangen. I MVC sørger forespørgslen for det. I Blazor Server sørger du selv for det med fabrikken." },
      { t: "laes", h: "Pakker, connection string og databaseklasse",
        md: "Det her kender du fra modul 17. Kort:\n\n1. Installér pakkerne, version `10.0.12`. **Windows** (Package Manager Console): `Microsoft.EntityFrameworkCore.SqlServer`, `.Tools` og `.Design`. **Mac** (Terminal i Rider): `Microsoft.EntityFrameworkCore.Sqlite`, `.Tools` og `.Design` med `dotnet add package … --version 10.0.12`.\n2. Tilføj connection stringen i `appsettings.json` efter `\"AllowedHosts\": \"*\",`. Windows: `\"ConnectionStrings\": { \"KundeContext\": \"Server=(localdb)\\\\MSSQLLocalDB;Database=KundeAppDB;Trusted_Connection=True;TrustServerCertificate=True\" }`. Mac: `\"ConnectionStrings\": { \"KundeContext\": \"Data Source=kunder.db\" }`.\n3. Lav mappen `Data` med databaseklassen. Startdataene med `HasData` er de samme to kunder som i `MemoryCustomerService`:",
        kode: R`using KundeApp.Models;
using Microsoft.EntityFrameworkCore;

namespace KundeApp.Data
{
    public class KundeContext : DbContext
    {
        public KundeContext(DbContextOptions<KundeContext> options) : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>().HasData(
                new Customer { Id = 1, Name = "Anna Jensen", Email = "anna@mail.dk", City = "Aarhus" },
                new Customer { Id = 2, Name = "Bo Nielsen", Email = "bo@mail.dk", City = "Odense" });
        }
    }
}`,
        frag: true,
        noter: [
          ["class KundeContext : DbContext", "Databaseklassen arver fra EF Cores `DbContext` (modul 17)."],
          [": base(options)", "Send indstillingerne (hvilken database) videre til `DbContext`."],
          ["DbSet<Customer> Customers", "Tabellen `Customers`."],
          ["HasData(…)", "Startdata, der kommer med i migrationen. Id'erne skal skrives med."]
        ],
        md2: "Husk de **to** omvendte skråstreger i `(localdb)\\\\MSSQLLocalDB` i JSON (modul 17)." },
      { t: "laes", h: "Program.cs: fabrikken og den nye service",
        md: "I `Program.cs` registrerer du **fabrikken** i stedet for selve DbContext'en, og du skifter `MemoryCustomerService` ud med en ny klasse, `CustomerService`, som du skriver om lidt. Den nye service er **Scoped**: én pr. fane. Det er fint, for den gemmer ingen data selv — dataene ligger i databasen.",
        kode: R`using KundeApp.Components;
using KundeApp.Data;
using KundeApp.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

builder.Services.AddDbContextFactory<KundeContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("KundeContext")));
builder.Services.AddScoped<ICustomerService, CustomerService>();

var app = builder.Build();`,
        frag: true,
        noter: [
          ["AddDbContextFactory<KundeContext>(…)", "Registrerer en fabrik, der kan lave `KundeContext`-objekter. Indstillingerne er de samme som med `AddDbContext`."],
          ["options.UseSqlServer(…)", "Windows/LocalDB. **Mac:** `options.UseSqlite(…)`."],
          ["GetConnectionString(\"KundeContext\")", "Navnet skal staves præcis som i `appsettings.json`."],
          ["AddScoped<ICustomerService, CustomerService>()", "Linjen, der før sagde `AddSingleton<ICustomerService, MemoryCustomerService>()`. **Det er den eneste linje, der skifter** — siderne beder stadig bare om en `ICustomerService`."],
          ["Resten af filen", "Uændret fra lektion 1."]
        ] },
      { t: "udfyld", frag: true, q: "Registrér fabrikken til `KundeContext` med SQL Server og servicen `CustomerService` som Scoped.",
        kode: R`builder.Services.[[AddDbContextFactory]]<KundeContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("KundeContext")));
builder.Services.[[AddScoped]]<ICustomerService, [[CustomerService]]>();`,
        fordi: "`AddDbContextFactory` registrerer fabrikken. `AddScoped<interface, klasse>` registrerer servicen. På Mac står der `UseSqlite`." },
      { t: "laes", h: "CustomerService: CRUD med en kortlivet DbContext",
        md: "Servicen beder om **fabrikken** i sin konstruktør — almindelig konstruktør-injection som i modul 17 og 19, for en service er en almindelig klasse, ikke en komponent. Hver metode laver sin egen DbContext, bruger den og lukker den.",
        kode: R`using KundeApp.Data;
using KundeApp.Models;
using Microsoft.EntityFrameworkCore;

namespace KundeApp.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly IDbContextFactory<KundeContext> _factory;

        public CustomerService(IDbContextFactory<KundeContext> factory)
        {
            _factory = factory;
        }

        public async Task<List<Customer>> GetAllAsync()
        {
            using var db = _factory.CreateDbContext();
            return await db.Customers.OrderBy(c => c.Name).ToListAsync();
        }

        public async Task<Customer?> GetByIdAsync(int id)
        {
            using var db = _factory.CreateDbContext();
            return await db.Customers.FindAsync(id);
        }

        public async Task CreateAsync(Customer customer)
        {
            using var db = _factory.CreateDbContext();
            db.Customers.Add(customer);
            await db.SaveChangesAsync();
        }

        public async Task UpdateAsync(Customer customer)
        {
            using var db = _factory.CreateDbContext();
            db.Customers.Update(customer);
            await db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            using var db = _factory.CreateDbContext();
            var customer = await db.Customers.FindAsync(id);
            if (customer != null)
            {
                db.Customers.Remove(customer);
                await db.SaveChangesAsync();
            }
        }
    }
}`,
        frag: true,
        noter: [
          ["IDbContextFactory<KundeContext> factory", "Servicen beder om fabrikken, ikke om en DbContext."],
          ["using var db = _factory.CreateDbContext();", "Lav en ny DbContext. `using var` lukker den, når metoden er færdig — også hvis der sker en fejl."],
          ["OrderBy(c => c.Name).ToListAsync()", "LINQ (modul 9), som EF Core laver om til `SELECT … ORDER BY Name`. `ToListAsync` venter på databasen uden at blokere."],
          ["FindAsync(id)", "Find rækken med den primærnøgle. `null`, hvis den ikke findes."],
          ["Add + SaveChangesAsync", "`Add` husker kun, at kunden skal indsættes. Først `SaveChangesAsync` sender `INSERT` til databasen og giver kunden sit `Id`."],
          ["Update(customer)", "Kunden kommer fra en anden DbContext (den, der hentede den). `Update` siger: \"gem alle felterne på denne kunde\"."],
          ["if (customer != null)", "Findes kunden ikke, er der intet at slette. Så sker der ingenting."]
        ] },
      { t: "forudsig",
        q: "`using var` lukker objektet, når metoden slutter. Her er en falsk database, der skriver, når den åbnes og lukkes. Hvad skriver programmet?",
        kode: R`Hent();
Console.WriteLine("Færdig");

void Hent()
{
    using var db = new FalskDb();
    Console.WriteLine("Henter kunder");
}

class FalskDb : IDisposable
{
    public FalskDb()
    {
        Console.WriteLine("Åbner forbindelse");
    }

    public void Dispose()
    {
        Console.WriteLine("Lukker forbindelse");
    }
}`,
        output: "Åbner forbindelse\nHenter kunder\nLukker forbindelse\nFærdig",
        fordi: "Konstruktøren kører ved `new`. Så skriver metoden sin linje. Når metoden slutter, kalder `using var` automatisk `Dispose`. Først derefter er man tilbage i hovedprogrammet. Det er præcis det, der sker med hver DbContext i `CustomerService`." },
      { t: "orden", frag: true, q: "Sæt linjerne i `DeleteAsync` i rækkefølge: lav en DbContext, find kunden, og slet den, hvis den findes.",
        linjer: [R`public async Task DeleteAsync(int id)`, R`{`, R`    using var db = _factory.CreateDbContext();`, R`    var customer = await db.Customers.FindAsync(id);`, R`    if (customer != null)`, R`    {`, R`        db.Customers.Remove(customer);`, R`        await db.SaveChangesAsync();`, R`    }`, R`}`],
        fordi: "Først en DbContext, så kan du finde kunden. `Remove` markerer den til sletning, og `SaveChangesAsync` sender `DELETE` til databasen. Begge dele skal ske inde i `if`, for `Remove(null)` giver en fejl." },
      { t: "udfyld", frag: true, q: "Udfyld `GetAllAsync`, så den laver en ny DbContext og henter alle kunder sorteret efter navn.",
        kode: R`public async Task<List<Customer>> GetAllAsync()
{
    using var db = _factory.[[CreateDbContext]]();
    return [[await]] db.Customers.OrderBy(c => c.Name).[[ToListAsync]]();
}`,
        fordi: "`CreateDbContext()` laver den kortlivede DbContext. `ToListAsync()` giver en `Task`, og `await` venter på den uden at blokere." },
      { t: "valg", q: "Du har skiftet til `CustomerService` men glemt linjen med `AddDbContextFactory`. Hvad sker der, når du starter appen?",
        svar: ["Appen stopper ved start: *Unable to resolve service for type 'IDbContextFactory<KundeContext>' while attempting to activate 'CustomerService'*", "Kundelisten bliver bare tom", "Siderne bruger automatisk `MemoryCustomerService` i stedet", "Det virker, fordi `CustomerService` selv laver databasen"],
        ret: 0, fordi: "Afprøvet. `CustomerService` beder om en fabrik i sin konstruktør, men ingen har registreret en. Når appen kører i Development, tjekker ASP.NET Core alle registreringer ved start og stopper med det samme. Læs fejlen bagfra: \"while attempting to activate CustomerService\" fortæller, **hvem** der manglede noget, og \"IDbContextFactory\" fortæller **hvad**." },
      { t: "ide", h: "Flyt kunderne ned i databasen",
        md: "Skift KundeApp over på EF Core.",
        win: ["Installér de tre pakker fra trin 3 i **Tools → NuGet Package Manager → Package Manager Console**: `Install-Package Microsoft.EntityFrameworkCore.SqlServer -Version 10.0.12` og tilsvarende `.Tools` og `.Design`.", "Tilføj connection stringen til LocalDB i `appsettings.json`.", "Lav mappen `Data` med `KundeContext.cs` fra trin 3.", "Lav `Services/CustomerService.cs` fra trin 6.", "Ret `Program.cs` som i trin 4. Lad `MemoryCustomerService.cs` blive liggende — den bliver bare ikke brugt.", "I Package Manager Console: `Add-Migration Init` og derefter `Update-Database`.", "Kør, og gå til `/kunder`."],
        mac: ["Installér de tre pakker fra trin 3 i Riders **Terminal**: `dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 10.0.12` og tilsvarende `.Tools` og `.Design`.", "Tilføj connection stringen `Data Source=kunder.db` i `appsettings.json`.", "Lav mappen `Data` med `KundeContext` fra trin 3.", "Lav `Services/CustomerService` fra trin 6.", "Ret `Program.cs` som i trin 4, men med `UseSqlite`. Lad `MemoryCustomerService` blive liggende — den bliver bare ikke brugt.", "Har du ikke `dotnet-ef` fra modul 17: `dotnet new tool-manifest` og `dotnet tool install dotnet-ef --version 10.0.12`.", "I Terminal: `dotnet ef migrations add Init` og derefter `dotnet ef database update`.", "Kør, og gå til `/kunder`."],
        md2: "Listen viser Anna Jensen og Bo Nielsen — nu fra databasen, sorteret efter navn. Klik **Tilføj testkunde**, stop programmet, og start det igen: Test er der stadig. Med `MemoryCustomerService` forsvandt den.\n\nLæg mærke til, at du **ikke** rørte `CustomerList.razor`. Siden kender kun interfacet. Det er **D'et i SOLID** (dependency inversion) i praksis: siden afhænger af en abstraktion, ikke af en bestemt klasse." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvordan bruger din Blazor Server-app databasen, og hvorfor bruger du en DbContextFactory?",
        svar: "Siderne beder om en `ICustomerService` med `@inject`. Den rigtige klasse, `CustomerService`, er registreret som **Scoped** i `Program.cs` og får en **IDbContextFactory** gennem sin konstruktør. Hver metode laver en **ny, kortlivet** DbContext med `CreateDbContext()` og lukker den med `using`. Det gør jeg, fordi Scoped i Blazor Server betyder **pr. circuit**: en almindelig DbContext ville leve, så længe fanen er åben, vokse, vise gamle data og gå ned, hvis to operationer kører samtidig. Fordi siderne kun kender interfacet, kunne jeg skifte fra en liste i hukommelsen til databasen ved at ændre én linje.",
        noegle: ["@inject", "interface", "DbContextFactory", "kortlivet", "circuit", "using"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m23l4", titel: "CRUD-sider: opret, ret og slet", min: 22,
    ord: [
      ["EditForm", "Blazors formular-komponent. Den holder styr på modellen og valideringen og kalder din metode, når formularen sendes."],
      ["OnValidSubmit", "Den metode, EditForm kalder, når formularen sendes **og** alt er gyldigt."],
      ["DataAnnotationsValidator", "Komponent inde i EditForm, der tjekker attributterne på modellen (`[Required]`, `[EmailAddress]` …)."],
      ["ValidationSummary", "Viser alle fejlbeskeder samlet. `ValidationMessage` viser beskeden for ét felt."],
      ["InputText", "Blazors tekstfelt til en EditForm. Bindes med `@bind-Value`. Til tal: `InputNumber`."],
      ["@bind-Value", "To-vejs-binding mellem et Input-felt og en property på modellen."],
      ["NavigationManager", "Service, der kan skifte side fra C#-kode: `Navigation.NavigateTo(\"/kunder\")`."],
      ["[Parameter]", "Markerer en property, som udefra kan få en værdi — fra en forældrekomponent eller fra adressen."]
    ],
    trin: [
      { t: "laes", h: "Fire sider, én service",
        md: "Kunderne skal kunne oprettes, ses, rettes og slettes — CRUD. I MVC var det én controller med mange actions. I Blazor er hver side **sin egen komponent** med sin egen adresse, og de bruger alle den samme `ICustomerService`:\n\n- `/kunder` — `CustomerList.razor`: listen, med knapper til ret og slet (Read, Delete)\n- `/kunder/ny` — `CreateCustomer.razor`: formular til en ny kunde (Create)\n- `/kunder/ret/3` — `EditCustomer.razor`: formular med kunde 3 udfyldt (Update)\n- `/kunder/3` — `CustomerDetails.razor`: én kunde (Read) — i lektion 5\n\nAlle fire filer ligger i `Components/Pages/Customers`. Siden snakker med servicen, servicen snakker med databasen. Siden ved intet om SQL." },
      { t: "laes", h: "Opret-siden med EditForm",
        md: "En formular i Blazor er komponenten `EditForm`. Den får et objekt at fylde ud (`Model`) og en metode at kalde, når alt er gyldigt (`OnValidSubmit`). Felterne er **Input-komponenter**, som er bundet til modellens properties. Ingen `<form method=\"post\">`, ingen controller: når der klikkes, kører metoden på serveren over forbindelsen.",
        sprog: "razor", frag: true,
        kode: R`@page "/kunder/ny"
@inject ICustomerService CustomerService
@inject NavigationManager Navigation

<PageTitle>Ny kunde</PageTitle>

<h1>Ny kunde</h1>

<EditForm Model="customer" OnValidSubmit="Gem">
    <DataAnnotationsValidator />
    <ValidationSummary />

    <div class="mb-3">
        <label>Navn</label>
        <InputText class="form-control" @bind-Value="customer.Name" />
        <ValidationMessage For="() => customer.Name" />
    </div>
    <div class="mb-3">
        <label>E-mail</label>
        <InputText class="form-control" @bind-Value="customer.Email" />
        <ValidationMessage For="() => customer.Email" />
    </div>
    <div class="mb-3">
        <label>By</label>
        <InputText class="form-control" @bind-Value="customer.City" />
    </div>

    <button type="submit" class="btn btn-primary">Opret</button>
    <a class="btn btn-secondary" href="kunder">Tilbage</a>
</EditForm>

@code {
    private Customer customer = new Customer();

    private async Task Gem()
    {
        await CustomerService.CreateAsync(customer);
        Navigation.NavigateTo("/kunder");
    }
}`,
        noter: [
          ["@inject NavigationManager Navigation", "En service, som Blazor selv har registreret. Den kan skifte side fra C#."],
          ["<EditForm Model=\"customer\" OnValidSubmit=\"Gem\">", "Formularen fylder objektet `customer` ud. Er alt gyldigt, når der klikkes på submit-knappen, kaldes `Gem`."],
          ["<DataAnnotationsValidator />", "Slår valideringen til: `[Required]`, `[EmailAddress]` og `[StringLength]` fra `Customer`. Uden den bliver intet tjekket."],
          ["<ValidationSummary />", "Alle fejlbeskeder samlet øverst."],
          ["<InputText … @bind-Value=\"customer.Name\" />", "Tekstfeltet og `customer.Name` følges ad begge veje. Skriver brugeren, ændres propertyen."],
          ["<ValidationMessage For=\"() => customer.Name\" />", "Fejlbeskeden for netop dét felt, lige under det. Lambdaen peger på propertyen."],
          ["<button type=\"submit\">", "Sender formularen. EditForm validerer først."],
          ["private Customer customer = new Customer();", "Et tomt objekt, som formularen fylder ud. `Id` er 0, indtil databasen giver det et nummer."],
          ["Navigation.NavigateTo(\"/kunder\")", "Gå til listen, når kunden er gemt. Svarer til `RedirectToAction` i MVC."]
        ] },
      { t: "valg", q: "På opret-siden klikker brugeren **Opret** uden at skrive noget. Hvad sker der?",
        svar: ["Siden viser \"Skriv et navn\" og \"Skriv en e-mail\", og `Gem` bliver ikke kaldt", "Kunden bliver gemt uden navn", "Programmet går ned med en fejl", "Siden skifter til `/kunder` uden at gemme"],
        ret: 0, fordi: "Afprøvet. `DataAnnotationsValidator` finder de to `[Required]`-felter, og EditForm kalder kun `OnValidSubmit`, når alt er gyldigt. Skrives e-mailen som `carl`, kommer beskeden \"Det er ikke en gyldig e-mail\" fra `[EmailAddress]`." },
      { t: "udfyld", frag: true, sprog: "razor", q: "Udfyld formularen, så den fylder `customer` ud, kalder `Gem`, når alt er gyldigt, og validerer med attributterne.",
        kode: R`<EditForm [[Model]]="customer" [[OnValidSubmit]]="Gem">
    <[[DataAnnotationsValidator]] />
    <InputText class="form-control" [[@bind-Value]]="customer.Name" />
    <button type="submit" class="btn btn-primary">Opret</button>
</EditForm>`,
        fordi: "`Model` er objektet, `OnValidSubmit` er metoden, `DataAnnotationsValidator` slår valideringen til, og Input-komponenter bindes med `@bind-Value` (ikke bare `@bind`, som du bruger på et almindeligt `<input>`)." },
      { t: "valg", q: "Underviseren advarede om at vælge den forkerte, når Visual Studio foreslår den. Hvad er forskellen på `OnValidSubmit` og `OnSubmit` på en `EditForm`?",
        svar: ["`OnValidSubmit` kaldes kun, når alt er gyldigt. `OnSubmit` kaldes altid, og så skal du selv tjekke valideringen", "Der er ingen forskel", "`OnSubmit` virker kun i MVC", "`OnValidSubmit` gemmer automatisk i databasen"],
        ret: 0, fordi: "Med `OnSubmit` kan ugyldige data slippe igennem til databasen. Der findes også `OnInvalidSubmit`, der kun kaldes, når **noget er galt**. Vælg `OnValidSubmit` til at gemme." },
      { t: "laes", h: "Ret-siden: samme formular, men udfyldt",
        md: "Ret-siden ligner opret-siden. Forskellen er, at den skal vide, **hvilken** kunde der skal rettes. Nummeret står i adressen: `/kunder/ret/3`. `{Id:int}` i `@page` og `[Parameter]` på propertyen `Id` henter det ud (det kommer der mere om i lektion 5).",
        sprog: "razor", frag: true,
        kode: R`@page "/kunder/ret/{Id:int}"
@inject ICustomerService CustomerService
@inject NavigationManager Navigation

<PageTitle>Ret kunde</PageTitle>

<h1>Ret kunde</h1>

@if (customer == null)
{
    <p><em>Henter …</em></p>
}
else
{
    <EditForm Model="customer" OnValidSubmit="Gem">
        <DataAnnotationsValidator />
        <ValidationSummary />

        <div class="mb-3">
            <label>Navn</label>
            <InputText class="form-control" @bind-Value="customer.Name" />
        </div>
        <div class="mb-3">
            <label>E-mail</label>
            <InputText class="form-control" @bind-Value="customer.Email" />
        </div>
        <div class="mb-3">
            <label>By</label>
            <InputText class="form-control" @bind-Value="customer.City" />
        </div>

        <button type="submit" class="btn btn-primary">Gem</button>
        <a class="btn btn-secondary" href="kunder">Tilbage</a>
    </EditForm>
}

@code {
    [Parameter]
    public int Id { get; set; }

    private Customer? customer;

    protected override async Task OnInitializedAsync()
    {
        customer = await CustomerService.GetByIdAsync(Id);
    }

    private async Task Gem()
    {
        await CustomerService.UpdateAsync(customer!);
        Navigation.NavigateTo("/kunder");
    }
}`,
        noter: [
          ["@page \"/kunder/ret/{Id:int}\"", "Adressen har et nummer til sidst. `:int` betyder: kun heltal."],
          ["[Parameter] public int Id", "Blazor lægger nummeret fra adressen i `Id`, før `OnInitializedAsync` kører."],
          ["Customer? customer", "Starter som `null`. Den bliver først sat, når kunden er hentet."],
          ["@if (customer == null)", "Uden tjekket får EditForm `null` som `Model`. Afprøvet med et nummer, der ikke findes: *EditForm requires either a Model parameter, or an EditContext parameter*."],
          ["GetByIdAsync(Id)", "Hent kunden med nummeret fra adressen."],
          ["UpdateAsync(customer!)", "Gem ændringerne. Udråbstegnet siger til compileren: \"den er ikke null her\" — formularen vises jo kun, når kunden er hentet."]
        ] },
      { t: "fejl", sprog: "razor", frag: true, logisk: true,
        q: "Ret-siden skal gemme ændringerne på en kunde, der findes. Men når man klikker **Gem**, kommer den gule fejlbjælke nederst, og i terminalen står *UNIQUE constraint failed: Customers.Id*. Klik på linjen med fejlen.",
        kode: R`private async Task Gem()
{
    await CustomerService.CreateAsync(customer!);
    Navigation.NavigateTo("/kunder");
}`,
        linje: 3,
        fordi: "Metoden er kopieret fra opret-siden, og `CreateAsync` blev ikke rettet. Den prøver at **indsætte** kunden igen med det samme `Id`, og databasen siger nej, fordi primærnøglen allerede findes. (Afprøvet med SQLite. SQL Server siger noget om `IDENTITY_INSERT`, men fejlen er den samme.) Ret-siden skal kalde `UpdateAsync`.",
        rettet: R`private async Task Gem()
{
    await CustomerService.UpdateAsync(customer!);
    Navigation.NavigateTo("/kunder");
}` },
      { t: "laes", h: "Listen med ret og slet",
        md: "Nu bliver listen færdig: knappen **Tilføj testkunde** forsvinder, og der kommer en knap til **Ny kunde**, et link til **Ret** og en knap til **Slet** i hver række. Her er de linjer i `CustomerList.razor`, der er nye eller ændret:",
        sprog: "razor", frag: true,
        kode: R`<p><a class="btn btn-primary" href="kunder/ny">Ny kunde</a></p>

...
                <tr>
                    <td>@c.Name</td>
                    <td>@c.Email</td>
                    <td>@c.City</td>
                    <td>
                        <a class="btn btn-sm btn-secondary" href="kunder/ret/@c.Id">Ret</a>
                        <button class="btn btn-sm btn-danger" @onclick="() => Slet(c)">Slet</button>
                    </td>
                </tr>
...

@code {
    private List<Customer>? customers;

    protected override async Task OnInitializedAsync()
    {
        customers = await CustomerService.GetAllAsync();
    }

    private async Task Slet(Customer c)
    {
        await CustomerService.DeleteAsync(c.Id);
        customers = await CustomerService.GetAllAsync();
    }
}`,
        noter: [
          ["href=\"kunder/ret/@c.Id\"", "Et almindeligt link. `@c.Id` sætter nummeret ind, så linket bliver fx `kunder/ret/3`."],
          ["@onclick=\"() => Slet(c)\"", "`Slet` skal have en kunde med. Derfor en lambda (modul 10): \"når der klikkes, så kald `Slet` med netop denne `c`\". `@onclick=\"Slet\"` ville ikke vide hvilken."],
          ["DeleteAsync(c.Id)", "Slet i databasen."],
          ["customers = await … GetAllAsync()", "Hent listen igen. Siden har sin egen **kopi** af listen, så den ved ikke af sig selv, at databasen er ændret. Kolonnen **Nr.** og knappen **Tilføj testkunde** er fjernet."]
        ] },
      { t: "spor",
        q: "Siden har sin egen kopi af kunderne. `db` spiller databasen, `customers` spiller sidens liste, og `vist` er det antal rækker, siden viser.",
        kode: R`var db = new List<string> { "Anna", "Bo", "Carl" };
var customers = db.ToList();
db.Remove("Bo");
int vist = customers.Count;
customers = db.ToList();
vist = customers.Count;`,
        kolonner: ["db.Count", "customers.Count", "vist"],
        raekker: [[1, "=3", "=–", "=–"], [2, "3", "3", "–"], [3, "2", "3", "–"], [4, "2", "3", "3"], [5, "2", "2", "3"], [6, "2", "2", "2"]],
        fordi: "Efter linje 3 er Bo væk fra databasen, men sidens kopi har stadig 3 kunder. Først når listen hentes igen (linje 5), passer siden med databasen. Derfor slutter `Slet` med `customers = await CustomerService.GetAllAsync();`." },
      { t: "skriv", frag: true,
        q: "Skriv metoden `Gem` til ret-siden. Den skal være `private async Task Gem()`, vente på `CustomerService.UpdateAsync(customer!)` og bagefter gå til `/kunder` med `Navigation.NavigateTo`.",
        tjek: [
          [/private async Task Gem\(\)\{/, "Metodens hoved: `private async Task Gem()`"],
          [/await CustomerService\.UpdateAsync\(customer!?\);/, "Vent på `CustomerService.UpdateAsync(customer!)`"],
          ['Navigation.NavigateTo("/kunder");', "Gå til listen: `Navigation.NavigateTo(\"/kunder\");`"],
          ["CreateAsync", "Ret-siden skal bruge `UpdateAsync`, ikke `CreateAsync`", "ikke"]
        ],
        forkert: [R`private async Task Gem()
{
    await CustomerService.CreateAsync(customer!);
    Navigation.NavigateTo("/kunder");
}`, R`private async Task Gem()
{
    CustomerService.UpdateAsync(customer!);
    Navigation.NavigateTo("/kunder");
}`],
        loesning: R`private async Task Gem()
{
    await CustomerService.UpdateAsync(customer!);
    Navigation.NavigateTo("/kunder");
}`,
        fordi: "Uden `await` skifter siden måske, før kunden er gemt — og så viser listen den gamle udgave." },
      { t: "ide", h: "Byg opret, ret og slet",
        md: "Gør KundeApp til en rigtig CRUD-app.",
        win: ["Højreklik på `Components/Pages/Customers` → **Add → Razor Component…** → `CreateCustomer.razor`. Skriv siden fra trin 2.", "Lav `EditCustomer.razor` på samme måde. Skriv siden fra trin 6.", "Ret `CustomerList.razor` som i trin 8: fjern **Tilføj testkunde** og kolonnen **Nr.**, tilføj **Ny kunde**, **Ret** og **Slet**.", "Kør. Opret en kunde, ret hendes by, og slet hende igen."],
        mac: ["Højreklik på `Components/Pages/Customers` → **Add → File**, og kald filen `CreateCustomer.razor`. Skriv siden fra trin 2.", "Lav `EditCustomer.razor` på samme måde. Skriv siden fra trin 6.", "Ret `CustomerList.razor` som i trin 8: fjern **Tilføj testkunde** og kolonnen **Nr.**, tilføj **Ny kunde**, **Ret** og **Slet**.", "Kør. Opret en kunde, ret hendes by, og slet hende igen."],
        md2: "Brug debuggeren én gang: sæt et breakpoint på linjen `await CustomerService.CreateAsync(customer);` i `CreateCustomer.razor`, og start med debuggeren. Udfyld formularen, og klik **Opret**. Programmet stopper, og i **Locals** / **Threads & Variables** kan du folde `customer` ud og se, at `Name`, `Email` og `City` er det, du skrev — og at `Id` er 0. Gå ét skridt frem med **Step Over**, og se `Id` blive et rigtigt nummer, når databasen har gemt kunden." },
      { t: "forklar", q: "Forklar med dine egne ord, hvad der sker fra brugeren klikker **Opret**, til den nye kunde står på listen.",
        svar: "Formularen er en `EditForm` med `Model=\"customer\"`, og felterne er bundet med `@bind-Value`, så `customer` allerede indeholder det, brugeren har skrevet. Ved klik validerer `DataAnnotationsValidator` attributterne på `Customer`. Er noget ugyldigt, vises fejlbeskederne, og der sker ikke mere. Er alt gyldigt, kalder EditForm min metode i `OnValidSubmit`. Den kalder `CreateAsync` på servicen, som gemmer kunden med EF Core, og derefter skifter `NavigationManager.NavigateTo` til `/kunder`, hvor listen hentes forfra fra databasen.",
        noegle: ["EditForm", "@bind-Value", "DataAnnotationsValidator", "OnValidSubmit", "CreateAsync", "NavigateTo"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m23l5", titel: "Layout, menu og ruter med parametre", min: 20,
    ord: [
      ["MainLayout", "Komponenten med det, der er ens på alle sider: menuen i siden og rammen om indholdet. Svarer til `_Layout.cshtml` i MVC."],
      ["@Body", "Stedet i layoutet, hvor den aktuelle side bliver sat ind. Svarer til `@RenderBody()` i MVC."],
      ["NavLink", "Blazors udgave af `<a>`. Får automatisk CSS-klassen `active`, når adressen passer, så menupunktet lyser."],
      ["NavLinkMatch", "Bestemmer, hvornår et NavLink er aktivt: `All` = hele adressen skal passe, `Prefix` (standard) = adressen skal begynde med linket."],
      ["Route-parameter", "En del af adressen, der er en værdi, fx `{Id}` i `@page \"/kunder/{Id:int}\"`. Havner i en `[Parameter]`-property med samme navn."],
      ["Route constraint", "En regel for parameteren, fx `:int`. Passer værdien ikke, findes siden ikke (404)."],
      ["OnParametersSetAsync", "Livscyklus-metode, der kører, hver gang komponenten får nye parametre — også når man går fra `/kunder/1` til `/kunder/2`."]
    ],
    trin: [
      { t: "laes", h: "MainLayout: rammen om alle sider",
        md: "Når du går fra side til side, bliver menuen stående. Det er, fordi alle sider bliver vist **inde i** et layout. I `Routes.razor` står `DefaultLayout=\"typeof(Layout.MainLayout)\"`, så det gælder alle sider. Sådan ser `Components/Layout/MainLayout.razor` ud:",
        sprog: "razor", frag: true,
        kode: R`@inherits LayoutComponentBase

<div class="page">
    <div class="sidebar">
        <NavMenu />
    </div>

    <main>
        <div class="top-row px-4">
            <a href="https://learn.microsoft.com/aspnet/core/" target="_blank">About</a>
        </div>

        <article class="content px-4">
            @Body
        </article>
    </main>
</div>`,
        noter: [
          ["@inherits LayoutComponentBase", "Gør komponenten til et layout. Det giver den propertyen `Body`."],
          ["<NavMenu />", "Menuen er en komponent for sig, `NavMenu.razor`, i samme mappe."],
          ["@Body", "Her bliver siden sat ind — `/kunder`, `/kunder/ny` osv."],
          ["top-row", "Linjen øverst. Her kan du fx skrive appens navn i stedet for About."]
        ],
        md2: "Det er samme idé som `_Layout.cshtml` og `@RenderBody()` i MVC (modul 16). Her er layoutet bare også en komponent." },
      { t: "laes", h: "NavMenu: menupunkter med NavLink",
        md: "Menuen i `NavMenu.razor` består af `NavLink`-komponenter. Et `NavLink` virker som et `<a>`, men det får CSS-klassen `active`, når adressen passer — så lyser punktet. Tilføj to punkter til kunderne under **Counter**:",
        sprog: "razor", frag: true,
        kode: R`<div class="nav-item px-3">
    <NavLink class="nav-link" href="kunder" Match="NavLinkMatch.All">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Kunder
    </NavLink>
</div>

<div class="nav-item px-3">
    <NavLink class="nav-link" href="kunder/ny">
        <span class="bi bi-plus-square-fill-nav-menu" aria-hidden="true"></span> Ny kunde
    </NavLink>
</div>`,
        noter: [
          ["href=\"kunder\"", "Uden `/` foran. Adressen regnes ud fra `<base href=\"/\" />` i `App.razor`, så det bliver `/kunder`."],
          ["Match=\"NavLinkMatch.All\"", "Kun aktiv, når adressen er **præcis** `/kunder`."],
          ["Uden Match", "Standarden er `Prefix`: aktiv, når adressen **begynder med** linket."],
          ["<span class=\"bi …\">", "Et lille ikon fra skabelonens CSS. Kan undværes."]
        ],
        md2: "Hvorfor `NavLinkMatch.All` på **Kunder**? Afprøvet: uden den lyste både **Kunder** og **Ny kunde** på siden `/kunder/ny`, for `/kunder/ny` begynder med `kunder`." },
      { t: "valg", q: "Hvad er forskellen på et `NavLink` og et almindeligt `<a href>` i Blazor?",
        svar: ["`NavLink` får klassen `active`, når adressen passer, så menupunktet kan lyse. Ellers virker de ens", "Kun `NavLink` kan skifte side i Blazor", "`<a href>` genindlæser altid hele appen og laver en ny circuit", "`NavLink` virker kun i `NavMenu.razor`"],
        ret: 0, fordi: "Begge skifter side inde i appen. Blazor fanger klikket og skifter siden over den samme forbindelse — det er det, der gør Blazor til en **SPA** (modul 21). `NavLink` kan bare også markere sig selv. Brug det i menuer, og almindelige `<a>` i resten." },
      { t: "laes", h: "Ruter med parametre",
        md: "En side kan have **parametre** i adressen. Navnet står i tuborgklammer i `@page`, og en property med samme navn og `[Parameter]` får værdien:\n\n`@page \"/kunder/{Id:int}\"`\n\nog i `@code`:\n\n`[Parameter] public int Id { get; set; }`\n\n`:int` er en **route constraint**: siden passer kun til adresser, hvor det sidste stykke er et heltal. Afprøvet:\n\n- `/kunder/1` → siden vises, `Id` er 1.\n- `/kunder/abc` → **404**. Skabelonens side `NotFound.razor` vises, og din side bliver slet ikke lavet.\n- `/Kunder/1` med stort K → virker også. Adresser skelner ikke mellem store og små bogstaver, men skriv dem ens alligevel.\n\nPropertyens navn må gerne skrives med en anden stavemåde (`{id}` og `Id` passer sammen), men hold dem ens.",
        md2: "Andre constraints: `{Navn}` uden noget er tekst, `{Pris:decimal}`, `{Aktiv:bool}`, `{Dato:datetime}`. Du kan have flere parametre: `@page \"/ordrer/{Aar:int}/{Maaned:int}\"`." },
      { t: "fejl", sprog: "razor", frag: true,
        q: "En studerende fik den her fejl i timen, da han åbnede `/kunder/1`: *Unable to set property 'Id' on object of type 'CustomerDetails'. The error was: Unable to cast object of type 'System.String' to type 'System.Int32'.* Klik på linjen med fejlen.",
        kode: R`@page "/kunder/{Id}"
@inject ICustomerService CustomerService

<h1>Kunde @Id</h1>

@code {
    [Parameter]
    public int Id { get; set; }
}`,
        linje: 1,
        fordi: "Uden `:int` er parameteren **tekst**: `\"1\"`. Blazor kan ikke lægge en tekst i en `int`-property og stopper med fejlen. Det var præcis det, der manglede hos den studerende i underviserens optagelse. Skriv `{Id:int}` — så får du både den rigtige type og en 404 ved `/kunder/abc`.",
        rettet: R`@page "/kunder/{Id:int}"
@inject ICustomerService CustomerService

<h1>Kunde @Id</h1>

@code {
    [Parameter]
    public int Id { get; set; }
}` },
      { t: "laes", h: "Detaljesiden — og OnParametersSetAsync",
        md: "Detaljesiden viser én kunde. Den skal klare tre tilstande: **henter**, **findes ikke** og **fundet**.\n\nLæg mærke til, at den bruger `OnParametersSetAsync` i stedet for `OnInitializedAsync`. Går man fra `/kunder/1` til `/kunder/2`, er det **samme side**, og Blazor genbruger komponent-objektet og giver det bare et nyt `Id`. `OnInitializedAsync` kører kun, første gang objektet laves. `OnParametersSetAsync` kører, **hver gang** parametrene ændres. Afprøvet: med `OnInitialized` blev navnet fra kunde 1 stående på `/kunder/2`.",
        sprog: "razor", frag: true,
        kode: R`@page "/kunder/{Id:int}"
@inject ICustomerService CustomerService

<PageTitle>Kunde</PageTitle>

@if (!hentet)
{
    <p><em>Henter …</em></p>
}
else if (customer == null)
{
    <h1>Kunden findes ikke</h1>
    <p>Der er ingen kunde med nummer @Id.</p>
}
else
{
    <h1>@customer.Name</h1>
    <dl>
        <dt>E-mail</dt>
        <dd>@customer.Email</dd>
        <dt>By</dt>
        <dd>@customer.City</dd>
    </dl>
    <a class="btn btn-secondary" href="kunder/ret/@customer.Id">Ret</a>
}
<a class="btn btn-link" href="kunder">Tilbage til listen</a>

@code {
    [Parameter]
    public int Id { get; set; }

    private Customer? customer;
    private bool hentet = false;

    protected override async Task OnParametersSetAsync()
    {
        customer = await CustomerService.GetByIdAsync(Id);
        hentet = true;
    }
}`,
        noter: [
          ["bool hentet", "`customer == null` kan betyde to ting: \"ikke hentet endnu\" og \"findes ikke\". Variablen skiller dem ad."],
          ["else if (customer == null)", "Hentet, men ingen kunde: fx `/kunder/99`. Afprøvet: siden viser \"Kunden findes ikke\" i stedet for at gå ned."],
          ["<dl>, <dt>, <dd>", "En HTML-liste med overskrift og værdi (modul 13)."],
          ["OnParametersSetAsync", "Kører første gang **og** hver gang `Id` skifter."]
        ] },
      { t: "valg", q: "Detaljesiden henter kunden i `OnInitializedAsync`. På `/kunder/1` er der et link til `/kunder/2`. Man klikker, adressen skifter, men siden viser stadig kunde 1. Hvorfor?",
        svar: ["Blazor genbruger komponenten, når kun parameteren skifter, og `OnInitializedAsync` kører kun første gang. Brug `OnParametersSetAsync`", "Linket er forkert skrevet", "Databasen har ikke nået at gemme kunde 2", "`:int` mangler i `@page`"],
        ret: 0, fordi: "Det er samme side-type, så Blazor laver ikke et nyt objekt. Den sætter bare `Id` til 2 og kalder `OnParametersSetAsync`. Hentes kunden i den, passer siden altid med adressen." },
      { t: "udfyld", frag: true, sprog: "razor", q: "Udfyld, så siden svarer på `/kunder/7` og får 7 i propertyen `Id` som et heltal.",
        kode: R`@page "/kunder/{Id[[:int]]}"

@code {
    [Parameter]
    public [[int]] [[Id]] { get; set; }
}`,
        fordi: "`:int` gør parameteren til et heltal og giver 404 ved alt andet. Propertyen skal hedde det samme som parameteren i adressen, og typen skal passe til constrainten. `[Parameter]` gør, at Blazor må sætte den udefra." },
      { t: "orden", sprog: "razor", frag: true, q: "Sæt linjerne i rækkefølge, så de bliver et menupunkt til huskelisten i `NavMenu.razor`.",
        linjer: [R`<div class="nav-item px-3">`, R`    <NavLink class="nav-link" href="huskeliste">`, R`        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Huskeliste`, R`    </NavLink>`, R`</div>`],
        fordi: "Den ydre `<div>` er rækken i menuen, `NavLink` er linket, og teksten står inden i linket. Hver start-tag lukkes i omvendt rækkefølge. (Siden `/huskeliste` laver du i lektion 6.)" },
      { t: "ide", h: "Detaljer og menu",
        md: "Gør KundeApp nem at bruge.",
        win: ["Tilføj de to menupunkter fra trin 2 i `Components/Layout/NavMenu.razor`, under **Counter**.", "Lav `CustomerDetails.razor` i `Components/Pages/Customers` med koden fra trin 6.", "Tilføj i `CustomerList.razor` et link før **Ret**: `<a class=\"btn btn-sm btn-secondary\" href=\"kunder/@c.Id\">Detaljer</a>`.", "Kør, og prøv: `/kunder/1`, `/kunder/99` og `/kunder/abc`. Klik dig rundt, og se hvilket menupunkt der lyser."],
        mac: ["Tilføj de to menupunkter fra trin 2 i `Components/Layout/NavMenu.razor`, under **Counter**.", "Lav `CustomerDetails` i `Components/Pages/Customers` med koden fra trin 6.", "Tilføj i `CustomerList.razor` et link før **Ret**: `<a class=\"btn btn-sm btn-secondary\" href=\"kunder/@c.Id\">Detaljer</a>`.", "Kør, og prøv: `/kunder/1`, `/kunder/99` og `/kunder/abc`. Klik dig rundt, og se hvilket menupunkt der lyser."],
        md2: "Forventet: `/kunder/1` viser Anna Jensen. `/kunder/99` viser \"Kunden findes ikke\". `/kunder/abc` viser skabelonens side **Not Found**. Fjern `Match=\"NavLinkMatch.All\"` et øjeblik, og se både **Kunder** og **Ny kunde** lyse på `/kunder/ny`." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvordan får en Blazor-side et id fra adressen, og hvad gør `:int`?",
        svar: "I `@page` skriver jeg en **route-parameter** i tuborgklammer, fx `@page \"/kunder/{Id:int}\"`, og i `@code` en property med samme navn og attributten `[Parameter]`. Når adressen er `/kunder/3`, lægger Blazor 3 i `Id`. `:int` er en **route constraint**: siden passer kun, når værdien er et heltal, så `/kunder/abc` giver 404 i stedet for en fejl. Uden `:int` er værdien tekst og kan ikke lægges i en `int`. Henter jeg data ud fra id'et, gør jeg det i `OnParametersSetAsync`, fordi Blazor genbruger siden, når kun id'et skifter.",
        noegle: ["@page", "[Parameter]", "route constraint", "404", "OnParametersSetAsync"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m23l6", titel: "Fælles tilstand, StateHasChanged og JavaScript", min: 22,
    ord: [
      ["Tilstand (state)", "De data, en del af programmet husker lige nu, fx hvilke kunder der er på huskelisten."],
      ["State-service", "En service, der holder tilstand, som flere komponenter deler. Den siger til via et event, når noget ændres."],
      ["StateHasChanged", "Metode på en komponent, der beder Blazor om at tegne komponenten igen."],
      ["InvokeAsync", "Kører kode på komponentens egen \"tur\" i circuiten. Brug `InvokeAsync(StateHasChanged)`, når opdateringen kommer udefra."],
      ["@implements IDisposable", "Linje i en komponent, der lover en `Dispose`-metode. Blazor kalder den, når komponenten fjernes."],
      ["JS interop", "At kalde JavaScript fra C# (eller omvendt) i en Blazor-app."],
      ["IJSRuntime", "Servicen, man bruger til JS interop: `await JS.InvokeAsync<bool>(\"confirm\", \"Er du sikker?\")`."]
    ],
    trin: [
      { t: "laes", h: "Hvornår tegner Blazor siden igen?",
        md: "Blazor tegner en komponent igen af sig selv i to situationer:\n\n- når komponentens egen livscyklus-metode er færdig, fx `OnInitializedAsync`\n- når en af **komponentens egne** event-metoder er færdig, fx `@onclick=\"Slet\"`\n\nDet er derfor, listen bliver opdateret efter **Slet**: klikket skete i listen, og listen tegnes igen.\n\nMen hvad nu, hvis noget **andet** ændrer data, som komponenten viser? I dette afsnit skal menuen vise **Huskeliste (2)**, når man klikker **Husk** på kundelisten. Klikket sker i `CustomerList`, men tallet står i `NavMenu`. `NavMenu` får intet klik, så den bliver ikke tegnet igen af sig selv. Den skal have besked — og så selv kalde **`StateHasChanged()`**: \"tegn mig igen\"." },
      { t: "laes", h: "Tre måder, komponenter taler sammen på",
        md: "Fra modul 22 kender du de to første. Den tredje er ny:\n\n- **Parameter** (`[Parameter]`): forælder → barn. Forælderen giver barnet en værdi.\n- **EventCallback**: barn → forælder. Barnet siger \"der skete noget\" til sin forælder.\n- **State-service**: hvem som helst → hvem som helst. Komponenterne deler en **Scoped** service. Den, der ændrer noget, kalder en metode på servicen. Servicen sender et **event** (modul 10). De komponenter, der lytter, tegner sig selv igen.\n\n`NavMenu` og `CustomerList` er ikke forælder og barn — de er bare begge på skærmen. Derfor skal det være en state-service.\n\nScoped er det rigtige, fordi huskelisten hører til **én fane** (lektion 2). Med Singleton ville alle brugere dele den samme huskeliste." },
      { t: "valg", q: "Menuen (`NavMenu`) skal vise, hvor mange kunder der er på huskelisten. Kunderne bliver husket ved et klik på kundelisten (`CustomerList`). De to komponenter er ikke forælder og barn. Hvordan skal de tale sammen?",
        svar: ["Gennem en fælles Scoped state-service med et event, som menuen lytter på", "Med en `[Parameter]` fra kundelisten til menuen", "Med en `EventCallback` fra kundelisten til menuen", "Gennem databasen: menuen henter antallet hvert sekund"],
        ret: 0, fordi: "Parameter og EventCallback virker kun mellem forælder og barn. To komponenter, der bare er på skærmen samtidig, deler en service. Scoped, fordi huskelisten hører til én fane." },
      { t: "laes", h: "HuskelisteState",
        md: "Servicen er en helt almindelig C#-klasse. Den ligger i `Services`.",
        kode: R`using KundeApp.Models;

namespace KundeApp.Services
{
    public class HuskelisteState
    {
        public List<Customer> Kunder { get; } = new List<Customer>();

        public event Action? OnChange;

        public void Tilfoej(Customer customer)
        {
            if (!Kunder.Any(c => c.Id == customer.Id))
            {
                Kunder.Add(customer);
                OnChange?.Invoke();
            }
        }

        public void Fjern(int id)
        {
            Kunder.RemoveAll(c => c.Id == id);
            OnChange?.Invoke();
        }
    }
}`,
        omkring: ["", "namespace KundeApp.Models { public class Customer { public int Id { get; set; } public string Name { get; set; } = \"\"; } }\nclass __Start { static void Main() { } }"],
        noter: [
          ["List<Customer> Kunder { get; }", "Tilstanden: kunderne på huskelisten. Kun `get`, så ingen kan skifte hele listen ud."],
          ["public event Action? OnChange;", "Et event (modul 10). Komponenter kan melde sig til med `+=`."],
          ["if (!Kunder.Any(…))", "Den samme kunde skal ikke stå der to gange."],
          ["OnChange?.Invoke();", "\"Nu er der ændret noget!\" Alle, der har meldt sig til, får besked. `?.` betyder: kun hvis nogen lytter."]
        ],
        md2: "Registrér den i `Program.cs` som Scoped: `builder.Services.AddScoped<HuskelisteState>();` Her er der ikke noget interface — så skriver man bare klassen én gang." },
      { t: "forudsig",
        q: "To komponenter lytter på det samme event. Hvad skriver programmet?",
        kode: R`var state = new Taeller();
state.OnChange += () => Console.WriteLine($"Menu: {state.Antal}");
state.OnChange += () => Console.WriteLine($"Side: {state.Antal}");

state.Tilfoej();
state.Tilfoej();

class Taeller
{
    public int Antal { get; private set; }

    public event Action? OnChange;

    public void Tilfoej()
    {
        Antal++;
        OnChange?.Invoke();
    }
}`,
        output: "Menu: 1\nSide: 1\nMenu: 2\nSide: 2",
        fordi: "Hvert `Tilfoej` tæller op og sender eventet. Begge lyttere bliver kaldt, i den rækkefølge de meldte sig til (multicast fra modul 10). Sådan får både menuen og huskeliste-siden besked på én gang." },
      { t: "laes", h: "Menuen lytter",
        md: "`NavMenu.razor` skal tre ting: bede om servicen, melde sig til eventet og melde sig fra igen, når komponenten forsvinder. Her er de nye linjer — øverst i filen og en ny `@code`-blok nederst. Menupunktet viser antallet med `(@Huskeliste.Kunder.Count)`:",
        sprog: "razor", frag: true,
        kode: R`@inject HuskelisteState Huskeliste
@implements IDisposable

...
        <div class="nav-item px-3">
            <NavLink class="nav-link" href="huskeliste">
                <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Huskeliste (@Huskeliste.Kunder.Count)
            </NavLink>
        </div>
...

@code {
    protected override void OnInitialized()
    {
        Huskeliste.OnChange += Opdater;
    }

    private void Opdater()
    {
        InvokeAsync(StateHasChanged);
    }

    public void Dispose()
    {
        Huskeliste.OnChange -= Opdater;
    }
}`,
        noter: [
          ["@inject HuskelisteState Huskeliste", "Den samme Scoped-service som kundelisten får — samme fane, samme objekt."],
          ["@implements IDisposable", "Komponenten lover en `Dispose`-metode. Blazor kalder den, når komponenten fjernes."],
          ["OnChange += Opdater", "Meld dig til: kald `Opdater`, når huskelisten ændres."],
          ["InvokeAsync(StateHasChanged)", "Tegn menuen igen. `InvokeAsync` sørger for, at det sker på menuens egen tur, for beskeden kommer fra en anden komponent. Gør det til en vane, når opdateringen kommer udefra."],
          ["OnChange -= Opdater", "Meld dig fra. Ellers holder servicen fast i en komponent, der er væk, og prøver at tegne den."]
        ] },
      { t: "spor",
        q: "Her er menuens tilmelding efterlignet med en delegate (modul 10). `antal` er antallet på huskelisten. `tegnet` tæller, hvor mange gange menuen er tegnet igen. Linje 8 svarer til `Dispose`.",
        kode: R`int antal = 0;
int tegnet = 0;
Action tegn = () => tegnet++;
Action? onChange = null;
onChange += tegn;
antal++;
onChange?.Invoke();
onChange -= tegn;
antal++;
onChange?.Invoke();`,
        kolonner: ["antal", "tegnet"],
        raekker: [[1, "=0", "=–"], [2, "=0", "=0"], [3, "=0", "=0"], [4, "=0", "=0"], [5, "0", "0"], [6, "1", "0"], [7, "1", "1"], [8, "1", "1"], [9, "2", "1"], [10, "2", "1"]],
        fordi: "Linje 7 kalder `tegn`, så `tegnet` bliver 1. Efter linje 8 er der ingen lyttere tilbage, så linje 10 gør ingenting (`?.` springer over, når den er `null`). Huskelisten har 2, men \"menuen\" er kun tegnet én gang — sådan er det, når en komponent er meldt fra." },
      { t: "valg", q: "Du klikker **Husk** på kundelisten. Huskelisten i servicen får en kunde mere, men menuen bliver ved med at vise **Huskeliste (0)**. Først når du klikker på et menupunkt, står der (1). Hvad mangler mest sandsynligt?",
        svar: ["Menuen melder sig ikke til `OnChange` og kalder ikke `StateHasChanged`, så den bliver ikke tegnet igen, når servicen ændres", "Servicen skal være Singleton", "Kundelisten skal kalde `Navigation.NavigateTo`", "`Kunder.Count` virker ikke i Razor"],
        ret: 0, fordi: "Klikket skete i kundelisten, så det er kun den, Blazor tegner igen af sig selv. Menuen viser det rigtige tal, næste gang den af en anden grund bliver tegnet. Løsningen er tilmeldingen fra trin 6." },
      { t: "udfyld", frag: true, sprog: "razor", q: "Udfyld komponenten, så den tegner sig selv igen, når huskelisten ændres, og melder sig fra, når den fjernes.",
        kode: R`@inject HuskelisteState Huskeliste
@implements [[IDisposable]]

@code {
    protected override void OnInitialized()
    {
        Huskeliste.OnChange [[+=]] Opdater;
    }

    private void Opdater()
    {
        InvokeAsync([[StateHasChanged]]);
    }

    public void [[Dispose]]()
    {
        Huskeliste.OnChange -= Opdater;
    }
}`,
        fordi: "`+=` melder til, `-=` melder fra (modul 10). `StateHasChanged` tegner igen. `IDisposable` og `Dispose` hører sammen: interfacet lover metoden." },
      { t: "laes", h: "JavaScript fra C#: et \"Er du sikker?\"",
        md: "Indtil nu har **Slet** slettet med det samme. En slet-knap bør spørge først. Browseren har en indbygget dialog, `confirm`, men den er **JavaScript**, og din kode er C# på serveren.\n\nTil det har Blazor **JS interop**: servicen `IJSRuntime` kan kalde en JavaScript-funktion i browseren over forbindelsen og vente på svaret.",
        sprog: "razor", frag: true,
        kode: R`@inject IJSRuntime JS

...

    private async Task Slet(Customer c)
    {
        bool ok = await JS.InvokeAsync<bool>("confirm", $"Vil du slette {c.Name}?");
        if (ok)
        {
            await CustomerService.DeleteAsync(c.Id);
            customers = await CustomerService.GetAllAsync();
        }
    }`,
        noter: [
          ["@inject IJSRuntime JS", "Blazor har selv registreret `IJSRuntime`. `using Microsoft.JSInterop` står allerede i `_Imports.razor`."],
          ["InvokeAsync<bool>(\"confirm\", …)", "Kald browserens `confirm` med teksten, og vent på svaret. `<bool>`: svaret er true (OK) eller false (Annuller)."],
          ["if (ok)", "Slet kun, hvis brugeren trykkede OK. Afprøvet: Annuller sletter ingenting."],
          ["InvokeVoidAsync(\"alert\", \"Gemt\")", "Til en funktion uden svar."]
        ],
        md2: "**Ikke i `OnInitializedAsync`.** Under prerendering (lektion 1) er der ingen browser at kalde. Afprøvet: siden stoppede med *JavaScript interop calls cannot be issued at this time … can only be performed during the OnAfterRenderAsync lifecycle method*. Kald JavaScript fra et klik — eller fra `OnAfterRenderAsync`, når du får brug for det." },
      { t: "udfyld", frag: true, q: "Udfyld, så `Slet` spørger med browserens `confirm` og kun sletter, hvis brugeren svarer OK.",
        kode: R`private async Task Slet(Customer c)
{
    bool ok = await JS.[[InvokeAsync]]<[[bool]]>("[[confirm]]", $"Vil du slette {c.Name}?");
    if (ok)
    {
        await CustomerService.DeleteAsync(c.Id);
        customers = await CustomerService.GetAllAsync();
    }
}`,
        fordi: "`InvokeAsync<bool>` kalder en JavaScript-funktion og venter på et svar af typen `bool`. Navnet på funktionen er en tekst: `\"confirm\"`." },
      { t: "ide", h: "Huskeliste og \"Er du sikker?\"",
        md: "Byg det hele ind i KundeApp.",
        win: ["Lav `Services/HuskelisteState.cs` fra trin 4, og registrér den i `Program.cs`: `builder.Services.AddScoped<HuskelisteState>();`", "I `CustomerList.razor`: tilføj `@inject HuskelisteState Huskeliste` og i hver række en knap: `<button class=\"btn btn-sm btn-outline-primary\" @onclick=\"() => Huskeliste.Tilfoej(c)\">Husk</button>`.", "Ret `NavMenu.razor` som i trin 6.", "Lav siden `Components/Pages/MinHuskeliste.razor` med `@page \"/huskeliste\"`, der viser `Huskeliste.Kunder` i en `<ul>` med en **fjern**-knap pr. kunde: `@onclick=\"() => Huskeliste.Fjern(c.Id)\"`. Den skal også melde sig til `OnChange` og fra igen.", "Tilføj `@inject IJSRuntime JS` og den nye `Slet` fra trin 10 i `CustomerList.razor`.", "Kør. Klik **Husk** på to kunder, og se tallet i menuen. Gå til huskelisten via menuen, og fjern én. Slet en kunde, og tryk først **Annuller**, så **OK**."],
        mac: ["Lav `Services/HuskelisteState` fra trin 4, og registrér den i `Program.cs`: `builder.Services.AddScoped<HuskelisteState>();`", "I `CustomerList.razor`: tilføj `@inject HuskelisteState Huskeliste` og i hver række en knap: `<button class=\"btn btn-sm btn-outline-primary\" @onclick=\"() => Huskeliste.Tilfoej(c)\">Husk</button>`.", "Ret `NavMenu.razor` som i trin 6.", "Lav siden `Components/Pages/MinHuskeliste.razor` med `@page \"/huskeliste\"`, der viser `Huskeliste.Kunder` i en `<ul>` med en **fjern**-knap pr. kunde: `@onclick=\"() => Huskeliste.Fjern(c.Id)\"`. Den skal også melde sig til `OnChange` og fra igen.", "Tilføj `@inject IJSRuntime JS` og den nye `Slet` fra trin 10 i `CustomerList.razor`.", "Kør. Klik **Husk** på to kunder, og se tallet i menuen. Gå til huskelisten via menuen, og fjern én. Slet en kunde, og tryk først **Annuller**, så **OK**."],
        kode: R`@page "/huskeliste"
@inject HuskelisteState Huskeliste
@implements IDisposable

<PageTitle>Huskeliste</PageTitle>

<h1>Huskeliste</h1>

@if (Huskeliste.Kunder.Count == 0)
{
    <p>Du har ikke husket nogen kunder.</p>
}
<ul>
    @foreach (var c in Huskeliste.Kunder)
    {
        <li>@c.Name <button class="btn btn-sm btn-link" @onclick="() => Huskeliste.Fjern(c.Id)">fjern</button></li>
    }
</ul>

@code {
    protected override void OnInitialized()
    {
        Huskeliste.OnChange += StateHasChanged;
    }

    public void Dispose()
    {
        Huskeliste.OnChange -= StateHasChanged;
    }
}`,
        sprog: "razor", frag: true,
        md2: "Koden ovenfor er huskeliste-siden — prøv selv først. To ting, der er afprøvet:\n\n- Filen må **ikke** hedde `Huskeliste.razor`. Så hedder komponent-klassen `Huskeliste`, og den har en property, der hedder `Huskeliste` (fra `@inject`). Compileren siger *CS0542: 'Huskeliste': member names cannot be the same as their enclosing type*. Derfor `MinHuskeliste.razor`.\n- Skriver du `/huskeliste` i adresselinjen og trykker Enter, er listen **tom**. Det er en ny indlæsning af siden, altså en ny circuit og en ny Scoped-service. Klikker du på menupunktet, er det samme circuit, og kunderne er der." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad gør `StateHasChanged`, og hvornår skal du selv kalde den?",
        svar: "`StateHasChanged` beder Blazor om at **tegne komponenten igen**. Blazor kalder den selv efter komponentens egne event-metoder, fx et `@onclick`, og efter livscyklus-metoder. Jeg skal selv kalde den, når data ændres **udefra** — fx når en anden komponent ændrer en fælles **Scoped state-service**. Så melder komponenten sig til servicens **event** i `OnInitialized`, kalder `InvokeAsync(StateHasChanged)`, når eventet kommer, og melder sig fra i `Dispose`, så servicen ikke holder fast i en komponent, der er væk.",
        noegle: ["tegne igen", "udefra", "state-service", "event", "InvokeAsync", "Dispose"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m23v", titel: "Værksted: søgning, fejlfinding og VareLager", vaerksted: true, min: 120, ord: [], trin: [

    { t: "laes", h: "Sådan arbejder du i værkstedet",
      md: "Først to små opgaver i KundeApp: et søgefelt og en fejl, du skal finde med debuggeren. Derefter bygger du en **ny app helt fra bunden**, `VareLager`, ud fra krav — ikke fra en opskrift. Det er den samme slags arbejde som i dit eksamensprojekt.\n\nEn Blazor-app skriver ikke noget i et sort vindue, som siden her kan sammenligne. Derfor gør du sådan: læs kravene, byg, kør, og klik dig igennem siderne i browseren. Sæt flueben ved hvert krav, når du kan **se**, at det virker.\n\nNår der står \"Kopiér koden ind i Program.cs\" ved en startkode, så se bort fra det: opgaven siger, hvilken fil koden hører til.",
      noter: [
        ["Skriv selv", "Brug KundeApp som opslag, men kopiér ikke. Det er skrivningen, der får det til at sidde."],
        ["Ét skridt ad gangen", "Byg og kør efter hver lille ændring. Så ved du præcis, hvad der lavede en fejl."],
        ["Debuggeren", "Sæt et breakpoint i en metode i `@code` (klik i margenen), og start med debuggeren (Visual Studio: F5 · Rider: den grønne bille). Når du klikker på siden, stopper programmet i din metode, og du kan se alle variabler i Locals (Visual Studio) / Threads & Variables (Rider)."],
        ["Den gule bjælke", "Står der **An unhandled error has occurred** nederst i browseren, er der sket en fejl på serveren. Den røde tekst i terminalen (eller i Visual Studios Output-vindue) siger hvilken."],
        ["Tips før løsning", "Sidder du fast, så åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af."]
      ] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Søgefelt på kundelisten",
      md: "Kundelisten i KundeApp skal have et søgefelt. Mens man skriver, skal listen kun vise de kunder, hvis navn indeholder det, man har skrevet — uden at skelne mellem store og små bogstaver.",
      krav: [
        "Over tabellen i `CustomerList.razor` er et tekstfelt med teksten `Søg på navn` som pladsholder",
        "Feltet er bundet til et felt `soeg` (en `string`, der starter som `\"\"`) med `@bind` og `@bind:event=\"oninput\"`",
        "Tabellen viser kun kunder, hvis `Name` indeholder `soeg`",
        "Skriver du `bo`, står kun Bo Nielsen tilbage. Tømmer du feltet, kommer alle kunderne tilbage"
      ],
      tip: [
        "`@bind:event=\"oninput\"` fra modul 22 opdaterer variablen for hvert tegn. Uden den sker det først, når feltet mister fokus.",
        "Lav en property, der regner listen ud, hver gang siden tegnes: `private List<Customer> Viste => customers!.Where(…).ToList();` og skriv `@foreach (var c in Viste)`.",
        "Betingelsen er `c.Name.Contains(soeg, StringComparison.OrdinalIgnoreCase)`. Den sidste del gør, at `bo` også finder `Bo`."
      ],
      frag: true, fri: true,
      output: "Søg på navn: bo\nNavn         E-mail       By\nBo Nielsen   bo@mail.dk   Odense",
      loesning: R`@* CustomerList.razor — over tabellen *@
<input class="form-control mb-3" placeholder="Søg på navn" @bind="soeg" @bind:event="oninput" />

@* i tabellen *@
@foreach (var c in Viste)

@code {
    private List<Customer>? customers;
    private string soeg = "";

    private List<Customer> Viste =>
        customers!.Where(c => c.Name.Contains(soeg, StringComparison.OrdinalIgnoreCase)).ToList();

    // OnInitializedAsync og Slet er som før
}`,
      fordi: "Afprøvet i KundeApp: `an` viste kun Anna Jensen, `bo` kun Bo Nielsen. Listen bliver ikke hentet igen fra databasen ved hvert tegn — `Viste` filtrerer bare sidens egen kopi. `customers!` er sikkert, fordi tabellen kun vises, når `customers` ikke er `null`.",
      ekstra: ["Søg også i byen: `|| (c.City ?? \"\").Contains(soeg, StringComparison.OrdinalIgnoreCase)`.", "Vis `Ingen kunder passer til søgningen`, når `Viste.Count` er 0."] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Fejlfinding: den forkerte knap",
      md: "En kollega har lavet en salgsside. Hver vare har en knap **Sælg én**, der skal tælle lageret for **netop den vare** én ned. Men lige meget hvilken knap man trykker på, kommer den gule fejlbjælke. Find fejlen **med debuggeren** — gæt ikke.\n\nLav filen `Components/Pages/Salg.razor` i KundeApp, og skriv startkoden ind.",
      krav: [
        "Du har sat et breakpoint i `Saelg` og set værdien af `nr`, da du trykkede på knappen ved **Te**",
        "Du kan forklare, hvorfor `nr` har den værdi",
        "Efter rettelsen viser siden `Solgt: Te`, og Te har 2 på lager, når du trykker på knappen ved Te",
        "Knapperne ved Kaffe og Kakao virker også"
      ],
      tip: [
        "Breakpoint på linjen `lager[nr]--;`. Start med debuggeren, gå til `/salg`, og tryk på knappen ved Te. Hvad er `nr`? Hvor mange varer er der?",
        "Lambdaen `() => Saelg(i)` husker **variablen** `i`, ikke værdien (closures, modul 10). Den bliver kørt, når du klikker — og da er løkken for længst færdig.",
        "Lav en ny variabel inde i løkken, der får værdien med det samme: `int nr = i;` lige efter `{`, og skriv `Saelg(nr)` i knappen."
      ],
      start: R`@page "/salg"

<PageTitle>Salg</PageTitle>

<h1>Salg</h1>

<p>@besked</p>

<ul>
    @for (int i = 0; i < varer.Count; i++)
    {
        <li>
            @varer[i] (@lager[i] på lager)
            <button class="btn btn-sm btn-primary" @onclick="() => Saelg(i)">Sælg én</button>
        </li>
    }
</ul>

@code {
    private List<string> varer = new List<string> { "Kaffe", "Te", "Kakao" };
    private List<int> lager = new List<int> { 5, 3, 8 };
    private string besked = "";

    private void Saelg(int nr)
    {
        lager[nr]--;
        besked = $"Solgt: {varer[nr]}";
    }
}`,
      frag: true, fri: true,
      output: "Solgt: Te\nKaffe (5 på lager) Sælg én\nTe (2 på lager) Sælg én\nKakao (8 på lager) Sælg én",
      loesning: R`@for (int i = 0; i < varer.Count; i++)
{
    int nr = i;
    <li>
        @varer[i] (@lager[i] på lager)
        <button class="btn btn-sm btn-primary" @onclick="() => Saelg(nr)">Sælg én</button>
    </li>
}`,
      fordi: "Afprøvet. Med fejlen er `nr` **3** ved alle tre knapper: løkken stoppede, da `i` blev 3, og alle tre lambdaer deler den samme `i`. `lager[3]` findes ikke, så siden stopper med *ArgumentOutOfRangeException: Index was out of range*. Med `int nr = i;` får hver runde sin egen variabel. En `foreach` har ikke problemet, for den laver en ny variabel i hver runde — men her skal du bruge indekset til to lister." },

    // ------------------------------------------------------------------
    { t: "opgave", h: "VareLager: varer fra databasen",
      md: "Lav en **ny** Blazor-app, `VareLager`, til en lille butik. Første skridt: varerne ligger i en database, og en side viser dem. Ingen opskrift — kun krav. Brug KundeApp som opslag.",
      krav: [
        "Nyt projekt `VareLager`: Blazor Web App, .NET 10, Interactive render mode **Server**, Interactivity location **Global**, uden HTTPS",
        "Modellen `Product` har `Id`, `Name` (påkrævet, højst 50 tegn), `Price` (`decimal`, mellem 0,01 og 100.000) og `Stock` (`int`, mellem 0 og 1000). Alle tre regler har en dansk `ErrorMessage`",
        "`Price` har attributten `[Precision(10, 2)]` (fra `Microsoft.EntityFrameworkCore`), så databasen gemmer to decimaler",
        "Databaseklassen `LagerContext` i mappen `Data` har `DbSet<Product> Products` og startdata: 1 `Kaffe` 45,50 kr. 20 stk., 2 `Te` 30 kr. 0 stk., 3 `Kakao` 52,95 kr. 8 stk.",
        "Connection stringen hedder `LagerContext`. Windows: databasen `VareLagerDB` i LocalDB. Mac: `Data Source=lager.db`",
        "`IProductService` og `ProductService` med de samme fem metoder som i KundeApp. `ProductService` bruger `IDbContextFactory<LagerContext>`",
        "`Program.cs` registrerer fabrikken med `AddDbContextFactory` og servicen med `AddScoped`",
        "Migrationen hedder `Init` og er kørt",
        "Siden `/varer` viser navn, pris med to decimaler og `kr.`, og lager — står der 0 på lager, vises `Udsolgt`. Varerne er sorteret efter navn",
        "Menuen har punktet **Varer**"
      ],
      tip: [
        "Rækkefølgen: projekt → model → pakker → `LagerContext` → connection string → service → `Program.cs` → `Add-Migration Init` → `Update-Database` → side → menu.",
        "Prisen med to decimaler: `@p.Price.ToString(\"N2\") kr.` Lageret: `@(p.Stock == 0 ? \"Udsolgt\" : p.Stock.ToString())` — parentesen efter `@` er nødvendig, fordi udtrykket indeholder mellemrum. Står der `45.50 kr.` med punktum, kører din computer ikke med dansk kultur. Skriv så `app.UseRequestLocalization(\"da-DK\");` lige efter `var app = builder.Build();` (som i modul 18) — afprøvet: så står der `45,50 kr.`",
        "Husk `@using VareLager.Models` og `@using VareLager.Services` i `_Imports.razor`. På Mac skal `dotnet-ef` installeres i det nye projekt: `dotnet new tool-manifest` og `dotnet tool install dotnet-ef --version 10.0.12`. Sortér kun efter `Name` — SQLite kan ikke sortere efter en `decimal`."
      ],
      frag: true, fri: true,
      output: "Varer\nNavn    Pris        På lager\nKaffe   45,50 kr.   20\nKakao   52,95 kr.   8\nTe      30,00 kr.   Udsolgt",
      loesning: R`// Models/Product.cs
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace VareLager.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Skriv et navn")]
        [StringLength(50)]
        public string Name { get; set; } = "";

        [Range(0.01, 100000, ErrorMessage = "Prisen skal være mellem 0,01 og 100.000")]
        [Precision(10, 2)]
        public decimal Price { get; set; }

        [Range(0, 1000, ErrorMessage = "Lageret skal være mellem 0 og 1000")]
        public int Stock { get; set; }
    }
}

// Data/LagerContext.cs
using Microsoft.EntityFrameworkCore;
using VareLager.Models;

namespace VareLager.Data
{
    public class LagerContext : DbContext
    {
        public LagerContext(DbContextOptions<LagerContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Kaffe", Price = 45.50m, Stock = 20 },
                new Product { Id = 2, Name = "Te", Price = 30m, Stock = 0 },
                new Product { Id = 3, Name = "Kakao", Price = 52.95m, Stock = 8 });
        }
    }
}

// Services/IProductService.cs og Services/ProductService.cs:
// som ICustomerService og CustomerService, med Product, LagerContext og db.Products.
// GetAllAsync: return await db.Products.OrderBy(p => p.Name).ToListAsync();

// appsettings.json — efter "AllowedHosts": "*",
//   Windows: "ConnectionStrings": { "LagerContext": "Server=(localdb)\\MSSQLLocalDB;Database=VareLagerDB;Trusted_Connection=True;TrustServerCertificate=True" }
//   Mac:     "ConnectionStrings": { "LagerContext": "Data Source=lager.db" }

// Program.cs — under AddInteractiveServerComponents() (Mac: UseSqlite)
builder.Services.AddDbContextFactory<LagerContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("LagerContext")));
builder.Services.AddScoped<IProductService, ProductService>();

// Components/Pages/Products/ProductList.razor
@page "/varer"
@inject IProductService ProductService

<PageTitle>Varer</PageTitle>

<h1>Varer</h1>

@if (products == null)
{
    <p><em>Henter varer …</em></p>
}
else
{
    <table class="table">
        <thead>
            <tr>
                <th>Navn</th>
                <th>Pris</th>
                <th>På lager</th>
            </tr>
        </thead>
        <tbody>
            @foreach (var p in products)
            {
                <tr>
                    <td>@p.Name</td>
                    <td>@p.Price.ToString("N2") kr.</td>
                    <td>@(p.Stock == 0 ? "Udsolgt" : p.Stock.ToString())</td>
                </tr>
            }
        </tbody>
    </table>
}

@code {
    private List<Product>? products;

    protected override async Task OnInitializedAsync()
    {
        products = await ProductService.GetAllAsync();
    }
}

// NavMenu.razor — nyt menupunkt
// <div class="nav-item px-3">
//     <NavLink class="nav-link" href="varer">Varer</NavLink>
// </div>`,
      fordi: "Afprøvet med SQLite og dansk kultur: `/varer` viste Kaffe 45,50 kr. 20, Kakao 52,95 kr. 8 og Te 30,00 kr. Udsolgt. Uden `[Precision(10, 2)]` giver SQL Server en advarsel ved migrationen om, at den ikke ved, hvor mange decimaler `decimal` skal have." },

    // ------------------------------------------------------------------
    { t: "opgave", h: "VareLager: opret, ret og slet",
      md: "Gør VareLager til en fuld CRUD-app. Siderne ligner KundeApps, men tallene skal i `InputNumber`-felter.",
      krav: [
        "Siden `/varer/ny` har en `EditForm` med felter til navn, pris og lager. Pris og lager er `InputNumber`",
        "Klikker man **Opret** med tomt navn og pris 0, vises `Skriv et navn` og `Prisen skal være mellem 0,01 og 100.000`, og intet bliver gemt",
        "Efter en gyldig oprettelse står man på `/varer`, og den nye vare er på listen",
        "Siden `/varer/ret/{Id:int}` viser varen udfyldt. Skriver man 2000 på lager, vises `Lageret skal være mellem 0 og 1000`",
        "Listen har en knap **Ny vare** og i hver række **Ret** og **Slet**",
        "**Slet** spørger med browserens `confirm`: `Vil du slette Kaffe?` (med varens navn). **Annuller** sletter ingenting",
        "Opret `Juice` til 19,95 kr. med 12 på lager, ret lageret til 15, og slet den igen"
      ],
      tip: [
        "Kopiér ikke filerne fra KundeApp — skriv dem, og ret `Customer` til `Product` undervejs. Det er der, du lærer det.",
        "`<InputNumber class=\"form-control\" @bind-Value=\"product.Price\" />`. Feltet er et talfelt i browseren, og prisen skrives med punktum (`19.95`) eller med pilene. Det gemmes korrekt — afprøvet med dansk kultur. (Det var MVC's jQuery-validering, der havde problemer med komma i modul 18.)",
        "Slet: `@inject IJSRuntime JS` og `if (await JS.InvokeAsync<bool>(\"confirm\", $\"Vil du slette {p.Name}?\")) { … }`. Husk at hente listen igen bagefter."
      ],
      frag: true, fri: true,
      output: "Varer\nNavn    Pris        På lager\nJuice   19,95 kr.   15\nKaffe   45,50 kr.   20\nKakao   52,95 kr.   8\nTe      30,00 kr.   Udsolgt",
      loesning: R`@* Components/Pages/Products/CreateProduct.razor *@
@page "/varer/ny"
@inject IProductService ProductService
@inject NavigationManager Navigation

<PageTitle>Ny vare</PageTitle>

<h1>Ny vare</h1>

<EditForm Model="product" OnValidSubmit="Gem">
    <DataAnnotationsValidator />
    <ValidationSummary />

    <div class="mb-3">
        <label>Navn</label>
        <InputText class="form-control" @bind-Value="product.Name" />
    </div>
    <div class="mb-3">
        <label>Pris</label>
        <InputNumber class="form-control" @bind-Value="product.Price" />
    </div>
    <div class="mb-3">
        <label>På lager</label>
        <InputNumber class="form-control" @bind-Value="product.Stock" />
    </div>

    <button type="submit" class="btn btn-primary">Opret</button>
    <a class="btn btn-secondary" href="varer">Tilbage</a>
</EditForm>

@code {
    private Product product = new Product();

    private async Task Gem()
    {
        await ProductService.CreateAsync(product);
        Navigation.NavigateTo("/varer");
    }
}

@* Components/Pages/Products/EditProduct.razor: som CreateProduct, men med *@
@page "/varer/ret/{Id:int}"
@*   [Parameter] public int Id { get; set; }  og  private Product? product;
     OnInitializedAsync: product = await ProductService.GetByIdAsync(Id);
     @if (product == null) { Henter … } else { <EditForm …> }
     Gem: await ProductService.UpdateAsync(product!); Navigation.NavigateTo("/varer"); *@

@* ProductList.razor — nyt øverst *@
@inject IJSRuntime JS

<p><a class="btn btn-primary" href="varer/ny">Ny vare</a></p>

@* ny kolonne i hver række *@
<td>
    <a class="btn btn-sm btn-secondary" href="varer/ret/@p.Id">Ret</a>
    <button class="btn btn-sm btn-danger" @onclick="() => Slet(p)">Slet</button>
</td>

@code {
    private async Task Slet(Product p)
    {
        if (await JS.InvokeAsync<bool>("confirm", $"Vil du slette {p.Name}?"))
        {
            await ProductService.DeleteAsync(p.Id);
            products = await ProductService.GetAllAsync();
        }
    }
}`,
      fordi: "Afprøvet i en rigtig browser: valideringen viste præcis de to beskeder, Juice blev oprettet til 19,95 kr., 2000 på lager blev afvist, og confirm-dialogen viste `Vil du slette Juice?`.",
      ekstra: ["Lav en detaljeside `/varer/{Id:int}` med `OnParametersSetAsync`, der viser \"Varen findes ikke\" ved et forkert nummer.", "Giv rækker med `Udsolgt` en grå farve: `<tr class=\"@(p.Stock == 0 ? \"text-muted\" : \"\")\">`."] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "VareLager: indkøbskurv i menuen",
      md: "Den sidste opgave samler hele modulet. Butikken skal have en **kurv**. Man lægger varer i kurven fra listen, menuen viser hele tiden, hvor mange varer der er i kurven, og en side viser kurven med totalen. Kurven hører til **én browserfane**.",
      krav: [
        "Klassen `KurvState` i `Services` har en `List<Product> Varer`, et `event Action? OnChange`, en property `Total` med summen af priserne og metoderne `Tilfoej(Product product)` og `Toem()`. Begge metoder sender eventet",
        "`KurvState` er registreret med den levetid, der passer til, at kurven hører til én fane",
        "Hver række på `/varer` har knappen **Læg i kurv**. Den er slået fra (`disabled`), når varen er udsolgt",
        "Menuen har punktet **Kurv (2)** med det aktuelle antal, og tallet skifter **med det samme**, når man klikker **Læg i kurv**",
        "Siden `/kurv` viser hver vare i kurven med pris, linjen `I alt: … kr.` og knappen **Tøm kurven**. Når kurven er tom, står der `Kurven er tom.`",
        "Menuen og `/kurv` melder sig fra eventet i `Dispose`",
        "Læg Kaffe og Kakao i kurven: menuen viser **Kurv (2)**, og `/kurv` viser `I alt: 98,45 kr.` Tøm kurven: menuen viser **Kurv (0)**"
      ],
      tip: [
        "Scoped. `Total` kan være en property med `=>`: `public decimal Total => Varer.Sum(p => p.Price);`",
        "Menuen er præcis som `NavMenu` med huskelisten i lektion 6: `@inject`, `@implements IDisposable`, `OnChange += Opdater` i `OnInitialized`, `InvokeAsync(StateHasChanged)` i `Opdater` og `-=` i `Dispose`.",
        "Kald siden `KurvSide.razor` (med `@page \"/kurv\"`), ikke `Kurv.razor` — ellers rammer du CS0542, fordi `@inject KurvState Kurv` hedder det samme som klassen. Knappen: `<button … disabled=\"@(p.Stock == 0)\" @onclick=\"() => Kurv.Tilfoej(p)\">Læg i kurv</button>`."
      ],
      frag: true, fri: true,
      output: "Menu: Kurv (2)\nKurv\nKaffe: 45,50 kr.\nKakao: 52,95 kr.\nI alt: 98,45 kr.\nTøm kurven",
      loesning: R`// Services/KurvState.cs
using VareLager.Models;

namespace VareLager.Services
{
    public class KurvState
    {
        public List<Product> Varer { get; } = new List<Product>();

        public event Action? OnChange;

        public decimal Total => Varer.Sum(p => p.Price);

        public void Tilfoej(Product product)
        {
            Varer.Add(product);
            OnChange?.Invoke();
        }

        public void Toem()
        {
            Varer.Clear();
            OnChange?.Invoke();
        }
    }
}

// Program.cs
builder.Services.AddScoped<KurvState>();

@* ProductList.razor *@
@inject KurvState Kurv
<button class="btn btn-sm btn-success" disabled="@(p.Stock == 0)" @onclick="() => Kurv.Tilfoej(p)">Læg i kurv</button>

@* Components/Pages/KurvSide.razor *@
@page "/kurv"
@inject KurvState Kurv
@implements IDisposable

<PageTitle>Kurv</PageTitle>

<h1>Kurv</h1>

@if (Kurv.Varer.Count == 0)
{
    <p>Kurven er tom.</p>
}
else
{
    <ul>
        @foreach (var p in Kurv.Varer)
        {
            <li>@p.Name: @p.Price.ToString("N2") kr.</li>
        }
    </ul>
    <p><strong>I alt: @Kurv.Total.ToString("N2") kr.</strong></p>
    <button class="btn btn-secondary" @onclick="Kurv.Toem">Tøm kurven</button>
}

@code {
    protected override void OnInitialized()
    {
        Kurv.OnChange += StateHasChanged;
    }

    public void Dispose()
    {
        Kurv.OnChange -= StateHasChanged;
    }
}

@* NavMenu.razor — øverst *@
@inject KurvState Kurv
@implements IDisposable

@* menupunkt *@
<div class="nav-item px-3">
    <NavLink class="nav-link" href="kurv">Kurv (@Kurv.Varer.Count)</NavLink>
</div>

@code {
    protected override void OnInitialized()
    {
        Kurv.OnChange += Opdater;
    }

    private void Opdater()
    {
        InvokeAsync(StateHasChanged);
    }

    public void Dispose()
    {
        Kurv.OnChange -= Opdater;
    }
}`,
      fordi: "Afprøvet i en rigtig browser med dansk kultur: Te-knappen var slået fra, menuen skiftede til **Kurv (2)** ved klik, `/kurv` viste `I alt: 98,45 kr.`, og **Tøm kurven** satte menuen til **Kurv (0)**. Til eksamen kan du bruge opgaven til at forklare både DI-levetider (Scoped = én kurv pr. fane), events og `StateHasChanged`.",
      ekstra: ["Læg en **fjern**-knap ved hver vare i kurven.", "Læg samme vare i kurven flere gange, og vis den som `Kaffe × 2` i stedet for to linjer. Tip: `GroupBy` fra modul 9.", "Tilføj en knap **Køb**, der trækker de købte varer fra lageret i databasen med `UpdateAsync` og tømmer kurven."] }
  ] }
  ]
});
})();
