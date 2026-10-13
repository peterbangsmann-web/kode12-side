// Modul 13 — HTML og CSS. Forudsætter: modul 0–12.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m13", nr: 13, del: "Del 4 · Database og frontend", ikon: "🎨",
  titel: "HTML og CSS",
  dag: "Kursusdag 10 · Frontend basics",
  intro: "Alt, hvad brugeren ser i dit eksamensprojekt, er **HTML** (indholdet) og **CSS** (udseendet). Her lærer du at skrive en side fra bunden, lave formularer, der sender data til en server, og styre layoutet — til sidst med **Bootstrap**, som ASP.NET Core MVC bruger fra start.\n\nHTML og CSS er ikke programmeringssprog: der er ingen variabler og ingen løkker. Til gengæld skal du kunne læse dem flydende, for i modul 16 bliver hver eneste view i MVC skrevet i HTML.",
  video: ["10_Fre_FrontEndBasics.mp4 (3 t 53 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m13l1", titel: "HTML: skelettet, tags og elementer", min: 18,
    ord: [
      ["HTML", "HyperText Markup Language. Det sprog, en webside er skrevet i. Det beskriver indholdet: overskrifter, afsnit, links, billeder."],
      ["Browser", "Programmet, der henter en HTML-fil og viser den som en side: Chrome, Edge, Safari, Firefox."],
      ["Tag", "Et mærke i spidse parenteser, fx `<p>` (starttag) og `</p>` (sluttag med skråstreg)."],
      ["Element", "Et starttag, indholdet og sluttagget tilsammen: `<p>Hej</p>`."],
      ["Attribut", "Ekstra oplysning i starttagget, skrevet som navn=\"værdi\": `<a href=\"om.html\">`."],
      ["Tomt element", "Et element uden indhold og uden sluttag, fx `<img>`, `<br>` og `<meta>`."],
      ["Udviklerværktøjer", "Browserens indbyggede værktøjer (F12 / ⌥⌘I), hvor du kan se sidens elementer og CSS. Det er browserens debugger."]
    ],
    trin: [
      { t: "laes", h: "Hvad er HTML?",
        md: "En webside er en almindelig **tekstfil**, der ender på `.html`. Browseren læser filen og viser den som en side.\n\nI filen står teksten pakket ind i **tags**: små mærker i spidse parenteser, der fortæller browseren, hvad hver bid tekst *er*. `<h1>` betyder \"det her er hovedoverskriften\", `<p>` betyder \"det her er et afsnit\" (p for *paragraph*).\n\nHTML er et **opmærkningssprog**, ikke et programmeringssprog. Der er ingen variabler, ingen `if` og ingen løkker. HTML beskriver kun, hvad der står på siden.",
        sprog: "html",
        kode: R`<h1>Min første side</h1>
<p>Hej verden.</p>`,
        noter: [
          ["<h1>", "Starttag: her begynder hovedoverskriften."],
          ["</h1>", "Sluttag: her slutter den. Sluttagget har en skråstreg `/`."],
          ["<p>…</p>", "Et afsnit. Browseren laver selv luft over og under det."]
        ],
        md2: "Browseren viser **ikke** tags. Den viser \"Min første side\" med stor fed skrift og \"Hej verden.\" som almindelig tekst nedenunder." },
      { t: "valg", q: "Hvilket tag afslutter et afsnit?",
        sprog: "html",
        kode: R`<p>Jeg lærer HTML.</p>`,
        svar: ["`</p>`", "`<p>`", "`<p/>`", "`<\\p>`"],
        ret: 0,
        fordi: "Et sluttag er det samme navn som starttagget med en **almindelig skråstreg** foran: `</p>`. Det er en fejl at bruge en omvendt skråstreg `\\`." },
      { t: "laes", h: "Element, tag og attribut",
        md: "Tre ord, som du skal kunne bruge til eksamen:\n\n- Et **tag** er selve mærket, fx `<a>` eller `</a>`.\n- Et **element** er det hele: starttag + indhold + sluttag.\n- En **attribut** er en ekstra oplysning, der står inde i starttagget som `navn=\"værdi\"`.\n\nEt link er et `a`-element (a for *anchor*). Attributten `href` siger, hvor linket fører hen.",
        sprog: "html",
        kode: R`<a href="kontakt.html">Skriv til mig</a>`,
        noter: [
          ["<a", "Starttagget begynder. `a` er elementets navn."],
          ["href=\"kontakt.html\"", "Attributten: navnet er `href`, værdien er `kontakt.html` — en anden fil i samme mappe."],
          ["Skriv til mig", "Indholdet: den tekst, man klikker på."],
          ["</a>", "Sluttagget."]
        ],
        md2: "Elementer kan ligge **inden i** hinanden. `<p>Det er <strong>vigtigt</strong>.</p>` er et `strong`-element inden i et `p`-element. Det inderste skal lukkes først — ligesom tuborgklammer i C#." },
      { t: "valg", q: "Hvad er **attributten** i denne linje?",
        sprog: "html",
        kode: R`<a href="priser.html">Se priser</a>`,
        svar: ["`href=\"priser.html\"`", "`Se priser`", "`<a>`", "`</a>`"],
        ret: 0,
        fordi: "Attributten står inde i starttagget som `navn=\"værdi\"`. `Se priser` er elementets **indhold**, og `<a>`/`</a>` er **tags**." },
      { t: "laes", h: "Skelettet: den faste ramme om hver side",
        md: "En rigtig HTML-fil har altid den samme ramme. Den svarer til `class Program` og `static void Main` i C#: den skal bare være der.\n\nRammen har to dele. `head` er **oplysninger om siden**, som ikke vises inde på selve siden. `body` er **det, man ser**.",
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="utf-8">
  <title>Peters side</title>
</head>
<body>
  <h1>Velkommen</h1>
  <p>Her er min første side.</p>
</body>
</html>`,
        noter: [
          ["<!DOCTYPE html>", "Første linje: \"det her er moderne HTML\". Ikke et tag, bare en besked til browseren."],
          ["<html lang=\"da\">", "Rod-elementet. Alt andet ligger inden i det. `lang=\"da\"` siger, at siden er på dansk."],
          ["<head>", "Oplysninger om siden. Vises ikke på selve siden."],
          ["<meta charset=\"utf-8\">", "Tegnsættet. Uden det kan æ, ø og å blive til mærkelige tegn. Et tomt element: intet sluttag."],
          ["<title>", "Teksten på browserens fane."],
          ["<body>", "Alt det, man ser på siden."]
        ] },
      { t: "orden", q: "Sæt linjerne i rækkefølge, så de danner et korrekt HTML-skelet.",
        sprog: "html",
        linjer: [R`<!DOCTYPE html>`, R`<html lang="da">`, R`<head>`, R`  <title>Opskrifter</title>`, R`</head>`, R`<body>`, R`  <h1>Opskrifter</h1>`, R`</body>`, R`</html>`],
        fordi: "Først `DOCTYPE`, så `html`. Inden i `html` kommer `head` (med `title`) og bagefter `body` (med det, man ser). Hvert element lukkes, før det næste åbnes. Til sidst lukkes `html` med `</html>`." },
      { t: "udfyld", q: "Udfyld skelettet. Fanen skal vise `Min blog`, og siden skal vise overskriften `Velkommen`.",
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<[[head]]>
  <meta charset="utf-8">
  <[[title]]>Min blog</title>
</head>
<body>
  <h1>Velkommen</h1>
</[[body]]>
</html>`,
        fordi: "`head` åbner oplysningerne om siden, `title` er teksten på fanen, og `</body>` lukker den synlige del. Sluttagget skal hedde det samme som starttagget." },
      { t: "laes", h: "Overskrifter, afsnit, links og billeder",
        md: "Med disse få elementer kan du lave en hel side:",
        sprog: "html",
        kode: R`<h1>Mine katte</h1>
<h2>Sorte Mis</h2>
<p>Mis er <strong>tre år</strong> og elsker <em>fisk</em>.</p>
<img src="mis.jpg" alt="En sort kat, der sover">
<p>Linje et<br>Linje to</p>
<a href="hunde.html">Se også mine hunde</a>`,
        noter: [
          ["<h1> … <h6>", "Seks niveauer af overskrifter. `h1` er den vigtigste — brug kun én pr. side. `h2` er underoverskrifter."],
          ["<strong>", "Vigtig tekst. Vises med fed."],
          ["<em>", "Betonet tekst (*emphasis*). Vises med kursiv."],
          ["<img src=\"…\" alt=\"…\">", "Et billede. `src` er filen, `alt` er en tekst, der beskriver billedet for blinde og vises, hvis billedet mangler. Tomt element."],
          ["<br>", "Linjeskift inden i et afsnit. Tomt element."],
          ["<a href=\"…\">", "Link. Til en anden side på nettet skriver man hele adressen: `href=\"https://www.dr.dk\"`."]
        ],
        md2: "Linjeskift og ekstra mellemrum i selve HTML-filen **betyder ingenting**. Browseren samler al luft til ét mellemrum. Vil du have et nyt afsnit, skal du lave et nyt `<p>`." },
      { t: "fejl", q: "Meningen er, at kun \"Velkommen\" skal stå som stor overskrift. Men i browseren står afsnittet også med stor fed skrift. Hvilken linje er skyld i det?",
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="utf-8">
  <title>Min side</title>
</head>
<body>
  <h1>Velkommen
  <p>Her er min første side.</p>
</body>
</html>`,
        linje: 8,
        fordi: "`<h1>` bliver aldrig lukket. Så tror browseren, at afsnittet ligger **inden i** overskriften, og det hele bliver stort og fedt.\n\nHTML giver **ingen fejlbesked** — browseren gætter bare og viser noget. Derfor skal du selv tjekke, at hvert element bliver lukket. Udviklerværktøjerne (F12) viser, hvordan browseren har forstået siden.",
        rettet: R`<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="utf-8">
  <title>Min side</title>
</head>
<body>
  <h1>Velkommen</h1>
  <p>Her er min første side.</p>
</body>
</html>` },
      { t: "skriv", q: "Skriv en hovedoverskrift med teksten `Peters side` og under den et afsnit med teksten `Jeg lærer HTML.`",
        sprog: "html",
        tjek: [
          ["<h1>Peters side</h1>", "En `h1` med teksten `Peters side`"],
          ["<p>Jeg lærer HTML.</p>", "Et `p` med teksten `Jeg lærer HTML.`"],
          [/<h1>[^<]*<p>/, "Luk `h1`, før afsnittet begynder", "ikke"]
        ],
        forkert: ["<h1>Peters side\n<p>Jeg lærer HTML.</p>", "<h1>Peters side</h1>\n<p>Jeg lærer HTML.<p>"],
        loesning: R`<h1>Peters side</h1>
<p>Jeg lærer HTML.</p>` },
      { t: "skriv", q: "Skriv to ting:\n\n1. Et link til filen `kontakt.html` med teksten `Kontakt`.\n2. Et billede af filen `kat.jpg` med den alternative tekst `En sort kat`.",
        sprog: "html",
        tjek: [
          [/<a href=["']kontakt\.html["']>Kontakt<\/a>/, "Et `a`-element med `href=\"kontakt.html\"` og teksten `Kontakt`"],
          [/<img[^>]*src=["']kat\.jpg["']/, "Et `img` med `src=\"kat.jpg\"`"],
          [/<img[^>]*alt=["']En sort kat["']/, "Billedet har `alt=\"En sort kat\"`"],
          ["</img>", "`img` er et tomt element — det har intet sluttag", "ikke"]
        ],
        forkert: ["<a src=\"kontakt.html\">Kontakt</a>\n<img src=\"kat.jpg\" alt=\"En sort kat\">", "<a href=\"kontakt.html\">Kontakt</a>\n<img href=\"kat.jpg\" alt=\"En sort kat\">"],
        loesning: R`<a href="kontakt.html">Kontakt</a>
<img src="kat.jpg" alt="En sort kat">`,
        fordi: "Links bruger `href`, billeder bruger `src`. Det er nemt at bytte rundt på dem. `alt` skal altid med på et billede." },
      { t: "ide", h: "Din første side i browseren",
        md: "Nu skal du lave en rigtig HTML-fil, åbne den i browseren og se den i **udviklerværktøjerne**. Brug **Chrome** eller **Edge** — værktøjerne ser ens ud i de to.\n\nLav først en ny mappe på skrivebordet, der hedder `web`. Alle filer i dette modul lægges i den mappe.",
        win: [
          "Åbn Visual Studio. På startskærmen vælger du **Continue without code** (nederst til højre).",
          "Vælg **File → New → File…**, vælg **HTML Page**, og klik **Open**. Visual Studio laver et skelet for dig — sammenlign det med skelettet i denne lektion.",
          "Vælg **File → Save As…**, gå til mappen `web` på skrivebordet, og gem filen som `index.html`.",
          "Skriv siden nedenfor ind i filen (skriv selv — kopiér ikke), og gem med **Ctrl + S**.",
          "Åbn mappen `web` i Stifinder, og dobbeltklik på `index.html`. Siden åbner i browseren.",
          "Tryk **F12** i browseren. Klik på fanen **Elements**. Her ser du sidens elementer som et træ — klik på de små pile for at folde dem ud.",
          "Ret noget i filen, gem, og tryk **F5** i browseren for at hente siden igen."
        ],
        mac: [
          "Åbn Rider. På startskærmen klikker du **Open** og vælger mappen `web` på skrivebordet.",
          "Højreklik på mappen `web` i venstre side, og vælg **New → HTML File**. Kald filen `index`. Rider laver et skelet for dig — sammenlign det med skelettet i denne lektion.",
          "Skriv siden nedenfor ind i filen (skriv selv — kopiér ikke). Rider gemmer selv.",
          "Åbn mappen `web` i Finder, og dobbeltklik på `index.html`. Vælg Chrome, hvis du bliver spurgt (eller højreklik → **Åbn med** → Chrome).",
          "Tryk **⌥⌘I** i Chrome (eller højreklik på siden og vælg **Inspicer**). Klik på fanen **Elements**. Her ser du sidens elementer som et træ — klik på de små pile for at folde dem ud.",
          "Ret noget i filen, og tryk **⌘R** i Chrome for at hente siden igen."
        ],
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="utf-8">
  <title>Om mig</title>
</head>
<body>
  <h1>Om mig</h1>
  <p>Jeg hedder Peter, og jeg lærer at <strong>kode</strong>.</p>
  <h2>Det kan jeg lide</h2>
  <p>Kaffe, gåture og at finde fejl.</p>
  <a href="https://www.dr.dk">Gå til DR</a>
</body>
</html>`,
        md2: "Prøv også at slette `</strong>` og genindlæse. Se i **Elements**, hvordan browseren har gættet, hvor elementet slutter. Det er sådan, du finder fejl i HTML: du kigger på det, browseren har forstået, i stedet for at gætte." },
      { t: "forklar", q: "Forklar med dine egne ord: hvad er forskellen på et tag, et element og en attribut i HTML? Brug et link som eksempel.",
        svar: "Et **tag** er selve mærket i spidse parenteser, fx starttagget `<a>` og sluttagget `</a>`. Et **element** er det hele: starttag, indhold og sluttag, fx `<a href=\"om.html\">Om mig</a>`. En **attribut** er en ekstra oplysning i starttagget, skrevet som navn=\"værdi\" — her `href`, der siger, hvor linket fører hen. Nogle elementer, som `img` og `br`, er tomme og har intet sluttag.",
        noegle: ["starttag", "sluttag", "element", "attribut", "href"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m13l2", titel: "Lister, tabeller og sidens opbygning", min: 18,
    ord: [
      ["ul / ol / li", "Punktliste (*unordered list*), nummereret liste (*ordered list*) og et punkt i listen (*list item*)."],
      ["table / tr / th / td", "Tabel, række (*table row*), overskriftscelle (*table header*) og almindelig celle (*table data*)."],
      ["Blok-element", "Et element, der fylder hele bredden og starter på en ny linje, fx `div`, `p`, `h1`."],
      ["Inline-element", "Et element, der ligger inde i teksten og kun er så bredt som sit indhold, fx `span`, `a`, `strong`."],
      ["div / span", "Neutrale beholdere uden betydning. `div` er en blok, `span` er inline. Bruges til at gruppere ting, så de kan få CSS."],
      ["Semantisk element", "Et element, hvis navn siger, hvad indholdet ER: `header`, `nav`, `main`, `section`, `footer`."]
    ],
    trin: [
      { t: "laes", h: "Lister",
        md: "HTML har to slags lister. En **punktliste** (`ul`) bruges, når rækkefølgen er ligegyldig. En **nummereret liste** (`ol`) bruges, når rækkefølgen betyder noget — browseren skriver selv tallene.\n\nHvert punkt er et `li`-element, og alle `li` skal ligge **inden i** listen.",
        sprog: "html",
        kode: R`<h2>Indkøb</h2>
<ul>
  <li>Mælk</li>
  <li>Brød</li>
</ul>

<h2>Sådan laver du kaffe</h2>
<ol>
  <li>Kog vand</li>
  <li>Hæld vand på kaffen</li>
  <li>Vent fire minutter</li>
</ol>`,
        noter: [
          ["<ul>", "*Unordered list*: punkter med prikker."],
          ["<ol>", "*Ordered list*: punkter med tal 1, 2, 3 …"],
          ["<li>", "*List item*: ét punkt. Ligger altid inden i `ul` eller `ol`."]
        ] },
      { t: "valg", q: "Du skal vise de fem trin i en opskrift. Hvilken liste passer bedst?",
        svar: ["`ol` — rækkefølgen betyder noget, og browseren nummererer selv", "`ul` — fordi det er en liste", "Fem `p`-elementer med tal foran", "`li` uden en omkringliggende liste"],
        ret: 0,
        fordi: "Trin i en opskrift skal tages i rækkefølge, så det er en **nummereret** liste: `ol`. Browseren skriver tallene, så du ikke selv skal rette dem, hvis du indsætter et trin." },
      { t: "udfyld", q: "Lav en punktliste med to farver.",
        sprog: "html",
        kode: R`<[[ul]]>
  <[[li]]>Rød</li>
  <li>Blå</li>
</ul>`,
        fordi: "`ul` er punktlisten, og hvert punkt er et `li`." },
      { t: "laes", h: "Tabeller",
        md: "En tabel bygges **række for række**. `table` er hele tabellen, `tr` er én række, og inden i rækken ligger cellerne. Overskrifts-celler er `th`, almindelige celler er `td`.\n\nTabeller bruger du meget i MVC: listen over alle kunder eller produkter vises næsten altid som en tabel.",
        sprog: "html",
        kode: R`<table>
  <tr>
    <th>Navn</th>
    <th>Alder</th>
  </tr>
  <tr>
    <td>Anna</td>
    <td>25</td>
  </tr>
  <tr>
    <td>Bo</td>
    <td>31</td>
  </tr>
</table>`,
        noter: [
          ["<table>", "Hele tabellen."],
          ["<tr>", "*Table row*: én række. Alle celler skal ligge inden i en række."],
          ["<th>", "*Table header*: en overskrift. Vises med fed og centreret."],
          ["<td>", "*Table data*: en almindelig celle."]
        ],
        md2: "I MVC's genererede sider ser du også `<thead>` om overskriftsrækken og `<tbody>` om resten. De deler bare tabellen i et hoved og en krop — de ændrer ikke, hvordan den ser ud." },
      { t: "orden", q: "Sæt linjerne i rækkefølge, så de danner en tabel med overskriften `Vare` og én række med `Kaffe`.",
        sprog: "html",
        linjer: [R`<table>`, R`  <tr>`, R`    <th>Vare</th>`, R`  </tr>`, R`  <tr>`, R`    <td>Kaffe</td>`, R`  </tr>`, R`</table>`],
        fordi: "Tabellen åbnes. Første række indeholder overskriftscellen `th`, anden række den almindelige celle `td`. Hver række lukkes med `</tr>`, før den næste åbnes." },
      { t: "fejl", q: "Tabellen vises, men overskrifterne `Navn` og `Alder` står ikke med fed, og en skærmlæser for blinde ved ikke, at det er overskrifter. Hvilken linje skal rettes?",
        sprog: "html",
        kode: R`<table>
  <tr><td>Navn</td><td>Alder</td></tr>
  <tr><td>Anna</td><td>25</td></tr>
</table>`,
        linje: 2,
        fordi: "Overskrifts-celler skal være `th`, ikke `td`. Med `td` er det bare almindelige data. Browseren giver ingen fejl — siden ser bare forkert ud, og den mister sin betydning.",
        rettet: R`<table>
  <tr><th>Navn</th><th>Alder</th></tr>
  <tr><td>Anna</td><td>25</td></tr>
</table>` },
      { t: "laes", h: "div og span: neutrale beholdere",
        md: "Nogle elementer er **blok-elementer**: de starter på en ny linje og fylder hele bredden. `p`, `h1`, `ul` og `table` er blokke.\n\nAndre er **inline-elementer**: de ligger inde i teksten og er kun så brede som indholdet. `a`, `strong` og `img` er inline.\n\n`div` og `span` betyder **ingenting** i sig selv. De er tomme kasser, som du bruger til at samle ting, så du kan give dem udseende med CSS (næste lektioner). `div` er en blok, `span` er inline.",
        sprog: "html",
        kode: R`<div class="produkt">
  <h3>Kaffe</h3>
  <p>Pris: <span class="pris">45 kr.</span></p>
</div>`,
        noter: [
          ["<div class=\"produkt\">", "En blok, der samler overskrift og pris til ét produkt. `class` bruges af CSS."],
          ["<span class=\"pris\">", "Et lille stykke tekst inde i afsnittet, så netop prisen kan få en anden farve."]
        ] },
      { t: "valg", q: "Du vil give **ét ord** inde i en sætning en anden farve. Hvilket element pakker du ordet ind i?",
        svar: ["`span` — det er inline og bliver inde i sætningen", "`div` — det er en blok", "`p` — et nyt afsnit", "`section` — en ny sektion"],
        ret: 0,
        fordi: "`span` er inline, så ordet bliver stående inde i sætningen. Et `div` eller `p` er en blok og ville bryde linjen." },
      { t: "laes", h: "Semantiske elementer: sidens opbygning",
        md: "Før lavede man hele sider af `div`-elementer. I dag bruger man elementer, hvis **navn fortæller, hvad indholdet er**. De kaldes **semantiske** elementer (semantik = betydning).\n\nDe ser præcis ud som et `div`. Forskellen er, at skærmlæsere, søgemaskiner og andre programmører kan se, hvad hver del er.",
        sprog: "html",
        kode: R`<body>
  <header>
    <h1>Kaffebaren</h1>
    <nav>
      <a href="index.html">Forside</a>
      <a href="menu.html">Menu</a>
    </nav>
  </header>
  <main>
    <section>
      <h2>Dagens kaffe</h2>
      <p>Mørkristet fra Etiopien.</p>
    </section>
  </main>
  <footer>
    <p>Åben alle dage 8–17</p>
  </footer>
</body>`,
        noter: [
          ["<header>", "Toppen af siden: logo, titel, menu."],
          ["<nav>", "Navigation: sidens menu med links."],
          ["<main>", "Sidens hovedindhold. Kun ét `main` pr. side."],
          ["<section>", "En afgrænset del af indholdet, typisk med sin egen overskrift."],
          ["<footer>", "Bunden af siden: kontaktinfo, åbningstider, copyright."]
        ],
        md2: "Når du laver et MVC-projekt i modul 16, ligger præcis `header`, `nav`, `main` og `footer` i filen `_Layout.cshtml`." },
      { t: "valg", q: "Et `header`-element og et `div`-element ser ens ud i browseren. Hvorfor bruge `header`?",
        svar: ["Navnet fortæller, hvad indholdet er — det hjælper skærmlæsere, søgemaskiner og andre, der læser koden", "Siden bliver hurtigere at indlæse", "`div` må ikke bruges i moderne HTML", "`header` gør automatisk teksten fed"],
        ret: 0,
        fordi: "Semantiske elementer ændrer ikke udseendet. De giver **betydning**: en blind bruger kan hoppe direkte til `nav` eller `main`, og en søgemaskine ved, hvad der er hovedindholdet. `div` må stadig gerne bruges — til ting, der ikke har en bestemt betydning." },
      { t: "skriv", q: "Skriv en tabel med en overskriftsrække (`Navn`, `Alder`) og én datarække (`Anna`, `25`). Brug `th` til overskrifterne og `td` til data.",
        sprog: "html",
        tjek: [
          ["<table>", "Start med `<table>`"],
          [/<tr><th>Navn<\/th><th>Alder<\/th><\/tr>/, "Første række: to `th` med `Navn` og `Alder`"],
          [/<tr><td>Anna<\/td><td>25<\/td><\/tr>/, "Anden række: to `td` med `Anna` og `25`"],
          ["</table>", "Luk tabellen med `</table>`"]
        ],
        forkert: ["<table>\n<tr><td>Navn</td><td>Alder</td></tr>\n<tr><td>Anna</td><td>25</td></tr>\n</table>", "<table>\n<th>Navn</th><th>Alder</th>\n<td>Anna</td><td>25</td>\n</table>"],
        loesning: R`<table>
  <tr>
    <th>Navn</th>
    <th>Alder</th>
  </tr>
  <tr>
    <td>Anna</td>
    <td>25</td>
  </tr>
</table>` },
      { t: "skriv", q: "Skriv sidens opbygning med tre semantiske elementer i denne rækkefølge:\n\n1. En `header` med en `h1`: `Min blog`\n2. Et `main` med et afsnit: `Første indlæg`\n3. En `footer` med et afsnit: `Kontakt mig`",
        sprog: "html",
        tjek: [
          [/<header><h1>Min blog<\/h1><\/header>/, "`header` med `<h1>Min blog</h1>` inden i"],
          [/<main><p>Første indlæg<\/p><\/main>/, "`main` med `<p>Første indlæg</p>` inden i"],
          [/<footer><p>Kontakt mig<\/p><\/footer>/, "`footer` med `<p>Kontakt mig</p>` inden i"],
          [/<\/header>.*<main>.*<\/main>.*<footer>/, "Rækkefølgen: `header`, så `main`, så `footer`"]
        ],
        forkert: ["<div><h1>Min blog</h1></div>\n<main><p>Første indlæg</p></main>\n<footer><p>Kontakt mig</p></footer>"],
        loesning: R`<header>
  <h1>Min blog</h1>
</header>
<main>
  <p>Første indlæg</p>
</main>
<footer>
  <p>Kontakt mig</p>
</footer>` },
      { t: "ide", h: "Din ugeplan",
        md: "Lav en ny fil `ugeplan.html` i mappen `web` (samme måde som sidst). Siden skal have `header`, `main` og `footer`, en tabel og en liste. Skriv selv koden nedenfor, gem, og åbn filen i browseren.",
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="utf-8">
  <title>Ugeplan</title>
</head>
<body>
  <header>
    <h1>Min ugeplan</h1>
    <nav>
      <a href="index.html">Om mig</a>
      <a href="ugeplan.html">Ugeplan</a>
    </nav>
  </header>
  <main>
    <section>
      <h2>Skema</h2>
      <table>
        <tr>
          <th>Dag</th>
          <th>Emne</th>
        </tr>
        <tr>
          <td>Mandag</td>
          <td>HTML</td>
        </tr>
        <tr>
          <td>Tirsdag</td>
          <td>CSS</td>
        </tr>
      </table>
    </section>
    <section>
      <h2>Husk</h2>
      <ul>
        <li>Pauser hver time</li>
        <li>Kør koden tit</li>
      </ul>
    </section>
  </main>
  <footer>
    <p>Lavet af Peter</p>
  </footer>
</body>
</html>`,
        md2: "Klik på linkene i `nav`: nu kan du gå mellem dine to sider. Åbn udviklerværktøjerne ({{F12||⌥⌘I}}), og hold musen over elementerne i **Elements**. Browseren farver det sted på siden, som elementet fylder. Læg mærke til, at `section`, `h2` og `p` fylder hele bredden (blokke), mens `a` kun fylder sin tekst (inline)." },
      { t: "forklar", q: "Forklar med dine egne ord: hvad er et semantisk element, og hvorfor bruger man `header`, `nav`, `main` og `footer` i stedet for bare `div`?",
        svar: "Et **semantisk** element er et element, hvis navn siger, **hvad indholdet er**. `header` er toppen, `nav` er menuen, `main` er hovedindholdet og `footer` er bunden. De ser ud som et `div`, men de giver siden **betydning**: skærmlæsere kan hoppe direkte til menuen eller indholdet, søgemaskiner ved, hvad der er vigtigt, og koden er lettere at læse. `div` bruges stadig til grupper, der ikke har en særlig betydning — typisk for at give dem CSS.",
        noegle: ["betydning", "header", "main", "skærmlæser", "div"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m13l3", titel: "Formularer: sådan sender en side data", min: 20,
    ord: [
      ["Formular (form)", "Den del af siden, hvor brugeren skriver noget, der skal sendes til en server: login, tilmelding, søgning."],
      ["Server", "Et program på en anden computer, der modtager forespørgsler fra browseren og svarer med en side. I modul 16 skriver du selv serveren i ASP.NET Core."],
      ["action", "Formularens attribut med den adresse, data sendes til."],
      ["method", "Formularens attribut, der bestemmer, hvordan data sendes: `get` eller `post`."],
      ["name", "Navnet, som et felts værdi sendes med. Et felt uden `name` bliver IKKE sendt."],
      ["label", "Teksten til et felt. `for` skal være det samme som feltets `id`."],
      ["GET", "Sender data synligt i adressen efter et `?`. Bruges til at hente og søge."],
      ["POST", "Sender data skjult inde i forespørgslen. Bruges, når noget skal gemmes eller ændres."]
    ],
    trin: [
      { t: "laes", h: "En formular sender navn=værdi",
        md: "En **formular** er der, hvor brugeren skriver noget, som skal sendes til en **server** — et program på en anden computer, der modtager det og svarer. I modul 16 skriver du selv den server i ASP.NET Core MVC. Derfor er formularer noget af det vigtigste i hele modulet.\n\nNår brugeren klikker på knappen, samler browseren alle felterne og sender dem som par af **navn=værdi**. Navnet kommer fra feltets `name`, værdien er det, brugeren skrev.",
        sprog: "html",
        kode: R`<form action="/tilmeld" method="post">
  <input type="text" name="navn">
  <input type="number" name="alder">
  <button type="submit">Tilmeld</button>
</form>`,
        noter: [
          ["<form>", "Formularen. Alle felter, der skal sendes sammen, ligger inden i den."],
          ["action=\"/tilmeld\"", "Adressen på serveren, hvor data sendes hen."],
          ["method=\"post\"", "Måden, data sendes på: `get` eller `post` (forklares om lidt)."],
          ["<input …>", "Et felt, brugeren skriver i. Tomt element: intet sluttag."],
          ["name=\"navn\"", "Navnet, værdien sendes med. Skriver brugeren Peter, sendes `navn=Peter`."],
          ["<button type=\"submit\">", "Knappen, der sender formularen."]
        ],
        md2: "Skriver brugeren `Peter` og `25`, sender browseren `navn=Peter&alder=25`. `&` adskiller parrene. I MVC bliver de to værdier automatisk lagt ind i parametrene `string navn` og `int alder` i din C#-metode — det hedder *model binding* og kommer i modul 16." },
      { t: "valg", q: "Hvilken attribut bestemmer det navn, et felts værdi sendes med til serveren?",
        sprog: "html",
        kode: R`<input type="email" id="mail" name="email" placeholder="din@mail.dk">`,
        svar: ["`name` — værdien sendes som `email=…`", "`id`", "`type`", "`placeholder`"],
        ret: 0,
        fordi: "Kun `name` bruges, når data sendes. `id` bruges af `label` og CSS, `type` bestemmer, hvilken slags felt det er, og `placeholder` er den grå hjælpetekst i et tomt felt." },
      { t: "laes", h: "Felttyper og label",
        md: "Attributten `type` bestemmer, hvilken slags felt der vises. Browseren giver selv den rigtige opførsel: et `email`-felt kræver et @, et `password`-felt viser prikker, et `date`-felt viser en kalender.\n\nHvert felt skal have en **label** — teksten, der fortæller, hvad feltet er til. `label` hænger sammen med feltet, når label'ens `for` er **det samme** som feltets `id`. Så kan man klikke på teksten for at komme ind i feltet, og skærmlæsere læser teksten højt.",
        sprog: "html",
        kode: R`<label for="navn">Navn</label>
<input type="text" id="navn" name="navn" required>

<label for="kode">Adgangskode</label>
<input type="password" id="kode" name="kode">

<label for="dato">Dato</label>
<input type="date" id="dato" name="dato">

<input type="checkbox" id="nyhed" name="nyhedsbrev">
<label for="nyhed">Send mig nyhedsbrevet</label>`,
        noter: [
          ["type=\"text\"", "Almindelig tekst. `email`, `number`, `password` og `date` virker på samme måde, bare med den passende opførsel."],
          ["for=\"navn\" / id=\"navn\"", "Det er de to, der binder teksten til feltet. De skal være ens."],
          ["required", "Feltet skal udfyldes. Browseren nægter at sende formularen, hvis det er tomt. En attribut uden værdi."],
          ["type=\"checkbox\"", "Et flueben. Sendes kun, hvis der er sat flueben."]
        ],
        md2: "`id` og `name` har ofte samme værdi, men de har forskellige opgaver: `id` er til siden selv (label og CSS), `name` er til serveren." },
      { t: "udfyld", q: "Bind teksten `E-mail` til feltet, gør feltet til et e-mailfelt, og sørg for, at værdien sendes til serveren som `email`.",
        sprog: "html",
        kode: R`<label [[for]]="email">E-mail</label>
<input type="[[email]]" id="email" [[name]]="email">`,
        fordi: "`for` på label skal pege på feltets `id`. `type=\"email\"` giver et felt, der kræver et @. `name=\"email\"` er navnet, værdien sendes med." },
      { t: "laes", h: "Valgliste, tekstområde og knap",
        md: "Tre elementer mere, så har du alt, hvad en almindelig formular bruger:",
        sprog: "html",
        kode: R`<label for="by">By</label>
<select id="by" name="by">
  <option value="aar">Aarhus</option>
  <option value="kbh">København</option>
</select>

<label for="besked">Besked</label>
<textarea id="besked" name="besked" rows="4"></textarea>

<button type="submit">Send</button>`,
        noter: [
          ["<select>", "En valgliste (dropdown). `name` står på `select`."],
          ["<option value=\"aar\">Aarhus</option>", "Ét valg. Brugeren ser `Aarhus`, men serveren får `by=aar` — værdien fra `value`."],
          ["<textarea>", "Et stort tekstfelt med flere linjer. Har et sluttag, i modsætning til `input`."],
          ["<button type=\"submit\">", "Sender formularen. Uden `type` er en knap i en formular også en submit-knap."]
        ] },
      { t: "orden", q: "Sæt linjerne i rækkefølge, så de danner en formular, der sender et navn med POST til `/opret`. På siden skal teksten Navn stå først, så feltet og til sidst knappen.",
        sprog: "html",
        linjer: [R`<form action="/opret" method="post">`, R`  <label for="navn">Navn</label>`, R`  <input type="text" id="navn" name="navn">`, R`  <button type="submit">Opret</button>`, R`</form>`],
        fordi: "Formularen åbnes med `action` og `method`. Label står foran feltet, så teksten kommer før. Knappen står til sidst, og `</form>` lukker." },
      { t: "laes", h: "GET og POST",
        md: "Når formularen sendes, laver browseren en **forespørgsel** (*request*) til serveren. Attributten `method` bestemmer, hvordan data kommer med:\n\n- **GET** sætter data **i adressen** efter et `?`. Man kan se det, gemme det som bogmærke og dele linket. Bruges til at **hente** og **søge**.\n- **POST** sender data **inde i forespørgslen**, ikke i adressen. Bruges, når noget skal **gemmes, ændres eller slettes** — og altid ved adgangskoder.",
        sprog: "html",
        kode: R`<form action="/soeg" method="get">
  <input type="text" name="q">
  <button>Søg</button>
</form>`,
        noter: [
          ["method=\"get\"", "Søger brugeren på `kaffe`, går browseren til adressen `/soeg?q=kaffe`."],
          ["?q=kaffe", "Efter `?` kommer navn=værdi. Flere felter skilles med `&`: `?q=kaffe&side=2`."],
          ["method=\"post\"", "Adressen er bare `/soeg`. Data ligger skjult i forespørgslen."]
        ],
        md2: "Det er afgørende i MVC: en controller har typisk **to** metoder med samme navn. Den ene svarer på **GET** og viser den tomme formular. Den anden har `[HttpPost]` og modtager det udfyldte. Står der ingen `method` på formularen, bruger browseren GET." },
      { t: "valg", q: "En formular, hvor brugeren logger ind med e-mail og adgangskode. Hvilken `method` skal den have?",
        svar: ["`post` — adgangskoden må ikke stå i adressen, og login ændrer noget på serveren", "`get` — så kan brugeren gemme login som bogmærke", "Ingen — browseren vælger selv POST ved adgangskoder", "Det er ligegyldigt"],
        ret: 0,
        fordi: "Med GET ville adgangskoden stå i adresselinjen, i browserens historik og i serverens log. Login skal altid være **POST**. Står der ingen `method`, bruger browseren GET — den vælger ikke selv POST." },
      { t: "valg", q: "Brugeren skriver `kat` i feltet og klikker Søg. Hvilken adresse går browseren til?",
        sprog: "html",
        kode: R`<form action="/dyr" method="get">
  <input type="text" name="art">
  <button>Søg</button>
</form>`,
        svar: ["`/dyr?art=kat`", "`/dyr?q=kat`", "`/dyr/kat`", "`/dyr` — med GET sendes data skjult"],
        ret: 0,
        fordi: "Adressen kommer fra `action` (`/dyr`). Med GET kommer data i adressen efter `?` som navn=værdi, og navnet er feltets `name` (`art`)." },
      { t: "fejl", q: "Formularen skal sende både navn og e-mail til serveren. Men serveren modtager kun e-mailen. Hvilken linje er skyld i det?",
        sprog: "html",
        kode: R`<form action="/tilmeld" method="post">
  <label for="navn">Navn</label>
  <input type="text" id="navn">
  <label for="email">E-mail</label>
  <input type="email" id="email" name="email">
  <button type="submit">Tilmeld</button>
</form>`,
        linje: 3,
        fordi: "Navne-feltet har ingen `name`. Et felt uden `name` bliver **slet ikke sendt** — `id` er kun til label og CSS. Det er en klassisk fejl, når en MVC-metode får `null` i en parameter.",
        rettet: R`<form action="/tilmeld" method="post">
  <label for="navn">Navn</label>
  <input type="text" id="navn" name="navn">
  <label for="email">E-mail</label>
  <input type="email" id="email" name="email">
  <button type="submit">Tilmeld</button>
</form>` },
      { t: "skriv", q: "Skriv en login-formular:\n\n- `form` med `action=\"/login\"` og `method=\"post\"`\n- et `input` med `type=\"email\"` og `name=\"email\"`\n- et `input` med `type=\"password\"` og `name=\"kode\"`\n- en `button` med teksten `Log ind`\n\nLabels må du gerne skrive med, men de tjekkes ikke.",
        sprog: "html",
        tjek: [
          [/<form[^>]*action=["']\/login["']/, "`form` med `action=\"/login\"`"],
          [/<form[^>]*method=["']post["']/i, "`form` med `method=\"post\"`"],
          [/<input(?=[^>]*type=["']email["'])(?=[^>]*name=["']email["'])[^>]*>/, "Et `input` med `type=\"email\"` og `name=\"email\"`"],
          [/<input(?=[^>]*type=["']password["'])(?=[^>]*name=["']kode["'])[^>]*>/, "Et `input` med `type=\"password\"` og `name=\"kode\"`"],
          [/<button[^>]*>Log ind<\/button>/, "En knap med teksten `Log ind`"],
          ["</form>", "Luk formularen med `</form>`"]
        ],
        forkert: ["<form action=\"/login\" method=\"get\">\n<input type=\"email\" name=\"email\">\n<input type=\"password\" name=\"kode\">\n<button>Log ind</button>\n</form>", "<form action=\"/login\" method=\"post\">\n<input type=\"email\" id=\"email\">\n<input type=\"password\" name=\"kode\">\n<button>Log ind</button>\n</form>"],
        loesning: R`<form action="/login" method="post">
  <label for="email">E-mail</label>
  <input type="email" id="email" name="email">
  <label for="kode">Adgangskode</label>
  <input type="password" id="kode" name="kode">
  <button type="submit">Log ind</button>
</form>` },
      { t: "ide", h: "Se GET med dine egne øjne",
        md: "Lav filen `tilmeld.html` i mappen `web`. Formularen har **ingen** `action` og bruger `method=\"get\"` — så sender browseren data til **samme side**, og du kan se dem i adresselinjen. (POST kan du ikke prøve endnu, for det kræver en server. Det gør du i modul 16.)",
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="utf-8">
  <title>Tilmelding</title>
</head>
<body>
  <h1>Tilmeld dig kurset</h1>
  <form method="get">
    <p>
      <label for="navn">Navn</label>
      <input type="text" id="navn" name="navn" required>
    </p>
    <p>
      <label for="hold">Hold</label>
      <select id="hold" name="hold">
        <option value="morgen">Morgenhold</option>
        <option value="aften">Aftenhold</option>
      </select>
    </p>
    <p>
      <input type="checkbox" id="nyhed" name="nyhedsbrev">
      <label for="nyhed">Send mig nyhedsbrevet</label>
    </p>
    <button type="submit">Tilmeld</button>
  </form>
</body>
</html>`,
        md2: "Prøv det her, og se på adresselinjen hver gang:\n\n1. Klik **Tilmeld** uden at skrive noget. Browseren stopper dig, fordi feltet er `required`.\n2. Skriv `Peter`, vælg Aftenhold, og klik **Tilmeld**. Adressen ender på `?navn=Peter&hold=aften`.\n3. Sæt flueben, og send igen. Nu kommer `&nyhedsbrev=on` med.\n4. Slet `name=\"hold\"` i filen, gem, genindlæs, og send. Holdet er væk fra adressen.\n\nSkriver du et navn med mellemrum eller æ, ø, å, ser du mærkelige tegn som `+` og `%C3%A6` i adressen. Det er sådan, browseren pakker de tegn ind; serveren pakker dem ud igen." },
      { t: "forklar", q: "Forklar med dine egne ord: hvad er forskellen på GET og POST i en formular, og hvornår bruger man hvilken?",
        svar: "Med **GET** sætter browseren formularens data **i adressen** efter et `?`, som navn=værdi-par, fx `/soeg?q=kaffe`. Man kan se dem og gemme linket, så GET bruges til at **hente og søge**. Med **POST** sendes data **inde i forespørgslen** og ikke i adressen. POST bruges, når noget skal **gemmes, ændres eller slettes**, og altid til login og adgangskoder. I MVC svarer en metode på GET og viser formularen, og en metode med `[HttpPost]` modtager det udfyldte. Navnene på værdierne kommer fra felternes `name`.",
        noegle: ["adressen", "navn=værdi", "hente", "gemme", "HttpPost", "name"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m13l4", titel: "CSS: selektorer, farver og boksmodellen", min: 20,
    ord: [
      ["CSS", "Cascading Style Sheets. Sproget, der bestemmer, hvordan HTML ser ud: farver, skrift, afstande, layout."],
      ["Regel", "En selektor og en blok af egenskaber: `h1 { color: navy; }`."],
      ["Selektor", "Den del af reglen, der vælger, HVILKE elementer reglen gælder for: `h1`, `.pris`, `#top`."],
      ["Egenskab og værdi", "Det, der ændres, og hvad det ændres til: `color: navy;`. Hver linje slutter med semikolon."],
      ["class / id", "Attributter, som CSS kan vælge med. En `class` kan bruges på mange elementer (`.navn`), et `id` kun på ét (`#navn`)."],
      ["Kaskade", "Reglerne for, hvilken CSS-regel der vinder, når flere passer: den mest specifikke vinder, og ved lige styrke vinder den sidste."],
      ["Boksmodellen", "Hvert element er en kasse: indhold, padding (luft indeni), border (kant) og margin (luft udenfor)."]
    ],
    trin: [
      { t: "laes", h: "En CSS-regel",
        md: "HTML bestemmer **hvad** der står på siden. **CSS** bestemmer, **hvordan** det ser ud.\n\nCSS består af **regler**. En regel har en **selektor**, der vælger elementerne, og en blok i tuborgklammer med **egenskaber** og deres **værdier**. Hver egenskab slutter med semikolon — ligesom en sætning i C#.",
        sprog: "css",
        kode: R`h1 {
  color: navy;
  font-size: 32px;
  background-color: #f0f0f0;
}`,
        noter: [
          ["h1", "Selektoren: reglen gælder for alle `h1`-elementer."],
          ["color: navy;", "Egenskaben `color` (tekstfarve) får værdien `navy`. Kolon mellem egenskab og værdi, semikolon til sidst."],
          ["font-size: 32px;", "Skriftstørrelse i pixels (`px`), punkterne på skærmen."],
          ["#f0f0f0", "En farve skrevet som hex-kode: `#` og så rød, grøn og blå som to tegn hver (00 = intet, ff = fuldt). `#f0f0f0` er lysegrå. Farver kan også skrives som navne (`red`) eller `rgb(240, 240, 240)`."]
        ] },
      { t: "valg", q: "Hvad er **selektoren** i denne regel?",
        sprog: "css",
        kode: R`p {
  color: darkgreen;
}`,
        svar: ["`p`", "`color`", "`darkgreen`", "`{ }`"],
        ret: 0,
        fordi: "Selektoren står før tuborgklammen og vælger elementerne — her alle `p`. `color` er egenskaben og `darkgreen` værdien." },
      { t: "laes", h: "Tre slags selektorer",
        md: "Oftest vil du ikke ændre **alle** afsnit — kun nogle bestemte. Så giver du dem en `class` eller et `id` i HTML og vælger dem i CSS:\n\n- **Element**: `p` vælger alle `p`.\n- **Klasse**: `.pris` (med punktum) vælger alle elementer med `class=\"pris\"`. Mange elementer må have samme klasse.\n- **Id**: `#top` (med havelåge) vælger det ene element med `id=\"top\"`. Et id må kun bruges én gang pr. side.",
        sprog: "html",
        kode: R`<style>
  p { color: gray; }
  .pris { color: green; font-weight: bold; }
  #top { font-size: 40px; }
</style>

<h1 id="top">Butikken</h1>
<p>Kaffe</p>
<p class="pris">45 kr.</p>
<p class="pris udsalg">30 kr.</p>`,
        noter: [
          ["<style>", "Et sted, hvor CSS kan stå i HTML-filen. Mere om det om lidt."],
          [".pris", "Punktum betyder klasse. Gælder begge `p` med klassen `pris`."],
          ["#top", "Havelåge betyder id. Gælder kun `h1`."],
          ["class=\"pris udsalg\"", "Et element kan have flere klasser, skilt med mellemrum."]
        ],
        md2: "Klasse- og id-navne skelner mellem store og små bogstaver, ligesom C#. `.Pris` passer ikke til `class=\"pris\"`." },
      { t: "udfyld", q: "Afsnittet skal være rødt. Skriv selektoren, der vælger det via dets klasse.",
        sprog: "html",
        kode: R`<style>
  [[.advarsel]] { color: red; }
</style>
<p class="advarsel">Husk at gemme!</p>`,
        fordi: "En klasse vælges med punktum foran navnet: `.advarsel`. Uden punktum ville CSS lede efter et element, der hedder `advarsel`." },
      { t: "valg", q: "Du har ti produkter på en side, og alle priserne skal være grønne. Hvad giver du pris-elementerne?",
        svar: ["Samme `class`, fx `class=\"pris\"`, og vælger dem med `.pris`", "Samme `id`, fx `id=\"pris\"`, og vælger dem med `#pris`", "Hver sit `id` og ti regler i CSS", "En `style`-attribut på hver af dem"],
        ret: 0,
        fordi: "En **klasse** må bruges på så mange elementer, du vil — det er netop det, den er til. Et **id** skal være unikt på siden. Ti `style`-attributter virker, men så skal du rette ti steder, når farven skal ændres." },
      { t: "laes", h: "Hvor bor CSS?",
        md: "CSS kan stå tre steder. Det sidste er det rigtige i et projekt:",
        sprog: "html",
        kode: R`<!-- 1. Inline: i en style-attribut på ét element -->
<p style="color: red;">Kun mig</p>

<!-- 2. I et style-element i head -->
<style>
  p { color: blue; }
</style>

<!-- 3. I en separat fil, som head henviser til -->
<link rel="stylesheet" href="style.css">`,
        noter: [
          ["<!-- … -->", "En kommentar i HTML — som `//` i C#."],
          ["style=\"…\"", "Inline CSS. Gælder kun dette ene element. Bruges sjældent: det er svært at vedligeholde."],
          ["<style>", "CSS for én side. Fint til små eksperimenter."],
          ["<link rel=\"stylesheet\" href=\"style.css\">", "Den rigtige måde: al CSS i én fil, som alle sider bruger. Ændrer du farven ét sted, ændres den overalt."]
        ],
        md2: "I et MVC-projekt ligger din CSS-fil i `wwwroot/css/site.css`, og `_Layout.cshtml` henviser til den med netop sådan et `link`." },
      { t: "skriv", q: "Skriv en CSS-regel for klassen `pris`, der gør teksten grøn (`green`) og fed (`font-weight: bold`).",
        sprog: "css",
        tjek: [
          [/\.pris\{/, "Selektoren er `.pris` (med punktum)"],
          [/\{[^}]*color:green;?[^}]*\}/, "`color: green;`"],
          [/\{[^}]*font-weight:bold;?[^}]*\}/, "`font-weight: bold;`"],
          [/color:green(?!;|\})/, "Hver egenskab slutter med semikolon", "ikke"]
        ],
        forkert: ["pris { color: green; font-weight: bold; }", ".pris { color: green font-weight: bold; }", "#pris { color: green; font-weight: bold; }"],
        loesning: R`.pris {
  color: green;
  font-weight: bold;
}` },
      { t: "laes", h: "Kaskaden: hvilken regel vinder?",
        md: "Tit passer flere regler på det samme element. Så afgør **kaskaden** (det første C i CSS), hvilken der vinder. Reglen er:\n\n1. Den mest **specifikke** selektor vinder: `style`-attribut slår id, id slår klasse, klasse slår element.\n2. Er to selektorer **lige stærke**, vinder den, der står **sidst**.\n\nDet er derfor et afsnit med en klasse kan have en anden farve end resten — selv om `p`-reglen står længere nede.",
        sprog: "css",
        kode: R`p { color: gray; }
.vigtig { color: red; }
p { color: black; }`,
        noter: [
          ["p { color: gray; }", "Alle `p` bliver grå."],
          [".vigtig { color: red; }", "Afsnit med klassen `vigtig` bliver røde. En klasse er stærkere end et element."],
          ["p { color: black; }", "Almindelige `p` bliver sorte (samme styrke, står sidst). `p.vigtig` forbliver rød: klassen er stadig stærkere."]
        ] },
      { t: "spor", h: "Spor: kaskaden linje for linje",
        q: "Siden har to afsnit: `<p>Almindelig</p>` og `<p class=\"vigtig\">Vigtig</p>`. Browseren læser CSS'en linje for linje. Skriv, hvilken tekstfarve hvert afsnit har, når linjen er læst. Husk: klasse slår element, og ved lige styrke vinder den sidste.",
        sprog: "css",
        kode: R`p { color: black; }
.vigtig { color: red; }
p { color: blue; }
.vigtig { color: green; }`,
        kolonner: ["almindelig p", "p.vigtig"],
        raekker: [[1, "=black", "=black"], [2, "black", "red"], [3, "blue", "red"], [4, "blue", "green"]],
        slut: false,
        fordi: "Linje 2 gælder kun afsnittet med klassen. Linje 3 er en element-regel: den vinder over linje 1 (samme styrke, står sidst), men taber til klassen fra linje 2 — så `p.vigtig` forbliver rød. Linje 4 er en klasse-regel ligesom linje 2, og den står sidst, så `p.vigtig` bliver grøn." },
      { t: "laes", h: "Boksmodellen",
        md: "Browseren tegner **hvert element som en kasse**. Kassen har fire lag, indefra og ud:\n\n1. **Indhold** — teksten eller billedet. `width` og `height` sætter størrelsen.\n2. **Padding** — luft **inden for** kanten. Har baggrundsfarven.\n3. **Border** — kanten.\n4. **Margin** — luft **uden for** kanten, mellem denne kasse og de andre. Altid gennemsigtig.",
        sprog: "css",
        kode: R`.boks {
  width: 200px;
  padding: 10px;
  border: 2px solid black;
  margin: 20px;
  background-color: lightyellow;
}`,
        noter: [
          ["width: 200px;", "Bredden af **indholdet** — ikke af hele kassen."],
          ["padding: 10px;", "10 px luft indenfor på alle fire sider."],
          ["border: 2px solid black;", "En 2 px tyk, hel (`solid`), sort kant."],
          ["margin: 20px;", "20 px luft udenfor på alle fire sider."],
          ["padding-top / margin-left …", "Vil du kun have luft på én side, skriver du siden efter bindestregen."]
        ],
        md2: "Kassen bliver altså **bredere end 200 px**: padding og border lægges oveni på begge sider. Mange skriver derfor `box-sizing: border-box;`, så `width` gælder hele kassen inklusive padding og kant. Bootstrap gør det for alle elementer." },
      { t: "spor", h: "Spor: hvor bred bliver kassen?",
        q: "Regn ud, hvor bred kassen er, efterhånden som browseren læser linjerne. `synlig bredde` er fra kant til kant (indhold + padding + border). `plads i alt` er det, kassen optager på siden (synlig bredde + margin). Padding, border og margin tæller på **begge** sider. Skriv kun tallet (antal px).",
        sprog: "css",
        kode: R`.boks {
  width: 200px;
  padding: 10px;
  border: 2px solid black;
  margin: 20px;
}`,
        kolonner: ["synlig bredde", "plads i alt"],
        raekker: [[2, "=200", "=200"], [3, "220", "220"], [4, "224", "224"], [5, "224", "264"]],
        slut: false,
        fordi: "Padding lægger 10 + 10 til: 220. Border lægger 2 + 2 til: 224 — det er den bredde, du ser. Margin er usynlig luft udenfor, så den synlige bredde er stadig 224, men kassen optager 20 + 224 + 20 = 264 px. Med `box-sizing: border-box` ville den synlige bredde være præcis 200." },
      { t: "fejl", q: "Overskriften skal være mørkerød og 40 px stor. Men den bliver hverken rød eller stor. Hvilken linje er skyld i det?",
        sprog: "css",
        kode: R`h1 {
  color: darkred
  font-size: 40px;
}`,
        linje: 2,
        fordi: "Der mangler et semikolon efter `darkred`. Så læser browseren `darkred font-size: 40px` som **én** ugyldig værdi for `color` og smider det hele væk — begge egenskaber forsvinder.\n\nCSS giver heller ingen fejlbesked. Men i udviklerværktøjerne (fanen **Styles**) står en ugyldig egenskab **overstreget** med et lille advarselstegn.",
        rettet: R`h1 {
  color: darkred;
  font-size: 40px;
}` },
      { t: "ide", h: "CSS i sin egen fil — og Styles i browseren",
        md: "Giv din side fra lektion 1 (`index.html`) udseende med en separat CSS-fil.\n\n1. Lav en ny fil `style.css` i mappen `web` ({{Visual Studio: **File → New → File…** → **Style Sheet**, og gem den som `style.css`||Rider: højreklik på mappen → **New → Stylesheet**, og kald den `style`}}).\n2. Skriv CSS'en nedenfor.\n3. Indsæt linjen `<link rel=\"stylesheet\" href=\"style.css\">` i `head` i `index.html`, under `title`.\n4. Giv afsnittet `Jeg hedder Peter …` attributten `class=\"intro\"`. Gem begge filer, og genindlæs siden.",
        sprog: "css",
        kode: R`body {
  font-family: Arial, sans-serif;
  background-color: #fafafa;
}

h1 {
  color: navy;
}

.intro {
  background-color: lightyellow;
  padding: 10px;
  border: 2px solid orange;
  margin: 20px;
}`,
        md2: "Åbn udviklerværktøjerne ({{F12||⌥⌘I}}), og klik på afsnittet med klassen `intro` i **Elements**. Til højre i fanen **Styles** ser du de regler, der gælder for det. Prøv:\n\n- Klik på fluebenet ud for `padding`, så det forsvinder. Se kassen ændre sig. (Det ændrer kun i browseren, ikke i din fil.)\n- Klik på fanen **Computed**. Øverst er en tegning af boksmodellen med tal for margin, border, padding og indhold.\n- Slet semikolonet efter `lightyellow` i `style.css`, gem, genindlæs, og se, hvordan `Styles` viser fejlen. (Efter `navy` ville det ikke give en fejl: den sidste egenskab i en regel må godt mangle semikolon.)" },
      { t: "forklar", q: "Forklar boksmodellen: hvilke fire dele har en kasse i CSS, og hvorfor bliver et element med `width: 200px` ofte bredere end 200 px?",
        svar: "Hvert element er en kasse med fire lag indefra og ud: **indhold**, **padding** (luft inden for kanten), **border** (kanten) og **margin** (luft uden for kanten). Som standard gælder `width` kun indholdet, så padding og border lægges oveni på begge sider — `width: 200px` med 10 px padding og 2 px kant bliver 224 px bred. Margin er usynlig luft, der skubber andre elementer væk. Med `box-sizing: border-box` gælder `width` hele kassen inklusive padding og kant.",
        noegle: ["indhold", "padding", "border", "margin", "box-sizing"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m13l5", titel: "Layout: flexbox, grid og responsivt design", min: 20,
    ord: [
      ["display", "CSS-egenskaben, der bestemmer, hvordan et element lægges ud: `block`, `inline`, `none`, `flex`, `grid`."],
      ["Flexbox", "`display: flex`: børnene i en beholder lægges på én række (eller én kolonne) med styr på afstand og placering."],
      ["Grid", "`display: grid`: børnene lægges i et gitter med kolonner (og rækker), som du selv definerer."],
      ["fr", "\"Fraction\": en andel af den ledige plads i et grid. `1fr 2fr` giver én tredjedel og to tredjedele."],
      ["Responsivt design", "At siden tilpasser sig skærmens bredde, så den virker både på telefon og computer."],
      ["Media query", "`@media (max-width: 600px) { … }`: CSS, der kun gælder, når skærmen opfylder betingelsen."],
      ["Viewport", "Det synlige område af siden i browseren. Meta-tagget `viewport` får telefoner til at bruge deres rigtige bredde."]
    ],
    trin: [
      { t: "laes", h: "display: block, inline og none",
        md: "Fra lektion 2 kender du **blok-elementer** (ny linje, hele bredden) og **inline-elementer** (inde i teksten). Det er ikke fastlåst: egenskaben `display` bestemmer det, og du kan ændre den med CSS.",
        sprog: "css",
        kode: R`nav a {
  display: block;
}

.skjult {
  display: none;
}`,
        noter: [
          ["nav a", "En selektor med mellemrum: alle `a`, der ligger **inden i** et `nav`."],
          ["display: block;", "Linkene opfører sig nu som blokke: hvert link på sin egen linje i hele bredden."],
          ["display: none;", "Elementet forsvinder helt og fylder ingenting. Bruges fx til at skjule en menu på telefoner."],
          ["display: inline;", "Den modsatte vej: en blok, der opfører sig som tekst."]
        ] },
      { t: "valg", q: "Et element har `display: none;`. Hvad sker der?",
        svar: ["Det vises ikke og fylder ingen plads på siden", "Det bliver gennemsigtigt, men fylder stadig sin plads", "Det bliver slettet fra HTML-filen", "Det vises som almindelig tekst"],
        ret: 0,
        fordi: "`display: none` fjerner elementet fra layoutet: det er usynligt, og de andre elementer rykker op. Det står stadig i HTML-filen — du kan se det i udviklerværktøjerne." },
      { t: "laes", h: "Flexbox: ting på række",
        md: "Den mest brugte måde at lægge ting ved siden af hinanden er **flexbox**. Du sætter `display: flex` på **beholderen** (forælderen) — så lægges alle dens **børn** (elementerne direkte inden i) på én række.\n\nDerefter styrer du placeringen med nogle få egenskaber på beholderen:",
        sprog: "html",
        kode: R`<style>
  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }
</style>

<nav class="menu">
  <a href="index.html">Forside</a>
  <a href="menu.html">Menu</a>
  <a href="kontakt.html">Kontakt</a>
</nav>`,
        noter: [
          ["display: flex;", "På **beholderen**. Børnene (de tre links) lægges på én række."],
          ["justify-content", "Placering **langs** rækken: `flex-start` (venstre), `center` (midten), `space-between` (første helt til venstre, sidste helt til højre, lige stor afstand imellem)."],
          ["align-items: center;", "Placering **på tværs**: børnene centreres lodret, også hvis de er forskellige høje."],
          ["gap: 16px;", "Mindst 16 px afstand mellem børnene."],
          ["flex-direction: column;", "Læg børnene i en kolonne i stedet for en række."]
        ] },
      { t: "udfyld", q: "De tre kort skal ligge på én række med 20 px imellem. Udfyld CSS'en på beholderen.",
        sprog: "html",
        kode: R`<style>
  .kort-raekke {
    display: [[flex]];
    [[gap|column-gap]]: 20px;
  }
</style>

<div class="kort-raekke">
  <div>Kaffe</div>
  <div>Te</div>
  <div>Kakao</div>
</div>`,
        fordi: "`display: flex` på beholderen lægger børnene på række, og `gap` sætter afstanden mellem dem." },
      { t: "valg", q: "Du skriver `display: flex;` på hvert af de tre links i stedet for på `nav`. Hvad sker der?",
        sprog: "css",
        kode: R`nav a {
  display: flex;
}`,
        svar: ["Linkene kommer på hver sin linje — hvert link bliver en flex-beholder og opfører sig som en blok", "Linkene kommer på én række, præcis som ønsket", "Intet — `flex` virker kun på `div`", "Linkene forsvinder"],
        ret: 0,
        fordi: "`display: flex` skal sidde på **beholderen**, så den styrer sine børn. Sætter du det på hvert link, bliver hvert link selv en beholder (for sin egen tekst) og opfører sig som en blok — så de stables under hinanden. Det er en af de mest almindelige layoutfejl." },
      { t: "laes", h: "Grid: et gitter med kolonner",
        md: "Flexbox er til **én** række. Skal noget ligge i et **gitter** med faste kolonner — fx et produktkatalog — bruger du **grid**. Du sætter `display: grid` på beholderen og bestemmer kolonnerne med `grid-template-columns`. Børnene fylder selv kolonnerne op, række for række.",
        sprog: "css",
        kode: R`.katalog {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.side {
  display: grid;
  grid-template-columns: 200px 1fr;
}`,
        noter: [
          ["1fr 1fr 1fr", "Tre kolonner, der deler den ledige plads lige. `fr` betyder *fraction* (andel). Kan også skrives `repeat(3, 1fr)`."],
          ["gap: 20px;", "Afstand mellem både kolonner og rækker."],
          ["200px 1fr", "To kolonner: en fast på 200 px (fx en sidemenu) og en, der tager resten."]
        ],
        md2: "En tommelfingerregel: **flexbox** til en række ting (en menu, knapper ved siden af hinanden), **grid** til et helt gitter eller sidens overordnede layout." },
      { t: "valg", q: "Et katalog har seks produkter og `grid-template-columns: 1fr 1fr 1fr;`. Hvordan ligger de?",
        svar: ["To rækker med tre produkter i hver, lige brede", "Én række med seks produkter", "Tre rækker med to produkter i hver", "Seks rækker med ét produkt i hver"],
        ret: 0,
        fordi: "Tre værdier betyder tre kolonner. Børnene fylder kolonnerne op række for række: tre i første række, tre i anden. `1fr` gør dem lige brede." },
      { t: "laes", h: "Responsivt design: @media og viewport",
        md: "Siden skal virke både på en bred computerskærm og en smal telefon. Det kaldes **responsivt design**.\n\nVærktøjet er en **media query**: en blok CSS, der kun gælder, når skærmen opfylder en betingelse. `max-width: 600px` betyder \"når skærmen højst er 600 px bred\".\n\nDerudover skal hver side have et **viewport**-meta-tag i `head`. Uden det lader telefoner, som om de er ca. 980 px brede, og zoomer ud — så din media query bliver aldrig brugt.",
        sprog: "html",
        kode: R`<meta name="viewport" content="width=device-width, initial-scale=1">

<style>
  .kolonner {
    display: flex;
    gap: 20px;
  }

  @media (max-width: 600px) {
    .kolonner {
      flex-direction: column;
    }
  }
</style>`,
        noter: [
          ["name=\"viewport\"", "Står i `head`. `width=device-width`: brug telefonens rigtige bredde. `initial-scale=1`: start uden zoom."],
          ["@media (max-width: 600px)", "Reglerne indenfor gælder kun, når skærmen er 600 px eller smallere."],
          ["flex-direction: column;", "På smalle skærme: læg kolonnerne under hinanden i stedet for ved siden af."]
        ],
        md2: "Reglen inde i `@media` står **efter** den almindelige regel og har samme styrke, så den vinder, når betingelsen passer — kaskaden fra sidste lektion." },
      { t: "fejl", q: "Meningen er, at kolonnerne skal stå **under hinanden på smalle skærme** (600 px og derunder) og ved siden af hinanden på brede. Men det er lige omvendt. Hvilken linje er forkert?",
        sprog: "css",
        kode: R`.kolonner {
  display: flex;
}
@media (min-width: 600px) {
  .kolonner {
    flex-direction: column;
  }
}`,
        linje: 4,
        fordi: "`min-width: 600px` betyder \"når skærmen er **mindst** 600 px\" — altså brede skærme. Det skal være `max-width: 600px`: \"når skærmen er **højst** 600 px\".",
        rettet: R`.kolonner {
  display: flex;
}
@media (max-width: 600px) {
  .kolonner {
    flex-direction: column;
  }
}` },
      { t: "valg", q: "Din side har en media query for skærme under 600 px. På computeren virker den, når du gør vinduet smalt. Men på din telefon sker der intet. Hvad mangler sandsynligvis?",
        svar: ["`<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">` i `head`", "`display: flex` på `body`", "En `max-width` på hvert element", "Telefonen understøtter ikke CSS"],
        ret: 0,
        fordi: "Uden viewport-tagget lader telefonen, som om skærmen er ca. 980 px bred, og zoomer ud. Så er skærmen aldrig under 600 px, og din media query gælder aldrig." },
      { t: "skriv", q: "Skriv en media query, der gælder, når skærmen er **højst 700 px** bred. Inden i skal klassen `kolonner` få `flex-direction: column;`.",
        sprog: "css",
        tjek: [
          [/@media ?\(max-width:700px\)\{/, "`@media (max-width: 700px) {`"],
          [/\.kolonner\{flex-direction:column;?\}/, "Inden i: `.kolonner { flex-direction: column; }`"],
          [/\}\}$/, "Luk både reglen og media query'en med hver sin `}`"],
          [/min-width/, "Brug `max-width` (højst), ikke `min-width` (mindst)", "ikke"]
        ],
        forkert: ["@media (min-width: 700px) {\n  .kolonner { flex-direction: column; }\n}", "@media (max-width: 700px) {\n  kolonner { flex-direction: column; }\n}", "@media (max-width: 700px) {\n  .kolonner { flex-direction: column; }"],
        loesning: R`@media (max-width: 700px) {
  .kolonner {
    flex-direction: column;
  }
}` },
      { t: "ide", h: "Et responsivt layout",
        md: "Lav filen `layout.html` i mappen `web`. Menuen bruger flexbox, produkterne ligger i et grid med tre kolonner, og på smalle skærme kommer produkterne under hinanden.",
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Layout</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: Arial, sans-serif; margin: 0; }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      background-color: navy;
      color: white;
    }
    nav { display: flex; gap: 16px; }
    nav a { color: white; }
    .katalog {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      padding: 20px;
    }
    .kort { border: 1px solid #ccc; padding: 10px; }
    @media (max-width: 600px) {
      .katalog { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <header>
    <h1>Kaffebaren</h1>
    <nav>
      <a href="index.html">Forside</a>
      <a href="layout.html">Produkter</a>
    </nav>
  </header>
  <main class="katalog">
    <div class="kort">Kaffe</div>
    <div class="kort">Te</div>
    <div class="kort">Kakao</div>
    <div class="kort">Juice</div>
  </main>
</body>
</html>`,
        md2: "Selektoren `*` betyder **alle elementer**. `padding: 10px 20px` betyder 10 px foroven og forneden, 20 px i siderne.\n\nTest det responsive:\n\n1. Gør browservinduet smalt med musen. Under 600 px kommer kortene under hinanden.\n2. Åbn udviklerværktøjerne, og klik på ikonet med en telefon og en tablet øverst til venstre i værktøjerne. Nu kan du vælge en telefon i listen øverst og se siden i dens bredde.\n3. Find `header` i **Elements**. Lige efter `<header>` i træet står et lille mærke med teksten `flex` — klik på det, så viser browseren på siden, hvordan børnene er lagt ud. `main` har på samme måde et `grid`-mærke." },
      { t: "forklar", q: "Forklar med dine egne ord: hvad er forskellen på flexbox og grid, og hvordan gør man en side responsiv?",
        svar: "Begge sættes på **beholderen** med `display` og styrer dens børn. **Flexbox** lægger børnene på **én række** (eller én kolonne) og styrer afstand og placering med `justify-content`, `align-items` og `gap` — godt til menuer og knapper. **Grid** lægger børnene i et **gitter** med kolonner, som man definerer med `grid-template-columns`, fx `1fr 1fr 1fr` — godt til kataloger og sidens overordnede layout. En side gøres **responsiv** med **media queries**, fx `@media (max-width: 600px)`, der ændrer layoutet på smalle skærme, og med **viewport**-meta-tagget, så telefoner bruger deres rigtige bredde.",
        noegle: ["beholder", "én række", "gitter", "media query", "viewport"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m13l6", titel: "Bootstrap: færdigt design med klasser", min: 18,
    ord: [
      ["Bootstrap", "Et gratis CSS-bibliotek med færdige klasser til layout, knapper, kort, formularer og menuer. Er med i ASP.NET Core MVC fra start."],
      ["CDN", "Content Delivery Network: en server på nettet, der leverer kendte filer som Bootstrap, så du ikke selv skal downloade dem."],
      ["container", "Bootstrap-klasse, der giver siden en passende bredde og luft i siderne."],
      ["row / col", "Bootstraps grid: en `row` deles i 12 kolonner, og `col-md-4` fylder 4 af dem fra mellemstore skærme og op."],
      ["Breakpoint", "Den skærmbredde, hvor layoutet skifter. I Bootstrap: `sm` 576 px, `md` 768 px, `lg` 992 px."],
      ["Utility-klasse", "En lille klasse, der gør én ting: `mt-3` (margin foroven), `text-center`, `bg-light`."]
    ],
    trin: [
      { t: "laes", h: "Hvad er Bootstrap?",
        md: "At skrive al CSS selv tager lang tid. **Bootstrap** er et CSS-bibliotek med hundredvis af færdige **klasser**. Du skriver ikke CSS — du giver bare dine HTML-elementer de rigtige klasser.\n\nNår du laver et nyt ASP.NET Core MVC-projekt, er Bootstrap allerede med (i mappen `wwwroot/lib/bootstrap`), og alle de genererede sider bruger det. Derfor skal du kunne læse det.\n\nI dine egne øvefiler henter du Bootstrap fra et **CDN** — en server på nettet, der leverer kendte filer. Det kræver internet.",
        sprog: "html",
        kode: R`<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Med Bootstrap</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body>
  <div class="container">
    <h1>Hej Bootstrap</h1>
    <button class="btn btn-primary">Klik her</button>
  </div>
</body>`,
        noter: [
          ["<link … bootstrap.min.css>", "Henter Bootstraps CSS-fil. `5.3.3` er versionen. `.min` betyder, at filen er pakket uden mellemrum, så den er hurtig at hente."],
          ["class=\"container\"", "En beholder med passende bredde og luft i siderne. Næsten alt i Bootstrap ligger i en `container`."],
          ["class=\"btn btn-primary\"", "To klasser: `btn` gør det til en Bootstrap-knap, `btn-primary` giver den hovedfarven (blå)."]
        ] },
      { t: "valg", q: "Hvorfor er det vigtigt for dig at kunne læse Bootstrap-klasser?",
        svar: ["Fordi ASP.NET Core MVC-skabelonen bruger Bootstrap på alle de sider, den genererer", "Fordi browsere ikke kan vise HTML uden Bootstrap", "Fordi Bootstrap erstatter HTML", "Fordi CSS ikke virker i MVC"],
        ret: 0,
        fordi: "Bootstrap er bare en CSS-fil med færdige klasser. Browseren klarer sig fint uden. Men MVC-skabelonen og de sider, Visual Studio og Rider genererer til dig, er fyldt med Bootstrap-klasser, så du møder dem hele tiden." },
      { t: "laes", h: "Bootstraps grid: 12 kolonner",
        md: "Bootstrap deler hver række i **12 lige brede kolonner**. Du bestemmer, hvor mange af de 12 hver boks skal fylde.\n\nKlassen `col-md-4` betyder: \"fyld 4 af 12 kolonner, **fra mellemstore skærme og op**\". På smallere skærme fylder boksen hele bredden, så boksene kommer under hinanden. Det er responsivt design uden en eneste media query — Bootstrap har skrevet dem for dig.",
        sprog: "html",
        kode: R`<div class="container">
  <div class="row">
    <div class="col-md-4">Kaffe</div>
    <div class="col-md-4">Te</div>
    <div class="col-md-4">Kakao</div>
  </div>
</div>`,
        noter: [
          ["row", "En række. Den er en flex-beholder — Bootstrap bruger flexbox indeni."],
          ["col-md-4", "4 af 12 kolonner = en tredjedel. Tre af dem fylder rækken: 4 + 4 + 4 = 12."],
          ["md", "Breakpointet: fra 768 px og op. `sm` er 576 px, `lg` er 992 px. Under breakpointet fylder kolonnen hele bredden."],
          ["col-md-8 + col-md-4", "Kolonner må være forskellige: to tredjedele og en tredjedel."]
        ] },
      { t: "valg", q: "En række har `col-md-6` og `col-md-6`. Hvordan ser det ud på en bred computerskærm og på en smal telefon?",
        svar: ["Computer: to lige brede kolonner ved siden af hinanden. Telefon: under hinanden i fuld bredde", "Computer: seks kolonner. Telefon: én kolonne", "Begge steder ved siden af hinanden", "Computer: under hinanden. Telefon: ved siden af hinanden"],
        ret: 0,
        fordi: "6 + 6 = 12, så to halve kolonner. `md` betyder, at det gælder fra 768 px og op. Telefonen er smallere, så kolonnerne fylder hele bredden og kommer under hinanden." },
      { t: "udfyld", q: "Lav en række med en bred kolonne (to tredjedele) til indhold og en smal kolonne (en tredjedel) til en sidemenu, fra mellemstore skærme og op.",
        sprog: "html",
        kode: R`<div class="[[row]]">
  <div class="col-md-[[8]]">Indhold</div>
  <div class="col-md-[[4]]">Sidemenu</div>
</div>`,
        fordi: "To tredjedele af 12 er 8, en tredjedel er 4. 8 + 4 = 12, så rækken bliver fyldt præcis ud." },
      { t: "laes", h: "Knapper og kort",
        md: "Bootstrap har færdige komponenter. Du bygger dem af almindelige HTML-elementer med de rigtige klasser. Knapper har altid **to** klasser: `btn` og en farve.",
        sprog: "html",
        kode: R`<button class="btn btn-primary">Gem</button>
<button class="btn btn-danger">Slet</button>
<a class="btn btn-secondary" href="index.html">Tilbage</a>

<div class="card mt-3">
  <div class="card-body">
    <h5 class="card-title">Kaffe</h5>
    <p class="card-text">Mørkristet, 500 g.</p>
    <a class="btn btn-success" href="koeb.html">Køb</a>
  </div>
</div>`,
        noter: [
          ["btn", "Grundklassen for alle knapper. Uden den virker farveklassen ikke."],
          ["btn-primary / -danger / -secondary / -success", "Farven: blå (hovedhandling), rød (farlig), grå, grøn."],
          ["<a class=\"btn …\">", "Et link, der ser ud som en knap. Bruges meget i MVC til \"Create New\", \"Edit\" og \"Back to List\"."],
          ["card / card-body / card-title / card-text", "Et kort: en kasse med kant og runde hjørner, luft indeni og en titel."],
          ["mt-3", "En utility-klasse: margin foroven (`m` = margin, `t` = top) i størrelse 3 af 0–5. `mb-3` er margin forneden, `p-3` er padding."]
        ] },
      { t: "skriv", q: "Skriv et link til `opret.html` med teksten `Opret ny`, der ser ud som en blå Bootstrap-knap (`btn` og `btn-primary`).",
        sprog: "html",
        tjek: [
          [/<a[^>]*href=["']opret\.html["']/, "Et `a`-element med `href=\"opret.html\"`"],
          [/<a[^>]*class=["'][^"']*\bbtn\b(?!-)/, "Klassen `btn`"],
          [/<a[^>]*class=["'][^"']*\bbtn-primary\b/, "Klassen `btn-primary`"],
          [/>Opret ny<\/a>/, "Teksten `Opret ny`"]
        ],
        forkert: ["<a class=\"btn-primary\" href=\"opret.html\">Opret ny</a>", "<a class=\"btn btn-primary\" src=\"opret.html\">Opret ny</a>"],
        loesning: R`<a class="btn btn-primary" href="opret.html">Opret ny</a>` },
      { t: "laes", h: "Formularer med Bootstrap",
        md: "Bootstrap giver formularfelter et pænt, ensartet udseende. Hvert felt pakkes i et `div` med luft under, label får `form-label`, og feltet får `form-control` (eller `form-select` på en valgliste). Det er præcis sådan, MVC's genererede Create- og Edit-sider ser ud.",
        sprog: "html",
        kode: R`<form action="/kunder/opret" method="post">
  <div class="mb-3">
    <label for="navn" class="form-label">Navn</label>
    <input type="text" class="form-control" id="navn" name="navn">
  </div>
  <div class="mb-3">
    <label for="by" class="form-label">By</label>
    <select class="form-select" id="by" name="by">
      <option value="aar">Aarhus</option>
      <option value="kbh">København</option>
    </select>
  </div>
  <button type="submit" class="btn btn-primary">Gem</button>
</form>`,
        noter: [
          ["mb-3", "Margin forneden, så felterne ikke står klistret sammen."],
          ["form-label", "Label-teksten står over feltet med lidt luft."],
          ["form-control", "Feltet fylder hele bredden og får kant og runde hjørner."],
          ["form-select", "Det samme for en valgliste."]
        ],
        md2: "Bootstrap ændrer **kun udseendet**. `name`, `method` og `action` virker præcis som i lektion 3." },
      { t: "fejl", q: "Knappen skal være en blå Bootstrap-knap. Men den ligner en helt almindelig grå browser-knap. Hvilken linje er skyld i det?",
        sprog: "html",
        kode: R`<div class="container">
  <h1 class="mt-3">Ny kunde</h1>
  <button class="btn-primary">Gem</button>
</div>`,
        linje: 3,
        fordi: "Klassen `btn` mangler. I Bootstrap 5 sætter `btn-primary` kun farven op, men det er `btn`, der faktisk tegner knappen. Rettelsen er `class=\"btn btn-primary\"`.",
        rettet: R`<div class="container">
  <h1 class="mt-3">Ny kunde</h1>
  <button class="btn btn-primary">Gem</button>
</div>` },
      { t: "laes", h: "En menu: navbar",
        md: "Øverst på næsten alle sider står en menu. I Bootstrap hedder den en **navbar**. Her er en simpel udgave, der virker uden andet end CSS-filen:",
        sprog: "html",
        kode: R`<nav class="navbar navbar-expand bg-body-tertiary">
  <div class="container">
    <a class="navbar-brand" href="index.html">Kaffebaren</a>
    <ul class="navbar-nav">
      <li class="nav-item"><a class="nav-link active" href="index.html">Forside</a></li>
      <li class="nav-item"><a class="nav-link" href="menu.html">Menu</a></li>
    </ul>
  </div>
</nav>`,
        noter: [
          ["navbar navbar-expand", "En menulinje, der altid er foldet ud."],
          ["bg-body-tertiary", "En lysegrå baggrund. `bg-dark` giver en mørk."],
          ["navbar-brand", "Navnet eller logoet til venstre."],
          ["navbar-nav / nav-item / nav-link", "Selve menuen: en liste af links uden prikker."],
          ["active", "Markerer den side, man er på."]
        ],
        md2: "I MVC-skabelonens `_Layout.cshtml` hedder den `navbar-expand-sm` og har en knap med tre streger, der folder menuen sammen på telefoner. Den knap kræver Bootstraps **JavaScript**-fil — JavaScript er emnet i næste modul." },
      { t: "valg", q: "Hvad gør klassen `mt-3`?",
        svar: ["Giver elementet margin foroven (top), størrelse 3", "Gør elementet 3 kolonner bredt", "Giver tre px kant", "Gør teksten 3 gange større"],
        ret: 0,
        fordi: "Bootstraps utility-klasser er forkortelser: `m` = margin, `p` = padding, `t` = top, `b` = bottom, `s` = start (venstre), `e` = end (højre). Tallet går fra 0 til 5. `mt-3` er margin foroven, `mb-3` margin forneden, `p-2` padding hele vejen rundt." },
      { t: "ide", h: "En side med Bootstrap",
        md: "Lav filen `bootstrap.html` i mappen `web`. Den har en navbar, tre kort i et grid og en formular — de byggesten, et MVC-projekt består af. Du skal have internet, for Bootstrap hentes fra et CDN.",
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Kaffebaren</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body>
  <nav class="navbar navbar-expand bg-dark" data-bs-theme="dark">
    <div class="container">
      <a class="navbar-brand" href="bootstrap.html">Kaffebaren</a>
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link active" href="bootstrap.html">Forside</a></li>
        <li class="nav-item"><a class="nav-link" href="index.html">Om mig</a></li>
      </ul>
    </div>
  </nav>

  <main class="container mt-4">
    <h1>Dagens kaffe</h1>
    <div class="row">
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Etiopien</h5>
            <p class="card-text">Let og frisk.</p>
            <a class="btn btn-primary" href="#">Køb</a>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Brasilien</h5>
            <p class="card-text">Nøddeagtig.</p>
            <a class="btn btn-primary" href="#">Køb</a>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Colombia</h5>
            <p class="card-text">Fyldig og sød.</p>
            <a class="btn btn-primary" href="#">Køb</a>
          </div>
        </div>
      </div>
    </div>

    <h2 class="mt-4">Skriv til os</h2>
    <form method="get">
      <div class="mb-3">
        <label for="email" class="form-label">E-mail</label>
        <input type="email" class="form-control" id="email" name="email">
      </div>
      <button type="submit" class="btn btn-success">Send</button>
    </form>
  </main>
</body>
</html>`,
        md2: "`data-bs-theme=\"dark\"` giver menuen lys tekst på den mørke baggrund. `href=\"#\"` er et link, der ikke fører nogen steder hen — en pladsholder.\n\nGør vinduet smalt: under 768 px kommer kortene under hinanden. Åbn udviklerværktøjerne, klik på en knap i **Elements**, og se i **Styles**, hvor mange regler Bootstrap har skrevet for `.btn` — alt det slipper du for." },
      { t: "forklar", q: "Forklar med dine egne ord: hvad er Bootstrap, og hvordan virker dets grid?",
        svar: "Bootstrap er et **CSS-bibliotek** med færdige **klasser** til layout, knapper, kort, formularer og menuer. Man skriver ikke selv CSS, men giver elementerne de rigtige klasser, fx `btn btn-primary`. ASP.NET Core MVC bruger Bootstrap fra start. Bootstraps **grid** består af `container`, `row` og kolonner. Hver række er delt i **12 kolonner**, og en klasse som `col-md-4` fylder 4 af dem fra breakpointet `md` (768 px) og op. På smallere skærme fylder kolonnerne hele bredden og lægger sig under hinanden, så siden er **responsiv** uden egne media queries.",
        noegle: ["CSS-bibliotek", "klasser", "row", "12 kolonner", "responsiv"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m13v", titel: "Værksted: byg dine egne sider", vaerksted: true, min: 75, ord: [], trin: [

    { t: "laes", h: "Sådan arbejder du i værkstedet",
      md: "Nu skal du skrive **hele sider selv**. Siden her giver dig opgaven og kravene. Resten er dit.\n\nHTML og CSS kan ikke tjekkes af siden her, for resultatet er noget, man **ser** — ikke noget, et program skriver. Derfor gør du det sådan: læs kravene, byg siden, åbn den i browseren, og sæt flueben ved hvert krav, når du kan se, at det passer. Til sidst krydser du af, at siden virker.\n\nDu laver `.html`- og `.css`-filer i mappen `web`, præcis som i lektionerne.",
      noter: [
        ["Skriv selv", "Skriv HTML'en med dine egne fingre. Kopiér ikke fra lektionerne. Det er skrivningen, der får det til at sidde."],
        ["Gem og genindlæs tit", "Gem efter hver lille ændring, og genindlæs i browseren ({{F5||⌘R}}). Så ved du præcis, hvad der lavede en fejl."],
        ["Udviklerværktøjerne er din debugger", "HTML og CSS giver ingen fejlbeskeder. Åbn {{F12||⌥⌘I}}, klik på elementet i **Elements**, og se i **Styles**, hvilke regler der gælder — og hvilke der er streget over."],
        ["Tips før løsning", "Sidder du fast, så åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af."]
      ] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Dit visitkort",
      md: "Lav en lille side, der præsenterer dig. Den skal have et korrekt skelet, en overskrift, et par afsnit, et link og et billede. Gem filen som `visitkort.html` i mappen `web`.\n\nLæg et billede (fx `mig.jpg`) i samme mappe. Har du ikke et billede, så skriv `img`-elementet alligevel: så ser du `alt`-teksten i stedet for billedet.",
      krav: [
        "Filen har det fulde skelet: `<!DOCTYPE html>`, `html` med `lang=\"da\"`, `head` med `meta charset=\"utf-8\"` og en `title`, og `body`",
        "Fanen i browseren viser `Visitkort`",
        "Siden har én `h1` med dit navn",
        "Under den står to afsnit (`p`): ét om hvad du laver, og ét om hvad du kan lide. Mindst ét ord er fremhævet med `strong`",
        "Et billede med `src=\"mig.jpg\"` og en `alt`-tekst, der beskriver billedet",
        "Et link til `ugeplan.html` med teksten `Min ugeplan`",
        "Når du åbner siden, ser æ, ø og å rigtige ud"
      ],
      tip: [
        "Start med skelettet fra lektion 1: `<!DOCTYPE html>`, `html`, `head`, `body`. Gem og åbn siden, før du skriver mere.",
        "Fanens tekst er `<title>Visitkort</title>` inden i `head`. Alt det synlige står i `body`.",
        "Billede: `<img src=\"mig.jpg\" alt=\"Peter der smiler\">` — intet sluttag. Link: `<a href=\"ugeplan.html\">Min ugeplan</a>`."
      ],
      sprog: "html", fri: true,
      loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="utf-8">
  <title>Visitkort</title>
</head>
<body>
  <h1>Peter Hansen</h1>
  <p>Jeg læser <strong>Videregående programmering</strong> og lærer C# og webudvikling.</p>
  <p>Jeg kan lide kaffe, gåture og at finde fejl i kode.</p>
  <img src="mig.jpg" alt="Peter der smiler">
  <p><a href="ugeplan.html">Min ugeplan</a></p>
</body>
</html>`,
      ekstra: ["Tilføj en punktliste med tre ting, du kan.", "Åbn udviklerværktøjerne, og tjek i **Elements**, at alle elementer er lukket, hvor du regnede med."] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "En opskrift med struktur",
      md: "Lav en opskriftsside med semantiske elementer, en ingrediens-tabel og en nummereret liste af trin. Gem den som `opskrift.html`.\n\nSiden skal have et udseende fra en separat CSS-fil, `opskrift.css`, i samme mappe.",
      krav: [
        "`body` indeholder i denne rækkefølge: `header`, `main` og `footer`",
        "`header` indeholder en `h1` med teksten `Pandekager`",
        "`main` har to `section`-elementer. Det første har overskriften `Ingredienser` (`h2`), det andet `Sådan gør du` (`h2`)",
        "Ingredienserne står i en tabel med overskriftsrækken `Ingrediens` og `Mængde` (`th`) og mindst tre rækker data (`td`), fx Mel / 250 g",
        "Trinene står i en nummereret liste (`ol`) med mindst tre punkter",
        "`footer` har et afsnit med teksten `Velbekomme`",
        "`head` henviser til `opskrift.css` med et `link`-element",
        "I `opskrift.css`: tabellens celler (`th` og `td`) har en kant på 1 px og 8 px padding, og `h1` er mørkerød (`darkred`)"
      ],
      tip: [
        "Skriv først skelettet og de tre semantiske elementer tomme. Fyld dem bagefter ét ad gangen.",
        "En tabel bygges række for række: `<tr><th>Ingrediens</th><th>Mængde</th></tr>` og så en `tr` med to `td` for hver ingrediens.",
        "I CSS kan én regel vælge flere ting med komma: `th, td { border: 1px solid black; padding: 8px; }`. Linket i `head`: `<link rel=\"stylesheet\" href=\"opskrift.css\">`."
      ],
      sprog: "html", fri: true,
      loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="utf-8">
  <title>Pandekager</title>
  <link rel="stylesheet" href="opskrift.css">
</head>
<body>
  <header>
    <h1>Pandekager</h1>
  </header>
  <main>
    <section>
      <h2>Ingredienser</h2>
      <table>
        <tr>
          <th>Ingrediens</th>
          <th>Mængde</th>
        </tr>
        <tr>
          <td>Mel</td>
          <td>250 g</td>
        </tr>
        <tr>
          <td>Mælk</td>
          <td>5 dl</td>
        </tr>
        <tr>
          <td>Æg</td>
          <td>3 stk.</td>
        </tr>
      </table>
    </section>
    <section>
      <h2>Sådan gør du</h2>
      <ol>
        <li>Pisk mel og mælk sammen.</li>
        <li>Pisk æggene i.</li>
        <li>Steg pandekagerne på en varm pande.</li>
      </ol>
    </section>
  </main>
  <footer>
    <p>Velbekomme</p>
  </footer>
</body>
</html>

<!-- opskrift.css:
h1 {
  color: darkred;
}

th, td {
  border: 1px solid black;
  padding: 8px;
}
-->`,
      fordi: "CSS-filens indhold står i kommentaren nederst i løsningen. Kanterne er dobbelte, fordi hver celle har sin egen kant. Vil du have én streg, kan du give `table` egenskaben `border-collapse: collapse;`.",
      ekstra: ["Giv tabellen `border-collapse: collapse;`, så kanterne bliver til én streg.", "Giv `header` en baggrundsfarve og 10 px padding."] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Tilmeldingsformular med GET",
      md: "Lav en tilmeldingsformular til et løbehold. Formularen bruger `method=\"get\"` og har ingen `action`, så du kan se de sendte data i adresselinjen. Gem den som `loeb.html`.\n\nTest med navnet `Peter`, e-mailen `peter@mail.dk`, distancen 10 km og en kommentar. Se så på adresselinjen.",
      krav: [
        "Formularen har `method=\"get\"` og ingen `action`",
        "Et tekstfelt til navn: `name=\"navn\"`, og det skal udfyldes (`required`)",
        "Et e-mail-felt: `type=\"email\"`, `name=\"email\"`",
        "En valgliste `name=\"distance\"` med tre valg: `5 km` (værdi `5`), `10 km` (værdi `10`) og `Halvmaraton` (værdi `21`)",
        "Et tekstområde (`textarea`) med `name=\"kommentar\"`",
        "Hvert felt har en `label`, hvis `for` passer med feltets `id` — klikker du på teksten, kommer du ind i feltet",
        "En knap med teksten `Tilmeld`",
        "Når du sender med testværdierne, indeholder adressen `navn=Peter`, `email=peter%40mail.dk` (`@` pakkes ind som `%40`) og `distance=10`"
      ],
      tip: [
        "Byg ét felt ad gangen: label + felt. Gem, genindlæs, og send formularen for at se, at feltet kommer med i adressen.",
        "Valglisten: `<select id=\"distance\" name=\"distance\">` med `<option value=\"5\">5 km</option>` osv. Serveren får `value`, brugeren ser teksten.",
        "Kommer et felt ikke med i adressen, mangler det `name`. Virker klik på en label ikke, passer `for` og `id` ikke sammen — tjek stavningen i udviklerværktøjerne."
      ],
      sprog: "html", fri: true,
      output: "loeb.html?navn=Peter&email=peter%40mail.dk&distance=10&kommentar=Gl%C3%A6der+mig",
      loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="utf-8">
  <title>Løbehold</title>
</head>
<body>
  <h1>Tilmeld dig løbeholdet</h1>
  <form method="get">
    <p>
      <label for="navn">Navn</label>
      <input type="text" id="navn" name="navn" required>
    </p>
    <p>
      <label for="email">E-mail</label>
      <input type="email" id="email" name="email">
    </p>
    <p>
      <label for="distance">Distance</label>
      <select id="distance" name="distance">
        <option value="5">5 km</option>
        <option value="10">10 km</option>
        <option value="21">Halvmaraton</option>
      </select>
    </p>
    <p>
      <label for="kommentar">Kommentar</label>
      <textarea id="kommentar" name="kommentar" rows="3"></textarea>
    </p>
    <button type="submit">Tilmeld</button>
  </form>
</body>
</html>`,
      fordi: "Eksemplet på adressen er med kommentaren `Glæder mig`: mellemrum bliver til `+`, og `æ` bliver til `%C3%A6`. Der er ingen server endnu. I modul 16 skifter du `method` til `post` og tilføjer en `action`, der peger på en controller-metode med `[HttpPost]`.",
      ekstra: ["Skift til `method=\"post\"`, og send igen. Hvad sker der? (Browseren kan ikke sende POST til en fil — det kræver en server.)", "Giv formularen Bootstrap-udseende med `form-label`, `form-control` og `form-select`."] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Fejljagt med udviklerværktøjerne",
      md: "Siden nedenfor har **tre fejl** i CSS'en. Ingen af dem giver en fejlbesked — siden ser bare forkert ud. Find dem med udviklerværktøjerne, ikke ved at gætte.\n\nLav filen `fejljagt.html`, og kopiér startkoden ind i den. Åbn den i browseren. Sådan **skal** siden se ud, når den er rettet — se kravene.\n\nFremgangsmåde for hver fejl: åbn {{F12||⌥⌘I}}, klik på elementet i **Elements**, og læs fanen **Styles**. Står reglen der slet ikke? Så passer selektoren ikke. Står den der, men overstreget eller med et advarselstegn? Så er værdien ugyldig. Står den på det forkerte element? Så sidder egenskaben det forkerte sted.",
      krav: [
        "Overskriften `Dagens tilbud` er mørkegrøn",
        "De tre links i menuen står **på én række** ved siden af hinanden med 20 px imellem",
        "Prisen `Kaffe: 39 kr.` er rød **og** fed",
        "Du har ikke ændret noget i HTML'en i `body` — kun i CSS'en i `style`",
        "Du kan for hver fejl sige, hvad du så i udviklerværktøjerne, der afslørede den"
      ],
      tip: [
        "Klik på `h1` i **Elements**. I **Styles** står reglen `.overskift` slet ikke — den passer altså ikke på elementet. Sammenlign selektoren med klassen i HTML'en bogstav for bogstav.",
        "Klik på `nav` og så på et af linkene. Hvilket element har `display: flex`? Det skal sidde på **beholderen**, der har linkene som børn.",
        "Klik på prisen. I **Styles** er `color` streget over med et advarselstegn. Se på slutningen af linjen ovenover `font-weight`."
      ],
      sprog: "html", fri: true,
      start: R`<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="utf-8">
  <title>Fejljagt</title>
  <style>
    .overskift {
      color: darkgreen;
    }
    nav a {
      display: flex;
      gap: 20px;
    }
    .pris {
      color: red
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1 class="overskrift">Dagens tilbud</h1>
  <nav>
    <a href="index.html">Forside</a>
    <a href="tilbud.html">Tilbud</a>
    <a href="kontakt.html">Kontakt</a>
  </nav>
  <p class="pris">Kaffe: 39 kr.</p>
</body>
</html>`,
      loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="utf-8">
  <title>Fejljagt</title>
  <style>
    .overskrift {
      color: darkgreen;
    }
    nav {
      display: flex;
      gap: 20px;
    }
    .pris {
      color: red;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1 class="overskrift">Dagens tilbud</h1>
  <nav>
    <a href="index.html">Forside</a>
    <a href="tilbud.html">Tilbud</a>
    <a href="kontakt.html">Kontakt</a>
  </nav>
  <p class="pris">Kaffe: 39 kr.</p>
</body>
</html>`,
      fordi: "De tre fejl:\n\n1. `.overskift` mangler et `r`. Selektoren passer ikke på noget element, så reglen vises slet ikke i **Styles** for `h1`.\n2. `display: flex` sad på hvert `a` i stedet for på `nav`. Så blev hvert link sin egen blok, og de kom under hinanden. Rettelsen er selektoren `nav`.\n3. Semikolonet manglede efter `red`. Så blev `red font-weight: bold` én ugyldig værdi for `color`, og begge egenskaber forsvandt. **Styles** viser den streget over med et advarselstegn.",
      ekstra: ["Lav selv en ny fejl i filen (fx stav `color` forkert), og se, hvordan **Styles** viser den.", "Ret ting direkte i **Styles** i browseren (klik på en værdi og skriv en ny). Det er en hurtig måde at prøve en rettelse af, før du skriver den i filen."] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Forsiden til en lille webshop",
      md: "Byg forsiden til en webshop med Bootstrap. Den samler hele modulet: skelet, semantiske elementer, grid, kort, en formular med GET og responsivt design. Det er sådan, en side i dit MVC-projekt kommer til at se ud.\n\nGem den som `shop.html`. Du skal have internet, fordi Bootstrap hentes fra CDN'et (adressen står i lektion 6).",
      krav: [
        "Fuldt skelet med `meta charset`, `viewport`-meta-tagget og titlen `Webshop`",
        "Bootstraps CSS hentes med et `link` i `head`",
        "Øverst en mørk `navbar` (`bg-dark` og `data-bs-theme=\"dark\"`) med navnet `Webshop` som `navbar-brand` og to links: `Forside` (aktiv) og `Kurv`",
        "Indholdet ligger i et `main` med klassen `container` og margin foroven (`mt-4`)",
        "En søgeformular med `method=\"get\"`, et søgefelt (`form-control`, `name=\"q\"`) og en knap `Søg` (`btn btn-primary`)",
        "En række (`row`) med fire produkter som `card`. Hvert kort har en titel, en pris og en knap `Læg i kurv` (`btn btn-success`)",
        "På brede skærme (fra 992 px, `lg`) står de fire kort på én række. På mellemstore skærme (fra 768 px, `md`) to og to. På telefoner under hinanden",
        "En `footer` nederst med teksten `Webshop · Åben hele døgnet`, centreret (`text-center`) og med margin foroven",
        "Søger du på `kaffe`, ender adressen på `?q=kaffe`"
      ],
      tip: [
        "Start med skelettet og Bootstrap-linket fra lektion 6. Lav så én ting ad gangen i denne rækkefølge: navbar, `main`, søgeformular, ét kort, de andre tre kort, `footer`. Genindlæs efter hver.",
        "Et element kan have flere kolonne-klasser: `col-md-6 col-lg-3`. Under `md` fylder det hele bredden, fra `md` halvdelen (6 af 12), fra `lg` en fjerdedel (3 af 12).",
        "Søgeformularen kan ligge i en `row` for sig: `col-md-8` til feltet og `col-md-4` til knappen. Eller brug `d-flex gap-2` på formularen, så felt og knap står ved siden af hinanden."
      ],
      sprog: "html", fri: true,
      loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Webshop</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body>
  <header>
    <nav class="navbar navbar-expand bg-dark" data-bs-theme="dark">
      <div class="container">
        <a class="navbar-brand" href="shop.html">Webshop</a>
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link active" href="shop.html">Forside</a></li>
          <li class="nav-item"><a class="nav-link" href="kurv.html">Kurv</a></li>
        </ul>
      </div>
    </nav>
  </header>

  <main class="container mt-4">
    <form method="get" class="d-flex gap-2 mb-4">
      <input type="text" class="form-control" name="q" placeholder="Søg efter en vare">
      <button type="submit" class="btn btn-primary">Søg</button>
    </form>

    <div class="row">
      <div class="col-md-6 col-lg-3 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Kaffe</h5>
            <p class="card-text">45 kr.</p>
            <button class="btn btn-success">Læg i kurv</button>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Te</h5>
            <p class="card-text">30 kr.</p>
            <button class="btn btn-success">Læg i kurv</button>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Kakao</h5>
            <p class="card-text">35 kr.</p>
            <button class="btn btn-success">Læg i kurv</button>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Krus</h5>
            <p class="card-text">60 kr.</p>
            <button class="btn btn-success">Læg i kurv</button>
          </div>
        </div>
      </div>
    </div>
  </main>

  <footer class="text-center mt-4">
    <p>Webshop · Åben hele døgnet</p>
  </footer>
</body>
</html>`,
      fordi: "`col-md-6 col-lg-3` er nøglen til det responsive: Bootstrap bruger den største klasse, der passer til skærmens bredde. `d-flex gap-2` på formularen er flexbox fra lektion 5, skrevet med Bootstraps utility-klasser.",
      ekstra: ["Lav `kurv.html` med samme navbar og en Bootstrap-tabel (`class=\"table\"`) over varerne i kurven.", "Læg din egen CSS i `shop.css`, og link til den **efter** Bootstrap-linket. Giv fx kortenes titler en anden farve. Hvorfor skal dit link stå efter Bootstraps? (Tænk på kaskaden.)"] }
  ] }
  ]
});
})();
