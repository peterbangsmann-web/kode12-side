// Modul 30, del 2 (eksamenstræning), fil 2 af 2: lektion E8–E14 og værkstedet. Se 31-eksamen-1.js.
(function () {
const R = String.raw;
var m = window.KURSUS.filter(function (x) { return x.id === "m30"; })[0];
if (!m) return;

m.lektioner.push(

  // ------------------------------------------------------------------
  { id: "m31l8", nr: "E8", titel: "Kundesiden: ruteparameter, ret, slet og status", min: 15,
    ord: [
      ["Ruteparameter", "En værdi i adressen, som siden får, fx 2 i /kunder/2."],
      ["Cascade delete", "Når en række slettes, slettes de rækker, der peger på den, også. Slettes en kunde, slettes kundens skader."]
    ],
    trin: [
      { t: "laes", h: "Adressen giver kundens nummer",
        md: "Kundesiden åbnes fx på `/kunder/2`. Tallet i adressen kommer ind i property'en `Id`. Resten af siden er taget ud her.",
        kode: R`@page "/kunder/{Id:int}"

@code {
    [Parameter] public int Id { get; set; }

    protected override async Task OnParametersSetAsync()
    {
        await HentKunde();
    }

    private async Task HentKunde()
    {
        kunde = await KundeService.HentAsync(Id);
        indlaest = true;
    }
}`, sprog: "razor",
        noter: [
          ["{Id:int}", "Ruteparameter: kun et heltal passer. /kunder/abc giver siden \"findes ikke\"."],
          ["[Parameter] public int Id", "Her lander tallet fra adressen."],
          ["OnParametersSetAsync", "Kører, når siden får sin parameter, også når man går fra én kunde til en anden."],
          ["indlaest = true", "Bruges til at skelne mellem \"henter\" og \"kunden findes ikke\"."]
        ] },
      { t: "valg", q: "Brugeren åbner `/kunder/99` i din app, men der er ingen kunde med Id 99. Hvad viser siden?",
        svar: ["\"Kunden findes ikke.\"", "\"Henter kunden …\" for altid", "En fejlside", "Den første kunde"],
        ret: 0, fordi: "`HentAsync` giver null, og `indlaest` er sand. Så viser siden \"Kunden findes ikke.\" i stedet for \"Henter kunden …\"." },
      { t: "laes", h: "Ret i en kopi",
        md: "Når man trykker **Ret kunde**, laver siden en kopi af kunden, og formularen retter i kopien.",
        kode: R`// retter i en kopi så Annuller ikke ændrer noget
private void StartRet()
{
    rettet = new Kunde { Id = kunde!.Id, Navn = kunde.Navn, Email = kunde.Email, Telefon = kunde.Telefon };
    retter = true;
}

private async Task GemKunde()
{
    await KundeService.OpdaterAsync(rettet);
    retter = false;
    await HentKunde();
}`, frag: true,
        noter: [
          ["rettet = new Kunde { ... }", "En kopi af kunden. Formularen retter i kopien, ikke i den rigtige kunde."],
          ["retter = true", "Nu viser siden formularen i stedet for kundens oplysninger."],
          ["OpdaterAsync(rettet)", "Gem rettelserne i databasen."],
          ["await HentKunde()", "Hent kunden igen, så siden viser det, der står i databasen."]
        ] },
      { t: "valg", q: "Hvorfor retter formularen på din kundeside i en kopi (`rettet`) og ikke direkte i `kunde`?",
        svar: ["Så Annullér ikke ændrer noget: kunden på siden er uændret, til der trykkes Gem", "Fordi kunde er readonly", "For at spare hukommelse", "Fordi en EditForm ikke kan bruge kunde"],
        ret: 0, fordi: "Felterne er bundet med `@bind-Value` og ændrer objektet, mens man skriver. Med en kopi bliver den rigtige kunde ikke rørt, hvis man annullerer." },
      { t: "laes", h: "Rullelisten med status",
        md: "Ved hver skade står en rulleliste med de fire statusser.",
        kode: R`<select class="form-select form-select-sm" value="@skade.Status"
        @onchange="e => SkiftStatus(skade.Id, e)">
    @foreach (var status in Enum.GetValues<SkadeStatus>())
    {
        <option value="@status">@status</option>
    }
</select>`, sprog: "razor",
        noter: [
          ["value=\"@skade.Status\"", "Rullelisten viser skadens nuværende status."],
          ["@onchange=\"e => SkiftStatus(skade.Id, e)\"", "Når brugeren vælger noget nyt, kaldes SkiftStatus med skadens Id og det valgte."],
          ["Enum.GetValues<SkadeStatus>()", "Alle fire statusser, så der er én option for hver."]
        ] },
      { t: "valg", q: "Hvorfor bruger du `Enum.GetValues<SkadeStatus>()` til rullelisten i stedet for at skrive de fire muligheder selv?",
        svar: ["Så rullelisten altid passer med enum'en. Kommer der en ny status, kommer den med af sig selv", "Fordi option ikke må skrives i hånden", "Fordi det kører hurtigere", "Fordi Blazor kræver det"],
        ret: 0, fordi: "Statusserne står ét sted: i enum'en. Rullelisten læser dem derfra." },
      { t: "laes", h: "SkiftStatus",
        md: "Metoden, som rullelisten kalder:",
        kode: R`private async Task SkiftStatus(int skadeId, ChangeEventArgs e)
{
    // teksten fra dropdown laves om til en status
    var status = Enum.Parse<SkadeStatus>(e.Value!.ToString()!);
    await SkadeService.SkiftStatusAsync(skadeId, status);
    await HentKunde();
}`, frag: true,
        noter: [
          ["ChangeEventArgs e", "Oplysninger om ændringen. e.Value er det valgte, som tekst, fx \"Godkendt\"."],
          ["e.Value!.ToString()!", "Lav værdien om til tekst. Udråbstegnene lover compileren, at den ikke er null."],
          ["Enum.Parse<SkadeStatus>(...)", "Lav teksten \"Godkendt\" om til SkadeStatus.Godkendt."],
          ["SkiftStatusAsync(skadeId, status)", "Servicen finder skaden, sætter status og gemmer."],
          ["HentKunde()", "Hent kunden igen, så tabellen og Udbetalt passer."]
        ] },
      { t: "orden", q: "Censor spørger: \"Hvad sker der, når man vælger Godkendt i rullelisten?\" Sæt det i rækkefølge.",
        linjer: ["Brugeren vælger Godkendt, og @onchange kalder SkiftStatus", "Enum.Parse laver teksten \"Godkendt\" om til SkadeStatus.Godkendt", "SkadeService.SkiftStatusAsync laver en DbContext og finder skaden med FindAsync", "Status sættes, og SaveChangesAsync gemmer i databasen", "HentKunde henter kunden igen", "Siden viser den nye status og det nye beløb under Udbetalt"], sprog: "text",
        fordi: "Klik på siden, så servicen, så databasen og tilbage til siden. Det er lagene i aktion." },
      { t: "valg", q: "I din app sletter du kunden Mette Jensen. Hvad sker der med hendes to skader?",
        svar: ["De bliver slettet sammen med hende (cascade delete)", "De bliver liggende uden en kunde", "Sletningen bliver afvist, fordi hun har skader", "De bliver flyttet til en anden kunde"],
        ret: 0, fordi: "`KundeId` er påkrævet, så EF Core sætter relationen til cascade delete. Derfor spørger siden også: \"Slet Mette Jensen og alle kundens skader?\"." },
      { t: "forklar", q: "Censor: \"Hvad sker der i din app, når man vælger Godkendt i rullelisten på kundesiden?\"",
        svar: "Rullelisten har @onchange, som kalder SkiftStatus med skadens Id og det valgte. Værdien kommer som tekst, så Enum.Parse laver den om til SkadeStatus.Godkendt. Så kalder siden SkadeService.SkiftStatusAsync, som laver en ny DbContext, finder skaden med FindAsync, sætter status og gemmer med SaveChangesAsync. Til sidst henter siden kunden igen, så tabellen og Udbetalt viser det nye.",
        noegle: ["@onchange", "SkiftStatus", "Enum.Parse", "SkiftStatusAsync", "FindAsync", "SaveChangesAsync", "HentKunde"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m31l9", nr: "E9", titel: "Skadesiden: filter og sortering", min: 12,
    ord: [
      ["Switch-udtryk", "En kort måde at vælge en værdi ud fra en anden: værdi switch { mulighed => resultat, … }. _ betyder alle andre."]
    ],
    trin: [
      { t: "laes", h: "Viste: først filter, så sortering",
        md: "`Viste` er de skader, tabellen viser. Den regnes ud, hver gang siden tegnes.",
        kode: R`// først filter på status, bagefter sortering
private IEnumerable<Skade> Viste
{
    get
    {
        IEnumerable<Skade> liste = skader!;

        if (statusFilter != "Alle")
        {
            liste = liste.Where(s => s.Status.ToString() == statusFilter);
        }

        return sortering switch
        {
            "aeldste" => liste.OrderBy(s => s.Dato),
            "beloeb" => liste.OrderByDescending(s => s.Beloeb),
            _ => liste.OrderByDescending(s => s.Dato)
        };
    }
}`, frag: true,
        noter: [
          ["IEnumerable<Skade> liste = skader!;", "Start med alle skaderne."],
          ["if (statusFilter != \"Alle\")", "Er der valgt en status, filtreres der."],
          ["s.Status.ToString() == statusFilter", "Lav status om til tekst, og sammenlign med det valgte i rullelisten."],
          ["sortering switch { ... }", "Switch-udtryk: vælg sorteringen ud fra rullelisten."],
          ["_ => liste.OrderByDescending(s => s.Dato)", "Alt andet, altså \"nyeste\": nyeste dato først."]
        ] },
      { t: "valg", q: "Hvorfor står filteret før sorteringen i din `Viste`?",
        svar: ["Så der kun sorteres de skader, der skal vises. Resultatet bliver det samme, men der er færre at sortere", "Fordi OrderBy ikke virker efter Where", "Ellers bliver filteret slået fra", "Fordi switch kun må stå til sidst i en metode"],
        ret: 0, fordi: "Rækkefølgen ændrer ikke, hvad der vises. Men det er mindre arbejde at sortere 3 skader end 7." },
      { t: "valg", q: "På din skadeside er statusfilteret **Godkendt**, og sorteringen er **Højeste beløb først**. Hvilken af dine startskader står øverst?",
        svar: ["Kufferten, der forsvandt i lufthavnen (6.200 kr.)", "Ridsen i døren efter parkering (4.500 kr.)", "Det brækkede håndled (25.000 kr.)", "Stenslaget i forruden (3.200 kr.)"],
        ret: 0, fordi: "Håndleddet er det største beløb, men det er Anmeldt og bliver filtreret fra. Af de godkendte er kufferten den dyreste." },
      { t: "fejl", q: "Med sorteringen \"aeldste\" skal den ældste skade stå først. Programmet skulle skrive 21-07-2026 først, men skriver 12-10-2026 først. Klik på linjen med fejlen.",
        kode: R`var skader = new List<Skade>
{
    new Skade { Dato = new DateTime(2026, 8, 14) },
    new Skade { Dato = new DateTime(2026, 7, 21) },
    new Skade { Dato = new DateTime(2026, 10, 12) }
};
string sortering = "aeldste";

var viste = sortering switch
{
    "aeldste" => skader.OrderByDescending(s => s.Dato),
    "beloeb" => skader.OrderByDescending(s => s.Beloeb),
    _ => skader.OrderByDescending(s => s.Dato)
};
foreach (var s in viste) Console.WriteLine(s.Dato.ToString("dd-MM-yyyy"));

class Skade
{
    public DateTime Dato { get; set; }
    public decimal Beloeb { get; set; }
}`,
        linje: 11, logisk: true, output: "12-10-2026\n14-08-2026\n21-07-2026", rettetOutput: "21-07-2026\n14-08-2026\n12-10-2026",
        fordi: "`OrderByDescending` sorterer faldende, altså nyeste først. Ældste først er `OrderBy`, som i din app.",
        rettet: R`var skader = new List<Skade>
{
    new Skade { Dato = new DateTime(2026, 8, 14) },
    new Skade { Dato = new DateTime(2026, 7, 21) },
    new Skade { Dato = new DateTime(2026, 10, 12) }
};
string sortering = "aeldste";

var viste = sortering switch
{
    "aeldste" => skader.OrderBy(s => s.Dato),
    "beloeb" => skader.OrderByDescending(s => s.Beloeb),
    _ => skader.OrderByDescending(s => s.Dato)
};
foreach (var s in viste) Console.WriteLine(s.Dato.ToString("dd-MM-yyyy"));

class Skade
{
    public DateTime Dato { get; set; }
    public decimal Beloeb { get; set; }
}` },
      { t: "udfyld", q: "Skriv de manglende ord, så filteret i `Viste` kun beholder skader med den valgte status.",
        kode: R`if (statusFilter != "Alle")
{
    liste = liste.[[Where]](s => s.Status.[[ToString]]() == statusFilter);
}`, frag: true,
        fordi: "`Where` filtrerer. `ToString()` laver status om til tekst, så den kan sammenlignes med teksten fra rullelisten." },
      { t: "valg", q: "Hvad betyder `_` i `_ => liste.OrderByDescending(s => s.Dato)` i din `Viste`?",
        svar: ["Alle andre værdier af sortering, her \"nyeste\"", "En variabel, der hedder _", "At sorteringen springes over", "En fejl, der bliver ignoreret"],
        ret: 0, fordi: "I et switch-udtryk passer `_` på alt det, der ikke er nævnt før. Det er også standarden, når siden åbnes." },
      { t: "valg", q: "Under tabellen på din skadeside står fx \"7 skader · i alt 68.049,00 kr.\". Hvad bliver lagt sammen?",
        svar: ["Beløbene for de skader, der vises lige nu, efter filteret", "Kun de godkendte skader", "Alle skader i databasen, uanset filteret", "Kun de åbne skader"],
        ret: 0, fordi: "Summen er `viste.Sum(s => s.Beloeb)`, og `viste` er resultatet af filteret og sorteringen." },
      { t: "forklar", q: "Censor: \"Forklar Viste på din skadeside.\"",
        svar: "Viste er en property, der regnes ud, hver gang siden tegnes. Den starter med alle skaderne. Er der valgt en status i filteret, beholder Where kun skader med den status. Bagefter vælger et switch-udtryk sorteringen: ældste først, højeste beløb først eller nyeste først, som er standard med _. Tabellen og summen under den bruger resultatet.",
        noegle: ["property", "Where", "status", "switch", "OrderBy", "_"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m31l10", nr: "E10", titel: "Login: kun for medarbejdere", min: 10,
    ord: [
      ["Hash", "En kode, der laves ud fra et kodeord, og som ikke kan regnes tilbage til kodeordet. Kodeord gemmes som hash."]
    ],
    trin: [
      { t: "laes", h: "Login kom med skabelonen",
        md: "Login er **ASP.NET Core Identity**. Det kom med, da projektet blev oprettet med **Individual Accounts**. Brugere og kodeord ligger i en database for sig: `Data/app.db`. Kodeord gemmes ikke som tekst, men som et **hash**.\n\nI din `Program.cs` står bl.a.:",
        kode: R`builder.Services.AddIdentityCore<ApplicationUser>(options =>
    {
        options.SignIn.RequireConfirmedAccount = false;
        options.Stores.SchemaVersion = IdentitySchemaVersions.Version3;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddSignInManager()
    .AddDefaultTokenProviders();`, frag: true,
        noter: [
          ["AddIdentityCore<ApplicationUser>", "Slå Identity til med brugerklassen ApplicationUser."],
          ["RequireConfirmedAccount = false", "Man kan logge ind med det samme uden at bekræfte sin e-mail. Appen sender ingen e-mails."],
          ["AddEntityFrameworkStores<ApplicationDbContext>", "Brugerne gemmes med EF Core i login-databasen."]
        ] },
      { t: "laes", h: "Sådan låses siderne",
        md: "To ting sørger for, at kun medarbejdere ser kunderne:\n\n- `@attribute [Authorize]` øverst på dine fire sider. Er man ikke logget ind, sendes man til login.\n- `<AuthorizeView>` i menuen. Dine tre links står i `<Authorized>` og vises kun, når man er logget ind.",
        kode: R`@page "/kunder"
@attribute [Authorize]
@inject IKundeService KundeService`, sprog: "razor" },
      { t: "valg", q: "En, der ikke er logget ind, skriver adressen `/skader` direkte i browseren. Hvad sker der i din app?",
        svar: ["De bliver sendt til login-siden, fordi siden har [Authorize]", "De ser alle skaderne", "De ser en tom side", "Appen går ned"],
        ret: 0, fordi: "`Routes.razor` har `<NotAuthorized><RedirectToLogin /></NotAuthorized>`, så en side med `[Authorize]` sender til login." },
      { t: "valg", q: "Hvorfor skjuler du også linkene i menuen, når siderne alligevel har `[Authorize]`?",
        svar: ["[Authorize] beskytter siden. AuthorizeView gør menuen pæn, så man ikke ser links, man ikke kan bruge", "Fordi [Authorize] ikke virker uden AuthorizeView", "For at skjule koden for censor", "Det gør ingen forskel"],
        ret: 0, fordi: "Beskyttelsen ligger i `[Authorize]`. `AuthorizeView` handler kun om, hvad menuen viser." },
      { t: "valg", q: "Hvad er forskellen på **authentication** og **autorisation**?",
        svar: ["Authentication: hvem er du (login). Autorisation: hvad må du, fx at kun ledere må godkende", "Det er det samme", "Authentication er kodeordet, autorisation er brugernavnet", "Autorisation er login med Google"],
        ret: 0, fordi: "Din app har authentication: alle, der er logget ind, må det samme. Roller ville være autorisation, og det er en af dine udvidelser." },
      { t: "forklar", q: "Censor: \"Hvorfor har du login, og hvordan virker det?\"",
        svar: "Kundeoplysninger er personlige, så kun medarbejdere må se dem. Login er ASP.NET Core Identity fra skabelonen Individual Accounts. Brugerne ligger i deres egen SQLite-database, app.db, og kodeord gemmes som hash. Mine fire sider har @attribute [Authorize], så man sendes til login, hvis man ikke er logget ind, og menuen viser kun mine links inde i AuthorizeView. Næste skridt kunne være roller, så fx kun en leder må godkende store skader.",
        noegle: ["personlige", "Identity", "Individual Accounts", "hash", "[Authorize]", "AuthorizeView", "roller"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m31l11", nr: "E11", titel: "Læringsmålene i din kode", min: 15,
    ord: [
      ["Læringsmål", "Det, studieordningen siger, du skal kunne efter faget. Censor bedømmer ud fra dem."],
      ["Designmønster", "En kendt, gennemprøvet løsning på et problem, der går igen, fx dependency injection."]
    ],
    trin: [
      { t: "laes", h: "Det, censor bedømmer",
        md: "Studieordningen har en liste over det, du skal kunne. Censor spørger ofte: \"Hvor i dit projekt bruger du …?\" Her er listen, og hvor det står i din kode:",
        kode: R`Læringsmål                  Hvor i SkadeApp
Objektorienteret program    klasserne Kunde, Skade og KundeService, properties og enums
Designmønstre               dependency injection, fabrik (DbContextFactory), servicelag
Abstrakte datatyper         interfacene IKundeService og ISkadeService, List<T>, IEnumerable<T>
Datastrukturer              List<Kunde>, List<Skade>, enum, grupper fra GroupBy
Programbiblioteker          EF Core, Identity og Bootstrap
Arkitektur og frameworks    lagdelt arkitektur, Blazor Server på ASP.NET Core
API'er                      EF Cores DbSet og LINQ; et Web API er en mulig udvidelse
Algoritmer                  søgning, filtrering, sortering og gruppering med LINQ
Regulære udtryk             telefonnummeret: ^\d{8}$
Brugerflade (GUI)           Blazor-komponenter, formularer og StatusMaerke`,
        sprog: "text" },
      { t: "valg", q: "Censor: \"Bruger du nogen designmønstre?\" Hvilket svar passer på din app?",
        svar: ["Dependency injection i Program.cs, en fabrik (DbContextFactory), der laver DbContext-objekter, og et servicelag mellem siderne og databasen", "Singleton i alle klasser", "Ingen", "Observer på alle sider"],
        ret: 0, fordi: "Det er de mønstre, du faktisk har. Sig dem, og peg på `Program.cs` og mappen `Services`." },
      { t: "valg", q: "Hvorfor er `IKundeService` et eksempel på abstraktion?",
        svar: ["Den beskriver, hvad man kan med kunder (hente, oprette, rette, slette), uden at sige, hvordan det gøres", "Fordi den ikke kan bruges til noget", "Fordi den ligger i en mappe for sig", "Fordi metoderne er async"],
        ret: 0, fordi: "Siderne kender kun \"hvad\". \"Hvordan\" står i `KundeService`." },
      { t: "valg", q: "Censor: \"Hvilken datastruktur bruger du til kundens skader, og hvorfor?\"",
        svar: ["En List<Skade>: antallet ændrer sig, når der anmeldes og slettes skader, og en liste kan vokse og skrumpe", "Et array, fordi der altid er syv skader", "En Dictionary med beløbet som nøgle", "En Stack, så den nyeste kommer først"],
        ret: 0, fordi: "Et array har en fast længde. En liste passer, når antallet ændrer sig." },
      { t: "valg", q: "Hvor i din app er der algoritmer?",
        svar: ["Søgningen, filtreringen, sorteringen og grupperingen med LINQ, fx Fundne på kundelisten og Viste på skadesiden", "Kun i Program.cs", "Der er ingen", "I Bootstrap"],
        ret: 0, fordi: "En algoritme er en fremgangsmåde til at løse en opgave. At finde, filtrere, sortere og gruppere data er klassiske eksempler." },
      { t: "valg", q: "Censor: \"Har du lavet et API?\" Hvad er det ærlige og bedste svar?",
        svar: ["Nej, ikke et Web API. Mine services er en slags API for siderne, og et Web API med fx POST /api/skader kunne genbruge ISkadeService", "Ja, hele appen er et API", "Nej, og det er ikke relevant", "Ja, Bootstrap er mit API"],
        ret: 0, fordi: "Vær ærlig om, hvad du har lavet, og vis, at du ved, hvordan det kunne bygges videre." },
      { t: "valg", q: "Hvad er objektorienteret programmering i din app? Vælg det mest præcise svar.",
        svar: ["Klasser beskriver ting (Kunde, Skade), objekterne er de konkrete kunder, properties holder data, og KundeService indkapsler databasekoden bag et interface", "At appen har sider", "At koden ligger i filer", "At der bruges Bootstrap"],
        ret: 0, fordi: "Klasser, objekter, indkapsling og abstraktion med interfaces. Og `SkadeContext` arver fra `DbContext`." },
      { t: "forklar", q: "Censor: \"Hvor bruger du objektorienteret programmering?\"",
        svar: "Kunde og Skade er klasser, der beskriver ting fra forsikringsverdenen, og hver kunde i databasen bliver et objekt. Data ligger i properties, og nogle bliver regnet ud, fx Udbetalt. Servicene indkapsler databasekoden: siderne kalder bare metoder på IKundeService. Interfacet er abstraktion, og SkadeContext arver fra DbContext, så der er også arv.",
        noegle: ["klasser", "objekt", "properties", "indkapsler", "interface", "arv"] },
      { t: "forklar", q: "Censor: \"Hvilke designmønstre og hvilken arkitektur har du brugt?\"",
        svar: "Arkitekturen er lagdelt: sider, services og database hver for sig. Jeg bruger dependency injection: Program.cs registrerer services og DbContextFactory, og siderne og servicene får dem udefra. DbContextFactory er en fabrik, der laver en ny DbContext til hver handling. Som udvidelse kunne risikovurderingen bruge Strategy-mønsteret: et interface med flere måder at regne risikoen ud på.",
        noegle: ["lagdelt", "dependency injection", "fabrik", "DbContextFactory", "Strategy"] },
      { t: "forklar", q: "Censor: \"Hvilke programbiblioteker og frameworks bruger du?\"",
        svar: "Appen er bygget på frameworket ASP.NET Core med Blazor Server. Jeg bruger EF Core til databasen med SQLite som provider, ASP.NET Core Identity til login og Bootstrap til udseendet. EF Core-pakkerne er NuGet-pakker, og Bootstrap fulgte med skabelonen.",
        noegle: ["ASP.NET Core", "Blazor Server", "EF Core", "SQLite", "Identity", "Bootstrap", "NuGet"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m31l12", nr: "E12", titel: "Svære spørgsmål og valg, du skal forsvare", min: 15,
    ord: [
      ["Concurrency", "At to brugere arbejder med de samme data på samme tid."]
    ],
    trin: [
      { t: "laes", h: "Et godt svar har tre dele",
        md: "Censor spørger også til dine valg, og til hvad du ville gøre anderledes. Et godt svar har tre dele:\n\n1. Hvad du gjorde.\n2. Hvorfor.\n3. Ulempen, eller hvad du ville gøre i et større projekt.\n\nDen tredje del viser, at du forstår mere end det, du har bygget." },
      { t: "forklar", q: "Censor: \"Hvorfor Blazor Server og ikke MVC eller WebAssembly?\"",
        svar: "Med Blazor Server er alt C#, og en side er én fil med HTML og kode. Koden kører på serveren, så siderne kan bruge servicene og databasen direkte. Med WebAssembly kører koden i browseren, og så skulle der et Web API imellem for at nå databasen. MVC havde også virket, men med controllere, views og modeller i hver sin fil. Ulempen ved Blazor Server er, at hver bruger har en forbindelse åben til serveren.",
        noegle: ["C#", "serveren", "WebAssembly", "Web API", "MVC", "forbindelse"] },
      { t: "forklar", q: "Censor: \"Hvordan har du brugt AI i projektet?\"",
        svar: "Jeg har brugt Claude til at få forklaret begreber, også når jeg havde glemt et ord, til kodeforslag og til fejlfinding, og GitHub Copilot til autofuldførelse i editoren. Det står i dispositionen under Brug af AI og i kilderne. Jeg har sat mig ind i koden, og det er derfor, jeg kan vise og forklare hver del her.",
        noegle: ["Claude", "forklaringer", "kodeforslag", "fejlfinding", "Copilot", "disposition"] },
      { t: "forklar", q: "Censor: \"Hvad ville du gøre anderledes, hvis du startede forfra?\"",
        svar: "Tre ting. Søgningen på kunder ville jeg lave i databasen i stedet for at hente alle kunder og søge i hukommelsen. Jeg ville bruge migrations i stedet for EnsureCreated, så databasen kan ændres uden at miste data. Og jeg ville tilføje fejlhåndtering med try/catch, når der gemmes, og tests af fx Udbetalt.",
        noegle: ["søgning", "databasen", "migrations", "EnsureCreated", "try/catch", "tests"] },
      { t: "forklar", q: "Censor: \"Hvordan kunne du udvide appen?\"",
        svar: "En kunde har i virkeligheden flere forsikringer, så jeg ville lave en model Forsikring mellem Kunde og Skade, med type og selvrisiko. Skader kunne markeres som belastende og bruges til en risikovurdering af kunden: lav, middel eller høj. Og jeg ville lave roller, så kun en leder må godkende store skader, og evt. et Web API, så kunderne selv kan anmelde skader.",
        noegle: ["Forsikring", "selvrisiko", "belastende", "risikovurdering", "roller", "Web API"] },
      { t: "forklar", q: "Censor: \"Hvorfor står C#-koden i @code i samme fil som HTML'en og ikke i en code-behind-fil?\"",
        svar: "Begge dele er rigtige. I et lille projekt er det nemmest at overskue, når siden og dens kode står i samme fil. I et større projekt ville jeg flytte koden ud i en .razor.cs-fil med partial class, så HTML og C# står hver for sig.",
        noegle: ["begge", "lille projekt", "overskue", ".razor.cs", "partial"] },
      { t: "forklar", q: "Censor: \"Hvad er en fremmednøgle i din database?\"",
        svar: "KundeId i Skade er en fremmednøgle. Den peger på Id i tabellen Kunder, så hver skade hører til én kunde. Databasen sikrer, at KundeId passer med en kunde, der findes. Når en kunde slettes, bliver kundens skader også slettet, fordi relationen er sat til cascade delete.",
        noegle: ["KundeId", "peger", "Id", "én kunde", "cascade delete"] },
      { t: "forklar", q: "Censor: \"Hvad sker der, hvis to sagsbehandlere retter den samme kunde på samme tid?\"",
        svar: "Den, der gemmer sidst, vinder, fordi OpdaterAsync bare skriver de nye værdier. Det er ikke håndteret i appen. I et rigtigt system kunne man bruge EF Cores concurrency-tjek, fx et versionsfelt, så den anden får besked om, at kunden er blevet ændret i mellemtiden.",
        noegle: ["sidst", "vinder", "ikke håndteret", "concurrency", "versionsfelt"] },
      { t: "valg", q: "Censor stiller et spørgsmål, du ikke kan svare på. Hvad er bedst?",
        svar: ["Sige ærligt, at du ikke ved det, og fortælle, hvordan du ville finde ud af det, fx i Microsoft Learn eller ved at prøve det af", "Finde på et svar", "Skifte emne", "Sige, at AI har lavet den del"],
        ret: 0, fordi: "Ærlighed og en plan viser, at du kan arbejde selvstændigt. Et opdigtet svar opdager censor hurtigt." }
    ] },

  // ------------------------------------------------------------------
  { id: "m31l13", nr: "E13", titel: "Præsentationen på 10 minutter", min: 20,
    ord: [
      ["Stikord", "Få ord, der minder dig om, hvad du vil sige. Du skal ikke læse op fra en tekst."]
    ],
    trin: [
      { t: "laes", h: "Rækkefølgen følger din disposition",
        md: "Censor har din disposition foran sig. Følg den, så kan de følge med. Brug den som **stikord** på skærmen: du skal ikke kunne en tekst udenad.",
        kode: R`Afsnit              Ca. tid    Hvad du gør
1. Indledning       1 min      hvad appen er, hvem den er til, hvorfor forsikring, hvorfor login
2. Teknologi        2 min      Blazor Server, lagene, services og DI, EF Core og SQLite, Identity
3. Sider            3 min      vis appen: Overblik, Kunder, kundesiden (skift status), Skader
4. Modeller         2 min      vis koden: Kunde og Skade, KundeService, Program.cs
5. Rettelser        1 min      søgning i databasen, migrations, fejlhåndtering og tests
6. Udvidelser       30 sek     forsikringer med selvrisiko, risikovurdering, roller
7. Brug af AI       30 sek     Claude og Copilot, som det står i dispositionen`,
        sprog: "text" },
      { t: "orden", q: "Sæt afsnittene i den rækkefølge, de står i din disposition.",
        linjer: ["Indledning", "Teknologi", "Sider", "Modeller", "Rettelser", "Udvidelser", "Brug af AI"], sprog: "text",
        fordi: "Det er dispositionens rækkefølge. Følger du den, kan censor sætte flueben, mens du taler." },
      { t: "forklar", q: "Sig afsnittet **Indledning** højt, som til eksamen. Ca. 1 minut.",
        svar: "SkadeApp er en app til sagsbehandlere i et forsikringsselskab, hvor kunder, skader og udbetalinger er samlet ét sted. Jeg valgte emnet, fordi jeg har arbejdet seks år med forsikring og kender hverdagen. Kundeoplysninger er personlige, så kun medarbejdere må bruge appen, og derfor er der login. En skade er en anmeldelse fra en kunde, fx en vandskade, og den har status anmeldt, behandles, godkendt eller afvist.",
        noegle: ["sagsbehandlere", "seks år", "personlige", "login", "status"] },
      { t: "forklar", q: "Sig afsnittet **Teknologi** højt. Ca. 2 minutter.",
        svar: "Appen er lavet med Blazor Server på .NET 10, skabelon 2. Den er lagdelt: siderne viser data, servicene henter og gemmer, og databasen ligger for sig. Servicene har interfaces, IKundeService og ISkadeService, og registreres med dependency injection i Program.cs. Data gemmes med EF Core i en SQLite-fil med startdata. Login er ASP.NET Core Identity. Reglerne står som validering på modellerne, bl.a. et regulært udtryk til telefonnummeret, og LINQ bruges til søgning, sortering og beregninger. Udseendet er Bootstrap og en lille komponent til statusmærket.",
        noegle: ["Blazor Server", "lagdelt", "interfaces", "dependency injection", "EF Core", "SQLite", "Identity", "LINQ"] },
      { t: "forklar", q: "Sig afsnittet **Sider** højt, mens du viser appen. Ca. 3 minutter.",
        svar: "Jeg starter på Overblik med nøgletallene, skader pr. status og de seneste skader. Så går jeg til Kunder og søger, fx på peter, og viser formularen, også hvad der sker, når telefonnummeret er forkert. Jeg åbner en kundeside, skifter en skades status til Godkendt og viser, at Udbetalt ændrer sig. Til sidst viser jeg Skader med filter og sortering.",
        noegle: ["Overblik", "søger", "formularen", "kundeside", "Godkendt", "Udbetalt", "filter"] },
      { t: "forklar", q: "Sig afsnittet **Modeller** højt, mens du viser koden. Ca. 2 minutter.",
        svar: "Jeg viser Kunde og Skade: én kunde har mange skader gennem KundeId, type og status er enums, og Udbetalt, AabneSkader og ErAaben bliver regnet ud. Så viser jeg KundeService med interfacet, using var db og Include, og AddScoped i Program.cs, som binder interfacet til klassen.",
        noegle: ["Kunde", "Skade", "KundeId", "enums", "Udbetalt", "KundeService", "AddScoped"] },
      { t: "forklar", q: "Sig afsnittene **Rettelser**, **Udvidelser** og **Brug af AI** højt. Ca. 2 minutter i alt.",
        svar: "Hvis jeg skulle videre, ville jeg søge direkte i databasen i stedet for at hente alle kunder, bruge migrations i stedet for EnsureCreated og tilføje fejlhåndtering og tests. Som udvidelser kunne en kunde have forsikringer med selvrisiko, skader kunne markeres som belastende og bruges til en risikovurdering, og der kunne komme roller. Jeg har brugt Claude til forklaringer, kodeforslag og fejlfinding og GitHub Copilot til autofuldførelse, som det står i dispositionen.",
        noegle: ["databasen", "migrations", "tests", "selvrisiko", "risikovurdering", "roller", "Claude", "Copilot"] },
      { t: "ide", h: "Generalprøve med uret",
        md: "Hold hele præsentationen højt, mens du deler skærm, ligesom på Zoom. Tag tid.",
        win: ["Start appen, og log ind.", "Åbn dispositionen, så du kan se den ved siden af appen.", "Start et ur.", "Hold præsentationen fra Indledning til Brug af AI. Vis appen og koden undervejs.", "Skriv ned, hvor lang tid det tog, og hvilket afsnit der var svært."],
        md2: "Gør det én gang om dagen fra onsdag. Optag gerne dig selv, fx med Zoom eller telefonen, og se optagelsen. Så kan du se, hvor du leder efter ord, og øve netop det sted." }
    ] },

  // ------------------------------------------------------------------
  { id: "m31l14", nr: "E14", titel: "Generalprøve: blandede spørgsmål", min: 15,
    ord: [
      ["Generalprøve", "En prøve på det hele under de samme forhold som til eksamen."]
    ],
    trin: [
      { t: "laes", h: "Bland det hele",
        md: "Til eksamen kommer spørgsmålene ikke i lektionernes rækkefølge. Her er en blandet runde med begreber, der går på tværs af appen. Svar højt, før du ser det gode svar.\n\nBrug også **Test** i menuen: vælg emnet **SkadeApp** og slags **Forklar med egne ord**. Så får du alle forklaringsopgaverne fra dette modul i blandet rækkefølge." },
      { t: "forklar", q: "Censor: \"Hvad er en komponent i Blazor? Giv et eksempel fra din app.\"",
        svar: "En komponent er en genbrugelig del af en side i en .razor-fil, med HTML og C# sammen. Alle mine sider er komponenter, og StatusMaerke er en lille komponent, der får en status som [Parameter] og viser et farvet mærke. Den bruges flere steder, så farvereglerne kun står ét sted.",
        noegle: [".razor", "genbrugelig", "HTML og C#", "StatusMaerke", "[Parameter]"] },
      { t: "forklar", q: "Censor: \"Hvad er forskellen på OnInitializedAsync og OnParametersSetAsync, og hvor bruger du dem?\"",
        svar: "OnInitializedAsync kører én gang, når siden starter. Den bruger jeg på Overblik, Kunder og Skader til at hente data. OnParametersSetAsync kører, hver gang siden får sine parametre. Den bruger jeg på kundesiden, fordi Id kommer fra adressen, og siden skal hente den nye kunde, hvis man går fra én kunde til en anden.",
        noegle: ["én gang", "parametre", "Id", "adressen", "kundesiden"] },
      { t: "forklar", q: "Censor: \"Hvad er async og await, og hvorfor bruger du det?\"",
        svar: "En async-metode kan vente på noget, der tager tid, fx databasen, uden at låse appen. await betyder: vent her på svaret, og lad appen arbejde videre imens. Mine service-metoder er async og returnerer en Task, fx Task<List<Kunde>>, og siderne kalder dem med await.",
        noegle: ["vente", "databasen", "låse", "await", "Task"] },
      { t: "forklar", q: "Censor: \"Hvad er LINQ? Giv to eksempler fra din app.\"",
        svar: "LINQ er metoder til at arbejde med lister og data, fx Where, OrderBy, Sum, Count og GroupBy. I Kunde regner Udbetalt med Where og Sum på de godkendte skader. På skadesiden filtrerer Where på status, og OrderBy sorterer. På forsiden samler GroupBy skaderne pr. status.",
        noegle: ["Where", "OrderBy", "Sum", "GroupBy", "Udbetalt"] },
      { t: "forklar", q: "Censor: \"Hvad er en enum, og hvordan gemmes den i databasen?\"",
        svar: "En enum er en fast liste med lovlige værdier. SkadeStatus har Anmeldt, Behandles, Godkendt og Afvist, så en skade ikke kan få en status, der ikke findes. EF Core gemmer en enum som et tal i databasen: Anmeldt er 0, Behandles 1, Godkendt 2 og Afvist 3.",
        noegle: ["fast liste", "lovlige", "SkadeStatus", "tal", "0"] },
      { t: "forklar", q: "Censor: \"Hvad er Bootstrap, og hvor bruger du det?\"",
        svar: "Bootstrap er et CSS-bibliotek med færdige klasser til udseendet. Det fulgte med skabelonen. Jeg bruger fx card til nøgletallene på Overblik, table til tabellerne, btn til knapperne, form-control til felterne og badge til statusmærket.",
        noegle: ["CSS", "klasser", "skabelonen", "card", "table", "badge"] },
      { t: "forklar", q: "Censor: \"Hvad er en navigation property? Hvor har du en?\"",
        svar: "En navigation property peger på et andet objekt i stedet for et id. Skade har Kunde, som er selve kunden, og Kunde har listen Skader. De bliver kun fyldt ud, hvis man henter dem med, fx med Include(k => k.Skader) i KundeService.",
        noegle: ["peger", "Kunde", "Skader", "Include"] },
      { t: "ide", h: "Blandet test",
        md: "Tag en blandet test, så du ser, hvor du står.",
        win: ["Klik på **Test** i menuen øverst.", "Vælg emnet **SkadeApp**, slags **Spørgsmål, siden retter**, og længden **Mellem**.", "Tag testen, og læs de lektioner, resultatet foreslår.", "Tag bagefter samme test med slags **Forklar med egne ord**."] }
    ] },

  // ------------------------------------------------------------------
  { id: "m31v", titel: "Værksted: små ændringer i en kopi af din app", vaerksted: true, min: 60, ord: [],
    trin: [
      { t: "laes", h: "Lav en kopi, og øv dig i den",
        md: "Censor kan bede dig lave en lille ændring, mens de ser på. Så viser du, at du kan arbejde i din egen kode. Øv det her i en **kopi**, så din afleverede app ikke bliver ændret.\n\nKopien hænger stadig sammen med dit GitHub-repo. Lav derfor ikke commit eller push fra kopien.",
        win: ["Luk Visual Studio.", "Åbn mappen `C#  Ekasmen\\min eksamen` i Stifinder.", "Kopiér mappen `SkadeApp`, og sæt kopien ind i den samme mappe.", "Omdøb kopien til `SkadeApp-oevelse`.", "Åbn `SkadeApp-oevelse\\SkadeApp.slnx` i Visual Studio, og kør appen én gang for at se, at den virker."],
        mac: ["Luk Rider.", "Find mappen med din SkadeApp i Finder.", "Højreklik på mappen `SkadeApp`, og vælg Dupliker (Duplicate).", "Omdøb kopien til `SkadeApp-oevelse`.", "Åbn `SkadeApp.slnx` fra kopien i Rider, og kør appen én gang for at se, at den virker."] },
      { t: "opgave", h: "Tilføj en adresse på kunden", projekt: "SkadeApp-oevelse",
        md: "Censor: \"Kan du tilføje en adresse på kunden?\"\n\nArbejd i kopien `SkadeApp-oevelse`, som er din Blazor Server-app. Adressen skal kunne skrives, når en kunde oprettes, og vises i kundelisten.",
        krav: ["`Kunde` har en ny property `Adresse`: en tekst med startværdien `\"\"`", "Formularen **Ny kunde** på siden Kunder har et felt til adressen", "Kundelisten har en kolonne **Adresse**", "Du har slettet filen `Data/skade.db` i kopien, før du startede appen, så databasen bliver lavet igen med den nye kolonne", "En ny kunde med adresse bliver vist med adressen i listen"],
        tip: ["Start i `Models/Kunde.cs`. Skriv den nye property som de andre tekster, men uden `[Required]`.", "Kopiér blokken med Telefon-feltet i `Kunder.razor`, og ret de steder, hvor der står Telefon. Tilføj også en `<th>` og en `<td>` i tabellen.", "Uden at slette `skade.db` får du fejlen `no such column`. EnsureCreated laver kun databasen, når filen ikke findes."],
        loesning: R`// Models/Kunde.cs: en ny property
public string Adresse { get; set; } = "";

@* Components/Pages/Kunder.razor: et nyt felt i formularen, under Telefon *@
<div class="mb-3">
    <label class="form-label">Adresse</label>
    <InputText class="form-control" @bind-Value="nyKunde.Adresse" />
</div>

@* og en ny kolonne i tabellen *@
<th>Adresse</th>
<td>@kunde.Adresse</td>`, sprog: "razor", fri: true,
        fordi: "Ændringen går gennem tre lag: modellen, siden og databasen. Fortæl censor undervejs, hvorfor `skade.db` skal slettes: EnsureCreated ændrer ikke en database, der findes. Med migrations ville du i stedet lave en ny migration.",
        ekstra: ["Vis adressen på kundesiden, og gør den mulig at rette. Husk `gemt.Adresse = kunde.Adresse;` i `OpdaterAsync` og `Adresse = kunde.Adresse` i `StartRet`."] },
      { t: "opgave", h: "Sortér kundelisten efter udbetalt", projekt: "SkadeApp-oevelse",
        md: "Censor: \"Kan kunderne med de største udbetalinger stå øverst?\"\n\nArbejd i kopien `SkadeApp-oevelse`.",
        krav: ["Kundelisten er sorteret efter `Udbetalt`, største først", "Søgningen virker stadig", "Med startdataene står Peter Bangsmann (6.200,00 kr.) øverst og Mette Jensen (4.500,00 kr.) som nummer to"],
        tip: ["Det er i `Fundne` i `Kunder.razor`.", "Skift `OrderBy(k => k.Navn)` ud.", "`OrderByDescending(k => k.Udbetalt)` sorterer største først."],
        loesning: R`private IEnumerable<Kunde> Fundne => kunder!
    .Where(k => k.Navn.Contains(soegeord, StringComparison.OrdinalIgnoreCase)
             || k.Email.Contains(soegeord, StringComparison.OrdinalIgnoreCase)
             || k.Telefon.Contains(soegeord))
    .OrderByDescending(k => k.Udbetalt);`, fri: true, frag: true,
        fordi: "Én linje. Det virker, fordi `HentAlleAsync` henter skaderne med `Include`, så `Udbetalt` kan regnes ud for hver kunde." },
      { t: "opgave", h: "Et nyt nøgletal på Overblik", projekt: "SkadeApp-oevelse",
        md: "Censor: \"Kan du vise, hvor mange skader der er afvist?\"\n\nArbejd i kopien `SkadeApp-oevelse`.",
        krav: ["Overblik har et nyt kort med overskriften **Afviste skader**", "Kortet viser antallet af skader med status Afvist", "Med startdataene viser kortet 1"],
        tip: ["Kopiér kortet **Åbne skader** i `Home.razor`.", "Brug `Count` med en betingelse på `Status`.", "`@skader.Count(s => s.Status == SkadeStatus.Afvist)`"],
        loesning: R`<div class="col-md-4">
    <div class="card"><div class="card-body">
        <div class="text-muted">Afviste skader</div>
        <div class="fs-2">@skader.Count(s => s.Status == SkadeStatus.Afvist)</div>
    </div></div>
</div>`, sprog: "razor", fri: true,
        fordi: "Samme LINQ som kortet Åbne skader, bare med en anden betingelse.",
        ekstra: ["Ret `col-md-4` til `col-md-3` på alle fire kort, så de står på én række."] },
      { t: "opgave", h: "Find fejlen med debuggeren", projekt: "SkadeApp-oevelse",
        md: "I kopien `SkadeApp-oevelse`: erstat metoden `HentAlleAsync` i `Services/KundeService.cs` med koden herunder. Den har en fejl. Start appen: kundelisten viser 0 skader og 0,00 kr. udbetalt for alle kunder. Find ud af hvorfor med debuggeren, og ret fejlen.",
        start: R`public async Task<List<Kunde>> HentAlleAsync()
{
    using var db = _factory.CreateDbContext();
    var kunder = await db.Kunder.ToListAsync();
    return kunder;
}`,
        krav: ["Du har sat et breakpoint på linjen `return kunder;` og startet appen med debuggeren", "Du har set i Locals (Visual Studio) eller Threads & Variables (Rider), at hver kundes `Skader` har Count = 0", "Du har rettet metoden, så skaderne bliver hentet med", "Kundelisten viser igen det rigtige antal skader og beløb"],
        tip: ["{{Start med F5 (Start Debugging) i Visual Studio.||Start med Debug-knappen (den grønne bille) i Rider.}} Åbn siden Kunder, så stopper appen ved dit breakpoint.", "Fold `kunder` ud, og så en kunde og dens `Skader`. Sammenlign med `HentAsync` lige under: hvad står der dér, som mangler her?", "Uden `Include(k => k.Skader)` henter EF Core kun kunderne, ikke deres skader."],
        loesning: R`public async Task<List<Kunde>> HentAlleAsync()
{
    using var db = _factory.CreateDbContext();
    var kunder = await db.Kunder.Include(k => k.Skader).ToListAsync();
    return kunder;
}`, fri: true, frag: true,
        fordi: "EF Core henter kun det, man beder om. Det er en god ting at kunne forklare: `Include` laver en JOIN, så skaderne kommer med i samme forespørgsel." }
    ] }

);
})();
