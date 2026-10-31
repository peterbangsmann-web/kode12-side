// Modul 30, del 3 af 3: lektion 9–11 og værkstedet (kundeliste, kundeside, skadeside, test og aflevering). Se 30-skadeapp-1.js.
(function () {
const R = String.raw;
var m = window.KURSUS.filter(function (x) { return x.id === "m30"; })[0];
if (!m) return;

m.lektioner.push(

  // ------------------------------------------------------------------
  { id: "m30l9", nr: 10, titel: "Kundelisten: søgning og formular", min: 25,
    ord: [
      ["@bind", "Binder et felt i `@code` til et input-felt begge veje: skriver brugeren, ændres feltet, og ændres feltet, ændres input-feltet."],
      ["@bind:event", "Bestemmer, hvornår `@bind` opdaterer. `oninput` betyder ved hvert tastetryk."],
      ["EditForm", "Blazors formular. Den kender modellen og kan validere den."],
      ["DataAnnotationsValidator", "Får `EditForm` til at bruge attributterne på modellen, fx `[Required]`."],
      ["InputText", "Et tekstfelt i en `EditForm`, bundet med `@bind-Value`."],
      ["ValidationMessage", "Viser fejlbeskeden for ét felt."],
      ["OnValidSubmit", "Den metode, der kører, når formularen sendes, og alle regler er overholdt."]
    ],
    trin: [
      { t: "valg", h: "Husker du fra sidst?",
        q: "Overblikket viser `@skade.Kunde?.Navn`. Hvad står der på siden, hvis `Kunde` er `null`?",
        svar: ["Ingenting. `?.` giver `null` i stedet for at gå ned, og `null` skrives som ingenting", "Ordet null", "Siden går ned med en NullReferenceException", "Navnet på den første kunde"],
        ret: 0, fordi: "Uden spørgsmålstegnet ville `skade.Kunde.Navn` gå ned, når `Kunde` er `null`. Med `?.` stopper udtrykket bare og giver `null`." },
      { t: "valg", h: "Husker du fra sidst?",
        q: "Hvorfor kører `OnInitializedAsync` kun én gang, når du åbner en side i din app?",
        svar: ["Fordi prerendering er slået fra i `App.razor` med `prerender: false`", "Fordi metoden er `async`", "Fordi siden har `@page`", "Fordi databasen er SQLite"],
        ret: 0, fordi: "Med prerendering tegner serveren siden to gange, og så kører `OnInitializedAsync` også to gange. Din app har slået det fra, så data hentes én gang." },
      { t: "laes", h: "@bind: feltet og input-feltet følges ad",
        md: "Søgefeltet på kundelisten skal opdatere listen, mens man skriver. `@bind` forbinder et input-felt med et felt i `@code`. Uden mere opdateres feltet først, når man forlader input-feltet eller trykker Enter. Med `@bind:event=\"oninput\"` sker det ved hvert tastetryk. Hver gang feltet ændres, tegner Blazor siden igen.",
        kode: R`<input class="form-control" @bind="soegeord" @bind:event="oninput" />
<p>Du søger efter: @soegeord</p>

@code {
    private string soegeord = "";
}`,
        sprog: "razor", frag: true,
        noter: [
          ["@bind=\"soegeord\"", "Input-feltet viser `soegeord`, og det, brugeren skriver, kommer i `soegeord`."],
          ["@bind:event=\"oninput\"", "Opdatér ved hvert tastetryk."],
          ["@soegeord", "Afsnittet viser altid den nyeste værdi."]
        ] },
      { t: "valg", q: "Et søgefelt har `@bind=\"soegeord\"`, men ikke `@bind:event=\"oninput\"`. Hvornår bliver `soegeord` opdateret?",
        svar: ["Når man forlader feltet eller trykker Enter", "Ved hvert tastetryk", "Aldrig", "Når siden genindlæses"],
        ret: 0, fordi: "Uden `@bind:event` bruger `@bind` hændelsen `onchange`, der først kommer, når feltet mister fokus eller man trykker Enter. Til en søgning, der skal følge med, bruges `oninput`." },
      { t: "laes", h: "Listen filtreres med LINQ",
        md: "Kundelisten viser ikke `kunder` direkte, men en beregnet property, `Fundne`. Den beholder de kunder, hvis navn, e-mail eller telefon indeholder søgeordet, og sorterer dem efter navn. Fordi den regnes ud, hver gang siden tegnes, følger listen med søgefeltet.",
        kode: R`private IEnumerable<Kunde> Fundne => kunder!
    .Where(k => k.Navn.Contains(soegeord, StringComparison.OrdinalIgnoreCase)
             || k.Email.Contains(soegeord, StringComparison.OrdinalIgnoreCase)
             || k.Telefon.Contains(soegeord))
    .OrderBy(k => k.Navn);`,
        frag: true,
        noter: [
          ["IEnumerable<Kunde>", "\"Noget, man kan gå igennem med foreach\". Det er den type, `Where` og `OrderBy` giver."],
          ["kunder!", "Udråbstegnet lover compileren, at `kunder` ikke er `null` her. Siden tjekker det, før listen vises."],
          ["Any()", "LINQ: svarer `true`, hvis der er mindst ét element. `!Fundne.Any()` betyder: der er ingen."],
          ["Contains(…, StringComparison.OrdinalIgnoreCase)", "Indeholder teksten søgeordet, uanset store og små bogstaver?"],
          ["Tomt søgeord", "Alle tekster indeholder den tomme tekst, så med et tomt søgefelt vises alle kunder."]
        ] },
      { t: "forudsig",
        q: "Samme søgning som på kundelisten, bare på en liste af navne. Hvad skriver programmet?",
        kode: R`List<string> navne = new List<string> { "Mette Jensen", "Peter Bangsmann", "Søren Nielsen", "Peter Parker" };
string soegeord = "SEN";

var fundne = navne
    .Where(n => n.Contains(soegeord, StringComparison.OrdinalIgnoreCase))
    .OrderBy(n => n);

foreach (string n in fundne)
{
    Console.WriteLine(n);
}`,
        output: "Mette Jensen\nSøren Nielsen",
        fordi: "\"Jensen\" og \"Nielsen\" indeholder \"sen\", og store og små bogstaver er ligegyldige. `OrderBy` sætter dem i alfabetisk rækkefølge." },
      { t: "fejl",
        q: "Søgningen skal være ligeglad med store og små bogstaver, så søgeordet `peter` skal finde 2 kunder. Programmet skriver 0. Klik på linjen med fejlen.",
        kode: R`List<string> navne = new List<string> { "Mette Jensen", "Peter Bangsmann", "Søren Nielsen", "Peter Parker" };
string soegeord = "peter";
int antal = navne.Count(n => n.Contains(soegeord));
Console.WriteLine(antal);`,
        linje: 3,
        logisk: true,
        output: "0",
        rettetOutput: "2",
        fordi: "`Contains` skelner mellem store og små bogstaver, så \"peter\" findes ikke i \"Peter Bangsmann\". Med `StringComparison.OrdinalIgnoreCase` som ekstra argument er store og små bogstaver ligegyldige, som på din kundeliste.",
        rettet: R`List<string> navne = new List<string> { "Mette Jensen", "Peter Bangsmann", "Søren Nielsen", "Peter Parker" };
string soegeord = "peter";
int antal = navne.Count(n => n.Contains(soegeord, StringComparison.OrdinalIgnoreCase));
Console.WriteLine(antal);` },
      { t: "laes", h: "EditForm: en formular, der validerer",
        md: "Formularen til nye kunder er en `EditForm`. Den får et `Kunde`-objekt som model. `DataAnnotationsValidator` får den til at bruge reglerne fra lektion 5. Når man klikker på knappen, tjekker formularen reglerne: er de overholdt, kører `OnValidSubmit`. Ellers vises fejlbeskederne, og der bliver ikke gemt noget.\n\nNår kunden er gemt, laver siden et **nyt**, tomt `Kunde`-objekt til formularen: `nyKunde = new Kunde();`. Så bliver felterne tomme. Den gemte kunde har nu fået et id i databasen, og den må ikke blive gemt igen, hvis man klikker en gang til.",
        kode: R`<EditForm Model="nyKunde" OnValidSubmit="OpretKunde">
    <DataAnnotationsValidator />

    <label class="form-label">Navn</label>
    <InputText class="form-control" @bind-Value="nyKunde.Navn" />
    <ValidationMessage For="() => nyKunde.Navn" />

    <button type="submit" class="btn btn-primary">Opret kunde</button>
</EditForm>`,
        sprog: "razor", frag: true,
        noter: [
          ["Model=\"nyKunde\"", "Formularen arbejder på objektet `nyKunde`."],
          ["<DataAnnotationsValidator />", "Får formularen til at tjekke reglerne (attributterne) på modellen."],
          ["<InputText>", "Blazors tekstfelt til en `EditForm`. Det bliver til et almindeligt `<input>` i browseren."],
          ["@bind-Value", "Som `@bind`, men til Blazors egne input-felter."],
          ["<ValidationMessage>", "Viser fejlbeskeden for ét felt, fx \"Skriv kundens navn\"."],
          ["For=\"() => nyKunde.Navn\"", "Hvilket felts fejlbesked der vises her. Det er en lambda uden parameter: de tomme parenteser `()` betyder, at den ikke får noget med."],
          ["type=\"submit\"", "Knappen sender formularen."]
        ] },
      { t: "valg", q: "En bruger klikker **Opret kunde** med et tomt navn. Formularen har `OnValidSubmit=\"OpretKunde\"`. Hvad sker der?",
        svar: ["OpretKunde kører ikke. I stedet vises \"Skriv kundens navn\" under feltet", "OpretKunde kører og gemmer en kunde uden navn", "Appen går ned", "Siden genindlæses"],
        ret: 0, fordi: "`OnValidSubmit` kører kun, når alle regler er overholdt. `[Required]` på `Navn` er ikke overholdt, så beskeden fra `ErrorMessage` vises." },
      { t: "valg", q: "Efter at en kunde er gemt, står der `nyKunde = new Kunde();` i `OpretKunde`. Hvorfor?",
        svar: ["Så formularen bliver tom og arbejder på et nyt objekt. Den gamle kunde har fået et id i databasen og må ikke gemmes igen", "Fordi new sletter den gamle kunde fra databasen", "For at validere kunden igen", "Det er ikke nødvendigt; det er bare pænt"],
        ret: 0, fordi: "Formularen viser `nyKunde`. Et nyt objekt giver tomme felter. Brugte man det gamle objekt igen, ville man prøve at gemme en kunde, der allerede har et id, og så melder databasen fejl." },
      { t: "opgave", h: "Kundelisten, del 1: tabellen", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "razor",
        md: "Lav siden `Components/Pages/Kunder.razor` ({{højreklik på `Pages` → **Add → Razor Component…**||højreklik på `Pages` → **Add → File**}}), og skriv den selv. Den ligner overbliksiden: hent data i `OnInitializedAsync`, vis \"Henter …\", mens listen er `null`, og vis så en tabel.",
        krav: [
          "Siden har adressen `/kunder` og får en `IKundeService` med `@inject`",
          "Feltet `List<Kunde>? kunder` fyldes i `OnInitializedAsync` med `HentAlleAsync()`",
          "Mens `kunder` er `null`, står der `Henter kunder …`",
          "En tabel med kolonnerne Navn, E-mail, Telefon, Skader, Åbne og Udbetalt, én række pr. kunde, sorteret efter navn",
          "Navnet er et link til `kunder/@kunde.Id`, Skader er `Skader.Count`, Åbne er `AabneSkader`, og Udbetalt er `Udbetalt` skrevet som kroner",
          "Klik på **Kunder** i menuen: fire kunder i alfabetisk rækkefølge, med Mette Jensen øverst"
        ],
        tip: [
          "Kopiér opbygningen fra `Home.razor`: `@page`, `@inject`, `@if (… == null) { … } else { … }` og `@code` med felt og `OnInitializedAsync`.",
          "Sortering i `foreach`: `@foreach (var kunde in kunder.OrderBy(k => k.Navn))`.",
          "Et link med id'et i adressen: `<a href=\"kunder/@kunde.Id\">@kunde.Navn</a>`. Linket fører til kundesiden, som du laver i næste lektion.",
          "Siger compileren, at `Kunde` eller `IKundeService` ikke findes, så mangler `@using SkadeApp.Models` eller `@using SkadeApp.Services` nederst i `Components/_Imports.razor`."
        ],
        output: "Kundelisten viser fire kunder: Mette Jensen, Peter Bangsmann, Peter Parker og Søren Nielsen, hver med antal skader, åbne skader og udbetalt beløb.",
        loesning: R`@page "/kunder"
@inject IKundeService KundeService

<PageTitle>Kunder</PageTitle>

<h1>Kunder</h1>

@if (kunder == null)
{
    <p>Henter kunder …</p>
}
else
{
    <table class="table table-hover">
        <thead>
            <tr><th>Navn</th><th>E-mail</th><th>Telefon</th><th>Skader</th><th>Åbne</th><th class="text-end">Udbetalt</th></tr>
        </thead>
        <tbody>
            @foreach (var kunde in kunder.OrderBy(k => k.Navn))
            {
                <tr>
                    <td><a href="kunder/@kunde.Id">@kunde.Navn</a></td>
                    <td>@kunde.Email</td>
                    <td>@kunde.Telefon</td>
                    <td>@kunde.Skader.Count</td>
                    <td>@kunde.AabneSkader</td>
                    <td class="text-end">@kunde.Udbetalt.ToString("C")</td>
                </tr>
            }
        </tbody>
    </table>
}

@code {
    private List<Kunde>? kunder;

    protected override async Task OnInitializedAsync()
    {
        kunder = await KundeService.HentAlleAsync();
    }
}` },
      { t: "opgave", h: "Kundelisten, del 2: søgefeltet", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "razor",
        md: "Nu skal man kunne søge. Trin 3 viser `@bind` med `oninput`, og trin 5 viser propertyen `Fundne`, der filtrerer med LINQ. Byg dem ind i din side.",
        krav: [
          "Feltet `string soegeord` med startværdien `\"\"`",
          "Over tabellen står et input-felt med pladsholderteksten `Søg på navn, e-mail eller telefon …`, bundet til `soegeord` ved hvert tastetryk",
          "Propertyen `Fundne` beholder de kunder, hvis navn, e-mail eller telefon indeholder søgeordet (store og små bogstaver er ligegyldige), sorteret efter navn",
          "Tabellen går igennem `Fundne` i stedet for `kunder`",
          "Passer ingen kunder, står der `Ingen kunder passer til søgningen.` under tabellen",
          "Søg på `søren`: kun Søren Nielsen er tilbage. Søg på `zzz`: beskeden vises"
        ],
        tip: [
          "Input-feltet: `<input class=\"form-control mb-3\" placeholder=\"…\" @bind=\"soegeord\" @bind:event=\"oninput\" />`",
          "`Fundne` står i trin 5. Den hører til i `@code`, sammen med felterne.",
          "Beskeden: `@if (!Fundne.Any()) { <p class=\"text-muted\">Ingen kunder passer til søgningen.</p> }`. `!` betyder \"ikke\"."
        ],
        output: "Mens du skriver i søgefeltet, bliver listen kortere. Med søgeordet zzz står der: Ingen kunder passer til søgningen.",
        loesning: R`@* Over tabellen (lige under <h1>): *@
<input class="form-control mb-3" placeholder="Søg på navn, e-mail eller telefon …"
       @bind="soegeord" @bind:event="oninput" />

@* I tabellen: gå igennem Fundne i stedet for kunder *@
@foreach (var kunde in Fundne)

@* Under tabellen, stadig inde i else: *@
@if (!Fundne.Any())
{
    <p class="text-muted">Ingen kunder passer til søgningen.</p>
}

@* I @code: *@
private string soegeord = "";

// LINQ: behold de kunder, der passer til søgeordet, og sortér dem efter navn.
private IEnumerable<Kunde> Fundne => kunder!
    .Where(k => k.Navn.Contains(soegeord, StringComparison.OrdinalIgnoreCase)
             || k.Email.Contains(soegeord, StringComparison.OrdinalIgnoreCase)
             || k.Telefon.Contains(soegeord))
    .OrderBy(k => k.Navn);` },
      { t: "opgave", h: "Kundelisten, del 3: formularen Ny kunde", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "razor",
        md: "Til sidst formularen. Trin 8 viser en `EditForm` med feltet Navn. Du laver de to andre felter på samme måde og metoden, der gemmer.\n\nListen og formularen skal stå ved siden af hinanden. Det gør Bootstrap med en række (`<div class=\"row\">`) med to kolonner: `<div class=\"col-lg-8\">` til søgefelt og tabel og `<div class=\"col-lg-4\">` til formularen.",
        krav: [
          "Søgefelt og tabel står i en `col-lg-8`, formularen i en `col-lg-4`, begge inde i en `row`",
          "Overskriften `Ny kunde` og en `EditForm` med `Model=\"nyKunde\"`, `OnValidSubmit=\"OpretKunde\"` og en `DataAnnotationsValidator`",
          "Tre felter (`InputText`) til Navn, E-mail og Telefon, hver med en `label` og en `ValidationMessage`, og knappen **Opret kunde**",
          "`OpretKunde` gemmer kunden med `OpretAsync`, sætter `besked` til `\"… er oprettet.\"` med kundens navn, laver et nyt tomt `Kunde`-objekt og henter listen igen",
          "Er `besked` ikke `null`, vises den i en grøn boks (`alert alert-success`) under formularen",
          "Klik **Opret kunde** med tomme felter: tre røde beskeder. Opret en rigtig kunde: den kommer i listen"
        ],
        tip: [
          "Kopiér hele `<div class=\"mb-2\">`-blokken med Navn fra trin 8 to gange, og ret `nyKunde.Navn` til `nyKunde.Email` og `nyKunde.Telefon` (begge steder i blokken).",
          "Felterne i `@code`: `private Kunde nyKunde = new();` og `private string? besked;`",
          "`OpretKunde`: `await KundeService.OpretAsync(nyKunde);`, så `besked = $\"{nyKunde.Navn} er oprettet.\";`, så `nyKunde = new Kunde();` og til sidst `kunder = await KundeService.HentAlleAsync();`"
        ],
        output: "Formularen står til højre for listen. En tom formular giver tre røde fejlbeskeder. En rigtig kunde bliver gemt, står i listen, og der står en grøn besked.",
        loesning: R`@page "/kunder"
@inject IKundeService KundeService

<PageTitle>Kunder</PageTitle>

<h1>Kunder</h1>

<div class="row">
    <div class="col-lg-8">
        @* @bind:event="oninput" opdaterer soegeord ved hvert tastetryk, så listen filtreres, mens man skriver. *@
        <input class="form-control mb-3" placeholder="Søg på navn, e-mail eller telefon …"
               @bind="soegeord" @bind:event="oninput" />

        @if (kunder == null)
        {
            <p>Henter kunder …</p>
        }
        else
        {
            <table class="table table-hover">
                <thead>
                    <tr><th>Navn</th><th>E-mail</th><th>Telefon</th><th>Skader</th><th>Åbne</th><th class="text-end">Udbetalt</th></tr>
                </thead>
                <tbody>
                    @foreach (var kunde in Fundne)
                    {
                        <tr>
                            <td><a href="kunder/@kunde.Id">@kunde.Navn</a></td>
                            <td>@kunde.Email</td>
                            <td>@kunde.Telefon</td>
                            <td>@kunde.Skader.Count</td>
                            <td>@kunde.AabneSkader</td>
                            <td class="text-end">@kunde.Udbetalt.ToString("C")</td>
                        </tr>
                    }
                </tbody>
            </table>

            @if (!Fundne.Any())
            {
                <p class="text-muted">Ingen kunder passer til søgningen.</p>
            }
        }
    </div>

    <div class="col-lg-4">
        <h2 class="h4">Ny kunde</h2>

        @* EditForm kører OpretKunde, når alle regler i Kunde-klassen er opfyldt (Required, EmailAddress, RegularExpression). *@
        <EditForm Model="nyKunde" OnValidSubmit="OpretKunde">
            <DataAnnotationsValidator />

            <div class="mb-2">
                <label class="form-label">Navn</label>
                <InputText class="form-control" @bind-Value="nyKunde.Navn" />
                <ValidationMessage For="() => nyKunde.Navn" />
            </div>
            <div class="mb-2">
                <label class="form-label">E-mail</label>
                <InputText class="form-control" @bind-Value="nyKunde.Email" />
                <ValidationMessage For="() => nyKunde.Email" />
            </div>
            <div class="mb-3">
                <label class="form-label">Telefon</label>
                <InputText class="form-control" @bind-Value="nyKunde.Telefon" />
                <ValidationMessage For="() => nyKunde.Telefon" />
            </div>

            <button type="submit" class="btn btn-primary">Opret kunde</button>
        </EditForm>

        @if (besked != null)
        {
            <div class="alert alert-success mt-3">@besked</div>
        }
    </div>
</div>

@code {
    private List<Kunde>? kunder;
    private string soegeord = "";
    private Kunde nyKunde = new();
    private string? besked;

    // LINQ: behold de kunder, der passer til søgeordet, og sortér dem efter navn.
    private IEnumerable<Kunde> Fundne => kunder!
        .Where(k => k.Navn.Contains(soegeord, StringComparison.OrdinalIgnoreCase)
                 || k.Email.Contains(soegeord, StringComparison.OrdinalIgnoreCase)
                 || k.Telefon.Contains(soegeord))
        .OrderBy(k => k.Navn);

    protected override async Task OnInitializedAsync()
    {
        kunder = await KundeService.HentAlleAsync();
    }

    private async Task OpretKunde()
    {
        await KundeService.OpretAsync(nyKunde);
        besked = $"{nyKunde.Navn} er oprettet.";
        nyKunde = new Kunde();                      // tøm formularen
        kunder = await KundeService.HentAlleAsync(); // hent listen igen med den nye kunde
    }
}`,
        md2: "`$\"{nyKunde.Navn} er oprettet.\"` sætter navnet ind i teksten: det, der står i `{ }`, bliver sat ind, hvor det står." },
      { t: "forklar", q: "Censor: \"Hvad gør `@bind` på dit søgefelt, og hvorfor har det også `@bind:event`?\"",
        svar: "@bind forbinder input-feltet med feltet soegeord i @code begge veje: det, brugeren skriver, kommer i soegeord, og ændres soegeord, ændres feltet. Uden mere opdateres soegeord først, når man forlader feltet eller trykker Enter. Med @bind:event=\"oninput\" sker det ved hvert tastetryk. Hver gang soegeord ændres, tegner Blazor siden igen, og den beregnede property Fundne filtrerer listen med det nye søgeord.",
        noegle: ["begge veje", "soegeord", "hvert tastetryk", "tegner siden igen", "Fundne"] },
      { t: "forklar", h: "Til eksamen", q: "Eksamensspørgsmål: Hvordan virker valideringen i din formular, fra attributten til den røde tekst? Sig svaret højt, og peg på `<DataAnnotationsValidator />` i `Components/Pages/Kunder.razor`.",
        svar: "Reglerne står som attributter på modellen, fx [Required] og [RegularExpression] på Kunde. Formularen er en EditForm med Model=\"nyKunde\" og en DataAnnotationsValidator, som læser attributterne. Når man klikker på knappen, tjekker den alle regler. Er en regel brudt, viser ValidationMessage beskeden fra ErrorMessage under feltet, og OnValidSubmit kører ikke. Først når alt er i orden, kaldes OpretKunde, som gemmer gennem servicen.",
        noegle: ["attributter", "EditForm", "DataAnnotationsValidator", "ValidationMessage", "OnValidSubmit"] }
  ] },

  // ------------------------------------------------------------------
  { id: "m30l10", nr: 11, titel: "Kundesiden, del 1: ruteparameter og kundens skader", min: 25,
    ord: [
      ["Ruteparameter", "En del af adressen, som siden får som værdi: i `/kunder/3` er 3 parameteren."],
      ["{Id:int}", "I `@page \"/kunder/{Id:int}\"`: her står et tal, som kommer i propertyen `Id`. `:int` betyder, at kun tal passer."],
      ["OnParametersSetAsync", "Kører, hver gang siden får nye parametre, også når man går direkte fra én kunde til en anden."],
      ["@onclick", "Kører en metode, når der klikkes: `@onclick=\"StartRet\"` eller med en lambda: `@onclick=\"() => SletSkade(skade.Id)\"`."]
    ],
    trin: [
      { t: "valg", h: "Husker du fra sidst?",
        q: "På din kundeliste skriver en bruger telefonnummeret `1234567` (7 cifre) og klikker **Opret kunde**. Hvad sker der?",
        svar: ["`OpretKunde` kører ikke. Under feltet står \"Telefonnummeret skal være 8 cifre.\"", "Kunden bliver gemt med 7 cifre", "Appen går ned", "Feltet bliver tømt uden besked"],
        ret: 0, fordi: "`EditForm` med `DataAnnotationsValidator` tjekker attributterne på `Kunde`. Det regulære udtryk kræver præcis 8 cifre, så `OnValidSubmit` kører ikke, og `ValidationMessage` viser beskeden." },
      { t: "valg", h: "Husker du fra sidst?",
        q: "Din app kører med dansk `CultureInfo`. Hvad viser `@skade.Beloeb.ToString(\"C\")` for en skade på 4500?",
        svar: ["4.500,00 kr.", "4500", "$4,500.00", "4,500.00 DKK"],
        ret: 0, fordi: "`\"C\"` skriver tallet som et beløb i landets valuta. Med `da-DK` er det punktum ved tusinder, komma før øre og `kr.` til sidst." },
      { t: "laes", h: "Én side til alle kunder",
        md: "Der er kun én kundeside, men den kan vise alle kunder. Hvilken kunde det er, står i adressen: `/kunder/3` er kunden med id 3. I `@page` står `{Id:int}`, og tallet kommer i propertyen `Id`, der er markeret med `[Parameter]`.",
        kode: R`@page "/kunder/{Id:int}"
@inject IKundeService KundeService

<h1>@kunde?.Navn</h1>

@code {
    [Parameter] public int Id { get; set; }

    private Kunde? kunde;

    protected override async Task OnParametersSetAsync()
    {
        kunde = await KundeService.HentAsync(Id);
    }
}`,
        sprog: "razor", frag: true,
        noter: [
          ["{Id:int}", "Her står et tal. Navnet skal være det samme som propertyen `Id`."],
          ["[Parameter] public int Id", "Får tallet fra adressen."],
          ["OnParametersSetAsync", "Kører, hver gang `Id` får en værdi. `OnInitializedAsync` ville kun køre første gang."],
          ["@kunde?.Navn", "Er `kunde` endnu ikke hentet (`null`), skrives ingenting."]
        ],
        md2: "Linkene på kundelisten fører hertil: `<a href=\"kunder/@kunde.Id\">`." },
      { t: "valg", q: "Kundesiden har `@page \"/kunder/{Id:int}\"`. Hvad sker der, hvis man skriver adressen `/kunder/abc`?",
        svar: ["Ingen side passer, fordi abc ikke er et tal, så man ser siden om, at adressen ikke findes", "Siden viser kunden med navnet abc", "Id bliver 0", "Appen går ned"],
        ret: 0, fordi: "`:int` betyder, at kun tal passer til ruten. `abc` passer ikke, så Blazor finder ingen side." },
      { t: "laes", h: "Knapper, der styrer, hvad der vises",
        md: "Kundesiden har flere tilstande: viser kunden, retter kunden, eller spørger, om kunden skal slettes. Hver tilstand er en `bool` i `@code`. En knap ændrer den, og `@if` viser det, der passer. Så kan man altid se på skærmen, hvilken tilstand siden er i.",
        kode: R`@if (bekraeftSlet)
{
    <span>Slet @kunde.Navn og alle kundens skader?</span>
    <button class="btn btn-danger btn-sm" @onclick="SletKunde">Ja, slet</button>
    <button class="btn btn-secondary btn-sm" @onclick="() => bekraeftSlet = false">Nej</button>
}
else
{
    <button class="btn btn-outline-danger btn-sm" @onclick="() => bekraeftSlet = true">Slet kunde</button>
}`,
        sprog: "razor", frag: true,
        noter: [
          ["@onclick=\"SletKunde\"", "Kører metoden `SletKunde`, når der klikkes."],
          ["@onclick=\"() => bekraeftSlet = true\"", "En lambda: en lille metode skrevet direkte i knappen. Den sætter feltet til `true`."],
          ["Efter et klik", "Blazor tegner siden igen, og nu viser `@if` den anden del."]
        ] },
      { t: "valg", q: "Ud for hver skade står `<button @onclick=\"() => SletSkade(skade.Id)\">Slet</button>`. Hvorfor står der `() =>` foran?",
        svar: ["Fordi metoden skal have skadens id med. Lambdaen er en lille metode, der kalder SletSkade med netop den skades id", "Fordi alle knapper skal have () =>", "For at slette alle skader på én gang", "Fordi SletSkade er async"],
        ret: 0, fordi: "`@onclick=\"SletSkade\"` ville ikke kunne give et id med. Lambdaen `() => SletSkade(skade.Id)` husker id'et for netop den række." },
      { t: "opgave", h: "Kundesiden, del 1: vis kunden", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "razor",
        md: "Kundesiden er den største side, så du bygger den i fem dele: del 1 og 2 her og del 3–5 i lektion 11b. Lav `Components/Pages/KundeDetaljer.razor`.\n\nFørst skal siden finde kunden ud fra adressen (trin 3) og vise navn, e-mail og telefon. Én ny ting: `@(betingelse ? \"tekst 1\" : \"tekst 2\")` vælger mellem to tekster. Er betingelsen sand, bruges teksten før kolonet, ellers teksten efter.",
        krav: [
          "Adressen er `/kunder/{Id:int}`, og siden får en `IKundeService`",
          "`[Parameter] public int Id` får tallet fra adressen. Felterne `Kunde? kunde` og `bool indlaest`",
          "En metode `HentKunde()` henter kunden med `HentAsync(Id)` og sætter `indlaest = true`. `OnParametersSetAsync` kalder den",
          "Er `kunde` `null`, står der `Kunden findes ikke.`, hvis `indlaest` er sand, og ellers `Henter kunden …`, og et link `← Alle kunder` til `kunder`",
          "Ellers vises linket `← Alle kunder`, kundens navn som `<h1>` og e-mail og telefon i ét afsnit",
          "Klik på Mette Jensen i kundelisten: hendes navn, e-mail og telefon står på siden. `/kunder/999` giver \"Kunden findes ikke.\""
        ],
        tip: [
          "Opbygningen står i trin 3. Brug `OnParametersSetAsync`, ikke `OnInitializedAsync`, så siden også virker, når man går direkte fra én kunde til en anden.",
          "`HentKunde` er en `private async Task`-metode med to linjer: `kunde = await KundeService.HentAsync(Id);` og `indlaest = true;`",
          "Teksten, når kunden mangler: `<p>@(indlaest ? \"Kunden findes ikke.\" : \"Henter kunden …\")</p>`"
        ],
        output: "Mette Jensens side viser hendes navn som overskrift og Mette@eksempel.com · 12345678. Adressen /kunder/999 giver: Kunden findes ikke.",
        loesning: R`@page "/kunder/{Id:int}"
@inject IKundeService KundeService

@if (kunde == null)
{
    <PageTitle>Kunde</PageTitle>
    <p>@(indlaest ? "Kunden findes ikke." : "Henter kunden …")</p>
    <a href="kunder">← Alle kunder</a>
}
else
{
    <PageTitle>@kunde.Navn</PageTitle>

    <p><a href="kunder">← Alle kunder</a></p>
    <h1>@kunde.Navn</h1>
    <p>@kunde.Email · @kunde.Telefon</p>
}

@code {
    // Tallet fra adressen, fx 3 i /kunder/3.
    [Parameter] public int Id { get; set; }

    private Kunde? kunde;
    private bool indlaest;

    // Kører, hver gang Id sættes, også hvis man går direkte fra én kunde til en anden.
    protected override async Task OnParametersSetAsync()
    {
        await HentKunde();
    }

    private async Task HentKunde()
    {
        kunde = await KundeService.HentAsync(Id);
        indlaest = true;
    }
}` },
      { t: "opgave", h: "Kundesiden, del 2: kundens skader", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "razor",
        md: "Nu skal kundens skader stå på siden i en tabel, og hver skade skal kunne slettes. Slet-knappen skal have skadens id med. Det gør lambdaen i trin 6.",
        krav: [
          "Siden får også en `ISkadeService` med `@inject`",
          "Overskriften `Skader (2)` med det rigtige antal, og teksten `Kunden har ingen skader.`, hvis kunden ingen har",
          "Ellers en tabel med Dato, Type, Beskrivelse, Beløb og Status (med `StatusMaerke`), nyeste skade øverst",
          "Hver række har en knap **Slet**, der kalder `SletSkade` med skadens id. `SletSkade` sletter med `SkadeService.SletAsync` og henter kunden igen",
          "Under tabellen: `Udbetalt i alt til kunden:` og kundens `Udbetalt` som kroner",
          "Mette Jensen har to skader, og der står Udbetalt i alt til kunden: 4.500,00 kr."
        ],
        tip: [
          "Tabellen ligner \"Seneste skader\" på overblikket, bare med `kunde.Skader.OrderByDescending(s => s.Dato)` og uden kundenavn.",
          "Knappen: `<button class=\"btn btn-outline-danger btn-sm\" @onclick=\"() => SletSkade(skade.Id)\">Slet</button>`",
          "Efter en sletning skal siden vise den nye liste. Derfor kalder `SletSkade` `await HentKunde();` til sidst."
        ],
        output: "Mette Jensens side viser Skader (2), en tabel med vandskaden øverst og ridsen nedenunder, og Udbetalt i alt til kunden: 4.500,00 kr.",
        loesning: R`@* Øverst, under den første @inject: *@
@inject ISkadeService SkadeService

@* I else-delen, under kundens e-mail og telefon: *@
<h2 class="h4 mt-4">Skader (@kunde.Skader.Count)</h2>

@if (kunde.Skader.Count == 0)
{
    <p class="text-muted">Kunden har ingen skader.</p>
}
else
{
    <table class="table">
        <thead>
            <tr><th>Dato</th><th>Type</th><th>Beskrivelse</th><th class="text-end">Beløb</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
            @foreach (var skade in kunde.Skader.OrderByDescending(s => s.Dato))
            {
                <tr>
                    <td class="text-nowrap">@skade.Dato.ToString("dd-MM-yyyy")</td>
                    <td>@skade.Type</td>
                    <td>@skade.Beskrivelse</td>
                    <td class="text-end text-nowrap">@skade.Beloeb.ToString("C")</td>
                    <td><StatusMaerke Status="skade.Status" /></td>
                    <td><button class="btn btn-outline-danger btn-sm" @onclick="() => SletSkade(skade.Id)">Slet</button></td>
                </tr>
            }
        </tbody>
    </table>
    <p>Udbetalt i alt til kunden: <b>@kunde.Udbetalt.ToString("C")</b></p>
}

@* I @code: *@
private async Task SletSkade(int skadeId)
{
    await SkadeService.SletAsync(skadeId);
    await HentKunde();
}` },
      { t: "forklar", h: "Til eksamen", q: "Censor: \"Hvordan ved kundesiden, hvilken kunde den skal vise?\" Sig svaret højt, og peg på `@page` og `[Parameter]` i `Components/Pages/KundeDetaljer.razor`.",
        svar: "Siden har @page \"/kunder/{Id:int}\". Tallet i adressen, fx 2 i /kunder/2, kommer i propertyen Id, der er markeret med [Parameter]. :int betyder, at kun tal passer. I OnParametersSetAsync henter siden kunden med KundeService.HentAsync(Id). Jeg bruger OnParametersSetAsync og ikke OnInitializedAsync, fordi den også kører, når man går direkte fra én kunde til en anden. Findes kunden ikke, står der \"Kunden findes ikke.\"",
        noegle: ["@page", "{Id:int}", "[Parameter]", "OnParametersSetAsync", "HentAsync"] }
  ] },

  // ------------------------------------------------------------------
  { id: "m30l10b", nr: "11b", titel: "Kundesiden, del 2: ret, slet og skift status", min: 30,
    ord: [
      ["NavigationManager", "En service, der kan sende brugeren til en anden side: `Navigation.NavigateTo(\"kunder\")`."],
      ["Cascade delete", "Når en række slettes, slettes de rækker, der peger på den, også. Slettes en kunde, forsvinder kundens skader."],
      ["ChangeEventArgs", "Oplysningerne om en ændring i et felt. `e.Value` er den nye værdi."],
      ["Enum.Parse", "Laver en tekst om til en enum-værdi: `Enum.Parse<SkadeStatus>(\"Godkendt\")`."]
    ],
    trin: [
      { t: "valg", h: "Husker du fra sidst?",
        q: "Hvorfor henter kundesiden kunden i `OnParametersSetAsync` og ikke i `OnInitializedAsync`?",
        svar: ["Fordi `OnParametersSetAsync` kører, hver gang `Id` ændres, også når man går direkte fra én kunde til en anden", "Fordi `OnInitializedAsync` ikke kan bruge `await`", "Fordi `OnParametersSetAsync` er hurtigere til databasen", "Det er ligegyldigt, de gør det samme"],
        ret: 0, fordi: "Blazor genbruger siden, når kun tallet i adressen skifter. `OnInitializedAsync` ville kun køre første gang, så siden ville blive ved med at vise den gamle kunde." },
      { t: "forudsig", h: "Husker du fra sidst?",
        q: "Repetition: to variabler og ét objekt. Svar, før du kigger tilbage. Hvad skriver programmet?",
        kode: R`Kunde a = new Kunde { Navn = "Søren Nielsen" };
Kunde b = a;
b.Navn = "Søren N.";
Console.WriteLine(a.Navn);

class Kunde
{
    public string Navn { get; set; } = "";
}`,
        output: "Søren N.",
        fordi: "`Kunde b = a;` laver ikke en ny kunde. `a` og `b` henviser til det samme objekt, så at ændre `b.Navn` ændrer også det, `a` viser. Det er derfor, kundesiden laver en kopi med `new`." },
      { t: "laes", h: "Ret i en kopi",
        md: "Når man klikker **Ret kunde**, laver siden en **kopi** af kunden med `new` og lader formularen rette i kopien. Klikker man **Annullér**, smides kopien væk, og den viste kunde er uændret. Klikker man **Gem**, sendes kopien til `OpdaterAsync`, som skriver de nye værdier i databasen.\n\nUden kopien ville formularen rette direkte i det objekt, siden viser. Så ville navnet ændre sig på skærmen, mens man skriver, også hvis man trykker Annullér. Det er det samme som i lektion 2: `Kunde b = a;` er ikke en kopi.",
        kode: R`private void StartRet()
{
    // Ret i en kopi, så "Annullér" ikke ændrer den kunde, der vises.
    rettet = new Kunde { Id = kunde!.Id, Navn = kunde.Navn, Email = kunde.Email, Telefon = kunde.Telefon };
    retter = true;
}`,
        frag: true },
      { t: "forudsig",
        q: "Det samme som kundesiden gør: en kopi, der rettes, og en annullering. Hvad skriver programmet?",
        kode: R`Kunde kunde = new Kunde { Id = 1, Navn = "Mette Jensen" };
Kunde rettet = new Kunde { Id = kunde.Id, Navn = kunde.Navn };
rettet.Navn = "Mette Hansen";

// Brugeren klikker Annullér: rettet bruges ikke.
Console.WriteLine(kunde.Navn);
Console.WriteLine(rettet.Navn);

class Kunde
{
    public int Id { get; set; }
    public string Navn { get; set; } = "";
}`,
        output: "Mette Jensen\nMette Hansen",
        fordi: "`rettet` er et nyt objekt (der står `new`), så at rette i det ændrer ikke `kunde`." },
      { t: "spor", h: "Følg kopien",
        q: "Det samme, som sker på kundesiden: en kopi, der bliver rettet, og så Gem. Linje 4 gør det, som `OpdaterAsync` gør med den gemte kunde. Skriv `kunde.Navn` og `rettet.Navn`, lige efter at linjen er udført. Skemaet har linje 1–4.",
        kode: R`Kunde kunde = new Kunde { Id = 1, Navn = "Mette Jensen" };
Kunde rettet = new Kunde { Id = kunde.Id, Navn = kunde.Navn };
rettet.Navn = "Mette Hansen";
kunde.Navn = rettet.Navn;
Console.WriteLine(kunde.Navn);

class Kunde
{
    public int Id { get; set; }
    public string Navn { get; set; } = "";
}`,
        kolonner: ["kunde.Navn", "rettet.Navn"],
        raekker: [[1, "=Mette Jensen", "=–"], [2, "Mette Jensen", "Mette Jensen"], [3, "Mette Jensen", "Mette Hansen"], [4, "Mette Hansen", "Mette Hansen"]],
        slut: false,
        output: "Mette Hansen",
        fordi: "Indtil linje 4 er `kunde` uændret, fordi `rettet` er et nyt objekt. Havde brugeren klikket Annullér, var linje 4 aldrig kørt, og `kunde` ville stadig hedde Mette Jensen. Først Gem flytter navnet over." },
      { t: "laes", h: "Slet og send brugeren videre",
        md: "Når kunden er slettet, findes siden ikke længere. Derfor sender `SletKunde` brugeren tilbage til kundelisten med `NavigationManager`, som siden får med `@inject NavigationManager Navigation`.\n\nKundens skader slettes automatisk med. EF Core har lavet fremmednøglen med **cascade delete**, fordi `KundeId` er en `int` og ikke må være tom: en skade kan ikke stå uden kunde.",
        kode: R`private async Task SletKunde()
{
    await KundeService.SletAsync(Id);
    Navigation.NavigateTo("kunder");
}`,
        frag: true },
      { t: "valg", q: "Peter Bangsmann har to skader. En sagsbehandler sletter Peter Bangsmann på kundesiden. Hvad sker der med de to skader?",
        svar: ["De slettes også (cascade delete), fordi en skade ikke kan stå uden kunde", "De bliver liggende uden kunde", "Sletningen afvises, fordi han har skader", "De flyttes til en anden kunde"],
        ret: 0, fordi: "Fremmednøglen `KundeId` er påkrævet, så EF Core har sat den op med cascade delete. Derfor spørger siden også: \"Slet Peter Bangsmann og alle kundens skader?\"" },
      { t: "laes", h: "Skift status, og anmeld en skade",
        md: "Status skiftes med en rulleliste ud for hver skade. Når man vælger noget, kører det, der står i `@onchange`, og der kommer en `ChangeEventArgs` med. `e.Value` er teksten fra det valgte, fx `\"Godkendt\"`, og `Enum.Parse` laver den om til en `SkadeStatus`.\n\nFormularen **Anmeld ny skade** er en `EditForm` ligesom på kundelisten, men med andre felter: `InputDate` til datoen, `InputSelect` til typen, `InputTextArea` til beskrivelsen og `InputNumber` til beløbet. Før skaden gemmes, får den kundens id: `nySkade.KundeId = Id;`.",
        kode: R`private async Task SkiftStatus(int skadeId, ChangeEventArgs e)
{
    var status = Enum.Parse<SkadeStatus>(e.Value!.ToString()!);
    await SkadeService.SkiftStatusAsync(skadeId, status);
    await HentKunde();
}`,
        frag: true,
        noter: [
          ["e.Value!.ToString()!", "Værdien som tekst. Udråbstegnene lover, at den ikke er `null`."],
          ["HentKunde()", "Henter kunden igen, så siden viser den nye status og det nye udbetalte beløb."]
        ] },
      { t: "forudsig",
        kode: R`string valgt = "Godkendt";
SkadeStatus status = Enum.Parse<SkadeStatus>(valgt);
Console.WriteLine(status == SkadeStatus.Godkendt);
Console.WriteLine(status);

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`,
        output: "True\nGodkendt",
        fordi: "`Enum.Parse` finder den værdi i enum'en, der hedder det samme som teksten." },
      { t: "fejl",
        kode: R`string valgt = "Godkendt";
SkadeStatus status = Enum.Parse<SkadeType>(valgt);
Console.WriteLine(status);

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }
enum SkadeType { Bil, Indbo, Rejse, Ulykke }`,
        linje: 2,
        output: "Godkendt",
        fordi: "`Enum.Parse<SkadeType>` laver teksten om til en `SkadeType`, men variablen er en `SkadeStatus`. Compileren siger, at den ikke kan lave en `SkadeType` om til en `SkadeStatus`. I vinkelparenteserne skal stå den enum, teksten skal blive til: `Enum.Parse<SkadeStatus>(valgt)`.",
        rettet: R`string valgt = "Godkendt";
SkadeStatus status = Enum.Parse<SkadeStatus>(valgt);
Console.WriteLine(status);

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }
enum SkadeType { Bil, Indbo, Rejse, Ulykke }` },
      { t: "opgave", h: "Kundesiden, del 3: skift status", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "razor",
        md: "Status skal kunne skiftes direkte i tabellen. I stedet for `StatusMaerke` kommer en rulleliste med de fire statusser. Når man vælger, kører `SkiftStatus` fra trin 8.\n\n`Enum.GetValues<SkadeStatus>()` giver alle fire statusser, så du kan lave én `<option>` pr. status med en `foreach`.",
        krav: [
          "I status-kolonnen står en `<select>` med `value=\"@skade.Status\"`, så den viser skadens status",
          "Rullelisten har én `<option>` for hver værdi i `Enum.GetValues<SkadeStatus>()`",
          "`@onchange` kalder `SkiftStatus` med skadens id og hændelsen: `e => SkiftStatus(skade.Id, e)`",
          "`SkiftStatus` laver teksten om med `Enum.Parse<SkadeStatus>`, gemmer med `SkiftStatusAsync` og henter kunden igen",
          "Sæt Mettes vandskade til **Godkendt**: Udbetalt i alt skifter til 23.250,00 kr. Sæt den tilbage til **Behandles**"
        ],
        tip: [
          "En rulleliste: `<select class=\"form-select form-select-sm\" …> … </select>` med `<option value=\"@status\">@status</option>` indeni.",
          "`SkiftStatus` står i trin 8. Kopiér den ind i `@code`.",
          "`@onchange=\"e => SkiftStatus(skade.Id, e)\"`: `e` er hændelsen med det valgte. Lambdaen giver den videre sammen med skadens id."
        ],
        output: "Status-kolonnen har en rulleliste. Vælger du Godkendt for vandskaden, bliver Udbetalt i alt til kunden 23.250,00 kr.",
        loesning: R`@* I tabellen: erstat <StatusMaerke Status="skade.Status" /> med rullelisten *@
<select class="form-select form-select-sm" value="@skade.Status"
        @onchange="e => SkiftStatus(skade.Id, e)">
    @foreach (var status in Enum.GetValues<SkadeStatus>())
    {
        <option value="@status">@status</option>
    }
</select>

@* I @code: *@
private async Task SkiftStatus(int skadeId, ChangeEventArgs e)
{
    // e.Value er teksten fra den valgte option, fx "Godkendt". Enum.Parse laver den om til en SkadeStatus.
    var status = Enum.Parse<SkadeStatus>(e.Value!.ToString()!);
    await SkadeService.SkiftStatusAsync(skadeId, status);
    await HentKunde();
}` },
      { t: "opgave", h: "Kundesiden, del 4: anmeld en ny skade", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "razor",
        md: "Nu formularen til en ny skade. Den er en `EditForm` ligesom på kundelisten, men med fire andre slags felter: `InputDate` til datoen, `InputSelect` til typen, `InputTextArea` til beskrivelsen og `InputNumber` til beløbet. Skader og formular skal stå ved siden af hinanden: en `row` med en `col-lg-8` og en `col-lg-4`, som på kundelisten.",
        krav: [
          "Overskriften Skader, tabellen og Udbetalt står i en `col-lg-8`, formularen i en `col-lg-4`",
          "Overskriften `Anmeld ny skade` og en `EditForm` med `Model=\"nySkade\"`, `OnValidSubmit=\"AnmeldSkade\"` og `DataAnnotationsValidator`",
          "Felterne Dato (`InputDate`), Type (`InputSelect` med én `option` pr. `SkadeType`), Beskrivelse (`InputTextArea`) og Beløb (`InputNumber`), med `ValidationMessage` under Beskrivelse og Beløb, og knappen **Anmeld skade**",
          "`AnmeldSkade` sætter `nySkade.KundeId = Id`, gemmer med `OpretAsync`, laver en ny tom `Skade` og henter kunden igen",
          "Anmeld uden beskrivelse: `Beskriv skaden` vises. Anmeld en rigtig skade: den står øverst i tabellen"
        ],
        tip: [
          "Alle fire felter bindes som på kundelisten: `@bind-Value=\"nySkade.Dato\"` osv.",
          "`InputSelect` virker som en `<select>`: `<InputSelect class=\"form-select\" @bind-Value=\"nySkade.Type\">` med en `foreach` over `Enum.GetValues<SkadeType>()` indeni.",
          "Uden `nySkade.KundeId = Id;` ved databasen ikke, hvilken kunde skaden hører til, og så kan den ikke gemmes."
        ],
        output: "Formularen står til højre for skaderne. En ny skade på 12.000 kr. kommer øverst i tabellen.",
        loesning: R`@* I else-delen: skader-delen i venstre kolonne, formularen i højre *@
<div class="row mt-4">
    <div class="col-lg-8">
        @* overskriften Skader, tabellen og Udbetalt i alt fra før *@
    </div>

    <div class="col-lg-4">
        <h2 class="h4">Anmeld ny skade</h2>
        <EditForm Model="nySkade" OnValidSubmit="AnmeldSkade">
            <DataAnnotationsValidator />
            <div class="mb-2">
                <label class="form-label">Dato</label>
                <InputDate class="form-control" @bind-Value="nySkade.Dato" />
            </div>
            <div class="mb-2">
                <label class="form-label">Type</label>
                <InputSelect class="form-select" @bind-Value="nySkade.Type">
                    @foreach (var type in Enum.GetValues<SkadeType>())
                    {
                        <option value="@type">@type</option>
                    }
                </InputSelect>
            </div>
            <div class="mb-2">
                <label class="form-label">Beskrivelse</label>
                <InputTextArea class="form-control" @bind-Value="nySkade.Beskrivelse" />
                <ValidationMessage For="() => nySkade.Beskrivelse" />
            </div>
            <div class="mb-3">
                <label class="form-label">Beløb (kr.)</label>
                <InputNumber class="form-control" @bind-Value="nySkade.Beloeb" />
                <ValidationMessage For="() => nySkade.Beloeb" />
            </div>
            <button type="submit" class="btn btn-primary">Anmeld skade</button>
        </EditForm>
    </div>
</div>

@* I @code: *@
private Skade nySkade = new();

private async Task AnmeldSkade()
{
    nySkade.KundeId = Id;
    await SkadeService.OpretAsync(nySkade);
    nySkade = new Skade();   // tøm formularen
    await HentKunde();
}` },
      { t: "opgave", h: "Kundesiden, del 5: ret og slet kunden", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "razor",
        md: "Til sidst knapperne **Ret kunde** og **Slet kunde**. Siden skifter mellem tilstande med `bool`-felter (lektion 11, trin 5): `retter` og `bekraeftSlet`. Man retter i en kopi (trin 3), og efter sletning sendes man til kundelisten (trin 6). Løsningsforslaget viser hele siden, som den ser ud, når alle fem dele er lavet.",
        krav: [
          "Under navnet står knapperne **Ret kunde** og **Slet kunde**",
          "**Ret kunde** kalder `StartRet`, der laver en kopi af kunden i feltet `rettet` og sætter `retter = true`",
          "Når `retter` er sand, vises en `EditForm` med `rettet` (Navn, E-mail, Telefon) med knapperne **Gem** (kalder `GemKunde`) og **Annullér** (sætter `retter = false`)",
          "`GemKunde` gemmer med `OpdaterAsync(rettet)`, sætter `retter = false` og henter kunden igen",
          "**Slet kunde** sætter `bekraeftSlet = true`. Så vises `Slet … og alle kundens skader?` med **Ja, slet** (kalder `SletKunde`) og **Nej**",
          "`SletKunde` sletter med `SletAsync(Id)` og sender brugeren til `kunder` med `NavigationManager`, som siden får med `@inject NavigationManager Navigation`"
        ],
        tip: [
          "`StartRet` står i trin 3, og `SletKunde` står i trin 6.",
          "Ret-formularen er de samme tre felter som Ny kunde-formularen, bare med `rettet` i stedet for `nyKunde`. Knappen Annullér skal have `type=\"button\"`, ellers sender den formularen.",
          "Bekræftelsen så du i lektion 11, trin 5: `@if (bekraeftSlet) { … Ja, slet … Nej … } else { … Slet kunde … }`"
        ],
        output: "Ret kunde viser en formular med kundens oplysninger. Annullér ændrer intet, Gem gemmer. Slet kunde spørger først, og Ja, slet sender dig tilbage til kundelisten.",
        loesning: R`@page "/kunder/{Id:int}"
@inject IKundeService KundeService
@inject ISkadeService SkadeService
@inject NavigationManager Navigation

@if (kunde == null)
{
    <PageTitle>Kunde</PageTitle>
    <p>@(indlaest ? "Kunden findes ikke." : "Henter kunden …")</p>
    <a href="kunder">← Alle kunder</a>
}
else
{
    <PageTitle>@kunde.Navn</PageTitle>

    <p><a href="kunder">← Alle kunder</a></p>
    <h1>@kunde.Navn</h1>

    @if (retter)
    {
        <EditForm Model="rettet" OnValidSubmit="GemKunde" class="mb-3" style="max-width: 400px">
            <DataAnnotationsValidator />
            <div class="mb-2">
                <label class="form-label">Navn</label>
                <InputText class="form-control" @bind-Value="rettet.Navn" />
                <ValidationMessage For="() => rettet.Navn" />
            </div>
            <div class="mb-2">
                <label class="form-label">E-mail</label>
                <InputText class="form-control" @bind-Value="rettet.Email" />
                <ValidationMessage For="() => rettet.Email" />
            </div>
            <div class="mb-3">
                <label class="form-label">Telefon</label>
                <InputText class="form-control" @bind-Value="rettet.Telefon" />
                <ValidationMessage For="() => rettet.Telefon" />
            </div>
            <button type="submit" class="btn btn-primary">Gem</button>
            <button type="button" class="btn btn-secondary" @onclick="() => retter = false">Annullér</button>
        </EditForm>
    }
    else
    {
        <p>@kunde.Email · @kunde.Telefon</p>
        <p>
            <button class="btn btn-outline-primary btn-sm" @onclick="StartRet">Ret kunde</button>

            @if (bekraeftSlet)
            {
                <span class="ms-3">Slet @kunde.Navn og alle kundens skader?</span>
                <button class="btn btn-danger btn-sm" @onclick="SletKunde">Ja, slet</button>
                <button class="btn btn-secondary btn-sm" @onclick="() => bekraeftSlet = false">Nej</button>
            }
            else
            {
                <button class="btn btn-outline-danger btn-sm ms-2" @onclick="() => bekraeftSlet = true">Slet kunde</button>
            }
        </p>
    }

    <div class="row mt-4">
        <div class="col-lg-8">
            <h2 class="h4">Skader (@kunde.Skader.Count)</h2>

            @if (kunde.Skader.Count == 0)
            {
                <p class="text-muted">Kunden har ingen skader.</p>
            }
            else
            {
                <table class="table">
                    <thead>
                        <tr><th>Dato</th><th>Type</th><th>Beskrivelse</th><th class="text-end">Beløb</th><th>Status</th><th></th></tr>
                    </thead>
                    <tbody>
                        @foreach (var skade in kunde.Skader.OrderByDescending(s => s.Dato))
                        {
                            <tr>
                                <td class="text-nowrap">@skade.Dato.ToString("dd-MM-yyyy")</td>
                                <td>@skade.Type</td>
                                <td>@skade.Beskrivelse</td>
                                <td class="text-end text-nowrap">@skade.Beloeb.ToString("C")</td>
                                <td>
                                    @* Når man vælger en ny status, kører SkiftStatus med skadens id og det valgte. *@
                                    <select class="form-select form-select-sm" value="@skade.Status"
                                            @onchange="e => SkiftStatus(skade.Id, e)">
                                        @foreach (var status in Enum.GetValues<SkadeStatus>())
                                        {
                                            <option value="@status">@status</option>
                                        }
                                    </select>
                                </td>
                                <td><button class="btn btn-outline-danger btn-sm" @onclick="() => SletSkade(skade.Id)">Slet</button></td>
                            </tr>
                        }
                    </tbody>
                </table>
                <p>Udbetalt i alt til kunden: <b>@kunde.Udbetalt.ToString("C")</b></p>
            }
        </div>

        <div class="col-lg-4">
            <h2 class="h4">Anmeld ny skade</h2>
            <EditForm Model="nySkade" OnValidSubmit="AnmeldSkade">
                <DataAnnotationsValidator />
                <div class="mb-2">
                    <label class="form-label">Dato</label>
                    <InputDate class="form-control" @bind-Value="nySkade.Dato" />
                </div>
                <div class="mb-2">
                    <label class="form-label">Type</label>
                    <InputSelect class="form-select" @bind-Value="nySkade.Type">
                        @foreach (var type in Enum.GetValues<SkadeType>())
                        {
                            <option value="@type">@type</option>
                        }
                    </InputSelect>
                </div>
                <div class="mb-2">
                    <label class="form-label">Beskrivelse</label>
                    <InputTextArea class="form-control" @bind-Value="nySkade.Beskrivelse" />
                    <ValidationMessage For="() => nySkade.Beskrivelse" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Beløb (kr.)</label>
                    <InputNumber class="form-control" @bind-Value="nySkade.Beloeb" />
                    <ValidationMessage For="() => nySkade.Beloeb" />
                </div>
                <button type="submit" class="btn btn-primary">Anmeld skade</button>
            </EditForm>
        </div>
    </div>
}

@code {
    // Tallet fra adressen, fx 3 i /kunder/3.
    [Parameter] public int Id { get; set; }

    private Kunde? kunde;
    private bool indlaest;
    private bool retter;
    private Kunde rettet = new();
    private bool bekraeftSlet;
    private Skade nySkade = new();

    // Kører, hver gang Id sættes, også hvis man går direkte fra én kunde til en anden.
    protected override async Task OnParametersSetAsync()
    {
        await HentKunde();
    }

    private async Task HentKunde()
    {
        kunde = await KundeService.HentAsync(Id);
        indlaest = true;
    }

    private void StartRet()
    {
        // Ret i en kopi, så "Annullér" ikke ændrer den kunde, der vises.
        rettet = new Kunde { Id = kunde!.Id, Navn = kunde.Navn, Email = kunde.Email, Telefon = kunde.Telefon };
        retter = true;
    }

    private async Task GemKunde()
    {
        await KundeService.OpdaterAsync(rettet);
        retter = false;
        await HentKunde();
    }

    private async Task SletKunde()
    {
        await KundeService.SletAsync(Id);
        Navigation.NavigateTo("kunder");
    }

    private async Task AnmeldSkade()
    {
        nySkade.KundeId = Id;
        await SkadeService.OpretAsync(nySkade);
        nySkade = new Skade();   // tøm formularen
        await HentKunde();
    }

    private async Task SkiftStatus(int skadeId, ChangeEventArgs e)
    {
        // e.Value er teksten fra den valgte option, fx "Godkendt". Enum.Parse laver den om til en SkadeStatus.
        var status = Enum.Parse<SkadeStatus>(e.Value!.ToString()!);
        await SkadeService.SkiftStatusAsync(skadeId, status);
        await HentKunde();
    }

    private async Task SletSkade(int skadeId)
    {
        await SkadeService.SletAsync(skadeId);
        await HentKunde();
    }
}` },
      { t: "forklar", h: "Til eksamen", q: "Eksamensspørgsmål: Hvad sker der, når man retter en kunde og klikker Gem eller Annullér? Sig svaret højt, og peg på `StartRet` og `GemKunde` i `Components/Pages/KundeDetaljer.razor`.",
        svar: "Når man klikker Ret kunde, kører StartRet. Den laver en kopi af kunden med new og lægger den i feltet rettet, og formularen retter i kopien. Klikker man Annullér, sættes retter til false, og kopien bruges ikke, så den viste kunde er uændret. Klikker man Gem, og reglerne er overholdt, kører GemKunde. Den sender kopien til OpdaterAsync, som finder kunden i databasen med FindAsync, sætter de nye værdier og kalder SaveChangesAsync. Til sidst henter siden kunden igen.",
        noegle: ["StartRet", "kopi", "new", "Annullér", "OpdaterAsync", "SaveChangesAsync"] }
  ] },

  // ------------------------------------------------------------------
  { id: "m30l11", nr: 12, titel: "Skadesiden og test af hele appen", min: 25,
    ord: [
      ["Filtrering", "At vise kun de elementer, der passer, fx kun godkendte skader. Gøres med `Where`."],
      ["Sortering", "At sætte elementerne i rækkefølge. Gøres med `OrderBy` eller `OrderByDescending`."],
      ["CultureInfo", "Indstillinger for sprog og land, fx hvordan tal og datoer skrives. `da-DK` er dansk."],
      ["ToString(\"C\")", "Skriver et tal som et beløb i landets valuta: `4.500,00 kr.` på dansk."]
    ],
    trin: [
      { t: "valg", h: "Husker du fra sidst?",
        q: "Hvorfor laver kundesiden en kopi af kunden med `new`, når man klikker **Ret kunde**?",
        svar: ["Så formularen retter i kopien, og Annullér ikke ændrer den kunde, der vises", "For at gemme kunden to gange", "Fordi `EditForm` ikke kan bruge den rigtige kunde", "For at slette den gamle kunde"],
        ret: 0, fordi: "Uden kopien ville formularen rette direkte i det objekt, siden viser. Så ville navnet ændre sig på skærmen, også hvis man klikker Annullér." },
      { t: "forudsig", h: "Husker du fra sidst?",
        q: "Repetition: søgningen fra kundelisten. Svar, før du kigger tilbage. Hvad skriver programmet?",
        kode: R`List<string> navne = new List<string> { "Mette Jensen", "Peter Bangsmann", "Søren Nielsen", "Peter Parker" };
Console.WriteLine(navne.Count(n => n.Contains("PETER", StringComparison.OrdinalIgnoreCase)));`,
        output: "2",
        fordi: "Med `StringComparison.OrdinalIgnoreCase` er store og små bogstaver ligegyldige, så \"PETER\" findes i begge Peter-kunder." },
      { t: "laes", h: "Filtrér først, sortér bagefter",
        md: "Skadesiden har to rullelister: status og sortering. Begge er bundet med `@bind` til et felt. Propertyen `Viste` bruger dem: først filtreres der med `Where`, hvis der er valgt en status, og så sorteres der efter det valgte med et switch-udtryk.",
        kode: R`private IEnumerable<Skade> Viste
{
    get
    {
        IEnumerable<Skade> liste = skader!;

        if (statusFilter != "Alle")
        {
            liste = liste.Where(s => s.Status.ToString() == statusFilter);
        }

        return sortering switch
        {
            "aeldste" => liste.OrderBy(s => s.Dato),
            "beloeb" => liste.OrderByDescending(s => s.Beloeb),
            _ => liste.OrderByDescending(s => s.Dato)
        };
    }
}`,
        frag: true,
        noter: [
          ["get { … }", "En beregnet property kan også have en hel blok med `return`, når der er brug for flere linjer."],
          ["s.Status.ToString() == statusFilter", "Rullelisten giver en tekst, så statussen laves om til tekst, før de sammenlignes."],
          ["_ =>", "Alle andre værdier, her \"nyeste\": nyeste dato først."]
        ] },
      { t: "forudsig",
        q: "Samme fremgangsmåde: filtrér, og sortér så. Hvad skriver programmet?",
        kode: R`List<decimal> beloeb = new List<decimal> { 4500m, 18750m, 6200m, 2400m };
string sortering = "beloeb";

IEnumerable<decimal> liste = beloeb.Where(b => b < 10000m);
liste = sortering switch
{
    "beloeb" => liste.OrderByDescending(b => b),
    _ => liste.OrderBy(b => b)
};

foreach (decimal b in liste)
{
    Console.WriteLine(b);
}`,
        output: "6200\n4500\n2400",
        fordi: "`Where` fjerner 18750. `sortering` er \"beloeb\", så resten sorteres med det største først." },
      { t: "udfyld", q: "Udfyld, så skaderne sorteres med det største beløb først, og kun de tre første skrives ud.",
        kode: R`List<decimal> beloeb = new List<decimal> { 3200m, 25000m, 4500m, 7999m };

foreach (decimal b in beloeb.[[OrderByDescending]](b => b).[[Take]](3))
{
    Console.WriteLine(b);
}`,
        output: "25000\n7999\n4500",
        fordi: "`OrderByDescending` sorterer med det største først, og `Take(3)` tager de tre første." },
      { t: "fejl",
        q: "Det er statusserne for dine syv startskader. Med filteret Godkendt skal programmet tælle 3 skader, men det skriver 4. Klik på linjen med fejlen.",
        kode: R`List<SkadeStatus> statusser = new List<SkadeStatus>
{
    SkadeStatus.Godkendt, SkadeStatus.Behandles, SkadeStatus.Godkendt, SkadeStatus.Afvist,
    SkadeStatus.Anmeldt, SkadeStatus.Godkendt, SkadeStatus.Anmeldt
};
string statusFilter = "Godkendt";
int antal = statusser.Count(s => s.ToString() != statusFilter);
Console.WriteLine(antal);

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }`,
        linje: 7,
        logisk: true,
        output: "4",
        rettetOutput: "3",
        fordi: "`!=` betyder \"er forskellig fra\", så programmet tæller alle dem, der **ikke** er godkendt. Filteret skal beholde dem, der er ens med det valgte: `==`.",
        rettet: R`List<SkadeStatus> statusser = new List<SkadeStatus>
{
    SkadeStatus.Godkendt, SkadeStatus.Behandles, SkadeStatus.Godkendt, SkadeStatus.Afvist,
    SkadeStatus.Anmeldt, SkadeStatus.Godkendt, SkadeStatus.Anmeldt
};
string statusFilter = "Godkendt";
int antal = statusser.Count(s => s.ToString() == statusFilter);
Console.WriteLine(antal);

enum SkadeStatus { Anmeldt, Behandles, Godkendt, Afvist }` },
      { t: "opgave", h: "Lav skadesiden", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "razor",
        md: "Den sidste side. Lav `Components/Pages/Skader.razor`, og skriv den selv. Du har bygget alle delene før: data i `OnInitializedAsync`, rullelister med `@bind` og `Enum.GetValues`, en tabel og LINQ. Trin 3 viser propertyen `Viste`, der filtrerer og sorterer.",
        krav: [
          "Adressen er `/skader`, siden får en `ISkadeService`, og feltet `List<Skade>? skader` hentes i `OnInitializedAsync`",
          "To rullelister bundet med `@bind`: Status (`Alle` og de fire statusser) til feltet `statusFilter` med startværdien `\"Alle\"`, og Sortér efter (`Nyeste først`, `Ældste først`, `Højeste beløb først` med værdierne `nyeste`, `aeldste` og `beloeb`) til feltet `sortering`",
          "Propertyen `Viste` filtrerer på status, hvis der ikke er valgt `Alle`, og sorterer efter det valgte (trin 3)",
          "En tabel med Dato, Kunde (link), Type, Beskrivelse, Beløb og Status (`StatusMaerke`) for skaderne i `Viste`",
          "Under tabellen: antallet af viste skader og deres samlede beløb som kroner, fx `7 skader · i alt 68.049,00 kr.`",
          "Vælg **Godkendt**: 3 skader. Vælg **Højeste beløb først**: 25.000,00 kr. øverst"
        ],
        tip: [
          "En rulleliste med `@bind`: `<select class=\"form-select\" @bind=\"statusFilter\"> <option value=\"Alle\">Alle</option> … </select>`",
          "Tabellen er den samme som Seneste skader på overblikket, bare med `Viste` i stedet for `skader.OrderByDescending(…).Take(5)`.",
          "Skriv `var viste = Viste.ToList();` øverst i `else`-delen. `ToList()` laver resultatet om til en almindelig liste, så det kun regnes ud én gang, så tabellen, antallet (`viste.Count`) og summen (`viste.Sum(s => s.Beloeb)`) bruger samme liste."
        ],
        output: "Skadesiden viser alle syv skader med den nyeste øverst og 7 skader · i alt 68.049,00 kr. Med filteret Godkendt er der tre.",
        loesning: R`@page "/skader"
@inject ISkadeService SkadeService

<PageTitle>Skader</PageTitle>

<h1>Alle skader</h1>

<div class="row g-2 mb-3" style="max-width: 600px">
    <div class="col">
        <label class="form-label">Status</label>
        <select class="form-select" @bind="statusFilter">
            <option value="Alle">Alle</option>
            @foreach (var status in Enum.GetValues<SkadeStatus>())
            {
                <option value="@status">@status</option>
            }
        </select>
    </div>
    <div class="col">
        <label class="form-label">Sortér efter</label>
        <select class="form-select" @bind="sortering">
            <option value="nyeste">Nyeste først</option>
            <option value="aeldste">Ældste først</option>
            <option value="beloeb">Højeste beløb først</option>
        </select>
    </div>
</div>

@if (skader == null)
{
    <p>Henter skader …</p>
}
else
{
    var viste = Viste.ToList();

    <table class="table">
        <thead>
            <tr><th>Dato</th><th>Kunde</th><th>Type</th><th>Beskrivelse</th><th class="text-end">Beløb</th><th>Status</th></tr>
        </thead>
        <tbody>
            @foreach (var skade in viste)
            {
                <tr>
                    <td class="text-nowrap">@skade.Dato.ToString("dd-MM-yyyy")</td>
                    <td><a href="kunder/@skade.KundeId">@skade.Kunde?.Navn</a></td>
                    <td>@skade.Type</td>
                    <td>@skade.Beskrivelse</td>
                    <td class="text-end text-nowrap">@skade.Beloeb.ToString("C")</td>
                    <td><StatusMaerke Status="skade.Status" /></td>
                </tr>
            }
        </tbody>
    </table>

    <p>@viste.Count skader · i alt <b>@viste.Sum(s => s.Beloeb).ToString("C")</b></p>
}

@code {
    private List<Skade>? skader;
    private string statusFilter = "Alle";
    private string sortering = "nyeste";

    // LINQ i to skridt: først filtrere (Where), så sortere (OrderBy/OrderByDescending).
    private IEnumerable<Skade> Viste
    {
        get
        {
            IEnumerable<Skade> liste = skader!;

            if (statusFilter != "Alle")
            {
                liste = liste.Where(s => s.Status.ToString() == statusFilter);
            }

            return sortering switch
            {
                "aeldste" => liste.OrderBy(s => s.Dato),
                "beloeb" => liste.OrderByDescending(s => s.Beloeb),
                _ => liste.OrderByDescending(s => s.Dato)
            };
        }
    }

    protected override async Task OnInitializedAsync()
    {
        skader = await SkadeService.HentAlleAsync();
    }
}` },
      { t: "laes", h: "Danske beløb",
        md: "I lektion 6b skrev du to linjer med `CultureInfo` øverst i `Program.cs`. De sætter appens sprog og land til dansk (`da-DK`). Derfor skriver `ToString(\"C\")` beløb som danske kroner med punktum ved tusinder og komma før øre.",
        kode: R`Console.WriteLine(4500m.ToString("C"));
Console.WriteLine(0.5m.ToString("C"));`,
        output: "4.500,00 kr.\n0,50 kr.",
        md2: "Uden de to linjer ville appen bruge computerens indstillinger. På en engelsk computer kunne der så stå `$4,500.00`." },
      { t: "forudsig",
        q: "Programmet kører med dansk `CultureInfo`, ligesom din app. Hvad skriver det?",
        kode: R`decimal udbetalt = 4500m + 6200m + 3200m;
Console.WriteLine(udbetalt.ToString("C"));`,
        output: "13.900,00 kr.",
        fordi: "4500 + 6200 + 3200 = 13900. `\"C\"` skriver det som danske kroner med to decimaler. Det er tallet på din forside." },
      { t: "ide", h: "Test hele appen, som censor ville",
        md: "Nu er appen færdig. Gå den igennem fra ende til anden, før du afleverer. Start forfra med de rigtige startdata: stop appen, slet `skade.db` i mappen `Data`, og kør igen. (Lader du `app.db` ligge, beholder du din bruger.)",
        win: ["**Overblik**: 4 kunder, 3 åbne skader, 13.900,00 kr. udbetalt.", "**Kunder**: søg på `søren`, så på `zzz`. Prøv at oprette en tom kunde og en med forkert e-mail og telefon. Opret så en rigtig kunde.", "**Kundesiden** for din nye kunde: anmeld en skade på 12.000 kr. Prøv først at anmelde uden beskrivelse. Sæt skaden til **Godkendt**: udbetalt skal være 12.000,00 kr.", "Ret kunden, og prøv både **Annullér** og **Gem**.", "**Overblik** igen: nu er der udbetalt 25.900,00 kr. **Skader**: 8 skader. Filtrér på **Godkendt** (4 skader), og sortér efter beløb.", "Slet skaden, og slet så kunden. Du kommer tilbage til kundelisten, og kunden er væk.", "Skriv `/kunder/999` i adresselinjen: \"Kunden findes ikke.\""],
        mac: ["**Overblik**: 4 kunder, 3 åbne skader, 13.900,00 kr. udbetalt.", "**Kunder**: søg på `søren`, så på `zzz`. Prøv at oprette en tom kunde og en med forkert e-mail og telefon. Opret så en rigtig kunde.", "**Kundesiden** for din nye kunde: anmeld en skade på 12.000 kr. Prøv først at anmelde uden beskrivelse. Sæt skaden til **Godkendt**: udbetalt skal være 12.000,00 kr.", "Ret kunden, og prøv både **Annullér** og **Gem**.", "**Overblik** igen: nu er der udbetalt 25.900,00 kr. **Skader**: 8 skader. Filtrér på **Godkendt** (4 skader), og sortér efter beløb.", "Slet skaden, og slet så kunden. Du kommer tilbage til kundelisten, og kunden er væk.", "Skriv `/kunder/999` i adresselinjen: \"Kunden findes ikke.\""],
        md2: "Virker et punkt ikke, så sammenlign den fil, det handler om, med facit i `Desktop\\c#\\C#  Ekasmen\\Facit\\SkadeApp`. Sæt et breakpoint i den metode, der skulle køre, og se, om den bliver kaldt." },
      { t: "valg", q: "Til eksamen spørger censor: \"Hvad sker der i din app, når man vælger Godkendt i rullelisten på kundesiden?\" Hvilket svar er rigtigt?",
        svar: ["@onchange kalder SkiftStatus med skadens id. Den laver teksten om til en SkadeStatus, SkadeService gemmer den nye status med SaveChangesAsync, og siden henter kunden igen, så det udbetalte beløb opdateres", "Browseren gemmer statussen i en cookie", "Rullelisten ændrer databasen direkte uden C#", "Hele siden genindlæses fra serveren som en ny side"],
        ret: 0, fordi: "Det er hele kæden: hændelse på siden → metode i `@code` → service → EF Core → database, og så tegnes siden igen med de nye data." },
      { t: "forklar", q: "Censor: \"Hvad er forskellen på at filtrere og at sortere, og hvilke LINQ-metoder bruger du til det på skadesiden?\"",
        svar: "At filtrere er at vise kun de skader, der passer, fx kun de godkendte. Det gør jeg med Where. At sortere er at sætte dem i rækkefølge, fx nyeste først eller højeste beløb først. Det gør jeg med OrderBy og OrderByDescending. På skadesiden filtrerer jeg først og sorterer bagefter, så der ikke sorteres skader, som alligevel bliver fjernet.",
        noegle: ["Where", "OrderBy", "OrderByDescending", "først", "bagefter"] },
      { t: "forklar", h: "Til eksamen", q: "Eksamensspørgsmål: Vis din app for censor på to minutter. Hvad viser du, og i hvilken rækkefølge? Sig det højt, mens du klikker rundt i appen.",
        svar: "Jeg starter på Overblik og forklarer problemet: en sagsbehandler skal holde styr på kunder og skader. Så går jeg til Kunder, søger og opretter en kunde, også med en fejl, så valideringen ses. På kundesiden anmelder jeg en skade og sætter den til Godkendt, så det udbetalte beløb ændrer sig. Til sidst viser jeg Skader med filter og sortering, og Overblik igen, hvor tallene er opdateret. Undervejs peger jeg på, at siderne bruger services, og at data gemmes med EF Core i SQLite.",
        noegle: ["problemet", "validering", "kundesiden", "Godkendt", "filter", "services"] }
  ] },

  // ------------------------------------------------------------------
  { id: "m30l12", nr: 13, titel: "Login: kun for medarbejdere", min: 30,
    ord: [
      ["Authentication", "At finde ud af, hvem brugeren er: log ind med e-mail og adgangskode."],
      ["Autorisation", "At bestemme, hvad brugeren må: fx at kun brugere, der er logget ind, må se kunderne."],
      ["ASP.NET Core Identity", "Microsofts færdige system til brugere og login. Gemmer brugerne i en database og klarer adgangskoder og cookies."],
      ["Hash", "En adgangskode laves om til en lang kode, der ikke kan regnes tilbage. Databasen gemmer kun hashen, aldrig selve adgangskoden."],
      ["Cookie", "En lille tekst, browseren gemmer og sender med hver gang. Efter login fortæller den serveren, hvem du er."],
      ["[Authorize]", "En attribut på en side: kun brugere, der er logget ind, må se den. Skrives `@attribute [Authorize]` i en `.razor`-fil."],
      ["AuthorizeView", "En komponent, der viser én ting til brugere, der er logget ind (`<Authorized>`), og noget andet til alle andre (`<NotAuthorized>`)."]
    ],
    trin: [
      { t: "valg", h: "Husker du fra sidst?",
        q: "Hvad gør `Navigation.NavigateTo(\"kunder\")` i `SletKunde` på kundesiden?",
        svar: ["Sender brugeren til kundelisten, fordi kundesiden ikke kan vise en kunde, der er slettet", "Sletter alle kunder", "Genindlæser den samme side", "Henter kunderne fra databasen"],
        ret: 0, fordi: "`NavigationManager` er en service, siden får med `@inject`. `NavigateTo` skifter side, som hvis brugeren havde klikket på et link." },
      { t: "forudsig", h: "Husker du fra sidst?",
        q: "Repetition: filtrér først, sortér bagefter. Svar, før du kigger tilbage. Hvad skriver programmet?",
        kode: R`List<decimal> beloeb = new List<decimal> { 4500m, 18750m, 6200m, 7999m, 25000m };
foreach (decimal b in beloeb.Where(b => b > 5000m).OrderBy(b => b).Take(2))
{
    Console.WriteLine(b);
}`,
        output: "6200\n7999",
        fordi: "`Where` beholder 18750, 6200, 7999 og 25000. `OrderBy` sætter dem med det mindste først, og `Take(2)` tager de to første." },
      { t: "laes", h: "Hvorfor login?",
        md: "SkadeApp indeholder kunders navne, e-mails, telefonnumre og skader. Det er personoplysninger, og dem må kun selskabets medarbejdere se. Derfor skal man logge ind.\n\nDer er to ord, du skal kunne holde ude fra hinanden til eksamen:\n\n- **Authentication**: hvem er du? Brugeren logger ind med e-mail og adgangskode.\n- **Autorisation**: hvad må du? Siderne med kunder og skader må kun ses af brugere, der er logget ind.",
        md2: "Underviseren sagde i undervisningen, at han gerne ser login i projektet. Det har SkadeApp nu." },
      { t: "valg", q: "En sagsbehandler skriver sin e-mail og adgangskode og bliver logget ind. Hvad hedder det, der lige skete?",
        svar: ["Authentication: systemet har fundet ud af, hvem brugeren er", "Autorisation", "Validering", "Dependency injection"],
        ret: 0, fordi: "Authentication er at finde ud af, hvem man er. Autorisation kommer bagefter: at bestemme, hvad den bruger må, fx se kundelisten." },
      { t: "laes", h: "Det har skabelonen lavet",
        md: "Da du valgte **Individual Accounts** i lektion 1, lavede skabelonen hele login-delen med **ASP.NET Core Identity**. Du skal ikke skrive den, men du skal vide, hvad der er:",
        kode: R`Components/Account          login-siderne: Login, Register, log ud, skift adgangskode …
Data/ApplicationUser.cs     klassen for en bruger
Data/ApplicationDbContext.cs  databasen med brugerne (app.db)
Program.cs                  AddAuthentication, AddIdentityCookies, AddIdentityCore …
Components/Routes.razor     AuthorizeRouteView: sender til login, hvis man ikke må se siden`,
        sprog: "text",
        noter: [
          ["Adgangskoder", "Gemmes som en **hash**. Selv den, der kan se databasen, kan ikke læse adgangskoderne."],
          ["Cookie", "Efter login gemmer browseren en cookie, så serveren kan se, hvem du er, uden at du logger ind igen."],
          ["EnsureCreated", "Brugertabellerne bliver lavet med `EnsureCreated()` i `Program.cs`, ligesom dine egne tabeller. Underviseren brugte i stedet *migrations* med `Add-Migration` og `Update-Database`: de kan ændre en database, der allerede har data, uden at slette den."]
        ],
        md2: "Skabelonens login-sider er på engelsk. I din afleverede app har du selv oversat dem til dansk og fjernet delen om at logge ind med andre tjenester (`ExternalLoginPicker`). Det er ekstra og ikke noget, opgaven kræver." },
      { t: "valg", q: "Hvordan gemmer ASP.NET Core Identity en brugers adgangskode i databasen?",
        svar: ["Som en hash, der ikke kan regnes tilbage til adgangskoden", "Som almindelig tekst", "I en cookie i browseren", "Den gemmes slet ikke"],
        ret: 0, fordi: "Ved login laver Identity en hash af det, brugeren skriver, og sammenligner den med den gemte hash. Selve adgangskoden står aldrig i databasen." },
      { t: "laes", h: "[Authorize]: siden kræver login",
        md: "En side bliver beskyttet med én linje under `@page`: `@attribute [Authorize]`. Prøver en bruger, der ikke er logget ind, at åbne siden, sender `AuthorizeRouteView` i `Routes.razor` brugeren til login-siden. Efter login kommer man tilbage til den side, man ville se.",
        kode: R`@page "/kunder"
@attribute [Authorize]
@inject IKundeService KundeService`,
        sprog: "razor", frag: true,
        noter: [
          ["@attribute [Authorize]", "Sætter attributten `[Authorize]` på siden. Kræver `@using Microsoft.AspNetCore.Authorization`, som du lægger i `_Imports.razor`."],
          ["Uden linjen", "Siden er åben for alle, også uden login."]
        ] },
      { t: "valg", q: "Kundelisten har `@attribute [Authorize]`. En bruger, der ikke er logget ind, skriver adressen `/kunder`. Hvad sker der?",
        svar: ["Brugeren bliver sendt til login-siden, og efter login vises kundelisten", "Kundelisten vises alligevel", "Siden viser en tom tabel", "Appen går ned"],
        ret: 0, fordi: "`AuthorizeRouteView` i `Routes.razor` ser, at brugeren ikke må se siden, og sender til login. Adressen, man ville til, huskes, så man kommer derhen bagefter." },
      { t: "laes", h: "Menuen: AuthorizeView",
        md: "Menuen skal vise **Overblik**, **Kunder** og **Skader** til brugere, der er logget ind, og **Log ind** og **Opret bruger** til alle andre. Det gør `AuthorizeView`: indholdet i `<Authorized>` vises, når man er logget ind, og indholdet i `<NotAuthorized>`, når man ikke er.",
        kode: R`<AuthorizeView>
    <Authorized>
        ... Overblik, Kunder, Skader, @context.User.Identity?.Name og Log ud
    </Authorized>
    <NotAuthorized>
        ... Log ind og Opret bruger
    </NotAuthorized>
</AuthorizeView>`,
        sprog: "razor", frag: true,
        noter: [
          ["@context.User.Identity?.Name", "Navnet på den bruger, der er logget ind. Her er det e-mailen."],
          ["Log ud", "En lille `<form>`, der sender til `Account/Logout`, når man klikker. `<AntiforgeryToken />` beskytter mod falske formularer fra andre hjemmesider. Den har skabelonen lavet."],
          ["@code nederst i NavMenu.razor", "Skabelonens kode. Den husker den adresse, du står på (`currentUrl`), så du kommer tilbage dertil efter login. `@implements IDisposable` og `Dispose` rydder op, når menuen forsvinder. Du skal ikke skrive eller ændre den."]
        ],
        md2: "**Ekstra:** underviseren viste `[Authorize]`. `AuthorizeView` kom med skabelonen, og du har brugt den til at skjule dine egne links, indtil brugeren er logget ind." },
      { t: "valg", q: "Menuen har `<AuthorizeView>` med `<Authorized>` og `<NotAuthorized>`. Hvad ser en bruger, der ikke er logget ind?",
        svar: ["Kun det, der står i <NotAuthorized>: Log ind og Opret bruger", "Alle links, men de virker ikke", "Ingen menu", "Både <Authorized> og <NotAuthorized>"],
        ret: 0, fordi: "`AuthorizeView` viser én af de to dele. Linkene til dine sider står i `<Authorized>`, så de vises først efter login." },
      { t: "opgave", h: "Slå login til for dine sider", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "razor",
        md: "Fire rettelser, og så er alle dine sider beskyttet. Trin 7 viser `[Authorize]`, og trin 9 viser `AuthorizeView` i menuen.\n\nI `NavMenu.razor` står der allerede en `<AuthorizeView>` fra skabelonen med `<Authorized>` (brugerens navn og Logout) og `<NotAuthorized>` (Register og Login). Dine tre links står over den. De skal flyttes ind i `<Authorized>`, så de kun vises efter login.",
        krav: [
          "`Program.cs`: `options.SignIn.RequireConfirmedAccount` er rettet fra `true` til `false` (appen sender ingen e-mails, så nye brugere skal ikke bekræfte deres e-mail)",
          "`Components/_Imports.razor`: `@using Microsoft.AspNetCore.Authorization` står nederst",
          "`Home.razor`, `Kunder.razor`, `KundeDetaljer.razor` og `Skader.razor` har `@attribute [Authorize]` på linjen lige under `@page`",
          "`NavMenu.razor`: dine tre links står øverst inde i `<Authorized>`, før brugerens navn",
          "`NavMenu.razor`: teksterne er danske: **Log ud** i stedet for Logout, og under `<NotAuthorized>` **Log ind** (først) og **Opret bruger** i stedet for Login og Register",
          "Appen kører. Uden login kommer du til login-siden, og menuen viser kun Log ind og Opret bruger"
        ],
        tip: [
          "Klip de tre `<div class=\"nav-item px-3\">`-blokke med Overblik, Kunder og Skader ud, og sæt dem ind lige efter `<Authorized>`.",
          "Under `<NotAuthorized>` skal de to blokke bytte plads, så Log ind står først. Ret kun teksten efter ikonet, ikke `href`.",
          "Lange e-mails i menuen kan forkortes: `<span class=\"d-inline-block text-truncate\" style=\"max-width: 150px\">@context.User.Identity?.Name</span>`"
        ],
        output: "Når du kører appen, kommer du til siden Log in. Menuen viser kun Log ind og Opret bruger, indtil du er logget ind.",
        loesning: R`@* Program.cs *@
options.SignIn.RequireConfirmedAccount = false;

@* Components/_Imports.razor, nederst *@
@using Microsoft.AspNetCore.Authorization

@* Home.razor, Kunder.razor, KundeDetaljer.razor og Skader.razor, lige under @page *@
@attribute [Authorize]

@* Components/Layout/NavMenu.razor *@
@implements IDisposable

@inject NavigationManager NavigationManager

<div class="top-row ps-3 navbar navbar-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="">SkadeApp</a>
    </div>
</div>

<input type="checkbox" title="Menu" class="navbar-toggler" />

<div class="nav-scrollable" onclick="document.querySelector('.navbar-toggler').click()">
    <nav class="nav flex-column">
        @* AuthorizeView viser den første del til brugere, der er logget ind, og den anden del til alle andre. *@
        <AuthorizeView>
            <Authorized>
                <div class="nav-item px-3">
                    <NavLink class="nav-link" href="" Match="NavLinkMatch.All">
                        <span class="bi bi-house-door-fill-nav-menu" aria-hidden="true"></span> Overblik
                    </NavLink>
                </div>

                <div class="nav-item px-3">
                    <NavLink class="nav-link" href="kunder">
                        <span class="bi bi-plus-square-fill-nav-menu" aria-hidden="true"></span> Kunder
                    </NavLink>
                </div>

                <div class="nav-item px-3">
                    <NavLink class="nav-link" href="skader">
                        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Skader
                    </NavLink>
                </div>

                <div class="nav-item px-3">
                    <NavLink class="nav-link" href="Account/Manage">
                        <span class="bi bi-person-fill-nav-menu" aria-hidden="true"></span>
                        <span class="d-inline-block text-truncate" style="max-width: 150px">@context.User.Identity?.Name</span>
                    </NavLink>
                </div>
                <div class="nav-item px-3">
                    <form action="Account/Logout" method="post">
                        <AntiforgeryToken />
                        <input type="hidden" name="ReturnUrl" value="@currentUrl" />
                        <button type="submit" class="nav-link">
                            <span class="bi bi-arrow-bar-left-nav-menu" aria-hidden="true"></span> Log ud
                        </button>
                    </form>
                </div>
            </Authorized>
            <NotAuthorized>
                <div class="nav-item px-3">
                    <NavLink class="nav-link" href="Account/Login">
                        <span class="bi bi-person-badge-nav-menu" aria-hidden="true"></span> Log ind
                    </NavLink>
                </div>
                <div class="nav-item px-3">
                    <NavLink class="nav-link" href="Account/Register">
                        <span class="bi bi-person-nav-menu" aria-hidden="true"></span> Opret bruger
                    </NavLink>
                </div>
            </NotAuthorized>
        </AuthorizeView>
    </nav>
</div>

@code {
    private string? currentUrl;

    protected override void OnInitialized()
    {
        currentUrl = NavigationManager.ToBaseRelativePath(NavigationManager.Uri);
        NavigationManager.LocationChanged += OnLocationChanged;
    }

    private void OnLocationChanged(object? sender, LocationChangedEventArgs e)
    {
        currentUrl = NavigationManager.ToBaseRelativePath(e.Location);
        StateHasChanged();
    }

    public void Dispose()
    {
        NavigationManager.LocationChanged -= OnLocationChanged;
    }
}`,
        md2: "`@code`-delen nederst i `NavMenu.razor` har skabelonen skrevet. Den husker den adresse, du står på, så du kommer tilbage dertil, når du logger ind igen. Den skal du ikke røre." },
      { t: "ide", h: "Prøv login",
        md: "Nu prøver du login, som en ny medarbejder ville.",
        win: ["Kør appen. Du bliver sendt til siden **Log in**, fordi forsiden kræver login. Menuen viser kun **Log ind** og **Opret bruger**.", "Klik **Opret bruger**. Skriv en e-mail, fx `sagsbehandler@skadeapp.dk`, og en adgangskode to gange, fx `Skade123!`. Klik **Register**.", "Du er logget ind og ser overblikket. Menuen viser dine tre sider, din e-mail og **Log ud**.", "Klik **Log ud**. Skriv adressen `/skader`: du bliver sendt til login.", "Log ind med en forkert adgangskode: der står *Invalid login attempt*. Log ind med den rigtige: du kommer til skadesiden."],
        mac: ["Kør appen. Du bliver sendt til siden **Log in**, fordi forsiden kræver login. Menuen viser kun **Log ind** og **Opret bruger**.", "Klik **Opret bruger**. Skriv en e-mail, fx `sagsbehandler@skadeapp.dk`, og en adgangskode to gange, fx `Skade123!`. Klik **Register**.", "Du er logget ind og ser overblikket. Menuen viser dine tre sider, din e-mail og **Log ud**.", "Klik **Log ud**. Skriv adressen `/skader`: du bliver sendt til login.", "Log ind med en forkert adgangskode: der står *Invalid login attempt*. Log ind med den rigtige: du kommer til skadesiden."],
        md2: "Adgangskoden skal være mindst 6 tegn og have et stort bogstav, et lille bogstav, et tal og et tegn som `!`. Det er Identitys regler fra starten. Brugeren gemmes i `Data/app.db`, så den er der også næste gang.\n\nI din afleverede app er login-siderne oversat til dansk, så der står danske tekster på knapperne og i beskederne i stedet for de engelske, der står her." },
      { t: "forklar", h: "Til eksamen", q: "Eksamensspørgsmål: Hvordan har du sikret, at kun medarbejdere kan se kunderne? Sig svaret højt, og peg på `@attribute [Authorize]` øverst i `Kunder.razor` og `<AuthorizeView>` i `NavMenu.razor`.",
        svar: "Projektet bruger ASP.NET Core Identity, som skabelonen lavede, da jeg valgte Individual Accounts. Brugerne gemmes i deres egen database, og adgangskoderne gemmes som hash. Mine sider har @attribute [Authorize], så en bruger, der ikke er logget ind, bliver sendt til login af AuthorizeRouteView. Menuen bruger AuthorizeView, så linkene til kunder og skader kun vises efter login. Det er authentication (hvem er du) og autorisation (hvad må du).",
        noegle: ["Identity", "hash", "[Authorize]", "AuthorizeView", "authentication", "autorisation"] }
  ] },

  // ------------------------------------------------------------------
  { id: "m30l13", nr: 14, titel: "Ekstra: eget udseende og et SVG-diagram", min: 30,
    ord: [
      ["CSS", "Sproget, der bestemmer udseendet: farver, størrelser og placering."],
      ["Scoped CSS", "En `.razor.css`-fil, der kun gælder for én komponent, fx `MainLayout.razor.css`."],
      ["SVG", "Grafik beskrevet med tekst: figurer med koordinater. Kan skrives direkte i en `.razor`-fil og bliver skarp i alle størrelser."],
      ["viewBox", "Det koordinatsystem, en SVG tegnes i: `viewBox=\"0 0 420 160\"` er 420 enheder bredt og 160 højt."],
      ["rect", "En firkant i SVG: `x` og `y` er øverste venstre hjørne, `width` og `height` er størrelsen."],
      ["Heltalsdivision", "Deler man to `int`, smides decimalerne væk: `7 / 2` er 3."]
    ],
    trin: [
      { t: "laes", h: "Egne farver",
        md: "**Denne lektion er ekstra.** Din afleverede app har skabelonens farver, intet logo og intet diagram. Tag lektionen, hvis du vil kunne svare på spørgsmål om CSS og SVG, eller som en idé til punktet *Udvidelser* i præsentationen. Lav ændringerne i en kopi, ikke i den app, du har afleveret.\n\nSkabelonen er blå og lilla. Her får SkadeApp sine egne farver: mørkegrøn. To filer bestemmer udseendet:\n\n- `wwwroot/app.css` gælder **hele appen**, fx farven på links og knapper.\n- `Components/Layout/MainLayout.razor.css` gælder **kun layoutet**, fx baggrunden i menuen. En `.razor.css`-fil med samme navn som en komponent kaldes **scoped CSS**: den rører ikke andre komponenter.",
        kode: R`/* wwwroot/app.css: SkadeApps egne farver i stedet for skabelonens blå */
a, .btn-link {
    color: #2d6a4f;
}

.btn-primary {
    color: #fff;
    background-color: #2d6a4f;
    border-color: #1b4332;
}

/* MainLayout.razor.css: menuens baggrund */
.sidebar {
    background-image: linear-gradient(180deg, #1b4332 0%, #2d6a4f 70%);
}`,
        sprog: "css",
        noter: [
          ["#2d6a4f", "En farve skrevet som rød, grøn og blå i sekstentalssystemet. Denne er mørkegrøn."],
          [".btn-primary", "Bootstraps klasse til den vigtigste knap. Din regel ændrer dens farve."],
          ["linear-gradient", "En overgang fra én farve øverst til en anden længere nede."]
        ] },
      { t: "valg", q: "Du vil ændre farven på alle knapper med klassen `btn-primary` i hele appen. Hvilken fil skal du rette i?",
        svar: ["wwwroot/app.css, fordi den gælder for hele appen", "MainLayout.razor.css", "NavMenu.razor", "Program.cs"],
        ret: 0, fordi: "`app.css` gælder overalt. En `.razor.css`-fil gælder kun for sin egen komponent, så en regel i `MainLayout.razor.css` ville ikke ramme knapperne på dine sider." },
      { t: "opgave", h: "Giv appen dine farver", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "css",
        md: "Ret farverne selv ud fra trin 1. Grøn er forslaget, men du må gerne vælge dine egne farver. Det vigtige er, at du ved, hvilken fil der styrer hvad.",
        krav: [
          "`wwwroot/app.css`: links (`a, .btn-link`) og knapper (`.btn-primary`) har dine farver i stedet for skabelonens blå",
          "`wwwroot/app.css`: `.btn-primary:hover` (musen over knappen) har en mørkere udgave af farven",
          "`wwwroot/app.css`: kantknapperne (`.btn-outline-primary`, fx **Ret kunde**) har din farve på tekst og kant, og fyldt baggrund under `:hover`",
          "`Components/Layout/MainLayout.razor.css`: menuen (`.sidebar`) har en overgang i dine farver",
          "`Components/Layout/MainLayout.razor`: linket **About** øverst er erstattet af teksten `Skadesbehandling for et forsikringsselskab`, og fejlteksten nederst er på dansk",
          "Appen kører med dine farver"
        ],
        tip: [
          "Find reglerne `a, .btn-link { … }` og `.btn-primary { … }` øverst i `app.css`, og ret farvekoderne. Trin 1 har dem.",
          "En ny regel skrives som de andre: `.btn-outline-primary { color: #2d6a4f; border-color: #2d6a4f; }` og en `:hover`-regel under den.",
          "Teksten øverst: `<span class=\"text-muted\">Skadesbehandling for et forsikringsselskab</span>` i stedet for `<a … >About</a>`."
        ],
        output: "Menuen er grøn, knapperne er grønne, og øverst til højre står Skadesbehandling for et forsikringsselskab.",
        loesning: R`/* wwwroot/app.css */
/* SkadeApps egne farver: grøn i stedet for skabelonens blå */
a, .btn-link {
    color: #2d6a4f;
}

.btn-primary {
    color: #fff;
    background-color: #2d6a4f;
    border-color: #1b4332;
}

.btn-primary:hover {
    background-color: #1b4332;
    border-color: #1b4332;
}

.btn-outline-primary {
    color: #2d6a4f;
    border-color: #2d6a4f;
}

.btn-outline-primary:hover {
    color: #fff;
    background-color: #2d6a4f;
    border-color: #2d6a4f;
}

/* MainLayout.razor.css: i reglen .sidebar */
background-image: linear-gradient(180deg, #1b4332 0%, #2d6a4f 70%);

/* MainLayout.razor: øverst <span class="text-muted">Skadesbehandling for et forsikringsselskab</span>,
   og nederst "Der skete en uventet fejl." og "Genindlæs siden" */` },
      { t: "laes", h: "SVG: tegn med koordinater",
        md: "**SVG** er grafik skrevet som tekst. Hver figur har koordinater. Punktet (0, 0) er **øverst til venstre**: `x` vokser mod højre, og `y` vokser **nedad**. Her er logoet til menuen: et skjold med et flueben.",
        kode: R`<svg width="26" height="30" viewBox="0 0 26 30" aria-hidden="true">
    <path d="M13 1 L25 5 V14 C25 22 19 27 13 29 C7 27 1 22 1 14 V5 Z" fill="#f4a261" />
    <path d="M7 15 L11.5 19.5 L19 11" stroke="#1b4332" stroke-width="3" fill="none"
          stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
        sprog: "html",
        noter: [
          ["viewBox=\"0 0 26 30\"", "Koordinaterne går fra 0 til 26 vandret og fra 0 til 30 lodret."],
          ["path d=\"M13 1 L25 5 …\"", "En streg: `M` flytter pennen, `L` tegner en linje, `V` en lodret linje, `C` en kurve, `Z` lukker figuren."],
          ["width og height", "Hvor stort logoet vises på siden."],
          ["fill / stroke", "`fill` er farven indeni, `stroke` er farven på stregen. `stroke-width` er stregens tykkelse."],
          ["aria-hidden=\"true\"", "Skærmlæsere springer logoet over, fordi teksten SkadeApp står lige ved siden af."]
        ] },
      { t: "valg", q: "I en SVG står en firkant med `y=\"10\"` og en anden med `y=\"40\"`. Hvilken står længst nede på skærmen?",
        svar: ["Den med y=\"40\", fordi y vokser nedad i SVG", "Den med y=\"10\"", "De står ved siden af hinanden", "Det afhænger af x"],
        ret: 0, fordi: "I SVG er (0, 0) øverst til venstre, og `y` bliver større, jo længere ned man kommer. Det er omvendt af en graf i matematik." },
      { t: "ide", h: "Sæt logoet i menuen",
        md: "Logoet skal stå foran navnet SkadeApp øverst i menuen.",
        win: ["Åbn `Components/Layout/NavMenu.razor`.", "Erstat linjen `<a class=\"navbar-brand\" href=\"\">SkadeApp</a>` med koden nedenfor.", "Kør appen. Skjoldet står i menuen."],
        mac: ["Åbn `Components/Layout/NavMenu.razor`.", "Erstat linjen `<a class=\"navbar-brand\" href=\"\">SkadeApp</a>` med koden nedenfor.", "Kør appen. Skjoldet står i menuen."],
        kode: R`<a class="navbar-brand d-flex align-items-center gap-2" href="">
    @* Logoet er tegnet med SVG: et skjold med et flueben. *@
    <svg width="26" height="30" viewBox="0 0 26 30" aria-hidden="true">
        <path d="M13 1 L25 5 V14 C25 22 19 27 13 29 C7 27 1 22 1 14 V5 Z" fill="#f4a261" />
        <path d="M7 15 L11.5 19.5 L19 11" stroke="#1b4332" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    SkadeApp
</a>`,
        sprog: "razor", frag: true,
        md2: "`d-flex align-items-center gap-2` er Bootstrap: logo og tekst står på én linje, midt for hinanden, med lidt luft imellem." },
      { t: "laes", h: "Et diagram, der regner selv",
        md: "Overblikket får et søjlediagram: én vandret søjle pr. status, og jo flere skader, jo længere søjle. Det er en komponent, `StatusDiagram`, der får skaderne som parameter og tegner en `rect` for hver status. Den længste søjle er 260 enheder.",
        kode: R`@for (int i = 0; i < statusser.Length; i++)
{
    var status = statusser[i];
    int antal = Antal(status);
    int bredde = 260 * antal / Stoerste;   // heltal: SVG skal have punktum, ikke dansk komma
    int y = i * 40;

    <g>
        <text x="0" y="@(y + 25)" font-size="15">@status</text>
        <rect x="100" y="@(y + 8)" width="@bredde" height="24" rx="4" fill="@Farve(status)" />
        <text x="@(108 + bredde)" y="@(y + 25)" font-size="15">@antal</text>
    </g>
}`,
        sprog: "razor", frag: true,
        noter: [
          ["for-løkken", "Én gang pr. status. `i` bruges til at lægge rækkerne 40 enheder under hinanden."],
          ["260 * antal / Stoerste", "Søjlens længde: den status med flest skader får 260, de andre en del af det."],
          ["int, ikke double", "Et kommatal ville blive skrevet med dansk komma, fx `173,3`. SVG kræver punktum, så `width=\"173,3\"` virker ikke. Heltal har intet komma."],
          ["<g>", "Samler én række. Den skal være der, fordi Razor ellers læser `<text>` som sit eget tag."]
        ] },
      { t: "forudsig",
        q: "Godkendt har 3 skader (flest), og Anmeldt har 2. Hvad skriver programmet? Husk, at `int` delt med `int` smider decimalerne væk.",
        kode: R`int antal = 2;
int stoerste = 3;

Console.WriteLine(260 * antal / stoerste);
Console.WriteLine(antal / stoerste * 260);
Console.WriteLine(260.0 * antal / stoerste);`,
        output: "173\n0\n173,33333333333334",
        fordi: "Første linje: 260 × 2 = 520, og 520 / 3 = 173 (decimalerne smides væk). Anden linje: 2 / 3 er 0 i heltal, og 0 × 260 er 0. Derfor ganger diagrammet **før** det deler. Tredje linje er et kommatal, og det skrives med dansk komma: det er derfor, diagrammet bruger heltal." },
      { t: "opgave", h: "Lav diagrammet", projekt: "SkadeApp", fortsaet: true, frag: true, fri: true, sprog: "razor",
        md: "Lav komponenten `Components/StatusDiagram.razor` ({{**Add → Razor Component…**||**Add → File**}}), og indsæt startkoden. `<svg>`-rammen og farverne er skrevet for dig. Du skriver resten: tællingen, den længste søjle og løkken, der tegner søjlerne. Trin 7 og 8 viser, hvordan det regnes ud.",
        krav: [
          "En metode `Antal(SkadeStatus status)`, der tæller skaderne med den status: `Skader.Count(…)`",
          "En property `Stoerste`: det største antal for alle statusser, men mindst 1 (`Math.Max(1, …)`), så der aldrig deles med 0",
          "Inde i `<svg>` en `for`-løkke over `statusser`, der for hver status regner `antal`, `bredde = 260 * antal / Stoerste` og `y = i * 40` ud som `int`",
          "For hver status en `<g>` med statusnavnet (`<text>` ved x 0), søjlen (`<rect>` ved x 100 med bredden, højden 24 og `Farve(status)`) og antallet (`<text>` lige efter søjlen)",
          "`Home.razor`: `<StatusDiagram Skader=\"skader\" />` lige under overskriften `Skader pr. status`",
          "Overblikket viser fire søjler: Anmeldt 2, Behandles 1, Godkendt 3 (længst) og Afvist 1"
        ],
        tip: [
          "`Antal` kan skrives på én linje med `=>`: `private int Antal(SkadeStatus status) => Skader.Count(s => s.Status == status);`",
          "`Stoerste`: `private int Stoerste => Math.Max(1, statusser.Max(s => Antal(s)));`. `Max` finder det største af de fire antal.",
          "Løkken står i trin 7. Husk `<g>` omkring de tre figurer, ellers læser Razor `<text>` som sit eget tag."
        ],
        start: R`@* Et søjlediagram tegnet med SVG: én vandret søjle pr. status. Søjlens længde passer til antallet af skader. *@
<svg viewBox="0 0 420 @(statusser.Length * 40)" width="100%" style="max-width: 520px" role="img" aria-label="Antal skader pr. status">
    @* Skriv for-løkken her: én <g> med <text>, <rect> og <text> pr. status *@
</svg>

@code {
    [Parameter] public List<Skade> Skader { get; set; } = new();

    private SkadeStatus[] statusser = Enum.GetValues<SkadeStatus>();

    @* Skriv Antal og Stoerste her *@

    // Samme farver som StatusMaerke (Bootstraps farver).
    private string Farve(SkadeStatus status) => status switch
    {
        SkadeStatus.Anmeldt => "#6c757d",
        SkadeStatus.Behandles => "#ffc107",
        SkadeStatus.Godkendt => "#198754",
        _ => "#dc3545"
    };
}`,
        output: "Under Skader pr. status står fire vandrette søjler i statussernes farver, med antallet efter hver søjle.",
        loesning: R`@* Et søjlediagram tegnet med SVG: én vandret søjle pr. status. Søjlens længde passer til antallet af skader. *@
<svg viewBox="0 0 420 @(statusser.Length * 40)" width="100%" style="max-width: 520px" role="img" aria-label="Antal skader pr. status">
    @for (int i = 0; i < statusser.Length; i++)
    {
        var status = statusser[i];
        int antal = Antal(status);
        int bredde = 260 * antal / Stoerste;   // heltal: SVG skal have punktum, ikke dansk komma
        int y = i * 40;

        @* <g> samler én række. Den skal være der, fordi Razor ellers læser <text> som sit eget tag. *@
        <g>
            <text x="0" y="@(y + 25)" font-size="15">@status</text>
            <rect x="100" y="@(y + 8)" width="@bredde" height="24" rx="4" fill="@Farve(status)" />
            <text x="@(108 + bredde)" y="@(y + 25)" font-size="15">@antal</text>
        </g>
    }
</svg>

@code {
    [Parameter] public List<Skade> Skader { get; set; } = new();

    private SkadeStatus[] statusser = Enum.GetValues<SkadeStatus>();

    private int Antal(SkadeStatus status) => Skader.Count(s => s.Status == status);

    // Den længste søjle er den status, der har flest skader. Mindst 1, så vi aldrig deler med 0.
    private int Stoerste => Math.Max(1, statusser.Max(s => Antal(s)));

    // Samme farver som StatusMaerke (Bootstraps farver).
    private string Farve(SkadeStatus status) => status switch
    {
        SkadeStatus.Anmeldt => "#6c757d",
        SkadeStatus.Behandles => "#ffc107",
        SkadeStatus.Godkendt => "#198754",
        _ => "#dc3545"
    };
}

@* Home.razor, lige under <h2 class="h4">Skader pr. status</h2>: *@
<StatusDiagram Skader="skader" />`,
        md2: "Diagrammet bruger de samme skader som resten af overblikket. Skift en skade til **Godkendt** på kundesiden, og gå tilbage til **Overblik**: søjlen er blevet længere.\n\n`role=\"img\"` og `aria-label` fortæller skærmlæsere, at det er et billede, og hvad det viser. `Math.Max(1, …)` giver det største af de to tal." },
      { t: "forklar", q: "Hvis du laver diagrammet: Hvordan tegner du det på overbliksiden, og hvorfor bruger du heltal?",
        svar: "Diagrammet er en komponent, StatusDiagram, som får listen med skader som parameter. For hver status tæller den skaderne med LINQ og tegner en SVG-rect, hvor bredden er 260 gange antallet delt med det største antal. Jeg ganger før jeg deler, fordi heltalsdivision ellers giver 0. Jeg bruger heltal, fordi et kommatal ville blive skrevet med dansk komma, og SVG kræver punktum.",
        noegle: ["komponent", "parameter", "SVG", "rect", "heltal", "dansk komma"] }
  ] },

  // ------------------------------------------------------------------
  { id: "m30v", titel: "Værksted: udvid SkadeApp, og find fejlen", vaerksted: true, min: 120, ord: [], trin: [
      { t: "laes", h: "Arbejd selv i en kopi af dit projekt",
        md: "I værkstedet arbejder du videre uden en opskrift. Din app er afleveret, og den skal du vise til eksamen. Lav derfor opgaverne i en **kopi**, `SkadeApp-oevelse`. Værkstedet sidst i modulet (del 2) viser, hvordan du laver kopien.\n\nEn Blazor-side skriver ikke noget i et sort vindue, som siden her kan sammenligne. Så gør sådan: læs kravene, byg, kør, og sæt flueben, efterhånden som kravene virker. Løsningsforslaget ligger bag en knap.\n\nOpgaverne er god træning til eksamen: censor kan bede dig forklare, hvordan du ville lave sådan en ændring." },
      { t: "opgave", h: "Søg i skaderne", projekt: "SkadeApp-oevelse", fortsaet: true, frag: true, fri: true, sprog: "razor",
        md: "Arbejd i din kopi `SkadeApp-oevelse`. Skadesiden skal have et søgefelt ligesom kundelisten, så man kan finde en skade ud fra beskrivelsen eller kundens navn.",
        krav: [
          "Over tabellen på `Skader.razor` står et søgefelt med pladsholderteksten `Søg i beskrivelse eller kundenavn …`",
          "Listen filtreres ved hvert tastetryk",
          "Søgningen er ligeglad med store og små bogstaver: `VAND` finder `Vandskade under opvaskemaskinen`",
          "Søgning på `parker` viser Peter Parkers to skader",
          "Søgningen virker sammen med filteret og sorteringen"
        ],
        tip: [
          "Du har gjort det samme på kundelisten: et felt `soegeord`, et input-felt med `@bind` og `@bind:event=\"oninput\"`, og en `Where` med `Contains(…, StringComparison.OrdinalIgnoreCase)`.",
          "Læg `Where` ind i `Viste`, før sorteringen. Kundens navn er `s.Kunde?.Navn`, som kan være `null`: skriv `(s.Kunde?.Navn ?? \"\")`. `??` betyder: brug teksten til højre, hvis det til venstre er `null`.",
          "`liste = liste.Where(s => s.Beskrivelse.Contains(soegeord, StringComparison.OrdinalIgnoreCase) || (s.Kunde?.Navn ?? \"\").Contains(soegeord, StringComparison.OrdinalIgnoreCase));`"
        ],
        output: "(Ingen udskrift: søg på \"parker\", og se, at der kun er to skader tilbage i tabellen.)",
        loesning: R`<!-- Over tabellen, fx lige under de to rullelister -->
<input class="form-control mb-3" style="max-width: 600px" placeholder="Søg i beskrivelse eller kundenavn …"
       @bind="soegeord" @bind:event="oninput" />

@code {
    private string soegeord = "";

    // I Viste, efter if-sætningen med statusFilter og før return:
    //     liste = liste.Where(s => s.Beskrivelse.Contains(soegeord, StringComparison.OrdinalIgnoreCase)
    //                           || (s.Kunde?.Navn ?? "").Contains(soegeord, StringComparison.OrdinalIgnoreCase));
}`,
        ekstra: ["Vis antallet af fundne skader i overskriften, fx `Alle skader (2)`.", "Lav søgningen, så den også finder skader ud fra typen, fx `bil`."] },
      { t: "opgave", h: "Fejlfinding: den nye kunde forsvinder", projekt: "SkadeApp-oevelse", fortsaet: true, frag: true, fri: true,
        md: "Arbejd i din kopi `SkadeApp-oevelse`. En kollega har \"ryddet op\" i `KundeService`, og nu sker der noget mærkeligt: når man opretter en kunde, kommer den grønne besked, men kunden står ikke i listen, og den er heller ikke der efter en genindlæsning. Erstat metoden `OpretAsync` i din `KundeService` med kollegaens udgave nedenfor, og find fejlen **med debuggeren**, før du læser tipsene.",
        krav: [
          "Du har sat et breakpoint i `OpretAsync` og gået metoden igennem én linje ad gangen",
          "Du kan sige, hvilken linje der mangler, og hvad den gør",
          "Efter din rettelse står en ny kunde i listen, også efter en genindlæsning (F5)"
        ],
        tip: [
          "Opret en kunde, mens breakpointet står i `OpretAsync`. Se, hvilke linjer der kører. Hvad gør `Add` egentlig: gemmer den i databasen?",
          "`Add` fortæller kun EF Core, at kunden skal tilføjes. Der mangler den linje, der sender ændringerne til databasen.",
          "Tilføj `await db.SaveChangesAsync();` som sidste linje i metoden."
        ],
        start: R`public async Task OpretAsync(Kunde kunde)
{
    using var db = _factory.CreateDbContext();
    db.Kunder.Add(kunde);
}`,
        output: "(Ingen udskrift: opret en kunde, tryk F5, og se, at kunden stadig står i listen.)",
        loesning: R`public async Task OpretAsync(Kunde kunde)
{
    using var db = _factory.CreateDbContext();
    db.Kunder.Add(kunde);
    await db.SaveChangesAsync();
}`,
        fordi: "Uden `SaveChangesAsync` bliver ændringen aldrig sendt til databasen. Compileren giver kun en advarsel (CS1998: en `async`-metode uden `await`), ikke en fejl, så appen kører. Læs advarslerne i {{Error List||Problems}}: de peger ofte lige på fejlen.",
        ekstra: ["Hvorfor kom den grønne besked alligevel? Find linjen i `Kunder.razor`, der skriver den, og forklar, hvorfor den ikke ved, om kunden blev gemt."] },
      { t: "opgave", h: "Postnummer på kunden", projekt: "SkadeApp-oevelse", fortsaet: true, frag: true, fri: true,
        md: "Arbejd i din kopi `SkadeApp-oevelse`. Selskabet vil kende kundens postnummer. Det er en opgave gennem alle lag: modellen, reglen, databasen, formularerne og tabellen. Husk, at databasen skal laves forfra, når modellen ændres.",
        krav: [
          "`Kunde` har en ny property `Postnummer` (string)",
          "Postnummeret skal udfyldes og være præcis 4 cifre (regulært udtryk), med de danske fejlbeskeder `Skriv kundens postnummer.` og `Postnummeret skal være 4 cifre.`",
          "Startdataene har et postnummer på alle fire kunder",
          "Formularen **Ny kunde** og formularen **Ret kunde** har et felt til postnummeret",
          "Kundelisten har en kolonne **Postnr.**",
          "`OpdaterAsync` gemmer også postnummeret"
        ],
        tip: [
          "Start i `Kunde.cs`: kopiér `Telefon` med dens to attributter, og ret navn, mønster og beskeder.",
          "Mønsteret er `^\\d{4}$`. I `HasData` skal hver kunde have `Postnummer = \"…\"`, ellers fejler valideringen ikke, men databasen får tomme postnumre. Stop appen, og slet `Data/skade.db`, før du kører igen.",
          "I `OpdaterAsync` mangler `gemt.Postnummer = kunde.Postnummer;`. I `StartRet` på kundesiden skal kopien også have `Postnummer = kunde.Postnummer`."
        ],
        output: "(Ingen udskrift: opret en kunde med postnummeret 800 og se fejlbeskeden, ret det til 8000, og se det i listen.)",
        loesning: R`// Kunde.cs
[Required(ErrorMessage = "Skriv kundens postnummer.")]
[RegularExpression(@"^\d{4}$", ErrorMessage = "Postnummeret skal være 4 cifre.")]
public string Postnummer { get; set; } = "";

// SkadeContext.cs (HasData): fx
new Kunde { Id = 1, Navn = "Mette Jensen", Email = "Mette@eksempel.com", Telefon = "12345678", Postnummer = "8000" },

// KundeService.OpdaterAsync
gemt.Postnummer = kunde.Postnummer;

// KundeDetaljer.razor, StartRet
rettet = new Kunde { Id = kunde!.Id, Navn = kunde.Navn, Email = kunde.Email, Telefon = kunde.Telefon, Postnummer = kunde.Postnummer };

// Formularerne: et felt mere som de andre
<div class="mb-3">
    <label class="form-label">Postnummer</label>
    <InputText class="form-control" @bind-Value="nyKunde.Postnummer" />
    <ValidationMessage For="() => nyKunde.Postnummer" />
</div>

// Kundelisten: <th>Postnr.</th> i overskriften og <td>@kunde.Postnummer</td> i rækken`,
        ekstra: ["Vis postnummeret på kundesiden ved siden af e-mail og telefon.", "Lad søgefeltet på kundelisten også søge på postnummer."] },
      { t: "ide", h: "Aflevering: zip-filen og WISEflow (allerede gjort)",
        md: "Du afleverede 30/10: projektet som en **zip-fil** og dispositionen som en **pdf**. Trinene står her, hvis du nogensinde skal lave en zip-fil af projektet igen.\n\nZip-filen skal kun indeholde din kode, ikke de filer, der laves, når projektet bygges eller køres.",
        win: ["Luk Visual Studio, så ingen filer er i brug.", "Åbn mappen med projektet i Stifinder (den mappe, hvor `SkadeApp.csproj` ligger).", "Slet mapperne `bin` og `obj`. Slet også `skade.db` og `app.db` i mappen `Data` (og filerne, der ender på `-shm` og `-wal`, hvis de findes). Alt sammen laves igen, næste gang projektet køres.", "Gå én mappe op, højreklik på mappen `SkadeApp` → **Komprimer til ZIP-fil**.", "Åbn zip-filen, og tjek, at `Program.cs`, `Components`, `Models`, `Services` og `Data` er med.", "Log ind på WISEflow med MitID (linket står i mailen fra kurser@itucation.dk), og upload zip-filen og pdf'en med dispositionen."],
        mac: ["Luk Rider, så ingen filer er i brug.", "Åbn mappen med projektet i Finder (den mappe, hvor `SkadeApp.csproj` ligger).", "Slet mapperne `bin` og `obj`. Slet også `skade.db` og `app.db` i mappen `Data` (og filerne, der ender på `-shm` og `-wal`, hvis de findes). Alt sammen laves igen, næste gang projektet køres.", "Gå én mappe op, højreklik på mappen `SkadeApp` → **Komprimer \"SkadeApp\"**.", "Åbn zip-filen, og tjek, at `Program.cs`, `Components`, `Models`, `Services` og `Data` er med.", "Log ind på WISEflow med MitID (linket står i mailen fra kurser@itucation.dk), og upload zip-filen og pdf'en med dispositionen."],
        md2: "Når appen startes første gang et nyt sted, er databasen tom for brugere. Så opretter man en bruger med **Opret bruger**. Det er godt at kunne sige til censor." }
  ] }

);
})();
