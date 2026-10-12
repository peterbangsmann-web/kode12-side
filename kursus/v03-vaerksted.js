// Værksted til modul 3 — Metoder og arrays.
(function () {
const R = String.raw;
var m = window.KURSUS.filter(function (x) { return x.id === "m03"; })[0];
if (!m) return;
m.lektioner.push({ id: "m03v", titel: "Værksted: metoder og arrays", vaerksted: true, min: 60, ord: [], trin: [

  { t: "laes", h: "Sådan arbejder du i værkstedet",
    md: "Nu skal du skrive **hele programmer selv** i {{Visual Studio||Rider}}. Siden giver dig opgaven, kravene og det, programmet skal skrive. Resten er dit.\n\nOpgaverne bliver sværere hen ad vejen. Den første er let — den er til at komme i gang. Den sidste samler hele modulet: metoder med parametre og returværdi, arrays, `for` og `foreach`, de klassiske algoritmer, tekstmetoder og valgfri parametre.\n\nLav et nyt Console-projekt til hver opgave. Navnet står ved opgaven. Skriv metoderne **nederst** i Program.cs, under den kode, der kalder dem.",
    noter: [
      ["Skriv selv", "Skriv koden med dine egne fingre. Kopiér ikke fra modulet. Det er skrivningen, der får det til at sidde."],
      ["Én metode ad gangen", "Skriv én metode, kald den, og kør programmet. Virker den, så skriv den næste. Så ved du altid, hvor en fejl kommer fra."],
      ["Brug debuggeren", "Sæt et **breakpoint** i en metode, og gå ét skridt ad gangen. I {{**Locals**||**Threads & Variables**}} kan du se parametrene, de lokale variabler og hele arrayet — klik på den lille pil ved arrayet for at se hvert element."],
      ["Metoder regner, toppen skriver", "Lad metoderne **returnere** deres resultat. Lad den øverste kode stå for udskriften. Så kan metoderne bruges igen."],
      ["Tips før løsning", "Sidder du fast, så åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af, i stedet for at kopiere."],
      ["Sammenlign", "Når programmet kører, kopierer du det, det skrev, ind på siden. Så tjekker siden, om det passer tegn for tegn."]
    ] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Fra celsius til fahrenheit", projekt: "Temperatur",
    md: "I USA måles temperatur i fahrenheit. Programmet skal regne fire temperaturer om fra celsius til fahrenheit.\n\nFormlen er: fahrenheit = celsius · 9 / 5 + 32.\n\nSelve omregningen skal ligge i en **metode**, der tager celsius ind og **returnerer** fahrenheit. Temperaturerne ligger i et array.",
    krav: [
      "Metoden hedder `TilFahrenheit`. Den tager en `double`, der hedder `celsius`, og returnerer en `double`",
      "Arrayet `temperaturer` er et `double[]` med værdierne 0, 20, 37.5 og 100",
      "En `foreach`-løkke går temperaturerne igennem",
      "For hver temperatur skrives `{celsius} °C = {fahrenheit} °F`"
    ],
    tip: [
      "Start med metoden: `static double TilFahrenheit(double celsius) { return …; }` nederst i filen. Prøv den med `Console.WriteLine(TilFahrenheit(100));` — den skal skrive 212.",
      "Formlen i C#: `return celsius * 9 / 5 + 32;`. Fordi `celsius` er en `double`, bliver hele udregningen lavet med kommatal.",
      "Løkken: `foreach (double c in temperaturer) { Console.WriteLine($\"{c} °C = {TilFahrenheit(c)} °F\"); }`."
    ],
    output: "0 °C = 32 °F\n20 °C = 68 °F\n37,5 °C = 99,5 °F\n100 °C = 212 °F",
    loesning: R`double[] temperaturer = { 0, 20, 37.5, 100 };

foreach (double c in temperaturer)
{
    Console.WriteLine($"{c} °C = {TilFahrenheit(c)} °F");
}

static double TilFahrenheit(double celsius)
{
    return celsius * 9 / 5 + 32;
}`,
    ekstra: ["Lav den modsatte metode, `TilCelsius(double fahrenheit)`, og tjek, at `TilCelsius(TilFahrenheit(37.5))` giver 37,5 igen.", "Prøv at skrive en negativ temperatur ind i arrayet, fx -40. Hvad giver den i fahrenheit?"] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Ugens skridt", projekt: "Skridt",
    md: "Et skridttæller-ur har gemt ugens skridt i et array. Et andet array har dagenes navne. Plads 0 i det ene hører sammen med plads 0 i det andet, og så videre.\n\nProgrammet skal vise hver dag og derefter tre ting om ugen. Hver af de tre ting regnes ud af sin egen metode.",
    krav: [
      "`string[] dage = { \"Man\", \"Tirs\", \"Ons\", \"Tors\", \"Fre\", \"Lør\", \"Søn\" };`",
      "`int[] skridt = { 8200, 11500, 6400, 12800, 9900, 15300, 4100 };`",
      "En `for`-løkke skriver hver dag som `{dag}: {skridt}`",
      "Metoden `static int Sum(int[] tal)` returnerer summen. Programmet skriver `Skridt i alt: …`",
      "Metoden `static int AntalMindst(int[] tal, int graense)` returnerer, hvor mange tal der er mindst `graense`. Programmet skriver `Dage med mindst 10000: …`",
      "Metoden `static int IndeksForStoerste(int[] tal)` returnerer **pladsen** (indekset) for det største tal. Programmet bruger pladsen i begge arrays og skriver `Bedste dag: {dag} med {skridt}`"
    ],
    tip: [
      "`Sum` og `AntalMindst` er de klassiske algoritmer fra modul 3: en akkumulator, der starter på 0, og en `foreach`, der lægger til eller tæller op.",
      "`IndeksForStoerste` skal kende pladsen, så her skal du bruge `for` i stedet for `foreach`. Start med `int bedst = 0;` og gå fra `i = 1`. Er `tal[i] > tal[bedst]`, så sæt `bedst = i;`.",
      "Gem pladsen i en variabel: `int b = IndeksForStoerste(skridt);` og skriv så `$\"Bedste dag: {dage[b]} med {skridt[b]}\"`."
    ],
    output: "Man: 8200\nTirs: 11500\nOns: 6400\nTors: 12800\nFre: 9900\nLør: 15300\nSøn: 4100\nSkridt i alt: 68200\nDage med mindst 10000: 3\nBedste dag: Lør med 15300",
    loesning: R`string[] dage = { "Man", "Tirs", "Ons", "Tors", "Fre", "Lør", "Søn" };
int[] skridt = { 8200, 11500, 6400, 12800, 9900, 15300, 4100 };

for (int i = 0; i < dage.Length; i++)
{
    Console.WriteLine($"{dage[i]}: {skridt[i]}");
}

Console.WriteLine($"Skridt i alt: {Sum(skridt)}");
Console.WriteLine($"Dage med mindst 10000: {AntalMindst(skridt, 10000)}");

int b = IndeksForStoerste(skridt);
Console.WriteLine($"Bedste dag: {dage[b]} med {skridt[b]}");

static int Sum(int[] tal)
{
    int sum = 0;
    foreach (int t in tal)
    {
        sum += t;
    }
    return sum;
}

static int AntalMindst(int[] tal, int graense)
{
    int antal = 0;
    foreach (int t in tal)
    {
        if (t >= graense)
        {
            antal++;
        }
    }
    return antal;
}

static int IndeksForStoerste(int[] tal)
{
    int bedst = 0;
    for (int i = 1; i < tal.Length; i++)
    {
        if (tal[i] > tal[bedst])
        {
            bedst = i;
        }
    }
    return bedst;
}`,
    ekstra: ["Lav `IndeksForMindste`, og skriv `Dårligste dag: …`.", "Skriv gennemsnittet ud med én decimal. Husk, at `int` divideret med `int` smider kommaet væk — lav summen om til `double` først: `(double)Sum(skridt) / skridt.Length`. Skriv det med `:F1` efter tallet i `{ }`, så vises kun én decimal."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Fejlfinding: den billigste vare", projekt: "Billigst",
    md: "Programmet nedenfor skal finde den **billigste** vare i kiosken. Te koster 20 kr. og er den billigste — men programmet påstår, at det er Juice, der koster 20 kr.\n\nPrisen er rigtig, men navnet er forkert. Programmet kan oversættes, så compileren hjælper dig ikke. Find fejlen **med debuggeren**, ikke ved at gætte:\n\n1. Kopiér koden ind i Program.cs, og kør den. Se den forkerte udskrift.\n2. Sæt et **breakpoint** på linjen `if (priser[i] < billigst)` (klik i den grå kant til venstre for linjen).\n3. Start med debuggeren ({{**F5**||den **grønne bille** 🐞}}). Programmet stopper inde i metoden `VisBilligst`.\n4. Gå ét skridt ad gangen med {{**F10** (Step Over)||knappen **Step Over**}}, og hold øje med `i`, `billigst` og `navn` i {{**Locals**||**Threads & Variables**}}.\n5. Skriv ned, hvornår `billigst` skifter værdi — og hvornår `navn` skifter. Skifter de på de samme tidspunkter?",
    krav: [
      "Find den linje, der ændrer `navn` på det forkerte tidspunkt",
      "Ret fejlen ved at flytte **én** linje — resten af programmet skal være uændret",
      "Programmet skriver `Varer: 4`, `I alt: 113 kr.` og `Billigst: Te til 20 kr.`"
    ],
    start: R`string[] varer = { "Kaffe", "Te", "Kage", "Juice" };
int[] priser = { 30, 20, 35, 28 };

Console.WriteLine($"Varer: {varer.Length}");
Console.WriteLine($"I alt: {Sum(priser)} kr.");
VisBilligst(varer, priser);

static int Sum(int[] tal)
{
    int sum = 0;
    foreach (int t in tal)
    {
        sum += t;
    }
    return sum;
}

static void VisBilligst(string[] varer, int[] priser)
{
    int billigst = priser[0];
    string navn = varer[0];

    for (int i = 0; i < priser.Length; i++)
    {
        if (priser[i] < billigst)
        {
            billigst = priser[i];
        }
        navn = varer[i];
    }

    Console.WriteLine($"Billigst: {navn} til {billigst} kr.");
}`,
    startOutput: "Varer: 4\nI alt: 113 kr.\nBilligst: Juice til 20 kr.",
    tip: [
      "I debuggeren skifter `billigst` kun én gang (når `i` er 1). Men `navn` skifter i **hver** omgang. Hvorfor?",
      "Se på klammerne. Linjen `navn = varer[i];` står **uden for** if-blokken. Så bliver den kørt hver gang, og til sidst står det sidste navn i arrayet tilbage.",
      "Navnet skal kun huskes, når der er fundet en ny billigste pris. Flyt `navn = varer[i];` ind i if-blokken, lige under `billigst = priser[i];`."
    ],
    output: "Varer: 4\nI alt: 113 kr.\nBilligst: Te til 20 kr.",
    loesning: R`string[] varer = { "Kaffe", "Te", "Kage", "Juice" };
int[] priser = { 30, 20, 35, 28 };

Console.WriteLine($"Varer: {varer.Length}");
Console.WriteLine($"I alt: {Sum(priser)} kr.");
VisBilligst(varer, priser);

static int Sum(int[] tal)
{
    int sum = 0;
    foreach (int t in tal)
    {
        sum += t;
    }
    return sum;
}

static void VisBilligst(string[] varer, int[] priser)
{
    int billigst = priser[0];
    string navn = varer[0];

    for (int i = 0; i < priser.Length; i++)
    {
        if (priser[i] < billigst)
        {
            billigst = priser[i];
            navn = varer[i];
        }
    }

    Console.WriteLine($"Billigst: {navn} til {billigst} kr.");
}`,
    ekstra: ["Byt om på priserne, så Juice faktisk er billigst (fx 15 kr.). Ville den fejlbehæftede udgave så have skrevet det rigtige? Hvorfor er det farligt, når en fejl kun nogle gange giver forkert resultat?", "Lav metoden om, så den **returnerer** indekset for den billigste vare i stedet for at skrive ud. Lad den øverste kode stå for udskriften."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Karakterer fra en tekstlinje", projekt: "Karakterlinjer",
    md: "Data kommer tit som **tekst**, hvor værdierne er adskilt af et tegn — fx når man læser en fil. Her har hver elev én linje: først navnet og så karaktererne, adskilt af semikolon.\n\nMen data er rodet: der er mellemrum omkring et navn, og navnene er skrevet med forskellige store og små bogstaver. Programmet skal rydde op i navnet og regne gennemsnittet ud.\n\nGennemsnittet skal skrives med **én decimal**. Det gør du ved at skrive `:F1` efter tallet inde i `{ }`: `$\"{snit:F1}\"`. Så bliver 9 til `9,0` og 4,333… til `4,3`.",
    krav: [
      "`string[] linjer = { \"  anna ;12;7;10;7\", \"bo;2;4;7\", \"CARL;10;12;10\" };`",
      "Metoden `static string PaentNavn(string navn)` fjerner mellemrum for og bag og returnerer navnet med stort første bogstav og små bogstaver resten",
      "Metoden `static double Gennemsnit(string[] dele)` får alle stykkerne fra én linje. Den springer navnet på plads 0 over, laver resten om til tal med `int.Parse` og returnerer gennemsnittet",
      "En `foreach` går linjerne igennem. Hver linje deles med `Split(';')`",
      "For hver elev skrives `{navn}: {gennemsnit:F1}`"
    ],
    tip: [
      "Prøv først `PaentNavn` alene: `Console.WriteLine(PaentNavn(\"  anna \"));` skal skrive `Anna`. Brug `Trim()`, og byg så navnet af to stykker med `Substring`: det første tegn og resten.",
      "`Substring(0, 1)` giver det første tegn. `Substring(1)` med kun ét tal giver **resten** af teksten fra plads 1. Så: `string ren = navn.Trim(); return ren.Substring(0, 1).ToUpper() + ren.Substring(1).ToLower();`.",
      "I `Gennemsnit` skal løkken starte på 1: `for (int i = 1; i < dele.Length; i++) { sum += int.Parse(dele[i]); }`. Lav `sum` som en `double`, og dividér med `dele.Length - 1` — der er én karakter mindre, end der er stykker."
    ],
    output: "Anna: 9,0\nBo: 4,3\nCarl: 10,7",
    loesning: R`string[] linjer = { "  anna ;12;7;10;7", "bo;2;4;7", "CARL;10;12;10" };

foreach (string linje in linjer)
{
    string[] dele = linje.Split(';');
    string navn = PaentNavn(dele[0]);
    double snit = Gennemsnit(dele);
    Console.WriteLine($"{navn}: {snit:F1}");
}

static string PaentNavn(string navn)
{
    string ren = navn.Trim();
    return ren.Substring(0, 1).ToUpper() + ren.Substring(1).ToLower();
}

static double Gennemsnit(string[] dele)
{
    double sum = 0;
    for (int i = 1; i < dele.Length; i++)
    {
        sum += int.Parse(dele[i]);
    }
    return sum / (dele.Length - 1);
}`,
    ekstra: ["Glem `Trim()` med vilje, og kør. Hvad sker der med Anna — og hvorfor? (Tip: hvad er det første tegn i `\"  anna \"`?)", "Tilføj en metode `static int Hoejeste(string[] dele)`, og skriv elevens højeste karakter ud på samme linje: `Anna: 9,0 (højeste 12)`."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Samlet program: klassens karakterark", projekt: "Karakterark",
    md: "Nu samler du hele modulet i ét program. Klassen har fem elever. Navnene ligger i ét array, karaktererne i et andet — med samme plads for samme elev.\n\nProgrammet viser alle elever og en statistik, og til sidst kan det **søge** efter en elev. Søgningen må ikke tage hensyn til store og små bogstaver: `dina` skal finde `Dina`.\n\nHver opgave løses af sin egen metode. Én af metoderne har en **valgfri parameter**: grænsen for at bestå er 2, medmindre man siger andet.",
    krav: [
      "`string[] navne = { \"Anna\", \"Bo\", \"Carl\", \"Dina\", \"Emil\" };` og `int[] karakterer = { 7, 12, 0, 10, 4 };`",
      "`static string Status(int karakter)` returnerer `bestået`, hvis karakteren er mindst 2, ellers `ikke bestået`",
      "En `for`-løkke skriver hver elev som `{navn}: {karakter} ({status})`",
      "`static double Gennemsnit(int[] tal)` returnerer gennemsnittet. Programmet skriver `Gennemsnit: {snit:F1}`",
      "`static int IndeksForStoerste(int[] tal)` returnerer pladsen for den højeste karakter. Programmet skriver `Bedst: {navn} med {karakter}`",
      "`static int AntalMindst(int[] tal, int graense = 2)` tæller karakterer, der er mindst `graense`. Programmet skriver `Bestået: {antal} af {antal elever}` (uden at angive grænsen) og `Mindst 10: {antal}` (med grænsen 10)",
      "`static int Find(string[] navne, string soeg)` returnerer pladsen for navnet — uden hensyn til store og små bogstaver — eller -1, hvis det ikke findes",
      "`static void VisSoegning(string[] navne, int[] karakterer, string soeg)` bruger `Find` og skriver `Søg {soeg}: {navn} fik {karakter}` eller `Søg {soeg}: ikke fundet`",
      "Programmet søger til sidst efter `dina` og derefter `frede`"
    ],
    tip: [
      "Byg det i lag, og kør efter hvert: først løkken med navne og karakterer, så `Status`, så `Gennemsnit`, så `IndeksForStoerste`, så `AntalMindst` og til sidst søgningen.",
      "`Status` kan skrives på én linje med den ternære operator: `return karakter >= 2 ? \"bestået\" : \"ikke bestået\";`. Den valgfri parameter skrives i signaturen: `static int AntalMindst(int[] tal, int graense = 2)` — så kan du kalde både `AntalMindst(karakterer)` og `AntalMindst(karakterer, 10)`.",
      "`Find` er en lineær søgning: `for (int i = 0; i < navne.Length; i++) { if (navne[i].ToLower() == soeg.ToLower()) { return i; } } return -1;`. I `VisSoegning`: `int i = Find(navne, soeg); if (i == -1) { … } else { … }`."
    ],
    output: "Anna: 7 (bestået)\nBo: 12 (bestået)\nCarl: 0 (ikke bestået)\nDina: 10 (bestået)\nEmil: 4 (bestået)\nGennemsnit: 6,6\nBedst: Bo med 12\nBestået: 4 af 5\nMindst 10: 2\nSøg dina: Dina fik 10\nSøg frede: ikke fundet",
    loesning: R`string[] navne = { "Anna", "Bo", "Carl", "Dina", "Emil" };
int[] karakterer = { 7, 12, 0, 10, 4 };

for (int i = 0; i < navne.Length; i++)
{
    Console.WriteLine($"{navne[i]}: {karakterer[i]} ({Status(karakterer[i])})");
}

Console.WriteLine($"Gennemsnit: {Gennemsnit(karakterer):F1}");

int bedst = IndeksForStoerste(karakterer);
Console.WriteLine($"Bedst: {navne[bedst]} med {karakterer[bedst]}");

Console.WriteLine($"Bestået: {AntalMindst(karakterer)} af {karakterer.Length}");
Console.WriteLine($"Mindst 10: {AntalMindst(karakterer, 10)}");

VisSoegning(navne, karakterer, "dina");
VisSoegning(navne, karakterer, "frede");

static string Status(int karakter)
{
    return karakter >= 2 ? "bestået" : "ikke bestået";
}

static double Gennemsnit(int[] tal)
{
    double sum = 0;
    foreach (int t in tal)
    {
        sum += t;
    }
    return sum / tal.Length;
}

static int IndeksForStoerste(int[] tal)
{
    int bedst = 0;
    for (int i = 1; i < tal.Length; i++)
    {
        if (tal[i] > tal[bedst])
        {
            bedst = i;
        }
    }
    return bedst;
}

static int AntalMindst(int[] tal, int graense = 2)
{
    int antal = 0;
    foreach (int t in tal)
    {
        if (t >= graense)
        {
            antal++;
        }
    }
    return antal;
}

static int Find(string[] navne, string soeg)
{
    for (int i = 0; i < navne.Length; i++)
    {
        if (navne[i].ToLower() == soeg.ToLower())
        {
            return i;
        }
    }
    return -1;
}

static void VisSoegning(string[] navne, int[] karakterer, string soeg)
{
    int i = Find(navne, soeg);
    if (i == -1)
    {
        Console.WriteLine($"Søg {soeg}: ikke fundet");
    }
    else
    {
        Console.WriteLine($"Søg {soeg}: {navne[i]} fik {karakterer[i]}");
    }
}`,
    ekstra: ["Søg efter `  DINA ` med mellemrum. Den findes ikke — ret `Find`, så den også bruger `Trim()`.", "Sæt et breakpoint i `Find`, og søg efter `frede`. Se `i` gå fra 0 til 4, og se metoden nå ned til `return -1;`.", "Tilføj en metode `IndeksForMindste`, og skriv `Lavest: …` ud."] },

  // ------------------------------------------------------------------
  { t: "spor", h: "Spor: en metode får en kopi",
    q: "Følg programmet. Rækkerne står i den rækkefølge, linjerne **bliver kørt** — så programmet hopper ind i metoden (linje 9) midt i linje 2 og linje 4. Skriv `a`, `b` og `x` lige efter hver linje. `x` findes kun, mens metoden kører; resten af tiden skriver du `–`.",
    kode: R`int a = 3;
int b = Dobbel(a);
a = a + 1;
b = Dobbel(a) + b;
Console.WriteLine($"{a} {b}");

static int Dobbel(int x)
{
    x = x * 2;
    return x;
}`,
    kolonner: ["a", "b", "x"],
    raekker: [[1, "=3", "=–", "=–"], [9, "=3", "=–", "=6"], [2, "3", "6", "–"], [3, "4", "6", "–"], [9, "4", "6", "8"], [4, "4", "14", "–"]],
    slut: false,
    output: "4 14",
    fordi: "Metoden får en **kopi** af `a` i parameteren `x`. Når linje 9 fordobler `x`, rører det ikke `a` — `a` er stadig 3. Resultatet kommer kun ud gennem `return` og bliver gemt i `b`. I linje 4 bliver `Dobbel(a)` regnet ud **først** (4 · 2 = 8), og derefter lægges den gamle `b` til: 8 + 6 = 14." },

  { t: "spor", h: "Spor: find det største og dets plads",
    q: "Følg algoritmen. Skriv `stoerst` og `plads` lige efter hver af linjerne 8 og 9, hver gang de bliver kørt. Læg mærke til, at løkken starter på 1, og at linje 8–9 kun kører, når betingelsen i linje 6 er sand.",
    kode: R`int[] tal = { 5, 9, 2, 9, 12 };
int stoerst = tal[0];
int plads = 0;
for (int i = 1; i < tal.Length; i++)
{
    if (tal[i] > stoerst)
    {
        stoerst = tal[i];
        plads = i;
    }
}
Console.WriteLine($"{stoerst} på plads {plads}");`,
    kolonner: ["stoerst", "plads"],
    raekker: [[2, "=5", "=–"], [3, "=5", "=0"], [8, "9", "0"], [9, "9", "1"], [8, "12", "1"], [9, "12", "4"]],
    output: "12 på plads 4",
    fordi: "Algoritmen antager, at det første element er det største. Ved plads 1 er 9 > 5, så både værdi og plads gemmes. Ved plads 2 er 2 ikke større. Ved plads 3 er 9 **ikke større end** 9 — derfor bliver den første 9'er stående. Ved plads 4 er 12 > 9, og 12 på plads 4 vinder." },

  { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: I opgaven med den billigste vare var prisen rigtig, men navnet forkert. Hvad var fejlen, og hvordan fandt du den med debuggeren?",
    svar: "Algoritmen husker to ting om den billigste vare: **prisen** og **navnet**. Begge skal opdateres **samtidig** — kun når der er fundet en ny billigste pris. Linjen `navn = varer[i];` stod **uden for if-blokken**, så den blev kørt i **hver omgang**, og til sidst stod det **sidste** navn tilbage. Med et **breakpoint** og **Step Over** kunne jeg i Locals se, at `billigst` kun skiftede én gang, mens `navn` skiftede hver gang. Rettelsen var at flytte linjen ind i if-blokken.",
    noegle: ["pris og navn", "samtidig", "uden for if", "hver omgang", "breakpoint", "Locals"] }

] });
})();
