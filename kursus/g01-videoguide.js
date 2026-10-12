// Videoguide til modul 01–06: tidsstempler i lærerens optagelser.
(function () {
window.VIDEOGUIDE = window.VIDEOGUIDE || {};

window.VIDEOGUIDE["m01"] = [
  { video: "02_Tirsdag.mp4", punkter: [
    ["06:40", "Felter med typer: `int` og `double` starter som 0, en `string` uden værdi er `null` (hører til lektion 1)"],
    ["07:23", "`string?` eller `string.Empty`: sådan slipper du for advarslen om `null` i en tekstvariabel (lektion 3)"],
    ["45:15", "`string` og `int` er korte navne for .NET-typerne `String` og `Int32`"],
    ["115:58", "`var`: compileren finder selv typen (lektion 3)"],
    ["184:24", "Ugedagsprogram: brugeren skal skrive et tal fra 1 til 7 (lektion 4)"],
    ["186:24", "Fejl: *use of unassigned local variable* – en variabel skal have en værdi, før du bruger den"],
    ["186:50", "`Console.ReadLine()` giver altid tekst; `int.Parse` laver den om til et tal (lektion 4)"],
    ["190:41", "Faldgrube: brugeren skriver et bogstav, og `int.Parse` får programmet til at crashe"],
    ["191:40", "`int.TryParse` i stedet for `Parse`: programmet crasher ikke (lektion 4)"],
    ["193:16", "Kan teksten ikke laves om, giver `TryParse` tallet 0"],
    ["202:34", "Pause – han fortsætter 203:10"],
    ["203:28", "Sammenligning af `Parse`, `TryParse` og `Convert` (lektion 4)"],
    ["211:28", "`int.Parse` afprøvet med et rigtigt tal, forkert format, `null` og et for stort tal"],
    ["212:56", "Forkert format: programmet stopper med en fejl om tekstens format"],
    ["225:00", "`Convert.ToInt32`: giver 0 ved `null` i stedet for at crashe – men ikke ved forkert format"],
    ["229:27", "`TryParse` svarer `true`/`false` og lægger tallet i en `out`-variabel"],
    ["233:43", "Konklusion: `TryParse` er det sikreste valg til brugerinput"],
    ["234:28", "Hjemmeopgave: lommeregner i konsollen med plus, minus, gange og division (lektion 2)"]
  ] }
];

window.VIDEOGUIDE["m02"] = [
  { video: "02_Tirsdag.mp4", punkter: [
    ["27:54", "`if`/`else` i en hæve-metode: er saldoen stor nok? (hører til lektion 1)"],
    ["75:48", "`if`/`else` i en property: kun værdier på 0 eller derover bliver gemt"],
    ["172:25", "Nyt emne: løkker og betingelser"],
    ["174:47", "Første `for`-løkke: gentag, så længe `i` er mindre end grænsen (lektion 4)"],
    ["181:23", "Sådan virker `for`: startværdi, betingelse og `i++` (lektion 4)"],
    ["182:01", "Der findes flere slags løkker; `foreach` kommer i næste uge"],
    ["183:16", "`if`/`else` som betingede sætninger"],
    ["183:54", "`switch`: ugedagsprogram med `case 1` til `case 7` og `default` (lektion 2)"],
    ["186:06", "`case 1` betyder værdien 1 – ikke ’den første case’"],
    ["188:15", "Programmet stopper efter ét svar – derfor en `while`-løkke (lektion 3)"],
    ["188:22", "`while` tjekker betingelsen først; `do … while` kører mindst én gang"],
    ["190:24", "Test: 1 giver mandag, 5 giver fredag, 0 og 9 giver ’invalid’"],
    ["194:40", "Stopbetingelse: skriv 0 for at afslutte – løkken kører, så længe tallet ikke er 0"],
    ["196:15", "Faldgrube: 0 skriver både ’invalid’ og stopper – løses med `if`/`else` inde i løkken"],
    ["199:51", "Bogstaver bliver også til 0 og stopper programmet – brug en anden standardværdi, fx 9"],
    ["201:39", "Opsummering: `do`, `do … while`, `while` og `switch`"],
    ["201:52", "`switch` kunne også skrives som `if` / `else if` (lektion 2)"],
    ["202:05", "Husk `break` efter hver `case`"],
    ["202:34", "Pause – han fortsætter 203:10 (med `Parse` og exceptions, ikke løkker)"],
    ["234:28", "Hjemmeopgave: lommeregner, der bliver ved, til brugeren vælger at stoppe – samme mønster som miniprojektet i lektion 5"]
  ] }
];

window.VIDEOGUIDE["m03"] = [
  { video: "02_Tirsdag.mp4", punkter: [
    ["16:16", "Overloading: flere udgaver med samme navn, men forskellige parametre (hører til lektion 5)"],
    ["23:25", "Spørgsmål: hvad er forskellen på en parameter og et argument? (lektion 2)"],
    ["24:20", "Eksempel `Add(a, b)` med `return a + b`: `a` og `b` er parametre, 5 og 6 i kaldet er argumenter"],
    ["26:54", "`void`-metoder: indsæt og hæv på en bankkonto (lektion 1)"],
    ["99:47", "Lokale variabler findes kun inde i metodens `{ }`"],
    ["102:21", "Kan en metode give to værdier tilbage? (lektion 2)"],
    ["103:14", "`static`-metode med to parametre og `return a + b`"],
    ["103:44", "Faldgrube: kode efter `return` bliver aldrig kørt (*unreachable code*)"],
    ["105:46", "`return` kan kun give én værdi tilbage"],
    ["106:32", "Tuple som returtype: `(int, int)` pakker to værdier sammen"],
    ["154:35", "Frokostpause – han fortsætter 155:13"],
    ["175:28", "`static` repeteret: hvorfor metoderne i `Program` har `static` foran"],
    ["176:48", "`static`-metode med parameteren `int n`: løkken kører op til `n`"],
    ["179:10", "Fejl: der mangler et argument i kaldet"],
    ["179:21", "Fejl: en `static`-metode kan ikke kaldes via et objekt"],
    ["180:44", "Kald en `static`-metode med klassens navn foran"],
    ["182:01", "`foreach` nævnes – den kommer først næste uge (lektion 4)"],
    ["202:34", "Pause – han fortsætter 203:10"],
    ["226:23", "`Convert` og `Console` er statiske klasser: du kalder metoderne uden `new`"]
  ] }
];

window.VIDEOGUIDE["m04"] = [
  { video: "01_Mandag_Introduction.mp4", punkter: [
    ["57:18", "Hvad er et objekt? Holdet giver bud: bil, ordre, kat (hører til lektion 1)"],
    ["66:08", "Lærerens definition: et objekt er alt, der kan identificeres – han spørger om den igen senere"],
    ["67:05", "Et objekt har to slags information: tilstand og adfærd"],
    ["73:03", "Tilstand gemmes i variabler (felter, attributter); properties er lidt noget andet"],
    ["76:43", "Adfærd er metoder – du kender dem på parenteserne, fx `Walk()` (lektion 2)"],
    ["85:36", "Type og objekt: ’menneske’ er en type, Ole er et objekt (en instans)"],
    ["90:52", "I C# er typen typisk en klasse, og objekterne laves ud fra den"],
    ["93:07", "Pause – han fortsætter 93:53 med en opsummering"],
    ["94:59", "Første søjle i OOP: indkapsling = hold data `private` (lektion 4)"],
    ["119:04", "`static` forklaret med firmaets fælles printer: én til alle (lektion 5)"],
    ["137:11", "Fejl: et felt uden `static` kan ikke bruges inde i `static Main`"],
    ["167:02", "Sådan skriver du din egen klasse"],
    ["168:24", "Klassen `Customer` med felter og metoder"],
    ["169:01", "En klasse er en brugerdefineret type og en tegning (blueprint) af objektet (lektion 1)"],
    ["170:27", "`public` eller `private`: skriver du ingenting, er feltet `private`"],
    ["172:22", "En `CreateCustomer`-metode vist som dårlig idé – konstruktøren kommer næste dag (lektion 3)"],
    ["177:07", "Opret et objekt: `Customer c = new Customer();` – typen til venstre, objektet til højre"],
    ["179:56", "`private` felter kan ikke ses uden for klassen"],
    ["190:00", "Klassen i sin egen fil: højreklik på projektet → Add → Class (`Person.cs`)"],
    ["194:29", "`new Person()` og en `Info()`-metode, der skriver felterne ud"]
  ] },
  { video: "02_Tirsdag.mp4", punkter: [
    ["02:56", "Dagens emne: konstruktøren (hører til lektion 3)"],
    ["04:58", "Alle klasser har en konstruktør – også når du ikke kan se den"],
    ["10:39", "Noter: konstruktøren er en speciel metode med klassens navn og uden returtype, ikke engang `void`"],
    ["14:23", "Skriver du ingen konstruktør, laver compileren en tom standardkonstruktør uden parametre"],
    ["16:25", "Konstruktører kan overloades, når parametrene er forskellige"],
    ["20:07", "Faldgrube: skriver du din egen konstruktør, forsvinder den usynlige uden parametre"],
    ["26:54", "Adfærd: metoderne `Deposit` og `Withdraw` på kunden (lektion 2)"],
    ["41:28", "`override ToString()`: objektet skriver sine egne data ud (lektion 5)"],
    ["51:20", "Pause – han fortsætter 51:40"],
    ["53:31", "Klassen er en skabelon uden egne data – objektet er det, der findes (lektion 1)"],
    ["58:46", "Properties: dronningen (det private felt) og vagten (den offentlige property) (lektion 4)"],
    ["65:20", "Private felter er indkapsling; verden udenfor taler kun med vagten"],
    ["73:08", "`get` læser, `set` skriver – `value` er den værdi, der bliver tildelt"],
    ["75:48", "Kontrol i `set`: kun værdier på 0 eller derover – ellers en fejlbesked"],
    ["126:04", "`prop` + Tab giver den korte auto-property `{ get; set; }`"],
    ["126:49", "`init`: værdien kan kun sættes, når objektet oprettes"],
    ["154:35", "Frokostpause – han fortsætter 155:13"],
    ["161:09", "`this.AccountNumber = accountNumber`: `this` peger på objektets eget felt"],
    ["163:25", "Samme kode i to konstruktører er dårlig stil – lad den ene kalde den anden med `: this(...)` (lektion 3)"],
    ["168:20", "Debugging: breakpoint og F11 viser, i hvilken rækkefølge konstruktørerne kører"]
  ] }
];

window.VIDEOGUIDE["m05"] = [
  { video: "03_Ons_Inheritance.mp4", punkter: [
    ["00:16", "Dagens emne: arv (inheritance)"],
    ["03:50", "Arv: en basisklasse og en afledt klasse, der arver felter, properties og metoder (hører til lektion 1)"],
    ["11:59", "`class Far : Farfar` – kolon betyder arv"],
    ["14:21", "Alle klasser arver fra `System.Object`, og arv går kun nedad: `Farfar` kan ikke se `Far`s felter (lektion 5)"],
    ["17:32", "Kun én basisklasse i C# – `Person` kan ikke arve fra både `Far` og `Mor`"],
    ["19:59", "Arv i flere led: `Person` → `Far` → `Farfar` → `object`"],
    ["22:47", "Faldgrube: et `private` felt er *inaccessible due to its protection level*"],
    ["27:08", "`protected`: kun for ’familien’ – klassen selv og dem, der arver (lektion 2)"],
    ["28:48", "`internal`: synlig i hele projektet"],
    ["45:18", "Ekstra: `protected internal` og `private protected` (sidstnævnte ved 48:40)"],
    ["52:27", "Pause – han fortsætter 53:33"],
    ["63:55", "Value types og reference types, stack og heap, `struct` (hører til modul 7, lektion 4) – frem til 176:17"],
    ["176:17", "Pause – han fortsætter 176:45 med konstruktører i arv"],
    ["182:08", "`virtual`: basisklassen tillader, at `Eat()` bliver erstattet (lektion 3)"],
    ["184:54", "`public override void Eat()` – og `base.Eat()` kalder basisklassens udgave"],
    ["186:27", "Trappelys-eksemplet: ét tryk tænder hele vejen op – sådan kører alle konstruktørerne i arv"],
    ["189:45", "`Cat` er en `Animal` og en `LivingObject` (polymorfi, lektion 4)"],
    ["195:23", "`base(...)` vælger, hvilken konstruktør i basisklassen der bliver kaldt (lektion 2)"],
    ["199:25", "`this(...)` kalder en konstruktør i samme klasse, `base(...)` en i basisklassen"],
    ["203:39", "Opgave: hæveautomat med hæv, indsæt, saldo og PIN-kode"]
  ] }
];

window.VIDEOGUIDE["m06"] = [
  { video: "05_Fre_Collections_And_Data_Structures.mp4", punkter: [
    ["01:30", "Arrays repeteres: `int[]` med firkantede parenteser (fra modul 3)"],
    ["02:57", "Index starter ved 0; sidste index er længden minus 1"],
    ["04:29", "Array med fast størrelse og uden startværdier"],
    ["07:20", "`foreach` gennem en samling"],
    ["09:16", "`Array.Reverse` og `Array.Sort`"],
    ["13:37", "Egen klasse `Customer` og en samling af kunde-objekter (hører til lektion 2)"],
    ["21:28", "2D-array (matrix) med komma i `[ , ]` – bruges sjældent"],
    ["28:24", "Indlejret `for`-løkke med `GetLength(0)` og `GetLength(1)`"],
    ["31:25", "Jagged array: et array af arrays med forskellig længde"],
    ["45:35", "Pause"],
    ["46:21", "OBS: læreren siger, at timen om lister efter pausen ikke blev optaget – `List` (lektion 1–2) er ikke i videoen"],
    ["46:58", "Egen linked list: en `Node` med data og en henvisning til den næste, og et `head` (lektion 4)"],
    ["50:33", "`Add(index, data)`: sæt ind forrest, i midten eller sidst"],
    ["71:00", "Overloading: `Add(data)` uden index lægger noden sidst"],
    ["76:10", "`RemoveAt` – og bagefter `Clear`"],
    ["82:40", "`PrintList`: en `while`-løkke går fra node til node"],
    ["97:52", "Den indbyggede `LinkedList<int>` med `AddFirst`, `AddLast`, `AddAfter` og `AddBefore` (lektion 4)"],
    ["101:21", "Faldgrube: `AddAfter` skal have en node, ikke et index"],
    ["106:21", "Pause – han fortsætter 108:04 med filer og mapper (hører til modul 9, lektion 4)"],
    ["128:20", "Hjemmeopgaver: ulige tal, billetpris efter alder og en matrix lavet med kode"]
  ] }
];
})();
