/* =====================================================================
   INVITACIÓN — Bernardo & Angie
   Este archivo lee js/config.js y construye la página.
   Normalmente NO necesitas editarlo: cambia los datos en config.js.
   ===================================================================== */
(function () {
  "use strict";

  var C = window.INVITATION_CONFIG;
  if (!C) { console.error("No se encontró INVITATION_CONFIG. Revisa que js/config.js esté cargado."); return; }

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var pad = function (n, l) { return String(n).padStart(l || 2, "0"); };
  var isHttpUrl = function (u) { return typeof u === "string" && /^https:\/\/[^\s]+$/i.test(u.trim()); };
  var NS = "http://www.w3.org/2000/svg";

  /* ---------------------------------------------------------------
     1. FECHA (todo sale de config.event)
  --------------------------------------------------------------- */
  var E = C.event;
  var civil = new Date(Date.UTC(E.year, E.month - 1, E.day)); // fecha civil, sin depender de la zona del dispositivo
  var WEEKDAYS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var weekday = WEEKDAYS[civil.getUTCDay()];
  var monthName = MONTHS[E.month - 1];

  var hour12 = (E.hour % 12) || 12;
  var timeLabel = pad(hour12) + ":" + pad(E.minute) + " " + (E.hour >= 12 ? "PM" : "AM");

  // Momento exacto del evento con su zona horaria (Bogotá = -05:00)
  var targetISO = E.year + "-" + pad(E.month) + "-" + pad(E.day) + "T" + pad(E.hour) + ":" + pad(E.minute) + ":00" + E.utcOffset;
  var targetMs = Date.parse(targetISO);

  /* ---------------------------------------------------------------
     2. TEXTOS (data-bind y data-lines)
  --------------------------------------------------------------- */
  var T = C.texts;
  var binds = {
    groom: C.couple.groom,
    bride: C.couple.bride,
    tagline: C.couple.tagline,
    openButton: T.openButton,
    verseRef: C.verse.reference,
    weekday: weekday.toLocaleUpperCase("es"),
    day: pad(E.day),
    month: monthName.toLocaleUpperCase("es"),
    year: String(E.year),
    countdownTitle: T.countdownTitle,
    countdownDone: T.countdownDone,
    lblDays: T.labels.days, lblHours: T.labels.hours, lblMinutes: T.labels.minutes, lblSeconds: T.labels.seconds,
    parentsTitle: T.parentsTitle,
    groomParentsTitle: T.groomParentsTitle,
    brideParentsTitle: T.brideParentsTitle,
    godparentsTitle: T.godparentsTitle,
    ceremonyTitle: C.ceremony.title,
    ceremonyTime: timeLabel,
    churchLabel: C.ceremony.churchLabel,
    churchName: C.ceremony.churchName,
    ceremonyCity: C.ceremony.city,
    mapLabel: C.mapButtonLabel,
    receptionTitle: C.reception.title,
    placeName: C.reception.placeName,
    programTitle: C.program.title,
    envelopeTitle: C.envelopeRain.title,
    confirmTitle: C.confirmation.title,
    dressTitle: C.dressCode.title,
    dressStyle: C.dressCode.style,
    dressHerLabel: C.dressCode.herLabel,
    dressHer: C.dressCode.her,
    dressHisLabel: C.dressCode.hisLabel,
    dressHis: C.dressCode.his,
    dressNote: C.dressCode.note
  };
  $$("[data-bind]").forEach(function (el) {
    var k = el.getAttribute("data-bind");
    if (k in binds) el.textContent = binds[k];
  });

  // Textos de varias líneas (verso y frase)
  var linesSrc = { verse: C.verse.text, phrase: C.phrase.text };
  $$("[data-lines]").forEach(function (el) {
    var txt = String(linesSrc[el.getAttribute("data-lines")] || "");
    txt.split("\n").forEach(function (line, i) {
      if (i) el.appendChild(document.createElement("br"));
      el.appendChild(document.createTextNode(line));
    });
  });
  document.title = T.pageTitle;

  /* ---------------------------------------------------------------
     3. FAMILIAS Y PADRINOS
  --------------------------------------------------------------- */
  function fillNames(selector, people) {
    var ul = $(selector);
    people.forEach(function (p) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(p.name));
      if (p.memorial) {
        var m = document.createElement("span");
        m.className = "memorial";
        m.textContent = C.families.memorialLabel;
        li.appendChild(m);
      }
      ul.appendChild(li);
    });
  }
  fillNames("#groomParents", C.families.groomParents);
  fillNames("#brideParents", C.families.brideParents);
  fillNames("#godparents", C.families.godparents);

  /* ---------------------------------------------------------------
     4. MAPAS (enlace configurado o búsqueda de Google Maps)
  --------------------------------------------------------------- */
  function mapsLink(place) {
    if (isHttpUrl(place.mapsUrl)) return place.mapsUrl.trim();
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place.mapsSearchQuery || "");
  }
  $("#ceremonyMap").href = mapsLink(C.ceremony);
  $("#receptionMap").href = mapsLink(C.reception);

  /* ---------------------------------------------------------------
     5. PROGRAMA (sin horarios)
  --------------------------------------------------------------- */
  var ICONS = { church: "i-church", arch: "i-arch", waltz: "i-waltz", toast: "i-toast", dinner: "i-dinner", music: "i-music" };
  function svgUse(id, vb, cls) {
    var s = document.createElementNS(NS, "svg");
    s.setAttribute("viewBox", vb);
    s.setAttribute("aria-hidden", "true");
    if (cls) s.setAttribute("class", cls);
    var u = document.createElementNS(NS, "use");
    u.setAttribute("href", "#" + id);
    s.appendChild(u);
    return s;
  }
  var timeline = $("#timeline");
  C.program.items.forEach(function (item) {
    var row = document.createElement("div");
    row.className = "tl-row reveal";
    row.setAttribute("role", "listitem");

    var node = document.createElement("div");
    node.className = "tl-node";
    node.appendChild(svgUse("heart", "0 0 24 24"));

    var h = document.createElement("h3");
    h.textContent = item.title;

    row.appendChild(svgUse(ICONS[item.icon] || "i-music", "0 0 64 64", "ico"));
    row.appendChild(node);
    row.appendChild(h);
    timeline.appendChild(row);
  });

  var fill = $("#timelineFill");
  function updateTimeline() {
    var r = timeline.getBoundingClientRect();
    var p = (window.innerHeight * 0.62 - r.top) / r.height;
    fill.style.height = Math.max(0, Math.min(1, p)) * 100 + "%";
  }

  /* ---------------------------------------------------------------
     6. CONFIRMACIÓN POR WHATSAPP
  --------------------------------------------------------------- */
  function whatsappHref(c) {
    var phone = String(c.phone || "").replace(/\D/g, "");
    if (phone.length >= 8 && phone.length <= 15) {
      return "https://wa.me/" + phone + "?text=" + encodeURIComponent(c.message || "");
    }
    if (isHttpUrl(c.shortLink)) return c.shortLink.trim();
    return null; // sin dato válido: no se genera ningún enlace
  }
  var confirmBox = $("#confirmButtons");
  C.confirmation.contacts.forEach(function (c) {
    var a = document.createElement("a");
    a.className = "btn";
    var href = whatsappHref(c);
    if (href) {
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    } else {
      a.setAttribute("aria-disabled", "true");
      a.setAttribute("role", "link");
    }
    a.appendChild(svgUse("whatsapp", "0 0 24 24"));
    var label = document.createElement("span");
    label.textContent = c.label;
    a.appendChild(label);
    a.appendChild(svgUse("hand", "0 0 24 24", "btn__hand"));
    confirmBox.appendChild(a);
  });

  // Fecha límite (solo se muestra si está configurada y es válida)
  (function () {
    var d = String(C.confirmation.deadline || "").trim();
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d);
    if (!m) return;
    var dt = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
    if (isNaN(dt) || dt.getUTCMonth() !== +m[2] - 1) return;
    var el = $("#deadline");
    el.textContent = C.confirmation.deadlinePrefix + " " + (+m[3]) + " de " + MONTHS[+m[2] - 1] + " de " + m[1];
    el.hidden = false;
  })();

  /* ---------------------------------------------------------------
     7. FOTOS DE LA PAREJA (completas, a todo el ancho)
  --------------------------------------------------------------- */
  var P = C.photos || {};
  $$("[data-photo]").forEach(function (sec) {
    var key = sec.getAttribute("data-photo");
    var ph = P[key];
    if (!ph || !ph.src) { sec.hidden = true; return; }
    var img = $("img", sec);
    img.src = ph.src;
    img.alt = ph.alt || "";
    img.loading = key === "cover" ? "eager" : "lazy";
    img.decoding = "async";
  });

  /* ---------------------------------------------------------------
     8. BORDES RASGADOS (papel roto con fibras blancas)
  --------------------------------------------------------------- */
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function tornPath(r, base, amp) {
    var d = "M0 60 L0 " + base.toFixed(1), x = 0;
    while (x < 1000) {
      x += 4 + r() * 12;
      if (x > 1000) x = 1000;
      var y = base + (r() - 0.5) * amp + Math.sin(x / 85) * amp * 0.32;
      d += " L" + x.toFixed(1) + " " + y.toFixed(1);
    }
    return d + " L1000 60 Z";
  }
  $$(".torn").forEach(function (svg, i) {
    var r = rng(9301 + i * 7919);
    var fiber = document.createElementNS(NS, "path");
    fiber.setAttribute("class", "torn__fiber");
    fiber.setAttribute("d", tornPath(r, 21, 17));
    var paper = document.createElementNS(NS, "path");
    paper.setAttribute("class", "torn__paper");
    paper.setAttribute("d", tornPath(r, 31, 14));
    svg.appendChild(fiber);
    svg.appendChild(paper);
  });

  /* ---------------------------------------------------------------
     9. CUENTA REGRESIVA EN VIVO
  --------------------------------------------------------------- */
  var cdEls = { d: $("#cd-days"), h: $("#cd-hours"), m: $("#cd-minutes"), s: $("#cd-seconds") };
  var cdLast = {};
  function setCd(key, val) {
    var str = pad(val);
    if (cdLast[key] === str) return;
    cdLast[key] = str;
    var el = cdEls[key];
    el.textContent = str;
    el.classList.remove("tick");
    void el.offsetWidth; // reinicia la animación
    el.classList.add("tick");
  }
  var timer = null;
  function tick() {
    var diff = targetMs - Date.now();
    if (diff <= 0) {
      setCd("d", 0); setCd("h", 0); setCd("m", 0); setCd("s", 0);
      $("#countdown-done").hidden = false;
      if (timer) clearInterval(timer);
      return;
    }
    var s = Math.floor(diff / 1000);
    setCd("d", Math.floor(s / 86400));
    setCd("h", Math.floor((s % 86400) / 3600));
    setCd("m", Math.floor((s % 3600) / 60));
    setCd("s", s % 60);
  }
  if (isNaN(targetMs)) {
    console.error("Fecha del evento inválida en config.js (event). Valor generado:", targetISO);
    $("#countdown").hidden = true;
  } else {
    tick();
    timer = setInterval(tick, 1000);
  }

  /* ---------------------------------------------------------------
     10. APARICIÓN AL HACER SCROLL
  --------------------------------------------------------------- */
  var revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }
  window.addEventListener("scroll", updateTimeline, { passive: true });
  window.addEventListener("resize", updateTimeline);
  updateTimeline();

  /* ---------------------------------------------------------------
     11. MÚSICA DE FONDO
  --------------------------------------------------------------- */
  var audio = null;
  var musicBtn = $("#musicBtn");
  function setMusicState(on) {
    musicBtn.setAttribute("aria-pressed", on ? "true" : "false");
    musicBtn.setAttribute("aria-label", on ? T.muteOff : T.muteOn);
    musicBtn.title = on ? T.muteOff : T.muteOn;
  }
  if (C.music && C.music.src) {
    audio = new Audio(C.music.src);
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = typeof C.music.volume === "number" ? C.music.volume : 0.5;
    musicBtn.hidden = false;
    setMusicState(false);
    musicBtn.addEventListener("click", function () {
      if (audio.paused) { audio.play().then(function () { setMusicState(true); }).catch(function () {}); }
      else { audio.pause(); setMusicState(false); }
    });
  }

  /* ---------------------------------------------------------------
     12. PORTADA "ABRIR INVITACIÓN" Y BOTÓN DALE PLAY
  --------------------------------------------------------------- */
  var cover = $("#cover");
  var openBtn = $("#openBtn");
  openBtn.addEventListener("click", function () {
    cover.classList.add("is-open");
    cover.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    document.body.classList.add("is-ready");
    window.scrollTo(0, 0);
  });
  openBtn.focus({ preventScroll: true });

  // Foto con DALE PLAY: reproduce la canción y continúa hacia el versículo
  var playBtn = $("#playBtn");
  playBtn.setAttribute("aria-label", T.playLabel);
  $("#playCurve").textContent = T.playCurve;
  playBtn.addEventListener("click", function () {
    if (audio) { audio.play().then(function () { setMusicState(true); }).catch(function () {}); }
    var next = $("#versiculo");
    if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ---------------------------------------------------------------
     13. HOJAS FLOTANTES
  --------------------------------------------------------------- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canvas = $("#petals");
  var ctx = canvas && !reduce ? canvas.getContext("2d") : null;
  if (ctx) {
    var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), leaves = [];
    var COLORS = ["rgba(157,176,138,.55)", "rgba(178,194,160,.6)", "rgba(135,153,122,.5)", "rgba(255,253,247,.75)", "rgba(195,208,180,.6)"];
    var resize = function () {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    var make = function (initial) {
      return {
        x: Math.random() * W, y: initial ? Math.random() * H : -20,
        s: 5 + Math.random() * 7, vy: 0.3 + Math.random() * 0.6,
        sway: 0.35 + Math.random() * 0.8, ph: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI * 2, vr: (Math.random() - 0.5) * 0.02,
        c: COLORS[(Math.random() * COLORS.length) | 0]
      };
    };
    var init = function () {
      resize();
      var n = Math.round(Math.min(24, Math.max(10, W / 48)));
      leaves = [];
      for (var i = 0; i < n; i++) leaves.push(make(true));
    };
    var frame = function (t) {
      ctx.clearRect(0, 0, W, H);
      leaves.forEach(function (p, i) {
        p.y += p.vy;
        p.x += Math.sin(t / 1500 + p.ph) * p.sway * 0.6;
        p.rot += p.vr;
        if (p.y > H + 20 || p.x < -30 || p.x > W + 30) leaves[i] = make(false);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.s, p.s * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(frame);
    };
    init();
    window.addEventListener("resize", init);
    requestAnimationFrame(frame);
  }
})();
