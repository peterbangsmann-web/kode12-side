// Modul 24 — Blazor WebAssembly og web storage. Forudsætter: modul 0–23 (især 9 JSON, 15 fetch og web storage, 17 EF Core, 19 Web API, 22–23 Blazor).
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m24", nr: 24, del: "Del 6 · SPA og Blazor", ikon: "📦",
  titel: "Blazor WebAssembly og web storage",
  dag: "Kursusdag 21 · Blazor WASM",
  intro: "I modul 22 og 23 kørte dine Blazor-komponenter på **serveren**. Med **Blazor WebAssembly** bliver selve C#-koden hentet ned og kørt **i brugerens browser**. Det giver nye muligheder, men også nye regler: hvad må ligge i browseren, og hvordan får siden data fra databasen?\n\nI dette modul bygger du én app, `ShopWasm`, trin for trin: et API på serveren, sider i browseren, der henter data med `HttpClient`, et fælles model-bibliotek, hele CRUD og en indkøbskurv, der bliver gemt i browserens **localStorage**. Til sidst lærer du render mode **Auto**, hvordan du vælger mellem Server, WebAssembly og Auto til dit eksamensprojekt, og hvordan appen publiceres.\n\nI værkstedet bygger du en ny app, `Bibliotek`, helt selv.",
  video: ["21_Man_WASM+WebStorage.mp4 (3 t 10 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m24l1", titel: "WebAssembly: C# i browseren", min: 16,
    ord: [
      ["WebAssembly (WASM)", "Et kodeformat, som alle moderne browsere kan køre hurtigt, ved siden af JavaScript. Blazor WebAssembly bruger det til at køre .NET og din C#-kode i browseren."],
      ["Blazor WebAssembly", "Den måde at køre Blazor på, hvor komponenternes C#-kode hentes ned og kører i brugerens browser i stedet for på serveren."],
      [".NET-runtime", "Den del af .NET, der får et oversat C#-program til at køre. I Blazor WebAssembly er den selv lavet om til WebAssembly og hentes ned af browseren."],
      ["Klientside", "Det, der foregår i brugerens browser. Det modsatte er serverside: det, der foregår på serveren."],
      ["Hemmelighed", "Data, som brugeren aldrig må se: adgangskoder, connection strings og API-nøgler. Hører kun til på serveren."],
      ["Cache", "Browserens lager af filer, den allerede har hentet. Næste gang bruges filen derfra i stedet for at blive hentet igen."]
    ],
    trin: [
      { t: "laes", h: "Hvor kører din kode?",
        md: "I modul 23 brugte du render mode **Interactive Server**. Der kører komponenten **på serveren**. Når brugeren klikker, sender browseren klikket til serveren over en åben SignalR-forbindelse (et *kredsløb*). Serveren kører din `@onclick`-metode og sender ændringerne i HTML'en tilbage.\n\nMed **WebAssembly** er det anderledes. Første gang brugeren åbner siden, henter browseren **selve komponentens kode** ned. Derefter kører koden **i browseren** på brugerens egen computer. Et klik bliver behandlet med det samme, uden at serveren er med.",
        noter: [
          ["Interactive Server", "Koden kører på serveren. Browseren viser kun resultatet. Kræver en åben forbindelse hele tiden."],
          ["Interactive WebAssembly", "Koden kører i browseren. Serveren sender bare filerne og svarer på API-kald."],
          ["Det samme", "Du skriver de samme `.razor`-komponenter med `@code`, `@onclick` og `@bind` i begge tilfælde. Det er stedet, de kører, der er forskelligt."]
        ] },
      { t: "valg", q: "En komponent kører med render mode **WebAssembly**. Brugeren klikker på en knap med `@onclick=\"TaelOp\"`. Hvor kører metoden `TaelOp`?",
        svar: ["I browseren, på brugerens egen computer", "På serveren, som får klikket over SignalR", "I databasen", "Først på serveren, så i browseren"],
        ret: 0, fordi: "Med WebAssembly er komponentens kode hentet ned til browseren, så metoden kører der. Det er Interactive Server, der sender klikket til serveren." },
      { t: "laes", h: "Hvad er WebAssembly?",
        md: "**WebAssembly** (forkortet **WASM**) er et kodeformat, som alle moderne browsere kan køre, ved siden af JavaScript. Det er lavet til at køre hurtigt.\n\nMicrosoft har oversat **.NET-runtimen** (den del af .NET, der får et C#-program til at køre) til WebAssembly. Når en Blazor WebAssembly-side åbnes, sker der derfor tre ting:\n\n1. Browseren henter .NET-runtimen som en `.wasm`-fil.\n2. Browseren henter dine oversatte C#-klasser og de .NET-biblioteker, de bruger.\n3. Runtimen starter din kode i browseren.",
        noter: [
          ["dotnet.js", "Et lille JavaScript, der starter det hele."],
          ["dotnet.native.wasm", ".NET-runtimen selv, lavet om til WebAssembly (ca. 3 MB)."],
          ["System.Private.CoreLib.wasm", "Grundbiblioteket med `string`, `List<T>` og alt det andet, du kender fra C#."],
          ["ShopWasm.Client.wasm", "**Din egen kode**: de komponenter, du har skrevet i klient-projektet."]
        ],
        md2: "Dine klasser ligger i `.wasm`-filer, men indeni er det stadig almindelig oversat C#, præcis som i en `.dll`. Det får betydning om lidt, når vi taler om sikkerhed." },
      { t: "valg", q: "Hvad er det, der gør, at C# kan køre i en browser med Blazor WebAssembly?",
        svar: [".NET-runtimen er lavet om til WebAssembly og hentes ned af browseren", "Browseren har C# indbygget", "C#-koden bliver oversat til JavaScript, før den sendes", "Serveren kører koden og sender billeder af siden"],
        ret: 0, fordi: "Browsere forstår JavaScript og WebAssembly. Microsoft har lavet .NET-runtimen om til WebAssembly, så browseren kan køre den, og runtimen kører så dine C#-klasser." },
      { t: "laes", h: "Prisen: en stor download første gang",
        md: "Alt det skal hentes, **før** siden kan reagere på klik. I `ShopWasm`, som du bygger i dette modul, henter browseren omkring **200 filer**, når du kører fra Visual Studio eller Rider. Når appen bliver publiceret (lektion 6), fjernes ubrugt kode, og filerne pakkes sammen: så er det omkring **50 filer** og cirka **3 MB**.\n\nTo ting gør det mindre slemt:\n\n- **Cache**: browseren gemmer filerne. Næste gang brugeren kommer, bruges de gemte filer, og siden starter hurtigt.\n- Når koden først er hentet, kører den uden serveren. Sider, der ikke skal bruge data, virker selv om serveren er gået ned. Det er grundlaget for apps, der kan virke **offline**.",
        md2: "Data fra databasen skal stadig hentes fra serveren gennem et API. Offline betyder altså: koden kører, men nye data kan ikke hentes." },
      { t: "valg", q: "En bruger åbner din Blazor WebAssembly-app for anden gang. Hvorfor starter den hurtigere end første gang?",
        svar: ["Browseren har gemt de hentede filer i sin cache og bruger dem igen", "Serveren kører koden for brugeren anden gang", "WebAssembly-filerne bliver mindre, hver gang de hentes", "Anden gang bruges Interactive Server i stedet"],
        ret: 0, fordi: "Første besøg henter runtimen og dine klasser. Browseren gemmer dem i sin **cache**, så næste besøg ikke skal hente dem igen." },
      { t: "laes", h: "Sikkerhed: alt i browseren kan læses",
        md: "Alt, hvad der sendes til browseren, ligger på **brugerens** computer. Brugeren kan åbne udviklerværktøjerne (F12), se hver fil og pakke dine klasser ud og læse dem. Det giver tre faste regler:",
        noter: [
          ["Ingen hemmeligheder i klienten", "Connection strings, adgangskoder og API-nøgler må aldrig ligge i klient-projektet, heller ikke i `wwwroot/appsettings.json`. De kan læses af alle."],
          ["Ingen direkte database", "Klienten kan ikke tale med databasen. Det ville kræve en connection string i browseren. Klienten spørger et **API** på serveren, og serveren taler med databasen."],
          ["Serveren tjekker igen", "Validering i browseren kan snydes udenom. Serveren skal selv tjekke data og rettigheder, før den gemmer eller sletter noget."]
        ],
        md2: "Kort sagt: **klienten spørger, serveren bestemmer.** Det er den vigtigste forskel på at bygge med WebAssembly og med Interactive Server, hvor komponenten selv kunne bruge `DbContext`." },
      { t: "valg", q: "Du vil gemme din connection string i `wwwroot/appsettings.json` i klient-projektet, så komponenterne kan bruge den. Hvorfor er det en dårlig idé?",
        svar: ["Filen sendes til browseren, så alle brugere kan læse connection stringen", "Filen bliver slettet, når appen publiceres", "Klient-projektet må ikke have en appsettings.json", "Connection strings virker kun i Program.cs"],
        ret: 0, fordi: "Alt i klient-projektets `wwwroot` bliver hentet ned af browseren. En hemmelighed der er ikke hemmelig mere. Connection stringen hører til i **server**-projektets `appsettings.json`." },
      { t: "valg", q: "Hvilken af disse opgaver **skal** ligge på serveren i en Blazor WebAssembly-app?",
        svar: ["At tjekke, om brugeren må slette en vare, før den slettes i databasen", "At lægge prisen på varerne i kurven sammen", "At vise en fejlbesked, når et felt i en formular er tomt", "At skifte farve på en knap, når man klikker"],
        ret: 0, fordi: "Alt, der skal **beskyttes**, skal afgøres på serveren, for koden i browseren kan ændres af brugeren. At lægge tal sammen eller vise en fejlbesked er fint i browseren, fordi det kun hjælper brugeren." },
      { t: "forudsig", q: "`OperatingSystem.IsBrowser()` giver `true`, når koden kører i en browser. Hvad skriver dette konsolprogram?",
        kode: R`Console.WriteLine(OperatingSystem.IsBrowser());
Console.WriteLine(OperatingSystem.IsWindows() || OperatingSystem.IsMacOS() || OperatingSystem.IsLinux());`,
        output: "False\nTrue",
        fordi: "Et konsolprogram kører direkte på din computers styresystem, ikke i en browser. Skriver du den samme linje i en Blazor WebAssembly-komponent, viser siden `True` (det er afprøvet). Det er den samme C#, bare et andet sted." },
      { t: "ide", h: "Opret ShopWasm, og se filerne komme",
        md: "Opret projektet, som du skal bygge videre på i hele modulet. Kør det, og se med dine egne øjne, at koden bliver hentet ned og kører i browseren.",
        win: [
          "Start Visual Studio, og vælg **Create a new project**.",
          "Søg efter **Blazor Web App**, vælg den (C#), og klik **Next**.",
          "Skriv `ShopWasm` som projektnavn, og klik **Next**.",
          "På næste skærm: vælg **.NET 10**. **Authentication type**: None. Fjern fluebenet ved **Configure for HTTPS**. **Interactive render mode**: **WebAssembly**. **Interactivity location**: **Global**. Behold fluebenet ved **Include sample pages**. Klik **Create**.",
          "I Solution Explorer ser du **to** projekter: `ShopWasm` og `ShopWasm.Client`. `ShopWasm` står med fed skrift: det er det, der starter. Står det ikke med fed, så højreklik på `ShopWasm` og vælg **Set as Startup Project**.",
          "Klik på den grønne pil ▶ (**http**). Browseren åbner.",
          "Tryk F12 i browseren, og vælg fanen **Network** (Netværk). Skriv `wasm` i filterfeltet, og genindlæs siden. Nu ser du alle `.wasm`-filerne blive hentet.",
          "Klik på **Counter** i menuen, og klik på knappen et par gange.",
          "Stop programmet i Visual Studio med den røde firkant ■, men lad browserfanen være åben. Klik på **Click me** igen. Den tæller stadig! Klik også på **Weather**: siden vises.",
          "Luk browserfanen."
        ],
        mac: [
          "Åbn programmet **Terminal**, og gå til mappen, hvor dine projekter ligger (fx `cd ~/RiderProjects`).",
          "Skriv `dotnet new blazor -n ShopWasm --interactivity WebAssembly --all-interactive --no-https` og tryk Enter. Det laver en løsning med WebAssembly som render mode for hele appen og uden HTTPS.",
          "Åbn Rider, vælg **Open**, og vælg mappen `ShopWasm` (den, hvor `ShopWasm.sln` ligger). Du ser **to** projekter: `ShopWasm` og `ShopWasm.Client`.",
          "Vælg `ShopWasm` (ikke `ShopWasm.Client`) i listen ved siden af den grønne pil øverst, og klik på den grønne pil ▶.",
          "Åbn adressen fra Run-vinduet (fx `http://localhost:5182`) i en browser.",
          "Åbn udviklerværktøjerne (højreklik på siden → **Inspect** / **Undersøg**), og vælg fanen **Network**. Skriv `wasm` i filterfeltet, og genindlæs siden. Nu ser du alle `.wasm`-filerne blive hentet.",
          "Klik på **Counter** i menuen, og klik på knappen et par gange.",
          "Stop programmet i Rider med den røde firkant ■, men lad browserfanen være åben. Klik på **Click me** igen. Den tæller stadig! Klik også på **Weather**: siden vises.",
          "Luk browserfanen."
        ],
        md2: "At knappen tæller videre, efter serveren er stoppet, er beviset: koden kører i browseren. Med Interactive Server ville siden i stedet vise, at forbindelsen er tabt." },
      { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: Hvad er Blazor WebAssembly, og hvad må aldrig ligge i klient-projektet?",
        svar: "Med Blazor WebAssembly bliver **.NET-runtimen** og mine **C#-komponenter** hentet ned til browseren som **WebAssembly** og kørt dér, på brugerens computer. Første besøg er derfor en større **download**, men filerne bliver gemt i browserens **cache**, og klik behandles uden serveren. Fordi alt i klienten kan **læses** af brugeren, må der aldrig ligge **hemmeligheder** som connection strings eller API-nøgler i klient-projektet, og klienten taler aldrig direkte med databasen. Den kalder et **API** på serveren, og serveren tjekker data og rettigheder igen.",
        noegle: ["WebAssembly", "browseren", "download", "hemmeligheder", "API", "serveren tjekker"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m24l2", titel: "ShopWasm: to projekter og et API", min: 22,
    ord: [
      ["Server-projekt", "Projektet `ShopWasm`. Kører på serveren: starter appen, sender filerne til browseren og indeholder API'et og databasen."],
      ["Klient-projekt", "Projektet `ShopWasm.Client`. Alt i det bliver hentet ned og kører i browseren: sider, layout og services."],
      ["Projektreference", "At ét projekt må bruge klasserne i et andet projekt i samme løsning. Står under Dependencies → Projects."],
      ["HttpClient", "Klassen, der sender HTTP-forespørgsler fra C#. I Blazor WebAssembly sender den dem gennem browseren til serverens API."],
      ["GetFromJsonAsync", "Sender en GET-forespørgsel og laver JSON-svaret om til C#-objekter i ét skridt."],
      ["BaseAddress", "Den adresse, HttpClient sætter foran alle relative adresser. Her den adresse, siden selv kom fra, fx `http://localhost:5182/`."],
      ["Prerendering", "At serveren laver sidens HTML færdig, før koden i browseren er klar, så brugeren hurtigt ser noget. Slået til som standard."]
    ],
    trin: [
      { t: "laes", h: "Rundtur: to projekter i én løsning",
        md: "Skabelonen har lavet **to projekter**. Reglen er enkel: **alt i `ShopWasm.Client` bliver hentet ned til browseren. Alt i `ShopWasm` bliver på serveren.**\n\nTil eksamen kan du blive spurgt, hvad filerne er til. Her er de vigtigste:",
        noter: [
          ["ShopWasm/Program.cs", "Serverens start. Registrerer services og sender filerne og siderne ud. Gennemgås linje for linje om lidt."],
          ["ShopWasm/Components/App.razor", "Rammen om hele siden: `<html>`, `<head>` og `<body>`. Her står, hvilken render mode appen bruger."],
          ["ShopWasm/Components/Pages/Error.razor", "Fejlsiden, der vises, når serveren går ned i drift."],
          ["ShopWasm/wwwroot", "Serverens statiske filer: `app.css`, Bootstrap og ikonet."],
          ["ShopWasm.Client/Program.cs", "Programmets start **i browseren**. Her registreres de services, komponenterne skal bruge, fx `HttpClient`."],
          ["ShopWasm.Client/Pages", "Dine sider: `Home.razor`, `Counter.razor`, `Weather.razor` og `NotFound.razor`."],
          ["ShopWasm.Client/Layout", "`MainLayout.razor` (rammen med menuen) og `NavMenu.razor` (selve menuen)."],
          ["ShopWasm.Client/Routes.razor", "Routeren, der finder den komponent, hvis `@page` passer til adressen."],
          ["ShopWasm.Client/_Imports.razor", "`@using`-linjer, der gælder for alle komponenter i klient-projektet."],
          ["ShopWasm.Client/wwwroot/appsettings.json", "Indstillinger til klienten. Bliver hentet ned af browseren, så der må aldrig stå hemmeligheder i den."]
        ],
        md2: "Højreklik på `ShopWasm` → Dependencies → Projects (Rider: Dependencies). Der står `ShopWasm.Client`. Server-projektet har en **projektreference** til klient-projektet: det skal kende klientens filer for at kunne sende dem til browseren." },
      { t: "valg", q: "Du vil lave en ny side, `Products.razor`, med `@page \"/products\"`, der skal køre i browseren. Hvor skal filen ligge?",
        svar: ["I `ShopWasm.Client/Pages`", "I `ShopWasm/Components/Pages`", "I `ShopWasm/wwwroot`", "I `ShopWasm/Controllers`"],
        ret: 0, fordi: "Komponenter, der skal køre med WebAssembly, skal ligge i **klient-projektet**. Kun det bliver hentet ned til browseren. `ShopWasm/Components/Pages` er til sider, der kører på serveren, som `Error.razor`." },
      { t: "laes", h: "Server-projektets Program.cs linje for linje",
        md: "Sådan ser `ShopWasm/Program.cs` ud, når du har oprettet projektet uden HTTPS. Linjerne er de samme, som du kender fra modul 22, bortset fra at der står **WebAssembly** de steder, hvor der før stod Server.",
        frag: true,
        kode: R`using ShopWasm.Client.Pages;
using ShopWasm.Components;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveWebAssemblyComponents();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
}
else
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
}
app.UseStatusCodePagesWithReExecute("/not-found", createScopeForStatusCodePages: true);
app.UseAntiforgery();

app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveWebAssemblyRenderMode()
    .AddAdditionalAssemblies(typeof(ShopWasm.Client._Imports).Assembly);

app.Run();`,
        noter: [
          ["using ShopWasm.Client.Pages;", "Skabelonen sætter den ind, men den bruges ikke. Du må gerne slette den."],
          ["AddRazorComponents()", "Slår Razor-komponenter til på serveren."],
          [".AddInteractiveWebAssemblyComponents()", "Gør serveren klar til at sende komponenter, der skal køre i browseren."],
          ["UseWebAssemblyDebugging()", "Kun under udvikling: gør det muligt at sætte breakpoints i koden, der kører i browseren."],
          ["UseExceptionHandler(\"/Error\", …)", "I drift: vis fejlsiden i stedet for en teknisk fejlbesked."],
          ["UseStatusCodePagesWithReExecute(\"/not-found\", …)", "Findes en adresse ikke (404), vises `NotFound.razor`."],
          ["UseAntiforgery()", "Beskytter formularer mod falske indsendelser fra andre sider (som `[ValidateAntiForgeryToken]` i MVC)."],
          ["MapStaticAssets()", "Sender filerne i `wwwroot`, også alle `.wasm`-filerne, ud til browseren."],
          ["MapRazorComponents<App>()", "Siderne starter i `App.razor`."],
          [".AddInteractiveWebAssemblyRenderMode()", "Slår render mode WebAssembly til."],
          [".AddAdditionalAssemblies(…)", "Fortæller serveren, at der også ligger sider (med `@page`) i klient-projektet."]
        ] },
      { t: "udfyld", frag: true, q: "Hvilke ord mangler i serverens `Program.cs`, for at komponenterne kan køre med WebAssembly, og for at serveren kan finde siderne i klient-projektet?",
        kode: R`builder.Services.AddRazorComponents()
    .AddInteractive[[WebAssembly]]Components();

var app = builder.Build();

app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveWebAssemblyRenderMode()
    .[[AddAdditionalAssemblies]](typeof(ShopWasm.Client._Imports).Assembly);`,
        fordi: "`AddInteractiveWebAssemblyComponents()` slår WebAssembly til ved services, `AddInteractiveWebAssemblyRenderMode()` ved siderne. `AddAdditionalAssemblies` peger på klient-projektet, hvor dine sider ligger." },
      { t: "laes", h: "Et API i server-projektet",
        md: "Browseren kan ikke tale med databasen. Derfor skal serveren have et **Web API**, præcis som du byggede i modul 19. Først skal der være en model. Læg den foreløbig i **klient-projektet** i en mappe `Models`, for klienten skal bruge den til at vise produkterne:",
        frag: true,
        kode: R`// ShopWasm.Client/Models/Product.cs
namespace ShopWasm.Client.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
}

// ShopWasm/Controllers/ProductsController.cs
using Microsoft.AspNetCore.Mvc;
using ShopWasm.Client.Models;

namespace ShopWasm.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private static List<Product> products = new List<Product>
    {
        new Product { Id = 1, Name = "Kaffe", Price = 45 },
        new Product { Id = 2, Name = "Te", Price = 30 },
        new Product { Id = 3, Name = "Kakao", Price = 38.5m }
    };

    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetProducts()
    {
        return products;
    }
}`,
        noter: [
          ["[Route(\"api/[controller]\")]", "Adressen bliver `api/Products`, som i modul 19."],
          ["ControllerBase", "En API-controller uden views."],
          ["using ShopWasm.Client.Models;", "Serveren kan bruge klientens `Product`, fordi server-projektet har en projektreference til klient-projektet."]
        ],
        md2: "Controllere virker kun, hvis de er slået til. Tilføj to linjer i **serverens** `Program.cs`: `builder.Services.AddControllers();` lige efter `AddRazorComponents()...;` og `app.MapControllers();` lige efter `app.MapStaticAssets();`." },
      { t: "valg", q: "Controlleren i `ShopWasm` bruger klassen `Product`, som ligger i `ShopWasm.Client`. Hvorfor virker det?",
        svar: ["Server-projektet har en projektreference til klient-projektet", "Alle projekter i en løsning kan altid se hinandens klasser", "Klient-projektet har en reference til server-projektet", "`[ApiController]` gør det muligt"],
        ret: 0, fordi: "En klasse i et andet projekt kan kun bruges, hvis der er en **projektreference**. Server-projektet har fået en reference til klient-projektet af skabelonen. Den modsatte vej findes ikke, og i næste lektion ser du, hvorfor den heller ikke må." },
      { t: "laes", h: "Hent data: HttpClient og GetFromJsonAsync",
        md: "Komponenten i browseren henter produkterne med en **`HttpClient`**: den C#-klasse, der sender HTTP-forespørgsler. Den skal først registreres i **klientens** `Program.cs`, lige før `await builder.Build().RunAsync();`:\n\n`builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });`\n\n`BaseAddress` er den adresse, siden selv kom fra, fx `http://localhost:5182/`. Så kan komponenterne skrive `\"api/products\"` i stedet for hele adressen. Og fordi API'et ligger på den samme server som siden, er der ingen CORS-problemer (modul 19).\n\nSå kan siden få en `HttpClient` med `@inject` og hente data i `OnInitializedAsync`:",
        sprog: "razor", frag: true,
        kode: R`@page "/products"
@inject HttpClient Http

<PageTitle>Produkter</PageTitle>

<h1>Produkter</h1>

@if (products == null)
{
    <p><em>Henter produkter …</em></p>
}
else
{
    <table class="table">
        <thead>
            <tr>
                <th>Navn</th>
                <th>Pris</th>
            </tr>
        </thead>
        <tbody>
            @foreach (Product p in products)
            {
                <tr>
                    <td>@p.Name</td>
                    <td>@p.Price kr.</td>
                </tr>
            }
        </tbody>
    </table>
}

@code {
    private List<Product>? products;

    protected override async Task OnInitializedAsync()
    {
        products = await Http.GetFromJsonAsync<List<Product>>("api/products");
    }
}`,
        noter: [
          ["@inject HttpClient Http", "Giv mig den registrerede `HttpClient`, og kald den `Http`."],
          ["List<Product>? products", "Starter som `null`: der er ikke hentet noget endnu."],
          ["GetFromJsonAsync<List<Product>>(\"api/products\")", "Send `GET http://localhost:5182/api/products`, vent på svaret, og lav JSON'en om til en `List<Product>`. Svarer serveren med en fejlkode (fx 404), kaster den en exception."],
          ["@if (products == null)", "Mens der ventes, vises \"Henter produkter …\". Når `products` har fået en værdi, tegner Blazor siden igen med tabellen."]
        ],
        md2: "Husk `@using ShopWasm.Client.Models` nederst i klientens `_Imports.razor`, så komponenterne kender `Product`. Priserne skrives i **browserens** sprog: med dansk browser `38,5`, med engelsk `38.5`. Koden kører jo på brugerens computer." },
      { t: "valg", q: "Siden ligger på `http://localhost:5182/products`, og `HttpClient` har `BaseAddress` sat til sidens egen adresse. Hvilken adresse kalder `Http.GetFromJsonAsync<List<Product>>(\"api/products\")`?",
        svar: ["http://localhost:5182/api/products", "http://localhost:5182/products/api/products", "http://api/products", "Databasen direkte"],
        ret: 0, fordi: "`BaseAddress` er roden af siden, `http://localhost:5182/`. Den relative adresse `api/products` sættes bag på roden. Klienten taler aldrig direkte med databasen." },
      { t: "spor", h: "Spor: hvorfor @if (products == null)?",
        q: "Koden efterligner, hvad siden viser før og efter `GetFromJsonAsync`. Skriv værdierne efter hver linje.",
        kode: R`List<string>? products = null;
string vist = products == null ? "Henter …" : products.Count + " produkter";
products = new List<string> { "Kaffe", "Te", "Kakao" };
vist = products == null ? "Henter …" : products.Count + " produkter";`,
        kolonner: ["vist", "products == null"],
        raekker: [[1, "=–", "=True"], [2, "Henter …", "True"], [3, "Henter …", "False"], [4, "3 produkter", "False"]],
        fordi: "Komponenten bliver tegnet **før** svaret fra serveren er kommet. Der er `products` stadig `null`, så siden viser \"Henter …\". Når svaret kommer (linje 3), tegner Blazor siden igen, og nu vises listen. Uden tjekket for `null` ville første tegning gå ned." },
      { t: "fejl", sprog: "razor", frag: true, logisk: true,
        q: "Siden går ned med en `NullReferenceException`, så snart den åbnes. Klik på linjen, der går galt.",
        kode: R`@page "/products"
@inject HttpClient Http

<h1>Produkter</h1>

@foreach (Product p in products)
{
    <p>@p.Name</p>
}

@code {
    private List<Product>? products;

    protected override async Task OnInitializedAsync()
    {
        products = await Http.GetFromJsonAsync<List<Product>>("api/products");
    }
}`,
        linje: 6,
        fordi: "Første gang siden tegnes, har serveren ikke svaret endnu, så `products` er `null`. `foreach` over `null` giver en `NullReferenceException`. Pak løkken ind i `@if (products == null) { … } else { … }` og vis en tekst, mens der ventes.",
        rettet: R`@page "/products"
@inject HttpClient Http

<h1>Produkter</h1>

@if (products == null)
{
    <p><em>Henter …</em></p>
}
else
{
    @foreach (Product p in products)
    {
        <p>@p.Name</p>
    }
}

@code {
    private List<Product>? products;

    protected override async Task OnInitializedAsync()
    {
        products = await Http.GetFromJsonAsync<List<Product>>("api/products");
    }
}` },
      { t: "laes", h: "Fejlen, alle møder: prerendering",
        md: "Kører du nu, får du **fejl 500**, og i konsolvinduet står:\n\n`Cannot provide a value for property 'Http' on type 'ShopWasm.Client.Pages.Products'. There is no registered service of type 'System.Net.Http.HttpClient'.`\n\nÅrsagen hedder **prerendering**. Som standard laver **serveren** først sidens HTML færdig, så brugeren hurtigt ser noget, mens `.wasm`-filerne hentes. Det betyder, at din komponent også kører én gang **på serveren**. Men `HttpClient` er kun registreret i **klientens** `Program.cs`, så på serveren findes den ikke.\n\nDen enkleste løsning er at slå prerendering fra. Ret de to linjer i `ShopWasm/Components/App.razor`:",
        sprog: "razor", frag: true,
        kode: R`<HeadOutlet @rendermode="new InteractiveWebAssemblyRenderMode(prerender: false)" />

<Routes @rendermode="new InteractiveWebAssemblyRenderMode(prerender: false)" />`,
        noter: [
          ["@rendermode=\"InteractiveWebAssembly\"", "Det, der stod før: WebAssembly **med** prerendering."],
          ["new InteractiveWebAssemblyRenderMode(prerender: false)", "WebAssembly **uden** prerendering. Komponenterne kører kun i browseren."]
        ],
        md2: "Prisen er, at siden er tom, indtil `.wasm`-filerne er hentet. Højreklikker du og vælger **Vis sidekilde**, står der næsten ingenting. Det betyder ikke noget for en app med login og data, men en offentlig hjemmeside, som Google skal kunne læse, vil man gerne prerendere." },
      { t: "valg", q: "Du kører `ShopWasm` og får fejl 500 med teksten `There is no registered service of type 'System.Net.Http.HttpClient'`. Hvad er den mest sandsynlige årsag?",
        svar: ["Siden bliver prerenderet på serveren, og der er HttpClient ikke registreret", "Du har glemt `[ApiController]` på controlleren", "Databasen er ikke oprettet", "Browseren understøtter ikke WebAssembly"],
        ret: 0, fordi: "Med prerendering kører komponenten først på serveren. `HttpClient` er kun registreret i klientens `Program.cs`. Slå prerendering fra i `App.razor` med `new InteractiveWebAssemblyRenderMode(prerender: false)`." },
      { t: "ide", h: "Vis produkterne i ShopWasm",
        md: "Byg det, du lige har læst. Skriv koden selv, og kør efter hvert trin.",
        win: [
          "Højreklik på `ShopWasm.Client` → **Add** → **New Folder**, og kald den `Models`. Lav klassen `Product` i den (højreklik på mappen → **Add** → **Class**).",
          "Lav mappen `Controllers` i **`ShopWasm`** (server-projektet) og klassen `ProductsController` i den. Skriv koden fra trinnet \"Et API i server-projektet\".",
          "Tilføj `builder.Services.AddControllers();` og `app.MapControllers();` i serverens `Program.cs`.",
          "Kør, og åbn `http://localhost:XXXX/api/products` (dit eget portnummer). Du ser JSON med tre produkter. Stop programmet.",
          "Tilføj linjen med `AddScoped(sp => new HttpClient …)` i **klientens** `Program.cs`, og `@using ShopWasm.Client.Models` nederst i klientens `_Imports.razor`.",
          "Højreklik på `ShopWasm.Client/Pages` → **Add** → **Razor Component**, og kald den `Products`. Skriv sidens kode.",
          "Tilføj et menupunkt i `ShopWasm.Client/Layout/NavMenu.razor`: kopiér blokken med `weather`, og ret `href=\"weather\"` til `href=\"products\"` og teksten til `Produkter`.",
          "Kør, og klik på **Produkter**. Får du fejl 500 med `HttpClient`, så ret `App.razor`, så prerendering er slået fra.",
          "Tryk F12 → **Network**, vælg **Fetch/XHR**, og genindlæs. Du ser forespørgslen `products` og kan klikke på den og se JSON-svaret."
        ],
        mac: [
          "Højreklik på `ShopWasm.Client` → **Add** → **Directory**, og kald den `Models`. Lav klassen `Product` i den (højreklik på mappen → **Add** → **Class/Interface**).",
          "Lav mappen `Controllers` i **`ShopWasm`** (server-projektet) og klassen `ProductsController` i den. Skriv koden fra trinnet \"Et API i server-projektet\".",
          "Tilføj `builder.Services.AddControllers();` og `app.MapControllers();` i serverens `Program.cs`.",
          "Kør, og åbn `http://localhost:XXXX/api/products` (dit eget portnummer). Du ser JSON med tre produkter. Stop programmet.",
          "Tilføj linjen med `AddScoped(sp => new HttpClient …)` i **klientens** `Program.cs`, og `@using ShopWasm.Client.Models` nederst i klientens `_Imports.razor`.",
          "Højreklik på `ShopWasm.Client/Pages` → **Add** → **File**, og kald filen `Products.razor`. Skriv sidens kode.",
          "Tilføj et menupunkt i `ShopWasm.Client/Layout/NavMenu.razor`: kopiér blokken med `weather`, og ret `href=\"weather\"` til `href=\"products\"` og teksten til `Produkter`.",
          "Kør, og klik på **Produkter**. Får du fejl 500 med `HttpClient`, så ret `App.razor`, så prerendering er slået fra.",
          "Åbn udviklerværktøjerne → **Network**, vælg **Fetch/XHR**, og genindlæs. Du ser forespørgslen `products` og kan klikke på den og se JSON-svaret."
        ],
        output: "[{\"id\":1,\"name\":\"Kaffe\",\"price\":45},{\"id\":2,\"name\":\"Te\",\"price\":30},{\"id\":3,\"name\":\"Kakao\",\"price\":38.5}]",
        md2: "JSON'en ovenfor er svaret på `api/products`. Siden viser de samme tre produkter i en tabel." },
      { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: Hvordan får en side i Blazor WebAssembly vist data, der ligger på serveren?",
        svar: "Siden kører i **browseren** og kan ikke tale med databasen. Den får en **HttpClient** med `@inject`, som er registreret i klientens `Program.cs` med sidens egen adresse som **BaseAddress**. I `OnInitializedAsync` kalder den `GetFromJsonAsync<List<Product>>(\"api/products\")`. Det sender en **GET** til serverens **API-controller**, som svarer med **JSON**, og JSON'en bliver lavet om til C#-objekter. Indtil svaret er kommet, er listen `null`, så siden viser en ventetekst med `@if`.",
        noegle: ["HttpClient", "@inject", "GetFromJsonAsync", "API", "JSON", "null"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m24l3", titel: "Fælles model-bibliotek og hele CRUD", min: 24,
    ord: [
      ["Class Library (klassebibliotek)", "Et projekt uden `Program.cs`, der kun indeholder klasser. Det kan ikke køre selv, men andre projekter kan bruge det."],
      ["Shared-projekt", "Et klassebibliotek med de klasser, både klient og server skal bruge, typisk modellerne. Her `ShopWasm.Shared`."],
      ["Cirkulær reference", "Når to projekter peger på hinanden. Det er ikke tilladt, for så ved .NET ikke, hvilket der skal bygges først."],
      ["PostAsJsonAsync", "Laver et objekt om til JSON og sender det med en POST. Giver et `HttpResponseMessage` tilbage."],
      ["PutAsJsonAsync", "Som PostAsJsonAsync, men med PUT: bruges til at rette."],
      ["DeleteAsync", "Sender en DELETE-forespørgsel til en adresse."],
      ["HttpResponseMessage", "Serverens svar: statuskode, headers og indhold."],
      ["IsSuccessStatusCode", "`true`, hvis statuskoden er i 200-området (fx 200, 201, 204)."]
    ],
    trin: [
      { t: "laes", h: "Hvorfor modellen ikke skal ligge i klienten",
        md: "Lige nu ligger `Product` i klient-projektet, og serveren låner den gennem sin projektreference. Det virker, men det er ikke en god opdeling:\n\n- Serveren afhænger nu af hele brugerfladen bare for at få én klasse.\n- Klienten kan ikke få en reference til serveren, for så pegede de to projekter på hinanden. Det hedder en **cirkulær reference**, og den er ikke tilladt.\n- Alt i klient-projektet bliver sendt til browseren. Kode, der kun hører til på serveren, må aldrig havne der.\n\nLøsningen er et tredje projekt: et **klassebibliotek** (*Class Library*) med navnet `ShopWasm.Shared`. Det indeholder kun modellerne. **Både** klient og server får en reference til det. Så er der én `Product`-klasse, som begge sider bruger, og ingen af dem afhænger af den anden.",
        noter: [
          ["ShopWasm.Shared", "Modellerne. Ingen sider, ingen database."],
          ["ShopWasm.Client → ShopWasm.Shared", "Klienten bruger `Product` til at vise og sende data."],
          ["ShopWasm → ShopWasm.Shared", "Serveren bruger `Product` i API'et og senere i databasen."],
          ["ShopWasm → ShopWasm.Client", "Den fandtes i forvejen: serveren skal kunne sende klientens filer til browseren."]
        ] },
      { t: "valg", q: "Hvorfor kan `ShopWasm.Client` ikke bare få en projektreference til `ShopWasm` (serveren) og bruge modellen derfra?",
        svar: ["Serveren har allerede en reference til klienten, så det ville blive en cirkulær reference", "Klient-projekter må slet ikke have projektreferencer", "Modeller må kun ligge i server-projekter", "Det ville gøre API'et langsommere"],
        ret: 0, fordi: "`ShopWasm` peger allerede på `ShopWasm.Client`. Pegede klienten tilbage, ville de to projekter afhænge af hinanden, og .NET kan ikke afgøre, hvad der skal bygges først. Et fælles bibliotek, som begge peger på, løser det." },
      { t: "ide", h: "Opret ShopWasm.Shared, og flyt modellen",
        md: "Lav biblioteket, giv begge projekter en reference til det, og flyt `Product` derover.",
        win: [
          "Højreklik på **løsningen** øverst i Solution Explorer → **Add** → **New Project**.",
          "Vælg **Class Library** (C#), klik **Next**, kald den `ShopWasm.Shared`, klik **Next**, vælg **.NET 10**, og klik **Create**.",
          "Slet `Class1.cs` i det nye projekt.",
          "Højreklik på **Dependencies** under `ShopWasm.Client` → **Add Project Reference**. Sæt flueben ved `ShopWasm.Shared`, og klik **OK**.",
          "Gør det samme under `ShopWasm` (serveren).",
          "Træk `Product.cs` fra `ShopWasm.Client/Models` over i `ShopWasm.Shared`. Ret første linje i filen til `namespace ShopWasm.Shared;`. Slet den tomme mappe `Models`.",
          "Ret `using ShopWasm.Client.Models;` til `using ShopWasm.Shared;` i controlleren, og `@using ShopWasm.Client.Models` til `@using ShopWasm.Shared` i klientens `_Imports.razor`.",
          "Byg løsningen (**Build** → **Build Solution**). Der må ikke være røde fejl. Kør, og tjek, at produkterne stadig vises."
        ],
        mac: [
          "Luk Rider. Åbn Terminal i mappen `ShopWasm` (den med `ShopWasm.sln`).",
          "Skriv `dotnet new classlib -n ShopWasm.Shared` og tryk Enter. Det laver klassebiblioteket.",
          "Skriv `dotnet sln add ShopWasm.Shared` og tryk Enter. Nu hører det med til løsningen.",
          "Skriv `dotnet add ShopWasm.Client reference ShopWasm.Shared` og derefter `dotnet add ShopWasm reference ShopWasm.Shared`. Nu har begge projekter en reference.",
          "Åbn løsningen i Rider igen. Slet `Class1.cs` i `ShopWasm.Shared`.",
          "Træk `Product.cs` fra `ShopWasm.Client/Models` over i `ShopWasm.Shared`. Ret første linje i filen til `namespace ShopWasm.Shared;`. Slet den tomme mappe `Models`.",
          "Ret `using ShopWasm.Client.Models;` til `using ShopWasm.Shared;` i controlleren, og `@using ShopWasm.Client.Models` til `@using ShopWasm.Shared` i klientens `_Imports.razor`.",
          "Byg løsningen (**Build** → **Build Solution**). Der må ikke være røde fejl. Kør, og tjek, at produkterne stadig vises."
        ],
        md2: "Projektreferencen står nu i `.csproj`-filerne som `<ProjectReference Include=\"..\\ShopWasm.Shared\\ShopWasm.Shared.csproj\" />`. Det er det, Visual Studio og `dotnet add reference` skriver for dig." },
      { t: "laes", h: "Valideringsregler ét sted",
        md: "Nu hvor `Product` er fælles, kan du skrive valideringsreglerne **én gang**. De samme attributter, du brugte i MVC (modul 16) og Blazor-formularer (modul 22), virker begge steder:",
        frag: true,
        kode: R`using System.ComponentModel.DataAnnotations;

namespace ShopWasm.Shared;

public class Product
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Skriv et navn")]
    [StringLength(50)]
    public string Name { get; set; } = "";

    [Range(1, 10000, ErrorMessage = "Prisen skal være mellem 1 og 10000")]
    public decimal Price { get; set; }
}`,
        noter: [
          ["I browseren", "`<DataAnnotationsValidator />` i en `EditForm` læser attributterne og viser fejl, **før** noget bliver sendt. Hurtigt for brugeren."],
          ["På serveren", "`[ApiController]` læser de **samme** attributter og svarer selv **400 Bad Request**, hvis data er ugyldige. Det beskytter mod nogen, der sender data uden om din side."],
          ["ErrorMessage", "Den tekst, der vises. Uden den skriver .NET en engelsk standardtekst."]
        ],
        md2: "Sender nogen `{\"name\":\"\",\"price\":0}` direkte til `POST api/products`, svarer serveren (afprøvet):\n\n`400 Bad Request` med `\"errors\":{\"Name\":[\"Skriv et navn\"],\"Price\":[\"Prisen skal være mellem 1 og 10000\"]}`" },
      { t: "valg", q: "En bruger springer din side over og sender en POST med en tom `name` direkte til `api/products` (fx med en `.http`-fil). `Product` ligger i `ShopWasm.Shared` med `[Required]` på `Name`. Hvad sker der?",
        svar: ["Serveren svarer 400 Bad Request, fordi [ApiController] tjekker de samme attributter", "Produktet bliver gemt uden navn, fordi valideringen kun sker i browseren", "Serveren går ned med fejl 500", "Browseren stopper forespørgslen"],
        ret: 0, fordi: "Valideringen sker **begge** steder, fordi begge bruger den samme klasse. Browserens tjek er for brugerens skyld. Serverens tjek er det, der beskytter dine data." },
      { t: "forudsig", q: "`PostAsJsonAsync` laver objektet om til JSON med web-indstillingerne (små forbogstaver), før det sendes. Hvad bliver sendt til serveren?",
        kode: R`using System.Text.Json;

Product ny = new Product { Name = "Juice", Price = 22.5m };

JsonSerializerOptions web = new JsonSerializerOptions(JsonSerializerDefaults.Web);
Console.WriteLine(JsonSerializer.Serialize(ny, web));

class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
}`,
        output: "{\"id\":0,\"name\":\"Juice\",\"price\":22.5}",
        fordi: "Et nyt produkt har endnu ikke fået et id, så `Id` er 0 (standardværdien for `int`). Serveren giver det et rigtigt id. JSON bruger altid punktum i tal, også på en dansk computer." },
      { t: "laes", h: "Serverens CRUD-actions",
        md: "Før klienten kan oprette, rette og slette, skal API'et kunne det. Det er de samme actions som i modul 19. Tilføj et felt med det næste id og fire actions til `ProductsController` (under `GetProducts`):",
        frag: true,
        kode: R`private static int naesteId = 4;

[HttpGet("{id}")]
public ActionResult<Product> GetProduct(int id)
{
    Product? product = products.Find(p => p.Id == id);
    if (product == null)
    {
        return NotFound();
    }
    return product;
}

[HttpPost]
public ActionResult<Product> PostProduct(Product product)
{
    product.Id = naesteId;
    naesteId++;
    products.Add(product);
    return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
}

[HttpPut("{id}")]
public IActionResult PutProduct(int id, Product changed)
{
    Product? product = products.Find(p => p.Id == id);
    if (product == null)
    {
        return NotFound();
    }
    product.Name = changed.Name;
    product.Price = changed.Price;
    return NoContent();
}

[HttpDelete("{id}")]
public IActionResult DeleteProduct(int id)
{
    Product? product = products.Find(p => p.Id == id);
    if (product == null)
    {
        return NotFound();
    }
    products.Remove(product);
    return NoContent();
}`,
        noter: [
          ["static", "Listen og `naesteId` er `static`, fordi der laves en ny controller til hver forespørgsel. Uden `static` ville alt være glemt til næste forespørgsel."],
          ["CreatedAtAction(…)", "Svarer **201 Created** med det nye produkt."],
          ["NoContent()", "Svarer **204**: det lykkedes, men der er intet at sende tilbage."],
          ["NotFound()", "Svarer **404**: der er intet produkt med det id."]
        ] },
      { t: "laes", h: "Opret: PostAsJsonAsync",
        md: "Opret-siden er en `EditForm`, som du kender fra modul 22. Når formularen er gyldig, sender `PostAsJsonAsync` produktet til API'et. Svaret er et **`HttpResponseMessage`**, og `IsSuccessStatusCode` fortæller, om det lykkedes. Så sender **`NavigationManager`** (modul 23) brugeren tilbage til listen.",
        sprog: "razor", frag: true,
        kode: R`@page "/products/create"
@inject HttpClient Http
@inject NavigationManager Nav

<PageTitle>Opret produkt</PageTitle>

<h1>Opret produkt</h1>

<EditForm Model="product" OnValidSubmit="Save">
    <DataAnnotationsValidator />
    <div class="mb-3">
        <label>Navn</label>
        <InputText class="form-control" @bind-Value="product.Name" />
        <ValidationMessage For="() => product.Name" />
    </div>
    <div class="mb-3">
        <label>Pris</label>
        <InputNumber class="form-control" @bind-Value="product.Price" />
        <ValidationMessage For="() => product.Price" />
    </div>
    <button type="submit" class="btn btn-primary">Gem</button>
    <a href="products">Tilbage</a>
</EditForm>

<p class="text-danger">@fejl</p>

@code {
    private Product product = new Product();
    private string fejl = "";

    private async Task Save()
    {
        HttpResponseMessage response = await Http.PostAsJsonAsync("api/products", product);
        if (response.IsSuccessStatusCode)
        {
            Nav.NavigateTo("products");
        }
        else
        {
            fejl = $"Serveren svarede {(int)response.StatusCode}";
        }
    }
}`,
        noter: [
          ["InputNumber", "Som `InputText`, men til tal. Bindes til `decimal`-propertyen `Price`."],
          ["ValidationMessage For=\"() => product.Name\"", "Viser fejlteksten for ét bestemt felt lige under det."],
          ["OnValidSubmit=\"Save\"", "`Save` kaldes kun, når alle regler i `Product` er opfyldt."],
          ["PostAsJsonAsync(\"api/products\", product)", "Send produktet som JSON med en POST, og vent på svaret."],
          ["(int)response.StatusCode", "Statuskoden som tal, fx 400 eller 500."]
        ] },
      { t: "udfyld", sprog: "razor", frag: true, q: "Udfyld `Save`, så produktet bliver sendt med en POST, og brugeren kommer tilbage til listen, hvis det lykkedes.",
        kode: R`@code {
    private Product product = new Product();

    private async Task Save()
    {
        HttpResponseMessage response = await Http.[[PostAsJsonAsync]]("api/products", product);
        if (response.[[IsSuccessStatusCode]])
        {
            Nav.[[NavigateTo]]("products");
        }
    }
}`,
        fordi: "`PostAsJsonAsync` sender objektet som JSON. `IsSuccessStatusCode` er `true` ved 201 Created. `NavigateTo` skifter side i browseren uden at genindlæse appen." },
      { t: "laes", h: "Ret og slet: PutAsJsonAsync og DeleteAsync",
        md: "Ret-siden får id'et fra adressen, ligesom i modul 23 (`@page \"/products/edit/{Id:int}\"` og en `[Parameter] public int Id`). Den henter produktet med `GetFromJsonAsync<Product>`, viser den samme formular og gemmer med **PUT**. Slet er bare en knap på listen.",
        frag: true,
        kode: R`// I ProductEdit.razor
protected override async Task OnInitializedAsync()
{
    product = await Http.GetFromJsonAsync<Product>($"api/products/{Id}");
}

private async Task Save()
{
    HttpResponseMessage response = await Http.PutAsJsonAsync($"api/products/{Id}", product);
    if (response.IsSuccessStatusCode)
    {
        Nav.NavigateTo("products");
    }
}

// I Products.razor
private async Task Delete(int id)
{
    HttpResponseMessage response = await Http.DeleteAsync($"api/products/{id}");
    if (response.IsSuccessStatusCode)
    {
        products = await Http.GetFromJsonAsync<List<Product>>("api/products");
    }
}`,
        noter: [
          ["PutAsJsonAsync($\"api/products/{Id}\", product)", "Send det rettede produkt med PUT til `api/products/2`. Serveren svarer 204."],
          ["DeleteAsync($\"api/products/{id}\")", "Send DELETE. Der er intet objekt med, kun adressen."],
          ["products = await Http.GetFromJsonAsync…", "Hent listen igen, så det slettede produkt forsvinder fra skærmen."]
        ],
        md2: "Knapperne i tabellen på listen:\n\n`<a class=\"btn btn-secondary btn-sm\" href=\"products/edit/@p.Id\">Ret</a>`\n\n`<button class=\"btn btn-danger btn-sm\" @onclick=\"() => Delete(p.Id)\">Slet</button>`\n\n`() => Delete(p.Id)` er et lambda-udtryk (modul 10): \"når der klikkes, så kald `Delete` med dette produkts id\"." },
      { t: "orden", frag: true, q: "Sæt linjerne i rækkefølge, så `Save` på ret-siden sender produktet med PUT og går tilbage til listen, hvis det lykkedes.",
        linjer: [
          R`private async Task Save()`,
          R`{`,
          R`    HttpResponseMessage response = await Http.PutAsJsonAsync($"api/products/{Id}", product);`,
          R`    if (response.IsSuccessStatusCode)`,
          R`    {`,
          R`        Nav.NavigateTo("products");`,
          R`    }`,
          R`}`
        ],
        fordi: "Først sendes forespørgslen, og der ventes på svaret. Så tjekkes statuskoden, og kun ved succes skiftes der side." },
      { t: "valg", q: "Brugeren klikker **Slet** ved produkt 2. Klienten kalder `Http.DeleteAsync(\"api/products/2\")`. Hvad sker der?",
        svar: ["Der sendes DELETE til serveren, DeleteProduct sletter produktet og svarer 204, og IsSuccessStatusCode er true", "Produktet slettes i browseren, og serveren får det at vide næste gang", "Der sendes en POST, fordi formularer altid bruger POST", "DeleteAsync sletter produktet direkte i databasen"],
        ret: 0, fordi: "Klienten sender kun en forespørgsel. Det er serverens `[HttpDelete(\"{id}\")]`-action, der sletter og svarer **204 No Content**. 204 ligger i 200-området, så `IsSuccessStatusCode` er `true`." },
      { t: "ide", h: "Hele CRUD i ShopWasm",
        md: "Byg opret, ret og slet. Kør og afprøv efter hver side.",
        win: [
          "Tilføj valideringsattributterne til `Product` i `ShopWasm.Shared` (husk `using System.ComponentModel.DataAnnotations;`).",
          "Tilføj `naesteId` og de fire nye actions i `ProductsController`.",
          "Lav `ProductCreate.razor` i `ShopWasm.Client/Pages` med koden fra trinnet \"Opret\". Tilføj linket `<p><a href=\"products/create\">Opret nyt produkt</a></p>` under overskriften på listen.",
          "Kør, og opret produktet `Juice` til `22,5`. Prøv også at gemme uden navn: fejlteksten vises, og der sendes ingenting (se i **Network**).",
          "Lav `ProductEdit.razor` med `@page \"/products/edit/{Id:int}\"`, `[Parameter] public int Id { get; set; }`, `private Product? product;`, en `@if (product == null)` med \"Henter …\", og den samme formular som på opret-siden. Brug `OnInitializedAsync` og `Save` fra trinnet \"Ret og slet\".",
          "Tilføj en tom `<th></th>` i tabelhovedet og en `<td>` med knapperne **Ret** og **Slet** i hver række på listen, og skriv `Delete`-metoden.",
          "Kør, ret prisen på Kaffe, og slet Juice. Kig i **Network**: du ser `PUT` og `DELETE` og statuskoden 204."
        ],
        md2: "Listen ligger stadig i hukommelsen på serveren. Stopper du programmet, er dine ændringer væk. Det løser du med en database i lektion 6." },
      { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: Hvorfor har din Blazor WebAssembly-løsning tre projekter, og hvad ligger i hvert?",
        svar: "**Server**-projektet starter appen, sender filerne til browseren og har **API-controlleren** og senere databasen. **Klient**-projektet har siderne og layoutet. Det hentes ned og kører i **browseren** og henter data fra API'et med **HttpClient**. **Shared**-projektet er et **klassebibliotek** med modellerne, fx `Product`. Både klient og server har en **projektreference** til det, så der kun er én klasse, og **valideringsattributterne** gælder begge steder: i browseren for at hjælpe brugeren og på serveren for at beskytte data. Klienten kan ikke pege på serveren, for så ville det blive en **cirkulær reference**.",
        noegle: ["server", "klient", "Shared", "projektreference", "API", "validering", "cirkulær"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m24l4", titel: "Web storage: kurven gemmes i browseren", min: 24,
    ord: [
      ["Web storage", "Browserens lille lager til tekst, som en side kan gemme på brugerens computer. Findes i to udgaver: localStorage og sessionStorage."],
      ["localStorage", "Gemmer tekst under en nøgle. Bliver liggende, også når browseren lukkes, indtil siden eller brugeren sletter det."],
      ["sessionStorage", "Som localStorage, men gælder kun den ene fane og slettes, når fanen lukkes."],
      ["Cookie", "En lille tekst, som browseren sender med til serveren ved **hver** forespørgsel. Bruges fx til at huske, at man er logget ind."],
      ["JS interop", "At kalde JavaScript fra C# (eller omvendt) i Blazor."],
      ["IJSRuntime", "Den service, der lader en Blazor-komponent kalde JavaScript-funktioner i browseren."],
      ["Serialisere", "At lave et objekt om til tekst, typisk JSON. Det modsatte hedder at deserialisere."],
      ["ProtectedLocalStorage", "En .NET-klasse til Interactive Server, der krypterer data, før de lægges i localStorage."]
    ],
    trin: [
      { t: "laes", h: "Hvor gemmer man det, brugeren ikke har gemt?",
        md: "En indkøbskurv skal kunne overleve, at brugeren lukker browseren, men det er for tidligt at gemme den i databasen: brugeren er måske ikke engang logget ind. Browseren har selv nogle små lagre til den slags. Du mødte dem i modul 15 med JavaScript:",
        noter: [
          ["localStorage", "Ca. 5 MB pr. side. Bliver liggende, når browseren lukkes. Sendes **ikke** til serveren."],
          ["sessionStorage", "Ca. 5 MB. Gælder kun **den ene fane**. Slettes, når fanen lukkes. Sendes ikke til serveren."],
          ["Cookie", "Ca. 4 KB. Sendes med til serveren ved **hver** forespørgsel. Har en udløbsdato."],
          ["Database", "Gemmes på serveren. Kræver typisk, at man ved, hvem brugeren er."]
        ],
        md2: "Fælles for localStorage og sessionStorage: de gemmer kun **tekst**, under en **nøgle**, og hver hjemmeside (hver adresse med port, fx `http://localhost:5182`) har sit eget lager. Data ligger på brugerens computer, så alt kan læses og ændres af brugeren. Derfor gemmer man aldrig adgangskoder eller andre hemmeligheder der." },
      { t: "valg", q: "Kurven i ShopWasm skal stadig være der, når brugeren lukker browseren og kommer tilbage næste dag. Hvilket lager passer bedst?",
        svar: ["localStorage", "sessionStorage", "En variabel i komponenten", "En cookie, der sendes til serveren ved hvert klik"],
        ret: 0, fordi: "localStorage bliver liggende, til nogen sletter det. sessionStorage forsvinder, når fanen lukkes, og en variabel forsvinder allerede, når siden genindlæses. En cookie ville blive sendt med til serveren hver gang uden grund." },
      { t: "valg", q: "En formular over flere sider skal huske det, brugeren har skrevet, mens hun klikker frem og tilbage. Men åbner hun en ny fane, skal den starte forfra, og lukker hun fanen, skal alt være glemt. Hvilket lager passer?",
        svar: ["sessionStorage", "localStorage", "En cookie", "Databasen"],
        ret: 0, fordi: "sessionStorage gælder kun den ene fane og slettes, når fanen lukkes. Det er præcis \"husk det lige nu, glem det bagefter\"." },
      { t: "laes", h: "Prøv det i browserens konsol",
        md: "localStorage er JavaScript. Du kan prøve det uden en linje C#: åbn en side, tryk F12, vælg **Console**, og skriv linjerne én ad gangen.",
        sprog: "js",
        kode: R`localStorage.setItem("navn", "Peter");
localStorage.getItem("navn");
localStorage.getItem("findesIkke");
localStorage.removeItem("navn");
sessionStorage.setItem("fane", "kun her");`,
        noter: [
          ["setItem(nøgle, værdi)", "Gem teksten under nøglen. Findes nøglen, bliver værdien overskrevet."],
          ["getItem(nøgle)", "Hent teksten. Giver `'Peter'`."],
          ["getItem(\"findesIkke\")", "En nøgle, der ikke findes, giver `null`."],
          ["removeItem(nøgle)", "Slet nøglen og dens værdi."]
        ],
        md2: "Under fanen **Application** (Chrome/Edge) → **Local storage** og **Session storage** kan du se og slette alt, siden har gemt." },
      { t: "laes", h: "JS interop: kald JavaScript fra C#",
        md: "Din komponent er C#, og localStorage er JavaScript. Broen hedder **JS interop**. Du får servicen **`IJSRuntime`** med `@inject` (eller gennem konstruktøren i en service-klasse), og så kan du kalde en JavaScript-funktion ved at skrive dens navn som tekst:",
        frag: true,
        kode: R`@inject IJSRuntime JS

@code {
    private string? navn;

    private async Task Gem()
    {
        await JS.InvokeVoidAsync("localStorage.setItem", "navn", "Peter");
    }

    private async Task Hent()
    {
        navn = await JS.InvokeAsync<string?>("localStorage.getItem", "navn");
    }
}`,
        noter: [
          ["IJSRuntime JS", "Broen til JavaScript. Allerede registreret af Blazor, så du kan bare bruge `@inject`."],
          ["InvokeVoidAsync(\"localStorage.setItem\", …)", "Kald en JavaScript-funktion, der **ikke** giver noget tilbage. Første argument er funktionens navn, resten er dens argumenter."],
          ["InvokeAsync<string?>(\"localStorage.getItem\", …)", "Kald en funktion, der giver noget tilbage. Typen i `< >` siger, hvad det skal laves om til. `string?`, fordi en nøgle, der ikke findes, giver `null`."],
          ["await", "Kaldet går over broen til JavaScript, så det er asynkront."]
        ],
        md2: "I Blazor WebAssembly kører JavaScript og din C# i samme browser, så kaldet er hurtigt. `using Microsoft.JSInterop` står allerede i `_Imports.razor`." },
      { t: "udfyld", sprog: "razor", frag: true, q: "Gem farven `\"blå\"` under nøglen `\"farve\"` i localStorage, og hent den igen bagefter.",
        kode: R`@inject IJSRuntime JS

@code {
    private string? farve;

    private async Task GemOgHent()
    {
        await JS.[[InvokeVoidAsync]]("localStorage.setItem", "farve", "blå");
        farve = await JS.InvokeAsync<[[string?]]>("localStorage.[[getItem]]", "farve");
    }
}`,
        fordi: "`setItem` giver intet tilbage, så den kaldes med `InvokeVoidAsync`. `getItem` giver en tekst eller `null`, så den kaldes med `InvokeAsync<string?>`." },
      { t: "forudsig", q: "localStorage kan kun gemme tekst. Derfor laver kurven sine varer om til JSON, før de gemmes. `JsonSerializer` uden indstillinger beholder de store forbogstaver. Hvad bliver gemt?",
        kode: R`using System.Text.Json;

List<CartItem> items = new List<CartItem>
{
    new CartItem { ProductId = 1, Name = "Kaffe", Price = 45, Quantity = 2 }
};

string json = JsonSerializer.Serialize(items);
Console.WriteLine(json);

List<CartItem>? igen = JsonSerializer.Deserialize<List<CartItem>>(json);
Console.WriteLine(igen![0].Quantity);

class CartItem
{
    public int ProductId { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}`,
        output: "[{\"ProductId\":1,\"Name\":\"Kaffe\",\"Price\":45,\"Quantity\":2}]\n2",
        fordi: "`Serialize` laver listen om til en JSON-tekst med `[ ]` og `{ }`. Det er præcis den tekst, du ser under Application → Local storage i browseren. `Deserialize` laver teksten om til objekter igen, så `Quantity` er tallet 2. `!` efter `igen` siger til compileren: \"jeg ved, den ikke er null her\"." },
      { t: "laes", h: "CartService: kurven som en service",
        md: "Kurven skal bruges på to sider: produktlisten (læg i kurv) og kurv-siden (vis kurven). Derfor lægges den i en **service-klasse**, ligesom i modul 23, som begge sider får med `@inject`. Servicen får `IJSRuntime` gennem sin konstruktør. Læg den i en ny mappe `Services` i **klient-projektet**:",
        frag: true,
        kode: R`using System.Text.Json;
using Microsoft.JSInterop;
using ShopWasm.Shared;

namespace ShopWasm.Client.Services;

public class CartService
{
    private readonly IJSRuntime _js;

    public CartService(IJSRuntime js)
    {
        _js = js;
    }

    public List<CartItem> Items { get; private set; } = new List<CartItem>();

    public decimal Total => Items.Sum(i => i.Price * i.Quantity);

    public async Task LoadAsync()
    {
        string? json = await _js.InvokeAsync<string?>("localStorage.getItem", "cart");
        if (json != null)
        {
            Items = JsonSerializer.Deserialize<List<CartItem>>(json) ?? new List<CartItem>();
        }
    }

    public async Task AddAsync(Product product)
    {
        CartItem? item = Items.Find(i => i.ProductId == product.Id);
        if (item == null)
        {
            Items.Add(new CartItem { ProductId = product.Id, Name = product.Name, Price = product.Price, Quantity = 1 });
        }
        else
        {
            item.Quantity++;
        }
        await SaveAsync();
    }

    public async Task ClearAsync()
    {
        Items.Clear();
        await _js.InvokeVoidAsync("localStorage.removeItem", "cart");
    }

    private async Task SaveAsync()
    {
        string json = JsonSerializer.Serialize(Items);
        await _js.InvokeVoidAsync("localStorage.setItem", "cart", json);
    }
}`,
        noter: [
          ["CartItem", "En lille klasse i samme mappe med `ProductId`, `Name`, `Price` og `Quantity` (alle med `{ get; set; }`)."],
          ["private set", "Andre klasser kan læse `Items`, men kun `CartService` kan udskifte listen."],
          ["Total => …", "En property, der regnes ud, hver gang den læses: pris gange antal for hver linje, lagt sammen."],
          ["LoadAsync", "Hent JSON-teksten fra localStorage, og lav den om til en liste. Findes nøglen ikke endnu, beholdes den tomme liste."],
          ["?? new List<CartItem>()", "Giver `Deserialize` `null`, bruges en tom liste i stedet."],
          ["AddAsync", "Ligger varen i kurven, tælles antallet op. Ellers lægges en ny linje i. Bagefter gemmes hele kurven."],
          ["SaveAsync", "Lav listen om til JSON, og gem den under nøglen `cart`."]
        ],
        md2: "Registrér servicen i **klientens** `Program.cs`: `builder.Services.AddScoped<CartService>();` (med `using ShopWasm.Client.Services;` øverst), og skriv `@using ShopWasm.Client.Services` i `_Imports.razor`. I WebAssembly lever en scoped service, så længe fanen er åben, så alle sider deler den samme kurv." },
      { t: "spor", h: "Spor: AddAsync lægger i kurven",
        q: "Koden gør det samme som `AddAsync`, når brugeren klikker **Læg i kurv** ved Kaffe (id 1), Kaffe igen og Kakao (id 3). Skriv værdierne efter hver linje.",
        kode: R`List<CartItem> items = new List<CartItem>();
CartItem? item = items.Find(i => i.ProductId == 1);
items.Add(new CartItem { ProductId = 1, Quantity = 1 });
item = items.Find(i => i.ProductId == 1);
item!.Quantity++;
item = items.Find(i => i.ProductId == 3);
items.Add(new CartItem { ProductId = 3, Quantity = 1 });`,
        omkring: ["", R`class CartItem
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}`],
        kolonner: ["items.Count", "items[0].Quantity"],
        raekker: [[1, "=0", "=–"], [2, "=0", "=–"], [3, "1", "1"], [4, "1", "1"], [5, "1", "2"], [6, "1", "2"], [7, "2", "2"]],
        fordi: "Første klik: `Find` giver `null`, så der lægges en ny linje i. Andet klik: Kaffe findes, så **antallet** tælles op, og der kommer ikke en ny linje. Tredje klik: Kakao findes ikke, så der kommer en linje mere. Til sidst er der 2 linjer, og Kaffe har antal 2. Sæt et breakpoint i `AddAsync`, og se det samme i debuggeren." },
      { t: "fejl", sprog: "razor", frag: true,
        q: "Kurv-siden hedder `Cart.razor`. Projektet kan ikke bygges, og compileren siger: `CS0542: 'Cart': member names cannot be the same as their enclosing type`. Klik på linjen, der giver fejlen.",
        kode: R`@page "/cart"
@inject CartService Cart

<h1>Kurv</h1>

<p>I alt: @Cart.Total kr.</p>

@code {
    protected override async Task OnInitializedAsync()
    {
        await Cart.LoadAsync();
    }
}`,
        linje: 2,
        fordi: "En `.razor`-fil bliver til en klasse med filens navn: `Cart.razor` bliver klassen `Cart`. `@inject CartService Cart` laver en property, der også hedder `Cart`, og en klasse må ikke have et medlem med sit eget navn. Omdøb filen til fx `CartPage.razor` (adressen `@page \"/cart\"` er den samme), eller kald den injicerede service noget andet.",
        rettet: R`@page "/cart"
@inject CartService Kurv

<h1>Kurv</h1>

<p>I alt: @Kurv.Total kr.</p>

@code {
    protected override async Task OnInitializedAsync()
    {
        await Kurv.LoadAsync();
    }
}` },
      { t: "laes", h: "ProtectedLocalStorage: kun i Interactive Server",
        md: "Bruger du **Interactive Server** (modul 23) i dit projekt, har .NET en færdig klasse: **`ProtectedLocalStorage`** (og `ProtectedSessionStorage`). Den **krypterer** værdien på serveren, før den lægges i browserens localStorage. Brugeren kan se, at der ligger noget, men kan hverken læse eller ændre det.",
        sprog: "razor", frag: true,
        kode: R`@page "/navn"
@using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage
@inject ProtectedLocalStorage Storage

<input @bind="navn" />
<button @onclick="Gem">Gem</button>
<p>Gemt navn: @gemt</p>

@code {
    private string navn = "";
    private string gemt = "";

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            ProtectedBrowserStorageResult<string> result = await Storage.GetAsync<string>("navn");
            if (result.Success)
            {
                gemt = result.Value ?? "";
                StateHasChanged();
            }
        }
    }

    private async Task Gem()
    {
        await Storage.SetAsync("navn", navn);
        gemt = navn;
    }
}`,
        noter: [
          ["SetAsync(\"navn\", navn)", "Krypterer og gemmer. I localStorage står der bagefter noget i stil med `CfDJ8EhsJmpch…` (afprøvet)."],
          ["GetAsync<string>(\"navn\")", "Henter og dekrypterer. `result.Success` er `false`, hvis der ikke er noget, eller hvis nogen har ændret værdien."],
          ["OnAfterRenderAsync(bool firstRender)", "Kører, når siden er tegnet i browseren. Under prerendering findes browseren ikke endnu, så localStorage kan først bruges her."],
          ["StateHasChanged()", "Tegn siden igen, nu med den hentede værdi."]
        ],
        md2: "Hvorfor findes den ikke i WebAssembly? Krypteringen kræver en **nøgle**. I Interactive Server ligger nøglen sikkert på serveren. I WebAssembly kører koden i browseren, så nøglen skulle ligge dér, hvor brugeren kan læse den. Så ville krypteringen ikke beskytte noget." },
      { t: "valg", q: "Hvorfor kan man ikke bruge `ProtectedLocalStorage` i en Blazor WebAssembly-komponent?",
        svar: ["Krypteringsnøglen skulle så ligge i browseren, hvor brugeren kan læse den", "WebAssembly har ikke adgang til localStorage", "localStorage findes kun i Interactive Server", "Den er for langsom til WebAssembly"],
        ret: 0, fordi: "`ProtectedLocalStorage` krypterer med en nøgle, der ligger på **serveren**. WebAssembly-kode kører i browseren, og alt dér kan læses. Almindelig localStorage virker fint i WebAssembly gennem `IJSRuntime`, men den er ikke krypteret." },
      { t: "ide", h: "Kurven i ShopWasm",
        md: "Byg kurven, og se den overleve, at browseren lukkes.",
        win: [
          "Lav mappen `Services` i `ShopWasm.Client`, og lav klasserne `CartItem` og `CartService` i den.",
          "Registrér `CartService` i klientens `Program.cs`, og tilføj `@using ShopWasm.Client.Services` i `_Imports.razor`.",
          "I `Products.razor`: tilføj `@inject CartService Cart`, en knap `<button class=\"btn btn-primary btn-sm\" @onclick=\"() => AddToCart(p)\">Læg i kurv</button>` i hver række, metoden `private async Task AddToCart(Product p) { await Cart.AddAsync(p); }`, og `await Cart.LoadAsync();` i `OnInitializedAsync`. Vis antallet under tabellen: `<p>Varer i kurven: @Cart.Items.Sum(i => i.Quantity)</p>`.",
          "Lav `CartPage.razor` med `@page \"/cart\"` og `@inject CartService Cart`. Hent kurven i `OnInitializedAsync`, vis hver linje i en tabel med navn, antal og pris gange antal, vis `Cart.Total`, og lav en knap **Tøm kurven** med `@onclick=\"Cart.ClearAsync\"`. Lav et menupunkt til `cart`.",
          "Kør, og læg Kaffe i kurven to gange og Kakao én gang. Kurv-siden viser 2 stk. Kaffe, 1 stk. Kakao og `I alt: 128,5 kr.` (med dansk browser). Der står 128,5 og ikke 128,50, fordi `@Cart.Total` skriver tallet uden ekstra nuller. Vil du altid have to decimaler, så skriv `@Cart.Total.ToString(\"N2\")`: så står der 128,50.",
          "Tryk F12 → **Application** → **Local storage** → din adresse. Du ser nøglen `cart` med JSON-teksten.",
          "Luk browseren helt, start igen, og åbn kurven: varerne er der stadig.",
          "Ret `\"localStorage.` til `\"sessionStorage.` de tre steder i `CartService`. Kør, læg varer i kurven, luk fanen, og åbn siden igen: kurven er tom. Ret det tilbage til localStorage."
        ],
        md2: "Sæt et breakpoint på `item.Quantity++;` i `AddAsync`, og kør med debuggeren ({{F5||den grønne bille}}). Visual Studio kan stoppe i koden, der kører i browseren. Stopper Rider ikke dér, så skriv `Console.WriteLine(item.Quantity);` i stedet: i WebAssembly kommer den tekst i browserens **Console** (F12)." },
      { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: Hvad er forskellen på localStorage, sessionStorage og cookies, og hvordan bruger du localStorage fra Blazor?",
        svar: "Alle tre gemmer små mængder **tekst** i brugerens browser. **localStorage** bliver liggende, også når browseren lukkes. **sessionStorage** gælder kun den ene fane og slettes, når den lukkes. En **cookie** sendes med til serveren ved **hver** forespørgsel og bruges fx til login. Fra Blazor kalder jeg localStorage med **JS interop**: `IJSRuntime` og `InvokeVoidAsync(\"localStorage.setItem\", …)` eller `InvokeAsync<string?>(\"localStorage.getItem\", …)`. Objekter laver jeg om til **JSON** først. Data kan læses og ændres af brugeren, så der må aldrig ligge hemmeligheder, og serveren må ikke stole blindt på dem.",
        noegle: ["localStorage", "sessionStorage", "cookie", "IJSRuntime", "JSON", "hemmeligheder"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m24l5", titel: "Auto, og hvad du skal vælge til dit projekt", min: 18,
    ord: [
      ["Render mode", "Bestemmer, hvor og hvordan en komponent kører: Static (kun HTML fra serveren), Interactive Server, Interactive WebAssembly eller Interactive Auto."],
      ["InteractiveAuto", "Render mode, der kører komponenten på serveren første gang, mens WebAssembly-filerne hentes, og i browseren ved de næste besøg."],
      ["RendererInfo", "En property i alle komponenter, der fortæller, hvor komponenten kører lige nu: `RendererInfo.Name` er Static, Server eller WebAssembly."],
      ["SignalR-kredsløb", "Den åbne forbindelse mellem browser og server, som Interactive Server bruger til at sende klik og ændringer frem og tilbage."],
      ["Beslutningstabel", "En tabel, der sammenligner valgmuligheder punkt for punkt, så man kan se, hvilken der passer til sin situation."]
    ],
    trin: [
      { t: "laes", h: "Auto: begynd på serveren, skift til browseren",
        md: "Interactive Server starter hurtigt, men kræver en åben forbindelse og belaster serveren. WebAssembly aflaster serveren, men har en stor første download. **Interactive Auto** prøver at få det bedste fra begge:\n\n1. **Første besøg**: komponenten kører på **serveren** (som Interactive Server), så siden virker med det samme. Imens henter browseren `.wasm`-filerne i baggrunden.\n2. **Næste besøg**: filerne ligger i browserens cache, så komponenten kører i **browseren** (som WebAssembly).\n\nDu vælger det med `--interactivity Auto` eller **Interactive render mode: Auto** i Visual Studio. Så står der `@rendermode=\"InteractiveAuto\"` i `App.razor`, og serverens `Program.cs` slår **både** Server og WebAssembly til.",
        noter: [
          [".AddInteractiveServerComponents()", "Server-delen: kredsløbet over SignalR."],
          [".AddInteractiveWebAssemblyComponents()", "WebAssembly-delen: filerne til browseren."],
          ["@rendermode=\"InteractiveAuto\"", "Lad Blazor vælge: Server, indtil WebAssembly er hentet, derefter WebAssembly."]
        ] },
      { t: "valg", q: "En side bruger render mode **Auto**. En ny bruger åbner den for første gang. Hvor kører komponenten?",
        svar: ["På serveren, mens WebAssembly-filerne hentes i baggrunden", "I browseren, efter at alle filerne er hentet", "Kun som statisk HTML uden knapper", "Både på serveren og i browseren på samme tid"],
        ret: 0, fordi: "Første gang er filerne ikke hentet endnu. For at siden kan virke med det samme, kører Auto den på serveren. Ved næste besøg ligger filerne i cachen, og så kører den i browseren." },
      { t: "laes", h: "Se det selv: RendererInfo",
        md: "Alle komponenter har propertyen **`RendererInfo`**. Den fortæller, hvor komponenten kører lige nu. Læg denne side i klient-projektet i en Auto-app:",
        sprog: "razor", frag: true,
        kode: R`@page "/hvor"

<h1>Hvor kører jeg?</h1>

<p>Renderer: @RendererInfo.Name</p>
<p>Interaktiv: @RendererInfo.IsInteractive</p>
<p>OperatingSystem.IsBrowser(): @OperatingSystem.IsBrowser()</p>
<button @onclick="() => antal++">Klik (@antal)</button>

@code {
    private int antal = 0;
}`,
        noter: [
          ["Static", "Prerendering: serveren laver HTML'en. Knappen virker ikke endnu (`IsInteractive` er `False`). Ses kun et øjeblik."],
          ["Server", "Første besøg, efter prerendering: kører på serveren. `IsBrowser()` er `False`."],
          ["WebAssembly", "Når filerne er hentet, i en ny fane eller ved næste besøg: kører i browseren. `IsBrowser()` er `True`."]
        ],
        md2: "Afprøvet: første besøg viste `Renderer: Server` og `OperatingSystem.IsBrowser(): False`. En ny fane lidt senere viste `Renderer: WebAssembly` og `True`. Den samme komponent, to forskellige steder." },
      { t: "spor", h: "Spor: Auto ved to besøg",
        q: "Koden efterligner, hvad `RendererInfo.Name` viser i en Auto-app ved første og andet besøg. Skriv værdierne efter hver linje.",
        kode: R`bool wasmHentet = false;
string renderer = "Static";
renderer = wasmHentet ? "WebAssembly" : "Server";
wasmHentet = true;
renderer = "Static";
renderer = wasmHentet ? "WebAssembly" : "Server";`,
        kolonner: ["renderer", "wasmHentet"],
        raekker: [[1, "=–", "=False"], [2, "Static", "False"], [3, "Server", "False"], [4, "Server", "True"], [5, "Static", "True"], [6, "WebAssembly", "True"]],
        fordi: "Linje 2–3 er første besøg: først prerendering (Static), så Server, fordi filerne ikke er hentet. Linje 4: filerne bliver hentet i baggrunden. Linje 5–6 er næste besøg: prerendering igen, og nu er filerne der, så komponenten kører med WebAssembly." },
      { t: "laes", h: "Prisen for Auto: koden skal virke begge steder",
        md: "I Auto kører **den samme komponent** nogle gange på serveren og andre gange i browseren. Derfor skal alt, den bruger, findes **begge steder**. En komponent i Auto må fx ikke bruge `DbContext` direkte, for i browseren findes databasen ikke. Og `HttpClient` med `BaseAddress` er kun registreret i klienten.\n\nDen almindelige løsning er et **interface** (modul 7 og 19) med to implementeringer:",
        frag: true,
        kode: R`// ShopWasm.Shared
public interface IProductService
{
    Task<List<Product>> GetProductsAsync();
}

// Server-projektets Program.cs: hent direkte fra databasen
builder.Services.AddScoped<IProductService, DbProductService>();

// Klient-projektets Program.cs: hent gennem API'et med HttpClient
builder.Services.AddScoped<IProductService, HttpProductService>();`,
        noter: [
          ["@inject IProductService Products", "Komponenten kender kun interfacet. Den er ligeglad med, hvilken implementering den får."],
          ["DbProductService", "Bruger `DbContext`. Kører kun på serveren."],
          ["HttpProductService", "Bruger `HttpClient` og API'et. Kører i browseren."]
        ],
        md2: "Det virker, og det er god arkitektur at kunne forklare, men det er dobbelt så meget kode som med Server eller WebAssembly alene. Det er en del af valget i næste trin." },
      { t: "valg", q: "Hvorfor kan en komponent med render mode **Auto** ikke bare bruge `ShopContext` (din `DbContext`) direkte med `@inject`?",
        svar: ["Komponenten kører nogle gange i browseren, og dér findes databasen og DbContext ikke", "DbContext må aldrig bruges i komponenter", "Auto understøtter ikke dependency injection", "DbContext er for langsom til Auto"],
        ret: 0, fordi: "I Auto kan komponenten køre i browseren. Browseren kan ikke tale med databasen, og en connection string må ikke ligge dér. Med Interactive Server, hvor komponenten altid kører på serveren, er `DbContext` i komponenten derimod helt i orden (modul 23)." },
      { t: "laes", h: "Beslutningstabel: Server, WebAssembly eller Auto?",
        md: "Brug tabellen, når du vælger render mode til dit projekt, og når du skal begrunde valget til eksamen.",
        noter: [
          ["Første visning", "**Server**: hurtig. **WebAssembly**: langsom første gang (download). **Auto**: hurtig."],
          ["Kræver åben forbindelse", "**Server**: ja, hele tiden. **WebAssembly**: nej, kun til API-kald. **Auto**: ja ved første besøg."],
          ["Belastning af serveren", "**Server**: hver bruger har sit kredsløb i serverens hukommelse. **WebAssembly**: lav, browseren gør arbejdet. **Auto**: midt imellem."],
          ["Database i komponenten", "**Server**: ja, `DbContext` direkte. **WebAssembly**: nej, kun gennem et API. **Auto**: nej, kun gennem et interface med to implementeringer."],
          ["Hemmeligheder i koden", "**Server**: blev på serveren. **WebAssembly**: alt i klienten kan læses. **Auto**: som WebAssembly."],
          ["Projekter", "**Server**: ét. **WebAssembly**: server + klient (+ shared). **Auto**: server + klient (+ shared)."],
          ["Mængden af kode", "**Server**: mindst. **WebAssembly**: API + HttpClient. **Auto**: mest."],
          ["Kan virke offline", "**Server**: nej. **WebAssembly**: ja, når filerne er hentet. **Auto**: først fra andet besøg."]
        ],
        md2: "Til et eksamensprojekt gælder én regel mere: **byg ikke noget, du ikke kan forklare**. Vælg den løsning, hvor du kan forklare hver linje i `Program.cs` og hvert projekt i løsningen." },
      { t: "valg", q: "Et internt administrationssystem til et lille firma: 10 brugere på kontorets netværk, alt skal ligge i en database, og der skal laves hurtigt. Hvilken render mode passer bedst?",
        svar: ["Interactive Server", "Interactive WebAssembly", "Interactive Auto", "Kun statisk HTML"],
        ret: 0, fordi: "Få brugere og en stabil forbindelse betyder, at kredsløbene ikke er et problem. Komponenterne kan bruge `DbContext` direkte, og der er kun ét projekt. Det er den mindste mængde kode." },
      { t: "valg", q: "En app til mange tusinde brugere på mobiltelefoner. Forbindelsen er tit dårlig, siderne skal reagere hurtigt på klik, og der findes allerede et Web API. Hvilken render mode passer bedst?",
        svar: ["Interactive WebAssembly", "Interactive Server", "Kun statisk HTML", "Ingen af dem, det kræver Angular"],
        ret: 0, fordi: "Med WebAssembly kører klikkene i browseren uden at gå over nettet, og serveren skal ikke holde tusindvis af kredsløb. API'et findes allerede, så klienten kan bare kalde det med `HttpClient`." },
      { t: "valg", q: "Du har lært både Interactive Server (modul 23) og WebAssembly (dette modul). Hvad er den bedste begrundelse for dit valg til eksamensprojektet?",
        svar: ["Jeg vælger den, der passer til projektets behov, og som jeg kan forklare linje for linje", "Jeg vælger Auto, fordi den har flest dele og ser mest avanceret ud", "Jeg vælger WebAssembly, fordi Server er forældet", "Jeg vælger tilfældigt, det betyder ikke noget for karakteren"],
        ret: 0, fordi: "Ved den mundtlige eksamen bliver du spurgt **hvorfor**. Et enkelt valg, du kan begrunde med beslutningstabellen og forklare i koden, er mere værd end et avanceret valg, du ikke kan forsvare. Interactive Server er det enkleste til en app med database. WebAssembly med API er et godt valg, hvis du vil vise API, HttpClient og en delt model." },
      { t: "ide", h: "Prøv Auto",
        md: "Lav en lille Auto-app, og se komponenten skifte sted.",
        win: [
          "Opret et nyt projekt: **Blazor Web App**, navn `AutoDemo`, **.NET 10**, uden HTTPS, **Interactive render mode**: **Auto (Server and WebAssembly)**, **Interactivity location**: **Global**.",
          "Lav `Hvor.razor` i `AutoDemo.Client/Pages` med koden fra trinnet \"Se det selv\".",
          "Kør, og åbn `/hvor`. Der står `Renderer: Server`. Klik på knappen: den tæller.",
          "Vent et par sekunder, og åbn `/hvor` i en **ny fane**. Nu står der `Renderer: WebAssembly` og `OperatingSystem.IsBrowser(): True`.",
          "Kig i serverens `Program.cs` og `Components/App.razor`, og find linjerne med både Server og WebAssembly og `InteractiveAuto`."
        ],
        mac: [
          "I Terminal: `dotnet new blazor -n AutoDemo --interactivity Auto --all-interactive --no-https`.",
          "Åbn mappen `AutoDemo` i Rider. Lav `Hvor.razor` i `AutoDemo.Client/Pages` med koden fra trinnet \"Se det selv\".",
          "Kør `AutoDemo`, og åbn `/hvor`. Der står `Renderer: Server`. Klik på knappen: den tæller.",
          "Vent et par sekunder, og åbn `/hvor` i en **ny fane**. Nu står der `Renderer: WebAssembly` og `OperatingSystem.IsBrowser(): True`.",
          "Kig i serverens `Program.cs` og `Components/App.razor`, og find linjerne med både Server og WebAssembly og `InteractiveAuto`."
        ],
        output: "Renderer: WebAssembly\nInteraktiv: True\nOperatingSystem.IsBrowser(): True",
        md2: "Teksten ovenfor er, hvad den nye fane viser. Prøv også at genindlæse hurtigt mange gange i den første fane: et kort øjeblik står der `Static`, før komponenten bliver interaktiv." },
      { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: Hvad er forskellen på Interactive Server, Interactive WebAssembly og Auto, og hvad har du valgt til dit projekt?",
        svar: "Med **Interactive Server** kører komponenten på serveren, og browseren sender klik over et **SignalR-kredsløb**. Det starter hurtigt, og komponenten kan bruge databasen direkte, men det kræver en åben forbindelse og belaster serveren. Med **WebAssembly** hentes koden ned og kører i **browseren**. Det aflaster serveren og reagerer hurtigt, men første besøg er en stor download, og data skal hentes gennem et **API**. **Auto** kører på serveren første gang og i browseren, når filerne er hentet, men koden skal virke begge steder. Jeg har valgt … fordi … (begrund med beslutningstabellen: første visning, database, forbindelse, mængden af kode).",
        noegle: ["Server", "SignalR", "WebAssembly", "browseren", "API", "Auto", "begrund"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m24l6", titel: "Database bag API'et og publicering", min: 22,
    ord: [
      ["Publicere", "At lave en færdig udgave af appen, der kan køre uden Visual Studio eller Rider: `dotnet publish`."],
      ["Release", "Byggetilstanden til den færdige app: optimeret og uden ekstra fejlsøgningshjælp. Det modsatte er Debug."],
      ["Trimming", "Når appen publiceres, fjernes de dele af .NET-bibliotekerne, appen ikke bruger, så der skal hentes mindre."],
      ["Komprimering", "Filerne pakkes sammen (Brotli `.br` og gzip `.gz`), så der sendes færre bytes til browseren."],
      ["HasPrecision", "Fortæller EF Core, hvor mange cifre et `decimal` må have i databasen, fx `HasPrecision(18, 2)`: 18 cifre, heraf 2 efter kommaet."],
      ["Hosting", "At lade appen køre på en server, så andre kan bruge den."]
    ],
    trin: [
      { t: "laes", h: "Databasen hører til på serveren",
        md: "Listen i controlleren glemmer alt, når serveren stopper. Nu kommer der en rigtig database bag API'et, præcis som i modul 17 og 19. Det vigtige her er **hvor**: EF Core hører kun til i **server**-projektet `ShopWasm`. Klienten skal intet vide om databasen, og shared-projektet indeholder kun modellen.\n\nPakker i `ShopWasm`: {{`Microsoft.EntityFrameworkCore.SqlServer` og `Microsoft.EntityFrameworkCore.Tools`||`Microsoft.EntityFrameworkCore.Sqlite` og `Microsoft.EntityFrameworkCore.Design`}}. Lav så mappen `Data` i `ShopWasm` med din `DbContext`:",
        frag: true,
        kode: R`using Microsoft.EntityFrameworkCore;
using ShopWasm.Shared;

namespace ShopWasm.Data;

public class ShopContext : DbContext
{
    public ShopContext(DbContextOptions<ShopContext> options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>().Property(p => p.Price).HasPrecision(18, 2);

        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Kaffe", Price = 45 },
            new Product { Id = 2, Name = "Te", Price = 30 },
            new Product { Id = 3, Name = "Kakao", Price = 38.5m }
        );
    }
}`,
        noter: [
          ["DbSet<Product> Products", "Tabellen `Products`. `Product` kommer fra `ShopWasm.Shared`."],
          ["HasPrecision(18, 2)", "Pengebeløb med 2 decimaler. Uden den giver SQL Server en advarsel ved migrationen, fordi den ikke ved, hvor mange decimaler `decimal` skal have."],
          ["HasData(…)", "Seeding (modul 17): de tre produkter lægges i databasen af migrationen."]
        ] },
      { t: "valg", q: "Hvilket projekt skal have NuGet-pakkerne til EF Core i ShopWasm-løsningen?",
        svar: ["ShopWasm (serveren)", "ShopWasm.Client", "ShopWasm.Shared", "Alle tre"],
        ret: 0, fordi: "Kun serveren taler med databasen. Lagde du EF Core i klienten, ville den blive hentet ned i browseren til ingen nytte, og browseren kan alligevel ikke nå databasen. Shared har kun brug for `System.ComponentModel.DataAnnotations`, som er en del af .NET." },
      { t: "laes", h: "Registrering og connection string",
        md: "Connection stringen står i **serverens** `appsettings.json`, som aldrig sendes til browseren:\n\n{{`\"ConnectionStrings\": { \"ShopContext\": \"Server=(localdb)\\\\MSSQLLocalDB;Database=ShopWasm;Trusted_Connection=True;TrustServerCertificate=True\" }`||`\"ConnectionStrings\": { \"ShopContext\": \"Data Source=shop.db\" }`}}\n\nI serverens `Program.cs` registreres `ShopContext` lige efter `AddControllers()`:",
        frag: true,
        kode: R`using Microsoft.EntityFrameworkCore;
using ShopWasm.Data;

// …

builder.Services.AddControllers();
builder.Services.AddDbContext<ShopContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ShopContext")));`,
        noter: [
          ["AddDbContext<ShopContext>", "Registrér databasen til dependency injection, så controlleren kan få den i sin konstruktør."],
          ["UseSqlServer(…)", "På Mac: `UseSqlite(…)`. Det er den eneste linje i koden, der er forskellig."],
          ["GetConnectionString(\"ShopContext\")", "Læs connection stringen med det navn fra `appsettings.json`."]
        ],
        md2: "Migrationen laves i **server**-projektet. {{I Package Manager Console skal **Default project** stå på `ShopWasm`, ellers leder Visual Studio efter `DbContext` i det forkerte projekt. Skriv `Add-Migration Init` og `Update-Database`.||Stil dig i mappen `ShopWasm/ShopWasm` (den med `ShopWasm.csproj`) i Terminal, og skriv `dotnet ef migrations add Init` og `dotnet ef database update`.}}" },
      { t: "laes", h: "Controlleren bruger databasen",
        md: "Controlleren får `ShopContext` i sin konstruktør og bruger de asynkrone EF-metoder, som du kender fra modul 17. Listen og `naesteId` forsvinder: databasen giver selv nye id'er.",
        frag: true,
        kode: R`[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly ShopContext _context;

    public ProductsController(ShopContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        return await _context.Products.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        Product? product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return NotFound();
        }
        return product;
    }

    [HttpPost]
    public async Task<ActionResult<Product>> PostProduct(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutProduct(int id, Product changed)
    {
        Product? product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return NotFound();
        }
        product.Name = changed.Name;
        product.Price = changed.Price;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        Product? product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return NotFound();
        }
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}`,
        noter: [
          ["ToListAsync()", "Hent alle rækker som en liste."],
          ["FindAsync(id)", "Find rækken med den primærnøgle. Giver `null`, hvis den ikke findes."],
          ["SaveChangesAsync()", "Gem ændringerne i databasen. Først her bliver SQL'en sendt."],
          ["using", "Øverst: `using Microsoft.AspNetCore.Mvc;`, `using Microsoft.EntityFrameworkCore;`, `using ShopWasm.Data;` og `using ShopWasm.Shared;`."]
        ] },
      { t: "udfyld", frag: true, q: "Udfyld de to actions, så de bruger databasen.",
        kode: R`[HttpGet]
public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
{
    return await _context.Products.[[ToListAsync]]();
}

[HttpPost]
public async Task<ActionResult<Product>> PostProduct(Product product)
{
    _context.Products.Add(product);
    await _context.[[SaveChangesAsync]]();
    return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
}`,
        fordi: "`ToListAsync` henter alle produkter. `Add` lægger kun produktet klar. Det er `SaveChangesAsync`, der sender `INSERT` til databasen og giver produktet sit nye id." },
      { t: "valg", q: "Du skifter listen i `ProductsController` ud med en database. Hvad skal du ændre i siderne i `ShopWasm.Client`?",
        svar: ["Ingenting: siderne kalder de samme adresser i API'et og får det samme JSON tilbage", "Alle sider skal have `@inject ShopContext`", "`GetFromJsonAsync` skal skiftes ud med `ToListAsync`", "Klienten skal have en connection string"],
        ret: 0, fordi: "Klienten kender kun API'ets adresser og JSON-formatet. Hvordan serveren gemmer data, er skjult bag API'et. Det er **løs kobling**: du kan skifte databasen ud uden at røre brugerfladen." },
      { t: "ide", h: "Database i ShopWasm",
        md: "Sæt databasen bag API'et. Produkterne skal overleve en genstart.",
        win: [
          "Højreklik på `ShopWasm` (serveren) → **Manage NuGet Packages** → **Browse**. Installér `Microsoft.EntityFrameworkCore.SqlServer` og `Microsoft.EntityFrameworkCore.Tools`.",
          "Lav mappen `Data` i `ShopWasm` og klassen `ShopContext` i den.",
          "Tilføj connection stringen med LocalDB i serverens `appsettings.json`, og registrér `ShopContext` med `UseSqlServer` i serverens `Program.cs`.",
          "Skriv `ProductsController` om, så den bruger `_context`.",
          "**Tools** → **NuGet Package Manager** → **Package Manager Console**. Sæt **Default project** til `ShopWasm`. Skriv `Add-Migration Init`, tryk Enter, og derefter `Update-Database`.",
          "Kør, opret et produkt, stop programmet, og kør igen. Produktet er der stadig.",
          "Åbn **View** → **SQL Server Object Explorer** → `(localdb)\\MSSQLLocalDB` → **Databases** → `ShopWasm` → **Tables** → `dbo.Products`, højreklik → **View Data**."
        ],
        mac: [
          "I Terminal i mappen `ShopWasm/ShopWasm` (server-projektet): `dotnet add package Microsoft.EntityFrameworkCore.Sqlite` og `dotnet add package Microsoft.EntityFrameworkCore.Design`.",
          "Lav mappen `Data` i `ShopWasm` og klassen `ShopContext` i den.",
          "Tilføj connection stringen `Data Source=shop.db` i serverens `appsettings.json`, og registrér `ShopContext` med `UseSqlite` i serverens `Program.cs`.",
          "Skriv `ProductsController` om, så den bruger `_context`.",
          "I Terminal i samme mappe: `dotnet ef migrations add Init` og derefter `dotnet ef database update`. Har du ikke `dotnet ef`, så installér det først med `dotnet tool install --global dotnet-ef`.",
          "Kør, opret et produkt, stop programmet, og kør igen. Produktet er der stadig.",
          "Åbn filen `shop.db` i Riders **Database**-vindue (træk den ind, eller **+** → **Data Source** → **SQLite**), og se tabellen `Products`."
        ],
        md2: "Tjek også kurven: den ligger stadig i localStorage og er helt uafhængig af databasen. Kurven er brugerens, databasen er butikkens." },
      { t: "laes", h: "Publicering: fra Debug til en færdig app",
        md: "Når du kører fra Visual Studio eller Rider, er appen bygget i **Debug**: med ekstra hjælp til fejlsøgning og alle .NET-bibliotekerne i fuld størrelse. Den færdige udgave laves med **publicering** i **Release**:\n\n{{Højreklik på `ShopWasm` (serveren) → **Publish** → **Folder** → **Next** → **Finish** → **Publish**. Visual Studio skriver, hvilken mappe den har lagt filerne i.||I Terminal i mappen `ShopWasm/ShopWasm`: `dotnet publish -c Release -o publish`. Filerne lægges i mappen `publish`.}}\n\nUnder publiceringen står der `Optimizing assemblies for size`. Det er **trimming**: de dele af .NET, appen ikke bruger, bliver fjernet. Her er, hvad der kom ud for ShopWasm (afprøvet):",
        noter: [
          ["ShopWasm.dll", "Serveren. Startes med `dotnet ShopWasm.dll`."],
          ["ShopWasm.Shared.dll, EF Core- og SQLite-filerne", "Det, serveren bruger. Bliver på serveren."],
          ["appsettings.json", "Serverens indstillinger med connection stringen."],
          ["wwwroot/_framework", "Det, browseren henter: 48 `.wasm`-filer i stedet for ca. 200, i alt ca. 11 MB."],
          [".br og .gz", "Hver fil findes også komprimeret. Browseren får den komprimerede: ca. 3 MB i alt."]
        ],
        md2: "Kør den publicerede app med `dotnet ShopWasm.dll --urls http://localhost:5080` fra publiceringsmappen, og åbn `http://localhost:5080/products`. Med SQLite skal `shop.db` kopieres med over i mappen, for connection stringen `Data Source=shop.db` peger på den mappe, programmet startes fra. LocalDB ligger ét fast sted på din computer, så dér virker det uden videre." },
      { t: "valg", q: "Hvorfor skal browseren hente meget mindre, når ShopWasm er publiceret i Release, end når den kører fra Visual Studio eller Rider?",
        svar: ["Ubrugt kode er fjernet med trimming, og filerne sendes komprimeret", "Release-udgaven kører på serveren i stedet for i browseren", "Release-udgaven henter kun HTML", "Browseren springer `.wasm`-filerne over i Release"],
        ret: 0, fordi: "Trimming fjerner de dele af .NET, appen ikke bruger (48 filer i stedet for ca. 200), og komprimering (`.br`/`.gz`) gør dem mindre undervejs. Koden kører stadig i browseren." },
      { t: "valg", q: "Din ShopWasm-løsning har API og database på serveren. Hvad skal det sted, hvor den skal køre (hostes), kunne?",
        svar: ["Køre et .NET-program, for serveren skal svare på API-kald og tale med databasen", "Kun sende statiske filer, for alt kører i browseren", "Køre JavaScript på serveren", "Ingenting, appen kører direkte fra brugerens disk"],
        ret: 0, fordi: "Siderne kører i browseren, men `ShopWasm.dll` skal køre på serveren: den sender filerne, svarer på `api/products` og bruger EF Core. Kun en ren WebAssembly-app uden egen server kan nøjes med et sted, der sender statiske filer." },
      { t: "ide", h: "Publicér ShopWasm, og kør den",
        md: "Publicér, kør den færdige udgave, og se forskellen i størrelse.",
        win: [
          "Højreklik på `ShopWasm` → **Publish** → **Folder** → **Next** → **Finish** → **Publish**.",
          "Åbn mappen, Visual Studio viser. Kig i `wwwroot/_framework`: find `ShopWasm.Client` og `ShopWasm.Shared` blandt `.wasm`-filerne.",
          "Åbn en terminal i mappen (højreklik i Stifinder → **Open in Terminal**), og skriv `dotnet ShopWasm.dll --urls http://localhost:5080`.",
          "Åbn `http://localhost:5080/products`. Siden virker, og produkterne kommer fra din LocalDB-database.",
          "F12 → **Network** → genindlæs med fluebenet ved **Disable cache**. Sammenlign antallet af `.wasm`-filer med det, du så i lektion 1.",
          "Stop programmet med Ctrl+C i terminalen."
        ],
        mac: [
          "I Terminal i mappen `ShopWasm/ShopWasm`: `dotnet publish -c Release -o publish`.",
          "Skriv `cp shop.db publish/` for at få databasen med.",
          "Skriv `cd publish` og `ls wwwroot/_framework`: find `ShopWasm.Client` og `ShopWasm.Shared` blandt `.wasm`-filerne.",
          "Skriv `dotnet ShopWasm.dll --urls http://localhost:5080`, og åbn `http://localhost:5080/products` i browseren.",
          "Udviklerværktøjerne → **Network** → genindlæs med fluebenet ved **Disable cache**. Sammenlign antallet af `.wasm`-filer med det, du så i lektion 1.",
          "Stop programmet med Ctrl+C i Terminal."
        ],
        md2: "I konsollen står `Hosting environment: Production`. Den publicerede app kører altså ikke i Development: `UseWebAssemblyDebugging` er slået fra, og fejl viser `Error.razor` i stedet for detaljer." },
      { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: Hvad sker der, fra en bruger åbner `/products` i ShopWasm første gang, til produkterne står på skærmen?",
        svar: "Serveren sender `App.razor` som HTML og `blazor.web.js`. Browseren henter **.NET-runtimen** og mine klasser som **WebAssembly**-filer og starter dem. Routeren finder komponenten med `@page \"/products\"`. I `OnInitializedAsync` sender **HttpClient** `GET api/products`; imens viser siden \"Henter …\". På serveren tager **ProductsController** imod, får `ShopContext` med **dependency injection**, og **EF Core** henter rækkerne fra **databasen**. Controlleren svarer **200** med **JSON**, klienten laver JSON'en om til en `List<Product>`, og Blazor tegner tabellen. Næste gang ligger WebAssembly-filerne i browserens **cache**.",
        noegle: ["WebAssembly", "HttpClient", "GET", "controller", "EF Core", "JSON", "cache"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m24v", titel: "Værksted: byg Bibliotek selv", vaerksted: true, min: 120, ord: [],
    trin: [
      { t: "laes", h: "Sådan arbejder du i værkstedet",
        md: "Nu bygger du en **ny** Blazor WebAssembly-app, `Bibliotek`, helt selv. Den ligner `ShopWasm`, men handler om bøger, så du skal tænke dig om i stedet for at skrive af. Opgaverne bygger oven på hinanden: til sidst har du tre projekter, et API med database, hele CRUD, favoritter i localStorage og en publiceret app.\n\nOpgave 3 er en fejlfinding i et konsolprogram, hvor du skal bruge debuggeren.",
        noter: [
          ["Skriv selv", "Skriv koden med dine egne fingre. Kig i `ShopWasm`, hvis du er i tvivl om en form, men skriv det ikke af."],
          ["Kør tit", "Kør efter hver ny fil. Afprøv API'et i browseren (`/api/books`) før siden, der bruger det. Så ved du, hvilken side af løsningen en fejl er i."],
          ["Hvilket projekt?", "Sider og services: `Bibliotek.Client`. Controller, database og connection string: `Bibliotek`. Modellen: `Bibliotek.Shared`."],
          ["Kig i Network", "F12 → **Network** → **Fetch/XHR** viser hver forespørgsel til API'et med statuskode og svar."],
          ["Brug debuggeren", "Sæt et **breakpoint** i controlleren eller i en service, og se variablerne i **Locals** (Visual Studio) eller **Threads & Variables** (Rider)."],
          ["Tips før løsning", "Åbn ét tip ad gangen. Løsningen er sidste udvej, og skriv den så selv af."]
        ] },

      { t: "opgave", h: "Bibliotek: tre projekter og en bogliste", projekt: "Bibliotek",
        md: "Opret en Blazor Web App med WebAssembly, lav et shared-projekt med modellen `Book`, et API, der giver bøgerne, og en side i browseren, der viser dem i en tabel.",
        krav: [
          "Løsningen hedder `Bibliotek` og er lavet med Blazor Web App, render mode **WebAssembly**, **Global**, uden HTTPS (Mac: `--interactivity WebAssembly --all-interactive --no-https`)",
          "Prerendering er slået fra i `App.razor` (begge linjer)",
          "Klassebiblioteket `Bibliotek.Shared` findes, og både `Bibliotek` og `Bibliotek.Client` har en projektreference til det",
          "`Bibliotek.Shared/Book.cs` har `Id` (`int`), `Title` (`string`, `[Required]`), `Author` (`string`, `[Required]`) og `Year` (`int`, `[Range(1450, 2100)]`)",
          "`Bibliotek/Controllers/BooksController.cs` har en `static` liste med tre bøger: 1 Dune, Frank Herbert, 1965 · 2 Matilda, Roald Dahl, 1988 · 3 Hobbitten, J.R.R. Tolkien, 1937. `GET api/Books` giver alle, `GET api/Books/2` giver Matilda, `GET api/Books/99` giver 404",
          "`Bibliotek.Client/Pages/Books.razor` med `@page \"/books\"` henter bøgerne med `GetFromJsonAsync` og viser titel, forfatter og år i en tabel. Mens der hentes, står der \"Henter bøger …\"",
          "Menuen har et punkt **Bøger**"
        ],
        tip: [
          "Byg i den rækkefølge, der ikke giver røde streger: shared-projekt og `Book` → controller → `AddControllers`/`MapControllers` → `HttpClient` i klientens `Program.cs` → siden.",
          "Husk de tre `using`/`@using`: `using Bibliotek.Shared;` i controlleren, `@using Bibliotek.Shared` i klientens `_Imports.razor`, og `using System.ComponentModel.DataAnnotations;` i `Book.cs`.",
          "Fejl 500 med `There is no registered service of type 'System.Net.Http.HttpClient'` betyder, at prerendering stadig er slået til: `@rendermode=\"new InteractiveWebAssemblyRenderMode(prerender: false)\"`."
        ],
        fri: true,
        output: "[{\"id\":1,\"title\":\"Dune\",\"author\":\"Frank Herbert\",\"year\":1965},{\"id\":2,\"title\":\"Matilda\",\"author\":\"Roald Dahl\",\"year\":1988},{\"id\":3,\"title\":\"Hobbitten\",\"author\":\"J.R.R. Tolkien\",\"year\":1937}]",
        frag: true,
        loesning: R`// Bibliotek.Shared/Book.cs
using System.ComponentModel.DataAnnotations;

namespace Bibliotek.Shared;

public class Book
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Skriv en titel")]
    public string Title { get; set; } = "";

    [Required(ErrorMessage = "Skriv en forfatter")]
    public string Author { get; set; } = "";

    [Range(1450, 2100, ErrorMessage = "Året skal være mellem 1450 og 2100")]
    public int Year { get; set; }
}

// Bibliotek/Controllers/BooksController.cs
using Bibliotek.Shared;
using Microsoft.AspNetCore.Mvc;

namespace Bibliotek.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BooksController : ControllerBase
{
    private static List<Book> books = new List<Book>
    {
        new Book { Id = 1, Title = "Dune", Author = "Frank Herbert", Year = 1965 },
        new Book { Id = 2, Title = "Matilda", Author = "Roald Dahl", Year = 1988 },
        new Book { Id = 3, Title = "Hobbitten", Author = "J.R.R. Tolkien", Year = 1937 }
    };

    [HttpGet]
    public ActionResult<IEnumerable<Book>> GetBooks()
    {
        return books;
    }

    [HttpGet("{id}")]
    public ActionResult<Book> GetBook(int id)
    {
        Book? book = books.Find(b => b.Id == id);
        if (book == null)
        {
            return NotFound();
        }
        return book;
    }
}

// Bibliotek/Program.cs (de nye linjer)
builder.Services.AddControllers();
// … efter app.MapStaticAssets();
app.MapControllers();

// Bibliotek/Components/App.razor (de to linjer)
<HeadOutlet @rendermode="new InteractiveWebAssemblyRenderMode(prerender: false)" />
<Routes @rendermode="new InteractiveWebAssemblyRenderMode(prerender: false)" />

// Bibliotek.Client/Program.cs
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

await builder.Build().RunAsync();

// Bibliotek.Client/Pages/Books.razor
@page "/books"
@inject HttpClient Http

<PageTitle>Bøger</PageTitle>

<h1>Bøger</h1>

@if (books == null)
{
    <p><em>Henter bøger …</em></p>
}
else
{
    <table class="table">
        <thead>
            <tr>
                <th>Titel</th>
                <th>Forfatter</th>
                <th>År</th>
            </tr>
        </thead>
        <tbody>
            @foreach (Book b in books)
            {
                <tr>
                    <td>@b.Title</td>
                    <td>@b.Author</td>
                    <td>@b.Year</td>
                </tr>
            }
        </tbody>
    </table>
}

@code {
    private List<Book>? books;

    protected override async Task OnInitializedAsync()
    {
        books = await Http.GetFromJsonAsync<List<Book>>("api/books");
    }
}`,
        ekstra: ["Vis antallet af bøger under tabellen med `@books.Count`.", "Sortér bøgerne efter år på siden med `books.OrderBy(b => b.Year)` i `@foreach`."] },

      { t: "opgave", h: "Tilføj en bog", projekt: "Bibliotek",
        md: "Brugeren skal kunne tilføje en bog. API'et skal tage imod den med en POST, og en ny side med en `EditForm` skal sende den. Ugyldige bøger skal stoppes både i browseren og på serveren.",
        krav: [
          "`BooksController` har et `static` felt `naesteId`, der starter på 4, og en `[HttpPost]`-action, der giver bogen det næste id, lægger den i listen og svarer med `CreatedAtAction`",
          "`Bibliotek.Client/Pages/BookCreate.razor` med `@page \"/books/create\"` har en `EditForm` med `DataAnnotationsValidator`, felterne Titel, Forfatter og År og en **Gem**-knap",
          "`Gem` sender bogen med `PostAsJsonAsync` og går tilbage til `/books` med `NavigationManager`, hvis `IsSuccessStatusCode` er `true`",
          "Bogsiden har et link **Tilføj en bog** til `books/create`",
          "Tilføj Momo, Michael Ende, 1973: den står som nummer 4 i listen. Prøv året 3000: der vises \"Året skal være mellem 1450 og 2100\", og der sendes ingen forespørgsel (tjek Network)"
        ],
        tip: [
          "Kopiér formen fra `ProductCreate.razor` i hovedet, ikke på skærmen: `Model`, `OnValidSubmit`, `DataAnnotationsValidator`, et `InputText` eller `InputNumber` og en `ValidationMessage` pr. felt.",
          "POST-actionen: `book.Id = naesteId; naesteId++; books.Add(book); return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);`",
          "`HttpResponseMessage response = await Http.PostAsJsonAsync(\"api/books\", book); if (response.IsSuccessStatusCode) { Nav.NavigateTo(\"books\"); }`"
        ],
        fri: true,
        output: "Dune · Frank Herbert · 1965\nMatilda · Roald Dahl · 1988\nHobbitten · J.R.R. Tolkien · 1937\nMomo · Michael Ende · 1973",
        frag: true,
        loesning: R`// I BooksController
private static int naesteId = 4;

[HttpPost]
public ActionResult<Book> PostBook(Book book)
{
    book.Id = naesteId;
    naesteId++;
    books.Add(book);
    return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
}

// Bibliotek.Client/Pages/BookCreate.razor
@page "/books/create"
@inject HttpClient Http
@inject NavigationManager Nav

<PageTitle>Tilføj bog</PageTitle>

<h1>Tilføj bog</h1>

<EditForm Model="book" OnValidSubmit="Save">
    <DataAnnotationsValidator />
    <div class="mb-3">
        <label>Titel</label>
        <InputText class="form-control" @bind-Value="book.Title" />
        <ValidationMessage For="() => book.Title" />
    </div>
    <div class="mb-3">
        <label>Forfatter</label>
        <InputText class="form-control" @bind-Value="book.Author" />
        <ValidationMessage For="() => book.Author" />
    </div>
    <div class="mb-3">
        <label>År</label>
        <InputNumber class="form-control" @bind-Value="book.Year" />
        <ValidationMessage For="() => book.Year" />
    </div>
    <button type="submit" class="btn btn-primary">Gem</button>
    <a href="books">Tilbage</a>
</EditForm>

@code {
    private Book book = new Book();

    private async Task Save()
    {
        HttpResponseMessage response = await Http.PostAsJsonAsync("api/books", book);
        if (response.IsSuccessStatusCode)
        {
            Nav.NavigateTo("books");
        }
    }
}

// I Books.razor, under <h1>
<p><a href="books/create">Tilføj en bog</a></p>`,
        ekstra: ["Vis serverens statuskode på siden, hvis det ikke lykkedes (som `fejl` i `ProductCreate.razor`).", "Send en ugyldig bog direkte til API'et med en `.http`-fil (modul 19): `POST http://localhost:XXXX/api/books` med `{ \"title\": \"\", \"author\": \"X\", \"year\": 3000 }`. Læs 400-svaret."] },

      { t: "opgave", h: "Fejlfinding: kurven, der blev tom", projekt: "KurvTest",
        md: "En kollega har lavet en kurv, der gemmer sig selv som JSON, ligesom `CartService` i ShopWasm. For at kunne teste uden browser bruger hun en lille klasse, `FakeStorage`, der gør det samme som localStorage: gemmer tekst under en nøgle. Testen lægger tre varer i en kurv, og laver så en **ny** kurv, der indlæser den gemte tekst. Men den nye kurv har **0 varer**.\n\nLav et Console-projekt, `KurvTest`, og kopiér startkoden ind. Kør det, og se fejlen. Find den så med **debuggeren**: sæt et breakpoint på linjen `_storage.SetItem(\"cart\", json);` i `Save`, kør med {{**F5**||debug-knappen (den grønne bille)}}, og se på variablen `json` i {{**Locals**||**Threads & Variables**}}. Står alt, der skal gemmes, i teksten?",
        krav: [
          "Programmet skriver `Før: 3 varer, 120 kr.`",
          "Programmet skriver `Efter genindlæsning: 3 varer, 120 kr.`",
          "Rettelsen er i én af klasserne. Testkoden øverst er uændret"
        ],
        tip: [
          "Se på `json` i debuggeren, når den gemmes. Der står `ProductId`, `Name` og `Price` for hver vare. Hvad mangler?",
          "`Quantity` kommer aldrig med i JSON'en. `JsonSerializer` tager kun **properties** med, altså medlemmer med `{ get; set; }`. Se, hvordan `Quantity` er skrevet i `CartItem`, i forhold til de andre.",
          "Ret `public int Quantity;` (et felt) til `public int Quantity { get; set; }` (en property)."
        ],
        start: R`using System.Text.Json;

FakeStorage storage = new FakeStorage();

Cart cart = new Cart(storage);
cart.Add(1, "Kaffe", 45);
cart.Add(1, "Kaffe", 45);
cart.Add(2, "Te", 30);
Console.WriteLine($"Før: {cart.Count} varer, {cart.Total} kr.");

Cart genindlaest = new Cart(storage);
genindlaest.Load();
Console.WriteLine($"Efter genindlæsning: {genindlaest.Count} varer, {genindlaest.Total} kr.");

class FakeStorage
{
    private Dictionary<string, string> data = new Dictionary<string, string>();

    public void SetItem(string key, string value)
    {
        data[key] = value;
    }

    public string? GetItem(string key)
    {
        if (data.ContainsKey(key))
        {
            return data[key];
        }
        return null;
    }
}

class CartItem
{
    public int ProductId { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
    public int Quantity;
}

class Cart
{
    private readonly FakeStorage _storage;

    public Cart(FakeStorage storage)
    {
        _storage = storage;
    }

    public List<CartItem> Items { get; private set; } = new List<CartItem>();

    public int Count => Items.Sum(i => i.Quantity);

    public decimal Total => Items.Sum(i => i.Price * i.Quantity);

    public void Add(int productId, string name, decimal price)
    {
        CartItem? item = Items.Find(i => i.ProductId == productId);
        if (item == null)
        {
            Items.Add(new CartItem { ProductId = productId, Name = name, Price = price, Quantity = 1 });
        }
        else
        {
            item.Quantity++;
        }
        Save();
    }

    public void Load()
    {
        string? json = _storage.GetItem("cart");
        if (json != null)
        {
            Items = JsonSerializer.Deserialize<List<CartItem>>(json) ?? new List<CartItem>();
        }
    }

    private void Save()
    {
        string json = JsonSerializer.Serialize(Items);
        _storage.SetItem("cart", json);
    }
}`,
        output: "Før: 3 varer, 120 kr.\nEfter genindlæsning: 3 varer, 120 kr.",
        loesning: R`using System.Text.Json;

FakeStorage storage = new FakeStorage();

Cart cart = new Cart(storage);
cart.Add(1, "Kaffe", 45);
cart.Add(1, "Kaffe", 45);
cart.Add(2, "Te", 30);
Console.WriteLine($"Før: {cart.Count} varer, {cart.Total} kr.");

Cart genindlaest = new Cart(storage);
genindlaest.Load();
Console.WriteLine($"Efter genindlæsning: {genindlaest.Count} varer, {genindlaest.Total} kr.");

class FakeStorage
{
    private Dictionary<string, string> data = new Dictionary<string, string>();

    public void SetItem(string key, string value)
    {
        data[key] = value;
    }

    public string? GetItem(string key)
    {
        if (data.ContainsKey(key))
        {
            return data[key];
        }
        return null;
    }
}

class CartItem
{
    public int ProductId { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}

class Cart
{
    private readonly FakeStorage _storage;

    public Cart(FakeStorage storage)
    {
        _storage = storage;
    }

    public List<CartItem> Items { get; private set; } = new List<CartItem>();

    public int Count => Items.Sum(i => i.Quantity);

    public decimal Total => Items.Sum(i => i.Price * i.Quantity);

    public void Add(int productId, string name, decimal price)
    {
        CartItem? item = Items.Find(i => i.ProductId == productId);
        if (item == null)
        {
            Items.Add(new CartItem { ProductId = productId, Name = name, Price = price, Quantity = 1 });
        }
        else
        {
            item.Quantity++;
        }
        Save();
    }

    public void Load()
    {
        string? json = _storage.GetItem("cart");
        if (json != null)
        {
            Items = JsonSerializer.Deserialize<List<CartItem>>(json) ?? new List<CartItem>();
        }
    }

    private void Save()
    {
        string json = JsonSerializer.Serialize(Items);
        _storage.SetItem("cart", json);
    }
}`,
        ekstra: ["Tilføj `Console.WriteLine(storage.GetItem(\"cart\"));` til sidst, og se JSON-teksten før og efter rettelsen.", "Hvorfor var `Før`-linjen rigtig, selv med fejlen? (Svar: den første kurv brugte sine egne objekter i hukommelsen. Fejlen viser sig først, når data har været igennem JSON, præcis som når en side genindlæses og læser localStorage.)"] },

      { t: "opgave", h: "Favoritter i localStorage", projekt: "Bibliotek",
        md: "Brugeren skal kunne markere bøger som favoritter med en stjerne. Favoritterne gemmes i browserens localStorage, så de er der stadig næste dag, og en ny side viser kun favoritterne.",
        krav: [
          "`Bibliotek.Client/Services/FavoritesService.cs` får `IJSRuntime` i konstruktøren og har `List<int> Ids`, `LoadAsync()`, `bool IsFavorite(int id)` og `ToggleAsync(int id)`",
          "`ToggleAsync` fjerner id'et, hvis det er der, og tilføjer det ellers. Bagefter gemmes listen som JSON under nøglen `favorites` med `localStorage.setItem`",
          "`FavoritesService` er registreret med `AddScoped` i klientens `Program.cs`",
          "Hver række på bogsiden har en knap, der viser ★ for en favorit og ☆ ellers, og som kalder `ToggleAsync`",
          "Siden `@page \"/favorites\"` viser titel og forfatter for favoritterne i en liste, eller \"Du har ingen favoritter endnu.\". Menuen har et punkt **Favoritter**",
          "Marker Dune og Hobbitten. Under Application → Local storage står `favorites` med værdien `[1,3]`. Luk browseren, og åbn siden igen: stjernerne er der stadig"
        ],
        tip: [
          "Byg servicen ud fra `CartService`. Her er det bare en `List<int>` i stedet for en liste af objekter.",
          "Kalder du siden `Favorites.razor` og skriver `@inject FavoritesService Favorites`, får du fejlen `CS0542: 'Favorites': member names cannot be the same as their enclosing type`. Kald filen `FavoritesPage.razor`.",
          "Knappen: `<button class=\"btn btn-outline-warning btn-sm\" @onclick=\"() => Favorites.ToggleAsync(b.Id)\">@(Favorites.IsFavorite(b.Id) ? \"★\" : \"☆\")</button>`. Siden med favoritter: hent alle bøger og brug `all.Where(b => Favorites.IsFavorite(b.Id)).ToList()`."
        ],
        fri: true,
        output: "favorites: [1,3]\nMine favoritter:\nDune (Frank Herbert)\nHobbitten (J.R.R. Tolkien)",
        frag: true,
        loesning: R`// Bibliotek.Client/Services/FavoritesService.cs
using System.Text.Json;
using Microsoft.JSInterop;

namespace Bibliotek.Client.Services;

public class FavoritesService
{
    private readonly IJSRuntime _js;

    public FavoritesService(IJSRuntime js)
    {
        _js = js;
    }

    public List<int> Ids { get; private set; } = new List<int>();

    public async Task LoadAsync()
    {
        string? json = await _js.InvokeAsync<string?>("localStorage.getItem", "favorites");
        if (json != null)
        {
            Ids = JsonSerializer.Deserialize<List<int>>(json) ?? new List<int>();
        }
    }

    public bool IsFavorite(int id)
    {
        return Ids.Contains(id);
    }

    public async Task ToggleAsync(int id)
    {
        if (Ids.Contains(id))
        {
            Ids.Remove(id);
        }
        else
        {
            Ids.Add(id);
        }
        await _js.InvokeVoidAsync("localStorage.setItem", "favorites", JsonSerializer.Serialize(Ids));
    }
}

// Bibliotek.Client/Program.cs (ny linje + using Bibliotek.Client.Services; øverst)
builder.Services.AddScoped<FavoritesService>();

// Bibliotek.Client/_Imports.razor (ny linje)
@using Bibliotek.Client.Services

// Books.razor: @inject FavoritesService Favorites øverst,
// await Favorites.LoadAsync(); sidst i OnInitializedAsync,
// en tom <th></th> i tabelhovedet og denne celle i hver række:
<td>
    <button class="btn btn-outline-warning btn-sm" @onclick="() => Favorites.ToggleAsync(b.Id)">
        @(Favorites.IsFavorite(b.Id) ? "★" : "☆")
    </button>
</td>

// Bibliotek.Client/Pages/FavoritesPage.razor
@page "/favorites"
@inject HttpClient Http
@inject FavoritesService Favorites

<PageTitle>Favoritter</PageTitle>

<h1>Mine favoritter</h1>

@if (books == null)
{
    <p><em>Henter …</em></p>
}
else if (books.Count == 0)
{
    <p>Du har ingen favoritter endnu.</p>
}
else
{
    <ul>
        @foreach (Book b in books)
        {
            <li>@b.Title (@b.Author)</li>
        }
    </ul>
}

@code {
    private List<Book>? books;

    protected override async Task OnInitializedAsync()
    {
        await Favorites.LoadAsync();
        List<Book>? all = await Http.GetFromJsonAsync<List<Book>>("api/books");
        books = new List<Book>();
        if (all != null)
        {
            books = all.Where(b => Favorites.IsFavorite(b.Id)).ToList();
        }
    }
}`,
        ekstra: ["Vis antallet af favoritter i menuen eller på bogsiden.", "Lav en knap **Glem mine favoritter**, der kalder `localStorage.removeItem` og tømmer listen."] },

      { t: "opgave", h: "Hele CRUD, database og publicering", projekt: "Bibliotek",
        md: "Gør Bibliotek færdigt: bøgerne skal kunne rettes og slettes, de skal ligge i en database, så de overlever en genstart, og appen skal publiceres og køres fra publiceringsmappen.",
        krav: [
          "EF Core ligger kun i server-projektet `Bibliotek`. `Bibliotek/Data/LibraryContext.cs` har `DbSet<Book> Books` og seeder de tre bøger med `HasData`",
          "Connection stringen `LibraryContext` står i serverens `appsettings.json` ({{LocalDB, databasen `Bibliotek`||SQLite, `Data Source=bibliotek.db`}}), og `LibraryContext` er registreret med `AddDbContext` i serverens `Program.cs`",
          "Migrationen `Init` er lavet og kørt",
          "`BooksController` bruger `LibraryContext` i stedet for listen og har GET alle, GET én, POST, PUT `{id}` (204 eller 404) og DELETE `{id}` (204 eller 404), alle `async`",
          "`BookEdit.razor` med `@page \"/books/edit/{Id:int}\"` henter bogen, viser formularen og gemmer med `PutAsJsonAsync`. Bogsiden har knapperne **Ret** og **Slet** i hver række",
          "Tilføj Momo igen (hun lå kun i listen i hukommelsen, og databasen starter med de tre bøger fra `HasData`). Ret Matildas år til 1989, og slet Momo. Stop programmet, og start igen: ændringerne er der stadig",
          "Appen er publiceret i Release og kører fra publiceringsmappen med `dotnet Bibliotek.dll --urls http://localhost:5080`"
        ],
        tip: [
          "Følg lektion 6 trin for trin, med `Book` og `LibraryContext` i stedet for `Product` og `ShopContext`. Siderne i klienten skal ikke ændres, når databasen kommer på: de kender kun API'et.",
          "{{Står **Default project** i Package Manager Console på `Bibliotek.Client`, finder `Add-Migration` ingen `DbContext`. Sæt det til `Bibliotek`.||Kør `dotnet ef` i mappen med `Bibliotek.csproj`, ikke i mappen med `.sln`-filen.}}",
          "Slet-knappen: `<button class=\"btn btn-danger btn-sm\" @onclick=\"() => Delete(b.Id)\">Slet</button>` og en `Delete`-metode med `Http.DeleteAsync($\"api/books/{id}\")`, der henter listen igen, hvis det lykkedes."
        ],
        fri: true,
        output: "Dune · Frank Herbert · 1965\nMatilda · Roald Dahl · 1989\nHobbitten · J.R.R. Tolkien · 1937",
        frag: true,
        loesning: R`// Bibliotek/Data/LibraryContext.cs
using Bibliotek.Shared;
using Microsoft.EntityFrameworkCore;

namespace Bibliotek.Data;

public class LibraryContext : DbContext
{
    public LibraryContext(DbContextOptions<LibraryContext> options) : base(options)
    {
    }

    public DbSet<Book> Books { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>().HasData(
            new Book { Id = 1, Title = "Dune", Author = "Frank Herbert", Year = 1965 },
            new Book { Id = 2, Title = "Matilda", Author = "Roald Dahl", Year = 1988 },
            new Book { Id = 3, Title = "Hobbitten", Author = "J.R.R. Tolkien", Year = 1937 }
        );
    }
}

// Bibliotek/Program.cs (nye linjer; using Bibliotek.Data; og using Microsoft.EntityFrameworkCore; øverst)
builder.Services.AddControllers();
builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("LibraryContext")));
// Mac: options.UseSqlite(…)

// Bibliotek/appsettings.json
"ConnectionStrings": {
  "LibraryContext": "Server=(localdb)\\MSSQLLocalDB;Database=Bibliotek;Trusted_Connection=True;TrustServerCertificate=True"
}
// Mac: "LibraryContext": "Data Source=bibliotek.db"

// Bibliotek/Controllers/BooksController.cs
using Bibliotek.Data;
using Bibliotek.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bibliotek.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BooksController : ControllerBase
{
    private readonly LibraryContext _context;

    public BooksController(LibraryContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
    {
        return await _context.Books.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetBook(int id)
    {
        Book? book = await _context.Books.FindAsync(id);
        if (book == null)
        {
            return NotFound();
        }
        return book;
    }

    [HttpPost]
    public async Task<ActionResult<Book>> PostBook(Book book)
    {
        _context.Books.Add(book);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutBook(int id, Book changed)
    {
        Book? book = await _context.Books.FindAsync(id);
        if (book == null)
        {
            return NotFound();
        }
        book.Title = changed.Title;
        book.Author = changed.Author;
        book.Year = changed.Year;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        Book? book = await _context.Books.FindAsync(id);
        if (book == null)
        {
            return NotFound();
        }
        _context.Books.Remove(book);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

// Bibliotek.Client/Pages/BookEdit.razor
@page "/books/edit/{Id:int}"
@inject HttpClient Http
@inject NavigationManager Nav

<PageTitle>Ret bog</PageTitle>

<h1>Ret bog</h1>

@if (book == null)
{
    <p><em>Henter …</em></p>
}
else
{
    <EditForm Model="book" OnValidSubmit="Save">
        <DataAnnotationsValidator />
        <div class="mb-3">
            <label>Titel</label>
            <InputText class="form-control" @bind-Value="book.Title" />
            <ValidationMessage For="() => book.Title" />
        </div>
        <div class="mb-3">
            <label>Forfatter</label>
            <InputText class="form-control" @bind-Value="book.Author" />
            <ValidationMessage For="() => book.Author" />
        </div>
        <div class="mb-3">
            <label>År</label>
            <InputNumber class="form-control" @bind-Value="book.Year" />
            <ValidationMessage For="() => book.Year" />
        </div>
        <button type="submit" class="btn btn-primary">Gem</button>
        <a href="books">Tilbage</a>
    </EditForm>
}

@code {
    [Parameter]
    public int Id { get; set; }

    private Book? book;

    protected override async Task OnInitializedAsync()
    {
        book = await Http.GetFromJsonAsync<Book>($"api/books/{Id}");
    }

    private async Task Save()
    {
        HttpResponseMessage response = await Http.PutAsJsonAsync($"api/books/{Id}", book);
        if (response.IsSuccessStatusCode)
        {
            Nav.NavigateTo("books");
        }
    }
}

// I Books.razor: knapperne i cellen med stjernen
<a class="btn btn-secondary btn-sm" href="books/edit/@b.Id">Ret</a>
<button class="btn btn-danger btn-sm" @onclick="() => Delete(b.Id)">Slet</button>

// og metoden i @code
private async Task Delete(int id)
{
    HttpResponseMessage response = await Http.DeleteAsync($"api/books/{id}");
    if (response.IsSuccessStatusCode)
    {
        books = await Http.GetFromJsonAsync<List<Book>>("api/books");
    }
}

// Publicering
// Visual Studio: højreklik på Bibliotek → Publish → Folder → Next → Finish → Publish
// Mac: dotnet publish -c Release -o publish  og  cp bibliotek.db publish/
// Kør i publiceringsmappen: dotnet Bibliotek.dll --urls http://localhost:5080`,
        ekstra: ["Slet en bog, der er favorit. Hvad sker der med stjernen og favoritsiden? (Id'et ligger stadig i localStorage, men bogen findes ikke længere i API'et, så den vises ikke.) Ret `ToggleAsync` eller favoritsiden, så gamle id'er bliver ryddet op.", "Byg samme app med Interactive Server i stedet, og sammenlign: hvor mange projekter, og hvor meget kode? Det er godt eksamensstof til at begrunde dit eget valg."] }
    ] }

  ]
});
})();
