// Modul 4 — Klasser og objekter. Forudsætter: modul 0–3.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m04", nr: 4, del: "Del 2 · Objektorienteret C#", ikon: "🏗️",
  titel: "Klasser og objekter",
  dag: "Kursusdag 1–2 · Introduktion til OOP",
  intro: "Nu begynder det, kurset egentlig handler om: **objektorienteret programmering** (OOP). Du lærer at lave dine egne typer — `Kunde`, `Produkt`, `Ordre` — der både indeholder data og kan gøre noget.\n\nDet er sådan, hele dit eksamensprojekt bliver bygget op. Og det er det første, du bliver spurgt om til eksamen.",
  video: ["01_Mandag_Introduction.mp4 (3 t 18 min)", "02_Tirsdag.mp4 (3 t 58 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m04l1", titel: "Klasse og objekt: tegning og hus", min: 16,
    ord: [
      ["Objektorienteret programmering (OOP)", "En måde at bygge programmer på, hvor man samler data og den kode, der arbejder med dataene, i objekter."],
      ["Klasse", "En skabelon (en tegning), der beskriver, hvilke data og hvilke metoder en bestemt slags ting har."],
      ["Objekt", "En konkret ting lavet ud fra en klasse. Hvert objekt har sine egne værdier."],
      ["Instans", "Et andet ord for objekt. At instantiere = at oprette et objekt."],
      ["Felt", "En variabel, der hører til en klasse. Hvert objekt har sit eget sæt af felter."],
      ["new", "Opretter et nyt objekt ud fra en klasse."],
      ["Punktum-notation", "Man skriver objektets navn, et punktum og så det felt eller den metode, man vil have fat i."]
    ],
    trin: [
      { t: "laes", h: "Problemet: ting, der hører sammen",
        md: "Et program skal holde styr på personer. Hver person har et navn, en alder og en by. Med det, du kan nu, skulle du lave tre arrays og håbe, at plads 0 i dem alle handler om den samme person. Det bliver hurtigt noget rod.\n\nI **objektorienteret programmering** (OOP) samler man i stedet det, der hører sammen, i **én ting**. Du laver din **egen type**: en `Person`, der selv ved, hvad den hedder, og hvor gammel den er." },
      { t: "laes", h: "Klassen er tegningen. Objektet er huset.",
        md: "To ord skal sidde på rygraden:\n\n- En **klasse** er en **skabelon**. Den beskriver, hvad en person *har*. Som en arkitekttegning af et hus.\n- Et **objekt** er en **konkret ting**, lavet ud fra skabelonen. Som et rigtigt hus, bygget efter tegningen.\n\nUd fra én tegning kan man bygge mange huse. Ud fra én klasse kan man lave mange objekter — og hvert objekt har **sine egne værdier**.",
        kode: R`Person p = new Person();
p.Navn = "Peter";
p.Alder = 25;
Console.WriteLine(p.Navn);

class Person
{
    public string Navn;
    public int Alder;
}`,
        noter: [
          ["class Person { … }", "Klassen: skabelonen. Den siger, at en Person har et Navn og en Alder."],
          ["public string Navn;", "Et **felt**: en variabel, der hører til klassen. `public` betyder, at andre må bruge det."],
          ["new Person()", "Byg et nyt objekt ud fra skabelonen."],
          ["Person p =", "Variablen p har typen Person og holder fast i objektet."],
          ["p.Navn = \"Peter\"", "Punktum: gå ind i objektet p, og sæt dets Navn."]
        ],
        output: "Peter" },
      { t: "valg", q: "Hvad er forskellen på en klasse og et objekt?",
        svar: ["Klassen er skabelonen. Objektet er en konkret ting, lavet ud fra skabelonen, med sine egne værdier.", "Der er ingen forskel — det er to ord for det samme", "Objektet er skabelonen, og klassen er den konkrete ting", "En klasse kan kun bruges til ét objekt"],
        ret: 0, fordi: "Klassen `Person` beskriver, hvad alle personer har. Objekterne er de enkelte personer: Peter på 25, Anna på 31 … Det spørgsmål får du næsten med sikkerhed til eksamen." },
      { t: "forudsig",
        kode: R`Bil a = new Bil();
a.Maerke = "Volvo";
a.Aar = 2018;

Bil b = new Bil();
b.Maerke = "Tesla";
b.Aar = 2023;

Console.WriteLine(a.Maerke);
Console.WriteLine(b.Aar);

class Bil
{
    public string Maerke;
    public int Aar;
}`,
        output: "Volvo\n2023",
        fordi: "Der er lavet **to objekter** ud fra den samme klasse. Hvert objekt har sit eget `Maerke` og sit eget `Aar`. At sætte `b.Maerke` ændrer ikke `a.Maerke`." },
      { t: "udfyld", q: "Opret et objekt af klassen `Hund`, og giv det et navn.",
        kode: R`Hund h = [[new]] Hund();
h[[.]]Navn = "Fido";
Console.WriteLine(h.Navn);

[[class]] Hund
{
    public string Navn;
}`,
        output: "Fido",
        fordi: "`new` opretter objektet. Punktummet giver adgang til feltet. Og skabelonen begynder med ordet `class`." },
      { t: "laes", h: "Hvor skrives klassen?",
        md: "I de små eksempler her står klassen **nederst i samme fil**, så du kan se det hele på én gang. I den korte skrivemåde skal klasser stå **efter** de almindelige ordrer.\n\nI rigtige projekter får **hver klasse sin egen fil**, der hedder det samme som klassen: klassen `Person` ligger i `Person.cs`.",
        win: ["Højreklik på projektet i **Solution Explorer** (ikke på Solution-linjen øverst).", "Vælg **Add → Class…**", "Skriv `Person.cs`, og klik **Add**.", "Visual Studio laver filen med en tom klasse `Person`."],
        mac: ["Højreklik på projektet i vinduet **Explorer** til venstre.", "Vælg **Add → Class/Interface…** (i nogle versioner **New → C# Class**).", "Skriv `Person`, og tryk Enter.", "Rider laver filen `Person.cs` med en tom klasse `Person`."],
        md2: "Klassenavne skrives med **PascalCase** og i **ental**: `Person`, `Produkt`, `OrdreLinje`.\n\n**Vigtigt:** {{Visual Studio||Rider}} lægger den nye klasse i et **namespace** med projektets navn (fx `namespace Bibliotek`). Derfor skal du skrive `using` og projektets navn som den **første linje i Program.cs** — fx `using Bibliotek;`. Ellers kan Program.cs ikke finde klassen, og du får fejlen `CS0246: The type or namespace name 'Person' could not be found`. Hvad et namespace er, forklares i lektion 6." },
      { t: "fejl",
        kode: R`Kat k;
k.Navn = "Mis";
Console.WriteLine(k.Navn);

class Kat
{
    public string Navn;
}`,
        linje: 2,
        fordi: "Variablen `k` er erklæret, men der er aldrig lavet et objekt — der mangler `new Kat()`. En variabel uden objekt er som en adresse uden hus. Compileren siger: `Use of unassigned local variable 'k'`.",
        rettet: R`Kat k = new Kat();
k.Navn = "Mis";
Console.WriteLine(k.Navn);

class Kat
{
    public string Navn;
}` },
      { t: "skriv", q: "Klassen `Bog` er lavet nedenunder. Opret et objekt i en variabel, der hedder `b`, sæt `Titel` til `\"Dune\"` og `Sider` til `600`, og skriv titlen ud.",
        efter: R`class Bog
{
    public string Titel;
    public int Sider;
}`,
        tjek: [
          [/(Bog|var) b=new( Bog)?\(\);/, "Opret objektet: `Bog b = new Bog();`"],
          ['b.Titel = "Dune";', "Sæt titlen: `b.Titel = \"Dune\";`"],
          ["b.Sider = 600;", "Sæt sidetallet: `b.Sider = 600;`"],
          ["Console.WriteLine(b.Titel);", "Skriv titlen ud: `Console.WriteLine(b.Titel);`"]
        ],
        loesning: R`Bog b = new Bog();
b.Titel = "Dune";
b.Sider = 600;
Console.WriteLine(b.Titel);`,
        output: "Dune" },
      { t: "laes", h: "Objekter i et array",
        md: "En klasse er en **type**, præcis som `int` og `string`. Du kan derfor lave et array af objekter — og gå dem igennem med `foreach`.",
        kode: R`Person a = new Person();
a.Navn = "Anna";
a.Alder = 31;

Person b = new Person();
b.Navn = "Bo";
b.Alder = 17;

Person[] personer = { a, b };

foreach (Person p in personer)
{
    Console.WriteLine($"{p.Navn} er {p.Alder} år");
}

class Person
{
    public string Navn;
    public int Alder;
}`,
        output: "Anna er 31 år\nBo er 17 år",
        md2: "Nu hænger navn og alder sammen — de bor i det samme objekt. Det er det, OOP løser." },
      { t: "ide", h: "Din første klasse i sin egen fil",
        md: "Lav et Console-projekt, `Bibliotek`. Tilføj en klasse `Bog` i sin egen fil (se trin 6). Giv den tre felter, og brug den fra **Program.cs**.",
        kode: R`// Filen Bog.cs
class Bog
{
    public string Titel;
    public string Forfatter;
    public int Sider;
}`,
        omkring: ["", "class __Start { static void Main() { } }"],
        md2: "I **Program.cs** skriver du:\n\n`using Bibliotek;`\n`Bog b = new Bog();`\n`b.Titel = \"Dune\";`\n`b.Forfatter = \"Frank Herbert\";`\n`b.Sider = 600;`\n`Console.WriteLine($\"{b.Titel} af {b.Forfatter}, {b.Sider} sider\");`\n\nLav en bog mere, og skriv den også ud. Når {{Visual Studio||Rider}} laver filen, pakker den klassen ind i `namespace Bibliotek` og skriver {{`internal`||`public`}} foran. Lad det bare stå — det forklares i lektion 6. Det er derfor, Program.cs skal starte med `using Bibliotek;` (se trin 6).\n\nMåske får felterne `Titel` og `Forfatter` en {{grøn bølgestreg||bølgestreg, der ikke er rød,}} med en advarsel om *non-nullable*. Det er en advarsel, ikke en fejl. Den forklares i modul 7." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er en klasse, og hvad er et objekt? Brug et eksempel.",
        svar: "En **klasse** er en **skabelon**, der beskriver, hvilke data (felter) og hvilke metoder en slags ting har — fx klassen `Bil` med mærke og årgang. Et **objekt** er en **konkret instans** af klassen, lavet med `new`, med sine egne værdier — fx en Volvo fra 2018. Man kan lave mange objekter ud fra én klasse.",
        noegle: ["skabelon", "instans", "new", "egne værdier", "felter"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m04l2", titel: "Objekter, der kan gøre noget", min: 15,
    ord: [
      ["Instansmetode", "En metode, der hører til et objekt og arbejder med objektets egne felter. Skrives uden `static`."],
      ["Tilstand", "De værdier, et objekts felter har lige nu."],
      ["Adfærd", "Det, et objekt kan gøre — dets metoder."],
      ["this", "Betyder \"det objekt, metoden lige nu arbejder på\"."],
      ["Medlem", "Fællesnavn for alt, en klasse indeholder: felter, metoder, properties og konstruktører."]
    ],
    trin: [
      { t: "laes", h: "Data og kode i samme kasse",
        md: "En klasse kan mere end at opbevare data. Den kan også have **metoder** — og de metoder kan bruge objektets egne felter direkte.\n\nMan siger, at et objekt har **tilstand** (det, det ved: felterne) og **adfærd** (det, det kan: metoderne).",
        kode: R`Person p = new Person();
p.Navn = "Peter";
p.Alder = 25;
p.Praesenter();

class Person
{
    public string Navn;
    public int Alder;

    public void Praesenter()
    {
        Console.WriteLine($"Jeg hedder {Navn} og er {Alder} år");
    }
}`,
        noter: [
          ["public void Praesenter()", "En metode i klassen. Læg mærke til: **ingen `static`**."],
          ["{Navn} … {Alder}", "Metoden bruger felterne i **det objekt, den bliver kaldt på**."],
          ["p.Praesenter();", "Kald metoden på objektet p."]
        ],
        output: "Jeg hedder Peter og er 25 år" },
      { t: "forudsig",
        kode: R`Hund a = new Hund();
a.Navn = "Fido";
Hund b = new Hund();
b.Navn = "Rex";

b.Goe();
a.Goe();

class Hund
{
    public string Navn;

    public void Goe()
    {
        Console.WriteLine($"{Navn} siger vov");
    }
}`,
        output: "Rex siger vov\nFido siger vov",
        fordi: "Den samme metode giver forskelligt resultat, alt efter **hvilket objekt** den kaldes på. `b.Goe()` bruger `b`'s navn, og `a.Goe()` bruger `a`'s." },
      { t: "laes", h: "Metoder, der ændrer objektet",
        md: "En metode kan også **ændre** objektets felter. Så husker objektet ændringen til næste gang.",
        kode: R`Konto k = new Konto();
k.Indsaet(500);
k.Indsaet(200);
Console.WriteLine(k.Saldo);

class Konto
{
    public decimal Saldo;

    public void Indsaet(decimal beloeb)
    {
        Saldo += beloeb;
    }
}`,
        output: "700",
        md2: "Feltet `Saldo` starter på 0 (standardværdien for tal). Hver indbetaling lægges oveni, og objektet husker sin saldo mellem kaldene." },
      { t: "udfyld", q: "Giv klassen en metode, der lægger 1 til alderen.",
        kode: R`Person p = new Person();
p.Alder = 29;
p.[[HarFoedselsdag]]();
Console.WriteLine(p.Alder);

class Person
{
    public int Alder;

    public [[void]] HarFoedselsdag()
    {
        [[Alder++|Alder += 1]];
    }
}`,
        output: "30",
        fordi: "Metoden returnerer ikke noget (`void`). Den ændrer objektets eget felt." },
      { t: "laes", h: "Hvorfor ikke static?",
        md: "I modul 3 skrev du `static` foran alle metoder. Nu skal det **væk**. Forskellen er:\n\n- En metode **uden** `static` hører til **et objekt**. Den kaldes på et objekt (`p.Praesenter()`) og kan bruge objektets felter. Den kaldes en **instansmetode**.\n- En metode **med** `static` hører til **klassen selv**. Den kaldes uden et objekt og kan derfor **ikke** se nogen felter. `Main` er static, fordi programmet skal kunne starte, før der findes et eneste objekt.\n\nTommelfingerregel: I dine egne klasser er metoderne **ikke** static. Mere om `static` i lektion 5." },
      { t: "fejl",
        kode: R`Lampe l = new Lampe();
l.Taend();

class Lampe
{
    public bool ErTaendt;

    public static void Taend()
    {
        ErTaendt = true;
    }
}`,
        linje: 8,
        fordi: "Metoden er `static`, så den hører til klassen og ikke til en bestemt lampe. Den kan derfor ikke vide, **hvilken** lampes `ErTaendt` der menes. Compileren klager både over linje 10 (`An object reference is required…`) og over kaldet i linje 2. Løsningen er at fjerne `static` i linje 8.",
        rettet: R`Lampe l = new Lampe();
l.Taend();

class Lampe
{
    public bool ErTaendt;

    public void Taend()
    {
        ErTaendt = true;
    }
}` },
      { t: "laes", h: "this: \"mig selv\"",
        md: "Inde i en metode betyder ordet `this` **\"det objekt, jeg lige nu arbejder på\"**. `this.Navn` er altså det samme som bare `Navn`.\n\nFor det meste kan du udelade det. Men det er nødvendigt, når en **parameter hedder det samme som et felt** — så peger `this.navn` på feltet og `navn` på parameteren.",
        kode: R`Person p = new Person();
p.SkiftNavn("Anna");
Console.WriteLine(p.navn);

class Person
{
    public string navn;

    public void SkiftNavn(string navn)
    {
        this.navn = navn;
    }
}`,
        noter: [
          ["this.navn", "Objektets **felt**."],
          ["= navn", "**Parameteren**, der kom ind i metoden."]
        ],
        output: "Anna" },
      { t: "forudsig",
        kode: R`Taeller t = new Taeller();
t.Op();
t.Op();
t.Op();
t.Ned();
Console.WriteLine(t.Vaerdi);

class Taeller
{
    public int Vaerdi;

    public void Op()
    {
        this.Vaerdi++;
    }

    public void Ned()
    {
        Vaerdi--;
    }
}`,
        output: "2",
        fordi: "Tre gange op og én gang ned: 0 → 1 → 2 → 3 → 2. `this.Vaerdi` og `Vaerdi` er det samme felt." },
      { t: "skriv", q: "Giv klassen `Konto` en metode, der hedder `Haev`. Den tager en `decimal`, der hedder `beloeb`, og trækker beløbet fra `Saldo`. Skriv kun metoden.",
        foer: R`Konto k = new Konto();
k.Saldo = 1000;
k.Haev(300);
Console.WriteLine(k.Saldo);

class Konto
{
    public decimal Saldo;`,
        efter: R`}`,
        tjek: [
          [/public void Haev\(decimal beloeb\)\{/, "Signaturen: `public void Haev(decimal beloeb)`"],
          [/(this\.)?Saldo-=beloeb;|(this\.)?Saldo=(this\.)?Saldo-beloeb;/, "Træk beløbet fra: `Saldo -= beloeb;`"],
          ["static", "Metoden må ikke være `static` — den skal arbejde på et objekt", "ikke"]
        ],
        loesning: R`    public void Haev(decimal beloeb)
    {
        Saldo -= beloeb;
    }`,
        output: "700" },
      { t: "ide", h: "En bankkonto med adfærd",
        md: "Lav et Console-projekt, `Bank`, med en klasse `Konto` i sin egen fil (husk `using Bank;` øverst i Program.cs). Den skal have felterne `Ejer` og `Saldo` og metoderne `Indsaet`, `Haev` og `VisSaldo`.",
        kode: R`Konto k = new Konto();
k.Ejer = "Peter";
k.Indsaet(1000);
k.Haev(250);
k.VisSaldo();

class Konto
{
    public string Ejer;
    public decimal Saldo;

    public void Indsaet(decimal beloeb)
    {
        Saldo += beloeb;
    }

    public void Haev(decimal beloeb)
    {
        if (beloeb > Saldo)
        {
            Console.WriteLine("Der er ikke penge nok");
            return;
        }
        Saldo -= beloeb;
    }

    public void VisSaldo()
    {
        Console.WriteLine($"{Ejer} har {Saldo} kr.");
    }
}`,
        output: "Peter har 750 kr.",
        md2: "`return;` uden en værdi afslutter en void-metode med det samme. Prøv at hæve 5000 — og se, at kontoen selv siger nej. **Reglen bor i klassen**, ikke ude i programmet. Det er en vigtig idé i OOP." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad vil det sige, at et objekt har både tilstand og adfærd?",
        svar: "**Tilstand** er de data, objektet indeholder — værdierne i dets **felter**, fx saldoen på en konto. **Adfærd** er det, objektet kan gøre — dets **metoder**, fx at indsætte og hæve. I OOP samler man data og den kode, der arbejder på dataene, i den samme klasse.",
        noegle: ["felter", "metoder", "data", "samler"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m04l3", titel: "Konstruktører: objekter, der er klar fra start", min: 15,
    ord: [
      ["Konstruktør", "En særlig metode, der kører automatisk, når et objekt bliver oprettet med `new`. Den gør objektet klar."],
      ["Standardkonstruktør", "En konstruktør uden parametre. Compileren laver selv en usynlig, hvis du ikke skriver nogen konstruktør."],
      ["Initialisere", "At give noget sin første værdi."],
      ["Constructor chaining", "Når én konstruktør kalder en anden i samme klasse med `: this(...)`, så koden ikke skal skrives to gange."]
    ],
    trin: [
      { t: "laes", h: "Et objekt, der mangler noget",
        md: "Indtil nu har du lavet et tomt objekt og fyldt felterne ud bagefter, ét ad gangen. Det er besværligt — og farligt: glemmer du ét, har du en person uden navn.\n\nEn **konstruktør** løser det. Det er en særlig metode, der **kører automatisk, når objektet oprettes**. Den tager imod værdierne og gør objektet klar med det samme.",
        kode: R`Person p = new Person("Peter", 25);
Console.WriteLine($"{p.Navn}, {p.Alder}");

class Person
{
    public string Navn;
    public int Alder;

    public Person(string navn, int alder)
    {
        Navn = navn;
        Alder = alder;
    }
}`,
        noter: [
          ["public Person(…)", "Konstruktøren. Den hedder **præcis det samme som klassen** og har **ingen returtype** — ikke engang void."],
          ["Navn = navn;", "Værdien fra parameteren gemmes i feltet."],
          ["new Person(\"Peter\", 25)", "Argumenterne sendes til konstruktøren."]
        ],
        output: "Peter, 25" },
      { t: "valg", q: "Hvordan genkender du en konstruktør?",
        svar: ["Den hedder det samme som klassen og har ingen returtype", "Den hedder altid Main", "Den starter med ordet new", "Den har returtypen void"],
        ret: 0, fordi: "Samme navn som klassen, ingen returtype. Ordet `new` står der, hvor objektet oprettes — og det er det, der får konstruktøren til at køre." },
      { t: "forudsig",
        kode: R`Console.WriteLine("Start");
Hund h = new Hund("Fido");
Console.WriteLine(h.Navn);

class Hund
{
    public string Navn;

    public Hund(string navn)
    {
        Console.WriteLine("Konstruktøren kører");
        Navn = navn;
    }
}`,
        output: "Start\nKonstruktøren kører\nFido",
        fordi: "Konstruktøren kører **i det øjeblik**, `new Hund(\"Fido\")` udføres — før næste linje." },
      { t: "udfyld", q: "Udfyld konstruktøren.",
        kode: R`Bog b = new Bog("Dune", 600);
Console.WriteLine($"{b.Titel}: {b.Sider} sider");

class Bog
{
    public string Titel;
    public int Sider;

    public [[Bog]](string titel, int sider)
    {
        Titel = [[titel]];
        Sider = sider;
    }
}`,
        output: "Dune: 600 sider",
        fordi: "Konstruktøren hedder det samme som klassen. Parameteren `titel` (lille t) gemmes i feltet `Titel` (stort T)." },
      { t: "fejl",
        kode: R`Person p = new Person();
Console.WriteLine(p.Navn);

class Person
{
    public string Navn;

    public Person(string navn)
    {
        Navn = navn;
    }
}`,
        linje: 1,
        fordi: "Klassen har en konstruktør, der **kræver** et navn. Så kan man ikke længere skrive `new Person()` uden argumenter. Compileren siger: `There is no argument given that corresponds to the required parameter 'navn'`. Det er hele pointen: nu kan ingen lave en person uden navn.",
        rettet: R`Person p = new Person("Peter");
Console.WriteLine(p.Navn);

class Person
{
    public string Navn;

    public Person(string navn)
    {
        Navn = navn;
    }
}` },
      { t: "laes", h: "Den usynlige konstruktør",
        md: "Hvorfor virkede `new Person()` så i de første lektioner, hvor du ikke havde skrevet nogen konstruktør?\n\nFordi compileren laver en **usynlig, tom konstruktør uden parametre**, når klassen ikke har nogen selv. Den hedder en **standardkonstruktør** (default constructor).\n\nSå snart du skriver din egen konstruktør, **forsvinder** den usynlige. Vil du have begge muligheder, må du skrive begge." },
      { t: "laes", h: "Flere konstruktører",
        md: "En klasse må gerne have **flere konstruktører**, bare de har forskellige parametre. Det er overloading — præcis som med metoder i modul 3.",
        kode: R`Person a = new Person();
Person b = new Person("Anna");
Person c = new Person("Bo", 40);
Console.WriteLine($"{a.Navn} {a.Alder}");
Console.WriteLine($"{b.Navn} {b.Alder}");
Console.WriteLine($"{c.Navn} {c.Alder}");

class Person
{
    public string Navn;
    public int Alder;

    public Person()
    {
        Navn = "Ukendt";
    }

    public Person(string navn)
    {
        Navn = navn;
    }

    public Person(string navn, int alder)
    {
        Navn = navn;
        Alder = alder;
    }
}`,
        output: "Ukendt 0\nAnna 0\nBo 40",
        md2: "Compileren vælger konstruktør ud fra argumenterne. Felter, der ikke får en værdi, beholder standardværdien — 0 for tal." },
      { t: "laes", h: "Lad én konstruktør kalde en anden",
        md: "I eksemplet før stod `Navn = navn;` to steder. Husk DRY. En konstruktør kan sende arbejdet videre til en anden konstruktør i samme klasse med `: this(...)`. Det hedder **constructor chaining**.",
        kode: R`Person p = new Person("Anna");
Console.WriteLine($"{p.Navn} {p.Alder}");

class Person
{
    public string Navn;
    public int Alder;

    public Person(string navn) : this(navn, 18)
    {
    }

    public Person(string navn, int alder)
    {
        Navn = navn;
        Alder = alder;
    }
}`,
        noter: [
          [": this(navn, 18)", "Kald først den anden konstruktør — med navnet og en standardalder på 18."]
        ],
        output: "Anna 18" },
      { t: "forudsig",
        kode: R`Vare v = new Vare("Kaffe");
Console.WriteLine($"{v.Navn} {v.Pris}");

class Vare
{
    public string Navn;
    public int Pris;

    public Vare(string navn) : this(navn, 10)
    {
        Pris += 5;
    }

    public Vare(string navn, int pris)
    {
        Navn = navn;
        Pris = pris;
    }
}`,
        output: "Kaffe 15",
        fordi: "Først kører den konstruktør, der bliver kaldt med `: this(navn, 10)` — den sætter prisen til 10. **Bagefter** kører kroppen i den første konstruktør og lægger 5 til." },
      { t: "skriv", q: "Skriv en konstruktør til klassen `Kunde`. Den skal tage en `string`, der hedder `navn`, og en `string`, der hedder `email`, og gemme dem i felterne `Navn` og `Email`.",
        foer: R`Kunde k = new Kunde("Peter", "peter@mail.dk");
Console.WriteLine($"{k.Navn} <{k.Email}>");

class Kunde
{
    public string Navn;
    public string Email;`,
        efter: R`}`,
        tjek: [
          [/public Kunde\(string navn,string email\)\{/, "Konstruktøren: `public Kunde(string navn, string email)` — samme navn som klassen, ingen returtype"],
          [/(this\.)?Navn=navn;/, "Gem navnet: `Navn = navn;`"],
          [/(this\.)?Email=email;/, "Gem e-mailen: `Email = email;`"],
          [/public void Kunde/, "En konstruktør har ingen returtype — heller ikke `void`", "ikke"]
        ],
        loesning: R`    public Kunde(string navn, string email)
    {
        Navn = navn;
        Email = email;
    }`,
        output: "Peter <peter@mail.dk>" },
      { t: "ide", h: "Produkter i en butik",
        md: "Lav et Console-projekt, `Butik`, med klassen `Produkt` i sin egen fil (husk `using Butik;` øverst i Program.cs). Tip: skriv `ctor`, og tryk **Tab** {{to gange — så laver Visual Studio||— så laver Rider}} en tom konstruktør.",
        kode: R`Produkt[] produkter =
{
    new Produkt("Kaffe", 45),
    new Produkt("Te", 30),
    new Produkt("Kakao", 38)
};

decimal total = 0;
foreach (Produkt p in produkter)
{
    p.Vis();
    total += p.Pris;
}
Console.WriteLine($"I alt: {total} kr.");

class Produkt
{
    public string Navn;
    public decimal Pris;

    public Produkt(string navn, decimal pris)
    {
        Navn = navn;
        Pris = pris;
    }

    public void Vis()
    {
        Console.WriteLine($"{Navn}: {Pris} kr.");
    }
}`,
        output: "Kaffe: 45 kr.\nTe: 30 kr.\nKakao: 38 kr.\nI alt: 113 kr." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er en konstruktør, og hvorfor er den nyttig?",
        svar: "En konstruktør er en særlig metode, der **kører automatisk, når et objekt oprettes med `new`**. Den hedder **det samme som klassen** og har **ingen returtype**. Den bruges til at **initialisere** objektet, så det er gyldigt fra start — fx kan man kræve, at en kunde altid har et navn. En klasse kan have flere konstruktører med forskellige parametre (overloading).",
        noegle: ["new", "samme navn", "ingen returtype", "initialisere", "overloading"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m04l4", titel: "Indkapsling: private, public og properties", min: 20,
    ord: [
      ["Indkapsling (encapsulation)", "At skjule en klasses indre data og kun give adgang gennem metoder og properties, så klassen selv kan sikre, at data altid er gyldige."],
      ["Access modifier", "Ord, der bestemmer, hvem der må se et medlem: public, private (og senere protected og internal)."],
      ["public", "Alle må bruge medlemmet."],
      ["private", "Kun klassen selv må bruge medlemmet. Det er standard, hvis man ikke skriver noget."],
      ["Property", "Ligner et felt udefra, men er i virkeligheden to små metoder: `get` (læs) og `set` (skriv)."],
      ["get", "Den del af en property, der kører, når værdien læses."],
      ["set", "Den del af en property, der kører, når værdien ændres. Den nye værdi hedder `value`."],
      ["Auto-property", "Den korte form `public string Navn { get; set; }`, hvor compileren selv laver det skjulte felt."],
      ["Backing field", "Det private felt, som en property gemmer sin værdi i."]
    ],
    trin: [
      { t: "laes", h: "Problemet med public felter",
        md: "Når et felt er `public`, kan hvem som helst lægge hvad som helst i det. Også noget, der ikke giver mening:",
        kode: R`Konto k = new Konto();
k.Saldo = -999999;
Console.WriteLine(k.Saldo);

class Konto
{
    public decimal Saldo;
}`,
        output: "-999999",
        md2: "Klassen kan ikke forsvare sig. I et stort program med 50 filer aner du ikke, hvem der har ændret saldoen.\n\nLøsningen hedder **indkapsling** (*encapsulation*): **skjul dataene**, og giv kun adgang gennem kode, som klassen selv bestemmer over. Det er den første af de fire grundidéer i OOP." },
      { t: "laes", h: "private: kun for klassen selv",
        md: "Ordene `public` og `private` hedder **access modifiers**. De bestemmer, hvem der må se noget.\n\n- `public`: alle må bruge det.\n- `private`: **kun kode inde i klassen** må bruge det.\n\nGør man feltet `private`, kan saldoen kun ændres gennem klassens egne metoder — og dér kan klassen tjekke, at alt går rigtigt til.",
        kode: R`Konto k = new Konto();
k.Indsaet(500);
k.Indsaet(-9999);
Console.WriteLine(k.HentSaldo());

class Konto
{
    private decimal saldo;

    public void Indsaet(decimal beloeb)
    {
        if (beloeb > 0)
        {
            saldo += beloeb;
        }
    }

    public decimal HentSaldo()
    {
        return saldo;
    }
}`,
        output: "500",
        md2: "Det negative beløb bliver afvist. Private felter skrives med **lille begyndelsesbogstav** (`saldo`) — mange skriver en understreg foran (`_saldo`), også i den kode Visual Studio laver for dig." },
      { t: "fejl",
        kode: R`Konto k = new Konto();
k.saldo = 1000000;

class Konto
{
    private decimal saldo;
}`,
        linje: 2,
        fordi: "Feltet er `private`, så kode uden for klassen må ikke røre det. Compileren siger: `'Konto.saldo' is inaccessible due to its protection level`. Det er netop meningen — sådan beskytter klassen sine data.",
        rettet: R`Konto k = new Konto();
k.Indsaet(1000000);

class Konto
{
    private decimal saldo;

    public void Indsaet(decimal beloeb)
    {
        saldo += beloeb;
    }
}` },
      { t: "laes", h: "Properties: det bedste fra begge verdener",
        md: "At skrive en `HentSaldo()`- og en `SaetSaldo()`-metode til hvert eneste felt er tungt. C# har derfor **properties**.\n\nEn property **ligner et felt udefra** — man skriver `p.Alder = 25` — men indeni er den to små metoder:\n\n- `get` kører, når nogen **læser** værdien.\n- `set` kører, når nogen **ændrer** den. Den nye værdi ligger i det særlige ord `value`.",
        kode: R`Person p = new Person();
p.Alder = 25;
p.Alder = -5;
Console.WriteLine(p.Alder);

class Person
{
    private int alder;

    public int Alder
    {
        get { return alder; }
        set
        {
            if (value >= 0)
            {
                alder = value;
            }
        }
    }
}`,
        noter: [
          ["private int alder;", "Det skjulte felt, hvor værdien gemmes. Kaldes et **backing field**."],
          ["public int Alder", "Propertyen. Stort begyndelsesbogstav. Ingen parenteser."],
          ["get { return alder; }", "Læsning: giv feltets værdi tilbage."],
          ["set { … value … }", "Skrivning: `value` er det, der står til højre for lighedstegnet."]
        ],
        output: "25",
        md2: "`p.Alder = -5` ser ud som en almindelig tildeling, men den kører `set` — og dér bliver den negative alder afvist." },
      { t: "forudsig",
        kode: R`Vare v = new Vare();
v.Pris = 50;
v.Pris = -10;
v.Pris = 80;
v.Pris = 0;
Console.WriteLine(v.Pris);

class Vare
{
    private int pris;

    public int Pris
    {
        get { return pris; }
        set
        {
            if (value > 0)
            {
                pris = value;
            }
        }
    }
}`,
        output: "80",
        fordi: "`set` gemmer kun værdier, der er større end 0. 50 gemmes, −10 afvises, 80 gemmes, og 0 afvises. Tilbage står 80." },
      { t: "laes", h: "Auto-properties: den korte form",
        md: "Tit skal der ikke tjekkes noget. Så kan du skrive den **korte form**, og compileren laver selv det skjulte felt. Det hedder en **auto-property** — og det er den, du kommer til at skrive allermest. Alle modelklasser i et web-projekt ser sådan ud:",
        kode: R`Kunde k = new Kunde();
k.Navn = "Peter";
k.Email = "peter@mail.dk";
Console.WriteLine($"{k.Navn} <{k.Email}>");

class Kunde
{
    public int Id { get; set; }
    public string Navn { get; set; }
    public string Email { get; set; }
}`,
        output: "Peter <peter@mail.dk>",
        md2: "Hvorfor ikke bare bruge public felter, når der alligevel ikke tjekkes noget? Fordi du senere kan **tilføje et tjek** uden at ændre den kode, der bruger klassen. Og fordi resten af .NET — Entity Framework, MVC og Blazor — kun kigger efter **properties**, ikke felter.\n\nTip: skriv `prop`, og tryk **Tab** {{to gange — så laver Visual Studio||— så laver Rider}} en auto-property." },
      { t: "udfyld", q: "Lav to auto-properties.",
        kode: R`Film f = new Film();
f.Titel = "Matrix";
f.Aar = 1999;
Console.WriteLine($"{f.Titel} ({f.Aar})");

class Film
{
    public string Titel { [[get]]; [[set]]; }
    public [[int]] Aar { get; set; }
}`,
        output: "Matrix (1999)",
        fordi: "En auto-property har `get;` og `set;` i tuborgklammer. Årstallet er et heltal." },
      { t: "laes", h: "Læs, men rør ikke",
        md: "Du kan styre læsning og skrivning hver for sig:\n\n- `{ get; private set; }` — alle må **læse**, men kun klassen selv må **ændre**.\n- `{ get; }` — kan kun sættes i konstruktøren. Derefter er den skrivebeskyttet.\n- `{ get; init; }` — kan kun sættes, når objektet oprettes.",
        kode: R`Konto k = new Konto("Peter");
k.Indsaet(300);
Console.WriteLine($"{k.Ejer}: {k.Saldo}");

class Konto
{
    public string Ejer { get; }
    public decimal Saldo { get; private set; }

    public Konto(string ejer)
    {
        Ejer = ejer;
    }

    public void Indsaet(decimal beloeb)
    {
        if (beloeb > 0)
        {
            Saldo += beloeb;
        }
    }
}`,
        output: "Peter: 300",
        md2: "Udefra kan man se saldoen, men ikke skrive `k.Saldo = 1000000;`. Den eneste vej til at ændre den er `Indsaet` — og den holder øje." },
      { t: "fejl",
        kode: R`Spiller s = new Spiller();
s.GivPoint(10);
s.Point = 9999;
Console.WriteLine(s.Point);

class Spiller
{
    public int Point { get; private set; }

    public void GivPoint(int antal)
    {
        Point += antal;
    }
}`,
        linje: 3,
        fordi: "`set` er `private`, så `Point` kan kun ændres inde i klassen. Compileren siger: `The property or indexer 'Spiller.Point' cannot be used in this context because the set accessor is inaccessible`.",
        rettet: R`Spiller s = new Spiller();
s.GivPoint(10);
s.GivPoint(5);
Console.WriteLine(s.Point);

class Spiller
{
    public int Point { get; private set; }

    public void GivPoint(int antal)
    {
        Point += antal;
    }
}` },
      { t: "laes", h: "En property, der regner",
        md: "En property behøver ikke gemme noget. Den kan **regne sin værdi ud**, hver gang den bliver læst.",
        kode: R`Rektangel r = new Rektangel();
r.Bredde = 4;
r.Hoejde = 5;
Console.WriteLine(r.Areal);
r.Bredde = 10;
Console.WriteLine(r.Areal);

class Rektangel
{
    public int Bredde { get; set; }
    public int Hoejde { get; set; }

    public int Areal
    {
        get { return Bredde * Hoejde; }
    }
}`,
        output: "20\n50",
        md2: "Arealet følger altid med, når bredden ændres. Du vil også se den korte skrivemåde `public int Areal => Bredde * Hoejde;` — pilen `=>` betyder her \"giver\"." },
      { t: "skriv", q: "Giv klassen `Elev` to auto-properties: en `string`, der hedder `Navn`, og en `int`, der hedder `Klassetrin`. Begge skal kunne læses og ændres af alle.",
        foer: R`Elev e = new Elev();
e.Navn = "Maja";
e.Klassetrin = 7;
Console.WriteLine($"{e.Navn} går i {e.Klassetrin}.");

class Elev
{`,
        efter: R`}`,
        tjek: [
          [/public string Navn\{get;set;\}/, "`public string Navn { get; set; }`"],
          [/public int Klassetrin\{get;set;\}/, "`public int Klassetrin { get; set; }`"]
        ],
        forkert: ["public string Navn;\npublic int Klassetrin;"],
        loesning: R`    public string Navn { get; set; }
    public int Klassetrin { get; set; }`,
        output: "Maja går i 7." },
      { t: "ide", h: "En termostat, der passer på sig selv",
        md: "Lav et Console-projekt, `Termostat`. Klassen tillader kun temperaturer mellem 5 og 30 grader. Prøv at sætte den til 100 — og se, at den nægter.",
        kode: R`Termostat t = new Termostat();
t.Temperatur = 21;
t.Temperatur = 100;
Console.WriteLine($"Indstillet til {t.Temperatur} grader");

class Termostat
{
    private int temperatur = 20;

    public int Temperatur
    {
        get { return temperatur; }
        set
        {
            if (value >= 5 && value <= 30)
            {
                temperatur = value;
            }
            else
            {
                Console.WriteLine($"{value} grader er ikke tilladt");
            }
        }
    }
}`,
        output: "100 grader er ikke tilladt\nIndstillet til 21 grader",
        md2: "{{Skriv den fulde property med `propfull` + **Tab** to gange i Visual Studio.||}} Sæt et **breakpoint** i `set` (klik i den grå kant til venstre for linjen), og start med {{**F5**||den **grønne bille** 🐞 ved siden af Kør-knappen}} — så kan du se, at `set` virkelig kører, når du tildeler." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er indkapsling, og hvordan opnår man det i C#?",
        svar: "Indkapsling betyder, at en klasse **skjuler sine data** og kun giver adgang gennem **kontrollerede indgange**. I C# gør man felterne `private` og giver adgang gennem `public` **properties** og metoder. I `set` kan klassen **validere** værdien, så objektet aldrig kommer i en ugyldig tilstand. Det gør koden mere robust og lettere at ændre, fordi resten af programmet ikke afhænger af, hvordan klassen ser ud indeni.",
        noegle: ["skjule", "private", "properties", "validere", "public"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m04l5", titel: "static, ToString og hurtig oprettelse", min: 16,
    ord: [
      ["static", "Hører til klassen selv og ikke til et bestemt objekt. Der findes kun én, som alle deler."],
      ["Instansmedlem", "Et felt, en property eller en metode, som hvert objekt har sit eget eksemplar af (alt, der ikke er static)."],
      ["ToString", "Metoden, der bestemmer, hvordan et objekt ser ud som tekst — fx når det skrives ud med WriteLine."],
      ["override", "Erstatter en metode, klassen har arvet, med sin egen udgave. Forklares grundigt i modul 5."],
      ["Object initializer", "Kort måde at oprette et objekt og sætte dets properties på i samme sætning: `new Person { Navn = \"Peter\" }`."],
      ["Hjælpeklasse (utility class)", "En static klasse med metoder, man kalder uden at lave et objekt — fx `Math` og `Console`."]
    ],
    trin: [
      { t: "laes", h: "static: fælles for alle",
        md: "Alt, du har lavet i klasser indtil nu, hører til **det enkelte objekt**: hver person har sit eget navn. Det hedder **instansmedlemmer**.\n\nNogle ting hører ikke til et bestemt objekt, men til **klassen som helhed** — fx hvor mange personer der er lavet i alt. Sådan noget markeres med `static`. Der findes kun **én** udgave, og alle objekter deler den.",
        kode: R`Person a = new Person("Anna");
Person b = new Person("Bo");
Person c = new Person("Carl");
Console.WriteLine(Person.Antal);

class Person
{
    public string Navn { get; set; }
    public static int Antal;

    public Person(string navn)
    {
        Navn = navn;
        Antal++;
    }
}`,
        noter: [
          ["public static int Antal;", "Ét fælles felt for hele klassen."],
          ["Antal++;", "Hver gang konstruktøren kører, tælles den fælles tæller op."],
          ["Person.Antal", "Static medlemmer kaldes på **klassens navn** — ikke på et objekt."]
        ],
        output: "3" },
      { t: "valg", q: "Hvordan læser du et static felt `Antal` i klassen `Person`?",
        svar: ["Person.Antal", "new Person().Antal", "p.Antal, hvor p er et objekt", "static.Antal"],
        ret: 0, fordi: "Static medlemmer hører til klassen, så man skriver **klassens navn** foran. C# tillader ikke, at man går gennem et objekt." },
      { t: "laes", h: "Static metoder: værktøjer uden objekt",
        md: "En static **metode** kan kaldes, uden at der findes et objekt. Det er oplagt til små værktøjer, der bare regner på det, de får ind.\n\nDu har brugt dem fra dag ét: `Console.WriteLine`, `int.Parse` og `Math.Max` er alle static. Man skriver jo ikke `new Console()` først.",
        kode: R`Console.WriteLine(Moms.Beregn(200));
Console.WriteLine(Math.Max(7, 12));
Console.WriteLine(Math.Round(3.14159, 2));

static class Moms
{
    public const decimal Sats = 0.25m;

    public static decimal Beregn(decimal beloeb)
    {
        return beloeb * Sats;
    }
}`,
        output: "50,00\n12\n3,14",
        md2: "Er **hele** klassen `static`, kan man slet ikke lave objekter af den. Sådan en kaldes en **hjælpeklasse**. `Math` er .NET's hjælpeklasse til matematik." },
      { t: "forudsig",
        kode: R`Billet a = new Billet();
Billet b = new Billet();
Billet c = new Billet();
Console.WriteLine(b.Nummer);
Console.WriteLine(Billet.Naeste);

class Billet
{
    public static int Naeste = 100;
    public int Nummer;

    public Billet()
    {
        Nummer = Naeste;
        Naeste++;
    }
}`,
        output: "101\n103",
        fordi: "Det fælles felt `Naeste` starter på 100. Hver ny billet tager det aktuelle tal som sit eget `Nummer` og tæller så det fælles tal én op. Billetterne får 100, 101 og 102, og næste ledige nummer er 103." },
      { t: "fejl",
        kode: R`class Lommeregner
{
    public int Hukommelse;

    public static int Dobbelt(int tal)
    {
        return tal * 2 + Hukommelse;
    }
}`,
        linje: 7,
        fordi: "En static metode hører til klassen og har ikke noget objekt at arbejde på. Den kan derfor ikke bruge instansfeltet `Hukommelse` — **hvis** hukommelse skulle det være? Compileren siger: `An object reference is required for the non-static field…`. Omvendt går det fint: en almindelig metode må gerne bruge static medlemmer.",
        rettet: R`class Lommeregner
{
    public int Hukommelse;

    public static int Dobbelt(int tal)
    {
        return tal * 2;
    }
}`,
        omkring: ["", "class __Start { static void Main() { } }"] },
      { t: "laes", h: "Hvad sker der, når man skriver et objekt ud?",
        md: "Prøv at sende et objekt direkte til `WriteLine`. Du får ikke indholdet — du får bare **klassens navn**:",
        kode: R`Person p = new Person();
p.Navn = "Peter";
Console.WriteLine(p);

class Person
{
    public string Navn { get; set; }
}`,
        output: "Person",
        md2: "Alle objekter har en metode, der hedder `ToString()`. Den bestemmer, hvordan objektet ser ud som tekst, og `WriteLine` kalder den automatisk. Standardudgaven giver bare klassens navn. Men du kan lave din egen." },
      { t: "laes", h: "Din egen ToString",
        md: "Du **erstatter** den medfødte `ToString` ved at skrive `public override string ToString()`. Ordet `override` betyder \"erstat den udgave, klassen har i forvejen\". Det forklares grundigt i modul 5 — for nu lærer du linjen som en klump.",
        kode: R`Person p = new Person();
p.Navn = "Peter";
p.Alder = 25;
Console.WriteLine(p);
Console.WriteLine($"Fundet: {p}");

class Person
{
    public string Navn { get; set; }
    public int Alder { get; set; }

    public override string ToString()
    {
        return $"{Navn} ({Alder} år)";
    }
}`,
        output: "Peter (25 år)\nFundet: Peter (25 år)",
        md2: "Nu ved objektet selv, hvordan det skal vises. Det er en god vane at give sine klasser en `ToString` — det gør også fejlsøgning meget lettere." },
      { t: "skriv", q: "Giv klassen `Bil` en `ToString`, der returnerer mærke og årgang som fx `Volvo fra 2018`. Brug string-interpolation.",
        foer: R`Bil b = new Bil();
b.Maerke = "Volvo";
b.Aar = 2018;
Console.WriteLine(b);

class Bil
{
    public string Maerke { get; set; }
    public int Aar { get; set; }`,
        efter: R`}`,
        tjek: [
          [/public override string ToString\(\)/, "Signaturen: `public override string ToString()`"],
          [/return ?\$"\{Maerke\} fra \{Aar\}";|=>\$"\{Maerke\} fra \{Aar\}";/, "Returnér teksten: `return $\"{Maerke} fra {Aar}\";`"]
        ],
        loesning: R`    public override string ToString()
    {
        return $"{Maerke} fra {Aar}";
    }`,
        output: "Volvo fra 2018" },
      { t: "laes", h: "Opret og udfyld i ét hug",
        md: "Har klassen properties med `set`, kan du oprette objektet og sætte værdierne **i samme sætning**. Det hedder en **object initializer**: tuborgklammer efter `new`, med `Navn = værdi` adskilt af komma.",
        kode: R`Kunde k = new Kunde { Id = 1, Navn = "Peter", By = "Aarhus" };
Console.WriteLine($"{k.Id}: {k.Navn}, {k.By}");

class Kunde
{
    public int Id { get; set; }
    public string Navn { get; set; }
    public string By { get; set; }
}`,
        output: "1: Peter, Aarhus",
        md2: "Det er det samme som at skrive `new Kunde()` og bagefter tre linjer med `k.Id = 1;` og så videre. Du kommer til at se den her skrivemåde konstant i web-delen af kurset — fx når der lægges testdata i databasen." },
      { t: "udfyld", q: "Opret et produkt med en object initializer.",
        kode: R`Produkt p = new Produkt [[{]] Navn = "Kaffe"[[,]] Pris = 45 };
Console.WriteLine($"{p.Navn}: {p.Pris}");

class Produkt
{
    public string Navn { get; set; }
    public int Pris { get; set; }
}`,
        output: "Kaffe: 45",
        fordi: "Værdierne står i tuborgklammer efter `new Produkt` og er adskilt af komma." },
      { t: "ide", h: "Et lille varelager",
        md: "Lav et Console-projekt, `Lager`, med klassen `Vare` i sin egen fil (husk `using Lager;` øverst i Program.cs). Brug en static tæller til at give hver vare et fortløbende nummer, og en `ToString`, så varerne kan skrives direkte ud.",
        kode: R`Vare[] varer =
{
    new Vare { Navn = "Skruer", Antal = 200 },
    new Vare { Navn = "Søm", Antal = 0 },
    new Vare { Navn = "Hammer", Antal = 12 }
};

foreach (Vare v in varer)
{
    Console.WriteLine(v);
}
Console.WriteLine($"Varer oprettet: {Vare.AntalOprettet}");

class Vare
{
    public static int AntalOprettet;

    public int Nummer { get; }
    public string Navn { get; set; }
    public int Antal { get; set; }
    public bool PaaLager => Antal > 0;

    public Vare()
    {
        AntalOprettet++;
        Nummer = AntalOprettet;
    }

    public override string ToString()
    {
        string status = PaaLager ? "på lager" : "UDSOLGT";
        return $"#{Nummer} {Navn}: {Antal} stk. ({status})";
    }
}`,
        output: "#1 Skruer: 200 stk. (på lager)\n#2 Søm: 0 stk. (UDSOLGT)\n#3 Hammer: 12 stk. (på lager)\nVarer oprettet: 3" },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på et static medlem og et instansmedlem?",
        svar: "Et **instansmedlem** hører til **det enkelte objekt**: hvert objekt har sit eget eksemplar, fx sit eget navn, og man bruger det gennem objektet (`p.Navn`). Et **static** medlem hører til **klassen selv**: der findes kun ét, som alle deler, og man bruger det gennem klassens navn (`Person.Antal`). En static metode kan ikke bruge instansmedlemmer, fordi den ikke har noget objekt at arbejde på.",
        noegle: ["objekt", "klassen", "kun én", "deler", "klassens navn"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m04l6", titel: "Klasser, der arbejder sammen", min: 18,
    ord: [
      ["Komposition", "Når et objekt indeholder andre objekter: en Ordre *har* en Kunde. Kaldes et \"har en\"-forhold."],
      ["Reference", "En variabel af en klassetype indeholder ikke selve objektet, men en henvisning til, hvor objektet ligger i hukommelsen."],
      ["null", "\"Ingenting\": en variabel, der ikke peger på noget objekt."],
      ["NullReferenceException", "Fejlen, man får, når man prøver at bruge et objekt gennem en variabel, der er null."],
      ["namespace", "Et navnerum, der grupperer klasser — typisk projektets navn. Klasser i samme namespace kan se hinanden."],
      ["internal", "Access modifier: synlig i hele projektet, men ikke uden for det. Standard for klasser."],
      ["De fire søjler i OOP", "Indkapsling, arv, polymorfi og abstraktion."]
    ],
    trin: [
      { t: "laes", h: "Et objekt kan indeholde et andet objekt",
        md: "En property kan have **en klasse som type**. Så indeholder det ene objekt det andet. Det hedder **komposition**, og man taler om et **\"har en\"-forhold**: en ordre *har en* kunde.",
        kode: R`Kunde k = new Kunde { Navn = "Peter" };
Ordre o = new Ordre { Nummer = 1001, Kunde = k };

Console.WriteLine(o.Kunde.Navn);

class Kunde
{
    public string Navn { get; set; }
}

class Ordre
{
    public int Nummer { get; set; }
    public Kunde Kunde { get; set; }
}`,
        noter: [
          ["public Kunde Kunde { get; set; }", "En property med typen Kunde. Den må gerne hedde det samme som sin type."],
          ["o.Kunde.Navn", "Følg punktummerne: ordren → dens kunde → kundens navn."]
        ],
        output: "Peter",
        md2: "Sådan hænger hele dit eksamensprojekt sammen: en ordre har en kunde, en kunde har en adresse, en ordre har varelinjer. I databasen bliver det til tabeller, der peger på hinanden." },
      { t: "forudsig",
        kode: R`By aarhus = new By { Navn = "Aarhus", Postnr = 8000 };
Person p = new Person { Navn = "Anna", Hjemby = aarhus };

Console.WriteLine($"{p.Navn} bor i {p.Hjemby.Postnr} {p.Hjemby.Navn}");

class By
{
    public string Navn { get; set; }
    public int Postnr { get; set; }
}

class Person
{
    public string Navn { get; set; }
    public By Hjemby { get; set; }
}`,
        output: "Anna bor i 8000 Aarhus",
        fordi: "`p.Hjemby` er et `By`-objekt. Gennem det når man byens navn og postnummer." },
      { t: "laes", h: "Én har mange",
        md: "Ofte har et objekt **flere** af noget: en kunde har mange ordrer. Det laves med et array (og fra modul 6 med en liste) som property.",
        kode: R`Kunde k = new Kunde { Navn = "Peter" };
k.Ordrer = new Ordre[]
{
    new Ordre { Nummer = 1, Beloeb = 200 },
    new Ordre { Nummer = 2, Beloeb = 350 }
};

Console.WriteLine($"{k.Navn} har købt for {k.Total()} kr.");

class Ordre
{
    public int Nummer { get; set; }
    public decimal Beloeb { get; set; }
}

class Kunde
{
    public string Navn { get; set; }
    public Ordre[] Ordrer { get; set; }

    public decimal Total()
    {
        decimal sum = 0;
        foreach (Ordre o in Ordrer)
        {
            sum += o.Beloeb;
        }
        return sum;
    }
}`,
        output: "Peter har købt for 550 kr.",
        md2: "Det hedder en **én-til-mange**-relation: én kunde, mange ordrer. Husk ordet — det kommer igen i databaserne." },
      { t: "laes", h: "Variablen indeholder en adresse — ikke objektet",
        md: "Her er noget, der overrasker — og som du skal kunne forklare til eksamen.\n\nEn variabel af en klassetype indeholder **ikke selve objektet**. Den indeholder en **reference**: en henvisning til, hvor objektet ligger i hukommelsen. Det svarer til en **adresse** på en seddel: sedlen er ikke huset, den fortæller bare, hvor huset ligger.\n\nKopierer du variablen, får du **en seddel mere med den samme adresse** — ikke et hus mere. Reglen er: **antallet af objekter = antallet af gange, der står `new`**.",
        kode: R`Person a = new Person { Navn = "Anna" };
Person b = a;

b.Navn = "Bente";
Console.WriteLine(a.Navn);

class Person
{
    public string Navn { get; set; }
}`,
        output: "Bente",
        md2: "Der blev kun lavet **ét** objekt (ét `new`). `a` og `b` peger på det samme. Ændrer du gennem `b`, ser du det også gennem `a`.\n\nMed `int` er det anderledes: dér får man en rigtig kopi. Forskellen hedder *reference type* og *value type* og forklares i modul 7." },
      { t: "forudsig",
        kode: R`Konto x = new Konto { Saldo = 100 };
Konto y = new Konto { Saldo = 100 };
Konto z = x;

z.Saldo = 500;
y.Saldo = 900;

Console.WriteLine(x.Saldo);
Console.WriteLine(y.Saldo);

class Konto
{
    public int Saldo { get; set; }
}`,
        output: "500\n900",
        fordi: "To `new` giver to objekter. `z` peger på det **samme** objekt som `x`, så `z.Saldo = 500` ændrer også det, `x` ser. `y` er sit eget objekt." },
      { t: "laes", h: "null: en variabel uden objekt",
        md: "En variabel af en klassetype kan også pege på **ingenting**. Det hedder `null`. Prøver du at bruge et objekt, der ikke er der, går programmet ned med den mest berømte fejl i C#:\n\n`System.NullReferenceException: Object reference not set to an instance of an object.`\n\nDen betyder altid det samme: **du har sat et punktum efter noget, der er null**.",
        kode: R`Ordre o = new Ordre { Nummer = 7 };
Console.WriteLine(o.Nummer);
Console.WriteLine(o.Kunde == null);
Console.WriteLine(o.Kunde.Navn);

class Kunde
{
    public string Navn { get; set; }
}

class Ordre
{
    public int Nummer { get; set; }
    public Kunde Kunde { get; set; }
}`,
        frag: true,
        md2: "Ordren blev oprettet, men ingen har lagt en kunde i den. `o.Kunde` er derfor `null`, og `o.Kunde.Navn` får programmet til at gå ned. De første to linjer skriver `7` og `True`.\n\nFår du den fejl: find linjen, se på **hvert punktum**, og spørg: hvad står der til venstre — og er det nogensinde blevet oprettet med `new`?" },
      { t: "fejl", q: "Programmet går ned med en NullReferenceException. På hvilken linje sker det?",
        kode: R`Hold h = new Hold();
h.Navn = "AGF";
Console.WriteLine(h.Navn);
Console.WriteLine(h.Traener.Navn);

class Traener
{
    public string Navn { get; set; }
}

class Hold
{
    public string Navn { get; set; }
    public Traener Traener { get; set; }
}`,
        linje: 4, logisk: true, fejler: true,
        fordi: "Holdet har et navn, men der er aldrig lavet en træner — `h.Traener` er `null`. Punktummet efter `h.Traener` er det, der vælter programmet.",
        rettet: R`Hold h = new Hold();
h.Navn = "AGF";
h.Traener = new Traener { Navn = "Jakob" };
Console.WriteLine(h.Navn);
Console.WriteLine(h.Traener.Navn);

class Traener
{
    public string Navn { get; set; }
}

class Hold
{
    public string Navn { get; set; }
    public Traener Traener { get; set; }
}`,
        rettetOutput: "AGF\nJakob" },
      { t: "laes", h: "namespace og internal",
        md: "Når {{Visual Studio||Rider}} laver en klassefil, ser den typisk sådan ud:",
        kode: R`namespace Butik
{
    internal class Produkt
    {
        public string Navn { get; set; }
    }
}`,
        noter: [
          ["namespace Butik", "Et **navnerum**: en mappe for klasser, normalt projektets navn. Klasser i samme namespace kan se hinanden."],
          ["internal", "Klassen er synlig i **hele projektet**, men ikke uden for det. Det er standard, og `public class` virker lige så godt."]
        ],
        omkring: ["", "class __Start { static void Main() { } }"],
        md2: "Ligger en klasse i et **andet** namespace, skal du skrive `using Butik;` øverst i filen for at bruge den. Program.cs med den korte skrivemåde ligger **ikke** i noget namespace — derfor skal der stå `using` og projektets navn øverst i Program.cs, når dine klasser ligger i deres egne filer. Det er præcis det, linjerne øverst i lærerens filer gør. Du vil også se den korte form `namespace Butik;` på én linje uden klammer — den gælder så for hele filen." },
      { t: "skriv", q: "Klasserne er lavet nedenunder. Opret en `Forfatter` med navnet `\"Astrid\"` i variablen `f`. Opret derefter en `Bog` i variablen `b` med titlen `\"Emil\"` og forfatteren `f`. Skriv bogens forfatters navn ud.",
        efter: R`class Forfatter
{
    public string Navn { get; set; }
}

class Bog
{
    public string Titel { get; set; }
    public Forfatter Forfatter { get; set; }
}`,
        tjek: [
          [/(Forfatter|var) f=new( Forfatter)?(\(\))?\{Navn="Astrid"\};|(Forfatter|var) f=new( Forfatter)?\(\);f\.Navn="Astrid";/, "Opret forfatteren: `Forfatter f = new Forfatter { Navn = \"Astrid\" };`"],
          [/(Bog|var) b=new( Bog)?(\(\))?\{/, "Opret bogen med en object initializer: `Bog b = new Bog { … };`"],
          [/Forfatter=f/, "Sæt bogens forfatter: `Forfatter = f`"],
          ["Console.WriteLine(b.Forfatter.Navn);", "Skriv ud: `Console.WriteLine(b.Forfatter.Navn);`"]
        ],
        loesning: R`Forfatter f = new Forfatter { Navn = "Astrid" };
Bog b = new Bog { Titel = "Emil", Forfatter = f };
Console.WriteLine(b.Forfatter.Navn);`,
        output: "Astrid" },
      { t: "ide", h: "En ordre med varelinjer",
        md: "Lav et Console-projekt, `Ordresystem`, med **tre klasser i hver sin fil**: `Kunde`, `Ordrelinje` og `Ordre` (husk `using Ordresystem;` øverst i Program.cs). Det er en miniudgave af det, et rigtigt salgssystem — og meget muligt dit eksamensprojekt — består af.",
        kode: R`Kunde kunde = new Kunde { Navn = "Peter", Email = "peter@mail.dk" };

Ordre ordre = new Ordre
{
    Nummer = 1001,
    Kunde = kunde,
    Linjer = new Ordrelinje[]
    {
        new Ordrelinje { Vare = "Kaffe", Antal = 2, Stykpris = 45 },
        new Ordrelinje { Vare = "Kage", Antal = 1, Stykpris = 30 }
    }
};

Console.WriteLine($"Ordre {ordre.Nummer} til {ordre.Kunde.Navn}");
foreach (Ordrelinje l in ordre.Linjer)
{
    Console.WriteLine($"  {l.Antal} x {l.Vare} = {l.Sum} kr.");
}
Console.WriteLine($"I alt: {ordre.Total()} kr.");

class Kunde
{
    public string Navn { get; set; }
    public string Email { get; set; }
}

class Ordrelinje
{
    public string Vare { get; set; }
    public int Antal { get; set; }
    public decimal Stykpris { get; set; }
    public decimal Sum => Antal * Stykpris;
}

class Ordre
{
    public int Nummer { get; set; }
    public Kunde Kunde { get; set; }
    public Ordrelinje[] Linjer { get; set; }

    public decimal Total()
    {
        decimal total = 0;
        foreach (Ordrelinje l in Linjer)
        {
            total += l.Sum;
        }
        return total;
    }
}`,
        output: "Ordre 1001 til Peter\n  2 x Kaffe = 90 kr.\n  1 x Kage = 30 kr.\nI alt: 120 kr.",
        md2: "{{Visual Studio sætter måske grønne bølgestreger||Rider sætter måske bølgestreger, der ikke er røde,}} under nogle af propertyerne med en advarsel om *non-nullable property*. Det er en advarsel om `null`, ikke en fejl. Den forklares i modul 7." },
      { t: "laes", h: "De fire søjler i OOP",
        md: "Til eksamen vil du blive bedt om at forklare **de fire grundidéer i objektorienteret programmering**. Nu kan du den første — de tre andre kommer i de næste moduler:\n\n1. **Indkapsling** — skjul data, giv adgang gennem properties og metoder. *(Dette modul.)*\n2. **Arv** — en klasse kan bygge videre på en anden. *(Modul 5.)*\n3. **Polymorfi** — forskellige objekter kan svare forskelligt på det samme kald. *(Modul 5.)*\n4. **Abstraktion** — vis det væsentlige, skjul detaljerne. *(Modul 7.)*\n\nLær de fire ord udenad allerede nu." },
      { t: "forklar", q: "Forklar med dine egne ord: To variabler, `a` og `b`, peger på det samme objekt. Du ændrer en property gennem `b`. Hvad sker der med `a` — og hvorfor?",
        svar: "Ændringen ses også gennem `a`. En variabel af en klassetype indeholder ikke selve objektet, men en **reference** til det. `b = a` kopierer kun **referencen**, så begge variabler peger på **det samme objekt** i hukommelsen. Der er kun ét objekt, fordi der kun er brugt `new` én gang.",
        noegle: ["reference", "samme objekt", "kopierer", "new"] }
    ] }
  ]
});
})();
