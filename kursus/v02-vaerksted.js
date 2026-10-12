// Værksted til modul 2 — Valg og løkker.
(function () {
const R = String.raw;
var m = window.KURSUS.filter(function (x) { return x.id === "m02"; })[0];
if (!m) return;
m.lektioner.push({ id: "m02v", titel: "Værksted: valg og løkker", vaerksted: true, min: 60, ord: [], trin: [

  { t: "laes", h: "Sådan arbejder du i værkstedet",
    md: "Nu skal du skrive **hele programmer selv** i {{Visual Studio||Rider}}. Siden giver dig opgaven, kravene og det, programmet skal skrive. Resten er dit.\n\nOpgaverne bliver sværere hen ad vejen. Den første er let — den er til at komme i gang. Den sidste samler hele modulet: `if`/`else if`/`else`, `&&` og `||`, `switch`, `while`, `for`, `continue` og `break`.\n\nLav et nyt Console-projekt til hver opgave. Navnet står ved opgaven.",
    noter: [
      ["Skriv selv", "Skriv koden med dine egne fingre. Kopiér ikke fra modulet. Det er skrivningen, der får det til at sidde."],
      ["Kør tit", "Kør programmet efter hver lille ændring. Så ved du præcis, hvilken linje der lavede en fejl."],
      ["Brug debuggeren", "Gør programmet noget andet, end du regnede med, så sæt et **breakpoint** og gå ét skridt ad gangen. Se værdierne i {{**Locals**||**Threads & Variables**}} i stedet for at gætte. Det er især nyttigt i løkker: du kan se tællevariablen skifte for hver omgang."],
      ["Uendelig løkke", "Bliver programmet ved og ved, så stop det: {{klik i det sorte vindue og tryk **Ctrl + C**||klik på den **røde firkant ■** (Stop)}}. Find så den linje, der skulle gøre betingelsen falsk."],
      ["Tips før løsning", "Sidder du fast, så åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af, i stedet for at kopiere."],
      ["Sammenlign", "Når programmet kører, kopierer du det, det skrev, ind på siden. Så tjekker siden, om det passer tegn for tegn."]
    ] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Lige og ulige", projekt: "LigeUlige",
    md: "Programmet skal gå tallene fra 1 til 6 igennem og sige om hvert tal, om det er lige eller ulige.\n\nEt tal er **lige**, når resten ved division med 2 er 0. Resten får du med `%`: `4 % 2` er 0, og `5 % 2` er 1.",
    krav: [
      "Brug en `for`-løkke, der tæller fra 1 til og med 6",
      "Er tallet lige, skrives `{tal} er lige`",
      "Ellers skrives `{tal} er ulige`",
      "Til sidst, efter løkken, skrives `Færdig`"
    ],
    tip: [
      "Start med løkken alene: `for (int i = 1; i <= 6; i++)` med en `Console.WriteLine(i);` indeni. Kør den, så du ser tallene 1–6.",
      "Inde i løkken skal der stå en `if` med betingelsen `i % 2 == 0` og en `else`.",
      "`Console.WriteLine($\"{i} er lige\");` i if-blokken og `Console.WriteLine($\"{i} er ulige\");` i else-blokken. `Færdig` skrives efter løkkens lukkende klamme."
    ],
    output: "1 er ulige\n2 er lige\n3 er ulige\n4 er lige\n5 er ulige\n6 er lige\nFærdig",
    loesning: R`for (int i = 1; i <= 6; i++)
{
    if (i % 2 == 0)
    {
        Console.WriteLine($"{i} er lige");
    }
    else
    {
        Console.WriteLine($"{i} er ulige");
    }
}
Console.WriteLine("Færdig");`,
    ekstra: ["Skriv if/else-delen om til én linje med den ternære operator: `string slags = i % 2 == 0 ? \"lige\" : \"ulige\";`. Programmet skal skrive præcis det samme.", "Lad løkken tælle **nedad** fra 6 til 1 i stedet."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "FizzBuzz", projekt: "FizzBuzz",
    md: "FizzBuzz er en klassisk opgave, som mange får til jobsamtaler. Programmet går tallene fra 1 til 15 igennem. Nogle tal skal skiftes ud med et ord:\n\n- Går **både** 3 og 5 op i tallet, skrives `FizzBuzz`.\n- Går kun 3 op i tallet, skrives `Fizz`.\n- Går kun 5 op i tallet, skrives `Buzz`.\n- Ellers skrives selve tallet.\n\n\"3 går op i tallet\" betyder, at resten ved division med 3 er 0: `tal % 3 == 0`.\n\nPas på rækkefølgen. I en `else if`-kæde **vinder den første betingelse, der er sand**, og resten springes over.",
    krav: [
      "Brug en `for`-løkke fra 1 til og med 15",
      "Tal, som både 3 og 5 går op i, skrives som `FizzBuzz`",
      "Tal, som kun 3 går op i, skrives som `Fizz`",
      "Tal, som kun 5 går op i, skrives som `Buzz`",
      "Alle andre tal skrives som tallet selv",
      "Ét ord eller tal pr. linje"
    ],
    tip: [
      "Brug én `if`, to `else if` og én `else` inde i løkken.",
      "Tjek \"både 3 og 5\" **først**. Stod `i % 3 == 0` først, ville 15 blive til `Fizz`, fordi den første sande betingelse vinder.",
      "Første betingelse: `if (i % 3 == 0 && i % 5 == 0)`. Derefter `else if (i % 3 == 0)`, så `else if (i % 5 == 0)` og til sidst `else { Console.WriteLine(i); }`."
    ],
    output: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
    loesning: R`for (int i = 1; i <= 15; i++)
{
    if (i % 3 == 0 && i % 5 == 0)
    {
        Console.WriteLine("FizzBuzz");
    }
    else if (i % 3 == 0)
    {
        Console.WriteLine("Fizz");
    }
    else if (i % 5 == 0)
    {
        Console.WriteLine("Buzz");
    }
    else
    {
        Console.WriteLine(i);
    }
}`,
    ekstra: ["Flyt `FizzBuzz`-betingelsen ned som den sidste `else if`. Kør, og se, hvad der sker med 15. Forklar for dig selv hvorfor. Ret det tilbage.", "Tæl undervejs, hvor mange gange der blev skrevet `Fizz`, og skriv `Fizz: 4` til sidst."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Fejlfinding: karakterprogrammet", projekt: "Karakterer",
    md: "Programmet nedenfor går fire pointtal igennem — 40, 60, 80 og 100 — og giver hvert en vurdering:\n\n- mindst 90 point: `Fremragende`\n- mindst 70 point: `Godt`\n- mindst 50 point: `Bestået`\n- under 50 point: `Ikke bestået`\n\nMen 80 og 100 point får begge kun `Bestået`. Programmet kan oversættes, så compileren hjælper dig ikke. Find fejlen **med debuggeren**, ikke ved at gætte:\n\n1. Kopiér koden ind i Program.cs, og kør den. Se den forkerte udskrift.\n2. Sæt et **breakpoint** på den første linje med `if (point >= 50)` (klik i den grå kant til venstre for linjen).\n3. Start med debuggeren ({{**F5**||den **grønne bille** 🐞}}). Programmet stopper første gang, linjen nås. Se på `point` i {{**Locals**||**Threads & Variables**}}: den er 40.\n4. Fortsæt ({{**F5**||den grønne pil **Resume**}}), indtil `point` er **80**.\n5. Gå nu ét skridt ad gangen med {{**F10** (Step Over)||knappen **Step Over**}}. Hvilken linje bliver markeret? Hvilken værdi får `vurdering`?",
    krav: [
      "Find ud af, hvorfor 80 og 100 point aldrig når frem til `Godt` og `Fremragende`",
      "Ret fejlen ved at flytte rundt på betingelserne. Tallene 50, 70 og 90 må ikke ændres",
      "Programmet skriver de fire vurderinger rigtigt og til sidst `Bestået: 3`"
    ],
    start: R`int bestaaet = 0;

for (int point = 40; point <= 100; point += 20)
{
    string vurdering;
    if (point >= 50)
    {
        vurdering = "Bestået";
    }
    else if (point >= 70)
    {
        vurdering = "Godt";
    }
    else if (point >= 90)
    {
        vurdering = "Fremragende";
    }
    else
    {
        vurdering = "Ikke bestået";
    }

    if (point >= 50)
    {
        bestaaet++;
    }
    Console.WriteLine($"{point} point: {vurdering}");
}
Console.WriteLine($"Bestået: {bestaaet}");`,
    startOutput: "40 point: Ikke bestået\n60 point: Bestået\n80 point: Bestået\n100 point: Bestået\nBestået: 3",
    tip: [
      "Da `point` var 80, sprang debuggeren direkte ind i den **første** blok. Er 80 ≥ 50? Ja. Hvad sker der så med resten af `else if`-kæden?",
      "I en `else if`-kæde vinder den **første** sande betingelse. Alt, der er 70 eller derover, er også 50 eller derover — så `point >= 50` fanger dem, før de når frem til `Godt`.",
      "Sæt den **strengeste** betingelse først: `if (point >= 90)` → `Fremragende`, så `else if (point >= 70)` → `Godt`, så `else if (point >= 50)` → `Bestået`, og til sidst `else`."
    ],
    output: "40 point: Ikke bestået\n60 point: Bestået\n80 point: Godt\n100 point: Fremragende\nBestået: 3",
    loesning: R`int bestaaet = 0;

for (int point = 40; point <= 100; point += 20)
{
    string vurdering;
    if (point >= 90)
    {
        vurdering = "Fremragende";
    }
    else if (point >= 70)
    {
        vurdering = "Godt";
    }
    else if (point >= 50)
    {
        vurdering = "Bestået";
    }
    else
    {
        vurdering = "Ikke bestået";
    }

    if (point >= 50)
    {
        bestaaet++;
    }
    Console.WriteLine($"{point} point: {vurdering}");
}
Console.WriteLine($"Bestået: {bestaaet}");`,
    ekstra: ["Skriv kæden om, så den går **nedefra**: `if (point < 50)`, `else if (point < 70)` osv. Det virker også — hvis rækkefølgen passer. Hvorfor?", "Lav løkken om, så den tager pointtallene 45, 55, 65 … 95 (start og spring). Passer vurderingerne stadig?"] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Cifrene i et tal", projekt: "Cifre",
    md: "Programmet skal pille et tal fra hinanden — ét ciffer ad gangen, bagfra. Det bruger to regnetricks, du kender fra modul 1:\n\n- `tal % 10` giver det **sidste ciffer**: `47291 % 10` er 1.\n- `tal / 10` med heltal **fjerner det sidste ciffer**: `47291 / 10` er 4729.\n\nGentager du de to ting, indtil tallet er 0, har du været forbi alle cifrene. Du ved ikke på forhånd, hvor mange cifre der er, så det er en opgave for `while`.",
    krav: [
      "Variablen `tal` er en `int` med værdien 47291",
      "Første linje er `Tallet: 47291`",
      "Programmet tæller cifrene og skriver `Antal cifre: …`",
      "Programmet lægger cifrene sammen (tværsummen) og skriver `Tværsum: …`",
      "Programmet bygger tallet baglæns og skriver `Baglæns: …`",
      "Brug en `while`-løkke, der kører, så længe tallet er større end 0"
    ],
    tip: [
      "Skriv `Tallet: …` **før** løkken. Efter løkken er `tal` blevet 0.",
      "Lav tre variabler før løkken: `antal`, `sum` og `baglaens`, alle `= 0`. I løkken: `int ciffer = tal % 10;`, så opdatér de tre, og til sidst `tal = tal / 10;`.",
      "Det baglæns tal bygges sådan: `baglaens = baglaens * 10 + ciffer;`. Gangingen med 10 rykker de cifre, der allerede er der, én plads til venstre og giver plads til det nye. Sæt et breakpoint i løkken, og se `baglaens` vokse: 1, 19, 192, 1927, 19274."
    ],
    output: "Tallet: 47291\nAntal cifre: 5\nTværsum: 23\nBaglæns: 19274",
    loesning: R`int tal = 47291;
int antal = 0;
int sum = 0;
int baglaens = 0;

Console.WriteLine($"Tallet: {tal}");

while (tal > 0)
{
    int ciffer = tal % 10;
    antal++;
    sum += ciffer;
    baglaens = baglaens * 10 + ciffer;
    tal = tal / 10;
}

Console.WriteLine($"Antal cifre: {antal}");
Console.WriteLine($"Tværsum: {sum}");
Console.WriteLine($"Baglæns: {baglaens}");`,
    ekstra: ["Skift tallet ud med 1001. Programmet bør skrive `Baglæns: 1001`. Prøv også 120 — hvorfor bliver det baglæns kun til `21`?", "Udvid: skriv til sidst `Tallet er et palindrom`, hvis tallet er det samme forfra og bagfra. (Tip: gem en kopi af tallet, før løkken ændrer det.)"] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Samlet program: kiosken", projekt: "Kiosk",
    md: "Nu samler du hele modulet i ét program. Kiosken har fem varer med numrene 1 til 5. Programmet går varenumrene igennem med en løkke, finder navn og pris med en `switch` og lægger sammen. Én vare er udsolgt og skal springes over.\n\nBagefter beregnes rabat, og til sidst betaler kunden med 50-kronesedler — én seddel ad gangen, indtil beløbet er dækket.\n\nKassens varer:\n\n- 1: Kaffe, 25 kr.\n- 2: Te, 20 kr.\n- 3: Kage, 35 kr. — **udsolgt**\n- 4: Sandwich, 55 kr.\n- 5: Juice, 30 kr.\n\nBrug `decimal` til beløb (husk `m` efter kommatal, fx `0.10m`). Udskriften bruger dansk komma. Læg mærke til, at beløbene efter rabatberegningen får **to decimaler** (`13,00`). Det sker af sig selv: et `decimal`-tal husker, hvor mange decimaler det blev regnet med, og `0.10m` har to.",
    krav: [
      "En `for`-løkke går varenumrene 1 til 5 igennem",
      "En `switch` på varenummeret giver hver vare sit navn (`string`), sin pris (`decimal`) og om den er udsolgt (`bool`)",
      "Er varen udsolgt, skrives `{navn}: udsolgt`, og resten af omgangen springes over med `continue`",
      "Ellers skrives `{navn}: {pris} kr.`, prisen lægges til totalen, og antallet af varer tælles op",
      "Efter løkken: er der købt **mindst 4 varer og** totalen er **mindst 100 kr.**, er rabatten 10 % af totalen (`total * 0.10m`). Ellers er rabatten 0",
      "Skriv `Antal varer: …`, `I alt: … kr.`, `Rabat: … kr.` og `At betale: … kr.` (total minus rabat)",
      "En `while`-løkke lægger 50 kr. til det betalte og tæller én seddel op, så længe det betalte er mindre end det, der skal betales",
      "Skriv til sidst `Sedler: {antal} x 50 kr.` og `Byttepenge: … kr.` (betalt minus at betale)"
    ],
    tip: [
      "Byg det i lag. Først `for`-løkken og `switch`'en, der bare skriver navn og pris for alle fem varer. Kør. Så `continue` for den udsolgte. Kør. Så rabatten. Kør. Så sedlerne.",
      "Lav variablerne i løkken med en startværdi, så compileren er sikker på, at de har en værdi: `string navn = \"\"; decimal pris = 0; bool udsolgt = false;`. I `switch`'en: `case 3: navn = \"Kage\"; pris = 35; udsolgt = true; break;`.",
      "Rabat: `decimal rabat = 0; if (antal >= 4 && total >= 100) { rabat = total * 0.10m; }`. Sedler: `decimal betalt = 0; int sedler = 0; while (betalt < atBetale) { betalt += 50; sedler++; }`."
    ],
    output: "Kaffe: 25 kr.\nTe: 20 kr.\nKage: udsolgt\nSandwich: 55 kr.\nJuice: 30 kr.\nAntal varer: 4\nI alt: 130 kr.\nRabat: 13,00 kr.\nAt betale: 117,00 kr.\nSedler: 3 x 50 kr.\nByttepenge: 33,00 kr.",
    loesning: R`decimal total = 0;
int antal = 0;

for (int nr = 1; nr <= 5; nr++)
{
    string navn = "";
    decimal pris = 0;
    bool udsolgt = false;

    switch (nr)
    {
        case 1:
            navn = "Kaffe";
            pris = 25;
            break;
        case 2:
            navn = "Te";
            pris = 20;
            break;
        case 3:
            navn = "Kage";
            pris = 35;
            udsolgt = true;
            break;
        case 4:
            navn = "Sandwich";
            pris = 55;
            break;
        case 5:
            navn = "Juice";
            pris = 30;
            break;
    }

    if (udsolgt)
    {
        Console.WriteLine($"{navn}: udsolgt");
        continue;
    }

    Console.WriteLine($"{navn}: {pris} kr.");
    total += pris;
    antal++;
}

decimal rabat = 0;
if (antal >= 4 && total >= 100)
{
    rabat = total * 0.10m;
}
decimal atBetale = total - rabat;

Console.WriteLine($"Antal varer: {antal}");
Console.WriteLine($"I alt: {total} kr.");
Console.WriteLine($"Rabat: {rabat} kr.");
Console.WriteLine($"At betale: {atBetale} kr.");

decimal betalt = 0;
int sedler = 0;
while (betalt < atBetale)
{
    betalt += 50;
    sedler++;
}

Console.WriteLine($"Sedler: {sedler} x 50 kr.");
Console.WriteLine($"Byttepenge: {betalt - atBetale} kr.");`,
    ekstra: ["Gør Kage tilgængelig igen (`udsolgt = false`). Hvad bliver totalen, rabatten og antallet af sedler nu? Regn det ud først, og kør så.", "Fjern Te og Juice fra kurven ved at gøre dem udsolgte også. Nu er der kun 2 varer — kommer rabatten stadig? Hvorfor ikke?", "Sæt et breakpoint i `while`-løkken med sedlerne, og se `betalt` og `sedler` ændre sig for hver omgang."] },

  // ------------------------------------------------------------------
  { t: "spor", h: "Spor: tværsum med while",
    q: "Følg programmet. Skriv værdien af `tal` og `sum` lige efter hver linje, der ændrer en af dem. Rækkerne står i den rækkefølge, linjerne **bliver kørt**: linje 5 og 6 kører én gang for hver omgang i løkken. Husk, at `/` med heltal smider resten væk.",
    kode: R`int tal = 352;
int sum = 0;
while (tal > 0)
{
    sum += tal % 10;
    tal = tal / 10;
}
Console.WriteLine(sum);`,
    kolonner: ["tal", "sum"],
    raekker: [[1, "=352", "=–"], [2, "=352", "=0"], [5, "352", "2"], [6, "35", "2"], [5, "35", "7"], [6, "3", "7"], [5, "3", "10"], [6, "0", "10"]],
    output: "10",
    fordi: "`352 % 10` er 2 — det sidste ciffer — og `352 / 10` er 35, fordi heltalsdivision smider resten væk. Næste omgang giver 5 og 3, og den sidste giver 3 og 0. Nu er `tal > 0` falsk, og løkken stopper. Summen er 2 + 5 + 3 = 10." },

  { t: "spor", h: "Spor: continue og break",
    q: "Følg løkken. Skriv `i` og `sum` lige efter hver af linjerne 6, 10 og 12, hver gang en af dem bliver kørt. Husk: `continue` springer **resten af omgangen** over, og `break` forlader **hele løkken**.",
    kode: R`int sum = 0;
for (int i = 1; i <= 10; i++)
{
    if (i % 3 == 0)
    {
        continue;
    }
    if (sum > 6)
    {
        break;
    }
    sum += i;
}
Console.WriteLine(sum);`,
    kolonner: ["i", "sum"],
    raekker: [[1, "=–", "=0"], [12, "=1", "=1"], [12, "2", "3"], [6, "3", "3"], [12, "4", "7"], [10, "5", "7"]],
    slut: false,
    output: "7",
    fordi: "Når `i` er 3, går 3 op i tallet, så `continue` springer `sum += i` over — 3 bliver aldrig lagt til. Når `i` er 4, er `sum` kun 3, så 4 lægges til, og summen bliver 7. Når `i` er 5, er `sum > 6` sand, og `break` stopper hele løkken, selvom `i` kun er nået til 5 af 10." },

  { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: Hvorfor fik 80 og 100 point kun `Bestået` i karakterprogrammet — og hvordan viste debuggeren dig det?",
    svar: "I en `if` / `else if`-kæde tjekkes betingelserne **oppefra**, og **den første, der er sand, vinder**. Resten springes over. `point >= 50` stod først, og den er også sand for 80 og 100, så de nåede aldrig frem til `Godt` og `Fremragende`. Med et **breakpoint** og **Step Over** kunne jeg se, at programmet hoppede direkte ind i den første blok, da `point` var 80. Løsningen er at sætte den **strengeste betingelse først**: 90, så 70, så 50.",
    noegle: ["oppefra", "første sande vinder", "springes over", "breakpoint", "Step Over", "strengeste først"] }

] });
})();
