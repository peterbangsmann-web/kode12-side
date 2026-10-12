// Modul 27 — HTML5 API'er og grafik. Forudsætter: modul 0–26 (især 13 HTML/CSS, 14 JavaScript og canvas, 15 fetch og async, 19 Web API).
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m27", nr: 27, del: "Del 7 · Ekstra emner", ikon: "🖼️",
  titel: "HTML5 API'er og grafik",
  dag: "Uge 6 · HTML5 API'er og grafik",
  intro: "Browseren har en hel værktøjskasse indbygget, som JavaScript kan bruge: **canvas** til at tegne og vise billeder, **Geolocation** til at finde ud af, hvor brugeren er, **Web Storage** til at huske ting, **drag and drop**, **lyd og video** og **fetch** til at hente data. De kaldes tilsammen HTML5-API'erne.\n\nDu bygger et slideshow, et tegneprogram, der kan gemme, en side, der finder nærmeste by, en indkøbskurv med træk-og-slip og en lille musikafspiller. Alle sider i modulet er afprøvet i Chromium (den browser, Chrome og Edge bygger på).",
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m27l1", titel: "Canvas videre: billeder og slideshow", min: 18,
    ord: [
      ["drawImage", "Tegner et billede på et canvas: `ctx.drawImage(billede, x, y, bredde, højde)`."],
      ["Image-objekt", "Et billede i JavaScript, lavet med `new Image()`. Det hentes, når man sætter `src`."],
      ["load-hændelsen", "Sker, når et billede (eller en side) er færdighentet. Først da kan billedet tegnes."],
      ["% (rest)", "Resten ved division. `(nr + 1) % 3` tæller 0, 1, 2, 0, 1, 2 … og starter forfra af sig selv."],
      ["setInterval / clearInterval", "Kør en funktion igen og igen med fast mellemrum — og stop det igen (modul 14)."],
      ["Slideshow", "En visning, der skifter mellem billeder, enten med knapper eller af sig selv."]
    ],
    trin: [
      { t: "laes", h: "Et billede på lærredet",
        md: "I modul 14 tegnede du firkanter og cirkler. Et canvas kan også vise **billeder**. Man laver et `Image`-objekt, giver det en adresse i `src`, og tegner det med `drawImage`.\n\nMen et billede hentes ikke på et øjeblik. Tegner du det, før det er hentet, sker der ingenting. Derfor tegner man i **`load`-hændelsen**, som browseren sender, når billedet er klar.",
        sprog: "html",
        kode: R`<canvas id="lerred" width="400" height="300" style="border: 1px solid gray"></canvas>

<script>
    const ctx = document.getElementById("lerred").getContext("2d");
    const billede = new Image();

    billede.addEventListener("load", () => {
        ctx.drawImage(billede, 0, 0, 400, 300);
    });

    billede.src = "billede1.jpg";
</script>`,
        noter: [
          ["new Image()", "Et tomt billede-objekt. Det står ikke på siden — det er kun til at tegne med."],
          ["addEventListener(\"load\", …)", "\"Når billedet er hentet, så tegn det.\""],
          ["drawImage(billede, 0, 0, 400, 300)", "Tegn billedet med øverste venstre hjørne i (0, 0), skaleret til 400 × 300."],
          ["billede.src = \"billede1.jpg\"", "Start hentningen. Filen skal ligge i samme mappe som HTML-filen."]
        ],
        md2: "Hændelsen sættes op **før** `src`, så den ikke kan nå at ske, før nogen lytter." },
      { t: "valg", q: "Hvorfor kalder man `drawImage` inde i billedets `load`-hændelse i stedet for lige efter `billede.src = …`?",
        svar: ["Fordi billedet hentes i baggrunden og først kan tegnes, når det er færdighentet", "Fordi `drawImage` kun virker inde i en funktion", "Fordi `load` gør billedet hurtigere", "Fordi canvas ellers bliver slettet"],
        ret: 0, fordi: "At sætte `src` **starter** kun hentningen. Koden fortsætter med det samme, og billedet er endnu ikke klar. `load` er browserens besked om, at det nu kan tegnes." },
      { t: "laes", h: "Et slideshow: et array og et nummer",
        md: "Et slideshow er bare et **array af billeder** og et **nummer** for det, der vises. \"Næste\" lægger 1 til nummeret, \"Forrige\" trækker 1 fra.\n\nNår man er ved det sidste billede, skal \"Næste\" starte forfra. Det klarer `%` (resten ved division): med 3 billeder giver `(nr + 1) % 3` tallene 1, 2, 0, 1, 2, 0 … For \"Forrige\" lægger man antallet til, før man tager resten, så tallet aldrig bliver negativt.",
        sprog: "js",
        kode: R`const filer = ["billede1.jpg", "billede2.jpg", "billede3.jpg"];
const billeder = [];
let nr = 0;

for (const fil of filer) {
    const b = new Image();
    b.src = fil;
    billeder.push(b);
}

function vis() {
    ctx.drawImage(billeder[nr], 0, 0, 400, 300);
    tekst.textContent = "Billede " + (nr + 1) + " af " + billeder.length;
}

function naeste() {
    nr = (nr + 1) % billeder.length;
    vis();
}

function forrige() {
    nr = (nr - 1 + billeder.length) % billeder.length;
    vis();
}`,
        noter: [
          ["for (const fil of filer)", "Lav et `Image` for hver fil med det samme, så alle billederne hentes på forhånd."],
          ["billeder[nr]", "Det billede, der skal vises nu."],
          ["(nr + 1) % billeder.length", "Fra 2 til 0 i stedet for til 3, som ikke findes."],
          ["(nr - 1 + billeder.length) % billeder.length", "Fra 0 til 2. Uden `+ billeder.length` ville det blive −1."]
        ] },
      { t: "forudsig", sprog: "js", q: "Hvad skriver programmet?",
        kode: R`const billeder = ["hav.jpg", "skov.jpg", "by.jpg"];
let nr = 0;
nr = (nr + 1) % billeder.length;
console.log(billeder[nr]);
nr = (nr + 1) % billeder.length;
nr = (nr + 1) % billeder.length;
console.log(billeder[nr]);
nr = (nr - 1 + billeder.length) % billeder.length;
console.log(billeder[nr]);`,
        output: "skov.jpg\nhav.jpg\nby.jpg",
        fordi: "0 → 1 (skov). Så 2, og derefter (2 + 1) % 3 = 0 (hav) — forfra. \"Forrige\" fra 0: (0 − 1 + 3) % 3 = 2 (by)." },
      { t: "spor", sprog: "js", slut: false, h: "Spor: frem og tilbage",
        q: "Et slideshow med 3 billeder. Brugeren klikker Forrige, Forrige, Næste, Næste. Skriv `nr` efter hver linje.",
        kode: R`const antal = 3;
let nr = 0;
nr = (nr - 1 + antal) % antal;
nr = (nr - 1 + antal) % antal;
nr = (nr + 1) % antal;
nr = (nr + 1) % antal;`,
        kolonner: ["nr"],
        raekker: [[2, "=0"], [3, "2"], [4, "1"], [5, "2"], [6, "0"]],
        fordi: "(0 − 1 + 3) % 3 = 2. (2 − 1 + 3) % 3 = 4 % 3 = 1. Så frem: 2, og (2 + 1) % 3 = 0. Nummeret holder sig altid mellem 0 og 2." },
      { t: "fejl", sprog: "js", logisk: true,
        q: "Når man trykker **Forrige** på det første billede, kommer der en rød fejl i konsollen: `TypeError: Failed to execute 'drawImage' … The provided value is not of type …`. Hvilken linje er skyld i det?",
        kode: R`function vis() {
    ctx.drawImage(billeder[nr], 0, 0, 400, 300);
}

function forrige() {
    nr = (nr - 1) % billeder.length;
    vis();
}`,
        linje: 6,
        fordi: "I JavaScript er `-1 % 3` lig med **−1**, ikke 2. `billeder[-1]` findes ikke og giver `undefined`, og det kan `drawImage` ikke tegne. Sæt et breakpoint i linje 2 i fanen **Sources**, og se `nr` under **Scope**: −1. Rettelsen er at lægge antallet til først.",
        rettet: R`function vis() {
    ctx.drawImage(billeder[nr], 0, 0, 400, 300);
}

function forrige() {
    nr = (nr - 1 + billeder.length) % billeder.length;
    vis();
}` },
      { t: "laes", h: "Af sig selv: setInterval, og vent på alle billederne",
        md: "Et slideshow kan skifte af sig selv med `setInterval` (modul 14). Én knap starter og stopper: variablen `timer` er `null`, når der ikke kører noget.\n\nOg det første billede skal først vises, når billederne er hentet. Her tælles `load`-hændelserne: når alle er kommet, kaldes `vis()`.",
        sprog: "js",
        kode: R`let indlaest = 0;
for (const fil of filer) {
    const b = new Image();
    b.addEventListener("load", () => {
        indlaest++;
        if (indlaest === filer.length) {
            vis();
        }
    });
    b.src = fil;
    billeder.push(b);
}

let timer = null;
autoKnap.addEventListener("click", () => {
    if (timer === null) {
        timer = setInterval(naeste, 3000);
        autoKnap.textContent = "Stop";
    } else {
        clearInterval(timer);
        timer = null;
        autoKnap.textContent = "Start";
    }
});`,
        noter: [
          ["indlaest++", "Ét billede mere er klar."],
          ["indlaest === filer.length", "Alle er klar — nu kan det første vises."],
          ["setInterval(naeste, 3000)", "Kald `naeste` hvert 3. sekund. Giver et nummer, der bruges til at stoppe den igen."],
          ["clearInterval(timer)", "Stop gentagelsen."],
          ["timer = null", "Husk, at der ikke kører noget nu."]
        ] },
      { t: "valg", q: "Hvad sker der, hvis man glemmer `clearInterval(timer)` og bare sætter `timer = null`, når der trykkes Stop?",
        svar: ["Billederne bliver ved med at skifte, og trykker man Start igen, skifter de dobbelt så hurtigt", "Slideshowet stopper som det skal", "Siden går ned med en fejl", "Billederne forsvinder"],
        ret: 0, fordi: "`setInterval` kører, indtil nogen stopper den med `clearInterval`. At glemme nummeret stopper ingenting. Et nyt Start laver en interval mere, så der nu er to, der hver kalder `naeste`." },
      { t: "udfyld", sprog: "js", q: "Tegn det aktuelle billede, og gå videre til næste — forfra efter det sidste.",
        kode: R`function naeste() {
    nr = (nr + 1) [[%]] billeder.length;
    ctx.[[drawImage]](billeder[nr], 0, 0, 400, 300);
}`,
        fordi: "`%` giver resten, så nummeret starter forfra. `drawImage` tegner billedet." },
      { t: "skriv", sprog: "js",
        q: "Skriv funktionen `forrige`, som trækker 1 fra `nr`, men går fra det første billede til det sidste, og derefter kalder `vis()`. Brug `billeder.length`.",
        foer: R`let nr = 0;
const billeder = [b1, b2, b3];`,
        tjek: [
          [/function forrige\(\)\{/, "Lav funktionen: `function forrige() { … }`"],
          [/nr=\(nr-1\+billeder\.length\)%billeder\.length;/, "Regn det nye nummer ud: `nr = (nr - 1 + billeder.length) % billeder.length;`"],
          [/vis\(\);/, "Kald `vis()` til sidst"]
        ],
        forkert: ["function forrige() {\n    nr = (nr - 1) % billeder.length;\n    vis();\n}"],
        loesning: R`function forrige() {
    nr = (nr - 1 + billeder.length) % billeder.length;
    vis();
}` },
      { t: "ide", h: "Byg slideshowet",
        md: "Lav en mappe med tre billeder, `billede1.jpg`, `billede2.jpg` og `billede3.jpg` (fx fra din telefon), og en ny fil `slideshow.html` i samme mappe. Skriv koden **selv**, og åbn filen i browseren.",
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Slideshow</title>
</head>
<body>
    <canvas id="lerred" width="400" height="300" style="border: 1px solid gray"></canvas>
    <p id="tekst">Indlæser …</p>
    <button id="forrige">Forrige</button>
    <button id="naeste">Næste</button>
    <button id="auto">Start</button>

    <script>
        const ctx = document.getElementById("lerred").getContext("2d");
        const tekst = document.getElementById("tekst");
        const autoKnap = document.getElementById("auto");
        const filer = ["billede1.jpg", "billede2.jpg", "billede3.jpg"];
        const billeder = [];
        let nr = 0;
        let indlaest = 0;
        let timer = null;

        for (const fil of filer) {
            const b = new Image();
            b.addEventListener("load", () => {
                indlaest++;
                if (indlaest === filer.length) {
                    vis();
                }
            });
            b.src = fil;
            billeder.push(b);
        }

        function vis() {
            ctx.drawImage(billeder[nr], 0, 0, 400, 300);
            tekst.textContent = "Billede " + (nr + 1) + " af " + billeder.length;
        }

        function naeste() {
            nr = (nr + 1) % billeder.length;
            vis();
        }

        function forrige() {
            nr = (nr - 1 + billeder.length) % billeder.length;
            vis();
        }

        document.getElementById("naeste").addEventListener("click", naeste);
        document.getElementById("forrige").addEventListener("click", forrige);

        autoKnap.addEventListener("click", () => {
            if (timer === null) {
                timer = setInterval(naeste, 3000);
                autoKnap.textContent = "Stop";
            } else {
                clearInterval(timer);
                timer = null;
                autoKnap.textContent = "Start";
            }
        });
    </script>
</body>
</html>`,
        output: "Siden åbnes: billede 1 og \"Billede 1 af 3\"\nNæste: billede 2\nForrige to gange: billede 3\nStart: knappen hedder Stop, og billedet skifter hvert 3. sekund\nStop: skiftene holder op",
        md2: "Billederne bliver strakt til 400 × 300, selv om de har en anden form. Hedder dine filer noget andet (fx `.png` eller `.jpeg`), så ret navnene i `filer`. Ser du ikke noget billede, så åbn konsollen ({{**F12**||**⌥⌘I**}}): en rød `404`-linje betyder, at et filnavn er stavet forkert." },
      { t: "forklar", q: "Forklar med dine egne ord, hvordan et slideshow på et canvas virker.",
        svar: "Billederne laves som `Image`-objekter i et **array** og hentes på forhånd. Først når **`load`**-hændelsen er kommet for dem alle, tegnes det første med **`drawImage`**. En variabel, `nr`, holder styr på, hvilket billede der vises. \"Næste\" regner `(nr + 1) % antal`, så det starter forfra efter det sidste, og \"Forrige\" lægger antallet til, før der tages **rest**, så nummeret aldrig bliver negativt. Automatisk skift laves med **`setInterval`** og stoppes med **`clearInterval`**.",
        noegle: ["array", "load", "drawImage", "%", "setInterval", "clearInterval"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m27l2", titel: "Tegn med musen, og gem i Web Storage", min: 18,
    ord: [
      ["mousedown / mousemove / mouseup", "Hændelserne, når en museknap trykkes ned, musen flyttes, og knappen slippes."],
      ["offsetX / offsetY", "Musens position målt fra øverste venstre hjørne af det element, hændelsen skete på — her lærredet."],
      ["lineCap", "Hvordan enderne på en streg ser ud. `\"round\"` giver runde ender, så små stykker hænger pænt sammen."],
      ["localStorage", "Browserens lager for denne side. Overlever, at fanen lukkes og computeren slukkes."],
      ["sessionStorage", "Som localStorage, men slettes, når fanen lukkes."],
      ["toDataURL", "Laver indholdet af et canvas om til en lang tekst (`data:image/png;base64,…`), der kan gemmes og vises igen."]
    ],
    trin: [
      { t: "laes", h: "Tre musehændelser og et flag",
        md: "Et tegneprogram tegner, **mens** museknappen holdes nede. Det kræver tre hændelser på lærredet og to slags variabler:\n\n- Et **flag**, `tegner`, der er `true`, mens knappen er nede.\n- Det **sidste punkt**, `sidstX` og `sidstY`. Hver gang musen flytter sig, tegnes en lille streg fra det sidste punkt til det nye.",
        sprog: "js",
        kode: R`let tegner = false;
let sidstX = 0;
let sidstY = 0;

canvas.addEventListener("mousedown", (e) => {
    tegner = true;
    sidstX = e.offsetX;
    sidstY = e.offsetY;
});

canvas.addEventListener("mousemove", (e) => {
    if (!tegner) {
        return;
    }
    ctx.beginPath();
    ctx.moveTo(sidstX, sidstY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.stroke();
    sidstX = e.offsetX;
    sidstY = e.offsetY;
});

canvas.addEventListener("mouseup", () => tegner = false);
canvas.addEventListener("mouseleave", () => tegner = false);`,
        noter: [
          ["e.offsetX, e.offsetY", "Musens position **på lærredet**: (0, 0) er dets øverste venstre hjørne."],
          ["if (!tegner) { return; }", "Musen flyttes uden knappen nede: gør ingenting."],
          ["moveTo(sidstX, sidstY) … lineTo(…)", "En lille streg fra sidste punkt til det nye."],
          ["sidstX = e.offsetX;", "Det nye punkt bliver startpunkt for næste lille streg."],
          ["mouseleave", "Musen forlader lærredet. Stop, ellers fortsætter stregen, når den kommer tilbage uden knappen nede."]
        ] },
      { t: "spor", sprog: "js", slut: false, h: "Spor: hændelserne efter hinanden",
        q: "Her er det, der sker, skrevet som almindelige linjer: knappen ned ved x = 10, musen til 25, knappen op, musen til 40. Skriv `tegner` og `sidstX` efter hver linje.",
        kode: R`let tegner = false;
let sidstX = 0;
tegner = true;
sidstX = 10;
if (tegner) sidstX = 25;
tegner = false;
if (tegner) sidstX = 40;`,
        kolonner: ["tegner", "sidstX"],
        raekker: [[1, "=false", "=–"], [2, "=false", "=0"], [3, "true", "0"], [4, "true", "10"], [5, "true", "25"], [6, "false", "25"], [7, "false", "25"]],
        fordi: "Linje 3–4 er `mousedown`, linje 5 er `mousemove` med knappen nede (der tegnes, og punktet flyttes), linje 6 er `mouseup`. I linje 7 flyttes musen igen, men `tegner` er `false`, så der sker ingenting — `sidstX` bliver på 25." },
      { t: "valg", q: "Hvad sker der, hvis man fjerner `if (!tegner) { return; }` fra `mousemove`?",
        svar: ["Der tegnes, så snart musen bevæger sig over lærredet — også uden at knappen er trykket ned", "Der tegnes aldrig", "Stregen bliver tykkere", "Programmet går ned"],
        ret: 0, fordi: "Flaget er det eneste, der skiller \"flytter musen\" fra \"tegner\". Uden tjekket bliver hver bevægelse til en streg." },
      { t: "udfyld", sprog: "js", q: "Start en streg, når museknappen trykkes ned på lærredet.",
        kode: R`canvas.addEventListener("[[mousedown]]", (e) => {
    tegner = [[true]];
    sidstX = e.[[offsetX]];
    sidstY = e.offsetY;
});`,
        fordi: "`mousedown` er knappen ned. Flaget sættes til `true`, og musens position på lærredet gemmes som første punkt." },
      { t: "laes", h: "Web Storage: huske ting i browseren",
        md: "Du mødte **Web Storage** i modul 15 og 24. Kort repetition, fordi du skal bruge det nu:\n\n- `localStorage` er et lager i browseren **for netop din side**. Det overlever, at fanen lukkes.\n- `sessionStorage` virker ens, men tømmes, når fanen lukkes.\n- Der kan **kun gemmes tekst**. Tal bliver til tekst. Arrays og objekter laves om med `JSON.stringify` og tilbage med `JSON.parse`.\n- Der er plads til nogle få megabytes, og alt kan læses af JavaScript på siden — **aldrig** adgangskoder eller andet hemmeligt.",
        sprog: "js",
        kode: R`localStorage.setItem("navn", "Peter");
const navn = localStorage.getItem("navn");

const farver = ["rød", "blå"];
localStorage.setItem("farver", JSON.stringify(farver));
const hentet = JSON.parse(localStorage.getItem("farver"));

localStorage.removeItem("navn");
console.log(localStorage.getItem("navn"));`,
        noter: [
          ["setItem(nøgle, værdi)", "Gem en tekst under en nøgle."],
          ["getItem(nøgle)", "Hent teksten. Findes nøglen ikke, får man `null`."],
          ["JSON.stringify / JSON.parse", "Array eller objekt → tekst, og tilbage igen."],
          ["removeItem(nøgle)", "Slet. Den sidste linje skriver derfor `null`."]
        ],
        md2: "Du kan se, hvad der er gemt: udviklerværktøjet → fanen **Application** → **Local Storage**." },
      { t: "forudsig", sprog: "js", q: "Hvad skriver programmet?",
        kode: R`const tegninger = ["kat", "hus"];
const tekst = JSON.stringify(tegninger);
console.log(typeof tekst);
console.log(tekst);
const tilbage = JSON.parse(tekst);
console.log(tilbage.length);`,
        output: "string\n[\"kat\",\"hus\"]\n2",
        fordi: "`JSON.stringify` laver arrayet om til **én tekst** — det er den, man kan gemme i localStorage. `JSON.parse` laver teksten tilbage til et array med to elementer." },
      { t: "fejl", sprog: "js", logisk: true,
        q: "Siden skal tælle, hvor mange gange man har besøgt den. Står der 5 i lageret, skal den skrive 6 — men den skriver `51`. Hvilken linje er forkert?",
        kode: R`localStorage.setItem("besoeg", 5);
const besoeg = localStorage.getItem("besoeg");
const nye = besoeg + 1;
localStorage.setItem("besoeg", nye);
console.log(nye);`,
        linje: 3,
        fordi: "localStorage gemmer kun tekst. `getItem` giver teksten `\"5\"`, og `\"5\" + 1` sætter tekst sammen: `\"51\"`. Lav den om til et tal først: `Number(besoeg) + 1`. Et breakpoint i linje 3 viser under **Scope**, at `besoeg` er `\"5\"` med anførselstegn.",
        rettet: R`localStorage.setItem("besoeg", 5);
const besoeg = localStorage.getItem("besoeg");
const nye = Number(besoeg) + 1;
localStorage.setItem("besoeg", nye);
console.log(nye);` },
      { t: "laes", h: "Gem tegningen",
        md: "`canvas.toDataURL()` laver hele tegningen om til **én lang tekst**, der begynder med `data:image/png;base64,`. Den kan gemmes i localStorage. For at vise den igen sætter man teksten som `src` på et `Image` og tegner det, når det er hentet — præcis som et billede fra en fil.",
        sprog: "js",
        kode: R`document.getElementById("gem").addEventListener("click", () => {
    localStorage.setItem("tegning", canvas.toDataURL());
    status.textContent = "Gemt";
});

const gemt = localStorage.getItem("tegning");
if (gemt !== null) {
    const billede = new Image();
    billede.addEventListener("load", () => ctx.drawImage(billede, 0, 0));
    billede.src = gemt;
}`,
        noter: [
          ["canvas.toDataURL()", "Tegningen som PNG-billede skrevet som tekst."],
          ["gemt !== null", "Er der gemt en tegning før? Første gang er der ikke."],
          ["billede.src = gemt", "En data-URL virker som `src`, ligesom et filnavn."]
        ],
        md2: "**Pas på:** har du tegnet et billede fra en **fil** på lærredet og åbnet siden direkte fra disken (`file://`), nægter browseren `toDataURL` med en `SecurityError` (\"Tainted canvases may not be exported\"). Afprøvet i Chromium. Kommer siden fra en `localhost`-adresse, eller har brugeren selv tegnet det hele, er der ikke noget problem." },
      { t: "valg", q: "Hvad giver `canvas.toDataURL()`?",
        svar: ["En tekst, der indeholder hele tegningen som et PNG-billede", "Adressen på en fil på serveren", "Et array med alle de streger, der er tegnet", "Et nyt canvas-element"],
        ret: 0, fordi: "Resultatet er en *data-URL*: billedets data skrevet som tekst. Fordi det er tekst, kan det gemmes i localStorage, sendes til en server eller bruges som `src`." },
      { t: "skriv", sprog: "js",
        q: "Når der klikkes på knappen `gemKnap`, skal tegningen gemmes i localStorage under nøglen `\"tegning\"` med `canvas.toDataURL()`.",
        foer: R`const canvas = document.getElementById("lerred");
const gemKnap = document.getElementById("gem");`,
        tjek: [
          [/gemKnap\.addEventListener\(("click"|'click'),/, "Lyt efter klik: `gemKnap.addEventListener(\"click\", () => { … });`"],
          [/localStorage\.setItem\(("tegning"|'tegning'),canvas\.toDataURL\(\)\);/, "Gem: `localStorage.setItem(\"tegning\", canvas.toDataURL());`"],
          [/sessionStorage/, "Brug `localStorage`, så tegningen også er der efter genstart", "ikke"]
        ],
        forkert: ["gemKnap.addEventListener(\"click\", () => {\n    sessionStorage.setItem(\"tegning\", canvas.toDataURL());\n});", "gemKnap.addEventListener(\"click\", () => {\n    localStorage.setItem(\"tegning\", canvas);\n});"],
        loesning: R`gemKnap.addEventListener("click", () => {
    localStorage.setItem("tegning", canvas.toDataURL());
});` },
      { t: "ide", h: "Et lille tegneprogram",
        md: "Lav filen `tegn.html`, og skriv koden **selv**. Tegn med musen, og prøv Ryd. I værkstedet udvider du den med farve, tykkelse og Gem.",
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Tegn</title>
</head>
<body>
    <canvas id="lerred" width="500" height="350" style="border: 1px solid gray"></canvas>
    <p><button id="ryd">Ryd</button></p>

    <script>
        const canvas = document.getElementById("lerred");
        const ctx = canvas.getContext("2d");
        let tegner = false;
        let sidstX = 0;
        let sidstY = 0;

        canvas.addEventListener("mousedown", (e) => {
            tegner = true;
            sidstX = e.offsetX;
            sidstY = e.offsetY;
        });

        canvas.addEventListener("mousemove", (e) => {
            if (!tegner) {
                return;
            }
            ctx.beginPath();
            ctx.moveTo(sidstX, sidstY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.lineWidth = 4;
            ctx.lineCap = "round";
            ctx.stroke();
            sidstX = e.offsetX;
            sidstY = e.offsetY;
        });

        canvas.addEventListener("mouseup", () => tegner = false);
        canvas.addEventListener("mouseleave", () => tegner = false);

        document.getElementById("ryd").addEventListener("click", () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    </script>
</body>
</html>`,
        output: "Træk med knappen nede: en sort streg følger musen\nFlyt musen uden knappen nede: ingen streg\nRyd: lærredet er tomt igen",
        md2: "Sæt et breakpoint inde i `mousemove` i fanen **Sources**, og tegn: koden stopper ved hver lille bevægelse, og **Scope** viser `sidstX`, `sidstY` og `e.offsetX`. Fjern breakpointet igen, før du tegner videre." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på `localStorage`, `sessionStorage` og en database på serveren — og hvad må man ikke gemme i browseren?",
        svar: "**localStorage** gemmer tekst i **den enkelte brugers browser** for netop min side, og det bliver der, også efter genstart. **sessionStorage** er det samme, men tømmes, når fanen lukkes. Begge gemmer kun **tekst**, så arrays og objekter skal igennem `JSON.stringify` og `JSON.parse`. En **database på serveren** er fælles for alle brugere og kan ikke ændres af brugeren. I browseren må man **ikke** gemme adgangskoder, API-nøgler eller andet hemmeligt, fordi al JavaScript på siden kan læse det — og brugeren kan selv ændre det i udviklerværktøjet.",
        noegle: ["localStorage", "sessionStorage", "tekst", "JSON", "database", "hemmeligt"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m27l3", titel: "Hvor er brugeren? Geolocation og drag and drop", min: 20,
    ord: [
      ["Geolocation", "Browserens API til at finde brugerens position: `navigator.geolocation`."],
      ["getCurrentPosition", "Beder om positionen én gang. Tager en funktion til, når det lykkes, og en til, når det fejler."],
      ["coords", "Positionens tal: `latitude` (bredde), `longitude` (længde) og `accuracy` (usikkerhed i meter)."],
      ["Sikker kontekst", "En side fra `https://` eller `http://localhost`. Mange API'er, bl.a. Geolocation, virker kun der."],
      ["draggable", "HTML-attribut, der gør et element trækbart: `draggable=\"true\"`."],
      ["dragstart / dragover / drop", "Hændelserne, når man begynder at trække, trækker hen over et mål, og slipper."],
      ["dataTransfer", "Det \"håndtag\", der følger med under trækket. `setData` lægger noget på, `getData` henter det i `drop`."]
    ],
    trin: [
      { t: "laes", h: "Hvor er jeg?",
        md: "`navigator.geolocation.getCurrentPosition` beder browseren om brugerens position. Browseren spørger **altid brugeren om lov** først. Svaret kommer ikke med det samme, så man giver **to funktioner** med: én, der kaldes, når det lykkes, og én, når det fejler (fx fordi brugeren sagde nej).\n\nGeolocation virker kun i en **sikker kontekst**: en side fra `https://` eller fra `http://localhost`. Åbner du filen direkte fra disken, kan browseren afvise det. Derfor laver du om lidt et lille projekt, der viser dine sider fra `localhost`.",
        sprog: "js",
        kode: R`function lykkedes(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    svar.textContent = "Bredde " + lat.toFixed(4) + ", længde " + lon.toFixed(4) +
                       " (± " + Math.round(pos.coords.accuracy) + " m)";
}

function fejlede(fejl) {
    svar.textContent = "Fejl " + fejl.code + ": " + fejl.message;
}

navigator.geolocation.getCurrentPosition(lykkedes, fejlede, { timeout: 10000 });`,
        noter: [
          ["pos.coords.latitude / longitude", "Bredde- og længdegrad. København er ca. 55,68 og 12,57."],
          ["pos.coords.accuracy", "Hvor sikker positionen er, i meter. En computer uden GPS kan være flere hundrede meter ved siden af."],
          ["toFixed(4)", "Fire decimaler — ca. 10 meters nøjagtighed. Mere giver ingen mening."],
          ["fejl.code", "1 = brugeren sagde nej. 2 = positionen kunne ikke findes. 3 = det tog for lang tid."],
          ["{ timeout: 10000 }", "Giv op efter 10 sekunder."]
        ],
        md2: "Afprøvet i Chromium: siger man nej, skriver siden **Fejl 1: User denied Geolocation**." },
      { t: "valg", q: "Hvorfor spørger browseren brugeren om lov, før en side får positionen?",
        svar: ["Fordi positionen er en personlig oplysning, som brugeren selv skal bestemme, om siden må få", "Fordi GPS'en skal tændes manuelt", "Fordi det er langsomt at finde positionen", "Fordi siden ellers skal betale"],
        ret: 0, fordi: "Hvor du er, er **persondata** (modul 26: GDPR). Derfor kræver browseren både en sikker kontekst og et ja fra brugeren. Din kode skal altid kunne klare et nej." },
      { t: "ide", h: "Et projekt, der viser dine sider fra localhost",
        md: "Til Geolocation og `fetch` (lektion 4) skal siderne komme fra en rigtig adresse. Lav et **tomt ASP.NET Core-projekt**, `HtmlSider`, der ikke gør andet end at vise filerne i `wwwroot`.",
        win: ["Opret et nyt projekt med skabelonen **ASP.NET Core Empty**, navn `HtmlSider`, .NET 10.", "Højreklik på projektet → **Add → New Folder**, og kald mappen `wwwroot`.", "Ret `Program.cs`, så den ser ud som koden herunder.", "Læg dine `.html`-filer (og billeder, lyd, JSON) i `wwwroot`. Kør projektet, og skriv fx `/position.html` efter adressen i browseren."],
        mac: ["Opret et nyt projekt i Rider med typen **ASP.NET Core Web Application** og skabelonen **Empty**, navn `HtmlSider`, .NET 10.", "Højreklik på projektet → **Add → Directory**, og kald mappen `wwwroot`.", "Ret `Program.cs`, så den ser ud som koden herunder.", "Læg dine `.html`-filer (og billeder, lyd, JSON) i `wwwroot`. Kør projektet, og skriv fx `/position.html` efter adressen i browseren."],
        frag: true,
        kode: R`var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();`,
        md2: "`UseStaticFiles` sender filerne i `wwwroot`, som de er. `UseDefaultFiles` gør, at en fil, der hedder `index.html`, vises, når man bare skriver adressen. Afprøvet: `.html`, `.json`, billeder og lyd kom alle frem med den rigtige type." },
      { t: "laes", h: "Hvor langt er der?",
        md: "Med brugerens position kan man fx finde **nærmeste butik**. Afstanden mellem to punkter på jorden regnes med **haversine-formlen**. Du skal ikke kunne udlede den — bare bruge funktionen. Det eneste, der er værd at lægge mærke til: `Math.sin` og `Math.cos` regner i **radianer**, så grader skal ganges med π / 180 først.",
        sprog: "js",
        kode: R`function afstandKm(lat1, lon1, lat2, lon2) {
    const jordRadius = 6371;
    const tilRad = Math.PI / 180;
    const dLat = (lat2 - lat1) * tilRad;
    const dLon = (lon2 - lon1) * tilRad;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * tilRad) * Math.cos(lat2 * tilRad) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * jordRadius * Math.asin(Math.sqrt(a));
}`,
        noter: [
          ["jordRadius = 6371", "Jordens radius i km. Resultatet kommer derfor i km."],
          ["tilRad = Math.PI / 180", "Gang grader med dette tal for at få radianer."],
          ["dLat, dLon", "Forskellen i bredde og længde, i radianer."],
          ["return 2 * jordRadius * …", "Afstanden langs jordens overflade."]
        ] },
      { t: "forudsig", sprog: "js", q: "Funktionen `afstandKm` fra trinnet før bruges fra København (55.6761, 12.5683) til Aarhus og Odense. Hvad skriver programmet?",
        kode: R`function afstandKm(lat1, lon1, lat2, lon2) {
    const jordRadius = 6371;
    const tilRad = Math.PI / 180;
    const dLat = (lat2 - lat1) * tilRad;
    const dLon = (lon2 - lon1) * tilRad;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * tilRad) * Math.cos(lat2 * tilRad) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * jordRadius * Math.asin(Math.sqrt(a));
}
console.log(Math.round(afstandKm(55.6761, 12.5683, 56.1629, 10.2039)) + " km");
console.log(Math.round(afstandKm(55.6761, 12.5683, 55.4038, 10.4024)) + " km");`,
        output: "157 km\n140 km",
        fordi: "Det er afstanden i luftlinje: ca. 157 km til Aarhus og 140 km til Odense. Ad vejen er der længere. Du kan ikke regne det i hovedet — her skal du gætte på størrelsen og så se facit." },
      { t: "fejl", sprog: "js", logisk: true,
        q: "Afstanden fra København til Aarhus skal være ca. 157 km, men funktionen giver 10879 km. Hvilken linje er den første forkerte?",
        kode: R`function afstandKm(lat1, lon1, lat2, lon2) {
    const jordRadius = 6371;
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * jordRadius * Math.asin(Math.sqrt(a));
}`,
        linje: 3,
        fordi: "Graderne bliver aldrig lavet om til **radianer**. `Math.sin` og `Math.cos` tror, at 0,49 grader er 0,49 radianer (ca. 28 grader), og så bliver alt forkert. Linje 3, 4 og 6 skal alle gange med `Math.PI / 180`. Sæt et breakpoint i linje 5, og se `dLat` under **Scope**: 0,49 — det burde være ca. 0,0085.",
        rettet: R`function afstandKm(lat1, lon1, lat2, lon2) {
    const jordRadius = 6371;
    const tilRad = Math.PI / 180;
    const dLat = (lat2 - lat1) * tilRad;
    const dLon = (lon2 - lon1) * tilRad;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * tilRad) * Math.cos(lat2 * tilRad) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * jordRadius * Math.asin(Math.sqrt(a));
}` },
      { t: "spor", sprog: "js", slut: false, h: "Spor: find den nærmeste",
        q: "Afstandene fra brugeren til tre butikker er regnet ud. Løkken finder den nærmeste. Skriv `bedst` og `navn` efter de linjer, der ændrer dem. (`i` er 0, 1 og 2.)",
        kode: R`const navne = ["Aarhus", "Odense", "Vejle"];
const km = [12.4, 3.1, 7.8];
let bedst = Infinity;
let navn = "";
for (let i = 0; i < km.length; i++) {
    if (km[i] < bedst) {
        bedst = km[i];
        navn = navne[i];
    }
}`,
        kolonner: ["bedst", "navn"],
        raekker: [[3, "=Infinity", "=–"], [4, "=Infinity", "=\"\""], [7, "12.4", "\"\""], [8, "12.4", "Aarhus"], [7, "3.1", "Aarhus"], [8, "3.1", "Odense"]],
        fordi: "`Infinity` er større end alle tal, så den første butik bliver altid \"bedst indtil videre\". Odense (3,1) er mindre og overtager. Vejle (7,8) er **ikke** mindre end 3,1, så linje 7–8 køres ikke for den. Det er samme max/min-algoritme som i modul 3." },
      { t: "laes", h: "Drag and drop: træk og slip",
        md: "HTML5 har indbygget **træk og slip**. Det kræver tre ting:\n\n1. Det, der skal trækkes, får `draggable=\"true\"`, og i `dragstart` lægger man dets `id` på `e.dataTransfer`.\n2. Målet skal sige ja til at modtage: i `dragover` kaldes `e.preventDefault()`. **Uden det sker der intet, når man slipper.**\n3. I `drop` hentes id'et med `getData`, og elementet flyttes med `appendChild` — et element, der allerede står på siden, **flyttes** og kopieres ikke.",
        sprog: "html",
        kode: R`<div id="hylde">
    <span class="vare" id="aeble" draggable="true">Æble</span>
    <span class="vare" id="ost" draggable="true">Ost</span>
</div>
<div id="kurv">Træk varer herned</div>

<script>
    const kurv = document.getElementById("kurv");

    for (const vare of document.querySelectorAll(".vare")) {
        vare.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", e.target.id);
        });
    }

    kurv.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    kurv.addEventListener("drop", (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");
        kurv.appendChild(document.getElementById(id));
    });
</script>`,
        noter: [
          ["draggable=\"true\"", "Elementet kan trækkes."],
          ["setData(\"text/plain\", e.target.id)", "Læg id'et på trækket. `\"text/plain\"` siger, at det er almindelig tekst."],
          ["dragover + preventDefault()", "\"Her må man gerne slippe.\" Browserens standard er nej."],
          ["getData(\"text/plain\")", "Hent det, der blev lagt på i `dragstart`."],
          ["kurv.appendChild(…)", "Flyt elementet ind i kurven."]
        ],
        md2: "Afprøvet: når Ost trækkes ned i kurven, står den der bagefter og er væk fra hylden. Giv `#kurv` en kant med CSS, fx `border: 2px dashed gray; min-height: 100px;`, så man kan se, hvor man skal slippe." },
      { t: "valg", q: "Varerne kan trækkes, men når man slipper over kurven, sker der ingenting, og `drop`-hændelsen kommer aldrig. Hvad er den mest sandsynlige fejl?",
        svar: ["`e.preventDefault()` mangler i kurvens `dragover`-hændelse", "`draggable=\"true\"` mangler på varerne", "`appendChild` er stavet forkert", "Kurven er et `div`"],
        ret: 0, fordi: "Browserens standard er, at man **ikke** må slippe noget på et element. Først når `dragover` kalder `preventDefault()`, bliver `drop` sendt. Manglede `draggable`, kunne varerne slet ikke trækkes." },
      { t: "udfyld", sprog: "js", q: "Læg varens id på trækket, og hent det igen, når der slippes.",
        kode: R`vare.addEventListener("dragstart", (e) => {
    e.dataTransfer.[[setData]]("text/plain", e.target.[[id]]);
});

kurv.addEventListener("drop", (e) => {
    e.preventDefault();
    const id = e.dataTransfer.[[getData]]("text/plain");
    kurv.appendChild(document.getElementById(id));
});`,
        fordi: "`setData` i `dragstart` og `getData` i `drop` — med samme type, `\"text/plain\"`. Det, der lægges på, er elementets `id`, så det kan findes igen med `getElementById`." },
      { t: "ide", h: "Find din position",
        md: "Lav `position.html` i `wwwroot` i `HtmlSider`, skriv koden **selv**, kør projektet, og gå til `/position.html`. Klik **Find mig**, og sig ja. Prøv bagefter at sige nej (klik på ikonet til venstre for adressen for at ændre tilladelsen).",
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Min position</title>
</head>
<body>
    <button id="find">Find mig</button>
    <p id="svar"></p>
    <a id="kort" target="_blank" hidden>Vis på kort</a>

    <script>
        const svar = document.getElementById("svar");
        const kort = document.getElementById("kort");

        function lykkedes(pos) {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            svar.textContent = "Bredde " + lat.toFixed(4) + ", længde " + lon.toFixed(4) +
                               " (± " + Math.round(pos.coords.accuracy) + " m)";
            kort.href = "https://www.openstreetmap.org/?mlat=" + lat + "&mlon=" + lon + "#map=15/" + lat + "/" + lon;
            kort.hidden = false;
        }

        function fejlede(fejl) {
            svar.textContent = "Fejl " + fejl.code + ": " + fejl.message;
        }

        document.getElementById("find").addEventListener("click", () => {
            svar.textContent = "Finder din position …";
            navigator.geolocation.getCurrentPosition(lykkedes, fejlede, { timeout: 10000 });
        });
    </script>
</body>
</html>`,
        output: "Klik Find mig og sig ja: Bredde 55.6761, længde 12.5683 (± 35 m) — dine egne tal — og linket Vis på kort\nSig nej: Fejl 1: User denied Geolocation",
        md2: "Linket åbner OpenStreetMap med en nål på din position. `hidden` skjuler linket, indtil der er en position. Tallene skrives med punktum, fordi `toFixed` ikke bruger dansk komma." },
      { t: "forklar", q: "Forklar med dine egne ord, hvordan drag and drop virker i HTML5, og hvad der sker, hvis man glemmer `preventDefault` i `dragover`.",
        svar: "Det, der skal trækkes, får **`draggable=\"true\"`**. I **`dragstart`** lægger jeg elementets id på trækket med **`dataTransfer.setData`**. Målet skal sige ja til at modtage: i **`dragover`** kalder jeg **`preventDefault()`**, for browserens standard er, at man ikke må slippe. I **`drop`** henter jeg id'et med **`getData`**, finder elementet og flytter det med `appendChild`. Glemmer man `preventDefault` i `dragover`, kommer `drop`-hændelsen aldrig, så der sker ingenting, når man slipper.",
        noegle: ["draggable", "dragstart", "setData", "dragover", "preventDefault", "drop", "getData"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m27l4", titel: "Lyd, video og fetch", min: 18,
    ord: [
      ["<audio> / <video>", "HTML-elementer, der afspiller lyd og video direkte i browseren. `controls` viser browserens egne knapper."],
      ["play() / pause()", "Start og stop afspilningen fra JavaScript."],
      ["paused", "`true`, når elementet ikke spiller lige nu."],
      ["currentTime / duration", "Hvor langt afspilningen er nået, og hvor lang filen er — i sekunder."],
      ["timeupdate / ended", "Hændelser: afspilningstiden har flyttet sig / filen er spillet færdig."],
      ["Autoplay-reglen", "Browsere afspiller ikke lyd af sig selv, før brugeren har klikket på siden. Video uden lyd (`muted`) må gerne starte selv."],
      ["fetch", "Henter data fra en adresse i baggrunden. Bruges med `await` (modul 15)."],
      ["response.ok", "`true`, når statuskoden er 200–299. `fetch` kaster **ikke** en fejl ved 404 — man skal selv tjekke `ok`."]
    ],
    trin: [
      { t: "laes", h: "Lyd og video med ét tag",
        md: "Før HTML5 krævede lyd og video et plugin. Nu er der to tags. Med attributten `controls` får man browserens egne knapper: afspil, tid, lydstyrke og fuld skærm. Flere `<source>` gør, at browseren vælger den første fil, den kan afspille.",
        sprog: "html",
        kode: R`<audio src="sang1.mp3" controls></audio>

<video width="480" controls poster="forside.jpg">
    <source src="film.mp4" type="video/mp4">
    <source src="film.webm" type="video/webm">
    Din browser kan ikke vise video.
</video>

<video src="baggrund.mp4" autoplay muted loop></video>`,
        noter: [
          ["controls", "Vis browserens afspilningsknapper."],
          ["poster", "Billedet, der vises, før videoen startes."],
          ["<source … type=\"…\">", "Alternative filer. Browseren tager den første, den kan afspille."],
          ["Teksten inde i <video>", "Vises kun i en meget gammel browser uden video."],
          ["autoplay muted loop", "Start selv, uden lyd, og forfra igen og igen — fx en baggrundsvideo."]
        ] },
      { t: "valg", q: "En side har `<audio src=\"musik.mp3\" autoplay>`. Musikken starter ikke, når siden åbnes. Hvorfor?",
        svar: ["Browsere afspiller ikke lyd af sig selv, før brugeren har klikket på siden — det er autoplay-reglen", "mp3 virker ikke i browsere", "Der mangler `controls`", "Lydfiler skal ligge i en database"],
        ret: 0, fordi: "Ingen bryder sig om sider, der pludselig larmer. Derfor blokerer browserne lyd, der starter af sig selv. Video med `muted` må gerne starte selv. Lyd skal startes fra et klik." },
      { t: "laes", h: "Styr afspilningen fra JavaScript",
        md: "Laver du dine egne knapper, bruger du elementets metoder og egenskaber. Hændelsen `timeupdate` kommer flere gange i sekundet under afspilning, så her opdateres tiden. `ended` kommer, når filen er færdig.",
        sprog: "js",
        kode: R`function formatTid(sekunder) {
    const min = Math.floor(sekunder / 60);
    const sek = Math.floor(sekunder % 60);
    return min + ":" + String(sek).padStart(2, "0");
}

knap.addEventListener("click", () => {
    if (lyd.paused) {
        lyd.play();
        knap.textContent = "Pause";
    } else {
        lyd.pause();
        knap.textContent = "Afspil";
    }
});

lyd.addEventListener("timeupdate", () => {
    tid.textContent = formatTid(lyd.currentTime) + " / " + formatTid(lyd.duration);
});

lyd.addEventListener("ended", () => {
    knap.textContent = "Afspil";
});`,
        noter: [
          ["Math.floor(sekunder / 60)", "Hele minutter."],
          ["sekunder % 60", "Sekunderne, der er tilbage."],
          ["String(sek).padStart(2, \"0\")", "Fyld op med 0 forfra til to tegn: 5 bliver `05`."],
          ["lyd.paused", "Spiller den ikke? Så start den. Ellers stop den."],
          ["lyd.currentTime, lyd.duration", "Tiden indtil nu og hele længden, i sekunder (kommatal)."]
        ],
        md2: "Afprøvet med en lydfil på ét sekund: knappen skifter til **Pause**, tiden viser **0:00 / 0:01**, og når lyden er færdig, står der **Afspil** igen." },
      { t: "forudsig", sprog: "js", q: "Hvad skriver programmet?",
        kode: R`function formatTid(sekunder) {
    const min = Math.floor(sekunder / 60);
    const sek = Math.floor(sekunder % 60);
    return min + ":" + String(sek).padStart(2, "0");
}
console.log(formatTid(65));
console.log(formatTid(9.7));
console.log(formatTid(720));`,
        output: "1:05\n0:09\n12:00",
        fordi: "65 sekunder er 1 minut og 5 sekunder, og 5 fyldes op til `05`. 9,7 sekunder rundes **ned** til 9. 720 sekunder er præcis 12 minutter." },
      { t: "fejl", sprog: "js", logisk: true,
        q: "Afspilleren viser `1:5` efter 65 sekunder. Den skulle vise `1:05`. Hvilken linje er forkert?",
        kode: R`function formatTid(sekunder) {
    const min = Math.floor(sekunder / 60);
    const sek = Math.floor(sekunder % 60);
    return min + ":" + sek;
}
console.log(formatTid(65));`,
        linje: 4,
        fordi: "Sekunderne skrives, som de er. Under 10 bliver de kun ét ciffer. `String(sek).padStart(2, \"0\")` fylder op med et nul forfra.",
        rettet: R`function formatTid(sekunder) {
    const min = Math.floor(sekunder / 60);
    const sek = Math.floor(sekunder % 60);
    return min + ":" + String(sek).padStart(2, "0");
}
console.log(formatTid(65));` },
      { t: "udfyld", sprog: "js", q: "Afspil, hvis lyden står stille — ellers sæt den på pause.",
        kode: R`if (lyd.[[paused]]) {
    lyd.[[play]]();
} else {
    lyd.[[pause]]();
}`,
        fordi: "`paused` er `true`, når der ikke spilles. `play()` og `pause()` starter og stopper." },
      { t: "laes", h: "fetch: hent data fra serveren (repetition)",
        md: "Du lærte `fetch` i modul 15 og brugte det mod dit Web API i modul 19. Her er mønsteret igen, for nu henter du en liste af sange fra en JSON-fil.\n\nTo ting at huske: `fetch` virker **ikke**, når siden er åbnet direkte fra disken (`file://`) — afprøvet: det giver `Failed to fetch`. Læg siden i `HtmlSider`. Og `fetch` kaster **ikke** en fejl ved 404: den kaster kun, hvis der slet ikke er forbindelse. Derfor tjekker man `svar.ok`.",
        sprog: "js",
        kode: R`async function hentSange() {
    try {
        const svar = await fetch("sange.json");
        if (!svar.ok) {
            fejl.textContent = "Fejl: " + svar.status;
            return;
        }
        const sange = await svar.json();
        for (const sang of sange) {
            const li = document.createElement("li");
            li.textContent = sang.titel;
            li.addEventListener("click", () => {
                afspiller.src = sang.fil;
                afspiller.play();
            });
            liste.appendChild(li);
        }
    } catch (e) {
        fejl.textContent = "Netværksfejl: " + e.message;
    }
}

hentSange();`,
        noter: [
          ["async function / await", "Vent på svaret uden at fryse siden (modul 15)."],
          ["if (!svar.ok)", "Fx 404, hvis filen ikke findes."],
          ["await svar.json()", "Lav JSON-teksten om til et JavaScript-array."],
          ["afspiller.play()", "Et klik på en sang er et brugerklik, så autoplay-reglen er overholdt."],
          ["catch", "Kun når der slet ikke kunne skabes forbindelse."]
        ] },
      { t: "forudsig", sprog: "js", q: "`await` venter — men kun inde i sin egen funktion. Resten af programmet fortsætter imens. Hvad skriver programmet?",
        kode: R`function vent() {
    return new Promise(klar => setTimeout(klar, 100));
}

async function hent() {
    console.log("B");
    await vent();
    console.log("D");
}

console.log("A");
hent();
console.log("C");`,
        output: "A\nB\nC\nD",
        fordi: "`hent()` kører, indtil den når `await`, og skriver B. Mens den venter, fortsætter programmet og skriver C. Efter 100 ms fortsætter `hent` og skriver D. `vent()` spiller rollen som `fetch`: noget, der tager tid." },
      { t: "valg", q: "`fetch(\"sange.json\")` giver statuskode 404, fordi filen ligger i en forkert mappe. Hvad sker der?",
        svar: ["`fetch` giver et svar med `ok` lig med `false` og `status` 404 — den kaster ingen fejl, så man skal selv tjekke `ok`", "`fetch` kaster en fejl, så koden hopper til `catch`", "Siden genindlæses", "`fetch` venter, til filen dukker op"],
        ret: 0, fordi: "For `fetch` er 404 et helt gyldigt svar fra serveren. Kun netværksfejl (ingen forbindelse, `file://`) havner i `catch`. Glemmer man at tjekke `svar.ok`, går det galt i `svar.json()` i stedet." },
      { t: "skriv", sprog: "js",
        q: "Skriv de to linjer, der henter `\"sange.json\"` med `fetch` ind i variablen `svar` og derefter laver svaret om til et array i variablen `sange`. Brug `await` begge steder.",
        foer: R`async function hentSange() {`,
        efter: R`    console.log(sange.length);
}`,
        tjek: [
          [/const svar=await fetch\(("sange\.json"|'sange\.json')\);/, "Hent filen: `const svar = await fetch(\"sange.json\");`"],
          [/const sange=await svar\.json\(\);/, "Lav svaret om til et array: `const sange = await svar.json();`"],
          [/JSON\.parse/, "Brug `svar.json()` — den læser og laver om på én gang", "ikke"]
        ],
        forkert: ["const svar = fetch(\"sange.json\");\nconst sange = svar.json();", "const svar = await fetch(\"sange.json\");\nconst sange = svar.json();"],
        loesning: R`const svar = await fetch("sange.json");
const sange = await svar.json();` },
      { t: "ide", h: "En spilleliste",
        md: "Læg tre korte lydfiler, `sang1.mp3`, `sang2.mp3` og `sang3.mp3`, i `wwwroot` i `HtmlSider` sammen med filen `sange.json` herunder. Lav så `spilleliste.html` med `fetch`-koden fra trinnet før, en `<audio id=\"afspiller\" controls>`, en `<ul id=\"liste\">` og en `<p id=\"fejl\">`. Kør projektet, og gå til `/spilleliste.html`.",
        sprog: "text",
        kode: R`[
  { "titel": "Første sang", "fil": "sang1.mp3" },
  { "titel": "Anden sang", "fil": "sang2.mp3" },
  { "titel": "Tredje sang", "fil": "sang3.mp3" }
]`,
        output: "Siden viser tre sange i en liste\nKlik på Anden sang: den spiller i afspilleren\nÅbnet direkte fra disken: Netværksfejl: Failed to fetch",
        md2: "Prøv også at stave `sange.json` forkert i koden: så skal siden skrive **Fejl: 404**. Sæt et breakpoint på linjen med `svar.json()` i **Sources**, og se `svar` under **Scope**: `status` og `ok` står der." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er HTML5-API'er? Giv tre eksempler, og forklar ét af dem.",
        svar: "HTML5-API'er er funktioner, der er **indbygget i browseren**, og som JavaScript kan bruge uden ekstra biblioteker. Eksempler er **canvas** til tegning og billeder, **Geolocation** til brugerens position, **Web Storage** (`localStorage`) til at gemme data i browseren, **drag and drop**, **audio/video** og **fetch** til at hente data. Fx Geolocation: `navigator.geolocation.getCurrentPosition` får to funktioner — én til, når positionen er fundet, og én til fejl. Browseren **spørger brugeren om lov**, og det virker kun i en **sikker kontekst** (https eller localhost), fordi positionen er persondata.",
        noegle: ["indbygget i browseren", "canvas", "Geolocation", "localStorage", "fetch", "spørger brugeren"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m27v", titel: "Værksted: fem små HTML5-apps", vaerksted: true, min: 90, ord: [],
    trin: [
      { t: "laes", h: "Sådan arbejder du i værkstedet",
        md: "Du bygger fem små sider, der hver bruger et eller flere HTML5-API'er. Den første er let. Den tredje er en fejlfinding med browserens debugger. Den sidste samler det hele i en musikafspiller.\n\nLæg alle filerne i `wwwroot` i projektet `HtmlSider` fra lektion 3, kør projektet, og gå til fx `/karrusel.html`. Genindlæs med {{**F5**||**⌘R**}}, hver gang du har gemt.\n\nBoksen under hver opgave taler om at sammenligne output. Her er der ikke noget at sætte ind: krav-listen er dit facit, og eksemplet viser, hvad du skal kunne se.",
        noter: [
          ["Skriv selv", "Skriv koden med dine egne fingre. Kopiér ikke fra lektionerne."],
          ["Konsollen er altid åben", "Hav udviklerværktøjet åbent ({{**F12**||**⌥⌘I**}}) med fanen **Console**. En fejl i JavaScript vises kun der, med rødt og et linjenummer."],
          ["Brug debuggeren", "Fanen **Sources**: klik på et linjenummer for at sætte et **breakpoint**. **Scope** viser variablerne, og **Step over** går én linje frem."],
          ["Se lageret", "Fanen **Application** → **Local Storage** viser, hvad din side har gemt. Du kan også slette det der."],
          ["Tips før løsning", "Åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af."]
        ] },

      { t: "opgave", h: "Billedkarrusel med prikker", projekt: "HtmlSider", sprog: "html",
        md: "Lav `karrusel.html`: ét canvas, hvor man skifter billede ved at **klikke på lærredet**. Under billedet tegnes én lille cirkel pr. billede, og cirklen for det billede, der vises, er udfyldt — ligesom prikkerne under billederne i en webshop.",
        krav: [
          "Ét canvas med id `lerred`, 400 bredt og 330 højt, med en grå kant",
          "Tre billeder, `billede1.jpg`, `billede2.jpg` og `billede3.jpg`, hentes som `Image`-objekter i et array. Det første vises, når alle tre er hentet",
          "En funktion `vis()` sletter lærredet, tegner det aktuelle billede i 400 × 300 øverst, og tegner tre cirkler med radius 8 ved y = 315 og x = 170, 200 og 230",
          "Den aktuelle cirkel er udfyldt (`fill`); de andre er kun en kant (`stroke`)",
          "Et klik på lærredet viser næste billede og starter forfra efter det sidste"
        ],
        tip: [
          "Genbrug hentningen med `indlaest`-tælleren fra lektion 1. Lyt efter `\"click\"` på selve canvas-elementet.",
          "Cirklerne tegnes i en løkke: `for (let i = 0; i < billeder.length; i++)`. x er `170 + i * 30`.",
          "Inde i løkken: `ctx.beginPath(); ctx.arc(170 + i * 30, 315, 8, 0, Math.PI * 2); if (i === nr) { ctx.fill(); } else { ctx.stroke(); }`"
        ],
        fri: true,
        output: "Siden åbnes: billede 1 og tre prikker, hvor den første er udfyldt\nKlik på lærredet: billede 2, og den midterste prik er udfyldt\nTo klik mere: billede 1 igen",
        loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Karrusel</title>
</head>
<body>
    <canvas id="lerred" width="400" height="330" style="border: 1px solid gray; cursor: pointer"></canvas>

    <script>
        const canvas = document.getElementById("lerred");
        const ctx = canvas.getContext("2d");
        const filer = ["billede1.jpg", "billede2.jpg", "billede3.jpg"];
        const billeder = [];
        let nr = 0;
        let indlaest = 0;

        for (const fil of filer) {
            const b = new Image();
            b.addEventListener("load", () => {
                indlaest++;
                if (indlaest === filer.length) {
                    vis();
                }
            });
            b.src = fil;
            billeder.push(b);
        }

        function vis() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(billeder[nr], 0, 0, 400, 300);

            for (let i = 0; i < billeder.length; i++) {
                ctx.beginPath();
                ctx.arc(170 + i * 30, 315, 8, 0, Math.PI * 2);
                if (i === nr) {
                    ctx.fill();
                } else {
                    ctx.stroke();
                }
            }
        }

        canvas.addEventListener("click", () => {
            nr = (nr + 1) % billeder.length;
            vis();
        });
    </script>
</body>
</html>`,
        ekstra: ["Lad et klik i **venstre** halvdel af lærredet gå tilbage og et klik i højre gå frem. Tip: `e.offsetX < 200`.", "Lav prikkerne om, så x regnes ud fra antallet af billeder, og de altid står i midten — også med 5 billeder."] },

      { t: "opgave", h: "Tegneprogram med farve, tykkelse og Gem", projekt: "HtmlSider", sprog: "html",
        md: "Udvid tegneprogrammet fra lektion 2 til `tegning.html`: brugeren vælger farve og tykkelse, kan rydde, og kan gemme tegningen, så den er der igen næste gang siden åbnes.",
        krav: [
          "Et canvas med id `lerred` på 500 × 350 og grå kant",
          "Et `<input type=\"color\" id=\"farve\">` med startværdien sort og et `<input type=\"range\" id=\"tykkelse\">` fra 1 til 20, der starter på 4",
          "Stregerne tegnes med den valgte farve og tykkelse og runde ender",
          "Knappen `Ryd` sletter lærredet",
          "Knappen `Gem` gemmer tegningen i localStorage under nøglen `tegning` og skriver `Gemt` i et afsnit med id `status`",
          "Når siden åbnes, og der er en gemt tegning, tegnes den, og `status` viser `Hentet din gemte tegning`"
        ],
        tip: [
          "Start fra din `tegn.html`. Farven er `farve.value`, og tykkelsen er `Number(tykkelse.value)` — værdien af et input er altid tekst.",
          "Sæt `ctx.strokeStyle` og `ctx.lineWidth` inde i `mousemove`, lige før `stroke()`, så et nyt valg bruges med det samme.",
          "Gem: `localStorage.setItem(\"tegning\", canvas.toDataURL());`. Hent: `const gemt = localStorage.getItem(\"tegning\"); if (gemt !== null) { const billede = new Image(); billede.addEventListener(\"load\", () => ctx.drawImage(billede, 0, 0)); billede.src = gemt; }`"
        ],
        fri: true,
        output: "Tegn en rød, tyk streg: den bliver rød og tyk\nKlik Gem: \"Gemt\"\nGenindlæs siden: stregen er der stadig, og der står \"Hentet din gemte tegning\"\nKlik Ryd: lærredet er tomt",
        loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Tegneprogram</title>
</head>
<body>
    <canvas id="lerred" width="500" height="350" style="border: 1px solid gray"></canvas>
    <p>
        <input type="color" id="farve" value="#000000">
        <input type="range" id="tykkelse" min="1" max="20" value="4">
        <button id="ryd">Ryd</button>
        <button id="gem">Gem</button>
    </p>
    <p id="status"></p>

    <script>
        const canvas = document.getElementById("lerred");
        const ctx = canvas.getContext("2d");
        const farve = document.getElementById("farve");
        const tykkelse = document.getElementById("tykkelse");
        const status = document.getElementById("status");
        let tegner = false;
        let sidstX = 0;
        let sidstY = 0;

        canvas.addEventListener("mousedown", (e) => {
            tegner = true;
            sidstX = e.offsetX;
            sidstY = e.offsetY;
        });

        canvas.addEventListener("mousemove", (e) => {
            if (!tegner) {
                return;
            }
            ctx.beginPath();
            ctx.moveTo(sidstX, sidstY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.strokeStyle = farve.value;
            ctx.lineWidth = Number(tykkelse.value);
            ctx.lineCap = "round";
            ctx.stroke();
            sidstX = e.offsetX;
            sidstY = e.offsetY;
        });

        canvas.addEventListener("mouseup", () => tegner = false);
        canvas.addEventListener("mouseleave", () => tegner = false);

        document.getElementById("ryd").addEventListener("click", () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            status.textContent = "";
        });

        document.getElementById("gem").addEventListener("click", () => {
            localStorage.setItem("tegning", canvas.toDataURL());
            status.textContent = "Gemt";
        });

        const gemt = localStorage.getItem("tegning");
        if (gemt !== null) {
            const billede = new Image();
            billede.addEventListener("load", () => ctx.drawImage(billede, 0, 0));
            billede.src = gemt;
            status.textContent = "Hentet din gemte tegning";
        }
    </script>
</body>
</html>`,
        ekstra: ["Tilføj en knap `Hent som fil`. Tip: lav et `<a>` med `href = canvas.toDataURL()` og `download = \"tegning.png\"`, og kald `.click()` på det.", "Gem også den valgte farve og tykkelse i localStorage, så de er valgt igen næste gang."] },

      { t: "opgave", h: "Fejlfinding: opgaverne vil ikke flyttes", projekt: "HtmlSider", sprog: "html",
        md: "Siden `opgaver.html` har to lister. Man skal kunne trække en opgave fra **Mangler** over i **Færdig**, og så skal tælleren gå op. Lige nu sker der ingenting, når man slipper. Kopiér startkoden, og find fejlene **med debuggeren**. Der er to — og den anden viser sig først, når den første er rettet.",
        krav: [
          "Træk `Køb mælk` over i Færdig: den står nu under Færdig og er væk fra Mangler",
          "Teksten under listerne er `Færdige: 1`, og efter to opgaver `Færdige: 2`",
          "Konsollen viser ingen røde fejl",
          "Du har brugt et breakpoint i `drop` og set `id` under **Scope**"
        ],
        start: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Opgaver</title>
    <style>
        ul { min-height: 120px; border: 2px dashed gray; padding: 10px; width: 220px; display: inline-block; vertical-align: top; }
        li { background: lightyellow; margin: 4px; padding: 6px; cursor: grab; list-style: none; }
    </style>
</head>
<body>
    <h2>Mangler</h2>
    <ul id="mangler">
        <li id="o1" draggable="true">Køb mælk</li>
        <li id="o2" draggable="true">Ring til Bo</li>
        <li id="o3" draggable="true">Aflever opgave</li>
    </ul>
    <h2>Færdig</h2>
    <ul id="faerdig"></ul>
    <p id="antal">Færdige: 0</p>

    <script>
        const faerdig = document.getElementById("faerdig");
        const antal = document.getElementById("antal");

        for (const li of document.querySelectorAll("li")) {
            li.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", e.target.textContent);
            });
        }

        faerdig.addEventListener("dragover", (e) => {
            faerdig.style.background = "honeydew";
        });

        faerdig.addEventListener("drop", (e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData("text/plain");
            const opgave = document.getElementById(id);
            faerdig.appendChild(opgave);
            antal.textContent = "Færdige: " + faerdig.children.length;
        });
    </script>
</body>
</html>`,
        startFejler: true,
        tip: [
          "Sæt et breakpoint på første linje inde i `drop`, og træk en opgave. Stopper koden overhovedet? Hvis ikke, er `drop` aldrig kommet. Hvad skal `dragover` gøre, for at man må slippe (lektion 3)?",
          "Når `drop` kommer: se `id` under **Scope**. Den er `\"Køb mælk\"` — men `getElementById` skal have et id som `\"o1\"`. Konsollen siger: `Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'`, fordi `opgave` er `null`.",
          "Tilføj `e.preventDefault();` i `dragover`, og læg `e.target.id` på trækket i stedet for `e.target.textContent`."
        ],
        fri: true,
        output: "Træk Køb mælk til Færdig: den flyttes, og der står Færdige: 1\nTræk Ring til Bo til Færdig: Færdige: 2",
        loesning: R`<!-- Kun de to rettede steder: -->
<script>
        for (const li of document.querySelectorAll("li")) {
            li.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", e.target.id);
            });
        }

        faerdig.addEventListener("dragover", (e) => {
            e.preventDefault();
            faerdig.style.background = "honeydew";
        });
</script>`,
        ekstra: ["Gør det muligt at trække opgaver **tilbage** til Mangler. Tip: giv også `mangler` en `dragover` og en `drop`, og lav en fælles funktion til at opdatere tælleren.", "Gem, hvilke id'er der er færdige, i localStorage som et JSON-array, og flyt dem over, når siden åbnes."] },

      { t: "opgave", h: "Hvor er jeg — og hvad er nærmest?", projekt: "HtmlSider", sprog: "html",
        md: "Lav `hvor.html`: ved et klik findes brugerens position, og siden viser den nærmeste af tre byer, et kortlink, og husker den sidste position til næste besøg.",
        krav: [
          "Et array `byer` med objekter `{ navn, lat, lon }`: København 55.6761, 12.5683 · Aarhus 56.1629, 10.2039 · Odense 55.4038, 10.4024",
          "Funktionen `afstandKm` fra lektion 3",
          "Knappen `Find mig` kalder `getCurrentPosition`. Når det lykkes, viser afsnittet `position` fx `Du er her: 56.1500, 10.2100 (± 20 m)`",
          "Afsnittet `naermest` viser fx `Nærmeste by: Aarhus (1 km)` — fundet med en løkke, der husker den mindste afstand",
          "Et link `Vis på kort` til OpenStreetMap bliver synligt",
          "Positionen gemmes i localStorage som JSON under nøglen `sidstePosition`. Næste gang siden åbnes, viser afsnittet `sidst` fx `Sidst du kiggede, var du her: 56.1500, 10.2100`",
          "Siger brugeren nej, står der `Du sagde nej til at dele din position.`; andre fejl giver `Positionen kunne ikke findes.`"
        ],
        tip: [
          "Byg det i tre skridt: først positionen (som `position.html`), så nærmeste by, så localStorage.",
          "Nærmeste by: `let bedst = null; let bedstAfstand = Infinity;` og en `for (const by of byer)`, der sammenligner `afstandKm(lat, lon, by.lat, by.lon)` med `bedstAfstand`.",
          "Gem: `localStorage.setItem(\"sidstePosition\", JSON.stringify({ lat: lat, lon: lon }));`. Hent: `const p = JSON.parse(gemt);` og så `p.lat.toFixed(4)`."
        ],
        fri: true,
        output: "Klik Find mig i Aarhus:\nDu er her: 56.1500, 10.2100 (± 20 m)\nNærmeste by: Aarhus (1 km)\nVis på kort\nGenindlæs siden: Sidst du kiggede, var du her: 56.1500, 10.2100\nSig nej: Du sagde nej til at dele din position.",
        loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Hvor er jeg?</title>
</head>
<body>
    <h1>Hvor er jeg?</h1>
    <button id="find">Find mig</button>
    <p id="position"></p>
    <p id="naermest"></p>
    <p><a id="kort" href="#" target="_blank" hidden>Vis på kort</a></p>
    <p id="sidst"></p>

    <script>
        const byer = [
            { navn: "København", lat: 55.6761, lon: 12.5683 },
            { navn: "Aarhus", lat: 56.1629, lon: 10.2039 },
            { navn: "Odense", lat: 55.4038, lon: 10.4024 }
        ];

        function afstandKm(lat1, lon1, lat2, lon2) {
            const jordRadius = 6371;
            const tilRad = Math.PI / 180;
            const dLat = (lat2 - lat1) * tilRad;
            const dLon = (lon2 - lon1) * tilRad;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                      Math.cos(lat1 * tilRad) * Math.cos(lat2 * tilRad) *
                      Math.sin(dLon / 2) * Math.sin(dLon / 2);
            return 2 * jordRadius * Math.asin(Math.sqrt(a));
        }

        function visPosition(lat, lon, noejagtighed) {
            document.getElementById("position").textContent =
                "Du er her: " + lat.toFixed(4) + ", " + lon.toFixed(4) + " (± " + Math.round(noejagtighed) + " m)";

            let bedst = null;
            let bedstAfstand = Infinity;
            for (const by of byer) {
                const km = afstandKm(lat, lon, by.lat, by.lon);
                if (km < bedstAfstand) {
                    bedstAfstand = km;
                    bedst = by;
                }
            }
            document.getElementById("naermest").textContent =
                "Nærmeste by: " + bedst.navn + " (" + Math.round(bedstAfstand) + " km)";

            const kort = document.getElementById("kort");
            kort.href = "https://www.openstreetmap.org/?mlat=" + lat + "&mlon=" + lon + "#map=15/" + lat + "/" + lon;
            kort.hidden = false;
        }

        document.getElementById("find").addEventListener("click", () => {
            document.getElementById("position").textContent = "Finder din position …";
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const lat = pos.coords.latitude;
                    const lon = pos.coords.longitude;
                    visPosition(lat, lon, pos.coords.accuracy);
                    localStorage.setItem("sidstePosition", JSON.stringify({ lat: lat, lon: lon }));
                },
                (fejl) => {
                    if (fejl.code === 1) {
                        document.getElementById("position").textContent = "Du sagde nej til at dele din position.";
                    } else {
                        document.getElementById("position").textContent = "Positionen kunne ikke findes.";
                    }
                },
                { timeout: 10000 }
            );
        });

        const gemt = localStorage.getItem("sidstePosition");
        if (gemt !== null) {
            const p = JSON.parse(gemt);
            document.getElementById("sidst").textContent =
                "Sidst du kiggede, var du her: " + p.lat.toFixed(4) + ", " + p.lon.toFixed(4);
        }
    </script>
</body>
</html>`,
        ekstra: ["Vis alle tre byer sorteret efter afstand. Tip: læg afstanden ind i hvert objekt, og brug `byer.sort((a, b) => a.km - b.km)`.", "I Chrome kan du lade som om, du er et andet sted: udviklerværktøjet → de tre prikker → **More tools → Sensors** → **Location**. Prøv London, og se, at Odense nu er nærmest af de tre."] },

      { t: "opgave", h: "Musikafspiller med kø", projekt: "HtmlSider", sprog: "html",
        md: "Saml modulet i `musik.html`: sangene hentes med `fetch` fra `sange.json` (fra lektion 4), vises som en kø, kan flyttes rundt med træk og slip, og afspilles efter hinanden. Lydstyrken huskes.",
        krav: [
          "Sangene hentes med `fetch(\"sange.json\")` i en `async` funktion med `try`/`catch` og tjek af `svar.ok`",
          "Køen er en `<ol id=\"koe\">`, som en funktion `visKoe()` bygger forfra ud fra arrayet `sange`. Den sang, der spiller, har klassen `spiller` (fed skrift med CSS)",
          "Et klik på en sang afspiller den i `<audio id=\"afspiller\" controls>`, og `Spiller nu: …` vises i et afsnit med id `nu`",
          "Når en sang er færdig (`ended`), spilles den næste i køen. Efter den sidste står der `Køen er slut`",
          "Man kan trække en sang hen på en anden sang i køen; så flyttes den til den plads. Den sang, der spiller, bliver ved med at være markeret",
          "Et `<input type=\"range\" id=\"lyd\">` fra 0 til 1 styrer `afspiller.volume` og gemmes i localStorage, så den samme lydstyrke er valgt næste gang"
        ],
        tip: [
          "Hold styr på to tal: `nr` (den sang, der spiller, −1 før start) og `traekkesFra` (den sang, der trækkes). Hvert `li` får sine hændelser inde i `visKoe()`, hvor du kender dets plads `i`: `sange.forEach((sang, i) => { … })`.",
          "Flyt i arrayet med `splice`: `const sang = sange.splice(fra, 1)[0]; sange.splice(til, 0, sang);`. Husk først, hvilken sang der spiller: `const spillende = sange[nr];` — og find den bagefter: `nr = sange.indexOf(spillende);`. Kald så `visKoe()`.",
          "`afspiller.addEventListener(\"ended\", () => { if (nr < sange.length - 1) { spil(nr + 1); } else { … } });` — og lydstyrken: `lyd.addEventListener(\"input\", () => { afspiller.volume = Number(lyd.value); localStorage.setItem(\"lydstyrke\", lyd.value); });`"
        ],
        fri: true,
        output: "Siden åbnes: Første sang · Anden sang · Tredje sang\nKlik Første sang: Spiller nu: Første sang, og den er fed\nTræk Tredje sang op på Første sang: Tredje sang · Første sang (fed) · Anden sang\nNår Første sang er færdig: Spiller nu: Anden sang\nSæt lydstyrken til 0,2 og genindlæs: skyderen står stadig på 0,2",
        loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Musikafspiller</title>
    <style>
        li { padding: 6px; margin: 4px; background: #eef; cursor: grab; }
        li.spiller { font-weight: bold; background: #cfc; }
    </style>
</head>
<body>
    <h1>Min afspiller</h1>
    <audio id="afspiller" controls></audio>
    <p>Lydstyrke: <input type="range" id="lyd" min="0" max="1" step="0.1" value="0.5"></p>
    <p id="nu">Vælg en sang</p>
    <ol id="koe"></ol>
    <p id="fejl"></p>

    <script>
        const afspiller = document.getElementById("afspiller");
        const lyd = document.getElementById("lyd");
        const koe = document.getElementById("koe");
        let sange = [];
        let nr = -1;
        let traekkesFra = -1;

        const gemtLyd = localStorage.getItem("lydstyrke");
        if (gemtLyd !== null) {
            lyd.value = gemtLyd;
        }
        afspiller.volume = Number(lyd.value);

        lyd.addEventListener("input", () => {
            afspiller.volume = Number(lyd.value);
            localStorage.setItem("lydstyrke", lyd.value);
        });

        function visKoe() {
            koe.innerHTML = "";
            sange.forEach((sang, i) => {
                const li = document.createElement("li");
                li.textContent = sang.titel;
                li.draggable = true;
                if (i === nr) {
                    li.className = "spiller";
                }
                li.addEventListener("click", () => spil(i));
                li.addEventListener("dragstart", (e) => {
                    traekkesFra = i;
                    e.dataTransfer.setData("text/plain", String(i));
                });
                li.addEventListener("dragover", (e) => e.preventDefault());
                li.addEventListener("drop", (e) => {
                    e.preventDefault();
                    flyt(traekkesFra, i);
                });
                koe.appendChild(li);
            });
        }

        function flyt(fra, til) {
            if (fra === til) {
                return;
            }
            const spillende = sange[nr];
            const sang = sange.splice(fra, 1)[0];
            sange.splice(til, 0, sang);
            nr = sange.indexOf(spillende);
            visKoe();
        }

        function spil(i) {
            nr = i;
            afspiller.src = sange[nr].fil;
            afspiller.play();
            document.getElementById("nu").textContent = "Spiller nu: " + sange[nr].titel;
            visKoe();
        }

        afspiller.addEventListener("ended", () => {
            if (nr < sange.length - 1) {
                spil(nr + 1);
            } else {
                document.getElementById("nu").textContent = "Køen er slut";
            }
        });

        async function hentSange() {
            try {
                const svar = await fetch("sange.json");
                if (!svar.ok) {
                    document.getElementById("fejl").textContent = "Kunne ikke hente sangene: " + svar.status;
                    return;
                }
                sange = await svar.json();
                visKoe();
            } catch (fejl) {
                document.getElementById("fejl").textContent = "Netværksfejl: " + fejl.message;
            }
        }

        hentSange();
    </script>
</body>
</html>`,
        ekstra: ["Tilføj knapperne `Forrige` og `Næste` med `%` som i slideshowet.", "Vis tiden som `1:05 / 3:20` med `formatTid` og `timeupdate` fra lektion 4.", "Gem køens rækkefølge i localStorage, så den er den samme næste gang."] }
    ] }
  ]
});
})();
