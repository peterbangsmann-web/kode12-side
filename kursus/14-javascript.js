// Modul 14 — JavaScript. Forudsætter: modul 0–13 (C#, SQL, HTML og CSS).
(function () {
const R = String.raw;
// J`…` virker som R`…`, men bruges til JavaScript med template literals:
// skriv ´ hvor koden skal have en backtick, og €{ hvor den skal have dollar + tuborgklamme.
const J = function (s) { var v = [].slice.call(arguments, 1); return String.raw.apply(null, [s].concat(v)).replace(/´/g, "`").replace(/€\{/g, "$" + "{"); };

window.KURSUS.push({
  id: "m14", nr: 14, del: "Del 4 · Database og frontend", ikon: "✨",
  titel: "JavaScript",
  dag: "Kursusdag 11 · JavaScript og grafik",
  intro: "HTML er sidens **indhold**, og CSS er dens **udseende**. JavaScript er dens **opførsel**: det, der sker, når man klikker, skriver eller venter. Her lærer du sproget fra bunden — hele tiden sammenlignet med den C#, du allerede kan.\n\nBagefter kan du få knapper til at gøre noget, læse det, brugeren skriver, ændre siden, tegne og animere på et `canvas` og få ting til at ske efter et stykke tid. Det er det, du skal bruge i Razor-siderne i dit eksamensprojekt — og i modul 15, hvor JavaScript henter data fra en server.",
  video: ["11_Man_Graphics+JS_del1.mp4 (2 t 4 min)", "11_Man_Graphics+JS_del2.mp4 (1 t 47 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m14l1", titel: "JavaScript i siden: variabler og typer", min: 16,
    ord: [
      ["JavaScript", "Programmeringssproget, der kører i browseren. Det giver en side opførsel: klik, beregninger, ændringer på siden."],
      ["<script>", "HTML-tagget, der indeholder JavaScript — eller henter det fra en fil med `src`."],
      ["Konsol (Console)", "Fanen i browserens udviklerværktøj, hvor `console.log` skriver, og hvor fejl vises med rødt."],
      ["console.log", "Skriver en værdi i konsollen. JavaScripts svar på `Console.WriteLine`."],
      ["let", "Laver en variabel, der kan få en ny værdi senere."],
      ["const", "Laver en variabel, der ikke kan få en ny værdi. Brug den, når værdien ikke skal skifte."],
      ["Dynamisk type", "Variablen har ingen fast type. Den samme variabel kan indeholde et tal og senere en tekst."],
      ["typeof", "Fortæller, hvilken type en værdi har lige nu: \"number\", \"string\", \"boolean\" …"],
      ["=== (streng lighed)", "Sammenligner både værdi og type. `5 === \"5\"` er false. Brug altid `===` frem for `==`."]
    ],
    trin: [
      { t: "laes", h: "Tredje sprog på siden",
        md: "En webside har tre lag. **HTML** siger, hvad der står på siden. **CSS** siger, hvordan det ser ud. **JavaScript** siger, hvad der **sker** — når man klikker, skriver eller venter.\n\nJavaScript kører **i browseren**, på brugerens egen computer. Din C# i ASP.NET kører på **serveren**. Det er to forskellige programmer, der samarbejder.\n\nSproget ligner C# meget: tuborgklammer, semikolon, `if`, `for` og `while`. Koden skrives i et `<script>`-tag, typisk **sidst** i `body`, så HTML-elementerne findes, når koden kører.",
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Min første JavaScript</title>
</head>
<body>
    <h1>Hej</h1>

    <script>
        console.log("Hej fra JavaScript");
        console.log(2 + 3);
    </script>
</body>
</html>`,
        noter: [
          ["<script> … </script>", "Alt mellem de to tags er JavaScript, ikke HTML."],
          ["console.log(…)", "Skriver i browserens **konsol** — samme job som `Console.WriteLine` i C#."],
          ["Sidst i body", "Browseren læser siden oppefra. Står scriptet nederst, er `h1` allerede læst, når koden kører."]
        ],
        md2: "Siden viser kun overskriften. Det, `console.log` skriver, ses ikke på selve siden — det står i **konsollen**, som du åbner i næste trin." },
      { t: "ide", h: "Kør din første JavaScript",
        md: "Lav en mappe til dine JavaScript-øvelser, fx `JsOevelser`. Lav en ny fil i den, `index.html`, på samme måde som du lavede HTML-filer i modul 13. Skriv siden fra forrige trin **selv** — kopiér den ikke.",
        win: [
          "Gem filen, og dobbeltklik på den i Stifinder. Den åbner i din browser (Edge eller Chrome).",
          "Tryk **F12**. Udviklerværktøjet åbner. Klik på fanen **Console**.",
          "Du ser de to linjer fra `console.log`. Tryk **F5** for at genindlæse siden, hvis du har ændret filen.",
          "Klik nederst i konsollen, skriv `10 * 4`, og tryk Enter. Konsollen kan også bruges som lommeregner til at prøve små stykker JavaScript."
        ],
        mac: [
          "Gem filen, og dobbeltklik på den i Finder. Den åbner i din browser. Brug gerne **Chrome** — det er den, beskrivelserne her passer til.",
          "Tryk **⌥⌘I** (Option + Cmd + I). Udviklerværktøjet åbner. Klik på fanen **Console**.",
          "Du ser de to linjer fra `console.log`. Tryk **⌘R** for at genindlæse siden, hvis du har ændret filen.",
          "Klik nederst i konsollen, skriv `10 * 4`, og tryk Enter. Konsollen kan også bruges som lommeregner til at prøve små stykker JavaScript."
        ],
        sprog: "text",
        output: "Hej fra JavaScript\n5",
        md2: "Konsollen er dit vigtigste værktøj i JavaScript. **Fejl vises her med rødt** — siden selv siger ingenting, når koden går i stykker. Så når en knap \"ikke gør noget\", er det første skridt altid: åbn konsollen, og læs den røde linje." },
      { t: "laes", h: "Variabler: let og const",
        md: "I C# skriver du typen foran variablen: `int alder = 25;`. I JavaScript skriver du **ingen type** — kun `let` eller `const`.\n\n- `let` laver en variabel, der **kan få en ny værdi**.\n- `const` laver en variabel, der **ikke kan få en ny værdi**. Prøver du, går programmet ned med en fejl.\n\nReglen: brug `const`, og skift kun til `let`, når værdien faktisk skal ændres.",
        sprog: "js",
        kode: R`let alder = 25;
alder = alder + 1;

const navn = "Peter";

console.log(navn);
console.log(alder);`,
        noter: [
          ["let alder = 25;", "Som `int alder = 25;` i C# — bare uden type."],
          ["alder = alder + 1;", "Ny værdi. Det må man, fordi den er lavet med `let`."],
          ["const navn = \"Peter\";", "Kan ikke ændres. `navn = \"Bo\";` ville give fejlen *Assignment to constant variable*."]
        ],
        output: "Peter\n26",
        md2: "Du vil se et tredje ord, `var`, i ældre kode og i underviserens eksempler. Det er den gamle måde at lave variabler på. Den virker, men har nogle mærkelige regler for, hvor variablen gælder, så i ny kode bruger man `let` og `const`." },
      { t: "forudsig", sprog: "js",
        kode: R`let x = 5;
x = x + 2;
const y = x * 2;
console.log(x);
console.log(y);`,
        output: "7\n14",
        fordi: "`x` starter som 5 og bliver 7. `y` beregnes **én gang** ud fra `x` på det tidspunkt: 7 · 2 = 14." },
      { t: "laes", h: "Dynamiske typer og typeof",
        md: "I C# har en variabel én type for altid. En `int` kan aldrig blive til en `string`. I JavaScript er typerne **dynamiske**: typen hører til **værdien**, ikke til variablen. Den samme variabel kan indeholde et tal og bagefter en tekst.\n\n`typeof` fortæller, hvilken type værdien har **lige nu**.",
        sprog: "js",
        kode: R`let v = 42;
console.log(typeof v);
v = "hej";
console.log(typeof v);
v = true;
console.log(typeof v);
console.log(7 / 2);`,
        noter: [
          ["\"number\"", "Alle tal. JavaScript har **kun én** taltype — ingen forskel på `int`, `double` og `decimal`."],
          ["\"string\"", "Tekst. Den må stå i både `\"…\"` og `'…'`."],
          ["\"boolean\"", "`true` eller `false` — som `bool` i C#."],
          ["7 / 2", "Giver 3.5. Der er ingen heltalsdivision, fordi der ikke findes heltal for sig."]
        ],
        output: "number\nstring\nboolean\n3.5",
        md2: "Læg mærke til **punktummet** i 3.5. JavaScript skriver altid decimaltal med punktum — også på en dansk computer. C# skrev 3,5 med komma, fordi det brugte dansk opsætning." },
      { t: "valg", q: "Hvad skriver `console.log(typeof 3.14);` i JavaScript?",
        svar: ["number", "double", "decimal", "float"],
        ret: 0, fordi: "JavaScript har kun én taltype, `number`. Den dækker både hele tal og decimaltal. `double`, `decimal` og `float` er typer fra C#." },
      { t: "forudsig", q: "Pas på: `+` betyder både \"læg sammen\" og \"sæt tekst sammen\". Hvad skriver programmet?", sprog: "js",
        kode: R`console.log("5" + 3);
console.log("5" * 2);
console.log(1 + 2 + "3");`,
        output: "53\n10\n33",
        fordi: "Er den ene side af `+` en tekst, bliver det **tekst-sammensætning**: `\"5\" + 3` er `\"53\"`. `*` findes kun for tal, så JavaScript laver `\"5\"` om til tallet 5 og regner: 10. I sidste linje regnes fra venstre: `1 + 2` er 3, og `3 + \"3\"` er teksten `\"33\"`. C# ville have nægtet at oversætte `\"5\" * 2` — JavaScript gætter i stedet. Derfor skal du selv holde styr på typerne." },
      { t: "laes", h: "== eller ===",
        md: "JavaScript har **to** måder at sammenligne på:\n\n- `==` laver først typerne om, så de passer, og sammenligner så. Derfor er `5 == \"5\"` **true**.\n- `===` kræver, at **både type og værdi** er ens. `5 === \"5\"` er **false**.\n\n`==` giver overraskelser, så reglen er enkel: **brug altid `===`** og `!==` (\"er ikke lig med\"). Det svarer til `==` og `!=` i C#, hvor typerne aldrig bliver lavet om i smug.\n\nVil du have et tal ud af en tekst, så sig det selv med `Number(…)` — JavaScripts svar på `int.Parse`.",
        sprog: "js",
        kode: R`console.log(5 == "5");
console.log(5 === "5");
console.log(5 !== "5");
console.log(Number("5") === 5);`,
        output: "true\nfalse\ntrue\ntrue",
        md2: "JavaScript skriver `true` og `false` med små bogstaver. C# skrev `True` og `False`." },
      { t: "udfyld", q: "Momsen ændres aldrig, men totalen ændres. Vælg det rigtige ord til hver variabel.", sprog: "js",
        kode: R`[[const|let]] moms = 0.25;
[[let]] total = 100;
total = total + total * moms;
console.log(total);`,
        output: "125",
        fordi: "`moms` skifter aldrig værdi, så den bør være `const` (`let` ville også virke, men siger ikke, at den er fast). `total` får en ny værdi i linje 3, så den **skal** være `let`." },
      { t: "fejl", logisk: true, sprog: "js",
        q: "Brugeren har skrevet 4 i et felt på siden. Tekst fra et felt er **altid** en string. Programmet skal skrive `Rigtigt!`, men skriver `Forkert`. Hvilken linje er skyld i det?",
        kode: R`const svar = "4";
if (svar === 4) {
    console.log("Rigtigt!");
} else {
    console.log("Forkert");
}`,
        linje: 2,
        output: "Forkert",
        fordi: "`svar` er teksten `\"4\"`, og `===` sammenligner også typen: en string er aldrig lig med et number. Lav teksten om til et tal først: `Number(svar) === 4`. (Med `==` ville det tilfældigvis virke, men så har du skjult problemet i stedet for at løse det.)",
        rettet: R`const svar = "4";
if (Number(svar) === 4) {
    console.log("Rigtigt!");
} else {
    console.log("Forkert");
}`,
        rettetOutput: "Rigtigt!" },
      { t: "skriv", sprog: "js",
        q: "Lav en konstant `navn` med teksten `\"Peter\"` og en variabel `alder` med værdien 25, som skal kunne ændres. Skriv derefter `navn` ud i konsollen med `console.log`.",
        tjek: [
          [/const navn=("Peter"|'Peter');/, "Lav konstanten: `const navn = \"Peter\";`"],
          [/let alder=25;/, "Lav variablen med `let`: `let alder = 25;`"],
          [/console\.log\(navn\);/, "Skriv navnet ud: `console.log(navn);`"],
          [/\bvar /, "Brug `let` eller `const`, ikke det gamle `var`", "ikke"],
          [/(int|string) /, "JavaScript har ingen typer foran variablen — skriv `let` eller `const`", "ikke"]
        ],
        forkert: ["let navn = \"Peter\";\nlet alder = 25;\nconsole.log(navn);", "const navn = \"Peter\";\nint alder = 25;\nconsole.log(navn);"],
        loesning: R`const navn = "Peter";
let alder = 25;
console.log(navn);`,
        output: "Peter" },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad betyder det, at JavaScript har **dynamiske typer**, og hvorfor bør man bruge `===` frem for `==`?",
        svar: "I C# har en variabel en **fast type**, som compileren tjekker. I JavaScript hører typen til **værdien**, så den samme variabel kan indeholde et tal og senere en tekst, og fejl i typerne opdages først, når programmet kører. `==` laver typerne om, før den sammenligner, så `5 == \"5\"` er true. `===` kræver, at **både type og værdi** er ens. Det giver færre overraskelser, så man bruger altid `===` og laver selv tekst om til tal med `Number`.",
        noegle: ["fast type", "værdien", "type og værdi", "===", "Number"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m14l2", titel: "Funktioner, template literals og arrays", min: 18,
    ord: [
      ["Funktion", "JavaScripts ord for en metode. Laves med `function navn(…) { … }` og har hverken returtype eller parametertyper."],
      ["Arrow function", "En kort funktion skrevet med pil: `x => x * 2`. Samme idé som lambda-udtryk i C#."],
      ["Template literal", "Tekst i backticks med huller: `${udtryk}`. Svarer til `$\"…{udtryk}…\"` i C#."],
      ["Array (JavaScript)", "En liste af værdier i firkantede klammer: `[3, 7, 1]`. Kan vokse som en `List` i C#."],
      ["push", "Lægger et element til sidst i et array. Som `Add` på en List."],
      ["forEach", "Kalder en funktion én gang for hvert element i et array."],
      ["map", "Laver et nyt array, hvor hvert element er lavet om af en funktion. Som `Select` i LINQ."],
      ["filter", "Laver et nyt array med kun de elementer, der opfylder en betingelse. Som `Where` i LINQ."]
    ],
    trin: [
      { t: "laes", h: "Funktioner",
        md: "En **funktion** er JavaScripts ord for en metode. Den skrives med ordet `function`. Der står **ingen returtype** og **ingen typer på parametrene** — kun navnene.\n\nSammenlign med C#: `static int LaegSammen(int a, int b)` bliver til `function laegSammen(a, b)`. Navne på funktioner og variabler skrives med lille begyndelsesbogstav i JavaScript (camelCase).",
        sprog: "js",
        kode: R`function laegSammen(a, b) {
    return a + b;
}

console.log(laegSammen(2, 3));
console.log(laegSammen("2", 3));`,
        noter: [
          ["function laegSammen(a, b)", "En funktion med to parametre. Ingen typer."],
          ["return a + b;", "Sender resultatet tilbage, præcis som i C#."],
          ["laegSammen(\"2\", 3)", "Intet stopper dig i at sende en tekst ind. Så sætter `+` tekst sammen: \"23\"."]
        ],
        output: "5\n23",
        md2: "Det er prisen for de dynamiske typer: compileren hjælper dig ikke. Du må selv sørge for at sende de rigtige værdier ind." },
      { t: "forudsig", sprog: "js",
        kode: R`function dobbelt(x) {
    return x * 2;
}

function hils(navn) {
    console.log("Hej " + navn);
}

hils("Bo");
console.log(dobbelt(dobbelt(3)));`,
        output: "Hej Bo\n12",
        fordi: "`hils` skriver selv, og returnerer ingenting. I sidste linje kører den inderste `dobbelt(3)` først og giver 6. Så kører `dobbelt(6)` og giver 12." },
      { t: "laes", h: "Tre måder at skrive en funktion",
        md: "I JavaScript er en funktion også en **værdi**. Den kan gemmes i en variabel, ligesom et tal. Derfor findes der tre skrivemåder, og du møder dem alle tre:",
        sprog: "js",
        kode: R`function a(x) {
    return x + 1;
}

const b = function (x) {
    return x + 1;
};

const c = x => x + 1;

console.log(a(1), b(1), c(1));`,
        noter: [
          ["function a(x) { … }", "**Funktionserklæring.** Den klassiske form."],
          ["const b = function (x) { … };", "**Funktionsudtryk.** En funktion uden navn, gemt i en variabel."],
          ["const c = x => x + 1;", "**Arrow function** (pilefunktion). Den korte form — samme idé som lambda-udtrykket `x => x + 1` i C#. Står der kun ét udtryk efter pilen, bliver det automatisk returneret."],
          ["console.log(a(1), b(1), c(1))", "`console.log` kan få flere værdier. De skrives med mellemrum imellem."]
        ],
        output: "2 2 2",
        md2: "Har en arrow function flere parametre, skal de i parentes: `(a, b) => a + b`. Skal den have flere linjer, bruger du tuborgklammer og `return`: `(a, b) => { const s = a + b; return s; }`." },
      { t: "udfyld", q: "Lav en arrow function, der ganger et tal med sig selv.", sprog: "js",
        kode: R`[[const|let|var]] kvadrat = x [[=>]] x * x;
console.log(kvadrat(5));`,
        output: "25",
        fordi: "Funktionen gemmes i en `const`. Pilen `=>` skiller parameteren fra det, der skal beregnes." },
      { t: "laes", h: "Template literals: tekst med huller",
        md: "I C# skriver du `$\"Hej {navn}\"`. I JavaScript hedder det en **template literal**: teksten står i **backticks** — det skrå tegn ` — og hullerne skrives med **dollartegn og tuborgklammer**.",
        sprog: "js",
        kode: J`const navn = "Peter";
const point = 7;

console.log(´Hej €{navn}!´);
console.log(´Du har €{point} point. Dobbelt: €{point * 2}´);`,
        noter: [
          ["`…`", "Backticks. Med almindelige anførselstegn virker hullerne ikke — så står dollartegnet bare i teksten."],
          ["${navn}", "Et hul. Værdien af `navn` sættes ind her."],
          ["${point * 2}", "Der må stå et helt udtryk i hullet, ligesom i C#."]
        ],
        output: "Hej Peter!\nDu har 7 point. Dobbelt: 14",
        md2: "{{På et dansk Windows-tastatur får du en backtick med Shift + tasten til venstre for Backspace og derefter mellemrum.||På et dansk Mac-tastatur er det Shift + tasten med ´ (til venstre for slettetasten) og derefter mellemrum. Virker det ikke på dit tastatur, så kopiér en backtick fra koden her.}} Template literals må også gå over flere linjer. Det bliver praktisk, når du skal bygge et stykke HTML i JavaScript." },
      { t: "forudsig", sprog: "js",
        kode: J`const vare = "kaffe";
const pris = 45;
const antal = 2;

console.log(´€{antal} x €{vare} = €{antal * pris} kr.´);
console.log("€{vare}");`,
        output: "2 x kaffe = 90 kr.\n${vare}",
        fordi: "Den første tekst står i backticks, så hullerne bliver udfyldt. Den anden står i almindelige anførselstegn, så `${vare}` er bare tegn — det er en klassisk fejl, når man glemmer backticks." },
      { t: "laes", h: "Arrays",
        md: "Et **array** i JavaScript skrives i firkantede klammer. Det svarer mest til en `List` i C#: det kan **vokse**, og der er ingen fast størrelse.\n\n- `push` lægger til sidst (som `Add`).\n- `length` er antallet (C#'s array hed også `Length`, men med stort L).\n- `for (const f of frugter)` løber elementerne igennem — som `foreach` i C#.",
        sprog: "js",
        kode: R`const frugter = ["æble", "banan"];
frugter.push("citron");

console.log(frugter.length);
console.log(frugter[0]);

for (const f of frugter) {
    console.log(f);
}

console.log(frugter.join(", "));`,
        noter: [
          ["const frugter = [ … ]", "`const` betyder, at `frugter` altid peger på **det samme** array. Indholdet må gerne ændres."],
          ["frugter[0]", "Indeks fra 0, som i C#."],
          ["for (const f of frugter)", "Ordet er `of`, ikke `in`. (`in` betyder noget andet i JavaScript.)"],
          ["join(\", \")", "Sætter elementerne sammen til én tekst — som `string.Join` i C#."]
        ],
        output: "3\næble\næble\nbanan\ncitron\næble, banan, citron" },
      { t: "spor", sprog: "js", slut: false,
        q: "Følg løkken linje for linje. Skriv, hvad `sum` og `i` er, lige efter at linjen er udført. Linje 3 kører flere gange: første gang sætter den `i` til 0, og bagefter lægger den 1 til `i`, før betingelsen tjekkes.",
        kode: R`const tal = [4, 1, 6];
let sum = 0;
for (let i = 0; i < tal.length; i++) {
    sum = sum + tal[i];
}
console.log(sum);`,
        kolonner: ["sum", "i"],
        raekker: [[2, "=0", "=–"], [3, "=0", "=0"], [4, "4", "0"], [3, "4", "1"], [4, "5", "1"], [3, "5", "2"], [4, "11", "2"], [3, "11", "3"]],
        output: "11",
        fordi: "`tal[i]` er 4, så 1, så 6. Summen vokser 0 → 4 → 5 → 11. Efter sidste runde bliver `i` til 3, betingelsen `3 < 3` er falsk, og løkken stopper. `for`-løkken skrives præcis som i C# — bare med `let` i stedet for `int`." },
      { t: "laes", h: "forEach, map og filter",
        md: "Arrays har metoder, der tager en **funktion** som parameter. Det er samme idé som LINQ i C#, og du skriver typisk funktionen som en arrow function lige på stedet.\n\n- `forEach` kører funktionen for hvert element.\n- `map` laver et **nyt** array, hvor hvert element er omregnet. Det svarer til `Select`.\n- `filter` laver et **nyt** array med de elementer, der opfylder betingelsen. Det svarer til `Where`.",
        sprog: "js",
        kode: R`const priser = [100, 250, 40];

priser.forEach(p => console.log(p));

const medMoms = priser.map(p => p * 1.25);
console.log(medMoms.join(" "));

const dyre = priser.filter(p => p > 50);
console.log(dyre.join(" "));`,
        noter: [
          ["p => console.log(p)", "Kaldes tre gange, én gang pr. pris."],
          ["map(p => p * 1.25)", "Hvert element ganges med 1,25. Resultatet er et nyt array med tre elementer."],
          ["filter(p => p > 50)", "Kun de priser, hvor betingelsen er `true`, kommer med."]
        ],
        output: "100\n250\n40\n125 312.5 50\n100 250",
        md2: "`map` og `filter` **ændrer ikke** det oprindelige array. `priser` er stadig `[100, 250, 40]`." },
      { t: "forudsig", sprog: "js",
        kode: R`const navne = ["anna", "bo", "carl"];
const store = navne.map(n => n.toUpperCase());
const korte = navne.filter(n => n.length <= 3);

console.log(store.join(","));
console.log(korte.length);
console.log(navne[0]);`,
        output: "ANNA,BO,CARL\n1\nanna",
        fordi: "`map` laver hvert navn om til store bogstaver med `toUpperCase()` — JavaScripts udgave af `ToUpper()`. Kun \"bo\" har højst 3 bogstaver, så `korte` har ét element. `navne` er uændret — `map` laver et **nyt** array." },
      { t: "orden", sprog: "js",
        q: "Sæt linjerne i rækkefølge, så funktionen regner gennemsnittet af tallene ud, og programmet skriver 5.", alt: [[7, 0, 1, 2, 3, 4, 5, 6]],
        linjer: [
          R`function gennemsnit(tal) {`,
          R`    let sum = 0;`,
          R`    for (const t of tal) {`,
          R`        sum += t;`,
          R`    }`,
          R`    return sum / tal.length;`,
          R`}`,
          R`console.log(gennemsnit([2, 4, 9]));`
        ],
        output: "5",
        fordi: "Summen skal starte på 0 **før** løkken. Inde i løkken lægges hvert tal til. Først når løkken er færdig, kan man dividere med antallet. (2 + 4 + 9) / 3 = 5." },
      { t: "skriv", sprog: "js",
        q: "Skriv en arrow function, der gemmes i en `const` med navnet `moms`. Den tager én parameter, `pris`, og returnerer `pris * 1.25`.",
        efter: R`console.log(moms(100));`,
        tjek: [
          [/const moms=/, "Gem funktionen i en konstant: `const moms = …`"],
          [/=\(?pris\)?=>/, "Brug en arrow function med parameteren `pris`: `pris => …`"],
          [/=>(pris\*1\.25|\{return pris\*1\.25;?\})/, "Returnér `pris * 1.25`"],
          [/function/, "Brug pilen `=>` i stedet for ordet `function`", "ikke"]
        ],
        forkert: ["function moms(pris) { return pris * 1.25; }", "const moms = pris => pris * 25;"],
        loesning: R`const moms = pris => pris * 1.25;`,
        output: "125" },
      { t: "ide", h: "Karakterer i konsollen",
        md: "Lav en ny fil `karakterer.html` i din mappe med et `<script>`-tag. Skriv programmet nedenfor **selv**, åbn siden, og se resultatet i konsollen ({{**F12**||**⌥⌘I**}} → **Console**).",
        sprog: "js",
        kode: J`const karakterer = [12, 7, 4, 10, 2];

function gennemsnit(tal) {
    let sum = 0;
    for (const t of tal) {
        sum += t;
    }
    return sum / tal.length;
}

const gode = karakterer.filter(k => k >= 7);
const tekster = karakterer.map(k => ´[€{k}]´);

console.log(´Gennemsnit: €{gennemsnit(karakterer)}´);
console.log(´Mindst 7: €{gode.join(", ")}´);
console.log(tekster.join(" "));`,
        output: "Gennemsnit: 7\nMindst 7: 12, 7, 10\n[12] [7] [4] [10] [2]",
        md2: "Udvid selv: skriv en funktion `stoerste(tal)`, der finder den højeste karakter med en løkke — samme algoritme som i C#. Prøv derefter at skrive en karakter forkert som tekst, fx `\"10\"`, og se, hvad der sker med gennemsnittet." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad gør `map` og `filter` på et array, og hvad svarer de til i C#?",
        svar: "Begge tager en **funktion** — typisk en arrow function — og laver et **nyt array** uden at ændre det gamle. `map` kører funktionen på **hvert element** og samler resultaterne, så det nye array er lige så langt. Det svarer til `Select` i LINQ. `filter` beholder kun de elementer, hvor funktionen giver **true**, så det svarer til `Where`.",
        noegle: ["funktion", "nyt array", "hvert element", "Select", "Where"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m14l3", titel: "Objekter og JSON", min: 16,
    ord: [
      ["Objekt-literal", "Et objekt skrevet direkte i tuborgklammer: `{ navn: \"Bo\", alder: 30 }`. Der skal ikke være en klasse først."],
      ["Property (JavaScript)", "Et navn med en værdi i et objekt. Kan læses, ændres og tilføjes, mens programmet kører."],
      ["undefined", "Værdien af noget, der ikke findes eller ikke har fået en værdi — fx en property, der ikke er sat."],
      ["Klamme-notation", "`obj[\"navn\"]` i stedet for `obj.navn`. Bruges, når navnet på propertyen ligger i en variabel."],
      ["JSON", "JavaScript Object Notation: en tekstform til data, som ligner et JavaScript-objekt. Bruges, når browser og server sender data til hinanden."],
      ["JSON.stringify", "Laver et objekt om til JSON-tekst."],
      ["JSON.parse", "Laver JSON-tekst om til et objekt igen."]
    ],
    trin: [
      { t: "laes", h: "Et objekt uden en klasse",
        md: "I C# skal du først skrive en `class Person`, før du kan lave et objekt. I JavaScript kan du skrive objektet **direkte** i tuborgklammer. Det hedder en **objekt-literal**.\n\nHvert par `navn: værdi` er en **property**. Du læser og ændrer dem med punktum, som i C#. Og du kan **tilføje** nye properties, mens programmet kører.",
        sprog: "js",
        kode: R`const person = { navn: "Peter", alder: 25 };

person.alder++;
person.by = "Aarhus";

console.log(person.navn);
console.log(person.alder);
console.log(person.by);`,
        noter: [
          ["{ navn: \"Peter\", alder: 25 }", "Et objekt med to properties. Parrene adskilles med komma."],
          ["person.alder++", "Læg 1 til, ligesom i C#."],
          ["person.by = \"Aarhus\";", "Propertyen `by` fandtes ikke — nu gør den. Det kan man ikke i C#."]
        ],
        output: "Peter\n26\nAarhus",
        md2: "JavaScript har også klasser, ligesom C#. Dem lærer du i modul 15. Objekt-literals bruges til alt det små — og det er præcis den form, data har, når de kommer fra en server." },
      { t: "forudsig", sprog: "js",
        kode: R`const bil = { maerke: "Toyota", km: 1000 };
bil.km = bil.km + 500;
bil.farve = "rød";

console.log(bil.km);
console.log(bil.farve);
console.log(bil.pris);`,
        output: "1500\nrød\nundefined",
        fordi: "`km` ændres til 1500, og `farve` bliver tilføjet. `pris` findes ikke. I C# ville det være en compilerfejl — JavaScript giver bare værdien `undefined` (\"ikke defineret\"). Kommer der `undefined` et mærkeligt sted, har du ofte stavet et property-navn forkert." },
      { t: "laes", h: "Klamme-notation: navnet i en variabel",
        md: "Du kan også skrive `obj[\"navn\"]` i stedet for `obj.navn`. Det er nyttigt, når navnet på propertyen ligger i en **variabel**.\n\nDermed kan et objekt bruges som en `Dictionary` i C#: navnet er nøglen. Og `for (const k in obj)` løber alle navnene igennem.",
        sprog: "js",
        kode: R`const lager = { kaffe: 12, te: 0 };

const vare = "kaffe";
console.log(lager[vare]);

lager["kakao"] = 3;

for (const k in lager) {
    console.log(k + ": " + lager[k]);
}`,
        noter: [
          ["lager[vare]", "Slå op med den tekst, der ligger i `vare` — altså `\"kaffe\"`."],
          ["lager[\"kakao\"] = 3;", "Tilføj en ny property med klamme-notation."],
          ["for (const k in lager)", "Med `in` får du **navnene** på properties. (Med `of` får du elementerne i et array.)"]
        ],
        output: "12\nkaffe: 12\nte: 0\nkakao: 3" },
      { t: "udfyld", q: "Sæt prisen til 35, og skriv navnet på produktet ud.", sprog: "js",
        kode: R`const produkt = { navn: "Te", pris: 30 };
produkt.[[pris]] = 35;
console.log(produkt.pris);
console.log(produkt.[[navn]]);`,
        output: "35\nTe",
        fordi: "Med punktum og navnet på propertyen kan du både ændre og læse den." },
      { t: "laes", h: "Arrays af objekter",
        md: "Et array af objekter svarer til `List<Produkt>` i C#. Det er den form, data næsten altid har på en webside — en liste af varer, kunder eller ordrer. Med `filter` og `map` fra forrige lektion kan du sortere fra og plukke ud, præcis som med LINQ.",
        sprog: "js",
        kode: R`const varer = [
    { navn: "Kaffe", pris: 45 },
    { navn: "Te", pris: 30 },
    { navn: "Kakao", pris: 52 }
];

const dyre = varer.filter(v => v.pris > 40);
const navne = dyre.map(v => v.navn);

console.log(navne.join(", "));
console.log(varer[1].navn);`,
        noter: [
          ["varer.filter(v => v.pris > 40)", "Som `.Where(v => v.Pris > 40)` i C#."],
          ["dyre.map(v => v.navn)", "Som `.Select(v => v.Navn)` — kun navnene."],
          ["varer[1].navn", "Først indeks i arrayet, så punktum og propertyen."]
        ],
        output: "Kaffe, Kakao\nTe" },
      { t: "forudsig", sprog: "js",
        kode: R`const elever = [
    { navn: "Maja", karakter: 10 },
    { navn: "Ali", karakter: 0 },
    { navn: "Ida", karakter: 4 }
];

const bestaaet = elever.filter(e => e.karakter >= 2);
console.log(bestaaet.length);
console.log(bestaaet.map(e => e.navn).join(" og "));`,
        output: "2\nMaja og Ida",
        fordi: "Ali har 0 og er ikke med. De to andre har mindst 2. `map` plukker navnene ud, og `join` sætter dem sammen med \" og \" imellem." },
      { t: "spor", sprog: "js", slut: false,
        q: "Objekter i JavaScript er **referencetyper**, præcis som klasser i C#. Følg programmet, og skriv værdierne lige efter hver linje. Husk: antallet af objekter er antallet af `{ … }`, der laves.",
        kode: R`const a = { point: 1 };
const b = a;
b.point = 5;
let c = a.point;
a.point = a.point + c;
console.log(a.point, b.point, c);`,
        kolonner: ["a.point", "b.point", "c"],
        raekker: [[1, "=1", "=–", "=–"], [2, "=1", "=1", "=–"], [3, "5", "5", "–"], [4, "5", "5", "5"], [5, "10", "10", "5"]],
        output: "10 10 5",
        fordi: "Der laves kun **ét** objekt (linje 1). Linje 2 kopierer **referencen**, så `a` og `b` peger på det samme objekt — derfor ændrer `b.point = 5` også det, `a` ser. `c` er et tal, ikke et objekt: linje 4 kopierer **værdien** 5 over i `c`, og den bliver ved med at være 5." },
      { t: "laes", h: "JSON: objekter som tekst",
        md: "Når browseren og serveren skal sende data til hinanden, sender de **tekst**. Formatet hedder **JSON** (JavaScript Object Notation) og ligner en objekt-literal — med to strenge regler: navnene skal stå i **dobbelte anførselstegn**, og tekster også.\n\n- `JSON.stringify(obj)` laver et objekt om til JSON-tekst.\n- `JSON.parse(tekst)` laver JSON-tekst om til et objekt.\n\nDet er de samme to ting, som `JsonSerializer.Serialize` og `Deserialize` gør i C#.",
        sprog: "js",
        kode: R`const p = { navn: "Peter", alder: 25 };
const tekst = JSON.stringify(p);
console.log(tekst);
console.log(typeof tekst);

const igen = JSON.parse('{"navn":"Bo","alder":30}');
console.log(igen.alder + 1);`,
        noter: [
          ["JSON.stringify(p)", "Objekt → tekst. Læg mærke til anførselstegnene om `navn` og `alder` i resultatet."],
          ["typeof tekst", "Det er en `string`. Du kan ikke skrive `tekst.navn`."],
          ["JSON.parse('…')", "Tekst → objekt. Nu kan du bruge `igen.alder` som et tal. Teksten står i enkelte anførselstegn, så de dobbelte kan være inden i."]
        ],
        output: "{\"navn\":\"Peter\",\"alder\":25}\nstring\n31",
        md2: "Når din ASP.NET Web API i modul 19 sender en liste af produkter, er det **JSON**, der kommer frem til browseren. Og i modul 15 henter du den med JavaScript og laver den om med `JSON.parse`." },
      { t: "valg", q: "Hvilken af disse er **gyldig JSON**?",
        svar: ["{\"navn\": \"Bo\", \"alder\": 30}", "{navn: \"Bo\", alder: 30}", "{'navn': 'Bo', 'alder': 30}", "{\"navn\": \"Bo\", \"alder\": 30,}"],
        ret: 0, fordi: "JSON kræver **dobbelte** anførselstegn om både navne og tekster, og der må ikke stå et komma efter det sidste par. Den anden er en fin JavaScript-objekt-literal, men ikke JSON. `JSON.parse` ville give en fejl på de tre forkerte." },
      { t: "forudsig", sprog: "js",
        kode: R`const json = '[{"navn":"Kaffe","pris":45},{"navn":"Te","pris":30}]';
const varer = JSON.parse(json);

console.log(varer.length);
console.log(varer[1].navn);
console.log(varer[0].pris + varer[1].pris);`,
        output: "2\nTe\n75",
        fordi: "JSON-teksten er et array med to objekter. Efter `JSON.parse` er det et rigtigt array, så `length`, indeks og properties virker. Priserne er tal i JSON (uden anførselstegn), så `+` lægger sammen: 45 + 30 = 75." },
      { t: "fejl", logisk: true, sprog: "js",
        q: "Serveren har sendt JSON-teksten `{\"antal\": 5}`. Programmet skal skrive 6, men skriver `NaN` (\"Not a Number\" — resultatet af regning med noget, der ikke er et tal). Hvilken linje er forkert?",
        kode: R`const data = '{"antal": 5}';
const antal = data.antal;
console.log(antal + 1);`,
        linje: 2,
        output: "NaN",
        fordi: "`data` er en **tekst**, ikke et objekt. En tekst har ingen property `antal`, så `data.antal` er `undefined`, og `undefined + 1` giver `NaN`. Teksten skal først laves om til et objekt med `JSON.parse(data)`.",
        rettet: R`const data = '{"antal": 5}';
const antal = JSON.parse(data).antal;
console.log(antal + 1);`,
        rettetOutput: "6" },
      { t: "skriv", sprog: "js",
        q: "Lav et objekt `bog` med propertyen `titel` = `\"Dune\"` og derefter `sider` = 412 (i den rækkefølge). Lav det om til JSON-tekst med `JSON.stringify`, gem teksten i en `const` med navnet `json`, og skriv `json` ud med `console.log`.",
        tjek: [
          [/const bog=\{titel:("Dune"|'Dune'),sider:412\};/, "Lav objektet: `const bog = { titel: \"Dune\", sider: 412 };`"],
          [/const json=JSON\.stringify\(bog\);/, "Lav det om til tekst: `const json = JSON.stringify(bog);`"],
          [/console\.log\(json\);/, "Skriv teksten ud: `console.log(json);`"]
        ],
        forkert: ["const bog = { titel: \"Dune\", sider: 412 };\nconst json = JSON.parse(bog);\nconsole.log(json);"],
        loesning: R`const bog = { titel: "Dune", sider: 412 };
const json = JSON.stringify(bog);
console.log(json);`,
        output: "{\"titel\":\"Dune\",\"sider\":412}" },
      { t: "ide", h: "Film som objekter og JSON",
        md: "Lav en ny fil `film.html` med et `<script>`-tag, og skriv programmet **selv**. Åbn siden, og se resultatet i konsollen.",
        sprog: "js",
        kode: J`const film = [
    { titel: "Matrix", aar: 1999, minutter: 136 },
    { titel: "Dune", aar: 2021, minutter: 155 },
    { titel: "Up", aar: 2009, minutter: 96 }
];

const nye = film.filter(f => f.aar >= 2000);
for (const f of nye) {
    console.log(´€{f.titel} (€{f.aar}), €{f.minutter} min.´);
}

const json = JSON.stringify(nye);
console.log(json);

const kopi = JSON.parse(json);
console.log(kopi[0].titel === nye[0].titel);`,
        output: "Dune (2021), 155 min.\nUp (2009), 96 min.\n[{\"titel\":\"Dune\",\"aar\":2021,\"minutter\":155},{\"titel\":\"Up\",\"aar\":2009,\"minutter\":96}]\ntrue",
        md2: "Skriv også `console.log(nye);` uden `JSON.stringify`. Konsollen viser så objekterne, og du kan klikke på den lille pil og folde dem ud — en god måde at se, hvad der ligger i en variabel. Udvid selv: læg det samlede antal minutter sammen med en løkke, og skriv det ud." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er JSON, og hvorfor er det vigtigt i en webapplikation?",
        svar: "JSON er en **tekstform** til data, som ligner et JavaScript-objekt, men hvor navne og tekster står i dobbelte anførselstegn. Når browseren og **serveren** skal sende data til hinanden, sender de tekst, og JSON er det almindelige format — fx når en Web API sender en liste af produkter. I JavaScript laver `JSON.stringify` et objekt om til tekst, og `JSON.parse` laver teksten om til et objekt igen. I C# gør `JsonSerializer` det samme.",
        noegle: ["tekst", "serveren", "stringify", "parse", "Web API"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m14l4", titel: "DOM: JavaScript ændrer siden", min: 20,
    ord: [
      ["DOM", "Document Object Model: browserens udgave af siden som objekter. Hvert HTML-element bliver til et objekt, som JavaScript kan læse og ændre."],
      ["document", "Objektet, der er hele siden. Herfra finder man alle elementerne."],
      ["getElementById", "Finder det ene element med et bestemt `id`. Giver `null`, hvis det ikke findes."],
      ["querySelector", "Finder det første element, der passer til en CSS-selector, fx `\"#knap\"` eller `\".pris\"`."],
      ["textContent", "Teksten inde i et element. Sættes den, vises den som ren tekst."],
      ["innerHTML", "HTML-koden inde i et element. Sættes den, bliver tags til rigtige elementer."],
      ["Event (hændelse)", "Noget, der sker på siden: et klik, et tastetryk, en formular, der sendes."],
      ["addEventListener", "Kobler en funktion til en event, så funktionen kører, hver gang eventen sker."],
      ["value", "Det, brugeren har skrevet i et `input`-felt. Er altid en string."]
    ],
    trin: [
      { t: "laes", h: "Siden som objekter: DOM",
        md: "Når browseren læser din HTML, bygger den et **objekt** for hvert element: et for `h1`, et for hver `p`, et for hver knap. Objekterne ligger inden i hinanden, ligesom tags gør. Det hele kaldes **DOM** (Document Object Model).\n\nJavaScript kan **finde** et element i DOM'en og **ændre** det. Browseren opdaterer siden med det samme. Indgangen er objektet `document`, som er hele siden.",
        sprog: "html",
        kode: R`<h1 id="overskrift">Velkommen</h1>
<p>Her står en tekst.</p>

<script>
    const h = document.getElementById("overskrift");
    h.textContent = "Velkommen, Peter";
    h.style.color = "darkblue";
</script>`,
        noter: [
          ["id=\"overskrift\"", "Et `id` fra modul 13. Det skal være unikt på siden — så kan JavaScript finde netop dette element."],
          ["document.getElementById(\"overskrift\")", "Find elementet med det id. Bemærk: ingen `#` her."],
          ["h.textContent = …", "Skift teksten ud. Siden viser den nye tekst."],
          ["h.style.color = …", "Ændr CSS direkte. CSS-egenskaber med bindestreg skrives i camelCase: `background-color` bliver `backgroundColor`."]
        ],
        md2: "Siden viser **Velkommen, Peter** i mørkeblåt. Det, der står i HTML-filen, er uændret — det er kun browserens udgave af siden, JavaScript har ændret." },
      { t: "valg", q: "Siden har ikke noget element med `id=\"pris\"`. Hvad giver `document.getElementById(\"pris\")`?",
        svar: ["null — og prøver man at bruge resultatet, går scriptet i stå med en fejl i konsollen", "Et nyt, tomt element", "Teksten \"pris\"", "undefined, og så sker der ingenting"],
        ret: 0, fordi: "Findes elementet ikke, får du `null`, ligesom et opslag, der ikke finder noget i C#. Skriver du så `.textContent` på det, stopper scriptet med fejlen *Cannot set properties of null*. Det er en af de mest almindelige fejl: et id, der er stavet forskelligt i HTML og JavaScript — eller et script, der står **før** elementet i filen." },
      { t: "laes", h: "Find elementer med CSS-selectors",
        md: "`getElementById` kan kun finde på id. `querySelector` kan finde med **en hvilken som helst CSS-selector** fra modul 13: `#id`, `.klasse` eller et tagnavn. Den giver det **første** element, der passer.\n\n`querySelectorAll` giver **alle** dem, der passer, og du kan løbe dem igennem med `for … of`.",
        sprog: "html",
        kode: R`<button id="gem">Gem</button>
<p class="pris">45</p>
<p class="pris">30</p>

<script>
    const knap = document.querySelector("#gem");
    const foerste = document.querySelector(".pris");
    const alle = document.querySelectorAll(".pris");

    console.log(knap.textContent);
    console.log(foerste.textContent);
    console.log(alle.length);

    for (const p of alle) {
        p.textContent = p.textContent + " kr.";
    }
</script>`,
        noter: [
          ["querySelector(\"#gem\")", "Med `#`, fordi det er en CSS-selector for et id."],
          ["querySelector(\".pris\")", "Kun det første element med klassen `pris`."],
          ["querySelectorAll(\".pris\")", "Alle elementer med klassen. `length` er 2."],
          ["for (const p of alle)", "Begge afsnit får \" kr.\" på."]
        ],
        output: "Gem\n45\n2",
        md2: "Konsollen viser de tre linjer ovenfor, og siden viser **45 kr.** og **30 kr.**" },
      { t: "udfyld", q: "Find elementet med id `titel`, og sæt dets tekst til Hej.", sprog: "js",
        kode: R`document.[[getElementById]]("titel").[[textContent|innerText|innerHTML]] = "Hej";`,
        fordi: "`getElementById` tager id'et **uden** `#`. Til teksten er `textContent` det sikre valg. `innerText` (som underviseren bruger) og `innerHTML` virker også her, fordi teksten ikke indeholder tags." },
      { t: "laes", h: "textContent eller innerHTML",
        md: "Begge sætter indholdet af et element, men de gør det forskelligt:\n\n- `textContent` viser teksten **præcis som den er**. Står der `<b>`, ses tegnene `<b>` på siden.\n- `innerHTML` læser teksten som **HTML**. Står der `<b>`, bliver teksten fed.\n\nDu ser også `innerText` i underviserens kode. Den virker næsten som `textContent`.",
        sprog: "js",
        kode: R`const a = document.getElementById("a");
const b = document.getElementById("b");

a.textContent = "<b>Hej</b>";
b.innerHTML = "<b>Hej</b>";`,
        noter: [
          ["a.textContent = …", "Siden viser: <b>Hej</b> — med tegnene."],
          ["b.innerHTML = …", "Siden viser: **Hej** i fed skrift."]
        ],
        md2: "**Sikkerhedsregel:** sæt aldrig noget, **brugeren har skrevet**, ind med `innerHTML`. Skriver en ondsindet bruger et `<script>` eller et billede med kode i, bliver det til rigtig HTML og kan køre på andres computere. Det angreb hedder **XSS** (cross-site scripting). Til brugerens tekst bruger du `textContent`. Razor i ASP.NET beskytter dig automatisk mod det samme — derfor er det vigtigt at kende forskellen." },
      { t: "valg", q: "Et element `el` får `el.textContent = \"<i>Ny</i>\";`. Hvad viser siden?",
        svar: ["Tegnene <i>Ny</i> præcis som de står", "Ordet Ny i kursiv", "Ingenting — det giver en fejl", "Ordet Ny uden kursiv og uden tags"],
        ret: 0, fordi: "`textContent` laver aldrig tekst om til HTML. Derfor ses tags som almindelige tegn. Med `innerHTML` ville ordet være blevet kursivt." },
      { t: "laes", h: "Reager på et klik: addEventListener",
        md: "En **event** (hændelse) er noget, der sker på siden: et klik, et tastetryk, en formular, der bliver sendt. Med `addEventListener` kobler du en **funktion** til en event. Funktionen kører, hver gang eventen sker.\n\nDet er samme idé som events i C# (modul 10), hvor du skrev fx `klokke.Ringet += …`. Her hedder eventen `\"click\"`, og funktionen skrives tit som en arrow function.",
        sprog: "html",
        kode: R`<button id="knap">Klik på mig</button>
<p id="besked"></p>

<script>
    const knap = document.getElementById("knap");
    const besked = document.getElementById("besked");
    let antal = 0;

    knap.addEventListener("click", () => {
        antal++;
        besked.textContent = "Du har klikket " + antal + " gange";
    });
</script>`,
        noter: [
          ["addEventListener(\"click\", …)", "\"Når der bliver klikket på knappen, så kør denne funktion.\""],
          ["() => { … }", "En arrow function uden parametre og med flere linjer."],
          ["let antal = 0;", "Står uden for funktionen, så tallet huskes mellem klikkene."]
        ],
        md2: "I underviserens eksempler står koden direkte i HTML: `<button onclick=\"…\">`. Det virker også. `addEventListener` holder bare JavaScript og HTML adskilt — samme grund til, at CSS hører hjemme i en CSS-fil og ikke i `style`-attributter. Andre events, du kan bruge: `\"input\"` (når der skrives i et felt), `\"mouseover\"` (musen kommer ind over elementet) og `\"submit\"` (en formular sendes)." },
      { t: "orden", sprog: "js",
        q: "Sæt linjerne i rækkefølge. Knappen viser et tal, og hvert klik skal lægge 1 til tallet på knappen.",
        linjer: [
          R`const knap = document.getElementById("taeller");`,
          R`knap.addEventListener("click", () => {`,
          R`    const nu = Number(knap.textContent);`,
          R`    knap.textContent = nu + 1;`,
          R`});`
        ],
        fordi: "Først skal knappen findes. Så kobles funktionen på. Inde i funktionen læses tallet (som tekst, derfor `Number`), og det nye tal skrives tilbage." },
      { t: "laes", h: "Læs, hvad brugeren skriver: value",
        md: "Det, brugeren har skrevet i et `input`-felt, ligger i propertyen `value`. **Det er altid en string** — også når feltet har `type=\"number\"`. Skal du regne med det, så lav det om med `Number(…)`.\n\nEn `form` fra modul 13 sender som standard siden til serveren og genindlæser den. Vil du håndtere formularen i JavaScript i stedet, lytter du på `\"submit\"` og kalder `e.preventDefault()`, som stopper browserens normale opførsel.",
        sprog: "html",
        kode: R`<form id="formular">
    <label for="alder">Alder:</label>
    <input id="alder" type="number">
    <button>Beregn</button>
</form>
<p id="svar"></p>

<script>
    const formular = document.getElementById("formular");

    formular.addEventListener("submit", e => {
        e.preventDefault();
        const alder = Number(document.getElementById("alder").value);
        document.getElementById("svar").textContent = "Om 10 år er du " + (alder + 10);
    });
</script>`,
        noter: [
          ["e => { … }", "Funktionen får et **event-objekt**, `e`, med oplysninger om det, der skete."],
          ["e.preventDefault()", "Stop formularen i at sende siden afsted. Uden den genindlæses siden, og svaret forsvinder med det samme."],
          [".value", "Teksten i feltet."],
          ["Number(…)", "Lav teksten om til et tal, før der regnes."]
        ],
        md2: "Skriver brugeren 25 og trykker **Beregn** (eller Enter), viser siden **Om 10 år er du 35**. Uden `Number` ville der stå 2510. I en ASP.NET-app sender du som regel formularen til serveren som normalt — JavaScript bruges så til ting, der skal ske, **før** den sendes, eller uden at siden genindlæses." },
      { t: "fejl", logisk: true, sprog: "js",
        q: "Siden har to felter og et afsnit med id `svar`. Brugeren skriver 2 og 3 og klikker. Siden skulle vise 5, men viser 23. Hvilken linje er skyld i det?",
        kode: R`document.getElementById("plus").addEventListener("click", () => {
    const a = document.getElementById("tal1").value;
    const b = document.getElementById("tal2").value;
    document.getElementById("svar").textContent = a + b;
});`,
        linje: 4,
        fordi: "`value` er altid en **string**. `\"2\" + \"3\"` sætter tekst sammen og giver `\"23\"`. Rettelsen er at lave teksterne om til tal, før de lægges sammen: `Number(a) + Number(b)`. Man kunne også lave dem om allerede i linje 2 og 3 — det vigtige er, at det sker, før der står `+`.",
        rettet: R`document.getElementById("plus").addEventListener("click", () => {
    const a = document.getElementById("tal1").value;
    const b = document.getElementById("tal2").value;
    document.getElementById("svar").textContent = Number(a) + Number(b);
});` },
      { t: "skriv", sprog: "js",
        q: "Skriv én linje, der finder elementet med id `besked` og sætter dets tekst til `\"Gemt!\"`. Brug `getElementById` eller `querySelector` og `textContent`.",
        tjek: [
          [/document\.(getElementById\(("besked"|'besked')\)|querySelector\(("#besked"|'#besked')\))/, "Find elementet: `document.getElementById(\"besked\")` (uden #) eller `document.querySelector(\"#besked\")` (med #)"],
          [/\.textContent=("Gemt!"|'Gemt!');/, "Sæt teksten med `.textContent = \"Gemt!\";`"],
          [/getElementById\(("#besked"|'#besked')\)/, "`getElementById` skal have id'et **uden** #", "ikke"]
        ],
        forkert: ["document.getElementById(\"besked\").innerHTML = \"Gemt!\";", "document.getElementById(\"#besked\").textContent = \"Gemt!\";", "document.querySelector(\"besked\").textContent = \"Gemt!\";"],
        loesning: R`document.getElementById("besked").textContent = "Gemt!";` },
      { t: "ide", h: "En side, der svarer igen",
        md: "Lav en ny fil `hilsen.html`, og skriv siden **selv**. Brug den bagefter til at se DOM'en og debuggeren i browseren.",
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Hilsen</title>
</head>
<body>
    <label for="navn">Dit navn:</label>
    <input id="navn">
    <button id="hils">Hils</button>
    <p id="svar"></p>

    <script>
        const felt = document.getElementById("navn");
        const svar = document.getElementById("svar");

        document.getElementById("hils").addEventListener("click", () => {
            const navn = felt.value.trim();
            if (navn === "") {
                svar.textContent = "Skriv dit navn først";
                svar.style.color = "red";
            } else {
                svar.textContent = "Hej, " + navn + "!";
                svar.style.color = "green";
            }
        });
    </script>
</body>
</html>`,
        win: [
          "Åbn siden, skriv dit navn, og klik **Hils**. Prøv også at klikke med et tomt felt.",
          "Tryk **F12**, og vælg fanen **Elements**. Klik på knappen igen, og se `<p id=\"svar\">` ændre sig i træet. Det er DOM'en, du ser.",
          "Vælg fanen **Sources**, og klik på `hilsen.html` i listen til venstre. Klik på linjenummeret ud for `const navn = felt.value.trim();`. Der kommer en blå markering: et **breakpoint**.",
          "Klik på **Hils** på siden. Programmet stopper ved linjen. Til højre under **Scope** ser du variablerne. Klik på knappen **Step over** (buen med en pil) og se `navn` få sin værdi.",
          "Klik på den blå **Resume**-knap (▶), så kører siden videre. Klik på linjenummeret igen for at fjerne breakpointet."
        ],
        mac: [
          "Åbn siden, skriv dit navn, og klik **Hils**. Prøv også at klikke med et tomt felt.",
          "Tryk **⌥⌘I**, og vælg fanen **Elements**. Klik på knappen igen, og se `<p id=\"svar\">` ændre sig i træet. Det er DOM'en, du ser.",
          "Vælg fanen **Sources**, og klik på `hilsen.html` i listen til venstre. Klik på linjenummeret ud for `const navn = felt.value.trim();`. Der kommer en blå markering: et **breakpoint**.",
          "Klik på **Hils** på siden. Programmet stopper ved linjen. Til højre under **Scope** ser du variablerne. Klik på knappen **Step over** (buen med en pil) og se `navn` få sin værdi.",
          "Klik på den blå **Resume**-knap (▶), så kører siden videre. Klik på linjenummeret igen for at fjerne breakpointet."
        ],
        md2: "Browserens debugger virker som den i {{Visual Studio||Rider}}: breakpoint, et skridt ad gangen, og variablerne vist på skærmen, så du ikke skal holde dem i hovedet. `trim()` fjerner mellemrum i begge ender, ligesom `Trim()` i C#." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er DOM'en, og hvordan får man en knap til at gøre noget, når brugeren klikker på den?",
        svar: "Når browseren læser HTML, laver den et **objekt for hvert element**. Det hele kaldes **DOM**. JavaScript kan finde et element med `document.getElementById` eller `querySelector` og ændre det, fx dets `textContent`, og siden opdateres med det samme. For at reagere på et klik kalder man `addEventListener(\"click\", …)` på knappen med en **funktion**, der kører hver gang, der bliver klikket — samme idé som en event handler i C#.",
        noegle: ["objekt", "element", "getElementById", "addEventListener", "funktion"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m14l5", titel: "Grafik: canvas og SVG", min: 18,
    ord: [
      ["canvas", "Et HTML-element, der er et tomt lærred. JavaScript tegner på det, punkt for punkt."],
      ["Kontekst (ctx)", "Objektet, man tegner med. Fås med `canvas.getContext(\"2d\")`."],
      ["Koordinater på canvas", "(0, 0) er øverste venstre hjørne. x vokser mod højre, y vokser **nedad**."],
      ["fillRect", "Tegner en udfyldt firkant: `fillRect(x, y, bredde, højde)`."],
      ["Path (sti)", "En figur, der bygges op af linjer og buer: `beginPath`, `moveTo`, `lineTo`, `arc` — og til sidst `stroke` eller `fill`."],
      ["arc", "En bue eller cirkel: `arc(x, y, radius, start, slut)`. En hel cirkel går fra 0 til `Math.PI * 2`."],
      ["requestAnimationFrame", "Beder browseren om at kalde en funktion lige før næste billede på skærmen — ca. 60 gange i sekundet. Bruges til animation."],
      ["SVG", "Scalable Vector Graphics: grafik skrevet som tags (`rect`, `circle`). Bliver ikke grynet, når man zoomer."]
    ],
    trin: [
      { t: "laes", h: "Et lærred på siden",
        md: "Et `canvas`-element er et tomt, gennemsigtigt **lærred**. Du giver det en bredde og en højde i HTML og tegner på det med JavaScript.\n\nMan tegner ikke på selve elementet, men på dets **kontekst** — et objekt med alle tegnemetoderne. Det hedder typisk `ctx`.\n\n**Koordinaterne:** punktet (0, 0) er **øverste venstre** hjørne. x vokser mod højre. y vokser **nedad** — modsat det, du kender fra matematik.",
        sprog: "html",
        kode: R`<canvas id="tegning" width="300" height="200" style="border: 1px solid gray"></canvas>

<script>
    const canvas = document.getElementById("tegning");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "orange";
    ctx.fillRect(20, 30, 100, 50);
</script>`,
        noter: [
          ["width=\"300\" height=\"200\"", "Lærredets størrelse i pixels."],
          ["getContext(\"2d\")", "Hent det objekt, der kan tegne i to dimensioner."],
          ["ctx.fillStyle = \"orange\"", "Vælg farve. Den gælder for alt, der fyldes ud **bagefter**."],
          ["ctx.fillRect(20, 30, 100, 50)", "Firkant med øverste venstre hjørne i x 20, y 30. Den er 100 bred og 50 høj."]
        ],
        md2: "Siden viser en grå ramme med en orange firkant tæt på øverste venstre hjørne. Kanten kommer fra `style` — uden den kan man slet ikke se, hvor lærredet er." },
      { t: "valg", q: "Et canvas er 300 bredt og 200 højt. Hvor ligger punktet (290, 10)?",
        svar: ["Øverst til højre", "Nederst til højre", "Øverst til venstre", "Nederst til venstre"],
        ret: 0, fordi: "x = 290 er tæt på højre kant (300). y = 10 er tæt på **toppen**, fordi y tælles nedad fra øverste kant. Nederst til højre ville være omkring (290, 190)." },
      { t: "laes", h: "Linjer, cirkler og tekst",
        md: "Andre figurer end firkanter tegnes som en **sti** (*path*): du starter en ny sti, beskriver den, og beder til sidst om at få den tegnet — enten som en streg (`stroke`) eller udfyldt (`fill`).",
        sprog: "js",
        kode: R`// En streg
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(200, 100);
ctx.strokeStyle = "blue";
ctx.lineWidth = 3;
ctx.stroke();

// En udfyldt cirkel
ctx.beginPath();
ctx.arc(250, 150, 30, 0, Math.PI * 2);
ctx.fillStyle = "red";
ctx.fill();

// Tekst
ctx.fillStyle = "black";
ctx.font = "16px Arial";
ctx.fillText("Hej canvas", 10, 190);`,
        noter: [
          ["beginPath()", "Start en ny figur. Glemmer du den, hænger den nye figur sammen med den forrige."],
          ["moveTo(10, 10)", "Flyt pennen hen uden at tegne."],
          ["lineTo(200, 100)", "Tegn en linje derhen (den vises først ved `stroke`)."],
          ["strokeStyle, lineWidth", "Stregens farve og tykkelse."],
          ["arc(250, 150, 30, 0, Math.PI * 2)", "Cirkel med centrum (250, 150) og radius 30. De to sidste tal er start- og slutvinkel: `Math.PI * 2` er hele vejen rundt."],
          ["fillText(\"…\", 10, 190)", "Skriv tekst. (10, 190) er tekstens venstre ende ved bunden af bogstaverne."]
        ] },
      { t: "udfyld", q: "Tegn en udfyldt rød cirkel med centrum i (100, 50) og radius 30.", sprog: "js",
        kode: R`ctx.[[beginPath]]();
ctx.arc(100, 50, 30, 0, Math.PI * [[2]]);
ctx.fillStyle = "red";
ctx.[[fill]]();`,
        fordi: "Start en ny sti, beskriv cirklen (hele vejen rundt er `Math.PI * 2`), vælg farve, og fyld den ud. Med `stroke()` i stedet for `fill()` ville du kun få kanten." },
      { t: "spor", sprog: "js", slut: false,
        q: "Et søjlediagram: hver søjle er 40 bred, og der er 60 pixels fra én søjles venstre kant til den næstes. Søjlerne skal stå på bunden af et canvas, der er 200 højt. Følg løkken, og skriv `x` og `y` efter hver linje. (Selve tegningen, `ctx.fillRect(x, y, 40, v)`, sker i linje 6 — lige før x flyttes.)",
        kode: R`const hoejde = 200;
const soejler = [50, 120, 80];
let x = 10;
for (const v of soejler) {
    const y = hoejde - v;
    ctx.fillRect(x, y, 40, v);
    x = x + 60;
}`,
        kolonner: ["x", "y"],
        raekker: [[3, "=10", "=–"], [5, "=10", "=150"], [7, "70", "150"], [5, "70", "80"], [7, "130", "80"], [5, "130", "120"], [7, "190", "120"]],
        fordi: "Fordi y vokser **nedad**, skal en søjle, der er `v` høj og står på bunden, starte i `y = hoejde - v`. Den høje søjle (120) starter derfor højest oppe, ved y = 80. x rykker 60 frem for hver søjle: 10, 70, 130. Efter løkken er x 190." },
      { t: "laes", h: "Animation: tegn igen og igen",
        md: "Animation på et canvas er en **løkke af billeder**: slet lærredet, tegn alt på den nye plads, flyt lidt — og gentag.\n\nGentagelsen klares af `requestAnimationFrame(tegn)`. Den beder browseren om at kalde `tegn` igen lige før næste billede på skærmen, typisk 60 gange i sekundet. Funktionen kalder den selv til sidst, så det fortsætter.",
        sprog: "html",
        kode: R`<canvas id="bane" width="300" height="100" style="border: 1px solid gray"></canvas>

<script>
    const ctx = document.getElementById("bane").getContext("2d");
    let x = 20;
    let fart = 2;

    function tegn() {
        ctx.clearRect(0, 0, 300, 100);

        ctx.beginPath();
        ctx.arc(x, 50, 15, 0, Math.PI * 2);
        ctx.fillStyle = "teal";
        ctx.fill();

        x = x + fart;
        if (x > 285 || x < 15) {
            fart = -fart;
        }

        requestAnimationFrame(tegn);
    }

    tegn();
</script>`,
        noter: [
          ["clearRect(0, 0, 300, 100)", "Slet hele lærredet. Ellers står alle de gamle bolde der stadig."],
          ["x = x + fart;", "Flyt bolden 2 pixels."],
          ["fart = -fart;", "Ved kanten vender farten fortegn, så bolden kører den anden vej. 285 = 300 − radius."],
          ["requestAnimationFrame(tegn);", "\"Kald tegn igen til næste billede.\""],
          ["tegn();", "Det første kald, der sætter det hele i gang."]
        ],
        md2: "Bolden kører frem og tilbage mellem kanterne. Underviseren viste animation med CSS `@keyframes`. Det er det nemmeste til faste bevægelser. Canvas og JavaScript bruges, når bevægelsen afhænger af noget — fx brugerens klik i et spil." },
      { t: "valg", q: "Hvad sker der, hvis du fjerner `ctx.clearRect(…)` fra animationen?",
        svar: ["Alle de tidligere bolde bliver stående, så bolden trækker et bredt spor efter sig", "Bolden står stille", "Animationen kører dobbelt så hurtigt", "Siden giver en fejl i konsollen"],
        ret: 0, fordi: "Et canvas husker alt, hvad der er tegnet på det. Uden at slette tegnes den nye bold oven i alle de gamle, og resultatet er en tyk streg." },
      { t: "fejl", logisk: true, sprog: "js",
        q: "Bolden skal vende ved højre kant, men den forsvinder ud af lærredet og kommer aldrig tilbage. `ctx` er lærredets kontekst. Hvilken linje er forkert?",
        kode: R`let x = 0;
let fart = 2;
function tegn() {
    ctx.clearRect(0, 0, 300, 150);
    ctx.fillRect(x, 60, 20, 20);
    x = x + fart;
    if (x > 280) {
        fart = 2;
    }
    requestAnimationFrame(tegn);
}
tegn();`,
        linje: 8,
        fordi: "Ved kanten sættes `fart` til 2 — men den var allerede 2, så intet ændrer sig. For at vende skal farten blive **negativ**: `fart = -2;` (eller `fart = -fart;`). Sæt et breakpoint i linje 8 i browserens **Sources**-fane, og se `fart` i **Scope**: værdien skifter aldrig.",
        rettet: R`let x = 0;
let fart = 2;
function tegn() {
    ctx.clearRect(0, 0, 300, 150);
    ctx.fillRect(x, 60, 20, 20);
    x = x + fart;
    if (x > 280) {
        fart = -2;
    }
    requestAnimationFrame(tegn);
}
tegn();` },
      { t: "laes", h: "SVG: grafik som tags",
        md: "Underviseren viste også **SVG**. Her tegner du ikke med JavaScript, men med **tags**, som browseren selv tegner. Hver figur bliver et element i DOM'en — så den kan få CSS, få et `id` og reagere på klik.",
        sprog: "html",
        kode: R`<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="80" height="50" fill="orange" />
    <circle id="sol" cx="150" cy="50" r="30" fill="gold" />
</svg>

<script>
    const sol = document.getElementById("sol");
    sol.addEventListener("click", () => sol.setAttribute("fill", "red"));
</script>`,
        noter: [
          ["<rect x y width height>", "Samme tal som `fillRect` — bare som attributter."],
          ["<circle cx cy r>", "Centrum og radius."],
          ["setAttribute(\"fill\", \"red\")", "JavaScript ændrer en attribut. Klik på solen, så bliver den rød."]
        ],
        md2: "**Canvas eller SVG?** SVG er **tags**: skarpt i alle størrelser, nemt at style og klikke på. Godt til ikoner, logoer, baggrunde og få figurer. Canvas er **pixels**, som JavaScript tegner: hurtigt med mange figurer, der flytter sig hele tiden. Godt til spil, animation og diagrammer, der tegnes ud fra data." },
      { t: "valg", q: "Du skal lave et spil, hvor 200 små bolde flyver rundt og bliver tegnet forfra 60 gange i sekundet. Hvad passer bedst?",
        svar: ["canvas — JavaScript tegner pixels hurtigt, og man tegner alt forfra hvert billede", "SVG — hver bold som et circle-element", "En HTML-tabel med farvede celler", "CSS @keyframes med 200 forskellige animationer"],
        ret: 0, fordi: "Mange figurer i konstant bevægelse er netop det, canvas er bygget til. Med SVG skulle browseren holde styr på 200 elementer i DOM'en og opdatere dem alle hele tiden." },
      { t: "skriv", sprog: "js",
        q: "Variablen `ctx` er konteksten for et canvas. Sæt fyldfarven til `\"blue\"`, og tegn derefter en udfyldt firkant med øverste venstre hjørne i x 20, y 30, bredde 100 og højde 50.",
        foer: R`const ctx = document.getElementById("tegning").getContext("2d");`,
        tjek: [
          [/ctx\.fillStyle=("blue"|'blue');/, "Sæt farven: `ctx.fillStyle = \"blue\";`"],
          ["ctx.fillRect(20, 30, 100, 50);", "Tegn firkanten: `ctx.fillRect(20, 30, 100, 50);`"],
          [/fillStyle=.*fillRect/, "Sæt farven **før** du tegner — den gælder kun for det, der tegnes bagefter"]
        ],
        forkert: ["ctx.fillRect(20, 30, 100, 50);\nctx.fillStyle = \"blue\";", "ctx.fillStyle = \"blue\";\nctx.fillRect(30, 20, 50, 100);"],
        loesning: R`ctx.fillStyle = "blue";
ctx.fillRect(20, 30, 100, 50);` },
      { t: "ide", h: "Et hus og en sol, der står op",
        md: "Lav en ny fil `tegning.html`, og skriv koden **selv**. Først tegnes et hus. Derefter stiger solen langsomt op over himlen med `requestAnimationFrame`.",
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Tegning</title>
</head>
<body>
    <canvas id="tegning" width="400" height="300" style="border: 1px solid gray"></canvas>

    <script>
        const ctx = document.getElementById("tegning").getContext("2d");
        let solY = 280;

        function tegnHus() {
            ctx.fillStyle = "sienna";
            ctx.fillRect(50, 150, 150, 120);

            ctx.beginPath();
            ctx.moveTo(40, 150);
            ctx.lineTo(125, 80);
            ctx.lineTo(210, 150);
            ctx.closePath();
            ctx.fillStyle = "darkred";
            ctx.fill();

            ctx.fillStyle = "saddlebrown";
            ctx.fillRect(110, 210, 30, 60);
        }

        function tegn() {
            ctx.fillStyle = "lightblue";
            ctx.fillRect(0, 0, 400, 300);

            ctx.beginPath();
            ctx.arc(320, solY, 30, 0, Math.PI * 2);
            ctx.fillStyle = "gold";
            ctx.fill();

            ctx.fillStyle = "green";
            ctx.fillRect(0, 270, 400, 30);
            tegnHus();

            if (solY > 60) {
                solY = solY - 1;
                requestAnimationFrame(tegn);
            }
        }

        tegn();
    </script>
</body>
</html>`,
        md2: "Rækkefølgen betyder noget: det, der tegnes **sidst**, ligger **øverst**. Derfor tegnes himlen først, så solen, og græsset og huset til sidst — så solen står op bag græsset. `closePath()` tegner linjen tilbage til startpunktet, så taget bliver en lukket trekant. Udvid selv: tegn et vindue, og lad himlen blive mørkere, mens solen står op (skift farve, når `solY` passerer et bestemt tal)." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på at tegne med `canvas` og med SVG, og hvornår vælger du hvilken?",
        svar: "Med **canvas** tegner JavaScript **pixels** på et lærred med metoder som `fillRect` og `arc`. Browseren husker kun pixels, ikke figurerne, så til animation sletter man og tegner forfra hvert billede med `requestAnimationFrame`. Det er hurtigt med **mange figurer i bevægelse**, fx spil og diagrammer. **SVG** er figurer skrevet som **tags**. De bliver elementer i DOM'en, er skarpe i alle størrelser og kan få CSS og klik. Det passer til ikoner, logoer og få figurer.",
        noegle: ["pixels", "tags", "DOM", "requestAnimationFrame", "mange figurer"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m14l6", titel: "Timere: setTimeout og setInterval", min: 14,
    ord: [
      ["setTimeout", "Kalder en funktion **én gang**, når der er gået et antal millisekunder."],
      ["setInterval", "Kalder en funktion **igen og igen** med et fast antal millisekunder imellem."],
      ["clearInterval", "Stopper en `setInterval` ud fra det id, `setInterval` gav tilbage. (`clearTimeout` stopper en `setTimeout`.)"],
      ["Callback", "En funktion, man giver videre, så den kan blive kaldt senere — fx af en timer eller en event."],
      ["Millisekund (ms)", "En tusindedel af et sekund. 1000 ms = 1 sekund."]
    ],
    trin: [
      { t: "laes", h: "Gør noget om lidt: setTimeout",
        md: "`setTimeout(funktion, ms)` beder browseren om at kalde funktionen, når der er gået et antal **millisekunder** (1000 ms = 1 sekund). Funktionen, du giver videre, kaldes en **callback**.\n\nDet vigtige: programmet **venter ikke**. `setTimeout` lægger bare en aftale ind og returnerer med det samme, så linjerne nedenunder kører videre. Det svarer til, at man i C# starter en `Task` uden at `await`'e den.",
        sprog: "js",
        kode: R`console.log("A");

setTimeout(() => {
    console.log("B");
}, 1000);

console.log("C");`,
        noter: [
          ["setTimeout(() => { … }, 1000)", "\"Kør denne funktion om 1000 ms.\""],
          ["console.log(\"C\")", "Kører med det samme — før B, selvom den står længere nede."]
        ],
        output: "A\nC\nB",
        md2: "JavaScript i browseren kører på **én tråd**. Hvis koden selv stod og ventede et sekund, ville hele siden fryse: ingen klik, ingen scroll. Derfor er alt, der handler om at vente, bygget på callbacks." },
      { t: "forudsig", sprog: "js",
        q: "Tre timere og to almindelige linjer. Hvad skriver programmet, og i hvilken rækkefølge?",
        kode: R`setTimeout(() => console.log("1"), 0);
console.log("2");
setTimeout(() => console.log("3"), 100);
setTimeout(() => console.log("4"), 50);
console.log("5");`,
        output: "2\n5\n1\n4\n3",
        fordi: "Først kører alle almindelige linjer: 2 og 5. Timerne kommer bagefter — **også den med 0 ms**, fordi en callback først kan køre, når den nuværende kode er færdig. Derefter i rækkefølge efter tid: 0 ms, 50 ms, 100 ms." },
      { t: "laes", h: "Igen og igen: setInterval",
        md: "`setInterval(funktion, ms)` kalder funktionen **igen og igen** med det antal millisekunder imellem. Den bliver ved, indtil du stopper den.\n\nFor at kunne stoppe den skal du gemme det **id**, som `setInterval` giver tilbage, og senere kalde `clearInterval(id)`.",
        sprog: "js",
        kode: R`let tilbage = 3;

const id = setInterval(() => {
    console.log(tilbage);
    tilbage--;
    if (tilbage === 0) {
        clearInterval(id);
        console.log("Start!");
    }
}, 1000);`,
        noter: [
          ["const id = setInterval(…)", "Start timeren, og gem dens id."],
          ["tilbage--", "Tæl én ned for hvert sekund."],
          ["clearInterval(id)", "Stop timeren, når vi når 0. Ellers kører den for evigt."]
        ],
        output: "3\n2\n1\nStart!",
        md2: "Linjerne kommer med et sekunds mellemrum. Variablen `tilbage` står uden for funktionen, så den huskes fra gang til gang." },
      { t: "spor", sprog: "js", slut: false,
        q: "Timeren kalder funktionen i linje 3–9 hvert sekund. Skriv `tilbage` og `kald` efter hver af de markerede linjer. Hver gang funktionen kaldes, kører linje 4 og 5 én gang.",
        kode: R`let tilbage = 3;
let kald = 0;
const id = setInterval(() => {
    kald++;
    tilbage--;
    if (tilbage === 0) {
        clearInterval(id);
    }
}, 1000);`,
        kolonner: ["tilbage", "kald"],
        raekker: [[1, "=3", "=–"], [2, "=3", "=0"], [4, "3", "1"], [5, "2", "1"], [4, "2", "2"], [5, "1", "2"], [4, "1", "3"], [5, "0", "3"]],
        fordi: "Efter tredje kald er `tilbage` 0, så `clearInterval` stopper timeren. Der kommer ikke et fjerde kald. I browserens debugger kan du sætte et breakpoint i linje 4 og se tallene skifte under **Scope** ved hvert kald." },
      { t: "forudsig", sprog: "js",
        kode: R`let n = 0;
const id = setInterval(() => {
    n++;
    console.log("Tik " + n);
    if (n === 3) {
        clearInterval(id);
    }
}, 100);
console.log("Start");`,
        output: "Start\nTik 1\nTik 2\nTik 3",
        fordi: "`Start` skrives med det samme, fordi `setInterval` ikke venter. Derefter kører funktionen hvert 100. millisekund. Ved tredje kald er `n` 3, og timeren stoppes." },
      { t: "valg", q: "Hvad sker der, hvis man glemmer `clearInterval` i en nedtælling med `setInterval`?",
        svar: ["Funktionen bliver ved med at blive kaldt, så længe siden er åben", "Den stopper af sig selv efter ét minut", "Den kører kun én gang", "Siden fryser, fordi programmet venter på den"],
        ret: 0, fordi: "En interval-timer stopper aldrig af sig selv. Nedtællingen fortsætter med -1, -2, -3 … Til gengæld fryser siden ikke, for timeren venter ikke — den bliver bare ved med at kalde." },
      { t: "fejl", logisk: true, sprog: "js",
        q: "Nedtællingen skal tælle 5, 3, 1 og så stoppe. Men den fortsætter med -1, -3, -5 … og stopper aldrig. Hvilken linje er forkert?",
        kode: R`let tal = 5;
const id = setInterval(() => {
    console.log(tal);
    tal = tal - 2;
    if (tal === 0) {
        clearInterval(id);
    }
}, 1000);`,
        linje: 5,
        fordi: "`tal` bliver 5, 3, 1, -1 … — den rammer **aldrig præcis 0**, så `tal === 0` er aldrig sand. Brug `tal <= 0` i stedet. Det er en god vane at stoppe en tæller med `<=` eller `>=`, så den ikke kan springe forbi grænsen.",
        rettet: R`let tal = 5;
const id = setInterval(() => {
    console.log(tal);
    tal = tal - 2;
    if (tal <= 0) {
        clearInterval(id);
    }
}, 1000);` },
      { t: "udfyld", q: "Skriv \"tik\" hvert halve sekund, og stop efter 3 gange.", sprog: "js",
        kode: R`let gange = 0;
const id = [[setInterval]](() => {
    console.log("tik");
    gange++;
    if (gange === 3) {
        [[clearInterval]](id);
    }
}, [[500]]);`,
        output: "tik\ntik\ntik",
        fordi: "`setInterval` gentager. `clearInterval(id)` stopper den. Et halvt sekund er 500 millisekunder." },
      { t: "laes", h: "Timere på en rigtig side",
        md: "En typisk brug af `setTimeout` på en webside: vis en besked, og fjern den igen efter et par sekunder.",
        sprog: "html",
        kode: R`<button id="gem">Gem</button>
<p id="besked"></p>

<script>
    const besked = document.getElementById("besked");

    document.getElementById("gem").addEventListener("click", () => {
        besked.textContent = "Gemt!";
        setTimeout(() => {
            besked.textContent = "";
        }, 3000);
    });
</script>`,
        md2: "Klik på **Gem**: \"Gemt!\" vises og forsvinder efter tre sekunder. Til **animation** bruger du `requestAnimationFrame` fra forrige lektion i stedet for `setInterval`: den passer præcis til skærmens billeder og holder pause, når fanen ikke er synlig." },
      { t: "skriv", sprog: "js",
        q: "Skriv en `setTimeout`, der efter 2000 millisekunder kalder en arrow function uden parametre, som skriver `\"Færdig\"` i konsollen.",
        tjek: [
          [/setTimeout\(\(\)=>/, "Kald `setTimeout` med en arrow function: `setTimeout(() => …`"],
          [/console\.log\(("Færdig"|'Færdig')\)/, "Skriv `\"Færdig\"` med `console.log`"],
          [/,2000\);/, "Giv 2000 som sidste parameter: `…, 2000);`"],
          [/setInterval/, "Brug `setTimeout` — den skal kun køre én gang", "ikke"]
        ],
        forkert: ["setInterval(() => console.log(\"Færdig\"), 2000);", "setTimeout(() => console.log(\"Færdig\"), 2);"],
        loesning: R`setTimeout(() => console.log("Færdig"), 2000);`,
        output: "Færdig" },
      { t: "ide", h: "Et stopur på siden",
        md: "Lav en ny fil `stopur.html`, og skriv siden **selv**. Uret tæller tiendedele af sekunder, og knapperne starter, stopper og nulstiller.",
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Stopur</title>
</head>
<body>
    <h1 id="tid">0.0</h1>
    <button id="start">Start</button>
    <button id="stop">Stop</button>
    <button id="nul">Nulstil</button>

    <script>
        const visning = document.getElementById("tid");
        let tiendedele = 0;
        let id = null;

        function vis() {
            visning.textContent = (tiendedele / 10).toFixed(1);
        }

        document.getElementById("start").addEventListener("click", () => {
            if (id !== null) {
                return;
            }
            id = setInterval(() => {
                tiendedele++;
                vis();
            }, 100);
        });

        document.getElementById("stop").addEventListener("click", () => {
            clearInterval(id);
            id = null;
        });

        document.getElementById("nul").addEventListener("click", () => {
            tiendedele = 0;
            vis();
        });
    </script>
</body>
</html>`,
        md2: "`toFixed(1)` skriver et tal med præcis én decimal, fx `3.0` — som `ToString(\"F1\")` i C#. Prøv at fjerne de tre linjer med `if (id !== null)` og klikke **Start** flere gange: nu kører flere timere oven i hinanden, og uret går for hurtigt — og **Stop** kan kun stoppe den sidste. Det er derfor, tjekket er der." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på `setTimeout` og `setInterval`, og hvorfor fryser siden ikke, mens den venter?",
        svar: "`setTimeout` kalder en **callback** **én gang**, når tiden er gået. `setInterval` kalder den **igen og igen** med fast mellemrum, indtil man stopper den med `clearInterval` og det id, den gav tilbage. Siden fryser ikke, fordi timerne **ikke venter**: de lægger bare en aftale ind og returnerer med det samme. JavaScript kører på én tråd, så koden fortsætter, og browseren kalder funktionen, når tiden er gået, og den nuværende kode er færdig.",
        noegle: ["én gang", "igen og igen", "clearInterval", "callback", "venter ikke"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m14v", titel: "Værksted: JavaScript på rigtige sider", vaerksted: true, min: 75,
    ord: [],
    trin: [
      { t: "laes", h: "Sådan arbejder du i værkstedet",
        md: "Nu skal du skrive **hele sider selv**: HTML med et `<script>`, der reagerer på klik, regner, tegner og bruger timere.\n\nOpgaverne bliver sværere hen ad vejen. Den første er let. Den tredje er en fejlfinding, hvor du skal bruge browserens debugger. Den sidste er et lille spil, der samler hele modulet.\n\nTil hver opgave laver du en `.html`-fil, åbner den i browseren og genindlæser med {{**F5**||**⌘R**}}, hver gang du har gemt.",
        noter: [
          ["Skriv selv", "Skriv koden med dine egne fingre. Kopiér ikke fra lektionerne."],
          ["Konsollen er altid åben", "Hav udviklerværktøjet åbent ({{**F12**||**⌥⌘I**}}) med fanen **Console**. En fejl i JavaScript vises **kun** der, med rødt og et linjenummer, du kan klikke på."],
          ["Kør tit", "Gem og genindlæs efter hver lille ændring. Så ved du præcis, hvilken ændring der gjorde noget forkert."],
          ["console.log undervejs", "Er du i tvivl om, hvad en variabel indeholder, så skriv `console.log(variablen)` og se efter."],
          ["Brug debuggeren", "Fanen **Sources**: klik på et linjenummer for at sætte et **breakpoint**. Når koden når dertil, stopper den, og **Scope** viser alle variablerne. **Step over** går én linje frem. Du kan også skrive linjen `debugger;` i din kode — så stopper den der, når udviklerværktøjet er åbent."],
          ["Tips før løsning", "Åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af."]
        ] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "En tæller med grænser", sprog: "html",
        md: "Lav en side `taeller.html` med et tal og tre knapper. Knapperne tæller op, ned og nulstiller. Tallet må aldrig blive negativt, og det skal blive rødt, når det er 10 eller mere.",
        krav: [
          "Siden har et `span` med id `tal`, der viser `0`, når siden åbnes",
          "Tre knapper med teksterne `+1`, `-1` og `Nulstil`",
          "`+1` lægger 1 til, og `-1` trækker 1 fra — men tallet går aldrig under 0",
          "`Nulstil` sætter tallet til 0",
          "Er tallet 10 eller mere, er det rødt (`style.color = \"red\"`). Ellers er det sort",
          "Tallet gemmes i en variabel i JavaScript, og en funktion `vis()` skriver det på siden og sætter farven"
        ],
        tip: [
          "Lav først HTML'en og en `let antal = 0;`. Få `+1` til at virke, før du laver de andre.",
          "Lad hver knap kun ændre `antal` og derefter kalde `vis()`. Så står koden, der opdaterer siden, kun ét sted.",
          "I `-1`: `if (antal > 0) { antal--; }`. I `vis()`: `tal.textContent = antal;` og `tal.style.color = antal >= 10 ? \"red\" : \"black\";`."
        ],
        fri: true,
        output: "Siden åbnes: 0\nTre klik på +1: 3\nFire klik på -1: 0 (ikke -1)\nTi klik på +1: 10, og tallet er rødt\nNulstil: 0, og tallet er sort igen",
        loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Tæller</title>
</head>
<body>
    <h1>Tæller: <span id="tal">0</span></h1>
    <button id="plus">+1</button>
    <button id="minus">-1</button>
    <button id="nul">Nulstil</button>

    <script>
        const tal = document.getElementById("tal");
        let antal = 0;

        function vis() {
            tal.textContent = antal;
            tal.style.color = antal >= 10 ? "red" : "black";
        }

        document.getElementById("plus").addEventListener("click", () => {
            antal++;
            vis();
        });

        document.getElementById("minus").addEventListener("click", () => {
            if (antal > 0) {
                antal--;
            }
            vis();
        });

        document.getElementById("nul").addEventListener("click", () => {
            antal = 0;
            vis();
        });
    </script>
</body>
</html>`,
        ekstra: ["Tilføj et `input` med id `skridt`, hvor brugeren skriver, hvor meget der tælles med. Husk `Number`.", "Sæt et breakpoint i `vis()`, og se `antal` under **Scope** for hvert klik."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Indkøbsliste", sprog: "html",
        md: "Lav en side `indkoeb.html`, hvor brugeren skriver en vare og klikker **Tilføj**. Varerne gemmes i et **array** i JavaScript, og listen på siden bygges forfra ud fra arrayet, hver gang der sker noget. Det er et mønster, du får brug for igen: **data i JavaScript → en funktion, der tegner siden ud fra data**.\n\nNyt værktøj: et nyt element laves i tre skridt.\n\n1. `const li = document.createElement(\"li\");` laver et nyt `li`. Det findes nu, men står ikke på siden endnu.\n2. `li.textContent = v;` giver det tekst — sikkert, også når teksten kommer fra brugeren.\n3. `liste.appendChild(li);` sætter det ind sidst i listen. Nu vises det.",
        krav: [
          "Et `input` med id `vare`, en knap med id `tilfoej` og teksten `Tilføj`, en `ul` med id `liste` og et afsnit med id `antal`",
          "Varerne ligger i `const varer = [];`",
          "Ved klik på `Tilføj` lægges feltets tekst (uden mellemrum i enderne) i arrayet med `push`, og feltet tømmes",
          "Er feltet tomt eller kun mellemrum, sker der ingenting",
          "En funktion `visListe()` tømmer listen og laver et `li` for hver vare med `createElement` og `textContent`",
          "Under listen står `0 varer på listen`, `1 varer på listen`, `2 varer på listen` osv."
        ],
        tip: [
          "Byg det i små skridt: først at klik lægger varen i arrayet og skriver arrayet i konsollen med `console.log(varer)`. Derefter `visListe()`.",
          "Tøm listen med `liste.innerHTML = \"\";` — det er sikkert, fordi der ikke indgår tekst fra brugeren. Lav så en `for (const v of varer)`-løkke.",
          "Inde i løkken: `const li = document.createElement(\"li\"); li.textContent = v; liste.appendChild(li);`. Til sidst: `antal.textContent = varer.length + \" varer på listen\";`."
        ],
        fri: true,
        output: "Siden åbnes: tom liste og \"0 varer på listen\"\nSkriv \"mælk\" og klik Tilføj: • mælk — \"1 varer på listen\" — feltet er tomt igen\nSkriv \"  brød  \" og klik Tilføj: • mælk • brød — \"2 varer på listen\"\nKlik Tilføj med tomt felt: intet sker",
        loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Indkøbsliste</title>
</head>
<body>
    <h1>Indkøbsliste</h1>
    <input id="vare">
    <button id="tilfoej">Tilføj</button>
    <ul id="liste"></ul>
    <p id="antal"></p>

    <script>
        const felt = document.getElementById("vare");
        const liste = document.getElementById("liste");
        const antal = document.getElementById("antal");
        const varer = [];

        function visListe() {
            liste.innerHTML = "";
            for (const v of varer) {
                const li = document.createElement("li");
                li.textContent = v;
                liste.appendChild(li);
            }
            antal.textContent = varer.length + " varer på listen";
        }

        document.getElementById("tilfoej").addEventListener("click", () => {
            const tekst = felt.value.trim();
            if (tekst === "") {
                return;
            }
            varer.push(tekst);
            felt.value = "";
            visListe();
        });

        visListe();
    </script>
</body>
</html>`,
        ekstra: ["Lad brugeren fjerne en vare ved at klikke på den: giv hvert `li` sin egen `addEventListener(\"click\", …)`, der fjerner varen fra arrayet med `varer.splice(varer.indexOf(v), 1);` og kalder `visListe()`.", "Få Enter-tasten til at virke: læg felt og knap i en `form`, og lyt på `\"submit\"` med `e.preventDefault()`.", "Skriv arrayet som JSON i konsollen efter hver ændring: `console.log(JSON.stringify(varer));`."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Fejlfinding: gennemsnittet", sprog: "html",
        md: "Siden nedenfor skal regne gennemsnittet af tre karakterer ud. Skriver man **4**, **7** og **10** og klikker **Beregn**, skal der stå **Gennemsnit: 7**. Men der står **Gennemsnit: 1570**.\n\nDer er ingen røde fejl i konsollen, så browseren hjælper dig ikke. Find fejlen **med debuggeren**, ikke ved at gætte:\n\n1. Lav en ny fil `gennemsnit.html`, og kopiér koden ind. Åbn den, skriv 4, 7 og 10, og klik **Beregn**. Se det forkerte svar.\n2. Åbn udviklerværktøjet, fanen **Sources**, og klik på `gennemsnit.html`. Sæt et **breakpoint** på linjen `sum += felt.value;`.\n3. Klik **Beregn** igen. Koden stopper i løkken. Se på `sum` og `felt` under **Scope** — hold musen over `felt.value` i koden for at se værdien.\n4. Klik **Step over** og se, hvad `sum` bliver efter første runde. Er det et tal eller en tekst? (En tekst vises med anførselstegn.)\n5. Fortsæt runde for runde, og skriv `sum` ned efter hver.",
        krav: [
          "Find den linje, der gør, at karaktererne ikke bliver lagt sammen som tal",
          "Ret fejlen ved at ændre **én** linje",
          "Med 4, 7 og 10 viser siden `Gennemsnit: 7`. Med 12, 10 og 2 viser den `Gennemsnit: 8`"
        ],
        start: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Gennemsnit</title>
</head>
<body>
    <input class="karakter" type="number">
    <input class="karakter" type="number">
    <input class="karakter" type="number">
    <button id="beregn">Beregn</button>
    <p id="svar"></p>

    <script>
        document.getElementById("beregn").addEventListener("click", () => {
            const felter = document.querySelectorAll(".karakter");
            let sum = 0;
            for (const felt of felter) {
                sum += felt.value;
            }
            const snit = sum / felter.length;
            document.getElementById("svar").textContent = "Gennemsnit: " + snit;
        });
    </script>
</body>
</html>`,
        tip: [
          "`sum` starter som tallet 0. Hvad er typen af `felt.value`? Husk: det, der står i et felt, er **altid** en string — også med `type=\"number\"`.",
          "Efter første runde er `sum` teksten `\"04\"`, så `\"047\"` og til sidst `\"04710\"`. Divisionen `/` laver teksten om til tallet 4710, og 4710 / 3 = 1570.",
          "Lav værdien om til et tal, før den lægges til: `sum += Number(felt.value);`."
        ],
        fri: true,
        output: "Før rettelsen, med 4, 7 og 10: Gennemsnit: 1570\nEfter rettelsen, med 4, 7 og 10: Gennemsnit: 7\nEfter rettelsen, med 12, 10 og 2: Gennemsnit: 8",
        loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Gennemsnit</title>
</head>
<body>
    <input class="karakter" type="number">
    <input class="karakter" type="number">
    <input class="karakter" type="number">
    <button id="beregn">Beregn</button>
    <p id="svar"></p>

    <script>
        document.getElementById("beregn").addEventListener("click", () => {
            const felter = document.querySelectorAll(".karakter");
            let sum = 0;
            for (const felt of felter) {
                sum += Number(felt.value);
            }
            const snit = sum / felter.length;
            document.getElementById("svar").textContent = "Gennemsnit: " + snit;
        });
    </script>
</body>
</html>`,
        ekstra: ["Skriv 4, 7 og 8. Svaret bliver `6.333333333333333`. Brug `snit.toFixed(1)`, så der står `6.3`.", "Hvad sker der, hvis et felt er tomt? `Number(\"\")` er 0, så gennemsnittet bliver for lavt. Vis i stedet beskeden `Udfyld alle tre felter`, hvis et felt er tomt."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Søjlediagram på canvas", sprog: "html",
        md: "Lav en side `diagram.html`, der tegner et søjlediagram over salget i seks måneder. Data ligger i et **array af objekter**, og hele tegningen laves af en løkke — så du kan ændre tallene, og diagrammet følger med.",
        krav: [
          "Et `canvas` med id `diagram`, bredde 400 og højde 250",
          "Data: `const salg = [{ maaned: \"Jan\", beloeb: 40 }, { maaned: \"Feb\", beloeb: 65 }, { maaned: \"Mar\", beloeb: 30 }, { maaned: \"Apr\", beloeb: 80 }, { maaned: \"Maj\", beloeb: 55 }, { maaned: \"Jun\", beloeb: 70 }];`",
          "Hver søjle er 40 bred og `beloeb * 2` høj og står på en vandret linje i y = 220. Den første søjle starter i x = 20, og hver søjle starter 60 længere til højre end den forrige",
          "Under hver søjle står månedens navn (`fillText` i y = 240), og over hver søjle står beløbet",
          "Søjlen med det **største** beløb er orange. Alle andre er `steelblue`. Det største beløb findes med en løkke — ikke skrevet ind i hånden"
        ],
        tip: [
          "Find først det største beløb: `let stoerst = 0;` og en løkke med `if (s.beloeb > stoerst) { stoerst = s.beloeb; }`.",
          "Brug en tæller til placeringen: `let x = 20;` før løkken og `x = x + 60;` sidst i løkken. Søjlens højde er `h = s.beloeb * 2`, og den starter i `y = 220 - h`.",
          "I løkken: `ctx.fillStyle = s.beloeb === stoerst ? \"orange\" : \"steelblue\"; ctx.fillRect(x, 220 - h, 40, h);` og derefter `ctx.fillStyle = \"black\"; ctx.fillText(s.maaned, x + 8, 240); ctx.fillText(s.beloeb, x + 10, 215 - h);`."
        ],
        fri: true,
        output: "Seks søjler fra venstre mod højre: Jan, Feb, Mar, Apr, Maj, Jun\nApr er højest (160 pixels) og orange — de andre er blå\nMar er lavest (60 pixels)\nUnder hver søjle står måneden, og over hver søjle står beløbet",
        loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Søjlediagram</title>
</head>
<body>
    <canvas id="diagram" width="400" height="250" style="border: 1px solid gray"></canvas>

    <script>
        const ctx = document.getElementById("diagram").getContext("2d");
        const salg = [
            { maaned: "Jan", beloeb: 40 },
            { maaned: "Feb", beloeb: 65 },
            { maaned: "Mar", beloeb: 30 },
            { maaned: "Apr", beloeb: 80 },
            { maaned: "Maj", beloeb: 55 },
            { maaned: "Jun", beloeb: 70 }
        ];

        let stoerst = 0;
        for (const s of salg) {
            if (s.beloeb > stoerst) {
                stoerst = s.beloeb;
            }
        }

        ctx.beginPath();
        ctx.moveTo(10, 220);
        ctx.lineTo(390, 220);
        ctx.stroke();

        ctx.font = "14px Arial";
        let x = 20;
        for (const s of salg) {
            const h = s.beloeb * 2;
            ctx.fillStyle = s.beloeb === stoerst ? "orange" : "steelblue";
            ctx.fillRect(x, 220 - h, 40, h);

            ctx.fillStyle = "black";
            ctx.fillText(s.maaned, x + 8, 240);
            ctx.fillText(s.beloeb, x + 10, 215 - h);
            x = x + 60;
        }
    </script>
</body>
</html>`,
        ekstra: ["Skriv gennemsnittet som en vandret, rød streg hen over diagrammet (y = 220 − gennemsnit · 2).", "Læg en knap på siden, der lægger en tilfældig ekstra måned til arrayet og tegner det hele forfra. Husk `clearRect` først. Et tilfældigt helt tal fra 0 til 99 får du med `Math.floor(Math.random() * 100)`."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Samlet program: fang firkanten", sprog: "html",
        md: "Lav et lille spil, `spil.html`. En firkant hopper rundt på et canvas. Klikker man på den, får man et point. Et spil varer 10 sekunder, og resultaterne gemmes som objekter. Spillet bruger det hele: DOM, events, funktioner, objekter og arrays, JSON, canvas og timere.\n\nTo nye ting, du får brug for:\n\n- `Math.random()` giver et tilfældigt decimaltal fra 0 op til (men ikke med) 1. `Math.floor(Math.random() * 360)` giver derfor et helt tal fra 0 til 359.\n- Klik-eventen på et canvas får et event-objekt `e`. `e.offsetX` og `e.offsetY` er klikkets koordinater **inde i** canvas — samme koordinatsystem, som du tegner i.",
        krav: [
          "Et `canvas` med id `bane` (400 × 300), en knap med id `start` og teksten `Start`, og to afsnit med id `tid` og `point`",
          "En firkant på 40 × 40 med øverste venstre hjørne i variablerne `fx` og `fy`. Funktionen `flyt()` giver `fx` en tilfældig værdi fra 0 til 359 og `fy` fra 0 til 259, og tegner lærredet forfra med firkanten",
          "Klik på `Start`: point sættes til 0, tiden til 10, og to timere startes: én, der kalder `flyt()` hvert 800. millisekund, og én, der tæller tiden ned hvert sekund og viser `Tid tilbage: 9`, `Tid tilbage: 8` …",
          "Et klik på canvas, mens spillet kører, **inden for** firkanten giver 1 point (vist som `Point: 3`), og firkanten flytter sig med det samme. Klik ved siden af giver ingenting",
          "Når tiden når 0, stoppes begge timere med `clearInterval`, og `tid` viser `Slut! Du fik 3 point` (med det rigtige tal)",
          "Hvert færdigt spil lægges i arrayet `resultater` som et objekt `{ spil: 1, point: 3 }`, og hele arrayet skrives i konsollen med `JSON.stringify`",
          "Mens spillet kører, gør et klik på `Start` ingenting"
        ],
        tip: [
          "Lav det i denne rækkefølge, og afprøv efter hvert skridt: (1) `flyt()` og et kald af den, så firkanten står et tilfældigt sted. (2) Klik-eventen på canvas med `console.log(e.offsetX, e.offsetY)`. (3) Tjekket, om klikket er inden for firkanten. (4) Start-knappen og de to timere. (5) Slutningen og `resultater`.",
          "Klikket er inden for firkanten, når `e.offsetX >= fx && e.offsetX <= fx + 40 && e.offsetY >= fy && e.offsetY <= fy + 40`. Brug en variabel `let korer = false;`, som er `true`, mens spillet kører — så kan både klik-eventen og Start-knappen tjekke den.",
          "Gem de to timere i `let flytId;` og `let tidId;`. I tids-timeren: `tid--;`, vis tiden, og `if (tid <= 0) { clearInterval(flytId); clearInterval(tidId); korer = false; … }`. Resultatet: `resultater.push({ spil: resultater.length + 1, point: point });` og `console.log(JSON.stringify(resultater));`."
        ],
        fri: true,
        output: "Siden åbnes: firkanten står et tilfældigt sted, Start-knappen venter\nKlik Start: \"Tid tilbage: 10\", \"Point: 0\" — firkanten hopper hvert 0,8 sekund\nKlik på firkanten: \"Point: 1\", og den hopper med det samme\nEfter 10 sekunder: \"Slut! Du fik 7 point\", firkanten står stille\nKonsollen: [{\"spil\":1,\"point\":7}]\nNyt spil: konsollen viser [{\"spil\":1,\"point\":7},{\"spil\":2,\"point\":5}]",
        loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Fang firkanten</title>
</head>
<body>
    <canvas id="bane" width="400" height="300" style="border: 1px solid gray"></canvas>
    <p><button id="start">Start</button></p>
    <p id="tid">Tid tilbage: 10</p>
    <p id="point">Point: 0</p>

    <script>
        const canvas = document.getElementById("bane");
        const ctx = canvas.getContext("2d");
        const tidTekst = document.getElementById("tid");
        const pointTekst = document.getElementById("point");

        let fx = 0;
        let fy = 0;
        let point = 0;
        let tid = 10;
        let korer = false;
        let flytId;
        let tidId;
        const resultater = [];

        function flyt() {
            fx = Math.floor(Math.random() * 360);
            fy = Math.floor(Math.random() * 260);
            ctx.clearRect(0, 0, 400, 300);
            ctx.fillStyle = "crimson";
            ctx.fillRect(fx, fy, 40, 40);
        }

        canvas.addEventListener("click", e => {
            if (!korer) {
                return;
            }
            const ramt = e.offsetX >= fx && e.offsetX <= fx + 40 &&
                         e.offsetY >= fy && e.offsetY <= fy + 40;
            if (ramt) {
                point++;
                pointTekst.textContent = "Point: " + point;
                flyt();
            }
        });

        document.getElementById("start").addEventListener("click", () => {
            if (korer) {
                return;
            }
            korer = true;
            point = 0;
            tid = 10;
            pointTekst.textContent = "Point: 0";
            tidTekst.textContent = "Tid tilbage: 10";
            flyt();

            flytId = setInterval(flyt, 800);
            tidId = setInterval(() => {
                tid--;
                tidTekst.textContent = "Tid tilbage: " + tid;
                if (tid <= 0) {
                    clearInterval(flytId);
                    clearInterval(tidId);
                    korer = false;
                    tidTekst.textContent = "Slut! Du fik " + point + " point";
                    resultater.push({ spil: resultater.length + 1, point: point });
                    console.log(JSON.stringify(resultater));
                }
            }, 1000);
        });

        flyt();
    </script>
</body>
</html>`,
        ekstra: ["Vis den bedste score indtil nu på siden. Find den med en løkke over `resultater`, ligesom du fandt det største beløb i søjlediagrammet.", "Gør firkanten mindre og hurtigere, jo flere point man har.", "Læg mærke til `setInterval(flyt, 800)`: funktionen gives videre **uden** parenteser. Med `flyt()` ville den blive kaldt én gang med det samme, og timeren ville få resultatet i stedet for funktionen."] }
    ] }
  ]
});
})();
