// Modul 30, del 2 (eksamenstræning): forklar din egen SkadeApp. Fil 1 af 2: lektion E0–E7.
// Lå før 31/10-2026 som sit eget modul (m31). Lektions-id'erne m31l… er beholdt, så fremskridt og repetition virker.
// Træner det, den mundtlige eksamen tester: at forklare og forsvare Peters AFLEVEREDE kode
// (C#  Ekasmen\min eksamen\SkadeApp, commit d359baa, afleveret 30/10-2026). Kodeuddragene er hans egne,
// kun med tomme linjer taget ud. Hans app må ikke ændres: live-ændringerne i værkstedet laves i en kopi.
// Opbygning efter forskningen i læring: forklaret eksempel (laes med noter) → hent selv frem (valg, udfyld, orden,
// fejl, forudsig) → forklar højt som til eksamen (forklar). Alle øvelser kommer igen i Repetition og i Test.
(function () {
const R = String.raw;

// Peters klasser, som de står i hans app (uden attributter og namespace), så programmerne kan køre
const MODELLER = R`
class Kunde
{
    public int Id { get; set; }
    public string Navn { get; set; } = "";
    public List<Skade> Skader { get; set; } = new();
    public decimal Udbetalt => Skader.Where(s => s.Status == SkadeStatus.Godkendt).Sum(s => s.Beloeb);
    public int AabneSkader => Skader.Count(s => s.ErAaben);
}

class Skade
{
    public int Id { get; set; }
    public DateTime Dato { get; set; } = DateTime.Today;
    public decimal Beloeb { get; set; }
    public SkadeStatus Status { get; set; } = SkadeStatus.Anmeldt;
    public bool ErAaben => Status == SkadeStatus.Anmeldt || Status == SkadeStatus.Behandles;
}

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`;

var m = window.KURSUS.filter(function (x) { return x.id === "m30"; })[0];
if (!m) return;

m.lektioner.push(

  // ------------------------------------------------------------------
  { id: "m31l0", nr: "E0", afsnit: "Del 2 · Eksamenstræning (1.–5. november)", titel: "Sådan træner du til den mundtlige eksamen", min: 10,
    ord: [
      ["Oplæg", "Den første del af eksamen, hvor du selv præsenterer dit projekt. Ca. 10 minutter."],
      ["Votering", "Når censor og eksaminator taler om karakteren uden dig. Bagefter får du karakteren."],
      ["Helhedsvurdering", "Karakteren gives for det hele på én gang: produktet, dispositionen og det, du siger til eksamen."]
    ],
    trin: [
      { t: "laes", h: "Sådan foregår eksamen",
        md: "Del 2 træner det, eksamen tester. Hver lektion tager én del af **din afleverede kode**, som den står i dine filer, og spørger dig om den: hvad gør linjen, hvad sker der, når man klikker, og hvordan siger du det til censor. Din afleverede app skal ikke ændres. Ændringerne i værkstedet laver du i en kopi.\n\nEksamen tager 30 minutter og foregår på Zoom:\n\n- **Ca. 10 minutter oplæg:** du viser appen og fortæller om den. Dispositionen er din køreplan.\n- **Ca. 15 minutter samtale:** censor og eksaminator spørger til din kode og til teorien bag den.\n- **Resten af tiden er votering:** de taler om karakteren uden dig, og så får du den.\n\nKarakteren er en **helhedsvurdering** af produktet, dispositionen og det, du siger." },
      { t: "valg", q: "Hvad bliver karakteren til den mundtlige eksamen givet for?",
        svar: ["En helhedsvurdering af produktet, dispositionen og det, du siger til eksamen", "Kun koden i zip-filen", "Kun præsentationen", "Hvor mange linjer kode appen har"],
        ret: 0, fordi: "Produkt, disposition og mundtlig præstation vurderes samlet. Derfor betyder det meget, at du kan forklare det, du har lavet." },
      { t: "laes", h: "Det, der virker, når man skal huske",
        md: "Forskning i læring peger på fire ting, der virker, også for studerende med ADHD:\n\n- **Svar, før du ser svaret.** At hente svaret frem selv lærer dig mere end at læse det igen.\n- **Kom igen næste dag.** Det, du øver over flere dage, sidder bedre end det, du øver mange gange på én dag.\n- **Bland emnerne.** Når spørgsmålene kommer i blandet rækkefølge, øver du at finde det rigtige svar, ligesom til eksamen.\n- **Forklar hvorfor.** Når du siger, hvorfor koden er skrevet sådan, hænger det fast i det, du allerede ved.\n\nDerfor er del 2 bygget af spørgsmål om din egen kode. Spørgsmålene kommer igen under **Repetition**, og du kan blande dem under **Test**." },
      { t: "laes", h: "Tre regler for dig",
        md: "- **Svar højt.** Eksamen er mundtlig, så øv det på samme måde: sig svaret med din stemme, eller skriv stikord. Det, du selv siger, husker du bedre end det, du kun læser.\n- **Peg i koden.** Til eksamen deler du skærm. Du skal ikke kunne ordene udenad: åbn filen, peg på linjen, og sig, hvad den gør.\n- **Korte runder.** 25 minutter og så 5 minutters pause. Når hovedet er fyldt, stopper du for i dag. Træt læring sidder ikke fast." },
      { t: "valg", q: "Censor spørger: \"Hvordan henter du kunderne fra databasen?\" Du kan ikke komme på metodenavnet. Hvad er det bedste at gøre?",
        svar: ["Åbne `KundeService.cs`, pege på metoden og forklare, hvad linjerne gør", "Sige, at du ikke ved det", "Gætte på et navn", "Tale om noget andet"],
        ret: 0, fordi: "Censor vil se, at du forstår din kode. Det er helt i orden at sige: \"Jeg kan ikke lige komme på ordet, men det er den her linje, og den gør …\"." },
      { t: "valg", q: "Du øvede 10 spørgsmål i dag og fik 6 rigtige. Hvad er det klogeste at gøre i morgen?",
        svar: ["Tage spørgsmålene igen, især dem, du fik forkert", "Læse de rigtige svar igennem tre gange i aften og så lade dem være", "Aldrig se dem igen, nu har du set dem", "Gemme dem til aftenen før eksamen"],
        ret: 0, fordi: "At komme igen næste dag og svare selv er det, der virker. Repetition gør det for dig: de svære spørgsmål kommer igen i morgen, de lette om nogle dage." },
      { t: "ide", h: "Gør din app klar til at vise",
        md: "Til eksamen skal appen køre, og koden skal være åben. Gør det én gang nu, så du ved, at det virker. Du ændrer ikke noget i appen.",
        win: ["Åbn `SkadeApp.slnx` i Visual Studio fra mappen `C#  Ekasmen\\min eksamen\\SkadeApp`.", "Kør appen med den grønne pil ▶.", "Log ind med din bruger. Kan du ikke huske den, så opret en ny bruger.", "Klik dig igennem Overblik, Kunder, en kundeside og Skader."],
        mac: ["Åbn din SkadeApp i Rider (`SkadeApp.slnx`).", "Kør appen med den grønne pil ▶.", "Log ind med din bruger. Kan du ikke huske den, så opret en ny bruger.", "Klik dig igennem Overblik, Kunder, en kundeside og Skader."] },
      { t: "forklar", q: "Øv det første svar: fortæl på 3–4 sætninger, hvad SkadeApp er, og hvem den er til.",
        svar: "SkadeApp er et system til sagsbehandlere i et forsikringsselskab. Man kan se kunderne, deres skadesanmeldelser og hvor meget der er udbetalt. En skade går fra anmeldt over behandles til godkendt eller afvist. Kun medarbejdere må se kundernes oplysninger, så appen kræver login. Jeg valgte emnet, fordi jeg har arbejdet seks år i forsikringsbranchen.",
        noegle: ["sagsbehandlere", "kunder", "skader", "status", "login", "forsikring"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m31l1", nr: "E1", titel: "Rundvisning: din app i lag", min: 12,
    ord: [
      ["Lagdelt arkitektur", "Koden er delt i lag, der hver har ét ansvar, fx sider, services og database. Et lag taler kun med laget lige under."]
    ],
    trin: [
      { t: "laes", h: "De fire sider",
        md: "SkadeApp har fire sider, man ser efter login:\n\n- **Overblik** (`Home.razor`): nøgletal, skader pr. status og de fem seneste skader.\n- **Kunder** (`Kunder.razor`): søg i kunderne, og opret en ny.\n- **Kundeside** (`KundeDetaljer.razor`): ret og slet kunden, anmeld en skade, og skift en skades status.\n- **Skader** (`Skader.razor`): alle skader med filter på status og sortering.\n\nLogin-siderne kom med skabelonen, da projektet blev oprettet med **Individual Accounts**." },
      { t: "valg", q: "Censor beder dig vise, hvor man skifter en skades status fra Anmeldt til Godkendt. Hvilken side åbner du?",
        svar: ["Kundesiden (`KundeDetaljer.razor`)", "Overblik (`Home.razor`)", "Skader (`Skader.razor`)", "Kunder (`Kunder.razor`)"],
        ret: 0, fordi: "Rullelisten med status står ved hver skade på kundesiden. Skadesiden viser skaderne, men kan ikke ændre dem." },
      { t: "laes", h: "Tre lag",
        md: "Koden er delt i lag. Hvert lag har ét ansvar, og et lag taler kun med laget lige under det.",
        kode: R`Siderne        Components/Pages    viser data og tager imod klik
   ↓ kalder
Servicene      Services            IKundeService, ISkadeService
   ↓ bruger
Databasen      Data/SkadeContext   EF Core og SQLite (filen Data/skade.db)

Modellerne     Models              Kunde og Skade: bruges af alle lagene
Program.cs                         sætter det hele sammen, når appen starter`,
        sprog: "text",
        md2: "Siderne ved ikke, at der er en database. De kalder bare fx `KundeService.HentAlleAsync()`. Det hedder **lagdelt arkitektur**." },
      { t: "orden", q: "Sæt lagene i rækkefølge: fra det, brugeren klikker på, ned til filen, hvor data ligger.",
        linjer: ["Siden (Kunder.razor)", "Servicen (KundeService)", "DbContext (SkadeContext)", "SQLite-filen (skade.db)"], sprog: "text",
        fordi: "Siden kalder servicen, servicen bruger SkadeContext, og EF Core læser og skriver i SQLite-filen." },
      { t: "valg", q: "Hvorfor kalder dine sider en service i stedet for selv at bruge databasen?",
        svar: ["Så hvert lag har ét ansvar: databasekoden står ét sted og kan genbruges af alle siderne", "Fordi Blazor ikke kan bruge en database", "For at appen bliver hurtigere", "Fordi C# kræver det"],
        ret: 0, fordi: "Skal databasekoden ændres, eller skal et Web API bruge den samme kode, rettes det ét sted: i servicen." },
      { t: "valg", q: "Hvor i din app ligger klassen `Kunde`?",
        svar: ["I mappen `Models`. Den bruges af alle lagene", "I mappen `Components/Pages`", "I `Program.cs`", "I `wwwroot`"],
        ret: 0, fordi: "Modellerne er de ting, appen handler om. Siderne viser dem, servicene henter og gemmer dem, og databasen har en tabel for hver." },
      { t: "orden", q: "En sagsbehandler åbner siden Kunder. Sæt det, der sker, i rækkefølge.",
        linjer: ["Siden starter, og OnInitializedAsync kører", "Siden kalder KundeService.HentAlleAsync()", "Servicen laver en DbContext og spørger databasen", "Kunderne kommer tilbage som en List<Kunde>", "Siden viser kunderne i tabellen"], sprog: "text",
        fordi: "Det er lagene i aktion: siden spørger servicen, servicen spørger databasen, og svaret går samme vej tilbage." },
      { t: "forklar", q: "Censor: \"Hvordan er din app bygget op?\" Svar med lagene.",
        svar: "Appen er lagdelt. Siderne i Components/Pages viser data og tager imod klik. De kender kun interfacene IKundeService og ISkadeService. Servicene i mappen Services er det eneste lag, der taler med databasen, gennem EF Core og en DbContextFactory. Data ligger i en SQLite-fil. Modellerne Kunde og Skade bruges af alle lagene, og Program.cs sætter det hele sammen med dependency injection.",
        noegle: ["lagdelt", "sider", "services", "interface", "EF Core", "SQLite", "dependency injection"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m31l2", nr: "E2", titel: "Modellerne: Kunde og Skade", min: 15,
    ord: [
      ["Data annotations", "Regler i firkantede parenteser over en property, fx [Required]. Formularen tjekker dem, før der gemmes."],
      ["Beregnet property", "En property uden egen værdi i databasen. Den regnes ud, hver gang den læses, fx Udbetalt."],
      ["En-til-mange", "Én række i én tabel hører sammen med mange rækker i en anden: én kunde har mange skader."]
    ],
    trin: [
      { t: "laes", h: "Kunde.cs",
        md: "Sådan står `Kunde` i din app (tomme linjer og et par kommentarer er taget ud). En **klasse** beskriver, hvad én kunde har. Hver linje med `{ get; set; }` er en **property**: en værdi, kunden har.",
        kode: R`public class Kunde
{
    public int Id  { get; set; }

    [Required(ErrorMessage = "Skriv kundens navn")]
    [StringLength(100, ErrorMessage = "Navnet må højst være 100 tegn.")]
    public string Navn  { get; set; } = "";

    [Required(ErrorMessage = "Skriv kundens e-mail")]
    [EmailAddress(ErrorMessage = "Det er ikke en gyldig e-mail.")]
    public string Email  { get; set; } = "";

    [Required(ErrorMessage = "Skriv kundens telefonnummer")]
    // tlf skal være 8 cifre, ikke andet
    [RegularExpression(@"^\d{8}$", ErrorMessage = "Telefonnummeret skal være 8 cifre.")]
    public string Telefon  { get; set; } = "";

    public List<Skade> Skader { get; set; } = new();

    // lægger beløbene sammen for de godkendte skader
    public decimal Udbetalt => Skader.Where(s => s.Status == SkadeStatus.Godkendt).Sum(s => s.Beloeb);

    public int AabneSkader => Skader.Count(s => s.ErAaben);
}`, frag: true,
        noter: [
          ["Id", "Nummeret, databasen kender kunden på (primærnøglen)."],
          ["[Required(...)]", "Feltet skal udfyldes. Teksten vises under feltet, hvis det er tomt."],
          ["[StringLength(100, ...)]", "Højst 100 tegn."],
          ["[EmailAddress(...)]", "Skal ligne en e-mail."],
          ["[RegularExpression(@\"^\\d{8}$\", ...)]", "Præcis 8 cifre: ^ er start, \\d er et ciffer, {8} er otte gange, og $ er slut."],
          ["= \"\"", "Startværdi: en tom tekst i stedet for null."],
          ["List<Skade> Skader", "Kundens skader. Én kunde har mange skader."],
          ["Udbetalt =>", "Regnes ud hver gang: summen af beløbene for de godkendte skader."],
          ["AabneSkader =>", "Tæller de skader, der er åbne."]
        ] },
      { t: "valg", q: "I `Kunde` står `[Required(ErrorMessage = \"Skriv kundens navn\")]` over `Navn`. Hvad sker der, hvis brugeren trykker **Opret kunde** med et tomt navnefelt?",
        svar: ["Kunden bliver ikke oprettet, og teksten \"Skriv kundens navn\" står under feltet", "Kunden bliver oprettet uden navn", "Appen går ned", "Navnet bliver sat til \"Skriv kundens navn\""],
        ret: 0, fordi: "`DataAnnotationsValidator` i formularen tjekker reglerne, og `OnValidSubmit` kører kun, når alle regler er overholdt." },
      { t: "valg", q: "Telefonnummeret skal passe på det regulære udtryk `^\\d{8}$`. Hvilket nummer bliver godkendt?",
        svar: ["`12345678`", "`1234 5678`", "`+4512345678`", "`1234567`"],
        ret: 0, fordi: "Præcis otte cifre og intet andet. Mellemrum, et plus og syv cifre bliver afvist." },
      { t: "laes", h: "Skade.cs",
        md: "`Skade` har sine egne properties og to **enums**: faste lister med de eneste lovlige værdier.",
        kode: R`public class Skade
{
    public int  Id { get; set; }
    public DateTime Dato  { get; set; } = DateTime.Today;
    public SkadeType Type { get; set; } = SkadeType.Indbo;

    [Required(ErrorMessage = "Beskriv skaden")]
    [StringLength(500, ErrorMessage = "Beskrivelsen må højst være 500 tegn.")]
    public string Beskrivelse { get; set; } = "";

    [Range(1, 10_000_000, ErrorMessage = "Beløbet skal være mellem 1 og 10.000.000 kr." )]
    public decimal Beloeb { get; set; }

    public SkadeStatus Status { get; set; } = SkadeStatus.Anmeldt;

    // hvilken kunde skaden hører til
    public int KundeId { get; set; }
    public Kunde? Kunde { get; set; }

    // åben = anmeldt eller under behandling
    public bool ErAaben => Status == SkadeStatus.Anmeldt || Status == SkadeStatus.Behandles;
}

public enum SkadeType { Bil, Indbo, Rejse, Ulykke }

public enum SkadeStatus {Anmeldt, Behandles, Godkendt, Afvist }`, frag: true,
        noter: [
          ["= DateTime.Today", "En ny skade får dagens dato fra start."],
          ["decimal Beloeb", "decimal bruges til penge, fordi den regner præcist med decimaler."],
          ["[Range(1, 10_000_000, ...)]", "Beløbet skal være mellem 1 og 10 millioner. Understregerne gør bare tallet lettere at læse."],
          ["int KundeId", "Fremmednøglen: nummeret på den kunde, skaden hører til."],
          ["Kunde? Kunde", "Navigation property: selve kunden. ? betyder, at den kan være null, fx hvis den ikke er hentet med."],
          ["ErAaben =>", "Sand, hvis status er Anmeldt eller Behandles."],
          ["enum SkadeStatus", "De fire lovlige statusser. I databasen gemmes de som tal: Anmeldt = 0, Behandles = 1, Godkendt = 2, Afvist = 3."]
        ] },
      { t: "udfyld", q: "Skriv de manglende ord i `Udbetalt`, så den lægger beløbene sammen for de godkendte skader.",
        kode: R`public decimal Udbetalt => Skader.[[Where]](s => s.Status == SkadeStatus.[[Godkendt]]).[[Sum]](s => s.Beloeb);`, frag: true,
        fordi: "`Where` beholder de godkendte skader, og `Sum` lægger deres `Beloeb` sammen." },
      { t: "fejl", q: "Mette har én godkendt skade på 4.500 kr. og én skade under behandling på 18.750 kr. Programmet skulle skrive, hvor meget hun har fået udbetalt (4.500,00 kr.), men det skriver 18.750,00 kr. Klik på linjen med fejlen.",
        kode: R`var mette = new Kunde();
mette.Skader.Add(new Skade { Beloeb = 4500m, Status = SkadeStatus.Godkendt });
mette.Skader.Add(new Skade { Beloeb = 18750m, Status = SkadeStatus.Behandles });
Console.WriteLine(mette.Udbetalt.ToString("C"));

class Kunde
{
    public List<Skade> Skader { get; set; } = new();
    public decimal Udbetalt => Skader.Where(s => s.Status == SkadeStatus.Behandles).Sum(s => s.Beloeb);
}

class Skade
{
    public decimal Beloeb { get; set; }
    public SkadeStatus Status { get; set; } = SkadeStatus.Anmeldt;
}

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`,
        linje: 9, logisk: true, output: "18.750,00 kr.", rettetOutput: "4.500,00 kr.",
        fordi: "`Udbetalt` skal kun tælle de godkendte skader. Her tæller den dem, der er under behandling.",
        rettet: R`var mette = new Kunde();
mette.Skader.Add(new Skade { Beloeb = 4500m, Status = SkadeStatus.Godkendt });
mette.Skader.Add(new Skade { Beloeb = 18750m, Status = SkadeStatus.Behandles });
Console.WriteLine(mette.Udbetalt.ToString("C"));

class Kunde
{
    public List<Skade> Skader { get; set; } = new();
    public decimal Udbetalt => Skader.Where(s => s.Status == SkadeStatus.Godkendt).Sum(s => s.Beloeb);
}

class Skade
{
    public decimal Beloeb { get; set; }
    public SkadeStatus Status { get; set; } = SkadeStatus.Anmeldt;
}

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }` },
      { t: "fejl", q: "`ErAaben` skal være sand, når en skade er Anmeldt eller Behandles. Programmet tæller de åbne skader blandt én anmeldt og én godkendt skade. Det skulle skrive 1, men skriver 0. Klik på linjen med fejlen.",
        kode: R`var skader = new List<Skade>
{
    new Skade { Status = SkadeStatus.Anmeldt },
    new Skade { Status = SkadeStatus.Godkendt }
};
Console.WriteLine(skader.Count(s => s.ErAaben));

class Skade
{
    public SkadeStatus Status { get; set; }
    public bool ErAaben => Status == SkadeStatus.Anmeldt && Status == SkadeStatus.Behandles;
}

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`,
        linje: 11, logisk: true, output: "0", rettetOutput: "1",
        fordi: "`&&` betyder \"og\": status skulle være Anmeldt og Behandles på samme tid, og det kan den aldrig. Det skal være `||` (eller), som i din app.",
        rettet: R`var skader = new List<Skade>
{
    new Skade { Status = SkadeStatus.Anmeldt },
    new Skade { Status = SkadeStatus.Godkendt }
};
Console.WriteLine(skader.Count(s => s.ErAaben));

class Skade
{
    public SkadeStatus Status { get; set; }
    public bool ErAaben => Status == SkadeStatus.Anmeldt || Status == SkadeStatus.Behandles;
}

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }` },
      { t: "forudsig", q: "Det er dine startdata for Peter Bangsmann: en godkendt skade på 6.200 kr. og en afvist skade på 7.999 kr. Klasserne er de samme som i din app. Hvad skriver programmet?",
        kode: R`var peter = new Kunde { Navn = "Peter Bangsmann" };
peter.Skader.Add(new Skade { Beloeb = 6200m, Status = SkadeStatus.Godkendt });
peter.Skader.Add(new Skade { Beloeb = 7999m, Status = SkadeStatus.Afvist });
Console.WriteLine(peter.Udbetalt.ToString("C"));
Console.WriteLine(peter.AabneSkader);`,
        omkring: ["", MODELLER],
        output: "6.200,00 kr.\n0",
        fordi: "Kun den godkendte skade tæller med i `Udbetalt`. Ingen af skaderne er Anmeldt eller Behandles, så `AabneSkader` er 0." },
      { t: "valg", q: "Hvordan ved EF Core, at en skade hører til en bestemt kunde?",
        svar: ["`Skade` har `KundeId`, og `Kunde` har en liste `Skader`. Ud fra navnene laver EF Core en fremmednøgle", "Det står i `Program.cs`", "Skaden gemmes inde i kundens række", "Det ved EF Core ikke"],
        ret: 0, fordi: "Det er en en-til-mange-relation: én kunde, mange skader. Navnet `KundeId` (klassens navn + Id) er nok til, at EF Core forstår det." },
      { t: "forklar", q: "Censor: \"Fortæl om dine modeller, og hvordan de hænger sammen.\"",
        svar: "Jeg har to modeller, Kunde og Skade. En kunde har navn, e-mail og telefon og en liste med sine skader. En skade har dato, type, beskrivelse, beløb og status, og KundeId, som peger på kunden. Det er en en-til-mange-relation. Type og status er enums. Reglerne står som data annotations, fx et regulært udtryk, der kræver 8 cifre i telefonnummeret. Udbetalt og AabneSkader er beregnede properties, som regner med LINQ.",
        noegle: ["Kunde", "Skade", "KundeId", "en-til-mange", "enum", "data annotations", "beregnet", "LINQ"] },
      { t: "forklar", q: "Censor: \"Hvorfor bruger du decimal og ikke double til beløbet?\"",
        svar: "Fordi beløbet er penge. decimal regner præcist med decimaler, mens double kan give små afrundingsfejl. Fx bliver 0,1 + 0,2 ikke præcis 0,3 med double. Til penge skal tallene være præcise.",
        noegle: ["decimal", "penge", "præcis", "double", "afrunding"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m31l3", nr: "E3", titel: "Databasen: SkadeContext, SQLite og startdata", min: 12,
    ord: [
      ["Startdata", "Rækker, der lægges i databasen, når den bliver lavet, så der er noget at se fra start. I EF Core med HasData."],
      ["EnsureCreated", "Laver databasen med tabeller og startdata, hvis den ikke findes. Findes den, gør den ingenting."]
    ],
    trin: [
      { t: "laes", h: "SkadeContext.cs",
        md: "`SkadeContext` er broen mellem dine klasser og databasen. EF Core bruger den til at lave tabellerne og til at hente og gemme. Startdataene er forkortet her: der er fire kunder og syv skader i din fil.",
        kode: R`public class SkadeContext : DbContext
{
    public SkadeContext(DbContextOptions<SkadeContext> options) : base(options)
    {
    }

    public DbSet<Kunde> Kunder { get; set; }
    public DbSet<Skade> Skader { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // startdata så der er noget at se første gang
        modelBuilder.Entity<Kunde>().HasData(
            new Kunde { Id = 1, Navn = "Mette Jensen", Email = "Mette@eksempel.com", Telefon = "12345678" },
            new Kunde { Id = 2, Navn = "Peter Bangsmann", Email = "Peter@eksempel.com", Telefon = "88888888" }
        );
        modelBuilder.Entity<Skade>().HasData(
            new Skade { Id = 1, KundeId = 1, Dato = new DateTime(2026, 8, 14), Type = SkadeType.Bil, Beskrivelse = "Ridse i døren efter parkering", Beloeb = 4500m, Status = SkadeStatus.Godkendt }
        );
    }
}`, frag: true,
        noter: [
          [": DbContext", "Arver fra EF Cores DbContext. Så kan klassen tale med databasen."],
          ["SkadeContext(DbContextOptions<SkadeContext> options) : base(options)", "Konstruktøren får indstillingerne (SQLite og hvilken fil) fra Program.cs og sender dem videre til DbContext."],
          ["DbSet<Kunde> Kunder", "Bliver til tabellen Kunder. Gennem den henter og gemmer du kunder."],
          ["OnModelCreating", "Kører, når EF Core bygger sin model af databasen. Her lægges startdataene ind."],
          ["HasData(...)", "Startdata. Id skal skrives med."]
        ] },
      { t: "valg", q: "Hvad bliver `public DbSet<Skade> Skader { get; set; }` i `SkadeContext` til i databasen?",
        svar: ["Tabellen `Skader`", "En ny database", "En side i appen", "En kolonne i tabellen Kunder"],
        ret: 0, fordi: "Hver `DbSet` bliver til en tabel, og hver property i `Skade` bliver til en kolonne." },
      { t: "valg", q: "Hvorfor står `Id = 1`, `Id = 2` osv. med i dine startdata (`HasData`)?",
        svar: ["EF Core kræver, at startdata har primærnøglen med, så den ved, hvilke rækker der er dens", "Ellers bliver kunderne sorteret forkert", "Det er kun pynt", "Fordi SQLite ikke kan tælle"],
        ret: 0, fordi: "Uden Id giver EF Core en fejl, når den bygger modellen: startdata skal have en primærnøgle, der ikke er 0." },
      { t: "valg", q: "Med dine startdata: hvor mange skader har status Godkendt?",
        svar: ["3", "2", "4", "1"],
        ret: 0, fordi: "Ridsen i døren (4.500 kr.), kufferten i lufthavnen (6.200 kr.) og stenslaget i forruden (3.200 kr.)." },
      { t: "forudsig", q: "Overblik viser **Udbetalt i alt**: summen af alle godkendte skader. Her er de tre godkendte beløb fra dine startdata. Hvad skriver programmet?",
        kode: R`decimal[] godkendte = { 4500m, 6200m, 3200m };
Console.WriteLine(godkendte.Sum().ToString("C"));`,
        output: "13.900,00 kr.",
        fordi: "4.500 + 6.200 + 3.200 = 13.900. `ToString(\"C\")` viser tallet som kroner." },
      { t: "laes", h: "SQLite og EnsureCreated",
        md: "Databasen er én fil: `Data/skade.db`. Det er **SQLite**, en database uden server. Derfor kan censor køre din zip-fil uden at installere noget.\n\nI `Program.cs` står `db.Database.EnsureCreated();`. Den laver databasen med tabeller og startdata, hvis filen ikke findes. Findes filen, gør den ingenting.\n\nForbindelserne står i `appsettings.json`:",
        kode: R`"ConnectionStrings": {
    "DefaultConnection": "DataSource=Data/app.db;Cache=Shared",
    "SkadeDb": "Data Source=Data/skade.db"
}`, sprog: "text",
        noter: [
          ["DefaultConnection", "Login-databasen med brugere og kodeord: Data/app.db."],
          ["SkadeDb", "Din database med kunder og skader: Data/skade.db."]
        ] },
      { t: "valg", q: "Du tilføjer en ny property, `Adresse`, til `Kunde` og starter appen igen. Filen `skade.db` findes allerede. Hvad sker der, når kundelisten hentes?",
        svar: ["Der kommer en fejl, fordi tabellen Kunder ikke har kolonnen Adresse. EnsureCreated laver ikke en database om, der allerede findes", "EnsureCreated tilføjer selv kolonnen", "Adresse bliver bare tom", "Appen sletter databasen og laver en ny"],
        ret: 0, fordi: "EnsureCreated laver kun databasen, når den ikke findes. Man må slette `skade.db` og miste data, eller bruge migrations, der ændrer databasen trin for trin. Det er en af rettelserne i din disposition." },
      { t: "valg", q: "Hvorfor valgte du SQLite og ikke SQL Server, som underviseren brugte?",
        svar: ["Hele databasen er én fil, så appen kan køres uden at installere en databaseserver, også af censor", "SQLite er bedst til store systemer", "SQL Server virker ikke med Blazor", "SQLite kræver ikke en DbContext"],
        ret: 0, fordi: "Med SQL Server skulle censor have en databaseserver kørende. Med SQLite følger databasen med som en fil." },
      { t: "forklar", q: "Censor: \"Hvad er EF Core, og hvad bruger du det til?\"",
        svar: "EF Core er en ORM: den oversætter mellem mine C#-klasser og tabellerne i databasen, så jeg ikke selv skriver SQL. SkadeContext arver fra DbContext og har en DbSet for kunder og en for skader, som bliver til tabellerne. Når jeg kalder SaveChangesAsync, laver EF Core selv SQL'en og gemmer ændringerne. Startdataene ligger i OnModelCreating med HasData.",
        noegle: ["ORM", "DbContext", "DbSet", "tabeller", "SaveChangesAsync", "HasData"] },
      { t: "forklar", q: "Censor: \"Hvorfor EnsureCreated og ikke migrations?\"",
        svar: "Projektet er lille, og databasen er én SQLite-fil, så EnsureCreated var nok: den laver databasen første gang, og censor kan køre appen uden ekstra værktøjer. Ulempen er, at den ikke kan ændre en database, der findes. Tilføjer jeg en property, skal databasen slettes, og så forsvinder data. I et rigtigt system ville jeg bruge migrations, som ændrer databasen trin for trin og beholder data.",
        noegle: ["EnsureCreated", "migrations", "SQLite", "slettes", "data"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m31l4", nr: "E4", titel: "Services: interface, async og dependency injection", min: 15,
    ord: [
      ["Løs kobling", "Når en del af koden kun kender et interface og ikke klassen bag. Så kan klassen skiftes ud uden at ændre resten."],
      ["DbContextFactory", "En fabrik, der laver en ny DbContext, hver gang man beder om det. Bruges i Blazor Server."]
    ],
    trin: [
      { t: "laes", h: "Interfacet: et løfte",
        md: "Et **interface** er en liste over metoder, som en klasse lover at have. `IKundeService` siger, hvad man kan med kunder, men ikke hvordan det gøres.",
        kode: R`public interface IKundeService
{
    Task<List<Kunde>> HentAlleAsync();
    Task<Kunde?> HentAsync(int id);
    Task OpretAsync(Kunde kunde);
    Task OpdaterAsync(Kunde kunde);
    Task SletAsync(int id);
}`, frag: true,
        noter: [
          ["Task<List<Kunde>>", "Metoden er async og giver en liste med kunder, når den er færdig."],
          ["Task<Kunde?>", "Giver én kunde, eller null, hvis den ikke findes."],
          ["Task", "Async uden et resultat: metoden gør noget og er så færdig."]
        ] },
      { t: "laes", h: "KundeService: sådan holdes løftet",
        md: "`KundeService` er klassen, der faktisk gør arbejdet. `: IKundeService` betyder, at den holder løftet. Her er de første metoder fra din fil.",
        kode: R`public class KundeService : IKundeService
{
    private readonly IDbContextFactory<SkadeContext> _factory;

    public KundeService(IDbContextFactory<SkadeContext> factory)
    {
        _factory = factory;
    }

    // henter alle kunder, Include tager deres skader med
    public async Task<List<Kunde>> HentAlleAsync()
    {
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
}`, frag: true,
        noter: [
          ["private readonly IDbContextFactory<SkadeContext> _factory;", "Fabrikken, der laver en ny DbContext. readonly: den sættes kun i konstruktøren."],
          ["public KundeService(IDbContextFactory<SkadeContext> factory)", "Konstruktøren. Fabrikken bliver givet udefra af dependency injection."],
          ["using var db = _factory.CreateDbContext();", "En ny, kort forbindelse til databasen. using lukker den igen, når metoden er færdig."],
          ["Include(k => k.Skader)", "Hent også kundernes skader. Uden den er listen Skader tom."],
          ["await ... ToListAsync()", "Vent på databasen uden at låse appen, og lav resultatet om til en liste."],
          ["FirstOrDefaultAsync(k => k.Id == id)", "Den første kunde med det Id, eller null."],
          ["db.Kunder.Add(kunde); await db.SaveChangesAsync();", "Læg kunden til, og gem i databasen."]
        ] },
      { t: "valg", q: "Hvorfor bruger dine sider `IKundeService` og ikke `KundeService` direkte?",
        svar: ["Så siderne kun afhænger af løftet. Klassen bag kan skiftes ud, uden at siderne skal ændres", "Fordi en klasse ikke kan bruges i en Razor-side", "Det gør appen hurtigere", "Fordi KundeService er privat"],
        ret: 0, fordi: "Det hedder løs kobling. Fx kunne en test bruge en falsk service med faste kunder i stedet for databasen." },
      { t: "udfyld", q: "Hent alle kunder **med deres skader**, som i din `HentAlleAsync`. Skriv de manglende ord.",
        kode: R`using var db = _factory.[[CreateDbContext]]();
return await db.Kunder.[[Include]](k => k.Skader).[[ToListAsync]]();`, frag: true,
        fordi: "`CreateDbContext` laver forbindelsen, `Include` tager skaderne med, og `ToListAsync` henter det hele som en liste." },
      { t: "valg", q: "Hvad betyder `await` i `return await db.Kunder.Include(k => k.Skader).ToListAsync();`?",
        svar: ["Vent på, at databasen svarer, uden at låse appen, mens der ventes", "Gør databasen hurtigere", "Gentag linjen, til den virker", "Gem kunderne"],
        ret: 0, fordi: "Mens databasen arbejder, kan appen tage sig af andet. Når svaret kommer, fortsætter metoden på næste linje." },
      { t: "fejl", q: "Brugeren vælger **Afvist** i rullelisten, men skaden bliver altid Godkendt. Her er metoden fra servicen. Klik på linjen med fejlen.",
        kode: R`public async Task SkiftStatusAsync(int id, SkadeStatus status)
{
    using var db = _factory.CreateDbContext();
    var skade = await db.Skader.FindAsync(id);
    if (skade == null) return;

    skade.Status = SkadeStatus.Godkendt;
    await db.SaveChangesAsync();
}`, frag: true, linje: 7,
        fordi: "Metoden får den valgte status i parameteren `status`, men bruger den ikke. Linjen skal være `skade.Status = status;`, som i din app.",
        rettet: R`public async Task SkiftStatusAsync(int id, SkadeStatus status)
{
    using var db = _factory.CreateDbContext();
    var skade = await db.Skader.FindAsync(id);
    if (skade == null) return;

    skade.Status = status;
    await db.SaveChangesAsync();
}` },
      { t: "orden", q: "Sæt linjerne i din `OpdaterAsync` i rækkefølge, så den finder den gemte kunde, retter den og gemmer.",
        linjer: [R`using var db = _factory.CreateDbContext();`, R`var gemt = await db.Kunder.FindAsync(kunde.Id);`, R`if (gemt == null) return;`, R`gemt.Navn = kunde.Navn;`, R`gemt.Email = kunde.Email;`, R`gemt.Telefon = kunde.Telefon;`, R`await db.SaveChangesAsync();`],
        alt: [[0, 1, 2, 3, 5, 4, 6], [0, 1, 2, 4, 3, 5, 6], [0, 1, 2, 4, 5, 3, 6], [0, 1, 2, 5, 3, 4, 6], [0, 1, 2, 5, 4, 3, 6]], frag: true,
        fordi: "Først forbindelsen, så findes kunden, så stoppes der, hvis den ikke findes. De tre linjer, der retter navn, e-mail og telefon, må stå i vilkårlig rækkefølge. Til sidst gemmes det." },
      { t: "laes", h: "Dependency injection i Program.cs",
        md: "Siderne laver aldrig selv en `KundeService`. De beder om en `IKundeService`, og appen giver dem en. Det hedder **dependency injection**. Aftalen står i `Program.cs`:",
        kode: R`// min database med kunder og skader
builder.Services.AddDbContextFactory<SkadeContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("SkadeDb")));
// mine services (dependency injection)
builder.Services.AddScoped<IKundeService, KundeService>();
builder.Services.AddScoped<ISkadeService, SkadeService>();`, frag: true,
        noter: [
          ["AddDbContextFactory<SkadeContext>", "Registrér en fabrik, der kan lave SkadeContext-objekter. UseSqlite med forbindelsen SkadeDb."],
          ["AddScoped<IKundeService, KundeService>()", "Når nogen beder om IKundeService, så giv dem en KundeService. Scoped: én pr. forbindelse, i Blazor Server altså én pr. bruger, der har appen åben."]
        ],
        md2: "På en side står fx `@inject IKundeService KundeService`. Så har siden en `KundeService`, den kan kalde." },
      { t: "valg", q: "Hvorfor laver hver metode i din service sin egen DbContext med `_factory.CreateDbContext()`?",
        svar: ["I Blazor Server lever en side længe. Microsoft anbefaler en ny, kort DbContext til hver handling, så to handlinger ikke bruger den samme samtidig", "Fordi SQLite kun kan have én tabel pr. DbContext", "For at koden bliver længere", "Fordi en DbContext ikke kan bruges to gange i C#"],
        ret: 0, fordi: "En DbContext må ikke bruges af to ting på samme tid. Med en ny og kort DbContext til hver metode kan det ikke ske." },
      { t: "forklar", q: "Censor: \"Hvad er dependency injection, og hvor bruger du det?\"",
        svar: "Dependency injection betyder, at en klasse får de ting, den skal bruge, udefra i stedet for selv at lave dem. I Program.cs registrerer jeg AddScoped<IKundeService, KundeService>. Siderne beder om IKundeService med @inject, og KundeService får selv en DbContextFactory gennem sin konstruktør. Fordelen er løs kobling: siderne kender kun interfacet, så klassen bag kan skiftes ud, fx i en test.",
        noegle: ["udefra", "Program.cs", "AddScoped", "@inject", "konstruktør", "interface", "løs kobling"] },
      { t: "forklar", q: "Censor: \"Hvorfor bruger du AddDbContextFactory og ikke AddDbContext?\"",
        svar: "I Blazor Server lever en side og dens forbindelse længe, og en DbContext må ikke bruges af to ting på samme tid. Derfor laver hver metode i servicen sin egen korte DbContext med CreateDbContext og lukker den igen med using. Det er det, Microsoft anbefaler til Blazor Server, og det samme, som underviseren gjorde i sit Blazor-eksempel.",
        noegle: ["Blazor Server", "lever længe", "samme tid", "CreateDbContext", "using", "Microsoft"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m31l5", nr: "E5", titel: "Program.cs: når appen starter", min: 12,
    ord: [
      ["Kultur", "Indstillingen for sprog og formater: decimaltegn, tusindtalsskilletegn, valuta og datoer. Dansk er da-DK."]
    ],
    trin: [
      { t: "laes", h: "Dansk format på beløb",
        md: "Øverst i din `Program.cs` sætter du **kulturen** til dansk.",
        kode: R`// dansk format på beløb (kr.)
CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("da-DK");
CultureInfo.DefaultThreadCurrentUICulture = new CultureInfo("da-DK");`, frag: true,
        noter: [
          ["new CultureInfo(\"da-DK\")", "Dansk: komma som decimaltegn, punktum mellem tusinder og kr. efter beløbet."],
          ["DefaultThreadCurrentCulture", "Gælder tal, datoer og beløb i hele appen, uanset hvad computeren står på."]
        ],
        md2: "Derfor skriver `ToString(\"C\")` fx `4.500,00 kr.`" },
      { t: "forudsig", q: "Kulturen er dansk, som i din app. Hvad skriver programmet?",
        kode: R`decimal beloeb = 18750m;
Console.WriteLine(beloeb.ToString("C"));`,
        output: "18.750,00 kr.",
        fordi: "Dansk format: punktum mellem tusinder, komma før decimalerne og kr. bagefter." },
      { t: "valg", q: "Censors computer står på engelsk. Hvordan bliver beløbene vist i din app?",
        svar: ["Som danske kroner, fx 4.500,00 kr., fordi appen selv sætter kulturen i Program.cs", "Som dollars", "Appen går ned", "Som 4,500.00, fordi linjen kun virker på danske computere"],
        ret: 0, fordi: "Det er netop derfor, linjen står der: beløbene ser ens ud på alle computere." },
      { t: "laes", h: "Når appen er bygget",
        md: "`Program.cs` kører oppefra og ned, når appen starter. Først registreres alle tjenesterne. Så bygges appen, og databaserne laves, hvis de ikke findes.",
        kode: R`var app = builder.Build();
// laver databaserne hvis de ikke findes
using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<ApplicationDbContext>().Database.EnsureCreated();

    var factory = scope.ServiceProvider.GetRequiredService<IDbContextFactory<SkadeContext>>();
    using var db = factory.CreateDbContext();
    db.Database.EnsureCreated();
}`, frag: true,
        noter: [
          ["var app = builder.Build();", "Nu er alle registreringer færdige, og appen bygges."],
          ["app.Services.CreateScope()", "Et lille område, hvor man kan hente tjenester, før appen kører."],
          ["GetRequiredService<ApplicationDbContext>().Database.EnsureCreated()", "Lav login-databasen (app.db), hvis den ikke findes."],
          ["GetRequiredService<IDbContextFactory<SkadeContext>>()", "Hent fabrikken, og lav en SkadeContext med den."],
          ["db.Database.EnsureCreated()", "Lav skade.db med tabeller og startdata, hvis den ikke findes."]
        ] },
      { t: "orden", q: "Sæt det, der sker, når appen starter, i den rækkefølge, det står i din `Program.cs`.",
        linjer: ["Kulturen sættes til dansk", "builder laves med WebApplication.CreateBuilder", "Tjenesterne registreres: Blazor, login, databaser og dine services", "Appen bygges med builder.Build()", "Databaserne laves, hvis de ikke findes (EnsureCreated)", "Appen starter og venter på besøg med app.Run()"], sprog: "text",
        fordi: "Alt skal være registreret, før appen bygges, og databaserne skal findes, før den første side åbnes." },
      { t: "fejl", q: "Appen kan ikke bygges. Compileren siger, at der ikke er nogen konvertering fra `SkadeService` til `IKundeService`. Klik på linjen med fejlen.",
        kode: R`builder.Services.AddDbContextFactory<SkadeContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("SkadeDb")));
builder.Services.AddScoped<IKundeService, SkadeService>();
builder.Services.AddScoped<ISkadeService, SkadeService>();`, frag: true, linje: 3,
        fordi: "`SkadeService` holder løftet `ISkadeService`, ikke `IKundeService`. Til `IKundeService` hører `KundeService`.",
        rettet: R`builder.Services.AddDbContextFactory<SkadeContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("SkadeDb")));
builder.Services.AddScoped<IKundeService, KundeService>();
builder.Services.AddScoped<ISkadeService, SkadeService>();` },
      { t: "valg", q: "Du sletter linjen `builder.Services.AddScoped<IKundeService, KundeService>();` og starter appen. Hvad sker der, når du åbner siden Kunder?",
        svar: ["Der kommer en fejl: appen kan ikke give siden en IKundeService, fordi ingen har sagt, hvilken klasse der skal bruges", "Siden virker som før", "Kunderne bliver vist uden skader", "Appen laver selv en KundeService"],
        ret: 0, fordi: "Blazor siger, at der ikke er registreret nogen tjeneste af typen IKundeService. Uden registreringen ved appen ikke, hvad den skal give siden." },
      { t: "forklar", q: "Censor: \"Hvad sker der i din Program.cs?\"",
        svar: "Program.cs kører, når appen starter. Først sætter jeg kulturen til dansk, så beløb vises som kroner. Så registrerer jeg tjenesterne: Blazor, login med Identity og dens database, min SkadeContext med AddDbContextFactory og mine to services med AddScoped. Derefter bygges appen, og begge databaser laves med EnsureCreated, hvis de ikke findes. Til sidst sættes pipelinen op, og app.Run starter appen.",
        noegle: ["kultur", "registrerer", "Identity", "AddDbContextFactory", "AddScoped", "EnsureCreated", "app.Run"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m31l6", nr: "E6", titel: "Overblik og StatusMaerke: LINQ og GroupBy", min: 15,
    ord: [
      ["GroupBy", "LINQ-metode, der samler elementer i grupper efter en værdi. Hver gruppe har en Key."],
      ["Komponent", "En genbrugelig del af en side med sin egen HTML og kode. I Blazor er det en .razor-fil, fx StatusMaerke."]
    ],
    trin: [
      { t: "laes", h: "Overblik henter data",
        md: "`Home.razor` er forsiden. Når den åbnes, henter `OnInitializedAsync` alle skader og tæller kunderne.",
        kode: R`@code {
    private List<Skade>? skader;
    private int antalKunder;

    protected override async Task OnInitializedAsync()
    {
        skader = await SkadeService.HentAlleAsync();
        antalKunder = (await KundeService.HentAlleAsync()).Count;
    }
}`, sprog: "razor",
        noter: [
          ["List<Skade>? skader", "Null, indtil data er hentet. Imens viser siden \"Henter data …\"."],
          ["OnInitializedAsync", "Kører én gang, når siden starter."],
          ["(await KundeService.HentAlleAsync()).Count", "Hent kunderne, og tæl dem."]
        ] },
      { t: "laes", h: "Nøgletallene med LINQ",
        md: "To af kortene øverst på Overblik regner direkte på listen `skader`.",
        kode: R`<div class="text-muted">Åbne skader</div>
<div class="fs-2">@skader.Count(s => s.ErAaben)</div>

<div class="text-muted">Udbetalt i alt</div>
<div class="fs-2">@skader.Where(s => s.Status == SkadeStatus.Godkendt).Sum(s => s.Beloeb).ToString("C")</div>`, sprog: "razor",
        noter: [
          ["Count(s => s.ErAaben)", "Tæl de skader, hvor ErAaben er sand."],
          ["Where(...).Sum(s => s.Beloeb)", "Behold de godkendte, og læg beløbene sammen."],
          ["ToString(\"C\")", "Vis som kroner. C står for currency (valuta)."]
        ] },
      { t: "valg", q: "Med dine startdata: hvilket tal står under **Åbne skader** på Overblik?",
        svar: ["3", "2", "4", "7"],
        ret: 0, fordi: "Åbne er Anmeldt eller Behandles: vandskaden (behandles), det brækkede håndled og mobiltelefonen (begge anmeldt)." },
      { t: "laes", h: "Skader pr. status med GroupBy",
        md: "`GroupBy` samler skaderne i grupper: én gruppe pr. status. `Key` er gruppens status.",
        kode: R`@foreach (var gruppe in skader.GroupBy(s => s.Status).OrderBy(g => g.Key))
{
    <tr>
        <td><StatusMaerke Status="gruppe.Key" /></td>
        <td>@gruppe.Count()</td>
        <td class="text-end">@gruppe.Sum(s => s.Beloeb).ToString("C")</td>
    </tr>
}`, sprog: "razor",
        noter: [
          ["GroupBy(s => s.Status)", "Lav én gruppe for hver status, der findes blandt skaderne."],
          ["OrderBy(g => g.Key)", "Sortér grupperne efter status. En enum sorteres efter sit tal: Anmeldt, Behandles, Godkendt, Afvist."],
          ["gruppe.Key", "Gruppens status."],
          ["gruppe.Count()", "Hvor mange skader der er i gruppen."],
          ["gruppe.Sum(s => s.Beloeb)", "Gruppens samlede beløb."]
        ] },
      { t: "forudsig", q: "Programmet laver de samme grupper som tabellen **Skader pr. status** på Overblik, med dine syv startskader. Hvad skriver det?",
        kode: R`var skader = new List<Skade>
{
    new Skade { Beloeb = 4500m, Status = SkadeStatus.Godkendt },
    new Skade { Beloeb = 18750m, Status = SkadeStatus.Behandles },
    new Skade { Beloeb = 6200m, Status = SkadeStatus.Godkendt },
    new Skade { Beloeb = 7999m, Status = SkadeStatus.Afvist },
    new Skade { Beloeb = 25000m, Status = SkadeStatus.Anmeldt },
    new Skade { Beloeb = 3200m, Status = SkadeStatus.Godkendt },
    new Skade { Beloeb = 2400m, Status = SkadeStatus.Anmeldt }
};
foreach (var gruppe in skader.GroupBy(s => s.Status).OrderBy(g => g.Key))
{
    Console.WriteLine($"{gruppe.Key}: {gruppe.Count()}");
}`,
        omkring: ["", MODELLER],
        output: "Anmeldt: 2\nBehandles: 1\nGodkendt: 3\nAfvist: 1",
        fordi: "Én linje pr. status, sorteret efter enum'ens rækkefølge. To anmeldte, én under behandling, tre godkendte og én afvist." },
      { t: "fejl", q: "Kortet **Åbne skader** skal tælle de skader, der er Anmeldt eller Behandles. Med én anmeldt og to godkendte skader skulle programmet skrive 1, men det skriver 2. Klik på linjen med fejlen.",
        kode: R`var skader = new List<Skade>
{
    new Skade { Status = SkadeStatus.Anmeldt },
    new Skade { Status = SkadeStatus.Godkendt },
    new Skade { Status = SkadeStatus.Godkendt }
};
Console.WriteLine(skader.Count(s => !s.ErAaben));

class Skade
{
    public SkadeStatus Status { get; set; }
    public bool ErAaben => Status == SkadeStatus.Anmeldt || Status == SkadeStatus.Behandles;
}

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`,
        linje: 7, logisk: true, output: "2", rettetOutput: "1",
        fordi: "`!` betyder \"ikke\". `!s.ErAaben` tæller de lukkede skader. Det skal være `s.ErAaben`, som på din forside.",
        rettet: R`var skader = new List<Skade>
{
    new Skade { Status = SkadeStatus.Anmeldt },
    new Skade { Status = SkadeStatus.Godkendt },
    new Skade { Status = SkadeStatus.Godkendt }
};
Console.WriteLine(skader.Count(s => s.ErAaben));

class Skade
{
    public SkadeStatus Status { get; set; }
    public bool ErAaben => Status == SkadeStatus.Anmeldt || Status == SkadeStatus.Behandles;
}

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }` },
      { t: "laes", h: "StatusMaerke: din egen komponent",
        md: "`StatusMaerke.razor` er en lille **komponent**: et stykke side, der kan genbruges. Den får en status og viser et farvet mærke.",
        kode: R`<span class="badge @Farve">@Status</span>

@code {
    [Parameter] public SkadeStatus Status { get; set; }

    private string Farve => Status switch
    {
        SkadeStatus.Anmeldt => "text-bg-secondary",
        SkadeStatus.Behandles => "text-bg-warning",
        SkadeStatus.Godkendt => "text-bg-success",
        _ => "text-bg-danger"
    };
}`, sprog: "razor",
        noter: [
          ["[Parameter] public SkadeStatus Status", "Værdien, komponenten får udefra, fx <StatusMaerke Status=\"skade.Status\" />."],
          ["Status switch { ... }", "Switch-udtryk: vælg en Bootstrap-klasse ud fra status."],
          ["_ => \"text-bg-danger\"", "Alle andre statusser, altså Afvist: rød."],
          ["class=\"badge @Farve\"", "Bootstraps mærke med den valgte farve."]
        ] },
      { t: "valg", q: "I din `StatusMaerke`: hvilken farve får mærket for **Behandles**?",
        svar: ["Gul (`text-bg-warning`)", "Grøn (`text-bg-success`)", "Rød (`text-bg-danger`)", "Grå (`text-bg-secondary`)"],
        ret: 0, fordi: "Switch-udtrykket giver `text-bg-warning` for Behandles. I Bootstrap er warning gul." },
      { t: "valg", q: "Hvorfor lavede du `StatusMaerke` som en komponent i stedet for at skrive farvekoden på hver side?",
        svar: ["Mærket bruges flere steder. Med en komponent står farvereglerne ét sted, så en ændring kun laves én gang", "Fordi Blazor kræver en komponent til farver", "For at siden bliver hurtigere", "Fordi switch ikke virker i en side"],
        ret: 0, fordi: "Mærket står både på Overblik og på skadesiden. Skal farverne ændres, rettes kun `StatusMaerke.razor`." },
      { t: "forklar", q: "Censor: \"Hvad gør GroupBy på din forside?\"",
        svar: "GroupBy samler skaderne i grupper efter status, så der er én gruppe for Anmeldt, én for Behandles og så videre. For hver gruppe er Key statussen, og Count() og Sum() regner på skaderne i gruppen. Det bruger jeg til tabellen Skader pr. status: én række pr. status med antal og samlet beløb.",
        noegle: ["grupper", "status", "Key", "Count", "Sum", "række"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m31l7", nr: "E7", titel: "Kundelisten: søgning og formular", min: 15,
    ord: [
      ["OrdinalIgnoreCase", "En måde at sammenligne tekst på, hvor store og små bogstaver er ligegyldige."]
    ],
    trin: [
      { t: "laes", h: "Søgefeltet",
        md: "Øverst på `Kunder.razor` står søgefeltet. Det er bundet til variablen `soegeord`.",
        kode: R`<input class="form-control mb-3" placeholder="Søg på navn, e-mail eller telefon …"
       @bind="soegeord" @bind:event="oninput" />`, sprog: "razor",
        noter: [
          ["@bind=\"soegeord\"", "Feltet og variablen hænger sammen: det, brugeren skriver, kommer i soegeord."],
          ["@bind:event=\"oninput\"", "Opdatér for hvert tastetryk, ikke først når man forlader feltet."]
        ] },
      { t: "laes", h: "Fundne: søgningen med LINQ",
        md: "`Fundne` er de kunder, der passer på søgningen.",
        kode: R`private IEnumerable<Kunde> Fundne => kunder!
    .Where(k => k.Navn.Contains(soegeord, StringComparison.OrdinalIgnoreCase)
             || k.Email.Contains(soegeord, StringComparison.OrdinalIgnoreCase)
             || k.Telefon.Contains(soegeord))
    .OrderBy(k => k.Navn);`, frag: true,
        noter: [
          ["IEnumerable<Kunde>", "En række kunder, man kan løbe igennem med foreach."],
          ["kunder!", "! lover compileren, at listen ikke er null. Siden viser først tabellen, når kunder er hentet."],
          ["Contains(soegeord, StringComparison.OrdinalIgnoreCase)", "Indeholder teksten søgeordet? Store og små bogstaver er ligegyldige."],
          ["||", "Eller: kunden kommer med, hvis navn, e-mail eller telefon passer."],
          ["OrderBy(k => k.Navn)", "Sortér efter navn."]
        ],
        md2: "`Fundne` regnes ud igen, hver gang siden tegnes. Derfor ændrer listen sig for hvert tastetryk." },
      { t: "valg", q: "På din kundeliste skriver brugeren `peter` i søgefeltet. Hvilke af dine startkunder bliver vist?",
        svar: ["Peter Bangsmann og Peter Parker", "Ingen, fordi der står Peter med stort P", "Kun Peter Bangsmann", "Alle fire"],
        ret: 0, fordi: "OrdinalIgnoreCase gør store og små bogstaver ligegyldige, og begge har Peter i navnet." },
      { t: "valg", q: "På din kundeliste skriver brugeren `8888` i søgefeltet. Hvem bliver vist?",
        svar: ["Peter Bangsmann, der har telefon 88888888", "Ingen", "Søren Nielsen", "Alle fire"],
        ret: 0, fordi: "Søgningen kigger også i telefonnummeret. Kun 88888888 indeholder 8888." },
      { t: "laes", h: "Formularen til en ny kunde",
        md: "Formularen er en `EditForm`. Her er feltet til navnet. E-mail og telefon er lavet på samme måde.",
        kode: R`<EditForm Model="nyKunde" OnValidSubmit="OpretKunde">
    <DataAnnotationsValidator />

    <div class="mb-2">
        <label class="form-label">Navn</label>
        <InputText class="form-control" @bind-Value="nyKunde.Navn" />
        <ValidationMessage For="() => nyKunde.Navn" />
    </div>

    <button type="submit" class="btn btn-primary">Opret kunde</button>
</EditForm>`, sprog: "razor",
        noter: [
          ["EditForm Model=\"nyKunde\"", "Formularen hører til objektet nyKunde."],
          ["OnValidSubmit=\"OpretKunde\"", "Kald OpretKunde, men kun når alle regler er overholdt."],
          ["DataAnnotationsValidator", "Tjekker reglerne fra Kunde: [Required], [EmailAddress] og det regulære udtryk."],
          ["InputText @bind-Value", "Feltet er bundet til nyKunde.Navn."],
          ["ValidationMessage For=\"() => nyKunde.Navn\"", "Viser fejlteksten for netop Navn."]
        ] },
      { t: "orden", q: "Brugeren udfylder formularen rigtigt og trykker **Opret kunde**. Sæt linjerne i din `OpretKunde` i den rækkefølge, de står i din kode.",
        linjer: [R`await KundeService.OpretAsync(nyKunde);`, R`besked = $"{nyKunde.Navn} er oprettet.";`, R`nyKunde = new Kunde();`, R`kunder = await KundeService.HentAlleAsync();`], frag: true,
        fordi: "Først gemmes kunden. Så laves beskeden, mens navnet stadig står i nyKunde. Så tømmes formularen, og listen hentes igen, så den nye kunde kommer med." },
      { t: "valg", q: "Hvorfor står `nyKunde = new Kunde();` i din `OpretKunde`?",
        svar: ["Så formularen bliver tom og klar til den næste kunde", "For at gemme kunden", "For at slette den gamle kunde fra databasen", "Fordi OpretAsync kræver det"],
        ret: 0, fordi: "Formularen er bundet til `nyKunde`. Et nyt, tomt objekt giver tomme felter." },
      { t: "valg", q: "På din kundeliste skriver brugeren telefonnummeret `1234` og trykker **Opret kunde**. Hvad sker der?",
        svar: ["Kunden bliver ikke oprettet, og \"Telefonnummeret skal være 8 cifre.\" står under feltet", "Kunden bliver oprettet med telefon 1234", "Appen går ned", "Der kommer en fejl fra databasen"],
        ret: 0, fordi: "Det regulære udtryk kræver præcis 8 cifre. `OnValidSubmit` kører ikke, så intet bliver gemt." },
      { t: "forklar", q: "Censor: \"Hvordan virker søgningen på kundelisten, og hvad ville du gøre anderledes?\"",
        svar: "Søgefeltet er bundet til soegeord med @bind og @bind:event=\"oninput\", så det opdateres for hvert tastetryk. Fundne bruger LINQ: Where beholder de kunder, hvor navn, e-mail eller telefon indeholder søgeordet, uden at skelne mellem store og små bogstaver, og OrderBy sorterer efter navn. Søgningen sker i hukommelsen på alle kunderne. Med mange kunder ville jeg lave en søgemetode i servicen, så databasen selv finder dem med Where før ToListAsync.",
        noegle: ["@bind", "oninput", "Where", "Contains", "OrderBy", "hukommelsen", "databasen"] },
      { t: "forklar", q: "Censor: \"Hvordan sikrer du, at brugeren ikke gemmer forkerte data?\"",
        svar: "Reglerne står som data annotations på modellerne: Required, StringLength, EmailAddress, Range og et regulært udtryk, der kræver præcis 8 cifre i telefonnummeret. I formularen tjekker DataAnnotationsValidator reglerne, og OnValidSubmit kører kun, når alle er overholdt. ValidationMessage viser fejlteksten under feltet.",
        noegle: ["data annotations", "Required", "regulært udtryk", "DataAnnotationsValidator", "OnValidSubmit", "ValidationMessage"] }
    ] }

);
})();
