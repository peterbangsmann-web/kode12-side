// Værksted til modul 7 — Abstraktion, interfaces og typer.
(function () {
const R = String.raw;
var m = window.KURSUS.filter(function (x) { return x.id === "m07"; })[0];
if (!m) return;
m.lektioner.push({ id: "m07v", titel: "Værksted: abstraktion, interfaces og typer i praksis", vaerksted: true, min: 75, ord: [], trin: [

  { t: "laes", h: "Sådan arbejder du i værkstedet",
    md: "Nu skal du skrive **hele programmer selv** i {{Visual Studio||Rider}} — med `enum`, abstrakte klasser, interfaces, records og forskellen på value types og reference types.\n\nOpgaverne bliver sværere hen ad vejen. Den første er let. Den fjerde er en fejlfinding, hvor du skal bruge debuggeren. Den sidste samler hele modulet i ét program.",
    noter: [
      ["Skriv selv", "Skriv koden med dine egne fingre. Kopiér ikke fra modulet."],
      ["Kør tit", "Kør efter hver ny klasse eller metode. Så ved du, hvor en fejl kom ind."],
      ["Lad editoren hjælpe", "Skriv `class IngenRabat : IRabat`, sæt markøren på interfacets navn, og brug {{**Ctrl + .** → **Implement interface**||**⌥ + Enter** (Alt + Enter) → **Implement missing members**}}. Det samme virker for abstrakte metoder."],
      ["Brug debuggeren", "Sæt et **breakpoint**, og brug {{**F11** (Step Into)||**Step Into**}} for at gå ind i en metode. I {{**Locals**||**Threads & Variables**}} kan du se, om en variabel er en **kopi** eller peger på **det samme objekt** som en anden."],
      ["Tips før løsning", "Åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af."]
    ] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Ugens dage", projekt: "Ugedage",
    md: "Lav en `enum` med ugens syv dage, og lad en metode med en `switch` afgøre, om en dag er hverdag eller weekend. Bagefter laver du en tekst om til en dag med `Enum.TryParse`.",
    krav: [
      "`enum Ugedag` har værdierne `Mandag`, `Tirsdag`, `Onsdag`, `Torsdag`, `Fredag`, `Loerdag`, `Soendag` (i den rækkefølge)",
      "Metoden `static string Type(Ugedag d)` bruger en `switch`: `Loerdag` og `Soendag` giver `weekend`, alt andet giver `hverdag`",
      "En `foreach` over `Enum.GetValues<Ugedag>()` skriver hver dag som `{tallet} {dagen}: {type}` — fx `0 Mandag: hverdag`",
      "Til sidst laves teksten `\"Fredag\"` om til en `Ugedag` med `Enum.TryParse`, og der skrives `Fredag er dag nr. 5 i ugen` (tallet bag enum-værdien plus 1)"
    ],
    tip: [
      "Tallet bag en enum-værdi får du med et cast: `(int)d`. Den første værdi er 0.",
      "To `case` kan dele den samme kode: `case Ugedag.Loerdag:` og `case Ugedag.Soendag:` lige under hinanden, efterfulgt af `return \"weekend\";`. Under `default:` står `return \"hverdag\";`.",
      "`if (Enum.TryParse(\"Fredag\", out Ugedag dag)) { Console.WriteLine($\"{dag} er dag nr. {(int)dag + 1} i ugen\"); }`"
    ],
    output: "0 Mandag: hverdag\n1 Tirsdag: hverdag\n2 Onsdag: hverdag\n3 Torsdag: hverdag\n4 Fredag: hverdag\n5 Loerdag: weekend\n6 Soendag: weekend\nFredag er dag nr. 5 i ugen",
    loesning: R`foreach (Ugedag d in Enum.GetValues<Ugedag>())
{
    Console.WriteLine($"{(int)d} {d}: {Type(d)}");
}

if (Enum.TryParse("Fredag", out Ugedag dag))
{
    Console.WriteLine($"{dag} er dag nr. {(int)dag + 1} i ugen");
}

static string Type(Ugedag d)
{
    switch (d)
    {
        case Ugedag.Loerdag:
        case Ugedag.Soendag:
            return "weekend";
        default:
            return "hverdag";
    }
}

enum Ugedag { Mandag, Tirsdag, Onsdag, Torsdag, Fredag, Loerdag, Soendag }`,
    ekstra: ["Skriv `Mandag = 1` i stedet for `Mandag` i din enum. Hvad sker der med tallene for de andre dage? Så kan du fjerne `+ 1`.", "Prøv `Enum.TryParse(\"fredag\", …)` med lille f. Lykkes det? (Nej — der skelnes mellem store og små bogstaver. `Enum.TryParse(\"fredag\", true, out Ugedag dag)` ignorerer forskellen.)"] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Lønkørslen", projekt: "Loenkoersel",
    md: "Et firma har tre slags ansatte, og hver slags får løn på sin egen måde. \"En ansat\" i sig selv har ingen løn — derfor er `Ansat` en **abstrakt klasse** med en **abstrakt metode** `Loen()`, som hver konkret klasse **skal** skrive.\n\nSælgeren får fast løn **plus** provision. Derfor arver `Saelger` fra `Fastloennet` og bygger videre på dens løn med `base.Loen()`.",
    krav: [
      "`abstract class Ansat` har `Navn` (`string`, `{ get; }`), en `protected` konstruktør `Ansat(string navn)` og `public abstract decimal Loen();`",
      "`Ansat.ToString()` returnerer `{Navn}: {Loen()} kr.`",
      "`Timeloennet : Ansat` får timesats og antal timer i konstruktøren. Lønnen er sats gange timer",
      "`Fastloennet : Ansat` får en månedsløn i konstruktøren og returnerer den",
      "`Saelger : Fastloennet` får grundløn og salg i konstruktøren. Lønnen er `base.Loen() + salg * 5 / 100` (5 % provision). Derfor skal `Loen()` i `Fastloennet` være `override` — og den kan overskrives igen i `Saelger`",
      "Programmet laver en `List<Ansat>` med `Timeloennet(\"Ali\", 150, 120)`, `Fastloennet(\"Bente\", 32000)` og `Saelger(\"Carl\", 25000, 200000)`, skriver hver ansat ud og til sidst `Samlet løn: {sum} kr.`"
    ],
    tip: [
      "Skriv `Ansat` og `Timeloennet` først, og kør med Ali alene. Konstruktøren i `Timeloennet` skal sende navnet videre: `public Timeloennet(string navn, decimal sats, int timer) : base(navn) { … }`.",
      "`Saelger` arver fra `Fastloennet`, så dens konstruktør kalder `Fastloennet`s konstruktør: `public Saelger(string navn, decimal grundloen, decimal salg) : base(navn, grundloen) { this.salg = salg; }`.",
      "`public override decimal Loen() { return base.Loen() + salg * 5 / 100; }` — `base.Loen()` er her `Fastloennet`s udgave, altså grundlønnen."
    ],
    output: "Ali: 18000 kr.\nBente: 32000 kr.\nCarl: 35000 kr.\nSamlet løn: 85000 kr.",
    loesning: R`List<Ansat> ansatte = new List<Ansat>
{
    new Timeloennet("Ali", 150, 120),
    new Fastloennet("Bente", 32000),
    new Saelger("Carl", 25000, 200000)
};

decimal sum = 0;
foreach (Ansat a in ansatte)
{
    Console.WriteLine(a);
    sum += a.Loen();
}
Console.WriteLine($"Samlet løn: {sum} kr.");

abstract class Ansat
{
    public string Navn { get; }

    protected Ansat(string navn)
    {
        Navn = navn;
    }

    public abstract decimal Loen();

    public override string ToString()
    {
        return $"{Navn}: {Loen()} kr.";
    }
}

class Timeloennet : Ansat
{
    private decimal sats;
    private int timer;

    public Timeloennet(string navn, decimal sats, int timer) : base(navn)
    {
        this.sats = sats;
        this.timer = timer;
    }

    public override decimal Loen()
    {
        return sats * timer;
    }
}

class Fastloennet : Ansat
{
    private decimal maanedsloen;

    public Fastloennet(string navn, decimal maanedsloen) : base(navn)
    {
        this.maanedsloen = maanedsloen;
    }

    public override decimal Loen()
    {
        return maanedsloen;
    }
}

class Saelger : Fastloennet
{
    private decimal salg;

    public Saelger(string navn, decimal grundloen, decimal salg) : base(navn, grundloen)
    {
        this.salg = salg;
    }

    public override decimal Loen()
    {
        return base.Loen() + salg * 5 / 100;
    }
}`,
    ekstra: ["Skriv `Ansat x = new Ansat(\"Test\");`. Læs fejlen, og forklar den med dine egne ord. Slet linjen igen.", "Lav en ny klasse `Praktikant : Ansat`, men skriv **ikke** `Loen()`. Læs fejlen. Det er kontrakten fra den abstrakte metode, der stopper dig.", "Sæt et breakpoint i `Saelger.Loen()`, og brug Step Into på `base.Loen()`. Se, at du havner i `Fastloennet`."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Kassen med udskiftelige rabatter", projekt: "Rabatkasse",
    md: "En kasse skal give rabat — men butikken skifter rabatregler hele tiden. Derfor må klassen `Kasse` **ikke** kende de konkrete rabatregler. Den kender kun **interfacet** `IRabat` og får reglen gennem sin konstruktør.\n\nDet er **løs kobling** og **dependency injection** — præcis det mønster, ASP.NET Core er bygget på.",
    krav: [
      "`interface IRabat` har en property `string Navn { get; }` og en metode `decimal Beregn(decimal beloeb);`, der returnerer rabatten i kroner",
      "`IngenRabat` hedder `Ingen rabat` og giver altid 0",
      "`ProcentRabat` får en procent (`int`) i konstruktøren. Navnet er `{procent} % rabat`, og rabatten er `beloeb * procent / 100`",
      "`Maengderabat` hedder `Mængderabat` og giver 50 kr. i rabat, hvis beløbet er mindst 300 — ellers 0",
      "`Kasse` har et privat felt af typen `IRabat`, som sættes i konstruktøren `Kasse(IRabat rabat)`. Metoden `Afregn(decimal beloeb)` skriver `{navn}: {beløb} - {rabat} = {at betale} kr.`",
      "Programmet laver et array `IRabat[]` med de tre rabatter (i rækkefølgen ovenfor). For hver rabat laves en ny `Kasse`, og der afregnes først 250 og så 400"
    ],
    tip: [
      "Interfacet: `interface IRabat { string Navn { get; } decimal Beregn(decimal beloeb); }`. I klassen skrives propertyen fx som `public string Navn { get { return \"Ingen rabat\"; } }`.",
      "`ProcentRabat` har et privat felt `procent`. Navnet kan bruge det: `public string Navn { get { return $\"{procent} % rabat\"; } }`.",
      "`Afregn`: `decimal r = rabat.Beregn(beloeb); Console.WriteLine($\"{rabat.Navn}: {beloeb} - {r} = {beloeb - r} kr.\");`. I programmet: `foreach (IRabat r in rabatter) { Kasse k = new Kasse(r); k.Afregn(250); k.Afregn(400); }`."
    ],
    output: "Ingen rabat: 250 - 0 = 250 kr.\nIngen rabat: 400 - 0 = 400 kr.\n10 % rabat: 250 - 25 = 225 kr.\n10 % rabat: 400 - 40 = 360 kr.\nMængderabat: 250 - 0 = 250 kr.\nMængderabat: 400 - 50 = 350 kr.",
    loesning: R`IRabat[] rabatter = { new IngenRabat(), new ProcentRabat(10), new Maengderabat() };

foreach (IRabat r in rabatter)
{
    Kasse k = new Kasse(r);
    k.Afregn(250);
    k.Afregn(400);
}

interface IRabat
{
    string Navn { get; }
    decimal Beregn(decimal beloeb);
}

class IngenRabat : IRabat
{
    public string Navn { get { return "Ingen rabat"; } }

    public decimal Beregn(decimal beloeb)
    {
        return 0;
    }
}

class ProcentRabat : IRabat
{
    private int procent;

    public ProcentRabat(int procent)
    {
        this.procent = procent;
    }

    public string Navn { get { return $"{procent} % rabat"; } }

    public decimal Beregn(decimal beloeb)
    {
        return beloeb * procent / 100;
    }
}

class Maengderabat : IRabat
{
    public string Navn { get { return "Mængderabat"; } }

    public decimal Beregn(decimal beloeb)
    {
        if (beloeb >= 300)
        {
            return 50;
        }
        return 0;
    }
}

class Kasse
{
    private IRabat rabat;

    public Kasse(IRabat rabat)
    {
        this.rabat = rabat;
    }

    public void Afregn(decimal beloeb)
    {
        decimal r = rabat.Beregn(beloeb);
        Console.WriteLine($"{rabat.Navn}: {beloeb} - {r} = {beloeb - r} kr.");
    }
}`,
    ekstra: ["Lav en fjerde regel, `Medlemsrabat`, der giver 15 %. Hvor mange linjer i `Kasse` skal du ændre? (Ingen.)", "Læg mærke til, at `Kasse` aldrig skriver `new ProcentRabat(...)`. Den, der **bruger** kassen, bestemmer reglen. I ASP.NET Core er det programmets opstart, der gør det."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Fejlfinding: bonuspoint, der forsvinder", projekt: "Bonuspoint",
    md: "En butik giver alle kunder 50 bonuspoint. Anna har 100 og Bo har 40, så bagefter burde de have 150 og 90. Metoden siger selv, at den giver pointene — men når listen skrives ud, er alt som før.\n\nProgrammet kan oversættes. Find fejlen **med debuggeren**:\n\n1. Kopiér koden ind i Program.cs, og kør den. Se den forkerte udskrift.\n2. Sæt et **breakpoint** på linjen `Console.WriteLine($\"{k.Navn} får …` inde i `GivBonus`.\n3. Start med debuggeren ({{**F5**||den **grønne bille** 🐞}}). Se i {{**Locals**||**Threads & Variables**}}, at `k.Point` **er** blevet 150.\n4. Gå ud af metoden med {{**Shift + F11** (Step Out)||knappen **Step Out**}}. Klap nu `kunder` ud, og se på Annas point. Hvad er de?\n5. Kig på, hvordan `Kunde` er erklæret. Er det en `class`?",
    krav: [
      "Find ud af, hvorfor ændringen inde i `GivBonus` ikke kan ses i listen bagefter",
      "Ret fejlen med **ét ord** — `GivBonus` og løkkerne må ikke ændres",
      "Programmet skriver `Anna får 50 bonuspoint`, `Bo får 50 bonuspoint`, `Anna: 150 point` og `Bo: 90 point`"
    ],
    start: R`List<Kunde> kunder = new List<Kunde>
{
    new Kunde { Navn = "Anna", Point = 100 },
    new Kunde { Navn = "Bo", Point = 40 }
};

foreach (Kunde k in kunder)
{
    GivBonus(k, 50);
}

foreach (Kunde k in kunder)
{
    Console.WriteLine($"{k.Navn}: {k.Point} point");
}

static void GivBonus(Kunde k, int point)
{
    k.Point += point;
    Console.WriteLine($"{k.Navn} får {point} bonuspoint");
}

struct Kunde
{
    public string Navn { get; set; }
    public int Point { get; set; }
}`,
    startOutput: "Anna får 50 bonuspoint\nBo får 50 bonuspoint\nAnna: 100 point\nBo: 40 point",
    tip: [
      "Inde i metoden er `k.Point` 150. Ude i listen er Annas point stadig 100. Så må `k` i metoden være et **andet** objekt end det i listen. Hvornår sker det?",
      "`Kunde` er en `struct` — en **value type**. Når en value type sendes til en metode, får metoden en **kopi**. Metoden ændrer kopien, og kopien forsvinder, når metoden er færdig.",
      "Skift `struct Kunde` til `class Kunde`. En klasse er en **reference type**: metoden får en kopi af **referencen**, som peger på **samme** objekt som listen."
    ],
    output: "Anna får 50 bonuspoint\nBo får 50 bonuspoint\nAnna: 150 point\nBo: 90 point",
    loesning: R`List<Kunde> kunder = new List<Kunde>
{
    new Kunde { Navn = "Anna", Point = 100 },
    new Kunde { Navn = "Bo", Point = 40 }
};

foreach (Kunde k in kunder)
{
    GivBonus(k, 50);
}

foreach (Kunde k in kunder)
{
    Console.WriteLine($"{k.Navn}: {k.Point} point");
}

static void GivBonus(Kunde k, int point)
{
    k.Point += point;
    Console.WriteLine($"{k.Navn} får {point} bonuspoint");
}

class Kunde
{
    public string Navn { get; set; }
    public int Point { get; set; }
}`,
    ekstra: ["Sæt `struct` tilbage, og skriv `kunder[0].Point += 50;` i toppen. Læs fejlen: compileren nægter, fordi `kunder[0]` giver en kopi, og en ændring af den ville gå tabt. Med `class` virker linjen.", "Der findes en anden rettelse, der beholder `struct`: lad `GivBonus` tage `ref Kunde k`. Hvorfor kan det ikke lade sig gøre for løkkevariablen i en `foreach`? (Den må ikke ændres.) Det er en af grundene til, at man næsten altid bruger `class`."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Samlet program: webshoppens ordrer", projekt: "Webshop",
    md: "Nu samler du hele modulet. En webshop har ordrer med varer, en status og en fragtform. Du skal bruge:\n\n- en **enum** til ordrens status,\n- en **record** til varerne (de er bare data),\n- et **interface** til fragten, så fragtformen kan skiftes ud,\n- en **nullable** `string?` til en rabatkode, som de fleste ordrer ikke har, og `??` til at skrive den ud,\n- **out** via `Enum.TryParse` til at sætte status ud fra en tekst,\n- **yield return** til at give de ordrer, der har en bestemt status.",
    krav: [
      "`enum OrdreStatus { Ny, Betalt, Sendt, Annulleret }` og `record Vare(string Navn, decimal Pris);`",
      "`interface IFragt` har `string Navn { get; }` og `decimal Pris(decimal varetotal);`. `Afhentning` koster 0. `Pakkepost` koster 49 — men 0, hvis varetotalen er mindst 500",
      "`Ordre` har `Id` (`int`, `{ get; }`), `Varer` (`List<Vare>`, `{ get; }`), `Status` (`OrdreStatus`), `Fragt` (`IFragt`) og `Rabatkode` (`string?`). Konstruktøren `Ordre(int id, IFragt fragt)` opretter listen og sætter status til `Ny`",
      "`Ordre.VareTotal()` lægger varernes priser sammen. `Ordre.Total()` er varetotalen plus fragten",
      "`Ordre.ToString()` returnerer `#{Id} {Status}: {antal} varer, {fragtens navn}, i alt {Total()} kr. (rabatkode: {Rabatkode ?? \"ingen\"})`",
      "`static bool SaetStatus(Ordre o, string tekst)` bruger `Enum.TryParse`. Lykkes det, sættes status, og der returneres `true` — ellers `false`",
      "`static IEnumerable<Ordre> MedStatus(List<Ordre> ordrer, OrdreStatus status)` giver de ordrer, der har den status, med `yield return`",
      "Programmet: ordre 1 (Pakkepost) med Kaffe 45 og Kop 120. Ordre 2 (Pakkepost) med Kande 399 og Kop 120 og rabatkoden `SOMMER`. Ordre 3 (Afhentning) med to **nye** `Vare(\"Kaffe\", 45)`-objekter",
      "Sæt status: ordre 1 `\"Betalt\"`, ordre 2 `\"Sendt\"`, ordre 3 `\"Betalt\"` og derefter ordre 3 `\"Forsvundet\"`. Lykkes det ikke, skrives `Ukendt status: {tekst}`",
      "Skriv alle tre ordrer, derefter `Betalte ordrer:` og hver betalt ordre som `  #{Id}: {Total()} kr.`, og til sidst `Samme vare? {svar}`, hvor svaret er `==` mellem de to kaffe-varer i ordre 3"
    ],
    tip: [
      "Byg det i lag: enum, record og `Ordre` med `Afhentning` først. Lav én ordre, og skriv den ud. Tilføj så `Pakkepost`, `SaetStatus` og `MedStatus`.",
      "`Pakkepost`: `public decimal Pris(decimal varetotal) { if (varetotal >= 500) { return 0; } return 49; }`. `Ordre.Total()`: `decimal v = VareTotal(); return v + Fragt.Pris(v);`.",
      "`MedStatus`: `foreach (Ordre o in ordrer) { if (o.Status == status) { yield return o; } }`. `SaetStatus`: `if (Enum.TryParse(tekst, out OrdreStatus ny)) { o.Status = ny; return true; } return false;`."
    ],
    output: "Ukendt status: Forsvundet\n#1 Betalt: 2 varer, Pakkepost, i alt 214 kr. (rabatkode: ingen)\n#2 Sendt: 2 varer, Pakkepost, i alt 519 kr. (rabatkode: SOMMER)\n#3 Betalt: 2 varer, Afhentning, i alt 90 kr. (rabatkode: ingen)\nBetalte ordrer:\n  #1: 214 kr.\n  #3: 90 kr.\nSamme vare? True",
    loesning: R`Ordre o1 = new Ordre(1, new Pakkepost());
o1.Varer.Add(new Vare("Kaffe", 45));
o1.Varer.Add(new Vare("Kop", 120));

Ordre o2 = new Ordre(2, new Pakkepost());
o2.Varer.Add(new Vare("Kande", 399));
o2.Varer.Add(new Vare("Kop", 120));
o2.Rabatkode = "SOMMER";

Ordre o3 = new Ordre(3, new Afhentning());
o3.Varer.Add(new Vare("Kaffe", 45));
o3.Varer.Add(new Vare("Kaffe", 45));

List<Ordre> ordrer = new List<Ordre> { o1, o2, o3 };

SaetStatus(o1, "Betalt");
SaetStatus(o2, "Sendt");
SaetStatus(o3, "Betalt");
if (!SaetStatus(o3, "Forsvundet"))
{
    Console.WriteLine("Ukendt status: Forsvundet");
}

foreach (Ordre o in ordrer)
{
    Console.WriteLine(o);
}

Console.WriteLine("Betalte ordrer:");
foreach (Ordre o in MedStatus(ordrer, OrdreStatus.Betalt))
{
    Console.WriteLine($"  #{o.Id}: {o.Total()} kr.");
}

Console.WriteLine($"Samme vare? {o3.Varer[0] == o3.Varer[1]}");

static bool SaetStatus(Ordre o, string tekst)
{
    if (Enum.TryParse(tekst, out OrdreStatus ny))
    {
        o.Status = ny;
        return true;
    }
    return false;
}

static IEnumerable<Ordre> MedStatus(List<Ordre> ordrer, OrdreStatus status)
{
    foreach (Ordre o in ordrer)
    {
        if (o.Status == status)
        {
            yield return o;
        }
    }
}

enum OrdreStatus { Ny, Betalt, Sendt, Annulleret }

record Vare(string Navn, decimal Pris);

interface IFragt
{
    string Navn { get; }
    decimal Pris(decimal varetotal);
}

class Afhentning : IFragt
{
    public string Navn { get { return "Afhentning"; } }

    public decimal Pris(decimal varetotal)
    {
        return 0;
    }
}

class Pakkepost : IFragt
{
    public string Navn { get { return "Pakkepost"; } }

    public decimal Pris(decimal varetotal)
    {
        if (varetotal >= 500)
        {
            return 0;
        }
        return 49;
    }
}

class Ordre
{
    public int Id { get; }
    public List<Vare> Varer { get; }
    public OrdreStatus Status { get; set; }
    public IFragt Fragt { get; set; }
    public string? Rabatkode { get; set; }

    public Ordre(int id, IFragt fragt)
    {
        Id = id;
        Fragt = fragt;
        Varer = new List<Vare>();
        Status = OrdreStatus.Ny;
    }

    public decimal VareTotal()
    {
        decimal sum = 0;
        foreach (Vare v in Varer)
        {
            sum += v.Pris;
        }
        return sum;
    }

    public decimal Total()
    {
        decimal v = VareTotal();
        return v + Fragt.Pris(v);
    }

    public override string ToString()
    {
        return $"#{Id} {Status}: {Varer.Count} varer, {Fragt.Navn}, i alt {Total()} kr. (rabatkode: {Rabatkode ?? "ingen"})";
    }
}`,
    ekstra: ["Lav `Vare` om til en almindelig `class Vare` med de to properties og en konstruktør. Hvad skriver `Samme vare?` nu — og hvorfor?", "Skriv `Console.WriteLine(o3.Varer[0]);`. Det er record'ens indbyggede `ToString`, du ser.", "Lav en tredje fragtform, `Express`, der altid koster 99. Ingen af de andre klasser skal ændres."] },

  // ------------------------------------------------------------------
  { t: "spor", h: "Spor: kopi, array og ref",
    q: "Følg programmet, mens det hopper ind i metoderne. Rækkerne står i den rækkefølge, linjerne **bliver kørt**. Skriv værdien af `a` og `t[0]` lige efter hver linje. Bemærk: inde i metoderne hedder parametrene `x` og `arr` — spørgsmålet er, om de ændrer `a` og `t` udenfor.",
    kode: R`int a = 5;
int[] t = { 5 };
Plus1(a, t);
Dobbelt(ref a);
Plus1(a, t);
static void Plus1(int x, int[] arr)
{
    x = x + 1;
    arr[0] = arr[0] + 1;
}
static void Dobbelt(ref int x)
{
    x = x * 2;
}`,
    kolonner: ["a", "t[0]"],
    raekker: [[1, "=5", "=–"], [2, "=5", "=5"], [8, "5", "5"], [9, "5", "6"], [13, "10", "6"], [8, "10", "6"], [9, "10", "7"]],
    fordi: "`Plus1` får en **kopi** af `a` (en `int` er en value type), så linje 8 ændrer kun kopien `x` — `a` står stille. Men et array er en **reference type**: `arr` peger på **samme** array som `t`, så linje 9 ændrer `t[0]`. `Dobbelt` får **selve variablen** `a` med `ref`, så linje 13 fordobler den rigtige `a`: 5 → 10." },

  { t: "spor", h: "Spor: struct og class side om side",
    q: "`Punkt` er en `struct`, og `Boks` er en `class`. Skriv `X` for alle fire variabler lige efter hver linje. Hold øje med linje 7: hvad sker der med `c`, når `b` får et **nyt** objekt?",
    kode: R`Punkt p = new Punkt { X = 1 };
Punkt q = p;
q.X = 5;
Boks b = new Boks { X = 1 };
Boks c = b;
c.X = 5;
b = new Boks { X = 9 };
c.X = c.X + 1;
Console.WriteLine($"{p.X} {q.X} {b.X} {c.X}");

struct Punkt { public int X { get; set; } }
class Boks { public int X { get; set; } }`,
    kolonner: ["p.X", "q.X", "b.X", "c.X"],
    raekker: [[1, "=1", "=–", "=–", "=–"], [2, "=1", "=1", "=–", "=–"], [3, "1", "5", "–", "–"], [4, "1", "5", "1", "–"], [5, "1", "5", "1", "1"], [6, "1", "5", "5", "5"], [7, "1", "5", "9", "5"], [8, "1", "5", "9", "6"]],
    slut: false,
    output: "1 5 9 6",
    fordi: "Linje 2 laver en **kopi** af structen, så `q.X = 5` rører ikke `p`. Linje 5 kopierer kun **referencen**: `b` og `c` peger på samme boks, så `c.X = 5` ses også gennem `b`. Linje 7 lader `b` pege på en **ny** boks — men `c` peger stadig på den gamle. Derfor ændrer linje 8 kun den gamle boks: `c.X` bliver 6, og `b.X` forbliver 9." },

  { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: I fejlfindingsopgaven gav `GivBonus` kunderne 50 point, men ændringen forsvandt. Hvorfor — og hvorfor løste det problemet at skrive `class` i stedet for `struct`?",
    svar: "En `struct` er en **value type**. Når den sendes til en metode, får metoden en **kopi** af hele værdien. `GivBonus` lagde pointene til **kopien**, og kopien forsvandt, da metoden var færdig — kunden i listen var uændret. En `class` er en **reference type**: variablen indeholder en **reference** til objektet på **heapen**. Metoden får en kopi af referencen, men den peger på **det samme objekt** som listen, så ændringen kan ses bagefter. Derfor bruger man næsten altid `class` til objekter, der skal kunne ændres.",
    noegle: ["value type", "kopi", "reference type", "samme objekt", "heap", "struct", "class"] }

] });
})();
