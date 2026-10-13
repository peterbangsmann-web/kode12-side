// Modul 25 — Machine learning med ML.NET. Forudsætter: modul 0–24 (især 3 arrays, 6 lister, 16 MVC, 19 dependency injection).
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m25", nr: 25, del: "Del 7 · Ekstra emner", ikon: "🤖",
  titel: "Machine learning med ML.NET",
  dag: "Uge 6 · Introduction to ML with .NET",
  intro: "Normalt skriver du selv reglerne i et program. Ved **machine learning** giver du i stedet computeren en masse **eksempler**, og så finder den selv en regel, den kan bruge på nye tilfælde: \"hvad koster en lejlighed på 80 m²?\" eller \"er denne anmeldelse positiv?\".\n\nModulet er på **overbliksniveau**. Du lærer ordene, så du kan forklare dem, du bygger to små modeller med Microsofts bibliotek **ML.NET**, og du ser, hvordan en færdig model bruges på en side i en MVC-app. Al koden i modulet er bygget og kørt med .NET 10 og ML.NET 5.0.0.",
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m25l1", titel: "Hvad er machine learning?", min: 15,
    ord: [
      ["Machine learning (ML)", "At lade computeren finde en regel ud fra eksempler i stedet for at en programmør skriver reglen."],
      ["Træningsdata", "De eksempler, computeren lærer af. Hvert eksempel har både spørgsmålet og det rigtige svar."],
      ["Feature", "En oplysning, modellen bruger til at gætte ud fra, fx antal kvadratmeter. Kaldes også en input-kolonne."],
      ["Label", "Det rigtige svar i træningsdata — det, modellen skal lære at gætte, fx prisen."],
      ["Model", "Resultatet af træningen: en regel (en formel), der kan lave et gæt ud fra nye features."],
      ["Forudsigelse (prediction)", "Modellens gæt for et nyt eksempel, som den ikke har set før."],
      ["Regression", "ML-opgave, hvor svaret er et tal, fx en pris."],
      ["Klassifikation", "ML-opgave, hvor svaret er en kategori, fx positiv/negativ eller spam/ikke spam."]
    ],
    trin: [
      { t: "laes", h: "Regler eller eksempler",
        md: "Indtil nu har du skrevet **reglerne** selv: \"er beløbet over 300, så giv 10 % rabat\". Det virker, når du kender reglen.\n\nMen nogle regler kan ingen skrive ned. Hvad er en lejlighed værd? Det afhænger af størrelse, værelser, beliggenhed … og ingen kender den præcise formel. Til gengæld har man **tusindvis af eksempler** på lejligheder, der allerede er solgt.\n\n**Machine learning** vender det om: du giver computeren eksemplerne, og den finder selv en regel, der passer så godt som muligt. Den regel hedder en **model**. Bagefter kan modellen gætte prisen på en lejlighed, den aldrig har set.",
        noter: [
          ["Almindelig programmering", "Du skriver reglen → computeren bruger den på data → svar."],
          ["Machine learning", "Du giver data med svar → computeren finder reglen (modellen) → modellen giver svar på nye data."],
          ["Hvornår ML?", "Når reglen er for indviklet at skrive selv, men der findes mange eksempler med det rigtige svar."]
        ] },
      { t: "valg", q: "Hvilken opgave passer **bedst** til machine learning?",
        svar: ["At sortere e-mails i spam og ikke spam ud fra tusindvis af e-mails, som brugere allerede har markeret", "At lægge 25 % moms til en pris", "At finde den største værdi i et array", "At tjekke, om et postnummer har fire cifre"],
        ret: 0, fordi: "Ingen kan skrive en fuldstændig regel for, hvad spam er — men der findes masser af eksempler med det rigtige svar. Moms, største værdi og fire cifre er faste regler, som du skriver på én linje. Der giver ML ingen mening." },
      { t: "laes", h: "Features og label",
        md: "Træningsdata er en tabel. Hver række er ét eksempel. Kolonnerne er af to slags:\n\n- **Features**: de oplysninger, modellen må gætte ud fra.\n- **Label**: det rigtige svar, som modellen skal lære at ramme.\n\nI C# beskriver man ét eksempel med en klasse — præcis som en model-klasse i MVC.",
        kode: R`Lejlighed[] data =
{
    new Lejlighed { Kvm = 50, Vaerelser = 2, Pris = 1750 },
    new Lejlighed { Kvm = 70, Vaerelser = 3, Pris = 2400 },
    new Lejlighed { Kvm = 90, Vaerelser = 4, Pris = 3050 }
};

foreach (Lejlighed l in data)
{
    Console.WriteLine($"{l.Kvm} m², {l.Vaerelser} vær. -> {l.Pris} tusind kr.");
}

class Lejlighed
{
    public float Kvm { get; set; }
    public float Vaerelser { get; set; }
    public float Pris { get; set; }
}`,
        noter: [
          ["Kvm, Vaerelser", "**Features**: det, vi ved om lejligheden."],
          ["Pris", "**Label**: det rigtige svar. Prisen er i tusind kr., så 1750 betyder 1.750.000 kr."],
          ["float", "Et kommatal ligesom `double`, men med færre cifre. ML.NET bruger `float` til tal, så vi gør det samme her."]
        ],
        output: "50 m², 2 vær. -> 1750 tusind kr.\n70 m², 3 vær. -> 2400 tusind kr.\n90 m², 4 vær. -> 3050 tusind kr." },
      { t: "valg", q: "En model skal gætte, hvad en brugt bil kan sælges for. Træningsdata har kolonnerne `Alder`, `Km`, `Maerke` og `Pris`. Hvad er **label**?",
        svar: ["`Pris` — det er svaret, modellen skal lære at gætte", "`Alder` — den er vigtigst", "`Maerke` — det er tekst", "Alle fire kolonner"],
        ret: 0, fordi: "Label er det, du vil have modellen til at forudsige. Her er det prisen. `Alder`, `Km` og `Maerke` er features: de oplysninger, gættet bygger på." },
      { t: "laes", h: "To slags opgaver: regression og klassifikation",
        md: "Langt de fleste ML-opgaver, du møder, er en af to slags. Det afgør, hvilken slags træner du vælger i ML.NET.",
        noter: [
          ["Regression", "Svaret er et **tal**. Pris på en lejlighed, antal solgte is i morgen, ventetid i minutter."],
          ["Binær klassifikation", "Svaret er **et af to**. Spam/ikke spam, positiv/negativ anmeldelse, betaler/betaler ikke."],
          ["Klassifikation med flere klasser", "Svaret er **en af flere kategorier**. Hvilken afdeling skal en kundehenvendelse sendes til?"],
          ["Fælles", "Begge kræver træningsdata, hvor det rigtige svar (label) er kendt. Det kaldes **supervised learning** (overvåget læring)."]
        ] },
      { t: "valg", q: "En webshop vil vide, om en kunde **vil opsige sit abonnement** inden for en måned (ja/nej). Hvilken slags ML-opgave er det?",
        svar: ["Binær klassifikation — svaret er et af to", "Regression — svaret er et tal", "Klassifikation med flere klasser", "Det er slet ikke en ML-opgave"],
        ret: 0, fordi: "Svaret er ja eller nej. Skulle modellen i stedet gætte, **hvor mange dage** der går, før kunden opsiger, ville det være regression." },
      { t: "laes", h: "Den enkleste model: pris pr. kvadratmeter",
        md: "En model er bare en **formel, der er fundet ud fra data**. Den enkleste formel for en lejlighed er: *pris = kvadratmeter × pris pr. kvadratmeter*.\n\nPris pr. kvadratmeter kender vi ikke. Den **lærer** vi af træningsdata: samlet pris delt med samlet antal kvadratmeter. Det er \"træningen\". Bagefter bruges formlen på en ny lejlighed. Det er \"forudsigelsen\".",
        kode: R`int[] kvm = { 50, 70, 90 };
int[] pris = { 1750, 2400, 3050 };

int sumKvm = 0;
int sumPris = 0;
for (int i = 0; i < kvm.Length; i++)
{
    sumKvm += kvm[i];
    sumPris += pris[i];
}
double prisPrKvm = (double)sumPris / sumKvm;

Console.WriteLine($"Model: pris = kvm * {prisPrKvm:F1}");
Console.WriteLine($"80 m²: ca. {80 * prisPrKvm:F0} tusind kr.");`,
        noter: [
          ["sumKvm, sumPris", "Træningen: løkken går alle eksemplerne igennem."],
          ["(double)sumPris / sumKvm", "Castet til `double`, så det ikke bliver heltalsdivision (modul 1)."],
          ["80 * prisPrKvm", "Forudsigelsen: modellen bruges på en lejlighed, der ikke var i træningsdata."]
        ],
        output: "Model: pris = kvm * 34,3\n80 m²: ca. 2743 tusind kr.",
        md2: "ML.NET gør det samme, bare med smartere matematik, flere features på én gang og millioner af rækker. Men idéen er den samme: **lær tal fra eksempler, brug tallene på noget nyt**." },
      { t: "spor", h: "Spor: træningen",
        q: "Følg løkken, der \"træner\" pris-pr.-kvadratmeter-modellen. Skriv `sumKvm` og `sumPris` efter hver linje. (`i` er 0, 1 og 2 i de tre omgange.)",
        kode: R`int[] kvm = { 50, 70, 90 };
int[] pris = { 1750, 2400, 3050 };
int sumKvm = 0;
int sumPris = 0;
for (int i = 0; i < kvm.Length; i++)
{
    sumKvm += kvm[i];
    sumPris += pris[i];
}`,
        kolonner: ["sumKvm", "sumPris"],
        raekker: [[3, "=0", "=–"], [4, "=0", "=0"], [7, "50", "0"], [8, "50", "1750"], [7, "120", "1750"], [8, "120", "4150"], [7, "210", "4150"], [8, "210", "7200"]],
        fordi: "Hver omgang lægger én lejligheds tal til. Til sidst er der 210 m² og 7200 tusind kr. i alt. 7200 / 210 ≈ 34,3 tusind kr. pr. m² — det tal er hele modellen." },
      { t: "forudsig", q: "Modellen er trænet: pris pr. kvadratmeter er 34,3. Hvad skriver programmet?",
        kode: R`double prisPrKvm = 34.3;
int[] nye = { 40, 100 };

foreach (int k in nye)
{
    double gaet = k * prisPrKvm;
    Console.WriteLine($"{k} m²: {gaet:F0}");
}`,
        output: "40 m²: 1372\n100 m²: 3430",
        fordi: "40 · 34,3 = 1372 og 100 · 34,3 = 3430. `F0` runder til et helt tal. Bemærk: i C#-koden skrives kommatal med **punktum** (`34.3`), men da-DK skriver dem ud med komma." },
      { t: "laes", h: "Hvor godt rammer modellen?",
        md: "En model gætter aldrig helt rigtigt. Spørgsmålet er, **hvor meget** den rammer ved siden af. Man måler det ved at lade modellen gætte på eksempler, hvor man kender svaret, og se på forskellen.\n\nFejlen for ét eksempel er afstanden mellem gæt og rigtigt svar. `Math.Abs` giver tallet uden fortegn (−35 bliver 35), så for højt og for lavt tæller lige meget. Gennemsnittet af fejlene hedder **MAE** (*mean absolute error*, gennemsnitlig absolut fejl).",
        kode: R`int[] kvm = { 50, 70, 90 };
int[] pris = { 1750, 2400, 3050 };
double prisPrKvm = 34.3;

double samletFejl = 0;
for (int i = 0; i < kvm.Length; i++)
{
    double gaet = kvm[i] * prisPrKvm;
    double fejl = Math.Abs(gaet - pris[i]);
    Console.WriteLine($"{kvm[i]} m²: gæt {gaet:F0}, rigtig {pris[i]}, fejl {fejl:F0}");
    samletFejl += fejl;
}
Console.WriteLine($"Gennemsnitlig fejl: {samletFejl / kvm.Length:F0}");`,
        output: "50 m²: gæt 1715, rigtig 1750, fejl 35\n70 m²: gæt 2401, rigtig 2400, fejl 1\n90 m²: gæt 3087, rigtig 3050, fejl 37\nGennemsnitlig fejl: 24",
        md2: "Modellen rammer i gennemsnit 24 tusind kr. ved siden af. Om det er godt nok, afhænger af opgaven. ML.NET regner MAE og andre mål ud for dig med én linje — det ser du i næste lektion." },
      { t: "udfyld", q: "Regn fejlen for ét gæt ud, så for højt og for lavt tæller lige meget.",
        kode: R`double gaet = 1715;
double rigtig = 1750;
double fejl = Math.[[Abs]](gaet [[-]] rigtig);
Console.WriteLine(fejl);`,
        output: "35",
        fordi: "`Math.Abs` fjerner fortegnet: 1715 − 1750 = −35, og `Math.Abs(-35)` er 35." },
      { t: "fejl", logisk: true,
        q: "Programmet skal skrive den gennemsnitlige fejl for tre gæt (rigtigt svar: 24). Det skriver 1, selv om gættene rammer 35, 1 og 37 ved siden af. Hvilken linje er forkert?",
        kode: R`int[] kvm = { 50, 70, 90 };
int[] pris = { 1750, 2400, 3050 };
double prisPrKvm = 34.3;
double samletFejl = 0;
for (int i = 0; i < kvm.Length; i++)
{
    double gaet = kvm[i] * prisPrKvm;
    double fejl = gaet - pris[i];
    samletFejl += fejl;
}
Console.WriteLine($"Gennemsnitlig fejl: {samletFejl / kvm.Length:F0}");`,
        linje: 8,
        output: "Gennemsnitlig fejl: 1",
        fordi: "Uden `Math.Abs` bliver fejlene −35, 1 og 37. Et for lavt gæt og et for højt gæt **ophæver hinanden**, så summen kun bliver 3. Sæt et breakpoint i linje 9 og se `fejl` i Locals / Threads & Variables: den første er negativ.",
        rettet: R`int[] kvm = { 50, 70, 90 };
int[] pris = { 1750, 2400, 3050 };
double prisPrKvm = 34.3;
double samletFejl = 0;
for (int i = 0; i < kvm.Length; i++)
{
    double gaet = kvm[i] * prisPrKvm;
    double fejl = Math.Abs(gaet - pris[i]);
    samletFejl += fejl;
}
Console.WriteLine($"Gennemsnitlig fejl: {samletFejl / kvm.Length:F0}");`,
        rettetOutput: "Gennemsnitlig fejl: 24" },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er machine learning? Forklar ordene træningsdata, feature, label, model og forudsigelse med et eksempel.",
        svar: "Ved machine learning skriver man ikke selv reglen. Man giver computeren **træningsdata**: eksempler, hvor det rigtige svar er kendt. I et eksempel med lejligheder er kvadratmeter og antal værelser **features** — det, man gætter ud fra — og prisen er **label** — det, der skal gættes. Træningen finder en **model**, en formel der passer så godt som muligt til eksemplerne. Modellen bruges bagefter til en **forudsigelse**: et gæt på prisen for en lejlighed, den ikke har set før. Man måler, hvor god den er, fx med den gennemsnitlige fejl.",
        noegle: ["eksempler", "træningsdata", "feature", "label", "model", "forudsigelse"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m25l2", titel: "ML.NET: fra data til forudsigelse", min: 22,
    ord: [
      ["ML.NET", "Microsofts gratis bibliotek til machine learning i C#. Hentes som NuGet-pakken `Microsoft.ML`."],
      ["MLContext", "Indgangen til alt i ML.NET. Man laver ét objekt og bruger det til at hente data, træne og forudsige."],
      ["IDataView", "ML.NETs måde at holde en tabel med data på. Laves fx ud fra en `List<T>`."],
      ["Pipeline", "En kæde af skridt: først gøres data klar, til sidst trænes modellen. Bygges med `.Append(...)`."],
      ["Trainer (træner)", "Den algoritme, der finder modellen ud fra data. Der er forskellige trænere til regression og klassifikation."],
      ["Fit", "Kører pipelinen på træningsdata. Resultatet er den trænede model."],
      ["PredictionEngine", "Et objekt, der bruger en trænet model på ét nyt eksempel ad gangen med `Predict`."],
      ["R² (R-squared)", "Et mål for en regressionsmodel mellem (cirka) 0 og 1. Jo tættere på 1, jo bedre forklarer modellen tallene."],
      ["Testdata", "Eksempler, der holdes uden for træningen, så man kan måle modellen på noget, den ikke har set."]
    ],
    trin: [
      { t: "laes", h: "De fem skridt i ML.NET",
        md: "**ML.NET** er Microsofts bibliotek til machine learning i C#. Det er en NuGet-pakke, så det kan bruges i et konsolprogram, i en MVC-app eller i et Web API.\n\nEt ML.NET-program følger altid de samme fem skridt. Når du kan dem, kan du læse ethvert eksempel fra Microsofts dokumentation.",
        noter: [
          ["1. MLContext", "Lav ét `MLContext`-objekt. Alt andet hentes gennem det."],
          ["2. Hent data", "Træningsdata lægges i et `IDataView` — fx fra en liste med `LoadFromEnumerable`."],
          ["3. Byg en pipeline", "Gør data klar (saml features, skaler tallene) og vælg en **træner**."],
          ["4. Træn", "`pipeline.Fit(data)` finder modellen."],
          ["5. Brug og mål", "Lav en `PredictionEngine` og kald `Predict` på nye eksempler. Mål kvaliteten med `Evaluate`."]
        ] },
      { t: "ide", h: "Opret projektet LejlighedsPris",
        md: "Lav et nyt **Console**-projekt, der hedder `LejlighedsPris`, og hent ML.NET ind som NuGet-pakke. Versionen skrives med, så du får præcis den, koden i modulet er afprøvet med.",
        win: ["Opret et nyt Console App-projekt, `LejlighedsPris`, med .NET 10 som i modul 0.", "Åbn **Tools → NuGet Package Manager → Package Manager Console**.", "Skriv `Install-Package Microsoft.ML -Version 5.0.0` og tryk Enter.", "Tjek i **Solution Explorer** under **Dependencies → Packages**, at `Microsoft.ML` er der."],
        mac: ["Opret et nyt Console-projekt, `LejlighedsPris`, med .NET 10 som i modul 0.", "Åbn Riders **Terminal** (fanen nederst i vinduet). Den står i projektets mappe.", "Skriv `dotnet add package Microsoft.ML --version 5.0.0` og tryk Enter.", "Tjek i **Explorer**, at `Microsoft.ML` står under **Dependencies** (fold mapperne ud). Eller dobbeltklik på `LejlighedsPris.csproj`: der skal stå en linje med `PackageReference`."],
        md2: "Lad `Program.cs` være tom indtil videre. Du skriver programmet i de næste trin og kører det til sidst i lektionen." },
      { t: "laes", h: "Klasserne: ét eksempel ind, ét gæt ud",
        md: "ML.NET skal bruge **to klasser**: én, der beskriver et eksempel (features og label), og én, der beskriver modellens svar.\n\nTal skal være `float`. Svaret fra en regressionsmodel hedder altid `Score` inde i ML.NET. Med attributten `[ColumnName(\"Score\")]` kan din property alligevel hedde noget, der giver mening.",
        frag: true,
        kode: R`using Microsoft.ML.Data;

public class Lejlighed
{
    public float Kvm { get; set; }
    public float Vaerelser { get; set; }
    public float Pris { get; set; }
}

public class PrisGaet
{
    [ColumnName("Score")]
    public float Pris { get; set; }
}`,
        noter: [
          ["using Microsoft.ML.Data;", "Her bor attributten `ColumnName`."],
          ["class Lejlighed", "Ét eksempel. `Kvm` og `Vaerelser` er features, `Pris` er label."],
          ["class PrisGaet", "Det, `Predict` giver tilbage."],
          ["[ColumnName(\"Score\")]", "\"Læg ML.NETs kolonne `Score` (gættet) i denne property.\""]
        ],
        md2: "Klasserne skal stå **nederst** i `Program.cs`, efter top-level-koden — eller i deres egne filer." },
      { t: "valg", q: "Hvad gør `[ColumnName(\"Score\")]` over `public float Pris` i klassen `PrisGaet`?",
        svar: ["Den kobler ML.NETs kolonne med gættet, `Score`, til propertyen `Pris`", "Den gør `Pris` til en feature", "Den runder prisen af til et helt tal", "Den gemmer prisen i en database"],
        ret: 0, fordi: "ML.NET kalder altid gættet fra en regressionsmodel `Score`. Attributten siger, hvilken af dine properties det skal ende i. Uden den skulle propertyen selv hedde `Score`." },
      { t: "laes", h: "Data ind og pipelinen",
        md: "Først laves `MLContext`. Et fast `seed` gør, at træningen giver samme resultat hver gang, du kører — ellers bruger ML.NET tilfældige tal undervejs.\n\nSå bygges **pipelinen**. Den er en kæde af skridt, som sættes sammen med `.Append(...)`:",
        frag: true,
        kode: R`MLContext ml = new MLContext(seed: 1);

List<Lejlighed> data = new List<Lejlighed>
{
    new Lejlighed { Kvm = 35, Vaerelser = 1, Pris = 1250 },
    new Lejlighed { Kvm = 42, Vaerelser = 1, Pris = 1400 },
    new Lejlighed { Kvm = 50, Vaerelser = 2, Pris = 1750 },
    new Lejlighed { Kvm = 55, Vaerelser = 2, Pris = 1850 },
    new Lejlighed { Kvm = 62, Vaerelser = 2, Pris = 2050 },
    new Lejlighed { Kvm = 70, Vaerelser = 3, Pris = 2400 },
    new Lejlighed { Kvm = 75, Vaerelser = 3, Pris = 2500 },
    new Lejlighed { Kvm = 84, Vaerelser = 3, Pris = 2750 },
    new Lejlighed { Kvm = 90, Vaerelser = 4, Pris = 3050 },
    new Lejlighed { Kvm = 98, Vaerelser = 4, Pris = 3250 },
    new Lejlighed { Kvm = 110, Vaerelser = 4, Pris = 3550 },
    new Lejlighed { Kvm = 125, Vaerelser = 5, Pris = 4100 }
};
IDataView traeningsdata = ml.Data.LoadFromEnumerable(data);

var pipeline = ml.Transforms.Concatenate("Features", "Kvm", "Vaerelser")
    .Append(ml.Transforms.NormalizeMinMax("Features"))
    .Append(ml.Regression.Trainers.LbfgsPoissonRegression(labelColumnName: "Pris"));`,
        noter: [
          ["new MLContext(seed: 1)", "Indgangen til ML.NET. `seed` gør resultatet ens fra kørsel til kørsel."],
          ["ml.Data.LoadFromEnumerable(data)", "Lav listen om til et `IDataView`, som ML.NET kan arbejde med."],
          ["Concatenate(\"Features\", \"Kvm\", \"Vaerelser\")", "Saml alle features i én kolonne, der **skal** hedde `Features`. Trænerne leder efter netop det navn."],
          ["NormalizeMinMax(\"Features\")", "Skaler tallene til mellem 0 og 1, så 125 m² ikke fylder mere end 5 værelser bare fordi tallet er større."],
          ["Regression.Trainers.…", "Vælg en **træner** til regression. `labelColumnName` siger, hvilken kolonne der er svaret."]
        ],
        md2: "Hvorfor netop `LbfgsPoissonRegression`? Den giver stabile resultater på små datasæt med tal, der altid er positive, som priser. ML.NET har mange andre trænere — fx `Sdca`, der bruges i mange af Microsofts eksempler. På så få rækker som her giver `Sdca` til gengæld helt skæve modeller. Det ser du selv i værkstedet, og det er en vigtig pointe: **mål altid modellen**." },
      { t: "orden", frag: true, q: "Sæt de seks skridt i den rækkefølge, et ML.NET-program skal have dem.", alt: [[0, 2, 1, 3, 4, 5]],
        linjer: [
          R`MLContext ml = new MLContext(seed: 1);`,
          R`IDataView data = ml.Data.LoadFromEnumerable(lejligheder);`,
          R`var pipeline = ml.Transforms.Concatenate("Features", "Kvm", "Vaerelser").Append(ml.Regression.Trainers.LbfgsPoissonRegression(labelColumnName: "Pris"));`,
          R`var model = pipeline.Fit(data);`,
          R`var motor = ml.Model.CreatePredictionEngine<Lejlighed, PrisGaet>(model);`,
          R`PrisGaet svar = motor.Predict(new Lejlighed { Kvm = 80, Vaerelser = 3 });`
        ],
        fordi: "Kontekst → data → pipeline → træn (`Fit`) → lav en forudsigelses-motor → forudsig. Hvert skridt bruger resultatet af det forrige: `Fit` skal have både pipelinen og data, og motoren skal have den trænede model." },
      { t: "laes", h: "Træn og forudsig",
        md: "`Fit` kører hele pipelinen på træningsdata. Det er her, træneren arbejder. Resultatet er den trænede **model**.\n\nFor at bruge modellen på én lejlighed ad gangen laver du en `PredictionEngine`. Den skal vide, hvilken klasse der går **ind** (`Lejlighed`), og hvilken der kommer **ud** (`PrisGaet`).",
        frag: true,
        kode: R`var model = pipeline.Fit(traeningsdata);

var motor = ml.Model.CreatePredictionEngine<Lejlighed, PrisGaet>(model);
PrisGaet svar = motor.Predict(new Lejlighed { Kvm = 80, Vaerelser = 3 });
Console.WriteLine($"80 m², 3 værelser: ca. {svar.Pris:F0} tusind kr.");`,
        noter: [
          ["pipeline.Fit(traeningsdata)", "Træn. Med millioner af rækker kan det tage minutter — med 12 rækker tager det et øjeblik."],
          ["CreatePredictionEngine<Lejlighed, PrisGaet>", "Ind kommer en `Lejlighed` uden pris. Ud kommer et `PrisGaet`."],
          ["new Lejlighed { Kvm = 80, Vaerelser = 3 }", "Et nyt eksempel. `Pris` udfyldes ikke — det er jo den, vi vil have gættet."]
        ],
        output: "80 m², 3 værelser: ca. 2494 tusind kr.",
        md2: "Tallet er fra en kørsel med .NET 10 og ML.NET 5.0.0. Får du et tal, der ligger lidt ved siden af, er det ikke en fejl: små forskelle i regnemåde mellem computere kan flytte det en smule." },
      { t: "udfyld", frag: true, q: "Træn modellen, og brug den på en ny lejlighed.",
        kode: R`var model = pipeline.[[Fit]](traeningsdata);
var motor = ml.Model.CreatePredictionEngine<Lejlighed, PrisGaet>(model);
PrisGaet svar = motor.[[Predict]](new Lejlighed { Kvm = 60, Vaerelser = 2 });
Console.WriteLine(svar.[[Pris]]);`,
        fordi: "`Fit` træner. `Predict` laver ét gæt. Gættet ligger i den property, der har `[ColumnName(\"Score\")]` — her `Pris`." },
      { t: "laes", h: "Mål modellen — på data, den ikke har set",
        md: "`Evaluate` lader modellen gætte på et sæt eksempler og sammenligner med de rigtige svar. For regression får du bl.a. **R²** (jo tættere på 1, jo bedre) og **MAE** (gennemsnitlig fejl — som du selv regnede ud i lektion 1).\n\nMen pas på: måler du på **de samme** data, som modellen er trænet på, ser den bedre ud, end den er. Den kan have lært eksemplerne udenad i stedet for den generelle regel. Det hedder **overfitting**. Derfor deler man data i **træningsdata** og **testdata** med `TrainTestSplit` og måler på testdata.",
        frag: true,
        kode: R`IDataView alle = ml.Data.LoadFromEnumerable(data);
DataOperationsCatalog.TrainTestData delt = ml.Data.TrainTestSplit(alle, testFraction: 0.25);

var model = pipeline.Fit(delt.TrainSet);

IDataView testGaet = model.Transform(delt.TestSet);
RegressionMetrics maal = ml.Regression.Evaluate(testGaet, labelColumnName: "Pris");
Console.WriteLine($"R²: {maal.RSquared:F2}");
Console.WriteLine($"Gennemsnitlig fejl: {maal.MeanAbsoluteError:F0} tusind kr.");`,
        noter: [
          ["TrainTestSplit(alle, testFraction: 0.25)", "Læg tilfældigt ca. 25 % af rækkerne til side som testdata."],
          ["pipeline.Fit(delt.TrainSet)", "Træn kun på de andre 75 %."],
          ["model.Transform(delt.TestSet)", "Lad modellen gætte på alle testrækkerne på én gang."],
          ["ml.Regression.Evaluate(…)", "Sammenlign gættene med de rigtige priser."]
        ],
        output: "R²: 0,98\nGennemsnitlig fejl: 103 tusind kr.",
        md2: "Med kun 12 lejligheder er testsættet bare tre rækker, så tallene hopper, hvis du ændrer `seed`. Rigtige modeller trænes på tusindvis af rækker — så bliver målingen pålidelig." },
      { t: "valg", q: "En model får R² = 0,99 målt på sine **træningsdata**, men R² = 0,40 på **testdata**. Hvad er det mest sandsynlige?",
        svar: ["Overfitting: modellen har lært træningseksemplerne udenad, men har ikke fundet en regel, der virker på nye data", "Testdata er forkerte og skal slettes", "Modellen er perfekt — træningsdata er det, der tæller", "R² skal være 0 for at være godt"],
        ret: 0, fordi: "Det, der tæller, er, hvor godt modellen gætter på noget **nyt**. Et stort fald fra træningsdata til testdata er det klassiske tegn på overfitting. Løsningen er typisk flere data eller en enklere model." },
      { t: "spor", h: "Spor: del data i træning og test",
        q: "`TrainTestSplit` vælger tilfældigt. Her deles seks rækker i hånden: hver tredje række (i = 2 og i = 5) bliver testdata. Skriv de to tællere efter hver linje, der ændrer dem.",
        kode: R`int antalTraening = 0;
int antalTest = 0;
for (int i = 0; i < 6; i++)
{
    if (i % 3 == 2)
        antalTest++;
    else
        antalTraening++;
}`,
        kolonner: ["antalTraening", "antalTest"],
        raekker: [[1, "=0", "=–"], [2, "=0", "=0"], [8, "1", "0"], [8, "2", "0"], [6, "2", "1"], [8, "3", "1"], [8, "4", "1"], [6, "4", "2"]],
        fordi: "`i % 3 == 2` er sand for i = 2 og i = 5. De to rækker bliver testdata; de fire andre bruges til træning. Det vigtige er, at testrækkerne **aldrig** bruges under træningen." },
      { t: "ide", h: "Kør LejlighedsPris",
        md: "Skriv hele programmet **selv** i `Program.cs` i projektet fra trin 2, og kør det. Det træner på alle 12 lejligheder, forudsiger én pris, måler modellen og gemmer den i en fil, som du bruger i næste lektion.",
        frag: true,
        kode: R`using Microsoft.ML;
using Microsoft.ML.Data;

MLContext ml = new MLContext(seed: 1);

List<Lejlighed> data = new List<Lejlighed>
{
    new Lejlighed { Kvm = 35, Vaerelser = 1, Pris = 1250 },
    new Lejlighed { Kvm = 42, Vaerelser = 1, Pris = 1400 },
    new Lejlighed { Kvm = 50, Vaerelser = 2, Pris = 1750 },
    new Lejlighed { Kvm = 55, Vaerelser = 2, Pris = 1850 },
    new Lejlighed { Kvm = 62, Vaerelser = 2, Pris = 2050 },
    new Lejlighed { Kvm = 70, Vaerelser = 3, Pris = 2400 },
    new Lejlighed { Kvm = 75, Vaerelser = 3, Pris = 2500 },
    new Lejlighed { Kvm = 84, Vaerelser = 3, Pris = 2750 },
    new Lejlighed { Kvm = 90, Vaerelser = 4, Pris = 3050 },
    new Lejlighed { Kvm = 98, Vaerelser = 4, Pris = 3250 },
    new Lejlighed { Kvm = 110, Vaerelser = 4, Pris = 3550 },
    new Lejlighed { Kvm = 125, Vaerelser = 5, Pris = 4100 }
};
IDataView traeningsdata = ml.Data.LoadFromEnumerable(data);

var pipeline = ml.Transforms.Concatenate("Features", "Kvm", "Vaerelser")
    .Append(ml.Transforms.NormalizeMinMax("Features"))
    .Append(ml.Regression.Trainers.LbfgsPoissonRegression(labelColumnName: "Pris"));

var model = pipeline.Fit(traeningsdata);

var motor = ml.Model.CreatePredictionEngine<Lejlighed, PrisGaet>(model);
PrisGaet svar = motor.Predict(new Lejlighed { Kvm = 80, Vaerelser = 3 });
Console.WriteLine($"80 m², 3 værelser: ca. {svar.Pris:F0} tusind kr.");

RegressionMetrics maal = ml.Regression.Evaluate(model.Transform(traeningsdata), labelColumnName: "Pris");
Console.WriteLine($"R²: {maal.RSquared:F2}");
Console.WriteLine($"Gennemsnitlig fejl: {maal.MeanAbsoluteError:F0} tusind kr.");

ml.Model.Save(model, traeningsdata.Schema, "prismodel.zip");
Console.WriteLine($"Gemt: {Path.GetFullPath("prismodel.zip")}");

public class Lejlighed
{
    public float Kvm { get; set; }
    public float Vaerelser { get; set; }
    public float Pris { get; set; }
}

public class PrisGaet
{
    [ColumnName("Score")]
    public float Pris { get; set; }
}`,
        output: "80 m², 3 værelser: ca. 2494 tusind kr.\nR²: 0,98\nGennemsnitlig fejl: 97 tusind kr.\nGemt: …/prismodel.zip",
        md2: "Her måles på træningsdata, fordi der er så få rækker. Sidste linje viser den fulde sti til filen — den afhænger af, hvor dit projekt ligger. `prismodel.zip` er **hele den trænede model** i én fil. Sæt et breakpoint på linjen med `Predict`, og se `model` og `motor` i Locals / Threads & Variables: det er helt almindelige objekter." },
      { t: "forklar", q: "Forklar med dine egne ord, hvad en pipeline i ML.NET er, og hvad `Fit` og `Predict` gør.",
        svar: "En **pipeline** er en kæde af skridt, som data går igennem. Først gøres data klar — fx samles alle features i én kolonne, `Features`, og tallene skaleres — og til sidst kommer en **træner**, der er den algoritme, der finder modellen. `Fit` kører pipelinen på **træningsdata** og giver den trænede **model** tilbage. `Predict` bruger modellen på **ét nyt eksempel** og giver et gæt — fx en pris. Man måler modellen med `Evaluate` på **testdata**, som ikke var med i træningen.",
        noegle: ["kæde af skridt", "Features", "træner", "Fit", "Predict", "testdata"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m25l3", titel: "Klassifikation, og en model i en webapp", min: 22,
    ord: [
      ["Binær klassifikation", "En model, der vælger mellem to svar, fx positiv/negativ. I ML.NET er label en `bool`."],
      ["FeaturizeText", "Et skridt i pipelinen, der laver tekst om til tal (ord og bogstavgrupper), så en træner kan bruge den."],
      ["Sandsynlighed (probability)", "Hvor sikker modellen er, som et tal mellem 0 og 1. Over 0,5 betyder svaret `true`."],
      ["Accuracy", "Andelen af gæt, der var rigtige. 0,75 betyder, at 3 ud af 4 gæt ramte."],
      ["Model-fil", "En `.zip`-fil, som `ml.Model.Save` laver. Indeholder hele den trænede model, så den kan bruges i et andet program."],
      ["PredictionEnginePool", "En samling af prediction engines, som ASP.NET Core kan dele mellem mange samtidige forespørgsler. Fra pakken `Microsoft.Extensions.ML`."],
      ["Model Builder", "Et værktøj i Visual Studio, der prøver mange trænere automatisk og skriver ML.NET-koden for dig."]
    ],
    trin: [
      { t: "laes", h: "Er anmeldelsen positiv?",
        md: "En webshop har tusindvis af anmeldelser. Den vil gerne automatisk markere de **negative**, så kundeservice kan reagere hurtigt. Det er **binær klassifikation**: svaret er `true` (positiv) eller `false` (negativ).\n\nNy udfordring: featuren er **tekst**. En træner kan kun regne med tal. Skridtet `FeaturizeText` laver teksten om til tal: det tæller, hvilke ord og bogstavgrupper der optræder. Så kan træneren lære, at \"dårlig\" og \"skuffet\" trækker mod negativ, og \"god\" og \"anbefales\" mod positiv.",
        frag: true,
        kode: R`public class Anmeldelse
{
    public string Tekst { get; set; } = "";
    public bool Positiv { get; set; }
}

public class Vurdering
{
    [ColumnName("PredictedLabel")]
    public bool ErPositiv { get; set; }

    [ColumnName("Probability")]
    public float Sandsynlighed { get; set; }
}`,
        noter: [
          ["Tekst", "Featuren: selve anmeldelsen."],
          ["bool Positiv", "Label. Ved binær klassifikation skal label være en `bool`."],
          ["PredictedLabel", "ML.NETs navn for gættet: `true` eller `false`."],
          ["Probability", "Hvor sikker modellen er på `true`, mellem 0 og 1."]
        ] },
      { t: "valg", q: "Hvorfor skal pipelinen have skridtet `FeaturizeText`, når featuren er en tekst?",
        svar: ["Fordi trænere kun kan regne med tal, så teksten skal laves om til tal først", "Fordi teksten skal oversættes til engelsk", "Fordi teksten ellers bliver gemt i en database", "Fordi `FeaturizeText` retter stavefejl"],
        ret: 0, fordi: "Al machine learning er matematik på tal. `FeaturizeText` laver hver tekst om til en lang række tal, der fortæller, hvilke ord og bogstavgrupper der er i den." },
      { t: "laes", h: "Træn klassifikationsmodellen",
        md: "Pipelinen er kortere end før: lav teksten om til tal, og træn en klassifikations-træner. Resten — `TrainTestSplit`, `Fit`, `Evaluate`, `Predict` — kender du fra lektion 2. Her er de vigtige linjer; hele programmet med 20 anmeldelser kan du bygge i værkstedet (en ekstra-opgave under opgaven **Bilpriser med ML.NET**).",
        frag: true,
        kode: R`IDataView alle = ml.Data.LoadFromEnumerable(anmeldelser);
DataOperationsCatalog.TrainTestData delt = ml.Data.TrainTestSplit(alle, testFraction: 0.25);

var pipeline = ml.Transforms.Text.FeaturizeText("Features", "Tekst")
    .Append(ml.BinaryClassification.Trainers.SdcaLogisticRegression(labelColumnName: "Positiv"));

var model = pipeline.Fit(delt.TrainSet);

CalibratedBinaryClassificationMetrics maal =
    ml.BinaryClassification.Evaluate(model.Transform(delt.TestSet), labelColumnName: "Positiv");
Console.WriteLine($"Accuracy på testdata: {maal.Accuracy:P0}");

var motor = ml.Model.CreatePredictionEngine<Anmeldelse, Vurdering>(model);
Vurdering v = motor.Predict(new Anmeldelse { Tekst = "God kvalitet og hurtig levering" });
Console.WriteLine($"{(v.ErPositiv ? "positiv" : "negativ")} ({v.Sandsynlighed:P0})");`,
        noter: [
          ["FeaturizeText(\"Features\", \"Tekst\")", "Lav kolonnen `Tekst` om til tal i kolonnen `Features`."],
          ["BinaryClassification.Trainers.SdcaLogisticRegression", "En træner til binær klassifikation. Den giver også en sandsynlighed."],
          ["maal.Accuracy", "Andelen af rigtige gæt på testdata."],
          [":P0", "Formatér som procent uden decimaler: 0,75 bliver `75 %`."]
        ],
        output: "Accuracy på testdata: 50 %\npositiv (100 %)",
        md2: "**50 %** er ikke bedre end at slå plat og krone! Men testsættet er kun en håndfuld anmeldelser, så ét forkert gæt flytter tallet meget. Modellen gætter fint på tydelige sætninger, men den har kun set 15 eksempler. Den ærlige konklusion er: **for få data**. Det er præcis det, man skal kunne sige til eksamen, hvis man bruger ML." },
      { t: "valg", q: "Modellen fra trinnet før får teksten \"Den er blå\" og svarer **positiv (81 %)**. Hvad er den bedste forklaring?",
        svar: ["Modellen kender kun to svar og skal vælge et af dem — den har ikke lært, hvad en neutral sætning er", "Blå er et positivt ord", "Modellen er i stykker", "Sandsynligheden er altid 81 %"],
        ret: 0, fordi: "En binær model **skal** vælge positiv eller negativ, selv når teksten ikke er nogen af delene. Sandsynligheden viser, at den er mindre sikker end ved tydelige sætninger (100 % og 1 %). I en rigtig app kunne man fx kun reagere, når sandsynligheden er under 20 % eller over 80 %." },
      { t: "forudsig", q: "En klassifikationsmodel har givet fire sandsynligheder for \"positiv\". Modellen svarer `true`, når sandsynligheden er over 0,5. Hvad skriver programmet?",
        kode: R`float[] sandsynligheder = { 0.92f, 0.40f, 0.51f, 0.08f };
int positive = 0;

foreach (float s in sandsynligheder)
{
    if (s > 0.5f)
    {
        positive++;
    }
}
Console.WriteLine(positive);
Console.WriteLine($"{sandsynligheder[2]:P0}");`,
        output: "2\n51 %",
        fordi: "0,92 og 0,51 er over 0,5, så to anmeldelser bliver positive. `P0` skriver 0,51 som `51 %` (da-DK sætter et mellemrum før procenttegnet). Bemærk: 51 % er et **meget usikkert** ja." },
      { t: "spor", h: "Spor: regn accuracy ud",
        q: "Sådan regner `Evaluate` accuracy ud: tæl, hvor mange gæt der er lig med facit, og del med antallet. Skriv `rigtige` og `accuracy` efter de linjer, der ændrer dem. (Løkken sammenligner plads 0, 1, 2 og 3.)",
        kode: R`bool[] gaet = { true, false, true, true };
bool[] facit = { true, false, false, true };
int rigtige = 0;
for (int i = 0; i < gaet.Length; i++)
{
    if (gaet[i] == facit[i])
    {
        rigtige++;
    }
}
double accuracy = (double)rigtige / gaet.Length;
Console.WriteLine($"Accuracy: {accuracy:P0}");`,
        kolonner: ["rigtige", "accuracy"],
        raekker: [[3, "=0", "=–"], [8, "=1", "=–"], [8, "2", "–"], [8, "3", "–"], [11, "3", "0,75"]],
        output: "Accuracy: 75 %",
        fordi: "Plads 0, 1 og 3 stemmer; plads 2 gør ikke (modellen sagde positiv, facit var negativ). 3 af 4 er 0,75 — skrevet som `75 %`." },
      { t: "laes", h: "Modellen i en MVC-app",
        md: "Træning sker **én gang**, i et konsolprogram. Webappen skal kun **bruge** modellen. Derfor gemmer man modellen i en fil med `ml.Model.Save` og lægger filen ind i webprojektet.\n\nI ASP.NET Core bruger man ikke `CreatePredictionEngine` direkte. En webserver håndterer mange forespørgsler **på samme tid** (modul 8), og en `PredictionEngine` må kun bruges af én tråd ad gangen. Pakken `Microsoft.Extensions.ML` giver en **`PredictionEnginePool`**, som du registrerer i `Program.cs` og får ind i controlleren med dependency injection — præcis som et repository i modul 19.",
        frag: true,
        kode: R`// Program.cs — efter builder.Services.AddControllersWithViews();
builder.Services.AddPredictionEnginePool<Anmeldelse, Vurdering>()
    .FromFile("anmeldelser.zip");

// Controllers/AnmeldelseController.cs
public class AnmeldelseController : Controller
{
    private readonly PredictionEnginePool<Anmeldelse, Vurdering> _pool;

    public AnmeldelseController(PredictionEnginePool<Anmeldelse, Vurdering> pool)
    {
        _pool = pool;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Index(string tekst)
    {
        Vurdering v = _pool.Predict(new Anmeldelse { Tekst = tekst });
        ViewBag.Tekst = tekst;
        ViewBag.Resultat = v.ErPositiv ? "Positiv" : "Negativ";
        ViewBag.Sikkerhed = v.Sandsynlighed.ToString("P0");
        return View();
    }
}`,
        noter: [
          ["AddPredictionEnginePool<Anmeldelse, Vurdering>()", "Registrér en pool til denne model som en service."],
          [".FromFile(\"anmeldelser.zip\")", "Hent modellen fra filen, når appen starter. Stien er i forhold til projektmappen."],
          ["PredictionEnginePool<…> pool", "Constructor injection: ASP.NET Core giver controlleren poolen."],
          ["_pool.Predict(…)", "Lån en motor, lav gættet, aflever motoren igen — alt sammen i ét kald."]
        ],
        md2: "Afprøvet: siden svarer **Positiv (100 %)** på \"Hurtig levering og god kvalitet\". Klasserne `Anmeldelse` og `Vurdering` skal ligge i webprojektet også (fx i `Models`) og være **præcis** som i træningsprogrammet, ellers passer de ikke til modellen i filen." },
      { t: "udfyld", frag: true, q: "Registrér en pool til bilpris-modellen i `Program.cs`, så controllere kan få den med dependency injection.",
        kode: R`builder.Services.[[AddPredictionEnginePool]]<Bil, BilGaet>()
    .[[FromFile]]("bilpris.zip");`,
        fordi: "`AddPredictionEnginePool<Ind, Ud>()` registrerer servicen, og `FromFile` siger, hvor modellen ligger. Typerne skal være de samme klasser, modellen blev trænet med." },
      { t: "valg", q: "Hvorfor bruger man `PredictionEnginePool` i en webapp i stedet for én `PredictionEngine`, som alle forespørgsler deles om?",
        svar: ["Fordi mange forespørgsler kører samtidig på hver sin tråd, og en PredictionEngine må kun bruges af én tråd ad gangen", "Fordi PredictionEngine ikke virker i .NET 10", "Fordi poolen træner modellen igen ved hver forespørgsel", "Fordi poolen gemmer svarene i databasen"],
        ret: 0, fordi: "En `PredictionEngine` er ikke *thread-safe* (modul 8: race conditions). Poolen har flere motorer og låner dem ud én ad gangen, så to samtidige brugere aldrig deler den samme." },
      { t: "laes", h: "Model Builder, og hvornår ML hører hjemme i et projekt",
        md: "Visual Studio har et værktøj, **Model Builder** (højreklik på projektet → **Add → Machine Learning Model**, hvis det er installeret via Visual Studio Installer). Du vælger en opgave og en datafil, og det prøver selv mange trænere og skriver ML.NET-koden. Bag det ligger **AutoML**. Rider har ikke Model Builder — der skriver du koden som i denne lektion.\n\nTil eksamensprojektet er ML et **ekstra** emne, ikke et krav. Bruger du det, så hold det lille, og kunne forklare det.",
        noter: [
          ["Træning", "Sker sjældent og offline, i et separat program. Resultatet er en model-fil."],
          ["Forudsigelse", "Sker i webappen ved hver forespørgsel. Hurtigt, fordi modellen allerede er trænet."],
          ["Data", "Kvaliteten af modellen kan aldrig blive bedre end træningsdata. For få eller skæve data giver dårlige eller uretfærdige gæt."],
          ["Ansvar", "Vis brugeren, at svaret er et gæt. Lad et menneske træffe vigtige beslutninger."]
        ] },
      { t: "ide", h: "Anmeldelser på en MVC-side",
        md: "Træn anmeldelsesmodellen i et konsolprojekt (ekstra-opgaven under **Bilpriser med ML.NET** i værkstedet viser, hvordan), og brug den på en side i en MVC-app. Har du ikke lavet værkstedet endnu, så gør det med prismodellen fra lektion 2 i stedet — skridtene er de samme. Du har allerede en mappe, der hedder `Webshop`, fra værkstedet i modul 7: skriv derfor en ny mappe, fx `Modul25`, i feltet {{**Location**||**Solution directory**}}, når du opretter projektet.",
        win: ["Opret et nyt **ASP.NET Core Web App (Model-View-Controller)**-projekt, `Webshop`.", "Package Manager Console: `Install-Package Microsoft.Extensions.ML -Version 5.0.0`. Den henter selv `Microsoft.ML` med.", "Kopiér model-filen (`.zip`) ind i projektmappen. Klik på den i Solution Explorer, og sæt **Copy to Output Directory** til **Copy if newer** i **Properties**-vinduet.", "Læg klasserne `Anmeldelse` og `Vurdering` i `Models`, registrér poolen i `Program.cs`, og lav controlleren og viewet `Views/Anmeldelse/Index.cshtml`.", "Kør, og gå til `/Anmeldelse`."],
        mac: ["Opret et nyt **ASP.NET Core Web App (Model-View-Controller)**-projekt, `Webshop`.", "Terminal: `dotnet add package Microsoft.Extensions.ML --version 5.0.0`. Den henter selv `Microsoft.ML` med.", "Kopiér model-filen (`.zip`) ind i projektmappen (træk den ind i Explorer, eller kopiér den i Finder).", "Læg klasserne `Anmeldelse` og `Vurdering` i `Models`, registrér poolen i `Program.cs`, og lav controlleren og viewet `Views/Anmeldelse/Index.cshtml`.", "Kør, og gå til `/Anmeldelse`."],
        sprog: "razor",
        kode: R`@{
    ViewData["Title"] = "Anmeldelser";
}
<h1>Er anmeldelsen positiv?</h1>

<form asp-action="Index" method="post">
    <textarea name="tekst" class="form-control" rows="3">@ViewBag.Tekst</textarea>
    <button type="submit" class="btn btn-primary mt-2">Vurdér</button>
</form>

@if (ViewBag.Resultat != null)
{
    <p class="mt-3">Modellen siger: <strong>@ViewBag.Resultat</strong> (sandsynlighed for positiv: @ViewBag.Sikkerhed)</p>
}`,
        md2: "Husk øverst i `Program.cs`: `using Microsoft.Extensions.ML;` og `using Webshop.Models;`. Får du en fejl om, at filen ikke findes, så tjek, at `.zip`-filen ligger i projektmappen ved siden af `Program.cs`." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvordan ville du bruge en ML-model i en ASP.NET Core-webapp, og hvad skal man være opmærksom på?",
        svar: "Modellen **trænes én gang** i et separat program og **gemmes i en fil** med `ml.Model.Save`. Webappen henter filen ved opstart: i `Program.cs` registrerer jeg en **`PredictionEnginePool`** med `AddPredictionEnginePool<Ind, Ud>().FromFile(...)`, og controlleren får den med **dependency injection**. Ved hver forespørgsel kalder jeg `Predict` og viser svaret i viewet. Man bruger en pool, fordi webserveren kører **mange forespørgsler samtidig**, og en PredictionEngine ikke er thread-safe. Man skal være opmærksom på, at svaret er et **gæt**: modellen er kun så god som **træningsdata**, den skal **måles på testdata**, og brugeren skal kunne se, at det er en forudsigelse.",
        noegle: ["trænes én gang", "model-fil", "PredictionEnginePool", "dependency injection", "samtidig", "træningsdata"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m25v", titel: "Værksted: dine egne modeller", vaerksted: true, min: 75, ord: [],
    trin: [
      { t: "laes", h: "Sådan arbejder du i værkstedet",
        md: "Først laver du selv de små \"modeller\" i ren C#, så du ser, at træning og måling bare er løkker og regning. Den tredje opgave, **Fejlfinding: accuracy er altid 0 %**, er en fejlfinding med debuggeren. Så træner du to rigtige modeller med ML.NET, og til sidst kommer en model på nettet.\n\nI de tre første opgaver sammenligner siden dit output med facit. De to sidste opgaver bruger ML.NET, og der kan dine tal ligge en smule ved siden af eksemplet.",
        noter: [
          ["Skriv selv", "Skriv koden med dine egne fingre. Kopiér ikke fra lektionerne."],
          ["Kør tit", "Kør efter hver lille ændring. Så ved du, hvilken ændring der gjorde noget forkert."],
          ["Brug debuggeren", "Sæt et **breakpoint** i løkken, gå frem én linje ad gangen, og se variablerne i **Locals** (Visual Studio) eller **Threads & Variables** (Rider)."],
          ["Mål altid", "En model, du ikke har målt, ved du ikke noget om."],
          ["Tips før løsning", "Åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af."]
        ] },

      { t: "opgave", h: "Gennemsnitsmodellen", projekt: "Gennemsnit",
        md: "Den allerdummeste model gætter altid på **gennemsnittet** af træningsdata, uanset hvad den får at vide. Den bruges i praksis som målestok: en rigtig model skal i hvert fald være bedre end den. Skriv et program, der \"træner\" gennemsnitsmodellen på fem bilpriser.",
        krav: [
          "Et array `int[] priser = { 280, 220, 165, 120, 70 };` (tusind kr.)",
          "En `for`- eller `foreach`-løkke lægger priserne sammen i en variabel `sum`",
          "Gennemsnittet regnes ud som `double` (ingen heltalsdivision)",
          "Første linje: `Antal biler: 5`",
          "Anden linje: `Gæt for enhver bil: 171 tusind kr.` (gennemsnittet med `F0`)"
        ],
        tip: [
          "Start med `int sum = 0;` før løkken.",
          "`double gennemsnit = (double)sum / priser.Length;`",
          "`Console.WriteLine($\"Gæt for enhver bil: {gennemsnit:F0} tusind kr.\");`"
        ],
        output: "Antal biler: 5\nGæt for enhver bil: 171 tusind kr.",
        loesning: R`int[] priser = { 280, 220, 165, 120, 70 };

int sum = 0;
foreach (int p in priser)
{
    sum += p;
}
double gennemsnit = (double)sum / priser.Length;

Console.WriteLine($"Antal biler: {priser.Length}");
Console.WriteLine($"Gæt for enhver bil: {gennemsnit:F0} tusind kr.");`,
        ekstra: ["Regn også gennemsnitsmodellens MAE ud: gennemsnittet af `Math.Abs(gennemsnit - pris)` for alle fem biler.", "Sæt et breakpoint i løkken, og se `sum` vokse i Locals / Threads & Variables."] },

      { t: "opgave", h: "Pris pr. kvadratmeter", projekt: "PrisPrKvm",
        md: "Træn modellen *pris = kvm × pris pr. m²* på fire lejligheder, og brug den til at gætte prisen på tre nye.",
        krav: [
          "To arrays: `int[] kvm = { 35, 55, 75, 98 };` og `int[] pris = { 1250, 1850, 2500, 3250 };`",
          "Træning: læg alle kvadratmeter sammen og alle priser sammen i én løkke, og regn `double prisPrKvm` ud som samlet pris delt med samlede kvadratmeter",
          "Første linje: `Pris pr. m²: 33,7` (med `F1`)",
          "Forudsigelse: for hver af størrelserne `{ 40, 80, 120 }` skrives fx `40 m²: 1346 tusind kr.` (gættet med `F0`)",
          "Brug en løkke til de tre forudsigelser, ikke tre næsten ens linjer"
        ],
        tip: [
          "Det er præcis programmet fra lektion 1, bare med andre tal. Prøv uden at kigge.",
          "Husk `(double)` foran `sumPris`, så divisionen ikke bliver heltalsdivision.",
          "`int[] nye = { 40, 80, 120 }; foreach (int k in nye) { Console.WriteLine($\"{k} m²: {k * prisPrKvm:F0} tusind kr.\"); }`"
        ],
        output: "Pris pr. m²: 33,7\n40 m²: 1346 tusind kr.\n80 m²: 2692 tusind kr.\n120 m²: 4038 tusind kr.",
        loesning: R`int[] kvm = { 35, 55, 75, 98 };
int[] pris = { 1250, 1850, 2500, 3250 };

int sumKvm = 0;
int sumPris = 0;
for (int i = 0; i < kvm.Length; i++)
{
    sumKvm += kvm[i];
    sumPris += pris[i];
}
double prisPrKvm = (double)sumPris / sumKvm;
Console.WriteLine($"Pris pr. m²: {prisPrKvm:F1}");

int[] nye = { 40, 80, 120 };
foreach (int k in nye)
{
    Console.WriteLine($"{k} m²: {k * prisPrKvm:F0} tusind kr.");
}`,
        ekstra: ["Mål modellen: regn MAE ud på de fire træningslejligheder, som i lektion 1.", "Er 120 m² en fornuftig forudsigelse, når den største lejlighed i træningsdata kun er 98 m²? At gætte uden for de data, man har set, hedder at **ekstrapolere** — og det er altid usikkert."] },

      { t: "opgave", h: "Fejlfinding: accuracy er altid 0 %", projekt: "AccuracyFejl",
        md: "Programmet skal regne accuracy ud for seks gæt fra en klassifikationsmodel. Fire af de seks gæt er rigtige, så det skal skrive `Rigtige: 4 af 6` og `Accuracy: 67 %`. Det skriver noget andet. Find fejlene **med debuggeren** — ikke ved at gætte. Der er to.",
        krav: [
          "Programmet skriver `Rigtige: 4 af 6`",
          "Programmet skriver `Accuracy: 67 %`",
          "Du har fundet begge fejl ved at sætte et breakpoint og se `i`, `rigtige` og `accuracy` i Locals / Threads & Variables",
          "Du kan forklare med én sætning, hvad hver fejl var"
        ],
        start: R`bool[] gaet = { true, true, false, true, false, true };
bool[] facit = { true, false, false, true, true, true };

int rigtige = 0;
for (int i = 0; i < gaet.Length - 1; i++)
{
    if (gaet[i] == facit[i])
    {
        rigtige++;
    }
}
double accuracy = rigtige / gaet.Length;

Console.WriteLine($"Rigtige: {rigtige} af {gaet.Length}");
Console.WriteLine($"Accuracy: {accuracy:P0}");`,
        startOutput: "Rigtige: 3 af 6\nAccuracy: 0 %",
        tip: [
          "Sæt et breakpoint på `if`-linjen, og tryk Step Over. Hold øje med `i`: når den nogensinde værdien 5?",
          "Sæt et breakpoint på linjen med `Console.WriteLine` efter løkken. `rigtige` er et heltal, og `gaet.Length` er et heltal. Hvad giver heltal delt med heltal (modul 1)?",
          "Løkken skal køre `i < gaet.Length`. Divisionen skal være `(double)rigtige / gaet.Length`."
        ],
        output: "Rigtige: 4 af 6\nAccuracy: 67 %",
        loesning: R`bool[] gaet = { true, true, false, true, false, true };
bool[] facit = { true, false, false, true, true, true };

int rigtige = 0;
for (int i = 0; i < gaet.Length; i++)
{
    if (gaet[i] == facit[i])
    {
        rigtige++;
    }
}
double accuracy = (double)rigtige / gaet.Length;

Console.WriteLine($"Rigtige: {rigtige} af {gaet.Length}");
Console.WriteLine($"Accuracy: {accuracy:P0}");`,
        ekstra: ["Udvid programmet, så det også tæller, hvor mange negative anmeldelser modellen overså (facit `false`, gæt `true`). For en webshop, der vil fange sure kunder, er det tal vigtigere end accuracy."] },

      { t: "opgave", h: "Bilpriser med ML.NET", projekt: "BilPris", konsol: true,
        md: "Træn en rigtig regressionsmodel med ML.NET, der gætter prisen på en brugt bil ud fra alder og kørte kilometer. Mål den, brug den på tre nye biler, og gem den i en fil.\n\nData (alder i år, km i tusinder, pris i tusind kr.): 1, 15, 280 · 2, 30, 250 · 3, 45, 220 · 3, 60, 205 · 4, 70, 185 · 5, 80, 165 · 6, 95, 140 · 7, 110, 120 · 8, 120, 105 · 9, 140, 85 · 10, 150, 70 · 12, 180, 45.",
        krav: [
          "Konsolprojektet `BilPris` har NuGet-pakken `Microsoft.ML` version 5.0.0",
          "Klassen `Bil` har `float`-properties `Alder`, `Km` og `Pris`; klassen `BilGaet` har `[ColumnName(\"Score\")] public float Pris`",
          "De 12 biler ligger i en `List<Bil>`, og `MLContext` er lavet med `seed: 1`",
          "Pipelinen samler `Alder` og `Km` i `Features`, normaliserer med `NormalizeMinMax` og træner med `LbfgsPoissonRegression(labelColumnName: \"Pris\")`",
          "Programmet skriver R² og den gennemsnitlige fejl, og et gæt for hver af bilerne 2 år/25 tusind km, 6 år/100 tusind km og 11 år/170 tusind km",
          "Modellen gemmes i `bilpris.zip`, og programmet skriver den fulde sti"
        ],
        tip: [
          "Tag `LejlighedsPris` fra lektion 2 som skabelon i hovedet: de samme fem skridt, andre navne.",
          "De tre nye biler kan ligge i et array: `Bil[] nye = { new Bil { Alder = 2, Km = 25 }, … };` og gennemløbes med `foreach`.",
          "`Console.WriteLine($\"{b.Alder} år, {b.Km} tusind km: ca. {g.Pris:F0} tusind kr.\");`"
        ],
        fri: true, frag: true,
        output: "R²: 0,99\nGennemsnitlig fejl: 5 tusind kr.\n2 år, 25 tusind km: ca. 255 tusind kr.\n6 år, 100 tusind km: ca. 133 tusind kr.\n11 år, 170 tusind km: ca. 63 tusind kr.\nGemt: …/bilpris.zip",
        loesning: R`using Microsoft.ML;
using Microsoft.ML.Data;

MLContext ml = new MLContext(seed: 1);

List<Bil> biler = new List<Bil>
{
    new Bil { Alder = 1, Km = 15, Pris = 280 },
    new Bil { Alder = 2, Km = 30, Pris = 250 },
    new Bil { Alder = 3, Km = 45, Pris = 220 },
    new Bil { Alder = 3, Km = 60, Pris = 205 },
    new Bil { Alder = 4, Km = 70, Pris = 185 },
    new Bil { Alder = 5, Km = 80, Pris = 165 },
    new Bil { Alder = 6, Km = 95, Pris = 140 },
    new Bil { Alder = 7, Km = 110, Pris = 120 },
    new Bil { Alder = 8, Km = 120, Pris = 105 },
    new Bil { Alder = 9, Km = 140, Pris = 85 },
    new Bil { Alder = 10, Km = 150, Pris = 70 },
    new Bil { Alder = 12, Km = 180, Pris = 45 }
};
IDataView data = ml.Data.LoadFromEnumerable(biler);

var pipeline = ml.Transforms.Concatenate("Features", "Alder", "Km")
    .Append(ml.Transforms.NormalizeMinMax("Features"))
    .Append(ml.Regression.Trainers.LbfgsPoissonRegression(labelColumnName: "Pris"));

var model = pipeline.Fit(data);

RegressionMetrics maal = ml.Regression.Evaluate(model.Transform(data), labelColumnName: "Pris");
Console.WriteLine($"R²: {maal.RSquared:F2}");
Console.WriteLine($"Gennemsnitlig fejl: {maal.MeanAbsoluteError:F0} tusind kr.");

var motor = ml.Model.CreatePredictionEngine<Bil, BilGaet>(model);
Bil[] nye =
{
    new Bil { Alder = 2, Km = 25 },
    new Bil { Alder = 6, Km = 100 },
    new Bil { Alder = 11, Km = 170 }
};
foreach (Bil b in nye)
{
    BilGaet g = motor.Predict(b);
    Console.WriteLine($"{b.Alder} år, {b.Km} tusind km: ca. {g.Pris:F0} tusind kr.");
}

ml.Model.Save(model, data.Schema, "bilpris.zip");
Console.WriteLine($"Gemt: {Path.GetFullPath("bilpris.zip")}");

public class Bil
{
    public float Alder { get; set; }
    public float Km { get; set; }
    public float Pris { get; set; }
}

public class BilGaet
{
    [ColumnName("Score")]
    public float Pris { get; set; }
}`,
        ekstra: [
          "Skift træneren ud med `ml.Regression.Trainers.Sdca(labelColumnName: \"Pris\")`, og kør igen. Afprøvet: R² bliver stærkt **negativ**, og gættene bliver helt skøre (minus flere millioner). Uden målingen ville du ikke have opdaget det. Skift tilbage bagefter.",
          "Træn også anmeldelsesmodellen fra lektion 3 i et nyt konsolprojekt, `Anmeldelser`, med 10 positive og 10 negative anmeldelser, du selv skriver. Gem den som `anmeldelser.zip`."
        ] },

      { t: "opgave", h: "Bilpris-modellen på nettet", projekt: "Webshop",
        md: "Lav en side i en MVC-app, hvor brugeren skriver bilens alder og kørte kilometer og får modellens bud på prisen. Modellen er `bilpris.zip` fra opgaven **Bilpriser med ML.NET**.",
        krav: [
          "MVC-projektet har NuGet-pakken `Microsoft.Extensions.ML` version 5.0.0, og `bilpris.zip` ligger i projektmappen",
          "`Models/Bil.cs` indeholder klasserne `Bil` og `BilGaet` — præcis som i træningsprogrammet",
          "`Program.cs` registrerer `AddPredictionEnginePool<Bil, BilGaet>().FromFile(\"bilpris.zip\")`",
          "`BilController` får poolen med constructor injection og har en GET- og en POST-udgave af `Index`; POST-udgaven har `[ValidateAntiForgeryToken]`",
          "Er alderen under 0 eller over 30, eller km under 0 eller over 400, vises `Alder skal være 0–30 år og km 0–400 tusind.` i stedet for et gæt",
          "Ellers vises `Modellens bud: ca. 133 tusind kr.` (for 6 år og 100 tusind km), og felterne beholder det, brugeren skrev"
        ],
        tip: [
          "Byg den på samme måde som anmeldelsessiden i lektion 3. Kun klasserne, `Program.cs`-linjen og felterne i formularen er anderledes.",
          "Modelbinding (modul 16) virker også for `float`: `public IActionResult Index(float alder, float km)`. Felterne i viewet skal hedde `name=\"alder\"` og `name=\"km\"`.",
          "I viewet: `@if (ViewBag.Pris != null) { <p>Modellens bud: <strong>ca. @ViewBag.Pris tusind kr.</strong></p> }`, og i controlleren `ViewBag.Pris = gaet.Pris.ToString(\"F0\");`."
        ],
        fri: true, frag: true,
        output: "Gå til /Bil.\nAlder 6, km 100 → Modellens bud: ca. 133 tusind kr.\nAlder 50, km 100 → Alder skal være 0–30 år og km 0–400 tusind.",
        loesning: R`// Program.cs — øverst
using Microsoft.Extensions.ML;
using Webshop.Models;

// Program.cs — efter builder.Services.AddControllersWithViews();
builder.Services.AddPredictionEnginePool<Bil, BilGaet>()
    .FromFile("bilpris.zip");

// Models/Bil.cs
using Microsoft.ML.Data;

namespace Webshop.Models;

public class Bil
{
    public float Alder { get; set; }
    public float Km { get; set; }
    public float Pris { get; set; }
}

public class BilGaet
{
    [ColumnName("Score")]
    public float Pris { get; set; }
}

// Controllers/BilController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.ML;
using Webshop.Models;

namespace Webshop.Controllers;

public class BilController : Controller
{
    private readonly PredictionEnginePool<Bil, BilGaet> _pool;

    public BilController(PredictionEnginePool<Bil, BilGaet> pool)
    {
        _pool = pool;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Index(float alder, float km)
    {
        if (alder < 0 || alder > 30 || km < 0 || km > 400)
        {
            ViewBag.Fejl = "Alder skal være 0–30 år og km 0–400 tusind.";
            return View();
        }

        BilGaet gaet = _pool.Predict(new Bil { Alder = alder, Km = km });
        ViewBag.Alder = alder;
        ViewBag.Km = km;
        ViewBag.Pris = gaet.Pris.ToString("F0");
        return View();
    }
}

// Views/Bil/Index.cshtml
@{
    ViewData["Title"] = "Hvad er bilen værd?";
}
<h1>Hvad er bilen værd?</h1>

<form asp-action="Index" method="post">
    <label>Alder (år)</label>
    <input name="alder" type="number" class="form-control" value="@ViewBag.Alder" />
    <label class="mt-2">Kørt (tusind km)</label>
    <input name="km" type="number" class="form-control" value="@ViewBag.Km" />
    <button type="submit" class="btn btn-primary mt-2">Beregn</button>
</form>

@if (ViewBag.Fejl != null)
{
    <p class="text-danger mt-3">@ViewBag.Fejl</p>
}
@if (ViewBag.Pris != null)
{
    <p class="mt-3">Modellens bud: <strong>ca. @ViewBag.Pris tusind kr.</strong></p>
}`,
        ekstra: ["Brug en view model med `[Range]`-attributter (modul 16 og 18) i stedet for de to `float`-parametre og `if`-sætningen.", "Tilføj et link til `/Bil` i menuen i `_Layout.cshtml`."] }
    ] }
  ]
});
})();
