// Modul 28 — Projekt og eksamen: vejen til 12. Forudsætter: modul 0–27.
// Kilder: _udvikling/kilder/gammel/curriculum-dag23.js (prøveform, læringsmål, dispositionens regler, lærerens eksempelprojekt)
// og _udvikling/kilder/Project.txt (projektkravene). Emnet for projektet vælges IKKE her.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m28", nr: 28, del: "Eksamen", ikon: "🎓",
  titel: "Projekt og eksamen: vejen til 12",
  dag: "Aflevering 30/10 · Mundtlig eksamen 6/11",
  intro: "Alt i kurset peger mod én halv time: du viser et projekt, du selv har bygget, og taler om det med eksaminator og censor. Her lærer du, hvad der bliver bedømt, hvad projektet skal indeholde, hvordan dispositionen og præsentationen bygges op, og du træner svarene på de spørgsmål, der dækker fagets læringsmål.\n\nDu skal ikke lære sætninger udenad. Du skal forstå hvert svar så godt, at du kan pege på den linje i din egen kode, det handler om.",
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m28l1", titel: "Eksamen: hvad der sker, og hvad der bliver bedømt", min: 16,
    ord: [
      ["Produkt", "Dit projekt: en fullstack webapplikation, som du afleverer som zip-fil."],
      ["Disposition", "Et papir på højst én normalside plus en litteraturliste. Det angiver i stikord det teoretiske grundlag for dit produkt."],
      ["Helhedsvurdering", "Du får én samlet karakter for produktet, dispositionen og den mundtlige præstation tilsammen."],
      ["Eksaminator", "Din lærer. Skal give dig mulighed for at vise, hvad du har lært."],
      ["Censor", "Den anden bedømmer. Ser efter huller i forhold til fagets mål, sikrer en fair eksamen og har det endelige ansvar for karakteren."],
      ["Læringsmål", "Det, studieordningen siger, at du skal vide og kunne efter faget. Det er dem, karakteren måles op imod."],
      ["Votering", "Når eksaminator og censor taler sammen om karakteren, mens du venter udenfor."],
      ["7-trinsskalaen", "Den danske karakterskala: 12, 10, 7, 4, 02, 00 og -3."]
    ],
    trin: [
      { t: "laes", h: "Tre ting bliver bedømt sammen",
        md: "Faget hedder **Videregående programmering** (modul Vf1, 10 ECTS). Prøven er en mundtlig prøve kombineret med et praktisk produkt og en disposition. Der er intern censur, og du får **én samlet karakter** efter 7-trinsskalaen.\n\n- **Produktet** er dit projekt: en fullstack webapplikation, afleveret som zip-fil.\n- **Dispositionen** er højst én normalside plus en litteraturliste. Den angiver i stikord det teoretiske grundlag for produktet. Den afleveres som pdf.\n- **Den mundtlige prøve** varer 30 minutter i alt.\n\nStudieordningen kalder bedømmelsen en **samlet helhedsvurdering** af de tre dele.",
        noter: [
          ["Aflevering", "Fredag 30. oktober 2026 på WISEflow: dispositionen som pdf og projektet som zip-fil."],
          ["Mundtlig prøve", "Fredag 6. november 2026, 30 minutter."],
          ["Helhedsvurdering", "Et flot projekt, du ikke kan forklare, trækker ned. Et enkelt projekt, du kan forklare til bunds, trækker op."]
        ] },
      { t: "valg", q: "Hvad består prøven i Videregående programmering af?",
        svar: ["Et praktisk produkt, en disposition og en mundtlig prøve, bedømt samlet", "En skriftlig prøve på fire timer", "Et projekt, der bedømmes alene, uden at du siger noget", "En mundtlig prøve, hvor du trækker et spørgsmål"],
        ret: 0, fordi: "Studieordningen kalder det en mundtlig prøve kombineret med et praktisk produkt og en disposition. Karakteren er én samlet helhedsvurdering af alle tre." },
      { t: "laes", h: "De 30 minutter",
        md: "Skolens egen præsentation om eksamen beskriver forløbet sådan:\n\n1. Velkomst. Du hilser på eksaminator (din lærer) og censor.\n2. **Ca. 10 minutter: din præsentation.** Skolen skriver \"Scenen er din\". Du bestemmer, hvad tiden bruges på.\n3. **Ca. 15 minutter: samtale** mellem dig, eksaminator og censor.\n4. Du går udenfor, mens de to voterer.\n5. Du får karakter og en kort begrundelse.\n\nRollerne er også beskrevet. **Eksaminator** skal give dig mulighed for at vise, hvad du har lært, og hjælpe dig over huller. **Censor** skal finde ud af, om der er huller i forhold til det, du forventes at have lært, sikre en fair eksamen og har det endelige ansvar for karakteren.",
        md2: "Begge er der for at finde ud af, hvad du **kan**. Et spørgsmål, du ikke kender svaret på, er ikke en fælde. Det er en mulighed for at vise, hvordan du tænker." },
      { t: "orden", sprog: "text", q: "Sæt de fem dele af den mundtlige prøve i den rækkefølge, de sker.",
        linjer: [R`Velkomst: du hilser på eksaminator og censor`, R`Din præsentation (ca. 10 minutter)`, R`Samtale med eksaminator og censor (ca. 15 minutter)`, R`Du venter udenfor, mens de voterer`, R`Du får karakter og feedback`],
        fordi: "Præsentationen kommer først, og den styrer du helt selv. Samtalen bagefter tager tit udgangspunkt i det, du har vist, og i det, der står i din disposition." },
      { t: "valg", q: "Projekt A er stort og flot, men ejeren kan ikke forklare halvdelen af koden. Projekt B er mindre, men ejeren kan forklare hver fil og pege på linjerne. Hvorfor står B stærkest til eksamen?",
        svar: ["Fordi karakteren er en helhedsvurdering, og samtalen om koden er halvdelen af tiden", "Fordi små projekter altid får en højere karakter", "Fordi censor kun læser dispositionen", "Fordi store projekter ikke må afleveres"],
        ret: 0, fordi: "Produktet, dispositionen og samtalen bedømmes samlet. Kode, du ikke kan forklare, bliver til et hul i samtalen — og det er netop huller, censor leder efter." },
      { t: "valg", q: "Hvad er censors opgave ifølge skolens præsentation?",
        svar: ["At finde ud af, om der er huller i forhold til det, du forventes at have lært, og sikre en fair eksamen", "At trække fra for hver fejl i koden", "At undervise dig i det, du ikke kan", "At bedømme, om hjemmesiden er pæn"],
        ret: 0, fordi: "Censor har også det endelige ansvar for karakteren. Eksaminator, din lærer, skal hjælpe dig med at vise, hvad du kan." },
      { t: "laes", h: "Læringsmålene, og hvor de ses i et projekt",
        md: "Censor måler dig på fagets **læringsmål** fra studieordningen. Kort sagt:\n\n- **Viden:** klassiske datastrukturer og deres egenskaber, abstrakte datatyper, formelle sprogs syntaks og semantik, algoritmer.\n- **Færdigheder:** konstruere objektorienterede programmer, bruge centrale designmønstre, bruge abstrakte datatyper, bruge programbiblioteker, bruge mønstre for softwarearkitektur, herunder frameworks.\n- **Kompetencer:** vælge hensigtsmæssige datastrukturer, arbejde som en kompetent programmør i et projekt, og holde sig ajour med nye sprog og værktøjer.\n\nModulets indhold nævner også: GUI-programmering, regulære udtryk, tilstandsmaskiner, lagdelte arkitekturer, API'er og frameworks.",
        noter: [
          ["Objektorienteret program", "Dine modeller er klasser. Du kan forklare klasse, objekt, konstruktør, indkapsling, arv og interface med din egen kode."],
          ["Designmønstre og arkitektur", "MVC, dependency injection og et servicelag bag et interface er mønstre. Du kan sige, hvorfor koden er delt op sådan."],
          ["Lagdelt arkitektur", "Du kan pege på lagene: browser → controller eller komponent → service → DbContext → database."],
          ["Datastrukturer", "Du bruger `List`, måske `Dictionary`, og kan sige, hvorfor du valgte den ene frem for den anden."],
          ["Biblioteker og frameworks", "ASP.NET Core, Entity Framework Core, LINQ og Bootstrap. Du kan sige, hvad hver af dem gør for dig."],
          ["Algoritmer", "Mindst ét sted er der logik, du selv har tænkt: en beregning, en søgning, en regel. Du kan forklare den trin for trin."],
          ["Regulære udtryk", "En valideringsregel med et mønster, fx på et telefonnummer."],
          ["GUI", "Dine views eller komponenter, formularer og valideringsbeskeder er brugergrænsefladen."]
        ],
        md2: "Højre kolonne i noterne er platformens forslag til, hvor målene kan ses i et projekt. Det er ikke en officiel tjekliste fra skolen." },
      { t: "valg", q: "Hvilken del af et typisk eksamensprojekt viser læringsmålet \"anvende centrale designmønstre\"?",
        svar: ["MVC-opdelingen, dependency injection og et servicelag bag et interface", "At siden bruger Bootstrap-farver", "At databasen hedder noget sigende", "At projektet er afleveret som zip-fil"],
        ret: 0, fordi: "MVC er et arkitekturmønster. Dependency injection og \"en service bag et interface\" er designmønstre. Det er dem, du peger på, når målet kommer op." },
      { t: "valg", q: "Læringsmålene nævner regulære udtryk. Hvad er nok til, at emnet er med i et webprojekt?",
        svar: ["En valideringsregel med et mønster, fx `[RegularExpression]` på et telefonnummer eller postnummer", "At hele projektet er skrevet med regulære udtryk", "Ingenting — regulære udtryk kan ikke bruges i webprojekter", "At du nævner ordet i dispositionen uden at bruge det"],
        ret: 0, fordi: "Én rigtig regel, som du kan forklare tegn for tegn, er nok. At nævne det uden at bruge det er farligt: alt i dispositionen kan du blive spurgt om." },
      { t: "laes", h: "Hvad betyder 12?",
        md: "7-trinsskalaen har en fast ordlyd for hver karakter:\n\n- **12:** den fremragende præstation, der demonstrerer **udtømmende** opfyldelse af fagets mål, med ingen eller få uvæsentlige mangler.\n- **10:** den fortrinlige præstation, der demonstrerer **omfattende** opfyldelse af fagets mål, med nogle mindre væsentlige mangler.\n- **7:** den gode præstation, der demonstrerer opfyldelse af fagets mål, med en del mangler.\n- **4:** den jævne præstation, der demonstrerer en mindre grad af opfyldelse af fagets mål, med adskillige væsentlige mangler.\n- **02:** den tilstrækkelige præstation, der demonstrerer den minimalt acceptable grad af opfyldelse af fagets mål.\n\nOrdet, der adskiller 12, er **udtømmende**: du kommer rundt om alle målene, og der er ingen huller, der betyder noget. Det handler mindre om at bygge noget stort og mere om, at der ikke er noget i projektet eller i målene, du står af på.",
        md2: "Ingen kan love dig en bestemt karakter. Det, du selv styrer, er tre ting: at projektet virker, at du kan forklare hver fil i det, og at du har øvet præsentationen højt mange gange." },
      { t: "valg", q: "Hvilket ord i beskrivelsen af 12 adskiller den fra 10?",
        svar: ["Udtømmende", "Omfattende", "Tilstrækkelig", "Jævn"],
        ret: 0, fordi: "12 er udtømmende opfyldelse af målene med ingen eller få uvæsentlige mangler. 10 er omfattende opfyldelse med nogle mindre væsentlige mangler. Altså: rundt om alle målene, uden huller." },
      { t: "ide", h: "Sæt datoerne fast",
        md: "Gør det i dag, så det er ude af hovedet og på et sted, du kan se:\n\n1. Log ind på **WISEflow**, og find dit fag. Skriv **klokkeslættet** for afleveringen ned. Holdets frist i september var kl. 12 middag, ikke midnat.\n2. Skriv to datoer i din kalender: **fredag 30. oktober** (aflevering) og **fredag 6. november** (mundtlig prøve).\n3. Læg en påmindelse **torsdag 29. oktober**: afleveringen skal være klar dagen før. Fredagen er kun reserve.\n4. Skriv læringsmålene fra trin 7 på ét papir, og hæng det op ved computeren. Det er listen, hele projektet skal kunne svare på.",
        md2: "Du kommer tilbage til læringsmålene i lektion 6 og 7, hvor du træner svarene." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvordan foregår eksamen i Videregående programmering, og hvad bliver du bedømt på?",
        svar: "Jeg afleverer et **produkt**, som er en fullstack webapplikation, og en **disposition** på højst én side plus litteraturliste. Den **mundtlige prøve** varer 30 minutter: ca. 10 minutter, hvor jeg præsenterer, og ca. 15 minutters samtale med eksaminator og censor. Så voterer de, og jeg får én karakter. Den er en **helhedsvurdering** af produktet, dispositionen og det, jeg siger, målt op imod fagets **læringsmål**: objektorientering, designmønstre, datastrukturer, algoritmer, arkitektur og frameworks.",
        noegle: ["produkt", "disposition", "30 minutter", "præsentation", "samtale", "helhedsvurdering", "læringsmål"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m28l2", titel: "Projektet: kravene, skabelonen og de tre niveauer", min: 18,
    ord: [
      ["Fullstack", "Alle tre lag i én applikation: en database, kode på serveren og en brugergrænseflade i browseren."],
      ["Projektskabelon", "Den slags projekt, du starter fra i Visual Studio eller Rider, fx ASP.NET Core MVC eller Blazor Web App."],
      ["WISEflow", "Skolens afleveringssystem. Du logger ind med MitID."],
      ["Servicelag", "Klasser mellem controllerne (eller komponenterne) og databasen, som indeholder programmets logik. Hver service har et interface."],
      ["Egen logik", "Kode, du selv har tænkt: en beregning, en søgning eller en regel, som ikke bare er at gemme og vise data."],
      ["Afgrænsning", "Det, du med vilje har holdt udenfor eller simpelt, og som du siger åbent."]
    ],
    trin: [
      { t: "laes", h: "Opgaven, som den er stillet",
        md: "Sådan står opgaven i skolens projektbeskrivelse:",
        sprog: "text",
        kode: R`Write Disposition and create a product (Full Stack Web App)
using One of following web app templates.

1- Single Page Application with Blazor WASM or Auto
2- Single Page Application with Blazor Server
3- Single Page Application with ASP.NET with Angular (or react/vue)
4- ASP.Net Core MVC (optional: API)

Optional: Add Authentication, CSS, SVG, Bootstraps, JavaScript
and Any Other CSS or JavaScript framework

>> Upload Disposition as pdf file and Product/Project as zipped file`,
        noter: [
          ["Full Stack Web App", "**Fullstack** betyder alle tre lag: en database, kode på serveren og en brugergrænseflade i browseren."],
          ["One of following web app templates", "Du vælger præcis én af de fire skabeloner."],
          ["Optional", "Login, SVG, JavaScript og andre frameworks er **valgfrie**. De giver ikke point i sig selv, hvis du ikke kan forklare dem."],
          ["pdf … zipped file", "Dispositionen som pdf, projektet som zip-fil, begge på WISEflow."]
        ],
        md2: "Fristen i skolens fil er holdets frist i september. Din aflevering er **fredag 30. oktober 2026**." },
      { t: "valg", q: "Hvad betyder \"Full Stack Web App\" i opgaveteksten?",
        svar: ["At der er en database, kode på serveren og en brugergrænseflade i browseren", "At projektet skal bruge alle fire skabeloner", "At der skal være login", "At projektet skal have mindst ti sider"],
        ret: 0, fordi: "Fullstack er de tre lag. Login og de andre ting under \"Optional\" er valgfrie." },
      { t: "laes", h: "Fire skabeloner — vælg den, du kan forklare",
        md: "Du har prøvet alle fire i kurset:\n\n1. **Blazor WebAssembly eller Auto** — modul 24.\n2. **Blazor Server** — modul 22 og 23.\n3. **ASP.NET med Angular** (eller React/Vue) — modul 21.\n4. **ASP.NET Core MVC**, eventuelt med et API — modul 16 til 20.\n\nAlle fire er lige gyldige. Spørgsmålet er ikke, hvilken der er \"bedst\", men hvilken **du** kan bygge og forklare. Brug denne regel: **vælg den skabelon, hvor du lavede værkstedet med færrest tips.**\n\nTo fakta, der kan hjælpe dig: Lærerens eget eksempel på et eksamensprojekt er bygget med MVC. Og med MVC ligger model, view og controller i hver sin mappe, så lagene er nemme at pege på. Blazor samler visning og kode i komponenter, og Blazor Server kan tale direkte med databasen gennem en service, uden et ekstra API.",
        noter: [
          ["Hvornår?", "Platformens forslag: beslut skabelon onsdag 21. oktober, når du har prøvet dem alle."],
          ["Angular", "Kræver to projekter (et Web API og en Angular-app) og et sprog mere (TypeScript). Mest at forklare."]
        ] },
      { t: "valg", q: "Du lavede MVC-værkstedet næsten uden tips. Blazor-værkstedet krævede alle tips og løsningen to gange. Hvad siger reglen fra forrige trin?",
        svar: ["Vælg MVC, fordi det er den skabelon, du kan bygge og forklare", "Vælg Blazor, fordi det er sværest og derfor giver flest point", "Vælg Angular, fordi den ikke er prøvet endnu", "Brug to skabeloner i samme projekt"],
        ret: 0, fordi: "Karakteren handler om, hvor godt du opfylder læringsmålene og kan forklare din kode. En skabelon, du er sikker i, giver mere tid til servicelag, egen logik og træning af samtalen. Havde det været omvendt, var svaret Blazor." },
      { t: "laes", h: "Lærerens eksempel: hvad løfter det",
        md: "Læreren har udleveret et eksempel på et eksamensprojekt: et MVC-site, hvor patienter og læger bestiller tider. Det er værd at se, **hvad** der gør det til mere end \"fire tabeller med knapper\":\n\n- **Modeller** med relationer, og et fælles **interface**, som to af modellerne implementerer.\n- **Et servicelag:** en mappe med en service pr. område og et interface til hver. Controlleren får servicen ind gennem konstruktøren og taler ikke selv med databasen.\n- **Egen logik** i en service: den finder ledige tider.\n- Views med Bootstrap og valideringsbeskeder på dansk.\n- **Ærlig afgrænsning:** der er ingen rigtig login, og dispositionen siger det åbent.",
        md2: "Det er de tre ting, du skal have med: **et interface, et servicelag og et stykke logik, du selv har tænkt.**" },
      { t: "valg", q: "Hvilke tre ting løfter et projekt over \"tabeller med knapper\"?",
        svar: ["Et interface, et servicelag og et stykke egen logik", "Mange sider, mange farver og mange billeder", "Login, et API og JavaScript-animationer", "Lang kode, lange filnavne og mange kommentarer"],
        ret: 0, fordi: "Interface og servicelag viser designmønstre og lagdelt arkitektur. Egen logik viser algoritmer. Login og API er valgfrie udvidelser — de kommer først, når det andet er på plads." },
      { t: "laes", h: "Emnet: det vælger du selv",
        md: "Platformen vælger ikke emne for dig. Den giver dig **kravene til emnet**, så du kan tjekke din egen idé:\n\n- Du kender emnet fra dit eget liv eller arbejde, så emnet ikke også skal læres.\n- Du kan forklare det på **to sætninger**. Censor kender det ikke nødvendigvis.\n- Det har **to eller tre slags ting** med en **en-til-mange-forbindelse** imellem — som `Department` og `Employee` i modul 17.\n- Der er plads til **én regel eller beregning**, du selv tænker: noget, der skal findes, tælles eller regnes ud.\n\nSkriv idéen på **tre linjer**: hvem den er til, hvilket problem den løser, og hvilke tre ting den holder styr på. Tegn så tingene som kasser på papir med streger imellem. Kan det ikke tegnes ud fra de tre linjer, er idéen ikke klar nok endnu." },
      { t: "valg", q: "Hvilken beskrivelse passer bedst til kravene til et emne?",
        svar: ["To–tre slags ting med en en-til-mange-forbindelse, kendt fra mit eget liv, og en regel, jeg kan regne på", "Én stor tabel med 30 kolonner", "Et emne, jeg ikke kender, så jeg også lærer noget nyt om det", "Så mange slags ting som muligt, så projektet ser stort ud"],
        ret: 0, fordi: "Relationer giver dig fremmednøgler, navigation properties, `Include` og dropdowns at forklare. Et kendt emne sparer tid. Og reglen er din egen logik." },
      { t: "laes", h: "Tre niveauer — byg dem i rækkefølge",
        md: "Platformens forslag til, hvordan du bygger: **først det nederste niveau helt færdigt, så det næste.** Aldrig to på én gang.\n\n- **Niveau 1 — det virker:** to eller tre modeller med relationer. Database med code first og migrationer. Sider til at se, oprette, rette og slette. Menuen passer. Validering med `[Required]` og `[StringLength]`. Dropdowns til fremmednøgler.\n- **Niveau 2 — det er arkitektur:** et servicelag med interfaces mellem controllere (eller komponenter) og databasen. Egen logik i en service, skrevet med LINQ. Et regulært udtryk i en valideringsregel. Pæne visningsnavne, datoformat og layout med Bootstrap.\n- **Niveau 3 — udvidelser:** login med roller, et lille Web API, lidt JavaScript eller SVG.",
        md2: "Niveau 2 er der, hvor du rammer flest læringsmål pr. times arbejde: designmønster, lagdelt arkitektur, interface, datastruktur, algoritme og regulært udtryk." },
      { t: "orden", sprog: "text", q: "Sæt arbejdet i den rækkefølge, de tre niveauer siger.",
        linjer: [R`Modeller med relationer og første migration`, R`Sider til at se, oprette, rette og slette`, R`Servicelag med interfaces, registreret i Program.cs`, R`Egen logik i en service, skrevet med LINQ`, R`Login eller et lille Web API`],
        fordi: "Først skal det virke (niveau 1), så skal det have arkitektur (niveau 2), og først til sidst kommer udvidelserne (niveau 3). Et projekt med login, men uden servicelag, rammer færre læringsmål end et uden login, men med servicelag." },
      { t: "valg", q: "Et AI-værktøj har skrevet en metode til dig. Den virker, men du forstår ikke, hvad den gør. Hvad gør du?",
        svar: ["Læser den linje for linje med debuggeren, ændrer noget i den og forklarer den højt — og fjerner den, hvis det ikke lykkes", "Lader den stå, for den virker jo", "Lægger den i en mappe, censor nok ikke åbner", "Skriver den ind i dispositionen som noget særligt"],
        ret: 0, fordi: "Den vigtigste regel: **byg ikke noget ind, du ikke kan forklare.** Det er fint at bruge scaffolding og AI — læreren gør det selv. Men til prøven er det dig, der bliver spurgt \"hvad gør den linje?\"." },
      { t: "ide", h: "Tre linjer og en tegning",
        md: "Har du ikke valgt emne endnu, så gem dette trin til den dag, du gør (platformens forslag: onsdag 21. oktober).\n\n1. Tag et stykke papir. Skriv tre linjer: **hvem** er appen til, **hvilket problem** løser den, og **hvilke tre ting** holder den styr på.\n2. Tegn hver ting som en kasse. Skriv properties ind i kassen.\n3. Tegn en streg mellem to kasser, der hører sammen. Skriv **1** ved den ene ende og **mange** ved den anden.\n4. Skriv under tegningen: hvilken **regel eller beregning** skal appen kunne? Den bliver din egen logik i en service.\n5. Tjek mod kravene i trin 7: kendt emne, to sætninger, en-til-mange, én regel.",
        md2: "Papiret er din plan. Det bliver også grundlaget for afsnittet \"Modeller og deres sammenhæng\" i dispositionen (lektion 4)." },
      { t: "forklar", q: "Censor spørger: Hvad betyder fullstack, og hvor er de tre lag i dit projekt?",
        svar: "Fullstack betyder, at applikationen har alle tre lag. **Databasen** er SQL Server LocalDB (eller SQLite på Mac), og tabellerne er lavet med EF Core-migrationer ud fra mine modelklasser. **Serveren** er ASP.NET Core: controllere eller komponenter, et servicelag og min DbContext. **Klienten** er det, browseren viser: HTML lavet af Razor, Bootstrap til layout og valideringsbeskeder i formularerne. Når brugeren klikker, går forespørgslen fra browseren til serveren, som henter data fra databasen og sender en side tilbage.",
        noegle: ["database", "server", "browser", "migrationer", "Razor", "servicelag"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m28l3", titel: "Arkitekturen i et 12-tals-projekt", min: 20,
    ord: [
      ["Lagdelt arkitektur", "Koden er delt i lag, der hver har én opgave: visning, logik og data. Hvert lag taler kun med laget lige under."],
      ["Interface", "En kontrakt: en liste af metoder, som en klasse lover at have. Ingen kode i selve interfacet."],
      ["Dependency injection", "Et objekt får de objekter, det har brug for, ind udefra — typisk gennem konstruktøren — i stedet for selv at lave dem med new."],
      ["Tynd controller", "En controller, der kun tager imod forespørgslen, kalder en service og vælger et view. Logikken ligger i servicen."],
      ["readonly", "Et felt, der kun kan sættes i konstruktøren. Bagefter kan det ikke ændres."],
      ["Registrering", "Linjen i Program.cs, der fortæller ASP.NET Core, hvilken klasse der skal bruges, når nogen beder om et interface."]
    ],
    trin: [
      { t: "laes", h: "Lagene, og hvorfor de findes",
        md: "Et projekt til 12 er delt i lag. Hvert lag har **én opgave**:\n\n1. **Browseren** viser siden og sender det, brugeren gør.\n2. **Controller** (MVC) eller **komponent** (Blazor) tager imod og vælger, hvad der skal ske. Den skal være **tynd**.\n3. **Service** indeholder logikken: regler, beregninger og LINQ-forespørgsler. Den ligger bag et **interface**.\n4. **DbContext** oversætter mellem objekter og tabeller (EF Core).\n5. **Databasen** gemmer dataene.\n\nHvorfor? Fordi hver ting så kun står ét sted. Skal en regel ændres, retter du servicen — ikke fem controllere. Og når censor spørger \"hvor ligger logikken?\", kan du pege på én fil.",
        noter: [
          ["Uden servicelag", "Controlleren taler direkte med DbContext. Det virker, og det er det, scaffolding laver. Men logikken bliver spredt ud over controllerne, og du kan ikke skifte datakilden ud."],
          ["Med servicelag", "Controlleren kender kun interfacet. Hvordan dataene hentes, er servicens sag."]
        ] },
      { t: "orden", sprog: "text", q: "Brugeren åbner listen over medarbejdere i FirmaApp (eksemplet fra modul 17). Sæt trinnene i den rækkefølge, de sker, i et MVC-projekt med servicelag.",
        linjer: [R`Browseren sender GET /Employees`, R`Routing vælger EmployeesController og action-metoden Index`, R`Index kalder _service.HentAlleAsync()`, R`Servicen spørger DbContext med LINQ`, R`EF Core sender SQL til databasen og laver rækkerne om til objekter`, R`Index sender listen til viewet`, R`Viewet laver HTML, og browseren viser siden`],
        fordi: "Det er den vej, du skal kunne fortælle ved eksamen — og vise i koden fil for fil. I Blazor Server er det næsten det samme: komponentens `OnInitializedAsync` kalder servicen, og komponenten tegner selv listen." },
      { t: "laes", h: "Service bag et interface — i en konsol",
        md: "Mønstret kan afprøves uden database. Her er en **konsol-udgave**: interfacet er kontrakten, servicen er én måde at opfylde den på, og \"controlleren\" får servicen ind gennem konstruktøren. I et rigtigt projekt er det ASP.NET Core, der kalder konstruktøren for dig.",
        kode: R`IEmployeeService service = new ListEmployeeService();
EmployeesController controller = new EmployeesController(service);
controller.Index();

interface IEmployeeService
{
    List<string> HentNavne();
    void Tilfoej(string navn);
}

class ListEmployeeService : IEmployeeService
{
    private List<string> _navne = new List<string> { "Bo", "Anna" };

    public List<string> HentNavne()
    {
        return _navne.OrderBy(n => n).ToList();
    }

    public void Tilfoej(string navn)
    {
        _navne.Add(navn);
    }
}

class EmployeesController
{
    private readonly IEmployeeService _service;

    public EmployeesController(IEmployeeService service)
    {
        _service = service;
    }

    public void Index()
    {
        foreach (string navn in _service.HentNavne())
        {
            Console.WriteLine(navn);
        }
    }
}`,
        noter: [
          ["interface IEmployeeService", "Kontrakten: \"jeg kan give dig navnene, og jeg kan tilføje et\". Ingen kode."],
          ["class ListEmployeeService : IEmployeeService", "Én måde at opfylde kontrakten på: med en liste. Senere kan en anden klasse opfylde den med EF Core."],
          ["private readonly IEmployeeService _service;", "Controlleren gemmer **interfacet**, ikke den konkrete klasse. `readonly`: kan kun sættes i konstruktøren."],
          ["public EmployeesController(IEmployeeService service)", "**Dependency injection:** controlleren laver ikke selv servicen med `new`. Den får den ind udefra."],
          ["_navne.OrderBy(n => n).ToList()", "Logikken (sortering) ligger i servicen, ikke i controlleren."]
        ],
        output: "Anna\nBo" },
      { t: "forudsig",
        q: "Samme klasser som i forrige trin (`IEmployeeService`, `ListEmployeeService` med \"Bo\" og \"Anna\", og `EmployeesController`). Hvad skriver programmet?",
        kode: R`IEmployeeService service = new ListEmployeeService();
EmployeesController controller = new EmployeesController(service);
service.Tilfoej("Cy");
service.Tilfoej("Al");
controller.Index();

interface IEmployeeService
{
    List<string> HentNavne();
    void Tilfoej(string navn);
}

class ListEmployeeService : IEmployeeService
{
    private List<string> _navne = new List<string> { "Bo", "Anna" };

    public List<string> HentNavne()
    {
        return _navne.OrderBy(n => n).ToList();
    }

    public void Tilfoej(string navn)
    {
        _navne.Add(navn);
    }
}

class EmployeesController
{
    private readonly IEmployeeService _service;

    public EmployeesController(IEmployeeService service)
    {
        _service = service;
    }

    public void Index()
    {
        foreach (string navn in _service.HentNavne())
        {
            Console.WriteLine(navn);
        }
    }
}`,
        output: "Al\nAnna\nBo\nCy",
        fordi: "`service` og controllerens `_service` peger på **det samme objekt** (en klasse er en referencetype). Derfor ser controlleren de to nye navne. `OrderBy` sorterer alfabetisk: \"Al\" kommer før \"Anna\", fordi l kommer før n." },
      { t: "spor", h: "Spor: kald gennem interfacet",
        q: "Følg variablerne. Skriv `antal` og `sidste` efter hver linje fra 1 til 5. Servicen starter med \"Bo\" og \"Anna\", og `HentNavne()` giver navnene sorteret.",
        kode: R`IEmployeeService service = new ListEmployeeService();
int antal = service.HentNavne().Count;
service.Tilfoej("Cy");
antal = service.HentNavne().Count;
string sidste = service.HentNavne()[antal - 1];
Console.WriteLine($"{antal} {sidste}");

interface IEmployeeService
{
    List<string> HentNavne();
    void Tilfoej(string navn);
}

class ListEmployeeService : IEmployeeService
{
    private List<string> _navne = new List<string> { "Bo", "Anna" };

    public List<string> HentNavne()
    {
        return _navne.OrderBy(n => n).ToList();
    }

    public void Tilfoej(string navn)
    {
        _navne.Add(navn);
    }
}`,
        kolonner: ["antal", "sidste"],
        raekker: [[1, "=–", "=–"], [2, "=2", "=–"], [3, "2", "–"], [4, "3", "–"], [5, "3", "Cy"]],
        slut: false,
        output: "3 Cy",
        fordi: "Linje 3 ændrer listen inde i servicen, men ikke variablen `antal`. Den bliver først 3, når linje 4 spørger igen. På linje 5 er listen sorteret Anna, Bo, Cy, så plads 2 (`antal - 1`) er \"Cy\". Variablerne udenfor ændrer sig kun, når du selv tildeler dem." },
      { t: "laes", h: "Registreringen i Program.cs",
        md: "I et rigtigt projekt skriver du aldrig `new EmployeesController(...)`. ASP.NET Core laver controlleren for hver forespørgsel. Derfor skal du **registrere**, hvilken klasse der hører til interfacet. Det er én linje i `Program.cs`:",
        kode: R`// Program.cs
builder.Services.AddDbContext<FirmaContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("FirmaContext")));
builder.Services.AddScoped<IEmployeeService, EmployeeService>();

// Controllers/EmployeesController.cs
public class EmployeesController : Controller
{
    private readonly IEmployeeService _service;

    public EmployeesController(IEmployeeService service)
    {
        _service = service;
    }

    public async Task<IActionResult> Index()
    {
        return View(await _service.HentAlleAsync());
    }
}

// Blazor-komponent: samme service, hentet med @inject
// @inject IEmployeeService Service`,
        frag: true,
        noter: [
          ["AddScoped<IEmployeeService, EmployeeService>()", "\"Når nogen beder om et `IEmployeeService`, så giv dem et nyt `EmployeeService` — ét pr. forespørgsel.\" Scoped, fordi servicen bruger DbContext, som også er scoped (modul 19)."],
          ["public EmployeesController(IEmployeeService service)", "ASP.NET Core ser parameteren, slår interfacet op i registreringerne og sender et objekt ind. Det er dependency injection."],
          ["return View(await _service.HentAlleAsync());", "En tynd action: ét kald til servicen, ét view."],
          ["@inject IEmployeeService Service", "I Blazor beder komponenten om servicen med `@inject` i stedet for en konstruktør (modul 23)."]
        ] },
      { t: "udfyld", q: "Udfyld de tre huller, så klassen opfylder interfacet, og controlleren får servicen ind udefra.",
        kode: R`IEmployeeService service = new ListEmployeeService();
EmployeesController controller = new EmployeesController(service);
controller.Index();

interface IEmployeeService
{
    List<string> HentNavne();
}

class ListEmployeeService [[:]] IEmployeeService
{
    public List<string> HentNavne()
    {
        return new List<string> { "Anna", "Bo" };
    }
}

class EmployeesController
{
    private readonly IEmployeeService _service;

    public EmployeesController([[IEmployeeService]] service)
    {
        [[_service|this._service]] = service;
    }

    public void Index()
    {
        Console.WriteLine(_service.HentNavne().Count);
    }
}`,
        output: "2",
        fordi: "Kolonet betyder \"opfylder\" (implementerer) interfacet. Konstruktøren beder om **interfacet**, ikke om den konkrete klasse — så kan man give den en anden service uden at ændre controlleren. Til sidst gemmes servicen i feltet, så `Index` kan bruge den." },
      { t: "fejl", q: "Programmet kan ikke oversættes. Compileren siger `'ListEmployeeService' does not implement interface member 'IEmployeeService.Tilfoej(string)'`. Hvilken linje peger fejlen på?",
        kode: R`IEmployeeService service = new ListEmployeeService();
Console.WriteLine(service.HentNavne().Count);

interface IEmployeeService
{
    List<string> HentNavne();
    void Tilfoej(string navn);
}

class ListEmployeeService : IEmployeeService
{
    public List<string> HentNavne()
    {
        return new List<string> { "Anna", "Bo" };
    }
}`,
        linje: 10,
        fordi: "Klassen lover på linje 10, at den opfylder `IEmployeeService`. Men kontrakten kræver også `Tilfoej`, og den mangler. Et interface er et løfte, som compileren holder dig fast på. Ret det ved at skrive metoden i klassen.",
        rettet: R`IEmployeeService service = new ListEmployeeService();
Console.WriteLine(service.HentNavne().Count);

interface IEmployeeService
{
    List<string> HentNavne();
    void Tilfoej(string navn);
}

class ListEmployeeService : IEmployeeService
{
    private List<string> _navne = new List<string> { "Anna", "Bo" };

    public List<string> HentNavne()
    {
        return _navne;
    }

    public void Tilfoej(string navn)
    {
        _navne.Add(navn);
    }
}`,
        output: "2" },
      { t: "valg", q: "Hvorfor står der et interface foran servicen, når der kun er én klasse, der implementerer det?",
        svar: ["Controlleren afhænger kun af kontrakten. Så kan servicen skiftes ud (fx en test-udgave med en liste) uden at ændre controlleren", "Fordi ASP.NET Core ikke kan bruge klasser uden et interface", "Fordi interfaces gør programmet hurtigere", "Fordi det er et krav i opgaveteksten"],
        ret: 0, fordi: "Det er **løs kobling** — D'et i SOLID: afhæng af abstraktioner, ikke af konkrete klasser. Det var præcis det, du så i modul 19: controlleren skulle ikke ændres, da dataene flyttede fra en liste til en database." },
      { t: "laes", h: "Tjeklisten — med grunden til hvert punkt",
        md: "Dette er platformens tjekliste for et projekt, der rører ved alle læringsmålene. Grunden står i noterne.",
        noter: [
          ["Modeller med relationer", "Objektorientering og datastrukturer: klasser, properties, `List<T>` som navigation property, fremmednøgle."],
          ["Valideringsattributter i modellerne", "GUI og sikkerhed: `[Required]`, `[StringLength]`, `[Range]` — og ét `[RegularExpression]`, så regulære udtryk er med."],
          ["DbContext og migrationer", "Frameworks og biblioteker: EF Core som ORM. Du kan forklare, hvordan en klasse bliver til en tabel."],
          ["Services bag interfaces, registreret i Program.cs", "Designmønstre, lagdelt arkitektur og dependency injection i én bevægelse."],
          ["Tynde controllere eller komponenter", "MVC-mønstret holdt rent: de tager imod og viser, servicen tænker."],
          ["Egen logik i en service", "Algoritmer: en beregning, søgning eller regel, du kan forklare trin for trin — skrevet med LINQ eller en løkke."],
          ["Fejlhåndtering", "Et id, der ikke findes, giver `NotFound()` og ikke et nedbrud. Ugyldig input giver en besked, ikke en exception."],
          ["Layout og menu med Bootstrap", "GUI: brugeren kan finde rundt. Pæne visningsnavne med `[Display]` og datoformat."],
          ["Login (valgfrit)", "Kun hvis alt ovenfor er færdigt. Kan du forklare `[Authorize]` og forskellen på authentication og authorization?"]
        ] },
      { t: "skriv", q: "Skriv et interface, der hedder `IDepartmentService`, med to metoder: `List<string> HentNavne();` og `int Antal();`. Kun interfacet — ingen klasse.",
        omkring: ["", "class __Start { static void Main() { } }"],
        tjek: [
          ["interface IDepartmentService", "Begynd med `interface IDepartmentService`"],
          ["List<string> HentNavne();", "Metoden `List<string> HentNavne();` — kun hovedet, afsluttet med semikolon"],
          ["int Antal();", "Metoden `int Antal();`"],
          ["class IDepartmentService", "Det skal være et `interface`, ikke en `class`", "ikke"],
          [/HentNavne\(\)\{/, "Et interface har ingen krop med `{ }` på metoderne her — kun hovedet og `;`", "ikke"]
        ],
        forkert: ["class IDepartmentService { List<string> HentNavne(); int Antal(); }", "interface IDepartmentService { List<string> HentNavne() { return new List<string>(); } int Antal(); }"],
        loesning: R`interface IDepartmentService
{
    List<string> HentNavne();
    int Antal();
}`,
        fordi: "Et interface er kun kontrakten: metodernes hoveder. Klassen, der implementerer det, skriver koden." },
      { t: "valg", q: "En controller-action er blevet 40 linjer lang: den henter data, filtrerer med LINQ, regner en rabat ud og vælger et view. Hvad er det bedste at gøre før eksamen?",
        svar: ["Flytte filtreringen og beregningen ind i en metode i servicen, så actionen kun kalder servicen og vælger view", "Lade den stå — så ligger alt ét sted", "Flytte koden ind i viewet", "Dele actionen op i fire actions"],
        ret: 0, fordi: "En tynd controller er nemmere at forklare, og beregningen bliver din **egen logik** i servicen — det sted, du peger på, når censor spørger om algoritmer." },
      { t: "forklar", q: "Eksamensspørgsmål: Forklar lagdelt arkitektur og dependency injection med dit eget projekt som eksempel.",
        svar: "Mit projekt er delt i **lag**: controllerne (eller komponenterne) tager imod brugerens forespørgsel, **servicelaget** indeholder logikken, og **DbContext** taler med databasen gennem EF Core. Hvert lag taler kun med laget under, så en regel kun står ét sted. Controlleren kender kun **interfacet**, fx `IEmployeeService`. I `Program.cs` står `AddScoped<IEmployeeService, EmployeeService>()`, så ASP.NET Core laver servicen og sender den ind gennem controllerens **konstruktør**. Det er **dependency injection**. Fordelen er **løs kobling**: jeg kan skifte servicen ud, fx med en test-udgave, uden at ændre controlleren.",
        noegle: ["lag", "servicelag", "DbContext", "interface", "AddScoped", "konstruktør", "løs kobling"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m28l4", titel: "Dispositionen: én side, der styrer samtalen", min: 15,
    ord: [
      ["Normalside", "En standardside på 2400 tegn inklusive mellemrum."],
      ["Stikord", "Korte punkter i stedet for hele sætninger."],
      ["Litteraturliste", "Listen over de kilder, du faktisk har brugt: dokumentation, bøger, sider — med titel og link."],
      ["Teoretisk grundlag", "De begreber og teknologier, produktet bygger på: mønstre, frameworks, datastrukturer."],
      ["Afgrænsning", "Det, du med vilje har holdt udenfor eller simpelt, sagt åbent."]
    ],
    trin: [
      { t: "laes", h: "Reglerne for dispositionen",
        md: "Studieordningen siger tre ting om dispositionen:\n\n1. Den fylder **højst én normalside** og har desuden en **litteraturliste** vedhæftet.\n2. Den angiver i **stikordsform** det **teoretiske grundlag** for det praktiske produkt.\n3. Den danner sammen med produktet **grundlag for den mundtlige eksamination**.\n\nDu afleverer den som **pdf** på WISEflow sammen med zip-filen.",
        noter: [
          ["Én normalside", "2400 tegn med mellemrum. Litteraturlisten tæller ikke med."],
          ["Teoretisk grundlag", "Ikke en brugsanvisning. Det er de mønstre, teknologier og begreber, produktet bygger på."]
        ] },
      { t: "valg", q: "Hvor lang må dispositionen være?",
        svar: ["Højst én normalside plus en litteraturliste", "Fem sider", "Så lang, som der er brug for", "Præcis ti linjer"],
        ret: 0, fordi: "Det står i studieordningens beskrivelse af prøveformen. Én side tvinger dig til at vælge det vigtigste." },
      { t: "laes", h: "Dispositionen styrer samtalen",
        md: "Den tredje regel er den vigtige. Dispositionen er det papir, eksaminator og censor har foran sig, når de vælger spørgsmål. **Alt, der står på den, kan du blive spurgt om.**\n\nDet er en fordel: du bestemmer selv, hvad samtalen kommer til at handle om, ved at skrive de ting, du er stærkest i.\n\nDet er også en fare: står der \"dependency injection\", bliver du spurgt om dependency injection. Skriv **aldrig** et fagord, du ikke kan forklare og vise i din kode." },
      { t: "valg", q: "Du har læst om \"microservices\" og synes, det lyder flot. Dit projekt bruger det ikke, og du kan ikke forklare det. Skal det stå i dispositionen?",
        svar: ["Nej. Alt i dispositionen kan du blive spurgt om, så det vil blive til et hul i samtalen", "Ja, flotte ord giver point", "Ja, men kun i litteraturlisten", "Ja, hvis det står med småt"],
        ret: 0, fordi: "Dispositionen er grundlaget for samtalen. Et ord, du ikke kan forklare, inviterer censor direkte hen til et hul." },
      { t: "laes", h: "Skolens tre dele",
        md: "Skolens fil med inspiration til dispositionen foreslår tre dele:\n\n1. **Indledning:** hvorfor dette projekt? Hvem er det til? Hvilket problem løser det? Forklar emnet kort, for censor kender det ikke nødvendigvis.\n2. **Forklaring af teknologi:** hvilke teknologier er brugt, og hvad har du ellers brugt, som er spændende? Filen nævner selv indkapsling og services som eksempler.\n3. **Gennemgang af mulighederne i applikationen:** hvad kan man? Hvilke sider er der, og hvad er de til? Og dine modeller: hvordan hænger de sammen?\n\nLærerens eksempel-disposition fylder én side: idéen og teknologien i to sætninger, MVC-mønstret som teoretisk basis, en linje pr. model, servicelaget og logikken i det, hvad man kan på siderne, hvad der er holdt simpelt med vilje — og to kilder med links nederst." },
      { t: "orden", sprog: "text", q: "Sæt overskrifterne i platformens skabelon i rækkefølge. Den følger skolens tre dele og slutter med afgrænsning og kilder.",
        linjer: [R`Indledning: hvad, til hvem, hvilket problem`, R`Teknologi og teori`, R`Modeller og deres sammenhæng`, R`Hvad man kan i applikationen`, R`Afgrænsning og næste skridt`, R`Kilder`],
        fordi: "Først hvad og hvorfor, så teknologien, så modellerne og funktionerne. Afgrænsningen viser, at du ved, hvad du har valgt fra. Kilderne er litteraturlisten." },
      { t: "laes", h: "En skabelon, du kan fylde ud",
        md: "Platformens forslag. Skriv din egen tekst i stedet for parenteserne, og hold det på én side.",
        sprog: "text",
        kode: R`Disposition – (projektets navn)

Indledning
- Hvad: (én sætning om, hvad applikationen er)
- Til hvem: (hvem bruger den)
- Problemet: (hvad bliver nemmere)

Teknologi og teori
- (din skabelon, fx ASP.NET Core MVC eller Blazor Server) og hvorfor
- Entity Framework Core, code first, migrationer, SQL Server LocalDB
- Servicelag bag interfaces, givet videre med dependency injection
- (det, du ellers har brugt og kan forklare: LINQ, validering,
  regulært udtryk, Bootstrap ...)

Modeller og deres sammenhæng
- (Model 1): (hvad den holder styr på)
- (Model 2): (hvad den holder styr på) – hører til én (Model 1)

Hvad man kan
- (side eller funktion): (hvad den er til)
- (din egen logik): (hvad den finder eller regner ud)

Afgrænsning og næste skridt
- (hvad du har holdt simpelt med vilje, og hvad du ville lave med mere tid)

Kilder
- (dokumentation, bøger og sider, du faktisk har brugt, med link)`,
        md2: "Studieordningen siger stikordsform. Korte punkter under overskrifter opfylder det. Er du i tvivl om, hvad skolen forventer, så spørg din lærer." },
      { t: "fejl", sprog: "text",
        q: "Her er et udkast til en disposition for FirmaApp fra modul 17. Projektet bruger MVC, EF Core, et servicelag med interfaces, LINQ og et regulært udtryk — intet andet. Én linje vil give et hul i samtalen. Klik på den.",
        kode: R`Teknologi og teori
- ASP.NET Core MVC: model, view og controller hver for sig
- Entity Framework Core, code first, migrationer
- Servicelag bag interfaces, givet til controllerne med dependency injection
- Microservices og cloud-skalering med Kubernetes
- Validering med [Required] og et regulært udtryk på telefonnummeret
- LINQ i EmployeeService til at finde afdelingernes antal ansatte`,
        linje: 5,
        fordi: "Projektet bruger hverken microservices eller Kubernetes. Står det i dispositionen, kan censor spørge ind til det, og så er der intet at vise. Alle de andre linjer peger på noget, der findes i koden." },
      { t: "valg", q: "Hvad hører hjemme i litteraturlisten?",
        svar: ["De kilder, du faktisk har brugt, med titel og link — fx Microsoft Learn-siderne om ASP.NET Core og EF Core", "Alle bøger om C#, der findes", "Ingenting — dispositionen må ikke have kilder", "Navnene på dine klassekammerater"],
        ret: 0, fordi: "Kilder, du ikke har brugt, kan du ikke svare på spørgsmål om. Skriv kun det, du faktisk har læst og brugt." },
      { t: "valg", q: "Hvornår er det bedst at skrive første udkast til dispositionen?",
        svar: ["Samme dag, som du vælger emne — før du skriver kode — og så rette den til undervejs", "Aftenen før afleveringen", "Efter eksamen", "Aldrig; lærerens eksempel kan afleveres"],
        ret: 0, fordi: "Det første udkast er din plan. Undervejs retter du den, så den til sidst beskriver præcis det, du har bygget — hverken mere eller mindre." },
      { t: "ide", h: "Første udkast",
        md: "Gør det den dag, du har valgt emne og skabelon:\n\n1. Åbn et tomt dokument i Word (eller et andet program, der kan gemme som pdf).\n2. Skriv de seks overskrifter fra skabelonen i trin 7.\n3. Fyld indledningen ud med dine tre linjer fra lektion 2.\n4. Fyld \"Modeller og deres sammenhæng\" ud ud fra din tegning af kasserne.\n5. Skriv kun de teknologier, du **allerede** kan forklare. Resten tilføjer du, når du har bygget og forstået det.\n6. Sæt en streg under hvert fagord. Kan du ikke sige, hvad det betyder, og hvor det er i koden, så lær det eller slet det.",
        md2: "Gem dokumentet. Du retter i det mange gange, og til sidst gemmer du det som pdf. Værkstedet sidst i modulet hjælper dig med første udkast." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er dispositionen til, og hvordan kan du bruge den til at styre samtalen?",
        svar: "Dispositionen er højst **én normalside** plus en **litteraturliste**, og den angiver i **stikord** det **teoretiske grundlag** for mit produkt: indledning, teknologi og teori, modellerne og deres sammenhæng, hvad man kan, og afgrænsningen. Den er **grundlaget for samtalen**: eksaminator og censor vælger spørgsmål ud fra den. Derfor skriver jeg de begreber, jeg er stærkest i og kan vise i koden, og jeg skriver intet, jeg ikke kan forklare.",
        noegle: ["én normalside", "litteraturliste", "stikord", "teoretisk grundlag", "grundlag for samtalen"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m28l5", titel: "Præsentationen: ti minutter, du har øvet", min: 18,
    ord: [
      ["Oplæg", "Dine ca. 10 minutter i starten af prøven, hvor du selv bestemmer indholdet."],
      ["Demo", "Når du viser applikationen køre og klikker dig gennem en handling."],
      ["Rød tråd", "Én handling, du følger hele vejen: fra klik i browseren til data i databasen og tilbage."],
      ["Stikordspapir", "Ét papir med overskrifter og stikord til oplægget — ingen hele sætninger."],
      ["Generalprøve", "En prøve på hele eksamen i ét stræk, med ur, før den rigtige."]
    ],
    trin: [
      { t: "laes", h: "Skolens forslag til de ti minutter",
        md: "Skolens præsentation om eksamen foreslår, at oplægget indeholder:\n\n- et **overblik** med overskrifter,\n- **hvad opgaven handler om**,\n- **hvad du ville have ændret**, og hvad du er blevet klogere på,\n- **hvad du har gjort**,\n- **udvidelser** inden for studieordningens rammer,\n- og en **afrunding**.\n\nSkolen skriver også, at fokus er at **disponere tiden**. Ti minutter er kort. Uden en plan bruger man otte af dem på forsiden." },
      { t: "laes", h: "En plan med minutter",
        md: "Her er platformens forslag til en plan, bygget over skolens punkter. Tiden står i minutter fra start.",
        sprog: "text",
        kode: R`0–1   Overblik: hvad appen er, til hvem, og hvad jeg vil vise
1–4   Demo: én rød tråd gennem appen, med data der allerede ligger der
4–8   Koden: den samme handling fra klik til database
        model -> controller/komponent -> service -> DbContext
        + min egen logik + én valideringsregel
8–9   Hvad jeg er blevet klogere på, og hvad jeg ville ændre
9–10  Udvidelser jeg kunne lave, og afrunding`,
        noter: [
          ["Demo før kode", "Når de har set handlingen virke, er det nemt at følge den i koden."],
          ["Den samme handling", "Du viser ikke alle filer. Du følger én tråd, så ser de alle lagene."],
          ["Hvad jeg ville ændre", "Skolen beder selv om det. Det viser, at du kan vurdere dit eget arbejde."]
        ] },
      { t: "orden", sprog: "text", q: "Sæt de fem dele af planen i rækkefølge.",
        linjer: [R`Overblik: hvad appen er, og hvad jeg vil vise`, R`Demo: én rød tråd gennem appen`, R`Koden: den samme handling fra klik til database`, R`Hvad jeg er blevet klogere på, og hvad jeg ville ændre`, R`Udvidelser og afrunding`],
        fordi: "Overblik først, så de ved, hvad der kommer. Demo før kode, så koden har noget at hænge på. Refleksion og udvidelser til sidst." },
      { t: "spor", h: "Spor: hvor langt er du nået?",
        q: "Programmet lægger minutterne fra planen sammen. Skriv `brugt` og `tilbage` efter hver linje.",
        kode: R`int brugt = 0;
brugt += 1;
brugt += 3;
brugt += 4;
brugt += 1;
brugt += 1;
int tilbage = 10 - brugt;`,
        kolonner: ["brugt", "tilbage"],
        raekker: [[1, "=0", "=–"], [2, "=1", "=–"], [3, "4", "–"], [4, "8", "–"], [5, "9", "–"], [6, "10", "–"], [7, "10", "0"]],
        fordi: "Efter demoen (linje 3) er der gået 4 minutter, og efter koden (linje 4) 8. Det er værd at vide på uret: står der 6 minutter, og du er stadig i demoen, skal du videre nu." },
      { t: "valg", q: "Hvilken demo er bedst?",
        svar: ["Én sammenhængende handling med data, der allerede ligger i databasen — fx opret én ting, og se den på listen", "Klik på hver eneste side i appen, én ad gangen", "Opret ti ting fra bunden, så de kan se, at det virker", "Ingen demo — kun kode"],
        ret: 0, fordi: "Én rød tråd tager få minutter og giver dig noget at følge i koden bagefter. Startdata (fx med `HasData`) gør, at listerne ikke er tomme, når du starter." },
      { t: "laes", h: "Hvad du viser i koden",
        md: "Du har ca. fire minutter til koden. Brug dem på **den samme handling** som i demoen, lag for lag:\n\n1. **Modellen** — klassen, dens properties og valideringsattributter.\n2. **Controlleren eller komponenten** — den action eller metode, der blev kaldt. Den er tynd.\n3. **Servicen** — interfacet og metoden, og din **egen logik** med LINQ.\n4. **Program.cs** — linjen, der registrerer servicen (dependency injection).\n5. Én **valideringsregel**, gerne den med det regulære udtryk.\n\nÅbn filerne i faner i den rækkefølge, før prøven begynder. Gør skriften i editoren stor nok til, at den kan læses fra den anden side af bordet." },
      { t: "valg", q: "Du har lige vist, at man kan oprette en medarbejder. Hvilken kode viser du så?",
        svar: ["Den vej, \"Opret\" gik: modellen, POST-actionen (eller komponentens metode), servicens metode og registreringen i Program.cs", "Filen `site.css`", "Alle migrationerne, én ad gangen", "Den kode, der er sværest, selv om den ikke har med demoen at gøre"],
        ret: 0, fordi: "Den røde tråd: de har set handlingen, nu ser de, hvordan den virker indefra. Så dækker du MVC, lagene, dependency injection og validering på fire minutter." },
      { t: "laes", h: "Når noget går galt under demoen",
        md: "Det sker. Sådan gør du det til en styrke:\n\n- **Før prøven:** kør appen én gang i lokalet. Tjek, at databasen har startdata. Luk alt andet.\n- **Hvis siden fejler:** læs fejlbeskeden højt, og sig, hvad den betyder. Du er god til at fejlfinde — vis det. \"Den siger, at feltet er null. Jeg sætter et breakpoint i actionen og ser, hvad der kommer ind.\"\n- **Hvis det tager for lang tid:** sig, hvad du ville gøre, og gå videre til koden. Tiden er din.\n- **Hav en reserve:** et par skærmbilleder af de vigtigste sider i en mappe på skrivebordet." },
      { t: "valg", q: "Midt i demoen viser siden en fejl. Hvad gør du?",
        svar: ["Læser fejlbeskeden højt, forklarer, hvad den betyder, og hvordan du ville finde årsagen — og går videre, hvis det tager tid", "Lukker browseren og håber, de ikke så det", "Starter forfra med hele præsentationen", "Siger, at det virkede derhjemme, og stopper"],
        ret: 0, fordi: "Censor leder efter, hvad du kan. At læse og forklare en fejlbesked er præcis det, en kompetent programmør gør. Det tæller med." },
      { t: "valg", q: "Skolen beder dig fortælle, hvad du ville have ændret. Hvilket svar er stærkest?",
        svar: ["\"Jeg ville flytte beregningen i OrdersController ind i servicen, fordi controlleren nu har logik, der hører til i servicelaget.\"", "\"Ingenting, det er perfekt.\"", "\"Alt. Jeg ville starte forfra.\"", "\"Jeg ville bruge et andet sprog.\""],
        ret: 0, fordi: "Et konkret punkt med en grund viser, at du forstår arkitekturen og kan vurdere dit eget arbejde. Det er en kompetence i læringsmålene." },
      { t: "ide", h: "Hold oplægget med ur",
        md: "Gør det, når projektet virker:\n\n1. Skriv de fem overskrifter fra planen på ét papir, med tre-fire stikord under hver. Ingen hele sætninger.\n2. Åbn projektet, kør det, og læg filerne til kodedelen i faner i den rigtige rækkefølge.\n3. Start et stopur på telefonen, og hold hele oplægget **højt**, som om de sad der.\n4. Optag det gerne. Se optagelsen, og skriv ned, hvor du brugte for lang tid.\n5. Gør det **tre gange** på forskellige dage. Stikordene må gerne ændre sig; det er forståelsen, der skal sidde, ikke ordene.",
        md2: "Rammer du ikke ti minutter, så skær i demoen, ikke i koden." },
      { t: "forklar", q: "Eksamensspørgsmål: Vis og forklar, hvad der sker, fra brugeren klikker \"Gem\" i en formular, til dataene ligger i databasen.",
        svar: "Formularen sender en **POST** med felternes værdier og et **anti-forgery-token**. **Routing** vælger POST-actionen i controlleren. **Model binding** laver værdierne om til et objekt af min modelklasse, og valideringsattributterne bliver tjekket: er `ModelState.IsValid` falsk, sendes formularen tilbage med fejlbeskeder. Er den gyldig, kalder actionen **servicen**, som tilføjer objektet til **DbContext** og kalder `SaveChangesAsync`. **EF Core** laver det om til en `INSERT` i databasen. Til sidst laver actionen en `RedirectToAction` til listen, så en genindlæsning ikke sender formularen igen. I Blazor er det `EditForm` og `OnValidSubmit`, der kalder servicen.",
        noegle: ["POST", "routing", "model binding", "ModelState.IsValid", "service", "SaveChangesAsync", "INSERT", "RedirectToAction"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m28l6", titel: "Eksamensspørgsmål 1: objekter, datastrukturer og algoritmer", min: 22,
    ord: [
      ["Abstrakt datatype", "En beskrivelse af, hvad en samling kan (fx en stak: læg på, tag af), uden at sige, hvordan det er bygget."],
      ["Datastruktur", "Den konkrete måde, data ligger på i hukommelsen, fx et array eller en hægtet liste."],
      ["Algoritme", "En præcis fremgangsmåde i trin, der løser et problem, fx at søge eller sortere."],
      ["Big-O", "En måde at sige, hvordan tiden vokser, når mængden af data vokser: O(1), O(log n), O(n), O(n²)."],
      ["Binær søgning", "Søgning i en sorteret samling, hvor man hver gang kigger i midten og smider den halvdel væk, hvor svaret ikke kan være."],
      ["Syntaks", "Reglerne for, hvordan koden skal skrives for at være gyldig: semikolon, parenteser, nøgleord."],
      ["Semantik", "Hvad koden betyder, og hvad den gør, når den kører."]
    ],
    trin: [
      { t: "laes", h: "Sådan træner du svarene",
        md: "Resten af modulet er spørgsmål af den slags, du kan få i samtalen. Hvert spørgsmål har et godt svar og en række **nøgleord**.\n\nLær ikke svaret udenad. Træn sådan:\n\n1. Svar højt med dine egne ord.\n2. Klik på \"Sammenlign\", og se, hvilke **nøgleord** du fik med.\n3. Find **den linje i dit eget projekt**, svaret handler om. Et svar med en finger på koden er dobbelt så stærkt.\n\nEt godt svar har tre dele: **hvad det er**, **hvorfor man bruger det**, og **hvor det er i mit projekt**. Eksemplerne bruger FirmaApp fra modul 17. I dit eget projekt peger du på din tilsvarende fil.",
        noter: [
          ["Hvad", "En kort definition med det rigtige fagord."],
          ["Hvorfor", "Hvilket problem løser det? Hvad går galt uden?"],
          ["Hvor", "\"Det kan I se her i `EmployeeService.cs`, linje 20.\""]
        ] },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er forskellen på en klasse og et objekt? Vis det i dit projekt.",
        svar: "En **klasse** er en skabelon, der beskriver, hvilke data (properties) og hvilken adfærd (metoder) en slags ting har — fx min modelklasse `Employee` med `Name` og `DepartmentId`. Et **objekt** er en konkret **instans** af klassen med sine egne værdier, lavet med `new` — eller af EF Core, når den læser en række fra tabellen. Hver række i tabellen `Employees` bliver til ét `Employee`-objekt i programmet.",
        noegle: ["skabelon", "instans", "properties", "new", "række", "EF Core"] },
      { t: "forklar", q: "Eksamensspørgsmål: Nævn objektorienteringens fire grundprincipper, og giv et eksempel på hvert.",
        svar: "**Indkapsling:** data og kode samles i en klasse, og adgangen styres med `private`, `public` og properties — fx at servicens liste eller DbContext er et `private readonly` felt. **Arv:** en klasse bygger videre på en anden — min controller **er en** `Controller`, og min DbContext **er en** `DbContext`. **Polymorfi:** et objekt kan bruges gennem sin basistype eller sit interface, og den rigtige metode køres — controlleren kalder `IEmployeeService`, uden at vide hvilken klasse der svarer. **Abstraktion:** man viser kun det, der er brug for, og skjuler resten — interfacet viser *hvad* servicen kan, ikke *hvordan*.",
        noegle: ["indkapsling", "arv", "polymorfi", "abstraktion", "private", "interface", "er en"] },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er forskellen på et interface og en abstrakt klasse, og hvorfor bruger du et interface til din service?",
        svar: "Et **interface** er en ren kontrakt: metodernes hoveder uden kode, og en klasse kan implementere **flere** interfaces. En **abstrakt klasse** kan have både færdige metoder, felter og abstrakte metoder, men en klasse kan kun **arve fra én**. Jeg bruger et interface til servicen, fordi controlleren kun skal kende **kontrakten**. Så kan dependency injection give den den rigtige klasse, og jeg kan skifte implementeringen ud uden at ændre controlleren.",
        noegle: ["kontrakt", "flere interfaces", "arve fra én", "abstrakte metoder", "dependency injection"] },
      { t: "valg", q: "Et program skal hundredvis af gange slå en medarbejder op ud fra medarbejderens id. Hvilken datastruktur er bedst til opslagene?",
        svar: ["`Dictionary<int, Employee>` — opslag på nøglen tager næsten samme tid, uanset hvor mange der er", "`List<Employee>` — gå listen igennem hver gang", "Et array, der sorteres før hvert opslag", "En `Stack<Employee>`"],
        ret: 0, fordi: "Opslag i en `Dictionary` er O(1) i gennemsnit: den regner sig frem til pladsen ud fra nøglen. En liste skal gennemgås element for element, O(n). I et webprojekt er det tit databasen, der laver opslaget med `FindAsync(id)` — den bruger et indeks på primærnøglen." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvorfor har du brugt en `List` i dine modeller, og hvornår ville du vælge et array eller en `Dictionary` i stedet?",
        svar: "En **`List<T>`** kan vokse og skrumpe, holder elementerne i rækkefølge og kan gennemløbes med `foreach`. Derfor er navigation propertyen `List<Employee> Employees` en liste: en afdeling kan få flere eller færre medarbejdere. Et **array** har en fast længde, så det passer, når antallet er kendt og ikke ændrer sig. En **`Dictionary<TKey, TValue>`** passer, når jeg skal slå op på en nøgle mange gange, fordi opslag er **O(1)**, mens søgning i en liste er **O(n)**.",
        noegle: ["List<T>", "kan vokse", "array", "fast længde", "Dictionary", "nøgle", "O(1)", "O(n)"] },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er forskellen på en abstrakt datatype og en datastruktur?",
        svar: "En **abstrakt datatype** beskriver, **hvad** man kan gøre med en samling — fx en **stak**: læg øverst på, tag det øverste af (LIFO), eller en **kø**: stil dig bagerst, tag den forreste (FIFO). Den siger intet om, hvordan det er bygget. En **datastruktur** er den **konkrete** opbygning i hukommelsen, fx et **array** eller en **hægtet liste**. Den samme abstrakte datatype kan bygges med forskellige datastrukturer. I C# er `IEnumerable<T>` og `ICollection<T>` abstrakte beskrivelser, og `List<T>` er en konkret udgave bygget på et array.",
        noegle: ["hvad", "stak", "LIFO", "FIFO", "konkret", "array", "hægtet liste", "ICollection"] },
      { t: "laes", h: "En algoritme, du kan forklare: binær søgning",
        md: "Censor spørger tit om algoritmer. Binær søgning er god at kunne, fordi den viser forskellen på O(n) og O(log n).\n\nIdéen: tallene skal være **sorteret**. Kig på tallet i **midten**. Er det for lille, kan svaret kun være til højre, så smid venstre halvdel væk. Er det for stort, smid højre halvdel væk. Gentag.",
        kode: R`int[] tal = { 3, 8, 12, 17, 25, 31, 40 };
int soeg = 25;
int lav = 0;
int hoej = tal.Length - 1;
int fundet = -1;

while (lav <= hoej)
{
    int midt = (lav + hoej) / 2;
    if (tal[midt] == soeg)
    {
        fundet = midt;
        break;
    }
    else if (tal[midt] < soeg)
    {
        lav = midt + 1;
    }
    else
    {
        hoej = midt - 1;
    }
}

Console.WriteLine(fundet);`,
        noter: [
          ["int midt = (lav + hoej) / 2;", "Midten af det område, der er tilbage. Heltalsdivision runder ned."],
          ["lav = midt + 1;", "Midten var for lille: svaret er til højre."],
          ["hoej = midt - 1;", "Midten var for stor: svaret er til venstre."],
          ["while (lav <= hoej)", "Så længe der er noget tilbage at lede i."]
        ],
        output: "4",
        md2: "Med 7 tal skal der højst kigges 3 gange. Med 1 million tal højst 20 gange. Lineær søgning (forfra, ét ad gangen) kan skulle kigge 1 million gange. Det er O(log n) mod O(n)." },
      { t: "spor", h: "Spor: binær søgning efter 25",
        q: "Samme algoritme, skrevet ud linje for linje uden løkke. Skriv `lav`, `hoej` og `midt` efter hver linje. Tallene er `{ 3, 8, 12, 17, 25, 31, 40 }` (plads 0 til 6).",
        kode: R`int[] tal = { 3, 8, 12, 17, 25, 31, 40 };
int soeg = 25;
int lav = 0;
int hoej = tal.Length - 1;
int midt = (lav + hoej) / 2;
lav = midt + 1;
midt = (lav + hoej) / 2;
hoej = midt - 1;
midt = (lav + hoej) / 2;
Console.WriteLine(tal[midt] == soeg);`,
        kolonner: ["lav", "hoej", "midt"],
        raekker: [[3, "=0", "=–", "=–"], [4, "=0", "=6", "=–"], [5, "0", "6", "3"], [6, "4", "6", "3"], [7, "4", "6", "5"], [8, "4", "4", "5"], [9, "4", "4", "4"]],
        output: "True",
        fordi: "Først er midten plads 3 (17), som er for lille, så `lav` bliver 4. Så er midten plads 5 (31), som er for stor, så `hoej` bliver 4. Nu er midten plads 4, og `tal[4]` er 25. Tre kig i stedet for fem." },
      { t: "forudsig",
        q: "Egen logik i en service er tit en LINQ-forespørgsel. Hvad skriver programmet?",
        kode: R`List<Employee> alle = new List<Employee>
{
    new Employee { Name = "Anna", Department = "Salg" },
    new Employee { Name = "Bo", Department = "Lager" },
    new Employee { Name = "Cy", Department = "Salg" }
};

foreach (var gruppe in alle.GroupBy(e => e.Department))
{
    Console.WriteLine($"{gruppe.Key}: {gruppe.Count()}");
}

class Employee
{
    public string Name { get; set; } = "";
    public string Department { get; set; } = "";
}`,
        output: "Salg: 2\nLager: 1",
        fordi: "`GroupBy` samler medarbejderne efter afdeling. Grupperne kommer i den rækkefølge, deres første medlem står i listen: Salg (Anna) før Lager (Bo). `Count()` tæller hver gruppe. Det er sådan en lille algoritme, du kan lægge i en service og forklare." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvor i dit projekt er der en algoritme, og hvor hurtig er den?",
        svar: "Min **egen logik** ligger i servicen, fx en metode, der tæller medarbejdere pr. afdeling med LINQ `GroupBy` og `Count`. **Trin for trin:** den går alle medarbejdere igennem én gang, lægger hver i gruppen for sin afdeling og tæller grupperne. Den kigger på hvert element én gang, så den er **O(n)**: dobbelt så mange medarbejdere, dobbelt så lang tid. Til sammenligning er **binær søgning** O(log n), fordi den halverer området hver gang, men den kræver, at dataene er **sorteret**.",
        noegle: ["egen logik", "service", "trin for trin", "O(n)", "binær søgning", "O(log n)", "sorteret"] },
      { t: "forklar", q: "Eksamensspørgsmål: Læringsmålene nævner formelle sprogs syntaks og semantik. Hvad er forskellen, og hvor møder du dem?",
        svar: "**Syntaks** er reglerne for, hvordan koden skal **skrives**: semikolon, parenteser, nøgleord i den rigtige rækkefølge. C# har en grammatik, og **compileren** tjekker den — bryder jeg den, får jeg en oversætterfejl som CS1002 \"; expected\". **Semantik** er, hvad koden **betyder**, og hvad den gør, når den kører. Kode kan have korrekt syntaks og forkert semantik — en **logisk fejl** — fx `<=` i stedet for `<` i en løkke. Den finder compileren ikke; den finder jeg med **debuggeren**. Et regulært udtryk er også et lille formelt sprog med sin egen syntaks.",
        noegle: ["syntaks", "skrives", "grammatik", "compileren", "semantik", "betyder", "logisk fejl", "debuggeren"] },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad betyder `<T>` i `List<T>`, og hvorfor er det smart?",
        svar: "`<T>` er en **typeparameter**: `List<T>` er en **generisk** klasse, hvor `T` bliver erstattet af en rigtig type, når den bruges — `List<Employee>`, `List<string>`. Det er smart, fordi den samme kode virker for alle typer, og compileren alligevel **tjekker typen**: man kan ikke komme en `string` i en `List<Employee>`. Man slipper for at skrive en listeklasse pr. type, og for casts. `DbSet<T>` i DbContext er også generisk.",
        noegle: ["typeparameter", "generisk", "erstattet", "tjekker typen", "DbSet<T>"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m28l7", titel: "Eksamensspørgsmål 2: mønstre, web, data og sprog", min: 22,
    ord: [
      ["Tilstandsmaskine", "En model, hvor noget altid er i én af et fast antal tilstande, og bestemte hændelser flytter det fra én tilstand til en anden."],
      ["Tilstand", "Den situation, noget er i lige nu, fx Oprettet, Betalt eller Sendt."],
      ["Overgang", "Reglen for, hvilken tilstand en hændelse fører til."],
      ["Designmønster", "En kendt, navngiven løsning på et problem, der går igen i mange programmer."],
      ["Framework", "En ramme, der styrer programmet og kalder din kode på de rigtige tidspunkter, fx ASP.NET Core."],
      ["Bibliotek", "Kode, som dit program kalder, når det har brug for det, fx LINQ eller System.Text.Json."]
    ],
    trin: [
      { t: "laes", h: "Tilstandsmaskiner",
        md: "Læringsmålene nævner **tilstandsmaskiner**. Det lyder stort, men du har næsten skrevet dem. En tilstandsmaskine har:\n\n- et fast antal **tilstande** — perfekt til en `enum`,\n- **hændelser**, der sker,\n- **overgange**: regler for, hvilken tilstand en hændelse fører til. En hændelse, der ikke giver mening i tilstanden, gør ingenting.\n\nHer et klassisk eksempel: en ordre, der kan betales, sendes og annulleres.",
        kode: R`OrdreStatus status = OrdreStatus.Oprettet;
status = Naeste(status, "betal");
status = Naeste(status, "send");
Console.WriteLine(status);

static OrdreStatus Naeste(OrdreStatus nu, string haendelse)
{
    switch (nu)
    {
        case OrdreStatus.Oprettet:
            if (haendelse == "betal") return OrdreStatus.Betalt;
            if (haendelse == "annuller") return OrdreStatus.Annulleret;
            break;
        case OrdreStatus.Betalt:
            if (haendelse == "send") return OrdreStatus.Sendt;
            break;
    }
    return nu;
}

enum OrdreStatus { Oprettet, Betalt, Sendt, Annulleret }`,
        noter: [
          ["enum OrdreStatus", "De fire tilstande. En ordre er altid i præcis én af dem."],
          ["switch (nu)", "Hvilke hændelser der er lovlige, afhænger af tilstanden lige nu."],
          ["return nu;", "En hændelse, der ikke passer (fx \"send\" på en ubetalt ordre), ændrer ingenting."],
          ["Sendt, Annulleret", "Sluttilstande: der er ingen overgange ud af dem."]
        ],
        output: "Sendt",
        md2: "I et webprojekt kan en `enum`-property på en model være tilstanden, og servicen kan have metoden, der skifter den. Regulære udtryk hænger også sammen med tilstandsmaskiner: teorien bag dem er, at et mønster kan laves om til en tilstandsmaskine, der læser teksten tegn for tegn." },
      { t: "spor", h: "Spor: ordren skifter tilstand",
        q: "Samme `Naeste`-metode og `enum` som i forrige trin. Skriv `status` efter hver linje fra 1 til 5.",
        kode: R`OrdreStatus status = OrdreStatus.Oprettet;
status = Naeste(status, "send");
status = Naeste(status, "betal");
status = Naeste(status, "annuller");
status = Naeste(status, "send");
Console.WriteLine(status);

static OrdreStatus Naeste(OrdreStatus nu, string haendelse)
{
    switch (nu)
    {
        case OrdreStatus.Oprettet:
            if (haendelse == "betal") return OrdreStatus.Betalt;
            if (haendelse == "annuller") return OrdreStatus.Annulleret;
            break;
        case OrdreStatus.Betalt:
            if (haendelse == "send") return OrdreStatus.Sendt;
            break;
    }
    return nu;
}

enum OrdreStatus { Oprettet, Betalt, Sendt, Annulleret }`,
        kolonner: ["status"],
        raekker: [[1, "=Oprettet"], [2, "Oprettet"], [3, "Betalt"], [4, "Betalt"], [5, "Sendt"]],
        slut: false,
        output: "Sendt",
        fordi: "\"send\" på en oprettet ordre er ikke en lovlig overgang, så linje 2 ændrer intet. \"annuller\" er kun lovlig fra Oprettet, så linje 4 ændrer heller intet, fordi ordren allerede er betalt. Hændelsen alene bestemmer ikke resultatet — tilstanden gør det også." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er en tilstandsmaskine? Giv et eksempel.",
        svar: "En **tilstandsmaskine** har et fast antal **tilstande**, og den er altid i præcis én af dem. **Hændelser** flytter den til en anden tilstand efter faste **overgange**, og en hændelse, der ikke passer til tilstanden, ændrer ingenting. Eksempel: en ordre kan være Oprettet, Betalt, Sendt eller Annulleret. \"betal\" flytter fra Oprettet til Betalt, men \"send\" virker kun på en betalt ordre. I C# kan tilstandene være en `enum` og overgangene en `switch`. Teorien bag **regulære udtryk** er også tilstandsmaskiner.",
        noegle: ["tilstande", "præcis én", "hændelser", "overgange", "enum", "switch", "regulære udtryk"] },
      { t: "forudsig",
        q: "Et regulært udtryk til et dansk telefonnummer på 8 cifre. Hvad skriver programmet?",
        kode: R`using System.Text.RegularExpressions;

string moenster = @"^\d{8}$";
Console.WriteLine(Regex.IsMatch("12345678", moenster));
Console.WriteLine(Regex.IsMatch("1234 5678", moenster));
Console.WriteLine(Regex.IsMatch("1234567", moenster));`,
        output: "True\nFalse\nFalse",
        fordi: "`^` er starten, `$` er slutningen, og `\\d{8}` er præcis otte cifre. Mellemrummet i \"1234 5678\" er ikke et ciffer, og \"1234567\" har kun syv. Uden `^` og `$` ville et mønster også godkende tekst, der bare *indeholder* otte cifre." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvor bruger du et regulært udtryk i dit projekt, og hvad betyder det tegn for tegn?",
        svar: "På min model står `[RegularExpression(@\"^\\d{8}$\", ErrorMessage = \"Skriv 8 cifre\")]` over telefonnummeret. Tegn for tegn: `^` betyder **starten** af teksten, `\\d` er **et ciffer**, `{8}` betyder **præcis otte** af dem, og `$` er **slutningen**. Tilsammen: hele feltet skal være otte cifre, intet andet. ASP.NET Core tjekker reglen på **serveren** ved model binding, så `ModelState.IsValid` bliver falsk, og fejlbeskeden vises. Valideringsscripts tjekker det også i **browseren**, før formularen sendes.",
        noegle: ["RegularExpression", "^", "\\d", "{8}", "$", "ModelState.IsValid", "serveren", "browseren"] },
      { t: "forklar", q: "Eksamensspørgsmål: Hvilke designmønstre bruger du i dit projekt?",
        svar: "**MVC** (Model-View-Controller) er et arkitekturmønster: modellen er data og regler, viewet viser, og controlleren styrer. **Dependency injection**: objekter får det, de afhænger af, ind gennem konstruktøren, registreret i `Program.cs`. Et **servicelag bag interfaces** — beslægtet med **Repository**-mønstret — skjuler, hvordan data hentes. **Singleton** kender jeg fra `AddSingleton`: ét objekt for hele programmet. Og **Observer** er idéen bag events og SignalR: nogen abonnerer og får besked, når noget sker. Mønstrene gør koden genkendelig for andre programmører, og lagene kan ændres hver for sig.",
        noegle: ["MVC", "dependency injection", "servicelag", "Repository", "Singleton", "Observer", "genkendelig"] },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er forskellen på et framework og et bibliotek? Giv eksempler fra dit projekt.",
        svar: "Et **bibliotek** er kode, som **jeg kalder**, når jeg har brug for det — fx **LINQ** (`Where`, `OrderBy`) eller `System.Text.Json`. Et **framework** er en ramme, der **kalder min kode**: **ASP.NET Core** tager imod forespørgslen, vælger min controller via routing, laver den med dependency injection og kalder min action. Jeg udfylder hullerne. **Entity Framework Core** er et ORM-framework, der oversætter mellem mine klasser og databasens tabeller. **Bootstrap** er et CSS-framework til layout. De sparer mig for at skrive det, som alle webapps har brug for.",
        noegle: ["bibliotek", "jeg kalder", "framework", "kalder min kode", "ASP.NET Core", "LINQ", "Entity Framework Core", "Bootstrap"] },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er en migration, og hvorfor retter du ikke bare tabellerne i databasen?",
        svar: "I **code first** er mine **modelklasser** det, databasen laves ud fra. Når jeg ændrer en klasse, laver jeg en **migration** med `Add-Migration` (Mac: `dotnet ef migrations add`). Den indeholder kun **forskellen**, fx en ny kolonne. `Update-Database` kører den på databasen, og tabellen `__EFMigrationsHistory` husker, hvilke der er kørt. Retter jeg i hånden, passer klasserne og databasen ikke sammen, og ændringen kommer ikke med, når databasen laves på en anden maskine — fx censors. Med migrationer er databasens historik **kode i projektet**.",
        noegle: ["code first", "modelklasser", "migration", "forskellen", "Update-Database", "__EFMigrationsHistory", "kode i projektet"] },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er forskellen på GET og POST, og hvor bliver brugerens input valideret?",
        svar: "**GET** henter en side; parametrene står i URL'en, og den må ikke ændre data. **POST** sender data i forespørgslens krop og bruges, når noget skal gemmes. I controlleren har Create to actions: en GET, der viser den tomme formular, og en `[HttpPost]`, der modtager den. POST-actionen har `[ValidateAntiForgeryToken]` mod falske formularer fra andre sider. Input valideres **to steder**: i **browseren** af valideringsscripts, så brugeren får besked med det samme, og på **serveren**, hvor model binding tjekker attributterne og sætter `ModelState.IsValid`. Det er serveren, der tæller, for browseren kan man snyde.",
        noegle: ["GET", "URL", "POST", "HttpPost", "ValidateAntiForgeryToken", "browseren", "serveren", "ModelState.IsValid"] },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er et API, og hvilke API'er bruger dit projekt?",
        svar: "Et **API** (Application Programming Interface) er den **grænseflade**, et program eller et bibliotek stiller til rådighed, så anden kode kan bruge det uden at kende indmaden. Mit projekt bruger fx **EF Core's API** (`DbSet`, `SaveChangesAsync`) og **ASP.NET Core's API** (`Controller`, `View()`, `RedirectToAction`). Et **Web API** er et API over HTTP: **REST** bruger URL'er til ressourcer og HTTP-verberne GET, POST, PUT og DELETE til CRUD, svarer med **JSON** og **statuskoder** som 200, 201 og 404. Mine egne interfaces, fx `IEmployeeService`, er også et lille API mellem lagene.",
        noegle: ["grænseflade", "indmaden", "EF Core", "Web API", "REST", "HTTP-verber", "JSON", "statuskoder"] },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er GUI-programmering i dit projekt?",
        svar: "**GUI** er den grafiske brugergrænseflade — det, brugeren ser og klikker på. I mit projekt er det **Razor-views** (eller **Blazor-komponenter**), der laver HTML ud fra mine modeller med `@model`, `@foreach` og **tag helpers** som `asp-for` og `asp-action`. **Bootstrap** står for layout, menu og knapper. **Formularer** med valideringsbeskeder fortæller brugeren, hvad der er galt. GUI-programmering er **hændelsesstyret**: koden reagerer på det, brugeren gør — et klik, der sender en formular, eller i Blazor en `@onclick`, der kalder en metode.",
        noegle: ["brugergrænseflade", "Razor", "Blazor-komponenter", "tag helpers", "Bootstrap", "formularer", "hændelsesstyret"] },
      { t: "forklar", q: "Eksamensspørgsmål: Hvorfor er dine action-metoder `async`, og hvad gør `await`?",
        svar: "Når en action venter på databasen, skal tråden ikke stå stille. Med **`async`** og **`await`** frigives tråden, mens EF Core venter på svar fra databasen, og serveren kan bruge den til **andre forespørgsler** imens. Når svaret kommer, fortsætter metoden, hvor den slap. Derfor returnerer actionen `Task<IActionResult>`, og jeg kalder fx `await _context.Employees.ToListAsync()`. Det handler ikke om, at den ene forespørgsel bliver hurtigere, men om, at serveren kan klare **flere på én gang**.",
        noegle: ["async", "await", "tråden", "frigives", "andre forespørgsler", "Task<IActionResult>", "ToListAsync", "flere på én gang"] },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er forskellen på authentication og authorization? (Svar også, selv om dit projekt ikke har login — sig så, hvordan du ville lave det.)",
        svar: "**Authentication** er at finde ud af, **hvem** brugeren er — login med brugernavn og adgangskode. **Authorization** er at bestemme, hvad brugeren **må** — fx at kun rollen Admin må slette. I ASP.NET Core klarer **Identity** login, og adgangskoderne gemmes **hashet**, aldrig som klartekst. `[Authorize]` på en controller kræver login, og `[Authorize(Roles = \"Admin\")]` kræver en rolle. I `Program.cs` skal `UseAuthentication` stå **før** `UseAuthorization`, for man kan ikke vide, hvad nogen må, før man ved, hvem de er.",
        noegle: ["authentication", "hvem", "authorization", "må", "Identity", "hashet", "Authorize", "før"] },
      { t: "forklar", q: "Eksamensspørgsmål: Læringsmålene siger, at du skal kunne holde dig ajour med nye sprog og værktøjer. Hvordan lærer du en ny teknik?",
        svar: "Jeg starter med **dokumentationen**, fx Microsoft Learn, og bygger et **lille projekt**, der kun afprøver den ene ting, før jeg sætter den ind i det rigtige projekt. Jeg bruger **debuggeren** til at se, hvad koden faktisk gør, linje for linje, i stedet for at gætte. Bruger jeg scaffolding eller AI til at skrive kode, **læser og forklarer** jeg den, før den bliver i projektet. I dette kursus lærte jeg fx Blazor efter MVC ved at sammenligne: hvad svarer en komponent til i MVC? Og jeg kan vise det: mit projekt bruger .NET 10, som er den nyeste version.",
        noegle: ["dokumentationen", "lille projekt", "debuggeren", "læser og forklarer", "sammenligne"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m28v", titel: "Værksted: gør projektet eksamensklart", vaerksted: true, min: 150, ord: [], trin: [

    { t: "laes", h: "Sådan arbejder du i værkstedet",
      md: "Værkstedet har fem opgaver. De tre første er rigtige programmer i {{Visual Studio||Rider}}: en tidsplan, en fejljagt og en lille lagdelt app i konsollen. De to sidste er de vigtigste for eksamen: dit første udkast til dispositionen og en generalprøve.\n\nLav et nyt Console-projekt til hver af de tre første. De to sidste laver du i dit eget projekt og på papir.",
      noter: [
        ["Skriv selv", "Skriv koden med dine egne fingre. Det er skrivningen, der får det til at sidde."],
        ["Kør tit", "Kør programmet efter hver lille ændring. Så ved du præcis, hvad der lavede en fejl."],
        ["Debuggeren", "Sæt et breakpoint (klik i margenen), og start med debuggeren (Visual Studio: F5 · Rider: den grønne bille). Gå ét skridt ad gangen, og se variablerne i Locals (Visual Studio) / Threads & Variables (Rider)."],
        ["Tips før løsning", "Sidder du fast, så åbn ét tip ad gangen. Løsningen er sidste udvej."]
      ] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Tidsplanen for oplægget", projekt: "Tidsplan",
      md: "Lav et program, der skriver planen for dit ti minutters oplæg ud: hver del med det minut, den starter i, og til sidst den samlede tid.",
      krav: [
        "Et `string`-array `dele` med: `Overblik`, `Demo`, `Koden`, `Klogere på`, `Udvidelser og afrunding`",
        "Et `int`-array `minutter` med: 1, 3, 4, 1, 1",
        "En variabel `start`, der begynder på 0",
        "For hver del skrives en linje: startminuttet, ` min: ` og navnet — fx `0 min: Overblik`",
        "Efter hver del lægges delens minutter til `start`",
        "Til sidst skrives `I alt: 10 min` (beregnet, ikke skrevet fast)"
      ],
      tip: [
        "Brug en `for`-løkke fra 0 til `dele.Length`, så du kan bruge den samme plads `i` i begge arrays.",
        "Skriv linjen, **før** du lægger minutterne til — ellers står der, hvornår delen slutter.",
        "Inde i løkken: `Console.WriteLine($\"{start} min: {dele[i]}\");` og så `start += minutter[i];`. Efter løkken er `start` den samlede tid."
      ],
      output: "0 min: Overblik\n1 min: Demo\n4 min: Koden\n8 min: Klogere på\n9 min: Udvidelser og afrunding\nI alt: 10 min",
      loesning: R`string[] dele = { "Overblik", "Demo", "Koden", "Klogere på", "Udvidelser og afrunding" };
int[] minutter = { 1, 3, 4, 1, 1 };
int start = 0;

for (int i = 0; i < dele.Length; i++)
{
    Console.WriteLine($"{start} min: {dele[i]}");
    start += minutter[i];
}

Console.WriteLine($"I alt: {start} min");`,
      ekstra: ["Skriv også, hvornår hver del slutter: `0–1 min: Overblik`.", "Lad programmet skrive `For lang!`, hvis summen er over 10."] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Fejljagt: tællingen pr. afdeling", projekt: "Statistik",
      md: "En service skal tælle, hvor mange medarbejdere der er i hver afdeling — en typisk \"egen logik\". Programmet kører uden fejlbesked, men tallene er forkerte: alle afdelinger får 1. Kopiér startkoden ind i Program.cs, og find fejlen **med debuggeren**, før du retter noget.",
      krav: [
        "Sæt et breakpoint inde i `foreach`-løkken i `TaelPrAfdeling`",
        "Start med debuggeren, og gå ét skridt ad gangen. Hold øje med `resultat` i Locals (Visual Studio) / Threads & Variables (Rider)",
        "Find den linje, hvor tallet for \"Salg\" skulle være blevet 2, men stadig er 1",
        "Ret fejlen, så programmet skriver `Salg: 3`, `Lager: 1` og `IT: 1`"
      ],
      tip: [
        "Fold `resultat` ud i variabelvinduet. Se værdien for \"Salg\" før og efter linjen i `if`-grenen, anden gang Salg kommer.",
        "`x++` giver den **gamle** værdi og lægger først 1 til bagefter. Hvad bliver så gemt, når du skriver `resultat[...] = resultat[...]++;`?",
        "Skriv bare `resultat[e.Afdeling]++;` (eller `resultat[e.Afdeling] = resultat[e.Afdeling] + 1;`)."
      ],
      start: R`var service = new StatistikService();
List<Employee> alle = new List<Employee>
{
    new Employee { Name = "Anna", Afdeling = "Salg" },
    new Employee { Name = "Bo", Afdeling = "Lager" },
    new Employee { Name = "Cy", Afdeling = "Salg" },
    new Employee { Name = "Dan", Afdeling = "IT" },
    new Employee { Name = "Eva", Afdeling = "Salg" }
};

Dictionary<string, int> antal = service.TaelPrAfdeling(alle);
foreach (var par in antal)
{
    Console.WriteLine($"{par.Key}: {par.Value}");
}

class Employee
{
    public string Name { get; set; } = "";
    public string Afdeling { get; set; } = "";
}

class StatistikService
{
    public Dictionary<string, int> TaelPrAfdeling(List<Employee> medarbejdere)
    {
        var resultat = new Dictionary<string, int>();
        foreach (Employee e in medarbejdere)
        {
            if (resultat.ContainsKey(e.Afdeling))
            {
                resultat[e.Afdeling] = resultat[e.Afdeling]++;
            }
            else
            {
                resultat[e.Afdeling] = 1;
            }
        }
        return resultat;
    }
}`,
      startOutput: "Salg: 1\nLager: 1\nIT: 1",
      output: "Salg: 3\nLager: 1\nIT: 1",
      loesning: R`var service = new StatistikService();
List<Employee> alle = new List<Employee>
{
    new Employee { Name = "Anna", Afdeling = "Salg" },
    new Employee { Name = "Bo", Afdeling = "Lager" },
    new Employee { Name = "Cy", Afdeling = "Salg" },
    new Employee { Name = "Dan", Afdeling = "IT" },
    new Employee { Name = "Eva", Afdeling = "Salg" }
};

Dictionary<string, int> antal = service.TaelPrAfdeling(alle);
foreach (var par in antal)
{
    Console.WriteLine($"{par.Key}: {par.Value}");
}

class Employee
{
    public string Name { get; set; } = "";
    public string Afdeling { get; set; } = "";
}

class StatistikService
{
    public Dictionary<string, int> TaelPrAfdeling(List<Employee> medarbejdere)
    {
        var resultat = new Dictionary<string, int>();
        foreach (Employee e in medarbejdere)
        {
            if (resultat.ContainsKey(e.Afdeling))
            {
                resultat[e.Afdeling]++;
            }
            else
            {
                resultat[e.Afdeling] = 1;
            }
        }
        return resultat;
    }
}`,
      fordi: "`resultat[e.Afdeling]++` giver den gamle værdi (1) og lægger 1 til. Men så bliver den gamle værdi (1) straks skrevet tilbage med `=`. Tallet står stille på 1. Det er en logisk fejl: syntaksen er i orden, men betydningen er forkert — præcis den slags, compileren ikke finder, men debuggeren gør.",
      ekstra: ["Lav det samme med LINQ: `medarbejdere.GroupBy(e => e.Afdeling).ToDictionary(g => g.Key, g => g.Count())`, og sammenlign resultatet.", "Sortér udskriften efter antal, største først."] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Lagdelt mini-app i konsollen", projekt: "LagApp",
      md: "Byg arkitekturen fra lektion 3 i en konsol, uden database: et interface, en service med en valideringsregel (regulært udtryk) og egen logik (LINQ), og en \"controller\", der får servicen ind gennem konstruktøren. Det er dit eksamensprojekts skelet i lille format — og noget, du kan forklare til bunds.",
      krav: [
        "Klassen `Employee` har `Name` og `Department` (begge `string`)",
        "Interfacet `IEmployeeService` har `bool Tilfoej(string navn, string afdeling)` og `List<Employee> HentAfdeling(string afdeling)`",
        "Klassen `EmployeeService` implementerer interfacet og gemmer medarbejderne i en privat `List<Employee>`",
        "`Tilfoej` godkender kun navne, der passer til mønstret `^[A-Za-zÆØÅæøå ]{2,30}$`. Godkendte navne tilføjes, og metoden returnerer `true`; ellers tilføjes intet, og den returnerer `false`",
        "`HentAfdeling` returnerer afdelingens medarbejdere sorteret efter navn (brug LINQ)",
        "Klassen `EmployeesController` får et `IEmployeeService` ind gennem konstruktøren",
        "`Opret(navn, afdeling)` skriver `Oprettet: navn` eller `Afvist: navn`. `Vis(afdeling)` skriver `afdeling (antal):` og derefter en linje `- navn` pr. medarbejder",
        "Programmet opretter i denne rækkefølge: Cy/Salg, Bo/Lager, Anna/Salg, X/Salg, R2D2/IT — og viser til sidst afdelingen Salg"
      ],
      tip: [
        "Skriv klasserne i rækkefølgen: `Employee` → `IEmployeeService` → `EmployeeService` → `EmployeesController`. Kør efter hver.",
        "Øverst i filen: `using System.Text.RegularExpressions;`. I `Tilfoej`: `if (!Regex.IsMatch(navn, @\"^[A-Za-zÆØÅæøå ]{2,30}$\")) return false;`",
        "`HentAfdeling`: `return _medarbejdere.Where(e => e.Department == afdeling).OrderBy(e => e.Name).ToList();`. I `Vis` kalder du den én gang, gemmer listen i en variabel og bruger `.Count`."
      ],
      output: "Oprettet: Cy\nOprettet: Bo\nOprettet: Anna\nAfvist: X\nAfvist: R2D2\nSalg (2):\n- Anna\n- Cy",
      loesning: R`using System.Text.RegularExpressions;

IEmployeeService service = new EmployeeService();
EmployeesController controller = new EmployeesController(service);

controller.Opret("Cy", "Salg");
controller.Opret("Bo", "Lager");
controller.Opret("Anna", "Salg");
controller.Opret("X", "Salg");
controller.Opret("R2D2", "IT");
controller.Vis("Salg");

class Employee
{
    public string Name { get; set; } = "";
    public string Department { get; set; } = "";
}

interface IEmployeeService
{
    bool Tilfoej(string navn, string afdeling);
    List<Employee> HentAfdeling(string afdeling);
}

class EmployeeService : IEmployeeService
{
    private List<Employee> _medarbejdere = new List<Employee>();

    public bool Tilfoej(string navn, string afdeling)
    {
        if (!Regex.IsMatch(navn, @"^[A-Za-zÆØÅæøå ]{2,30}$"))
        {
            return false;
        }
        _medarbejdere.Add(new Employee { Name = navn, Department = afdeling });
        return true;
    }

    public List<Employee> HentAfdeling(string afdeling)
    {
        return _medarbejdere
            .Where(e => e.Department == afdeling)
            .OrderBy(e => e.Name)
            .ToList();
    }
}

class EmployeesController
{
    private readonly IEmployeeService _service;

    public EmployeesController(IEmployeeService service)
    {
        _service = service;
    }

    public void Opret(string navn, string afdeling)
    {
        if (_service.Tilfoej(navn, afdeling))
        {
            Console.WriteLine($"Oprettet: {navn}");
        }
        else
        {
            Console.WriteLine($"Afvist: {navn}");
        }
    }

    public void Vis(string afdeling)
    {
        List<Employee> liste = _service.HentAfdeling(afdeling);
        Console.WriteLine($"{afdeling} ({liste.Count}):");
        foreach (Employee e in liste)
        {
            Console.WriteLine($"- {e.Name}");
        }
    }
}`,
      fordi: "\"X\" er kun ét tegn, og mønstret kræver 2 til 30. \"R2D2\" indeholder cifre, som ikke er med i `[A-Za-zÆØÅæøå ]`. Anna kommer før Cy, fordi `HentAfdeling` sorterer — controlleren ved intet om sorteringen. Det er pointen: logikken bor i servicen, og controlleren kender kun interfacet.",
      ekstra: ["Lav en anden klasse, `TestEmployeeService`, der også implementerer `IEmployeeService`, men altid returnerer to faste medarbejdere. Skift den ind på linje 3 — og se, at controlleren ikke skal ændres.", "Tilføj metoden `Dictionary<string, int> AntalPrAfdeling()` til interfacet og servicen."] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Dit første udkast til dispositionen", projekt: "Disposition", sprog: "text",
      md: "Skriv første udkast til **din egen** disposition med skabelonen fra lektion 4. Har du ikke valgt emne endnu, så vent med denne opgave til den dag, du gør. Løsningen nedenfor er et eksempel for FirmaApp fra modul 17 — ikke et forslag til dit emne.",
      krav: [
        "Seks overskrifter: Indledning · Teknologi og teori · Modeller og deres sammenhæng · Hvad man kan · Afgrænsning og næste skridt · Kilder",
        "Indledningen siger på tre linjer: hvad appen er, hvem den er til, og hvilket problem den løser",
        "Hver model har én linje, og relationerne står der (\"hører til én …\")",
        "Din egen logik er nævnt under \"Hvad man kan\"",
        "Alt undtagen kilderne fylder højst én normalside (2400 tegn med mellemrum — Word kan tælle dem)",
        "Du har sat en streg under hvert fagord og kan pege på det sted i koden, hvor det bliver brugt"
      ],
      tip: [
        "Start med indledningen og modellerne. Dem kender du allerede fra lektion 2.",
        "Under \"Teknologi og teori\": skriv kun det, du allerede har bygget og kan forklare. Tilføj resten undervejs.",
        "Er siden for lang, så skær i \"Hvad man kan\": nævn de vigtigste sider, ikke alle knapper."
      ],
      fri: true,
      output: "Disposition – FirmaApp\n\nIndledning\n- Hvad: en webapp til at holde styr på et firmas afdelinger og medarbejdere\n- ...",
      loesning: R`Disposition – FirmaApp

Indledning
- Hvad: en webapp til at holde styr på et firmas afdelinger og medarbejdere
- Til hvem: kontoret, der administrerer personalet
- Problemet: oplysningerne ligger i ét system i stedet for i regneark

Teknologi og teori
- ASP.NET Core MVC: model, view og controller hver for sig (MVC-mønstret)
- Entity Framework Core som ORM, code first, migrationer, SQL Server LocalDB
- Servicelag bag interfaces (IEmployeeService), givet til controllerne
  med dependency injection (AddScoped i Program.cs) – løs kobling
- LINQ til forespørgsler, validering med data annotations og et
  regulært udtryk på telefonnummeret, Bootstrap til layout

Modeller og deres sammenhæng
- Department: en afdeling med navn
- Employee: en medarbejder med navn og stilling – hører til én Department
  (fremmednøgle DepartmentId, navigation property List<Employee>)

Hvad man kan
- Se, oprette, rette og slette afdelinger og medarbejdere
- Vælge afdeling i en dropdown, når en medarbejder oprettes
- Statistik: antal medarbejdere pr. afdeling (GroupBy i EmployeeService)

Afgrænsning og næste skridt
- Ingen login: alle kan rette alt. Næste skridt: Identity med rollen Admin
- Med mere tid: et lille Web API, der giver medarbejderne som JSON

Kilder
- Microsoft Learn: ASP.NET Core MVC og Entity Framework Core (med links)
- Kursets materiale i Videregående programmering`,
      ekstra: ["Bed en anden om at sætte en streg under hvert fagord og spørge \"hvad betyder det, og hvor er det i koden?\". Lær eller slet hvert ord, du ikke kan svare på.", "Gem en kopi som pdf allerede nu, så du har prøvet det før afleveringen."] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Generalprøve: 25 minutter i ét stræk", projekt: "Generalprøve", sprog: "text",
      md: "Den sidste opgave er eksamen i lille format. Gør den, når projektet er afleveret — platformens forslag er onsdag 4. november. Find gerne én, der vil være censor. Ellers optager du dig selv og stiller spørgsmålene fra lektion 6 og 7 til dig selv.",
      krav: [
        "Projektet kører, databasen har startdata, og filerne til kodedelen er åbne i faner i den rigtige rækkefølge",
        "Du holder oplægget med stopur og stopper ved 10 minutter, også hvis du ikke er færdig",
        "Bagefter får du fem spørgsmål fra lektion 6 og 7 i tilfældig rækkefølge (15 minutter)",
        "For hvert svar peger du på en konkret linje i dit eget projekt",
        "Du skriver de tre svageste svar ned og træner dem næste dag med nøgleordene"
      ],
      tip: [
        "Kun stikordspapiret må ligge foran dig. Ingen hele sætninger.",
        "Kan du ikke et svar, så sig, hvad du ved, og hvordan du ville finde resten. Det er også et svar.",
        "Brug optagelsen: hvor talte du for længe, og hvor sagde du \"øh\" i stedet for et fagord?"
      ],
      fri: true,
      output: "Oplæg: 9 min 40 s\nSvageste svar: 1) abstrakt datatype  2) GET vs POST  3) tilstandsmaskine",
      loesning: R`Stikordspapir (eksempel på opbygning – dit eget projekt i stedet for FirmaApp)

0–1   Overblik
      FirmaApp · afdelinger + medarbejdere · til kontoret · det viser jeg
1–4   Demo
      liste · opret medarbejder · vælg afdeling i dropdown · statistik
4–8   Koden – samme handling
      Employee.cs (Required, RegularExpression)
      EmployeesController.Create POST (ModelState, tynd)
      IEmployeeService / EmployeeService (LINQ GroupBy)
      Program.cs (AddDbContext, AddScoped)
8–9   Klogere på
      servicelag kom sent · ville lave det fra start
9–10  Udvidelser + afrunding
      login med roller · Web API · tak

Efter generalprøven: de tre svageste svar
1) ...
2) ...
3) ...`,
      ekstra: ["Gentag generalprøven med andre fem spørgsmål.", "Bed din censor om kun at sige \"hvorfor?\" og \"vis mig det\" — det træner svarene med en finger på koden."] }
  ] }
  ]
});
})();
