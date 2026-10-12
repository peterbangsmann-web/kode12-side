// Værksted til modul 5 — Arv og polymorfi.
(function () {
const R = String.raw;
var m = window.KURSUS.filter(function (x) { return x.id === "m05"; })[0];
if (!m) return;
m.lektioner.push({ id: "m05v", titel: "Værksted: arv og polymorfi i praksis", vaerksted: true, min: 60, ord: [], trin: [

  { t: "laes", h: "Sådan arbejder du i værkstedet",
    md: "Nu skal du skrive **hele programmer selv** i {{Visual Studio||Rider}} — med basisklasser, afledte klasser, `virtual`, `override` og `base`.\n\nOpgaverne bliver sværere hen ad vejen. Den første er let. Den tredje er en fejlfinding, hvor du skal bruge debuggeren. Den sidste samler hele modulet i ét program.",
    noter: [
      ["Skriv selv", "Skriv koden med dine egne fingre. Kopiér ikke fra modulet."],
      ["Kør tit", "Kør efter hver ny klasse. Så ved du, hvor en fejl kom ind."],
      ["Brug debuggeren", "Sæt et **breakpoint**, og brug {{**F11** (Step Into)||**Step Into**}} på et metodekald. Så kan du **se**, hvilken udgave af metoden der faktisk kører — basisklassens eller den afledte klasses."],
      ["Læs advarslerne", "Grønne eller gule bølgestreger er advarsler. Programmet kører, men compileren har set noget mistænkeligt. Hold musen over og læs teksten."],
      ["Tips før løsning", "Åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af."]
    ] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Dyrenes lyde", projekt: "Dyrelyde",
    md: "Lav en basisklasse `Dyr` og tre afledte klasser. Alle dyr kan præsentere sig, men hvert dyr giver sin egen lyd. Et dyr, der ikke har sin egen lyd, bruger basisklassens.",
    krav: [
      "`Dyr` har en auto-property `Navn` (`string`)",
      "`Dyr` har en metode `public virtual string Lyd()`, der returnerer `...`",
      "`Dyr` har en metode `Praesenter()`, der skriver `{Navn} siger {Lyd()}`",
      "`Hund : Dyr` overskriver `Lyd()` og returnerer `Vov`. `Kat : Dyr` overskriver og returnerer `Mjav`",
      "`Fisk : Dyr` overskriver **ikke** `Lyd()`",
      "Programmet laver et array `Dyr[]` med hunden Fido, katten Mis og fisken Nemo (i den rækkefølge) og kalder `Praesenter()` på hvert dyr i en `foreach`"
    ],
    tip: [
      "Skriv `Dyr` færdig først, med `Lyd()` og `Praesenter()`. Lav så `class Hund : Dyr { }` med kun `Lyd()` indeni.",
      "I den afledte klasse: `public override string Lyd() { return \"Vov\"; }`.",
      "Arrayet: `Dyr[] dyr = { new Hund { Navn = \"Fido\" }, new Kat { Navn = \"Mis\" }, new Fisk { Navn = \"Nemo\" } };`."
    ],
    output: "Fido siger Vov\nMis siger Mjav\nNemo siger ...",
    loesning: R`Dyr[] dyr = { new Hund { Navn = "Fido" }, new Kat { Navn = "Mis" }, new Fisk { Navn = "Nemo" } };

foreach (Dyr d in dyr)
{
    d.Praesenter();
}

class Dyr
{
    public string Navn { get; set; }

    public virtual string Lyd()
    {
        return "...";
    }

    public void Praesenter()
    {
        Console.WriteLine($"{Navn} siger {Lyd()}");
    }
}

class Hund : Dyr
{
    public override string Lyd()
    {
        return "Vov";
    }
}

class Kat : Dyr
{
    public override string Lyd()
    {
        return "Mjav";
    }
}

class Fisk : Dyr
{
}`,
    ekstra: ["Læg mærke til, at `Praesenter()` står i `Dyr` og alligevel får hundens lyd. Sæt et breakpoint i `Praesenter()`, og brug Step Into på `Lyd()` for at se, hvilken udgave der kører.", "Tilføj en `Ko`, der siger `Muh`, og læg den i arrayet. Løkken skal ikke ændres."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Skolens personer med konstruktører", projekt: "Skole",
    md: "Lav en `Person` og to afledte klasser, `Elev` og `Laerer`. Navnet hører til `Person`, så det er `Person`s konstruktør, der gemmer det — de afledte klasser sender det videre med `: base(...)`.\n\nHver konstruktør skriver en linje, så du kan **se** rækkefølgen, konstruktørerne kører i.",
    krav: [
      "`Person` har `Navn` (`string`, `{ get; }`) og en konstruktør `Person(string navn)`, der gemmer navnet og skriver `Person oprettet: {navn}`",
      "`Person` overskriver `ToString()` og returnerer `Navn`",
      "`Elev : Person` har `Klasse` (`string`, `{ get; }`). Konstruktøren `Elev(string navn, string klasse) : base(navn)` gemmer klassen og skriver `Elev oprettet: {klasse}`",
      "`Laerer : Person` har `Fag` (`string`, `{ get; }`). Konstruktøren `Laerer(string navn, string fag) : base(navn)` gemmer faget og skriver `Lærer oprettet: {fag}`",
      "`Elev.ToString()` returnerer `base.ToString() + \", elev i \" + Klasse`. `Laerer.ToString()` returnerer `base.ToString() + \", lærer i \" + Fag`",
      "Programmet laver `Person[] alle = { new Elev(\"Maja\", \"7.B\"), new Laerer(\"Jens\", \"Dansk\") };` og skriver hver person ud med `Console.WriteLine` i en `foreach`"
    ],
    tip: [
      "Konstruktører arves ikke. Hver afledt klasse skal have sin egen, og den skal kalde `base(navn)`, fordi `Person` kun har en konstruktør, der kræver et navn.",
      "`public Elev(string navn, string klasse) : base(navn) { Klasse = klasse; Console.WriteLine($\"Elev oprettet: {klasse}\"); }`",
      "`public override string ToString() { return base.ToString() + \", elev i \" + Klasse; }` — `base.ToString()` giver navnet fra `Person`."
    ],
    output: "Person oprettet: Maja\nElev oprettet: 7.B\nPerson oprettet: Jens\nLærer oprettet: Dansk\nMaja, elev i 7.B\nJens, lærer i Dansk",
    loesning: R`Person[] alle = { new Elev("Maja", "7.B"), new Laerer("Jens", "Dansk") };

foreach (Person p in alle)
{
    Console.WriteLine(p);
}

class Person
{
    public string Navn { get; }

    public Person(string navn)
    {
        Navn = navn;
        Console.WriteLine($"Person oprettet: {navn}");
    }

    public override string ToString()
    {
        return Navn;
    }
}

class Elev : Person
{
    public string Klasse { get; }

    public Elev(string navn, string klasse) : base(navn)
    {
        Klasse = klasse;
        Console.WriteLine($"Elev oprettet: {klasse}");
    }

    public override string ToString()
    {
        return base.ToString() + ", elev i " + Klasse;
    }
}

class Laerer : Person
{
    public string Fag { get; }

    public Laerer(string navn, string fag) : base(navn)
    {
        Fag = fag;
        Console.WriteLine($"Lærer oprettet: {fag}");
    }

    public override string ToString()
    {
        return base.ToString() + ", lærer i " + Fag;
    }
}`,
    ekstra: ["Slet `: base(navn)` i `Elev`. Læs fejlen, og forklar den med egne ord. Sæt den ind igen.", "Sæt et breakpoint på `new Elev(...)`, og brug Step Into. Se, at du først havner i `Person`s konstruktør."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Fejlfinding: figurernes areal", projekt: "Figurer",
    md: "Programmet nedenfor skal skrive arealet af tre figurer og det samlede areal. Rektanglerne er 4 × 5 og 2 × 10, og kvadratet har siden 3. Det samlede areal skal altså være 49. Men rektanglerne får arealet 0.\n\nProgrammet kan oversættes. Find fejlen **med debuggeren**:\n\n1. Kopiér koden ind i Program.cs, og kør den. Se den forkerte udskrift.\n2. Sæt et **breakpoint** på linjen `samlet += f.Areal();` i løkken.\n3. Start med debuggeren ({{**F5**||den **grønne bille** 🐞}}). Se i {{**Locals**||**Threads & Variables**}}, hvad `f` er — der står objektets rigtige type ud for den.\n4. Brug {{**F11** (Step Into)||**Step Into**}}. Hvilken klasses `Areal()` havner du i, når `f` er et `Rektangel`? Og når `f` er et `Kvadrat`?\n5. Se også på advarslerne i {{**Error List**||**Problems**}}.",
    krav: [
      "Find ud af, hvorfor `f.Areal()` giver 0 for rektanglerne, men 9 for kvadratet",
      "Ret fejlen med så lille en ændring som muligt — løkken i toppen må ikke ændres",
      "Programmet skriver `Rektangel: 20`, `Kvadrat: 9`, `Rektangel: 20` og `Samlet areal: 49`"
    ],
    start: R`Figur[] figurer = { new Rektangel(4, 5), new Kvadrat(3), new Rektangel(2, 10) };
int samlet = 0;

foreach (Figur f in figurer)
{
    Console.WriteLine($"{f.Navn}: {f.Areal()}");
    samlet += f.Areal();
}
Console.WriteLine($"Samlet areal: {samlet}");

class Figur
{
    public string Navn { get; }

    public Figur(string navn)
    {
        Navn = navn;
    }

    public virtual int Areal()
    {
        return 0;
    }
}

class Rektangel : Figur
{
    private int bredde;
    private int hoejde;

    public Rektangel(int bredde, int hoejde) : base("Rektangel")
    {
        this.bredde = bredde;
        this.hoejde = hoejde;
    }

    public int Areal()
    {
        return bredde * hoejde;
    }
}

class Kvadrat : Figur
{
    private int side;

    public Kvadrat(int side) : base("Kvadrat")
    {
        this.side = side;
    }

    public override int Areal()
    {
        return side * side;
    }
}`,
    startOutput: "Rektangel: 0\nKvadrat: 9\nRektangel: 0\nSamlet areal: 9",
    tip: [
      "Step Into viser, at et `Rektangel` havner i `Figur.Areal()`, som returnerer 0. Rektanglets egen metode bliver aldrig kaldt. Hvad er forskellen på `Areal()` i `Rektangel` og i `Kvadrat`?",
      "Advarslen siger noget i stil med `'Rektangel.Areal()' hides inherited member 'Figur.Areal()'`. Metoden **skjuler** basisklassens metode i stedet for at **erstatte** den. Gennem en `Figur`-variabel er det så basisklassens udgave, der kører.",
      "Der mangler ét ord i `Rektangel`: `public override int Areal()`."
    ],
    output: "Rektangel: 20\nKvadrat: 9\nRektangel: 20\nSamlet areal: 49",
    loesning: R`Figur[] figurer = { new Rektangel(4, 5), new Kvadrat(3), new Rektangel(2, 10) };
int samlet = 0;

foreach (Figur f in figurer)
{
    Console.WriteLine($"{f.Navn}: {f.Areal()}");
    samlet += f.Areal();
}
Console.WriteLine($"Samlet areal: {samlet}");

class Figur
{
    public string Navn { get; }

    public Figur(string navn)
    {
        Navn = navn;
    }

    public virtual int Areal()
    {
        return 0;
    }
}

class Rektangel : Figur
{
    private int bredde;
    private int hoejde;

    public Rektangel(int bredde, int hoejde) : base("Rektangel")
    {
        this.bredde = bredde;
        this.hoejde = hoejde;
    }

    public override int Areal()
    {
        return bredde * hoejde;
    }
}

class Kvadrat : Figur
{
    private int side;

    public Kvadrat(int side) : base("Kvadrat")
    {
        this.side = side;
    }

    public override int Areal()
    {
        return side * side;
    }
}`,
    ekstra: ["Skriv i den **fejlbehæftede** udgave `Rektangel r = new Rektangel(4, 5); Console.WriteLine(r.Areal());`. Det giver 20! Forklar hvorfor: variablens type er nu `Rektangel`, så rektanglets skjulte metode bliver fundet. Det er derfor, method hiding er så forvirrende."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Konto med kassekredit", projekt: "Kassekredit",
    md: "En almindelig konto må aldrig gå i minus. En konto med **kassekredit** må gerne gå i minus — men kun ned til en grænse. Det er den samme handling, `Haev`, med to forskellige regler. Det er et job for `virtual` og `override`.\n\nSaldoen ligger i et `protected` felt, så den afledte klasse kan ændre den, men resten af programmet kan ikke.",
    krav: [
      "`Konto` har `Ejer` (`string`, `{ get; }`), et felt `protected decimal saldo` og en property `public decimal Saldo => saldo;`",
      "`Konto` har konstruktøren `Konto(string ejer)` og metoden `Indsaet(decimal beloeb)`, der lægger beløbet til `saldo`",
      "`public virtual bool Haev(decimal beloeb)` i `Konto`: er beløbet større end `saldo`, returneres `false`. Ellers trækkes beløbet fra, og der returneres `true`",
      "`Konto.ToString()` returnerer `{Ejer}: {saldo} kr.`",
      "`Kassekredit : Konto` har `Graense` (`decimal`, `{ get; }`) og konstruktøren `Kassekredit(string ejer, decimal graense) : base(ejer)`",
      "`Kassekredit` overskriver `Haev`: ville `saldo - beloeb` komme under `-Graense`, returneres `false`. Ellers trækkes beløbet fra, og der returneres `true`",
      "Programmet: `Konto[] konti = { new Konto(\"Anna\"), new Kassekredit(\"Bo\", 1000) };`. For hver konto: indsæt 500, hæv 800, skriv `{Ejer} hæver 800: godkendt` eller `… afvist`, og skriv kontoen ud",
      "Er kontoen en `Kassekredit` (brug `is`), skrives desuden `  Kredit tilbage: {Graense + Saldo} kr.` (to mellemrum foran)"
    ],
    tip: [
      "Lav `Konto` færdig og afprøv den alene med Anna, før du laver `Kassekredit`.",
      "I `Kassekredit`: `public override bool Haev(decimal beloeb) { if (saldo - beloeb < -Graense) { return false; } saldo -= beloeb; return true; }`.",
      "I løkken: `bool ok = k.Haev(800); string svar = ok ? \"godkendt\" : \"afvist\";` og senere `if (k is Kassekredit kk) { Console.WriteLine($\"  Kredit tilbage: {kk.Graense + kk.Saldo} kr.\"); }`."
    ],
    output: "Anna hæver 800: afvist\nAnna: 500 kr.\nBo hæver 800: godkendt\nBo: -300 kr.\n  Kredit tilbage: 700 kr.",
    loesning: R`Konto[] konti = { new Konto("Anna"), new Kassekredit("Bo", 1000) };

foreach (Konto k in konti)
{
    k.Indsaet(500);
    bool ok = k.Haev(800);
    string svar = ok ? "godkendt" : "afvist";
    Console.WriteLine($"{k.Ejer} hæver 800: {svar}");
    Console.WriteLine(k);

    if (k is Kassekredit kk)
    {
        Console.WriteLine($"  Kredit tilbage: {kk.Graense + kk.Saldo} kr.");
    }
}

class Konto
{
    public string Ejer { get; }
    protected decimal saldo;
    public decimal Saldo => saldo;

    public Konto(string ejer)
    {
        Ejer = ejer;
    }

    public void Indsaet(decimal beloeb)
    {
        saldo += beloeb;
    }

    public virtual bool Haev(decimal beloeb)
    {
        if (beloeb > saldo)
        {
            return false;
        }
        saldo -= beloeb;
        return true;
    }

    public override string ToString()
    {
        return $"{Ejer}: {saldo} kr.";
    }
}

class Kassekredit : Konto
{
    public decimal Graense { get; }

    public Kassekredit(string ejer, decimal graense) : base(ejer)
    {
        Graense = graense;
    }

    public override bool Haev(decimal beloeb)
    {
        if (saldo - beloeb < -Graense)
        {
            return false;
        }
        saldo -= beloeb;
        return true;
    }
}`,
    ekstra: ["Skriv `Console.WriteLine(k.Graense);` inde i løkken (uden for `if`). Læs fejlen: variablen `k` har typen `Konto`, og en `Konto` har ingen `Graense`.", "Lad `Kassekredit.ToString()` bygge videre på basisklassens med `base.ToString() + $\" (grænse {Graense} kr.)\"`."] },

  // ------------------------------------------------------------------
  { t: "opgave", h: "Samlet program: færgen", projekt: "Faerge",
    md: "Nu samler du hele modulet. En færge sejler med forskellige køretøjer, og billetprisen afhænger af typen. Alle køretøjer har en grundpris på 300 kr., og hver afledt klasse **bygger videre** på den med `base.Pris()`.\n\nFærgen **har** et array af køretøjer (komposition). Køretøjerne **er** køretøjer (arv). Én løkke regner prisen ud for dem alle (polymorfi).",
    krav: [
      "`Koeretoej` har `Nummerplade` (`string`, `{ get; }`), konstruktøren `Koeretoej(string nummerplade)` og `public virtual decimal Pris()`, der returnerer 300",
      "`Koeretoej.ToString()` returnerer `{GetType().Name} {Nummerplade}: {Pris()} kr.`",
      "`Bil : Koeretoej` har `Passagerer` (`int`, `{ get; }`). Prisen er `base.Pris() + Passagerer * 50`",
      "`sealed class Elbil : Bil` — prisen er `base.Pris() - 100` (elbiler får 100 kr. rabat i forhold til en almindelig bil)",
      "`Lastbil : Koeretoej` har `Ton` (`int`, `{ get; }`). Prisen er `base.Pris() + Ton * 100`",
      "`Motorcykel : Koeretoej` — prisen er `base.Pris() / 2`",
      "`Faerge` har `Navn` (`string`) og `Daek` (`Koeretoej[]`) som auto-properties, en metode `Indtjening()`, der lægger alle priser sammen, og en metode `AntalLastbiler()`, der tæller med `is`",
      "`Faerge.Vis()` skriver `Færgen {Navn}:`, derefter hvert køretøj med to mellemrum foran, derefter `Indtjening: … kr.` og `Lastbiler: …`",
      "Programmet laver færgen `Kattegat` med: `Bil(\"AB12345\", 2)`, `Elbil(\"EL11111\", 3)`, `Lastbil(\"LT55555\", 12)` og `Motorcykel(\"MC22222\")` — i den rækkefølge — og kalder `Vis()`"
    ],
    tip: [
      "Byg det i lag: `Koeretoej` og `Bil` først, med én bil, og `Console.WriteLine(bil);`. Kør. Tilføj så én klasse ad gangen.",
      "`Elbil` arver fra `Bil`, ikke fra `Koeretoej`. Dens konstruktør er `public Elbil(string nummerplade, int passagerer) : base(nummerplade, passagerer) { }`, og `base.Pris()` er så **bilens** pris.",
      "`AntalLastbiler`: `int antal = 0; foreach (Koeretoej k in Daek) { if (k is Lastbil) { antal++; } } return antal;`."
    ],
    output: "Færgen Kattegat:\n  Bil AB12345: 400 kr.\n  Elbil EL11111: 350 kr.\n  Lastbil LT55555: 1500 kr.\n  Motorcykel MC22222: 150 kr.\nIndtjening: 2400 kr.\nLastbiler: 1",
    loesning: R`Faerge f = new Faerge
{
    Navn = "Kattegat",
    Daek = new Koeretoej[]
    {
        new Bil("AB12345", 2),
        new Elbil("EL11111", 3),
        new Lastbil("LT55555", 12),
        new Motorcykel("MC22222")
    }
};

f.Vis();

class Koeretoej
{
    public string Nummerplade { get; }

    public Koeretoej(string nummerplade)
    {
        Nummerplade = nummerplade;
    }

    public virtual decimal Pris()
    {
        return 300;
    }

    public override string ToString()
    {
        return $"{GetType().Name} {Nummerplade}: {Pris()} kr.";
    }
}

class Bil : Koeretoej
{
    public int Passagerer { get; }

    public Bil(string nummerplade, int passagerer) : base(nummerplade)
    {
        Passagerer = passagerer;
    }

    public override decimal Pris()
    {
        return base.Pris() + Passagerer * 50;
    }
}

sealed class Elbil : Bil
{
    public Elbil(string nummerplade, int passagerer) : base(nummerplade, passagerer)
    {
    }

    public override decimal Pris()
    {
        return base.Pris() - 100;
    }
}

class Lastbil : Koeretoej
{
    public int Ton { get; }

    public Lastbil(string nummerplade, int ton) : base(nummerplade)
    {
        Ton = ton;
    }

    public override decimal Pris()
    {
        return base.Pris() + Ton * 100;
    }
}

class Motorcykel : Koeretoej
{
    public Motorcykel(string nummerplade) : base(nummerplade)
    {
    }

    public override decimal Pris()
    {
        return base.Pris() / 2;
    }
}

class Faerge
{
    public string Navn { get; set; }
    public Koeretoej[] Daek { get; set; }

    public decimal Indtjening()
    {
        decimal sum = 0;
        foreach (Koeretoej k in Daek)
        {
            sum += k.Pris();
        }
        return sum;
    }

    public int AntalLastbiler()
    {
        int antal = 0;
        foreach (Koeretoej k in Daek)
        {
            if (k is Lastbil)
            {
                antal++;
            }
        }
        return antal;
    }

    public void Vis()
    {
        Console.WriteLine($"Færgen {Navn}:");
        foreach (Koeretoej k in Daek)
        {
            Console.WriteLine($"  {k}");
        }
        Console.WriteLine($"Indtjening: {Indtjening()} kr.");
        Console.WriteLine($"Lastbiler: {AntalLastbiler()}");
    }
}`,
    ekstra: ["Skriv `class SuperElbil : Elbil { }`. Læs fejlen — det er `sealed`, der stopper dig. Slet linjen igen.", "Sæt et breakpoint i `Elbil.Pris()`, og brug Step Into på `base.Pris()`. Følg kæden: Elbil → Bil → Koeretoej, og se tallet vokse på vejen tilbage.", "Tilføj en `Cykel`, der sejler gratis (pris 0). Hvor mange steder i `Faerge` skal du ændre noget? (Svar: ingen.)"] },

  // ------------------------------------------------------------------
  { t: "spor", h: "Spor: konstruktører og base",
    q: "Følg programmet, mens det hopper ind i klasserne. Rækkerne står i den rækkefølge, linjerne **bliver kørt** — ikke i den rækkefølge, de står i filen. Skriv `Navn` og `Energi` for hunden lige efter hver linje.",
    kode: R`Hund h = new Hund("Fido", 5);
h.Loeb();
h.Loeb();
Console.WriteLine($"{h.Navn}: {h.Energi}");

class Dyr
{
    public string Navn { get; }
    public int Energi { get; protected set; }

    public Dyr(string navn, int energi)
    {
        Navn = navn;
        Energi = energi;
    }

    public virtual void Loeb()
    {
        Energi -= 1;
    }
}

class Hund : Dyr
{
    public Hund(string navn, int energi) : base(navn, energi * 2)
    {
        Energi += 3;
    }

    public override void Loeb()
    {
        base.Loeb();
        Energi -= 2;
    }
}`,
    kolonner: ["Navn", "Energi"],
    raekker: [[13, "=Fido", "=0"], [14, "Fido", "10"], [27, "Fido", "13"], [19, "Fido", "12"], [33, "Fido", "10"], [19, "Fido", "9"], [33, "Fido", "7"]],
    slut: false,
    output: "Fido: 7",
    fordi: "`: base(navn, energi * 2)` sender 10 videre, og **basisklassens konstruktør kører først** (linje 13–14). Bagefter kører `Hund`s egen krop og lægger 3 til (linje 27). Hvert `Loeb()` kører `Hund`s udgave: først `base.Loeb()` (−1 i linje 19), så −2 i linje 33. To løb: 13 → 10 → 7." },

  { t: "spor", h: "Spor: én løkke, mange former",
    q: "Følg løkken. Skriv `sum` og den **rigtige type** på objektet i `x`, lige efter at linje 5 er kørt for hvert element. Husk: findes der ingen `override`, kører basisklassens udgave.",
    kode: R`Figur[] figurer = { new Kvadrat(3), new Figur(), new Rektangel(2, 5), new Trekant() };
int sum = 0;
foreach (Figur x in figurer)
{
    sum += x.Areal();
}
Console.WriteLine(sum);

class Figur { public virtual int Areal() { return 0; } }
class Kvadrat : Figur { private int s; public Kvadrat(int s) { this.s = s; } public override int Areal() { return s * s; } }
class Rektangel : Figur { private int b; private int h; public Rektangel(int b, int h) { this.b = b; this.h = h; } public override int Areal() { return b * h; } }
class Trekant : Figur { }`,
    kolonner: ["sum", "x er en"],
    raekker: [[2, "=0", "=–"], [5, "=9", "=Kvadrat"], [5, "9", "Figur"], [5, "19", "Rektangel"], [5, "19", "Trekant"]],
    slut: false,
    output: "19",
    fordi: "Variablen `x` har altid typen `Figur`, men **objektet** skifter. Kvadratet giver 3 · 3 = 9, den almindelige figur giver 0, rektanglet giver 2 · 5 = 10, og trekanten har ingen `override` — så den bruger `Figur`s udgave og giver 0. I alt 19." },

  { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: I fejlfindingsopgaven manglede ordet `override` i `Rektangel`. Hvorfor gav rektanglerne så arealet 0, selvom klassen havde sin egen `Areal()`-metode?",
    svar: "Uden `override` **erstatter** rektanglets metode ikke basisklassens — den **skjuler** den bare (method hiding), og compileren giver en advarsel. Løkken kalder metoden gennem en variabel af typen `Figur`. Ved et virtual kald bestemmer **objektets rigtige type**, hvilken udgave der kører, men kun hvis den afledte klasse har **overskrevet** metoden. Det havde `Rektangel` ikke, så `Figur.Areal()` kørte og returnerede 0. Med `override` virker **polymorfien**, og `Rektangel.Areal()` bliver kaldt.",
    noegle: ["override", "skjuler", "virtual", "objektets type", "Figur-variabel", "polymorfi"] }

] });
})();
