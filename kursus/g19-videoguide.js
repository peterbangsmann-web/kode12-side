// Videoguide til modul 19–27: tidsstempler i lærerens optagelser.
(function () {
window.VIDEOGUIDE = window.VIDEOGUIDE || {};
window.VIDEOGUIDE["m19"] = [
  { video: "16-Man_WebServices.mp4", punkter: [
    ["00:54", "Web services afleverer data — du bruger dem hver dag uden at vide det (hører til lektion 1)"],
    ["02:23", "SOAP og WSDL (XML) i den gamle WCF — og REST, Representational State Transfer (03:22)"],
    ["06:41", "Demo 1: en WCF Service Application som \"tredjepart\" med `IService`, afprøvet i WCF Test Client (14:21)"],
    ["20:35", "ADO.NET Entity Data Model med \"Code First from database\" henter `Customers` fra VoresDB"],
    ["34:58", "Klienten: et MVC Core-projekt med Add Service Reference (WCF Web Service, Discover)"],
    ["40:28", "`CustomerServiceClient` i `HomeController` og `await ...GetCustomersAsync()` til viewet"],
    ["49:56", "Web API i tre trin: data i controlleren, et repository og en database; dependency inversion fra SOLID (50:42) (lektion 3)"],
    ["56:47", "Hvorfor API'er: moderne apps (React, Angular, Blazor) henter kun data fra serveren"],
    ["59:56", "Nyt projekt: ASP.NET Core Web API med OpenAPI og controllers (60:55) (lektion 2)"],
    ["69:11", "`[ApiController]`, `[Route(\"api/[controller]\")]` og en tom API-controller `PersonsController` (71:50)"],
    ["78:25", "`[HttpGet]` returnerer alle personer som JSON; `[HttpGet(\"{id}\")]` henter én (89:40)"],
    ["85:06", "Postman til at afprøve API'et (lektion 5); pause 86:06, han fortsætter 87:05"],
    ["95:17", "Repository: interfacet `IPersonsData` med CRUD-metoder (97:25) og klassen `PersonsRepository` (lektion 3)"],
    ["109:06", "Controlleren får `IPersonsData` gennem konstruktøren; `AddSingleton` i `Program.cs` (112:30) (lektion 3)"],
    ["115:57", "Pause — han fortsætter 116:10 med en database bag API'et"],
    ["118:58", "`PersonsDB : DbContext`, startdata med `HasData` (123:46) og migration (130:31) (lektion 4)"],
    ["133:47", "`AddScoped` i stedet for `AddSingleton` til databasen; Singleton, Scoped og Transient (135:14)"],
    ["149:54", "POST, PATCH/PUT (151:45) og DELETE i controlleren; afprøvet i Postman med en JSON-body (163:05) (lektion 4)"],
    ["172:08", "Swagger i stedet for Postman: pakken Swashbuckle (172:43), Try it out og Execute (186:16) (lektion 5)"],
    ["191:51", "Scalar som nyere alternativ; `swagger.json` er OpenAPI-specifikationen (193:31); en elev viser Scalar (200:18)"]
  ] }
];
window.VIDEOGUIDE["m20"] = [
  { video: "17_Tirs_Auth_WS.mp4", punkter: [
    ["02:25", "Authentication-typer i MVC-skabelonen: Windows Authentication — og så Individual Accounts (05:32) (hører til lektion 1)"],
    ["07:05", "Areas/Identity: login- og registreringssiderne findes, men er skjult; Data-mappen har migration og `ApplicationDbContext`"],
    ["13:17", "Authentication (hvem er du?) og authorization (hvad må du?) — forklaret med et kørekort (14:51) (lektion 2)"],
    ["17:37", "Connection string til databasen `AuthDB` og `Update-Database`; tabellerne AspNetUsers, AspNetRoles … (21:39)"],
    ["23:00", "`[Authorize]` på `HomeController` kræver login; `[AllowAnonymous]` undtager forsiden (25:13) (lektion 2)"],
    ["28:43", "Roller: `AddRoles<IdentityRole>()` i `Program.cs` (lektion 3)"],
    ["32:01", "Kode ved opstart opretter rollerne Admin, SuperUser og User med `RoleManager` (lektion 3)"],
    ["42:49", "En admin-bruger oprettes med `UserManager`, et password med krav (43:36) og `AddToRoleAsync`"],
    ["53:29", "`AdminController` med `[Authorize(Roles = \"Admin\")]` (55:04) (lektion 4)"],
    ["60:25", "Kaffepause — derefter action `CreateUser` med `UserManager` og `RoleManager` via dependency injection (61:46)"],
    ["64:50", "View model: `CreateUserViewModel` er kun til viewet og bliver ikke en tabel; `[Compare]` på bekræft-password (69:31) (lektion 4)"],
    ["94:03", "`TempData`, `ViewData` og `ViewBag` — `TempData` overlever en redirect"],
    ["102:54", "Et layout pr. rolle (`_LayoutAdmin`, `_LayoutSuperUser`), valgt i `_ViewStart` med `User.IsInRole` (127:59)"],
    ["110:06", "Efter en kort pause: siderne Secret og SuperSecret med `[Authorize(Roles = \"Admin,SuperUser\")]` (111:25) (lektion 3)"],
    ["139:52", "Elevens fejl: `UseAuthentication` skal stå før `UseAuthorization`; frokost 140:23"],
    ["140:43", "WebSocket: en åben forbindelse begge veje, som en telefon i stedet for en walkie-talkie; `ws://` (143:45) (lektion 5)"],
    ["162:27", "SignalR: klassen `ChatHub : Hub` og klient-biblioteket `@microsoft/signalr` (163:51)"],
    ["167:04", "`SendMessage` i hubben sender til alle med `Clients.All.SendAsync`; `MapHub` og `AddSignalR` i `Program.cs` (168:37)"],
    ["196:22", "JavaScript i chat-siden: `HubConnectionBuilder`, `connection.start()`, `connection.on(...)` (197:38) og `invoke` (lektion 5)"],
    ["217:35", "Chatten afprøvet i tre browsere; fejl 220:50: navnet i `invoke` skal passe med metoden i hubben"]
  ] }
];
window.VIDEOGUIDE["m21"] = [
  { video: "18_Ons_SPA_With_Angular.mp4", punkter: [
    ["01:48", "Tegning: i en almindelig MVC-app sender hver klik en ny forespørgsel efter en hel side (hører til lektion 1)"],
    ["04:02", "Single page application: hele appen hentes første gang, derefter kun data fra et API"],
    ["11:49", "JavaScript-frameworks: Angular, React og Vue (og gamle Knockout); Blazor er Microsofts (lektion 1)"],
    ["13:08", "TypeScript bliver oversat til JavaScript, fordi browseren kun kender JavaScript (lektion 3)"],
    ["22:08", "Demo: et Razor Pages-projekt med én side for hver af JavaScript, Angular, React og Vue, hentet via CDN"],
    ["43:12", "Angular (gammel version via CDN): `ng-app`, `ng-controller` (44:35) og `ng-model`"],
    ["51:09", "React med `useState` og Vue med `v-model` (55:52) — samme lille eksempel"],
    ["59:36", "Two-way binding: det, du skriver i feltet, vises med det samme tre steder (lektion 4)"],
    ["73:02", "Kort pause — derefter installation i PowerShell"],
    ["74:22", "Angular kører på Node.js; installer Node fra nodejs.org og tjek med `node -v` (78:53) (lektion 2)"],
    ["81:52", "`Set-ExecutionPolicy RemoteSigned`, `npm install -g @angular/cli` (83:45) og `ng version` (86:07) (lektion 2)"],
    ["88:59", "Skabelonen \"Angular and ASP.NET Core\" giver to projekter: server og client (92:31); mangler Node i Visual Studio, så brug Installer og genstart (90:38)"],
    ["93:47", "Klientprojektet: `src/app` med `app.html`, `app.ts` og `app.css`; et TypeScript-interface spejler C#-klassen (99:22)"],
    ["100:45", "Serveren: model `Customer`, EF Core-pakker (102:44), `AngularDB : DbContext` (105:27) og migration — som i MVC"],
    ["112:52", "CORS (Cross-Origin Resource Sharing) i serverens `Program.cs` med `app.UseCors` (118:47) (lektion 5)"],
    ["126:23", "API-controller med Entity Framework: `CustomersController`; server og client startes sammen (134:43)"],
    ["140:08", "Efter frokost: `ng generate component customer` (144:13), `ng generate service` (146:59), `ng generate environments` (149:02) (lektion 4–5)"],
    ["163:54", "Servicen: `@Injectable`, `HttpClient` og `refreshList()` med `http.get(...).subscribe(...)` (171:50) (lektion 5)"],
    ["185:05", "`<app-customer>` i `app.html`; `*ngIf` (193:16) og `*ngFor` viser kundelisten (lektion 4)"],
    ["216:36", "Typiske fejl: felterne i TypeScript starter med lille bogstav, og URL'en i environment skal have `/api` (221:28)"]
  ] }
];
window.VIDEOGUIDE["m22"] = [
  { video: "19_Tors_Blazor.mp4", punkter: [
    ["01:34", "Blazor gør det samme som Angular, React og Vue — men med C# i stedet for JavaScript (hører til lektion 1)"],
    ["03:15", "Ny Blazor Web App: interactive render mode (Server, WebAssembly, Auto, None) og interactivity location Global eller Per page (04:05) (lektion 2)"],
    ["06:23", "Projektets filer: Components, Pages og `.razor`-filer i stedet for `.cshtml` (07:10)"],
    ["08:55", "`Counter.razor` linje for linje: `@page \"/counter\"`, `<PageTitle>`, `@code`, `currentCount++` og `@onclick` (10:19) (lektion 3)"],
    ["16:21", "Egen child component `Heading3.razor` uden `@page` — den kan ikke åbnes direkte i browseren (lektion 4)"],
    ["23:29", "`[Parameter] public string MyText { get; set; } = \"...\"` med standardværdi; brugt fra Home (25:44) (lektion 4)"],
    ["31:07", "Child components genbruges; også `<Counter />` og `<Weather />` kan sættes ind i en anden side (35:09)"],
    ["36:41", "`MainLayout.razor` og `NavMenu.razor` med `NavLink`; Home vises først pga. `@page \"/\"` (41:31)"],
    ["43:55", "Kan Blazor også two-way binding? Demo-siden `BindingDemo` (lektion 5)"],
    ["45:41", "Pause — han fortsætter 46:06"],
    ["53:20", "`value=\"@name\"` med `@onchange`; derefter `@oninput`, så teksten skifter med det samme (57:05)"],
    ["57:57", "`@bind` og `@bind:event=\"oninput\"` — den korte måde (lektion 5)"],
    ["85:15", "Uden `@bind:event` bruger `@bind` onchange — du ser først ændringen, når du klikker væk"],
    ["90:16", "Pause — 90:23 tegning af tre måder at placere C#: i `@code`, i en code-behind `partial class` (95:03) eller i en `ComponentBase`-klasse (95:47)"],
    ["97:46", "`MathTable.razor` med code-behind `MathTable.razor.cs`; klassen skal være `partial` (104:05)"],
    ["120:47", "Gangetabel med en `@for`-løkke i en tabel, der skifter med det samme, når tallet ændres (125:52) (lektion 6)"],
    ["130:22", "Pause — 130:48 `AddTwoNumbers` med `AddTwoNumbersBase : ComponentBase` og `@inherits` (134:31); fejl: manglende arv (139:50)"],
    ["155:10", "Database bag Blazor: model `Person`, `PersonsDB`, connection string og migration (164:43); en service `IPersonService`/`PersonService` (170:52)"],
    ["185:51", "`AllPersons`: servicen injiceres i code-behind, `OnInitializedAsync` henter listen (189:32), `@if`/`@foreach` viser tabellen (191:52) (lektion 6)"],
    ["195:33", "Fejl \"no registered service\": servicen skal registreres med `AddScoped` i `Program.cs` (196:49); opgave: en Blazor-lommeregner (201:43)"]
  ] }
];
window.VIDEOGUIDE["m23"] = [
  { video: "20_Fre_SPA_With_Blazor.mp4", punkter: [
    ["00:00", "De første 8 minutter handler om en frivillig certificering — Blazor begynder 08:18"],
    ["10:00", "En elev forklarer `partial`: koden fra flere filer bliver samlet til én klasse"],
    ["16:00", "Nyt projekt: Blazor Web App `BlazorServerSPA` med Interactive Render Mode Server og Global (17:13) (hører til lektion 1)"],
    ["31:09", "Model `Customer`, EF Core-pakker (34:32), `KundeDB : DbContext` (35:29) med startdata via `HasData` (38:15) (lektion 3)"],
    ["43:02", "Connection string i `appsettings.json` og migration (45:40)"],
    ["47:30", "Kaffepause — han fortsætter 47:38"],
    ["47:54", "CRUD-sider i mappen Pages/Customers; Services-mappe med `ICustomerService` og `CustomerService` (49:49) (lektion 2)"],
    ["52:15", "Interfacet: hent alle, hent én (`GetCustomerById`), opret, ret og slet — alle asynkrone"],
    ["56:23", "`CustomerService` bruger `DbContext` via dependency injection og `SaveChangesAsync` (lektion 3)"],
    ["65:51", "`AllCustomers` med code-behind: servicen injiceres, `OnInitializedAsync` henter listen (68:36) (lektion 2)"],
    ["70:46", "`DeleteCustomer` direkte i listen og `@onclick` på Slet-knappen (84:12) — virker straks uden bekræftelse (lektion 4)"],
    ["74:03", "Flere `@page`-ruter på samme side, fx `/customers` og `/kunde` (74:47) (lektion 5)"],
    ["90:34", "Pause; fejl: servicens konstruktør var `private` (93:11); han fortsætter 93:50"],
    ["99:35", "`Create.razor`: `NavigationManager` sender brugeren tilbage til listen (lektion 4)"],
    ["105:09", "`<EditForm>` med `OnValidSubmit`, `DataAnnotationsValidator`, `InputText` og `InputNumber` (108:53) (lektion 4)"],
    ["111:45", "`Details.razor` med `[Parameter] int Id`; fejl: ruten skal være `{id:int}`, ellers er id en string (124:42) (lektion 5)"],
    ["125:28", "Menupunkter i `NavMenu.razor` til kundelisten og Opret kunde (lektion 5)"],
    ["131:28", "Pas på Copilot: `OnInvalidSubmit` i stedet for `OnValidSubmit`; frokost 132:12"],
    ["133:25", "`Edit.razor` med `EditBase : ComponentBase` og `@inherits`; fejl: `InputText` på et tal-felt, brug `InputNumber` (143:39)"],
    ["145:54", "Blazor Server kører over SignalR og WebSocket; resten (147:55–) er Blazor WebAssembly med API-controller og `HttpClient` og hører til modul 24 (lektion 1)"]
  ] }
];
window.VIDEOGUIDE["m24"] = [
  { video: "21_Man_WASM+WebStorage.mp4", punkter: [
    ["00:12", "Fortsætter WebAssembly-projektet fra fredag: et Client- og et Server-projekt, og kunderne vises allerede (hører til lektion 2)"],
    ["02:02", "Modellen `Customer` findes i begge projekter; man kan også lave et tredje fælles projekt med project references (lektion 3)"],
    ["07:51", "Start aldrig begge projekter: start serveren, så starter klienten med"],
    ["09:12", "`Create.razor` i klienten med `HttpClient` injiceret (10:22) og en `EditForm` (lektion 3)"],
    ["18:04", "`PostAsJsonAsync` sender den nye kunde til API'et, og brugeren sendes tilbage til listen"],
    ["19:50", "`Edit.razor`: `GetFromJsonAsync` henter kunden (27:41), `PutAsJsonAsync` gemmer ændringen (28:56)"],
    ["34:14", "Fejl: NullReferenceException ved navigering — `NavigationManager` var ikke injiceret; `[Inject]`-attributten manglede (53:33)"],
    ["45:30", "Knapper til Edit, Details og Delete i listen; `Details.razor` (46:50)"],
    ["61:55", "`Delete.razor` spørger \"Er du sikker?\" (63:34), før kunden slettes via API'et"],
    ["69:11", "Hele CRUD afprøvet i browseren: Details, Edit, Update og Delete"],
    ["72:32", "Elevtip: siden tegnes, før data er hentet — brug `new Customer()` eller `@if (customer == null)` med \"Loading\""],
    ["80:33", "F12: Blazors JavaScript og DLL-filerne, som WebAssembly henter til browseren (lektion 1)"],
    ["84:56", "Server, WebAssembly eller Auto: Server er let for browseren og tung for serveren, WebAssembly omvendt (89:13) (lektion 5)"],
    ["89:57", "Web storage: gem fx brugerens navn og farvevalg i browseren i stedet for på serveren — cookies, sessionStorage og localStorage (91:26) (lektion 4)"],
    ["98:00", "Cookie-demo: en `<select>` skifter baggrundsfarve, og farven gemmes i `document.cookie` med `expires` (107:02)"],
    ["109:48", "`window.onload` læser cookien og splitter teksten på `;` og `=`; cookien ses i F12 under Application (115:34)"],
    ["119:41", "Pause — 120:19 `sessionStorage` forsvinder, når browseren lukkes; `localStorage` bliver, ca. 5 MB pr. domæne (122:32) (lektion 4)"],
    ["126:47", "`setItem` i én side og læsning i en anden; efter genstart er sessionStorage tom, localStorage ikke (138:34)"],
    ["140:10", "\"Velkommen tilbage, Ole\": navn og baggrundsfarve i localStorage, læst ved `window.onload` (153:28)"],
    ["171:34", "Pause — 171:56 eksamensprojektet: full stack-app, helst Blazor WebAssembly/Auto; disposition som PDF og projekt som zip i WISEflow (176:46)"]
  ] }
];
window.VIDEOGUIDE["m25"] = [
  { video: "26_Tir_ML+AI_integration.mp4", punkter: [
    ["00:55", "Først eksamensplanen: ca. 10 minutters præsentation og spørgsmål — vis hellere koden end slides (03:53)"],
    ["06:28", "Machine learning med Python i en Jupyter Notebook — kun for at vise ideen (hører til lektion 1)"],
    ["10:21", "Trinene: hent data, rens data og del dem i trænings- og testdata (10:34)"],
    ["10:58", "Maskinen lærer mønstre, ligesom bilkørsel bliver automatisk efter mange år bag rattet (lektion 1)"],
    ["14:41", "Sprogmodeller: tekst deles i tokens, som gemmes som vektorer; ord, der ligner hinanden, ligger tæt"],
    ["20:05", "Machine learning er statistiske modeller, fx lineær regression (lektion 1)"],
    ["21:07", "Python: `import pandas`, `numpy` og `LinearRegression` fra scikit-learn"],
    ["23:48", "Træningsdata: tre tilfældige tal og resultatet af en formel, gentaget mange gange"],
    ["28:32", "`model.fit(...)` lærer af listerne, `model.predict(...)` gætter resultatet (30:02) — modellen finder selv formlen (lektion 2)"],
    ["35:21", "Samme eksempel i C# med ML.NET: en ny konsol-app og NuGet-pakken `Microsoft.ML` (37:28) (lektion 2)"],
    ["38:58", "`ModelInput` med `float`-felterne N1, N2, N3 og `Label` (41:33), og `ModelOutput` med `Score` (43:14)"],
    ["44:41", "`MLContext`, `Random` og 2000 træningsrækker lavet med en formel (45:36)"],
    ["54:10", "Kaffepause — han fortsætter 54:31"],
    ["54:31", "`LoadFromEnumerable` (55:16), `Concatenate` til features og en regressions-trainer, OLS eller SDCA (58:57)"],
    ["63:18", "Fejl: OLS kræver en ekstra NuGet-pakke"],
    ["66:20", "`Fit` træner modellen, `CreatePredictionEngine` (67:18) og en forudsigelse med `.Score` (72:51)"],
    ["73:54", "Svaret er tæt på, men ikke præcist; SDCA rammer mere ved siden af end OLS (76:17)"],
    ["84:06", "Fejlfinding: uden grænser i `Random.Next` bliver tallene enorme, og forudsigelsen bliver skæv"],
    ["86:13", "Skal modellen trænes hver gang? Den kan gemmes som en zip-fil og indlæses igen (97:37) (lektion 3)"],
    ["103:44", "Pause — derefter AI-integration (modul 26)"]
  ] }
];
window.VIDEOGUIDE["m26"] = [
  { video: "26_Tir_ML+AI_integration.mp4", punkter: [
    ["14:41", "Baggrund for AI-delen: sprogmodeller deler tekst i tokens, som gemmes som vektorer (lektion 1)"],
    ["103:44", "Pause — han fortsætter 104:07 med AI-integration: en chatbot på sitet, hybrid (105:26) og RAG (105:52)"],
    ["106:48", "Nyt Blazor-projekt med en `Chatbot.razor`-komponent (109:50) (lektion 2)"],
    ["110:40", "NuGet-pakken `Mscc.GenerativeAI` giver adgang til Gemini"],
    ["114:12", "Chatvinduet: en container med fast højde og `overflow`, så beskederne kan scrolle"],
    ["116:48", "Felterne `isTyping`, `userInput` og chathistorikken, der giver modellen kontekst; klassen `ChatMessage` med `Text` og `IsUser` (119:17)"],
    ["124:38", "`OnInitialized` og valg af model (126:11); Gemini-nøglen (127:54) i `appsettings.json` — en hemmelighed, der bliver på serveren (129:32) (lektion 3)"],
    ["133:16", "`new GoogleAI(apiKey)`, modellen gemini-2.5-flash (135:53) og `StartChat` (139:24)"],
    ["140:12", "`SendMessage`: stop ved tomt input eller hvis `isTyping` (143:07), og kald `StateHasChanged` (146:10)"],
    ["147:00", "Systemprompten giver faste svar på bestemte spørgsmål (159:54); `chatSession.SendMessage` i try/catch (154:41)"],
    ["164:57", "Send med Enter-tasten; `foreach` over historikken (165:47); knappen er `disabled`, mens botten skriver (172:57)"],
    ["174:32", "Første test — teksten vises ikke, og fejlen rettes (176:49)"],
    ["180:22", "Endnu en rettelse (`return`); svaret kommer på svensk i stedet for dansk (183:31), så sproget sættes i `systemInstruction` = systemprompten (184:45)"],
    ["189:07", "RAG forklaret: hent relevante dokumenter og giv dem med til modellen (191:26)"],
    ["194:25", "Ny komponent `RagChatbot` med en `Document`-klasse (201:00)"],
    ["213:43", "`RetrieveDocument` finder det bedste dokument ved at matche ord (218:40)"],
    ["231:12", "Prompten = dokument + spørgsmål; uden et match falder den tilbage til sprogmodellens egen viden (240:13)"],
    ["244:16", "Raw strings med `\"\"\"` gør lange prompts lette at skrive"],
    ["257:11", "Fejlfinding med breakpoint: modellen er ikke længere tilgængelig for nye brugere (267:08), så han skifter til Gemini 3 Flash med en ny nøgle — det virker (272:35)"],
    ["278:01", "Næste skridt: læg dokumenterne som filer i `wwwroot`"]
  ]}
];
window.VIDEOGUIDE["m27"] = [
  { video: "25_Man_HTMLAPIs.mp4", punkter: [
    ["04:00", "Nyt tomt ASP.NET Web Application-projekt (.NET Framework) kun til HTML og JavaScript — gamle .NET Framework-projekter findes stadig ude i firmaerne (05:02)"],
    ["07:39", "Drag and drop API: en side med en boks, et billede og en tekst, der skal trækkes ind i boksen (lektion 3)"],
    ["19:52", "Billeder kan trækkes som standard, tekst kan ikke; `draggable=\"true\"` gør teksten trækbar (20:37)"],
    ["22:24", "Boksen får `ondragover` → `allowDrop(event)` og `ondrop` → `drop(event)` (23:09); billedet og teksten får `ondragstart` (23:57)"],
    ["24:50", "Pause — han fortsætter 25:24 med de tre funktioner"],
    ["28:51", "`allowDrop`: `event.preventDefault()` slår browserens standard (ingen drop) fra"],
    ["29:49", "`drag`: `event.dataTransfer.setData(...)` gemmer elementets id — derfor skal billedet og teksten have et id (30:37)"],
    ["31:22", "`drop`: `getData` henter id'et, `getElementById` finder elementet (32:54), og `event.target.appendChild(...)` flytter det ind (33:41)"],
    ["35:35", "`cloneNode(true)` kopierer i stedet for at flytte; drop på hele `body` (37:58)"],
    ["41:55", "FileReader: `<input type=\"file\">` med `onchange` og en `<textarea>` (42:40); tjek `files.length` og filtypen med et regulært udtryk (46:45); `new FileReader()` med `onload`, `onerror` og `readAsText` (49:23)"],
    ["56:36", "Faldgrube: et regulært udtryk sat i anførselstegn matcher ikke (57:24); browsercache — luk og genindlæs siden (64:17)"],
    ["65:58", "Samme idé med billeder: `img.src` i stedet for `value` (70:38) — resultatet er en data-URL (71:23)"],
    ["77:13", "Web Worker: en lang beregning fryser siden; en worker kører separat ved siden af, ligesom en kaffemaskine (80:23)"],
    ["93:55", "`new Worker(\"web_worker.js\")`, `postMessage` og `addEventListener(\"message\", ...)` (95:47); workeren bruger `self.addEventListener` (101:36) og `self.postMessage` efter en lang løkke (104:49) — siden svarer imens (107:08)"],
    ["109:36", "Pause — han fortsætter 110:01 med den tredje parameter til `addEventListener`"],
    ["111:46", "Capture vs. bubble: den tredje parameter er `capture`, og standarden er `false` = bubble (119:07)"],
    ["129:52", "Demo med `querySelectorAll(\"*\")`: `true` går fra `html` ned til knappen, `false` fra knappen op (131:25)"],
    ["136:18", "Closures (hører til modul 15): self-invoking funktion (141:42) og en indre funktion, der husker `x` (153:30)"],
    ["157:37", "Pause — han fortsætter 158:12 med et kursus-eksempel på closures, og AI omskriver det til en OOP-klasse (178:45)"],
    ["186:31", "Forberedelse til i morgen: Blazor Server med EF og scaffoldede CRUD-komponenter med QuickGrid (206:44) (hører til modul 23)"]
  ]},
  { video: "27_Ons_SlideShow_Canvas.mp4", punkter: [
    ["00:50", "RAG-chatbotten fortsætter (hører til modul 26): dokumenterne lægges som tekstfiler i en `Knowledge`-mappe — ikke i `wwwroot`, hvis de er følsomme (01:38)"],
    ["22:28", "`LoadDocuments`: `Path.Combine(env.ContentRootPath, ...)` (23:15), `Directory.GetFiles(..., \"*.txt\")` (24:56) og `File.ReadAllText` (27:14)"],
    ["32:00", "`RetrieveDocument` deler spørgsmålet i ord og giver hvert dokument point (33:36); faldgrube: `LoadDocuments` blev aldrig kaldt (38:00)"],
    ["46:36", "Den gratis Gemini-nøgle har en kvote, så mange på én nøgle får fejl (47:21); `OnInitialized` vs. `OnInitializedAsync` (49:41)"],
    ["52:53", "Pause — han fortsætter 53:09 med et nyt ASP.NET Core MVC-projekt, `Slideshow` (lektion 1)"],
    ["54:44", "Eksamenstip: i morgen er eksamensforberedelse — fortæl ved eksamen, hvad du har tilføjet til projektet (55:30)"],
    ["58:36", "`Photo`-modellen: `PhotoFile` er en `IFormFile` (63:23) med `[NotMapped]`, så billedet gemmes i `wwwroot/images` og ikke i databasen (61:04)"],
    ["66:35", "De faste EF-trin: DbContext, connection string, `Program.cs` og migration (72:08); scaffold en MVC-controller med EF (73:55)"],
    ["84:12", "Inject `IWebHostEnvironment`; `WebRootPath` (86:02), `Path.Combine` med `images` (88:19), og `FileStream` + `CopyToAsync` (90:41)"],
    ["93:09", "Faldgrube i .NET 10: mappen under Views hedder `Photo`, mens controlleren hedder `Photos` — så findes viewet ikke"],
    ["96:23", "Formularen skal have `enctype=\"multipart/form-data\"`; `accept=\"image/*\"` viser kun billeder (97:08)"],
    ["103:48", "Index viser billedet med `<img src=\"~/images/@item.Title\">` og `asp-append-version` (106:14)"],
    ["111:24", "`Slideshow`-action og view med en `div` pr. billede (115:43); `slideshow.css`, `slideshow.js` og jQuery (120:32)"],
    ["125:25", "Ideen: alle billeder ligger oven på hinanden med `position: absolute` (129:16), og `z-index` styrer, hvem der er øverst (126:59)"],
    ["133:31", "`slideSwitch` med jQuery: den aktive eller `:last` (136:41), `next()` eller den første (137:27), opacity 0 og `animate` op til 1 (142:14), og `setInterval` (146:50)"],
    ["151:50", "Pause — han fortsætter 152:07 med canvas: `getContext(\"2d\")` (157:01), rektangler (158:15) og `arc` (162:20) (lektion 1)"],
    ["171:02", "Mange cirkler på tilfældige steder med `Math.random()`; animation med `requestAnimationFrame` (175:54), der vender ved kanten (179:44), og `clearRect` (185:43)"],
    ["189:46", "Tilfældige farver: `Math.floor(Math.random() * ...)` giver 0–255 til hver kanal i en `rgb(...)`-streng"],
    ["195:21", "Pause — han fortsætter 195:34 med en `Circle`-klasse og 5000 cirkler (197:49); faldgrube: felterne hedder `this.x` (211:17), og en ekstra `clearRect` skulle fjernes (232:31), før stjernehimlen virkede (236:14)"],
    ["240:33", "Eksamensinfo og tidsplan; til sidst SonarLint, der foreslår forbedringer — slå warnings til fejl før produktion (246:47)"]
  ]}
];
})();
