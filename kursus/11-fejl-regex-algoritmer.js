// Modul 11 — Fejlhåndtering, regex, algoritmer og designmønstre. Forudsætter: modul 0–10.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m11", nr: 11, del: "Del 3 · Videregående C#", ikon: "🧰",
  titel: "Fejlhåndtering, regex, algoritmer og designmønstre",
  dag: "Læringsmål · på tværs af kurset",
  intro: "Dette modul samler de læringsmål, som kurset spreder ud over mange dage: **exceptions** (når noget går galt), **debuggeren** som arbejdsredskab, **regulære udtryk** til at kontrollere tekst, klassiske **algoritmer** til søgning og sortering, **designmønstre** og **lagdelt arkitektur**.\n\nAlt sammen er noget, censor kan spørge til ved eksamen — og noget, du får brug for i dit eget projekt.",
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m11l1", titel: "Exceptions: når noget går galt", min: 18,
    ord: [
      ["Exception", "Et objekt, der beskriver en fejl, mens programmet kører. Bliver den ikke fanget, stopper programmet."],
      ["try", "Blok med kode, der måske går galt. Sker der en exception, hopper programmet ud af blokken med det samme."],
      ["catch", "Blok, der fanger en bestemt type exception og bestemmer, hvad der så skal ske."],
      ["finally", "Blok, der altid køres til sidst — både når det gik godt, og når der skete en exception."],
      ["throw", "Kast en exception selv, fx når en metode får en ugyldig værdi."],
      ["FormatException", "Kastes, når en tekst ikke kan laves om til et tal, fx `int.Parse(\"abc\")`."],
      ["Egen exception-klasse", "En klasse, der arver fra `Exception`, så du kan give en bestemt slags fejl sit eget navn."]
    ],
    trin: [
      { t: "laes", h: "Hvad er en exception?",
        md: "Nogle fejl opdager compileren ikke, fordi de først sker, mens programmet **kører**. Et eksempel: brugeren skriver `abc`, hvor der skulle stå et tal.\n\nSå laver C# en **exception** — et objekt, der beskriver fejlen. Hvis ingen tager sig af den, **stopper programmet** med en rød fejlbesked. Du har set det i modul 3 med `IndexOutOfRangeException`.",
        kode: R`string tekst = "abc";
int tal = int.Parse(tekst);
Console.WriteLine("Denne linje bliver aldrig kørt");`,
        noter: [
          ["int.Parse(tekst)", "Kan ikke lave `abc` om til et tal. Den kaster en `FormatException`."],
          ["Console.WriteLine(…)", "Bliver aldrig nået. Programmet stopper på linjen før."]
        ],
        md2: "Exceptions har **navne**, der fortæller, hvad der gik galt: `FormatException` (forkert tekst-format), `DivideByZeroException` (division med 0), `IndexOutOfRangeException` (indeks uden for arrayet), `NullReferenceException` (en variabel er `null`)." },
      { t: "laes", h: "try og catch: fang fejlen",
        md: "Kode, der måske går galt, lægger du i en **`try`**-blok. Lige efter skriver du en **`catch`**-blok, der siger, hvad der skal ske, hvis fejlen sker.\n\nSker der en exception inde i `try`, hopper programmet **med det samme** ned i `catch`. Resten af `try`-blokken springes over. Bagefter fortsætter programmet normalt efter `catch`.",
        kode: R`string tekst = "abc";
try
{
    int tal = int.Parse(tekst);
    Console.WriteLine($"Du skrev {tal}");
}
catch (FormatException)
{
    Console.WriteLine("Det var ikke et tal");
}
Console.WriteLine("Programmet kører videre");`,
        noter: [
          ["try { … }", "Prøv at køre denne kode."],
          ["catch (FormatException)", "Hvis der sker en `FormatException`, så kør denne blok i stedet for at stoppe programmet."],
          ["Programmet kører videre", "Efter `catch` fortsætter programmet, som om intet var hændt."]
        ],
        output: "Det var ikke et tal\nProgrammet kører videre" },
      { t: "forudsig",
        kode: R`string[] input = { "4", "x", "6" };
int sum = 0;
foreach (string s in input)
{
    try
    {
        sum += int.Parse(s);
        Console.WriteLine($"Lagt til: {s}");
    }
    catch (FormatException)
    {
        Console.WriteLine($"Sprunget over: {s}");
    }
}
Console.WriteLine($"Sum: {sum}");`,
        output: "Lagt til: 4\nSprunget over: x\nLagt til: 6\nSum: 10",
        fordi: "`try`/`catch` ligger **inde i** løkken. Når `\"x\"` giver en exception, springes resten af `try` over (der står ikke `Lagt til: x`), men løkken fortsætter med næste tekst." },
      { t: "udfyld", q: "Fang fejlen, så programmet ikke stopper, når teksten ikke er et tal.",
        kode: R`string tekst = "12kr";
[[try]]
{
    int pris = int.Parse(tekst);
    Console.WriteLine(pris);
}
[[catch]] ([[FormatException|Exception]])
{
    Console.WriteLine("Ugyldig pris");
}`,
        output: "Ugyldig pris",
        fordi: "`try` omkring den farlige linje, `catch` med den type exception, der kan ske. `int.Parse` kaster en `FormatException`. `Exception` virker også, fordi den fanger alle typer — men det er bedst at være præcis." },
      { t: "laes", h: "Flere catch-blokke og e.Message",
        md: "Der kan ske **forskellige** fejl i samme `try`. Du kan skrive en `catch` til hver type. C# afprøver dem **oppefra og ned** og vælger den første, der passer.\n\nAlle exceptions **arver** fra klassen `Exception`. Derfor fanger `catch (Exception e)` alt — og den skal stå **sidst**, ellers ville den tage alt, før de præcise blokke fik en chance.\n\nSkriver du et navn efter typen, fx `e`, får du fat i selve exception-objektet. `e.Message` er fejlbeskeden, og `e.GetType().Name` er typens navn.",
        kode: R`int[] tal = { 10, 0 };
try
{
    int resultat = tal[0] / tal[1];
    Console.WriteLine(resultat);
}
catch (DivideByZeroException)
{
    Console.WriteLine("Man kan ikke dividere med 0");
}
catch (Exception e)
{
    Console.WriteLine($"Anden fejl: {e.GetType().Name}");
}`,
        noter: [
          ["catch (DivideByZeroException)", "Den præcise blok. Den passer her, fordi `tal[1]` er 0."],
          ["catch (Exception e)", "Fanger alle andre fejl. `e` er exception-objektet."],
          ["e.GetType().Name", "Navnet på den type exception, der skete, fx `IndexOutOfRangeException`."]
        ],
        output: "Man kan ikke dividere med 0",
        md2: "Teksten i `e.Message` skrives af .NET og er som regel på engelsk. Vis den gerne i en log, men skriv en dansk besked til brugeren." },
      { t: "fejl", q: "Programmet kan ikke oversættes. Klik på den linje, compileren klager over.",
        kode: R`try
{
    int tal = int.Parse("abc");
}
catch (Exception)
{
    Console.WriteLine("Noget gik galt");
}
catch (FormatException)
{
    Console.WriteLine("Ikke et tal");
}`,
        linje: 9,
        fordi: "`catch (Exception)` fanger **alle** exceptions — også `FormatException`. Så kan den næste blok aldrig blive brugt, og compileren siger fejl CS0160: en tidligere catch fanger allerede denne type. Den præcise blok skal stå **først**.",
        rettet: R`try
{
    int tal = int.Parse("abc");
}
catch (FormatException)
{
    Console.WriteLine("Ikke et tal");
}
catch (Exception)
{
    Console.WriteLine("Noget gik galt");
}`,
        output: "Ikke et tal" },
      { t: "laes", h: "finally: kør altid til sidst",
        md: "En **`finally`**-blok står efter `catch`. Den bliver **altid** kørt: når alt gik godt, når en exception blev fanget — og selv når en exception ikke blev fanget.\n\nDen bruges til at rydde op: lukke en fil, lukke en databaseforbindelse, skrive i en log. Det er det samme, som `using` gør for dig med filer (modul 9).",
        kode: R`try
{
    Console.WriteLine("Åbner forbindelsen");
    int x = int.Parse("ups");
    Console.WriteLine("Henter data");
}
catch (FormatException)
{
    Console.WriteLine("Fejl i data");
}
finally
{
    Console.WriteLine("Lukker forbindelsen");
}`,
        output: "Åbner forbindelsen\nFejl i data\nLukker forbindelsen" },
      { t: "spor", h: "Spor: hvor hopper programmet hen?",
        q: "Følg programmet linje for linje, og skriv værdien af `trin` og `tekst`, lige efter at linjen er udført. Linje 6 kaster en exception. Skriv kun de linjer, der faktisk bliver kørt.",
        kode: R`int trin = 0;
string tekst = "start";
try
{
    trin = 1;
    int x = int.Parse("12a");
    trin = 2;
}
catch (FormatException)
{
    tekst = "fejl";
}
finally
{
    trin = trin + 10;
}
Console.WriteLine($"{trin} {tekst}");`,
        kolonner: ["trin", "tekst"],
        raekker: [[1, "=0", "=–"], [2, "=0", "=start"], [5, "1", "start"], [6, "1", "start"], [11, "1", "fejl"], [15, "11", "fejl"]],
        output: "11 fejl",
        fordi: "Linje 6 kaster en `FormatException`. Programmet hopper direkte til `catch` — linje 7 (`trin = 2`) bliver **aldrig** kørt. Derefter kører `finally` altid, så `trin` bliver 1 + 10 = 11." },
      { t: "laes", h: "throw: kast selv en exception",
        md: "Du kan også **selv** kaste en exception med `throw`. Det gør man, når en metode får en værdi, den ikke kan arbejde med. Metoden stopper med det samme, og den, der kaldte metoden, må fange fejlen.\n\nHvorfor ikke bare skrive en besked på skærmen? Fordi metoden ikke ved, **hvad** der skal ske — måske er det en hjemmeside, måske et konsolprogram. Den, der kalder, bestemmer.",
        kode: R`try
{
    SaetAlder(-3);
}
catch (ArgumentException e)
{
    Console.WriteLine($"Fejl: {e.Message}");
}

static void SaetAlder(int alder)
{
    if (alder < 0)
    {
        throw new ArgumentException("Alder kan ikke være negativ");
    }
    Console.WriteLine($"Alder sat til {alder}");
}`,
        noter: [
          ["throw new ArgumentException(…)", "Opret en exception med din egen besked, og kast den. Metoden stopper her."],
          ["ArgumentException", "Den indbyggede type for \"et argument til en metode er ugyldigt\"."],
          ["e.Message", "Den besked, du gav med, da du kastede den."]
        ],
        output: "Fejl: Alder kan ikke være negativ",
        md2: "**Egen exception-klasse:** Vil du give en bestemt fejl sit eget navn, laver du en klasse, der **arver** fra `Exception`, og sender beskeden videre med `base(...)` (modul 5):\n\n`class IkkeNokPengeException : Exception { public IkkeNokPengeException(string besked) : base(besked) { } }`\n\nSå kan den, der kalder, skrive `catch (IkkeNokPengeException)` og fange netop den fejl." },
      { t: "forudsig",
        kode: R`Konto k = new Konto();
try
{
    k.Haev(50);
    k.Haev(80);
    Console.WriteLine("Begge hævninger lykkedes");
}
catch (IkkeNokPengeException e)
{
    Console.WriteLine(e.Message);
}
Console.WriteLine($"Saldo: {k.Saldo}");

class Konto
{
    public decimal Saldo { get; private set; } = 100;

    public void Haev(decimal beloeb)
    {
        if (beloeb > Saldo)
        {
            throw new IkkeNokPengeException($"Kan ikke hæve {beloeb} kr.");
        }
        Saldo -= beloeb;
    }
}

class IkkeNokPengeException : Exception
{
    public IkkeNokPengeException(string besked) : base(besked) { }
}`,
        output: "Kan ikke hæve 80 kr.\nSaldo: 50",
        fordi: "Første hævning lykkes: saldoen går fra 100 til 50. Anden hævning er større end saldoen, så `Haev` kaster vores egen exception, **før** saldoen ændres. `Begge hævninger lykkedes` bliver sprunget over." },
      { t: "skriv", q: "Skriv metoden `static int Divider(int a, int b)`. Er `b` lig med 0, skal den kaste en `ArgumentException` med beskeden `\"b må ikke være 0\"`. Ellers returnerer den `a / b`.",
        foer: R`try
{
    Console.WriteLine(Divider(10, 2));
    Console.WriteLine(Divider(5, 0));
}
catch (ArgumentException e)
{
    Console.WriteLine(e.Message);
}
`,
        tjek: [
          [/static int Divider\(int a,int b\)/, "Metoden hedder `static int Divider(int a, int b)`"],
          [/if\(b==0\)/, "Tjek med `if (b == 0)`"],
          ['throw new ArgumentException("b må ikke være 0");', "Kast `new ArgumentException(\"b må ikke være 0\")` med `throw`"],
          [/return a\/b;/, "Returnér `a / b`"]
        ],
        forkert: [R`static int Divider(int a, int b)
{
    if (b == 0)
    {
        Console.WriteLine("b må ikke være 0");
    }
    return a / b;
}`],
        loesning: R`static int Divider(int a, int b)
{
    if (b == 0)
    {
        throw new ArgumentException("b må ikke være 0");
    }
    return a / b;
}`,
        output: "5\nb må ikke være 0",
        fordi: "`throw` stopper metoden, før divisionen sker. Den, der kalder, fanger fejlen og bestemmer selv, hvad brugeren skal se." },
      { t: "valg", q: "Hvornår skal du **ikke** fange en exception?",
        svar: [
          "Når du ikke kan gøre noget fornuftigt ved den — fx `catch (Exception) { }` med en tom blok, der bare skjuler fejlen",
          "Når brugeren har skrevet noget forkert, og du vil vise en pæn besked",
          "Når du vil lukke en fil i `finally`",
          "Når en metode kaster en `ArgumentException`, du forventer"
        ],
        ret: 0,
        fordi: "En tom `catch` **sluger** fejlen: programmet kører videre med forkerte data, og du aner ikke hvorfor. Fang kun en exception, når du kan gøre noget ved den. Og forventer du forkert input, så undgå exceptionen helt: `int.TryParse(tekst, out int tal)` giver `false` i stedet for at kaste — det er både hurtigere og tydeligere." },
      { t: "ide", h: "Et program, der ikke går ned",
        md: "Lav et Console-projekt, `Division`. Programmet spørger efter to tal og dividerer dem. Skriv koden af, og prøv at få det til at gå galt: skriv bogstaver, og skriv 0 som det andet tal.",
        kode: R`try
{
    Console.Write("Første tal: ");
    int a = int.Parse(Console.ReadLine() ?? "");
    Console.Write("Andet tal: ");
    int b = int.Parse(Console.ReadLine() ?? "");
    Console.WriteLine($"{a} / {b} = {a / b}");
}
catch (FormatException)
{
    Console.WriteLine("Du skal skrive et helt tal.");
}
catch (DivideByZeroException)
{
    Console.WriteLine("Man kan ikke dividere med 0.");
}
finally
{
    Console.WriteLine("Farvel.");
}`,
        md2: "Fjern bagefter `catch (DivideByZeroException)`-blokken, og start med debuggeren ({{**F5**||den **grønne bille** 🐞}}). Skriv 0 som andet tal. Debuggeren stopper på linjen med divisionen og viser, hvilken exception der skete. Sæt blokken ind igen." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er en exception, og hvad gør `try`, `catch` og `finally`?",
        svar: "En **exception** er en fejl, der sker, mens programmet kører, fx når en tekst ikke kan blive til et tal. Bliver den ikke fanget, stopper programmet. Koden, der måske fejler, står i **try**. Sker der en exception, hopper programmet til den **catch**, der passer til typen, og fortsætter derefter. **finally** køres altid til sidst og bruges til oprydning. Med **throw** kan en metode selv kaste en exception, når den får en ugyldig værdi. Man skal kun fange en exception, når man kan gøre noget fornuftigt ved den.",
        noegle: ["kører", "try", "catch", "finally", "throw", "type"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m11l2", titel: "Debugging: find fejlen med værktøjet", min: 20,
    ord: [
      ["Breakpoint", "Et stoppunkt på en linje. Programmet holder pause, før linjen køres."],
      ["Step Over", "Kør én linje. Er der et metodekald på linjen, køres hele metoden uden at stoppe i den."],
      ["Step Into", "Kør én linje — men er der et metodekald, så gå ind i metoden og hold pause på dens første linje."],
      ["Step Out", "Kør resten af den metode, du står i, og hold pause igen, hvor den blev kaldt fra."],
      ["Watch", "Et vindue, hvor du selv skriver variabler eller udtryk, som debuggeren hele tiden viser værdien af."],
      ["Betinget breakpoint", "Et breakpoint, der kun stopper, når en betingelse er sand, fx `i == 500`."],
      ["Call Stack", "Listen over de metoder, der er i gang lige nu: hvem kaldte hvem. I Rider hedder den Frames."]
    ],
    trin: [
      { t: "laes", h: "Debuggeren: de knapper, du allerede kender",
        md: "I modul 1 lærte du debuggeren at kende: et **breakpoint** stopper programmet, **Step Over** kører én linje, og {{**Locals**||**Threads & Variables**}} viser alle variabler lige nu.\n\nI denne lektion lærer du fire værktøjer mere: **Step Into**, **Step Out**, **Watch** og **betingede breakpoints**. Med dem kan du finde fejl i programmer med mange metoder og lange løkker — uden at gætte og uden at holde noget i hovedet.",
        win: [
          "**Breakpoint**: klik i den grå margen til venstre for linjenummeret. Der kommer en rød prik. Klik igen for at fjerne den.",
          "**Start med debugging**: tryk **F5** (eller den grønne ▶-knap).",
          "**Step Over**: **F10**. **Step Into**: **F11**. **Step Out**: **Shift+F11**.",
          "**Stop**: den røde firkant ■ i værktøjslinjen."
        ],
        mac: [
          "**Breakpoint**: klik i margen lige ved siden af linjenummeret. Der kommer en rød prik. Klik igen for at fjerne den.",
          "**Start med debugging**: klik på den **grønne bille** 🐞 øverst til højre.",
          "**Step Over**, **Step Into** og **Step Out** er knapper i Debug-vinduet nederst. Hold musen over en knap for at se dens navn.",
          "**Stop**: den røde firkant ■ i Debug-vinduet."
        ] },
      { t: "ide", h: "Step Into: gå ind i en metode",
        md: "Lav et Console-projekt, `StepInto`, og skriv koden af. Du skal se forskellen på Step Over og Step Into.",
        kode: R`int total = 0;
total = Dobbelt(3);
total = total + Dobbelt(4);
Console.WriteLine(total);

static int Dobbelt(int x)
{
    int resultat = x * 2;
    return resultat;
}`,
        output: "14",
        win: [
          "Sæt et breakpoint på linje 2 (`total = Dobbelt(3);`), og tryk **F5**.",
          "Tryk **F11** (Step Into). Du havner **inde i** `Dobbelt`. Se i **Locals**: nu står `x` og `resultat` der — og `total` er væk, fordi den hører til et andet sted.",
          "Tryk **F10** to gange. Se `resultat` blive 6. Tryk **F10** to gange mere (først til den afsluttende `}`), og du er tilbage på linje 2 — nu med `total` = 6 efter næste tryk.",
          "På linje 3: tryk **F10** (Step Over). Hele `Dobbelt(4)` køres på én gang, og `total` bliver 14."
        ],
        mac: [
          "Sæt et breakpoint på linje 2 (`total = Dobbelt(3);`), og klik på den **grønne bille** 🐞.",
          "Klik på **Step Into**. Du havner **inde i** `Dobbelt`. Se i **Threads & Variables**: nu står `x` og `resultat` der — og `total` er væk, fordi den hører til et andet sted.",
          "Klik **Step Over** to gange. Se `resultat` blive 6. Klik **Step Over** to gange mere (først til den afsluttende `}`), og du er tilbage på linje 2 — nu med `total` = 6 efter næste klik.",
          "På linje 3: klik **Step Over**. Hele `Dobbelt(4)` køres på én gang, og `total` bliver 14."
        ],
        md2: "**Step Over** springer metoden over (den køres stadig). **Step Into** går ind i den. Vil du ud igen uden at gå resten igennem, bruger du **Step Out**." },
      { t: "spor", h: "Spor: det, Step Into viser dig",
        q: "Skriv værdierne lige efter hver linje, som debuggeren ville vise dem, når du bruger **Step Into** hele vejen. `–` betyder, at variablen ikke findes lige der. Inde i metoden findes `total` ikke; uden for metoden findes `x` og `resultat` ikke.",
        kode: R`int total = 0;
total = Dobbelt(3);
total = total + Dobbelt(4);
Console.WriteLine(total);

static int Dobbelt(int x)
{
    int resultat = x * 2;
    return resultat;
}`,
        kolonner: ["total", "x", "resultat"],
        raekker: [[1, "=0", "=–", "=–"], [8, "–", "3", "6"], [2, "6", "–", "–"], [8, "–", "4", "8"], [3, "14", "–", "–"]],
        slut: false,
        output: "14",
        fordi: "Hver gang metoden kaldes, får den sine **egne** variabler `x` og `resultat`. De forsvinder igen, når metoden returnerer. Det er præcis det, du ser i {{Locals||Threads & Variables}}, når du skifter mellem at være inde i og uden for metoden." },
      { t: "valg", q: "Debuggeren holder pause på linjen `int pris = BeregnPris(antal);`. Du er sikker på, at `BeregnPris` virker. Hvilken knap bruger du?",
        svar: ["Step Over — så køres hele metoden, og du holder pause på næste linje", "Step Into — så går du ind i metoden", "Step Out — så hopper du ind i metoden", "Stop — og start forfra"],
        ret: 0,
        fordi: "**Step Over** kører hele metodekaldet og stopper på næste linje. **Step Into** bruger du kun, når du vil se, hvad der sker **inde i** metoden. **Step Out** bruger du, når du allerede er inde i en metode og vil ud igen." },
      { t: "laes", h: "Watch: hold øje med et udtryk",
        md: "{{Locals||Threads & Variables}} viser **alle** variabler. I en stor metode er det mange. I **Watch** skriver du selv de få ting, du vil holde øje med — og du kan skrive **udtryk**, fx `sum / antal` eller `liste.Count`. Debuggeren regner dem ud igen, hver gang programmet holder pause.",
        win: [
          "Start med debugging (**F5**), så programmet holder pause.",
          "Højreklik på en variabel i koden, og vælg **Add Watch**.",
          "Watch-vinduet åbner nederst. Du kan også åbne det med menuen **Debug → Windows → Watch → Watch 1**.",
          "Klik på en tom linje i Watch, og skriv selv et udtryk, fx `sum / antal`."
        ],
        mac: [
          "Start med debugging (den **grønne bille** 🐞), så programmet holder pause.",
          "Højreklik på en variabel i koden, og vælg **Add to Watches**.",
          "Den vises nu øverst i **Threads & Variables** med et brille-ikon.",
          "Du kan også skrive et udtryk, fx `sum / antal`, i feltet øverst i Threads & Variables og tilføje det som watch."
        ] },
      { t: "ide", h: "Brug Watch i en løkke",
        md: "Lav et Console-projekt, `Watch`, og skriv koden af. Programmet beregner et løbende gennemsnit.",
        kode: R`int[] maalinger = { 12, 15, 9, 20, 14 };
int sum = 0;
int antal = 0;

foreach (int m in maalinger)
{
    sum += m;
    antal++;
}

Console.WriteLine($"Gennemsnit: {(double)sum / antal}");`,
        output: "Gennemsnit: 14",
        md2: "1. Sæt et breakpoint på linjen `antal++;`.\n2. Start med debugging. Tilføj tre watches: `m`, `sum` og udtrykket `(double)sum / (antal + 1)`.\n3. Fortsæt til næste stop med {{**F5** (Continue)||knappen **Resume** ▶ i Debug-vinduet}}. Skriv på et papir, hvad de tre watches viser ved hvert stop.\n4. Det sidste gennemsnit, du ser, skal være 14." },
      { t: "laes", h: "Betingede breakpoints",
        md: "Et breakpoint i en løkke stopper **hver** gang. Går løkken 1000 gange, og fejlen sker ved nummer 500, er det for mange klik.\n\nEt **betinget breakpoint** stopper kun, når en betingelse er sand, fx `i == 500` eller `pris < 0`. Betingelsen skrives i almindelig C#.",
        win: [
          "Sæt et almindeligt breakpoint (rød prik).",
          "Højreklik på den røde prik, og vælg **Conditions…**.",
          "Skriv betingelsen, fx `i == 500`, og tryk Enter. Prikken får et lille **+**."
        ],
        mac: [
          "Sæt et almindeligt breakpoint (rød prik).",
          "Højreklik på den røde prik. Der åbner et lille vindue med feltet **Condition**.",
          "Skriv betingelsen, fx `i == 500`, og klik **Done**."
        ] },
      { t: "ide", h: "Stop ved nummer 500",
        md: "Lav et Console-projekt, `Betinget`, og skriv koden af. Uden debugger kan du ikke se, hvad `sum` var, da `i` var 500.",
        kode: R`long sum = 0;
for (int i = 1; i <= 1000; i++)
{
    sum += i;
}
Console.WriteLine(sum);`,
        output: "500500",
        md2: "1. Sæt et breakpoint på linjen `sum += i;`, og gør det betinget med `i == 500`.\n2. Start med debugging. Programmet stopper én gang.\n3. Se i {{Locals||Threads & Variables}}: `i` er 500, og `sum` er 124750 (summen af 1 til 499 — linjen med `i` = 500 er jo ikke kørt endnu).\n4. Tryk Step Over én gang, og se `sum` blive 125250." },
      { t: "laes", h: "Når der sker en exception under debugging",
        md: "Starter du programmet med debuggeren, og der sker en exception, som ingen fanger, så **stopper debuggeren på den linje**, hvor det skete. Den viser typen og beskeden. Programmet er ikke lukket endnu: du kan se alle variabler, som de var, lige da det gik galt.\n\n**Call Stack** viser, hvilke metoder der er i gang: den øverste er den, du står i, og under den står den, der kaldte den — helt ned til `Main`. Så kan du se, **hvordan** programmet kom derhen.",
        win: [
          "Visual Studio viser en gul pil på linjen og en boks (**Exception Helper**) med typen og beskeden.",
          "Call Stack: menuen **Debug → Windows → Call Stack**. Dobbeltklik på en linje for at se koden i den metode."
        ],
        mac: [
          "Rider stopper på linjen og viser exceptionen i Debug-vinduet.",
          "Call Stack hedder **Frames** i Rider: listen til venstre i Debug-vinduet. Klik på en linje for at se koden i den metode."
        ] },
      { t: "fejl", q: "Programmet skal beregne gennemsnittet af de fire point: (8 + 6 + 10 + 4) / 4 = 7. Men det skriver 5. Klik på den linje, der er skyld i det.",
        kode: R`int[] point = { 8, 6, 10, 4 };
int sum = 0;
for (int i = 1; i < point.Length; i++)
{
    sum += point[i];
}
double snit = (double)sum / point.Length;
Console.WriteLine($"Gennemsnit: {snit}");`,
        linje: 3, logisk: true,
        output: "Gennemsnit: 5",
        fordi: "Løkken starter ved `i = 1`, så `point[0]` (tallet 8) kommer aldrig med i summen: 6 + 10 + 4 = 20, og 20 / 4 = 5. Med et breakpoint på `sum += point[i];` ville du se, at `i` aldrig er 0. Et array starter ved indeks **0**.",
        rettet: R`int[] point = { 8, 6, 10, 4 };
int sum = 0;
for (int i = 0; i < point.Length; i++)
{
    sum += point[i];
}
double snit = (double)sum / point.Length;
Console.WriteLine($"Gennemsnit: {snit}");`,
        rettetOutput: "Gennemsnit: 7" },
      { t: "ide", h: "Find fejlen med debuggeren",
        md: "Programmet skal tælle, hvor mange elever der har bestået. Man består med 02 eller mere. Fire af de fem elever har bestået, men programmet skriver 3.\n\nLav et Console-projekt, `Bestaaet`, og skriv koden af. **Ret den ikke, før du har fundet fejlen med debuggeren.**",
        kode: R`int[] karakterer = { 7, 2, -3, 12, 4 };
int bestaaet = TaelBestaaet(karakterer);
Console.WriteLine($"Bestået: {bestaaet}");

static int TaelBestaaet(int[] k)
{
    int antal = 0;
    foreach (int karakter in k)
    {
        if (karakter > 2)
        {
            antal++;
        }
    }
    return antal;
}`,
        output: "Bestået: 3",
        md2: "1. Sæt et breakpoint på linje 2, og start med debugging.\n2. Brug **Step Into** for at komme ind i `TaelBestaaet`.\n3. Tilføj en watch på `karakter > 2`. Gå gennem løkken med Step Over, og se, hvornår `antal` bliver talt op.\n4. Når `karakter` er 2, er watch'en `false` — men 02 er bestået. Ret `>` til `>=`, og kør igen. Nu skal der stå `Bestået: 4`." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvordan finder du en fejl i et program, der kører, men regner forkert?",
        svar: "Først finder jeg ud af, **hvad** der er forkert, og hvad det rigtige resultat skulle være. Så sætter jeg et **breakpoint** før det sted, hvor jeg tror, fejlen sker, og starter med **debuggeren**. Jeg går linje for linje med **Step Over**, og med **Step Into**, når jeg vil ind i en metode. I {{Locals||Threads & Variables}} og **Watch** ser jeg variablernes værdi, så jeg kan se præcis på hvilken linje en værdi bliver forkert. I en lang løkke bruger jeg et **betinget breakpoint**. Jeg gætter ikke — jeg ser efter.",
        noegle: ["breakpoint", "Step Over", "Step Into", "Watch", "variabler", "linje"] }
    ] },
  // ------------------------------------------------------------------
  { id: "m11l3", titel: "Regulære udtryk: kontrollér tekst", min: 20,
    ord: [
      ["Regulært udtryk (regex)", "Et mønster, der beskriver, hvordan en tekst skal se ud, fx \"fire cifre\". Bruges til at kontrollere og finde tekst."],
      ["Regex.IsMatch", "Giver `true`, hvis mønstret findes et sted i teksten."],
      ["Tegnklasse", "En del af mønstret, der passer på ét tegn ud af en gruppe, fx `\\d` (et ciffer) eller `[aeiou]` (en vokal)."],
      ["Kvantor", "Siger, hvor mange gange det foregående må gentages: `+` (mindst én), `*` (nul eller flere), `?` (højst én), `{4}` (præcis fire)."],
      ["Anker", "`^` betyder \"starten af teksten\" og `$` betyder \"slutningen\". Bruges, når hele teksten skal passe."],
      ["Gruppe", "En del af mønstret i parenteser. Du kan hente netop den del ud af det, der blev fundet."],
      ["Verbatim string", "En tekst med `@` foran: `@\"\\d\"`. Så er en backslash bare en backslash."]
    ],
    trin: [
      { t: "laes", h: "Hvad er et regulært udtryk?",
        md: "Et **regulært udtryk** (kort: **regex**) er et **mønster**, der beskriver, hvordan en tekst ser ud. Med det kan du spørge: \"Er der et tal i teksten?\" eller \"Er det her et gyldigt postnummer?\"\n\nRegex ligger i navnerummet `System.Text.RegularExpressions`, så du skal skrive en `using`-linje øverst.\n\nDet simpleste mønster er bare almindelige bogstaver: `kat` passer på enhver tekst, hvor `kat` står et sted. Mønstret `\\d` betyder **ét ciffer** (0–9).",
        kode: R`using System.Text.RegularExpressions;

Console.WriteLine(Regex.IsMatch("Min kat hedder Bob", "kat"));
Console.WriteLine(Regex.IsMatch("Min hund hedder Bob", "kat"));
Console.WriteLine(Regex.IsMatch("Jeg har 3 katte", @"\d"));
Console.WriteLine(Regex.IsMatch("Ingen tal her", @"\d"));`,
        noter: [
          ["using System.Text.RegularExpressions;", "Giver adgang til klassen `Regex`."],
          ["Regex.IsMatch(tekst, mønster)", "`True`, hvis mønstret findes **et sted** i teksten."],
          ["@\"\\d\"", "`@` foran teksten betyder, at `\\` bare er en backslash. Skriv altid regex-mønstre med `@`."],
          ["\\d", "Ét ciffer, 0–9."]
        ],
        output: "True\nFalse\nTrue\nFalse" },
      { t: "valg", q: "Hvilken tekst giver `False` med `Regex.IsMatch(tekst, @\"\\d\")`?",
        svar: ["\"Bus nummer fem\"", "\"Bus 5A\"", "\"Rute 150\"", "\"0\""],
        ret: 0,
        fordi: "`\\d` betyder **ét ciffer et sted i teksten**. Alle de andre tekster indeholder mindst ét ciffer. \"fem\" er bogstaver, ikke et ciffer." },
      { t: "laes", h: "Tegnklasser: ét tegn ud af en gruppe",
        md: "En **tegnklasse** passer på **ét tegn**, men der er flere tegn at vælge imellem. Du kan skrive dem selv i firkantede parenteser, eller bruge de færdige med backslash.",
        kode: R`using System.Text.RegularExpressions;

Console.WriteLine(Regex.IsMatch("bil", "b[aeiou]l"));
Console.WriteLine(Regex.IsMatch("bxl", "b[aeiou]l"));
Console.WriteLine(Regex.IsMatch("A7", "[A-Z][0-9]"));
Console.WriteLine(Regex.IsMatch("a b", @"a\sb"));`,
        noter: [
          ["[aeiou]", "Ét af tegnene a, e, i, o eller u."],
          ["[A-Z] / [0-9]", "Ét tegn i intervallet: et stort bogstav A–Z / et ciffer. `[0-9]` er det samme som `\\d`."],
          ["\\w", "Ét \"ordtegn\": bogstav (også æøå), ciffer eller `_`."],
          ["\\s", "Ét mellemrum (eller tabulator/linjeskift)."],
          [".", "Et hvilket som helst tegn. Vil du have et rigtigt punktum, skriver du `\\.`."]
        ],
        output: "True\nFalse\nTrue\nTrue",
        md2: "Store bogstaver betyder det modsatte: `\\D` er \"ikke et ciffer\", `\\W` er \"ikke et ordtegn\"." },
      { t: "forudsig",
        kode: R`using System.Text.RegularExpressions;

Console.WriteLine(Regex.IsMatch("hus", "h[aeiouyæøå]s"));
Console.WriteLine(Regex.IsMatch("H5", "[a-z][0-9]"));
Console.WriteLine(Regex.IsMatch("3.5", @"\d\.\d"));`,
        output: "True\nFalse\nTrue",
        fordi: "`u` er en vokal, så `hus` passer. `H` er et **stort** bogstav, og `[a-z]` er kun små bogstaver — regex skelner mellem store og små. `\\.` er et rigtigt punktum mellem to cifre." },
      { t: "laes", h: "Kvantorer: hvor mange gange?",
        md: "Indtil nu passer hver del af mønstret på **ét** tegn. En **kvantor** står lige efter en del og siger, **hvor mange gange** den må gentages.",
        kode: R`using System.Text.RegularExpressions;

Console.WriteLine(Regex.IsMatch("Ordre 4711", @"\d{4}"));
Console.WriteLine(Regex.IsMatch("Ordre 47", @"\d{4}"));
Console.WriteLine(Regex.IsMatch("farve", "farv?e"));
Console.WriteLine(Regex.IsMatch("fare", "farv?e"));`,
        noter: [
          ["+", "Mindst én gang. `\\d+` er ét eller flere cifre."],
          ["*", "Nul eller flere gange."],
          ["?", "Højst én gang — altså \"valgfri\". `farv?e` passer på både farve og fare."],
          ["{4}", "Præcis fire gange. `\\d{4}` er fire cifre i træk."],
          ["{2,4}", "Mellem to og fire gange."]
        ],
        output: "True\nFalse\nTrue\nTrue" },
      { t: "forudsig",
        kode: R`using System.Text.RegularExpressions;

Console.WriteLine(Regex.IsMatch("Tlf. 12 34", @"\d{4}"));
Console.WriteLine(Regex.IsMatch("abc123", @"[a-z]+\d+"));
Console.WriteLine(Regex.IsMatch("color", "colou?r"));`,
        output: "False\nTrue\nTrue",
        fordi: "`12 34` har aldrig fire cifre **i træk** — mellemrummet bryder rækken. `abc123` er bogstaver efterfulgt af cifre. I `colou?r` er `u` valgfri, så både color og colour passer." },
      { t: "laes", h: "Ankre: hele teksten skal passe",
        md: "`IsMatch` svarer `true`, hvis mønstret findes **et sted** i teksten. Det er ikke nok, når du vil **kontrollere** et input: `\\d{4}` passer også på `123456` og `Postnr: 8000x`.\n\nDerfor sætter man **ankre** på: `^` betyder starten af teksten, og `$` betyder slutningen. `^\\d{4}$` betyder: \"fra start til slut står der præcis fire cifre — og intet andet\".",
        kode: R`using System.Text.RegularExpressions;

string moenster = @"^\d{4}$";
Console.WriteLine(Regex.IsMatch("8000", moenster));
Console.WriteLine(Regex.IsMatch("80000", moenster));
Console.WriteLine(Regex.IsMatch("8000 Aarhus", moenster));`,
        output: "True\nFalse\nFalse",
        noter: [
          ["^\\d{4}$", "Postnummer: præcis fire cifre."],
          ["^\\d{8}$", "Dansk telefonnummer: præcis otte cifre."],
          ["^(\\+45)?\\d{8}$", "Telefonnummer, der må starte med +45. Parentesen samler `+45` til én del, og `?` gør den valgfri. `\\+` er et rigtigt plus."],
          ["^[\\w.-]+@[\\w-]+\\.[a-z]{2,}$", "En simpel e-mail-kontrol: noget, så `@`, så et domæne, et punktum og mindst to bogstaver."]
        ],
        md2: "I MVC (modul 16 og frem) kan du sætte et regex direkte på en property med attributten `[RegularExpression(@\"^\\d{4}$\", ErrorMessage = \"Postnummeret skal være fire cifre\")]`. Så kontrollerer ASP.NET Core inputtet for dig." },
      { t: "udfyld", q: "Lav et mønster, der kontrollerer, at **hele** teksten er et postnummer på præcis fire cifre.",
        kode: R`using System.Text.RegularExpressions;

string postnr = "5000";
bool gyldig = Regex.IsMatch(postnr, @"[[^]]\d{[[4]]}[[$]]");
Console.WriteLine(gyldig);`,
        output: "True",
        fordi: "`^` = start, `\\d{4}` = fire cifre, `$` = slut. Uden `^` og `$` ville `50000` også blive godkendt." },
      { t: "laes", h: "Find tekst: Match, grupper og Matches",
        md: "Regex kan også **finde** tekst. `Regex.Match` giver det **første** sted, mønstret passer. Sætter du en del af mønstret i **parenteser**, bliver den en **gruppe**, som du kan hente ud for sig.\n\n`Regex.Matches` finder **alle** steder, og du gennemløber dem med `foreach`.",
        kode: R`using System.Text.RegularExpressions;

Match m = Regex.Match("Kunde: 8000 Aarhus C", @"(\d{4}) (\w+)");
if (m.Success)
{
    Console.WriteLine($"Hele fundet: {m.Value}");
    Console.WriteLine($"Postnr: {m.Groups[1].Value}");
    Console.WriteLine($"By: {m.Groups[2].Value}");
}

foreach (Match tal in Regex.Matches("3 æbler, 12 pærer og 5 bananer", @"\d+"))
{
    Console.WriteLine(tal.Value);
}`,
        noter: [
          ["m.Success", "`true`, hvis mønstret blev fundet. Tjek altid den, før du bruger resultatet."],
          ["m.Value", "Den tekst, der passede på hele mønstret."],
          ["m.Groups[1].Value", "Teksten fra første parentes. `Groups[2]` er anden parentes. (`Groups[0]` er hele fundet.)"],
          ["Regex.Matches(…)", "Alle fund. Hvert fund er et `Match`."]
        ],
        output: "Hele fundet: 8000 Aarhus\nPostnr: 8000\nBy: Aarhus\n3\n12\n5" },
      { t: "forudsig",
        kode: R`using System.Text.RegularExpressions;

string tekst = "Varer: 120 kr, 35 kr og 8 kr";
int sum = 0;
foreach (Match m in Regex.Matches(tekst, @"(\d+) kr"))
{
    sum += int.Parse(m.Groups[1].Value);
}
Console.WriteLine(sum);`,
        output: "163",
        fordi: "Mønstret finder tre steder: `120 kr`, `35 kr` og `8 kr`. Gruppe 1 er kun tallet, så det kan laves om med `int.Parse`. 120 + 35 + 8 = 163." },
      { t: "forudsig", h: "Regex.Replace: find og erstat",
        q: "`Regex.Replace(tekst, mønster, ny)` erstatter **alle** steder, mønstret passer, med `ny`. Hvad skriver programmet?",
        kode: R`using System.Text.RegularExpressions;

string kort = "Kortnr: 1234 5678 9012 3456";
Console.WriteLine(Regex.Replace(kort, @"\d{4} ", "**** "));
Console.WriteLine(Regex.Replace("for    mange   mellemrum", @"\s+", " "));`,
        output: "Kortnr: **** **** **** 3456\nfor mange mellemrum",
        fordi: "Første mønster passer på fire cifre **efterfulgt af et mellemrum**. Den sidste blok har intet mellemrum efter sig, så den bliver stående. Andet mønster erstatter hver række af mellemrum med ét." },
      { t: "skriv", q: "Skriv metoden `static bool ErTelefon(string tekst)`. Den skal returnere `Regex.IsMatch(...)` med et mønster, der godkender **præcis otte cifre** og intet andet. Brug `\\d`, en kvantor og begge ankre.",
        foer: R`using System.Text.RegularExpressions;

Console.WriteLine(ErTelefon("12345678"));
Console.WriteLine(ErTelefon("1234 5678"));
Console.WriteLine(ErTelefon("123456789"));
`,
        tjek: [
          [/static bool ErTelefon\(string tekst\)/, "Metoden hedder `static bool ErTelefon(string tekst)`"],
          [/Regex\.IsMatch\(tekst,/, "Brug `Regex.IsMatch(tekst, …)`"],
          [/"\^(\\d|\[0-9\])\{8\}\$"/, "Mønstret er `^\\d{8}$`: start, otte cifre, slut"],
          [/return /, "Returnér resultatet med `return`"]
        ],
        forkert: [R`static bool ErTelefon(string tekst)
{
    return Regex.IsMatch(tekst, @"\d{8}");
}`],
        loesning: R`static bool ErTelefon(string tekst)
{
    return Regex.IsMatch(tekst, @"^\d{8}$");
}`,
        output: "True\nFalse\nFalse",
        fordi: "Uden `^` og `$` ville `123456789` blive godkendt, fordi der står otte cifre i træk **inde i** teksten." },
      { t: "ide", h: "Spørg, indtil svaret er gyldigt",
        md: "Lav et Console-projekt, `Tilmelding`. Programmet spørger efter postnummer og e-mail og bliver ved med at spørge, indtil svaret passer på mønstret. Skriv koden af, og prøv med både gyldige og ugyldige svar.",
        kode: R`using System.Text.RegularExpressions;

string postnr = Spoerg("Postnummer: ", @"^\d{4}$");
string email = Spoerg("E-mail: ", @"^[\w.-]+@[\w-]+\.[a-z]{2,}$");
Console.WriteLine($"Tak! {email} i {postnr} er tilmeldt.");

static string Spoerg(string tekst, string moenster)
{
    while (true)
    {
        Console.Write(tekst);
        string svar = Console.ReadLine() ?? "";
        if (Regex.IsMatch(svar, moenster))
        {
            return svar;
        }
        Console.WriteLine("Det passer ikke. Prøv igen.");
    }
}`,
        md2: "Prøv fx `800`, `8000x` og `8000` som postnummer, og `peter@`, `peter@mail` og `peter@mail.dk` som e-mail. Udvid selv med et telefonnummer, der må starte med `+45`." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er et regulært udtryk, og hvorfor skal et mønster til validering have `^` og `$`?",
        svar: "Et **regulært udtryk** er et **mønster**, der beskriver, hvordan en tekst skal se ud, fx `\\d{4}` for fire cifre. Med `Regex.IsMatch` kan jeg kontrollere input, og med `Match` og **grupper** kan jeg hente dele ud af en tekst. `IsMatch` svarer ja, hvis mønstret findes **et sted** i teksten. Derfor sætter jeg **ankrene** `^` (start) og `$` (slut) på, når jeg validerer: så skal **hele** teksten passe, og fx `80000` bliver ikke godkendt som postnummer.",
        noegle: ["mønster", "IsMatch", "validering", "^", "$", "hele teksten"] }
    ] },
  // ------------------------------------------------------------------
  { id: "m11l4", titel: "Algoritmer: søgning, sortering og rekursion", min: 22,
    ord: [
      ["Algoritme", "En præcis fremgangsmåde i trin, der løser et problem, fx \"find et tal i et array\"."],
      ["Lineær søgning", "Kig på elementerne ét ad gangen fra starten, til du finder det, du leder efter."],
      ["Binær søgning", "Søgning i et **sorteret** array: kig i midten, og smid den halvdel væk, hvor tallet ikke kan være. Gentag."],
      ["Bubble sort", "Simpel sortering: sammenlign naboer, og byt dem, hvis de står forkert. Gentag, til alt er på plads."],
      ["Rekursion", "En metode, der kalder sig selv med et mindre problem, indtil den rammer et basistilfælde."],
      ["Basistilfælde", "Det tilfælde i en rekursiv metode, der svarer direkte uden at kalde sig selv. Uden det kalder metoden sig selv for evigt."],
      ["Big-O", "En måde at sige, hvordan antallet af skridt vokser, når mængden af data vokser: O(1), O(log n), O(n), O(n²)."]
    ],
    trin: [
      { t: "laes", h: "Lineær søgning",
        md: "En **algoritme** er en præcis fremgangsmåde, der løser et problem. Den enkleste søge-algoritme er **lineær søgning**: kig på elementerne ét ad gangen fra starten. Når du finder tallet, returnerer du dets indeks. Kommer du til enden uden at finde det, returnerer du −1.\n\nDet er sådan `Contains` og `IndexOf` arbejder indeni (modul 6).",
        kode: R`int[] tal = { 7, 3, 9, 4, 1 };
Console.WriteLine(LineaerSoeg(tal, 4));
Console.WriteLine(LineaerSoeg(tal, 8));

static int LineaerSoeg(int[] t, int soeg)
{
    for (int i = 0; i < t.Length; i++)
    {
        if (t[i] == soeg)
        {
            return i;
        }
    }
    return -1;
}`,
        noter: [
          ["for (int i = 0; …)", "Gå elementerne igennem ét ad gangen."],
          ["return i;", "Fundet: returnér indekset med det samme. Løkken stopper."],
          ["return -1;", "Løkken er færdig uden fund. −1 betyder \"findes ikke\"."]
        ],
        output: "3\n-1" },
      { t: "forudsig",
        kode: R`int[] tal = { 5, 8, 2, 9, 6 };
int soeg = 9;
int kig = 0;
int fundet = -1;
for (int i = 0; i < tal.Length; i++)
{
    kig++;
    if (tal[i] == soeg)
    {
        fundet = i;
        break;
    }
}
Console.WriteLine($"Indeks {fundet} efter {kig} sammenligninger");`,
        output: "Indeks 3 efter 4 sammenligninger",
        fordi: "Løkken kigger på 5, 8, 2 og 9 — fire sammenligninger — og stopper ved 9 på indeks 3. Står tallet sidst eller slet ikke i arrayet, skal den kigge på **alle** elementer." },
      { t: "laes", h: "Binær søgning: halvér hver gang",
        md: "Er arrayet **sorteret**, kan du gøre det meget hurtigere. Det svarer til at slå op i en ordbog: du åbner i midten og ved med det samme, om ordet står før eller efter.\n\n**Binær søgning** holder styr på et område fra `lav` til `hoej`. Den kigger på elementet i **midten**. Er det for lille, må tallet stå til højre, så `lav` flyttes forbi midten. Er det for stort, flyttes `hoej`. Hver gang bliver området **halvt så stort**.",
        kode: R`int[] t = { 2, 5, 8, 12, 16, 23, 38, 56 };
Console.WriteLine(BinaerSoeg(t, 23));
Console.WriteLine(BinaerSoeg(t, 7));

static int BinaerSoeg(int[] t, int soeg)
{
    int lav = 0;
    int hoej = t.Length - 1;
    while (lav <= hoej)
    {
        int midt = (lav + hoej) / 2;
        if (t[midt] == soeg)
        {
            return midt;
        }
        if (t[midt] < soeg)
        {
            lav = midt + 1;
        }
        else
        {
            hoej = midt - 1;
        }
    }
    return -1;
}`,
        noter: [
          ["(lav + hoej) / 2", "Midten. Heltalsdivision runder ned."],
          ["lav = midt + 1", "Midten var for lille: søg kun i højre halvdel."],
          ["hoej = midt - 1", "Midten var for stor: søg kun i venstre halvdel."],
          ["while (lav <= hoej)", "Når `lav` er gået forbi `hoej`, er der ikke mere at søge i: tallet findes ikke."]
        ],
        output: "5\n-1",
        md2: "Virker **kun**, hvis arrayet er sorteret. C# har den færdig: `Array.BinarySearch(t, 23)`." },
      { t: "spor", h: "Spor: binær søgning efter 38",
        q: "Følg søgningen efter 38. Skriv `lav`, `hoej` og `midt` lige efter de linjer, der ændrer dem. Linje 11 køres kun, når tallet er fundet; linje 15 kun, når midten var for lille.",
        kode: R`int[] t = { 2, 5, 8, 12, 16, 23, 38, 56 };
int soeg = 38;
int lav = 0;
int hoej = t.Length - 1;
int midt = 0;
while (lav <= hoej)
{
    midt = (lav + hoej) / 2;
    if (t[midt] == soeg)
    {
        break;
    }
    if (t[midt] < soeg)
    {
        lav = midt + 1;
    }
    else
    {
        hoej = midt - 1;
    }
}
Console.WriteLine($"Fundet på indeks {midt}");`,
        kolonner: ["lav", "hoej", "midt"],
        raekker: [[5, "=0", "=7", "=0"], [8, "0", "7", "3"], [15, "4", "7", "3"], [8, "4", "7", "5"], [15, "6", "7", "5"], [8, "6", "7", "6"]],
        output: "Fundet på indeks 6",
        fordi: "Midten er først indeks 3 (tallet 12) — for lille, så `lav` bliver 4. Så indeks 5 (tallet 23) — stadig for lille, `lav` bliver 6. Så indeks 6: tallet 38. Fundet efter **tre** kig i stedet for syv." },
      { t: "valg", q: "Et sorteret array har 1.000.000 tal. Hvor mange gange skal binær søgning højst kigge på et element?",
        svar: ["Cirka 20", "Cirka 1.000", "Cirka 500.000", "1.000.000"],
        ret: 0,
        fordi: "Hvert kig halverer området: 1.000.000 → 500.000 → 250.000 → … Efter ca. 20 halveringer er der ét element tilbage (2²⁰ er ca. 1 million). Lineær søgning kan skulle kigge på alle 1.000.000." },
      { t: "laes", h: "Bubble sort: byt naboer",
        md: "Binær søgning kræver et sorteret array. Hvordan sorterer man? **Bubble sort** er den enkleste algoritme:\n\n1. Gå arrayet igennem, og sammenlign hvert element med naboen til højre.\n2. Står de forkert, så **byt** dem.\n3. Efter én gennemgang er det største tal \"boblet\" op til sidste plads. Gentag for resten.\n\nAt bytte to værdier kræver en **midlertidig** variabel: ellers overskriver du den ene, før du har gemt den.",
        kode: R`int[] t = { 5, 1, 4, 2, 8 };

for (int i = 0; i < t.Length - 1; i++)
{
    for (int j = 0; j < t.Length - 1 - i; j++)
    {
        if (t[j] > t[j + 1])
        {
            int temp = t[j];
            t[j] = t[j + 1];
            t[j + 1] = temp;
        }
    }
}
Console.WriteLine(string.Join(" ", t));`,
        noter: [
          ["for (int i …)", "Antal gennemgange. Efter gennemgang nr. i står de i største tal på plads bagerst."],
          ["j < t.Length - 1 - i", "`- 1`: det sidste element har ingen nabo til højre. `- i`: de bagerste er allerede på plads."],
          ["int temp = t[j];", "Gem den ene værdi, før den bliver overskrevet."]
        ],
        output: "1 2 4 5 8",
        md2: "I rigtige programmer skriver du **ikke** din egen sortering. Brug `Array.Sort(t)` eller `liste.Sort()` — de bruger en meget hurtigere algoritme. Men bubble sort er god til at forstå, hvad sortering er, og censor kan godt bede dig forklare den." },
      { t: "spor", h: "Spor: én gennemgang af bubble sort",
        q: "Følg **én** gennemgang af arrayet. Skriv alle fire pladser i arrayet lige efter hver ombytning (linje 8).",
        kode: R`int[] t = { 5, 1, 4, 2 };
for (int j = 0; j < t.Length - 1; j++)
{
    if (t[j] > t[j + 1])
    {
        int temp = t[j];
        t[j] = t[j + 1];
        t[j + 1] = temp;
    }
}
Console.WriteLine(string.Join(" ", t));`,
        kolonner: ["t[0]", "t[1]", "t[2]", "t[3]"],
        raekker: [[1, "=5", "=1", "=4", "=2"], [8, "1", "5", "4", "2"], [8, "1", "4", "5", "2"], [8, "1", "4", "2", "5"]],
        output: "1 4 2 5",
        fordi: "5 > 1: byt. 5 > 4: byt. 5 > 2: byt. 5 \"bobler\" hele vejen op til sidste plads. Resten er ikke sorteret endnu — derfor skal der flere gennemgange til." },
      { t: "skriv", q: "Skriv de tre linjer, der bytter `t[j]` og `t[j + 1]`. Brug en midlertidig variabel, der hedder `temp`.",
        foer: R`int[] t = { 9, 3 };
int j = 0;
`,
        efter: R`
Console.WriteLine(string.Join(" ", t));`,
        tjek: [
          [/(int|var) temp=t\[j\];/, "Gem `t[j]` i `temp` først: `int temp = t[j];`"],
          ["t[j]=t[j+1];", "Kopiér naboen ind: `t[j] = t[j + 1];`"],
          ["t[j+1]=temp;", "Læg den gemte værdi på naboens plads: `t[j + 1] = temp;`"]
        ],
        forkert: [R`t[j] = t[j + 1];
t[j + 1] = t[j];`],
        loesning: R`int temp = t[j];
t[j] = t[j + 1];
t[j + 1] = temp;`,
        output: "3 9",
        fordi: "Uden `temp` ville `t[j] = t[j + 1]` overskrive 9 med 3, og så er 9 væk: du får `3 3`." },
      { t: "laes", h: "Rekursion: en metode, der kalder sig selv",
        md: "En **rekursiv** metode løser et problem ved at kalde **sig selv** med et mindre problem. Den har altid to dele:\n\n1. Et **basistilfælde**, der svarer direkte (ellers kalder den sig selv for evigt, og programmet går ned med `StackOverflowException`).\n2. Et rekursivt kald med et **mindre** tal.\n\nEksempel: fakultet. 4! = 4 · 3 · 2 · 1 = 24. Det er det samme som 4 · 3!.",
        kode: R`Console.WriteLine(Fakultet(4));

static int Fakultet(int n)
{
    if (n <= 1)
    {
        return 1;
    }
    return n * Fakultet(n - 1);
}`,
        noter: [
          ["if (n <= 1) return 1;", "Basistilfældet: 1! = 1. Her stopper kaldene."],
          ["n * Fakultet(n - 1)", "Det rekursive kald: et mindre problem. 4 · Fakultet(3) → 3 · Fakultet(2) → 2 · Fakultet(1) → 1."]
        ],
        output: "24",
        md2: "Med **Step Into** i debuggeren kan du se det ske: hver gang metoden kalder sig selv, kommer der en ny linje i {{**Call Stack**||**Frames**}}, med sit eget `n`." },
      { t: "forudsig", q: "Fibonacci-tallene er 0, 1, 1, 2, 3, 5, … — hvert tal er summen af de to foregående. Hvad skriver programmet?",
        kode: R`Console.WriteLine(Fib(6));
Console.WriteLine(Fib(1));

static int Fib(int n)
{
    if (n <= 1)
    {
        return n;
    }
    return Fib(n - 1) + Fib(n - 2);
}`,
        output: "8\n1",
        fordi: "Fib(0) = 0, Fib(1) = 1 (basistilfældet), Fib(2) = 1, Fib(3) = 2, Fib(4) = 3, Fib(5) = 5, Fib(6) = 8. Bemærk, at Fib kalder sig selv **to** gange — derfor bliver den meget langsom for store tal." },
      { t: "laes", h: "Big-O: hvor hurtigt vokser arbejdet?",
        md: "**Big-O** beskriver, hvordan antallet af skridt vokser, når mængden af data (**n**) vokser. Den måler ikke sekunder, men **hvordan** tiden vokser.\n\n- **O(1)** — konstant: samme tid uanset n. Opslag i et array med indeks, `Dictionary` med nøgle.\n- **O(log n)** — logaritmisk: n fordobles, men kun ét skridt mere. Binær søgning.\n- **O(n)** — lineær: dobbelt så meget data, dobbelt så lang tid. Lineær søgning, `foreach` over en liste, `List.Contains`.\n- **O(n²)** — kvadratisk: dobbelt så meget data, **fire** gange så lang tid. En løkke inde i en løkke, fx bubble sort.",
        noter: [
          ["n = 1.000", "O(1): 1 skridt · O(log n): ca. 10 · O(n): 1.000 · O(n²): 1.000.000"],
          ["n = 1.000.000", "O(1): 1 skridt · O(log n): ca. 20 · O(n): 1.000.000 · O(n²): 1.000.000.000.000"]
        ],
        md2: "Derfor er valget af datastruktur vigtigt (modul 6): at finde en kunde efter id er O(n) i en `List`, men O(1) i en `Dictionary`." },
      { t: "valg", q: "Hvad er Big-O for denne kode, hvor `n` er længden af `t`?",
        kode: R`int[] t = { 4, 1, 3 };
int par = 0;
for (int i = 0; i < t.Length; i++)
{
    for (int j = 0; j < t.Length; j++)
    {
        par++;
    }
}
Console.WriteLine(par);`,
        output: "9",
        svar: ["O(n²)", "O(n)", "O(log n)", "O(1)"],
        ret: 0,
        fordi: "En løkke **inde i** en løkke, der begge går n gange, giver n · n skridt. Med 3 elementer er det 9; med 1.000 elementer 1.000.000." },
      { t: "ide", h: "Sortér og søg selv",
        md: "Lav et Console-projekt, `SoegSorter`. Skriv **selv** — uden at kigge — de to metoder `BubbleSort(int[] t)` og `BinaerSoeg(int[] t, int soeg)`, og brug dem sådan:",
        kode: R`int[] tal = { 42, 7, 19, 3, 88, 25, 61 };
BubbleSort(tal);
Console.WriteLine(string.Join(" ", tal));
Console.WriteLine($"25 står på indeks {BinaerSoeg(tal, 25)}");
Console.WriteLine($"50 står på indeks {BinaerSoeg(tal, 50)}");

static void BubbleSort(int[] t)
{
    for (int i = 0; i < t.Length - 1; i++)
    {
        for (int j = 0; j < t.Length - 1 - i; j++)
        {
            if (t[j] > t[j + 1])
            {
                int temp = t[j];
                t[j] = t[j + 1];
                t[j + 1] = temp;
            }
        }
    }
}

static int BinaerSoeg(int[] t, int soeg)
{
    int lav = 0;
    int hoej = t.Length - 1;
    while (lav <= hoej)
    {
        int midt = (lav + hoej) / 2;
        if (t[midt] == soeg)
        {
            return midt;
        }
        if (t[midt] < soeg)
        {
            lav = midt + 1;
        }
        else
        {
            hoej = midt - 1;
        }
    }
    return -1;
}`,
        output: "3 7 19 25 42 61 88\n25 står på indeks 3\n50 står på indeks -1",
        md2: "Sæt et breakpoint i `BinaerSoeg`, og se `lav`, `hoej` og `midt` i {{Locals||Threads & Variables}} for begge søgninger. Hvorfor bliver `tal` sorteret, selv om `BubbleSort` er en `void`-metode, der ikke returnerer noget? (Svar: et array er en referencetype — metoden sorterer det **samme** array, modul 7.)" },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på lineær og binær søgning, og hvad er deres Big-O?",
        svar: "**Lineær søgning** kigger på elementerne ét ad gangen fra starten. Den virker på alle arrays, men i værste fald skal den kigge på alle n elementer: **O(n)**. **Binær søgning** kræver, at arrayet er **sorteret**. Den kigger i midten og smider den halvdel væk, hvor tallet ikke kan være, så området halveres hver gang: **O(log n)**. Med en million elementer er det ca. 20 kig i stedet for en million.",
        noegle: ["ét ad gangen", "sorteret", "midten", "halvdel", "O(n)", "O(log n)"] }
    ] },
  // ------------------------------------------------------------------
  { id: "m11l5", titel: "Designmønstre og SOLID", min: 22,
    ord: [
      ["Designmønster", "En kendt, navngiven løsning på et problem, der går igen i mange programmer. Navnet gør det let at tale om."],
      ["Singleton", "Mønster, der sikrer, at der kun findes ét objekt af en klasse i hele programmet."],
      ["Factory", "Mønster, hvor én metode står for at oprette objekter, så resten af programmet ikke skal vide, hvilken klasse der laves."],
      ["Observer", "Mønster, hvor et objekt giver besked til alle, der har meldt sig som lyttere. I C# bygges det med events."],
      ["Repository", "En klasse, der står for at hente og gemme data, så resten af programmet ikke ved, om data ligger i en liste eller en database."],
      ["Dependency Injection (DI)", "Et objekt får de objekter, det afhænger af, udefra — typisk gennem konstruktøren — i stedet for selv at lave dem med `new`."],
      ["SOLID", "Fem principper for god objektorienteret kode: Single responsibility, Open/closed, Liskov, Interface segregation, Dependency inversion."]
    ],
    trin: [
      { t: "laes", h: "Hvad er et designmønster? Singleton",
        md: "Et **designmønster** er en kendt løsning på et problem, der går igen i mange programmer. Det er ikke færdig kode, men en **opskrift** med et navn. Når du siger \"det er en Singleton\" til eksamen, ved censor præcis, hvad du mener.\n\n**Singleton** sikrer, at der kun findes **ét** objekt af en klasse, fx én log eller én indstillings-fil. Tricket: konstruktøren er `private`, så ingen udenfor kan skrive `new`. I stedet henter man objektet gennem en `static` property, der laver det første gang og derefter giver det samme objekt hver gang.",
        kode: R`Logger a = Logger.Instans;
Logger b = Logger.Instans;
a.Skriv("Start");
b.Skriv("Slut");
Console.WriteLine(a == b);
Console.WriteLine(a.Antal);

class Logger
{
    private static Logger? instans;
    public int Antal { get; private set; }

    private Logger() { }

    public static Logger Instans
    {
        get
        {
            if (instans == null)
            {
                instans = new Logger();
            }
            return instans;
        }
    }

    public void Skriv(string besked)
    {
        Antal++;
        Console.WriteLine($"[LOG] {besked}");
    }
}`,
        noter: [
          ["private Logger() { }", "Privat konstruktør: `new Logger()` giver fejl uden for klassen."],
          ["private static Logger? instans;", "Det ene objekt gemmes i et static felt. Det er `null`, indtil nogen beder om det."],
          ["public static Logger Instans", "Laver objektet første gang. Derefter returneres det samme objekt."],
          ["a == b", "`True`: `a` og `b` peger på det **samme** objekt."]
        ],
        output: "[LOG] Start\n[LOG] Slut\nTrue\n2" },
      { t: "forudsig",
        kode: R`Taeller.Instans.Tael();
Taeller.Instans.Tael();
Taeller t = Taeller.Instans;
t.Tael();
Console.WriteLine(Taeller.Instans.Vaerdi);

class Taeller
{
    private static Taeller? instans;
    public int Vaerdi { get; private set; }
    private Taeller() { }

    public static Taeller Instans
    {
        get
        {
            if (instans == null)
            {
                instans = new Taeller();
            }
            return instans;
        }
    }

    public void Tael()
    {
        Vaerdi++;
    }
}`,
        output: "3",
        fordi: "Der findes kun ét `Taeller`-objekt. Alle tre kald til `Tael()` rammer det samme objekt, så `Vaerdi` er 3." },
      { t: "laes", h: "Factory: én metode laver objekterne",
        md: "Nogle gange ved programmet først, mens det kører, **hvilken** klasse der skal laves — fx ud fra en tekst, brugeren har valgt. I stedet for at sprede `if` og `new` ud over hele programmet samler en **Factory** det ét sted.\n\nResten af programmet kender kun **interfacet** (modul 7). Kommer der en ny figur, skal du kun ændre factory'en.",
        kode: R`IFigur f1 = FigurFactory.Lav("cirkel");
IFigur f2 = FigurFactory.Lav("kvadrat");
Console.WriteLine(f1.Navn());
Console.WriteLine(f2.Navn());

interface IFigur
{
    string Navn();
}

class Cirkel : IFigur
{
    public string Navn() { return "Jeg er en cirkel"; }
}

class Kvadrat : IFigur
{
    public string Navn() { return "Jeg er et kvadrat"; }
}

static class FigurFactory
{
    public static IFigur Lav(string type)
    {
        switch (type)
        {
            case "cirkel": return new Cirkel();
            case "kvadrat": return new Kvadrat();
            default: throw new ArgumentException($"Ukendt figur: {type}");
        }
    }
}`,
        noter: [
          ["static IFigur Lav(string type)", "Returtypen er interfacet. Den, der kalder, behøver ikke vide, om det er en `Cirkel` eller et `Kvadrat`."],
          ["default: throw …", "Ukendt type: kast en exception (lektion 1) i stedet for at returnere `null`."]
        ],
        output: "Jeg er en cirkel\nJeg er et kvadrat" },
      { t: "forudsig",
        kode: R`string[] valg = { "kat", "hund", "fisk" };
foreach (string v in valg)
{
    try
    {
        IDyr d = DyrFactory.Lav(v);
        Console.WriteLine(d.Lyd());
    }
    catch (ArgumentException e)
    {
        Console.WriteLine(e.Message);
    }
}

interface IDyr { string Lyd(); }
class Kat : IDyr { public string Lyd() { return "Mjav"; } }
class Hund : IDyr { public string Lyd() { return "Vov"; } }

static class DyrFactory
{
    public static IDyr Lav(string type)
    {
        if (type == "kat") return new Kat();
        if (type == "hund") return new Hund();
        throw new ArgumentException($"Kender ikke {type}");
    }
}`,
        output: "Mjav\nVov\nKender ikke fisk",
        fordi: "Factory'en laver en `Kat` og en `Hund`. Til `fisk` er der ingen klasse, så den kaster en `ArgumentException`, som løkken fanger og skriver beskeden fra." },
      { t: "laes", h: "Observer: giv besked til alle, der lytter",
        md: "**Observer** er mønstret bag **events**, som du kender fra modul 10. Ét objekt (afsenderen) har en liste af lyttere. Når der sker noget, giver det besked til **alle** lyttere — uden at vide, hvem de er.\n\nI C# er listen af lyttere et `event`. Lytterne melder sig til med `+=`.",
        kode: R`Termometer t = new Termometer();
t.TemperaturAendret += Vis;
t.TemperaturAendret += Advar;
t.Saet(18);
t.Saet(31);

static void Vis(int grader)
{
    Console.WriteLine($"Display: {grader} grader");
}

static void Advar(int grader)
{
    if (grader > 30)
    {
        Console.WriteLine("Advarsel: for varmt!");
    }
}

class Termometer
{
    public event Action<int>? TemperaturAendret;

    public void Saet(int grader)
    {
        TemperaturAendret?.Invoke(grader);
    }
}`,
        noter: [
          ["event Action<int>?", "Listen af lyttere. Hver lytter er en metode, der tager én `int`."],
          ["+= Vis", "`Vis` melder sig som lytter."],
          ["?.Invoke(grader)", "Giv besked til alle lyttere — hvis der er nogen (`?.`)."]
        ],
        output: "Display: 18 grader\nDisplay: 31 grader\nAdvarsel: for varmt!" },
      { t: "forudsig",
        kode: R`Butik b = new Butik();
b.NyVare += SendMail;
b.NyVare += SendSms;
b.Tilfoej("Kaffe");
b.NyVare -= SendSms;
b.Tilfoej("Te");

static void SendMail(string vare) { Console.WriteLine($"Mail: {vare}"); }
static void SendSms(string vare) { Console.WriteLine($"SMS: {vare}"); }

class Butik
{
    public event Action<string>? NyVare;
    public void Tilfoej(string vare)
    {
        NyVare?.Invoke(vare);
    }
}`,
        output: "Mail: Kaffe\nSMS: Kaffe\nMail: Te",
        fordi: "Ved Kaffe er der to lyttere. Derefter afmelder `SendSms` sig med `-=`, så ved Te får kun `SendMail` besked." },
      { t: "laes", h: "Repository og Dependency Injection",
        md: "To mønstre, du kommer til at bruge i **hvert** ASP.NET-projekt:\n\n**Repository**: én klasse står for at hente og gemme data. Resten af programmet kender kun et **interface**, fx `IProduktRepository`, og ved ikke, om data ligger i en liste, en fil eller en database.\n\n**Dependency Injection (DI)**: en klasse laver ikke selv sine \"hjælpere\" med `new`. Den får dem **udefra** gennem konstruktøren. Så kan man skifte en hjælper ud — fx en test-liste i stedet for en rigtig database — uden at ændre klassen.",
        kode: R`IProduktRepository repo = new HukommelsesRepository();
ProduktService service = new ProduktService(repo);
Console.WriteLine(service.Rapport());

interface IProduktRepository
{
    List<string> HentAlle();
}

class HukommelsesRepository : IProduktRepository
{
    public List<string> HentAlle()
    {
        return new List<string> { "Kaffe", "Te", "Kakao" };
    }
}

class ProduktService
{
    private readonly IProduktRepository repo;

    public ProduktService(IProduktRepository repo)
    {
        this.repo = repo;
    }

    public string Rapport()
    {
        List<string> alle = repo.HentAlle();
        return $"{alle.Count} produkter: {string.Join(", ", alle)}";
    }
}`,
        noter: [
          ["interface IProduktRepository", "Kontrakten: \"jeg kan hente alle produkter\". Hvordan, er ligegyldigt for resten."],
          ["ProduktService(IProduktRepository repo)", "**Constructor injection**: servicen får sit repository udefra. Den skriver aldrig `new HukommelsesRepository()`."],
          ["private readonly", "`readonly` betyder, at feltet kun kan sættes i konstruktøren."]
        ],
        output: "3 produkter: Kaffe, Te, Kakao",
        md2: "I ASP.NET Core (modul 16 og frem) laver frameworket objekterne for dig. Du skriver én linje i `Program.cs`, fx `builder.Services.AddScoped<IProduktRepository, SqlProduktRepository>();`, og så får alle controllere, der beder om et `IProduktRepository` i konstruktøren, automatisk det rigtige objekt." },
      { t: "udfyld", q: "`OrdreService` skal have sin `IMailSender` udefra gennem konstruktøren (Dependency Injection).",
        kode: R`IMailSender mail = new TestMail();
OrdreService s = new OrdreService([[mail]]);
s.Bestil("Kaffe");

interface IMailSender { void Send(string tekst); }

class TestMail : IMailSender
{
    public void Send(string tekst) { Console.WriteLine($"(test) {tekst}"); }
}

class OrdreService
{
    private readonly [[IMailSender]] mailSender;

    public OrdreService(IMailSender mailSender)
    {
        [[this]].mailSender = mailSender;
    }

    public void Bestil(string vare)
    {
        mailSender.Send($"Tak for din ordre: {vare}");
    }
}`,
        output: "(test) Tak for din ordre: Kaffe",
        fordi: "Objektet sendes ind i konstruktøren og gemmes i et felt af **interface-typen**. `this.mailSender` er feltet, `mailSender` alene er parameteren. Klassen ved ikke, at det er en `TestMail` — i det rigtige program kunne det være en, der sender rigtige mails." },
      { t: "valg", q: "Hvilket mønster passer: \"Når en ordre bliver betalt, skal lageret, regnskabet og kunden have besked. Ordren skal ikke kende dem.\"",
        svar: ["Observer", "Singleton", "Factory", "Repository"],
        ret: 0,
        fordi: "Ét objekt (ordren) skal give besked til flere lyttere uden at kende dem. Det er **Observer** — i C# et `event`, som lager, regnskab og kunde melder sig til med `+=`." },
      { t: "laes", h: "SOLID: fem principper for god kode",
        md: "**SOLID** er fem principper, der gør objektorienteret kode lettere at ændre og teste. Censor spørger tit til dem. Lær **betydningen**, ikke ordene udenad.\n\n- **S — Single responsibility**: en klasse har **én** opgave. `Faktura` regner beløbet; en anden klasse gemmer den i en fil.\n- **O — Open/closed**: åben for udvidelse, lukket for ændring. Ny figur? Lav en ny klasse, der implementerer `IFigur` — ret ikke i den gamle kode.\n- **L — Liskov substitution**: en afledt klasse skal kunne bruges alle steder, hvor basisklassen kan. Kaster `Pingvin.Flyv()` en exception, er `Pingvin : Fugl` forkert arv.\n- **I — Interface segregation**: hellere flere små interfaces (`IKanFlyve`, `IKanSvoemme`) end ét stort, hvor klasser må implementere metoder, de ikke kan bruge.\n- **D — Dependency inversion**: afhæng af interfaces, ikke af konkrete klasser. `ProduktService` kender `IProduktRepository`, ikke `SqlProduktRepository`. Dependency Injection er måden, man gør det på.",
        noter: [
          ["S", "Én klasse — én opgave — én grund til at ændre den."],
          ["O", "Udvid med nye klasser i stedet for at rette i gamle."],
          ["L", "Underklassen skal opføre sig som basisklassen lover."],
          ["I", "Små, præcise interfaces."],
          ["D", "Afhæng af interfaces. Få objekterne udefra (DI)."]
        ] },
      { t: "valg", q: "Klassen nedenfor regner momsen ud, skriver fakturaen på skærmen **og** gemmer den i en fil. Hvilket SOLID-princip bryder den?",
        kode: R`class Faktura
{
    public decimal Beloeb { get; set; }
    public decimal Moms() { return Beloeb * 0.25m; }
    public void Udskriv() { Console.WriteLine($"Beløb: {Beloeb}"); }
    public void GemIFil() { File.WriteAllText("faktura.txt", Beloeb.ToString()); }
}`,
        omkring: ["new Faktura();", ""],
        svar: ["S — Single responsibility", "O — Open/closed", "L — Liskov substitution", "I — Interface segregation"],
        ret: 0,
        fordi: "Klassen har tre opgaver: beregning, visning og lagring. Skal filformatet ændres, må du rette i den samme klasse som beregningen. Del den op: `Faktura` regner, `FakturaPrinter` viser, `FakturaRepository` gemmer." },
      { t: "valg", q: "Hvilket SOLID-princip bryder denne klasse, og hvordan retter du det?",
        kode: R`class KundeService
{
    private SqlKundeRepository repo = new SqlKundeRepository();
}

class SqlKundeRepository { }`,
        omkring: ["new KundeService();", ""],
        svar: [
          "D — den laver selv en konkret klasse med `new`. Den burde få et `IKundeRepository` gennem konstruktøren",
          "S — den har for mange opgaver. Den burde deles i to klasser",
          "L — `SqlKundeRepository` burde arve fra `KundeService`",
          "I — interfacet er for stort. Det burde deles op"
        ],
        ret: 0,
        fordi: "`KundeService` er bundet til SQL-udgaven og kan ikke testes med en liste i stedet. Med et interface og **Dependency Injection** bliver den uafhængig: `public KundeService(IKundeRepository repo) { this.repo = repo; }`." },
      { t: "ide", h: "Byg selv: Factory og Observer",
        md: "Lav et Console-projekt, `Moenstre`. Skriv koden af, og kør den. Bagefter: tilføj en `Fugl`, der siger `Pip`, så kun **factory'en** skal ændres (Open/closed).",
        kode: R`Zoo zoo = new Zoo();
zoo.DyrTilfoejet += Log;

string[] typer = { "kat", "hund" };
foreach (string type in typer)
{
    zoo.Tilfoej(DyrFactory.Lav(type));
}
Console.WriteLine($"Dyr i zoo: {zoo.Antal}");

static void Log(IDyr d)
{
    Console.WriteLine($"Nyt dyr siger: {d.Lyd()}");
}

interface IDyr { string Lyd(); }
class Kat : IDyr { public string Lyd() { return "Mjav"; } }
class Hund : IDyr { public string Lyd() { return "Vov"; } }

static class DyrFactory
{
    public static IDyr Lav(string type)
    {
        if (type == "kat") return new Kat();
        if (type == "hund") return new Hund();
        throw new ArgumentException($"Kender ikke {type}");
    }
}

class Zoo
{
    private List<IDyr> dyr = new List<IDyr>();
    public event Action<IDyr>? DyrTilfoejet;
    public int Antal { get { return dyr.Count; } }

    public void Tilfoej(IDyr d)
    {
        dyr.Add(d);
        DyrTilfoejet?.Invoke(d);
    }
}`,
        output: "Nyt dyr siger: Mjav\nNyt dyr siger: Vov\nDyr i zoo: 2",
        md2: "Sæt et breakpoint i `Log`, og se i {{**Call Stack**||**Frames**}}, at det er `Zoo.Tilfoej`, der har kaldt den — gennem eventet." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er Dependency Injection, og hvilket SOLID-princip hjælper det med?",
        svar: "**Dependency Injection** betyder, at en klasse ikke selv laver de objekter, den afhænger af, med `new`. Den får dem **udefra**, typisk gennem **konstruktøren**, og parameteren er et **interface**, fx `IProduktRepository`. Så er klassen ikke bundet til én bestemt implementering: i det rigtige program får den et repository, der bruger databasen, og i en test en liste. Det er **D** i SOLID, **Dependency inversion**: afhæng af interfaces, ikke af konkrete klasser. I ASP.NET Core registrerer man klasserne i `Program.cs`, og så sørger frameworket for at sende dem ind.",
        noegle: ["udefra", "konstruktøren", "interface", "new", "Dependency inversion", "Program.cs"] }
    ] },
  // ------------------------------------------------------------------
  { id: "m11l6", titel: "Lagdelt arkitektur og class libraries", min: 18,
    ord: [
      ["Arkitektur", "Den overordnede opdeling af et program: hvilke dele der findes, og hvem der må tale med hvem."],
      ["Lagdelt arkitektur", "Programmet deles i lag: præsentation, forretningslogik og data. Hvert lag taler kun med laget lige under."],
      ["Præsentationslag", "Det, brugeren ser og bruger: konsollen, en MVC-controller med views, en Blazor-side."],
      ["Forretningslag", "Reglerne: beregninger, validering, hvad der må og ikke må. Kaldes også business-laget eller service-laget."],
      ["Datalag", "Koden, der henter og gemmer data, fx et repository eller EF Core's DbContext."],
      ["Class Library", "Et projekt uden `Main`, der kun indeholder klasser. Andre projekter kan bruge det via en reference."],
      ["Projektreference", "At ét projekt får lov til at bruge de `public` klasser i et andet projekt i samme solution."]
    ],
    trin: [
      { t: "laes", h: "Tre lag",
        md: "Små programmer kan stå i én fil. Store programmer bliver uoverskuelige, hvis brugerflade, regler og database er blandet sammen. Derfor deler man dem i **lag**:\n\n1. **Præsentationslaget** — det, brugeren ser: konsollen, en MVC-controller og dens views.\n2. **Forretningslaget** — reglerne: beregninger, validering, rabatter.\n3. **Datalaget** — hentning og lagring: et repository, en database.\n\nHvert lag taler **kun med laget lige under**. Præsentationen spørger forretningslaget; forretningslaget spørger datalaget. Aldrig omvendt.\n\n**Hvorfor?** Du kan skifte en del ud uden at røre resten: fra konsol til hjemmeside, eller fra en liste til SQL Server. Reglerne står ét sted, så de ikke skal skrives to gange. Og du kan teste reglerne uden en database.",
        noter: [
          ["Præsentation", "Console, MVC-controller + views, Blazor-sider."],
          ["Forretning", "Services med regler og validering."],
          ["Data", "Repository, DbContext, filer."]
        ] },
      { t: "valg", q: "Webshoppen giver 10 % rabat på ordrer over 500 kr. I hvilket lag hører den regel hjemme?",
        svar: ["Forretningslaget", "Præsentationslaget", "Datalaget", "I databasen"],
        ret: 0,
        fordi: "En rabatregel er **forretningslogik**. Står den i forretningslaget, gælder den, uanset om ordren kommer fra hjemmesiden, en app eller en Web API — og den kan testes uden brugerflade og database." },
      { t: "laes", h: "Tre lag i kode",
        md: "Her er de tre lag som tre klasser. I et rigtigt projekt ligger de i hver sin mappe eller hvert sit projekt. Læg mærke til, hvem der kender hvem: `Program` kender kun servicen, og servicen kender kun repository-interfacet.",
        kode: R`// Præsentationslag
OrdreService service = new OrdreService(new OrdreRepository());
Console.WriteLine($"Pris for ordre 1: {service.PrisMedRabat(1)} kr.");
Console.WriteLine($"Pris for ordre 2: {service.PrisMedRabat(2)} kr.");

// Forretningslag
class OrdreService
{
    private readonly IOrdreRepository repo;
    public OrdreService(IOrdreRepository repo) { this.repo = repo; }

    public decimal PrisMedRabat(int id)
    {
        decimal beloeb = repo.HentBeloeb(id);
        if (beloeb > 500)
        {
            return beloeb * 0.9m;
        }
        return beloeb;
    }
}

// Datalag
interface IOrdreRepository
{
    decimal HentBeloeb(int id);
}

class OrdreRepository : IOrdreRepository
{
    private Dictionary<int, decimal> ordrer = new Dictionary<int, decimal> { { 1, 400m }, { 2, 800m } };
    public decimal HentBeloeb(int id) { return ordrer[id]; }
}`,
        noter: [
          ["Præsentationslag", "Viser resultatet. Ingen regler, ingen data."],
          ["Forretningslag", "Rabatreglen. Ved ikke, hvor beløbet kommer fra."],
          ["Datalag", "Ved kun, hvordan data hentes. Her en `Dictionary`; senere en database."]
        ],
        output: "Pris for ordre 1: 400 kr.\nPris for ordre 2: 720,0 kr." },
      { t: "forudsig", q: "Samme opdeling i tre lag. Hvad skriver programmet?",
        kode: R`// Præsentationslag
ElevService s = new ElevService(new ElevRepository());
Console.WriteLine(s.Status("Ali"));
Console.WriteLine(s.Status("Maja"));

// Forretningslag
class ElevService
{
    private readonly IElevRepository repo;
    public ElevService(IElevRepository repo) { this.repo = repo; }

    public string Status(string navn)
    {
        int k = repo.HentKarakter(navn);
        return k >= 2 ? $"{navn}: bestået" : $"{navn}: ikke bestået";
    }
}

// Datalag
interface IElevRepository { int HentKarakter(string navn); }

class ElevRepository : IElevRepository
{
    public int HentKarakter(string navn) { return navn == "Ali" ? 0 : 10; }
}`,
        output: "Ali: ikke bestået\nMaja: bestået",
        fordi: "Datalaget giver Ali 0 og Maja 10. Forretningslaget bestemmer reglen: 02 eller mere er bestået. Præsentationslaget skriver bare resultatet." },
      { t: "valg", q: "Hvilken retning må kaldene gå i en lagdelt arkitektur?",
        svar: [
          "Præsentation → forretning → data",
          "Data → forretning → præsentation",
          "Alle lag må kalde alle lag",
          "Præsentation → data, uden om forretningslaget"
        ],
        ret: 0,
        fordi: "Hvert lag kalder kun laget **under** sig. Datalaget ved intet om, hvem der bruger det. Springer præsentationen direkte til data, kommer reglerne til at stå i brugerfladen — og så skal de skrives igen i næste brugerflade." },
      { t: "laes", h: "MVC: et arkitekturmønster",
        md: "**MVC** (Model–View–Controller), som du bruger fra modul 16, er også et **arkitekturmønster**. Det deler præsentationen i tre dele:\n\n- **Model** — klasserne med data, fx `Produkt`.\n- **View** — HTML-siden, der viser data (en `.cshtml`-fil).\n- **Controller** — modtager brugerens forespørgsel, henter data og vælger, hvilket view der skal vises.\n\nI et godt projekt kombinerer du det med lagene: **controlleren** er en del af præsentationslaget og kalder en **service** (forretningslaget), som bruger et **repository** eller EF Core's `DbContext` (datalaget). Servicen og repository'et får controlleren gennem **Dependency Injection**.",
        noter: [
          ["Model", "Data og deres struktur."],
          ["View", "Det, brugeren ser."],
          ["Controller", "Tager imod forespørgslen og styrer, hvad der sker."]
        ] },
      { t: "valg", q: "Brugeren går ind på `/Produkter`. Hvilken del af MVC tager imod forespørgslen og bestemmer, hvad der skal ske?",
        svar: ["Controlleren", "Viewet", "Modellen", "Databasen"],
        ret: 0,
        fordi: "**Controlleren** modtager forespørgslen, henter data (gennem en service) og sender dem til et **view**, der laver HTML'en. **Modellen** er bare data-klasserne." },
      { t: "laes", h: "Class libraries: ét lag, ét projekt",
        md: "I større løsninger lægger man hvert lag i sit **eget projekt** i samme **solution**. Projekterne til forretning og data er af typen **Class Library**: de har ingen `Main` og kan ikke køres alene — de indeholder kun klasser.\n\nFor at et projekt må bruge et andet, skal det have en **projektreference**. Referencerne følger lagene: `Butik.App` → `Butik.Logik` → `Butik.Data`. Compileren **forhindrer** så, at datalaget kommer til at bruge præsentationen: den reference findes ikke.\n\nKun klasser med **`public`** kan ses fra andre projekter. Uden `public` er en klasse `internal`: kun synlig inde i sit eget projekt.",
        noter: [
          ["Solution", "Mappen, der samler flere projekter. Det er den, du åbner i {{Visual Studio||Rider}}."],
          ["Class Library", "Projekt-type uden `Main`. Bliver til en `.dll`-fil."],
          ["Projektreference", "\"Dette projekt må bruge de `public` klasser i det andet.\""],
          ["public class", "Skal stå på alle klasser, et andet projekt skal bruge."]
        ] },
      { t: "ide", h: "Lav en Class Library, og brug den",
        md: "Du laver en solution med to projekter: en konsol-app og et forretningslag.",
        win: [
          "Lav et nyt Console-projekt, der hedder `Butik.App`.",
          "Højreklik på **solutionen** (øverste linje) i **Solution Explorer** → **Add** → **New Project…**.",
          "Søg efter **Class Library** (C#), vælg den, og klik **Next**. Kald den `Butik.Logik`, klik **Next**, vælg **.NET 10**, og klik **Create**.",
          "Omdøb `Class1.cs` til `PrisBeregner.cs`, og skriv klassen fra koden nedenfor (den med `namespace Butik.Logik;`).",
          "Højreklik på **Dependencies** under `Butik.App` → **Add Project Reference…** → sæt flueben ved `Butik.Logik` → **OK**.",
          "Skriv `Program.cs` i `Butik.App` som nedenfor, og kør med **F5**. Er `Butik.App` ikke fed i Solution Explorer, så højreklik på den og vælg **Set as Startup Project**."
        ],
        mac: [
          "Lav en ny solution med et Console-projekt, der hedder `Butik.App`.",
          "Højreklik på **solutionen** (øverste linje) i vinduet **Explorer** til venstre → **Add** → **New Project…**.",
          "Vælg **Class Library**, kald den `Butik.Logik`, vælg **.NET 10**, og klik **Create**.",
          "Omdøb `Class1.cs` til `PrisBeregner.cs`, og skriv klassen fra koden nedenfor (den med `namespace Butik.Logik;`).",
          "Højreklik på projektet `Butik.App` → **Add** → **Reference…** → sæt flueben ved `Butik.Logik` → **Add**. (Kan du ikke finde menuen, så åbn **Terminal** nederst i Rider, og skriv `dotnet add Butik.App reference Butik.Logik`.)",
          "Skriv `Program.cs` i `Butik.App` som nedenfor, og kør med den grønne ▶. Vælg `Butik.App` i listen øverst, hvis der står noget andet."
        ],
        kode: R`// Butik.App / Program.cs
using Butik.Logik;

PrisBeregner beregner = new PrisBeregner();
Console.WriteLine(beregner.MedMoms(100m));
Console.WriteLine(beregner.MedRabat(800m));

// Butik.Logik / PrisBeregner.cs
namespace Butik.Logik
{
    public class PrisBeregner
    {
        public decimal MedMoms(decimal pris)
        {
            return pris * 1.25m;
        }

        public decimal MedRabat(decimal pris)
        {
            return pris > 500 ? pris * 0.9m : pris;
        }
    }
}`,
        output: "125,00\n720,0",
        md2: "I din egen fil skriver du `namespace Butik.Logik;` med semikolon øverst i `PrisBeregner.cs` — det er den korte form af tuborgklammerne ovenfor. Prøv at slette `public` foran `class PrisBeregner`, og byg igen: nu kan `Butik.App` ikke se klassen." },
      { t: "valg", q: "Du har lavet en projektreference fra `Butik.App` til `Butik.Logik`, men får fejlen CS0122: *'PrisBeregner' is inaccessible due to its protection level*. Hvad mangler?",
        svar: ["`public` foran `class PrisBeregner`", "En `Main`-metode i `Butik.Logik`", "En reference fra `Butik.Logik` til `Butik.App`", "Et `static` foran klassen"],
        ret: 0,
        fordi: "En klasse uden adgangsord er `internal`: kun synlig i sit eget projekt. Det er netop `public`, der gør den synlig for andre projekter. En reference den anden vej ville bryde lagdelingen." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er lagdelt arkitektur, og hvorfor bruger man den?",
        svar: "I en **lagdelt arkitektur** deler man programmet i et **præsentationslag** (det, brugeren ser, fx MVC-controllere og views), et **forretningslag** (regler og validering i services) og et **datalag** (repositories eller DbContext). Hvert lag kalder kun **laget under**. Fordelen er, at man kan **skifte en del ud** uden at røre resten — fx fra en liste til en database — at reglerne kun står ét sted, og at man kan **teste** forretningslogikken uden brugerflade og database. Lagene kan ligge i hver sin **Class Library** med projektreferencer, så compileren sikrer retningen.",
        noegle: ["præsentation", "forretning", "data", "laget under", "skifte ud", "teste"] }
    ] },
  // ------------------------------------------------------------------
  { id: "m11v", titel: "Værksted: fejl, regex, algoritmer og lag", vaerksted: true, min: 90, ord: [],
    trin: [
      { t: "laes", h: "Sådan arbejder du i værkstedet",
        md: "Nu skal du skrive **hele programmer selv** i {{Visual Studio||Rider}} med exceptions, regex, sortering og lag.\n\nDen første opgave er let. Den tredje er en fejlfinding, hvor du skal bruge debuggeren. Den sidste samler hele modulet i ét program.",
        noter: [
          ["Skriv selv", "Skriv koden med dine egne fingre. Kopiér ikke fra lektionerne."],
          ["Kør tit", "Kør efter hver lille del. Så ved du præcis, hvilken del der giver det forkerte."],
          ["Brug debuggeren", "Sæt et **breakpoint**, og gå frem med Step Over og Step Into. Tilføj en **Watch** på det, du er i tvivl om. Så **ser** du værdierne i stedet for at gætte."],
          ["Regex", "Husk `using System.Text.RegularExpressions;` øverst, og `@` foran mønstret."],
          ["Tips før løsning", "Åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af."]
        ] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Sikker indlæsning", projekt: "SikkerInput",
        md: "Programmet får fem tekster, som en bruger har skrevet. Nogle er tal, andre ikke. Lav hver tekst om til et tal med `int.Parse`, og fang fejlen med `try`/`catch`, så programmet ikke går ned.",
        krav: [
          "Teksterne er `string[] input = { \"12\", \"abc\", \"7\", \"\", \"30\" };`",
          "Gennemløb dem med `foreach`. Brug `int.Parse` inde i en `try`-blok",
          "Lykkes det, lægges tallet til `sum`, og der skrives `\"12\" er gemt` (med anførselstegn om teksten)",
          "Kaster `int.Parse` en `FormatException`, skrives `\"abc\" er ikke et tal`",
          "Til sidst skrives `Sum: ` og summen"
        ],
        tip: [
          "Læg hele `try`/`catch` **inde i** `foreach`, så én fejl ikke stopper resten.",
          "Anførselstegn inde i en tekst skrives `\\\"`: `Console.WriteLine($\"\\\"{s}\\\" er gemt\");`.",
          "`catch (FormatException) { Console.WriteLine($\"\\\"{s}\\\" er ikke et tal\"); }`. En tom tekst `\"\"` giver også en `FormatException`."
        ],
        output: "\"12\" er gemt\n\"abc\" er ikke et tal\n\"7\" er gemt\n\"\" er ikke et tal\n\"30\" er gemt\nSum: 49",
        loesning: R`string[] input = { "12", "abc", "7", "", "30" };
int sum = 0;

foreach (string s in input)
{
    try
    {
        int tal = int.Parse(s);
        sum += tal;
        Console.WriteLine($"\"{s}\" er gemt");
    }
    catch (FormatException)
    {
        Console.WriteLine($"\"{s}\" er ikke et tal");
    }
}

Console.WriteLine($"Sum: {sum}");`,
        ekstra: ["Skriv programmet om, så det bruger `int.TryParse(s, out int tal)` i stedet for `try`/`catch`. Hvilken udgave er lettest at læse?", "Tilføj en `finally`-blok, der tæller, hvor mange tekster der er forsøgt, og skriv `Forsøgt: 5` til sidst."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Tjek tilmeldingerne", projekt: "Tilmeldinger",
        md: "En klub har fået fire tilmeldinger. Kontrollér postnummer, telefon og e-mail med regulære udtryk, og skriv for hver person, om tilmeldingen er OK, eller hvilke felter der er forkerte.",
        krav: [
          "Klassen `Tilmelding` har auto-properties `Navn`, `Postnr`, `Telefon` og `Email` (alle `string`, med `= \"\"`)",
          "Tilmeldingerne, i denne rækkefølge: Anna/8000/12345678/anna@mail.dk, Bo/800/+4587654321/bo@mail, Carl/5000/1234 5678/carl@firma.com, Dina/2100x/+45 12345678/dina.d@kbh.dk",
          "Postnummer: `^\\d{4}$`. Telefon: `^(\\+45)?\\d{8}$`. E-mail: `^[\\w.-]+@[\\w-]+\\.[a-z]{2,}$`",
          "Er alt i orden, skrives `{Navn}: OK`",
          "Ellers skrives `{Navn}: fejl i ` og de forkerte felter i rækkefølgen `postnummer`, `telefon`, `e-mail`, adskilt af `, `",
          "Til sidst: `Gyldige: {antal} af {i alt}`"
        ],
        tip: [
          "Lav en `List<string> fejl = new List<string>();` for hver tilmelding, og læg feltets navn i den, når et mønster **ikke** passer: `if (!Regex.IsMatch(t.Postnr, @\"^\\d{4}$\")) fejl.Add(\"postnummer\");`.",
          "Efter de tre tjek: er `fejl.Count == 0`, er alt OK, og du tæller `gyldige` op. Ellers: `string.Join(\", \", fejl)`.",
          "Bo har et gyldigt telefonnummer (`+45` er valgfrit), men forkert postnummer og e-mail. Dinas telefon har et mellemrum efter `+45`, og det tillader mønstret ikke."
        ],
        output: "Anna: OK\nBo: fejl i postnummer, e-mail\nCarl: fejl i telefon\nDina: fejl i postnummer, telefon\nGyldige: 1 af 4",
        loesning: R`using System.Text.RegularExpressions;

List<Tilmelding> tilmeldinger = new List<Tilmelding>
{
    new Tilmelding { Navn = "Anna", Postnr = "8000", Telefon = "12345678", Email = "anna@mail.dk" },
    new Tilmelding { Navn = "Bo", Postnr = "800", Telefon = "+4587654321", Email = "bo@mail" },
    new Tilmelding { Navn = "Carl", Postnr = "5000", Telefon = "1234 5678", Email = "carl@firma.com" },
    new Tilmelding { Navn = "Dina", Postnr = "2100x", Telefon = "+45 12345678", Email = "dina.d@kbh.dk" }
};

int gyldige = 0;
foreach (Tilmelding t in tilmeldinger)
{
    List<string> fejl = new List<string>();
    if (!Regex.IsMatch(t.Postnr, @"^\d{4}$"))
    {
        fejl.Add("postnummer");
    }
    if (!Regex.IsMatch(t.Telefon, @"^(\+45)?\d{8}$"))
    {
        fejl.Add("telefon");
    }
    if (!Regex.IsMatch(t.Email, @"^[\w.-]+@[\w-]+\.[a-z]{2,}$"))
    {
        fejl.Add("e-mail");
    }

    if (fejl.Count == 0)
    {
        Console.WriteLine($"{t.Navn}: OK");
        gyldige++;
    }
    else
    {
        Console.WriteLine($"{t.Navn}: fejl i {string.Join(", ", fejl)}");
    }
}
Console.WriteLine($"Gyldige: {gyldige} af {tilmeldinger.Count}");

class Tilmelding
{
    public string Navn { get; set; } = "";
    public string Postnr { get; set; } = "";
    public string Telefon { get; set; } = "";
    public string Email { get; set; } = "";
}`,
        ekstra: ["Tillad et mellemrum efter `+45` ved at ændre telefon-mønstret til `^(\\+45 ?)?\\d{8}$`. Hvem bliver så gyldig?", "Flyt de tre tjek ind i en metode `static List<string> Valider(Tilmelding t)`."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Fejlfinding: sorteringen glemmer et tal", projekt: "SorterFejl",
        md: "Programmet skal sortere tallene 7, 3, 9, 1, 5 med bubble sort og skrive `1 3 5 7 9`. Men det skriver `7 1 3 5 9`: 7-tallet bliver stående forrest.\n\nProgrammet kan oversættes. Find fejlen **med debuggeren**:\n\n1. Kopiér koden ind i Program.cs, og kør den. Se den forkerte udskrift.\n2. Sæt et **breakpoint** på linjen `if (t[j] > t[j + 1])`.\n3. Start med debuggeren ({{**F5**||den **grønne bille** 🐞}}). Tilføj **watches** på `j`, `t[j]` og `t[j + 1]`.\n4. Fortsæt fra stop til stop. Skriv på et papir, hvilke værdier `j` får i den første gennemgang. Hvilket par naboer bliver **aldrig** sammenlignet?",
        krav: [
          "Find ud af, hvilke værdier `j` får, og hvorfor `t[0]` aldrig bliver sammenlignet",
          "Ret fejlen med så lille en ændring som muligt",
          "Programmet skriver `Før: 7 3 9 1 5` og `Efter: 1 3 5 7 9`"
        ],
        start: R`int[] tal = { 7, 3, 9, 1, 5 };
Console.WriteLine($"Før: {string.Join(" ", tal)}");
Sorter(tal);
Console.WriteLine($"Efter: {string.Join(" ", tal)}");

static void Sorter(int[] t)
{
    for (int i = 0; i < t.Length - 1; i++)
    {
        for (int j = 1; j < t.Length - 1 - i; j++)
        {
            if (t[j] > t[j + 1])
            {
                int temp = t[j];
                t[j] = t[j + 1];
                t[j + 1] = temp;
            }
        }
    }
}`,
        startOutput: "Før: 7 3 9 1 5\nEfter: 7 1 3 5 9",
        tip: [
          "Se på `j` første gang, programmet stopper. Hvilket tal starter `j` på?",
          "`j` starter på 1, så det første par, der sammenlignes, er `t[1]` og `t[2]`. Parret `t[0]` og `t[1]` bliver aldrig sammenlignet — derfor står 7 fast.",
          "Ret `int j = 1` til `int j = 0`."
        ],
        output: "Før: 7 3 9 1 5\nEfter: 1 3 5 7 9",
        loesning: R`int[] tal = { 7, 3, 9, 1, 5 };
Console.WriteLine($"Før: {string.Join(" ", tal)}");
Sorter(tal);
Console.WriteLine($"Efter: {string.Join(" ", tal)}");

static void Sorter(int[] t)
{
    for (int i = 0; i < t.Length - 1; i++)
    {
        for (int j = 0; j < t.Length - 1 - i; j++)
        {
            if (t[j] > t[j + 1])
            {
                int temp = t[j];
                t[j] = t[j + 1];
                t[j + 1] = temp;
            }
        }
    }
}`,
        ekstra: ["Tæl, hvor mange ombytninger sorteringen laver, og skriv tallet ud.", "Stop sorteringen tidligt: hvis en hel gennemgang ikke bytter noget, er arrayet sorteret. Brug en `bool byttet`."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Bankkonto med egen exception", projekt: "Bank",
        md: "Lav en bankkonto, der kaster exceptions, når noget er ugyldigt, og et program, der gennemfører en række posteringer og fanger fejlene.",
        krav: [
          "Klassen `IkkeDaekningException` arver fra `Exception` og har en konstruktør, der tager en `string besked` og sender den til `base`",
          "Klassen `Konto` har `public decimal Saldo { get; private set; }` og en konstruktør, der tager startsaldoen",
          "`Indsaet(decimal beloeb)`: er beløbet 0 eller mindre, kastes `ArgumentException(\"Beløbet skal være større end 0\")`. Ellers lægges beløbet til saldoen",
          "`Haev(decimal beloeb)`: samme `ArgumentException` for 0 eller mindre. Er beløbet større end saldoen, kastes `IkkeDaekningException($\"Der mangler {beloeb - Saldo} kr.\")`. Ellers trækkes beløbet fra",
          "Kontoen starter med 500. Posteringerne er `decimal[] posteringer = { 200, -300, -600, 0, -100 };` — positive er indsættelser, alle andre er hævninger (af `-p`)",
          "For hver postering: lykkes den, skrives `OK: {p} kr. Saldo: {Saldo} kr.`. En `IkkeDaekningException` giver `Afvist: {besked}`, en `ArgumentException` giver `Ugyldig: {besked}`",
          "Til sidst: `Slutsaldo: {Saldo} kr.`"
        ],
        tip: [
          "Start med klassen `Konto` og de to metoder. Kør med én postering ad gangen.",
          "I løkken: `if (p > 0) { konto.Indsaet(p); } else { konto.Haev(-p); }` inde i `try`. Skriv `OK:`-linjen lige efter, også inde i `try` — så bliver den sprunget over, når der kastes.",
          "Egen exception: `class IkkeDaekningException : Exception { public IkkeDaekningException(string besked) : base(besked) { } }`. To catch-blokke: `catch (IkkeDaekningException e)` og `catch (ArgumentException e)`."
        ],
        output: "OK: 200 kr. Saldo: 700 kr.\nOK: -300 kr. Saldo: 400 kr.\nAfvist: Der mangler 200 kr.\nUgyldig: Beløbet skal være større end 0\nOK: -100 kr. Saldo: 300 kr.\nSlutsaldo: 300 kr.",
        loesning: R`Konto konto = new Konto(500);
decimal[] posteringer = { 200, -300, -600, 0, -100 };

foreach (decimal p in posteringer)
{
    try
    {
        if (p > 0)
        {
            konto.Indsaet(p);
        }
        else
        {
            konto.Haev(-p);
        }
        Console.WriteLine($"OK: {p} kr. Saldo: {konto.Saldo} kr.");
    }
    catch (IkkeDaekningException e)
    {
        Console.WriteLine($"Afvist: {e.Message}");
    }
    catch (ArgumentException e)
    {
        Console.WriteLine($"Ugyldig: {e.Message}");
    }
}
Console.WriteLine($"Slutsaldo: {konto.Saldo} kr.");

class Konto
{
    public decimal Saldo { get; private set; }

    public Konto(decimal startsaldo)
    {
        Saldo = startsaldo;
    }

    public void Indsaet(decimal beloeb)
    {
        if (beloeb <= 0)
        {
            throw new ArgumentException("Beløbet skal være større end 0");
        }
        Saldo += beloeb;
    }

    public void Haev(decimal beloeb)
    {
        if (beloeb <= 0)
        {
            throw new ArgumentException("Beløbet skal være større end 0");
        }
        if (beloeb > Saldo)
        {
            throw new IkkeDaekningException($"Der mangler {beloeb - Saldo} kr.");
        }
        Saldo -= beloeb;
    }
}

class IkkeDaekningException : Exception
{
    public IkkeDaekningException(string besked) : base(besked) { }
}`,
        ekstra: ["Sæt et breakpoint i `Haev`, og brug Step Into på `-600`. Se i {{Locals||Threads & Variables}}, at `Saldo` er uændret, når exceptionen bliver kastet.", "Tilføj en `finally`-blok, der tæller posteringerne, og skriv `Posteringer: 5` til sidst."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Samlet program: medlemsregisteret", projekt: "Medlemmer",
        md: "Byg et lille medlemsregister i **tre lag** med et repository, Dependency Injection, validering med regex, din egen exception og din egen sortering. Alt kan stå i Program.cs, men hold lagene adskilt.",
        krav: [
          "`Medlem` har auto-properties `Navn` (`string`), `Email` (`string`) og `Alder` (`int`)",
          "Datalag: `interface IMedlemRepository` med `void Tilfoej(Medlem m)` og `List<Medlem> HentAlle()`, og klassen `HukommelsesRepository`, der gemmer i en `List<Medlem>`",
          "`ValideringException` arver fra `Exception` (som i forrige opgave)",
          "Forretningslag: `MedlemService` får et `IMedlemRepository` gennem konstruktøren. Metoden `Opret(string navn, string email, int alder)` kaster `ValideringException` med beskeden `Navn mangler` (tomt navn), `Ugyldig e-mail: {email}` (mønstret `^[\\w.-]+@[\\w-]+\\.[a-z]{2,}$`) eller `Skal være mindst 15 år`, i den rækkefølge. Ellers gemmes medlemmet",
          "`MedlemService` har også `List<Medlem> SorteretEfterAlder()`, der henter alle og sorterer dem efter alder (yngst først) med **din egen** bubble sort",
          "Præsentationslag: opret i denne rækkefølge Anna/anna@klub.dk/34, Bo/bo@klub/22, \"\"/x@y.dk/40, Carl/carl@klub.dk/12, Dina/dina@klub.dk/20, Emil/emil.e@klub.dk/51. Skriv `Oprettet: {navn}` eller `Afvist: {besked}` for hver",
          "Skriv derefter `Medlemmer efter alder:` og én linje pr. medlem: `  {Alder} år: {Navn}` (to mellemrum foran)",
          "Til sidst: `Gennemsnitsalder: {gennemsnit}` (brug `Average` fra LINQ)"
        ],
        tip: [
          "Byg nedefra: først `Medlem`, interfacet og repository'et. Så `MedlemService` med `Opret`. Kør efter hvert lag.",
          "Lav en lille metode i præsentationslaget, så du ikke skriver `try`/`catch` seks gange: `static void ForsoegOpret(MedlemService s, string navn, string email, int alder) { try { s.Opret(navn, email, alder); Console.WriteLine($\"Oprettet: {navn}\"); } catch (ValideringException e) { Console.WriteLine($\"Afvist: {e.Message}\"); } }`.",
          "Bubble sort på en liste af objekter: sammenlign `liste[j].Alder > liste[j + 1].Alder`, og byt hele objekterne med en `Medlem temp`. Brug `liste.Count` i stedet for `Length`."
        ],
        output: "Oprettet: Anna\nAfvist: Ugyldig e-mail: bo@klub\nAfvist: Navn mangler\nAfvist: Skal være mindst 15 år\nOprettet: Dina\nOprettet: Emil\nMedlemmer efter alder:\n  20 år: Dina\n  34 år: Anna\n  51 år: Emil\nGennemsnitsalder: 35",
        loesning: R`using System.Text.RegularExpressions;

// Præsentationslag
MedlemService service = new MedlemService(new HukommelsesRepository());

ForsoegOpret(service, "Anna", "anna@klub.dk", 34);
ForsoegOpret(service, "Bo", "bo@klub", 22);
ForsoegOpret(service, "", "x@y.dk", 40);
ForsoegOpret(service, "Carl", "carl@klub.dk", 12);
ForsoegOpret(service, "Dina", "dina@klub.dk", 20);
ForsoegOpret(service, "Emil", "emil.e@klub.dk", 51);

List<Medlem> sorteret = service.SorteretEfterAlder();
Console.WriteLine("Medlemmer efter alder:");
foreach (Medlem m in sorteret)
{
    Console.WriteLine($"  {m.Alder} år: {m.Navn}");
}
Console.WriteLine($"Gennemsnitsalder: {sorteret.Average(m => m.Alder)}");

static void ForsoegOpret(MedlemService s, string navn, string email, int alder)
{
    try
    {
        s.Opret(navn, email, alder);
        Console.WriteLine($"Oprettet: {navn}");
    }
    catch (ValideringException e)
    {
        Console.WriteLine($"Afvist: {e.Message}");
    }
}

// Forretningslag
class MedlemService
{
    private readonly IMedlemRepository repo;

    public MedlemService(IMedlemRepository repo)
    {
        this.repo = repo;
    }

    public void Opret(string navn, string email, int alder)
    {
        if (navn == "")
        {
            throw new ValideringException("Navn mangler");
        }
        if (!Regex.IsMatch(email, @"^[\w.-]+@[\w-]+\.[a-z]{2,}$"))
        {
            throw new ValideringException($"Ugyldig e-mail: {email}");
        }
        if (alder < 15)
        {
            throw new ValideringException("Skal være mindst 15 år");
        }
        repo.Tilfoej(new Medlem { Navn = navn, Email = email, Alder = alder });
    }

    public List<Medlem> SorteretEfterAlder()
    {
        List<Medlem> liste = repo.HentAlle();
        for (int i = 0; i < liste.Count - 1; i++)
        {
            for (int j = 0; j < liste.Count - 1 - i; j++)
            {
                if (liste[j].Alder > liste[j + 1].Alder)
                {
                    Medlem temp = liste[j];
                    liste[j] = liste[j + 1];
                    liste[j + 1] = temp;
                }
            }
        }
        return liste;
    }
}

class ValideringException : Exception
{
    public ValideringException(string besked) : base(besked) { }
}

// Datalag
class Medlem
{
    public string Navn { get; set; } = "";
    public string Email { get; set; } = "";
    public int Alder { get; set; }
}

interface IMedlemRepository
{
    void Tilfoej(Medlem m);
    List<Medlem> HentAlle();
}

class HukommelsesRepository : IMedlemRepository
{
    private List<Medlem> medlemmer = new List<Medlem>();

    public void Tilfoej(Medlem m)
    {
        medlemmer.Add(m);
    }

    public List<Medlem> HentAlle()
    {
        return new List<Medlem>(medlemmer);
    }
}`,
        ekstra: ["`HentAlle` returnerer en **kopi** af listen (`new List<Medlem>(medlemmer)`). Hvad ville der ske med repository'ets rækkefølge, hvis den returnerede selve listen, og servicen sorterede den?", "Flyt de tre lag ud i hver sin Class Library (`Klub.Data`, `Klub.Logik`) med projektreferencer, som i lektion 6. Husk `public` på alle klasser og interfaces.", "Tilføj `Medlem? FindVedEmail(string email)` til servicen, og skriv to linjer i en kommentar: hvilket lag hører den til, og hvorfor?"] }
    ] }
  ]
});
})();
