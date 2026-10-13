// Modul 3 — Metoder og arrays. Forudsætter: modul 0–2.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m03", nr: 3, del: "Del 1 · C# fra bunden", ikon: "🧰",
  titel: "Metoder og arrays",
  dag: "Kursusdag 2 · Syntaks og typer",
  intro: "To værktøjer, der gør dine programmer overskuelige: **metoder**, så du kan give et stykke kode et navn og bruge det igen og igen — og **arrays**, så du kan gemme mange værdier i én variabel.\n\nBagefter kan du skrive et program, der regner gennemsnit og finder den højeste karakter i en liste.",
  video: ["02_Tirsdag.mp4 (3 t 58 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m03l1", titel: "Metoder: giv koden et navn", min: 14,
    ord: [
      ["Metode", "Et stykke kode med et navn. Koden kører, hver gang man kalder metoden."],
      ["Kalde", "At bede en metode om at køre: man skriver dens navn og parenteser, fx `Hils();`"],
      ["Definere", "At skrive selve metoden: dens navn og den kode, der skal køre."],
      ["void", "Betyder \"ingenting\". En void-metode gør noget, men giver ikke en værdi tilbage."],
      ["static", "Ord, der skal stå foran metoder i klassen Program lige nu. Forklares i modul 4."],
      ["PascalCase", "Skrivemåden for metodenavne: stort begyndelsesbogstav og stort ved hvert nyt ord, fx `BeregnPris`."],
      ["DRY", "Don't Repeat Yourself: skriv ikke den samme kode flere steder — læg den i en metode."]
    ],
    trin: [
      { t: "laes", h: "Hvorfor metoder?",
        md: "Du har brugt metoder fra første dag: `Console.WriteLine` er en metode, som nogen hos Microsoft har skrevet. Nu skal du lave dine egne.\n\nEn **metode** er et stykke kode, der har fået et **navn**. Der er to gevinster:\n\n- Du kan bruge koden **mange gange** uden at skrive den igen.\n- Programmet bliver **lettere at læse**, fordi navnet fortæller, hvad koden gør.",
        kode: R`static void Hils()
{
    Console.WriteLine("Hej!");
    Console.WriteLine("Velkommen til.");
}

Hils();
Hils();`,
        noter: [
          ["static void Hils()", "Her **defineres** metoden. Navnet er Hils. De tomme parenteser betyder, at den ikke skal have noget at arbejde med."],
          ["{ … }", "Metodens krop: den kode, der kører."],
          ["Hils();", "Her **kaldes** metoden. Navn + parenteser + semikolon."]
        ],
        output: "Hej!\nVelkommen til.\nHej!\nVelkommen til.",
        md2: "At definere en metode kører den **ikke**. Den kører først, når den bliver kaldt — og her bliver den kaldt to gange." },
      { t: "forudsig",
        kode: R`static void Streg()
{
    Console.WriteLine("-----");
}

Console.WriteLine("Menu");
Streg();
Console.WriteLine("Kaffe");
Streg();`,
        output: "Menu\n-----\nKaffe\n-----",
        fordi: "Programmet starter ved den første linje **uden for** metoden. Hver gang det møder `Streg();`, hopper det ind i metoden, udfører den og hopper tilbage." },
      { t: "valg", q: "Hvad sker der, hvis du definerer en metode, men aldrig kalder den?",
        svar: ["Ingenting — koden i den bliver aldrig udført", "Den kører én gang af sig selv", "Programmet kan ikke oversættes", "Den kører til sidst i programmet"],
        ret: 0, fordi: "En definition er bare en opskrift. Der sker først noget, når nogen kalder den." },
      { t: "laes", h: "Hvor bor metoderne?",
        md: "Bruger du den **korte** skrivemåde (uden skelet), skriver du bare metoden i samme fil — typisk nederst.\n\nBruger du **skelettet** fra modul 0, skal metoden ligge **inde i klassen**, ved siden af `Main` — ikke inde i `Main`.",
        kode: R`class Program
{
    static void Main(string[] args)
    {
        Hils();
    }

    static void Hils()
    {
        Console.WriteLine("Hej fra min egen metode");
    }
}`,
        output: "Hej fra min egen metode",
        md2: "`Main` er altså selv en metode — den, computeren kalder for at starte programmet. Ordet `static` skal stå foran dine metoder indtil videre. Hvorfor, lærer du i modul 4.\n\nMetodenavne skrives med **PascalCase**: stort begyndelsesbogstav, `BeregnPris`. Variabler skrives med camelCase, `prisMedMoms`." },
      { t: "orden", q: "Sæt linjerne i rækkefølge, så klassen har en `Main`, der kalder metoden `Farvel`.", alt: [[0, 1, 6, 7, 8, 9, 2, 3, 4, 5, 10]],
        linjer: ["class Program", "{", "    static void Main(string[] args)", "    {", "        Farvel();", "    }", "    static void Farvel()", "    {", R`        Console.WriteLine("Farvel");`, "    }", "}"],
        output: "Farvel",
        fordi: "Begge metoder ligger inde i klassens klammer — efter hinanden, ikke inden i hinanden." },
      { t: "fejl",
        kode: R`static void SigHej()
{
    Console.WriteLine("Hej");
}

SigHej;`,
        linje: 6,
        fordi: "Et metodekald skal have **parenteser**: `SigHej();`. Uden parenteser er det bare et navn, og compileren ved ikke, at du vil køre metoden.",
        rettet: R`static void SigHej()
{
    Console.WriteLine("Hej");
}

SigHej();` },
      { t: "udfyld", q: "Udfyld, så metoden bliver defineret og kaldt tre gange.",
        kode: R`static [[void]] Hop()
{
    Console.WriteLine("Hop");
}

for (int i = 0; i < 3; i++)
{
    [[Hop()]];
}`,
        output: "Hop\nHop\nHop",
        fordi: "`void`, fordi metoden ikke giver noget tilbage. Kaldet er navnet med parenteser." },
      { t: "skriv", q: "Definér en metode, der hedder `VisTitel`. Den skal skrive `C# for begyndere`. Kald den bagefter én gang.",
        tjek: [
          [/static void VisTitel\(\)\{/, "Definér metoden: `static void VisTitel()` efterfulgt af `{`"],
          ['Console.WriteLine("C# for begyndere");', "Metoden skal skrive `C# for begyndere`"],
          [/\}VisTitel\(\);|^VisTitel\(\);/, "Kald metoden uden for dens krop: `VisTitel();`"]
        ],
        forkert: ['static void VisTitel()\n{\n    Console.WriteLine("C# for begyndere");\n}'],
        loesning: R`static void VisTitel()
{
    Console.WriteLine("C# for begyndere");
}

VisTitel();`,
        output: "C# for begyndere" },
      { t: "laes", h: "DRY: gentag ikke dig selv",
        md: "Programmører har en huskeregel, **DRY** — *Don't Repeat Yourself*. Står den samme kode tre steder, skal den rettes tre steder, når noget ændrer sig, og man glemmer altid ét.\n\nNår du opdager, at du kopierer kode, så stop. Læg den i en metode, og kald metoden i stedet. Så skal en rettelse kun laves **ét sted**." },
      { t: "ide", h: "Ryd op med metoder",
        md: "Lav et Console-projekt, `Kvittering`. Skriv programmet, og kør det. Ret så stregen i `Streg()` til `=====` — og se, at alle tre streger ændrer sig, selvom du kun rettede ét sted.",
        kode: R`VisHoved();
Console.WriteLine("Kaffe        25 kr.");
Console.WriteLine("Kage         30 kr.");
Streg();
Console.WriteLine("I alt        55 kr.");
Streg();

static void VisHoved()
{
    Console.WriteLine("CAFÉ KODE12");
    Streg();
}

static void Streg()
{
    Console.WriteLine("-------------------");
}`,
        output: "CAFÉ KODE12\n-------------------\nKaffe        25 kr.\nKage         30 kr.\n-------------------\nI alt        55 kr.\n-------------------",
        md2: "Læg mærke til, at en metode gerne må kalde en anden metode: `VisHoved` kalder `Streg`." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er en metode, og hvorfor bruger man dem?",
        svar: "En metode er et stykke kode, der har fået et **navn**. Man **definerer** den ét sted og kan **kalde** den lige så mange gange, man vil. Man bruger metoder for at **undgå at gentage kode** (DRY), for at gøre programmet **lettere at læse**, og fordi en rettelse så kun skal laves **ét sted**.",
        noegle: ["navn", "kalde", "gentage", "læse", "ét sted"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m03l2", titel: "Parametre og returværdier", min: 18,
    ord: [
      ["Parameter", "En variabel i metodens parentes, der tager imod en værdi udefra: `static void Hils(string navn)`."],
      ["Argument", "Den værdi, man sender med, når man kalder metoden: `Hils(\"Peter\")`."],
      ["return", "Afslutter metoden og sender en værdi tilbage til den, der kaldte."],
      ["Returtype", "Typen foran metodens navn. Fortæller, hvilken slags værdi metoden giver tilbage. `void` = ingen."],
      ["Lokal variabel", "En variabel lavet inde i en metode. Den findes kun, mens metoden kører, og kun inde i metoden."],
      ["Signatur", "Metodens navn og dens parametre. Det er det, man skal kende for at kalde den."]
    ],
    trin: [
      { t: "laes", h: "Send noget med ind",
        md: "En metode, der altid gør præcis det samme, er ikke så nyttig. Med en **parameter** kan metoden tage imod en værdi, hver gang den bliver kaldt.\n\nParameteren er en variabel, der laves i metodens parentes. Værdien, du sender med i kaldet, hedder et **argument**.",
        kode: R`static void Hils(string navn)
{
    Console.WriteLine($"Hej {navn}!");
}

Hils("Peter");
Hils("Anna");`,
        noter: [
          ["(string navn)", "Parameteren: metoden forventer en tekst og kalder den navn."],
          ["Hils(\"Peter\")", "Argumentet \"Peter\" lægges i navn, og metoden kører."]
        ],
        output: "Hej Peter!\nHej Anna!" },
      { t: "forudsig",
        kode: R`static void Gentag(string tekst, int antal)
{
    for (int i = 0; i < antal; i++)
    {
        Console.WriteLine(tekst);
    }
}

Gentag("Ja", 2);
Gentag("Nej", 1);`,
        output: "Ja\nJa\nNej",
        fordi: "En metode kan have flere parametre, adskilt af komma. Argumenterne lægges ind i **samme rækkefølge**: det første i `tekst`, det andet i `antal`." },
      { t: "fejl",
        kode: R`static void VisAlder(string navn, int alder)
{
    Console.WriteLine($"{navn} er {alder} år");
}

VisAlder(30, "Peter");`,
        linje: 6,
        fordi: "Argumenterne står i forkert rækkefølge. Metoden forventer først en `string` og så en `int`. Compileren siger: `cannot convert from 'int' to 'string'`.",
        rettet: R`static void VisAlder(string navn, int alder)
{
    Console.WriteLine($"{navn} er {alder} år");
}

VisAlder("Peter", 30);` },
      { t: "laes", h: "Få noget tilbage",
        md: "Indtil nu har dine metoder **gjort** noget (skrevet på skærmen). Mange metoder skal i stedet **regne noget ud og give svaret tilbage**. Det gør de med ordet `return`.\n\nSå skal `void` skiftes ud med **typen på det, der kommer tilbage**.",
        kode: R`static int LaegSammen(int a, int b)
{
    return a + b;
}

int resultat = LaegSammen(3, 4);
Console.WriteLine(resultat);`,
        noter: [
          ["static int", "Returtypen: metoden giver et heltal tilbage."],
          ["return a + b;", "Regn ud, og send resultatet tilbage. Metoden slutter her."],
          ["int resultat = LaegSammen(3, 4);", "Kaldet bliver **erstattet af værdien**, der kommer tilbage — her 7."]
        ],
        output: "7",
        md2: "Kaldet er et spørgsmål, og `return` er svaret. Det er præcis sådan, `int.Parse(\"25\")` virker: du sender en tekst ind og får et tal tilbage." },
      { t: "forudsig",
        kode: R`static int Dobbelt(int tal)
{
    return tal * 2;
}

Console.WriteLine(Dobbelt(5));
Console.WriteLine(Dobbelt(5) + 1);
Console.WriteLine(Dobbelt(Dobbelt(3)));`,
        output: "10\n11\n12",
        fordi: "Et kald kan stå alle steder, hvor en værdi kan stå. I sidste linje regnes det inderste kald først: `Dobbelt(3)` er 6, og `Dobbelt(6)` er 12." },
      { t: "valg", q: "Hvad er forskellen på at **skrive ud** og at **returnere**?",
        svar: ["WriteLine viser noget for brugeren. return sender en værdi tilbage til koden, der kaldte, så den kan bruges videre.", "Der er ingen forskel", "return viser værdien på skærmen", "WriteLine gemmer værdien i en variabel"],
        ret: 0, fordi: "En metode, der kun skriver ud, kan man ikke regne videre med. En metode, der returnerer, giver en værdi, man kan gemme, regne med eller sende videre. Derfor er det normalt bedst, at metoder **returnerer** — og at det kun er yderst i programmet, der skrives ud." },
      { t: "udfyld", q: "Metoden skal regne arealet af et rektangel ud og give det tilbage.",
        kode: R`static [[int|long|double|decimal|float]] Areal(int bredde, int hoejde)
{
    [[return]] bredde * hoejde;
}

Console.WriteLine(Areal(4, 5));`,
        output: "20",
        fordi: "Returtypen er `int`, fordi bredde gange højde er et heltal. `return` sender resultatet tilbage." },
      { t: "fejl",
        kode: R`static int Kvadrat(int tal)
{
    int resultat = tal * tal;
    resultat;
}

Console.WriteLine(Kvadrat(4));`,
        linje: 4,
        fordi: "Linje 4 mangler ordet `return`. `resultat;` alene gør ingenting, så metoden giver aldrig sin `int` tilbage. Compileren melder to fejl: `Only assignment, call, increment, decrement, await, and new object expressions can be used as a statement` på linje 4 og `not all code paths return a value` på linje 1.",
        rettet: R`static int Kvadrat(int tal)
{
    int resultat = tal * tal;
    return resultat;
}

Console.WriteLine(Kvadrat(4));` },
      { t: "laes", h: "Metoder kan returnere alle typer",
        md: "Returtypen kan være hvad som helst: `int`, `double`, `string`, `bool` … En metode, der returnerer en `bool`, er perfekt til en `if`. Den får typisk et navn, der starter med `Er` eller `Har`.",
        kode: R`static bool ErVoksen(int alder)
{
    return alder >= 18;
}

if (ErVoksen(20))
{
    Console.WriteLine("Adgang");
}
Console.WriteLine(ErVoksen(12));`,
        output: "Adgang\nFalse",
        md2: "`alder >= 18` er selv en bool, så den kan returneres direkte. Man behøver ikke skrive en if/else, der returnerer true eller false." },
      { t: "skriv", q: "Skriv en metode, der hedder `ErLige`. Den tager en `int`, der hedder `tal`, og returnerer en `bool`: `true`, hvis tallet er lige. (Koden nedenunder kalder din metode.)",
        efter: R`Console.WriteLine(ErLige(4));
Console.WriteLine(ErLige(7));`,
        tjek: [
          [/static bool ErLige\(int tal\)\{/, "Signaturen skal være `static bool ErLige(int tal)`"],
          [/return/, "Metoden skal returnere en værdi med `return`"],
          [/tal%2==0/, "Et tal er lige, når `tal % 2 == 0`"]
        ],
        loesning: R`static bool ErLige(int tal)
{
    return tal % 2 == 0;
}`,
        output: "True\nFalse" },
      { t: "laes", h: "Variabler i en metode er metodens egne",
        md: "En variabel, der laves inde i en metode, kaldes en **lokal variabel**. Den findes **kun inde i den metode** og kun, mens metoden kører. To metoder kan derfor sagtens have hver sin variabel med samme navn uden at forstyrre hinanden.\n\nDet samme gælder parametre: metoden får en **kopi** af den værdi, du sender ind.",
        kode: R`static void LaegTil(int tal)
{
    tal = tal + 10;
    Console.WriteLine($"I metoden: {tal}");
}

int point = 5;
LaegTil(point);
Console.WriteLine($"Bagefter: {point}");`,
        output: "I metoden: 15\nBagefter: 5",
        md2: "Metoden ændrer kun sin egen kopi. Variablen `point` er uberørt. Vil du have resultatet ud af metoden, skal den **returnere** det." },
      { t: "forudsig",
        kode: R`static int Fordobl(int x)
{
    x = x * 2;
    return x;
}

int a = 4;
int b = Fordobl(a);
Console.WriteLine(a);
Console.WriteLine(b);`,
        output: "4\n8",
        fordi: "Metoden arbejder på en kopi, så `a` er stadig 4. Det fordoblede tal kommer ud gennem `return` og gemmes i `b`." },
      { t: "ide", h: "En prisberegner",
        md: "Lav et Console-projekt, `Prisberegner`. Læg mærke til arbejdsdelingen: metoderne **regner og returnerer**, og kun den øverste kode **skriver ud**.",
        kode: R`decimal pris = 200m;
int antal = 3;

decimal uden = Total(pris, antal);
decimal med = MedMoms(uden);

Console.WriteLine($"Uden moms: {uden} kr.");
Console.WriteLine($"Med moms:  {med} kr.");

static decimal Total(decimal pris, int antal)
{
    return pris * antal;
}

static decimal MedMoms(decimal beloeb)
{
    return beloeb * 1.25m;
}`,
        output: "Uden moms: 600 kr.\nMed moms:  750,00 kr.",
        md2: "Udvid selv: skriv en metode `Rabat(decimal beloeb, int procent)`, der returnerer beløbet efter rabat, og brug den." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på en parameter og et argument — og hvad gør `return`?",
        svar: "En **parameter** er variablen i metodens definition, der tager imod en værdi, fx `int alder`. Et **argument** er den konkrete værdi, man sender med, når man kalder metoden, fx `25`. `return` **afslutter metoden og sender en værdi tilbage** til det sted, hvor metoden blev kaldt. Typen på værdien skal passe med metodens **returtype**.",
        noegle: ["parameter", "argument", "kald", "tilbage", "returtype"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m03l3", titel: "Arrays: mange værdier i én variabel", min: 16,
    ord: [
      ["Array", "En række af værdier af samme type, gemt i én variabel. Størrelsen ligger fast, når arrayet er lavet."],
      ["Element", "Én af værdierne i et array."],
      ["Indeks", "Elementets plads i arrayet. Det første element har indeks 0."],
      ["Length", "Antallet af elementer i arrayet."],
      ["IndexOutOfRangeException", "Fejlen, man får, når man bruger et indeks, der ikke findes i arrayet."],
      ["new", "Ordet, der opretter noget nyt i hukommelsen — her et array."],
      ["Standardværdi", "Den værdi, et element har, før du selv har lagt noget i: 0 for tal, false for bool."]
    ],
    trin: [
      { t: "laes", h: "Problemet med mange variabler",
        md: "Du skal gemme fem karakterer. Fem variabler — `karakter1`, `karakter2` … — er til at leve med. Men hvad med 30? Eller 1000?\n\nLøsningen er et **array**: én variabel, der indeholder en **hel række** af værdier af samme type. Hver værdi hedder et **element**.",
        kode: R`int[] karakterer = { 7, 10, 4, 12, 7 };
Console.WriteLine(karakterer[0]);
Console.WriteLine(karakterer[3]);`,
        noter: [
          ["int[]", "Firkantede klammer efter typen betyder \"et array af int\"."],
          ["{ 7, 10, 4, 12, 7 }", "Værdierne i tuborgklammer, adskilt af komma."],
          ["karakterer[0]", "Hent elementet på plads 0 — det **første**."],
          ["karakterer[3]", "Elementet på plads 3 — det **fjerde**."]
        ],
        output: "7\n12",
        md2: "Pladsnummeret hedder et **indeks**. Og her kommer det, alle skal vænne sig til: **indeks starter ved 0**. Et array med fem elementer har pladserne 0, 1, 2, 3 og 4." },
      { t: "forudsig",
        kode: R`string[] dage = { "man", "tirs", "ons", "tors", "fre" };
Console.WriteLine(dage[1]);
Console.WriteLine(dage[4]);
Console.WriteLine(dage.Length);`,
        output: "tirs\nfre\n5",
        fordi: "Indeks 1 er det **andet** element. Indeks 4 er det femte og sidste. `Length` er antallet af elementer: 5. Det sidste indeks er altså altid `Length - 1`." },
      { t: "valg", q: "Et array har 10 elementer. Hvad er indekset på det sidste?",
        svar: ["9", "10", "11", "1"],
        ret: 0, fordi: "Der tælles fra 0, så de 10 pladser hedder 0 til 9. Sidste indeks er `Length - 1`." },
      { t: "laes", h: "Skift et element ud",
        md: "Et element opfører sig som en almindelig variabel. Du kan læse det, og du kan give det en ny værdi.",
        kode: R`int[] point = { 10, 20, 30 };
point[1] = 99;
point[2] += 5;
Console.WriteLine($"{point[0]} {point[1]} {point[2]}");`,
        output: "10 99 35" },
      { t: "laes", h: "Et tomt array med plads til noget",
        md: "Kender du ikke værdierne endnu, laver du et array med et bestemt **antal pladser**. Det gøres med ordet `new`. Alle pladser starter med en **standardværdi** — for tal er det 0.",
        kode: R`int[] tal = new int[3];
Console.WriteLine(tal[0]);
tal[0] = 5;
tal[2] = 8;
Console.WriteLine($"{tal[0]} {tal[1]} {tal[2]}");`,
        noter: [
          ["new int[3]", "Lav et nyt array med plads til 3 heltal."]
        ],
        output: "0\n5 0 8",
        md2: "Størrelsen ligger **fast**. Et array med 3 pladser kan aldrig få en fjerde. Skal antallet kunne vokse, bruger man en `List` — den lærer du i modul 6." },
      { t: "udfyld", q: "Lav et array med plads til 4 tekster, og læg et navn på den første plads.",
        kode: R`string[] navne = [[new]] string[[[4]]];
navne[[[0]]] = "Anna";
Console.WriteLine(navne[0]);
Console.WriteLine(navne.Length);`,
        output: "Anna\n4",
        fordi: "`new string[4]` laver fire pladser. Den første plads har indeks 0." },
      { t: "laes", h: "Uden for arrayet",
        md: "Hvad sker der, hvis du beder om en plads, der ikke findes? Compileren opdager det ikke. Programmet **går ned, mens det kører**, med en exception:\n\n`System.IndexOutOfRangeException: Index was outside the bounds of the array.`\n\nDet er en af de mest almindelige fejl i hele programmering. Den skyldes næsten altid, at man har glemt, at indeks starter ved 0 — og derfor går én for langt.",
        kode: R`int[] tal = { 1, 2, 3 };
Console.WriteLine(tal[2]);
Console.WriteLine("Næste linje går galt:");
Console.WriteLine(tal[3]);`,
        frag: true,
        md2: "Arrayet har pladserne 0, 1 og 2. Plads 3 findes ikke, så sidste linje får programmet til at gå ned." },
      { t: "fejl", q: "Programmet oversættes fint, men går ned, når det kører. Hvilken linje er skyld i det?",
        kode: R`string[] farver = { "rød", "grøn", "blå" };
Console.WriteLine(farver[0]);
Console.WriteLine(farver[2]);
Console.WriteLine(farver[farver.Length]);`,
        linje: 4, logisk: true, fejler: true,
        fordi: "`farver.Length` er 3, men pladserne hedder 0, 1 og 2. Plads 3 findes ikke, så programmet går ned med en `IndexOutOfRangeException`. Det sidste element er `farver[farver.Length - 1]`.",
        rettet: R`string[] farver = { "rød", "grøn", "blå" };
Console.WriteLine(farver[0]);
Console.WriteLine(farver[2]);
Console.WriteLine(farver[farver.Length - 1]);`,
        rettetOutput: "rød\nblå\nblå" },
      { t: "laes", h: "Gå hele arrayet igennem med for",
        md: "Arrays og for-løkker er skabt til hinanden. Tællevariablen `i` bruges som **indeks**, og løkken kører fra 0 til lige før `Length`. Lær mønsteret udenad:",
        kode: R`int[] tal = { 5, 8, 2 };

for (int i = 0; i < tal.Length; i++)
{
    Console.WriteLine($"Plads {i}: {tal[i]}");
}`,
        output: "Plads 0: 5\nPlads 1: 8\nPlads 2: 2",
        md2: "`i < tal.Length` — **mindre end**, ikke mindre end eller lig med. Med `<=` ville løkken gå én for langt og ramme en plads, der ikke findes." },
      { t: "forudsig",
        kode: R`int[] tal = { 3, 6, 9, 12 };

for (int i = tal.Length - 1; i >= 0; i--)
{
    Console.Write(tal[i] + " ");
}`,
        output: "12 9 6 3",
        fordi: "Løkken starter på det **sidste** indeks (`Length - 1`, altså 3) og tæller ned til 0. Arrayet bliver skrevet baglæns." },
      { t: "skriv", q: "Lav et `int`-array, der hedder `tal`, med værdierne 4, 8 og 15. Skriv derefter det **første** og det **sidste** element ud med hver sin `Console.WriteLine`.",
        tjek: [
          [/int\[\]tal=(new int\[\]|new\[\])?\{4,8,15\};|int\[\]tal=\[4,8,15\];/, "Lav arrayet: `int[] tal = { 4, 8, 15 };`"],
          ["Console.WriteLine(tal[0]);", "Det første element er `tal[0]`"],
          [/Console\.WriteLine\(tal\[(2|tal\.Length-1|\^1)\]\);/, "Det sidste element er `tal[2]` (eller `tal[tal.Length - 1]`)"]
        ],
        forkert: ["int[] tal = { 4, 8, 15 };\nConsole.WriteLine(tal[1]);\nConsole.WriteLine(tal[3]);"],
        loesning: R`int[] tal = { 4, 8, 15 };
Console.WriteLine(tal[0]);
Console.WriteLine(tal[2]);`,
        output: "4\n15" },
      { t: "ide", h: "Ugens temperaturer",
        md: "Lav et Console-projekt, `Temperaturer`. Programmet har et array med syv temperaturer og et med syv ugedage. Løkken bruger det **samme indeks** i begge arrays.",
        kode: R`string[] dage = { "Man", "Tirs", "Ons", "Tors", "Fre", "Lør", "Søn" };
double[] grader = { 12.5, 14.0, 9.5, 11.0, 15.5, 17.0, 13.5 };

for (int i = 0; i < dage.Length; i++)
{
    Console.WriteLine($"{dage[i]}: {grader[i]} grader");
}`,
        output: "Man: 12,5 grader\nTirs: 14 grader\nOns: 9,5 grader\nTors: 11 grader\nFre: 15,5 grader\nLør: 17 grader\nSøn: 13,5 grader",
        md2: "Prøv med vilje at rette `i < dage.Length` til `i <= dage.Length`. Kør, og læs fejlen. Ret det tilbage igen." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er et array, og hvorfor giver `tal[tal.Length]` en fejl?",
        svar: "Et array er **én variabel med en række værdier af samme type**. Hvert element har et **indeks**, der starter ved **0**. Derfor er det sidste indeks `Length - 1`. `tal[tal.Length]` peger på pladsen lige **efter** den sidste, og den findes ikke — så programmet går ned med en `IndexOutOfRangeException`.",
        noegle: ["samme type", "indeks", "0", "Length - 1", "IndexOutOfRange"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m03l4", titel: "foreach og de klassiske algoritmer", min: 18,
    ord: [
      ["foreach", "En løkke, der giver dig ét element ad gangen fra en samling — uden at du skal holde styr på et indeks."],
      ["Algoritme", "En opskrift: en række præcise trin, der løser et problem."],
      ["Akkumulator", "En variabel, der samler et resultat op gennem en løkke, fx en sum."],
      ["Lineær søgning", "At lede efter en værdi ved at se på ét element ad gangen fra start til slut."]
    ],
    trin: [
      { t: "laes", h: "foreach: for hvert element",
        md: "Tit er du ligeglad med indekset. Du vil bare have fat i **hvert element efter tur**. Det er `foreach` lavet til. Den er kortere, og du kan ikke komme til at gå uden for arrayet.",
        kode: R`string[] navne = { "Anna", "Bo", "Carl" };

foreach (string navn in navne)
{
    Console.WriteLine($"Hej {navn}");
}`,
        noter: [
          ["foreach (string navn in navne)", "\"For hvert navn i navne\": i hver omgang lægges det næste element i variablen navn."]
        ],
        output: "Hej Anna\nHej Bo\nHej Carl",
        md2: "Skik: arrayet får et navn i **flertal** (`navne`), og variablen i løkken får det samme i **ental** (`navn`). Så læser linjen næsten som dansk." },
      { t: "udfyld", q: "Udfyld løkken, så hver pris bliver skrevet ud.",
        kode: R`int[] priser = { 25, 40, 15 };

[[foreach]] (int pris [[in]] priser)
{
    Console.WriteLine(pris);
}`,
        output: "25\n40\n15",
        fordi: "`foreach (type navn in samling)`." },
      { t: "valg", q: "Hvornår er du nødt til at bruge `for` i stedet for `foreach`?",
        svar: ["Når jeg har brug for indekset — fx for at ændre elementerne eller vise pladsnummeret", "Når arrayet indeholder tekst", "Når arrayet har mere end 10 elementer", "Aldrig — foreach kan det hele"],
        ret: 0, fordi: "`foreach` giver dig kun værdien, ikke pladsen. Skal du **ændre** et element (`tal[i] = …`), bruge **to arrays** med samme indeks eller gå **baglæns**, skal du bruge `for`." },
      { t: "laes", h: "Algoritme 1: læg sammen",
        md: "En **algoritme** er en opskrift: præcise trin, der løser et problem. De næste fire er så almindelige, at du skal kunne dem i søvne — og de bliver tit spurgt til ved eksamen.\n\n**Sum:** lav en variabel til resultatet, start på 0, og læg hvert element til.",
        kode: R`int[] tal = { 4, 7, 9 };
int sum = 0;

foreach (int t in tal)
{
    sum += t;
}
Console.WriteLine(sum);`,
        output: "20",
        md2: "Variablen `sum`, der samler resultatet op, kaldes en **akkumulator**." },
      { t: "skriv", q: "Arrayet er lavet. Regn summen af alle tallene ud i en `int`, der hedder `sum`, med en `foreach`-løkke. (Udskriften er skrevet for dig.)",
        foer: R`int[] point = { 10, 20, 30, 40 };`,
        efter: R`Console.WriteLine(sum);`,
        tjek: [
          ["int sum = 0;", "Start med `int sum = 0;` **før** løkken"],
          [/foreach\((int|var) \w+ in point\)/, "Gennemløb arrayet: `foreach (int p in point)`"],
          [/sum\+=\w+;|sum=sum\+\w+;/, "Læg hvert element til: `sum += p;`"]
        ],
        loesning: R`int sum = 0;
foreach (int p in point)
{
    sum += p;
}`,
        output: "100" },
      { t: "laes", h: "Algoritme 2: gennemsnit",
        md: "Gennemsnittet er summen divideret med antallet. Husk fælden fra modul 1: `int` divideret med `int` smider kommaet væk. Derfor laves summen som en `double`.",
        kode: R`int[] karakterer = { 7, 10, 4, 12 };
double sum = 0;

foreach (int k in karakterer)
{
    sum += k;
}
double snit = sum / karakterer.Length;
Console.WriteLine(snit);`,
        output: "8,25" },
      { t: "laes", h: "Algoritme 3: find den største",
        md: "**Største værdi:** antag, at det første element er det største. Gå resten igennem — og hver gang du møder et, der er større, så husk det i stedet.",
        kode: R`int[] tal = { 4, 17, 9, 12 };
int stoerst = tal[0];

foreach (int t in tal)
{
    if (t > stoerst)
    {
        stoerst = t;
    }
}
Console.WriteLine(stoerst);`,
        output: "17",
        md2: "Hvorfor starte med `tal[0]` og ikke med 0? Fordi alle tallene kunne være negative — så ville 0 fejlagtigt vinde." },
      { t: "forudsig",
        kode: R`int[] tal = { 8, 3, 11, 5 };
int resultat = tal[0];

foreach (int t in tal)
{
    if (t < resultat)
    {
        resultat = t;
    }
}
Console.WriteLine(resultat);`,
        output: "3",
        fordi: "Det er samme algoritme med `<` i stedet for `>`. Så finder den den **mindste** værdi." },
      { t: "laes", h: "Algoritme 4: tæl og søg",
        md: "**Tæl:** en tæller, der starter på 0 og går én op, hver gang et element opfylder betingelsen.\n\n**Søg:** gå elementerne igennem ét ad gangen, til du finder det, du leder efter. Det hedder **lineær søgning**.",
        kode: R`int[] karakterer = { 7, 2, 10, 0, 12, 4 };
int bestaaet = 0;

foreach (int k in karakterer)
{
    if (k >= 2)
    {
        bestaaet++;
    }
}
Console.WriteLine($"{bestaaet} har bestået");

bool fundet = false;
foreach (int k in karakterer)
{
    if (k == 12)
    {
        fundet = true;
        break;
    }
}
Console.WriteLine(fundet);`,
        output: "5 har bestået\nTrue",
        md2: "`break` stopper søgningen, så snart værdien er fundet. Der er ingen grund til at lede videre." },
      { t: "orden", q: "Sæt linjerne i rækkefølge, så programmet tæller, hvor mange tal der er større end 10.", alt: [[1, 0, 2, 3, 4, 5, 6, 7, 8, 9]],
        linjer: ["int[] tal = { 5, 12, 20, 8 };", "int antal = 0;", "foreach (int t in tal)", "{", "    if (t > 10)", "    {", "        antal++;", "    }", "}", "Console.WriteLine(antal);"],
        output: "2",
        fordi: "Arrayet og tælleren laves først. Løkken gennemgår alle tal, og `if` vælger dem, der skal tælles. Udskriften står efter løkken." },
      { t: "laes", h: "Arrays og metoder sammen",
        md: "Et array kan sendes ind i en metode som parameter — og algoritmen kan pakkes ind, så den kan bruges igen på et hvilket som helst array.",
        kode: R`static int Sum(int[] tal)
{
    int sum = 0;
    foreach (int t in tal)
    {
        sum += t;
    }
    return sum;
}

int[] uge1 = { 3, 5, 2 };
int[] uge2 = { 10, 10 };
Console.WriteLine(Sum(uge1));
Console.WriteLine(Sum(uge2));`,
        output: "10\n20" },
      { t: "skriv", q: "Skriv en metode, der hedder `Stoerste`. Den tager et `int[]`, der hedder `tal`, og returnerer den **største** værdi i arrayet. (Koden nedenunder kalder din metode.)",
        efter: R`Console.WriteLine(Stoerste(new int[] { 4, 19, 7 }));`,
        tjek: [
          [/static int Stoerste\(int\[\]tal\)\{/, "Signaturen: `static int Stoerste(int[] tal)`"],
          [/=tal\[0\];/, "Start med at antage, at det første element er det største: `int stoerst = tal[0];`"],
          [/foreach\(|for\(/, "Gå arrayet igennem med en løkke"],
          [/if\(\w+(\[\w+\])?>\w+\)/, "Sammenlign hvert element med det største indtil nu"],
          [/return \w+;/, "Returnér resultatet"]
        ],
        loesning: R`static int Stoerste(int[] tal)
{
    int stoerst = tal[0];
    foreach (int t in tal)
    {
        if (t > stoerst)
        {
            stoerst = t;
        }
    }
    return stoerst;
}`,
        output: "19" },
      { t: "ide", h: "Karakterstatistik",
        md: "Lav et Console-projekt, `Karakterer`. Det her er det største program, du har skrevet indtil nu — men det består kun af byggesten, du kender. Skriv én metode ad gangen, og kør programmet efter hver.",
        kode: R`int[] karakterer = { 7, 10, 4, 12, 2, 7, 10 };

Console.WriteLine($"Antal:       {karakterer.Length}");
Console.WriteLine($"Gennemsnit:  {Gennemsnit(karakterer)}");
Console.WriteLine($"Højeste:     {Stoerste(karakterer)}");
Console.WriteLine($"Antal 10+:   {AntalMindst(karakterer, 10)}");

static double Gennemsnit(int[] tal)
{
    double sum = 0;
    foreach (int t in tal)
    {
        sum += t;
    }
    return sum / tal.Length;
}

static int Stoerste(int[] tal)
{
    int stoerst = tal[0];
    foreach (int t in tal)
    {
        if (t > stoerst)
        {
            stoerst = t;
        }
    }
    return stoerst;
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
}`,
        output: "Antal:       7\nGennemsnit:  7,428571428571429\nHøjeste:     12\nAntal 10+:   3",
        md2: "Udvid selv: skriv metoden `Mindste`, og vis den laveste karakter. Gennemsnittet har mange decimaler — skriv `{Gennemsnit(karakterer):F1}` i stedet, så vises der kun én." },
      { t: "forklar", q: "Forklar med dine egne ord, hvordan man finder det største tal i et array.",
        svar: "Jeg laver en variabel og **antager, at det første element er det største**. Så går jeg **alle elementerne igennem med en løkke**. Hver gang jeg møder et element, der er **større** end det, jeg husker, gemmer jeg det i stedet. Når løkken er færdig, indeholder variablen det største tal.",
        noegle: ["første element", "løkke", "større", "gemmer"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m03l5", titel: "Mere med tekst — og metoder med samme navn", min: 16,
    ord: [
      ["Split", "Deler en tekst op i et array af mindre tekster ved et bestemt tegn."],
      ["Join", "Det modsatte af Split: samler et array til én tekst med et tegn imellem."],
      ["Substring", "Klipper et stykke ud af en tekst."],
      ["Trim", "Fjerner mellemrum i begyndelsen og slutningen af en tekst."],
      ["Overloading", "Flere metoder med samme navn, men forskellige parametre. Compileren vælger den, der passer til argumenterne."],
      ["Valgfri parameter", "En parameter med en standardværdi. Udelader man argumentet, bruges standardværdien."],
      ["Immutable", "Kan ikke ændres. En string er immutable: metoderne giver en ny tekst og ændrer ikke den gamle."]
    ],
    trin: [
      { t: "laes", h: "En tekst er en række af tegn",
        md: "En `string` minder om et array af tegn. Du kan hente ét tegn med et indeks — som starter ved 0 — og du kan gå teksten igennem med `foreach`.",
        kode: R`string ord = "Kode";
Console.WriteLine(ord[0]);
Console.WriteLine(ord[ord.Length - 1]);

foreach (char tegn in ord)
{
    Console.Write(tegn + "-");
}`,
        output: "K\ne\nK-o-d-e-",
        md2: "Hvert tegn har typen `char`, som du mødte i modul 1." },
      { t: "forudsig",
        kode: R`string navn = "Peter";
int antal = 0;

foreach (char c in navn)
{
    if (c == 'e')
    {
        antal++;
    }
}
Console.WriteLine(antal);`,
        output: "2",
        fordi: "Programmet tæller, hvor mange gange bogstavet `e` optræder i `Peter`. Et enkelt tegn skrives i enkelte anførselstegn: `'e'`." },
      { t: "laes", h: "De metoder, du får mest brug for",
        md: "En string har en masse indbyggede metoder. Her er dem, du møder igen og igen — især når du skal tjekke det, en bruger har skrevet i en formular.",
        kode: R`string tekst = "  Hej verden  ";
string ren = tekst.Trim();

Console.WriteLine(ren);
Console.WriteLine(ren.Contains("verden"));
Console.WriteLine(ren.StartsWith("Hej"));
Console.WriteLine(ren.Replace("verden", "Peter"));
Console.WriteLine(ren.Substring(0, 3));
Console.WriteLine(ren.IndexOf("v"));`,
        noter: [
          [".Trim()", "Fjerner mellemrum for og bag."],
          [".Contains(\"…\")", "Er teksten indeholdt? Giver true/false."],
          [".StartsWith(\"…\")", "Starter teksten med …? Der findes også EndsWith."],
          [".Replace(a, b)", "Erstatter alle a med b."],
          [".Substring(0, 3)", "Klipper 3 tegn ud fra indeks 0."],
          [".IndexOf(\"v\")", "På hvilket indeks står v? Giver -1, hvis det ikke findes."]
        ],
        output: "Hej verden\nTrue\nTrue\nHej Peter\nHej\n4" },
      { t: "forudsig",
        kode: R`string mail = "Peter@Mail.DK";
string lille = mail.ToLower();
Console.WriteLine(lille);
Console.WriteLine(lille.Contains("@"));
Console.WriteLine(lille.EndsWith(".com"));
Console.WriteLine(mail);`,
        output: "peter@mail.dk\nTrue\nFalse\nPeter@Mail.DK",
        fordi: "`ToLower()` giver en **ny** tekst med små bogstaver. Den oprindelige variabel `mail` er uændret — en string kan ikke ændres, når den først er lavet. Det hedder, at den er **immutable**." },
      { t: "fejl", q: "Programmet skulle skrive `HEJ`, men skriver `hej`. Hvilken linje er forkert?",
        kode: R`string ord = "hej";
ord.ToUpper();
Console.WriteLine(ord);`,
        linje: 2, logisk: true, output: "hej",
        fordi: "`ToUpper()` ændrer ikke `ord`. Den **returnerer en ny tekst**, og her bliver den nye tekst ikke gemt noget sted. Resultatet skal lægges tilbage i variablen.",
        rettet: R`string ord = "hej";
ord = ord.ToUpper();
Console.WriteLine(ord);`,
        rettetOutput: "HEJ" },
      { t: "laes", h: "Split og Join",
        md: "`Split` deler en tekst op i et **array** af stykker. Du fortæller, hvilket tegn der skal deles ved. `string.Join` gør det modsatte: samler et array til én tekst.",
        kode: R`string linje = "æble,pære,banan";
string[] frugter = linje.Split(',');

Console.WriteLine(frugter.Length);
Console.WriteLine(frugter[1]);
Console.WriteLine(string.Join(" og ", frugter));`,
        output: "3\npære\næble og pære og banan",
        md2: "`Split` er guld værd, når du læser data fra en fil, hvor værdierne er adskilt af komma eller semikolon. Det kommer du til i modul 9." },
      { t: "skriv", q: "Variablen `navn` er lavet. Del teksten ved mellemrummet med `Split(' ')` og gem resultatet i et `string[]`, der hedder `dele`. Skriv derefter efternavnet (det andet stykke) ud.",
        foer: R`string navn = "Peter Hansen";`,
        tjek: [
          [/string\[\]dele=navn\.Split\((' '|" ")\);/, "Del teksten: `string[] dele = navn.Split(' ');`"],
          ["Console.WriteLine(dele[1]);", "Efternavnet er det andet stykke: `dele[1]`"]
        ],
        loesning: R`string[] dele = navn.Split(' ');
Console.WriteLine(dele[1]);`,
        output: "Hansen" },
      { t: "laes", h: "Overloading: samme navn, forskellige parametre",
        md: "To metoder må gerne hedde det samme, hvis de har **forskellige parametre**. Det hedder **overloading**. Compileren kigger på argumenterne i kaldet og vælger den metode, der passer.\n\nDu har brugt det længe uden at vide det: `Console.WriteLine` findes i mange udgaver — én til tekst, én til heltal, én til kommatal …",
        kode: R`class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine(Areal(4));
        Console.WriteLine(Areal(4, 5));
    }

    static int Areal(int side)
    {
        return side * side;
    }

    static int Areal(int bredde, int hoejde)
    {
        return bredde * hoejde;
    }
}`,
        output: "16\n20",
        md2: "Ét argument → den første metode. To argumenter → den anden.\n\nVigtigt: overloading virker kun for metoder, der ligger **i en klasse** — derfor er skelettet med her. Skriver du to metoder med samme navn i den korte skrivemåde uden klasse, siger compileren, at navnet allerede er brugt." },
      { t: "valg", q: "Hvilket par af metoder er lovlig overloading?",
        svar: ["`void Vis(int tal)` og `void Vis(string tekst)`", "`void Vis(int tal)` og `int Vis(int tal)`", "`void Vis(int a)` og `void Vis(int b)`", "`void Vis()` og `void vis()`"],
        ret: 0, fordi: "Parametrenes **typer eller antal** skal være forskellige. Det er ikke nok, at returtypen er forskellig, eller at parametrene bare hedder noget andet — så kan compileren ikke se, hvilken du mener. (`Vis` og `vis` er to helt forskellige navne, ikke overloading.)" },
      { t: "laes", h: "Valgfri parametre",
        md: "Du kan give en parameter en **standardværdi**. Så bliver den **valgfri**: udelader man argumentet, bruges standardværdien.",
        kode: R`static void Hils(string navn, string hilsen = "Hej")
{
    Console.WriteLine($"{hilsen} {navn}");
}

Hils("Peter");
Hils("Anna", "Godmorgen");`,
        output: "Hej Peter\nGodmorgen Anna",
        md2: "De valgfri parametre skal stå **sidst** i parentesen." },
      { t: "forudsig",
        kode: R`static int Pris(int stykpris, int antal = 1)
{
    return stykpris * antal;
}

Console.WriteLine(Pris(50));
Console.WriteLine(Pris(50, 3));`,
        output: "50\n150",
        fordi: "I det første kald mangler `antal`, så standardværdien 1 bruges. I det andet kald er `antal` 3." },
      { t: "ide", h: "Rens et brugernavn",
        md: "Lav et Console-projekt, `Brugernavn`. Programmet tager imod et navn, renser det og laver et brugernavn. Prøv at skrive `  Peter Hansen  ` med mellemrum for og bag.",
        kode: R`Console.Write("Skriv dit fulde navn: ");
string navn = Console.ReadLine().Trim();

if (!navn.Contains(' '))
{
    Console.WriteLine("Skriv både fornavn og efternavn.");
}
else
{
    string[] dele = navn.ToLower().Split(' ');
    string brugernavn = dele[0].Substring(0, 1) + dele[dele.Length - 1];
    Console.WriteLine($"Dit brugernavn er: {brugernavn}");
}`,
        md2: "Skriver du `Peter Hansen`, bliver brugernavnet `phansen`: første bogstav i fornavnet plus efternavnet. Læg mærke til, hvordan metoderne kan sættes i kæde: `navn.ToLower().Split(' ')`." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er method overloading?",
        svar: "Overloading er, når **flere metoder har samme navn**, men **forskellige parametre** — enten forskelligt antal eller forskellige typer. Compileren vælger den rigtige ud fra de **argumenter**, man kalder med. Det gør koden lettere at bruge, fordi man ikke skal huske forskellige navne for det samme. `Console.WriteLine` er et eksempel.",
        noegle: ["samme navn", "forskellige parametre", "argumenter", "compileren vælger"] }
    ] }
  ]
});
})();
