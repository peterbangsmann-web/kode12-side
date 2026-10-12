// Videoguide til modul 08–12: tidsstempler i lærerens optagelser.
(function () {
window.VIDEOGUIDE = window.VIDEOGUIDE || {};

window.VIDEOGUIDE["m08"] = [
  { video: "07_Tirs_Performance.mp4", punkter: [
    ["04:23", "Metoder kører én efter én, så tiderne lægges sammen (hører til lektion 1)"],
    ["13:12", "Morgenmads-eksemplet: 21 minutter, når du venter ved hver maskine – 10 minutter, når du laver flere ting på én gang"],
    ["17:38", "Tråde er procesens ’medarbejdere’; der er altid en main thread"],
    ["19:17", "`new Thread(...)`: main thread kan sætte nye tråde i gang (lektion 2)"],
    ["24:20", "Pause – han fortsætter 24:50 direkte med `Task`; en demo med `Thread` bliver ikke vist"],
    ["26:08", "En `Task` er et lille stykke arbejde, som thread pool’en sørger for (lektion 3)"],
    ["30:17", "Faldgrube: tasks kører i baggrunden, så programmet lukker, før de er færdige"],
    ["31:17", "`Wait()` på en task svarer til `Join()` på en tråd: main venter"],
    ["34:08", "`Task.Run(...)`: den nemmeste måde at starte en task"],
    ["35:43", "`Task<int>`: en task med returværdi, som du læser med `.Result`"],
    ["39:16", "`ContinueWith`: arbejd videre med resultatet fra den forrige task"],
    ["47:14", "`Task.WaitAny` og `Task.WaitAll`"],
    ["53:33", "Spørgsmål: dør de andre tasks, når programmet lukker? Diskussion frem til ca. 71:46 – kan springes over"],
    ["86:46", "`async` og `await`: hold brugerfladen svarende, mens noget langsomt kører (lektion 4)"],
    ["94:06", "Uden async: brugerfladen svarer ikke i 12 sekunder"],
    ["96:54", "`await Task.Run(...)`: `Main` kan lave andet imens"],
    ["102:09", "Tråd-id viser, at den langsomme metode kører på en anden tråd (8) end main (2)"],
    ["104:46", "`async Task<string>`: hent JSON fra et API (Star Wars API) med `HttpClient`"],
    ["114:59", "Faldgrube: `.Result` blokerer – så venter main alligevel"],
    ["118:10", "Pause – efter pausen kommer LINQ (modul 9)"]
  ] }
];

window.VIDEOGUIDE["m09"] = [
  { video: "07_Tirs_Performance.mp4", punkter: [
    ["118:13", "Efter pausen: LINQ"],
    ["120:46", "SQL som sammenligning: `SELECT Name, City FROM Customers`"],
    ["126:32", "En LINQ-forespørgsel starter med `from` – den rækkefølge bruger databasen også"],
    ["127:14", "LINQ er en del af C#; SQL i C# er bare en tekststreng"],
    ["128:09", "LINQ virker på arrays, lister, XML, JSON og databaser"],
    ["130:27", "Query syntax: `from v in a where … orderby … select v` (hører til lektion 3)"],
    ["131:47", "`orderby` sorterer resultatet"],
    ["134:31", "Faldgrube: resultatet er en `IEnumerable<int>`, ikke én `int`"],
    ["134:47", "`IEnumerable` betyder en samling, du kan løbe igennem med `foreach`"],
    ["138:03", "`First()` og `FirstOrDefault()` henter ét element (lektion 2)"],
    ["140:30", "Samme forespørgsel som method syntax med lambda: `FirstOrDefault(x => …)` (lektion 1)"],
    ["142:26", "LINQ på XML og JSON"],
    ["146:05", "`XElement.Load` læser en XML-fil med medarbejdere"],
    ["148:50", "Faldgrube: filen findes ikke – sæt *Copy to Output Directory* på filen (lektion 4)"],
    ["152:17", "JSON: klassen `Person` og en JSON-tekst (lektion 5)"],
    ["158:47", "`JsonConvert.DeserializeObject<List<Person>>` laver JSON om til objekter"],
    ["160:54", "NuGet-pakken Newtonsoft.Json skal installeres først"],
    ["163:50", "En kursist foreslår Microsofts egen JSON-pakke i stedet, så du ikke er afhængig af en ekstern pakke"],
    ["164:37", "Method syntax: `Where(p => …)`, `Select(p => p.Name)` og `ToList()`"]
  ] },
  { video: "08_Ons_Parallel+Thread_synch+delegates.mp4", punkter: [
    ["00:09", "Dagens emner: parallel programmering, trådsynkronisering og delegates"],
    ["02:35", "Parallel programmering: del én stor opgave ud på flere tråde (hører til lektion 6)"],
    ["05:38", "En stor `for`-løkke kan deles mellem computerens kerner"],
    ["17:31", "`Parallel.For`: startværdien er med, slutværdien er ikke"],
    ["21:48", "Ni tråde deler løkken – derfor kommer tallene i blandet rækkefølge"],
    ["23:07", "`Parallel.ForEach`"],
    ["27:13", "Med en pause i hver gentagelse: 22 sekunder i en almindelig løkke mod 3 sekunder parallelt"],
    ["31:08", "Uden pause er den almindelige løkke hurtigst"],
    ["34:11", "Forklaringen: det tager tid at fordele arbejdet, så parallel betaler sig kun ved store mængder"],
    ["39:48", "Små opgaver: brug `Task` (thread pool) frem for `new Thread`"],
    ["40:54", "PLINQ: `.AsParallel()` på en LINQ-forespørgsel"],
    ["42:35", "`AsOrdered()` bevarer rækkefølgen, men gør forespørgslen langsommere"],
    ["45:19", "Pause – han fortsætter 45:42 med trådsynkronisering"],
    ["46:26", "Flere tråde læser og skriver den samme variabel (også modul 8, lektion 5)"],
    ["49:07", "Race condition: to tråde læser 0 samtidig, begge skriver 1 – en optælling forsvinder"],
    ["69:03", "`lock`: kun én tråd ad gangen i kodeblokken"],
    ["79:34", "Uden `lock` blandes jobbene; med `lock` (80:09) kommer de i pæn rækkefølge"],
    ["82:58", "`Monitor.Enter`/`Exit` – læg `Exit` i `finally`, ellers kan programmet hænge"],
    ["90:31", "Ekstra stof: `ManualResetEvent`, `AutoResetEvent` (111:01), `Mutex` (126:45) og `Semaphore` (132:43)"],
    ["147:29", "Slut med tråde – herfra handler det om delegates (modul 10)"]
  ] }
];

window.VIDEOGUIDE["m10"] = [
  { video: "08_Ons_Parallel+Thread_synch+delegates.mp4", punkter: [
    ["147:36", "Nyt emne: delegates (hører til lektion 1)"],
    ["151:27", "En delegate peger på metoder og kan køre flere metoder med ét kald (multicast, lektion 3)"],
    ["152:30", "Krav: metoderne skal have samme returtype og samme parametre som delegaten"],
    ["152:49", "Delegates holder ændringer i forretningslogik uden for den oprindelige kode (SOLID)"],
    ["159:22", "Erklær en delegate: returtype, navn og parametre – men ingen krop"],
    ["163:15", "`new DelegateTest(Show)`: giv metodens navn, ikke en tekst"],
    ["166:14", "Kort form: `DelegateTest dd = Show;`"],
    ["166:43", "`+=` lægger flere metoder på delegaten; `-=` fjerner en igen (168:20)"],
    ["173:41", "Delegate med returværdi: `int` ind og `int` ud – metoderne `Square` og `Cube`"],
    ["181:00", "Faldgrube: med flere metoder på delegaten får du kun den sidstes returværdi"],
    ["189:26", "Pause – han fortsætter 189:56"],
    ["191:12", "Anonym metode: `delegate (int x) { return x * x; }`"],
    ["194:36", "Lambda: `x => x * x` er en kortere anonym metode (lektion 2)"],
    ["196:40", "Eksempel: `Medarbejder` og lønforhøjelse – logikken skal ud af klassen"],
    ["212:13", "Måde 1: ret logikken inde i klassen – frarådes"],
    ["216:57", "Måde 2: en delegate, der tager en `Medarbejder` og svarer `bool`, sendes med som parameter"],
    ["221:43", "Metoden spørger delegaten for hver medarbejder: `if (deli(m))`"],
    ["224:48", "Måde 3: lambda – den anbefalede"],
    ["227:07", "Kortest: delegaten sættes direkte til en lambda som `m => m.Erfaring > 5`"],
    ["229:37", "Opsummering: åben for udvidelse, lukket for ændring"]
  ] }
];

window.VIDEOGUIDE["m12"] = [
  { video: "09_Tors_Backend.mp4", punkter: [
    ["00:28", "Først indbyggede delegates `Func`, `Action` og `Predicate` (hører til modul 10, lektion 2) – SQL starter 46:01"],
    ["46:01", "Installation af SQL Server Developer (gratis) og bagefter SQL Server Management Studio (hører til lektion 1)"],
    ["50:52", "Pause og installation – han fortsætter 53:02"],
    ["53:44", "`CREATE DATABASE` i et New Query-vindue"],
    ["55:20", "Faldgrube: den nye database vises først, når du klikker Refresh (F5)"],
    ["56:42", "`CREATE TABLE Customers`"],
    ["57:36", "Kolonnenavn før datatype (modsat C#); `Id` med `PRIMARY KEY` og `IDENTITY`, der tæller selv"],
    ["59:01", "`NOT NULL`: kolonnen må ikke være tom (lektion 3)"],
    ["60:39", "Faldgrube: tabellen havnede i den forkerte database – vælg databasen i rullelisten, og rør ikke `master`"],
    ["68:25", "Databasedesign: én stor Excel-agtig tabel giver dubletter (lektion 6)"],
    ["72:48", "Normalisering; 1. normalform: kun én værdi i hver celle"],
    ["78:04", "Primærnøgle og fremmednøgle binder tabellerne sammen (lektion 4)"],
    ["81:56", "Tabellen `Orders`: `FOREIGN KEY REFERENCES Customers(Id)`"],
    ["99:20", "`INSERT INTO dbo.Customers (…) VALUES (…)` (lektion 2)"],
    ["104:37", "`SELECT * FROM dbo.Customers`"],
    ["120:21", "Pause – han fortsætter 120:52 med JOIN"],
    ["121:44", "Faldgrube: `Id` og `Name` findes i flere tabeller – skriv tabelnavnet foran (lektion 4)"],
    ["124:28", "`FROM Orders JOIN Customers ON …` – og samme for produkter og medarbejdere"],
    ["128:44", "Kortere navne (aliaser) til tabellerne, og ved 131:24 til kolonnerne"],
    ["134:24", "Opgave: en database med afdelinger og medarbejdere forbundet med en fremmednøgle"]
  ] }
];
})();
