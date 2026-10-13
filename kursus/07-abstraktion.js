// Modul 7 — Abstraktion, interfaces og typer. Forudsætter: modul 0–6.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m07", nr: 7, del: "Del 2 · Objektorienteret C#", ikon: "🎭",
  titel: "Abstraktion, interfaces og typer",
  dag: "Kursusdag 6 · Abstraktion og enumeration",
  intro: "Den fjerde søjle i OOP: **abstraktion**. Du lærer abstrakte klasser og **interfaces** — den idé, hele ASP.NET Core er bygget på — og du får styr på forskellen mellem **value types** og **reference types**, som er et fast eksamensspørgsmål.\n\nNår modulet er slut, kan du forklare alle fire søjler i objektorienteret programmering.",
  video: ["06_Man_Abstraction+Enumeration.mp4 (4 t 14 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m07l1", titel: "Abstrakte klasser: en halvfærdig skabelon", min: 15,
    ord: [
      ["Abstraktion", "At vise det væsentlige og skjule detaljerne: man siger, HVAD noget kan, uden at sige HVORDAN."],
      ["abstract class", "En klasse, man ikke kan lave objekter af. Den findes kun for at blive arvet fra."],
      ["Abstrakt metode", "En metode uden krop. Alle klasser, der arver, er tvunget til at skrive den med override."],
      ["Konkret klasse", "En almindelig klasse, man kan lave objekter af — modsat en abstrakt."]
    ],
    trin: [
      { t: "laes", h: "Et dyr, der ikke er noget bestemt dyr",
        md: "I modul 5 havde klassen `Dyr` en metode `GivLyd()`, der skrev `...`. Det var en nødløsning: hvad siger \"et dyr\"? Det giver ikke mening. Der findes hunde og katte, men ikke \"bare et dyr\".\n\nNogle klasser er kun **idéer**, der samler det fælles. Dem markerer man `abstract`. Så kan man **ikke lave objekter** af dem — kun arve fra dem.",
        kode: R`Dyr d = new Hund();
d.GivLyd();

abstract class Dyr
{
    public abstract void GivLyd();
}

class Hund : Dyr
{
    public override void GivLyd()
    {
        Console.WriteLine("Vov");
    }
}`,
        noter: [
          ["abstract class Dyr", "Klassen er abstrakt: `new Dyr()` er forbudt."],
          ["public abstract void GivLyd();", "En **abstrakt metode**: ingen krop, kun et semikolon. Den siger *hvad* — ikke *hvordan*."],
          ["public override void GivLyd()", "Hund **skal** skrive metoden. Ellers kan koden ikke oversættes."]
        ],
        output: "Vov",
        md2: "Det er **abstraktion**: basisklassen fastlægger, *hvad* alle dyr kan. De konkrete klasser bestemmer, *hvordan*." },
      { t: "fejl",
        kode: R`Figur f = new Figur();
Console.WriteLine(f.Areal());

abstract class Figur
{
    public abstract double Areal();
}`,
        linje: 1,
        fordi: "`Figur` er abstrakt, så man kan ikke oprette et objekt af den. Compileren siger: `Cannot create an instance of the abstract type or interface 'Figur'`. Man skal lave en konkret klasse, der arver fra `Figur`, og oprette et objekt af den.",
        rettet: R`Figur f = new Kvadrat();
Console.WriteLine(f.Areal());

abstract class Figur
{
    public abstract double Areal();
}

class Kvadrat : Figur
{
    public override double Areal() { return 4; }
}` },
      { t: "fejl",
        q: "Koden kan ikke oversættes, fordi én af de to klasser mangler noget. Klik på den linje, hvor den klasse begynder.",
        kode: R`abstract class Figur
{
    public abstract double Areal();
}

class Cirkel : Figur
{
    public double Radius { get; set; }
}`,
        linje: 6,
        fordi: "`Cirkel` arver en abstrakt metode, men skriver den ikke. Compileren siger: `'Cirkel' does not implement inherited abstract member 'Figur.Areal()'`. En abstrakt metode er en **kontrakt**: alle konkrete børn skal levere den.",
        rettet: R`abstract class Figur
{
    public abstract double Areal();
}

class Cirkel : Figur
{
    public double Radius { get; set; }

    public override double Areal()
    {
        return Math.PI * Radius * Radius;
    }
}`,
        omkring: ["", "class __Start { static void Main() { } }"] },
      { t: "laes", h: "En abstrakt klasse må gerne have færdig kode",
        md: "En abstrakt klasse behøver ikke være tom. Den kan have **almindelige** felter, properties, konstruktører og metoder — og så nogle **abstrakte** huller, som børnene skal fylde ud.",
        kode: R`Figur[] figurer = { new Rektangel(4, 5), new Kvadrat(3) };

foreach (Figur f in figurer)
{
    f.Vis();
}

abstract class Figur
{
    public abstract double Areal();

    public void Vis()
    {
        Console.WriteLine($"{GetType().Name} med areal {Areal()}");
    }
}

class Rektangel : Figur
{
    private double b, h;
    public Rektangel(double b, double h) { this.b = b; this.h = h; }
    public override double Areal() { return b * h; }
}

class Kvadrat : Figur
{
    private double side;
    public Kvadrat(double side) { this.side = side; }
    public override double Areal() { return side * side; }
}`,
        output: "Rektangel med areal 20\nKvadrat med areal 9",
        md2: "`Vis()` er skrevet **én gang** i den abstrakte klasse. Den kalder `Areal()`, som den ikke selv ved, hvordan man regner ud — det ved hvert barn. Polymorfien fra modul 5 sørger for, at den rigtige udgave kører." },
      { t: "valg", q: "Hvad er forskellen på en `virtual` og en `abstract` metode?",
        svar: ["virtual har en krop og MÅ overskrives. abstract har ingen krop og SKAL overskrives.", "Der er ingen forskel", "abstract har en krop, virtual har ikke", "virtual kan kun bruges i abstrakte klasser"],
        ret: 0, fordi: "`virtual`: \"her er en standardudgave — skriv din egen, hvis du vil\". `abstract`: \"jeg har ingen udgave — du **skal** skrive din egen\". Abstrakte metoder kan kun stå i abstrakte klasser." },
      { t: "udfyld", q: "Gør klassen og metoden abstrakte, og lad `Bil` levere sin udgave.",
        kode: R`Koeretoej k = new Bil();
Console.WriteLine(k.AntalHjul());

[[abstract]] class Koeretoej
{
    public [[abstract]] int AntalHjul();
}

class Bil : Koeretoej
{
    public [[override]] int AntalHjul() { return 4; }
}`,
        output: "4",
        fordi: "`abstract` på både klassen og metoden. Den konkrete klasse bruger `override`." },
      { t: "forudsig",
        kode: R`Ansat[] ansatte = { new Timeloennet(100, 160), new Fastloennet(30000) };

foreach (Ansat a in ansatte)
{
    Console.WriteLine(a.Loen());
}

abstract class Ansat
{
    public abstract int Loen();
}

class Timeloennet : Ansat
{
    private int sats, timer;
    public Timeloennet(int sats, int timer) { this.sats = sats; this.timer = timer; }
    public override int Loen() { return sats * timer; }
}

class Fastloennet : Ansat
{
    private int maanedsloen;
    public Fastloennet(int m) { maanedsloen = m; }
    public override int Loen() { return maanedsloen; }
}`,
        output: "16000\n30000",
        fordi: "Arrayet har typen `Ansat[]`, men objekterne er konkrete. Hver klasse regner sin løn på sin egen måde: 100 · 160 = 16000 og den faste løn 30000." },
      { t: "skriv", q: "Klassen `Dyr` er abstrakt med den abstrakte metode `Lyd()`. Skriv klassen `Kat`, der arver fra `Dyr` og returnerer `\"Mjav\"` i `Lyd()`.",
        foer: R`Dyr d = new Kat();
Console.WriteLine(d.Lyd());

abstract class Dyr
{
    public abstract string Lyd();
}`,
        tjek: [
          [/class Kat:Dyr\{/, "Klassen skal arve: `class Kat : Dyr`"],
          [/public override string Lyd\(\)/, "Metoden: `public override string Lyd()`"],
          [/return ?"Mjav";|=>"Mjav";/, "Returnér `\"Mjav\"`"]
        ],
        loesning: R`class Kat : Dyr
{
    public override string Lyd()
    {
        return "Mjav";
    }
}`,
        output: "Mjav" },
      { t: "ide", h: "Betalinger",
        md: "Lav et Console-projekt, `Betaling`. En abstrakt klasse samler det fælles — beløbet og kvitteringen — og hver betalingsform bestemmer selv sit gebyr.",
        kode: R`Betaling[] betalinger =
{
    new Kortbetaling(200),
    new MobilePay(200),
    new Kontant(200)
};

foreach (Betaling b in betalinger)
{
    b.SkrivKvittering();
}

abstract class Betaling
{
    protected decimal beloeb;

    protected Betaling(decimal beloeb)
    {
        this.beloeb = beloeb;
    }

    public abstract decimal Gebyr();

    public void SkrivKvittering()
    {
        Console.WriteLine($"{GetType().Name}: {beloeb} + gebyr {Gebyr()} = {beloeb + Gebyr()} kr.");
    }
}

class Kortbetaling : Betaling
{
    public Kortbetaling(decimal beloeb) : base(beloeb) { }
    public override decimal Gebyr() { return beloeb * 0.01m; }
}

class MobilePay : Betaling
{
    public MobilePay(decimal beloeb) : base(beloeb) { }
    public override decimal Gebyr() { return 1; }
}

class Kontant : Betaling
{
    public Kontant(decimal beloeb) : base(beloeb) { }
    public override decimal Gebyr() { return 0; }
}`,
        output: "Kortbetaling: 200 + gebyr 2,00 = 202,00 kr.\nMobilePay: 200 + gebyr 1 = 201 kr.\nKontant: 200 + gebyr 0 = 200 kr.",
        md2: "Konstruktøren i den abstrakte klasse er `protected`: den kan alligevel kun kaldes af børnene." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er en abstrakt klasse, og hvornår bruger man den?",
        svar: "En abstrakt klasse er en klasse, man **ikke kan lave objekter af** — den er kun til at **arve fra**. Den kan indeholde både **færdig kode**, som børnene genbruger, og **abstrakte metoder** uden krop, som børnene **skal** overskrive. Man bruger den, når flere klasser deler noget fælles, men basisklassen i sig selv ikke giver mening som objekt — fx `Figur`, `Dyr` eller `Betaling`.",
        noegle: ["ikke lave objekter", "arve", "abstrakte metoder", "skal", "fælles"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m07l2", titel: "Interfaces: en kontrakt", min: 18,
    ord: [
      ["Interface", "En kontrakt: en liste over metoder og properties, som en klasse lover at have. Indeholder normalt ingen kode."],
      ["Implementere", "Når en klasse opfylder et interface ved at skrive alle dets medlemmer."],
      ["Løs kobling", "At kode kun afhænger af et interface og ikke af en bestemt klasse, så klassen kan skiftes ud."],
      ["Programmér mod et interface", "Brug interfacets type til variabler og parametre i stedet for den konkrete klasse."]
    ],
    trin: [
      { t: "laes", h: "Hvad har en fugl, et fly og en drone til fælles?",
        md: "De kan alle **flyve** — men de er ikke i familie. En fugl er et dyr, et fly er en maskine. Arv dur ikke her: der findes ikke en fornuftig fælles basisklasse.\n\nTil det har C# **interfaces**. Et interface er en **kontrakt**: en liste over, hvad en klasse **lover at kunne**. Intet om hvordan.",
        kode: R`IKanFlyve[] ting = { new Fugl(), new Fly() };

foreach (IKanFlyve t in ting)
{
    t.Flyv();
}

interface IKanFlyve
{
    void Flyv();
}

class Fugl : IKanFlyve
{
    public void Flyv() { Console.WriteLine("Basker med vingerne"); }
}

class Fly : IKanFlyve
{
    public void Flyv() { Console.WriteLine("Starter motorerne"); }
}`,
        noter: [
          ["interface IKanFlyve", "Kontrakten. Interfacenavne begynder altid med stort **I**."],
          ["void Flyv();", "Kun signaturen. Ingen krop, og intet `public` — alt i et interface er offentligt."],
          ["class Fugl : IKanFlyve", "Fugl **implementerer** interfacet: den lover at have metoden."],
          ["public void Flyv()", "Her opfyldes løftet. Der skrives **ikke** `override`."]
        ],
        output: "Basker med vingerne\nStarter motorerne" },
      { t: "fejl",
        q: "Koden kan ikke oversættes, fordi der mangler noget inden i enten `IKanGemmes` eller `Dokument`. Klik på den første linje i den af dem, der mangler noget.",
        kode: R`interface IKanGemmes
{
    void Gem();
}

class Dokument : IKanGemmes
{
    public string Titel { get; set; }
}`,
        linje: 6,
        fordi: "`Dokument` lover at opfylde `IKanGemmes`, men har ingen `Gem()`. Compileren siger: `'Dokument' does not implement interface member 'IKanGemmes.Gem()'`. Et interface er en kontrakt, og compileren håndhæver den.",
        rettet: R`interface IKanGemmes
{
    void Gem();
}

class Dokument : IKanGemmes
{
    public string Titel { get; set; }

    public void Gem()
    {
        Console.WriteLine("Gemt");
    }
}`,
        omkring: ["", "class __Start { static void Main() { } }"] },
      { t: "laes", h: "Flere interfaces på én gang",
        md: "En klasse kan kun **arve fra én** klasse. Men den kan **implementere lige så mange interfaces**, den vil. Basisklassen skrives først, derefter interfacene, adskilt af komma.",
        kode: R`And a = new And();
a.Spis();
a.Flyv();
a.Svoem();

interface IKanFlyve { void Flyv(); }
interface IKanSvoemme { void Svoem(); }

class Dyr
{
    public void Spis() { Console.WriteLine("Spiser"); }
}

class And : Dyr, IKanFlyve, IKanSvoemme
{
    public void Flyv() { Console.WriteLine("Flyver"); }
    public void Svoem() { Console.WriteLine("Svømmer"); }
}`,
        output: "Spiser\nFlyver\nSvømmer",
        md2: "En and **er et** dyr (arv) og **kan** flyve og svømme (interfaces). Huskeregel: arv siger, hvad noget **er**. Interfaces siger, hvad noget **kan**." },
      { t: "udfyld", q: "Lav interfacet, og lad `Printer` implementere det.",
        kode: R`IKanUdskrive p = new Printer();
p.Udskriv("Hej");

[[interface]] IKanUdskrive
{
    void Udskriv(string tekst);
}

class Printer [[:]] IKanUdskrive
{
    [[public]] void Udskriv(string tekst)
    {
        Console.WriteLine($"Udskriver: {tekst}");
    }
}`,
        output: "Udskriver: Hej",
        fordi: "Ordet er `interface`. Klassen implementerer med et kolon — samme tegn som ved arv. Metoden skal være `public`." },
      { t: "laes", h: "Hele pointen: byt delene ud",
        md: "Her er grunden til, at interfaces er **det vigtigste begreb** for resten af kurset.\n\nKlassen `Ordreservice` skal sende en besked. Den beder ikke om en bestemt klasse — den beder om \"noget, der kan sende\". Så kan du give den e-mail i dag og sms i morgen **uden at ændre en linje** i `Ordreservice`.",
        kode: R`Ordreservice a = new Ordreservice(new EmailSender());
a.Afslut();

Ordreservice b = new Ordreservice(new SmsSender());
b.Afslut();

interface IBeskedSender
{
    void Send(string besked);
}

class EmailSender : IBeskedSender
{
    public void Send(string besked) { Console.WriteLine($"E-mail: {besked}"); }
}

class SmsSender : IBeskedSender
{
    public void Send(string besked) { Console.WriteLine($"Sms: {besked}"); }
}

class Ordreservice
{
    private IBeskedSender sender;

    public Ordreservice(IBeskedSender sender)
    {
        this.sender = sender;
    }

    public void Afslut()
    {
        sender.Send("Din ordre er på vej");
    }
}`,
        output: "E-mail: Din ordre er på vej\nSms: Din ordre er på vej",
        md2: "`Ordreservice` kender kun **interfacet**. Det kaldes **løs kobling** og **at programmere mod et interface**. At give klassen det, den skal bruge, gennem konstruktøren hedder **dependency injection** — det bygger hele ASP.NET Core på, og du møder det igen i modul 17 og 19." },
      { t: "valg", q: "Hvad er fordelen ved, at `Ordreservice` tager imod en `IBeskedSender` i stedet for en `EmailSender`?",
        svar: ["Man kan skifte til en anden måde at sende på — eller en test-udgave — uden at ændre Ordreservice", "Programmet kører hurtigere", "Man slipper for at skrive konstruktører", "Der bliver brugt mindre hukommelse"],
        ret: 0, fordi: "Klassen afhænger af **kontrakten**, ikke af en bestemt klasse. Alt, der opfylder kontrakten, kan sættes i — også en falsk udgave, der bare husker beskederne, når man tester." },
      { t: "forudsig",
        kode: R`ILog log = new StilleLog();
Regner r = new Regner(log);
Console.WriteLine(r.Plus(2, 3));

interface ILog { void Skriv(string tekst); }

class KonsolLog : ILog
{
    public void Skriv(string tekst) { Console.WriteLine($"LOG: {tekst}"); }
}

class StilleLog : ILog
{
    public void Skriv(string tekst) { }
}

class Regner
{
    private ILog log;
    public Regner(ILog log) { this.log = log; }

    public int Plus(int a, int b)
    {
        log.Skriv("Lægger sammen");
        return a + b;
    }
}`,
        output: "5",
        fordi: "Regneren får en `StilleLog`, og dens `Skriv` gør ingenting. Derfor kommer der kun resultatet 5. Med en `KonsolLog` ville der også være kommet en LOG-linje — uden at `Regner` var blevet ændret." },
      { t: "laes", h: "Interface eller abstrakt klasse?",
        md: "De ligner hinanden: begge siger \"dette skal du kunne\". Her er forskellen, som du skal kunne til eksamen:",
        noter: [
          ["Abstrakt klasse", "Kan indeholde **færdig kode og felter**. En klasse kan kun arve fra **én**. Bruges, når klasserne er i familie (\"er en\") og deler kode."],
          ["Interface", "Er en ren **kontrakt** uden data. En klasse kan implementere **mange**. Bruges til en evne (\"kan\"), som helt forskellige klasser kan have."]
        ],
        md2: "Interfaces kan i nyere C# have standardkode i metoderne, men det bruges sjældent. Regn med, at et interface er en ren kontrakt." },
      { t: "valg", q: "`Kunde`, `Faktura` og `Rapport` har intet til fælles — men de skal alle kunne eksporteres til PDF. Hvad vælger du?",
        svar: ["Et interface IKanEksporteres, som alle tre implementerer", "En abstrakt basisklasse Eksporterbar, som alle tre arver fra", "At kopiere metoden ind i alle tre klasser uden kontrakt", "At gøre alle tre klasser static"],
        ret: 0, fordi: "Klasserne er ikke i familie, så arv giver ikke mening. Et interface beskriver en fælles **evne** på tværs af vidt forskellige klasser — og de kan stadig arve fra noget andet." },
      { t: "skriv", q: "Skriv et interface, der hedder `IBeregner`, med én metode: `int Beregn(int a, int b);`. Skriv derefter klassen `Plus`, der implementerer det og returnerer `a + b`.",
        foer: R`IBeregner b = new Plus();
Console.WriteLine(b.Beregn(3, 4));`,
        tjek: [
          [/interface IBeregner\{int Beregn\(int a,int b\);\}/, "Interfacet: `interface IBeregner { int Beregn(int a, int b); }`"],
          [/class Plus:IBeregner\{/, "Klassen: `class Plus : IBeregner`"],
          [/public int Beregn\(int a,int b\)/, "Metoden skal være `public int Beregn(int a, int b)`"],
          [/return a\+b;|=>a\+b;/, "Returnér `a + b`"]
        ],
        loesning: R`interface IBeregner
{
    int Beregn(int a, int b);
}

class Plus : IBeregner
{
    public int Beregn(int a, int b)
    {
        return a + b;
    }
}`,
        output: "7" },
      { t: "laes", h: "Interfaces, du allerede bruger",
        md: ".NET er bygget op af interfaces. Nogle af dem har du brugt uden at vide det:",
        noter: [
          ["IEnumerable<T>", "\"Kan gennemløbes med foreach\". Arrays, List, Dictionary, Stack, Queue … implementerer alle dette."],
          ["IList<T> / ICollection<T>", "\"Er en samling, man kan tilføje til og fjerne fra\"."],
          ["IComparable<T>", "\"Kan sammenlignes med en anden af samme slags\" — bruges af Sort."],
          ["IDisposable", "\"Skal ryddes op efter brug\" — filer og databaseforbindelser. Mere i modul 9."]
        ],
        kode: R`IEnumerable<int> a = new List<int> { 1, 2, 3 };
IEnumerable<int> b = new int[] { 4, 5 };
IEnumerable<int> c = new Stack<int>();

Console.WriteLine(Sum(a) + Sum(b) + Sum(c));

static int Sum(IEnumerable<int> tal)
{
    int sum = 0;
    foreach (int t in tal) sum += t;
    return sum;
}`,
        output: "15",
        md2: "Metoden `Sum` tager imod **alt, der kan gennemløbes** — liste, array eller stak. Det er præcis samme idé som `IBeskedSender`." },
      { t: "ide", h: "Et lager, der kan skiftes ud",
        md: "Lav et Console-projekt, `Lagring`. Det her er en miniudgave af **repository-mønsteret**, som læreren bruger i Web API-delen (modul 19): programmet kender kun interfacet `IKundeLager`. I dag gemmes kunderne i en liste i hukommelsen — senere kan du skrive en udgave, der bruger en database, uden at røre resten.",
        kode: R`IKundeLager lager = new HukommelsesLager();
lager.Tilfoej("Anna");
lager.Tilfoej("Bo");

foreach (string navn in lager.HentAlle())
{
    Console.WriteLine(navn);
}

interface IKundeLager
{
    void Tilfoej(string navn);
    List<string> HentAlle();
}

class HukommelsesLager : IKundeLager
{
    private List<string> kunder = new List<string>();

    public void Tilfoej(string navn)
    {
        kunder.Add(navn);
    }

    public List<string> HentAlle()
    {
        return kunder;
    }
}`,
        output: "Anna\nBo",
        md2: "Tip: Skriv `class HukommelsesLager : IKundeLager`, sæt markøren på interfacets navn, og tryk {{**Ctrl + .** → **Implement interface**||**⌥ + Enter** (Alt + Enter) → **Implement missing members**}}. Så skriver {{Visual Studio||Rider}} skeletterne for dig." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er et interface, og hvad er forskellen på et interface og en abstrakt klasse?",
        svar: "Et interface er en **kontrakt**: det beskriver, hvilke metoder og properties en klasse **skal have**, men ikke hvordan de virker. En klasse **implementerer** det. Forskelle: en abstrakt klasse kan indeholde **færdig kode og felter**, og en klasse kan kun arve fra **én**. Et interface indeholder normalt **ingen implementering**, og en klasse kan implementere **mange**. Abstrakte klasser bruges til klasser i samme familie (\"er en\"), interfaces til en fælles evne (\"kan\"). Interfaces giver **løs kobling** og er grundlaget for dependency injection.",
        noegle: ["kontrakt", "implementerer", "færdig kode", "én", "mange", "løs kobling"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m07l3", titel: "enum: et fast sæt af valgmuligheder", min: 12,
    ord: [
      ["enum (enumeration)", "En type med et fast sæt af navngivne værdier, fx ugens dage eller en ordres status."],
      ["Magisk tal", "Et tal i koden, hvis betydning man ikke kan se — fx `status == 3`. Erstattes af en enum."],
      ["Enum.Parse", "Laver en tekst om til en enum-værdi."]
    ],
    trin: [
      { t: "laes", h: "Hvad betyder status 3?",
        md: "En ordre kan være ny, betalt, sendt eller annulleret. Man kunne gemme det som et tal: 0, 1, 2, 3. Men hvad betyder `if (status == 2)`? Det kan ingen huske. Sådan et tal kaldes et **magisk tal**. Og en tekst som `\"sendt\"` er farlig: staver du den `\"sent\"`, opdager compileren det ikke.\n\nEn **enum** er en type, der kun kan have **et fast sæt af navngivne værdier**.",
        kode: R`OrdreStatus status = OrdreStatus.Betalt;

if (status == OrdreStatus.Betalt)
{
    Console.WriteLine("Klar til at blive sendt");
}
Console.WriteLine(status);

enum OrdreStatus
{
    Ny,
    Betalt,
    Sendt,
    Annulleret
}`,
        noter: [
          ["enum OrdreStatus { … }", "Typen og dens mulige værdier, adskilt af komma."],
          ["OrdreStatus.Betalt", "En værdi skrives som typens navn, punktum, værdiens navn."]
        ],
        output: "Klar til at blive sendt\nBetalt",
        md2: "Koden kan læses som almindeligt sprog, og en stavefejl giver en compilerfejl." },
      { t: "udfyld", q: "Lav en enum med tre størrelser, og brug den.",
        kode: R`Stoerrelse s = Stoerrelse[[.]]Medium;
Console.WriteLine(s);

[[enum]] Stoerrelse
{
    Small,
    Medium,
    Large
}`,
        output: "Medium",
        fordi: "Ordet er `enum`. En værdi skrives med punktum efter typens navn." },
      { t: "laes", h: "enum og switch hører sammen",
        md: "En `switch` over en enum er noget af det mest læsbare kode, der findes.",
        kode: R`Console.WriteLine(Pris(Billet.Barn));
Console.WriteLine(Pris(Billet.Senior));

static int Pris(Billet b)
{
    switch (b)
    {
        case Billet.Barn:
            return 40;
        case Billet.Voksen:
            return 80;
        case Billet.Senior:
            return 60;
        default:
            return 0;
    }
}

enum Billet { Barn, Voksen, Senior }`,
        output: "40\n60",
        md2: "Her bruges `return` i stedet for `break` — `return` forlader hele metoden, så en `break` er overflødig." },
      { t: "laes", h: "Bag facaden er det tal",
        md: "Hver enum-værdi er i virkeligheden et **heltal**. Den første er 0, den næste 1 og så videre. Du kan selv bestemme tallene, og du kan konvertere begge veje med et cast. Det er sådan, en enum bliver gemt i en database.",
        kode: R`Console.WriteLine((int)Niveau.Lav);
Console.WriteLine((int)Niveau.Hoej);
Console.WriteLine((Niveau)5);

Karakter k = Karakter.Ti;
Console.WriteLine((int)k);

enum Niveau { Lav, Mellem = 5, Hoej }
enum Karakter { To = 2, Fire = 4, Syv = 7, Ti = 10, Tolv = 12 }`,
        output: "0\n6\nMellem\n10",
        md2: "`Lav` er 0. `Mellem` er sat til 5, og den næste, `Hoej`, fortsætter derfra med 6." },
      { t: "forudsig",
        kode: R`Ugedag d = Ugedag.Onsdag;
Console.WriteLine((int)d);
Console.WriteLine(d == Ugedag.Fredag);
Console.WriteLine((Ugedag)0);

enum Ugedag { Mandag, Tirsdag, Onsdag, Torsdag, Fredag }`,
        output: "2\nFalse\nMandag",
        fordi: "Tællingen starter ved 0, så `Onsdag` er 2. Og tallet 0 svarer til `Mandag`." },
      { t: "laes", h: "Fra tekst til enum",
        md: "Skriver brugeren en tekst, kan du lave den om til en enum-værdi. `Enum.TryParse` virker som `int.TryParse`: den svarer true/false og lægger resultatet i en out-variabel.",
        kode: R`if (Enum.TryParse("Sendt", out OrdreStatus s))
{
    Console.WriteLine($"Forstået: {s}");
}

if (!Enum.TryParse("Forsvundet", out OrdreStatus t))
{
    Console.WriteLine("Den status findes ikke");
}

foreach (OrdreStatus alle in Enum.GetValues<OrdreStatus>())
{
    Console.Write(alle + " ");
}

enum OrdreStatus { Ny, Betalt, Sendt }`,
        output: "Forstået: Sendt\nDen status findes ikke\nNy Betalt Sendt",
        md2: "`Enum.GetValues` giver alle værdierne. Det bruger man fx til at fylde en dropdown på en webside." },
      { t: "skriv", q: "Lav en enum, der hedder `Trafiklys`, med værdierne `Roed`, `Gul` og `Groen` (i den rækkefølge).",
        foer: R`Trafiklys lys = Trafiklys.Gul;
Console.WriteLine(lys);
Console.WriteLine((int)Trafiklys.Groen);`,
        tjek: [
          [/enum Trafiklys\{Roed,Gul,Groen,?\}/, "`enum Trafiklys { Roed, Gul, Groen }`"]
        ],
        loesning: R`enum Trafiklys { Roed, Gul, Groen }`,
        output: "Gul\n2" },
      { t: "ide", h: "En opgaveliste med status",
        md: "Lav et Console-projekt, `Opgaver`. En enum som property på en klasse er noget, du med stor sandsynlighed får brug for i eksamensprojektet — fx status på en ordre, en bookings tilstand eller en brugers rolle.",
        kode: R`List<Opgave> opgaver = new List<Opgave>
{
    new Opgave { Titel = "Lær C#", Status = Status.IGang, Prioritet = Prioritet.Hoej },
    new Opgave { Titel = "Vask op", Status = Status.Ny, Prioritet = Prioritet.Lav },
    new Opgave { Titel = "Lav disposition", Status = Status.Ny, Prioritet = Prioritet.Hoej }
};

foreach (Opgave o in opgaver)
{
    if (o.Prioritet == Prioritet.Hoej && o.Status != Status.Faerdig)
    {
        Console.WriteLine($"VIGTIG: {o.Titel} ({o.Status})");
    }
}

enum Status { Ny, IGang, Faerdig }
enum Prioritet { Lav, Mellem, Hoej }

class Opgave
{
    public string Titel { get; set; }
    public Status Status { get; set; }
    public Prioritet Prioritet { get; set; }
}`,
        output: "VIGTIG: Lær C# (IGang)\nVIGTIG: Lav disposition (Ny)" },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er en enum, og hvorfor er den bedre end at bruge tal eller tekst?",
        svar: "En enum er en type med et **fast sæt af navngivne værdier**, fx `OrdreStatus.Betalt`. Den er bedre end tal, fordi koden bliver **læsbar** — man slipper for magiske tal. Og den er bedre end tekst, fordi **compileren fanger stavefejl** og kun tillader de værdier, der findes. Bag facaden er hver værdi et heltal, så den kan gemmes i en database.",
        noegle: ["fast sæt", "navngivne", "læsbar", "compileren", "heltal"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m07l4", titel: "Value types og reference types", min: 20,
    ord: [
      ["Value type (værditype)", "En type, hvor variablen selv indeholder værdien. Kopieres den, får man en uafhængig kopi. Fx int, double, bool, char, decimal, enum og struct."],
      ["Reference type", "En type, hvor variablen indeholder en reference til et objekt et andet sted. Kopieres den, peger begge på det samme objekt. Fx class, string, array, List."],
      ["Stack (i hukommelsen)", "Et hurtigt område i hukommelsen til lokale variabler. Ryddes automatisk, når metoden er færdig."],
      ["Heap", "Det store område i hukommelsen, hvor objekter lavet med `new` ligger."],
      ["Garbage collector", "Den del af .NET, der automatisk fjerner objekter på heapen, som ingen længere peger på."],
      ["struct", "Minder om en klasse, men er en value type. Bruges til små dataklumper."],
      ["Nullable (int?)", "En value type, der også kan være null. Skrives med et spørgsmålstegn efter typen."],
      ["?. og ??", "`?.` stopper sikkert, hvis det til venstre er null. `??` giver en reserveværdi, hvis det til venstre er null."]
    ],
    trin: [
      { t: "laes", h: "To slags typer",
        md: "Alle typer i C# er enten **value types** eller **reference types**. Forskellen viser sig, når du **kopierer** en variabel.\n\n- En **value type** ligger **i selve variablen**. Kopien er en helt ny, uafhængig værdi. *Som at tage en fotokopi af et papir.*\n- En **reference type**: variablen indeholder kun en **henvisning** til objektet. Kopien peger på **det samme** objekt. *Som at give nogen et link til det samme dokument.*",
        kode: R`int a = 5;
int b = a;
b = 99;
Console.WriteLine(a);

Person p1 = new Person { Navn = "Anna" };
Person p2 = p1;
p2.Navn = "Bente";
Console.WriteLine(p1.Navn);

class Person
{
    public string Navn { get; set; }
}`,
        output: "5\nBente",
        md2: "`int` er en value type: `b` fik en kopi, og `a` er uberørt. `Person` er en klasse og dermed en reference type: `p1` og `p2` peger på samme objekt (det så du i modul 4)." },
      { t: "laes", h: "Hvem er hvad?",
        md: "Du skal kunne sortere typerne i de to bunker:",
        noter: [
          ["Value types", "`int`, `double`, `decimal`, `bool`, `char`, alle `enum`, alle `struct` (også `DateTime`)."],
          ["Reference types", "Alle `class`, `string`, alle arrays, `List`, `Dictionary`, alle `interface`-variabler, `object`."]
        ],
        md2: "Tommelfingerregel: de små indbyggede taltyper er value types. Alt, du laver med `class`, er reference types." },
      { t: "valg", q: "Hvilken af disse er en **reference type**?",
        svar: ["int[] (et array af heltal)", "int", "bool", "decimal"],
        ret: 0, fordi: "Alle **arrays** er reference types — også et array af value types. Selve tallene er value types, men arrayet, der holder dem, er et objekt." },
      { t: "forudsig",
        kode: R`int[] x = { 1, 2, 3 };
int[] y = x;
y[0] = 100;

double a = 2.5;
double b = a;
b = 7.5;

Console.WriteLine(x[0]);
Console.WriteLine(a);`,
        output: "100\n2,5",
        fordi: "Arrayet er en reference type: `x` og `y` er det samme array, så ændringen ses begge steder. `double` er en value type: `b` er en kopi, og `a` er stadig 2,5." },
      { t: "laes", h: "Stack og heap",
        md: "Til eksamen forklares forskellen tit med de to områder i hukommelsen:\n\n- **Stacken**: et lille, lynhurtigt område til lokale variabler. Den ryddes af sig selv, så snart metoden er færdig.\n- **Heapen**: det store område, hvor objekter lavet med `new` ligger.\n\nEn lokal **value type** ligger med sin værdi direkte på stacken. En **reference type** har sin **reference** på stacken — og selve **objektet** på heapen.\n\nObjekter på heapen bliver ikke slettet af dig. Når ingen variabel længere peger på et objekt, fjerner **garbage collectoren** det automatisk. Derfor skal man ikke selv frigive hukommelse i C#." },
      { t: "laes", h: "Derfor kan en metode ændre dit objekt",
        md: "I modul 3 lærte du, at en metode får en **kopi** af det, du sender ind. Det gælder stadig — men for en reference type er det **referencen**, der kopieres. Metoden kommer til at pege på **samme objekt** som dig.",
        kode: R`int tal = 10;
Konto konto = new Konto { Saldo = 10 };

Aendr(tal, konto);
Console.WriteLine(tal);
Console.WriteLine(konto.Saldo);

static void Aendr(int t, Konto k)
{
    t = 999;
    k.Saldo = 999;
}

class Konto
{
    public int Saldo { get; set; }
}`,
        output: "10\n999",
        md2: "Metoden ændrede kun sin **kopi** af tallet. Men gennem sin kopi af **referencen** ændrede den det **rigtige** kontoobjekt." },
      { t: "forudsig",
        kode: R`List<int> liste = new List<int> { 1 };
int antal = 1;

Udvid(liste, antal);
Console.WriteLine(liste.Count);
Console.WriteLine(antal);

static void Udvid(List<int> l, int a)
{
    l.Add(2);
    l.Add(3);
    a = l.Count;
}`,
        output: "3\n1",
        fordi: "`List` er en reference type: metoden tilføjer til den **samme** liste. `int` er en value type: metoden ændrer kun sin egen kopi." },
      { t: "laes", h: "string: en reference type, der opfører sig som en value type",
        md: "`string` er en reference type — men den er **immutable**: den kan ikke ændres, efter den er lavet. Alle metoder, der \"ændrer\" en string, laver i virkeligheden en **ny**. Derfor mærker du aldrig, at to variabler deler den samme tekst.",
        kode: R`string a = "hej";
string b = a;
b = b.ToUpper();
Console.WriteLine(a);
Console.WriteLine(b);
Console.WriteLine("hej" == a);`,
        output: "hej\nHEJ\nTrue",
        md2: "Og `==` på strings sammenligner **indholdet**, ikke referencen. Derfor føles string som en value type." },
      { t: "laes", h: "struct: en klasse, der er en value type",
        md: "Med `struct` laver du din egen **value type**. Den ligner en klasse, men bliver **kopieret**, når den tildeles.",
        kode: R`Punkt a = new Punkt { X = 1, Y = 2 };
Punkt b = a;
b.X = 50;
Console.WriteLine(a.X);
Console.WriteLine(b.X);

struct Punkt
{
    public int X { get; set; }
    public int Y { get; set; }
}`,
        output: "1\n50",
        md2: "Var `Punkt` en `class`, havde begge skrevet 50. En struct kan ikke arve fra andre og bruges kun til **små dataklumper** — et koordinat, et beløb, et tidspunkt (`DateTime` er en struct). **Er du i tvivl, så brug `class`.** Det gør man i 99 % af tilfældene." },
      { t: "laes", h: "null — og hvem der kan være det",
        md: "`null` betyder \"peger ikke på noget\". Derfor kan kun **reference types** være null. En `int` har altid en værdi.\n\nMen nogle gange findes et tal ikke — fx en fødselsdato, brugeren ikke har oplyst. Sæt et **spørgsmålstegn** efter typen, så kan en value type også være null. Det hedder en **nullable** type.",
        kode: R`int? alder = null;
Console.WriteLine(alder.HasValue);

alder = 25;
Console.WriteLine(alder.HasValue);
Console.WriteLine(alder.Value + 1);`,
        noter: [
          ["int?", "En int, der også kan være null."],
          [".HasValue", "Er der en værdi? true/false."],
          [".Value", "Selve værdien. Går ned, hvis den er null."]
        ],
        output: "False\nTrue\n26",
        md2: "Du vil se `int?`, `decimal?` og `DateTime?` i modelklasser, hvor en kolonne i databasen må være tom." },
      { t: "laes", h: "string? og advarslerne",
        md: "Nu kan du forstå de advarsler, {{Visual Studio||Rider}} har vist dig siden modul 1.\n\nNye C#-projekter har slået **nullable reference types** til. Det betyder: `string` lover, at der **aldrig** er null i variablen. `string?` siger, at der **gerne må** være null. Compileren advarer med {{en grøn bølgestreg||en bølgestreg, der ikke er rød}}, når du risikerer at bryde løftet.\n\nTo operatorer gør det nemt at være forsigtig:",
        kode: R`string? navn = null;

Console.WriteLine(navn?.Length == null);
Console.WriteLine(navn ?? "Ukendt");

navn = "Peter";
Console.WriteLine(navn?.Length);
Console.WriteLine(navn ?? "Ukendt");`,
        noter: [
          ["navn?.Length", "\"Hvis navn ikke er null, så tag Length — ellers giv null.\" Ingen nedsmeltning."],
          ["navn ?? \"Ukendt\"", "\"Brug navn — men er den null, så brug Ukendt i stedet.\""]
        ],
        output: "True\nUkendt\n5\nPeter",
        md2: "Advarslen på `public string Navn { get; set; }` i en klasse betyder: \"propertyen lover ikke at være null, men du har ikke givet den en værdi\". Du kan skrive `= \"\";` efter den, gøre den til `string?` — eller skrive `required` foran, så den **skal** sættes, når objektet oprettes. Det er en advarsel, ikke en fejl." },
      { t: "udfyld", q: "Undgå en NullReferenceException: brug de to null-operatorer.",
        kode: R`Kunde? k = null;
string by = k[[?.]]By [[??]] "Ingen by";
Console.WriteLine(by);

class Kunde
{
    public string By { get; set; } = "";
}`,
        output: "Ingen by",
        fordi: "`k?.By` giver null, fordi `k` er null — uden at gå ned. `??` sætter så reserveværdien ind." },
      { t: "forudsig",
        kode: R`int? a = null;
int? b = 7;
int c = a ?? 0;
int d = b ?? 0;

Console.WriteLine(c + d);
Console.WriteLine(a.HasValue);`,
        output: "7\nFalse",
        fordi: "`a` er null, så `c` får reserveværdien 0. `b` har værdien 7, så `d` er 7." },
      { t: "ide", h: "Se forskellen med egne øjne",
        md: "Lav et Console-projekt, `ValueReference`. Skriv programmet, og sæt et **breakpoint** på første linje. Start med {{**F5**||den **grønne bille** 🐞}}, og gå ét skridt ad gangen med {{**F10** (Step Over)||knappen **Step Over**}}. Hold øje med variablerne i {{vinduet **Locals** nederst||vinduet **Threads & Variables** nederst}} — du kan se, at `p1` og `p2` ændrer sig **samtidig**, mens `s1` og `s2` ikke gør.",
        kode: R`Person p1 = new Person { Navn = "Anna" };
Person p2 = p1;
p2.Navn = "Bente";

Punkt s1 = new Punkt { X = 1 };
Punkt s2 = s1;
s2.X = 99;

Console.WriteLine($"class:  {p1.Navn} / {p2.Navn}");
Console.WriteLine($"struct: {s1.X} / {s2.X}");

class Person
{
    public string Navn { get; set; } = "";
}

struct Punkt
{
    public int X { get; set; }
}`,
        output: "class:  Bente / Bente\nstruct: 1 / 99" },
      { t: "forklar", q: "Eksamensspørgsmål: Forklar forskellen på value types og reference types. Giv eksempler, og kom ind på stack og heap.",
        svar: "En **value type** indeholder **selve værdien** i variablen. Tildeler man den til en anden variabel, får man en **uafhængig kopi**. Eksempler: `int`, `double`, `bool`, `enum` og `struct`. En **reference type** indeholder en **reference** til et objekt. Tildeler man den, peger begge variabler på **det samme objekt**, så en ændring gennem den ene ses gennem den anden. Eksempler: `class`, arrays, `List` og `string`. Lokale value types ligger på **stacken**. Objekter ligger på **heapen**, og kun referencen ligger på stacken. Objekter, ingen længere peger på, fjernes af **garbage collectoren**. Kun reference types kan være `null` — medmindre man gør en value type nullable med `?`.",
        noegle: ["selve værdien", "kopi", "reference", "samme objekt", "stack", "heap", "garbage collector", "null"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m07l5", titel: "ref og out, record — og de fire søjler samlet", min: 16,
    ord: [
      ["ref", "Sender selve variablen ind i en metode i stedet for en kopi, så metoden kan ændre den."],
      ["out", "Som ref, men bruges til at sende et ekstra resultat UD af en metode. Metoden skal give den en værdi."],
      ["Boxing", "Når en value type pakkes ind i et objekt på heapen, fordi den lægges i en object-variabel. Unboxing er at pakke den ud igen."],
      ["record", "En kort måde at lave en klasse til data på. Får automatisk ToString og sammenlignes på indholdet."],
      ["yield return", "Giver ét element ad gangen fra en metode, der returnerer IEnumerable."],
      ["IEnumerable<T>", "Interfacet for \"noget, der kan gennemløbes med foreach\"."]
    ],
    trin: [
      { t: "laes", h: "ref: lad metoden ændre min variabel",
        md: "Normalt får en metode en **kopi** af en value type. Skriver du `ref` — både i metoden og i kaldet — får den **selve variablen**.",
        kode: R`int a = 5;
Fordobl(ref a);
Console.WriteLine(a);

static void Fordobl(ref int tal)
{
    tal = tal * 2;
}`,
        output: "10",
        md2: "`ref` bruges sjældent. Som regel er det pænere at **returnere** det nye tal. Men du skal kunne læse det." },
      { t: "laes", h: "out: flere resultater ud af én metode",
        md: "En metode kan kun returnere **én** værdi. Med `out` kan den sende flere ud. Du har brugt det mange gange: `int.TryParse(tekst, out int tal)` returnerer en `bool` **og** sender tallet ud.",
        kode: R`Del(17, 5, out int kvotient, out int rest);
Console.WriteLine($"{kvotient} med {rest} til rest");

static void Del(int a, int b, out int kvotient, out int rest)
{
    kvotient = a / b;
    rest = a % b;
}`,
        noter: [
          ["out int kvotient", "I kaldet: lav variablen her, og lad metoden fylde den."],
          ["kvotient = a / b;", "I metoden: en out-parameter **skal** have en værdi, før metoden slutter."]
        ],
        output: "3 med 2 til rest" },
      { t: "valg", q: "Hvad er forskellen på `ref` og `out`?",
        svar: ["ref: variablen skal have en værdi på forhånd, og metoden må ændre den. out: metoden SKAL give den en værdi — den bruges til at sende resultater ud.", "Der er ingen forskel", "out virker kun for tekst", "ref kopierer værdien, out gør ikke"],
        ret: 0, fordi: "`ref` = \"her er min variabel, du må gerne ændre den\". `out` = \"her er en tom plads, læg dit resultat i den\"." },
      { t: "forudsig",
        kode: R`int x = 1;
int y = 1;

Plus10(x);
Plus10Ref(ref y);

Console.WriteLine(x);
Console.WriteLine(y);

static void Plus10(int n) { n += 10; }
static void Plus10Ref(ref int n) { n += 10; }`,
        output: "1\n11",
        fordi: "Uden `ref` ændres kun en kopi. Med `ref` ændres den rigtige variabel." },
      { t: "laes", h: "Boxing: en value type i en kasse",
        md: "Alt arver fra `object` — også `int`. Lægger du en value type i en `object`-variabel, bliver værdien **pakket ind i et objekt på heapen**. Det hedder **boxing**. At tage den ud igen med et cast hedder **unboxing**.",
        kode: R`int tal = 42;
object kasse = tal;
int ud = (int)kasse;
Console.WriteLine(ud + 1);`,
        noter: [
          ["object kasse = tal;", "Boxing: værdien kopieres ind i et objekt."],
          ["(int)kasse", "Unboxing: værdien pakkes ud igen."]
        ],
        output: "43",
        md2: "Boxing koster lidt tid og hukommelse. Det er en af grundene til, at man bruger generics: en `List<int>` gemmer tallene direkte uden at pakke dem ind." },
      { t: "laes", h: "record: en dataklasse på én linje",
        md: "Mange klasser er bare **en klump data**. Til dem findes den korte form `record`. Du får konstruktør, properties og en pæn `ToString` forærende — og to records er **ens, når indholdet er ens**.",
        kode: R`Punkt a = new Punkt(1, 2);
Punkt b = new Punkt(1, 2);

Console.WriteLine(a);
Console.WriteLine(a == b);
Console.WriteLine(a.X + a.Y);

record Punkt(int X, int Y);`,
        output: "Punkt { X = 1, Y = 2 }\nTrue\n3",
        md2: "Med en almindelig `class` havde `a == b` været `False` (to forskellige objekter). Records bruges tit til data, der sendes rundt og ikke skal ændres — fx svar fra et Web API." },
      { t: "laes", h: "Hvad foreach kræver",
        md: "\"Enumeration\" i kursusdagens titel betyder **gennemløb**. `foreach` virker på alt, der implementerer interfacet `IEnumerable<T>`.\n\nDu kan selv skrive en metode, der leverer en række værdier **én ad gangen**. Det gøres med `yield return`:",
        kode: R`foreach (int t in LigeTal(3))
{
    Console.WriteLine(t);
}

static IEnumerable<int> LigeTal(int antal)
{
    for (int i = 1; i <= antal; i++)
    {
        yield return i * 2;
    }
}`,
        noter: [
          ["IEnumerable<int>", "Metoden lover \"noget, der kan gennemløbes og giver heltal\"."],
          ["yield return i * 2;", "Aflevér ét tal — og vent her, til løkken beder om det næste."]
        ],
        output: "2\n4\n6",
        md2: "Du skal sjældent skrive `yield` selv. Men `IEnumerable<T>` møder du **konstant** — det er typen, LINQ arbejder med (modul 9), og den type, mange metoder i MVC tager imod." },
      { t: "skriv", q: "Skriv metoden `MinOgMax`. Den tager `int a` og `int b` og to out-parametre: `out int min` og `out int max`. Brug `Math.Min` og `Math.Max` til at fylde dem.",
        foer: R`MinOgMax(8, 3, out int mindst, out int stoerst);
Console.WriteLine($"{mindst} {stoerst}");`,
        tjek: [
          [/static void MinOgMax\(int a,int b,out int min,out int max\)/, "Signaturen: `static void MinOgMax(int a, int b, out int min, out int max)`"],
          [/min=Math\.Min\(a,b\);/, "`min = Math.Min(a, b);`"],
          [/max=Math\.Max\(a,b\);/, "`max = Math.Max(a, b);`"]
        ],
        loesning: R`static void MinOgMax(int a, int b, out int min, out int max)
{
    min = Math.Min(a, b);
    max = Math.Max(a, b);
}`,
        output: "3 8" },
      { t: "laes", h: "De fire søjler — nu har du dem alle",
        md: "Her er hele billedet. Det er det mest sandsynlige spørgsmål til eksamen, så lær det, så du kan sige det i søvne — **med et eksempel fra dit eget projekt** til hver.",
        noter: [
          ["1. Indkapsling", "Skjul data bag `private`, giv adgang gennem properties og metoder. Klassen beskytter selv sine data. *(Modul 4)*"],
          ["2. Arv", "En klasse bygger videre på en anden: `class Elev : Person`. Fælles kode skrives ét sted. *(Modul 5)*"],
          ["3. Polymorfi", "Samme kald, forskellig opførsel efter objektets rigtige type — via `virtual`/`override` eller et interface. *(Modul 5)*"],
          ["4. Abstraktion", "Vis **hvad**, skjul **hvordan** — med abstrakte klasser og interfaces. *(Dette modul)*"]
        ] },
      { t: "valg", q: "En `Ordreservice` kalder `sender.Send(...)` på en `IBeskedSender` uden at vide, om det er e-mail eller sms. Hvilke søjler ser du her?",
        svar: ["Abstraktion og polymorfi", "Kun indkapsling", "Kun arv", "Ingen af dem"],
        ret: 0, fordi: "**Abstraktion**: servicen kender kun kontrakten, ikke detaljerne. **Polymorfi**: det samme kald, `Send`, gør noget forskelligt, alt efter hvilket objekt der ligger bag interfacet." },
      { t: "ide", h: "Alle fire søjler i ét program",
        md: "Lav et Console-projekt, `Medieafspiller`. Find selv de fire søjler i koden, før du læser facit under den.",
        kode: R`List<IAfspilbar> koe = new List<IAfspilbar>
{
    new Sang("Yesterday", 125),
    new Podcast("Kode og kaffe", 1800),
    new Sang("Imagine", 183)
};

int total = 0;
foreach (IAfspilbar a in koe)
{
    a.Afspil();
    total += a.Sekunder;
}
Console.WriteLine($"I alt {total / 60} minutter");

interface IAfspilbar
{
    int Sekunder { get; }
    void Afspil();
}

abstract class Medie : IAfspilbar
{
    private int sekunder;
    public string Titel { get; }

    public int Sekunder
    {
        get { return sekunder; }
        protected set { sekunder = value < 0 ? 0 : value; }
    }

    protected Medie(string titel, int sekunder)
    {
        Titel = titel;
        Sekunder = sekunder;
    }

    public abstract void Afspil();
}

class Sang : Medie
{
    public Sang(string titel, int sekunder) : base(titel, sekunder) { }

    public override void Afspil()
    {
        Console.WriteLine($"♪ {Titel}");
    }
}

class Podcast : Medie
{
    public Podcast(string titel, int sekunder) : base(titel, sekunder) { }

    public override void Afspil()
    {
        Console.WriteLine($"Podcast: {Titel} ({Sekunder / 60} min)");
    }
}`,
        output: "♪ Yesterday\nPodcast: Kode og kaffe (30 min)\n♪ Imagine\nI alt 35 minutter",
        md2: "**Indkapsling**: feltet `sekunder` er private, og `set` afviser negative tal. **Arv**: `Sang` og `Podcast` arver `Titel` og `Sekunder` fra `Medie`. **Polymorfi**: løkken kalder `Afspil()` uden at vide, hvad objektet er. **Abstraktion**: løkken kender kun interfacet `IAfspilbar`, og `Medie` er abstrakt." },
      { t: "forklar", q: "Eksamensspørgsmål: Forklar de fire grundprincipper i objektorienteret programmering, med et kort eksempel til hver.",
        svar: "**Indkapsling**: data skjules med `private` og nås gennem properties og metoder, så klassen selv sikrer gyldige data — fx en `Konto`, hvor saldoen kun kan ændres gennem `Indsaet` og `Haev`. **Arv**: en klasse overtager medlemmer fra en basisklasse og udvider den — `Elev : Person`. **Polymorfi**: det samme kald giver forskellig opførsel afhængigt af objektets faktiske type — en liste af `Dyr`, hvor `GivLyd()` kører hundens eller kattens udgave. **Abstraktion**: man beskriver, hvad noget kan, og skjuler hvordan — med abstrakte klasser og interfaces, fx `IBeskedSender`, som både e-mail og sms implementerer.",
        noegle: ["indkapsling", "private", "arv", "polymorfi", "samme kald", "abstraktion", "interface"] }
    ] }
  ]
});
})();
