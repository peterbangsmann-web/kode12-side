// Modul 21 — Single Page Application (SPA) med Angular. Forudsætter: modul 0–20 (især 13–15 HTML/CSS/JS og 19 Web API).
// Afprøvet med Node 24.21, Angular CLI 22.2.2, TypeScript 6.0 og .NET 10 (PersonApi og BookApi fra modul 19), i Chromium.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m21", nr: 21, del: "Del 6 · SPA og Blazor", ikon: "🧭",
  titel: "Single Page Application",
  dag: "Kursusdag 18 · Single Page Application",
  intro: "Indtil nu har serveren bygget hver eneste side. I en **Single Page Application** (SPA) henter browseren én side én gang — og bagefter kun **data** fra et API. Her lærer du, hvad en SPA er, hvorfor man bygger dem, og hvad det koster.\n\nLæreren brugte **Angular**, så du bygger en lille Angular-app, `PersonApp`, der viser personerne fra dit `PersonApi` fra modul 19. Målet er ikke, at du bliver Angular-ekspert, men at du kan **læse** Angular-kode, forklare SPA-begrebet til eksamen og sammenligne med MVC og Blazor.",
  video: ["18_Ons_SPA_With_Angular.mp4 (3 t 54 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m21l1", titel: "MPA og SPA: to måder at bygge en web-app på", min: 15,
    ord: [
      ["MPA (Multi Page Application)", "En web-app, hvor serveren laver en hel ny HTML-side, hver gang man klikker. MVC fra modul 16 er en MPA."],
      ["SPA (Single Page Application)", "En web-app, hvor browseren henter én HTML-side én gang. Bagefter henter JavaScript kun data og ændrer selv siden."],
      ["Frontend", "Den del af systemet, der kører i browseren og viser brugerfladen."],
      ["Backend", "Den del af systemet, der kører på serveren: API, forretningslogik og database."],
      ["Klient-side routing", "JavaScript i browseren skifter adressen og indholdet uden at hente en ny side fra serveren."],
      ["SEO", "Search Engine Optimization: at søgemaskiner som Google kan læse og finde siderne."]
    ],
    trin: [
      { t: "laes", h: "Sådan virker MVC: en ny side for hvert klik",
        md: "Du kender MVC fra modul 16. Når brugeren klikker på **Edit** ud for en kunde, sker der dette:\n\n1. Browseren sender en **request** til serveren.\n2. Serveren finder controlleren og actionen, henter data og bygger **en hel HTML-side** med Razor.\n3. Browseren **smider den gamle side væk** og tegner den nye fra bunden — menu, layout, CSS og det hele.\n\nDet sker ved **hvert eneste klik**: Index, Details, Create, Edit, Delete. Hver side er en ny side fra serveren. Derfor kaldes det en **MPA**, en *Multi Page Application*.",
        noter: [
          ["Fordel", "Simpelt. Serveren styrer alt, og browseren viser bare HTML."],
          ["Ulempe", "Layoutet, menuen og alt det, der ikke ændrer sig, bliver sendt og tegnet igen ved hvert klik."]
        ] },
      { t: "laes", h: "Sådan virker en SPA: én side og derefter kun data",
        md: "I en **SPA**, en *Single Page Application*, henter browseren **én** HTML-side **én** gang, sammen med en stor JavaScript-fil. Bagefter sker alt i browseren:\n\n1. Brugeren klikker på **Kim**.\n2. JavaScript sender en request til et **API** — som dit `PersonApi` fra modul 19 — og får **kun data** tilbage som JSON: `{\"id\":2,\"name\":\"Kim\",\"city\":\"Kalby\"}`.\n3. JavaScript ændrer **DOM'en**, så siden viser Kim. Siden bliver aldrig skiftet ud.\n\nDu har allerede bygget en mini-SPA: `personer.html` i modul 19 hentede personerne med `fetch` og satte dem ind i siden. Angular gør det samme, bare organiseret, så det holder til en stor app.",
        noter: [
          ["Frontend", "Det, der kører i browseren: Angular-appen. Den viser og reagerer."],
          ["Backend", "Det, der kører på serveren: dit ASP.NET Core Web API. Det leverer data."],
          ["JSON", "Det eneste, der sendes frem og tilbage efter første indlæsning."]
        ] },
      { t: "valg", q: "Hvad sender serveren typisk tilbage, når brugeren klikker på en person i en **SPA** — efter at siden er indlæst første gang?",
        svar: ["Kun data, typisk JSON fra et API", "En hel ny HTML-side med layout og menu", "En ny JavaScript-fil med hele appen", "Ingenting — en SPA bruger aldrig serveren"],
        ret: 0, fordi: "JavaScript-appen og HTML-siden er allerede hentet. Ved et klik spørger appen kun API'et om **data**, og så ændrer den selv siden. En SPA bruger altså stadig serveren — men kun til data." },
      { t: "udfyld", sprog: "text", q: "Udfyld, hvad serveren svarer med i de to slags apps.",
        kode: R`MVC (MPA):  klik på Edit  ->  serveren svarer med [[HTML]]
SPA:        klik på Kim   ->  API'et svarer med [[JSON]]`,
        fordi: "I MVC bygger Razor en hel HTML-side. I en SPA svarer API'et kun med data som JSON, og JavaScript i browseren laver selv HTML'en." },
      { t: "orden", sprog: "text", q: "Sæt trinnene i rækkefølge: hvad sker der, når brugeren klikker på **Kim** i en SPA, der allerede er indlæst?",
        linjer: [
          R`Brugeren klikker på linket "Kim"`,
          R`JavaScript stopper browseren i at hente en ny side`,
          R`JavaScript sender GET /api/Persons/2 til API'et`,
          R`API'et svarer med JSON: {"id":2,"name":"Kim","city":"Kalby"}`,
          R`JavaScript ændrer DOM'en, så siden viser Kim`
        ],
        fordi: "Det vigtige er det andet trin: browseren får **ikke** lov til at hente en ny side. Det er JavaScript, der styrer, hvad der vises." },
      { t: "laes", h: "Adressen skifter alligevel: klient-side routing",
        md: "Hvis siden aldrig skiftes ud, burde adressen i browseren jo stå stille. Det gør den ikke. En SPA bruger **klient-side routing**: JavaScript ændrer adressen til fx `/personer/2` **uden** at hente en ny side, og viser det rigtige indhold.\n\nDerfor virker browserens **tilbage-knap** stadig, og man kan gemme et bogmærke til `/personer/2`.\n\nAfprøvet med `PersonApp`, som du bygger i dette modul: efter klik på **Kim**, så **Om**, og så tilbage-knappen, havde browseren stadig kun hentet **én** HTML-side. Alt det andet var JSON fra API'et.",
        noter: [
          ["Routing i MVC", "Serveren læser adressen og vælger controller og action."],
          ["Routing i en SPA", "JavaScript i browseren læser adressen og vælger, hvilken del af siden der skal vises."]
        ] },
      { t: "valg", q: "I en SPA skifter adressen fra `/` til `/personer/2`, når brugeren klikker på Kim. Hvem bestemmer, hvad der skal vises?",
        svar: ["JavaScript-appen i browseren — det hedder klient-side routing", "Serverens controller, som i MVC", "Databasen", "Browseren henter en fil, der hedder personer/2.html"],
        ret: 0, fordi: "Det er appens egen **router** i browseren, der læser adressen og vælger indholdet. Serveren bliver kun spurgt om data." },
      { t: "laes", h: "Fordele og ulemper",
        md: "En SPA er ikke altid bedre. Det er et valg med fordele og ulemper, og den afvejning er et klassisk eksamensspørgsmål.",
        noter: [
          ["+ Hurtig at bruge", "Efter første indlæsning skifter siden med det samme. Kun små JSON-svar sendes."],
          ["+ Klar opdeling", "Frontend og backend er to adskilte projekter, der kun taler sammen via API'et."],
          ["+ API'et kan genbruges", "Det samme API kan bruges af en mobil-app eller et andet system."],
          ["− Stor første indlæsning", "Hele appen skal hentes først. `PersonApp` var 280 kB JavaScript (75 kB pakket) — før der var vist en eneste person."],
          ["− Mere kompleksitet", "To projekter, to sprog (C# og TypeScript), Node, npm og CORS."],
          ["− SEO", "Søgemaskiner får en næsten tom HTML-side. Det betyder meget for en webshop, intet for et internt system."],
          ["− Alt i browseren kan ses", "Brugeren kan læse al frontend-koden. Hemmeligheder og adgangskontrol skal ligge i API'et."]
        ] },
      { t: "valg", q: "Et firma vil lave et internt lagersystem, som medarbejderne bruger hele dagen, og som også skal kunne bruges fra en mobil-app senere. Hvilket argument taler **mest** for en SPA med et Web API?",
        svar: ["API'et kan genbruges af mobil-appen, og systemet føles hurtigt, når det først er indlæst", "Google skal kunne finde lagersystemet", "Første indlæsning bliver mindre end med MVC", "En SPA kræver ikke en server"],
        ret: 0, fordi: "Søgemaskiner er ligegyldige for et internt system, og første indlæsning bliver faktisk **større**. Det, der vinder, er API'et, som kan genbruges, og den hurtige brug hele dagen." },
      { t: "valg", q: "Hvilken af disse er en **MPA**?",
        svar: ["En ASP.NET Core MVC-app, hvor Razor bygger en ny side for hvert klik", "En Angular-app, der henter JSON fra et Web API", "Din personer.html fra modul 19, der henter personer med fetch", "En app, hvor JavaScript skifter indholdet uden at hente en ny side"],
        ret: 0, fordi: "MVC bygger hele siden på serveren hver gang: det er en Multi Page Application. Blazor, som kommer i de næste moduler, ligner en SPA, men du skriver C# i stedet for JavaScript." },
      { t: "ide", h: "Se forskellen i Network-fanen",
        md: "Brug browserens udviklerværktøj til at se forskellen med dine egne øjne.\n\n1. Start din MVC-app fra modul 16 eller 17. Tryk {{**F12**||**⌥⌘I**}}, og vælg fanen **Network**.\n2. Klik rundt mellem nogle sider. Se kolonnen **Type**: hvert klik giver en ny linje med typen **document** — en hel ny HTML-side.\n3. Start dit `PersonApi` fra modul 19, og åbn `personer.html` igen. Se Network-fanen: der kommer en linje med typen **fetch**, og svaret (klik på linjen, fanen **Response**) er JSON — ikke HTML.",
        md2: "Det er hele forskellen på MPA og SPA, set fra browserens side: **document** for hvert klik, eller ét document og derefter **fetch**." },
      { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: Hvad er forskellen på en MPA og en SPA, og hvornår vil du vælge en SPA?",
        svar: "I en **MPA**, som ASP.NET Core MVC, bygger **serveren en hel ny HTML-side** for hvert klik, og browseren skifter hele siden ud. I en **SPA** henter browseren **én side én gang** med en JavaScript-app. Bagefter henter appen **kun data som JSON** fra et **API** og ændrer selv **DOM'en**. Adressen skifter med **klient-side routing**, så tilbage-knappen stadig virker. En SPA føles hurtig og giver en klar opdeling i frontend og backend, og API'et kan genbruges, fx af en mobil-app. Ulemperne er en større første indlæsning, mere kompleksitet og dårligere **SEO**. Jeg vil vælge en SPA til et system, man arbejder i hele dagen, og MVC, hvis det skal være simpelt eller findes af Google.",
        noegle: ["hel ny HTML-side", "én side", "JSON", "API", "klient-side routing", "SEO"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m21l2", titel: "Node, npm og Angular CLI: dit første projekt", min: 20,
    ord: [
      ["Angular", "Et framework fra Google til at bygge SPA'er. Skrives i TypeScript og bygges af komponenter."],
      ["Node.js", "Et program, der kører JavaScript uden for browseren. Angulars værktøjer kører på Node."],
      ["npm", "Node Package Manager: henter JavaScript-pakker. Svarer til NuGet i .NET."],
      ["Angular CLI", "Kommandoen `ng`, der laver projekter (`ng new`), filer (`ng generate`) og starter appen (`ng serve`)."],
      ["node_modules", "Mappen, hvor npm lægger alle pakkerne. Den er stor og skal aldrig rettes i eller afleveres."],
      ["package.json", "Listen over projektets npm-pakker og deres versioner. Svarer til `.csproj`-filen."],
      ["Udviklingsserver", "`ng serve`: oversætter appen og viser den på `http://localhost:4200`. Genindlæser selv, når du gemmer."]
    ],
    trin: [
      { t: "laes", h: "Hvad er Angular — og hvorfor Node?",
        md: "**Angular** er et framework fra Google til at bygge SPA'er. Appen skrives i **TypeScript** (JavaScript med typer, næste lektion) og bygges af **komponenter**.\n\nTil at bygge appen skal du bruge tre værktøjer:\n\n1. **Node.js** kører JavaScript uden for browseren. Angulars compiler og udviklingsserver er JavaScript-programmer, så de kører på Node. Den færdige app kører **ikke** på Node — den kører i browseren.\n2. **npm** følger med Node og henter pakker. Det svarer til **NuGet**: `npm install` er `dotnet add package`.\n3. **Angular CLI** er kommandoen `ng`. Den laver projekter og filer og starter appen.\n\nModulet er afprøvet med **Node 24**, **Angular 22.2** og **TypeScript 6.0**. Har du en nyere version, ser enkelte filer lidt anderledes ud, men idéerne er de samme.",
        noter: [
          ["Node.js", "Motoren, der kører værktøjerne. Svarer til .NET-runtime for `dotnet`-kommandoen."],
          ["npm", "Pakkehenteren. Svarer til NuGet."],
          ["ng", "Angulars kommandolinjeværktøj. Svarer til `dotnet new` og `dotnet run`."]
        ] },
      { t: "valg", q: "Hvad svarer **npm** til i .NET-verdenen?",
        svar: ["NuGet — begge henter pakker, som projektet bruger", "C#-compileren", "Visual Studio", "SQL Server"],
        ret: 0, fordi: "npm henter JavaScript-pakker og skriver dem i `package.json`, ligesom NuGet henter .NET-pakker og skriver dem i `.csproj`-filen." },
      { t: "ide", h: "Installér Node og Angular CLI",
        md: "Du installerer Node og Angular CLI **én gang** på computeren. Kommandoerne skrives i en terminal: {{**PowerShell** (søg efter *PowerShell* i Start-menuen) eller **Terminal** i Visual Studio (menuen **View** → **Terminal**)||programmet **Terminal** eller Riders **Terminal**-vindue nederst}}.",
        win: [
          "Gå til **nodejs.org**, hent **LTS**-versionen til Windows, og installér den med standardvalgene.",
          "Åbn en **ny** PowerShell (så den kender Node), og skriv `node --version` og `npm --version`. Du ser to versionsnumre, fx `v24.21.0`.",
          "Skriv `npm install -g @angular/cli` og tryk Enter. `-g` betyder *globalt*: kommandoen `ng` kan bruges i alle mapper.",
          "Skriv `ng version`. Du ser Angular-logoet og versionsnumrene.",
          "Får du fejlen *ng.ps1 cannot be loaded because running scripts is disabled on this system*, så skriv `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, svar `Y`, og prøv `ng version` igen. Det tillader scripts, som er installeret på din egen computer."
        ],
        mac: [
          "Gå til **nodejs.org**, hent **LTS**-versionen til macOS, og installér den med standardvalgene.",
          "Åbn **Terminal**, og skriv `node --version` og `npm --version`. Du ser to versionsnumre, fx `v24.21.0`.",
          "Skriv `npm install -g @angular/cli` og tryk Enter. `-g` betyder *globalt*: kommandoen `ng` kan bruges i alle mapper.",
          "Får du en fejl med ordet **EACCES**, mangler du rettigheder. Skriv i stedet `sudo npm install -g @angular/cli`, og skriv din Mac-adgangskode (der vises ingen tegn, mens du skriver).",
          "Skriv `ng version`. Du ser Angular-logoet og versionsnumrene."
        ],
        output: "Angular CLI       : 22.2.2\nNode.js           : 24.21.0\nPackage Manager   : npm 10.9.4",
        md2: "Dine tal kan være højere. Angular 22 kræver mindst Node 22.22.3 eller 24.15 — er din Node for gammel, siger `ng` det selv." },
      { t: "laes", h: "ng new: lav projektet",
        md: "Et nyt Angular-projekt laves med `ng new` og et navn. Navnet skrives med små bogstaver og bindestreg: `person-app`. CLI'en stiller tre spørgsmål — afprøvet med Angular 22.2:",
        sprog: "text",
        kode: R`ng new person-app

? Which stylesheet system would you like to use?            CSS
? Do you want to enable Server-Side Rendering (SSR) ...?     No
? Which AI tools should Angular integrate with?             None`,
        noter: [
          ["CSS", "Almindelig CSS, som du kender fra modul 13. De andre (Sass, Tailwind) er udvidelser."],
          ["SSR: No", "Server-Side Rendering lader en Node-server bygge første side. Det er ekstra kompleksitet, du ikke skal bruge."],
          ["AI: None", "Laver ekstra filer til AI-værktøjer. Ikke nødvendigt."]
        ],
        md2: "Derefter laver CLI'en filerne og kører `npm install`. Det tager et par minutter, fordi mappen `node_modules` fyldte **301 MB** i afprøvningen." },
      { t: "valg", q: "`ng new` spørger: *Do you want to enable Server-Side Rendering (SSR)?* Hvad skal du svare i dette modul, og hvorfor?",
        svar: ["No — appen skal være en ren SPA, der kører i browseren og henter data fra dit ASP.NET-API", "Yes — ellers kan appen ikke hente data", "Yes — ellers virker routing ikke", "Det er ligegyldigt, spørgsmålet handler om CSS"],
        ret: 0, fordi: "SSR betyder, at en Node-server bygger første side. Det har man brug for, hvis Google skal læse siden. Din backend er ASP.NET, og appen henter data fra API'et uden SSR." },
      { t: "ide", h: "Lav PersonApp, og start den",
        md: "Lav projektet et sted, du kan finde det igen, fx i samme mappe som dit `PersonApi`.",
        win: [
          "I PowerShell: gå til mappen med `cd`, fx `cd C:\\Users\\DitNavn\\source\\repos`.",
          "Skriv `ng new person-app`. Første gang spørger den, om du vil dele brugsdata med Angular-holdet — svar `N`. Svar derefter **CSS**, **No** og **None** (pil-tasterne og Enter).",
          "Skriv `cd person-app` og derefter `ng serve`. Vent, til der står `Local: http://localhost:4200/`.",
          "Åbn `http://localhost:4200` i browseren. Du ser Angulars velkomstside med teksten *Hello, person-app*.",
          "Åbn mappen i en editor: i Visual Studio **File** → **Open** → **Folder…** og vælg `person-app`. (Visual Studio Code er også gratis og bruges af mange til Angular.)",
          "`ng serve` kører, indtil du trykker **Ctrl+C** i terminalen."
        ],
        mac: [
          "I Terminal: gå til mappen med `cd`, fx `cd ~/RiderProjects`.",
          "Skriv `ng new person-app`. Første gang stiller den to ekstra spørgsmål: om du vil slå *autocompletion* til — svar `n` — og om du vil dele brugsdata med Angular-holdet — svar `N`. Svar derefter **CSS**, **No** og **None** (pil-tasterne og Enter).",
          "Skriv `cd person-app` og derefter `ng serve`. Vent, til der står `Local: http://localhost:4200/`.",
          "Åbn `http://localhost:4200` i browseren. Du ser Angulars velkomstside med teksten *Hello, person-app*.",
          "Åbn mappen i Rider: **Open** → vælg mappen `person-app`. Rider kan TypeScript og Angular uden ekstra plugins.",
          "`ng serve` kører, indtil du trykker **Ctrl+C** i terminalen."
        ],
        md2: "Læreren brugte i stedet Visual Studios skabelon **Angular and ASP.NET Core**, der laver to projekter på én gang: et **Server**-projekt (Web API) og et **client**-projekt (Angular). Indeni er det de samme ting. Her laver du dem hver for sig, fordi det virker ens på Windows og Mac, og fordi du så tydeligt kan se, at det er to adskilte programmer." },
      { t: "laes", h: "Rundtur i projektet",
        md: "Her er de filer, du skal kende. Resten kan du lade være.",
        sprog: "text",
        kode: R`person-app/
  package.json         npm-pakkerne
  angular.json         hvordan projektet bygges
  tsconfig.json        TypeScript-indstillinger
  node_modules/        de hentede pakker
  public/              billeder o.l. (favicon.ico)
  src/
    index.html         den ENE html-side
    main.ts            starter appen
    styles.css         CSS for hele appen
    app/
      app.ts           rod-komponenten (TypeScript)
      app.html         rod-komponentens skabelon
      app.css          rod-komponentens CSS
      app.config.ts    opsætning (services, router)
      app.routes.ts    ruterne (lektion 6)
      app.spec.ts      en test - spring over`,
        noter: [
          ["package.json", "Svarer til `.csproj`. Står der en pakke her, henter `npm install` den til `node_modules`."],
          ["node_modules/", "Svarer til NuGet-pakkerne. Rettes aldrig i hånden. Mangler den, laver `npm install` den igen."],
          ["src/index.html", "Den ene side i Single Page Application. Den indeholder næsten intet: kun tagget `<app-root></app-root>`."],
          ["src/main.ts", "Svarer til `Program.cs`: her starter appen."],
          ["src/app/", "Din kode. Hver komponent består af en `.ts`-fil, en `.html`-fil og en `.css`-fil."]
        ] },
      { t: "valg", q: "Hvilken fil er den **ene** HTML-side, som browseren henter i en Angular-app?",
        svar: ["src/index.html", "src/app/app.html", "angular.json", "src/main.ts"],
        ret: 0, fordi: "`index.html` er siden, browseren henter. Den indeholder kun `<app-root></app-root>`. `app.html` er en **skabelon**, som Angular selv sætter ind i `<app-root>`." },
      { t: "laes", h: "Sådan starter appen",
        md: "`main.ts` er appens svar på `Program.cs`. Den starter rod-komponenten `App`:",
        sprog: "js",
        kode: R`import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));`,
        noter: [
          ["import { … } from '…'", "Hent noget fra en anden fil eller pakke. Svarer til `using` i C#, men man nævner præcis det, man skal bruge."],
          ["bootstrapApplication(App, appConfig)", "Start appen med komponenten `App` og opsætningen fra `app.config.ts`."]
        ],
        md2: "`App` er klassen i `app.ts`. Den har en **selector**, `app-root`. Angular finder tagget `<app-root>` i `index.html` og viser `App`'s skabelon, `app.html`, dér." },
      { t: "orden", sprog: "text", q: "Sæt i rækkefølge: hvad sker der, fra browseren åbner `http://localhost:4200`, til velkomstsiden står på skærmen?",
        linjer: [
          R`Browseren henter index.html (med tagget <app-root>)`,
          R`Browseren henter JavaScript-filen med hele appen`,
          R`main.ts kører bootstrapApplication(App, appConfig)`,
          R`Angular finder <app-root> i siden`,
          R`Angular viser App-komponentens skabelon, app.html, inde i <app-root>`
        ],
        fordi: "Først den tomme side, så JavaScript, så starter `main.ts` rod-komponenten, og Angular sætter dens skabelon ind, hvor tagget står." },
      { t: "laes", h: "Rod-komponenten app.ts",
        md: "Sådan ser `app.ts` ud, når `ng new` har lavet den. Det er en klasse med en **dekorator** over — `@Component(…)`. En dekorator svarer til en **attribut** i C#, fx `[ApiController]`: den fortæller Angular, at klassen er en komponent, og hvordan.",
        sprog: "js",
        kode: R`import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('person-app');
}`,
        noter: [
          ["@Component({ … })", "Dekoratoren. Står lige over klassen, som en attribut i C#."],
          ["imports: [RouterOutlet]", "De andre komponenter og værktøjer, skabelonen bruger. Glemmer du én, giver Angular en fejl."],
          ["selector: 'app-root'", "Komponentens tag-navn. `<app-root>` i HTML betyder: vis denne komponent her."],
          ["templateUrl / styleUrl", "Hvilken HTML-fil og CSS-fil der hører til."],
          ["export class App", "`export` gør klassen synlig for andre filer, så `main.ts` kan importere den."],
          ["signal('person-app')", "En værdi, som Angular holder øje med. Forklares i lektion 4."]
        ] },
      { t: "valg", q: "En komponent har `selector: 'app-person-liste'`. Hvordan viser du den inde i en anden komponents skabelon?",
        svar: ["Skriv tagget `<app-person-liste />` i skabelonen", "Skriv `@include person-liste`", "Kald `new PersonListe()` i HTML'en", "Skriv `<script src=\"person-liste.ts\"></script>`"],
        ret: 0, fordi: "Selectoren er komponentens tag-navn. Man bruger komponenter som HTML-tags — og komponenten skal også stå i `imports` i den komponent, der bruger den." },
      { t: "ide", h: "Ret siden, og byg appen",
        md: "1. Åbn `src/app/app.html`. Den er lang: det er velkomstsiden. Slet **alt** i filen, og skriv i stedet `<h1>PersonApp</h1>`.\n2. Gem. Se browseren: siden opdaterer **selv** — `ng serve` holder øje med filerne.\n3. Stop `ng serve` med **Ctrl+C**, og skriv `ng build`. Det laver den færdige app i mappen `dist/person-app/browser`.\n4. Kig i mappen. Afprøvet: der ligger `index.html`, `favicon.ico`, en CSS-fil og **én** JavaScript-fil med et navn som `main-WKMP3J45.js`. Det er hele din SPA — en side og et script.\n5. Start `ng serve` igen, før du går videre.",
        md2: "Afprøvet: efter at indholdet er slettet, skriver terminalen en gul advarsel, `NG8113: All imports are unused`. Det er ikke en fejl — `RouterOutlet` i `imports` bruges bare ikke lige nu. Den skal bruges igen i lektion 6." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad bruges Node.js, npm og Angular CLI til, når man laver en Angular-app — og kører den færdige app på Node?",
        svar: "**Node.js** kører JavaScript uden for browseren. Angulars værktøjer — compileren og udviklingsserveren — er JavaScript-programmer, så de kører på Node. **npm** henter de pakker, projektet bruger, og skriver dem i `package.json`, ligesom NuGet i .NET. **Angular CLI** er kommandoen `ng`: `ng new` laver projektet, `ng generate` laver komponenter og services, `ng serve` starter en udviklingsserver på port 4200, og `ng build` laver den færdige app. Den færdige app kører **ikke** på Node: den er en `index.html` og en JavaScript-fil, som kører i **browseren**.",
        noegle: ["Node.js", "npm", "NuGet", "ng serve", "ng build", "browseren"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m21l3", titel: "TypeScript: JavaScript med typer", min: 18,
    ord: [
      ["TypeScript", "JavaScript med typer. Oversættes til almindelig JavaScript, før det køres."],
      ["Typeannotation", "`: number` efter et navn. Fortæller, hvilken type variablen, parameteren eller returværdien har."],
      ["number", "TypeScripts eneste taltype. Dækker både heltal og kommatal (int og double i C#)."],
      ["Interface (TypeScript)", "Beskriver formen på et objekt: hvilke properties det har, og deres typer. Bruges især til data fra et API."],
      ["Union-type", "En værdi, der kan have én af flere typer: `string | undefined`."],
      ["export / import", "`export` gør en klasse eller et interface synligt for andre filer. `import` henter det ind."]
    ],
    trin: [
      { t: "laes", h: "Hvorfor TypeScript?",
        md: "I JavaScript (modul 14) har variabler ingen fast type. Skriver du `pris = \"halvtreds\"` et sted, hvor der skulle være et tal, opdager du det først, når programmet kører — måske først hos brugeren.\n\n**TypeScript** er JavaScript **med typer**. Det er præcis samme sprog, plus typeannotationer som `: number`. En compiler tjekker typerne, **før** programmet kører — ligesom C#-compileren. Bagefter fjerner den typerne og laver almindelig JavaScript, for browseren kan kun køre JavaScript.\n\nAngular er skrevet i TypeScript, og `ng serve` oversætter din TypeScript, hver gang du gemmer.",
        sprog: "js",
        kode: R`let alder: number = 25;
let navn: string = 'Ole';
let aktiv: boolean = true;

console.log(navn + ' er ' + alder);`,
        noter: [
          ["let alder: number", "Typen står **efter** navnet med kolon. I C#: `int alder`."],
          ["number", "Én taltype til både heltal og kommatal. Der er ingen `int`, `double` eller `decimal`."],
          ["string / boolean", "Tekst og sandt/falsk. Små bogstaver, ligesom `string` og `bool` i C#."],
          ["'Ole'", "Tekst må stå i enkelte eller dobbelte anførselstegn. Angular-projekter bruger enkelte."]
        ],
        output: "Ole er 25" },
      { t: "forudsig", sprog: "js",
        kode: R`let pris: number = 40;
let antal: number = 3;
let navn: string = 'Kaffe';

let total: number = pris * antal;
console.log(navn + ': ' + total);
console.log(7 / 2);`,
        output: "Kaffe: 120\n3.5",
        fordi: "Typerne ændrer ikke, hvad programmet gør — de bliver fjernet før kørslen. `7 / 2` giver 3.5, fordi `number` også er kommatal. I C# ville `7 / 2` med to `int` give 3. Og JavaScript skriver punktum, ikke komma." },
      { t: "fejl", sprog: "js", q: "Denne TypeScript kan ikke oversættes. Hvilken linje giver fejlen?",
        kode: R`let alder: number = 25;
let navn: string = 'Ole';
alder = 'femogtyve';
console.log(navn + ' er ' + alder);`,
        linje: 3,
        fordi: "`alder` er en `number`, og der bliver lagt tekst i den. TypeScript-compileren siger (afprøvet): `error TS2322: Type 'string' is not assignable to type 'number'.` I almindelig JavaScript ville det bare køre — og fejlen ville vise sig senere.",
        rettet: R`let alder: number = 25;
let navn: string = 'Ole';
alder = 26;
console.log(navn + ' er ' + alder);` },
      { t: "laes", h: "Funktioner med typer",
        md: "Parametre får en type på samme måde, og returtypen står efter parentesen. Arrow functions fra modul 14 kan også have typer.",
        sprog: "js",
        kode: R`function laegSammen(a: number, b: number): number {
  return a + b;
}

const dobbelt = (x: number): number => x * 2;

function hils(navn: string): void {
  console.log('Hej ' + navn);
}

console.log(laegSammen(2, 3));
console.log(dobbelt(21));
hils('Kim');`,
        noter: [
          ["(a: number, b: number): number", "To tal-parametre, og funktionen returnerer et tal. I C#: `static int LaegSammen(int a, int b)`."],
          ["(x: number): number => x * 2", "En arrow function med typer."],
          ["): void", "Returnerer ingenting — samme betydning som i C#."]
        ],
        output: "5\n42\nHej Kim",
        md2: "Kalder du `laegSammen(2, '3')`, siger compileren (afprøvet): `Argument of type 'string' is not assignable to parameter of type 'number'.`" },
      { t: "skriv", sprog: "js",
        q: "Skriv en TypeScript-funktion, der hedder `medMoms`. Den tager en parameter `pris` af typen `number` og returnerer en `number`: prisen ganget med 1.25. Brug `function`-formen.",
        tjek: [
          [/function medMoms\(pris:number\):number\{/, "Første linje: `function medMoms(pris: number): number {`"],
          [/return pris\*1\.25;/, "Returnér `pris * 1.25`"],
          [/:any/, "Brug `number` — ikke `any`", "ikke"]
        ],
        forkert: ["function medMoms(pris) {\n  return pris * 1.25;\n}", "function medMoms(pris: number): any {\n  return pris * 1.25;\n}"],
        loesning: R`function medMoms(pris: number): number {
  return pris * 1.25;
}`,
        fordi: "Parametertypen står efter parameternavnet, og returtypen efter parentesen. Uden typer ville det være almindelig JavaScript — det virker, men compileren kan ikke hjælpe dig." },
      { t: "laes", h: "Interface: formen på data fra API'et",
        md: "Når Angular-appen henter personer fra `PersonApi`, får den JSON: `{\"id\":2,\"name\":\"Kim\",\"city\":\"Kalby\"}`. For at TypeScript kan tjekke koden, skal den vide, hvilken **form** sådan et objekt har. Det beskriver man med et **interface**.\n\nBemærk forskellen fra C#: et interface i C# er en kontrakt, som klasser implementerer (modul 7). I TypeScript bruges det mest til at beskrive formen på **data** — der behøver slet ikke være en klasse.",
        sprog: "js",
        kode: R`interface Person {
  id: number;
  name: string;
  city: string;
}

const personer: Person[] = [
  { id: 1, name: 'Ole', city: 'Valby' },
  { id: 2, name: 'Kim', city: 'Kalby' },
];

for (const p of personer) {
  console.log(p.name + ' fra ' + p.city);
}`,
        noter: [
          ["interface Person { … }", "Et objekt af typen Person **skal** have `id`, `name` og `city` med de typer."],
          ["Person[]", "Et array af Person. I C#: `List<Person>` eller `Person[]`."],
          ["name, city", "Små forbogstaver, fordi det er sådan, ASP.NET sender JSON (modul 19). Navnene skal passe præcis."]
        ],
        output: "Ole fra Valby\nKim fra Kalby" },
      { t: "forudsig", sprog: "js",
        kode: R`interface Vare {
  navn: string;
  pris: number;
}

const varer: Vare[] = [
  { navn: 'Kaffe', pris: 45 },
  { navn: 'Te', pris: 30 },
  { navn: 'Kakao', pris: 60 },
];

const dyre = varer.filter(v => v.pris > 40);
console.log(dyre.length);
console.log(dyre.map(v => v.navn).join(', '));`,
        output: "2\nKaffe, Kakao",
        fordi: "`filter` beholder de varer, hvor prisen er over 40: Kaffe og Kakao. `map` laver et array af navnene, og `join` sætter dem sammen med komma. Det er de samme metoder som i modul 14 — typerne ændrer ikke noget, når koden kører." },
      { t: "fejl", sprog: "js", q: "Denne TypeScript kan ikke oversættes. Hvilken linje giver fejlen?",
        kode: R`interface Person {
  id: number;
  name: string;
  city: string;
}
const p: Person = { id: 1, name: 'Ole' };
console.log(p.name);`,
        linje: 6,
        fordi: "Interfacet siger, at en Person **skal** have `city`. Compileren siger (afprøvet): `Property 'city' is missing in type '{ id: number; name: string; }' but required in type 'Person'.` Skriver du `p.Name` med stort N, får du også en fejl: `Property 'Name' does not exist on type 'Person'. Did you mean 'name'?` — det fanger den fejl fra modul 19, hvor `Name` gav `undefined`.",
        rettet: R`interface Person {
  id: number;
  name: string;
  city: string;
}
const p: Person = { id: 1, name: 'Ole', city: 'Valby' };
console.log(p.name);` },
      { t: "laes", h: "Klasser i TypeScript",
        md: "Klasser ligner C# meget. To forskelle skal du lægge mærke til: felter og metoder i klassen skal **altid** skrives med `this.` foran, og en metode skrives uden ordet `function`.",
        sprog: "js",
        kode: R`class Konto {
  ejer: string;
  saldo: number = 0;

  constructor(ejer: string) {
    this.ejer = ejer;
  }

  indsaet(beloeb: number): void {
    this.saldo = this.saldo + beloeb;
  }
}

const k = new Konto('Kim');
k.indsaet(100);
k.indsaet(50);
console.log(k.ejer + ': ' + k.saldo);`,
        noter: [
          ["ejer: string;", "Et felt med en type. `public` er standard i TypeScript, så det skriver man normalt ikke."],
          ["constructor(ejer: string)", "Konstruktøren hedder altid `constructor` — ikke klassens navn som i C#."],
          ["this.saldo", "`this.` er **påkrævet**. Skriver du bare `saldo`, finder TypeScript den ikke."],
          ["indsaet(beloeb: number): void", "En metode. Intet `function`-ord, ingen `public`."]
        ],
        output: "Kim: 150",
        md2: "I Angular-kode ser du også `private` og `export class`. `private` betyder det samme som i C#. `export` gør klassen synlig for andre filer, der så kan skrive `import { Konto } from './konto';`." },
      { t: "spor", sprog: "js", slut: false,
        q: "Følg programmet. Skriv værdien af `k.antal` og `k.total` efter hver linje, der bliver udført. Læg mærke til, at linje 6 og 7 bliver udført to gange — én gang for hvert kald af `laegI`.",
        kode: R`class Kurv {
  antal: number = 0;
  total: number = 0;

  laegI(pris: number): void {
    this.antal = this.antal + 1;
    this.total = this.total + pris;
  }
}

const k = new Kurv();
k.laegI(20);
k.laegI(15);
console.log(k.antal + ' varer, ' + k.total + ' kr.');`,
        kolonner: ["k.antal", "k.total"],
        raekker: [[11, "=0", "=0"], [6, "1", "0"], [7, "1", "20"], [6, "2", "20"], [7, "2", "35"]],
        output: "2 varer, 35 kr.",
        fordi: "`new Kurv()` laver et objekt med begge felter på 0. Første kald af `laegI(20)` kører linje 6 og 7: antal bliver 1, total 20. Andet kald, `laegI(15)`, kører de samme to linjer igen: antal 2, total 35. Det er præcis, hvad debuggeren ville vise dig." },
      { t: "valg", q: "I Angular-kode ser du `person = signal<Person | undefined>(undefined);`. Hvad betyder `Person | undefined`?",
        svar: ["Værdien er enten en Person eller undefined (ingen værdi endnu)", "Værdien er både en Person og undefined på én gang", "Person bliver delt med undefined", "Det er en fejl — der må kun stå én type"],
        ret: 0, fordi: "`|` laver en **union-type**: én af flere typer. Det svarer til `Person?` i C# (modul 7). Den bruges, fordi personen ikke er hentet fra API'et endnu, når siden vises første gang." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er TypeScript, hvordan forholder det sig til JavaScript, og hvorfor bruger Angular det?",
        svar: "**TypeScript** er **JavaScript med typer**. Man skriver typeannotationer som `alder: number`, og et **interface** beskriver formen på objekter, fx data fra et API. En **compiler** tjekker typerne, **før** programmet kører, og laver så almindelig **JavaScript**, for browseren kan kun køre JavaScript. Fordelen er, at fejl som et forkert property-navn eller tekst i en tal-variabel bliver fanget ved oversættelsen i stedet for hos brugeren — ligesom i C#. Angular bruger TypeScript, fordi store apps med mange filer bliver meget lettere at holde styr på, når editoren og compileren kender typerne.",
        noegle: ["JavaScript med typer", "compiler", "før programmet kører", "interface", "browseren"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m21l4", titel: "Komponenter, skabeloner og data binding", min: 22,
    ord: [
      ["Komponent", "En byggeklods i en Angular-app: en TypeScript-klasse, en HTML-skabelon og CSS. En side består af mange komponenter."],
      ["Skabelon (template)", "Komponentens HTML. Kan indeholde Angular-syntaks som `{{ }}`, `@for` og `(click)`."],
      ["Interpolation", "`{{ udtryk }}` i skabelonen: vis værdien som tekst. Svarer til `@Model.Navn` i Razor."],
      ["Signal", "En værdi, som Angular holder øje med: `signal(…)`. Læses med `()`, ændres med `set` eller `update`. Når den ændres, opdateres siden."],
      ["Property binding", "`[disabled]=\"udtryk\"`: sæt en HTML-egenskab ud fra komponentens data."],
      ["Event binding", "`(click)=\"metode()\"`: kald en metode i komponenten, når der sker noget på siden."],
      ["Two-way binding", "`[(ngModel)]=\"felt\"`: et inputfelt og et felt i komponenten holdes ens begge veje. Kræver `FormsModule`."],
      ["@for / @if", "Angulars kontrolflow i skabelonen: gentag for hvert element, eller vis kun når en betingelse er sand."]
    ],
    trin: [
      { t: "laes", h: "En app er et træ af komponenter",
        md: "En Angular-app er bygget af **komponenter**. Hver komponent er en lille del af siden med sin egen kode: en menu, en liste af personer, en formular. Rod-komponenten `App` indeholder de andre.\n\nEn komponent er tre filer, som hører sammen: **TypeScript** (data og metoder), **HTML** (skabelonen) og **CSS**. Det ligner en controller og et view i MVC, bare samlet i én byggeklods, der kører i browseren.\n\nNy komponent laves med CLI'en. Afprøvet med Angular 22.2:",
        sprog: "text",
        kode: R`ng generate component person-liste

CREATE src/app/person-liste/person-liste.css
CREATE src/app/person-liste/person-liste.spec.ts
CREATE src/app/person-liste/person-liste.ts
CREATE src/app/person-liste/person-liste.html`,
        noter: [
          ["ng generate component", "Kan forkortes til `ng g c person-liste`."],
          ["person-liste.ts", "Klassen `PersonListe` med `selector: 'app-person-liste'`."],
          ["person-liste.spec.ts", "En test. Spring den over."]
        ] },
      { t: "valg", q: "Du skriver `ng g c kunde-liste`. Hvad hedder klassen, og hvad er dens selector? (Afprøvet med Angular 22: klassen for `person-liste` hed `PersonListe` med selector `app-person-liste`.)",
        svar: ["Klassen `KundeListe` med selector `app-kunde-liste`", "Klassen `kunde-liste` med selector `KundeListe`", "Klassen `KundeListeComponent` med selector `kunde-liste`", "Klassen `App` med selector `app-root`"],
        ret: 0, fordi: "Bindestregerne bliver til store bogstaver i klassenavnet, og selectoren får præfikset `app-`. I ældre Angular-versioner og lærerens kode hedder klassen med `Component` til sidst, fx `KundeListeComponent`, og filen `kunde-liste.component.ts`." },
      { t: "laes", h: "Data i komponenten, vist med {{ }}",
        md: "Her er `PersonListe` med tre personer, som foreløbig står direkte i koden. Data ligger i et **signal**: en værdi, som Angular holder øje med. Når et signal ændres, opdaterer Angular selv de steder på siden, der bruger det.",
        sprog: "js",
        kode: R`import { Component, signal } from '@angular/core';
import { Person } from '../person';

@Component({
  imports: [],
  selector: 'app-person-liste',
  styleUrl: './person-liste.css',
  templateUrl: './person-liste.html',
})
export class PersonListe {
  overskrift = 'Personer';
  personer = signal<Person[]>([
    { id: 1, name: 'Ole', city: 'Valby' },
    { id: 2, name: 'Kim', city: 'Kalby' },
    { id: 3, name: 'Sanne', city: 'Salby' },
  ]);
}`,
        noter: [
          ["import { Person } from '../person';", "Interfacet `Person` ligger i sin egen fil, `src/app/person.ts`, med `export interface Person { id: number; name: string; city: string; }`."],
          ["overskrift = 'Personer';", "Et almindeligt felt. TypeScript kan selv se, at det er en `string`."],
          ["signal<Person[]>([ … ])", "Et signal, der indeholder et array af Person. Startværdien står i parentesen."]
        ],
        md2: "I skabelonen viser `{{ … }}` en værdi som tekst — det hedder **interpolation**. Et signal **læses ved at kalde det** med `()`:\n\n`<h2>{{ overskrift }} ({{ personer().length }})</h2>` viser **Personer (3)**." },
      { t: "valg", q: "Komponenten har `personer = signal<Person[]>([ … tre personer … ]);`. Hvad skal der stå i skabelonen for at vise antallet?",
        svar: ["`{{ personer().length }}`", "`{{ personer.length }}`", "`@personer.Count`", "`{{ signal.personer }}`"],
        ret: 0, fordi: "Et signal læses ved at kalde det: `personer()` giver arrayet, og `.length` giver antallet. `personer.length` uden parentes spørger efter en egenskab på selve signalet, ikke på arrayet." },
      { t: "laes", h: "@for og @if i skabelonen",
        md: "Skabelonen kan gentage og vælge, ligesom `@foreach` og `@if` i Razor (modul 16):",
        sprog: "html",
        kode: R`<h2>{{ overskrift }} ({{ personer().length }})</h2>

@if (personer().length === 0) {
  <p>Der er ingen personer.</p>
} @else {
  <ul>
    @for (p of personer(); track p.id) {
      <li>{{ p.name }} fra {{ p.city }}</li>
    }
  </ul>
}`,
        noter: [
          ["@for (p of personer(); track p.id)", "For hver person `p` i arrayet: lav et `<li>`. `of` svarer til `in` i C#'s `foreach`."],
          ["track p.id", "Påkrævet. Fortæller Angular, hvordan den kender elementerne fra hinanden, så den kun tegner det, der ændres."],
          ["@if (…) { } @else { }", "Vis kun den ene del. Betingelsen er almindelig TypeScript."]
        ],
        output: "Personer (3)\n• Ole fra Valby\n• Kim fra Kalby\n• Sanne fra Salby",
        md2: "I lærerens kode og i ældre eksempler på nettet ser du den gamle form: `<li *ngFor=\"let p of personer\">` og `<p *ngIf=\"…\">`. Den betyder det samme. Angular 22 laver den nye `@for`/`@if`-form." },
      { t: "udfyld", sprog: "html", q: "Vis alle bøger i en liste. Komponenten har `boeger = signal<Bog[]>([ … ])`, og hver bog har `id` og `title`.",
        kode: R`<ul>
  [[@for]] (b [[of]] boeger(); [[track]] b.id) {
    <li>{{ [[b.title]] }}</li>
  }
</ul>`,
        fordi: "`@for`, så variabelnavnet, `of`, arrayet (signalet kaldt med `()`), og til sidst `track` med noget, der er unikt for hver bog." },
      { t: "laes", h: "Event binding og property binding",
        md: "Nu skal siden reagere. To nye former:\n\n- **Event binding** `(click)=\"skiftByer()\"`: når der klikkes, kaldes metoden i komponenten. Det svarer til `addEventListener` fra modul 14.\n- **Property binding** `[disabled]=\"nytNavn === ''\"`: HTML-egenskaben får værdien af udtrykket og følger med, når data ændres.",
        sprog: "js",
        kode: R`// i person-liste.ts
visByer = true;

skiftByer() {
  this.visByer = !this.visByer;
}

// i person-liste.html
<button (click)="skiftByer()">Vis/skjul byer</button>

@for (p of personer(); track p.id) {
  <li>
    {{ p.name }}
    @if (visByer) {
      <span> fra {{ p.city }}</span>
    }
  </li>
}`,
        noter: [
          ["(click)=\"skiftByer()\"", "Parenteser: data går **fra siden til komponenten** (en hændelse)."],
          ["[disabled]=\"…\"", "Firkantede klammer: data går **fra komponenten til siden**."],
          ["!this.visByer", "`!` vender `true` til `false` og omvendt."]
        ],
        md2: "Afprøvet: første klik skjuler byerne, så der kun står Ole, Kim og Sanne. Næste klik viser dem igen." },
      { t: "valg", q: "Hvad er forskellen på `[disabled]=\"…\"` og `(click)=\"…\"`?",
        svar: ["`[ ]` sender data fra komponenten ud på siden; `( )` sender en hændelse fra siden ind til komponenten", "Der er ingen forskel", "`[ ]` er til knapper, `( )` er til inputfelter", "`( )` er den gamle form af `[ ]`"],
        ret: 0, fordi: "Firkantede klammer er **property binding**: komponent → side. Parenteser er **event binding**: side → komponent. Begge på én gang, `[( )]`, er two-way binding — det kommer nu." },
      { t: "laes", h: "Two-way binding med ngModel",
        md: "Et inputfelt skal både **vise** et felt i komponenten og **opdatere** feltet, når brugeren skriver. Det hedder **two-way binding** og skrives `[(ngModel)]` — firkantede klammer **og** parenteser. `ngModel` kommer fra `FormsModule`, som skal stå i komponentens `imports`.",
        sprog: "js",
        kode: R`// i person-liste.ts
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  // ... resten som før
})
export class PersonListe {
  // ... personer som før
  nytNavn = '';
  nyBy = '';

  tilfoej() {
    const ny: Person = { id: this.personer().length + 1, name: this.nytNavn, city: this.nyBy };
    this.personer.update(liste => [...liste, ny]);
    this.nytNavn = '';
    this.nyBy = '';
  }
}

// i person-liste.html
<input [(ngModel)]="nytNavn" placeholder="Navn" />
<input [(ngModel)]="nyBy" placeholder="By" />
<button (click)="tilfoej()" [disabled]="nytNavn === ''">Tilføj</button>
<p>Du skriver: {{ nytNavn }}</p>`,
        noter: [
          ["[(ngModel)]=\"nytNavn\"", "Skriver brugeren, ændres `nytNavn`. Ændres `nytNavn` i koden, ændres feltet."],
          ["personer.update(liste => …)", "Giv signalet en ny værdi ud fra den gamle."],
          ["[...liste, ny]", "Et **nyt** array med alle de gamle elementer og `ny` til sidst. `...` hedder spread. Signalet opdager kun en ændring, når det får et nyt array."],
          ["this.nytNavn = ''", "Tøm feltet. Takket være two-way binding bliver inputfeltet også tomt."]
        ],
        md2: "Afprøvet: mens man skriver *Lars*, står der *Du skriver: Lars* under felterne, bogstav for bogstav. Efter klik på **Tilføj** står der **Personer (4)**, Lars er nederst, og felterne er tomme." },
      { t: "spor", sprog: "js", slut: false,
        q: "Listen har 3 personer. Brugeren har skrevet `Lars` og `Visby` og klikker på **Tilføj**. Følg metoden, og skriv værdierne efter hver linje. En tom tekst skriver du som `''`.",
        kode: R`tilfoej() {
  const ny: Person = { id: this.personer().length + 1, name: this.nytNavn, city: this.nyBy };
  this.personer.update(liste => [...liste, ny]);
  this.nytNavn = '';
  this.nyBy = '';
}`,
        kolonner: ["personer().length", "nytNavn", "nyBy", "ny.id"],
        raekker: [[2, "=3", "=Lars", "=Visby", "=4"], [3, "4", "Lars", "Visby", "4"], [4, "4", "''", "Visby", "4"], [5, "4", "''", "''", "4"]],
        fordi: "Linje 2 laver en ny person med id 3 + 1 = 4 — listen er ikke ændret endnu. Linje 3 giver signalet et nyt array med fire personer, og først nu opdaterer Angular listen på siden. Linje 4 og 5 tømmer felterne, og two-way binding tømmer inputfelterne. `ny.id` er stadig 4: personen findes jo stadig, nu inde i listen." },
      { t: "fejl", sprog: "js", q: "Skabelonen bruger `[(ngModel)]`, men `ng serve` giver fejlen `NG8002: Can't bind to 'ngModel' since it isn't a known property of 'input'.` (afprøvet). Hvilken linje i komponenten er skyld i det?",
        kode: R`import { Component, signal } from '@angular/core';
import { Person } from '../person';

@Component({
  imports: [],
  selector: 'app-person-liste',
  styleUrl: './person-liste.css',
  templateUrl: './person-liste.html',
})
export class PersonListe {
  nytNavn = '';
}`,
        linje: 5,
        fordi: "`ngModel` kommer fra `FormsModule`, og det skal stå i komponentens `imports`. Ellers kender skabelonen ikke ordet. Samme fejltype får du, hvis du bruger `<app-person-liste />` uden at importere `PersonListe` (`NG8001: 'app-person-liste' is not a known element`), eller `[routerLink]` uden `RouterLink`. Regel: **bruger skabelonen noget, skal det stå i `imports`**.",
        rettet: R`import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Person } from '../person';

@Component({
  imports: [FormsModule],
  selector: 'app-person-liste',
  styleUrl: './person-liste.css',
  templateUrl: './person-liste.html',
})
export class PersonListe {
  nytNavn = '';
}` },
      { t: "ide", h: "Byg PersonListe",
        md: "Byg komponenten i dit `person-app`-projekt, mens `ng serve` kører.\n\n1. Lav filen `src/app/person.ts` med `export interface Person { id: number; name: string; city: string; }` (højreklik på mappen `app` → ny fil).\n2. Skriv `ng g c person-liste` i en **ny** terminal (den første kører `ng serve`).\n3. Skriv `person-liste.ts` med `overskrift`, `personer`, `visByer`, `nytNavn`, `nyBy`, `skiftByer()` og `tilfoej()`, og `FormsModule` i `imports`.\n4. Skriv `person-liste.html` med overskriften, knappen **Vis/skjul byer**, `@if`/`@for`-listen, de to inputfelter og knappen **Tilføj**.\n5. I `app.ts`: importér `PersonListe` og skriv den i `imports`. I `app.html`: `<h1>PersonApp</h1>` og `<app-person-liste />`.\n6. Skriv koden selv — kopiér den ikke. Gem, og se browseren.",
        sprog: "text",
        kode: R`PersonApp
Personer (3)
[Vis/skjul byer]
• Ole fra Valby
• Kim fra Kalby
• Sanne fra Salby
[Navn] [By] [Tilføj]`,
        md2: "Prøv: knappen **Tilføj** er grå, indtil du skriver et navn. Tilføj *Lars* fra *Visby*, og se **Personer (4)**. Genindlæs siden: Lars er væk igen — data ligger kun i browserens hukommelse. I næste lektion kommer de fra dit API." },
      { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: Hvad er en komponent i Angular, og hvilke slags data binding findes der?",
        svar: "En **komponent** er en byggeklods i appen: en **TypeScript-klasse** med data og metoder, en **HTML-skabelon** og CSS. Klassen har dekoratoren `@Component` med en **selector**, så komponenten kan bruges som et tag, fx `<app-person-liste />`. Der er fire slags binding: **interpolation** `{{ }}` viser en værdi som tekst; **property binding** `[disabled]` sender data fra komponenten til en HTML-egenskab; **event binding** `(click)` kalder en metode, når der sker noget på siden; og **two-way binding** `[(ngModel)]` holder et inputfelt og et felt ens begge veje. Data, der ændrer sig, lægger jeg i et **signal**, så Angular ved, hvornår siden skal opdateres.",
        noegle: ["komponent", "skabelon", "selector", "interpolation", "property binding", "event binding", "ngModel", "signal"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m21l5", titel: "Services og HttpClient: hent data fra dit Web API", min: 24,
    ord: [
      ["Service (Angular)", "En klasse, der ikke viser noget, men fx henter data. Deles af komponenterne via dependency injection."],
      ["inject()", "Angulars måde at bede om en service: `private http = inject(HttpClient);`. Svarer til constructor injection i ASP.NET."],
      ["HttpClient", "Angulars klasse til at sende HTTP-requests til et API: `get`, `post`, `put`, `delete`."],
      ["Observable", "Et svar, der kommer senere. Der sker ingenting, før man kalder `subscribe`. Minder om `Task` i C#."],
      ["subscribe", "Start requesten, og angiv, hvad der skal ske, når svaret kommer (`next`) eller fejler (`error`)."],
      ["ngOnInit", "En metode, Angular kalder én gang, når komponenten er lavet. Her henter man typisk data."],
      ["CORS", "Serverens tilladelse til, at JavaScript fra en anden origin (adresse og port) må læse svaret. Sættes op i API'ets `Program.cs`."]
    ],
    trin: [
      { t: "laes", h: "Hvorfor en service?",
        md: "Komponenten skal vise personer. Den skal **ikke** selv vide, hvordan man taler med API'et — det skal kunne genbruges af andre komponenter, fx en detaljeside. Derfor lægges al snak med API'et i en **service**.\n\nDet er den samme tanke som repository'et i modul 19: controlleren viste data, `IPersonsData` hentede dem, og **dependency injection** gav controlleren et repository. I Angular giver dependency injection komponenten en service. Afprøvet med Angular 22.2:",
        sprog: "text",
        kode: R`ng generate service person-service

CREATE src/app/person-service.spec.ts
CREATE src/app/person-service.ts`,
        md2: "Kald den `person-service`, ikke bare `person`: i Angular 22 får filen samme navn som det, du skriver, og `person.ts` er allerede dit interface." },
      { t: "laes", h: "PersonService med HttpClient",
        md: "Servicen bruger Angulars **HttpClient** til at sende requests til `PersonApi`. Der er én metode pr. endpoint, præcis som i API'et.",
        sprog: "js",
        kode: R`import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './person';

@Service()
export class PersonService {
  private http = inject(HttpClient);
  private url = 'http://localhost:5257/api/Persons';

  hentAlle(): Observable<Person[]> {
    return this.http.get<Person[]>(this.url);
  }

  hentEn(id: number): Observable<Person> {
    return this.http.get<Person>(this.url + '/' + id);
  }

  opret(person: Person): Observable<Person> {
    return this.http.post<Person>(this.url, person);
  }

  slet(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id);
  }
}`,
        noter: [
          ["@Service()", "Gør klassen til en service, som Angular selv laver og deler. I ældre versioner og lærerens kode står der `@Injectable({ providedIn: 'root' })` — det betyder det samme."],
          ["inject(HttpClient)", "Bed Angular om en HttpClient. I lærerens kode ser du i stedet `constructor(private http: HttpClient) {}` — også det betyder det samme."],
          ["private url", "API'ets adresse. Brug **dit eget** portnummer fra `PersonApi` (modul 19)."],
          ["get<Person[]>(url)", "Send GET, og fortæl TypeScript, at svaret er et array af Person."],
          ["post<Person>(url, person)", "Send POST med personen som JSON i body."],
          ["Observable<Person[]>", "Ikke selve personerne, men et svar, der kommer senere."]
        ],
        md2: "I Angular 22 er `HttpClient` klar uden mere opsætning (afprøvet). I ældre vejledninger skal man først skrive `provideHttpClient()` i `providers` i `app.config.ts`." },
      { t: "udfyld", sprog: "js", q: "Gør servicen færdig: den skal sende en GET til `this.url` og give et array af `Bog` tilbage.",
        kode: R`@Service()
export class BogService {
  private http = [[inject]](HttpClient);
  private url = 'http://localhost:5258/api/Books';

  hentAlle(): [[Observable]]<Bog[]> {
    return this.http.[[get]]<Bog[]>(this.url);
  }
}`,
        fordi: "`inject` henter HttpClient. Metoden returnerer en `Observable<Bog[]>`, og `this.http.get<Bog[]>(…)` laver den." },
      { t: "valg", q: "En komponent kalder `this.personService.slet(2);` — uden `.subscribe(…)` bagefter. Hvad sker der?",
        svar: ["Ingenting: en Observable fra HttpClient sender først requesten, når nogen kalder subscribe", "Person 2 bliver slettet med det samme", "Appen går ned med en fejl", "Requesten bliver sendt, men svaret bliver smidt væk"],
        ret: 0, fordi: "En `Observable` er en **opskrift** på en request, ikke selve requesten. Først `subscribe` sætter den i gang. Det er en af de mest almindelige fejl: ingen fejlbesked, og i Network-fanen er der ingen DELETE." },
      { t: "laes", h: "Komponenten bruger servicen",
        md: "Nu henter `PersonListe` personerne fra servicen i stedet for at have dem i koden. Det sker i **`ngOnInit`**, som Angular kalder én gang, når komponenten er lavet.",
        sprog: "js",
        kode: R`export class PersonListe implements OnInit {
  private personService = inject(PersonService);

  personer = signal<Person[]>([]);
  fejl = signal('');

  ngOnInit() {
    this.hent();
  }

  hent() {
    this.personService.hentAlle().subscribe({
      next: data => this.personer.set(data),
      error: () => this.fejl.set('Kunne ikke hente personerne. Kører PersonApi?'),
    });
  }
}`,
        noter: [
          ["implements OnInit", "Lover, at klassen har metoden `ngOnInit`. Ligesom et interface i C#."],
          ["signal<Person[]>([])", "Start med en tom liste. Den bliver fyldt, når svaret kommer."],
          ["subscribe({ next, error })", "**Nu** sendes requesten. `next` kører, når svaret kommer; `error`, hvis det fejler."],
          ["this.personer.set(data)", "Læg personerne i signalet. Angular opdaterer listen på siden."]
        ],
        md2: "Husk `import { Component, OnInit, inject, signal } from '@angular/core';` og `import { PersonService } from '../person-service';` øverst. Skabelonen er den samme som før — `@for (p of personer(); track p.id)` virker, uanset om personerne kom fra koden eller fra API'et." },
      { t: "forudsig", sprog: "js", q: "Et svar fra et API kommer **senere** — ligesom `setTimeout` fra modul 14. Hvad skriver programmet?",
        kode: R`console.log('A: sender request');
setTimeout(() => console.log('C: svaret kom'), 0);
console.log('B: efter subscribe');`,
        output: "A: sender request\nB: efter subscribe\nC: svaret kom",
        fordi: "Funktionen i `setTimeout` bliver først kaldt, når den nuværende kode er færdig — også med 0 millisekunder. Sådan er det også med `subscribe`: koden efter `subscribe` kører **før** svaret er kommet." },
      { t: "spor", sprog: "js", slut: false,
        q: "Listen starter tom, og API'et svarer med 3 personer. Følg `hent()`, og skriv antallet af personer i signalet og det, konsollen har vist, efter hver linje. Rækkerne står i den rækkefølge, linjerne **faktisk** bliver udført. Skriv konsollens bogstaver med mellemrum, fx `A B`.",
        kode: R`hent() {
  console.log('A');
  this.personService.hentAlle().subscribe({
    next: data => {
      console.log('C');
      this.personer.set(data);
    },
  });
  console.log('B');
}`,
        kolonner: ["personer().length", "konsollen"],
        raekker: [[2, "=0", "=A"], [3, "0", "A"], [9, "0", "A B"], [5, "0", "A B C"], [6, "3", "A B C"]],
        fordi: "Linje 3 **sender** requesten og registrerer `next`, men venter ikke. Derfor kommer linje 9 lige efter, og B skrives, mens listen stadig er tom. Først når API'et svarer, kører linje 5 og 6. Afprøvet i Chrome med `PersonApi`: konsollen viste præcis A, B, C. Vil du se det selv, så sæt `console.log` ind og se i {{**F12**||**⌥⌘I**}} → **Console**." },
      { t: "laes", h: "CORS: API'et skal give lov",
        md: "Kører du nu appen, er listen tom. I konsollen står der (afprøvet i Chrome):\n\n`Access to fetch at 'http://localhost:5257/api/Persons' from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`\n\nDu kender fejlen fra modul 19. Appen kommer fra `localhost:4200`, API'et fra `localhost:5257` — to forskellige **origins**. Browseren lader kun appen læse svaret, hvis **API'et** giver lov. Rettelsen er i `PersonApi`'s `Program.cs`. Denne gang tillades kun Angular-appens adresse:",
        frag: true,
        kode: R`builder.Services.AddCors(options =>
{
    options.AddPolicy("Angular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// ... MapOpenApi som før ...

app.UseCors("Angular");

app.UseAuthorization();

app.MapControllers();`,
        noter: [
          ["AddPolicy(\"Angular\", …)", "En navngivet politik. Navnet vælger du selv."],
          ["WithOrigins(\"http://localhost:4200\")", "Kun Angular-appen får lov. Uden skråstreg til sidst."],
          ["AllowAnyHeader().AllowAnyMethod()", "Tillad `Content-Type: application/json` og POST, PUT og DELETE."],
          ["app.UseCors(\"Angular\")", "Brug politikken. Står før `MapControllers()`."]
        ],
        md2: "Afprøvet: med de linjer viser appen de tre personer, og både tilføj og slet virker. Har du allerede `AllowAnyOrigin()` fra modul 19, virker det også — `WithOrigins` er bare strammere." },
      { t: "valg", q: "Angular-appen på `localhost:4200` får fejlen *blocked by CORS policy*, når den kalder `PersonApi` på `localhost:5257`. Hvor laver du rettelsen?",
        svar: ["I PersonApi's Program.cs: `AddCors` med `WithOrigins(\"http://localhost:4200\")` og `UseCors`", "I Angular-servicen: skift `get` ud med `post`", "I `index.html` i Angular-appen", "I databasen"],
        ret: 0, fordi: "CORS er **serverens** tilladelse. Det er API'et, der skal sende headeren `Access-Control-Allow-Origin`, så browseren må give svaret videre til appen." },
      { t: "fejl", sprog: "js", logisk: true,
        q: "Komponenten skal vise personerne fra API'et. Konsollen viser `modtaget 3`, og Network-fanen viser status 200 med tre personer. Men siden viser **Personer (0)** og en tom liste. Skabelonen bruger `{{ personer.length }}` og `@for (p of personer; …)`. Hvilken linje er skyld i det?",
        kode: R`export class PersonListe implements OnInit {
  private personService = inject(PersonService);
  personer: Person[] = [];

  ngOnInit() {
    this.personService.hentAlle().subscribe(data => {
      this.personer = data;
      console.log('modtaget ' + data.length);
    });
  }
}`,
        linje: 3,
        fordi: "Afprøvet med Angular 22: et **almindeligt felt**, der får en ny værdi, når svaret fra API'et kommer, bliver **ikke** vist — Angular ved ikke, at det er ændret. Med et **signal** ved Angular det. Læreren løste samme problem med `ChangeDetectorRef`, der beder Angular om at opdatere siden. Med signals sker det af sig selv. Husk også at ændre skabelonen til `personer()`.",
        rettet: R`export class PersonListe implements OnInit {
  private personService = inject(PersonService);
  personer = signal<Person[]>([]);

  ngOnInit() {
    this.personService.hentAlle().subscribe(data => {
      this.personer.set(data);
      console.log('modtaget ' + data.length);
    });
  }
}` },
      { t: "laes", h: "Tilføj og slet via API'et",
        md: "Til sidst skal **Tilføj** og en **Slet**-knap tale med API'et. Når API'et har svaret, hentes listen igen, så siden viser det, der faktisk ligger på serveren.",
        sprog: "js",
        kode: R`tilfoej() {
  const ny: Person = { id: 0, name: this.nytNavn, city: this.nyBy };
  this.nytNavn = '';
  this.nyBy = '';
  this.personService.opret(ny).subscribe(() => this.hent());
}

slet(id: number) {
  this.personService.slet(id).subscribe(() => this.hent());
}

// i skabelonen, inde i @for:
<li>
  {{ p.name }} fra {{ p.city }}
  <button (click)="slet(p.id)">Slet</button>
</li>`,
        noter: [
          ["id: 0", "API'et giver selv personen et id. Det, vi sender, er ligegyldigt."],
          ["opret(ny).subscribe(() => this.hent())", "Send POST. Når API'et har svaret, hent alle igen."],
          ["slet(p.id)", "Send `DELETE /api/Persons/2`. API'et svarer 204, og listen hentes igen."]
        ],
        md2: "Afprøvet: Lars fra Visby blev tilføjet (**Personer (4)**), og et klik på **Slet** ud for Kim gav **Personer (3)** uden Kim. Glem ikke `subscribe` — uden den bliver requesten aldrig sendt." },
      { t: "ide", h: "PersonApp henter fra PersonApi",
        md: "1. Start `PersonApi` fra modul 19 i {{Visual Studio||Rider}}. Tjek dit portnummer i `Properties/launchSettings.json`.\n2. Tilføj CORS-linjerne i `PersonApi`'s `Program.cs`, og start API'et igen.\n3. I `person-app`: `ng g s person-service`, og skriv servicen med dit portnummer.\n4. Ret `PersonListe`: tom liste fra start, `inject(PersonService)`, `ngOnInit`, `hent()`, `tilfoej()` og `slet()`. Tilføj `fejl`-signalet og `@if (fejl() !== '') { <p>{{ fejl() }}</p> }` i skabelonen.\n5. Kør `ng serve`, og åbn `http://localhost:4200`. Skriv koden selv.",
        sprog: "text",
        kode: R`PersonApp
Personer (3)
• Ole fra Valby [Slet]
• Kim fra Kalby [Slet]
• Sanne fra Salby [Slet]`,
        md2: "Åbn {{**F12**||**⌥⌘I**}} → **Network**, og tilføj en person. Du ser en **POST** til `api/Persons` med status **201** og en **GET** bagefter — og ingen ny `document`. Stop API'et, og genindlæs appen: nu står fejlbeskeden *Kunne ikke hente personerne. Kører PersonApi?*" },
      { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: Hvad sker der, fra `PersonListe` bliver vist, til personerne står på skærmen?",
        svar: "Angular laver komponenten og giver den en **PersonService** via **dependency injection** med `inject`. Så kalder Angular **ngOnInit**, som kalder servicens `hentAlle()`. Servicen bruger **HttpClient** til at lave en GET til `PersonApi` og returnerer en **Observable**. Først når komponenten kalder **subscribe**, bliver requesten sendt. API'et svarer med **JSON**, og fordi API'et har sat **CORS** op til `localhost:4200`, må browseren give svaret til appen. I `next` lægges personerne i et **signal**, og Angular opdaterer `@for`-listen på siden. Siden bliver aldrig skiftet ud — det er en SPA.",
        noegle: ["dependency injection", "ngOnInit", "HttpClient", "Observable", "subscribe", "CORS", "signal"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m21l6", titel: "Routing: flere sider i én side", min: 22,
    ord: [
      ["Route", "En regel: når adressen er X, så vis komponent Y. Står i `app.routes.ts`."],
      ["<router-outlet />", "Pladsen i skabelonen, hvor routerens komponent bliver vist. Svarer til `@RenderBody()` i en Razor-layout."],
      ["routerLink", "Et link, som routeren håndterer i browseren i stedet for at hente en ny side."],
      ["Route-parameter", "En del af adressen, der kan variere: `:id` i `personer/:id`."],
      ["ActivatedRoute", "Service med oplysninger om den aktuelle adresse, fx route-parametre."],
      ["Router.navigate", "Skift side fra koden, fx efter at noget er gemt."],
      ["Wildcard-route", "`**` passer til alle adresser. Står sidst og fanger adresser, der ikke findes."]
    ],
    trin: [
      { t: "laes", h: "Ruter, router-outlet og routerLink",
        md: "Indtil nu har `PersonApp` én side. Nu skal den have tre: listen, en detaljeside for hver person og en **Om**-side. I en SPA er det **routeren** i browseren, der skifter (lektion 1). Der skal tre ting til:\n\n1. **Ruterne** i `app.routes.ts`: hvilken adresse viser hvilken komponent.\n2. **`<router-outlet />`** i `app.html`: hvor komponenten skal vises.\n3. **`routerLink`** på links: så routeren skifter i stedet for browseren.\n\n`ng new` har allerede sat routeren op med `provideRouter(routes)` i `app.config.ts`. Lav først de to nye komponenter med `ng g c person-detaljer` og `ng g c om`.",
        sprog: "js",
        kode: R`// app.routes.ts
import { Routes } from '@angular/router';
import { Om } from './om/om';
import { PersonDetaljer } from './person-detaljer/person-detaljer';
import { PersonListe } from './person-liste/person-liste';

export const routes: Routes = [
  { path: '', component: PersonListe },
  { path: 'personer/:id', component: PersonDetaljer },
  { path: 'om', component: Om },
  { path: '**', redirectTo: '' },
];`,
        noter: [
          ["path: ''", "Forsiden, `http://localhost:4200/`."],
          ["'personer/:id'", "`:id` er en **route-parameter**: `/personer/2` og `/personer/17` passer begge. Svarer til `{id}` i ASP.NET."],
          ["path: '**'", "**Wildcard**: alle andre adresser. `redirectTo: ''` sender brugeren til forsiden."],
          ["Ingen skråstreg foran", "Stierne skrives `'om'`, ikke `'/om'`."]
        ] },
      { t: "laes", h: "Menuen og pladsen til siderne",
        md: "`app.html` bliver appens **layout**: overskrift og menu øverst, og `<router-outlet />` der, hvor siden skal skifte. Det svarer til `_Layout.cshtml` med `@RenderBody()` i MVC.",
        sprog: "html",
        kode: R`<h1>{{ titel }}</h1>
<nav>
  <a routerLink="/">Personer</a> |
  <a routerLink="/om">Om</a>
</nav>
<router-outlet />`,
        noter: [
          ["routerLink=\"/om\"", "Brug `routerLink` i stedet for `href`. Med `href` henter browseren hele siden igen — så er det ikke længere en SPA."],
          ["<router-outlet />", "Her viser routeren `PersonListe`, `PersonDetaljer` eller `Om`, alt efter adressen."]
        ],
        md2: "`app.ts` skal have `imports: [RouterOutlet, RouterLink]` (begge fra `@angular/router`) og feltet `titel = 'PersonApp';`. `<app-person-liste />` skal **ikke** stå i `app.html` mere — det er nu routerens job." },
      { t: "valg", q: "Menuen har `<a href=\"/om\">Om</a>` i stedet for `<a routerLink=\"/om\">Om</a>`. Om-siden bliver vist i begge tilfælde. Hvad er forskellen?",
        svar: ["Med `href` henter browseren hele siden og appen forfra; med `routerLink` skifter routeren bare komponent", "Ingen forskel", "`href` virker kun i MVC og giver en fejl i Angular", "`routerLink` henter siden fra serveren, `href` gør ikke"],
        ret: 0, fordi: "Afprøvet: med `href` hentede browseren et nyt **document**, og alt i appens hukommelse var væk. Med `routerLink` blev der ikke hentet noget. `href` gør altså appen til en MPA igen — langsommere, og data i komponenterne forsvinder." },
      { t: "valg", q: "Ruterne er `''` → PersonListe, `'personer/:id'` → PersonDetaljer, `'om'` → Om og `'**'` → redirectTo `''`. Brugeren skriver `http://localhost:4200/kunder` i adresselinjen. Hvad sker der?",
        svar: ["Ingen rute passer undtagen `**`, så brugeren bliver sendt til forsiden med listen", "Angular viser en 404-side fra serveren", "Appen går ned", "Om-siden vises"],
        ret: 0, fordi: "Routeren prøver ruterne oppefra. Kun `**` passer, og den sender videre til `''`. Afprøvet: adressen blev til `http://localhost:4200/`." },
      { t: "valg", q: "Hvorfor skal ruten med `path: '**'` stå **sidst** i listen?",
        svar: ["Routeren prøver ruterne oppefra, og `**` passer til alt — står den først, når routeren aldrig de andre", "Fordi Angular sorterer ruterne alfabetisk", "Det er ligegyldigt, hvor den står", "Fordi `**` kun virker på den sidste linje i en fil"],
        ret: 0, fordi: "Den første rute, der passer, vinder. `**` passer til enhver adresse, så den skal stå til sidst som en opsamling." },
      { t: "laes", h: "Route-parameteren: hvilken person?",
        md: "Listen skal linke til detaljesiden: `<a [routerLink]=\"['/personer', p.id]\">{{ p.name }}</a>`. Med firkantede klammer bliver det til `/personer/2` for Kim. (Husk `RouterLink` i `imports` i `PersonListe`.)\n\nDetaljesiden læser `id` fra adressen med **ActivatedRoute** og henter personen:",
        sprog: "js",
        kode: R`export class PersonDetaljer implements OnInit {
  private route = inject(ActivatedRoute);
  private personService = inject(PersonService);

  person = signal<Person | undefined>(undefined);
  ikkeFundet = signal(false);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.personService.hentEn(id).subscribe({
      next: p => this.person.set(p),
      error: () => this.ikkeFundet.set(true),
    });
  }
}`,
        noter: [
          ["inject(ActivatedRoute)", "Oplysninger om den adresse, der førte hertil. Importeres fra `@angular/router`."],
          ["paramMap.get('id')", "Værdien af `:id` fra ruten — som **tekst**, fx `'2'`. Navnet skal stå præcis som i ruten."],
          ["Number(…)", "Lav teksten om til et tal. Svarer til `int.Parse`."],
          ["error: …", "API'et svarer 404, hvis personen ikke findes. Så sættes `ikkeFundet`."]
        ] },
      { t: "udfyld", sprog: "js", q: "Ruten er `{ path: 'boeger/:id', component: BogDetaljer }`. Læs id'et i komponenten.",
        kode: R`private route = inject([[ActivatedRoute]]);

ngOnInit() {
  const id = [[Number|parseInt]](this.route.snapshot.paramMap.get('[[id]]'));
}`,
        fordi: "`ActivatedRoute` kender den aktuelle adresse. `paramMap.get('id')` giver teksten fra `:id`, og `Number` gør den til et tal." },
      { t: "laes", h: "Detaljesidens skabelon",
        md: "Personen er `undefined`, indtil svaret kommer. Skabelonen skal derfor vise tre ting: personen, en besked hvis den ikke findes, eller *Henter …* imens.",
        sprog: "html",
        kode: R`@if (person(); as p) {
  <h2>{{ p.name }}</h2>
  <p>Id: {{ p.id }}</p>
  <p>By: {{ p.city }}</p>
} @else if (ikkeFundet()) {
  <p>Personen findes ikke.</p>
} @else {
  <p>Henter …</p>
}

<a routerLink="/">Tilbage til listen</a>`,
        noter: [
          ["@if (person(); as p)", "Hvis signalet har en person, så kald den `p` inde i blokken."],
          ["@else if (ikkeFundet())", "API'et svarede 404."],
          ["@else", "Endnu intet svar."]
        ],
        md2: "Afprøvet: klik på Kim viser **Kim**, **Id: 2**, **By: Kalby**, og adressen er `http://localhost:4200/personer/2`. Skriver man `/personer/99` direkte, står der **Personen findes ikke.**" },
      { t: "fejl", sprog: "js", logisk: true,
        q: "Når brugeren klikker på et navn i listen, skal detaljesiden vises. Men afprøvet: adressen skifter et øjeblik og ender på `http://localhost:4200/`, og listen står der stadig. Linket i listen er `[routerLink]=\"['/personer', p.id]\"`. Hvilken linje i ruterne er forkert?",
        kode: R`export const routes: Routes = [
  { path: '', component: PersonListe },
  { path: 'person/:id', component: PersonDetaljer },
  { path: 'om', component: Om },
  { path: '**', redirectTo: '' },
];`,
        linje: 3,
        fordi: "Linket går til `/personer/2`, men ruten hedder `person/:id`. Ingen rute passer, så `**` sender brugeren til forsiden. Ruten og linket skal stave adressen ens. Det er samme slags fejl som en forkert `[Route]` i ASP.NET (modul 19) — og igen ingen fejlbesked, så du skal læse adressen.",
        rettet: R`export const routes: Routes = [
  { path: '', component: PersonListe },
  { path: 'personer/:id', component: PersonDetaljer },
  { path: 'om', component: Om },
  { path: '**', redirectTo: '' },
];` },
      { t: "laes", h: "Skift side fra koden",
        md: "Nogle gange skal appen selv skifte side, fx tilbage til listen, når en ny person er gemt. Det gør man med **Router**:",
        sprog: "js",
        kode: R`private router = inject(Router);

gem() {
  this.personService.opret(this.ny).subscribe(() => this.router.navigate(['/']));
}`,
        noter: [
          ["inject(Router)", "Routeren selv. Importeres fra `@angular/router`."],
          ["navigate(['/'])", "Gå til forsiden. `navigate(['/personer', 2])` ville gå til `/personer/2`."],
          ["Inde i subscribe", "Først når API'et har svaret. Ellers kunne listen blive hentet, før den nye person var gemt."]
        ],
        md2: "Det svarer til `RedirectToAction(\"Index\")` i MVC. Forskellen er, at intet bliver hentet fra serveren — routeren skifter bare komponent." },
      { t: "valg", q: "Brugeren står på `http://localhost:4200/personer/2` og trykker **F5**. Hvad sker der med `ng serve`?",
        svar: ["Udviklingsserveren sender `index.html`, appen starter, og routeren viser Kim igen", "Serveren leder efter en fil, der hedder `personer/2`, og giver 404", "Appen viser altid forsiden efter F5", "Browseren viser den gamle side fra hukommelsen uden at spørge serveren"],
        ret: 0, fordi: "Afprøvet: `ng serve` svarer med `index.html` på alle adresser, og Angular-routeren læser så `/personer/2`. En rigtig webserver skal sættes op til det samme — ellers giver F5 en 404, fordi filen `personer/2` ikke findes." },
      { t: "ide", h: "Routing i PersonApp",
        md: "1. `ng g c person-detaljer` og `ng g c om`. Skriv en overskrift og en linje tekst i `om.html`.\n2. Skriv ruterne i `app.routes.ts`.\n3. Ret `app.html` til menuen og `<router-outlet />`, og `app.ts` til `imports: [RouterOutlet, RouterLink]`.\n4. Ret navnet i listen til et `[routerLink]`, og tilføj `RouterLink` i `PersonListe`'s `imports`.\n5. Skriv `PersonDetaljer` med `ActivatedRoute`, `hentEn` og skabelonen med `@if`/`@else if`/`@else`.\n6. Skriv koden selv. Gem, og prøv.",
        sprog: "text",
        kode: R`PersonApp
Personer | Om
Kim

Id: 2

By: Kalby

Tilbage til listen`,
        md2: "Bevis, at det er en SPA: åbn {{**F12**||**⌥⌘I**}} → **Network**, vælg filteret **Doc**, og genindlæs én gang. Klik så på Kim, **Om**, og browserens tilbage-knap. Afprøvet: der kommer **ingen** nye documents — kun requests til API'et. Prøv også `/personer/99` og `/noget-forkert` i adresselinjen." },
      { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: Hvordan virker routing i en Angular-app, og hvordan adskiller det sig fra routing i MVC?",
        svar: "I Angular står **ruterne** i `app.routes.ts`: hver rute kobler en **sti** til en **komponent**, fx `'personer/:id'` til `PersonDetaljer`, hvor `:id` er en **route-parameter**. `app.html` har en `<router-outlet />`, hvor routeren viser komponenten, og links bruger **routerLink**. Når brugeren klikker, henter browseren **ikke** en ny side: routeren i browseren skifter adressen og komponenten, og komponenten henter sine data fra API'et. Detaljesiden læser id'et med **ActivatedRoute**. En **wildcard**-rute `**` sidst fanger ukendte adresser. I MVC er det **serveren**, der læser adressen, vælger controller og action og sender en hel ny HTML-side tilbage.",
        noegle: ["app.routes.ts", "router-outlet", "routerLink", "route-parameter", "ActivatedRoute", "browseren", "serveren"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m21v", titel: "Værksted: BookApp — en Angular-frontend til BookApi", vaerksted: true, min: 120, ord: [],
    trin: [
      { t: "laes", h: "Sådan arbejder du i værkstedet",
        md: "Nu bygger du en **ny** Angular-app, `BookApp`, helt selv. Den er frontend til dit `BookApi` fra værkstedet i modul 19, med bøgerne Dune, Matilda og Hobbitten. Den ligner `PersonApp`, men handler om bøger, så du skal tænke dig om i stedet for at skrive af.\n\nOpgaverne bygger oven på hinanden: til sidst har du en SPA med liste, detaljeside, en side til nye bøger, sletning og en menu. Opgave 4 er en fejlfinding, hvor du skal bruge **browserens debugger**.\n\nAngular-opgaverne kan ikke tjekkes automatisk. Sammenlign selv det, du ser i browseren, med det, der står under opgaven.",
        noter: [
          ["Skriv selv", "Skriv koden med dine egne fingre. Kig i `PersonApp`, hvis du er i tvivl om en form — men skriv det ikke af."],
          ["To programmer kører", "`BookApi` i {{Visual Studio||Rider}} og `ng serve` i en terminal. Virker intet, så tjek først, at begge kører."],
          ["Læs fejlene", "Røde fejl i terminalen med `ng serve` er oversætterfejl, fx `NG8002` (noget mangler i `imports`) eller `TS2551` (forkert navn). Fejl, der først sker, når appen kører, står i {{**F12**||**⌥⌘I**}} → **Console**."],
          ["Brug debuggeren", "Skriv `debugger;` på en linje i din TypeScript, og hav udviklerværktøjet åbent. Så stopper browseren dér, og du kan se variablerne under **Scope** i fanen **Sources**."],
          ["Tips før løsning", "Åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af."]
        ] },

      { t: "opgave", h: "BookApp: en liste af bøger", projekt: "book-app", sprog: "js",
        md: "Lav et nyt Angular-projekt med en komponent, der viser tre bøger. Bøgerne står foreløbig i koden. En knap viser og skjuler udgivelsesåret.",
        krav: [
          "Projektet er lavet med `ng new book-app` (CSS, ingen SSR, ingen AI)",
          "`src/app/bog.ts` har `export interface Bog` med `id` (`number`), `title` (`string`), `author` (`string`) og `year` (`number`) — samme navne som JSON'en fra `BookApi`",
          "Komponenten `BogListe` (lavet med `ng g c bog-liste`) har et signal `boeger` med tre bøger: 1 Dune, Frank Herbert, 1965 · 2 Matilda, Roald Dahl, 1988 · 3 Hobbitten, J.R.R. Tolkien, 1937",
          "Skabelonen viser `Bøger (3)` og en `@for`-liste med `Dune af Frank Herbert` osv.",
          "Knappen **Vis/skjul år** skifter et felt `visAar` (starter som `false`), og med `@if` vises året i parentes efter forfatteren",
          "`app.html` indeholder kun `<h1>BookApp</h1>` og `<app-bog-liste />`"
        ],
        tip: [
          "Start med interfacet, så komponenten, og til sidst `app.ts` og `app.html`. Gem tit, og se browseren.",
          "`boeger = signal<Bog[]>([ { id: 1, title: 'Dune', author: 'Frank Herbert', year: 1965 }, … ]);` og i skabelonen `@for (b of boeger(); track b.id) { … }`.",
          "Glemmer du `BogListe` i `imports` i `app.ts`, siger `ng serve`: `NG8001: 'app-bog-liste' is not a known element`."
        ],
        fri: true,
        output: "BookApp\nBøger (3)\n[Vis/skjul år]\n• Dune af Frank Herbert\n• Matilda af Roald Dahl\n• Hobbitten af J.R.R. Tolkien\n\n(efter klik på knappen)\n• Dune af Frank Herbert (1965)\n• Matilda af Roald Dahl (1988)\n• Hobbitten af J.R.R. Tolkien (1937)",
        loesning: R`// src/app/bog.ts
export interface Bog {
  id: number;
  title: string;
  author: string;
  year: number;
}

// src/app/bog-liste/bog-liste.ts
import { Component, signal } from '@angular/core';
import { Bog } from '../bog';

@Component({
  imports: [],
  selector: 'app-bog-liste',
  styleUrl: './bog-liste.css',
  templateUrl: './bog-liste.html',
})
export class BogListe {
  boeger = signal<Bog[]>([
    { id: 1, title: 'Dune', author: 'Frank Herbert', year: 1965 },
    { id: 2, title: 'Matilda', author: 'Roald Dahl', year: 1988 },
    { id: 3, title: 'Hobbitten', author: 'J.R.R. Tolkien', year: 1937 },
  ]);
  visAar = false;

  skiftAar() {
    this.visAar = !this.visAar;
  }
}

// src/app/bog-liste/bog-liste.html
<h2>Bøger ({{ boeger().length }})</h2>

<button (click)="skiftAar()">Vis/skjul år</button>

<ul>
  @for (b of boeger(); track b.id) {
    <li>
      {{ b.title }} af {{ b.author }}
      @if (visAar) {
        <span>({{ b.year }})</span>
      }
    </li>
  }
</ul>

// src/app/app.ts
import { Component } from '@angular/core';
import { BogListe } from './bog-liste/bog-liste';

@Component({
  imports: [BogListe],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}

// src/app/app.html
<h1>BookApp</h1>
<app-bog-liste />`,
        ekstra: ["Vis antallet af bøger udgivet før 1950 under listen. Tip: `boeger().filter(b => b.year < 1950).length` kan stå direkte i `{{ }}`."] },

      { t: "opgave", h: "Hent bøgerne fra BookApi", projekt: "book-app", sprog: "js",
        md: "Nu skal bøgerne komme fra dit `BookApi` i stedet for fra koden. Lav en service, der henter dem, og slå CORS til i API'et.",
        krav: [
          "`BookApi` fra modul 19 kører, og `GET api/Books` giver de tre bøger i browseren",
          "`BookApi`'s `Program.cs` har en CORS-politik, der tillader `http://localhost:4200`, og `app.UseCors(…)` før `MapControllers()`",
          "`ng g s bog-service` har lavet `BogService` med `inject(HttpClient)`, en `url` med **dit** portnummer og metoden `hentAlle(): Observable<Bog[]>`",
          "`BogListe` starter med en tom liste, får servicen med `inject`, og henter bøgerne i `ngOnInit` med `subscribe`",
          "Fejler requesten, står der `Kunne ikke hente bøgerne. Kører BookApi?` på siden (et `fejl`-signal og `@if`)",
          "Vis/skjul år-knappen virker stadig"
        ],
        tip: [
          "Kopiér formen fra `PersonService` og `PersonListe` i hovedet, ikke på skærmen. Det er de samme linjer med `Bog` i stedet for `Person`.",
          "Er listen tom, så se i {{**F12**||**⌥⌘I**}} → **Console**. Står der *blocked by CORS policy*, mangler CORS i `BookApi` — eller du har ikke genstartet API'et.",
          "I komponenten: `this.bogService.hentAlle().subscribe({ next: data => this.boeger.set(data), error: () => this.fejl.set('Kunne ikke hente bøgerne. Kører BookApi?') });`"
        ],
        fri: true,
        output: "BookApp\nBøger (3)\n[Vis/skjul år]\n• Dune af Frank Herbert\n• Matilda af Roald Dahl\n• Hobbitten af J.R.R. Tolkien\n\n(BookApi stoppet, siden genindlæst)\nBøger (0)\nKunne ikke hente bøgerne. Kører BookApi?",
        loesning: R`// BookApi: Program.cs (tilføjet)
builder.Services.AddCors(options =>
{
    options.AddPolicy("Angular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
// ... efter builder.Build():
app.UseCors("Angular");

// src/app/bog-service.ts
import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Bog } from './bog';

@Service()
export class BogService {
  private http = inject(HttpClient);
  private url = 'http://localhost:5258/api/Books';   // dit eget portnummer

  hentAlle(): Observable<Bog[]> {
    return this.http.get<Bog[]>(this.url);
  }
}

// src/app/bog-liste/bog-liste.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { Bog } from '../bog';
import { BogService } from '../bog-service';

@Component({
  imports: [],
  selector: 'app-bog-liste',
  styleUrl: './bog-liste.css',
  templateUrl: './bog-liste.html',
})
export class BogListe implements OnInit {
  private bogService = inject(BogService);

  boeger = signal<Bog[]>([]);
  fejl = signal('');
  visAar = false;

  ngOnInit() {
    this.bogService.hentAlle().subscribe({
      next: data => this.boeger.set(data),
      error: () => this.fejl.set('Kunne ikke hente bøgerne. Kører BookApi?'),
    });
  }

  skiftAar() {
    this.visAar = !this.visAar;
  }
}

// src/app/bog-liste/bog-liste.html (tilføjet under overskriften)
@if (fejl() !== '') {
  <p>{{ fejl() }}</p>
}`,
        ekstra: ["Åbn Network-fanen, og find requesten til `api/Books`. Klik på den, og se **Response**: det er JSON'en, som `next` får som `data`."] },

      { t: "opgave", h: "Detaljeside og menu med routing", projekt: "book-app", sprog: "js",
        md: "Gør BookApp til en app med flere sider: listen, en detaljeside for hver bog og en Om-side, med en menu øverst.",
        krav: [
          "`BogService` har også `hentEn(id: number): Observable<Bog>`, der sender `GET api/Books/{id}`",
          "Komponenterne `BogDetaljer` og `Om` er lavet med `ng g c`",
          "`app.routes.ts` har ruterne `''` → `BogListe`, `'boeger/:id'` → `BogDetaljer`, `'om'` → `Om` og `'**'` → `redirectTo: ''`",
          "`app.html` har `<h1>BookApp</h1>`, en menu med `routerLink` til **Bøger** og **Om**, og `<router-outlet />`",
          "Titlerne i listen er links til `/boeger/{id}` med `[routerLink]`",
          "Detaljesiden viser titel, `Forfatter: …` og `Udgivet: …`, eller `Bogen findes ikke.` ved en 404, og et link **Tilbage til listen**",
          "Network-fanen med filteret **Doc** viser ingen nye documents, når du klikker rundt"
        ],
        tip: [
          "Rækkefølge: service-metoden, de to komponenter, ruterne, `app.html`/`app.ts`, links i listen, og til sidst detaljesiden.",
          "Husk `imports`: `RouterOutlet` og `RouterLink` i `App`, `RouterLink` i `BogListe` og `BogDetaljer`. Mangler den i `BogListe`, hvor der står `[routerLink]`, siger `ng serve` `NG8002: Can't bind to 'routerLink'`. Mangler den i `App` eller `BogDetaljer`, hvor der står `routerLink=\"/…\"` uden klammer, kommer der **ingen** fejl — linket gør bare ingenting, når du klikker.",
          "Detaljesiden: `const id = Number(this.route.snapshot.paramMap.get('id'));` og så `hentEn(id).subscribe({ next: b => this.bog.set(b), error: () => this.ikkeFundet.set(true) });`. Skabelonen: `@if (bog(); as b) { … } @else if (ikkeFundet()) { … } @else { <p>Henter …</p> }`."
        ],
        fri: true,
        output: "(klik på Matilda — adressen er http://localhost:4200/boeger/2)\nBookApp\nBøger | Om\nMatilda\nForfatter: Roald Dahl\nUdgivet: 1988\nTilbage til listen\n\n(adressen /boeger/99)\nBogen findes ikke.",
        loesning: R`// src/app/bog-service.ts (tilføjet)
hentEn(id: number): Observable<Bog> {
  return this.http.get<Bog>(this.url + '/' + id);
}

// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { BogDetaljer } from './bog-detaljer/bog-detaljer';
import { BogListe } from './bog-liste/bog-liste';
import { Om } from './om/om';

export const routes: Routes = [
  { path: '', component: BogListe },
  { path: 'boeger/:id', component: BogDetaljer },
  { path: 'om', component: Om },
  { path: '**', redirectTo: '' },
];

// src/app/app.ts
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}

// src/app/app.html
<h1>BookApp</h1>
<nav>
  <a routerLink="/">Bøger</a> |
  <a routerLink="/om">Om</a>
</nav>
<router-outlet />

// src/app/bog-liste/bog-liste.html (linket i listen)
<a [routerLink]="['/boeger', b.id]">{{ b.title }}</a> af {{ b.author }}
// ... og RouterLink i imports i bog-liste.ts

// src/app/bog-detaljer/bog-detaljer.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Bog } from '../bog';
import { BogService } from '../bog-service';

@Component({
  imports: [RouterLink],
  selector: 'app-bog-detaljer',
  styleUrl: './bog-detaljer.css',
  templateUrl: './bog-detaljer.html',
})
export class BogDetaljer implements OnInit {
  private route = inject(ActivatedRoute);
  private bogService = inject(BogService);

  bog = signal<Bog | undefined>(undefined);
  ikkeFundet = signal(false);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bogService.hentEn(id).subscribe({
      next: b => this.bog.set(b),
      error: () => this.ikkeFundet.set(true),
    });
  }
}

// src/app/bog-detaljer/bog-detaljer.html
@if (bog(); as b) {
  <h2>{{ b.title }}</h2>
  <p>Forfatter: {{ b.author }}</p>
  <p>Udgivet: {{ b.year }}</p>
} @else if (ikkeFundet()) {
  <p>Bogen findes ikke.</p>
} @else {
  <p>Henter …</p>
}

<a routerLink="/">Tilbage til listen</a>

// src/app/om/om.html
<h2>Om BookApp</h2>
<p>En Angular-app, der henter bøger fra BookApi.</p>`,
        ekstra: ["Tryk F5 på `/boeger/2`. Bogen bliver vist igen — `ng serve` sender `index.html`, og routeren læser adressen."] },

      { t: "opgave", h: "Fejlfinding: hver bog \"findes ikke\"", projekt: "book-app", sprog: "js",
        md: "En kollega har skrevet detaljesiden om. Nu står der **Bogen findes ikke.** for **alle** bøger — også Matilda, som helt sikkert findes. Koden kan oversættes, og der er ingen røde fejl i terminalen.\n\nErstat indholdet af din `bog-detaljer.ts` med koden nedenfor. Find fejlen med **browserens debugger** — ikke ved at gætte:\n\n1. Linjen `debugger;` står allerede i koden.\n2. Åbn {{**F12**||**⌥⌘I**}}, og klik på Matilda i listen. Browseren stopper på `debugger;` og viser fanen **Sources**.\n3. Se i panelet **Scope** → **Local**: hvilken værdi har `id`? Hvilken burde den have?\n4. Se også i **Network**: hvilken adresse blev der sendt en GET til?\n5. Ret fejlen, og fjern linjen `debugger;`.",
        krav: [
          "Du har set værdien af `id` i debuggeren og kan forklare, hvorfor den er forkert",
          "Du har set i Network-fanen, hvilken adresse der blev sendt en GET til",
          "Fejlen er rettet, og Matilda vises med `Forfatter: Roald Dahl` og `Udgivet: 1988`",
          "`/boeger/99` viser stadig `Bogen findes ikke.`",
          "Linjen `debugger;` er fjernet igen"
        ],
        tip: [
          "Afprøvet: debuggeren viser `id` = 0, og Network viser `GET http://localhost:…/api/Books/0`. Bog 0 findes ikke, så API'et svarer 404.",
          "`Number(null)` giver 0. Hvorfor giver `paramMap.get(…)` `null`? Sammenlign navnet i `get(…)` med navnet efter kolonet i `app.routes.ts`.",
          "Ruten hedder `boeger/:id` med lille i. Der står `get('Id')` med stort I. Navnene skal være helt ens."
        ],
        start: R`import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Bog } from '../bog';
import { BogService } from '../bog-service';

@Component({
  imports: [RouterLink],
  selector: 'app-bog-detaljer',
  styleUrl: './bog-detaljer.css',
  templateUrl: './bog-detaljer.html',
})
export class BogDetaljer implements OnInit {
  private route = inject(ActivatedRoute);
  private bogService = inject(BogService);

  bog = signal<Bog | undefined>(undefined);
  ikkeFundet = signal(false);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('Id'));
    debugger;
    this.bogService.hentEn(id).subscribe({
      next: b => this.bog.set(b),
      error: () => this.ikkeFundet.set(true),
    });
  }
}`,
        fri: true,
        output: "(i debuggeren, Scope → Local)\nid: 0\n\n(i Network)\nGET http://localhost:5258/api/Books/0  404\n\n(efter rettelsen, klik på Matilda)\nMatilda\nForfatter: Roald Dahl\nUdgivet: 1988",
        loesning: R`ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.bogService.hentEn(id).subscribe({
    next: b => this.bog.set(b),
    error: () => this.ikkeFundet.set(true),
  });
}`,
        fordi: "`paramMap.get('Id')` leder efter en parameter, der hedder `Id` med stort I. Ruten hedder `:id`, så der findes ingen `Id`, og `get` giver `null`. `Number(null)` er 0, så appen spørger efter bog 0, og API'et svarer 404. Der kommer ingen fejlbesked, fordi koden er gyldig — det er en **logisk fejl**, og debuggeren viste den på et øjeblik." },

      { t: "opgave", h: "Den færdige BookApp: opret og slet", projekt: "book-app", sprog: "js",
        md: "Gør BookApp færdig, så den bruger hele CRUD fra `BookApi` undtagen ret: vis, opret og slet. Nye bøger oprettes på deres egen side, og bagefter sender appen brugeren tilbage til listen.",
        krav: [
          "`BogService` har også `opret(bog: Bog): Observable<Bog>` (POST) og `slet(id: number): Observable<void>` (DELETE)",
          "Hver bog i listen har en knap **Slet**. Efter sletningen hentes listen igen fra API'et",
          "En ny komponent `NyBog` på ruten `'ny'` har tre inputfelter med `[(ngModel)]`: titel, forfatter og år (`type=\"number\"`, starter på 2026)",
          "Knappen **Gem** er grå, så længe titlen er tom. Klik sender en POST og går bagefter til listen med `this.router.navigate(['/'])`",
          "Menuen har tre links: **Bøger**, **Ny bog** og **Om**",
          "Afprøv: opret *Momo* af *Michael Ende*. Listen viser `Bøger (4)`, og `GET api/Books/4` i browseren giver `\"year\":2026`"
        ],
        tip: [
          "`ng g c ny-bog`, ruten `{ path: 'ny', component: NyBog }` **før** `'**'`, og linket `<a routerLink=\"/ny\">Ny bog</a>` i menuen.",
          "`NyBog` skal have `FormsModule` i `imports`, og både `inject(BogService)` og `inject(Router)`.",
          "`gem() { const ny: Bog = { id: 0, title: this.titel, author: this.forfatter, year: this.aar }; this.bogService.opret(ny).subscribe(() => this.router.navigate(['/'])); }`"
        ],
        fri: true,
        output: "(efter Gem — adressen er http://localhost:4200/)\nBookApp\nBøger | Ny bog | Om\nBøger (4)\n[Vis/skjul år]\n• Dune af Frank Herbert [Slet]\n• Matilda af Roald Dahl [Slet]\n• Hobbitten af J.R.R. Tolkien [Slet]\n• Momo af Michael Ende [Slet]\n\n(efter Slet ud for Dune)\nBøger (3)\n[Vis/skjul år]\n• Matilda af Roald Dahl [Slet]\n• Hobbitten af J.R.R. Tolkien [Slet]\n• Momo af Michael Ende [Slet]",
        loesning: R`// src/app/bog-service.ts (tilføjet)
opret(bog: Bog): Observable<Bog> {
  return this.http.post<Bog>(this.url, bog);
}

slet(id: number): Observable<void> {
  return this.http.delete<void>(this.url + '/' + id);
}

// src/app/bog-liste/bog-liste.ts (ændret: hent() og slet() — visAar og skiftAar() er der stadig)
export class BogListe implements OnInit {
  private bogService = inject(BogService);

  boeger = signal<Bog[]>([]);
  fejl = signal('');
  visAar = false;

  ngOnInit() {
    this.hent();
  }

  hent() {
    this.bogService.hentAlle().subscribe({
      next: data => this.boeger.set(data),
      error: () => this.fejl.set('Kunne ikke hente bøgerne. Kører BookApi?'),
    });
  }

  slet(id: number) {
    this.bogService.slet(id).subscribe(() => this.hent());
  }

  skiftAar() {
    this.visAar = !this.visAar;
  }
}

// src/app/bog-liste/bog-liste.html (i @for)
<li>
  <a [routerLink]="['/boeger', b.id]">{{ b.title }}</a> af {{ b.author }}
  @if (visAar) {
    <span>({{ b.year }})</span>
  }
  <button (click)="slet(b.id)">Slet</button>
</li>

// src/app/ny-bog/ny-bog.ts
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Bog } from '../bog';
import { BogService } from '../bog-service';

@Component({
  imports: [FormsModule],
  selector: 'app-ny-bog',
  styleUrl: './ny-bog.css',
  templateUrl: './ny-bog.html',
})
export class NyBog {
  private bogService = inject(BogService);
  private router = inject(Router);

  titel = '';
  forfatter = '';
  aar = 2026;

  gem() {
    const ny: Bog = { id: 0, title: this.titel, author: this.forfatter, year: this.aar };
    this.bogService.opret(ny).subscribe(() => this.router.navigate(['/']));
  }
}

// src/app/ny-bog/ny-bog.html
<h2>Ny bog</h2>
<p><input [(ngModel)]="titel" placeholder="Titel" /></p>
<p><input [(ngModel)]="forfatter" placeholder="Forfatter" /></p>
<p><input type="number" [(ngModel)]="aar" /></p>
<button (click)="gem()" [disabled]="titel === ''">Gem</button>

// src/app/app.routes.ts (tilføjet før '**')
{ path: 'ny', component: NyBog },

// src/app/app.html (menuen)
<nav>
  <a routerLink="/">Bøger</a> |
  <a routerLink="/ny">Ny bog</a> |
  <a routerLink="/om">Om</a>
</nav>`,
        ekstra: [
          "Spørg om bekræftelse før sletning: `if (confirm('Slet bogen?')) { … }` inde i `slet`.",
          "Lav en ret-side på ruten `'ret/:id'`, der henter bogen, viser den i felterne og sender en `PUT` med `this.http.put<void>(this.url + '/' + id, bog)`. `BookApi` har allerede `PutBook` fra modul 19."
        ] }
    ] }
  ]
});
})();
