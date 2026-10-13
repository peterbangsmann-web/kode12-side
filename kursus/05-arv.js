// Modul 5 — Arv og polymorfi. Forudsætter: modul 0–4.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m05", nr: 5, del: "Del 2 · Objektorienteret C#", ikon: "🧬",
  titel: "Arv og polymorfi",
  dag: "Kursusdag 3 · Arv",
  intro: "To af de fire søjler i OOP: **arv**, hvor en klasse bygger videre på en anden, og **polymorfi**, hvor forskellige objekter svarer hver på sin måde på det samme kald.\n\nBagefter kan du forklare `virtual`, `override` og `base` — tre ord, du næsten med sikkerhed bliver spurgt om til eksamen.",
  video: ["03_Ons_Inheritance.mp4 (3 t 30 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m05l1", titel: "Arv: byg videre på en klasse", min: 15,
    ord: [
      ["Arv (inheritance)", "En klasse overtager alle felter, properties og metoder fra en anden klasse og kan lægge sine egne til."],
      ["Basisklasse", "Klassen, der arves fra. Kaldes også superklasse eller forælder."],
      ["Afledt klasse", "Klassen, der arver. Kaldes også subklasse eller barn."],
      ["\"Er en\"-forhold", "Testen for, om arv giver mening: en Hund *er et* Dyr."],
      ["Klassehierarki", "Et stamtræ af klasser, der arver fra hinanden."]
    ],
    trin: [
      { t: "laes", h: "Problemet: den samme kode to steder",
        md: "Et eksempel: et system til en skole. En `Elev` har navn, e-mail og en klasse. En `Laerer` har navn, e-mail og en løn. Navn og e-mail står **to steder** — og kommer der en pedel til, står de tre steder.\n\nDet er det, **arv** løser. Du samler det fælles i én klasse, `Person`, og lader de andre klasser **arve** fra den. Så får de alt det fælles forærende og skal kun selv skrive det, der er særligt for dem." },
      { t: "laes", h: "Kolon betyder \"arver fra\"",
        md: "Arv skrives med et **kolon** efter klassens navn. Klassen, der arves fra, hedder **basisklassen**. Klassen, der arver, hedder den **afledte klasse**.",
        kode: R`Elev e = new Elev();
e.Navn = "Maja";
e.Klasse = "7.B";
e.Hils();

class Person
{
    public string Navn { get; set; }

    public void Hils()
    {
        Console.WriteLine($"Hej, jeg hedder {Navn}");
    }
}

class Elev : Person
{
    public string Klasse { get; set; }
}`,
        noter: [
          ["class Elev : Person", "Elev arver fra Person. Læs kolonet som \"er en\"."],
          ["e.Navn og e.Hils()", "Står ikke i Elev — de er arvet fra Person."],
          ["e.Klasse", "Elevs egen tilføjelse."]
        ],
        output: "Hej, jeg hedder Maja" },
      { t: "valg", q: "`class Bil : Koeretoej { }` — hvilken klasse er basisklassen?",
        svar: ["Koeretoej", "Bil", "Begge", "Ingen af dem"],
        ret: 0, fordi: "Klassen **efter** kolonet er den, der arves fra — basisklassen. `Bil` er den afledte klasse: en bil *er et* køretøj." },
      { t: "forudsig",
        kode: R`Hund h = new Hund();
h.Navn = "Fido";
h.Spis();
h.Goe();

class Dyr
{
    public string Navn { get; set; }

    public void Spis()
    {
        Console.WriteLine($"{Navn} spiser");
    }
}

class Hund : Dyr
{
    public void Goe()
    {
        Console.WriteLine($"{Navn} siger vov");
    }
}`,
        output: "Fido spiser\nFido siger vov",
        fordi: "`Hund` har arvet `Navn` og `Spis()` fra `Dyr` og har selv lagt `Goe()` til. Metoden i `Hund` kan uden videre bruge den arvede property `Navn`." },
      { t: "laes", h: "Arven går kun den ene vej",
        md: "Den afledte klasse får alt fra basisklassen. Men basisklassen ved **intet** om, hvad dens børn har fundet på.",
        kode: R`Dyr d = new Dyr();
d.Navn = "Ukendt";
d.Spis();

class Dyr
{
    public string Navn { get; set; }
    public void Spis() { Console.WriteLine($"{Navn} spiser"); }
}

class Hund : Dyr
{
    public void Goe() { Console.WriteLine("Vov"); }
}`,
        output: "Ukendt spiser",
        md2: "Et almindeligt `Dyr` kan spise, men det kan ikke gø — `d.Goe()` ville give en fejl. Alle hunde er dyr, men ikke alle dyr er hunde." },
      { t: "fejl",
        q: "Compileren melder fejl på linje 3: `'Dyr' does not contain a definition for 'Mjav'`. Klasserne er rigtige, og linje 3 skal blive stående. Klik på den linje, der skal rettes.",
        kode: R`Dyr d = new Dyr();
d.Navn = "Mis";
d.Mjav();

class Dyr
{
    public string Navn { get; set; }
}

class Kat : Dyr
{
    public void Mjav() { Console.WriteLine("Mjav"); }
}`,
        linje: 1,
        fordi: "`Mjav()` findes kun i `Kat`. Linje 1 laver et almindeligt `Dyr`, og et `Dyr` har ikke arvet noget fra sine børn. Skal `Mjav()` kunne kaldes, skal linje 1 lave en `Kat`.",
        rettet: R`Kat d = new Kat();
d.Navn = "Mis";
d.Mjav();

class Dyr
{
    public string Navn { get; set; }
}

class Kat : Dyr
{
    public void Mjav() { Console.WriteLine("Mjav"); }
}` },
      { t: "udfyld", q: "Lad `Laerer` arve fra `Person`.",
        kode: R`Laerer l = new Laerer();
l.Navn = "Karen";
l.Fag = "C#";
Console.WriteLine($"{l.Navn} underviser i {l.Fag}");

class Person
{
    public string Navn { get; set; }
}

class Laerer [[:]] [[Person]]
{
    public string Fag { get; set; }
}`,
        output: "Karen underviser i C#",
        fordi: "Kolon, og derefter navnet på basisklassen." },
      { t: "laes", h: "Testen: \"er en\"",
        md: "Hvornår skal man bruge arv? Brug **\"er en\"-testen**:\n\n- En hund **er et** dyr. ✔ Arv giver mening.\n- En lærer **er en** person. ✔\n- En bil **er en** motor? ✘ Nej — en bil **har en** motor. Det er komposition (modul 4), ikke arv.\n\nArv i flere led giver et **klassehierarki** — et stamtræ. En klasse kan kun have **én** basisklasse i C#, men en basisklasse kan have mange børn, og børnene kan selv få børn.",
        kode: R`Puddel p = new Puddel();
p.Navn = "Bella";
p.Spis();
p.Goe();
p.Klip();

class Dyr { public string Navn { get; set; } public void Spis() { Console.WriteLine($"{Navn} spiser"); } }
class Hund : Dyr { public void Goe() { Console.WriteLine("Vov"); } }
class Puddel : Hund { public void Klip() { Console.WriteLine($"{Navn} bliver klippet"); } }`,
        output: "Bella spiser\nVov\nBella bliver klippet" },
      { t: "valg", q: "Hvilket forhold skal laves med **arv**?",
        svar: ["En Lastbil og et Køretøj", "En Ordre og en Kunde", "En Bil og et Hjul", "Et Hus og en Adresse"],
        ret: 0, fordi: "En lastbil **er et** køretøj → arv. En ordre **har en** kunde, en bil **har** hjul, og et hus **har en** adresse → komposition." },
      { t: "skriv", q: "Klassen `Koeretoej` er lavet. Skriv en klasse `Cykel`, der arver fra `Koeretoej` og har en auto-property `int Gear`.",
        foer: R`Cykel c = new Cykel();
c.Maerke = "Kildemoes";
c.Gear = 7;
Console.WriteLine($"{c.Maerke} med {c.Gear} gear");

class Koeretoej
{
    public string Maerke { get; set; }
}`,
        tjek: [
          [/class Cykel:Koeretoej\{/, "Klassen skal arve: `class Cykel : Koeretoej`"],
          [/public int Gear\{get;set;\}/, "Tilføj `public int Gear { get; set; }`"],
          [/string Maerke/, "Skriv ikke `Maerke` igen — den er arvet", "ikke"]
        ],
        loesning: R`class Cykel : Koeretoej
{
    public int Gear { get; set; }
}`,
        output: "Kildemoes med 7 gear" },
      { t: "ide", h: "Skolens personer",
        md: "Lav et Console-projekt, `Skole`, med tre klasser i hver sin fil: `Person`, `Elev` og `Laerer`. {{Visual Studio||Rider}} lægger klasserne i `namespace Skole`, så Program.cs skal starte med `using Skole;` — ellers kan den ikke finde klasserne (fejl CS0246). Læg mærke til, at `Hils()` kun er skrevet ét sted.",
        kode: R`Elev e = new Elev { Navn = "Maja", Email = "maja@skole.dk", Klasse = "7.B" };
Laerer l = new Laerer { Navn = "Jens", Email = "jens@skole.dk", Loen = 42000 };

e.Hils();
l.Hils();
Console.WriteLine($"{e.Navn} går i {e.Klasse}");
Console.WriteLine($"{l.Navn} tjener {l.Loen} kr.");

class Person
{
    public string Navn { get; set; }
    public string Email { get; set; }

    public void Hils()
    {
        Console.WriteLine($"Hej, jeg hedder {Navn} ({Email})");
    }
}

class Elev : Person
{
    public string Klasse { get; set; }
}

class Laerer : Person
{
    public decimal Loen { get; set; }
}`,
        output: "Hej, jeg hedder Maja (maja@skole.dk)\nHej, jeg hedder Jens (jens@skole.dk)\nMaja går i 7.B\nJens tjener 42000 kr.",
        md2: "Udvid selv: tilføj en property `Telefon` i `Person`. Nu har både elever og lærere fået et telefonnummer — uden at du rørte deres klasser." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er arv, og hvornår giver det mening at bruge det?",
        svar: "Arv betyder, at en **afledt klasse** overtager alle felter, properties og metoder fra en **basisklasse** og kan lægge sine egne til. Det skrives `class Hund : Dyr`. Man bruger det til at **samle fælles kode ét sted**, så den ikke gentages. Det giver mening, når der er et **\"er en\"-forhold**: en hund *er et* dyr. Er forholdet \"har en\", bruger man komposition i stedet.",
        noegle: ["basisklasse", "afledt", "overtager", "fælles kode", "er en"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m05l2", titel: "protected, base og konstruktører i arv", min: 16,
    ord: [
      ["protected", "Access modifier mellem private og public: synlig i klassen selv og i de klasser, der arver fra den."],
      ["base", "Henviser til basisklassen. `base(...)` kalder basisklassens konstruktør. `base.Metode()` kalder basisklassens udgave af en metode."],
      ["Konstruktørkæde", "Når et objekt oprettes, kører basisklassens konstruktør først og derefter den afledte klasses."]
    ],
    trin: [
      { t: "laes", h: "Arver man også det private?",
        md: "Ja og nej. Et `private` felt **findes** i det afledte objekt, men den afledte klasses kode **må ikke røre det**. `private` betyder: kun den klasse, det står i.\n\nSkal børnene have lov, men ikke resten af verden, bruger man `protected`. Nu kender du tre niveauer:",
        noter: [
          ["private", "Kun klassen selv."],
          ["protected", "Klassen selv **og de klasser, der arver fra den**."],
          ["public", "Alle."]
        ],
        kode: R`Hund h = new Hund();
h.Loeb();
h.Loeb();
h.VisEnergi();

class Dyr
{
    protected int energi = 10;
}

class Hund : Dyr
{
    public void Loeb()
    {
        energi -= 3;
    }

    public void VisEnergi()
    {
        Console.WriteLine(energi);
    }
}`,
        output: "4",
        md2: "`Hund` må bruge `energi`, fordi feltet er `protected`. Udefra — fx `h.energi = 99;` — er det forbudt." },
      { t: "fejl",
        q: "Compileren melder fejl på linje 10: `'Konto.saldo' is inaccessible due to its protection level`. Linje 10 skal blive stående. Klik på den linje, der skal rettes.",
        kode: R`class Konto
{
    private decimal saldo;
}

class Opsparing : Konto
{
    public void TilskrivRente()
    {
        saldo = saldo * 1.02m;
    }
}`,
        linje: 3,
        fordi: "`saldo` er `private` i `Konto` (linje 3), så selv en klasse, der arver, må ikke røre det. Gør feltet `protected` — eller endnu bedre: giv `Konto` en metode, børnene kan kalde.",
        rettet: R`class Konto
{
    protected decimal saldo;
}

class Opsparing : Konto
{
    public void TilskrivRente()
    {
        saldo = saldo * 1.02m;
    }
}`,
        omkring: ["", "class __Start { static void Main() { } }"] },
      { t: "valg", q: "Et felt skal kunne bruges i klassen selv og i de klasser, der arver fra den — men ikke af andre. Hvilken access modifier?",
        svar: ["protected", "private", "public", "static"],
        ret: 0, fordi: "`protected` er netop \"mig og mine arvinger\". `private` lukker også arvingerne ude, og `public` lukker alle ind." },
      { t: "laes", h: "Konstruktører arves ikke",
        md: "Én ting får den afledte klasse **ikke** forærende: **konstruktørerne**. Hver klasse skal have sine egne.\n\nMen basisklassens del af objektet skal jo også gøres klar. Derfor **kalder den afledte konstruktør basisklassens konstruktør** med `: base(...)`.",
        kode: R`Elev e = new Elev("Maja", "7.B");
Console.WriteLine($"{e.Navn} går i {e.Klasse}");

class Person
{
    public string Navn { get; set; }

    public Person(string navn)
    {
        Navn = navn;
    }
}

class Elev : Person
{
    public string Klasse { get; set; }

    public Elev(string navn, string klasse) : base(navn)
    {
        Klasse = klasse;
    }
}`,
        noter: [
          [": base(navn)", "Send navnet videre til Persons konstruktør. Den klarer det, der har med Person at gøre."],
          ["Klasse = klasse;", "Elev klarer selv det, der er særligt for en elev."]
        ],
        output: "Maja går i 7.B",
        md2: "Det ligner `: this(...)` fra modul 4. Forskellen: `this` peger på en anden konstruktør i **samme** klasse, `base` på en konstruktør i **basisklassen**." },
      { t: "forudsig",
        kode: R`Hund h = new Hund();

class Dyr
{
    public Dyr()
    {
        Console.WriteLine("Dyr laves");
    }
}

class Hund : Dyr
{
    public Hund()
    {
        Console.WriteLine("Hund laves");
    }
}`,
        output: "Dyr laves\nHund laves",
        fordi: "**Basisklassens konstruktør kører altid først.** Først bygges fundamentet, så huset ovenpå. Står der ikke `: base(...)`, kalder compileren selv basisklassens konstruktør uden parametre." },
      { t: "fejl",
        kode: R`class Person
{
    public string Navn { get; set; }

    public Person(string navn)
    {
        Navn = navn;
    }
}

class Elev : Person
{
    public Elev()
    {
    }
}`,
        linje: 13,
        fordi: "`Person` har kun en konstruktør, der **kræver et navn**. `Elev`s konstruktør kalder ikke `base(...)`, så compileren prøver selv `base()` uden argumenter — og den findes ikke. Fejlen: `There is no argument given that corresponds to the required parameter 'navn'`.",
        rettet: R`class Person
{
    public string Navn { get; set; }

    public Person(string navn)
    {
        Navn = navn;
    }
}

class Elev : Person
{
    public Elev(string navn) : base(navn)
    {
    }
}`,
        omkring: ["", "class __Start { static void Main() { } }"] },
      { t: "udfyld", q: "Send mærket videre til basisklassens konstruktør.",
        kode: R`Bil b = new Bil("Volvo", 5);
Console.WriteLine($"{b.Maerke} med {b.Doere} døre");

class Koeretoej
{
    public string Maerke { get; set; }
    public Koeretoej(string maerke) { Maerke = maerke; }
}

class Bil : Koeretoej
{
    public int Doere { get; set; }

    public Bil(string maerke, int doere) : [[base]]([[maerke]])
    {
        Doere = doere;
    }
}`,
        output: "Volvo med 5 døre",
        fordi: "`: base(maerke)` kalder `Koeretoej`s konstruktør med mærket." },
      { t: "forudsig",
        kode: R`C c = new C();

class A
{
    public A() { Console.WriteLine("A"); }
}

class B : A
{
    public B() { Console.WriteLine("B"); }
}

class C : B
{
    public C() { Console.WriteLine("C"); }
}`,
        output: "A\nB\nC",
        fordi: "Konstruktørerne kører fra toppen af stamtræet og nedad: først A, så B, så C. Det kaldes **konstruktørkæden**." },
      { t: "skriv", q: "Skriv konstruktøren til `Laerer`. Den skal tage `string navn` og `string fag`, sende `navn` videre til `Person` med `base` og gemme `fag` i propertyen `Fag`.",
        foer: R`Laerer l = new Laerer("Jens", "Dansk");
Console.WriteLine($"{l.Navn}: {l.Fag}");

class Person
{
    public string Navn { get; set; }
    public Person(string navn) { Navn = navn; }
}

class Laerer : Person
{
    public string Fag { get; set; }`,
        efter: R`}`,
        tjek: [
          [/public Laerer\(string navn,string fag\)/, "Konstruktøren: `public Laerer(string navn, string fag)`"],
          [/\):base\(navn\)/, "Kald basisklassen: `: base(navn)`"],
          [/(this\.)?Fag=fag;/, "Gem faget: `Fag = fag;`"],
          [/[^.]Navn=navn;/, "Sæt ikke `Navn` selv — lad `Person`s konstruktør gøre det", "ikke"]
        ],
        loesning: R`    public Laerer(string navn, string fag) : base(navn)
    {
        Fag = fag;
    }`,
        output: "Jens: Dansk" },
      { t: "ide", h: "Medarbejdere med konstruktører",
        md: "Lav et Console-projekt, `Firma`. Sæt et **breakpoint** på linjen med `new Chef(...)`, start med {{**F5**||den **grønne bille** 🐞}}, og gå ét skridt ad gangen ind i koden med {{**F11** (Step Into)||knappen **Step Into** (pil ned) i Debug-vinduet}}. Så ser du med egne øjne, at basisklassens konstruktør kører først.",
        kode: R`Chef c = new Chef("Karen", 60000, 5);
Console.WriteLine($"{c.Navn} tjener {c.Loen} kr. og har {c.AntalAnsatte} ansatte");

class Medarbejder
{
    public string Navn { get; }
    public decimal Loen { get; protected set; }

    public Medarbejder(string navn, decimal loen)
    {
        Navn = navn;
        Loen = loen;
    }
}

class Chef : Medarbejder
{
    public int AntalAnsatte { get; }

    public Chef(string navn, decimal loen, int antalAnsatte) : base(navn, loen)
    {
        AntalAnsatte = antalAnsatte;
    }
}`,
        output: "Karen tjener 60000 kr. og har 5 ansatte" },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad gør `: base(...)` i en konstruktør, og i hvilken rækkefølge kører konstruktørerne?",
        svar: "`: base(...)` **kalder basisklassens konstruktør** og sender argumenter videre til den, så basisklassens del af objektet bliver initialiseret. Konstruktører arves ikke, så den afledte klasse skal selv have en. **Basisklassens konstruktør kører altid først**, derefter den afledte klasses. Skriver man ikke `base(...)`, kalder compileren selv basisklassens konstruktør uden parametre.",
        noegle: ["basisklassens konstruktør", "argumenter", "først", "arves ikke"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m05l3", titel: "virtual og override: gør det på din egen måde", min: 16,
    ord: [
      ["virtual", "Markerer en metode i basisklassen, som afledte klasser har lov til at erstatte."],
      ["override", "Erstatter en virtual metode fra basisklassen med den afledte klasses egen udgave."],
      ["Overskrive (override)", "At give en arvet metode ny opførsel i den afledte klasse. Må ikke forveksles med overloading."],
      ["Method hiding", "At skjule en arvet metode med `new` i stedet for at overskrive den. Giver forvirrende opførsel og bør undgås."]
    ],
    trin: [
      { t: "laes", h: "Samme metode, anden opførsel",
        md: "Alle dyr kan give lyd — men de gør det forskelligt. Den afledte klasse skal altså kunne **erstatte** en arvet metode med sin egen udgave. Det kræver to ord, der hører sammen:\n\n- I basisklassen: `virtual` — \"denne metode **må** erstattes\".\n- I den afledte klasse: `override` — \"her **erstatter** jeg den\".",
        kode: R`Dyr d = new Dyr();
Hund h = new Hund();
d.GivLyd();
h.GivLyd();

class Dyr
{
    public virtual void GivLyd()
    {
        Console.WriteLine("...");
    }
}

class Hund : Dyr
{
    public override void GivLyd()
    {
        Console.WriteLine("Vov");
    }
}`,
        noter: [
          ["public virtual void GivLyd()", "Basisklassen giver lov til, at metoden bliver erstattet."],
          ["public override void GivLyd()", "Hund bruger sin egen udgave. Navn, parametre og returtype skal være præcis de samme."]
        ],
        output: "...\nVov" },
      { t: "forudsig",
        kode: R`Kat k = new Kat();
Fisk f = new Fisk();
k.GivLyd();
f.GivLyd();

class Dyr
{
    public virtual void GivLyd() { Console.WriteLine("..."); }
}

class Kat : Dyr
{
    public override void GivLyd() { Console.WriteLine("Mjav"); }
}

class Fisk : Dyr
{
}`,
        output: "Mjav\n...",
        fordi: "`Kat` har overskrevet metoden. `Fisk` har ikke — så den bruger den udgave, den har arvet fra `Dyr`. `virtual` betyder **må** erstattes, ikke **skal**." },
      { t: "fejl",
        q: "Compileren melder fejl på linje 11: `cannot override inherited member 'Figur.Tegn()' because it is not marked virtual, abstract, or override`. `Cirkel` skal have lov til at overskrive `Tegn`. Klik på den linje, der skal rettes.",
        kode: R`class Figur
{
    public void Tegn()
    {
        Console.WriteLine("En figur");
    }
}

class Cirkel : Figur
{
    public override void Tegn()
    {
        Console.WriteLine("En cirkel");
    }
}`,
        linje: 3,
        fordi: "`Tegn` i `Figur` er ikke markeret `virtual`, så den må ikke overskrives. Compileren peger på override-linjen og siger: `cannot override inherited member 'Figur.Tegn()' because it is not marked virtual, abstract, or override`. Rettelsen laves i linje 3: tilføj `virtual`.",
        rettet: R`class Figur
{
    public virtual void Tegn()
    {
        Console.WriteLine("En figur");
    }
}

class Cirkel : Figur
{
    public override void Tegn()
    {
        Console.WriteLine("En cirkel");
    }
}`,
        omkring: ["", "class __Start { static void Main() { } }"] },
      { t: "udfyld", q: "Lad `Elbil` **overskrive** `Start` med sin egen udgave. Basisklassen skal give lov til det.",
        kode: R`Elbil e = new Elbil();
e.Start();

class Bil
{
    public [[virtual]] void Start()
    {
        Console.WriteLine("Brum");
    }
}

class Elbil : Bil
{
    public [[override]] void Start()
    {
        Console.WriteLine("Lydløs start");
    }
}`,
        output: "Lydløs start",
        fordi: "`virtual` i basisklassen giver lov. `override` i den afledte klasse erstatter." },
      { t: "laes", h: "base.Metode(): byg ovenpå i stedet for at erstatte",
        md: "Tit vil du ikke smide basisklassens udgave væk — du vil **udvide** den. Med `base.Metode()` kalder du basisklassens udgave inde fra din egen.",
        kode: R`Elev e = new Elev { Navn = "Maja", Klasse = "7.B" };
e.Vis();

class Person
{
    public string Navn { get; set; }

    public virtual void Vis()
    {
        Console.WriteLine($"Navn: {Navn}");
    }
}

class Elev : Person
{
    public string Klasse { get; set; }

    public override void Vis()
    {
        base.Vis();
        Console.WriteLine($"Klasse: {Klasse}");
    }
}`,
        noter: [
          ["base.Vis();", "Kør først Persons udgave — den skriver navnet."],
          ["Console.WriteLine($\"Klasse: …\")", "Læg så Elevs egen linje til."]
        ],
        output: "Navn: Maja\nKlasse: 7.B" },
      { t: "forudsig",
        kode: R`Chef c = new Chef();
Console.WriteLine(c.Loen());

class Ansat
{
    public virtual int Loen()
    {
        return 30000;
    }
}

class Chef : Ansat
{
    public override int Loen()
    {
        return base.Loen() + 20000;
    }
}`,
        output: "50000",
        fordi: "`Chef` kalder basisklassens udgave (30000) og lægger sit tillæg oveni." },
      { t: "laes", h: "ToString — nu giver det mening",
        md: "I modul 4 skrev du `public override string ToString()` uden at kende ordet `override`. Nu kan du se, hvad der foregår:\n\n**Alle klasser i C# arver automatisk fra en klasse, der hedder `object`.** Skriver du `class Person`, er det i virkeligheden `class Person : object`. Og i `object` findes en metode `public virtual string ToString()`.\n\nNår du skriver din egen `ToString`, **overskriver** du altså en arvet, virtual metode.",
        kode: R`Vare v = new Vare { Navn = "Kaffe", Pris = 45 };
Console.WriteLine(v);
object o = v;
Console.WriteLine(o.ToString());

class Vare
{
    public string Navn { get; set; }
    public decimal Pris { get; set; }

    public override string ToString()
    {
        return $"{Navn}: {Pris} kr.";
    }
}`,
        output: "Kaffe: 45 kr.\nKaffe: 45 kr." },
      { t: "laes", h: "Override er ikke overload",
        md: "To ord, der lyder ens og konstant bliver byttet om — også til eksamen:",
        noter: [
          ["Overloading", "Flere metoder med **samme navn, men forskellige parametre** — i samme klasse. Compileren vælger ud fra argumenterne. (Modul 3.)"],
          ["Overriding", "En afledt klasse **erstatter** en arvet metode med **præcis samme navn og parametre**. Kræver `virtual` og `override`."]
        ],
        md2: "Huskeregel: over**load** = *flere udgaver at vælge imellem*. Over**ride** = *kør hen over den gamle*." },
      { t: "valg", q: "Klassen `Cirkel` arver fra `Figur` og erstatter metoden `Areal()` med sin egen udgave med samme parametre. Hvad hedder det?",
        svar: ["Overriding", "Overloading", "Indkapsling", "Komposition"],
        ret: 0, fordi: "Samme navn og samme parametre, erstattet i en afledt klasse — det er **overriding**. Overloading er flere metoder med samme navn og **forskellige** parametre." },
      { t: "laes", h: "Hvis man glemmer override",
        md: "Skriver du en metode med samme navn i den afledte klasse **uden** `override`, bliver den arvede metode ikke erstattet — den bliver bare **skjult**. Compileren giver en advarsel og foreslår ordet `new`. Det hedder **method hiding**.\n\nBrug det ikke. Det opfører sig forvirrende, så snart objektet bliver brugt gennem en variabel af basisklassens type (næste lektion). Ser du advarslen `hides inherited member`, har du næsten altid glemt `virtual` og `override`." },
      { t: "skriv", q: "Giv `Elev` sin egen udgave af `Beskriv()`. Den skal returnere `\"Elev\"`. (Basisklassens metode er allerede `virtual`.)",
        foer: R`Elev e = new Elev();
Console.WriteLine(e.Beskriv());

class Person
{
    public virtual string Beskriv()
    {
        return "Person";
    }
}

class Elev : Person
{`,
        efter: R`}`,
        tjek: [
          [/public override string Beskriv\(\)/, "Signaturen: `public override string Beskriv()`"],
          [/return ?"Elev";|=>"Elev";/, "Returnér `\"Elev\"`"]
        ],
        forkert: ['public string Beskriv()\n{\n    return "Elev";\n}', 'public virtual string Beskriv()\n{\n    return "Elev";\n}'],
        loesning: R`    public override string Beskriv()
    {
        return "Elev";
    }`,
        output: "Elev" },
      { t: "ide", h: "Konti med forskellig rente",
        md: "Lav et Console-projekt, `Konti`. Tip: Skriv `override` og et mellemrum inde i den afledte klasse — så viser {{Visual Studio||Rider}} en liste over de metoder, du kan overskrive, og skriver skelettet for dig.",
        kode: R`Konto a = new Konto { Ejer = "Anna", Saldo = 1000 };
Opsparing b = new Opsparing { Ejer = "Bo", Saldo = 1000 };

a.TilskrivRente();
b.TilskrivRente();
Console.WriteLine(a);
Console.WriteLine(b);

class Konto
{
    public string Ejer { get; set; }
    public decimal Saldo { get; set; }

    public virtual void TilskrivRente()
    {
        Saldo += Saldo * 0.01m;
    }

    public override string ToString()
    {
        return $"{Ejer}: {Saldo} kr.";
    }
}

class Opsparing : Konto
{
    public override void TilskrivRente()
    {
        base.TilskrivRente();
        Saldo += 50;
    }

    public override string ToString()
    {
        return "Opsparing — " + base.ToString();
    }
}`,
        output: "Anna: 1010,00 kr.\nOpsparing — Bo: 1060,00 kr." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad betyder `virtual` og `override`, og hvad er forskellen på overriding og overloading?",
        svar: "`virtual` står i **basisklassen** og betyder, at metoden **må erstattes** i afledte klasser. `override` står i den **afledte klasse** og betyder, at den **erstatter** basisklassens udgave med sin egen — med præcis samme navn og parametre. **Overloading** er noget andet: flere metoder med samme navn, men **forskellige parametre**, hvor compileren vælger ud fra argumenterne.",
        noegle: ["basisklassen", "må erstattes", "afledte", "samme navn og parametre", "forskellige parametre"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m05l4", titel: "Polymorfi: ét kald, mange former", min: 18,
    ord: [
      ["Polymorfi", "\"Mange former\": det samme metodekald giver forskellig opførsel, alt efter hvilken slags objekt der faktisk ligger i variablen."],
      ["Upcast", "At lægge et afledt objekt i en variabel af basisklassens type. Sker automatisk og er altid sikkert."],
      ["Downcast", "At gå den anden vej: fra basisklassens type til den afledte. Skal skrives selv og kan fejle."],
      ["is", "Tjekker, om et objekt er af en bestemt type. Kan samtidig lægge det i en ny variabel: `if (d is Hund h)`."],
      ["as", "Prøver at lave et objekt om til en type. Giver null i stedet for at fejle, hvis det ikke kan lade sig gøre."],
      ["Statisk type / dynamisk type", "Statisk type er variablens type. Dynamisk type er typen på det objekt, der faktisk ligger i den, mens programmet kører."]
    ],
    trin: [
      { t: "laes", h: "En hund kan ligge i en Dyr-variabel",
        md: "En hund **er et** dyr. Derfor må et `Hund`-objekt gerne lægges i en variabel af typen `Dyr`. Det hedder et **upcast**, og det sker helt af sig selv.",
        kode: R`Dyr d = new Hund();
d.GivLyd();

class Dyr
{
    public virtual void GivLyd() { Console.WriteLine("..."); }
}

class Hund : Dyr
{
    public override void GivLyd() { Console.WriteLine("Vov"); }
}`,
        output: "Vov",
        md2: "Her er pointen: variablen har typen `Dyr`, men der skrives `Vov`. **Det er objektets rigtige type, der bestemmer, hvilken udgave af en virtual metode der kører** — ikke variablens type.\n\nDet er **polymorfi**: ordet er græsk og betyder \"mange former\"." },
      { t: "forudsig",
        kode: R`Dyr a = new Kat();
Dyr b = new Hund();
Dyr c = new Dyr();
a.GivLyd();
b.GivLyd();
c.GivLyd();

class Dyr
{
    public virtual void GivLyd() { Console.WriteLine("..."); }
}
class Hund : Dyr
{
    public override void GivLyd() { Console.WriteLine("Vov"); }
}
class Kat : Dyr
{
    public override void GivLyd() { Console.WriteLine("Mjav"); }
}`,
        output: "Mjav\nVov\n...",
        fordi: "Alle tre variabler har typen `Dyr`, men objekterne er forskellige. Hvert objekt svarer på sin egen måde." },
      { t: "laes", h: "Hvorfor er det så smart?",
        md: "Fordi du nu kan lave **én samling af basisklassens type** og behandle alle objekterne ens — uden at vide, præcis hvad de er.",
        kode: R`Dyr[] dyr = { new Hund(), new Kat(), new Ko() };

foreach (Dyr d in dyr)
{
    d.GivLyd();
}

class Dyr
{
    public virtual void GivLyd() { Console.WriteLine("..."); }
}
class Hund : Dyr { public override void GivLyd() { Console.WriteLine("Vov"); } }
class Kat : Dyr { public override void GivLyd() { Console.WriteLine("Mjav"); } }
class Ko : Dyr { public override void GivLyd() { Console.WriteLine("Muh"); } }`,
        output: "Vov\nMjav\nMuh",
        md2: "Løkken indeholder ikke en eneste `if`. Kommer der en `Gris` til i morgen, skal løkken **ikke ændres** — du laver bare en ny klasse med sin egen `GivLyd`.\n\nUden polymorfi måtte du skrive en lang kæde af `if (det er en hund) … else if (det er en kat) …` og rette i den, hver gang der kom et nyt dyr." },
      { t: "forudsig",
        kode: R`Figur[] figurer = { new Kvadrat(), new Figur(), new Kvadrat() };
int sum = 0;

foreach (Figur f in figurer)
{
    sum += f.Kanter();
}
Console.WriteLine(sum);

class Figur
{
    public virtual int Kanter() { return 0; }
}
class Kvadrat : Figur
{
    public override int Kanter() { return 4; }
}`,
        output: "8",
        fordi: "To kvadrater giver 4 hver, og den almindelige figur giver 0." },
      { t: "laes", h: "Variablens type bestemmer, hvad du må kalde",
        md: "Der er to typer i spil, og du skal kunne skelne dem:\n\n- **Variablens type** (den *statiske* type) bestemmer, **hvilke medlemmer du må skrive** efter punktummet. Det tjekker compileren.\n- **Objektets type** (den *dynamiske* type) bestemmer, **hvilken udgave** af en virtual metode der kører.",
        kode: R`Dyr d = new Hund();
d.GivLyd();
// d.HentPind();   <- må ikke: variablen er et Dyr

class Dyr
{
    public virtual void GivLyd() { Console.WriteLine("..."); }
}
class Hund : Dyr
{
    public override void GivLyd() { Console.WriteLine("Vov"); }
    public void HentPind() { Console.WriteLine("Henter pind"); }
}`,
        output: "Vov",
        md2: "Objektet **er** en hund og kan sagtens hente pinde. Men gennem en `Dyr`-variabel kan compileren kun se det, alle dyr kan." },
      { t: "fejl",
        q: "Compileren melder fejl på linje 3: `'Person' does not contain a definition for 'Klasse'`. Klasserne er rigtige, og linje 3 skal blive stående. Klik på den linje, der skal rettes.",
        kode: R`Person p = new Elev();
p.Navn = "Maja";
p.Klasse = "7.B";

class Person
{
    public string Navn { get; set; }
}

class Elev : Person
{
    public string Klasse { get; set; }
}`,
        linje: 1,
        fordi: "Linje 1 giver variablen `p` typen `Person`, og en `Person` har ingen `Klasse`. At objektet i virkeligheden er en `Elev`, hjælper ikke — compileren kigger kun på variablens type. Fejlen: `'Person' does not contain a definition for 'Klasse'`.",
        rettet: R`Elev p = new Elev();
p.Navn = "Maja";
p.Klasse = "7.B";

class Person
{
    public string Navn { get; set; }
}

class Elev : Person
{
    public string Klasse { get; set; }
}` },
      { t: "laes", h: "is: er det en hund?",
        md: "Nogle gange har du brug for at komme tilbage til den rigtige type. Med `is` spørger du, om objektet er af en bestemt type — og får det samtidig lagt i en **ny variabel af den type**.",
        kode: R`Dyr d = new Hund();

if (d is Hund h)
{
    h.HentPind();
}

if (d is Kat)
{
    Console.WriteLine("Det er en kat");
}
else
{
    Console.WriteLine("Det er ikke en kat");
}

class Dyr { }
class Hund : Dyr { public void HentPind() { Console.WriteLine("Henter pind"); } }
class Kat : Dyr { }`,
        noter: [
          ["d is Hund h", "Er objektet i d en Hund? Hvis ja: læg det i variablen h, som har typen Hund."],
          ["d is Kat", "Kan også bruges som et rent spørgsmål uden ny variabel."]
        ],
        output: "Henter pind\nDet er ikke en kat" },
      { t: "udfyld", q: "Kun eleverne skal have skrevet deres klasse ud.",
        kode: R`Person[] alle = { new Elev { Navn = "Maja", Klasse = "7.B" }, new Person { Navn = "Jens" } };

foreach (Person p in alle)
{
    if (p [[is]] Elev [[e]])
    {
        Console.WriteLine($"{e.Navn} går i {e.Klasse}");
    }
}

class Person { public string Navn { get; set; } }
class Elev : Person { public string Klasse { get; set; } }`,
        output: "Maja går i 7.B",
        fordi: "`p is Elev e` tjekker typen og giver en `Elev`-variabel `e`, som har propertyen `Klasse`." },
      { t: "laes", h: "Cast og as",
        md: "Der er to andre måder at gå fra basisklasse til afledt klasse (**downcast**). Du skal kunne læse dem:",
        kode: R`Dyr d = new Hund();

Hund h1 = (Hund)d;
h1.HentPind();

Kat k = d as Kat;
Console.WriteLine(k == null);

class Dyr { }
class Hund : Dyr { public void HentPind() { Console.WriteLine("Henter pind"); } }
class Kat : Dyr { }`,
        noter: [
          ["(Hund)d", "Et **cast**: \"jeg lover, at det er en hund\". Er det ikke sandt, går programmet ned med en `InvalidCastException`."],
          ["d as Kat", "Prøver forsigtigt. Kan det ikke lade sig gøre, får du `null` i stedet for et nedbrud."]
        ],
        output: "Henter pind\nTrue",
        md2: "`is` med en variabel er det sikreste og det, man normalt bruger i dag." },
      { t: "valg", q: "`Dyr d = new Kat();` — hvad sker der ved `Hund h = (Hund)d;`?",
        svar: ["Programmet går ned med en InvalidCastException, mens det kører", "Compileren nægter at oversætte koden", "h bliver null", "Katten bliver lavet om til en hund"],
        ret: 0, fordi: "Compileren kan ikke vide, hvad der ligger i `d`, så den accepterer castet. Når programmet kører, viser objektet sig at være en kat — og en kat er ikke en hund. Med `as` havde du fået `null`. Med `is` havde du fået `false`." },
      { t: "skriv", q: "Skriv en `foreach`, der går arrayet `figurer` igennem og kalder `Tegn()` på hver figur. Kald løkkevariablen `f`.",
        foer: R`Figur[] figurer = { new Cirkel(), new Firkant(), new Cirkel() };`,
        efter: R`class Figur { public virtual void Tegn() { Console.WriteLine("?"); } }
class Cirkel : Figur { public override void Tegn() { Console.WriteLine("O"); } }
class Firkant : Figur { public override void Tegn() { Console.WriteLine("[]"); } }`,
        tjek: [
          [/foreach\((Figur|var) f in figurer\)/, "Løkken: `foreach (Figur f in figurer)`"],
          ["f.Tegn();", "Kald `f.Tegn();` i løkken"],
          [/if\(/, "Du behøver ingen `if` — polymorfien vælger selv den rigtige udgave", "ikke"]
        ],
        loesning: R`foreach (Figur f in figurer)
{
    f.Tegn();
}`,
        output: "O\n[]\nO" },
      { t: "ide", h: "Lønkørsel med polymorfi",
        md: "Lav et Console-projekt, `Loen`. Én løkke beregner løn for alle — uanset type. Tilføj bagefter en ny klasse `Praktikant`, der får 15.000 kr., og læg en praktikant i arrayet. Læg mærke til, at **løkken ikke skal ændres**.",
        kode: R`Ansat[] ansatte =
{
    new Ansat("Anna", 30000),
    new Saelger("Bo", 25000, 80000),
    new Chef("Karen", 45000)
};

decimal total = 0;
foreach (Ansat a in ansatte)
{
    Console.WriteLine($"{a.Navn}: {a.BeregnLoen()} kr.");
    total += a.BeregnLoen();
}
Console.WriteLine($"I alt: {total} kr.");

class Ansat
{
    public string Navn { get; }
    protected decimal grundloen;

    public Ansat(string navn, decimal grundloen)
    {
        Navn = navn;
        this.grundloen = grundloen;
    }

    public virtual decimal BeregnLoen()
    {
        return grundloen;
    }
}

class Saelger : Ansat
{
    private decimal salg;

    public Saelger(string navn, decimal grundloen, decimal salg) : base(navn, grundloen)
    {
        this.salg = salg;
    }

    public override decimal BeregnLoen()
    {
        return grundloen + salg * 0.05m;
    }
}

class Chef : Ansat
{
    public Chef(string navn, decimal grundloen) : base(navn, grundloen) { }

    public override decimal BeregnLoen()
    {
        return base.BeregnLoen() + 10000;
    }
}`,
        output: "Anna: 30000 kr.\nBo: 29000,00 kr.\nKaren: 55000 kr.\nI alt: 114000,00 kr." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er polymorfi, og hvorfor er det nyttigt? Brug et eksempel.",
        svar: "Polymorfi betyder \"mange former\": **det samme metodekald giver forskellig opførsel, alt efter hvilken type objektet faktisk har**. Fx kan en `Dyr`-variabel pege på en `Hund` eller en `Kat`, og `GivLyd()` kører så objektets egen udgave. Det kræver arv samt `virtual` og `override`. Det er nyttigt, fordi man kan behandle **forskellige objekter ens** — fx i én løkke over et array af basisklassens type — og **tilføje nye klasser uden at ændre den eksisterende kode**.",
        noegle: ["samme kald", "forskellig opførsel", "objektets type", "virtual", "override", "uden at ændre"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m05l5", titel: "object, sealed — og arv eller komposition?", min: 14,
    ord: [
      ["object", "Den klasse, alle andre klasser i C# arver fra — direkte eller indirekte."],
      ["Equals", "Metode fra object, der afgør, om to objekter regnes for ens. Standard: kun hvis det er det samme objekt."],
      ["GetHashCode", "Metode fra object, der giver et tal for objektet. Bruges af bl.a. Dictionary. Skal overskrives sammen med Equals."],
      ["sealed", "Forsegler en klasse, så ingen kan arve fra den — eller en metode, så den ikke kan overskrives længere nede."],
      ["Komposition frem for arv", "Tommelfingerregel: brug \"har en\" (komposition), medmindre der er et ægte \"er en\"-forhold."]
    ],
    trin: [
      { t: "laes", h: "object: alles stamfar",
        md: "Du så det kort i forrige lektion: **alle klasser arver fra `object`**. Derfor har ethvert objekt nogle metoder, du aldrig selv har skrevet. De tre vigtigste:",
        noter: [
          ["ToString()", "Objektet som tekst. Standard: klassens navn."],
          ["Equals(andet)", "Er de to objekter ens? Standard: kun hvis det er **det samme objekt**."],
          ["GetHashCode()", "Et tal, der bruges, når objekter lægges i fx en Dictionary (modul 6)."]
        ],
        kode: R`object[] ting = { 42, "tekst", 3.5, new Person() };

foreach (object o in ting)
{
    Console.WriteLine(o.GetType().Name);
}

class Person { }`,
        output: "Int32\nString\nDouble\nPerson",
        md2: "Fordi alt er et `object`, kan en `object`-variabel indeholde **hvad som helst**. `GetType().Name` afslører den rigtige type. (`Int32` er det officielle navn på `int`.)" },
      { t: "laes", h: "Hvornår er to objekter ens?",
        md: "Du har to `Person`-objekter med samme navn. Er de ens? Ikke ifølge standardudgaven af `Equals` — og heller ikke `==`. De sammenligner **referencer**: peger de to variabler på **det samme objekt**?",
        kode: R`Person a = new Person { Navn = "Anna" };
Person b = new Person { Navn = "Anna" };
Person c = a;

Console.WriteLine(a == b);
Console.WriteLine(a.Equals(b));
Console.WriteLine(a == c);

class Person
{
    public string Navn { get; set; }
}`,
        output: "False\nFalse\nTrue",
        md2: "`a` og `b` er to forskellige objekter, selvom indholdet er ens. `a` og `c` er det samme objekt.\n\nVil du have, at to personer med samme CPR-nummer regnes for ens, kan du overskrive `Equals` (og så også `GetHashCode`). Det får du sjældent brug for selv — men du skal vide, at standarden er **reference-lighed**. Tekst er en undtagelse: to strings med samme indhold er ens med `==`." },
      { t: "forudsig",
        kode: R`Bil x = new Bil { Nr = "AB12345" };
Bil y = x;
Bil z = new Bil { Nr = "AB12345" };

Console.WriteLine(x == y);
Console.WriteLine(x == z);
Console.WriteLine(x.Nr == z.Nr);

class Bil
{
    public string Nr { get; set; }
}`,
        output: "True\nFalse\nTrue",
        fordi: "`x` og `y` peger på samme objekt. `z` er et andet objekt, selvom nummerpladen er den samme. I sidste linje sammenlignes to **strings**, og de sammenlignes på indholdet." },
      { t: "laes", h: "sealed: her stopper arven",
        md: "Med `sealed` forsegler du en klasse, så **ingen kan arve fra den**. Det bruges, når en klasse ikke er tænkt til at blive bygget videre på. `string` er fx sealed.",
        kode: R`sealed class Betaling
{
    public decimal Beloeb { get; set; }
}`,
        omkring: ["", "class __Start { static void Main() { } }"],
        md2: "`class SnydeBetaling : Betaling { }` ville give fejlen `cannot derive from sealed type 'Betaling'`." },
      { t: "laes", h: "Arv er ikke altid svaret",
        md: "Arv er stærkt, men det binder klasserne hårdt sammen: ændrer du basisklassen, rammer det alle børnene. Erfarne udviklere har en tommelfingerregel:\n\n**Foretræk komposition frem for arv.**\n\nBrug kun arv, når der er et ægte **\"er en\"**-forhold, og børnene virkelig skal kunne bruges alle de steder, basisklassen kan. Vil du bare genbruge noget kode, så lad klassen **have** et objekt af den anden type i stedet.",
        noter: [
          ["Arv: \"er en\"", "`class Elev : Person` — en elev kan bruges overalt, hvor der forventes en person."],
          ["Komposition: \"har en\"", "`class Ordre { public Kunde Kunde { get; set; } }` — en ordre er ikke en kunde, den har en."]
        ] },
      { t: "valg", q: "En `Bil` skal kunne bruge en `Motor`s metode `Start()`. Hvad er det bedste design?",
        svar: ["Bil har en property af typen Motor og kalder Motor.Start() (komposition)", "class Bil : Motor (arv)", "class Motor : Bil (arv)", "Kopiér koden fra Start() ind i Bil"],
        ret: 0, fordi: "En bil **er ikke** en motor — den **har** en. Med komposition kan motoren også skiftes ud med en anden, uden at `Bil` skal laves om." },
      { t: "orden", q: "Byg et lille hierarki: `Dyr` med en virtual metode og `Fugl`, der overskriver den. Sæt linjerne i rækkefølge.", alt: [[4, 5, 6, 7, 0, 1, 2, 3]],
        linjer: ["class Dyr", "{", R`    public virtual string Lyd() { return "..."; }`, "}", "class Fugl : Dyr", "{", R`    public override string Lyd() { return "Pip"; }`, "}"],
        omkring: ["Console.WriteLine(new Fugl().Lyd());", ""],
        output: "Pip",
        fordi: "Basisklassen først med `virtual`, derefter den afledte klasse med kolon og `override`." },
      { t: "ide", h: "Samlet øvelse: en zoologisk have",
        md: "Lav et Console-projekt, `Zoo`. Det samler hele modulet: arv, `base`-konstruktør, `protected`, `virtual`/`override`, `ToString`, polymorfi og `is`.",
        kode: R`Dyr[] zoo =
{
    new Loeve("Simba", 190),
    new Papegoeje("Polly", "Goddag!"),
    new Loeve("Nala", 126)
};

foreach (Dyr d in zoo)
{
    Console.WriteLine(d);
    d.GivLyd();

    if (d is Papegoeje p)
    {
        p.Tal();
    }
}

class Dyr
{
    protected string navn;

    public Dyr(string navn)
    {
        this.navn = navn;
    }

    public virtual void GivLyd()
    {
        Console.WriteLine("  ...");
    }

    public override string ToString()
    {
        return $"{GetType().Name} ved navn {navn}";
    }
}

class Loeve : Dyr
{
    public int Vaegt { get; }

    public Loeve(string navn, int vaegt) : base(navn)
    {
        Vaegt = vaegt;
    }

    public override void GivLyd()
    {
        Console.WriteLine("  Brøl!");
    }

    public override string ToString()
    {
        return base.ToString() + $" ({Vaegt} kg)";
    }
}

class Papegoeje : Dyr
{
    private string saetning;

    public Papegoeje(string navn, string saetning) : base(navn)
    {
        this.saetning = saetning;
    }

    public override void GivLyd()
    {
        Console.WriteLine("  Skræp!");
    }

    public void Tal()
    {
        Console.WriteLine($"  {navn} siger: {saetning}");
    }
}`,
        output: "Loeve ved navn Simba (190 kg)\n  Brøl!\nPapegoeje ved navn Polly\n  Skræp!\n  Polly siger: Goddag!\nLoeve ved navn Nala (126 kg)\n  Brøl!",
        md2: "Udvid selv: tilføj en `Slange`, der ikke overskriver `GivLyd`. Hvad skriver den?" },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er forskellen på arv og komposition, og hvornår vælger du hvad?",
        svar: "**Arv** er et **\"er en\"**-forhold: `Elev : Person`. Den afledte klasse overtager alt fra basisklassen og kan bruges alle steder, hvor basisklassen forventes — det giver polymorfi. **Komposition** er et **\"har en\"**-forhold: en `Ordre` har en `Kunde` som property. Arv binder klasserne tæt sammen, så jeg bruger det kun, når der er et ægte \"er en\"-forhold. Ellers foretrækker jeg **komposition**, fordi det er mere fleksibelt og lettere at ændre.",
        noegle: ["er en", "har en", "polymorfi", "tæt", "fleksibel"] },
      { t: "forklar", q: "Eksamensspørgsmål: Nævn de fire søjler i objektorienteret programmering, og forklar de tre, du har lært indtil nu.",
        svar: "De fire er **indkapsling, arv, polymorfi og abstraktion**. **Indkapsling**: data skjules med `private` og nås gennem properties og metoder, så klassen selv kan sikre, at data er gyldige. **Arv**: en klasse bygger videre på en anden (`class Hund : Dyr`) og genbruger dens kode. **Polymorfi**: det samme kald, fx `GivLyd()`, giver forskellig opførsel afhængigt af objektets rigtige type, via `virtual` og `override`.",
        noegle: ["indkapsling", "arv", "polymorfi", "abstraktion", "private", "virtual"] }
    ] }
  ]
});
})();
