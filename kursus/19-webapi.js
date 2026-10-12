// Modul 19 — REST og Web API. Forudsætter: modul 0–18 (især 7 interfaces, 9 JSON, 15 fetch, 16 MVC, 17 EF Core).
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m19", nr: 19, del: "Del 5 · ASP.NET Core", ikon: "🔌",
  titel: "REST og Web API",
  dag: "Kursusdag 16 · REST og Core Web API",
  intro: "Indtil nu har din server sendt **færdige HTML-sider**. Et **Web API** sender i stedet **data** som JSON, så andre programmer kan bruge dem: JavaScript i browseren, en mobil-app, Blazor eller et helt andet system.\n\nI dette modul bygger du ét API, `PersonApi`, trin for trin: først en controller med en liste, så et **repository** bag et **interface** med **dependency injection**, og til sidst en rigtig database. Du afprøver det med Swagger, Scalar og `.http`-filer og kalder det fra C# og JavaScript. I værkstedet bygger du et nyt API, `BookApi`, helt selv.\n\nDependency injection og SOLID's D er klassiske eksamensspørgsmål, så du træner også i at **forklare** dem.",
  video: ["16-Man_WebServices.mp4 (3 t 33 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m19l1", titel: "Web services, REST og JSON", min: 15,
    ord: [
      ["Web service", "Et program på en server, som andre programmer kan sende forespørgsler til over HTTP og få data tilbage fra."],
      ["API", "Application Programming Interface. Her: de adresser på en server, et andet program kan kalde for at få eller ændre data."],
      ["Web API", "Microsofts projekttype til et API i ASP.NET Core. Svarer med data (typisk JSON) i stedet for HTML-sider."],
      ["REST", "En måde at bygge web-API'er på: adressen siger, hvilken ting (ressource) det handler om, og HTTP-metoden siger, hvad der skal ske med den."],
      ["Ressource", "En ting, API'et holder styr på, fx personer. Har sin egen adresse: `/api/Persons`."],
      ["Endpoint", "Én bestemt kombination af HTTP-metode og adresse, fx `GET /api/Persons/2`."],
      ["Statuskode", "Det tal, serveren svarer med først: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found, 500 Internal Server Error."],
      ["CRUD", "Create, Read, Update, Delete: de fire ting, man gør ved data. I REST: POST, GET, PUT og DELETE."]
    ],
    trin: [
      { t: "laes", h: "Fra sider til data",
        md: "I modul 16 og 17 sendte din MVC-controller et **view** tilbage: en færdig HTML-side, som browseren viser.\n\nEt **Web API** sender ingen sider. Det sender **data**, og det er klienten, der bestemmer, hvordan de skal vises. Klienten kan være JavaScript i en browser (det lærte du i modul 15 med `fetch`), en mobil-app, Blazor (modul 22–24) eller et andet firmas program.\n\nSådan ser et svar fra et Web API ud, når klienten beder om alle personer. Det er **JSON**, som du kender fra modul 9 og 15:",
        sprog: "js",
        kode: R`[{"id":1,"name":"Ole","city":"Valby"},{"id":2,"name":"Kim","city":"Kalby"},{"id":3,"name":"Sanne","city":"Salby"}]`,
        noter: [
          ["[ … ]", "Firkantede klammer: en liste (et array) af objekter."],
          ["{ … }", "Tuborgklammer: ét objekt, her én person."],
          ["\"name\":\"Kim\"", "Et navn og en værdi. Navnene starter med lille bogstav i JSON, selvom din C#-property hedder `Name`."]
        ],
        md2: "**Hvorfor er det smart?** Den samme server kan bruges af mange forskellige klienter. Og der skal kun sendes data frem og tilbage, ikke hele sider, så det går hurtigt." },
      { t: "valg", q: "Hvad sender et Web API typisk tilbage til klienten?",
        svar: ["Data, typisk som JSON", "En færdig HTML-side med layout", "Et view, som browseren skal oversætte", "C#-koden fra controlleren"],
        ret: 0, fordi: "Et Web API har ingen views. Det sender **data**, og klienten bestemmer selv, hvordan de vises." },
      { t: "laes", h: "REST: adressen er et navneord, metoden er et udsagnsord",
        md: "**REST** er den måde, næsten alle web-API'er er bygget på. To regler er nok til at komme i gang:\n\n1. **Adressen siger, hvilken ting det handler om.** Tingen hedder en **ressource**: `/api/Persons` er alle personer, `/api/Persons/2` er personen med id 2.\n2. **HTTP-metoden siger, hvad der skal ske.** Du kender GET og POST fra formularer i modul 13 og 16. Et API bruger også PUT og DELETE.\n\nSammen giver de fire metoder præcis **CRUD**: de fire ting, man gør ved data.",
        noter: [
          ["GET /api/Persons", "**Read**: hent alle personer."],
          ["GET /api/Persons/2", "**Read**: hent personen med id 2."],
          ["POST /api/Persons", "**Create**: opret en ny person. Personen sendes med som JSON."],
          ["PUT /api/Persons/2", "**Update**: ret personen med id 2. De nye værdier sendes med som JSON."],
          ["DELETE /api/Persons/2", "**Delete**: slet personen med id 2."]
        ],
        md2: "Læg mærke til, at der ikke står `/api/Persons/Delete/2` eller `/api/HentAlle`. Adressen indeholder ingen udsagnsord, for det er metoden, der er udsagnsordet. Én kombination af metode og adresse kaldes et **endpoint**." },
      { t: "udfyld", sprog: "text", q: "Skriv den HTTP-metode, der passer til hver forespørgsel i et REST-API.",
        kode: R`[[GET]] /api/Persons        (hent alle)
[[POST]] /api/Persons       (opret en ny)
[[PUT]] /api/Persons/4      (ret person 4)
[[DELETE]] /api/Persons/4   (slet person 4)`,
        fordi: "GET læser, POST opretter, PUT retter, DELETE sletter. Opret har intet id i adressen, for den nye person har ikke fået et id endnu — det giver serveren den." },
      { t: "valg", q: "Du vil slette personen med id 7 i et REST-API. Hvilken forespørgsel er den rigtige?",
        svar: ["DELETE /api/Persons/7", "GET /api/Persons/Delete/7", "POST /api/DeletePerson?id=7", "DELETE /api/Persons"],
        ret: 0, fordi: "Adressen peger på **den ene person** (`/api/Persons/7`), og metoden siger **slet**. `DELETE /api/Persons` uden id ville betyde \"slet alle personer\" — det vil man sjældent tillade." },
      { t: "laes", h: "Statuskoder: svarets første ord",
        md: "Hvert svar fra serveren starter med en **statuskode**. Den fortæller klienten, om det gik godt, **før** den læser dataene. Første ciffer siger, hvilken slags svar det er:\n\n- **2xx**: det lykkedes.\n- **4xx**: klienten har gjort noget forkert (forkert adresse, manglende data).\n- **5xx**: serveren har en fejl (en exception i din kode).",
        noter: [
          ["200 OK", "Det gik godt, og dataene står i svaret. Typisk svar på GET."],
          ["201 Created", "Noget blev oprettet. Svar på en POST, der lykkedes."],
          ["204 No Content", "Det gik godt, men der er intet at sende tilbage. Typisk svar på PUT og DELETE."],
          ["400 Bad Request", "Klienten sendte noget ugyldigt, fx en person uden navn."],
          ["404 Not Found", "Det, klienten bad om, findes ikke, fx `/api/Persons/99`."],
          ["500 Internal Server Error", "Der skete en fejl i serverens kode."]
        ] },
      { t: "valg", q: "En klient sender `DELETE /api/Persons/3`. Personen bliver slettet, og der er ikke noget at sende tilbage. Hvilken statuskode passer bedst?",
        svar: ["204 No Content", "404 Not Found", "500 Internal Server Error", "400 Bad Request"],
        ret: 0, fordi: "2xx betyder, at det lykkedes. **204** siger desuden, at svaret ikke har noget indhold. Sender klienten den samme DELETE en gang til, er personen væk, og så er svaret **404**." },
      { t: "valg", q: "En klient sender en POST med en ny person, men glemmer navnet, som er påkrævet. Hvilken slags statuskode skal API'et svare med?",
        svar: ["En 4xx-kode (400 Bad Request), for det er klienten, der har sendt noget forkert", "En 5xx-kode, for serveren kunne ikke gemme personen", "200 OK, og så gemmes personen uden navn", "201 Created"],
        ret: 0, fordi: "4xx betyder **klientens fejl**, 5xx betyder **serverens fejl**. Her er det klienten, der skal rette sin forespørgsel. Du ser i næste lektion, at ASP.NET selv svarer 400, når et `[Required]`-felt mangler." },
      { t: "laes", h: "JSON fra C#",
        md: "I modul 9 lavede du JSON med `JsonSerializer`. Det er præcis det, ASP.NET gør med dine objekter, når et API svarer. Der er én forskel: ASP.NET bruger **web-indstillingerne**, hvor navnene starter med **lille bogstav** (det hedder *camelCase*). Det er normen i JSON, fordi JavaScript-folk skriver sådan.",
        kode: R`using System.Text.Json;

Person p = new Person { Id = 1, Name = "Ole", City = "Valby" };

Console.WriteLine(JsonSerializer.Serialize(p));

JsonSerializerOptions web = new JsonSerializerOptions(JsonSerializerDefaults.Web);
Console.WriteLine(JsonSerializer.Serialize(p, web));

class Person
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string City { get; set; } = "";
}`,
        noter: [
          ["using System.Text.Json;", "Her bor `JsonSerializer`. Skal stå øverst i filen."],
          ["JsonSerializer.Serialize(p)", "Laver objektet om til en JSON-tekst. Navnene skrives, som de står i C#."],
          ["JsonSerializerDefaults.Web", "Web-indstillingerne: små forbogstaver, og ved indlæsning er store og små bogstaver lige meget."]
        ],
        output: "{\"Id\":1,\"Name\":\"Ole\",\"City\":\"Valby\"}\n{\"id\":1,\"name\":\"Ole\",\"city\":\"Valby\"}" },
      { t: "forudsig", q: "Hvad skriver programmet? (Web-indstillingerne giver små forbogstaver.)",
        kode: R`using System.Text.Json;

List<Person> personer = new List<Person>
{
    new Person { Id = 1, Name = "Ole" },
    new Person { Id = 2, Name = "Kim" }
};

JsonSerializerOptions web = new JsonSerializerOptions(JsonSerializerDefaults.Web);
Console.WriteLine(JsonSerializer.Serialize(personer, web));

class Person
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
}`,
        output: "[{\"id\":1,\"name\":\"Ole\"},{\"id\":2,\"name\":\"Kim\"}]",
        fordi: "En liste bliver til et JSON-array med `[ ]`, og hvert objekt til `{ }`. Der er ingen mellemrum, og navnene har lille forbogstav. Det er præcis sådan, dit API kommer til at svare på `GET /api/Persons`." },
      { t: "forudsig", q: "Nu går det den anden vej: fra JSON til et C#-objekt. Det sker, når en klient sender en ny person med en POST. Hvad skriver programmet?",
        kode: R`using System.Text.Json;

string json = "{\"id\":2,\"name\":\"Kim\",\"city\":\"Kalby\"}";

JsonSerializerOptions web = new JsonSerializerOptions(JsonSerializerDefaults.Web);
Person? p = JsonSerializer.Deserialize<Person>(json, web);

if (p != null)
{
    Console.WriteLine(p.Name);
    Console.WriteLine(p.Id + 10);
}

class Person
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string City { get; set; } = "";
}`,
        output: "Kim\n12",
        fordi: "`Deserialize<Person>` laver et rigtigt `Person`-objekt ud fra teksten. Med web-indstillingerne passer `\"name\"` til propertyen `Name`, selvom bogstaverne er forskellige. `Id` er en rigtig `int`, så `p.Id + 10` giver 12. `Deserialize` kan give `null` (fx hvis teksten er `null`), derfor tjekket `p != null`." },
      { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: Hvad er et REST-API, og hvordan hænger HTTP-metoderne sammen med CRUD?",
        svar: "Et REST-API er en web service, der svarer med **data**, typisk **JSON**, i stedet for HTML-sider. **Adressen** angiver **ressourcen**, fx `/api/Persons` eller `/api/Persons/2`, og **HTTP-metoden** angiver handlingen: **GET** læser (Read), **POST** opretter (Create), **PUT** retter (Update) og **DELETE** sletter (Delete). Serveren svarer med en **statuskode**: 2xx når det lykkedes, fx 200, 201 eller 204, 4xx når klienten har lavet en fejl, fx 404, og 5xx når serveren fejler.",
        noegle: ["ressource", "JSON", "GET", "POST", "PUT", "DELETE", "statuskode"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m19l2", titel: "Dit første Web API: PersonApi", min: 20,
    ord: [
      ["[ApiController]", "Attribut over en controller: den leverer data, ikke views. Giver automatisk 400-svar ved ugyldige data."],
      ["ControllerBase", "Klassen en API-controller arver fra. Det er `Controller` uden alt det, der har med views at gøre."],
      ["Attribute routing", "Ruten står som en attribut over controlleren eller actionen, fx `[Route(\"api/[controller]\")]`, i stedet for i `Program.cs`."],
      ["ActionResult<T>", "Returtype for en action, der enten giver data af typen T (svar 200) eller et andet svar som `NotFound()`."],
      ["NotFound()", "Svar med statuskode 404: det findes ikke."],
      ["CreatedAtAction", "Svar med statuskode 201 og en `Location`-header med adressen på det, der lige blev oprettet."],
      ["launchSettings.json", "Fil under Properties, der bestemmer, hvordan projektet starter: portnummer, og om en browser åbnes."]
    ],
    trin: [
      { t: "laes", h: "Et Web API-projekt ligner MVC — minus views",
        md: "Et Web API bygges med de samme byggeklodser som MVC fra modul 16: `Program.cs`, controllere, actions og modeller. Forskellene er få:",
        noter: [
          ["Ingen Views-mappe", "Der er ingen HTML at lave. Actions returnerer data."],
          ["ControllerBase", "Controllerne arver fra `ControllerBase` i stedet for `Controller`."],
          ["[ApiController]", "En attribut over controlleren, der slår API-opførsel til."],
          ["AddControllers()", "I `Program.cs` står `AddControllers()` i stedet for `AddControllersWithViews()`."],
          ["Ruten står over controlleren", "I stedet for den fælles rute `{controller=Home}/{action=Index}/{id?}` har hver controller sin egen `[Route]`."]
        ],
        md2: "I resten af modulet bygger du ét API, `PersonApi`, der holder styr på personer med et id, et navn og en by. Lektion for lektion bliver det bedre: først data i en liste, så et repository med dependency injection, så en database." },
      { t: "ide", h: "Opret projektet PersonApi",
        md: "Opret projektet, og kør det, før du ændrer noget. Så ved du, at alt virker fra start.",
        win: [
          "Start Visual Studio, og vælg **Create a new project**.",
          "Søg efter **ASP.NET Core Web API**, vælg den (C#), og klik **Next**.",
          "Skriv `PersonApi` som projektnavn, og klik **Next**.",
          "På næste skærm: vælg **.NET 10**. Fjern fluebenet ved **Configure for HTTPS** (så er adresserne enklere, ligesom hos underviseren). Behold **Enable OpenAPI support**. Sæt flueben ved **Use controllers**. Klik **Create**.",
          "Klik på den grønne pil ▶ (**http**) for at køre. Et konsolvindue viser linjen `Now listening on: http://localhost:XXXX`. Tallet er dit portnummer.",
          "Åbn en browser, og skriv adressen fra konsolvinduet efterfulgt af `/weatherforecast`, fx `http://localhost:5257/weatherforecast`. Du ser JSON med fem vejrudsigter.",
          "Stop programmet med den røde firkant ■."
        ],
        mac: [
          "Åbn programmet **Terminal**, og gå til mappen, hvor dine projekter ligger (fx `cd ~/RiderProjects`).",
          "Skriv `dotnet new webapi -n PersonApi --use-controllers --no-https` og tryk Enter. Det laver projektet med controllere og uden HTTPS.",
          "Åbn Rider, vælg **Open**, og vælg mappen `PersonApi`.",
          "Klik på den grønne pil ▶ øverst for at køre. I Run-vinduet nederst står `Now listening on: http://localhost:XXXX`. Tallet er dit portnummer.",
          "Åbn en browser, og skriv adressen efterfulgt af `/weatherforecast`, fx `http://localhost:5257/weatherforecast`. Du ser JSON med fem vejrudsigter.",
          "Stop programmet med den røde firkant ■."
        ],
        md2: "Dit portnummer er sikkert et andet end 5257. Det vælges tilfældigt, når projektet oprettes, og står i `Properties/launchSettings.json`. Brug dit eget nummer i alle adresser i dette modul." },
      { t: "laes", h: "Rundtur i de genererede filer",
        md: "Til eksamen kan du blive spurgt, hvad filerne i dit projekt er til. Her er alle de filer, skabelonen har lavet:",
        noter: [
          ["Program.cs", "Programmets start. Registrerer services og bygger rækkefølgen af trin, en forespørgsel går igennem. Gennemgås linje for linje om lidt."],
          ["Controllers/WeatherForecastController.cs", "En eksempel-controller, der svarer med tilfældige vejrudsigter. Den sletter du snart."],
          ["WeatherForecast.cs", "Modellen til eksemplet. Slettes sammen med controlleren."],
          ["PersonApi.http", "En fil med test-forespørgsler, som kan sendes direkte fra Visual Studio eller Rider. Bruges i lektion 5."],
          ["appsettings.json", "Indstillinger, fx logning og senere din connection string."],
          ["appsettings.Development.json", "Ekstra indstillinger, der kun gælder, mens du udvikler."],
          ["Properties/launchSettings.json", "Hvordan projektet starter: `applicationUrl` (adressen og porten), `launchBrowser` (om en browser åbnes) og `launchUrl` (hvilken side)."],
          ["PersonApi.csproj", "Projektfilen: .NET-versionen og de NuGet-pakker, projektet bruger. Her står allerede `Microsoft.AspNetCore.OpenApi`."]
        ] },
      { t: "valg", q: "Du vil have, at browseren åbner af sig selv på en bestemt side, når du starter API'et. Hvilken fil skal du rette i?",
        svar: ["Properties/launchSettings.json", "appsettings.json", "PersonApi.csproj", "Program.cs"],
        ret: 0, fordi: "`launchSettings.json` styrer, hvordan projektet **starter**: `\"launchBrowser\": true` åbner browseren, og `\"launchUrl\"` er den side, den åbner på. Det bruger du i lektion 5 til at åbne Swagger." },
      { t: "laes", h: "Program.cs linje for linje",
        md: "`Program.cs` har to halvdele. **Før** `builder.Build()` fortæller du, hvilke **services** (tjenester) programmet skal have. **Efter** bygger du den **pipeline**: de trin, hver forespørgsel løber igennem, i rækkefølge.",
        frag: true,
        kode: R`var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseAuthorization();

app.MapControllers();

app.Run();`,
        noter: [
          ["WebApplication.CreateBuilder(args)", "Laver en builder: den læser `appsettings.json`, slår logning til og har en tom liste af services."],
          ["builder.Services.AddControllers()", "Registrér controllere **uden** views. I MVC stod der `AddControllersWithViews()`."],
          ["builder.Services.AddOpenApi()", "Registrér det, der laver en beskrivelse af dit API (OpenAPI). Bruges i lektion 5."],
          ["builder.Build()", "Byg selve applikationen. Herefter kan du ikke tilføje flere services."],
          ["app.Environment.IsDevelopment()", "Sand, når du kører på din egen maskine. Beskrivelsen af API'et vises kun, mens du udvikler."],
          ["app.MapOpenApi()", "Gør beskrivelsen tilgængelig på adressen `/openapi/v1.json`."],
          ["app.UseAuthorization()", "Trinnet, der tjekker adgang, når du bruger `[Authorize]` i modul 20."],
          ["app.MapControllers()", "Kobl controllernes `[Route]`-attributter til adresser. Uden den linje svarer ingen controller."],
          ["app.Run()", "Start serveren. Den kører og venter på forespørgsler, indtil du stopper den."]
        ] },
      { t: "udfyld", frag: true, q: "Udfyld de to linjer, der slår controllere til i et Web API: én der **registrerer** dem som service, og én der **kobler** deres ruter til adresser.",
        kode: R`var builder = WebApplication.CreateBuilder(args);
builder.Services.[[AddControllers]]();

var app = builder.Build();
app.[[MapControllers]]();
app.Run();`,
        fordi: "`AddControllers()` står før `Build()`, fordi det er en service. `MapControllers()` står efter, fordi det er en del af pipelinen. I et MVC-projekt ville den første hedde `AddControllersWithViews()`." },
      { t: "laes", h: "En API-controller med en liste",
        md: "Nu skal API'et kende personer. Modellen `Person` (i mappen **Models**) har `Id`, `Name` og `City`, og `[Required]` på `Name` — det kender du fra modul 16.\n\nSå controlleren. Personerne ligger foreløbig i en liste i controlleren. Det er ikke en god løsning, og den flytter ud i næste lektion, men det er det enkleste sted at starte. Sådan ser den ud med to actions: én, der giver alle personer, og én, der giver én person.",
        frag: true,
        kode: R`using Microsoft.AspNetCore.Mvc;
using PersonApi.Models;

namespace PersonApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PersonsController : ControllerBase
{
    private static List<Person> personer = new List<Person>
    {
        new Person { Id = 1, Name = "Ole", City = "Valby" },
        new Person { Id = 2, Name = "Kim", City = "Kalby" },
        new Person { Id = 3, Name = "Sanne", City = "Salby" }
    };

    // GET: api/Persons
    [HttpGet]
    public ActionResult<IEnumerable<Person>> GetPersons()
    {
        return personer;
    }

    // GET: api/Persons/2
    [HttpGet("{id}")]
    public ActionResult<Person> GetPerson(int id)
    {
        Person? person = personer.Find(p => p.Id == id);
        if (person == null)
        {
            return NotFound();
        }
        return person;
    }
}`,
        noter: [
          ["[Route(\"api/[controller]\")]", "Controllerens adresse. `[controller]` erstattes af klassens navn uden ordet Controller: `api/Persons`."],
          ["[ApiController]", "Det er en API-controller. Den svarer selv 400, hvis data ikke opfylder fx `[Required]`."],
          [": ControllerBase", "Arv fra `ControllerBase` — controller uden views."],
          ["private static List<Person>", "`static`, fordi ASP.NET laver et **nyt controller-objekt for hver forespørgsel**. Uden `static` ville listen blive lavet forfra hver gang."],
          ["[HttpGet]", "Denne action svarer på GET til controllerens adresse: `GET api/Persons`."],
          ["ActionResult<IEnumerable<Person>>", "Returnerer enten en samling personer (svar 200 med JSON) eller et andet svar."],
          ["[HttpGet(\"{id}\")]", "Svarer på GET med noget efter adressen: `api/Persons/2`. Tallet havner i parameteren `id`."],
          ["return NotFound();", "Svar 404. Du kan også skrive `return Ok(person);` i stedet for `return person;` — det giver begge 200."]
        ] },
      { t: "valg", q: "Controlleren hedder `PersonsController` og har `[Route(\"api/[controller]\")]`. Actionen har `[HttpGet(\"{id}\")]`. Hvilken adresse rammer actionen med id 3?",
        svar: ["/api/Persons/3", "/Persons/GetPerson/3", "/api/PersonsController/3", "/api/[controller]/3"],
        ret: 0, fordi: "`[controller]` bliver til `Persons`, og `{id}` til tallet. Store og små bogstaver er ligegyldige i adressen, så `/api/persons/3` virker også (afprøvet)." },
      { t: "valg", q: "Listen har personer med id 1, 2 og 3. En klient sender `GET /api/Persons/99`. Hvad svarer API'et?",
        svar: ["Statuskode 404 Not Found", "Statuskode 200 og en tom person", "Statuskode 500, fordi `Find` går ned", "Statuskode 200 og den første person"],
        ret: 0, fordi: "`Find` giver `null`, når ingen passer. Så kører `return NotFound();`. Afprøvet: svaret er 404 med en lille JSON-tekst, der indeholder `\"title\":\"Not Found\",\"status\":404`." },
      { t: "laes", h: "POST: opret en person med CreatedAtAction",
        md: "Den tredje action opretter en person. Klienten sender personen som JSON i forespørgslens **body** (indhold). `[ApiController]` sørger for, at JSON'en bliver lavet om til et `Person`-objekt i parameteren — det er det, du så med `Deserialize` i lektion 1.",
        frag: true,
        kode: R`// POST: api/Persons
[HttpPost]
public ActionResult<Person> PostPerson(Person person)
{
    person.Id = personer.Max(p => p.Id) + 1;
    personer.Add(person);
    return CreatedAtAction(nameof(GetPerson), new { id = person.Id }, person);
}`,
        noter: [
          ["[HttpPost]", "Svarer på POST til `api/Persons`."],
          ["Person person", "Personen fra forespørgslens body. Uden id — det giver serveren."],
          ["personer.Max(p => p.Id) + 1", "Det største id i listen plus én (LINQ fra modul 9)."],
          ["CreatedAtAction(…)", "Svar **201 Created** med personen som JSON."],
          ["nameof(GetPerson)", "Navnet på actionen, der kan hente den nye person. `nameof` giver navnet som tekst, og compileren tjekker, at den findes."],
          ["new { id = person.Id }", "Værdien til `{id}` i den actions rute. Sammen bliver det adressen `api/Persons/4`, som sendes med i svarets **Location**-header."]
        ],
        md2: "Afprøvet: en POST med `{\"name\":\"Lars\",\"city\":\"Visby\"}` giver `201 Created`, headeren `Location: http://localhost:5257/api/Persons/4` og svaret `{\"id\":4,\"name\":\"Lars\",\"city\":\"Visby\"}`. Sendes personen uden navn, svarer API'et selv **400** med teksten `The Name field is required.` — takket være `[Required]` og `[ApiController]`." },
      { t: "skriv", frag: true, q: "Skriv actionen `GetPerson`, der giver én person. Den skal svare på GET med et id efter adressen (`[HttpGet(\"{id}\")]`), have returtypen `ActionResult<Person>`, finde personen i listen `personer` med `Find`, og returnere `NotFound()`, hvis den ikke findes — ellers personen.",
        tjek: [
          ['[HttpGet("{id}")]', "Attributten `[HttpGet(\"{id}\")]` over metoden"],
          [/public ActionResult<Person>GetPerson\(int id\)/, "Metoden: `public ActionResult<Person> GetPerson(int id)`"],
          [/personer\.Find\((\w+)=>\1\.Id==id\)/, "Find personen: `personer.Find(p => p.Id == id)`"],
          [/==null\)\{?return NotFound\(\);/, "Hvis personen er `null`: `return NotFound();`"],
          [/return (person|Ok\(person\));/, "Ellers: `return person;`"]
        ],
        forkert: [R`[HttpGet("id")]
public ActionResult<Person> GetPerson(int id)
{
    Person? person = personer.Find(p => p.Id == id);
    if (person == null)
    {
        return NotFound();
    }
    return person;
}`],
        loesning: R`[HttpGet("{id}")]
public ActionResult<Person> GetPerson(int id)
{
    Person? person = personer.Find(p => p.Id == id);
    if (person == null)
    {
        return NotFound();
    }
    return person;
}`,
        fordi: "Tuborgklammerne i `\"{id}\"` er vigtige: de gør `id` til en **pladsholder** for et tal. Uden dem betyder ruten bogstaverne i-d." },
      { t: "fejl", frag: true, logisk: true,
        q: "API'et starter fint, og `GET /api/Persons` virker. Men `GET /api/Persons/2` giver **404 med et helt tomt svar** — også selvom person 2 findes. Hvilken linje er skyld i det?",
        kode: R`[HttpGet]
public ActionResult<IEnumerable<Person>> GetPersons()
{
    return personer;
}

[HttpGet("id")]
public ActionResult<Person> GetPerson(int id)
{
    Person? person = personer.Find(p => p.Id == id);
    if (person == null)
    {
        return NotFound();
    }
    return person;
}`,
        linje: 7,
        fordi: "`\"id\"` uden tuborgklammer er ikke en pladsholder, men bogstaverne i og d. Ruten bliver altså `api/Persons/id`, og ingen action passer til `api/Persons/2`. Afprøvet: svaret er 404 **uden indhold**, fordi ingen action blev kørt. Kommer der 404 **med** JSON, er det din egen `NotFound()`, der har svaret. Den forskel er et godt fejlfindingsspor.",
        rettet: R`[HttpGet]
public ActionResult<IEnumerable<Person>> GetPersons()
{
    return personer;
}

[HttpGet("{id}")]
public ActionResult<Person> GetPerson(int id)
{
    Person? person = personer.Find(p => p.Id == id);
    if (person == null)
    {
        return NotFound();
    }
    return person;
}` },
      { t: "ide", h: "Byg PersonsController",
        md: "Slet `WeatherForecastController.cs` og `WeatherForecast.cs`. Lav mappen **Models** med filen `Person.cs`:",
        frag: true,
        kode: R`using System.ComponentModel.DataAnnotations;

namespace PersonApi.Models;

public class Person
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = "";

    public string City { get; set; } = "";
}`,
        win: ["Højreklik på mappen **Controllers** → **Add** → **Controller…**.", "Vælg **API** i venstre side og derefter **API Controller - Empty**. Klik **Add**.", "Skriv navnet `PersonsController`, og klik **Add**.", "Skriv de tre actions `GetPersons`, `GetPerson` og `PostPerson` og listen ind. Skriv koden selv — kopiér den ikke.", "Kør, og prøv i browseren (med dit eget portnummer): `http://localhost:5257/api/Persons` (alle tre), `http://localhost:5257/api/Persons/2` (kun Kim) og `http://localhost:5257/api/Persons/99` (404)."],
        mac: ["Højreklik på mappen **Controllers** → **Add** → **Class/Interface**, skriv `PersonsController`, og tryk Enter.", "Skriv attributterne, arven fra `ControllerBase`, listen og de tre actions `GetPersons`, `GetPerson` og `PostPerson`. Skriv koden selv — kopiér den ikke.", "Kør, og prøv i browseren (med dit eget portnummer): `http://localhost:5257/api/Persons` (alle tre), `http://localhost:5257/api/Persons/2` (kun Kim) og `http://localhost:5257/api/Persons/99` (404)."],
        md2: "Den første adresse giver præcis `[{\"id\":1,\"name\":\"Ole\",\"city\":\"Valby\"},{\"id\":2,\"name\":\"Kim\",\"city\":\"Kalby\"},{\"id\":3,\"name\":\"Sanne\",\"city\":\"Salby\"}]` (afprøvet). Nogle browsere viser JSON pænt opstillet — det er de samme data.\n\nSæt et **breakpoint** på linjen `Person? person = personer.Find(…)` i `GetPerson`, og kald adressen igen. Programmet stopper, og i {{**Locals**||**Threads & Variables**}} kan du se, at `id` er 2. Tryk Step Over, og se `person` blive udfyldt.\n\nPOST kan du ikke prøve i browserens adresselinje — den sender altid GET. Det lærer du i lektion 5." },
      { t: "forklar", q: "Forklar med dine egne ord, som til eksamen: Hvad sker der fra browseren sender `GET /api/Persons/2`, til den får JSON tilbage?",
        svar: "Forespørgslen kommer ind i ASP.NET, og **routingen** finder controlleren ud fra `[Route(\"api/[controller]\")]`, altså `PersonsController`. Metoden er **GET**, og der er noget efter adressen, så actionen med `[HttpGet(\"{id}\")]` vælges, og 2 bliver lagt i parameteren `id`. Actionen finder personen. Findes den ikke, returnerer den `NotFound()`, som giver **404**. Findes den, returnerer den personen, og ASP.NET laver objektet om til **JSON** og sender det med statuskode **200**. Der er intet view, fordi det er en **API-controller**, der arver fra `ControllerBase` og har `[ApiController]`.",
        noegle: ["routing", "[Route]", "HttpGet", "id", "JSON", "200", "404", "ControllerBase"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m19l3", titel: "Dependency injection og repository", min: 22,
    ord: [
      ["Afhængighed (dependency)", "Noget, en klasse skal bruge for at kunne lave sit arbejde. Controlleren er afhængig af noget, der kan give den data."],
      ["Repository", "En klasse, hvis eneste opgave er at hente og gemme data. Controlleren spørger den i stedet for selv at have dataene."],
      ["Dependency injection (DI)", "At en klasse får det, den er afhængig af, **udefra** gennem sin konstruktør, i stedet for selv at lave det med `new`."],
      ["Service", "En klasse, som ASP.NET kan levere til dem, der beder om den. Registreres i `Program.cs`."],
      ["Singleton", "Levetid: der laves ét objekt af servicen, og alle forespørgsler deler det, så længe programmet kører."],
      ["Scoped", "Levetid: der laves et nyt objekt for hver forespørgsel. Bruges til alt, der taler med en database."],
      ["Transient", "Levetid: der laves et nyt objekt, hver gang nogen beder om servicen."],
      ["Dependency inversion", "D'et i SOLID: vær afhængig af en abstraktion (et interface), ikke af en konkret klasse."]
    ],
    trin: [
      { t: "laes", h: "Problemet: dataene bor i controlleren",
        md: "Listen ligger inde i `PersonsController`. Det virker, men controlleren har nu **to** opgaver: at tage imod forespørgsler, **og** at vide, hvor dataene bor. Den dag dataene skal ligge i en database, skal hele controlleren skrives om.\n\nLøsningen kommer i tre trin, og det er de samme tre trin, din underviser tegnede:",
        noter: [
          ["Trin 1", "Dataene ligger i controlleren. Det var forrige lektion."],
          ["Trin 2", "Dataene flyttes ud i en klasse for sig, et **repository**. Mellem controlleren og repository'et står et **interface**. Controlleren kender **kun interfacet**."],
          ["Trin 3", "Et andet repository bag det **samme interface** henter dataene i en database. Controlleren mærker ingen forskel. Det er næste lektion."]
        ],
        md2: "Interfaces kender du fra modul 7: et interface siger, **hvad** der kan gøres, og klassen, der implementerer det, bestemmer **hvordan**. Du skrev dengang, at det er vigtigt for dependency injection — nu kommer det." },
      { t: "laes", h: "Idéen i et lille konsolprogram",
        md: "Før du gør det i API'et, så se idéen i et almindeligt konsolprogram, hvor du kan køre det hele. Klassen `PersonsController` her er en helt almindelig klasse, der spiller controller. Læg mærke til, at den **aldrig** skriver `new ListRepository()`. Den får sit repository **ind gennem konstruktøren**.",
        kode: R`IPersonsData data = new ListRepository();
PersonsController controller = new PersonsController(data);
controller.SkrivAlle();

interface IPersonsData
{
    List<string> GetNames();
}

class ListRepository : IPersonsData
{
    public List<string> GetNames()
    {
        return new List<string> { "Ole", "Kim" };
    }
}

class PersonsController
{
    private readonly IPersonsData _data;

    public PersonsController(IPersonsData data)
    {
        _data = data;
    }

    public void SkrivAlle()
    {
        foreach (string navn in _data.GetNames())
        {
            Console.WriteLine(navn);
        }
    }
}`,
        noter: [
          ["interface IPersonsData", "Løftet: \"jeg kan give dig navnene\". Ingen kode, kun metodens hoved."],
          ["class ListRepository : IPersonsData", "En klasse, der holder løftet. Her kommer navnene fra en liste."],
          ["private readonly IPersonsData _data;", "Et felt af **interfacets** type. `readonly` betyder, at det kun kan sættes i konstruktøren."],
          ["public PersonsController(IPersonsData data)", "Konstruktøren siger: \"jeg skal bruge noget, der holder løftet\". Det er **constructor injection**."],
          ["new PersonsController(data)", "Her bliver afhængigheden **sprøjtet ind** (injected). I ASP.NET gør systemet det for dig."]
        ],
        output: "Ole\nKim" },
      { t: "forudsig", q: "Nu er der to klasser, der holder løftet. `PersonsController` er **den samme** som før. Hvad skriver programmet?",
        kode: R`PersonsController a = new PersonsController(new ListRepository());
PersonsController b = new PersonsController(new TestRepository());
a.SkrivAlle();
b.SkrivAlle();

interface IPersonsData
{
    List<string> GetNames();
}

class ListRepository : IPersonsData
{
    public List<string> GetNames()
    {
        return new List<string> { "Ole", "Kim" };
    }
}

class TestRepository : IPersonsData
{
    public List<string> GetNames()
    {
        return new List<string> { "Test" };
    }
}

class PersonsController
{
    private readonly IPersonsData _data;

    public PersonsController(IPersonsData data)
    {
        _data = data;
    }

    public void SkrivAlle()
    {
        foreach (string navn in _data.GetNames())
        {
            Console.WriteLine(navn);
        }
    }
}`,
        output: "Ole\nKim\nTest",
        fordi: "`a` fik en `ListRepository` og skriver Ole og Kim. `b` fik en `TestRepository` og skriver Test. Controller-klassen er ikke ændret med et eneste tegn — den kender kun interfacet. **Det** er gevinsten: datakilden kan skiftes uden at røre controlleren." },
      { t: "laes", h: "Trin 2 i PersonApi: interface og repository",
        md: "Nu det rigtige API. Interfacet `IPersonsData` lover de fem CRUD-operationer: hent alle, hent én, opret, ret og slet. Læg begge filer i mappen **Models**.",
        frag: true,
        kode: R`namespace PersonApi.Models;

public interface IPersonsData
{
    List<Person> GetPersons();
    Person? GetPerson(int id);
    Person AddPerson(Person newPerson);
    Person? EditPerson(int id, Person changed);
    bool DeletePerson(int id);
}`,
        noter: [
          ["Person? GetPerson(int id)", "Giver personen, eller `null`, hvis den ikke findes."],
          ["Person AddPerson(Person newPerson)", "Gemmer personen og giver den tilbage — nu med et id."],
          ["Person? EditPerson(int id, Person changed)", "Retter personen med det id. Giver `null`, hvis den ikke findes."],
          ["bool DeletePerson(int id)", "Sletter. Giver `true`, hvis det lykkedes, og `false`, hvis personen ikke fandtes."]
        ],
        md2: "Repository'et `PersonsRepository` holder løftet med en liste. Listen er flyttet hertil fra controlleren:",
        win: ["Højreklik på **Models** → **Add** → **New Item…** → **Interface**, navn `IPersonsData`.", "Højreklik på **Models** → **Add** → **Class…**, navn `PersonsRepository`.", "Skriv `: IPersonsData` efter klassens navn. Klik på den røde streg, og vælg **Implement interface** — så laver Visual Studio de fem metoder for dig."],
        mac: ["Højreklik på **Models** → **Add** → **Class/Interface**, vælg **Interface**, navn `IPersonsData`.", "Højreklik på **Models** → **Add** → **Class/Interface**, navn `PersonsRepository`.", "Skriv `: IPersonsData` efter klassens navn. Stil markøren på den røde streg, og vælg **Implement missing members** i pære-menuen."] },
      { t: "udfyld", frag: true, q: "Udfyld `PersonsRepository`, så den holder løftet fra `IPersonsData`. `AddPerson` giver den nye person det næste id og tæller derefter `naesteId` op.",
        kode: R`public class PersonsRepository : [[IPersonsData]]
{
    private List<Person> personer = new List<Person>
    {
        new Person { Id = 1, Name = "Ole", City = "Valby" },
        new Person { Id = 2, Name = "Kim", City = "Kalby" },
        new Person { Id = 3, Name = "Sanne", City = "Salby" }
    };
    private int naesteId = 4;

    public List<Person> GetPersons()
    {
        return personer;
    }

    public Person? GetPerson(int id)
    {
        return personer.[[Find]](p => p.Id == id);
    }

    public Person AddPerson(Person newPerson)
    {
        newPerson.Id = [[naesteId]];
        naesteId++;
        personer.Add(newPerson);
        return newPerson;
    }

    // EditPerson og DeletePerson: se næste trin
}`,
        fordi: "Kolonet og interfacets navn betyder \"jeg holder dette løfte\". `Find` med et lambda-udtryk giver den første person med det id, eller `null`. `naesteId` husker, hvilket id der skal bruges næste gang." },
      { t: "spor", h: "Spor: næste id i repository'et",
        q: "Koden gør det samme som `AddPerson` og `DeletePerson` i repository'et, bare med navne i stedet for personer. Skriv, hvad `naesteId` og `navne.Count` er, lige efter hver linje.",
        kode: R`List<string> navne = new List<string> { "Ole", "Kim", "Sanne" };
int naesteId = 4;
navne.Add("Lars");
naesteId++;
navne.Remove("Kim");
navne.Add("Mette");
naesteId++;`,
        kolonner: ["naesteId", "navne.Count"],
        raekker: [[1, "=–", "=3"], [2, "=4", "=3"], [3, "4", "4"], [4, "5", "4"], [5, "5", "3"], [6, "5", "4"], [7, "6", "4"]],
        fordi: "Lars fik id 4 og Mette id 5, og `naesteId` står nu på 6. Læg mærke til, at **antallet** gik ned, da Kim blev slettet, men `naesteId` gik **ikke** ned. Havde koden brugt `navne.Count + 1` som id, ville Mette have fået id 4 — samme som Lars. Den fejl møder du i værkstedet." },
      { t: "laes", h: "Constructor injection i controlleren",
        md: "Controlleren får et felt og en konstruktør, præcis som i konsolprogrammet. Listen er væk, og alle actions spørger `_data`:",
        frag: true,
        kode: R`[Route("api/[controller]")]
[ApiController]
public class PersonsController : ControllerBase
{
    private readonly IPersonsData _data;

    public PersonsController(IPersonsData data)
    {
        _data = data;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Person>> GetPersons()
    {
        return _data.GetPersons();
    }

    [HttpGet("{id}")]
    public ActionResult<Person> GetPerson(int id)
    {
        Person? person = _data.GetPerson(id);
        if (person == null)
        {
            return NotFound();
        }
        return person;
    }

    [HttpPost]
    public ActionResult<Person> PostPerson(Person person)
    {
        Person created = _data.AddPerson(person);
        return CreatedAtAction(nameof(GetPerson), new { id = created.Id }, created);
    }
}`,
        md2: "**Hvem kalder konstruktøren?** Det gør ASP.NET, når en forespørgsel kommer ind. Men et interface kan ikke laves med `new`, så ASP.NET skal have at vide, **hvilken klasse** der står bag. Det er den sidste brik, og den står i `Program.cs` — før `builder.Build()`:",
        noter: [
          ["builder.Services.AddSingleton<IPersonsData, PersonsRepository>();", "\"Når nogen beder om en `IPersonsData`, så giv dem en `PersonsRepository`.\" Det er **det eneste sted**, interfacet og klassen står sammen."]
        ] },
      { t: "valg", q: "Du har lavet interfacet, repository'et og konstruktøren i controlleren, men glemt linjen i `Program.cs`. Afprøvet: `GET /api/Persons` giver 500 og fejlen `Unable to resolve service for type 'PersonApi.Models.IPersonsData' while attempting to activate 'PersonApi.Controllers.PersonsController'`. Hvad betyder det?",
        svar: ["ASP.NET ved ikke, hvilken klasse den skal give controlleren, når den beder om `IPersonsData` — servicen er ikke registreret", "Interfacet har for mange metoder", "Controlleren mangler `[ApiController]`", "Databasen er ikke oprettet"],
        ret: 0, fordi: "*Unable to resolve service* betyder: \"jeg kan ikke finde en service af den type\". Rettelsen er linjen `builder.Services.AddSingleton<IPersonsData, PersonsRepository>();` i `Program.cs`, **før** `builder.Build()`." },
      { t: "laes", h: "Tre levetider: singleton, scoped og transient",
        md: "Når du registrerer en service, bestemmer du også, **hvor længe** objektet lever. Det hedder servicens **levetid** (*lifetime*):",
        noter: [
          ["AddSingleton", "**Ét** objekt i hele programmets levetid. Alle forespørgsler deler det. Passer til en liste i hukommelsen, som alle skal se."],
          ["AddScoped", "**Et nyt objekt for hver forespørgsel.** Når svaret er sendt, er objektet færdigt. Bruges til alt, der taler med en **database**."],
          ["AddTransient", "**Et nyt objekt, hver gang** nogen beder om servicen — også flere gange i samme forespørgsel. Til små, lette klasser uden data."]
        ],
        md2: "En regel, du kan bruge uden at huske detaljerne: **Taler servicen med en database, er den scoped. Holder den data i hukommelsen, som skal overleve mellem forespørgsler, er den singleton.**" },
      { t: "spor", h: "Spor: én fælles eller en ny hver gang",
        q: "Koden efterligner to forespørgsler. `faelles` er som en **singleton**: ét objekt, som begge forespørgsler bruger. `ny1` og `ny2` er som **scoped**: hver forespørgsel får sit eget objekt. Skriv tællernes værdi lige efter hver linje.",
        kode: R`Taeller faelles = new Taeller();
Taeller ny1 = new Taeller();
faelles.Antal++;
ny1.Antal++;
Taeller ny2 = new Taeller();
faelles.Antal++;
ny2.Antal++;
Console.WriteLine($"{faelles.Antal} {ny1.Antal} {ny2.Antal}");

class Taeller
{
    public int Antal { get; set; }
}`,
        kolonner: ["faelles.Antal", "ny1.Antal", "ny2.Antal"],
        raekker: [[1, "=0", "=–", "=–"], [2, "=0", "=0", "=–"], [3, "1", "0", "–"], [4, "1", "1", "–"], [5, "1", "1", "0"], [6, "2", "1", "0"], [7, "2", "1", "1"]],
        slut: false,
        output: "2 1 1",
        fordi: "Det fælles objekt husker begge forespørgsler: 2. De to nye objekter har hver kun set én: 1 og 1. Det er derfor, en liste i et **scoped** repository glemmer alt, hvad der blev tilføjet i forespørgslen før." },
      { t: "valg", q: "`PersonsRepository` med listen af personer bliver registreret med `AddScoped` i stedet for `AddSingleton`. En klient sender en POST med en ny person og bagefter `GET /api/Persons`. Hvor mange personer er der i svaret på GET?",
        svar: ["3 — GET får et nyt repository med den oprindelige liste", "4 — personen blev jo gemt", "0 — listen er tom", "Programmet går ned ved start"],
        ret: 0, fordi: "Afprøvet: POST svarer `201` med id 4, men næste GET giver de tre oprindelige personer. Scoped betyder et **nyt objekt pr. forespørgsel**, så POST'ens liste er smidt væk. Med `AddSingleton` giver samme test fire personer — indtil programmet genstartes." },
      { t: "ide", h: "Flyt dataene ud af controlleren",
        md: "Byg trin 2 i dit `PersonApi`:\n\n1. Lav `Models/IPersonsData.cs` med de fem metoder.\n2. Lav `Models/PersonsRepository.cs`, der implementerer interfacet. Skriv **alle fem** metoder færdige — `EditPerson` finder personen og retter `Name` og `City`; `DeletePerson` finder personen og fjerner den med `Remove`.\n3. Ret `PersonsController`: fjern listen, tilføj feltet og konstruktøren, og lad actions bruge `_data`.\n4. Tilføj `builder.Services.AddSingleton<IPersonsData, PersonsRepository>();` i `Program.cs` før `builder.Build()`.\n5. Kør, og prøv `api/Persons` og `api/Persons/2` i browseren. Svarene er de samme som før.",
        md2: "Sæt et **breakpoint** i konstruktøren `PersonsController(IPersonsData data)`, og kald `api/Persons` to gange. Programmet stopper **hver gang**: ASP.NET laver en ny controller for hver forespørgsel. Hold musen over `data` — i {{**Locals**||**Threads & Variables**}} kan du se, at det er en `PersonsRepository`, selvom controlleren kun har bedt om en `IPersonsData`." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er dependency injection, og hvordan har du brugt det i dit API? Nævn de steder i koden, det består af.",
        svar: "Dependency injection betyder, at en klasse **får det, den er afhængig af, udefra** — gennem sin **konstruktør** — i stedet for selv at lave det med `new`. I mit API består det af fire ting: et **interface**, `IPersonsData`, der lover CRUD-metoderne; en klasse, `PersonsRepository`, der **implementerer** det; en **konstruktør** i `PersonsController`, der tager imod en `IPersonsData` og gemmer den i et `readonly`-felt; og **registreringen** i `Program.cs`, `AddSingleton<IPersonsData, PersonsRepository>()`, der fortæller ASP.NET, hvilken klasse den skal give controlleren. Fordelen er **løs kobling**: controlleren kender kun interfacet, så datakilden kan skiftes med én linje.",
        noegle: ["konstruktør", "interface", "implementerer", "Program.cs", "AddSingleton", "løs kobling"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m19l4", titel: "Hele CRUD og en database bag API'et", min: 22,
    ord: [
      ["Body", "Den del af en forespørgsel, der indeholder data, fx en person som JSON. GET har ingen body; POST og PUT har."],
      ["PUT", "HTTP-metoden til at rette en eksisterende ressource. Den nye udgave sendes med i body."],
      ["NoContent()", "Svar med statuskode 204: det lykkedes, og der er intet at sende tilbage."],
      ["IActionResult", "Returtype for en action, der kun svarer med en statuskode og ingen data."],
      ["HasData", "Startdata i `OnModelCreating`, som en migration lægger i tabellen."],
      ["AddDbContext", "Registrerer databaseklassen som service. Den bliver automatisk **scoped**."],
      ["Open/closed", "O'et i SOLID: en klasse skal være åben for udvidelse, men lukket for ændring."]
    ],
    trin: [
      { t: "laes", h: "PUT og DELETE: ret og slet",
        md: "Controlleren mangler de to sidste bogstaver i CRUD: **U**pdate og **D**elete. De følger samme mønster: en attribut med HTTP-metoden, et kald til `_data`, og et svar. Begge svarer **204 No Content**, når det lykkes, og **404**, når personen ikke findes.",
        frag: true,
        kode: R`// PUT: api/Persons/2
[HttpPut("{id}")]
public IActionResult PutPerson(int id, Person person)
{
    Person? changed = _data.EditPerson(id, person);
    if (changed == null)
    {
        return NotFound();
    }
    return NoContent();
}

// DELETE: api/Persons/2
[HttpDelete("{id}")]
public IActionResult DeletePerson(int id)
{
    if (!_data.DeletePerson(id))
    {
        return NotFound();
    }
    return NoContent();
}`,
        noter: [
          ["[HttpPut(\"{id}\")]", "PUT med et id i adressen: `PUT api/Persons/2`."],
          ["int id, Person person", "`id` kommer fra adressen, `person` fra body. `[ApiController]` finder selv ud af, hvad der kommer hvorfra."],
          ["IActionResult", "Ingen data at sende tilbage, kun en statuskode. Derfor ikke `ActionResult<Person>`."],
          ["return NoContent();", "Svar 204."],
          ["if (!_data.DeletePerson(id))", "`!` betyder \"ikke\": hvis sletningen **ikke** lykkedes."]
        ],
        md2: "Din underviser brugte `[HttpPatch]` i stedet for PUT. Forskellen: **PUT** erstatter hele personen med den nye udgave; **PATCH** er tænkt til kun at sende det, der er ændret. Med to felter gør det ingen forskel i praksis. PUT med id i adressen er det mest almindelige." },
      { t: "valg", q: "Afprøvet: `DELETE /api/Persons/4` giver først **204**. Hvad giver præcis den samme forespørgsel anden gang?",
        svar: ["404 — personen er allerede slettet, så `DeletePerson` giver `false`", "204 igen", "500, fordi listen er ændret", "200 med den slettede person"],
        ret: 0, fordi: "Anden gang findes person 4 ikke længere. `DeletePerson` returnerer `false`, og actionen svarer `NotFound()`. Klienten kan altså se på statuskoden, om sletningen skete." },
      { t: "skriv", frag: true, q: "Skriv actionen `DeletePerson` i controlleren. Den skal svare på DELETE med et id i adressen (`[HttpDelete(\"{id}\")]`), have returtypen `IActionResult`, kalde `_data.DeletePerson(id)`, svare `NotFound()`, hvis det giver `false`, og ellers `NoContent()`.",
        tjek: [
          ['[HttpDelete("{id}")]', "Attributten `[HttpDelete(\"{id}\")]`"],
          [/public IActionResult DeletePerson\(int id\)/, "Metoden: `public IActionResult DeletePerson(int id)`"],
          ["_data.DeletePerson(id)", "Kald repository'et: `_data.DeletePerson(id)`"],
          ["return NotFound();", "Svar `NotFound()`, når personen ikke fandtes"],
          ["return NoContent();", "Svar `NoContent()`, når det lykkedes"]
        ],
        forkert: [R`[HttpDelete("{id}")]
public IActionResult DeletePerson(int id)
{
    _data.DeletePerson(id);
    return NoContent();
}`],
        loesning: R`[HttpDelete("{id}")]
public IActionResult DeletePerson(int id)
{
    if (!_data.DeletePerson(id))
    {
        return NotFound();
    }
    return NoContent();
}`,
        fordi: "Uden `if` ville API'et svare 204, også når personen aldrig fandtes. Så kan klienten ikke se forskel på \"slettet\" og \"fandtes ikke\"." },
      { t: "laes", h: "Trin 3: databaseklassen",
        md: "En liste i hukommelsen forsvinder, når programmet stopper. Nu skal personerne i en database. Det er code first fra modul 17: en `DbContext` med en `DbSet`. Det nye er `HasData`, der lægger tre personer i tabellen, når migrationen køres.",
        frag: true,
        kode: R`using Microsoft.EntityFrameworkCore;

namespace PersonApi.Models;

public class PersonsDB : DbContext
{
    public PersonsDB(DbContextOptions<PersonsDB> options) : base(options)
    {
    }

    public DbSet<Person> Persons { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Person>().HasData(
            new Person { Id = 1, Name = "Ole", City = "Valby" },
            new Person { Id = 2, Name = "Kim", City = "Kalby" },
            new Person { Id = 3, Name = "Sanne", City = "Salby" }
        );
    }
}`,
        noter: [
          ["PersonsDB : DbContext", "Databaseklassen. Den er selv en service, der får sine indstillinger ind gennem konstruktøren."],
          ["DbSet<Person> Persons", "Tabellen `Persons`."],
          ["OnModelCreating", "Metoden, hvor du kan sige mere om tabellerne. `override` fordi `DbContext` har en tom udgave."],
          ["HasData(…)", "Startdata. Hver række **skal** have et `Id`. Databasen tæller selv videre derfra: den næste person får id 4."]
        ] },
      { t: "valg", q: "Når du opretter en person med POST, giver databasen selv et id. Hvorfor skal personerne i `HasData` så have et `Id`?",
        svar: ["Startdata lægges ind af migrationen med faste nøgler, så EF kan kende rækkerne igen ved næste migration", "Fordi JSON kræver et id", "Det er en fejl — `Id` skal fjernes", "For at personerne bliver sorteret"],
        ret: 0, fordi: "Migrationen skriver startdataene ind som faste rækker. Med et fast `Id` kan EF se, om de findes i forvejen, og ændre dem senere. Afprøvet: rækkerne får id 1, 2 og 3, og den næste person, der oprettes, får id 4." },
      { t: "laes", h: "Pakker, connection string og AddDbContext",
        md: "Resten er som i modul 17. Installér pakkerne, læg en connection string i `appsettings.json`, og registrér databaseklassen i `Program.cs`.",
        win: [
          "Højreklik på projektet → **Manage NuGet Packages…** → **Browse**. Installér `Microsoft.EntityFrameworkCore.SqlServer` og `Microsoft.EntityFrameworkCore.Tools`.",
          "I `appsettings.json`, efter `\"AllowedHosts\": \"*\",`: `\"ConnectionStrings\": { \"PersonsDB\": \"Server=(localdb)\\\\MSSQLLocalDB;Database=PersonsDB;Trusted_Connection=True;TrustServerCertificate=True\" }` — med **to** omvendte skråstreger, fordi det er JSON.",
          "I `Program.cs`, før `builder.Build()`: `builder.Services.AddDbContext<PersonsDB>(options => options.UseSqlServer(builder.Configuration.GetConnectionString(\"PersonsDB\")));`",
          "Øverst i `Program.cs`: `using Microsoft.EntityFrameworkCore;` og `using PersonApi.Models;`."
        ],
        mac: [
          "I Terminal, i projektmappen: `dotnet add package Microsoft.EntityFrameworkCore.Sqlite` og `dotnet add package Microsoft.EntityFrameworkCore.Design`.",
          "I `appsettings.json`, efter `\"AllowedHosts\": \"*\",`: `\"ConnectionStrings\": { \"PersonsDB\": \"Data Source=persons.db\" }`",
          "I `Program.cs`, før `builder.Build()`: `builder.Services.AddDbContext<PersonsDB>(options => options.UseSqlite(builder.Configuration.GetConnectionString(\"PersonsDB\")));`",
          "Øverst i `Program.cs`: `using Microsoft.EntityFrameworkCore;` og `using PersonApi.Models;`."
        ],
        md2: "Kør derefter migrationen, præcis som i modul 17. {{I **Package Manager Console** (View → Other Windows): `Add-Migration Init` og derefter `Update-Database`.||I Terminal i projektmappen: `dotnet ef migrations add Init` og derefter `dotnet ef database update`. Har du ikke værktøjet endnu: `dotnet tool install --global dotnet-ef`.}}\n\nAfprøvet: tabellen `Persons` får de tre personer fra `HasData`." },
      { t: "laes", h: "DatabaseRepository: samme løfte, ny datakilde",
        md: "Nu det smarte: en ny klasse, `DatabaseRepository`, der implementerer **det samme** `IPersonsData`. Den får databaseklassen ind gennem sin konstruktør — dependency injection én gang til, ét lag længere nede. Hver metode, der ændrer noget, slutter med `SaveChanges()`.",
        frag: true,
        kode: R`namespace PersonApi.Models;

public class DatabaseRepository : IPersonsData
{
    private readonly PersonsDB _db;

    public DatabaseRepository(PersonsDB db)
    {
        _db = db;
    }

    public List<Person> GetPersons()
    {
        return _db.Persons.ToList();
    }

    public Person? GetPerson(int id)
    {
        return _db.Persons.Find(id);
    }

    public Person AddPerson(Person newPerson)
    {
        _db.Persons.Add(newPerson);
        _db.SaveChanges();
        return newPerson;
    }

    public Person? EditPerson(int id, Person changed)
    {
        Person? person = _db.Persons.Find(id);
        if (person == null)
        {
            return null;
        }
        person.Name = changed.Name;
        person.City = changed.City;
        _db.SaveChanges();
        return person;
    }

    public bool DeletePerson(int id)
    {
        Person? person = _db.Persons.Find(id);
        if (person == null)
        {
            return false;
        }
        _db.Persons.Remove(person);
        _db.SaveChanges();
        return true;
    }
}`,
        noter: [
          ["DatabaseRepository(PersonsDB db)", "Repository'et beder om databaseklassen. ASP.NET leverer den, fordi den er registreret med `AddDbContext`."],
          ["_db.Persons.ToList()", "Hent alle rækker som en liste."],
          ["_db.Persons.Find(id)", "Find rækken med den primærnøgle, eller `null`."],
          ["_db.SaveChanges()", "Gem ændringerne i databasen. Uden den bliver intet gemt."],
          ["AddPerson … return newPerson", "Efter `SaveChanges()` har databasen givet personen et id, så den returnerede person har id udfyldt."]
        ],
        md2: "I modul 17 brugte den genererede kode `async`-udgaverne (`ToListAsync`, `SaveChangesAsync`). De virker også her; underviseren brugte de almindelige, og dem bruger vi, så koden er kortere." },
      { t: "udfyld", frag: true, q: "Udfyld `EditPerson` i `DatabaseRepository`: find personen på id, ret felterne, og gem ændringen i databasen.",
        kode: R`public Person? EditPerson(int id, Person changed)
{
    Person? person = _db.Persons.[[Find]](id);
    if (person == [[null]])
    {
        return null;
    }
    person.Name = changed.Name;
    person.City = changed.City;
    _db.[[SaveChanges]]();
    return person;
}`,
        fordi: "`Find` slår op på primærnøglen. EF holder øje med objektet, så når du ændrer `Name` og `City`, ved den, hvad der skal opdateres — men først `SaveChanges()` skriver det i databasen." },
      { t: "fejl", frag: true, logisk: true,
        q: "`DELETE /api/Persons/2` svarer **204**, så alt ser fint ud. Men når klienten bagefter henter alle personer, er Kim der stadig. Hvilken linje mangler noget efter sig?",
        kode: R`public bool DeletePerson(int id)
{
    Person? person = _db.Persons.Find(id);
    if (person == null)
    {
        return false;
    }
    _db.Persons.Remove(person);
    return true;
}`,
        linje: 8,
        fordi: "`Remove` markerer kun personen som \"skal slettes\". Uden `_db.SaveChanges();` bliver ændringen aldrig sendt til databasen. Med et breakpoint på `return true;` kan du se, at metoden kører hele vejen igennem — fejlen er altså ikke, at den ikke bliver kaldt, men at intet bliver gemt.",
        rettet: R`public bool DeletePerson(int id)
{
    Person? person = _db.Persons.Find(id);
    if (person == null)
    {
        return false;
    }
    _db.Persons.Remove(person);
    _db.SaveChanges();
    return true;
}` },
      { t: "laes", h: "Én linje skifter datakilden",
        md: "Nu holder to klasser det samme løfte. Hvilken der bruges, afgøres **ét** sted, i `Program.cs`. Kommentér den gamle linje ud, og skriv den nye under:",
        frag: true,
        kode: R`// builder.Services.AddSingleton<IPersonsData, PersonsRepository>();
builder.Services.AddScoped<IPersonsData, DatabaseRepository>();`,
        md2: "Læg mærke til **AddScoped**. `AddDbContext` registrerer selv `PersonsDB` som scoped: én forbindelse pr. forespørgsel. Et repository, der bruger den, skal have samme levetid.\n\nAfprøvet: skriver du `AddSingleton<IPersonsData, DatabaseRepository>()`, starter programmet slet ikke. Fejlen siger `Cannot consume scoped service 'PersonApi.Models.PersonsDB' from singleton 'PersonApi.Models.IPersonsData'`: et objekt, der lever for evigt, må ikke holde fast i et, der kun lever i én forespørgsel." },
      { t: "valg", q: "Du skifter fra `PersonsRepository` til `DatabaseRepository` i `Program.cs`. Hvor mange linjer skal du rette i `PersonsController`?",
        svar: ["Ingen — controlleren kender kun `IPersonsData`", "Alle actions skal skrives om", "Konstruktøren skal tage imod en `PersonsDB`", "Feltet `_data` skal have en ny type"],
        ret: 0, fordi: "Afprøvet: præcis samme controller-fil virker med begge repositories. Det er **open/closed**-princippet (O'et i SOLID) i praksis: controlleren er **lukket for ændring**, men programmet er **åbent for udvidelse** med nye repositories." },
      { t: "ide", h: "Sæt databasen bag dit API",
        md: "Byg trin 3 i dit `PersonApi`:\n\n1. Tilføj `PutPerson` og `DeletePerson` i controlleren.\n2. Installér pakkerne, lav `Models/PersonsDB.cs` med `HasData`, læg connection stringen i `appsettings.json`, og tilføj `AddDbContext` i `Program.cs`.\n3. Lav `Models/DatabaseRepository.cs`.\n4. Skift registreringen til `AddScoped<IPersonsData, DatabaseRepository>()`.\n5. Lav migrationen, og opdatér databasen.\n6. Kør, og hent `api/Persons` i browseren: de tre personer kommer nu fra databasen.",
        sprog: "js",
        kode: R`[{"id":1,"name":"Ole","city":"Valby"},{"id":2,"name":"Kim","city":"Kalby"},{"id":3,"name":"Sanne","city":"Salby"}]`,
        md2: "{{Åbn **SQL Server Object Explorer** (View-menuen) → `(localdb)\\MSSQLLocalDB` → Databases → `PersonsDB` → Tables, højreklik på `dbo.Persons` → **View Data**.||Åbn **Database**-vinduet i Rider, tilføj `persons.db` som SQLite-datakilde, og åbn tabellen `Persons`.}} Så kan du se de samme tre rækker. I næste lektion opretter, retter og sletter du — og ser tabellen ændre sig." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvorfor skulle du ikke ændre noget i controlleren, da dataene flyttede fra en liste til en database? Og hvorfor er det `AddScoped` og ikke `AddSingleton`?",
        svar: "Controlleren er kun afhængig af **interfacet** `IPersonsData`, ikke af en bestemt klasse. Både `PersonsRepository` og `DatabaseRepository` **implementerer** interfacet, så jeg kunne skifte datakilde med **én linje i Program.cs**. Det er **dependency inversion** og **open/closed**: controlleren er lukket for ændring, men programmet kan udvides med nye repositories. Det er **AddScoped**, fordi repository'et bruger `PersonsDB`, som `AddDbContext` registrerer som **scoped** — én forbindelse pr. forespørgsel. En singleton må ikke holde fast i en scoped service; det giver en fejl ved start.",
        noegle: ["interface", "implementerer", "én linje", "Program.cs", "open/closed", "scoped", "forespørgsel"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m19l5", titel: "Afprøv dit API: Swagger, Scalar og .http-filer", min: 18,
    ord: [
      ["OpenAPI", "En standard for at beskrive et API: hvilke adresser, metoder og data det har. Beskrivelsen er en JSON-fil."],
      ["Swagger UI", "En side i browseren, der læser OpenAPI-beskrivelsen og lader dig prøve hver operation. Pakken hedder `Swashbuckle.AspNetCore`."],
      ["Scalar", "Et nyere værktøj, der gør det samme som Swagger UI. Pakken hedder `Scalar.AspNetCore`."],
      [".http-fil", "En tekstfil med forespørgsler, som Visual Studio og Rider kan sende med et klik."],
      ["Content-Type", "En header, der fortæller, hvilken slags data body indeholder, fx `application/json`."],
      ["Location-header", "En header i et 201-svar med adressen på det, der lige blev oprettet."]
    ],
    trin: [
      { t: "laes", h: "Browseren kan kun GET",
        md: "Når du skriver en adresse i browseren, sender den altid en **GET**. For at prøve POST, PUT og DELETE skal du bruge et værktøj, der kan sende alle metoderne. Der er tre muligheder, og du lærer dem alle:\n\n1. **Swagger UI** — en side i browseren med en knap for hver operation.\n2. **Scalar** — det samme, i et nyere design.\n3. **`.http`-filer** — forespørgsler skrevet som tekst i {{Visual Studio||Rider}}.\n\nSwagger og Scalar bygger begge på en **OpenAPI**-beskrivelse af dit API. Den laver skabelonen allerede: det er linjerne `AddOpenApi()` og `MapOpenApi()` i `Program.cs`. Kør API'et, og åbn `http://localhost:5257/openapi/v1.json` (med dit portnummer). Du ser en lang JSON-tekst, der starter sådan her:",
        sprog: "js",
        kode: R`{
  "openapi": "3.1.1",
  "info": {
    "title": "PersonApi | v1",
    "version": "1.0.0"
  },
  ...`,
        md2: "Længere nede står `/api/Persons` med `get` og `post`, og `/api/Persons/{id}` med `get`, `put` og `delete`. Det er en maskinlæsbar liste over dine endpoints." },
      { t: "valg", q: "Hvorfor kan du ikke prøve `DELETE /api/Persons/2` ved at skrive adressen i browserens adresselinje?",
        svar: ["Fordi en adresse i adresselinjen altid sendes som GET", "Fordi browseren ikke kan læse JSON", "Fordi DELETE kun virker på Windows", "Fordi API'et skal have HTTPS"],
        ret: 0, fordi: "Adresselinjen sender GET. Prøver du, svarer API'et bare med personen, for det var en GET. Du skal bruge Swagger, Scalar, en `.http`-fil eller kode (lektion 6)." },
      { t: "laes", h: "Swagger: prøv API'et i browseren",
        md: "**Swagger UI** kommer fra NuGet-pakken `Swashbuckle.AspNetCore`. {{Installér den gennem **Manage NuGet Packages…** → **Browse**.||Installér den i Terminal i projektmappen: `dotnet add package Swashbuckle.AspNetCore`.}} Så skal der fire linjer i `Program.cs` — to services før `Build()` og to trin i pipelinen:",
        frag: true,
        kode: R`builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ... AddDbContext og AddScoped som før ...

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}`,
        noter: [
          ["AddEndpointsApiExplorer()", "Lader Swagger finde alle dine endpoints."],
          ["AddSwaggerGen()", "Laver Swaggers egen beskrivelse af API'et."],
          ["UseSwagger()", "Gør beskrivelsen tilgængelig på `/swagger/v1/swagger.json`."],
          ["UseSwaggerUI()", "Selve siden på `/swagger`."],
          ["inde i if (IsDevelopment())", "Testsiden vises kun, mens du udvikler — ikke når API'et er i drift."]
        ],
        md2: "Din underviser fik en fejl første gang, fordi Package Manager Console havde hentet en gammel version af pakken. Får du en mærkelig fejl ved start, så tjek, at du har den nyeste version (afprøvet med 10.3.0)." },
      { t: "udfyld", frag: true, q: "Udfyld linjerne, der slår Swagger til. Den første er en service; de to sidste er trin i pipelinen.",
        kode: R`builder.Services.AddEndpointsApiExplorer();
builder.Services.[[AddSwaggerGen]]();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.[[UseSwagger]]();
    app.[[UseSwaggerUI]]();
}`,
        fordi: "`Add…` registrerer en service og står **før** `Build()`. `Use…` er et trin i pipelinen og står **efter**." },
      { t: "ide", h: "Brug Swagger",
        md: "Sørg for, at Swagger åbner af sig selv. Åbn `Properties/launchSettings.json`, og ret i profilen `http`: sæt `\"launchBrowser\": true` og tilføj linjen `\"launchUrl\": \"swagger\",`. Kør projektet.\n\nPrøv så alle fem operationer. For hver: klik på den, klik **Try it out**, udfyld, og klik **Execute**. Gæt statuskoden, **før** du klikker:\n\n1. `GET /api/Persons` → 200 og tre personer.\n2. `POST /api/Persons` med body `{ \"name\": \"Lars\", \"city\": \"Visby\" }` → 201, og svaret har `\"id\": 4`.\n3. `PUT /api/Persons/{id}` med id 4 og body `{ \"id\": 4, \"name\": \"Lars\", \"city\": \"Vejle\" }` → 204.\n4. `GET /api/Persons/{id}` med id 4 → 200 og byen Vejle.\n5. `DELETE /api/Persons/{id}` med id 4 → 204. Samme igen → 404.\n6. `POST` med body `{ \"city\": \"Visby\" }` (uden navn) → 400.",
        md2: "Afprøvet med PersonApi og en database: præcis de koder. Stop programmet, start det igen, og hent alle: med databasen er dine ændringer der stadig. Kig også i tabellen, mens du arbejder." },
      { t: "valg", q: "Du sender `POST /api/Persons` i Swagger og får 201. I svarets headers står `location: http://localhost:5257/api/Persons/4`. Hvor kommer den adresse fra?",
        svar: ["Fra `CreatedAtAction(nameof(GetPerson), new { id = created.Id }, created)` i controlleren", "Fra `launchSettings.json`", "Swagger finder selv på den", "Fra databasen"],
        ret: 0, fordi: "`CreatedAtAction` bygger adressen ud fra ruten til `GetPerson` med det nye id. Klienten kan bruge adressen til at hente den nye person med det samme." },
      { t: "laes", h: "Scalar: det nyere alternativ",
        md: "En kursist viste **Scalar** på holdet. Den gør det samme som Swagger UI, og den bruger skabelonens egen OpenAPI-beskrivelse, så der skal kun to ting til. {{Installér pakken `Scalar.AspNetCore` gennem **Manage NuGet Packages…**.||Installér pakken: `dotnet add package Scalar.AspNetCore`.}} Tilføj så én linje ved siden af `MapOpenApi()`:",
        frag: true,
        kode: R`using Scalar.AspNetCore;

// ...

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}`,
        md2: "Kør, og åbn `http://localhost:5257/scalar`. Afprøvet: siden åbner og viser de samme fem operationer. Til venstre vælger du en operation, og med **Test Request** sender du den. Brug det værktøj, du bedst kan lide — begge må bruges i opgaver og projekt." },
      { t: "valg", q: "Hvad har Swagger UI og Scalar til fælles?",
        svar: ["Begge læser en OpenAPI-beskrivelse af API'et og laver en side, hvor operationerne kan prøves", "Begge er databaser", "Begge erstatter controllerne", "Begge kræver Postman"],
        ret: 0, fordi: "OpenAPI er standarden; Swagger UI og Scalar er to programmer, der læser den. Andre værktøjer kan også læse den — fx til at lave klientkode automatisk." },
      { t: "laes", h: ".http-filer: forespørgsler som tekst",
        md: "Skabelonen lavede filen `PersonApi.http`. Den indeholder forespørgsler, som {{Visual Studio sender, når du klikker på **Send request** over dem||Rider sender, når du klikker på den grønne pil ▶ ud for dem}}. Svaret vises ved siden af. Fordelen frem for Swagger: filen gemmes i projektet, så du kan køre de samme tests igen og igen.",
        sprog: "text",
        kode: R`@PersonApi_HostAddress = http://localhost:5257

GET {{PersonApi_HostAddress}}/api/Persons
Accept: application/json

###

POST {{PersonApi_HostAddress}}/api/Persons
Content-Type: application/json

{
  "name": "Lars",
  "city": "Visby"
}

###

DELETE {{PersonApi_HostAddress}}/api/Persons/4`,
        noter: [
          ["@PersonApi_HostAddress = …", "En variabel med adressen. `{{PersonApi_HostAddress}}` bliver erstattet af den."],
          ["GET … / POST … / DELETE …", "Første linje: metoden og adressen."],
          ["Content-Type: application/json", "En header: \"body er JSON\". Skal med, når der er en body."],
          ["tom linje", "Adskiller headers fra body. Den skal være der."],
          ["###", "Adskiller to forespørgsler."]
        ] },
      { t: "orden", sprog: "text", q: "Sæt linjerne i rækkefølge, så `.http`-filen **først** henter person 2 (og beder om JSON) og **derefter** sletter hende.",
        linjer: [R`@PersonApi_HostAddress = http://localhost:5257`, R`GET {{PersonApi_HostAddress}}/api/Persons/2`, R`Accept: application/json`, R`###`, R`DELETE {{PersonApi_HostAddress}}/api/Persons/2`],
        fordi: "Variablen skal være defineret, før den bruges. Hver forespørgsel starter med metoden og adressen, og dens headers står lige under. `###` skiller de to forespørgsler ad. (Har en forespørgsel en body, kommer der en tom linje efter headers og så body.)" },
      { t: "forudsig", sprog: "text", q: "Databasen har personerne 1, 2 og 3. Du sender de fire forespørgsler nedenfor, én ad gangen, fra toppen. Skriv statuskoden for hver, én pr. linje.",
        kode: R`POST http://localhost:5257/api/Persons
Content-Type: application/json

{ "name": "Lars", "city": "Visby" }

###

GET http://localhost:5257/api/Persons/4

###

DELETE http://localhost:5257/api/Persons/4

###

GET http://localhost:5257/api/Persons/4`,
        output: "201\n200\n204\n404",
        fordi: "POST opretter Lars med id 4: **201**. GET af nummer 4 finder ham: **200**. DELETE sletter ham: **204**. Sidste GET finder ham ikke længere: **404**. Afprøvet med PersonApi." },
      { t: "ide", h: "Din egen testfil",
        md: "Åbn `PersonApi.http`, og slet forespørgslen til `weatherforecast`. Skriv seks forespørgsler med `###` imellem, med dit eget portnummer i variablen:\n\n1. Hent alle.\n2. Hent nummer 2.\n3. Opret en person (POST med body).\n4. Ret personen (PUT med id i adressen og body).\n5. Slet personen.\n6. Hent en person, der ikke findes.\n\nStart API'et, og send dem én ad gangen. Tjek, at statuskoderne er 200, 200, 201, 204, 204 og 404.",
        md2: "Sæt et **breakpoint** i `DatabaseRepository.AddPerson` på linjen `_db.SaveChanges();`, og send POST'en. Se i {{Locals||Threads & Variables}}, at `newPerson.Id` er **0** før linjen. Tryk Step Over: nu har databasen givet den et id." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvordan afprøver du et Web API, og hvad er OpenAPI?",
        svar: "En browser kan kun sende **GET**, så til POST, PUT og DELETE bruger jeg et værktøj. **OpenAPI** er en standard for at **beskrive** et API: alle adresser, metoder og datatyper som JSON. Skabelonen laver beskrivelsen med `AddOpenApi` og `MapOpenApi`. **Swagger UI** (pakken Swashbuckle) og **Scalar** læser beskrivelsen og laver en side, hvor jeg kan prøve hver operation og se **statuskoden** og svaret. Derudover har jeg en **.http-fil** i projektet med faste forespørgsler, som jeg kan sende igen, hver gang jeg har ændret noget.",
        noegle: ["GET", "OpenAPI", "beskrive", "Swagger", "Scalar", ".http", "statuskode"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m19l6", titel: "Brug API'et: HttpClient, fetch og CORS", min: 20,
    ord: [
      ["Klient", "Det program, der sender forespørgsler til API'et: en browser, et C#-program, en app."],
      ["HttpClient", "Klassen i C#, der sender HTTP-forespørgsler og modtager svar."],
      ["GetFromJsonAsync", "Sender GET og laver JSON-svaret om til et C#-objekt i ét hug."],
      ["PostAsJsonAsync", "Laver et C#-objekt om til JSON og sender det med en POST."],
      ["HttpResponseMessage", "Svaret fra serveren i C#: statuskode, headers og indhold."],
      ["CORS", "Cross-Origin Resource Sharing. Serverens tilladelse til, at JavaScript fra en side på en anden adresse må læse svaret."],
      ["Origin", "En sides oprindelse: protokol, maskine og port, fx `http://localhost:5500`."],
      ["Løs kobling", "At to dele af et system ved så lidt om hinanden som muligt, så den ene kan ændres uden den anden."]
    ],
    trin: [
      { t: "laes", h: "En C#-klient med HttpClient",
        md: "Et API er lavet til at blive brugt af andre programmer. Her er et konsolprogram, der henter alle personer. Det er et helt separat projekt — det kender ikke `PersonApi`'s kode, kun **adressen** og **JSON-formatet**. Derfor har det sin egen lille `Person`-klasse.",
        frag: true,
        kode: R`using System.Net.Http.Json;

HttpClient client = new HttpClient();
client.BaseAddress = new Uri("http://localhost:5257/");

List<Person>? personer = await client.GetFromJsonAsync<List<Person>>("api/Persons");
foreach (Person p in personer!)
{
    Console.WriteLine($"{p.Id}: {p.Name} fra {p.City}");
}

class Person
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string City { get; set; } = "";
}`,
        noter: [
          ["using System.Net.Http.Json;", "Her bor `GetFromJsonAsync` og `PostAsJsonAsync`."],
          ["client.BaseAddress", "API'ets adresse. Resten af adresserne skrives i forhold til den."],
          ["await client.GetFromJsonAsync<List<Person>>(…)", "Send GET, vent på svaret uden at blokere (async/await fra modul 8), og lav JSON'en om til en `List<Person>`."],
          ["personer!", "Udråbstegnet siger til compileren: \"jeg ved, den ikke er null\". Ellers får du en advarsel."]
        ],
        output: "1: Ole fra Valby\n2: Kim fra Kalby\n3: Sanne fra Salby",
        md2: "Afprøvet mod PersonApi med databasen. API'et skal køre samtidig, ellers får klienten en fejl om, at forbindelsen blev afvist." },
      { t: "forudsig", q: "`HttpResponseMessage` er svaret fra en forespørgsel. Her laves et svar i hånden, så du kan se, hvad det indeholder, uden en server. Hvad skriver programmet?",
        kode: R`using System.Net;

HttpResponseMessage svar = new HttpResponseMessage(HttpStatusCode.NotFound);

Console.WriteLine((int)svar.StatusCode);
Console.WriteLine(svar.StatusCode);
Console.WriteLine(svar.IsSuccessStatusCode);`,
        output: "404\nNotFound\nFalse",
        fordi: "`StatusCode` er en enum (modul 7). Castet til `int` giver den tallet 404; skrevet direkte giver den navnet `NotFound`. `IsSuccessStatusCode` er kun `true` for koderne 200–299." },
      { t: "laes", h: "Opret og slet fra C#",
        md: "For at oprette sender du et objekt med `PostAsJsonAsync`. Svaret er en `HttpResponseMessage`, så du kan tjekke statuskoden og læse den gemte person ud af svaret.",
        frag: true,
        kode: R`Person ny = new Person { Name = "Lise", City = "Lyngby" };
HttpResponseMessage svar = await client.PostAsJsonAsync("api/Persons", ny);
Console.WriteLine((int)svar.StatusCode);

Person? gemt = await svar.Content.ReadFromJsonAsync<Person>();
Console.WriteLine($"Fik id {gemt!.Id}");

HttpResponseMessage ikkeFundet = await client.GetAsync("api/Persons/99");
Console.WriteLine(ikkeFundet.StatusCode);

HttpResponseMessage slet = await client.DeleteAsync($"api/Persons/{gemt.Id}");
Console.WriteLine((int)slet.StatusCode);`,
        noter: [
          ["PostAsJsonAsync(adresse, objekt)", "Laver objektet om til JSON og sender det som body i en POST."],
          ["svar.Content.ReadFromJsonAsync<Person>()", "Læs svarets body som en `Person`."],
          ["GetAsync(…)", "Send GET, men giv mig hele svaret, så jeg selv kan tjekke statuskoden."],
          ["DeleteAsync(…)", "Send DELETE."]
        ],
        output: "201\nFik id 4\nNotFound\n204",
        md2: "Afprøvet efter en frisk database. `GetFromJsonAsync` er praktisk, men den kaster en exception ved 404. Brug `GetAsync` og tjek `IsSuccessStatusCode`, når du forventer, at noget måske ikke findes." },
      { t: "spor", h: "Spor: tæl gode og dårlige svar",
        q: "Et klientprogram tæller, hvor mange svar der lykkedes (200–299), og hvor mange der fejlede. Skriv værdierne lige efter hver linje.",
        kode: R`int ok = 0;
int fejl = 0;
int kode = 201;
if (kode >= 200 && kode <= 299) ok++; else fejl++;
kode = 404;
if (kode >= 200 && kode <= 299) ok++; else fejl++;
kode = 204;
if (kode >= 200 && kode <= 299) ok++; else fejl++;`,
        kolonner: ["ok", "fejl", "kode"],
        raekker: [[1, "=0", "=–", "=–"], [2, "=0", "=0", "=–"], [3, "0", "0", "201"], [4, "1", "0", "201"], [5, "1", "0", "404"], [6, "1", "1", "404"], [7, "1", "1", "204"], [8, "2", "1", "204"]],
        fordi: "201 og 204 ligger mellem 200 og 299 og tæller som succes. 404 er en 4xx-kode og tæller som fejl. Det er præcis den regel, `IsSuccessStatusCode` bruger." },
      { t: "udfyld", frag: true, q: "Udfyld klientkoden: hent alle personer som en liste, og opret derefter en ny.",
        kode: R`List<Person>? personer = await client.[[GetFromJsonAsync]]<List<Person>>("api/Persons");

Person ny = new Person { Name = "Lise", City = "Lyngby" };
HttpResponseMessage svar = await client.[[PostAsJsonAsync]]("api/Persons", ny);
Console.WriteLine(svar.[[IsSuccessStatusCode]]);`,
        fordi: "`GetFromJsonAsync` henter og laver om til objekter. `PostAsJsonAsync` laver om til JSON og sender. `IsSuccessStatusCode` er `true` ved 201." },
      { t: "laes", h: "fetch fra en HTML-side",
        md: "I modul 15 brugte du `fetch` i JavaScript. Her er en lille HTML-side, der henter personerne fra dit API og viser dem i en liste. Det er præcis det, en Single Page Application gør.",
        sprog: "html",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8">
    <title>Personer</title>
</head>
<body>
    <h1>Personer</h1>
    <ul id="liste"></ul>

    <script>
        async function hentPersoner() {
            const svar = await fetch("http://localhost:5257/api/Persons");
            const personer = await svar.json();
            const liste = document.getElementById("liste");
            for (const p of personer) {
                const li = document.createElement("li");
                li.textContent = p.name + " fra " + p.city;
                liste.appendChild(li);
            }
        }
        hentPersoner();
    </script>
</body>
</html>`,
        noter: [
          ["fetch(adresse)", "Send en GET fra browseren."],
          ["await svar.json()", "Læs body som JSON og lav den om til JavaScript-objekter."],
          ["p.name", "Lille forbogstav, fordi JSON'en har `\"name\"`. Skriver du `p.Name`, får du `undefined`."]
        ] },
      { t: "forudsig", sprog: "js", q: "Her er JSON'en skrevet direkte i koden, så du kan køre den uden en server. Hvad skriver programmet?",
        kode: R`const json = '[{"id":1,"name":"Ole","city":"Valby"},{"id":2,"name":"Kim","city":"Kalby"}]';
const personer = JSON.parse(json);
for (const p of personer) {
    console.log(p.name + " fra " + p.city);
}
console.log(personer[1].Name);`,
        output: "Ole fra Valby\nKim fra Kalby\nundefined",
        fordi: "`JSON.parse` gør det samme som `svar.json()`. Navnene i JSON'en har lille forbogstav, så `personer[1].Name` med stort N findes ikke og giver `undefined`. Den fejl er nem at lave, når man kommer fra C#." },
      { t: "laes", h: "CORS: når siden kommer fra en anden adresse",
        md: "Åbner du HTML-siden ved at dobbeltklikke på filen, sker der ingenting på siden. Tryk F12 og se i **Console**. Afprøvet i Chrome:\n\n`Access to fetch at 'http://localhost:5257/api/Persons' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`\n\nBrowseren har en sikkerhedsregel: JavaScript fra én **origin** (adresse og port) må ikke læse svar fra en anden — medmindre serveren **siger ja**. Siden kommer fra en fil (origin `null`), API'et fra `localhost:5257`. Det tilladelsessystem hedder **CORS**. Det er **serveren**, der skal give tilladelsen, i `Program.cs`:",
        frag: true,
        kode: R`builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// ... Swagger som før ...

app.UseCors();

app.UseAuthorization();

app.MapControllers();`,
        noter: [
          ["AddCors(…)", "Registrér CORS som service med en standard-politik."],
          ["AllowAnyOrigin()", "Alle sider må kalde API'et. Fint, mens du udvikler."],
          ["AllowAnyHeader() / AllowAnyMethod()", "Tillad alle headers (fx Content-Type) og alle metoder (POST, PUT, DELETE)."],
          ["app.UseCors();", "Trinnet i pipelinen, der sætter tilladelsen på svarene. Står før `MapControllers()`."]
        ],
        md2: "Afprøvet: med de linjer viser siden de tre personer. I et rigtigt system skriver man i stedet `policy.WithOrigins(\"https://min-side.dk\")`, så kun ens egen frontend får lov. **CORS gælder kun JavaScript i en browser** — C#-klienten fra før blev aldrig stoppet." },
      { t: "valg", q: "Din HTML-side får fejlen *blocked by CORS policy*, når den kalder dit API. Hvor skal rettelsen laves?",
        svar: ["På serveren: API'et skal tillade sidens origin med `AddCors` og `UseCors`", "I HTML-siden: skriv `mode: \"no-cors\"` i fetch", "I databasen", "I klientens `HttpClient`"],
        ret: 0, fordi: "Det er serveren, der giver tilladelsen ved at sende headeren `Access-Control-Allow-Origin`. Siden kan ikke selv give sig lov — så ville sikkerhedsreglen være meningsløs." },
      { t: "valg", q: "Et C#-konsolprogram med `HttpClient` kalder dit API, som **ikke** har CORS slået til. Hvad sker der?",
        svar: ["Det virker — CORS håndhæves kun af browsere", "Det fejler med en CORS-fejl", "Det virker kun med AddSingleton", "Programmet kan ikke oversættes"],
        ret: 0, fordi: "CORS er en regel i **browseren**, der beskytter brugeren mod fremmede sider. Afprøvet: konsolklienten virkede før CORS-linjerne kom på. CORS er altså ikke en adgangskontrol til selve API'et — det er login og roller i modul 20." },
      { t: "ide", h: "En side, der viser dine personer",
        md: "1. Lav filen `personer.html` et sted på din computer (fx på skrivebordet) med koden fra før. Ret portnummeret til dit eget.\n2. Start `PersonApi`, og dobbeltklik på filen. Tryk F12, og se CORS-fejlen i **Console**.\n3. Tilføj `AddCors` og `UseCors` i `Program.cs`, og start API'et igen.\n4. Genindlæs siden. Nu står de tre personer på siden.",
        md2: "Udvid selv: tilføj to tekstfelter og en knap, der sender en POST med `fetch(adresse, { method: \"POST\", headers: { \"Content-Type\": \"application/json\" }, body: JSON.stringify({ name: …, city: … }) })`, og hent listen igen bagefter. Afprøvet: svaret er 201." },
      { t: "laes", h: "Løs kobling — og SOLID's D",
        md: "Kig på, hvad de forskellige dele af systemet ved om hinanden:\n\n- **Klienten** (HTML-siden eller C#-programmet) kender kun **adressen** og **JSON-formatet**. Ikke C#-koden, ikke databasen.\n- **Controlleren** kender kun **interfacet** `IPersonsData`. Ikke listen, ikke databasen.\n- **Repository'et** kender databasen, men ikke HTTP.\n\nHver del kan skiftes ud uden at røre de andre. Det hedder **løs kobling**.\n\nIdéen bag controllerens del er **dependency inversion**, D'et i SOLID: *vær afhængig af abstraktioner, ikke af konkrete klasser*. Controlleren (den overordnede logik) afhænger ikke af `DatabaseRepository` (detaljen). Begge afhænger af interfacet. Og **dependency injection** er teknikken, der får det til at virke: ASP.NET giver controlleren den rigtige klasse gennem konstruktøren." },
      { t: "valg", q: "Hvilken af disse er et eksempel på dependency inversion i `PersonApi`?",
        svar: ["`PersonsController` har en konstruktør, der tager imod `IPersonsData`, ikke `DatabaseRepository`", "`PersonsController` skriver `new DatabaseRepository()` i sin konstruktør", "`Person` har `[Required]` på navnet", "API'et svarer med JSON"],
        ret: 0, fordi: "Controlleren afhænger af **abstraktionen** (interfacet). Skrev den `new DatabaseRepository()`, var den bundet til én bestemt klasse — og til en database — og kunne ikke testes eller skiftes uden at blive skrevet om." },
      { t: "forklar", q: "Eksamensspørgsmål: Forklar dependency inversion og løs kobling med dit Web API som eksempel.",
        svar: "**Dependency inversion** er D'et i SOLID: man skal være afhængig af **abstraktioner**, ikke af konkrete klasser. I mit API afhænger `PersonsController` kun af **interfacet** `IPersonsData`. Det er implementeret af både et repository med en liste og et med en database. Med **dependency injection** får controlleren det rigtige objekt gennem sin **konstruktør**, og hvilket det er, står ét sted i `Program.cs`. Det giver **løs kobling**: jeg kan skifte datakilden med én linje uden at røre controlleren, og jeg kan teste controlleren med et test-repository. Klienterne er også løst koblet: de kender kun **adressen og JSON-formatet**, så serveren kan ændres indvendigt, uden at de mærker det.",
        noegle: ["abstraktion", "interface", "konstruktør", "Program.cs", "løs kobling", "JSON"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m19v", titel: "Værksted: byg BookApi selv", vaerksted: true, min: 90, ord: [],
    trin: [
      { t: "laes", h: "Sådan arbejder du i værkstedet",
        md: "Nu bygger du et **nyt** API, `BookApi`, helt selv. Det ligner `PersonApi`, men handler om bøger, så du skal tænke dig om i stedet for at skrive af. Opgaverne bygger oven på hinanden: til sidst har du et API med repository, dependency injection, database og en klient.\n\nDen tredje opgave er en fejlfinding, hvor du skal bruge debuggeren.",
        noter: [
          ["Skriv selv", "Skriv koden med dine egne fingre. Kig i `PersonApi`, hvis du er i tvivl om en form — men skriv det ikke af."],
          ["Kør tit", "Kør efter hver ny fil. Prøv i browseren, Swagger eller en `.http`-fil. Så ved du, hvor en fejl kom ind."],
          ["Læs statuskoden", "404 uden indhold: ingen action passede til adressen. 404 med JSON: din egen `NotFound()`. 500: en exception — læs teksten i konsolvinduet."],
          ["Brug debuggeren", "Sæt et **breakpoint** i actionen eller repository'et, send forespørgslen, og se variablerne i **Locals** (Visual Studio) eller **Threads & Variables** (Rider)."],
          ["Tips før løsning", "Åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv af."]
        ] },

      { t: "opgave", h: "BookApi: model og GET", projekt: "BookApi",
        md: "Opret et nyt Web API-projekt med controllere og uden HTTPS. Det skal kunne give alle bøger og én bog. Bøgerne ligger foreløbig i en liste i controlleren.",
        krav: [
          "Projektet hedder `BookApi` og er lavet med skabelonen ASP.NET Core Web API med controllere (Visual Studio: **Use controllers**; Mac: `--use-controllers`) og uden HTTPS",
          "Vejr-eksemplet (`WeatherForecastController.cs` og `WeatherForecast.cs`) er slettet",
          "`Models/Book.cs` har `Id` (`int`), `Title` (`string`, `[Required]`), `Author` (`string`) og `Year` (`int`)",
          "`Controllers/BooksController.cs` har `[Route(\"api/[controller]\")]`, `[ApiController]` og arver fra `ControllerBase`",
          "En `static` liste med tre bøger: 1 Dune, Frank Herbert, 1965 · 2 Matilda, Roald Dahl, 1988 · 3 Hobbitten, J.R.R. Tolkien, 1937",
          "`GET api/Books` giver alle bøger; `GET api/Books/2` giver Matilda; `GET api/Books/99` giver 404"
        ],
        tip: [
          "Opret projektet som i lektion 2. Lav mappen **Models** selv.",
          "Kopiér formen fra `PersonsController` i hovedet, ikke på skærmen: `[HttpGet]` uden id, og `[HttpGet(\"{id}\")]` med `ActionResult<Book>`.",
          "`Book? book = books.Find(b => b.Id == id); if (book == null) { return NotFound(); } return book;`"
        ],
        fri: true,
        output: "[{\"id\":1,\"title\":\"Dune\",\"author\":\"Frank Herbert\",\"year\":1965},{\"id\":2,\"title\":\"Matilda\",\"author\":\"Roald Dahl\",\"year\":1988},{\"id\":3,\"title\":\"Hobbitten\",\"author\":\"J.R.R. Tolkien\",\"year\":1937}]",
        frag: true,
        loesning: R`// Models/Book.cs
using System.ComponentModel.DataAnnotations;

namespace BookApi.Models;

public class Book
{
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = "";

    public string Author { get; set; } = "";

    public int Year { get; set; }
}

// Controllers/BooksController.cs
using BookApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BooksController : ControllerBase
{
    private static List<Book> books = new List<Book>
    {
        new Book { Id = 1, Title = "Dune", Author = "Frank Herbert", Year = 1965 },
        new Book { Id = 2, Title = "Matilda", Author = "Roald Dahl", Year = 1988 },
        new Book { Id = 3, Title = "Hobbitten", Author = "J.R.R. Tolkien", Year = 1937 }
    };

    [HttpGet]
    public ActionResult<IEnumerable<Book>> GetBooks()
    {
        return books;
    }

    [HttpGet("{id}")]
    public ActionResult<Book> GetBook(int id)
    {
        Book? book = books.Find(b => b.Id == id);
        if (book == null)
        {
            return NotFound();
        }
        return book;
    }
}`,
        ekstra: ["Sæt `\"launchBrowser\": true` og `\"launchUrl\": \"api/Books\"` i `launchSettings.json`, så listen åbner af sig selv.", "Prøv `api/books` med små bogstaver. Virker det? Hvorfor?"] },

      { t: "opgave", h: "Repository, dependency injection og hele CRUD", projekt: "BookApi",
        md: "Flyt bøgerne ud af controlleren og ind i et repository bag et interface. Controlleren må kun kende interfacet. Tilføj samtidig opret, ret og slet, og afprøv alt med Swagger.",
        krav: [
          "`Models/IBooksData.cs` lover fem metoder: `List<Book> GetBooks()`, `Book? GetBook(int id)`, `Book AddBook(Book newBook)`, `Book? EditBook(int id, Book changed)` og `bool DeleteBook(int id)`",
          "`Models/BooksRepository.cs` implementerer interfacet med listen af de tre bøger og et felt `naesteId`, der starter på 4. Alle fem metoder er skrevet færdige",
          "`BooksController` har et `private readonly IBooksData _data;`-felt og en konstruktør, der tager imod `IBooksData`. Der står ingen `new` og ingen liste i controlleren",
          "Controlleren har fem actions: GET alle, GET én, POST (svarer `CreatedAtAction`), PUT `{id}` (204 eller 404) og DELETE `{id}` (204 eller 404)",
          "`Program.cs` registrerer `AddSingleton<IBooksData, BooksRepository>()`",
          "Swagger UI er installeret og åbner af sig selv. En POST med `{ \"title\": \"Momo\", \"author\": \"Michael Ende\", \"year\": 1973 }` giver 201 og id 4"
        ],
        tip: [
          "Byg i den rækkefølge, der ikke giver røde streger: interface → repository → registrering i `Program.cs` → controller.",
          "Får du 500 med `Unable to resolve service for type 'BookApi.Models.IBooksData'`, mangler registreringen i `Program.cs`, eller den står efter `builder.Build()`.",
          "POST: `Book created = _data.AddBook(book); return CreatedAtAction(nameof(GetBook), new { id = created.Id }, created);`"
        ],
        fri: true,
        output: "POST api/Books → 201 Created, Location: http://localhost:5159/api/Books/4\n{\"id\":4,\"title\":\"Momo\",\"author\":\"Michael Ende\",\"year\":1973}\nPUT api/Books/4 → 204\nDELETE api/Books/4 → 204\nDELETE api/Books/4 igen → 404",
        frag: true,
        loesning: R`// Models/IBooksData.cs
namespace BookApi.Models;

public interface IBooksData
{
    List<Book> GetBooks();
    Book? GetBook(int id);
    Book AddBook(Book newBook);
    Book? EditBook(int id, Book changed);
    bool DeleteBook(int id);
}

// Models/BooksRepository.cs
namespace BookApi.Models;

public class BooksRepository : IBooksData
{
    private List<Book> books = new List<Book>
    {
        new Book { Id = 1, Title = "Dune", Author = "Frank Herbert", Year = 1965 },
        new Book { Id = 2, Title = "Matilda", Author = "Roald Dahl", Year = 1988 },
        new Book { Id = 3, Title = "Hobbitten", Author = "J.R.R. Tolkien", Year = 1937 }
    };
    private int naesteId = 4;

    public List<Book> GetBooks()
    {
        return books;
    }

    public Book? GetBook(int id)
    {
        return books.Find(b => b.Id == id);
    }

    public Book AddBook(Book newBook)
    {
        newBook.Id = naesteId;
        naesteId++;
        books.Add(newBook);
        return newBook;
    }

    public Book? EditBook(int id, Book changed)
    {
        Book? book = GetBook(id);
        if (book == null)
        {
            return null;
        }
        book.Title = changed.Title;
        book.Author = changed.Author;
        book.Year = changed.Year;
        return book;
    }

    public bool DeleteBook(int id)
    {
        Book? book = GetBook(id);
        if (book == null)
        {
            return false;
        }
        books.Remove(book);
        return true;
    }
}

// Controllers/BooksController.cs
using BookApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BooksController : ControllerBase
{
    private readonly IBooksData _data;

    public BooksController(IBooksData data)
    {
        _data = data;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Book>> GetBooks()
    {
        return _data.GetBooks();
    }

    [HttpGet("{id}")]
    public ActionResult<Book> GetBook(int id)
    {
        Book? book = _data.GetBook(id);
        if (book == null)
        {
            return NotFound();
        }
        return book;
    }

    [HttpPost]
    public ActionResult<Book> PostBook(Book book)
    {
        Book created = _data.AddBook(book);
        return CreatedAtAction(nameof(GetBook), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public IActionResult PutBook(int id, Book book)
    {
        if (_data.EditBook(id, book) == null)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteBook(int id)
    {
        if (!_data.DeleteBook(id))
        {
            return NotFound();
        }
        return NoContent();
    }
}

// Program.cs (uddrag)
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IBooksData, BooksRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}`,
        ekstra: ["Skift `AddSingleton` til `AddScoped`, og opret en bog. Hvor mange bøger er der, når du bagefter henter alle? Forklar hvorfor, og skift tilbage.", "Prøv også Scalar på `/scalar`."] },

      { t: "opgave", h: "Fejlfinding: bogen, der forsvandt", projekt: "BookTest",
        md: "En kollega har skrevet sit eget `BooksRepository` og testet det i et lille konsolprogram — uden web, så det er nemt at fejlfinde. Testen sletter Matilda og opretter Momo. Men når testen henter Momo igen på hendes id, kommer der en **anden bog** tilbage.\n\nLav et Console-projekt, `BookTest`, og kopiér startkoden ind. Kør det, og se fejlen. Find den så med **debuggeren**: sæt et breakpoint på den første linje i `AddBook`, kør med {{**F5**||debug-knappen (den grønne bille)}}, og se på `books.Count` og listens indhold i {{**Locals**||**Threads & Variables**}}. Hvilke id'er har bøgerne i listen, når Momo får sit?",
        krav: [
          "Programmet skriver `Momo fik id 4`",
          "`GetBook` på Momos id giver Momo",
          "Der er stadig 3 bøger til sidst",
          "Rettelsen er i `BooksRepository` — testkoden øverst er uændret"
        ],
        tip: [
          "Sæt breakpointet i `AddBook`. Hvad er `books.Count`, når Momo bliver tilføjet? Og hvilket id har den sidste bog i listen?",
          "Matilda (id 2) er slettet, så der er 2 bøger: Dune (1) og Hobbitten (3). `books.Count + 1` giver 3 — men det id er allerede taget af Hobbitten. `Find` giver den **første** bog med id 3.",
          "Brug et felt `private int naesteId = 4;` i stedet. Giv bogen `naesteId`, og tæl det op bagefter — præcis som i `PersonsRepository`."
        ],
        start: R`BooksRepository repo = new BooksRepository();

repo.DeleteBook(2);
Book momo = repo.AddBook(new Book { Title = "Momo", Author = "Michael Ende", Year = 1973 });
Console.WriteLine($"Momo fik id {momo.Id}");

Book? fundet = repo.GetBook(momo.Id);
Console.WriteLine($"GetBook({momo.Id}) giver: {fundet?.Title}");
Console.WriteLine($"Antal bøger: {repo.GetBooks().Count}");

class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Author { get; set; } = "";
    public int Year { get; set; }
}

interface IBooksData
{
    List<Book> GetBooks();
    Book? GetBook(int id);
    Book AddBook(Book newBook);
    bool DeleteBook(int id);
}

class BooksRepository : IBooksData
{
    private List<Book> books = new List<Book>
    {
        new Book { Id = 1, Title = "Dune", Author = "Frank Herbert", Year = 1965 },
        new Book { Id = 2, Title = "Matilda", Author = "Roald Dahl", Year = 1988 },
        new Book { Id = 3, Title = "Hobbitten", Author = "J.R.R. Tolkien", Year = 1937 }
    };

    public List<Book> GetBooks()
    {
        return books;
    }

    public Book? GetBook(int id)
    {
        return books.Find(b => b.Id == id);
    }

    public Book AddBook(Book newBook)
    {
        newBook.Id = books.Count + 1;
        books.Add(newBook);
        return newBook;
    }

    public bool DeleteBook(int id)
    {
        Book? book = GetBook(id);
        if (book == null)
        {
            return false;
        }
        books.Remove(book);
        return true;
    }
}`,
        startOutput: "Momo fik id 3\nGetBook(3) giver: Hobbitten\nAntal bøger: 3",
        output: "Momo fik id 4\nGetBook(4) giver: Momo\nAntal bøger: 3",
        loesning: R`BooksRepository repo = new BooksRepository();

repo.DeleteBook(2);
Book momo = repo.AddBook(new Book { Title = "Momo", Author = "Michael Ende", Year = 1973 });
Console.WriteLine($"Momo fik id {momo.Id}");

Book? fundet = repo.GetBook(momo.Id);
Console.WriteLine($"GetBook({momo.Id}) giver: {fundet?.Title}");
Console.WriteLine($"Antal bøger: {repo.GetBooks().Count}");

class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Author { get; set; } = "";
    public int Year { get; set; }
}

interface IBooksData
{
    List<Book> GetBooks();
    Book? GetBook(int id);
    Book AddBook(Book newBook);
    bool DeleteBook(int id);
}

class BooksRepository : IBooksData
{
    private List<Book> books = new List<Book>
    {
        new Book { Id = 1, Title = "Dune", Author = "Frank Herbert", Year = 1965 },
        new Book { Id = 2, Title = "Matilda", Author = "Roald Dahl", Year = 1988 },
        new Book { Id = 3, Title = "Hobbitten", Author = "J.R.R. Tolkien", Year = 1937 }
    };
    private int naesteId = 4;

    public List<Book> GetBooks()
    {
        return books;
    }

    public Book? GetBook(int id)
    {
        return books.Find(b => b.Id == id);
    }

    public Book AddBook(Book newBook)
    {
        newBook.Id = naesteId;
        naesteId++;
        books.Add(newBook);
        return newBook;
    }

    public bool DeleteBook(int id)
    {
        Book? book = GetBook(id);
        if (book == null)
        {
            return false;
        }
        books.Remove(book);
        return true;
    }
}`,
        ekstra: ["Tjek din egen `BooksRepository` i `BookApi`: bruger den `naesteId`? Prøv i Swagger: slet bog 2, opret en ny, og hent den på dens id.", "Hvorfor har `DatabaseRepository` ikke det problem? (Svar: databasen tæller selv id'et op og genbruger det ikke.)"] },

      { t: "opgave", h: "Bøgerne i en database", projekt: "BookApi",
        md: "Gem bøgerne i en database, så de overlever en genstart. Du skal **ikke** ændre `BooksController` — kun tilføje nye klasser og skifte én registrering.",
        krav: [
          "Pakkerne er installeret. Windows: `Microsoft.EntityFrameworkCore.SqlServer` og `Microsoft.EntityFrameworkCore.Tools`. Mac: `Microsoft.EntityFrameworkCore.Sqlite` og `Microsoft.EntityFrameworkCore.Design`",
          "`Models/BooksDB.cs` arver fra `DbContext`, har `DbSet<Book> Books` og lægger de tre bøger ind med `HasData` i `OnModelCreating`",
          "`appsettings.json` har en connection string, der hedder `BooksDB`. Windows: `Server=(localdb)\\\\MSSQLLocalDB;Database=BooksDB;Trusted_Connection=True;TrustServerCertificate=True`. Mac: `Data Source=books.db`",
          "`Program.cs` har `AddDbContext<BooksDB>(…)`",
          "`Models/BooksDatabaseRepository.cs` implementerer `IBooksData`, får `BooksDB` gennem konstruktøren og kalder `SaveChanges()` i hver metode, der ændrer noget",
          "Registreringen er skiftet til `AddScoped<IBooksData, BooksDatabaseRepository>()`, og den gamle linje er kommenteret ud",
          "Migrationen `Init` er lavet og kørt. Efter en POST og en genstart er den nye bog der stadig",
          "`BooksController.cs` er **ikke** ændret"
        ],
        tip: [
          "Det er lektion 4 én gang til med bøger: `PersonsDB` → `BooksDB`, `DatabaseRepository` → `BooksDatabaseRepository`.",
          "Windows, i Package Manager Console: `Add-Migration Init` og `Update-Database`. Mac, i Terminal: `dotnet ef migrations add Init` og `dotnet ef database update`.",
          "Får programmet en fejl ved start om *Cannot consume scoped service*, står der `AddSingleton` i stedet for `AddScoped` på repository'et."
        ],
        fri: true,
        output: "GET api/Books → 200 med Dune, Matilda og Hobbitten (fra databasen)\nPOST api/Books → 201 med id 4\nGenstart, GET api/Books → 4 bøger",
        frag: true,
        loesning: R`// Models/BooksDB.cs
using Microsoft.EntityFrameworkCore;

namespace BookApi.Models;

public class BooksDB : DbContext
{
    public BooksDB(DbContextOptions<BooksDB> options) : base(options)
    {
    }

    public DbSet<Book> Books { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Book>().HasData(
            new Book { Id = 1, Title = "Dune", Author = "Frank Herbert", Year = 1965 },
            new Book { Id = 2, Title = "Matilda", Author = "Roald Dahl", Year = 1988 },
            new Book { Id = 3, Title = "Hobbitten", Author = "J.R.R. Tolkien", Year = 1937 }
        );
    }
}

// Models/BooksDatabaseRepository.cs
namespace BookApi.Models;

public class BooksDatabaseRepository : IBooksData
{
    private readonly BooksDB _db;

    public BooksDatabaseRepository(BooksDB db)
    {
        _db = db;
    }

    public List<Book> GetBooks()
    {
        return _db.Books.ToList();
    }

    public Book? GetBook(int id)
    {
        return _db.Books.Find(id);
    }

    public Book AddBook(Book newBook)
    {
        _db.Books.Add(newBook);
        _db.SaveChanges();
        return newBook;
    }

    public Book? EditBook(int id, Book changed)
    {
        Book? book = _db.Books.Find(id);
        if (book == null)
        {
            return null;
        }
        book.Title = changed.Title;
        book.Author = changed.Author;
        book.Year = changed.Year;
        _db.SaveChanges();
        return book;
    }

    public bool DeleteBook(int id)
    {
        Book? book = _db.Books.Find(id);
        if (book == null)
        {
            return false;
        }
        _db.Books.Remove(book);
        _db.SaveChanges();
        return true;
    }
}

// Program.cs (uddrag) — Windows: UseSqlServer, Mac: UseSqlite
using BookApi.Models;
using Microsoft.EntityFrameworkCore;

builder.Services.AddDbContext<BooksDB>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BooksDB")));

// builder.Services.AddSingleton<IBooksData, BooksRepository>();
builder.Services.AddScoped<IBooksData, BooksDatabaseRepository>();`,
        ekstra: ["Tilføj en property `Pages` (`int`) til `Book`, lav en ny migration (`AddPages`), og opdatér databasen. Hvilke filer skulle ændres? (Controlleren igen ikke.)"] },

      { t: "opgave", h: "En klient til BookApi", projekt: "BookKlient",
        md: "Til sidst skal et andet program bruge dit API. Lav et Console-projekt, `BookKlient`, i samme solution som `BookApi` (eller som et selvstændigt projekt). Det skal liste bøgerne, oprette en, tjekke en bog, der ikke findes, og rydde op efter sig. Start `BookApi` først, og kør så klienten.\n\nEksemplet nedenfor er kørt mod en database med kun de tre bøger fra `HasData`. Står bogen fra forrige opgave stadig i din database, kommer den også med i listen, og Momo får et højere id (fx `Oprettet med id 5`). Det er rigtigt nok: databasen genbruger aldrig et id.",
        krav: [
          "Klienten har sin egen klasse `Book` med `Id`, `Title`, `Author` og `Year`",
          "En `HttpClient` med `BaseAddress` sat til dit API's adresse (med dit portnummer)",
          "Den henter alle bøger med `GetFromJsonAsync` og skriver hver som `{Id}: {Title} ({Year})`",
          "Den opretter Momo (Michael Ende, 1973) med `PostAsJsonAsync` og skriver statuskoden som tal og `Oprettet med id {Id}`",
          "Den henter bog 999 med `GetAsync` og skriver `IsSuccessStatusCode`",
          "Den sletter Momo igen med `DeleteAsync` og skriver statuskoden som tal"
        ],
        tip: [
          "Start med kun at hente og skrive bøgerne. Virker det, så tilføj resten én ad gangen.",
          "`HttpResponseMessage svar = await client.PostAsJsonAsync(\"api/Books\", ny); Console.WriteLine((int)svar.StatusCode);`",
          "Den gemte bog: `Book? gemt = await svar.Content.ReadFromJsonAsync<Book>();` — og slet den med `await client.DeleteAsync($\"api/Books/{gemt!.Id}\");`"
        ],
        fri: true,
        output: "1: Dune (1965)\n2: Matilda (1988)\n3: Hobbitten (1937)\n201\nOprettet med id 4\nFalse\n204",
        frag: true,
        loesning: R`using System.Net.Http.Json;

HttpClient client = new HttpClient();
client.BaseAddress = new Uri("http://localhost:5159/");

List<Book>? books = await client.GetFromJsonAsync<List<Book>>("api/Books");
foreach (Book b in books!)
{
    Console.WriteLine($"{b.Id}: {b.Title} ({b.Year})");
}

Book ny = new Book { Title = "Momo", Author = "Michael Ende", Year = 1973 };
HttpResponseMessage svar = await client.PostAsJsonAsync("api/Books", ny);
Console.WriteLine((int)svar.StatusCode);
Book? gemt = await svar.Content.ReadFromJsonAsync<Book>();
Console.WriteLine($"Oprettet med id {gemt!.Id}");

HttpResponseMessage ikkeFundet = await client.GetAsync("api/Books/999");
Console.WriteLine(ikkeFundet.IsSuccessStatusCode);

HttpResponseMessage slet = await client.DeleteAsync($"api/Books/{gemt.Id}");
Console.WriteLine((int)slet.StatusCode);

class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Author { get; set; } = "";
    public int Year { get; set; }
}`,
        ekstra: [
          "Lav en `books.html` med `fetch`, der viser bøgerne i en liste. Slå CORS til i `BookApi`, så siden må kalde API'et.",
          "Lav en `BookApi.http` med alle fem operationer, så du kan teste API'et uden klienten.",
          "Forbered dig til eksamen: forklar højt, med din egen kode foran dig, de fire steder, dependency injection består af i `BookApi`."
        ] }
    ] }
  ]
});
})();
