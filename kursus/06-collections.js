// Modul 6 — Collections og datastrukturer. Forudsætter: modul 0–5.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m06", nr: 6, del: "Del 2 · Objektorienteret C#", ikon: "🗂️",
  titel: "Collections og datastrukturer",
  dag: "Kursusdag 5 · Collections og datastrukturer",
  intro: "Et array har en fast størrelse. I virkelige programmer ved man sjældent, hvor mange kunder eller ordrer der kommer. Her lærer du de **samlinger**, der kan vokse — først og fremmest `List` og `Dictionary`, som du kommer til at bruge i hvert eneste projekt.\n\n\"Datastrukturer og abstrakte datatyper\" er et af kursets læringsmål, så du skal også kunne forklare, **hvornår man vælger hvilken**.",
  video: ["05_Fre_Collections_And_Data_Structures.mp4 (2 t 11 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m06l1", titel: "List: et array, der kan vokse", min: 16,
    ord: [
      ["Collection (samling)", "Et objekt, der holder på mange andre værdier eller objekter. List og Dictionary er collections."],
      ["List<T>", "En samling i rækkefølge, der kan vokse og skrumpe. T er typen af det, der ligger i den."],
      ["Add", "Lægger et element til sidst i listen."],
      ["Count", "Antallet af elementer i en collection. (Arrays bruger Length.)"],
      ["Remove", "Fjerner den første forekomst af en værdi. RemoveAt fjerner på et bestemt indeks."],
      ["Collection initializer", "At fylde en collection, når den oprettes: `new List<int> { 1, 2, 3 }`."]
    ],
    trin: [
      { t: "laes", h: "Arrayets svaghed",
        md: "Et array får sin størrelse, når det oprettes, og den kan **aldrig ændres**. Det er upraktisk, når brugeren selv tilføjer og sletter — fx varer i en kurv.\n\nEn `List` er en **samling** (*collection*), der kan vokse og skrumpe. Den bruges ellers som et array: elementerne ligger i rækkefølge og har et indeks fra 0.",
        kode: R`List<string> navne = new List<string>();
navne.Add("Anna");
navne.Add("Bo");
navne.Add("Carl");

Console.WriteLine(navne.Count);
Console.WriteLine(navne[0]);`,
        noter: [
          ["List<string>", "En liste af strings. Typen i de spidse parenteser bestemmer, hvad listen må indeholde."],
          ["new List<string>()", "Opret en tom liste. Husk parenteserne."],
          [".Add(\"Anna\")", "Læg et element til sidst."],
          [".Count", "Antal elementer. Arrays har `Length` — lister har `Count`."],
          ["navne[0]", "Indeks virker som i et array."]
        ],
        output: "3\nAnna" },
      { t: "forudsig",
        kode: R`List<int> tal = new List<int>();
tal.Add(10);
tal.Add(20);
tal.Add(30);
tal[1] = 99;

Console.WriteLine(tal.Count);
Console.WriteLine(tal[1]);
Console.WriteLine(tal[tal.Count - 1]);`,
        output: "3\n99\n30",
        fordi: "Tre elementer. Plads 1 er blevet overskrevet med 99. Det sidste element har indeks `Count - 1`." },
      { t: "udfyld", q: "Opret en liste af heltal, og læg to tal i den.",
        kode: R`[[List]]<int> point = new List<[[int]]>();
point.[[Add]](7);
point.Add(12);
Console.WriteLine(point.Count);`,
        output: "2",
        fordi: "`List<int>` på begge sider af lighedstegnet. `Add` lægger til." },
      { t: "laes", h: "Fyld listen med det samme",
        md: "Kender du indholdet fra start, kan du skrive det i tuborgklammer efter `new` — ligesom med arrays. Og en liste gennemløbes med `foreach`, præcis som et array.",
        kode: R`List<string> farver = new List<string> { "rød", "grøn", "blå" };

foreach (string farve in farver)
{
    Console.WriteLine(farve);
}`,
        output: "rød\ngrøn\nblå",
        md2: "Du vil også se de korte former `var farver = new List<string>();` og `List<string> farver = new();` — og i helt ny C# `List<string> farver = [\"rød\", \"grøn\"];`. De betyder det samme." },
      { t: "laes", h: "Fjern, indsæt og søg",
        md: "En liste har en hel værktøjskasse af metoder. Her er dem, du bruger mest:",
        kode: R`List<string> kurv = new List<string> { "mælk", "brød", "ost" };

kurv.Remove("brød");
kurv.Insert(0, "æg");
Console.WriteLine(string.Join(", ", kurv));

Console.WriteLine(kurv.Contains("ost"));
Console.WriteLine(kurv.IndexOf("ost"));

kurv.RemoveAt(0);
Console.WriteLine(kurv[0]);

kurv.Clear();
Console.WriteLine(kurv.Count);`,
        noter: [
          [".Remove(\"brød\")", "Fjern den første, der er lig med værdien."],
          [".Insert(0, \"æg\")", "Sæt ind på et bestemt indeks. Resten rykker én plads."],
          [".Contains(…)", "Findes værdien? true/false."],
          [".IndexOf(…)", "Hvilket indeks? −1, hvis den ikke findes."],
          [".RemoveAt(0)", "Fjern elementet på et bestemt indeks."],
          [".Clear()", "Tøm hele listen."]
        ],
        output: "æg, mælk, ost\nTrue\n2\nmælk\n0" },
      { t: "forudsig",
        kode: R`List<int> tal = new List<int> { 5, 8, 2, 8 };
tal.Remove(8);
tal.Add(1);
tal.Insert(1, 9);
Console.WriteLine(string.Join(" ", tal));`,
        output: "5 9 2 8 1",
        fordi: "`Remove(8)` fjerner kun den **første** 8: {5, 2, 8}. `Add(1)` lægger til sidst: {5, 2, 8, 1}. `Insert(1, 9)` sætter 9 ind på plads 1: {5, 9, 2, 8, 1}." },
      { t: "laes", h: "Sortér og vend",
        md: "`Sort()` sorterer selve listen — tal i stigende rækkefølge, tekst alfabetisk. `Reverse()` vender rækkefølgen om.",
        kode: R`List<int> tal = new List<int> { 7, 2, 9, 4 };
tal.Sort();
Console.WriteLine(string.Join(" ", tal));
tal.Reverse();
Console.WriteLine(string.Join(" ", tal));
Console.WriteLine($"Mindst: {tal.Min()}, størst: {tal.Max()}, sum: {tal.Sum()}");`,
        output: "2 4 7 9\n9 7 4 2\nMindst: 2, størst: 9, sum: 22",
        md2: "`Min()`, `Max()` og `Sum()` er de algoritmer, du selv skrev i modul 3 — nu som færdige metoder. De hører til **LINQ**, som du lærer i modul 9." },
      { t: "fejl", q: "Programmet oversættes, men går ned, når det kører. Hvilken linje er skyld i det?",
        kode: R`List<string> navne = new List<string>();
navne.Add("Anna");
navne.Add("Bo");
Console.WriteLine(navne[2]);`,
        linje: 4, logisk: true, fejler: true,
        fordi: "Listen har to elementer med indeks 0 og 1. Indeks 2 findes ikke. For en liste hedder fejlen `ArgumentOutOfRangeException` — det er samme problem som `IndexOutOfRangeException` for arrays.",
        rettet: R`List<string> navne = new List<string>();
navne.Add("Anna");
navne.Add("Bo");
Console.WriteLine(navne[1]);`,
        rettetOutput: "Bo" },
      { t: "skriv", q: "Opret en `List<string>`, der hedder `byer`. Læg `\"Aarhus\"` og `\"Odense\"` i den med `Add`, og skriv antallet af elementer ud med `Count`.",
        tjek: [
          [/(List<string>|var )byer=new( List<string>)?\(\);/, "Opret listen: `List<string> byer = new List<string>();`"],
          ['byer.Add("Aarhus");', "Tilføj Aarhus med `Add`"],
          ['byer.Add("Odense");', "Tilføj Odense med `Add`"],
          ["Console.WriteLine(byer.Count);", "Skriv antallet ud: `Console.WriteLine(byer.Count);`"],
          [/byer\.Length/, "En liste har `Count` — ikke `Length`", "ikke"]
        ],
        loesning: R`List<string> byer = new List<string>();
byer.Add("Aarhus");
byer.Add("Odense");
Console.WriteLine(byer.Count);`,
        output: "2" },
      { t: "valg", q: "Hvornår vælger du et array frem for en `List`?",
        svar: ["Når antallet af elementer ligger fast og aldrig ændres", "Når elementerne skal kunne slettes", "Når brugeren selv tilføjer elementer", "Altid — en List er langsom"],
        ret: 0, fordi: "Et array er til et **fast antal**, fx ugens syv dage. Alt, der skal kunne vokse eller skrumpe, lægges i en `List`. I praksis bruger man `List` langt det meste af tiden." },
      { t: "ide", h: "En huskeliste",
        md: "Lav et Console-projekt, `Huskeliste`. Programmet bliver ved med at tage imod ting, indtil brugeren skriver `slut`.",
        kode: R`List<string> ting = new List<string>();

while (true)
{
    Console.Write("Tilføj (eller skriv slut): ");
    string svar = Console.ReadLine();

    if (svar == "slut")
    {
        break;
    }
    ting.Add(svar);
}

ting.Sort();
Console.WriteLine($"Du har {ting.Count} ting på listen:");
for (int i = 0; i < ting.Count; i++)
{
    Console.WriteLine($"{i + 1}. {ting[i]}");
}`,
        md2: "Udvid selv: lad brugeren skrive `fjern mælk` for at fjerne noget. Tip: `svar.StartsWith(\"fjern \")` og `svar.Substring(6)`." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på et array og en `List<T>`?",
        svar: "Begge holder elementer **af samme type i rækkefølge** med et **indeks fra 0**. Et **array** har en **fast størrelse**, der bestemmes, når det oprettes. En **List** kan **vokse og skrumpe**: man tilføjer med `Add` og fjerner med `Remove`. Et array har `Length`, en liste har `Count`. Indeni bruger en List selv et array, som den skifter ud med et større, når der ikke er mere plads.",
        noegle: ["fast størrelse", "vokse", "Add", "Count", "indeks"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m06l2", titel: "Lister af objekter — og hvad <T> betyder", min: 17,
    ord: [
      ["Generics", "Kode, der er skrevet med en \"type-pladsholder\", så den samme klasse eller metode kan bruges til mange forskellige typer."],
      ["Typeparameter (T)", "Pladsholderen for en type. I `List<T>` bliver T erstattet af den type, du skriver i de spidse parenteser."],
      ["Typesikkerhed", "At compileren forhindrer dig i at lægge en forkert type i en samling."],
      ["Find", "Liste-metode, der giver det første element, som opfylder en betingelse — eller null."],
      ["Lambda-udtryk", "En lille metode skrevet direkte, hvor den skal bruges: `p => p.Pris > 100`. Forklares i modul 9 og 10."]
    ],
    trin: [
      { t: "laes", h: "En liste af dine egne objekter",
        md: "I de spidse parenteser kan der stå **en hvilken som helst type** — også dine egne klasser. `List<Produkt>` er noget, du kommer til at skrive hver eneste dag: det er sådan, data fra en database ender i dit program.",
        kode: R`List<Produkt> produkter = new List<Produkt>();
produkter.Add(new Produkt { Navn = "Kaffe", Pris = 45 });
produkter.Add(new Produkt { Navn = "Te", Pris = 30 });

foreach (Produkt p in produkter)
{
    Console.WriteLine($"{p.Navn}: {p.Pris} kr.");
}

class Produkt
{
    public string Navn { get; set; }
    public decimal Pris { get; set; }
}`,
        output: "Kaffe: 45 kr.\nTe: 30 kr." },
      { t: "forudsig",
        kode: R`List<Elev> elever = new List<Elev>
{
    new Elev { Navn = "Maja", Karakter = 10 },
    new Elev { Navn = "Ali", Karakter = 4 },
    new Elev { Navn = "Ida", Karakter = 12 }
};

int antal = 0;
foreach (Elev e in elever)
{
    if (e.Karakter >= 10)
    {
        antal++;
    }
}
Console.WriteLine(antal);
Console.WriteLine(elever[1].Navn);

class Elev
{
    public string Navn { get; set; }
    public int Karakter { get; set; }
}`,
        output: "2\nAli",
        fordi: "To elever har mindst 10. `elever[1]` er det andet objekt i listen, og `.Navn` henter dets navn." },
      { t: "laes", h: "Søg i en liste af objekter",
        md: "Den klassiske måde at finde et bestemt objekt på er en løkke med en `if`. Variablen starter som `null` — \"ikke fundet endnu\".",
        kode: R`List<Kunde> kunder = new List<Kunde>
{
    new Kunde { Id = 1, Navn = "Anna" },
    new Kunde { Id = 2, Navn = "Bo" }
};

Kunde fundet = null;
foreach (Kunde k in kunder)
{
    if (k.Id == 2)
    {
        fundet = k;
        break;
    }
}

if (fundet != null)
{
    Console.WriteLine(fundet.Navn);
}

class Kunde
{
    public int Id { get; set; }
    public string Navn { get; set; }
}`,
        output: "Bo",
        md2: "Husk tjekket `fundet != null`. Findes kunden ikke, og du skriver `fundet.Navn`, får du en `NullReferenceException`." },
      { t: "laes", h: "Den korte måde: Find",
        md: "Listen har en metode, `Find`, der gør præcis det samme på én linje. I parentesen skriver du **betingelsen** som en lille pil-funktion:",
        kode: R`List<Kunde> kunder = new List<Kunde>
{
    new Kunde { Id = 1, Navn = "Anna" },
    new Kunde { Id = 2, Navn = "Bo" }
};

Kunde fundet = kunder.Find(k => k.Id == 2);
Console.WriteLine(fundet.Navn);

class Kunde
{
    public int Id { get; set; }
    public string Navn { get; set; }
}`,
        noter: [
          ["k => k.Id == 2", "Læs det som: \"for en kunde k: er k.Id lig med 2?\". Det hedder et **lambda-udtryk**."]
        ],
        output: "Bo",
        md2: "Lambda-udtryk ser mærkelige ud første gang. Lige nu skal du bare kunne **læse** dem: venstre for pilen står navnet på ét element, til højre det, der skal gælde for det. De forklares ordentligt i modul 9 og 10 — og du kommer til at se dem konstant i web-koden." },
      { t: "udfyld", q: "Find produktet, der hedder Te.",
        kode: R`List<Produkt> produkter = new List<Produkt>
{
    new Produkt { Navn = "Kaffe", Pris = 45 },
    new Produkt { Navn = "Te", Pris = 30 }
};

Produkt p = produkter.[[Find]](x [[=>]] x.Navn == "Te");
Console.WriteLine(p.Pris);

class Produkt
{
    public string Navn { get; set; }
    public int Pris { get; set; }
}`,
        output: "30",
        fordi: "`Find` tager et lambda-udtryk: elementets navn, pilen `=>` og betingelsen." },
      { t: "laes", h: "Hvad betyder <T>?",
        md: "Slår du `List` op, står der `List<T>`. **T er en pladsholder for en type.** Dem, der skrev `List`, vidste ikke, om du ville gemme tal, tekst eller kunder. Så de skrev klassen **én gang** med et T alle de steder, typen skal stå. Når du skriver `List<int>`, bliver T til `int` overalt.\n\nDet hedder **generics**. Gevinsten er **typesikkerhed**: compileren ved, hvad listen indeholder, og stopper dig, hvis du lægger noget forkert i.",
        kode: R`List<int> tal = new List<int>();
tal.Add(5);
int foerste = tal[0];
Console.WriteLine(foerste + 1);`,
        output: "6",
        md2: "`tal.Add(\"fem\")` ville give en compilerfejl — listen er kun til `int`. Og `tal[0]` **er** en `int`, så du kan regne med den uden at konvertere." },
      { t: "fejl",
        kode: R`List<int> aldre = new List<int>();
aldre.Add(25);
aldre.Add("tredive");
Console.WriteLine(aldre.Count);`,
        linje: 3,
        fordi: "Listen er en `List<int>`, så den tager kun imod heltal. Compileren siger: `cannot convert from 'string' to 'int'`. Det er typesikkerhed: fejlen bliver fanget, **før** programmet kører.",
        rettet: R`List<int> aldre = new List<int>();
aldre.Add(25);
aldre.Add(30);
Console.WriteLine(aldre.Count);` },
      { t: "laes", h: "Din egen generiske klasse",
        md: "Du kan selv skrive klasser med en typeparameter. Her er en kasse, der kan indeholde **én ting af en hvilken som helst type**:",
        kode: R`Kasse<int> a = new Kasse<int>(42);
Kasse<string> b = new Kasse<string>("hej");

Console.WriteLine(a.Indhold + 1);
Console.WriteLine(b.Indhold.ToUpper());

class Kasse<T>
{
    public T Indhold { get; set; }

    public Kasse(T indhold)
    {
        Indhold = indhold;
    }
}`,
        noter: [
          ["class Kasse<T>", "Klassen har en typeparameter, T."],
          ["public T Indhold", "Propertyens type er \"hvad T nu bliver\"."],
          ["Kasse<int>", "Her bliver T til int. `a.Indhold` er en int."],
          ["Kasse<string>", "Her bliver T til string. `b.Indhold` er en string."]
        ],
        output: "43\nHEJ",
        md2: "Du skal sjældent skrive generiske klasser selv. Men du skal kunne **læse** dem — hele .NET er fuld af dem: `List<T>`, `Dictionary<TKey, TValue>`, `DbSet<T>`, `Task<T>`, `ActionResult<T>` …" },
      { t: "valg", q: "Hvad er fordelen ved generics som `List<T>`?",
        svar: ["Den samme klasse kan genbruges til alle typer — og compileren tjekker stadig, at typerne passer", "Programmet fylder mindre på disken", "Man slipper for at skrive new", "Listen kan indeholde blandede typer"],
        ret: 0, fordi: "**Genbrug** og **typesikkerhed**. Uden generics måtte man skrive en `IntListe`, en `StringListe`, en `KundeListe` … eller bruge `object` til alt og miste typetjekket." },
      { t: "skriv", q: "Klassen `Bog` er lavet. Opret en `List<Bog>`, der hedder `boeger`, tilføj en bog med titlen `\"Dune\"` med `Add` og en object initializer, og skriv `boeger.Count` ud.",
        efter: R`class Bog
{
    public string Titel { get; set; }
}`,
        tjek: [
          [/(List<Bog>|var )boeger=new( List<Bog>)?\(\);/, "Opret listen: `List<Bog> boeger = new List<Bog>();`"],
          [/boeger\.Add\(new Bog(\(\))?\{Titel="Dune"\}\);/, "Tilføj bogen: `boeger.Add(new Bog { Titel = \"Dune\" });`"],
          ["Console.WriteLine(boeger.Count);", "Skriv antallet ud"]
        ],
        loesning: R`List<Bog> boeger = new List<Bog>();
boeger.Add(new Bog { Titel = "Dune" });
Console.WriteLine(boeger.Count);`,
        output: "1" },
      { t: "ide", h: "Et kunderegister",
        md: "Lav et Console-projekt, `Kunderegister`. Det her mønster — **en liste af objekter, som man tilføjer til, søger i og fjerner fra** — er kernen i næsten alle forretningssystemer. Senere flytter listen bare ned i en database.",
        kode: R`List<Kunde> kunder = new List<Kunde>();
int naesteId = 1;

kunder.Add(new Kunde { Id = naesteId++, Navn = "Anna", By = "Aarhus" });
kunder.Add(new Kunde { Id = naesteId++, Navn = "Bo", By = "Odense" });
kunder.Add(new Kunde { Id = naesteId++, Navn = "Carl", By = "Aarhus" });

Console.WriteLine("Kunder i Aarhus:");
foreach (Kunde k in kunder)
{
    if (k.By == "Aarhus")
    {
        Console.WriteLine($"  {k}");
    }
}

Kunde fundet = kunder.Find(k => k.Id == 2);
if (fundet != null)
{
    kunder.Remove(fundet);
    Console.WriteLine($"Slettet: {fundet.Navn}");
}
Console.WriteLine($"Antal kunder: {kunder.Count}");

class Kunde
{
    public int Id { get; set; }
    public string Navn { get; set; }
    public string By { get; set; }

    public override string ToString()
    {
        return $"#{Id} {Navn}, {By}";
    }
}`,
        output: "Kunder i Aarhus:\n  #1 Anna, Aarhus\n  #3 Carl, Aarhus\nSlettet: Bo\nAntal kunder: 2",
        md2: "De fire ting, man gør ved data, hedder **CRUD**: Create (opret), Read (læs), Update (ret) og Delete (slet). Her har du lavet C, R og D. Tilføj selv U: find kunde 1, og ret byen." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er generics, og hvad betyder T i `List<T>`?",
        svar: "Generics er kode, der er skrevet med en **pladsholder for en type**. `T` er **typeparameteren**: når jeg skriver `List<int>`, bliver T til `int`. Det giver **genbrug** — den samme klasse virker for alle typer — og **typesikkerhed**, fordi compileren tjekker, at jeg kun lægger den rigtige type i listen, og jeg slipper for at caste, når jeg tager noget ud.",
        noegle: ["pladsholder", "typeparameter", "genbrug", "typesikkerhed", "compileren"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m06l3", titel: "Dictionary: slå op med en nøgle", min: 16,
    ord: [
      ["Dictionary<TKey, TValue>", "En samling af par: en nøgle og en værdi. Man slår værdien op med nøglen."],
      ["Nøgle (key)", "Det, man slår op med. Hver nøgle må kun findes én gang."],
      ["Værdi (value)", "Det, der er gemt under nøglen."],
      ["KeyValuePair", "Ét par i en Dictionary. Har egenskaberne Key og Value."],
      ["ContainsKey", "Tjekker, om en nøgle findes."],
      ["TryGetValue", "Prøver at hente værdien for en nøgle. Giver true/false og lægger værdien i en out-variabel."]
    ],
    trin: [
      { t: "laes", h: "En ordbog i stedet for en liste",
        md: "I en liste finder du noget via dets **plads** (indeks 0, 1, 2 …). Tit vil du hellere slå op med noget, der giver mening: et varenummer, et brugernavn, et postnummer.\n\nDet er en `Dictionary` til. Den indeholder **par**: en **nøgle** og en **værdi**. Som en ordbog: du slår ordet op og får forklaringen.",
        kode: R`Dictionary<string, int> lager = new Dictionary<string, int>();
lager["kaffe"] = 12;
lager["te"] = 5;
lager.Add("kakao", 0);

Console.WriteLine(lager["kaffe"]);
Console.WriteLine(lager.Count);`,
        noter: [
          ["Dictionary<string, int>", "To typer: først **nøglens** type, så **værdiens**."],
          ["lager[\"kaffe\"] = 12;", "Gem værdien 12 under nøglen \"kaffe\"."],
          ["lager.Add(\"kakao\", 0);", "En anden måde at tilføje på."],
          ["lager[\"kaffe\"]", "Slå op: giv mig værdien for nøglen \"kaffe\"."]
        ],
        output: "12\n3" },
      { t: "forudsig",
        kode: R`Dictionary<int, string> byer = new Dictionary<int, string>
{
    { 8000, "Aarhus" },
    { 5000, "Odense" },
    { 9000, "Aalborg" }
};

Console.WriteLine(byer[5000]);
byer[5000] = "Odense C";
Console.WriteLine(byer[5000]);
Console.WriteLine(byer.Count);`,
        output: "Odense\nOdense C\n3",
        fordi: "Nøglen er her et heltal (postnummeret), og værdien er en tekst. At tildele til en nøgle, der allerede findes, **overskriver** værdien — antallet er stadig 3." },
      { t: "udfyld", q: "Lav en Dictionary, hvor nøglen er et navn (tekst), og værdien er en alder (heltal).",
        kode: R`Dictionary<[[string]], [[int]]> aldre = new Dictionary<string, int>();
aldre[[["Peter"]]] = 25;
Console.WriteLine(aldre["Peter"]);`,
        output: "25",
        fordi: "Nøgletypen står først, værditypen bagefter. Nøglen skrives i firkantede klammer." },
      { t: "laes", h: "Når nøglen ikke findes",
        md: "Slår du op med en nøgle, der ikke er der, går programmet ned med en `KeyNotFoundException`. Tjek derfor først — på en af to måder:",
        kode: R`Dictionary<string, int> priser = new Dictionary<string, int>
{
    { "kaffe", 45 },
    { "te", 30 }
};

if (priser.ContainsKey("kakao"))
{
    Console.WriteLine(priser["kakao"]);
}
else
{
    Console.WriteLine("Kakao findes ikke");
}

if (priser.TryGetValue("te", out int pris))
{
    Console.WriteLine($"Te koster {pris}");
}`,
        noter: [
          ["ContainsKey(\"kakao\")", "Findes nøglen? true/false."],
          ["TryGetValue(\"te\", out int pris)", "Prøv at hente. Lykkes det, ligger værdien i `pris`. Samme mønster som `int.TryParse`."]
        ],
        output: "Kakao findes ikke\nTe koster 30" },
      { t: "fejl",
        kode: R`Dictionary<string, int> point = new Dictionary<string, int>();
point.Add("Anna", 10);
point.Add("Bo", 7);
point.Add("Anna", 12);
Console.WriteLine(point.Count);`,
        linje: 4, logisk: true, fejler: true,
        q: "Programmet oversættes, men går ned, når det kører. Hvilken linje er skyld i det?",
        fordi: "Nøglen `\"Anna\"` findes allerede, og **en nøgle må kun være der én gang**. `Add` kaster en `ArgumentException`. Vil du overskrive, skal du bruge `point[\"Anna\"] = 12;` i stedet for `Add`.",
        rettet: R`Dictionary<string, int> point = new Dictionary<string, int>();
point.Add("Anna", 10);
point.Add("Bo", 7);
point["Anna"] = 12;
Console.WriteLine(point.Count);`,
        rettetOutput: "2" },
      { t: "laes", h: "Gå alle par igennem",
        md: "En `foreach` over en Dictionary giver dig ét **par** ad gangen. Parret har typen `KeyValuePair` med egenskaberne `Key` og `Value`. Det er lettest at skrive `var`.",
        kode: R`Dictionary<string, int> lager = new Dictionary<string, int>
{
    { "kaffe", 12 },
    { "te", 0 },
    { "kakao", 3 }
};

foreach (var par in lager)
{
    Console.WriteLine($"{par.Key}: {par.Value} stk.");
}

lager.Remove("te");
Console.WriteLine(string.Join(", ", lager.Keys));`,
        output: "kaffe: 12 stk.\nte: 0 stk.\nkakao: 3 stk.\nkaffe, kakao",
        md2: "`lager.Keys` er alle nøglerne og `lager.Values` alle værdierne. `Remove(nøgle)` fjerner et par." },
      { t: "laes", h: "Klassikeren: tæl forekomster",
        md: "En Dictionary er perfekt til at **tælle**. Nøglen er det, du tæller, og værdien er antallet. Mønsteret: findes nøglen, så læg 1 til — ellers start den på 1.",
        kode: R`string[] stemmer = { "pizza", "burger", "pizza", "sushi", "pizza", "burger" };
Dictionary<string, int> antal = new Dictionary<string, int>();

foreach (string s in stemmer)
{
    if (antal.ContainsKey(s))
    {
        antal[s]++;
    }
    else
    {
        antal[s] = 1;
    }
}

foreach (var par in antal)
{
    Console.WriteLine($"{par.Key}: {par.Value}");
}`,
        output: "pizza: 3\nburger: 2\nsushi: 1" },
      { t: "skriv", q: "Opret en `Dictionary<string, string>`, der hedder `hovedstaeder`. Gem `\"København\"` under nøglen `\"Danmark\"`, og skriv værdien for `\"Danmark\"` ud.",
        tjek: [
          [/(Dictionary<string,string>|var )hovedstaeder=new( Dictionary<string,string>)?\(\);/, "Opret den: `Dictionary<string, string> hovedstaeder = new Dictionary<string, string>();`"],
          [/hovedstaeder\["Danmark"\]="København";|hovedstaeder\.Add\("Danmark","København"\);/, "Gem parret: `hovedstaeder[\"Danmark\"] = \"København\";`"],
          ['Console.WriteLine(hovedstaeder["Danmark"]);', "Slå op og skriv ud: `Console.WriteLine(hovedstaeder[\"Danmark\"]);`"]
        ],
        loesning: R`Dictionary<string, string> hovedstaeder = new Dictionary<string, string>();
hovedstaeder["Danmark"] = "København";
Console.WriteLine(hovedstaeder["Danmark"]);`,
        output: "København" },
      { t: "laes", h: "Objekter som værdier",
        md: "Værdien kan være et helt objekt. Så har du et lynhurtigt opslag: \"giv mig kunden med nummer 1002\".",
        kode: R`Dictionary<int, Kunde> kunder = new Dictionary<int, Kunde>();
kunder[1001] = new Kunde { Navn = "Anna" };
kunder[1002] = new Kunde { Navn = "Bo" };

Console.WriteLine(kunder[1002].Navn);

class Kunde
{
    public string Navn { get; set; }
}`,
        output: "Bo",
        md2: "**Hvorfor er det hurtigt?** I en liste skal programmet lede fra en ende af, element for element. En Dictionary regner direkte ud, hvor værdien ligger, ud fra nøglen — ligesom du slår op i en ordbog i stedet for at læse den fra side 1. Med en million kunder er forskellen enorm." },
      { t: "valg", q: "Du skal gemme 50.000 varer og hele tiden finde en vare ud fra dens varenummer. Hvad er det bedste valg?",
        svar: ["Dictionary<int, Vare> med varenummeret som nøgle", "List<Vare>, som gennemsøges med en løkke hver gang", "Vare[] med fast størrelse", "50.000 variabler"],
        ret: 0, fordi: "Opslag på en nøgle er det, en Dictionary er bygget til. En liste skulle i værste fald se alle 50.000 varer igennem ved hvert eneste opslag." },
      { t: "ide", h: "En telefonbog",
        md: "Lav et Console-projekt, `Telefonbog`. Programmet slår numre op, indtil brugeren trykker Enter uden at skrive noget.",
        kode: R`Dictionary<string, string> telefonbog = new Dictionary<string, string>
{
    { "anna", "20 30 40 50" },
    { "bo", "61 62 63 64" },
    { "carl", "42 42 42 42" }
};

while (true)
{
    Console.Write("Navn (Enter = slut): ");
    string navn = Console.ReadLine().Trim().ToLower();

    if (navn == "")
    {
        break;
    }

    if (telefonbog.TryGetValue(navn, out string nummer))
    {
        Console.WriteLine($"{navn}: {nummer}");
    }
    else
    {
        Console.WriteLine("Findes ikke i telefonbogen");
    }
}`,
        md2: "Udvid selv: findes navnet ikke, så spørg efter nummeret, og gem det i telefonbogen." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er en `Dictionary`, og hvornår er den bedre end en `List`?",
        svar: "En Dictionary gemmer **par af nøgle og værdi**. Man slår værdien op med **nøglen** i stedet for et indeks, og hver nøgle må kun findes **én gang**. Den er bedre end en liste, når man skal **finde noget hurtigt ud fra en nøgle** — fx en kunde ud fra kundenummer — fordi opslaget ikke kræver, at man leder alle elementerne igennem.",
        noegle: ["nøgle", "værdi", "én gang", "hurtigt", "opslag"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m06l4", titel: "Stack, Queue, HashSet og LinkedList", min: 16,
    ord: [
      ["Stack<T>", "En stak: det sidste, der blev lagt på, er det første, der tages af (LIFO)."],
      ["Queue<T>", "En kø: det første, der kom ind, er det første, der kommer ud (FIFO)."],
      ["LIFO", "Last In, First Out — sidst ind, først ud."],
      ["FIFO", "First In, First Out — først ind, først ud."],
      ["Push / Pop", "Stack: Push lægger øverst, Pop tager det øverste af. Peek kigger uden at fjerne."],
      ["Enqueue / Dequeue", "Queue: Enqueue stiller bagest i køen, Dequeue tager den forreste."],
      ["HashSet<T>", "En mængde uden dubletter og uden rækkefølge. Hurtig til at tjekke, om noget findes."],
      ["LinkedList<T>", "En kædet liste: hvert element peger på det næste og det forrige. Hurtig til at indsætte og fjerne midt i."]
    ],
    trin: [
      { t: "laes", h: "Stack: en stak tallerkener",
        md: "En **stack** er en stak. Du lægger øverst, og du tager fra toppen. Det sidste, du lagde på, er det første, du får igen: **LIFO** — *Last In, First Out*.",
        kode: R`Stack<string> stak = new Stack<string>();
stak.Push("A");
stak.Push("B");
stak.Push("C");

Console.WriteLine(stak.Pop());
Console.WriteLine(stak.Peek());
Console.WriteLine(stak.Count);`,
        noter: [
          [".Push(…)", "Læg øverst på stakken."],
          [".Pop()", "Tag det øverste af, og få det tilbage."],
          [".Peek()", "Kig på det øverste uden at fjerne det."]
        ],
        output: "C\nB\n2",
        md2: "Hvor bruges det? **Fortryd** (Ctrl+Z) i et tekstprogram, **Tilbage**-knappen i en browser — og computeren bruger selv en stak til at huske, hvilke metoder der har kaldt hinanden (*call stack*)." },
      { t: "forudsig",
        kode: R`Stack<int> s = new Stack<int>();
s.Push(1);
s.Push(2);
s.Push(3);
s.Pop();
s.Push(4);

Console.WriteLine(s.Pop());
Console.WriteLine(s.Pop());`,
        output: "4\n2",
        fordi: "Efter 1, 2, 3 tages 3 af. Så lægges 4 på: stakken er 1, 2, 4. Første Pop giver 4, næste giver 2." },
      { t: "laes", h: "Queue: en kø ved kassen",
        md: "En **queue** er en kø. Man stiller sig bagest og bliver betjent forfra. Den første, der kom, er den første, der kommer til: **FIFO** — *First In, First Out*.",
        kode: R`Queue<string> koe = new Queue<string>();
koe.Enqueue("Anna");
koe.Enqueue("Bo");
koe.Enqueue("Carl");

Console.WriteLine(koe.Dequeue());
Console.WriteLine(koe.Peek());
Console.WriteLine(koe.Count);`,
        noter: [
          [".Enqueue(…)", "Stil bagest i køen."],
          [".Dequeue()", "Tag den forreste ud."],
          [".Peek()", "Kig på den forreste uden at fjerne den."]
        ],
        output: "Anna\nBo\n2",
        md2: "Hvor bruges det? Printerkøen, kundeservice-henvendelser, opgaver, der skal behandles i den rækkefølge, de kom ind." },
      { t: "valg", q: "En browser skal huske de sider, du har besøgt, så Tilbage-knappen går til den **seneste** først. Hvilken datastruktur passer?",
        svar: ["Stack — sidst ind, først ud", "Queue — først ind, først ud", "Dictionary", "HashSet"],
        ret: 0, fordi: "Den side, du sidst forlod, er den første, du vil tilbage til. Det er LIFO: en stack." },
      { t: "forudsig",
        kode: R`Queue<int> q = new Queue<int>();
q.Enqueue(10);
q.Enqueue(20);
q.Enqueue(30);
q.Dequeue();
q.Enqueue(40);

Console.WriteLine(q.Dequeue());
Console.WriteLine(q.Count);`,
        output: "20\n2",
        fordi: "10 forlader køen først. Derefter står 20, 30 og 40 i kø. Næste Dequeue giver 20, og der er 2 tilbage." },
      { t: "laes", h: "HashSet: ingen dubletter",
        md: "Et **HashSet** er en **mængde**: hver værdi kan kun være der **én gang**, og der er ingen bestemt rækkefølge. `Add` svarer `true`, hvis værdien blev tilføjet, og `false`, hvis den var der i forvejen.",
        kode: R`HashSet<string> besoegende = new HashSet<string>();
Console.WriteLine(besoegende.Add("anna@mail.dk"));
Console.WriteLine(besoegende.Add("bo@mail.dk"));
Console.WriteLine(besoegende.Add("anna@mail.dk"));

Console.WriteLine(besoegende.Count);
Console.WriteLine(besoegende.Contains("bo@mail.dk"));`,
        output: "True\nTrue\nFalse\n2\nTrue",
        md2: "Brug det, når du vil have **unikke værdier** — fx tælle, hvor mange *forskellige* personer der har besøgt en side. `Contains` er lynhurtig, af samme grund som opslag i en Dictionary." },
      { t: "forudsig",
        kode: R`int[] tal = { 3, 5, 3, 3, 8, 5 };
HashSet<int> unikke = new HashSet<int>();

foreach (int t in tal)
{
    unikke.Add(t);
}
Console.WriteLine(unikke.Count);`,
        output: "3",
        fordi: "Dubletterne bliver ikke tilføjet. Tilbage er de tre forskellige værdier 3, 5 og 8." },
      { t: "laes", h: "LinkedList: en kæde",
        md: "I en `List` ligger elementerne tæt side om side. Sætter du noget ind forrest, skal **alle** de andre rykke en plads.\n\nI en **LinkedList** er hvert element et led i en kæde, der ved, hvem der står **før** og **efter**. At sætte ind eller fjerne midt i er bare at flytte et par pile. Til gengæld kan du ikke hoppe direkte til element nr. 500 — du må følge kæden.",
        kode: R`LinkedList<string> kaede = new LinkedList<string>();
kaede.AddLast("B");
kaede.AddLast("C");
kaede.AddFirst("A");

Console.WriteLine(string.Join(" -> ", kaede));
Console.WriteLine(kaede.First.Value);
Console.WriteLine(kaede.First.Next.Value);`,
        output: "A -> B -> C\nA\nB",
        md2: "Du bruger den sjældent i praksis, men den er et klassisk eksamensemne under datastrukturer." },
      { t: "laes", h: "Abstrakt datatype og datastruktur",
        md: "To ord fra kursets læringsmål, som lyder ens, men ikke er det samme:\n\n- En **abstrakt datatype** (ADT) beskriver, **hvad** man kan gøre — reglerne. *En stak: man kan lægge på og tage af fra toppen.*\n- En **datastruktur** er **hvordan** det rent faktisk er bygget i hukommelsen. *Et array, en kæde af led, en hashtabel.*\n\nDen samme ADT kan bygges på flere måder. En stak kan fx bygges oven på et array eller oven på en kædet liste — den, der bruger den, mærker ingen forskel.",
        noter: [
          ["Stak, kø, liste, ordbog, mængde", "Abstrakte datatyper: beskriver opførslen."],
          ["Array, kædet liste, hashtabel, træ", "Datastrukturer: den konkrete opbygning."]
        ] },
      { t: "laes", h: "Hvilken skal jeg vælge?",
        md: "Til eksamen er det vigtigere at kunne **begrunde et valg** end at huske alle metoderne.",
        noter: [
          ["Array", "Fast antal, som aldrig ændres."],
          ["List<T>", "Standardvalget. Rækkefølge, indeks, kan vokse."],
          ["Dictionary<K,V>", "Hurtigt opslag på en nøgle."],
          ["HashSet<T>", "Unikke værdier — \"har jeg set den før?\"."],
          ["Stack<T>", "Sidst ind, først ud: fortryd, tilbage."],
          ["Queue<T>", "Først ind, først ud: ventende opgaver."],
          ["LinkedList<T>", "Mange indsættelser og sletninger midt i."]
        ] },
      { t: "valg", q: "Et supportsystem skal behandle henvendelser i den rækkefølge, de kommer ind. Hvilken collection?",
        svar: ["Queue<Henvendelse>", "Stack<Henvendelse>", "HashSet<Henvendelse>", "Dictionary<string, Henvendelse>"],
        ret: 0, fordi: "Først ind, først ud — den, der har ventet længst, skal have hjælp først. Det er en kø." },
      { t: "skriv", q: "Opret en `Stack<string>`, der hedder `historik`. Læg `\"side1\"` og derefter `\"side2\"` på med `Push`. Tag den øverste af med `Pop`, og skriv den ud.",
        tjek: [
          [/(Stack<string>|var )historik=new( Stack<string>)?\(\);/, "Opret stakken: `Stack<string> historik = new Stack<string>();`"],
          [/historik\.Push\("side1"\);historik\.Push\("side2"\);/, "Læg på i rækkefølge: først `\"side1\"`, så `\"side2\"`"],
          [/Console\.WriteLine\(historik\.Pop\(\)\);|=historik\.Pop\(\);Console\.WriteLine\(\w+\);/, "Tag den øverste af, og skriv den ud: `Console.WriteLine(historik.Pop());`"]
        ],
        loesning: R`Stack<string> historik = new Stack<string>();
historik.Push("side1");
historik.Push("side2");
Console.WriteLine(historik.Pop());`,
        output: "side2" },
      { t: "ide", h: "Fortryd med en stack",
        md: "Lav et Console-projekt, `Fortryd`. Programmet husker alt, hvad du skriver, og kan fortryde det seneste — præcis som Ctrl+Z.",
        kode: R`Stack<string> handlinger = new Stack<string>();

while (true)
{
    Console.Write("Skriv noget (fortryd / slut): ");
    string svar = Console.ReadLine();

    if (svar == "slut")
    {
        break;
    }
    else if (svar == "fortryd")
    {
        if (handlinger.Count > 0)
        {
            Console.WriteLine($"Fortrød: {handlinger.Pop()}");
        }
        else
        {
            Console.WriteLine("Der er ikke noget at fortryde");
        }
    }
    else
    {
        handlinger.Push(svar);
    }
}

Console.WriteLine($"Tilbage: {string.Join(", ", handlinger)}");`,
        md2: "Læg mærke til tjekket `Count > 0`. `Pop()` på en tom stak får programmet til at gå ned med en `InvalidOperationException`." },
      { t: "forklar", q: "Eksamensspørgsmål: Forklar forskellen på en stack og en queue, og giv et eksempel på, hvor hver bruges.",
        svar: "En **stack** er **LIFO** — sidst ind, først ud. Man lægger på med `Push` og tager af med `Pop`, begge fra toppen. Eksempel: fortryd-funktion eller browserens tilbage-knap. En **queue** er **FIFO** — først ind, først ud. Man stiller bagest med `Enqueue` og tager forfra med `Dequeue`. Eksempel: en printerkø eller henvendelser, der behandles i rækkefølge.",
        noegle: ["LIFO", "FIFO", "Push", "Pop", "Enqueue", "Dequeue"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m06l5", titel: "Hvor hurtigt? Store O i almindeligt sprog", min: 12,
    ord: [
      ["Tidskompleksitet", "Hvordan den tid, en algoritme bruger, vokser, når mængden af data vokser."],
      ["Store O-notation (Big O)", "Måden man skriver tidskompleksitet på: O(1), O(n), O(n²) …"],
      ["O(1)", "Konstant tid: lige hurtigt, uanset hvor meget data der er."],
      ["O(n)", "Lineær tid: dobbelt så meget data tager dobbelt så lang tid."],
      ["O(n²)", "Kvadratisk tid: dobbelt så meget data tager fire gange så lang tid. Typisk en løkke i en løkke."],
      ["O(log n)", "Logaritmisk tid: data kan fordobles, og det koster kun ét ekstra skridt. Fx binær søgning."]
    ],
    trin: [
      { t: "laes", h: "Det handler om, hvordan det vokser",
        md: "Med 10 kunder er alt hurtigt. Spørgsmålet er, hvad der sker med **en million**. Programmører beskriver det med **store O-notation** (*Big O*): hvor meget mere arbejde giver mere data?\n\nBogstavet **n** står for antallet af elementer.",
        noter: [
          ["O(1) — konstant", "Altid lige hurtigt. *Slå op på et indeks i et array. Slå en nøgle op i en Dictionary.*"],
          ["O(log n) — logaritmisk", "Halverer problemet i hvert skridt. *Slå op i en telefonbog ved at åbne på midten.*"],
          ["O(n) — lineær", "Skal se på hvert element én gang. *Lede en usorteret liste igennem.*"],
          ["O(n²) — kvadratisk", "For hvert element ses på alle de andre. *En løkke inden i en løkke.*"]
        ],
        md2: "Du skal ikke kunne regne på det. Du skal kunne **genkende de fire** og sige, hvilken der er bedst." },
      { t: "valg", q: "Du leder efter et navn i en **usorteret** liste med n navne ved at se på ét ad gangen. Hvad er tidskompleksiteten?",
        svar: ["O(n) — i værste fald skal alle n navne ses igennem", "O(1)", "O(n²)", "O(log n)"],
        ret: 0, fordi: "Det er **lineær søgning**. Står navnet sidst — eller slet ikke i listen — skal du se på alle n elementer." },
      { t: "laes", h: "Tæl skridtene selv",
        md: "Her tælles, hvor mange sammenligninger en lineær søgning bruger på at finde det **sidste** element i en liste med 1000 tal:",
        kode: R`List<int> tal = new List<int>();
for (int i = 1; i <= 1000; i++)
{
    tal.Add(i);
}

int skridt = 0;
foreach (int t in tal)
{
    skridt++;
    if (t == 1000)
    {
        break;
    }
}
Console.WriteLine(skridt);`,
        output: "1000",
        md2: "1000 elementer → 1000 skridt. En million elementer → en million skridt. Det er O(n)." },
      { t: "forudsig", q: "En løkke inden i en løkke — begge over de samme 20 elementer. Hvor mange gange kører den inderste linje?",
        kode: R`int n = 20;
int skridt = 0;

for (int i = 0; i < n; i++)
{
    for (int j = 0; j < n; j++)
    {
        skridt++;
    }
}
Console.WriteLine(skridt);`,
        output: "400",
        fordi: "20 · 20 = 400. Det er O(n²). Fordobler du n til 40, bliver det 1600 — **fire** gange så meget. Derfor skal man være opmærksom, når man lægger løkker inden i hinanden over store datamængder." },
      { t: "laes", h: "Binær søgning: halvér problemet",
        md: "Er listen **sorteret**, kan du gøre som i en telefonbog: slå op **på midten**. Er det, du leder efter, mindre, så smid den øverste halvdel væk — og omvendt. Hvert skridt halverer det, der er tilbage.\n\nDet hedder **binær søgning** og er O(log n). Den er indbygget i `List`:",
        kode: R`List<int> tal = new List<int> { 3, 8, 15, 23, 42, 57, 61 };
Console.WriteLine(tal.BinarySearch(42));
Console.WriteLine(tal.BinarySearch(4) < 0);`,
        output: "4\nTrue",
        md2: "`BinarySearch` giver **indekset**, hvis værdien findes, og et negativt tal, hvis den ikke gør. Med en million elementer kræver det højst ca. **20** skridt — mod en million med lineær søgning. Men det virker kun på en **sorteret** liste. Du skriver selv algoritmen i modul 11." },
      { t: "laes", h: "Collections og deres hastighed",
        md: "Nu kan du forklare **hvorfor** man vælger den ene collection frem for den anden:",
        noter: [
          ["List: hent på indeks", "O(1) — den ved præcis, hvor plads 500 ligger."],
          ["List: Contains / Find", "O(n) — må lede fra en ende af."],
          ["List: Add til sidst", "O(1) for det meste."],
          ["List: Insert forrest", "O(n) — alle de andre skal rykke."],
          ["Dictionary: opslag på nøgle", "O(1) — regner positionen ud fra nøglen."],
          ["HashSet: Contains", "O(1)."],
          ["Stack / Queue: Push, Pop, Enqueue, Dequeue", "O(1)."],
          ["LinkedList: indsæt, når man står ved stedet", "O(1) — men at finde stedet er O(n)."]
        ] },
      { t: "valg", q: "Hvilken operation er **hurtigst** med en million elementer?",
        svar: ["At slå en nøgle op i en Dictionary — O(1)", "At bruge Contains på en List — O(n)", "At indsætte forrest i en List — O(n)", "To løkker inden i hinanden over alle elementer — O(n²)"],
        ret: 0, fordi: "O(1) afhænger slet ikke af, hvor meget data der er. De andre bliver langsommere, jo flere elementer der er." },
      { t: "ide", h: "Mål forskellen",
        md: "Lav et Console-projekt, `Hastighed`. Programmet måler, hvor lang tid det tager at lede efter 20.000 tal i en liste og i et HashSet. `Stopwatch` er et stopur — du lærer mere om det i modul 8. Tallene varierer fra computer til computer, men forskellen er til at få øje på.",
        kode: R`using System.Diagnostics;

int n = 20000;
List<int> liste = new List<int>();
HashSet<int> saet = new HashSet<int>();
for (int i = 0; i < n; i++)
{
    liste.Add(i);
    saet.Add(i);
}

Stopwatch ur = Stopwatch.StartNew();
int fundet = 0;
for (int i = 0; i < n; i++)
{
    if (liste.Contains(i)) fundet++;
}
Console.WriteLine($"List:    {ur.ElapsedMilliseconds} ms ({fundet} fundet)");

ur.Restart();
fundet = 0;
for (int i = 0; i < n; i++)
{
    if (saet.Contains(i)) fundet++;
}
Console.WriteLine($"HashSet: {ur.ElapsedMilliseconds} ms ({fundet} fundet)");`,
        md2: "Linjen `using System.Diagnostics;` skal stå allerøverst i filen. Prøv at sætte `n` til 100.000, og se, hvordan listen bliver markant langsommere, mens HashSet næsten ikke mærker det." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvorfor er et opslag i en `Dictionary` hurtigere end at lede i en `List`? Brug store O-notation.",
        svar: "I en `List` skal man i værste fald **se alle elementerne igennem** for at finde det rigtige — det er **O(n)**, lineær tid, og bliver langsommere, jo flere elementer der er. En `Dictionary` **regner positionen ud direkte fra nøglen** (med en hashfunktion), så opslaget er **O(1)**, konstant tid — lige hurtigt med 10 og med en million elementer.",
        noegle: ["O(n)", "O(1)", "nøgle", "alle elementerne", "konstant"] }
    ] }
  ]
});
})();
