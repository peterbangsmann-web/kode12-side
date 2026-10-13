// Modul 18 — Database first, layout og routing. Forudsætter: modul 0–17 (især 12 SQL, 16 MVC og 17 EF Core code first).
// Al web-kode er afprøvet i et rigtigt projekt (dotnet new mvc, .NET 10, EF Core 10, SQLite): scaffold fra en eksisterende
// database, controllere lavet med dotnet aspnet-codegenerator, ruterne og siderne hentet med curl, formularer prøvet i Chromium.
// T-SQL-scriptene og Package Manager Console-kommandoerne kunne ikke køres her (ingen SQL Server); de er skrevet ud fra de
// SQLite-udgaver, der er kørt, og ud fra lærerens egne trin fra kursusdag 15.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m18", nr: 18, del: "Del 5 · ASP.NET Core", ikon: "🧭",
  titel: "Database first, layout og routing",
  dag: "Kursusdag 15 · MVC Core database first",
  intro: "I modul 17 skrev du klasserne, og Entity Framework lavede databasen. Ude i virkeligheden er det ofte omvendt: **databasen findes i forvejen**, og du skal bygge en webapp oven på den. Her bygger du webbutikken **Butik** på den måde, trin for trin.\n\nBagefter gør du appen færdig nok til et eksamensprojekt: pæne adresser som `/kunde/Anna` (**routing**), en rigtig menu (**layout**), **view models** med danske datoer og kroner, sikker **sletning** og dine egne **fejlsider**. I værkstedet bygger du selv et bibliotek på samme måde.",
  video: ["15_Fre_MVCCore_DBFirst_del1.mp4 (2 t 3 min)", "15_Fre_MVCCore_DBFirst_del2.mp4 (1 t 26 min)"],
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m18l1", titel: "Code first eller database first", min: 15,
    ord: [
      ["Code first", "Du skriver C#-klasserne først. Entity Framework laver tabellerne ud fra dem med migrations (modul 17)."],
      ["Database first", "Databasen findes først. Entity Framework læser den og skriver C#-klasserne for dig."],
      ["Scaffolding", "At et værktøj skriver kode for dig ud fra noget, der findes: klasser ud fra tabeller, eller en controller ud fra en model."],
      ["Eksisterende database", "En database, der allerede er i brug, ofte af andre programmer. Den må du ikke bare lave om på."],
      ["SQL-script", "En tekstfil med SQL-sætninger, der køres i rækkefølge, fx CREATE TABLE og INSERT."],
      ["DEFAULT", "En standardværdi i en kolonne. Databasen sætter den selv, når en ny række ikke har en værdi i kolonnen."]
    ],
    trin: [
      { t: "laes", h: "To veje til det samme resultat",
        md: "Et webprojekt med Entity Framework har altid tre dele: **modelklasser** (fx `Customer`), en **databaseklasse** (`DbContext`) og en **database**. Der er to veje dertil:\n\n- **Code first** (modul 17): du skriver klasserne. Kommandoen `Add-Migration` / `dotnet ef migrations add` laver en migration, og `Update-Database` laver tabellerne.\n- **Database first** (nu): databasen findes. Kommandoen `Scaffold-DbContext` / `dotnet ef dbcontext scaffold` læser tabellerne og skriver klasserne for dig.\n\nResultatet ligner hinanden. Det er **retningen**, der er forskellig: hvem kommer først, klasserne eller tabellerne?",
        md2: "Din lærer gætter på, at det i virkeligheden er cirka 60 mod 40 til database first, fordi firmaer typisk har en database i forvejen. Til eksamen skal du kunne begge dele og forklare forskellen." },
      { t: "valg", q: "Et firma har en kundedatabase, som deres økonomisystem har brugt i ti år. Du skal lave en webside, der viser kunderne. Hvilken vej passer?",
        svar: ["Database first: databasen findes, så klasserne skal skrives ud fra den", "Code first: skriv nye klasser og lav en ny database med migrations", "Ingen af dem: man kan ikke bruge Entity Framework på en gammel database", "Code first, og så slet den gamle database"],
        ret: 0, fordi: "Databasen findes og bruges af et andet system. Den skal du læse fra, ikke erstatte. Det er netop database first." },
      { t: "valg", q: "Du starter dit eget eksamensprojekt helt fra bunden og bestemmer selv, hvilke tabeller der skal være. Hvilken vej er mest naturlig?",
        svar: ["Code first: du skriver klasserne, og migrations holder databasen i takt med dem", "Database first er det eneste, der virker til nye projekter", "Ingen database: gem alt i en List", "Det er ligegyldigt, for de to veje giver præcis de samme filer"],
        ret: 0, fordi: "Når der ikke er nogen database endnu, er det oplagt at starte med klasserne. Begge veje kan bruges, men code first passer bedst, når du selv bestemmer. (Filerne er ikke helt ens: database first giver fx ingen migrations.)" },
      { t: "laes", h: "Hvem bestemmer?",
        md: "Det vigtigste at forstå er, **hvem der bestemmer**:\n\n- I **code first** er C#-klasserne det rigtige. Vil du have en ny kolonne, retter du klassen og laver en ny migration.\n- I **database first** er **databasen** det rigtige. Vil du have en ny kolonne, retter du databasen (fx med `ALTER TABLE`) og kører scaffold-kommandoen igen.\n\nDerfor er der **ingen migrations** i database first. Og derfor skal du helst **ikke rette i de filer, værktøjet skriver**: næste gang du scaffolder, bliver de skrevet forfra, og dine rettelser forsvinder. Hvad du gør i stedet, lærer du i lektion 5.",
        noter: [
          ["code first", "klasser → migration → tabeller"],
          ["database first", "tabeller → scaffold → klasser"]
        ] },
      { t: "valg", q: "Projektet er lavet med database first. Kunderne skal nu også have et telefonnummer. Hvad gør du?",
        svar: ["Tilføjer kolonnen i databasen med `ALTER TABLE` og kører scaffold-kommandoen igen", "Skriver `Add-Migration Telefon` i Package Manager Console", "Tilføjer en property i `Customer.cs` og håber, databasen følger med", "Laver en ny tabel med telefonnumre og sletter den gamle"],
        ret: 0, fordi: "I database first er databasen det rigtige. Ændringen laves dér, og klasserne skrives igen ud fra den. Migrations hører til code first." },
      { t: "orden", sprog: "text", q: "Sæt de fem skridt i database first i rækkefølge (det er lærerens liste fra kursusdag 15).",
        linjer: [
          "Installér Entity Framework-pakkerne",
          "Kør Scaffold-DbContext mod databasen",
          "Læg connection stringen i appsettings.json",
          "Registrér databaseklassen i Program.cs med AddDbContext",
          "Build, og lav controllere med views"
        ],
        fordi: "Pakkerne skal være der, før kommandoen kan køre. Kommandoen skriver databaseklassen, som Program.cs skal kende. Controllerne laves til sidst, fordi de bruger både modellerne og databaseklassen." },
      { t: "laes", h: "Databasen til Butik", sprog: "sql",
        md: "Gennem hele modulet bygger du webbutikken **Butik**. Databasen har tre tabeller: kunder, varer og ordrer. Hver ordre peger på én kunde og én vare (to **fremmednøgler**, modul 12). Tabelnavnene er på engelsk i flertal, fordi værktøjet så kan lave pæne klassenavne i ental: `Customers` bliver til klassen `Customer`.",
        kode: R`CREATE TABLE Orders (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CustomerId INT NOT NULL REFERENCES Customers(Id) ON DELETE CASCADE,
    ProductId INT NOT NULL REFERENCES Products(Id),
    Quantity INT NOT NULL DEFAULT 1,
    OrderDate DATETIME NOT NULL DEFAULT GETDATE(),
    Paid INT NOT NULL DEFAULT 0
);`,
        noter: [
          ["REFERENCES Customers(Id)", "Fremmednøgle: CustomerId skal være Id på en kunde, der findes."],
          ["ON DELETE CASCADE", "Slettes kunden, slettes kundens ordrer også. Det ser du i lektion 6."],
          ["DEFAULT 1", "Får en ny ordre intet antal, sætter databasen selv 1."],
          ["DEFAULT GETDATE()", "Får en ny ordre ingen dato, sætter databasen selv dags dato og klokkeslæt."],
          ["Paid", "0 = ikke betalt, 1 = betalt, 2 = delvist betalt. Tallet laves om til tekst i lektion 5."]
        ] },
      { t: "ide", h: "Opret projektet Butik",
        md: "Først projektet. Det er det samme som i modul 16. Du har allerede en mappe, der hedder `Butik`, fra modul 4: skriv derfor en ny mappe, fx `Modul18`, i feltet {{**Location**||**Solution directory**}}, når du opretter projektet.",
        win: ["Åbn Visual Studio, og vælg **Create a new project**.", "Vælg **ASP.NET Core Web App (Model-View-Controller)**, og klik Next.", "Kald projektet `Butik`. Klik Next.", "Vælg **.NET 10** og Authentication type **None**. Klik Create.", "Kør projektet med den grønne pil ▶, og se forsiden i browseren."],
        mac: ["Åbn Rider, og lav en ny løsning af typen **ASP.NET Core Web Application** med skabelonen til **MVC** (Model-View-Controller), som i modul 16.", "Kald den `Butik`, og vælg .NET 10.", "Kør projektet med den grønne pil ▶, og se forsiden i browseren."] },
      { t: "ide", h: "Windows: lav ButikDB i LocalDB",
        md: "Sidder du ved en **Mac**, så spring dette trin over: næste trin er Mac-udgaven.\n\nPå Windows ligger databasen i **LocalDB**. Skriv scriptet af i en query, og kør det. (Du må gerne kopiere det her: det er databasen, ikke C#, du skal lære.)",
        sprog: "sql",
        kode: R`CREATE TABLE Customers (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    City NVARCHAR(50) NULL
);

CREATE TABLE Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL
);

CREATE TABLE Orders (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CustomerId INT NOT NULL REFERENCES Customers(Id) ON DELETE CASCADE,
    ProductId INT NOT NULL REFERENCES Products(Id),
    Quantity INT NOT NULL DEFAULT 1,
    OrderDate DATETIME NOT NULL DEFAULT GETDATE(),
    Paid INT NOT NULL DEFAULT 0
);

INSERT INTO Customers (Name, Email, City) VALUES
    ('Anna', 'anna@mail.dk', 'Aarhus'),
    ('Bo', 'bo@mail.dk', 'Odense'),
    ('Carl', 'carl@mail.dk', NULL);

INSERT INTO Products (Name, Price) VALUES
    ('Kaffe', 45.50),
    ('Te', 30.00),
    ('Krus', 79.95);

INSERT INTO Orders (CustomerId, ProductId, Quantity, OrderDate, Paid) VALUES
    (1, 1, 2, '2026-09-01T10:30:00', 1),
    (1, 3, 1, '2026-09-03T14:00:00', 0),
    (2, 2, 4, '2026-09-05T09:15:00', 2);`,
        win: ["Menuen **View** → **SQL Server Object Explorer**.", "Fold **SQL Server** → **(localdb)\\MSSQLLocalDB** ud.", "Højreklik på **Databases** → **Add New Database**. Kald den `ButikDB`.", "Højreklik på `ButikDB` → **New Query…**.", "Skriv scriptet ind, og kør det med den grønne pil ▶ øverst i query-vinduet.", "Fold `ButikDB` → **Tables** ud (højreklik → Refresh, hvis de ikke står der). Højreklik på `dbo.Orders` → **View Data**: der er tre ordrer."],
        mac: "Dette trin er til Windows. Gå videre til næste trin." },
      { t: "ide", h: "Mac: lav butik.db med SQLite",
        md: "Sidder du ved **Windows**, så spring dette trin over.\n\nPå Mac er der ingen LocalDB. Databasen er i stedet en **SQLite-fil**, `butik.db`, der ligger i projektmappen. Scriptet er næsten det samme; forskellene er de samme som i modul 12: `INTEGER PRIMARY KEY AUTOINCREMENT` i stedet for `INT IDENTITY(1,1) PRIMARY KEY`, `CURRENT_TIMESTAMP` i stedet for `GETDATE()`, og datoerne skrives med mellemrum i stedet for `T`.",
        sprog: "sql",
        kode: R`CREATE TABLE Customers (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    City NVARCHAR(50) NULL
);

CREATE TABLE Products (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name NVARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL
);

CREATE TABLE Orders (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    CustomerId INT NOT NULL REFERENCES Customers(Id) ON DELETE CASCADE,
    ProductId INT NOT NULL REFERENCES Products(Id),
    Quantity INT NOT NULL DEFAULT 1,
    OrderDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Paid INT NOT NULL DEFAULT 0
);

INSERT INTO Customers (Name, Email, City) VALUES
    ('Anna', 'anna@mail.dk', 'Aarhus'),
    ('Bo', 'bo@mail.dk', 'Odense'),
    ('Carl', 'carl@mail.dk', NULL);

INSERT INTO Products (Name, Price) VALUES
    ('Kaffe', 45.50),
    ('Te', 30.00),
    ('Krus', 79.95);

INSERT INTO Orders (CustomerId, ProductId, Quantity, OrderDate, Paid) VALUES
    (1, 1, 2, '2026-09-01 10:30:00', 1),
    (1, 3, 1, '2026-09-03 14:00:00', 0),
    (2, 2, 4, '2026-09-05 09:15:00', 2);`,
        win: "Dette trin er til Mac. Du har lavet databasen i trinnet før.",
        mac: ["Højreklik på projektet `Butik` i Rider → **Add** → **File**, og kald filen `butik.sql`. Skriv scriptet ind, og gem.", "Åbn Riders **Terminal** (nederst i vinduet). Gå ind i projektmappen, den mappe hvor `Butik.csproj` ligger (`cd Butik`, hvis du står i løsningens mappe).", "Kør `sqlite3 butik.db < butik.sql`. Programmet `sqlite3` følger med macOS.", "Kør `sqlite3 butik.db \"SELECT * FROM Orders;\"` og se de tre ordrer."] },
      { t: "valg", q: "Du indsætter en ordre med `INSERT INTO Orders (CustomerId, ProductId) VALUES (3, 2);`. Hvad står der i `Quantity` og `OrderDate` bagefter?",
        svar: ["1 og dags dato, fordi kolonnerne har en DEFAULT-værdi", "NULL i begge, fordi de ikke fik en værdi", "Ingenting: sætningen fejler, fordi kolonnerne er NOT NULL", "0 og 1. januar år 1"],
        ret: 0, fordi: "Kolonnerne er `NOT NULL`, men de har en `DEFAULT`. Mangler værdien, bruger databasen standardværdien i stedet for at fejle. Det får betydning for formularen i næste lektion." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på code first og database first, og hvornår vælger man hvilken?",
        svar: "I **code first** skriver jeg **C#-klasserne først**, og Entity Framework laver tabellerne med **migrations**. I **database first** findes **databasen først**, og Entity Framework **scaffolder** klasserne ud fra tabellerne. Database first bruges, når der allerede er en database, fx fra et andet system. Code first er naturligt, når jeg starter fra bunden. I database first er det databasen, der bestemmer: ændringer laves i databasen, og så scaffolder man igen.",
        noegle: ["klasserne først", "databasen først", "migrations", "scaffold", "eksisterende database"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m18l2", titel: "Scaffold-DbContext: lad Entity Framework skrive modellerne", min: 20,
    ord: [
      ["Scaffold-DbContext", "Kommandoen i Package Manager Console, der læser en database og skriver en klasse pr. tabel og en databaseklasse. På Mac: `dotnet ef dbcontext scaffold`."],
      ["Provider", "Den pakke, der kan tale med en bestemt slags database: `Microsoft.EntityFrameworkCore.SqlServer` eller `…Sqlite`."],
      ["-OutputDir", "Hvilken mappe filerne skal lægges i. På Mac: `--output-dir`."],
      ["-Tables", "Hvilke tabeller der skal med. Uden den kommer alt med. På Mac: et `--table` pr. tabel."],
      ["-NoOnConfiguring", "Skriv ikke connection stringen ind i koden. På Mac: `--no-onconfiguring`."],
      ["partial class", "En klasse, der må være delt over flere filer. Delene bliver lagt sammen til én klasse."],
      ["= null!", "\"Den her property er aldrig tom, selv om den starter uden værdi.\" Kolonnen er NOT NULL i databasen."],
      ["OnModelCreating", "Metoden i databaseklassen, hvor nøgler, kolonnetyper og relationer er beskrevet som metodekald."]
    ],
    trin: [
      { t: "ide", h: "Skridt 1: pakkerne",
        md: "Scaffold-kommandoen findes i Entity Frameworks værktøjspakker. Installér dem i projektet `Butik`.",
        win: ["Menuen **Tools** → **NuGet Package Manager** → **Package Manager Console**.", "Skriv de fire linjer én ad gangen, og tryk Enter efter hver:", "`Install-Package Microsoft.EntityFrameworkCore -Version 10.0.12`", "`Install-Package Microsoft.EntityFrameworkCore.SqlServer -Version 10.0.12`", "`Install-Package Microsoft.EntityFrameworkCore.Tools -Version 10.0.12`", "`Install-Package Microsoft.EntityFrameworkCore.Design -Version 10.0.12`"],
        mac: ["Åbn Terminal i projektmappen (der hvor `Butik.csproj` ligger).", "`dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 10.0.12`", "`dotnet add package Microsoft.EntityFrameworkCore.Design --version 10.0.12`", "`dotnet add package Microsoft.EntityFrameworkCore.Tools --version 10.0.12` (uden den nægter værktøjet i skridt 5 at lave controllerne og skriver \"install Entity Framework core packages and try again\")","`dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 10.0.12` (den skal ikke bruges til databasen, men værktøjet, der laver controllere på Mac, kræver den)", "`dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design --version 10.0.2`", "Værktøjerne fra modul 17 blev kun hentet til mappen med FirmaApp (det er det, `dotnet new tool-manifest` gjorde). Hent dem nu til hele maskinen, så de virker i alle projekter: `dotnet tool install --global dotnet-ef --version 10.0.12` og `dotnet tool install --global dotnet-aspnet-codegenerator --version 10.0.2`."] },
      { t: "laes", h: "Skridt 2: én kommando", sprog: "text",
        md: "Hele nyheden i database first er én kommando. Den har fem dele, som skal stå på **én lang linje**:",
        kode: R`Scaffold-DbContext "Server=(localdb)\MSSQLLocalDB;Database=ButikDB;Trusted_Connection=True;TrustServerCertificate=True" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Context ButikContext -Tables Customers, Products, Orders -NoOnConfiguring`,
        noter: [
          ["\"Server=…;Database=ButikDB;…\"", "Connection stringen: hvilken database der skal læses. Her med én omvendt skråstreg, fordi det er almindelig tekst."],
          ["Microsoft.EntityFrameworkCore.SqlServer", "Provideren: pakken, der kan læse en SQL Server-database."],
          ["-OutputDir Models", "Læg filerne i mappen Models."],
          ["-Context ButikContext", "Navnet på databaseklassen. Uden den finder værktøjet selv på et navn."],
          ["-Tables Customers, Products, Orders", "Tag kun disse tre tabeller."],
          ["-NoOnConfiguring", "Skriv ikke connection stringen ind i koden. Den skal stå i appsettings.json."]
        ],
        md2: "På Mac er det den samme kommando i en anden form: `dotnet ef dbcontext scaffold \"Data Source=butik.db\" Microsoft.EntityFrameworkCore.Sqlite --output-dir Models --context ButikContext --table Customers --table Products --table Orders --no-onconfiguring`" },
      { t: "valg", q: "Hvad gør `-Tables Customers, Products, Orders` i scaffold-kommandoen?",
        svar: ["Begrænser kommandoen til de tre tabeller, så andre tabeller og views i databasen ikke kommer med", "Opretter de tre tabeller i databasen", "Sletter alle andre tabeller", "Giver controllerne deres navne"],
        ret: 0, fordi: "Kommandoen **læser** kun databasen; den ændrer intet. Uden `-Tables` bliver alt læst. Læreren ville fx ikke have et view med, for et view har ingen primær nøgle og kan ikke få en controller." },
      { t: "ide", h: "Kør kommandoen",
        md: "Byg projektet én gang først (en scaffold-kommando kræver, at projektet kan bygges). Kør derefter kommandoen.",
        win: ["Menuen **Build** → **Build Solution**.", "Skriv scaffold-kommandoen fra forrige trin på **én linje** i Package Manager Console, og tryk Enter.", "Kig i mappen **Models** i Solution Explorer: der er fire nye filer."],
        mac: ["Kør `dotnet build` i Terminal i projektmappen.", "Kør Mac-udgaven af kommandoen (står under kommandoen i forrige trin) på én linje.", "Kig i mappen **Models** i Rider: der er fire nye filer."],
        md2: "De fire filer er `Customer.cs`, `Order.cs`, `Product.cs` og `ButikContext.cs`. Bemærk: tabellerne hedder `Customers` i flertal, men klasserne `Customer` i ental. Det er værktøjet, der laver om. Hvis kommandoen fejler, så tjek først stavningen af providerens navn og at det hele står på én linje: det var præcis det, der gik galt for læreren." },
      { t: "laes", h: "Det, værktøjet skrev",
        md: "Sådan ser to af modellerne ud. Sammenlign med modul 17: der er ingen `[Key]` og ingen `[Required]`. Reglerne er i stedet læst direkte fra tabellerne.",
        kode: R`public partial class Customer
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? City { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}

public partial class Order
{
    public int Id { get; set; }

    public int CustomerId { get; set; }

    public int ProductId { get; set; }

    public int Quantity { get; set; }

    public DateTime OrderDate { get; set; }

    public int Paid { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}`,
        frag: true,
        noter: [
          ["partial class", "Klassen må deles over flere filer. Se næste trin."],
          ["string Name … = null!;", "Kolonnen er NOT NULL. `null!` siger til compileren: \"den bliver aldrig tom, når den er hentet fra databasen\"."],
          ["string? City", "Kolonnen tillader NULL, så propertyen må være tom (modul 7: `?`)."],
          ["ICollection<Order> Orders", "Navigation property: kundens ordrer. Starter som en tom liste."],
          ["Customer Customer", "Navigation property den anden vej: ordrens kunde. Værktøjet har kaldt den Customer, fordi fremmednøglen hedder CustomerId."]
        ],
        md2: "Hedder fremmednøglen ikke noget med `Id` til sidst, finder værktøjet på mindre pæne navne. I lærerens database hed kolonnen `CId`, og navigation propertyen blev derfor til `CidNavigation`. Det virker på samme måde." },
      { t: "forudsig", q: "To dele af samme `partial class`. Hvad skriver programmet?",
        kode: R`Kunde k = new Kunde();
k.Navn = "Anna";
Console.WriteLine(k.Hilsen());

partial class Kunde
{
    public string Navn { get; set; } = null!;
}

partial class Kunde
{
    public string Hilsen()
    {
        return "Hej " + Navn;
    }
}`,
        output: "Hej Anna",
        fordi: "De to dele bliver lagt sammen til **én** klasse `Kunde`, som både har `Navn` og `Hilsen()`. Det er derfor, værktøjet laver klasserne `partial`: så kan du føje til dem i en **anden fil**, som scaffold-kommandoen aldrig rører." },
      { t: "valg", q: "I den genererede `Customer` står `public string Name { get; set; } = null!;` men `public string? City { get; set; }`. Hvorfor er de forskellige?",
        svar: ["`Name` er NOT NULL i tabellen, mens `City` tillader NULL", "`City` er en fremmednøgle", "`Name` er den primære nøgle", "Det er tilfældigt: værktøjet skiftes til at skrive `?`"],
        ret: 0, fordi: "Værktøjet læser hver kolonne. `City NVARCHAR(50) NULL` må være tom, så den bliver `string?`. `Name … NOT NULL` må ikke, så den bliver `string` med `= null!`." },
      { t: "laes", h: "Databaseklassen ButikContext",
        md: "`ButikContext` ligner databaseklassen fra modul 17: den arver fra `DbContext`, har en konstruktør, der sender `options` videre til `base`, og en `DbSet` pr. tabel. Det nye er metoden `OnModelCreating`. Her står reglerne om kolonner og relationer som **kæder af metodekald** i stedet for attributter. Du skal ikke kunne skrive det; du skal kunne **læse** det. Her er stykket om ordrer (Mac-udgaven):",
        kode: R`public partial class ButikContext : DbContext
{
    public ButikContext(DbContextOptions<ButikContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Customer> Customers { get; set; }
    public virtual DbSet<Order> Orders { get; set; }
    public virtual DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Order>(entity =>
        {
            entity.Property(e => e.CustomerId).HasColumnType("INT");
            entity.Property(e => e.OrderDate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("DATETIME");
            entity.Property(e => e.Paid).HasColumnType("INT");
            entity.Property(e => e.ProductId).HasColumnType("INT");
            entity.Property(e => e.Quantity)
                .HasDefaultValue(1)
                .HasColumnType("INT");

            entity.HasOne(d => d.Customer).WithMany(p => p.Orders).HasForeignKey(d => d.CustomerId);

            entity.HasOne(d => d.Product).WithMany(p => p.Orders)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        // … Customer og Product er beskrevet på samme måde …
    }
}`,
        frag: true,
        noter: [
          ["DbSet<Order> Orders", "Tabellen Orders, som du henter fra med `_context.Orders`."],
          ["HasDefaultValueSql(…)", "Kolonnen har en DEFAULT i databasen."],
          ["HasOne(d => d.Customer).WithMany(p => p.Orders)", "Hver ordre har **én** kunde, og en kunde har **mange** ordrer …"],
          [".HasForeignKey(d => d.CustomerId)", "… forbundet med fremmednøglen CustomerId."],
          [".OnDelete(DeleteBehavior.ClientSetNull)", "Der er ingen CASCADE på varer. Det betyder noget i lektion 6."]
        ],
        md2: "På Windows ser stykket lidt anderledes ud, fordi det er en SQL Server-database: du vil også se `HasKey(e => e.Id).HasName(\"PK__Orders__…\")` med navnet på den primære nøgle, `HasMaxLength(50)` for tekstkolonnerne og `(getdate())` i stedet for `CURRENT_TIMESTAMP`. Betydningen er den samme." },
      { t: "valg", q: "Hvad betyder `entity.HasOne(d => d.Product).WithMany(p => p.Orders).HasForeignKey(d => d.ProductId)`?",
        svar: ["Hver ordre har én vare, en vare kan have mange ordrer, og de er forbundet med fremmednøglen ProductId", "Hver vare har én ordre", "Der skal oprettes en ny tabel, der hedder ProductId", "Ordren må kun indeholde én vare, og varen skal slettes bagefter"],
        ret: 0, fordi: "Læs det som en sætning: ordren **har én** vare, varen **har mange** ordrer, **med fremmednøglen** ProductId. Det er en en-til-mange-relation (modul 12)." },
      { t: "ide", h: "Skridt 3 og 4: forbindelsen",
        md: "Fordi du skrev `-NoOnConfiguring`, ved databaseklassen ikke, hvor databasen er. Det skal stå i `appsettings.json` (skridt 3) og registreres i `Program.cs` (skridt 4), præcis som i modul 17. Navnet `Butik` i de to filer skal være ens.",
        kode: R`// Program.cs, øverst:
using Butik.Models;
using Microsoft.EntityFrameworkCore;

// Program.cs, under AddControllersWithViews():
builder.Services.AddDbContext<ButikContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Butik")));`,
        frag: true,
        win: ["Åbn `appsettings.json`, og tilføj efter `\"AllowedHosts\": \"*\"` et komma og: `\"ConnectionStrings\": { \"Butik\": \"Server=(localdb)\\\\MSSQLLocalDB;Database=ButikDB;Trusted_Connection=True;TrustServerCertificate=True\" }` — her med **to** omvendte skråstreger, fordi det er JSON.", "Skriv de to `using`-linjer og `AddDbContext` ind i `Program.cs` som vist.", "Build Solution: 0 fejl."],
        mac: ["Åbn `appsettings.json`, og tilføj efter `\"AllowedHosts\": \"*\"` et komma og: `\"ConnectionStrings\": { \"Butik\": \"Data Source=butik.db\" }`", "Skriv de to `using`-linjer og `AddDbContext` ind i `Program.cs`, men med `UseSqlite` i stedet for `UseSqlServer`.", "Byg: 0 fejl."],
        md2: "`AddDbContext` registrerer databaseklassen som en **service**. Når en controller beder om en `ButikContext` i sin konstruktør, laver ASP.NET Core en til den (dependency injection fra modul 17)." },
      { t: "skriv", q: "Skriv linjen i `Program.cs`, der registrerer `ButikContext` som service. Brug `UseSqlServer` (Windows) eller `UseSqlite` (Mac), og hent connection stringen, der hedder `\"Butik\"`, med `builder.Configuration.GetConnectionString`.",
        frag: true,
        tjek: [
          [/builder\.Services\.AddDbContext<ButikContext>\(/, "Start med `builder.Services.AddDbContext<ButikContext>(`"],
          [/options=>options\.Use(SqlServer|Sqlite)\(/, "Brug lambdaen `options => options.UseSqlServer(` (eller `UseSqlite`)"],
          ['builder.Configuration.GetConnectionString("Butik")', "Hent connection stringen med `builder.Configuration.GetConnectionString(\"Butik\")`"],
          [/\)\);$/, "Afslut med `));`"]
        ],
        forkert: ["builder.Services.AddDbContext<ButikContext>(options => options.UseSqlServer(\"Butik\"));"],
        loesning: R`builder.Services.AddDbContext<ButikContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Butik")));`,
        fordi: "Skriver du bare `\"Butik\"`, prøver Entity Framework at bruge ordet Butik som connection string, og det går galt, første gang en side henter data." },
      { t: "ide", h: "Skridt 5: controllere med views",
        md: "Lav en controller med views til hver af de tre modeller: `CustomersController`, `ProductsController` og `OrdersController`. Det er det samme som i modul 17.",
        win: ["Højreklik på mappen **Controllers** → **Add** → **Controller…**.", "Vælg **MVC Controller with views, using Entity Framework** → Add.", "Model class: `Customer`. DbContext class: `ButikContext`. Controller name: `CustomersController`. Klik Add.", "Gør det samme for `Product` (ProductsController) og `Order` (OrdersController).", "Kør projektet, og skriv `/Customers`, `/Products` og `/Orders` efter adressen i browseren."],
        mac: ["Kør disse tre linjer i Terminal i projektmappen, én ad gangen:", "`dotnet aspnet-codegenerator controller -name CustomersController -m Customer -dc ButikContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries`", "Det samme med `-name ProductsController -m Product` og med `-name OrdersController -m Order`.", "Kør projektet, og skriv `/Customers`, `/Products` og `/Orders` efter adressen i browseren."],
        md2: "Details, Edit og Delete virker med det samme. Nøglerne hedder `Id`, så parameteren i actions hedder `id`, og det passer med standardruten (lektion 3). Ordrelisten viser stadig tal i stedet for navne; det retter du i lektion 5." },
      { t: "laes", h: "Når Create ikke gemmer",
        md: "Prøv **Create New** under `/Orders`, og klik Create. Der sker … ingenting. Siden kommer bare igen, og ordren bliver ikke gemt. Det er den mest almindelige fejl i database first, så den skal du kende.\n\nSæt et **breakpoint** på linjen `if (ModelState.IsValid)` i `Create`-actionen med `[HttpPost]`, og kør med debuggeren. Når den stopper, kan du se, at `ModelState.IsValid` er `false`: hold musen over `IsValid` i koden. Hvilke felter der er galt, ser du nemmest på siden selv: ret `asp-validation-summary=\"ModelOnly\"` til `asp-validation-summary=\"All\"` i `Create.cshtml`, og prøv igen. Nu står der `The Customer field is required.` og `The Product field is required.` øverst i formularen.\n\nÅrsagen: navigation propertyen hedder `public virtual Customer Customer { get; set; } = null!;`. Den er **ikke** markeret med `?`, og så regner ASP.NET Core den som påkrævet. Men formularen sender kun `CustomerId`, aldrig et helt kundeobjekt. Løsningen er at fjerne de to fejl, før der tjekkes:",
        kode: R`ModelState.Remove("Customer");
ModelState.Remove("Product");
if (ModelState.IsValid)
{
    _context.Add(order);
    await _context.SaveChangesAsync();
    return RedirectToAction(nameof(Index));
}`,
        frag: true,
        md2: "Skriv de to `Remove`-linjer i **både** `Create` og `Edit` (dem med `[HttpPost]`). Ret ikke i `Order.cs`: den bliver skrevet forfra, næste gang du scaffolder. Bemærk også, at formularen måske ikke har felter for antal og dato. Så sætter databasen selv sin `DEFAULT`: 1 og dags dato." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad gør scaffold-kommandoen i database first, og hvorfor skal man ikke rette i de filer, den laver?",
        svar: "Kommandoen **læser databasen** og skriver en **modelklasse pr. tabel** og en **databaseklasse**, der arver fra `DbContext`, med en `DbSet` pr. tabel og reglerne i `OnModelCreating`. Den skal have en **connection string**, en **provider**, en mappe og de tabeller, der skal med. Når databasen ændres, kører man kommandoen igen med `-Force`, og så bliver filerne **skrevet forfra**. Derfor retter man ikke i dem; man lægger egne tilføjelser i andre filer, fx en anden del af en `partial class` eller en view model.",
        noegle: ["læser databasen", "klasse pr. tabel", "DbContext", "connection string", "skrevet forfra"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m18l3", titel: "Routing: fra adresse til action", min: 20,
    ord: [
      ["Routing", "Den del af ASP.NET Core, der ud fra adressen beslutter, hvilken controller og action der skal køre."],
      ["Rute (route)", "Et mønster for adresser, fx `{controller=Home}/{action=Index}/{id?}`."],
      ["Konventionel routing", "Ruter, der står samlet i `Program.cs` med `app.MapControllerRoute`."],
      ["Attribute routing", "En rute skrevet som attribut direkte over den action, den hører til: `[Route(\"kunde/{navn}\")]`."],
      ["Ruteparameter", "Et stykke af adressen i krøllede parenteser, fx `{id}`. Værdien bliver sendt til actionens parameter med samme navn."],
      ["Constraint (begrænsning)", "En regel på en ruteparameter, fx `{id:int}`: adressen passer kun, hvis det er et heltal."],
      ["asp-route-…", "Tag helper, der lægger en værdi i et link: `asp-route-id=\"5\"` giver `/…/5`."]
    ],
    trin: [
      { t: "laes", h: "Standardruten",
        md: "Når browseren beder om en adresse, skal ASP.NET Core finde ud af, hvilken action der skal køre. Det hedder **routing**. Reglerne står nederst i `Program.cs`. Den rute, der følger med projektet, ser sådan ud:",
        kode: R`app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();`,
        frag: true,
        noter: [
          ["{controller=Home}", "Første del af adressen er controllerens navn (uden \"Controller\"). Mangler den, bruges Home."],
          ["{action=Index}", "Anden del er actionens navn. Mangler den, bruges Index."],
          ["{id?}", "Tredje del sendes til parameteren `id`. Spørgsmålstegnet betyder: den må mangle."]
        ],
        md2: "Eksempler fra Butik:\n\n- `/Orders/Details/3` → `OrdersController`, action `Details`, `id = 3`\n- `/Customers` → `CustomersController`, action `Index`, intet id\n- `/` → `HomeController`, action `Index`" },
      { t: "valg", q: "Med standardruten: hvilken action kører, når adressen er `/Products/Edit/2`?",
        svar: ["`Edit` i `ProductsController`, med `id = 2`", "`Index` i `ProductsController`, med `id = 2`", "`Edit` i `HomeController`", "`Products` i `EditController`"],
        ret: 0, fordi: "Første del er controlleren (Products → `ProductsController`), anden del er actionen (Edit), tredje del er id." },
      { t: "spor", q: "Routing deler adressen op ved skråstregerne. Følg programmet, og skriv værdierne ned efter hver linje.",
        kode: R`string adresse = "Orders/Details/5";
string[] dele = adresse.Split('/');
string controller = dele[0];
string action = dele[1];
string id = dele[2];`,
        kolonner: ["controller", "action", "id"],
        raekker: [[1, "=–", "=–", "=–"], [2, "=–", "=–", "=–"], [3, "Orders", "–", "–"], [4, "Orders", "Details", "–"], [5, "Orders", "Details", "5"]],
        fordi: "`Split('/')` giver arrayet {\"Orders\", \"Details\", \"5\"}. Det er præcis sådan, standardruten læser adressen: plads 0 er controlleren, plads 1 er actionen, plads 2 er id. (ASP.NET Core gør meget mere, men princippet er det samme.)" },
      { t: "forudsig", q: "Her er standardværdierne fra `{controller=Home}/{action=Index}/{id?}` skrevet som C#. Hvad skriver programmet?",
        kode: R`string adresse = "Customers";
string[] dele = adresse.Split('/');

string controller = dele[0] != "" ? dele[0] : "Home";
string action = dele.Length > 1 ? dele[1] : "Index";
string id = dele.Length > 2 ? dele[2] : "(intet)";

Console.WriteLine(controller + "Controller." + action);
Console.WriteLine("id: " + id);`,
        output: "CustomersController.Index\nid: (intet)",
        fordi: "Adressen har kun én del. Controlleren bliver Customers. Der er ingen plads 1, så actionen får standardværdien Index. Der er heller ingen plads 2, så der er intet id: det er `?` i `{id?}`." },
      { t: "laes", h: "Din egen konventionelle rute",
        md: "Du kan selv lægge ruter til i `Program.cs`. Her får varelisten den korte adresse `/varer`. Ruten skal stå **over** standardruten, fordi ruterne bliver prøvet i rækkefølge:",
        kode: R`app.MapControllerRoute(
    name: "varer",
    pattern: "varer",
    defaults: new { controller = "Products", action = "Index" });

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();`,
        frag: true,
        noter: [
          ["name: \"varer\"", "Et navn til ruten. Det skal bare være forskelligt fra de andre."],
          ["pattern: \"varer\"", "Adressen. Her er der ingen variable dele."],
          ["defaults: new { … }", "Hvilken controller og action ruten fører til."]
        ],
        md2: "Afprøvet: `/varer` viser varelisten, og `/Products` virker stadig. Og links, der er lavet med `asp-controller=\"Products\" asp-action=\"Index\"`, peger nu på `/varer`, fordi ASP.NET Core bruger den første rute, der passer, når den **laver** links." },
      { t: "udfyld", frag: true, q: "Lav en rute, så adressen `/ordrer` viser ordrelisten (`Index` i `OrdersController`).",
        kode: R`app.MapControllerRoute(
    name: "ordrer",
    pattern: "[[ordrer]]",
    defaults: new { controller = "[[Orders]]", action = "[[Index]]" });`,
        fordi: "`pattern` er adressen. Controllerens navn skrives uden \"Controller\": `Orders`. Actionen er `Index`." },
      { t: "laes", h: "Attribute routing: ruten over actionen",
        md: "Med mange særlige ruter bliver `Program.cs` uoverskuelig. Den anden måde er at skrive ruten **direkte over actionen** med `[Route(…)]`. Så står adresse og kode samme sted. Læreren kalder det \"nemmere, kortere og smartere\". Her kan man finde en kunde på navnet med `/kunde/Anna`:",
        kode: R`// GET: /kunde/Anna
[Route("kunde/{navn}")]
public async Task<IActionResult> VisMedNavn(string navn)
{
    var customer = await _context.Customers
        .FirstOrDefaultAsync(c => c.Name.ToLower() == navn.ToLower());
    if (customer == null)
    {
        return NotFound();
    }

    return View("Details", customer);
}`,
        frag: true,
        noter: [
          ["[Route(\"kunde/{navn}\")]", "Adressen er ordet kunde, en skråstreg og et navn."],
          ["string navn", "Parameteren skal hedde **præcis** det samme som `{navn}` i ruten. Ellers bliver den null."],
          [".ToLower()", "Begge navne med små bogstaver, så Anna, anna og ANNA alle virker."],
          ["View(\"Details\", customer)", "Der findes intet view, der hedder VisMedNavn. Genbrug Details."]
        ],
        md2: "Afprøvet i Butik: `/kunde/anna` og `/kunde/ANNA` viser Anna, og `/kunde/Zorro` giver 404. Én ting at vide: når en action har `[Route]`, kan den **kun** nås ad den rute. `/Customers/VisMedNavn?navn=Anna` giver 404." },
      { t: "fejl", frag: true, q: "Adressen `/kunde/Bo` giver altid 404, selv om Bo findes i databasen. Ruten i linje 1 skal blive, som den er. Klik på den linje, der skal rettes.",
        kode: R`[Route("kunde/{navn}")]
public async Task<IActionResult> VisMedNavn(string? kundenavn)
{
    if (kundenavn == null)
    {
        return NotFound();
    }
    var customer = await _context.Customers
        .FirstOrDefaultAsync(c => c.Name.ToLower() == kundenavn.ToLower());
    if (customer == null)
    {
        return NotFound();
    }
    return View("Details", customer);
}`,
        linje: 2,
        fordi: "Ruten kalder værdien `{navn}`, men parameteren hedder `kundenavn`. Navnene passer ikke, så `kundenavn` er altid `null`, og actionen svarer `NotFound()`. Med et breakpoint på linje 4 ville du se `kundenavn = null` i debuggeren. Afprøvet: fejlen giver 404 på hver eneste adresse.",
        rettet: R`[Route("kunde/{navn}")]
public async Task<IActionResult> VisMedNavn(string? navn)
{
    if (navn == null)
    {
        return NotFound();
    }
    var customer = await _context.Customers
        .FirstOrDefaultAsync(c => c.Name.ToLower() == navn.ToLower());
    if (customer == null)
    {
        return NotFound();
    }
    return View("Details", customer);
}` },
      { t: "laes", h: "Constraints: regler for ruteparametre",
        md: "Efter et kolon i en ruteparameter kan du skrive en **constraint**: en regel, som værdien skal opfylde, ellers passer adressen ikke. Her vises ordrerne fra én måned:",
        kode: R`// GET: /ordrer/2026/9
[Route("ordrer/{aar:int}/{maaned:int:range(1,12)}")]
public async Task<IActionResult> Maaned(int aar, int maaned)
{
    var ordrer = await _context.Orders
        .Include(o => o.Customer)
        .Include(o => o.Product)
        .Where(o => o.OrderDate.Year == aar && o.OrderDate.Month == maaned)
        .ToListAsync();
    return View("Index", ordrer);
}`,
        frag: true,
        noter: [
          ["{aar:int}", "aar skal være et heltal."],
          ["{maaned:int:range(1,12)}", "maaned skal være et heltal fra 1 til 12. Flere regler sættes efter hinanden med kolon."]
        ],
        md2: "Afprøvet: `/ordrer/2026/9` virker. `/ordrer/2026/13` og `/ordrer/abc/9` giver 404, og actionen bliver slet ikke kaldt. Andre nyttige constraints: `min(1)`, `max(100)`, `bool`, `decimal`, `alpha` (kun bogstaver) og `minlength(2)`." },
      { t: "valg", q: "Hvilken adresse passer til ruten `[Route(\"ordrer/{aar:int}/{maaned:int:range(1,12)}\")]`?",
        svar: ["`/ordrer/2026/12`", "`/ordrer/2026/0`", "`/ordrer/september/2026`", "`/ordrer/2026`"],
        ret: 0, fordi: "2026 og 12 er heltal, og 12 ligger mellem 1 og 12. 0 er uden for intervallet, september er ikke et tal, og `/ordrer/2026` mangler måneden." },
      { t: "valg", sprog: "razor", q: "Ordren har `Id` 7. Hvilken adresse peger linket på?",
        kode: R`<a asp-action="Edit" asp-route-id="@item.Id">Edit</a>`,
        svar: ["`/Orders/Edit/7`", "`/Orders/Edit?item.Id=7`", "`/Edit/7`", "`/Orders/Edit/@item.Id`"],
        ret: 0, fordi: "`asp-route-id` lægger værdien i ruteparameteren `id`. Standardruten har en plads til id, så den kommer med i stien. Controlleren er den, viewet hører til (Orders)." },
      { t: "skriv", sprog: "razor", q: "I ordrelisten skal kundens navn være et link til `/kunde/…`. Skriv et `<a>`-tag med `asp-controller=\"Customers\"`, `asp-action=\"VisMedNavn\"` og `asp-route-navn=\"@item.Kunde\"`. Teksten i linket er `@item.Kunde`.",
        tjek: [
          ['asp-controller="Customers"', "Controlleren: `asp-controller=\"Customers\"`"],
          ['asp-action="VisMedNavn"', "Actionen: `asp-action=\"VisMedNavn\"`"],
          ['asp-route-navn="@item.Kunde"', "Navnet i ruten: `asp-route-navn=\"@item.Kunde\"` (navn som i `{navn}`)"],
          [/>@item\.Kunde<\/a>/, "Linkets tekst er `@item.Kunde`, og tagget lukkes med `</a>`"]
        ],
        forkert: ['<a asp-controller="Customers" asp-action="VisMedNavn" asp-route-id="@item.Kunde">@item.Kunde</a>'],
        loesning: R`<a asp-controller="Customers" asp-action="VisMedNavn" asp-route-navn="@item.Kunde">@item.Kunde</a>`,
        fordi: "Afprøvet: linket bliver til `<a href=\"/kunde/Anna\">Anna</a>`. Tag helperen finder selv ruten `kunde/{navn}`, fordi `asp-route-navn` passer med `{navn}`." },
      { t: "ide", h: "Tre nye ruter i Butik",
        md: "Byg de tre ruter fra lektionen ind i Butik, og prøv dem i browseren.",
        win: ["`Program.cs`: læg ruten `varer` over standardruten.", "`CustomersController`: tilføj actionen `VisMedNavn` med `[Route(\"kunde/{navn}\")]`.", "`OrdersController`: tilføj actionen `Maaned` med `[Route(\"ordrer/{aar:int}/{maaned:int:range(1,12)}\")]`.", "Kør, og prøv `/varer`, `/kunde/anna`, `/kunde/Zorro`, `/ordrer/2026/9` og `/ordrer/2026/13`.", "Sæt et breakpoint i `VisMedNavn`, og se i **Locals**, at `navn` har værdien fra adressen."],
        mac: ["`Program.cs`: læg ruten `varer` over standardruten.", "`CustomersController`: tilføj actionen `VisMedNavn` med `[Route(\"kunde/{navn}\")]`.", "`OrdersController`: tilføj actionen `Maaned` med `[Route(\"ordrer/{aar:int}/{maaned:int:range(1,12)}\")]`.", "Kør, og prøv `/varer`, `/kunde/anna`, `/kunde/Zorro`, `/ordrer/2026/9` og `/ordrer/2026/13`.", "Sæt et breakpoint i `VisMedNavn`, start med debuggeren (den grønne bille), og se i **Threads & Variables**, at `navn` har værdien fra adressen."],
        md2: "Forventet: Anna vises for `/kunde/anna`. `/kunde/Zorro` og `/ordrer/2026/13` giver 404. `/ordrer/2026/9` viser de tre ordrer fra september." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er routing, og hvad er forskellen på konventionel routing og attribute routing?",
        svar: "**Routing** bestemmer ud fra adressen, hvilken **controller og action** der skal køre, og hvilke værdier parametrene får. **Konventionel routing** står samlet i `Program.cs` med `MapControllerRoute`, fx standardruten `{controller=Home}/{action=Index}/{id?}`. **Attribute routing** skrives som `[Route(\"kunde/{navn}\")]` direkte over actionen, så adresse og kode står samme sted. Navnet i krøllede parenteser skal passe med **parameterens navn**, og med **constraints** som `{id:int}` kan jeg kræve, at værdien har en bestemt form.",
        noegle: ["controller og action", "Program.cs", "[Route]", "parameter", "constraint"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m18l4", titel: "Layout og navigation i en rigtig app", min: 16,
    ord: [
      ["Layout", "Den fælles ramme om alle sider: menu, top og bund. Ligger i `Views/Shared/_Layout.cshtml`."],
      ["@RenderBody()", "Stedet i layoutet, hvor den enkelte sides indhold bliver sat ind."],
      ["ViewData[\"Title\"]", "Sidens titel. Viewet sætter den, og layoutet skriver den i fanebladet."],
      ["Partial view", "Et lille stykke Razor i sin egen fil (navnet starter med `_`), som kan sættes ind i andre views med `<partial name=\"…\" />`."],
      ["Section", "Et navngivet stykke af et view, som layoutet sætter ind et bestemt sted: `@section Scripts { … }`."],
      ["View component", "Som et partial view, men med sin egen C#-klasse, der kan hente data. Bruges fx til en kurv i menuen."],
      ["Navbar", "Bootstraps menulinje øverst på siden (klasserne `navbar`, `nav-item`, `nav-link`)."]
    ],
    trin: [
      { t: "laes", h: "Layoutet: rammen om alle sider", sprog: "razor",
        md: "Fra modul 16 kender du `_Layout.cshtml`: den fælles ramme. Hver side bliver sat ind ved `@RenderBody()`. Titlen i fanebladet kommer fra `ViewData[\"Title\"]`, som hvert view selv sætter øverst:",
        kode: R`<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="utf-8" />
    <title>@ViewData["Title"] - Butik</title>
    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
</head>
<body>
    <header> … menuen … </header>
    <div class="container">
        <main role="main" class="pb-3">
            @RenderBody()
        </main>
    </div>
    <script src="~/lib/jquery/dist/jquery.min.js"></script>
    <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>`,
        noter: [
          ["@ViewData[\"Title\"]", "Viewet skriver fx `ViewData[\"Title\"] = \"Ordrer\";`. Så står der \"Ordrer - Butik\" i fanebladet."],
          ["@RenderBody()", "Her kommer den enkelte sides indhold."],
          ["RenderSectionAsync(\"Scripts\", …)", "Her kommer et views section, der hedder Scripts. Se senere i lektionen."]
        ] },
      { t: "valg", q: "`Views/Orders/Index.cshtml` starter med `@{ ViewData[\"Title\"] = \"Ordrer\"; }`. Hvad står der i browserens faneblad?",
        svar: ["Ordrer - Butik", "Index - Butik", "Butik", "@ViewData[\"Title\"] - Butik"],
        ret: 0, fordi: "Layoutet skriver `@ViewData[\"Title\"] - Butik` i `<title>`. Viewet har sat titlen til Ordrer, før layoutet bliver tegnet." },
      { t: "laes", h: "En rigtig menu", sprog: "razor",
        md: "Skabelonens menu har kun Home og Privacy. Butik skal have Kunder, Varer og Ordrer. Hvert punkt er et `<li>` med Bootstraps klasser, og linket laves med tag helpers, så adressen altid passer med ruterne:",
        kode: R`<ul class="navbar-nav flex-grow-1">
    <li class="nav-item">
        <a class="nav-link text-dark" asp-controller="Home" asp-action="Index">Forside</a>
    </li>
    <li class="nav-item">
        <a class="nav-link text-dark" asp-controller="Customers" asp-action="Index">Kunder</a>
    </li>
    <li class="nav-item">
        <a class="nav-link text-dark" asp-controller="Products" asp-action="Index">Varer</a>
    </li>
    <li class="nav-item">
        <a class="nav-link text-dark" asp-controller="Orders" asp-action="Index">Ordrer</a>
    </li>
</ul>`,
        noter: [
          ["navbar-nav", "Bootstrap: en liste af menupunkter i menulinjen."],
          ["nav-item / nav-link", "Bootstrap: ét menupunkt og dets link."],
          ["asp-controller / asp-action", "Tag helpers: ASP.NET Core skriver den rigtige `href`. For Varer bliver det `/varer`, fordi den rute står først."]
        ],
        md2: "Skriv aldrig `href=\"/Products\"` i hånden. Ændrer du ruterne, passer tag helpers sig selv; håndskrevne adresser gør ikke." },
      { t: "orden", sprog: "razor", q: "Sæt linjerne i rækkefølge, så de giver ét menupunkt til Kunder.",
        linjer: [
          R`<li class="nav-item">`,
          R`    <a class="nav-link text-dark"`,
          R`       asp-controller="Customers" asp-action="Index">`,
          R`        Kunder`,
          R`    </a>`,
          R`</li>`
        ],
        fordi: "`<li>` er yderst, `<a>` indeni. Attributterne står i start-tagget før `>`, teksten mellem `<a …>` og `</a>`." },
      { t: "laes", h: "Partial view: menuen i sin egen fil", sprog: "razor",
        md: "Layoutet bliver langt. Menuen kan flyttes ud i sin egen fil, et **partial view**. Lav filen `Views/Shared/_Menu.cshtml`, og flyt hele `<ul>…</ul>` derind. I layoutet står der så kun:",
        kode: R`<div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
    <partial name="_Menu" />
</div>`,
        noter: [
          ["_Menu.cshtml", "Understregen i starten betyder: det er ikke en hel side, men et stykke, der sættes ind andre steder."],
          ["<partial name=\"_Menu\" />", "Sæt indholdet af `_Menu.cshtml` ind her."],
          ["Views/Shared", "Her leder ASP.NET Core efter partial views, når de ikke findes i controllerens egen mappe."]
        ],
        md2: "Partial views bruges også til ting, der går igen på flere sider, fx et kort med en vare. Har stykket brug for **sine egne data** fra databasen på hver side (fx \"3 varer i kurven\" i menuen), bruger man i stedet en **view component**: et partial view med sin egen C#-klasse. Det skal du bare kende navnet på." },
      { t: "valg", q: "Hvornår er et **partial view** det rigtige valg?",
        svar: ["Når et stykke HTML skal genbruges i flere views eller trækkes ud af et langt layout", "Når en side skal have sin egen adresse", "Når en action skal hente data fra databasen", "Når man vil undgå at bruge layoutet"],
        ret: 0, fordi: "Et partial view er et genbrugeligt stykke Razor. Det har ingen adresse og ingen controller. Skal stykket selv hente data, er det en view component." },
      { t: "laes", h: "Sections: scripts kun der, hvor de skal bruges", sprog: "razor",
        md: "Create- og Edit-siderne skal bruge jQuerys validerings-scripts, men forsiden skal ikke. Derfor sætter viewet sine scripts i en **section**, og layoutet indsætter den med `RenderSectionAsync(\"Scripts\", required: false)` lige før `</body>`. Nederst i den genererede `Create.cshtml` står:",
        kode: R`@section Scripts {
    @{await Html.RenderPartialAsync("_ValidationScriptsPartial");}
}`,
        noter: [
          ["@section Scripts { … }", "Et stykke, der hedder Scripts. Det bliver **ikke** skrevet her, men der hvor layoutet beder om det."],
          ["required: false", "Views uden en Scripts-section er også i orden."],
          ["_ValidationScriptsPartial", "Et partial view, der henter jQuery Validation, så formularen tjekkes allerede i browseren."]
        ] },
      { t: "fejl", sprog: "razor", frag: true, q: "Efter en lille rettelse giver Create-siden en fejl med teksten `The following sections have been defined but have not been rendered by the page at '/Views/Shared/_Layout.cshtml': 'Script'`. Hvilken linje er fejlen i?",
        kode: R`<div>
    <a asp-action="Index">Back to List</a>
</div>

@section Script {
    @{await Html.RenderPartialAsync("_ValidationScriptsPartial");}
}`,
        linje: 5,
        fordi: "Sectionen hedder `Script`, men layoutet beder kun om `Scripts`. En section, som layoutet aldrig indsætter, giver en fejl, når siden vises. Afprøvet: præcis den fejltekst kommer, når der mangler et s.",
        rettet: R`<div>
    <a asp-action="Index">Back to List</a>
</div>

@section Scripts {
    @{await Html.RenderPartialAsync("_ValidationScriptsPartial");}
}` },
      { t: "udfyld", sprog: "razor", q: "Sæt titlen til Kunder, og sæt menuen ind fra partial viewet `_Menu`.",
        kode: R`@{
    ViewData["[[Title]]"] = "Kunder";
}

<partial name="[[_Menu]]" />`,
        fordi: "Layoutet læser `ViewData[\"Title\"]`. Et partial view sættes ind med `<partial name=\"…\" />` og filens navn uden `.cshtml`." },
      { t: "ide", h: "Butik får en menu",
        md: "Giv Butik en dansk menu i et partial view, og giv siderne danske titler.",
        win: ["Højreklik på **Views/Shared** → **Add** → **View…** → **Razor View - Empty**, og kald den `_Menu.cshtml`.", "Flyt `<ul class=\"navbar-nav flex-grow-1\">…</ul>` fra `_Layout.cshtml` over i `_Menu.cshtml`, og ret punkterne til Forside, Kunder, Varer og Ordrer.", "Skriv `<partial name=\"_Menu\" />` i layoutet, hvor listen stod.", "Ret `ViewData[\"Title\"]` i de tre `Index.cshtml` til Kunder, Varer og Ordrer.", "Kør, klik rundt i menuen, og se titlen i fanebladet skifte."],
        mac: ["Højreklik på **Views/Shared** → **Add** → **File**, og kald den `_Menu.cshtml`.", "Flyt `<ul class=\"navbar-nav flex-grow-1\">…</ul>` fra `_Layout.cshtml` over i `_Menu.cshtml`, og ret punkterne til Forside, Kunder, Varer og Ordrer.", "Skriv `<partial name=\"_Menu\" />` i layoutet, hvor listen stod.", "Ret `ViewData[\"Title\"]` i de tre `Index.cshtml` til Kunder, Varer og Ordrer.", "Kør, klik rundt i menuen, og se titlen i fanebladet skifte."],
        md2: "Højreklik i browseren → **Vis sidekilde**, og find menuen: linket til Varer peger på `/varer`. Det er din rute fra lektion 3." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på layoutet, et partial view og en section?",
        svar: "**Layoutet** er den fælles ramme om alle sider, med menu og scripts, og siden sættes ind ved `@RenderBody()`. Et **partial view** er et lille genbrugeligt stykke Razor i sin egen fil, fx `_Menu.cshtml`, som sættes ind med `<partial name=\"_Menu\" />`. En **section** er et navngivet stykke af et view, fx `@section Scripts`, som **layoutet** sætter ind et bestemt sted med `RenderSectionAsync`. Så kan validerings-scripts kun komme med på de sider, der har formularer.",
        noegle: ["fælles ramme", "RenderBody", "genbrug", "partial", "section", "RenderSectionAsync"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m18l5", titel: "View models, datoer og kroner", min: 20,
    ord: [
      ["Entity", "En klasse, der svarer til en tabel, fx `Order`. Det er dem, scaffold-kommandoen skriver."],
      ["View model", "En klasse, der er lavet til ét bestemt view, med præcis de felter, viewet skal vise."],
      ["Projektion (Select)", "At lave hvert element om til noget andet: `ordrer.Select(o => new OrdreLinje { … })`."],
      ["[Display(Name = …)]", "Attribut, der giver en property et pænt navn, som `DisplayNameFor` og `<label>` viser."],
      ["[DataType(…)]", "Attribut, der siger, hvad slags værdi det er, fx `DataType.Date` (kun dato) eller `DataType.Currency` (beløb)."],
      ["Kultur (culture)", "Sprog- og landeindstilling, der bestemmer, hvordan tal og datoer skrives. `da-DK`: komma som decimaltegn og \"kr.\"."],
      ["Formatstreng \"C\"", "`beloeb.ToString(\"C\")` skriver et beløb som valuta i den aktuelle kultur, fx `91,00 kr.`."]
    ],
    trin: [
      { t: "laes", h: "Hvorfor ikke bare sende entities til viewet?",
        md: "Indtil nu får ordrelisten en `List<Order>` direkte fra databasen. Det giver tre problemer:\n\n1. Viewet viser **tal**, hvor brugeren vil se **tekst**: `CustomerId` i stedet for navnet, `Paid` som 0, 1 eller 2.\n2. Pæne navne som `[Display(Name = \"Kunde\")]` kan ikke skrives i `Order.cs`, for den bliver **skrevet forfra**, næste gang du scaffolder.\n3. Viewet får **alt** fra tabellen, også det, det ikke skal bruge.\n\nLøsningen er en **view model**: en lille klasse, der er lavet til netop ét view, med præcis de felter, det skal vise. Controlleren laver entities om til view models; viewet ser aldrig entityen." },
      { t: "valg", q: "Du vil have, at kolonnen hedder \"Kunde\" i stedet for \"Customer\". Hvorfor skriver du ikke bare `[Display(Name = \"Kunde\")]` i den genererede `Order.cs`?",
        svar: ["Fordi filen bliver skrevet forfra, næste gang du kører scaffold-kommandoen med -Force, og så forsvinder attributten", "Fordi attributter ikke virker i database first", "Fordi `Order.cs` er skrivebeskyttet", "Fordi `[Display]` kun virker i Program.cs"],
        ret: 0, fordi: "Det virker, indtil du scaffolder igen. Så er rettelsen væk uden varsel. En view model er din egen fil, som værktøjet aldrig rører." },
      { t: "laes", h: "View modellen OrdreLinje",
        md: "Lav mappen `ViewModels` i projektet, og læg klassen `OrdreLinje` deri. Den har kun det, ordrelisten skal vise, med danske navne:",
        kode: R`using System.ComponentModel.DataAnnotations;

namespace Butik.ViewModels;

public class OrdreLinje
{
    public int Id { get; set; }

    [Display(Name = "Kunde")]
    public string Kunde { get; set; } = "";

    [Display(Name = "Vare")]
    public string Vare { get; set; } = "";

    [Display(Name = "Antal")]
    public int Antal { get; set; }

    [Display(Name = "Dato")]
    [DataType(DataType.Date)]
    public DateTime Dato { get; set; }

    [Display(Name = "I alt")]
    [DataType(DataType.Currency)]
    public decimal Total { get; set; }

    [Display(Name = "Betaling")]
    public string Status { get; set; } = "";
}`,
        frag: true,
        noter: [
          ["string Kunde", "Kundens **navn**, ikke kunde-objektet."],
          ["[DataType(DataType.Date)]", "Vis kun datoen, ikke klokkeslættet."],
          ["[DataType(DataType.Currency)]", "Vis tallet som et beløb, fx 91,00 kr."],
          ["decimal Total", "Antal gange pris. Findes ikke i tabellen; den beregnes."],
          ["string Status", "\"Betalt\" i stedet for tallet 1."]
        ] },
      { t: "forudsig", q: "Her laves en liste af ordrer om til linjer med tekst og total, ligesom en view model. Hvad skriver programmet?",
        kode: R`List<Ordre> ordrer = new List<Ordre>
{
    new Ordre { Kunde = "Anna", Vare = "Kaffe", Antal = 2, Pris = 45.50m },
    new Ordre { Kunde = "Bo", Vare = "Te", Antal = 4, Pris = 30m }
};

var linjer = ordrer
    .Select(o => new Linje { Tekst = o.Kunde + ": " + o.Vare, Total = o.Antal * o.Pris })
    .ToList();

foreach (Linje l in linjer)
{
    Console.WriteLine(l.Tekst + " = " + l.Total);
}

class Ordre
{
    public string Kunde { get; set; } = "";
    public string Vare { get; set; } = "";
    public int Antal { get; set; }
    public decimal Pris { get; set; }
}

class Linje
{
    public string Tekst { get; set; } = "";
    public decimal Total { get; set; }
}`,
        output: "Anna: Kaffe = 91,00\nBo: Te = 120",
        fordi: "`Select` laver hver `Ordre` om til en `Linje` (modul 9). 2 × 45,50 = 91,00: en `decimal` husker to decimaler fra 45.50m. 4 × 30 = 120. Tallene skrives med dansk komma. Det er derfor, vi har brug for et rigtigt beløbsformat: det kommer om lidt." },
      { t: "spor", q: "Status-teksten laves med det betingede udtryk `? :` (modul 2). Følg programmet, og skriv værdierne ned efter hver linje.",
        kode: R`int paid = 0;
string status = paid == 1 ? "Betalt" : paid == 2 ? "Delvist betalt" : "Ikke betalt";
paid = 2;
status = paid == 1 ? "Betalt" : paid == 2 ? "Delvist betalt" : "Ikke betalt";
paid = 1;`,
        kolonner: ["paid", "status"],
        raekker: [[1, "=0", "=–"], [2, "0", "Ikke betalt"], [3, "2", "Ikke betalt"], [4, "2", "Delvist betalt"], [5, "1", "Delvist betalt"]],
        fordi: "Linje 2: 0 er hverken 1 eller 2, så teksten bliver \"Ikke betalt\". Linje 3 ændrer kun `paid`; `status` bliver **ikke** opdateret af sig selv. Linje 4: 2 er ikke 1, men 2, så \"Delvist betalt\". Linje 5 ændrer igen kun `paid`. En variabel husker sin værdi, til den får en ny." },
      { t: "laes", h: "Controlleren laver view models",
        md: "Index-actionen henter nu ikke hele ordrer. Den bruger `Select` til at lave hver ordre om til en `OrdreLinje`, direkte i databaseforespørgslen:",
        kode: R`public async Task<IActionResult> Index()
{
    var linjer = await _context.Orders
        .OrderBy(o => o.OrderDate)
        .Select(o => new OrdreLinje
        {
            Id = o.Id,
            Kunde = o.Customer.Name,
            Vare = o.Product.Name,
            Antal = o.Quantity,
            Dato = o.OrderDate,
            Total = o.Quantity * o.Product.Price,
            Status = o.Paid == 1 ? "Betalt" : o.Paid == 2 ? "Delvist betalt" : "Ikke betalt"
        })
        .ToListAsync();
    return View(linjer);
}`,
        frag: true,
        noter: [
          ["using Butik.ViewModels;", "Husk den øverst i controlleren."],
          ["o.Customer.Name", "Kundens navn gennem navigation propertyen."],
          ["? : i stedet for switch", "Inde i en databaseforespørgsel kan Entity Framework oversætte `? :` til SQL. Et `switch`-udtryk må ikke stå der."]
        ],
        md2: "Bemærk: der er **ingen** `Include`. Når `Select` selv læser `o.Customer.Name`, laver Entity Framework selv en JOIN i SQL og henter kun de kolonner, der skal bruges. `Include` er kun nødvendig, når du henter hele entities med navigation properties." },
      { t: "valg", q: "Index-actionen bruger `Select(o => new OrdreLinje { Kunde = o.Customer.Name, … })` uden `Include`. Hvad står der i kolonnen Kunde?",
        svar: ["Kundens navn: Entity Framework laver selv en JOIN, fordi Select læser o.Customer.Name", "Ingenting, fordi Include mangler", "Kundens Id", "Programmet går ned med en NullReferenceException"],
        ret: 0, fordi: "Afprøvet: navnene står der. `Include` skal bruges, når du henter **hele** `Order`-objekter og bagefter vil læse `order.Customer`. Med `Select` beskriver du selv, hvad der skal hentes." },
      { t: "laes", h: "Danske datoer og kroner",
        md: "Viewet viser felterne med `@Html.DisplayFor(…)`. Den læser attributterne: `[DataType(DataType.Date)]` giver kun datoen, og `[DataType(DataType.Currency)]` giver et beløb. Overskrifterne kommer fra `[Display(Name = …)]` via `@Html.DisplayNameFor(…)`.\n\nMen **hvordan** en dato og et beløb skrives, afhænger af **kulturen**. På en dansk Windows er den måske allerede dansk, på en Mac måske ikke. Gør det ens overalt med én linje i `Program.cs`, lige efter `var app = builder.Build();` og `if`-blokken:",
        kode: R`app.UseRequestLocalization("da-DK");`,
        frag: true,
        md2: "Afprøvet: ordrelisten viser datoen på dansk og beløbet som `91,00 kr.`. Datoen står som `01-09-2026` på Windows og som `01.09.2026` på Mac og Linux — begge er dansk format, styresystemerne er bare ikke enige om tegnet. I C# selv kan du få det samme med formatstrenge: `total.ToString(\"C\")` og `dato.ToString(\"d\")`." },
      { t: "forudsig", q: "Programmet kører med dansk kultur (da-DK). Hvad skriver det?",
        kode: R`decimal total = 2 * 45.50m;
DateTime dato = new DateTime(2026, 9, 1, 10, 30, 0);

Console.WriteLine(total.ToString("C"));
Console.WriteLine(dato.ToString("dd-MM-yyyy"));
Console.WriteLine(dato.ToString("dd-MM-yyyy HH\\:mm"));`,
        output: "91,00 kr.\n01-09-2026\n01-09-2026 10:30",
        fordi: "`\"C\"` er valuta: dansk komma og \"kr.\". Med en formatstreng som `\"dd-MM-yyyy\"` bestemmer du selv, hvordan datoen ser ud: `dd` er dag, `MM` er måned, `yyyy` er år, `HH` er timer fra 0 til 23, og `mm` er minutter.\n\nTo fælder: Den korte form `dato.ToString(\"d\")` giver \"kulturens korte dato\" — og den er **ikke ens på alle computere**. På Windows skriver dansk kultur typisk `01-09-2026`, på Mac og Linux `01.09.2026`. Og et `:` i en formatstreng betyder \"kulturens tegn mellem timer og minutter\", som på nogle computere er et punktum. Derfor står der `HH\\\\:mm` — omvendt skråstreg foran kolonet betyder \"skriv præcis et kolon\". Vil du have samme resultat overalt, så skriv formatet helt ud." },
      { t: "udfyld", frag: true, q: "Giv propertyen et pænt navn, og få den vist som et beløb.",
        kode: R`[Display([[Name]] = "I alt")]
[DataType(DataType.[[Currency]])]
public decimal Total { get; set; }`,
        fordi: "`[Display(Name = …)]` giver overskriften: det hedder `Name`. `DataType.Currency` får `DisplayFor` til at skrive beløbet med valuta." },
      { t: "valg", q: "Kulturen er da-DK. I formularen til en ny vare skriver du prisen `12.50`, og databasen gemmer 1250. Hvorfor?",
        svar: ["I dansk er punktum tusindtalsadskiller, så 12.50 bliver læst som 1250", "Databasen kan ikke gemme decimaler", "Fordi prisen er en int", "Fordi jQuery ganger med 100"],
        ret: 0, fordi: "Afprøvet i Butik. Dansk skrives tolv en halv som 12,50. Problemet er, at jQuery Validation i browseren som standard kun godtager punktum, så 12,50 bliver afvist. Det retter du i næste trin, så browseren godtager komma." },
      { t: "ide", h: "Ordrelisten med view model",
        md: "Byg det hele ind i Butik. Viewet `Views/Orders/Index.cshtml` skal nu have `@model IEnumerable<Butik.ViewModels.OrdreLinje>`, og cellerne bliver fx `@Html.DisplayFor(modelItem => item.Total)` og `@item.Status`. Til sidst skal browseren godtage danske decimaltal: tilføj scriptet, der står under trinene, nederst i `Views/Shared/_ValidationScriptsPartial.cshtml`.",
        sprog: "razor",
        kode: R`<script>
    $.validator.methods.number = function (value, element) {
        return this.optional(element) || /^-?\d+(,\d+)?$/.test(value);
    };
</script>`,
        win: ["Lav mappen `ViewModels` og klassen `OrdreLinje`.", "Skriv den nye `Index`-action i `OrdersController` (husk `using Butik.ViewModels;`). Gør det samme i `Maaned` fra lektion 3.", "Ret `Views/Orders/Index.cshtml` til view modellen: kolonnerne Dato, Kunde, Vare, Antal, I alt og Betaling.", "Tilføj `app.UseRequestLocalization(\"da-DK\");` i `Program.cs` og scriptet nedenfor.", "Kør, og se `/Orders`. Prøv også at lave en vare med prisen `12,50`."],
        mac: ["Lav mappen `ViewModels` og klassen `OrdreLinje`.", "Skriv den nye `Index`-action i `OrdersController` (husk `using Butik.ViewModels;`). Gør det samme i `Maaned` fra lektion 3.", "Ret `Views/Orders/Index.cshtml` til view modellen: kolonnerne Dato, Kunde, Vare, Antal, I alt og Betaling.", "Tilføj `app.UseRequestLocalization(\"da-DK\");` i `Program.cs` og scriptet nedenfor.", "Kør, og se `/Orders`. Prøv også at lave en vare med prisen `12,50`."],
        md2: "Forventet første linje i ordrelisten: `01-09-2026 · Anna · Kaffe · 2 · 91,00 kr. · Betalt` (på Mac står datoen som `01.09.2026`). Afprøvet: med scriptet bliver `12,50` gemt som 12,5, og `12.50` bliver afvist med en fejlbesked i stedet for at blive til 1250." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er en view model, og hvorfor bruger man den i stedet for at sende entities direkte til viewet?",
        svar: "En **view model** er en klasse, der er lavet til **ét bestemt view**, med præcis de felter, viewet skal vise, fx kundens navn i stedet for `CustomerId` og en status-tekst i stedet for et tal. Controlleren laver entities om til view models med **`Select`**. Fordelene er, at viewet kun får det, det skal bruge, at jeg kan sætte **`[Display]`** og **`[DataType]`** på uden at røre de **genererede klasser**, som bliver skrevet forfra ved næste scaffold, og at databasens struktur ikke er bundet direkte til siden.",
        noegle: ["ét bestemt view", "Select", "Display", "genererede klasser", "entity"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m18l6", titel: "Sletning, soft delete og fejlsider", min: 20,
    ord: [
      ["Cascade delete", "Slettes en række, slettes de rækker, der peger på den, også. `ON DELETE CASCADE` i SQL."],
      ["No action / Restrict", "Databasen nægter at slette en række, som andre rækker peger på. Sletningen giver en fejl."],
      ["DbUpdateException", "Den exception, Entity Framework kaster, når databasen afviser en ændring ved `SaveChangesAsync`."],
      ["Soft delete", "\"Blød sletning\": rækken bliver ikke slettet, men markeret som slettet, fx med `IsDeleted = 1`, og skjult i listerne."],
      ["-Force", "Tilføjelse til scaffold-kommandoen: overskriv de filer, der allerede findes. På Mac: `--force`."],
      ["Fejlside", "En side, brugeren ser i stedet for en teknisk fejl, fx \"Siden findes ikke\" ved 404."],
      ["UseStatusCodePagesWithReExecute", "En linje i Program.cs, der viser en bestemt side, når svaret har en fejlkode som 404."]
    ],
    trin: [
      { t: "laes", h: "Hvad sker der, når man sletter?",
        md: "En ordre peger på en kunde og en vare. Hvad sker der med ordrerne, når du sletter kunden eller varen? Det bestemmer **databasen**, og i Butik er der to forskellige regler:\n\n- `CustomerId … REFERENCES Customers(Id) ON DELETE CASCADE`: sletter du en kunde, slettes kundens ordrer **også**. Afprøvet: da Anna blev slettet, forsvandt hendes to ordrer.\n- `ProductId … REFERENCES Products(Id)` uden mere: databasen **nægter** at slette en vare, der har ordrer. Entity Framework kaster en `DbUpdateException`, og i udviklingstilstand ser du en side med fejlen.\n\nPå Mac står der `FOREIGN KEY constraint failed` i fejlen. På Windows står der noget i retning af `The DELETE statement conflicted with the REFERENCE constraint`." },
      { t: "valg", q: "Kunden Bo har én ordre. Du sletter Bo under `/Customers`. Hvad sker der med ordren?",
        svar: ["Den bliver også slettet, fordi fremmednøglen har ON DELETE CASCADE", "Den bliver stående med en kunde, der ikke findes", "Sletningen bliver afvist med en fejl", "Ordren får Anna som kunde i stedet"],
        ret: 0, fordi: "Med `ON DELETE CASCADE` sletter databasen selv de rækker, der peger på kunden. Det er praktisk, men farligt: historikken over Bos køb er også væk." },
      { t: "valg", q: "Varen Kaffe står på en ordre (Annas ordre fra 1. september). Du klikker Delete på Kaffe og bekræfter. Hvad sker der?",
        svar: ["Databasen afviser sletningen, og Entity Framework kaster en DbUpdateException", "Kaffe og ordren bliver slettet", "Kaffe bliver slettet, og ordren får ProductId = 0", "Ingenting, og ingen fejl"],
        ret: 0, fordi: "Der er ingen CASCADE på varer. Fremmednøglen beskytter ordrerne, så sletningen fejler. Afprøvet: siden viser `DbUpdateException` med `FOREIGN KEY constraint failed` (Mac)." },
      { t: "laes", h: "Soft delete: markér i stedet for at slette",
        md: "I et rigtigt system vil man sjældent slette en vare, der er solgt: ordrerne skal kunne vises bagefter, og regnskabet skal passe. I stedet bruger man **soft delete**: varen får en kolonne `IsDeleted`. \"Slet\" sætter den til sand, og listerne viser kun de varer, der **ikke** er slettet.\n\nFordele: historikken bevares, intet går tabt ved en fejl, og man kan fortryde. Ulempe: du skal huske at filtrere alle steder, hvor varer vises.\n\nI database first starter ændringen i **databasen**. Kolonnen tilføjes med `ALTER TABLE`, og så scaffolder du igen med `-Force`:",
        sprog: "sql",
        kode: R`ALTER TABLE Products ADD IsDeleted BIT NOT NULL DEFAULT 0;`,
        noter: [
          ["BIT", "Sand/falsk: 1 eller 0. Bliver til `bool` i C#."],
          ["DEFAULT 0", "Alle varer, der findes i forvejen, er ikke slettet."]
        ] },
      { t: "ide", h: "Ny kolonne, nyt scaffold",
        md: "Tilføj kolonnen, og kør scaffold-kommandoen igen med `-Force`, så modellerne bliver skrevet forfra ud fra den nye database.",
        win: ["SQL Server Object Explorer: højreklik på `ButikDB` → **New Query…**, kør `ALTER TABLE`-linjen.", "Package Manager Console: kør den samme `Scaffold-DbContext`-kommando som i lektion 2, med ` -Force` til sidst.", "Åbn `Models/Product.cs`: der er en ny linje `public bool IsDeleted { get; set; }`."],
        mac: ["Terminal i projektmappen: `sqlite3 butik.db \"ALTER TABLE Products ADD IsDeleted BIT NOT NULL DEFAULT 0;\"`", "Kør den samme `dotnet ef dbcontext scaffold`-kommando som i lektion 2, med ` --force` til sidst.", "Åbn `Models/Product.cs`: der er en ny linje `public bool IsDeleted { get; set; }`.", "Tjek også, at der stadig står `public decimal Price`. SQLite gemmer en pris som 1250 uden decimaler, og værktøjet gætter typen ud fra den **højeste** pris i tabellen. Står der `public int Price`, har du en vare med en hel pris, der er højere end 79,95 (fx 1250, hvis du prøvede prisen `12.50`, før scriptet fra lektion 5 var på plads). Slet den vare under `/varer` (Delete sletter stadig rigtigt her), og kør kommandoen igen."],
        md2: "Kun filerne i `Models`, som værktøjet skrev, er lavet om. Dine controllere, views og view models er ikke rørt. Det er grunden til, at egne rettelser hører hjemme dér og ikke i de genererede filer." },
      { t: "spor", q: "Soft delete i lille format. Klassen `Vare` har to properties: `string Navn` og `bool IsDeleted` (starter som `false`). Følg programmet, og skriv værdierne ned efter hver linje.",
        kode: R`List<Vare> varer = new List<Vare>();
varer.Add(new Vare { Navn = "Kaffe" });
varer.Add(new Vare { Navn = "Te" });
int synlige = varer.Count(v => !v.IsDeleted);
varer[0].IsDeleted = true;
synlige = varer.Count(v => !v.IsDeleted);`,
        omkring: ["", R`class Vare
{
    public string Navn { get; set; } = "";
    public bool IsDeleted { get; set; }
}`],
        kolonner: ["varer.Count", "synlige"],
        raekker: [[1, "=0", "=–"], [2, "1", "–"], [3, "2", "–"], [4, "2", "2"], [5, "2", "2"], [6, "2", "1"]],
        fordi: "Linje 5 sletter ikke Kaffe fra listen: den bliver bare markeret. Derfor er `varer.Count` stadig 2. Men tællingen af dem, der **ikke** er slettet, giver nu 1. Det er præcis det, soft delete gør i databasen: rækken er der, men den vises ikke." },
      { t: "laes", h: "Slet bliver til markér",
        md: "To steder i `ProductsController` skal rettes. **Delete** markerer i stedet for at slette, og **Index** viser kun varer, der ikke er slettet:",
        kode: R`// GET: Products
public async Task<IActionResult> Index()
{
    return View(await _context.Products
        .Where(p => !p.IsDeleted)
        .ToListAsync());
}

// POST: Products/Delete/5
[HttpPost, ActionName("Delete")]
[ValidateAntiForgeryToken]
public async Task<IActionResult> DeleteConfirmed(int id)
{
    var product = await _context.Products.FindAsync(id);
    if (product != null)
    {
        product.IsDeleted = true;
    }

    await _context.SaveChangesAsync();
    return RedirectToAction(nameof(Index));
}`,
        frag: true,
        noter: [
          [".Where(p => !p.IsDeleted)", "Kun varer, der ikke er slettet."],
          ["product.IsDeleted = true;", "I stedet for `_context.Products.Remove(product);`. `SaveChangesAsync` gemmer ændringen som en UPDATE."]
        ],
        md2: "Husk også dropdownen i `OrdersController`: `new SelectList(_context.Products.Where(p => !p.IsDeleted), \"Id\", \"Name\")`, så en slettet vare ikke kan vælges i en ny ordre. Afprøvet: Kaffe forsvinder fra `/varer` og fra dropdownen, men de gamle ordrer viser stadig Kaffe." },
      { t: "fejl", frag: true, q: "Soft delete er lavet, og Delete sætter `IsDeleted = true`. Men slettede varer bliver ved med at stå i varelisten. Hvilken linje er fejlen i?",
        kode: R`public async Task<IActionResult> Index()
{
    return View(await _context.Products.ToListAsync());
}

public async Task<IActionResult> DeleteConfirmed(int id)
{
    var product = await _context.Products.FindAsync(id);
    if (product != null)
    {
        product.IsDeleted = true;
    }
    await _context.SaveChangesAsync();
    return RedirectToAction(nameof(Index));
}`,
        linje: 3,
        fordi: "Sletningen virker: varen er markeret i databasen. Men `Index` henter **alle** varer. Der mangler `.Where(p => !p.IsDeleted)` før `ToListAsync()`. Soft delete kræver, at man husker filteret alle steder, hvor listen vises.",
        rettet: R`public async Task<IActionResult> Index()
{
    return View(await _context.Products.Where(p => !p.IsDeleted).ToListAsync());
}

public async Task<IActionResult> DeleteConfirmed(int id)
{
    var product = await _context.Products.FindAsync(id);
    if (product != null)
    {
        product.IsDeleted = true;
    }
    await _context.SaveChangesAsync();
    return RedirectToAction(nameof(Index));
}` },
      { t: "laes", h: "Egne fejlsider",
        md: "Når du kører fra Visual Studio eller Rider, er appen i **udviklingstilstand** (Development) og viser tekniske fejlsider med hele fejlen. Det er godt for dig, men en rigtig bruger må aldrig se det. Projektet har allerede `app.UseExceptionHandler(\"/Home/Error\")` i `if (!app.Environment.IsDevelopment())`: uden for udviklingstilstand viser en exception siden `Error`.\n\nFor **404** (siden findes ikke) får brugeren som standard bare en tom side. Med én linje i `Program.cs` og en lille action får du din egen side:",
        kode: R`// Program.cs, før app.UseHttpsRedirection():
app.UseStatusCodePagesWithReExecute("/Home/Fejl/{0}");

// HomeController:
[Route("Home/Fejl/{kode:int}")]
public IActionResult Fejl(int kode)
{
    ViewData["Kode"] = kode;
    return View();
}`,
        frag: true,
        noter: [
          ["UseStatusCodePagesWithReExecute", "Når et svar har en fejlkode, så kør den adresse i stedet og vis den side."],
          ["{0}", "Bliver erstattet af fejlkoden, fx 404."],
          ["[Route(\"Home/Fejl/{kode:int}\")]", "Attribute routing fra lektion 3: koden ender i parameteren `kode`."]
        ],
        md2: "Viewet `Views/Home/Fejl.cshtml` kan bruge `@if` til at skrive \"Siden findes ikke\" ved 404 og en generel besked ellers. Afprøvet: `/kunde/Zorro` og `/findesikke` viser nu \"Fejl 404\" med din tekst, og browseren får stadig statuskoden 404." },
      { t: "valg", q: "`UseStatusCodePagesWithReExecute(\"/Home/Fejl/{0}\")` er tilføjet. Brugeren skriver `/kunde/Zorro`, og Zorro findes ikke. Hvad ser brugeren?",
        svar: ["Din Fejl-side med koden 404, og browseren får stadig statuskoden 404", "Kunden Anna, fordi hun er den første", "En tom hvid side", "Den tekniske fejlside med hele exceptionen"],
        ret: 0, fordi: "Actionen svarer `NotFound()`, altså 404. ASP.NET Core ser fejlkoden og kører `/Home/Fejl/404` i stedet, men statuskoden ændres ikke. Det er vigtigt, så søgemaskiner og programmer også kan se, at siden ikke findes." },
      { t: "ide", h: "Soft delete og fejlside i Butik",
        md: "Gør Butik færdig med soft delete på varer og en dansk 404-side.",
        kode: R`@{
    int kode = (int)ViewData["Kode"]!;
    ViewData["Title"] = "Fejl " + kode;
}

<h1>Fejl @kode</h1>

@if (kode == 404)
{
    <p>Siden findes ikke. Tjek adressen, eller brug menuen.</p>
}
else
{
    <p>Der skete en fejl. Prøv igen om lidt.</p>
}

<a asp-controller="Home" asp-action="Index" class="btn btn-primary">Til forsiden</a>`,
        sprog: "razor",
        win: ["Ret `Index` og `DeleteConfirmed` i `ProductsController`, og filtrér dropdownen i `OrdersController`.", "Tilføj `UseStatusCodePagesWithReExecute` i `Program.cs` og actionen `Fejl` i `HomeController`.", "Højreklik på **Views/Home** → **Add** → **View…** → **Razor View - Empty**, kald den `Fejl.cshtml`, og skriv viewet nedenfor.", "Kør. Slet Krus under Varer, og tjek at Krus stadig står på ordren fra 3. september under Ordrer.", "Prøv `/kunde/Zorro`."],
        mac: ["Ret `Index` og `DeleteConfirmed` i `ProductsController`, og filtrér dropdownen i `OrdersController`.", "Tilføj `UseStatusCodePagesWithReExecute` i `Program.cs` og actionen `Fejl` i `HomeController`.", "Højreklik på **Views/Home** → **Add** → **File**, kald den `Fejl.cshtml`, og skriv viewet nedenfor.", "Kør. Slet Krus under Varer, og tjek at Krus stadig står på ordren fra 3. september under Ordrer.", "Prøv `/kunde/Zorro`."],
        md2: "`(int)ViewData[\"Kode\"]!` henter tallet fra actionen. `ViewData` gemmer alt som `object`, så det skal castes til `int` (modul 7), og `!` fortæller compileren, at værdien ikke er null." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på cascade delete og soft delete, og hvornår vil du bruge soft delete?",
        svar: "Ved **cascade delete** sletter **databasen** automatisk de rækker, der peger på den række, jeg sletter, fx en kundes ordrer. Ved **soft delete** bliver rækken **ikke slettet**: den bliver markeret, fx med `IsDeleted = true`, og listerne **filtrerer** den fra med `Where`. Soft delete bruger jeg, når **historikken** skal bevares, fx en vare, der er solgt, så gamle ordrer stadig kan vises, og når man skal kunne fortryde. Ulempen er, at jeg skal huske filteret alle steder.",
        noegle: ["databasen", "ikke slettet", "IsDeleted", "filtrerer", "historikken"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m18v", titel: "Værksted: et bibliotek med database first", vaerksted: true, min: 90,
    ord: [],
    trin: [
      { t: "laes", h: "Sådan arbejder du i værkstedet",
        md: "Nu bygger du **selv** en app med database first: et lille **bibliotek** med forfattere og bøger. Det er samme slags opgave som Butik, men uden at nogen viser dig koden. Det er præcis det, du skal kunne til eksamen.\n\n- Lav opgaverne i rækkefølge. De bygger videre på det samme projekt, `Bibliotek`.\n- **Kør ofte.** Byg og prøv i browseren efter hver lille ændring.\n- Går noget galt, så brug **debuggeren**: et breakpoint i actionen, og kig på værdierne.\n- Kig på **tippene**, før du kigger på løsningen. Kig i lektionerne og på Opslag-siden: det er ikke snyd.\n- Du afleverer ikke tekst. Når siden i browseren viser det, opgaven beskriver, er du færdig." },
      { t: "opgave", h: "1. Bibliotekets database og modeller", projekt: "Bibliotek",
        md: "Lav et nyt MVC-projekt, `Bibliotek`, og en database med to tabeller: `Authors` (forfattere) og `Books` (bøger). Hver bog har én forfatter; en forfatter kan have mange bøger. Scaffold modellerne, og lav controllere med views til begge.\n\n**Du har allerede en mappe `Bibliotek`** fra værkstederne i modul 16 og 17. Projektet her skal også hedde `Bibliotek`, så navnene i koden passer. Læg det derfor i en ny, tom mappe, fx `Modul18`: {{skriv den nye mappe i feltet **Location**, når du opretter projektet||skriv den nye mappe i feltet **Solution directory**, når du opretter projektet (bruger du Terminal, så lav mappen, og kør kommandoen inde i den)}}. Det gamle projekt bliver liggende urørt.\n\nPå Windows skal databasen hedde `Bibliotek18DB`: navnet `BibliotekDB` er allerede brugt i LocalDB af modul 17. På Mac ligger `bibliotek.db` i den nye projektmappe, så dér er der ikke noget sammenstød.",
        krav: [
          "Tabellen `Authors` har `Id` (primær nøgle, tæller selv op), `Name` (tekst, højst 60 tegn, NOT NULL) og `Country` (tekst, højst 40 tegn, må være NULL)",
          "Tabellen `Books` har `Id`, `Title` (højst 100 tegn, NOT NULL), `Year` (heltal), `Price` (DECIMAL(8,2)) og `AuthorId`, der er fremmednøgle til `Authors` med ON DELETE CASCADE",
          "Forfatterne er Frank Herbert (USA), Tove Ditlevsen (Danmark) og Jussi Adler-Olsen (Danmark)",
          "Bøgerne er Dune (1965, 149,95, Herbert), Barndommens gade (1943, 99,00, Ditlevsen), Kvinden i buret (2007, 129,50, Adler-Olsen) og Fasandræberne (2008, 129,50, Adler-Olsen)",
          "Databaseklassen hedder `BibliotekContext`, og modellerne ligger i `Models`",
          "Connection stringen hedder `Bibliotek` og står i `appsettings.json`",
          "Der er en `AuthorsController` og en `BooksController` med views, og `/Books` viser fire bøger"
        ],
        tip: [
          "Følg de fem skridt, som du satte i rækkefølge i lektion 1 og udførte i lektion 2. Scriptet ligner Butiks: CREATE TABLE for `Authors` først, fordi `Books` peger på den.",
          "På Windows skrives tekst med æ og ø sikrest som `N'Fasandræberne'`. På Mac: `INTEGER PRIMARY KEY AUTOINCREMENT`, og databasen er filen `bibliotek.db` i projektmappen.",
          "Scaffold: `-Context BibliotekContext -Tables Authors, Books -NoOnConfiguring` (Mac: `--context BibliotekContext --table Authors --table Books --no-onconfiguring`)."
        ],
        fri: true,
        output: "/Books viser en tabel med fire rækker:\nDune · 1965 · 149,95\nBarndommens gade · 1943 · 99,00\nKvinden i buret · 2007 · 129,50\nFasandræberne · 2008 · 129,50\n(Forfatter-kolonnen viser endnu tal: 1, 2, 3, 3)",
        sprog: "text",
        loesning: R`-- Windows: ny database Bibliotek18DB i LocalDB, New Query:
CREATE TABLE Authors (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(60) NOT NULL,
    Country NVARCHAR(40) NULL
);

CREATE TABLE Books (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100) NOT NULL,
    Year INT NOT NULL,
    Price DECIMAL(8,2) NOT NULL,
    AuthorId INT NOT NULL REFERENCES Authors(Id) ON DELETE CASCADE
);

INSERT INTO Authors (Name, Country) VALUES
    (N'Frank Herbert', N'USA'),
    (N'Tove Ditlevsen', N'Danmark'),
    (N'Jussi Adler-Olsen', N'Danmark');

INSERT INTO Books (Title, Year, Price, AuthorId) VALUES
    (N'Dune', 1965, 149.95, 1),
    (N'Barndommens gade', 1943, 99.00, 2),
    (N'Kvinden i buret', 2007, 129.50, 3),
    (N'Fasandræberne', 2008, 129.50, 3);

-- Package Manager Console (én linje):
Scaffold-DbContext "Server=(localdb)\MSSQLLocalDB;Database=Bibliotek18DB;Trusted_Connection=True;TrustServerCertificate=True" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Context BibliotekContext -Tables Authors, Books -NoOnConfiguring

-- Mac: samme script i bibliotek.sql, men med INTEGER PRIMARY KEY AUTOINCREMENT og uden N foran teksterne:
--   sqlite3 bibliotek.db < bibliotek.sql
--   dotnet ef dbcontext scaffold "Data Source=bibliotek.db" Microsoft.EntityFrameworkCore.Sqlite --output-dir Models --context BibliotekContext --table Authors --table Books --no-onconfiguring

// appsettings.json (Windows / Mac):
"ConnectionStrings": { "Bibliotek": "Server=(localdb)\\MSSQLLocalDB;Database=Bibliotek18DB;Trusted_Connection=True;TrustServerCertificate=True" }
"ConnectionStrings": { "Bibliotek": "Data Source=bibliotek.db" }

// Program.cs:
builder.Services.AddDbContext<BibliotekContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Bibliotek")));   // Mac: UseSqlite

// Controllere: Add → Controller → MVC Controller with views, using Entity Framework
// (Mac: dotnet aspnet-codegenerator controller -name BooksController -m Book -dc BibliotekContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries)`,
        ekstra: ["Kør scaffold-kommandoen uden `-Tables` mod en database med flere tabeller, og se, hvad der kommer med.", "Læs `OnModelCreating` i `BibliotekContext`, og find linjen, der beskriver relationen mellem bøger og forfattere."] },
      { t: "opgave", h: "2. Forfatternavne og en Create, der gemmer", projekt: "Bibliotek",
        md: "Boglisten viser forfatterens nummer, dropdownen i Create viser tal, og Create gemmer ikke. Ret de tre ting i `BooksController` og bøgernes views.",
        krav: [
          "Boglisten (`/Books`) viser forfatterens **navn**, fx Frank Herbert ud for Dune",
          "Details og Delete for en bog viser også forfatterens navn",
          "Dropdownen i Create og Edit viser forfatternes navne (værdien er stadig deres Id)",
          "En ny bog, Børnene (1999, 89,95, Tove Ditlevsen), kan oprettes og står bagefter i listen. Prisen skrives med komma, så appen skal bruge dansk kultur og godtage komma i formularen, som i lektion 5",
          "De genererede filer i `Models` er ikke rettet"
        ],
        tip: [
          "Navnene: i viewsene står der `item.Author.Id` eller `model.Author.Id`. Hvad skal der stå i stedet?",
          "Dropdownen: `new SelectList(_context.Authors, \"Id\", \"Id\")`. Den tredje parameter er det, brugeren ser. Den står fire steder i controlleren (GET og POST for både Create og Edit).",
          "Create: sæt et breakpoint på `if (ModelState.IsValid)`, og se, at den er `false`. Ret `asp-validation-summary` til `\"All\"` i `Create.cshtml` for at se fejlen: `The Author field is required.` Se lektion 2, \"Når Create ikke gemmer\". Afviser browseren `89,95` med `The field Price must be a number.`, mangler `app.UseRequestLocalization(\"da-DK\");` og scriptet nederst i `_ValidationScriptsPartial.cshtml` fra lektion 5."
        ],
        fri: true,
        output: "/Books viser fx:\nDune · 1965 · 149,95 · Frank Herbert\n…\nBørnene · 1999 · 89,95 · Tove Ditlevsen",
        loesning: R`// BooksController: fire steder (GET og POST i både Create og Edit) — én gang uden og tre gange med book.AuthorId
ViewData["AuthorId"] = new SelectList(_context.Authors, "Id", "Name");
ViewData["AuthorId"] = new SelectList(_context.Authors, "Id", "Name", book.AuthorId);

// Create (POST) og Edit (POST), før if (ModelState.IsValid):
ModelState.Remove("Author");

// Views/Books/Index.cshtml:
@Html.DisplayFor(modelItem => item.Author.Name)

// Views/Books/Details.cshtml og Delete.cshtml:
@Html.DisplayFor(model => model.Author.Name)

// Program.cs, efter if-blokken med UseExceptionHandler:
app.UseRequestLocalization("da-DK");

// Views/Shared/_ValidationScriptsPartial.cshtml, nederst (så 89,95 godtages):
<script>
    $.validator.methods.number = function (value, element) {
        return this.optional(element) || /^-?\d+(,\d+)?$/.test(value);
    };
</script>`,
        frag: true,
        ekstra: ["Giv kolonnen et dansk navn uden at røre `Book.cs`: skriv overskriften direkte i `<th>` i stedet for `DisplayNameFor`.", "Sortér boglisten efter titel med `OrderBy`."] },
      { t: "opgave", h: "3. Fejlfinding: bogen, der aldrig bliver fundet", projekt: "Bibliotek",
        md: "En kollega har lavet en action, så man kan slå en bog op på titlen med adressen `/bog/Dune`. Den giver **altid** 404, også for bøger, der findes. Kopiér actionen ind i `BooksController`, og find fejlen **med debuggeren**, før du retter den.",
        start: R`// GET: /bog/Dune
[Route("bog/{titel}")]
public async Task<IActionResult> VisBog(string? navn)
{
    if (navn == null)
    {
        return NotFound();
    }

    var book = await _context.Books
        .Include(b => b.Author)
        .FirstOrDefaultAsync(b => b.Title.ToLower() == navn.ToLower());
    if (book == null)
    {
        return NotFound();
    }

    return View("Details", book);
}`,
        frag: true,
        krav: [
          "Sæt et breakpoint på linjen `if (navn == null)`, kør med debuggeren, og åbn `/bog/Dune`",
          "Find i Locals (Visual Studio) eller Threads & Variables (Rider) ud af, hvilken værdi parameteren har, og hvorfor",
          "Ret fejlen, så `/bog/Dune`, `/bog/dune` og `/bog/Barndommens gade` viser bogens Details",
          "`/bog/Findes ikke` giver stadig 404"
        ],
        tip: [
          "Hvad hedder værdien i ruten, og hvad hedder parameteren?",
          "Debuggeren viser `navn = null`. ASP.NET Core sætter kun værdien ind i en parameter, der hedder det samme som i ruten.",
          "Omdøb parameteren til `titel`, og husk de to andre steder, hvor `navn` bruges."
        ],
        fri: true,
        output: "/bog/dune → Details for Dune (forfatter Frank Herbert)\n/bog/Findes ikke → 404",
        loesning: R`// GET: /bog/Dune
[Route("bog/{titel}")]
public async Task<IActionResult> VisBog(string? titel)
{
    if (titel == null)
    {
        return NotFound();
    }

    var book = await _context.Books
        .Include(b => b.Author)
        .FirstOrDefaultAsync(b => b.Title.ToLower() == titel.ToLower());
    if (book == null)
    {
        return NotFound();
    }

    return View("Details", book);
}`,
        ekstra: ["Lav titlerne i boglisten om til links til `/bog/…` med `asp-action=\"VisBog\"` og `asp-route-titel`.", "Prøv `/bog/x?navn=Dune` med den fejlbehæftede udgave. Hvorfor virker den? (Parameteren kan også få sin værdi fra query-strengen.)"] },
      { t: "opgave", h: "4. View model og bøger fra et bestemt år", projekt: "Bibliotek",
        md: "Boglisten skal bruge en view model med danske overskrifter og priser i kroner. Og der skal være en adresse, der viser bøgerne fra et bestemt år og frem, fx `/boeger/fra/2000`.",
        krav: [
          "Klassen `BogLinje` ligger i mappen `ViewModels` og har `Id`, `Titel`, `Forfatter`, `Aar` og `Pris`",
          "Overskrifterne er Titel, Forfatter, Udgivet og Pris (lavet med `[Display(Name = …)]`), og prisen vises som beløb, fx `149,95 kr.`",
          "`Index` laver bøgerne om til `BogLinje` med `Select` og sorterer efter titel",
          "En ny action med `[Route(\"boeger/fra/{aar:int:min(1900)}\")]` viser bøgerne fra det år og frem, sorteret efter år, i det samme view",
          "`/boeger/fra/2000` viser Kvinden i buret og Fasandræberne; `/boeger/fra/1800` og `/boeger/fra/abc` giver 404",
          "Kulturen er dansk (`UseRequestLocalization`), og formularen godtager `89,95` som pris"
        ],
        tip: [
          "Byg det i samme rækkefølge som i lektion 5: view model, controller, view, Program.cs.",
          "`[DataType(DataType.Currency)]` på `Pris`, og vis den med `@Html.DisplayFor(modelItem => item.Pris)`. Viewet skal starte med `@model IEnumerable<Bibliotek.ViewModels.BogLinje>`.",
          "Den nye action: samme `Select` som `Index`, men med `.Where(b => b.Year >= aar)` og `.OrderBy(b => b.Year)`, og til sidst `return View(\"Index\", linjer);`."
        ],
        fri: true,
        output: "/boeger/fra/2000:\nKvinden i buret · Jussi Adler-Olsen · 2007 · 129,50 kr.\nFasandræberne · Jussi Adler-Olsen · 2008 · 129,50 kr.",
        loesning: R`// ViewModels/BogLinje.cs
using System.ComponentModel.DataAnnotations;

namespace Bibliotek.ViewModels;

public class BogLinje
{
    public int Id { get; set; }

    [Display(Name = "Titel")]
    public string Titel { get; set; } = "";

    [Display(Name = "Forfatter")]
    public string Forfatter { get; set; } = "";

    [Display(Name = "Udgivet")]
    public int Aar { get; set; }

    [Display(Name = "Pris")]
    [DataType(DataType.Currency)]
    public decimal Pris { get; set; }
}

// BooksController (husk using Bibliotek.ViewModels;)
public async Task<IActionResult> Index()
{
    var linjer = await _context.Books
        .OrderBy(b => b.Title)
        .Select(b => new BogLinje
        {
            Id = b.Id,
            Titel = b.Title,
            Forfatter = b.Author.Name,
            Aar = b.Year,
            Pris = b.Price
        })
        .ToListAsync();
    return View(linjer);
}

// GET: /boeger/fra/2000
[Route("boeger/fra/{aar:int:min(1900)}")]
public async Task<IActionResult> Fra(int aar)
{
    var linjer = await _context.Books
        .Where(b => b.Year >= aar)
        .OrderBy(b => b.Year)
        .Select(b => new BogLinje
        {
            Id = b.Id,
            Titel = b.Title,
            Forfatter = b.Author.Name,
            Aar = b.Year,
            Pris = b.Price
        })
        .ToListAsync();
    return View("Index", linjer);
}

// Views/Books/Index.cshtml
@model IEnumerable<Bibliotek.ViewModels.BogLinje>
@{
    ViewData["Title"] = "Bøger";
}
<h1>Bøger</h1>
<p><a asp-action="Create" class="btn btn-primary">Ny bog</a></p>
<table class="table table-striped">
    <thead>
        <tr>
            <th>@Html.DisplayNameFor(model => model.Titel)</th>
            <th>@Html.DisplayNameFor(model => model.Forfatter)</th>
            <th>@Html.DisplayNameFor(model => model.Aar)</th>
            <th>@Html.DisplayNameFor(model => model.Pris)</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        @foreach (var item in Model)
        {
            <tr>
                <td>@item.Titel</td>
                <td>@item.Forfatter</td>
                <td>@item.Aar</td>
                <td>@Html.DisplayFor(modelItem => item.Pris)</td>
                <td>
                    <a asp-action="Edit" asp-route-id="@item.Id">Ret</a> |
                    <a asp-action="Delete" asp-route-id="@item.Id">Slet</a>
                </td>
            </tr>
        }
    </tbody>
</table>

// Program.cs, efter if-blokken med UseExceptionHandler:
app.UseRequestLocalization("da-DK");

// Views/Shared/_ValidationScriptsPartial.cshtml, nederst:
<script>
    $.validator.methods.number = function (value, element) {
        return this.optional(element) || /^-?\d+(,\d+)?$/.test(value);
    };
</script>`,
        frag: true,
        ekstra: ["Lav en adresse `/boeger/land/{land}`, der viser bøgerne af forfattere fra et bestemt land.", "Vis antallet af bøger i overskriften med `Model.Count()`."] },
      { t: "opgave", h: "5. Færdig app: soft delete, menu og fejlside", projekt: "Bibliotek",
        md: "Gør Bibliotek færdig som en lille rigtig app: bøger skal kunne \"slettes\" uden at forsvinde fra databasen, menuen skal være dansk og ligge i et partial view, og en forkert adresse skal give en pæn dansk fejlside. Her bruger du det hele fra modulet: database first-ændring, routing, layout, view model og fejlsider.",
        krav: [
          "Tabellen `Books` får kolonnen `IsDeleted` (BIT, NOT NULL, DEFAULT 0), og modellerne er scaffoldet igen med `-Force` / `--force`",
          "Slet på en bog sætter `IsDeleted = true` i stedet for at slette rækken",
          "Boglisten, `/boeger/fra/…` og `/bog/{titel}` viser ikke slettede bøger (en slettet bog giver 404 på `/bog/…`)",
          "Menuen ligger i `Views/Shared/_Menu.cshtml` og har punkterne Bøger og Forfattere",
          "En adresse, der ikke findes, fx `/findesikke` eller `/bog/Findes ikke`, viser en dansk fejlside med teksten \"Fejl 404\" og statuskoden 404",
          "Slet Dune, og kontrollér i databasen, at rækken stadig er der med IsDeleted = 1"
        ],
        tip: [
          "Rækkefølgen: først databasen (`ALTER TABLE`), så scaffold med `-Force`, så controlleren. Dine controllere og views bliver ikke rørt af scaffold.",
          "Filtret `.Where(b => !b.IsDeleted)` skal stå i `Index` og i `Fra`. I `VisBog` kan du skrive `if (book == null || book.IsDeleted)`.",
          "Fejlsiden er den samme som i Butik: `app.UseStatusCodePagesWithReExecute(\"/Home/Fejl/{0}\");` i Program.cs, actionen `Fejl` med `[Route(\"Home/Fejl/{kode:int}\")]` i `HomeController` og viewet `Views/Home/Fejl.cshtml`."
        ],
        fri: true,
        output: "Efter Slet på Dune:\n/Books viser 4 bøger (Barndommens gade, Børnene, Fasandræberne, Kvinden i buret)\n/bog/dune → Fejl 404\nI databasen: Dune har IsDeleted = 1",
        loesning: R`-- Databasen (Windows: New Query på Bibliotek18DB · Mac: sqlite3 bibliotek.db "…")
ALTER TABLE Books ADD IsDeleted BIT NOT NULL DEFAULT 0;
-- Scaffold igen: samme kommando som i opgave 1 med -Force (Mac: --force)

// BooksController
public async Task<IActionResult> Index()
{
    var linjer = await _context.Books
        .Where(b => !b.IsDeleted)
        .OrderBy(b => b.Title)
        .Select(b => new BogLinje
        {
            Id = b.Id,
            Titel = b.Title,
            Forfatter = b.Author.Name,
            Aar = b.Year,
            Pris = b.Price
        })
        .ToListAsync();
    return View(linjer);
}

// I Fra: .Where(b => !b.IsDeleted && b.Year >= aar)

// I VisBog:
if (book == null || book.IsDeleted)
{
    return NotFound();
}

// DeleteConfirmed:
var book = await _context.Books.FindAsync(id);
if (book != null)
{
    book.IsDeleted = true;
}
await _context.SaveChangesAsync();
return RedirectToAction(nameof(Index));

// Views/Shared/_Menu.cshtml
<ul class="navbar-nav flex-grow-1">
    <li class="nav-item">
        <a class="nav-link text-dark" asp-controller="Books" asp-action="Index">Bøger</a>
    </li>
    <li class="nav-item">
        <a class="nav-link text-dark" asp-controller="Authors" asp-action="Index">Forfattere</a>
    </li>
</ul>

// _Layout.cshtml: <ul class="navbar-nav flex-grow-1">…</ul> erstattes af
<partial name="_Menu" />

// Program.cs, før app.UseHttpsRedirection():
app.UseStatusCodePagesWithReExecute("/Home/Fejl/{0}");

// HomeController
[Route("Home/Fejl/{kode:int}")]
public IActionResult Fejl(int kode)
{
    ViewData["Kode"] = kode;
    return View();
}

// Views/Home/Fejl.cshtml
@{
    int kode = (int)ViewData["Kode"]!;
    ViewData["Title"] = "Fejl " + kode;
}
<h1>Fejl @kode</h1>
@if (kode == 404)
{
    <p>Siden findes ikke. Tjek adressen, eller brug menuen.</p>
}
else
{
    <p>Der skete en fejl. Prøv igen om lidt.</p>
}
<a asp-controller="Home" asp-action="Index" class="btn btn-primary">Til forsiden</a>`,
        frag: true,
        ekstra: ["Lav en side `/Books/Slettede`, der viser de slettede bøger, med en knap, der gendanner en bog (`IsDeleted = false`).", "Slet en forfatter med bøger. Hvad sker der med bøgerne, og hvorfor? (Se ON DELETE CASCADE i dit script.) Ville soft delete være bedre her?"] }
    ] }
  ]
});
})();
