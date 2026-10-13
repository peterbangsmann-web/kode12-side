// Modul 1 — Variabler og typer. Forudsætter: modul 0.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m01", nr: 1, del: "Del 1 · C# fra bunden", ikon: "📦",
  titel: "Variabler og typer",
  dag: "Kursusdag 2 · Syntaks og typer",
  intro: "Et program, der kun kan skrive fast tekst, er ikke meget værd. Her lærer du at **gemme værdier**, **regne** med dem og **spørge brugeren** om noget.\n\nBagefter kan du skrive et lille program, der spørger om din alder og regner ud, hvornår du er født.",
  video: ["02_Tirsdag.mp4 (3 t 58 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m01l1", titel: "Variabler: en kasse med et navn", min: 15,
    ord: [
      ["Variabel", "En navngiven plads i computerens hukommelse, hvor du gemmer en værdi. Værdien kan ændres undervejs."],
      ["Type", "Hvilken slags værdi en variabel kan indeholde, fx heltal (int) eller tekst (string)."],
      ["int", "Typen for heltal: 0, 7, -12, 2026."],
      ["string", "Typen for tekst. Værdien står i \"anførselstegn\"."],
      ["Erklære (deklarere)", "At oprette en variabel: man skriver typen og navnet, fx `int alder;`"],
      ["Tildele", "At lægge en værdi i en variabel med et lighedstegn, fx `alder = 25;`"],
      ["camelCase", "Skrivemåden for variabelnavne: lille begyndelsesbogstav og stort bogstav ved hvert nyt ord, fx `antalKunder`."]
    ],
    trin: [
      { t: "laes", h: "Hvad er en variabel?",
        md: "En **variabel** er en kasse med et navn på. Du lægger en værdi i kassen, og senere kan du hente den igen ved at skrive navnet.\n\nNår du laver en variabel, skal du fortælle to ting: **hvilken slags** værdi kassen er til (typen), og **hvad kassen hedder** (navnet).",
        kode: R`int alder = 25;
Console.WriteLine(alder);`,
        noter: [
          ["int", "Typen. `int` betyder heltal."],
          ["alder", "Navnet. Det bestemmer du selv."],
          ["= 25", "Lighedstegnet lægger værdien 25 i kassen."],
          ["Console.WriteLine(alder)", "Skriver det, der ligger i kassen. Læg mærke til: ingen anførselstegn."]
        ],
        output: "25" },
      { t: "valg", q: "Hvad er forskellen på de to linjer?\n\n`Console.WriteLine(alder);`\n`Console.WriteLine(\"alder\");`",
        svar: ["Den første skriver værdien i variablen. Den anden skriver ordet alder.", "Der er ingen forskel", "Den første giver en fejl", "Den anden skriver værdien i variablen"],
        ret: 0, fordi: "Uden anførselstegn er `alder` et **navn** på en variabel. Med anførselstegn er det bare **tekst**. Det er en af de vigtigste forskelle i hele programmering." },
      { t: "forudsig",
        kode: R`int antal = 3;
Console.WriteLine("antal");
Console.WriteLine(antal);`,
        output: "antal\n3",
        fordi: "Første linje skriver teksten `antal`, fordi den står i anførselstegn. Anden linje skriver værdien i variablen." },
      { t: "laes", h: "Tekst gemmes i en string",
        md: "Tal uden komma har typen `int`. **Tekst** har typen `string`. Værdien skal stå i anførselstegn — præcis som da du skrev tekst ud i modul 0.",
        kode: R`string navn = "Peter";
int alder = 25;
Console.WriteLine(navn);
Console.WriteLine(alder);`,
        output: "Peter\n25",
        md2: "Typen bestemmer, hvad der må ligge i kassen. Du kan ikke lægge tekst i en `int` eller et tal uden anførselstegn i en `string`." },
      { t: "udfyld", q: "Vælg den rigtige type til hver variabel.",
        kode: R`[[string|var]] by = "Aarhus";
[[int|var]] postnummer = 8000;
Console.WriteLine(by);
Console.WriteLine(postnummer);`,
        output: "Aarhus\n8000",
        fordi: "Tekst i anførselstegn er en `string`. Et heltal er en `int`." },
      { t: "fejl",
        kode: R`string farve = "rød";
int antal = "fem";
Console.WriteLine(farve);`,
        linje: 2,
        fordi: "`\"fem\"` er tekst, men variablen er en `int`. Compileren siger: `Cannot implicitly convert type 'string' to 'int'` — \"jeg kan ikke lave tekst om til et heltal\".",
        rettet: R`string farve = "rød";
int antal = 5;
Console.WriteLine(farve);` },
      { t: "laes", h: "Sæt tekst og variabler sammen med +",
        md: "Du kan lime tekst og variabler sammen med et plus. Husk selv at sætte **mellemrum** inde i anførselstegnene — computeren gør det ikke for dig.",
        kode: R`string navn = "Peter";
int alder = 25;
Console.WriteLine("Jeg hedder " + navn);
Console.WriteLine(navn + " er " + alder + " år");`,
        output: "Jeg hedder Peter\nPeter er 25 år" },
      { t: "forudsig",
        kode: R`string dyr = "kat";
int ben = 4;
Console.WriteLine("En " + dyr + " har " + ben + " ben");`,
        output: "En kat har 4 ben",
        fordi: "Stykkerne limes sammen fra venstre mod højre. Mellemrummene kommer fra teksterne `\"En \"`, `\" har \"` og `\" ben\"`." },
      { t: "skriv", q: "Lav en `string`-variabel, der hedder `by`, med værdien `\"Odense\"`. Skriv derefter `Jeg bor i Odense` ud ved at sætte tekst og variabel sammen med `+`.",
        tjek: [
          ['string by = "Odense";', "Lav variablen: `string by = \"Odense\";`"],
          [/Console\.WriteLine\("Jeg bor i "\+by\);/, "Skriv ud med `Console.WriteLine(\"Jeg bor i \" + by);` — husk mellemrummet efter `i`"]
        ],
        forkert: ['string by = "Odense";\nConsole.WriteLine("Jeg bor i Odense");', 'string by = "Odense";\nConsole.WriteLine("Jeg bor i" + by);'],
        loesning: R`string by = "Odense";
Console.WriteLine("Jeg bor i " + by);`,
        output: "Jeg bor i Odense" },
      { t: "laes", h: "En variabel kan få en ny værdi",
        md: "Ordet *variabel* betyder \"noget, der kan variere\". Du kan lægge en ny værdi i kassen — så forsvinder den gamle.\n\nLæg mærke til, at typen kun skrives **første gang**. Derefter bruger du bare navnet.",
        kode: R`int point = 10;
Console.WriteLine(point);
point = 20;
Console.WriteLine(point);`,
        output: "10\n20",
        md2: "Lighedstegnet betyder altså ikke \"er lig med\" som i matematik. Det betyder **\"læg værdien til højre ind i variablen til venstre\"**." },
      { t: "forudsig",
        kode: R`string status = "sulten";
status = "mæt";
status = "træt";
Console.WriteLine(status);`,
        output: "træt",
        fordi: "Hver tildeling overskriver den gamle værdi. Kun den sidste er tilbage." },
      { t: "fejl",
        kode: R`int alder = 25;
Console.WriteLine(alder);
int alder = 26;
Console.WriteLine(alder);`,
        linje: 3,
        fordi: "Variablen `alder` findes allerede. Når du skriver `int` foran igen, prøver du at lave en **ny** variabel med samme navn, og det må man ikke. Vil du bare ændre værdien, skal typen ikke med.",
        rettet: R`int alder = 25;
Console.WriteLine(alder);
alder = 26;
Console.WriteLine(alder);` },
      { t: "laes", h: "Gode navne",
        md: "Du bestemmer selv navnet, men der er regler:\n\n- Kun bogstaver, tal og `_`. **Ingen mellemrum.**\n- Må **ikke starte med et tal**.\n- Må ikke være et ord, C# selv bruger (`int`, `string`, `class` …).\n\nOg der er en skik, alle følger: **camelCase**. Start med lille bogstav, og brug stort bogstav ved hvert nyt ord: `antalKunder`, `fornavn`, `prisMedMoms`.\n\nVælg navne, der siger, hvad der ligger i kassen. `alder` er bedre end `a`. Undgå æ, ø og å i navne — det virker, men giver bøvl, når koden flyttes mellem computere." },
      { t: "valg", q: "Hvilket variabelnavn er både lovligt og følger skikken?",
        svar: ["antalBiler", "antal biler", "2biler", "AntalBiler"],
        ret: 0, fordi: "`antalBiler` er camelCase. `antal biler` har et mellemrum, `2biler` starter med et tal, og `AntalBiler` (stort begyndelsesbogstav) bruger man til klasser og metoder — ikke til variabler." },
      { t: "ide", h: "Præsentér dig selv med variabler",
        md: "Lav et nyt Console-projekt, der hedder `OmMig`. Skriv programmet nedenfor — med dine egne oplysninger. Ret bagefter en af værdierne, og kør igen: teksten ændrer sig alle de steder, variablen er brugt.",
        kode: R`string navn = "Peter";
string by = "Aarhus";
int alder = 25;

Console.WriteLine("Jeg hedder " + navn);
Console.WriteLine("Jeg bor i " + by);
Console.WriteLine("Jeg er " + alder + " år");`,
        win: ["File → New → Project → Console App → navn `OmMig`.", "Skriv koden i **Program.cs**, og kør med **Ctrl + F5**."],
        mac: ["File → New Solution → Console → navn `OmMig`.", "Skriv koden i **Program.cs**, og kør med den **grønne pil ▶**."],
        output: "Jeg hedder Peter\nJeg bor i Aarhus\nJeg er 25 år" }
    ] },

  // ------------------------------------------------------------------
  { id: "m01l2", titel: "Tal og regning", min: 18,
    ord: [
      ["double", "Typen for kommatal, fx 3.14. I koden skrives punktum — aldrig komma."],
      ["decimal", "En meget præcis taltype til penge. Tallet skal have et m bagpå: `19.95m`."],
      ["Operator", "Et tegn, der gør noget ved værdier: + - * / %"],
      ["Heltalsdivision", "Når to heltal divideres, smides alt efter kommaet væk. `7 / 2` giver 3."],
      ["Modulus (%)", "Resten ved en division. `7 % 2` giver 1."],
      ["Udtryk", "Noget, der kan regnes ud til en værdi, fx `2 + 3` eller `pris * antal`."],
      ["++ og +=", "Genveje: `x++` lægger 1 til x. `x += 5` lægger 5 til x."]
    ],
    trin: [
      { t: "laes", h: "De fire regnearter",
        md: "C# kan regne. Tegnene kaldes **operatorer**:\n\n- `+` plus\n- `-` minus\n- `*` gange (en stjerne — ikke x)\n- `/` divideret med\n\nResultatet kan du gemme i en ny variabel.",
        kode: R`int pris = 40;
int antal = 3;
int total = pris * antal;
Console.WriteLine(total);`,
        output: "120" },
      { t: "forudsig",
        kode: R`int a = 10;
int b = 4;
Console.WriteLine(a + b);
Console.WriteLine(a - b);
Console.WriteLine(a * b);`,
        output: "14\n6\n40",
        fordi: "Regnestykket i parentesen regnes ud først. Derefter skrives resultatet." },
      { t: "laes", h: "Gange og dividere først",
        md: "C# følger de samme regler som i matematik: **gange og dividere før plus og minus**. Vil du noget andet, så sæt parenteser.",
        kode: R`Console.WriteLine(2 + 3 * 4);
Console.WriteLine((2 + 3) * 4);`,
        output: "14\n20",
        md2: "Første linje: 3 · 4 = 12, og så 2 + 12 = 14. Anden linje: parentesen først, 5 · 4 = 20." },
      { t: "forudsig",
        kode: R`int x = 10 - 2 * 3;
int y = (10 - 2) * 3;
Console.WriteLine(x);
Console.WriteLine(y);`,
        output: "4\n24",
        fordi: "`x`: gange først, 2 · 3 = 6, og 10 − 6 = 4. `y`: parentesen først, 8 · 3 = 24." },
      { t: "laes", h: "Fælden: heltal divideret med heltal",
        md: "Her er noget, der overrasker alle. Når du dividerer **to heltal**, får du et **heltal** — alt efter kommaet bliver smidt væk. Der rundes ikke af. Det kaldes **heltalsdivision**.",
        kode: R`Console.WriteLine(7 / 2);
Console.WriteLine(9 / 10);`,
        output: "3\n0",
        md2: "7 divideret med 2 er 3,5 — men `int` kan ikke indeholde komma, så du får 3. Og 9 / 10 bliver til 0." },
      { t: "laes", h: "Resten: modulus",
        md: "Operatoren `%` giver **resten** ved en division. Den hedder **modulus**. 7 divideret med 2 er 3 — med 1 til rest.",
        kode: R`Console.WriteLine(7 % 2);
Console.WriteLine(10 % 5);
Console.WriteLine(14 % 4);`,
        output: "1\n0\n2",
        md2: "Den bruges tit til at tjekke, om et tal er lige: er `tal % 2` lig 0, går 2 op i tallet." },
      { t: "forudsig",
        kode: R`int kager = 17;
int personer = 5;
Console.WriteLine(kager / personer);
Console.WriteLine(kager % personer);`,
        output: "3\n2",
        fordi: "17 kager til 5 personer: de får 3 hver (heltalsdivision), og der er 2 til overs (modulus)." },
      { t: "laes", h: "Kommatal: double",
        md: "Skal du bruge tal med komma, er typen `double`. To ting at huske:\n\n- **I koden skriver du punktum**: `3.5` — aldrig komma.\n- **På skærmen** skriver en dansk computer et **komma**: `3,5`. (På en computer sat til engelsk står der punktum.)\n\nNår bare **ét** af tallene i en division er et kommatal, får du et rigtigt resultat.",
        kode: R`double hoejde = 1.82;
Console.WriteLine(hoejde);
Console.WriteLine(7.0 / 2);
Console.WriteLine(7 / 2);`,
        output: "1,82\n3,5\n3" },
      { t: "udfyld", q: "Gennemsnittet af 7 og 8 er 7,5. Vælg typen, så resultatet ikke mister kommaet.",
        kode: R`[[double|decimal|float]] sum = 7 + 8;
Console.WriteLine(sum / 2);`,
        output: "7,5",
        fordi: "`sum` er en `double`, så `sum / 2` er en division med et kommatal — og kommaet overlever. Havde `sum` været en `int`, var resultatet blevet 7." },
      { t: "fejl",
        kode: R`int antal = 3;
double pris = 19,95;
Console.WriteLine(pris * antal);`,
        linje: 2,
        fordi: "I koden skal kommatal skrives med **punktum**: `19.95`. Kommaet betyder noget andet i C#, så compileren forstår ikke linjen.",
        rettet: R`int antal = 3;
double pris = 19.95;
Console.WriteLine(pris * antal);` },
      { t: "laes", h: "Penge: decimal",
        md: "`double` regner lynhurtigt, men ikke helt præcist — der kan snige sig bittesmå fejl ind på 15. decimal. Det er lige meget for en højde, men ikke for penge.\n\nTil **penge** bruger man derfor typen `decimal`. Tallet skal have et **m** bagpå (m for *money*).",
        kode: R`decimal pris = 19.95m;
decimal total = pris * 3;
Console.WriteLine(total);`,
        output: "59,85",
        md2: "Huskeregel: **antal** er `int`, **målinger** er `double`, **penge** er `decimal`." },
      { t: "valg", q: "Hvilken type passer bedst til prisen på en vare i en webshop?",
        svar: ["decimal", "int", "string", "double"],
        ret: 0, fordi: "Penge skal være præcise, så man bruger `decimal`. En `int` kan ikke indeholde øre, og `double` kan give bittesmå afrundingsfejl." },
      { t: "laes", h: "Regn videre på den samme variabel",
        md: "Meget tit vil du ændre en variabel ud fra dens egen værdi: \"læg 5 til point\". Det ser mærkeligt ud første gang, men husk, at lighedstegnet betyder **læg ind i**: først regnes højre side ud, så gemmes resultatet.\n\nDer findes genveje, som du kommer til at se overalt:",
        kode: R`int point = 10;
point = point + 5;
Console.WriteLine(point);
point += 5;
Console.WriteLine(point);
point++;
Console.WriteLine(point);
point--;
Console.WriteLine(point);`,
        noter: [
          ["point = point + 5", "Tag værdien, læg 5 til, gem resultatet i point igen."],
          ["point += 5", "Præcis det samme, bare kortere. Findes også som `-=`, `*=` og `/=`."],
          ["point++", "Læg 1 til."],
          ["point--", "Træk 1 fra."]
        ],
        output: "15\n20\n21\n20" },
      { t: "forudsig",
        kode: R`int liv = 3;
liv--;
liv--;
liv += 10;
Console.WriteLine(liv);`,
        output: "11",
        fordi: "3 → 2 → 1, og så plus 10 = 11." },
      { t: "skriv", q: "En vare koster 80 kr. Lav en `int`, der hedder `pris`, med værdien 80 og en `int`, der hedder `antal`, med værdien 4. Regn det samlede beløb ud i en `int`, der hedder `total`, og skriv `total` ud.",
        tjek: [
          ["int pris = 80;", "Lav `int pris = 80;`"],
          ["int antal = 4;", "Lav `int antal = 4;`"],
          [/int total=(pris\*antal|antal\*pris);/, "Regn ud med variablerne: `int total = pris * antal;`"],
          ["Console.WriteLine(total);", "Skriv `total` ud"]
        ],
        forkert: ["int pris = 80;\nint antal = 4;\nint total = 320;\nConsole.WriteLine(total);"],
        loesning: R`int pris = 80;
int antal = 4;
int total = pris * antal;
Console.WriteLine(total);`,
        output: "320" },
      { t: "ide", h: "Regn på en indkøbstur",
        md: "Lav et nyt Console-projekt, `Indkoeb`. Skriv programmet, og kør det. Prøv så at ændre `antalMaelk` og se, at alle resultaterne følger med.",
        kode: R`decimal prisMaelk = 12.50m;
int antalMaelk = 3;
decimal prisBroed = 24.95m;

decimal total = prisMaelk * antalMaelk + prisBroed;
Console.WriteLine("I alt: " + total + " kr.");

int betalt = 100;
Console.WriteLine("Tilbage: " + (betalt - total) + " kr.");`,
        output: "I alt: 62,45 kr.\nTilbage: 37,55 kr.",
        md2: "Læg mærke til parentesen i sidste linje. Uden den ville C# først lime `\"Tilbage: \"` og `betalt` sammen til tekst — og så kan der ikke trækkes fra." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvorfor giver `7 / 2` resultatet 3 i C#, og hvad gør du, hvis du vil have 3,5?",
        svar: "Begge tal er **heltal** (`int`), og så laver C# **heltalsdivision**: resultatet bliver også et heltal, og alt efter kommaet smides væk. Vil jeg have 3,5, skal mindst ét af tallene være et **kommatal** (`double`), fx `7.0 / 2`.",
        noegle: ["heltal", "int", "heltalsdivision", "double"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m01l3", titel: "Tekst, sandt/falsk og var", min: 16,
    ord: [
      ["String-interpolation", "At sætte variabler direkte ind i en tekst: `$\"Hej {navn}\"`. Dollartegnet foran slår det til."],
      ["bool", "Typen for sandt/falsk. Kan kun være `true` eller `false`."],
      ["char", "Typen for ét enkelt tegn. Skrives i 'enkelte' anførselstegn."],
      ["var", "Lader compileren selv finde typen ud fra værdien. Variablen har stadig en fast type."],
      ["const", "En konstant: en værdi, der aldrig må ændres, mens programmet kører."],
      ["Length", "Egenskab på en string, der fortæller, hvor mange tegn teksten har."],
      ["Escape-tegn", "En omvendt skråstreg, der giver det næste tegn en særlig betydning: `\\n` er linjeskift, `\\\"` er et anførselstegn."]
    ],
    trin: [
      { t: "laes", h: "En nemmere måde at sætte tekst sammen",
        md: "At lime med `+` bliver hurtigt rodet. Der findes en pænere måde: sæt et **dollartegn** foran teksten, og skriv variablerne i **tuborgklammer** midt i teksten. Det hedder **string-interpolation**.",
        kode: R`string navn = "Peter";
int alder = 25;
Console.WriteLine("Jeg hedder " + navn + " og er " + alder + " år");
Console.WriteLine($"Jeg hedder {navn} og er {alder} år");`,
        output: "Jeg hedder Peter og er 25 år\nJeg hedder Peter og er 25 år",
        md2: "De to linjer skriver præcis det samme. Den nederste er lettere at læse, og man glemmer ikke mellemrummene. Det er den, du ser mest i moderne C#." },
      { t: "udfyld", q: "Lav linjen om til string-interpolation.",
        kode: R`string by = "Vejle";
Console.WriteLine([[$]]"Jeg bor i [[{by}]]");`,
        output: "Jeg bor i Vejle",
        fordi: "Dollartegnet står lige foran det første anførselstegn. Variablen står i tuborgklammer." },
      { t: "forudsig",
        kode: R`int a = 4;
int b = 5;
Console.WriteLine($"{a} + {b} = {a + b}");
Console.WriteLine("{a} + {b}");`,
        output: "4 + 5 = 9\n{a} + {b}",
        fordi: "I klammerne må der stå et helt regnestykke — det regnes ud. Den anden linje mangler dollartegnet, så klammerne er bare almindelige tegn og bliver skrevet, som de står." },
      { t: "skriv", q: "Variablerne er lavet for dig. Skriv **én** linje med string-interpolation, der skriver: `Anna har 3 katte`",
        foer: R`string navn = "Anna";
int antal = 3;`,
        tjek: [
          [/Console\.WriteLine\(\$"/, "Brug `Console.WriteLine($\"...\");` — med dollartegn foran teksten"],
          ["{navn}", "Sæt `{navn}` ind i teksten"],
          ["{antal}", "Sæt `{antal}` ind i teksten"],
          [/\{navn\} har \{antal\} katte"\);/, "Teksten skal være præcis: `{navn} har {antal} katte`"]
        ],
        forkert: ['Console.WriteLine("Anna har 3 katte");', 'Console.WriteLine("{navn} har {antal} katte");'],
        loesning: R`Console.WriteLine($"{navn} har {antal} katte");`,
        output: "Anna har 3 katte" },
      { t: "laes", h: "Særlige tegn i tekst",
        md: "Nogle tegn kan man ikke bare skrive i en tekst. Hvordan skriver man fx et anførselstegn, når anførselstegn afslutter teksten? Man sætter en **omvendt skråstreg** `\\` foran. Det kaldes et **escape-tegn**.",
        kode: R`Console.WriteLine("Linje 1\nLinje 2");
Console.WriteLine("Han sagde \"hej\"");`,
        noter: [
          [R`\n`, "Linjeskift (n for *new line*)."],
          [R`\"`, "Et anførselstegn, der skal skrives — ikke afslutte teksten."]
        ],
        output: "Linje 1\nLinje 2\nHan sagde \"hej\"" },
      { t: "laes", h: "En string kan mere end at blive skrevet ud",
        md: "En string har indbyggede værktøjer, som du kalder med et **punktum** efter variablen. Her er tre, du får brug for:",
        kode: R`string navn = "Peter";
Console.WriteLine(navn.Length);
Console.WriteLine(navn.ToUpper());
Console.WriteLine(navn.ToLower());`,
        noter: [
          [".Length", "Antal tegn i teksten. Uden parenteser."],
          [".ToUpper()", "Giver teksten med store bogstaver. Med parenteser."],
          [".ToLower()", "Giver teksten med små bogstaver."]
        ],
        output: "5\nPETER\npeter",
        md2: "Når du skriver punktummet i {{Visual Studio||Rider}}, dukker der en liste op med alt, du kan gøre. Den liste er din bedste ven: du behøver ikke huske det hele udenad." },
      { t: "forudsig",
        kode: R`string ord = "kode";
Console.WriteLine(ord.ToUpper());
Console.WriteLine(ord);
Console.WriteLine(ord.Length);`,
        output: "KODE\nkode\n4",
        fordi: "`ToUpper()` **giver en ny tekst** med store bogstaver — den ændrer ikke selve variablen. Derfor skriver linje 3 stadig `kode`." },
      { t: "laes", h: "Sandt eller falsk: bool",
        md: "Den sidste grundtype er den enkleste. En `bool` kan kun have to værdier: `true` (sand) eller `false` (falsk). Uden anførselstegn.\n\nDen bliver vigtig i næste modul, hvor programmet skal **vælge**, hvad det skal gøre.",
        kode: R`bool erLoggetInd = true;
bool harBetalt = false;
Console.WriteLine(erLoggetInd);
Console.WriteLine(harBetalt);
Console.WriteLine(5 > 3);
Console.WriteLine(10 < 2);`,
        output: "True\nFalse\nTrue\nFalse",
        md2: "En sammenligning som `5 > 3` giver selv en bool. Læg mærke til, at C# skriver `True` og `False` med stort på skærmen, men i koden skrives de med småt." },
      { t: "valg", q: "Hvilken linje er rigtig?",
        svar: ["bool erVoksen = true;", "bool erVoksen = \"true\";", "bool erVoksen = True;", "bool erVoksen = ja;"],
        ret: 0, fordi: "`true` og `false` skrives med små bogstaver og uden anførselstegn. Med anførselstegn er det en string — og en string kan ikke lægges i en bool." },
      { t: "laes", h: "Et enkelt tegn: char",
        md: "En `char` indeholder **præcis ét tegn** og skrives i **enkelte** anførselstegn. Du bruger den sjældent, men du skal kunne kende den.",
        kode: R`char karakter = 'A';
string ord = "A";
Console.WriteLine(karakter);
Console.WriteLine(ord);`,
        output: "A\nA",
        md2: "`'A'` er et tegn. `\"A\"` er en tekst, der tilfældigvis kun har ét tegn. For C# er det to forskellige typer." },
      { t: "laes", h: "var: lad compileren finde typen",
        md: "I stedet for at skrive typen kan du skrive `var`. Så kigger compileren på værdien til højre og **finder selv typen**.",
        kode: R`var navn = "Peter";
var alder = 25;
var pris = 19.95;
var erKlar = true;
Console.WriteLine($"{navn} {alder} {pris} {erKlar}");`,
        noter: [
          ["var navn = \"Peter\"", "Tekst i anførselstegn → `string`."],
          ["var alder = 25", "Heltal → `int`."],
          ["var pris = 19.95", "Kommatal → `double`."],
          ["var erKlar = true", "true/false → `bool`."]
        ],
        output: "Peter 25 19,95 True",
        md2: "`var` betyder **ikke** \"hvad som helst\". Variablen får en fast type, og den kan ikke skifte bagefter. Du ser `var` rigtig meget i lærerens kode og i det, Visual Studio selv laver." },
      { t: "fejl",
        kode: R`var antal = 10;
antal = 20;
antal = "tyve";
Console.WriteLine(antal);`,
        linje: 3,
        fordi: "`var antal = 10;` gør `antal` til en `int` — for altid. Man kan godt give den et nyt tal (linje 2), men ikke en tekst.",
        rettet: R`var antal = 10;
antal = 20;
antal = 30;
Console.WriteLine(antal);` },
      { t: "laes", h: "const: værdier, der ikke må ændres",
        md: "Nogle værdier skal aldrig ændres — fx momssatsen. Skriv `const` foran, så **nægter compileren** at lade nogen ændre den ved en fejl. Konstanter skrives med stort begyndelsesbogstav.",
        kode: R`const double Moms = 0.25;
double pris = 200;
Console.WriteLine(pris * Moms);`,
        output: "50" },
      { t: "ide", h: "Et visitkort",
        md: "Lav et Console-projekt, `Visitkort`. Brug `var`, string-interpolation og `\\n`. Prøv bagefter at skrive `navn.` og kig på listen, der dukker op — find `ToUpper`, og brug den.",
        kode: R`var navn = "Peter Hansen";
var titel = "C#-udvikler";
var erfaring = 1;

Console.WriteLine($"*** {navn.ToUpper()} ***");
Console.WriteLine($"{titel}\nErfaring: {erfaring} år");
Console.WriteLine($"Navnet har {navn.Length} tegn");`,
        output: "*** PETER HANSEN ***\nC#-udvikler\nErfaring: 1 år\nNavnet har 12 tegn" },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på typerne `int`, `double`, `decimal`, `string` og `bool`? Giv et eksempel på, hvad hver bruges til.",
        svar: "`int` er **heltal**, fx et antal. `double` er **kommatal**, fx en højde. `decimal` er præcise kommatal til **penge**. `string` er **tekst**, fx et navn. `bool` er **sandt eller falsk**, fx om brugeren er logget ind. Typen bestemmer, hvad variablen kan indeholde, og hvad man kan gøre med den.",
        noegle: ["heltal", "kommatal", "penge", "tekst", "true", "false"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m01l4", titel: "Spørg brugeren: input og konvertering", min: 16,
    ord: [
      ["Console.ReadLine", "Venter på, at brugeren skriver noget og trykker Enter. Giver altid en string tilbage."],
      ["Returværdi", "Det, en metode giver tilbage, når den er færdig. `ReadLine` returnerer den tekst, brugeren skrev."],
      ["Konvertere (parse)", "At lave en værdi om fra én type til en anden, fx teksten \"25\" til tallet 25."],
      ["int.Parse", "Laver en tekst om til et heltal. Programmet går ned, hvis teksten ikke er et tal."],
      ["Cast", "At tvinge en værdi over i en anden type ved at skrive typen i parentes foran: `(int)3.9` giver 3."],
      ["Exception", "En fejl, der sker, mens programmet kører. Programmet stopper, hvis den ikke bliver håndteret."]
    ],
    trin: [
      { t: "laes", h: "Programmet stiller et spørgsmål",
        md: "`Console.WriteLine` sender tekst **ud** til brugeren. `Console.ReadLine()` henter tekst **ind**: programmet **venter**, til brugeren har skrevet noget og trykket Enter.\n\nDet, brugeren skrev, kommer tilbage som en `string`, som du gemmer i en variabel.",
        kode: R`Console.Write("Hvad hedder du? ");
string navn = Console.ReadLine();
Console.WriteLine($"Hej {navn}!");`,
        noter: [
          ["Console.Write(...)", "Stiller spørgsmålet. `Write`, så markøren bliver på linjen."],
          ["Console.ReadLine()", "Venter på brugeren. Tomme parenteser."],
          ["string navn =", "Svaret gemmes i variablen navn."]
        ],
        md2: "Skriver brugeren `Peter`, svarer programmet `Hej Peter!`.\n\n{{Visual Studio sætter måske en grøn bølgestreg under `Console.ReadLine()`.||Rider markerer måske `Console.ReadLine()` med en bølgestreg, der ikke er rød.}} Det er en **advarsel**, ikke en fejl: programmet kører fint. Den forklares i modul 7 (nullable)." },
      { t: "forudsig", q: "Brugeren taster svarene, du ser under koden. Hvad skriver programmet **efter** det sidste svar? (Kun den sidste linje.)",
        kode: R`string by = Console.ReadLine();
string land = Console.ReadLine();
Console.WriteLine($"{by} ligger i {land}");`,
        input: ["Skagen", "Danmark"],
        output: "Skagen ligger i Danmark",
        fordi: "Første `ReadLine` får det første svar, anden `ReadLine` får det næste." },
      { t: "orden", q: "Programmet skal spørge om en yndlingsfarve og svare. Sæt linjerne i rækkefølge.",
        linjer: [R`Console.Write("Yndlingsfarve? ");`, R`string farve = Console.ReadLine();`, R`Console.WriteLine($"{farve} er en flot farve");`],
        fordi: "Først spørgsmålet, så læses svaret, og til sidst bruges det. Du kan ikke bruge `farve`, før den er lavet." },
      { t: "laes", h: "Problemet: alt, hvad brugeren skriver, er tekst",
        md: "`ReadLine` giver **altid** en string — også når brugeren skriver et tal. Teksten `\"25\"` er ikke tallet 25. Se, hvad der sker, når man lægger sammen:",
        kode: R`string alder = "25";
Console.WriteLine(alder + 1);`,
        output: "251",
        md2: "Plus mellem en tekst og et tal **limer sammen**. Der bliver ikke regnet. Skal du regne, må teksten først laves om til et rigtigt tal." },
      { t: "laes", h: "int.Parse laver tekst om til tal",
        md: "`int.Parse(...)` tager en tekst og giver et heltal tilbage. At lave om fra én type til en anden hedder at **konvertere** — eller på programmør-dansk: at *parse*.",
        kode: R`string tekst = "25";
int alder = int.Parse(tekst);
Console.WriteLine(alder + 1);`,
        output: "26",
        md2: "Til kommatal findes `double.Parse(...)`, og til penge `decimal.Parse(...)`. Du vil også møde `Convert.ToInt32(...)` — den gør det samme som `int.Parse`." },
      { t: "udfyld", q: "Brugeren taster sit fødselsår. Udfyld, så programmet kan regne med det.",
        kode: R`Console.Write("Fødselsår: ");
string svar = Console.[[ReadLine]]();
int aar = [[int.Parse|Convert.ToInt32]](svar);
Console.WriteLine(2026 - aar);`,
        input: ["2000"],
        output: "Fødselsår: 26",
        fordi: "`ReadLine` henter teksten, og `int.Parse` laver den om til et heltal, så der kan trækkes fra. (Spørgsmålet og svaret står på samme linje, fordi der er brugt `Write`.)" },
      { t: "laes", h: "Det hele på én linje",
        md: "Man behøver ikke gemme teksten først. Man kan sende `ReadLine` direkte ind i `Parse`. Læs indefra og ud: først læses teksten, så laves den om til et tal, og så gemmes tallet.",
        kode: R`Console.Write("Hvor gammel er du? ");
int alder = int.Parse(Console.ReadLine());
Console.WriteLine($"Om 10 år er du {alder + 10}");`,
        md2: "Sådan ser du det oftest skrevet." },
      { t: "skriv", q: "Skriv et program, der læser et heltal fra brugeren ind i en `int`, der hedder `tal`, og skriver det dobbelte ud med `Console.WriteLine(tal * 2);`",
        tjek: [
          [/int tal=(int\.Parse|Convert\.ToInt32)\(Console\.ReadLine\(\)\);/, "Læs og konvertér på én linje: `int tal = int.Parse(Console.ReadLine());`"],
          ["Console.WriteLine(tal * 2);", "Skriv det dobbelte ud: `Console.WriteLine(tal * 2);`"]
        ],
        forkert: ["string tal = Console.ReadLine();\nConsole.WriteLine(tal * 2);", "int tal = Console.ReadLine();\nConsole.WriteLine(tal * 2);"],
        loesning: R`int tal = int.Parse(Console.ReadLine());
Console.WriteLine(tal * 2);`,
        hint: "Læs indefra og ud: ReadLine giver en tekst, int.Parse laver den til et tal." },
      { t: "fejl",
        kode: R`Console.Write("Antal: ");
int antal = Console.ReadLine();
Console.WriteLine(antal * 2);`,
        linje: 2,
        fordi: "`ReadLine` giver en `string`, og den kan ikke lægges direkte i en `int`. Compileren siger: `Cannot implicitly convert type 'string' to 'int'`. Der mangler en `int.Parse(...)` udenom.",
        rettet: R`Console.Write("Antal: ");
int antal = int.Parse(Console.ReadLine());
Console.WriteLine(antal * 2);` },
      { t: "laes", h: "Når brugeren skriver noget forkert",
        md: "Hvad hvis programmet beder om et tal, og brugeren skriver `femten`? Så kan `int.Parse` ikke klare det, og programmet **går ned** med en fejl, mens det kører. Sådan en fejl hedder en **exception**. Du vil se noget i retning af:\n\n`System.FormatException: The input string 'femten' was not in a correct format.`\n\nDet er en anden slags fejl end de røde streger. Koden er skrevet rigtigt — det er **indholdet**, der er forkert, og det kan compileren ikke vide på forhånd.\n\nI næste modul lærer du at tjekke svaret først, så programmet kan spørge igen i stedet for at gå ned." },
      { t: "valg", q: "Programmet kører `int.Parse(\"12a\")`. Hvad sker der?",
        svar: ["Programmet går ned med en FormatException, mens det kører", "Compileren viser en rød streg, før programmet starter", "Resultatet bliver 12", "Resultatet bliver 0"],
        ret: 0, fordi: "Koden er lovlig, så compileren siger ingenting. Fejlen opstår først, når programmet kører og prøver at lave `12a` om til et tal." },
      { t: "laes", h: "Fra én taltype til en anden",
        md: "Tal kan også laves om mellem taltyper.\n\n- Fra **lille til stor** (int → double) sker det af sig selv. Der går intet tabt.\n- Fra **stor til lille** (double → int) mister du kommaet. Derfor skal du selv bede om det ved at skrive typen i parentes foran. Det hedder et **cast**.",
        kode: R`int hel = 7;
double komma = hel;
Console.WriteLine(komma / 2);

double pris = 9.99;
int afkortet = (int)pris;
Console.WriteLine(afkortet);`,
        output: "3,5\n9",
        md2: "Et cast **runder ikke af** — det klipper alt efter kommaet væk. 9,99 bliver til 9." },
      { t: "forudsig",
        kode: R`double a = 3.9;
int b = (int)a;
int c = 10;
double d = c;
Console.WriteLine(b);
Console.WriteLine(d / 4);`,
        output: "3\n2,5",
        fordi: "Castet klipper kommaet af 3,9, så `b` er 3. `d` er en double med værdien 10, og 10 / 4 med kommatal er 2,5." },
      { t: "ide", h: "Hvornår er du født?",
        md: "Lav et Console-projekt, `Alder`. Skriv programmet, og prøv det med din egen alder. Prøv bagefter at svare med bogstaver i stedet for et tal — og læs fejlen, programmet går ned med.",
        kode: R`Console.Write("Hvad hedder du? ");
string navn = Console.ReadLine();

Console.Write("Hvor gammel er du? ");
int alder = int.Parse(Console.ReadLine());

int foedselsaar = 2026 - alder;
Console.WriteLine($"Hej {navn}. Du er født i {foedselsaar} eller {foedselsaar - 1}.");`,
        win: ["Kør med **Ctrl + F5**, og skriv dine svar i det sorte vindue.", "Når programmet går ned, viser vinduet en *Unhandled exception*. Det er ikke farligt — luk vinduet."],
        mac: ["Kør med den **grønne pil ▶**, klik i vinduet **Run** nederst, og skriv dine svar dér.", "Når programmet går ned, viser vinduet en *Unhandled exception* med rød skrift. Det er ikke farligt."] },
      { t: "forklar", q: "Forklar med dine egne ord: Hvorfor skal man bruge `int.Parse`, når man læser et tal med `Console.ReadLine()`?",
        svar: "`Console.ReadLine()` giver altid en **string** tilbage — også når brugeren taster et tal. Tekst kan man ikke regne med: `\"25\" + 1` bliver `251`. `int.Parse` **konverterer** teksten til en `int`, så man kan regne. Skriver brugeren noget, der ikke er et tal, går programmet ned med en **exception**.",
        noegle: ["string", "konverter", "int", "regne", "exception"] }
    ] }
  ]
});
})();
