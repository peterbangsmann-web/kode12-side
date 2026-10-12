// Modul 16 — ASP.NET Core MVC. Forudsætter: modul 0–15 (C#, OOP, collections, LINQ, HTML/CSS, JavaScript).
// Al ASP.NET-kode er afprøvet i et rigtigt projekt (dotnet new mvc, .NET 10) og kørt med curl, før den blev sat ind her.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m16", nr: 16, del: "Del 5 · ASP.NET Core", ikon: "🌐",
  titel: "ASP.NET Core MVC",
  dag: "Kursusdag 13–14 · Intro til ASP.NET MVC",
  intro: "Nu bygger du din første **webapplikation** i C#. Du lærer, hvad der sker, når en browser beder om en side, og hvordan ASP.NET Core MVC deler arbejdet mellem **model**, **view** og **controller**.\n\nGennem hele modulet bygger du ét program, **FilmKlub**: en liste over film, en side for hver film og en formular, der opretter nye film med validering. Det er det samme skelet, dit eksamensprojekt får. Databasen kommer i modul 17 — her ligger dataene i en liste i hukommelsen.",
  video: ["13_Ons_JS+MVC.mp4 (4 t 23 min)", "14_Tors_MVCCore_CodeFirst.mp4 (4 t 9 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m16l1", titel: "Sådan virker nettet: forespørgsel og svar", min: 15,
    ord: [
      ["Klient", "Det program, der beder om noget. På nettet er det næsten altid browseren."],
      ["Server", "Det program, der svarer. Det venter på forespørgsler og sender svar tilbage. Din ASP.NET-app er en server."],
      ["HTTP", "Det sprog, browser og server taler sammen på. Hver samtale er én forespørgsel og ét svar."],
      ["Request (forespørgsel)", "Det, browseren sender til serveren: en metode (fx GET), en adresse og evt. data."],
      ["Response (svar)", "Det, serveren sender tilbage: en statuskode og et indhold, fx HTML."],
      ["URL", "En adresse på nettet, fx `https://localhost:7018/Film/Details/2`."],
      ["GET og POST", "De to vigtigste HTTP-metoder. GET henter noget. POST sender data, der skal gemmes eller behandles."],
      ["Statuskode", "Et tal i svaret, der siger, hvordan det gik: 200 OK, 302 omdirigering, 404 ikke fundet, 500 fejl på serveren."]
    ],
    trin: [
      { t: "laes", h: "To programmer, der taler sammen",
        md: "Når du åbner en hjemmeside, er der **to programmer** i gang:\n\n- **Klienten** er browseren (Edge, Chrome, Safari). Den **beder** om en side.\n- **Serveren** er et program på en anden computer — eller på din egen. Den **svarer**.\n\nServeren laver hele siden færdig som HTML og sender den til browseren. Browseren viser bare det, den får.\n\nI dette modul skriver du **serveren** i C#. Den kører på din egen pc, så klient og server er på samme maskine. Det ændrer ikke ved princippet: browseren spørger, serveren svarer." },
      { t: "valg", q: "Du åbner FilmKlub-appen i browseren på din egen pc. Hvem er klienten, og hvem er serveren?",
        svar: ["Browseren er klienten. Dit C#-program er serveren.", "Dit C#-program er klienten. Browseren er serveren.", "Begge dele er serveren, fordi de kører på samme pc", "Der er ingen server, når det hele kører på din egen pc"],
        ret: 0, fordi: "Det afgørende er **rollen**, ikke maskinen. Den, der beder om noget, er klienten. Den, der svarer, er serveren. At de kører på samme pc under udviklingen, ændrer ikke på det." },
      { t: "laes", h: "En forespørgsel og et svar",
        md: "Browser og server taler **HTTP**. En samtale er altid **én forespørgsel** (request) og **ét svar** (response). Sådan ser de ud som tekst, lidt forenklet:",
        sprog: "text",
        kode: R`GET /Film/Details/2 HTTP/1.1
Host: localhost:7018

HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8

<h1>Flammen og Citronen</h1>
...`,
        noter: [
          ["GET", "**Metoden**: hvad browseren vil. GET betyder \"giv mig\"."],
          ["/Film/Details/2", "**Stien**: hvilken side der ønskes."],
          ["Host: localhost:7018", "Hvilken server og port spørgsmålet går til."],
          ["200 OK", "**Statuskoden** i svaret: det gik godt."],
          ["Content-Type: text/html", "Hvad slags indhold svaret har. Her er det HTML."],
          ["<h1>…", "Selve **indholdet**: den HTML, browseren viser."]
        ] },
      { t: "orden", sprog: "text", frag: true,
        q: "Sæt trinnene i rækkefølge: hvad sker der, fra du skriver en adresse, til du ser siden?",
        linjer: ["Du skriver adressen og trykker Enter", "Browseren sender en GET-forespørgsel til serveren", "Serveren finder ud af, hvilken kode der skal svare", "Serveren laver HTML'en og sender et svar med statuskode 200", "Browseren viser HTML'en på skærmen"],
        fordi: "Klienten starter altid samtalen. Serveren gør intet, før den bliver spurgt — og når den har svaret, er samtalen slut. Næste klik er en ny forespørgsel." },
      { t: "laes", h: "En URL i dele",
        md: "En adresse består af faste dele. ASP.NET bruger især **stien** til at finde ud af, hvilken kode der skal køre.",
        sprog: "text",
        kode: R`https://localhost:7018/Film/Details/2?sort=aar`,
        noter: [
          ["https://", "**Protokollen**. `https` er HTTP med kryptering."],
          ["localhost", "**Værten**: hvilken computer. `localhost` betyder \"denne computer\"."],
          [":7018", "**Porten**: hvilket program på computeren. Din app får sit eget nummer."],
          ["/Film/Details/2", "**Stien**. Den bliver vigtig i lektion 3."],
          ["?sort=aar", "**Query string**: ekstra værdier efter et spørgsmålstegn, som navn=værdi."]
        ] },
      { t: "udfyld", sprog: "text", frag: true,
        q: "Adressen er `https://localhost:5180/Film/Hej?navn=Peter`. Udfyld delene.",
        kode: R`Protokol:     [[https]]
Vært:         [[localhost]]
Port:         [[5180]]
Sti:          /Film/Hej
Query string: navn=[[Peter]]`,
        fordi: "Porten står efter kolon. Query string står efter `?` og består af `navn=værdi`." },
      { t: "laes", h: "GET og POST",
        md: "De to HTTP-metoder, du skal kende, er:\n\n- **GET** — \"giv mig noget\". Bruges, når du klikker på et link eller skriver en adresse. Data kan kun sendes i adressen (query string). En GET må aldrig ændre noget på serveren.\n- **POST** — \"her er noget, du skal behandle\". Bruges, når du sender en formular, der **opretter eller ændrer** noget. Dataene ligger inde i forespørgslen, ikke i adressen.\n\nDu mødte begge i modul 13, da du lavede formularer med `method=\"get\"` og `method=\"post\"`. Nu er det dig, der skriver serveren, der tager imod dem." },
      { t: "valg", q: "En side har en formular, hvor man opretter en ny film. Hvilken HTTP-metode skal formularen bruge, når man klikker Gem?",
        svar: ["POST, fordi formularen opretter noget på serveren", "GET, fordi man får en side tilbage bagefter", "GET, fordi det er hurtigere", "Det er lige meget, de gør det samme"],
        ret: 0, fordi: "Alt, der **ændrer** noget på serveren (opret, ret, slet), skal være POST. GET er kun til at hente. En søgeformular er et godt eksempel på en formular, der *må* bruge GET: den ændrer ikke noget." },
      { t: "laes", h: "Statuskoder",
        md: "Hvert svar har en **statuskode**: et tal, der siger, hvordan det gik. Første ciffer fortæller typen:\n\n- **2xx — det gik godt.** `200 OK` er det almindelige svar.\n- **3xx — gå et andet sted hen.** `302 Found` betyder \"spørg i stedet på denne adresse\". Browseren gør det selv med det samme.\n- **4xx — klienten bad om noget forkert.** `404 Not Found`: siden findes ikke. `400 Bad Request`: forespørgslen var forkert.\n- **5xx — serveren fejlede.** `500 Internal Server Error`: din C#-kode kastede en exception.\n\nTommelfingerregel: **4xx er klientens fejl, 5xx er din fejl.**" },
      { t: "valg", q: "Du åbner `/Film/Details/99`, men der findes ingen film med nummer 99. Hvilken statuskode er rigtig at svare med?",
        svar: ["404 Not Found", "200 OK", "500 Internal Server Error", "302 Found"],
        ret: 0, fordi: "Det, der blev spurgt om, findes ikke: 404. En 500 ville betyde, at din kode var gået ned — det er den ikke, den har bare ikke noget at vise." },
      { t: "valg", q: "Når man har gemt en ny film, sender serveren statuskode 302 og adressen `/Film`. Hvad gør browseren så?",
        svar: ["Den sender selv en ny GET-forespørgsel til /Film og viser listen", "Den viser en fejlside", "Den sender formularen igen", "Ingenting — brugeren skal selv klikke videre"],
        ret: 0, fordi: "302 er en **omdirigering** (redirect). Browseren følger den automatisk med en ny GET. Det bruger du i lektion 6, så man ikke kommer til at gemme den samme film to gange." },
      { t: "ide", h: "Se forespørgslerne med dine egne øjne",
        md: "Browseren har et værktøj, der viser hver eneste forespørgsel og hvert svar. Det er det bedste værktøj til at forstå — og fejlfinde — en webapp.",
        win: ["Åbn Edge eller Chrome, og tryk **F12**. Udviklerværktøjerne åbner.", "Klik på fanen **Network** (på dansk: **Netværk**).", "Gå til `https://www.dr.dk` i adresselinjen.", "Klik på den **første** linje i listen. Find **Request Method: GET** og **Status Code: 200**.", "Gå nu til `https://www.dr.dk/findes-ikke-123`. Find linjen for siden, og se statuskoden **404**."],
        mac: ["Åbn Chrome, og tryk **⌥⌘I** (eller vælg **Vis → Udvikler → Udviklerværktøjer**). I Safari skal du først slå menuen **Udvikler** til under **Safari → Indstillinger → Avanceret**.", "Klik på fanen **Network** (på dansk: **Netværk**).", "Gå til `https://www.dr.dk` i adresselinjen.", "Klik på den **første** linje i listen. Find **Request Method: GET** og **Status Code: 200**.", "Gå nu til `https://www.dr.dk/findes-ikke-123`. Find linjen for siden, og se statuskoden **404**."],
        md2: "Læg mærke til, at **én side giver mange forespørgsler**: én for HTML'en og derefter én for hver CSS-fil, JavaScript-fil og hvert billede. Det samme sker med din egen app. Brug fanen Network igen i lektion 6, når du sender en formular: så kan du se POST og 302." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad sker der, fra brugeren skriver en adresse i browseren, til siden står på skærmen?",
        svar: "Browseren er **klienten**. Den sender en **HTTP-forespørgsel** med metoden **GET** og stien fra **URL**'en til **serveren**. Serveren finder ud af, hvilken kode der skal svare, laver HTML'en og sender et **svar** tilbage med en **statuskode**, fx 200 OK. Browseren viser HTML'en. Hver ny side eller hvert klik er en ny forespørgsel.",
        noegle: ["klient", "server", "forespørgsel", "GET", "svar", "statuskode", "HTML"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m16l2", titel: "Dit første MVC-projekt", min: 20,
    ord: [
      ["ASP.NET Core", "Microsofts framework til at lave webapplikationer i C#."],
      ["MVC", "Model-View-Controller: et arkitekturmønster, der deler en webapp i tre dele med hver sin opgave."],
      ["Model", "Klasserne, der beskriver dataene, fx `Film`. Ved ingenting om HTML."],
      ["View", "En `.cshtml`-fil, der laver HTML'en, brugeren ser."],
      ["Controller", "En klasse, der tager imod forespørgslen, henter data og vælger, hvilket view der skal vises."],
      ["wwwroot", "Mappen med filer, der sendes direkte til browseren: CSS, JavaScript, billeder."],
      ["Middleware", "Et led i den kæde, hver forespørgsel går igennem i serveren, fx HTTPS-omdirigering eller routing."],
      ["Pipeline", "Hele kæden af middleware, i den rækkefølge den står i `Program.cs`."]
    ],
    trin: [
      { t: "laes", h: "MVC: tre dele med hver sin opgave",
        md: "En webapp kan hurtigt blive ét stort rod, hvor databasekode, HTML og logik står i samme fil. **MVC** er et **arkitekturmønster**, der deler arbejdet i tre:\n\n- **Model** — klasserne for dataene, fx `Film` med `Titel` og `Aar`. Modellen ved intet om HTML.\n- **View** — skabelonen, der laver HTML'en. Viewet viser data, men henter dem ikke selv.\n- **Controller** — tager imod forespørgslen, henter modellen og vælger viewet.\n\nDet svarer til en restaurant: tjeneren (controlleren) tager imod bestillingen, køkkenet leverer maden (modellen), og tallerkenen er anretningen (viewet).\n\nGevinsten: Du kan ændre udseendet uden at røre logikken — og omvendt. Og til eksamen kan du pege på, **hvor** hver ting hører hjemme." },
      { t: "valg", q: "I MVC: Hvilken del tager imod forespørgslen fra browseren og bestemmer, hvad der skal ske?",
        svar: ["Controlleren", "Viewet", "Modellen", "wwwroot"],
        ret: 0, fordi: "Forespørgslen rammer altid en **controller** først. Den henter data (modellen) og sender dem videre til et **view**, der laver HTML'en." },
      { t: "ide", h: "Opret projektet FilmKlub",
        md: "Opret et nyt MVC-projekt, der hedder **FilmKlub**, og kør det. Det er det projekt, du bygger videre på i resten af modulet.",
        win: ["Åbn Visual Studio, og vælg **Create a new project**.", "Skriv `mvc` i søgefeltet, og vælg **ASP.NET Core Web App (Model-View-Controller)** — den med C#. Klik **Next**.", "Skriv `FilmKlub` som **Project name**, vælg en mappe, og klik **Next**.", "Vælg **Framework: .NET 10**, **Authentication type: None**, og lad **Configure for HTTPS** være slået til. Klik **Create**.", "Klik på den grønne pil ▶ øverst (der står **https** ved siden af).", "Spørger Visual Studio, om du vil stole på et udviklingscertifikat (\"trust the ASP.NET Core SSL certificate\"), så klik **Yes** begge gange.", "Browseren åbner med siden **Welcome**. Stop programmet med den røde firkant ■ i Visual Studio."],
        mac: ["Åbn Rider, og vælg **New Solution**.", "Vælg **ASP.NET Core Web Application** i listen til venstre.", "Skriv `FilmKlub` som navn. Ved **Type** (eller **Template**) vælger du **Web App (Model-View-Controller)**, og ved **Framework** **net10.0**. Klik **Create**.", "Kan du ikke finde skabelonen, så åbn **Terminal** og skriv `dotnet new mvc -n FilmKlub`. Åbn derefter mappen FilmKlub i Rider med **Open**.", "Første gang: åbn Terminal og skriv `dotnet dev-certs https --trust`, så browseren stoler på din lokale HTTPS.", "Vælg kørselskonfigurationen **FilmKlub: https** øverst, og klik på den grønne pil ▶.", "Åbner browseren ikke selv, så klik på adressen (fx `https://localhost:7018`) i vinduet **Run** nederst. Stop programmet med den røde firkant ■."],
        md2: "Dit portnummer er et andet end 7018 — det vælges tilfældigt, når projektet oprettes. Brug altid dit eget." },
      { t: "laes", h: "Rundtur i projektet",
        md: "Skabelonen har lavet en række mapper og filer. Du skal kunne forklare dem alle til eksamen.",
        sprog: "text",
        kode: R`FilmKlub/
  Controllers/
    HomeController.cs
  Models/
    ErrorViewModel.cs
  Views/
    Home/
      Index.cshtml
      Privacy.cshtml
    Shared/
      _Layout.cshtml
      Error.cshtml
      _ValidationScriptsPartial.cshtml
    _ViewImports.cshtml
    _ViewStart.cshtml
  wwwroot/
    css/  js/  lib/  favicon.ico
  Properties/
    launchSettings.json
  appsettings.json
  Program.cs`,
        noter: [
          ["Controllers/", "Controller-klasserne. `HomeController` svarer på `/Home/...`."],
          ["Models/", "Model-klasserne. Her lægger du `Film.cs`."],
          ["Views/Home/", "Views til `HomeController`. **Mappenavnet = controllerens navn uden \"Controller\"**."],
          ["Views/Shared/", "Views, som alle controllere kan bruge, fx layoutet med menuen."],
          ["_ViewImports / _ViewStart", "Fælles indstillinger for alle views (lektion 5)."],
          ["wwwroot/", "**Statiske filer**: sendes direkte til browseren uden C#. `lib/` indeholder Bootstrap og jQuery."],
          ["launchSettings.json", "Hvordan appen startes under udvikling: portnumre og miljøet `Development`."],
          ["appsettings.json", "Indstillinger. I modul 17 kommer databasens adresse (connection string) herind."],
          ["Program.cs", "Startpunktet. Her sættes serveren op."]
        ] },
      { t: "valg", q: "Du vil lægge et baggrundsbillede, `baggrund.png`, som din CSS-fil bruger. Hvor skal billedet ligge?",
        svar: ["I wwwroot, fx wwwroot/images/baggrund.png", "I Views/Shared", "I Controllers", "Ved siden af Program.cs"],
        ret: 0, fordi: "Browseren kan kun hente filer, der ligger i **wwwroot**. Ligger billedet andre steder, svarer serveren 404 — det er en klassisk fejl." },
      { t: "valg", q: "`HomeController` har en metode, der hedder `Privacy`, og den svarer med `return View();`. Hvilken fil bruges som view?",
        svar: ["Views/Home/Privacy.cshtml", "Views/Privacy/Home.cshtml", "Views/HomeController/Privacy.cshtml", "Privacy.html i wwwroot"],
        ret: 0, fordi: "Reglen er `Views/{controllernavn uden Controller}/{metodenavn}.cshtml`. Finder den ingen fil dér, prøver den `Views/Shared/Privacy.cshtml`." },
      { t: "laes", h: "Program.cs, del 1: byg appen",
        md: "`Program.cs` er det første, der kører. Den består af to halvdele. Første halvdel **bygger** appen:",
        frag: true,
        kode: R`var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();`,
        noter: [
          ["WebApplication.CreateBuilder(args)", "Laver en **builder**: et objekt, der samler alt, appen skal bruge, før den startes. Den læser også `appsettings.json`."],
          ["builder.Services", "En liste over **services**: færdige dele, som resten af appen kan bede om."],
          ["AddControllersWithViews()", "Tilføjer det, MVC skal bruge: controllere, views og Razor. Uden den virker ingen af dine sider."],
          ["builder.Build()", "Bygger den færdige app ud fra builderen. Efter denne linje kan der ikke tilføjes flere services."]
        ],
        md2: "I modul 17 tilføjer du databasen på præcis samme måde: `builder.Services.AddDbContext<...>(...)`. Det hedder **dependency injection** og bliver forklaret dér." },
      { t: "valg", q: "Hvad sker der, hvis du sletter linjen `builder.Services.AddControllersWithViews();`?",
        svar: ["Appen går ned, når den starter, fordi MVC-delene ikke er registreret", "Intet — linjen er kun en kommentar", "Appen virker, men uden CSS", "Kun forsiden virker"],
        ret: 0, fordi: "Afprøvet: appen stopper med `InvalidOperationException: Unable to find the required services…`. Senere linjer i `Program.cs` regner med, at MVC's services findes." },
      { t: "laes", h: "Program.cs, del 2: kæden, hver forespørgsel går igennem",
        md: "Anden halvdel bestemmer, hvad der sker med **hver eneste forespørgsel**. Hver linje `app.Use…` tilføjer et led til en kæde. Leddene hedder **middleware**, og hele kæden hedder **pipelinen**. Forespørgslen går igennem leddene **i den rækkefølge, de står i**.",
        frag: true,
        kode: R`if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

app.Run();`,
        noter: [
          ["!app.Environment.IsDevelopment()", "Kun når appen **ikke** kører på din udviklings-pc (dvs. i drift)."],
          ["UseExceptionHandler(\"/Home/Error\")", "Går koden ned, ser brugeren en pæn fejlside i stedet for detaljer om din kode. Under udvikling ser du i stedet den fulde fejl."],
          ["UseHsts()", "Fortæller browseren, at den kun må bruge HTTPS til siden fremover."],
          ["UseHttpsRedirection()", "Kommer der en forespørgsel på `http://`, omdirigeres den til `https://`."],
          ["UseRouting()", "Finder ud af, hvilken controller og metode adressen passer til."],
          ["UseAuthorization()", "Tjekker, om brugeren må se siden. Bruges til login i modul 20."],
          ["MapStaticAssets()", "Sender filerne fra **wwwroot** direkte til browseren."],
          ["MapControllerRoute(…)", "**Ruten**: reglen, der oversætter en adresse til controller og metode. Lektion 3 handler om den."],
          ["app.Run()", "Starter serveren. Den kører nu og venter på forespørgsler, til du stopper den."]
        ] },
      { t: "orden", frag: true,
        q: "Sæt de vigtigste linjer i `Program.cs` i den rigtige rækkefølge.",
        linjer: [R`var builder = WebApplication.CreateBuilder(args);`, R`builder.Services.AddControllersWithViews();`, R`var app = builder.Build();`, R`app.UseHttpsRedirection();`, R`app.UseRouting();`, R`app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");`, R`app.Run();`],
        fordi: "Først services (før `Build`), så appen bygges, så pipelinen sættes op, og til sidst `Run`, der starter serveren. `Run` skal stå sidst: linjer efter den kører først, når serveren stopper." },
      { t: "udfyld", frag: true,
        q: "Udfyld de manglende ord i `Program.cs`.",
        kode: R`var builder = WebApplication.CreateBuilder(args);
builder.Services.[[AddControllersWithViews]]();

var app = builder.[[Build]]();

app.UseHttpsRedirection();
app.UseRouting();
app.MapStaticAssets();
app.[[MapControllerRoute]](
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.[[Run]]();`,
        fordi: "Services tilføjes på `builder.Services`. `Build()` laver appen. `MapControllerRoute` sætter ruten op. `Run()` starter serveren." },
      { t: "valg", q: "Din app kører på `https://localhost:7018`. I hvilken fil står portnummeret 7018?",
        svar: ["Properties/launchSettings.json", "appsettings.json", "Program.cs", "Views/Shared/_Layout.cshtml"],
        ret: 0, fordi: "`launchSettings.json` beskriver, hvordan appen startes under udvikling: profilerne `http` og `https`, deres adresser og miljøet `Development`. Den bruges kun på din egen pc." },
      { t: "ide", h: "Din første ændring",
        md: "Ret forsiden, så den siger noget om FilmKlub.",
        win: ["Åbn **Views → Home → Index.cshtml** i Solution Explorer.", "Ret `<h1 class=\"display-4\">Welcome</h1>` til `<h1 class=\"display-4\">Velkommen til FilmKlub</h1>`.", "Ret linjen `ViewData[\"Title\"] = \"Home Page\";` til `ViewData[\"Title\"] = \"Forside\";`.", "Start med den grønne pil ▶. Se den nye overskrift, og se teksten **Forside - FilmKlub** på fanebladet i browseren.", "Stop programmet igen med ■."],
        mac: ["Åbn **Views → Home → Index.cshtml** i vinduet Explorer.", "Ret `<h1 class=\"display-4\">Welcome</h1>` til `<h1 class=\"display-4\">Velkommen til FilmKlub</h1>`.", "Ret linjen `ViewData[\"Title\"] = \"Home Page\";` til `ViewData[\"Title\"] = \"Forside\";`.", "Start med den grønne pil ▶. Se den nye overskrift, og se teksten **Forside - FilmKlub** på fanebladet i browseren.", "Stop programmet igen med ■."],
        md2: "Vane fra nu af: **stop og start appen igen**, når du har ændret noget. Så er du sikker på, at du ser den nye udgave." },
      { t: "forklar", q: "Til eksamen bliver du bedt om at forklare jeres `Program.cs`. Forklar de to halvdele med dine egne ord.",
        svar: "Første halvdel laver en **builder** og registrerer de **services**, appen skal bruge — fx `AddControllersWithViews` for MVC (og senere databasen). Så kaldes `Build()`. Anden halvdel sætter **pipelinen** op: den kæde af **middleware**, hver forespørgsel går igennem i rækkefølge — HTTPS-omdirigering, **routing**, autorisation, statiske filer fra wwwroot — og `MapControllerRoute` med ruten `{controller=Home}/{action=Index}/{id?}`. Til sidst starter `app.Run()` serveren.",
        noegle: ["builder", "services", "Build", "middleware", "pipeline", "rækkefølge", "routing", "Run"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m16l3", titel: "Controllere, actions og routing", min: 20,
    ord: [
      ["Action", "En public metode i en controller. Hver action kan svare på en adresse."],
      ["Routing", "Reglen, der oversætter en adresse (fx `/Film/Details/2`) til en controller, en action og evt. et id."],
      ["Rute", "Et mønster som `{controller=Home}/{action=Index}/{id?}`, der beskriver, hvordan adresser ser ud."],
      ["IActionResult", "Returtypen for en action. Betyder \"et eller andet svar\": et view, tekst, JSON, en omdirigering …"],
      ["View()", "Svar med HTML lavet af et view."],
      ["Content()", "Svar med ren tekst uden HTML."],
      ["Json()", "Svar med data i JSON-format."],
      ["RedirectToAction()", "Svar med 302, så browseren går videre til en anden action."]
    ],
    trin: [
      { t: "laes", h: "En controller er en almindelig klasse",
        md: "En **controller** er en C#-klasse med tre kendetegn:\n\n1. Navnet **ender på** `Controller`.\n2. Den **arver** fra `Controller` (arv kender du fra modul 5). Derfra får den metoder som `View()` og `Content()`.\n3. Dens **public metoder** hedder **actions**. Hver action kan svare på en adresse.\n\nSådan ser skabelonens `HomeController` ud (forkortet):",
        frag: true,
        kode: R`using Microsoft.AspNetCore.Mvc;

namespace FilmKlub.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }
}`,
        noter: [
          ["using Microsoft.AspNetCore.Mvc;", "Giver adgang til `Controller`, `IActionResult` og resten af MVC."],
          ["namespace FilmKlub.Controllers;", "Klassen ligger i navnerummet for projektets controllere."],
          ["HomeController : Controller", "Arver fra MVC's `Controller`-klasse."],
          ["public IActionResult Index()", "En **action**. Den svarer på `/Home/Index`."],
          ["return View();", "Svar med viewet `Views/Home/Index.cshtml`."]
        ] },
      { t: "valg", q: "Hvilken adresse kalder action-metoden `Privacy` i `HomeController`?",
        svar: ["/Home/Privacy", "/HomeController/Privacy", "/Privacy/Home", "/Views/Home/Privacy.cshtml"],
        ret: 0, fordi: "I adressen skriver man controllerens navn **uden** ordet Controller, og så actionens navn. Browseren beder aldrig om en `.cshtml`-fil direkte — den beder om en action." },
      { t: "laes", h: "Ruten: fra adresse til action",
        md: "Linjen i `Program.cs` med `pattern: \"{controller=Home}/{action=Index}/{id?}\"` er **ruten**. Den deler stien op ved `/` og bruger delene i rækkefølge:\n\n1. Første del er **controlleren**. Mangler den, bruges `Home`.\n2. Anden del er **actionen**. Mangler den, bruges `Index`.\n3. Tredje del er **id**. Spørgsmålstegnet betyder, at den **må mangle**.\n\nEksempler:\n\n- `/` → `HomeController.Index()`\n- `/Film` → `FilmController.Index()`\n- `/Film/Details/2` → `FilmController.Details(2)`\n- `/Film/Hej?navn=Peter` → `FilmController.Hej(\"Peter\")` — værdien kommer fra query string\n\nHar actionen en parameter, der hedder `id`, får den værdien fra adressen automatisk. Det er en del af **model binding**, som du lærer mere om i lektion 6." },
      { t: "spor",
        q: "Programmet efterligner, hvad ruten gør med stien `Film`: den deles ved `/`, og manglende dele får standardværdien. Udfyld skemaet linje for linje.",
        kode: R`string sti = "Film";
string[] dele = sti.Split('/');
string controller = dele.Length > 0 ? dele[0] : "Home";
string action = dele.Length > 1 ? dele[1] : "Index";
string id = dele.Length > 2 ? dele[2] : "(intet)";`,
        kolonner: ["controller", "action", "id"],
        raekker: [[1, "=–", "=–", "=–"], [2, "=–", "=–", "=–"], [3, "Film", "–", "–"], [4, "Film", "Index", "–"], [5, "Film", "Index", "(intet)"]],
        fordi: "`\"Film\".Split('/')` giver et array med kun ét element, så `dele.Length` er 1. Controlleren bliver `Film`, men der er ingen anden og tredje del, så action får standardværdien `Index`, og id mangler. Derfor kalder `/Film` metoden `FilmController.Index()`." },
      { t: "valg", q: "Ruten er `{controller=Home}/{action=Index}/{id?}`. Hvilken action kaldes for adressen `/` (bare skråstreg)?",
        svar: ["HomeController.Index()", "Ingen — man får 404", "HomeController.Privacy()", "FilmController.Index()"],
        ret: 0, fordi: "Både controller og action mangler, så begge standardværdier bruges: `Home` og `Index`. Derfor er `HomeController.Index` forsiden." },
      { t: "valg", q: "Hvad sker der, hvis man fjerner spørgsmålstegnet, så ruten bliver `{controller=Home}/{action=Index}/{id}`?",
        svar: ["Adresser uden id, fx / og /Film, giver nu 404", "Ingenting — spørgsmålstegnet er pynt", "Alle adresser giver 500", "Id bliver automatisk 0"],
        ret: 0, fordi: "Afprøvet: uden `?` **skal** der være et id, så `/` og `/Film` giver 404, mens `/Film/Details/2` stadig virker. `?` betyder \"valgfri\"." },
      { t: "laes", h: "Modellen: Film og en liste i hukommelsen",
        md: "Før controlleren kan vise film, skal der være en **model**. Lav klassen `Film` i mappen **Models**. Den har kun properties — ingen HTML, ingen controller-kode.\n\nIndtil databasen kommer i modul 17, ligger filmene i en **statisk liste** i klassen `FilmData` i en ny mappe, **Data**. `static` (modul 4) betyder, at listen hører til klassen og ikke til et objekt — derfor findes den samme liste, så længe appen kører. Stopper du appen, er nye film væk igen.",
        frag: true,
        kode: R`// Filen Models/Film.cs
namespace FilmKlub.Models;

public class Film
{
    public int Id { get; set; }
    public string Titel { get; set; } = "";
    public int Aar { get; set; }
    public string Instruktoer { get; set; } = "";
    public int Karakter { get; set; }
}

// Filen Data/FilmData.cs
using FilmKlub.Models;

namespace FilmKlub.Data;

public static class FilmData
{
    public static List<Film> Alle = new List<Film>
    {
        new Film { Id = 1, Titel = "Jagten", Aar = 2012, Instruktoer = "Thomas Vinterberg", Karakter = 9 },
        new Film { Id = 2, Titel = "Flammen og Citronen", Aar = 2008, Instruktoer = "Ole Christian Madsen", Karakter = 7 },
        new Film { Id = 3, Titel = "Druk", Aar = 2020, Instruktoer = "Thomas Vinterberg", Karakter = 8 }
    };
}`,
        noter: [
          ["public int Id", "Et **id** er et nummer, der er unikt for hver film. Adresser som `/Film/Details/2` bruger det."],
          ["= \"\";", "Startværdi, så en tekst aldrig er `null`. Det fjerner gule advarsler."],
          ["public static List<Film> Alle", "Én fælles liste med alle film, som alle controllere kan bruge: `FilmData.Alle`."]
        ] },
      { t: "laes", h: "Forskellige slags svar",
        md: "En action returnerer `IActionResult`. Det er et **interface** (modul 7): \"et eller andet svar\". Metoderne, du arver fra `Controller`, laver de forskellige slags svar. Her er `FilmController` med tre actions, der hver svarer på sin måde:",
        frag: true,
        kode: R`using Microsoft.AspNetCore.Mvc;
using FilmKlub.Data;
using FilmKlub.Models;

namespace FilmKlub.Controllers;

public class FilmController : Controller
{
    // GET /Film/Hej?navn=Peter
    public IActionResult Hej(string navn)
    {
        return Content($"Hej {navn}!");
    }

    // GET /Film/Data
    public IActionResult Data()
    {
        return Json(FilmData.Alle);
    }

    // GET /Film/Nyeste
    public IActionResult Nyeste()
    {
        int id = FilmData.Alle.Max(f => f.Id);
        return RedirectToAction("Details", new { id = id });
    }
}`,
        noter: [
          ["Content(...)", "Ren tekst. Browseren viser `Hej Peter!` uden HTML."],
          ["string navn", "Værdien kommer fra `?navn=Peter` i adressen. Parameterens navn skal passe med navnet i adressen."],
          ["Json(FilmData.Alle)", "Listen laves om til JSON (modul 9). Det bruger JavaScript's `fetch` (modul 15) og Web API (modul 19)."],
          ["RedirectToAction(\"Details\", new { id = id })", "Svar med statuskode **302** og adressen `/Film/Details/3`. `new { id = id }` er et anonymt objekt (modul 9) med de værdier, ruten skal bruge."],
          ["View()", "Svar med HTML fra et view. Det kommer i lektion 4."],
          ["NotFound()", "Svar med statuskode 404."]
        ] },
      { t: "forudsig", frag: true, sprog: "text",
        q: "Appen kører med `FilmController` ovenfor. Du åbner adressen `/Film/Hej?navn=Anna`. Hvad står der i browseren?",
        kode: R`public IActionResult Hej(string navn)
{
    return Content($"Hej {navn}!");
}`,
        output: "Hej Anna!",
        fordi: "Routingen vælger `FilmController.Hej`. Model binding finder `navn=Anna` i query string og giver værdien til parameteren `navn`. `Content` sender teksten uden HTML. (Afprøvet i det rigtige projekt.)" },
      { t: "valg", q: "Efter at en film er gemt, skal browseren sendes videre til listen, `FilmController.Index`. Hvad skal actionen returnere?",
        svar: ["RedirectToAction(\"Index\")", "View(\"Index\")", "Content(\"Index\")", "Json(\"Index\")"],
        ret: 0, fordi: "`RedirectToAction` sender 302, så browseren selv beder om `/Film`. `View(\"Index\")` ville vise Index-viewet med det samme, men adressen i browseren ville stadig være den gamle, og Index-actionen ville aldrig køre." },
      { t: "skriv", frag: true,
        q: "Skriv en action i `FilmController`, der hedder `Om`. Den har ingen parametre og svarer med den rene tekst `FilmKlub version 1`.",
        foer: R`public class FilmController : Controller
{`,
        efter: R`}`,
        tjek: [
          [/public IActionResult Om\(\)\{/, "Signaturen: `public IActionResult Om()`"],
          [/return Content\("FilmKlub version 1"\);/, "Svar med `return Content(\"FilmKlub version 1\");`"],
          ["static", "En action må ikke være `static`", "ikke"]
        ],
        forkert: [R`public string Om() { return "FilmKlub version 1"; }`, R`public IActionResult Om() { return View("FilmKlub version 1"); }`],
        loesning: R`    public IActionResult Om()
    {
        return Content("FilmKlub version 1");
    }` },
      { t: "fejl", frag: true,
        q: "Denne action kan ikke oversættes. Klik på linjen med fejlen.",
        kode: R`public class FilmController : Controller
{
    public IActionResult Hej(string navn)
    {
        return $"Hej {navn}!";
    }
}`,
        linje: 5,
        fordi: "En `string` er ikke et `IActionResult`. Compileren siger `CS0029: Cannot implicitly convert type 'string' to 'Microsoft.AspNetCore.Mvc.IActionResult'`. Teksten skal pakkes ind i et svar: `return Content($\"Hej {navn}!\");`.",
        rettet: R`public class FilmController : Controller
{
    public IActionResult Hej(string navn)
    {
        return Content($"Hej {navn}!");
    }
}` },
      { t: "ide", h: "Byg model og controller i FilmKlub",
        md: "Skriv koden fra trinnene ovenfor ind i dit FilmKlub-projekt — med dine egne fingre.",
        win: ["Højreklik på mappen **Models** → **Add → Class…**, kald den `Film.cs`, og skriv klassen `Film`.", "Højreklik på projektet → **Add → New Folder**, og kald mappen `Data`. Lav klassen `FilmData` i den.", "Højreklik på **Controllers** → **Add → Controller…** → **MVC Controller - Empty** → kald den `FilmController.cs`. (Eller: **Add → Class…** og skriv selv `: Controller`.)", "Skriv de tre actions `Hej`, `Data` og `Nyeste`, plus din `Om`.", "Start appen, og prøv adresserne `/Film/Hej?navn=Peter`, `/Film/Data` og `/Film/Om` efter dit portnummer."],
        mac: ["Højreklik på mappen **Models** → **Add → Class/Interface…**, kald den `Film`, og skriv klassen.", "Højreklik på projektet → **Add → Directory**, og kald mappen `Data`. Lav klassen `FilmData` i den.", "Højreklik på **Controllers** → **Add → Class/Interface…**, kald den `FilmController`, og skriv `using Microsoft.AspNetCore.Mvc;` øverst og `: Controller` efter klassenavnet.", "Skriv de tre actions `Hej`, `Data` og `Nyeste`, plus din `Om`.", "Start appen, og prøv adresserne `/Film/Hej?navn=Peter`, `/Film/Data` og `/Film/Om` efter dit portnummer."],
        sprog: "text",
        output: "Hej Peter!",
        md2: "`/Film/Data` viser JSON: `[{\"id\":1,\"titel\":\"Jagten\",\"aar\":2012,…}]`. Læg mærke til, at navnene er skrevet med lille begyndelsesbogstav — det er JSON-konventionen.\n\n`/Film/Nyeste` giver 404 endnu, fordi `Details` ikke findes. Åbn fanen **Network** i udviklerværktøjerne: du ser først **302** og derefter **404** på `/Film/Details/3`. Det retter du i næste lektion." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvordan finder ASP.NET Core ud af, hvilken metode der skal køre, når browseren beder om `/Film/Details/2`?",
        svar: "Det er **routing**. I `Program.cs` står ruten `{controller=Home}/{action=Index}/{id?}`. Stien deles ved skråstregerne: `Film` er **controlleren**, så klassen `FilmController` bruges; `Details` er **actionen**, så metoden `Details` kaldes; og `2` er **id**, som gives til metodens parameter `id`. Mangler controller eller action, bruges standardværdierne Home og Index, og `?` gør id valgfrit.",
        noegle: ["routing", "rute", "controller", "action", "id", "standardværdi", "Program.cs"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m16l4", titel: "Views og Razor", min: 20,
    ord: [
      ["Razor", "Skrivemåden i `.cshtml`-filer, hvor HTML og C# blandes. `@` skifter fra HTML til C#."],
      [".cshtml", "Filtypen for et view: HTML (\"html\") med C# (\"cs\")."],
      ["@model", "Linjen øverst i et view, der siger, hvilken type data viewet får."],
      ["Model", "Inde i viewet: det objekt, controlleren sendte med `View(...)`."],
      ["Stærkt typet view", "Et view med `@model`. Compileren kender typen og fanger stavefejl."],
      ["ViewBag", "En taske, hvor controlleren kan lægge små ekstra værdier til viewet: `ViewBag.Antal = 3`."],
      ["ViewData", "Samme taske som ViewBag, men med firkantede parenteser: `ViewData[\"Antal\"]`."]
    ],
    trin: [
      { t: "laes", h: "Hvor finder View() sin fil?",
        md: "Når en action skriver `return View();`, leder MVC efter en fil i en bestemt rækkefølge. For `FilmController.Index` er det:\n\n1. `Views/Film/Index.cshtml`\n2. `Views/Shared/Index.cshtml`\n\nFindes ingen af dem, får du fejlen herunder (afprøvet med en action, der hedder `Mangler`). Den fejl ser du garanteret en dag. Læs den — den siger præcis, hvor filen skulle ligge:",
        sprog: "text",
        kode: R`InvalidOperationException: The view 'Mangler' was not found.
The following locations were searched:
/Views/Film/Mangler.cshtml
/Views/Shared/Mangler.cshtml`,
        md2: "Du kan også give viewets navn selv: `return View(\"Index\");` bruger `Index.cshtml`, uanset hvad actionen hedder." },
      { t: "valg", q: "`FilmController` har actionen `Details`, der slutter med `return View(film);`. Hvilken fil leder MVC efter først?",
        svar: ["Views/Film/Details.cshtml", "Views/Shared/Details.cshtml", "Views/FilmController/Details.cshtml", "Views/Details/Film.cshtml"],
        ret: 0, fordi: "Først i mappen med controllerens navn (uden \"Controller\"), derefter i `Views/Shared`." },
      { t: "laes", h: "Razor: @ skifter til C#",
        md: "Et view er HTML, hvor du kan skrive C# med **Razor**. Reglen er enkel: **`@` skifter fra HTML til C#**. Resultatet skrives ind i HTML'en.",
        sprog: "razor", frag: true,
        kode: R`@{
    int x = 5;
    string navn = "Peter";
}
<p>@x</p>
<p>@(x + 1)</p>
<p>Hej @navn.ToUpper()</p>
<p>peter@mail.dk</p>`,
        noter: [
          ["@{ … }", "En **kodeblok**: almindelig C#, der kører, men ikke skriver noget ud."],
          ["@x", "Skriv værdien af `x` ind i HTML'en: `<p>5</p>`."],
          ["@(x + 1)", "Med parenteser regnes hele udtrykket ud først: `<p>6</p>`."],
          ["@navn.ToUpper()", "Metodekald virker også: `Hej PETER`."],
          ["peter@mail.dk", "Står `@` midt i et ord, forstår Razor, at det er en e-mailadresse, og lader den være."]
        ],
        md2: "Razor **koder** tekst, før den skrives ud: `@(\"<b>fed</b>\")` vises som teksten `<b>fed</b>`, ikke som fed skrift. Det beskytter mod, at brugere kan skrive HTML eller JavaScript ind i din side." },
      { t: "forudsig", sprog: "razor", frag: true,
        q: "Hvad står der på siden? Skriv én linje pr. afsnit.",
        kode: R`@{
    int x = 5;
}
<p>@x</p>
<p>@(x + 1)</p>
<p>@x + 1</p>`,
        output: "5\n6\n5 + 1",
        fordi: "`@x` stopper ved mellemrummet. Resten, ` + 1`, er almindelig HTML-tekst. Vil du have regnestykket udregnet, skal det i parentes: `@(x + 1)`. (Afprøvet i et rigtigt view.)" },
      { t: "laes", h: "Send en model til viewet",
        md: "Controlleren sender data til viewet ved at give dem til `View(...)`. Viewet siger i første linje, **hvilken type** det forventer, med `@model`. Inde i viewet hedder objektet så **`Model`** (stort M).",
        sprog: "razor", frag: true,
        kode: R`// I FilmController:
public IActionResult Index()
{
    List<Film> film = FilmData.Alle;
    return View(film);
}

// Views/Film/Index.cshtml (første linjer):
@model List<Film>

<h1>Film</h1>
<p>Den første film er @Model[0].Titel</p>`,
        noter: [
          ["return View(film);", "Listen sendes med til viewet."],
          ["@model List<Film>", "Lille m: **erklæringen** af typen. Står øverst, én gang."],
          ["@Model[0].Titel", "Stort M: **objektet** selv. Her en `List<Film>`, så man kan bruge index og properties."]
        ],
        md2: "Et view med `@model` hedder et **stærkt typet view**. Skriver du `@Model[0].Titttel`, får du en rød streg med det samme — compileren kender typen. `Film` kan bruges uden `using`, fordi `_ViewImports.cshtml` allerede har `@using FilmKlub.Models`." },
      { t: "udfyld", sprog: "razor", frag: true,
        q: "Viewet skal vise titlen på hver film i listen. Udfyld hullerne.",
        kode: R`@[[model]] List<Film>

<ul>
@foreach (Film f in [[Model]])
{
    <li>@f.[[Titel]]</li>
}
</ul>`,
        fordi: "`@model` (lille m) erklærer typen. `Model` (stort M) er selve listen. `@foreach` gennemløber den, og `@f.Titel` skriver hver titel." },
      { t: "laes", h: "@foreach og @if i et view",
        md: "Løkker og valg skrives som i C#, med `@` foran. Inde i dem kan du skrive HTML direkte — Razor ser selv, at `<tr>` er HTML, og at `@f.Titel` er C# igen. Her er tabellen fra FilmKlub's liste:",
        sprog: "razor", frag: true,
        kode: R`@foreach (Film f in Model)
{
    <tr>
        <td>@f.Titel</td>
        <td>@f.Aar</td>
        <td>
            @if (f.Karakter >= 8)
            {
                <strong>@f.Karakter ★</strong>
            }
            else
            {
                @f.Karakter
            }
        </td>
    </tr>
}`,
        noter: [
          ["@foreach (Film f in Model)", "Én tabelrække pr. film."],
          ["<td>@f.Titel</td>", "HTML med C#-værdier indeni."],
          ["@if (f.Karakter >= 8)", "Gode film (8 eller mere) vises med fed og en stjerne."],
          ["@f.Karakter", "I `else` står værdien alene, uden HTML rundt om."]
        ] },
      { t: "forudsig", sprog: "razor", frag: true,
        q: "Hvad står der på siden? Skriv én linje pr. afsnit.",
        kode: R`@{
    List<string> navne = new List<string> { "Anna", "Bo", "Carl" };
}
@foreach (string n in navne)
{
    if (n.Length > 2)
    {
        <p>@n</p>
    }
}
<p>@navne.Count navne</p>`,
        output: "Anna\nCarl\n3 navne",
        fordi: "`Bo` har kun 2 bogstaver og springes over. Inde i en `@foreach` er du allerede i C#, så `if` skal ikke have `@`. `@navne.Count` er 3 — alle tre navne er stadig i listen. (Afprøvet i et rigtigt view.)" },
      { t: "spor",
        q: "Viewet tæller, hvor mange film der får en stjerne (karakter 8 eller mere). Programmet her gør det samme i almindelig C#. Udfyld skemaet: én række, hver gang en af variablerne ændrer sig.",
        kode: R`int[] karakterer = { 9, 7, 8 };
int stjerner = 0;
int i = 0;
while (i < karakterer.Length)
{
    if (karakterer[i] >= 8)
    {
        stjerner++;
    }
    i++;
}`,
        kolonner: ["stjerner", "i"],
        raekker: [[2, "=0", "=–"], [3, "=0", "=0"], [8, "1", "0"], [10, "1", "1"], [10, "1", "2"], [8, "2", "2"], [10, "2", "3"]],
        fordi: "Karakteren 9 (i = 0) giver en stjerne. Karakteren 7 (i = 1) giver ingen, så linje 8 springes over, og kun `i` ændrer sig. Karakteren 8 (i = 2) giver en stjerne, fordi betingelsen er `>=`. Til sidst er `i` 3, og løkken stopper. Kan du ikke følge det, så kør koden med et breakpoint og se værdierne i {{**Locals**||**Threads & Variables**}}." },
      { t: "laes", h: "ViewBag og ViewData: små ekstra værdier",
        md: "Modellen er hovedindholdet. Skal viewet have **en lille ekstra værdi** ved siden af, kan controlleren lægge den i **ViewBag**:\n\n- I controlleren: `ViewBag.Antal = film.Count;`\n- I viewet: `<p>Der er @ViewBag.Antal film i klubben.</p>`\n\n**ViewData** er **den samme taske** med en anden skrivemåde: `ViewData[\"Antal\"]`. Afprøvet: sætter controlleren `ViewData[\"Antal\"] = 42`, viser `@ViewBag.Antal` også 42.\n\nUlempen: ViewBag er **ikke** typet. Staver du forkert, `@ViewBag.Antl`, får du ingen fejl — bare ingenting på siden. Derfor: brug **modellen** til det vigtige og ViewBag kun til småting som en overskrift eller et antal. `ViewData[\"Title\"]`, som skabelonen bruger til fanebladets titel, er netop sådan en småting." },
      { t: "valg", q: "Controlleren skriver `ViewBag.Antal = 3;`, men viewet skriver `<p>@ViewBag.Antl film</p>` (stavefejl). Hvad sker der?",
        svar: ["Siden vises med \" film\" — uden tal og uden fejl", "Compileren giver en fejl", "Siden giver 500 Internal Server Error", "Siden viser \"3 film\", fordi Razor retter stavefejlen"],
        ret: 0, fordi: "ViewBag er ikke typet, så compileren kan ikke se fejlen, og en ukendt værdi er bare tom. Afprøvet: `@ViewBag.Ukendt` skriver ingenting. Netop derfor er en model med `@model` bedre til det vigtige." },
      { t: "fejl", sprog: "razor", frag: true,
        q: "Viewet skal vise en liste med titler, men det kan ikke oversættes. Klik på linjen, der er årsagen.",
        kode: R`@model List<Film>

<ul>
foreach (Film f in Model)
{
    <li>@f.Titel</li>
}
</ul>`,
        linje: 4,
        fordi: "Der mangler `@` foran `foreach`. Uden `@` er linjen bare HTML-tekst, så variablen `f` findes ikke, og `@f.Titel` giver fejlen `The name 'f' does not exist in the current context`. Fejlen vises ved linje 6, men årsagen står i linje 4.",
        rettet: R`@model List<Film>

<ul>
@foreach (Film f in Model)
{
    <li>@f.Titel</li>
}
</ul>` },
      { t: "ide", h: "Liste og detaljeside i FilmKlub",
        md: "Nu får FilmKlub rigtige sider. Tilføj to actions i `FilmController` og to views.",
        frag: true,
        kode: R`// I FilmController:
// GET /Film
public IActionResult Index()
{
    List<Film> film = FilmData.Alle;
    ViewBag.Antal = film.Count;
    return View(film);
}

// GET /Film/Details/2
public IActionResult Details(int id)
{
    Film? film = FilmData.Alle.FirstOrDefault(f => f.Id == id);
    if (film == null)
    {
        return NotFound();
    }
    return View(film);
}`,
        win: ["Højreklik på mappen **Views** → **Add → New Folder** → `Film`.", "Højreklik på **Views/Film** → **Add → View…** → **Razor View - Empty** → kald den `Index.cshtml`. (Får du en anden dialog, så vælg **Add → New Item…** og søg efter **Razor View - Empty**.)", "Skriv `@model List<Film>`, sæt `ViewData[\"Title\"] = \"Film\";` i en `@{ }`-blok, og skriv en `<h1>`, linjen med `@ViewBag.Antal` og tabellen med `@foreach` og `@if` fra trinnene ovenfor (`<table class=\"table\">`, `<thead>` med overskrifterne Titel, År og Karakter).", "Lav på samme måde `Details.cshtml` med `@model Film`, der viser titel, år, instruktør og karakter.", "Start appen, og prøv `/Film`, `/Film/Details/2`, `/Film/Details/99` og `/Film/Nyeste`."],
        mac: ["Højreklik på mappen **Views** → **Add → Directory** → `Film`.", "Højreklik på **Views/Film** → **Add** → vælg **Razor View** (eller **File**, og kald den `Index.cshtml`).", "Skriv `@model List<Film>`, sæt `ViewData[\"Title\"] = \"Film\";` i en `@{ }`-blok, og skriv en `<h1>`, linjen med `@ViewBag.Antal` og tabellen med `@foreach` og `@if` fra trinnene ovenfor (`<table class=\"table\">`, `<thead>` med overskrifterne Titel, År og Karakter).", "Lav på samme måde `Details.cshtml` med `@model Film`, der viser titel, år, instruktør og karakter.", "Start appen, og prøv `/Film`, `/Film/Details/2`, `/Film/Details/99` og `/Film/Nyeste`."],
        md2: "Forventet: `/Film` viser tre film og teksten **Der er 3 film i klubben.** `/Film/Details/2` viser Flammen og Citronen. `/Film/Details/99` giver 404. `/Film/Nyeste` ender på Druk.\n\nDebug det: sæt et **breakpoint** på linjen `Film? film = …` i `Details` (klik i den grå margen til venstre for linjenummeret), og start med {{den grønne pil ▶ (den starter med debuggeren)||debug-knappen (den grønne bille)}}. Åbn `/Film/Details/2` i browseren. Programmet stopper, og du kan se `id` = 2 i {{**Locals**||**Threads & Variables**}}. Tryk {{**F10** (Step Over)||**Step Over**}} og se `film` blive udfyldt." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvordan kommer data fra controlleren ud på skærmen som HTML?",
        svar: "**Controlleren** henter dataene — fx en liste med film — og giver dem til `View(film)`. MVC finder **viewet** i `Views/Film/Index.cshtml`. Øverst står `@model List<Film>`, så viewet er **stærkt typet**, og objektet hedder `Model`. Med **Razor** blandes HTML og C#: `@foreach` laver én række pr. film, og `@f.Titel` skriver værdien ind i HTML'en. Små ekstra værdier kan sendes med **ViewBag**. Den færdige HTML sendes til browseren.",
        noegle: ["controller", "View()", "@model", "Model", "Razor", "@foreach", "ViewBag", "HTML"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m16l5", titel: "Layout, partial views og tag helpers", min: 18,
    ord: [
      ["Layout", "Den fælles ramme om alle sider: `<head>`, menu og bund. Ligger i `Views/Shared/_Layout.cshtml`."],
      ["@RenderBody()", "Stedet i layoutet, hvor den enkelte sides indhold sættes ind."],
      ["_ViewStart.cshtml", "Kører før hvert view og sætter, hvilket layout der bruges."],
      ["_ViewImports.cshtml", "Fælles `@using`-linjer og tag helpers for alle views."],
      ["Section", "Et navngivet stykke af et view, som layoutet placerer et bestemt sted, fx scripts nederst."],
      ["Partial view", "Et lille genbrugeligt stykke view, fx et kort for én film. Navnet starter med `_`."],
      ["Tag helper", "En attribut som `asp-action` på et HTML-tag, der laver den rigtige HTML på serveren."]
    ],
    trin: [
      { t: "laes", h: "Layoutet: rammen om alle sider",
        md: "Alle sider i appen har den samme menu øverst og den samme bund. Den HTML står **ét sted**: `Views/Shared/_Layout.cshtml`. Hver side leverer kun sit eget indhold, og layoutet sætter det ind ved `@RenderBody()`. Her er de vigtigste linjer (forkortet):",
        sprog: "razor", frag: true,
        kode: R`<!DOCTYPE html>
<html lang="en">
<head>
    <title>@ViewData["Title"] - FilmKlub</title>
    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
</head>
<body>
    <header>
        <nav class="navbar ...">  ...menuen...  </nav>
    </header>
    <div class="container">
        <main role="main" class="pb-3">
            @RenderBody()
        </main>
    </div>
    <footer class="border-top footer text-muted">...</footer>
    <script src="~/lib/jquery/dist/jquery.min.js"></script>
    <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>`,
        noter: [
          ["@ViewData[\"Title\"]", "Fanebladets titel. Hvert view sætter den selv: `ViewData[\"Title\"] = \"Film\";`."],
          ["~/lib/bootstrap/…", "`~` betyder wwwroot. Bootstrap (modul 13) følger med skabelonen."],
          ["@RenderBody()", "**Her** kommer indholdet fra fx `Views/Film/Index.cshtml`."],
          ["RenderSectionAsync(\"Scripts\", required: false)", "Plads til ekstra scripts fra en side. `required: false`: siden behøver ikke have nogen."]
        ] },
      { t: "valg", q: "Du åbner `/Film`. Hvor i den færdige HTML havner indholdet fra `Views/Film/Index.cshtml`?",
        svar: ["Der, hvor _Layout.cshtml kalder @RenderBody()", "Øverst, før <html>", "Nederst, efter </html>", "I en ny fane i browseren"],
        ret: 0, fordi: "Layoutet er rammen. `@RenderBody()` markerer hullet, hvor sidens eget indhold sættes ind — inde i `<main>`, mellem menuen og bunden." },
      { t: "laes", h: "_ViewStart og _ViewImports",
        md: "To filer i `Views` gælder for **alle** views:\n\n- **`_ViewStart.cshtml`** kører før hvert view. Den indeholder kun `@{ Layout = \"_Layout\"; }` — derfor får alle sider layoutet uden at bede om det. Skriver et view selv `@{ Layout = null; }`, får det **ingen** layout: ingen menu, ingen Bootstrap.\n- **`_ViewImports.cshtml`** indeholder `@using FilmKlub.Models` (så du kan skrive `Film` i stedet for `FilmKlub.Models.Film`) og `@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers` (så tag helpers virker, se trin 9).\n\nFilnavne, der starter med `_`, er en konvention: \"det her er ikke en side, man kan gå til\"." },
      { t: "valg", q: "Én af dine sider vises helt uden menu og uden Bootstrap-udseende, mens alle andre sider ser rigtige ud. Hvad er den mest sandsynlige årsag?",
        svar: ["Viewet sætter Layout = null", "_ViewStart.cshtml er slettet", "Controlleren mangler [HttpGet]", "Siden har ingen @model"],
        ret: 0, fordi: "Hvis `_ViewStart.cshtml` var væk, ville **alle** sider mangle layoutet. Når kun én side gør det, er det den side selv, der har slået layoutet fra med `Layout = null`." },
      { t: "laes", h: "Sections: indhold til et bestemt sted i layoutet",
        md: "Nogle sider skal have ekstra JavaScript, fx formularen, der skal validere i browseren (lektion 6). Scripts hører til **nederst** i `<body>`, efter jQuery — men `@RenderBody()` står længere oppe. Løsningen er en **section**:",
        sprog: "razor", frag: true,
        kode: R`@* Nederst i Views/Film/Create.cshtml *@
@section Scripts {
    <partial name="_ValidationScriptsPartial" />
}`,
        noter: [
          ["@* … *@", "En kommentar i Razor."],
          ["@section Scripts { … }", "Indholdet sendes ikke til `@RenderBody()`, men til `RenderSectionAsync(\"Scripts\")` i layoutet."],
          ["<partial name=\"_ValidationScriptsPartial\" />", "Indsætter de to jQuery-valideringsscripts. Det er et **partial view** — se næste trin."]
        ] },
      { t: "valg", q: "`Create.cshtml` slutter med `@section Scripts { <partial name=\"_ValidationScriptsPartial\" /> }`. Hvor i den færdige side havner de to scripts?",
        svar: ["Nederst i <body>, der hvor layoutet kalder RenderSectionAsync(\"Scripts\")", "Der, hvor @RenderBody() står, sammen med resten af viewet", "I <head>, før Bootstrap", "Ingen steder — en section vises kun, hvis controlleren beder om den"],
        ret: 0, fordi: "En section sendes til det sted i layoutet, der har samme navn. Valideringsscripts bruger jQuery, så de skal stå **efter** jQuery-linjen nederst i layoutet — det sørger sectionen for." },
      { t: "laes", h: "Partial views: genbrug et stykke HTML",
        md: "Et **partial view** er et lille view, der kan sættes ind i andre views. Det har sin egen `@model`. Navnet starter med `_`, og det ligger typisk i `Views/Shared`, så alle controllere kan bruge det.\n\nI FilmKlub laver du et kort for én film, `_FilmKort.cshtml`, og bruger det på detaljesiden:",
        sprog: "razor", frag: true,
        kode: R`@* Views/Shared/_FilmKort.cshtml *@
@model Film

<div class="card mb-3" style="max-width: 24rem;">
    <div class="card-body">
        <h5 class="card-title">@Model.Titel (@Model.Aar)</h5>
        <p class="card-text">Instruktør: @Model.Instruktoer</p>
        <p class="card-text">Karakter: @Model.Karakter / 10</p>
    </div>
</div>

@* Views/Film/Details.cshtml *@
@model Film
@{
    ViewData["Title"] = Model.Titel;
}

<h1>@Model.Titel</h1>
<partial name="_FilmKort" model="Model" />
<p><a asp-action="Index">Tilbage til listen</a></p>`,
        noter: [
          ["@model Film", "Partial viewet får **én** film."],
          ["<partial name=\"_FilmKort\" model=\"Model\" />", "Sæt kortet ind her, og giv det detaljesidens film som model."],
          ["class=\"card\"", "Bootstrap's kort (modul 13)."]
        ] },
      { t: "udfyld", sprog: "razor", frag: true,
        q: "Listen skal vise et `_FilmKort` for hver film. Udfyld hullerne.",
        kode: R`@model List<Film>

@foreach (Film f in Model)
{
    <[[partial]] name="[[_FilmKort]]" model="[[f]]" />
}`,
        fordi: "Hvert kort skal have **én** film, så modellen er løkkevariablen `f` — ikke `Model`, der er hele listen." },
      { t: "laes", h: "Tag helpers: links, der følger ruten",
        md: "Du kunne skrive `<a href=\"/Film/Details/2\">`. Men så skal du selv holde adresserne rigtige. **Tag helpers** er attributter, der starter med `asp-`. Serveren laver dem om til almindelig HTML ud fra **ruten**:\n\n- `asp-controller` — hvilken controller (udelades den, bruges den nuværende).\n- `asp-action` — hvilken action.\n- `asp-route-id` — værdien til `{id}` i ruten.\n\nAfprøvet i FilmKlub — det, du skriver, og det, browseren får:",
        sprog: "razor", frag: true,
        kode: R`<a asp-controller="Film" asp-action="Index">Film</a>
<a asp-action="Details" asp-route-id="@f.Id">Detaljer</a>

@* bliver til: *@
<a href="/Film">Film</a>
<a href="/Film/Details/1">Detaljer</a>`,
        md2: "Læg mærke til, at `Index` forsvinder fra adressen: det er standardværdien i ruten, så `/Film` er nok. Tag helpers virker kun, fordi `_ViewImports.cshtml` har linjen `@addTagHelper`." },
      { t: "valg", q: "Hvilken HTML laver tag helperen `<a asp-controller=\"Film\" asp-action=\"Details\" asp-route-id=\"3\">Se</a>`?",
        svar: ["<a href=\"/Film/Details/3\">Se</a>", "<a href=\"/Film/Details?id=3\">Se</a>", "<a href=\"/FilmController/Details/3\">Se</a>", "<a asp-controller=\"Film\" asp-action=\"Details\" asp-route-id=\"3\">Se</a> — uændret"],
        ret: 0, fordi: "Ruten `{controller}/{action}/{id?}` har en plads til id, så værdien sættes ind i stien. Browseren ser aldrig `asp-`-attributterne — de er væk, når HTML'en sendes." },
      { t: "fejl", sprog: "razor", frag: true,
        q: "Menupunktet skal føre til listen over film (`FilmController.Index`), men giver 404. Klik på linjen med fejlen.",
        kode: R`<ul class="navbar-nav flex-grow-1">
    <li class="nav-item">
        <a class="nav-link text-dark" asp-controller="Home" asp-action="Index">Home</a>
    </li>
    <li class="nav-item">
        <a class="nav-link text-dark" asp-controller="Films" asp-action="Index">Film</a>
    </li>
</ul>`,
        linje: 6,
        fordi: "Controlleren hedder `FilmController`, så navnet i `asp-controller` er `Film` — ikke `Films`. Der er ingen compilerfejl, for tag helperen laver bare linket `/Films`, og den adresse har ingen controller: 404.",
        rettet: R`<ul class="navbar-nav flex-grow-1">
    <li class="nav-item">
        <a class="nav-link text-dark" asp-controller="Home" asp-action="Index">Home</a>
    </li>
    <li class="nav-item">
        <a class="nav-link text-dark" asp-controller="Film" asp-action="Index">Film</a>
    </li>
</ul>` },
      { t: "ide", h: "Menu, kort og links i FilmKlub",
        md: "Gør FilmKlub til en rigtig app med menu og links.",
        sprog: "razor", frag: true,
        kode: R`@* I _Layout.cshtml, efter menupunktet Privacy: *@
<li class="nav-item">
    <a class="nav-link text-dark" asp-controller="Film" asp-action="Index">Film</a>
</li>

@* I Views/Film/Index.cshtml, sidste celle i hver række: *@
<td><a asp-action="Details" asp-route-id="@f.Id">Detaljer</a></td>

@* Over tabellen i Index.cshtml (Create laves i lektion 6): *@
<p><a asp-action="Create" class="btn btn-primary">Tilføj film</a></p>`,
        win: ["Åbn **Views → Shared → _Layout.cshtml**, og tilføj menupunktet **Film**.", "Lav **Views/Shared/_FilmKort.cshtml** (højreklik på Shared → **Add → View…** → **Razor View - Empty**), og skriv kortet fra trin 7.", "Ret **Details.cshtml**, så den bruger `<partial name=\"_FilmKort\" model=\"Model\" />` og har et link tilbage.", "Tilføj linket **Detaljer** i hver række og knappen **Tilføj film** i Index.cshtml.", "Start appen. Klik på **Film** i menuen, klik på **Detaljer** — og hold musen over linkene for at se adresserne nederst i browseren."],
        mac: ["Åbn **Views → Shared → _Layout.cshtml**, og tilføj menupunktet **Film**.", "Lav **Views/Shared/_FilmKort.cshtml** (højreklik på Shared → **Add** → **Razor View** eller **File**), og skriv kortet fra trin 7.", "Ret **Details.cshtml**, så den bruger `<partial name=\"_FilmKort\" model=\"Model\" />` og har et link tilbage.", "Tilføj linket **Detaljer** i hver række og knappen **Tilføj film** i Index.cshtml.", "Start appen. Klik på **Film** i menuen, klik på **Detaljer** — og hold musen over linkene for at se adresserne nederst i browseren."],
        md2: "Knappen **Tilføj film** giver 404 endnu — `Create` laver du i næste lektion. Højreklik på siden og vælg **Vis sidekilde** (View page source): der står `href=\"/Film/Details/1\"`, og ingen `asp-`-attributter er tilbage." },
      { t: "forklar", q: "Forklar med dine egne ord forskellen på et layout og et partial view.",
        svar: "Et **layout** (`_Layout.cshtml`) er den **fælles ramme** om alle sider: `<head>`, menu og bund. Sidens eget indhold sættes ind ved `@RenderBody()`, og `_ViewStart.cshtml` sørger for, at alle views bruger layoutet. Et **partial view** er et lille, **genbrugeligt stykke** HTML med sin egen model, fx et kort for én film, som sættes ind med `<partial name=\"_FilmKort\" model=\"...\" />` dér, hvor man har brug for det — gerne flere gange på samme side.",
        noegle: ["layout", "ramme", "@RenderBody", "_ViewStart", "partial view", "genbrug", "model"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m16l6", titel: "Formularer, model binding og validering", min: 22,
    ord: [
      ["[HttpGet] / [HttpPost]", "Attributter, der siger, om en action svarer på GET eller POST. Så kan to actions hedde det samme."],
      ["Model binding", "MVC fylder automatisk en actions parametre ud fra formularfelter, query string og ruten — efter navn."],
      ["asp-for", "Tag helper, der kobler et formularfelt til en property i modellen: laver `name`, `id`, `type` og værdi."],
      ["Validering", "Kontrol af, at data er gyldige, før de gemmes."],
      ["Data annotations", "Attributter på modellens properties, der beskriver reglerne: `[Required]`, `[Range]`, `[StringLength]`, `[RegularExpression]`."],
      ["ModelState", "Resultatet af model binding og validering. `ModelState.IsValid` er `false`, hvis en regel er brudt."],
      ["Post/Redirect/Get", "Mønsteret: efter en POST, der lykkes, svarer man med en omdirigering, så en genindlæsning ikke sender formularen igen."]
    ],
    trin: [
      { t: "laes", h: "To actions med samme navn",
        md: "En formular kræver **to** forespørgsler:\n\n1. **GET** `/Film/Create` — vis den tomme formular.\n2. **POST** `/Film/Create` — tag imod det, brugeren skrev.\n\nDerfor har controlleren to actions, der begge hedder `Create`. Attributterne `[HttpGet]` og `[HttpPost]` bestemmer, hvilken der svarer på hvad:",
        frag: true,
        kode: R`// GET /Film/Create
[HttpGet]
public IActionResult Create()
{
    return View();
}

// POST /Film/Create
[HttpPost]
public IActionResult Create(Film film)
{
    if (!ModelState.IsValid)
    {
        return View(film);
    }
    film.Id = FilmData.Alle.Max(f => f.Id) + 1;
    FilmData.Alle.Add(film);
    return RedirectToAction("Index");
}`,
        noter: [
          ["[HttpGet] public IActionResult Create()", "Viser formularen. Ingen parametre."],
          ["[HttpPost] public IActionResult Create(Film film)", "Modtager formularen. MVC laver selv et `Film`-objekt ud fra felterne."],
          ["if (!ModelState.IsValid)", "Er en regel brudt, vises formularen igen **med det, brugeren skrev**, og fejlbeskederne."],
          ["FilmData.Alle.Max(f => f.Id) + 1", "Nyt id: én større end det største, der findes."],
          ["return RedirectToAction(\"Index\")", "Gemt: send browseren videre til listen med 302."]
        ] },
      { t: "valg", q: "Hvorfor svarer POST-actionen med `RedirectToAction(\"Index\")` i stedet for `View(\"Index\", FilmData.Alle)`, når filmen er gemt?",
        svar: ["Så en genindlæsning af siden henter listen med GET i stedet for at sende formularen og gemme filmen igen", "Fordi View() ikke må bruges i en POST-action", "Fordi RedirectToAction er hurtigere", "Fordi listen ellers vises uden layout"],
        ret: 0, fordi: "Mønsteret hedder **Post/Redirect/Get**. Efter omdirigeringen er browserens sidste forespørgsel en GET af `/Film`. Trykker brugeren F5, hentes listen bare igen — i stedet for at gemme en film mere." },
      { t: "laes", h: "Formularen og model binding",
        md: "Formularen bruger tag helpers. `asp-for=\"Titel\"` kobler feltet til modellens property `Titel`. Når formularen sendes, ser **model binding** på **navnene**: feltet `name=\"Titel\"` havner i `film.Titel`, `name=\"Aar\"` i `film.Aar` osv.",
        sprog: "razor", frag: true,
        kode: R`@model Film

<form asp-action="Create" method="post">
    <div class="mb-3">
        <label asp-for="Titel" class="form-label"></label>
        <input asp-for="Titel" class="form-control" />
        <span asp-validation-for="Titel" class="text-danger"></span>
    </div>
    <div class="mb-3">
        <label asp-for="Aar" class="form-label"></label>
        <input asp-for="Aar" class="form-control" />
        <span asp-validation-for="Aar" class="text-danger"></span>
    </div>
    <button type="submit" class="btn btn-primary">Gem</button>
</form>`,
        noter: [
          ["asp-action=\"Create\" method=\"post\"", "Formularen sendes med POST til `/Film/Create`."],
          ["<label asp-for=\"Titel\">", "Laver `<label for=\"Titel\">Titel</label>` — med propertyens navn som tekst."],
          ["<input asp-for=\"Aar\" />", "Laver `<input type=\"number\" id=\"Aar\" name=\"Aar\" …>`. Typen `number` vælges, fordi `Aar` er en `int`."],
          ["<span asp-validation-for=\"Titel\">", "Her vises fejlbeskeden for `Titel`, hvis der er en."]
        ],
        md2: "Formularens tag helper lægger også et skjult felt ind, `__RequestVerificationToken`. Det beskytter mod falske formularer fra andre sider og forklares i modul 17." },
      { t: "udfyld", sprog: "razor", frag: true,
        q: "Udfyld formularen, så den sender titlen med POST til actionen `Create`.",
        kode: R`<form asp-action="[[Create]]" method="[[post]]">
    <label asp-for="Titel"></label>
    <input asp-[[for]]="Titel" class="form-control" />
    <span asp-validation-for="Titel" class="text-danger"></span>
    <button type="[[submit]]">Gem</button>
</form>`,
        fordi: "`method=\"post\"`, fordi formularen opretter noget. `asp-for` kobler feltet til `Titel`. En knap med `type=\"submit\"` sender formularen." },
      { t: "laes", h: "Reglerne står på modellen",
        md: "Hvad der er gyldigt, er en del af **modellen** — ikke af viewet eller controlleren. Reglerne skrives som **data annotations**: attributter over hver property. De ligger i navnerummet `System.ComponentModel.DataAnnotations`.",
        frag: true,
        kode: R`using System.ComponentModel.DataAnnotations;

namespace FilmKlub.Models;

public class Film
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Skriv en titel")]
    [StringLength(60, ErrorMessage = "Titlen må højst være 60 tegn")]
    public string Titel { get; set; } = "";

    [Display(Name = "År")]
    [Range(1900, 2030, ErrorMessage = "Året skal være mellem 1900 og 2030")]
    public int Aar { get; set; }

    [Display(Name = "Instruktør")]
    [Required(ErrorMessage = "Skriv instruktørens navn")]
    [RegularExpression(@"^[A-ZÆØÅ].*", ErrorMessage = "Navnet skal starte med stort bogstav")]
    public string Instruktoer { get; set; } = "";

    [Range(1, 10, ErrorMessage = "Karakteren skal være fra 1 til 10")]
    public int Karakter { get; set; }
}`,
        noter: [
          ["[Required]", "Feltet må ikke være tomt."],
          ["[StringLength(60)]", "Højst 60 tegn."],
          ["[Range(1900, 2030)]", "Tallet skal ligge mellem de to grænser (begge med)."],
          ["[RegularExpression(@\"^[A-ZÆØÅ].*\")]", "Teksten skal passe til det regulære udtryk (modul 11): første tegn er et stort bogstav."],
          ["ErrorMessage = \"…\"", "Din egen fejlbesked på dansk. Uden den skriver ASP.NET en engelsk standardtekst."],
          ["[Display(Name = \"År\")]", "Teksten, `<label asp-for>` viser. Uden den ville der stå `Aar`. Mere om det i modul 18."]
        ] },
      { t: "forudsig",
        q: "MVC kontrollerer reglerne med de samme klasser, som du kan kalde selv. Hvad skriver programmet?",
        kode: R`using System.ComponentModel.DataAnnotations;

Film film = new Film { Titel = "", Aar = 1850, Karakter = 9 };

List<ValidationResult> fejl = new List<ValidationResult>();
bool gyldig = Validator.TryValidateObject(film, new ValidationContext(film), fejl, true);

Console.WriteLine(gyldig);
foreach (ValidationResult f in fejl)
{
    Console.WriteLine(f.ErrorMessage);
}

class Film
{
    [Required(ErrorMessage = "Skriv en titel")]
    public string Titel { get; set; } = "";

    [Range(1900, 2030, ErrorMessage = "Året skal være mellem 1900 og 2030")]
    public int Aar { get; set; }

    [Range(1, 10, ErrorMessage = "Karakteren skal være fra 1 til 10")]
    public int Karakter { get; set; }
}`,
        output: "False\nSkriv en titel\nÅret skal være mellem 1900 og 2030",
        fordi: "Titlen er tom, så `[Required]` fejler. 1850 er under 1900, så `[Range]` fejler. Karakteren 9 er gyldig. `gyldig` bliver `False`, og de to fejlbeskeder ligger i listen. Det er præcis det, der sker i `ModelState`, når formularen sendes." },
      { t: "valg", q: "Brugeren skriver karakteren 11 i formularen. Property'en har `[Range(1, 10, ErrorMessage = \"Karakteren skal være fra 1 til 10\")]`. Hvad sker der i POST-actionen?",
        svar: ["ModelState.IsValid er false, så formularen vises igen med beskeden under feltet", "Filmen gemmes med karakteren 10", "Appen går ned med en exception", "Filmen gemmes med karakteren 11"],
        ret: 0, fordi: "Model binding sætter `Karakter` til 11, valideringen ser, at reglen er brudt, og `ModelState.IsValid` bliver `false`. Actionen returnerer `View(film)`, og `asp-validation-for` viser beskeden. Afprøvet." },
      { t: "laes", h: "Validering to steder",
        md: "Valideringen sker faktisk **to gange**:\n\n1. **I browseren.** Scripts fra `_ValidationScriptsPartial` (jQuery Validation) læser reglerne, som `asp-for` har skrevet ind i HTML'en som `data-val-…`-attributter. Fejl vises med det samme, uden at formularen sendes. Det er hurtigt og rart for brugeren.\n2. **På serveren.** `ModelState.IsValid` i POST-actionen. Det er **den, der tæller**.\n\nHvorfor begge? Browserens tjek kan slås fra eller springes over — enhver kan sende en POST direkte til serveren uden din side. Afprøvet: en POST med tom titel sendt uden om browseren blev afvist af `ModelState`, og formularen kom tilbage med **Skriv en titel**.\n\n**Regel: stol aldrig på browseren. Tjek altid `ModelState.IsValid` på serveren.**" },
      { t: "spor",
        q: "POST-actionen giver hver ny film id'et `Max(...) + 1`. Her gemmes to film i træk i en liste, hvor id 3 er slettet. Udfyld skemaet.",
        kode: R`List<int> ider = new List<int> { 1, 2, 4 };
int nyId = ider.Max() + 1;
ider.Add(nyId);
nyId = ider.Max() + 1;
ider.Add(nyId);`,
        kolonner: ["nyId", "ider.Count"],
        raekker: [[1, "=–", "=3"], [2, "5", "3"], [3, "5", "4"], [4, "6", "4"], [5, "6", "5"]],
        fordi: "Det største id er 4, så første nye film får 5 — ikke 4, selvom listen kun har 3 elementer. Efter `Add` er 5 det største, så næste film får 6. Id'et skal være unikt, så man finder den rigtige film på `/Film/Details/{id}`." },
      { t: "orden", frag: true,
        q: "Sæt linjerne i POST-actionen i rækkefølge, så ugyldige data afvises, og gyldige gemmes.",
        linjer: [R`[HttpPost]`, R`public IActionResult Create(Film film)`, R`{`, R`    if (!ModelState.IsValid) return View(film);`, R`    film.Id = FilmData.Alle.Max(f => f.Id) + 1;`, R`    FilmData.Alle.Add(film);`, R`    return RedirectToAction("Index");`, R`}`],
        fordi: "Tjek først. Et ugyldigt objekt må aldrig nå ned i listen (eller databasen). Id'et sættes, før filmen lægges i listen, og omdirigeringen kommer til sidst." },
      { t: "skriv", frag: true,
        q: "Skriv GET-actionen til formularen. Den hedder `Create`, har attributten `[HttpGet]`, ingen parametre, og viser bare viewet.",
        foer: R`public class FilmController : Controller
{`,
        efter: R`}`,
        tjek: [
          ["[HttpGet]", "Sæt `[HttpGet]` over metoden"],
          [/public IActionResult Create\(\)\{/, "Signaturen: `public IActionResult Create()` — uden parametre"],
          [/return View\(\);/, "Vis viewet: `return View();`"],
          ["[HttpPost]", "GET-actionen skal ikke have `[HttpPost]`", "ikke"]
        ],
        forkert: [R`[HttpPost]
public IActionResult Create()
{
    return View();
}`],
        loesning: R`    [HttpGet]
    public IActionResult Create()
    {
        return View();
    }` },
      { t: "ide", h: "Opret film i FilmKlub",
        md: "Byg formularen færdig: data annotations på `Film`, de to `Create`-actions og viewet.",
        win: ["Tilføj `using System.ComponentModel.DataAnnotations;` og attributterne fra trin 5 i **Models/Film.cs**.", "Tilføj de to `Create`-actions fra trin 1 i **FilmController**.", "Lav **Views/Film/Create.cshtml** med `@model Film`, formularen fra trin 3 med felter til **alle fire** properties (Titel, Aar, Instruktoer, Karakter) og nederst `@section Scripts { <partial name=\"_ValidationScriptsPartial\" /> }`.", "Start appen. Klik på **Tilføj film**, og klik **Gem** uden at skrive noget: beskederne vises med det samme (browseren).", "Skriv titlen `Festen`, året `1998`, instruktøren `Thomas Vinterberg` og karakteren `9`, og klik **Gem**. Du lander på listen, og der står **Der er 4 film i klubben.**", "Åbn fanen **Network** i udviklerværktøjerne (F12), og gem en film mere. Find **POST** til `/Film/Create` med status **302** og derefter **GET** `/Film` med **200**."],
        mac: ["Tilføj `using System.ComponentModel.DataAnnotations;` og attributterne fra trin 5 i **Models/Film.cs**.", "Tilføj de to `Create`-actions fra trin 1 i **FilmController**.", "Lav **Views/Film/Create.cshtml** med `@model Film`, formularen fra trin 3 med felter til **alle fire** properties (Titel, Aar, Instruktoer, Karakter) og nederst `@section Scripts { <partial name=\"_ValidationScriptsPartial\" /> }`.", "Start appen. Klik på **Tilføj film**, og klik **Gem** uden at skrive noget: beskederne vises med det samme (browseren).", "Skriv titlen `Festen`, året `1998`, instruktøren `Thomas Vinterberg` og karakteren `9`, og klik **Gem**. Du lander på listen, og der står **Der er 4 film i klubben.**", "Åbn fanen **Network** i udviklerværktøjerne (⌥⌘I), og gem en film mere. Find **POST** til `/Film/Create` med status **302** og derefter **GET** `/Film` med **200**."],
        md2: "Se serverens validering arbejde: sæt et breakpoint på linjen `if (!ModelState.IsValid)`, og start med debuggeren. Skriv karakteren `11` — browseren stopper det. Fjern derfor midlertidigt linjen `@section Scripts { … }` fra viewet, start igen, og send karakteren `11`. Nu stopper programmet ved dit breakpoint. Hold musen over `film` og se `Karakter = 11`, og se `ModelState.IsValid` = `false`. Sæt linjen ind igen bagefter." },
      { t: "forklar", q: "Til eksamen: Forklar, hvad der sker, fra brugeren klikker Gem i en formular, til den nye film står på listen.",
        svar: "Browseren sender en **POST** til `/Film/Create` med felterne. Routing vælger actionen med **[HttpPost]**. **Model binding** laver et `Film`-objekt ud fra felternes **navne**. Så valideres objektet ud fra **data annotations** som `[Required]` og `[Range]`, og resultatet står i **ModelState**. Er `ModelState.IsValid` falsk, vises formularen igen med fejlbeskederne. Ellers får filmen et id, gemmes, og actionen svarer med **RedirectToAction** (302), så browseren henter listen med GET — **Post/Redirect/Get**. Browseren validerer også selv, men serverens tjek er det, der tæller.",
        noegle: ["POST", "HttpPost", "model binding", "data annotations", "ModelState.IsValid", "RedirectToAction", "Post/Redirect/Get"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m16v", titel: "Værksted: byg Bibliotek-appen selv", vaerksted: true, min: 90, ord: [],
    trin: [
      { t: "laes", h: "Sådan arbejder du i værkstedet",
        md: "Nu bygger du en **ny app helt selv**: **Bibliotek**, en liste over bøger. Den ligner FilmKlub, men du skriver den fra bunden ud fra kravene — uden at kigge i FilmKlub, hvis du kan.\n\nOpgaverne bygger videre på det **samme projekt**. Den første er let. Den fjerde er en fejlfinding med debuggeren. Den sidste samler hele modulet.\n\nWebsider kan ikke sammenlignes tegn for tegn, så de fleste opgaver har **ingen automatisk kontrol**. Brug kravlisten som tjekliste, og sæt flueben selv.",
        noter: [
          ["Skriv selv", "Skriv hver linje med dine egne fingre. Det er sådan, det sætter sig."],
          ["Kør tit", "Stop og start appen efter hver ændring. Så ved du, hvilken ændring der gav en fejl."],
          ["Læs fejlsiden", "Under udvikling viser en 500-fejl hele beskeden og linjen i din kode. Læs den første linje — den siger næsten altid præcis, hvad der er galt."],
          ["Brug debuggeren", "Sæt et breakpoint i en action, start med debuggeren, og åbn adressen i browseren. Programmet stopper, og du kan se alle værdier i {{**Locals**||**Threads & Variables**}}."],
          ["Brug fanen Network", "Udviklerværktøjerne viser hver forespørgsel med metode og statuskode. 404? Så passer adressen ikke til nogen action."],
          ["Tips før løsning", "Åbn ét tip ad gangen. Løsningen er sidste udvej."]
        ] },

      // ----------------------------------------------------------------
      { t: "opgave", h: "Projektet og en action, der svarer med tekst", projekt: "Bibliotek", frag: true,
        md: "Opret et nyt MVC-projekt, der hedder **Bibliotek**. Tilføj en action i `HomeController`, der svarer med ren tekst. Ret også forsiden.\n\nKør appen, åbn `/Home/Om`, og kopiér teksten fra browseren ind herunder.",
        krav: [
          "Projektet er et **ASP.NET Core MVC**-projekt (skabelonen Model-View-Controller), der hedder `Bibliotek`",
          "`HomeController` har en ny action `Om()`, der returnerer `IActionResult`",
          "`Om()` svarer med den rene tekst `Bibliotek version 1` (brug `Content`)",
          "Forsidens `<h1>` i `Views/Home/Index.cshtml` siger `Velkommen til Bibliotek`"
        ],
        tip: [
          "Opret projektet som i lektion 2, trin 3 — bare med navnet `Bibliotek`.",
          "En action er en `public` metode i controlleren. Den skal returnere et svar, ikke en `string`.",
          "`public IActionResult Om() { return Content(\"Bibliotek version 1\"); }` — og adressen er `/Home/Om`."
        ],
        output: "Bibliotek version 1",
        loesning: R`// Controllers/HomeController.cs (den nye action)
public IActionResult Om()
{
    return Content("Bibliotek version 1");
}`,
        ekstra: ["Lav også en action `Info()`, der svarer med `Json(new { navn = \"Bibliotek\", version = 1 })`. Hvad viser browseren?", "Hvad sker der på `/Home/om` med lille o? Prøv det. (Routing er ligeglad med store og små bogstaver.)"] },

      // ----------------------------------------------------------------
      { t: "opgave", h: "Model, data og en liste over bøger", projekt: "Bibliotek", frag: true, fri: true,
        md: "Bibliotek skal have en model for en bog, tre bøger i en liste i hukommelsen og en side, der viser dem. Siden skal kunne nås fra menuen.",
        krav: [
          "`Models/Bog.cs`: klassen `Bog` med properties `Id` (`int`), `Titel` (`string`), `Forfatter` (`string`) og `Sider` (`int`)",
          "`Data/BogData.cs`: en `public static class BogData` med `public static List<Bog> Alle`, der indeholder **Dune** (Frank Herbert, 600 sider, Id 1), **Hobbitten** (J.R.R. Tolkien, 310 sider, Id 2) og **Kongens Fald** (Johannes V. Jensen, 250 sider, Id 4)",
          "`BogController` med actionen `Index()`, der lægger antallet af bøger i `ViewBag.Antal` og sender listen til viewet",
          "`Views/Bog/Index.cshtml` med `@model List<Bog>`, overskriften `Bøger`, teksten `Viser 3 bøger.` (tallet fra ViewBag) og en tabel med titel, forfatter og sider — bygget med `@foreach`",
          "Bøger med **over 500 sider** får teksten `Lang bog` i en ekstra kolonne (brug `@if`)",
          "Menuen i `_Layout.cshtml` har punktet **Bøger**, lavet med `asp-controller` og `asp-action`"
        ],
        tip: [
          "Rækkefølgen: model → data → controller → view → menu. Kør appen efter hvert trin.",
          "I controlleren: `ViewBag.Antal = BogData.Alle.Count; return View(BogData.Alle);`. Husk `using Bibliotek.Data;` og `using Bibliotek.Models;` øverst.",
          "I viewet: `@if (b.Sider > 500) { <span>Lang bog</span> }` inde i en `<td>`. Får du \"view not found\", så tjek, at filen ligger i `Views/Bog/` — mappen hedder `Bog`, ikke `BogController`."
        ],
        output: "Bøger\nViser 3 bøger.\nDune · Frank Herbert · 600 · Lang bog\nHobbitten · J.R.R. Tolkien · 310\nKongens Fald · Johannes V. Jensen · 250",
        loesning: R`// Models/Bog.cs
namespace Bibliotek.Models;

public class Bog
{
    public int Id { get; set; }
    public string Titel { get; set; } = "";
    public string Forfatter { get; set; } = "";
    public int Sider { get; set; }
}

// Data/BogData.cs
using Bibliotek.Models;

namespace Bibliotek.Data;

public static class BogData
{
    // Bog nummer 3 er udlånt for altid og slettet, så Id 3 findes ikke.
    public static List<Bog> Alle = new List<Bog>
    {
        new Bog { Id = 1, Titel = "Dune", Forfatter = "Frank Herbert", Sider = 600 },
        new Bog { Id = 2, Titel = "Hobbitten", Forfatter = "J.R.R. Tolkien", Sider = 310 },
        new Bog { Id = 4, Titel = "Kongens Fald", Forfatter = "Johannes V. Jensen", Sider = 250 }
    };
}

// Controllers/BogController.cs
using Microsoft.AspNetCore.Mvc;
using Bibliotek.Data;
using Bibliotek.Models;

namespace Bibliotek.Controllers;

public class BogController : Controller
{
    public IActionResult Index()
    {
        ViewBag.Antal = BogData.Alle.Count;
        return View(BogData.Alle);
    }
}

@* Views/Bog/Index.cshtml *@
@model List<Bog>
@{
    ViewData["Title"] = "Bøger";
}

<h1>Bøger</h1>
<p>Viser @ViewBag.Antal bøger.</p>

<table class="table">
    <tr><th>Titel</th><th>Forfatter</th><th>Sider</th><th></th></tr>
    @foreach (Bog b in Model)
    {
        <tr>
            <td>@b.Titel</td>
            <td>@b.Forfatter</td>
            <td>@b.Sider</td>
            <td>
                @if (b.Sider > 500)
                {
                    <span class="badge bg-warning text-dark">Lang bog</span>
                }
            </td>
        </tr>
    }
</table>

@* I Views/Shared/_Layout.cshtml, efter Privacy: *@
<li class="nav-item">
    <a class="nav-link text-dark" asp-controller="Bog" asp-action="Index">Bøger</a>
</li>`,
        ekstra: ["Lav `Data()` i `BogController`, der svarer med `Json(BogData.Alle)`, og se JSON'en i browseren.", "Sæt et breakpoint i `Index()`, og se `BogData.Alle` i debuggeren: fold listen ud, og se de tre bøger."] },

      // ----------------------------------------------------------------
      { t: "opgave", h: "Detaljeside og formular med validering", projekt: "Bibliotek", frag: true, fri: true,
        md: "Hver bog skal have sin egen side, og man skal kunne oprette nye bøger i en formular. Ugyldige data må aldrig komme ind i listen.",
        krav: [
          "`Details(int id)` finder bogen med `FirstOrDefault`. Findes den ikke, svarer den `NotFound()`. Viewet `Details.cshtml` viser titel, forfatter, sider og **Id**",
          "Tabellen i `Index.cshtml` har et link **Detaljer** til hver bog, lavet med `asp-action` og `asp-route-id`",
          "`Bog` har data annotations: `Titel` er påkrævet (`Skriv en titel`) og højst 80 tegn; `Forfatter` er påkrævet (`Skriv forfatterens navn`); `Sider` skal være 1–5000 (`Sidetallet skal være fra 1 til 5000`)",
          "`Create` med `[HttpGet]` viser formularen. `Create(Bog bog)` med `[HttpPost]` tjekker `ModelState.IsValid`, giver bogen id'et `Max + 1`, lægger den i listen og omdirigerer til **detaljesiden for den nye bog**",
          "`Create.cshtml` bruger `asp-for` og `asp-validation-for` til alle tre felter og har `@section Scripts` med `_ValidationScriptsPartial`",
          "Index har en knap **Ny bog**",
          "Afprøv: tom formular → tre fejlbeskeder (den ved `Sider` er en engelsk standardtekst, fordi et tomt tal-felt slet ikke bliver til et tal, før `[Range]` kommer til). `/Bog/Details/3` → 404. Matilda, Roald Dahl, 240 sider → du lander på `/Bog/Details/5`"
        ],
        tip: [
          "Kig på lektion 6, trin 1 og 3, men skriv det selv om til `Bog`.",
          "Omdirigering til en bestemt bog: `return RedirectToAction(\"Details\", new { id = bog.Id });`.",
          "Husk `using System.ComponentModel.DataAnnotations;` i `Bog.cs`. Mangler beskederne under felterne, så tjek, at `asp-validation-for` peger på den rigtige property."
        ],
        output: "Ny bog: Matilda, Roald Dahl, 240 sider\nAdresse efter Gem: /Bog/Details/5\nSiden viser: Matilda · Forfatter: Roald Dahl · Sider: 240 · Id: 5",
        loesning: R`// Models/Bog.cs
using System.ComponentModel.DataAnnotations;

namespace Bibliotek.Models;

public class Bog
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Skriv en titel")]
    [StringLength(80, ErrorMessage = "Titlen må højst være 80 tegn")]
    public string Titel { get; set; } = "";

    [Required(ErrorMessage = "Skriv forfatterens navn")]
    public string Forfatter { get; set; } = "";

    [Range(1, 5000, ErrorMessage = "Sidetallet skal være fra 1 til 5000")]
    public int Sider { get; set; }
}

// I Controllers/BogController.cs
public IActionResult Details(int id)
{
    Bog? bog = BogData.Alle.FirstOrDefault(b => b.Id == id);
    if (bog == null)
    {
        return NotFound();
    }
    return View(bog);
}

[HttpGet]
public IActionResult Create()
{
    return View();
}

[HttpPost]
public IActionResult Create(Bog bog)
{
    if (!ModelState.IsValid)
    {
        return View(bog);
    }
    bog.Id = BogData.Alle.Max(b => b.Id) + 1;
    BogData.Alle.Add(bog);
    return RedirectToAction("Details", new { id = bog.Id });
}

@* Views/Bog/Details.cshtml *@
@model Bog
@{
    ViewData["Title"] = Model.Titel;
}

<h1>@Model.Titel</h1>
<p>Forfatter: @Model.Forfatter</p>
<p>Sider: @Model.Sider</p>
<p>Id: @Model.Id</p>
<a asp-action="Index">Tilbage</a>

@* Views/Bog/Create.cshtml *@
@model Bog
@{
    ViewData["Title"] = "Ny bog";
}

<h1>Ny bog</h1>

<form asp-action="Create" method="post">
    <div class="mb-3">
        <label asp-for="Titel" class="form-label"></label>
        <input asp-for="Titel" class="form-control" />
        <span asp-validation-for="Titel" class="text-danger"></span>
    </div>
    <div class="mb-3">
        <label asp-for="Forfatter" class="form-label"></label>
        <input asp-for="Forfatter" class="form-control" />
        <span asp-validation-for="Forfatter" class="text-danger"></span>
    </div>
    <div class="mb-3">
        <label asp-for="Sider" class="form-label"></label>
        <input asp-for="Sider" class="form-control" />
        <span asp-validation-for="Sider" class="text-danger"></span>
    </div>
    <button type="submit" class="btn btn-primary">Gem</button>
</form>

@section Scripts {
    <partial name="_ValidationScriptsPartial" />
}

@* I Views/Bog/Index.cshtml *@
<p><a asp-action="Create" class="btn btn-primary">Ny bog</a></p>
@* … og i hver række: *@
<td><a asp-action="Details" asp-route-id="@b.Id">Detaljer</a></td>`,
        ekstra: ["Giv `Forfatter` en `[RegularExpression]`, så navnet skal starte med stort bogstav.", "Brug fanen Network til at se POST → 302 → GET `/Bog/Details/5`."] },

      // ----------------------------------------------------------------
      { t: "opgave", h: "Fejlfinding: den nye bog forsvinder", projekt: "BibliotekFejl", frag: true, fri: true,
        md: "En kollega har skrevet sin egen udgave af POST-actionen `Create`. Der kommer ingen fejl, men noget er galt: **Når man opretter en ny bog, lander man på detaljesiden for en helt anden bog** (Kongens Fald). Den nye bog står på listen, men dens link **Detaljer** viser også Kongens Fald.\n\nIndsæt startkoden i stedet for din egen POST-action i `BogController`. Find fejlen **med debuggeren** — ikke ved at gætte — og ret den.",
        krav: [
          "Sæt et breakpoint på linjen `bog.Id = …`, og start appen med debuggeren",
          "Opret bogen **Matilda** (Roald Dahl, 240 sider). Når programmet stopper, så se værdien af `BogData.Alle.Count` og bogens id efter linjen (brug {{**F10** (Step Over)||**Step Over**}})",
          "Sammenlign med de id'er, der allerede findes i `BogData.Alle` (fold listen ud i debuggeren)",
          "Skriv med én sætning, hvad fejlen er, og ret linjen",
          "Efter rettelsen lander Matilda på `/Bog/Details/5`, og hver bog på listen har sit eget id"
        ],
        tip: [
          "Hvilken værdi får `bog.Id`? Findes der allerede en bog med det id?",
          "Listen har 3 bøger, men id'erne er 1, 2 og 4 — id 3 er slettet. Antal + 1 er derfor 4, og 4 er optaget. `FirstOrDefault` finder den **første** bog med id 4: Kongens Fald.",
          "Et nyt id skal være større end det **største** id, ikke større end **antallet**: `bog.Id = BogData.Alle.Max(b => b.Id) + 1;`."
        ],
        start: R`[HttpPost]
public IActionResult Create(Bog bog)
{
    if (!ModelState.IsValid)
    {
        return View(bog);
    }
    bog.Id = BogData.Alle.Count + 1;
    BogData.Alle.Add(bog);
    return RedirectToAction("Details", new { id = bog.Id });
}`,
        output: "Fejlen: id'et beregnes som antal + 1 = 4, men id 4 findes allerede (Kongens Fald), fordi id 3 er slettet.\nEfter rettelsen: Matilda får id 5, og /Bog/Details/5 viser Matilda.",
        loesning: R`[HttpPost]
public IActionResult Create(Bog bog)
{
    if (!ModelState.IsValid)
    {
        return View(bog);
    }
    bog.Id = BogData.Alle.Max(b => b.Id) + 1;
    BogData.Alle.Add(bog);
    return RedirectToAction("Details", new { id = bog.Id });
}`,
        ekstra: ["Hvorfor opdagede man ikke fejlen, hvis id'erne var 1, 2 og 3? Prøv at ændre Kongens Fald til Id 3 med startkoden, og se, at den så tilsyneladende virker. Det er derfor, testdata med \"huller\" er gode.", "I modul 17 giver databasen selv hver række et unikt id, så denne fejl ikke kan opstå."] },

      // ----------------------------------------------------------------
      { t: "opgave", h: "Søgning, kort og JSON: hele modulet samlet", projekt: "Bibliotek", frag: true, fri: true,
        md: "Gør Bibliotek færdig. Listen skal vises som kort (et partial view), og man skal kunne søge i titlerne med en GET-formular. Til sidst skal appen også kunne levere bøgerne som JSON.",
        krav: [
          "Et partial view `Views/Shared/_BogKort.cshtml` med `@model Bog` viser titel, forfatter, sider, et **Detaljer**-link og — hvis bogen har over 500 sider — mærket `Lang bog`",
          "`Index.cshtml` viser bøgerne med `<partial name=\"_BogKort\" model=\"b\" />` i en `@foreach` i stedet for tabellen",
          "Over listen står en formular med `asp-action=\"Soeg\"` og `method=\"get\"` med et tekstfelt, der hedder `tekst`, og en knap **Søg**",
          "`Soeg(string tekst)`: er teksten tom, omdirigeres til `Index`. Ellers findes de bøger, hvis titel indeholder teksten (uden forskel på store og små bogstaver), antallet lægges i `ViewBag.Antal`, og de vises med **Index-viewet**: `return View(\"Index\", fundne);`",
          "Søgeordet står stadig i tekstfeltet efter søgningen (læg det i `ViewBag.Soegning`, og sæt feltets `value`)",
          "`Data()` svarer med `Json(BogData.Alle)`",
          "Afprøv: søg på `HOB` → **Viser 1 bøger.** og kun Hobbitten; adressen er `/Bog/Soeg?tekst=HOB`. Tom søgning → tilbage på `/Bog`"
        ],
        tip: [
          "En GET-formular sender felterne i query string. Feltet `name=\"tekst\"` bliver til `?tekst=...`, og model binding giver værdien til parameteren `tekst`.",
          "Søgningen med LINQ (modul 9): `BogData.Alle.Where(b => b.Titel.ToLower().Contains(tekst.ToLower())).ToList()`. Tom tekst: `if (string.IsNullOrWhiteSpace(tekst)) return RedirectToAction(\"Index\");`.",
          "I partial viewet skal linket have `asp-controller=\"Bog\"` med, så det virker, uanset hvilket view kortet sættes ind i. Feltet: `<input name=\"tekst\" value=\"@ViewBag.Soegning\" />`."
        ],
        output: "/Bog/Soeg?tekst=HOB\nViser 1 bøger.\nHobbitten · J.R.R. Tolkien · 310 sider",
        loesning: R`// I Controllers/BogController.cs
public IActionResult Soeg(string tekst)
{
    if (string.IsNullOrWhiteSpace(tekst))
    {
        return RedirectToAction("Index");
    }
    List<Bog> fundne = BogData.Alle
        .Where(b => b.Titel.ToLower().Contains(tekst.ToLower()))
        .ToList();
    ViewBag.Antal = fundne.Count;
    ViewBag.Soegning = tekst;
    return View("Index", fundne);
}

public IActionResult Data()
{
    return Json(BogData.Alle);
}

@* Views/Shared/_BogKort.cshtml *@
@model Bog

<div class="card mb-2">
    <div class="card-body">
        <h5 class="card-title">@Model.Titel</h5>
        <p class="card-text">@Model.Forfatter · @Model.Sider sider</p>
        @if (Model.Sider > 500)
        {
            <span class="badge bg-warning text-dark">Lang bog</span>
        }
        <a asp-controller="Bog" asp-action="Details" asp-route-id="@Model.Id">Detaljer</a>
    </div>
</div>

@* Views/Bog/Index.cshtml *@
@model List<Bog>
@{
    ViewData["Title"] = "Bøger";
}

<h1>Bøger</h1>

<form asp-action="Soeg" method="get" class="mb-3">
    <input name="tekst" value="@ViewBag.Soegning" placeholder="Søg i titler" />
    <button type="submit" class="btn btn-secondary btn-sm">Søg</button>
</form>

<p>Viser @ViewBag.Antal bøger.</p>
<p><a asp-action="Create" class="btn btn-primary">Ny bog</a></p>

@foreach (Bog b in Model)
{
    <partial name="_BogKort" model="b" />
}`,
        ekstra: ["Skriv `bog` i ental, når der er præcis én: `@(ViewBag.Antal == 1 ? \"bog\" : \"bøger\")`.", "Lav en action `Lange()`, der kun viser bøger med over 500 sider, og et menupunkt til den.", "Forbered dig til eksamen: åbn `Program.cs`, og skriv ét stikord ud for hver linje på et papir — og skriv så stikord for vejen fra klik på **Søg** til færdig side: GET, routing, model binding, LINQ, ViewBag, view, partial view, layout."] }
    ] }
  ]
});
})();
