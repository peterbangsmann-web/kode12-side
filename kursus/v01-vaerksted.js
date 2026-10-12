// Værksted til modul 1 — Variabler og typer. Lægger først lektionen om debuggeren (m01d) på modul 1, derefter værkstedet (m01v).
(function () {
const R = String.raw;
var m = window.KURSUS.filter(function (x) { return x.id === "m01"; })[0];
if (!m) return;

// ------------------------------------------------------------------
m.lektioner.push({ id: "m01d", titel: "Debuggeren: se programmet køre trin for trin", min: 18,
  ord: [
    ["Debugger", "Et værktøj i Visual Studio og Rider, der kører programmet én linje ad gangen og viser værdien i alle variabler undervejs."],
    ["Breakpoint", "Et stoppunkt på en linje. Når programmet når linjen, holder det pause, før linjen bliver kørt. Vises som en rød prik i kanten."],
    ["Step Over", "Knappen i debuggeren, der kører præcis én linje og holder pause igen på den næste."],
    ["Locals", "Vinduet i Visual Studio, der under debugging viser alle variabler og deres værdi lige nu. I Rider hedder det Threads & Variables."],
    ["Threads & Variables", "Rider-udgaven af Locals: fanen nederst, der under debugging viser alle variabler og deres værdi lige nu."],
    ["Logisk fejl", "En fejl, hvor programmet kan oversættes og kører, men regner eller skriver noget forkert. Compileren kan ikke se den."]
  ],
  trin: [
    { t: "laes", h: "Hvad er debuggeren?",
      md: "Indtil nu har du kørt programmer fra start til slut og set på resultatet. Hvis resultatet er forkert, ved du ikke, **hvor** det gik galt.\n\n**Debuggeren** kører programmet **én linje ad gangen** og holder pause mellem linjerne. Mens den holder pause, viser den **værdien i hver eneste variabel** på skærmen.\n\nDet betyder, at du **ikke** skal holde variablerne i hovedet. Debuggeren holder styr på dem for dig og viser dem. Du læser bare af.\n\nFor at programmet ved, **hvor** det skal holde pause, sætter du et **breakpoint**: et stoppunkt på en bestemt linje. Det vises som en **rød prik** i kanten til venstre for linjen.",
      noter: [
        ["Debugger", "Kører programmet langsomt og viser variablerne. Findes i både Visual Studio og Rider."],
        ["Breakpoint", "Rød prik ud for en linje. Programmet stopper dér, **før** linjen bliver kørt."],
        ["Hvorfor", "Du ser, hvad der faktisk sker, i stedet for at gætte. Variablerne står på skærmen, ikke i dit hoved."]
      ] },
    { t: "valg", q: "Hvad gør et breakpoint?",
      svar: ["Programmet holder pause, når det når linjen, så du kan se variablerne", "Programmet springer linjen over", "Linjen bliver slettet, når programmet kører", "Programmet stopper helt og kan ikke fortsætte"],
      ret: 0, fordi: "Et breakpoint er et **stoppunkt**: programmet holder pause på linjen. Derfra kan du se alle variabler og selv bestemme, hvornår det skal fortsætte. Intet bliver sprunget over eller slettet." },
    { t: "laes", h: "Sæt et breakpoint og start debuggeren",
      md: "Du starter debuggeren på en anden måde end normalt. Den almindelige kørsel {{(**Ctrl + F5**)||(den **grønne pil ▶**)}} ignorerer alle breakpoints. Du skal bruge **debug-knappen**.",
      kode: R`int pris = 40;
int antal = 3;
int total = pris * antal;
Console.WriteLine(total);`,
      output: "120",
      win: [
        "Klik i den **grå kant** helt til venstre for linje 1 (til venstre for linjenummeret). Der kommer en **rød prik**. Klik igen for at fjerne den.",
        "Start med **F5** — eller klik på den **fyldte grønne pil ▶** øverst, hvor projektets navn står. (Den hule pil ▷ kører *uden* debugger.)",
        "Programmet starter og holder pause på linje 1. Linjen er markeret med **gult**, og der står en **gul pil** i kanten.",
        "Det sorte konsolvindue er åbent, men tomt: der er ikke skrevet noget ud endnu."
      ],
      mac: [
        "Klik i **kanten** lige til venstre for linje 1 (ved linjenummeret). Der kommer en **rød prik**. Klik igen for at fjerne den.",
        "Klik på den **grønne bille** 🐞 øverst til højre — den står lige ved siden af den grønne pil ▶.",
        "Programmet starter og holder pause på linje 1. Linjen er fremhævet med farve.",
        "Nederst åbner vinduet **Debug**. Det er herfra, du styrer debuggeren."
      ],
      md2: "Den markerede linje er den linje, der skal køres **som den næste**. Den er **ikke** kørt endnu." },
    { t: "valg", q: "Du har sat et breakpoint på linje 3 og startet debuggeren. Programmet holder pause, og linje 3 er markeret. Er linje 3 kørt?",
      kode: R`int pris = 40;
int antal = 3;
int total = pris * antal;
Console.WriteLine(total);`,
      output: "120",
      svar: ["Nej. Linje 1 og 2 er kørt, men linje 3 er den næste, der skal køres", "Ja, alle linjer til og med linje 3 er kørt", "Nej, ingen linjer er kørt endnu", "Ja, hele programmet er kørt, og nu viser den resultatet"],
      ret: 0, fordi: "Debuggeren stopper **før** linjen med breakpointet. Derfor har `pris` og `antal` deres værdier, men `total` har ikke fået sin værdi endnu. Den får den først, når du går ét skridt frem." },
    { t: "laes", h: "Gå ét skridt ad gangen og se variablerne",
      md: "Nu holder programmet pause. To ting skal du bruge:\n\n1. **Step Over** kører **én linje** og holder pause på den næste.\n2. Vinduet {{**Locals**||**Threads & Variables**}} viser alle variabler og deres værdi **lige nu**.\n\nDu trykker Step Over, kigger i vinduet, trykker igen, kigger igen. Sådan ser du præcis, hvad hver linje gør ved variablerne.",
      win: [
        "**Step Over**: tryk **F10** — eller klik på knappen **Step Over** i værktøjslinjen øverst (en pil, der hopper hen over en linje).",
        "**Locals** står nederst, mens du debugger. Kan du ikke se det, så vælg menuen **Debug → Windows → Locals**.",
        "I Locals står hver variabel med **Name**, **Value** og **Type**. En værdi, der lige er blevet ændret, står med **rødt**.",
        "Du kan også holde **musen over** et variabelnavn i koden. Så vises værdien i en lille boks."
      ],
      mac: [
        "**Step Over**: klik på knappen **Step Over** i værktøjslinjen i Debug-vinduet nederst (en pil, der hopper hen over en linje). Hold musen over knapperne for at se deres navne.",
        "**Threads & Variables** er en fane i Debug-vinduet nederst. Her står hver variabel med sin værdi.",
        "Rider skriver også værdierne med gråt **ude til højre for linjerne** i koden, efterhånden som de bliver kørt.",
        "Du kan også holde **musen over** et variabelnavn i koden. Så vises værdien."
      ],
      md2: "Du ser også variabler, som programmet ikke er nået til endnu. De står med `0` (tal) eller `null` (tekst) — det er bare startværdien, indtil linjen bliver kørt. Du ser også en variabel, der hedder `args`. Den laver C# selv, og den kan du ignorere." },
    { t: "spor", h: "Spor: byt om på to tal",
      q: "Det her er præcis det, debuggeren viser dig. Gå programmet igennem linje for linje, ligesom med Step Over, og skriv værdien af `a` og `b` **lige efter**, at hver linje er kørt.",
      kode: R`int a = 5;
int b = 3;
a = a + b;
b = a - b;
a = a - b;`,
      kolonner: ["a", "b"],
      raekker: [[1, "=5", "=–"], [2, "=5", "=3"], [3, "8", "3"], [4, "8", "5"], [5, "3", "5"]],
      fordi: "Linje 3: 5 + 3 = 8. Linje 4: `b` bliver 8 − 3 = 5. Linje 5: `a` bliver 8 − 5 = 3. Til sidst har `a` og `b` byttet værdi. Det er svært at holde styr på i hovedet — men i en tabel, eller i debuggeren, er det bare at læse af én linje ad gangen." },
    { t: "laes", h: "Fortsæt eller stop",
      md: "Når du har set det, du ville se, har du to valg:\n\n- **Fortsæt**: programmet kører videre af sig selv, indtil det rammer det næste breakpoint — eller til programmet er færdigt.\n- **Stop**: programmet bliver afbrudt med det samme. Resten af linjerne bliver ikke kørt.\n\nDu kan sætte **flere breakpoints** i samme program. Så hopper Fortsæt fra det ene til det næste.",
      win: [
        "**Fortsæt**: tryk **F5** igen — eller klik på **Continue** (grøn pil) i værktøjslinjen.",
        "**Stop**: klik på den **røde firkant** i værktøjslinjen (Stop Debugging). Genvejen er **Shift + F5**."
      ],
      mac: [
        "**Fortsæt**: klik på **Resume Program** (en grøn pil) i Debug-vinduet nederst.",
        "**Stop**: klik på den **røde firkant** (Stop). Den står både i Debug-vinduet og øverst til højre."
      ],
      noter: [
        ["Step Over", "Én linje frem, pause igen."],
        ["Fortsæt", "Kør videre til næste breakpoint eller til slut."],
        ["Stop", "Afbryd programmet nu."]
      ] },
    { t: "spor", h: "Spor: tekst, der ændrer sig",
      q: "Gå programmet igennem, som debuggeren ville gøre det. Skriv værdien af `tekst` og `antal` lige efter hver linje. Tekst skrives uden anførselstegn.",
      kode: R`string tekst = "Hej";
int antal = tekst.Length;
tekst = tekst + " Peter";
antal = tekst.Length;
tekst = tekst.ToUpper();`,
      kolonner: ["tekst", "antal"],
      raekker: [[1, "=Hej", "=–"], [2, "Hej", "3"], [3, "Hej Peter", "3"], [4, "Hej Peter", "9"], [5, "HEJ PETER", "9"]],
      fordi: "Linje 3 ændrer **kun** `tekst`. `antal` er stadig 3, fordi den blev regnet ud på linje 2 og ikke opdaterer sig selv. Først linje 4 tæller igen: `Hej Peter` har 9 tegn (mellemrummet tæller med). Linje 5 laver en ny tekst med store bogstaver og lægger den tilbage i `tekst`." },
    { t: "valg", q: "Programmet holder pause **på** linje 3 (linje 3 er markeret). Hvad står der ud for `antal` i {{Locals||Threads & Variables}}?",
      kode: R`int antal = 2;
antal = antal * 10;
antal = antal + 1;
Console.WriteLine(antal);`,
      output: "21",
      svar: ["20", "21", "2", "0"],
      ret: 0, fordi: "Linje 1 og 2 er kørt: `antal` er 2 og derefter 2 · 10 = 20. Linje 3 er markeret, men **ikke** kørt endnu. Først når du trykker Step Over, bliver `antal` til 21." },
    { t: "ide", h: "Debug et program selv",
      md: "Lav et nyt Console-projekt, der hedder `Debug1`. Skriv programmet nedenfor (skriv det, kopiér det ikke). Gå det derefter igennem med debuggeren.",
      kode: R`int point = 10;
point += 5;
point = point * 2;
point--;
string besked = $"Du har {point} point";
Console.WriteLine(besked);`,
      win: [
        "Sæt et breakpoint på linje 1 (klik i den grå kant).",
        "Start med **F5**. Programmet holder pause på linje 1.",
        "Tryk **F10** (Step Over) én gang ad gangen. Skriv på et stykke papir, hvad `point` er efter hver linje. Læs det af i **Locals**.",
        "Når du står på linjen med `Console.WriteLine`, så kig på `besked` i Locals. Den indeholder allerede hele teksten.",
        "Kør hele vejen igennem én gang. Start så forfra, og stop debuggeren med den **røde firkant** midt i programmet. Se, at sidste linje aldrig blev skrevet ud."
      ],
      mac: [
        "Sæt et breakpoint på linje 1 (klik i kanten ved linjenummeret).",
        "Start med den **grønne bille** 🐞. Programmet holder pause på linje 1.",
        "Klik på **Step Over** én gang ad gangen. Skriv på et stykke papir, hvad `point` er efter hver linje. Læs det af i **Threads & Variables**.",
        "Når du står på linjen med `Console.WriteLine`, så kig på `besked`. Den indeholder allerede hele teksten.",
        "Kør hele vejen igennem én gang. Start så forfra, og stop debuggeren med den **røde firkant** midt i programmet. Se, at sidste linje aldrig blev skrevet ud."
      ],
      output: "Du har 29 point",
      md2: "Dine noter bør være: 10, 15, 30, 29. Passer de ikke, så gå programmet igennem igen og se, hvilken linje du læste forkert." },
    { t: "spor", h: "Spor: kommatal og heltal",
      q: "Skriv værdierne lige efter hver linje, som {{Locals||Threads & Variables}} ville vise dem. Husk: på en dansk computer vises kommatal med komma, fx `7,5`.",
      kode: R`double pris = 7.5;
int antal = 2;
double total = pris * antal;
int hele = (int)total;
antal = hele / 4;`,
      kolonner: ["pris", "antal", "total", "hele"],
      raekker: [[1, "=7,5", "=–", "=–", "=–"], [2, "=7,5", "=2", "=–", "=–"], [3, "7,5", "2", "15", "–"], [4, "7,5", "2", "15", "15"], [5, "7,5", "3", "15", "15"]],
      fordi: "7,5 · 2 = 15. Castet `(int)` giver heltallet 15. Linje 5 er **heltalsdivision**: 15 / 4 = 3 (resten smides væk), og resultatet lægges i `antal`, som skifter fra 2 til 3. Det er netop sådan en linje, hvor debuggeren er guld værd: du ser 3 og ikke 3,75." },
    { t: "forklar", q: "Forklar med dine egne ord: Hvad er et breakpoint, hvad gør Step Over, og hvorfor er debuggeren bedre end at gætte, når et program regner forkert?",
      svar: "Et **breakpoint** er et stoppunkt på en linje: programmet holder pause, før linjen bliver kørt. **Step Over** kører én linje ad gangen. Imens viser {{**Locals**||**Threads & Variables**}} værdien i alle **variabler**. Så kan jeg se præcis, på hvilken linje en værdi bliver forkert, i stedet for at gætte eller holde det hele i hovedet.",
      noegle: ["breakpoint", "pause", "Step Over", "én linje", "variabler", "Locals"] }
  ] });

// ------------------------------------------------------------------
m.lektioner.push({ id: "m01v", titel: "Værksted: variabler, regning og debuggeren", vaerksted: true, min: 60, ord: [], trin: [

  { t: "laes", h: "Sådan arbejder du i værkstedet",
    md: "Nu skal du skrive **hele programmer selv** i {{Visual Studio||Rider}}. Siden giver dig opgaven, kravene og det, programmet skal skrive. Resten er dit.\n\nOpgaverne bliver sværere hen ad vejen. Den første er let — den er til at komme i gang. Den sidste samler hele modulet: typer, regning, heltalsdivision, `%`, cast, `const`, `int.Parse` og string-interpolation.",
    noter: [
      ["Skriv selv", "Skriv koden med dine egne fingre. Kopiér ikke fra modulet. Det er skrivningen, der får det til at sidde."],
      ["Kør tit", "Kør programmet efter hver ny linje eller to. Så ved du præcis, hvilken linje der lavede en fejl."],
      ["Brug debuggeren", "Regner programmet forkert, så sæt et **breakpoint** og gå ét skridt ad gangen med **Step Over**. Se værdierne i {{**Locals**||**Threads & Variables**}} i stedet for at gætte."],
      ["Tips før løsning", "Sidder du fast, så åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af, i stedet for at kopiere."],
      ["Sammenlign", "Når programmet kører, kopierer du det, det skrev, ind på siden. Så tjekker siden, om det passer tegn for tegn."]
    ] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Pizza til vennerne", projekt: "Pizza",
    md: "Du bestiller pizza til dig og dine venner. Programmet skal regne ud, hvad det koster i alt, og hvad hver person skal betale.",
    krav: [
      "En `int`, der hedder `pizzaPris`, med værdien 85",
      "En `int`, der hedder `antalPizzaer`, med værdien 3",
      "En `int`, der hedder `personer`, med værdien 5",
      "En `int`, der hedder `total`, som er prisen gange antallet",
      "Programmet skriver `3 pizzaer koster 255 kr.`",
      "Programmet skriver derefter `Hver person betaler 51 kr.` (total delt med personer)",
      "Brug string-interpolation (`$\"...\"`) og variablerne — ikke faste tal — i begge linjer"
    ],
    tip: [
      "Lav de tre variabler først. Skriv så `int total = pizzaPris * antalPizzaer;`.",
      "Første linje: `Console.WriteLine($\"{antalPizzaer} pizzaer koster {total} kr.\");`.",
      "I anden linje kan du regne direkte inde i klammerne: `{total / personer}`."
    ],
    output: "3 pizzaer koster 255 kr.\nHver person betaler 51 kr.",
    loesning: R`int pizzaPris = 85;
int antalPizzaer = 3;
int personer = 5;
int total = pizzaPris * antalPizzaer;

Console.WriteLine($"{antalPizzaer} pizzaer koster {total} kr.");
Console.WriteLine($"Hver person betaler {total / personer} kr.");`,
    ekstra: ["Lav `personer` om til 4, og kør igen. Hver person betaler nu 63 kr. — men 255 / 4 er 63,75. Hvor blev de 75 øre af? (Svar: heltalsdivision.)", "Lav `pizzaPris` og `total` om til `decimal`, så resultatet bliver præcist. Husk `m` bagpå tallet."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Sekunder til timer og minutter", projekt: "Tid",
    md: "Et ur har målt en tid i sekunder. Mennesker vil hellere læse timer, minutter og sekunder. Lav et program, der deler tiden op ved hjælp af **heltalsdivision** (`/`) og **modulus** (`%`).",
    krav: [
      "En `int`, der hedder `sekunder`, med værdien 8000",
      "En `int`, der hedder `timer`: hvor mange hele timer der er i `sekunder` (en time er 3600 sekunder)",
      "En `int`, der hedder `minutter`: hvor mange hele minutter der er i **resten**, når timerne er trukket fra",
      "En `int`, der hedder `restSekunder`: de sekunder, der er tilbage til sidst",
      "Programmet skriver præcis `8000 sekunder er 2 timer, 13 minutter og 20 sekunder`"
    ],
    tip: [
      "`timer` er `sekunder / 3600`. Heltalsdivision smider resten væk, og det er lige det, du vil have.",
      "Resten efter timerne er `sekunder % 3600`. Den rest deler du med 60 for at få minutterne.",
      "`int minutter = sekunder % 3600 / 60;` og `int restSekunder = sekunder % 60;`. Gå det igennem med debuggeren, hvis tallene ikke passer."
    ],
    output: "8000 sekunder er 2 timer, 13 minutter og 20 sekunder",
    loesning: R`int sekunder = 8000;

int timer = sekunder / 3600;
int minutter = sekunder % 3600 / 60;
int restSekunder = sekunder % 60;

Console.WriteLine($"{sekunder} sekunder er {timer} timer, {minutter} minutter og {restSekunder} sekunder");`,
    ekstra: ["Prøv med `sekunder = 3725`. Programmet bør skrive 1 time, 2 minutter og 5 sekunder (der står stadig \"timer\" — det retter du, når du har lært `if` i modul 2).", "Lav programmet om, så det spørger brugeren om antallet af sekunder med `Console.ReadLine()` og `int.Parse`."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Fejlfinding: indkøbskurven", projekt: "Kurv",
    md: "Programmet nedenfor skal regne prisen ud for 2 liter mælk, ét brød og én ost — og hvad du får tilbage af 100 kr. Det rigtige beløb er 25,00 + 24,95 + 39,00 = **88,95 kr.**, så du skal have **11,05 kr.** tilbage. Men programmet skriver noget andet.\n\nProgrammet kan oversættes, så compileren hjælper dig ikke. Det er en **logisk fejl**. Find den **med debuggeren**, ikke ved at gætte:\n\n1. Kopiér koden ind i Program.cs, og kør den. Se den forkerte udskrift.\n2. Sæt et **breakpoint** på linjen `decimal total = 0;` (klik i kanten til venstre for linjen).\n3. Start med debuggeren ({{**F5**||den **grønne bille** 🐞}}).\n4. Tryk {{**F10** (Step Over)||**Step Over**}} én linje ad gangen. Skriv værdien af `total` ned efter hver linje. Læs den af i {{**Locals**||**Threads & Variables**}}.\n5. `total` skal hele tiden blive **større**. Hvilken linje gør den **mindre**?",
    krav: [
      "Find den linje, der får `total` til at glemme mælken",
      "Ret fejlen ved at ændre **én** linje — resten af programmet skal være uændret",
      "Programmet skriver `I alt: 88,95 kr.` og `Tilbage: 11,05 kr.`"
    ],
    start: R`decimal prisMaelk = 12.50m;
decimal prisBroed = 24.95m;
decimal prisOst = 39.00m;

decimal total = 0;
total += prisMaelk * 2;
total = prisBroed;
total += prisOst;

decimal betalt = 100m;
decimal tilbage = betalt - total;

Console.WriteLine($"I alt: {total} kr.");
Console.WriteLine($"Tilbage: {tilbage} kr.");`,
    startOutput: "I alt: 63,95 kr.\nTilbage: 36,05 kr.",
    tip: [
      "Efter linjen med mælken bør `total` være 25,00. Hvad er den efter den næste linje?",
      "Se på forskellen mellem `=` og `+=`. Lighedstegnet alene **overskriver** det, der lå i variablen.",
      "Linjen `total = prisBroed;` smider de 25,00 kr. for mælken væk. Den skal være `total += prisBroed;`."
    ],
    output: "I alt: 88,95 kr.\nTilbage: 11,05 kr.",
    loesning: R`decimal prisMaelk = 12.50m;
decimal prisBroed = 24.95m;
decimal prisOst = 39.00m;

decimal total = 0;
total += prisMaelk * 2;
total += prisBroed;
total += prisOst;

decimal betalt = 100m;
decimal tilbage = betalt - total;

Console.WriteLine($"I alt: {total} kr.");
Console.WriteLine($"Tilbage: {tilbage} kr.");`,
    ekstra: ["Sæt et **ekstra** breakpoint på linjen `decimal tilbage = betalt - total;`, start forfra, og brug **Fortsæt** til at hoppe direkte fra det første breakpoint til det andet.", "Tilføj 2 bananer til 3,75 kr. stykket. Hvad skal der så stå? Regn det ud på papir først, og tjek med debuggeren."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Brugernavn til en ny bruger", projekt: "Brugernavn",
    md: "Et system laver selv et brugernavn til nye brugere: fornavnet med små bogstaver og de to sidste cifre i fødselsåret. Programmet skal også vise navnet med store bogstaver, alderen, og om brugernavnet er langt.",
    krav: [
      "`string fornavn = \"Peter\";`, `string efternavn = \"Hansen\";` og `int foedselsaar = 1998;`",
      "En konstant `const int AarNu = 2026;`, og en `int`, der hedder `alder`, som er `AarNu - foedselsaar`",
      "En `string`, der hedder `brugernavn`: fornavnet med små bogstaver efterfulgt af de to sidste cifre i fødselsåret (brug `%`)",
      "En `bool`, der hedder `erLangt`, som er `true`, når brugernavnet har mere end 8 tegn",
      "Programmet skriver præcis fem linjer: `Navn: PETER HANSEN`, `Alder: 28`, `Brugernavn: peter98`, `Antal tegn: 7` og `Langt brugernavn: False`"
    ],
    tip: [
      "De to sidste cifre i et tal får du med `% 100`: `1998 % 100` er 98.",
      "`string brugernavn = $\"{fornavn.ToLower()}{foedselsaar % 100}\";`. Navnet med store bogstaver: `$\"{fornavn} {efternavn}\".ToUpper()` — eller kald `ToUpper()` på hvert navn for sig.",
      "En sammenligning giver selv en bool: `bool erLangt = brugernavn.Length > 8;`."
    ],
    output: "Navn: PETER HANSEN\nAlder: 28\nBrugernavn: peter98\nAntal tegn: 7\nLangt brugernavn: False",
    loesning: R`const int AarNu = 2026;

string fornavn = "Peter";
string efternavn = "Hansen";
int foedselsaar = 1998;

int alder = AarNu - foedselsaar;
string brugernavn = $"{fornavn.ToLower()}{foedselsaar % 100}";
bool erLangt = brugernavn.Length > 8;

Console.WriteLine($"Navn: {fornavn.ToUpper()} {efternavn.ToUpper()}");
Console.WriteLine($"Alder: {alder}");
Console.WriteLine($"Brugernavn: {brugernavn}");
Console.WriteLine($"Antal tegn: {brugernavn.Length}");
Console.WriteLine($"Langt brugernavn: {erLangt}");`,
    ekstra: ["Skift fornavnet til `Christoffer`. Hvad bliver `erLangt` nu? Se det i debuggeren, før du kører programmet færdigt.", "Prøv at skrive `AarNu = 2027;` i programmet. Læs fejlen i {{Error List||Problems}}, og forklar, hvorfor `const` siger nej. Slet linjen igen."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Samlet program: klasseturen", projekt: "Klassetur",
    md: "En klasse skal på tur. Programmet skal regne prisen ud, dele eleverne i grupper og regne ud, hvad hver elev skal betale, når skolens tilskud er trukket fra. Tilskuddet kommer fra skolens system som **tekst**, så det skal laves om til et tal først.\n\nHer bruger du hele modulet: `const`, `int`, `decimal`, `string`, `bool`, heltalsdivision, `%`, `int.Parse`, et cast og string-interpolation.",
    krav: [
      "`const decimal PrisPrElev = 249.50m;` og `string sted = \"Legoland\";`",
      "`int elever = 27;` og `string tilskudTekst = \"1500\";`",
      "`int tilskud` laves ud fra `tilskudTekst` med `int.Parse`",
      "Eleverne deles i grupper med 4 i hver: antal hele grupper og antal elever til overs",
      "`decimal total` er prisen for alle elever. `decimal egenbetaling` er `total` minus tilskuddet",
      "`int prElev` er egenbetalingen delt med antal elever, lavet om til hele kroner med et cast `(int)` (øre smides væk)",
      "`bool under200` er `true`, når `prElev` er under 200",
      "Første linje er stedet med store bogstaver mellem tre stjerner: `*** KLASSETUR TIL LEGOLAND ***`. Derefter præcis de linjer, der står under **Output** nedenfor"
    ],
    tip: [
      "Byg det i lag. Lav først variablerne og overskriften, og kør. Så grupperne. Så pengene. Kør efter hvert lag.",
      "Grupper: `elever / 4` og `elever % 4`. Penge: `decimal total = PrisPrElev * elever;` og `decimal egenbetaling = total - tilskud;`.",
      "`int prElev = (int)(egenbetaling / elever);` — parentesen om divisionen skal med, ellers bliver castet lavet på `egenbetaling` alene. Stemmer tallene ikke, så sæt et breakpoint og se dem i debuggeren."
    ],
    output: "*** KLASSETUR TIL LEGOLAND ***\nElever: 27\nGrupper med 4: 6, til overs: 3\nPris i alt: 6736,50 kr.\nTilskud: 1500 kr.\nPr. elev: 193 kr.\nUnder 200 kr.: True",
    loesning: R`const decimal PrisPrElev = 249.50m;

string sted = "Legoland";
int elever = 27;
string tilskudTekst = "1500";

int tilskud = int.Parse(tilskudTekst);

int grupper = elever / 4;
int tilOvers = elever % 4;

decimal total = PrisPrElev * elever;
decimal egenbetaling = total - tilskud;
int prElev = (int)(egenbetaling / elever);
bool under200 = prElev < 200;

Console.WriteLine($"*** KLASSETUR TIL {sted.ToUpper()} ***");
Console.WriteLine($"Elever: {elever}");
Console.WriteLine($"Grupper med 4: {grupper}, til overs: {tilOvers}");
Console.WriteLine($"Pris i alt: {total} kr.");
Console.WriteLine($"Tilskud: {tilskud} kr.");
Console.WriteLine($"Pr. elev: {prElev} kr.");
Console.WriteLine($"Under 200 kr.: {under200}");`,
    ekstra: ["Sæt et breakpoint på linjen med `int prElev`. Se i debuggeren, hvad `egenbetaling / elever` giver **før** castet — og hvad `prElev` bliver bagefter.", "Lav programmet om, så det spørger brugeren om antal elever og tilskud med `Console.ReadLine()`.", "Skriv `tilskudTekst = \"femten hundrede\"` og kør. Læs den exception, programmet går ned med."] },

  // ------------------------------------------------------------------
  { t: "spor", h: "Spor: heltalsdivision, rest og kommatal",
    q: "Følg programmet linje for linje, og skriv værdierne lige efter hver linje, som debuggeren ville vise dem. Læg mærke til linje 4: `a / 5` er en division af **to heltal** — også selvom resultatet gemmes i en `double`.",
    kode: R`int a = 17;
int b = a / 5;
int c = a % 5;
double d = a / 5;
double e = a / 5.0;`,
    kolonner: ["a", "b", "c", "d", "e"],
    raekker: [[1, "=17", "=–", "=–", "=–", "=–"], [2, "=17", "=3", "=–", "=–", "=–"], [3, "17", "3", "2", "–", "–"], [4, "17", "3", "2", "3", "–"], [5, "17", "3", "2", "3", "3,4"]],
    fordi: "17 / 5 er heltalsdivision: 3. 17 % 5 er resten: 2. Linje 4 er fælden: højre side regnes ud **først**, og `a / 5` er stadig to heltal, så resultatet er 3 — **før** det bliver lagt i en `double`. Først i linje 5, hvor `5.0` er et kommatal, får du 3,4." },

  { t: "spor", h: "Spor: tekst eller tal?",
    q: "Følg programmet linje for linje. Skriv værdien af hver variabel lige efter linjen. Tekst skrives uden anførselstegn. Hold øje med to ting: gør `ToUpper()` noget ved `navn`? Og hvad gør `+ 1` ved en tekst?",
    kode: R`string navn = "anna";
string stor = navn.ToUpper();
string tekst = "25";
int tal = int.Parse(tekst);
tekst = tekst + 1;
tal = tal + 1;`,
    kolonner: ["navn", "stor", "tekst", "tal"],
    raekker: [[1, "=anna", "=–", "=–", "=–"], [2, "=anna", "=ANNA", "=–", "=–"], [3, "anna", "ANNA", "25", "–"], [4, "anna", "ANNA", "25", "25"], [5, "anna", "ANNA", "251", "25"], [6, "anna", "ANNA", "251", "26"]],
    fordi: "`ToUpper()` **giver en ny tekst** — `navn` er stadig `anna`. Linje 5: plus mellem en tekst og et tal **limer sammen**, så `tekst` bliver `251`. Linje 6: `tal` er en `int`, så her bliver der regnet: 25 + 1 = 26. Samme tegn, `+`, gør to forskellige ting afhængigt af typen." },

  { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: Hvad er forskellen på en compilerfejl, en exception og en logisk fejl? Og hvordan finder du en logisk fejl?",
    svar: "En **compilerfejl** er en fejl i selve koden, fx en manglende semikolon eller en forkert type. Programmet kan slet ikke starte, og der kommer en rød streg. En **exception** sker, mens programmet kører, fx når `int.Parse` får teksten `femten` — programmet går ned. En **logisk fejl** er værst: programmet kører fint, men resultatet er forkert, fx `=` i stedet for `+=`. Den finder jeg med **debuggeren**: jeg sætter et **breakpoint**, går én linje ad gangen med **Step Over** og ser i {{Locals||Threads & Variables}}, på hvilken linje en variabel får en forkert værdi.",
    noegle: ["compilerfejl", "exception", "logisk fejl", "debugger", "breakpoint", "Step Over", "variabel"] }

] });
})();
