// Modul 2 — Valg og løkker. Forudsætter: modul 0 og 1.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m02", nr: 2, del: "Del 1 · C# fra bunden", ikon: "🔀",
  titel: "Valg og løkker",
  dag: "Kursusdag 2 · Syntaks og typer",
  intro: "Indtil nu har dine programmer gjort præcis det samme hver gang. Her lærer du de to ting, der gør et program klogt: at **vælge** (hvis … ellers …) og at **gentage** (bliv ved, indtil …).\n\nBagefter kan du lave et gættespil, der bliver ved, til brugeren rammer rigtigt.",
  video: ["02_Tirsdag.mp4 (3 t 58 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m02l1", titel: "if og else: programmet vælger", min: 15,
    ord: [
      ["if", "\"Hvis\". Koden i klammerne udføres kun, når betingelsen er sand."],
      ["else", "\"Ellers\". Koden udføres, når betingelsen i if var falsk."],
      ["else if", "\"Ellers hvis\". En ekstra betingelse, der kun tjekkes, når de foregående var falske."],
      ["Betingelse", "Det, der står i parentesen efter if. Skal kunne blive til true eller false."],
      ["Sammenligningsoperator", "Tegn, der sammenligner to værdier og giver true eller false: == != < > <= >="],
      ["==", "\"Er lig med\". To lighedstegn sammenligner. Ét lighedstegn tildeler."]
    ],
    trin: [
      { t: "laes", h: "Hvis … så …",
        md: "Med `if` kan programmet **vælge**. I parentesen står en **betingelse** — noget, der enten er sandt eller falsk. Kun hvis den er **sand**, udføres koden mellem klammerne.",
        kode: R`int alder = 20;

if (alder >= 18)
{
    Console.WriteLine("Du er voksen");
}
Console.WriteLine("Slut");`,
        noter: [
          ["if (alder >= 18)", "Hvis alder er større end eller lig med 18 … Ingen semikolon efter parentesen!"],
          ["{ … }", "… så udføres alt mellem klammerne."],
          ["Console.WriteLine(\"Slut\");", "Står efter klammerne og udføres derfor altid."]
        ],
        output: "Du er voksen\nSlut" },
      { t: "forudsig",
        kode: R`int alder = 15;

if (alder >= 18)
{
    Console.WriteLine("Du er voksen");
}
Console.WriteLine("Slut");`,
        output: "Slut",
        fordi: "15 er ikke større end eller lig med 18, så betingelsen er falsk. Programmet springer hele blokken over og fortsætter efter den lukkende klamme." },
      { t: "laes", h: "Seks måder at sammenligne på",
        md: "Tegnene, der sammenligner, hedder **sammenligningsoperatorer**. Hver sammenligning giver en `bool`: `true` eller `false`.",
        noter: [
          ["a == b", "a er **lig med** b. To lighedstegn!"],
          ["a != b", "a er **ikke lig med** b."],
          ["a < b", "a er mindre end b."],
          ["a > b", "a er større end b."],
          ["a <= b", "a er mindre end eller lig med b."],
          ["a >= b", "a er større end eller lig med b."]
        ],
        md2: "Den, alle laver fejl i: **ét** lighedstegn `=` lægger en værdi i en variabel. **To** lighedstegn `==` spørger, om to værdier er ens." },
      { t: "forudsig",
        kode: R`int a = 5;
int b = 8;
Console.WriteLine(a == b);
Console.WriteLine(a != b);
Console.WriteLine(a <= 5);
Console.WriteLine(b > 8);`,
        output: "False\nTrue\nTrue\nFalse",
        fordi: "5 er ikke lig med 8. 5 er forskellig fra 8. 5 er mindre end **eller lig med** 5. 8 er ikke større end 8." },
      { t: "laes", h: "… ellers …",
        md: "Med `else` siger du, hvad der skal ske, når betingelsen er **falsk**. Præcis én af de to blokke bliver udført — aldrig begge, aldrig ingen.",
        kode: R`int saldo = 50;
int pris = 80;

if (saldo >= pris)
{
    Console.WriteLine("Købet er gennemført");
}
else
{
    Console.WriteLine("Der er ikke penge nok");
}`,
        output: "Der er ikke penge nok" },
      { t: "udfyld", q: "Programmet skal skrive `Lige`, når tallet er lige, og ellers `Ulige`. Husk: et tal er lige, når resten ved division med 2 er 0.",
        kode: R`int tal = 7;

[[if]] (tal % 2 [[==]] 0)
{
    Console.WriteLine("Lige");
}
[[else]]
{
    Console.WriteLine("Ulige");
}`,
        output: "Ulige",
        fordi: "`tal % 2` er resten ved division med 2. Den sammenlignes med 0 med **to** lighedstegn. 7 % 2 er 1, så betingelsen er falsk, og `else` udføres." },
      { t: "fejl",
        kode: R`int point = 10;

if (point = 10)
{
    Console.WriteLine("Du har 10 point");
}`,
        linje: 3,
        fordi: "Der står **ét** lighedstegn, og det betyder \"læg 10 ind i point\". En betingelse skal give true eller false, så compileren siger: `Cannot implicitly convert type 'int' to 'bool'`. Der skal stå `==`.",
        rettet: R`int point = 10;

if (point == 10)
{
    Console.WriteLine("Du har 10 point");
}` },
      { t: "laes", h: "Flere muligheder: else if",
        md: "Er der mere end to muligheder, sætter du `else if` imellem. Betingelserne tjekkes **oppefra**, og **den første, der er sand, vinder**. Resten bliver sprunget over — også selvom de også er sande.",
        kode: R`int temperatur = 22;

if (temperatur >= 25)
{
    Console.WriteLine("Varmt");
}
else if (temperatur >= 15)
{
    Console.WriteLine("Lunt");
}
else if (temperatur >= 5)
{
    Console.WriteLine("Køligt");
}
else
{
    Console.WriteLine("Koldt");
}`,
        output: "Lunt",
        md2: "22 er ikke mindst 25, så første blok springes over. 22 er mindst 15, så der skrives `Lunt` — og så er programmet færdigt med hele kæden. Den tredje betingelse (22 ≥ 5) er også sand, men bliver aldrig tjekket." },
      { t: "forudsig",
        kode: R`int point = 85;

if (point >= 50)
{
    Console.WriteLine("Bestået");
}
else if (point >= 80)
{
    Console.WriteLine("Flot");
}
else
{
    Console.WriteLine("Dumpet");
}`,
        output: "Bestået",
        fordi: "Den **første** sande betingelse vinder. 85 ≥ 50 er sand, så der skrives `Bestået`, og resten springes over. `Flot` kan aldrig blive skrevet her — rækkefølgen er forkert. Den strengeste betingelse skal stå øverst." },
      { t: "orden", q: "Sæt linjerne i rækkefølge, så programmet skriver `Gratis`, når alderen er under 12, og ellers `Betal`.",
        linjer: ["int alder = 9;", "if (alder < 12)", "{", R`    Console.WriteLine("Gratis");`, "}", "else", "{", R`    Console.WriteLine("Betal");`, "}"],
        output: "Gratis",
        fordi: "Variablen skal laves, før den bruges. Derefter `if` med sin blok, og til sidst `else` med sin blok." },
      { t: "skriv", q: "Variablen `temperatur` er lavet for dig. Skriv en `if`/`else`, der skriver `Frost`, hvis `temperatur` er under 0, og ellers `Ingen frost`.",
        foer: R`int temperatur = -3;`,
        tjek: [
          [/if\(temperatur<0\)/, "Start med `if (temperatur < 0)`"],
          ['Console.WriteLine("Frost");', "Skriv `Frost` i if-blokken"],
          ["else", "Brug `else` til det andet tilfælde"],
          ['Console.WriteLine("Ingen frost");', "Skriv `Ingen frost` i else-blokken"],
          [/if\(temperatur<0\);/, "Der må ikke stå semikolon lige efter `if (...)`", "ikke"]
        ],
        loesning: R`if (temperatur < 0)
{
    Console.WriteLine("Frost");
}
else
{
    Console.WriteLine("Ingen frost");
}`,
        output: "Frost" },
      { t: "laes", h: "Sammenlign tekst",
        md: "Du kan også sammenligne tekst med `==`. Husk, at der er forskel på store og små bogstaver: `\"Ja\"` og `\"ja\"` er ikke ens.",
        kode: R`string svar = "ja";

if (svar == "ja")
{
    Console.WriteLine("Godt!");
}
else
{
    Console.WriteLine("Ærgerligt");
}`,
        output: "Godt!",
        md2: "Tip: Vil du være ligeglad med store og små bogstaver, så sammenlign med `svar.ToLower() == \"ja\"`." },
      { t: "ide", h: "Må du komme ind?",
        md: "Lav et Console-projekt, `Doermand`. Programmet spørger om alder og svarer. Kør det tre gange: med 10, 16 og 30.",
        kode: R`Console.Write("Hvor gammel er du? ");
int alder = int.Parse(Console.ReadLine());

if (alder >= 18)
{
    Console.WriteLine("Velkommen indenfor");
}
else if (alder >= 16)
{
    Console.WriteLine("Du må komme ind, men kun til kl. 22");
}
else
{
    Console.WriteLine("Du er for ung");
}`,
        md2: "Udvid selv: tilføj en fjerde mulighed, så alle over 65 får at vide, at de har gratis adgang. Hvor i kæden skal den stå?" },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på `=` og `==`?",
        svar: "`=` er **tildeling**: det lægger værdien til højre ind i variablen til venstre. `==` er en **sammenligning**: det spørger, om de to værdier er ens, og giver `true` eller `false`. I en `if` skal der bruges `==`.",
        noegle: ["tildel", "sammenlign", "true", "false"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m02l2", titel: "Og, eller, ikke — og switch", min: 16,
    ord: [
      ["&&", "\"Og\". Sand, når begge betingelser er sande."],
      ["||", "\"Eller\". Sand, når mindst én af betingelserne er sand."],
      ["!", "\"Ikke\". Vender true til false og omvendt."],
      ["Logisk operator", "Fællesnavn for && || og ! — de kombinerer betingelser."],
      ["switch", "Vælger mellem mange faste værdier af den samme variabel. Hver mulighed er en `case`."],
      ["break", "Afslutter en case i en switch (og, som du ser senere, en løkke)."],
      ["Ternær operator", "En if/else på én linje, der giver en værdi: `betingelse ? værdiHvisSand : værdiHvisFalsk`."]
    ],
    trin: [
      { t: "laes", h: "To betingelser på én gang",
        md: "Tit afhænger et valg af **flere ting**. Dem kombinerer du med de **logiske operatorer**:\n\n- `&&` betyder **og**: begge skal være sande.\n- `||` betyder **eller**: mindst én skal være sand.\n- `!` betyder **ikke**: vender sand til falsk.",
        kode: R`int alder = 20;
bool harBillet = true;

if (alder >= 18 && harBillet)
{
    Console.WriteLine("Du må komme ind");
}`,
        output: "Du må komme ind",
        md2: "Begge dele er sande, så hele betingelsen er sand. Læg mærke til, at en `bool` kan stå alene: `harBillet` er det samme som `harBillet == true`.\n\n{{På et dansk Windows-tastatur skrives `|` med AltGr + tasten med ´ (lige til venstre for Backspace).||På et dansk Mac-tastatur skrives `|` med ⌥ + i.}}" },
      { t: "forudsig",
        kode: R`bool a = true;
bool b = false;
Console.WriteLine(a && b);
Console.WriteLine(a || b);
Console.WriteLine(!a);
Console.WriteLine(!b && a);`,
        output: "False\nTrue\nFalse\nTrue",
        fordi: "`&&` kræver begge. `||` kræver bare én. `!a` vender true til false. I sidste linje er `!b` true, og `a` er true — så begge er sande." },
      { t: "valg", q: "Rabat gives til børn **eller** pensionister. `alder` er 70. Hvilken betingelse er rigtig?",
        svar: ["alder < 12 || alder >= 65", "alder < 12 && alder >= 65", "alder < 12 or alder >= 65", "alder < 12 || >= 65"],
        ret: 0, fordi: "Det er nok, at **én** af delene er sand, så det er `||`. Med `&&` skulle man være under 12 og over 65 på samme tid — det er ingen. Og hver side af `||` skal være en hel sammenligning: `alder >= 65`, ikke bare `>= 65`." },
      { t: "udfyld", q: "Brugeren får adgang, hvis kodeordet er rigtigt **og** kontoen ikke er spærret.",
        kode: R`string kodeord = "hemmelig";
bool erSpaerret = false;

if (kodeord == "hemmelig" [[&&]] [[!]]erSpaerret)
{
    Console.WriteLine("Adgang givet");
}`,
        output: "Adgang givet",
        fordi: "`&&` fordi begge dele skal være opfyldt. `!erSpaerret` betyder \"ikke spærret\" — den er true, når `erSpaerret` er false." },
      { t: "skriv", q: "Variablen `tal` er lavet for dig. Skriv en `if`, der skriver `Mellem`, hvis `tal` er mindst 10 **og** højst 20.",
        foer: R`int tal = 15;`,
        tjek: [
          [/if\((tal>=10&&tal<=20|tal<=20&&tal>=10|10<=tal&&tal<=20)\)/, "Betingelsen skal være `tal >= 10 && tal <= 20`"],
          ['Console.WriteLine("Mellem");', "Skriv `Mellem` i blokken"]
        ],
        forkert: ['if (tal >= 10 || tal <= 20)\n{\n    Console.WriteLine("Mellem");\n}', 'if (10 <= tal <= 20)\n{\n    Console.WriteLine("Mellem");\n}'],
        loesning: R`if (tal >= 10 && tal <= 20)
{
    Console.WriteLine("Mellem");
}`,
        output: "Mellem",
        fordi: "I matematik skriver man 10 ≤ tal ≤ 20. Det går ikke i C# — der skal to hele sammenligninger til, bundet sammen med `&&`." },
      { t: "laes", h: "if inden i if",
        md: "Du kan lægge en `if` inden i en anden. Så tjekkes den inderste kun, når den yderste var sand. Indrykningen viser, hvad der ligger i hvad.",
        kode: R`bool erMedlem = true;
int koeb = 600;

if (erMedlem)
{
    if (koeb >= 500)
    {
        Console.WriteLine("20 % rabat");
    }
    else
    {
        Console.WriteLine("10 % rabat");
    }
}
else
{
    Console.WriteLine("Ingen rabat");
}`,
        output: "20 % rabat" },
      { t: "forudsig",
        kode: R`bool erMedlem = false;
int koeb = 900;

if (erMedlem)
{
    if (koeb >= 500)
    {
        Console.WriteLine("20 % rabat");
    }
}
else
{
    Console.WriteLine("Ingen rabat");
}
Console.WriteLine("Tak for i dag");`,
        output: "Ingen rabat\nTak for i dag",
        fordi: "`erMedlem` er falsk, så hele den yderste blok — med den inderste if — springes over. Det hjælper ikke, at købet er stort. Den sidste linje står uden for det hele og udføres altid." },
      { t: "laes", h: "switch: mange faste muligheder",
        md: "Skal du sammenligne **den samme variabel** med mange faste værdier, bliver en lang `else if`-kæde rodet. Så bruger man `switch`.\n\nHver mulighed er en `case`, der slutter med `break`. `default` er det, der sker, hvis ingen passer — ligesom den sidste `else`.",
        kode: R`int dag = 3;

switch (dag)
{
    case 1:
        Console.WriteLine("Mandag");
        break;
    case 2:
        Console.WriteLine("Tirsdag");
        break;
    case 3:
        Console.WriteLine("Onsdag");
        break;
    default:
        Console.WriteLine("En anden dag");
        break;
}`,
        output: "Onsdag",
        md2: "Læg mærke til **kolon** efter hver `case` — ikke semikolon. Glemmer du `break`, giver compileren en fejl." },
      { t: "forudsig",
        kode: R`string farve = "gul";

switch (farve)
{
    case "rød":
        Console.WriteLine("Stop");
        break;
    case "grøn":
        Console.WriteLine("Kør");
        break;
    default:
        Console.WriteLine("Vent");
        break;
}`,
        output: "Vent",
        fordi: "`\"gul\"` passer hverken på `\"rød\"` eller `\"grøn\"`, så `default` udføres. Switch virker også med tekst." },
      { t: "udfyld", q: "Udfyld de to ord, der mangler i denne switch.",
        kode: R`int valg = 2;

switch (valg)
{
    [[case]] 1:
        Console.WriteLine("Nyt spil");
        break;
    case 2:
        Console.WriteLine("Hent spil");
        [[break]];
    default:
        Console.WriteLine("Ukendt valg");
        break;
}`,
        output: "Hent spil",
        fordi: "Hver mulighed begynder med `case` og slutter med `break`." },
      { t: "laes", h: "En if/else på én linje",
        md: "Når en if/else kun skal **vælge mellem to værdier**, kan den skrives på én linje med et spørgsmålstegn og et kolon. Det hedder den **ternære operator**. Du behøver ikke bruge den selv, men du skal kunne læse den — den optræder tit i web-kode.",
        kode: R`int alder = 20;
string tekst = alder >= 18 ? "voksen" : "barn";
Console.WriteLine(tekst);`,
        noter: [
          ["alder >= 18 ?", "Spørgsmålet: er alder mindst 18?"],
          ["\"voksen\"", "Værdien, hvis svaret er ja."],
          [": \"barn\"", "Værdien, hvis svaret er nej."]
        ],
        output: "voksen" },
      { t: "forudsig",
        kode: R`int lager = 0;
string status = lager > 0 ? "På lager" : "Udsolgt";
Console.WriteLine(status);`,
        output: "Udsolgt",
        fordi: "0 er ikke større end 0, så betingelsen er falsk, og værdien efter kolonet vælges." },
      { t: "ide", h: "En lille menu",
        md: "Lav et Console-projekt, `Menu`. Programmet viser en menu, læser et tal og bruger `switch` til at svare. Prøv alle valg — også et, der ikke findes.",
        kode: R`Console.WriteLine("1) Kaffe  2) Te  3) Kakao");
Console.Write("Vælg: ");
int valg = int.Parse(Console.ReadLine());

switch (valg)
{
    case 1:
        Console.WriteLine("Kaffe koster 25 kr.");
        break;
    case 2:
        Console.WriteLine("Te koster 20 kr.");
        break;
    case 3:
        Console.WriteLine("Kakao koster 30 kr.");
        break;
    default:
        Console.WriteLine("Det har vi ikke");
        break;
}`,
        md2: "Tip: {{Skriv `switch`, og tryk **Tab** to gange — så laver Visual Studio skelettet for dig.||Rider foreslår ord, mens du skriver. Tryk **Enter** eller **Tab** for at tage forslaget.}}" },
      { t: "forklar", q: "Forklar med dine egne ord: Hvornår bruger du `&&`, og hvornår bruger du `||`? Giv et eksempel på hver.",
        svar: "`&&` betyder **og**: hele betingelsen er kun sand, når **begge** dele er sande — fx \"over 18 **og** har billet\". `||` betyder **eller**: betingelsen er sand, når **mindst én** af delene er sand — fx \"under 12 **eller** over 65 får rabat\".",
        noegle: ["og", "eller", "begge", "mindst én"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m02l3", titel: "while: gentag, så længe …", min: 16,
    ord: [
      ["Løkke", "Kode, der gentages flere gange. Hedder *loop* på engelsk."],
      ["while", "En løkke, der gentager sin blok, så længe betingelsen er sand. Betingelsen tjekkes før hver omgang."],
      ["Iteration", "Én omgang i en løkke."],
      ["Uendelig løkke", "En løkke, der aldrig stopper, fordi betingelsen aldrig bliver falsk."],
      ["do-while", "En løkke, der altid kører mindst én gang, fordi betingelsen først tjekkes efter omgangen."],
      ["continue", "Springer resten af den aktuelle omgang over og går til næste."],
      ["int.TryParse", "Prøver at lave tekst om til et tal. Giver true/false tilbage i stedet for at gå ned."],
      ["out", "Markerer en variabel, som en metode lægger et ekstra resultat i."]
    ],
    trin: [
      { t: "laes", h: "Gør det igen og igen",
        md: "En **løkke** gentager den samme kode flere gange. Den enkleste hedder `while` — \"så længe\". Den ligner en `if`, men når blokken er færdig, **hopper programmet tilbage og tjekker betingelsen igen**.",
        kode: R`int tal = 1;

while (tal <= 3)
{
    Console.WriteLine(tal);
    tal++;
}
Console.WriteLine("Færdig");`,
        noter: [
          ["while (tal <= 3)", "Så længe tal er højst 3 …"],
          ["Console.WriteLine(tal);", "… skriv tallet …"],
          ["tal++;", "… og læg 1 til. Uden denne linje stopper løkken aldrig."]
        ],
        output: "1\n2\n3\nFærdig",
        md2: "Følg med: tal er 1 → skrives → bliver 2 → skrives → bliver 3 → skrives → bliver 4. Nu er 4 ≤ 3 falsk, og programmet går videre efter klammen. Hver omgang kaldes en **iteration**." },
      { t: "forudsig",
        kode: R`int x = 10;

while (x > 0)
{
    Console.WriteLine(x);
    x -= 4;
}`,
        output: "10\n6\n2",
        fordi: "10 skrives, x bliver 6. 6 skrives, x bliver 2. 2 skrives, x bliver −2. Nu er −2 > 0 falsk, og løkken stopper." },
      { t: "fejl", q: "Programmet skulle skrive 1, 2, 3 og stoppe. Men compileren vil ikke oversætte det. Hvilken linje er forkert?",
        kode: R`int tal = 1;

while (tal <= 3)
{
    Console.WriteLine(tal);
    tal + 1;
}`,
        linje: 6,
        fordi: "`tal + 1;` regner noget ud, men gemmer det ingen steder. Compileren afviser linjen, fordi den ikke gør noget. Der skal stå `tal++;` eller `tal = tal + 1;`. Havde linjen slet ikke været der, var programmet blevet oversat — men så var `tal` aldrig blevet større, og løkken havde skrevet 1 i det uendelige. Det kaldes en **uendelig løkke**.",
        rettet: R`int tal = 1;

while (tal <= 3)
{
    Console.WriteLine(tal);
    tal++;
}` },
      { t: "laes", h: "Hvis løkken aldrig stopper",
        md: "Alle laver en **uendelig løkke** før eller siden. Programmet hænger eller spytter tekst ud uden ende. Det er ikke farligt — du stopper det bare:\n\n{{Klik i det sorte vindue, og tryk **Ctrl + C**. Eller luk vinduet på krydset.||Klik på den **røde firkant ■** (Stop) i vinduet Run nederst eller øverst til højre.}}\n\nKig bagefter på løkken, og spørg: **hvad er det, der skal gøre betingelsen falsk?** Det er næsten altid en linje, der mangler." },
      { t: "udfyld", q: "Løkken skal tælle ned fra 3 til 1 og så skrive `Start!`.",
        kode: R`int n = 3;

[[while]] (n [[>]] 0)
{
    Console.WriteLine(n);
    n[[--]];
}
Console.WriteLine("Start!");`,
        output: "3\n2\n1\nStart!",
        fordi: "Løkken skal køre, så længe n er større end 0 — og n skal blive 1 mindre hver gang." },
      { t: "laes", h: "Læg sammen i en løkke",
        md: "En løkke bruges tit til at **samle noget sammen**. Man laver en variabel til resultatet **før** løkken og lægger til i hver omgang.",
        kode: R`int sum = 0;
int tal = 1;

while (tal <= 4)
{
    sum += tal;
    tal++;
}
Console.WriteLine(sum);`,
        output: "10",
        md2: "1 + 2 + 3 + 4 = 10. Variablen `sum` skal laves uden for løkken — ellers ville den blive nulstillet i hver omgang." },
      { t: "forudsig",
        kode: R`int antal = 0;
int tal = 20;

while (tal > 1)
{
    tal = tal / 2;
    antal++;
}
Console.WriteLine(antal);`,
        output: "4",
        fordi: "20 → 10 → 5 → 2 → 1 (heltalsdivision: 5 / 2 er 2). Det er fire halveringer, og så er tal ikke længere større end 1." },
      { t: "laes", h: "Spørg igen, til svaret er rigtigt",
        md: "Løkker er perfekte til at blive ved med at spørge brugeren. Her bliver programmet ved, indtil kodeordet er rigtigt:",
        kode: R`string kode = "";

while (kode != "1234")
{
    Console.Write("Kode: ");
    kode = Console.ReadLine();
}
Console.WriteLine("Adgang givet");`,
        md2: "Variablen starter som en tom tekst `\"\"`, så betingelsen er sand første gang. Hver omgang læser et nyt svar ind i den **samme** variabel." },
      { t: "laes", h: "do-while: først gør, så spørg",
        md: "En `while` tjekker betingelsen **før** hver omgang, så den kører måske nul gange. En `do-while` tjekker **efter** — så blokken kører **altid mindst én gang**. Det passer godt til \"spørg, og spørg igen, hvis svaret er forkert\".",
        kode: R`int tal = 100;

do
{
    Console.WriteLine(tal);
    tal++;
} while (tal < 3);`,
        output: "100",
        md2: "100 er ikke mindre end 3 — men blokken når at køre én gang, før betingelsen tjekkes. Læg mærke til semikolonet efter `while (...)` til sidst." },
      { t: "laes", h: "break og continue",
        md: "To ord kan styre en løkke indefra:\n\n- `break` **hopper helt ud** af løkken med det samme.\n- `continue` **springer resten af denne omgang over** og går videre til næste.",
        kode: R`int tal = 0;

while (true)
{
    tal++;
    if (tal == 2)
    {
        continue;
    }
    if (tal == 5)
    {
        break;
    }
    Console.WriteLine(tal);
}`,
        output: "1\n3\n4",
        md2: "`while (true)` er en løkke uden stopbetingelse — den kører, til den møder et `break`. Ved 2 springes udskriften over. Ved 5 forlades løkken." },
      { t: "forudsig",
        kode: R`int i = 0;

while (i < 10)
{
    i++;
    if (i % 2 == 0)
    {
        continue;
    }
    if (i > 6)
    {
        break;
    }
    Console.WriteLine(i);
}`,
        output: "1\n3\n5",
        fordi: "Lige tal springes over med `continue`. De ulige skrives ud — indtil i bliver 7, som er større end 6, og så stopper `break` løkken." },
      { t: "laes", h: "TryParse: tjek svaret uden at gå ned",
        md: "I modul 1 gik programmet ned, hvis brugeren skrev bogstaver, og du brugte `int.Parse`. Nu kan du gøre det ordentligt med `int.TryParse`. Den **prøver** at lave teksten om til et tal og svarer med en `bool`:\n\n- `true`: det lykkedes, og tallet ligger i variablen efter ordet `out`.\n- `false`: det var ikke et tal.",
        kode: R`string svar = "abc";

if (int.TryParse(svar, out int tal))
{
    Console.WriteLine($"Tallet er {tal}");
}
else
{
    Console.WriteLine("Det var ikke et tal");
}`,
        noter: [
          ["int.TryParse(svar, …)", "Prøv at lave svar om til et heltal."],
          ["out int tal", "Laver variablen tal og lægger resultatet i den. `out` betyder, at metoden sender en ekstra værdi **ud**."]
        ],
        output: "Det var ikke et tal" },
      { t: "skriv", q: "Skriv en `while`-løkke, der skriver tallene 1 til 5 — ét pr. linje. Brug en `int`, der hedder `i`, og start den på 1.",
        tjek: [
          ["int i = 1;", "Start med `int i = 1;`"],
          [/while\(i(<=5|<6)\)/, "Løkken skal køre, så længe `i <= 5`"],
          ["Console.WriteLine(i);", "Skriv `i` ud i løkken"],
          [/i\+\+;|i\+=1;|i=i\+1;/, "Læg 1 til `i` i hver omgang — ellers stopper løkken aldrig"]
        ],
        forkert: ["int i = 1;\nwhile (i <= 5)\n{\n    Console.WriteLine(i);\n}"],
        loesning: R`int i = 1;
while (i <= 5)
{
    Console.WriteLine(i);
    i++;
}`,
        output: "1\n2\n3\n4\n5" },
      { t: "ide", h: "Et program, der ikke kan gå ned",
        md: "Lav et Console-projekt, `SikkertInput`. Programmet bliver ved med at spørge, indtil brugeren skriver et rigtigt tal. Prøv at svare `hej`, en tom linje og til sidst `42`.",
        kode: R`int alder;

while (true)
{
    Console.Write("Hvor gammel er du? ");
    string svar = Console.ReadLine();

    if (int.TryParse(svar, out alder))
    {
        break;
    }
    Console.WriteLine("Skriv et tal, tak.");
}

Console.WriteLine($"Om 5 år er du {alder + 5}.");`,
        md2: "Dette mønster — **løkke + TryParse + break** — er standardmåden at læse tal sikkert på. Brug det i dine egne programmer." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er en uendelig løkke, og hvordan opstår den typisk?",
        svar: "En uendelig løkke er en løkke, der **aldrig stopper**, fordi betingelsen **aldrig bliver falsk**. Den opstår typisk, fordi man har glemt at **ændre den variabel**, betingelsen afhænger af — fx glemt `i++` — eller fordi betingelsen er skrevet forkert.",
        noegle: ["betingelse", "falsk", "ændre", "variabel"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m02l4", titel: "for: gentag et bestemt antal gange", min: 15,
    ord: [
      ["for", "En løkke, hvor start, betingelse og optælling står samlet på én linje. Bruges, når man ved, hvor mange gange der skal gentages."],
      ["Tællevariabel", "Variablen, der holder styr på, hvor langt løkken er nået. Hedder traditionelt `i`."],
      ["Indlejret løkke", "En løkke inden i en anden løkke. Den inderste kører alle sine omgange for hver omgang i den yderste."],
      ["Scope", "Det område af koden, hvor en variabel findes. En variabel lavet i en blok findes kun inde i blokken."]
    ],
    trin: [
      { t: "laes", h: "Tre ting på én linje",
        md: "En while-løkke, der tæller, består altid af tre dele: en **startværdi**, en **betingelse** og en **optælling**. I en `for`-løkke står de tre samlet øverst, adskilt af semikolon. Det er sværere at glemme noget.",
        kode: R`for (int i = 1; i <= 3; i++)
{
    Console.WriteLine(i);
}`,
        noter: [
          ["int i = 1;", "Start: lav tællevariablen. Sker én gang."],
          ["i <= 3;", "Betingelse: tjekkes **før** hver omgang."],
          ["i++", "Optælling: sker **efter** hver omgang."]
        ],
        output: "1\n2\n3",
        md2: "Det er præcis den samme løkke som `while`-eksemplet i forrige lektion — bare skrevet kortere. Tællevariablen hedder traditionelt `i`." },
      { t: "forudsig",
        kode: R`for (int i = 0; i < 4; i++)
{
    Console.WriteLine(i);
}`,
        output: "0\n1\n2\n3",
        fordi: "Løkken starter på 0 og kører, så længe i er **mindre end** 4. Den kører altså 4 gange: 0, 1, 2 og 3. Mønsteret `i = 0; i < antal` er det, du ser allermest — programmører tæller fra 0." },
      { t: "udfyld", q: "Løkken skal skrive `Hej` præcis 5 gange.",
        kode: R`for (int i = 0; i [[<]] 5; [[i++]])
{
    Console.WriteLine("Hej");
}`,
        output: "Hej\nHej\nHej\nHej\nHej",
        fordi: "Fra 0 til og med 4 er fem omgange. `i++` tæller én op efter hver omgang." },
      { t: "forudsig",
        kode: R`for (int i = 10; i > 0; i -= 3)
{
    Console.WriteLine(i);
}`,
        output: "10\n7\n4\n1",
        fordi: "En for-løkke kan også tælle **nedad** og i **større spring**. Den starter på 10 og trækker 3 fra efter hver omgang, så længe i er større end 0." },
      { t: "orden", q: "Programmet skal lægge tallene 1 til 5 sammen og skrive summen. Sæt linjerne i rækkefølge.",
        linjer: ["int sum = 0;", "for (int i = 1; i <= 5; i++)", "{", "    sum += i;", "}", "Console.WriteLine(sum);"],
        output: "15",
        fordi: "`sum` laves før løkken, lægges til inde i løkken og skrives ud bagefter. Stod udskriften inde i løkken, ville den blive skrevet fem gange." },
      { t: "fejl",
        kode: R`for (int i = 0; i < 3; i++)
{
    Console.WriteLine("Omgang");
}
Console.WriteLine(i);`,
        linje: 5,
        fordi: "Variablen `i` er lavet i for-løkken og **findes kun inde i løkken**. Efter den lukkende klamme er den væk, så compileren siger: `The name 'i' does not exist in the current context`. Det område, en variabel findes i, kaldes dens **scope**.",
        rettet: R`for (int i = 0; i < 3; i++)
{
    Console.WriteLine("Omgang");
}
Console.WriteLine("Slut");` },
      { t: "skriv", q: "Skriv en `for`-løkke, der skriver alle tal fra 1 til 10 — ét pr. linje. Kald tællevariablen `i`.",
        tjek: [
          [/for\(int i=1;/, "Start løkken med `for (int i = 1;`"],
          [/;i(<=10|<11);/, "Betingelsen skal være `i <= 10`"],
          [/;(i\+\+|\+\+i|i\+=1)\)/, "Tæl op med `i++`"],
          ["Console.WriteLine(i);", "Skriv `i` ud i løkken"]
        ],
        loesning: R`for (int i = 1; i <= 10; i++)
{
    Console.WriteLine(i);
}`,
        output: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10" },
      { t: "laes", h: "if inde i en løkke",
        md: "Nu kan du sætte tingene sammen: en løkke, der gennemgår en række tal, og en `if`, der vælger nogle af dem ud.",
        kode: R`for (int i = 1; i <= 10; i++)
{
    if (i % 3 == 0)
    {
        Console.WriteLine(i);
    }
}`,
        output: "3\n6\n9",
        md2: "Løkken prøver alle tal fra 1 til 10. Kun dem, hvor resten ved division med 3 er 0, bliver skrevet." },
      { t: "forudsig",
        kode: R`int antal = 0;

for (int i = 1; i <= 20; i++)
{
    if (i % 5 == 0)
    {
        antal++;
    }
}
Console.WriteLine(antal);`,
        output: "4",
        fordi: "Programmet **tæller**, hvor mange af tallene 1–20 som 5 går op i: 5, 10, 15 og 20. Det er 4." },
      { t: "laes", h: "En løkke i en løkke",
        md: "Du kan lægge en løkke inden i en anden — det hedder en **indlejret løkke**. For **hver** omgang i den yderste kører den inderste **alle** sine omgange. Det er samme princip som et ur: hver gang timetallet skifter én gang, har minuttallet været igennem alle sine 60 værdier.",
        kode: R`for (int raekke = 1; raekke <= 2; raekke++)
{
    for (int kolonne = 1; kolonne <= 3; kolonne++)
    {
        Console.Write($"{raekke}{kolonne} ");
    }
    Console.WriteLine();
}`,
        output: "11 12 13\n21 22 23",
        md2: "Den inderste bruger `Write`, så tallene bliver på linjen. `Console.WriteLine()` uden noget i parentesen skifter bare linje, når en række er færdig." },
      { t: "forudsig",
        kode: R`for (int a = 1; a <= 3; a++)
{
    for (int b = 1; b <= a; b++)
    {
        Console.Write("*");
    }
    Console.WriteLine();
}`,
        output: "*\n**\n***",
        fordi: "Den inderste løkke kører `a` gange: én stjerne i første række, to i anden og tre i tredje." },
      { t: "valg", q: "Hvornår er `for` et bedre valg end `while`?",
        svar: ["Når jeg på forhånd ved, hvor mange gange der skal gentages", "Når jeg venter på, at brugeren svarer rigtigt", "Når løkken skal køre uendeligt", "Der er aldrig forskel"],
        ret: 0, fordi: "`for` er til at **tælle**: \"gør det 10 gange\". `while` er til **\"bliv ved, indtil noget sker\"**, hvor man ikke kender antallet på forhånd. Alt, hvad den ene kan, kan den anden også — men den rigtige gør koden lettere at læse." },
      { t: "ide", h: "Den lille tabel",
        md: "Lav et Console-projekt, `Tabel`. Programmet spørger om et tal og skriver tallets tabel fra 1 til 10. Prøv med 7.",
        kode: R`Console.Write("Hvilken tabel? ");
int tal = int.Parse(Console.ReadLine());

for (int i = 1; i <= 10; i++)
{
    Console.WriteLine($"{i} x {tal} = {i * tal}");
}`,
        md2: "Udvid selv: læg en løkke udenom, så programmet skriver **alle** tabeller fra 1 til 10. Tip: Skriv `for`, og tryk **Tab** {{to gange — så laver Visual Studio||— så laver Rider}} skelettet." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad betyder de tre dele i `for (int i = 0; i < 5; i++)`?",
        svar: "Første del, `int i = 0`, er **startværdien**: tællevariablen laves én gang. Anden del, `i < 5`, er **betingelsen**: den tjekkes før hver omgang, og løkken kører, så længe den er sand. Tredje del, `i++`, er **optællingen**: den sker efter hver omgang. Løkken her kører 5 gange, med i fra 0 til 4.",
        noegle: ["start", "betingelse", "før hver", "efter hver", "5 gange"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m02l5", titel: "Miniprojekt: Gæt et tal", min: 20,
    ord: [
      ["Pseudokode", "En plan for programmet skrevet på almindeligt dansk, før man skriver rigtig kode."],
      ["Random", "En indbygget klasse, der kan lave tilfældige tal. `Random.Shared.Next(1, 101)` giver et tal fra 1 til 100."],
      ["Flag", "En bool-variabel, der husker, om noget er sket — fx `bool gaettet = false;`"]
    ],
    trin: [
      { t: "laes", h: "Tænk først, kod bagefter",
        md: "Nu skal du bygge et helt lille spil af det, du har lært. Rigtige programmører starter ikke med at skrive kode. De skriver først **planen på almindeligt dansk**. Det kaldes **pseudokode**:\n\n1. Vælg et hemmeligt tal.\n2. Gentag, indtil der er gættet rigtigt:\n3. — Bed om et gæt.\n4. — Hvis gættet er for lavt: sig \"for lavt\".\n5. — Ellers hvis det er for højt: sig \"for højt\".\n6. — Ellers: sig \"rigtigt\", og stop.\n7. Fortæl, hvor mange forsøg der blev brugt.\n\nHver linje i planen bliver til noget, du allerede kan: en variabel, en løkke, en if/else if/else og en tæller." },
      { t: "valg", q: "Hvilken slags løkke passer til \"gentag, indtil der er gættet rigtigt\"?",
        svar: ["while — vi ved ikke på forhånd, hvor mange gæt der skal til", "for — den skal køre præcis 10 gange", "Ingen løkke — en if er nok", "switch"],
        ret: 0, fordi: "Antallet af omgange er ukendt. Det afhænger af brugeren. Så er det `while`." },
      { t: "orden", q: "Byg kernen i spillet: løkken, der bliver ved, så længe gættet er forkert. Sæt linjerne i rækkefølge.",
        linjer: ["int hemmeligt = 7;", "int gaet = 0;", "while (gaet != hemmeligt)", "{", R`    Console.Write("Gæt: ");`, "    gaet = int.Parse(Console.ReadLine());", "}", R`Console.WriteLine("Rigtigt!");`],
        fordi: "Begge variabler skal laves før løkken. `gaet` starter på 0, så betingelsen er sand første gang. Inde i løkken spørges der, og svaret gemmes. Når gættet er rigtigt, bliver betingelsen falsk, og programmet fortsætter efter klammen." },
      { t: "forudsig", q: "Brugeren taster de gæt, der står under koden. Hvad skriver programmet i alt? (Programmet skriver ikke selv noget, når det læser et gæt.)",
        kode: R`int hemmeligt = 7;
int gaet = 0;

while (gaet != hemmeligt)
{
    gaet = int.Parse(Console.ReadLine());

    if (gaet < hemmeligt)
    {
        Console.WriteLine("For lavt");
    }
    else if (gaet > hemmeligt)
    {
        Console.WriteLine("For højt");
    }
}
Console.WriteLine("Rigtigt!");`,
        input: ["3", "9", "7"],
        output: "For lavt\nFor højt\nRigtigt!",
        fordi: "3 er for lavt. 9 er for højt. 7 er hverken for lavt eller for højt, så ingen af de to blokke udføres — og nu er betingelsen i `while` falsk, så løkken stopper." },
      { t: "udfyld", q: "Tilføj en tæller, der holder styr på antal forsøg.",
        kode: R`int hemmeligt = 7;
int gaet = 0;
int forsoeg = [[0]];

while (gaet != hemmeligt)
{
    gaet = int.Parse(Console.ReadLine());
    forsoeg[[++]];
}
Console.WriteLine($"Du brugte {forsoeg} forsøg");`,
        input: ["1", "5", "8", "7"],
        output: "Du brugte 4 forsøg",
        fordi: "Tælleren starter på 0 **før** løkken og tælles én op i **hver** omgang." },
      { t: "laes", h: "Et tilfældigt tal",
        md: "Et spil med et fast tal er kun sjovt én gang. C# har en indbygget **tilfældighedsgenerator**, der hedder `Random`:",
        kode: R`int hemmeligt = Random.Shared.Next(1, 101);`,
        noter: [
          ["Random.Shared", "Den færdige tilfældighedsgenerator."],
          [".Next(1, 101)", "Giver et tilfældigt heltal fra 1 **til og med 100**. Det første tal er med, det sidste er **ikke** med."]
        ],
        md2: "I ældre kode — også i nogle af lærerens eksempler — ser du i stedet to linjer: `Random r = new Random();` og `int tal = r.Next(1, 101);`. Det gør det samme. Ordet `new` lærer du i modul 4." },
      { t: "valg", q: "Hvilke tal kan `Random.Shared.Next(1, 7)` give?",
        svar: ["1, 2, 3, 4, 5 eller 6 — som en terning", "1 til 7", "0 til 7", "0 til 6"],
        ret: 0, fordi: "Det første tal er med, det sidste er ikke. `Next(1, 7)` er derfor et terningkast." },
      { t: "skriv", q: "Variablerne er lavet. Skriv en `if` / `else if` / `else`, der skriver `For lavt`, hvis `gaet` er mindre end `hemmeligt`, `For højt`, hvis det er større, og ellers `Rigtigt`.",
        foer: R`int hemmeligt = 50;
int gaet = 80;`,
        tjek: [
          [/if\(gaet<hemmeligt\)/, "Første betingelse: `if (gaet < hemmeligt)`"],
          ['Console.WriteLine("For lavt");', "Skriv `For lavt`"],
          [/else if\(gaet>hemmeligt\)/, "Anden betingelse: `else if (gaet > hemmeligt)`"],
          ['Console.WriteLine("For højt");', "Skriv `For højt`"],
          [/else\{Console\.WriteLine\("Rigtigt"\);\}/, "Slut med en `else`-blok, der skriver `Rigtigt`"]
        ],
        loesning: R`if (gaet < hemmeligt)
{
    Console.WriteLine("For lavt");
}
else if (gaet > hemmeligt)
{
    Console.WriteLine("For højt");
}
else
{
    Console.WriteLine("Rigtigt");
}`,
        output: "For højt" },
      { t: "ide", h: "Byg hele spillet",
        md: "Lav et Console-projekt, `GaetEtTal`. Skriv hele programmet — og læg mærke til, at du kender hver eneste linje. Spil det et par gange.",
        kode: R`int hemmeligt = Random.Shared.Next(1, 101);
int forsoeg = 0;
bool gaettet = false;

Console.WriteLine("Jeg tænker på et tal mellem 1 og 100.");

while (!gaettet)
{
    Console.Write("Dit gæt: ");
    string svar = Console.ReadLine();

    if (!int.TryParse(svar, out int gaet))
    {
        Console.WriteLine("Skriv et tal, tak.");
        continue;
    }

    forsoeg++;

    if (gaet < hemmeligt)
    {
        Console.WriteLine("For lavt");
    }
    else if (gaet > hemmeligt)
    {
        Console.WriteLine("For højt");
    }
    else
    {
        gaettet = true;
    }
}

Console.WriteLine($"Rigtigt! Du brugte {forsoeg} forsøg.");`,
        md2: "`gaettet` er et **flag**: en bool, der husker, om noget er sket. Løkken kører, så længe flaget **ikke** er sat.\n\nUdvid selv, én ting ad gangen:\n\n- Giv kun brugeren 7 forsøg.\n- Skriv `Du er tæt på!`, når gættet er højst 5 fra det rigtige.\n- Spørg til sidst, om brugeren vil spille igen." },
      { t: "forklar", q: "Forklar med dine egne ord, hvordan dit gættespil virker. Hvilke byggesten består det af?",
        svar: "Programmet vælger et **tilfældigt tal** med `Random` og gemmer det i en **variabel**. En **while-løkke** bliver ved, så længe der ikke er gættet rigtigt. I hver omgang læses et gæt med `ReadLine`, og `TryParse` tjekker, at det er et tal. En **if / else if / else** sammenligner gættet med det hemmelige tal og svarer for lavt, for højt eller rigtigt. En **tæller** holder styr på antal forsøg.",
        noegle: ["variabel", "while", "if", "TryParse", "tæller"] }
    ] }
  ]
});
})();
