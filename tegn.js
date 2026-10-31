// Tegn-ordbogen: tegn og symboler, man møder i koden, med alle deres betydninger.
// Hvert tegn bliver en side i Ordbogen (#/ord/<tegn>). Fagord fra lektionerne med samme navn lægges sammen med tegnet.
//   tegn:  selve tegnet (det, man søger på)     visning: valgfri, hvis tegnet skal vises anderledes
//   navn:  hvad tegnet hedder                     kat: emner fra kategorier.js
//   kort:  én sætning, der vises i listen         soeg: andre ting, man kan søge på for at finde tegnet
//   betydninger: [{ h: overskrift, md: forklaring, kode: eksempel, sprog }]   se: andre opslagsord (små bogstaver)
window.TEGN = [
  { tegn: ";", navn: "Semikolon", kat: ["csharp", "js", "html", "sql"],
    kort: "Afslutter en sætning i koden, ligesom punktum afslutter en sætning på dansk.",
    betydninger: [
      { h: "C# og JavaScript: slut på en sætning", md: "Hver sætning (statement) slutter med semikolon. Glemmer du det, siger compileren `; expected`. Der skal ikke semikolon efter den `}`, der lukker en metode, en `if` eller en løkke.",
        kode: "int alder = 30;\nConsole.WriteLine(alder);", sprog: "csharp" },
      { h: "CSS: slut på en egenskab", md: "I CSS afslutter semikolon hver egenskab inde i `{ }`.", kode: "h1 {\n    color: darkred;\n    font-size: 2rem;\n}", sprog: "css" },
      { h: "SQL: slut på en kommando", md: "Semikolon afslutter en SQL-kommando. Kører du flere kommandoer på én gang, skiller det dem ad.", kode: "SELECT Navn FROM Kunder;", sprog: "sql" }
    ],
    se: ["statement", "syntaksfejl"] },

  { tegn: "{ }", navn: "Krøllede parenteser (tuborgklammer)", kat: ["csharp", "js", "html", "blazor"], soeg: ["{", "}", "{}", "tuborg", "krølleparentes"],
    kort: "Samler kode, der hører sammen. Bruges også til at sætte værdier ind i tekst, til objekter og til CSS-regler.",
    betydninger: [
      { h: "C#: en blok", md: "Alt mellem `{` og `}` hører sammen: en klasse, en metode, en `if` eller en løkke. Hver `{` skal have sin egen `}`.",
        kode: "if (alder >= 18)\n{\n    Console.WriteLine(\"Voksen\");\n}", sprog: "csharp" },
      { h: "C#: giv et nyt objekt værdier med det samme", md: "Efter `new` kan properties få en værdi med det samme. Det hedder objekt-initialisering.",
        kode: "var kunde = new Kunde { Navn = \"Mette\", Telefon = \"12345678\" };", sprog: "csharp" },
      { h: "C#: sæt en værdi ind i en tekst", md: "I en tekst med `$` foran bliver det, der står i `{ }`, regnet ud og sat ind. Her skriver programmet `Hej Mette`.",
        kode: "string navn = \"Mette\";\nConsole.WriteLine($\"Hej {navn}\");", sprog: "csharp" },
      { h: "Blazor: en pladsholder i adressen", md: "I `@page` er `{Id:int}` en ruteparameter. Åbner man `/kunder/3`, får property'en `Id` værdien 3.",
        kode: "@page \"/kunder/{Id:int}\"\n\n@code {\n    [Parameter] public int Id { get; set; }\n}", sprog: "razor" },
      { h: "CSS: en regel", md: "Mellem `{` og `}` står de egenskaber, der gælder for vælgeren foran.", kode: ".knap {\n    background: darkgreen;\n}", sprog: "css" },
      { h: "JavaScript og JSON: et objekt", md: "Et objekt er navne og værdier i `{ }`. JSON bruger samme skrivemåde til data.", kode: "const kunde = { navn: \"Mette\", alder: 30 };", sprog: "js" }
    ],
    se: ["kodeblok", "objekt-initialisering", "string-interpolation", "ruteparameter", "objekt-literal", "json"] },

  { tegn: "( )", navn: "Parenteser", kat: ["csharp", "js"], soeg: ["(", ")", "()", "parentes"],
    kort: "Bruges, når en metode kaldes, om betingelser og til at bestemme, hvad der regnes ud først.",
    betydninger: [
      { h: "Kald en metode", md: "Parenteserne efter et metodenavn kalder metoden. Det, der står inden i, er argumenterne. Er der ingen argumenter, skal parenteserne stadig med.",
        kode: "Console.WriteLine(\"Hej\");\nint antal = kunder.Count();", sprog: "csharp" },
      { h: "Parametre i en metode", md: "Når du skriver en metode, står parametrene i parenteserne: type og navn.",
        kode: "static int Dobbelt(int tal)\n{\n    return tal * 2;\n}", sprog: "csharp" },
      { h: "Betingelser og løkker", md: "Efter `if`, `while`, `for` og `foreach` står betingelsen eller løkkens hoved i parenteser.",
        kode: "while (i < 10)\n{\n    i++;\n}", sprog: "csharp" },
      { h: "Regnerækkefølge", md: "Det i parenteserne regnes ud først, ligesom i matematik.", kode: "int a = 2 + 3 * 4;     // 14\nint b = (2 + 3) * 4;   // 20", sprog: "csharp" },
      { h: "Cast: lav om til en anden type", md: "En type i parentes foran en værdi laver værdien om til den type. `(int)` skærer decimalerne af.",
        kode: "double pris = 9.99;\nint hel = (int)pris;   // 9", sprog: "csharp" }
    ],
    se: ["metode", "parameter", "argument", "cast", "kalde"] },

  { tegn: "[ ]", navn: "Firkantede parenteser (klammer)", kat: ["csharp", "js", "sql", "blazor"], soeg: ["[", "]", "[]", "klamme", "index", "attribut"],
    kort: "Bruges til arrays og pladsnumre (index) og til attributter som [Required] og [Authorize].",
    betydninger: [
      { h: "Array og index", md: "`int[]` betyder et array af `int`. `tal[0]` er det første element, fordi man tæller fra 0.",
        kode: "int[] tal = { 4, 8, 15 };\nConsole.WriteLine(tal[0]);   // 4\nConsole.WriteLine(tal[2]);   // 15", sprog: "csharp" },
      { h: "Lister og dictionaries", md: "Samme skrivemåde virker på en `List` (med et nummer) og en `Dictionary` (med en nøgle).",
        kode: "List<string> navne = new() { \"Mette\", \"Søren\" };\nConsole.WriteLine(navne[1]);   // Søren\n\nvar priser = new Dictionary<string, decimal>();\npriser[\"kaffe\"] = 25m;", sprog: "csharp" },
      { h: "Attributter", md: "En attribut i klammer over en klasse, en property eller en metode giver frameworket ekstra oplysninger, fx en regel til valideringen.",
        kode: "[Required(ErrorMessage = \"Skriv et navn\")]\npublic string Navn { get; set; } = \"\";", sprog: "csharp" },
      { h: "JavaScript og JSON: en liste", md: "I JavaScript og JSON er `[ ]` en liste (et array).", kode: "const tal = [4, 8, 15];\nconsole.log(tal.length);   // 3", sprog: "js" },
      { h: "SQL Server: et navn i klammer", md: "Hedder en tabel eller en kolonne det samme som et ord i SQL, kan navnet stå i klammer.", kode: "SELECT * FROM [Order];", sprog: "sql" }
    ],
    se: ["array", "indeks", "attribut", "list<t>", "dictionary<tkey, tvalue>"] },

  { tegn: "< >", navn: "Vinkelparenteser (mindre end og større end)", kat: ["csharp", "html", "blazor"], soeg: ["<", ">", "<T>", "mindre end", "større end"],
    kort: "Sammenligner tal, siger hvilken type der er indeni (List<Kunde>), og laver tags i HTML.",
    betydninger: [
      { h: "Sammenligning", md: "`<` betyder mindre end, og `>` betyder større end. Resultatet er `true` eller `false`.", kode: "int alder = 15;\nbool barn = alder < 18;   // true", sprog: "csharp" },
      { h: "Generics: hvilken type der er indeni", md: "`List<Kunde>` er en liste, der kun kan indeholde `Kunde`-objekter. `Task<int>` er en opgave, der giver en `int`, når den er færdig.",
        kode: "List<Kunde> kunder = new();\nDictionary<string, int> lager = new();", sprog: "csharp" },
      { h: "HTML og Blazor: tags og komponenter", md: "I HTML står et tag i vinkelparenteser. En Blazor-komponent bruges på samme måde med sit eget navn.",
        kode: "<h1>Kunder</h1>\n<p>Der er 4 kunder.</p>\n<StatusMaerke Status=\"@skade.Status\" />", sprog: "razor" }
    ],
    se: ["generics", "typeparameter", "tag", "komponent", "sammenligningsoperator", "<="] },

  { tegn: "<=", visning: "<=  og  >=", navn: "Mindre end eller lig med / større end eller lig med", kat: ["csharp", "js", "sql"], soeg: [">="],
    kort: "Sammenligner to værdier og er også sand, når de er lige store.",
    betydninger: [
      { h: "Sammenligning", md: "`<=` er sand, når venstre side er mindre end eller lig med højre side. `>=` er sand, når den er større end eller lig med.",
        kode: "int alder = 18;\nbool voksen = alder >= 18;   // true\nbool barn = alder <= 12;     // false", sprog: "csharp" },
      { h: "SQL", md: "Det samme i SQL.", kode: "SELECT * FROM Skader WHERE Beloeb >= 10000;", sprog: "sql" }
    ],
    se: ["sammenligningsoperator", "< >", "betingelse"] },

  { tegn: "=", navn: "Lighedstegn (tildeling)", kat: ["csharp", "js", "html", "sql"],
    kort: "Gemmer værdien til højre i det, der står til venstre. Det betyder ikke \"er lig med\". Det gør ==.",
    betydninger: [
      { h: "Gem en værdi", md: "Højre side regnes ud først, og så gemmes resultatet i variablen til venstre.", kode: "int antal = 3;\nantal = antal + 1;   // nu er antal 4", sprog: "csharp" },
      { h: "Giv en property en værdi", md: "I objekt-initialisering og i attributter giver `=` en property sin værdi.",
        kode: "var kunde = new Kunde { Navn = \"Mette\" };", sprog: "csharp" },
      { h: "HTML: værdien af en attribut", md: "I HTML står værdien efter `=` i anførselstegn.", kode: "<input type=\"text\" class=\"form-control\" />", sprog: "html" },
      { h: "SQL: både sammenligning og ny værdi", md: "I SQL betyder `=` \"er lig med\" efter `WHERE` og \"sæt til\" efter `SET`.", kode: "UPDATE Kunder SET Telefon = '12345678' WHERE Id = 3;", sprog: "sql" }
    ],
    se: ["tildele", "==", "variabel"] },

  { tegn: "==", navn: "Er lig med (sammenligning)", kat: ["csharp", "js"],
    kort: "Tjekker, om to værdier er ens. Giver true eller false.",
    betydninger: [
      { h: "Sammenlign to værdier", md: "To lighedstegn sammenligner. Ét lighedstegn gemmer en værdi. Bytter man dem om, giver det en fejl eller et forkert resultat.",
        kode: "string svar = \"ja\";\nif (svar == \"ja\")\n{\n    Console.WriteLine(\"Godt\");\n}", sprog: "csharp" },
      { h: "JavaScript: brug hellere ===", md: "I JavaScript laver `==` typerne om, før den sammenligner, så `\"5\" == 5` er `true`. `===` kræver også samme type.",
        kode: "console.log(\"5\" == 5);    // true\nconsole.log(\"5\" === 5);   // false", sprog: "js" }
    ],
    se: ["=", "!=", "===", "sammenligningsoperator"] },

  { tegn: "===", visning: "===  og  !==", navn: "Streng lighed (JavaScript)", kat: ["js"], soeg: ["!=="],
    kort: "JavaScript: sand, når værdierne er ens og har samme type. !== er det modsatte.",
    betydninger: [
      { h: "Samme værdi og samme type", md: "`===` sammenligner uden at lave typerne om først. Brug den i stedet for `==` i JavaScript.",
        kode: "console.log(5 === 5);     // true\nconsole.log(\"5\" === 5);   // false\nconsole.log(\"5\" !== 5);   // true", sprog: "js" }
    ],
    se: ["==", "typeof"] },

  { tegn: "!=", navn: "Forskellig fra", kat: ["csharp", "js", "sql"],
    kort: "Sand, når to værdier ikke er ens.",
    betydninger: [
      { h: "Forskellig fra", md: "`!=` er det modsatte af `==`.", kode: "if (navn != \"\")\n{\n    Console.WriteLine(\"Der er skrevet et navn\");\n}", sprog: "csharp" },
      { h: "SQL: != eller <>", md: "I SQL kan man skrive både `!=` og `<>`.", kode: "SELECT * FROM Kunder WHERE Navn <> 'Mette';", sprog: "sql" }
    ],
    se: ["==", "!"] },

  { tegn: "!", navn: "Udråbstegn", kat: ["csharp", "js", "html"],
    kort: "Foran en værdi betyder det \"ikke\". Efter en værdi lover det compileren, at værdien ikke er null.",
    betydninger: [
      { h: "Ikke: vender sand og falsk", md: "`!` foran en `bool` gør `true` til `false` og omvendt.",
        kode: "bool erAaben = false;\nif (!erAaben)\n{\n    Console.WriteLine(\"Skaden er lukket\");\n}", sprog: "csharp" },
      { h: "Efter en værdi: \"den er ikke null\"", md: "Et `!` efter en værdi fjerner compilerens advarsel om, at værdien måske er `null`. Det ændrer ikke noget, når programmet kører: er værdien alligevel `null`, går det galt med en `NullReferenceException`. I SkadeApp står der fx `kunder!` og `e.Value!.ToString()!`.",
        kode: "List<Kunde>? kunder = HentKunder();\nint antal = kunder!.Count;", sprog: "csharp" },
      { h: "= null! på en property", md: "`= null!` betyder: \"sæt den til null nu, og lov, at den bliver fyldt senere\". Det bruges fx på en navigation property, som EF Core fylder.",
        kode: "public Kunde Kunde { get; set; } = null!;", sprog: "csharp" },
      { h: "HTML", md: "I `<!doctype html>` og `<!-- kommentar -->` er `!` bare en fast del af skrivemåden.", kode: "<!doctype html>\n<!-- en kommentar -->", sprog: "html" }
    ],
    se: ["!=", "null", "nullreferenceexception", "= null!", "logisk operator"] },

  { tegn: "?", navn: "Spørgsmålstegn", kat: ["csharp", "html"], soeg: ["int?", "string?", "ternær"],
    kort: "Efter en type betyder det \"må være null\". Det bruges også i et kort if (? :), i adresser og i regex.",
    betydninger: [
      { h: "Efter en type: må være null", md: "`string?` og `int?` betyder, at variablen også må være `null`, altså uden værdi.", kode: "string? beskrivelse = null;\nint? alder = null;", sprog: "csharp" },
      { h: "Kort if: betingelse ? ja : nej", md: "Den ternære operator vælger mellem to værdier. Er betingelsen sand, bruges værdien efter `?`, ellers værdien efter `:`.",
        kode: "int alder = 20;\nstring tekst = alder >= 18 ? \"Voksen\" : \"Barn\";   // \"Voksen\"", sprog: "csharp" },
      { h: "I en adresse: query string", md: "Efter `?` i en adresse kommer ekstra værdier som navn=værdi. Flere værdier skilles med `&`.", kode: "/kunder?side=2&sortering=navn", sprog: "text" },
      { h: "I et regulært udtryk: valgfri", md: "I regex betyder `?`, at tegnet foran må være der én gang eller slet ikke.", kode: "Regex.IsMatch(\"fare\", @\"^farv?e$\");   // true", sprog: "csharp" }
    ],
    se: ["?.", "??", "nullable", "ternær operator", "regulært udtryk"] },

  { tegn: "?.", navn: "Null-betinget punktum", kat: ["csharp", "js"],
    kort: "Går kun videre, hvis det til venstre ikke er null. Ellers bliver resultatet null i stedet for en fejl.",
    betydninger: [
      { h: "Stop sikkert ved null", md: "Er `kunde` `null`, bliver `kunde?.Navn` bare `null`. Med et almindeligt punktum ville programmet gå ned med en `NullReferenceException`.",
        kode: "Kunde? kunde = null;\nstring? navn = kunde?.Navn;   // navn er null, ingen fejl", sprog: "csharp" },
      { h: "Kald kun, hvis der er nogen", md: "Det bruges også til at kalde en event eller en delegate, men kun hvis nogen lytter.", kode: "MinEvent?.Invoke(this, EventArgs.Empty);", sprog: "csharp" }
    ],
    se: ["??", "?", "null", "nullreferenceexception", "?. og ??"] },

  { tegn: "??", visning: "??  og  ??=", navn: "Reserveværdi ved null", kat: ["csharp", "js"], soeg: ["??="],
    kort: "Bruger værdien til højre, hvis værdien til venstre er null.",
    betydninger: [
      { h: "Brug en reserveværdi", md: "Er venstre side `null`, bruges højre side.", kode: "string? navn = null;\nstring vist = navn ?? \"Ukendt\";   // \"Ukendt\"", sprog: "csharp" },
      { h: "??=: giv kun en værdi, hvis der ikke er en", md: "`??=` gemmer kun højre side, hvis variablen er `null`.", kode: "List<string>? liste = null;\nliste ??= new List<string>();   // nu er liste en tom liste", sprog: "csharp" }
    ],
    se: ["?.", "null", "?. og ??"] },

  { tegn: "=>", navn: "Pilen", kat: ["csharp", "js"], soeg: ["lambda", "pil", "arrow"],
    kort: "Bruges i lambda-udtryk (k => k.Navn), i korte properties og metoder og i switch-udtryk. Læses \"giver\" eller \"går til\".",
    betydninger: [
      { h: "Lambda: en lille metode uden navn", md: "Til venstre for pilen står parameteren og til højre det, der gives tilbage. `s => s.Beloeb` betyder: tag en skade `s`, og giv dens beløb.",
        kode: "var aabne = skader.Where(s => s.ErAaben).ToList();\ndecimal sum = skader.Sum(s => s.Beloeb);", sprog: "csharp" },
      { h: "En kort property eller metode", md: "Efter pilen står et udtryk, der regnes ud, hver gang property'en læses.",
        kode: "public decimal Udbetalt => Skader\n    .Where(s => s.Status == SkadeStatus.Godkendt)\n    .Sum(s => s.Beloeb);", sprog: "csharp" },
      { h: "Switch-udtryk", md: "I et switch-udtryk står pilen mellem det, der tjekkes for, og resultatet. `_` betyder alle andre tilfælde.",
        kode: "string farve = status switch\n{\n    SkadeStatus.Godkendt => \"success\",\n    SkadeStatus.Afvist => \"danger\",\n    _ => \"secondary\"\n};", sprog: "csharp" },
      { h: "JavaScript: arrow function", md: "I JavaScript laver pilen en funktion.", kode: "const dobbelt = x => x * 2;\nconsole.log(dobbelt(4));   // 8", sprog: "js" }
    ],
    se: ["lambda-udtryk", "lambda", "switch-udtryk", "beregnet property", "arrow function", "_"] },

  { tegn: ".", navn: "Punktum", kat: ["csharp", "js", "html"], soeg: ["punktum-notation"],
    kort: "Går ind i noget: kunde.Navn er Navn inde i kunde. Bruges også i namespaces, i decimaltal og til CSS-klasser.",
    betydninger: [
      { h: "Noget, der hører til et objekt eller en klasse", md: "Efter punktummet står en property eller en metode, der hører til det, der står foran.",
        kode: "Console.WriteLine(kunde.Navn);\nint antal = kunder.Count;\nstring stor = navn.ToUpper();", sprog: "csharp" },
      { h: "En kæde af metoder", md: "Hvert punktum arbejder videre på resultatet fra før. Det ses tit i LINQ.",
        kode: "var liste = kunder\n    .Where(k => k.Navn.StartsWith(\"M\"))\n    .OrderBy(k => k.Navn)\n    .ToList();", sprog: "csharp" },
      { h: "Namespaces", md: "Punktummer deler et namespace i niveauer, ligesom mapper i mapper.", kode: "using System.Globalization;\nnamespace SkadeApp.Models;", sprog: "csharp" },
      { h: "Decimaltal i koden", md: "I C#-kode skrives decimaltal altid med punktum, også på en dansk computer. Det er kun udskriften, der viser komma.",
        kode: "decimal pris = 4.5m;\nConsole.WriteLine(pris);   // 4,5 på en dansk computer", sprog: "csharp" },
      { h: "CSS: en klasse", md: "I CSS betyder `.knap` alle elementer med `class=\"knap\"`.", kode: ".knap {\n    border-radius: 8px;\n}", sprog: "css" }
    ],
    se: ["punktum-notation", "namespace", "linq", "selektor", "class / id"] },

  { tegn: ",", navn: "Komma", kat: ["csharp", "js", "html", "sql"],
    kort: "Skiller ting i en liste: argumenter, parametre, elementer og kolonner.",
    betydninger: [
      { h: "C#: argumenter, parametre og elementer", md: "Komma skiller tingene ad, når der er flere af dem.",
        kode: "static int Plus(int a, int b)\n{\n    return a + b;\n}\n\nint[] tal = { 1, 2, 3 };\nConsole.WriteLine(Plus(2, 3));", sprog: "csharp" },
      { h: "CSS: samme regel til flere vælgere", md: "Reglen gælder både `h1` og `h2`.", kode: "h1, h2 {\n    color: darkred;\n}", sprog: "css" },
      { h: "SQL: flere kolonner", md: "Komma skiller kolonnerne efter `SELECT`.", kode: "SELECT Navn, Email FROM Kunder;", sprog: "sql" }
    ],
    se: ["parameter", "argument"] },

  { tegn: ":", navn: "Kolon", kat: ["csharp", "js", "html", "blazor"],
    kort: "Har mange betydninger: arv (class Kunde : Person), anden del af ? :, format i en tekst, egenskab: værdi i CSS og mere.",
    betydninger: [
      { h: "Arv og interfaces", md: "`class Kunde : Person` betyder, at `Kunde` arver fra `Person`. Står der et interface efter kolon, lover klassen at have interfacets metoder.",
        kode: "public class KundeService : IKundeService\n{\n    // her står metoderne fra IKundeService\n}", sprog: "csharp" },
      { h: "Kald basisklassens konstruktør", md: "`: base(navn)` sender `navn` videre til konstruktøren i den klasse, der arves fra.", kode: "public Kunde(string navn) : base(navn)\n{\n}", sprog: "csharp" },
      { h: "Anden del af den ternære operator", md: "Værdien efter `:` bruges, når betingelsen er falsk.", kode: "string tekst = erAaben ? \"Åben\" : \"Lukket\";", sprog: "csharp" },
      { h: "Format i en tekst", md: "I `$\"{…}\"` kan der stå et format efter kolon, fx `C` for kroner eller `dd-MM-yyyy` for en dato.",
        kode: "decimal beloeb = 4500m;\nConsole.WriteLine($\"{beloeb:C}\");   // 4.500,00 kr. på en dansk computer\nConsole.WriteLine($\"{DateTime.Today:dd-MM-yyyy}\");", sprog: "csharp" },
      { h: "Blazor: type på en ruteparameter", md: "`:int` betyder, at kun et heltal passer på den plads i adressen.", kode: "@page \"/kunder/{Id:int}\"", sprog: "razor" },
      { h: "Blazor: en indstilling på @bind", md: "`@bind:event=\"oninput\"` betyder: opdatér variablen for hvert tastetryk, ikke først når feltet forlades.",
        kode: "<input @bind=\"soegning\" @bind:event=\"oninput\" />", sprog: "razor" },
      { h: "CSS: egenskab og værdi, og :hover", md: "I CSS står egenskaben før kolon og værdien efter. `:hover` gælder, mens musen er over elementet.", kode: "a:hover {\n    color: darkred;\n}", sprog: "css" },
      { h: "JavaScript: navn og værdi i et objekt", md: "I et objekt står navnet før kolon og værdien efter.", kode: "const kunde = { navn: \"Mette\", alder: 30 };", sprog: "js" }
    ],
    se: ["arv", "base", "ternær operator", "route constraint", "@bind:event", "egenskab og værdi"] },

  { tegn: "+", navn: "Plus", kat: ["csharp", "js"],
    kort: "Lægger tal sammen og sætter tekster sammen.",
    betydninger: [
      { h: "Tal og tekst", md: "Mellem to tal lægger `+` sammen. Er den ene side en tekst, sættes tingene sammen til en tekst.",
        kode: "int sum = 2 + 3;                    // 5\nstring hilsen = \"Hej \" + \"Mette\";   // \"Hej Mette\"\nstring tekst = \"Alder: \" + 30;      // \"Alder: 30\"", sprog: "csharp" },
      { h: "Pas på: tekst og tal", md: "`\"1\" + 2` giver teksten `\"12\"`, ikke tallet 3.", kode: "Console.WriteLine(\"1\" + 2);   // 12\nConsole.WriteLine(1 + 2);     // 3", sprog: "csharp" }
    ],
    se: ["++", "+=", "string-interpolation"] },

  { tegn: "-", navn: "Minus (bindestreg)", kat: ["csharp", "grund"],
    kort: "Trækker fra. Foran et tal gør det tallet negativt. I terminalen står indstillinger med bindestreg foran.",
    betydninger: [
      { h: "Regning", md: "Trækker højre side fra venstre side.", kode: "int rest = 10 - 3;   // 7\nint minus = -5;", sprog: "csharp" },
      { h: "Terminalen: en indstilling", md: "I terminalen og i Package Manager Console står indstillinger med bindestreg, fx `-n` (navn) eller `-OutputDir`.",
        kode: "dotnet new console -n Hej", sprog: "text" }
    ],
    se: ["--", "+=", "-outputdir", "-tables"] },

  { tegn: "++", navn: "Plus én", kat: ["csharp", "js"],
    kort: "Lægger 1 til en variabel. i++ er det samme som i = i + 1.",
    betydninger: [
      { h: "Tæl op", md: "`i++` lægger 1 til `i`. Det ses tit i en `for`-løkke.",
        kode: "int i = 0;\ni++;   // nu er i 1\n\nfor (int n = 0; n < 3; n++)\n{\n    Console.WriteLine(n);   // 0, 1, 2\n}", sprog: "csharp" }
    ],
    se: ["--", "+=", "for", "tællevariabel"] },

  { tegn: "--", navn: "Minus én, eller en kommentar i SQL", kat: ["csharp", "sql"],
    kort: "I C# og JavaScript trækker -- 1 fra. I SQL starter -- en kommentar.",
    betydninger: [
      { h: "C#: tæl ned", md: "`liv--` trækker 1 fra `liv`.", kode: "int liv = 3;\nliv--;   // nu er liv 2", sprog: "csharp" },
      { h: "SQL: kommentar", md: "Resten af linjen efter `--` bliver ikke kørt.", kode: "SELECT * FROM Kunder;   -- henter alle kunder", sprog: "sql" }
    ],
    se: ["++", "kommentar", "//"] },

  { tegn: "+=", visning: "+=  og  -=", navn: "Læg til / træk fra", kat: ["csharp", "js"], soeg: ["-="],
    kort: "Ændrer en variabel ud fra dens egen værdi: sum += pris er det samme som sum = sum + pris.",
    betydninger: [
      { h: "Læg til og træk fra", md: "`+=` lægger til det, der er i forvejen. `-=` trækker fra.", kode: "decimal sum = 0;\nsum += 4500m;   // 4500\nsum += 2000m;   // 6500\nsum -= 500m;    // 6000", sprog: "csharp" },
      { h: "Events: tilmeld og afmeld", md: "På en event betyder `+=`, at en metode skal kaldes, når eventen sker. `-=` fjerner metoden igen.",
        kode: "termometer.ForVarmt += VisAdvarsel;\ntermometer.ForVarmt -= VisAdvarsel;", sprog: "csharp" }
    ],
    se: ["++", "event", "+= på en delegate", "-= på en delegate"] },

  { tegn: "*", navn: "Stjerne", kat: ["csharp", "js", "sql", "html"],
    kort: "Gange i C# og JavaScript. I SQL betyder SELECT * alle kolonner. I CSS betyder * alle elementer.",
    betydninger: [
      { h: "Gange", md: "Ganger to tal.", kode: "int areal = 4 * 5;   // 20", sprog: "csharp" },
      { h: "SQL: alle kolonner", md: "`SELECT *` henter alle kolonner. `COUNT(*)` tæller alle rækker.", kode: "SELECT * FROM Kunder;\nSELECT COUNT(*) FROM Skader;", sprog: "sql" },
      { h: "CSS: alle elementer", md: "En regel med `*` gælder alle elementer på siden.", kode: "* {\n    box-sizing: border-box;\n}", sprog: "css" },
      { h: "Del af en kommentar", md: "Sammen med `/` laver stjernen en kommentar over flere linjer: `/* … */`." }
    ],
    se: ["/* */", "select", "count"] },

  { tegn: "/", navn: "Skråstreg", kat: ["csharp", "js", "html", "grund"],
    kort: "Division. To heltal giver et heltal: 7 / 2 er 3. Bruges også i adresser og i lukke-tags.",
    betydninger: [
      { h: "Division", md: "Er begge tal heltal (`int`), skæres decimalerne af. Det hedder heltalsdivision.",
        kode: "int a = 7 / 2;        // 3\ndouble b = 7.0 / 2;   // 3,5\ndecimal c = 7m / 2;   // 3,5", sprog: "csharp" },
      { h: "Adresser", md: "I en adresse skiller `/` delene ad, ligesom mapper.", kode: "https://localhost:7018/kunder/3", sprog: "text" },
      { h: "Tags uden indhold: />", md: "I HTML og Blazor afslutter `/>` et tag, der ikke har noget indhold.", kode: "<input type=\"text\" />\n<StatusMaerke Status=\"@skade.Status\" />", sprog: "razor" },
      { h: "Kommentarer", md: "To skråstreger `//` starter en kommentar. Se `//` og `/* */`." }
    ],
    se: ["heltalsdivision", "//", "url", "tomt element", "/>"] },

  { tegn: "%", navn: "Procent (rest)", kat: ["csharp", "js", "sql", "html"],
    kort: "I C# og JavaScript giver % resten ved division. I SQL LIKE betyder % \"hvad som helst\".",
    betydninger: [
      { h: "Resten ved division", md: "`7 % 2` er 1, fordi 7 delt med 2 er 3 med 1 til rest. Er resten 0, går tallet op.",
        kode: "int rest = 7 % 2;          // 1\nbool lige = 10 % 2 == 0;   // true", sprog: "csharp" },
      { h: "SQL: LIKE", md: "`'M%'` passer på alt, der starter med M.", kode: "SELECT * FROM Kunder WHERE Navn LIKE 'M%';", sprog: "sql" },
      { h: "CSS: en procentdel", md: "En procentdel af den plads, elementet har.", kode: ".kolonne {\n    width: 50%;\n}", sprog: "css" }
    ],
    se: ["modulus", "like"] },

  { tegn: "&&", navn: "Og", kat: ["csharp", "js"],
    kort: "Sand, når begge sider er sande.",
    betydninger: [
      { h: "Begge skal være sande", md: "Er venstre side falsk, bliver højre side slet ikke tjekket.",
        kode: "int alder = 20;\nbool harKort = true;\nif (alder >= 18 && harKort)\n{\n    Console.WriteLine(\"Må køre bil\");\n}", sprog: "csharp" }
    ],
    se: ["||", "!", "logisk operator"] },

  { tegn: "||", navn: "Eller", kat: ["csharp", "js"],
    kort: "Sand, når mindst én af siderne er sand.",
    betydninger: [
      { h: "Mindst én skal være sand", md: "Er venstre side sand, bliver højre side slet ikke tjekket.",
        kode: "if (status == SkadeStatus.Anmeldt || status == SkadeStatus.Behandles)\n{\n    Console.WriteLine(\"Skaden er åben\");\n}", sprog: "csharp" }
    ],
    se: ["&&", "!", "logisk operator"] },

  { tegn: "//", navn: "Kommentar på én linje", kat: ["csharp", "js"], soeg: ["///"],
    kort: "Resten af linjen er en kommentar til mennesker. Programmet springer den over.",
    betydninger: [
      { h: "C# og JavaScript", md: "Alt efter `//` på samme linje bliver ikke kørt.", kode: "// Henter alle kunder fra databasen\nvar kunder = await KundeService.HentAlleAsync();", sprog: "csharp" },
      { h: "///: dokumentation", md: "Tre skråstreger laver en XML-kommentar, som Visual Studio og Rider viser, når man peger på metoden.",
        kode: "/// <summary>Henter alle kunder.</summary>\npublic async Task<List<Kunde>> HentAlleAsync()", sprog: "csharp" }
    ],
    se: ["/* */", "<!-- -->", "@* *@", "--", "kommentar"] },

  { tegn: "/* */", navn: "Kommentar over flere linjer", kat: ["csharp", "js", "html"], soeg: ["/*", "*/"],
    kort: "Alt mellem /* og */ er en kommentar. Virker i C#, JavaScript og CSS.",
    betydninger: [
      { h: "C# og JavaScript", md: "Kommentaren må gå over flere linjer.", kode: "/* Denne klasse beskriver én kunde.\n   Navn og telefon skal udfyldes. */\npublic class Kunde\n{\n}", sprog: "csharp" },
      { h: "CSS", md: "I CSS er det den eneste slags kommentar.", kode: "/* Farver til knapperne */\n.knap {\n    color: white;\n}", sprog: "css" }
    ],
    se: ["//", "kommentar"] },

  { tegn: "<!-- -->", navn: "HTML-kommentar", kat: ["html"], soeg: ["<!--", "-->"],
    kort: "En kommentar i HTML. Den vises ikke på siden.",
    betydninger: [
      { h: "HTML", md: "I en almindelig HTML-fil sendes kommentaren med til browseren (man kan se den med F12), men den vises ikke på siden. I en `.razor`-fil bruger man hellere `@* *@`.",
        kode: "<!-- Menuen øverst -->\n<nav>\n    <a href=\"/\">Forside</a>\n</nav>", sprog: "html" }
    ],
    se: ["@* *@", "//", "html"] },

  { tegn: "@* *@", navn: "Razor-kommentar", kat: ["blazor", "aspnet"], soeg: ["@*", "*@"],
    kort: "En kommentar i en .razor- eller .cshtml-fil. Den kommer slet ikke med ud til browseren.",
    betydninger: [
      { h: "Blazor og MVC", md: "Alt mellem `@*` og `*@` springes over, når siden laves, så det kommer aldrig ud til browseren.",
        kode: "@* En række for hver status *@\n@foreach (var gruppe in skader.GroupBy(s => s.Status))\n{\n    <p>@gruppe.Key: @gruppe.Count()</p>\n}", sprog: "razor" }
    ],
    se: ["<!-- -->", "razor", "@"] },

  { tegn: "\"", navn: "Anførselstegn", kat: ["csharp", "js", "html"], soeg: ["\"\""],
    kort: "Starter og slutter en tekst (string) i C#. I HTML står en attributs værdi i anførselstegn.",
    betydninger: [
      { h: "C#: en tekst", md: "Alt mellem to anførselstegn er en `string`.", kode: "string navn = \"Mette\";\nConsole.WriteLine(\"Hej verden\");", sprog: "csharp" },
      { h: "Anførselstegn inde i en tekst", md: "Skal teksten selv indeholde et anførselstegn, skrives det `\\\"`.", kode: "Console.WriteLine(\"Hun sagde \\\"hej\\\"\");   // Hun sagde \"hej\"", sprog: "csharp" },
      { h: "HTML: værdien af en attribut", md: "Værdien efter `=` står i anførselstegn.", kode: "<input type=\"email\" placeholder=\"navn@eksempel.dk\" />", sprog: "html" }
    ],
    se: ["'", "streng", "escape-tegn", "\\"] },

  { tegn: "'", navn: "Apostrof (enkelt anførselstegn)", kat: ["csharp", "js", "sql"],
    kort: "I C# står ét tegn (char) i apostroffer. I SQL og JavaScript står tekst i apostroffer.",
    betydninger: [
      { h: "C#: ét tegn", md: "En `char` er præcis ét tegn og står i apostroffer. `'AB'` er en fejl.", kode: "char bogstav = 'A';", sprog: "csharp" },
      { h: "SQL: tekst", md: "Tekst i SQL står i apostroffer.", kode: "SELECT * FROM Kunder WHERE Navn = 'Mette';", sprog: "sql" },
      { h: "JavaScript: tekst", md: "I JavaScript må tekst stå i både apostroffer og anførselstegn.", kode: "const navn = 'Mette';\nconst by = \"Aarhus\";   // begge er tekst", sprog: "js" }
    ],
    se: ["\"", "char", "`"] },

  { tegn: "$", navn: "Dollartegn", kat: ["csharp", "js"], soeg: ["$\"", "${", "interpolation"],
    kort: "Foran en tekst i C#: sæt værdier ind med { }. Bruges også i JavaScript, jQuery og regex.",
    betydninger: [
      { h: "C#: tekst med værdier", md: "Med `$` foran teksten bliver det, der står i `{ }`, sat ind. Det hedder string-interpolation.",
        kode: "string navn = \"Mette\";\nint alder = 30;\nConsole.WriteLine($\"{navn} er {alder} år\");   // Mette er 30 år", sprog: "csharp" },
      { h: "JavaScript: ${ } i en template literal", md: "I en tekst skrevet med backticks sætter `${ }` en værdi ind.", kode: "const navn = \"Mette\";\nconsole.log(`Hej ${navn}`);   // Hej Mette", sprog: "js" },
      { h: "jQuery", md: "I jQuery er `$` en funktion, der finder elementer på siden.", kode: "$(\"#menu\").hide();", sprog: "js" },
      { h: "Regex: her slutter teksten", md: "I et regulært udtryk betyder `$`, at teksten skal slutte her. `^\\d{8}$` betyder præcis 8 cifre og intet andet.",
        kode: "[RegularExpression(@\"^\\d{8}$\", ErrorMessage = \"Telefon skal være 8 cifre\")]", sprog: "csharp" }
    ],
    se: ["string-interpolation", "template literal", "jquery", "regulært udtryk", "^"] },

  { tegn: "@", navn: "Snabel-a", kat: ["blazor", "aspnet", "csharp", "sql", "html"], soeg: ["@code", "@page", "@inject", "@bind", "@onclick", "@if", "@foreach", "@using", "@attribute"],
    kort: "I Razor (Blazor og MVC) skifter @ fra HTML til C#. Foran en tekst i C# gør det \\ til en almindelig backslash. I SQL er @navn en parameter.",
    betydninger: [
      { h: "Razor: vis en værdi fra C#", md: "Et `@` foran et navn skriver værdien ind i HTML'en.", kode: "<h1>@kunde.Navn</h1>\n<p>Antal skader: @kunde.Skader.Count</p>", sprog: "razor" },
      { h: "Razor: C# mellem HTML'en", md: "`@if`, `@foreach` og `@code { }` lader dig skrive C# i siden.",
        kode: "@if (kunder == null)\n{\n    <p>Henter …</p>\n}\n\n@foreach (var k in kunder)\n{\n    <p>@k.Navn</p>\n}", sprog: "razor" },
      { h: "Razor: linjerne øverst i filen", md: "Linjer som `@page`, `@using`, `@inject` og `@attribute` står øverst og fortæller, hvad siden er, og hvad den bruger.",
        kode: "@page \"/kunder\"\n@using SkadeApp.Models\n@inject IKundeService KundeService\n@attribute [Authorize]", sprog: "razor" },
      { h: "Blazor: @bind og @onclick", md: "`@bind` forbinder et felt med en variabel. `@onclick` kalder en metode, når man klikker.",
        kode: "<input @bind=\"nyKunde.Navn\" />\n<button @onclick=\"Gem\">Gem</button>", sprog: "razor" },
      { h: "C#: verbatim string", md: "`@` foran en tekst betyder, at `\\` bare er en backslash. Det bruges til stier og regulære udtryk.",
        kode: "string sti = @\"C:\\Kode\\data.txt\";\nbool ok = Regex.IsMatch(\"12345678\", @\"^\\d{8}$\");", sprog: "csharp" },
      { h: "SQL: en parameter", md: "I en SQL-kommando fra C# er `@maks` en pladsholder. Værdien sendes for sig, så det, brugeren skriver, aldrig bliver til SQL. Det beskytter mod SQL-injection.",
        kode: "SELECT Navn FROM Kunder WHERE Alder <= @maks;", sprog: "sql" },
      { h: "CSS: @media", md: "I CSS starter `@media` regler, der kun gælder på bestemte skærme.", kode: "@media (max-width: 600px) {\n    .menu { display: none; }\n}", sprog: "css" }
    ],
    se: ["razor", "@code", "@page", "@inject", "@bind", "@onclick", "verbatim string", "parameter", "media query", "@* *@"] },

  { tegn: "#", navn: "Havelåge (hashtag)", kat: ["html", "js"],
    kort: "I CSS og JavaScript peger #navn på elementet med id=\"navn\". I en adresse peger # på et sted på siden.",
    betydninger: [
      { h: "CSS: et id", md: "`#menu` gælder elementet med `id=\"menu\"`. `#333` er en farvekode.", kode: "#menu {\n    background: #333;\n}", sprog: "css" },
      { h: "JavaScript: find et element", md: "`querySelector` bruger samme vælgere som CSS.", kode: "const menu = document.querySelector(\"#menu\");", sprog: "js" },
      { h: "Adresser: et sted på siden", md: "`#kontakt` i en adresse hopper ned til elementet med `id=\"kontakt\"`.", kode: "<a href=\"#kontakt\">Kontakt</a>\n<h2 id=\"kontakt\">Kontakt os</h2>", sprog: "html" },
      { h: "JavaScript: privat felt i en klasse", md: "Et felt med `#` foran kan kun bruges inde i klassen.", kode: "class Konto {\n    #saldo = 0;\n    indsaet(beloeb) { this.#saldo += beloeb; }\n}", sprog: "js" }
    ],
    se: ["class / id", "selektor", "queryselector", "privat felt"] },

  { tegn: "_", navn: "Understreg", kat: ["csharp", "blazor"],
    kort: "Bruges i navne på private felter (_factory) og betyder \"alle andre\" i et switch-udtryk.",
    betydninger: [
      { h: "Private felter", md: "Mange skriver private felter med `_` foran, så man kan se forskel på et felt og en lokal variabel. Det er en vane, ikke en regel.",
        kode: "public class KundeService : IKundeService\n{\n    private readonly IDbContextFactory<SkadeContext> _factory;\n\n    public KundeService(IDbContextFactory<SkadeContext> factory)\n    {\n        _factory = factory;\n    }\n}", sprog: "csharp" },
      { h: "Switch: alle andre tilfælde", md: "`_` passer på alt det, der ikke er nævnt før.", kode: "string tekst = tal switch\n{\n    1 => \"en\",\n    2 => \"to\",\n    _ => \"mange\"\n};", sprog: "csharp" },
      { h: "Filnavne med _", md: "Filer som `_Imports.razor` og `_Layout.cshtml` er ikke sider, man kan åbne. `_Imports.razor` giver alle komponenter i mappen (og mapperne under den) de samme `@using`-linjer." }
    ],
    se: ["felt", "switch-udtryk", "_imports.razor", "=>"] },

  { tegn: "\\", navn: "Backslash (omvendt skråstreg)", kat: ["csharp", "grund"], soeg: ["\\n", "\\t", "\\d", "\\\""],
    kort: "I en tekst starter \\ et escape-tegn, fx \\n for ny linje. I regex betyder \\d et ciffer.",
    betydninger: [
      { h: "Escape-tegn i en tekst", md: "`\\n` er ny linje, `\\t` er tabulator, `\\\"` er et anførselstegn, og `\\\\` er en backslash.",
        kode: "Console.WriteLine(\"Linje 1\\nLinje 2\");\nConsole.WriteLine(\"C:\\\\Kode\");   // C:\\Kode", sprog: "csharp" },
      { h: "Regulære udtryk", md: "I regex er `\\d` et ciffer, `\\s` et mellemrum, og `\\w` et bogstav, et tal eller `_`.", kode: "Regex.IsMatch(\"1234\", @\"^\\d+$\");   // true", sprog: "csharp" },
      { h: "Stier på Windows", md: "Windows bruger `\\` mellem mapper. Mac og Linux bruger `/`.", kode: "C:\\Users\\Peter\\Desktop", sprog: "text" }
    ],
    se: ["escape-tegn", "verbatim string", "tegnklasse", "@"] },

  { tegn: "^", navn: "Hat (cirkumfleks)", kat: ["csharp"],
    kort: "I et regulært udtryk betyder ^ \"her starter teksten\".",
    betydninger: [
      { h: "Regex: start og slut", md: "`^` binder mønsteret til starten af teksten og `$` til slutningen. Uden dem passer mønsteret også, hvis det bare findes et sted inde i teksten.",
        kode: "Regex.IsMatch(\"123456789\", @\"\\d{8}\");     // true: der er 8 cifre i træk\nRegex.IsMatch(\"123456789\", @\"^\\d{8}$\");   // false: ikke præcis 8 cifre", sprog: "csharp" }
    ],
    se: ["$", "anker", "regulært udtryk", "kvantor"] },

  { tegn: "`", navn: "Backtick", kat: ["js"],
    kort: "I JavaScript laver backticks en tekst, hvor ${ } sætter værdier ind, og som må gå over flere linjer.",
    betydninger: [
      { h: "Template literal", md: "Teksten må gå over flere linjer, og `${ }` sætter en værdi ind.", kode: "const navn = \"Mette\";\nconst tekst = `Hej ${navn},\nvelkommen tilbage`;", sprog: "js" }
    ],
    se: ["template literal", "$"] },

  { tegn: "/>", visning: "/>  og  </", navn: "Lukke-tags", kat: ["html", "blazor"], soeg: ["</"],
    kort: "</p> lukker et tag. /> lukker et tag, der ikke har noget indhold.",
    betydninger: [
      { h: "Luk et tag", md: "Et tag med indhold lukkes med `</navn>`. Et tag uden indhold kan lukkes med `/>` med det samme.",
        kode: "<p>Et afsnit</p>\n<input type=\"text\" />\n<StatusMaerke Status=\"@skade.Status\" />", sprog: "razor" }
    ],
    se: ["tag", "tomt element", "komponent"] },

  { tegn: "{{ }}", navn: "Dobbelte krøllede parenteser (Angular)", kat: ["js"], soeg: ["{{", "}}"],
    kort: "I en Angular-skabelon sætter {{ }} en værdi ind i HTML'en.",
    betydninger: [
      { h: "Angular: interpolation", md: "Værdien af `navn` fra komponentens klasse vises på siden.", kode: "<h1>Hej {{ navn }}</h1>", sprog: "html" }
    ],
    se: ["interpolation", "angular"] },

  { tegn: "~", navn: "Tilde", kat: ["aspnet"],
    kort: "I ASP.NET Core betyder ~/ roden af webstedet, altså mappen wwwroot.",
    betydninger: [
      { h: "~/ i et view", md: "`~/lib/...` peger på `wwwroot/lib/...`, uanset hvilken side man står på.",
        kode: "<link rel=\"stylesheet\" href=\"~/lib/bootstrap/dist/css/bootstrap.min.css\" />", sprog: "html" }
    ],
    se: ["wwwroot"] }
];
