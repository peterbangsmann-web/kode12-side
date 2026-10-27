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
  function tom() { return { trin: {}, lek: {}, rep: {}, dage: {}, sidst: null, set: { os: "win", farve: "sand", mode: "auto", skrift: "normal" } }; }
  function hent() {
    var s = tom();
    try { var g = JSON.parse(localStorage.getItem(LS) || "{}"); for (var k in g) { if (k === "set") { for (var x in g.set) s.set[x] = g.set[x]; } else s[k] = g[k]; } } catch (e) { }
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
  function skyData(k) { return JSON.stringify(k === "rest" ? { lek: S.lek, dage: S.dage, sidst: S.sidst } : S[k]); }
  function skyFlet(fjern) {
    var k;
    if (fjern.trin) for (k in fjern.trin) { if (!S.trin[k] || (fjern.trin[k].d || "") > (S.trin[k].d || "")) S.trin[k] = fjern.trin[k]; }
    if (fjern.rep) for (k in fjern.rep) { if (!S.rep[k] || (fjern.rep[k].due || "") > (S.rep[k].due || "")) S.rep[k] = fjern.rep[k]; }
    if (fjern.rest) {
      var r = fjern.rest;
      for (k in (r.lek || {})) { if (!S.lek[k]) S.lek[k] = r.lek[k]; }
      for (k in (r.dage || {})) { S.dage[k] = Math.max(S.dage[k] || 0, r.dage[k] || 0); }
      if (!S.sidst && r.sidst) S.sidst = r.sidst;
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
  function naesteLektion() { for (var i = 0; i < ALLE.length; i++) if (!S.lek[ALLE[i].l.id]) return ALLE[i]; return null; }
  function forfaldne() { var d = dato(), ud = []; for (var id in S.rep) { if (S.rep[id].due <= d && findTrin(id)) ud.push(id); } ud.sort(function (a, b) { return S.rep[a].due < S.rep[b].due ? -1 : 1; }); return ud; }
  function findTrin(id) { var p = id.split("#"), o = LEK[p[0]]; if (!o) return null; var st = o.l.trin[+p[1]]; return st && KAN_TJEKKES[st.t] ? st : null; }
  function stribe() { var n = 0, d = new Date(); if (!S.dage[dato(d)]) d.setDate(d.getDate() - 1); while (S.dage[dato(d)]) { n++; d.setDate(d.getDate() - 1); } return n; }

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
    var post = P.koe[P.i], st = post.st, tilbage = P.type === "lek" ? "#/m/" + P.o.m.id : "#/";
    var titel = P.type === "lek" ? P.o.l.titel : "Repetition";
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
    ordBrugt = {};
    var el = $("#trin"), c = TYPER[st.t](st, el), svar = $("#svar"), knapper = $("#knapper"), forsoeg = 0, faerdig = false;

    function videre() { S.dage[dato()] = (S.dage[dato()] || 0) + 1; gem(); P.i++; visTrin(); }
    function resultat(ok) {
      if (P.foerste[post.id] == null) { P.foerste[post.id] = ok; P.tjekbare++; if (ok) P.rigtige++; }
      if (P.type === "lek") S.trin[post.id] = { ok: P.foerste[post.id], d: dato() };
      else { var r = S.rep[post.id] || { box: 1 }; r.box = P.foerste[post.id] ? Math.min(5, r.box + 1) : 1; r.due = plusDage(INTERVAL[r.box]); S.rep[post.id] = r; }
      gem();
    }
    function knap(tekst, pri, fn) { var b = document.createElement("button"); b.type = "button"; b.className = "knap" + (pri ? " pri" : ""); b.textContent = tekst; b.onclick = fn; knapper.appendChild(b); return b; }
    function visVidere() { faerdig = true; knapper.innerHTML = ""; var b = knap(P.i + 1 >= P.koe.length ? "Afslut" : "Videre", true, videre); b.focus(); }
    function boks(klasse, hoved, html) { svar.innerHTML = '<div class="svar ' + klasse + '">' + (hoved ? '<div class="hoved">' + hoved + "</div>" : "") + (html || "") + "</div>"; }

    function tjek() {
      var r = c.tjek(); if (!r) { boks("info", "", "<p>Svar først — så tjekker jeg.</p>"); return; }
      forsoeg++;
      if (r.ok) { resultat(true); if (c.laas) c.laas(); boks("ok", forsoeg === 1 ? "✓ Rigtigt!" : "✓ Rigtigt — nu sad den.", r.html); visVidere(); }
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
  document.addEventListener("keydown", function (e) { if (P && P.tast && /^#\/(l\/|rep)/.test(RUTE)) P.tast(e); });

  function slut() {
    var pct = P.tjekbare ? Math.round(100 * P.rigtige / P.tjekbare) : 100;
    if (P.type === "lek") {
      var l = P.o.l;
      S.lek[l.id] = { d: dato() };
      P.koe.forEach(function (post) {            // læg lektionens opgaver i repetitionskassen
        if (!KAN_TJEKKES[post.st.t] || S.rep[post.id]) return;
        var box = P.foerste[post.id] ? 2 : 1; S.rep[post.id] = { box: box, due: plusDage(INTERVAL[box]) };
      });
      gem();
      var idx = ALLE.indexOf(P.o), naeste = ALLE[idx + 1];
      var ord = (l.ord || []).map(function (o) { return "<div><dt>" + esc(o[0]) + "</dt><dd>" + inl(o[1]) + "</dd></div>"; }).join("");
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
      a("#/", "Kursus") + a("#/plan", "Plan") + a("#/rep", "Repetition", f ? '<span class="tal">' + f + "</span>" : "") + a("#/soeg", "Søg") + a("#/ord", "Ordbog") + a("#/set", "Indstillinger") +
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
        '<div class="rk"><a class="knap pri stor" href="#/l/' + n.l.id + '">' + (faerdige ? "Fortsæt" : "Kom i gang") + " →</a>" + (f ? '<a class="knap" href="#/rep">Repetér ' + f + " opgaver</a>" : "") + "</div>"
        : '<h1>Du har lavet alle lektioner 🎉</h1><p>Brug Repetition hver dag, så det sidder til eksamen.</p><a class="knap pri" href="#/rep">Repetition</a>') +
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
      var f = S.lek[l.id], opg = l.trin.filter(function (s) { return KAN_TJEKKES[s.t]; }).length;
      var prog = l.trin.filter(function (s) { return s.t === "opgave" || s.t === "ide"; }).length, ideNavn = erMac() ? "Rider" : "Visual Studio";
      return '<a class="lek' + (f ? " faerdig" : "") + (n && n.l === l ? " naeste" : "") + (l.vaerksted ? " vaerksted" : "") + '" href="#/l/' + l.id + '"><span class="nr">' + (f ? "✓" : l.vaerksted ? "💻" : l.nr != null ? l.nr : i + 1) + '</span><span><div class="t">' + esc(l.titel) + '</div><div class="d">' +
        (l.vaerksted ? prog + " programmer, du selv skriver i " + ideNavn : l.trin.length + " trin · " + opg + " øvelser" + (prog ? " · " + prog + " i " + ideNavn : "")) + (l.min ? " · ca. " + l.min + " min" : "") + '</div></span><span class="hoejre">' + (f ? "Færdig " + f.d.slice(8) + "/" + f.d.slice(5, 7) : n && n.l === l ? "Næste →" : "") + "</span></a>";
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
      if ((l.ord || []).length) html += '<h3>Fagord</h3><dl class="ord">' + l.ord.map(function (o) { return "<div><dt>" + esc(o[0]) + "</dt><dd>" + inl(o[1]) + "</dd></div>"; }).join("") + "</dl>";
      html += "</div>";
    });
    ramme(html, "mellem");
  }

  function ordbog() {
    var alle = [];
    ALLE.forEach(function (o) { (o.l.ord || []).forEach(function (x) { alle.push({ ord: x[0], tekst: x[1], hvor: o.m.titel }); }); });
    alle.sort(function (a, b) { return a.ord.localeCompare(b.ord, "da"); });
    ramme('<h1>Ordbog</h1><p class="svag">Alle fagord fra lektionerne — ' + alle.length + ' i alt. Brug den, når et ord driller.</p><input class="soeg" id="soeg" placeholder="Søg efter et ord …" autocomplete="off"><div class="kort"><dl class="ord" id="ordliste"></dl></div>', true);
    function tegn(q) {
      q = (q || "").toLowerCase();
      var vis = alle.filter(function (a) { return !q || a.ord.toLowerCase().indexOf(q) !== -1 || a.tekst.toLowerCase().indexOf(q) !== -1; });
      $("#ordliste").innerHTML = vis.map(function (a) { return "<div><dt>" + esc(a.ord) + "<small>" + esc(a.hvor) + "</small></dt><dd>" + inl(a.tekst) + "</dd></div>"; }).join("") || '<p class="svag">Ingen ord matcher.</p>';
    }
    tegn(""); $("#soeg").oninput = function () { tegn(this.value); };
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
    else if (dele[0] === "ord") ordbog();
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
  brugSet();
  rute();
  skyStart();
})();
