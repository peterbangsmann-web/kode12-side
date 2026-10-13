// Modul 15 — Objektorienteret JavaScript og AJAX. Forudsætter: modul 0–14 (C#, SQL, HTML/CSS og JavaScript).
(function () {
const R = String.raw;
// J`…` virker som R`…`, men bruges til JavaScript med template literals:
// skriv ´ hvor koden skal have en backtick, og €{ hvor den skal have dollar + tuborgklamme.
const J = function (s) { var v = [].slice.call(arguments, 1); return String.raw.apply(null, [s].concat(v)).replace(/´/g, "`").replace(/€\{/g, "$" + "{"); };

window.KURSUS.push({
  id: "m15", nr: 15, del: "Del 4 · Database og frontend", ikon: "🧩",
  titel: "Objektorienteret JavaScript og AJAX",
  dag: "Kursusdag 12–13 · Objektorienteret JavaScript",
  intro: "I modul 14 lærte du sproget og DOM'en. Nu bruger du det, du kan fra C#: **klasser, arv og indkapsling** — skrevet i JavaScript. Bagefter lærer du at vente på ting uden at siden fryser (**Promises** og **async/await**) og at hente og sende data til en server med **fetch**.\n\nTil sidst møder du **jQuery**, som følger med i ASP.NET Core MVC-skabelonen, og **web storage**, hvor siden kan huske ting i browseren. Det er præcis det, der sker i en moderne webapp: JavaScript henter JSON fra en Web API og opdaterer siden uden at genindlæse den.",
  video: ["12_Tirs_OOJS_del1.mp4 (2 t 17 min)", "12_Tirs_OOJS_del2.mp4 (1 t 6 min)", "13_Ons_JS+MVC.mp4 (4 t 23 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m15l1", titel: "Constructor functions, new og prototype", min: 16,
    ord: [
      ["Metode (JavaScript-objekt)", "En funktion, der ligger som property i et objekt. Den kaldes med punktum: `kunde.info()`."],
      ["this (i en metode)", "Det objekt, metoden blev kaldt på. I `kunde.info()` er `this` objektet `kunde`."],
      ["Constructor function", "En almindelig funktion med stort begyndelsesbogstav, der bygger objekter, når den kaldes med `new`. Den gamle måde at lave en \"klasse\" i JavaScript."],
      ["new (JavaScript)", "Laver et nyt, tomt objekt, kører funktionen med `this` = det nye objekt og giver objektet tilbage."],
      ["Prototype", "Et fælles objekt, som alle objekter lavet med samme constructor function deler. Metoder lægges her, så de kun findes én gang."],
      ["Referencelighed", "`===` på to objekter er kun `true`, hvis det er det **samme** objekt — ikke hvis de bare har ens indhold. Præcis som med klasser i C#."]
    ],
    trin: [
      { t: "laes", h: "Et objekt, der kan gøre noget",
        md: "I modul 14 skrev du objekter direkte i tuborgklammer: `{ navn: \"Ole\", by: \"Valby\" }`. Et objekt kan også have **metoder** — en property, hvis værdi er en funktion.\n\nInde i metoden skriver du `this` for at få fat i **det objekt, metoden blev kaldt på**. Det er det samme `this` som i en C#-klasse. Objektet har altså både **tilstand** (properties) og **adfærd** (metoder) — det er grundidéen i objektorienteret programmering.",
        sprog: "js",
        kode: R`const kunde = {
    navn: "Ole",
    by: "Valby",
    info: function () {
        return this.navn + " bor i " + this.by;
    }
};

console.log(kunde.info());
kunde.by = "Køge";
console.log(kunde.info());`,
        noter: [
          ["info: function () { … }", "En property, hvis værdi er en funktion. Det gør den til en **metode**."],
          ["this.navn", "\"Navnet på det objekt, jeg blev kaldt på.\" Her er det `kunde`."],
          ["kunde.info()", "Kald metoden. Husk parenteserne — uden dem får du selve funktionen, ikke resultatet."],
          ["kunde.by = \"Køge\";", "Metoden læser `this.by`, hver gang den kaldes, så den ser den nye by."]
        ],
        output: "Ole bor i Valby\nOle bor i Køge" },
      { t: "forudsig", sprog: "js",
        kode: R`const hund = {
    navn: "Fido",
    alder: 3,
    foedselsdag: function () {
        this.alder++;
    }
};

hund.foedselsdag();
hund.foedselsdag();
console.log(hund.navn + " er " + hund.alder);`,
        output: "Fido er 5",
        fordi: "`foedselsdag` lægger 1 til `this.alder`, og `this` er `hund`. Metoden kaldes to gange: 3 → 4 → 5." },
      { t: "laes", h: "Mange objekter af samme slags: constructor function",
        md: "Skal du bruge 100 kunder, vil du ikke skrive objektet 100 gange. Du vil have en **skabelon** — det, en klasse er i C#.\n\nDen ældste måde i JavaScript er en **constructor function**: en helt almindelig funktion med **stort** begyndelsesbogstav, som du kalder med `new`. Den gør det samme som en C#-konstruktør: sætter felterne på det nye objekt.",
        sprog: "js",
        kode: R`function Person(navn, by) {
    this.navn = navn;
    this.by = by;
}

const p1 = new Person("Ole", "Valby");
const p2 = new Person("Kim", "Kalby");

console.log(p1.navn);
console.log(p2.by);`,
        noter: [
          ["function Person(navn, by)", "Stort P er en aftale mellem programmører: \"denne funktion skal kaldes med `new`\". Sproget tjekker det ikke."],
          ["new Person(…)", "`new` gør tre ting: 1) laver et nyt, tomt objekt, 2) kører funktionen med `this` = det nye objekt, 3) giver objektet tilbage."],
          ["this.navn = navn;", "Laver propertyen `navn` på det nye objekt. Der står ingen `public` og ingen type."],
          ["p1, p2", "To forskellige objekter med hver deres værdier — som to objekter af samme klasse i C#."]
        ],
        output: "Ole\nKalby" },
      { t: "udfyld", sprog: "js",
        q: "Gør constructor function'en færdig, og lav et objekt med den.",
        kode: R`function Bil(maerke, km) {
    [[this]].maerke = maerke;
    this.km = km;
}

const b = [[new]] Bil("Volvo", 1000);
console.log(b.maerke);`,
        output: "Volvo",
        fordi: "`this.maerke` sætter propertyen på det objekt, der er ved at blive bygget. `new` er det, der laver objektet og giver det tilbage." },
      { t: "fejl", logisk: true, sprog: "js",
        q: "`b` skal være et nyt Bil-objekt, så programmet skal skrive `object`. Det skriver `undefined`. Hvilken linje er forkert?",
        kode: R`function Bil(maerke) {
    this.maerke = maerke;
}

const b = Bil("Volvo");
console.log(typeof b);`,
        linje: 5,
        output: "undefined",
        fordi: "Der mangler `new`. Uden `new` er `Bil` bare en almindelig funktion: der bliver ikke lavet noget objekt, og funktionen har ingen `return`, så den giver `undefined` tilbage. Værre endnu: `this` er så ikke et nyt objekt, så `this.maerke = …` skriver et forkert sted hen. JavaScript advarer ikke — det er derfor, stort begyndelsesbogstav betyder \"husk `new`\".",
        rettet: R`function Bil(maerke) {
    this.maerke = maerke;
}

const b = new Bil("Volvo");
console.log(typeof b);`,
        rettetOutput: "object" },
      { t: "forudsig", sprog: "js",
        q: "To personer med samme navn. Er de ens? Hvad skriver programmet?",
        kode: R`function Person(navn) {
    this.navn = navn;
}

const a = new Person("Ole");
const b = new Person("Ole");
const c = a;

console.log(a === b);
console.log(a === c);
console.log(a.navn === b.navn);`,
        output: "false\ntrue\ntrue",
        fordi: "Objekter er **referencetyper**, præcis som klasser i C# (modul 7). `a` og `b` er to **forskellige** objekter, der tilfældigvis har samme indhold, så `a === b` er false. `c = a` kopierer kun **referencen**, så `a` og `c` er det samme objekt. Navnene er to tekster med samme indhold — tekster sammenlignes på indholdet." },
      { t: "laes", h: "Prototype: metoder, alle objekter deler",
        md: "Metoderne kunne skrives inde i constructor function'en (`this.vis = function () { … }`). Men så får **hvert** objekt sin egen kopi af funktionen. Med 1000 konti er det 1000 ens funktioner.\n\nI stedet har hver constructor function et fælles objekt, der hedder **prototype**. Det, du lægger dér, **deler** alle objekterne. Når du skriver `k1.vis()`, kigger JavaScript først efter `vis` på `k1` selv. Finder den den ikke, kigger den i prototypen.\n\nReglen: **felter** (data) sættes i funktionen med `this`, så hvert objekt har sine egne. **Metoder** lægges i prototypen, så de findes én gang.",
        sprog: "js",
        kode: R`function Konto(ejer) {
    this.ejer = ejer;
    this.saldo = 0;
}

Konto.prototype.indsaet = function (beloeb) {
    this.saldo += beloeb;
};

Konto.prototype.vis = function () {
    console.log(this.ejer + ": " + this.saldo + " kr.");
};

const k1 = new Konto("Ole");
const k2 = new Konto("Kim");
k1.indsaet(500);
k1.vis();
k2.vis();
console.log(k1.vis === k2.vis);`,
        noter: [
          ["Konto.prototype.indsaet = function …", "Læg metoden i det fælles objekt. Alle konti kan nu kalde `indsaet`."],
          ["this.saldo += beloeb;", "`this` er stadig den konto, metoden blev kaldt på — `k1` her."],
          ["k1.vis === k2.vis", "`true`: begge objekter bruger den **samme** funktion fra prototypen."]
        ],
        output: "Ole: 500 kr.\nKim: 0 kr.\ntrue",
        md2: "Underviseren sammenligner det med en campingtur: hver familie har sin egen bil (felterne), men campingvognen deles af alle (prototypen). I næste lektion ser du, at JavaScripts `class` bygger på præcis det her — bare med pænere skrivemåde." },
      { t: "forudsig", sprog: "js",
        kode: R`function Konto(saldo) {
    this.saldo = saldo;
}

Konto.prototype.haev = function (beloeb) {
    if (beloeb > this.saldo) {
        console.log("Afvist");
        return;
    }
    this.saldo -= beloeb;
};

const k = new Konto(100);
k.haev(30);
k.haev(80);
console.log(k.saldo);`,
        output: "Afvist\n70",
        fordi: "Første hævning: 30 er ikke mere end 100, så saldoen bliver 70. Anden hævning: 80 er mere end 70, så der skrives `Afvist`, og `return` stopper metoden, før saldoen ændres. Saldoen er stadig 70." },
      { t: "spor", sprog: "js", slut: false,
        q: "To konti, der deler metoden `indsaet` fra prototypen. Skriv begge saldi efter hver af linjerne 7–11. Hver konto har sin **egen** saldo.",
        kode: R`function Konto(saldo) {
    this.saldo = saldo;
}
Konto.prototype.indsaet = function (b) {
    this.saldo += b;
};
const a = new Konto(100);
const b = new Konto(50);
a.indsaet(20);
b.indsaet(a.saldo);
a.indsaet(5);`,
        kolonner: ["a.saldo", "b.saldo"],
        raekker: [[7, "=100", "=–"], [8, "=100", "=50"], [9, "120", "50"], [10, "120", "170"], [11, "125", "170"]],
        fordi: "Linje 9 ændrer kun `a`, fordi `this` er `a`. I linje 10 er `this` `b`, og beløbet er `a.saldo`, som lige nu er 120: 50 + 120 = 170. Linje 11 ændrer igen kun `a`. Metoden findes én gang, men `this` skifter efter, hvem den kaldes på. I browserens debugger kan du sætte et breakpoint i linje 5 og se `this` under **Scope** skifte mellem de to konti." },
      { t: "valg", q: "Hvorfor lægger man metoder i `Konto.prototype` i stedet for at skrive `this.indsaet = function …` inde i constructor function'en?",
        svar: ["Så findes metoden kun én gang og deles af alle objekterne", "Fordi metoder inde i constructor function'en ikke kan bruge `this`", "Fordi prototypen gør metoden privat", "Fordi objekter lavet med `new` ellers ikke kan have metoder"],
        ret: 0, fordi: "Begge måder virker, og `this` virker begge steder. Forskellen er, at `this.indsaet = function …` laver en ny kopi af funktionen for **hvert** objekt. I prototypen findes den én gang, og alle objekterne deler den. Prototypen gør intet privat." },
      { t: "skriv", sprog: "js",
        q: "Skriv en constructor function `Vare` med parametrene `navn` og `pris`, der sætter `this.navn` og `this.pris`. Lav derefter en `const v` med `new Vare(\"Kaffe\", 45)`, og skriv `v.pris` ud med `console.log`.",
        tjek: [
          [/function Vare\(navn,pris\)\{/, "Lav funktionen: `function Vare(navn, pris) {`"],
          [/this\.navn=navn;/, "Sæt navnet: `this.navn = navn;`"],
          [/this\.pris=pris;/, "Sæt prisen: `this.pris = pris;`"],
          [/const v=new Vare\(("Kaffe"|'Kaffe'),45\);/, "Lav objektet med `new`: `const v = new Vare(\"Kaffe\", 45);`"],
          [/console\.log\(v\.pris\);/, "Skriv prisen ud: `console.log(v.pris);`"]
        ],
        forkert: ["function Vare(navn, pris) {\n    this.navn = navn;\n    this.pris = pris;\n}\nconst v = Vare(\"Kaffe\", 45);\nconsole.log(v.pris);", "function Vare(navn, pris) {\n    navn = navn;\n    pris = pris;\n}\nconst v = new Vare(\"Kaffe\", 45);\nconsole.log(v.pris);"],
        loesning: R`function Vare(navn, pris) {
    this.navn = navn;
    this.pris = pris;
}

const v = new Vare("Kaffe", 45);
console.log(v.pris);`,
        output: "45" },
      { t: "ide", h: "Studerende med prototype — i sin egen fil",
        md: "Underviseren lægger JavaScript i **sin egen fil** i stedet for i HTML'en. Gør det samme: lav en mappe `OojsOevelser` med to filer, `index.html` og `studerende.js`. HTML-filen skal kun have et `<h1>` og nederst i `body` linjen `<script src=\"studerende.js\"></script>`. Skriv koden herunder **selv** i `studerende.js`.",
        sprog: "js",
        kode: R`function Studerende(navn, karakterer) {
    this.navn = navn;
    this.karakterer = karakterer;
}

Studerende.prototype.snit = function () {
    let sum = 0;
    for (const k of this.karakterer) {
        sum += k;
    }
    return sum / this.karakterer.length;
};

const s1 = new Studerende("Maja", [10, 12, 8]);
const s2 = new Studerende("Ali", [4, 7, 2]);

console.log(s1.navn + ": " + s1.snit());
console.log(s2.navn + ": " + s2.snit().toFixed(1));`,
        output: "Maja: 10\nAli: 4.3",
        md2: "Åbn `index.html` i browseren og konsollen ({{**F12**||**⌥⌘I**}}). Gå så til fanen **Sources**, klik på `studerende.js`, og sæt et **breakpoint** på linjen `sum += k;` ved at klikke på linjenummeret. Genindlæs siden. Under **Scope** kan du se `this`, `sum` og `k`. Klik **Step over** et par gange, og se `sum` vokse. Læg mærke til, at `this` er Maja første gang og Ali anden gang." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er en constructor function, hvad gør `new`, og hvad bruger man prototypen til?",
        svar: "En **constructor function** er en almindelig funktion med stort begyndelsesbogstav, der bruges som skabelon for objekter. Kalder man den med **`new`**, laves et nyt tomt objekt, funktionen kører med `this` = det nye objekt, og objektet gives tilbage. Felterne sættes med `this.navn = navn`, så hvert objekt har sine egne. **Metoderne** lægges i **prototypen**, som alle objekterne deler, så hver metode kun findes én gang.",
        noegle: ["skabelon", "new", "this", "prototype", "deler"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m15l2", titel: "class i JavaScript: som i C#, næsten", min: 18,
    ord: [
      ["class (JavaScript)", "Den moderne skrivemåde for en skabelon til objekter. Bag kulisserne er det en constructor function med metoderne i prototypen."],
      ["constructor", "Konstruktøren i en JavaScript-klasse. Den hedder altid `constructor` — ikke det samme som klassen."],
      ["extends", "Arv i JavaScript: `class Kunde extends Person`. Svarer til `class Kunde : Person` i C#."],
      ["super", "`super(…)` kalder forælderens konstruktør (som `: base(…)` i C#). `super.info()` kalder forælderens metode (som `base.Info()`)."],
      ["Privat felt (#)", "Et felt, hvis navn starter med `#`. Det kan kun bruges inde i klassen — som `private` i C#."],
      ["get / set", "Getter og setter. Ser ud som en property udefra, men kører kode, når den læses eller sættes — som en property med `get`/`set` i C#."],
      ["static (JavaScript)", "Hører til klassen selv, ikke til det enkelte objekt. Kaldes med klassens navn: `Vare.antal`."],
      ["instanceof", "Tjekker, om et objekt er lavet ud fra en klasse eller en af dens efterkommere. Som `is` i C#."]
    ],
    trin: [
      { t: "laes", h: "class: den skrivemåde, du kender",
        md: "Siden 2015 har JavaScript haft `class`. Det ligner C# meget, men der er fem forskelle:\n\n1. Konstruktøren hedder altid `constructor`.\n2. Der står **ingen typer** og **ingen `public`**.\n3. Felter laves i konstruktøren med `this.navn = …`.\n4. Metoder skrives **uden** ordet `function`.\n5. Inde i klassen skal du **altid** skrive `this.` foran felter og metoder. I C# kunne du nøjes med `Navn`.\n\nBag kulisserne er en `class` det samme som forrige lektion: en constructor function med metoderne lagt i prototypen. Du skal stadig bruge `new`.",
        sprog: "js",
        kode: R`class Person {
    constructor(navn, by) {
        this.navn = navn;
        this.by = by;
    }

    info() {
        return this.navn + " bor i " + this.by;
    }
}

const p = new Person("Ole", "Valby");
console.log(p.info());`,
        noter: [
          ["class Person { … }", "Skabelonen. Klassenavne skrives med stort, som i C#."],
          ["constructor(navn, by)", "Kører, når der skrives `new Person(…)`. Som `public Person(string navn, string by)` i C#."],
          ["info() { … }", "En metode. Den havner automatisk i `Person.prototype`, så alle personer deler den."],
          ["this.navn", "`this.` skal med. Skriver du bare `navn` inde i `info`, leder JavaScript efter en variabel og giver en fejl."]
        ],
        output: "Ole bor i Valby" },
      { t: "forudsig", sprog: "js",
        kode: R`class Terning {
    constructor(sider) {
        this.sider = sider;
        this.slag = 0;
    }

    kast(tal) {
        this.slag++;
        return tal <= this.sider ? "OK" : "Umuligt";
    }
}

const t = new Terning(6);
console.log(t.kast(4));
console.log(t.kast(9));
console.log(t.slag);`,
        output: "OK\nUmuligt\n2",
        fordi: "4 er højst 6, så første kast er `OK`. 9 er mere end 6, så andet kast er `Umuligt`. `slag` tælles op ved **hvert** kald, også det umulige: 2. `? :` virker præcis som i C#." },
      { t: "udfyld", sprog: "js",
        q: "Gør klassen `Hund` færdig.",
        kode: R`[[class]] Hund {
    [[constructor]](navn) {
        this.navn = navn;
    }

    goe() {
        console.log([[this]].navn + " siger vov");
    }
}

const h = new Hund("Fido");
h.goe();`,
        output: "Fido siger vov",
        fordi: "Klassen starter med `class`. Konstruktøren hedder altid `constructor`. Og inde i metoden skal der stå `this.` foran feltet." },
      { t: "laes", h: "Arv: extends og super",
        md: "Arv virker som i C# (modul 5). Ordene er bare andre:\n\n- `class Kunde : Person` hedder `class Kunde extends Person`.\n- `: base(navn)` hedder `super(navn)`. Det **skal** stå først i konstruktøren, før du bruger `this`.\n- `base.Info()` hedder `super.info()`.\n\nDer findes ingen `virtual` og `override`. En metode med samme navn i underklassen **erstatter** bare forælderens.",
        sprog: "js",
        kode: R`class Person {
    constructor(navn) {
        this.navn = navn;
    }

    info() {
        return "Navn: " + this.navn;
    }
}

class Kunde extends Person {
    constructor(navn, kundeNr) {
        super(navn);
        this.kundeNr = kundeNr;
    }

    info() {
        return super.info() + ", kunde nr. " + this.kundeNr;
    }
}

const k = new Kunde("Ole", 17);
console.log(k.info());
console.log(k instanceof Person);`,
        noter: [
          ["extends Person", "En Kunde **er en** Person og arver alt fra den."],
          ["super(navn);", "Kør Persons konstruktør, så `this.navn` bliver sat."],
          ["super.info()", "Kald Persons udgave af `info`, og byg videre på resultatet."],
          ["k instanceof Person", "`true`: en Kunde er også en Person. Som `k is Person` i C#."]
        ],
        output: "Navn: Ole, kunde nr. 17\ntrue" },
      { t: "forudsig", sprog: "js",
        q: "`Kat` har ingen konstruktør og ingen `praesenter`. Hvad skriver programmet?",
        kode: R`class Dyr {
    constructor(navn) {
        this.navn = navn;
    }
    lyd() {
        return "...";
    }
    praesenter() {
        console.log(this.navn + ": " + this.lyd());
    }
}

class Kat extends Dyr {
    lyd() {
        return "miav";
    }
}

const d = new Dyr("Dyret");
const k = new Kat("Mis");
d.praesenter();
k.praesenter();`,
        output: "Dyret: ...\nMis: miav",
        fordi: "Har en underklasse ingen konstruktør, bruges forælderens automatisk, så `Mis` bliver gemt i `navn`. `praesenter` er arvet. Inde i den kalder `this.lyd()` den udgave, der passer til **objektet**: Kat har sin egen `lyd`, så der står `miav`. Det er **polymorfi** — samme kald, forskellig opførsel." },
      { t: "fejl", sprog: "js",
        q: "Programmet går ned med en rød fejl i konsollen: *Must call super constructor in derived class before accessing 'this'*. Klik på den linje, hvor fejlen opstår.",
        kode: R`class Person {
    constructor(navn) {
        this.navn = navn;
    }
}

class Ansat extends Person {
    constructor(navn, loen) {
        this.loen = loen;
    }
}

const a = new Ansat("Kim", 30000);
console.log(a.navn);`,
        linje: 9,
        fordi: "En underklasse med sin egen konstruktør **skal** kalde `super(…)`, før den bruger `this`. Først bygges Person-delen af objektet, så Ansat-delen. Indsæt `super(navn);` som første linje i Ansats konstruktør. Det er samme regel som i C#, men dér kalder compileren `base()` for dig, hvis forælderen har en tom konstruktør.",
        rettet: R`class Person {
    constructor(navn) {
        this.navn = navn;
    }
}

class Ansat extends Person {
    constructor(navn, loen) {
        super(navn);
        this.loen = loen;
    }
}

const a = new Ansat("Kim", 30000);
console.log(a.navn);` },
      { t: "laes", h: "Indkapsling: # og get/set",
        md: "Indkapsling (modul 4): data skal beskyttes, så ingen kan sætte en alder til -5.\n\n- Et felt, hvis navn starter med **`#`**, er **privat**. Det kan kun bruges inde i klassen — som `private` i C#. Skriver man `p.#alder` udenfor, giver browseren en fejl.\n- **`get`** og **`set`** laver en property, præcis som `get`/`set` i C#. Udefra ligner den et almindeligt felt — **uden parenteser** — men der kører kode bagved, fx en kontrol.\n\nLæg mærke til, at konstruktøren skriver `this.alder = alder`. Det kalder **setteren**, så kontrollen også gælder, når objektet bliver lavet.",
        sprog: "js",
        kode: R`class Person {
    #alder = 0;

    constructor(navn, alder) {
        this.navn = navn;
        this.alder = alder;
    }

    get alder() {
        return this.#alder;
    }

    set alder(v) {
        if (v >= 0 && v <= 130) {
            this.#alder = v;
        }
    }
}

const p = new Person("Kurt", 40);
p.alder = -5;
console.log(p.alder);
p.alder = 41;
console.log(p.alder);`,
        noter: [
          ["#alder = 0;", "Erklærer det private felt. `#` er en del af navnet. Private felter skal erklæres øverst i klassen."],
          ["get alder()", "Kører, når nogen **læser** `p.alder`."],
          ["set alder(v)", "Kører, når nogen **skriver** `p.alder = …`. `v` er den nye værdi."],
          ["p.alder = -5;", "Setteren afviser -5, så alderen er stadig 40."]
        ],
        output: "40\n41",
        md2: "I ældre kode ser du tit `this._alder` med understregning. Det er kun en aftale om \"rør ikke\". `#` er det rigtige private felt, som sproget selv beskytter." },
      { t: "forudsig", sprog: "js",
        kode: R`class Vare {
    #pris = 0;

    constructor(navn, pris) {
        this.navn = navn;
        this.pris = pris;
    }

    get pris() {
        return this.#pris;
    }

    set pris(v) {
        if (v > 0) {
            this.#pris = v;
        }
    }

    get prisMedMoms() {
        return this.pris * 1.25;
    }
}

const v = new Vare("Kaffe", -10);
console.log(v.pris);
v.pris = 40;
console.log(v.prisMedMoms);`,
        output: "0\n50",
        fordi: "Konstruktøren sætter `this.pris = -10`, og det går gennem **setteren**, som afviser tal, der ikke er over 0. `#pris` er stadig 0. Bagefter sættes 40, som bliver godtaget. `prisMedMoms` er en getter **uden** setter, der beregner 40 · 1.25 = 50. Den kaldes uden parenteser." },
      { t: "spor", sprog: "js", slut: false,
        q: "Setteren godtager kun temperaturer fra -50 til 60. Skriv værdien af `t.grader` efter hver af linjerne 12–15.",
        kode: R`class Termometer {
    #grader = 20;
    get grader() {
        return this.#grader;
    }
    set grader(v) {
        if (v >= -50 && v <= 60) {
            this.#grader = v;
        }
    }
}
const t = new Termometer();
t.grader = 25;
t.grader = 99;
t.grader = t.grader - 30;`,
        kolonner: ["t.grader"],
        raekker: [[12, "=20"], [13, "25"], [14, "25"], [15, "-5"]],
        fordi: "Et nyt termometer starter på 20. 25 godtages. 99 er over 60 og bliver afvist i stilhed, så værdien er stadig 25. I linje 15 læses først 25 (getteren), så sættes 25 - 30 = -5, som godtages. En setter, der afviser i stilhed, kan være svær at fejlfinde — sæt et breakpoint i setteren, og se `v` under **Scope**." },
      { t: "laes", h: "static: hører til klassen",
        md: "`static` betyder det samme som i C#: feltet eller metoden hører til **klassen**, ikke til det enkelte objekt. Du bruger den med klassens navn: `Vare.antal`, `Vare.moms(100)`.\n\nEt typisk eksempel er en tæller, der holder styr på, hvor mange objekter der er lavet, eller en hjælpemetode, der ikke har brug for et objekt.",
        sprog: "js",
        kode: R`class Vare {
    static antal = 0;

    constructor(navn) {
        this.navn = navn;
        Vare.antal++;
    }

    static moms(pris) {
        return pris * 0.25;
    }
}

new Vare("Kaffe");
new Vare("Te");
console.log(Vare.antal);
console.log(Vare.moms(100));`,
        noter: [
          ["static antal = 0;", "Ét fælles tal for hele klassen."],
          ["Vare.antal++;", "Hver konstruktør tæller det fælles tal op. Bemærk: `Vare.`, ikke `this.`."],
          ["static moms(pris)", "En metode, der kaldes på klassen: `Vare.moms(100)`."]
        ],
        output: "2\n25" },
      { t: "valg", q: "Klassen `Vare` har metoden `static moms(pris)`. Hvad sker der ved `const v = new Vare(\"Te\"); v.moms(100);`?",
        svar: ["Programmet stopper med en fejl: `v.moms is not a function`", "Det giver 25, ligesom `Vare.moms(100)`", "Det giver `undefined`", "Det giver 0, fordi objektet ikke har nogen pris"],
        ret: 0, fordi: "En statisk metode findes kun på klassen, ikke på objekterne. `v.moms` er derfor `undefined`, og man kan ikke kalde `undefined` som en funktion. Underviseren viser fejlen med F12: den står med rødt i konsollen. Kald den i stedet med `Vare.moms(100)`." },
      { t: "skriv", sprog: "js",
        q: "Skriv en klasse `Vare` med en `constructor(navn, pris)`, der sætter `this.navn` og derefter `this.pris`, og en metode `medMoms()`, der returnerer `this.pris * 1.25`. Lav derefter `const v = new Vare(\"Te\", 40);`, og skriv `v.medMoms()` ud med `console.log`.",
        tjek: [
          [/class Vare\{/, "Start klassen: `class Vare {`"],
          [/constructor\(navn,pris\)\{this\.navn=navn;this\.pris=pris;\}/, "Konstruktøren sætter begge felter: `constructor(navn, pris) { this.navn = navn; this.pris = pris; }`"],
          [/medMoms\(\)\{return (this\.pris\*1\.25|1\.25\*this\.pris);?\}/, "Metoden returnerer prisen med moms: `medMoms() { return this.pris * 1.25; }`"],
          ["function", "I en klasse skrives metoder uden ordet `function`", "ikke"],
          [/const v=new Vare\(("Te"|'Te'),40\);console\.log\(v\.medMoms\(\)\);/, "Lav objektet, og skriv resultatet ud: `console.log(v.medMoms());`"]
        ],
        forkert: [
          "class Vare {\n    constructor(navn, pris) {\n        this.navn = navn;\n        this.pris = pris;\n    }\n    function medMoms() {\n        return this.pris * 1.25;\n    }\n}\nconst v = new Vare(\"Te\", 40);\nconsole.log(v.medMoms());",
          "class Vare {\n    constructor(navn, pris) {\n        this.navn = navn;\n        this.pris = pris;\n    }\n    medMoms() {\n        return pris * 1.25;\n    }\n}\nconst v = new Vare(\"Te\", 40);\nconsole.log(v.medMoms());"
        ],
        loesning: R`class Vare {
    constructor(navn, pris) {
        this.navn = navn;
        this.pris = pris;
    }

    medMoms() {
        return this.pris * 1.25;
    }
}

const v = new Vare("Te", 40);
console.log(v.medMoms());`,
        output: "50" },
      { t: "ide", h: "Konto og opsparing",
        md: "Lav en ny fil `konto.js` i mappen `OojsOevelser`, og skift `src` i `index.html` til den. Skriv klasserne **selv**. `Opsparing` arver fra `Konto` og får en metode, der lægger rente til.",
        sprog: "js",
        kode: R`class Konto {
    #saldo = 0;

    constructor(ejer) {
        this.ejer = ejer;
    }

    get saldo() {
        return this.#saldo;
    }

    indsaet(beloeb) {
        if (beloeb > 0) {
            this.#saldo += beloeb;
        }
    }

    haev(beloeb) {
        if (beloeb > this.#saldo) {
            return false;
        }
        this.#saldo -= beloeb;
        return true;
    }
}

class Opsparing extends Konto {
    constructor(ejer, rente) {
        super(ejer);
        this.rente = rente;
    }

    tilskrivRente() {
        this.indsaet(this.saldo * this.rente / 100);
    }
}

const o = new Opsparing("Peter", 2);
o.indsaet(1000);
console.log(o.haev(5000));
o.tilskrivRente();
console.log(o.ejer + ": " + o.saldo);
o.saldo = 1000000;
console.log(o.saldo);`,
        output: "false\nPeter: 1020\n1020",
        md2: "Læg mærke til to ting. `Opsparing` kan ikke røre `#saldo` direkte — den er privat for `Konto` — så den bruger `indsaet` og getteren `saldo`. Og `o.saldo = 1000000` gør **ingenting**, fordi der kun er en getter: saldoen kan kun ændres gennem metoderne. Prøv at skrive `console.log(o.#saldo);` nederst, og læs den røde fejl i konsollen." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvordan ligner en klasse i JavaScript en klasse i C#, og hvad er forskellene?",
        svar: "Begge har en **konstruktør**, metoder, arv og `static`. I JavaScript hedder konstruktøren altid `constructor`, arv skrives med **`extends`**, og forælderen kaldes med **`super`** i stedet for `base`. Der er **ingen typer** og ingen `public`; felter laves med `this.` i konstruktøren, og man skal altid skrive `this.` inde i klassen. Private felter skrives med **`#`**, og properties laves med `get` og `set`. Bag kulisserne er en JavaScript-klasse en constructor function med metoderne i prototypen.",
        noegle: ["constructor", "extends", "super", "ingen typer", "#", "prototype"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m15l3", titel: "Closures, this-fælder og moduler", min: 18,
    ord: [
      ["Scope (virkefelt)", "Den del af koden, hvor en variabel kan ses. En `let` eller `const` gælder kun inde i de tuborgklammer, den er lavet i."],
      ["Closure", "En funktion, der husker de variabler, der fandtes, hvor den blev lavet — også når den ydre funktion er færdig."],
      ["this (regel)", "I en almindelig funktion bestemmes `this` af, **hvordan** funktionen kaldes. En arrow function har intet eget `this`; den bruger `this` fra koden udenom."],
      ["e.target", "Det element, en event skete på — fx den knap, der blev klikket på. Virker i både arrow functions og almindelige funktioner."],
      ["Modul (JavaScript)", "En JavaScript-fil med sit eget scope, der selv bestemmer, hvad andre filer må bruge (`export`), og selv henter det, den skal bruge (`import`)."],
      ["export", "Gør en funktion, klasse eller konstant i et modul tilgængelig for andre filer — lidt som `public`."],
      ["import", "Henter det, et andet modul har eksporteret: `import { laegSammen } from \"./matematik.js\";`"]
    ],
    trin: [
      { t: "laes", h: "Closure: en funktion, der husker",
        md: "En funktion kan se de variabler, der står **udenom** den. Det brugte du i modul 14: `let antal = 0;` stod uden for klik-funktionen, så tallet blev husket mellem klikkene.\n\nDet virker også, når den ydre funktion **er færdig**. Her laver `lavTaeller` en variabel `antal` og giver en lille funktion tilbage. `lavTaeller` er færdig efter første linje under den, men den lille funktion bruger stadig `antal` — så JavaScript holder `antal` i live. En funktion plus de variabler, den husker, hedder en **closure**.",
        sprog: "js",
        kode: R`function lavTaeller() {
    let antal = 0;
    return () => {
        antal++;
        return antal;
    };
}

const taeller = lavTaeller();
console.log(taeller());
console.log(taeller());
console.log(taeller());`,
        noter: [
          ["let antal = 0;", "En lokal variabel i `lavTaeller`."],
          ["return () => { … }", "Giv en funktion tilbage. Den bruger `antal` fra funktionen udenom."],
          ["const taeller = lavTaeller();", "`taeller` er nu den lille funktion — med sit eget `antal`, der huskes."],
          ["Privat data", "Ingen anden kode kan nå `antal`. Kun den lille funktion kan ændre det. Det er en anden måde at lave indkapsling på."]
        ],
        output: "1\n2\n3" },
      { t: "forudsig", sprog: "js",
        q: "To tællere lavet med den samme funktion. Hvad skriver programmet?",
        kode: R`function lavTaeller() {
    let antal = 0;
    return () => {
        antal++;
        return antal;
    };
}

const a = lavTaeller();
const b = lavTaeller();
a();
a();
console.log(a());
console.log(b());`,
        output: "3\n1",
        fordi: "Hvert kald til `lavTaeller` laver et **nyt** `antal`. `a` husker sit eget, og `b` husker sit eget. `a` kaldes tre gange i alt: 3. `b` kaldes kun én gang: 1. Samme princip som to objekter af samme klasse, der har hver sine felter." },
      { t: "spor", sprog: "js", slut: false,
        q: "`saldo` kan ikke ses udenfor, men den bliver husket af funktionen `ind`. Skriv `x` og `y` efter hver af linjerne 8–11.",
        kode: R`function lavKonto(start) {
    let saldo = start;
    return beloeb => {
        saldo += beloeb;
        return saldo;
    };
}
const ind = lavKonto(100);
let x = ind(50);
let y = ind(-30);
x = x + y;`,
        kolonner: ["x", "y"],
        raekker: [[8, "=–", "=–"], [9, "150", "–"], [10, "150", "120"], [11, "270", "120"]],
        fordi: "Linje 8 laver kontoen med `saldo` = 100, men `x` og `y` findes ikke endnu. Linje 9: 100 + 50 = 150. Linje 10: closuren husker 150, så 150 - 30 = 120. Linje 11 lægger bare de to tal sammen: 270. `saldo` er stadig 120 — den ændres kun gennem `ind`." },
      { t: "laes", h: "this i en callback: brug en arrow function",
        md: "`this` i en **almindelig** funktion bestemmes af, **hvordan** funktionen bliver kaldt — ikke af, hvor den står. Kaldes den som `objekt.metode()`, er `this` objektet. Kaldes den af noget andet, fx `forEach`, er `this` noget andet.\n\nEn **arrow function** har **intet eget `this`**. Den bruger `this` fra koden udenom. Derfor er arrow functions det sikre valg, når du skriver en callback inde i en metode.",
        sprog: "js",
        kode: R`class Hold {
    constructor(navn, spillere) {
        this.navn = navn;
        this.spillere = spillere;
    }

    vis() {
        this.spillere.forEach(s => {
            console.log(s + " spiller for " + this.navn);
        });
    }
}

new Hold("AGF", ["Ida", "Bo"]).vis();`,
        noter: [
          ["vis()", "Kaldes på holdet, så her er `this` holdet."],
          ["s => { … }", "Arrow function: `this` inde i den er det samme `this` som i `vis` — holdet."],
          ["this.navn", "Giver \"AGF\"."]
        ],
        output: "Ida spiller for AGF\nBo spiller for AGF" },
      { t: "fejl", sprog: "js",
        q: "Samme klasse, men callbacken er skrevet som en almindelig funktion. Programmet går ned med *Cannot read properties of undefined (reading 'navn')*. Klik på den linje, der skal rettes.",
        kode: R`class Hold {
    constructor(navn, spillere) {
        this.navn = navn;
        this.spillere = spillere;
    }

    vis() {
        this.spillere.forEach(function (s) {
            console.log(s + " spiller for " + this.navn);
        });
    }
}

new Hold("AGF", ["Ida", "Bo"]).vis();`,
        linje: 8,
        fordi: "`forEach` kalder den almindelige funktion uden et objekt foran, så `this` er `undefined` inde i den — og `undefined.navn` giver fejlen. Konsollen peger på linje 9, hvor `this.navn` står, men **årsagen** er linje 8: skriv callbacken som en arrow function, `s => {`, så bruger den holdets `this`.",
        rettet: R`class Hold {
    constructor(navn, spillere) {
        this.navn = navn;
        this.spillere = spillere;
    }

    vis() {
        this.spillere.forEach(s => {
            console.log(s + " spiller for " + this.navn);
        });
    }
}

new Hold("AGF", ["Ida", "Bo"]).vis();` },
      { t: "laes", h: "this i events: brug e.target",
        md: "Ved events er det omvendt. Med en **almindelig** funktion i `addEventListener` sætter browseren `this` til **elementet**. Med en **arrow function** er `this` ikke elementet.\n\nDen sikre vej, som virker i begge: brug **event-objektet** `e` og dets property **`e.target`**, der er det element, eventen skete på.",
        sprog: "html",
        kode: R`<input id="navn" value="Skriv dit navn">

<script>
    const felt = document.getElementById("navn");

    felt.addEventListener("focus", function () {
        this.value = "";
    });

    felt.addEventListener("blur", e => {
        e.target.style.background = "lightyellow";
    });
</script>`,
        noter: [
          ["\"focus\"", "Eventen, når man klikker ned i feltet."],
          ["function () { this.value = \"\"; }", "Almindelig funktion: `this` er feltet, så teksten fjernes."],
          ["\"blur\"", "Eventen, når man forlader feltet igen."],
          ["e => { e.target… }", "Arrow function: brug `e.target` for at få fat i feltet."]
        ],
        md2: "Den samme fælde rammer metoder: `knap.addEventListener(\"click\", t.op)` sender metoden af sted **uden** objektet. Når der klikkes, er `this` knappen, ikke `t`. Skriv i stedet `knap.addEventListener(\"click\", () => t.op())` — så kaldes metoden på `t`." },
      { t: "valg", q: "Klassen `Taeller` har metoden `op() { this.antal++; }`. Du skriver `knap.addEventListener(\"click\", t.op);`. Efter et klik er `t.antal` uændret. Hvorfor?",
        svar: ["Metoden bliver kaldt med `this` = knappen, så det er knappen, der får `antal` lagt til — ikke `t`", "`addEventListener` kan ikke bruges med metoder fra klasser", "Klikket kalder slet ikke metoden, fordi der mangler parenteser", "`this` i en klasse peger altid på hele vinduet"],
        ret: 0, fordi: "`t.op` uden parenteser er bare funktionen — objektet `t` følger ikke med. Når browseren kalder den, sætter den `this` til knappen. `this.antal++` laver så `antal` om på knappen (til `NaN`), og `t.antal` røres ikke. Løsningen er `() => t.op()`." },
      { t: "udfyld", sprog: "js",
        q: "Listen har id `liste`. Når der klikkes på et punkt i listen, skal punktets tekst skrives i konsollen. Brug event-objektet, som her hedder `e`.",
        kode: R`document.getElementById("liste").addEventListener("click", e => {
    console.log([[e]].[[target]].textContent);
});`,
        fordi: "Funktionen får event-objektet som parameter. `e.target` er det element, der faktisk blev klikket på — her det ene `li`, selvom lytteren sidder på hele listen." },
      { t: "laes", h: "Moduler: export og import",
        md: "Når et projekt vokser, deler man koden i flere filer. Gamle `<script>`-filer deler **ét** fælles scope: en variabel i én fil kan ved et uheld overskrive en med samme navn i en anden.\n\nEt **modul** er en fil med sit **eget** scope. Den bestemmer selv, hvad andre må bruge, med `export`. Andre filer henter det med `import`. Det svarer til, at en C#-klasse kun viser det, der er `public`.\n\nEn side bruger moduler med `<script type=\"module\" src=\"main.js\"></script>`.",
        sprog: "js",
        kode: R`// Filen matematik.js
export function laegSammen(a, b) {
    return a + b;
}

export const MOMS = 0.25;

// Filen main.js
import { laegSammen, MOMS } from "./matematik.js";

console.log(laegSammen(2, 3));
console.log(100 * MOMS);`,
        noter: [
          ["export function …", "Andre filer må bruge `laegSammen`. Alt uden `export` er privat for filen."],
          ["import { … } from \"./matematik.js\";", "Hent de to navne. `./` betyder \"i samme mappe\". Husk `.js`."],
          ["type=\"module\"", "Siger til browseren, at filen er et modul. Uden den giver `import` en fejl."]
        ],
        md2: "**Vigtigt:** åbner du siden ved at dobbeltklikke på filen, nægter Chrome og Edge at hente moduler og skriver en rød fejl med ordet **CORS** i konsollen. Moduler skal hentes fra en **webserver** — fx din ASP.NET-app, hvor filerne ligger i `wwwroot`. Derfor bruger øvelserne i dette modul almindelige `<script>`-filer." },
      { t: "valg", q: "Du dobbeltklikker på `index.html`, der har `<script type=\"module\" src=\"main.js\"></script>`. Konsollen viser en rød fejl, der nævner CORS. Hvad er årsagen?",
        svar: ["Browseren henter kun moduler fra en webserver, ikke fra en fil, der er åbnet direkte", "Der er en stavefejl i `main.js`", "`import` virker kun i Node, ikke i browseren", "Moduler må kun bruges sammen med jQuery"],
        ret: 0, fordi: "Sikkerhedsreglerne i browseren behandler en side åbnet fra disken særligt strengt, og moduler skal hentes over http. Koden er sikkert fin. Lægger du filerne i `wwwroot` i et ASP.NET-projekt og kører det, virker det." },
      { t: "udfyld", sprog: "js",
        q: "Gør det muligt for `main.js` at bruge funktionen `medMoms` fra `moms.js`.",
        kode: R`// Filen moms.js
[[export]] function medMoms(pris) {
    return pris * 1.25;
}

// Filen main.js
[[import]] { medMoms } [[from]] "./moms.js";
console.log(medMoms(80));`,
        fordi: "`export` i den fil, der har funktionen. `import { … } from \"…\"` i den fil, der skal bruge den. Kørt fra en webserver skriver `main.js` 100 i konsollen." },
      { t: "skriv", sprog: "js",
        q: "Skriv en funktion `lavGanger` med parameteren `faktor`, der returnerer en arrow function, som tager `x` og returnerer `x * faktor`. Lav derefter `const dobbelt = lavGanger(2);`, og skriv `dobbelt(21)` ud med `console.log`.",
        tjek: [
          [/function lavGanger\(faktor\)\{/, "Lav funktionen: `function lavGanger(faktor) {`"],
          [/return ?\(?x\)?=>(x\*faktor|faktor\*x);?\}/, "Returnér en arrow function: `return x => x * faktor;`"],
          [/const dobbelt=lavGanger\(2\);/, "Lav dobbelt: `const dobbelt = lavGanger(2);`"],
          [/console\.log\(dobbelt\(21\)\);/, "Skriv resultatet ud: `console.log(dobbelt(21));`"]
        ],
        forkert: ["function lavGanger(faktor) {\n    return x * faktor;\n}\nconst dobbelt = lavGanger(2);\nconsole.log(dobbelt(21));"],
        loesning: R`function lavGanger(faktor) {
    return x => x * faktor;
}

const dobbelt = lavGanger(2);
console.log(dobbelt(21));`,
        output: "42",
        fordi: "`dobbelt` er en closure: den husker `faktor` = 2. `lavGanger(10)` ville give en funktion, der husker 10." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er en closure? Og hvorfor bruger man tit en arrow function som callback inde i en metode?",
        svar: "En **closure** er en funktion, der **husker** de variabler, der fandtes, hvor den blev lavet — også efter den ydre funktion er færdig. Det kan bruges til private data, fx en tæller, som kun funktionen kan ændre. I en almindelig funktion afhænger **`this`** af, hvordan den kaldes, så en callback, som `forEach` kalder, mister objektet. En **arrow function** har intet eget `this` og bruger `this` fra metoden udenom, så den virker. Ved events bruger man `e.target` for at få fat i elementet.",
        noegle: ["husker", "variabler", "this", "arrow function", "e.target"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m15l4", titel: "Asynkron JavaScript: callbacks, Promises og async/await", min: 20,
    ord: [
      ["Asynkron", "Noget, der bliver færdigt senere. Programmet venter ikke på det, men kører videre og får besked, når det er klar."],
      ["Callback-helvede", "Callbacks inde i callbacks inde i callbacks. Koden glider mod højre og bliver svær at læse og fejlfinde."],
      ["Promise", "Et objekt, der lover en værdi senere. Det er enten ventende, opfyldt (med en værdi) eller afvist (med en fejl). Svarer til `Task<T>` i C#."],
      ["resolve / reject", "De to funktioner, en Promise får: `resolve(værdi)` melder \"færdig\", `reject(fejl)` melder \"gik galt\"."],
      ["then / catch", "`.then(v => …)` kører, når en Promise er opfyldt. `.catch(f => …)` kører, når den er afvist."],
      ["async", "Skrives foran en funktion. Så må den bruge `await`, og den giver altid en Promise tilbage."],
      ["await", "Venter på en Promise og giver dens værdi. Kun funktionen selv holder pause — siden kører videre."]
    ],
    trin: [
      { t: "laes", h: "At vente uden at fryse",
        md: "JavaScript i browseren kører på **én tråd**. Venter koden på en server, må siden ikke fryse. Derfor er alt, der tager tid, **asynkront**: koden kører videre, og du får besked bagefter. Det kender du fra modul 8, hvor C# brugte `Task` og `await`.\n\nI modul 14 fik du beskeden via en **callback** — fx i `setTimeout`. Det virker, men når tre ting skal ske **efter hinanden**, ender callbacks inde i hinanden. Det kaldes **callback-helvede**.",
        sprog: "js",
        kode: R`console.log("Bestil");

setTimeout(() => {
    console.log("Kaffe klar");
    setTimeout(() => {
        console.log("Kage klar");
        setTimeout(() => {
            console.log("Regning klar");
        }, 100);
    }, 100);
}, 100);

console.log("Venter");`,
        noter: [
          ["setTimeout(() => { … }, 100)", "\"Kør dette om 100 millisekunder.\" Programmet venter ikke."],
          ["Indrykningen", "Hvert trin står inde i det forrige. Med fem trin og fejlhåndtering bliver det ulæseligt."],
          ["console.log(\"Venter\")", "Kører med det samme, før kaffen er klar."]
        ],
        output: "Bestil\nVenter\nKaffe klar\nKage klar\nRegning klar",
        md2: "Løsningen er **Promises** og bagefter **async/await**, som får koden til at læses oppefra og ned igen." },
      { t: "forudsig", sprog: "js",
        q: "Callbacks i callbacks. Hvad skriver programmet, og i hvilken rækkefølge?",
        kode: R`console.log("1");
setTimeout(() => {
    console.log("2");
    setTimeout(() => console.log("3"), 0);
    console.log("4");
}, 50);
setTimeout(() => console.log("5"), 10);
console.log("6");`,
        output: "1\n6\n5\n2\n4\n3",
        fordi: "Først de almindelige linjer: 1 og 6. Efter 10 ms: 5. Efter 50 ms kører den store callback: 2, så lægges en ny timer ind (den venter, selvom der står 0), og 4. Til sidst 3." },
      { t: "laes", h: "Promise: et løfte om en værdi",
        md: "En **Promise** er et objekt, der **lover** en værdi senere — samme idé som `Task<T>` i C#. Den er i én af tre tilstande: **ventende**, **opfyldt** (med en værdi) eller **afvist** (med en fejl).\n\nDen, der laver en Promise, får to funktioner: `resolve(værdi)` melder \"færdig\", og `reject(fejl)` melder \"det gik galt\". Den, der **bruger** en Promise, skriver `.then(…)` til det gode udfald og `.catch(…)` til fejlen.",
        sprog: "js",
        kode: R`function hentPris() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(45), 100);
    });
}

console.log("Start");
hentPris().then(pris => {
    console.log("Pris: " + pris);
});
console.log("Slut");`,
        noter: [
          ["new Promise((resolve, reject) => { … })", "Lav løftet. Koden indeni starter arbejdet."],
          ["resolve(45)", "Om 100 ms bliver løftet opfyldt med værdien 45."],
          ["hentPris().then(pris => …)", "\"Når prisen kommer, så kør denne funktion med den.\""],
          ["reject(\"…\")", "Bruges ikke her. Kaldes den, springes `then` over, og `.catch(f => …)` kører i stedet."]
        ],
        output: "Start\nSlut\nPris: 45",
        md2: "`then` giver ikke prisen med det samme — den lægger en callback ind, ligesom `setTimeout`. Men en Promise kan gives videre, returneres og sættes i kæde, så koden ikke behøver glide mod højre." },
      { t: "forudsig", sprog: "js",
        q: "`then` kan sættes i kæde. Returnerer en `then` en ny Promise, venter den næste `then` på den. Hvad skriver programmet?",
        kode: R`function dobbeltSenere(x) {
    return new Promise(resolve => {
        setTimeout(() => resolve(x * 2), 50);
    });
}

dobbeltSenere(5)
    .then(a => {
        console.log(a);
        return dobbeltSenere(a);
    })
    .then(b => console.log(b));

console.log("Først");`,
        output: "Først\n10\n20",
        fordi: "`Først` skrives med det samme. Efter 50 ms er 5 · 2 = 10 klar, og første `then` skriver 10 og starter en ny beregning. Anden `then` venter på den: 10 · 2 = 20. Kæden læses oppefra og ned — ingen callbacks i callbacks." },
      { t: "forudsig", sprog: "js",
        q: "`hentVare` afviser løftet, hvis varen ikke findes. Begge kald starter på samme tid, og vare 1 bliver færdig først. Hvad skriver programmet?",
        kode: R`function hentVare(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === 1) {
                resolve("Kaffe");
            } else {
                reject("Varen findes ikke");
            }
        }, 50);
    });
}

hentVare(1).then(v => console.log(v)).catch(f => console.log("Fejl: " + f));
hentVare(7).then(v => console.log(v)).catch(f => console.log("Fejl: " + f));`,
        output: "Kaffe\nFejl: Varen findes ikke",
        fordi: "Vare 1 bliver opfyldt med `\"Kaffe\"`, så `then` kører, og `catch` springes over. Vare 7 bliver afvist, så `then` springes over, og `catch` får fejlteksten. Det svarer til `try`/`catch` i C#, bare for noget, der sker senere." },
      { t: "laes", h: "async og await: læs oppefra og ned",
        md: "`async`/`await` fungerer præcis som i C# (modul 8). Skriv `async` foran funktionen, og `await` foran en Promise. Så **holder funktionen pause**, indtil værdien er klar — men resten af siden kører videre, så intet fryser.\n\nTre regler:\n\n- `await` må kun stå i en funktion med `async` foran.\n- En `async`-funktion giver **altid en Promise** tilbage.\n- En afvist Promise fanges med almindelig `try`/`catch`.\n\nFunktionen `vent` herunder er et lille trick, du kan genbruge: en Promise, der bliver opfyldt efter et antal millisekunder.",
        sprog: "js",
        kode: R`function vent(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function morgen() {
    console.log("Sæt vand over");
    await vent(100);
    console.log("Vandet koger");
    await vent(100);
    console.log("Kaffen er klar");
}

morgen();
console.log("Imens: læs avisen");`,
        noter: [
          ["async function morgen()", "Funktionen må bruge `await`."],
          ["await vent(100);", "Hold pause i `morgen`, indtil der er gået 100 ms. Imens kører resten af programmet."],
          ["morgen();", "Starter funktionen. Den kører til første `await` og giver så kontrollen tilbage."],
          ["\"Imens: læs avisen\"", "Kommer som nummer to, fordi `morgen` holder pause."]
        ],
        output: "Sæt vand over\nImens: læs avisen\nVandet koger\nKaffen er klar" },
      { t: "forudsig", sprog: "js",
        kode: R`function vent(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function hentTal() {
    await vent(50);
    return 7;
}

async function main() {
    console.log("A");
    const t = await hentTal();
    console.log("B " + t);
}

main();
console.log("C");`,
        output: "A\nC\nB 7",
        fordi: "`main` skriver A og holder så pause ved `await`. Imens skrives C. Efter 50 ms giver `hentTal` 7 tilbage, `main` fortsætter og skriver `B 7`. `return 7` i en `async`-funktion opfylder dens Promise med 7, og `await` pakker værdien ud." },
      { t: "orden", sprog: "js",
        q: "`hentVare(id)` giver en Promise, der kan blive afvist. Sæt linjerne i rækkefølge, så funktionen skriver varens navn — eller `Fejl:` og fejlteksten, hvis det går galt.",
        linjer: [
          R`async function visVare(id) {`,
          R`    try {`,
          R`        const navn = await hentVare(id);`,
          R`        console.log(navn);`,
          R`    } catch (fejl) {`,
          R`        console.log("Fejl: " + fejl);`,
          R`    }`,
          R`}`
        ],
        fordi: "`try` omkring det, der kan gå galt. `await` venter på varen. Bliver løftet afvist, hopper koden direkte til `catch`. I JavaScript skrives der ingen type i `catch (fejl)`." },
      { t: "fejl", logisk: true, sprog: "js",
        q: "Programmet skal skrive `8`. Det skriver `[object Promise]1`. Hvilken linje er forkert?",
        kode: R`function vent(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function hentTal() {
    await vent(50);
    return 7;
}

async function main() {
    const t = hentTal();
    console.log(t + 1);
}

main();`,
        linje: 11,
        output: "[object Promise]1",
        fordi: "Der mangler `await`. En `async`-funktion giver **altid** en Promise tilbage, så `t` er løftet, ikke tallet 7. `+` med et objekt laver det om til teksten `[object Promise]` og sætter `1` bag på. Med `const t = await hentTal();` venter `main` på værdien.",
        rettet: R`function vent(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function hentTal() {
    await vent(50);
    return 7;
}

async function main() {
    const t = await hentTal();
    console.log(t + 1);
}

main();`,
        rettetOutput: "8" },
      { t: "udfyld", sprog: "js",
        q: "Tæl ned fra 3 med 100 ms imellem, og skriv så `Start!`.",
        kode: R`function vent(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

[[async]] function nedtaelling() {
    for (let i = 3; i > 0; i--) {
        console.log(i);
        [[await]] vent(100);
    }
    console.log("Start!");
}

nedtaelling();`,
        output: "3\n2\n1\nStart!",
        fordi: "`await` inde i en løkke venter ved hver omgang. Sammenlign med `setInterval` i modul 14: her står hele nedtællingen som en almindelig `for`-løkke." },
      { t: "valg", q: "Hvad sker der i browseren, mens en `async`-funktion står ved `await fetch(…)` og venter på serveren?",
        svar: ["Kun den funktion holder pause. Siden reagerer stadig på klik og scroll", "Hele siden fryser, indtil svaret kommer", "Funktionen springer `await` over og kører videre med `undefined`", "Browseren starter en ny tråd til resten af siden"],
        ret: 0, fordi: "`await` lægger resten af funktionen til side og giver kontrollen tilbage. Den ene tråd er fri til at tage sig af klik og tegning. Når svaret kommer, fortsætter funktionen, hvor den slap. Samme idé som tjeneren på restauranten i modul 8." },
      { t: "skriv", sprog: "js",
        q: "`hentPris()` giver en Promise med en pris. Skriv en `async`-funktion `visPris` uden parametre, der henter prisen med `await` i en `const pris` og skriver `\"Pris: \" + pris` med `console.log`. Kald `visPris();` til sidst. Brug ikke `then`.",
        foer: R`function hentPris() {
    return new Promise(resolve => setTimeout(() => resolve(45), 100));
}`,
        tjek: [
          [/async function visPris\(\)\{/, "Lav funktionen med `async`: `async function visPris() {`"],
          [/const pris=await hentPris\(\);/, "Vent på prisen: `const pris = await hentPris();`"],
          [/console\.log\(("Pris: "|'Pris: ')\+pris\);/, "Skriv den ud: `console.log(\"Pris: \" + pris);`"],
          [/\}visPris\(\);/, "Kald funktionen til sidst: `visPris();`"],
          [".then(", "Brug `await`, ikke `then`", "ikke"]
        ],
        forkert: ["async function visPris() {\n    const pris = hentPris();\n    console.log(\"Pris: \" + pris);\n}\nvisPris();", "function visPris() {\n    hentPris().then(pris => console.log(\"Pris: \" + pris));\n}\nvisPris();"],
        loesning: R`async function visPris() {
    const pris = await hentPris();
    console.log("Pris: " + pris);
}

visPris();`,
        output: "Pris: 45" },
      { t: "ide", h: "En knap, der venter",
        md: "Lav `vent.html` i mappen `OojsOevelser`. Når man klikker **Hent**, skal siden skrive `Henter …`, vente 2 sekunder og så skrive `Færdig!`. Knappen er slået fra, mens der ventes. Skriv det **selv**.",
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Vent</title>
</head>
<body>
    <button id="hent">Hent</button>
    <p id="status"></p>

    <script>
        function vent(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        const knap = document.getElementById("hent");
        const status = document.getElementById("status");

        knap.addEventListener("click", async () => {
            knap.disabled = true;
            status.textContent = "Henter …";
            await vent(2000);
            status.textContent = "Færdig!";
            knap.disabled = false;
        });
    </script>
</body>
</html>`,
        md2: "Læg mærke til `async () => { … }`: også en arrow function kan være `async`. `disabled = true` gør knappen grå, så man ikke kan starte to gange. Sæt et breakpoint på `status.textContent = \"Færdig!\"` i fanen **Sources**, og klik: debuggeren stopper først efter de 2 sekunder. Prøv at markere tekst på siden, mens der ventes — siden fryser ikke." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på callbacks, Promises og async/await?",
        svar: "Alle tre løser det samme: at vente på noget **asynkront** uden at siden fryser. Med **callbacks** giver man en funktion, der kaldes senere; flere trin efter hinanden ender i callback-helvede. En **Promise** er et objekt, der lover en værdi senere; man skriver `then` til resultatet og `catch` til fejl og kan sætte dem i kæde. **async/await** bygger oven på Promises: `await` holder pause i funktionen, til værdien er klar, så koden læses oppefra og ned, og fejl fanges med `try`/`catch` — som `Task` og `await` i C#.",
        noegle: ["asynkront", "callback", "Promise", "then", "await", "try/catch"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m15l5", titel: "fetch: hent og send data til en Web API", min: 20,
    ord: [
      ["AJAX", "At hente eller sende data i baggrunden og opdatere en del af siden — uden at hele siden bliver hentet igen."],
      ["fetch", "Browserens funktion til at sende en HTTP-forespørgsel. Giver en Promise med serverens svar."],
      ["Web API", "Et program på en server, der svarer med data (typisk JSON) i stedet for HTML-sider. Du bygger din egen i modul 19."],
      ["GET / POST", "HTTP-metoder. GET henter data. POST sender nye data til serveren."],
      ["Statuskode", "Et tal i serverens svar: 200 = OK, 201 = oprettet, 404 = findes ikke, 500 = fejl på serveren."],
      ["response.ok", "`true`, når statuskoden er mellem 200 og 299. `fetch` giver ikke selv en fejl ved 404 — det skal du tjekke."],
      ["Content-Type", "En header, der fortæller, hvilken slags data der sendes. JSON er `application/json`."],
      ["SPA", "Single Page Application: én side, der aldrig genindlæses, men henter data med JavaScript og opdaterer sig selv."]
    ],
    trin: [
      { t: "laes", h: "AJAX: opdatér kun det, der ændrer sig",
        md: "Underviserens eksempel: du følger en fodboldkamp på en hjemmeside. Du vil have **stillingen** opdateret — ikke hele siden med menu, billeder og reklamer hentet forfra.\n\nDet hedder **AJAX**: JavaScript spørger serveren i baggrunden, får data tilbage og opdaterer kun den del af siden, der har brug for det. Forløbet er altid det samme:\n\n1. JavaScript sender en **forespørgsel** til en adresse (en URL).\n2. Serveren svarer med en **statuskode** og data, næsten altid som **JSON** (modul 14).\n3. JavaScript laver JSON'en om til objekter.\n4. JavaScript opdaterer **DOM'en** med de nye data.\n\nUnderviseren viser den gamle måde, `XMLHttpRequest`, med `readyState` og `onreadystatechange`. Den virker stadig, men i dag bruger man **`fetch`**, som giver en Promise — så du kan bruge `await`. Et program, der gør det hele tiden og aldrig genindlæser siden, kaldes en **SPA**." },
      { t: "laes", h: "fetch: hent data med GET",
        md: "Til øvelserne bruger du **JSONPlaceholder**, en gratis testserver på internettet med opdigtede data. Den svarer præcis som en rigtig Web API. I modul 19 laver du din egen.\n\n`fetch` skal bruge **to** `await`: først kommer svaret (statuskode og headers), og bagefter skal selve indholdet læses og laves om fra JSON med `svar.json()`.",
        sprog: "js",
        kode: R`async function hentBruger() {
    const svar = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const bruger = await svar.json();
    console.log(bruger.name);
    console.log(bruger.address.city);
}

hentBruger();`,
        noter: [
          ["fetch(\"https://…/users/1\")", "Send en GET-forespørgsel til adressen. Uden andet sender `fetch` altid GET."],
          ["const svar = await …", "Vent på svaret. `svar` har bl.a. `status` og `ok`."],
          ["await svar.json()", "Læs indholdet, og lav JSON-teksten om til et objekt. Det er også asynkront."],
          ["bruger.address.city", "Et objekt inde i et objekt — punktum to gange."]
        ],
        md2: "Kør det i en `.html`-fil, og konsollen viser `Leanne Graham` og `Gwenborough`. Skriv `console.log(bruger);` for at se hele objektet og folde det ud. Under fanen **Network** i udviklerværktøjet kan du se selve forespørgslen: klik på `1`, og se fanen **Response**." },
      { t: "valg", q: "Hvorfor står der `await` to gange: `await fetch(…)` og `await svar.json()`?",
        svar: ["Først kommer svarets status og headers. Indholdet læses bagefter, og det tager også tid", "Den første henter data, den anden sender dem tilbage til serveren", "Det andet `await` er kun med for en sikkerheds skyld og kan fjernes", "`fetch` henter altid data to gange"],
        ret: 0, fordi: "`fetch` er færdig, så snart serveren har svaret med status og headers. Selve indholdet kan stadig være på vej. `svar.json()` læser det hele og laver det om til et objekt — det giver også en Promise. Glemmer du det andet `await`, har du et løfte i stedet for data." },
      { t: "laes", h: "Når serveren siger nej: status og ok",
        md: "Svaret har en **statuskode**: 200 betyder OK, 404 betyder \"findes ikke\", og 500-tallene betyder fejl på serveren.\n\n**Pas på:** `fetch` giver **ikke** en fejl ved 404 eller 500. Serveren har jo svaret. Derfor skal du selv tjekke `svar.ok`, som er `true` ved 200–299. `fetch` giver kun en fejl (afviser sin Promise), hvis der slet ikke kommer noget svar — fx uden internet. Den fanges med `try`/`catch`.",
        sprog: "js",
        kode: R`async function hentBruger(id) {
    try {
        const svar = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
        if (!svar.ok) {
            console.log("Serveren svarede " + svar.status);
            return;
        }
        const bruger = await svar.json();
        console.log(bruger.name);
    } catch (fejl) {
        console.log("Ingen forbindelse til serveren");
    }
}

hentBruger(999);`,
        noter: [
          ["\"…/users/\" + id", "Byg adressen. Bruger 999 findes ikke."],
          ["if (!svar.ok)", "Ved 404 skrives `Serveren svarede 404`, og vi stopper, før vi prøver at læse data."],
          ["catch (fejl)", "Kun når der slet ikke kom et svar."]
        ],
        md2: "Det samme gælder din egen Web API i modul 19: `return NotFound();` i C# bliver til statuskode 404 i browseren." },
      { t: "forudsig", sprog: "js",
        q: "Her er `fetch` byttet ud med en lille **falsk** udgave, `falskFetch`, så programmet kan køre uden internet. Den svarer `ok` og 200 for vare 1 og 404 for alt andet. `Promise.resolve(x)` er en Promise, der allerede er opfyldt med `x`. Hvad skriver programmet?",
        kode: R`function falskFetch(url) {
    const findes = url === "/api/varer/1";
    return Promise.resolve({
        ok: findes,
        status: findes ? 200 : 404,
        json: () => Promise.resolve({ navn: "Kaffe", pris: 45 })
    });
}

async function vis(url) {
    const svar = await falskFetch(url);
    if (!svar.ok) {
        console.log("Fejl " + svar.status);
        return;
    }
    const vare = await svar.json();
    console.log(vare.navn + ": " + vare.pris + " kr.");
}

async function main() {
    await vis("/api/varer/1");
    await vis("/api/varer/9");
}

main();`,
        output: "Kaffe: 45 kr.\nFejl 404",
        fordi: "Vare 1 findes, så `ok` er true, og `json()` giver varen. Vare 9 findes ikke: `ok` er false, så der skrives `Fejl 404`, og `return` stopper, før `json()` bliver kaldt. `main` venter på den første, før den starter den anden, så rækkefølgen er fast." },
      { t: "orden", sprog: "js",
        q: "Sæt linjerne i rækkefølge, så funktionen henter alle varer fra `/api/varer` og skriver antallet i elementet med id `antal` — men stopper, hvis serveren ikke svarer OK.",
        linjer: [
          R`async function visAntal() {`,
          R`    const svar = await fetch("/api/varer");`,
          R`    if (!svar.ok) {`,
          R`        return;`,
          R`    }`,
          R`    const varer = await svar.json();`,
          R`    document.getElementById("antal").textContent = varer.length + " varer";`,
          R`}`
        ],
        fordi: "Hent svaret, tjek status, læs JSON, opdatér siden. Den rækkefølge går igen i al AJAX-kode. `svar.json()` skal komme **efter** tjekket — ved en fejl er der ingen varer at læse." },
      { t: "ide", h: "Vis en liste fra serveren",
        md: "Lav `opgaver.html` i mappen `OojsOevelser`. Når siden åbnes, henter den bruger 1's opgaver fra JSONPlaceholder og viser dem i en liste. Færdige opgaver får et ✓ foran. Skriv det **selv**.",
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Opgaver</title>
</head>
<body>
    <h1>Opgaver</h1>
    <p id="status">Henter …</p>
    <ul id="liste"></ul>

    <script>
        async function visOpgaver() {
            const status = document.getElementById("status");
            try {
                const svar = await fetch("https://jsonplaceholder.typicode.com/todos?userId=1");
                if (!svar.ok) {
                    status.textContent = "Fejl " + svar.status;
                    return;
                }
                const opgaver = await svar.json();
                for (const o of opgaver) {
                    const li = document.createElement("li");
                    li.textContent = (o.completed ? "✓ " : "") + o.title;
                    document.getElementById("liste").appendChild(li);
                }
                status.textContent = opgaver.length + " opgaver";
            } catch (fejl) {
                status.textContent = "Ingen forbindelse";
            }
        }

        visOpgaver();
    </script>
</body>
</html>`,
        md2: "Siden viser 20 opgaver på latin (testdata). `?userId=1` i adressen er en **query string**, der beder serveren om kun at sende bruger 1's opgaver — du kender den fra GET-formularer i modul 13. Prøv at stave adressen forkert (`todoss`), og se `Fejl 404`. Slå så netværket fra i fanen **Network** (vælg **Offline** i listen, hvor der står **No throttling**), genindlæs, og se `Ingen forbindelse`." },
      { t: "laes", h: "Send data med POST",
        md: "For at **oprette** noget på serveren sender du en **POST**. `fetch` får så et objekt nummer to med tre ting:\n\n- `method: \"POST\"`\n- `headers` med `\"Content-Type\": \"application/json\"`, så serveren ved, at det er JSON.\n- `body`: dataene som **JSON-tekst**, lavet med `JSON.stringify`.\n\nSvaret er typisk statuskode **201** (oprettet) og det gemte objekt — nu med et `id`, som serveren har givet det.",
        sprog: "js",
        kode: R`async function opretPost() {
    const nyPost = { title: "Hej", body: "Min første POST", userId: 1 };

    const svar = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nyPost)
    });

    const gemt = await svar.json();
    console.log(svar.status);
    console.log(gemt.id);
}

opretPost();`,
        noter: [
          ["method: \"POST\"", "Opret noget nyt. Uden denne linje sender `fetch` GET."],
          ["\"Content-Type\": \"application/json\"", "Fortæller serveren, at der kommer JSON."],
          ["body: JSON.stringify(nyPost)", "Objektet laves om til tekst. Man kan ikke sende et objekt direkte."],
          ["gemt.id", "Serveren giver det nye objekt et id."]
        ],
        md2: "Konsollen viser `201` og `101`. JSONPlaceholder lader bare som om, den gemmer — henter du post 101 bagefter, findes den ikke. Din egen Web API i modul 19 gemmer i en rigtig database." },
      { t: "udfyld", sprog: "js",
        q: "Send varen til serveren som JSON, så den bliver oprettet.",
        kode: R`const vare = { navn: "Te", pris: 30 };

await fetch("/api/varer", {
    method: "[[POST|post]]",
    headers: { "Content-Type": "[[application/json]]" },
    body: JSON.[[stringify]](vare)
});`,
        fordi: "POST opretter. Headeren fortæller, at kroppen er JSON. Og `JSON.stringify` laver objektet om til den tekst, der bliver sendt. (Koden står inde i en `async`-funktion, ellers må der ikke stå `await`.)" },
      { t: "fejl", logisk: true, sprog: "js",
        q: "Funktionen skal skrive titlen på opgave 1, men skriver `undefined`. Der er ingen rød fejl. Hvilken linje er forkert?",
        kode: R`async function visTitel() {
    const svar = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = svar.json();
    console.log(data.title);
}

visTitel();`,
        linje: 3,
        output: "undefined",
        fordi: "Der mangler `await` foran `svar.json()`. Uden det er `data` en **Promise**, ikke opgaven, og en Promise har ingen property `title`. Med `const data = await svar.json();` skriver den `delectus aut autem`. Sæt et breakpoint i linje 4, og se under **Scope**, at `data` er en Promise.",
        rettet: R`async function visTitel() {
    const svar = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await svar.json();
    console.log(data.title);
}

visTitel();`,
        rettetOutput: "delectus aut autem" },
      { t: "valg", q: "En side skal gemme en ny kommentar på serveren. Hvilken HTTP-metode, og hvad skal `body` være?",
        svar: ["POST, og `body` er kommentaren lavet om til JSON-tekst med `JSON.stringify`", "GET, og `body` er kommentaren som objekt", "POST, og `body` er kommentaren som objekt — `fetch` laver den selv om", "GET, og kommentaren sættes i `headers`"],
        ret: 0, fordi: "GET **henter**, POST **opretter**. En GET har ingen `body`. `fetch` laver ikke selv objekter om til JSON — sender du objektet direkte, får serveren teksten `[object Object]`." },
      { t: "skriv", sprog: "js",
        q: "Skriv indholdet af `visVarer`: hent `\"/api/varer\"` med `fetch` og `await` i en `const svar`, læs JSON'en med `await svar.json()` i en `const varer`, og skriv `varer.length` ud med `console.log`.",
        foer: R`async function visVarer() {`,
        efter: R`}`,
        tjek: [
          [/const svar=await fetch\(("\/api\/varer"|'\/api\/varer')\);/, "Hent svaret: `const svar = await fetch(\"/api/varer\");`"],
          [/const varer=await svar\.json\(\);/, "Læs JSON'en med `await`: `const varer = await svar.json();`"],
          [/console\.log\(varer\.length\);/, "Skriv antallet: `console.log(varer.length);`"],
          [/JSON\.parse/, "`svar.json()` laver selv JSON'en om — du behøver ikke `JSON.parse`", "ikke"]
        ],
        forkert: ["const svar = await fetch(\"/api/varer\");\nconst varer = svar.json();\nconsole.log(varer.length);"],
        loesning: R`    const svar = await fetch("/api/varer");
    const varer = await svar.json();
    console.log(varer.length);` },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad sker der, når JavaScript på en side henter data fra en Web API med `fetch` og viser dem?",
        svar: "Det er **AJAX**: JavaScript sender en **GET**-forespørgsel med `fetch` til en URL i baggrunden, og siden bliver ikke genindlæst. Med `await` venter funktionen på svaret uden at fryse siden. Man tjekker **statuskoden** med `svar.ok`, fordi `fetch` ikke selv fejler ved 404. Så læses indholdet med `await svar.json()`, der laver **JSON** om til objekter, og til sidst opdateres **DOM'en**. Skal noget oprettes, bruges **POST** med `JSON.stringify` i `body`. Sådan virker en SPA.",
        noegle: ["AJAX", "fetch", "await", "statuskode", "JSON", "DOM", "POST"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m15l6", titel: "jQuery og web storage", min: 18,
    ord: [
      ["Bibliotek", "Færdig kode, som andre har skrevet, og som du henter ind i dit projekt og bruger."],
      ["jQuery", "Et JavaScript-bibliotek fra 2006, der gør DOM, events og AJAX kortere at skrive. Følger med i ASP.NET Core MVC-skabelonen."],
      ["$ (jQuery)", "jQuerys hovedfunktion. `$(\"#navn\")` finder elementer med en CSS-selector."],
      ["CDN", "Content Delivery Network: en server, der deler kendte biblioteker ud, så du kan hente dem med et `<script src=\"https://…\">`."],
      ["localStorage", "Browserens lager til tekst, som siden kan gemme under et navn. Det bliver liggende, også efter browseren er lukket."],
      ["sessionStorage", "Som localStorage, men det forsvinder, når fanen lukkes."],
      ["setItem / getItem", "`setItem(\"navn\", tekst)` gemmer. `getItem(\"navn\")` henter — eller giver `null`, hvis der ikke er noget."]
    ],
    trin: [
      { t: "laes", h: "Hvad er jQuery, og hvorfor skal du kende det?",
        md: "**jQuery** er et **bibliotek**: en stor samling færdige JavaScript-funktioner. Det kom i 2006, da browserne opførte sig forskelligt, og jQuery skjulte forskellene. I dag kan almindelig JavaScript det samme, så nye projekter bruger det sjældent.\n\nMen du **møder det**: ASP.NET Core MVC-skabelonen lægger jQuery i `wwwroot/lib/jquery`, og `_Layout.cshtml` henter det nederst, fordi valideringen af formularer bruger det (modul 16). Og meget eksisterende kode er skrevet med det.\n\nI en almindelig HTML-fil henter du jQuery fra et **CDN**:",
        sprog: "html",
        kode: R`<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="app.js"></script>`,
        noter: [
          ["code.jquery.com/jquery-3.7.1.min.js", "jQuery version 3.7.1. `.min` betyder, at koden er presset sammen, så filen er lille."],
          ["Rækkefølgen", "jQuery **først**, din egen kode **bagefter**. Ellers findes `$` ikke endnu, når din kode kører, og konsollen siger `$ is not defined`."]
        ] },
      { t: "laes", h: "jQuery i praksis: $, val, text og on",
        md: "Alt i jQuery starter med funktionen **`$`**. Du giver den en CSS-selector, ligesom `querySelector`, og får et jQuery-objekt med en masse korte metoder.",
        sprog: "html",
        kode: R`<input id="navn">
<button id="hils">Hils</button>
<p id="svar"></p>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script>
    $(function () {
        $("#hils").on("click", function () {
            const navn = $("#navn").val();
            $("#svar").text("Hej " + navn);
        });
    });
</script>`,
        noter: [
          ["$(function () { … })", "Kør koden, når siden er klar. Den lange form er `$(document).ready(function () { … })`."],
          ["$(\"#hils\")", "Find elementet med id `hils`. Samme selector som i CSS."],
          [".on(\"click\", …)", "Som `addEventListener(\"click\", …)`. Du ser også den korte form `.click(…)`."],
          [".val()", "Som `.value`. Med en parameter sætter den værdien: `.val(\"\")` tømmer feltet."],
          [".text(\"…\")", "Som `.textContent = …`. `.html(…)` svarer til `innerHTML`."]
        ],
        md2: "Én stor forskel: en jQuery-selector virker på **alle** de elementer, der passer. `$(\".pris\").css(\"color\", \"red\")` farver alle elementer med klassen `pris` røde på én gang — uden løkke." },
      { t: "valg", q: "Hvad svarer `$(\"#pris\").val()` til i almindelig JavaScript?",
        svar: ["`document.getElementById(\"pris\").value`", "`document.getElementById(\"pris\").textContent`", "`document.querySelectorAll(\".pris\")`", "`document.getElementById(\"#pris\").value`"],
        ret: 0, fordi: "`#pris` er id'et `pris`, og `.val()` læser værdien i et felt — `.value`. `textContent` svarer til `.text()`. Og `getElementById` skal have id'et **uden** #." },
      { t: "udfyld", sprog: "js",
        q: "Med jQuery: når der klikkes på knappen med id `knap`, skal elementet med id `besked` vise teksten `Gemt!`.",
        kode: R`$("[[#]]knap").[[on]]("click", function () {
    $("#besked").[[text]]("Gemt!");
});`,
        fordi: "`#` foran id'et, som i CSS. `.on(\"click\", …)` kobler funktionen på. `.text(\"Gemt!\")` sætter teksten. (`.click(function …)` ville også virke.)" },
      { t: "fejl", logisk: true, sprog: "js",
        q: "Knappen har `id=\"knap\"`, og jQuery er hentet korrekt. Men der sker ingenting ved klik — og der er **ingen** rød fejl i konsollen. Hvilken linje er forkert?",
        kode: R`$(function () {
    $("knap").on("click", function () {
        $("#svar").text("Klikket!");
    });
});`,
        linje: 2,
        fordi: "Der mangler `#`. `$(\"knap\")` leder efter elementer af typen `<knap>`, og dem er der ingen af. jQuery giver ikke en fejl, når en selector ikke finder noget — den gør bare ingenting. (`getElementById` ville give `null` og en rød fejl.) Er du i tvivl, så skriv `console.log($(\"knap\").length);` — giver det 0, fandt selectoren intet.",
        rettet: R`$(function () {
    $("#knap").on("click", function () {
        $("#svar").text("Klikket!");
    });
});` },
      { t: "laes", h: "AJAX med jQuery",
        md: "jQuery har også sine egne AJAX-funktioner. De er ældre end `fetch` og bruger **callbacks** i stedet for Promises. `$.get` henter med GET og laver selv JSON om til objekter. `$.ajax` kan alt, også POST.",
        sprog: "js",
        kode: R`$.get("https://jsonplaceholder.typicode.com/users/1", function (bruger) {
    $("#navn").text(bruger.name);
});

$.ajax({
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ title: "Hej", userId: 1 }),
    success: function (gemt) {
        console.log(gemt.id);
    }
});`,
        noter: [
          ["$.get(url, function (bruger) { … })", "Hent, og kald funktionen med dataene. Som `fetch` + `svar.json()` i én."],
          ["$.ajax({ … })", "Alle indstillinger i ét objekt: adresse, metode, type og data."],
          ["success: function (gemt)", "Callbacken, der kører, når serveren har svaret OK."]
        ],
        md2: "Begge dele virker. I ny kode skriver du `fetch` med `async`/`await`, som du lærte i forrige lektion. Men kan du læse `$.get` og `$.ajax`, forstår du gamle eksempler og underviserens kode." },
      { t: "laes", h: "Web storage: siden kan huske",
        md: "**localStorage** er et lille lager i browseren, hvor din side kan gemme tekst under et navn — som en `Dictionary<string, string>`. Det bliver liggende, også når browseren lukkes. **sessionStorage** virker på samme måde, men tømmes, når fanen lukkes.\n\nDer kan **kun gemmes tekst**. Skal du gemme et objekt eller et array, laver du det om til JSON med `JSON.stringify` og tilbage med `JSON.parse` (modul 14).",
        sprog: "js",
        kode: R`localStorage.setItem("navn", "Peter");
console.log(localStorage.getItem("navn"));

const kurv = [{ vare: "Kaffe", antal: 2 }];
localStorage.setItem("kurv", JSON.stringify(kurv));
const igen = JSON.parse(localStorage.getItem("kurv"));
console.log(igen[0].vare);

localStorage.removeItem("navn");
console.log(localStorage.getItem("navn"));`,
        noter: [
          ["setItem(\"navn\", \"Peter\")", "Gem teksten under navnet `navn`."],
          ["getItem(\"navn\")", "Hent den igen. Findes navnet ikke, giver den `null`."],
          ["JSON.stringify / JSON.parse", "Array → tekst, før det gemmes. Tekst → array, når det hentes."],
          ["removeItem(\"navn\")", "Slet det, der ligger under navnet."]
        ],
        output: "Peter\nKaffe\nnull",
        md2: "Hver hjemmeside har sit **eget** lager — en anden side kan ikke læse dit. Du kan se det i udviklerværktøjet under fanen **Application** → **Local storage**. Gem **aldrig** adgangskoder eller andet hemmeligt dér: al JavaScript på siden kan læse det." },
      { t: "valg", q: "En webshop vil huske brugerens indkøbskurv, også hvis browseren lukkes og åbnes i morgen. Hvad passer bedst?",
        svar: ["`localStorage` med kurven gemt som JSON", "`sessionStorage` med kurven gemt som JSON", "En almindelig variabel i JavaScript", "`localStorage` med kurven gemt direkte som array uden JSON"],
        ret: 0, fordi: "`localStorage` overlever, at browseren lukkes. `sessionStorage` forsvinder med fanen, og en variabel forsvinder, så snart siden genindlæses. Og et array skal laves om til tekst med `JSON.stringify`, fordi lageret kun kan gemme tekst." },
      { t: "fejl", logisk: true, sprog: "js",
        q: "Programmet skal gemme brugeren og skrive JSON-teksten `{\"navn\":\"Bo\",\"alder\":30}`. Det skriver `[object Object]`. Hvilken linje er forkert?",
        kode: R`const bruger = { navn: "Bo", alder: 30 };
localStorage.setItem("bruger", bruger);
console.log(localStorage.getItem("bruger"));`,
        linje: 2,
        output: "[object Object]",
        fordi: "localStorage kan kun gemme tekst. Får `setItem` et objekt, laver den det selv om til tekst på den dumme måde: `[object Object]`. Dataene er tabt. Lav det om til JSON først: `localStorage.setItem(\"bruger\", JSON.stringify(bruger));`.",
        rettet: R`const bruger = { navn: "Bo", alder: 30 };
localStorage.setItem("bruger", JSON.stringify(bruger));
console.log(localStorage.getItem("bruger"));`,
        rettetOutput: "{\"navn\":\"Bo\",\"alder\":30}" },
      { t: "udfyld", sprog: "js",
        q: "Siden skal tælle, hvor mange gange den er blevet åbnet. Første gang findes `besoeg` ikke, og `Number(null)` giver 0. Hvad skriver koden første gang?",
        kode: R`let antal = Number(localStorage.[[getItem]]("besoeg"));
antal++;
localStorage.[[setItem]]("besoeg", antal);
console.log("Besøg nr. " + antal);`,
        output: "Besøg nr. 1",
        fordi: "`getItem` henter, `setItem` gemmer. Første gang er der intet, så `getItem` giver `null`, og `Number(null)` er 0. Plus én er 1. Næste gang siden åbnes, ligger `\"1\"` i lageret, og der skrives `Besøg nr. 2`. Tallet bliver lavet om til tekst, når det gemmes, og derfor skal `Number` med, når det hentes." },
      { t: "ide", h: "En huskeseddel, der overlever",
        md: "Lav `seddel.html` i mappen `OojsOevelser`. Siden har et tekstfelt og to knapper. **Gem** gemmer teksten i localStorage. **Ryd** sletter den. Når siden åbnes, står den gemte tekst i feltet. Skriv det med jQuery, så du får prøvet det.",
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Huskeseddel</title>
</head>
<body>
    <h1>Huskeseddel</h1>
    <textarea id="seddel" rows="6" cols="40"></textarea><br>
    <button id="gem">Gem</button>
    <button id="ryd">Ryd</button>
    <p id="status"></p>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script>
        $(function () {
            $("#seddel").val(localStorage.getItem("seddel") ?? "");

            $("#gem").on("click", function () {
                localStorage.setItem("seddel", $("#seddel").val());
                $("#status").text("Gemt");
            });

            $("#ryd").on("click", function () {
                localStorage.removeItem("seddel");
                $("#seddel").val("");
                $("#status").text("Ryddet");
            });
        });
    </script>
</body>
</html>`,
        md2: "`??` virker som i C# (modul 7): er `getItem` `null`, bruges den tomme tekst i stedet. Skriv noget, klik **Gem**, luk browseren helt, og åbn siden igen — teksten er der stadig. Kig under **Application** → **Local storage** i udviklerværktøjet. Skift så `localStorage` ud med `sessionStorage` tre steder, og se forskellen, når du lukker fanen." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på localStorage og sessionStorage, og hvad skal man passe på, når man bruger dem?",
        svar: "Begge er **lagre i browseren**, hvor siden kan gemme **tekst** under et navn med `setItem` og hente den med `getItem`. **localStorage** bliver liggende, også når browseren lukkes. **sessionStorage** forsvinder, når fanen lukkes. Fordi der kun kan gemmes tekst, laver man objekter om med **`JSON.stringify`** og tilbage med `JSON.parse`. Man må ikke gemme **hemmeligheder** som adgangskoder, fordi al JavaScript på siden kan læse lageret, og data i browseren er ikke en erstatning for en database på serveren.",
        noegle: ["tekst", "setItem", "lukkes", "JSON.stringify", "hemmeligheder"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m15v", titel: "Værksted: objekter og data i browseren", vaerksted: true, min: 90,
    ord: [],
    trin: [
      { t: "laes", h: "Sådan arbejder du i værkstedet",
        md: "Nu skal du skrive **hele sider selv**: klasser, arv, async/await, fetch og localStorage.\n\nOpgaverne bliver sværere hen ad vejen. Den første er let. Den tredje er en fejlfinding, hvor du skal bruge browserens debugger. Den fjerde henter data fra en server. Den sidste er en lille app, der samler hele modulet.\n\nBoksen under hver opgave taler om {{Ctrl + F5 og Error List||den grønne pil og Problems}} — den er lavet til C#-opgaverne. Her laver du i stedet en `.html`-fil (og gerne en `.js`-fil ved siden af), åbner den i browseren og genindlæser med {{**F5**||**⌘R**}}, hver gang du har gemt.",
        noter: [
          ["Skriv selv", "Skriv koden med dine egne fingre. Kopiér ikke fra lektionerne."],
          ["Konsollen er altid åben", "Hav udviklerværktøjet åbent ({{**F12**||**⌥⌘I**}}) med fanen **Console**. Fejl vises **kun** der, med rødt og et linjenummer, du kan klikke på."],
          ["Kør tit", "Gem og genindlæs efter hver lille ændring. Så ved du præcis, hvilken ændring der gjorde noget forkert."],
          ["Brug debuggeren", "Fanen **Sources**: klik på et linjenummer for at sætte et **breakpoint**. Når koden når dertil, stopper den, og **Scope** viser alle variablerne — også `this`. **Step over** går én linje frem."],
          ["Network-fanen", "Når du bruger `fetch`, kan du under **Network** se hver forespørgsel, dens statuskode og det svar, der kom."],
          ["Tips før løsning", "Åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af."]
        ] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Produkter med moms", sprog: "html",
        md: "Lav en side `produkter.html` med et `<script>`, der bruger en klasse `Produkt` og skriver en lille prisliste i konsollen. Siden selv skal kun have en overskrift.",
        krav: [
          "En klasse `Produkt` med en `constructor(navn, pris)`, der sætter `this.navn` og `this.pris`",
          "En getter `prisMedMoms`, der returnerer prisen gange 1.25",
          "Et array med tre produkter: Kaffe til 40, Te til 20 og Kakao til 36",
          "En `for…of`-løkke skriver hvert produkt i formen `Kaffe: 40 kr. (50 kr. med moms)`",
          "Til sidst skrives summen af alle priser med moms: `I alt med moms: 120 kr.`"
        ],
        tip: [
          "Start med klassen og ét produkt. Skriv `console.log(p.prisMedMoms);` for at se, at getteren virker. Husk: ingen parenteser efter en getter.",
          "Lav `let sum = 0;` før løkken, og læg `p.prisMedMoms` til inde i den.",
          "Linjen i løkken: `console.log(p.navn + \": \" + p.pris + \" kr. (\" + p.prisMedMoms + \" kr. med moms)\");`"
        ],
        fri: true,
        output: "Kaffe: 40 kr. (50 kr. med moms)\nTe: 20 kr. (25 kr. med moms)\nKakao: 36 kr. (45 kr. med moms)\nI alt med moms: 120 kr.",
        loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Produkter</title>
</head>
<body>
    <h1>Produkter</h1>

    <script>
        class Produkt {
            constructor(navn, pris) {
                this.navn = navn;
                this.pris = pris;
            }

            get prisMedMoms() {
                return this.pris * 1.25;
            }
        }

        const produkter = [
            new Produkt("Kaffe", 40),
            new Produkt("Te", 20),
            new Produkt("Kakao", 36)
        ];

        let sum = 0;
        for (const p of produkter) {
            console.log(p.navn + ": " + p.pris + " kr. (" + p.prisMedMoms + " kr. med moms)");
            sum += p.prisMedMoms;
        }
        console.log("I alt med moms: " + sum + " kr.");
    </script>
</body>
</html>`,
        ekstra: ["Vis listen på selve siden i et `ul` med `createElement` og `textContent` i stedet for i konsollen.", "Gør `pris` privat med `#pris`, og lav en setter, der afviser negative priser. Prøv `new Produkt(\"Fejl\", -5)`."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Bank med arv", sprog: "html",
        md: "Lav `bank.html` med to klasser. En `Konto` beskytter sin saldo, og en `Loenkonto` arver fra den og må gå i minus op til en grænse. Alt skrives i konsollen.",
        krav: [
          "`Konto` har et privat felt `#saldo` (starter på 0), en `constructor(ejer)` og en getter `saldo`",
          "`indsaet(beloeb)` lægger beløbet til, men kun hvis det er over 0",
          "`haev(beloeb)` trækker beløbet fra og returnerer `true` — men kun hvis `this.kanHaeve(beloeb)` er sand. Ellers returnerer den `false`",
          "`kanHaeve(beloeb)` i `Konto` returnerer `beloeb <= this.saldo`",
          "`Loenkonto extends Konto` har `constructor(ejer, kredit)`, der kalder `super(ejer)` og gemmer `this.kredit`. Den har sin egen `kanHaeve(beloeb)`, der returnerer `beloeb <= this.saldo + this.kredit`",
          "`Konto` har et `static antal`, der tælles op i konstruktøren",
          "Testkoden: `const a = new Konto(\"Ida\"); const b = new Loenkonto(\"Bo\", 500); a.indsaet(200); b.indsaet(200);` og derefter skrives `a.haev(300)`, `b.haev(300)`, `a.saldo`, `b.saldo` og `Konto.antal` hver på sin linje"
        ],
        tip: [
          "Byg `Konto` først, og test den alene. `#saldo` kan kun ændres inde i `Konto` — derfor skal ændringen ske i `haev`, ikke i underklassen.",
          "Det smarte er, at `haev` kalder `this.kanHaeve(…)`. For en `Loenkonto` er `this` en Loenkonto, så det er **dens** `kanHaeve`, der bruges — polymorfi.",
          "`haev(beloeb) { if (!this.kanHaeve(beloeb)) { return false; } this.#saldo -= beloeb; return true; }`"
        ],
        fri: true,
        output: "false\ntrue\n200\n-100\n2",
        loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Bank</title>
</head>
<body>
    <h1>Bank</h1>

    <script>
        class Konto {
            static antal = 0;
            #saldo = 0;

            constructor(ejer) {
                this.ejer = ejer;
                Konto.antal++;
            }

            get saldo() {
                return this.#saldo;
            }

            indsaet(beloeb) {
                if (beloeb > 0) {
                    this.#saldo += beloeb;
                }
            }

            kanHaeve(beloeb) {
                return beloeb <= this.saldo;
            }

            haev(beloeb) {
                if (!this.kanHaeve(beloeb)) {
                    return false;
                }
                this.#saldo -= beloeb;
                return true;
            }
        }

        class Loenkonto extends Konto {
            constructor(ejer, kredit) {
                super(ejer);
                this.kredit = kredit;
            }

            kanHaeve(beloeb) {
                return beloeb <= this.saldo + this.kredit;
            }
        }

        const a = new Konto("Ida");
        const b = new Loenkonto("Bo", 500);
        a.indsaet(200);
        b.indsaet(200);
        console.log(a.haev(300));
        console.log(b.haev(300));
        console.log(a.saldo);
        console.log(b.saldo);
        console.log(Konto.antal);
    </script>
</body>
</html>`,
        ekstra: ["Lav en metode `info()` i `Konto`, der returnerer `\"Ida: 200 kr.\"`, og overskriv den i `Loenkonto`, så den bruger `super.info()` og tilføjer `\" (kredit 500)\"`.", "Sæt et breakpoint i `haev`, og se under **Scope**, at `this` er en `Loenkonto`, når `b.haev(300)` kører."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Fejlfinding: tælleren uden vis", sprog: "html",
        md: "Siden nedenfor har en klasse `Taeller` og en knap. Hvert klik skulle lægge 1 til og vise tallet. Men tallet bliver stående på **0**, og konsollen viser en rød fejl: `Uncaught TypeError: this.vis is not a function`. Mærkeligt — klassen **har** jo en metode, der hedder `vis`.\n\nFind årsagen **med debuggeren**, ikke ved at gætte:\n\n1. Lav `taeller.html`, og kopiér koden ind. Åbn den, klik på knappen, og læs den røde fejl.\n2. Åbn fanen **Sources**, og klik på `taeller.html`. Sæt et **breakpoint** på linjen `this.antal++;`.\n3. Klik på knappen igen. Koden stopper. Se under **Scope** efter `this`. Er `this` en `Taeller`, eller er det noget andet?\n4. Klik **Step over**. Hold musen over `this.antal`. Hvad står der?\n5. Spørg dig selv: hvem kalder `op`, og med hvilket objekt foran?",
        krav: [
          "Find ud af, hvad `this` er, når `op` kører",
          "Ret fejlen ved at ændre **én** linje — klassen skal ikke ændres",
          "Efter tre klik viser siden `3`, og der er ingen rød fejl"
        ],
        start: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Tæller</title>
</head>
<body>
    <h1 id="tal">0</h1>
    <button id="knap">+1</button>

    <script>
        class Taeller {
            constructor(element) {
                this.antal = 0;
                this.element = element;
            }

            op() {
                this.antal++;
                this.vis();
            }

            vis() {
                this.element.textContent = this.antal;
            }
        }

        const t = new Taeller(document.getElementById("tal"));
        document.getElementById("knap").addEventListener("click", t.op);
    </script>
</body>
</html>`,
        tip: [
          "Under **Scope** står `this` som `button#knap` — det er knappen, ikke tælleren. `this.antal++` lægger altså 1 til en property på **knappen** (`undefined + 1` giver `NaN`), og knappen har ingen `vis`. Derfor fejlen.",
          "Hvorfor er `this` knappen? `t.op` uden parenteser er bare funktionen — objektet `t` følger ikke med. Når browseren kalder en almindelig funktion ved en event, sætter den `this` til elementet. Fejlen er altså i linjen med `addEventListener`.",
          "Kald metoden på objektet inde i en arrow function: `document.getElementById(\"knap\").addEventListener(\"click\", () => t.op());`"
        ],
        fri: true,
        output: "Før rettelsen: tallet står på 0, og hvert klik giver den røde fejl this.vis is not a function\nEfter rettelsen: 1, 2, 3 efter tre klik, og ingen fejl",
        loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Tæller</title>
</head>
<body>
    <h1 id="tal">0</h1>
    <button id="knap">+1</button>

    <script>
        class Taeller {
            constructor(element) {
                this.antal = 0;
                this.element = element;
            }

            op() {
                this.antal++;
                this.vis();
            }

            vis() {
                this.element.textContent = this.antal;
            }
        }

        const t = new Taeller(document.getElementById("tal"));
        document.getElementById("knap").addEventListener("click", () => t.op());
    </script>
</body>
</html>`,
        ekstra: ["En anden rettelse er `function () { t.op(); }`. Prøv den, og forklar, hvorfor den også virker.", "Tilføj en knap `-1` og en metode `ned()`, og kobl den på med en arrow function fra starten."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Brugerkatalog fra en Web API", sprog: "html",
        md: "Lav `brugere.html`, der henter de 10 brugere fra `https://jsonplaceholder.typicode.com/users` og viser dem i en tabel. Over tabellen er et søgefelt, der filtrerer på navn, mens man skriver — **uden** at hente data igen.",
        krav: [
          "Et `input` med id `soeg`, et afsnit med id `status` og en `table` med kolonnerne Navn, E-mail og By. Rækkerne ligger i et `tbody` med id `raekker`",
          "Mens der hentes, står der `Henter …` i `status`. Bagefter står der fx `10 brugere`",
          "En `async`-funktion henter med `fetch` og `await`, tjekker `svar.ok` og viser `Fejl` og statuskoden, hvis det gik galt. Uden forbindelse vises `Ingen forbindelse` (`try`/`catch`)",
          "Brugerne gemmes i et array, og en funktion `visTabel(liste)` bygger rækkerne med `createElement` og `textContent`. Byen ligger i `address.city`",
          "Ved eventen `\"input\"` på søgefeltet vises kun de brugere, hvis navn indeholder det, der er skrevet (uden forskel på store og små bogstaver), og `status` viser antallet"
        ],
        tip: [
          "Byg det i to trin: først hent og `console.log(brugere)`. Når det virker, så `visTabel`.",
          "I `visTabel`: tøm med `raekker.innerHTML = \"\";`. For hver bruger: lav et `tr`, og tre gange et `td` med `textContent`, som du sætter ind med `appendChild`.",
          "Søgning: `const tekst = e.target.value.toLowerCase(); const fundne = brugere.filter(b => b.name.toLowerCase().includes(tekst)); visTabel(fundne);`. `includes` er JavaScripts `Contains`."
        ],
        fri: true,
        output: "Siden åbnes: \"Henter …\" og kort efter en tabel med 10 rækker og \"10 brugere\". Første række: Leanne Graham, Sincere@april.biz, Gwenborough\nSkriv \"cl\" i søgefeltet: kun Clementine Bauch og Clementina DuBuque, og \"2 brugere\"\nTøm søgefeltet: alle 10 igen\nAdressen stavet forkert (fx /userss): \"Fejl 404\"",
        loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Brugere</title>
</head>
<body>
    <h1>Brugere</h1>
    <input id="soeg" placeholder="Søg på navn">
    <p id="status"></p>
    <table>
        <thead>
            <tr><th>Navn</th><th>E-mail</th><th>By</th></tr>
        </thead>
        <tbody id="raekker"></tbody>
    </table>

    <script>
        const status = document.getElementById("status");
        const raekker = document.getElementById("raekker");
        let brugere = [];

        function celle(tr, tekst) {
            const td = document.createElement("td");
            td.textContent = tekst;
            tr.appendChild(td);
        }

        function visTabel(liste) {
            raekker.innerHTML = "";
            for (const b of liste) {
                const tr = document.createElement("tr");
                celle(tr, b.name);
                celle(tr, b.email);
                celle(tr, b.address.city);
                raekker.appendChild(tr);
            }
            status.textContent = liste.length + " brugere";
        }

        async function hentBrugere() {
            status.textContent = "Henter …";
            try {
                const svar = await fetch("https://jsonplaceholder.typicode.com/users");
                if (!svar.ok) {
                    status.textContent = "Fejl " + svar.status;
                    return;
                }
                brugere = await svar.json();
                visTabel(brugere);
            } catch (fejl) {
                status.textContent = "Ingen forbindelse";
            }
        }

        document.getElementById("soeg").addEventListener("input", e => {
            const tekst = e.target.value.toLowerCase();
            const fundne = brugere.filter(b => b.name.toLowerCase().includes(tekst));
            visTabel(fundne);
        });

        hentBrugere();
    </script>
</body>
</html>`,
        ekstra: ["Lav en klasse `Bruger` med `constructor(data)`, der plukker `navn`, `email` og `by` ud, og lav arrayet om med `map(d => new Bruger(d))`.", "Klik på en række for at hente brugerens opgaver fra `https://jsonplaceholder.typicode.com/todos?userId=` + id og vise antallet af færdige opgaver."] },

      // ------------------------------------------------------------------
      { t: "opgave", h: "Samlet program: huskelisten", sprog: "html",
        md: "Lav `huskeliste.html`: en lille app, der samler hele modulet. Brugeren kan tilføje opgaver og klikke på dem for at markere dem som færdige. Listen bliver gemt i **localStorage**, så den er der, når siden åbnes igen. Første gang — når der ikke er gemt noget — henter siden 3 opgaver fra en server, så listen ikke er tom.",
        krav: [
          "En klasse `Opgave` med `constructor(tekst, faerdig)` og en metode `skift()`, der vender `faerdig` om",
          "En klasse `Huskeliste` med et privat felt `#opgaver = []` og metoderne `tilfoej(tekst)`, `skift(nr)`, `gem()` og `hent()`. Den har også en getter `antalTilbage`",
          "`gem()` gemmer listen i localStorage under navnet `huskeliste` som JSON. `hent()` læser den igen og laver hvert objekt om til en **ny** `Opgave`. Den returnerer `true`, hvis der lå noget",
          "Findes der ikke noget i localStorage, henter en `async`-funktion `https://jsonplaceholder.typicode.com/todos?_limit=3` og tilføjer de tre opgavers `title` (og `completed`) til listen",
          "Siden har et `input`, en knap **Tilføj** og en `ul`. Hvert punkt viser opgavens tekst, og færdige opgaver er overstreget (`style.textDecoration = \"line-through\"`). Klik på et punkt skifter det",
          "Under listen står fx `2 tilbage`. Efter hver ændring gemmes listen, og listen tegnes forfra"
        ],
        tip: [
          "Byg det i små skridt, og test efter hvert: først klassen `Opgave`, så `Huskeliste` med `tilfoej` og en `vis()`-funktion, så klik, så `gem`/`hent`, og til sidst `fetch`.",
          "Fælden: `JSON.parse` giver **almindelige objekter** tilbage, ikke `Opgave`-objekter — de har ingen `skift()`. Lav dem om i `hent()`: `this.#opgaver = data.map(o => new Opgave(o.tekst, o.faerdig));`.",
          "Klik: giv hvert `li` sin egen lytter inde i løkken, fx `li.addEventListener(\"click\", () => { liste.skift(i); liste.gem(); vis(); });` hvor `i` er nummeret fra en almindelig `for`-løkke. Arrow functionen er en closure, der husker sit eget `i`."
        ],
        fri: true,
        output: "Første gang siden åbnes: 3 opgaver fra serveren (på latin), og under listen antallet af opgaver, der ikke er færdige, fx \"3 tilbage\"\nTilføj \"Køb mælk\": 4 opgaver, ét mere tilbage\nKlik på \"Køb mælk\": den bliver overstreget, ét mindre tilbage. Klik igen: ikke overstreget\nGenindlæs siden: præcis samme liste, og der bliver ikke hentet fra serveren (se fanen Network)\nSlet \"huskeliste\" under Application → Local storage og genindlæs: de 3 opgaver hentes igen",
        loesning: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Huskeliste</title>
</head>
<body>
    <h1>Huskeliste</h1>
    <input id="ny">
    <button id="tilfoej">Tilføj</button>
    <ul id="punkter"></ul>
    <p id="tilbage"></p>

    <script>
        class Opgave {
            constructor(tekst, faerdig) {
                this.tekst = tekst;
                this.faerdig = faerdig;
            }

            skift() {
                this.faerdig = !this.faerdig;
            }
        }

        class Huskeliste {
            #opgaver = [];

            get opgaver() {
                return this.#opgaver;
            }

            get antalTilbage() {
                return this.#opgaver.filter(o => !o.faerdig).length;
            }

            tilfoej(tekst, faerdig = false) {
                this.#opgaver.push(new Opgave(tekst, faerdig));
            }

            skift(nr) {
                this.#opgaver[nr].skift();
            }

            gem() {
                localStorage.setItem("huskeliste", JSON.stringify(this.#opgaver));
            }

            hent() {
                const tekst = localStorage.getItem("huskeliste");
                if (tekst === null) {
                    return false;
                }
                const data = JSON.parse(tekst);
                this.#opgaver = data.map(o => new Opgave(o.tekst, o.faerdig));
                return true;
            }
        }

        const liste = new Huskeliste();
        const punkter = document.getElementById("punkter");
        const felt = document.getElementById("ny");

        function vis() {
            punkter.innerHTML = "";
            for (let i = 0; i < liste.opgaver.length; i++) {
                const o = liste.opgaver[i];
                const li = document.createElement("li");
                li.textContent = o.tekst;
                li.style.textDecoration = o.faerdig ? "line-through" : "none";
                li.addEventListener("click", () => {
                    liste.skift(i);
                    liste.gem();
                    vis();
                });
                punkter.appendChild(li);
            }
            document.getElementById("tilbage").textContent = liste.antalTilbage + " tilbage";
        }

        document.getElementById("tilfoej").addEventListener("click", () => {
            const tekst = felt.value.trim();
            if (tekst === "") {
                return;
            }
            liste.tilfoej(tekst);
            felt.value = "";
            liste.gem();
            vis();
        });

        async function start() {
            if (!liste.hent()) {
                try {
                    const svar = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3");
                    if (svar.ok) {
                        const data = await svar.json();
                        for (const d of data) {
                            liste.tilfoej(d.title, d.completed);
                        }
                        liste.gem();
                    }
                } catch (fejl) {
                    console.log("Kunne ikke hente startopgaver");
                }
            }
            vis();
        }

        start();
    </script>
</body>
</html>`,
        ekstra: ["Tilføj en knap **Ryd færdige**, der fjerner alle færdige opgaver med `filter` og gemmer.", "Skriv knapperne og listen om med jQuery: `$(\"#tilfoej\").on(\"click\", …)` og `$(\"<li>\").text(o.tekst)`.", "Læg klasserne i en fil for sig, `huskeliste.js`, og hent den med et `<script src>` før sidens eget script."] }
    ] }
  ]
});
})();
