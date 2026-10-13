// Modul 29 — Docker og SQL Server: din egen databaseserver. Forudsætter: modul 0–28 (især 12 SQL, 17 EF Core og 19 Web API).
// Afprøvet i oktober 2026 med Docker Engine 29.8.2 + Docker Compose v5.6.0 på Linux og billedet
// mcr.microsoft.com/mssql/server:2022-latest (SQL Server 2022 CU27): docker run/ps/logs/stop/start/rm, fejlbeskederne,
// volumes, sqlcmd, T-SQL-scripts, compose.yaml (up/down/config). FirmaApp og KlubWeb (.NET 10, EF Core 10.0.12,
// Microsoft.EntityFrameworkCore.SqlServer) er bygget og kørt mod containeren med user secrets og miljøvariabler;
// fejlbeskederne for forkert password/port/database/certifikat er kopieret fra de rigtige kørsler (Linux = samme tekst som Mac).
// IKKE afprøvet: selve Docker Desktop-programmet på Windows/Mac (installation, menuer, Rosetta), Visual Studios og Riders vinduer.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m29", nr: 27.5, del: "Del 7 · Ekstra emner", ikon: "🐳",
  titel: "Docker og SQL Server: din egen databaseserver",
  dag: "Ekstra · til job som udvikler",
  intro: "På Mac har du brugt SQLite, og på Windows LocalDB. Begge er gode til at lære med, men i en virksomhed ligger databasen næsten altid på en **databaseserver**. Her får du din egen rigtige SQL Server — i en **Docker-container**, så den kører ens på Windows og Mac.\n\nDu lærer, hvad en server og en port er, hvad Docker er, hvordan du starter og forbinder til SQL Server, hvordan FirmaApp skifter over til den uden at lægge adgangskoden i koden, og de ord, du møder i jobopslag: container, image, registry og CI/CD.",
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m29l1", titel: "Hvad er en server?", min: 15,
    ord: [
      ["Server", "Et program, der kører hele tiden og venter på forespørgsler fra andre programmer. Ordet bruges også om den computer, programmet kører på."],
      ["Klient", "Det program, der sender forespørgslen og venter på svaret, fx browseren eller din web-app."],
      ["Host", "Den computer, serveren kører på. Angives med et navn eller en adresse."],
      ["localhost", "Navnet på din egen computer. `localhost` betyder: \"serveren kører her på samme maskine\"."],
      ["Port", "Et nummer fra 0 til 65535, der siger, hvilket program på computeren forespørgslen skal til. SQL Server bruger normalt 1433."],
      ["Fildatabase", "En database, der bare er én fil, som dit program selv åbner. SQLite er en fildatabase."],
      ["Databaseserver", "Et selvstændigt program, der passer på databasen og svarer på SQL fra mange klienter på én gang. SQL Server er en databaseserver."]
    ],
    trin: [
      { t: "laes", h: "Om dette modul",
        md: "Modulet er ekstra. Det er ikke en del af skolens plan, men det, du lærer her, står i mange jobopslag for C#-udviklere.\n\n**Sådan er det afprøvet:** alle `docker`-kommandoer, fejlbeskeder, SQL-scripts og C#-projekter er kørt for rigtigt med Docker 29 og SQL Server 2022 på en Linux-maskine. Det er den samme Docker og det samme SQL Server-image, som du får på din egen computer. Det, der **ikke** er afprøvet, er selve programmet **Docker Desktop** på Windows og Mac (installation, menuer og Mac-indstillingen Rosetta) og vinduerne i Visual Studio og Rider. Hvor noget kan se anderledes ud hos dig, står det.\n\nPasser noget ikke med det, du ser, så skriv ned, hvad der stod på skærmen, og sig det. Så bliver modulet rettet.",
        noter: [
          ["Forudsætter", "Modul 12 (SQL), modul 17 (FirmaApp med EF Core) og modul 19 (Web API)."],
          ["Kræver", "Docker Desktop på din computer. Lektion 2 viser, hvordan du installerer det."]
        ] },
      { t: "laes", h: "Klient og server",
        md: "En **server** er et program, der kører hele tiden og **venter**. Når et andet program sender en forespørgsel, svarer serveren og venter så på den næste. Det program, der spørger, hedder **klienten**.\n\nDu kender det allerede:\n\n- Browseren er klient. Din ASP.NET Core-app er server (modul 16).\n- JavaScript med `fetch` er klient. Dit Web API er server (modul 19).\n\nOg nu den nye: din web-app er **klient**, og **SQL Server** er server. Web-appen sender SQL, og SQL Server sender rækkerne tilbage.",
        noter: [
          ["Server", "Venter på forespørgsler og svarer. Kører hele tiden."],
          ["Klient", "Sender en forespørgsel og venter på svaret."],
          ["Samme program, to roller", "FirmaApp er server for browseren og klient for databasen."]
        ] },
      { t: "valg", q: "En bruger åbner listen over afdelinger i FirmaApp. FirmaApp henter rækkerne fra SQL Server. Hvilken rolle har FirmaApp over for SQL Server?",
        svar: ["Klient — FirmaApp sender SQL og venter på svaret fra SQL Server", "Server — FirmaApp er altid en server", "Ingen — FirmaApp og SQL Server er det samme program", "Database — FirmaApp gemmer selv rækkerne"],
        ret: 0, fordi: "Det er rollen, der tæller, ikke programmet. Over for browseren er FirmaApp server. Over for SQL Server er FirmaApp klient: den spørger, og SQL Server svarer." },
      { t: "laes", h: "Host og port: hvor er serveren?",
        md: "For at finde en server skal klienten vide to ting:\n\n1. **Host**: hvilken computer serveren kører på. Kører den på din egen computer, hedder den **`localhost`**.\n2. **Port**: et nummer, der siger, **hvilket program** på computeren der skal have forespørgslen. En computer kan køre mange servere på én gang; porten skiller dem ad.\n\nNogle porte har faste numre, som alle bruger: SQL Server lytter normalt på **1433**. Din web-app fik et tilfældigt nummer, fx 5290, da du lavede projektet.\n\nPas på skrivemåden. I en adresse i browseren står porten efter et **kolon**: `http://localhost:5290`. I en connection string til SQL Server står den efter et **komma**: `localhost,1433`.",
        noter: [
          ["localhost", "Din egen computer."],
          ["1433", "SQL Servers standardport."],
          ["localhost:5290", "Browser-adresse: kolon før porten."],
          ["localhost,1433", "SQL Server i en connection string: komma før porten."]
        ] },
      { t: "forudsig", q: "Programmet deler serverens adresse fra en connection string op i host og port. Hvad skriver det?",
        kode: R`string server = "localhost,1433";
string[] dele = server.Split(',');
Console.WriteLine($"Host: {dele[0]}");
Console.WriteLine($"Port: {dele[1]}");`,
        output: "Host: localhost\nPort: 1433",
        fordi: "`Split(',')` deler teksten ved kommaet (modul 3). Før kommaet står hosten, efter kommaet porten. Det er præcis sådan, SQL Server læser `Server=localhost,1433`." },
      { t: "spor", h: "Spor: en connection string bliver delt op",
        q: "En connection string er en række `navn=værdi`-par adskilt af semikolon. Følg programmet, og skriv værdierne efter hver linje fra 2 til 5.",
        kode: R`string cs = "Server=localhost,1433;Database=Butik;User Id=sa";
string[] dele = cs.Split(';');
string[] foerste = dele[0].Split('=');
string server = foerste[1];
string port = server.Split(',')[1];`,
        kolonner: ["dele.Length", "server", "port"],
        raekker: [[1, "=–", "=–", "=–"], [2, "=3", "=–", "=–"], [3, "3", "–", "–"], [4, "3", "localhost,1433", "–"], [5, "3", "localhost,1433", "1433"]],
        fordi: "Der er tre par, så `dele` har tre pladser. `dele[0]` er `Server=localhost,1433`, og efter `=` står `localhost,1433`. Efter kommaet står porten. Det er det første, du tjekker, når en forbindelse fejler: står der den rigtige host og den rigtige port?" },
      { t: "laes", h: "Fildatabase og databaseserver",
        md: "Der er to slags databaser:\n\n- En **fildatabase**, fx **SQLite**, er bare én fil (`firma.db`). Dit program åbner selv filen. Der er ingen server, ingen port og ingen adgangskode.\n- En **databaseserver**, fx **SQL Server**, er et selvstændigt program. Det kører hele tiden, lytter på en port, kræver login og svarer på SQL fra **mange klienter på én gang**.\n\n**LocalDB**, som du bruger på Windows, er en lille SQL Server, som Visual Studio starter for dig, når du har brug for den. Den er kun til udvikling på din egen computer.\n\nVirksomheder bruger en databaseserver, fordi mange brugere og programmer skal ind i de samme data på samme tid, fordi hver bruger kan få sine egne rettigheder, og fordi serveren tager backup og kan stå på en anden computer end web-appen.",
        noter: [
          ["SQLite", "Fil. God til små apps, mobilapps og til at lære. Ingen server."],
          ["LocalDB", "Lille SQL Server kun til udvikling på Windows. Kan ikke bruges på Mac."],
          ["SQL Server", "Rigtig databaseserver. Det, firmaer bruger — og det, du kører i Docker i dette modul."]
        ] },
      { t: "valg", q: "En webshop har en hjemmeside, en app til lageret og et regnskabsprogram, der alle skal læse og skrive de samme ordrer på samme tid. Hvad skal den bruge?",
        svar: ["En databaseserver, fx SQL Server — den svarer mange klienter på én gang og styrer, hvem der må hvad", "En SQLite-fil i hver af de tre programmer", "LocalDB på hver medarbejders computer", "En tekstfil med ordrerne"],
        ret: 0, fordi: "Tre programmer på hver sin computer skal ind i **de samme** data. Det er præcis det, en databaseserver er til. Tre SQLite-filer ville give tre forskellige sæt ordrer, og LocalDB er kun til udvikling." },
      { t: "valg", q: "Hvad betyder `localhost` i `Server=localhost,1433`?",
        svar: ["At SQL Server kører på den samme computer som programmet, der forbinder", "At databasen er en fil i projektmappen", "At forbindelsen går til Microsofts servere", "At der ikke skal bruges en port"],
        ret: 0, fordi: "`localhost` er altid din egen computer. Porten 1433 siger, hvilket program på computeren der skal svare — her SQL Server." },
      { t: "udfyld", sprog: "text", q: "SQL Server kører på din egen computer på standardporten. Udfyld starten af connection stringen.",
        kode: R`Server=[[localhost]],[[1433]];Database=Butik;`,
        fordi: "Hosten er `localhost`, og SQL Servers standardport er 1433. Mellem dem står et **komma**, ikke et kolon." },
      { t: "orden", sprog: "text", q: "FirmaApp viser listen over afdelinger. Sæt trinnene i den rækkefølge, de sker mellem web-appen og databaseserveren.",
        linjer: [R`EF Core laver LINQ-forespørgslen om til SQL`, R`FirmaApp sender SQL'en til localhost, port 1433`, R`SQL Server modtager forespørgslen og kører den`, R`SQL Server sender rækkerne tilbage`, R`EF Core laver rækkerne om til Department-objekter`],
        fordi: "Klienten (FirmaApp med EF Core) sender, serveren (SQL Server) svarer. Med SQLite er der ingen netværksdel: EF Core læser selv filen." },
      { t: "ide", h: "Din egen app er også en server",
        md: "Du har allerede kørt en server mange gange: din web-app. Kør FirmaApp (eller en anden web-app fra modul 16–19), og find den linje, der viser host og port.",
        win: ["Åbn FirmaApp i Visual Studio, og kør den med den grønne pil ▶.", "Se i vinduet **Output** (vælg **Show output from: FirmaApp** eller **ASP.NET Core Web Server**) eller i det sorte konsolvindue, hvis der kommer et.", "Find linjen `Now listening on: http://localhost:` efterfulgt af et tal. Tallet er porten."],
        mac: ["Åbn FirmaApp i Rider, og kør den med den grønne pil ▶.", "Se i **Run**-vinduet nederst.", "Find linjen `Now listening on: http://localhost:` efterfulgt af et tal. Tallet er porten."],
        sprog: "text",
        kode: R`info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5290
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.`,
        md2: "Dit tal er nok et andet end 5290. **Now listening** betyder netop: serveren venter nu på forespørgsler på den port. Stopper du appen, er der ingen, der svarer — og browseren siger, at den ikke kan oprette forbindelse. Det samme sker med SQL Server, hvis containeren ikke kører." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på en fildatabase som SQLite og en databaseserver som SQL Server? Brug ordene klient, host og port.",
        svar: "En **fildatabase** som SQLite er bare én fil, som mit program selv åbner — der er ingen server, ingen port og intet login. En **databaseserver** som SQL Server er et selvstændigt program, der kører hele tiden og venter på forespørgsler. Min web-app er **klient**: den sender SQL til serveren, som jeg finder med **host** (fx `localhost`, min egen computer) og **port** (normalt 1433). Serveren kan svare mange klienter på én gang og styre, hvem der må hvad. Derfor bruger virksomheder en databaseserver.",
        noegle: ["fil", "server", "klient", "host", "port", "mange på én gang"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m29l2", titel: "Docker: images og containere", min: 18,
    ord: [
      ["Docker", "Et værktøj, der kører programmer i containere. Et program i en container kører ens på alle computere, der har Docker."],
      ["Image", "Et pakket program med alt, hvad det skal bruge (styresystem-dele, biblioteker, indstillinger). Et image ændrer sig ikke; det er en skabelon."],
      ["Container", "En kørende kopi af et image. Du kan starte, stoppe og slette den. Sletter du den, er den væk — imaget er der stadig."],
      ["Docker Desktop", "Programmet, du installerer på Windows eller Mac. Det kører Docker i baggrunden og giver dig kommandoen `docker`."],
      ["WSL 2", "Windows Subsystem for Linux. En del af Windows, der kan køre Linux. Docker Desktop på Windows bruger det til containerne."],
      ["Docker Hub", "Et stort, offentligt sted på nettet, hvor images ligger, fx `hello-world`. Docker henter derfra, når du ikke skriver andet."],
      ["Terminal", "Vinduet, hvor du skriver kommandoer. Windows: PowerShell eller Terminal i Visual Studio. Mac: Terminal eller Terminal i Rider."]
    ],
    trin: [
      { t: "laes", h: "Problemet: \"det virker på min maskine\"",
        md: "SQL Server kan ikke installeres direkte på en Mac. Og på Windows tager en fuld installation lang tid, fylder meget og ændrer indstillinger i hele Windows.\n\n**Docker** løser det. Med Docker hentes et program som én pakke, med alt det, programmet skal bruge, og det kører i sin egen lukkede kasse, en **container**. Der installeres intet i selve Windows eller macOS. Når du er færdig, sletter du containeren, og den er væk.\n\nDerfor bruger udviklere Docker: programmet kører **ens på alle computere** — din Mac, din Windows-PC, kollegaens computer og serveren. Det svarer til at give nogen hele den færdige maskine i stedet for en installationsvejledning." },
      { t: "laes", h: "Image og container",
        md: "To ord skal være helt klare:\n\n- Et **image** er et pakket program med alt, hvad det skal bruge. Det ændrer sig aldrig. Det er en **skabelon**.\n- En **container** er en **kørende kopi** af et image. Den kan startes, stoppes og slettes.\n\nDet er samme princip som klasse og objekt (modul 4): klassen er skabelonen, objektet er en konkret kopi med sine egne værdier. Fra ét image kan du lave mange containere, og hver har sine egne data.",
        noter: [
          ["Image", "Skabelonen. Hentes én gang. Fx `mcr.microsoft.com/mssql/server:2022-latest`."],
          ["Container", "En kørende kopi. Har et navn, fx `sql1`, og sine egne data."],
          ["Slet en container", "Containeren og dens data er væk. Imaget ligger der stadig, så en ny container er hurtig at lave."]
        ] },
      { t: "valg", q: "Hvad er forskellen på et image og en container?",
        svar: ["Imaget er den uforanderlige skabelon; containeren er en kørende kopi af det", "Der er ingen forskel", "Containeren er skabelonen; imaget er den kørende kopi", "Et image kan kun bruges til én container"],
        ret: 0, fordi: "Samme forhold som klasse og objekt. Du henter imaget én gang og kan lave mange containere af det. Sletter du en container, er imaget der stadig." },
      { t: "laes", h: "Installér Docker Desktop",
        md: "Docker Desktop er gratis til personlig brug og til læring. Hent det fra **docker.com** (søg efter \"Docker Desktop download\"). Knapperne og teksterne i installationen skifter fra version til version, så læs, hvad der står, og vælg det, der ligner trinnene her.",
        win: [
          "Hent **Docker Desktop for Windows** (AMD64, hvis du bliver spurgt — det er en almindelig PC).",
          "Kør installationen. Lad fluebenet ved **Use WSL 2** (eller \"WSL 2 instead of Hyper-V\") være sat. Docker kører Linux-containere gennem **WSL 2**, en del af Windows.",
          "Genstart computeren, når du bliver bedt om det.",
          "Start **Docker Desktop** fra Start-menuen, og accepter betingelserne. Du behøver ikke oprette en konto — der er en knap til at springe over.",
          "Siger Docker Desktop, at WSL mangler eller er for gammelt: åbn **PowerShell som administrator** (højreklik → Kør som administrator), skriv `wsl --install` (eller `wsl --update`), og genstart.",
          "Docker kører, når hvalen nederst til højre ved uret ikke bevæger sig, og Docker Desktop skriver noget i stil med **Engine running**."
        ],
        mac: [
          "Find ud af, hvilken chip din Mac har: Æble-menuen → **Om denne Mac**. Står der **Apple M1, M2, M3 …**, er det Apple Silicon. Står der **Intel**, er det Intel.",
          "Hent **Docker Desktop for Mac** i den udgave, der passer: **Apple Silicon** eller **Intel chip**.",
          "Åbn den hentede `.dmg`-fil, og træk **Docker** over i **Programmer** (Applications).",
          "Start **Docker** fra Programmer. Accepter betingelserne, og skriv din Mac-adgangskode, hvis den beder om det. Du behøver ikke oprette en konto.",
          "Docker kører, når hvalen i menulinjen øverst ikke bevæger sig, og Docker Desktop skriver noget i stil med **Engine running**."
        ],
        md2: "**Docker Desktop skal være startet**, hver gang du bruger `docker`-kommandoer. Lukker du det, stopper alle containere også." },
      { t: "ide", h: "Første container: hello-world",
        md: "Åbn en **terminal**: {{PowerShell, eller **View → Terminal** i Visual Studio||Terminal-programmet, eller fanen **Terminal** nederst i Rider}}. Skriv de to kommandoer én ad gangen, og tryk Enter efter hver.\n\nDen første viser, hvilken version af Docker du har. Den anden henter imaget `hello-world` fra Docker Hub, laver en container af det og kører den. Programmet i containeren skriver en hilsen og stopper igen.",
        sprog: "text",
        kode: R`docker --version
docker run hello-world`,
        output: "Docker version 29.8.2, build 7fc2dff\nUnable to find image 'hello-world:latest' locally\nlatest: Pulling from library/hello-world\n…\nStatus: Downloaded newer image for hello-world:latest\n\nHello from Docker!\nThis message shows that your installation appears to be working correctly.",
        md2: "Dit versionsnummer er nok et andet — det gør ikke noget. Linjen **Hello from Docker!** betyder, at alt virker. Kører du kommandoen igen, står der ikke **Unable to find image**: imaget ligger der nu.\n\n**Hvis det fejler:**\n\n- `docker: command not found` (Mac) eller `'docker' is not recognized` (Windows): Docker Desktop er ikke installeret, eller terminalen var åben, før du installerede. Luk terminalen, og åbn en ny.\n- En besked med `failed to connect to the docker API` eller `Cannot connect to the Docker daemon … Is the docker daemon running?` (på Windows ofte med ordet `dockerDesktopLinuxEngine`): Docker Desktop er ikke startet. Start det, vent på **Engine running**, og prøv igen." },
      { t: "laes", h: "De kommandoer, du bruger hele tiden",
        md: "Alle Docker-kommandoer begynder med `docker`. Her er dem, du skal bruge. `sql1` er navnet på en container — det giver du den selv i næste lektion.",
        sprog: "text",
        kode: R`docker ps
docker ps -a
docker images
docker logs sql1
docker stop sql1
docker start sql1
docker rm sql1`,
        noter: [
          ["docker ps", "Viser de containere, der **kører** lige nu (ps = process status)."],
          ["docker ps -a", "Viser **alle** containere, også dem, der er stoppet (-a = all)."],
          ["docker images", "Viser de images, der er hentet til din computer, og hvor meget de fylder."],
          ["docker logs sql1", "Viser det, programmet i containeren har skrevet. Her finder du fejlbeskederne."],
          ["docker stop / start", "Stop containeren, og start den igen. Dens data er der stadig."],
          ["docker rm sql1", "Slet containeren (rm = remove). Den skal være stoppet først."]
        ] },
      { t: "spor", h: "Spor: hvad viser docker ps og docker ps -a?",
        q: "Listerne holder styr på containerne, som Docker gør: `koerer` er det, `docker ps` viser, og `alle` er det, `docker ps -a` viser. Skriv antallet i hver liste efter hver linje fra 3 til 8.",
        kode: R`List<string> koerer = new List<string>();
List<string> alle = new List<string>();
alle.Add("sql1"); koerer.Add("sql1");      // docker run ... --name sql1
alle.Add("hello");                          // docker run hello-world (stopper selv)
koerer.Remove("sql1");                      // docker stop sql1
koerer.Add("sql1");                         // docker start sql1
koerer.Remove("sql1");                      // docker stop sql1
alle.Remove("sql1");                        // docker rm sql1`,
        kolonner: ["koerer.Count", "alle.Count"],
        raekker: [[1, "=0", "=–"], [2, "=0", "=0"], [3, "1", "1"], [4, "1", "2"], [5, "0", "2"], [6, "1", "2"], [7, "0", "2"], [8, "0", "1"]],
        fordi: "`hello-world` stopper af sig selv, så den kommer kun i `alle`. `stop` fjerner containeren fra `docker ps`, men den står stadig i `docker ps -a`. Først `rm` sletter den helt." },
      { t: "valg", q: "Du har kørt `docker run hello-world`. Bagefter skriver du `docker ps`, og listen er tom. Hvorfor?",
        svar: ["Programmet i containeren stoppede, da det havde skrevet sin hilsen — `docker ps` viser kun containere, der kører. Brug `docker ps -a`", "Containeren blev aldrig lavet", "Docker Desktop er gået ned", "`docker ps` virker kun for SQL Server"],
        ret: 0, fordi: "En container kører, så længe programmet i den kører. `hello-world` skriver og slutter. Med `docker ps -a` ser du den med status `Exited (0)` — 0 betyder, at programmet sluttede uden fejl." },
      { t: "fejl", sprog: "text",
        q: "Du vil slette containeren `sql1`, som kører. Der kommer fejlen `cannot remove container \"sql1\": container is running: stop the container before removing or force remove`. Hvilken linje er det, der går galt?",
        kode: R`docker ps
docker rm sql1
docker stop sql1
docker ps -a`,
        linje: 2,
        fordi: "En container, der kører, kan ikke slettes. Rækkefølgen skal være `docker stop sql1` og **derefter** `docker rm sql1`. (Med `docker rm -f sql1` tvinger man den, men så stoppes den uden varsel.)",
        rettet: R`docker ps
docker stop sql1
docker rm sql1
docker ps -a` },
      { t: "skriv", sprog: "text", q: "Skriv den kommando, der viser **alle** containere — også dem, der er stoppet.",
        tjek: [
          [/^docker ps/, "Start med `docker ps`"],
          [/-a\b|--all/, "Tilføj `-a`, så de stoppede også kommer med"]
        ],
        forkert: ["docker ps", "docker images"],
        loesning: R`docker ps -a` },
      { t: "ide", h: "Øv kommandoerne på hello-world",
        md: "Gør det i din terminal, og se efter hver kommando, hvad der står.",
        sprog: "text",
        kode: R`docker run hello-world
docker ps
docker ps -a
docker images`,
        output: "CONTAINER ID   IMAGE         COMMAND    CREATED                  STATUS                              PORTS     NAMES\n694d9500a320   hello-world   \"/hello\"   Less than a second ago   Exited (0) Less than a second ago             elated_lamarr\n185ea6d65e9d   hello-world   \"/hello\"   1 second ago             Exited (0) Less than a second ago             thirsty_mestorf",
        md2: "Udskriften ovenfor er fra `docker ps -a` efter to kørsler. `docker ps` viser kun overskriftslinjen, fordi ingen kører. Dine id'er og navne er andre: Docker finder selv på et navn som `elated_lamarr`, når du ikke giver et.\n\nSlet nu dine hello-world-containere: skriv `docker rm` og navnet fra kolonnen **NAMES**, fx `docker rm elated_lamarr`. Kør `docker ps -a` igen, og se, at de er væk. `docker images` viser stadig `hello-world` — imaget bliver liggende.\n\n`docker images` ser forskellig ud fra version til version. Nye versioner har kolonnerne `IMAGE`, `ID` og `DISK USAGE`, ældre har `REPOSITORY`, `TAG` og `SIZE`. Indholdet er det samme." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad er forskellen på et image og en container, og hvorfor bruger udviklere Docker?",
        svar: "Et **image** er et pakket program med alt, hvad det skal bruge. Det ændrer sig aldrig — det er en **skabelon**, ligesom en klasse. En **container** er en **kørende kopi** af imaget, ligesom et objekt; den kan startes, stoppes og slettes, og den har sine egne data. Udviklere bruger Docker, fordi programmet så **kører ens på alle computere**, fordi der ikke skal **installeres** noget i selve styresystemet, og fordi man bare kan **slette** containeren, når man er færdig. Fx kan jeg køre SQL Server på en Mac, hvor den ellers ikke kan installeres.",
        noegle: ["image", "skabelon", "container", "kørende kopi", "ens på alle computere", "installere", "slette"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m29l3", titel: "SQL Server i en container", min: 20,
    ord: [
      ["docker pull", "Henter et image til din computer uden at starte det."],
      ["Miljøvariabel", "En indstilling med et navn og en værdi, som et program læser, når det starter. Med `docker run -e NAVN=værdi` giver du den til programmet i containeren."],
      ["ACCEPT_EULA", "Miljøvariablen, der siger, at du accepterer Microsofts licensbetingelser. Uden `Y` vil SQL Server ikke starte."],
      ["sa", "System administrator: den indbyggede admin-bruger i SQL Server. Dens adgangskode giver du med `MSSQL_SA_PASSWORD`."],
      ["Portmapping", "`-p 1433:1433` forbinder en port på din computer (før kolon) med en port inde i containeren (efter kolon)."],
      ["Volume", "Et lager, som Docker passer på uden for containeren. Data i en volume overlever, at containeren slettes."],
      ["Rosetta", "Apples oversætter, der lader en Mac med Apple Silicon køre programmer lavet til Intel-chips (x86-64)."]
    ],
    trin: [
      { t: "laes", h: "Hent SQL Server-imaget",
        md: "Microsoft lægger SQL Server som et image i deres eget register, **mcr.microsoft.com** (Microsoft Container Registry). Du henter det med `docker pull`:",
        sprog: "text",
        kode: R`docker pull mcr.microsoft.com/mssql/server:2022-latest`,
        noter: [
          ["mcr.microsoft.com", "Hvor imaget ligger: Microsofts register. Uden et navn foran henter Docker fra Docker Hub."],
          ["mssql/server", "Imagets navn: SQL Server (til Linux — containerne kører Linux, også på Windows og Mac)."],
          [":2022-latest", "Et **tag**: hvilken udgave. Her den nyeste opdatering af SQL Server 2022."]
        ],
        md2: "Download er ca. 600 MB, og imaget fylder godt 2 GB på disken. Det tager et par minutter. Til sidst står der `Status: Downloaded newer image for mcr.microsoft.com/mssql/server:2022-latest`. Imaget indeholder **Developer Edition**: den fulde SQL Server, gratis til udvikling og test." },
      { t: "laes", h: "Start serveren: docker run, flag for flag",
        md: "Nu laver du en container af imaget. Kommandoen er lang, men hvert stykke har én opgave. Skriv den på **én linje**.",
        sprog: "text",
        kode: R`docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Kode12Sql2026" -p 1433:1433 -v sqldata:/var/opt/mssql --name sql1 -d mcr.microsoft.com/mssql/server:2022-latest`,
        noter: [
          ["-e \"ACCEPT_EULA=Y\"", "-e sætter en **miljøvariabel** i containeren. `Y` = ja, jeg accepterer licensbetingelserne."],
          ["-e \"MSSQL_SA_PASSWORD=…\"", "Adgangskoden til admin-brugeren **sa**. Vælg din egen (reglerne kommer om lidt)."],
          ["-p 1433:1433", "Portmapping: port 1433 på **din** computer går til port 1433 i **containeren**."],
          ["-v sqldata:/var/opt/mssql", "En **volume** ved navn `sqldata`. SQL Server gemmer databaserne i mappen `/var/opt/mssql`, og den mappe ligger nu i volumen. Mere om det senere i lektionen."],
          ["--name sql1", "Containerens navn. Uden det finder Docker på et tilfældigt navn."],
          ["-d", "Detached: kør i baggrunden, så terminalen er fri igen."],
          ["mcr.microsoft.com/mssql/server:2022-latest", "Imaget. Står altid til sidst."]
        ],
        md2: "Hvis det lykkes, skriver Docker kun containerens lange id, fx `83a8599d735b94123349…`, og er færdig. SQL Server skal bruge 10–30 sekunder på at starte inde i containeren." },
      { t: "valg", q: "Port 1433 er optaget på din computer, så du starter containeren med `-p 14330:1433`. Hvilken port skal stå i din connection string?",
        svar: ["14330 — din app forbinder til porten på din egen computer, og Docker sender videre til 1433 i containeren", "1433 — det er SQL Servers port", "Begge, adskilt af kolon", "Ingen — Docker finder selv porten"],
        ret: 0, fordi: "Tallet **før** kolonet er porten på din computer — det er den, klienten bruger: `Server=localhost,14330`. Tallet **efter** kolonet er porten inde i containeren, hvor SQL Server altid lytter på 1433." },
      { t: "forudsig", q: "Programmet læser portmappingen fra `-p 14330:1433`. Hvad skriver det?",
        kode: R`string mapping = "14330:1433";
string[] dele = mapping.Split(':');
Console.WriteLine($"Din app forbinder til port {dele[0]}");
Console.WriteLine($"SQL Server lytter på port {dele[1]} i containeren");`,
        output: "Din app forbinder til port 14330\nSQL Server lytter på port 1433 i containeren",
        fordi: "Venstre side er din computer, højre side er containeren. Reglen er altid den samme: `-p din-port:container-port`." },
      { t: "laes", h: "Adgangskoden: reglerne",
        md: "SQL Server nægter at starte med en svag adgangskode til `sa`. Reglerne er:\n\n- Mindst **8 tegn**.\n- Tegn fra mindst **tre af de fire grupper**: store bogstaver, små bogstaver, cifre og symboler.\n\n`Kode12Sql2026` er gyldig: store bogstaver (K, S), små bogstaver og cifre — tre grupper.\n\nUndgå tegnene `!`, `$`, `\"` og `;` i din adgangskode. `!` og `$` betyder noget særligt i terminalen (især på Mac), og `;` skiller delene ad i en connection string. Bogstaver og cifre er nok.",
        noter: [
          ["hej123", "Ugyldig: kun 6 tegn."],
          ["hejhejhej", "Ugyldig: kun én gruppe (små bogstaver)."],
          ["Kode12Sql2026", "Gyldig: tre grupper og 13 tegn. Brug din egen."]
        ] },
      { t: "forudsig", q: "Metoden tæller, hvor mange af de fire grupper en adgangskode bruger. Hvad skriver programmet?",
        kode: R`Console.WriteLine(Grupper("hejhejhej"));
Console.WriteLine(Grupper("Kode12Sql2026"));
Console.WriteLine(Grupper("Kode12Sql2026") >= 3 && "Kode12Sql2026".Length >= 8);

static int Grupper(string pw)
{
    int antal = 0;
    if (pw.Any(char.IsUpper)) antal++;
    if (pw.Any(char.IsLower)) antal++;
    if (pw.Any(char.IsDigit)) antal++;
    if (pw.Any(t => !char.IsLetterOrDigit(t))) antal++;
    return antal;
}`,
        output: "1\n3\nTrue",
        fordi: "`hejhejhej` har kun små bogstaver: 1 gruppe. `Kode12Sql2026` har store, små og cifre, men intet symbol: 3 grupper, og den er 13 tegn lang — gyldig. `Any` med en metode (modul 10) spørger: findes der mindst ét tegn, der passer?" },
      { t: "skriv", sprog: "text", q: "Skriv `docker run`-kommandoen, der starter SQL Server 2022 i baggrunden med navnet `sql1`, port 1433 på begge sider, licensen accepteret og adgangskoden `Kode12Sql2026`. (Volumen springer du over her.)",
        tjek: [
          [/^docker run/, "Start med `docker run`"],
          [/-e ?["']?ACCEPT_EULA=Y/, "Acceptér licensen: `-e \"ACCEPT_EULA=Y\"`"],
          [/-e ?["']?MSSQL_SA_PASSWORD=Kode12Sql2026/, "Sæt adgangskoden: `-e \"MSSQL_SA_PASSWORD=Kode12Sql2026\"`"],
          [/-p ?1433:1433/, "Portmapping: `-p 1433:1433`"],
          [/--name ?sql1/, "Navngiv containeren: `--name sql1`"],
          [/[^-]-d(?= |-|$)/, "Kør i baggrunden: `-d`"],
          [/mcr\.microsoft\.com\/mssql\/server:2022-latest$/, "Imaget står til sidst: `mcr.microsoft.com/mssql/server:2022-latest`"]
        ],
        forkert: [R`docker run -e "MSSQL_SA_PASSWORD=Kode12Sql2026" -p 1433:1433 --name sql1 -d mcr.microsoft.com/mssql/server:2022-latest`, R`docker run mcr.microsoft.com/mssql/server:2022-latest -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Kode12Sql2026" -p 1433:1433 --name sql1 -d`],
        loesning: R`docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Kode12Sql2026" -p 1433:1433 --name sql1 -d mcr.microsoft.com/mssql/server:2022-latest`,
        fordi: "Rækkefølgen af flagene er ligegyldig, men imaget skal stå **sidst**. Alt efter imagets navn bliver ellers sendt videre til programmet i containeren i stedet for til Docker." },
      { t: "laes", h: "Mac med Apple Silicon: Rosetta",
        md: "SQL Server-imaget findes kun til **Intel-chips** (x86-64, også kaldet amd64). Har din Mac en **Apple M**-chip, skal Docker Desktop oversætte det med **Rosetta**, Apples oversætter. Microsoft understøtter ikke officielt SQL Server på Apple Silicon, men det kører — bare langsommere end på en PC. Til at lære og udvikle er det fint.\n\nIndstillingen ligger i Docker Desktop: tandhjulet (**Settings**) → **General**. Find en indstilling med ordet **Rosetta**, fx *Use Rosetta for x86_64/amd64 emulation on Apple Silicon*, og sæt flueben. Klik **Apply & restart**. I nogle versioner skal **Apple Virtualization framework** være valgt, før Rosetta-indstillingen kan sættes, og i nye versioner er den måske allerede slået til. Navnene skifter mellem versioner, så se efter ordet *Rosetta*.\n\nDu kan få denne advarsel, når du kører `docker run`. Den er ufarlig, når Rosetta er slået til:\n\n`WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8)`\n\nPå Windows og på en Mac med Intel-chip skal du ikke gøre noget." },
      { t: "ide", h: "Start din egen SQL Server",
        md: "Sørg for, at Docker Desktop kører. Skriv kommandoerne i terminalen én ad gangen. Brug din egen adgangskode i stedet for `Kode12Sql2026` — og skriv den ned, du skal bruge den mange gange.",
        sprog: "text",
        kode: R`docker pull mcr.microsoft.com/mssql/server:2022-latest
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Kode12Sql2026" -p 1433:1433 -v sqldata:/var/opt/mssql --name sql1 -d mcr.microsoft.com/mssql/server:2022-latest
docker ps
docker logs sql1`,
        output: "CONTAINER ID   IMAGE                                        COMMAND                  CREATED          STATUS          PORTS                    NAMES\nbf4ff59d4d7e   mcr.microsoft.com/mssql/server:2022-latest   \"/opt/mssql/bin/laun…\"   27 seconds ago   Up 25 seconds   0.0.0.0:1433->1433/tcp   sql1",
        md2: "Udskriften ovenfor er fra `docker ps`. Vent ca. 30 sekunder, og kør så `docker logs sql1`. Der kommer mange linjer. Tæt på slutningen skal der stå:\n\n`SQL Server is now ready for client connections. This is an informational message; no user action is required.`\n\n**De almindelige fejl:**\n\n- `docker ps` viser intet, og `docker ps -a` viser `Exited (255)`: SQL Server stoppede. Kig i `docker logs sql1`. Står der `Password validation failed. The password does not meet SQL Server password policy requirements because it is too short` (eller `not complex enough`), er adgangskoden for svag. Står der `The SQL Server End-User License Agreement (EULA) must be accepted`, mangler `-e \"ACCEPT_EULA=Y\"`. Slet containeren med `docker rm sql1`, og kør `docker run` igen.\n- `Bind for 0.0.0.0:1433 failed: port is already allocated`: noget andet bruger allerede port 1433 — måske en anden container. Se efter med `docker ps`, eller brug `-p 14330:1433`. Containeren er lavet, men ikke startet: slet den med `docker rm sql1`, før du prøver igen.\n- `Conflict. The container name \"/sql1\" is already in use`: der findes allerede en container med det navn (se `docker ps -a`). Start den med `docker start sql1`, eller slet den først." },
      { t: "laes", h: "Volumes: data, der overlever",
        md: "Alt, hvad en container skriver, ligger **i containeren**. Sletter du containeren med `docker rm`, er databaserne væk. Det er godt til at prøve noget af, men ikke til data, du vil beholde.\n\nEn **volume** er et lager, som Docker passer på **uden for** containeren. Med `-v sqldata:/var/opt/mssql` lægger SQL Server sine databaser i volumen `sqldata`. Sletter du containeren og laver en ny med det samme `-v`, er databaserne der stadig. Afprøvet: tabellen `Kunder` havde 3 rækker før `docker rm` og 3 rækker i den nye container.\n\nSe dine volumes med `docker volume ls`. Slet en med `docker volume rm sqldata` — så er data væk for altid.",
        noter: [
          ["sqldata", "Volumens navn. Du vælger det selv. Docker laver den første gang."],
          ["/var/opt/mssql", "Mappen inde i containeren, hvor SQL Server gemmer alt. Den skal staves præcis sådan."],
          ["Pas på adgangskoden", "Adgangskoden fra `MSSQL_SA_PASSWORD` bliver kun brugt, **første gang** volumen bruges. Afprøvet: en ny container på en gammel volume med en ny adgangskode giver `Login failed for user 'sa'` med den nye — den gamle virker stadig."]
        ] },
      { t: "valg", q: "Du har lavet databasen `Butik` i containeren `sql1`. Du kører `docker stop sql1`, `docker rm sql1` og så den samme `docker run`-kommando igen. Hvornår er `Butik` der stadig?",
        svar: ["Kun hvis begge `docker run`-kommandoer havde den samme volume, fx `-v sqldata:/var/opt/mssql`", "Altid — Docker gemmer alt", "Aldrig — en ny container er altid tom", "Kun hvis du skrev `docker start` i stedet for `docker run`"],
        ret: 0, fordi: "Uden volume ligger data i containeren og forsvinder med `docker rm`. Med en volume ligger data uden for containeren, og den nye container finder dem igen. (`docker stop` og `docker start` alene sletter intet — det er `rm`, der gør.)" },
      { t: "fejl", sprog: "text",
        q: "Containeren `sql1` stopper med det samme. `docker logs sql1` siger: `Password validation failed. The password does not meet SQL Server password policy requirements because it is too short. The password must be at least 8 characters`. Klik på den linje, der er skyld i det.",
        kode: R`docker pull mcr.microsoft.com/mssql/server:2022-latest
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=hej123" -p 1433:1433 --name sql1 -d mcr.microsoft.com/mssql/server:2022-latest
docker ps
docker ps -a
docker logs sql1`,
        linje: 2,
        fordi: "`hej123` er kun 6 tegn og har kun to grupper. SQL Server stopper, og `docker ps -a` viser `Exited (255)`. Ret adgangskoden, slet den stoppede container med `docker rm sql1`, og kør `docker run` igen.",
        rettet: R`docker pull mcr.microsoft.com/mssql/server:2022-latest
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Kode12Sql2026" -p 1433:1433 --name sql1 -d mcr.microsoft.com/mssql/server:2022-latest
docker ps
docker ps -a
docker logs sql1` },
      { t: "forklar", q: "Forklar med dine egne ord, hvad hver del af denne kommando gør: `docker run -e \"ACCEPT_EULA=Y\" -e \"MSSQL_SA_PASSWORD=…\" -p 1433:1433 -v sqldata:/var/opt/mssql --name sql1 -d mcr.microsoft.com/mssql/server:2022-latest`",
        svar: "`docker run` laver en ny **container** af imaget, der står til sidst: SQL Server 2022 fra Microsofts register. De to `-e` sætter **miljøvariabler**: at jeg accepterer licensen, og adgangskoden til admin-brugeren **sa**, som skal være mindst 8 tegn fra tre grupper. `-p 1433:1433` er **portmapping**: port 1433 på min computer går til 1433 i containeren. `-v` lægger databaserne i en **volume**, så de overlever, at containeren slettes. `--name` giver containeren navnet `sql1`, og `-d` kører den i baggrunden.",
        noegle: ["container", "image", "miljøvariabel", "sa", "portmapping", "volume", "baggrunden"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m29l4", titel: "Forbind til serveren", min: 18,
    ord: [
      ["Connection string", "Teksten, der fortæller et program, hvor databasen er, og hvordan det logger ind: `navn=værdi`-par adskilt af semikolon."],
      ["SQL login", "Login med brugernavn og adgangskode, som SQL Server selv kender, fx `sa`. Skrives `User Id=…;Password=…`."],
      ["Windows login", "Login med den Windows-bruger, du er logget ind som. Skrives `Trusted_Connection=True`. Bruges med LocalDB."],
      ["Kryptering", "Forbindelsen til SQL Server er krypteret, så ingen kan læse med. Til det bruger serveren et certifikat."],
      ["TrustServerCertificate", "`TrustServerCertificate=True` siger: stol på serverens certifikat, selv om ingen kendt myndighed har udstedt det. Kun til udvikling."],
      ["sqlcmd", "Microsofts program til at skrive SQL til SQL Server i en terminal. Det ligger i SQL Server-imaget."],
      ["docker exec", "Kører en kommando inde i en container, der kører."]
    ],
    trin: [
      { t: "laes", h: "Connection stringen til containeren",
        md: "I modul 17 forbandt FirmaApp til LocalDB med **Windows login**: `Trusted_Connection=True` betyder \"log ind som den Windows-bruger, jeg er\". Containeren kender ikke din Windows-bruger — den er en Linux-maskine for sig. Derfor bruger du et **SQL login**: brugernavn og adgangskode.",
        sprog: "text",
        kode: R`Server=localhost,1433;Database=FirmaAppDB;User Id=sa;Password=Kode12Sql2026;TrustServerCertificate=True`,
        noter: [
          ["Server=localhost,1433", "Host og port — med **komma**. Brugte du `-p 14330:1433`, står her `localhost,14330`."],
          ["Database=FirmaAppDB", "Hvilken database på serveren. En server kan have mange databaser."],
          ["User Id=sa", "SQL login: brugernavnet."],
          ["Password=…", "Adgangskoden fra `MSSQL_SA_PASSWORD`."],
          ["TrustServerCertificate=True", "Stol på containerens certifikat. Forklares om lidt."]
        ],
        md2: "Til sammenligning, LocalDB fra modul 17: `Server=(localdb)\\MSSQLLocalDB;Database=FirmaAppDB;Trusted_Connection=True;TrustServerCertificate=True`. Ingen port, ingen adgangskode — Windows ordner login." },
      { t: "valg", q: "Hvorfor kan du ikke bruge `Trusted_Connection=True` mod SQL Server i en Docker-container?",
        svar: ["Containeren kender ikke din Windows- eller Mac-bruger, så du skal logge ind med et SQL login: `User Id` og `Password`", "Fordi Docker ikke tillader adgangskoder", "Fordi `Trusted_Connection` kun virker på Mac", "Fordi containeren ikke har en port"],
        ret: 0, fordi: "`Trusted_Connection=True` er **Windows login**: SQL Server spørger Windows, hvem du er. Containeren er en Linux-maskine for sig og ved intet om din bruger. Med et **SQL login** kender SQL Server selv brugeren `sa` og dens adgangskode." },
      { t: "udfyld", sprog: "text", q: "Udfyld connection stringen til databasen `Butik` i containeren, som kører på port 1433 med brugeren `sa`.",
        kode: R`Server=localhost[[,]]1433;Database=[[Butik]];User Id=[[sa]];Password=Kode12Sql2026;[[TrustServerCertificate]]=True`,
        fordi: "Komma mellem host og port, databasens navn, SQL-login-brugeren `sa`, og `TrustServerCertificate=True`, fordi containeren bruger et certifikat, den selv har lavet." },
      { t: "fejl", sprog: "text",
        q: "FirmaApp kan ikke forbinde. Fejlen er: `A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible.` Containeren kører, og adgangskoden er rigtig. Klik på den linje i `secrets.json`, der er forkert.",
        kode: R`{
  "ConnectionStrings:FirmaContext": "Server=localhost:1433;Database=FirmaAppDB;User Id=sa;Password=Kode12Sql2026;TrustServerCertificate=True"
}`,
        linje: 2,
        fordi: "Der står `localhost:1433` med **kolon**. SQL Server læser det som et servernavn, der hedder `localhost:1433`, og finder ingen. Porten skal stå efter et **komma**: `localhost,1433`. Afprøvet: med kolon kommer netop `A network-related or instance-specific error`.",
        rettet: R`{
  "ConnectionStrings:FirmaContext": "Server=localhost,1433;Database=FirmaAppDB;User Id=sa;Password=Kode12Sql2026;TrustServerCertificate=True"
}` },
      { t: "laes", h: "TrustServerCertificate: hvorfor?",
        md: "Forbindelsen til SQL Server er **krypteret**, så ingen på netværket kan læse med. Det har været standard i .NET i nogle år. For at bevise, hvem den er, viser serveren et **certifikat**.\n\nI en virksomhed er certifikatet udstedt af en myndighed, din computer stoler på. Containerens certifikat har SQL Server lavet **selv**. Det stoler din computer ikke på, og så afviser .NET forbindelsen.\n\n`TrustServerCertificate=True` siger: \"stol på certifikatet alligevel\". Forbindelsen er stadig krypteret. Det er fint på din egen computer, men på en rigtig server bruger man et rigtigt certifikat og fjerner `TrustServerCertificate`.",
        noter: [
          ["Uden den — Mac", "`A connection was successfully established with the server, but then an error occurred during the pre-login handshake.` og længere nede `Certificate failed chain validation … self-signed certificate` (afprøvet)."],
          ["Uden den — Windows", "Slutningen lyder i stedet `(provider: SSL Provider, error: 0 - The certificate chain was issued by an authority that is not trusted.)` (fra Microsofts dokumentation)."],
          ["Hvad den løser", "At certifikatet er lavet af serveren selv. Den løser **ikke** en forkert port eller adgangskode."]
        ] },
      { t: "valg", q: "FirmaApp giver fejlen: `A connection was successfully established with the server, but then an error occurred during the pre-login handshake` med `self-signed certificate` længere nede. Hvad mangler i connection stringen?",
        svar: ["`TrustServerCertificate=True`", "`Trusted_Connection=True`", "Porten `,1433`", "`Database=master`"],
        ret: 0, fordi: "\"Successfully established\" betyder, at host og port er rigtige — serveren svarede. Det gik galt bagefter, ved certifikatet, fordi containerens certifikat er selvlavet. `Trusted_Connection` er noget helt andet: Windows login." },
      { t: "laes", h: "sqlcmd: SQL direkte i containeren",
        md: "SQL Server-imaget har programmet **sqlcmd** med. Med `docker exec` kører du det **inde i** containeren. Det virker, uanset om dit IDE kan forbinde — derfor er det godt til at teste, om serveren svarer.",
        sprog: "text",
        kode: R`docker exec -it sql1 /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P Kode12Sql2026 -C`,
        noter: [
          ["docker exec -it sql1", "Kør en kommando i containeren `sql1`. `-it` gør, at du kan skrive til den."],
          ["/opt/mssql-tools18/bin/sqlcmd", "Hvor sqlcmd ligger i containeren."],
          ["-S localhost -U sa -P …", "Server, bruger og adgangskode. Inde i containeren er SQL Server på `localhost`."],
          ["-C", "Stol på serverens certifikat — sqlcmds udgave af `TrustServerCertificate=True`."]
        ],
        md2: "Nu står der `1>`. Skriv `SELECT @@VERSION`, tryk Enter, skriv `GO`, og tryk Enter. `GO` betyder \"kør det, jeg har skrevet\". Svaret begynder med `Microsoft SQL Server 2022`. Skriv `exit` for at komme ud.\n\nMangler `-C`, siger sqlcmd `SSL Provider: [error:0A000086:SSL routines::certificate verify failed:self-signed certificate]`. Forkert adgangskode giver `Login failed for user 'sa'.` Begge er afprøvet." },
      { t: "ide", h: "Forbind fra dit IDE",
        md: "Det er rarere at skrive SQL i et vindue med farver og en resultattabel. Forbind til containeren fra dit IDE. Vinduerne er beskrevet ud fra producenternes dokumentation og kan se lidt anderledes ud i din version — se efter felterne med de samme navne.",
        win: [
          "Åbn **View → SQL Server Object Explorer**.",
          "Klik på knappen **Add SQL Server** øverst i vinduet (et ikon med et lille plus).",
          "**Server Name:** `localhost,1433`. **Authentication:** **SQL Server Authentication**. **User Name:** `sa`. **Password:** din adgangskode.",
          "Sæt flueben ved **Trust Server Certificate** (eller vælg **Encrypt: Optional**, hvis der kun er det). Klik **Connect**.",
          "Fold `localhost,1433` → **Databases** ud. Du ser databaserne `master`, `model`, `msdb` og `tempdb` under **System Databases** — det er SQL Servers egne.",
          "Højreklik på `localhost,1433` → **New Query…** for at skrive SQL."
        ],
        mac: [
          "Åbn Riders **Database**-vindue (View → Tool Windows → Database).",
          "Klik på **+** → **Data Source** → **Microsoft SQL Server**.",
          "**Host:** `localhost`. **Port:** `1433`. **Authentication:** **User & Password**. **User:** `sa`. **Password:** din adgangskode.",
          "Beder Rider om at hente driver-filer (**Download missing driver files**), så klik på linket.",
          "Klik **Test Connection**. Står der en fejl med *SSL*, *certificate* eller *PKIX*: gå til fanen **Advanced**, find `trustServerCertificate`, og sæt den til `true`. Prøv igen.",
          "Klik **OK**. Fold forbindelsen ud: du ser databaserne. Klik på **QL**-ikonet (eller højreklik → **New → Query Console**) for at skrive SQL."
        ],
        md2: "Får du `Login failed for user 'sa'`, er adgangskoden forkert. Får du noget med *connection refused*, *timeout* eller *network-related*, kører containeren ikke (`docker ps`), eller porten er forkert." },
      { t: "ide", h: "T-SQL fra modul 12 — nu for rigtigt",
        md: "I modul 12 var noget af SQL'en kun til SQL Server: `IDENTITY`, `NVARCHAR` og `TOP`. På Mac kunne du ikke køre det. Nu kan du. Skriv scriptet i dit query-vindue (eller i sqlcmd), og kør det. `GO` deler scriptet i bidder, så databasen findes, før `USE` skifter til den.",
        sprog: "sql",
        kode: R`CREATE DATABASE Butik;
GO
USE Butik;
GO
CREATE TABLE Kunder (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Navn NVARCHAR(50) NOT NULL,
    Bynavn NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NULL
);
INSERT INTO Kunder (Navn, Bynavn, Email) VALUES
    (N'Anna Holm', N'Aarhus', N'anna@mail.dk'),
    (N'Bo Ærø', N'Odense', NULL),
    (N'Carla Jensen', N'Aalborg', N'carla@mail.dk');
SELECT TOP 2 Id, Navn, Bynavn FROM Kunder ORDER BY Navn;
GO`,
        output: "Id  Navn       Bynavn\n1   Anna Holm  Aarhus\n2   Bo Ærø     Odense",
        md2: "`N` foran teksten betyder, at den er Unicode (`NVARCHAR`), så æ, ø og å bliver gemt rigtigt. `IDENTITY(1,1)` gav selv Id 1, 2 og 3. Kører du scriptet igen, får du `Database 'Butik' already exists` — databasen er der allerede, og det gør ikke noget.\n\nI sqlcmd ser resultatet lidt anderledes ud: kolonnerne er brede, og der står `(2 rows affected)` under." },
      { t: "valg", q: "Du får fejlen `Login failed for user 'sa'.` Hvad betyder det?",
        svar: ["Serveren svarede, men adgangskoden (eller brugernavnet) passer ikke", "Containeren kører ikke", "Porten er forkert", "Databasen findes ikke"],
        ret: 0, fordi: "For at sige \"login failed\" skal serveren have svaret — så host og port er rigtige. Tjek adgangskoden. Har du lavet en ny container på en gammel volume, gælder den **gamle** adgangskode stadig. (Findes databasen ikke, siger SQL Server `Cannot open database \"…\" requested by the login.`)" },
      { t: "forklar", q: "Forklar med dine egne ord, hvad der står i en connection string til SQL Server i Docker, og hvorfor `TrustServerCertificate=True` er med.",
        svar: "Connection stringen har `Server=localhost,1433` — **host** og **port** med komma imellem — `Database=` med databasens navn, og et **SQL login** med `User Id=sa` og `Password=`. Jeg kan ikke bruge `Trusted_Connection` (Windows login), fordi containeren ikke kender min bruger. Forbindelsen er **krypteret**, og containerens **certifikat** er lavet af serveren selv, så .NET stoler ikke på det. `TrustServerCertificate=True` siger, at den skal stole på det alligevel. Det er kun til **udvikling**; en rigtig server har et rigtigt certifikat.",
        noegle: ["localhost,1433", "Database", "SQL login", "sa", "krypteret", "certifikat", "udvikling"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m29l5", titel: "FirmaApp mod en rigtig server", min: 20,
    ord: [
      ["Provider", "EF Core-pakken, der taler med én bestemt slags database: `…SqlServer` eller `…Sqlite`."],
      ["User secrets", "Hemmelige indstillinger, der ligger i din brugermappe uden for projektet, så de aldrig kommer med i Git."],
      ["secrets.json", "Filen med dine user secrets. Den ligger et sted med projektets `UserSecretsId` i navnet."],
      ["UserSecretsId", "Et id i `.csproj`-filen, der siger, hvilken `secrets.json` projektet bruger."],
      ["Konfigurationskilde", "Et sted, ASP.NET Core læser indstillinger fra: `appsettings.json`, user secrets, miljøvariabler. Den, der læses sidst, vinder."],
      ["Miljøvariabel (konfiguration)", "En indstilling, der sættes udenfor programmet. `ConnectionStrings__FirmaContext` (to understreger) overskriver connection stringen."]
    ],
    trin: [
      { t: "laes", h: "Hvad skal ændres?",
        md: "FirmaApp fra modul 17 skal nu bruge SQL Server i containeren. Hvor meget der skal ændres, afhænger af, hvad du brugte før:\n\n- **Windows (LocalDB):** du brugte allerede provideren `Microsoft.EntityFrameworkCore.SqlServer` og `UseSqlServer`. LocalDB **er** en SQL Server. Kun connection stringen skal skifte. Dine migrationer passer stadig.\n- **Mac (SQLite):** du brugte provideren `…Sqlite` og `UseSqlite`. Provideren skal skiftes, og **migrationerne skal laves forfra**, fordi en migration er skrevet til én bestemt database.\n\nOg uanset platform: **adgangskoden må ikke stå i `appsettings.json`.**",
        noter: [
          ["Windows", "Ny connection string. Det er det."],
          ["Mac", "Ny pakke, `UseSqlServer`, nye migrationer, ny connection string."]
        ] },
      { t: "valg", q: "Hvorfor skal Mac-udgaven af FirmaApp have nye migrationer, når den skifter fra SQLite til SQL Server?",
        svar: ["Migrationerne er skrevet til SQLite: der står fx typen `TEXT` og `Sqlite:Autoincrement`, hvor SQL Server skal have `nvarchar(50)` og `SqlServer:Identity`", "Fordi migrationer kun virker én gang", "Fordi SQL Server ikke kan bruge migrationer", "Fordi Docker sletter Migrations-mappen"],
        ret: 0, fordi: "En migration er C#-kode, der beskriver tabellerne med **den providers** typer. Afprøvet: med de gamle SQLite-migrationer siger `dotnet ef database update`: *The model for context 'FirmaContext' has pending changes. Add a new migration before updating the database.* Løsningen er at slette mappen Migrations og lave en ny `Init`." },
      { t: "laes", h: "Mac: skift provider i FirmaApp",
        md: "På Mac skal du i Riders Terminal (i projektets mappe) fjerne SQLite-pakken og hente SQL Server-pakken, og i `Program.cs` skal `UseSqlite` blive til `UseSqlServer`. (På Windows står det allerede sådan.)",
        sprog: "text",
        kode: R`dotnet remove package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 10.0.12`,
        noter: [
          ["dotnet remove package", "Fjerner pakken fra `FirmaApp.csproj`."],
          ["…SqlServer --version 10.0.12", "Samme version som de andre EF Core-pakker fra modul 17."]
        ],
        md2: "I `Program.cs`:\n\n`options.UseSqlServer(builder.Configuration.GetConnectionString(\"FirmaContext\"))`\n\nResten af `Program.cs`, modellerne og `FirmaContext` er uændret. Det er pointen med EF Core: din C#-kode ved ikke, hvilken database der ligger bag." },
      { t: "udfyld", frag: true, q: "Registrér `FirmaContext`, så den bruger SQL Server med connection stringen `FirmaContext`.",
        kode: R`builder.Services.AddDbContext<FirmaContext>(options =>
    options.[[UseSqlServer]](builder.Configuration.[[GetConnectionString]]("FirmaContext")));`,
        fordi: "`UseSqlServer` vælger SQL Server-provideren. `GetConnectionString(\"FirmaContext\")` henter teksten — fra `appsettings.json`, user secrets eller en miljøvariabel, alt efter hvor den står." },
      { t: "laes", h: "Adgangskoden hører ikke til i appsettings.json",
        md: "`appsettings.json` ligger i projektet og kommer med, når du lægger koden på GitHub eller sender den til nogen. Står adgangskoden der, kan alle læse den. Du mødte løsningen i modul 20: **user secrets**. Filen `secrets.json` ligger i din brugermappe, **uden for** projektet.\n\nI `appsettings.json` lader du connection stringen stå **uden** `Password`. I user secrets lægger du hele connection stringen **med** adgangskoden. Når appen kører, vinder user secrets, fordi de bliver læst efter `appsettings.json`.",
        win: [
          "Højreklik på projektet i Solution Explorer → **Manage User Secrets**.",
          "Filen `secrets.json` åbner. Skriv: `{ \"ConnectionStrings:FirmaContext\": \"Server=localhost,1433;Database=FirmaAppDB;User Id=sa;Password=Kode12Sql2026;TrustServerCertificate=True\" }` — med din egen adgangskode — og gem.",
          "Filen ligger i `%APPDATA%\\Microsoft\\UserSecrets\\` i en mappe med projektets `UserSecretsId` som navn."
        ],
        mac: [
          "Åbn Riders **Terminal** i projektets mappe, og skriv `dotnet user-secrets init`. Svaret er `Set UserSecretsId to '…' for MSBuild project '…/FirmaApp.csproj'.`",
          "Skriv (på én linje, med din egen adgangskode): `dotnet user-secrets set \"ConnectionStrings:FirmaContext\" \"Server=localhost,1433;Database=FirmaAppDB;User Id=sa;Password=Kode12Sql2026;TrustServerCertificate=True\"`",
          "Svaret er `Successfully saved ConnectionStrings:FirmaContext to the secret store.` Med `dotnet user-secrets list` ser du, hvad der er gemt.",
          "Filen ligger i `~/.microsoft/usersecrets/` i en mappe med projektets `UserSecretsId` som navn."
        ],
        sprog: "text",
        kode: R`appsettings.json (kommer med i Git):
  "ConnectionStrings": {
    "FirmaContext": "Server=localhost,1433;Database=FirmaAppDB;User Id=sa;TrustServerCertificate=True"
  }

secrets.json (uden for projektet):
  "ConnectionStrings:FirmaContext": "Server=localhost,1433;Database=FirmaAppDB;User Id=sa;Password=Kode12Sql2026;TrustServerCertificate=True"`,
        noter: [
          ["ConnectionStrings:FirmaContext", "Kolon betyder \"inde i\": nøglen `FirmaContext` inde i afsnittet `ConnectionStrings`. Samme sted som i `appsettings.json`."],
          ["Samme nøgle to steder", "Den kilde, der læses sidst, vinder. User secrets læses efter `appsettings.json`."],
          ["Kun i Development", "User secrets bliver kun læst, når appen kører som Development — det gør den, når du kører fra dit IDE."]
        ] },
      { t: "spor", h: "Spor: hvilken connection string vinder?",
        q: "ASP.NET Core læser kilderne i rækkefølge, og en senere kilde overskriver en tidligere. Programmet efterligner det. Skriv `kilde` og `harPassword` efter hver linje fra 1 til 6.",
        kode: R`string kilde = "appsettings.json";
bool udvikling = true;
bool harSecrets = true;
bool harMiljoeVariabel = false;
if (udvikling && harSecrets) kilde = "user secrets";
if (harMiljoeVariabel) kilde = "miljøvariabel";
bool harPassword = kilde != "appsettings.json";`,
        kolonner: ["kilde", "harPassword"],
        raekker: [[1, "=appsettings.json", "=–"], [2, "=appsettings.json", "=–"], [3, "appsettings.json", "–"], [4, "appsettings.json", "–"], [5, "user secrets", "–"], [6, "user secrets", "–"], [7, "user secrets", "True"]],
        fordi: "Rækkefølgen er `appsettings.json` → user secrets (kun i Development) → miljøvariabler. Her er der user secrets og ingen miljøvariabel, så user secrets vinder, og connection stringen har adgangskoden med. Er du i tvivl om, hvilken der bliver brugt, så sæt et breakpoint efter `GetConnectionString` og se værdien i debuggeren." },
      { t: "forudsig", q: "Samme regler, men nu er appen lagt ud på en server og kører som Production, og der er sat en miljøvariabel. Hvad skriver programmet?",
        kode: R`string kilde = "appsettings.json";
bool udvikling = false;
bool harSecrets = true;
bool harMiljoeVariabel = true;
if (udvikling && harSecrets) kilde = "user secrets";
if (harMiljoeVariabel) kilde = "miljøvariabel";
Console.WriteLine(kilde);`,
        output: "miljøvariabel",
        fordi: "User secrets bliver kun læst i Development, så de springes over. Miljøvariablen læses sidst og vinder. Det er sådan, adgangskoden kommer ind på en rigtig server." },
      { t: "laes", h: "Miljøvariabler: sådan gør man på en server",
        md: "User secrets findes kun på din egen computer. På en server sætter man adgangskoden i en **miljøvariabel**. Navnet skrives med **to understreger** i stedet for kolon, fordi kolon ikke må stå i et miljøvariabelnavn alle steder:\n\n`ConnectionStrings__FirmaContext`\n\nMiljøvariabler læses **efter** user secrets, så de vinder over alt andet. Afprøvet: med en miljøvariabel med en forkert adgangskode fik FirmaApp `Login failed for user 'sa'`, selv om user secrets var rigtige.",
        sprog: "text",
        kode: R`Windows (PowerShell), kun i dette vindue:
$env:ConnectionStrings__FirmaContext = "Server=localhost,1433;Database=FirmaAppDB;User Id=sa;Password=Kode12Sql2026;TrustServerCertificate=True"

Mac (Terminal), kun i dette vindue:
export ConnectionStrings__FirmaContext="Server=localhost,1433;Database=FirmaAppDB;User Id=sa;Password=Kode12Sql2026;TrustServerCertificate=True"`,
        noter: [
          ["__ (to understreger)", "Betyder det samme som `:` i `ConnectionStrings:FirmaContext`."],
          ["Kun i dette vindue", "Variablen forsvinder, når terminalen lukkes. På en server sættes den fast i serverens opsætning."],
          ["Ingen fil", "Adgangskoden står ikke i nogen fil i projektet."]
        ] },
      { t: "valg", q: "Du har ved en fejl lagt FirmaApp på GitHub med adgangskoden i `appsettings.json`. Hvad er det rigtige at gøre?",
        svar: ["Skifte adgangskoden på serveren, flytte connection stringen med adgangskoden over i user secrets og fjerne adgangskoden fra `appsettings.json`", "Slette linjen i `appsettings.json` — så er den væk", "Gøre ingenting, så længe ingen har set den", "Omdøbe `appsettings.json`"],
        ret: 0, fordi: "Git husker alle tidligere udgaver af filen, så adgangskoden kan stadig findes i historikken. Den skal derfor betragtes som afsløret og **skiftes**. Bagefter flytter du den til user secrets, så det ikke sker igen." },
      { t: "orden", sprog: "text", q: "Sæt trinnene i rækkefølge, når FirmaApp på **Mac** skal skifte fra SQLite til SQL Server i containeren. Brug samme rækkefølge som i gennemgangen: serveren først, så de tre ændringer i projektet (pakker, `Program.cs`, connection string), og til sidst migration og database.",
        linjer: [R`Start containeren sql1, og tjek med docker ps, at den kører`, R`dotnet remove package Microsoft.EntityFrameworkCore.Sqlite og dotnet add package Microsoft.EntityFrameworkCore.SqlServer`, R`Ret UseSqlite til UseSqlServer i Program.cs`, R`Læg connection stringen i user secrets, og en udgave uden Password i appsettings.json`, R`Slet mappen Migrations, og kør dotnet ef migrations add Init`, R`Kør dotnet ef database update`],
        fordi: "Serveren skal køre, før noget kan forbinde. Pakken og `UseSqlServer` skal være på plads, før migrationen laves — ellers bliver den skrevet til SQLite. `database update` skal kunne finde serveren og adgangskoden, så den kommer til sidst." },
      { t: "ide", h: "Skift FirmaApp over til containeren",
        md: "Tag en kopi af FirmaApp-mappen først, så du har SQLite- eller LocalDB-udgaven, hvis noget går galt. Containeren `sql1` skal køre.",
        win: [
          "Læg connection stringen i user secrets (trin 5), og ret den i `appsettings.json`, så den peger på `localhost,1433` **uden** `Password`.",
          "Package Manager Console: `Update-Database`. Dine gamle migrationer bliver kørt på den nye server, og databasen `FirmaAppDB` bliver lavet i containeren.",
          "Kør FirmaApp, og åbn **Afdelinger**. Listen er tom, eller den har startdata fra `HasData` — det er en ny database.",
          "Opret en afdeling. Se den i SQL Server Object Explorer under `localhost,1433 → Databases → FirmaAppDB → Tables → dbo.Departments` (højreklik → **View Data**)."
        ],
        mac: [
          "Skift provider (trin 3), og læg connection stringen i user secrets (trin 5). Ret `appsettings.json`, så den peger på `localhost,1433` **uden** `Password`.",
          "Slet mappen **Migrations** og filen `firma.db`.",
          "Terminal: `dotnet ef migrations add Init`. Svaret slutter med `Done. To undo this action, use 'ef migrations remove'`.",
          "Terminal: `dotnet ef database update`. Svaret slutter med `Done.` Databasen `FirmaAppDB` er lavet i containeren.",
          "Kør FirmaApp, og åbn **Afdelinger**. Opret en afdeling, og find den i Riders Database-vindue under din SQL Server-forbindelse → **FirmaAppDB** → **tables** → **Departments**."
        ],
        output: "Successfully saved ConnectionStrings:FirmaContext to the secret store.\nDone. To undo this action, use 'ef migrations remove'\nDone.",
        md2: "Udskriften er fra Mac-terminalen. Siden **Afdelinger** viste Salg, Lager og IT fra `HasData`, da den blev afprøvet.\n\n**De almindelige fejl (afprøvet):**\n\n- `The model for context 'FirmaContext' has pending changes. Add a new migration before updating the database.` — du har de gamle SQLite-migrationer. Slet Migrations, og lav `Init` igen.\n- `Login failed for user 'sa'.` — forkert adgangskode, eller user secrets mangler, så connection stringen uden `Password` fra `appsettings.json` bliver brugt.\n- `A network-related or instance-specific error occurred …` — containeren kører ikke, eller porten er forkert. På Windows slutter beskeden typisk med `No connection could be made because the target machine actively refused it`.\n- `Cannot open database \"FirmaAppDB\" requested by the login. The login failed.` — databasen findes ikke endnu: kør `Update-Database` / `dotnet ef database update`, eller tjek stavningen i `Database=`." },
      { t: "forklar", q: "Forklar med dine egne ord: Hvorfor må adgangskoden til databasen ikke stå i `appsettings.json`, og hvor står den i stedet — på din egen computer og på en server?",
        svar: "`appsettings.json` ligger i projektet og kommer med i **Git**, så alle med adgang til koden kan læse adgangskoden — og Git husker den, selv om jeg sletter den senere. På min egen computer lægger jeg connection stringen med adgangskoden i **user secrets**: `secrets.json` i min brugermappe, **uden for** projektet. Den bliver kun læst i **Development**. På en **server** sætter man den som en **miljøvariabel**, `ConnectionStrings__FirmaContext`. ASP.NET Core læser kilderne i rækkefølge, og den **sidste vinder**: appsettings, så user secrets, så miljøvariabler.",
        noegle: ["Git", "user secrets", "uden for projektet", "Development", "miljøvariabel", "sidste vinder"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m29l6", titel: "docker compose og lidt om drift", min: 18,
    ord: [
      ["docker compose", "Et værktøj, der starter en eller flere containere ud fra en fil, så du ikke skal skrive lange `docker run`-kommandoer."],
      ["compose.yaml", "Filen, der beskriver containerne: image, porte, miljøvariabler og volumes. Skrevet i YAML."],
      ["YAML", "Et tekstformat, hvor **indrykningen** viser, hvad der hører til hvad. Kun mellemrum — aldrig tabulator."],
      ["Service", "Én container i en compose-fil, fx `db`."],
      ["Deploy", "At lægge en ny udgave af programmet ud, så brugerne kan bruge den — typisk på en server eller i skyen."],
      ["dotnet publish", "Bygger programmet færdigt i Release og samler alt, hvad det skal bruge, i én mappe, klar til en server."],
      ["Registry", "Et sted, hvor images ligger, så andre kan hente dem, fx Docker Hub eller mcr.microsoft.com."],
      ["CI/CD", "Continuous Integration / Continuous Deployment: hver gang der lægges kode i Git, bliver den automatisk bygget, testet og eventuelt lagt ud."]
    ],
    trin: [
      { t: "laes", h: "Problemet: kommandoen er lang",
        md: "`docker run`-kommandoen fra lektion 3 er lang, og den skal skrives præcis. Glemmer du `-v` én gang, er dine data ikke i volumen. Og en kollega skal have den samme kommando.\n\n**docker compose** løser det. Du skriver det hele **én gang** i en fil, `compose.yaml`, og lægger filen i projektets mappe. Så starter du med `docker compose up -d` og stopper med `docker compose down`. Filen kan komme med i Git — bare ikke med en rigtig adgangskode til en rigtig server." },
      { t: "laes", h: "compose.yaml for FirmaApps database",
        md: "Filen er skrevet i **YAML**. Indrykningen viser, hvad der hører til hvad, ligesom tuborgklammer i C#. Brug **to mellemrum** pr. niveau og aldrig tabulator.",
        sprog: "text",
        kode: R`services:
  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: firma-sql
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_SA_PASSWORD: "Kode12Sql2026"
    ports:
      - "1433:1433"
    volumes:
      - firmadata:/var/opt/mssql

volumes:
  firmadata:`,
        noter: [
          ["services:", "Listen over containere. Her er der én."],
          ["db:", "Navnet på servicen. Du vælger det selv."],
          ["image:", "Samme image som i `docker run`."],
          ["container_name: firma-sql", "Svarer til `--name`."],
          ["environment:", "Svarer til `-e`. `\"Y\"` i anførselstegn, så YAML ikke læser det som ja/nej."],
          ["ports: - \"1433:1433\"", "Svarer til `-p`. Bindestregen betyder \"et punkt i en liste\"."],
          ["volumes: - firmadata:/var/opt/mssql", "Svarer til `-v`."],
          ["volumes: firmadata: (nederst)", "Erklærer volumen. Uden den siger compose `refers to undefined volume firmadata`."]
        ] },
      { t: "valg", q: "Hvad svarer linjen `- firmadata:/var/opt/mssql` under `volumes:` i servicen til i en `docker run`-kommando?",
        svar: ["`-v firmadata:/var/opt/mssql` — databaserne gemmes i volumen og overlever, at containeren slettes", "`-p firmadata:/var/opt/mssql`", "`--name firmadata`", "`-e firmadata=/var/opt/mssql`"],
        ret: 0, fordi: "compose-filen er bare en anden måde at skrive de samme flag på: `environment` er `-e`, `ports` er `-p`, `volumes` er `-v`, og `container_name` er `--name`." },
      { t: "fejl", sprog: "text",
        q: "`docker compose up -d` siger: `services.ports must be a mapping`. Klik på den linje, der står forkert.",
        kode: R`services:
  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_SA_PASSWORD: "Kode12Sql2026"
  ports:
    - "1433:1433"`,
        linje: 7,
        fordi: "`ports:` er kun rykket to mellemrum ind, så YAML tror, at `ports` er en service ved siden af `db`. Den skal stå med fire mellemrum, under `db`, på linje med `image` og `environment`. Afprøvet: præcis den fejlbesked kommer. Med en tabulator i stedet for mellemrum siger compose `found a tab character that violates indentation`.",
        rettet: R`services:
  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_SA_PASSWORD: "Kode12Sql2026"
    ports:
      - "1433:1433"` },
      { t: "udfyld", sprog: "text", q: "Start containerne fra `compose.yaml` i baggrunden, se status, og stop og slet dem igen.",
        kode: R`docker compose [[up]] -d
docker compose [[ps]]
docker compose [[down]]`,
        fordi: "`up -d` laver og starter containerne i baggrunden. `ps` viser dem. `down` stopper og sletter containerne — men **ikke** volumen, så data er der næste gang. (`docker compose down -v` sletter også volumen.)" },
      { t: "ide", h: "FirmaApps database med compose",
        md: "Stop først `sql1`, ellers er port 1433 optaget: `docker stop sql1`. Lav så filen `compose.yaml` i FirmaApp-projektets mappe (samme mappe som `FirmaApp.csproj`), og skriv indholdet fra trin 2 med din egen adgangskode. Åbn en terminal i mappen.",
        sprog: "text",
        kode: R`docker compose config -q
docker compose up -d
docker compose ps
docker compose down`,
        output: " Volume firmaapp_firmadata Created\n Network firmaapp_default Created\n Container firma-sql Created\n Container firma-sql Started",
        md2: "`docker compose config -q` tjekker filen. Er den i orden, skriver den **ingenting**. Udskriften ovenfor er fra `up -d` (lidt forkortet). Volumen hedder `firmaapp_firmadata`: compose sætter mappens navn foran.\n\nDet er en **ny** volume, så databasen er tom. Vent 30 sekunder, og kør `dotnet ef database update` / `Update-Database` igen, før du starter FirmaApp. Kør så `docker compose down` og `docker compose up -d` igen: dine afdelinger er der stadig.\n\n**Fejl:** `Bind for 0.0.0.0:1433 failed: port is already allocated` betyder, at `sql1` stadig kører. `services.… must be a mapping` eller `tab character` er indrykningsfejl." },
      { t: "laes", h: "Deploy og dotnet publish",
        md: "Indtil nu har du kørt FirmaApp fra dit IDE. At lægge en ny udgave ud, så rigtige brugere kan bruge den, hedder at **deploye**.\n\nFørste skridt er `dotnet publish`. Den bygger appen i **Release** og samler alt, hvad den skal bruge, i én mappe: din `FirmaApp.dll`, EF Core, SQL Server-driveren og `appsettings.json`. Mappen kopieres til serveren og startes der.",
        sprog: "text",
        kode: R`dotnet publish -c Release -o publish`,
        output: "  FirmaApp -> …/FirmaApp/bin/Release/net10.0/FirmaApp.dll\n  FirmaApp -> …/FirmaApp/publish/",
        noter: [
          ["-c Release", "Byg den hurtige udgave uden debug-hjælp."],
          ["-o publish", "Læg det hele i mappen `publish`."],
          ["dotnet FirmaApp.dll", "Sådan startes appen på serveren, inde i `publish`-mappen."]
        ],
        md2: "Afprøvet: startet fra `publish`-mappen kører appen som **Production**. User secrets bliver ikke læst, så den fik `Login failed for user 'sa'`. Med miljøvariablen `ConnectionStrings__FirmaContext` sat virkede den. Det er lektion 5 i praksis." },
      { t: "valg", q: "FirmaApp virker fint fra dit IDE. Du kører `dotnet publish` og starter appen fra `publish`-mappen. Nu giver den `Login failed for user 'sa'.` Hvorfor?",
        svar: ["Appen kører som Production, så user secrets bliver ikke læst, og connection stringen uden `Password` fra `appsettings.json` bliver brugt — sæt en miljøvariabel", "`dotnet publish` sletter databasen", "Containeren stopper, når man kører `dotnet publish`", "Release-udgaven kan ikke bruge SQL Server"],
        ret: 0, fordi: "User secrets er kun til udvikling på din egen computer. Uden for Development skal adgangskoden komme fra en **miljøvariabel**, `ConnectionStrings__FirmaContext`." },
      { t: "laes", h: "Ordene fra jobopslagene",
        md: "Her er ordene, du ofte møder i jobopslag for .NET-udviklere. Du behøver ikke kunne det hele, men du skal vide, hvad ordene betyder.",
        noter: [
          ["Container", "En kørende kopi af et image, der kører ens overalt. Firmaer kører både databaser og deres egne web-apps i containere."],
          ["Image", "Den pakkede skabelon for en container. Et firma laver et image af sin web-app ved hver ny udgave."],
          ["Registry", "Et sted, hvor images ligger, så servere kan hente dem. Docker Hub og mcr.microsoft.com er offentlige; firmaer har ofte deres eget."],
          ["CI/CD", "Når kode lægges i Git, bliver den automatisk bygget og testet (CI) og lagt ud (CD). Eksempler: GitHub Actions og Azure DevOps."],
          ["Cloud-database", "En databaseserver, som en udbyder kører for dig i skyen. Du betaler pr. brug og skal ikke selv tage backup."],
          ["Azure SQL", "Microsofts SQL Server i skyen. Samme T-SQL og samme `UseSqlServer` — kun connection stringen er anderledes."],
          ["Docker compose", "Starter flere containere sammen ud fra én fil, fx en database og en web-app."]
        ] },
      { t: "valg", q: "Et jobopslag skriver: \"Vi bygger vores images i CI/CD og lægger dem i vores eget registry\". Hvad er et registry?",
        svar: ["Et sted, hvor images ligger, så andre computere og servere kan hente dem", "En database til kunderne", "Et program, der tester koden", "En slags container, der ikke kan stoppes"],
        ret: 0, fordi: "Du har allerede hentet fra to registries: Docker Hub (`hello-world`) og Microsofts (`mcr.microsoft.com/mssql/server`). Et firma lægger sine egne images i sit eget registry." },
      { t: "valg", q: "Hvad betyder CI/CD?",
        svar: ["At ny kode i Git automatisk bliver bygget og testet (CI) og lagt ud på serveren (CD)", "At containere starter automatisk, når computeren tændes", "At databasen tager backup hver nat", "At koden skrives af to personer på én gang"],
        ret: 0, fordi: "Continuous Integration: hver ændring bygges og testes med det samme, så fejl findes tidligt. Continuous Deployment: når alt er grønt, bliver den nye udgave lagt ud uden manuelt arbejde." },
      { t: "forklar", q: "Til en jobsamtale: \"Har du arbejdet med Docker?\" Forklar, hvad du har gjort, og hvorfor det er smart.",
        svar: "Ja, jeg har kørt **SQL Server i en Docker-container** på min egen computer. Et **image** er den pakkede skabelon, og en **container** er en kørende kopi. Jeg startede den med `docker run` med miljøvariabler for licens og adgangskode, **portmapping** til 1433 og en **volume**, så data overlever. Senere beskrev jeg det i en `compose.yaml`, så det startes med `docker compose up -d`. Min ASP.NET Core-app forbinder med en connection string, hvor adgangskoden ligger i **user secrets** og på en server i en **miljøvariabel**. Det smarte er, at det **kører ens** på alle computere, og at intet skal installeres i selve styresystemet.",
        noegle: ["image", "container", "docker run", "portmapping", "volume", "compose", "user secrets", "kører ens"] }
    ] },

  // ------------------------------------------------------------------
  { id: "m29v", titel: "Værksted: klubbens egen databaseserver", vaerksted: true, min: 90, ord: [],
    trin: [
      { t: "laes", h: "Sådan arbejder du i værkstedet",
        md: "Du bygger en database til en idrætsklub på din egen SQL Server i Docker: først serveren, så tabellerne med T-SQL, så en MVC-app, der bruger serveren, en fejlfinding og til sidst det hele i en `compose.yaml`.\n\nOpgaverne har ikke et program, der kan sammenlignes tegn for tegn. I stedet står der under hver opgave præcis, hvad du skal se, når det virker.",
        noter: [
          ["Skriv selv", "Skriv kommandoerne og koden selv. Det er skrivningen, der får det til at sidde."],
          ["Én ting ad gangen", "Kør efter hver kommando, og læs svaret, før du skriver den næste."],
          ["Læs fejlbeskeden", "Næsten alle fejl i dette modul står i lektionerne med deres betydning. Kopiér den første linje, og find den."],
          ["Brug debuggeren", "Sæt et breakpoint i `Program.cs`, og se, hvilken connection string der **faktisk** bliver brugt."],
          ["Tips før løsning", "Åbn ét tip ad gangen. Løsningen er sidste udvej."]
        ] },

      { t: "opgave", h: "Klubbens SQL Server med volume", projekt: "Terminal", sprog: "text", fri: true,
        md: "Start en ny SQL Server-container til klubben ved siden af `sql1`. Den skal have sin egen volume, så data overlever, og en port, der ikke støder sammen med `sql1`.",
        krav: [
          "Containeren hedder `klub-sql` og bruger imaget `mcr.microsoft.com/mssql/server:2022-latest`",
          "Port **14330** på din computer går til 1433 i containeren",
          "Databaserne ligger i volumen `klubdata`",
          "`sa` har en gyldig adgangskode, du selv vælger (mindst 8 tegn, tre grupper, ingen `!`, `$`, `\"` eller `;`)",
          "`docker ps` viser `klub-sql` med `Up` og `0.0.0.0:14330->1433/tcp`",
          "`docker logs klub-sql` viser `SQL Server is now ready for client connections`"
        ],
        tip: [
          "Skriv den samme `docker run` som i lektion 3, og skift navn, port og volume.",
          "Portmapping er `-p din-port:container-port`, altså `-p 14330:1433`. Volumen er `-v klubdata:/var/opt/mssql`.",
          "`docker run -e \"ACCEPT_EULA=Y\" -e \"MSSQL_SA_PASSWORD=…\" -p 14330:1433 -v klubdata:/var/opt/mssql --name klub-sql -d mcr.microsoft.com/mssql/server:2022-latest`"
        ],
        output: "CONTAINER ID   IMAGE                                        COMMAND                  CREATED          STATUS          PORTS                     NAMES\n1e42a1666ab1   mcr.microsoft.com/mssql/server:2022-latest   \"/opt/mssql/bin/laun…\"   31 seconds ago   Up 30 seconds   0.0.0.0:14330->1433/tcp   klub-sql",
        loesning: R`docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Klub2026Sql" -p 14330:1433 -v klubdata:/var/opt/mssql --name klub-sql -d mcr.microsoft.com/mssql/server:2022-latest
docker ps
docker logs klub-sql`,
        ekstra: ["Forbind til `klub-sql` fra dit IDE. Husk port 14330: `localhost,14330` i Visual Studio, Port `14330` i Rider.", "Kør `docker volume ls`, og find `klubdata`."] },

      { t: "opgave", h: "Klubbens database fra kravene", projekt: "Klub (SQL)", sprog: "sql", fri: true,
        md: "Skriv et T-SQL-script, der laver klubbens database med hold og medlemmer, fylder data i og tæller medlemmer pr. hold. Kør det på `klub-sql` fra dit IDE eller med sqlcmd.",
        krav: [
          "Databasen hedder `Klub`",
          "Tabellen `Hold` har `Id` (heltal, automatisk nummer, primærnøgle) og `Navn` (Unicode-tekst, højst 50 tegn, skal udfyldes)",
          "Tabellen `Medlemmer` har `Id` (som før), `Navn` (som før), `Alder` (heltal, skal udfyldes) og `HoldId` (heltal, skal udfyldes, fremmednøgle til `Hold`)",
          "Holdene, i denne rækkefølge: Fodbold, Svømning, Håndbold",
          "Medlemmerne: Anna 12 Fodbold, Bo 14 Svømning, Carl 11 Fodbold, Dina 15 Svømning, Emil 13 Fodbold",
          "Til sidst en `SELECT`, der viser hvert holds navn og antal medlemmer i kolonnen `Antal`, flest først — også hold med 0 medlemmer"
        ],
        tip: [
          "Start med `CREATE DATABASE Klub;`, `GO`, `USE Klub;`, `GO`. Brug `INT IDENTITY(1,1) PRIMARY KEY` og `NVARCHAR(50) NOT NULL` som i modul 12. Fremmednøglen: `HoldId INT NOT NULL REFERENCES Hold(Id)`.",
          "Holdene får Id 1, 2 og 3 i den rækkefølge, du indsætter dem. Skriv `N'Svømning'` med `N` foran, så ø bliver gemt rigtigt.",
          "Hold med 0 medlemmer kræver `LEFT JOIN` (modul 12): `SELECT h.Navn, COUNT(m.Id) AS Antal FROM Hold h LEFT JOIN Medlemmer m ON m.HoldId = h.Id GROUP BY h.Navn ORDER BY Antal DESC;`"
        ],
        output: "Navn       Antal\nFodbold    3\nSvømning   2\nHåndbold   0",
        loesning: R`CREATE DATABASE Klub;
GO
USE Klub;
GO
CREATE TABLE Hold (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Navn NVARCHAR(50) NOT NULL
);

CREATE TABLE Medlemmer (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Navn NVARCHAR(50) NOT NULL,
    Alder INT NOT NULL,
    HoldId INT NOT NULL REFERENCES Hold(Id)
);

INSERT INTO Hold (Navn) VALUES (N'Fodbold'), (N'Svømning'), (N'Håndbold');

INSERT INTO Medlemmer (Navn, Alder, HoldId) VALUES
    (N'Anna', 12, 1),
    (N'Bo', 14, 2),
    (N'Carl', 11, 1),
    (N'Dina', 15, 2),
    (N'Emil', 13, 1);

SELECT h.Navn, COUNT(m.Id) AS Antal
FROM Hold h
LEFT JOIN Medlemmer m ON m.HoldId = h.Id
GROUP BY h.Navn
ORDER BY Antal DESC;
GO`,
        ekstra: ["Prøv at indsætte et medlem med `HoldId` 9. Afprøvet: `The INSERT statement conflicted with the FOREIGN KEY constraint …` — fremmednøglen beskytter dig.", "Find gennemsnitsalderen pr. hold med `AVG(m.Alder)`. Hvad viser Håndbold, der ingen medlemmer har?"] },

      { t: "opgave", h: "KlubWeb: en MVC-app på serveren", projekt: "KlubWeb", sprog: "csharp", fri: true,
        md: "Lav en ny MVC-app, `KlubWeb`, med EF Core code first, der lægger sin egen database på `klub-sql`. Adgangskoden må ikke stå i `appsettings.json`.",
        krav: [
          "MVC-projekt `KlubWeb` med .NET 10, uden login og uden HTTPS, med pakkerne `Microsoft.EntityFrameworkCore.SqlServer`, `.Tools` og `.Design` i version 10.0.12",
          "Modellerne `Hold` (`Id`, `Navn` med `[Required]` og `[StringLength(50)]`, listen `Medlemmer`) og `Medlem` (`Id`, `Navn` som før, `HoldId` og navigation propertyen `Hold`)",
          "`KlubContext` med `DbSet<Hold> Hold` og `DbSet<Medlem> Medlemmer` og startdata med `HasData`: Fodbold (Id 1) og Svømning (Id 2)",
          "`appsettings.json` har connection stringen `KlubContext` til `localhost,14330`, databasen `KlubWebDB`, `User Id=sa` og `TrustServerCertificate=True` — men **uden** `Password`",
          "User secrets har hele connection stringen **med** adgangskoden",
          "Migrationen `Init` er lavet og kørt, så `KlubWebDB` findes på `klub-sql`",
          "Opret tre medlemmer på siden: Anna (Fodbold), Bo (Svømning) og Carl (Fodbold)",
          "Siden `/Medlemmer` viser hvert medlems navn og **holdets navn** — ikke holdets Id"
        ],
        tip: [
          "Byg det som FirmaApp i modul 17: modeller → pakker → `KlubContext` → connection string → `AddDbContext` med `UseSqlServer` → migration → controller og views. Scaffold `MedlemmerController` og `HoldController` med views, ligesom i modul 17.",
          "User secrets: {{højreklik på projektet → **Manage User Secrets**||`dotnet user-secrets init` og `dotnet user-secrets set \"ConnectionStrings:KlubContext\" \"…\"`}}. Nøglen er `ConnectionStrings:KlubContext`.",
          "`Index` i `MedlemmerController` skal hente med `Include(m => m.Hold)` (modul 17), ellers er `Hold` `null`. Viser kolonnen et tal, så ret viewet til `@Html.DisplayFor(modelItem => item.Hold.Navn)`."
        ],
        output: "Navn   Hold\nAnna   Fodbold\nBo     Svømning\nCarl   Fodbold",
        loesning: R`// Models/Klub.cs
using System.ComponentModel.DataAnnotations;

namespace KlubWeb.Models
{
    public class Hold
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Navn { get; set; } = "";

        public List<Medlem> Medlemmer { get; set; } = new List<Medlem>();
    }

    public class Medlem
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Navn { get; set; } = "";

        public int HoldId { get; set; }
        public Hold? Hold { get; set; }
    }
}

// Data/KlubContext.cs
public class KlubContext : DbContext
{
    public KlubContext(DbContextOptions<KlubContext> options) : base(options)
    {
    }

    public DbSet<Hold> Hold { get; set; }
    public DbSet<Medlem> Medlemmer { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Hold>().HasData(
            new Hold { Id = 1, Navn = "Fodbold" },
            new Hold { Id = 2, Navn = "Svømning" });
    }
}

// Program.cs — under AddControllersWithViews
string? cs = builder.Configuration.GetConnectionString("KlubContext");
builder.Services.AddDbContext<KlubContext>(options =>
    options.UseSqlServer(cs));

// appsettings.json — efter "AllowedHosts": "*",
//   "ConnectionStrings": {
//     "KlubContext": "Server=localhost,14330;Database=KlubWebDB;User Id=sa;TrustServerCertificate=True"
//   }

// Terminal (Mac) / tilsvarende i Visual Studio:
//   dotnet user-secrets init
//   dotnet user-secrets set "ConnectionStrings:KlubContext" "Server=localhost,14330;Database=KlubWebDB;User Id=sa;Password=Klub2026Sql;TrustServerCertificate=True"
//   dotnet ef migrations add Init        (Windows: Add-Migration Init)
//   dotnet ef database update            (Windows: Update-Database)

// MedlemmerController.Index
public async Task<IActionResult> Index()
{
    return View(await _context.Medlemmer.Include(m => m.Hold).ToListAsync());
}`,
        frag: true,
        ekstra: ["Find medlemmerne i dit IDE's databasevindue under `KlubWebDB → Medlemmer`.", "Kør `docker stop klub-sql`, og genindlæs `/Medlemmer`. Læs fejlbeskeden. Start containeren igen med `docker start klub-sql`."] },

      { t: "opgave", h: "Fejlfinding: KlubWeb kan ikke finde serveren", projekt: "KlubWeb", sprog: "text", fri: true,
        md: "En dag giver `/Medlemmer` denne fejl:\n\n`A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible.`\n\n`docker ps` viser, at `klub-sql` kører med `0.0.0.0:14330->1433/tcp`. Du åbner `appsettings.json`, og den ser rigtig ud. Find fejlen **med debuggeren**, før du retter noget. Kopiér filerne nedenfor ind, så du har samme fejl.",
        start: R`appsettings.json (uændret og rigtig):
  "ConnectionStrings": {
    "KlubContext": "Server=localhost,14330;Database=KlubWebDB;User Id=sa;TrustServerCertificate=True"
  }

secrets.json (sat for længe siden, under et forsøg):
{
  "ConnectionStrings:KlubContext": "Server=localhost,1433;Database=KlubWebDB;User Id=sa;Password=Klub2026Sql;TrustServerCertificate=True"
}

Program.cs:
string? cs = builder.Configuration.GetConnectionString("KlubContext");
builder.Services.AddDbContext<KlubContext>(options =>
    options.UseSqlServer(cs));`,
        krav: [
          "Sørg for, at intet svarer på port 1433: `docker ps` må ikke vise `sql1` eller `firma-sql` (stop dem med `docker stop`). Sæt user secrets som i startkoden — så har du fejlen",
          "Sæt et breakpoint på linjen `builder.Services.AddDbContext<KlubContext>(…)` i `Program.cs`, og start med debuggeren",
          "Se værdien af `cs` i {{**Locals**||**Threads & Variables**}}: hvilken port står der, og står der `Password`?",
          "Forklar, hvorfor værdien ikke er den fra `appsettings.json`",
          "Ret fejlen, så `/Medlemmer` virker igen — uden at lægge adgangskoden i `appsettings.json`"
        ],
        tip: [
          "Står der `Password` i `cs`, kommer værdien ikke fra `appsettings.json` — den har ingen adgangskode. Hvilken kilde bliver læst efter `appsettings.json`?",
          "User secrets har den samme nøgle, `ConnectionStrings:KlubContext`, og vinder. Den gamle værdi peger på port 1433, men `klub-sql` lytter på 14330.",
          "Ret user secrets: {{højreklik → **Manage User Secrets**, og ret `1433` til `14330`||`dotnet user-secrets set \"ConnectionStrings:KlubContext\" \"Server=localhost,14330;Database=KlubWebDB;User Id=sa;Password=…;TrustServerCertificate=True\"`}}. Kør igen."
        ],
        output: "cs = \"Server=localhost,1433;Database=KlubWebDB;User Id=sa;Password=Klub2026Sql;TrustServerCertificate=True\"\nFejlen: user secrets vinder over appsettings.json og peger på port 1433. klub-sql lytter på 14330.\nEfter rettelsen viser /Medlemmer medlemmerne igen.",
        loesning: R`secrets.json (rettet):
{
  "ConnectionStrings:KlubContext": "Server=localhost,14330;Database=KlubWebDB;User Id=sa;Password=Klub2026Sql;TrustServerCertificate=True"
}

Mac/Terminal:
dotnet user-secrets set "ConnectionStrings:KlubContext" "Server=localhost,14330;Database=KlubWebDB;User Id=sa;Password=Klub2026Sql;TrustServerCertificate=True"`,
        ekstra: ["Slet i stedet hemmeligheden med `dotnet user-secrets remove \"ConnectionStrings:KlubContext\"` (Windows: tøm `secrets.json` til `{ }`), og kør igen. Hvilken fejl får du nu, og hvorfor? (Svar: `Login failed for user 'sa'` — nu bruges `appsettings.json`, som ingen adgangskode har.)", "Start `sql1` igen med den forkerte hemmelighed. Hvilken fejl får du nu, og hvorfor? (Svar, afprøvet: `Login failed for user 'sa'` — appen rammer den forkerte server, som har en anden adgangskode.)"] },

      { t: "opgave", h: "Klubben i en compose-fil", projekt: "KlubWeb", sprog: "text", fri: true,
        md: "Gør klubbens database til en del af projektet: en `compose.yaml` i `KlubWeb`-mappen, der starter SQL Server med en volume. Bagefter skal du vise, at data overlever, at containeren slettes.",
        krav: [
          "Stop og slet den gamle container: `docker stop klub-sql` og `docker rm klub-sql` (volumen `klubdata` må gerne blive)",
          "`compose.yaml` i KlubWeb-mappen har én service, `db`, med imaget `mcr.microsoft.com/mssql/server:2022-latest`, `container_name: klub-sql`, licens og adgangskode som miljøvariabler, porten `14330:1433` og volumen `klubweb:/var/opt/mssql`",
          "Volumen `klubweb` er erklæret nederst i filen",
          "`docker compose config -q` skriver ingenting, og `docker compose up -d` slutter med `Container klub-sql Started`",
          "Efter `dotnet ef database update` / `Update-Database` viser `/Medlemmer` siden uden fejl (tom liste — det er en ny volume)",
          "Opret et medlem, kør `docker compose down` og `docker compose up -d`, vent 30 sekunder, og genindlæs `/Medlemmer`: medlemmet er der stadig"
        ],
        tip: [
          "Tag `compose.yaml` fra lektion 6, og ret navn, port og volume.",
          "Porten står i anførselstegn som et punkt i en liste: `- \"14330:1433\"`. Brug kun mellemrum til indrykning.",
          "Får du `refers to undefined volume`, mangler den nederste `volumes:`-del med `klubweb:` under."
        ],
        output: " Volume klubweb_klubweb Created\n Network klubweb_default Created\n Container klub-sql Created\n Container klub-sql Started",
        loesning: R`services:
  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: klub-sql
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_SA_PASSWORD: "Klub2026Sql"
    ports:
      - "14330:1433"
    volumes:
      - klubweb:/var/opt/mssql

volumes:
  klubweb:`,
        ekstra: ["Brug `docker compose down -v`, og start igen. Hvad er der sket med medlemmerne — og hvorfor?", "Læg filen i Git, men skriv adgangskoden i en fil `.env` ved siden af (`MSSQL_SA_PASSWORD=…`) og `MSSQL_SA_PASSWORD: \"${MSSQL_SA_PASSWORD}\"` i `compose.yaml`. Find i Docker's dokumentation, hvordan `.env` virker, og læg `.env` i `.gitignore`."] }
    ] }
  ]
});
})();
