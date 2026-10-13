// Værksted til modul 4 — Klasser og objekter.
(function () {
const R = String.raw;
var m = window.KURSUS.filter(function (x) { return x.id === "m04"; })[0];
if (!m) return;
m.lektioner.push({ id: "m04v", titel: "Værksted: dine egne klasser", vaerksted: true, min: 60, ord: [], trin: [

  { t: "laes", h: "Sådan arbejder du i værkstedet",
    md: "Nu skal du skrive **hele programmer selv** i {{Visual Studio||Rider}}. Siden her giver dig opgaven, kravene og det, programmet skal skrive. Resten er dit.\n\nOpgaverne bliver sværere hen ad vejen. Den første er let — den er til at komme i gang. Den sidste samler hele modulet: klasser, properties, konstruktører, `static`, `ToString` og objekter, der har andre objekter.",
    noter: [
      ["Skriv selv", "Skriv koden med dine egne fingre. Kopiér ikke fra modulet. Det er skrivningen, der får det til at sidde."],
      ["Kør tit", "Kør programmet efter hver lille ændring. Så ved du præcis, hvilken linje der lavede en fejl."],
      ["Brug debuggeren", "Virker det ikke, så sæt et **breakpoint** og gå ét skridt ad gangen. Se værdierne i {{**Locals**||**Threads & Variables**}} i stedet for at gætte."],
      ["Tips før løsning", "Sidder du fast, så åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af, i stedet for at kopiere."],
      ["Sammenlign", "Når programmet kører, kopierer du det, det skrev, ind på siden. Så tjekker siden, om det passer tegn for tegn."]
    ] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Hunde i en kennel", projekt: "Kennel",
    md: "Lav en klasse, der beskriver en hund. Hver hund kender sit navn og sin alder og kan præsentere sig selv. Programmet laver to hunde, lader dem præsentere sig, og så har den ene fødselsdag.",
    krav: [
      "Klassen `Hund` har to auto-properties: `Navn` (`string`) og `Alder` (`int`)",
      "`Hund` har en metode `Praesenter()`, der skriver `Jeg hedder {Navn} og er {Alder} år`",
      "`Hund` har en metode `HarFoedselsdag()`, der lægger 1 til `Alder`",
      "Programmet laver hunden Fido på 3 år og hunden Bella på 7 år med en object initializer (`new Hund { … }`)",
      "Først præsenterer Fido sig, så Bella",
      "Derefter har Fido fødselsdag, og Fido præsenterer sig igen"
    ],
    tip: [
      "Begynd med klassen nederst i Program.cs: `class Hund { … }` med de to properties `{ get; set; }`.",
      "Metoderne i klassen skrives **uden** `static`, så de kan bruge hundens egne properties.",
      "`Hund fido = new Hund { Navn = \"Fido\", Alder = 3 };` og derefter `fido.Praesenter();`."
    ],
    output: "Jeg hedder Fido og er 3 år\nJeg hedder Bella og er 7 år\nJeg hedder Fido og er 4 år",
    loesning: R`Hund fido = new Hund { Navn = "Fido", Alder = 3 };
Hund bella = new Hund { Navn = "Bella", Alder = 7 };

fido.Praesenter();
bella.Praesenter();

fido.HarFoedselsdag();
fido.Praesenter();

class Hund
{
    public string Navn { get; set; }
    public int Alder { get; set; }

    public void Praesenter()
    {
        Console.WriteLine($"Jeg hedder {Navn} og er {Alder} år");
    }

    public void HarFoedselsdag()
    {
        Alder++;
    }
}`,
    ekstra: ["Flyt klassen `Hund` over i sin egen fil, `Hund.cs` (husk `using Kennel;` øverst i Program.cs). Programmet skal skrive præcis det samme.", "Lav et array med tre hunde, og lad dem alle præsentere sig i en `foreach`."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "En bankkonto, der passer på sig selv", projekt: "Bank",
    md: "Lav en konto, som resten af programmet **ikke** kan snyde. Saldoen kan læses af alle, men kun ændres gennem kontoens egne metoder — og de siger nej til beløb, der ikke giver mening.",
    krav: [
      "Klassen `Konto` har en property `Ejer` (`string`), som kun kan sættes i konstruktøren: `{ get; }`",
      "`Konto` har en property `Saldo` (`decimal`), som alle kan læse, men kun klassen selv kan ændre: `{ get; private set; }`",
      "Konstruktøren er `Konto(string ejer)`",
      "`Indsaet(decimal beloeb)`: er beløbet 0 eller mindre, skrives `Ugyldigt beløb: {beloeb}`, ellers lægges beløbet til saldoen",
      "`Haev(decimal beloeb)`: er beløbet større end saldoen, skrives `Afvist: {Ejer} har kun {Saldo} kr.`, ellers trækkes beløbet fra",
      "`ToString()` returnerer `{Ejer}: {Saldo} kr.`",
      "Programmet laver en konto til Peter, indsætter 1000, indsætter -50, hæver 300, hæver 5000 og skriver til sidst kontoen ud med `Console.WriteLine(k);`"
    ],
    tip: [
      "Skriv klassen først: de to properties, så konstruktøren, så metoderne én ad gangen. Kør efter hver metode.",
      "En metode kan stoppe tidligt med `return;`. Fx: `if (beloeb <= 0) { Console.WriteLine(...); return; }` og så `Saldo += beloeb;` bagefter.",
      "`ToString` skrives `public override string ToString() { return $\"{Ejer}: {Saldo} kr.\"; }`."
    ],
    output: "Ugyldigt beløb: -50\nAfvist: Peter har kun 700 kr.\nPeter: 700 kr.",
    loesning: R`Konto k = new Konto("Peter");
k.Indsaet(1000);
k.Indsaet(-50);
k.Haev(300);
k.Haev(5000);
Console.WriteLine(k);

class Konto
{
    public string Ejer { get; }
    public decimal Saldo { get; private set; }

    public Konto(string ejer)
    {
        Ejer = ejer;
    }

    public void Indsaet(decimal beloeb)
    {
        if (beloeb <= 0)
        {
            Console.WriteLine($"Ugyldigt beløb: {beloeb}");
            return;
        }
        Saldo += beloeb;
    }

    public void Haev(decimal beloeb)
    {
        if (beloeb > Saldo)
        {
            Console.WriteLine($"Afvist: {Ejer} har kun {Saldo} kr.");
            return;
        }
        Saldo -= beloeb;
    }

    public override string ToString()
    {
        return $"{Ejer}: {Saldo} kr.";
    }
}`,
    ekstra: ["Skriv `k.Saldo = 999999;` i Program.cs. Læs fejlen i {{Error List||Problems}}, og forklar med egne ord, hvorfor den er der. Slet linjen igen.", "Tilføj en static property `AntalKonti`, der tælles op i konstruktøren, og skriv den ud til sidst."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Fejlfinding: billetautomaten", projekt: "Billetter",
    md: "Programmet nedenfor skal give hver billet sit **eget** fortløbende nummer: Anna får 1, Bo får 2 og Carl får 3. Men alle tre billetter skriver det samme nummer.\n\nProgrammet kan oversættes, så compileren hjælper dig ikke. Find fejlen **med debuggeren**, ikke ved at gætte:\n\n1. Kopiér koden ind i Program.cs, og kør den. Se den forkerte udskrift.\n2. Sæt et **breakpoint** på linjen `nummer = naeste;` (klik i den grå kant til venstre for linjen).\n3. Start med debuggeren ({{**F5**||den **grønne bille** 🐞}}). Programmet stopper, når den **første** billet bliver lavet.\n4. Hold musen over `nummer` og `naeste`, og skriv værdierne ned. Fortsæt ({{**F5**||den grønne pil **Resume**}}), så det stopper ved den **anden** billet.\n5. Hold igen musen over `nummer`, **før** linjen er kørt. Den anden billet er et helt nyt objekt — hvilken værdi burde dens `nummer` så have?",
    krav: [
      "Find den linje, der gør, at alle billetter deler ét nummer",
      "Ret fejlen ved at ændre **én** linje — resten af programmet skal være uændret",
      "Programmet skriver de tre billetter med numrene 1, 2 og 3 og til sidst `Solgt i alt: 3`"
    ],
    start: R`Billet a = new Billet("Anna");
Billet b = new Billet("Bo");
Billet c = new Billet("Carl");

Console.WriteLine(a);
Console.WriteLine(b);
Console.WriteLine(c);
Console.WriteLine($"Solgt i alt: {Billet.Solgt}");

class Billet
{
    private static int naeste = 1;
    private static int nummer;

    public string Navn { get; }
    public static int Solgt => naeste - 1;

    public Billet(string navn)
    {
        Navn = navn;
        nummer = naeste;
        naeste++;
    }

    public override string ToString()
    {
        return $"Billet {nummer}: {Navn}";
    }
}`,
    startOutput: "Billet 3: Anna\nBillet 3: Bo\nBillet 3: Carl\nSolgt i alt: 3",
    tip: [
      "Et nyt objekt starter med standardværdier: et `int`-felt, der hører til objektet, er 0. Var `nummer` allerede 1, da den anden billet blev lavet? Så hører feltet ikke til den enkelte billet.",
      "Se på de to felter øverst i klassen. Hvad betyder `static`? Der findes kun **ét** eksemplar, som alle objekter deler.",
      "`naeste` skal være fælles (det er automatens tæller), men `nummer` skal hver billet have for sig selv. Fjern `static` fra `nummer`."
    ],
    output: "Billet 1: Anna\nBillet 2: Bo\nBillet 3: Carl\nSolgt i alt: 3",
    loesning: R`Billet a = new Billet("Anna");
Billet b = new Billet("Bo");
Billet c = new Billet("Carl");

Console.WriteLine(a);
Console.WriteLine(b);
Console.WriteLine(c);
Console.WriteLine($"Solgt i alt: {Billet.Solgt}");

class Billet
{
    private static int naeste = 1;
    private int nummer;

    public string Navn { get; }
    public static int Solgt => naeste - 1;

    public Billet(string navn)
    {
        Navn = navn;
        nummer = naeste;
        naeste++;
    }

    public override string ToString()
    {
        return $"Billet {nummer}: {Navn}";
    }
}`,
    ekstra: ["Flyt de tre `Console.WriteLine(a)`… op lige efter hver `new Billet(...)` i den **fejlbehæftede** udgave. Hvorfor ser det pludselig rigtigt ud? (Svar: hver billet bliver skrevet ud, før den næste overskriver det fælles felt. Fejlen er der stadig — den er bare skjult.)"] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Bøger, der kan lånes", projekt: "Bibliotek",
    md: "Lav en klasse til et bibliotek. En bog kender sin titel og forfatter og ved selv, om den er udlånt. Den nægter at blive lånt to gange — og den nægter at blive afleveret, hvis den ikke er lånt.\n\nKender man ikke forfatteren, skal man kunne lave bogen med titlen alene. Brug **constructor chaining** (`: this(...)`), så koden i konstruktøren kun står ét sted.",
    krav: [
      "Klassen `Bog` har `Titel` og `Forfatter` (`string`, begge `{ get; }`) og `ErUdlaant` (`bool`, `{ get; private set; }`)",
      "Konstruktøren `Bog(string titel, string forfatter)` gemmer titel og forfatter",
      "Konstruktøren `Bog(string titel)` kalder den anden med `: this(titel, \"Ukendt\")`",
      "`Udlaan()`: er bogen udlånt, skrives `{Titel} er allerede udlånt`. Ellers bliver den udlånt, og der skrives `{Titel} er nu udlånt`",
      "`Aflever()`: er bogen ikke udlånt, skrives `{Titel} er ikke udlånt`. Ellers bliver den afleveret, og der skrives `{Titel} er afleveret`",
      "`ToString()` returnerer `{Titel} af {Forfatter} (udlånt)` eller `{Titel} af {Forfatter} (hjemme)`",
      "Programmet laver `a = new Bog(\"Dune\", \"Frank Herbert\")` og `b = new Bog(\"Den lille prins\")` og kalder i denne rækkefølge: `a.Udlaan()`, `a.Udlaan()`, `b.Aflever()`, `a.Aflever()`, `b.Udlaan()`. Til sidst skrives `a` og `b` ud"
    ],
    tip: [
      "Lav klassen med de tre properties og de to konstruktører først. Skriv `Console.WriteLine(a);` og kør, før du laver metoderne.",
      "Den korte konstruktør har en tom krop: `public Bog(string titel) : this(titel, \"Ukendt\") { }`.",
      "I `ToString` kan du vælge teksten med den ternære operator (modul 2): `string status = ErUdlaant ? \"udlånt\" : \"hjemme\";`."
    ],
    output: "Dune er nu udlånt\nDune er allerede udlånt\nDen lille prins er ikke udlånt\nDune er afleveret\nDen lille prins er nu udlånt\nDune af Frank Herbert (hjemme)\nDen lille prins af Ukendt (udlånt)",
    loesning: R`Bog a = new Bog("Dune", "Frank Herbert");
Bog b = new Bog("Den lille prins");

a.Udlaan();
a.Udlaan();
b.Aflever();
a.Aflever();
b.Udlaan();

Console.WriteLine(a);
Console.WriteLine(b);

class Bog
{
    public string Titel { get; }
    public string Forfatter { get; }
    public bool ErUdlaant { get; private set; }

    public Bog(string titel, string forfatter)
    {
        Titel = titel;
        Forfatter = forfatter;
    }

    public Bog(string titel) : this(titel, "Ukendt")
    {
    }

    public void Udlaan()
    {
        if (ErUdlaant)
        {
            Console.WriteLine($"{Titel} er allerede udlånt");
            return;
        }
        ErUdlaant = true;
        Console.WriteLine($"{Titel} er nu udlånt");
    }

    public void Aflever()
    {
        if (!ErUdlaant)
        {
            Console.WriteLine($"{Titel} er ikke udlånt");
            return;
        }
        ErUdlaant = false;
        Console.WriteLine($"{Titel} er afleveret");
    }

    public override string ToString()
    {
        string status = ErUdlaant ? "udlånt" : "hjemme";
        return $"{Titel} af {Forfatter} ({status})";
    }
}`,
    ekstra: ["Sæt et breakpoint i den korte konstruktør, og brug {{**F11** (Step Into)||**Step Into**}}. Se, at den lange konstruktør kører **før** den korte konstruktørs krop.", "Giv `Bog` en property `AntalUdlaan` (`{ get; private set; }`), der tælles op ved hvert udlån, og vis den i `ToString`."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Samlet program: et fodboldhold", projekt: "Fodbold",
    md: "Nu samler du hele modulet i ét program med **tre klasser**, der arbejder sammen. Et hold **har en** træner og **har** et array af spillere (komposition). Hver spiller holder selv styr på sine mål, og klassen `Spiller` tæller, hvor mange spillere der er lavet i alt.\n\nLæg gerne hver klasse i sin egen fil: `Traener.cs`, `Spiller.cs` og `Hold.cs`. Så skal Program.cs starte med `using Fodbold;`.",
    krav: [
      "`Traener` har en auto-property `Navn` (`string`)",
      "`Spiller` har `Navn` (`string`, `{ get; }`), `Nummer` (`int`, `{ get; }`) og `Maal` (`int`, `{ get; private set; }`) og en konstruktør `Spiller(string navn, int nummer)`",
      "`Spiller` har en static property `Antal` (`{ get; private set; }`), som konstruktøren tæller én op",
      "`Spiller.Scor()` lægger 1 til `Maal`. `ToString()` returnerer `#{Nummer} {Navn}: {Maal} mål`",
      "`Hold` har `Navn` (`string`), `Traener` (`Traener`) og `Spillere` (`Spiller[]`) — alle auto-properties med `get; set;`",
      "`Hold.TotalMaal()` returnerer summen af alle spilleres mål. `Hold.Topscorer()` returnerer den spiller, der har flest mål (ved lighed den første)",
      "`Hold.Vis()` skriver først `{Navn} (træner: {trænerens navn})` — eller `{Navn} (træner: ingen)`, hvis `Traener` er `null` — og derefter hver spiller på sin egen linje",
      "Programmet: Anna (nr. 10), Bo (nr. 7) og Carl (nr. 1). Anna scorer, Anna scorer, Bo scorer, Anna scorer. Holdet hedder `AGF` med træneren Jakob og de tre spillere (object initializer). Kald `Vis()`, og skriv så `Mål i alt: …`, `Topscorer: …` (kun navnet) og `Spillere oprettet: …`"
    ],
    tip: [
      "Byg det i lag: først `Spiller` alene med to spillere og `Console.WriteLine(s1);`. Kør. Så `Traener`. Så `Hold` med `Vis()`. Kør efter hvert lag.",
      "`TotalMaal` er samme mønster som summen i modul 3: `int sum = 0; foreach (Spiller s in Spillere) { sum += s.Maal; } return sum;`.",
      "`Topscorer`: start med `Spiller bedst = Spillere[0];`, gå alle igennem, og skift `bedst` ud, når `s.Maal > bedst.Maal`. I `Vis()`: `if (Traener == null) { … } else { … }`."
    ],
    output: "AGF (træner: Jakob)\n#10 Anna: 3 mål\n#7 Bo: 1 mål\n#1 Carl: 0 mål\nMål i alt: 4\nTopscorer: Anna\nSpillere oprettet: 3",
    loesning: R`Spiller anna = new Spiller("Anna", 10);
Spiller bo = new Spiller("Bo", 7);
Spiller carl = new Spiller("Carl", 1);

anna.Scor();
anna.Scor();
bo.Scor();
anna.Scor();

Hold hold = new Hold
{
    Navn = "AGF",
    Traener = new Traener { Navn = "Jakob" },
    Spillere = new Spiller[] { anna, bo, carl }
};

hold.Vis();
Console.WriteLine($"Mål i alt: {hold.TotalMaal()}");
Console.WriteLine($"Topscorer: {hold.Topscorer().Navn}");
Console.WriteLine($"Spillere oprettet: {Spiller.Antal}");

class Traener
{
    public string Navn { get; set; }
}

class Spiller
{
    public static int Antal { get; private set; }

    public string Navn { get; }
    public int Nummer { get; }
    public int Maal { get; private set; }

    public Spiller(string navn, int nummer)
    {
        Navn = navn;
        Nummer = nummer;
        Antal++;
    }

    public void Scor()
    {
        Maal++;
    }

    public override string ToString()
    {
        return $"#{Nummer} {Navn}: {Maal} mål";
    }
}

class Hold
{
    public string Navn { get; set; }
    public Traener Traener { get; set; }
    public Spiller[] Spillere { get; set; }

    public int TotalMaal()
    {
        int sum = 0;
        foreach (Spiller s in Spillere)
        {
            sum += s.Maal;
        }
        return sum;
    }

    public Spiller Topscorer()
    {
        Spiller bedst = Spillere[0];
        foreach (Spiller s in Spillere)
        {
            if (s.Maal > bedst.Maal)
            {
                bedst = s;
            }
        }
        return bedst;
    }

    public void Vis()
    {
        if (Traener == null)
        {
            Console.WriteLine($"{Navn} (træner: ingen)");
        }
        else
        {
            Console.WriteLine($"{Navn} (træner: {Traener.Navn})");
        }
        foreach (Spiller s in Spillere)
        {
            Console.WriteLine(s);
        }
    }
}`,
    ekstra: ["Fjern linjen med `Traener = …` fra object initializeren. Kører `Vis()` stadig? Skriver den `(træner: ingen)`?", "Skriv `Console.WriteLine(hold.Traener.Navn);` uden træner, og læs fejlen `NullReferenceException`. Hvilket punktum er det, der vælter programmet?", "Lav `Spiller b2 = anna;` og kald `b2.Scor();`. Hvor mange mål har Anna nu — og hvorfor?"] },

  // ------------------------------------------------------------------
  { t: "spor", h: "Spor: to variabler, ét objekt",
    q: "Følg programmet linje for linje. Skriv, hvad `a.Saldo`, `b.Saldo` og `c.Saldo` er, lige efter at linjen er udført. Husk reglen: **antallet af objekter = antallet af gange, der står `new`**.",
    kode: R`Konto a = new Konto();
a.Saldo = 100;
Konto b = a;
b.Saldo += 50;
Konto c = new Konto();
c.Saldo = a.Saldo;
c.Saldo -= 30;
Console.WriteLine($"{a.Saldo} {b.Saldo} {c.Saldo}");

class Konto
{
    public int Saldo { get; set; }
}`,
    kolonner: ["a.Saldo", "b.Saldo", "c.Saldo"],
    raekker: [[1, "=0", "=–", "=–"], [2, "=100", "=–", "=–"], [3, "100", "100", "–"], [4, "150", "150", "–"], [5, "150", "150", "0"], [6, "150", "150", "150"], [7, "150", "150", "120"]],
    slut: false,
    output: "150 150 120",
    fordi: "Der står `new` to gange, så der er **to** objekter. `a` og `b` peger på det **samme** objekt (linje 3 kopierer kun referencen), så `b.Saldo += 50` ændrer også det, `a` ser. `c` er sit eget objekt: linje 6 kopierer **tallet** 150 over i det, og derefter lever `c` sit eget liv." },

  { t: "spor", h: "Spor: static og instans",
    q: "Følg programmet linje for linje. `Naeste` er `static` — der findes kun ét, som alle billetter deler. `Nummer` har hver billet for sig. Skriv værdierne lige efter hver af linjerne 1–4 (konstruktøren er kørt færdig).",
    kode: R`Billet x = new Billet();
Billet y = new Billet();
y.Nummer = 50;
Billet z = new Billet();
Console.WriteLine($"{x.Nummer} {y.Nummer} {z.Nummer} {Billet.Naeste}");

class Billet
{
    public static int Naeste = 1;
    public int Nummer;

    public Billet()
    {
        Nummer = Naeste;
        Naeste += 10;
    }
}`,
    kolonner: ["Billet.Naeste", "x.Nummer", "y.Nummer", "z.Nummer"],
    raekker: [[1, "=11", "=1", "=–", "=–"], [2, "21", "1", "11", "–"], [3, "21", "1", "50", "–"], [4, "31", "1", "50", "21"]],
    slut: false,
    output: "1 50 21 31",
    fordi: "Hver gang konstruktøren kører, tager billetten det fælles `Naeste` som sit eget `Nummer` og tæller derefter det fælles tal 10 op. Linje 3 ændrer kun `y`'s eget nummer — det rører **ikke** det fælles `Naeste`. Derfor får `z` nummer 21, ikke 51." },

  { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: Hvorfor er `Saldo` i din `Konto` lavet med `{ get; private set; }` og ikke som et `public` felt? Hvad vinder du ved det?",
    svar: "Det er **indkapsling**. Med `private set` kan alle **læse** saldoen, men kun klassens egne metoder kan **ændre** den. Så går alle ændringer gennem `Indsaet` og `Haev`, og dér **validerer** klassen beløbet — fx afvises negative beløb og hævninger, der er større end saldoen. Objektet kan derfor aldrig komme i en ugyldig tilstand, og reglerne står ét sted i stedet for spredt ud over programmet. Var saldoen et `public` felt, kunne hvem som helst skrive `k.Saldo = -999999`.",
    noegle: ["indkapsling", "private set", "læse", "validere", "ugyldig tilstand", "ét sted"] }

] });
})();
