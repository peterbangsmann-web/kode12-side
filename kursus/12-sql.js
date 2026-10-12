// Modul 12 — SQL og databaser. Forudsætter: modul 0–11.
(function () {
const R = String.raw;

// Tabellen Produkter, som den ser ud i hele modulet. Bruges som kontekst i opgaver, der skal kunne stå alene.
const PRODUKTER = R`-- Tabellen Produkter:
-- Id  Navn       Pris  Kategori
-- 1   Kaffe      45    Drikke
-- 2   Te         30    Drikke
-- 3   Juice      15    Drikke
-- 4   Brød       40    Bageri
-- 5   Kage       25    Bageri
-- 6   Bolle      10    Bageri
-- 7   Chokolade  20    Slik
-- 8   Lakrids    12    Slik`;

window.KURSUS.push({
  id: "m12", nr: 12, del: "Del 4 · Database og frontend", ikon: "🗄️",
  titel: "SQL og databaser",
  dag: "Kursusdag 9 · Backend: SQL og SQL Server",
  intro: "Indtil nu har dine data levet i lister, som forsvinder, når programmet stopper. En **database** gemmer dem permanent, så mange brugere kan dele dem — og du taler med den i sproget **SQL**.\n\nEfter modulet kan du oprette tabeller, hente, rette og slette data, koble tabeller sammen med `JOIN`, tælle og lægge sammen med `GROUP BY` og forklare, hvad et godt databasedesign er. Det er fundamentet under Entity Framework og hele dit eksamensprojekt.",
  video: ["09_Tors_Backend.mp4 (2 t 17 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m12l1", titel: "Hvad er en database?", min: 16,
    ord: [
      ["Database", "En samling data, der er gemt permanent og organiseret, så den er let at søge i og ændre. Den overlever, at programmet lukkes."],
      ["Databasesystem (DBMS)", "Programmet, der passer på databasen og svarer på spørgsmål til den. Fx SQL Server eller SQLite."],
      ["SQL", "Structured Query Language: det sprog, man bruger til at oprette tabeller og hente, indsætte, rette og slette data."],
      ["Tabel", "Data om én slags ting, fx kunder, ordnet i rækker og kolonner. Svarer til en klasse."],
      ["Række", "Én ting i tabellen, fx én kunde. Svarer til ét objekt."],
      ["Kolonne", "Én oplysning, som alle rækker har, fx Navn. Har en fast datatype. Svarer til en property."],
      ["Primærnøgle (primary key)", "Den kolonne, der gør hver række unik — typisk `Id`. To rækker kan aldrig have samme primærnøgle."],
      ["IDENTITY", "SQL Server: databasen giver selv hver ny række det næste nummer (1, 2, 3 …). I SQLite hedder det AUTOINCREMENT."],
      ["LocalDB", "En lille udgave af SQL Server, der følger med Visual Studio. Kører kun på Windows."]
    ],
    trin: [
      { t: "laes", h: "Hvorfor en database?",
        md: "En `List<Kunde>` forsvinder, når programmet stopper. Du kunne gemme kunderne i en fil (modul 9), men det bliver hurtigt besværligt: hvordan finder du kunde nr. 40.000 hurtigt? Hvad sker der, når to brugere retter i filen samtidig?\n\nDet løser en **database**. Den gemmer data permanent, kan søge lynhurtigt og kan bruges af mange på én gang. Et **databasesystem** (DBMS) — fx **SQL Server** — passer på den. Du stiller spørgsmål til det i sproget **SQL**, og det svarer med data.",
        noter: [
          ["Database", "Selve dataene, gemt på disken."],
          ["Databasesystem", "Programmet, der passer på dataene: SQL Server, SQLite, MySQL, PostgreSQL …"],
          ["SQL", "Sproget, du taler med databasesystemet i. Udtales enten \"es-kju-el\" eller \"sequel\"."]
        ],
        md2: "Den slags database, du lærer her, hedder en **relationel database**: alle data ligger i **tabeller**." },
      { t: "laes", h: "Tabel, række og kolonne",
        md: "En tabel ligner et regneark. Her er tabellen `Kunder`:",
        sprog: "text",
        kode: R`Id  Navn   Bynavn     Email
--  -----  ---------  ------------
1   Anna   Aarhus     anna@mail.dk
2   Bo     Odense     NULL
3   Carl   Aarhus     carl@mail.dk`,
        noter: [
          ["Tabel", "`Kunder` — data om én slags ting. Det svarer til en **klasse** i C#."],
          ["Række", "Én kunde, fx `2  Bo  Odense`. Svarer til ét **objekt**."],
          ["Kolonne", "`Navn` — en oplysning, som **alle** rækker har. Svarer til en **property**. Hver kolonne har en fast datatype, fx tekst eller heltal."],
          ["NULL", "Bo har ingen e-mail. `NULL` betyder \"ingen værdi\". Det ser du nærmere på i lektion 3."]
        ],
        md2: "Sammenligningen med klasser er ikke tilfældig. Senere i kurset laver Entity Framework en klasse `Kunde` om til en tabel `Kunder` — helt automatisk." },
      { t: "valg", q: "I tabellen `Kunder` står `3  Carl  Aarhus  carl@mail.dk`. Hvad er det?",
        svar: ["En række — én kunde", "En kolonne", "En tabel", "En database"],
        ret: 0, fordi: "En vandret linje med alle oplysningerne om én kunde er en **række**. En kolonne er en lodret \"søjle\", fx alle kundernes navne." },
      { t: "laes", h: "Primærnøglen: hver række sit nummer",
        md: "Der kan godt være to kunder, der hedder Anna. Hvordan siger du så til databasen, **hvilken** Anna du mener?\n\nDerfor har hver tabel en **primærnøgle** (*primary key*): en kolonne, hvor værdien er **unik** og **aldrig ændres**. Næsten altid er det et tal, der hedder `Id`. Databasen nægter at gemme to rækker med samme primærnøgle.",
        noter: [
          ["Unik", "To rækker kan aldrig have samme Id."],
          ["Ændres aldrig", "Andre tabeller henviser til Id'et (lektion 4). Ændrede det sig, ville henvisningerne pege forkert."],
          ["Ikke Navn eller Email", "Navne er ikke unikke, og en e-mail kan skifte. Et tal, der intet betyder, er det sikreste."]
        ] },
      { t: "valg", q: "Tabellen `Elever` har kolonnerne `Id`, `Navn`, `Klasse` og `Email`. Hvilken er den bedste primærnøgle?",
        svar: ["Id — et tal, der er unikt og aldrig ændres", "Navn — det er det, man søger på", "Klasse — så eleverne grupperes", "Email — den er næsten altid unik"],
        ret: 0, fordi: "Navne kan gå igen, og mange elever går i samme klasse. En e-mail er tit unik, men den kan **ændres**, og så skal alle henvisninger rettes. Et `Id` uden anden betydning er det sikre valg." },
      { t: "laes", h: "To databasesystemer: SQL Server og SQLite",
        md: "På skolen bruger I **SQL Server**. På Windows følger en lille udgave med Visual Studio: **LocalDB**. Den findes ikke til Mac. Derfor bruger du på Mac **SQLite** — en database, der bare er én fil.\n\nSQL er næsten det samme i begge. Her er de få forskelle, du møder i modulet:",
        noter: [
          ["Automatisk nummer", "SQL Server: `INT IDENTITY(1,1)` · SQLite: `INTEGER PRIMARY KEY AUTOINCREMENT`"],
          ["Tekst", "SQL Server: `NVARCHAR(50)` · SQLite: `TEXT`"],
          ["De første 3 rækker", "SQL Server: `SELECT TOP 3 …` · SQLite: `SELECT … LIMIT 3`"],
          ["Fremmednøgler", "SQL Server tjekker dem altid · SQLite kun efter `PRAGMA foreign_keys = ON;` (lektion 4)"]
        ],
        md2: "Den SQL, der står i modulet, er skrevet til **SQL Server** (det er den, eksamen og skolen bruger). Hvor SQLite skal have noget andet, står Mac-udgaven ved siden af." },
      { t: "ide", h: "Opret databasen Butik",
        md: "Gennem hele modulet bygger du en database til en lille butik. Første skridt: en tom database.",
        win: [
          "Åbn Visual Studio. Du behøver ikke et projekt — vælg **Continue without code**, hvis du bliver spurgt.",
          "Klik på menuen **View → SQL Server Object Explorer**.",
          "Fold **SQL Server** ud, og derefter **(localdb)\\MSSQLLocalDB**. Står den ikke der, så klik på knappen **Add SQL Server** øverst i vinduet, og skriv `(localdb)\\MSSQLLocalDB` som server name.",
          "Højreklik på mappen **Databases**, og vælg **Add New Database**. Skriv navnet `Butik`, og klik **OK**.",
          "Højreklik på den nye database **Butik**, og vælg **New Query…**. Der åbner et vindue, hvor du kan skrive SQL. Det er her, du kører alt i modulet.",
          "Skriv `SELECT 1 + 1;` og klik på den grønne pil ▶ (**Execute**) øverst i vinduet. Nederst ser du resultatet: `2`."
        ],
        mac: [
          "Åbn Rider. Klik på menuen **View → Tool Windows → Database**.",
          "Klik på **+** i Database-vinduet, og vælg **Data Source → SQLite**.",
          "I feltet **File** skriver du stien til en ny fil, fx `butik.db` i din bruger-mappe. Findes filen ikke, opretter SQLite den, første gang Rider forbinder.",
          "Står der nederst i dialogen, at der mangler en driver, så klik på linket **Download missing driver files**.",
          "Klik **Test Connection** og derefter **OK**.",
          "Højreklik på den nye datakilde, og vælg **New → Query Console**. Det er her, du kører alt i modulet.",
          "Skriv `SELECT 1 + 1;` og klik på den grønne pil ▶ (**Execute**). Nederst ser du resultatet: `2`."
        ],
        md2: "Kan du ikke finde en menu, så brug søgefeltet øverst i {{Visual Studio||Rider}} og skriv navnet på vinduet." },
      { t: "laes", h: "CREATE TABLE: lav en tabel",
        md: "En tabel oprettes med `CREATE TABLE`. Du skriver tabellens navn og derefter hver kolonne: **navn, datatype og regler**. Kolonnerne adskilles med komma.",
        sprog: "sql",
        kode: R`-- SQL Server (Windows)
CREATE TABLE Kunder (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Navn NVARCHAR(50) NOT NULL,
    Bynavn NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NULL
);

-- SQLite (Mac)
CREATE TABLE Kunder (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Navn TEXT NOT NULL,
    Bynavn TEXT NOT NULL,
    Email TEXT NULL
);`,
        noter: [
          ["--", "En kommentar i SQL. Svarer til `//` i C#."],
          ["INT", "Heltal — som `int` i C#."],
          ["IDENTITY(1,1)", "Databasen nummererer selv: start ved 1, læg 1 til hver gang. Du skriver aldrig selv Id'et."],
          ["PRIMARY KEY", "Denne kolonne er primærnøglen."],
          ["NVARCHAR(50)", "Tekst på højst 50 tegn. N'et betyder, at alle tegn er tilladt, også æ, ø og å."],
          ["NOT NULL", "Kolonnen **skal** have en værdi. `NULL` betyder, at den må være tom."],
          [";", "Afslutter sætningen, som i C#."]
        ],
        md2: "SQL er **ikke** følsomt for store og små bogstaver i nøgleordene: `create table` virker også. Man skriver dem tit med store bogstaver, så de er lette at skelne fra navnene på tabeller og kolonner." },
      { t: "udfyld", sprog: "sql", q: "Opret tabellen `Produkter` i SQL Server. `Id` skal nummereres automatisk og være primærnøgle, og `Navn` må ikke være tom.",
        kode: R`[[CREATE TABLE|create table]] Produkter (
    Id INT IDENTITY(1,1) [[PRIMARY KEY|primary key]],
    Navn NVARCHAR(50) [[NOT NULL|not null]],
    Pris INT NOT NULL,
    Kategori NVARCHAR(30) NOT NULL
);`,
        fordi: "`CREATE TABLE` efterfulgt af navnet. `PRIMARY KEY` gør `Id` til primærnøgle, og `NOT NULL` betyder, at kolonnen skal have en værdi. (Priserne er hele kroner, så `INT` er nok. I lektion 6 ser du, hvad man bruger til ører.)" },
      { t: "fejl", sprog: "sql", q: "SQL Server nægter at køre sætningen og skriver: `Incorrect syntax near 'Bynavn'`. Hvilken linje er det, der mangler noget?",
        kode: R`CREATE TABLE Kunder (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Navn NVARCHAR(50) NOT NULL
    Bynavn NVARCHAR(50) NOT NULL
);`,
        linje: 3,
        fordi: "Der mangler et **komma** efter `NOT NULL` på linje 3. Uden kommaet tror SQL Server, at `Bynavn` hører til beskrivelsen af `Navn`, og derfor klager den over linje 4. Samme princip som i C#: fejlen bliver opdaget lidt efter det sted, hvor tegnet mangler.",
        rettet: R`CREATE TABLE Kunder (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Navn NVARCHAR(50) NOT NULL,
    Bynavn NVARCHAR(50) NOT NULL
);` },
      { t: "orden", sprog: "sql", q: "Sæt linjerne i rækkefølge, så de opretter tabellen `Kategorier` med en automatisk nummereret primærnøgle og et navn.",
        linjer: [R`CREATE TABLE Kategorier (`, R`    Id INT IDENTITY(1,1) PRIMARY KEY,`, R`    Navn NVARCHAR(30) NOT NULL`, R`);`],
        fordi: "Først `CREATE TABLE` og navnet med en åben parentes. Så kolonnerne, adskilt med komma — den sidste kolonne har **intet** komma. Til sidst lukkes parentesen, og sætningen afsluttes med semikolon." },
      { t: "ide", h: "Opret tabellerne Kunder og Produkter",
        md: "Skriv sætningerne i dit query-vindue i databasen **Butik**, og kør dem. Skriv dem selv — det er skrivningen, der får reglerne til at sidde.",
        sprog: "sql",
        kode: R`-- SQL Server (Windows)
CREATE TABLE Kunder (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Navn NVARCHAR(50) NOT NULL,
    Bynavn NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NULL
);

CREATE TABLE Produkter (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Navn NVARCHAR(50) NOT NULL,
    Pris INT NOT NULL,
    Kategori NVARCHAR(30) NOT NULL
);

-- SQLite (Mac)
CREATE TABLE Kunder (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Navn TEXT NOT NULL,
    Bynavn TEXT NOT NULL,
    Email TEXT NULL
);

CREATE TABLE Produkter (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Navn TEXT NOT NULL,
    Pris INTEGER NOT NULL,
    Kategori TEXT NOT NULL
);`,
        win: [
          "Skriv kun SQL Server-delen. Klik på den grønne pil ▶ (**Execute**). Er der tekst markeret, køres kun den markerede tekst.",
          "Nederst skal der stå, at kommandoerne blev udført uden fejl.",
          "I SQL Server Object Explorer: fold **Butik → Tables** ud. Kan du ikke se tabellerne, så klik på **Refresh**-knappen (de runde pile) øverst i vinduet.",
          "Fold **dbo.Kunder → Columns** ud, og tjek, at kolonnerne er der. `dbo` er bare den standardmappe, tabellerne ligger i."
        ],
        mac: [
          "Skriv kun SQLite-delen. Markér hele teksten med ⌘A, og klik på den grønne pil ▶ (**Execute**).",
          "Fold datakilden ud i Database-vinduet, og find **tables**. Kan du ikke se tabellerne, så klik på **Refresh**-knappen (de runde pile).",
          "Fold **Kunder** ud, og tjek, at kolonnerne er der."
        ],
        md2: "Får du en fejl om, at tabellen allerede findes, har du kørt sætningen to gange. Det gør ikke noget — tabellen er der." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er en primærnøgle, og hvorfor bruger man et `Id` i stedet for fx navnet?",
        svar: "En **primærnøgle** er den kolonne, der gør hver række i en tabel **unik**, så man altid kan pege på præcis én række. Databasen tillader ikke to rækker med samme værdi. Man bruger et **Id** — typisk et tal, som databasen selv tildeler med `IDENTITY` — fordi navne **ikke er unikke** og ting som e-mail kan **ændre sig**. Primærnøglen må aldrig ændres, fordi andre tabeller henviser til den.",
        noegle: ["unik", "række", "IDENTITY", "ændres aldrig", "henviser"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m12l2", titel: "Indsæt og hent: INSERT, SELECT og WHERE", min: 18,
    ord: [
      ["INSERT INTO", "Indsætter nye rækker i en tabel."],
      ["SELECT", "Henter data. Efter SELECT står de kolonner, du vil se — `*` betyder alle."],
      ["FROM", "Fortæller, hvilken tabel der hentes fra."],
      ["WHERE", "Filter: kun de rækker, hvor betingelsen er sand, kommer med."],
      ["ORDER BY", "Sorterer resultatet. `ASC` = stigende (standard), `DESC` = faldende."],
      ["TOP / LIMIT", "Kun de første n rækker. SQL Server: `SELECT TOP 3 …`. SQLite: `… LIMIT 3`."],
      ["LIKE", "Søger efter et mønster i tekst. `%` betyder \"hvad som helst\": `'K%'` = starter med K."],
      ["IN", "Er værdien en af disse? `Kategori IN ('Slik', 'Bageri')`."],
      ["BETWEEN", "Ligger værdien mellem to grænser? Begge grænser er med."]
    ],
    trin: [
      { t: "laes", h: "INSERT: læg rækker i tabellen",
        md: "Med `INSERT INTO` lægger du rækker i en tabel. Først kolonnernes navne, så `VALUES` og værdierne i **samme rækkefølge**. Du kan indsætte flere rækker på én gang ved at skille dem med komma.",
        sprog: "sql",
        kode: R`INSERT INTO Produkter (Navn, Pris, Kategori)
VALUES ('Kaffe', 45, 'Drikke');

INSERT INTO Produkter (Navn, Pris, Kategori) VALUES
    ('Te', 30, 'Drikke'),
    ('Juice', 15, 'Drikke');`,
        noter: [
          ["(Navn, Pris, Kategori)", "De kolonner, du giver værdier til. `Id` er ikke med — den sætter `IDENTITY` selv."],
          ["'Kaffe'", "Tekst står i **enkelte** anførselstegn i SQL. Dobbelte `\"` betyder noget andet."],
          ["45", "Tal står uden anførselstegn."],
          ["Komma mellem rækkerne", "Hver række har sin egen parentes."]
        ],
        md2: "Begge dele virker ens i SQL Server og SQLite. SQL Server svarer med en besked som `(1 row affected)` — én række påvirket." },
      { t: "udfyld", sprog: "sql", q: "Indsæt kunden Anna fra Aarhus i tabellen `Kunder`.",
        kode: R`[[INSERT INTO|insert into]] Kunder (Navn, Bynavn)
[[VALUES|values]] ([['Anna']], 'Aarhus');`,
        fordi: "`INSERT INTO` tabellen, kolonnerne i parentes, så `VALUES` og værdierne i samme rækkefølge. Tekst skal i enkelte anførselstegn: `'Anna'`. `Email` er ikke med, så den bliver `NULL`." },
      { t: "ide", h: "Fyld butikken med data",
        md: "Kør dette script i databasen **Butik**. Det virker ens i SQL Server og SQLite. Resten af modulet bruger præcis disse data, så skriv tallene rigtigt.\n\n{{Klik på ▶ uden at markere noget — så kører Visual Studio hele scriptet.||Markér hele scriptet med ⌘A, før du klikker på ▶. Uden markering kører Rider måske kun den sætning, markøren står i.}}",
        sprog: "sql",
        kode: R`INSERT INTO Kunder (Navn, Bynavn, Email) VALUES
    ('Anna', 'Aarhus', 'anna@mail.dk'),
    ('Bo', 'Odense', NULL),
    ('Carl', 'Aarhus', 'carl@mail.dk'),
    ('Dorte', 'Aalborg', NULL),
    ('Emil', 'København', 'emil@mail.dk');

INSERT INTO Produkter (Navn, Pris, Kategori) VALUES
    ('Kaffe', 45, 'Drikke'),
    ('Te', 30, 'Drikke'),
    ('Juice', 15, 'Drikke'),
    ('Brød', 40, 'Bageri'),
    ('Kage', 25, 'Bageri'),
    ('Bolle', 10, 'Bageri'),
    ('Chokolade', 20, 'Slik'),
    ('Lakrids', 12, 'Slik');

SELECT * FROM Produkter;`,
        output: "Id  Navn       Pris  Kategori\n--  ---------  ----  --------\n1   Kaffe      45    Drikke\n2   Te         30    Drikke\n3   Juice      15    Drikke\n4   Brød       40    Bageri\n5   Kage       25    Bageri\n6   Bolle      10    Bageri\n7   Chokolade  20    Slik\n8   Lakrids    12    Slik",
        md2: "Får produkterne andre Id'er (fx 9–16), har du kørt `INSERT` to gange. Så er det nemmest at slette tabellerne helt med `DROP TABLE Produkter;` og `DROP TABLE Kunder;`, oprette dem igen med `CREATE TABLE` fra lektion 1 og køre scriptet én gang. (Sletter du kun rækkerne, fortsætter numrene fra 17 — det ser du hvorfor i lektion 3.)" },
      { t: "laes", h: "SELECT: hent data",
        md: "`SELECT` henter data. Efter `SELECT` skriver du **hvilke kolonner**, efter `FROM` **hvilken tabel**. En stjerne `*` betyder \"alle kolonner\".",
        sprog: "sql",
        kode: R`SELECT Navn, Pris FROM Produkter;`,
        output: "Navn       Pris\n---------  ----\nKaffe      45\nTe         30\nJuice      15\nBrød       40\nKage       25\nBolle      10\nChokolade  20\nLakrids    12",
        noter: [
          ["SELECT Navn, Pris", "Kun disse to kolonner — i den rækkefølge, du skriver dem."],
          ["FROM Produkter", "Fra tabellen Produkter."]
        ],
        md2: "Resultatet af en `SELECT` er selv en lille tabel. I SQL kalder man en `SELECT` for en **forespørgsel** (*query*)." },
      { t: "valg", sprog: "sql", q: "Tabellen `Produkter` har 8 rækker og 4 kolonner (`Id`, `Navn`, `Pris`, `Kategori`). Hvad giver forespørgslen?",
        kode: R`SELECT Navn FROM Produkter;`,
        svar: ["8 rækker med 1 kolonne", "1 række med 8 kolonner", "8 rækker med 4 kolonner", "1 række med 1 kolonne"],
        ret: 0, fordi: "Uden `WHERE` kommer **alle** rækker med — men kun den kolonne, du har nævnt efter `SELECT`." },
      { t: "laes", h: "WHERE: kun de rækker, der passer",
        md: "`WHERE` er et filter. Kun de rækker, hvor betingelsen er sand, kommer med. Det svarer til en `if` for hver række.",
        sprog: "sql",
        kode: R`SELECT Navn, Pris FROM Produkter
WHERE Kategori = 'Drikke';`,
        output: "Navn   Pris\n-----  ----\nKaffe  45\nTe     30\nJuice  15",
        noter: [
          ["=", "Er lig med. **Ét** lighedstegn i SQL — ikke `==` som i C#."],
          ["<>", "Er **ikke** lig med (`!=` virker også i SQL Server)."],
          ["< > <= >=", "Mindre end, større end … som i C#."],
          ["AND / OR / NOT", "Og, eller, ikke. Svarer til `&&`, `||` og `!` i C#."]
        ] },
      { t: "valg", sprog: "sql", q: "Hvilke produkter giver forespørgslen?",
        kode: PRODUKTER + "\n\n" + R`SELECT Navn FROM Produkter
WHERE Pris > 20 AND Kategori = 'Bageri';`,
        svar: ["Brød og Kage", "Brød, Kage og Bolle", "Kaffe, Te, Brød og Kage", "Kun Brød"],
        ret: 0, fordi: "`AND` kræver, at **begge** betingelser er sande. Bageri-produkterne er Brød (40), Kage (25) og Bolle (10). Bolle koster ikke over 20, så den falder fra." },
      { t: "skriv", sprog: "sql", q: "Skriv en forespørgsel, der henter kolonnerne `Navn` og `Pris` fra tabellen `Produkter` — men kun produkter, der koster **under 30**.",
        tjek: [
          [/SELECT Navn,Pris FROM Produkter/i, "Hent `Navn` og `Pris` fra `Produkter`: `SELECT Navn, Pris FROM Produkter`"],
          [/WHERE Pris<30/i, "Filtrér med `WHERE Pris < 30`"],
          [/SELECT\*/i, "Hent kun de to kolonner — ikke `*`", "ikke"]
        ],
        forkert: ["SELECT * FROM Produkter WHERE Pris < 30;", "SELECT Navn, Pris FROM Produkter WHERE Pris > 30;"],
        loesning: R`SELECT Navn, Pris FROM Produkter
WHERE Pris < 30;`,
        fordi: "Resultatet er Juice, Kage, Bolle, Chokolade og Lakrids. Te koster præcis 30 og er derfor **ikke** under 30." },
      { t: "laes", h: "ORDER BY og TOP: sortér og begræns",
        md: "Uden `ORDER BY` lover databasen **ingen** bestemt rækkefølge. Vil du have en rækkefølge, skal du bede om den. `DESC` betyder faldende — størst først. Og `TOP 3` giver kun de første tre rækker.",
        sprog: "sql",
        kode: R`-- SQL Server (Windows)
SELECT TOP 3 Navn, Pris FROM Produkter
ORDER BY Pris DESC;

-- SQLite (Mac)
SELECT Navn, Pris FROM Produkter
ORDER BY Pris DESC
LIMIT 3;`,
        output: "Navn   Pris\n-----  ----\nKaffe  45\nBrød   40\nTe     30",
        noter: [
          ["ORDER BY Pris", "Sortér efter pris. Uden noget efter er det stigende (`ASC`)."],
          ["DESC", "Faldende: den dyreste først."],
          ["TOP 3", "SQL Server: kun de første 3 rækker — **efter** sorteringen. Står lige efter `SELECT`."],
          ["LIMIT 3", "SQLite: det samme, men står til sidst."]
        ],
        md2: "Kombineret giver det \"de 3 dyreste produkter\". Uden `ORDER BY` ville `TOP 3` bare give tre tilfældige rækker." },
      { t: "orden", sprog: "sql", q: "Sæt linjerne i rækkefølge, så forespørgslen henter navn og pris på alle drikkevarer, billigste først.",
        linjer: [R`SELECT Navn, Pris`, R`FROM Produkter`, R`WHERE Kategori = 'Drikke'`, R`ORDER BY Pris;`],
        fordi: "Delene af en forespørgsel har en **fast rækkefølge**: `SELECT` → `FROM` → `WHERE` → `ORDER BY`. Sorteringen kommer altid til sidst." },
      { t: "laes", h: "LIKE, IN og BETWEEN",
        md: "Tre små hjælpere til `WHERE`, som sparer dig for mange `OR` og `AND`:",
        sprog: "sql",
        kode: R`SELECT Navn FROM Produkter WHERE Navn LIKE 'K%';
-- Kaffe, Kage

SELECT Navn FROM Produkter WHERE Kategori IN ('Bageri', 'Slik');
-- Brød, Kage, Bolle, Chokolade, Lakrids

SELECT Navn FROM Produkter WHERE Pris BETWEEN 20 AND 30;
-- Te (30), Kage (25), Chokolade (20)`,
        noter: [
          ["LIKE 'K%'", "Tekst, der starter med K. `%` betyder \"hvad som helst, også ingenting\". `'%e'` slutter på e, `'%af%'` indeholder \"af\"."],
          ["IN ('Bageri', 'Slik')", "Er værdien en af dem i listen? Kortere end `Kategori = 'Bageri' OR Kategori = 'Slik'`."],
          ["BETWEEN 20 AND 30", "Mellem 20 og 30 — **begge grænser er med**. Samme som `Pris >= 20 AND Pris <= 30`."]
        ] },
      { t: "valg", sprog: "sql", q: "Hvor mange produkter giver forespørgslen?",
        kode: PRODUKTER + "\n\n" + R`SELECT Navn FROM Produkter
WHERE Pris BETWEEN 12 AND 25;`,
        svar: ["4: Juice, Kage, Chokolade og Lakrids", "2: Juice og Chokolade", "3: Juice, Kage og Chokolade", "5: Juice, Kage, Bolle, Chokolade og Lakrids"],
        ret: 0, fordi: "`BETWEEN` tager **begge grænser** med. Lakrids koster præcis 12, og Kage præcis 25 — begge er med. Bolle (10) er under grænsen." },
      { t: "skriv", sprog: "sql", q: "Skriv en forespørgsel, der henter `Navn` fra tabellen `Produkter` for alle produkter, hvis navn **starter med B**.",
        tjek: [
          [/SELECT Navn FROM Produkter/i, "Hent `Navn` fra `Produkter`"],
          [/WHERE Navn LIKE ?'B%'/i, "Brug `WHERE Navn LIKE 'B%'`"],
          [/Navn='B/i, "`=` sammenligner hele teksten. Til mønstre skal du bruge `LIKE`", "ikke"]
        ],
        forkert: ["SELECT Navn FROM Produkter WHERE Navn = 'B%';", "SELECT Navn FROM Produkter WHERE Navn LIKE '%B';"],
        loesning: R`SELECT Navn FROM Produkter
WHERE Navn LIKE 'B%';`,
        fordi: "Resultatet er Brød og Bolle. `%` står **efter** B, fordi resten af navnet må være hvad som helst." },
      { t: "forklar", q: "Forklar med dine egne ord, hvad de fire dele af denne forespørgsel gør, og i hvilken rækkefølge de skal stå: `SELECT Navn, Pris FROM Produkter WHERE Pris < 30 ORDER BY Pris DESC`.",
        svar: "`SELECT Navn, Pris` bestemmer, **hvilke kolonner** der kommer med i resultatet. `FROM Produkter` siger, **hvilken tabel** der hentes fra. `WHERE Pris < 30` er et **filter**, så kun rækker, hvor betingelsen er sand, kommer med. `ORDER BY Pris DESC` **sorterer** resultatet faldende. Rækkefølgen er fast: SELECT, FROM, WHERE og til sidst ORDER BY. Uden ORDER BY er rækkefølgen ikke garanteret.",
        noegle: ["kolonner", "tabel", "filter", "sorterer", "rækkefølge"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m12l3", titel: "Ret og slet: UPDATE, DELETE og NULL", min: 17,
    ord: [
      ["UPDATE", "Ændrer værdier i rækker, der findes i forvejen. `SET` siger, hvad der skal ændres."],
      ["DELETE", "Sletter rækker. Uden `WHERE` slettes alle rækker i tabellen."],
      ["NULL", "\"Ingen værdi\". Ikke det samme som 0 eller tom tekst."],
      ["IS NULL / IS NOT NULL", "Den eneste rigtige måde at teste for NULL. `= NULL` virker ikke."],
      ["SELECT INTO", "SQL Server: laver en ny tabel med resultatet af en SELECT. Fx til en kopi at øve på."]
    ],
    trin: [
      { t: "laes", h: "UPDATE: ret i rækker, der findes",
        md: "`UPDATE` ændrer data, som allerede ligger i tabellen. `SET` siger, **hvad** der skal ændres, og `WHERE` siger, **hvilke rækker**. Du kan ændre flere kolonner på én gang og regne med den gamle værdi.",
        sprog: "sql",
        kode: R`UPDATE Produkter
SET Pris = 35, Kategori = 'Te og kaffe'
WHERE Id = 2;

UPDATE Produkter
SET Pris = Pris + 5
WHERE Kategori = 'Drikke';`,
        noter: [
          ["SET Pris = 35, Kategori = …", "To kolonner ændres. Komma imellem."],
          ["WHERE Id = 2", "Kun rækken med Id 2. Primærnøglen er den sikreste måde at ramme præcis én række på."],
          ["SET Pris = Pris + 5", "Den nye pris er den gamle plus 5 — for **hver** række, der passer på `WHERE`. Ligesom `pris += 5` i C#."]
        ],
        md2: "Den første sætning ændrer én række. Den anden ændrer alle drikkevarer på én gang. Det er styrken i SQL: du beskriver **hvilke** rækker — databasen klarer løkken.\n\n**Kør ikke eksemplerne i denne lektion på butikkens data.** Resten af modulet regner med, at dataene er urørte. Sidst i lektionen laver du en kopi af tabellen, som du kan øve dig på." },
      { t: "udfyld", sprog: "sql", q: "Sæt prisen på produktet med Id 5 til 28.",
        kode: R`[[UPDATE|update]] Produkter
[[SET|set]] Pris = 28
[[WHERE|where]] Id = 5;`,
        fordi: "`UPDATE` tabellen, `SET` den nye værdi, `WHERE` for at vælge rækken. Glemmer du `WHERE`, får **alle** produkter prisen 28." },
      { t: "spor", sprog: "sql", slut: false,
        q: "Tabellen `Produkter` har 8 rækker. Kaffe koster 45, og Te koster 30. Begge er i kategorien `'Drikke'`. Det billigste produkt er Bolle til 10, det næstbilligste Lakrids til 12. Følg sætningerne, og skriv efter hver linje Kaffes pris, Tes pris og antallet af rækker.",
        kode: R`UPDATE Produkter SET Pris = 50 WHERE Navn = 'Kaffe';
UPDATE Produkter SET Pris = Pris + 5 WHERE Kategori = 'Drikke';
DELETE FROM Produkter WHERE Pris < 12;
INSERT INTO Produkter (Navn, Pris, Kategori) VALUES ('Is', 25, 'Slik');
UPDATE Produkter SET Pris = Pris * 2 WHERE Pris > 50;`,
        kolonner: ["Kaffes pris", "Tes pris", "Antal rækker"],
        raekker: [[1, "=50", "=30", "=8"], [2, "55", "35", "8"], [3, "55", "35", "7"], [4, "55", "35", "8"], [5, "110", "35", "8"]],
        fordi: "Linje 2 lægger 5 til **alle** drikkevarer. Linje 3 sletter kun Bolle — Lakrids koster præcis 12 og er ikke **under** 12. Linje 4 tilføjer en række. Linje 5 rammer kun rækker over 50: det er kun Kaffe (55), som bliver 110." },
      { t: "laes", h: "DELETE — og den glemte WHERE",
        md: "`DELETE FROM` sletter rækker. Med `WHERE` vælger du hvilke. **Uden** `WHERE` slettes **alle** rækker i tabellen — og der er ingen papirkurv og ingen Fortryd.",
        sprog: "sql",
        kode: R`-- Først: se, hvilke rækker der bliver ramt
SELECT * FROM Produkter WHERE Kategori = 'Slik';

-- Så: slet præcis de samme rækker
DELETE FROM Produkter WHERE Kategori = 'Slik';`,
        noter: [
          ["SELECT først", "Kør en `SELECT` med **samme** `WHERE`. Så ser du præcis, hvad du er ved at slette."],
          ["DELETE FROM … WHERE …", "Skift `SELECT *` ud med `DELETE` — resten af linjen er den samme."],
          ["DELETE FROM Produkter;", "Uden WHERE: tabellen tømmes. Selve tabellen findes stadig, men den er tom."]
        ],
        md2: "Samme fare gælder `UPDATE`: `UPDATE Produkter SET Pris = 0;` gør **alle** produkter gratis. Vanen \"SELECT først, så UPDATE/DELETE\" redder dig fra de fleste ulykker." },
      { t: "fejl", sprog: "sql", logisk: true,
        q: "Meningen var kun at sætte prisen på Te ned til 25. Sætningen kører uden fejl, men bagefter koster **alle** produkter 25. Hvilken linje er skyld i det?",
        kode: R`UPDATE Produkter
SET Pris = 25;
SELECT Navn, Pris FROM Produkter WHERE Navn = 'Te';`,
        linje: 2,
        fordi: "`UPDATE`-sætningen slutter på linje 2 med et semikolon — **uden** `WHERE`. Så rammer den alle rækker. `WHERE` på linje 3 hører til en helt anden sætning, nemlig `SELECT`'en.",
        rettet: R`UPDATE Produkter
SET Pris = 25
WHERE Navn = 'Te';
SELECT Navn, Pris FROM Produkter WHERE Navn = 'Te';` },
      { t: "laes", h: "NULL: der er ingen værdi",
        md: "Bo og Dorte har ingen e-mail. Deres `Email` er `NULL` — **ingen værdi**. Det er ikke det samme som tom tekst `''` eller tallet 0. Det betyder \"ukendt\" eller \"mangler\".\n\nNULL har én faldgrube: `= NULL` er **aldrig** sandt, heller ikke når værdien er NULL. Du skal skrive `IS NULL`.",
        sprog: "sql",
        kode: R`SELECT Navn, Email FROM Kunder
WHERE Email IS NULL;`,
        output: "Navn   Email\n-----  -----\nBo     NULL\nDorte  NULL",
        noter: [
          ["IS NULL", "Rækker, hvor kolonnen ingen værdi har."],
          ["IS NOT NULL", "Rækker, hvor kolonnen har en værdi."],
          ["= NULL", "Giver altid **nul** rækker. Ingen fejl — bare et tomt resultat. Derfor er fejlen svær at opdage."],
          ["Mac", "Rider viser en NULL-værdi som `<null>` i resultatet."]
        ],
        md2: "Hvorfor? \"Er den ukendte værdi lig med en anden ukendt værdi?\" Svaret er hverken ja eller nej, men \"ukendt\" — og `WHERE` tager kun rækker med, hvor svaret er ja." },
      { t: "valg", sprog: "sql", q: "Tabellen `Kunder` har 5 rækker. To af dem har `NULL` i kolonnen `Email`. Hvor mange rækker giver forespørgslen?",
        kode: R`SELECT Navn FROM Kunder
WHERE Email = NULL;`,
        svar: ["0 rækker", "2 rækker", "3 rækker", "SQL Server giver en fejl"],
        ret: 0, fordi: "`= NULL` er aldrig sandt, så **ingen** rækker kommer med — og der kommer heller ingen fejl. Det rigtige er `WHERE Email IS NULL`, som giver de 2 rækker." },
      { t: "skriv", sprog: "sql", q: "Skriv en forespørgsel, der henter `Navn` fra tabellen `Kunder` for alle kunder, der **har** en e-mail (kolonnen `Email` er ikke NULL).",
        tjek: [
          [/SELECT Navn FROM Kunder/i, "Hent `Navn` fra `Kunder`"],
          [/WHERE Email IS NOT NULL/i, "Brug `WHERE Email IS NOT NULL`"],
          [/Email(<>|!=|=)NULL/i, "Sammenlign ikke med `=` eller `<>` — brug `IS NOT NULL`", "ikke"]
        ],
        forkert: ["SELECT Navn FROM Kunder WHERE Email <> NULL;", "SELECT Navn FROM Kunder WHERE Email IS NULL;"],
        loesning: R`SELECT Navn FROM Kunder
WHERE Email IS NOT NULL;`,
        fordi: "Resultatet er Anna, Carl og Emil. `<> NULL` ville give nul rækker af samme grund som `= NULL`." },
      { t: "laes", h: "IDENTITY tæller altid videre",
        md: "Når du sletter en række, bliver dens `Id` **ikke** genbrugt. Den næste række får det næste nummer i rækken, også selvom der nu er et hul. Det er med vilje: et gammelt Id kan stadig stå i en e-mail, en faktura eller en anden tabel, og det må ikke pludselig pege på en ny ting.",
        noter: [
          ["SQL Server", "`IDENTITY` genbruger aldrig et nummer."],
          ["SQLite", "Med `AUTOINCREMENT` genbruges et nummer aldrig. Uden `AUTOINCREMENT` kan SQLite genbruge det højeste nummer, hvis den sidste række blev slettet — derfor skrev du `AUTOINCREMENT` i lektion 1."],
          ["Huller er normale", "Id 1, 2, 4, 7 er helt i orden. Id er et navneskilt, ikke en tæller."]
        ] },
      { t: "spor", sprog: "sql", slut: false,
        q: "Følg sætningerne, og skriv efter hver linje, hvor mange rækker tabellen `Noter` har, og hvad det **højeste** Id i tabellen er. Skriv – hvis der ikke er nogen rækker.",
        kode: R`CREATE TABLE Noter (Id INT IDENTITY(1,1) PRIMARY KEY, Tekst NVARCHAR(50));
INSERT INTO Noter (Tekst) VALUES ('a');
INSERT INTO Noter (Tekst) VALUES ('b');
INSERT INTO Noter (Tekst) VALUES ('c');
DELETE FROM Noter WHERE Id = 3;
INSERT INTO Noter (Tekst) VALUES ('d');
UPDATE Noter SET Tekst = 'x' WHERE Id = 1;`,
        kolonner: ["Antal rækker", "Højeste Id"],
        raekker: [[1, "=0", "=–"], [2, "=1", "=1"], [3, "2", "2"], [4, "3", "3"], [5, "2", "2"], [6, "3", "4"], [7, "3", "4"]],
        fordi: "Efter linje 5 er Id 3 væk, og det højeste er 2. Men linje 6 giver den nye række Id **4**, ikke 3 — IDENTITY har allerede brugt 3. `UPDATE` på linje 7 ændrer kun teksten; antallet og Id'erne er de samme." },
      { t: "ide", h: "Øv dig på en kopi",
        md: "UPDATE og DELETE ændrer dine data for altid. Øv dig derfor på en **kopi** af tabellen, så de rigtige data er urørte til resten af modulet.",
        sprog: "sql",
        kode: R`-- SQL Server (Windows): lav kopien
SELECT * INTO ProdukterKopi FROM Produkter;

-- SQLite (Mac): lav kopien
CREATE TABLE ProdukterKopi AS SELECT * FROM Produkter;

-- Begge: øv dig
SELECT * FROM ProdukterKopi WHERE Kategori = 'Bageri';
UPDATE ProdukterKopi SET Pris = Pris + 10 WHERE Kategori = 'Bageri';
SELECT * FROM ProdukterKopi WHERE Kategori = 'Bageri';

SELECT * FROM ProdukterKopi WHERE Pris < 15;
DELETE FROM ProdukterKopi WHERE Pris < 15;
SELECT * FROM ProdukterKopi;

-- Begge: ryd op til sidst
DROP TABLE ProdukterKopi;`,
        md2: "Kør én sætning ad gangen: markér den, og klik ▶. Se resultatet, før du kører den næste. Prøv selv: sæt alle drikkevarer 10 % op med `SET Pris = Pris * 110 / 100`. `DROP TABLE` sletter hele tabellen — ikke kun rækkerne." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvorfor er en `UPDATE` eller `DELETE` uden `WHERE` farlig, og hvordan undgår man ulykken?",
        svar: "`WHERE` bestemmer, **hvilke rækker** sætningen rammer. Uden `WHERE` rammer `UPDATE` og `DELETE` **alle rækker** i tabellen, og der er ingen fortryd. Man undgår det ved **først at køre en SELECT med samme WHERE**, så man ser præcis de rækker, der bliver ramt, og ved helst at ramme én række via **primærnøglen**, fx `WHERE Id = 7`.",
        noegle: ["WHERE", "alle rækker", "fortryd", "SELECT først", "primærnøgle"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m12l4", titel: "Relationer: fremmednøgler og JOIN", min: 19,
    ord: [
      ["Relation", "En forbindelse mellem to tabeller, fx at en ordre hører til en kunde."],
      ["Fremmednøgle (foreign key)", "En kolonne, der indeholder primærnøglen fra en anden tabel. Databasen sikrer, at den peger på en række, der findes."],
      ["En-til-mange", "Én række i den ene tabel hører sammen med mange i den anden: én kunde har mange ordrer. Fremmednøglen ligger på mange-siden."],
      ["Mange-til-mange", "Mange på begge sider: en ordre har mange produkter, et produkt er på mange ordrer. Kræver en koblingstabel."],
      ["Koblingstabel", "En tabel, der kun forbinder to andre tabeller med to fremmednøgler. Også kaldet junction table."],
      ["INNER JOIN", "Sætter rækker fra to tabeller sammen, hvor betingelsen efter ON passer. Rækker uden match kommer ikke med."],
      ["LEFT JOIN", "Som INNER JOIN, men alle rækker fra den venstre tabel kommer med. Mangler der et match, bliver kolonnerne fra højre NULL."],
      ["Alias", "Et kort kaldenavn til en tabel i en forespørgsel: `FROM Kunder k`."]
    ],
    trin: [
      { t: "laes", h: "Hvorfor flere tabeller?",
        md: "En butik skal gemme **ordrer**. Man kunne skrive kundens navn og by på hver ordre. Men så står \"Anna, Aarhus\" på alle Annas ordrer — og flytter hun, skal det rettes mange steder. Glemmer man ét, er dataene modstridende.\n\nI stedet får ordren kun kundens **Id**. Navn og by står ét sted: i `Kunder`.",
        sprog: "text",
        kode: R`Kunder                    Ordrer
Id  Navn   Bynavn         Id  KundeId  Dato
1   Anna   Aarhus         1   1        2026-09-01
2   Bo     Odense         2   3        2026-09-02
3   Carl   Aarhus         3   1        2026-09-05
                          4   2        2026-09-07`,
        noter: [
          ["Ordrer.KundeId", "En **fremmednøgle**: den indeholder en primærnøgle fra en **anden** tabel."],
          ["Ordre 1 og 3 har KundeId 1", "Begge er Annas. Én kunde — mange ordrer. Det hedder en **en-til-mange**-relation."],
          ["Mange-siden", "Fremmednøglen står altid på **mange**-siden (ordren), aldrig på en-siden (kunden)."]
        ] },
      { t: "laes", h: "Fremmednøglen i SQL",
        md: "Du siger til databasen, at `KundeId` **skal** pege på en kunde, der findes. Så nægter den at gemme en ordre til en kunde, der ikke er der.",
        sprog: "sql",
        kode: R`-- SQL Server (Windows)
CREATE TABLE Ordrer (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    KundeId INT NOT NULL,
    Dato DATE NOT NULL,
    FOREIGN KEY (KundeId) REFERENCES Kunder(Id)
);

-- SQLite (Mac): slå først tjek af fremmednøgler til
PRAGMA foreign_keys = ON;
CREATE TABLE Ordrer (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    KundeId INTEGER NOT NULL,
    Dato DATE NOT NULL,
    FOREIGN KEY (KundeId) REFERENCES Kunder(Id)
);`,
        noter: [
          ["DATE", "En dato. Skrives som tekst på formen `'2026-09-01'` (år-måned-dag)."],
          ["FOREIGN KEY (KundeId)", "Kolonnen `KundeId` i denne tabel er en fremmednøgle …"],
          ["REFERENCES Kunder(Id)", "… der peger på kolonnen `Id` i tabellen `Kunder`."],
          ["PRAGMA foreign_keys = ON;", "Kun SQLite: uden den linje gemmer SQLite reglen, men tjekker den ikke. Den skal køres, hver gang du forbinder."]
        ] },
      { t: "valg", q: "En læge har mange patienter, men hver patient har kun én læge. I hvilken tabel skal fremmednøglen stå?",
        svar: ["I Patienter: en kolonne LaegeId", "I Laeger: en kolonne PatientId", "I begge tabeller", "Den skal ikke stå nogen af stederne"],
        ret: 0, fordi: "Fremmednøglen står på **mange**-siden. Hver patient har præcis én læge, så patienten kan have ét `LaegeId`. En `PatientId` i `Laeger` kunne kun pege på én patient — men lægen har mange." },
      { t: "fejl", sprog: "sql", q: "Tabellen `Kunder` har kunderne med Id 1 til 5. Én af sætningerne bliver afvist med `The INSERT statement conflicted with the FOREIGN KEY constraint`. Hvilken linje?",
        kode: R`INSERT INTO Ordrer (KundeId, Dato) VALUES (1, '2026-09-10');
INSERT INTO Ordrer (KundeId, Dato) VALUES (5, '2026-09-11');
INSERT INTO Ordrer (KundeId, Dato) VALUES (99, '2026-09-12');
INSERT INTO Ordrer (KundeId, Dato) VALUES (3, '2026-09-13');`,
        linje: 3,
        fordi: "Der findes ingen kunde med Id 99. Fremmednøglen forhindrer en ordre, der ikke hører til nogen. Det er hele idéen: databasen passer selv på, at dataene hænger sammen. (De andre tre sætninger bliver udført, for i SQL Server kører hver sætning for sig.)" },
      { t: "laes", h: "INNER JOIN: sæt tabellerne sammen igen",
        md: "Nu står kundens navn ét sted og ordren et andet. Med `JOIN` sætter du dem sammen i ét resultat. Efter `ON` skriver du, **hvordan** rækkerne passer sammen: ordrens `KundeId` skal være lig med kundens `Id`.",
        sprog: "sql",
        kode: R`SELECT Ordrer.Id, Kunder.Navn, Ordrer.Dato
FROM Ordrer
INNER JOIN Kunder ON Ordrer.KundeId = Kunder.Id
ORDER BY Ordrer.Id;`,
        output: "Id  Navn  Dato\n--  ----  ----------\n1   Anna  2026-09-01\n2   Carl  2026-09-02\n3   Anna  2026-09-05\n4   Bo    2026-09-07",
        noter: [
          ["Ordrer.Id", "Kolonnen `Id` fra tabellen `Ordrer`. Begge tabeller har en `Id`, så du skal sige hvilken."],
          ["INNER JOIN Kunder", "Sæt hver ordre sammen med en kunde …"],
          ["ON Ordrer.KundeId = Kunder.Id", "… nemlig den kunde, hvis Id står i ordrens KundeId."]
        ],
        md2: "Det bliver hurtigt langt. Derfor giver man tabellerne et **alias** — et kort kaldenavn: `FROM Ordrer o INNER JOIN Kunder k ON o.KundeId = k.Id`. Så kan du skrive `o.Id` og `k.Navn`. Resten af modulet bruger aliasser." },
      { t: "udfyld", sprog: "sql", q: "Vis hver ordres Id sammen med kundens navn. Tabellerne har aliasserne `o` og `k`.",
        kode: R`SELECT o.Id, k.Navn
FROM Ordrer o
INNER [[JOIN|join]] Kunder k [[ON|on]] o.[[KundeId]] = k.Id;`,
        fordi: "`INNER JOIN` den anden tabel, og efter `ON` betingelsen: fremmednøglen `o.KundeId` skal være lig med primærnøglen `k.Id`." },
      { t: "valg", sprog: "sql", q: "`Kunder` har 5 kunder: Anna, Bo, Carl, Dorte og Emil. `Ordrer` har 4 ordrer: to til Anna, én til Bo og én til Carl. Hvor mange rækker giver forespørgslen?",
        kode: R`SELECT k.Navn, o.Dato
FROM Kunder k
INNER JOIN Ordrer o ON o.KundeId = k.Id;`,
        svar: ["4 — én pr. ordre. Dorte og Emil kommer ikke med", "5 — én pr. kunde", "6 — alle kunder plus de ekstra ordrer", "3 — én pr. kunde, der har handlet"],
        ret: 0, fordi: "`INNER JOIN` giver én række for hvert **par**, der passer sammen. Anna passer med to ordrer og står derfor to gange. Kunder **uden** ordrer har ingen at blive parret med — de falder ud." },
      { t: "laes", h: "LEFT JOIN: tag alle med fra venstre",
        md: "Tit vil du se **alle** kunder — også dem, der ikke har handlet. Så bruger du `LEFT JOIN`. Alle rækker fra tabellen til **venstre** for `JOIN` kommer med. Har en række ikke noget match, bliver kolonnerne fra den højre tabel `NULL`.",
        sprog: "sql",
        kode: R`SELECT k.Navn, o.Id AS OrdreId, o.Dato
FROM Kunder k
LEFT JOIN Ordrer o ON o.KundeId = k.Id
ORDER BY k.Navn, o.Id;`,
        output: "Navn   OrdreId  Dato\n-----  -------  ----------\nAnna   1        2026-09-01\nAnna   3        2026-09-05\nBo     4        2026-09-07\nCarl   2        2026-09-02\nDorte  NULL     NULL\nEmil   NULL     NULL",
        noter: [
          ["Kunder k LEFT JOIN Ordrer o", "`Kunder` står til venstre — alle kunder kommer med."],
          ["o.Id AS OrdreId", "`AS` giver kolonnen et nyt navn i resultatet."],
          ["NULL", "Dorte og Emil har ingen ordrer, så ordre-kolonnerne er tomme."]
        ],
        md2: "Et klassisk trick: **kunder uden ordrer** findes med `LEFT JOIN` og `WHERE o.Id IS NULL`. Resultatet er Dorte og Emil." },
      { t: "skriv", sprog: "sql", q: "Skriv en forespørgsel, der viser `Navn` fra `Kunder` og `Dato` fra `Ordrer` for **alle** kunder — også dem uden ordrer. Giv tabellerne aliasserne `k` og `o`, og lad `Kunder` stå først.",
        tjek: [
          [/SELECT k\.Navn,o\.Dato/i, "Vis `k.Navn` og `o.Dato`"],
          [/FROM Kunder( AS)? k LEFT( OUTER)? JOIN Ordrer( AS)? o/i, "Start fra `Kunder k`, og brug `LEFT JOIN Ordrer o`"],
          [/ON (o\.KundeId=k\.Id|k\.Id=o\.KundeId)/i, "Kobl dem med `ON o.KundeId = k.Id`"]
        ],
        forkert: ["SELECT k.Navn, o.Dato FROM Kunder k INNER JOIN Ordrer o ON o.KundeId = k.Id;", "SELECT k.Navn, o.Dato FROM Kunder k LEFT JOIN Ordrer o ON o.Id = k.Id;"],
        loesning: R`SELECT k.Navn, o.Dato
FROM Kunder k
LEFT JOIN Ordrer o ON o.KundeId = k.Id;`,
        fordi: "Med `INNER JOIN` ville Dorte og Emil forsvinde. Og `ON o.Id = k.Id` ville parre ordre nr. 1 med kunde nr. 1 — tallene ligner hinanden, men betyder noget helt forskelligt." },
      { t: "laes", h: "Mange-til-mange: koblingstabellen",
        md: "En ordre kan have **mange** produkter, og et produkt kan være på **mange** ordrer. Det er en **mange-til-mange**-relation. Den kan ikke laves med én fremmednøgle — så skal der en **koblingstabel** imellem. Hver række i den siger: \"denne ordre har dette produkt, så mange stk.\"",
        sprog: "sql",
        kode: R`CREATE TABLE OrdreLinjer (
    OrdreId INT NOT NULL,
    ProduktId INT NOT NULL,
    Antal INT NOT NULL,
    PRIMARY KEY (OrdreId, ProduktId),
    FOREIGN KEY (OrdreId) REFERENCES Ordrer(Id),
    FOREIGN KEY (ProduktId) REFERENCES Produkter(Id)
);`,
        noter: [
          ["To fremmednøgler", "Én til hver af de tabeller, der skal kobles."],
          ["PRIMARY KEY (OrdreId, ProduktId)", "En **sammensat** primærnøgle: kombinationen skal være unik. Samme produkt kan ikke stå to gange på samme ordre — så hæver man `Antal` i stedet."],
          ["Antal", "En koblingstabel må gerne have ekstra oplysninger om selve forbindelsen."]
        ],
        md2: "Den samme sætning virker i SQLite (husk `PRAGMA foreign_keys = ON;`). Mange-til-mange er altid to en-til-mange-relationer: Ordrer → OrdreLinjer ← Produkter." },
      { t: "orden", sprog: "sql", q: "Sæt linjerne i rækkefølge, så forespørgslen viser ordre-id, produktnavn og antal for alle ordrelinjer ved at koble to tabeller.",
        linjer: [R`SELECT ol.OrdreId, p.Navn, ol.Antal`, R`FROM OrdreLinjer ol`, R`INNER JOIN Produkter p ON ol.ProduktId = p.Id`, R`ORDER BY ol.OrdreId, p.Navn;`],
        fordi: "`SELECT` → `FROM` → `JOIN … ON …` → `ORDER BY`. En `JOIN` hører til `FROM`-delen, så den står lige efter `FROM` og før `WHERE` og `ORDER BY`." },
      { t: "ide", h: "Ordrer i butikken",
        md: "Opret de to nye tabeller i **Butik** — `Ordrer` fra trinnet om fremmednøgler og `OrdreLinjer` fra trinnet om koblingstabeller. Fyld dem så med dette script, og kør forespørgslen, der kobler alle fire tabeller.{{||\n\nMarkér hele scriptet med ⌘A, før du klikker på ▶ — ellers kører Rider måske kun én af sætningerne.}}",
        sprog: "sql",
        kode: R`INSERT INTO Ordrer (KundeId, Dato) VALUES
    (1, '2026-09-01'),
    (3, '2026-09-02'),
    (1, '2026-09-05'),
    (2, '2026-09-07');

INSERT INTO OrdreLinjer (OrdreId, ProduktId, Antal) VALUES
    (1, 1, 2),
    (1, 4, 1),
    (2, 2, 1),
    (3, 1, 1),
    (3, 7, 3),
    (4, 5, 2);

SELECT k.Navn AS Kunde, p.Navn AS Produkt, ol.Antal
FROM Kunder k
INNER JOIN Ordrer o ON o.KundeId = k.Id
INNER JOIN OrdreLinjer ol ON ol.OrdreId = o.Id
INNER JOIN Produkter p ON p.Id = ol.ProduktId
WHERE k.Navn = 'Anna'
ORDER BY o.Dato, p.Navn;`,
        output: "Kunde  Produkt    Antal\n-----  ---------  -----\nAnna   Brød       1\nAnna   Kaffe      2\nAnna   Chokolade  3\nAnna   Kaffe      1",
        md2: "Læs forespørgslen som en kæde: kunde → kundens ordrer → ordrernes linjer → linjernes produkter. Hver `JOIN` tager ét skridt. Får du en fejl om FOREIGN KEY, er dine Id'er i `Kunder` eller `Produkter` ikke 1–5 og 1–8 — tjek dem med `SELECT * FROM …`." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er en fremmednøgle, og hvordan laver man en en-til-mange- og en mange-til-mange-relation?",
        svar: "En **fremmednøgle** er en kolonne, der indeholder **primærnøglen fra en anden tabel**, og databasen sikrer, at den peger på en række, der findes. En **en-til-mange**-relation laves ved at sætte fremmednøglen på **mange-siden** — fx `KundeId` i `Ordrer`, fordi én kunde har mange ordrer. En **mange-til-mange**-relation kræver en **koblingstabel** med to fremmednøgler, fx `OrdreLinjer` med `OrdreId` og `ProduktId`. Man henter dataene sammen igen med `JOIN`.",
        noegle: ["primærnøglen fra en anden tabel", "mange-siden", "koblingstabel", "to fremmednøgler", "JOIN"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m12l5", titel: "Tæl og læg sammen: GROUP BY og HAVING", min: 17,
    ord: [
      ["Aggregatfunktion", "En funktion, der laver mange rækker om til én værdi: COUNT, SUM, AVG, MIN, MAX."],
      ["COUNT", "`COUNT(*)` tæller rækker. `COUNT(kolonne)` tæller kun rækker, hvor kolonnen ikke er NULL."],
      ["SUM / AVG", "Summen og gennemsnittet af en kolonne."],
      ["MIN / MAX", "Den mindste og den største værdi i en kolonne."],
      ["AS", "Giver en kolonne i resultatet et navn: `COUNT(*) AS Antal`."],
      ["GROUP BY", "Deler rækkerne op i grupper med samme værdi og giver én resultat-række pr. gruppe."],
      ["HAVING", "Filter på grupperne — efter GROUP BY. WHERE filtrerer rækkerne før grupperingen."]
    ],
    trin: [
      { t: "laes", h: "Aggregatfunktioner: mange rækker bliver til én",
        md: "Tit vil du ikke se rækkerne, men et **tal om dem**: hvor mange, hvor meget i alt, hvad er gennemsnittet? Det klarer **aggregatfunktionerne**. Du kender dem fra LINQ i modul 9: `Count()`, `Sum()`, `Average()`, `Min()`, `Max()`.",
        sprog: "sql",
        kode: R`SELECT COUNT(*) AS Antal,
       SUM(Pris) AS Samlet,
       MIN(Pris) AS Billigst,
       MAX(Pris) AS Dyrest
FROM Produkter;`,
        output: "Antal  Samlet  Billigst  Dyrest\n-----  ------  --------  ------\n8      197     10        45",
        noter: [
          ["COUNT(*)", "Antal rækker."],
          ["SUM(Pris)", "Alle priserne lagt sammen."],
          ["MIN / MAX", "Mindste og største pris."],
          ["AS Antal", "Navnet på kolonnen i resultatet. Uden `AS` skriver SQL Server bare `(No column name)`."]
        ],
        md2: "Pas på med `AVG` på en `INT`-kolonne i SQL Server: `SELECT AVG(Pris) FROM Produkter` giver **24**, ikke 24,625 — gennemsnittet af heltal bliver et heltal, og decimalerne skæres af. Det kender du fra heltalsdivision i C#. SQLite giver `24.625`. (SQL skriver altid decimaltal med punktum.)" },
      { t: "valg", sprog: "sql", q: "Tabellen `Kunder` har 5 rækker. 3 af kunderne har en e-mail, 2 har `NULL` i `Email`. Hvad giver forespørgslen?",
        kode: R`SELECT COUNT(*) AS Kunder, COUNT(Email) AS MedEmail
FROM Kunder;`,
        svar: ["Kunder = 5 og MedEmail = 3", "Kunder = 5 og MedEmail = 5", "Kunder = 3 og MedEmail = 3", "Kunder = 5 og MedEmail = 2"],
        ret: 0, fordi: "`COUNT(*)` tæller **rækker** — alle 5. `COUNT(Email)` tæller kun rækker, hvor `Email` **ikke er NULL** — 3. Den forskel får du brug for i værkstedet." },
      { t: "udfyld", sprog: "sql", q: "Tæl, hvor mange produkter der er i kategorien `'Drikke'`, og kald kolonnen `Antal`.",
        kode: R`SELECT [[COUNT|count]](*) [[AS|as]] Antal
FROM Produkter
[[WHERE|where]] Kategori = 'Drikke';`,
        fordi: "`WHERE` vælger først drikkevarerne ud. Bagefter tæller `COUNT(*)` de rækker, der er tilbage: 3." },
      { t: "laes", h: "GROUP BY: én række pr. gruppe",
        md: "Vil du tælle **pr. kategori**, bruger du `GROUP BY`. Databasen samler alle rækker med samme kategori i en gruppe og giver **én resultat-række pr. gruppe**. Aggregatfunktionerne regnes ud for hver gruppe for sig.",
        sprog: "sql",
        kode: R`SELECT Kategori, COUNT(*) AS Antal, SUM(Pris) AS Samlet, AVG(Pris) AS Gennemsnit
FROM Produkter
GROUP BY Kategori
ORDER BY Kategori;`,
        output: "Kategori  Antal  Samlet  Gennemsnit\n--------  -----  ------  ----------\nBageri    3      75      25\nDrikke    3      90      30\nSlik      2      32      16",
        noter: [
          ["GROUP BY Kategori", "Én gruppe pr. forskellig kategori: Bageri, Drikke, Slik."],
          ["COUNT(*)", "Tæller rækkerne **i gruppen**."],
          ["SUM / AVG", "Regnes også ud pr. gruppe."]
        ],
        md2: "På Mac viser SQLite gennemsnittet som `25.0`, `30.0` og `16.0`. Det svarer til `GroupBy` i LINQ fra modul 9." },
      { t: "valg", sprog: "sql", q: "Hvor mange rækker giver forespørgslen?",
        kode: PRODUKTER + "\n\n" + R`SELECT Kategori, MAX(Pris) AS Dyrest
FROM Produkter
GROUP BY Kategori;`,
        svar: ["3 — én pr. kategori", "8 — én pr. produkt", "1 — det dyreste produkt", "2 — kun kategorier med mere end ét produkt"],
        ret: 0, fordi: "`GROUP BY Kategori` giver én række for hver **forskellig** kategori: Drikke (45), Bageri (40) og Slik (20)." },
      { t: "fejl", sprog: "sql", q: "SQL Server afviser forespørgslen med fejlen `Column 'Produkter.Navn' is invalid in the select list because it is not contained in either an aggregate function or the GROUP BY clause`. Hvilken linje er problemet?",
        kode: R`SELECT Kategori, Navn, COUNT(*) AS Antal
FROM Produkter
GROUP BY Kategori;`,
        linje: 1,
        fordi: "Gruppen Bageri har **tre** navne: Brød, Kage og Bolle. Men resultatet har kun **én** række for Bageri — hvilket navn skulle stå der? Reglen: alt efter `SELECT` skal enten stå i `GROUP BY` eller være inde i en aggregatfunktion. Fjern `Navn` fra linje 1. (SQLite lader fejlen gå igennem og vælger bare et af navnene — det er netop derfor, den er farlig.)",
        rettet: R`SELECT Kategori, COUNT(*) AS Antal
FROM Produkter
GROUP BY Kategori;` },
      { t: "laes", h: "HAVING: filtrér grupperne",
        md: "`WHERE` filtrerer **rækker**, før de bliver grupperet. Vil du filtrere på **resultatet af grupperingen** — fx \"kun kategorier med et gennemsnit over 20\" — bruger du `HAVING`. Det står efter `GROUP BY`.",
        sprog: "sql",
        kode: R`SELECT Kategori, AVG(Pris) AS Gennemsnit
FROM Produkter
GROUP BY Kategori
HAVING AVG(Pris) > 20
ORDER BY Kategori;`,
        output: "Kategori  Gennemsnit\n--------  ----------\nBageri    25\nDrikke    30",
        noter: [
          ["WHERE", "Før grupperingen. Arbejder på de enkelte rækker. Kan **ikke** bruge `AVG`, `COUNT` osv."],
          ["HAVING", "Efter grupperingen. Arbejder på grupperne. Bruger netop `AVG`, `COUNT` osv."],
          ["Slik er væk", "Gennemsnittet for Slik er 16, som ikke er over 20."]
        ] },
      { t: "valg", q: "Du vil vise de kategorier, hvor der er **mindst 3 produkter**. Hvad skal du bruge?",
        svar: ["GROUP BY Kategori HAVING COUNT(*) >= 3", "WHERE COUNT(*) >= 3 GROUP BY Kategori", "ORDER BY COUNT(*) >= 3", "WHERE Kategori >= 3"],
        ret: 0, fordi: "Antallet pr. kategori findes først **efter** grupperingen, så filteret skal i `HAVING`. `WHERE` kører, før der er grupper, og må ikke indeholde `COUNT`." },
      { t: "orden", sprog: "sql", q: "Sæt linjerne i rækkefølge: tæl produkter over 10 kr. pr. kategori, vis kun kategorier med mindst 2, og sortér med flest først.",
        linjer: [R`SELECT Kategori, COUNT(*) AS Antal`, R`FROM Produkter`, R`WHERE Pris > 10`, R`GROUP BY Kategori`, R`HAVING COUNT(*) >= 2`, R`ORDER BY Antal DESC, Kategori;`],
        output: "Kategori  Antal\n--------  -----\nDrikke    3\nBageri    2\nSlik      2",
        fordi: "Den fulde rækkefølge er: `SELECT` → `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `ORDER BY`. Bolle (10) er ikke over 10 og fjernes af `WHERE`, før der tælles." },
      { t: "laes", h: "GROUP BY sammen med JOIN",
        md: "Det virkelig nyttige er at kombinere. Hvor meget har hver kunde handlet for? Pris står i `Produkter`, antal i `OrdreLinjer`, og kundens navn i `Kunder`. Så du kobler tabellerne, regner `Antal * Pris` for hver linje og grupperer pr. kunde.",
        sprog: "sql",
        kode: R`SELECT k.Navn, SUM(ol.Antal * p.Pris) AS Omsaetning
FROM Kunder k
INNER JOIN Ordrer o ON o.KundeId = k.Id
INNER JOIN OrdreLinjer ol ON ol.OrdreId = o.Id
INNER JOIN Produkter p ON p.Id = ol.ProduktId
GROUP BY k.Navn
ORDER BY Omsaetning DESC;`,
        output: "Navn  Omsaetning\n----  ----------\nAnna  235\nBo    50\nCarl  30",
        noter: [
          ["ol.Antal * p.Pris", "Prisen for én ordrelinje. SQL kan regne inde i en forespørgsel."],
          ["SUM(…)", "Læg alle linjerne sammen — pr. gruppe."],
          ["GROUP BY k.Navn", "Én gruppe pr. kunde."],
          ["ORDER BY Omsaetning", "Du må sortere efter et navn, du har givet med `AS`."]
        ],
        md2: "Annas tal: ordre 1 er 2 × 45 + 1 × 40 = 130, ordre 3 er 1 × 45 + 3 × 20 = 105. I alt 235. Dorte og Emil er der ikke — `INNER JOIN` har fjernet dem." },
      { t: "skriv", sprog: "sql", q: "Skriv en forespørgsel på tabellen `Ordrer`, der viser `KundeId` og antallet af ordrer pr. kunde. Kald antallet `Antal`.",
        tjek: [
          [/SELECT KundeId,COUNT\((\*|Id)\)/i, "Vis `KundeId` og `COUNT(*)`"],
          [/AS Antal/i, "Kald antallet `Antal` med `AS`"],
          [/FROM Ordrer/i, "Hent fra `Ordrer`"],
          [/GROUP BY KundeId/i, "Gruppér med `GROUP BY KundeId`"]
        ],
        forkert: ["SELECT KundeId, COUNT(*) AS Antal FROM Ordrer;", "SELECT KundeId, SUM(Id) AS Antal FROM Ordrer GROUP BY KundeId;"],
        loesning: R`SELECT KundeId, COUNT(*) AS Antal
FROM Ordrer
GROUP BY KundeId;`,
        fordi: "Med butikkens data: kunde 1 har 2 ordrer, kunde 2 og 3 har 1 hver. Uden `GROUP BY` afviser SQL Server sætningen — `KundeId` står efter `SELECT` uden at være grupperet." },
      { t: "ide", h: "Tal om butikken",
        md: "Kør forespørgslerne fra lektionen i din **Butik**-database, og tjek, at du får de samme tal. Skriv derefter selv disse tre — prøv, før du kigger i løsningen nedenfor:",
        sprog: "sql",
        kode: R`-- 1. Antal kunder pr. by
SELECT Bynavn, COUNT(*) AS Antal
FROM Kunder
GROUP BY Bynavn;

-- 2. Hvor mange stk. af hvert produkt er der solgt i alt?
SELECT p.Navn, SUM(ol.Antal) AS Solgt
FROM Produkter p
INNER JOIN OrdreLinjer ol ON ol.ProduktId = p.Id
GROUP BY p.Navn
ORDER BY Solgt DESC, p.Navn;

-- 3. Kunder med mere end én ordre
SELECT k.Navn, COUNT(o.Id) AS Ordrer
FROM Kunder k
INNER JOIN Ordrer o ON o.KundeId = k.Id
GROUP BY k.Navn
HAVING COUNT(o.Id) > 1;`,
        md2: "Facit: (1) Aarhus 2, de andre byer 1 hver. (2) Chokolade 3, Kaffe 3, Kage 2, Brød 1, Te 1. (3) Kun Anna med 2." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er forskellen på `WHERE` og `HAVING`?",
        svar: "Begge filtrerer, men på forskellige tidspunkter. `WHERE` filtrerer de **enkelte rækker**, **før** de bliver grupperet med `GROUP BY`, og kan derfor ikke bruge aggregatfunktioner. `HAVING` filtrerer **grupperne efter** grupperingen og bruger netop aggregatfunktioner som `COUNT` eller `AVG` — fx `HAVING COUNT(*) >= 3` for kun at vise kategorier med mindst tre produkter.",
        noegle: ["rækker", "før", "grupperne", "efter", "aggregatfunktion"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m12l6", titel: "Godt design: normalisering, datatyper og C#", min: 18,
    ord: [
      ["Redundans", "Den samme oplysning gemt flere steder. Giver risiko for, at kopierne bliver forskellige."],
      ["Normalisering", "At dele data op i tabeller efter faste regler (normalformer), så hver oplysning kun står ét sted."],
      ["1NF", "Første normalform: én værdi pr. celle, ingen lister i en celle og ingen gentagne kolonner."],
      ["2NF", "Anden normalform: 1NF, og alle kolonner afhænger af hele primærnøglen — ikke kun en del af den."],
      ["3NF", "Tredje normalform: 2NF, og ingen kolonne afhænger af en anden kolonne, der ikke er nøglen."],
      ["Constraint", "En regel, som databasen selv håndhæver: PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK, DEFAULT."],
      ["ADO.NET", ".NET's grundlæggende klasser til at tale med en database: forbindelse, kommando, læser."],
      ["SQL-injection", "Angreb, hvor brugerens input bliver kørt som SQL, fordi det er sat direkte ind i SQL-teksten."],
      ["Parameter", "En pladsholder som `@maks` i SQL-teksten. Værdien sendes separat og bliver aldrig kørt som SQL."]
    ],
    trin: [
      { t: "laes", h: "Hvorfor normalisere?",
        md: "Her er en tabel, som mange laver første gang. Alt står ét sted, så den ser praktisk ud:",
        sprog: "text",
        kode: R`OrdreId  KundeNavn  Postnr  Bynavn  Produkter
1        Anna       8000    Aarhus  Kaffe, Brød
2        Carl       8000    Aarhus  Te
3        Anna       8000    Aarhus  Kaffe, Chokolade`,
        noter: [
          ["Redundans", "\"Anna, 8000, Aarhus\" står to gange. Flytter Anna, skal flere rækker rettes. Glemmer man én, ved ingen, hvad der er rigtigt."],
          ["\"Kaffe, Brød\"", "To værdier i én celle. Hvordan tæller du, hvor meget kaffe der er solgt? Hvor står antallet?"],
          ["Postnr og Bynavn", "8000 betyder altid Aarhus. Alligevel står byen i hver række."]
        ],
        md2: "**Normalisering** er en opskrift i tre trin (normalformer), der fjerner de problemer. Målet: **hver oplysning står ét sted**." },
      { t: "laes", h: "1NF, 2NF og 3NF med samme eksempel",
        md: "Hver normalform bygger på den forrige. Til eksamen skal du kunne sige reglen og vise den med et eksempel — her er det butikken.",
        noter: [
          ["1NF: én værdi pr. celle", "Ingen lister som \"Kaffe, Brød\". Hvert produkt på en ordre får sin egen række — det er tabellen `OrdreLinjer`."],
          ["2NF: afhænger af hele nøglen", "`OrdreLinjer` har nøglen (OrdreId, ProduktId). En kolonne `ProduktNavn` afhænger kun af `ProduktId` — halvdelen af nøglen. Den flyttes til `Produkter`."],
          ["3NF: ingen afhængighed mellem andre kolonner", "I `Kunder(Id, Navn, Postnr, Bynavn)` afhænger `Bynavn` af `Postnr`, ikke af `Id`. Den flyttes til en tabel `Postnumre(Postnr, Bynavn)`."],
          ["Kort sagt", "Hver kolonne skal handle om **nøglen, hele nøglen og intet andet end nøglen**."]
        ],
        md2: "Man går ikke altid hele vejen til 3NF. Butikken i modulet har `Bynavn` direkte i `Kunder` for at holde det enkelt — det er et bevidst valg, og det må du gerne sige til eksamen." },
      { t: "valg", q: "En tabel har kolonnen `Telefonnumre` med værdien `'20304050, 61626364'`. Hvilken normalform er brudt?",
        svar: ["1NF — der står to værdier i én celle", "2NF — kolonnen afhænger af en del af nøglen", "3NF — kolonnen afhænger af en anden kolonne", "Ingen — det er tilladt"],
        ret: 0, fordi: "1NF kræver **én værdi pr. celle**. Løsningen er en tabel `Telefonnumre` med én række pr. nummer og en fremmednøgle til personen." },
      { t: "valg", q: "Tabellen `Medarbejdere(Id, Navn, AfdelingId, AfdelingNavn)` har `Id` som primærnøgle. `AfdelingNavn` er altid det samme for samme `AfdelingId`. Hvilken normalform er brudt?",
        svar: ["3NF — AfdelingNavn afhænger af AfdelingId, ikke af nøglen", "1NF — der er for mange kolonner", "2NF — nøglen består af to kolonner", "Ingen — det er tilladt"],
        ret: 0, fordi: "`AfdelingNavn` afhænger af en anden kolonne, der **ikke** er nøglen. Det er et brud på **3NF**. Løsningen: en tabel `Afdelinger(Id, Navn)`, og `Medarbejdere` beholder kun fremmednøglen `AfdelingId`. (2NF handler om sammensatte nøgler — her er nøglen kun `Id`.)" },
      { t: "laes", h: "Datatyper: vælg den rigtige",
        md: "Hver kolonne har en datatype. Den rigtige type gør databasen hurtigere og forhindrer forkerte data — du kan ikke gemme `'hej'` i en `INT`.",
        noter: [
          ["INT", "Heltal. Id'er, antal, alder. C#: `int`."],
          ["DECIMAL(10,2)", "Præcise decimaltal: 10 cifre, heraf 2 efter kommaet. **Brug den til penge.** C#: `decimal`. (I modulet er priserne hele kroner og derfor `INT` — det er for at holde tallene enkle.)"],
          ["NVARCHAR(n)", "Tekst på højst n tegn, alle sprog og tegn. C#: `string`. `VARCHAR` er uden N og kan ikke alle tegn."],
          ["N'tekst'", "I SQL Server skal tekst med andre tegn end de vesteuropæiske stå som `N'…'`. Til æ, ø og å er det ikke nødvendigt, men det skader aldrig. SQLite kender ikke N'…'."],
          ["DATE / DATETIME2", "Dato, eller dato og klokkeslæt. C#: `DateOnly` / `DateTime`."],
          ["BIT", "0 eller 1 — sandt eller falsk. C#: `bool`."],
          ["SQLite", "Har kun få typer: `INTEGER`, `REAL`, `TEXT`, `NUMERIC`, `BLOB`. Den accepterer navnene ovenfor og oversætter dem selv."]
        ] },
      { t: "valg", q: "Kolonnen `Pris` i en webshop skal kunne gemme beløb som 149,95 kr. præcist. Hvilken datatype vælger du i SQL Server?",
        svar: ["DECIMAL(10,2)", "INT", "NVARCHAR(10)", "BIT"],
        ret: 0, fordi: "`DECIMAL(10,2)` gemmer decimaltal **præcist** med 2 cifre efter kommaet — det er typen til penge, ligesom `decimal` i C#. `INT` kan ikke gemme ører, og som tekst kan databasen hverken regne, sortere eller tjekke beløbet rigtigt." },
      { t: "laes", h: "Constraints: regler, databasen selv håndhæver",
        md: "En **constraint** er en regel på en kolonne. Databasen nægter at gemme data, der bryder den — også selvom fejlen kommer fra din C#-kode. Du kender allerede `PRIMARY KEY`, `FOREIGN KEY` og `NOT NULL`. Her er tre til:",
        sprog: "sql",
        kode: R`CREATE TABLE Brugere (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Brugernavn NVARCHAR(30) NOT NULL UNIQUE,
    Alder INT CHECK (Alder >= 0),
    Aktiv BIT NOT NULL DEFAULT 1
);`,
        noter: [
          ["UNIQUE", "To rækker må ikke have samme værdi. Som en primærnøgle, bare ikke nøglen. Godt til brugernavne og e-mails."],
          ["CHECK (Alder >= 0)", "Værdien skal opfylde betingelsen. En negativ alder bliver afvist."],
          ["DEFAULT 1", "Får kolonnen ingen værdi i en `INSERT`, bruges 1."]
        ],
        md2: "I SQLite er det den samme sætning, bare med `INTEGER PRIMARY KEY AUTOINCREMENT` og `TEXT`. Reglerne virker ens." },
      { t: "fejl", sprog: "sql", q: "Tabellen `Brugere` har `Brugernavn NVARCHAR(30) NOT NULL UNIQUE` og `Alder INT CHECK (Alder >= 0)`. Én af sætningerne bliver afvist af databasen. Hvilken?",
        kode: R`INSERT INTO Brugere (Brugernavn, Alder) VALUES ('peter', 25);
INSERT INTO Brugere (Brugernavn, Alder) VALUES ('maja', 31);
INSERT INTO Brugere (Brugernavn, Alder) VALUES ('ali', 0);
INSERT INTO Brugere (Brugernavn, Alder) VALUES ('peter', 40);`,
        linje: 4,
        fordi: "Brugernavnet `'peter'` findes allerede, og kolonnen er `UNIQUE`. SQL Server siger `Violation of UNIQUE KEY constraint … Cannot insert duplicate key`. Alder 0 på linje 3 er i orden: `CHECK (Alder >= 0)` tillader 0." },
      { t: "udfyld", sprog: "sql", q: "Opret tabellen `Varer`. Varenummeret må ikke gå igen, og prisen må ikke være negativ.",
        kode: R`CREATE TABLE Varer (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Varenummer NVARCHAR(20) NOT NULL [[UNIQUE|unique]],
    Pris DECIMAL(10,2) NOT NULL [[CHECK|check]] (Pris >= 0)
);`,
        fordi: "`UNIQUE` forhindrer dubletter. `CHECK` med en betingelse i parentes afviser ugyldige værdier. Og prisen er `DECIMAL(10,2)`, fordi det er penge." },
      { t: "laes", h: "ADO.NET: sådan taler C# med databasen",
        md: "Før Entity Framework (modul 17) skrev man SQL'en selv i C# med **ADO.NET**. Det gør du sjældent i dag, men det viser, hvad EF gør for dig bag kulisserne. Tre klasser: en **forbindelse**, en **kommando** med SQL og en **læser**, der går rækkerne igennem én ad gangen.",
        frag: true,
        kode: R`using Microsoft.Data.SqlClient;

string forbindelse = @"Server=(localdb)\MSSQLLocalDB;Database=Butik;Trusted_Connection=True;TrustServerCertificate=True";

using SqlConnection conn = new SqlConnection(forbindelse);
conn.Open();

string sql = "SELECT Navn, Pris FROM Produkter WHERE Pris < @maks ORDER BY Pris";
using SqlCommand cmd = new SqlCommand(sql, conn);
cmd.Parameters.AddWithValue("@maks", 25);

using SqlDataReader reader = cmd.ExecuteReader();
while (reader.Read())
{
    string navn = reader.GetString(0);
    int pris = reader.GetInt32(1);
    Console.WriteLine($"{navn}: {pris} kr.");
}`,
        output: "Bolle: 10 kr.\nLakrids: 12 kr.\nJuice: 15 kr.\nChokolade: 20 kr.",
        noter: [
          ["forbindelse", "**Connection string**: hvor databasen er, og hvad den hedder. `@\"…\"` gør, at `\\` ikke er et specialtegn."],
          ["using SqlConnection conn = …;", "`using` sørger for, at forbindelsen lukkes, når programmet er færdigt med den — som med `StreamWriter` i modul 9."],
          ["@maks", "En **parameter**: en pladsholder i SQL'en. Værdien 25 sendes for sig med `AddWithValue`."],
          ["ExecuteReader()", "Kør SQL'en, og få en læser tilbage."],
          ["reader.Read()", "Gå til næste række. Giver `false`, når der ikke er flere."],
          ["GetString(0), GetInt32(1)", "Hent kolonne nr. 0 og 1 i rækken, med den rigtige type."]
        ],
        md2: "På Mac er det de samme linjer med pakken `Microsoft.Data.Sqlite`: `SqliteConnection`, `SqliteCommand` og `SqliteDataReader`, og forbindelsen hedder `\"Data Source=butik.db\"`." },
      { t: "valg", q: "Hvorfor skriver man `WHERE Navn = @navn` med en parameter i stedet for at sætte brugerens tekst direkte ind: `\"... WHERE Navn = '\" + input + \"'\"`?",
        svar: ["For at undgå SQL-injection: brugerens tekst må aldrig blive kørt som SQL", "Fordi det kører hurtigere på en Mac", "Fordi SQL ikke kan læse tekst fra C#", "Fordi parametre ikke kan være NULL"],
        ret: 0, fordi: "Skriver brugeren `x'; DROP TABLE Kunder; --`, bliver det med `+` til **SQL, som databasen kører** — og tabellen er væk. Det hedder **SQL-injection**. En parameter sendes for sig og bliver altid behandlet som en værdi, aldrig som SQL. Entity Framework bruger parametre for dig." },
      { t: "ide", h: "Hent produkterne fra C#",
        md: "Lav et Console-projekt, `ButikData`, og hent produkterne under 25 kr. fra din **Butik**-database. Skriv koden fra trinnet om ADO.NET selv.",
        frag: true,
        win: [
          "Højreklik på projektet i Solution Explorer → **Manage NuGet Packages…** → fanen **Browse**. Søg efter `Microsoft.Data.SqlClient`, og klik **Install**.",
          "Skriv koden i `Program.cs`. Connection string: `Server=(localdb)\\MSSQLLocalDB;Database=Butik;Trusted_Connection=True;TrustServerCertificate=True`.",
          "Kør programmet."
        ],
        mac: [
          "Højreklik på projektet → **Manage NuGet Packages**. Søg efter `Microsoft.Data.Sqlite`, og installér den.",
          "Skriv koden med `using Microsoft.Data.Sqlite;`, `SqliteConnection`, `SqliteCommand` og `SqliteDataReader`.",
          "Connection string: `Data Source=` efterfulgt af den **fulde sti** til din `butik.db`-fil. (Du kan se stien ved at højreklikke på datakilden i Database-vinduet og vælge **Properties**.)",
          "Kør programmet."
        ],
        kode: R`using Microsoft.Data.Sqlite;

string forbindelse = "Data Source=/Users/dig/butik.db";   // din egen sti

using SqliteConnection conn = new SqliteConnection(forbindelse);
conn.Open();

string sql = "SELECT Navn, Pris FROM Produkter WHERE Pris < @maks ORDER BY Pris";
using SqliteCommand cmd = new SqliteCommand(sql, conn);
cmd.Parameters.AddWithValue("@maks", 25);

using SqliteDataReader reader = cmd.ExecuteReader();
while (reader.Read())
{
    string navn = reader.GetString(0);
    int pris = reader.GetInt32(1);
    Console.WriteLine($"{navn}: {pris} kr.");
}`,
        output: "Bolle: 10 kr.\nLakrids: 12 kr.\nJuice: 15 kr.\nChokolade: 20 kr.",
        md2: "Koden ovenfor er Mac-udgaven. På Windows er den magen til den i trinnet om ADO.NET. Udvid selv: spørg brugeren om maksprisen med `Console.ReadLine()` og `int.Parse`, og send den som parameter. Prøv at skrive `10 OR 1=1`: programmet stopper med en fejl i `int.Parse`, fordi teksten ikke er et tal — den når aldrig frem til databasen som SQL. Og selv tekst, der sendes som parameter, bliver aldrig kørt som SQL." },
      { t: "forklar", q: "Eksamensspørgsmål: Hvad er normalisering, og hvorfor gør man det? Giv et eksempel.",
        svar: "Normalisering er at dele data op i tabeller efter **normalformerne**, så **hver oplysning kun står ét sted**. Det fjerner **redundans** og forhindrer, at kopier bliver uenige, når man retter. **1NF**: én værdi pr. celle. **2NF**: alle kolonner afhænger af **hele** nøglen. **3NF**: ingen kolonne afhænger af en anden kolonne end nøglen. Eksempel: i stedet for at skrive kundens navn og by på hver ordre, får ordren en **fremmednøgle** `KundeId`, og kundens oplysninger står kun i tabellen `Kunder`.",
        noegle: ["ét sted", "redundans", "1NF", "2NF", "3NF", "fremmednøgle"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m12v", titel: "Værksted: dine egne databaser", vaerksted: true, min: 75, ord: [], trin: [

    { t: "laes", h: "Sådan arbejder du i værkstedet",
      md: "Nu skal du bygge databaser og skrive forespørgsler **helt selv** i {{Visual Studio (SQL Server Object Explorer → New Query)||Rider (Database → Query Console)}}. Opgaverne bliver sværere hen ad vejen, og den sidste er en hel lille database ud fra en kravliste.\n\nSiden kan ikke køre din SQL. Derfor viser hver opgave det **resultat**, din forespørgsel skal give. Sammenlign selv tabellen, og sæt flueben, når den passer.",
      noter: [
        ["Hvor skriver jeg?", "Ikke i et C#-projekt og ikke i Program.cs. Du skriver i query-vinduet til en database. Lav gerne en ny database `Vaerksted` til opgaverne."],
        ["Mac", "Løsningerne er skrevet til SQL Server. På Mac skriver du `INTEGER PRIMARY KEY AUTOINCREMENT` i stedet for `INT IDENTITY(1,1) PRIMARY KEY`, `TEXT` i stedet for `NVARCHAR(…)`, og kører `PRAGMA foreign_keys = ON;` først."],
        ["Kør tit", "Kør én sætning ad gangen, og se resultatet, før du skriver den næste."],
        ["Fejlfinding i SQL", "SQL har ingen breakpoints. Det, der svarer til at gå ét skridt ad gangen, er at **pille forespørgslen fra hinanden**: fjern `GROUP BY` og funktionerne, og se de rå rækker. Så ser du, hvad databasen arbejder med."],
        ["SELECT før DELETE", "Kør altid en `SELECT` med samme `WHERE`, før du kører `UPDATE` eller `DELETE`."],
        ["Tips før løsning", "Åbn ét tip ad gangen. Løsningen er sidste udvej — og skriv den så selv, i stedet for at kopiere."]
      ] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Dine yndlingsfilm", sprog: "sql", fri: true,
      md: "Lav en tabel med danske film, fyld den med fem film, og hent dem sorteret efter årstal.",
      krav: [
        "Tabellen hedder `Film` og har kolonnerne `Id` (automatisk nummer, primærnøgle), `Titel` (tekst, højst 100 tegn, skal udfyldes), `Aar` (heltal, skal udfyldes) og `Minutter` (heltal, skal udfyldes)",
        "Indsæt filmene i denne rækkefølge: Jagten (2012, 115 min), Druk (2020, 117 min), Festen (1998, 105 min), Flammen & Citronen (2008, 130 min) og Retfærdighedens ryttere (2020, 116 min)",
        "Forespørgslen viser `Titel` og `Aar` for alle film, sorteret efter år — og film fra samme år sorteret efter titel"
      ],
      tip: [
        "Start med `CREATE TABLE Film (` og én linje pr. kolonne. Husk komma mellem kolonnerne og intet komma efter den sidste.",
        "Én `INSERT INTO Film (Titel, Aar, Minutter) VALUES` med fem parenteser adskilt af komma. Tekst i enkelte anførselstegn.",
        "Du kan sortere efter to kolonner: `ORDER BY Aar, Titel`."
      ],
      output: "Titel                    Aar\n-----------------------  ----\nFesten                   1998\nFlammen & Citronen       2008\nJagten                   2012\nDruk                     2020\nRetfærdighedens ryttere  2020",
      loesning: R`CREATE TABLE Film (
    Id INT IDENTITY(1,1) PRIMARY KEY,   -- Mac: Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Titel NVARCHAR(100) NOT NULL,
    Aar INT NOT NULL,
    Minutter INT NOT NULL
);

INSERT INTO Film (Titel, Aar, Minutter) VALUES
    ('Jagten', 2012, 115),
    ('Druk', 2020, 117),
    ('Festen', 1998, 105),
    ('Flammen & Citronen', 2008, 130),
    ('Retfærdighedens ryttere', 2020, 116);

SELECT Titel, Aar
FROM Film
ORDER BY Aar, Titel;`,
      ekstra: ["Hent kun filmene fra 2010 eller senere.", "Hent den længste film med `TOP 1` (Mac: `LIMIT 1`)."] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Ret, slet og find", sprog: "sql", fri: true,
      md: "Fortsæt med tabellen `Film` fra forrige opgave. Én film har fået en længere udgave, og de gamle film skal ud. Til sidst finder du filmene med en bestemt længde.",
      krav: [
        "Jagten får en ny længde: 125 minutter. Ram filmen via titlen",
        "Alle film fra før år 2000 slettes. Kør først en `SELECT` med samme `WHERE`, og tjek, at det kun er Festen",
        "Forespørgslen viser `Titel` og `Minutter` for film, der er mellem 115 og 125 minutter lange (begge med), sorteret med den længste først"
      ],
      tip: [
        "`UPDATE Film SET … WHERE Titel = …`",
        "`DELETE FROM Film WHERE Aar < 2000;` — men kør `SELECT * FROM Film WHERE Aar < 2000;` først.",
        "`WHERE Minutter BETWEEN 115 AND 125` og `ORDER BY Minutter DESC`."
      ],
      output: "Titel                    Minutter\n-----------------------  --------\nJagten                   125\nDruk                     117\nRetfærdighedens ryttere  116",
      loesning: R`UPDATE Film
SET Minutter = 125
WHERE Titel = 'Jagten';

SELECT * FROM Film WHERE Aar < 2000;
DELETE FROM Film WHERE Aar < 2000;

SELECT Titel, Minutter
FROM Film
WHERE Minutter BETWEEN 115 AND 125
ORDER BY Minutter DESC;`,
      fordi: "Flammen & Citronen (130 min) er for lang til at komme med, og Festen er slettet.",
      ekstra: ["Find alle film, hvis titel indeholder bogstaverne `en` med `LIKE`.", "Hvilket Id har Retfærdighedens ryttere nu? Og hvilket Id får den næste film, du indsætter?"] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Fejlfinding: holdet uden elever", sprog: "sql", fri: true,
      md: "En skole vil se, hvor mange elever der er på hvert hold — også hold uden elever. Kopiér startkoden ind i dit **query-vindue** (ikke i Program.cs), og kør den. Forespørgslen kører uden fejl, men ét af tallene er forkert.\n\nFind fejlen ved at pille forespørgslen fra hinanden: kør den **uden** `GROUP BY` og `COUNT`, og se de rå rækker, som databasen tæller på.",
      start: R`CREATE TABLE Hold (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Navn NVARCHAR(50) NOT NULL
);

CREATE TABLE Elever (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Navn NVARCHAR(50) NOT NULL,
    HoldId INT NOT NULL,
    FOREIGN KEY (HoldId) REFERENCES Hold(Id)
);

INSERT INTO Hold (Navn) VALUES ('C# begynder'), ('Web'), ('Database');
INSERT INTO Elever (Navn, HoldId) VALUES ('Ali', 1), ('Maja', 1), ('Ida', 2), ('Sofie', 1);

SELECT h.Navn, COUNT(*) AS AntalElever
FROM Hold h
LEFT JOIN Elever e ON e.HoldId = h.Id
GROUP BY h.Id, h.Navn
ORDER BY AntalElever DESC;`,
      krav: [
        "Kør startkoden. Hvilket hold har et forkert tal?",
        "Kør `SELECT h.Navn, e.Navn FROM Hold h LEFT JOIN Elever e ON e.HoldId = h.Id;` og se, hvilken række holdet uden elever får",
        "Ret den sidste forespørgsel, så holdet uden elever får 0",
        "Forklar for dig selv med én sætning, hvorfor det forkerte tal opstod"
      ],
      tip: [
        "Holdet `Database` har ingen elever. Alligevel står der 1. Hvad er det, der bliver talt?",
        "`LEFT JOIN` giver holdet én række med `NULL` i elevens kolonner. `COUNT(*)` tæller **rækker** — også den række.",
        "`COUNT(kolonne)` tæller kun de rækker, hvor kolonnen ikke er NULL. Tæl elevernes Id: `COUNT(e.Id)`."
      ],
      output: "Navn         AntalElever\n-----------  -----------\nC# begynder  3\nWeb          1\nDatabase     0",
      loesning: R`SELECT h.Navn, COUNT(e.Id) AS AntalElever
FROM Hold h
LEFT JOIN Elever e ON e.HoldId = h.Id
GROUP BY h.Id, h.Navn
ORDER BY AntalElever DESC;`,
      fordi: "Med `LEFT JOIN` kommer holdet Database med som én række, hvor alle elev-kolonnerne er `NULL`. `COUNT(*)` tæller den række som 1. `COUNT(e.Id)` springer `NULL` over og giver 0. Reglen: tæller du efter en `LEFT JOIN`, så tæl en kolonne fra den **højre** tabel.",
      ekstra: ["Vis kun hold med mindst 2 elever med `HAVING`.", "Hvad sker der, hvis du skriver `INNER JOIN` i stedet for `LEFT JOIN`? Forklar hvorfor."] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Skuespillere: mange-til-mange", sprog: "sql", fri: true,
      md: "En skuespiller kan være med i mange film, og en film har mange skuespillere. Byg koblingstabellen, og find alle Mads Mikkelsens roller. Du bruger tabellen `Film` fra de første opgaver.\n\nKør først `SELECT Id, Titel FROM Film;`. Eksemplet regner med, at Jagten har Id 1, Druk Id 2, Flammen & Citronen Id 4 og Retfærdighedens ryttere Id 5. Har dine film andre Id'er, så brug dine egne.",
      krav: [
        "Tabellen `Skuespillere` har `Id` (automatisk nummer, primærnøgle) og `Navn` (tekst, skal udfyldes)",
        "Koblingstabellen `Medvirker` har `FilmId`, `SkuespillerId` og `Rolle` (tekst). Primærnøglen er `(FilmId, SkuespillerId)`, og begge er fremmednøgler",
        "Skuespillere i denne rækkefølge: Mads Mikkelsen, Thomas Bo Larsen, Thure Lindhardt, Nikolaj Lie Kaas",
        "Roller: Mads Mikkelsen er Lucas i Jagten, Martin i Druk, Citronen i Flammen & Citronen og Markus i Retfærdighedens ryttere. Thomas Bo Larsen er Theo i Jagten og Tommy i Druk. Thure Lindhardt er Flammen i Flammen & Citronen. Nikolaj Lie Kaas er Otto i Retfærdighedens ryttere",
        "Forespørgslen viser `Titel`, `Aar` og `Rolle` for Mads Mikkelsen, sorteret efter år og derefter titel"
      ],
      tip: [
        "Koblingstabellen ligner `OrdreLinjer` fra lektion 4: to `INT NOT NULL`-kolonner, en `PRIMARY KEY (FilmId, SkuespillerId)` og to `FOREIGN KEY … REFERENCES …`.",
        "Hver række i `Medvirker` er (filmens Id, skuespillerens Id, rollen). Mads Mikkelsen har Id 1, så Lucas i Jagten er `(1, 1, 'Lucas')`.",
        "Start i koblingstabellen: `FROM Medvirker m INNER JOIN Film f ON f.Id = m.FilmId INNER JOIN Skuespillere s ON s.Id = m.SkuespillerId WHERE s.Navn = 'Mads Mikkelsen'`."
      ],
      output: "Titel                    Aar   Rolle\n-----------------------  ----  --------\nFlammen & Citronen       2008  Citronen\nJagten                   2012  Lucas\nDruk                     2020  Martin\nRetfærdighedens ryttere  2020  Markus",
      loesning: R`CREATE TABLE Skuespillere (
    Id INT IDENTITY(1,1) PRIMARY KEY,   -- Mac: Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Navn NVARCHAR(100) NOT NULL
);

CREATE TABLE Medvirker (
    FilmId INT NOT NULL,
    SkuespillerId INT NOT NULL,
    Rolle NVARCHAR(50) NOT NULL,
    PRIMARY KEY (FilmId, SkuespillerId),
    FOREIGN KEY (FilmId) REFERENCES Film(Id),
    FOREIGN KEY (SkuespillerId) REFERENCES Skuespillere(Id)
);

INSERT INTO Skuespillere (Navn) VALUES
    ('Mads Mikkelsen'), ('Thomas Bo Larsen'), ('Thure Lindhardt'), ('Nikolaj Lie Kaas');

INSERT INTO Medvirker (FilmId, SkuespillerId, Rolle) VALUES
    (1, 1, 'Lucas'), (2, 1, 'Martin'), (4, 1, 'Citronen'), (5, 1, 'Markus'),
    (1, 2, 'Theo'), (2, 2, 'Tommy'),
    (4, 3, 'Flammen'),
    (5, 4, 'Otto');

SELECT f.Titel, f.Aar, m.Rolle
FROM Medvirker m
INNER JOIN Film f ON f.Id = m.FilmId
INNER JOIN Skuespillere s ON s.Id = m.SkuespillerId
WHERE s.Navn = 'Mads Mikkelsen'
ORDER BY f.Aar, f.Titel;`,
      ekstra: ["Vis hver film med antallet af skuespillere i databasen (`GROUP BY`).", "Prøv at indsætte `(1, 1, 'Lucas')` en gang til. Hvilken regel stopper dig?"] },

    // ------------------------------------------------------------------
    { t: "opgave", h: "Bibliotekets database", sprog: "sql", fri: true,
      md: "Byg en lille database til et bibliotek ud fra kravene — tabeller, relationer, data og to forespørgsler. Den samler hele modulet: `CREATE TABLE`, primær- og fremmednøgler, en koblingstabel, `JOIN`, `GROUP BY` og `HAVING`.",
      krav: [
        "`Forfattere(Id, Navn)` og `Laanere(Id, Navn)` — automatisk nummererede primærnøgler, navnet skal udfyldes",
        "`Boeger(Id, Titel, ForfatterId)` — hver bog har én forfatter (fremmednøgle)",
        "`Udlaan(Id, BogId, LaanerId, Dato)` — kobler bøger og lånere. Den har sit eget `Id`, fordi samme person godt kan låne samme bog flere gange",
        "Forfattere i denne rækkefølge: Karen Blixen, H.C. Andersen, Tove Ditlevsen, Peter Høeg",
        "Bøger i denne rækkefølge: Den afrikanske farm (Blixen), Babettes gæstebud (Blixen), Eventyr (Andersen), Barndom (Ditlevsen), Ungdom (Ditlevsen), Frøken Smillas fornemmelse for sne (Høeg)",
        "Lånere: Anna, Bo, Carl",
        "Udlån (bog-Id, låner-Id, dato): (1, 1, 2026-10-01), (4, 1, 2026-10-02), (5, 1, 2026-10-03), (2, 2, 2026-10-03), (1, 3, 2026-10-05), (3, 2, 2026-10-06)",
        "Forespørgsel 1: hver forfatter med antallet af udlån af forfatterens bøger — **også forfattere med 0 udlån** — med flest først og ved lighed sorteret efter navn. Kolonnerne hedder `Forfatter` og `Udlaan`",
        "Forespørgsel 2: lånere, der har lånt mindst 2 gange, med flest først. Kolonnerne hedder `Laaner` og `Antal`"
      ],
      tip: [
        "Opret tabellerne i en rækkefølge, så en tabel altid findes, før en anden henviser til den: Forfattere og Laanere først, så Boeger, så Udlaan.",
        "Forespørgsel 1 starter i `Forfattere` og bruger `LEFT JOIN` to gange: til `Boeger` og videre til `Udlaan`. Tæl `COUNT(u.Id)` — husk fejlfindingsopgaven.",
        "Forespørgsel 2: `INNER JOIN` fra `Laanere` til `Udlaan`, `GROUP BY l.Id, l.Navn` og `HAVING COUNT(*) >= 2`."
      ],
      output: "Forfatter       Udlaan\n--------------  ------\nKaren Blixen    3\nTove Ditlevsen  2\nH.C. Andersen   1\nPeter Høeg      0\n\nLaaner  Antal\n------  -----\nAnna    3\nBo      2",
      loesning: R`CREATE TABLE Forfattere (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Navn NVARCHAR(100) NOT NULL
);

CREATE TABLE Laanere (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Navn NVARCHAR(100) NOT NULL
);

CREATE TABLE Boeger (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Titel NVARCHAR(200) NOT NULL,
    ForfatterId INT NOT NULL,
    FOREIGN KEY (ForfatterId) REFERENCES Forfattere(Id)
);

CREATE TABLE Udlaan (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    BogId INT NOT NULL,
    LaanerId INT NOT NULL,
    Dato DATE NOT NULL,
    FOREIGN KEY (BogId) REFERENCES Boeger(Id),
    FOREIGN KEY (LaanerId) REFERENCES Laanere(Id)
);

INSERT INTO Forfattere (Navn) VALUES
    ('Karen Blixen'), ('H.C. Andersen'), ('Tove Ditlevsen'), ('Peter Høeg');

INSERT INTO Boeger (Titel, ForfatterId) VALUES
    ('Den afrikanske farm', 1),
    ('Babettes gæstebud', 1),
    ('Eventyr', 2),
    ('Barndom', 3),
    ('Ungdom', 3),
    ('Frøken Smillas fornemmelse for sne', 4);

INSERT INTO Laanere (Navn) VALUES ('Anna'), ('Bo'), ('Carl');

INSERT INTO Udlaan (BogId, LaanerId, Dato) VALUES
    (1, 1, '2026-10-01'),
    (4, 1, '2026-10-02'),
    (5, 1, '2026-10-03'),
    (2, 2, '2026-10-03'),
    (1, 3, '2026-10-05'),
    (3, 2, '2026-10-06');

-- Forespørgsel 1
SELECT f.Navn AS Forfatter, COUNT(u.Id) AS Udlaan
FROM Forfattere f
LEFT JOIN Boeger b ON b.ForfatterId = f.Id
LEFT JOIN Udlaan u ON u.BogId = b.Id
GROUP BY f.Id, f.Navn
ORDER BY Udlaan DESC, f.Navn;

-- Forespørgsel 2
SELECT l.Navn AS Laaner, COUNT(*) AS Antal
FROM Laanere l
INNER JOIN Udlaan u ON u.LaanerId = l.Id
GROUP BY l.Id, l.Navn
HAVING COUNT(*) >= 2
ORDER BY Antal DESC;`,
      fordi: "På Mac: skift `INT IDENTITY(1,1) PRIMARY KEY` ud med `INTEGER PRIMARY KEY AUTOINCREMENT` og `NVARCHAR(…)` med `TEXT`, og kør `PRAGMA foreign_keys = ON;` først. Resten er det samme.",
      ekstra: ["Tilføj en kolonne `Afleveret DATE NULL` til `Udlaan` (`ALTER TABLE Udlaan ADD Afleveret DATE NULL;`), og find de bøger, der ikke er afleveret endnu.", "Find de bøger, der aldrig har været lånt ud.", "Forklar, hvilken normalform der ville være brudt, hvis `Boeger` også havde en kolonne `ForfatterNavn`."] }
  ] }
  ]
});
})();
