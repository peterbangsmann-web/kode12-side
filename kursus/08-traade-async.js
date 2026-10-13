// Modul 8 — Tråde, Task og async. Forudsætter: modul 0–7.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m08", nr: 8, del: "Del 3 · Videregående C#", ikon: "⚡",
  titel: "Tråde, Task og async",
  dag: "Kursusdag 7 · Performance",
  intro: "Indtil nu har dine programmer gjort **én ting ad gangen**. Her lærer du, hvordan et program kan lave flere ting samtidig — og hvorfor ordene `async` og `await` står overalt i den web-kode, du snart skal skrive.\n\nMålet er ikke, at du skal skrive avanceret trådkode. Målet er, at du kan **læse og forklare** `async Task<IActionResult>` til eksamen.",
  video: ["07_Tirs_Performance.mp4 (2 t 51 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m08l1", titel: "Performance, processer og tråde", min: 14,
    ord: [
      ["Performance", "Hvor hurtigt og effektivt et program klarer sit arbejde."],
      ["Stopwatch", "Et stopur i .NET til at måle, hvor lang tid noget tager."],
      ["Proces", "Et kørende program med sin egen hukommelse."],
      ["Tråd (thread)", "En udførelsesvej inde i en proces. Et program starter med én tråd — hovedtråden — men kan have flere."],
      ["Synkron kode", "Kode, hvor hver linje venter på, at den forrige er færdig."],
      ["Blokere", "Når en tråd står stille og venter og ikke kan lave andet imens."],
      ["CPU-kerne", "En \"regneenhed\" i processoren. Flere kerner kan arbejde på samme tid."]
    ],
    trin: [
      { t: "laes", h: "Én ting ad gangen",
        md: "Al den kode, du har skrevet indtil nu, er **synkron**: computeren udfører linje 1, venter til den er færdig, udfører linje 2 og så videre.\n\nDet er fint, når hver linje tager en milliontedel af et sekund. Men nogle ting er **langsomme**: at hente noget fra internettet, læse en stor fil eller spørge en database. Imens står programmet bare og venter. Man siger, at det **blokerer**.",
        kode: R`Console.WriteLine("Henter data ...");
Thread.Sleep(2000);
Console.WriteLine("Færdig");`,
        noter: [
          ["Thread.Sleep(2000)", "Stå stille i 2000 millisekunder (2 sekunder). Bruges her til at **lege**, at noget er langsomt."]
        ],
        output: "Henter data ...\nFærdig",
        md2: "I et program med knapper ville vinduet **fryse** i de to sekunder. På en webserver ville serveren stå og vente i stedet for at betjene andre brugere. Det er det problem, resten af modulet handler om." },
      { t: "laes", h: "Mål, før du gætter",
        md: "**Performance** handler om, hvor hurtigt et program er. Den vigtigste regel: **mål — gæt ikke**. .NET har et indbygget stopur, `Stopwatch`.",
        kode: R`using System.Diagnostics;

Stopwatch ur = Stopwatch.StartNew();

long sum = 0;
for (int i = 0; i < 1000000; i++)
{
    sum += i;
}

ur.Stop();
Console.WriteLine(sum);
Console.WriteLine(ur.ElapsedMilliseconds < 5000);`,
        noter: [
          ["using System.Diagnostics;", "Stopwatch bor i dette namespace. Linjen skal stå øverst i filen."],
          ["Stopwatch.StartNew()", "Lav et stopur, og start det."],
          ["ur.ElapsedMilliseconds", "Hvor mange millisekunder er der gået?"],
          ["long", "En heltalstype til **meget store** tal. En `int` stopper ved ca. 2 milliarder."]
        ],
        output: "499999500000\nTrue",
        md2: "Normalt skriver man tiden ud: `Console.WriteLine($\"{ur.ElapsedMilliseconds} ms\");`. Her er den byttet ud med et ja/nej, fordi tiden er forskellig fra computer til computer." },
      { t: "laes", h: "Proces og tråd",
        md: "To ord, du skal kunne skelne:\n\n- En **proces** er et kørende program. Den har sin **egen hukommelse**. Åbner du Visual Studio og Chrome, har du to processer.\n- En **tråd** er en **udførelsesvej inde i en proces** — en \"arbejder\", der udfører kode linje for linje. Alle tråde i samme proces **deler hukommelsen**.\n\nEt program starter med **én** tråd: **hovedtråden**, der kører `Main`. Men det kan starte flere, som arbejder samtidig.\n\nSammenligning: processen er et køkken, og trådene er kokkene i det. Flere kokke kan lave flere retter på samme tid — men de deler de samme gryder." },
      { t: "valg", q: "Hvad er forskellen på en proces og en tråd?",
        svar: ["En proces er et kørende program med egen hukommelse. En tråd er en udførelsesvej inde i processen, og trådene deler processens hukommelse.", "Det er to ord for det samme", "En tråd er et program, og en proces er en linje kode", "En proces kan kun have én tråd"],
        ret: 0, fordi: "Processen er rammen med hukommelsen. Trådene er arbejderne indeni — og fordi de deler hukommelse, kan de komme til at gå i vejen for hinanden (lektion 5)." },
      { t: "laes", h: "Hvorfor flere tråde?",
        md: "Der er to helt forskellige grunde — og det er vigtigt at holde dem adskilt:",
        noter: [
          ["1. Regnekraft", "Din computer har flere **CPU-kerner**. Med flere tråde kan tungt regnearbejde deles ud, så det går hurtigere. *Flere kokke hakker grøntsager.*"],
          ["2. Ventetid", "Mens programmet **venter** på en database eller et netværk, kan det lave noget andet i stedet for at stå stille. *Kokken sætter vandet over og hakker løg, mens det koger.*"]
        ],
        md2: "På en webserver er det næsten altid **nummer 2**, det handler om. Det er det, `async` og `await` løser (lektion 4)." },
      { t: "forudsig",
        kode: R`Console.WriteLine(Environment.ProcessorCount > 0);
Console.WriteLine(Thread.CurrentThread.ManagedThreadId > 0);
Console.WriteLine("Hovedtråden kører");`,
        output: "True\nTrue\nHovedtråden kører",
        fordi: "`Environment.ProcessorCount` er antallet af kerner i din computer, og hver tråd har et nummer. Begge er større end 0 på enhver computer. Prøv selv at skrive de rigtige tal ud i næste trin." },
      { t: "valg", q: "En webshop skal hente en ordre fra databasen. Det tager 200 millisekunder, og imens laver serveren ingenting. Hvilket problem er det?",
        svar: ["Ventetid — tråden blokerer, mens den venter", "Mangel på regnekraft", "En syntaksfejl", "For lidt hukommelse"],
        ret: 0, fordi: "Der regnes ikke på noget. Tråden står bare og venter på svar. Den slags ventetid løses med `async`/`await`, ikke med flere kerner." },
      { t: "ide", h: "Mål din egen computer",
        md: "Lav et Console-projekt, `Maaling`. Programmet viser, hvor mange kerner du har, og måler en langsom løkke.",
        kode: R`using System.Diagnostics;

Console.WriteLine($"Kerner: {Environment.ProcessorCount}");
Console.WriteLine($"Hovedtrådens nummer: {Thread.CurrentThread.ManagedThreadId}");

Stopwatch ur = Stopwatch.StartNew();
double resultat = 0;
for (int i = 1; i < 50000000; i++)
{
    resultat += Math.Sqrt(i);
}
ur.Stop();

Console.WriteLine($"Resultat: {resultat:F0}");
Console.WriteLine($"Tid: {ur.ElapsedMilliseconds} ms");`,
        win: ["Kør med **Ctrl + F5**, og notér tiden.", "Skift **Debug** til **Release** i rullelisten øverst, og kør igen. Release-udgaven er optimeret og typisk hurtigere."],
        mac: ["Kør med den **grønne pil ▶**, og notér tiden.", "Skift **Debug** til **Release** i konfigurations-listen øverst ved Kør-knappen, og kør igen. Release-udgaven er optimeret og typisk hurtigere."] },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad vil det sige, at kode er synkron og blokerer — og hvorfor er det et problem?",
        svar: "Synkron kode udføres **én linje ad gangen**, og hver linje **venter** på, at den forrige er færdig. Er en linje langsom — fx et kald til en database eller internettet — står tråden stille imens: den **blokerer**. Det er et problem, fordi programmet ikke kan lave andet i ventetiden: et vindue fryser, og en webserver kan ikke betjene andre brugere med den tråd.",
        noegle: ["én linje ad gangen", "venter", "blokerer", "fryser", "webserver"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m08l2", titel: "Thread: start din egen tråd", min: 14,
    ord: [
      ["Thread", "Klassen, der repræsenterer en tråd. Man giver den en metode, den skal køre."],
      ["Start", "Sætter tråden i gang. Hovedtråden fortsætter med det samme uden at vente."],
      ["Join", "Får den tråd, der kalder, til at vente, indtil den anden tråd er færdig."],
      ["Samtidighed (concurrency)", "At flere ting er i gang i samme tidsrum."],
      ["Ikke-deterministisk", "Resultatet eller rækkefølgen kan være forskellig fra kørsel til kørsel."]
    ],
    trin: [
      { t: "laes", h: "En tråd mere",
        md: "Klassen `Thread` laver en ny tråd. Du giver den **en metode, den skal køre**, og kalder `Start()`. Så kører metoden på sin egen tråd — **samtidig** med resten af programmet.",
        kode: R`Thread t = new Thread(Arbejd);
t.Start();
t.Join();
Console.WriteLine("Hovedtråden er færdig");

static void Arbejd()
{
    Console.WriteLine("Den nye tråd arbejder");
}`,
        noter: [
          ["new Thread(Arbejd)", "Lav en tråd, der skal køre metoden Arbejd. **Ingen parenteser** efter navnet — du peger på metoden, du kalder den ikke."],
          ["t.Start();", "Sæt tråden i gang. Hovedtråden går straks videre."],
          ["t.Join();", "Hovedtråden **venter her**, til t er færdig."]
        ],
        output: "Den nye tråd arbejder\nHovedtråden er færdig" },
      { t: "laes", h: "Uden Join ved du ikke, hvem der kommer først",
        md: "Fjerner du `Join`, kører de to tråde om kap. Hvem der når at skrive først, **kan skifte fra gang til gang**. Det afhænger af, hvad computeren ellers laver.",
        kode: R`Thread t = new Thread(Arbejd);
t.Start();
Console.WriteLine("Hovedtråden");

static void Arbejd()
{
    Console.WriteLine("Den nye tråd");
}`,
        frag: true,
        md2: "Dette program kan skrive linjerne i **begge** rækkefølger. Kode, hvor resultatet kan variere, kaldes **ikke-deterministisk** — og det er det, der gør tråde svære. Prøv det i næste `ide`-trin." },
      { t: "valg", q: "Hvad gør `t.Join()`?",
        svar: ["Den tråd, der kalder Join, venter, indtil tråden t er færdig", "Den starter tråden t", "Den stopper tråden t med det samme", "Den slår to tråde sammen til én"],
        ret: 0, fordi: "`Join` betyder \"vent på den\". Uden `Join` fortsætter hovedtråden bare — og programmet kan nå at skrive sit resultat, før den anden tråd har lavet sit arbejde." },
      { t: "forudsig",
        kode: R`Thread a = new Thread(SkrivA);
a.Start();
a.Join();

Thread b = new Thread(SkrivB);
b.Start();
b.Join();

Console.WriteLine("Slut");

static void SkrivA() { Console.WriteLine("A"); }
static void SkrivB() { Console.WriteLine("B"); }`,
        output: "A\nB\nSlut",
        fordi: "Her er rækkefølgen sikker: `a` bliver startet og ventet på, **før** `b` overhovedet bliver lavet. Men så kører de heller ikke samtidig — der er ikke vundet noget." },
      { t: "laes", h: "Start alle — vent på alle",
        md: "Vil du have gavn af flere tråde, skal du **starte dem alle først** og **vente på dem bagefter**. Så arbejder de samtidig.",
        kode: R`using System.Diagnostics;

Stopwatch ur = Stopwatch.StartNew();

Thread a = new Thread(Langsom);
Thread b = new Thread(Langsom);
a.Start();
b.Start();
a.Join();
b.Join();

Console.WriteLine(ur.ElapsedMilliseconds < 1800);

static void Langsom()
{
    Thread.Sleep(1000);
}`,
        output: "True",
        md2: "Hver tråd \"arbejder\" i 1 sekund. Efter hinanden ville det tage 2 sekunder. Samtidig tager det ca. 1 — derfor er den samlede tid under 1,8 sekunder." },
      { t: "laes", h: "Send noget med til tråden",
        md: "Skal tråden have en værdi at arbejde med, pakker man kaldet ind i en lille pil-funktion — et **lambda-udtryk**, som du så i modul 6: `() => ...` betyder \"en metode uden parametre, der gør dette\".",
        kode: R`Thread t = new Thread(() => Hils("Peter"));
t.Start();
t.Join();

static void Hils(string navn)
{
    Console.WriteLine($"Hej {navn} fra en anden tråd");
}`,
        output: "Hej Peter fra en anden tråd" },
      { t: "udfyld", q: "Start tråden, og vent på, at den bliver færdig.",
        kode: R`Thread t = new [[Thread]](Arbejd);
t.[[Start]]();
t.[[Join]]();
Console.WriteLine("Færdig");

static void Arbejd()
{
    Console.WriteLine("Arbejder");
}`,
        output: "Arbejder\nFærdig",
        fordi: "`new Thread(metode)`, så `Start()` og til sidst `Join()` for at vente." },
      { t: "fejl",
        kode: R`Thread t = new Thread(Arbejd());
t.Start();
t.Join();

static void Arbejd()
{
    Console.WriteLine("Arbejder");
}`,
        linje: 1,
        fordi: "`Arbejd()` med parenteser **kalder** metoden med det samme og prøver at give resultatet (ingenting, `void`) til tråden. Tråden skal have **selve metoden**: `new Thread(Arbejd)` uden parenteser. Compileren siger: `cannot convert from 'void' to …`.",
        rettet: R`Thread t = new Thread(Arbejd);
t.Start();
t.Join();

static void Arbejd()
{
    Console.WriteLine("Arbejder");
}` },
      { t: "ide", h: "Se trådene køre om kap",
        md: "Lav et Console-projekt, `Traade`. Kør programmet **flere gange**, og læg mærke til, at A'er og B'er blandes forskelligt hver gang. Det er trådenes natur.",
        kode: R`Thread a = new Thread(() => Skriv("A"));
Thread b = new Thread(() => Skriv("B"));

a.Start();
b.Start();
a.Join();
b.Join();

Console.WriteLine();
Console.WriteLine("Begge tråde er færdige");

static void Skriv(string tegn)
{
    for (int i = 0; i < 20; i++)
    {
        Console.Write(tegn);
        Thread.Sleep(10);
    }
}`,
        md2: "Fjern de to `Join`-linjer, og kør igen. Nu kommer `Begge tråde er færdige` **før** de fleste af bogstaverne (måske når et `A` eller `B` at komme først) — hovedtråden ventede ikke." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad gør `Start()` og `Join()` på en tråd?",
        svar: "`Start()` **sætter tråden i gang**: dens metode begynder at køre samtidig med resten af programmet, og den tråd, der kaldte `Start`, fortsætter med det samme. `Join()` får den kaldende tråd til at **vente**, indtil den anden tråd er **færdig**. Uden `Join` ved man ikke, i hvilken rækkefølge tingene sker.",
        noegle: ["sætter i gang", "samtidig", "vente", "færdig", "rækkefølge"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m08l3", titel: "Task: den moderne måde", min: 15,
    ord: [
      ["Task", "Et objekt, der repræsenterer et stykke arbejde, som er i gang eller bliver færdigt senere."],
      ["Task<T>", "En Task, der giver et resultat af typen T, når den er færdig."],
      ["Task.Run", "Sender et stykke arbejde af sted på en tråd fra trådpuljen og giver en Task tilbage."],
      ["Trådpulje (thread pool)", "Et lager af færdige tråde, som .NET genbruger, så der ikke skal oprettes nye hele tiden."],
      ["Task.WhenAll", "Laver én Task, der er færdig, når alle de givne Tasks er færdige."],
      ["Result", "Egenskab på Task<T>, der giver resultatet — og blokerer, til det er klar."]
    ],
    trin: [
      { t: "laes", h: "Fra Thread til Task",
        md: "At oprette tråde i hånden er dyrt og besværligt. I moderne C# bruger man næsten altid en **Task** i stedet.\n\nEn `Task` er et **løfte om et stykke arbejde**: \"dette er sat i gang og bliver færdigt på et tidspunkt\". Du bestemmer ikke selv, hvilken tråd der gør det — .NET tager en ledig fra sin **trådpulje**, et lager af tråde, der genbruges.",
        kode: R`Task t = Task.Run(() => Console.WriteLine("Arbejder i baggrunden"));
t.Wait();
Console.WriteLine("Færdig");`,
        noter: [
          ["Task.Run(() => …)", "Send dette arbejde af sted. Du får en Task tilbage med det samme."],
          ["t.Wait();", "Vent på, at opgaven er færdig. Svarer til Join. (Der findes en bedre måde — næste lektion.)"]
        ],
        output: "Arbejder i baggrunden\nFærdig" },
      { t: "laes", h: "En Task med et resultat",
        md: "Den store fordel: en Task kan **give et resultat tilbage**. Typen skrives i spidse parenteser — generics fra modul 6. `Task<int>` er \"et løfte om en int\".",
        kode: R`Task<int> t = Task.Run(() => Beregn(6, 7));
int svar = t.Result;
Console.WriteLine(svar);

static int Beregn(int a, int b)
{
    Thread.Sleep(200);
    return a * b;
}`,
        noter: [
          ["Task<int>", "En opgave, der engang giver en int."],
          ["t.Result", "Hent resultatet. **Blokerer**, indtil det er klar."]
        ],
        output: "42" },
      { t: "valg", q: "Hvad er en `Task<string>`?",
        svar: ["Et løfte om en string, som bliver klar, når arbejdet er færdigt", "En liste af strings", "En tråd, der hedder string", "En metode, der returnerer void"],
        ret: 0, fordi: "`Task<T>` repræsenterer arbejde, der er i gang, og som ender med en værdi af typen T. Du møder `Task<IActionResult>`, `Task<List<Kunde>>` og `Task<int>` konstant i web-kode." },
      { t: "laes", h: "Mange opgaver på én gang",
        md: "Start flere Tasks, og vent på dem alle med `Task.WhenAll`. De kører samtidig, så den samlede tid er tiden for **den langsomste** — ikke summen.",
        kode: R`using System.Diagnostics;

Stopwatch ur = Stopwatch.StartNew();

Task<int> a = Task.Run(() => Langsom(10));
Task<int> b = Task.Run(() => Langsom(20));
Task<int> c = Task.Run(() => Langsom(30));

Task.WhenAll(a, b, c).Wait();

Console.WriteLine(a.Result + b.Result + c.Result);
Console.WriteLine(ur.ElapsedMilliseconds < 2500);

static int Langsom(int tal)
{
    Thread.Sleep(1000);
    return tal;
}`,
        output: "60\nTrue",
        md2: "Tre opgaver à 1 sekund. Efter hinanden: 3 sekunder. Samtidig: ca. 1." },
      { t: "forudsig",
        kode: R`Task<int> a = Task.Run(() => 5 * 5);
Task<int> b = Task.Run(() => 10 + 10);

Task.WhenAll(a, b).Wait();
Console.WriteLine(a.Result);
Console.WriteLine(b.Result);
Console.WriteLine(a.Result + b.Result);`,
        output: "25\n20\n45",
        fordi: "Opgaverne kører måske i forskellig rækkefølge — men **udskrifterne** står i hovedtråden, efter at begge er færdige. Derfor er rækkefølgen på skærmen fast." },
      { t: "udfyld", q: "Sæt en beregning i gang som en Task, og hent resultatet.",
        kode: R`Task<[[int]]> t = Task.[[Run]](() => 3 + 4);
Console.WriteLine(t.[[Result]]);`,
        output: "7",
        fordi: "Beregningen giver en int, så typen er `Task<int>`. `Task.Run` starter den, og `Result` henter svaret." },
      { t: "laes", h: "Thread eller Task?",
        md: "Til eksamen kan du blive spurgt om forskellen:",
        noter: [
          ["Thread", "En **rigtig tråd**, du selv opretter og styrer. Dyr at lave. Kan ikke uden videre give et resultat tilbage."],
          ["Task", "Et **stykke arbejde**. .NET finder selv en tråd fra trådpuljen. Kan give et resultat (`Task<T>`), kan kombineres (`WhenAll`), og virker sammen med `async`/`await`."]
        ],
        md2: "Svaret er næsten altid: **brug Task**. `Thread` er det gamle værktøj, som du skal kende, fordi det forklarer, hvad der sker nedenunder." },
      { t: "skriv", q: "Start en Task med `Task.Run`, der beregner `100 / 4`. Gem den i en `Task<int>`, der hedder `t`, og skriv resultatet ud med `t.Result`.",
        tjek: [
          [/(Task<int>|var )t=Task\.Run\(\(\)=>100\/4\);/, "Start opgaven: `Task<int> t = Task.Run(() => 100 / 4);`"],
          ["Console.WriteLine(t.Result);", "Skriv resultatet ud: `Console.WriteLine(t.Result);`"]
        ],
        loesning: R`Task<int> t = Task.Run(() => 100 / 4);
Console.WriteLine(t.Result);`,
        output: "25" },
      { t: "ide", h: "Tre downloads på én gang",
        md: "Lav et Console-projekt, `Opgaver`. Programmet leger, at det henter tre filer, der hver tager et stykke tid. Kør det, og se, at den samlede tid er ca. 3 sekunder — ikke 6.",
        kode: R`using System.Diagnostics;

Stopwatch ur = Stopwatch.StartNew();

Task<string> a = Task.Run(() => Hent("billede.png", 1000));
Task<string> b = Task.Run(() => Hent("video.mp4", 3000));
Task<string> c = Task.Run(() => Hent("tekst.txt", 2000));

Task.WhenAll(a, b, c).Wait();

Console.WriteLine(a.Result);
Console.WriteLine(b.Result);
Console.WriteLine(c.Result);
Console.WriteLine($"Samlet tid: {ur.ElapsedMilliseconds} ms");

static string Hent(string fil, int millisekunder)
{
    Thread.Sleep(millisekunder);
    return $"{fil} hentet på {millisekunder} ms";
}`,
        md2: "Lav programmet om, så de tre kald sker **efter hinanden** uden `Task.Run`: `string a = Hent(\"billede.png\", 1000);` osv. Mål forskellen." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er en Task, og hvordan adskiller den sig fra en Thread?",
        svar: "En `Task` repræsenterer **et stykke arbejde, der bliver færdigt senere** — et løfte. En `Task<T>` giver et **resultat** af typen T. Jeg starter den med `Task.Run`, og .NET finder selv en tråd fra **trådpuljen**. En `Thread` er en konkret tråd, jeg selv opretter og styrer — det er dyrere, og den kan ikke lige så let give et resultat tilbage. Tasks kan kombineres med `WhenAll` og bruges sammen med `async` og `await`.",
        noegle: ["arbejde", "senere", "resultat", "trådpulje", "await"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m08l4", titel: "async og await", min: 20,
    ord: [
      ["Asynkron", "Kode, der kan sætte noget langsomt i gang og fortsætte med andet, mens den venter på svaret."],
      ["await", "\"Vent på denne Task uden at blokere tråden\". Metoden holder pause, og tråden er fri til andet imens."],
      ["async", "Markerer en metode, der indeholder await. Den returnerer en Task."],
      ["async Task", "Returtypen for en asynkron metode uden resultat."],
      ["async Task<T>", "Returtypen for en asynkron metode, der giver en værdi af typen T."],
      ["Task.Delay", "En asynkron pause, der ikke blokerer tråden — modsat Thread.Sleep."],
      ["Async-suffiks", "Skikken med, at asynkrone metoders navne slutter på Async: ToListAsync, SaveChangesAsync."]
    ],
    trin: [
      { t: "laes", h: "Tjeneren, der ikke står og venter",
        md: "I forrige lektion ventede du med `.Wait()` og `.Result`. De **blokerer**: tråden står stille, til opgaven er færdig. Så er der ikke vundet meget.\n\nSammenlign med en tjener på en restaurant:\n\n- Den **synkrone** tjener tager imod en bestilling, går ud i køkkenet og **står og venter** ved komfuret, til maden er klar. Imens får ingen andre gæster hjælp.\n- Den **asynkrone** tjener afleverer bestillingen og går ud og **betjener andre borde**. Når maden er klar, henter han den.\n\nTjeneren er **tråden**. `await` er det, der lader tjeneren gå videre i stedet for at stå og glo." },
      { t: "laes", h: "De to ord",
        md: "`await` betyder: **\"vent på denne Task — men giv tråden fri imens\"**. Når opgaven er færdig, fortsætter metoden på næste linje, og du får resultatet direkte.\n\nEn metode, der bruger `await`, skal mærkes med `async` og returnere en `Task`.",
        kode: R`Console.WriteLine("Bestiller");
int pris = await HentPrisAsync();
Console.WriteLine($"Prisen er {pris}");

static async Task<int> HentPrisAsync()
{
    await Task.Delay(500);
    return 45;
}`,
        noter: [
          ["static async Task<int>", "En asynkron metode, der engang giver en int."],
          ["await Task.Delay(500);", "En pause på et halvt sekund, **uden** at tråden blokerer. (Thread.Sleep ville blokere.)"],
          ["return 45;", "Du returnerer bare værdien. `async` pakker den selv ind i en Task."],
          ["int pris = await HentPrisAsync();", "`await` pakker Task'en **ud**: du får en int, ikke en Task<int>."]
        ],
        output: "Bestiller\nPrisen er 45",
        md2: "Navnet slutter på **Async**. Det er en fast skik: `ToListAsync`, `SaveChangesAsync`, `GetStringAsync`." },
      { t: "laes", h: "De tre returtyper",
        md: "En asynkron metode returnerer altid en Task. Sammenlign med de almindelige metoder, du kender:",
        noter: [
          ["void Gem()", "→ `async Task GemAsync()`  — gør noget, giver intet tilbage."],
          ["int Hent()", "→ `async Task<int> HentAsync()`  — giver en int."],
          ["List<Kunde> HentAlle()", "→ `async Task<List<Kunde>> HentAlleAsync()`"]
        ],
        md2: "Undgå `async void`. Den kan man ikke vente på, og fejl i den forsvinder. Brug altid `async Task`." },
      { t: "udfyld", q: "Gør metoden asynkron, og vent på den.",
        kode: R`string navn = [[await]] HentNavnAsync();
Console.WriteLine(navn);

static [[async]] Task<[[string]]> HentNavnAsync()
{
    await Task.Delay(100);
    return "Peter";
}`,
        output: "Peter",
        fordi: "`await` foran kaldet, `async` foran metoden, og returtypen er `Task<string>`, fordi der returneres en tekst." },
      { t: "fejl",
        q: "Compileren melder fejl på linje 3: `The 'await' operator can only be used within an async method`. Linje 3 skal blive stående. Klik på den linje, der skal rettes.",
        kode: R`static Task<int> HentAlderAsync()
{
    await Task.Delay(100);
    return 25;
}

Console.WriteLine(await HentAlderAsync());`,
        linje: 1,
        fordi: "Metoden bruger `await`, men er ikke mærket med `async`. Compileren siger: `The 'await' operator can only be used within an async method` og peger på linjen med `await` — men rettelsen skal laves i metodens signatur.",
        rettet: R`static async Task<int> HentAlderAsync()
{
    await Task.Delay(100);
    return 25;
}

Console.WriteLine(await HentAlderAsync());` },
      { t: "forudsig",
        kode: R`Console.WriteLine("1");
await VentAsync();
Console.WriteLine("4");

static async Task VentAsync()
{
    Console.WriteLine("2");
    await Task.Delay(200);
    Console.WriteLine("3");
}`,
        output: "1\n2\n3\n4",
        fordi: "Med `await` ser koden ud — og opfører sig — som almindelig kode: oppefra og ned. Det er hele pointen. Forskellen er usynlig: under pausen er tråden **fri**, ikke blokeret." },
      { t: "laes", h: "Glemmer man await …",
        md: "Kalder du en asynkron metode **uden** `await`, bliver den sat i gang — men din kode **venter ikke** på den. Du får en `Task` i hånden i stedet for resultatet.",
        kode: R`Task<int> opgave = HentAsync();
Console.WriteLine("Jeg venter ikke");
int svar = await opgave;
Console.WriteLine(svar);

static async Task<int> HentAsync()
{
    await Task.Delay(300);
    return 7;
}`,
        output: "Jeg venter ikke\n7",
        md2: "Her er det gjort med vilje: opgaven startes, der laves noget andet, og **så** ventes der. Men glemmer man `await` ved en fejl — fx foran `SaveChangesAsync()` — bliver data måske aldrig gemt. Compileren advarer med {{en grøn bølgestreg||en bølgestreg, der ikke er rød}}: *\"this call is not awaited\"*." },
      { t: "laes", h: "Flere ting samtidig med await",
        md: "Vil du lave flere langsomme ting **på samme tid**, så start dem alle først, og `await` dem bagefter med `Task.WhenAll`.",
        kode: R`using System.Diagnostics;

Stopwatch ur = Stopwatch.StartNew();

Task<int> a = HentAsync(1);
Task<int> b = HentAsync(2);
Task<int> c = HentAsync(3);

int[] svar = await Task.WhenAll(a, b, c);

Console.WriteLine(svar.Sum());
Console.WriteLine(ur.ElapsedMilliseconds < 2500);

static async Task<int> HentAsync(int tal)
{
    await Task.Delay(1000);
    return tal * 10;
}`,
        output: "60\nTrue",
        md2: "Tre kald à 1 sekund tager ca. 1 sekund i alt. Havde du skrevet `await` foran hvert kald for sig, havde det taget 3 — så venter man på det første, før det næste overhovedet starter." },
      { t: "valg", q: "Hvad sker der med tråden, mens en metode står ved `await _db.Kunder.ToListAsync()` og venter på databasen?",
        svar: ["Tråden er fri og kan lave andet arbejde — fx betjene en anden bruger", "Tråden står stille og blokerer", "Tråden bliver slettet", "Hele programmet holder pause"],
        ret: 0, fordi: "Det er præcis det, `await` er til. På en webserver betyder det, at et lille antal tråde kan betjene rigtig mange brugere, fordi ingen af dem står og venter på databasen." },
      { t: "laes", h: "Async hele vejen",
        md: "En metode, der vil `await` noget, skal selv være `async`. Og den, der kalder **den**, skal også. Asynkroniteten **breder sig opad** — helt op til toppen.\n\nI et konsolprogram er toppen `Main`. Med den korte skrivemåde kan du bare bruge `await` direkte. Med skelettet ser det sådan ud:",
        kode: R`class Program
{
    static async Task Main(string[] args)
    {
        string tekst = await HentAsync();
        Console.WriteLine(tekst);
    }

    static async Task<string> HentAsync()
    {
        await Task.Delay(100);
        return "Data hentet";
    }
}`,
        output: "Data hentet",
        md2: "`static async Task Main` i stedet for `static void Main`." },
      { t: "laes", h: "Sådan ser det ud i dit web-projekt",
        md: "Her er en metode, som Visual Studio selv laver for dig, når du bygger en webside til en database (modul 17). Du kan nu læse hvert ord:",
        kode: R`public async Task<IActionResult> Index()
{
    List<Kunde> kunder = await _context.Kunder.ToListAsync();
    return View(kunder);
}`,
        frag: true,
        noter: [
          ["async Task<IActionResult>", "En asynkron metode, der engang giver et `IActionResult` — svaret til browseren."],
          ["await … ToListAsync()", "Hent alle kunder fra databasen. Mens databasen arbejder, er tråden fri."],
          ["return View(kunder);", "Når listen er kommet, sendes den til siden."]
        ],
        md2: "Det er **hele grunden** til, at du skal kunne det her: næsten al kode, der taler med en database eller et netværk i ASP.NET Core, er asynkron." },
      { t: "skriv", q: "Skriv en asynkron metode, der hedder `HentTalAsync`. Den skal vente 100 millisekunder med `await Task.Delay(100);` og derefter returnere tallet `42`.",
        foer: R`int tal = await HentTalAsync();
Console.WriteLine(tal);`,
        tjek: [
          [/static async Task<int>HentTalAsync\(\)/, "Signaturen: `static async Task<int> HentTalAsync()`"],
          ["await Task.Delay(100);", "Vent: `await Task.Delay(100);`"],
          ["return 42;", "Returnér 42"],
          ["Thread.Sleep", "Brug `Task.Delay` — `Thread.Sleep` blokerer tråden", "ikke"]
        ],
        loesning: R`static async Task<int> HentTalAsync()
{
    await Task.Delay(100);
    return 42;
}`,
        output: "42" },
      { t: "ide", h: "Hent en rigtig webside",
        md: "Lav et Console-projekt, `HentSide`. Nu bruger du `await` på noget, der **virkelig** er langsomt: at hente en side fra internettet. `HttpClient` er .NET's klasse til det.",
        kode: R`using System.Diagnostics;

HttpClient klient = new HttpClient();
Stopwatch ur = Stopwatch.StartNew();

string html = await klient.GetStringAsync("https://example.com");

Console.WriteLine($"Hentede {html.Length} tegn på {ur.ElapsedMilliseconds} ms");
Console.WriteLine(html.Substring(0, 60));`,
        md2: "`GetStringAsync` returnerer en `Task<string>`. Prøv at fjerne `await` — så klager compileren over, at den ikke kan lægge en `Task<string>` i en `string`: `Cannot implicitly convert type 'System.Threading.Tasks.Task<string>' to 'string'`. Du har fået løftet, ikke teksten." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad gør `async` og `await`, og hvorfor bruger man dem i en webapplikation?",
        svar: "`await` venter på en `Task` **uden at blokere tråden**: metoden holder pause, tråden bliver fri til andet arbejde, og når opgaven er færdig, fortsætter metoden med resultatet. `async` markerer en metode, der bruger `await`; den returnerer en `Task` eller `Task<T>`. I en webapplikation bruger man det ved alt, der er langsomt — især **databasekald** og netværk — så serverens tråde ikke står og venter, men kan **betjene andre brugere** imens. Det giver en server, der kan klare flere samtidige brugere.",
        noegle: ["uden at blokere", "tråden fri", "Task", "database", "andre brugere"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m08l5", titel: "Når tråde deler data: race conditions og lock", min: 15,
    ord: [
      ["Delt tilstand", "Data, som flere tråde læser og ændrer på samme tid."],
      ["Race condition", "En fejl, hvor resultatet afhænger af, hvilken tråd der tilfældigvis kommer først."],
      ["Kritisk sektion", "Et stykke kode, som kun én tråd må udføre ad gangen."],
      ["lock", "Låser en kritisk sektion, så kun én tråd kan være i den ad gangen."],
      ["Trådsynkronisering", "Fællesnavn for teknikker, der koordinerer tråde, så de ikke ødelægger hinandens data."],
      ["Deadlock", "To tråde venter på hinanden for evigt, fordi de hver holder en lås, den anden skal bruge."],
      ["Trådsikker (thread-safe)", "Kode, der virker korrekt, selv når flere tråde bruger den samtidig."]
    ],
    trin: [
      { t: "laes", h: "To kokke og én gryde",
        md: "Tråde i samme proces **deler hukommelsen**. Det er praktisk — og farligt. Når to tråde ændrer **den samme variabel** samtidig, kan de overskrive hinandens arbejde.\n\nLinjen `taeller++` ligner én ting, men er i virkeligheden **tre**: læs værdien, læg 1 til, skriv den tilbage. Her er, hvad der kan ske med to tråde — trin for trin:\n\n1. Tråd A læser 5.\n2. Tråd B læser 5.\n3. Tråd A skriver 6.\n4. Tråd B skriver 6.\n\nDer blev talt op **to** gange, men tælleren steg kun med **én**. Det hedder en **race condition**: resultatet afhænger af, hvem der tilfældigvis kommer først." },
      { t: "laes", h: "Se det gå galt",
        md: "To opgaver tæller hver 100.000 op på den samme tæller. Svaret burde være 200.000.",
        kode: R`int taeller = 0;

Task a = Task.Run(() => { for (int i = 0; i < 100000; i++) taeller++; });
Task b = Task.Run(() => { for (int i = 0; i < 100000; i++) taeller++; });

await Task.WhenAll(a, b);
Console.WriteLine(taeller);`,
        frag: true,
        md2: "Kører du det, får du et **tilfældigt tal under 200.000** — fx 131.482 — og et nyt hver gang. En del af optællingerne er gået tabt. Det er det lumske ved race conditions: programmet oversættes fint og virker måske hver gang, du selv tester det." },
      { t: "valg", q: "Hvorfor giver to tråde, der hver kører `taeller++` 100.000 gange, ikke altid 200.000?",
        svar: ["Fordi taeller++ er tre trin (læs, læg til, skriv), og trådene kan komme ind imellem hinandens trin", "Fordi en int ikke kan indeholde så stort et tal", "Fordi Task.Run kun kører én af opgaverne", "Fordi compileren fjerner halvdelen af løkken"],
        ret: 0, fordi: "Begge tråde kan nå at læse den samme værdi, før den anden har skrevet sin nye værdi tilbage. Så går en optælling tabt." },
      { t: "laes", h: "lock: én ad gangen",
        md: "Løsningen er at gøre de tre trin til **én udelelig handling**. Med `lock` siger du: \"kun **én tråd ad gangen** må være i denne blok\". Koden i blokken kaldes en **kritisk sektion**.",
        kode: R`int taeller = 0;
object laas = new object();

Task a = Task.Run(() =>
{
    for (int i = 0; i < 100000; i++)
    {
        lock (laas) { taeller++; }
    }
});
Task b = Task.Run(() =>
{
    for (int i = 0; i < 100000; i++)
    {
        lock (laas) { taeller++; }
    }
});

await Task.WhenAll(a, b);
Console.WriteLine(taeller);`,
        noter: [
          ["object laas = new object();", "Låsen: et helt almindeligt objekt, som trådene skal \"holde\" for at komme ind."],
          ["lock (laas) { … }", "Tag låsen, udfør blokken, giv låsen fri. Andre tråde venter udenfor imens."]
        ],
        output: "200000",
        md2: "Nu er svaret altid 200.000. At koordinere tråde på den måde hedder **trådsynkronisering**." },
      { t: "udfyld", q: "Beskyt saldoen, så kun én tråd ad gangen kan ændre den.",
        kode: R`Konto k = new Konto();
Task a = Task.Run(() => { for (int i = 0; i < 50000; i++) k.Indsaet(1); });
Task b = Task.Run(() => { for (int i = 0; i < 50000; i++) k.Indsaet(1); });
await Task.WhenAll(a, b);
Console.WriteLine(k.Saldo);

class Konto
{
    private object laas = new [[object|Object]]();
    public int Saldo { get; private set; }

    public void Indsaet(int beloeb)
    {
        [[lock]] (laas)
        {
            Saldo += beloeb;
        }
    }
}`,
        output: "100000",
        fordi: "Låsen er et privat objekt i klassen. `lock (laas)` sørger for, at to tråde aldrig ændrer saldoen på samme tid. Klassen er nu **trådsikker**." },
      { t: "laes", h: "Lås så lidt som muligt",
        md: "En lås gør koden **korrekt** — men også **langsommere**, fordi trådene må vente på hinanden. Låser du alt, kører programmet i praksis på én tråd igen.\n\nTommelfingerregler:\n\n- Lås kun om det, der **rører de delte data** — ikke om langsomme ting.\n- Den bedste løsning er at **undgå delt data** helt: lad hver opgave regne sit eget resultat ud og **returnere** det. Læg resultaterne sammen bagefter.",
        kode: R`Task<int> a = Task.Run(() => TaelOp(100000));
Task<int> b = Task.Run(() => TaelOp(100000));

int[] dele = await Task.WhenAll(a, b);
Console.WriteLine(dele[0] + dele[1]);

static int TaelOp(int antal)
{
    int lokal = 0;
    for (int i = 0; i < antal; i++) lokal++;
    return lokal;
}`,
        output: "200000",
        md2: "Ingen lås — og alligevel korrekt. Hver opgave har sin **egen** lokale variabel, og en lokal variabel deles ikke mellem tråde." },
      { t: "laes", h: "Deadlock: to, der venter på hinanden",
        md: "Med flere låse kan man komme til at lave en **deadlock**:\n\n- Tråd A har lås 1 og venter på lås 2.\n- Tråd B har lås 2 og venter på lås 1.\n\nIngen af dem giver slip, så begge venter **for evigt**. Programmet hænger uden fejlbesked.\n\nDet er samme situation som to biler, der mødes på en smal bro, hvor ingen af dem vil bakke. Man undgår det ved altid at tage låsene **i samme rækkefølge** — og ved at holde antallet af låse nede." },
      { t: "valg", q: "Hvad er en deadlock?",
        svar: ["To tråde venter på hinandens låse, så ingen af dem nogensinde kommer videre", "En tråd, der er færdig med sit arbejde", "En lås, der er blevet slettet", "En fejl, compileren finder"],
        ret: 0, fordi: "Hver tråd holder noget, den anden skal bruge, og ingen slipper. Compileren opdager det ikke — programmet går bare i stå." },
      { t: "laes", h: "Hvad betyder det for dit web-projekt?",
        md: "På en webserver bliver **hver forespørgsel behandlet på sin egen tråd**. To brugere kan altså ramme din kode **på samme tid**.\n\nDet meste klarer ASP.NET Core og databasen for dig. Men husk én ting: **static felter og andet, der deles mellem alle brugere, er delt tilstand**. En `static List<Kunde>`, som to brugere tilføjer til samtidig, kan gå i stykker præcis som tælleren.\n\nDerfor gemmer man data i en **database** (som selv håndterer samtidighed), og derfor skal man tænke sig om, før man registrerer noget som *singleton* — det møder du i modul 19." },
      { t: "ide", h: "Fremkald en race condition",
        md: "Lav et Console-projekt, `Race`. Kør det **flere gange**, og se, at det første tal er forskelligt hver gang, mens det andet altid er 200.000.",
        kode: R`int usikker = 0;
int sikker = 0;
object laas = new object();

Task[] opgaver = new Task[2];
for (int n = 0; n < 2; n++)
{
    opgaver[n] = Task.Run(() =>
    {
        for (int i = 0; i < 100000; i++)
        {
            usikker++;
            lock (laas) { sikker++; }
        }
    });
}

await Task.WhenAll(opgaver);
Console.WriteLine($"Uden lås: {usikker}");
Console.WriteLine($"Med lås:  {sikker}");`,
        md2: "Får du 200.000 i begge, så prøv igen eller sæt antallet op til en million. En race condition viser sig ikke hver gang — det er netop det, der gør den farlig." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er en race condition, og hvordan undgår man den?",
        svar: "En race condition opstår, når **flere tråde ændrer de samme data samtidig**, og resultatet afhænger af den tilfældige rækkefølge, de kommer i. Fx er `taeller++` tre trin, og to tråde kan overskrive hinandens resultat. Man undgår det med **trådsynkronisering**, typisk `lock`, så kun **én tråd ad gangen** kan udføre den **kritiske sektion** — eller endnu bedre ved at **undgå delt tilstand**, så hver tråd arbejder på sine egne data og returnerer et resultat.",
        noegle: ["flere tråde", "samme data", "rækkefølge", "lock", "én tråd ad gangen", "delt tilstand"] }
    ] }
  ]
});
})();
