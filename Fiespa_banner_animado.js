// ==============================
// ARRAY DE INVITADOS
// Añade, quita o edita aquí.
// ==============================
const invitados = [
    { foto: "Fiespa'26/fotos/pablo4.jpeg",  nombre: "Pablo Sanchez", desc: "El arquitecto del caos, el creador de la Fiespa" },
    { foto: "Fiespa'26/fotos/nuri4.jpeg", nombre: "Nuria", desc: "La que lo da todo en la pista y fuera de ella" },
    { foto: "Fiespa'26/fotos/helen3.jpeg",  nombre: "Elena", desc: "El terremoto del Pacífico, nadie la para" },
    { foto: "Fiespa'26/fotos/ait2.jpeg", nombre: "Aitor", desc: "Proteína, rutina y mucha marcha" },
    { foto: "Fiespa'26/fotos/pablor1.jpeg", nombre: "Pablo Romero", desc: "El alma de la fiesta, siempre el último en irse" },
    { foto: "Fiespa'26/fotos/jesus2.jpeg",  nombre: "Jesús", desc: "Más tranquilo que un martes por la mañana" },
    { foto: "Fiespa'26/fotos/cris1.jpeg", nombre: "Cris", desc: "Capaz de bailar cualquier canción, de cualquier década" },
    { foto: "Fiespa'26/fotos/henry1.jpeg",  nombre: "Enrique", desc: "El que siempre llega tarde pero nunca falta" },
    { foto: "Fiespa'26/fotos/almu1.jpeg", nombre: "Almu", desc: "La que convierte cada momento en un recuerdo" },
];

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    if (!track) return;

    invitados.forEach(inv => {
        const item = document.createElement("div");
        item.className = "slide-item";
        item.innerHTML = `
            <img src="${inv.foto}" alt="${inv.nombre}">
            <div class="slide-overlay">
                <span class="slide-nombre">${inv.nombre}</span>
                <span class="slide-desc">${inv.desc}</span>
            </div>`;
        track.appendChild(item);
    });
});

// ==========================

const MENSAJES_DECISION = {
  A: "Has demostrado lealtad. Algunos sobreviven gracias a gestos como el tuyo.",
  B: "Has priorizado el avance. No todos pueden seguir el ritmo.",
  C: "Has tomado una decisión fría. A veces la supervivencia exige sacrificios."
};

// ==========================
// CONTADOR REGRESIVO
// ==========================
const fechaObjetivo = new Date("2026-05-22 23:59:59").getTime();

const intervalo = setInterval(() => {
  const ahora = new Date().getTime();
  const diferencia = fechaObjetivo - ahora;

  if (diferencia <= 0) {
    clearInterval(intervalo);
    document.getElementById("contador").textContent = "¡LA FIESPA HA COMENZADO!";
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  document.getElementById("contador").textContent =
    `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}, 1000);


// ==========================
// CARRUSEL AUTOMÁTICO
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  if (!track) return;

  const slides = Array.from(track.children);
  if (slides.length === 0) return;

  const visible = 3;
  const gap = 24;

  // Clonamos los primeros slides para loop infinito
  for (let i = 0; i < visible; i++) {
    const clone = slides[i].cloneNode(true);
    clone.classList.add("clone");
    track.appendChild(clone);
  }

  let index = 0;

  function slideWidth() {
    return slides[0].offsetWidth + gap;
  }

  function move(animated = true) {
    track.style.transition = animated ? "transform 0.6s ease" : "none";
    track.style.transform = `translateX(-${index * slideWidth()}px)`;
  }

  function advance() {
    index++;
    move();
    if (index === slides.length) {
      setTimeout(() => { index = 0; move(false); }, 650);
    }
  }

  function retreat() {
    if (index > 0) {
      index--;
      move();
    } else {
      index = slides.length - 1;
      move(false);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        index--;
        move();
      }));
    }
  }

  const autoplay = setInterval(advance, 4000);

  document.getElementById("carouselNext")?.addEventListener("click", () => {
    clearInterval(autoplay);
    advance();
  });

  document.getElementById("carouselPrev")?.addEventListener("click", () => {
    clearInterval(autoplay);
    retreat();
  });
});

// ==========================
// MAPA CON LEAFLET.JS
// ==========================

// Coordenadas del lugar (ejemplo: Obelisco)
//const lat = -34.6037;
//const lng = -58.3816;

// Crear mapa
//const mapa = L.map('mapa').setView([lat, lng], 15);

// Cargar mapa base (OpenStreetMap)
//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//attribution: '© OpenStreetMap contributors'
//}).addTo(mapa);

// Crear marcador
//L.marker([lat, lng])
//.addTo(mapa)
//.bindPopup("📍 FIESPA 2026<br>Te esperamos aqui")
//.openPopup();


// ==========================
// PLANNING CARRUSEL MANUAL
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("planningTrack");
  const dots = document.querySelectorAll(".planning-dot");
  const prevBtn = document.getElementById("planningPrev");
  const nextBtn = document.getElementById("planningNext");

  if (!track) return;

  const total = track.children.length;
  let current = 0;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("activo", i === current));
  }

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));
});

// ==========================
// TRANSICIONES DESPUÉS DE CARGA
// ==========================

window.addEventListener("load", () => {
  document.body.classList.remove("no-transition");
});

// ==========================
// HAMBURGER MENU
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector("nav");
  if (!hamburger || !nav) return;

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");
    hamburger.textContent = nav.classList.contains("open") ? "\u2715" : "\u2630";
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      hamburger.textContent = "\u2630";
    });
  });
});

// ==========================
// BANNER ANIMATIONS
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  // terminal lines (typewriter)
  const terminalLines = [
    "// ESCANEO: ESTRUCTURA_CEPA_ABYSS //",
    "// GENERACION_MODELO_HIBRIDO...",
    "// EXITO //",
    "",
    "MORFOLOGIA_DATOS: 2.650 us",
    "MORFOLOGIA_DATOS: 718 mms",
    "MORFOLOGIA_CELULA: ESPECTRO_IR",
    "MORFOLOGIA_PALMERA: 572 mms",
    "STRUCTURAS_PALMERA: 6680 us",
    "STRUCTURAS_PALMERA: 3200 us",
    "STRUCTURAS_PALMERA: 9280 us",
    "MALSSTSCARCA: 16273 mms",
    "MORFOLOGIA_PALMERA: 190 180-us",
    "STRUCTOGIA_CEPA: 1332 us",
    "MORFOLOGIA_CELULA: 700%X###",
    "MORFOLOGIA_CELULA: 1390 ms",
    "MORFOLOGIA_CELULA: COMPLEJO",
    "",
    "!! DATA_CORRUPTION_DETECTED //",
    "!! _CRITICAL_WARNING //",
    "!! INFECCION_CEPA_ABYSS //",
    "!! HIBRIDO_BIO-SINTOMA //"
  ];

  const terminal = document.getElementById("bannerTerminalLog");
  if (terminal) {
    let lineIdx = 0;
    function pushTerminalLine() {
      const txt = terminalLines[lineIdx % terminalLines.length];
      const div = document.createElement("div");
      div.className = "banner-terminal-line" + (txt.includes("!!") ? " warn" : "");
      div.textContent = txt;
      terminal.appendChild(div);
      while (terminal.children.length > 15) terminal.removeChild(terminal.firstChild);
      lineIdx++;
      setTimeout(pushTerminalLine, 140 + Math.random() * 220);
    }
    setTimeout(pushTerminalLine, 350);
  }

  // mini chart animation
  const miniChart = document.getElementById("bannerMiniChart");
  if (miniChart) {
    const ctx = miniChart.getContext("2d");
    function resizeMiniChart() {
      miniChart.width = miniChart.clientWidth;
      miniChart.height = miniChart.clientHeight;
    }
    resizeMiniChart();
    window.addEventListener("resize", resizeMiniChart);

    let t = 0;
    function drawMiniChart() {
      const w = miniChart.width;
      const h = miniChart.height;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(57,255,20,0.24)";
      ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        const y = (h / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = h * 0.5 + Math.sin((x * 0.03) + t) * h * 0.18 + Math.sin((x * 0.12) + t * 1.8) * h * 0.05;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "#39FF14";
      ctx.shadowColor = "#39FF14";
      ctx.shadowBlur = 8;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      t += 0.05;
      requestAnimationFrame(drawMiniChart);
    }
    drawMiniChart();
  }

  // progress percent counter
  const pct = document.getElementById("bannerAvancePct");
  if (pct) {
    let v = 0;
    const target = 78;
    const int = setInterval(() => {
      v += 1;
      pct.textContent = String(v);
      if (v >= target) clearInterval(int);
    }, 35);
  }

  // waveform bars bottom
  const wave = document.getElementById("bannerWaveform");
  if (wave) {
    const wctx = wave.getContext("2d");
    function resizeWave() {
      wave.width = wave.clientWidth;
      wave.height = wave.clientHeight;
    }
    resizeWave();
    window.addEventListener("resize", resizeWave);

    let phase = 0;
    function drawWave() {
      const w = wave.width;
      const h = wave.height;
      wctx.clearRect(0, 0, w, h);
      const bars = 80;
      const bw = w / bars;
      for (let i = 0; i < bars; i++) {
        const n = Math.sin((i * 0.32) + phase) * 0.5 + Math.sin((i * 0.08) + phase * 0.7) * 0.5;
        const mag = (n + 1) / 2;
        const barH = 4 + mag * (h - 6);
        const x = i * bw;
        const y = h - barH;
        wctx.fillStyle = `rgba(57,255,20,${0.3 + mag * 0.55})`;
        wctx.fillRect(x, y, bw - 1, barH);
      }
      phase += 0.07;
      requestAnimationFrame(drawWave);
    }
    drawWave();
  }

  // glitch bars (green + occasional red)
  const glitchLayer = document.getElementById("bannerGlitchBars");
  if (glitchLayer) {
    function spawnBar() {
      const bar = document.createElement("div");
      bar.className = "glitch-bar";
      const top = Math.random() * 100;
      const width = 12 + Math.random() * 38;
      const left = Math.random() * (100 - width);
      const h = Math.random() < 0.2 ? 3 : 2;
      const red = Math.random() < 0.14;

      bar.style.top = `${top}%`;
      bar.style.left = `${left}%`;
      bar.style.width = `${width}%`;
      bar.style.height = `${h}px`;
      bar.style.opacity = String(0.4 + Math.random() * 0.45);
      bar.style.background = red
        ? "linear-gradient(90deg, transparent, #ff3030, #ff3030, transparent)"
        : "linear-gradient(90deg, transparent, #39FF14, #39FF14, transparent)";
      bar.style.filter = `blur(${Math.random() < 0.25 ? 0.6 : 0}px)`;

      glitchLayer.appendChild(bar);
      setTimeout(() => bar.remove(), 70 + Math.random() * 130);
    }

    setInterval(() => {
      const burst = Math.random() < 0.14 ? 6 : 2;
      for (let i = 0; i < burst; i++) {
        setTimeout(spawnBar, i * 14);
      }
    }, 140);
  }

});
