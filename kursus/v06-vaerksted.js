// Værksted til modul 6 — Collections og datastrukturer.
(function () {
const R = String.raw;
var m = window.KURSUS.filter(function (x) { return x.id === "m06"; })[0];
if (!m) return;
m.lektioner.push({ id: "m06v", titel: "Værksted: collections i praksis", vaerksted: true, min: 60, ord: [], trin: [

  { t: "laes", h: "Sådan arbejder du i værkstedet",
    md: "Nu skal du skrive **hele programmer selv** i {{Visual Studio||Rider}} — med `List`, `Dictionary`, `Queue`, `Stack` og `HashSet`.\n\nOpgaverne bliver sværere hen ad vejen. Den første er let. Den tredje er en fejlfinding, hvor du skal bruge debuggeren. Den sidste samler hele modulet i ét program, hvor du selv skal vælge den rigtige samling til hver ting.",
    noter: [
      ["Skriv selv", "Skriv koden med dine egne fingre. Kopiér ikke fra modulet."],
      ["Kør tit", "Kør efter hver lille ændring. Så ved du, hvor en fejl kom ind."],
      ["Brug debuggeren", "Sæt et **breakpoint**, og gå ét skridt ad gangen med {{**F10** (Step Over)||**Step Over**}}. I {{**Locals**||**Threads & Variables**}} kan du klappe en samling ud med den lille pil og **se hvert element** og `Count`. Så skal du ikke holde indholdet i hovedet."],
      ["Papir ved siden af", "Skriv indholdet af samlingen ned, når du er i tvivl — fx `kø: Anna Bo Carl`. Det er det samme, som spor-skemaerne træner."],
      ["Tips før løsning", "Åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af."]
    ] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Indkøbslisten", projekt: "Indkob",
    md: "Lav en indkøbsliste med en `List<string>`. Du skal tilføje, fjerne og indsætte varer og til sidst skrive listen ud med numre foran.",
    krav: [
      "Opret `List<string> varer` med en collection initializer, der indeholder `mælk`, `brød` og `æg` (i den rækkefølge)",
      "Tilføj `kaffe` til sidst med `Add`",
      "Fjern `brød` med `Remove`",
      "Indsæt `smør` forrest med `Insert`",
      "Skriv `Antal varer: {antal}` med `Count`",
      "Skriv hver vare på sin egen linje med et nummer foran, der starter ved 1: `1. smør` osv.",
      "Skriv til sidst `Står æg på listen? {svar}`, hvor svaret kommer fra `Contains`"
    ],
    tip: [
      "Lav én ting ad gangen, og skriv `Console.WriteLine(string.Join(\" \", varer));` efter hver linje, så du kan se listen ændre sig. Slet de linjer bagefter.",
      "`Insert` tager to ting: pladsen og værdien. Forrest er plads 0: `varer.Insert(0, \"smør\");`.",
      "Nummereringen: lav en `int nr = 1;` før en `foreach`, skriv `$\"{nr}. {v}\"`, og læg 1 til `nr` i løkken. Eller brug en `for`-løkke og skriv `i + 1`."
    ],
    output: "Antal varer: 4\n1. smør\n2. mælk\n3. æg\n4. kaffe\nStår æg på listen? True",
    loesning: R`List<string> varer = new List<string> { "mælk", "brød", "æg" };

varer.Add("kaffe");
varer.Remove("brød");
varer.Insert(0, "smør");

Console.WriteLine($"Antal varer: {varer.Count}");

int nr = 1;
foreach (string v in varer)
{
    Console.WriteLine($"{nr}. {v}");
    nr++;
}

Console.WriteLine($"Står æg på listen? {varer.Contains("æg")}");`,
    ekstra: ["Skriv `varer.Remove(\"ost\");` — en vare, der ikke er på listen. Går programmet ned? (`Remove` svarer `false` og gør ingenting.) Skriv svaret ud.", "Sortér listen med `Sort()`, før du skriver den ud. Hvilken rækkefølge får `æ` i forhold til de andre bogstaver?"] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Ordtælleren", projekt: "Ordtaeller",
    md: "Tæl, hvor mange gange hvert ord står i en sætning. Det er klassikeren fra modulet: en `Dictionary`, hvor **nøglen** er ordet, og **værdien** er antallet.\n\nTil sidst skal programmet finde det ord, der står flest gange.",
    krav: [
      "Sætningen er `\"den lille hund og den store hund og den sorte kat\"`. Del den op i ord med `Split(' ')`",
      "Brug en `Dictionary<string, int>` til at tælle ordene: findes ordet, lægges 1 til — ellers sættes det til 1",
      "Skriv hvert ord og dets antal som `ord: antal`, i den rækkefølge, de første gang står i sætningen",
      "Skriv `Forskellige ord: {antal}` — antallet af nøgler",
      "Find det ord, der står flest gange, med en løkke over parrene, og skriv `Mest brugte ord: {ord} ({antal})`"
    ],
    tip: [
      "Tællingen er præcis som stemme-eksemplet i modulet: `if (antal.ContainsKey(o)) { antal[o]++; } else { antal[o] = 1; }`.",
      "En `foreach (var par in antal)` giver ét par ad gangen med `par.Key` og `par.Value`. En Dictionary, man kun har lagt til, gives tilbage i den rækkefølge, nøglerne blev lagt i.",
      "Det mest brugte ord: lav `string bedste = \"\";` og `int flest = 0;` før løkken. Er `par.Value > flest`, så gem både nøglen og værdien."
    ],
    output: "den: 3\nlille: 1\nhund: 2\nog: 2\nstore: 1\nsorte: 1\nkat: 1\nForskellige ord: 7\nMest brugte ord: den (3)",
    loesning: R`string saetning = "den lille hund og den store hund og den sorte kat";
string[] ord = saetning.Split(' ');

Dictionary<string, int> antal = new Dictionary<string, int>();
foreach (string o in ord)
{
    if (antal.ContainsKey(o))
    {
        antal[o]++;
    }
    else
    {
        antal[o] = 1;
    }
}

foreach (var par in antal)
{
    Console.WriteLine($"{par.Key}: {par.Value}");
}
Console.WriteLine($"Forskellige ord: {antal.Count}");

string bedste = "";
int flest = 0;
foreach (var par in antal)
{
    if (par.Value > flest)
    {
        bedste = par.Key;
        flest = par.Value;
    }
}
Console.WriteLine($"Mest brugte ord: {bedste} ({flest})");`,
    ekstra: ["Lad brugeren skrive sin egen sætning med `Console.ReadLine()`. Brug `.ToLower()`, så `Den` og `den` tæller som det samme ord.", "Skriv kun de ord, der står mere end én gang."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Fejlfinding: kundeservice-køen", projekt: "Kundekoe",
    md: "Fem kunder står i kø hos kundeservice. Programmet skal betjene **alle** fem i den rækkefølge, de kom, og til sidst skrive, at køen er tom. Men kun tre bliver betjent — Dina og Emil bliver stående.\n\nProgrammet kan oversættes. Find fejlen **med debuggeren**:\n\n1. Kopiér koden ind i Program.cs, og kør den. Se den forkerte udskrift.\n2. Sæt et **breakpoint** på linjen `string kunde = koe.Dequeue();`.\n3. Start med debuggeren ({{**F5**||den **grønne bille** 🐞}}). Find `i` og `koe` i {{**Locals**||**Threads & Variables**}}, og klap `koe` ud, så du kan se `Count`.\n4. Tryk {{**F5** (Continue)||**Resume** ▶}} for at køre én tur mere i løkken. Skriv `i` og `koe.Count` ned på papir for hver tur.\n5. Hvad sker der med betingelsen `i < koe.Count`, når **begge** tal ændrer sig?",
    krav: [
      "Find ud af, hvorfor løkken stopper efter tre kunder",
      "Ret løkken, så den kører, så længe der står nogen i køen — uanset hvor mange der er",
      "Programmet skriver `I kø: 5`, derefter `Betjener …` for alle fem i rækkefølgen Anna, Bo, Carl, Dina, Emil, og til sidst `Stadig i kø: 0`"
    ],
    start: R`Queue<string> koe = new Queue<string>();
koe.Enqueue("Anna");
koe.Enqueue("Bo");
koe.Enqueue("Carl");
koe.Enqueue("Dina");
koe.Enqueue("Emil");

Console.WriteLine($"I kø: {koe.Count}");

for (int i = 0; i < koe.Count; i++)
{
    string kunde = koe.Dequeue();
    Console.WriteLine($"Betjener {kunde}");
}

Console.WriteLine($"Stadig i kø: {koe.Count}");`,
    startOutput: "I kø: 5\nBetjener Anna\nBetjener Bo\nBetjener Carl\nStadig i kø: 2",
    tip: [
      "Første tur: `i` er 0, og `Count` er 5. Anden tur: `i` er 1, men `Count` er nu 4. Tredje tur: `i` er 2, og `Count` er 3. Hvad sker der i fjerde tur?",
      "`i` vokser med 1 hver gang, og `Count` falder med 1 hver gang, fordi `Dequeue` **fjerner** kunden. De mødes på midten. En `for`-løkke med en tæller passer dårligt, når samlingen skrumper undervejs.",
      "Brug en `while`-løkke, der spørger køen selv: `while (koe.Count > 0) { … }`. Så er der ingen tæller, der kan løbe forbi."
    ],
    output: "I kø: 5\nBetjener Anna\nBetjener Bo\nBetjener Carl\nBetjener Dina\nBetjener Emil\nStadig i kø: 0",
    loesning: R`Queue<string> koe = new Queue<string>();
koe.Enqueue("Anna");
koe.Enqueue("Bo");
koe.Enqueue("Carl");
koe.Enqueue("Dina");
koe.Enqueue("Emil");

Console.WriteLine($"I kø: {koe.Count}");

while (koe.Count > 0)
{
    string kunde = koe.Dequeue();
    Console.WriteLine($"Betjener {kunde}");
}

Console.WriteLine($"Stadig i kø: {koe.Count}");`,
    ekstra: ["Samme fejl findes med en `List`: `for (int i = 0; i < liste.Count; i++) { liste.RemoveAt(0); }`. Prøv det med fem elementer, og forudsig først, hvor mange der bliver tilbage.", "Lad en ny kunde, `Frida`, stille sig i kø, mens Bo bliver betjent (`if (kunde == \"Bo\") { koe.Enqueue(\"Frida\"); }`). Kommer hun med i din rettede løkke?"] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Parentes-tjekkeren", projekt: "Parenteser",
    md: "Compileren tjekker hele tiden, at dine `(`, `[` og `{` passer sammen. Det gør den med en **stack**: hver gang den ser en åbnende parentes, lægger den den på stakken. Ser den en lukkende, tager den den øverste af og tjekker, at de to passer sammen.\n\nDet virker, fordi den parentes, der blev åbnet **sidst**, skal lukkes **først** — sidst ind, først ud.",
    krav: [
      "Skriv en metode `static bool Passer(char aaben, char luk)`, der returnerer `true` for parrene `(` `)`, `[` `]` og `{` `}` — og ellers `false`",
      "Skriv en metode `static bool ErBalanceret(string tekst)`, der bruger en `Stack<char>`",
      "For hvert tegn: er det `(`, `[` eller `{`, lægges det på stakken med `Push`",
      "Er det `)`, `]` eller `}`: er stakken tom, returneres `false`. Ellers tages det øverste tegn af med `Pop`, og passer de to ikke sammen, returneres `false`",
      "Alle andre tegn springes over. Til sidst er teksten kun balanceret, hvis stakken er tom",
      "Programmet tjekker de fem tekster `(1 + 2) * 3`, `{[a + b] * (c - d)}`, `(]`, `((x)` og `x)(` (i den rækkefølge) og skriver `{tekst}: OK` eller `{tekst}: FEJL`"
    ],
    tip: [
      "En `string` kan gennemløbes med `foreach`, ét tegn ad gangen: `foreach (char c in tekst) { … }`. Et tegn skrives med enkelte anførselstegn: `'('`.",
      "`Passer`: `if (aaben == '(' && luk == ')') { return true; }` — og det samme for de to andre par. Til sidst `return false;`.",
      "Inde i løkken: `if (c == '(' || c == '[' || c == '{') { stak.Push(c); } else if (c == ')' || c == ']' || c == '}') { if (stak.Count == 0) { return false; } char top = stak.Pop(); if (!Passer(top, c)) { return false; } }`. Efter løkken: `return stak.Count == 0;`."
    ],
    output: "(1 + 2) * 3: OK\n{[a + b] * (c - d)}: OK\n(]: FEJL\n((x): FEJL\nx)(: FEJL",
    loesning: R`string[] tekster = { "(1 + 2) * 3", "{[a + b] * (c - d)}", "(]", "((x)", "x)(" };

foreach (string t in tekster)
{
    string svar = ErBalanceret(t) ? "OK" : "FEJL";
    Console.WriteLine($"{t}: {svar}");
}

static bool Passer(char aaben, char luk)
{
    if (aaben == '(' && luk == ')')
    {
        return true;
    }
    if (aaben == '[' && luk == ']')
    {
        return true;
    }
    if (aaben == '{' && luk == '}')
    {
        return true;
    }
    return false;
}

static bool ErBalanceret(string tekst)
{
    Stack<char> stak = new Stack<char>();

    foreach (char c in tekst)
    {
        if (c == '(' || c == '[' || c == '{')
        {
            stak.Push(c);
        }
        else if (c == ')' || c == ']' || c == '}')
        {
            if (stak.Count == 0)
            {
                return false;
            }
            char top = stak.Pop();
            if (!Passer(top, c))
            {
                return false;
            }
        }
    }

    return stak.Count == 0;
}`,
    ekstra: ["Sæt et breakpoint i `ErBalanceret`, og følg `{[a + b] * (c - d)}` tegn for tegn. Klap `stak` ud i {{Locals||Threads & Variables}}, og se den vokse og skrumpe.", "Hvorfor skal tjekket `stak.Count == 0` stå **før** `Pop()`? Prøv at fjerne det, og kør med `x)(`. (`Pop` på en tom stak giver en `InvalidOperationException`.)"] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Samlet program: biblioteket", projekt: "Bibliotek",
    md: "Nu samler du hele modulet. Et lille bibliotek skal holde styr på bøger, udlån og ventelister. Du skal bruge **tre slags samlinger** — hver til det, den er bedst til:\n\n- en `Dictionary<string, Bog>`, så en bog kan slås op på sit ISBN-nummer,\n- en `Dictionary<string, Queue<string>>` med en **venteliste** til hver bog — først i kø, først til at låne,\n- et `HashSet<string>` med alle, der har lånt eller stillet sig i kø — hver person tælles kun én gang.\n\nKlassen `Bog` er en almindelig klasse med properties og en konstruktør (modul 4).",
    krav: [
      "`Bog` har `Isbn` og `Titel` (`string`, `{ get; }`) og `Laaner` (`string`, `{ get; set; }`). Konstruktøren `Bog(string isbn, string titel)` sætter `Laaner` til `\"\"` — tom tekst betyder, at bogen er ledig",
      "`Bibliotek` har tre private felter: `Dictionary<string, Bog> boeger`, `Dictionary<string, Queue<string>> ventelister` og `HashSet<string> laanere` — alle oprettet med `new`",
      "`TilfoejBog(Bog b)` gemmer bogen under dens ISBN og opretter en tom venteliste til den",
      "`Laan(string isbn, string navn)`: findes bogen ikke (brug `TryGetValue`), skrives `Ukendt bog: {isbn}`. Ellers lægges navnet i `laanere`. Er bogen ledig, bliver `navn` låner, og der skrives `{navn} låner {titel}`. Er den udlånt, stilles `navn` i kø, og der skrives `{navn} står i kø til {titel} (nr. {antal i kø})`",
      "`Aflever(string isbn)`: er bogen ledig, skrives `{titel} er ikke udlånt`. Ellers skrives `{låner} afleverer {titel}`. Står der nogen i kø, får den forreste bogen, og der skrives `{navn} låner {titel}`. Ellers bliver bogen ledig",
      "`Vis()` skriver `Status:`, derefter hver bog med to mellemrum foran som `{titel}: ledig` eller `{titel}: udlånt til {låner}, {antal} i kø`, og til sidst `Forskellige lånere: {antal}`",
      "Programmet tilføjer bøgerne `111` Dune, `222` Hobbitten og `333` Momo, og laver så i rækkefølge: Anna låner 111, Bo låner 111, Carl låner 111, Bo låner 222, Dina låner 999, aflever 111, aflever 222, aflever 333 — og kalder `Vis()`"
    ],
    tip: [
      "Byg det i lag: `Bog` og `TilfoejBog` først. Skriv så `Laan` uden kø-delen, og kør med Anna. Tilføj køen bagefter, og til sidst `Aflever` og `Vis`.",
      "`Laan` starter sådan her: `if (!boeger.TryGetValue(isbn, out Bog bog)) { Console.WriteLine($\"Ukendt bog: {isbn}\"); return; }` — `return` i en `void`-metode betyder \"stop metoden her\". Ventelisten til bogen er `ventelister[isbn]`.",
      "`Aflever`: `Queue<string> koe = ventelister[isbn]; if (koe.Count > 0) { bog.Laaner = koe.Dequeue(); Console.WriteLine($\"{bog.Laaner} låner {bog.Titel}\"); } else { bog.Laaner = \"\"; }`. Husk at skrive `… afleverer …` **før** du ændrer `Laaner`."
    ],
    output: "Anna låner Dune\nBo står i kø til Dune (nr. 1)\nCarl står i kø til Dune (nr. 2)\nBo låner Hobbitten\nUkendt bog: 999\nAnna afleverer Dune\nBo låner Dune\nBo afleverer Hobbitten\nMomo er ikke udlånt\nStatus:\n  Dune: udlånt til Bo, 1 i kø\n  Hobbitten: ledig\n  Momo: ledig\nForskellige lånere: 3",
    loesning: R`Bibliotek bib = new Bibliotek();
bib.TilfoejBog(new Bog("111", "Dune"));
bib.TilfoejBog(new Bog("222", "Hobbitten"));
bib.TilfoejBog(new Bog("333", "Momo"));

bib.Laan("111", "Anna");
bib.Laan("111", "Bo");
bib.Laan("111", "Carl");
bib.Laan("222", "Bo");
bib.Laan("999", "Dina");

bib.Aflever("111");
bib.Aflever("222");
bib.Aflever("333");

bib.Vis();

class Bog
{
    public string Isbn { get; }
    public string Titel { get; }
    public string Laaner { get; set; }

    public Bog(string isbn, string titel)
    {
        Isbn = isbn;
        Titel = titel;
        Laaner = "";
    }
}

class Bibliotek
{
    private Dictionary<string, Bog> boeger = new Dictionary<string, Bog>();
    private Dictionary<string, Queue<string>> ventelister = new Dictionary<string, Queue<string>>();
    private HashSet<string> laanere = new HashSet<string>();

    public void TilfoejBog(Bog b)
    {
        boeger[b.Isbn] = b;
        ventelister[b.Isbn] = new Queue<string>();
    }

    public void Laan(string isbn, string navn)
    {
        if (!boeger.TryGetValue(isbn, out Bog bog))
        {
            Console.WriteLine($"Ukendt bog: {isbn}");
            return;
        }

        laanere.Add(navn);

        if (bog.Laaner == "")
        {
            bog.Laaner = navn;
            Console.WriteLine($"{navn} låner {bog.Titel}");
        }
        else
        {
            Queue<string> koe = ventelister[isbn];
            koe.Enqueue(navn);
            Console.WriteLine($"{navn} står i kø til {bog.Titel} (nr. {koe.Count})");
        }
    }

    public void Aflever(string isbn)
    {
        Bog bog = boeger[isbn];

        if (bog.Laaner == "")
        {
            Console.WriteLine($"{bog.Titel} er ikke udlånt");
            return;
        }

        Console.WriteLine($"{bog.Laaner} afleverer {bog.Titel}");

        Queue<string> koe = ventelister[isbn];
        if (koe.Count > 0)
        {
            bog.Laaner = koe.Dequeue();
            Console.WriteLine($"{bog.Laaner} låner {bog.Titel}");
        }
        else
        {
            bog.Laaner = "";
        }
    }

    public void Vis()
    {
        Console.WriteLine("Status:");
        foreach (var par in boeger)
        {
            Bog bog = par.Value;
            if (bog.Laaner == "")
            {
                Console.WriteLine($"  {bog.Titel}: ledig");
            }
            else
            {
                Console.WriteLine($"  {bog.Titel}: udlånt til {bog.Laaner}, {ventelister[bog.Isbn].Count} i kø");
            }
        }
        Console.WriteLine($"Forskellige lånere: {laanere.Count}");
    }
}`,
    ekstra: ["Hvorfor bliver Dina ikke talt med i `Forskellige lånere`? Find linjen, der bestemmer det, og forklar.", "Tilføj en `Stack<string> historik` i `Bibliotek`, der får en linje for hvert udlån. Lav en metode `Fortryd()`, der tager den seneste handling af med `Pop` og skriver den ud.", "Sæt et breakpoint i `Vis()`. Klap `ventelister` ud i {{Locals||Threads & Variables}}, og find Carl i køen til Dune."] },

  // ------------------------------------------------------------------
  { t: "spor", h: "Spor: kø og stak sammen",
    q: "Følg programmet. Skriv indholdet af `koe` **forfra og bagud** og indholdet af `stak` **oppefra og ned**, med ét mellemrum mellem tallene — fx `1 2`. Skriv `tom`, når samlingen er tom.",
    kode: R`Queue<int> koe = new Queue<int>();
Stack<int> stak = new Stack<int>();
koe.Enqueue(1);
koe.Enqueue(2);
koe.Enqueue(3);
stak.Push(koe.Dequeue());
stak.Push(koe.Dequeue());
koe.Enqueue(stak.Pop());
Console.WriteLine($"{string.Join(" ", koe)} | {string.Join(" ", stak)}");`,
    kolonner: ["koe", "stak"],
    raekker: [[1, "=tom", "=–"], [2, "=tom", "=tom"], [3, "1", "tom"], [4, "1 2", "tom"], [5, "1 2 3", "tom"], [6, "2 3", "1"], [7, "3", "2 1"], [8, "3 2", "1"]],
    slut: false,
    output: "3 2 | 1",
    fordi: "`Dequeue` tager altid **forrest** i køen, og `Enqueue` stiller **bagest**. `Push` lægger **øverst** på stakken, og `Pop` tager det **øverste**. Linje 6 flytter 1 over på stakken, linje 7 flytter 2 ovenpå. Linje 8 tager 2 (den øverste) af stakken og stiller den bagest i køen: køen er `3 2`, og stakken har kun `1` tilbage." },

  { t: "spor", h: "Spor: Remove, Insert og RemoveAt",
    q: "Følg listen. Skriv indholdet af `tal` med ét mellemrum mellem tallene, og værdien af `sidste`. Pas på forskellen: `Remove` tager en **værdi**, `RemoveAt` og `Insert` tager en **plads** (indeks fra 0).",
    kode: R`List<int> tal = new List<int> { 4, 7, 4, 9 };
tal.Remove(4);
tal.Insert(1, 5);
tal.RemoveAt(0);
tal.Add(tal[0] + tal.Count);
int sidste = tal[tal.Count - 1];
Console.WriteLine($"{string.Join(" ", tal)} / {sidste}");`,
    kolonner: ["tal", "sidste"],
    raekker: [[1, "=4 7 4 9", "=–"], [2, "7 4 9", "–"], [3, "7 5 4 9", "–"], [4, "5 4 9", "–"], [5, "5 4 9 8", "–"], [6, "5 4 9 8", "8"]],
    slut: false,
    output: "5 4 9 8 / 8",
    fordi: "`Remove(4)` fjerner kun den **første** 4. `Insert(1, 5)` sætter 5 ind på plads 1, så resten rykker én til højre. `RemoveAt(0)` fjerner det, der står på plads 0 — tallet 7. I linje 5 er `tal[0]` 5 og `Count` 3, så der tilføjes 8. Det sidste element står på plads `Count - 1`." },

  { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: I biblioteksprogrammet brugte du en `Dictionary`, en `Queue` og et `HashSet`. Hvorfor netop dem — og hvorfor ikke bare en `List` til det hele?",
    svar: "Bøgerne ligger i en **Dictionary** med ISBN som **nøgle**, fordi man hele tiden skal **slå en bog op** ud fra nummeret — det er hurtigt i en Dictionary, mens en liste skulle gennemsøges element for element. Ventelisten er en **Queue**, fordi den, der stillede sig i kø **først**, skal låne **først** — FIFO. Lånerne ligger i et **HashSet**, fordi hver person kun skal **tælles én gang**; `Add` ignorerer dubletter. Med en `List` til det hele kunne det godt lade sig gøre, men jeg skulle selv skrive søgningen, køreglerne og dublet-tjekket — og opslagene ville blive langsommere, jo flere bøger der er.",
    noegle: ["nøgle", "opslag", "hurtigt", "FIFO", "først", "dubletter", "én gang"] }

] });
})();
