// Modul 30 — Eksamensprojekt: SkadeApp trin for trin. Forudsætter: modul 0–3 (variabler, valg, løkker, metoder).
// Alt, der ellers kommer i modul 4–23, forklares her i det omfang, projektet bruger det.
// Projektet er bygget og afprøvet i en rigtig .NET 10-app (dotnet new blazor --interactivity Server --all-interactive --no-https,
// EF Core Sqlite 10.0.12) og klikket igennem i Chrome uden vindue (29 kontroller). Facit: Desktop\c#\C#  Ekasmen\Facit\SkadeApp.
// Del 1 af 3: modulet og lektion 1–4. Del 2 og 3 ligger i 30-skadeapp-2.js og 30-skadeapp-3.js.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m30", nr: -1, del: "Eksamensprojekt", ikon: "🛡️",
  titel: "Eksamensprojekt: SkadeApp trin for trin",
  dag: "Aflevering fredag 30/10 kl. 12 · Mundtlig eksamen 6/11",
  intro: "I dette modul bygger du dit eksamensprojekt, **SkadeApp**, fra en tom mappe til en færdig app. Det er et lille system til et forsikringsselskab: kunder, deres skadesanmeldelser og et overblik over, hvad der er udbetalt. Kun medarbejdere, der er logget ind, kan bruge det.\n\nHver lektion forklarer de ting, du skal bruge, og slutter med, at du bygger den næste del i dit eget projekt. Du behøver ikke have lavet modul 4–29 først: det, projektet bruger fra dem, bliver forklaret her.\n\nKommer du i tidsnød, ligger et færdigt og afprøvet projekt i mappen `Desktop\\c#\\C#  Ekasmen\\Facit\\SkadeApp`. Brug det til at sammenligne med, når noget driller.",
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m30l0", nr: 0, titel: "Det store overblik: hvad er alle ordene?", min: 20,
    ord: [
      ["Browser", "Programmet, man ser hjemmesider i: Chrome, Edge eller Safari."],
      ["Server", "En computer, der kører et program og venter på, at browsere beder om noget. Mens du udvikler, er serveren din egen computer."],
      ["HTTP", "Sproget, browser og server taler sammen med. Browseren sender en forespørgsel (request), serveren sender et svar (response)."],
      ["URL", "En adresse, fx `http://localhost:5103/kunder`. `localhost` er din egen computer, `5103` er porten, og `/kunder` er siden."],
      ["HTML", "Sproget for indholdet på en side: overskrifter, tekst, tabeller, knapper og felter."],
      ["CSS", "Sproget for udseendet: farver, størrelser og placering."],
      ["JavaScript", "Programmeringssproget, der kører inde i browseren. Med Blazor skriver du C# i stedet."],
      ["Framework", "Et færdigt skelet, man bygger sit program ind i. Det bestemmer opbygningen og kalder din kode på de rigtige tidspunkter."],
      ["ASP.NET Core", "Microsofts framework til web-apps i C#: webserveren, adresserne, login og meget mere."],
      ["Blazor", "Den del af ASP.NET Core, hvor sider laves som komponenter med HTML og C# i samme fil."],
      ["MVC", "En anden måde at lave web-apps på i ASP.NET Core: Model, View og Controller i hver sin fil. Skabelon 4 i projektkravene."],
      ["API", "De metoder, én del af et program stiller til rådighed for andre dele. Et Web API gør det samme over internettet og sender data i stedet for sider."],
      ["Full stack", "En app med alle tre dele: det, brugeren ser (frontend), logikken bagved (backend) og databasen."]
    ],
    trin: [
      { t: "laes", h: "Fra konsolprogram til web-app",
        md: "Indtil nu har du lavet **konsolprogrammer**: de kører på din egen computer og skriver i et sort vindue.\n\nEn **web-app** er delt i to:\n\n- **Serveren** er en computer, der kører dit C#-program og venter på besøg.\n- **Browseren** (Chrome, Edge, Safari) er det, brugeren ser siden i.\n\nBrowseren beder om en side, og serveren svarer. Det kaldes en *request* og et *response*, og de sendes med **HTTP**. Mens du udvikler, er serveren din egen computer. Derfor hedder adressen `http://localhost:5103`: `localhost` betyder \"denne computer\".",
        kode: R`Browser                          Server (dit C#-program)
"Giv mig /kunder"      ───────▶   finder kunderne
                       ◀───────   sender siden med kunderne
viser siden`,
        sprog: "text" },
      { t: "valg", q: "En sagsbehandler åbner SkadeApp i Chrome og klikker på Kunder. Hvor kører C#-koden, der henter kunderne?",
        svar: ["På serveren. Browseren beder om siden, og serveren sender den tilbage", "I Chrome", "I sagsbehandlerens Word", "Ingen steder, siden er fast"],
        ret: 0, fordi: "Browseren viser kun siden. C#-koden kører på serveren, som mens du udvikler er din egen computer." },
      { t: "laes", h: "Det, browseren forstår: HTML og CSS",
        md: "En browser forstår ikke C#. Den forstår tre sprog:\n\n- **HTML**: indholdet. Overskrifter, tekst, tabeller, knapper og felter.\n- **CSS**: udseendet. Farver, skrift og placering.\n- **JavaScript**: små programmer, der kører i browseren.\n\n**Bootstrap** er en færdig samling CSS, som følger med din projektskabelon. Den giver pæne knapper og tabeller, uden at du skriver CSS selv.\n\nDu kommer til at skrive HTML og lidt CSS. JavaScript skal du ikke skrive: det klarer Blazor for dig. HTML får sin egen lektion, før du laver den første side." },
      { t: "valg", q: "Knapperne i din app skal være grønne i stedet for blå. Hvilket sprog bestemmer det?",
        svar: ["CSS", "HTML", "C#", "SQL"],
        ret: 0, fordi: "CSS bestemmer udseendet. HTML bestemmer, at der er en knap. C# bestemmer, hvad der sker, når man klikker." },
      { t: "laes", h: "C#, .NET og frameworks",
        md: "- **C#** er sproget, du skriver i.\n- **.NET** er Microsofts platform, der kører C#-programmer. Den har tusindvis af færdige klasser, fx `Console` og `List`.\n- En **NuGet-pakke** er et færdigt bibliotek, man henter ind i sit projekt, fx til databaser.\n- Et **framework** er et færdigt skelet, man bygger sit program ind i. Du skriver ikke selv webserveren; frameworket har den. Du skriver dine sider og din logik, og frameworket kalder din kode, når der er brug for den." },
      { t: "laes", h: "ASP.NET Core og Blazor",
        md: "**ASP.NET Core** er Microsofts framework til web-apps i C#. Det står for webserveren, adresserne, login og meget mere.\n\nInde i ASP.NET Core er der flere måder at lave selve siderne på. Projektkravene nævner dem som skabeloner:\n\n- **MVC** (skabelon 4): en *Controller* modtager forespørgslen, henter en *Model* og sender den til et *View*, der laver HTML'en. Tre slags filer.\n- **Blazor** (skabelon 1 og 2): en side er en **komponent**, én `.razor`-fil med HTML og C# sammen. Klikker man på en knap, kører en C#-metode.\n- **Angular** (skabelon 3): et JavaScript-framework til siderne og ASP.NET Core til data bagved.\n\nBlazor findes i to udgaver. I **Blazor Server**, som du bruger, kører C#-koden på serveren, og browseren holder en forbindelse åben. I **Blazor WebAssembly** sendes C#-koden til browseren og kører dér.",
        md2: "Du valgte Blazor Server, fordi alt er C#, en side er én fil, og koden kører ved siden af databasen. Det er din begrundelse, hvis censor spørger." },
      { t: "valg", q: "Hvad er sammenhængen mellem ASP.NET Core og Blazor?",
        svar: ["Blazor er en del af ASP.NET Core: en måde at lave sider på, mens ASP.NET Core står for resten, fx webserveren og login", "De er to konkurrerende sprog", "ASP.NET Core er en del af Blazor", "Blazor er en database"],
        ret: 0, fordi: "ASP.NET Core er hele frameworket til web. Blazor og MVC er to måder at lave sider på inde i det." },
      { t: "valg", q: "Projektkravene giver fire skabeloner. Hvad er den store forskel på MVC og Blazor?",
        svar: ["I MVC er en side delt i controller, model og view. I Blazor er en side én komponent med HTML og C# sammen", "MVC kan ikke bruge en database", "Blazor kan kun bruges på Mac", "Der er ingen forskel"],
        ret: 0, fordi: "Begge bygger på ASP.NET Core og kan bruge samme database og services. Forskellen er, hvordan siderne er bygget op." },
      { t: "laes", h: "API, database og login",
        md: "- **API** betyder de metoder, én del af et program stiller til rådighed for andre dele. Dine services bliver en slags API for dine sider: siderne kalder `HentAlleAsync()` uden at vide, hvordan den virker.\n- Et **Web API** er det samme over internettet: adresser, der sender **data** (ofte som JSON) i stedet for sider, fx til en mobil-app. Det er valgfrit i projektkravene, og din app har ikke et.\n- En **database** gemmer data i tabeller, så de er der endnu, når appen lukkes. **SQL** er sproget til databaser. **SQLite** er en lille database, der ligger i én fil.\n- **EF Core** oversætter mellem dine C#-klasser og databasens tabeller, så du ikke skriver SQL selv.\n- **Identity** er ASP.NET Cores færdige system til brugere og login." },
      { t: "valg", q: "En kollega spørger, hvad et Web API er. Hvilket svar er rigtigt?",
        svar: ["Adresser på en server, der sender data, fx kunder som JSON, i stedet for færdige sider. Det bruges fx af mobil-apps", "En database", "Et program til at tegne sider", "Det samme som HTML"],
        ret: 0, fordi: "Et Web API svarer med data, ikke med en side. Din Blazor-app sender sider, så den har ikke brug for et Web API." },
      { t: "laes", h: "Full stack: dine tre dele",
        md: "Projektkravet er en **Full Stack Web App**: en app med alle tre dele. Sådan ser de ud i SkadeApp:",
        kode: R`Del                       Hvad                                   I SkadeApp
Frontend (det man ser)    HTML og CSS i Blazor-komponenter       mappen Components
Backend (logikken)        C#: services, der henter og gemmer     mappen Services
Database                  tabeller med kunder og skader          SQLite + EF Core (mappen Data)`,
        sprog: "text",
        md2: "Delingen i lag, der hver har ét ansvar, hedder **lagdelt arkitektur**. Du ser den igen i næste lektion og bygger den i lektion 6 og 7." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvilke teknologier bruger din app, og hvad bruges de til?",
        svar: "Appen er bygget med ASP.NET Core, Microsofts framework til web-apps i C#. Siderne er lavet med Blazor Server: hver side er en komponent med HTML og C#, og koden kører på serveren. Udseendet er HTML og CSS med Bootstrap. Data gemmes i en SQLite-database, og EF Core oversætter mellem mine C#-klasser og tabellerne. Login klares af ASP.NET Core Identity. Tilsammen er det en full stack-app: frontend, backend og database.",
        noegle: ["ASP.NET Core", "Blazor Server", "HTML og CSS", "SQLite", "EF Core", "full stack"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m30l1", nr: 1, titel: "Hvad du bygger, og projektet oprettes", min: 20,
    ord: [
      ["Blazor Server", "En måde at lave web-apps på, hvor al C#-koden kører på serveren. Browseren viser siden og sender klik til serveren."],
      ["Komponent", "En del af en side i Blazor, skrevet i en `.razor`-fil med HTML og C# sammen. En hel side er også en komponent."],
      ["Lagdelt arkitektur", "Programmet er delt i lag, der hver har ét ansvar: siderne viser, services bestemmer, og databasen gemmer."],
      ["Model", "En klasse, der beskriver en slags ting i programmet, fx `Kunde` eller `Skade`."],
      ["Service", "En klasse, der udfører arbejdet for siderne, fx at hente eller gemme kunder."]
    ],
    trin: [
      { t: "laes", h: "Hvad SkadeApp kan",
        md: "En sagsbehandler i et forsikringsselskab skal holde styr på kunder og deres skader: hvem har anmeldt hvad, hvor meget koster det, og er skaden godkendt endnu? Det er problemet, din app løser. Det er også begrundelsen i dispositionen: du har selv arbejdet med forsikring i seks år.\n\nAppen har fire sider:\n\n- **Overblik**: antal kunder, antal åbne skader, hvor meget der er udbetalt, og de seneste skader.\n- **Kunder**: en liste, man kan søge i, og en formular til nye kunder.\n- **Kundesiden**: én kundes oplysninger og skader. Her kan man rette og slette kunden, anmelde en ny skade og skifte en skades status.\n- **Skader**: alle skader, som kan filtreres efter status og sorteres.\n\nData gemmes i en database, så de er der endnu, når appen startes igen. Man skal logge ind for at se siderne, fordi kundernes oplysninger er personlige.",
        md2: "Projektet bruger skabelon 2 fra projektkravene: **Blazor Server**. Det betyder, at al din C#-kode kører **på serveren**, ikke i browseren. Browseren viser siden og holder en forbindelse åben til serveren. Klikker brugeren på en knap, sender browseren klikket til serveren, C#-koden kører dér, og serveren sender ændringerne på siden tilbage." },
      { t: "laes", h: "Tre lag med hver sit ansvar",
        md: "Koden er delt i tre lag. Hvert lag har sin egen mappe og ét ansvar.",
        kode: R`Components/Pages   Siderne       viser data og tager imod klik
Services           Services      henter, gemmer og ændrer data
Models + Data      Modeller og   beskriver kunder og skader,
                   database      og gemmer dem i SQLite`,
        sprog: "text",
        noter: [
          ["Siderne", "Ved ikke, hvordan data gemmes. De beder bare en service om det."],
          ["Services", "Det eneste lag, der taler med databasen."],
          ["Models", "Klasserne `Kunde` og `Skade`. Alle lag bruger dem."]
        ],
        md2: "Det kaldes **lagdelt arkitektur**. Fordelen: skifter du databasen ud, skal du kun ændre i servicen, ikke i siderne. Det er et af læringsmålene, censor kigger efter." },
      { t: "valg", q: "I SkadeApp skal en ny kunde gemmes i databasen. I hvilket lag står den kode, der gemmer?",
        svar: ["I servicen (mappen Services)", "På siden Kunder.razor", "I klassen Kunde", "I NavMenu.razor"],
        ret: 0, fordi: "Siden beder servicen om at gemme kunden, og servicen taler med databasen. Klassen `Kunde` beskriver kun, hvad en kunde er." },
      { t: "valg", q: "Hvor kører din C#-kode i en Blazor Server-app, når brugeren klikker på en knap?",
        svar: ["På serveren. Browseren sender klikket dertil og får ændringerne tilbage", "I browseren", "I databasen", "På brugerens telefon"],
        ret: 0, fordi: "I Blazor Server kører al C# på serveren. Browseren viser siden og holder en forbindelse åben, så klik kan sendes af sted." },
      { t: "ide", h: "Opret projektet",
        md: "Lav projektet nu, og kør det, før du ændrer noget. Så ved du, at alt virker fra starten.\n\nProjektet laves **med login** (*Individual Accounts*). Så laver skabelonen selv siderne til at logge ind, oprette en bruger og logge ud. Dem skal du ikke skrive. Du slår login til for dine egne sider i lektion 13.",
        win: ["Åbn Visual Studio, og klik **Create a new project**.", "Skriv `blazor` i søgefeltet, vælg **Blazor Web App**, og klik **Next**.", "Project name: `SkadeApp`. Klik **Next**.", "Framework: **.NET 10.0**. Authentication type: **Individual Accounts**. Fjern fluebenet ved **Configure for HTTPS**.", "**Interactive render mode: Server**. **Interactivity location: Global**. Lad **Include sample pages** have flueben. Sæt **ikke** flueben i **Do not use top-level statements**: så ligner din `Program.cs` koden i lektionerne. Klik **Create**.", "Kør med den grønne pil ▶. Browseren åbner, og du ser **Hello, world!**. Klik på **Counter** i menuen, og klik på knappen et par gange. Menuen har også **Register** og **Login**: det er login-siderne fra skabelonen."],
        mac: ["Åbn en terminal i den mappe, hvor dine projekter skal ligge.", "Skriv `dotnet new blazor -n SkadeApp --auth Individual --interactivity Server --all-interactive --no-https`, og tryk Enter.", "Åbn mappen `SkadeApp` i Rider (**File → Open…**).", "Kør med den grønne pil ▶. Browseren åbner, og du ser **Hello, world!**. Klik på **Counter** i menuen, og klik på knappen et par gange. Menuen har også **Register** og **Login**: det er login-siderne fra skabelonen."],
        md2: "Uden HTTPS slipper du for spørgsmål om certifikater, når appen starter. Det er fint til et projekt, der kun kører på din egen computer." },
      { t: "laes", h: "Filerne i projektet",
        md: "Skabelonen har lavet en række filer. Dem her skal du kende:",
        kode: R`SkadeApp
├── Program.cs                 starter appen og registrerer services
├── appsettings.json           indstillinger, fx hvor databasen ligger
├── Components
│   ├── App.razor              selve HTML-siden rundt om det hele
│   ├── Routes.razor           finder den side, der passer til adressen
│   ├── _Imports.razor         using-linjer, der gælder for alle .razor-filer
│   ├── Account                login-siderne fra skabelonen (dem rører du ikke)
│   ├── Layout
│   │   ├── MainLayout.razor   menuen til venstre og indholdet til højre
│   │   └── NavMenu.razor      linkene i menuen
│   └── Pages
│       ├── Home.razor         forsiden ( / )
│       ├── Counter.razor      eksempel, som du sletter
│       ├── Weather.razor      eksempel, som du sletter
│       └── Auth.razor         eksempel, som du sletter
├── Data                       databasen med brugerne (lavet af skabelonen)
│   ├── ApplicationDbContext.cs
│   ├── ApplicationUser.cs
│   └── Migrations
└── wwwroot                    CSS og billeder (Bootstrap ligger her)`,
        sprog: "text",
        noter: [
          ["Program.cs", "Kører først af alt, når appen starter."],
          [".razor", "En komponent: HTML og C# i samme fil."],
          ["Pages", "Her ligger siderne. En side har en `@page`-linje med sin adresse."],
          ["Account og Data", "Login og brugere. Skabelonen har lavet det hele. Du ser nærmere på det i lektion 13."]
        ],
        md2: "Tre ting fra tegningen, som du får brug for med det samme:\n\n- `Program.cs` kører **først**, når appen starter.\n- En ny **side** lægges i mappen `Components/Pages`. Linjen `@page \"/adresse\"` øverst i filen giver siden dens adresse.\n- `Layout` er det, der står **rundt om** alle sider: menuen til venstre og rammen om indholdet." },
      { t: "valg", q: "Hvilken fil kører først, når du starter SkadeApp?",
        svar: ["Program.cs", "Home.razor", "App.razor", "NavMenu.razor"],
        ret: 0, fordi: "`Program.cs` bygger appen: den registrerer services og starter webserveren. Først derefter kan en side blive vist." },
      { t: "valg", q: "Du skal lave en ny side med adressen `/skader`. Hvor skal filen ligge?",
        svar: ["I mappen Components/Pages", "I mappen wwwroot", "Ved siden af Program.cs", "I mappen Components/Layout"],
        ret: 0, fordi: "Siderne ligger i `Components/Pages`. Det er `@page \"/skader\"` øverst i filen, der giver siden dens adresse. `Layout` er til det, der står rundt om alle sider." },
      { t: "ide", h: "Ryd op: slet eksempelsiderne",
        md: "Eksempelsiderne fra skabelonen skal ikke med i dit projekt.",
        win: ["Højreklik på `Counter.razor` i mappen `Components/Pages` i Solution Explorer → **Delete**.", "Gør det samme med `Weather.razor` og `Auth.razor`.", "Kør appen. Menuen har stadig links til Counter og Weather, men de fører nu til en side om, at adressen ikke findes. Menuen retter du i lektionen om HTML, når du ved, hvad den er lavet af."],
        mac: ["Højreklik på `Counter.razor` i mappen `Components/Pages` i Rider → **Delete**.", "Gør det samme med `Weather.razor` og `Auth.razor`.", "Kør appen. Menuen har stadig links til Counter og Weather, men de fører nu til en side om, at adressen ikke findes. Menuen retter du i lektionen om HTML, når du ved, hvad den er lavet af."] }

    ] },

  // ------------------------------------------------------------------
  { id: "m30l2", nr: 2, titel: "Klasser og objekter: Kunde", min: 20,
    ord: [
      ["Klasse", "En skabelon, der beskriver en slags ting: hvilke oplysninger den har. `class Kunde { … }`."],
      ["Objekt", "Én konkret ting lavet ud fra en klasse, fx kunden Mette. Laves med `new`."],
      ["Property", "En oplysning i en klasse med `{ get; set; }`, fx `Navn`. Den kan læses (get) og ændres (set)."],
      ["new", "Laver et nyt objekt ud fra en klasse: `new Kunde()`."],
      ["Objekt-initialisering", "At give et nyt objekt værdier med det samme: `new Kunde { Navn = \"Mette\" }`."],
      ["Namespace", "Et efternavn til klasserne, der svarer til mappen, fx `SkadeApp.Models`. Andre filer skriver `using SkadeApp.Models;` for at bruge dem."]
    ],
    trin: [
      { t: "laes", h: "Det kender du: variabler",
        md: "Fra modul 0–3 kender du variabler: én variabel til hver oplysning. Sådan ser to kunder ud med det, du kan nu:",
        kode: R`string navn1 = "Mette Jensen";
string telefon1 = "22334455";
string navn2 = "Ali Hassan";
string telefon2 = "33445566";

Console.WriteLine(navn1 + " " + telefon1);
Console.WriteLine(navn2 + " " + telefon2);`,
        output: "Mette Jensen 22334455\nAli Hassan 33445566",
        md2: "Det virker med to kunder. Men der er to problemer:\n\n- SkadeApp har mange kunder, og hver kunde har fire oplysninger (id, navn, e-mail, telefon). 100 kunder ville kræve 400 variabler.\n- Intet i koden siger, at `navn1` og `telefon1` hører til den samme kunde. Det er kun tallet i navnene, der viser det.\n\nLøsningen hedder en **klasse**. Den kommer i næste trin." },
      { t: "laes", h: "En klasse beskriver, hvad én kunde har",
        md: "En **klasse** samler de oplysninger, der hører sammen. Klassen `Kunde` siger: en kunde har et navn og et telefonnummer. Klassen laver ikke selv nogen kunder. Den er som et tomt skema: felterne står der, men der er ikke skrevet noget i dem.",
        kode: R`class Kunde
{
    public string Navn { get; set; } = "";
    public string Telefon { get; set; } = "";
}`,
        frag: true,
        noter: [
          ["class Kunde", "Her starter klassen, og den hedder `Kunde`. Alt mellem `{` og `}` hører til klassen, på samme måde som koden i en metode står mellem `{` og `}`."],
          ["string Navn … = \"\"", "Det kender du fra en variabel: typen `string`, et navn og en startværdi. `\"\"` er en tom tekst."],
          ["public", "Nyt. Koden uden for klassen må bruge oplysningen. Uden `public` kan kun koden inde i klassen bruge den."],
          ["{ get; set; }", "Nyt. Oplysningen kan læses (get) og ændres (set). Skriv det altid sådan: det er et fast mønster."],
          ["Stort N i Navn", "Navne inde i en klasse starter med stort bogstav. Variabler starter med lille."]
        ],
        md2: "En oplysning i en klasse, skrevet på den måde, hedder en **property**. Sammenlign de to linjer:\n\n- Variabel: `string navn = \"\";`\n- Property: `public string Navn { get; set; } = \"\";`\n\nForskellen er `public` foran, `{ get; set; }` efter navnet og det store forbogstav." },
      { t: "laes", h: "new laver en kunde ud fra klassen",
        md: "For at få en rigtig kunde skriver du `new Kunde()`. Det laver et **objekt**: én konkret kunde med sine egne felter, som du kan skrive i. Laver du `new Kunde()` to gange, får du to kunder, der hver har deres eget navn.",
        kode: R`Kunde k1 = new Kunde();
k1.Navn = "Mette Jensen";
k1.Telefon = "22334455";

Kunde k2 = new Kunde();
k2.Navn = "Ali Hassan";

Console.WriteLine(k1.Navn);
Console.WriteLine(k2.Navn);

class Kunde
{
    public string Navn { get; set; } = "";
    public string Telefon { get; set; } = "";
}`,
        noter: [
          ["Kunde k1 = new Kunde();", "Samme form som `int tal = 5;`: først typen (`Kunde`), så variablens navn (`k1`), og efter `=` værdien. Værdien er en ny kunde."],
          ["k1.Navn = \"Mette Jensen\";", "Punktummet betyder: feltet `Navn` i netop kunden `k1`. Her skrives der i feltet."],
          ["Console.WriteLine(k1.Navn);", "Her læses feltet `Navn` i `k1`."],
          ["class Kunde", "Klassen står nederst. Når koden ikke står i en metode, kræver C#, at klasserne kommer efter de linjer, der kører."]
        ],
        output: "Mette Jensen\nAli Hassan",
        md2: "Nu hører navn og telefon sammen: begge er inde i `k1`. Ordene du skal kunne til eksamen: **klassen** er beskrivelsen (`class Kunde`). Et **objekt** er én konkret kunde, lavet med `new`." },
      { t: "valg", q: "Hvad betyder `k2.Navn` i koden fra forrige trin?",
        svar: ["Feltet Navn i kunden k2", "En ny kunde, der hedder k2", "Navnet på klassen", "Alle kunders navne"],
        ret: 0, fordi: "Punktummet betyder: feltet efter punktummet, i objektet før punktummet. `k2.Navn` er derfor Ali Hassan." },
      { t: "forudsig",
        q: "To objekter af samme klasse har hver deres værdier. Hvad skriver programmet?",
        kode: R`Kunde a = new Kunde();
a.Navn = "Søren";
Kunde b = new Kunde();
b.Navn = "Camilla";
a.Navn = "Søren Nielsen";

Console.WriteLine(a.Navn);
Console.WriteLine(b.Navn);

class Kunde
{
    public string Navn { get; set; } = "";
}`,
        output: "Søren Nielsen\nCamilla",
        fordi: "`a` og `b` er to objekter. At ændre `a.Navn` rører ikke `b`." },
      { t: "laes", h: "Giv værdierne med det samme",
        md: "I stedet for at sætte én property ad gangen kan du give værdierne, når objektet laves. Det hedder **objekt-initialisering** og bruges overalt i dit projekt, fx til startdata i databasen.",
        kode: R`Kunde k = new Kunde { Id = 1, Navn = "Mette Jensen", Telefon = "22334455" };
Console.WriteLine(k.Id + ": " + k.Navn);

class Kunde
{
    public int Id { get; set; }
    public string Navn { get; set; } = "";
    public string Telefon { get; set; } = "";
}`,
        noter: [
          ["{ Id = 1, Navn = … }", "Krøllede parenteser efter `new Kunde`, og et komma mellem hver property."],
          ["Id", "Et `int` starter som 0. I databasen får hver kunde sit eget nummer, så man kan finde netop den kunde igen."]
        ],
        output: "1: Mette Jensen" },
      { t: "udfyld", q: "Udfyld, så programmet laver en kunde, der hedder Ali, og skriver navnet ud.",
        kode: R`Kunde k = [[new]] Kunde { Navn = "Ali" };
Console.WriteLine(k.[[Navn]]);

class Kunde
{
    public string Navn { [[get]]; set; } = "";
}`,
        output: "Ali",
        fordi: "`new` laver objektet, `k.Navn` læser propertyen, og `get` gør, at den kan læses." },
      { t: "laes", h: "To variabler kan pege på det samme objekt",
        md: "Det her skal du vide til kundesiden senere. En variabel med et objekt indeholder ikke selve kunden, men en **henvisning** til den. Skriver du `Kunde b = a;`, får du ikke en ny kunde: `a` og `b` henviser til den **samme**.",
        kode: R`Kunde a = new Kunde { Navn = "Mette" };
Kunde b = a;
b.Navn = "Camilla";
Console.WriteLine(a.Navn);

class Kunde
{
    public string Navn { get; set; } = "";
}`,
        output: "Camilla",
        md2: "Vil du have en rigtig kopi, skal du lave et nyt objekt med `new` og flytte værdierne over. Det gør kundesiden, når man retter en kunde: man retter i en kopi, så **Annullér** ikke har ændret noget." },
      { t: "forudsig",
        q: "Hvad skriver programmet? Læg mærke til, hvor der står `new`.",
        kode: R`Kunde a = new Kunde { Navn = "Ali" };
Kunde b = a;
Kunde c = new Kunde { Navn = a.Navn };
b.Navn = "Ali Hassan";
c.Navn = "Søren";

Console.WriteLine(a.Navn);
Console.WriteLine(c.Navn);

class Kunde
{
    public string Navn { get; set; } = "";
}`,
        output: "Ali Hassan\nSøren",
        fordi: "`b` henviser til samme objekt som `a`, så `b.Navn = …` ændrer også `a`. `c` er et nyt objekt (der står `new`), så det er en kopi: at ændre `c` rører ikke `a`." },
      { t: "skriv", q: "Skriv klassen `Kunde` med fire properties: `Id` (int), `Navn`, `Email` og `Telefon` (alle tre `string` med startværdien `\"\"`). Alle skal være `public` med `{ get; set; }`.",
        foer: R`Kunde k = new Kunde
{
    Id = 1, Navn = "Mette",
    Email = "mette@eksempel.dk", Telefon = "22334455"
};
Console.WriteLine(k.Navn + " " + k.Email + " " + k.Telefon);
`,
        tjek: [
          [/class Kunde\{/, "Lav en klasse, der hedder `Kunde`"],
          [/public int Id\{get;set;\}/, "Property `Id` af typen `int`"],
          [/public string Navn\{get;set;\}=""/, "Property `Navn` (string) med startværdien `\"\"`"],
          [/public string Email\{get;set;\}=""/, "Property `Email` (string) med startværdien `\"\"`"],
          [/public string Telefon\{get;set;\}=""/, "Property `Telefon` (string) med startværdien `\"\"`"]
        ],
        loesning: R`class Kunde
{
    public int Id { get; set; }
    public string Navn { get; set; } = "";
    public string Email { get; set; } = "";
    public string Telefon { get; set; } = "";
}`,
        output: "Mette mette@eksempel.dk 22334455" },
      { t: "laes", h: "En fil pr. klasse og et namespace",
        md: "I et rigtigt projekt får hver klasse sin egen fil, og filerne samles i mapper. Modellerne kommer i mappen `Models`.\n\nØverst i filen står et **namespace**. Det svarer til mappen: `SkadeApp.Models`. Andre filer, der vil bruge `Kunde`, skal have linjen `using SkadeApp.Models;` øverst. Ellers kan de ikke finde klassen.",
        kode: R`namespace SkadeApp.Models;

public class Kunde
{
    public int Id { get; set; }
    public string Navn { get; set; } = "";
    public string Email { get; set; } = "";
    public string Telefon { get; set; } = "";
}`,
        frag: true,
        noter: [
          ["namespace SkadeApp.Models;", "Klassen hører til `SkadeApp.Models`. Semikolonet betyder: det gælder hele filen."],
          ["public class", "Klassen må bruges af alle andre filer i projektet."]
        ] },
      { t: "opgave", h: "Lav Kunde.cs i dit projekt", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "csharp",
        md: "Nu får dit projekt sin første model. Du skrev klassen i trin 10. Nu skal den i sin egen fil med et namespace, som i trin 11.\n\n{{Højreklik på projektet **SkadeApp** i Solution Explorer → **Add → New Folder** → `Models`. Højreklik på `Models` → **Add → Class…** → `Kunde.cs` → **Add**.||Højreklik på projektet **SkadeApp** i Rider → **Add → Directory** → `Models`. Højreklik på `Models` → **Add → Class/Interface** → `Kunde`.}} Slet det, der står i filen, og skriv selv.",
        krav: [
          "Filen `Models/Kunde.cs` findes",
          "Øverst står `namespace SkadeApp.Models;`",
          "`public class Kunde` med fire properties: `Id` (`int`), `Navn`, `Email` og `Telefon` (alle tre `string` med startværdien `\"\"`)",
          "Projektet kan bygges uden fejl (**Build → Build Solution**), og der står ingen fejl i Error List eller Problems"
        ],
        tip: [
          "Rækkefølgen i filen: først `namespace SkadeApp.Models;`, så klassen.",
          "En property skrives `public type Navn { get; set; }`. Tekster får ` = \"\";` til sidst.",
          "To af linjerne: `public int Id { get; set; }` og `public string Email { get; set; } = \"\";`"
        ],
        output: "Ingen ændring i appen endnu. Klassen bliver brugt, når databasen og siderne kommer til.",
        loesning: R`namespace SkadeApp.Models;

public class Kunde
{
    public int Id { get; set; }
    public string Navn { get; set; } = "";
    public string Email { get; set; } = "";
    public string Telefon { get; set; } = "";
}` },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er forskellen på en klasse og et objekt? Brug dit eget projekt som eksempel.",
        svar: "En klasse er en skabelon, der beskriver, hvilke oplysninger en slags ting har. Klassen Kunde siger, at en kunde har Id, Navn, Email og Telefon. Et objekt er én konkret kunde, lavet med new, fx Mette Jensen med sit eget telefonnummer. Der er én klasse, men mange objekter.",
        noegle: ["skabelon", "new", "konkret", "properties", "mange objekter"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m30l3", nr: 3, titel: "Skade, enum og relationen", min: 22,
    ord: [
      ["enum", "En type med en fast liste af værdier, fx `enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`."],
      ["decimal", "Taltype til penge. Regner præcist med kroner og øre."],
      ["List<T>", "En liste, der kan vokse. `List<Skade>` er en liste af skader. `Add` lægger til, `Count` er antallet."],
      ["Relation", "En sammenhæng mellem to tabeller. Her: én kunde har mange skader (en-til-mange)."],
      ["Fremmednøgle", "En kolonne, der indeholder id'et på en række i en anden tabel. `KundeId` i Skader peger på en kunde."],
      ["Navigation property", "En property, der giver adgang til det, en relation peger på: `kunde.Skader` eller `skade.Kunde`."],
      ["null", "Ingenting. `Kunde?` med spørgsmålstegn betyder, at værdien må være `null`."]
    ],
    trin: [
      { t: "laes", h: "enum: en fast liste af muligheder",
        md: "En skade har en status: anmeldt, under behandling, godkendt eller afvist. Du kunne gemme den som tekst, men så kunne man skrive `\"godkent\"` med en stavefejl, og ingen ville opdage det. En **enum** er en type med en fast liste af værdier. Compileren nægter alt andet.",
        kode: R`SkadeStatus status = SkadeStatus.Anmeldt;
Console.WriteLine(status);

status = SkadeStatus.Godkendt;
Console.WriteLine(status);

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`,
        noter: [
          ["enum SkadeStatus { … }", "De fire mulige værdier. Står nederst ligesom en klasse."],
          ["SkadeStatus.Anmeldt", "En værdi skrives med typens navn, punktum og værdien."],
          ["Console.WriteLine(status)", "Skriver værdiens navn som tekst."]
        ],
        output: "Anmeldt\nGodkendt" },
      { t: "forudsig",
        kode: R`SkadeStatus s = SkadeStatus.Behandles;
Console.WriteLine(s == SkadeStatus.Behandles);
s = SkadeStatus.Afvist;
Console.WriteLine(s);
Console.WriteLine(s == SkadeStatus.Godkendt);

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`,
        output: "True\nAfvist\nFalse",
        fordi: "`==` sammenligner og giver `True` eller `False`. Efter `s = SkadeStatus.Afvist;` er status `Afvist`, og den er ikke `Godkendt`." },
      { t: "laes", h: "decimal til penge",
        md: "Til penge bruger man typen **decimal**. `double` gemmer tal på en måde, hvor nogle kommatal ikke kan gemmes helt præcist. Det giver små afrundingsfejl, som ikke må ske med kroner og øre. Et `m` efter tallet betyder, at det er en `decimal`.",
        kode: R`double d = 0.1 + 0.2;
decimal m = 0.1m + 0.2m;
Console.WriteLine(d);
Console.WriteLine(m);`,
        output: "0,30000000000000004\n0,3",
        md2: "Bemærk kommaet i udskriften: på en dansk computer skriver C# `0,3`, men i koden skriver du altid punktum." },
      { t: "valg", q: "En skade har et beløb, fx 4.500,50 kr. Hvilken type skal propertyen `Beloeb` have?",
        svar: ["decimal", "int", "double", "string"],
        ret: 0, fordi: "`decimal` regner præcist med kommatal og er beregnet til penge. `int` kan ikke have øre, `double` kan give små afrundingsfejl, og med `string` kan man ikke regne." },
      { t: "laes", h: "List: en liste, der kan vokse",
        md: "Et array har en fast længde. En **List** kan vokse: du lægger ting til med `Add`, og `Count` fortæller, hvor mange der er. I vinkelparenteserne står, hvad listen indeholder: `List<string>` er en liste af tekster.",
        kode: R`List<string> skader = new List<string>();
skader.Add("Ridse i døren");
skader.Add("Vandskade");
Console.WriteLine(skader.Count);

foreach (string s in skader)
{
    Console.WriteLine("- " + s);
}`,
        noter: [
          ["new List<string>()", "En ny, tom liste."],
          ["Add", "Lægger et element til sidst i listen."],
          ["Count", "Antallet af elementer. Uden parenteser."],
          ["foreach", "Gentager én gang for hvert element i listen."]
        ],
        output: "2\n- Ridse i døren\n- Vandskade" },
      { t: "forudsig",
        kode: R`List<decimal> beloeb = new List<decimal>();
beloeb.Add(4500m);
beloeb.Add(2400m);
beloeb.Add(3200m);

decimal sum = 0;
foreach (decimal b in beloeb)
{
    sum = sum + b;
}
Console.WriteLine(beloeb.Count);
Console.WriteLine(sum);`,
        output: "3\n10100",
        fordi: "Der er lagt tre beløb i listen. Løkken lægger dem sammen: 4500 + 2400 + 3200 = 10100." },
      { t: "laes", h: "Relationen: én kunde, mange skader",
        md: "En skade hører til én kunde, og en kunde kan have mange skader. Det er en **en-til-mange-relation**. Den skrives sådan i de to klasser:\n\n- `Kunde` får en liste: `List<Skade> Skader`.\n- `Skade` får `KundeId` (nummeret på kunden) og `Kunde` (selve kunde-objektet).\n\nI databasen bliver det til to tabeller. Tabellen `Skader` har en kolonne `KundeId`, der indeholder kundens `Id`. Den kolonne kaldes en **fremmednøgle**.",
        kode: R`Kunder                        Skader
Id  Navn                      Id  Beskrivelse             KundeId
1   Mette Jensen              1   Ridse i døren           1
2   Ali Hassan                2   Vandskade               1
                              3   Kuffert forsvundet      2`,
        sprog: "text",
        md2: "Mette har to skader, fordi to rækker i `Skader` har `KundeId` 1. `Skader` i Kunde og `Kunde` i Skade gemmes ikke som kolonner. De kaldes **navigation properties**: de giver nem adgang til det, relationen peger på." },
      { t: "valg", q: "Hvor står det i databasen, at skaden \"Kuffert forsvundet\" hører til Ali Hassan?",
        svar: ["I kolonnen KundeId i tabellen Skader, som indeholder Alis Id", "I en kolonne i tabellen Kunder med alle hans skader", "I klassen Kunde", "Det står ingen steder"],
        ret: 0, fordi: "Relationen gemmes i fremmednøglen `KundeId` på skaden. Kundens liste `Skader` findes kun i C#: EF Core fylder den ud fra `KundeId`." },
      { t: "udfyld", q: "Udfyld, så en kunde kan have en liste af skader, og en skade ved, hvilken kunde den hører til.",
        kode: R`Kunde k = new Kunde { Id = 1, Navn = "Mette" };
k.Skader.Add(new Skade { Id = 1, Beskrivelse = "Ridse i døren", KundeId = 1 });
k.Skader.Add(new Skade { Id = 2, Beskrivelse = "Vandskade", KundeId = 1 });
Console.WriteLine(k.Navn + " har " + k.Skader.Count + " skader");

class Kunde
{
    public int Id { get; set; }
    public string Navn { get; set; } = "";
    public [[List<Skade>]] Skader { get; set; } = new();
}

class Skade
{
    public int Id { get; set; }
    public string Beskrivelse { get; set; } = "";
    public int [[KundeId]] { get; set; }
    public Kunde? Kunde { get; set; }
}`,
        output: "Mette har 2 skader",
        fordi: "Kunden har en `List<Skade>`, og skaden har fremmednøglen `KundeId`. `= new();` laver en tom liste, så `Add` virker med det samme." },
      { t: "opgave", h: "Lav Skade.cs, og giv Kunde sine skader", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "csharp",
        md: "Nu laver du den anden model og relationen. Lav filen `Models/Skade.cs` på samme måde som `Kunde.cs`, og skriv den selv ud fra kravene.\n\nTo nye ting: `DateTime` er typen til en dato, og `DateTime.Today` er dagens dato. `Kunde?` med spørgsmålstegn betyder, at kunden må være `null`: når en skade hentes uden sin kunde, er der ingen kunde at vise.",
        krav: [
          "`Models/Skade.cs` har `namespace SkadeApp.Models;` og `public class Skade`",
          "Skade har `Id` (`int`), `Dato` (`DateTime`, startværdi `DateTime.Today`), `Type` (`SkadeType`, startværdi `SkadeType.Indbo`) og `Beskrivelse` (`string`, startværdi `\"\"`)",
          "Skade har også `Beloeb` (`decimal`), `Status` (`SkadeStatus`, startværdi `SkadeStatus.Anmeldt`), `KundeId` (`int`) og `Kunde` (`Kunde?`)",
          "Under klassen står to enums: `SkadeType` med `Bil, Indbo, Rejse, Ulykke` og `SkadeStatus` med `Anmeldt, Behandles, Godkendt, Afvist`",
          "`Kunde.cs` har fået en property `Skader`: en `List<Skade>`, der starter som en tom liste",
          "Projektet kan bygges uden fejl"
        ],
        tip: [
          "En startværdi står efter `{ get; set; }` med `=`, fx `public SkadeType Type { get; set; } = SkadeType.Indbo;`",
          "Enums står efter klassens sidste `}`, og de skal være `public`: `public enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`",
          "Listen i Kunde skrives som i trin 9: `public List<Skade> Skader { get; set; } = new();`"
        ],
        output: "Ingen ændring i appen endnu. Error List / Problems er tom.",
        loesning: R`namespace SkadeApp.Models;

// En skadesanmeldelse. Hver skade hører til præcis én kunde.
public class Skade
{
    public int Id { get; set; }

    public DateTime Dato { get; set; } = DateTime.Today;

    public SkadeType Type { get; set; } = SkadeType.Indbo;

    public string Beskrivelse { get; set; } = "";

    // decimal til penge: den regner præcist med kroner og øre.
    public decimal Beloeb { get; set; }

    public SkadeStatus Status { get; set; } = SkadeStatus.Anmeldt;

    // Fremmednøgle: id'et på den kunde, skaden hører til.
    public int KundeId { get; set; }

    // Navigation property: selve kunde-objektet.
    public Kunde? Kunde { get; set; }
}

public enum SkadeType { Bil, Indbo, Rejse, Ulykke }

public enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }

// ===== I Kunde.cs, under Telefon =====
public List<Skade> Skader { get; set; } = new();`,
        md2: "Linjer, der starter med `//`, er kommentarer: de er til dig og bliver ikke kørt. Skriv gerne dine egne, med dine egne ord." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvordan hænger dine to modeller sammen, og hvordan er det gemt i databasen?",
        svar: "Det er en en-til-mange-relation: én kunde kan have mange skader, og hver skade hører til én kunde. I C# har Kunde en List<Skade> Skader, og Skade har KundeId og Kunde. I databasen er der to tabeller, og relationen gemmes i fremmednøglen KundeId i tabellen Skader, som indeholder kundens Id.",
        noegle: ["en-til-mange", "List<Skade>", "KundeId", "fremmednøgle", "to tabeller"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m30l4", nr: 4, titel: "Beregnede properties og LINQ", min: 22,
    ord: [
      ["Beregnet property", "En property uden `set`, som regnes ud, hver gang den læses: `public bool ErAaben => …;`. Den gemmes ikke i databasen."],
      ["Lambda", "En lille funktion skrevet kort: `s => s.Beloeb` betyder: tag en skade `s`, og giv dens beløb."],
      ["LINQ", "Metoder til at søge, filtrere, sortere og regne på lister: `Where`, `Count`, `Sum`, `OrderBy`, `GroupBy`."],
      ["Where", "Beholder kun de elementer, der opfylder en betingelse."],
      ["Sum", "Lægger værdierne sammen."],
      ["OrderBy", "Sorterer stigende. `OrderByDescending` sorterer faldende."],
      ["GroupBy", "Samler elementerne i grupper efter en værdi, fx én gruppe pr. status. `Key` er gruppens værdi."]
    ],
    trin: [
      { t: "laes", h: "En property, der regner selv",
        md: "Er en skade åben? Det kan regnes ud fra status: den er åben, så længe den er anmeldt eller under behandling. I stedet for at gemme det skriver du en **beregnet property** med `=>`. Den har ingen `set`, og den regnes ud, hver gang nogen læser den.",
        kode: R`Skade s1 = new Skade { Status = SkadeStatus.Behandles };
Skade s2 = new Skade { Status = SkadeStatus.Godkendt };
Console.WriteLine(s1.ErAaben);
Console.WriteLine(s2.ErAaben);

class Skade
{
    public SkadeStatus Status { get; set; }

    public bool ErAaben => Status == SkadeStatus.Anmeldt || Status == SkadeStatus.Behandles;
}

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`,
        noter: [
          ["=>", "Udregningen efter pilen er propertyens værdi."],
          ["||", "Eller: sand, hvis mindst én af siderne er sand."],
          ["Ingen set", "Man kan ikke sætte den. Derfor gemmer databasen den heller ikke."]
        ],
        output: "True\nFalse" },
      { t: "forudsig",
        kode: R`Skade a = new Skade { Status = SkadeStatus.Anmeldt };
Console.WriteLine(a.ErAaben);
a.Status = SkadeStatus.Afvist;
Console.WriteLine(a.ErAaben);

class Skade
{
    public SkadeStatus Status { get; set; }
    public bool ErAaben => Status == SkadeStatus.Anmeldt || Status == SkadeStatus.Behandles;
}

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`,
        output: "True\nFalse",
        fordi: "`ErAaben` regnes ud på ny, hver gang den læses. Efter `a.Status = SkadeStatus.Afvist;` er skaden ikke længere åben." },
      { t: "laes", h: "LINQ: spørg en liste",
        md: "Overblikket skal vise, hvor mange skader der er godkendt, og hvor meget de koster i alt. Det kunne du gøre med en løkke, men **LINQ** gør det på én linje.\n\n`Where` beholder de elementer, der passer. `Count` tæller dem, og `Sum` lægger dem sammen. Inde i parenteserne står en **lambda**: `s => s.Status == SkadeStatus.Godkendt` betyder \"tag en skade `s`, og svar på, om den er godkendt\".",
        kode: R`List<Skade> skader = new List<Skade>
{
    new Skade { Beloeb = 4500m, Status = SkadeStatus.Godkendt },
    new Skade { Beloeb = 18750m, Status = SkadeStatus.Behandles },
    new Skade { Beloeb = 6200m, Status = SkadeStatus.Godkendt },
    new Skade { Beloeb = 7999m, Status = SkadeStatus.Afvist }
};

int antal = skader.Count(s => s.Status == SkadeStatus.Godkendt);
decimal udbetalt = skader.Where(s => s.Status == SkadeStatus.Godkendt).Sum(s => s.Beloeb);
Console.WriteLine(antal);
Console.WriteLine(udbetalt);

class Skade
{
    public decimal Beloeb { get; set; }
    public SkadeStatus Status { get; set; }
}

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`,
        noter: [
          ["new List<Skade> { … }", "En liste, der fyldes med det samme. Et komma mellem hvert objekt."],
          ["Count(s => …)", "Tæller de skader, hvor betingelsen er sand."],
          ["Where(…)", "Beholder kun de godkendte skader."],
          [".Sum(s => s.Beloeb)", "Lægger beløbene sammen for dem, der er tilbage."]
        ],
        output: "2\n10700" },
      { t: "forudsig",
        q: "Samme slags liste som før. Hvad skriver programmet?",
        kode: R`List<Skade> skader = new List<Skade>
{
    new Skade { Beloeb = 2400m, Status = SkadeStatus.Anmeldt },
    new Skade { Beloeb = 25000m, Status = SkadeStatus.Anmeldt },
    new Skade { Beloeb = 3200m, Status = SkadeStatus.Godkendt }
};

Console.WriteLine(skader.Count(s => s.Status == SkadeStatus.Anmeldt));
Console.WriteLine(skader.Where(s => s.Beloeb > 3000m).Sum(s => s.Beloeb));

class Skade
{
    public decimal Beloeb { get; set; }
    public SkadeStatus Status { get; set; }
}

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`,
        output: "2\n28200",
        fordi: "To skader er anmeldt. Beløbene over 3000 er 25000 og 3200, og de giver tilsammen 28200." },
      { t: "udfyld", q: "Udfyld, så programmet skriver det samlede beløb for de godkendte skader.",
        kode: R`List<Skade> skader = new List<Skade>
{
    new Skade { Beloeb = 4500m, Status = SkadeStatus.Godkendt },
    new Skade { Beloeb = 3200m, Status = SkadeStatus.Godkendt },
    new Skade { Beloeb = 2400m, Status = SkadeStatus.Anmeldt }
};

decimal udbetalt = skader.[[Where]](s => s.Status == SkadeStatus.Godkendt).[[Sum]](s => s.Beloeb);
Console.WriteLine(udbetalt);

class Skade
{
    public decimal Beloeb { get; set; }
    public SkadeStatus Status { get; set; }
}

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`,
        output: "7700",
        fordi: "`Where` beholder de godkendte (4500 og 3200), og `Sum` lægger deres beløb sammen." },
      { t: "laes", h: "Sortér og saml i grupper",
        md: "To LINQ-metoder mere, som overblikket bruger:\n\n- `OrderByDescending(s => s.Beloeb)` sorterer med det største beløb først. `Take(2)` tager de to første.\n- `GroupBy(s => s.Status)` samler skaderne i én gruppe pr. status. Hver gruppe har en `Key` (statussen), og du kan bruge `Count()` og `Sum()` på gruppen.",
        kode: R`List<Skade> skader = new List<Skade>
{
    new Skade { Beloeb = 4500m, Status = SkadeStatus.Godkendt },
    new Skade { Beloeb = 18750m, Status = SkadeStatus.Behandles },
    new Skade { Beloeb = 6200m, Status = SkadeStatus.Godkendt }
};

foreach (Skade s in skader.OrderByDescending(s => s.Beloeb).Take(2))
{
    Console.WriteLine(s.Beloeb);
}

foreach (var gruppe in skader.GroupBy(s => s.Status).OrderBy(g => g.Key))
{
    Console.WriteLine(gruppe.Key + ": " + gruppe.Count());
}

class Skade
{
    public decimal Beloeb { get; set; }
    public SkadeStatus Status { get; set; }
}

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`,
        noter: [
          ["Take(2)", "Kun de to første efter sorteringen."],
          ["var gruppe", "`var` lader compileren finde typen selv. Typen på en gruppe er lang at skrive."],
          ["OrderBy(g => g.Key)", "Sorterer grupperne i den rækkefølge, værdierne står i enum'en."]
        ],
        output: "18750\n6200\nBehandles: 1\nGodkendt: 2" },
      { t: "orden", q: "Sæt linjerne i rækkefølge, så programmet skriver summen af de tal, der er større end 3.",
        linjer: [R`List<int> tal = new List<int> { 5, 2, 8 };`, R`var store = tal.Where(t => t > 3);`, R`int sum = store.Sum();`, R`Console.WriteLine(sum);`],
        output: "13",
        fordi: "Hver linje bruger variablen fra linjen før: først listen, så de store tal (5 og 8), så summen, og til sidst udskriften." },
      { t: "skriv", q: "Skriv en beregnet property i `Kunde`: `public decimal Udbetalt`, som er summen af `Beloeb` for de skader i `Skader`, der har status `SkadeStatus.Godkendt`. Brug `=>`, `Where` og `Sum`.",
        foer: R`Kunde k = new Kunde();
k.Skader.Add(new Skade { Beloeb = 4500m, Status = SkadeStatus.Godkendt });
k.Skader.Add(new Skade { Beloeb = 18750m, Status = SkadeStatus.Behandles });
k.Skader.Add(new Skade { Beloeb = 1000m, Status = SkadeStatus.Godkendt });
Console.WriteLine(k.Udbetalt);

class Kunde
{
    public List<Skade> Skader { get; set; } = new();
`,
        efter: R`
}

class Skade
{
    public decimal Beloeb { get; set; }
    public SkadeStatus Status { get; set; }
}

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`,
        tjek: [
          [/public decimal Udbetalt=>/, "Skriv `public decimal Udbetalt =>`"],
          [/Skader\.Where\(/, "Brug `Where` på `Skader`"],
          [/SkadeStatus\.Godkendt/, "Behold kun skader med status `SkadeStatus.Godkendt`"],
          [/\.Sum\((\w+)=>\1\.Beloeb\)/, "Læg beløbene sammen med `Sum(s => s.Beloeb)`"]
        ],
        loesning: R`    public decimal Udbetalt => Skader.Where(s => s.Status == SkadeStatus.Godkendt).Sum(s => s.Beloeb);`,
        output: "5500" },
      { t: "opgave", h: "Tilføj de beregnede properties", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "csharp",
        md: "Tilføj tre beregnede properties i dine modeller. Du skrev `Udbetalt` i trin 8, og de to andre bygges på samme måde med `=>`.",
        krav: [
          "`Skade` har `public bool ErAaben`, som er sand, når status er `Anmeldt` eller `Behandles`",
          "`Kunde` har `public decimal Udbetalt`: summen af `Beloeb` for de skader i `Skader`, der har status `Godkendt`",
          "`Kunde` har `public int AabneSkader`: antallet af skader i `Skader`, der er åbne (brug `ErAaben`)",
          "Ingen af de tre har `set`, og projektet kan bygges uden fejl"
        ],
        tip: [
          "`ErAaben` står i trin 1: `=>` og to sammenligninger med `||` imellem.",
          "`Udbetalt` er den, du skrev i trin 8: `Where` og så `Sum`.",
          "`AabneSkader` tæller med `Count` og en lambda: `Skader.Count(s => s.ErAaben)`."
        ],
        output: "Ingen ændring i appen endnu. Kundelisten viser tallene senere.",
        loesning: R`// I Skade.cs:
// En skade er åben, så længe der ikke er truffet en afgørelse.
public bool ErAaben => Status == SkadeStatus.Anmeldt || Status == SkadeStatus.Behandles;

// I Kunde.cs:
// Udregnes med LINQ ud fra skaderne. Den har ingen set, så EF Core gemmer den ikke i databasen.
public decimal Udbetalt => Skader.Where(s => s.Status == SkadeStatus.Godkendt).Sum(s => s.Beloeb);

public int AabneSkader => Skader.Count(s => s.ErAaben);` },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er LINQ, og hvor bruger du det i dit projekt?",
        svar: "LINQ er metoder til at søge, filtrere, sortere og regne på lister, fx Where, Count, Sum, OrderBy og GroupBy. Man giver dem en lambda, der siger, hvad de skal kigge på. I SkadeApp regner Kunde.Udbetalt summen af de godkendte skader med Where og Sum, overblikket grupperer skaderne pr. status med GroupBy, og kundelisten søger og sorterer med Where og OrderBy.",
        noegle: ["Where", "Sum", "lambda", "GroupBy", "OrderBy"] }
    ] }

  ]
});
})();
