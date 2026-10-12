// Værksted til modul 8 — Tråde, Task og async.
(function () {
const R = String.raw;
var m = window.KURSUS.filter(function (x) { return x.id === "m08"; })[0];
if (!m) return;
m.lektioner.push({ id: "m08v", titel: "Værksted: Task, async og lock i praksis", vaerksted: true, min: 60, ord: [], trin: [

  { t: "laes", h: "Sådan arbejder du i værkstedet",
    md: "Nu skal du skrive **hele programmer selv** i {{Visual Studio||Rider}} — med `Task.Run`, `async`/`await`, `Task.WhenAll` og `lock`.\n\nOpgaverne bliver sværere hen ad vejen. Den første er let. Den fjerde er en fejlfinding, hvor du skal bruge debuggeren. Den sidste samler hele modulet i ét program.\n\nKode med flere tråde har én ekstra regel: **udskriften må ikke afhænge af, hvem der kommer først.** Derfor venter alle programmerne her på, at opgaverne er færdige, **før** de skriver resultaterne ud — og ingen af dem skriver tider ud.",
    noter: [
      ["Skriv selv", "Skriv koden med dine egne fingre. Kopiér ikke fra modulet."],
      ["Kør flere gange", "Med tråde er én kørsel ikke et bevis. Kør programmet tre-fire gange, og tjek, at udskriften er **den samme hver gang**."],
      ["Vent, før du skriver ud", "Saml resultaterne med `await Task.WhenAll(...)` (eller `Join`), og skriv dem ud bagefter i en fast rækkefølge."],
      ["Læs advarslerne", "Advarslen *\"this call is not awaited\"* betyder næsten altid en fejl. Hold musen over, og læs teksten."],
      ["Brug debuggeren", "Sæt et **breakpoint** i en metode, der kører på en anden tråd. Når den stopper, viser {{vinduet **Threads** (Debug → Windows → Threads)||fanen **Threads & Variables**}}, hvilken tråd du står på."],
      ["Tips før løsning", "Åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af."]
    ] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Regn i baggrunden", projekt: "Baggrund",
    md: "To store summer skal regnes ud. Send begge beregninger af sted som `Task<long>` med `Task.Run`, så de kører samtidig, og vent på dem begge, før du skriver resultaterne ud.",
    krav: [
      "Metoden `static long SumTil(int n)` lægger alle tal fra 1 til og med `n` sammen i en `for`-løkke og returnerer summen. Brug `long`, fordi summen bliver for stor til en `int`",
      "Start `SumTil(1000)` og `SumTil(1000000)` som to `Task<long>` med `Task.Run`",
      "Vent på dem begge med `await Task.WhenAll(...)`",
      "Skriv `Summen af 1 til 1000: …`, `Summen af 1 til 1000000: …` og `Tilsammen: …` med `.Result`"
    ],
    tip: [
      "Skriv og afprøv `SumTil` først uden tasks: `Console.WriteLine(SumTil(10));` skal give 55.",
      "`Task<long> a = Task.Run(() => SumTil(1000));` — lambdaen `() => …` er \"en metode uden parametre, der gør dette\".",
      "`await Task.WhenAll(a, b);` og bagefter `Console.WriteLine($\"Tilsammen: {a.Result + b.Result}\");`. Efter `WhenAll` er begge færdige, så `.Result` venter ikke."
    ],
    output: "Summen af 1 til 1000: 500500\nSummen af 1 til 1000000: 500000500000\nTilsammen: 500001000500",
    loesning: R`Task<long> a = Task.Run(() => SumTil(1000));
Task<long> b = Task.Run(() => SumTil(1000000));

await Task.WhenAll(a, b);

Console.WriteLine($"Summen af 1 til 1000: {a.Result}");
Console.WriteLine($"Summen af 1 til 1000000: {b.Result}");
Console.WriteLine($"Tilsammen: {a.Result + b.Result}");

static long SumTil(int n)
{
    long sum = 0;
    for (int i = 1; i <= n; i++)
    {
        sum += i;
    }
    return sum;
}`,
    ekstra: ["Lav `sum` om til en `int`, og kør. Den store sum bliver forkert (1784293664 i stedet for 500000500000), fordi en `int` løber over ved ca. 2 milliarder og starter forfra. Sæt `long` tilbage.", "Skriv `Thread.CurrentThread.ManagedThreadId` ud inde i `SumTil`. De to beregninger kører på hver sin tråd fra trådpuljen. Det nummer **må** du gerne skrive ud her — men det kan skifte fra kørsel til kørsel."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Morgenmaden", projekt: "Morgenmad",
    md: "Den asynkrone kok sætter æg over, putter brød i brødristeren og tænder kaffemaskinen — **uden** at stå og vente ved hver ting. Hver ting er en `async`-metode med en `await Task.Delay(...)`, der leger ventetiden.\n\nLæg mærke til en vigtig detalje: en `async`-metode kører **med det samme** frem til sin første `await`. Derfor kommer de tre \"starter\"-linjer altid i samme rækkefølge.",
    krav: [
      "`static async Task<string> KogAegAsync()` skriver `Sætter æg over`, venter 300 ms med `await Task.Delay`, og returnerer `Æg: kogt`",
      "`RistBroedAsync()` skriver `Putter brød i brødristeren`, venter 200 ms og returnerer `Brød: ristet`",
      "`BrygKaffeAsync()` skriver `Tænder kaffemaskinen`, venter 400 ms og returnerer `Kaffe: brygget`",
      "Programmet skriver `Morgenmad starter`, **starter alle tre** metoder (uden `await`) og gemmer deres `Task<string>`",
      "Derefter `string[] faerdige = await Task.WhenAll(...)` med de tre i rækkefølgen æg, brød, kaffe. Skriv hvert resultat og til sidst `Morgenmaden er klar`"
    ],
    tip: [
      "Skriv én metode, fx `KogAegAsync`, og kald den med `string s = await KogAegAsync(); Console.WriteLine(s);`. Når den virker, laver du de to andre.",
      "Start alle tre først: `Task<string> aeg = KogAegAsync();` osv. Først **bagefter** venter du: `string[] faerdige = await Task.WhenAll(aeg, broed, kaffe);`.",
      "`Task.WhenAll` giver resultaterne i **samme rækkefølge**, som du gav den opgaverne — ikke i den rækkefølge, de blev færdige. Derfor kan du trygt skrive dem ud med en `foreach`."
    ],
    output: "Morgenmad starter\nSætter æg over\nPutter brød i brødristeren\nTænder kaffemaskinen\nÆg: kogt\nBrød: ristet\nKaffe: brygget\nMorgenmaden er klar",
    loesning: R`Console.WriteLine("Morgenmad starter");

Task<string> aeg = KogAegAsync();
Task<string> broed = RistBroedAsync();
Task<string> kaffe = BrygKaffeAsync();

string[] faerdige = await Task.WhenAll(aeg, broed, kaffe);

foreach (string f in faerdige)
{
    Console.WriteLine(f);
}
Console.WriteLine("Morgenmaden er klar");

static async Task<string> KogAegAsync()
{
    Console.WriteLine("Sætter æg over");
    await Task.Delay(300);
    return "Æg: kogt";
}

static async Task<string> RistBroedAsync()
{
    Console.WriteLine("Putter brød i brødristeren");
    await Task.Delay(200);
    return "Brød: ristet";
}

static async Task<string> BrygKaffeAsync()
{
    Console.WriteLine("Tænder kaffemaskinen");
    await Task.Delay(400);
    return "Kaffe: brygget";
}`,
    ekstra: ["Mål tiden med en `Stopwatch` (husk `using System.Diagnostics;`). Den samlede tid er ca. 400 ms — den langsomste — ikke 900.", "Skriv `await` foran hvert kald i stedet: `string a = await KogAegAsync();` osv. Mål igen. Nu venter kokken ved hver ting, og det tager ca. 900 ms.", "Flyt `Console.WriteLine(\"Æg: kogt\")` ind i metoden **efter** `await`. Kør flere gange. Rækkefølgen af de linjer afhænger nu af ventetiderne — derfor skriver vi resultaterne ud i hovedprogrammet i stedet."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Billetsalget", projekt: "Billetsalg",
    md: "Der er 100 billetter til en koncert. Fire salgssteder sælger på samme tid — hver af dem forsøger at sælge 40 billetter. Der må **aldrig** blive solgt mere end 100.\n\nProblemet er ikke bare `Solgt++`. Det er tjekket **og** salget: to tråde kan begge se, at der er 1 billet tilbage, og begge sælge den. Derfor skal tjek og salg ske i **samme** `lock`-blok.",
    krav: [
      "`Billetkontor` har tre properties med `private set`: `Tilbage`, `Solgt` og `Afvist` (alle `int`). Konstruktøren `Billetkontor(int antal)` sætter `Tilbage`",
      "`Billetkontor` har et privat låse-objekt: `private object laas = new object();`",
      "`public bool Koeb()` låser med `lock (laas)`. Inde i låsen: er `Tilbage` større end 0, trækkes 1 fra `Tilbage`, `Solgt` tælles op, og der returneres `true`. Ellers tælles `Afvist` op, og der returneres `false`",
      "Programmet laver et kontor med 100 billetter og et `Task[]` med 4 opgaver. Hver opgave startes med `Task.Run` og kalder `Koeb()` 40 gange",
      "Vent på alle fire med `await Task.WhenAll(...)`, og skriv `Solgt: …`, `Afvist: …` og `Tilbage: …`"
    ],
    tip: [
      "Lav klassen færdig først, og afprøv den uden tasks: kald `Koeb()` 110 gange i en almindelig løkke. Så skal du få 100 solgt og 10 afvist.",
      "Opgaverne: `Task[] saelgere = new Task[4]; for (int n = 0; n < 4; n++) { saelgere[n] = Task.Run(() => { for (int i = 0; i < 40; i++) { kontor.Koeb(); } }); }`.",
      "Hele `if`/`else` i `Koeb` skal stå **inde i** `lock (laas) { … }`. Det er det, der gør tjek-og-salg til én handling, som kun én tråd ad gangen kan udføre."
    ],
    output: "Solgt: 100\nAfvist: 60\nTilbage: 0",
    loesning: R`Billetkontor kontor = new Billetkontor(100);

Task[] saelgere = new Task[4];
for (int n = 0; n < 4; n++)
{
    saelgere[n] = Task.Run(() =>
    {
        for (int i = 0; i < 40; i++)
        {
            kontor.Koeb();
        }
    });
}

await Task.WhenAll(saelgere);

Console.WriteLine($"Solgt: {kontor.Solgt}");
Console.WriteLine($"Afvist: {kontor.Afvist}");
Console.WriteLine($"Tilbage: {kontor.Tilbage}");

class Billetkontor
{
    private object laas = new object();

    public int Tilbage { get; private set; }
    public int Solgt { get; private set; }
    public int Afvist { get; private set; }

    public Billetkontor(int antal)
    {
        Tilbage = antal;
    }

    public bool Koeb()
    {
        lock (laas)
        {
            if (Tilbage > 0)
            {
                Tilbage--;
                Solgt++;
                return true;
            }
            Afvist++;
            return false;
        }
    }
}`,
    ekstra: ["Fjern `lock`, og sæt antallet op: 100.000 billetter og 4 × 40.000 forsøg. Kør flere gange. Passer `Solgt + Tilbage` stadig med det, du startede med? (Ofte ikke — det er en race condition.)", "Hvorfor er det ikke nok kun at låse om `Solgt++`? Forklar med to tråde og 1 billet tilbage."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Fejlfinding: ordrerne, der aldrig blev gemt", projekt: "GlemtAwait",
    md: "Programmet skal gemme tre ordrer i en (lege-)database, én ad gangen og i rækkefølge, og derefter skrive, hvor mange der er gemt. Forbindelsen virker, men derefter skriver det `Gemt i databasen: 0` — og linjerne `Gemt: …` kommer aldrig.\n\nProgrammet kan oversættes. Find fejlen **med debuggeren**:\n\n1. Kopiér koden ind i Program.cs, og kør den. Se den forkerte udskrift.\n2. Sæt et **breakpoint** på linjen `raekker.Add(ordre);` inde i `GemAsync` og et på den sidste `Console.WriteLine` i toppen.\n3. Start med debuggeren ({{**F5**||den **grønne bille** 🐞}}). Hvilket breakpoint rammer du først? Se på `db` i {{**Locals**||**Threads & Variables**}}: hvor mange rækker er der?\n4. Kig efter en {{**grøn bølgestreg**||**bølgestreg**}} i løkken, og læs advarslen i {{**Error List**||**Problems**}}.",
    krav: [
      "Find ud af, hvorfor programmet tæller rækkerne, før nogen ordre er gemt",
      "Ret fejlen med **ét ord** — klassen `Database` må ikke ændres",
      "Programmet skriver `Forbundet til databasen`, `Gemt: Ordre 1`, `Gemt: Ordre 2`, `Gemt: Ordre 3` og til sidst `Gemt i databasen: 3`"
    ],
    start: R`Database db = new Database();
await db.ForbindAsync();
string[] ordrer = { "Ordre 1", "Ordre 2", "Ordre 3" };

foreach (string o in ordrer)
{
    db.GemAsync(o);
}

Console.WriteLine($"Gemt i databasen: {db.Antal}");

class Database
{
    private List<string> raekker = new List<string>();

    public int Antal
    {
        get { return raekker.Count; }
    }

    public async Task ForbindAsync()
    {
        await Task.Delay(50);
        Console.WriteLine("Forbundet til databasen");
    }

    public async Task GemAsync(string ordre)
    {
        await Task.Delay(200);
        raekker.Add(ordre);
        Console.WriteLine($"Gemt: {ordre}");
    }
}`,
    tip: [
      "Du rammer breakpointet ved `Console.WriteLine` **før** det i `GemAsync`. Så er løkken allerede færdig, mens ingen ordre er nået frem til `raekker.Add`. Hvad gør løkken, når den kalder `GemAsync`?",
      "Advarslen siger: *\"Because this call is not awaited, execution of the current method continues before the call is completed\"*. `GemAsync` bliver sat i gang, men løkken **venter ikke** på den. Når programmet når sin sidste linje, slutter det — og opgaverne når aldrig at blive færdige.",
      "Skriv `await` foran kaldet: `await db.GemAsync(o);`. Så venter løkken på hver ordre, før den går videre til den næste."
    ],
    output: "Forbundet til databasen\nGemt: Ordre 1\nGemt: Ordre 2\nGemt: Ordre 3\nGemt i databasen: 3",
    loesning: R`Database db = new Database();
await db.ForbindAsync();
string[] ordrer = { "Ordre 1", "Ordre 2", "Ordre 3" };

foreach (string o in ordrer)
{
    await db.GemAsync(o);
}

Console.WriteLine($"Gemt i databasen: {db.Antal}");

class Database
{
    private List<string> raekker = new List<string>();

    public int Antal
    {
        get { return raekker.Count; }
    }

    public async Task ForbindAsync()
    {
        await Task.Delay(50);
        Console.WriteLine("Forbundet til databasen");
    }

    public async Task GemAsync(string ordre)
    {
        await Task.Delay(200);
        raekker.Add(ordre);
        Console.WriteLine($"Gemt: {ordre}");
    }
}`,
    ekstra: ["Det er præcis den fejl, man laver i et web-projekt, når man glemmer `await` foran `SaveChangesAsync()`. Brugeren får at vide, at alt er gemt — men det er det ikke.", "Hvorfor er det **ikke** en god idé at rette fejlen ved at starte alle tre og bruge `Task.WhenAll` her? (To grunde: rækkefølgen er ikke længere sikker, og tre opgaver ville kalde `raekker.Add` på samme `List` samtidig — en `List` er ikke trådsikker.)"] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Samlet program: butikskædens dagsrapport", projekt: "Dagsrapport",
    md: "Nu samler du hele modulet. En butikskæde har fire butikker. Hver butik skal \"spørges\" om dagens omsætning — det leger vi er et langsomt netværkskald, så det skal være **asynkront**, og alle fire butikker spørges **på samme tid**.\n\nKæden tæller desuden, hvor mange kald der er lavet. Tælleren er **delt tilstand**: fortsættelsen efter `await` kan køre på forskellige tråde samtidig, så tælleren skal beskyttes med `lock`.",
    krav: [
      "`Kaede` har et privat felt `Dictionary<string, int[]> salg` med butikkerne `Aarhus` {1200, 800, 450}, `Odense` {300, 950}, `Aalborg` {2000, 150, 600, 250} og `Esbjerg` {700} — i den rækkefølge",
      "`Kaede` har et privat låse-objekt og et privat felt `antalKald`. Propertyen `AntalKald` returnerer feltet",
      "`public List<string> Butikker()` returnerer en ny liste med alle butiksnavnene (nøglerne)",
      "`public async Task<int> HentOmsaetningAsync(string butik)` venter 100 ms med `await Task.Delay`, tæller `antalKald` op **inde i en `lock`**, og returnerer summen af butikkens salg",
      "Programmet starter **alle** fire kald først (en `List<Task<int>>`), og venter så på dem med `int[] resultater = await Task.WhenAll(opgaver);`",
      "Skriv `Dagsrapport:`, derefter hver butik som `  {butik}: {omsætning} kr.`, og så `I alt: …`, `Gennemsnit: …` (heltalsdivision), `Bedste butik: {butik} ({omsætning} kr.)` og `Antal kald: …`"
    ],
    tip: [
      "Byg det i lag: lav `Kaede` med `Butikker()` og en **synkron** `HentOmsaetning`, og skriv rapporten. Når tallene passer, laver du metoden om til `async Task<int>` med `Task.Delay`.",
      "`List<Task<int>> opgaver = new List<Task<int>>(); foreach (string b in butikker) { opgaver.Add(kaede.HentOmsaetningAsync(b)); }`. Resultaterne i `resultater` står i **samme rækkefølge** som `butikker`, så `butikker[i]` hører til `resultater[i]`.",
      "Den bedste butik: `int bedsteIndeks = 0;` før en `for`-løkke, og `if (resultater[i] > resultater[bedsteIndeks]) { bedsteIndeks = i; }`. Låsen i metoden: `lock (laas) { antalKald++; }`."
    ],
    output: "Dagsrapport:\n  Aarhus: 2450 kr.\n  Odense: 1250 kr.\n  Aalborg: 3000 kr.\n  Esbjerg: 700 kr.\nI alt: 7400 kr.\nGennemsnit: 1850 kr.\nBedste butik: Aalborg (3000 kr.)\nAntal kald: 4",
    loesning: R`Kaede kaede = new Kaede();
List<string> butikker = kaede.Butikker();

List<Task<int>> opgaver = new List<Task<int>>();
foreach (string b in butikker)
{
    opgaver.Add(kaede.HentOmsaetningAsync(b));
}

int[] resultater = await Task.WhenAll(opgaver);

Console.WriteLine("Dagsrapport:");
int total = 0;
int bedsteIndeks = 0;
for (int i = 0; i < butikker.Count; i++)
{
    Console.WriteLine($"  {butikker[i]}: {resultater[i]} kr.");
    total += resultater[i];
    if (resultater[i] > resultater[bedsteIndeks])
    {
        bedsteIndeks = i;
    }
}

Console.WriteLine($"I alt: {total} kr.");
Console.WriteLine($"Gennemsnit: {total / butikker.Count} kr.");
Console.WriteLine($"Bedste butik: {butikker[bedsteIndeks]} ({resultater[bedsteIndeks]} kr.)");
Console.WriteLine($"Antal kald: {kaede.AntalKald}");

class Kaede
{
    private Dictionary<string, int[]> salg = new Dictionary<string, int[]>
    {
        { "Aarhus", new int[] { 1200, 800, 450 } },
        { "Odense", new int[] { 300, 950 } },
        { "Aalborg", new int[] { 2000, 150, 600, 250 } },
        { "Esbjerg", new int[] { 700 } }
    };

    private object laas = new object();
    private int antalKald = 0;

    public int AntalKald
    {
        get { return antalKald; }
    }

    public List<string> Butikker()
    {
        List<string> navne = new List<string>();
        foreach (string navn in salg.Keys)
        {
            navne.Add(navn);
        }
        return navne;
    }

    public async Task<int> HentOmsaetningAsync(string butik)
    {
        await Task.Delay(100);

        lock (laas)
        {
            antalKald++;
        }

        int sum = 0;
        foreach (int beloeb in salg[butik])
        {
            sum += beloeb;
        }
        return sum;
    }
}`,
    ekstra: ["Mål tiden med en `Stopwatch`. Fire kald à 100 ms tager ca. 100 ms i alt, fordi de venter samtidig.", "Sæt et breakpoint på `antalKald++;`, og se i {{vinduet **Threads**||fanen **Threads & Variables**}}, at du ikke altid står på samme tråd.", "Lav en udgave helt uden lås og uden delt tæller: lad hovedprogrammet tælle `resultater.Length` i stedet. Den bedste løsning på delt tilstand er ofte at undgå den."] },

  // ------------------------------------------------------------------
  { t: "spor", h: "Spor: hvad sker der før await?",
    q: "Følg hovedprogrammet. Skriv `skridt` og `svar` lige efter hver af linjerne 1–6. Husk: et kald **uden** `await` sætter metoden i gang, og programmet går straks videre. Først ved `await` venter det på resultatet.",
    kode: R`int skridt = 0;
skridt = skridt + 1;
Task<int> t = GangTreAsync(5);
skridt = skridt + 10;
int svar = await t;
skridt = skridt + svar;
static async Task<int> GangTreAsync(int n)
{
    await Task.Delay(100);
    return n * 3;
}`,
    kolonner: ["skridt", "svar"],
    raekker: [[1, "=0", "=–"], [2, "=1", "=–"], [3, "1", "–"], [4, "11", "–"], [5, "11", "15"], [6, "26", "15"]],
    fordi: "Linje 3 **starter** opgaven og giver en `Task<int>` tilbage — et løfte, ikke et tal. Derfor kan linje 4 køre, mens metoden venter. I linje 5 pakker `await` løftet ud: `svar` bliver 5 · 3 = 15. Til sidst 11 + 15 = 26." },

  { t: "spor", h: "Spor: Join gør rækkefølgen sikker",
    q: "Følg programmet. Linjerne med `Start()` (4 og 8) er udeladt, fordi du **ikke kan vide**, om tråden er nået at køre lige efter dem — det er netop pointen. Efter `Join()` er tråden **garanteret** færdig. Skriv `a` og `b` lige efter hver af de viste linjer.",
    kode: R`int a = 0;
int b = 0;
Thread t1 = new Thread(() => a = 5);
t1.Start();
t1.Join();
b = a * 2;
Thread t2 = new Thread(() => b = b + 1);
t2.Start();
t2.Join();
a = a + b;`,
    kolonner: ["a", "b"],
    raekker: [[1, "=0", "=–"], [2, "=0", "=0"], [3, "0", "0"], [5, "5", "0"], [6, "5", "10"], [7, "5", "10"], [9, "5", "11"], [10, "16", "11"]],
    fordi: "Linje 3 og 7 **laver** kun trådene — intet kører endnu. Efter `t1.Join()` har tråden helt sikkert sat `a` til 5, så linje 6 giver `b` = 10. Efter `t2.Join()` er `b` blevet 11. Til sidst 5 + 11 = 16. Uden `Join` kunne linje 6 køre, **før** tråden havde sat `a` — og så blev `b` 0." },

  { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: I fejlfindingsopgaven skrev programmet `Gemt i databasen: 0`. Hvorfor — og hvorfor er den fejl farlig i et web-projekt?",
    svar: "`GemAsync` blev kaldt **uden `await`**. Så bliver metoden sat i gang og giver en `Task` tilbage, men den kaldende kode **venter ikke** på, at den bliver færdig. Løkken løb videre, og programmet talte rækkerne, før nogen ordre var gemt — og sluttede, før opgaverne nåede at blive færdige. Compileren advarer med *\"this call is not awaited\"*. Med `await` venter løkken på hver ordre, uden at blokere tråden. I et web-projekt er det farligt, fordi man fx kan glemme `await` foran `SaveChangesAsync()`: brugeren får at vide, at data er gemt, selv om det ikke er sikkert, at det er sket.",
    noegle: ["await", "Task", "venter ikke", "advarsel", "SaveChangesAsync", "blokere"] }

] });
})();
