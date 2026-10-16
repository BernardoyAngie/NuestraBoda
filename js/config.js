/* =====================================================================
   CONFIGURACIÓN CENTRALIZADA — Bernardo & Angie
   Todo lo que quieras cambiar de la invitación está en este archivo.
   Consulta el README.md para la explicación de cada campo.
   (En los textos, "\n" significa salto de línea.)
   ===================================================================== */
window.INVITATION_CONFIG = {

  /* ---------- 1. NOVIOS ---------- */
  couple: {
    groom: "Bernardo",
    bride: "Angie",
    tagline: "NOS CASAMOS"
  },

  /* ---------- 2. VERSÍCULO (aparece después del DALE PLAY) ---------- */
  verse: {
    reference: "Eclesiastés 4: 9-10",
    text: "“Más valen dos que uno solo... Si uno\ncae, el otro lo levanta”"
  },

  /* ---------- 3. FRASE BAJO LA FECHA ---------- */
  phrase: {
    text: "DESPUÉS DE TANTOS MOMENTOS\nCOMPARTIDOS. HOY DAMOS EL PASO\nMÁS BONITO: ELEGIRNOS PARA TODA\nLA VIDA"
  },

  /* ---------- 4. FAMILIAS Y PADRINOS ---------- */
  families: {
    // Texto que se muestra junto a quien ya no está presente (homenaje)
    memorialLabel: "(Q.E.P.D.)",

    groomParents: [
      { name: "Floricelva Chaves Muñoz" },
      { name: "Bernardo Ceron Garces" }
    ],
    brideParents: [
      { name: "Naidu Avila Novoa" },
      { name: "Orlando Zamudio Rodriguez", memorial: true } // memorial: true => muestra (Q.E.P.D.)
    ],
    godparents: [
      { name: "Daniel Barrera Barragan" },
      { name: "Yineth Avila Ramirez" }
    ]
  },

  /* ---------- 5. FECHA Y HORA DEL EVENTO ----------
     La cuenta regresiva y la fecha mostrada salen SOLO de estos valores.
     utcOffset de Bogotá, Colombia: "-05:00" (no tiene horario de verano).
     Así el contador es idéntico para todos los invitados, sin importar
     la zona horaria de su dispositivo. */
  event: {
    year: 2026,
    month: 12,      // 1-12
    day: 5,
    hour: 18,       // formato 24 h (18 = 6:00 p. m.)
    minute: 0,
    utcOffset: "-05:00",
    timezoneName: "America/Bogota"
  },

  /* ---------- 6. CEREMONIA ----------
     La hora que se muestra (06:00 PM) se calcula a partir de event.hour y event.minute. */
  ceremony: {
    title: "Ceremonia",
    churchLabel: "Iglesia",
    churchName: "San José Obrero",
    city: "Duitama, Boyacá, Colombia",
    // Enlace definitivo de Google Maps. Si lo dejas vacío (""), se genera
    // un enlace de BÚSQUEDA con el nombre de la iglesia y la ciudad.
    mapsUrl: "https://maps.app.goo.gl/Rqu5b97SLeQk6Ms56",
    mapsSearchQuery: "Iglesia San José Obrero Duitama Boyacá Colombia"
  },

  /* ---------- 7. RECEPCIÓN ---------- */
  reception: {
    title: "Recepción",
    placeName: "ALJONA GOURMET",
    // Si lo dejas vacío (""), se genera un enlace de búsqueda del establecimiento.
    mapsUrl: "https://maps.app.goo.gl/WgSFCpiV8hGsmXBq8",
    mapsSearchQuery: "ALJONA GOURMET Duitama Boyacá Colombia"
  },

  mapButtonLabel: "Ver mapa",

  /* ---------- 8. PROGRAMA (SIN HORARIOS) ----------
     Orden = orden en la línea de tiempo.
     icon: church | arch | waltz | toast | dinner | music
     No agregues horas aquí: esta sección no debe mostrarlas. */
  program: {
    title: "Programa",
    items: [
      { title: "Ceremonia", icon: "church" },
      { title: "Recepción", icon: "arch" },
      { title: "Vals",      icon: "waltz" },
      { title: "Brindis",   icon: "toast" },
      { title: "Comida",    icon: "dinner" },
      { title: "Fiesta",    icon: "music" }
    ]
  },

  /* ---------- 9. CÓDIGO DE VESTIMENTA ---------- */
  dressCode: {
    title: "Código de Vestimenta",
    style: "Elegante",
    herLabel: "Ellas",
    her: "Vestido largo",
    hisLabel: "Ellos",
    his: "Traje Formal",
    note: "No usar color blanco/rojo"
  },

  /* ---------- 10. LLUVIA DE SOBRES ----------
     Solo muestra el título y una ilustración decorativa.
     No se admite ningún otro texto ni datos financieros. */
  envelopeRain: {
    title: "Lluvia de sobres"
  },

  /* ---------- 11. CONFIRMACIÓN POR WHATSAPP ----------
     Para cada botón, el sistema decide así:
       1) Si "phone" tiene un número válido  -> https://wa.me/<número>?text=<mensaje>
       2) Si no, y "shortLink" es un enlace https -> usa ese enlace corto (wa.link)
       3) Si no hay ninguno -> el botón se muestra desactivado (nunca genera un enlace inválido)
     "phone": solo dígitos con indicativo de país, sin + ni espacios. Ej.: "57" + número.
     NO se inventan números: déjalo vacío hasta tener el definitivo. */
  confirmation: {
    title: "Confirmar asistencia",
    // Fecha límite en formato "AAAA-MM-DD". Vacía ("") = no se muestra nada.
    deadline: "",
    deadlinePrefix: "Por favor confirma antes del",
    contacts: [
      {
        label: "Confirmar con Bernardo",
        phone: "",
        shortLink: "https://wa.link/vrb9d9",
        message: "¡Hola Bernardo! Quiero confirmar mi asistencia a la boda de Bernardo & Angie. ¡Muchas gracias por la invitación!"
      },
      {
        label: "Confirmar con Angie",
        phone: "",
        shortLink: "https://wa.link/d17fz3",
        message: "¡Hola Angie! Quiero confirmar mi asistencia a la boda de Bernardo & Angie. ¡Muchas gracias por la invitación!"
      }
    ]
  },

  /* ---------- 12. FOTOGRAFÍAS ----------
     Las fotos están en la carpeta /img y se muestran COMPLETAS, a todo el ancho,
     con borde rasgado. Para cambiar una, reemplaza el archivo (con el mismo nombre)
     o escribe aquí otra ruta.
       cover           -> primera foto, con el botón DALE PLAY (aparece al abrir la invitación)
       afterGodparents -> después de los padrinos
       afterReception  -> después de la recepción
       afterConfirm    -> después de confirmar asistencia
       afterConfirm2   -> la última, justo debajo de la anterior
     Si dejas "src" vacío ("") esa foto no se muestra. */
  photos: {
    cover:           { src: "img/IMG_001.jpeg", alt: "Bernardo y Angie" },
    afterGodparents: { src: "img/IMG_002.jpeg", alt: "Bernardo y Angie" },
    afterReception:  { src: "img/IMG_003.jpeg", alt: "Bernardo y Angie" },
    afterConfirm:    { src: "img/IMG_004.jpeg", alt: "Bernardo y Angie" },
    afterConfirm2:   { src: "img/IMG_005.jpeg", alt: "Bernardo y Angie" }
  },

  /* ---------- 13. MÚSICA DE FONDO ----------
     Suena al pulsar el botón DALE PLAY de la primera foto.
     Para cambiarla, reemplaza el .mp3 en /audio o cambia la ruta. Vacío ("") = sin música. */
  music: {
    src: "audio/CANCION_BODA_001.mp3",
    volume: 0.7
  },

  /* ---------- 14. TEXTOS GENERALES ---------- */
  texts: {
    pageTitle: "Bernardo & Angie — Nos casamos",
    openButton: "Abrir invitación",
    playLabel: "Reproducir la música y continuar con la invitación",
    playCurve: "DALE PLAY",
    countdownTitle: "Cuenta regresiva",
    countdownDone: "Hoy es el gran día",
    labels: { days: "Días", hours: "Horas", minutes: "Minutos", seconds: "Segundos" },
    parentsTitle: "Con la bendición de nuestros padres",
    groomParentsTitle: "Padres del novio",
    brideParentsTitle: "Padres de la novia",
    godparentsTitle: "Padrinos",
    muteOn: "Activar música",
    muteOff: "Silenciar música"
  }
};
