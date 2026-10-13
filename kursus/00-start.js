// Modul 0 — Kom i gang. Forudsætter ingenting.
(function () {
const R = String.raw;

window.KURSUS.push({
  id: "m00", nr: 0, del: "Kom i gang", ikon: "🚀",
  titel: "Start her: dit første program",
  dag: "Før kursusdag 1",
  intro: "Her starter du helt fra nul. Du lærer, hvordan siden virker, laver dit første program og lærer at læse en fejl uden at gå i panik.\n\nDu behøver ikke kunne noget i forvejen.",
  lektioner: [

  // ------------------------------------------------------------------
  { id: "m00l1", titel: "Sådan virker Kode12", min: 5,
    ord: [
      ["Trin", "Én lille bid af en lektion. Du klarer ét trin ad gangen."],
      ["Repetition", "Opgaver, du har lavet før, kommer igen efter nogle dage. Det er det, der får stoffet til at blive siddende."]
    ],
    trin: [
      { t: "laes", h: "Velkommen",
        md: "Målet er enkelt: **du skal kunne bygge dit eget eksamensprojekt og forklare det**.\n\nDu kommer derhen i små trin. Hvert trin tager et til to minutter:\n\n- Først får du **én ting forklaret**.\n- Så skal **du gøre noget** med det: svare, gætte hvad koden skriver, eller skrive koden selv.\n- Du får **svar med det samme**.\n\nDu kan ikke ødelægge noget. Forkerte svar er en del af træningen." },
      { t: "laes", h: "Hvorfor skal jeg skrive og gætte hele tiden?",
        md: "Fordi det er sådan, man lærer at programmere. Forskning i undervisning for begyndere peger på de samme fire ting igen og igen:\n\n- **Forudsig, før du kører.** Når du gætter, hvad koden gør, opdager du, hvad du ikke har forstået.\n- **Skriv koden selv.** Fingrene skal lære det. At læse kode er ikke nok.\n- **Gentag med mellemrum.** Det, du blev spurgt om i går og igen om tre dage, husker du til eksamen.\n- **Forklar med egne ord.** Eksamen er mundtlig. Kan du sige det højt, kan du det.\n\nDerfor er der næsten ingen lange tekster her — men mange små opgaver." },
      { t: "valg", q: "Hvad lærer du mest af?",
        svar: ["At skrive koden selv og se, hvad der sker", "At se en video én gang", "At kopiere færdig kode ind", "At læse hele lærebogen først"],
        ret: 0, fordi: "Ja. Videoer og tekst er gode til at få overblik, men det er først, når du selv skriver og selv retter fejl, at det sætter sig fast." },
      { t: "laes", h: "Windows eller Mac?",
        md: "Øverst til højre er der en knap, hvor du vælger computer. Lige nu står den på: **{{Windows med Visual Studio||Mac med Rider}}**.\n\nC#-koden er helt den samme på begge. Det eneste, der er forskelligt, er programmet, du skriver koden i:\n\n- På **Windows** bruger du **Visual Studio**.\n- På **Mac** bruger du **Rider**.\n\nNår en vejledning handler om knapper og menuer, viser siden automatisk den rigtige udgave. Du kan skifte når som helst.",
        md2: "Mac-vejledningerne er skrevet ud fra producentens (JetBrains') dokumentation. En knap kan hedde lidt forskelligt fra version til version." },
      { t: "laes", h: "Resten af siden",
        md: "- **Kursus** — alle moduler i den rækkefølge, du skal tage dem.\n- **Repetition** — opgaver, der er klar til at blive gentaget. Start hver dag her.\n- **Ordbog** — alle fagord, forklaret kort.\n- **Indstillinger** — skift farve, lys/mørk og skriftstørrelse. Der er også en meget stor skrift, hvis I ser med på et tv.\n\nI opgaver med et tekstfelt kan du trykke **Ctrl + Enter** ({{på Windows||på Mac: ⌘ + Enter}}) i stedet for at klikke på knappen." },
      { t: "laes", h: "En god studiedag",
        md: "1. **Repetition først** (5–10 minutter). Det varmer hjernen op.\n2. **Nye lektioner** — to til fire ad gangen. Hold en kort pause mellem hver.\n3. **Skriv rigtig kode** i {{Visual Studio||Rider}}, når lektionen beder dig om det. Spring det ikke over.\n4. Se **lærerens video** til dagen bagefter, hvis du har tid. Så genkender du det hele.\n\nHellere en time hver dag end syv timer om søndagen." }
    ] },

  // ------------------------------------------------------------------
  { id: "m00l2", titel: "Dit første program", min: 15,
    ord: [
      ["Program", "En liste af ordrer, som computeren udfører oppefra og ned, én ad gangen."],
      ["C#", "Programmeringssproget, du lærer. Udtales \"C sharp\"."],
      [".NET", "Det \"maskinrum\", der kører C#-programmer. Udtales \"dot net\". Skal være installeret på computeren."],
      ["IDE", "Programmet, du skriver kode i: Visual Studio på Windows, Rider på Mac. Det oversætter og kører også koden."],
      ["Console.WriteLine", "Ordren, der skriver en linje tekst i det sorte vindue (konsollen) og skifter linje bagefter."],
      ["Console.Write", "Skriver tekst i konsollen uden at skifte linje bagefter."],
      ["Streng (string)", "Et stykke tekst. Skrives i \"dobbelte anførselstegn\"."],
      ["Statement (sætning)", "Én ordre til computeren. Slutter med semikolon ;"],
      ["Konsol", "Det sorte vindue, hvor programmet skriver tekst og du kan taste svar."]
    ],
    trin: [
      { t: "laes", h: "Hvad er et program?",
        md: "Et program er en **liste af ordrer** til computeren. Computeren udfører dem **oppefra og ned, én ad gangen** — præcis som en opskrift.\n\nTre ord, du møder hele tiden:\n\n- **C#** er sproget, du skriver ordrerne i.\n- **{{Visual Studio||Rider}}** er programmet, du skriver i. Sådan et program kaldes en **IDE**.\n- **.NET** er maskinrummet, der kører det, du har skrevet." },
      { t: "valg", q: "Hvad er {{Visual Studio||Rider}}?",
        svar: ["Programmet, jeg skriver og kører min kode i", "Et programmeringssprog", "En database", "En hjemmeside"],
        ret: 0, fordi: "Ja. Sproget hedder C#. {{Visual Studio||Rider}} er værktøjet — ligesom Word er værktøjet, og dansk er sproget." },
      { t: "ide", h: "Opret dit første projekt",
        md: "Nu laver du et rigtigt projekt. Et **projekt** er en mappe med din kode og nogle indstillinger. Du skal gøre det her mange gange, så tag det roligt første gang.",
        win: [
          "Åbn **Visual Studio**.",
          "Klik på **Create a new project**.",
          "Skriv `console` i søgefeltet. Vælg **Console App** — den, hvor der står **C#** under navnet (ikke Visual Basic, og ikke den, der hedder .NET Framework).",
          "Klik **Next**. Skriv `MitFoersteProgram` i **Project name**. Klik **Next**.",
          "Lad **Framework** stå på den nyeste .NET. Klik **Create**.",
          "Du ser nu filen **Program.cs**. Den har én linje kode, `Console.WriteLine(\"Hello, World!\");`, og over den en linje, der starter med `//` (den er kun en note og forklares i lektion 3). Tryk **Ctrl + F5** (eller klik på den hule grønne pil ▷ øverst).",
          "Et sort vindue åbner og skriver `Hello, World!`. Tryk på en tast for at lukke det."
        ],
        mac: [
          "Åbn **Rider**. Første gang spørger Rider om tastaturgenveje — vælg bare standardvalget.",
          "Klik på **New Solution** på velkomstskærmen.",
          "Vælg **Console** (i nogle versioner hedder den **Console Application**) i listen til venstre.",
          "Skriv `MitFoersteProgram` i **Solution name**. Sproget skal være **C#**.",
          "Mangler der en .NET SDK, tilbyder Rider selv at hente den — sig ja. Klik **Create**.",
          "Du ser nu filen **Program.cs**. Den har én linje kode, `Console.WriteLine(\"Hello, World!\");`, og over den en linje, der starter med `//` (den er kun en note og forklares i lektion 3). Klik på den **grønne pil ▶** øverst til højre.",
          "Nederst åbner vinduet **Run** og skriver `Hello, World!`."
        ],
        output: "Hello, World!",
        md2: "Virker det? Så har du lige oversat og kørt dit første C#-program. Resten er at lære, hvad man kan skrive i den fil." },
      { t: "laes", h: "Linjen, der skriver på skærmen",
        md: "Den vigtigste ordre i begyndelsen er den, der **skriver tekst på skærmen**:",
        kode: R`Console.WriteLine("Hej verden!");`,
        noter: [
          ["Console", "Det sorte vindue. Stort C."],
          [".WriteLine", "\"Skriv en linje\" — og skift linje bagefter. Stort W og stort L."],
          ["( )", "I parentesen står det, der skal skrives."],
          ["\"Hej verden!\"", "Teksten. Tekst står altid i dobbelte anførselstegn."],
          [";", "Semikolon afslutter ordren — som et punktum."]
        ],
        output: "Hej verden!" },
      { t: "forudsig",
        kode: R`Console.WriteLine("Goddag");
Console.WriteLine("Jeg hedder Peter");`,
        output: "Goddag\nJeg hedder Peter",
        fordi: "To ordrer, udført oppefra og ned. Hver `WriteLine` slutter med et linjeskift, så de to tekster står på hver sin linje. Anførselstegnene bliver ikke skrevet ud — de viser kun, hvor teksten starter og slutter." },
      { t: "udfyld", q: "Udfyld det, der mangler, så programmet skriver `Hej`.",
        kode: R`Console.[[WriteLine|Write]]("Hej")[[;]]`,
        output: "Hej",
        fordi: "`WriteLine` med stort W og stort L — og et semikolon til sidst." },
      { t: "skriv", q: "Skriv én linje kode, der skriver teksten `Jeg kan kode!` på skærmen.",
        tjek: [
          ["Console.WriteLine(", "Brug `Console.WriteLine(` — pas på store og små bogstaver"],
          ['"Jeg kan kode!"', "Teksten skal stå i anførselstegn, præcis som i opgaven: `\"Jeg kan kode!\"`"],
          [/\);$/, "Slut med `);` — parentes og semikolon"]
        ],
        forkert: ['console.writeline("Jeg kan kode!");', 'Console.WriteLine("Jeg kan kode!")', "Console.WriteLine(Jeg kan kode!);"],
        loesning: R`Console.WriteLine("Jeg kan kode!");`,
        output: "Jeg kan kode!" },
      { t: "laes", h: "Write og WriteLine",
        md: "Der findes to næsten ens ordrer:\n\n- `Console.WriteLine(...)` skriver teksten **og skifter linje**.\n- `Console.Write(...)` skriver teksten og **bliver på linjen**.",
        kode: R`Console.Write("A");
Console.Write("B");
Console.WriteLine("C");
Console.WriteLine("D");`,
        output: "ABC\nD",
        md2: "A, B og C havner på samme linje, fordi de to første ikke skifter linje. Først efter C skiftes der linje." },
      { t: "forudsig",
        kode: R`Console.Write("Kaffe ");
Console.WriteLine("og kage");
Console.WriteLine("Tak!");`,
        output: "Kaffe og kage\nTak!",
        fordi: "`Write` bliver på linjen, så `og kage` kommer lige efter `Kaffe `. Læg mærke til mellemrummet efter Kaffe — det står inde i anførselstegnene, og computeren skriver præcis det, der står." },
      { t: "orden", q: "Programmet skal skrive `1`, `2`, `3` på tre linjer. Sæt linjerne i rækkefølge.",
        linjer: [R`Console.WriteLine("1");`, R`Console.WriteLine("2");`, R`Console.WriteLine("3");`],
        output: "1\n2\n3",
        fordi: "Computeren udfører linjerne oppefra og ned. Rækkefølgen i filen er rækkefølgen på skærmen." },
      { t: "ide", h: "Nu i {{Visual Studio||Rider}}",
        md: "Åbn dit projekt `MitFoersteProgram`. Slet det, der står i **Program.cs**, og skriv tre linjer, der fortæller noget om dig. **Skriv dem selv** — kopiér ikke.",
        kode: R`Console.WriteLine("Jeg hedder Peter");
Console.WriteLine("Jeg lærer C#");
Console.WriteLine("Om tre uger afleverer jeg mit projekt");`,
        win: ["Kør programmet med **Ctrl + F5**.", "Ret teksterne til noget andet, og kør igen."],
        mac: ["Kør programmet med den **grønne pil ▶** øverst til højre.", "Ret teksterne til noget andet, og kør igen."],
        output: "Jeg hedder Peter\nJeg lærer C#\nOm tre uger afleverer jeg mit projekt" }
    ] },

  // ------------------------------------------------------------------
  { id: "m00l3", titel: "Røde streger: fejl er helt normale", min: 12,
    ord: [
      ["Compiler", "Oversætteren, der laver din C#-kode om til noget, computeren kan køre. Den nægter at oversætte, hvis der er en syntaksfejl."],
      ["Syntaksfejl", "En fejl i måden, koden er skrevet på — fx et glemt semikolon. Vises som en rød bølgestreg."],
      ["Case-sensitive", "Der er forskel på store og små bogstaver. `Console` og `console` er to forskellige ting."],
      ["Kommentar", "Tekst i koden, som computeren springer over. Starter med //"],
      ["Error List / Problems", "Vinduet, der viser alle fejl med linjenummer. Hedder Error List i Visual Studio og Problems i Rider."]
    ],
    trin: [
      { t: "laes", h: "Computeren er pernittengryn",
        md: "Før dit program kan køre, bliver det **oversat** af en **compiler**. Compileren er en meget streng oversætter: mangler der ét tegn, nægter den at oversætte, og du får en **rød bølgestreg** under koden.\n\nDet sker for alle, hele tiden — også for folk, der har programmeret i 20 år. Det er ikke dig, der er dum. Det er compileren, der er pernittengryn.\n\nNæsten alle begynderfejl er én af disse tre:\n\n- Et glemt **semikolon** `;`\n- Forkert **stort eller lille bogstav**\n- Et **anførselstegn eller en parentes**, der ikke bliver lukket" },
      { t: "fejl",
        kode: R`Console.WriteLine("Første linje");
Console.WriteLine("Anden linje")
Console.WriteLine("Tredje linje");`,
        linje: 2,
        fordi: "Linje 2 mangler semikolon til sidst. Compileren siger `; expected` — \"jeg forventede et semikolon\".",
        rettet: R`Console.WriteLine("Første linje");
Console.WriteLine("Anden linje");
Console.WriteLine("Tredje linje");` },
      { t: "fejl",
        kode: R`Console.WriteLine("Hej");
console.WriteLine("med");
Console.WriteLine("dig");`,
        linje: 2,
        fordi: "`console` er skrevet med lille c. C# skelner mellem store og små bogstaver — det hedder **case-sensitive**. `Console` findes. `console` findes ikke.",
        rettet: R`Console.WriteLine("Hej");
Console.WriteLine("med");
Console.WriteLine("dig");` },
      { t: "fejl",
        kode: R`Console.WriteLine("Mandag");
Console.WriteLine("Tirsdag");
Console.WriteLine("Onsdag);`,
        linje: 3,
        fordi: "Teksten starter med `\"`, men bliver aldrig lukket igen. Så tror compileren, at resten af linjen — også `);` — er tekst.",
        rettet: R`Console.WriteLine("Mandag");
Console.WriteLine("Tirsdag");
Console.WriteLine("Onsdag");` },
      { t: "laes", h: "Sådan læser du en fejl",
        md: "Når der er røde streger, så gør altid det samme:\n\n1. Find listen med fejl: {{vinduet **Error List** nederst (findes også i menuen View → Error List)||vinduet **Problems** nederst}}.\n2. Læs **den øverste fejl først**. Én fejl giver tit mange følgefejl.\n3. Se på **linjenummeret**, og dobbeltklik på fejlen. Så hopper markøren derhen.\n4. Fejlen er tit **lige før** det sted, stregen står — et glemt semikolon opdages først, når næste linje begynder.\n\nHver fejl har en kode, der starter med **CS**. De to, du møder mest:",
        noter: [
          ["CS1002", "`; expected` — der mangler et semikolon."],
          ["CS0103", "`The name '...' does not exist in the current context` — du har brugt et navn, som ikke findes. Næsten altid en stavefejl eller forkert stort/lille bogstav."]
        ] },
      { t: "valg", q: "Compileren skriver: `CS1002: ; expected`. Hvad er der galt?",
        svar: ["Der mangler et semikolon", "Der er et semikolon for meget", "Et ord er stavet forkert", "Programmet er for langt"],
        ret: 0, fordi: "\"Expected\" betyder \"forventet\". Compileren forventede et semikolon og fik det ikke." },
      { t: "valg", q: "Compileren skriver: `CS0103: The name 'Consol' does not exist in the current context`. Hvad gør du?",
        svar: ["Retter stavefejlen: det skal være `Console`", "Sætter et semikolon ind", "Lukker programmet og starter forfra", "Sætter ordet i anførselstegn"],
        ret: 0, fordi: "\"Navnet findes ikke\" er næsten altid en stavefejl. Her mangler der et e: `Console`." },
      { t: "skriv", q: "Denne linje har **to** fejl. Skriv den rigtigt:\n\n`console.WriteLine(\"Farvel\")`",
        tjek: [
          ["Console.WriteLine(", "`Console` skal have stort C"],
          ['"Farvel"', "Teksten `\"Farvel\"` skal med"],
          [/\);$/, "Linjen skal slutte med semikolon"]
        ],
        forkert: ['console.WriteLine("Farvel");', 'Console.WriteLine("Farvel")'],
        loesning: R`Console.WriteLine("Farvel");`,
        output: "Farvel" },
      { t: "laes", h: "Kommentarer: noter til dig selv",
        md: "Alt, der står efter `//` på en linje, **springer computeren over**. Det kaldes en **kommentar**. Brug det til at skrive noter på almindeligt dansk.",
        kode: R`// Det her er en kommentar. Computeren ser den ikke.
Console.WriteLine("A");   // man kan også skrive den efter koden
// Console.WriteLine("B");
Console.WriteLine("C");`,
        output: "A\nC",
        md2: "Linjen med B bliver ikke udført, fordi den står bag `//`. Det bruger man tit til at slå en linje fra et øjeblik — det hedder at **kommentere ud**." },
      { t: "forudsig",
        kode: R`Console.WriteLine("1");
// Console.WriteLine("2");
Console.WriteLine("3"); // Console.WriteLine("4");`,
        output: "1\n3",
        fordi: "Linje 2 er kommenteret ud. På linje 3 er det kun den første del, der er kode — alt efter `//` er en kommentar." },
      { t: "ide", h: "Lav en fejl med vilje",
        md: "Den bedste måde at holde op med at være bange for fejl er at lave dem selv. Åbn dit projekt, og gør det her, én ting ad gangen:",
        win: [
          "Slet et semikolon. Se den røde streg. Åbn **Error List** (View → Error List), og læs fejlen. Sæt semikolonet tilbage.",
          "Ret `Console` til `console`. Læs fejlen. Ret den tilbage.",
          "Slet et afsluttende anførselstegn. Læs fejlen. Ret den tilbage.",
          "Prøv at køre programmet med **Ctrl + F5**, mens der er en fejl. Visual Studio spørger, om du vil køre den sidste udgave, der virkede — svar **No**."
        ],
        mac: [
          "Slet et semikolon. Se den røde streg. Åbn vinduet **Problems** nederst, og læs fejlen. Sæt semikolonet tilbage.",
          "Ret `Console` til `console`. Læs fejlen. Ret den tilbage.",
          "Slet et afsluttende anførselstegn. Læs fejlen. Ret den tilbage.",
          "Prøv at køre programmet med den grønne pil, mens der er en fejl. Rider viser fejlen i vinduet **Build** i stedet for at køre."
        ] }
    ] },

  // ------------------------------------------------------------------
  { id: "m00l4", titel: "Programmets skelet: Main og klammer", min: 12,
    ord: [
      ["Main", "Metoden, hvor programmet starter. Computeren begynder altid på første linje i Main."],
      ["Metode", "En navngiven klump kode, der udfører en opgave. `Main` og `WriteLine` er metoder."],
      ["Klasse (class)", "En kasse, som kode bor i. Al C#-kode skal ligge i en klasse. (Meget mere om klasser i modul 4.)"],
      ["Namespace", "Et \"efternavn\" til din kode, så ting med samme navn ikke bliver blandet sammen. Normalt det samme som projektets navn."],
      ["Kodeblok", "Koden mellem en { og den } der hører til. Viser, hvad der hører sammen."],
      ["using", "En linje øverst i filen, der siger, hvilke dele af .NET du vil bruge uden at skrive det lange navn."],
      ["Top-level statements", "Den korte skrivemåde, hvor man skriver ordrerne direkte i Program.cs uden class og Main udenom."]
    ],
    trin: [
      { t: "laes", h: "To måder at skrive det samme program på",
        md: "Indtil nu har du skrevet ordrerne direkte i filen. Det er den **korte** måde:",
        kode: R`Console.WriteLine("Hej");`,
        md2: "Men i lærerens videoer og i de fleste eksempler ser du den **lange** måde, hvor ordrerne er pakket ind i et **skelet**. Det er præcis det samme program — computeren laver selv skelettet for dig, når du bruger den korte måde.\n\nDu skal kunne læse begge. I resten af kurset bruger vi mest den korte måde til små øvelser og skelettet, når programmerne bliver større." },
      { t: "laes", h: "Skelettet, linje for linje",
        kode: R`namespace MitFoersteProgram
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hej");
        }
    }
}`,
        noter: [
          ["namespace MitFoersteProgram", "Kodens \"efternavn\". Normalt projektets navn."],
          ["class Program", "En klasse — en kasse, som koden bor i."],
          ["static void Main(string[] args)", "Metoden Main. **Her starter programmet.** Lær linjen udenad som én klump — ordene forklares senere."],
          ["{ }", "Krøllede klammer (tuborgklammer) viser, hvad der hører sammen. Hver `{` skal have en `}`."],
          ["Console.WriteLine(\"Hej\");", "Dine ordrer står inde i Main."]
        ],
        output: "Hej",
        md2: "Tre kasser inden i hinanden: **namespace** yderst, **class** i midten, **Main** inderst. Koden rykkes ind, hver gang en klamme åbner, så man kan se, hvad der ligger i hvad." },
      { t: "valg", q: "Hvor begynder computeren at udføre et C#-program?",
        svar: ["På første linje inde i `Main`", "På første linje i filen, uanset hvad der står", "I `namespace`", "Der, hvor markøren står"],
        ret: 0, fordi: "`Main` er startstedet. Namespace og class er bare kasserne udenom." },
      { t: "orden", q: "Byg skelettet. Sæt linjerne i rækkefølge.",
        linjer: ["class Program", "{", "    static void Main(string[] args)", "    {", R`        Console.WriteLine("Hej");`, "    }", "}"],
        output: "Hej",
        fordi: "Først klassen, så en klamme, så Main, så en klamme, så ordrerne — og til sidst lukkes begge klammer igen. (Namespace-linjen er udeladt her. Den er ikke nødvendig.)" },
      { t: "udfyld", q: "Udfyld linjen, der starter programmet.",
        kode: R`class Program
{
    static void [[Main]](string[] args)
    {
        Console.WriteLine("Start");
    [[}]]
}`,
        output: "Start",
        fordi: "`Main` med stort M. Og klammen, der åbnede Main, skal lukkes igen." },
      { t: "fejl",
        kode: R`class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hej");
    {
}`,
        linje: 6,
        fordi: "Linje 6 åbner en ny blok med `{`. Der skulle stå `}`, som lukker `Main`. Nu er der tre `{` og kun én `}`. Compileren siger `} expected`. Den opdager det først helt til sidst, for den bliver ved med at vente på de klammer, der mangler. Tæl klammerne: der skal være lige mange `{` og `}`.",
        rettet: R`class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hej");
    }
}` },
      { t: "laes", h: "Hvad med using?",
        md: "I ældre eksempler og i nogle af lærerens filer står der en linje som denne øverst:",
        kode: R`using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hej");
    }
}`,
        output: "Hej",
        md2: "`Console` bor i en del af .NET, der hedder `System`. Linjen `using System;` betyder: \"jeg vil bruge tingene fra System uden at skrive det lange navn `System.Console`\".\n\nI nye projekter er de mest brugte `using`-linjer **slået til automatisk**, så du behøver ikke skrive dem. Står linjen der, gør det ingen skade." },
      { t: "forudsig",
        kode: R`class Program
{
    static void Main(string[] args)
    {
        Console.Write("Program");
        Console.WriteLine("met kører");
        // Console.WriteLine("Slut");
    }
}`,
        output: "Programmet kører",
        fordi: "`Write` skifter ikke linje, så de to tekster bliver til ét ord. Den sidste linje er en kommentar og bliver ikke udført." },
      { t: "ide", h: "Skriv skelettet selv",
        md: "Åbn **Program.cs** i dit projekt. Slet alt, og skriv hele skelettet nedenfor **uden at kopiere**. Læg mærke til, at {{Visual Studio||Rider}} selv sætter den lukkende klamme, når du skriver en åben.",
        kode: R`namespace MitFoersteProgram
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Nu med skelet");
        }
    }
}`,
        win: ["Kør med **Ctrl + F5**.", "Tip: Når du opretter et nyt projekt, kan du sætte flueben i **Do not use top-level statements**. Så laver Visual Studio skelettet for dig.", "Tip: Skriv `cw` og tryk **Tab** to gange — så skriver Visual Studio `Console.WriteLine();` for dig."],
        mac: ["Kør med den **grønne pil ▶**.", "Læg mærke til, at Rider foreslår resten af ordet, mens du skriver. Tryk **Enter** eller **Tab** for at tage forslaget."],
        output: "Nu med skelet" },
      { t: "forklar", q: "Forklar med dine egne ord: Hvad sker der, fra du trykker Kør, til teksten står på skærmen?",
        svar: "Først **oversætter compileren** min C#-kode. Er der en syntaksfejl, stopper den og viser fejlen. Går det godt, **starter programmet i Main** og udfører ordrerne **oppefra og ned, én ad gangen**. `Console.WriteLine` skriver teksten i konsollen.",
        noegle: ["compiler", "Main", "oppefra", "WriteLine"] }
    ] }
  ]
});
})();
