// Modul 22 — Introduktion til Blazor. Forudsætter: modul 0–21.
// Al Blazor-kode er afprøvet i rigtige projekter (Indkoeb og Traening, .NET 10, dotnet new blazor),
// kørt i en browser og klikket igennem, og derefter sat ind med sprog: "razor" / frag: true.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m22", nr: 22, del: "Del 6 · SPA og Blazor", ikon: "🔥",
  titel: "Introduktion til Blazor",
  dag: "Kursusdag 19 · Introduktion til Blazor",
  intro: "Med **Blazor** bygger du interaktive websider i **C#** i stedet for JavaScript. Siden består af små, genbrugelige **komponenter**, der hver har deres egen HTML og C#-kode i én `.razor`-fil.\n\nI dette modul bygger du **Indkøbsliste** trin for trin: en side med varer, en underkomponent for hver vare, en formular med validering, søgning, der opdaterer sig for hvert tastetryk, og data, der hentes, når siden starter. Til sidst bygger du selv **Træningslog** ud fra en liste med krav. Blazor er et af de to valg til dit eksamensprojekt, så alt her kan du få brug for til eksamen.",
  video: ["19_Tors_Blazor.mp4 (3 t 28 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m22l1", titel: "Hvad er Blazor? C# i stedet for JavaScript", min: 15,
    ord: [
      ["Blazor", "Microsofts framework til interaktive websider, hvor du skriver logikken i C# i stedet for JavaScript. En del af ASP.NET Core."],
      ["Komponent", "Et selvstændigt stykke af en side med sin egen HTML og C#-kode, fx en knap med en tæller eller en linje i en liste. Kan genbruges mange steder."],
      [".razor-fil", "Filen, en Blazor-komponent bor i. Øverst HTML med `@`-udtryk, nederst C#-kode i en `@code`-blok."],
      ["Render mode", "Bestemmer, hvor en komponent kører, og om den kan reagere på klik: Static SSR, Interactive Server, Interactive WebAssembly eller Interactive Auto."],
      ["Static SSR", "Static server-side rendering: serveren laver HTML og sender det. Siden kan ikke reagere på klik uden at hente en ny side. Standard, når en komponent ikke har en render mode."],
      ["Interactive Server", "Komponenten kører på serveren. Browseren og serveren holder en forbindelse åben med SignalR, og hvert klik sendes til serveren."],
      ["WebAssembly", "Et format, som browseren kan køre hurtigt. Blazor bruger det til at køre .NET og din C#-kode direkte i browseren."],
      ["Interactive WebAssembly", "Komponenten downloades til browseren og kører dér. Ingen forbindelse til serveren er nødvendig for at reagere på klik."],
      ["Interactive Auto", "Starter som Interactive Server og skifter til WebAssembly, når filerne er hentet ned i browseren."]
    ],
    trin: [
      { t: "laes", h: "Problemet: to sprog til én side",
        md: "I MVC (modul 16–18) laver serveren en **hel ny side**, hver gang du klikker på et link eller sender en formular. Det virker fint, men siden blinker og hentes forfra.\n\nSkal en side reagere med det samme — en tæller, der går op, en liste, der filtreres, mens du skriver — skal noget kode køre i browseren. Det har hidtil betydet **JavaScript** (modul 14–15). Så skulle du skrive serveren i C# og browserdelen i JavaScript: to sprog, to måder at tænke på.\n\n**Blazor** løser det: du skriver **også** den interaktive del i **C#**. Blazor er en del af ASP.NET Core, så alt, hvad du har lært om C#, klasser, lister og LINQ, kan bruges direkte på siden.",
        noter: [
          ["MVC", "Hvert klik → ny forespørgsel → serveren laver en hel ny side."],
          ["JavaScript", "Kører i browseren og kan ændre siden uden at hente en ny. Men det er et andet sprog."],
          ["Blazor", "Interaktive sider skrevet i C#. Kun den del af siden, der ændrer sig, opdateres."]
        ] },
      { t: "laes", h: "En side bygges af komponenter",
        md: "I Blazor består en side af **komponenter**. En komponent er en lille, selvstændig del af siden med sin egen HTML og sin egen C#-kode. Den ligger i en fil, der ender på `.razor`.\n\nHer er en hel komponent: en tæller med en knap. Øverst står HTML. Nederst, i `@code { … }`, står almindelig C#.",
        kode: R`<p>Antal: @antal</p>

<button @onclick="Tael">Tæl</button>

@code {
    private int antal = 0;

    private void Tael()
    {
        antal++;
    }
}`,
        sprog: "razor",
        noter: [
          ["<p>Antal: @antal</p>", "Almindelig HTML. `@antal` betyder: skriv værdien af C#-variablen `antal` her."],
          ["@onclick=\"Tael\"", "Når der klikkes på knappen, kaldes C#-metoden `Tael`."],
          ["@code { … }", "C#-koden, der hører til komponenten: felter og metoder, præcis som i en klasse."],
          ["antal++;", "Tæller op. Bagefter tegner Blazor komponenten igen, så det nye tal står på siden."]
        ],
        md2: "`@` kender du fra Razor-views i MVC (modul 16): det skifter fra HTML til C#. Blazor bruger samme Razor-syntaks. Det nye er, at knappen kan kalde en C#-metode **direkte**, uden en controller og uden en ny side." },
      { t: "valg", q: "Hvad er den vigtigste idé bag Blazor?",
        svar: ["At man kan skrive interaktive websider i C# i stedet for JavaScript", "At man slet ikke skal skrive HTML længere", "At siderne laves som billeder på serveren", "At man skal skrive både C# og JavaScript til hver knap"],
        ret: 0, fordi: "Blazor lader dig skrive den interaktive del af siden i **C#**. HTML skriver du stadig — det er komponentens markup — men logikken, der reagerer på klik, er C#." },
      { t: "valg", q: "Hvad er en komponent i Blazor?",
        svar: ["En selvstændig del af en side med sin egen HTML og C#-kode i en .razor-fil", "En tabel i databasen", "En controller, der modtager forespørgsler", "En JavaScript-fil, der styrer knapperne"],
        ret: 0, fordi: "En komponent samler **markup og kode** i én `.razor`-fil. En hel side er selv en komponent, og den kan indeholde andre komponenter — en tæller, en menu, en linje i en liste." },
      { t: "laes", h: "Render modes: hvor kører komponenten?",
        md: "En komponents **render mode** bestemmer, **hvor** dens C#-kode kører, og **om** den kan reagere på klik. Der er fire. Du skal kunne forklare dem til eksamen, men i dette modul og i modul 23 bruger du kun **Interactive Server**. Modul 24 handler om WebAssembly og Auto.",
        noter: [
          ["Static SSR", "Serveren laver HTML og sender det. Ingen interaktivitet: en knap med `@onclick` gør ingenting. Bruges til sider, der kun viser noget. Det er standarden, hvis en komponent ikke får en render mode."],
          ["Interactive Server", "C#-koden kører **på serveren**. Browseren og serveren holder en forbindelse åben med **SignalR** (som chatten i modul 20). Et klik sendes til serveren, metoden kører dér, og serveren sender kun ændringerne tilbage."],
          ["Interactive WebAssembly", ".NET og din kode **downloades til browseren** og kører dér. Første besøg tager længere tid, men bagefter kræver et klik ingen server."],
          ["Interactive Auto", "Starter som Interactive Server, mens WebAssembly-filerne hentes i baggrunden. Ved næste besøg kører komponenten som WebAssembly."]
        ],
        md2: "Man vælger render mode i toppen af en komponent med fx `@rendermode InteractiveServer`." },
      { t: "valg", q: "En komponent har en knap med `@onclick`, men **ingen** render mode. Hvad sker der, når man klikker?",
        svar: ["Ingenting — uden render mode er komponenten Static SSR, så klikket når aldrig C#-koden", "Metoden kører i browseren", "Metoden kører på serveren som normalt", "Siden går ned med en fejl"],
        ret: 0, fordi: "Static SSR betyder: serveren sender færdig HTML og glemmer så siden. Der er ingen forbindelse, som klikket kan sendes ad. Det er den hyppigste begynderfejl i Blazor: knappen ser rigtig ud, men intet sker. Løsningen er `@rendermode InteractiveServer` øverst i komponenten." },
      { t: "valg", q: "Med **Interactive Server** klikker du på en knap. Hvor kører C#-metoden?",
        svar: ["På serveren — klikket sendes dertil gennem en SignalR-forbindelse", "I browseren som WebAssembly", "I databasen", "I JavaScript, som Blazor har oversat C#-koden til"],
        ret: 0, fordi: "Ved Interactive Server bliver koden på serveren. Browseren sender kun besked om klikket, og serveren svarer med de dele af siden, der er ændret. Derfor kan koden bruge databasen direkte (modul 23) — men den kræver, at forbindelsen holdes åben." },
      { t: "valg", q: "Hvorfor må en Interactive WebAssembly-komponent **ikke** have adgangskoden til databasen i sin kode?",
        svar: ["Fordi koden downloades til brugerens browser, hvor alle kan læse den", "Fordi WebAssembly ikke kan bruge tekststrenge", "Fordi databasen kun kan bruges fra JavaScript", "Det må den gerne — koden er krypteret"],
        ret: 0, fordi: "Ved WebAssembly ligger din kode **hos brugeren**. Alt, hvad der står i den, kan læses. Derfor henter en WebAssembly-app sine data gennem et Web API (modul 19) på serveren. Det lærer du i modul 24." },
      { t: "valg", q: "Hvad gør render mode **Interactive Auto**?",
        svar: ["Starter som Interactive Server og kører som WebAssembly, når filerne er hentet", "Vælger tilfældigt mellem Server og WebAssembly", "Slår interaktiviteten fra automatisk", "Laver siden om til MVC"],
        ret: 0, fordi: "Auto prøver at få det bedste fra begge: hurtig start med Server og senere mindre belastning af serveren, fordi koden kører i browseren." },
      { t: "laes", h: "Blazor og MVC side om side",
        md: "Du har nu to måder at bygge dit eksamensprojekt på. Begge er ASP.NET Core, begge bruger Razor-syntaks og kan bruge EF Core.",
        noter: [
          ["Byggesten", "MVC: controller + view + model. Blazor: komponenter (`.razor`-filer)."],
          ["Hvem modtager klikket?", "MVC: en action i en controller, og serveren svarer med en ny side. Blazor: en metode i komponenten, og kun den ændrede del af siden opdateres."],
          ["Adresser", "MVC: routing til `Controller/Action`. Blazor: `@page \"/adresse\"` øverst i komponenten."],
          ["Filtyper", "MVC: `.cshtml`. Blazor: `.razor`."],
          ["Hvornår hvad?", "MVC er enkelt og godt til sider, der mest viser og gemmer data. Blazor er godt, når siden skal reagere meget uden at hente nye sider."]
        ] },
      { t: "valg", q: "Hvilket udsagn om Blazor og MVC er rigtigt?",
        svar: ["Begge er en del af ASP.NET Core og bruger Razor-syntaks, men Blazor bygges af komponenter i .razor-filer", "Blazor kan ikke bruge en database", "MVC kører altid i browseren", "Blazor bruger controllere til hvert klik"],
        ret: 0, fordi: "Razor-syntaksen med `@` er fælles. Forskellen er byggestenene: MVC har controllere og views, Blazor har komponenter, der selv indeholder både markup og kode." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er Blazor, og hvad er forskellen på render modes Static SSR, Interactive Server og Interactive WebAssembly?",
        svar: "Blazor er en del af ASP.NET Core, hvor man bygger interaktive websider af **komponenter** i `.razor`-filer og skriver logikken i **C#** i stedet for JavaScript. Ved **Static SSR** laver serveren HTML og sender det, men siden kan ikke reagere på klik. Ved **Interactive Server** kører koden på **serveren**, og browseren sender klik gennem en **SignalR**-forbindelse. Ved **Interactive WebAssembly** downloades koden og .NET til **browseren** og kører dér, så man ikke må have hemmeligheder i koden.",
        noegle: ["komponenter", "C#", "Static SSR", "serveren", "SignalR", "browseren"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m22l2", titel: "Opret en Blazor Web App og find rundt", min: 18,
    ord: [
      ["Blazor Web App", "Projektskabelonen til Blazor i .NET 10. Kan bruge alle fire render modes. I terminalen: `dotnet new blazor`."],
      ["Interactivity location", "Valget, når projektet laves: **Per page/component** (hver side vælger selv med `@rendermode`) eller **Global** (hele appen er interaktiv)."],
      ["App.razor", "Rodkomponenten: selve HTML-siden med `<head>` og `<body>`. Indeholder `<Routes />` og indlæser Blazors JavaScript-fil."],
      ["Routes.razor", "Indeholder `Router`, der finder den komponent, hvis `@page` passer til adressen, og viser den inde i layoutet."],
      ["MainLayout.razor", "Layoutet, som alle sider vises inde i: menuen til venstre og `@Body`, hvor selve siden kommer."],
      ["NavMenu.razor", "Menuen til venstre. Hvert menupunkt er en `NavLink`."],
      ["_Imports.razor", "`@using`-linjer, der gælder for alle komponenter i mappen og dens undermapper."],
      ["@page", "Direktivet øverst i en komponent, der giver den en adresse, fx `@page \"/counter\"`. Komponenter uden `@page` er ikke sider, men dele af sider."],
      ["NavLink", "Blazors link-komponent til menuer. Får automatisk klassen `active`, når man står på den side, den peger på."]
    ],
    trin: [
      { t: "laes", h: "Modulets app: Indkøbsliste",
        md: "Gennem hele modulet bygger du **én** app, der hedder **Indkoeb**. Til sidst kan den:\n\n- vise en indkøbsliste med en linje pr. vare\n- markere en vare som købt og vise, hvor mange der mangler\n- fjerne en vare\n- tilføje en vare gennem en formular med validering\n- søge i listen, mens du skriver\n- hente startlisten, når siden åbnes\n\nHver lektion tilføjer ét stykke. Byg med, mens du læser: det er sådan, du lærer det, og det er sådan, du skal arbejde i dit eksamensprojekt.\n\nAppen har ingen database. Listen ligger i hukommelsen, så den starter forfra, når du genindlæser siden. Databasen kommer på i modul 23." },
      { t: "ide", h: "Opret projektet Indkoeb",
        md: "Lav projektet nu, og kør det, før du ændrer noget.",
        win: [
          "Start Visual Studio, og vælg **Create a new project**.",
          "Skriv `blazor` i søgefeltet, vælg **Blazor Web App**, og klik **Next**.",
          "Project name: `Indkoeb` → **Next**.",
          "Framework: **.NET 10.0**. Authentication type: **None**. **Interactive render mode: Server**. **Interactivity location: Per page/component**. Sæt flueben i **Include sample pages**. Klik **Create**.",
          "Kør projektet med den grønne pil ▶. Browseren åbner med **Hello, world!**.",
          "Klik på **Counter** i menuen, og klik på **Click me** et par gange. Klik derefter på **Weather**."
        ],
        mac: [
          "Åbn en terminal i den mappe, projektet skal ligge i, og skriv: `dotnet new blazor -o Indkoeb`. Skabelonen bruger som standard Interactive Server og Per page/component — det samme som valgene på Windows.",
          "Åbn mappen `Indkoeb` i Rider med **File → Open**.",
          "Kør projektet med den grønne pil ▶. Klik på adressen i vinduet **Run**, hvis browseren ikke åbner af sig selv. Du ser **Hello, world!**.",
          "Klik på **Counter** i menuen, og klik på **Click me** et par gange. Klik derefter på **Weather**."
        ],
        md2: "Bemærk: tallet på Counter-siden går op, uden at siden hentes forfra. Det er Blazors interaktivitet." },
      { t: "laes", h: "Rundtur i projektet",
        md: "Der er **ingen** `Controllers`- eller `Views`-mappe. I stedet ligger alt det, man ser, i mappen `Components`.",
        noter: [
          ["Components/Pages/", "Siderne: `Home.razor`, `Counter.razor`, `Weather.razor`, `Error.razor` og `NotFound.razor`. Hver har en `@page`-linje med sin adresse."],
          ["Components/Layout/", "`MainLayout.razor` (rammen om alle sider), `NavMenu.razor` (menuen) og `ReconnectModal.razor` (beskeden, der vises, hvis forbindelsen til serveren bliver afbrudt)."],
          ["Components/App.razor", "Selve HTML-siden: `<head>`, `<body>` og scriptet `blazor.web.js`, der får interaktiviteten til at virke."],
          ["Components/Routes.razor", "Routeren, der finder den side, der passer til adressen."],
          ["Components/_Imports.razor", "Fælles `@using`-linjer for alle komponenter."],
          ["wwwroot/", "Statiske filer: `app.css`, Bootstrap og ikonet. Samme som i MVC."],
          ["Program.cs", "Starter appen og registrerer Blazor. Gennemgås lige om lidt."],
          ["appsettings.json", "Indstillinger. Her kommer connection stringen til databasen i modul 23."],
          ["*.razor.css", "Fx `MainLayout.razor.css`: CSS, der kun gælder for den ene komponent."]
        ] },
      { t: "valg", q: "Du skal lave en ny side i en Blazor Web App. I hvilken mappe hører den til?",
        svar: ["Components/Pages", "Controllers", "Views/Home", "wwwroot"],
        ret: 0, fordi: "I Blazor er sider komponenter, og skabelonen samler dem i `Components/Pages`. Der er ingen controllere og ingen `Views`-mappe." },
      { t: "laes", h: "Program.cs linje for linje",
        md: "`Program.cs` ligner den fra MVC. Forskellen er de linjer, der slår Blazor til. Til eksamen skal du kunne sige, hvad hver linje gør.",
        kode: R`using Indkoeb.Components;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    app.UseHsts();
}
app.UseStatusCodePagesWithReExecute("/not-found", createScopeForStatusCodePages: true);
app.UseHttpsRedirection();

app.UseAntiforgery();

app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();`,
        frag: true,
        noter: [
          ["WebApplication.CreateBuilder(args)", "Laver en builder, der samler indstillinger og services. Samme som i MVC."],
          ["AddRazorComponents()", "Registrerer Blazor-komponenter som en service, så appen kan lave HTML ud fra `.razor`-filer."],
          [".AddInteractiveServerComponents()", "Slår **Interactive Server** til: SignalR-forbindelsen, som klik sendes ad."],
          ["builder.Build()", "Bygger appen. Herefter kommer pipelinen: de led, hver forespørgsel løber igennem."],
          ["UseExceptionHandler(\"/Error\" …) og UseHsts()", "Kun når appen **ikke** kører i udvikling: vis en pæn fejlside, og bed browseren altid bruge HTTPS."],
          ["UseStatusCodePagesWithReExecute(\"/not-found\" …)", "Findes adressen ikke (statuskode 404), vises siden `NotFound.razor`."],
          ["UseHttpsRedirection()", "Sender brugere fra http til https."],
          ["UseAntiforgery()", "Beskytter formularer mod falske indsendelser fra andre sider (anti-forgery, modul 16 og 20)."],
          ["MapStaticAssets()", "Gør filerne i `wwwroot` tilgængelige."],
          ["MapRazorComponents<App>()", "Gør komponenterne til sider. `App` er rodkomponenten i `App.razor`."],
          [".AddInteractiveServerRenderMode()", "Gør det muligt for komponenter at bruge `@rendermode InteractiveServer`."],
          ["app.Run()", "Starter webserveren."]
        ] },
      { t: "valg", q: "Du sletter `.AddInteractiveServerComponents()` og `.AddInteractiveServerRenderMode()` fra `Program.cs`. Hvad mister appen?",
        svar: ["Interactive Server — komponenter kan ikke længere reagere på klik på serveren", "Alle sider — appen viser ingenting", "CSS-filerne i wwwroot", "Muligheden for at bruge C# i komponenter"],
        ret: 0, fordi: "Uden de to linjer findes kun Static SSR. Siderne vises stadig, men knapper med `@onclick` virker ikke, og en side med `@rendermode InteractiveServer` giver en fejl, fordi den render mode ikke er slået til." },
      { t: "orden", q: "Sæt de vigtigste linjer i `Program.cs` i rækkefølge, så Blazor med Interactive Server virker.",
        linjer: [
          R`var builder = WebApplication.CreateBuilder(args);`,
          R`builder.Services.AddRazorComponents().AddInteractiveServerComponents();`,
          R`var app = builder.Build();`,
          R`app.UseAntiforgery();`,
          R`app.MapRazorComponents<App>().AddInteractiveServerRenderMode();`,
          R`app.Run();`
        ],
        frag: true,
        fordi: "Først **services** på `builder`, så `Build()`, så **pipelinen** og til sidst `Run()`. Services skal registreres, før appen bygges — bagefter er det for sent." },
      { t: "laes", h: "Fra adresse til side: App, Routes og MainLayout",
        md: "Når browseren beder om `/counter`, sker der dette:\n\n1. `App.razor` er den ydre HTML-side. Inde i `<body>` står `<Routes />`.\n2. `Routes.razor` indeholder `Router`. Den leder alle komponenter igennem og finder den, der har `@page \"/counter\"`.\n3. `RouteView` viser den fundne komponent inde i layoutet `MainLayout`.\n4. `MainLayout.razor` har menuen til venstre og `@Body`. Det er på pladsen `@Body`, at Counter-siden kommer til at stå.",
        kode: R`<Router AppAssembly="typeof(Program).Assembly" NotFoundPage="typeof(Pages.NotFound)">
    <Found Context="routeData">
        <RouteView RouteData="routeData" DefaultLayout="typeof(Layout.MainLayout)" />
        <FocusOnNavigate RouteData="routeData" Selector="h1" />
    </Found>
</Router>`,
        sprog: "razor",
        noter: [
          ["AppAssembly=\"typeof(Program).Assembly\"", "Led efter komponenter med `@page` i dette projekt."],
          ["NotFoundPage=\"typeof(Pages.NotFound)\"", "Findes ingen komponent med adressen, vises `NotFound.razor`."],
          ["DefaultLayout=\"typeof(Layout.MainLayout)\"", "Alle sider vises inde i `MainLayout`. Samme idé som `_Layout.cshtml` i MVC."],
          ["FocusOnNavigate … Selector=\"h1\"", "Sætter fokus på sidens `<h1>`, når man skifter side. Det hjælper skærmlæsere."]
        ] },
      { t: "valg", q: "Browseren beder om `/counter`. Hvordan finder Blazor ud af, hvilken komponent der skal vises?",
        svar: ["Router i Routes.razor finder komponenten med @page \"/counter\"", "Den kalder action-metoden Counter i HomeController", "Den åbner filen wwwroot/counter.html", "NavMenu bestemmer det"],
        ret: 0, fordi: "Adressen står i komponenten selv, i linjen `@page \"/counter\"`. Routeren leder alle komponenter igennem og vælger den, der passer. Der er ingen controller imellem." },
      { t: "udfyld", q: "Du laver siden `Indkoebsliste.razor` med adressen `/liste` og vil have et menupunkt til den i `NavMenu.razor`. Udfyld hullerne.",
        kode: R`@* Components/Pages/Indkoebsliste.razor *@
@[[page]] "/liste"

<h1>Indkøbsliste</h1>

@* Components/Layout/NavMenu.razor *@
<div class="nav-item px-3">
    <[[NavLink]] class="nav-link" href="[[liste|/liste]]">
        Indkøbsliste
    </NavLink>
</div>`,
        sprog: "razor",
        fordi: "`@page` giver komponenten en adresse. I menuen bruger man `NavLink`, som er et almindeligt link, der også får klassen `active`, når man står på siden. `href` skrives uden skråstreg foran — sådan gør skabelonen også (`href=\"counter\"`). Det er `<base href=\"/\">` i `App.razor`, der gør adressen relativ til roden. `@* … *@` er en kommentar i Razor." },
      { t: "valg", q: "Komponenten `Indkoebsliste.razor` ligger i `Components/Pages`, men du har glemt linjen `@page \"/liste\"`. Hvad ser du, når du går til `/liste`?",
        svar: ["Not Found-siden, fordi ingen komponent har adressen /liste", "Indkøbslisten som normalt", "En compilerfejl i Visual Studio / Rider", "Startsiden Home"],
        ret: 0, fordi: "Uden `@page` er komponenten ikke en side, kun en del, der kan bruges inde i andre sider. Routeren finder ingen komponent med adressen og viser `NotFound.razor`. Det er mappen, der hedder Pages — men det er `@page`, der gør en komponent til en side." },
      { t: "ide", h: "Lav siden Indkøbsliste",
        md: "Lav den første version af din side, og sæt den i menuen.",
        win: [
          "Højreklik på mappen **Components/Pages** i Solution Explorer → **Add → Razor Component…**",
          "Skriv navnet `Indkoebsliste.razor`, og klik **Add**.",
          "Slet indholdet, og skriv koden nedenfor.",
          "Åbn `Components/Layout/NavMenu.razor`. Kopiér den sidste `<div class=\"nav-item px-3\">…</div>`-blok, og ret `href` til `liste` og teksten til `Indkøbsliste`.",
          "Kør appen, og klik på **Indkøbsliste** i menuen."
        ],
        mac: [
          "Højreklik på mappen **Components/Pages** i vinduet **Explorer** → **Add → File**.",
          "Skriv navnet `Indkoebsliste.razor`, og tryk Enter.",
          "Skriv koden nedenfor.",
          "Åbn `Components/Layout/NavMenu.razor`. Kopiér den sidste `<div class=\"nav-item px-3\">…</div>`-blok, og ret `href` til `liste` og teksten til `Indkøbsliste`.",
          "Kør appen, og klik på **Indkøbsliste** i menuen."
        ],
        kode: R`@page "/liste"

<PageTitle>Indkøbsliste</PageTitle>

<h1>Indkøbsliste</h1>

<p>Her kommer listen.</p>`,
        sprog: "razor",
        md2: "`<PageTitle>` er en indbygget komponent, der sætter teksten i browserfanen. Når du klikker på menupunktet, bliver det markeret, fordi `NavLink` får klassen `active`." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad sker der i en Blazor Web App, fra browseren beder om `/counter`, til siden står på skærmen?",
        svar: "`App.razor` er den ydre HTML-side, og i den står `<Routes />`. **Router** i `Routes.razor` leder komponenterne igennem og finder den, der har **`@page \"/counter\"`**. **RouteView** viser komponenten inde i **MainLayout**, hvor den kommer til at stå på pladsen **`@Body`**, med menuen ved siden af. Fordi Counter har `@rendermode InteractiveServer`, åbnes bagefter en SignalR-forbindelse, så knappen kan reagere.",
        noegle: ["App.razor", "Router", "@page", "MainLayout", "@Body", "rendermode"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m22l3", titel: "Den første komponent: Counter linje for linje", min: 18,
    ord: [
      ["@code", "Blokken nederst i en komponent med C#-kode: felter, properties og metoder."],
      ["@onclick", "Kobler et klik på et HTML-element til en C#-metode i komponenten."],
      ["Event handler", "Den metode, der kaldes, når en hændelse (event) sker, fx et klik. På dansk: hændelseshåndtering."],
      ["Envejsbinding", "`@antal` i markup: værdien vises på siden. Ændres variablen i koden, opdateres siden — men brugeren kan ikke ændre variablen fra siden."],
      ["Rendering", "At Blazor laver komponentens HTML ud fra den aktuelle værdi af variablerne. Sker igen efter hver event handler."],
      ["@rendermode InteractiveServer", "Linjen øverst i en komponent, der gør den interaktiv med koden på serveren."],
      ["Code-behind", "At lægge komponentens C#-kode i en separat fil, fx `Counter.razor.cs`, i stedet for i `@code`."],
      ["partial class", "En klasse, der er delt ud på flere filer. Compileren sætter delene sammen til én klasse."]
    ],
    trin: [
      { t: "laes", h: "Counter.razor linje for linje",
        md: "Åbn `Components/Pages/Counter.razor`. Hele komponenten er under 20 linjer. Til eksamen kan du blive bedt om at forklare den, så her er hver del:",
        kode: R`@page "/counter"
@rendermode InteractiveServer

<PageTitle>Counter</PageTitle>

<h1>Counter</h1>

<p role="status">Current count: @currentCount</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;
    }
}`,
        sprog: "razor",
        noter: [
          ["@page \"/counter\"", "Komponenten er en side med adressen `/counter`."],
          ["@rendermode InteractiveServer", "Komponenten er interaktiv, og koden kører på serveren. Uden linjen virker knappen ikke."],
          ["<PageTitle>Counter</PageTitle>", "Teksten i browserfanen."],
          ["@currentCount", "**Envejsbinding**: skriv værdien af feltet her. Står der 3 i feltet, står der 3 på siden."],
          ["role=\"status\"", "Fortæller skærmlæsere, at teksten ændrer sig. Har ikke noget med Blazor at gøre."],
          ["@onclick=\"IncrementCount\"", "Når der klikkes, kaldes metoden `IncrementCount`. Bemærk: **uden** parenteser — du giver Blazor metoden, du kalder den ikke selv."],
          ["@code { … }", "Komponentens C#-kode."],
          ["private int currentCount = 0;", "Et **felt**, der husker tallet, så længe komponenten lever."],
          ["currentCount++;", "Lægger 1 til. Når metoden er færdig, tegner Blazor komponenten igen."]
        ] },
      { t: "valg", q: "I Counter står `<p>Current count: @currentCount</p>`. Hvad gør `@currentCount`?",
        svar: ["Viser værdien af feltet currentCount, og visningen opdateres, når feltet ændres", "Lader brugeren skrive et nyt tal i feltet", "Kalder metoden IncrementCount", "Skriver teksten \"currentCount\" på siden"],
        ret: 0, fordi: "`@` skifter til C#, og udtrykket `currentCount` bliver til sin værdi. Det er **envejsbinding**: fra koden ud på siden. Brugeren kan ikke ændre tallet ved at skrive — kun ved at klikke på knappen, der kalder metoden." },
      { t: "laes", h: "Hvad sker der ved et klik?",
        md: "Med Interactive Server sker der dette, hver gang du klikker på **Click me**:\n\n1. Browseren sender en lille besked til serveren gennem SignalR-forbindelsen: der er klikket på knappen.\n2. Serveren kalder `IncrementCount()`. `currentCount` går fra 0 til 1.\n3. Når metoden er færdig, **renderer** Blazor komponenten igen: den laver HTML ud fra den nye værdi.\n4. Blazor sammenligner med den gamle HTML og sender **kun forskellen** til browseren: teksten `1` i stedet for `0`.\n5. Browseren retter den ene tekst. Resten af siden bliver stående.\n\nDu skal altså **ikke** selv sige \"opdater siden\". Det sker automatisk efter hver event handler.",
        noter: [
          ["Event handler", "Metoden, der kaldes ved en hændelse — her `IncrementCount`."],
          ["Rendering", "Blazor laver HTML ud fra variablernes værdier."],
          ["Kun forskellen sendes", "Derfor blinker siden ikke, og det går hurtigt."]
        ] },
      { t: "forudsig", q: "En komponent bliver til en almindelig C#-klasse, når projektet bygges. Felterne og metoderne i `@code` er klassens felter og metoder. Her er Counter skrevet som en klasse. Hvad udskrives?",
        kode: R`Counter c = new Counter();
c.IncrementCount();
c.IncrementCount();
c.IncrementCount();
Console.WriteLine(c.currentCount);

class Counter
{
    public int currentCount = 0;

    public void IncrementCount()
    {
        currentCount++;
    }
}`,
        output: "3",
        fordi: "Tre klik er tre kald af `IncrementCount`. Feltet lever i objektet, så det husker sin værdi mellem kaldene. Sådan husker komponenten også sit tal mellem klik: komponenten er et objekt, der lever, så længe siden er åben." },
      { t: "valg", q: "Du laver en ny side med en knap og `@onclick`, men glemmer linjen `@rendermode InteractiveServer`. Siden vises fint. Hvad sker der, når du klikker?",
        svar: ["Ingenting — siden er Static SSR, så klikket når ikke serveren", "Metoden kører, men tallet vises først efter genindlæsning", "Visual Studio / Rider giver en compilerfejl", "Siden genindlæses"],
        ret: 0, fordi: "Det er afprøvet: uden render mode står tallet stille, og der kommer ingen fejlbesked. Det er den hyppigste fejl i Blazor. Ser en knap død ud, så tjek først, om siden har `@rendermode InteractiveServer`." },
      { t: "laes", h: "Indkøbslisten får en tæller",
        md: "Nu bruger du det samme på din egen side. Indkøbslisten starter med én vare, mælk, og to knapper: `+` og `−`. Antallet må ikke blive negativt.",
        kode: R`@page "/liste"
@rendermode InteractiveServer

<PageTitle>Indkøbsliste</PageTitle>

<h1>Indkøbsliste</h1>

<p>Mælk: @antal stk.</p>

<button class="btn btn-primary" @onclick="Flere">+</button>
<button class="btn btn-secondary" @onclick="Faerre">−</button>
<button class="btn btn-link" @onclick="() => antal = 0">Nulstil</button>

@code {
    private int antal = 1;

    private void Flere()
    {
        antal++;
    }

    private void Faerre()
    {
        if (antal > 0)
        {
            antal--;
        }
    }
}`,
        sprog: "razor",
        noter: [
          ["@onclick=\"Flere\"", "Klik på `+` kalder `Flere`."],
          ["if (antal > 0)", "Almindelig C#: træk kun 1 fra, hvis der er noget at trække fra."],
          ["@onclick=\"() => antal = 0\"", "En **lambda** (modul 10): en lille metode uden navn, skrevet direkte i markup. Godt til én kort linje. Er der mere end én linje, så lav en rigtig metode."]
        ] },
      { t: "spor", q: "Følg koden. Den gør det samme som knapperne: brugeren klikker `−`, `−` og `+`. Skriv værdien af `antal` efter hver linje.",
        kode: R`int antal = 1;
Faerre();
Faerre();
Flere();

void Flere()
{
    antal++;
}

void Faerre()
{
    if (antal > 0)
    {
        antal--;
    }
}`,
        kolonner: ["antal"],
        raekker: [[1, "=1"], [2, "0"], [3, "0"], [4, "1"]],
        fordi: "Første `−` gør `antal` til 0. Ved andet `−` er betingelsen `antal > 0` falsk, så intet sker. `+` gør det til 1 igen. `if`-sætningen er det, der forhindrer et negativt antal." },
      { t: "udfyld", q: "Knappen skal kalde metoden `Flere`, der lægger 1 til `antal`. Udfyld hullerne.",
        kode: R`<p>Mælk: @antal stk.</p>

<button class="btn btn-primary" @[[onclick]]="Flere">+</button>

@[[code]] {
    private int antal = 1;

    private void Flere()
    {
        antal[[++|+= 1]];
    }
}`,
        sprog: "razor",
        fordi: "`@onclick` kobler klikket til metoden. `@code` er blokken med C#. `antal++` lægger 1 til, og Blazor tegner komponenten igen bagefter." },
      { t: "fejl", q: "Siden kan ikke bygges. Klik på linjen med fejlen.",
        kode: R`@page "/liste"
@rendermode InteractiveServer

<button class="btn btn-primary" @onclick="Flere()">+</button>

@code {
    private int antal = 1;

    private void Flere()
    {
        antal++;
    }
}`,
        linje: 4, sprog: "razor",
        fordi: "`@onclick=\"Flere()\"` **kalder** metoden med det samme, mens siden tegnes, og prøver at bruge resultatet som event handler. `Flere` returnerer `void`, så compileren siger: `CS1503: Argument 2: cannot convert from 'void' to 'Microsoft.AspNetCore.Components.EventCallback'`. Skriv navnet **uden** parenteser: `@onclick=\"Flere\"`.",
        rettet: R`@page "/liste"
@rendermode InteractiveServer

<button class="btn btn-primary" @onclick="Flere">+</button>

@code {
    private int antal = 1;

    private void Flere()
    {
        antal++;
    }
}` },
      { t: "skriv", q: "Tilføj en knap med teksten `Nulstil` under `+`-knappen. Den skal kalde en metode, der hedder `Nulstil`, og som sætter `antal` til 0. Skriv både knappen og metoden (metoden inde i `@code`).",
        foer: R`<p>Mælk: @antal stk.</p>

<button class="btn btn-primary" @onclick="Flere">+</button>`,
        tjek: [
          [/<button[^>]*@onclick="Nulstil"[^>]*>Nulstil<\/button>/, "Lav en knap med teksten `Nulstil` og `@onclick=\"Nulstil\"`"],
          [/@code\{/, "Skriv metoden inde i en `@code { … }`-blok"],
          [/(private )?void Nulstil\(\)\{/, "Lav metoden `void Nulstil()`"],
          [/antal=0;/, "Sæt `antal = 0;` i metoden"],
          [/@onclick="Nulstil\(\)"/, "Skriv metodenavnet uden parenteser i `@onclick`", "ikke"]
        ],
        forkert: [R`<button class="btn" @onclick="Nulstil()">Nulstil</button>

@code {
    private void Nulstil()
    {
        antal = 0;
    }
}`],
        loesning: R`<button class="btn btn-link" @onclick="Nulstil">Nulstil</button>

@code {
    private int antal = 1;

    private void Flere()
    {
        antal++;
    }

    private void Nulstil()
    {
        antal = 0;
    }
}`,
        sprog: "razor",
        fordi: "Det samme mønster hver gang: en knap med `@onclick=\"Metode\"` og en metode i `@code`, der ændrer et felt. Blazor tegner bagefter komponenten igen." },
      { t: "laes", h: "Koden i en separat fil: code-behind",
        md: "Bliver `@code`-blokken lang, kan du flytte C#-koden til en fil for sig. Filen hedder det samme som komponenten plus `.cs`: til `Indkoebsliste.razor` hører `Indkoebsliste.razor.cs`. Visual Studio og Rider viser den under `.razor`-filen. Det viste læreren også i timen.",
        kode: R`namespace Indkoeb.Components.Pages;

public partial class Indkoebsliste
{
    private int antal = 1;

    private void Flere()
    {
        antal++;
    }
}`,
        frag: true,
        noter: [
          ["namespace Indkoeb.Components.Pages;", "Skal passe til mappen, komponenten ligger i. Ellers bliver det to forskellige klasser."],
          ["public partial class Indkoebsliste", "Samme navn som `.razor`-filen. `partial` betyder, at klassen er delt på flere filer: markup i `.razor`, kode i `.razor.cs`. Compileren sætter dem sammen."],
          [".razor-filen", "Indeholder nu kun `@page`, `@rendermode` og markup — ingen `@code`."]
        ],
        md2: "Begge måder er lige gode. I dette modul bruger vi `@code`, så du ser markup og kode på samme skærm." },
      { t: "valg", q: "Du flytter koden fra `Indkoebsliste.razor` til `Indkoebsliste.razor.cs`. Hvad skal der stå i den nye fil?",
        svar: ["public partial class Indkoebsliste — samme navn som komponenten og med partial", "public class IndkoebslisteKode", "public class Indkoebsliste : Controller", "@code { … } ligesom i .razor-filen"],
        ret: 0, fordi: "Komponenten **er** en klasse, der hedder det samme som filen. Med `partial` kan klassen deles i to filer. Glemmer du `partial`, eller staver du navnet forkert, siger compileren, at klassen findes to gange, eller at den ikke kan finde dine metoder." },
      { t: "ide", h: "Byg tælleren, og se den i debuggeren",
        md: "Skriv koden fra trinnet **Indkøbslisten får en tæller** ind i din `Indkoebsliste.razor` (behold `@page`-linjen og `<PageTitle>`). Kør, og klik på `+`, `−` og **Nulstil**.\n\nSe så koden arbejde:\n\n1. Klik i margenen ud for linjen `antal++;` i `Flere`, så der kommer en rød prik (et breakpoint).\n2. Start med debuggeren: {{**F5** eller den grønne pil ▶ i Visual Studio||den grønne bille-knap i Rider}}.\n3. Klik på `+` i browseren. Programmet stopper på din linje.\n4. Se `antal` i {{vinduet **Locals**||vinduet **Threads & Variables**}}. Gå ét skridt frem med **Step Over**, og se tallet gå én op.\n5. Fortsæt programmet. Nu står det nye tal på siden.\n\nBemærk: metoden kører på serveren, selvom du klikker i browseren. Det er Interactive Server." },
      { t: "forklar", q: "Eksamensspørgsmål: Forklar, hvad der sker i Counter-komponenten, når brugeren klikker på knappen.",
        svar: "Knappen har **`@onclick=\"IncrementCount\"`**, så et klik kalder metoden `IncrementCount` i **`@code`**-blokken. Fordi komponenten har **`@rendermode InteractiveServer`**, sendes klikket gennem **SignalR** til serveren, hvor metoden kører og lægger 1 til feltet `currentCount`. Bagefter **renderer** Blazor komponenten igen, og kun forskellen sendes til browseren, så `@currentCount` viser det nye tal uden at hele siden hentes igen.",
        noegle: ["@onclick", "@code", "rendermode", "SignalR", "renderer", "forskellen"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m22l4", titel: "Komponenter i komponenter: [Parameter] og EventCallback", min: 20,
    ord: [
      ["Underkomponent", "En komponent, der bruges inde i en anden komponent, skrevet som et HTML-tag: `<VareLinje … />`. På engelsk: child component."],
      ["Forældrekomponent", "Den komponent, der bruger en underkomponent. På engelsk: parent component."],
      ["[Parameter]", "Attribut på en public property i en komponent. Gør, at forælderen kan give den en værdi som et attribut i tagget."],
      ["EventCallback", "En parameter, som underkomponenten kan kalde for at fortælle forælderen, at noget er sket. Forælderen giver en metode med."],
      ["EventCallback<T>", "En EventCallback, der sender en værdi af typen T med, fx `EventCallback<string>` med navnet på varen."],
      ["InvokeAsync", "Kalder den metode, forælderen har givet til en EventCallback: `OnKoebt.InvokeAsync(Navn)`."],
      ["Data ned, hændelser op", "Tommelfingerreglen: forælderen sender data ned med parametre, underkomponenten sender hændelser op med EventCallback."]
    ],
    trin: [
      { t: "laes", h: "Én komponent pr. vare",
        md: "Indkøbslisten skal vise mange varer, og hver vare skal se ens ud: antal, navn og en knap. I stedet for at skrive samme HTML igen og igen laver du **én komponent** for en vare og bruger den mange gange — præcis som du laver én klasse og mange objekter.\n\nKomponenten hedder `VareLinje.razor` og ligger direkte i mappen `Components` (ikke i `Pages`), fordi den ikke er en side. Den har **ingen** `@page`-linje.",
        kode: R`<li class="list-group-item">
    @Antal × @Navn
</li>

@code {
    [Parameter]
    public string Navn { get; set; } = "";

    [Parameter]
    public int Antal { get; set; }
}`,
        sprog: "razor",
        noter: [
          ["Ingen @page", "Komponenten har ingen adresse. Den bruges kun inde i andre komponenter."],
          ["[Parameter]", "Gør propertyen til en **parameter**: forælderen kan give den en værdi."],
          ["public … { get; set; }", "Parametre skal være **public properties** (modul 4), ikke felter."],
          ["= \"\";", "Startværdi, så `Navn` aldrig er `null`."],
          ["@Antal × @Navn", "Viser værdierne, som forælderen har sendt med."]
        ] },
      { t: "valg", q: "Hvorfor har `VareLinje.razor` ingen `@page`-linje?",
        svar: ["Fordi den ikke er en side med egen adresse, men en del, der bruges inde i en side", "Fordi @page kun virker i Program.cs", "Fordi komponenter med parametre ikke må have en adresse", "Det er en fejl — alle komponenter skal have @page"],
        ret: 0, fordi: "`@page` gør en komponent til en side, man kan gå til i adresselinjen. En vare-linje giver ikke mening alene; den hører hjemme inde i indkøbslisten." },
      { t: "laes", h: "Brug komponenten som et tag",
        md: "I forælderen — `Indkoebsliste.razor` — skriver du komponentens navn som et HTML-tag. Parametrene gives som attributter med **samme navn** som propertyen.",
        kode: R`<ul class="list-group mb-3">
    <VareLinje Navn="Mælk" Antal="2" />
    <VareLinje Navn="Rugbrød" Antal="1" />
    <VareLinje Navn="Æbler" Antal="6" />
</ul>`,
        sprog: "razor",
        noter: [
          ["<VareLinje … />", "Tagget hedder det samme som filen. Komponentnavne skal starte med stort bogstav — så kan Blazor se forskel på dem og almindelige HTML-tags."],
          ["Navn=\"Mælk\"", "Sætter parameteren `Navn` til teksten `Mælk`."],
          ["Antal=\"2\"", "Sætter parameteren `Antal`. Fordi den er en `int`, bliver `\"2\"` læst som tallet 2."],
          ["/>", "Tagget lukkes med det samme, fordi der ikke er noget indhold imellem."]
        ],
        md2: "Resultatet er tre linjer: `2 × Mælk`, `1 × Rugbrød` og `6 × Æbler`. Én komponent, tre forskellige værdier — det er **genbrug**." },
      { t: "forudsig", q: "En komponent er en klasse, og en parameter er en property. Her gør C# det samme som `<VareLinje Navn=\"Ost\" Antal=\"3\" />`. Hvad udskrives?",
        kode: R`VareLinje linje = new VareLinje();
linje.Navn = "Ost";
linje.Antal = 3;
Console.WriteLine(linje.Vis());

class VareLinje
{
    public string Navn { get; set; } = "";
    public int Antal { get; set; }

    public string Vis()
    {
        return $"{Antal} × {Navn}";
    }
}`,
        output: "3 × Ost",
        fordi: "Blazor laver et objekt af komponenten og sætter dens parametre ud fra attributterne i tagget — præcis som linje 2 og 3 her. Bagefter laves HTML ud fra værdierne." },
      { t: "udfyld", q: "Komponenten `VareLinje` skal have parametrene `Navn` (tekst) og `Antal` (heltal), og forælderen skal vise 2 × Mælk. Udfyld hullerne.",
        kode: R`@* Components/VareLinje.razor *@
<li class="list-group-item">@Antal × @Navn</li>

@code {
    [Parameter]
    public [[string]] Navn { get; set; } = "";

    [Parameter]
    public [[int]] Antal { get; set; }
}

@* I Indkoebsliste.razor *@
<[[VareLinje]] Navn="Mælk" Antal="[[2]]" />`,
        sprog: "razor",
        fordi: "Parametre er almindelige properties med `[Parameter]` over. Tagget i forælderen hedder det samme som komponentens fil, og attributterne hedder det samme som parametrene." },
      { t: "fejl", q: "Siden kan bygges, men når man går til den, går den ned med en fejl. Én af de to properties mangler noget. Klik på den linje, hvor den property står.",
        kode: R`<li class="list-group-item">@Antal × @Navn</li>

@code {
    public string Navn { get; set; } = "";

    [Parameter]
    public int Antal { get; set; }
}`,
        linje: 4, sprog: "razor",
        fordi: "`Navn` mangler `[Parameter]`. Når forælderen skriver `<VareLinje Navn=\"Mælk\" … />`, stopper appen med: `InvalidOperationException: Object of type 'VareLinje' has a property matching the name 'Navn', but it does not have [Parameter] …`. Fejlen kommer først, når siden vises — ikke når projektet bygges.",
        rettet: R`<li class="list-group-item">@Antal × @Navn</li>

@code {
    [Parameter]
    public string Navn { get; set; } = "";

    [Parameter]
    public int Antal { get; set; }
}` },
      { t: "laes", h: "Hændelser op: EventCallback",
        md: "Nu skal hver linje have en knap **Købt**, og forælderen skal tælle, hvor mange varer der er købt. Men tælleren ligger i forælderen, og knappen ligger i underkomponenten. Underkomponenten kan ikke se forælderens felter.\n\nLøsningen er en **EventCallback**: en parameter, der indeholder en **metode fra forælderen**. Underkomponenten kalder den, når der klikkes. Forælderen bestemmer selv, hvad der skal ske.",
        kode: R`@* Components/VareLinje.razor *@
<li class="list-group-item">
    @Antal × @Navn
    <button class="btn btn-sm btn-success float-end" @onclick="OnKoebt">Købt</button>
</li>

@code {
    [Parameter]
    public string Navn { get; set; } = "";

    [Parameter]
    public int Antal { get; set; }

    [Parameter]
    public EventCallback OnKoebt { get; set; }
}

@* Components/Pages/Indkoebsliste.razor *@
<ul class="list-group mb-3">
    <VareLinje Navn="Mælk" Antal="2" OnKoebt="MarkerKoebt" />
    <VareLinje Navn="Rugbrød" Antal="1" OnKoebt="MarkerKoebt" />
    <VareLinje Navn="Æbler" Antal="6" OnKoebt="MarkerKoebt" />
</ul>

<p>Købt: @koebt</p>

@code {
    private int koebt = 0;

    private void MarkerKoebt()
    {
        koebt++;
    }
}`,
        sprog: "razor",
        noter: [
          ["EventCallback OnKoebt", "En parameter, der holder en metode. Navnet starter med `On` efter konventionen."],
          ["@onclick=\"OnKoebt\"", "Klik på knappen kalder den metode, forælderen har givet."],
          ["OnKoebt=\"MarkerKoebt\"", "Forælderen giver sin egen metode `MarkerKoebt` med — uden parenteser, ligesom ved `@onclick`."],
          ["Forælderen tegnes igen", "Når en EventCallback er kaldt, renderer Blazor **forælderen** igen. Derfor opdateres `Købt: …` af sig selv."]
        ] },
      { t: "valg", q: "Hvorfor bruger `VareLinje` en `EventCallback` i stedet for selv at lægge 1 til `koebt`?",
        svar: ["Fordi koebt ligger i forælderen, som underkomponenten ikke kan se — den kan kun give besked op", "Fordi en underkomponent ikke må have metoder", "Fordi @onclick kun virker i sider med @page", "Fordi int-felter ikke kan ændres i Blazor"],
        ret: 0, fordi: "Hver komponent er sit eget objekt med sine egne felter. Underkomponenten kender ikke forælderens `koebt`. Med EventCallback siger den bare \"der er klikket\", og forælderen bestemmer, hvad der skal ske. **Data går ned med parametre, hændelser går op med EventCallback.**" },
      { t: "laes", h: "Send en værdi med: EventCallback<string>",
        md: "Forælderen vil også vide, **hvilken** vare der blev købt. Så giver du EventCallback en type i spidse parenteser, og underkomponenten sender værdien med `InvokeAsync`.",
        kode: R`@* I VareLinje.razor *@
<button class="btn btn-sm btn-success float-end" @onclick="() => OnKoebt.InvokeAsync(Navn)">Købt</button>

@code {
    [Parameter]
    public EventCallback<string> OnKoebt { get; set; }
}

@* I Indkoebsliste.razor *@
<p>Købt: @koebt</p>
<p>Sidst købt: @sidst</p>

@code {
    private int koebt = 0;
    private string sidst = "ingen";

    private void MarkerKoebt(string navn)
    {
        koebt++;
        sidst = navn;
    }
}`,
        sprog: "razor",
        noter: [
          ["EventCallback<string>", "Callbacken sender en `string` med."],
          ["() => OnKoebt.InvokeAsync(Navn)", "En lambda: ved klik kaldes forælderens metode med `Navn` som argument. Her **skal** du bruge en lambda, fordi der skal et argument med."],
          ["MarkerKoebt(string navn)", "Forælderens metode tager nu en `string`. Typen skal passe til `EventCallback<string>`."]
        ] },
      { t: "spor", q: "Brugeren klikker **Købt** ved Mælk og derefter ved Æbler. Koden gør det samme som forælderens metode. Skriv `koebt` og `sidst` efter hver af de øverste linjer.",
        kode: R`int koebt = 0;
string sidst = "ingen";
MarkerKoebt("Mælk");
MarkerKoebt("Æbler");

void MarkerKoebt(string navn)
{
    koebt++;
    sidst = navn;
}`,
        kolonner: ["koebt", "sidst"],
        raekker: [[1, "=0", "=–"], [2, "=0", "=ingen"], [3, "1", "Mælk"], [4, "2", "Æbler"]],
        fordi: "Hvert klik kalder `MarkerKoebt` med navnet på varen. `koebt` tæller op, og `sidst` bliver overskrevet med det nyeste navn. Begge felter ligger i forælderen, så det er forælderen, der tegnes igen." },
      { t: "orden", q: "Sæt linjerne i `VareLinje.razor` i rækkefølge, så komponenten viser navnet og sender det op til forælderen ved klik. HTML'en står øverst og `@code` nederst.", alt: [[0, 1, 2, 3, 4, 6, 5, 7]],
        linjer: [
          R`<li class="list-group-item">`,
          R`    @Navn`,
          R`    <button @onclick="() => OnKoebt.InvokeAsync(Navn)">Købt</button>`,
          R`</li>`,
          R`@code {`,
          R`    [Parameter] public string Navn { get; set; } = "";`,
          R`    [Parameter] public EventCallback<string> OnKoebt { get; set; }`,
          R`}`
        ],
        sprog: "razor",
        fordi: "Markup først, `@code` til sidst. `<li>` åbnes før indholdet og lukkes efter knappen. De to parametre kan stå i begge rækkefølger i virkeligheden, men her står `Navn` først." },
      { t: "skriv", q: "I `VareLinje.razor` skal knappen **Fjern** sende `Navn` op til forælderen gennem en parameter, der hedder `OnFjern` og er en `EventCallback<string>`. Skriv knappen og parameteren.",
        foer: R`<li class="list-group-item">
    @Antal × @Navn`,
        efter: R`</li>`,
        tjek: [
          [/<button[^>]*@onclick="\(\) ?=> ?OnFjern\.InvokeAsync\(Navn\)"[^>]*>Fjern<\/button>/, "Lav knappen `Fjern` med `@onclick=\"() => OnFjern.InvokeAsync(Navn)\"`"],
          [/\[Parameter\]public EventCallback<string>OnFjern\{get;set;\}/, "Lav parameteren: `[Parameter] public EventCallback<string> OnFjern { get; set; }`"],
          [/@code\{/, "Skriv parameteren inde i en `@code { … }`-blok"]
        ],
        forkert: [R`<button @onclick="OnFjern(Navn)">Fjern</button>

@code {
    [Parameter]
    public EventCallback<string> OnFjern { get; set; }
}`],
        loesning: R`    <button class="btn btn-sm btn-danger float-end" @onclick="() => OnFjern.InvokeAsync(Navn)">Fjern</button>

@code {
    [Parameter]
    public string Navn { get; set; } = "";

    [Parameter]
    public int Antal { get; set; }

    [Parameter]
    public EventCallback<string> OnFjern { get; set; }
}`,
        sprog: "razor",
        fordi: "Samme mønster som `OnKoebt`: en parameter af typen `EventCallback<string>`, og en lambda i `@onclick`, der kalder `InvokeAsync` med værdien. Forælderen skriver så `OnFjern=\"Fjern\"` og har en metode `Fjern(string navn)`." },
      { t: "ide", h: "Byg VareLinje, og følg klikket i debuggeren",
        md: "1. Lav filen `Components/VareLinje.razor` ({{højreklik på **Components** → **Add → Razor Component…**||højreklik på **Components** → **Add → File**, navn `VareLinje.razor`}}), og skriv versionen med `EventCallback<string>` og knappen **Købt**.\n2. Ret `Indkoebsliste.razor`: fjern tælleren fra lektion 3, og skriv `<ul>` med tre `<VareLinje … OnKoebt=\"MarkerKoebt\" />`, `Købt: @koebt`, `Sidst købt: @sidst` og metoden `MarkerKoebt(string navn)`.\n3. Kør, og klik **Købt** ved Rugbrød. Under listen står `Købt: 1` og `Sidst købt: Rugbrød`.\n4. Sæt et breakpoint på linjen `koebt++;` i forælderen, og start med debuggeren. Klik **Købt** ved Æbler. Se i {{**Locals**||**Threads & Variables**}}, at parameteren `navn` er `\"Æbler\"`. Klikket startede i underkomponenten, men koden, der kører, er forælderens.",
        md2: "Kan siden ikke bygges, fordi `VareLinje` er ukendt? Tjek, at filen hedder præcis `VareLinje.razor`, og at den ligger i mappen `Components`." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvordan sender man data mellem en forældrekomponent og en underkomponent i Blazor?",
        svar: "Data går **ned** med **parametre**: underkomponenten har public properties med **`[Parameter]`**, og forælderen sætter dem som attributter i tagget, fx `<VareLinje Navn=\"Mælk\" />`. Hændelser går **op** med **EventCallback**: underkomponenten har en parameter af typen `EventCallback<T>`, som forælderen giver en af sine egne metoder. Når der klikkes, kalder underkomponenten **`InvokeAsync`**, forælderens metode kører, og forælderen tegnes igen. Det gør komponenterne **genbrugelige**, fordi underkomponenten ikke skal kende forælderen.",
        noegle: ["ned", "[Parameter]", "op", "EventCallback", "InvokeAsync", "genbrugelige"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m22l5", titel: "Data binding og formularer: @bind og EditForm", min: 20,
    ord: [
      ["Tovejsbinding", "`@bind` på et inputfelt: feltet viser variablens værdi, og når brugeren skriver, får variablen den nye værdi. Data går begge veje."],
      ["@bind:event", "Bestemmer, hvornår `@bind` opdaterer variablen. Standard er `onchange`; med `oninput` sker det ved hvert tastetryk."],
      ["onchange", "Hændelsen, når brugeren er færdig med et felt: forlader det eller trykker Enter."],
      ["oninput", "Hændelsen ved hvert tastetryk i et felt."],
      ["EditForm", "Blazors formular-komponent. Har en `Model` og kalder `OnValidSubmit`, når alle valideringer er i orden."],
      ["InputText / InputNumber", "Blazors inputfelter til tekst og tal. Bindes med `@bind-Value` til en property i modellen."],
      ["DataAnnotationsValidator", "Slår validering med attributter som `[Required]` og `[Range]` til i en EditForm."],
      ["ValidationMessage", "Viser fejlbeskeden for én property, fx `<ValidationMessage For=\"() => nyVare.Navn\" />`."],
      ["OnValidSubmit", "Den metode, EditForm kalder, når formularen sendes, og alle valideringer er i orden."]
    ],
    trin: [
      { t: "laes", h: "Envejs og tovejs",
        md: "`@antal` i markup er **envejsbinding**: værdien går fra koden ud på siden. Til et inputfelt skal det gå **begge veje**: feltet skal vise variablens værdi, og når brugeren skriver, skal variablen få den nye værdi. Det kaldes **tovejsbinding**, og det skrives med `@bind`.",
        kode: R`<input @bind="nytNavn" class="form-control" />

<p>Du skriver: @nytNavn</p>

@code {
    private string nytNavn = "";
}`,
        sprog: "razor",
        noter: [
          ["@bind=\"nytNavn\"", "Feltet og variablen hænger sammen. Ændres den ene, ændres den anden."],
          ["@nytNavn", "Almindelig envejsbinding: viser variablen."],
          ["Hvornår?", "Som standard opdateres variablen, når du **forlader** feltet (klikker et andet sted eller trykker Tab) eller trykker Enter. Det hedder hændelsen `onchange`."]
        ] },
      { t: "valg", q: "Du skriver `Ost` i feltet `<input @bind=\"nytNavn\" />` men trykker ikke på noget andet. Hvad står der i `<p>Du skriver: @nytNavn</p>`?",
        svar: ["Du skriver: — tom, fordi @bind først opdaterer, når du forlader feltet", "Du skriver: Ost", "Du skriver: O", "Du skriver: nytNavn"],
        ret: 0, fordi: "Det er afprøvet: teksten står tom, indtil feltet mister fokus (fx med Tab). Så kommer `Ost`. Standarden for `@bind` er hændelsen `onchange`, som først sker, når du er færdig med feltet." },
      { t: "laes", h: "Opdatér ved hvert tastetryk: @bind:event",
        md: "Til et **søgefelt** skal listen filtreres, mens du skriver. Så bruger du `@bind:event=\"oninput\"`. Nu opdateres variablen ved **hvert tastetryk**.",
        kode: R`<input @bind="soegning" @bind:event="oninput" placeholder="Søg" class="form-control" />

<p>Du søger efter: @soegning</p>

@code {
    private string soegning = "";
}`,
        sprog: "razor",
        noter: [
          ["@bind:event=\"oninput\"", "Opdatér ved hvert tastetryk i stedet for når feltet forlades."],
          ["Hvornår hvad?", "`oninput` til søgning og forhåndsvisning. Standarden (`onchange`) til almindelige felter, hvor du først vil reagere, når brugeren er færdig."],
          ["Kun med Interactive", "Begge dele kræver `@rendermode InteractiveServer`, ellers sker der ingenting."]
        ] },
      { t: "udfyld", q: "Søgefeltet skal være bundet til `soegning`, og variablen skal opdateres ved hvert tastetryk. Udfyld hullerne.",
        kode: R`<input @[[bind]]="soegning" @bind:[[event]]="[[oninput]]" placeholder="Søg" />

<p>Du søger efter: @soegning</p>

@code {
    private string soegning = "";
}`,
        sprog: "razor",
        fordi: "`@bind` giver tovejsbinding. `@bind:event=\"oninput\"` ændrer, hvornår variablen opdateres: ved hvert tastetryk." },
      { t: "laes", h: "En model til formularen",
        md: "Nu skal brugeren kunne tilføje varer. En vare har navn, antal og om den er købt. Du laver en **modelklasse** med valideringsattributter — de samme som i MVC (modul 16).\n\nLav mappen `Models` i projektet og filen `Models/Vare.cs`. Tilføj så `@using Indkoeb.Models` nederst i `Components/_Imports.razor`, så alle komponenter kender `Vare` uden en `@using` i hver fil.",
        kode: R`using System.ComponentModel.DataAnnotations;

namespace Indkoeb.Models;

public class Vare
{
    [Required(ErrorMessage = "Skriv navnet på varen")]
    [StringLength(30, ErrorMessage = "Navnet må højst være 30 tegn")]
    public string Navn { get; set; } = "";

    [Range(1, 99, ErrorMessage = "Antal skal være mellem 1 og 99")]
    public int Antal { get; set; } = 1;

    public bool Koebt { get; set; }
}`,
        frag: true,
        noter: [
          ["[Required(ErrorMessage = …)]", "Navnet skal udfyldes. `ErrorMessage` er den danske fejltekst."],
          ["[StringLength(30 …)]", "Højst 30 tegn."],
          ["[Range(1, 99 …)]", "Antal skal være mellem 1 og 99."],
          ["= 1", "Startværdi: en ny vare har antal 1."],
          ["bool Koebt", "Om varen er købt. Bruges i lektion 6."],
          ["@using Indkoeb.Models i _Imports.razor", "Gælder for alle komponenter i `Components` og dens undermapper."]
        ] },
      { t: "valg", q: "Hvorfor skriver du `@using Indkoeb.Models` i `_Imports.razor` i stedet for øverst i hver komponent?",
        svar: ["Fordi linjerne i _Imports.razor gælder for alle komponenter i mappen og dens undermapper", "Fordi @using er forbudt i almindelige komponenter", "Fordi _Imports.razor er den eneste fil, der kan se mappen Models", "Fordi Program.cs læser _Imports.razor og opretter klassen"],
        ret: 0, fordi: "`_Imports.razor` er et fælles sted til `@using`-linjer. Alle komponenter i `Components` og undermapper som `Pages` og `Layout` får dem automatisk. Det sparer en linje i hver fil." },
      { t: "laes", h: "EditForm: formular med validering",
        md: "Blazor har sin egen formular-komponent, **EditForm**. Den kender modellen, kører valideringen og kalder din metode, når alt er i orden.",
        kode: R`<EditForm Model="nyVare" OnValidSubmit="TilfoejVare">
    <DataAnnotationsValidator />
    <div class="mb-2">
        <label>Navn</label>
        <InputText @bind-Value="nyVare.Navn" class="form-control" />
        <ValidationMessage For="() => nyVare.Navn" />
    </div>
    <div class="mb-2">
        <label>Antal</label>
        <InputNumber @bind-Value="nyVare.Antal" class="form-control" />
        <ValidationMessage For="() => nyVare.Antal" />
    </div>
    <button type="submit" class="btn btn-primary">Tilføj</button>
</EditForm>

<p>Varer på listen: @varer.Count</p>
<p>Sidst tilføjet: @sidst</p>

@code {
    private List<Vare> varer = new List<Vare>();
    private Vare nyVare = new Vare();
    private string sidst = "";

    private void TilfoejVare()
    {
        varer.Add(nyVare);
        sidst = $"{nyVare.Antal} × {nyVare.Navn}";
        nyVare = new Vare();
    }
}`,
        sprog: "razor",
        noter: [
          ["Model=\"nyVare\"", "Formularen arbejder på objektet `nyVare`."],
          ["OnValidSubmit=\"TilfoejVare\"", "Kaldes kun, når der trykkes på submit-knappen, **og** alle attributter er opfyldt."],
          ["<DataAnnotationsValidator />", "Slår valideringen med `[Required]`, `[Range]` osv. til. Uden den bliver attributterne ignoreret."],
          ["<InputText @bind-Value=\"nyVare.Navn\" />", "Tekstfelt med tovejsbinding til `Navn`. Blazors egne input-komponenter bruger `@bind-Value`, ikke `@bind`."],
          ["<InputNumber …>", "Talfelt bundet til `Antal`."],
          ["<ValidationMessage For=\"() => nyVare.Navn\" />", "Viser fejlbeskeden for `Navn`. `For` tager en lambda, der peger på propertyen."],
          ["nyVare = new Vare();", "Lav et **nyt**, tomt objekt til formularen. Hvorfor det er vigtigt, ser du om lidt."]
        ],
        md2: "Listen bliver vist i lektion 6. Indtil da viser siden, hvor mange varer der er, og den sidste." },
      { t: "valg", q: "Du klikker **Tilføj** med et tomt navnefelt. Hvad sker der?",
        svar: ["TilfoejVare kaldes ikke, og under feltet står \"Skriv navnet på varen\"", "TilfoejVare kaldes, og en vare uden navn tilføjes", "Siden går ned med en exception", "Siden genindlæses, og felterne tømmes"],
        ret: 0, fordi: "Det er afprøvet. `[Required]` er ikke opfyldt, så EditForm kalder **ikke** `OnValidSubmit`. `ValidationMessage` viser i stedet teksten fra `ErrorMessage`. Skriver du 100 i Antal, står der \"Antal skal være mellem 1 og 99\"." },
      { t: "spor", q: "Hvad sker der, hvis `TilfoejVare` **ikke** laver et nyt objekt med `nyVare = new Vare();`? Koden gør det samme: tilføjer Mælk, og så skriver brugeren `Æg` i formularen. Klassen `Vare` har kun en `string Navn`. Skriv værdierne efter hver linje.",
        kode: R`List<Vare> varer = new List<Vare>();
Vare nyVare = new Vare();
nyVare.Navn = "Mælk";
varer.Add(nyVare);
nyVare.Navn = "Æg";
string foerste = varer[0].Navn;`,
        omkring: ["", R`class Vare
{
    public string Navn { get; set; } = "";
}`],
        kolonner: ["nyVare.Navn", "foerste"],
        raekker: [[3, "=Mælk", "=–"], [4, "Mælk", "–"], [5, "Æg", "–"], [6, "Æg", "Æg"]],
        fordi: "`Vare` er en klasse, altså en **referencetype** (modul 4). `varer.Add(nyVare)` lægger **det samme objekt** i listen, ikke en kopi. Når formularen bagefter ændrer `nyVare.Navn`, ændres varen i listen også. Det er afprøvet i appen: uden `new Vare()` skifter den første vare navn til det, du skriver. Derfor laver `TilfoejVare` et nyt objekt til formularen efter hver tilføjelse." },
      { t: "forudsig", q: "Nu med rettelsen: efter `Add` får formularen et nyt objekt. Hvad udskrives?",
        kode: R`List<Vare> varer = new List<Vare>();
Vare nyVare = new Vare();
nyVare.Navn = "Mælk";
varer.Add(nyVare);
nyVare = new Vare();
nyVare.Navn = "Æg";
Console.WriteLine(varer[0].Navn);
Console.WriteLine(varer.Count);

class Vare
{
    public string Navn { get; set; } = "";
}`,
        output: "Mælk\n1",
        fordi: "`nyVare = new Vare()` lader variablen pege på et **nyt** objekt. Mælk-objektet i listen bliver ikke rørt. Æg er ikke tilføjet endnu, så listen har stadig 1 vare." },
      { t: "orden", q: "Sæt linjerne i rækkefølge, så formularen har validering og et navnefelt med fejlbesked. Inde i formularen er rækkefølgen: validatoren, feltet, fejlbeskeden, knappen.",
        linjer: [
          R`<EditForm Model="nyVare" OnValidSubmit="TilfoejVare">`,
          R`    <DataAnnotationsValidator />`,
          R`    <InputText @bind-Value="nyVare.Navn" class="form-control" />`,
          R`    <ValidationMessage For="() => nyVare.Navn" />`,
          R`    <button type="submit" class="btn btn-primary">Tilføj</button>`,
          R`</EditForm>`
        ],
        sprog: "razor",
        fordi: "Alt står inde i `EditForm`. Validatoren først, så feltet med sin fejlbesked lige under, og submit-knappen til sidst." },
      { t: "skriv", q: "Formularen har allerede et felt til `Navn`. Tilføj et talfelt til `nyVare.Antal` med `InputNumber` og `@bind-Value`, og lige under det en `ValidationMessage` for `Antal`.",
        foer: R`<EditForm Model="nyVare" OnValidSubmit="TilfoejVare">
    <DataAnnotationsValidator />
    <InputText @bind-Value="nyVare.Navn" class="form-control" />
    <ValidationMessage For="() => nyVare.Navn" />`,
        efter: R`    <button type="submit" class="btn btn-primary">Tilføj</button>
</EditForm>`,
        tjek: [
          [/<InputNumber[^>]*@bind-Value="nyVare\.Antal"/, "Lav et `<InputNumber @bind-Value=\"nyVare.Antal\" />`"],
          [/<ValidationMessage For="\(\) ?=> ?nyVare\.Antal"/, "Lav `<ValidationMessage For=\"() => nyVare.Antal\" />`"],
          [/@bind="nyVare\.Antal"/, "Blazors input-komponenter bruger `@bind-Value`, ikke `@bind`", "ikke"]
        ],
        forkert: [R`<InputNumber @bind="nyVare.Antal" />
<ValidationMessage For="() => nyVare.Antal" />`],
        loesning: R`    <InputNumber @bind-Value="nyVare.Antal" class="form-control" />
    <ValidationMessage For="() => nyVare.Antal" />`,
        sprog: "razor",
        fordi: "`InputNumber` er talfeltet. `@bind-Value` binder det til propertyen, og `ValidationMessage` viser fejlen fra `[Range]`, når antallet er uden for 1–99." },
      { t: "ide", h: "Byg formularen",
        md: "1. Lav `Models/Vare.cs`, og tilføj `@using Indkoeb.Models` nederst i `Components/_Imports.razor`.\n2. Tilføj formularen og `@code`-delen fra trinnet **EditForm: formular med validering** i `Indkoebsliste.razor`. Behold `<ul>` med de tre `VareLinje`-tags, `Købt: @koebt` og `MarkerKoebt` fra lektion 4 indtil videre. Men slet tre ting fra lektion 4: linjen `<p>Sidst købt: @sidst</p>`, feltet `private string sidst = \"ingen\";` og linjen `sidst = navn;`. Formularen har sit eget felt `sidst`, og to felter med samme navn giver byggefejlen `CS0102: The type 'Indkoebsliste' already contains a definition for 'sidst'`.\n3. Kør, og klik **Tilføj** med tomt navn. Under feltet står **Skriv navnet på varen**.\n4. Skriv `Ost` og antal `100`. Nu står der **Antal skal være mellem 1 og 99**.\n5. Ret antal til `2`, og klik **Tilføj**. Nu står der `Varer på listen: 1` og `Sidst tilføjet: 2 × Ost`, og felterne er tomme igen (antal står på 1).\n6. Sæt et breakpoint i `TilfoejVare`, og tilføj en vare mere. Se `nyVare` i {{**Locals**||**Threads & Variables**}}: klik på pilen ud for den, så ser du `Navn` og `Antal`, som du skrev dem." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er forskellen på `@antal` og `@bind`, og hvordan validerer en EditForm brugerens input?",
        svar: "`@antal` er **envejsbinding**: værdien vises på siden. `@bind` på et inputfelt er **tovejsbinding**: feltet viser værdien, og når brugeren skriver, opdateres variablen — som standard ved **onchange**, eller ved hvert tastetryk med `@bind:event=\"oninput\"`. En **EditForm** har en `Model` med valideringsattributter som `[Required]` og `[Range]`. Med **DataAnnotationsValidator** bliver de tjekket, `ValidationMessage` viser fejlene, og **OnValidSubmit** kaldes kun, når alle krav er opfyldt.",
        noegle: ["envejsbinding", "tovejsbinding", "onchange", "oninput", "EditForm", "DataAnnotationsValidator", "OnValidSubmit"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m22l6", titel: "Lister, betingelser og OnInitializedAsync", min: 22,
    ord: [
      ["@foreach i Razor", "En `foreach`-løkke i markup. Laver HTML (eller en komponent) for hvert element i en liste."],
      ["@if i Razor", "Et `if` i markup: viser kun HTML'en inde i blokken, når betingelsen er sand."],
      ["Livscyklus", "De faste trin, en komponent går igennem: den oprettes, får parametre, initialiseres og renderes. Du kan lægge kode ind i trinene."],
      ["OnInitializedAsync", "Livscyklus-metode, der kører én gang, når komponenten starter. Her henter man data. Findes også uden Async: `OnInitialized`."],
      ["override", "Nøgleordet, der bruges, når man skriver sin egen udgave af en metode fra basisklassen (modul 5)."],
      ["Prerendering", "Serveren laver sidens HTML én gang, før den interaktive forbindelse starter, så brugeren ser noget med det samme. Derfor kører OnInitializedAsync to gange."]
    ],
    trin: [
      { t: "laes", h: "En linje pr. vare med @foreach",
        md: "Indtil nu har du skrevet tre `VareLinje`-tags i hånden. Nu ligger varerne i en `List<Vare>`, og du laver en linje for hver med `@foreach`. `VareLinje` får nu **hele varen** som parameter i stedet for `Navn` og `Antal` hver for sig.",
        kode: R`@* Components/VareLinje.razor *@
<li class="list-group-item">
    <input type="checkbox" checked="@Vare.Koebt" @onchange="() => OnKoebt.InvokeAsync(Vare)" />
    @Vare.Antal × @Vare.Navn
    <button class="btn btn-sm btn-danger float-end" @onclick="() => OnFjern.InvokeAsync(Vare)">Fjern</button>
</li>

@code {
    [Parameter]
    public Vare Vare { get; set; } = new Vare();

    [Parameter]
    public EventCallback<Vare> OnKoebt { get; set; }

    [Parameter]
    public EventCallback<Vare> OnFjern { get; set; }
}

@* I Indkoebsliste.razor *@
<ul class="list-group mb-3">
    @foreach (var vare in varer)
    {
        <VareLinje Vare="vare" OnKoebt="SkiftKoebt" OnFjern="Fjern" />
    }
</ul>`,
        sprog: "razor",
        noter: [
          ["@foreach (var vare in varer)", "Almindelig `foreach` (modul 6) med `@` foran. Blokken gentages for hver vare."],
          ["<VareLinje Vare=\"vare\" … />", "Hver linje får sit eget `Vare`-objekt som parameter. Her er værdien en C#-variabel, ikke en tekst."],
          ["EventCallback<Vare>", "Callbacken sender hele varen op, så forælderen ved præcis hvilken."],
          ["checked=\"@Vare.Koebt\"", "Fluebenet viser, om varen er købt. Envejsbinding — ændringen sker i forælderen."],
          ["@onchange", "Hændelsen, når fluebenet sættes eller fjernes."]
        ] },
      { t: "forudsig", q: "`@foreach` laver en linje pr. vare. Her gør C# det samme og skriver linjerne ud. Hvad udskrives?",
        kode: R`List<Vare> varer = new List<Vare>
{
    new Vare { Navn = "Mælk", Antal = 2 },
    new Vare { Navn = "Rugbrød", Antal = 1 }
};
varer.Add(new Vare { Navn = "Ost", Antal = 3 });

foreach (var vare in varer)
{
    Console.WriteLine($"{vare.Antal} × {vare.Navn}");
}

class Vare
{
    public string Navn { get; set; } = "";
    public int Antal { get; set; } = 1;
}`,
        output: "2 × Mælk\n1 × Rugbrød\n3 × Ost",
        fordi: "`foreach` går listen igennem i rækkefølge, og `Add` sætter Ost sidst. I komponenten bliver hver gennemgang til en `<VareLinje>` i stedet for en linje i konsollen. Tilføjer du en vare til listen, kommer der automatisk en linje mere, næste gang komponenten renderes." },
      { t: "laes", h: "Forælderens metoder og @if",
        md: "Forælderen har tre metoder: tilføj, skift købt og fjern. Og den viser **Listen er tom.**, når der ikke er nogen varer, med `@if`. Over listen står, hvor mange varer der mangler at blive købt.",
        kode: R`<p>Mangler: @varer.Count(v => !v.Koebt) af @varer.Count</p>

@if (varer.Count == 0)
{
    <p>Listen er tom.</p>
}
else
{
    <ul class="list-group mb-3">
        @foreach (var vare in varer)
        {
            <VareLinje Vare="vare" OnKoebt="SkiftKoebt" OnFjern="Fjern" />
        }
    </ul>
}

@code {
    private void SkiftKoebt(Vare vare)
    {
        vare.Koebt = !vare.Koebt;
    }

    private void Fjern(Vare vare)
    {
        varer.Remove(vare);
    }
}`,
        sprog: "razor",
        noter: [
          ["varer.Count(v => !v.Koebt)", "LINQ (modul 9): tæl de varer, der **ikke** er købt. `!` betyder \"ikke\"."],
          ["@if … else", "Almindelig `if`/`else` med `@` foran. Kun den ene blok bliver til HTML."],
          ["vare.Koebt = !vare.Koebt", "Skift: `true` bliver `false`, og `false` bliver `true`."],
          ["varer.Remove(vare)", "Fjerner netop det objekt fra listen. Næste rendering har en linje mindre."]
        ] },
      { t: "forudsig", q: "Hvad udskrives? Koden bruger samme LINQ som linjen `Mangler: …` og det søgefilter, du laver om lidt.",
        kode: R`List<Vare> varer = new List<Vare>
{
    new Vare { Navn = "Mælk", Koebt = true },
    new Vare { Navn = "Rugbrød" },
    new Vare { Navn = "Æbler" }
};

Console.WriteLine($"Mangler: {varer.Count(v => !v.Koebt)} af {varer.Count}");

foreach (var vare in varer.Where(v => v.Navn.Contains("br", StringComparison.OrdinalIgnoreCase)))
{
    Console.WriteLine(vare.Navn);
}

class Vare
{
    public string Navn { get; set; } = "";
    public bool Koebt { get; set; }
}`,
        output: "Mangler: 2 af 3\nRugbrød",
        fordi: "Kun Mælk er købt, så 2 af 3 mangler. `Where` beholder kun de varer, hvis navn indeholder `br`. `OrdinalIgnoreCase` betyder, at store og små bogstaver er lige gode, så `BR` ville også finde Rugbrød." },
      { t: "spor", q: "Sådan tæller `Count(v => !v.Koebt)` i virkeligheden. Klassen `Vare` har `Navn` og `bool Koebt`. Følg løkken, og skriv `mangler` lige efter hver kørt linje. Kun linje 5, 8 og 10 er med i skemaet. Linje 8 kører én gang for hver vare, og den ændrer ikke noget.",
        kode: R`List<Vare> varer = new List<Vare>();
varer.Add(new Vare { Navn = "Mælk", Koebt = true });
varer.Add(new Vare { Navn = "Rugbrød" });
varer.Add(new Vare { Navn = "Æbler" });
int mangler = 0;
foreach (Vare v in varer)
{
    if (!v.Koebt)
    {
        mangler++;
    }
}`,
        omkring: ["", R`class Vare
{
    public string Navn { get; set; } = "";
    public bool Koebt { get; set; }
}`],
        kolonner: ["mangler"],
        raekker: [[5, "=0"], [8, "=0"], [8, "0"], [10, "1"], [8, "1"], [10, "2"]],
        fordi: "Første gang i løkken er `v` Mælk. Den er købt, så `!v.Koebt` er falsk, og linje 10 springes over. Rugbrød og Æbler er ikke købt, så linje 10 kører to gange. Resultatet er 2 — det samme som `Count(v => !v.Koebt)`." },
      { t: "laes", h: "Hent data, når siden starter: OnInitializedAsync",
        md: "I en rigtig app kommer varerne fra en database eller et API, og det tager tid. Data hentes i **livscyklus-metoden** `OnInitializedAsync`, som Blazor kalder én gang, når komponenten starter. Du skriver din egen udgave med `override` (modul 5).\n\nHer **lader** vi, som om det tager et sekund, med `Task.Delay` (modul 8). I modul 23 bliver det et rigtigt databasekald.",
        kode: R`@if (varer == null)
{
    <p><em>Henter listen …</em></p>
}
else
{
    @* … listen, søgefeltet og formularen … *@
}

@code {
    private List<Vare>? varer;

    protected override async Task OnInitializedAsync()
    {
        await Task.Delay(1000);
        varer = new List<Vare>
        {
            new Vare { Navn = "Mælk", Antal = 2 },
            new Vare { Navn = "Rugbrød", Antal = 1 },
            new Vare { Navn = "Æbler", Antal = 6 }
        };
    }
}`,
        sprog: "razor",
        noter: [
          ["List<Vare>? varer;", "`?` betyder, at variablen må være `null`. Det er den, indtil dataene er hentet."],
          ["protected override async Task OnInitializedAsync()", "Din udgave af livscyklus-metoden. `async Task`, fordi der ventes med `await` indeni."],
          ["await Task.Delay(1000);", "Venter et sekund uden at låse serveren. Står i stedet for databasekaldet."],
          ["@if (varer == null)", "Mens der ventes, er `varer` stadig `null`. Så vises **Henter listen …**."],
          ["Rækkefølgen", "1) komponenten renderes med `varer == null` → 2) `await` er færdig, `varer` får en værdi → 3) Blazor renderer igen og viser listen."]
        ] },
      { t: "forudsig", q: "Koden gør det samme som komponenten: den viser siden, før og efter dataene er hentet. Hvad udskrives?",
        kode: R`List<string>? varer = null;
Vis();
varer = new List<string> { "Mælk", "Rugbrød" };
Vis();

void Vis()
{
    if (varer == null)
    {
        Console.WriteLine("Henter listen …");
    }
    else
    {
        Console.WriteLine($"{varer.Count} varer");
    }
}`,
        output: "Henter listen …\n2 varer",
        fordi: "Første rendering sker, **før** dataene er klar, så `varer` er `null`. Anden rendering sker, når `OnInitializedAsync` er færdig. Uden `if (varer == null)` ville første rendering give en `NullReferenceException` ved `varer.Count`." },
      { t: "valg", q: "Hvorfor står der `@if (varer == null)` i komponenten, og hvorfor er `varer` erklæret som `List<Vare>?`?",
        svar: ["Fordi komponenten renderes første gang, før OnInitializedAsync er færdig, og da er varer null", "Fordi @foreach ikke kan bruges uden @if", "Fordi listen bliver null, hver gang man klikker", "Fordi Blazor kræver, at alle felter kan være null"],
        ret: 0, fordi: "Blazor venter ikke på `await` med at vise siden. Den renderer med det samme og igen, når dataene er kommet. Imens skal siden kunne klare, at der ingen liste er endnu. Det samme mønster står i skabelonens `Weather.razor`: `@if (forecasts == null)` → **Loading...**." },
      { t: "laes", h: "Hvorfor kører OnInitializedAsync to gange?",
        md: "Kører du appen, ser du noget mærkeligt: listen står der med det samme, så står der **Henter listen …** et sekund, og så kommer listen igen.\n\nÅrsagen er **prerendering**. For at brugeren skal se noget med det samme, laver serveren først sidens HTML **én gang** og sender den — her kører `OnInitializedAsync` første gang. Derefter åbnes SignalR-forbindelsen, og komponenten starter **forfra** som interaktiv — og `OnInitializedAsync` kører igen.",
        noter: [
          ["Første kørsel", "Prerendering: serveren laver HTML'en til den første visning. Knapperne virker endnu ikke."],
          ["Anden kørsel", "Den interaktive komponent starter. Felterne er nye, så `varer` er `null` igen, indtil dataene er hentet."],
          ["Hvad betyder det for dig?", "Data hentes to gange. Hvad brugeren nåede at klikke i første sekund, kan gå tabt. Det er normalt, og det er godt at kunne forklare til eksamen."]
        ] },
      { t: "valg", q: "Du sætter et breakpoint i `OnInitializedAsync` og åbner siden én gang. Hvor mange gange stopper debuggeren?",
        svar: ["To gange — én gang ved prerendering og én gang, når den interaktive komponent starter", "Én gang", "Hver gang du klikker på en knap", "Aldrig — OnInitializedAsync kører i browseren"],
        ret: 0, fordi: "Med Interactive Server og prerendering (standarden) laves komponenten to gange: først til den hurtige HTML, så som interaktiv komponent. `OnInitializedAsync` kører begge gange — men **ikke** ved klik. Klik kalder kun din event handler og renderer igen." },
      { t: "valg", q: "En kollega ændrer `VareLinje`, så fluebenet bruger `@bind=\"Vare.Koebt\"` direkte, uden `OnKoebt`. Fluebenet sættes fint, men `Mangler: 3 af 3` i forælderen ændrer sig ikke. Hvorfor?",
        svar: ["Kun underkomponenten renderes igen — forælderen ved ikke, at noget er ændret, fordi ingen EventCallback er kaldt", "Fordi @bind ikke virker på bool", "Fordi Count(v => !v.Koebt) kun kan tælle én gang", "Fordi checkboxen ikke er inde i en EditForm"],
        ret: 0, fordi: "Det er afprøvet: `Vare.Koebt` bliver faktisk `true`, men tallet står stille. En hændelse renderer kun den komponent, hændelsen skete i. Når underkomponenten kalder en **EventCallback**, renderer Blazor også forælderen. Derfor sender `VareLinje` ændringen op med `OnKoebt`." },
      { t: "skriv", q: "Skriv markup, der viser `<p>Listen er tom.</p>`, når `varer.Count` er 0. Ellers skal den vise en `<ul class=\"list-group\">` med en `<VareLinje Vare=\"vare\" OnFjern=\"Fjern\" />` for hver `vare` i `varer`. Brug `@if`, `else` og `@foreach`.",
        tjek: [
          [/@if\(varer\.Count==0\)\{<p>Listen er tom\.<\/p>\}/, "Brug `@if (varer.Count == 0)` med `<p>Listen er tom.</p>` indeni"],
          [/\}else\{/, "Brug `else` til listen"],
          [/@foreach\((var |Vare )vare in varer\)\{/, "Brug `@foreach (var vare in varer)`"],
          [/<VareLinje Vare="vare"OnFjern="Fjern"\/>/, "Lav `<VareLinje Vare=\"vare\" OnFjern=\"Fjern\" />` inde i løkken"]
        ],
        forkert: [R`@if (varer.Count == 0)
{
    <p>Listen er tom.</p>
}
<ul class="list-group">
    @foreach (var vare in varer)
    {
        <VareLinje Vare="vare" OnFjern="Fjern" />
    }
</ul>`],
        loesning: R`@if (varer.Count == 0)
{
    <p>Listen er tom.</p>
}
else
{
    <ul class="list-group">
        @foreach (var vare in varer)
        {
            <VareLinje Vare="vare" OnFjern="Fjern" />
        }
    </ul>
}`,
        sprog: "razor",
        fordi: "Inde i en `@if`- eller `@foreach`-blok er du tilbage i markup, så du kan skrive HTML og komponenter direkte. `else` behøver intet `@`, fordi den hører til `@if`." },
      { t: "ide", h: "Den færdige Indkøbsliste",
        md: "Saml det hele. Ret `VareLinje.razor` til versionen med `Vare`-parameteren fra første trin i lektionen, og skriv `Indkoebsliste.razor` som nedenfor. Det er den kode, der er afprøvet. Skriv den selv — kopiér den ikke.\n\nAfprøv bagefter:\n\n1. Siden viser 3 varer og `Mangler: 3 af 3`.\n2. Sæt flueben ved Mælk → `Mangler: 2 af 3`.\n3. Skriv `æb` i søgefeltet → kun Æbler vises, mens du skriver.\n4. Tøm søgefeltet, og tilføj `2` × `Ost` → `Mangler: 3 af 4`.\n5. Klik **Fjern** på alle varer → **Listen er tom.**\n6. Sæt et breakpoint i `OnInitializedAsync`, start med debuggeren, og åbn siden. Debuggeren stopper to gange — prerendering og interaktiv start.",
        kode: R`@page "/liste"
@rendermode InteractiveServer

<PageTitle>Indkøbsliste</PageTitle>

<h1>Indkøbsliste</h1>

@if (varer == null)
{
    <p><em>Henter listen …</em></p>
}
else
{
    <p>Mangler: @varer.Count(v => !v.Koebt) af @varer.Count</p>

    <input @bind="soegning" @bind:event="oninput" placeholder="Søg" class="form-control mb-2" />

    @if (varer.Count == 0)
    {
        <p>Listen er tom.</p>
    }
    else
    {
        <ul class="list-group mb-3">
            @foreach (var vare in varer.Where(v => v.Navn.Contains(soegning, StringComparison.OrdinalIgnoreCase)))
            {
                <VareLinje Vare="vare" OnKoebt="SkiftKoebt" OnFjern="Fjern" />
            }
        </ul>
    }

    <EditForm Model="nyVare" OnValidSubmit="TilfoejVare">
        <DataAnnotationsValidator />
        <div class="mb-2">
            <label>Navn</label>
            <InputText @bind-Value="nyVare.Navn" class="form-control" />
            <ValidationMessage For="() => nyVare.Navn" />
        </div>
        <div class="mb-2">
            <label>Antal</label>
            <InputNumber @bind-Value="nyVare.Antal" class="form-control" />
            <ValidationMessage For="() => nyVare.Antal" />
        </div>
        <button type="submit" class="btn btn-primary">Tilføj</button>
    </EditForm>
}

@code {
    private List<Vare>? varer;
    private Vare nyVare = new Vare();
    private string soegning = "";

    protected override async Task OnInitializedAsync()
    {
        await Task.Delay(1000);
        varer = new List<Vare>
        {
            new Vare { Navn = "Mælk", Antal = 2 },
            new Vare { Navn = "Rugbrød", Antal = 1 },
            new Vare { Navn = "Æbler", Antal = 6 }
        };
    }

    private void TilfoejVare()
    {
        varer!.Add(nyVare);
        nyVare = new Vare();
    }

    private void SkiftKoebt(Vare vare)
    {
        vare.Koebt = !vare.Koebt;
    }

    private void Fjern(Vare vare)
    {
        varer!.Remove(vare);
    }
}`,
        sprog: "razor",
        md2: "`varer!` med udråbstegn siger til compileren: \"jeg ved, at listen ikke er `null` her\". Det er sandt, fordi formularen og knapperne kun vises, når `varer` har en værdi." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er OnInitializedAsync, og hvorfor skal komponenten kunne vises, mens `varer` er null?",
        svar: "**OnInitializedAsync** er en **livscyklus**-metode, som Blazor kalder, når komponenten starter. Man skriver sin egen udgave med `override` og henter data i den, typisk med `await`. Blazor venter ikke på dataene: komponenten **renderes** først med `varer == null` og igen, når metoden er færdig. Derfor viser man **Henter …** med `@if (varer == null)`, ellers får man en NullReferenceException. Med **prerendering** kører metoden to gange: én gang til den første HTML og én gang, når den interaktive komponent starter.",
        noegle: ["livscyklus", "override", "await", "renderes", "null", "prerendering"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m22v", titel: "Værksted: byg Træningslog selv", vaerksted: true, min: 120, ord: [], trin: [

    { t: "laes", h: "Sådan arbejder du i værkstedet",
      md: "Nu bygger du selv en **ny** Blazor-app, **Traening**, en træningslog — ud fra krav, ikke fra en opskrift. Det er samme slags arbejde som i dit eksamensprojekt. Opgaverne bliver sværere hen ad vejen, og den sidste samler hele modulet.\n\nEn Blazor-side skriver ikke noget i et sort vindue, som siden her kan sammenligne. Så gør sådan: læs kravene, byg, kør, og klik dig igennem siden i browseren. Sæt flueben ved hvert krav, når du kan **se**, at det virker.\n\nAlle opgaverne foregår i det samme projekt. Lav det først: {{**Create a new project → Blazor Web App**, navn `Traening`, .NET 10.0, Authentication **None**, Interactive render mode **Server**, Interactivity location **Per page/component**||`dotnet new blazor -o Traening` i terminalen, og åbn mappen i Rider}}.",
      noter: [
        ["Skriv selv", "Brug Indkøbslisten som opslag, men kopiér ikke. Det er skrivningen, der får det til at sidde."],
        ["Kør tit", "Kør efter hver lille ændring. Så ved du præcis, hvad der lavede en fejl."],
        ["Knappen virker ikke?", "Tjek først `@rendermode InteractiveServer` øverst i siden."],
        ["Debuggeren", "Sæt et breakpoint i en metode i `@code` (klik i margenen), og start med debuggeren (Visual Studio: F5 · Rider: den grønne bille). Når du klikker i browseren, stopper programmet, og du kan se felterne i Locals (Visual Studio) / Threads & Variables (Rider)."],
        ["Tips før løsning", "Sidder du fast, så åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af."]
      ] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Armbøjninger", projekt: "Traening",
      md: "Lav en side, der tæller dagens armbøjninger. Hvert klik på en knap lægger 10 til, og en anden knap nulstiller.",
      krav: [
        "Siden `Components/Pages/Armboejninger.razor` har adressen `/armboejninger` og er interaktiv",
        "Overskriften er `Armbøjninger`, og fanen hedder også `Armbøjninger`",
        "Under overskriften står `Armbøjninger i dag: 0`",
        "Knappen `+10` lægger 10 til, knappen `Nulstil` sætter tallet til 0",
        "Menuen har punktet **Armbøjninger**"
      ],
      tip: [
        "Det er Counter-siden med andre navne. Åbn `Counter.razor`, og se, hvordan den er bygget.",
        "Du skal bruge et felt `private int antal = 0;` og to metoder. Den ene gør `antal += 10;`, den anden `antal = 0;`.",
        "Står tallet stille, når du klikker? Så mangler `@rendermode InteractiveServer` under `@page`-linjen."
      ],
      fri: true, sprog: "razor",
      output: "Armbøjninger\nArmbøjninger i dag: 0\n(klik +10 to gange)\nArmbøjninger i dag: 20\n(klik Nulstil)\nArmbøjninger i dag: 0",
      loesning: R`@page "/armboejninger"
@rendermode InteractiveServer

<PageTitle>Armbøjninger</PageTitle>

<h1>Armbøjninger</h1>

<p>Armbøjninger i dag: @antal</p>

<button class="btn btn-primary" @onclick="TilfoejTi">+10</button>
<button class="btn btn-secondary" @onclick="Nulstil">Nulstil</button>

@code {
    private int antal = 0;

    private void TilfoejTi()
    {
        antal += 10;
    }

    private void Nulstil()
    {
        antal = 0;
    }
}

@* NavMenu.razor: en ny blok
<div class="nav-item px-3">
    <NavLink class="nav-link" href="armboejninger">Armbøjninger</NavLink>
</div> *@`,
      ekstra: ["Lav en knap `−10`, der aldrig gør tallet negativt.", "Skriv `Flot! Du har nået 50.` under tallet, når antallet er 50 eller mere. Brug `@if`."] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Øvelseskort", projekt: "Traening",
      md: "Lav en underkomponent, der viser én øvelse som et kort med navn, minutter og en knap **Færdig**. Siden `/oevelser` viser tre kort og tæller, hvor mange øvelser der er færdige, og hvilken der blev færdig sidst.",
      krav: [
        "Komponenten `Components/OevelseKort.razor` har ingen `@page` og har parametrene `Navn` (string), `Minutter` (int) og `OnFaerdig` (`EventCallback<string>`)",
        "Kortet viser navnet som overskrift, `30 minutter` (med det rigtige tal) og en knap `Færdig`",
        "Knappen sender øvelsens navn op til forælderen",
        "Siden `/oevelser` har overskriften `Dagens øvelser` og viser tre kort: `Løb` 30, `Styrke` 45 og `Udstrækning` 10",
        "Under kortene står `Færdige øvelser: 0` og `Sidst færdig:` — begge opdateres ved klik"
      ],
      tip: [
        "Skriv kortet med Bootstrap: `<div class=\"card mb-2\"><div class=\"card-body\"> … </div></div>`. Navnet i en `<h5 class=\"card-title\">`.",
        "Parametrene er public properties med `[Parameter]`. Knappen: `@onclick=\"() => OnFaerdig.InvokeAsync(Navn)\"`.",
        "På siden: `<OevelseKort Navn=\"Løb\" Minutter=\"30\" OnFaerdig=\"Faerdig\" />` tre gange, og en metode `private void Faerdig(string navn)`, der tæller op og gemmer navnet."
      ],
      fri: true, sprog: "razor",
      output: "Dagens øvelser\nLøb · 30 minutter · Færdig\nStyrke · 45 minutter · Færdig\nUdstrækning · 10 minutter · Færdig\n(klik Færdig ved Styrke og ved Udstrækning)\nFærdige øvelser: 2\nSidst færdig: Udstrækning",
      loesning: R`@* Components/OevelseKort.razor *@
<div class="card mb-2">
    <div class="card-body">
        <h5 class="card-title">@Navn</h5>
        <p class="card-text">@Minutter minutter</p>
        <button class="btn btn-success" @onclick="() => OnFaerdig.InvokeAsync(Navn)">Færdig</button>
    </div>
</div>

@code {
    [Parameter]
    public string Navn { get; set; } = "";

    [Parameter]
    public int Minutter { get; set; }

    [Parameter]
    public EventCallback<string> OnFaerdig { get; set; }
}

@* Components/Pages/Oevelser.razor *@
@page "/oevelser"
@rendermode InteractiveServer

<PageTitle>Øvelser</PageTitle>

<h1>Dagens øvelser</h1>

<OevelseKort Navn="Løb" Minutter="30" OnFaerdig="Faerdig" />
<OevelseKort Navn="Styrke" Minutter="45" OnFaerdig="Faerdig" />
<OevelseKort Navn="Udstrækning" Minutter="10" OnFaerdig="Faerdig" />

<p>Færdige øvelser: @faerdige</p>
<p>Sidst færdig: @sidst</p>

@code {
    private int faerdige = 0;
    private string sidst = "";

    private void Faerdig(string navn)
    {
        faerdige++;
        sidst = navn;
    }
}`,
      ekstra: ["Giv kortet en parameter mere, `Intensitet` (string), og vis den med `<span class=\"badge bg-secondary\">`.", "Lad siden også lægge minutterne sammen for de færdige øvelser. Det kræver, at `OnFaerdig` sender noget andet op end navnet — hvad?"] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Fejlfinding: den samlede tid står stille", projekt: "Traening",
      md: "En kollega har lavet siden `/log`. Den starter med én øvelse, Cykling 45 minutter, og en knap, der tilføjer 30 minutters løb. Når man klikker, bliver **Øvelser** til 2 — men **Samlet tid** bliver ved med at vise 45. Den skulle vise 75.\n\nFind fejlen med debuggeren, før du retter noget:\n\n1. Lav `Models/Oevelse.cs` og siden `Components/Pages/Log.razor` med startkoden. Tilføj `@using Traening.Models` i `Components/_Imports.razor`.\n2. Sæt breakpoints på linjen `samletTid = …` i `OnInitialized` og på linjen `oevelser.Add(…)` i `TilfoejLoeb`.\n3. Start med debuggeren, og åbn `/log`. Hvor stopper den, og hvad er `samletTid`?\n4. Klik på knappen. Gå skridt for skridt gennem `TilfoejLoeb`, og hold øje med `oevelser.Count` og `samletTid`. Hvilken linje mangler?",
      krav: [
        "Du har set i debuggeren, at `samletTid` kun regnes ud i `OnInitialized` — ikke når der klikkes",
        "Efter ét klik står der `Øvelser: 2` og `Samlet tid: 75 minutter`",
        "Efter to klik står der `Øvelser: 3` og `Samlet tid: 105 minutter`"
      ],
      tip: [
        "`OnInitialized` kører, når komponenten starter — ikke ved hvert klik. Et klik kører kun `TilfoejLoeb`, og så renderes siden igen.",
        "`samletTid` er et felt. Det ændrer sig kun, når en linje i koden sætter det.",
        "Regn `samletTid` ud igen i `TilfoejLoeb`, efter `Add`: `samletTid = oevelser.Sum(o => o.Minutter);`. (Eller drop feltet, og skriv `@oevelser.Sum(o => o.Minutter)` direkte i markup — så regnes det ud ved hver rendering.)"
      ],
      fri: true, sprog: "razor",
      start: R`// Models/Oevelse.cs
using System.ComponentModel.DataAnnotations;

namespace Traening.Models;

public class Oevelse
{
    [Required(ErrorMessage = "Skriv navnet på øvelsen")]
    public string Navn { get; set; } = "";

    [Range(1, 300, ErrorMessage = "Minutter skal være mellem 1 og 300")]
    public int Minutter { get; set; } = 30;
}

@* Components/Pages/Log.razor *@
@page "/log"
@rendermode InteractiveServer

<PageTitle>Log</PageTitle>

<h1>Træningslog</h1>

<p>Øvelser: @oevelser.Count</p>
<p>Samlet tid: @samletTid minutter</p>

<button class="btn btn-primary" @onclick="TilfoejLoeb">Tilføj 30 min løb</button>

@code {
    private List<Oevelse> oevelser = new List<Oevelse>();
    private int samletTid;

    protected override void OnInitialized()
    {
        oevelser.Add(new Oevelse { Navn = "Cykling", Minutter = 45 });
        samletTid = oevelser.Sum(o => o.Minutter);
    }

    private void TilfoejLoeb()
    {
        oevelser.Add(new Oevelse { Navn = "Løb", Minutter = 30 });
    }
}`,
      output: "Træningslog\nØvelser: 1\nSamlet tid: 45 minutter\n(klik på knappen)\nØvelser: 2\nSamlet tid: 75 minutter",
      loesning: R`@code {
    private List<Oevelse> oevelser = new List<Oevelse>();
    private int samletTid;

    protected override void OnInitialized()
    {
        oevelser.Add(new Oevelse { Navn = "Cykling", Minutter = 45 });
        samletTid = oevelser.Sum(o => o.Minutter);
    }

    private void TilfoejLoeb()
    {
        oevelser.Add(new Oevelse { Navn = "Løb", Minutter = 30 });
        samletTid = oevelser.Sum(o => o.Minutter);
    }
}`,
      fordi: "Afprøvet: med startkoden står der `Øvelser: 2` og `Samlet tid: 45 minutter` efter et klik. Blazor renderer siden igen efter hvert klik, men den viser bare feltets **gamle** værdi. Et felt, der er udregnet ud fra andre data, skal regnes ud igen, hver gang dataene ændres — eller regnes ud direkte i markup.",
      ekstra: ["Lav samletTid om til en property uden felt: `private int SamletTid => oevelser.Sum(o => o.Minutter);` og brug `@SamletTid`. Hvorfor kan den aldrig blive forældet?"] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Ny øvelse med validering", projekt: "Traening",
      md: "Lav en side med en formular, hvor man skriver en ny øvelse. Formularen må kun gemme, når navnet er udfyldt, og minutterne er mellem 1 og 300. Efter gem står der en besked, og formularen er klar til den næste.",
      krav: [
        "Siden `/ny` har overskriften `Ny øvelse` og en `EditForm` med modellen `Oevelse` fra forrige opgave",
        "Felter: `Navn` med `InputText` og `Minutter` med `InputNumber`, hver med en `ValidationMessage` under",
        "Klik på `Gem` med tomt navn og minutter `0` viser `Skriv navnet på øvelsen` og `Minutter skal være mellem 1 og 300`",
        "Med `Svømning` og `40` står der bagefter `Gemt: Svømning, 40 min` under formularen",
        "Efter gem er navnefeltet tomt og minutter står på 30 igen"
      ],
      tip: [
        "Modellen har allerede `[Required]` og `[Range]` med danske fejltekster. Du skal bare huske `<DataAnnotationsValidator />` inde i formularen.",
        "Felter i `@code`: `private Oevelse oevelse = new Oevelse();` og `private string besked = \"\";`. Formularen: `<EditForm Model=\"oevelse\" OnValidSubmit=\"Gem\">`.",
        "I `Gem`: sæt `besked = $\"Gemt: {oevelse.Navn}, {oevelse.Minutter} min\";` og lav så et nyt objekt: `oevelse = new Oevelse();`. Startværdien 30 kommer fra modellen."
      ],
      fri: true, sprog: "razor",
      output: "Ny øvelse\n(klik Gem med tomt navn og 0 minutter)\nSkriv navnet på øvelsen\nMinutter skal være mellem 1 og 300\n(skriv Svømning og 40, klik Gem)\nGemt: Svømning, 40 min",
      loesning: R`@page "/ny"
@rendermode InteractiveServer

<PageTitle>Ny øvelse</PageTitle>

<h1>Ny øvelse</h1>

<EditForm Model="oevelse" OnValidSubmit="Gem">
    <DataAnnotationsValidator />
    <div class="mb-2">
        <label>Navn</label>
        <InputText @bind-Value="oevelse.Navn" class="form-control" />
        <ValidationMessage For="() => oevelse.Navn" />
    </div>
    <div class="mb-2">
        <label>Minutter</label>
        <InputNumber @bind-Value="oevelse.Minutter" class="form-control" />
        <ValidationMessage For="() => oevelse.Minutter" />
    </div>
    <button type="submit" class="btn btn-primary">Gem</button>
</EditForm>

<p>@besked</p>

@code {
    private Oevelse oevelse = new Oevelse();
    private string besked = "";

    private void Gem()
    {
        besked = $"Gemt: {oevelse.Navn}, {oevelse.Minutter} min";
        oevelse = new Oevelse();
    }
}`,
      ekstra: ["Tilføj `[StringLength(20, ErrorMessage = \"Højst 20 tegn\")]` på `Navn`, og afprøv med et langt navn.", "Gem øvelserne i en `List<Oevelse>`, og vis dem under formularen med `@foreach`. Husk, hvorfor `oevelse = new Oevelse();` skal stå efter `Add`."] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Træningslog: det hele samlet", projekt: "Traening",
      md: "Byg den færdige træningslog på én side. Den henter startøvelserne, når siden åbnes, viser en linje pr. øvelse med en **Slet**-knap, lægger minutterne sammen, kan søge, mens man skriver, og har en formular til nye øvelser. Det er samme opbygning som den færdige Indkøbsliste — men skriv den fra kravene.",
      krav: [
        "Siden `/traeningslog` har overskriften `Træningslog` og et menupunkt",
        "Mens dataene hentes, står der `Henter træningsloggen …`. `OnInitializedAsync` venter 1 sekund (`Task.Delay(1000)`) og laver så listen `Løb` 30 og `Styrke` 45",
        "Over listen står `Samlet tid: 75 minutter` — tallet passer altid til listen",
        "Underkomponenten `OevelseLinje` får hele øvelsen som parameter og viser `Løb – 30 min` og en knap `Slet`, der sender øvelsen op med en `EventCallback<Oevelse>`",
        "Et søgefelt filtrerer listen for hvert tastetryk, uden forskel på store og små bogstaver",
        "Er listen tom, står der `Ingen øvelser endnu.`",
        "En `EditForm` med validering tilføjer nye øvelser til listen"
      ],
      tip: [
        "Byg i denne rækkefølge, og kør efter hvert trin: 1) `OnInitializedAsync` + `@if (oevelser == null)` 2) `@foreach` med `OevelseLinje` 3) Slet 4) Samlet tid 5) `@if (oevelser.Count == 0)` 6) søgning 7) formularen.",
        "Samlet tid uden at regne den ud i et felt: `@oevelser.Sum(o => o.Minutter)`. Søgning: `@bind=\"soegning\" @bind:event=\"oninput\"` og `oevelser.Where(o => o.Navn.Contains(soegning, StringComparison.OrdinalIgnoreCase))` i `@foreach`.",
        "Forælderens metoder: `Tilfoej()` gør `oevelser!.Add(nyOevelse);` og `nyOevelse = new Oevelse();`. `Slet(Oevelse oevelse)` gør `oevelser!.Remove(oevelse);`. Feltet er `private List<Oevelse>? oevelser;`."
      ],
      fri: true, sprog: "razor",
      output: "Træningslog\nHenter træningsloggen …\nSamlet tid: 75 minutter\nLøb – 30 min  [Slet]\nStyrke – 45 min  [Slet]\n(tilføj Yoga, 20)\nSamlet tid: 95 minutter\n(skriv st i søgefeltet)\nStyrke – 45 min  [Slet]\n(tøm søgefeltet, slet alle tre)\nSamlet tid: 0 minutter\nIngen øvelser endnu.",
      loesning: R`@* Components/OevelseLinje.razor *@
<li class="list-group-item">
    @Oevelse.Navn – @Oevelse.Minutter min
    <button class="btn btn-sm btn-danger float-end" @onclick="() => OnSlet.InvokeAsync(Oevelse)">Slet</button>
</li>

@code {
    [Parameter]
    public Oevelse Oevelse { get; set; } = new Oevelse();

    [Parameter]
    public EventCallback<Oevelse> OnSlet { get; set; }
}

@* Components/Pages/Traeningslog.razor *@
@page "/traeningslog"
@rendermode InteractiveServer

<PageTitle>Træningslog</PageTitle>

<h1>Træningslog</h1>

@if (oevelser == null)
{
    <p><em>Henter træningsloggen …</em></p>
}
else
{
    <p>Samlet tid: @oevelser.Sum(o => o.Minutter) minutter</p>

    <input @bind="soegning" @bind:event="oninput" placeholder="Søg" class="form-control mb-2" />

    @if (oevelser.Count == 0)
    {
        <p>Ingen øvelser endnu.</p>
    }
    else
    {
        <ul class="list-group mb-3">
            @foreach (var oevelse in oevelser.Where(o => o.Navn.Contains(soegning, StringComparison.OrdinalIgnoreCase)))
            {
                <OevelseLinje Oevelse="oevelse" OnSlet="Slet" />
            }
        </ul>
    }

    <EditForm Model="nyOevelse" OnValidSubmit="Tilfoej">
        <DataAnnotationsValidator />
        <div class="mb-2">
            <label>Navn</label>
            <InputText @bind-Value="nyOevelse.Navn" class="form-control" />
            <ValidationMessage For="() => nyOevelse.Navn" />
        </div>
        <div class="mb-2">
            <label>Minutter</label>
            <InputNumber @bind-Value="nyOevelse.Minutter" class="form-control" />
            <ValidationMessage For="() => nyOevelse.Minutter" />
        </div>
        <button type="submit" class="btn btn-primary">Tilføj</button>
    </EditForm>
}

@code {
    private List<Oevelse>? oevelser;
    private Oevelse nyOevelse = new Oevelse();
    private string soegning = "";

    protected override async Task OnInitializedAsync()
    {
        await Task.Delay(1000);
        oevelser = new List<Oevelse>
        {
            new Oevelse { Navn = "Løb", Minutter = 30 },
            new Oevelse { Navn = "Styrke", Minutter = 45 }
        };
    }

    private void Tilfoej()
    {
        oevelser!.Add(nyOevelse);
        nyOevelse = new Oevelse();
    }

    private void Slet(Oevelse oevelse)
    {
        oevelser!.Remove(oevelse);
    }
}`,
      ekstra: ["Vis `Samlet tid` for de øvelser, der passer til søgningen, i stedet for alle.", "Giv `Oevelse` en `bool Faerdig`, og lav et flueben i `OevelseLinje`, der sender ændringen op med en `EventCallback<Oevelse>` — så tallet `Færdige: x af y` i forælderen opdateres med det samme."] },

    { t: "forklar", q: "Eksamensspørgsmål: Du har bygget Træningslog. Forklar, hvordan siden er delt op i komponenter, og hvordan data og hændelser bevæger sig mellem dem.",
      svar: "Siden `Traeningslog` er **forælderen**. Den ejer listen med øvelser, henter den i **OnInitializedAsync** og viser **Henter …**, mens listen er null. For hver øvelse laver den med `@foreach` en **underkomponent** `OevelseLinje`, som får øvelsen ned som **`[Parameter]`**. Når der klikkes **Slet**, sender `OevelseLinje` øvelsen op med en **`EventCallback<Oevelse>`** og `InvokeAsync`. Forælderens metode fjerner den fra listen, og Blazor **renderer** forælderen igen, så både listen og den samlede tid passer. Formularen er en **EditForm** med validering, og søgefeltet bruger `@bind` med `oninput`.",
      noegle: ["forælderen", "OnInitializedAsync", "underkomponent", "[Parameter]", "EventCallback", "renderer", "EditForm"] }
  ] }

  ]
});
})();
