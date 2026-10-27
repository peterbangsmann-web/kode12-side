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
  intro: "I dette modul bygger du dit eksamensprojekt, **SkadeApp**, fra en tom mappe til en færdig app. Det er et lille system til et forsikringsselskab: kunder, deres skadesanmeldelser og et overblik over, hvad der er udbetalt.\n\nHver lektion forklarer de ting, du skal bruge, og slutter med, at du bygger den næste del i dit eget projekt. Du behøver ikke have lavet modul 4–29 først: det, projektet bruger fra dem, bliver forklaret her.\n\nKommer du i tidsnød, ligger et færdigt og afprøvet projekt i mappen `Desktop\\c#\\C#  Ekasmen\\Facit\\SkadeApp`. Brug det til at sammenligne med, når noget driller.",
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m30l1", titel: "Hvad du bygger, og projektet oprettes", min: 20,
    ord: [
      ["Blazor Server", "En måde at lave web-apps på, hvor al C#-koden kører på serveren. Browseren viser siden og sender klik til serveren."],
      ["Komponent", "En del af en side i Blazor, skrevet i en `.razor`-fil med HTML og C# sammen. En hel side er også en komponent."],
      ["Lagdelt arkitektur", "Programmet er delt i lag, der hver har ét ansvar: siderne viser, services bestemmer, og databasen gemmer."],
      ["Model", "En klasse, der beskriver en slags ting i programmet, fx `Kunde` eller `Skade`."],
      ["Service", "En klasse, der udfører arbejdet for siderne, fx at hente eller gemme kunder."]
    ],
    trin: [
      { t: "laes", h: "Hvad SkadeApp kan",
        md: "En sagsbehandler i et forsikringsselskab skal holde styr på kunder og deres skader: hvem har anmeldt hvad, hvor meget koster det, og er skaden godkendt endnu? Det er problemet, din app løser. Det er også begrundelsen i dispositionen: du har selv arbejdet med forsikring i seks år.\n\nAppen har fire sider:\n\n- **Overblik**: antal kunder, antal åbne skader, hvor meget der er udbetalt, og de seneste skader.\n- **Kunder**: en liste, man kan søge i, og en formular til nye kunder.\n- **Kundesiden**: én kundes oplysninger og skader. Her kan man rette og slette kunden, anmelde en ny skade og skifte en skades status.\n- **Skader**: alle skader, som kan filtreres efter status og sorteres.\n\nData gemmes i en database, så de er der endnu, når appen startes igen.",
        md2: "Projektet bruger skabelon 2 fra projektkravene: **Blazor Server**." },
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
        md: "Lav projektet nu, og kør det, før du ændrer noget. Så ved du, at alt virker fra starten.",
        win: ["Åbn Visual Studio, og klik **Create a new project**.", "Skriv `blazor` i søgefeltet, vælg **Blazor Web App**, og klik **Next**.", "Project name: `SkadeApp`. Klik **Next**.", "Framework: **.NET 10.0**. Authentication type: **None**. Fjern fluebenet ved **Configure for HTTPS**.", "**Interactive render mode: Server**. **Interactivity location: Global**. Lad **Include sample pages** have flueben. Klik **Create**.", "Kør med den grønne pil ▶. Browseren åbner, og du ser **Hello, world!**. Klik på **Counter** i menuen, og klik på knappen et par gange."],
        mac: ["Åbn en terminal i den mappe, hvor dine projekter skal ligge.", "Skriv `dotnet new blazor -n SkadeApp --interactivity Server --all-interactive --no-https`, og tryk Enter.", "Åbn mappen `SkadeApp` i Rider (**File → Open…**).", "Kør med den grønne pil ▶. Browseren åbner, og du ser **Hello, world!**. Klik på **Counter** i menuen, og klik på knappen et par gange."],
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
│   ├── Layout
│   │   ├── MainLayout.razor   menuen til venstre og indholdet til højre
│   │   └── NavMenu.razor      linkene i menuen
│   └── Pages
│       ├── Home.razor         forsiden ( / )
│       ├── Counter.razor      eksempel, som du sletter
│       └── Weather.razor      eksempel, som du sletter
└── wwwroot                    CSS og billeder (Bootstrap ligger her)`,
        sprog: "text",
        noter: [
          ["Program.cs", "Kører først af alt, når appen starter."],
          [".razor", "En komponent: HTML og C# i samme fil."],
          ["Pages", "Her ligger siderne. En side har en `@page`-linje med sin adresse."]
        ] },
      { t: "valg", q: "Hvilken fil kører først, når du starter SkadeApp?",
        svar: ["Program.cs", "Home.razor", "App.razor", "NavMenu.razor"],
        ret: 0, fordi: "`Program.cs` bygger appen: den registrerer services og starter webserveren. Først derefter kan en side blive vist." },
      { t: "valg", q: "Du skal lave en ny side med adressen `/skader`. Hvor skal filen ligge?",
        svar: ["I mappen Components/Pages", "I mappen wwwroot", "Ved siden af Program.cs", "I mappen Components/Layout"],
        ret: 0, fordi: "Siderne ligger i `Components/Pages`. Det er `@page \"/skader\"` øverst i filen, der giver siden dens adresse. `Layout` er til det, der står rundt om alle sider." },
      { t: "ide", h: "Ryd op og lav menuen",
        md: "Eksempelsiderne skal ikke med i dit projekt.",
        win: ["Højreklik på `Counter.razor` i Solution Explorer → **Delete**. Gør det samme med `Weather.razor`.", "Åbn `Components/Layout/NavMenu.razor`, og ret den, så den ser ud som koden nedenfor. Skriv selv i stedet for at kopiere.", "Kør appen. Klik på **Kunder** og **Skader**: siderne findes ikke endnu, så du ser en side om, at adressen ikke findes. Det retter du i de næste lektioner."],
        mac: ["Højreklik på `Counter.razor` i Rider → **Delete**. Gør det samme med `Weather.razor`.", "Åbn `Components/Layout/NavMenu.razor`, og ret den, så den ser ud som koden nedenfor. Skriv selv i stedet for at kopiere.", "Kør appen. Klik på **Kunder** og **Skader**: siderne findes ikke endnu, så du ser en side om, at adressen ikke findes. Det retter du i de næste lektioner."],
        kode: R`<div class="top-row ps-3 navbar navbar-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="">SkadeApp</a>
    </div>
</div>

<input type="checkbox" title="Menu" class="navbar-toggler" />

<div class="nav-scrollable" onclick="document.querySelector('.navbar-toggler').click()">
    <nav class="nav flex-column">
        <div class="nav-item px-3">
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
        </div>
    </nav>
</div>`,
        sprog: "razor", frag: true,
        md2: "`NavLink` er et link, som Blazor selv markerer med en farve, når du står på den side. `href=\"kunder\"` er adressen `/kunder`." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er lagdelt arkitektur, og hvordan ser man den i dit projekt?",
        svar: "Lagdelt arkitektur betyder, at programmet er delt i lag, der hver har ét ansvar. I SkadeApp viser siderne i Components/Pages data, services i mappen Services henter og gemmer data, og modellerne og databasen i Models og Data beskriver og gemmer kunder og skader. Siderne taler kun med services, aldrig direkte med databasen, så jeg kan skifte databasen ud uden at røre siderne.",
        noegle: ["ansvar", "sider", "services", "database", "skifte ud"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m30l2", titel: "Klasser og objekter: Kunde", min: 20,
    ord: [
      ["Klasse", "En skabelon, der beskriver en slags ting: hvilke oplysninger den har. `class Kunde { … }`."],
      ["Objekt", "Én konkret ting lavet ud fra en klasse, fx kunden Mette. Laves med `new`."],
      ["Property", "En oplysning i en klasse med `{ get; set; }`, fx `Navn`. Den kan læses (get) og ændres (set)."],
      ["new", "Laver et nyt objekt ud fra en klasse: `new Kunde()`."],
      ["Objekt-initialisering", "At give et nyt objekt værdier med det samme: `new Kunde { Navn = \"Mette\" }`."],
      ["Namespace", "Et efternavn til klasserne, der svarer til mappen, fx `SkadeApp.Models`. Andre filer skriver `using SkadeApp.Models;` for at bruge dem."]
    ],
    trin: [
      { t: "laes", h: "En klasse er en skabelon",
        md: "Indtil nu har du haft én variabel for hver oplysning: `navn`, `telefon`. En kunde har flere oplysninger, der hører sammen. En **klasse** samler dem: den beskriver, hvad **en** kunde har. Ud fra klassen laver du **objekter**, én for hver kunde.",
        kode: R`Kunde k1 = new Kunde();
k1.Navn = "Mette Jensen";
k1.Telefon = "22334455";

Kunde k2 = new Kunde();
k2.Navn = "Ali Hassan";

Console.WriteLine(k1.Navn);
Console.WriteLine(k2.Navn);

class Kunde
{
    public int Id { get; set; }
    public string Navn { get; set; } = "";
    public string Telefon { get; set; } = "";
}`,
        noter: [
          ["class Kunde", "Skabelonen. Den står nederst, efter koden der bruger den."],
          ["{ get; set; }", "En property: værdien kan læses og ændres udefra."],
          ["public", "Koden uden for klassen må bruge den."],
          ["= \"\"", "Startværdien er en tom tekst. Uden den ville `Navn` være `null` (ingenting) fra starten."],
          ["new Kunde()", "Laver et nyt objekt. `k1` og `k2` er to forskellige kunder."],
          ["k1.Navn", "Punktum betyder: `Navn` på netop det objekt."]
        ],
        output: "Mette Jensen\nAli Hassan" },
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
      { t: "ide", h: "Lav Kunde.cs i dit projekt",
        md: "Nu får dit projekt sin første model. Skriv klassen selv.",
        win: ["Højreklik på projektet **SkadeApp** i Solution Explorer → **Add → New Folder** → `Models`.", "Højreklik på `Models` → **Add → Class…** → `Kunde.cs` → **Add**.", "Erstat indholdet med koden fra trin 8.", "Byg projektet med **Build → Build Solution**. Der må ikke komme fejl i **Error List**."],
        mac: ["Højreklik på projektet **SkadeApp** i Rider → **Add → Directory** → `Models`.", "Højreklik på `Models` → **Add → Class/Interface** → `Kunde`.", "Erstat indholdet med koden fra trin 8.", "Byg projektet med **Build → Build Solution**. Der må ikke komme fejl i vinduet **Problems**."],
        md2: "Klassen gør ikke noget synligt endnu. Den bliver brugt, når databasen og siderne kommer til." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er forskellen på en klasse og et objekt? Brug dit eget projekt som eksempel.",
        svar: "En klasse er en skabelon, der beskriver, hvilke oplysninger en slags ting har. Klassen Kunde siger, at en kunde har Id, Navn, Email og Telefon. Et objekt er én konkret kunde, lavet med new, fx Mette Jensen med sit eget telefonnummer. Der er én klasse, men mange objekter.",
        noegle: ["skabelon", "new", "konkret", "properties", "mange objekter"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m30l3", titel: "Skade, enum og relationen", min: 22,
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
      { t: "ide", h: "Lav Skade.cs, og giv Kunde sine skader",
        md: "Nu laver du den anden model og relationen. `Kunde?` betyder, at kunden må være `null`: når en skade hentes uden sin kunde, er der ingen kunde at vise.",
        win: ["Højreklik på `Models` → **Add → Class…** → `Skade.cs`. Skriv koden nedenfor.", "Åbn `Kunde.cs`, og tilføj denne linje under `Telefon`: `public List<Skade> Skader { get; set; } = new();`", "Byg projektet (**Build → Build Solution**)."],
        mac: ["Højreklik på `Models` → **Add → Class/Interface** → `Skade`. Skriv koden nedenfor.", "Åbn `Kunde.cs`, og tilføj denne linje under `Telefon`: `public List<Skade> Skader { get; set; } = new();`", "Byg projektet (**Build → Build Solution**)."],
        kode: R`namespace SkadeApp.Models;

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

public enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`,
        frag: true,
        md2: "`DateTime` er en type til dato og klokkeslæt. `DateTime.Today` er dagens dato, så en ny skade har dags dato fra starten. Linjer, der starter med `//`, er kommentarer: de er til dig og bliver ikke kørt. Dem behøver du ikke skrive af." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvordan hænger dine to modeller sammen, og hvordan er det gemt i databasen?",
        svar: "Det er en en-til-mange-relation: én kunde kan have mange skader, og hver skade hører til én kunde. I C# har Kunde en List<Skade> Skader, og Skade har KundeId og Kunde. I databasen er der to tabeller, og relationen gemmes i fremmednøglen KundeId i tabellen Skader, som indeholder kundens Id.",
        noegle: ["en-til-mange", "List<Skade>", "KundeId", "fremmednøgle", "to tabeller"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m30l4", titel: "Beregnede properties og LINQ", min: 22,
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
      { t: "ide", h: "Tilføj de beregnede properties",
        md: "Tilføj tre beregnede properties i dit projekt. Skriv dem selv.",
        win: ["Åbn `Models/Skade.cs`, og tilføj `ErAaben` nederst i klassen (før den afsluttende `}`).", "Åbn `Models/Kunde.cs`, og tilføj `Udbetalt` og `AabneSkader` under `Skader`.", "Byg projektet."],
        mac: ["Åbn `Models/Skade.cs`, og tilføj `ErAaben` nederst i klassen (før den afsluttende `}`).", "Åbn `Models/Kunde.cs`, og tilføj `Udbetalt` og `AabneSkader` under `Skader`.", "Byg projektet."],
        kode: R`// I Skade.cs:
// En skade er åben, så længe der ikke er truffet en afgørelse.
public bool ErAaben => Status == SkadeStatus.Anmeldt || Status == SkadeStatus.Behandles;

// I Kunde.cs:
// Udregnes med LINQ ud fra skaderne. Den har ingen set, så EF Core gemmer den ikke i databasen.
public decimal Udbetalt => Skader.Where(s => s.Status == SkadeStatus.Godkendt).Sum(s => s.Beloeb);

public int AabneSkader => Skader.Count(s => s.ErAaben);`,
        frag: true,
        md2: "`AabneSkader` bruger `ErAaben` fra skaden: den tæller de skader, der er åbne. Kundelisten viser begge tal senere." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er LINQ, og hvor bruger du det i dit projekt?",
        svar: "LINQ er metoder til at søge, filtrere, sortere og regne på lister, fx Where, Count, Sum, OrderBy og GroupBy. Man giver dem en lambda, der siger, hvad de skal kigge på. I SkadeApp regner Kunde.Udbetalt summen af de godkendte skader med Where og Sum, overblikket grupperer skaderne pr. status med GroupBy, og kundelisten søger og sorterer med Where og OrderBy.",
        noegle: ["Where", "Sum", "lambda", "GroupBy", "OrderBy"] }
    ] }

  ]
});
})();
