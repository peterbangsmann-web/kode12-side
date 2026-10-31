// Kode12 — motoren. Ingen biblioteker, ingen server: åbn index.html direkte i en browser.
// Kursets indhold ligger i mappen "kursus" (én fil pr. modul), som lægger moduler i window.KURSUS.
(function () {
  "use strict";

  var K = (window.KURSUS || []).slice().sort(function (a, b) { return a.nr - b.nr; });
  var LS = "kode12_v1";
  var RUTE = location.hash, gaaTid = 0;
  var AFLEVERING = "2026-10-30", EKSAMEN = "2026-11-06";
  var INTERVAL = [0, 1, 3, 7, 14, 30];           // dage mellem repetitioner pr. kasse
  var KAN_TJEKKES = { valg: 1, forudsig: 1, udfyld: 1, skriv: 1, orden: 1, fejl: 1, spor: 1 };
  var KAN_REPETERES = { valg: 1, forudsig: 1, udfyld: 1, skriv: 1, orden: 1, fejl: 1, spor: 1, forklar: 1 };   // "Forklar med egne ord" kommer også igen: det er den mundtlige eksamens vigtigste øvelse
  var TEMAER = [["sand", "Sand", "hsl(14 68% 45%)", "hsl(36 48% 88%)"], ["skov", "Skov", "hsl(152 58% 30%)", "hsl(105 26% 86%)"], ["lavendel", "Lavendel", "hsl(268 58% 50%)", "hsl(262 50% 90%)"],
                ["rose", "Rose", "hsl(338 68% 46%)", "hsl(345 60% 90%)"], ["hav", "Hav", "hsl(186 80% 28%)", "hsl(172 36% 86%)"], ["sol", "Sol", "hsl(30 92% 36%)", "hsl(50 78% 84%)"], ["papir", "Papir", "hsl(220 12% 24%)", "hsl(40 8% 88%)"]];
  var NAVN = { laes: "Læs", valg: "Spørgsmål", forudsig: "Forudsig", udfyld: "Udfyld", skriv: "Skriv kode",
               orden: "Sæt i rækkefølge", fejl: "Find fejlen", ide: "Gør det selv", spor: "Følg koden", opgave: "Programmér selv", forklar: "Forklar med egne ord" };
  var IKON = { laes: "📖", valg: "❓", forudsig: "🔮", udfyld: "✏️", skriv: "⌨️", orden: "🔀", fejl: "🐞", ide: "🛠️", spor: "🧭", opgave: "💻", forklar: "🗣️" };

  // ---------- små hjælpere ----------
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function $(sel, rod) { return (rod || document).querySelector(sel); }
  function $$(sel, rod) { return Array.prototype.slice.call((rod || document).querySelectorAll(sel)); }
  function dato(d) { d = d || new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  function plusDage(n) { var d = new Date(); d.setDate(d.getDate() + n); return dato(d); }
  function dageTil(iso) { var a = new Date(dato() + "T00:00:00"), b = new Date(iso + "T00:00:00"); return Math.round((b - a) / 86400000); }
  function bland(liste) { var a = liste.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  // ---------- gemt tilstand ----------
  function tom() { return { trin: {}, lek: {}, rep: {}, dage: {}, sidst: null, test: [], set: { os: "win", farve: "sand", mode: "auto", skrift: "normal" } }; }
  function hent() {
    var s = tom();
    try { var g = JSON.parse(localStorage.getItem(LS) || "{}"); for (var k in g) { if (k === "set") { for (var x in g.set) s.set[x] = g.set[x]; } else s[k] = g[k]; } } catch (e) { }
    if (!Array.isArray(s.test)) s.test = [];
    return s;
  }
  var S = hent();
  function gem() { try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) { } skyPlanlaeg(); }

  // ---------- fremskridt, der følger din Claude-konto ----------
  // Virker kun, når siden er åbnet på claude.ai. Åbnet som fil på computeren sker der ingenting her,
  // og fremskridtet ligger i browseren som hidtil. Indstillingerne (Windows/Mac, tema) gemmes ikke i skyen:
  // de hører til den enkelte computer.
  var SKY = null, skyTimer = null, skyKoerer = false, skyIgen = false, skyTekst = "";
  var SKYDELE = ["trin", "rep", "rest"];
  function skyData(k) { return JSON.stringify(k === "rest" ? { lek: S.lek, dage: S.dage, sidst: S.sidst, test: S.test } : S[k]); }
  function skyFlet(fjern) {
    var k;
    if (fjern.trin) for (k in fjern.trin) { if (!S.trin[k] || (fjern.trin[k].d || "") > (S.trin[k].d || "")) S.trin[k] = fjern.trin[k]; }
    if (fjern.rep) for (k in fjern.rep) { if (!S.rep[k] || (fjern.rep[k].due || "") > (S.rep[k].due || "")) S.rep[k] = fjern.rep[k]; }
    if (fjern.rest) {
      var r = fjern.rest;
      for (k in (r.lek || {})) { if (!S.lek[k]) S.lek[k] = r.lek[k]; }
      for (k in (r.dage || {})) { S.dage[k] = Math.max(S.dage[k] || 0, r.dage[k] || 0); }
      if (!S.sidst && r.sidst) S.sidst = r.sidst;
      if (r.test && r.test.length) {          // testresultater: læg dem sammen, hver test har sit eget id
        var har = {}; S.test.forEach(function (t) { har[t.id] = 1; });
        r.test.forEach(function (t) { if (!har[t.id]) S.test.push(t); });
        S.test.sort(function (a, b) { return a.id - b.id; }); if (S.test.length > 100) S.test = S.test.slice(-100);
      }
    }
    try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) { }
  }
  function skyHent() {
    if (!SKY) return Promise.resolve();
    return Promise.all(SKYDELE.map(function (k) { return SKY.doc(k).get(); })).then(function (snaps) {
      var fjern = {};
      snaps.forEach(function (sn, i) { if (sn && sn.exists) { try { var j = sn.data().json; fjern[SKYDELE[i]] = JSON.parse(j); SKY.sendt[SKYDELE[i]] = j; } catch (e) { } } });
      var foer = Object.keys(S.lek).length + ":" + Object.keys(S.trin).length;
      skyFlet(fjern);
      skyTekst = "Fremskridtet følger din Claude-konto. Sidst hentet " + new Date().toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" }) + ".";
      if (foer !== Object.keys(S.lek).length + ":" + Object.keys(S.trin).length && !P) rute();   // der kom nyt fra en anden computer: tegn siden igen
      skyPlanlaeg();
    });
  }
  function skyPlanlaeg() { if (!SKY) return; clearTimeout(skyTimer); skyTimer = setTimeout(skySend, 2500); }
  function skySend() {
    if (!SKY) return;
    if (skyKoerer) { skyIgen = true; return; }
    var dele = SKYDELE.filter(function (k) { return skyData(k) !== SKY.sendt[k]; });
    if (!dele.length) return;
    skyKoerer = true;
    var kaede = Promise.resolve();
    dele.forEach(function (k) { kaede = kaede.then(function () { var j = skyData(k); return SKY.doc(k).set({ json: j, opdateret: new Date().toISOString() }).then(function () { SKY.sendt[k] = j; }); }); });
    kaede.then(function () { skyTekst = "Fremskridtet følger din Claude-konto. Sidst gemt " + new Date().toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" }) + "."; },
               function (e) { skyTekst = "Fremskridtet kunne ikke gemmes på din Claude-konto lige nu (" + ((e && e.code) || "fejl") + "). Det ligger stadig i denne browser."; })
         .then(function () { skyKoerer = false; if (skyIgen) { skyIgen = false; skyPlanlaeg(); } });
  }
  function skyStart() {
    if (!window.claude || typeof window.claude.use !== "function") return;
    Promise.all([window.claude.use("db"), window.claude.use("user")]).then(function (r) {
      if (!r[0] || !r[1]) return;
      return r[1].id().then(function (id) {
        if (!id) return;
        var saml = r[0].collection("data/users/" + id);
        SKY = { doc: function (k) { return saml.doc(k); }, sendt: {} };
        document.addEventListener("visibilitychange", function () { if (!document.hidden) skyHent().catch(function () { }); });
        return skyHent();
      });
    }).catch(function () { });
  }
  function brugSet() {
    var h = document.documentElement;
    if (!TEMAER.some(function (t) { return t[0] === S.set.farve; })) S.set.farve = "sand";
    h.setAttribute("data-farve", S.set.farve); h.setAttribute("data-mode", S.set.mode);
    h.setAttribute("data-skrift", S.set.skrift); h.setAttribute("data-os", S.set.os);
  }
  function erMac() { return S.set.os === "mac"; }

  // ---------- opslag i kurset ----------
  var LEK = {}, ALLE = [];
  K.forEach(function (m) { (m.lektioner || []).forEach(function (l, i) { var o = { m: m, l: l, i: i }; LEK[l.id] = o; ALLE.push(o); }); });
  function trinId(lid, i) { return lid + "#" + i; }

  // Fagord fra lektionernes ordlister: i en lektion understreges de, og forklaringen vises, når man peger på ordet.
  var ORD_DEF = {}, ORD_RE = null, ordBrugt = null;
  (function () {
    var navne = [], stop = { trin: 1, program: 1, repetition: 1 };
    ALLE.forEach(function (o) {
      (o.l.ord || []).forEach(function (x) {
        x[0].replace(/\(([^)]*)\)/g, " / $1").split(" / ").forEach(function (v) {
          v = v.trim(); var k = v.toLowerCase();
          if (v.length < 4 || !/^[A-Za-zÆØÅæøåé -]+$/.test(v) || stop[k] || ORD_DEF[k]) return;
          ORD_DEF[k] = { ord: x[0], tekst: String(x[1]).replace(/[*`]/g, "") }; navne.push(v);
        });
      });
    });
    navne.sort(function (a, b) { return b.length - a.length; });
    if (navne.length) ORD_RE = new RegExp("(^|[^A-Za-zÆØÅæøå0-9_])(" + navne.join("|") + ")([a-zæøå]{0,4})(?![A-Za-zÆØÅæøå0-9_])", "gi");
  })();
  function modulPct(m) { var n = (m.lektioner || []).length; if (!n) return 0; var f = m.lektioner.filter(function (l) { return S.lek[l.id]; }).length; return Math.round(100 * f / n); }
  function naesteLektion() {   // først dagens plan (plan.js), ellers den første lektion, der ikke er lavet
    var p = planStatus(); if (p.nu && p.nu.naeste && LEK[p.nu.naeste.id]) return LEK[p.nu.naeste.id];
    for (var i = 0; i < ALLE.length; i++) if (!S.lek[ALLE[i].l.id]) return ALLE[i]; return null;
  }
  function forfaldne() { var d = dato(), ud = []; for (var id in S.rep) { if (S.rep[id].due <= d && findTrin(id)) ud.push(id); } ud.sort(function (a, b) { return S.rep[a].due < S.rep[b].due ? -1 : 1; }); return ud; }
  function findTrin(id) { var p = id.split("#"), o = LEK[p[0]]; if (!o) return null; var st = o.l.trin[+p[1]]; return st && KAN_REPETERES[st.t] ? st : null; }
  function stribe() { var n = 0, d = new Date(); if (!S.dage[dato(d)]) d.setDate(d.getDate() - 1); while (S.dage[dato(d)]) { n++; d.setDate(d.getDate() - 1); } return n; }

  // Emner (kategorier.js), som testen og ordbogen deler. Mangler filen, virker resten af siden som før.
  var KX = window.KATEGORIER || {}, KAT = {}, LEKNR = {};
  (KX.liste || []).forEach(function (k) { KAT[k.id] = k; });
  ALLE.forEach(function (o, n) { LEKNR[o.l.id] = n; });
  function katNavn(id) { var k = KAT[id]; return k ? k.ikon + " " + k.navn : "Andet"; }
  function testKat(o) { return (KX.lektion || {})[o.l.id] || (KX.modul || {})[o.m.id] || "andet"; }
  function lekNavn(o) { return o.m.titel + " · " + (o.l.vaerksted ? "værksted: " : "lektion " + (o.l.nr != null ? o.l.nr : o.i + 1) + ": ") + o.l.titel; }

  // ---------- tekst: lille markdown ----------
  function inl(s) {
    s = esc(s);
    var kode = [];
    s = s.replace(/`([^`]+)`/g, function (_, c) { kode.push(c); return "\u0001" + (kode.length - 1) + "\u0001"; });
    s = s.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
    if (ordBrugt && ORD_RE) s = s.replace(ORD_RE, function (hel, foer, ord, endelse) {   // fagord kan slås op ved at pege på dem
      var k = ord.toLowerCase(), d = ORD_DEF[k]; if (!d || ordBrugt[k]) return hel;
      ordBrugt[k] = 1;
      return foer + '<span class="ordtip" tabindex="0" data-d="' + esc(d.ord + ": " + d.tekst) + '">' + ord + endelse + "</span>";
    });
    return s.replace(/\u0001(\d+)\u0001/g, function (_, n) { return "<code>" + kode[+n] + "</code>"; });
  }
  // Er opgavens projektnavn brugt i en tidligere lektion? Så giv et forslag til en ny mappe ("Modul16"); ellers "".
  // Kun den første opgave i en lektion med det navn får forslaget — de næste arbejder videre i samme projekt.
  var _mappeForslag = null;
  function mappeForslag(st) {
    if (!st || !st.projekt) return "";
    if (!_mappeForslag) {
      _mappeForslag = [];
      var set = {}, OPRET = [/dotnet new [a-z]+(?: [^`"\n]*?)? -(?:n|o) ([A-Za-z0-9.]+)/g, /Project name:?\*{0,2}:? `([A-Za-z0-9.]+)`/g, /Skriv `([A-Za-z0-9.]+)` som (?:projektnavn|\*\*Project name\*\*|navn)/g,
        /Navn: `([A-Za-z0-9.]+)`/g, /Kald (?:projektet|den|det) `([A-Za-z0-9.]+)`/g, /(?:projekt|-app|projektet),? (?:der hedder )?`([A-Za-z0-9.]+)`/g, /der hedder \*\*([A-Za-z0-9.]+)\*\*/g];
      (window.KURSUS || []).forEach(function (m) {
        (m.lektioner || []).forEach(function (l) {
          var her = {}, haft = {};
          l.trin.forEach(function (t) {
            // fortsaet: true = opgaven bygger videre i et projekt fra en tidligere lektion (fx SkadeApp i modul 30), så intet forslag om en ny mappe
            if (t.t === "opgave" && t.projekt && !t.fortsaet && !haft[t.projekt] && set[t.projekt]) _mappeForslag.push([t, (l.vaerksted ? "Vaerksted" : "Modul") + String(m.id).replace(/\D/g, "")]);
            if (t.projekt) { her[t.projekt] = 1; haft[t.projekt] = 1; }
            var tekst = [t.md, t.md2].concat(t.win || [], t.mac || []).join(" ");
            OPRET.forEach(function (re) { var x; re.lastIndex = 0; while ((x = re.exec(tekst))) her[x[1]] = 1; });
          });
          Object.keys(her).forEach(function (n) { set[n] = 1; });
        });
      });
    }
    for (var i = 0; i < _mappeForslag.length; i++) if (_mappeForslag[i][0] === st) return _mappeForslag[i][1];
    return "";
  }

  function md(s) {
    if (!s) return "";
    s = String(s).replace(/\{\{([\s\S]*?)\|\|([\s\S]*?)\}\}/g, function (_, w, m) { return erMac() ? m : w; });
    return s.split(/\n\s*\n/).map(function (b) {
      var linjer = b.split("\n").filter(function (l) { return l.trim() !== ""; });
      if (!linjer.length) return "";
      if (linjer.every(function (l) { return /^\s*- /.test(l); })) return "<ul>" + linjer.map(function (l) { return "<li>" + inl(l.replace(/^\s*- /, "")) + "</li>"; }).join("") + "</ul>";
      if (linjer.every(function (l) { return /^\s*\d+\. /.test(l); })) return "<ol>" + linjer.map(function (l) { return "<li>" + inl(l.replace(/^\s*\d+\. /, "")) + "</li>"; }).join("") + "</ol>";
      return "<p>" + linjer.map(inl).join("<br>") + "</p>";
    }).join("");
  }

  // ---------- farvelægning af kode ----------
  var ORD = {
    csharp: "abstract as async await base bool break byte case catch char class const continue decimal default delegate do double else enum event false finally float for foreach get if in int interface internal is long namespace new null object out override params private protected public readonly ref return sealed set short static string struct switch this throw true try typeof using var virtual void while yield record init required where select from orderby group by into join on equals let ascending descending partial lock nameof when not and or",
    js: "async await break case catch class const continue default delete do else export extends false finally for function if import in instanceof let new null of return static super switch this throw true try typeof undefined var void while yield get set constructor",
    sql: "select from where insert into values update set delete create table database drop alter add primary key foreign references not null and or order by group having join inner left right outer on as distinct top count sum avg min max int nvarchar varchar datetime date bit decimal identity like in between is asc desc use go constraint default unique exec begin end if exists",
    css: ""
  };
  function farv(kode, sprog) {
    sprog = sprog || "csharp";
    if (sprog === "text") return esc(kode);
    if (sprog === "html" || sprog === "razor") return farvHtml(kode);
    var ord = {}; (ORD[sprog] || "").split(" ").forEach(function (o) { ord[o] = 1; });
    var re = sprog === "sql"
      ? /(--[^\n]*|\/\*[\s\S]*?\*\/)|('(?:[^'\n]|'')*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_@#][\w]*)|([\s\S])/g
      : sprog === "css"
        ? /(\/\*[\s\S]*?\*\/)|("(?:[^"\n])*"|'(?:[^'\n])*')|(#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|s|deg|fr)?\b)|([A-Za-z_-][\w-]*)|([\s\S])/g
        : /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(\$?@?"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?[fdmFDML]?\b)|([A-Za-z_@][\w]*)|([\s\S])/g;
    var ud = "", m, sidste = 0;
    while ((m = re.exec(kode))) {
      sidste = re.lastIndex;
      if (m[1] != null) ud += '<span class="kom">' + esc(m[1]) + "</span>";
      else if (m[2] != null) ud += '<span class="str">' + esc(m[2]) + "</span>";
      else if (m[3] != null) ud += '<span class="tal">' + esc(m[3]) + "</span>";
      else if (m[4] != null) {
        var w = m[4], nøgle = sprog === "sql" ? w.toLowerCase() : w;
        if (sprog === "css") { ud += /^\s*:/.test(kode.slice(sidste)) ? '<span class="typ">' + esc(w) + "</span>" : esc(w); }
        else if (ord[nøgle] === 1) ud += '<span class="kw">' + esc(w) + "</span>";
        else if (/^\s*\(/.test(kode.slice(sidste, sidste + 3))) ud += '<span class="fn">' + esc(w) + "</span>";
        else if (sprog === "csharp" && /^[A-Z]/.test(w)) ud += '<span class="typ">' + esc(w) + "</span>";
        else ud += esc(w);
      } else ud += esc(m[5]);
    }
    return ud;
  }
  function farvHtml(kode) {
    var re = /(<!--[\s\S]*?-->|@\*[\s\S]*?\*@)|(<\/?[A-Za-z][\w-]*|\/?>)|("[^"\n]*")|(@[A-Za-z_][\w.]*)|([\s\S])/g, ud = "", m;
    while ((m = re.exec(kode))) {
      if (m[1] != null) ud += '<span class="kom">' + esc(m[1]) + "</span>";
      else if (m[2] != null) ud += '<span class="kw">' + esc(m[2]) + "</span>";
      else if (m[3] != null) ud += '<span class="str">' + esc(m[3]) + "</span>";
      else if (m[4] != null) ud += '<span class="fn">' + esc(m[4]) + "</span>";
      else ud += esc(m[5]);
    }
    return ud;
  }
  function kodeblok(kode, sprog, klasse) { return kode == null ? "" : '<pre class="kode ' + (klasse || "") + '">' + farv(String(kode), sprog) + "</pre>"; }
  function udblok(tekst, label) { return tekst == null ? "" : '<div class="udlabel">' + esc(label || "Det skriver programmet") + '</div><pre class="ud">' + esc(tekst) + "</pre>"; }

  // ---------- sammenligning af kode ----------
  // Gør kode ens at sammenligne: kommentarer væk, mellemrum samlet, ingen mellemrum omkring tegn.
  // Tekst i "anførselstegn" røres ikke.
  function norm(s) {
    var str = [];
    s = String(s).replace(/\/\/[^\n]*/g, " ").replace(/\/\*[\s\S]*?\*\//g, " ");
    s = s.replace(/\$?@?"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/g, function (t) { str.push(t); return "\u0001" + (str.length - 1) + "\u0001"; });
    s = s.replace(/\s+/g, " ").replace(/\s*([^\w\s])\s*/g, "$1").trim();
    return s.replace(/\u0001(\d+)\u0001/g, function (_, n) { return str[+n]; });
  }
  function tjekKode(kode, tjek) {
    var n = norm(kode);
    return (tjek || []).map(function (t) {
      var findes = t[0] instanceof RegExp ? t[0].test(n) : n.indexOf(norm(t[0])) !== -1;
      return { ok: t[2] === "ikke" ? !findes : findes, besked: t[1] };
    });
  }
  function ensUd(a, b) {
    function f(x) { return String(x).replace(/\r/g, "").split("\n").map(function (l) { return l.replace(/\s+$/, ""); }).join("\n").replace(/^\n+|\n+$/g, ""); }
    return f(a) === f(b);
  }
  function naestenUd(a, b) { function f(x) { return String(x).toLowerCase().replace(/\s+/g, ""); } return f(a) === f(b); }
  window.Kode12 = { norm: norm, tjekKode: tjekKode, ensUd: ensUd };   // bruges af afprøvningen

  // ---------- trin-typer ----------
  // Hver type tegner sig selv i el og returnerer { tjek(), vis() }. tjek() giver null (intet svar endnu)
  // eller { ok, html }. vis() viser det rigtige svar.
  function osboks(st) {
    var liste = erMac() ? st.mac : st.win, navn = erMac() ? "⌘ Mac · Rider" : "Windows · Visual Studio";
    if (!liste) { liste = st.win || st.mac; navn = "Samme trin på Windows og Mac" + (erMac() ? " (F12 hedder ⌥⌘I på Mac)" : ""); }   // trinnet har kun én vejledning: vis den for begge
    if (!liste) return "";
    var indhold = Array.isArray(liste) ? "<ol>" + liste.map(function (x) { return "<li>" + inl(x) + "</li>"; }).join("") + "</ol>" : md(liste);
    return '<div class="osboks"><div class="osnavn">' + navn + "</div>" + indhold + "</div>";
  }
  function noter(st) {
    if (!st.noter) return "";
    return '<div class="noter">' + st.noter.map(function (n) { return "<div><code>" + esc(n[0]) + "</code><span>" + inl(n[1]) + "</span></div>"; }).join("") + "</div>";
  }
  function hoved(st) { return (st.h ? "<h2>" + inl(st.h) + "</h2>" : "") + (st.q ? '<div class="q">' + md(st.q) + "</div>" : ""); }
  function kodefelt(el) {   // Tab = 4 mellemrum, Enter beholder indrykningen
    el.addEventListener("keydown", function (e) {
      if (e.key === "Tab" && !e.shiftKey) { e.preventDefault(); indsaet(el, "    "); }
      else if (e.key === "Enter" && !e.ctrlKey && !e.metaKey) {
        var foer = el.value.slice(0, el.selectionStart), linje = foer.slice(foer.lastIndexOf("\n") + 1);
        var ind = (linje.match(/^[ \t]*/) || [""])[0]; if (/\{\s*$/.test(linje)) ind += "    ";
        e.preventDefault(); indsaet(el, "\n" + ind);
      }
    });
  }
  function indsaet(el, tekst) { var a = el.selectionStart, b = el.selectionEnd; el.value = el.value.slice(0, a) + tekst + el.value.slice(b); el.selectionStart = el.selectionEnd = a + tekst.length; }

  var TYPER = {
    laes: function (st, el) {
      el.innerHTML = hoved(st) + md(st.md) + kodeblok(st.kode, st.sprog) + noter(st) + udblok(st.output) + md(st.md2) + osboks(st);
      return {};
    },

    valg: function (st, el) {
      var orden = bland(st.svar.map(function (_, i) { return i; })), valgt = null;
      el.innerHTML = hoved(st) + kodeblok(st.kode, st.sprog) + '<div class="valg">' + orden.map(function (i, n) {
        return '<button type="button" data-i="' + i + '"><span class="bog">' + "ABCDEF"[n] + "</span><span>" + inl(st.svar[i]) + "</span></button>";
      }).join("") + "</div>";
      var knapper = $$(".valg button", el);
      knapper.forEach(function (b) { b.onclick = function () { valgt = +b.getAttribute("data-i"); knapper.forEach(function (x) { x.className = x === b ? "valgt" : ""; }); }; });
      return {
        tjek: function () {
          if (valgt == null) return null;
          var ok = valgt === st.ret;
          knapper.forEach(function (b) { var i = +b.getAttribute("data-i"); if (i === valgt) b.className = ok ? "rigtig" : "forkert"; });
          return { ok: ok, html: ok ? md(st.fordi) : "" };
        },
        vis: function () { knapper.forEach(function (b) { if (+b.getAttribute("data-i") === st.ret) b.className = "rigtig"; b.disabled = true; }); return md(st.fordi); },
        laas: function () { knapper.forEach(function (b) { b.disabled = true; }); },
        igen: function () { knapper.forEach(function (b) { if (b.className === "forkert") b.disabled = true; else b.className = ""; }); valgt = null; }
      };
    },

    forudsig: function (st, el) {
      var linjer = String(st.output).split("\n").length;
      el.innerHTML = hoved(st) + (st.q ? "" : '<div class="q"><p>Læs koden. Hvad skriver programmet på skærmen?</p></div>') + kodeblok(st.kode, st.sprog) +
        (st.input ? '<p class="lille svag">Brugeren taster: ' + st.input.map(function (x) { return "<code>" + esc(x) + "</code>"; }).join(" og derefter ") + "</p>" : "") +
        '<textarea class="kode" rows="' + Math.max(2, linjer + 1) + '" spellcheck="false" placeholder="Skriv præcis det, programmet skriver — linje for linje"></textarea>';
      var ta = $("textarea", el);
      return {
        fokus: ta,
        tjek: function () {
          if (!ta.value.trim()) return null;
          // Kommatal: en dansk computer skriver 7,5 — en computer med engelsk opsætning skriver 7.5. Begge dele er det rigtige svar.
          function tal(x) { return String(x).replace(/(\d)[.,](?=\d)/g, "$1,"); }
          var praecis = ensUd(ta.value, st.output), ok = praecis || ensUd(tal(ta.value), tal(st.output));
          ta.className = "kode " + (ok ? "ok" : "nej");
          return { ok: ok, html: ok ? (praecis ? "" : "<p>Rigtigt. Du har skrevet decimaltegnet anderledes end facit: med dansk opsætning skriver computeren komma (7,5), med engelsk punktum (7.5).</p>") + md(st.fordi) : (naestenUd(ta.value, st.output) ? "<p>Næsten! Det er kun store/små bogstaver eller mellemrum, der er forskellige. Computeren skriver tegn for tegn.</p>" : "") };
        },
        vis: function () { return udblok(st.output) + md(st.fordi); },
        igen: function () { ta.className = "kode"; ta.focus(); }
      };
    },

    udfyld: function (st, el) {
      var dele = String(st.kode).split(/\[\[(.+?)\]\]/), html = "";
      dele.forEach(function (d, i) {
        if (i % 2 === 0) html += farv(d, st.sprog);
        else { var alt = d.split("|"), l = Math.max.apply(null, alt.map(function (a) { return a.length; })); html += '<input data-svar="' + esc(d) + '" size="' + Math.max(3, l + 1) + '" autocomplete="off" autocapitalize="off" spellcheck="false">'; }
      });
      el.innerHTML = hoved(st) + (st.q ? "" : '<div class="q"><p>Udfyld de tomme felter, så koden virker.</p></div>') + '<pre class="kode udf">' + html + "</pre>";
      var felter = $$("input", el);
      return {
        fokus: felter[0],
        tjek: function () {
          if (felter.some(function (f) { return !f.value.trim(); })) return null;
          var alle = true;
          felter.forEach(function (f) {
            // I SQL, HTML og almindelig tekst er store og små bogstaver ligegyldige. I C#, JavaScript og Razor er de ikke.
            var lige = /^(sql|html|text)$/.test(st.sprog || "") ? function (x) { return norm(x).toLowerCase(); } : norm;
            var ok = f.getAttribute("data-svar").split("|").some(function (a) { return lige(a) === lige(f.value); });
            f.className = ok ? "ok" : "nej"; if (!ok) alle = false;
          });
          return { ok: alle, html: alle ? udblok(st.output) + md(st.fordi) : "" };
        },
        vis: function () { felter.forEach(function (f) { f.value = f.getAttribute("data-svar").split("|")[0]; f.className = "ok"; f.disabled = true; }); return udblok(st.output) + md(st.fordi); },
        igen: function () { felter.forEach(function (f) { if (f.className === "nej") { f.className = ""; } }); var f = felter.filter(function (x) { return x.className !== "ok"; })[0]; if (f) f.focus(); }
      };
    },

    skriv: function (st, el) {
      var rk = Math.max(3, String(st.loesning).split("\n").length + 2);
      el.innerHTML = hoved(st) + kodeblok(st.foer, st.sprog, "ramme") +
        '<textarea class="kode" rows="' + rk + '" spellcheck="false" autocapitalize="off" autocomplete="off" placeholder="Skriv din kode her"></textarea>' +
        kodeblok(st.efter, st.sprog, "ramme") + (st.hint ? '<p class="lille svag">Tip: ' + inl(st.hint) + "</p>" : "");
      var ta = $("textarea", el); kodefelt(ta);
      function facit() { return "<p><b>Sådan kan det skrives:</b></p>" + kodeblok(st.loesning, st.sprog) + udblok(st.output) + md(st.fordi); }
      return {
        fokus: ta,
        tjek: function () {
          if (!ta.value.trim()) return null;
          var res = tjekKode(ta.value, st.tjek), ok = res.every(function (r) { return r.ok; });
          ta.className = "kode " + (ok ? "ok" : "nej");
          var liste = '<ul class="tjekliste">' + res.map(function (r) { return '<li class="' + (r.ok ? "ok" : "nej") + '">' + inl(r.besked) + "</li>"; }).join("") + "</ul>";
          return { ok: ok, html: liste + (ok ? facit() : "") };
        },
        vis: function () { return facit(); },
        igen: function () { ta.className = "kode"; ta.focus(); }
      };
    },

    orden: function (st, el) {
      // Facit er rækkefølgen i st.linjer. st.alt er andre rækkefølger (lister af linjenumre fra 0), der er lige så rigtige.
      // Indrykning tæller ikke med, så to klammer med forskellig indrykning kan bytte plads.
      var maal = [st.linjer.map(function (_, i) { return i; })].concat(st.alt || []);
      function bedst() {
        var b = null;
        maal.forEach(function (m) { var p = raek.map(function (x, pos) { return st.linjer[x].trim() === st.linjer[m[pos]].trim(); }), k = p.filter(Boolean).length; if (!b || k > b.k) b = { p: p, k: k }; });
        return b;
      }
      var raek = bland(st.linjer.map(function (_, i) { return i; })), n = 0;
      while (st.linjer.length > 1 && bedst().k === raek.length && n++ < 20) raek = bland(raek);
      el.innerHTML = hoved(st) + (st.q ? "" : '<div class="q"><p>Sæt linjerne i den rigtige rækkefølge.</p></div>') + '<div class="orden"></div><p class="lille svag">Træk linjerne, eller brug pilene.</p>';
      var boks = $(".orden", el), laast = false, traek = null;
      function tegn() {
        boks.innerHTML = raek.map(function (x, pos) {
          return '<div class="linje" draggable="true" data-pos="' + pos + '"><pre>' + farv(st.linjer[x], st.sprog) + '</pre><span class="pile"><button type="button" data-op="-1" aria-label="Flyt op">▲</button><button type="button" data-op="1" aria-label="Flyt ned">▼</button></span></div>';
        }).join("");
      }
      function flyt(fra, til) { if (laast || til < 0 || til >= raek.length || fra === til) return; var x = raek.splice(fra, 1)[0]; raek.splice(til, 0, x); tegn(); }
      boks.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; var pos = +b.closest(".linje").getAttribute("data-pos"); flyt(pos, pos + (+b.getAttribute("data-op"))); });
      boks.addEventListener("dragstart", function (e) { var l = e.target.closest(".linje"); if (!l || laast) return; traek = +l.getAttribute("data-pos"); l.classList.add("traek"); try { e.dataTransfer.setData("text/plain", "x"); } catch (x) { } });
      boks.addEventListener("dragover", function (e) { var l = e.target.closest(".linje"); if (!l || traek == null) return; e.preventDefault(); $$(".linje", boks).forEach(function (x) { x.classList.toggle("over", x === l); }); });
      boks.addEventListener("drop", function (e) { var l = e.target.closest(".linje"); if (!l || traek == null) return; e.preventDefault(); var til = +l.getAttribute("data-pos"), fra = traek; traek = null; flyt(fra, til); });
      boks.addEventListener("dragend", function () { traek = null; $$(".linje", boks).forEach(function (x) { x.classList.remove("traek", "over"); }); });
      tegn();
      return {
        tjek: function () {
          var b = bedst(), alle = b.k === raek.length;
          $$(".linje", boks).forEach(function (l, pos) { l.classList.add(b.p[pos] ? "ok" : "nej"); });
          return { ok: alle, html: alle ? udblok(st.output) + md(st.fordi) : "<p>De røde linjer står forkert.</p>" };
        },
        vis: function () { raek = st.linjer.map(function (_, i) { return i; }); tegn(); laast = true; return udblok(st.output) + md(st.fordi); },
        laas: function () { laast = true; },
        igen: function () { tegn(); }
      };
    },

    fejl: function (st, el) {
      var linjer = String(st.kode).split("\n"), valgt = null;
      el.innerHTML = hoved(st) + (st.q ? "" : '<div class="q"><p>Der er en fejl i koden. Klik på linjen med fejlen.</p></div>') +
        '<div class="fejlkode">' + linjer.map(function (l, i) { return '<button type="button" data-i="' + (i + 1) + '"><span class="ln">' + (i + 1) + "</span><pre>" + (farv(l, st.sprog) || " ") + "</pre></button>"; }).join("") + "</div>";
      var knapper = $$(".fejlkode button", el);
      knapper.forEach(function (b) { b.onclick = function () { valgt = +b.getAttribute("data-i"); knapper.forEach(function (x) { if (x.className !== "forkert") x.className = x === b ? "valgt" : ""; }); }; });
      function facit() { return md(st.fordi) + (st.rettet ? "<p><b>Rettet:</b></p>" + kodeblok(st.rettet, st.sprog) : ""); }
      return {
        tjek: function () {
          if (valgt == null) return null;
          var ok = valgt === st.linje;
          knapper[valgt - 1].className = ok ? "rigtig" : "forkert";
          return { ok: ok, html: ok ? facit() : "" };
        },
        vis: function () { knapper[st.linje - 1].className = "rigtig"; knapper.forEach(function (b) { b.disabled = true; }); return facit(); },
        laas: function () { knapper.forEach(function (b) { b.disabled = true; }); },
        igen: function () { knapper.forEach(function (b) { if (b.className === "forkert") b.disabled = true; }); valgt = null; }
      };
    },

    ide: function (st, el) {
      el.innerHTML = hoved(st) + md(st.md) + osboks(st) + kodeblok(st.kode, st.sprog) + udblok(st.output, "Det skal du se, når det virker") + md(st.md2) +
        '<label class="afkryds"><input type="checkbox"> Jeg har gjort det, og det virker hos mig</label>';
      var boks = $("input", el);
      return { selv: function () { return boks.checked; } };
    },

    // Sporingsskema: følg programmet linje for linje, og skriv variablernes værdier ned.
    // raekker: [[linjenr, værdi, værdi ...]] — en værdi, der starter med "=", er udfyldt på forhånd.
    spor: function (st, el) {
      var linjer = String(st.kode).split("\n");
      function ens(a, b) { function f(x) { return String(x).trim().replace(/^["']|["']$/g, "").replace(/^[-—]$/, "–").replace(/\./g, ",").toLowerCase(); } return f(a) === f(b); }
      el.innerHTML = hoved(st) + (st.q ? "" : '<div class="q"><p>Følg programmet linje for linje. Skriv i skemaet, hvad hver variabel indeholder, lige efter at linjen er udført.</p></div>') +
        '<div class="sporwrap"><pre class="kode nummer">' + linjer.map(function (l, i) { return '<span class="ln">' + (i + 1) + "</span>" + farv(l, st.sprog); }).join("\n") + "</pre>" +
        '<table class="spor"><thead><tr><th>Efter linje</th>' + st.kolonner.map(function (k) { return "<th><code>" + esc(k) + "</code></th>"; }).join("") + "</tr></thead><tbody>" +
        st.raekker.map(function (r) {
          return "<tr><td>" + esc(r[0]) + "</td>" + r.slice(1).map(function (v) {
            v = String(v);
            return "<td>" + (v.charAt(0) === "=" ? '<span class="givet">' + esc(v.slice(1)) + "</span>" : '<input data-svar="' + esc(v) + '" size="7" autocomplete="off" autocapitalize="off" spellcheck="false">') + "</td>";
          }).join("") + "</tr>";
        }).join("") + "</tbody></table></div>" +
        '<p class="lille svag">Skriv en streg (–) i feltet, hvis variablen ikke findes endnu. Tekst skrives uden anførselstegn. Brug gerne papir ved siden af — det er hele idéen: du skal ikke holde værdierne i hovedet.</p>';
      var felter = $$("table.spor input", el);
      return {
        fokus: felter[0],
        tjek: function () {
          if (felter.some(function (f) { return !f.value.trim(); })) return null;
          var alle = true;
          felter.forEach(function (f) { var ok = ens(f.value, f.getAttribute("data-svar")); f.className = ok ? "ok" : "nej"; if (!ok) alle = false; });
          return { ok: alle, html: alle ? udblok(st.output) + md(st.fordi) : "<p>De røde felter passer ikke. Tag linjen én gang til: hvad gør den ved variablen?</p>" };
        },
        vis: function () { felter.forEach(function (f) { f.value = f.getAttribute("data-svar"); f.className = "ok"; f.disabled = true; }); return udblok(st.output) + md(st.fordi); },
        igen: function () { felter.forEach(function (f) { if (f.className === "nej") f.className = ""; }); var f = felter.filter(function (x) { return x.className !== "ok"; })[0]; if (f) f.focus(); }
      };
    },

    opgave: function (st, el) {
      var tips = st.tip || [], vist = 0, kanTjekkes = st.output != null && !st.fri;
      var rk = st.output != null ? String(st.output).split("\n").length + 2 : 4;
      // Hvad slags opgave er det? Konsolprogram (C# med projektnavn, hvor siden kan tjekke udskriften — eller konsol: true), SQL, en side i browseren, Angular eller et web-projekt.
      var sp = st.sprog || "csharp", cs = sp === "csharp" || sp === "cs";
      var konsol = cs && !!st.projekt && (st.konsol === true || (st.konsol == null && kanTjekkes));
      var hvor = konsol ? "<p>Lav et nyt <b>Console</b>-projekt, der hedder <code>" + esc(st.projekt) + "</code>" + (erMac() ? " (File → New Solution → Console)." : " (File → New → Project → Console App).") + " Skriv programmet selv — helt fra en tom fil.</p>"
        : st.projekt ? "<p>Arbejd i <code>" + esc(st.projekt) + "</code>. Opgaveteksten ovenfor siger, hvad det er, og om det skal oprettes først.</p>" : "";
      // Projektnavnet er brugt i en tidligere lektion: sig, hvad man gør, når mappen findes i forvejen (to projekter med samme navn kan ikke ligge i samme mappe).
      var nyMappe = mappeForslag(st);
      if (nyMappe && String(st.md || "").indexOf("Du har allerede en mappe") < 0)
        hvor += '<p class="lille">Har du allerede en mappe, der hedder <code>' + esc(st.projekt) + "</code>, fra tidligere i kurset — og siger opgaveteksten ikke, at du skal arbejde videre i den? Behold navnet, men læg det nye projekt et andet sted: skriv en ny mappe (fx <code>" +
          esc(nyMappe) + "</code>) i feltet <b>" + (erMac() ? "Solution directory" : "Location") + "</b>, når du opretter det.</p>";
      var koer = sp === "sql" ? (erMac() ? "Skriv SQL'en i en <b>Query Console</b> i Rider (Database-vinduet). Markér sætningerne, og kør dem med den grønne pil ▶." : "Skriv SQL'en i et query-vindue til databasen (SQL Server Object Explorer → højreklik på databasen → <b>New Query</b>). Kør med den grønne pil ▶.")
        : sp === "html" || sp === "css" ? "Gem filen, og åbn den i browseren. Fejl giver ingen besked — se dem i udviklerværktøjerne (" + (erMac() ? "⌥⌘I" : "F12") + ")."
        : sp === "js" ? "Start appen fra terminalen, som lektionerne viser. Fejl står i terminalen og i browserens konsol (" + (erMac() ? "⌥⌘I" : "F12") + " → Console)."
        : sp === "text" ? ""
        : (erMac() ? "Kør med den grønne pil ▶. Kig i vinduet <b>Problems</b>, hvis der er røde streger." : "Kør med <b>Ctrl + F5</b>. Kig i <b>Error List</b>, hvis der er røde streger.");
      var startTekst = konsol ? "Start med denne kode — kopiér den ind i Program.cs" : sp === "sql" ? "Start med denne kode — kopiér den ind i dit query-vindue" : sp === "html" ? "Start med denne kode — kopiér den ind i din fil" : "Start med denne kode — opgaveteksten siger, hvilken fil den hører til";
      var udTekst = konsol || !st.projekt ? "Kør dit program. Kopiér det, der står i " + (erMac() ? "Run-vinduet" : "det sorte vindue") + ", og indsæt det her" : "Kopiér det, opgaven beder dig sammenligne, og indsæt det her";
      el.innerHTML = hoved(st) + '<div class="opg-intro">' + md(st.md) + "</div>" +
        (st.krav ? '<div class="krav"><div class="krav-h">Krav til programmet — sæt flueben, efterhånden som du får dem til at virke</div>' + st.krav.map(function (k) { return '<label><input type="checkbox"><span>' + inl(k) + "</span></label>"; }).join("") + "</div>" : "") +
        (hvor || koer ? '<div class="osboks"><div class="osnavn">' + (erMac() ? "Mac · Rider" : "Windows · Visual Studio") + "</div>" + hvor + (koer ? "<p>" + koer + "</p>" : "") + "</div>" : "") +
        (st.start ? '<div class="udlabel">' + startTekst + "</div>" + kodeblok(st.start, st.sprog) + '<p><button type="button" class="knap" id="kopier">Kopiér koden</button></p>' : "") +
        (st.input ? '<p class="lille svag">Afprøv med disse svar fra brugeren: ' + st.input.map(function (x) { return "<code>" + esc(x) + "</code>"; }).join(", ") + "</p>" : "") +
        udblok(st.output, kanTjekkes ? "Det skal dit program skrive" : "Sådan kan en kørsel se ud") +
        (kanTjekkes ? '<div class="udlabel">' + udTekst + '</div><textarea class="kode" rows="' + rk + '" spellcheck="false" placeholder="Indsæt (eller skriv) det, dit program skrev"></textarea>' :
          '<label class="afkryds"><input type="checkbox" id="opgklar"> Mit program virker og opfylder kravene</label>') +
        '<div id="tips"></div><div class="rk opg-knapper">' + (tips.length ? '<button type="button" class="knap" id="tipknap">💡 Giv mig et tip (0/' + tips.length + ")</button>" : "") +
        '<button type="button" class="knap" id="facitknap">Vis et løsningsforslag</button></div><div id="facit"></div>' + md(st.md2) +
        (st.ekstra ? '<div class="ekstra"><b>Vil du videre?</b>' + md(st.ekstra.map(function (x) { return "- " + x; }).join("\n")) + "</div>" : "");
      var ta = $("textarea", el), klar = false;
      function facit() { return "<p><b>Et løsningsforslag</b> — dit program må gerne se anderledes ud, bare det opfylder kravene:</p>" + kodeblok(st.loesning, st.sprog) + md(st.fordi); }
      if ($("#kopier", el)) $("#kopier", el).onclick = function () {
        var knap = this, ok = function () { knap.textContent = "Kopieret ✓"; };
        try { navigator.clipboard.writeText(st.start).then(ok, gammel); } catch (e) { gammel(); }
        function gammel() { var t = document.createElement("textarea"); t.value = st.start; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); ok(); } catch (e) { knap.textContent = "Markér koden, og kopiér den selv"; } t.remove(); }
      };
      if ($("#tipknap", el)) $("#tipknap", el).onclick = function () {
        if (vist >= tips.length) return;
        $("#tips", el).insertAdjacentHTML("beforeend", '<div class="svar info"><div class="hoved">Tip ' + (vist + 1) + "</div>" + md(tips[vist]) + "</div>"); vist++;
        this.textContent = "💡 Giv mig et tip (" + vist + "/" + tips.length + ")"; if (vist >= tips.length) this.disabled = true;
      };
      $("#facitknap", el).onclick = function () {
        if (!klar) { klar = true; this.textContent = "Har du prøvet selv først? Klik igen for at se løsningen"; return; }
        $("#facit", el).innerHTML = '<div class="svar info">' + facit() + "</div>"; this.disabled = true; this.textContent = "Løsningsforslaget er vist nedenfor";
      };
      var c = { fokus: null };
      if (kanTjekkes) {
        c.tjek = function () {
          if (!ta.value.trim()) return null;
          var ok = ensUd(ta.value, st.output); ta.className = "kode " + (ok ? "ok" : "nej");
          return { ok: ok, html: ok ? "<p>Dit program skriver præcis det rigtige.</p>" + facit() : (naestenUd(ta.value, st.output) ? "<p>Næsten! Kun mellemrum eller store/små bogstaver er forskellige. Sammenlign tegn for tegn med det forventede.</p>" : "<p>Det, dit program skriver, er ikke helt det forventede. Sammenlign linje for linje med boksen ovenfor.</p>") };
        };
        c.vis = function () { return facit(); };
        c.igen = function () { ta.className = "kode"; ta.focus(); };
      }
      return c;
    },

    forklar: function (st, el) {
      el.innerHTML = hoved(st) + '<textarea class="fri" rows="5" placeholder="Skriv din forklaring — eller sig den højt, som til eksamen, og skriv stikord"></textarea>';
      var ta = $("textarea", el);
      return {
        fokus: ta, selvvurder: true,
        sammenlign: function () {
          var t = ta.value.toLowerCase();
          var n = (st.noegle || []).map(function (k) { return '<span class="' + (t.indexOf(k.toLowerCase()) !== -1 ? "ok" : "") + '">' + esc(k) + "</span>"; }).join("");
          return "<p><b>Et godt svar:</b></p>" + md(st.svar) + (n ? '<p class="lille svag">Ord, der gerne må indgå (grøn = du brugte det):</p><div class="noegler">' + n + "</div>" : "");
        }
      };
    }
  };

  // ---------- afspilleren (en lektion eller en repetitionsrunde) ----------
  var P = null;
  function startLektion(id, start) {
    var o = LEK[id]; if (!o) return forside();
    P = { type: "lek", o: o, koe: o.l.trin.map(function (st, i) { return { st: st, id: trinId(id, i) }; }), i: Math.max(0, Math.min((+start || 1) - 1, o.l.trin.length - 1)), rigtige: 0, tjekbare: 0, foerste: {} };
    S.sidst = id; gem(); visTrin();
  }
  function startRep() {
    var ids = forfaldne().slice(0, 12);
    P = { type: "rep", koe: ids.map(function (id) { return { st: findTrin(id), id: id }; }), i: 0, rigtige: 0, tjekbare: 0, foerste: {} };
    if (!P.koe.length) return repTom();
    visTrin();
  }
  function ramme(indhold, klasse) { $("#app").innerHTML = topbar() + '<main class="' + (klasse === true ? "smal" : klasse || "") + '">' + indhold + "</main>"; window.scrollTo(0, 0); }
  function ren(t) { return String(t || "").replace(/\{\{([\s\S]*?)\|\|([\s\S]*?)\}\}/g, function (_, w, m) { return erMac() ? m : w; }).replace(/[*`]/g, ""); }
  function kortTitel(st) { var t = ren(st.h || (st.t === "laes" ? "" : st.q) || ""); t = t.split("\n")[0]; if (t.length > 46) t = t.slice(0, 44) + "…"; return t || NAVN[st.t]; }

  function visTrin() {
    if (P.i >= P.koe.length) return slut();
    var post = P.koe[P.i], st = post.st, erTest = P.type === "test", tilbage = P.type === "lek" ? "#/m/" + P.o.m.id : erTest ? "#/test" : "#/";
    var titel = P.type === "lek" ? P.o.l.titel : erTest ? katNavn(post.kat) + " · " + post.o.m.titel : "Repetition";
    P.set = P.set || {}; P.set[P.i] = true;
    var sti = "";
    if (P.type === "lek") {
      sti = '<aside class="sti"><a class="sti-modul" href="' + tilbage + '">← ' + esc(P.o.m.titel) + '</a><div class="sti-titel">' + esc(titel) + "</div><ol>" + P.koe.map(function (p, n) {
        var res = S.trin[p.id], kl = (n === P.i ? "nu " : "") + (res ? (res.ok ? "ok " : "nej ") : P.set[n] && n !== P.i ? "set " : "");
        return '<li class="' + kl + '"><a href="#" data-hop="' + n + '"><span class="ik">' + IKON[p.st.t] + "</span><span>" + esc(kortTitel(p.st)) + "</span></a></li>";
      }).join("") + "</ol></aside>";
    }
    ramme(sti + '<div class="laeseflade"><div class="spilhoved"><a href="' + tilbage + '" title="Luk">✕</a><div class="bar"><i style="width:' + Math.round(100 * P.i / P.koe.length) + '%"></i></div>' +
      '<span class="taeller">' + (P.i + 1) + " / " + P.koe.length + "</span></div>" +
      '<div class="kort trin t-' + st.t + '"><span class="maerke">' + IKON[st.t] + " " + NAVN[st.t] + '</span> <span class="lille svag">' + esc(titel) + '</span><div id="trin"></div><div id="svar"></div>' +
      '<div class="fod"><span id="venstre"></span><span class="hoejre" id="knapper"></span></div></div></div>', P.type === "lek" ? "lektion" : "lektion uden-sti");
    $$(".sti a[data-hop]").forEach(function (a) { a.onclick = function (e) { e.preventDefault(); P.i = +a.getAttribute("data-hop"); visTrin(); }; });
    ordBrugt = erTest ? null : {};   // i en test forklares fagord ikke, når man peger på dem: det ville afsløre svaret
    var el = $("#trin"), c = TYPER[st.t](st, el), svar = $("#svar"), knapper = $("#knapper"), forsoeg = 0, faerdig = false;

    function videre() { S.dage[dato()] = (S.dage[dato()] || 0) + 1; gem(); P.i++; visTrin(); }
    function resultat(ok) {
      if (P.foerste[post.id] == null) { P.foerste[post.id] = ok; P.tjekbare++; if (ok) P.rigtige++; }
      if (P.type === "lek") S.trin[post.id] = { ok: P.foerste[post.id], d: dato() };
      else if (P.type === "rep") { var r = S.rep[post.id] || { box: 1 }; r.box = P.foerste[post.id] ? Math.min(5, r.box + 1) : 1; r.due = plusDage(INTERVAL[r.box]); S.rep[post.id] = r; }
      gem();
    }
    function knap(tekst, pri, fn) { var b = document.createElement("button"); b.type = "button"; b.className = "knap" + (pri ? " pri" : ""); b.textContent = tekst; b.onclick = fn; knapper.appendChild(b); return b; }
    function visVidere() { faerdig = true; knapper.innerHTML = ""; var b = knap(P.i + 1 >= P.koe.length ? "Afslut" : "Videre", true, videre); b.focus(); }
    function boks(klasse, hoved, html) { svar.innerHTML = '<div class="svar ' + klasse + '">' + (hoved ? '<div class="hoved">' + hoved + "</div>" : "") + (html || "") + "</div>"; }

    function tjek() {
      var r = c.tjek(); if (!r) { boks("info", "", "<p>Svar først — så tjekker jeg.</p>"); return; }
      forsoeg++;
      if (r.ok) { resultat(true); if (c.laas) c.laas(); boks("ok", forsoeg === 1 ? "✓ Rigtigt!" : "✓ Rigtigt — nu sad den.", r.html); visVidere(); }
      else if (erTest) {                         // i en test tæller første svar: vis det rigtige svar med det samme
        resultat(false); if (c.laas) c.laas();
        boks("nej", "✗ Forkert", r.html + '<div class="hoved facit-h">Det rigtige svar</div>' + c.vis()); visVidere();
      }
      else {
        resultat(false);
        boks("nej", "✗ Ikke helt.", r.html + (st.hint && st.t !== "skriv" ? "<p>Tip: " + inl(st.hint) + "</p>" : ""));
        knapper.innerHTML = "";
        knap("Vis svaret", false, function () { boks("info", "Svaret", c.vis()); if (c.laas) c.laas(); visVidere(); });
        knap("Prøv igen", true, function () { svar.innerHTML = ""; if (c.igen) c.igen(); normal(); });
      }
    }
    function normal() {
      knapper.innerHTML = "";
      if (erTest && c.tjek) knap("Ved ikke", false, function () { resultat(false); if (c.laas) c.laas(); boks("info", "Det rigtige svar", c.vis()); visVidere(); });
      if (c.tjek) knap("Tjek svar", true, tjek);
      else if (c.selvvurder) {
        knap("Sammenlign med et godt svar", true, function () {
          boks("info", "", c.sammenlign()); knapper.innerHTML = "";
          knap("Jeg kunne det ikke", false, function () { resultat(false); videre(); });
          knap("Jeg kunne det", true, function () { resultat(true); videre(); });
        });
      } else knap(P.i + 1 >= P.koe.length ? "Afslut" : "Videre", true, videre);
    }
    normal();
    $("#venstre").innerHTML = P.i > 0 && P.type === "lek" ? '<button type="button" class="knap" id="tilbage">← Tilbage</button>' : "";
    if ($("#tilbage")) $("#tilbage").onclick = function () { P.i--; visTrin(); };
    if (c.fokus) setTimeout(function () { try { c.fokus.focus(); } catch (e) { } }, 30);

    P.tast = function (e) {
      if (e.key !== "Enter") return;
      var iTekst = e.target && e.target.tagName === "TEXTAREA";
      if (iTekst && !(e.ctrlKey || e.metaKey)) return;                 // Enter i et tekstfelt = ny linje
      if (e.target && e.target.tagName === "BUTTON") return;           // knappen klarer det selv
      e.preventDefault();
      var pri = $(".knap.pri", knapper); if (pri) pri.click();
    };
  }
  document.addEventListener("keydown", function (e) { if (P && P.tast && /^#\/(l\/|rep|test)/.test(RUTE)) P.tast(e); });

  function slut() {
    var pct = P.tjekbare ? Math.round(100 * P.rigtige / P.tjekbare) : 100;
    if (P.type === "test") return testSlut();
    if (P.type === "lek") {
      var l = P.o.l;
      S.lek[l.id] = { d: dato() };
      P.koe.forEach(function (post) {            // læg lektionens opgaver i repetitionskassen
        if (!KAN_REPETERES[post.st.t] || S.rep[post.id]) return;
        var box = P.foerste[post.id] ? 2 : 1; S.rep[post.id] = { box: box, due: plusDage(INTERVAL[box]) };
      });
      gem();
      var idx = ALLE.indexOf(P.o), naeste = ALLE[idx + 1];
      var ord = (l.ord || []).map(function (o) { return "<div><dt>" + ordLink(o[0]) + "</dt><dd>" + inl(o[1]) + "</dd></div>"; }).join("");
      ramme('<div class="kort fest"><div class="stor">🎉</div><h1>Lektionen er færdig</h1><p>' + esc(l.titel) + "</p>" +
        (P.tjekbare ? "<p><b>" + P.rigtige + " af " + P.tjekbare + "</b> opgaver rigtige i første forsøg (" + pct + " %).</p>" : "") +
        '<p class="svag lille">Opgaverne kommer igen under <b>Repetition</b> — de svære i morgen, de lette om tre dage.</p>' +
        '<div class="rk" style="justify-content:center">' + (naeste ? '<a class="knap pri stor" href="#/l/' + naeste.l.id + '">Næste lektion →</a>' : "") +
        '<a class="knap" href="#/m/' + P.o.m.id + '">Til modulet</a></div></div>' +
        (ord ? '<div class="kort mt"><h2>Ord fra denne lektion</h2><dl class="ord">' + ord + "</dl></div>" : ""), true);
    } else {
      ramme('<div class="kort fest"><div class="stor">🧠</div><h1>Repetitionen er klaret</h1><p><b>' + P.rigtige + " af " + P.tjekbare + "</b> rigtige i første forsøg.</p>" +
        '<p class="svag lille">Det, du kunne, kommer igen om længere tid. Det, du ikke kunne, kommer igen i morgen.</p>' +
        '<div class="rk" style="justify-content:center">' + (forfaldne().length ? '<a class="knap pri" href="#/rep" id="mere">Tag en runde til</a>' : "") + '<a class="knap" href="#/">Til forsiden</a></div></div>', true);
      if ($("#mere")) $("#mere").onclick = function (e) { e.preventDefault(); startRep(); };
    }
    P = null;
  }
  function repTom() {
    P = null;
    var antal = Object.keys(S.rep).length;
    ramme('<div class="kort fest"><div class="stor">✅</div><h1>Intet at repetere lige nu</h1><p>' + (antal ? "Du har " + antal + " opgaver i kasserne. De dukker op her, når det er tid." : "Når du har lavet din første lektion, kommer opgaverne igen her — fordi man husker bedst det, man bliver spurgt om flere gange med nogle dages mellemrum.") +
      '</p><a class="knap pri" href="#/">Til forsiden</a></div>', true);
  }

  // ---------- sider ----------
  function topbar() {
    var h = RUTE, f = forfaldne().length;
    function a(href, tekst, ekstra) { var aktiv = href === "#/" ? (h === "" || h === "#/" || /^#\/[ml]\//.test(h)) : h.indexOf(href) === 0; return '<a href="' + href + '" class="' + (aktiv ? "aktiv" : "") + '">' + tekst + (ekstra || "") + "</a>"; }
    return '<div class="top"><div class="ind"><a class="logo" href="#/">Kode<span>12</span></a><nav class="nav">' +
      a("#/", "Kursus") + a("#/plan", "Plan") + a("#/rep", "Repetition", f ? '<span class="tal">' + f + "</span>" : "") + a("#/test", "Test") + a("#/soeg", "Søg") + a("#/ord", "Ordbog") + a("#/set", "Indstillinger") +
      '</nav><button type="button" class="osknap" id="osknap" title="Skift mellem Windows og Mac">' + (erMac() ? "⌘ Mac · Rider" : "⊞ Windows · Visual Studio") + "</button></div></div>";
  }
  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "osknap") { S.set.os = erMac() ? "win" : "mac"; gem(); brugSet(); if (P) visTrin(); else rute(); }
  });

  function forside() {
    var n = naesteLektion(), faerdige = Object.keys(S.lek).length, f = forfaldne().length;
    var da = dageTil(AFLEVERING), de = dageTil(EKSAMEN);
    function dageTekst(x) { return x > 1 ? "om " + x + " dage" : x === 1 ? "i morgen" : x === 0 ? "i dag" : "overstået"; }
    var html = '<div class="helt"><div class="kort stort">' +
      (n ? '<span class="maerke">' + (faerdige ? "Fortsæt her" : "Start her") + "</span><h1>" + esc(n.l.titel) + '</h1><p class="svag">' + esc(n.m.titel) + " · lektion " + (n.l.nr != null ? n.l.nr : n.i + 1) + " af " + n.m.lektioner.length + (n.l.min ? " · ca. " + n.l.min + " min" : "") + "</p>" +
        '<div class="rk"><a class="knap pri stor" href="#/l/' + n.l.id + '">' + (faerdige ? "Fortsæt" : "Kom i gang") + " →</a>" + (f ? '<a class="knap" href="#/rep">Repetér ' + f + " opgaver</a>" : "") + '<a class="knap" href="#/test">🎯 Test dig selv</a></div>'
        : '<h1>Du har lavet alle lektioner 🎉</h1><p>Brug Repetition hver dag, så det sidder til eksamen.</p><div class="rk"><a class="knap pri" href="#/rep">Repetition</a><a class="knap" href="#/test">🎯 Test dig selv</a></div>') +
      '</div><div class="kort"><div class="tal3"><div><b>' + faerdige + "</b><span>lektioner færdige</span></div><div><b>" + stribe() + "</b><span>dage i træk</span></div><div><b>" + (S.dage[dato()] || 0) + "</b><span>trin i dag</span></div></div>" +
      '<div class="mt"><div class="frist"><span>Aflevering af projekt + disposition<br><span class="lille svag">fredag 30. oktober</span></span><b>' + dageTekst(da) + '</b></div>' +
      '<div class="frist"><span>Mundtlig eksamen<br><span class="lille svag">fredag 6. november</span></span><b>' + dageTekst(de) + "</b></div></div></div></div>";
    html += planKort();
    var sidsteDel = null;
    K.forEach(function (m) {
      if (m.del !== sidsteDel) { if (sidsteDel !== null) html += "</div>"; html += '<div class="blok-h"><h2>' + esc(m.del || "Kursus") + '</h2></div><div class="moduler">'; sidsteDel = m.del; }
      var antal = (m.lektioner || []).length, pct = modulPct(m);
      html += '<a class="modul' + (antal ? "" : " tom") + '" href="#/m/' + m.id + '"><div class="ikon">' + (m.ikon || "📘") + '</div><div class="midt"><div class="t">' + esc(m.titel) + '</div><div class="d">' + esc(m.dag || "") +
        (antal ? " · " + antal + " lektioner" : " · kommer snart") + "</div>" + (antal ? '<div class="bar"><i style="width:' + pct + '%"></i></div>' : "") + "</div></a>";
    });
    if (K.length) html += "</div>";
    ramme(html);
  }

  function modulside(id) {
    var m = K.filter(function (x) { return x.id === id; })[0]; if (!m) return forside();
    var n = naesteLektion();
    var html = '<p><a href="#/">← Alle moduler</a></p><div class="kort"><div class="rk"><div style="font-size:2.4rem">' + (m.ikon || "📘") + '</div><div><h1 style="margin:0">' + esc(m.titel) + '</h1><div class="svag">' + esc(m.dag || "") + "</div></div></div>" +
      '<div class="mt">' + md(m.intro) + "</div>" +
      (m.video ? '<div class="video">🎬 <b>Lærerens optagelse til dagen:</b> ' + m.video.map(esc).join(" · ") + (m.videonote ? "<br>" + inl(m.videonote) : "") + "</div>" : "") + "</div>";
    var guide = (window.VIDEOGUIDE || {})[m.id];   // tidsstempler i lærerens optagelser (kursus/g*-videoguide.js)
    if (guide && guide.length) {
      html += '<details class="kort mt videoguide"><summary>🎬 Find emnerne i lærerens video (tidsstempler)</summary>' + guide.map(function (g) {
        return "<h3>" + esc(g.video) + '</h3><table class="tider">' + (g.punkter || []).map(function (p) { return "<tr><td>" + esc(p[0]) + "</td><td>" + inl(p[1]) + "</td></tr>"; }).join("") + "</table>";
      }).join("") + '<p class="lille svag">Tiderne er fundet i en maskinskrevet udskrift af optagelsen og kan ligge et halvt minut forkert.</p></details>';
    }
    if (!(m.lektioner || []).length) html += '<p class="mt svag">Lektionerne til dette modul er ikke lagt ind endnu.</p>';
    else html += '<p class="mt"><a class="knap" href="#/ark/' + m.id + '">📄 Opslag: hele modulet på én side</a></p>';
    html += '<div class="lekliste">' + (m.lektioner || []).map(function (l, i) {
      var f = S.lek[l.id], opg = l.trin.filter(function (s) { return KAN_REPETERES[s.t]; }).length;
      var prog = l.trin.filter(function (s) { return s.t === "opgave" || s.t === "ide"; }).length, ideNavn = erMac() ? "Rider" : "Visual Studio";
      return (l.afsnit ? '<h3 class="afsnit">' + esc(l.afsnit) + "</h3>" : "") + '<a class="lek' + (f ? " faerdig" : "") + (n && n.l === l ? " naeste" : "") + (l.vaerksted ? " vaerksted" : "") + '" href="#/l/' + l.id + '"><span class="nr">' + (f ? "✓" : l.vaerksted ? "💻" : l.nr != null ? l.nr : i + 1) + '</span><span><div class="t">' + esc(l.titel) + '</div><div class="d">' +
        (l.vaerksted ? prog + " programmer, du selv skriver i " + ideNavn : l.trin.length + " trin · " + opg + (opg === 1 ? " øvelse" : " øvelser") + (prog ? " · " + prog + " i " + ideNavn : "")) + (l.min ? " · ca. " + l.min + " min" : "") + '</div></span><span class="hoejre">' + (f ? "Færdig " + f.d.slice(8) + "/" + f.d.slice(5, 7) : n && n.l === l ? "Næste →" : "") + "</span></a>";
    }).join("") + "</div>";
    ramme(html, "mellem");
  }

  // ---------- studieplan (plan.js) ----------
  var MAANED = ["jan.", "feb.", "mar.", "apr.", "maj", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "dec."];
  function datoKort(iso) { return +iso.slice(8) + ". " + MAANED[+iso.slice(5, 7) - 1]; }
  function periode(f) { return f.fra === f.til ? datoKort(f.fra) : (f.fra.slice(5, 7) === f.til.slice(5, 7) ? +f.fra.slice(8) + ".–" + datoKort(f.til) : datoKort(f.fra) + " – " + datoKort(f.til)); }
  function planStatus() {
    var d = dato(), ud = { faser: [], nu: null, bagud: 0, foersteBagud: null };
    (window.STUDIEPLAN || []).forEach(function (f) {
      var lek = [];
      (f.moduler || []).forEach(function (id) { var m = K.filter(function (x) { return x.id === id; })[0]; if (m) (m.lektioner || []).forEach(function (l) { lek.push(l); }); });
      if (f.lektioner) lek = lek.filter(function (l) { return f.lektioner.indexOf(l.id) >= 0; });   // valgfrit: kun nogle af modulets lektioner
      var faerdige = lek.filter(function (l) { return S.lek[l.id]; }).length;
      var o = { f: f, antal: lek.length, faerdige: faerdige, naeste: lek.filter(function (l) { return !S.lek[l.id]; })[0] || null, tid: d < f.fra ? "kommer" : d > f.til ? "ovre" : "nu" };
      ud.faser.push(o);
      if (o.tid === "nu") ud.nu = o;
      if (o.tid === "ovre" && o.naeste && !f.valgfri) { ud.bagud += o.antal - o.faerdige; if (!ud.foersteBagud) ud.foersteBagud = o.naeste; }
    });
    if (!ud.nu) ud.nu = ud.faser.filter(function (o) { return o.tid === "kommer"; })[0] || null;
    return ud;
  }
  function planKort() {
    var p = planStatus(), o = p.nu; if (!o) return "";
    var pct = o.antal ? Math.round(100 * o.faerdige / o.antal) : 0;
    return '<div class="kort mt plan"><div class="rk"><span class="maerke">' + (o.tid === "kommer" ? "Planen starter " + datoKort(o.f.fra) : "Dagens plan · " + periode(o.f)) + '</span><a class="lille" href="#/plan" style="margin-left:auto">Se hele planen →</a></div>' +
      "<h2>" + esc(o.f.titel) + "</h2>" + md(o.f.tekst) +
      (o.antal ? '<div class="bar"><i style="width:' + pct + '%"></i></div><p class="lille svag" style="margin-top:.4rem">' + o.faerdige + " af " + o.antal + " lektioner i denne del af planen er færdige.</p>" : "") +
      '<div class="rk">' + (o.naeste ? '<a class="knap pri" href="#/l/' + o.naeste.id + '">Næste i planen: ' + esc(o.naeste.titel) + " →</a>" : o.antal ? "<b>✓ Denne del af planen er klaret.</b>" : "") + "</div>" +
      (p.bagud ? '<p class="plan-bagud">Du mangler <b>' + p.bagud + "</b> " + (p.bagud === 1 ? "lektion" : "lektioner") + ' fra tidligere dage. <a href="#/l/' + p.foersteBagud.id + '">Tag den første af dem</a> — eller bliv i dagens plan, og hent dem senere. Planen er en hjælp, ikke en dom.</p>' : "") + "</div>";
  }
  function planside() {
    var p = planStatus();
    var html = '<h1>Planen frem til eksamen</h1><p class="svag">Et forslag til, hvad du tager hvornår. Den er lagt, så det, dit projekt bygger på, kommer først. Bliver du forsinket, så spring hellere et værksted over end en hel dag.</p>';
    p.faser.forEach(function (o) {
      var pct = o.antal ? Math.round(100 * o.faerdige / o.antal) : 0, f = o.f;
      html += '<div class="kort mt planfase ' + o.tid + '"><div class="rk"><span class="maerke">' + periode(f) + (o.tid === "nu" ? " · i dag" : "") + "</span>" + (o.antal ? '<span class="lille svag" style="margin-left:auto">' + o.faerdige + " / " + o.antal + " lektioner</span>" : "") + "</div><h2>" + esc(f.titel) + "</h2>" + md(f.tekst) +
        (o.antal ? '<div class="bar"><i style="width:' + pct + '%"></i></div>' : "") +
        '<div class="rk" style="margin-top:.7rem">' + (f.moduler || []).map(function (id) { var m = K.filter(function (x) { return x.id === id; })[0]; return m ? '<a class="knap" href="#/m/' + m.id + '">' + (m.ikon || "") + " " + esc(m.titel) + (modulPct(m) === 100 ? " ✓" : "") + "</a>" : ""; }).join("") + "</div></div>";
    });
    ramme(html, "mellem");
  }

  // ---------- søgning i alle lektioner ----------
  var SOEG = null;
  function soeg() {
    ramme('<h1>Søg i lektionerne</h1><p class="svag">Skriv et ord eller et stykke kode, fx <code>Include</code>, <code>foreach</code> eller <code>primærnøgle</code>. Flere ord: alle skal findes i samme trin.</p><input class="soeg" id="sq" placeholder="Søg …" autocomplete="off"><div id="sres"></div>', "mellem");
    if (!SOEG) {
      SOEG = [];
      ALLE.forEach(function (o) {
        o.l.trin.forEach(function (st, i) {
          var t = ren([st.h, st.q, st.md, st.md2, st.fordi, typeof st.svar === "string" ? st.svar : "", (st.krav || []).join(" "), (st.noter || []).map(function (n) { return n.join(" "); }).join(" "), st.kode, st.loesning].filter(Boolean).join("  "));
          SOEG.push({ o: o, i: i, st: st, tekst: t, lille: t.toLowerCase() });
        });
      });
    }
    var felt = $("#sq"), res = $("#sres");
    felt.oninput = function () {
      var ord = felt.value.toLowerCase().split(/\s+/).filter(Boolean);
      if (!ord.length || ord.join("").length < 2) { res.innerHTML = ""; return; }
      var fund = SOEG.filter(function (x) { return ord.every(function (w) { return x.lille.indexOf(w) !== -1; }); });
      fund.sort(function (a, b) { return (b.st.t === "laes") - (a.st.t === "laes"); });   // forklaringer først, så opgaver
      res.innerHTML = '<p class="lille svag">' + fund.length + " trin fundet" + (fund.length > 60 ? " — viser de første 60" : "") + '.</p><div class="lekliste">' + fund.slice(0, 60).map(function (x) {
        var p = x.lille.indexOf(ord[0]), fra = Math.max(0, p - 60), bid = x.tekst.slice(fra, p + 110).replace(/\s+/g, " ");
        var vist = esc((fra ? "… " : "") + bid + " …").replace(new RegExp("(" + ord.map(function (w) { return esc(w).replace(/[.*+?^{}()|[\]\\$]/g, "\\$&"); }).join("|") + ")", "gi"), "<mark>$1</mark>");
        return '<a class="lek" href="#/l/' + x.o.l.id + "/" + (x.i + 1) + '"><span class="nr">' + IKON[x.st.t] + '</span><span><div class="t">' + esc(kortTitel(x.st)) + '</div><div class="d">' + esc(x.o.m.titel) + " · " + esc(x.o.l.titel) + " · trin " + (x.i + 1) + '</div><div class="uddrag">' + vist + "</div></span></a>";
      }).join("") + "</div>";
    };
    felt.focus();
  }

  // Opslag: hele modulets forklaringer, kodeeksempler og fagord på én side. Laves automatisk ud fra lektionerne.
  function opslag(id) {
    var m = K.filter(function (x) { return x.id === id; })[0]; if (!m) return forside();
    var html = '<p><a href="#/m/' + m.id + '">← ' + esc(m.titel) + '</a></p><h1>Opslag: ' + esc(m.titel) + '</h1><p class="svag">Alt det vigtige fra modulet samlet på én side. Brug den som opslagsværk, mens du programmerer — du skal ikke kunne det udenad. Søg på siden med ' + (erMac() ? "⌘ + F" : "Ctrl + F") + ".</p>";
    (m.lektioner || []).forEach(function (l) {
      var dele = l.trin.filter(function (st) { return st.t === "laes" && (st.kode || st.noter); });
      if (!dele.length && !(l.ord || []).length) return;
      html += '<div class="kort mt ark"><h2>' + esc(l.titel) + "</h2>";
      dele.forEach(function (st) { html += (st.h ? "<h3>" + inl(st.h) + "</h3>" : "") + md(st.md) + kodeblok(st.kode, st.sprog) + noter(st) + udblok(st.output) + md(st.md2); });
      if ((l.ord || []).length) html += '<h3>Fagord</h3><dl class="ord">' + l.ord.map(function (o) { return "<div><dt>" + ordLink(o[0]) + "</dt><dd>" + inl(o[1]) + "</dd></div>"; }).join("") + "</dl>";
      html += "</div>";
    });
    ramme(html, "mellem");
  }

  // ---------- ordbog: alle fagord og tegn, med søgning, emner og en side pr. opslag ----------
  // Fagordene kommer fra lektionernes ordlister, tegnene fra tegn.js. Samme ord fra flere lektioner bliver ét opslag med flere forklaringer.
  var OB = null, NOTER = null, ORDQ = "", ORDKAT = "alle";
  function obNoegle(s) { s = String(s).trim(); var k = s.replace(/\s+\([^)]*\)$/, ""); return (k || s).toLowerCase(); }
  function ordHref(navn) { return "#/ord/" + encodeURIComponent(obNoegle(navn)); }
  function ordLink(navn) { return '<a class="ordlink" href="' + ordHref(navn) + '">' + esc(navn) + "</a>"; }
  function dekod(s) { try { return decodeURIComponent(s); } catch (e) { return s; } }
  function erTegnTekst(s) { return !/[A-Za-zÆØÅæøåé0-9]/.test(s); }
  function rx(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function ordRe(navn, flag) { return new RegExp("(^|[^A-Za-zÆØÅæøå0-9_])" + rx(navn) + "(?![A-Za-zÆØÅæøå0-9_])", flag || "i"); }
  function obByg() {
    if (OB) return OB;
    var poster = [], idx = Object.create(null), orden = (KX.liste || []).map(function (k) { return k.id; });
    function post(navn) {
      var k = obNoegle(navn), p = idx[k];
      if (!p) { p = idx[k] = { key: k, navn: navn, varianter: [], fag: {}, skade: false, kilder: [], tegn: null }; poster.push(p); }
      if (p.varianter.indexOf(navn) < 0) p.varianter.push(navn);
      return p;
    }
    (window.TEGN || []).forEach(function (t) { var p = post(t.tegn); p.tegn = t; (t.kat || []).forEach(function (k) { p.fag[k] = 1; }); });
    ALLE.forEach(function (o) {
      (o.l.ord || []).forEach(function (x) {
        var p = post(x[0]), skade = o.m.id === "m30" || o.m.id === "m31";
        p.kilder.push({ tekst: String(x[1]), o: o });
        var fag = (KX.lektion || {})[o.l.id] || (skade ? (KX.skadeappFag || {})[o.l.id] : (KX.modul || {})[o.m.id]);
        if (fag) p.fag[fag] = 1;
        if (skade) p.skade = true;
      });
    });
    poster.forEach(function (p) {
      var ov = (KX.ord || {})[p.key], kat = ov && !p.tegn ? [].concat(ov) : Object.keys(p.fag);
      if (p.skade && kat.indexOf("skadeapp") < 0) kat.push("skadeapp");
      p.kat = kat.sort(function (a, b) { return orden.indexOf(a) - orden.indexOf(b); });
      p.navn = p.tegn ? p.tegn.tegn : (p.varianter.filter(function (v) { return !/\s\(/.test(v); })[0] || p.varianter[0]);   // opslagsordet: helst navnet uden parentes
      p.egne = p.varianter.map(function (v) { return v.toLowerCase(); });   // opslagets egne navne; et præcist match på dem vinder over et match på en ekstra søgeord
      p.soeg = p.egne.concat(p.tegn ? [p.tegn.navn].concat(p.tegn.soeg || []).map(function (v) { return String(v).toLowerCase(); }) : []);
      p.navne = p.varianter.map(function (v) { return v.replace(/\s+\([^)]*\)$/, ""); });
      p.kort = p.tegn ? p.tegn.kort : (p.kilder[0] ? p.kilder[0].tekst : "");
      p.alfa = p.tegn ? p.tegn.tegn : (p.navn.replace(/^[^A-Za-zÆØÅæøåé0-9]+/, "") || p.navn);   // [Authorize] står under A, @bind under B
    });
    poster.sort(function (a, b) { return a.alfa.localeCompare(b.alfa, "da", { sensitivity: "base" }); });
    OB = { poster: poster, idx: idx };
    return OB;
  }
  function obSoeg(q, kat) {
    var ob = obByg(); q = q.trim().toLowerCase();
    var liste = ob.poster.filter(function (p) { return kat === "alle" || (kat === "tegn" ? !!p.tegn : p.kat.indexOf(kat) >= 0); });
    if (!q) return liste.map(function (p) { return { p: p, s: 0 }; });
    var tegnQ = erTegnTekst(q), ordStart = new RegExp("(^|[^a-zæøå0-9])" + rx(q)), ud = [];
    liste.forEach(function (p) {
      var s = 0;
      p.soeg.forEach(function (n) {
        if (n === q) s = Math.max(s, p.egne.indexOf(n) >= 0 ? 100 : 90);
        else if (tegnQ) {      // et tegn: det skal stå forrest eller bagerst i et af navnets ord, fx @bind, int? eller ?.
          n.split(/\s+/).forEach(function (t) { t = t.replace(/^\((.*)\)$/, "$1"); if (t === q) s = Math.max(s, 85); else if (t.indexOf(q) === 0 || t.slice(-q.length) === q) s = Math.max(s, 60); });
        } else if (n.indexOf(q) === 0) s = Math.max(s, 80);
        else if (ordStart.test(n)) s = Math.max(s, 70);
        else if (n.indexOf(q) >= 0) s = Math.max(s, 55);
      });
      if (!s && !tegnQ && q.length >= 3) {
        var tekst = ((p.tegn ? p.tegn.kort : "") + " " + p.kilder.map(function (k) { return k.tekst; }).join(" ")).toLowerCase();
        if (tekst.indexOf(q) >= 0) s = 20;
      }
      if (s) ud.push({ p: p, s: s });
    });
    ud.sort(function (a, b) { return b.s - a.s || a.p.alfa.localeCompare(b.p.alfa, "da", { sensitivity: "base" }); });
    return ud;
  }
  // Kodeforklaringerne i lektionerne (noter): små stykker kode med en forklaring ved siden af
  function noterIdx() {
    if (NOTER) return NOTER;
    NOTER = []; var set = {};
    ALLE.forEach(function (o) { o.l.trin.forEach(function (st, i) { (st.noter || []).forEach(function (n) { var k = n[0] + "|" + n[1]; if (set[k]) return; set[k] = 1; NOTER.push({ kode: String(n[0]), tekst: String(n[1]), o: o, i: i }); }); }); });
    return NOTER;
  }
  function noterHtml(liste) {
    return '<div class="noter">' + liste.map(function (n) {
      return "<div><code>" + esc(n.kode) + "</code><span>" + inl(n.tekst) + ' <a class="lille" href="#/l/' + n.o.l.id + "/" + (n.i + 1) + '">' + esc(n.o.m.titel) + " →</a></span></div>";
    }).join("") + "</div>";
  }
  function noterFind(test, maks) {
    var fund = noterIdx().filter(function (n) { return test(n.kode); });
    fund.sort(function (a, b) { return a.kode.length - b.kode.length; });
    return { fund: fund.slice(0, maks), antal: fund.length };
  }
  function noterTilSoeg(q) {
    q = q.trim(); if (!q || (q.length < 2 && !erTegnTekst(q))) return { fund: [], antal: 0 };
    var lq = q.toLowerCase(), tegnQ = erTegnTekst(q);
    return noterFind(function (k) { return tegnQ ? k.indexOf(q) >= 0 : k.toLowerCase().indexOf(lq) >= 0; }, 12);
  }
  function noterTilPost(p) {
    if (p.tegn) {
      var t = p.tegn, tegn = [t.tegn].concat((t.soeg || []).filter(erTegnTekst)).filter(function (x) { return !/\s/.test(x) && !(x.length === 1 && /[;,.(){}\[\]=+\-*\/<>:"']/.test(x)); });
      if (!tegn.length) return [];
      return noterFind(function (k) { return tegn.some(function (x) { return k.indexOf(x) >= 0; }); }, 8).fund;
    }
    // Fagord: med store og små bogstaver præcis som i ordet. Noter fra de lektioner, hvor ordet er forklaret, og noter om netop ordet kommer først.
    var navne = p.navne.filter(function (n) { return n.length >= 2; }), re = navne.map(function (n) { return ordRe(n, ""); }), egne = {};
    if (!re.length) return [];
    p.kilder.forEach(function (k) { egne[k.o.l.id] = 1; });
    var fund = noterIdx().filter(function (n) { return re.some(function (r) { return r.test(n.kode); }); });
    function vaegt(n) { return (navne.indexOf(n.kode.trim()) >= 0 ? 0 : 2) + (egne[n.o.l.id] ? 0 : 1); }
    fund.sort(function (a, b) { return vaegt(a) - vaegt(b) || a.kode.length - b.kode.length; });
    return fund.slice(0, 8);
  }
  function laesTekst(st) { return [st.h, st.md, st.md2, (st.noter || []).map(function (n) { return n.join(" "); }).join(" "), st.kode].filter(Boolean).join(" "); }
  function findForklaring(o, p) {     // det første læsetrin i lektionen, hvor ordet står
    var re = p.navne.map(function (n) { return ordRe(n); });
    for (var i = 0; i < o.l.trin.length; i++) { var st = o.l.trin[i]; if (st.t === "laes" && re.some(function (r) { return r.test(laesTekst(st)); })) return i + 1; }
    return 1;
  }
  function brugtI(p) {                // andre lektioner, hvor ordet står i et læsetrin
    var egne = {}, ud = [], re = p.navne.filter(function (n) { return n.length >= 3; }).map(function (n) { return ordRe(n); });
    if (!re.length) return ud;
    p.kilder.forEach(function (k) { egne[k.o.l.id] = 1; });
    for (var n = 0; n < ALLE.length && ud.length < 8; n++) {
      var o = ALLE[n]; if (egne[o.l.id]) continue;
      for (var i = 0; i < o.l.trin.length; i++) { var st = o.l.trin[i]; if (st.t === "laes" && re.some(function (r) { return r.test(laesTekst(st)); })) { ud.push({ o: o, i: i }); break; } }
    }
    return ud;
  }
  function bogstav(alfa) { var c = alfa.charAt(0).toUpperCase(); if (c === "É") c = "E"; return /[A-ZÆØÅ]/.test(c) ? c : "Tegn og tal"; }
  function navnHtml(p) { return p.tegn ? "<code>" + esc(p.tegn.visning || p.tegn.tegn) + "</code>" : /[@<>\[\]{}=_]|\(\)|\.[A-Za-z]/.test(p.navn) ? "<code>" + esc(p.navn) + "</code>" : esc(p.navn); }
  function ordChip(p) { return '<a class="ordchip" href="#/ord/' + encodeURIComponent(p.key) + '">' + navnHtml(p) + "</a>"; }
  function ordKort(p) {
    var kort = String(p.kort || "").replace(/[*`]/g, ""); if (kort.length > 170) kort = kort.slice(0, 168).replace(/\s+\S*$/, "") + " …";
    return '<a class="ordpost" href="#/ord/' + encodeURIComponent(p.key) + '"><div class="navn">' + navnHtml(p) + (p.tegn ? '<span class="under">' + esc(p.tegn.navn) + "</span>" : "") + "</div>" +
      (kort ? '<div class="kort-t">' + esc(kort) + "</div>" : "") +
      "<div>" + p.kat.map(function (k) { return '<span class="katm">' + esc(katNavn(k)) + "</span>"; }).join("") + "</div></a>";
  }

  function ordbog() {
    var ob = obByg(), antal = { alle: ob.poster.length, tegn: 0 };
    ob.poster.forEach(function (p) { if (p.tegn) antal.tegn++; p.kat.forEach(function (k) { antal[k] = (antal[k] || 0) + 1; }); });
    var chips = [["alle", "Alle"], ["tegn", "🔣 Tegn"]].concat((KX.liste || []).map(function (k) { return [k.id, k.ikon + " " + k.navn]; })).filter(function (c) { return antal[c[0]]; });
    if (!antal[ORDKAT]) ORDKAT = "alle";
    ramme('<h1>Ordbog</h1><p class="svag">' + ob.poster.length + " ord og tegn fra hele kurset. Søg på et ord, et stykke kode eller et tegn, fx <code>=></code>, <code>?</code>, <code>@bind</code> eller <code>Include</code>. Klik på et opslag for at læse mere.</p>" +
      '<input class="soeg" id="soeg" placeholder="Søg efter et ord eller et tegn …" autocomplete="off" autocapitalize="off" spellcheck="false">' +
      '<div class="chips" id="chips">' + chips.map(function (c) { return '<button type="button" data-k="' + c[0] + '" class="' + (ORDKAT === c[0] ? "aktiv" : "") + '">' + esc(c[1]) + "<small>" + antal[c[0]] + "</small></button>"; }).join("") + "</div>" +
      '<div id="ordres"></div>', "mellem");
    var felt = $("#soeg"); felt.value = ORDQ;
    function tegn() {
      ORDQ = felt.value;
      var q = ORDQ.trim(), fund = obSoeg(ORDQ, ORDKAT), html = "", sidst = null;
      if (q) html += '<p class="lille svag">' + (fund.length ? fund.length + " opslag" : "Ingen opslag") + " passer på <b>" + esc(q) + "</b>" + (ORDKAT !== "alle" ? " i det valgte emne" : "") + ".</p>";
      html += '<div class="ordliste">' + fund.map(function (f) {
        var g = "";
        if (!q) { var b = bogstav(f.p.alfa); if (b !== sidst) { g = '<div class="ordbogstav">' + esc(b) + "</div>"; sidst = b; } }
        return g + ordKort(f.p);
      }).join("") + "</div>";
      if (q && ORDKAT === "alle") {
        var nf = noterTilSoeg(q);
        if (nf.antal) html += '<h2 class="mt">I kodeeksemplerne</h2><p class="lille svag">Forklaringer til kode i lektionerne, hvor <code>' + esc(q) + "</code> indgår" + (nf.antal > nf.fund.length ? ". Viser " + nf.fund.length + " af " + nf.antal : "") + ".</p>" + noterHtml(nf.fund);
      }
      $("#ordres").innerHTML = html;
    }
    $$("#chips button").forEach(function (b) { b.onclick = function () { ORDKAT = b.getAttribute("data-k"); $$("#chips button").forEach(function (x) { x.className = x === b ? "aktiv" : ""; }); tegn(); }; });
    felt.oninput = tegn; tegn(); felt.focus();
  }

  function ordPost(noegle) {
    var ob = obByg(), p = ob.idx[noegle];
    if (!p) { ramme('<p><a href="#/ord">← Ordbog</a></p><div class="kort"><h1>Ikke fundet</h1><p>Der er intet opslag, der hedder <b>' + esc(noegle) + "</b>.</p></div>", true); return; }
    var t = p.tegn, html = '<p><a href="#/ord">← Ordbog</a></p><div class="kort ordside"><h1 class="ordtitel">' + navnHtml(p) + "</h1>";
    if (t) html += '<p class="ordnavn">' + esc(t.navn) + "</p>";
    var andre = p.varianter.filter(function (v) { return v !== p.navn; });
    if (andre.length) html += '<p class="lille svag">Står også som: ' + andre.map(esc).join(" · ") + "</p>";
    html += "<div>" + p.kat.map(function (k) { return '<a class="katm" href="#/ord" data-kat="' + k + '">' + esc(katNavn(k)) + "</a>"; }).join("") + "</div>";
    if (t) {
      html += '<p class="ordkort">' + inl(t.kort) + "</p>";
      (t.betydninger || []).forEach(function (b) { html += '<div class="betydning"><h3>' + inl(b.h) + "</h3>" + md(b.md || "") + kodeblok(b.kode, b.sprog) + "</div>"; });
    }
    html += "</div>";
    if (p.kilder.length) {         // samme forklaring i flere lektioner vises én gang
      var grupper = [], efterTekst = {};
      p.kilder.forEach(function (k) { var g = efterTekst[k.tekst]; if (!g) { g = efterTekst[k.tekst] = { tekst: k.tekst, o: [] }; grupper.push(g); } g.o.push(k.o); });
      html += '<div class="kort mt"><h2>' + (t ? "Forklaret i lektionerne" : grupper.length > 1 ? "Forklaringer fra kurset" : "Forklaring fra kurset") + "</h2>" + grupper.map(function (g) {
        return '<div class="kilde">' + md(g.tekst) + g.o.map(function (o) { return '<div class="hvor">' + esc(lekNavn(o)) + ' · <a href="#/l/' + o.l.id + "/" + findForklaring(o, p) + '">Læs i lektionen →</a></div>'; }).join("") + "</div>";
      }).join("") + "</div>";
    }
    var nf = noterTilPost(p);
    if (nf.length) html += '<div class="kort mt"><h2>' + (t ? "Sådan ser det ud i koden" : "Står i lektionernes noter") + '</h2><p class="lille svag">' +
      (t ? "Kodestykker fra lektionerne, hvor tegnet indgår, med forklaringen fra lektionen." : "Korte noter fra lektionerne, hvor ordet står, med forklaringen fra lektionen. Nogle steder er det bare et navn i et eksempel.") +
      " Klik på modulet for at se hele trinnet.</p>" + noterHtml(nf) + "</div>";
    if (!t) {
      var brugt = brugtI(p);
      if (brugt.length) html += '<div class="kort mt"><h2>Står også i</h2><div class="lekliste">' + brugt.map(function (b) {
        return '<a class="lek" href="#/l/' + b.o.l.id + "/" + (b.i + 1) + '"><span class="nr">' + (b.o.m.ikon || "📘") + '</span><span><div class="t">' + esc(b.o.l.titel) + '</div><div class="d">' + esc(b.o.m.titel) + "</div></span></a>";
      }).join("") + "</div></div>";
    }
    var se = [], fra = [];
    if (t) (t.se || []).forEach(function (k) { var q = ob.idx[k]; if (q && q !== p && se.indexOf(q) < 0) se.push(q); });
    p.kilder.forEach(function (k) { (k.o.l.ord || []).forEach(function (x) { var q = ob.idx[obNoegle(x[0])]; if (q && q !== p && se.indexOf(q) < 0 && fra.indexOf(q) < 0) fra.push(q); }); });
    if (se.length || fra.length) html += '<div class="kort mt">' + (se.length ? "<h2>Se også</h2><p>" + se.map(ordChip).join(" ") + "</p>" : "") +
      (fra.length ? "<h2>Andre ord fra samme lektion</h2><p>" + fra.slice(0, 16).map(ordChip).join(" ") + "</p>" : "") + "</div>";
    ramme(html, true);
    $$("a[data-kat]").forEach(function (a) { a.onclick = function () { ORDKAT = a.getAttribute("data-kat"); ORDQ = ""; }; });
  }

  // ---------- test: find ud af, hvad du kan, og hvad du mangler ----------
  // Spørgsmålene er lektionernes egne opgaver. Kun dem, der kan stå alene, kommer med: ikke dem, der bygger på et tidligere trin.
  var TEST_TYPER = { valg: 1, forudsig: 1, udfyld: 1, fejl: 1, orden: 1, spor: 1 };
  var TEST_KONTEKST = /ovenfor|herover|forrige|lige (har|lavede|skrev|så|læste|oprettede|byggede)|i trin|trin \d|denne lektion|i lektionen|eksemplet|samme kode|koden fra|du lige|som før|tidligere i/i;
  var TEST_LAENGDE = [[15, "Kort"], [30, "Mellem"], [50, "Lang"]];
  function testValg() { var v = S.set.tv || {}; return { emne: v.emne || "alle", antal: +v.antal || 15, fra: v.fra || "alt", slags: v.slags || "quiz" }; }
  function testPulje(slags, kunLavet) {
    var ude = {}, udeLek = {}, ud = [];
    (KX.testUde || []).forEach(function (id) { ude[id] = 1; });
    (KX.testUdeLektioner || []).forEach(function (id) { udeLek[id] = 1; });
    ALLE.forEach(function (o) {
      if (udeLek[o.l.id] || (kunLavet && !S.lek[o.l.id])) return;
      o.l.trin.forEach(function (st, i) {
        var id = trinId(o.l.id, i);
        if (slags === "forklar" ? st.t !== "forklar" : !TEST_TYPER[st.t]) return;
        if (ude[id] || TEST_KONTEKST.test((st.h || "") + " " + (st.q || ""))) return;
        ud.push({ st: st, id: id, o: o, i: i, kat: testKat(o) });
      });
    });
    return ud;
  }
  // Vælg spørgsmål fra så mange forskellige lektioner som muligt. Spørgsmål, du ikke har haft i en test før, kommer først.
  function vaelgSpm(pulje, antal, blandet) {
    var set = {};
    S.test.forEach(function (t) { (t.svar || []).forEach(function (s) { set[s[0]] = 1; }); });
    function rundt(liste, n) {     // én fra hver lektion ad gangen, lektionerne i tilfældig rækkefølge
      var lek = {}, navne = [], ud = [];
      bland(liste).forEach(function (p) { var k = p.o.l.id; if (!lek[k]) { lek[k] = []; navne.push(k); } lek[k].push(p); });
      navne = bland(navne);
      for (var r = 0; ud.length < n; r++) {
        var fik = false;
        navne.forEach(function (k) { if (ud.length < n && lek[k][r]) { ud.push(lek[k][r]); fik = true; } });
        if (!fik) break;
      }
      return ud;
    }
    function fordel(liste, n) {    // først spørgsmål, du ikke har haft i en test; er der ikke nok, så dem, du har haft
      var ud = rundt(liste.filter(function (p) { return !set[p.id]; }), n);
      return ud.length < n ? ud.concat(rundt(liste.filter(function (p) { return set[p.id]; }), n - ud.length)) : ud;
    }
    function iKursusorden(a, b) { return LEKNR[a.o.l.id] - LEKNR[b.o.l.id] || a.i - b.i; }
    if (!blandet) return fordel(pulje, antal).sort(iKursusorden);
    // Blandet: mindst ét spørgsmål fra hvert emne (hvis der er plads), resten efter emnets størrelse
    var grp = {}, kats = [];
    pulje.forEach(function (p) { if (!grp[p.kat]) { grp[p.kat] = []; kats.push(p.kat); } grp[p.kat].push(p); });
    var orden = (KX.liste || []).map(function (k) { return k.id; });
    kats.sort(function (a, b) { return (orden.indexOf(a) + 1 || 99) - (orden.indexOf(b) + 1 || 99); });
    var kvote = {}, rest = Math.min(antal, pulje.length);
    if (rest < kats.length) bland(kats).slice(0, rest).forEach(function (k) { kvote[k] = 1; });
    else {
      kats.forEach(function (k) { kvote[k] = 1; }); rest -= kats.length;
      while (rest > 0) {
        var bedst = null, bv = -1;
        kats.forEach(function (k) { if (kvote[k] < grp[k].length) { var v = Math.sqrt(grp[k].length) / (kvote[k] + 1); if (v > bv) { bv = v; bedst = k; } } });
        if (!bedst) break; kvote[bedst]++; rest--;
      }
    }
    var ud = [];
    kats.forEach(function (k) { if (kvote[k]) ud = ud.concat(fordel(grp[k], kvote[k]).sort(iKursusorden)); });
    return ud;
  }
  function minutter(antal, slags) { return Math.max(5, Math.round(antal * (slags === "forklar" ? 100 : 40) / 60 / 5) * 5); }
  function niveau(pct) { return pct >= 90 ? ["Rigtig stærkt", "ok"] : pct >= 75 ? ["Godt", "ok"] : pct >= 50 ? ["På vej", "gul"] : ["Skal trænes", "fejl"]; }
  function testEmne(t) { return t.emne === "alle" ? "Alle emner" : katNavn(t.emne); }

  function testside(besked) {
    var v = testValg(), pulje = testPulje(v.slags, v.fra === "lavet"), antal = { alle: pulje.length };
    pulje.forEach(function (p) { antal[p.kat] = (antal[p.kat] || 0) + 1; });
    if (v.emne !== "alle" && !antal[v.emne]) v.emne = "alle";
    var lavet = Object.keys(S.lek).filter(function (id) { return LEK[id]; }).length;
    var iEmne = antal[v.emne] || 0, faktisk = Math.min(v.antal, iEmne);
    function gruppe(navn, noegle, valg, note) {
      return '<div class="felt"><b>' + navn + '</b><div class="vaelg">' + valg.map(function (x) {
        return '<button type="button" data-k="' + noegle + '" data-v="' + x[0] + '" class="' + (String(v[noegle]) === String(x[0]) ? "aktiv" : "") + '"' + (x[2] === false ? " disabled" : "") + ">" + x[1] + "</button>";
      }).join("") + "</div>" + (note ? '<p class="lille svag" style="margin:.45rem 0 0">' + note + "</p>" : "") + "</div>";
    }
    var emner = [["alle", "Alle emner, blandet <small>" + antal.alle + "</small>"]].concat((KX.liste || []).filter(function (k) { return antal[k.id]; }).map(function (k) { return [k.id, esc(k.ikon + " " + k.navn) + " <small>" + antal[k.id] + "</small>"]; }));
    var html = '<h1>Test dig selv</h1><p class="svag">Testen viser, hvad du kan, og hvad du mangler. Du får ét forsøg pr. spørgsmål og ser det rigtige svar med det samme. Til sidst får du point pr. emne og en liste over præcis de lektioner, du skal læse.</p>' +
      (besked ? '<p class="plan-bagud">' + esc(besked) + "</p>" : "") + '<div class="kort testvalg">' +
      gruppe("Slags", "slags", [["quiz", "❓ Spørgsmål, siden retter"], ["forklar", "🗣️ Forklar med egne ord"]],
        v.slags === "forklar" ? "Som til den mundtlige eksamen: du skriver eller siger svaret selv, ser et godt svar og vurderer ærligt, om du kunne det." : "Svarmuligheder, kode, du skal forudsige, udfylde eller finde fejlen i, og linjer, du skal sætte i rækkefølge.") +
      gruppe("Emne", "emne", emner, v.emne !== "alle" && KAT[v.emne] ? esc(KAT[v.emne].tekst) : "Blandet: spørgsmål fra alle emner, så du ser, hvor du står i det hele.") +
      gruppe("Længde", "antal", TEST_LAENGDE.map(function (l) { return [l[0], l[1] + " · " + l[0] + " spørgsmål · ca. " + minutter(l[0], v.slags) + " min"]; }),
        !faktisk ? "Ingen spørgsmål passer. Vælg Hele kurset eller et andet emne." : faktisk < v.antal ? "Der er kun " + faktisk + " spørgsmål, der passer, så testen bliver på " + faktisk + "." : "") +
      gruppe("Spørgsmål fra", "fra", [["alt", "Hele kurset"], ["lavet", "Kun lektioner, jeg har lavet (" + lavet + ")", lavet > 0]],
        v.fra === "alt" ? "Hele kurset finder også huller i det, du ikke har lært endnu. Det er meningen." : "") +
      '<div class="rk"><button type="button" class="knap pri stor" id="start"' + (faktisk ? "" : " disabled") + ">Start testen →</button></div></div>" + testOversigt();
    ramme(html, "mellem");
    $$(".testvalg .vaelg button").forEach(function (b) { b.onclick = function () { var tv = testValg(), k = b.getAttribute("data-k"), x = b.getAttribute("data-v"); tv[k] = k === "antal" ? +x : x; S.set.tv = tv; gem(); testside(); }; });
    $("#start").onclick = function () { var tv = testValg(); tv.emne = v.emne; startTest(tv); };
  }
  function testOversigt() {
    if (!S.test.length) return '<div class="kort mt"><h2>Sådan står du</h2><p class="svag">Når du har taget din første test, ser du her, hvordan det går i hvert emne, og om du bliver bedre.</p></div>';
    var pr = {};      // resultaterne pr. emne, ældste først (kun tests, hvor siden retter)
    S.test.forEach(function (t) {
      if (t.slags === "forklar") return;
      var k = {}; (t.svar || []).forEach(function (s) { var x = k[s[2]] = k[s[2]] || [0, 0]; x[1]++; if (s[1]) x[0]++; });
      Object.keys(k).forEach(function (id) { (pr[id] = pr[id] || []).push({ r: k[id][0], n: k[id][1] }); });
    });
    var raekker = (KX.liste || []).filter(function (k) { return pr[k.id]; }).map(function (k) {
      var e = pr[k.id], s = e[e.length - 1], f = e[e.length - 2], pct = Math.round(100 * s.r / s.n), fp = f ? Math.round(100 * f.r / f.n) : null, niv = niveau(pct);
      var pil = fp == null || fp === pct ? "" : pct > fp ? ' <span class="op" title="Bedre end sidst">▲</span>' : ' <span class="ned" title="Dårligere end sidst">▼</span>';
      return '<div class="katraekke"><span>' + esc(katNavn(k.id)) + '</span><div class="bar ' + niv[1] + '"><i style="width:' + pct + '%"></i></div><span class="tal">' + pct + " %" + pil + " <small>(" + s.r + "/" + s.n + ")</small></span></div>";
    }).join("");
    var mangler = (KX.liste || []).filter(function (k) { return !pr[k.id]; }).map(function (k) { return esc(k.navn); });
    var html = '<div class="kort mt"><h2>Sådan står du</h2>' + (raekker ? '<p class="lille svag">Dit seneste resultat i hvert emne. ▲ og ▼ viser, om det er gået op eller ned siden sidst. Tallet i parentes er rigtige / spørgsmål.</p>' + raekker +
      (mangler.length ? '<p class="lille svag mt">Ikke testet endnu: ' + mangler.join(", ") + ".</p>" : "") : '<p class="svag">Du har kun taget tests med Forklar med egne ord. Tag en test med spørgsmål, siden retter, for at se point pr. emne her.</p>') + "</div>";
    html += '<div class="kort mt"><h2>Dine tests</h2><div class="lekliste">' + S.test.slice().reverse().slice(0, 15).map(function (t) {
      var n = (t.svar || []).length, r = (t.svar || []).filter(function (s) { return s[1]; }).length, pct = n ? Math.round(100 * r / n) : 0;
      return '<a class="lek" href="#/test/' + t.id + '"><span class="nr">' + (t.slags === "forklar" ? "🗣️" : "🎯") + '</span><span><div class="t">' + esc(testEmne(t)) + (t.slags === "forklar" ? " · forklar med egne ord" : "") + '</div><div class="d">' + datoKort(t.d) + " · " + n + ' spørgsmål</div></span><span class="hoejre"><b>' + r + " / " + n + "</b> · " + pct + " %</span></a>";
    }).join("") + "</div></div>";
    return html;
  }
  function startTest(v) {
    var pulje = testPulje(v.slags, v.fra === "lavet");
    if (v.emne !== "alle") pulje = pulje.filter(function (p) { return p.kat === v.emne; });
    var valgte = vaelgSpm(pulje, v.antal, v.emne === "alle");
    if (!valgte.length) return testside("Ingen spørgsmål passer til dit valg. Vælg Hele kurset eller et andet emne.");
    P = { type: "test", v: v, koe: valgte, i: 0, rigtige: 0, tjekbare: 0, foerste: {} };
    visTrin();
  }
  function testSlut() {
    var t = { id: Date.now(), d: dato(), emne: P.v.emne, slags: P.v.slags, fra: P.v.fra, svar: P.koe.map(function (p) { return [p.id, P.foerste[p.id] ? 1 : 0, p.kat]; }) };
    S.test.push(t); if (S.test.length > 100) S.test = S.test.slice(-100);
    gem(); P = null;
    gaa("#/test/" + t.id);
  }
  function testResultat(id) {
    var t = S.test.filter(function (x) { return String(x.id) === String(id); })[0];
    if (!t) return testside();
    var kat = {}, rigtige = 0, n = t.svar.length, forklar = t.slags === "forklar", orden = (KX.liste || []).map(function (k) { return k.id; });
    t.svar.forEach(function (s) { var k = kat[s[2]] = kat[s[2]] || { r: 0, n: 0, forkert: [] }; k.n++; if (s[1]) { k.r++; rigtige++; } else k.forkert.push(s[0]); });
    var pct = n ? Math.round(100 * rigtige / n) : 0, niv = niveau(pct);
    var ids = Object.keys(kat).sort(function (a, b) { return (orden.indexOf(a) + 1 || 99) - (orden.indexOf(b) + 1 || 99); });
    function findSpm(tid) { var d = tid.split("#"), o = LEK[d[0]], st = o && o.l.trin[+d[1]]; return st ? { o: o, i: +d[1], st: st } : null; }
    var html = '<p><a href="#/test">← Test</a></p><div class="kort fest testres"><div class="stor-tal">' + rigtige + " / " + n + '</div><p><span class="niv ' + niv[1] + '">' + niv[0] + "</span></p><p>" +
      (forklar ? "Du kunne forklare " + rigtige + " af " + n + " spørgsmål (" + pct + " %)." : "Du svarede rigtigt på " + rigtige + " af " + n + " spørgsmål i første forsøg (" + pct + " %).") +
      '</p><p class="lille svag">' + esc(testEmne(t)) + (forklar ? " · forklar med egne ord" : "") + " · " + datoKort(t.d) + (t.fra === "lavet" ? " · kun lektioner, du har lavet" : "") + "</p></div>";
    html += '<div class="kort mt"><h2>Point pr. emne</h2>' + ids.map(function (id) {
      var k = kat[id], p = Math.round(100 * k.r / k.n), nv = niveau(p);
      return '<div class="katraekke"><span>' + esc(katNavn(id)) + '</span><div class="bar ' + nv[1] + '"><i style="width:' + p + '%"></i></div><span class="tal">' + k.r + " / " + k.n + " · " + p + " %</span></div>";
    }).join("") + (ids.some(function (id) { return kat[id].n < 3; }) ? '<p class="lille svag mt">Et emne med færre end 3 spørgsmål siger ikke meget alene. Tag en test i netop det emne for at se, hvor du står.</p>' : "") + "</div>";
    var god = ids.filter(function (id) { return kat[id].n >= 2 && kat[id].r / kat[id].n >= 0.75; });
    html += '<div class="kort mt"><h2>Det er du god til</h2>' + (god.length ? "<ul>" + god.map(function (id) { return "<li><b>" + esc(katNavn(id)) + "</b>: " + kat[id].r + " af " + kat[id].n + " rigtige.</li>"; }).join("") + "</ul>" :
      '<p class="svag">Når du får mindst 75 % i et emne med mindst 2 spørgsmål, står det her.</p>') + "</div>";
    var svage = ids.filter(function (id) { return kat[id].forkert.length; }).sort(function (a, b) { return kat[a].r / kat[a].n - kat[b].r / kat[b].n; });
    html += '<div class="kort mt"><h2>Det skal du studere</h2>';
    if (!svage.length) html += "<p>Du svarede rigtigt på alt. Tag en længere test, eller vælg et emne, du ikke har prøvet endnu.</p>";
    else {
      html += '<p class="lille svag">De lektioner, hvor du svarede forkert' + (forklar ? " eller ikke kunne forklare det" : "") + ". Det svageste emne står først. Læs lektionen igen, og tag testen igen om et par dage.</p>";
      svage.forEach(function (id) {
        var lek = {}, raekke = [], ord = [];
        kat[id].forkert.forEach(function (tid) { var f = findSpm(tid); if (!f) return; if (!lek[f.o.l.id]) { lek[f.o.l.id] = { o: f.o, n: 0 }; raekke.push(f.o.l.id); } lek[f.o.l.id].n++; });
        raekke.sort(function (a, b) { return LEKNR[a] - LEKNR[b]; });
        raekke.forEach(function (lid) { (LEK[lid].l.ord || []).forEach(function (x) { if (ord.length < 8 && ord.indexOf(x[0]) < 0) ord.push(x[0]); }); });
        html += "<h3>" + esc(katNavn(id)) + ' <span class="lille svag">' + kat[id].forkert.length + (kat[id].forkert.length === 1 ? " forkert" : " forkerte") + "</span></h3>" +
          '<div class="lekliste">' + raekke.map(function (lid) { var x = lek[lid]; return '<a class="lek" href="#/l/' + lid + '"><span class="nr">' + (x.o.m.ikon || "📘") + '</span><span><div class="t">' + esc(x.o.l.titel) + '</div><div class="d">' + esc(x.o.m.titel) + " · " + x.n + ' spørgsmål</div></span><span class="hoejre">Læs →</span></a>'; }).join("") + "</div>" +
          (ord.length ? '<p class="lille ordslaa">Ord at slå op: ' + ord.map(function (w) { return '<a class="ordchip" href="' + ordHref(w) + '">' + esc(w) + "</a>"; }).join(" ") + "</p>" : "");
      });
    }
    html += "</div>";
    html += '<details class="kort mt"><summary><b>Se alle ' + n + " spørgsmål</b></summary>" + '<div class="lekliste">' + t.svar.map(function (s) {
      var f = findSpm(s[0]); if (!f) return "";
      return '<a class="lek" href="#/l/' + f.o.l.id + "/" + (f.i + 1) + '"><span class="nr ' + (s[1] ? "ok" : "nej") + '">' + (s[1] ? "✓" : "✗") + '</span><span><div class="t">' + esc(kortTitel(f.st)) + '</div><div class="d">' + esc(katNavn(s[2]) + " · " + lekNavn(f.o)) + "</div></span></a>";
    }).join("") + "</div></details>";
    var forkerte = t.svar.filter(function (s) { return !s[1] && findTrin(s[0]); });
    html += '<div class="rk mt" style="justify-content:center">' + (forkerte.length && !t.rep ? '<button type="button" class="knap" id="tilrep">Læg de ' + forkerte.length + " forkerte i Repetition</button>" : t.rep ? '<span class="svag">✓ De forkerte ligger i Repetition.</span>' : "") +
      '<a class="knap pri" href="#/test">Tag en ny test</a><a class="knap" href="#/">Til forsiden</a></div>';
    ramme(html, "mellem");
    if ($("#tilrep")) $("#tilrep").onclick = function () { forkerte.forEach(function (s) { S.rep[s[0]] = { box: 1, due: dato() }; }); t.rep = true; gem(); testResultat(id); };
  }

  function indstillinger() {
    function gruppe(navn, noegle, valg) {
      return '<div class="felt"><b>' + navn + '</b><div class="vaelg">' + valg.map(function (v) {
        return '<button type="button" data-k="' + noegle + '" data-v="' + v[0] + '" class="' + (S.set[noegle] === v[0] ? "aktiv" : "") + '">' + (v[2] ? '<span class="prik" style="background:' + v[2] + '"></span>' : "") + v[1] + "</button>";
      }).join("") + "</div></div>";
    }
    ramme('<h1>Indstillinger</h1><div class="kort">' +
      gruppe("Hvilken computer sidder du ved?", "os", [["win", "⊞ Windows · Visual Studio"], ["mac", "⌘ Mac · Rider"]]) +
      '<p class="lille svag" style="margin-top:-.8rem">Vælger du Mac, viser alle vejledninger knapper og menuer fra Rider i stedet for Visual Studio. C#-koden er den samme.</p>' +
      gruppe("Tema", "farve", TEMAER.map(function (t) { return [t[0], t[1], "linear-gradient(135deg, " + t[2] + " 50%, " + t[3] + " 50%)"]; })) +
      gruppe("Lys eller mørk", "mode", [["auto", "Følg computeren"], ["lys", "Lys"], ["moerk", "Mørk"]]) +
      gruppe("Skriftstørrelse", "skrift", [["normal", "Normal"], ["stor", "Stor"], ["kaempe", "Meget stor (godt på et tv)"]]) +
      '</div>' + (SKY ? '<div class="kort mt"><h2>Dit fremskridt følger dig</h2><p>' + esc(skyTekst || "Fremskridtet følger din Claude-konto.") + '</p><p class="svag lille">Åbn den samme side på en anden computer, og du fortsætter, hvor du slap. Valget af Windows/Mac og tema gemmes for sig på hver computer.</p></div>' : "") +
      '<div class="kort mt"' + (SKY ? ' hidden' : '') + '><h2>Flyt dit fremskridt mellem computere</h2><p class="svag lille">Dit fremskridt gemmes i browseren på den computer, du sidder ved. Vil du fortsætte på en anden computer, så gem en fil her og hent den på den anden.</p>' +
      '<div class="rk"><button type="button" class="knap" id="eksport">Gem fremskridt som fil</button><label class="knap" style="cursor:pointer">Hent fremskridt fra fil<input type="file" id="import" accept=".json" hidden></label>' +
      '<button type="button" class="knap" id="nulstil">Nulstil alt fremskridt</button></div><p id="besked" class="lille"></p></div>', true);
    $$(".vaelg button").forEach(function (b) { b.onclick = function () { S.set[b.getAttribute("data-k")] = b.getAttribute("data-v"); gem(); brugSet(); indstillinger(); }; });
    $("#eksport").onclick = function () {
      var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(S)], { type: "application/json" }));
      a.download = "kode12-fremskridt-" + dato() + ".json"; document.body.appendChild(a); a.click(); a.remove();
    };
    $("#import").onchange = function () {
      var fil = this.files[0]; if (!fil) return; var r = new FileReader();
      r.onload = function () { try { var g = JSON.parse(r.result); if (!g.lek || !g.trin) throw 0; localStorage.setItem(LS, JSON.stringify(g)); S = hent(); brugSet(); indstillinger(); $("#besked").textContent = "Fremskridtet er hentet."; } catch (e) { $("#besked").textContent = "Den fil kunne ikke læses."; } };
      r.readAsText(fil);
    };
    var klar = false;
    $("#nulstil").onclick = function () {
      if (!klar) { klar = true; this.textContent = "Klik igen for at slette alt fremskridt"; return; }
      var set = S.set; S = tom(); S.set = set; gem(); indstillinger(); $("#besked").textContent = "Alt fremskridt er nulstillet.";
    };
  }

  // ---------- ruter ----------
  function rute() {
    var h = RUTE.replace(/^#\/?/, ""), dele = h.split("/");
    P = null; ordBrugt = null;
    if (dele[0] === "m") modulside(dele[1]);
    else if (dele[0] === "ark") opslag(dele[1]);
    else if (dele[0] === "l") startLektion(dele[1], dele[2]);
    else if (dele[0] === "plan") planside();
    else if (dele[0] === "soeg") soeg();
    else if (dele[0] === "rep") startRep();
    else if (dele[0] === "ord") { if (dele[1]) ordPost(dekod(dele.slice(1).join("/"))); else ordbog(); }
    else if (dele[0] === "test") { if (dele[1]) testResultat(dele[1]); else testside(); }
    else if (dele[0] === "set") indstillinger();
    else forside();
  }
  // Navigation: siden husker selv, hvor man er (RUTE), og prøver derudover at holde adressens #-del ajour.
  // Så virker links også der, hvor browseren ikke lader adressen skifte (fx når siden vises inde i en ramme).
  function gaa(h) { RUTE = h; gaaTid = Date.now(); try { if (location.hash !== h) location.hash = h; } catch (e) { } rute(); }
  window.addEventListener("hashchange", function () { if (location.hash === RUTE && Date.now() - gaaTid < 500) return; RUTE = location.hash; rute(); });
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href^="#/"]') : null;
    if (!a || e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault(); gaa(a.getAttribute("href"));
  });
  window.kode12Nu = function () { return P && P.koe && P.koe[P.i] ? P.koe[P.i].id : null; };   // hvilket trin der vises (bruges af _udvikling/spil_test.js)
  brugSet();
  rute();
  skyStart();
})();
