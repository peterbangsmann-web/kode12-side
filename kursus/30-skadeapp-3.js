// Modul 30, del 3 af 3: lektion 9–11 og værkstedet (kundeliste, kundeside, skadeside, test og aflevering). Se 30-skadeapp-1.js.
(function () {
const R = String.raw;
var m = window.KURSUS.filter(function (x) { return x.id === "m30"; })[0];
if (!m) return;

m.lektioner.push(

  // ------------------------------------------------------------------
  { id: "m30l9", titel: "Kundelisten: søgning og formular", min: 25,
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
      { t: "laes", h: "@bind: feltet og input-feltet følges ad",
        md: "Søgefeltet på kundelisten skal opdatere listen, mens man skriver. `@bind` forbinder et input-felt med et felt i `@code`. Med `@bind:event=\"oninput\"` sker det ved hvert tastetryk. Hver gang feltet ændres, tegner Blazor siden igen.",
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
          ["Contains(…, OrdinalIgnoreCase)", "Indeholder teksten søgeordet, uanset store og små bogstaver?"],
          ["Tomt søgeord", "Alle tekster indeholder den tomme tekst, så med et tomt søgefelt vises alle kunder."]
        ] },
      { t: "forudsig",
        q: "Samme søgning som på kundelisten, bare på en liste af navne. Hvad skriver programmet?",
        kode: R`List<string> navne = new List<string> { "Mette Jensen", "Ali Hassan", "Søren Nielsen", "Camilla Holm" };
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
      { t: "laes", h: "EditForm: en formular, der validerer",
        md: "Formularen til nye kunder er en `EditForm`. Den får et `Kunde`-objekt som model. `DataAnnotationsValidator` får den til at bruge reglerne fra lektion 5. Når man klikker på knappen, tjekker formularen reglerne: er de overholdt, kører `OnValidSubmit`. Ellers vises fejlbeskederne, og der bliver ikke gemt noget.",
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
          ["@bind-Value", "Som `@bind`, men til Blazors egne input-felter."],
          ["For=\"() => nyKunde.Navn\"", "Hvilket felts fejlbesked der vises her."],
          ["type=\"submit\"", "Knappen sender formularen."]
        ] },
      { t: "valg", q: "En bruger klikker **Opret kunde** med et tomt navn. Formularen har `OnValidSubmit=\"OpretKunde\"`. Hvad sker der?",
        svar: ["OpretKunde kører ikke. I stedet vises \"Skriv kundens navn.\" under feltet", "OpretKunde kører og gemmer en kunde uden navn", "Appen går ned", "Siden genindlæses"],
        ret: 0, fordi: "`OnValidSubmit` kører kun, når alle regler er overholdt. `[Required]` på `Navn` er ikke overholdt, så beskeden fra `ErrorMessage` vises." },
      { t: "valg", q: "Efter at en kunde er gemt, står der `nyKunde = new Kunde();` i `OpretKunde`. Hvorfor?",
        svar: ["Så formularen bliver tom og arbejder på et nyt objekt. Den gamle kunde har fået et id i databasen og må ikke gemmes igen", "Fordi new sletter den gamle kunde fra databasen", "For at validere kunden igen", "Det er ikke nødvendigt; det er bare pænt"],
        ret: 0, fordi: "Formularen viser `nyKunde`. Et nyt objekt giver tomme felter. Brugte man det gamle objekt igen, ville man prøve at gemme en kunde, der allerede har et id, og så melder databasen fejl." },
      { t: "ide", h: "Lav kundelisten",
        md: "Lav siden `Kunder.razor` med søgefelt, tabel og formular.",
        win: ["Højreklik på `Components/Pages` → **Add → Razor Component…** → `Kunder.razor`. Erstat indholdet med koden nedenfor.", "Kør appen, og klik på **Kunder** i menuen.", "Skriv `søren` i søgefeltet: kun Søren Nielsen er tilbage. Skriv `zzz`: der står, at ingen kunder passer. Slet teksten igen.", "Klik **Opret kunde** med tomme felter: tre røde fejlbeskeder. Skriv en e-mail uden @ og et telefonnummer med 4 cifre: to nye fejlbeskeder.", "Opret en rigtig kunde. Den står nu i listen, og der står en grøn besked."],
        mac: ["Højreklik på `Components/Pages` → **Add → File**, og kald filen `Kunder.razor`. Skriv koden nedenfor.", "Kør appen, og klik på **Kunder** i menuen.", "Skriv `søren` i søgefeltet: kun Søren Nielsen er tilbage. Skriv `zzz`: der står, at ingen kunder passer. Slet teksten igen.", "Klik **Opret kunde** med tomme felter: tre røde fejlbeskeder. Skriv en e-mail uden @ og et telefonnummer med 4 cifre: to nye fejlbeskeder.", "Opret en rigtig kunde. Den står nu i listen, og der står en grøn besked."],
        kode: R`@page "/kunder"
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
        sprog: "razor", frag: true,
        md2: "`Any()` er LINQ og svarer på, om der er mindst ét element. `$\"{nyKunde.Navn} er oprettet.\"` sætter navnet ind i teksten. Linket `kunder/@kunde.Id` fører til kundesiden, som du laver i næste lektion. Indtil da giver det en side om, at adressen ikke findes." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvordan virker valideringen i din formular, fra attributten til den røde tekst?",
        svar: "Reglerne står som attributter på modellen, fx [Required] og [RegularExpression] på Kunde. Formularen er en EditForm med Model=\"nyKunde\" og en DataAnnotationsValidator, som læser attributterne. Når man klikker på knappen, tjekker den alle regler. Er en regel brudt, viser ValidationMessage beskeden fra ErrorMessage under feltet, og OnValidSubmit kører ikke. Først når alt er i orden, kaldes OpretKunde, som gemmer gennem servicen.",
        noegle: ["attributter", "EditForm", "DataAnnotationsValidator", "ValidationMessage", "OnValidSubmit"] }
  ] },

  // ------------------------------------------------------------------
  { id: "m30l10", titel: "Kundesiden: ruteparameter, ret og slet", min: 30,
    ord: [
      ["Ruteparameter", "En del af adressen, som siden får som værdi: i `/kunder/3` er 3 parameteren."],
      ["{Id:int}", "I `@page \"/kunder/{Id:int}\"`: her står et tal, som kommer i propertyen `Id`. `:int` betyder, at kun tal passer."],
      ["OnParametersSetAsync", "Kører, hver gang siden får nye parametre, også når man går direkte fra én kunde til en anden."],
      ["@onclick", "Kører en metode, når der klikkes: `@onclick=\"StartRet\"` eller med en lambda: `@onclick=\"() => SletSkade(skade.Id)\"`."],
      ["NavigationManager", "En service, der kan sende brugeren til en anden side: `Navigation.NavigateTo(\"kunder\")`."],
      ["Cascade delete", "Når en række slettes, slettes de rækker, der peger på den, også. Slettes en kunde, forsvinder kundens skader."],
      ["ChangeEventArgs", "Oplysningerne om en ændring i et felt. `e.Value` er den nye værdi."],
      ["Enum.Parse", "Laver en tekst om til en enum-værdi: `Enum.Parse<SkadeStatus>(\"Godkendt\")`."]
    ],
    trin: [
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
      { t: "laes", h: "Slet og send brugeren videre",
        md: "Når kunden er slettet, findes siden ikke længere. Derfor sender `SletKunde` brugeren tilbage til kundelisten med `NavigationManager`, som siden får med `@inject NavigationManager Navigation`.\n\nKundens skader slettes automatisk med. EF Core har lavet fremmednøglen med **cascade delete**, fordi `KundeId` er en `int` og ikke må være tom: en skade kan ikke stå uden kunde.",
        kode: R`private async Task SletKunde()
{
    await KundeService.SletAsync(Id);
    Navigation.NavigateTo("kunder");
}`,
        frag: true },
      { t: "valg", q: "Ali Hassan har to skader. En sagsbehandler sletter Ali på kundesiden. Hvad sker der med de to skader?",
        svar: ["De slettes også (cascade delete), fordi en skade ikke kan stå uden kunde", "De bliver liggende uden kunde", "Sletningen afvises, fordi han har skader", "De flyttes til en anden kunde"],
        ret: 0, fordi: "Fremmednøglen `KundeId` er påkrævet, så EF Core har sat den op med cascade delete. Derfor spørger siden også: \"Slet Ali Hassan og alle kundens skader?\"" },
      { t: "laes", h: "Skift status, og anmeld en skade",
        md: "Status skiftes med en rulleliste ud for hver skade. Når man vælger, kommer en `ChangeEventArgs` med. `e.Value` er teksten fra det valgte, fx `\"Godkendt\"`, og `Enum.Parse` laver den om til en `SkadeStatus`.\n\nFormularen **Anmeld ny skade** er en `EditForm` ligesom på kundelisten, men med andre felter: `InputDate` til datoen, `InputSelect` til typen, `InputTextArea` til beskrivelsen og `InputNumber` til beløbet. Før skaden gemmes, får den kundens id: `nySkade.KundeId = Id;`.",
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
      { t: "ide", h: "Lav kundesiden",
        md: "Det er den største side. Skriv den i ro og mag, og byg undervejs, så du fanger slåfejl tidligt.",
        win: ["Lav `Components/Pages/KundeDetaljer.razor` (**Add → Razor Component…**), og skriv koden nedenfor.", "Kør appen. Gå til **Kunder**, og klik på **Mette Jensen**. Du ser hendes to skader og **Udbetalt i alt til kunden: 4.500,00 kr.**", "Skift status på vandskaden til **Godkendt**. Beløbet skifter til **23.250,00 kr.** Skift den tilbage til **Behandles**.", "Klik **Ret kunde**, ret navnet, og klik **Annullér**: navnet er uændret. Ret igen, og klik **Gem**.", "Anmeld en ny skade på en af dine egne kunder. Slet den bagefter med **Slet**.", "Skriv adressen `/kunder/999` i browseren: der står, at kunden ikke findes."],
        mac: ["Lav `Components/Pages/KundeDetaljer.razor` (**Add → File**), og skriv koden nedenfor.", "Kør appen. Gå til **Kunder**, og klik på **Mette Jensen**. Du ser hendes to skader og **Udbetalt i alt til kunden: 4.500,00 kr.**", "Skift status på vandskaden til **Godkendt**. Beløbet skifter til **23.250,00 kr.** Skift den tilbage til **Behandles**.", "Klik **Ret kunde**, ret navnet, og klik **Annullér**: navnet er uændret. Ret igen, og klik **Gem**.", "Anmeld en ny skade på en af dine egne kunder. Slet den bagefter med **Slet**.", "Skriv adressen `/kunder/999` i browseren: der står, at kunden ikke findes."],
        kode: R`@page "/kunder/{Id:int}"
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
}`,
        sprog: "razor", frag: true,
        md2: "`indlaest` skelner mellem \"henter stadig\" og \"findes ikke\": begge dele giver `kunde == null`, men kun efter hentningen er `indlaest` sand. `@( … ? … : … )` vælger mellem to tekster: før `:` hvis betingelsen er sand, ellers efter. `Enum.GetValues<SkadeStatus>()` giver alle fire statusser, så rullelisten får en linje for hver." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvordan ved kundesiden, hvilken kunde den skal vise, og hvad sker der, når man retter kunden?",
        svar: "Siden har @page \"/kunder/{Id:int}\", så tallet i adressen kommer i propertyen Id, der er markeret med [Parameter]. I OnParametersSetAsync henter siden kunden med KundeService.HentAsync(Id). Når man klikker Ret kunde, laves en kopi med new, og formularen retter i kopien, så Annullér ikke ændrer noget. Ved Gem sendes kopien til OpdaterAsync, som finder kunden i databasen, sætter de nye værdier og kalder SaveChangesAsync.",
        noegle: ["ruteparameter", "[Parameter]", "OnParametersSetAsync", "kopi", "OpdaterAsync", "SaveChangesAsync"] }
  ] },

  // ------------------------------------------------------------------
  { id: "m30l11", titel: "Skadesiden og test af hele appen", min: 25,
    ord: [
      ["Filtrering", "At vise kun de elementer, der passer, fx kun godkendte skader. Gøres med `Where`."],
      ["Sortering", "At sætte elementerne i rækkefølge. Gøres med `OrderBy` eller `OrderByDescending`."],
      ["CultureInfo", "Indstillinger for sprog og land, fx hvordan tal og datoer skrives. `da-DK` er dansk."],
      ["ToString(\"C\")", "Skriver et tal som et beløb i landets valuta: `4.500,00 kr.` på dansk."]
    ],
    trin: [
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
      { t: "ide", h: "Lav skadesiden",
        md: "Den sidste side. Når den virker, er alle fire sider i menuen færdige.",
        win: ["Lav `Components/Pages/Skader.razor` (**Add → Razor Component…**), og skriv koden nedenfor.", "Kør appen, og klik på **Skader** i menuen. Alle skader vises med den nyeste øverst.", "Vælg status **Godkendt**: kun de godkendte er tilbage. Vælg **Højeste beløb først**: rækkefølgen skifter."],
        mac: ["Lav `Components/Pages/Skader.razor` (**Add → File**), og skriv koden nedenfor.", "Kør appen, og klik på **Skader** i menuen. Alle skader vises med den nyeste øverst.", "Vælg status **Godkendt**: kun de godkendte er tilbage. Vælg **Højeste beløb først**: rækkefølgen skifter."],
        kode: R`@page "/skader"
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
}`,
        sprog: "razor", frag: true,
        md2: "`var viste = Viste.ToList();` regner listen ud én gang og gemmer den, så tabellen, antallet og summen bruger den samme liste." },
      { t: "laes", h: "Danske beløb",
        md: "I lektion 6 skrev du to linjer med `CultureInfo` øverst i `Program.cs`. De sætter appens sprog og land til dansk (`da-DK`). Derfor skriver `ToString(\"C\")` beløb som danske kroner med punktum ved tusinder og komma før øre.",
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
        md: "Nu er appen færdig. Gå den igennem fra ende til anden, før du afleverer. Start forfra med de rigtige startdata: stop appen, slet `skader.db` i projektmappen, og kør igen.",
        win: ["**Overblik**: 4 kunder, 3 åbne skader, 13.900,00 kr. udbetalt.", "**Kunder**: søg på `søren`, så på `zzz`. Prøv at oprette en tom kunde og en med forkert e-mail og telefon. Opret så en rigtig kunde.", "**Kundesiden** for din nye kunde: anmeld en skade på 12.000 kr. Prøv først at anmelde uden beskrivelse. Sæt skaden til **Godkendt**: udbetalt skal være 12.000,00 kr.", "Ret kunden, og prøv både **Annullér** og **Gem**.", "**Overblik** igen: nu er der udbetalt 25.900,00 kr. **Skader**: 8 skader. Filtrér på **Godkendt** (4 skader), og sortér efter beløb.", "Slet skaden, og slet så kunden. Du kommer tilbage til kundelisten, og kunden er væk.", "Skriv `/kunder/999` i adresselinjen: \"Kunden findes ikke.\""],
        mac: ["**Overblik**: 4 kunder, 3 åbne skader, 13.900,00 kr. udbetalt.", "**Kunder**: søg på `søren`, så på `zzz`. Prøv at oprette en tom kunde og en med forkert e-mail og telefon. Opret så en rigtig kunde.", "**Kundesiden** for din nye kunde: anmeld en skade på 12.000 kr. Prøv først at anmelde uden beskrivelse. Sæt skaden til **Godkendt**: udbetalt skal være 12.000,00 kr.", "Ret kunden, og prøv både **Annullér** og **Gem**.", "**Overblik** igen: nu er der udbetalt 25.900,00 kr. **Skader**: 8 skader. Filtrér på **Godkendt** (4 skader), og sortér efter beløb.", "Slet skaden, og slet så kunden. Du kommer tilbage til kundelisten, og kunden er væk.", "Skriv `/kunder/999` i adresselinjen: \"Kunden findes ikke.\""],
        md2: "Virker et punkt ikke, så sammenlign den fil, det handler om, med facit i `Desktop\\c#\\C#  Ekasmen\\Facit\\SkadeApp`. Sæt et breakpoint i den metode, der skulle køre, og se, om den bliver kaldt." },
      { t: "valg", q: "Til eksamen spørger censor: \"Hvad sker der i din app, når man vælger Godkendt i rullelisten på kundesiden?\" Hvilket svar er rigtigt?",
        svar: ["@onchange kalder SkiftStatus med skadens id. Den laver teksten om til en SkadeStatus, SkadeService gemmer den nye status med SaveChangesAsync, og siden henter kunden igen, så det udbetalte beløb opdateres", "Browseren gemmer statussen i en cookie", "Rullelisten ændrer databasen direkte uden C#", "Hele siden genindlæses fra serveren som en ny side"],
        ret: 0, fordi: "Det er hele kæden: hændelse på siden → metode i `@code` → service → EF Core → database, og så tegnes siden igen med de nye data." },
      { t: "forklar", q: "Eksamensspørgsmål: Vis din app for censor på to minutter. Hvad viser du, og i hvilken rækkefølge?",
        svar: "Jeg starter på Overblik og forklarer problemet: en sagsbehandler skal holde styr på kunder og skader. Så går jeg til Kunder, søger og opretter en kunde, også med en fejl, så valideringen ses. På kundesiden anmelder jeg en skade og sætter den til Godkendt, så det udbetalte beløb ændrer sig. Til sidst viser jeg Skader med filter og sortering, og Overblik igen, hvor tallene er opdateret. Undervejs peger jeg på, at siderne bruger services, og at data gemmes med EF Core i SQLite.",
        noegle: ["problemet", "validering", "kundesiden", "Godkendt", "filter", "services"] }
  ] },

  // ------------------------------------------------------------------
  { id: "m30v", titel: "Værksted: udvid SkadeApp, find fejlen, og aflever", vaerksted: true, min: 120, ord: [], trin: [
      { t: "laes", h: "Arbejd selv i dit eget projekt",
        md: "I værkstedet arbejder du videre i **dit eget SkadeApp-projekt** uden en opskrift. Opgaverne er ekstra: de gør projektet stærkere til eksamen, men appen virker også uden dem.\n\nEn Blazor-side skriver ikke noget i et sort vindue, som siden her kan sammenligne. Så gør sådan: læs kravene, byg, kør, og sæt flueben, efterhånden som kravene virker. Løsningsforslaget ligger bag en knap.\n\nVigtigst er den sidste opgave: afleveringen. Den skal være på WISEflow **før fredag 30/10 kl. 12:00**." },
      { t: "opgave", h: "Søg i skaderne", projekt: "SkadeApp", frag: true, fri: true, sprog: "razor",
        md: "Arbejd i dit SkadeApp-projekt. Skadesiden skal have et søgefelt ligesom kundelisten, så man kan finde en skade ud fra beskrivelsen eller kundens navn.",
        krav: [
          "Over tabellen på `Skader.razor` står et søgefelt med pladsholderteksten `Søg i beskrivelse eller kundenavn …`",
          "Listen filtreres ved hvert tastetryk",
          "Søgningen er ligeglad med store og små bogstaver: `VAND` finder `Vandskade under opvaskemaskinen`",
          "Søgning på `camilla` viser Camilla Holms to skader",
          "Søgningen virker sammen med filteret og sorteringen"
        ],
        tip: [
          "Du har gjort det samme på kundelisten: et felt `soegeord`, et input-felt med `@bind` og `@bind:event=\"oninput\"`, og en `Where` med `Contains(…, StringComparison.OrdinalIgnoreCase)`.",
          "Læg `Where` ind i `Viste`, før sorteringen. Kundens navn er `s.Kunde?.Navn`, som kan være `null`: skriv `(s.Kunde?.Navn ?? \"\")`. `??` betyder: brug teksten til højre, hvis det til venstre er `null`.",
          "`liste = liste.Where(s => s.Beskrivelse.Contains(soegeord, StringComparison.OrdinalIgnoreCase) || (s.Kunde?.Navn ?? \"\").Contains(soegeord, StringComparison.OrdinalIgnoreCase));`"
        ],
        output: "(Ingen udskrift: søg på \"camilla\", og se, at der kun er to skader tilbage i tabellen.)",
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
      { t: "opgave", h: "Fejlfinding: den nye kunde forsvinder", projekt: "SkadeApp", frag: true, fri: true,
        md: "Arbejd i dit SkadeApp-projekt. En kollega har \"ryddet op\" i `KundeService`, og nu sker der noget mærkeligt: når man opretter en kunde, kommer den grønne besked, men kunden står ikke i listen, og den er heller ikke der efter en genindlæsning. Erstat metoden `OpretAsync` i din `KundeService` med kollegaens udgave nedenfor, og find fejlen **med debuggeren**, før du læser tipsene.",
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
      { t: "opgave", h: "Postnummer på kunden", projekt: "SkadeApp", frag: true, fri: true,
        md: "Arbejd i dit SkadeApp-projekt. Selskabet vil kende kundens postnummer. Det er en opgave gennem alle lag: modellen, reglen, databasen, formularerne og tabellen. Husk, at databasen skal laves forfra, når modellen ændres.",
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
          "Mønsteret er `^\\d{4}$`. I `HasData` skal hver kunde have `Postnummer = \"…\"`, ellers fejler valideringen ikke, men databasen får tomme postnumre. Stop appen, og slet `skader.db`, før du kører igen.",
          "I `OpdaterAsync` mangler `gemt.Postnummer = kunde.Postnummer;`. I `StartRet` på kundesiden skal kopien også have `Postnummer = kunde.Postnummer`."
        ],
        output: "(Ingen udskrift: opret en kunde med postnummeret 800 og se fejlbeskeden, ret det til 8000, og se det i listen.)",
        loesning: R`// Kunde.cs
[Required(ErrorMessage = "Skriv kundens postnummer.")]
[RegularExpression(@"^\d{4}$", ErrorMessage = "Postnummeret skal være 4 cifre.")]
public string Postnummer { get; set; } = "";

// SkadeContext.cs (HasData): fx
new Kunde { Id = 1, Navn = "Mette Jensen", Email = "mette@eksempel.dk", Telefon = "22334455", Postnummer = "8000" },

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
      { t: "ide", h: "Aflevering: zip-filen og WISEflow",
        md: "Du afleverer to filer på WISEflow: projektet som en **zip-fil** og dispositionen som en **pdf**. Fristen er **fredag 30/10 kl. 12:00**. Upload hellere torsdag end fredag morgen.\n\nZip-filen skal kun indeholde din kode, ikke de filer, der laves, når projektet bygges eller køres.",
        win: ["Luk Visual Studio, så ingen filer er i brug.", "Åbn mappen med projektet i Stifinder (den mappe, hvor `SkadeApp.csproj` ligger).", "Slet mapperne `bin` og `obj` og filen `skader.db` (og `skader.db-shm` og `skader.db-wal`, hvis de findes). De laves igen, næste gang projektet køres.", "Gå én mappe op, højreklik på mappen `SkadeApp` → **Komprimer til ZIP-fil**.", "Åbn zip-filen, og tjek, at `Program.cs`, `Components`, `Models`, `Services` og `Data` er med.", "Log ind på WISEflow med MitID (linket står i mailen fra kurser@itucation.dk), og upload zip-filen og pdf'en med dispositionen."],
        mac: ["Luk Rider, så ingen filer er i brug.", "Åbn mappen med projektet i Finder (den mappe, hvor `SkadeApp.csproj` ligger).", "Slet mapperne `bin` og `obj` og filen `skader.db` (og `skader.db-shm` og `skader.db-wal`, hvis de findes). De laves igen, næste gang projektet køres.", "Gå én mappe op, højreklik på mappen `SkadeApp` → **Komprimer \"SkadeApp\"**.", "Åbn zip-filen, og tjek, at `Program.cs`, `Components`, `Models`, `Services` og `Data` er med.", "Log ind på WISEflow med MitID (linket står i mailen fra kurser@itucation.dk), og upload zip-filen og pdf'en med dispositionen."],
        md2: "Dispositionen er højst én side i stikord. Lektionen om dispositionen i modul 28 viser, hvad den skal indeholde. Vi skriver den sammen ud fra dit projekt." }
  ] }

);
})();
