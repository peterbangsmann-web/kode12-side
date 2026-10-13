// Modul 9 — LINQ, filer og Parallel. Forudsætter: modul 0–8.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m09", nr: 9, del: "Del 3 · Videregående C#", ikon: "🔎",
  titel: "LINQ, filer og Parallel",
  dag: "Kursusdag 7–8 · LINQ, IO og parallel programmering",
  intro: "Du har skrevet mange løkker, der leder, tæller og summerer i lister. **LINQ** gør det samme på én linje — og det er den måde, du kommer til at hente data fra databasen på i dit web-projekt.\n\nBagefter lærer du at **gemme data i filer** (tekst, CSV og JSON), så de overlever, når programmet lukker. Til sidst ser du, hvordan tungt regnearbejde kan deles ud på alle computerens kerner med **Parallel**.",
  video: ["07_Tirs_Performance.mp4 (2 t 51 min)", "08_Ons_Parallel+Thread_synch+delegates.mp4 (3 t 53 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m09l1", titel: "LINQ: Where, Select og lambda", min: 16,
    ord: [
      ["LINQ", "Language Integrated Query. Et sæt metoder, der filtrerer, sorterer og regner på samlinger — fx Where, Select og OrderBy."],
      ["Lambda-udtryk", "En lille metode skrevet direkte, hvor den skal bruges: `x => x > 5`. Til venstre for pilen står parameteren, til højre det, der skal returneres."],
      ["Where", "LINQ-metode, der beholder de elementer, som opfylder en betingelse (filtrering)."],
      ["Select", "LINQ-metode, der laver hvert element om til noget andet (projektion)."],
      ["ToList", "Laver resultatet af en LINQ-forespørgsel om til en almindelig List."],
      ["Forespørgsel (query)", "Et spørgsmål til data: \"giv mig alle tal over 5\"."]
    ],
    trin: [
      { t: "laes", h: "Den lange vej og den korte vej",
        md: "Du kan allerede finde alle tal over 5 i en liste: lav en tom liste, gå alle tallene igennem med `foreach`, og læg dem, der passer, over i den nye liste.\n\n**LINQ** (*Language Integrated Query*) er et sæt færdige metoder, der gør præcis den slags arbejde. Begge halvdele af programmet her giver det samme resultat:",
        kode: R`List<int> tal = new List<int> { 3, 8, 1, 6, 9 };

// Den lange vej — som du kender den
List<int> store1 = new List<int>();
foreach (int x in tal)
{
    if (x > 5)
    {
        store1.Add(x);
    }
}

// Den korte vej — med LINQ
List<int> store2 = tal.Where(x => x > 5).ToList();

Console.WriteLine(string.Join(" ", store1));
Console.WriteLine(string.Join(" ", store2));`,
        noter: [
          ["tal.Where(…)", "Behold kun de elementer, der opfylder betingelsen i parentesen."],
          ["x => x > 5", "Betingelsen. Læs den som: \"for et tal x: er x større end 5?\""],
          [".ToList()", "Saml resultatet i en ny `List<int>`."]
        ],
        output: "8 6 9\n8 6 9",
        md2: "LINQ-metoderne virker på alt, der kan gennemløbes med `foreach` — arrays, lister, Dictionary og alt andet, der er `IEnumerable<T>` (modul 7). Det kræver `using System.Linq;`, men den linje er allerede med i et nyt projekt." },
      { t: "laes", h: "Lambda: en lille metode skrevet på stedet",
        md: "Det mærkelige `x => x > 5` er et **lambda-udtryk**. Det er **en lille metode, skrevet lige der, hvor den skal bruges** — uden navn.\n\nDu kunne lige så godt have skrevet en almindelig metode og givet den til `Where`. Det giver præcis det samme:",
        kode: R`List<int> tal = new List<int> { 3, 8, 1, 6, 9 };

List<int> a = tal.Where(ErStor).ToList();
List<int> b = tal.Where(x => x > 5).ToList();

Console.WriteLine(string.Join(" ", a));
Console.WriteLine(string.Join(" ", b));

static bool ErStor(int x)
{
    return x > 5;
}`,
        noter: [
          ["tal.Where(ErStor)", "Giv `Where` metoden `ErStor`. Ingen parenteser efter navnet — du kalder den ikke selv, `Where` gør det for hvert element."],
          ["x", "Til venstre for pilen: **parameteren**. Svarer til `int x` i `ErStor`. Navnet vælger du selv."],
          ["=>", "Pilen. Læses \"giver\" eller \"går til\"."],
          ["x > 5", "Til højre for pilen: det, der **returneres**. Svarer til `return x > 5;`."]
        ],
        output: "8 6 9\n8 6 9",
        md2: "`Where` kalder din lille metode **én gang for hvert element**. Svarer den `true`, kommer elementet med. Mere om, hvad der foregår bag kulisserne, i modul 10." },
      { t: "valg", q: "Hvad betyder lambda-udtrykket `n => n * 2`?",
        svar: ["En lille metode, der tager et tal n og returnerer det dobbelte", "En variabel n, der bliver sat til 2", "En sammenligning: er n større end eller lig med 2?", "En løkke, der kører n gange"],
        ret: 0, fordi: "Til venstre for pilen står parameteren (`n`), til højre det, der returneres (`n * 2`). Pilen `=>` er **ikke** det samme som `>=` (større end eller lig med)." },
      { t: "forudsig",
        kode: R`List<int> tal = new List<int> { 4, 7, 10, 13, 16 };
List<int> lige = tal.Where(x => x % 2 == 0).ToList();

Console.WriteLine(lige.Count);
Console.WriteLine(string.Join(", ", lige));`,
        output: "3\n4, 10, 16",
        fordi: "`x % 2 == 0` er sand for de lige tal: 4, 10 og 16. `Where` bevarer rækkefølgen fra den oprindelige liste." },
      { t: "spor", h: "Spor: sådan arbejder Where indeni",
        q: "Her er det, `Where(x => x > 5)` gør for dig — skrevet ud som en løkke. Følg den, og skriv `x` og `resultat.Count`, lige efter at linjen er udført. (Linje 7 køres kun, når betingelsen er sand.)",
        kode: R`int[] tal = { 4, 9, 2, 7 };
List<int> resultat = new List<int>();
foreach (int x in tal)
{
    if (x > 5)
    {
        resultat.Add(x);
    }
}
Console.WriteLine(string.Join(" ", resultat));`,
        kolonner: ["x", "resultat.Count"],
        raekker: [[3, "=4", "=0"], [3, "9", "0"], [7, "9", "1"], [3, "2", "1"], [3, "7", "1"], [7, "7", "2"]],
        slut: false,
        output: "9 7",
        fordi: "For hvert element bliver betingelsen afprøvet. 4 og 2 springes over, 9 og 7 lægges i resultatet. `Where` gør nøjagtig det her — du skal bare ikke skrive løkken selv." },
      { t: "udfyld", q: "Behold kun de navne, der er længere end 3 bogstaver.",
        kode: R`List<string> navne = new List<string> { "Bo", "Anna", "Ida", "Carl" };
List<string> lange = navne.[[Where]](n [[=>]] n.Length > 3).[[ToList]]();
Console.WriteLine(string.Join(" ", lange));`,
        output: "Anna Carl",
        fordi: "`Where` filtrerer, lambda-udtrykket skrives med pilen `=>`, og `ToList()` samler resultatet i en liste." },
      { t: "laes", h: "Select: lav hvert element om",
        md: "`Where` vælger **hvilke** elementer, der kommer med. `Select` bestemmer, **hvad der kommer ud** af hvert element. Lambda-udtrykket siger, hvad hvert element skal laves om til.",
        kode: R`List<int> tal = new List<int> { 1, 2, 3, 4 };
List<int> kvadrater = tal.Select(x => x * x).ToList();
Console.WriteLine(string.Join(" ", kvadrater));

List<string> navne = new List<string> { "anna", "bo" };
List<string> store = navne.Select(n => n.ToUpper()).ToList();
Console.WriteLine(string.Join(" ", store));

List<int> laengder = navne.Select(n => n.Length).ToList();
Console.WriteLine(string.Join(" ", laengder));`,
        noter: [
          ["Select(x => x * x)", "Hvert tal bliver til sit kvadrat. Der kommer lige så mange elementer ud, som der gik ind."],
          ["Select(n => n.ToUpper())", "Hver tekst bliver til sig selv med store bogstaver."],
          ["Select(n => n.Length)", "Typen må gerne skifte: tekster ind, tal ud."]
        ],
        output: "1 4 9 16\nANNA BO\n4 2",
        md2: "Du kan **kæde** metoderne sammen: `tal.Where(…).Select(…).ToList()`. Hver metode arbejder videre på resultatet fra den forrige — læs det fra venstre mod højre." },
      { t: "forudsig",
        kode: R`List<int> tal = new List<int> { 2, 5, 8, 11 };
List<int> svar = tal.Where(x => x > 4).Select(x => x * 10).ToList();
Console.WriteLine(string.Join(" ", svar));`,
        output: "50 80 110",
        fordi: "Først `Where`: 5, 8 og 11 er større end 4. Derefter `Select`: hvert af dem ganges med 10. Rækkefølgen af metoderne betyder noget — læs dem fra venstre mod højre." },
      { t: "fejl",
        kode: R`List<int> tal = new List<int> { 3, 8, 1, 6 };
List<int> store = tal.Where(x > 5).ToList();
Console.WriteLine(store.Count);`,
        linje: 2,
        fordi: "`Where` skal have et **lambda-udtryk**, ikke bare en betingelse. Uden `x =>` ved compileren ikke, hvad `x` er, og siger: `The name 'x' does not exist in the current context`. Rettelsen er `tal.Where(x => x > 5)`.",
        rettet: R`List<int> tal = new List<int> { 3, 8, 1, 6 };
List<int> store = tal.Where(x => x > 5).ToList();
Console.WriteLine(store.Count);` },
      { t: "orden", q: "Sæt linjerne i rækkefølge, så programmet skriver priserne under 50 kr. med moms (25 % oveni).",
        linjer: [R`List<int> priser = new List<int> { 40, 80, 20 };`, R`List<int> billige = priser.Where(p => p < 50).ToList();`, R`List<double> medMoms = billige.Select(p => p * 1.25).ToList();`, R`Console.WriteLine(string.Join(" ", medMoms));`],
        output: "50 25",
        fordi: "Listen skal findes, før den kan filtreres. Der skal filtreres, før `billige` kan bruges i `Select`. Og først til sidst kan resultatet skrives ud." },
      { t: "skriv", q: "Listen `byer` er lavet. Brug `Where` til at finde de byer, der starter med `\"V\"` (brug `b.StartsWith(\"V\")`), og gem dem i en `List<string>`, der hedder `vByer`. Skriv dem ud med `string.Join(\", \", vByer)`.",
        foer: R`List<string> byer = new List<string> { "Aarhus", "Vejle", "Odense", "Viborg" };`,
        tjek: [
          [/(List<string>|var )vByer=byer\.Where\(/, "Start med `List<string> vByer = byer.Where(`"],
          [/Where\((\w+)=>\1\.StartsWith\("V"\)\)/, "Lambda-udtrykket: `b => b.StartsWith(\"V\")`"],
          [".ToList()", "Saml resultatet med `.ToList()`"],
          ['Console.WriteLine(string.Join(", ",vByer));', "Skriv ud: `Console.WriteLine(string.Join(\", \", vByer));`"]
        ],
        forkert: [R`List<string> vByer = byer.Where(b => b.StartsWith("V"));
Console.WriteLine(string.Join(", ", vByer));`],
        loesning: R`List<string> vByer = byer.Where(b => b.StartsWith("V")).ToList();
Console.WriteLine(string.Join(", ", vByer));`,
        output: "Vejle, Viborg" },
      { t: "ide", h: "Temperaturer med LINQ",
        md: "Lav et Console-projekt, `Temperaturer`. (Du har allerede en mappe med det navn fra modul 3: behold navnet, men skriv en ny mappe, fx `Modul09`, i feltet {{**Location**||**Solution directory**}}, når du opretter projektet.) Skriv koden selv. Kør den først normalt, og bagefter med debuggeren, så du kan **se** listerne.",
        kode: R`List<double> grader = new List<double> { 12.5, 18.0, 21.5, 9.0, 24.5, 16.0 };

List<double> varme = grader.Where(g => g >= 18).ToList();
List<double> fahrenheit = grader.Select(g => g * 9 / 5 + 32).ToList();

Console.WriteLine($"Varme dage: {string.Join(" | ", varme)}");
Console.WriteLine($"I fahrenheit: {string.Join(" | ", fahrenheit)}");`,
        output: "Varme dage: 18 | 21,5 | 24,5\nI fahrenheit: 54,5 | 64,4 | 70,7 | 48,2 | 76,1 | 60,8",
        win: ["Sæt et **breakpoint** på linjen med `Console.WriteLine` (klik i den grå margen til venstre).", "Start med **F5**. Når programmet stopper, så se i vinduet **Locals**. Fold `varme` og `fahrenheit` ud med den lille pil, og se elementerne."],
        mac: ["Sæt et **breakpoint** på linjen med `Console.WriteLine` (klik i margenen til venstre for linjenummeret).", "Start med den **grønne bille** 🐞. Når programmet stopper, så se i **Threads & Variables**. Fold `varme` og `fahrenheit` ud med den lille pil, og se elementerne."],
        md2: "Bemærk kommaet: på en dansk computer skriver C# `21,5`, ikke `21.5`. I koden skriver du altid punktum.\n\nUdvid selv: find de kolde dage (under 15 grader), og skriv dem ud med to tegn foran: `Select(g => $\"* {g}\")`." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er et lambda-udtryk, og hvad gør `Where` og `Select` med det?",
        svar: "Et **lambda-udtryk** er en **lille metode uden navn**, skrevet direkte der, hvor den skal bruges, fx `x => x > 5`. Til venstre for pilen står **parameteren**, til højre det, der **returneres**. `Where` kalder lambda-udtrykket for hvert element og **beholder dem, hvor svaret er true** — det er filtrering. `Select` kalder det for hvert element og **laver elementet om** til det, lambda-udtrykket returnerer. Med `ToList()` samler jeg resultatet i en ny liste.",
        noegle: ["lille metode", "parameter", "returnerer", "for hvert element", "filtrere", "ToList"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m09l2", titel: "Sortér, find og regn", min: 17,
    ord: [
      ["OrderBy", "Sorterer elementerne stigende efter det, lambda-udtrykket giver. OrderByDescending sorterer faldende."],
      ["Take", "Tager de første n elementer: `Take(3)`."],
      ["First", "Giver det første element (der opfylder en betingelse). Går ned, hvis der ikke er noget."],
      ["FirstOrDefault", "Som First, men giver standardværdien (null for objekter og tekst, 0 for tal), hvis der ikke er noget."],
      ["Any / All", "Any: findes der mindst ét element, der opfylder betingelsen? All: opfylder alle elementer den?"],
      ["Aggregatfunktion", "En metode, der regner mange værdier om til én: Count, Sum, Average, Min, Max."]
    ],
    trin: [
      { t: "laes", h: "Sortér med OrderBy",
        md: "`OrderBy` sorterer **stigende** (mindst først, A før B). `OrderByDescending` sorterer **faldende**. Lambda-udtrykket siger, **hvad der skal sorteres efter**. `Take(n)` tager de første n.",
        kode: R`List<int> tal = new List<int> { 7, 2, 9, 4 };
Console.WriteLine(string.Join(" ", tal.OrderBy(x => x)));
Console.WriteLine(string.Join(" ", tal.OrderByDescending(x => x)));

List<string> navne = new List<string> { "Ida", "Christian", "Bo", "Anna" };
Console.WriteLine(string.Join(" ", navne.OrderBy(n => n.Length)));
Console.WriteLine(string.Join(" ", navne.OrderBy(n => n).Take(2)));`,
        noter: [
          ["OrderBy(x => x)", "Sortér efter selve tallet."],
          ["OrderBy(n => n.Length)", "Sortér navnene efter deres **længde** — ikke alfabetisk."],
          [".Take(2)", "Tag kun de første 2 af resultatet."]
        ],
        output: "2 4 7 9\n9 7 4 2\nBo Ida Anna Christian\nAnna Bo",
        md2: "Forskellen fra `List.Sort()` i modul 6: `Sort()` **ændrer** selve listen. `OrderBy` lader den oprindelige liste være og giver et **nyt** resultat. Det gælder alle LINQ-metoder: de ændrer aldrig den samling, du starter med." },
      { t: "forudsig",
        kode: R`List<int> point = new List<int> { 45, 80, 62, 91, 30 };
List<int> top = point.OrderByDescending(p => p).Take(3).ToList();

Console.WriteLine(string.Join(" ", top));
Console.WriteLine(point[0]);`,
        output: "91 80 62\n45",
        fordi: "Sorteret faldende: 91, 80, 62, 45, 30. `Take(3)` tager de tre første. Den oprindelige liste er **uændret**, så `point[0]` er stadig 45." },
      { t: "laes", h: "Find ét element: First og FirstOrDefault",
        md: "Tit vil du ikke have en liste, men **ét** element: \"den første ordre over 1000 kr.\".\n\n- `First(betingelse)` giver det første element, der passer. Passer **ingen**, går programmet ned med en `InvalidOperationException`.\n- `FirstOrDefault(betingelse)` gør det samme, men giver **standardværdien**, hvis ingen passer: `null` for tekst og objekter, `0` for tal.",
        kode: R`List<string> navne = new List<string> { "Bo", "Anna", "Alfred" };

string a = navne.First(n => n.StartsWith("A"));
Console.WriteLine(a);

string? z = navne.FirstOrDefault(n => n.StartsWith("Z"));
Console.WriteLine(z == null);
Console.WriteLine(z ?? "ingen fundet");`,
        noter: [
          ["First(n => n.StartsWith(\"A\"))", "Den **første**, der passer — Anna, selvom Alfred også passer."],
          ["string? z", "Spørgsmålstegnet fra modul 7: variablen må være `null`. Det kan den blive her."],
          ["z ?? \"ingen fundet\"", "`??` fra modul 7: er `z` null, så brug teksten til højre i stedet."]
        ],
        output: "Anna\nTrue\ningen fundet",
        md2: "Tommelfingerregel: brug `FirstOrDefault` og tjek for `null`, når det er **muligt**, at intet passer. Det er det mønster, du skal bruge i web-projektet: \"find kunden med id 7 — og vis en fejlside, hvis den ikke findes\"." },
      { t: "valg", q: "`List<string> navne` indeholder \"Bo\" og \"Ida\". Hvad giver `navne.FirstOrDefault(n => n.Length > 5)`?",
        svar: ["null", "En InvalidOperationException", "\"Bo\"", "En tom tekst \"\""],
        ret: 0, fordi: "Intet navn er længere end 5 tegn. `FirstOrDefault` giver så standardværdien for `string`, som er `null`. Det er `First`, der ville gå ned." },
      { t: "fejl", q: "Programmet oversættes, men går ned, når det kører. Hvilken linje er skyld i det?",
        kode: R`List<int> alder = new List<int> { 12, 15, 9 };
int foersteVoksen = alder.First(a => a >= 18);
Console.WriteLine(foersteVoksen);`,
        linje: 2, logisk: true, fejler: true,
        fordi: "Ingen i listen er 18 eller ældre. `First` kaster en `InvalidOperationException` med beskeden *Sequence contains no matching element*. Med `FirstOrDefault` får du i stedet `0` — standardværdien for `int`.",
        rettet: R`List<int> alder = new List<int> { 12, 15, 9 };
int foersteVoksen = alder.FirstOrDefault(a => a >= 18);
Console.WriteLine(foersteVoksen);`,
        rettetOutput: "0" },
      { t: "laes", h: "Ja/nej-spørgsmål og optælling",
        md: "Tre metoder svarer på spørgsmål om hele samlingen:",
        kode: R`List<int> karakterer = new List<int> { 7, 12, 4, 10, 2 };

Console.WriteLine(karakterer.Any(k => k == 12));
Console.WriteLine(karakterer.All(k => k >= 2));
Console.WriteLine(karakterer.Count(k => k >= 7));
Console.WriteLine(karakterer.Count());`,
        noter: [
          ["Any(k => k == 12)", "Findes der **mindst én**, der passer? true/false."],
          ["All(k => k >= 2)", "Passer **alle**? true/false."],
          ["Count(k => k >= 7)", "**Hvor mange** passer?"],
          ["Count()", "Uden betingelse: hvor mange er der i alt. (På en List kan du også bruge propertyen `Count` uden parenteser.)"]
        ],
        output: "True\nTrue\n3\n5" },
      { t: "forudsig",
        kode: R`List<string> varer = new List<string> { "mælk", "brød", "smør", "ost" };

Console.WriteLine(varer.Any(v => v.Length == 3));
Console.WriteLine(varer.All(v => v.Length == 4));
Console.WriteLine(varer.Count(v => v.Contains("ø")));`,
        output: "True\nFalse\n2",
        fordi: "\"ost\" har 3 tegn, så `Any` er sand. \"ost\" har **ikke** 4 tegn, så `All` er falsk. \"brød\" og \"smør\" indeholder ø." },
      { t: "laes", h: "Regn på det hele: Sum, Average, Min, Max",
        md: "Du skrev selv sum, gennemsnit og største værdi med løkker i modul 3. I LINQ er de færdige. De kaldes **aggregatfunktioner**: de regner mange værdier om til **én**.",
        kode: R`List<int> point = new List<int> { 4, 7, 10, 2 };

Console.WriteLine(point.Sum());
Console.WriteLine(point.Average());
Console.WriteLine(point.Min());
Console.WriteLine(point.Max());

List<string> ord = new List<string> { "hus", "computer", "bil" };
Console.WriteLine(ord.Max(o => o.Length));`,
        noter: [
          ["Average()", "Gennemsnittet er altid en `double` — også når tallene er heltal. Derfor kan der komme decimaler."],
          ["Max(o => o.Length)", "Med et lambda-udtryk: \"den største **længde**\". Du får tallet 8, ikke ordet."]
        ],
        output: "23\n5,75\n2\n10\n8",
        md2: "`5,75` står med **komma**, fordi computeren er sat op til dansk. Det samme gælder alle decimaltal, du skriver ud." },
      { t: "forudsig",
        kode: R`List<int> tal = new List<int> { 3, 8, 6, 1 };
Console.WriteLine(tal.Where(t => t > 2).Sum());
Console.WriteLine(tal.Average());
Console.WriteLine(tal.Max() - tal.Min());`,
        output: "17\n4,5\n7",
        fordi: "3 + 8 + 6 = 17 (1 er ikke større end 2). Gennemsnittet er 18 / 4 = 4,5 — en `double`, skrevet med dansk komma. Største minus mindste: 8 − 1 = 7." },
      { t: "spor", h: "Spor: fire svar fra én liste",
        q: "Hver linje stiller ét spørgsmål til arrayet `point`. Skriv værdien af hver variabel, lige efter at linjen er udført. Skriv `True`/`False` for ja/nej-svar — sådan skriver C# dem.",
        kode: R`int[] point = { 7, 12, 4, 10, 2 };
int antal = point.Count(p => p >= 7);
int bedst = point.Max();
int sum = point.Where(p => p < 10).Sum();
bool alleBestaaet = point.All(p => p >= 2);`,
        kolonner: ["antal", "bedst", "sum", "alleBestaaet"],
        raekker: [[2, "=3", "=–", "=–", "=–"], [3, "3", "12", "–", "–"], [4, "3", "12", "13", "–"], [5, "3", "12", "13", "True"]],
        fordi: "7, 12 og 10 er mindst 7 → 3. Den største er 12. Tallene under 10 er 7, 4 og 2 → 13. Alle er mindst 2 → `True`. Arrayet `point` bliver aldrig ændret undervejs." },
      { t: "udfyld", q: "Find den dyreste pris og de to billigste priser.",
        kode: R`List<int> priser = new List<int> { 49, 15, 120, 35 };
int dyrest = priser.[[Max]]();
List<int> billigst = priser.[[OrderBy]](p => p).[[Take]](2).ToList();
Console.WriteLine(dyrest);
Console.WriteLine(string.Join(" ", billigst));`,
        output: "120\n15 35",
        fordi: "`Max()` giver den største. `OrderBy` sorterer stigende, så de billigste kommer først, og `Take(2)` tager de to første." },
      { t: "skriv", q: "Listen `karakterer` er lavet. Beregn gennemsnittet af de karakterer, der er **2 eller derover** (brug `Where` og `Average`), og gem det i en `double`, der hedder `snit`. Skriv `snit` ud.",
        foer: R`List<int> karakterer = new List<int> { 12, -3, 7, 0, 10 };`,
        tjek: [
          [/(double|var) snit=karakterer\.Where\(/, "Start med `double snit = karakterer.Where(`"],
          [/Where\((\w+)=>(\1>=2|\1>1|2<=\1|1<\1)\)/, "Betingelsen: `k => k >= 2`"],
          [".Average()", "Beregn gennemsnittet med `.Average()`"],
          ["Console.WriteLine(snit);", "Skriv `snit` ud"]
        ],
        loesning: R`double snit = karakterer.Where(k => k >= 2).Average();
Console.WriteLine(snit);`,
        output: "9,666666666666666",
        hint: "Kæd de to metoder: først filtrere med `Where`, så regne med `Average()`." },
      { t: "ide", h: "Karakterstatistik",
        md: "Lav et Console-projekt, `Karakterstatistik`. Brugeren skriver karakterer, indtil der trykkes Enter på en tom linje. Bagefter skriver programmet en statistik — kun med LINQ, ingen løkker til udregningerne.",
        kode: R`List<int> karakterer = new List<int>();

while (true)
{
    Console.Write("Karakter (Enter = færdig): ");
    string svar = Console.ReadLine() ?? "";
    if (svar == "")
    {
        break;
    }
    if (int.TryParse(svar, out int k))
    {
        karakterer.Add(k);
    }
}

if (karakterer.Any())
{
    Console.WriteLine($"Antal: {karakterer.Count}");
    Console.WriteLine($"Gennemsnit: {karakterer.Average():F1}");
    Console.WriteLine($"Højeste: {karakterer.Max()}, laveste: {karakterer.Min()}");
    Console.WriteLine($"Bestået: {karakterer.Count(x => x >= 2)}");
    Console.WriteLine($"Sorteret: {string.Join(" ", karakterer.OrderByDescending(x => x))}");
}
else
{
    Console.WriteLine("Ingen karakterer");
}`,
        md2: "`:F1` efter et tal i `$\"...\"` betyder: vis én decimal. `?? \"\"` sørger for, at `svar` aldrig er `null`.\n\nPrøv at fjerne `if (karakterer.Any())` og trykke Enter med det samme. `Average()` på en tom liste går ned — derfor tjekket." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på `First` og `FirstOrDefault`, og hvornår bruger du hvilken?",
        svar: "Begge giver det **første element**, der opfylder betingelsen. Findes der **intet**, kaster `First` en **exception**, så programmet går ned, mens `FirstOrDefault` returnerer **standardværdien** — `null` for objekter og tekst, `0` for tal. Jeg bruger `First`, når jeg er **sikker** på, at der er et match, og `FirstOrDefault`, når det er muligt, at intet passer — og så **tjekker jeg for null** bagefter, fx når jeg leder efter en kunde ud fra et id, brugeren har skrevet.",
        noegle: ["første element", "exception", "standardværdi", "null", "tjekke"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m09l3", titel: "LINQ på objekter, GroupBy og query syntax", min: 18,
    ord: [
      ["Projektion", "At lave hvert element om til en anden form med Select — fx kun tage navnet ud af et produkt."],
      ["Anonym type", "En type uden navn, som compileren selv laver: `new { p.Navn, p.Pris }`. Kræver var."],
      ["GroupBy", "LINQ-metode, der samler elementerne i grupper, som har den samme nøgle."],
      ["Key", "Det, en gruppe fra GroupBy er samlet efter — fx kategorien."],
      ["Method syntax", "LINQ skrevet med metoder og lambda: `produkter.Where(p => p.Pris < 20)`."],
      ["Query syntax", "LINQ skrevet som en sætning: `from p in produkter where p.Pris < 20 select p`."],
      ["Udskudt udførelse (deferred execution)", "En LINQ-forespørgsel bliver først kørt, når man bruger resultatet — ikke når den skrives."]
    ],
    trin: [
      { t: "laes", h: "LINQ på en liste af objekter",
        md: "Den rigtige styrke ved LINQ ser du på **lister af objekter**. Det er sådan, data ser ud i et rigtigt program — og senere fra databasen. Lambda-udtrykket får **ét objekt** ad gangen, og du kan bruge alle dets properties.",
        kode: R`List<Produkt> produkter = new List<Produkt>
{
    new Produkt { Navn = "Æbler", Kategori = "Frugt", Pris = 15 },
    new Produkt { Navn = "Ost", Kategori = "Mejeri", Pris = 49 },
    new Produkt { Navn = "Bananer", Kategori = "Frugt", Pris = 12 },
    new Produkt { Navn = "Mælk", Kategori = "Mejeri", Pris = 11 }
};

List<string> billige = produkter
    .Where(p => p.Pris < 20)
    .OrderBy(p => p.Pris)
    .Select(p => p.Navn)
    .ToList();

Console.WriteLine(string.Join(", ", billige));

class Produkt
{
    public string Navn { get; set; } = "";
    public string Kategori { get; set; } = "";
    public decimal Pris { get; set; }
}`,
        noter: [
          ["p => p.Pris < 20", "`p` er ét `Produkt`. Behold det, hvis prisen er under 20."],
          [".OrderBy(p => p.Pris)", "Sortér produkterne efter pris."],
          [".Select(p => p.Navn)", "Tag kun navnet ud. Nu er det en række **tekster**, ikke produkter."],
          ["Én metode pr. linje", "En lang kæde skrives tit med punktummet først på hver linje. Det er stadig **én** sætning med ét semikolon til sidst."],
          ["= \"\";", "Giver propertyen en startværdi, så den aldrig er `null`. Det fjerner compilerens gule advarsel."]
        ],
        output: "Mælk, Bananer, Æbler" },
      { t: "forudsig",
        kode: R`List<Vare> varer = new List<Vare>
{
    new Vare { Navn = "Kaffe", Pris = 45, PaaLager = true },
    new Vare { Navn = "Te", Pris = 30, PaaLager = false },
    new Vare { Navn = "Kakao", Pris = 38, PaaLager = true }
};

Console.WriteLine(varer.Where(v => v.PaaLager).Sum(v => v.Pris));
Console.WriteLine(varer.OrderBy(v => v.Pris).First().Navn);
Console.WriteLine(varer.Any(v => v.Pris > 40));

class Vare
{
    public string Navn { get; set; } = "";
    public int Pris { get; set; }
    public bool PaaLager { get; set; }
}`,
        output: "83\nTe\nTrue",
        fordi: "På lager: Kaffe (45) og Kakao (38) = 83. Sorteret efter pris er Te (30) først. Kaffe koster over 40, så `Any` er sand. `Sum(v => v.Pris)` siger, **hvad** der skal lægges sammen." },
      { t: "laes", h: "Anonyme typer: kun det, du skal bruge",
        md: "Med `Select` kan du lave hvert objekt om til et **nyt, mindre objekt** med kun de properties, du har brug for. Det kaldes **projektion**.\n\nDu behøver ikke skrive en klasse til det. `new { … }` uden et klassenavn laver en **anonym type** — en type, compileren selv finder på. Da typen ikke har noget navn, **skal** du bruge `var`.",
        kode: R`List<Produkt> produkter = new List<Produkt>
{
    new Produkt { Navn = "Ost", Pris = 40 },
    new Produkt { Navn = "Mælk", Pris = 12 }
};

var medMoms = produkter.Select(p => new { p.Navn, Moms = p.Pris * 0.25m });

foreach (var x in medMoms)
{
    Console.WriteLine($"{x.Navn}: moms {x.Moms} kr.");
}

class Produkt
{
    public string Navn { get; set; } = "";
    public decimal Pris { get; set; }
}`,
        noter: [
          ["new { p.Navn, Moms = … }", "En anonym type med to properties: `Navn` (navnet tages fra `p.Navn`) og `Moms`."],
          ["0.25m", "`m` gør tallet til en `decimal` (modul 1), så det kan ganges med en `decimal`-pris."],
          ["var", "Typen har intet navn, så du kan ikke skrive den. `var` lader compileren holde styr på den."]
        ],
        output: "Ost: moms 10,00 kr.\nMælk: moms 3,00 kr.",
        md2: "Det her bruges meget i web-kode: du sender kun de felter til siden, den skal vise — ikke hele objektet med alt, hvad det indeholder." },
      { t: "udfyld", q: "Lav en anonym type med elevens navn og om eleven har bestået (karakter 2 eller derover).",
        kode: R`List<Elev> elever = new List<Elev>
{
    new Elev { Navn = "Maja", Karakter = 10 },
    new Elev { Navn = "Ali", Karakter = 0 }
};

[[var]] resultat = elever.Select(e => [[new]] { e.Navn, Bestaaet = e.Karakter >= 2 });

foreach (var r in resultat)
{
    Console.WriteLine($"{r.Navn}: {r.Bestaaet}");
}

class Elev
{
    public string Navn { get; set; } = "";
    public int Karakter { get; set; }
}`,
        output: "Maja: True\nAli: False",
        fordi: "En anonym type laves med `new { … }` uden klassenavn, og variablen skal være `var`, fordi typen ikke har et navn, man kan skrive." },
      { t: "laes", h: "GroupBy: saml i grupper",
        md: "`GroupBy` samler de elementer, der har **den samme nøgle**, i én gruppe. Lambda-udtrykket siger, hvad der skal grupperes efter.\n\nHver gruppe har en `Key` (det, gruppen er samlet efter) og kan selv bruges med LINQ: `g.Count()`, `g.Sum(…)` og så videre.",
        kode: R`List<Produkt> produkter = new List<Produkt>
{
    new Produkt { Navn = "Æbler", Kategori = "Frugt", Pris = 15 },
    new Produkt { Navn = "Ost", Kategori = "Mejeri", Pris = 49 },
    new Produkt { Navn = "Bananer", Kategori = "Frugt", Pris = 12 },
    new Produkt { Navn = "Mælk", Kategori = "Mejeri", Pris = 11 },
    new Produkt { Navn = "Rugbrød", Kategori = "Brød", Pris = 24 }
};

var grupper = produkter.GroupBy(p => p.Kategori);

foreach (var g in grupper)
{
    Console.WriteLine($"{g.Key}: {g.Count()} varer, i alt {g.Sum(p => p.Pris)} kr.");
}

class Produkt
{
    public string Navn { get; set; } = "";
    public string Kategori { get; set; } = "";
    public decimal Pris { get; set; }
}`,
        noter: [
          ["GroupBy(p => p.Kategori)", "Lav én gruppe pr. kategori."],
          ["g.Key", "Kategorien for denne gruppe: \"Frugt\", \"Mejeri\" eller \"Brød\"."],
          ["g.Count(), g.Sum(…)", "En gruppe er selv en samling, så LINQ virker på den."]
        ],
        output: "Frugt: 2 varer, i alt 27 kr.\nMejeri: 2 varer, i alt 60 kr.\nBrød: 1 varer, i alt 24 kr.",
        md2: "Grupperne kommer i den rækkefølge, deres **første** element står i listen. Det svarer til `GROUP BY` i SQL, som du møder i modul 12." },
      { t: "forudsig",
        kode: R`string[] stemmer = { "pizza", "sushi", "pizza", "burger", "pizza", "sushi" };

foreach (var g in stemmer.GroupBy(s => s).OrderByDescending(g => g.Count()))
{
    Console.WriteLine($"{g.Key}: {g.Count()}");
}`,
        output: "pizza: 3\nsushi: 2\nburger: 1",
        fordi: "`GroupBy(s => s)` grupperer efter selve teksten, så hver ret får sin gruppe. `OrderByDescending(g => g.Count())` sorterer grupperne, så den med flest stemmer kommer først. Sammenlign med optællingen med en Dictionary i modul 6 — det er det samme på to linjer." },
      { t: "valg", q: "Du har en `List<Ordre>`, hvor hver ordre har en `Kunde`. Du vil vide, hvor mange ordrer hver kunde har. Hvilken LINQ-metode skal du bruge først?",
        svar: ["GroupBy(o => o.Kunde)", "OrderBy(o => o.Kunde)", "Where(o => o.Kunde)", "First(o => o.Kunde)"],
        ret: 0, fordi: "`GroupBy` samler ordrerne pr. kunde. Bagefter giver `g.Key` kunden og `g.Count()` antallet. `OrderBy` sorterer kun — den tæller ikke." },
      { t: "laes", h: "Query syntax: den samme forespørgsel som en sætning",
        md: "Indtil nu har du skrevet LINQ med metoder og lambda. Det kaldes **method syntax**. Der findes også en anden skrivemåde, **query syntax**, der ligner SQL. Compileren laver den om til præcis de samme metodekald.",
        kode: R`List<int> tal = new List<int> { 5, 12, 3, 20, 8 };

// Method syntax
List<int> a = tal.Where(x => x > 4).OrderBy(x => x).Select(x => x * 10).ToList();

// Query syntax
List<int> b = (from x in tal
               where x > 4
               orderby x
               select x * 10).ToList();

Console.WriteLine(string.Join(" ", a));
Console.WriteLine(string.Join(" ", b));`,
        noter: [
          ["from x in tal", "\"For hvert x i tal\" — svarer til parameteren i lambda-udtrykkene."],
          ["where x > 4", "Svarer til `.Where(x => x > 4)`."],
          ["orderby x", "Svarer til `.OrderBy(x => x)`. Skrives `orderby x descending` for faldende."],
          ["select x * 10", "Svarer til `.Select(x => x * 10)`. Query syntax **skal** slutte med `select` (eller `group`)."]
        ],
        output: "50 80 120 200\n50 80 120 200",
        md2: "Du skal kunne **læse** begge, for du møder begge i eksempler på nettet. I dette kursus bruger vi mest method syntax — den har alle metoderne (fx `Count`, `First` og `Take`, som ikke findes som ord i query syntax)." },
      { t: "orden", q: "Sæt linjerne i rækkefølge, så programmet skriver navnene på de produkter, der koster under 20 kr. Brug query syntax. `Produkt` er en `record` (modul 7) — en hel klasse på én linje.",
        linjer: [R`List<Produkt> varer = new List<Produkt> { new Produkt("Ost", 49), new Produkt("Mælk", 11), new Produkt("Brød", 18) };`, R`var billige = from p in varer`, R`              where p.Pris < 20`, R`              select p.Navn;`, R`Console.WriteLine(string.Join(", ", billige));`, R`record Produkt(string Navn, int Pris);`],
        output: "Mælk, Brød",
        fordi: "Query syntax starter altid med `from` og slutter med `select`; `where` står imellem. Listen skal findes, før forespørgslen kan bruge den, og typen står nederst efter alle sætningerne." },
      { t: "laes", h: "Udskudt udførelse: forespørgslen kører først, når du bruger den",
        md: "En vigtig detalje: `tal.Where(…)` laver **ikke** listen med det samme. Den laver en **opskrift**. Opskriften bliver først fulgt, når du **bruger** resultatet — med `foreach`, `ToList()`, `Count()` eller lignende. Det kaldes **udskudt udførelse** (*deferred execution*).\n\nSå hvis listen ændrer sig, før du bruger forespørgslen, ser du ændringen:",
        kode: R`List<int> tal = new List<int> { 1, 5, 8 };

var store = tal.Where(x => x > 4);
List<int> kopi = tal.Where(x => x > 4).ToList();

tal.Add(10);

Console.WriteLine(string.Join(" ", store));
Console.WriteLine(string.Join(" ", kopi));`,
        noter: [
          ["var store = tal.Where(…)", "Kun en opskrift. Der er ikke fundet noget endnu."],
          ["….ToList()", "Kør opskriften **nu**, og gem resultatet i en ny liste."],
          ["tal.Add(10)", "Ændrer den oprindelige liste."],
          ["string.Join(\" \", store)", "**Nu** køres opskriften — og 10 er med."]
        ],
        output: "5 8 10\n5 8",
        md2: "Reglen: vil du have resultatet **fastfrosset**, så kald `ToList()`. Det bliver vigtigt med databaser i modul 17: dér er det først `ToList()` (eller `ToListAsync()`), der sender forespørgslen af sted til databasen." },
      { t: "spor", h: "Spor: opskrift eller færdig liste?",
        q: "`store` er en opskrift, der køres, hver gang den bruges. `kopi` er en færdig liste. Skriv værdierne, lige efter at linjen er udført. `store.Count()` kører opskriften og tæller.",
        kode: R`List<int> tal = new List<int> { 1, 5, 8 };
var store = tal.Where(x => x > 4);
List<int> kopi = store.ToList();
tal.Add(10);
tal.Add(2);`,
        kolonner: ["tal.Count", "store.Count()", "kopi.Count"],
        raekker: [[1, "=3", "=–", "=–"], [2, "3", "2", "–"], [3, "3", "2", "2"], [4, "4", "3", "2"], [5, "5", "3", "2"]],
        fordi: "`kopi` blev fastfrosset i linje 3 og ændrer sig aldrig. `store` kører opskriften igen, hver gang den tælles: efter linje 4 er 10 med (3), men 2 i linje 5 er ikke over 4, så den bliver ved med at give 3." },
      { t: "skriv", q: "Listen `kunder` og klassen `Kunde` er lavet. Lav en `List<string>`, der hedder `aarhus`, med **navnene** på de kunder, der bor i `\"Aarhus\"`, sorteret alfabetisk. Brug `Where`, `OrderBy`, `Select` og `ToList`. Skriv dem ud med `string.Join(\", \", aarhus)`.",
        foer: R`List<Kunde> kunder = new List<Kunde>
{
    new Kunde { Navn = "Carl", By = "Aarhus" },
    new Kunde { Navn = "Bo", By = "Odense" },
    new Kunde { Navn = "Anna", By = "Aarhus" }
};`,
        efter: R`class Kunde
{
    public string Navn { get; set; } = "";
    public string By { get; set; } = "";
}`,
        tjek: [
          [/(List<string>|var )aarhus=kunder\./, "Start med `List<string> aarhus = kunder.`"],
          [/Where\((\w+)=>\1\.By=="Aarhus"\)/, "Filtrér: `.Where(k => k.By == \"Aarhus\")`"],
          [/OrderBy\((\w+)=>\1\.Navn\)/, "Sortér efter navn: `.OrderBy(k => k.Navn)`"],
          [/Select\((\w+)=>\1\.Navn\)\.ToList\(\)/, "Tag navnet ud, og lav en liste: `.Select(k => k.Navn).ToList()`"],
          ['Console.WriteLine(string.Join(", ",aarhus));', "Skriv listen ud"]
        ],
        loesning: R`List<string> aarhus = kunder
    .Where(k => k.By == "Aarhus")
    .OrderBy(k => k.Navn)
    .Select(k => k.Navn)
    .ToList();
Console.WriteLine(string.Join(", ", aarhus));`,
        output: "Anna, Carl",
        hint: "`OrderBy` skal stå **før** `Select`. Efter `Select(k => k.Navn)` er der kun tekster tilbage — så findes `k.Navn` ikke længere." },
      { t: "ide", h: "Ordreoversigt",
        md: "Lav et Console-projekt, `Ordreoversigt`. Programmet laver en lille rapport over ordrer pr. kunde. Skriv det selv, og kør det. Sæt bagefter et breakpoint på `foreach`-linjen, og fold `prKunde` ud i debuggeren — du kan se grupperne og deres elementer.",
        kode: R`List<Ordre> ordrer = new List<Ordre>
{
    new Ordre { Kunde = "Anna", Beloeb = 250 },
    new Ordre { Kunde = "Bo", Beloeb = 120 },
    new Ordre { Kunde = "Anna", Beloeb = 400 },
    new Ordre { Kunde = "Carl", Beloeb = 90 },
    new Ordre { Kunde = "Bo", Beloeb = 300 }
};

var prKunde = ordrer
    .GroupBy(o => o.Kunde)
    .Select(g => new { Kunde = g.Key, Antal = g.Count(), Total = g.Sum(o => o.Beloeb) })
    .OrderByDescending(x => x.Total)
    .ToList();

foreach (var k in prKunde)
{
    Console.WriteLine($"{k.Kunde}: {k.Antal} ordrer, {k.Total} kr.");
}

Console.WriteLine($"Største ordre: {ordrer.Max(o => o.Beloeb)} kr.");

class Ordre
{
    public string Kunde { get; set; } = "";
    public decimal Beloeb { get; set; }
}`,
        output: "Anna: 2 ordrer, 650 kr.\nBo: 2 ordrer, 420 kr.\nCarl: 1 ordrer, 90 kr.\nStørste ordre: 400 kr.",
        md2: "Udvid selv: skriv kun de kunder ud, hvis total er over 200 kr. Hvor i kæden skal `Where` stå — og hvad hedder propertyen, du skal filtrere på?" },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er udskudt udførelse (deferred execution) i LINQ, og hvorfor betyder det noget?",
        svar: "En LINQ-forespørgsel som `tal.Where(x => x > 4)` bliver **ikke kørt, når den skrives**. Den er en **opskrift**, som først bliver udført, når man **bruger resultatet** — med `foreach`, `Count()` eller `ToList()`. Ændrer man listen imellem, kommer ændringen med. Vil man have resultatet **fastfrosset**, kalder man `ToList()`. Det betyder noget med databaser: forespørgslen bliver først sendt til databasen, når man kalder `ToList()`, så man kan bygge den op i flere trin uden at hente data for tidligt.",
        noegle: ["opskrift", "bruger resultatet", "ToList", "fastfrosset", "database"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m09l4", titel: "Filer: skriv og læs tekst", min: 17,
    ord: [
      ["Fil", "Data, der er gemt på disken med et navn. Den overlever, når programmet lukker."],
      ["Sti (path)", "Hvor en fil ligger: en mappe og et filnavn, fx `data\\kunder.txt`."],
      ["Arbejdsmappe", "Den mappe, programmet kører i. Et filnavn uden mappe betyder en fil i arbejdsmappen."],
      ["File", "Klasse med færdige static metoder til filer: WriteAllText, ReadAllText, ReadAllLines, AppendAllText, Exists."],
      ["Stream", "En strøm af data, der læses eller skrives lidt ad gangen i stedet for alt på én gang."],
      ["StreamWriter / StreamReader", "Klasser, der skriver og læser en tekstfil linje for linje."],
      ["using-blok", "Sørger for, at en fil bliver lukket, når blokken slutter — også hvis noget går galt."]
    ],
    trin: [
      { t: "laes", h: "Data, der overlever",
        md: "Alt, hvad dine programmer har lavet indtil nu, forsvinder, når programmet lukker: variabler og lister ligger kun i hukommelsen. Skal data **gemmes**, skal de skrives i en **fil** på disken (eller i en database — modul 12).\n\nKlassen `File` har færdige metoder til det. De er `static`, så du skriver bare `File.` foran.",
        kode: R`File.WriteAllText("hilsen.txt", "Hej fra C#");

string indhold = File.ReadAllText("hilsen.txt");
Console.WriteLine(indhold);`,
        noter: [
          ["File.WriteAllText(navn, tekst)", "Lav filen, og skriv teksten i den. Findes filen i forvejen, bliver den **overskrevet**."],
          ["File.ReadAllText(navn)", "Læs hele filen, og giv den tilbage som én `string`."],
          ["\"hilsen.txt\"", "Kun et filnavn, ingen mappe. Så havner filen i programmets **arbejdsmappe**."]
        ],
        output: "Hej fra C#" },
      { t: "laes", h: "Hvor ligger filen?",
        md: "Når du kører fra {{Visual Studio||Rider}}, er arbejdsmappen den mappe, hvor det færdige program ligger: **bin/Debug/net10.0** inde i din projektmappe. Det er dér, `hilsen.txt` dukker op.\n\nSkal filen ligge i en undermappe, så byg **stien** med `Path.Combine`. Den sætter det rigtige skilletegn ind — `\\` på Windows og `/` på Mac.",
        kode: R`string mappe = "data";
Directory.CreateDirectory(mappe);

string sti = Path.Combine(mappe, "kunder.txt");
File.WriteAllText(sti, "Anna");

Console.WriteLine(Path.GetFileName(sti));
Console.WriteLine(File.Exists(sti));`,
        noter: [
          ["Directory.CreateDirectory(mappe)", "Lav mappen, hvis den ikke findes. Findes den, sker der ingenting."],
          ["Path.Combine(\"data\", \"kunder.txt\")", "Giver `data\\kunder.txt` på Windows og `data/kunder.txt` på Mac."],
          ["Path.GetFileName(sti)", "Kun filnavnet, uden mapper."],
          ["File.Exists(sti)", "Findes filen? true/false."]
        ],
        output: "kunder.txt\nTrue",
        md2: "Vil du se den fulde sti, så skriv `Console.WriteLine(Path.GetFullPath(sti));`. Det gør du i lektionens `ide`-trin." },
      { t: "valg", q: "Du kører et program i Visual Studio eller Rider, der kalder `File.WriteAllText(\"log.txt\", \"start\")`. Hvor havner `log.txt`?",
        svar: ["I arbejdsmappen: bin/Debug/net10.0 inde i projektmappen", "Ved siden af Program.cs", "På skrivebordet", "Ingen steder — der mangler en mappe i navnet"],
        ret: 0, fordi: "Et filnavn uden mappe betyder \"i arbejdsmappen\". Når du kører fra IDE'en, er det mappen med det færdige program: bin/Debug/net10.0. Derfor kan du ikke se filen ved siden af Program.cs." },
      { t: "forudsig",
        kode: R`File.WriteAllText("liste.txt", "mælk\n");
File.AppendAllText("liste.txt", "brød\n");
File.AppendAllText("liste.txt", "ost\n");
File.WriteAllText("liste.txt", "æg\n");
File.AppendAllText("liste.txt", "smør\n");

Console.Write(File.ReadAllText("liste.txt"));`,
        output: "æg\nsmør",
        fordi: "`AppendAllText` skriver **til sidst** i filen. Men linje 4 bruger `WriteAllText`, som **overskriver** alt — så mælk, brød og ost forsvinder. Bagefter tilføjes smør." },
      { t: "laes", h: "Linje for linje: ReadAllLines og WriteAllLines",
        md: "Tit består en fil af **linjer**: én kunde, én vare eller én måling pr. linje. Så er det smartest at læse den som et **array af linjer**.",
        kode: R`string[] byer = { "Aarhus", "Odense", "Aalborg" };
File.WriteAllLines("byer.txt", byer);

string[] linjer = File.ReadAllLines("byer.txt");
Console.WriteLine(linjer.Length);

foreach (string linje in linjer)
{
    Console.WriteLine($"- {linje}");
}

Console.WriteLine(File.Exists("findes-ikke.txt"));`,
        noter: [
          ["File.WriteAllLines(navn, array)", "Skriv hvert element på sin egen linje."],
          ["File.ReadAllLines(navn)", "Læs filen, og giv et `string[]` med én plads pr. linje."],
          ["File.Exists(…)", "Tjek altid, om filen findes, før du læser den. `ReadAllText` på en fil, der ikke findes, får programmet til at gå ned."]
        ],
        output: "3\n- Aarhus\n- Odense\n- Aalborg\nFalse",
        md2: "Fordi `ReadAllLines` giver et array, kan du bruge LINQ direkte på filens linjer: `File.ReadAllLines(\"byer.txt\").Where(b => b.StartsWith(\"A\"))`." },
      { t: "udfyld", q: "Gem tre navne i en fil, læs dem igen, og skriv antallet af linjer.",
        kode: R`string[] navne = { "Anna", "Bo", "Carl" };
File.[[WriteAllLines]]("navne.txt", navne);

string[] laest = File.[[ReadAllLines]]("navne.txt");
Console.WriteLine(laest.[[Length|Count()]]);`,
        output: "3",
        fordi: "`WriteAllLines` skriver et array med én linje pr. element, og `ReadAllLines` giver et array tilbage. Et array har `Length`." },
      { t: "fejl",
        kode: R`File.WriteAllLines("tal.txt", new string[] { "4", "7" });
string[] linjer = File.ReadAllText("tal.txt");
Console.WriteLine(linjer.Length);`,
        linje: 2,
        fordi: "`ReadAllText` giver **én** `string` med hele filen — ikke et array. Compileren siger: `Cannot implicitly convert type 'string' to 'string[]'`. Rettelsen er `File.ReadAllLines`.",
        rettet: R`File.WriteAllLines("tal.txt", new string[] { "4", "7" });
string[] linjer = File.ReadAllLines("tal.txt");
Console.WriteLine(linjer.Length);`,
        output: "2" },
      { t: "spor", h: "Spor: læs tal fra en fil",
        q: "Programmet gemmer tre tal i en fil og lægger dem sammen igen. Skriv `linjer.Length` og `sum`, lige efter at linjen er udført. Linje 6 køres én gang pr. linje i filen.",
        kode: R`File.WriteAllText("point.txt", "4\n10\n7");
string[] linjer = File.ReadAllLines("point.txt");
int sum = 0;
foreach (string l in linjer)
{
    sum += int.Parse(l);
}`,
        kolonner: ["linjer.Length", "sum"],
        raekker: [[2, "=3", "=–"], [3, "3", "0"], [6, "3", "4"], [6, "3", "14"], [6, "3", "21"]],
        fordi: "Filen har tre linjer, så arrayet har længden 3. Hver linje er en **tekst** (\"4\", \"10\", \"7\"), som `int.Parse` laver om til et tal, før det lægges til `sum`." },
      { t: "laes", h: "StreamWriter og using",
        md: "`File.WriteAllText` er perfekt til små filer. Men skal du skrive **mange** linjer lidt ad gangen — fx en log — bruger man en **stream**: en strøm, der skrives til linje for linje. Klassen hedder `StreamWriter`.\n\nEn stream holder filen **åben**, og den **skal lukkes** bagefter. Ellers kan de sidste linjer gå tabt, og andre programmer kan ikke åbne filen. Det klarer `using`-blokken: når blokken slutter, bliver filen lukket — også hvis noget går galt indeni.",
        kode: R`using (StreamWriter skriver = new StreamWriter("log.txt"))
{
    skriver.WriteLine("Program startet");
    for (int i = 1; i <= 3; i++)
    {
        skriver.WriteLine($"Trin {i} færdigt");
    }
}

Console.WriteLine(File.ReadAllLines("log.txt").Length);`,
        noter: [
          ["using (… = new StreamWriter(\"log.txt\"))", "Åbn filen til skrivning (den overskrives). `using` lover at lukke den igen."],
          ["skriver.WriteLine(…)", "Præcis som `Console.WriteLine` — bare til filen i stedet for skærmen."],
          ["}", "Her slutter blokken, og filen bliver lukket."]
        ],
        output: "4",
        md2: "Skal der skrives **til sidst** i en eksisterende fil, så skriv `new StreamWriter(\"log.txt\", true)` — `true` betyder \"tilføj\". Du vil også se den korte form `using StreamWriter skriver = new StreamWriter(\"log.txt\");` uden tuborgklammer: så lukkes filen, når metoden slutter." },
      { t: "laes", h: "StreamReader: læs en linje ad gangen",
        md: "`StreamReader` er det modsatte: den læser **én linje ad gangen** med `ReadLine()`. Det er smart til store filer, fordi hele filen aldrig ligger i hukommelsen på én gang. `EndOfStream` bliver `true`, når der ikke er flere linjer.",
        kode: R`File.WriteAllLines("varer.txt", new string[] { "kaffe", "te", "kakao" });

int nr = 0;
using (StreamReader laeser = new StreamReader("varer.txt"))
{
    while (!laeser.EndOfStream)
    {
        string? linje = laeser.ReadLine();
        nr++;
        Console.WriteLine($"{nr}: {linje}");
    }
}`,
        noter: [
          ["new StreamReader(\"varer.txt\")", "Åbn filen til læsning."],
          ["!laeser.EndOfStream", "Så længe vi **ikke** er nået til enden af filen."],
          ["string? linje = laeser.ReadLine();", "Læs næste linje. Typen er `string?`, fordi `ReadLine` kan give `null`, når filen er slut."]
        ],
        output: "1: kaffe\n2: te\n3: kakao" },
      { t: "skriv", q: "Skriv en `using`-blok med en `StreamWriter`, der hedder `w`, og som skriver til filen `\"noter.txt\"`. Skriv de to linjer `\"Køb mælk\"` og `\"Ring til Bo\"` med `w.WriteLine`. **Efter** blokken skal du skrive antallet af linjer i filen ud med `File.ReadAllLines(\"noter.txt\").Length`.",
        tjek: [
          [/using\((StreamWriter|var) w=new StreamWriter\("noter\.txt"\)\)\{/, "Start blokken: `using (StreamWriter w = new StreamWriter(\"noter.txt\")) {`"],
          ['w.WriteLine("Køb mælk");w.WriteLine("Ring til Bo");', "Skriv de to linjer i rækkefølge med `w.WriteLine`"],
          [/\}Console\.WriteLine\(File\.ReadAllLines\("noter\.txt"\)\.Length\);/, "**Efter** blokken: `Console.WriteLine(File.ReadAllLines(\"noter.txt\").Length);`"]
        ],
        forkert: [R`using (StreamWriter w = new StreamWriter("noter.txt"))
{
    w.WriteLine("Køb mælk");
    w.WriteLine("Ring til Bo");
    Console.WriteLine(File.ReadAllLines("noter.txt").Length);
}`],
        loesning: R`using (StreamWriter w = new StreamWriter("noter.txt"))
{
    w.WriteLine("Køb mælk");
    w.WriteLine("Ring til Bo");
}
Console.WriteLine(File.ReadAllLines("noter.txt").Length);`,
        output: "2",
        hint: "Læser du filen **inde i** blokken, er den stadig åben til skrivning — og det, du har skrevet, er måske ikke nået ud på disken endnu." },
      { t: "ide", h: "En dagbog i en fil",
        md: "Lav et Console-projekt, `Dagbog`. Programmet viser de tidligere indlæg, tager imod et nyt og gemmer det **til sidst** i filen. Kør det flere gange — indlæggene bliver liggende, også efter at programmet er lukket.",
        kode: R`string fil = "dagbog.txt";
Console.WriteLine($"Filen ligger her: {Path.GetFullPath(fil)}");

if (File.Exists(fil))
{
    string[] indlaeg = File.ReadAllLines(fil);
    Console.WriteLine($"Du har {indlaeg.Length} indlæg:");
    foreach (string linje in indlaeg)
    {
        Console.WriteLine($"  {linje}");
    }
}
else
{
    Console.WriteLine("Ingen indlæg endnu.");
}

Console.Write("Skriv dagens indlæg: ");
string tekst = Console.ReadLine() ?? "";
File.AppendAllText(fil, $"{DateTime.Now:dd-MM-yyyy}: {tekst}\n");
Console.WriteLine("Gemt.");`,
        win: ["Kør programmet med **Ctrl + F5** tre gange, og skriv et nyt indlæg hver gang.", "Åbn mappen fra den første linje i **Stifinder** (kopiér stien uden `dagbog.txt` ind i adresselinjen øverst), og åbn `dagbog.txt` med Notesblok."],
        mac: ["Kør programmet med den **grønne pil ▶** tre gange, og skriv et nyt indlæg hver gang.", "Åbn mappen fra den første linje i **Finder** (menuen **Gå → Gå til mappe…**, og indsæt stien uden `dagbog.txt`), og åbn `dagbog.txt` med TextEdit."],
        md2: "`DateTime.Now:dd-MM-yyyy` skriver dagens dato som fx 12-10-2026. `AppendAllText` laver filen, hvis den ikke findes i forvejen." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvorfor skriver man `using` omkring en `StreamWriter`?",
        svar: "En `StreamWriter` holder **filen åben**, mens den skriver. Filen **skal lukkes** bagefter — ellers kan de sidste data blive hængende i hukommelsen uden at nå ud på disken, og filen kan være **låst** for andre programmer. `using`-blokken sørger for, at filen **altid bliver lukket**, når blokken slutter, også hvis der sker en fejl indeni. Så skal jeg ikke selv huske at lukke den.",
        noegle: ["åben", "lukkes", "disken", "låst", "altid", "fejl"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m09l5", titel: "CSV og JSON: fra fil til objekter", min: 18,
    ord: [
      ["CSV", "Comma-Separated Values. En tekstfil med én post pr. linje og felterne adskilt af et tegn — i Danmark tit semikolon."],
      ["Overskriftslinje (header)", "Den første linje i en CSV-fil, der fortæller, hvad felterne hedder. Den skal springes over, når data læses."],
      ["Skip", "LINQ-metode, der springer de første n elementer over: `Skip(1)`."],
      ["JSON", "JavaScript Object Notation. Et tekstformat til objekter: `{\"Navn\":\"Kaffe\",\"Pris\":45}`. Bruges af næsten alle web-API'er."],
      ["Serialisering", "At lave et objekt om til tekst (fx JSON), så det kan gemmes eller sendes."],
      ["Deserialisering", "Det modsatte: at lave tekst (fx JSON) om til objekter igen."],
      ["JsonSerializer", "Klassen i System.Text.Json, der serialiserer og deserialiserer."]
    ],
    trin: [
      { t: "laes", h: "CSV: en tabel i en tekstfil",
        md: "En **CSV-fil** er en tabel skrevet som tekst. Hver linje er én række, og felterne er adskilt af et tegn. I Danmark bruges **semikolon**, fordi komma er decimaltegn. Den første linje er en **overskriftslinje**, der fortæller, hvad felterne hedder.\n\nAt læse en linje er noget, du allerede kan: `Split(';')` fra modul 3 deler den op i et array.",
        kode: R`string[] linjer =
{
    "Navn;Pris;Kategori",
    "Kaffe;45;Drikke",
    "Ost;49;Mejeri"
};

foreach (string linje in linjer.Skip(1))
{
    string[] felter = linje.Split(';');
    string navn = felter[0];
    int pris = int.Parse(felter[1]);
    Console.WriteLine($"{navn} koster {pris} kr. ({felter[2]})");
}`,
        noter: [
          ["linjer.Skip(1)", "LINQ: spring det første element over — overskriftslinjen."],
          ["linje.Split(';')", "\"Kaffe;45;Drikke\" bliver til arrayet { \"Kaffe\", \"45\", \"Drikke\" }."],
          ["int.Parse(felter[1])", "Alt i en fil er tekst. Tal skal laves om med `Parse`."]
        ],
        output: "Kaffe koster 45 kr. (Drikke)\nOst koster 49 kr. (Mejeri)",
        md2: "I et rigtigt program kommer linjerne fra `File.ReadAllLines(\"produkter.csv\")`. Her står de i koden, så du kan se dem." },
      { t: "forudsig",
        kode: R`string linje = "Maja;7.B;10";
string[] felter = linje.Split(';');

Console.WriteLine(felter.Length);
Console.WriteLine(felter[1]);
Console.WriteLine(int.Parse(felter[2]) + 2);`,
        output: "3\n7.B\n12",
        fordi: "Der er to semikolonner, så der kommer **tre** felter. `felter[1]` er det **andet** felt. `int.Parse(\"10\")` giver tallet 10, og 10 + 2 = 12. Uden `Parse` ville `+` have sat tekst sammen: \"102\"." },
      { t: "orden", q: "Sæt linjerne i rækkefølge, så programmet laver CSV-linjen om til et `Produkt` og skriver det ud. `Produkt` er en `record` (modul 7) — en hel klasse på én linje.",
        linjer: [R`string linje = "Kaffe;45";`, R`string[] felter = linje.Split(';');`, R`Produkt p = new Produkt(felter[0], int.Parse(felter[1]));`, R`Console.WriteLine($"{p.Navn}: {p.Pris}");`, R`record Produkt(string Navn, int Pris);`],
        output: "Kaffe: 45",
        fordi: "Først teksten, så `Split`, så kan objektet laves af felterne, og til sidst skrives det ud. Typen (her en `record`) står nederst, efter alle sætningerne." },
      { t: "laes", h: "Fra fil til List<Produkt> — og tilbage",
        md: "Med `Select` (lektion 1) kan hver linje laves om til et **objekt** på én gang. Så har du en `List<Produkt>`, som du kan bruge LINQ på. Og den modsatte vej: `Select` hvert objekt om til en CSV-linje, og skriv dem med `WriteAllLines`.",
        kode: R`string[] data = { "Navn;Pris", "Kaffe;45", "Te;30", "Kakao;38" };
File.WriteAllLines("produkter.csv", data);

List<Produkt> produkter = File.ReadAllLines("produkter.csv")
    .Skip(1)
    .Select(linje => linje.Split(';'))
    .Select(f => new Produkt { Navn = f[0], Pris = int.Parse(f[1]) })
    .ToList();

Console.WriteLine($"{produkter.Count} produkter, billigst: {produkter.OrderBy(p => p.Pris).First().Navn}");

List<string> ud = produkter.Where(p => p.Pris > 35).Select(p => $"{p.Navn};{p.Pris}").ToList();
File.WriteAllLines("dyre.csv", ud);
Console.WriteLine(File.ReadAllText("dyre.csv"));

class Produkt
{
    public string Navn { get; set; } = "";
    public int Pris { get; set; }
}`,
        noter: [
          [".Skip(1)", "Spring overskriftslinjen over."],
          [".Select(linje => linje.Split(';'))", "Hver linje bliver til et array af felter."],
          [".Select(f => new Produkt { … })", "Hvert array af felter bliver til et `Produkt`."],
          ["$\"{p.Navn};{p.Pris}\"", "Den modsatte vej: et objekt bliver til en CSV-linje."]
        ],
        output: "3 produkter, billigst: Te\nKaffe;45\nKakao;38",
        md2: "Pas på med **decimaltal** i CSV: `decimal.Parse(\"12,50\")` forstår kun komma på en computer med danske indstillinger. Hold dig til hele tal i dine egne CSV-filer, eller brug JSON (lige om lidt)." },
      { t: "udfyld", q: "Læs elever fra CSV-linjer: spring overskriften over, del ved semikolon, og lav karakteren om til et tal.",
        kode: R`string[] linjer = { "Navn;Karakter", "Maja;10", "Ali;7" };

foreach (string linje in linjer.[[Skip]](1))
{
    string[] f = linje.[[Split]](';');
    int karakter = int.[[Parse]](f[1]);
    Console.WriteLine($"{f[0]}: {karakter + 2}");
}`,
        output: "Maja: 12\nAli: 9",
        fordi: "`Skip(1)` springer overskriftslinjen over. `Split(';')` deler linjen. `int.Parse` laver teksten om til et tal, så der kan regnes med det." },
      { t: "fejl", q: "Programmet skal lægge priserne i CSV-filen sammen. Det oversættes, men går ned med en `FormatException`, når det kører. Hvilken linje skal rettes?",
        kode: R`File.WriteAllLines("priser.csv", new string[] { "Vare;Pris", "Kaffe;45", "Te;30" });

int sum = 0;
foreach (string linje in File.ReadAllLines("priser.csv"))
{
    string[] f = linje.Split(';');
    sum += int.Parse(f[1]);
}
Console.WriteLine(sum);`,
        linje: 4, logisk: true, fejler: true,
        fordi: "Løkken tager **alle** linjer — også overskriftslinjen \"Vare;Pris\". Første gang prøver `int.Parse` at lave teksten \"Pris\" om til et tal, og det går ikke. Fejlen viser sig i linje 7, men rettelsen hører til i linje 4: `File.ReadAllLines(\"priser.csv\").Skip(1)`.",
        rettet: R`File.WriteAllLines("priser.csv", new string[] { "Vare;Pris", "Kaffe;45", "Te;30" });

int sum = 0;
foreach (string linje in File.ReadAllLines("priser.csv").Skip(1))
{
    string[] f = linje.Split(';');
    sum += int.Parse(f[1]);
}
Console.WriteLine(sum);`,
        rettetOutput: "75" },
      { t: "laes", h: "JSON: objekter som tekst",
        md: "CSV er godt til simple tabeller. Men objekter kan have mange properties, lister inden i lister og så videre. Til det bruger man **JSON**: et tekstformat, hvor et objekt står i `{ }` og hver property som `\"Navn\":værdi`.\n\nAt lave et objekt om til tekst hedder **serialisering**. .NET har det indbygget i `System.Text.Json` — skriv `using System.Text.Json;` øverst i filen.",
        kode: R`using System.Text.Json;

Produkt p = new Produkt { Navn = "Kaffe", Pris = 45, PaaLager = true };
string json = JsonSerializer.Serialize(p);
Console.WriteLine(json);

class Produkt
{
    public string Navn { get; set; } = "";
    public int Pris { get; set; }
    public bool PaaLager { get; set; }
}`,
        noter: [
          ["using System.Text.Json;", "JsonSerializer bor i dette namespace. Linjen skal stå øverst."],
          ["JsonSerializer.Serialize(p)", "Lav objektet om til en JSON-tekst. Alle `public` properties kommer med."],
          ["{\"Navn\":\"Kaffe\",…}", "Tekst står i anførselstegn. Tal og true/false gør ikke."]
        ],
        output: "{\"Navn\":\"Kaffe\",\"Pris\":45,\"PaaLager\":true}",
        md2: "Det er **præcis** det format, et web-API sender til browseren (modul 19), og som JavaScript læser med `JSON.parse` (modul 14)." },
      { t: "forudsig",
        kode: R`using System.Text.Json;

List<int> tal = new List<int> { 3, 1, 2 };
Console.WriteLine(JsonSerializer.Serialize(tal));

Person p = new Person { Navn = "Bo", Alder = 30 };
Console.WriteLine(JsonSerializer.Serialize(p));

class Person
{
    public string Navn { get; set; } = "";
    public int Alder { get; set; }
}`,
        output: "[3,1,2]\n{\"Navn\":\"Bo\",\"Alder\":30}",
        fordi: "En liste bliver til `[ ]` med elementerne adskilt af komma. Et objekt bliver til `{ }` med `\"Navn\":værdi` for hver property. Der kommer ingen mellemrum med, medmindre man beder om det." },
      { t: "laes", h: "Gem i en fil, og hent igen",
        md: "Den modsatte vej — fra JSON-tekst til objekter — hedder **deserialisering**. Du skriver i spidse parenteser, hvilken type der skal komme ud.\n\nSammen med `File` kan du nu gemme en hel liste af objekter og hente den igen næste gang, programmet starter.",
        kode: R`using System.Text.Json;

List<Produkt> varer = new List<Produkt>
{
    new Produkt { Navn = "Kaffe", Pris = 45 },
    new Produkt { Navn = "Te", Pris = 30 }
};

JsonSerializerOptions valg = new JsonSerializerOptions { WriteIndented = true };
File.WriteAllText("varer.json", JsonSerializer.Serialize(varer, valg));

string json = File.ReadAllText("varer.json");
List<Produkt> hentet = JsonSerializer.Deserialize<List<Produkt>>(json) ?? new List<Produkt>();

Console.WriteLine(hentet.Count);
Console.WriteLine(hentet[1].Navn);

class Produkt
{
    public string Navn { get; set; } = "";
    public int Pris { get; set; }
}`,
        noter: [
          ["WriteIndented = true", "Pæn JSON med linjeskift og indrykning — lettere at læse i filen."],
          ["Deserialize<List<Produkt>>(json)", "Lav teksten om til en `List<Produkt>`. Klassen skal have `public` properties med `get; set;`."],
          ["?? new List<Produkt>()", "`Deserialize` kan give `null` (fx hvis filen indeholder `null`). Så bruger vi en tom liste i stedet."]
        ],
        output: "2\nTe",
        md2: "Åbner du `varer.json`, står hver property på sin egen linje med indrykning. Indholdet er det her (vist på én linje for at spare plads):\n\n`[ { \"Navn\": \"Kaffe\", \"Pris\": 45 }, { \"Navn\": \"Te\", \"Pris\": 30 } ]`\n\nBemærk: bogstaverne æ, ø og å bliver gemt som koder (`\\u00E6` for æ) i filen. Det er stadig gyldig JSON, og de kommer rigtigt tilbage, når filen deserialiseres." },
      { t: "udfyld", q: "Gem en person som JSON i en fil, og hent den igen.",
        kode: R`using System.Text.Json;

Person p = new Person { Navn = "Ida", Alder = 28 };
File.WriteAllText("person.json", JsonSerializer.[[Serialize]](p));

string json = File.ReadAllText("person.json");
Person? hentet = JsonSerializer.[[Deserialize]]<[[Person]]>(json);
Console.WriteLine(hentet?.Navn);

class Person
{
    public string Navn { get; set; } = "";
    public int Alder { get; set; }
}`,
        output: "Ida",
        fordi: "`Serialize` laver objekt → tekst. `Deserialize<Person>` laver tekst → objekt; typen står i spidse parenteser. `hentet?.Navn` (modul 7) giver `null` i stedet for at gå ned, hvis `hentet` er null." },
      { t: "valg", q: "Hvad betyder det at **deserialisere** JSON?",
        svar: ["At lave JSON-tekst om til objekter i programmet", "At lave objekter om til JSON-tekst", "At slette en JSON-fil", "At kryptere data, så ingen kan læse dem"],
        ret: 0, fordi: "**Serialisering**: objekt → tekst (for at gemme eller sende). **Deserialisering**: tekst → objekt (for at bruge data, man har læst eller modtaget)." },
      { t: "skriv", q: "Listen `byer` er lavet, og `using System.Text.Json;` står øverst. Lav listen om til JSON med `JsonSerializer.Serialize`, og gem resultatet i en `string`, der hedder `json`. Gem den i filen `\"byer.json\"` med `File.WriteAllText`, og skriv `json` ud.",
        foer: R`using System.Text.Json;

List<string> byer = new List<string> { "Aarhus", "Odense" };`,
        tjek: [
          [/(string|var) json=JsonSerializer\.Serialize\(byer\);/, "Serialisér: `string json = JsonSerializer.Serialize(byer);`"],
          ['File.WriteAllText("byer.json",json);', "Gem: `File.WriteAllText(\"byer.json\", json);`"],
          ["Console.WriteLine(json);", "Skriv `json` ud"]
        ],
        loesning: R`string json = JsonSerializer.Serialize(byer);
File.WriteAllText("byer.json", json);
Console.WriteLine(json);`,
        output: "[\"Aarhus\",\"Odense\"]" },
      { t: "ide", h: "En adressebog, der husker",
        md: "Lav et Console-projekt, `Adressebog`. Programmet henter kontakterne fra `kontakter.json`, når det starter, lader brugeren tilføje en ny og gemmer det hele igen. Kør det flere gange, og se listen vokse.",
        kode: R`using System.Text.Json;

string fil = "kontakter.json";
List<Kontakt> kontakter = new List<Kontakt>();

if (File.Exists(fil))
{
    kontakter = JsonSerializer.Deserialize<List<Kontakt>>(File.ReadAllText(fil)) ?? new List<Kontakt>();
}

Console.WriteLine($"Du har {kontakter.Count} kontakter:");
foreach (Kontakt k in kontakter.OrderBy(k => k.Navn))
{
    Console.WriteLine($"  {k.Navn}: {k.Telefon}");
}

Console.Write("Nyt navn (Enter = ingen): ");
string navn = Console.ReadLine() ?? "";
if (navn != "")
{
    Console.Write("Telefon: ");
    string telefon = Console.ReadLine() ?? "";
    kontakter.Add(new Kontakt { Navn = navn, Telefon = telefon });

    JsonSerializerOptions valg = new JsonSerializerOptions { WriteIndented = true };
    File.WriteAllText(fil, JsonSerializer.Serialize(kontakter, valg));
    Console.WriteLine("Gemt.");
}

class Kontakt
{
    public string Navn { get; set; } = "";
    public string Telefon { get; set; } = "";
}`,
        md2: "Åbn `kontakter.json` i bin/Debug/net10.0, og se, hvordan dine objekter ser ud som JSON. Ret et telefonnummer direkte i filen, gem den, og kør programmet igen." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er serialisering, og hvorfor er JSON vigtigt i en webapplikation?",
        svar: "**Serialisering** er at lave et **objekt om til tekst**, så det kan **gemmes** i en fil eller **sendes** over netværket. **Deserialisering** er den modsatte vej: tekst bliver til objekter igen. **JSON** er et tekstformat for objekter med `{ }` og `\"navn\": værdi`. Det er vigtigt, fordi det er det format, **web-API'er** og **JavaScript** bruger til at udveksle data: serveren serialiserer fx en liste af produkter til JSON, og browseren læser den. I C# gør `JsonSerializer` fra `System.Text.Json` arbejdet.",
        noegle: ["objekt", "tekst", "gemme", "sende", "web-API", "JsonSerializer"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m09l6", titel: "Parallel programmering", min: 15,
    ord: [
      ["Parallel programmering", "At dele et stykke regnearbejde ud på flere CPU-kerner, så de arbejder på det samtidig."],
      ["Parallel.For", "En for-løkke, hvor gennemløbene fordeles på flere tråde og kører samtidig."],
      ["Parallel.ForEach", "En foreach, hvor elementerne behandles samtidig på flere tråde."],
      ["PLINQ", "Parallel LINQ. `AsParallel()` foran en LINQ-forespørgsel får den til at køre på flere kerner."],
      ["CPU-bundet", "Arbejde, hvor computeren regner hele tiden — modsat arbejde, hvor den venter på disk eller netværk."],
      ["Overhead", "Det ekstra arbejde det koster at dele opgaven ud og samle den igen."]
    ],
    trin: [
      { t: "laes", h: "Flere kerner på samme opgave",
        md: "I modul 8 så du to grunde til at bruge flere tråde: **ventetid** og **regnekraft**. `async`/`await` løser ventetid. Denne lektion handler om **regnekraft**.\n\nHar du et stort stykke **CPU-bundet** arbejde — computeren regner hele tiden — kan det deles ud på alle computerens kerner. Det hedder **parallel programmering**. Har du 8 kerner, kan 8 dele af opgaven regnes på samme tid.\n\n.NET har det færdigt i klassen `Parallel` og i **PLINQ**. Du skal ikke selv starte tråde." },
      { t: "laes", h: "Parallel.For",
        md: "`Parallel.For` ligner en almindelig `for`-løkke, men gennemløbene bliver fordelt på flere tråde. Kroppen skrives som et lambda-udtryk, der får tallet `i`.",
        kode: R`int[] kvadrater = new int[10];

Parallel.For(0, 10, i =>
{
    kvadrater[i] = i * i;
});

Console.WriteLine(string.Join(" ", kvadrater));
Console.WriteLine(kvadrater.Sum());`,
        noter: [
          ["Parallel.For(0, 10, …)", "Kør kroppen for i = 0, 1, … 9 — ligesom `for (int i = 0; i < 10; i++)`."],
          ["i => { … }", "Kroppen er et lambda-udtryk. Det bliver kaldt én gang for hvert i — på flere tråde samtidig."],
          ["kvadrater[i] = …", "Hvert gennemløb skriver kun på **sin egen plads** i arrayet. Derfor kan trådene ikke ødelægge hinandens arbejde."]
        ],
        output: "0 1 4 9 16 25 36 49 64 81\n285",
        md2: "Gennemløbene kører i **tilfældig rækkefølge** — i = 7 kan blive regnet før i = 2. Men fordi hvert resultat lægges på sin egen plads, er arrayet altid rigtigt bagefter." },
      { t: "valg", q: "Hvad skriver dette program? `Parallel.For(0, 5, i => { Console.Write(i); });`",
        svar: ["Tallene 0 til 4 — men rækkefølgen kan være forskellig fra gang til gang", "Altid 01234", "Altid 43210", "Kun 0, fordi kun én tråd kører"],
        ret: 0, fordi: "Gennemløbene fordeles på flere tråde, og hvem der kommer først, er tilfældigt — præcis som trådene i modul 8. Alle fem tal kommer, men rækkefølgen er **ikke-deterministisk**." },
      { t: "forudsig",
        kode: R`int[] resultat = new int[5];

Parallel.For(0, 5, i =>
{
    resultat[i] = (i + 1) * 10;
});

Console.WriteLine(resultat[0]);
Console.WriteLine(resultat[4]);
Console.WriteLine(resultat.Sum());`,
        output: "10\n50\n150",
        fordi: "Uanset rækkefølgen ender `resultat[i]` med `(i + 1) * 10`: 10, 20, 30, 40, 50. Summen er 150. Udskrifterne står **efter** `Parallel.For`, som venter, til alle gennemløb er færdige." },
      { t: "laes", h: "Parallel.ForEach — og pas på delt data",
        md: "`Parallel.ForEach` er den parallelle udgave af `foreach`. Men husk **race conditions** fra modul 8: lægger flere tråde til den **samme** variabel samtidig, går optællinger tabt. Løsningen er den samme som dengang: `lock`.",
        kode: R`List<int> tal = Enumerable.Range(1, 1000).ToList();
long sum = 0;
object laas = new object();

Parallel.ForEach(tal, t =>
{
    long kvadrat = (long)t * t;
    lock (laas)
    {
        sum += kvadrat;
    }
});

Console.WriteLine(sum);`,
        noter: [
          ["Enumerable.Range(1, 1000)", "Tallene 1, 2, … 1000."],
          ["long kvadrat = (long)t * t;", "Det **tunge** arbejde laves uden lås. Det er en lokal variabel — hver tråd har sin egen."],
          ["lock (laas) { sum += kvadrat; }", "Kun selve sammenlægningen til den **delte** variabel låses."]
        ],
        output: "333833500",
        md2: "Uden `lock` ville svaret **nogle gange** være for lille. Det er netop det lumske: programmet ser ud til at virke, når du tester det." },
      { t: "valg", q: "Hvad er galt med denne kode?",
        kode: R`int antal = 0;
Parallel.For(0, 100000, i =>
{
    if (i % 3 == 0)
    {
        antal++;
    }
});
Console.WriteLine(antal);`,
        svar: ["Flere tråde ændrer antal samtidig uden lås — det er en race condition, så tallet kan blive for lille", "Parallel.For kan ikke bruges med if", "Programmet kan ikke oversættes", "Ingenting — det giver altid 33334"],
        ret: 0, fordi: "`antal++` er tre trin (læs, læg til, skriv), og flere tråde kan komme ind imellem hinanden. Løsning: `lock` — eller endnu bedre PLINQ, som du ser lige om lidt: `Enumerable.Range(0, 100000).AsParallel().Count(i => i % 3 == 0)`." },
      { t: "laes", h: "PLINQ: AsParallel",
        md: "Den nemmeste måde at regne parallelt på er **PLINQ** (*Parallel LINQ*). Skriv `.AsParallel()` foran din LINQ-forespørgsel, så deler .NET selv arbejdet ud — og samler resultatet korrekt. Ingen lås, ingen race conditions.",
        kode: R`List<int> tal = Enumerable.Range(1, 200000).ToList();

int antal = tal.AsParallel().Count(t => ErPrimtal(t));
Console.WriteLine(antal);

static bool ErPrimtal(int n)
{
    if (n < 2) return false;
    for (int d = 2; d * d <= n; d++)
    {
        if (n % d == 0) return false;
    }
    return true;
}`,
        noter: [
          [".AsParallel()", "Fra nu af kører forespørgslen på flere kerner."],
          [".Count(t => ErPrimtal(t))", "Hver tråd tæller sin del, og PLINQ lægger delresultaterne sammen til sidst."]
        ],
        output: "17984",
        md2: "Pas på rækkefølgen: `tal.AsParallel().Where(…).ToList()` kan give elementerne i en **anden rækkefølge** end i den oprindelige liste. Skal rækkefølgen bevares, så skriv `.AsParallel().AsOrdered()`. Count, Sum, Max og Min giver altid det samme svar." },
      { t: "forudsig",
        kode: R`int[] tal = { 5, 12, 8, 21, 3, 16 };

Console.WriteLine(tal.AsParallel().Where(t => t > 6).Sum());
Console.WriteLine(tal.AsParallel().Max());
Console.WriteLine(tal.AsParallel().Count(t => t % 2 == 0));`,
        output: "57\n21\n3",
        fordi: "Tallene over 6 er 12, 8, 21 og 16 = 57. Den største er 21. De lige tal er 12, 8 og 16 = 3. Med `AsParallel()` er svaret præcis det samme som uden — det bliver bare regnet på flere kerner." },
      { t: "udfyld", q: "Regn terningen (tallet ganget med sig selv tre gange) ud for tallene 0–3 med `Parallel.For`, og læg dem i arrayet.",
        kode: R`int[] terning = new int[4];

Parallel.[[For]](0, 4, [[i]] =>
{
    terning[i] = i * i * i;
});

Console.WriteLine(string.Join(" ", terning));`,
        output: "0 1 8 27",
        fordi: "`Parallel.For(fra, til, i => { … })`. Lambda-udtrykkets parameter er tallet `i`, og hvert gennemløb skriver på sin egen plads `terning[i]`." },
      { t: "laes", h: "Hvornår hjælper det — og hvornår ikke?",
        md: "Parallel kode er **ikke** altid hurtigere. Det koster ekstra arbejde at dele opgaven ud og samle den igen — det kaldes **overhead**.",
        noter: [
          ["Hjælper", "**Meget** CPU-bundet arbejde: tusindvis af tunge beregninger, billedbehandling, store datamængder."],
          ["Hjælper ikke", "Små opgaver. At lægge 10 tal sammen parallelt er **langsommere** end at gøre det almindeligt — overhead'en æder gevinsten."],
          ["Forkert værktøj", "Ventetid på database, fil eller netværk. Dér bruger man `async`/`await` (modul 8), ikke Parallel."],
          ["Farligt", "Delt data, der ændres fra flere tråde. Brug `lock` — eller PLINQ, som klarer det for dig."],
          ["Rækkefølge", "Er aldrig garanteret. Udskrift fra flere tråde kommer i tilfældig orden."]
        ],
        md2: "Den gyldne regel fra modul 8 gælder stadig: **mål, før du gætter**. Brug `Stopwatch`, og sammenlign." },
      { t: "valg", q: "Hvilken opgave har **størst** gavn af `Parallel.For` eller `AsParallel()`?",
        svar: ["At beregne en tung formel for hver af 10 millioner målinger", "At hente fem websider fra internettet", "At lægge 10 tal sammen", "At gemme en kunde i databasen"],
        ret: 0, fordi: "Millioner af tunge beregninger er **CPU-bundet** arbejde, der kan deles ud på kernerne. Websider og database er **ventetid** — det løses med `async`/`await`. Og 10 tal er så lidt, at overhead'en gør det langsommere." },
      { t: "ide", h: "Mål gevinsten",
        md: "Lav et Console-projekt, `Parallel`. Programmet tæller primtal under 5 millioner tre gange: almindeligt, med `Parallel.For` og med PLINQ — og måler tiden. Tiderne er forskellige fra computer til computer, men antallet skal være ens alle tre gange.",
        kode: R`using System.Diagnostics;

int graense = 5000000;
Console.WriteLine($"Kerner: {Environment.ProcessorCount}");

Stopwatch ur = Stopwatch.StartNew();
int antal1 = 0;
for (int i = 0; i < graense; i++)
{
    if (ErPrimtal(i)) antal1++;
}
Console.WriteLine($"Almindelig for: {antal1} primtal på {ur.ElapsedMilliseconds} ms");

ur.Restart();
int antal2 = 0;
object laas = new object();
Parallel.For(0, graense, i =>
{
    if (ErPrimtal(i))
    {
        lock (laas) { antal2++; }
    }
});
Console.WriteLine($"Parallel.For:   {antal2} primtal på {ur.ElapsedMilliseconds} ms");

ur.Restart();
int antal3 = Enumerable.Range(0, graense).AsParallel().Count(ErPrimtal);
Console.WriteLine($"PLINQ:          {antal3} primtal på {ur.ElapsedMilliseconds} ms");

static bool ErPrimtal(int n)
{
    if (n < 2) return false;
    for (int d = 2; d * d <= n; d++)
    {
        if (n % d == 0) return false;
    }
    return true;
}`,
        win: ["Skift **Debug** til **Release** i rullelisten øverst, og kør med **Ctrl + F5**.", "Sæt `graense` ned til 1000, og kør igen. Er den parallelle udgave stadig hurtigst?"],
        mac: ["Skift **Debug** til **Release** i konfigurations-listen øverst ved Kør-knappen, og kør med den **grønne pil ▶**.", "Sæt `graense` ned til 1000, og kør igen. Er den parallelle udgave stadig hurtigst?"],
        md2: "`Count(ErPrimtal)` giver metoden direkte til `Count` — ligesom `Where(ErStor)` i lektion 1. Fjern `lock` i `Parallel.For`-udgaven, og kør et par gange: tallet bliver forkert." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er forskellen på parallel programmering og asynkron programmering med async/await?",
        svar: "**Parallel programmering** deler **CPU-bundet** arbejde ud på **flere kerner**, så det bliver regnet samtidig — fx med `Parallel.For` eller PLINQ's `AsParallel()`. Det hjælper, når der er meget at **regne**. **Asynkron programmering** med `async`/`await` handler om **ventetid**: mens programmet venter på en database, en fil eller netværket, er **tråden fri** til andet. Det gør ikke en beregning hurtigere, men en webserver kan betjene flere brugere. Parallel kode har desuden **overhead** og kræver, at man passer på **delt data** med `lock`.",
        noegle: ["CPU-bundet", "flere kerner", "AsParallel", "ventetid", "tråden fri", "overhead"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m09v", titel: "Værksted: LINQ, filer og Parallel", vaerksted: true, min: 75, ord: [],
    trin: [
      { t: "laes", h: "Sådan arbejder du i værkstedet",
        md: "Nu skal du skrive **hele programmer selv** i {{Visual Studio||Rider}} med LINQ, filer og JSON.\n\nDen første opgave er let. Den tredje er en fejlfinding, hvor du skal bruge debuggeren. Den sidste samler hele modulet i ét program.",
        noter: [
          ["Skriv selv", "Skriv koden med dine egne fingre. Kopiér ikke fra lektionerne."],
          ["Kør tit", "Kør efter hver ny linje med LINQ. Så ved du præcis, hvilken linje der giver det forkerte."],
          ["Brug debuggeren", "Sæt et **breakpoint** efter en LINQ-linje, og fold variablen ud i {{**Locals**||**Threads & Variables**}}. Så **ser** du, hvad der er i resultatet, i stedet for at gætte."],
          ["Del kæden op", "Virker en lang kæde ikke, så gem hvert led i sin egen variabel med `ToList()`, og se på dem én ad gangen."],
          ["Tips før løsning", "Åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af."]
        ] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Tal med LINQ", projekt: "LinqTal",
        md: "Lav en liste af tal, og besvar seks spørgsmål om den — hvert med én LINQ-linje. Ingen `for`- eller `foreach`-løkker.",
        krav: [
          "Listen er `List<int> tal = new List<int> { 12, 5, 8, 21, 3, 16, 9, 30 };`",
          "Skriv `Lige tal: ` efterfulgt af de lige tal adskilt af `, ` (brug `Where` og `string.Join`)",
          "Skriv `Kvadrater af tal under 10: ` efterfulgt af kvadratet af hvert tal under 10, adskilt af `, ` (brug `Where` og `Select`)",
          "Skriv `Antal over 10: ` og antallet af tal over 10",
          "Skriv `Sum: ` og summen af alle tallene",
          "Skriv `Gennemsnit: ` og gennemsnittet",
          "Skriv `Største: ` og det største tal"
        ],
        tip: [
          "Start med de to første linjer, og kør. Lav så én linje ad gangen.",
          "Lige tal: `tal.Where(t => t % 2 == 0)`. Kvadrater: `tal.Where(t => t < 10).Select(t => t * t)`. `string.Join(\", \", …)` kan tage resultatet direkte.",
          "Resten: `tal.Count(t => t > 10)`, `tal.Sum()`, `tal.Average()` og `tal.Max()` inde i `$\"...\"`."
        ],
        output: "Lige tal: 12, 8, 16, 30\nKvadrater af tal under 10: 25, 64, 9, 81\nAntal over 10: 4\nSum: 104\nGennemsnit: 13\nStørste: 30",
        loesning: R`List<int> tal = new List<int> { 12, 5, 8, 21, 3, 16, 9, 30 };

Console.WriteLine($"Lige tal: {string.Join(", ", tal.Where(t => t % 2 == 0))}");
Console.WriteLine($"Kvadrater af tal under 10: {string.Join(", ", tal.Where(t => t < 10).Select(t => t * t))}");
Console.WriteLine($"Antal over 10: {tal.Count(t => t > 10)}");
Console.WriteLine($"Sum: {tal.Sum()}");
Console.WriteLine($"Gennemsnit: {tal.Average()}");
Console.WriteLine($"Største: {tal.Max()}");`,
        ekstra: ["Skriv de tre største tal i faldende rækkefølge med `OrderByDescending` og `Take`.", "Skriv det samme program i query syntax for de to første linjer: `from t in tal where … select …`."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Varelageret", projekt: "Varelager",
        md: "En lille butik har et varelager. Lav en klasse `Vare` og en liste med seks varer, og lav en lagerrapport med LINQ.\n\nPriserne er `decimal` (husk `m` efter tallet). Skriv priserne med to decimaler i koden, fx `18.00m` — så skriver C# også to decimaler ud.",
        krav: [
          "`Vare` har auto-properties `Navn` (`string`), `Kategori` (`string`), `Pris` (`decimal`) og `Antal` (`int`)",
          "Varerne, i denne rækkefølge: Mælk/Mejeri/12.95m/40, Ost/Mejeri/49.50m/10, Æbler/Frugt/3.50m/120, Bananer/Frugt/2.75m/0, Rugbrød/Brød/24.00m/15, Boller/Brød/18.00m/0",
          "Skriv `Udsolgt: ` og navnene på varerne med `Antal` 0, adskilt af `, `",
          "Skriv `Dyreste vare: {Navn} ({Pris} kr.)` for den dyreste vare",
          "Skriv `Varer under 20 kr.:` og derefter én linje pr. vare under 20 kr., sorteret efter pris (billigst først), i formen `  {Navn}: {Pris} kr.` (to mellemrum foran)",
          "Skriv `Lagerværdi pr. kategori:` og derefter én linje pr. kategori (i den rækkefølge, `GroupBy` giver dem) i formen `  {kategori}: {sum af Pris * Antal} kr.`",
          "Skriv `Varer over 100 kr.: Ja` eller `Varer over 100 kr.: Nej` (brug `Any`)"
        ],
        tip: [
          "Byg listen med object initializers: `new Vare { Navn = \"Mælk\", Kategori = \"Mejeri\", Pris = 12.95m, Antal = 40 }`. Kør, når listen er lavet, og tilføj så én del af rapporten ad gangen.",
          "Dyreste: `Vare dyr = varer.OrderByDescending(v => v.Pris).First();`. Under 20 kr.: `foreach (Vare v in varer.Where(v => v.Pris < 20).OrderBy(v => v.Pris))`.",
          "Lagerværdi: `foreach (var g in varer.GroupBy(v => v.Kategori))` og `g.Sum(v => v.Pris * v.Antal)`. Ja/Nej: `varer.Any(v => v.Pris > 100) ? \"Ja\" : \"Nej\"`."
        ],
        output: "Udsolgt: Bananer, Boller\nDyreste vare: Ost (49,50 kr.)\nVarer under 20 kr.:\n  Bananer: 2,75 kr.\n  Æbler: 3,50 kr.\n  Mælk: 12,95 kr.\n  Boller: 18,00 kr.\nLagerværdi pr. kategori:\n  Mejeri: 1013,00 kr.\n  Frugt: 420,00 kr.\n  Brød: 360,00 kr.\nVarer over 100 kr.: Nej",
        loesning: R`List<Vare> varer = new List<Vare>
{
    new Vare { Navn = "Mælk", Kategori = "Mejeri", Pris = 12.95m, Antal = 40 },
    new Vare { Navn = "Ost", Kategori = "Mejeri", Pris = 49.50m, Antal = 10 },
    new Vare { Navn = "Æbler", Kategori = "Frugt", Pris = 3.50m, Antal = 120 },
    new Vare { Navn = "Bananer", Kategori = "Frugt", Pris = 2.75m, Antal = 0 },
    new Vare { Navn = "Rugbrød", Kategori = "Brød", Pris = 24.00m, Antal = 15 },
    new Vare { Navn = "Boller", Kategori = "Brød", Pris = 18.00m, Antal = 0 }
};

List<string> udsolgt = varer.Where(v => v.Antal == 0).Select(v => v.Navn).ToList();
Console.WriteLine($"Udsolgt: {string.Join(", ", udsolgt)}");

Vare dyr = varer.OrderByDescending(v => v.Pris).First();
Console.WriteLine($"Dyreste vare: {dyr.Navn} ({dyr.Pris} kr.)");

Console.WriteLine("Varer under 20 kr.:");
foreach (Vare v in varer.Where(v => v.Pris < 20).OrderBy(v => v.Pris))
{
    Console.WriteLine($"  {v.Navn}: {v.Pris} kr.");
}

Console.WriteLine("Lagerværdi pr. kategori:");
foreach (var g in varer.GroupBy(v => v.Kategori))
{
    Console.WriteLine($"  {g.Key}: {g.Sum(v => v.Pris * v.Antal)} kr.");
}

string over100 = varer.Any(v => v.Pris > 100) ? "Ja" : "Nej";
Console.WriteLine($"Varer over 100 kr.: {over100}");

class Vare
{
    public string Navn { get; set; } = "";
    public string Kategori { get; set; } = "";
    public decimal Pris { get; set; }
    public int Antal { get; set; }
}`,
        ekstra: ["Sortér kategorierne efter lagerværdi, højeste først: `.OrderByDescending(g => g.Sum(v => v.Pris * v.Antal))`.", "Lav et `Select` til en anonym type `new { v.Navn, Vaerdi = v.Pris * v.Antal }`, og skriv de tre varer med størst lagerværdi."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Fejlfinding: omsætningen i Aarhus", projekt: "Omsaetning",
        md: "Programmet nedenfor skal lave en rapport over ordrerne fra **Aarhus**. Der er tre ordrer fra Aarhus på 300, 600 og 150 kr. Omsætningen i Aarhus skal altså være 1050 kr., og gennemsnittet 350 kr. Men programmet skriver 1650 og 550.\n\nProgrammet kan oversættes. Find fejlen **med debuggeren**:\n\n1. Kopiér koden ind i Program.cs, og kør den. Se den forkerte udskrift.\n2. Sæt et **breakpoint** på linjen med `Console.WriteLine($\"Ordrer i Aarhus…`.\n3. Start med debuggeren ({{**F5**||den **grønne bille** 🐞}}). Se i {{**Locals**||**Threads & Variables**}} på `antal`, `omsaetning` og `stoerste`. Hvilken af dem er forkert?\n4. Fold `aarhus` ud ({{åbn **Results View**||klik på pilen}}), og se, hvilke ordrer den indeholder. Læg selv beløbene sammen.\n5. Se nu på linjen, der beregner den forkerte variabel. Hvilken samling regner den på?",
        krav: [
          "Find ud af, hvilken variabel der har den forkerte værdi, og hvorfor",
          "Ret fejlen med så lille en ændring som muligt",
          "Programmet skriver `Ordrer i Aarhus: 3`, `Omsætning i Aarhus: 1050 kr.`, `Gennemsnit pr. ordre: 350 kr.` og `Største ordre: 600 kr.`"
        ],
        start: R`List<Ordre> ordrer = new List<Ordre>
{
    new Ordre { Id = 1, By = "Aarhus", Beloeb = 300 },
    new Ordre { Id = 2, By = "Odense", Beloeb = 400 },
    new Ordre { Id = 3, By = "Aarhus", Beloeb = 600 },
    new Ordre { Id = 4, By = "Aalborg", Beloeb = 200 },
    new Ordre { Id = 5, By = "Aarhus", Beloeb = 150 }
};

var aarhus = ordrer.Where(o => o.By == "Aarhus");
int antal = aarhus.Count();
decimal omsaetning = ordrer.Sum(o => o.Beloeb);
decimal stoerste = aarhus.Max(o => o.Beloeb);

Console.WriteLine($"Ordrer i Aarhus: {antal}");
Console.WriteLine($"Omsætning i Aarhus: {omsaetning} kr.");
Console.WriteLine($"Gennemsnit pr. ordre: {omsaetning / antal} kr.");
Console.WriteLine($"Største ordre: {stoerste} kr.");

class Ordre
{
    public int Id { get; set; }
    public string By { get; set; } = "";
    public decimal Beloeb { get; set; }
}`,
        startOutput: "Ordrer i Aarhus: 3\nOmsætning i Aarhus: 1650 kr.\nGennemsnit pr. ordre: 550 kr.\nStørste ordre: 600 kr.",
        tip: [
          "`antal` og `stoerste` er rigtige. Det er `omsaetning`, der er for stor — og gennemsnittet er forkert, fordi det bruger `omsaetning`.",
          "1650 er summen af **alle fem** ordrer: 300 + 400 + 600 + 200 + 150. Linjen med `Sum` regner på den forkerte samling.",
          "Ret `ordrer.Sum(o => o.Beloeb)` til `aarhus.Sum(o => o.Beloeb)`."
        ],
        output: "Ordrer i Aarhus: 3\nOmsætning i Aarhus: 1050 kr.\nGennemsnit pr. ordre: 350 kr.\nStørste ordre: 600 kr.",
        loesning: R`List<Ordre> ordrer = new List<Ordre>
{
    new Ordre { Id = 1, By = "Aarhus", Beloeb = 300 },
    new Ordre { Id = 2, By = "Odense", Beloeb = 400 },
    new Ordre { Id = 3, By = "Aarhus", Beloeb = 600 },
    new Ordre { Id = 4, By = "Aalborg", Beloeb = 200 },
    new Ordre { Id = 5, By = "Aarhus", Beloeb = 150 }
};

var aarhus = ordrer.Where(o => o.By == "Aarhus");
int antal = aarhus.Count();
decimal omsaetning = aarhus.Sum(o => o.Beloeb);
decimal stoerste = aarhus.Max(o => o.Beloeb);

Console.WriteLine($"Ordrer i Aarhus: {antal}");
Console.WriteLine($"Omsætning i Aarhus: {omsaetning} kr.");
Console.WriteLine($"Gennemsnit pr. ordre: {omsaetning / antal} kr.");
Console.WriteLine($"Største ordre: {stoerste} kr.");

class Ordre
{
    public int Id { get; set; }
    public string By { get; set; } = "";
    public decimal Beloeb { get; set; }
}`,
        ekstra: ["`aarhus` er en opskrift (udskudt udførelse), så den bliver kørt **tre** gange: ved `Count`, `Sum` og `Max`. Skriv `.ToList()` efter `Where`, så den kun køres én gang.", "Lav rapporten for alle byer på én gang med `GroupBy(o => o.By)`."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Produkter i CSV og JSON", projekt: "ProduktFil",
        md: "Programmet skal gemme produkter i en CSV-fil, læse dem ind igen som objekter, gemme dem som JSON og til sidst læse JSON-filen og tjekke, at alt kom med.\n\nHusk `using System.Text.Json;` øverst i filen.",
        krav: [
          "`Produkt` har auto-properties `Navn` (`string`) og `Pris` (`int`)",
          "Programmet skriver filen `produkter.csv` med `File.WriteAllLines` og disse fem linjer: `Navn;Pris`, `Kaffe;45`, `Te;30`, `Kakao;38`, `Juice;32`",
          "Det læser filen med `File.ReadAllLines`, springer overskriften over og laver linjerne om til en `List<Produkt>`",
          "Det skriver `Læst fra CSV: {antal} produkter` og `Billigste: {Navn} ({Pris} kr.)`",
          "Det gemmer listen som JSON i `produkter.json` (`JsonSerializer.Serialize` og `File.WriteAllText`) og skriver `Gemt som JSON: produkter.json`",
          "Det læser `produkter.json`, deserialiserer til en ny `List<Produkt>` (brug `?? new List<Produkt>()`) og skriver `Læst fra JSON: {antal} produkter` og `Første i JSON: {Navn}`"
        ],
        tip: [
          "Lav én del ad gangen, og kør: først CSV-filen (se den i bin/Debug/net10.0), så indlæsningen, så JSON.",
          "Indlæsning: `File.ReadAllLines(\"produkter.csv\").Skip(1).Select(l => l.Split(';')).Select(f => new Produkt { Navn = f[0], Pris = int.Parse(f[1]) }).ToList()`.",
          "JSON: `File.WriteAllText(\"produkter.json\", JsonSerializer.Serialize(produkter));` og `JsonSerializer.Deserialize<List<Produkt>>(File.ReadAllText(\"produkter.json\")) ?? new List<Produkt>()`."
        ],
        output: "Læst fra CSV: 4 produkter\nBilligste: Te (30 kr.)\nGemt som JSON: produkter.json\nLæst fra JSON: 4 produkter\nFørste i JSON: Kaffe",
        loesning: R`using System.Text.Json;

string[] data = { "Navn;Pris", "Kaffe;45", "Te;30", "Kakao;38", "Juice;32" };
File.WriteAllLines("produkter.csv", data);

List<Produkt> produkter = File.ReadAllLines("produkter.csv")
    .Skip(1)
    .Select(linje => linje.Split(';'))
    .Select(f => new Produkt { Navn = f[0], Pris = int.Parse(f[1]) })
    .ToList();

Console.WriteLine($"Læst fra CSV: {produkter.Count} produkter");
Produkt billigst = produkter.OrderBy(p => p.Pris).First();
Console.WriteLine($"Billigste: {billigst.Navn} ({billigst.Pris} kr.)");

File.WriteAllText("produkter.json", JsonSerializer.Serialize(produkter));
Console.WriteLine("Gemt som JSON: produkter.json");

List<Produkt> fraJson = JsonSerializer.Deserialize<List<Produkt>>(File.ReadAllText("produkter.json")) ?? new List<Produkt>();
Console.WriteLine($"Læst fra JSON: {fraJson.Count} produkter");
Console.WriteLine($"Første i JSON: {fraJson[0].Navn}");

class Produkt
{
    public string Navn { get; set; } = "";
    public int Pris { get; set; }
}`,
        ekstra: ["Brug `new JsonSerializerOptions { WriteIndented = true }`, og åbn `produkter.json` før og efter. Hvad er forskellen?", "Skriv de produkter, der koster over 35 kr., til en ny fil `dyre.csv` med en `StreamWriter` i en `using`-blok — med overskriftslinjen først."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Samlet program: karakterbogen", projekt: "Karakterbog",
        md: "Nu samler du hele modulet: et program, der gemmer karakterer i en CSV-fil, læser dem ind som objekter, laver statistik med LINQ og `GroupBy`, skriver en rapport med en `StreamWriter`, gemmer data som JSON og tæller med PLINQ.\n\n`{snit:F1}` i `$\"...\"` viser et tal med én decimal. Husk `using System.Text.Json;` øverst.",
        krav: [
          "`Resultat` har auto-properties `Navn` (`string`), `Fag` (`string`) og `Karakter` (`int`)",
          "Programmet skriver `karakterer.csv` med overskriften `Navn;Fag;Karakter` og disse ni linjer: `Anna;Dansk;10`, `Anna;Matematik;12`, `Anna;Engelsk;7`, `Bo;Dansk;4`, `Bo;Matematik;2`, `Bo;Engelsk;7`, `Carl;Dansk;12`, `Carl;Matematik;7`, `Carl;Engelsk;-3`",
          "Det læser filen ind i en `List<Resultat>` (spring overskriften over) og skriver `Indlæst: 9 karakterer`",
          "Det skriver `Gennemsnit pr. fag:` og én linje pr. fag sorteret alfabetisk efter fag: `  {fag}: {gennemsnit:F1}`",
          "Det finder eleven med det højeste gennemsnit og skriver `Bedste elev: {navn} ({gennemsnit:F1})`",
          "Det skriver `Bestået i alle fag: ` og navnene (adskilt af `, `, i den rækkefølge `GroupBy` giver dem) på de elever, hvor **alle** karakterer er mindst 2",
          "Det skriver en rapport til `rapport.txt` med en `StreamWriter` i en `using`-blok: først linjen `Karakterrapport`, så én linje pr. elev: `{navn}: {gennemsnit:F1}`. Bagefter skriver det `Rapport gemt med {antal linjer i filen} linjer`",
          "Det gemmer listen som JSON i `karakterer.json`, læser den igen og skriver `Topkarakterer (10 og 12): {antal}` — talt på listen fra JSON med `AsParallel().Count(…)`"
        ],
        tip: [
          "Byg programmet i trin, og kør efter hvert: CSV-fil → indlæsning → fag-gennemsnit → bedste elev → bestået → rapport → JSON. Brug debuggeren til at se listen og grupperne.",
          "Fag: `resultater.GroupBy(r => r.Fag).OrderBy(g => g.Key)` og `g.Average(r => r.Karakter)`. Elever: `var elever = resultater.GroupBy(r => r.Navn).ToList();`. Bedste: `elever.OrderByDescending(g => g.Average(r => r.Karakter)).First()`. Bestået: `elever.Where(g => g.All(r => r.Karakter >= 2)).Select(g => g.Key)`.",
          "Rapport: `using (StreamWriter w = new StreamWriter(\"rapport.txt\")) { w.WriteLine(\"Karakterrapport\"); foreach (var g in elever) { w.WriteLine($\"{g.Key}: {g.Average(r => r.Karakter):F1}\"); } }` og bagefter `File.ReadAllLines(\"rapport.txt\").Length`. PLINQ: `fraJson.AsParallel().Count(r => r.Karakter >= 10)`."
        ],
        output: "Indlæst: 9 karakterer\nGennemsnit pr. fag:\n  Dansk: 8,7\n  Engelsk: 3,7\n  Matematik: 7,0\nBedste elev: Anna (9,7)\nBestået i alle fag: Anna, Bo\nRapport gemt med 4 linjer\nTopkarakterer (10 og 12): 3",
        loesning: R`using System.Text.Json;

string[] data =
{
    "Navn;Fag;Karakter",
    "Anna;Dansk;10", "Anna;Matematik;12", "Anna;Engelsk;7",
    "Bo;Dansk;4", "Bo;Matematik;2", "Bo;Engelsk;7",
    "Carl;Dansk;12", "Carl;Matematik;7", "Carl;Engelsk;-3"
};
File.WriteAllLines("karakterer.csv", data);

List<Resultat> resultater = File.ReadAllLines("karakterer.csv")
    .Skip(1)
    .Select(linje => linje.Split(';'))
    .Select(f => new Resultat { Navn = f[0], Fag = f[1], Karakter = int.Parse(f[2]) })
    .ToList();
Console.WriteLine($"Indlæst: {resultater.Count} karakterer");

Console.WriteLine("Gennemsnit pr. fag:");
foreach (var g in resultater.GroupBy(r => r.Fag).OrderBy(g => g.Key))
{
    Console.WriteLine($"  {g.Key}: {g.Average(r => r.Karakter):F1}");
}

var elever = resultater.GroupBy(r => r.Navn).ToList();

var bedste = elever.OrderByDescending(g => g.Average(r => r.Karakter)).First();
Console.WriteLine($"Bedste elev: {bedste.Key} ({bedste.Average(r => r.Karakter):F1})");

List<string> bestaaet = elever.Where(g => g.All(r => r.Karakter >= 2)).Select(g => g.Key).ToList();
Console.WriteLine($"Bestået i alle fag: {string.Join(", ", bestaaet)}");

using (StreamWriter w = new StreamWriter("rapport.txt"))
{
    w.WriteLine("Karakterrapport");
    foreach (var g in elever)
    {
        w.WriteLine($"{g.Key}: {g.Average(r => r.Karakter):F1}");
    }
}
Console.WriteLine($"Rapport gemt med {File.ReadAllLines("rapport.txt").Length} linjer");

File.WriteAllText("karakterer.json", JsonSerializer.Serialize(resultater));
List<Resultat> fraJson = JsonSerializer.Deserialize<List<Resultat>>(File.ReadAllText("karakterer.json")) ?? new List<Resultat>();
int top = fraJson.AsParallel().Count(r => r.Karakter >= 10);
Console.WriteLine($"Topkarakterer (10 og 12): {top}");

class Resultat
{
    public string Navn { get; set; } = "";
    public string Fag { get; set; } = "";
    public int Karakter { get; set; }
}`,
        ekstra: ["Lad programmet spørge efter et navn og skrive den elevs karakterer i alle fag. Findes eleven ikke, skal det skrive `Ukendt elev` (brug `Any` eller `FirstOrDefault`).", "Skriv gennemsnit pr. fag i query syntax: `from r in resultater group r by r.Fag into g orderby g.Key select …`."] },

      { t: "spor", h: "Spor: Where, Select og opskriften",
        q: "`dyre` er en opskrift (udskudt udførelse) — den køres, hver gang den bruges. `navne` er en færdig liste. Skriv værdierne, lige efter at linjen er udført.",
        kode: R`List<int> priser = new List<int> { 20, 55, 80 };
var dyre = priser.Where(p => p > 50);
List<int> rabat = dyre.Select(p => p - 10).ToList();
priser.Add(100);
priser[0] = 60;
int sumRabat = rabat.Sum();`,
        kolonner: ["dyre.Count()", "rabat.Count", "sumRabat"],
        raekker: [[2, "=2", "=–", "=–"], [3, "2", "2", "–"], [4, "3", "2", "–"], [5, "4", "2", "–"], [6, "4", "2", "115"]],
        fordi: "`rabat` blev fastfrosset i linje 3 med 45 og 70, så den ændrer sig aldrig: summen er 115. `dyre` kører opskriften igen hver gang: efter linje 4 er 100 med (3), og efter linje 5 er den første pris blevet 60, som også er over 50 (4)." },

      { t: "spor", h: "Spor: GroupBy trin for trin",
        q: "Følg løkken over grupperne. Skriv `g.Key`, `g.Count()` og `total`, lige efter at linje 5 er udført for hver gruppe. Husk: grupperne kommer i den rækkefølge, deres første element står i arrayet.",
        kode: R`string[] koeb = { "te", "kaffe", "te", "kakao", "kaffe", "te" };
int total = 0;
foreach (var g in koeb.GroupBy(k => k))
{
    total += g.Count() * 10;
}
Console.WriteLine(total);`,
        kolonner: ["g.Key", "g.Count()", "total"],
        raekker: [[2, "=–", "=–", "=0"], [5, "=te", "=3", "=30"], [5, "kaffe", "2", "50"], [5, "kakao", "1", "60"]],
        slut: false,
        output: "60",
        fordi: "\"te\" står først i arrayet, så dens gruppe kommer først — med 3 elementer. Så \"kaffe\" med 2 og \"kakao\" med 1. Hver gruppe lægger antal · 10 til: 30, 50, 60." },

      { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: I fejlfindingsopgaven var omsætningen for Aarhus for stor. Hvordan fandt du fejlen med debuggeren, og hvad var den?",
        svar: "Jeg satte et **breakpoint** efter udregningerne og kiggede på variablerne i Locals (Threads & Variables i Rider). `antal` og `stoerste` var rigtige, men `omsaetning` var 1650. Da jeg foldede `aarhus` ud, kunne jeg se, at den kun indeholdt de **tre ordrer fra Aarhus**, som tilsammen giver 1050. 1650 var **summen af alle fem ordrer**. Fejlen var, at `Sum` blev kaldt på `ordrer` — **hele listen** — i stedet for på den **filtrerede** `aarhus`. Rettelsen var at skrive `aarhus.Sum(o => o.Beloeb)`.",
        noegle: ["breakpoint", "Locals", "folde ud", "filtrerede", "hele listen", "Sum"] }
    ] }
  ]
});
})();
