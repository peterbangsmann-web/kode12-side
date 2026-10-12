// Modul 10 — Delegates, lambda og events. Forudsætter: modul 0–9.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m10", nr: 10, del: "Del 3 · Videregående C#", ikon: "📨",
  titel: "Delegates, lambda og events",
  dag: "Kursusdag 8 · Delegates",
  intro: "Indtil nu har dine variabler holdt **data**: tal, tekst og objekter. En **delegate** er en variabel, der holder en **metode**. Det lyder mærkeligt, men du har allerede brugt det: hver gang du skrev `Where(x => x > 5)`, gav du en metode med som argument.\n\nHer lærer du, hvordan det virker indeni: `Action`, `Func`, lambda-udtryk, **callbacks** og **events**. Events er sådan, en knap i en web-app eller en chat i SignalR siger \"nu skete der noget\" — og det er et klassisk eksamensspørgsmål.",
  video: ["08_Ons_Parallel+Thread_synch+delegates.mp4 (3 t 53 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m10l1", titel: "Delegates: en variabel, der holder en metode", min: 16,
    ord: [
      ["Delegate", "En variabel, der holder en metode (en henvisning til en metode). Når man kalder variablen, kører metoden."],
      ["Delegate-type", "Skabelonen for, hvilke metoder en delegate må holde: returtype og parametre. Erklæres med `delegate`, fx `delegate int Beregning(int x);`."],
      ["Signatur", "En metodes returtype og parametre (antal, typer og rækkefølge). En metode passer i en delegate, hvis signaturen er den samme."],
      ["Kalde en delegate", "At køre den metode, delegaten peger på: `op(5)` — præcis som et almindeligt metodekald."],
      ["Metode som argument", "At give en metode med til en anden metode gennem en delegate-parameter, så den anden metode kan kalde den."]
    ],
    trin: [
      { t: "laes", h: "En variabel med en metode i",
        md: "Indtil nu har en variabel altid holdt **data**: et tal, en tekst, et objekt. En **delegate** er en variabel, der holder en **metode**.\n\nNår du kalder variablen, kører den metode, den peger på. Og du kan lade variablen pege på en anden metode senere — præcis som du kan give en `int` en ny værdi.",
        kode: R`Beregning op = Dobbelt;
Console.WriteLine(op(5));

op = Kvadrat;
Console.WriteLine(op(5));

static int Dobbelt(int x)
{
    return x * 2;
}

static int Kvadrat(int x)
{
    return x * x;
}

delegate int Beregning(int x);`,
        noter: [
          ["delegate int Beregning(int x);", "Erklærer en ny **delegate-type**, der hedder `Beregning`: \"en metode, der tager én `int` og returnerer en `int`\". Den står nederst, ligesom klasser gør."],
          ["Beregning op = Dobbelt;", "Variablen `op` peger nu på metoden `Dobbelt`. **Ingen parenteser** efter `Dobbelt` — vi kalder den ikke, vi peger på den."],
          ["op(5)", "Kald delegaten. Det kører `Dobbelt(5)`, som giver 10."],
          ["op = Kvadrat;", "Nu peger `op` på en anden metode. Samme kald `op(5)` giver nu 25."]
        ],
        output: "10\n25" },
      { t: "laes", h: "Delegate-typen er en skabelon for metoder",
        md: "Linjen med `delegate` beskriver en **signatur**: hvad metoden returnerer, og hvilke parametre den tager. Kun metoder med præcis den signatur passer i variablen.\n\nHer er en delegate-type til metoder, der tager en `string` og ikke returnerer noget (`void`):",
        kode: R`Hilsen h = SigHej;
h("Peter");

h = SigFarvel;
h("Peter");

static void SigHej(string navn)
{
    Console.WriteLine($"Hej {navn}");
}

static void SigFarvel(string navn)
{
    Console.WriteLine($"Farvel {navn}");
}

delegate void Hilsen(string navn);`,
        noter: [
          ["delegate void Hilsen(string navn);", "Skabelonen: returnerer intet (`void`), tager én `string`."],
          ["SigHej og SigFarvel", "Begge er `void` og tager én `string`. Derfor passer de begge."],
          ["h(\"Peter\")", "Kalder den metode, `h` peger på lige nu."]
        ],
        output: "Hej Peter\nFarvel Peter",
        md2: "Navnet på parameteren (`navn`) behøver ikke være det samme i metoden. Det er kun **typerne** og **returtypen**, der skal passe." },
      { t: "valg", q: "Hvilken metode passer i en variabel af typen `Beregning`, når den er erklæret som `delegate int Beregning(int x);`?",
        svar: ["`static int Halv(int tal)`", "`static void Halv(int tal)`", "`static int Halv(int a, int b)`", "`static string Halv(int tal)`"],
        ret: 0, fordi: "Signaturen skal passe: returtype `int` og præcis én parameter af typen `int`. Navnet på parameteren er ligegyldigt. `void` og `string` er forkerte returtyper, og to parametre er én for mange." },
      { t: "forudsig",
        kode: R`Beregning op = PlusEt;
int a = op(4);
op = GangeTre;
int b = op(a);
Console.WriteLine(a);
Console.WriteLine(b);

static int PlusEt(int x)
{
    return x + 1;
}

static int GangeTre(int x)
{
    return x * 3;
}

delegate int Beregning(int x);`,
        output: "5\n15",
        fordi: "Først peger `op` på `PlusEt`, så `a = PlusEt(4) = 5`. Derefter peger `op` på `GangeTre`, så `b = GangeTre(5) = 15`." },
      { t: "fejl", q: "Programmet kan ikke oversættes. Klik på linjen med fejlen.",
        kode: R`Beregning op = Dobbelt();
Console.WriteLine(op(4));

static int Dobbelt(int x)
{
    return x * 2;
}

delegate int Beregning(int x);`,
        linje: 1,
        fordi: "`Dobbelt()` med parenteser **kalder** metoden — uden argument. Compileren siger, at der mangler et argument til parameteren `x`. For at **pege på** metoden skriver man navnet uden parenteser: `Beregning op = Dobbelt;`.",
        rettet: R`Beregning op = Dobbelt;
Console.WriteLine(op(4));

static int Dobbelt(int x)
{
    return x * 2;
}

delegate int Beregning(int x);`,
        output: "8" },
      { t: "udfyld", q: "Lad `op` pege på metoden `Halv`, og kald den med 10.",
        kode: R`Beregning op = [[Halv]];
Console.WriteLine([[op]](10));

static int Halv(int x)
{
    return x / 2;
}

delegate [[int]] Beregning(int x);`,
        output: "5",
        fordi: "Uden parenteser peger vi på metoden. `op(10)` kalder den. Delegate-typen returnerer `int`, fordi `Halv` gør." },
      { t: "laes", h: "Giv en metode med som argument",
        md: "Det smarte ved delegates er, at en metode kan få **en anden metode** som parameter. Så kan den samme løkke gøre forskellige ting, alt efter hvilken metode du giver med.\n\n`Anvend` nedenfor ved ikke, hvad der skal ske med hvert tal. Det bestemmer den, der kalder.",
        kode: R`int[] tal = { 1, 2, 3 };

int[] dobbelt = Anvend(tal, Dobbelt);
Console.WriteLine(string.Join(", ", dobbelt));

int[] kvadrat = Anvend(tal, Kvadrat);
Console.WriteLine(string.Join(", ", kvadrat));

static int[] Anvend(int[] tal, Beregning op)
{
    int[] resultat = new int[tal.Length];
    for (int i = 0; i < tal.Length; i++)
    {
        resultat[i] = op(tal[i]);
    }
    return resultat;
}

static int Dobbelt(int x)
{
    return x * 2;
}

static int Kvadrat(int x)
{
    return x * x;
}

delegate int Beregning(int x);`,
        noter: [
          ["Beregning op", "En parameter af delegate-typen. Den modtager en metode."],
          ["op(tal[i])", "Kalder den metode, der blev givet med — for hvert tal."],
          ["Anvend(tal, Dobbelt)", "Giver metoden `Dobbelt` med. Igen uden parenteser."]
        ],
        output: "2, 4, 6\n1, 4, 9",
        md2: "Det er præcis sådan `Where` og `Select` fra modul 9 virker: de har en løkke indeni, og du giver dem en metode med, der bestemmer, hvad der skal ske med hvert element." },
      { t: "spor", h: "Spor: hvilken metode peger op på?",
        q: "Følg programmet. Skriv for hver linje, hvilken metode `op` peger på, og hvad `x` er, lige efter at linjen er udført.",
        kode: R`Beregning op = Dobbelt;
int x = 3;
x = op(x);
op = PlusEt;
x = op(x);
x = op(x);
Console.WriteLine(x);

static int Dobbelt(int x)
{
    return x * 2;
}

static int PlusEt(int x)
{
    return x + 1;
}

delegate int Beregning(int x);`,
        kolonner: ["op peger på", "x"],
        raekker: [[1, "=Dobbelt", "=–"], [2, "=Dobbelt", "=3"], [3, "Dobbelt", "6"], [4, "PlusEt", "6"], [5, "PlusEt", "7"], [6, "PlusEt", "8"]],
        slut: false,
        output: "8",
        fordi: "Linje 3 kalder `Dobbelt(3)` = 6. Linje 4 ændrer ikke `x` — kun hvad `op` peger på. Linje 5 og 6 kalder begge `PlusEt`: 7 og så 8. Samme kald `op(x)` gør noget forskelligt, alt efter hvad `op` peger på." },
      { t: "skriv", q: "Metoden `Kvadrat` og delegate-typen `Beregning` findes allerede (se nedenfor). Skriv to linjer: lav en variabel `op` af typen `Beregning`, der peger på `Kvadrat`, og skriv `op(6)` ud med `Console.WriteLine`.",
        efter: R`static int Kvadrat(int x)
{
    return x * x;
}

delegate int Beregning(int x);`,
        tjek: [
          [/Beregning op=Kvadrat;/, "Lad `op` pege på metoden: `Beregning op = Kvadrat;`"],
          [/Console\.WriteLine\(op\(6\)\);/, "Kald delegaten og skriv svaret ud: `Console.WriteLine(op(6));`"],
          [/op=Kvadrat\(/, "Ingen parenteser efter `Kvadrat`, når du peger på den", "ikke"]
        ],
        forkert: [R`Beregning op = Kvadrat();
Console.WriteLine(op(6));`, R`Beregning op = Kvadrat;
Console.WriteLine(Kvadrat(6));`],
        loesning: R`Beregning op = Kvadrat;
Console.WriteLine(op(6));`,
        output: "36" },
      { t: "ide", h: "Lommeregner med en delegate",
        md: "Lav et Console-projekt, `DelegateLommeregner`. Skriv koden selv. Programmet spørger efter to tal og en regneart, og lader en delegate pege på den rigtige metode.\n\nKør det et par gange med `+`, `-` og `*`. Sæt så et **breakpoint** på linjen med `Resultat`, og kør med debuggeren. Se på `op` i {{**Locals**||**Threads & Variables**}}: et sted i teksten står navnet på den metode, den peger på.",
        kode: R`Console.Write("Første tal: ");
int a = int.Parse(Console.ReadLine() ?? "0");
Console.Write("Regneart (+, -, *): ");
string tegn = Console.ReadLine() ?? "";
Console.Write("Andet tal: ");
int b = int.Parse(Console.ReadLine() ?? "0");

Regneart op;
if (tegn == "+")
{
    op = Plus;
}
else if (tegn == "-")
{
    op = Minus;
}
else
{
    op = Gange;
}

Console.WriteLine($"Resultat: {op(a, b)}");

static int Plus(int a, int b)
{
    return a + b;
}

static int Minus(int a, int b)
{
    return a - b;
}

static int Gange(int a, int b)
{
    return a * b;
}

delegate int Regneart(int a, int b);`,
        md2: "Bemærk: selve udregningen står kun ét sted — `op(a, b)`. `if`-sætningen vælger kun, **hvilken metode** der skal bruges. Udvid selv med `/` og en metode `Divider`." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er en delegate, og hvad kan den bruges til?",
        svar: "En **delegate** er en variabel, der **holder en metode** i stedet for data. Delegate-typen bestemmer **signaturen**: hvilken returtype og hvilke parametre metoden skal have. Når jeg kalder variablen, kører den metode, den peger på. Det bruges især til at **give en metode med som argument**, så en metode som `Where` kan have en løkke indeni, mens den, der kalder, bestemmer, hvad der skal ske med hvert element.",
        noegle: ["metode", "variabel", "signatur", "returtype", "argument"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m10l2", titel: "Action, Func, Predicate og lambda", min: 17,
    ord: [
      ["Action", "Færdig delegate-type til metoder, der **ikke returnerer noget** (`void`). `Action<string>` tager én string."],
      ["Func", "Færdig delegate-type til metoder, der **returnerer en værdi**. Den sidste type i `<…>` er returtypen: `Func<int, bool>` tager en int og returnerer en bool."],
      ["Predicate<T>", "Færdig delegate-type til en metode, der tager én T og returnerer `bool`. Bruges til \"opfylder elementet betingelsen?\"."],
      ["Anonym metode", "En metode uden navn, skrevet med ordet `delegate` direkte i koden: `delegate (int x) { return x * 2; }`. Den gamle form af lambda."],
      ["Lambda-udtryk", "Den korte form af en anonym metode: `x => x * 2`. Til venstre for pilen parametrene, til højre det, der returneres."],
      ["Closure", "Når et lambda-udtryk bruger en variabel uden for sig selv. Lambda-udtrykket husker selve variablen — ikke en kopi."]
    ],
    trin: [
      { t: "laes", h: "Færdige delegate-typer",
        md: "I praksis erklærer man sjældent sin egen delegate-type. .NET har tre færdige, der dækker næsten alt:\n\n- `Action<…>` — metoden returnerer **intet** (`void`).\n- `Func<…>` — metoden **returnerer en værdi**. Den **sidste** type i de spidse parenteser er returtypen.\n- `Predicate<T>` — metoden tager én `T` og returnerer `bool`.",
        kode: R`Func<int, int> dobbelt = Dobbelt;
Action<string> hils = Hils;
Predicate<int> erLige = ErLige;

Console.WriteLine(dobbelt(4));
hils("Peter");
Console.WriteLine(erLige(7));

static int Dobbelt(int x)
{
    return x * 2;
}

static void Hils(string navn)
{
    Console.WriteLine($"Hej {navn}");
}

static bool ErLige(int x)
{
    return x % 2 == 0;
}`,
        noter: [
          ["Func<int, int>", "Tager en `int`, returnerer en `int`. Svarer til `delegate int Beregning(int x);` fra lektion 1 — bare uden at du selv skal erklære den."],
          ["Action<string>", "Tager en `string`, returnerer intet."],
          ["Predicate<int>", "Tager en `int`, returnerer `bool`."],
          ["Func<int, int, string>", "(ikke i koden) Tager **to** `int`, returnerer en `string`. Den sidste type er altid returtypen."]
        ],
        output: "8\nHej Peter\nFalse" },
      { t: "valg", q: "Hvilken metode passer i en variabel af typen `Func<string, int>`?",
        svar: ["En metode, der tager en `string` og returnerer en `int`", "En metode, der tager en `int` og returnerer en `string`", "En metode, der tager en `string` og en `int` og ikke returnerer noget", "En metode, der tager to `string` og returnerer en `int`"],
        ret: 0, fordi: "I en `Func` er den **sidste** type returtypen. Alt før den er parametre. `Func<string, int>` er altså: én `string` ind, en `int` ud." },
      { t: "udfyld", q: "Vælg de rigtige færdige delegate-typer: `Plus` returnerer en `int`, `Skriv` returnerer intet.",
        kode: R`[[Func]]<int, int, int> plus = Plus;
[[Action]]<string> skriv = Skriv;
skriv($"Sum: {plus(2, 3)}");

static int Plus(int a, int b)
{
    return a + b;
}

static void Skriv(string tekst)
{
    Console.WriteLine(tekst);
}`,
        output: "Sum: 5",
        fordi: "`Plus` returnerer en værdi, så det er en `Func` — to `int` ind og en `int` ud: `Func<int, int, int>`. `Skriv` er `void`, så det er en `Action<string>`." },
      { t: "laes", h: "Fra metode til lambda-udtryk",
        md: "I modul 9 lærte du, at et **lambda-udtryk** er \"en lille metode uden navn\". Nu kan du se, hvor det kommer fra. Her er fire måder at lave præcis den samme delegate på — fra den lange til den korte:",
        kode: R`Func<int, int> a = Dobbelt;
Func<int, int> b = delegate (int x) { return x * 2; };
Func<int, int> c = (int x) => { return x * 2; };
Func<int, int> d = x => x * 2;

Console.WriteLine($"{a(5)} {b(5)} {c(5)} {d(5)}");

static int Dobbelt(int x)
{
    return x * 2;
}`,
        noter: [
          ["a = Dobbelt", "En almindelig metode med navn."],
          ["delegate (int x) { … }", "En **anonym metode**: en metode uden navn, skrevet lige der. Den gamle form."],
          ["(int x) => { … }", "Et lambda-udtryk med typen og tuborgklammer. Bruges, når der skal flere linjer i."],
          ["x => x * 2", "Den korte form. Compileren ved fra `Func<int, int>`, at `x` er en `int`, og at `x * 2` skal returneres."]
        ],
        output: "10 10 10 10",
        md2: "Har lambda-udtrykket **to** parametre, skal de i parentes: `(a, b) => a + b`. Har det **ingen**, skriver man tomme parenteser: `() => Console.WriteLine(\"Hej\")`." },
      { t: "forudsig",
        kode: R`Func<int, int, int> gange = (a, b) => a * b;
Func<string, string> raab = s => s.ToUpper() + "!";
Action<int> skrivDobbelt = n => Console.WriteLine(n * 2);

Console.WriteLine(gange(3, 4));
Console.WriteLine(raab("hej"));
skrivDobbelt(21);`,
        output: "12\nHEJ!\n42",
        fordi: "`gange(3, 4)` = 12. `raab(\"hej\")` laver teksten om til store bogstaver og sætter `!` på. `skrivDobbelt` er en `Action` — den returnerer intet, men skriver selv 42 ud." },
      { t: "skriv", q: "Lav en `Func<int, bool>`, der hedder `erVoksen`. Den skal være et lambda-udtryk, der returnerer `true`, når alderen er **18 eller mere**. Skriv derefter `erVoksen(20)` ud med `Console.WriteLine`.",
        tjek: [
          [/Func<int,bool> ?erVoksen=/, "Variablen: `Func<int, bool> erVoksen = …`"],
          [/\(?(\w+)\)?=>\1>=18;/, "Lambda-udtrykket returnerer `true` ved 18 eller mere, fx `alder => alder >= 18`"],
          [/Console\.WriteLine\(erVoksen\(20\)\);/, "Kald den og skriv svaret ud: `Console.WriteLine(erVoksen(20));`"]
        ],
        forkert: [R`Func<int, bool> erVoksen = a => a > 18;
Console.WriteLine(erVoksen(20));`, R`Predicate<int> erVoksen = a => a >= 18;
Console.WriteLine(erVoksen(20));`],
        loesning: R`Func<int, bool> erVoksen = alder => alder >= 18;
Console.WriteLine(erVoksen(20));`,
        output: "True",
        fordi: "`>= 18` betyder 18 eller mere. `> 18` ville give `false` for en på præcis 18." },
      { t: "fejl", q: "Programmet kan ikke oversættes. Klik på den linje, hvor fejlen begynder.",
        kode: R`Action<int> dobbelt = x => x * 2;
Console.WriteLine(dobbelt(5));`,
        linje: 1,
        fordi: "En `Action` returnerer **intet**. Så lambda-udtrykket `x => x * 2` regner et tal ud og smider det væk — det må man ikke, og compileren klager. Linje 2 fejler også, fordi en `Action` ikke giver noget, der kan skrives ud. Når der skal komme en værdi tilbage, er det en `Func<int, int>`.",
        rettet: R`Func<int, int> dobbelt = x => x * 2;
Console.WriteLine(dobbelt(5));`,
        output: "10" },
      { t: "laes", h: "Closure: lambda-udtrykket husker variablerne omkring sig",
        md: "Et lambda-udtryk må gerne bruge variabler, der står **uden for** det. Det kaldes en **closure**.\n\nVigtigt: lambda-udtrykket bruger **selve variablen**, ikke en kopi af værdien. Ændrer lambda-udtrykket variablen, kan man se det bagefter. Og ændrer man variablen udenfor, bruger lambda-udtrykket den nye værdi.",
        kode: R`int taeller = 0;
Action tael = () => taeller++;

tael();
tael();
tael();
Console.WriteLine(taeller);`,
        noter: [
          ["Action tael", "En `Action` uden spidse parenteser: ingen parametre, ingen returværdi."],
          ["() => taeller++", "Tomme parenteser = ingen parametre. Lambda-udtrykket lægger 1 til **variablen** `taeller`, som står uden for det."],
          ["tael(); ×3", "Hvert kald ændrer den samme variabel."]
        ],
        output: "3" },
      { t: "spor", h: "Spor: en closure ændrer en variabel",
        q: "Følg programmet, og skriv værdien af `sum`, lige efter at hver linje er udført. Husk: lambda-udtrykket bruger selve variablen `sum`.",
        kode: R`int sum = 0;
Action<int> laegTil = n => sum += n;
laegTil(5);
laegTil(10);
sum = sum * 2;
laegTil(1);`,
        kolonner: ["sum"],
        raekker: [[1, "=0"], [2, "=0"], [3, "5"], [4, "15"], [5, "30"], [6, "31"]],
        fordi: "Linje 2 laver kun lambda-udtrykket — der sker ikke noget med `sum`, før det bliver kaldt. Linje 3 og 4 lægger 5 og 10 til. Linje 5 fordobler `sum` udenfor. Linje 6 lægger 1 til den **nye** værdi, fordi lambda-udtrykket bruger selve variablen." },
      { t: "orden", q: "Sæt linjerne i rækkefølge, så programmet skriver `True` og derefter `False`. (Lambda-udtrykket bruger variablen `graense`.)",
        linjer: [R`int graense = 5;`, R`Predicate<int> erStor = t => t > graense;`, R`Console.WriteLine(erStor(8));`, R`graense = 10;`, R`Console.WriteLine(erStor(8));`],
        output: "True\nFalse",
        fordi: "Først er grænsen 5, så 8 er stor. Når `graense` bagefter sættes til 10, bruger lambda-udtrykket den nye værdi — så 8 er ikke længere stor. Det er en closure." },
      { t: "ide", h: "Regnearter i et Dictionary",
        md: "Lav et Console-projekt, `Regnearter`. Fordi en `Func` er en type som alle andre, kan den ligge i en collection. Her ligger fire regnearter i et `Dictionary` (fra modul 6), hvor nøglen er tegnet.\n\nSkriv koden selv, og kør den. Sæt et breakpoint på `foreach`-linjen, og fold `regnearter` ud i debuggeren.",
        kode: R`Dictionary<string, Func<int, int, int>> regnearter = new Dictionary<string, Func<int, int, int>>
{
    { "+", (a, b) => a + b },
    { "-", (a, b) => a - b },
    { "*", (a, b) => a * b },
    { "/", (a, b) => a / b }
};

foreach (KeyValuePair<string, Func<int, int, int>> par in regnearter)
{
    Console.WriteLine($"6 {par.Key} 3 = {par.Value(6, 3)}");
}`,
        output: "6 + 3 = 9\n6 - 3 = 3\n6 * 3 = 18\n6 / 3 = 2",
        md2: "`par.Value` er en `Func`, så den kan kaldes med `par.Value(6, 3)`. Udvid selv: læs et tegn fra brugeren, og slå regnearten op med `regnearter[tegn](a, b)`." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på `Action`, `Func` og `Predicate`? Og hvad er et lambda-udtryk?",
        svar: "Det er tre **færdige delegate-typer**. En **`Action`** holder en metode, der **ikke returnerer noget**. En **`Func`** holder en metode, der **returnerer en værdi** — den **sidste** type i de spidse parenteser er returtypen. En **`Predicate<T>`** tager én T og returnerer **`bool`**. Et **lambda-udtryk** er en kort måde at skrive en **metode uden navn** på, fx `x => x * 2`, som man kan gemme i sådan en variabel eller give med som argument.",
        noegle: ["void", "returnerer", "sidste type", "bool", "uden navn"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m10l3", titel: "Multicast og callbacks", min: 15,
    ord: [
      ["Multicast delegate", "En delegate, der peger på **flere** metoder på én gang. Når den kaldes, kører de alle, i den rækkefølge de blev tilføjet."],
      ["+= på en delegate", "Tilføjer en metode mere til delegaten."],
      ["-= på en delegate", "Fjerner en metode fra delegaten igen."],
      ["Invoke", "At kalde en delegate. `besked.Invoke()` betyder det samme som `besked()`. Bruges med `?.`: `besked?.Invoke()`."],
      ["Callback", "En metode, du giver med til en anden metode, så den kan \"ringe tilbage\" til dig, når noget er sket."]
    ],
    trin: [
      { t: "laes", h: "Én delegate, flere metoder",
        md: "En delegate kan pege på **flere metoder på én gang**. Med `+=` tilføjer du en metode mere. Når du kalder delegaten, kører **alle** metoderne — i den rækkefølge, de blev tilføjet.\n\nDet kaldes en **multicast delegate**.",
        kode: R`Action<string> log = SkrivTilSkaerm;
log += SkrivMedStoreBogstaver;

log("ordre modtaget");

static void SkrivTilSkaerm(string s)
{
    Console.WriteLine(s);
}

static void SkrivMedStoreBogstaver(string s)
{
    Console.WriteLine(s.ToUpper());
}`,
        noter: [
          ["log = SkrivTilSkaerm;", "Første metode. Med `=` erstatter man alt, hvad delegaten pegede på før."],
          ["log += SkrivMedStoreBogstaver;", "Tilføj en metode mere. Nu peger `log` på to metoder."],
          ["log(\"ordre modtaget\")", "Ét kald — begge metoder kører, med samme argument."]
        ],
        output: "ordre modtaget\nORDRE MODTAGET" },
      { t: "forudsig",
        kode: R`Action besked = () => Console.WriteLine("A");
besked += () => Console.WriteLine("B");
besked += () => Console.WriteLine("C");
besked();
Console.WriteLine("Slut");`,
        output: "A\nB\nC\nSlut",
        fordi: "Alle tre lambda-udtryk ligger i `besked`. Ét kald kører dem alle, i den rækkefølge de blev tilføjet." },
      { t: "laes", h: "-= fjerner en metode igen",
        md: "Med `-=` fjerner du en metode fra delegaten igen.\n\nDet virker med **navngivne metoder** og med lambda-udtryk, der er **gemt i en variabel**. Skriver du et nyt lambda-udtryk efter `-=`, er det en ny metode, som aldrig blev tilføjet — så der bliver ikke fjernet noget.",
        kode: R`Action? besked = Hej;
besked += Farvel;
besked();

Console.WriteLine("---");
besked -= Hej;
besked();

static void Hej()
{
    Console.WriteLine("Hej");
}

static void Farvel()
{
    Console.WriteLine("Farvel");
}`,
        output: "Hej\nFarvel\n---\nFarvel",
        md2: "{{Visual Studio||Rider}} viser måske en advarsel (en bølgelinje) under det sidste `besked()`: compileren siger, at `besked` **kan være blevet `null`** efter `-=`. Programmet kører fint her, men advarslen har en god grund — den kommer om to trin." },
      { t: "spor", h: "Spor: += og -=",
        q: "`plusTi` lægger 10 til `point`, `gangeTo` ganger `point` med 2. Følg programmet, og skriv `point`, lige efter at hver linje er udført.",
        kode: R`int point = 0;
Action plusTi = () => point += 10;
Action gangeTo = () => point *= 2;
Action bonus = plusTi;
bonus += gangeTo;
bonus();
bonus -= plusTi;
bonus();`,
        kolonner: ["point"],
        raekker: [[1, "=0"], [2, "=0"], [3, "0"], [4, "0"], [5, "0"], [6, "20"], [7, "20"], [8, "40"]],
        fordi: "Linje 2–5 bygger kun delegaterne op — `point` er stadig 0. Linje 6 kører begge metoder: 0 + 10 = 10, derefter 10 × 2 = 20. Linje 7 fjerner `plusTi`. Linje 8 kører kun `gangeTo`: 20 × 2 = 40." },
      { t: "laes", h: "Når der ikke er nogen metoder: null og ?.Invoke()",
        md: "Fjerner du den sidste metode, er delegaten **`null`** — den peger ikke på noget. Kalder du en delegate, der er `null`, går programmet ned med en `NullReferenceException`.\n\nLøsningen kender du fra modul 7: `?.`. En delegate har metoden `Invoke()`, der betyder det samme som at kalde den. `besked?.Invoke()` kalder kun, hvis `besked` **ikke** er `null`.",
        kode: R`Action? besked = Hej;
besked -= Hej;
Console.WriteLine(besked == null);

besked?.Invoke();
Console.WriteLine("Programmet kører videre");

static void Hej()
{
    Console.WriteLine("Hej");
}`,
        noter: [
          ["Action?", "Spørgsmålstegnet siger: denne variabel må godt være `null` (modul 7)."],
          ["besked == null", "Sand — den eneste metode er fjernet."],
          ["besked?.Invoke()", "\"Kald, hvis der er noget at kalde.\" Ellers sker der ingenting."]
        ],
        output: "True\nProgrammet kører videre" },
      { t: "fejl", q: "Programmet skal skrive `Starter` og `Færdig`. Det kan oversættes, men går ned. Hvilken linje er skyld i det?",
        kode: R`Action? alarm = null;
Console.WriteLine("Starter");
alarm();
Console.WriteLine("Færdig");`,
        linje: 3, logisk: true, fejler: true,
        fordi: "`alarm` peger ikke på nogen metode — den er `null`. At kalde den giver en `NullReferenceException`. Med `alarm?.Invoke();` bliver der kun kaldt, hvis der er en metode.",
        rettet: R`Action? alarm = null;
Console.WriteLine("Starter");
alarm?.Invoke();
Console.WriteLine("Færdig");`,
        rettetOutput: "Starter\nFærdig" },
      { t: "laes", h: "Callback: \"ring tilbage, når der sker noget\"",
        md: "En **callback** er en metode, du giver med til en anden metode, så den kan **ringe tilbage** til dig undervejs eller når den er færdig.\n\n`Behandl` nedenfor arbejder sig igennem nogle dele. Den ved ikke, hvordan fremskridtet skal vises — på skærmen, i en fil, på en hjemmeside. Det bestemmer den, der kalder, ved at give en `Action<int>` med.",
        kode: R`Behandl(3, n => Console.WriteLine($"Del {n} er færdig"));
Console.WriteLine("Alt er færdigt");

static void Behandl(int antalDele, Action<int> fremskridt)
{
    for (int i = 1; i <= antalDele; i++)
    {
        fremskridt(i);
    }
}`,
        noter: [
          ["Action<int> fremskridt", "Parameteren er callback'en: en metode, der tager et tal."],
          ["fremskridt(i)", "\"Ring tilbage\" med nummeret på den del, der er færdig."],
          ["n => Console.WriteLine(…)", "Den, der kalder, bestemmer, hvad der skal ske."]
        ],
        output: "Del 1 er færdig\nDel 2 er færdig\nDel 3 er færdig\nAlt er færdigt" },
      { t: "forudsig",
        kode: R`Gentag(3, t => Console.Write(t * t + " "));
Console.WriteLine();
Gentag(2, t => Console.Write("Hej "));
Console.WriteLine();

static void Gentag(int gange, Action<int> handling)
{
    for (int i = 1; i <= gange; i++)
    {
        handling(i);
    }
}`,
        output: "1 4 9\nHej Hej",
        fordi: "Første gang kaldes callback'en med 1, 2 og 3 og skriver kvadraterne. Anden gang ignorerer callback'en tallet og skriver bare `Hej` to gange. (Mellemrummet til sidst på linjen tæller ikke.)" },
      { t: "udfyld", q: "Metoden `Beregn` skal tage en callback, der får summen, og kalde den.",
        kode: R`Beregn(4, 5, svar => Console.WriteLine($"Svaret er {svar}"));

static void Beregn(int a, int b, [[Action]]<int> naarFaerdig)
{
    int sum = a + b;
    [[naarFaerdig]](sum);
}`,
        output: "Svaret er 9",
        fordi: "Callback'en returnerer intet, så den er en `Action<int>`. Inde i metoden kaldes den med `naarFaerdig(sum)`." },
      { t: "skriv", q: "`log` peger på metoden `Skaerm`. Tilføj metoden `Fil` med `+=`, og kald `log(\"Gemt\")`. Fjern derefter `Skaerm` med `-=`, og kald `log?.Invoke(\"Lukket\")` — med `?.`, fordi `log` kunne være blevet `null` efter `-=`.",
        foer: R`Action<string>? log = Skaerm;`,
        efter: R`static void Skaerm(string s)
{
    Console.WriteLine("Skærm: " + s);
}

static void Fil(string s)
{
    Console.WriteLine("Fil: " + s);
}`,
        tjek: [
          ["log+=Fil;", "Tilføj `Fil` med `log += Fil;`"],
          ['log("Gemt");', "Kald `log(\"Gemt\");`"],
          ["log-=Skaerm;", "Fjern `Skaerm` med `log -= Skaerm;`"],
          [/log(\?\.Invoke)?\("Lukket"\);/, "Kald `log?.Invoke(\"Lukket\");`"]
        ],
        forkert: [R`log = Fil;
log("Gemt");
log -= Skaerm;
log("Lukket");`],
        loesning: R`log += Fil;
log("Gemt");
log -= Skaerm;
log?.Invoke("Lukket");`,
        output: "Skærm: Gemt\nFil: Gemt\nFil: Lukket",
        fordi: "`+=` tilføjer, så `Gemt` bliver skrevet af begge metoder. Efter `-= Skaerm` er kun `Fil` tilbage. Med `log = Fil;` ville `Skaerm` være erstattet i stedet for suppleret." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er en multicast delegate, og hvad er en callback?",
        svar: "En **multicast delegate** peger på **flere metoder** på én gang. Man tilføjer med **`+=`** og fjerner med **`-=`**, og når delegaten kaldes, kører alle metoderne i den rækkefølge, de blev tilføjet. Er der ingen metoder tilbage, er den **`null`**, så man kalder den med **`?.Invoke()`**. En **callback** er en metode, jeg giver med til en anden metode, så den kan **ringe tilbage**, når der sker noget — fx når en del er færdig. Så bestemmer den, der kalder, hvad der skal ske.",
        noegle: ["flere metoder", "+=", "-=", "null", "ringe tilbage"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m10l4", titel: "Events: giv besked, når noget sker", min: 18,
    ord: [
      ["Event", "En delegate i en klasse, der er beskyttet med ordet `event`: udefra må man kun tilmelde (`+=`) og afmelde (`-=`) sig. Kun klassen selv kan rejse eventen."],
      ["Rejse en event", "At kalde eventen, så alle tilmeldte metoder kører. Gøres inde i klassen med `MinEvent?.Invoke(…)`."],
      ["Publisher (udgiver)", "Den klasse, der har eventen og rejser den, når noget sker."],
      ["Subscriber (abonnent)", "Den kode, der tilmelder sig eventen med `+=` og bliver kaldt, når den rejses."],
      ["EventHandler<T>", "Den færdige delegate-type, som .NET bruger til events: metoder med parametrene `(object? sender, T e)`."],
      ["EventArgs", "Basisklassen for de data, en event sender med. Man arver fra den: `class SaldoEventArgs : EventArgs`."],
      ["Observer-mønsteret", "Et designmønster: et objekt (publisher) giver besked til en liste af andre (subscribers), når dets tilstand ændrer sig, uden at kende dem. Events er C#'s indbyggede udgave."]
    ],
    trin: [
      { t: "laes", h: "En dørklokke med en event",
        md: "En **event** er en delegate inde i en klasse, med ordet `event` foran. Andre kan **tilmelde** sig med `+=`. Når noget sker, **rejser** klassen eventen, og alle tilmeldte metoder kører.\n\nDørklokken ved ikke, hvem der lytter. Den siger bare \"nu ringede det\".",
        kode: R`Doerklokke klokke = new Doerklokke();
klokke.Ringet += () => Console.WriteLine("Hunden gør");
klokke.Ringet += () => Console.WriteLine("Peter går ud og åbner");

klokke.Ring();

class Doerklokke
{
    public event Action? Ringet;

    public void Ring()
    {
        Console.WriteLine("Ding dong!");
        Ringet?.Invoke();
    }
}`,
        noter: [
          ["public event Action? Ringet;", "Eventen. Typen er en `Action` — de tilmeldte metoder tager intet og returnerer intet. `?`, fordi den er `null`, indtil nogen tilmelder sig."],
          ["klokke.Ringet += …", "Tilmeld en metode. Der kan være mange."],
          ["Ringet?.Invoke();", "**Rejs** eventen: kald alle tilmeldte metoder. `?.` gør, at der ikke sker noget, hvis ingen har tilmeldt sig."],
          ["klokke.Ring()", "Det er klassen selv, der bestemmer, hvornår eventen rejses."]
        ],
        output: "Ding dong!\nHunden gør\nPeter går ud og åbner" },
      { t: "laes", h: "Hvorfor ordet event? Publisher og subscriber",
        md: "Uden ordet `event` ville `Ringet` bare være et offentligt felt med en delegate. Så kunne kode udenfor skrive `klokke.Ringet = null;` og slette alle de andre tilmeldinger, eller selv kalde `klokke.Ringet()` og lade, som om det ringede.\n\nOrdet `event` forhindrer det. **Udefra** må man kun `+=` og `-=`. Kun klassen selv kan rejse eventen.\n\nRollerne har navne:\n\n- **Publisher** (udgiver): klassen med eventen — her `Doerklokke`.\n- **Subscriber** (abonnent): den, der tilmelder sig med `+=` — her de to lambda-udtryk.\n\nDet hedder **Observer-mønsteret**: én giver besked, mange lytter, og udgiveren kender ikke lytterne. Du møder det igen i modul 11 (designmønstre) og i SignalR, hvor serveren giver alle browsere besked." },
      { t: "fejl", q: "Programmet kan ikke oversættes. Klik på linjen med fejlen.",
        kode: R`Doerklokke klokke = new Doerklokke();
klokke.Ringet += () => Console.WriteLine("Hunden gør");
klokke.Ringet = null;
klokke.Ring();

class Doerklokke
{
    public event Action? Ringet;

    public void Ring()
    {
        Console.WriteLine("Ding dong!");
        Ringet?.Invoke();
    }
}`,
        linje: 3,
        fordi: "Uden for klassen må en event kun stå til venstre for `+=` eller `-=`. `klokke.Ringet = null;` ville slette alle tilmeldinger, og det er præcis det, ordet `event` forhindrer. Compileren siger, at eventen kun må bruges med `+=` eller `-=`.",
        rettet: R`Doerklokke klokke = new Doerklokke();
klokke.Ringet += () => Console.WriteLine("Hunden gør");
klokke.Ring();

class Doerklokke
{
    public event Action? Ringet;

    public void Ring()
    {
        Console.WriteLine("Ding dong!");
        Ringet?.Invoke();
    }
}`,
        output: "Ding dong!\nHunden gør" },
      { t: "forudsig",
        kode: R`Knap knap = new Knap();
Action sigHej = () => Console.WriteLine("Hej");

knap.Klik += sigHej;
knap.Tryk();
knap.Klik -= sigHej;
knap.Tryk();
Console.WriteLine("Slut");

class Knap
{
    public event Action? Klik;

    public void Tryk()
    {
        Klik?.Invoke();
    }
}`,
        output: "Hej\nSlut",
        fordi: "Første tryk: `sigHej` er tilmeldt, så der skrives `Hej`. Så afmeldes den med `-=`. Andet tryk: ingen er tilmeldt, `Klik` er `null`, og `?.Invoke()` gør ingenting." },
      { t: "laes", h: "Standarden: EventHandler og EventArgs",
        md: "I .NET har events næsten altid typen `EventHandler<T>`. De tilmeldte metoder får to parametre:\n\n- `object? sender` — **hvem** der rejste eventen (publisheren).\n- `T e` — **data** om det, der skete. `T` er en klasse, der arver fra `EventArgs`.\n\nHer giver en konto besked, hver gang saldoen ændrer sig, og sender den nye saldo med.",
        kode: R`Konto konto = new Konto();
konto.SaldoAendret += VisSaldo;

konto.Indsaet(500);
konto.Haev(200);

static void VisSaldo(object? sender, SaldoEventArgs e)
{
    Console.WriteLine($"Ny saldo: {e.NySaldo} kr.");
}

class SaldoEventArgs : EventArgs
{
    public decimal NySaldo { get; init; }
}

class Konto
{
    private decimal saldo;
    public event EventHandler<SaldoEventArgs>? SaldoAendret;

    public void Indsaet(decimal beloeb)
    {
        saldo += beloeb;
        SaldoAendret?.Invoke(this, new SaldoEventArgs { NySaldo = saldo });
    }

    public void Haev(decimal beloeb)
    {
        saldo -= beloeb;
        SaldoAendret?.Invoke(this, new SaldoEventArgs { NySaldo = saldo });
    }
}`,
        noter: [
          ["class SaldoEventArgs : EventArgs", "Din egen klasse til eventens data. Den arver fra `EventArgs` (modul 5)."],
          ["EventHandler<SaldoEventArgs>", "Eventens type: metoder med `(object? sender, SaldoEventArgs e)`."],
          ["Invoke(this, new SaldoEventArgs { … })", "`this` er afsenderen — kontoen selv. Det andet argument er dataene."],
          ["VisSaldo(object? sender, SaldoEventArgs e)", "Subscriberen. Den læser den nye saldo i `e.NySaldo`."]
        ],
        output: "Ny saldo: 500 kr.\nNy saldo: 300 kr.",
        md2: "Har en event ingen data at sende med, bruger man den ikke-generiske `EventHandler` og sender `EventArgs.Empty` som data: `Udloest?.Invoke(this, EventArgs.Empty);`." },
      { t: "valg", q: "En subscriber har signaturen `(object? sender, SaldoEventArgs e)`. Hvad er `sender`?",
        svar: ["Det objekt, der rejste eventen — fx kontoen", "Den metode, der er tilmeldt eventen", "De data, eventen sender med, fx den nye saldo", "Altid `null`"],
        ret: 0, fordi: "`sender` er **publisheren** — afsenderen. Den sendes med som `this`. Dataene ligger i `e`. Det er nyttigt, når den samme metode lytter på flere objekter og skal vide, hvilket af dem der gav besked." },
      { t: "udfyld", q: "Termometret skal give besked, når der måles over 25 grader. Udfyld hullerne.",
        kode: R`Termometer t = new Termometer();
t.ForVarmt [[+=]] (sender, e) => Console.WriteLine($"Advarsel: {e.Grader} grader");
t.Maal(18);
t.Maal(31);

class GraderEventArgs : [[EventArgs]]
{
    public int Grader { get; init; }
}

class Termometer
{
    public [[event]] EventHandler<GraderEventArgs>? ForVarmt;

    public void Maal(int grader)
    {
        if (grader > 25)
        {
            ForVarmt?.[[Invoke]](this, new GraderEventArgs { Grader = grader });
        }
    }
}`,
        output: "Advarsel: 31 grader",
        fordi: "Subscriberen tilmeldes med `+=`. Data-klassen arver fra `EventArgs`. Ordet `event` beskytter eventen. Den rejses med `?.Invoke(this, …)`. 18 er ikke over 25, så der kommer kun én advarsel." },
      { t: "spor", h: "Spor: hvor mange gange kører subscriberne?",
        q: "Følg programmet, og skriv værdien af `antal`, lige efter at hver linje er udført. Læg mærke til, at der kommer en subscriber mere til undervejs.",
        kode: R`Butik butik = new Butik();
int antal = 0;
butik.Solgt += () => antal++;
butik.Saelg();
butik.Saelg();
butik.Solgt += () => antal += 10;
butik.Saelg();
Console.WriteLine(antal);

class Butik
{
    public event Action? Solgt;

    public void Saelg()
    {
        Solgt?.Invoke();
    }
}`,
        kolonner: ["antal"],
        raekker: [[2, "=0"], [3, "=0"], [4, "1"], [5, "2"], [6, "2"], [7, "13"]],
        slut: false,
        output: "13",
        fordi: "Linje 3 og 6 tilmelder kun — de ændrer ikke `antal`. De to første salg har én subscriber: 1, 2. Det tredje salg kører begge subscribers: 2 + 1 + 10 = 13." },
      { t: "orden", q: "Sæt linjerne i rækkefølge, så programmet skriver `Ring til vagten`. Klassen `Alarm` rejser eventen `Udloest`.",
        linjer: [R`Alarm alarm = new Alarm();`, R`alarm.Udloest += (s, e) => Console.WriteLine("Ring til vagten");`, R`alarm.Udloes();`, R`class Alarm`, R`{`, R`    public event EventHandler? Udloest;`, R`    public void Udloes() { Udloest?.Invoke(this, EventArgs.Empty); }`, R`}`],
        output: "Ring til vagten",
        fordi: "Objektet skal findes, før man kan tilmelde sig. Man skal være tilmeldt, før eventen rejses — ellers sker der ingenting. Klassen står til sidst, og eventen er erklæret i den." },
      { t: "skriv", q: "Klassen `Ovn` mangler sin event og metoden `Bag`. Skriv dem inde i klassen: en `public event Action? Faerdig;` og en `public void Bag()`, der skriver `Bager ...` og derefter rejser `Faerdig` med `?.Invoke()`.",
        foer: R`Ovn ovn = new Ovn();
ovn.Faerdig += () => Console.WriteLine("Kagen er klar");
ovn.Bag();

class Ovn
{`,
        efter: R`}`,
        tjek: [
          [/public event Action\?Faerdig;/, "Erklær eventen: `public event Action? Faerdig;`"],
          [/public void Bag\(\)\{/, "Lav metoden `public void Bag()`"],
          ['Console.WriteLine("Bager ...");', "Skriv `Bager ...`"],
          [/Faerdig\?\.Invoke\(\);/, "Rejs eventen med `Faerdig?.Invoke();`"]
        ],
        forkert: [R`public Action? Faerdig;

public void Bag()
{
    Console.WriteLine("Bager ...");
    Faerdig?.Invoke();
}`, R`public event Action? Faerdig;

public void Bag()
{
    Console.WriteLine("Bager ...");
    Faerdig();
}`],
        loesning: R`public event Action? Faerdig;

public void Bag()
{
    Console.WriteLine("Bager ...");
    Faerdig?.Invoke();
}`,
        output: "Bager ...\nKagen er klar" },
      { t: "ide", h: "Et lager, der giver besked",
        md: "Lav et Console-projekt, `LagerAlarm`. Lageret giver besked, når beholdningen af en vare kommer under 5. To forskellige subscribers lytter: en, der skriver en advarsel, og en, der bestiller flere.\n\nSkriv koden selv, og kør den. Sæt derefter et **breakpoint** inde i `Fjern` på linjen med `Invoke`, og brug {{**Step Into** (F11)||**Step Into**}} for at se, at debuggeren hopper ind i begge lambda-udtryk efter hinanden.",
        kode: R`Lager lager = new Lager();
lager.LavBeholdning += (sender, e) => Console.WriteLine($"Advarsel: kun {e.Antal} tilbage af {e.Vare}");
lager.LavBeholdning += (sender, e) => Console.WriteLine($"Bestiller 20 {e.Vare}");

lager.Fjern("Mælk", 3);
lager.Fjern("Mælk", 4);

class LagerEventArgs : EventArgs
{
    public string Vare { get; init; } = "";
    public int Antal { get; init; }
}

class Lager
{
    private int antalMaelk = 10;
    public event EventHandler<LagerEventArgs>? LavBeholdning;

    public void Fjern(string vare, int antal)
    {
        antalMaelk -= antal;
        Console.WriteLine($"Fjernet {antal} {vare}, {antalMaelk} tilbage");
        if (antalMaelk < 5)
        {
            LavBeholdning?.Invoke(this, new LagerEventArgs { Vare = vare, Antal = antalMaelk });
        }
    }
}`,
        output: "Fjernet 3 Mælk, 7 tilbage\nFjernet 4 Mælk, 3 tilbage\nAdvarsel: kun 3 tilbage af Mælk\nBestiller 20 Mælk",
        md2: "Bemærk, at `Lager` ikke ved, at der findes en advarsel eller en bestilling. Du kan tilføje en tredje subscriber — fx en, der skriver til en fil — uden at røre klassen. Det er hele pointen med events." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er en event, og hvad er forskellen på en event og en almindelig delegate? Nævn det designmønster, events bygger på.",
        svar: "En **event** er en delegate i en klasse med ordet **`event`** foran. Klassen er **publisher**: den **rejser** eventen med `?.Invoke(...)`, når noget sker. Andre er **subscribers**: de tilmelder sig med **`+=`** og afmelder sig med `-=`. Forskellen fra en almindelig delegate er, at man **udefra kun må bruge `+=` og `-=`** — man kan ikke slette de andres tilmeldinger eller selv rejse eventen. Normalt har den typen `EventHandler<T>` med `sender` og en `EventArgs`-klasse med data. Det er **Observer-mønsteret**: én giver besked, mange lytter, og publisheren kender ikke lytterne.",
        noegle: ["publisher", "subscriber", "+=", "Invoke", "Observer"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m10l5", titel: "Delegates, du allerede har brugt: LINQ, Sort og Find", min: 16,
    ord: [
      ["CompareTo", "Sammenligner to værdier. Giver et negativt tal, hvis den første er mindst, 0 hvis de er ens, og et positivt tal, hvis den første er størst."],
      ["Comparison<T>", "Den delegate-type, `List.Sort` kan få: en metode, der tager to T og returnerer en `int` (som `CompareTo`)."],
      ["Find", "Liste-metode, der får en `Predicate<T>` og giver det første element, der opfylder den — eller standardværdien (`null` eller 0)."],
      ["FindAll", "Som `Find`, men giver en ny liste med alle de elementer, der opfylder betingelsen."],
      ["RemoveAll", "Fjerner alle elementer, der opfylder en `Predicate<T>`, og returnerer, hvor mange der blev fjernet."],
      ["ForEach", "Liste-metode, der får en `Action<T>` og kalder den for hvert element."]
    ],
    trin: [
      { t: "laes", h: "Where får en Func",
        md: "Nu kan du se, hvad der egentlig skete i modul 9. `Where` på en `List<int>` har en parameter af typen `Func<int, bool>`. Lambda-udtrykket `x => x > 6` er bare en metode, der passer i den.\n\nDerfor kan du lige så godt give en `Func`-variabel eller en navngiven metode med:",
        kode: R`List<int> tal = new List<int> { 3, 8, 12, 5 };

Func<int, bool> erStor = x => x > 6;
List<int> store = tal.Where(erStor).ToList();
List<int> ogsaaStore = tal.Where(ErStor).ToList();

Console.WriteLine(string.Join(" ", store));
Console.WriteLine(string.Join(" ", ogsaaStore));

static bool ErStor(int x)
{
    return x > 6;
}`,
        noter: [
          ["Where(erStor)", "Giver en `Func`-variabel med."],
          ["Where(ErStor)", "Giver en navngiven metode med — uden parenteser, som i lektion 1."],
          ["Select", "Får på samme måde en `Func<T, TResultat>`: én værdi ind, en ny værdi ud."]
        ],
        output: "8 12\n8 12" },
      { t: "valg", q: "Du kalder `navne.Where(…)` på en `List<string>`. Hvilken delegate-type passer parameteren til?",
        svar: ["`Func<string, bool>`", "`Action<string>`", "`Func<bool, string>`", "`Action<string, bool>`"],
        ret: 0, fordi: "`Where` giver hvert element (en `string`) til metoden og skal have et ja/nej tilbage (`bool`). En `Func` returnerer noget, og den sidste type er returtypen: `Func<string, bool>`." },
      { t: "laes", h: "CompareTo: hvem kommer først?",
        md: "For at sortere skal man kunne sammenligne to værdier. Det gør `CompareTo`. Svaret er et tal:\n\n- **negativt**: den første er mindst (skal stå først),\n- **0**: de er lige store,\n- **positivt**: den første er størst (skal stå sidst).",
        kode: R`Console.WriteLine(3.CompareTo(7));
Console.WriteLine(7.CompareTo(3));
Console.WriteLine(5.CompareTo(5));`,
        output: "-1\n1\n0",
        md2: "Tekster har også `CompareTo` og sammenligner alfabetisk: `\"Anna\".CompareTo(\"Bo\")` er negativ." },
      { t: "forudsig",
        kode: R`Console.WriteLine(10.CompareTo(4));
Console.WriteLine("Anna".CompareTo("Bo"));
Console.WriteLine(2.CompareTo(2));`,
        output: "1\n-1\n0",
        fordi: "10 er størst, så positivt. \"Anna\" kommer før \"Bo\" i alfabetet, så negativt. To ens tal giver 0." },
      { t: "laes", h: "Sort med et lambda-udtryk",
        md: "`Sort()` uden argument kan sortere tal og tekst. Men en liste af **dine egne objekter** ved den ikke, hvordan den skal sortere. Så giver du den en metode, der sammenligner **to** elementer — en `Comparison<T>`.\n\n`List.Sort` kalder dit lambda-udtryk mange gange med to elementer `a` og `b` og bruger svaret til at bestemme, hvem der skal stå først.",
        kode: R`List<Vare> varer = new List<Vare>
{
    new Vare { Navn = "Ost", Pris = 49 },
    new Vare { Navn = "Mælk", Pris = 12 },
    new Vare { Navn = "Kaffe", Pris = 45 }
};

varer.Sort((a, b) => a.Pris.CompareTo(b.Pris));
foreach (Vare v in varer)
{
    Console.WriteLine($"{v.Navn}: {v.Pris} kr.");
}

class Vare
{
    public string Navn { get; set; } = "";
    public decimal Pris { get; set; }
}`,
        noter: [
          ["(a, b) => …", "To parametre: de to varer, der skal sammenlignes."],
          ["a.Pris.CompareTo(b.Pris)", "Sammenlign på prisen. Negativt = `a` skal stå før `b`."],
          ["(a, b) => b.Pris.CompareTo(a.Pris)", "(ikke i koden) Byt `a` og `b` om, så sorteres der faldende: dyreste først."]
        ],
        output: "Mælk: 12 kr.\nKaffe: 45 kr.\nOst: 49 kr.",
        md2: "Forskellen fra `OrderBy` i modul 9: `Sort` ændrer **selve listen**, `OrderBy` laver en ny rækkefølge og lader den gamle liste være." },
      { t: "forudsig",
        kode: R`List<string> dyr = new List<string> { "kat", "elefant", "ko", "hest" };
dyr.Sort((a, b) => a.Length.CompareTo(b.Length));
Console.WriteLine(string.Join(" ", dyr));`,
        output: "ko kat hest elefant",
        fordi: "Der sammenlignes på `Length`, altså antal bogstaver: ko (2), kat (3), hest (4), elefant (7). Korteste først." },
      { t: "laes", h: "Find, FindAll, RemoveAll og ForEach",
        md: "`List<T>` har flere metoder, der får en delegate:\n\n- `Find` og `FindAll` får en `Predicate<T>` (et ja/nej pr. element).\n- `RemoveAll` får også en `Predicate<T>` og fjerner dem, der svarer ja.\n- `ForEach` får en `Action<T>` og kalder den for hvert element.",
        kode: R`List<int> tal = new List<int> { 4, 9, 15, 2, 20 };

int foerste = tal.Find(t => t > 10);
List<int> alleStore = tal.FindAll(t => t > 10);
int fjernet = tal.RemoveAll(t => t < 5);

tal.ForEach(t => Console.Write(t + " "));
Console.WriteLine();
Console.WriteLine($"{foerste} | {string.Join(",", alleStore)} | {fjernet}");`,
        noter: [
          ["Find(t => t > 10)", "Det **første** tal over 10: 15. Findes der intet, får man standardværdien — 0 for tal, `null` for objekter."],
          ["FindAll(t => t > 10)", "En ny liste med **alle** tal over 10: 15 og 20."],
          ["RemoveAll(t => t < 5)", "Fjerner 4 og 2 fra `tal` og returnerer 2 (antallet)."],
          ["ForEach(t => …)", "Kører lambda-udtrykket for hvert tal, der er tilbage: 9, 15, 20."]
        ],
        output: "9 15 20\n15 | 15,20 | 2" },
      { t: "fejl", q: "Programmet skal sortere priserne fra **højeste** til **laveste**. Det kan oversættes, men sorterer forkert. Klik på linjen med fejlen.",
        kode: R`List<int> priser = new List<int> { 45, 12, 49 };
priser.Sort((a, b) => a.CompareTo(b));
Console.WriteLine(string.Join(" ", priser));`,
        linje: 2, logisk: true,
        output: "12 45 49",
        fordi: "`a.CompareTo(b)` sorterer stigende — mindste først. For at få højeste først skal `a` og `b` byttes om: `b.CompareTo(a)`.",
        rettet: R`List<int> priser = new List<int> { 45, 12, 49 };
priser.Sort((a, b) => b.CompareTo(a));
Console.WriteLine(string.Join(" ", priser));`,
        rettetOutput: "49 45 12" },
      { t: "skriv", q: "Find det første navn i listen `navne`, der starter med `\"B\"`. Brug `Find` med et lambda-udtryk, gem svaret i en variabel `string? fundet`, og skriv `fundet` ud.",
        foer: R`List<string> navne = new List<string> { "Anna", "Bo", "Bente" };`,
        tjek: [
          [/(string\?|string |var )fundet=/, "Gem svaret i en variabel: `string? fundet = …`"],
          [/navne\.Find\(\(?(\w+)\)?=>\1\.StartsWith\("B"\)\)/, "Brug `navne.Find(n => n.StartsWith(\"B\"))`"],
          [/Console\.WriteLine\(fundet\);/, "Skriv svaret ud: `Console.WriteLine(fundet);`"]
        ],
        forkert: [R`List<string> fundet = navne.FindAll(n => n.StartsWith("B"));
Console.WriteLine(fundet);`],
        loesning: R`string? fundet = navne.Find(n => n.StartsWith("B"));
Console.WriteLine(fundet);`,
        output: "Bo",
        fordi: "`Find` giver det **første**, der passer: Bo. `string?`, fordi `Find` giver `null`, hvis ingen passer." },
      { t: "orden", q: "Sæt linjerne i rækkefølge, så programmet sorterer personerne efter alder (yngste først) og skriver deres navne.",
        linjer: [R`List<Person> folk = new List<Person> { new Person { Navn = "Ida", Alder = 30 }, new Person { Navn = "Ole", Alder = 25 } };`, R`folk.Sort((a, b) => a.Alder.CompareTo(b.Alder));`, R`folk.ForEach(p => Console.WriteLine(p.Navn));`, R`class Person { public string Navn { get; set; } = ""; public int Alder { get; set; } }`],
        output: "Ole\nIda",
        fordi: "Listen skal findes, før den kan sorteres, og sorteres, før den skrives ud. Klassen står til sidst." },
      { t: "ide", h: "Sortér en holdliste på flere måder",
        md: "Lav et Console-projekt, `Holdliste`. Skriv koden selv. Programmet sorterer den samme liste på tre måder med `Sort` og skriver den ud med `ForEach`.\n\nSæt et breakpoint inde i et af lambda-udtrykkene i `Sort`: {{klik på `a.Navn.CompareTo`, og tryk **F9** (et klik i margenen sætter det på hele linjen, og så stopper den kun én gang)||klik i margenen ud for linjen, og vælg lambda-udtrykket i den lille menu, der kommer frem}}. Kør med debuggeren. Hver gang du trykker {{**Continue** (F5)||**Resume**}}, stopper den igen: `Sort` kalder dit lambda-udtryk mange gange. Se på `a` og `b` hver gang.",
        kode: R`List<Spiller> hold = new List<Spiller>
{
    new Spiller { Navn = "Sara", Maal = 7 },
    new Spiller { Navn = "Ali", Maal = 12 },
    new Spiller { Navn = "Mikkel", Maal = 3 }
};

Console.WriteLine("Efter navn:");
hold.Sort((a, b) => a.Navn.CompareTo(b.Navn));
hold.ForEach(s => Console.WriteLine($"  {s.Navn}"));

Console.WriteLine("Flest mål først:");
hold.Sort((a, b) => b.Maal.CompareTo(a.Maal));
hold.ForEach(s => Console.WriteLine($"  {s.Navn}: {s.Maal}"));

Spiller? topscorer = hold.Find(s => s.Maal > 10);
Console.WriteLine($"Over 10 mål: {topscorer?.Navn}");

class Spiller
{
    public string Navn { get; set; } = "";
    public int Maal { get; set; }
}`,
        output: "Efter navn:\n  Ali\n  Mikkel\n  Sara\nFlest mål først:\n  Ali: 12\n  Sara: 7\n  Mikkel: 3\nOver 10 mål: Ali" },
      { t: "forklar", q: "Forklar med dine egne ord: Nævn tre steder, hvor du har brugt delegates uden at skrive ordet `delegate`. Hvad skal lambda-udtrykket i `List.Sort` returnere?",
        svar: "Jeg har brugt delegates i **LINQ**: `Where` får en `Func<T, bool>`, og `Select` får en `Func`, der laver hvert element om. **`List.Find`** og `FindAll` får en **`Predicate<T>`**, og **`ForEach`** får en `Action<T>`. **`List.Sort`** får en sammenligning af **to elementer**, fx `(a, b) => a.Pris.CompareTo(b.Pris)`. Den skal returnere et **negativt tal**, hvis `a` skal stå først, **0**, hvis de er lige, og et **positivt tal**, hvis `b` skal stå først. Bytter man om på `a` og `b`, sorteres der faldende.",
        noegle: ["Where", "Func", "Predicate", "CompareTo", "negativt"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m10v", titel: "Værksted: Delegates, lambda og events", vaerksted: true, min: 75, ord: [],
    trin: [
      { t: "laes", h: "Sådan arbejder du i værkstedet",
        md: "Nu skal du skrive **hele programmer selv** i {{Visual Studio||Rider}} med `Func`, `Action`, `Predicate`, callbacks og events.\n\nDen første opgave er let. Den tredje er en fejlfinding, hvor du skal bruge debuggeren. Den sidste samler hele modulet i ét program.",
        noter: [
          ["Skriv selv", "Skriv koden med dine egne fingre. Kopiér ikke fra lektionerne."],
          ["Kør tit", "Kør, hver gang du har tilføjet en metode eller en event. Så ved du præcis, hvad der gav fejlen."],
          ["Brug debuggeren", "Sæt et **breakpoint** inde i et lambda-udtryk eller på linjen med `Invoke`, og brug {{**Step Into**||**Step Into**}}. Så **ser** du, hvornår subscriberne bliver kaldt, og hvilke værdier de får — i stedet for at gætte."],
          ["Event-rækkefølge", "Ingen output fra en event? Tjek tre ting: er der tilmeldt med `+=`, sker tilmeldingen **før** eventen rejses, og bliver `Invoke` overhovedet nået?"],
          ["Tips før løsning", "Åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af."]
        ] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Regn med Func", projekt: "FuncRegner",
        md: "Lav fire regnearter som `Func`-variabler med lambda-udtryk, og brug dem på to tal. Lav også en `Predicate`, der siger, om et tal er lige.",
        krav: [
          "`int a = 12;` og `int b = 4;`",
          "Fire variabler af typen `Func<int, int, int>`: `plus`, `minus`, `gange` og `divider`, hver med et lambda-udtryk",
          "En `Predicate<int>`, der hedder `erLige`",
          "Programmet skriver `12 + 4 = 16`, `12 - 4 = 8`, `12 * 4 = 48` og `12 / 4 = 3` på hver sin linje — tallene skal komme fra kald af dine variabler",
          "Til sidst skriver det `16 er lige: True` — 16 skal være `plus(a, b)`, og `True` skal komme fra `erLige`"
        ],
        tip: [
          "Start med `plus`, og kør. Tilføj så én variabel ad gangen.",
          "`Func<int, int, int> plus = (x, y) => x + y;` og `Console.WriteLine($\"{a} + {b} = {plus(a, b)}\");`",
          "`Predicate<int> erLige = t => t % 2 == 0;` og `int sum = plus(a, b);` og `Console.WriteLine($\"{sum} er lige: {erLige(sum)}\");`"
        ],
        output: "12 + 4 = 16\n12 - 4 = 8\n12 * 4 = 48\n12 / 4 = 3\n16 er lige: True",
        loesning: R`int a = 12;
int b = 4;

Func<int, int, int> plus = (x, y) => x + y;
Func<int, int, int> minus = (x, y) => x - y;
Func<int, int, int> gange = (x, y) => x * y;
Func<int, int, int> divider = (x, y) => x / y;
Predicate<int> erLige = t => t % 2 == 0;

Console.WriteLine($"{a} + {b} = {plus(a, b)}");
Console.WriteLine($"{a} - {b} = {minus(a, b)}");
Console.WriteLine($"{a} * {b} = {gange(a, b)}");
Console.WriteLine($"{a} / {b} = {divider(a, b)}");

int sum = plus(a, b);
Console.WriteLine($"{sum} er lige: {erLige(sum)}");`,
        ekstra: ["Læg de fire `Func`-variabler i et `Dictionary<string, Func<int, int, int>>` med tegnet som nøgle, og skriv de fire linjer med én `foreach`.", "Lav en `Func<int, int, int>` mere, `potens`, der regner `x` i `y`'te med en `for`-løkke inde i et lambda-udtryk med tuborgklammer."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Din egen Filtrer-metode", projekt: "Filtrer",
        md: "Skriv din egen udgave af `FindAll`: en metode, der får en liste og en betingelse, og returnerer en ny liste med de tal, der opfylder betingelsen. Brug den så med tre forskellige lambda-udtryk.",
        krav: [
          "Listen er `List<int> tal = new List<int> { 3, 10, 15, 22, 9, 30 };`",
          "Metoden `static List<int> Filtrer(List<int> tal, Predicate<int> betingelse)` bruger en `foreach`-løkke og kalder `betingelse` for hvert tal (ingen LINQ og ingen `FindAll` inde i metoden)",
          "Skriv `Lige: ` og de lige tal adskilt af `, `",
          "Skriv `Over 12: ` og tallene over 12 adskilt af `, `",
          "Skriv `Delelige med 3: ` og tallene, der kan deles med 3, adskilt af `, `"
        ],
        tip: [
          "Inde i metoden: lav en tom `List<int> resultat`, gå listen igennem, og læg tallet i `resultat`, når `betingelse(t)` er `true`.",
          "`if (betingelse(t)) { resultat.Add(t); }` og til sidst `return resultat;`",
          "Kaldet: `Console.WriteLine($\"Lige: {string.Join(\", \", Filtrer(tal, t => t % 2 == 0))}\");`"
        ],
        output: "Lige: 10, 22, 30\nOver 12: 15, 22, 30\nDelelige med 3: 3, 15, 9, 30",
        loesning: R`List<int> tal = new List<int> { 3, 10, 15, 22, 9, 30 };

Console.WriteLine($"Lige: {string.Join(", ", Filtrer(tal, t => t % 2 == 0))}");
Console.WriteLine($"Over 12: {string.Join(", ", Filtrer(tal, t => t > 12))}");
Console.WriteLine($"Delelige med 3: {string.Join(", ", Filtrer(tal, t => t % 3 == 0))}");

static List<int> Filtrer(List<int> tal, Predicate<int> betingelse)
{
    List<int> resultat = new List<int>();
    foreach (int t in tal)
    {
        if (betingelse(t))
        {
            resultat.Add(t);
        }
    }
    return resultat;
}`,
        ekstra: ["Lav en metode `static List<int> Omdan(List<int> tal, Func<int, int> regel)` — din egen `Select` — og brug den til at fordoble alle tal.", "Gør `Filtrer` generisk (modul 6): `static List<T> Filtrer<T>(List<T> liste, Predicate<T> betingelse)`, og brug den på en liste af navne."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Fejlfinding: den forsinkede saldo", projekt: "SaldoFejl",
        md: "Kontoen nedenfor giver besked med en event, hver gang saldoen ændrer sig. To subscribers lytter: den ene skriver saldoen, den anden advarer, når saldoen kommer under 100 kr.\n\nDer indsættes 300 kr., hæves 150 og hæves 100. Saldoen skal altså være 300, 150 og 50 — og der skal komme en advarsel til sidst. Men programmet skriver 300, 300 og 150, og der kommer ingen advarsel.\n\nProgrammet kan oversættes. Find fejlen **med debuggeren**:\n\n1. Kopiér koden ind i Program.cs, og kør den. Se den forkerte udskrift.\n2. Sæt et **breakpoint** på linjen `SaldoAendret?.Invoke(…)` inde i `Haev`.\n3. Start med debuggeren ({{**F5**||den **grønne bille** 🐞}}). Når den stopper, så se på `saldo` og `beloeb` i {{**Locals**||**Threads & Variables**}}. Er saldoen allerede blevet mindre?\n4. Sammenlign med `Indsaet`. I hvilken rækkefølge står de to linjer dér?",
        krav: [
          "Find ud af, hvorfor subscriberne får en forkert saldo",
          "Ret fejlen med så lille en ændring som muligt — rør ikke subscriberne",
          "Programmet skriver `Saldo: 300 kr.`, `Saldo: 150 kr.`, `Saldo: 50 kr.` og `Advarsel: lav saldo!`"
        ],
        start: R`Konto konto = new Konto();
konto.SaldoAendret += (sender, e) => Console.WriteLine($"Saldo: {e.NySaldo} kr.");
konto.SaldoAendret += (sender, e) =>
{
    if (e.NySaldo < 100)
    {
        Console.WriteLine("Advarsel: lav saldo!");
    }
};

konto.Indsaet(300);
konto.Haev(150);
konto.Haev(100);

class SaldoEventArgs : EventArgs
{
    public decimal NySaldo { get; init; }
}

class Konto
{
    private decimal saldo;
    public event EventHandler<SaldoEventArgs>? SaldoAendret;

    public void Indsaet(decimal beloeb)
    {
        saldo += beloeb;
        SaldoAendret?.Invoke(this, new SaldoEventArgs { NySaldo = saldo });
    }

    public void Haev(decimal beloeb)
    {
        SaldoAendret?.Invoke(this, new SaldoEventArgs { NySaldo = saldo });
        saldo -= beloeb;
    }
}`,
        startOutput: "Saldo: 300 kr.\nSaldo: 300 kr.\nSaldo: 150 kr.",
        tip: [
          "Når debuggeren stopper i `Haev` første gang, er `saldo` stadig 300, selvom der skal hæves 150. Eventen bliver rejst for tidligt.",
          "I `Indsaet` ændres saldoen **først**, og bagefter rejses eventen. I `Haev` er det omvendt.",
          "Byt om på de to linjer i `Haev`, så `saldo -= beloeb;` kommer før `SaldoAendret?.Invoke(…)`."
        ],
        output: "Saldo: 300 kr.\nSaldo: 150 kr.\nSaldo: 50 kr.\nAdvarsel: lav saldo!",
        loesning: R`Konto konto = new Konto();
konto.SaldoAendret += (sender, e) => Console.WriteLine($"Saldo: {e.NySaldo} kr.");
konto.SaldoAendret += (sender, e) =>
{
    if (e.NySaldo < 100)
    {
        Console.WriteLine("Advarsel: lav saldo!");
    }
};

konto.Indsaet(300);
konto.Haev(150);
konto.Haev(100);

class SaldoEventArgs : EventArgs
{
    public decimal NySaldo { get; init; }
}

class Konto
{
    private decimal saldo;
    public event EventHandler<SaldoEventArgs>? SaldoAendret;

    public void Indsaet(decimal beloeb)
    {
        saldo += beloeb;
        SaldoAendret?.Invoke(this, new SaldoEventArgs { NySaldo = saldo });
    }

    public void Haev(decimal beloeb)
    {
        saldo -= beloeb;
        SaldoAendret?.Invoke(this, new SaldoEventArgs { NySaldo = saldo });
    }
}`,
        ekstra: ["Lad `Haev` nægte at hæve, hvis der ikke er penge nok, og lav en ny event `AfvistHaevning`, der sender det beløb med, der blev forsøgt hævet.", "Tilføj en tredje subscriber, der tæller, hvor mange gange saldoen har ændret sig (en closure med en tæller), og skriv tallet til sidst."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Køkkenet giver besked", projekt: "Koekken",
        md: "En restaurant: køkkenet giver besked med en event, hver gang en ret er klar. Tjeneren og kassen lytter begge, men gør hver sin ting. Køkkenet kender hverken tjeneren eller kassen.\n\nPriserne er `decimal`. Skriv dem med to decimaler i koden (`95.00m`), så skriver C# også to decimaler ud.",
        krav: [
          "En klasse `RetEventArgs : EventArgs` med `Ret` (`string`) og `Bord` (`int`) som `{ get; init; }`-properties",
          "En klasse `Koekken` med `public event EventHandler<RetEventArgs>? RetKlar;` og en metode `Lav(string ret, int bord)`, der skriver `Køkkenet laver {ret}` og derefter rejser eventen",
          "Et `Dictionary<string, decimal>` med priserne Burger 95.00m, Salat 70.00m og Is 45.00m",
          "Subscriber 1 (tjeneren) skriver `Tjener: bringer {Ret} til bord {Bord}`",
          "Subscriber 2 (kassen) lægger 1 til `int antalRetter` og rettens pris til `decimal omsaetning` (en closure)",
          "Køkkenet laver Burger til bord 2, Salat til bord 5 og Is til bord 2",
          "Til sidst skrives `Retter i alt: 3` og `Omsætning: 210,00 kr.`"
        ],
        tip: [
          "Lav de to klasser først. Lav så `Koekken`-objektet og tilmeld tjeneren, og kør med ét kald til `Lav`.",
          "`Lav`: `Console.WriteLine($\"Køkkenet laver {ret}\");` og `RetKlar?.Invoke(this, new RetEventArgs { Ret = ret, Bord = bord });`",
          "Kassen: `koekken.RetKlar += (sender, e) => { antalRetter++; omsaetning += priser[e.Ret]; };` — variablerne skal være erklæret før."
        ],
        output: "Køkkenet laver Burger\nTjener: bringer Burger til bord 2\nKøkkenet laver Salat\nTjener: bringer Salat til bord 5\nKøkkenet laver Is\nTjener: bringer Is til bord 2\nRetter i alt: 3\nOmsætning: 210,00 kr.",
        loesning: R`Dictionary<string, decimal> priser = new Dictionary<string, decimal>
{
    { "Burger", 95.00m },
    { "Salat", 70.00m },
    { "Is", 45.00m }
};

int antalRetter = 0;
decimal omsaetning = 0;

Koekken koekken = new Koekken();
koekken.RetKlar += (sender, e) => Console.WriteLine($"Tjener: bringer {e.Ret} til bord {e.Bord}");
koekken.RetKlar += (sender, e) =>
{
    antalRetter++;
    omsaetning += priser[e.Ret];
};

koekken.Lav("Burger", 2);
koekken.Lav("Salat", 5);
koekken.Lav("Is", 2);

Console.WriteLine($"Retter i alt: {antalRetter}");
Console.WriteLine($"Omsætning: {omsaetning} kr.");

class RetEventArgs : EventArgs
{
    public string Ret { get; init; } = "";
    public int Bord { get; init; }
}

class Koekken
{
    public event EventHandler<RetEventArgs>? RetKlar;

    public void Lav(string ret, int bord)
    {
        Console.WriteLine($"Køkkenet laver {ret}");
        RetKlar?.Invoke(this, new RetEventArgs { Ret = ret, Bord = bord });
    }
}`,
        ekstra: ["Lav en tredje subscriber, der holder styr på omsætningen pr. bord i et `Dictionary<int, decimal>`, og skriv den ud til sidst.", "Lav kassen som en rigtig klasse `Kasse` med en metode `RetKlar(object? sender, RetEventArgs e)`, og tilmeld den med `koekken.RetKlar += kasse.RetKlar;`."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Opgavelisten", projekt: "Opgaveliste",
        md: "Et lille program, der samler hele modulet: en liste af opgaver, der sorteres med et lambda-udtryk, søges i med `Find` og `FindAll`, og en event, der giver point, når en opgave bliver afsluttet.",
        krav: [
          "En klasse `Opgave` med `Titel` (`string`), `Prioritet` (`int`) og `Faerdig` (`bool`) som auto-properties",
          "En klasse `OpgaveEventArgs : EventArgs` med en property `Opgave` af typen `Opgave`",
          "En klasse `Opgaveliste` med `public List<Opgave> Opgaver { get; } = new List<Opgave>();` og `public event EventHandler<OpgaveEventArgs>? OpgaveFaerdig;`",
          "`Opgaveliste` har en metode `Afslut(string titel)`, der finder opgaven med `Find`. Findes den ikke, skrives `Findes ikke: {titel}`. Ellers sættes `Faerdig` til `true`, og eventen rejses",
          "Opgaverne lægges i, i denne rækkefølge: Vaske op (2), Læse til eksamen (5), Handle (3), Træne (1)",
          "Sortér `Opgaver` med `Sort` og et lambda-udtryk, højeste prioritet først. Skriv `Opgaver:` og én linje pr. opgave i formen `  [{Prioritet}] {Titel}`",
          "Én subscriber skriver `Færdig: {Titel}`, og en anden lægger `Prioritet * 10` til en variabel `point` (en closure)",
          "Afslut `Handle`, `Træne` og `Svømme` i den rækkefølge",
          "Skriv `Point: {point}` og `Mangler: ` efterfulgt af titlerne på de ufærdige opgaver (find dem med `FindAll`), adskilt af `, `"
        ],
        tip: [
          "Byg det i små bidder: først klasserne og listen, så sortering og udskrift (kør!), så eventen med én subscriber (kør!), og til sidst point og `Mangler`.",
          "Sortering: `liste.Opgaver.Sort((a, b) => b.Prioritet.CompareTo(a.Prioritet));`. I `Afslut`: `Opgave? o = Opgaver.Find(x => x.Titel == titel);` og `if (o == null) { … return; }`.",
          "Rejs eventen med `OpgaveFaerdig?.Invoke(this, new OpgaveEventArgs { Opgave = o });`. Mangler: `liste.Opgaver.FindAll(o => !o.Faerdig).Select(o => o.Titel)` inde i `string.Join`."
        ],
        output: "Opgaver:\n  [5] Læse til eksamen\n  [3] Handle\n  [2] Vaske op\n  [1] Træne\nFærdig: Handle\nFærdig: Træne\nFindes ikke: Svømme\nPoint: 40\nMangler: Læse til eksamen, Vaske op",
        loesning: R`Opgaveliste liste = new Opgaveliste();
liste.Opgaver.Add(new Opgave { Titel = "Vaske op", Prioritet = 2 });
liste.Opgaver.Add(new Opgave { Titel = "Læse til eksamen", Prioritet = 5 });
liste.Opgaver.Add(new Opgave { Titel = "Handle", Prioritet = 3 });
liste.Opgaver.Add(new Opgave { Titel = "Træne", Prioritet = 1 });

liste.Opgaver.Sort((a, b) => b.Prioritet.CompareTo(a.Prioritet));
Console.WriteLine("Opgaver:");
liste.Opgaver.ForEach(o => Console.WriteLine($"  [{o.Prioritet}] {o.Titel}"));

int point = 0;
liste.OpgaveFaerdig += (sender, e) => Console.WriteLine($"Færdig: {e.Opgave.Titel}");
liste.OpgaveFaerdig += (sender, e) => point += e.Opgave.Prioritet * 10;

liste.Afslut("Handle");
liste.Afslut("Træne");
liste.Afslut("Svømme");

Console.WriteLine($"Point: {point}");
List<Opgave> mangler = liste.Opgaver.FindAll(o => !o.Faerdig);
Console.WriteLine($"Mangler: {string.Join(", ", mangler.Select(o => o.Titel))}");

class Opgave
{
    public string Titel { get; set; } = "";
    public int Prioritet { get; set; }
    public bool Faerdig { get; set; }
}

class OpgaveEventArgs : EventArgs
{
    public Opgave Opgave { get; init; } = new Opgave();
}

class Opgaveliste
{
    public List<Opgave> Opgaver { get; } = new List<Opgave>();
    public event EventHandler<OpgaveEventArgs>? OpgaveFaerdig;

    public void Afslut(string titel)
    {
        Opgave? o = Opgaver.Find(x => x.Titel == titel);
        if (o == null)
        {
            Console.WriteLine($"Findes ikke: {titel}");
            return;
        }
        o.Faerdig = true;
        OpgaveFaerdig?.Invoke(this, new OpgaveEventArgs { Opgave = o });
    }
}`,
        ekstra: ["Tilføj en metode `Hent(Predicate<Opgave> betingelse)` i `Opgaveliste`, der returnerer `Opgaver.FindAll(betingelse)`, og brug den til at finde alle opgaver med prioritet 3 eller mere.", "Lav en event `AlleFaerdige`, der rejses i `Afslut`, når der ikke er flere ufærdige opgaver (`Opgaver.TrueForAll(o => o.Faerdig)`)."] }
    ] }
  ]
});
})();
