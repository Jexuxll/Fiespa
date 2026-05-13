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
  const termLines = [
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
    "!! HIBRIDO_BIO-SINTOMA //",
  ];

  const termOutput = document.getElementById("bTermOutput");
  if (termOutput) {
    let lineIdx = 0;
    let charIdx = 0;
    let currentEl = null;

    function typeChar() {
      if (!currentEl) {
        if (lineIdx >= termLines.length) { lineIdx = 0; termOutput.innerHTML = ""; }
        currentEl = document.createElement("div");
        currentEl.className = "bterm-line" + (termLines[lineIdx].startsWith("!!") ? " bterm-warn" : "");
        termOutput.appendChild(currentEl);
        charIdx = 0;
      }
      const line = termLines[lineIdx];
      if (charIdx < line.length) {
        currentEl.textContent += line[charIdx++];
        setTimeout(typeChar, 22 + Math.random() * 44);
      } else {
        lineIdx++;
        currentEl = null;
        while (termOutput.children.length > 16) termOutput.removeChild(termOutput.firstChild);
        setTimeout(typeChar, 160 + Math.random() * 280);
      }
    }
    setTimeout(typeChar, 500);
  }

  const waveCanvas = document.getElementById("bannerWave");
  if (waveCanvas) {
    const wCtx = waveCanvas.getContext("2d");
    let wFrame = 0;
    const N = 80;

    function resizeWave() {
      waveCanvas.width  = waveCanvas.offsetWidth  || waveCanvas.parentElement.offsetWidth;
      waveCanvas.height = waveCanvas.offsetHeight || 48;
    }
    resizeWave();
    window.addEventListener("resize", resizeWave);

    function drawWave() {
      const W = waveCanvas.width, H = waveCanvas.height;
      wCtx.clearRect(0, 0, W, H);
      const barW = W / N;
      for (let i = 0; i < N; i++) {
        const t = wFrame * 0.05 + i * 0.38;
        const h = Math.max(2, (Math.sin(t) * 0.38 + Math.random() * 0.28 + 0.34) * H * 0.9);
        const x = i * barW + barW * 0.12;
        const bw = barW * 0.76;
        const alpha = 0.4 + (h / H) * 0.6;
        wCtx.fillStyle = `rgba(57,255,20,${alpha.toFixed(2)})`;
        wCtx.shadowColor = "#39FF14";
        wCtx.shadowBlur = 3;
        wCtx.fillRect(x, H - h, bw, h);
      }
      wCtx.shadowBlur = 0;
      wFrame++;
      requestAnimationFrame(drawWave);
    }
    drawWave();
  }

  const graphCanvas = document.getElementById("bGraphCanvas");
  if (graphCanvas) {
    const gCtx = graphCanvas.getContext("2d");

    function resizeGraph() {
      graphCanvas.width  = graphCanvas.offsetWidth  || graphCanvas.parentElement.offsetWidth || 200;
      graphCanvas.height = graphCanvas.offsetHeight || 52;
    }
    resizeGraph();
    window.addEventListener("resize", resizeGraph);

    const gHistory = [];
    let gLastVal = 50;
    let gFrame = 0;

    function drawGraph() {
      const W = graphCanvas.width, H = graphCanvas.height;
      const barW = 3, gap = 1, step = barW + gap;
      const maxBars = Math.floor(W / step);

      if (gFrame % 2 === 0) {
        // Movimiento más exagerado: rango 12..88 con saltos grandes
        gLastVal += (Math.random() - 0.46) * 32;
        gLastVal = Math.max(8, Math.min(96, gLastVal));
        // Cada ~20 frames un spike grande
        const spike = gFrame % 22 === 0;
        gHistory.push(spike
          ? 80 + Math.random() * 18
          : Math.max(6, Math.min(95, gLastVal + (Math.random() - 0.5) * 20)));
        if (gHistory.length > maxBars) gHistory.shift();
      }

      gCtx.fillStyle = "rgba(0,0,0,0.55)";
      gCtx.fillRect(0, 0, W, H);

      // Grid lines
      gCtx.strokeStyle = "rgba(57,255,20,0.12)";
      gCtx.lineWidth = 0.5;
      for (let i = 1; i < 4; i++) {
        const y = Math.round((H / 4) * i) + 0.5;
        gCtx.beginPath(); gCtx.moveTo(0, y); gCtx.lineTo(W, y); gCtx.stroke();
      }

      gHistory.forEach((v, i) => {
        const x = i * step;
        const barH = Math.max(1, Math.round((Math.max(0, Math.min(100, v)) / 100) * H));
        const y = H - barH;
        const alpha = 0.45 + (v / 100) * 0.55;
        gCtx.shadowColor = "#39FF14";
        gCtx.shadowBlur = 2;
        gCtx.fillStyle = `rgba(57,255,20,${alpha.toFixed(2)})`;
        gCtx.fillRect(x, y, barW, barH);
      });

      if (gHistory.length > 0) {
        const lx = (gHistory.length - 1) * step;
        const lh = Math.max(1, Math.round((Math.max(0, Math.min(100, gHistory[gHistory.length - 1])) / 100) * H));
        gCtx.fillStyle = "rgba(220,255,200,0.95)";
        gCtx.shadowBlur = 8;
        gCtx.fillRect(lx, H - lh, barW, 2);
      }

      gCtx.shadowBlur = 0;
      gFrame++;
      requestAnimationFrame(drawGraph);
    }
    drawGraph();

    const barFill = document.querySelector(".bbar-fill");
    if (barFill) {
      requestAnimationFrame(() => { setTimeout(() => { barFill.style.width = "78%"; }, 400); });
    }
  }

  // ---- CHART (panel derecho) — EKG multichannel retro ----
  const chartCanvas = document.getElementById("bChartCanvas");
  if (chartCanvas) {
    const cCtx = chartCanvas.getContext("2d");
    let cFrame = 0;
    const cBuf = [];      // canal verde (bio-señal)
    const cBuf2 = [];     // canal rojo (alerta)
    let cPhase = 0;

    function resizeChart() {
      chartCanvas.width  = chartCanvas.offsetWidth  || chartCanvas.parentElement.offsetWidth || 200;
      chartCanvas.height = chartCanvas.offsetHeight || 90;
    }
    resizeChart();
    window.addEventListener("resize", resizeChart);

    function drawChart() {
      const W = chartCanvas.width, H = chartCanvas.height;
      // trail fosfórico
      cCtx.fillStyle = "rgba(0,0,0,0.45)";
      cCtx.fillRect(0, 0, W, H);

      // Grid
      cCtx.strokeStyle = "rgba(57,255,20,0.1)";
      cCtx.lineWidth = 0.5;
      for (let i = 1; i < 4; i++) {
        const y = Math.round((H / 4) * i) + 0.5;
        cCtx.beginPath(); cCtx.moveTo(0, y); cCtx.lineTo(W, y); cCtx.stroke();
      }
      for (let i = 1; i < 6; i++) {
        const x = Math.round((W / 6) * i) + 0.5;
        cCtx.beginPath(); cCtx.moveTo(x, 0); cCtx.lineTo(x, H); cCtx.stroke();
      }

      // Genera puntos nuevos cada frame
      const spike = (cFrame % 38 === 0);
      const v1 = H * 0.5 + Math.sin(cPhase * 0.11) * H * 0.22
                          + Math.sin(cPhase * 0.37) * H * 0.08
                          + (spike ? -H * 0.36 : 0)
                          + (Math.random() - 0.5) * H * 0.04;
      const v2 = H * 0.72 + Math.sin(cPhase * 0.07 + 1.2) * H * 0.12
                           + (spike ? H * 0.18 : 0)
                           + (Math.random() - 0.5) * H * 0.03;
      cBuf.push(Math.max(2, Math.min(H - 2, v1)));
      cBuf2.push(Math.max(2, Math.min(H - 2, v2)));
      if (cBuf.length > W)  cBuf.shift();
      if (cBuf2.length > W) cBuf2.shift();

      // Canal rojo (fondo, más tenue)
      cCtx.beginPath();
      cBuf2.forEach((y, x) => x === 0 ? cCtx.moveTo(x, y) : cCtx.lineTo(x, y));
      cCtx.strokeStyle = "rgba(255,40,40,0.55)";
      cCtx.shadowColor  = "rgba(255,0,0,0.6)";
      cCtx.shadowBlur   = 4;
      cCtx.lineWidth    = 1;
      cCtx.stroke();

      // Canal verde (principal)
      cCtx.beginPath();
      cBuf.forEach((y, x) => x === 0 ? cCtx.moveTo(x, y) : cCtx.lineTo(x, y));
      cCtx.strokeStyle = "#39FF14";
      cCtx.shadowColor  = "#39FF14";
      cCtx.shadowBlur   = spike ? 10 : 5;
      cCtx.lineWidth    = 1.5;
      cCtx.stroke();

      // Cursor (punto brillante al final)
      if (cBuf.length > 0) {
        const cx = cBuf.length - 1, cy = cBuf[cBuf.length - 1];
        cCtx.beginPath();
        cCtx.arc(cx, cy, 2, 0, Math.PI * 2);
        cCtx.fillStyle = "rgba(220,255,200,0.95)";
        cCtx.shadowBlur = 10;
        cCtx.fill();
      }

      cCtx.shadowBlur = 0;
      cPhase++;
      cFrame++;
      requestAnimationFrame(drawChart);
    }
    drawChart();
  }

  // ---- CHART DERECHO — gráfico de línea scrolling (estilo ggplot retro) ----
  const chartRightCanvas = document.getElementById("bChartRightCanvas");
  if (chartRightCanvas) {
    const rCtx = chartRightCanvas.getContext("2d");
    const BUF_SIZE = 80;   // puntos máximos en pantalla
    const rBuf = [];       // historial de valores
    let rVal  = 180;
    let rFrame = 0;
    // Etiquetas fijas del eje Y
    const Y_LABELS = [0, 100, 200, 300, 400, 500];

    function resizeChartRight() {
      chartRightCanvas.width  = chartRightCanvas.offsetWidth  || chartRightCanvas.parentElement.offsetWidth || 200;
      chartRightCanvas.height = chartRightCanvas.offsetHeight || 120;
    }
    resizeChartRight();
    window.addEventListener("resize", resizeChartRight);

    function drawChartRight() {
      const W = chartRightCanvas.width, H = chartRightCanvas.height;
      const PAD_L = Math.round(W * 0.12);
      const PAD_B = Math.round(H * 0.14);
      const PAD_T = Math.round(H * 0.07);
      const PAD_R = 4;
      const plotW = W - PAD_L - PAD_R;
      const plotH = H - PAD_T - PAD_B;
      const Y_MIN = 0, Y_MAX = 520;

      // Fondo
      rCtx.fillStyle = "rgba(0,0,0,0.78)";
      rCtx.fillRect(0, 0, W, H);

      // Genera nuevo punto cada 3 frames — paseo aleatorio con reversión a la media
      if (rFrame % 3 === 0) {
        const mean = 200;
        const pull = (mean - rVal) * 0.04;   // fuerza que atrae hacia la media
        rVal += pull + (Math.random() - 0.5) * 50;
        // spikes ocasionales en cualquier dirección
        if (rFrame % 55 === 0) rVal += (Math.random() < 0.5 ? 1 : -1) * (60 + Math.random() * 80);
        rVal = Math.max(10, Math.min(510, rVal));
        rBuf.push(rVal);
        if (rBuf.length > BUF_SIZE) rBuf.shift();
      }

      // Grid
      rCtx.strokeStyle = "rgba(57,255,20,0.13)";
      rCtx.lineWidth = 0.5;
      const fSize = Math.max(8, Math.round(H * 0.09));
      rCtx.font = `${fSize}px 'SGK075','Courier New',monospace`;
      rCtx.fillStyle = "rgba(57,255,20,0.6)";
      rCtx.textAlign = "right";
      Y_LABELS.forEach(v => {
        const y = PAD_T + plotH - Math.round(((v - Y_MIN) / (Y_MAX - Y_MIN)) * plotH);
        rCtx.beginPath(); rCtx.moveTo(PAD_L, y + 0.5); rCtx.lineTo(W - PAD_R, y + 0.5); rCtx.stroke();
        rCtx.fillText(v, PAD_L - 2, y + Math.round(fSize * 0.35));
      });
      // Líneas verticales
      const vLines = 5;
      rCtx.strokeStyle = "rgba(57,255,20,0.07)";
      for (let i = 1; i <= vLines; i++) {
        const x = PAD_L + Math.round((plotW / (vLines + 1)) * i);
        rCtx.beginPath(); rCtx.moveTo(x + 0.5, PAD_T); rCtx.lineTo(x + 0.5, PAD_T + plotH); rCtx.stroke();
      }

      // Ejes
      rCtx.strokeStyle = "rgba(57,255,20,0.55)";
      rCtx.lineWidth = 1;
      rCtx.beginPath();
      rCtx.moveTo(PAD_L, PAD_T);
      rCtx.lineTo(PAD_L, PAD_T + plotH);
      rCtx.lineTo(W - PAD_R, PAD_T + plotH);
      rCtx.stroke();

      // Área rellena bajo la línea
      if (rBuf.length > 1) {
        const xStep = plotW / (BUF_SIZE - 1);
        const toY = v => PAD_T + plotH - Math.round(((v - Y_MIN) / (Y_MAX - Y_MIN)) * plotH);
        rCtx.beginPath();
        rBuf.forEach((v, i) => {
          const x = PAD_L + i * xStep;
          i === 0 ? rCtx.moveTo(x, toY(v)) : rCtx.lineTo(x, toY(v));
        });
        // Cierra área
        rCtx.lineTo(PAD_L + (rBuf.length - 1) * xStep, PAD_T + plotH);
        rCtx.lineTo(PAD_L, PAD_T + plotH);
        rCtx.closePath();
        const grad = rCtx.createLinearGradient(0, PAD_T, 0, PAD_T + plotH);
        grad.addColorStop(0, "rgba(57,255,20,0.18)");
        grad.addColorStop(1, "rgba(57,255,20,0.02)");
        rCtx.fillStyle = grad;
        rCtx.fill();

        // Línea principal
        rCtx.beginPath();
        rBuf.forEach((v, i) => {
          const x = PAD_L + i * xStep;
          i === 0 ? rCtx.moveTo(x, toY(v)) : rCtx.lineTo(x, toY(v));
        });
        rCtx.strokeStyle = "#39FF14";
        rCtx.shadowColor  = "#39FF14";
        rCtx.shadowBlur   = 5;
        rCtx.lineWidth    = 1.5;
        rCtx.stroke();

        // Punto final (cursor)
        const lastX = PAD_L + (rBuf.length - 1) * xStep;
        const lastY = toY(rBuf[rBuf.length - 1]);
        rCtx.beginPath();
        rCtx.arc(lastX, lastY, 3, 0, Math.PI * 2);
        rCtx.fillStyle = "rgba(220,255,200,0.95)";
        rCtx.shadowBlur = 10;
        rCtx.fill();
      }

      // Etiqueta eje X
      rCtx.shadowBlur = 0;
      rCtx.fillStyle  = "rgba(57,255,20,0.5)";
      rCtx.font       = `${Math.round(H * 0.1)}px 'SGK075','Courier New',monospace`;
      rCtx.textAlign  = "center";
      rCtx.fillText("X", PAD_L + plotW / 2, H - 1);
      // Etiqueta eje Y
      rCtx.save();
      rCtx.translate(Math.round(fSize * 0.7), PAD_T + plotH / 2);
      rCtx.rotate(-Math.PI / 2);
      rCtx.textAlign = "center";
      rCtx.fillText("Y", 0, 0);
      rCtx.restore();

      rFrame++;
      requestAnimationFrame(drawChartRight);
    }
    drawChartRight();
  }

  const scanCanvas = document.getElementById("bScanCanvas");
  if (scanCanvas) {
    // Rayos rojos desactivados — canvas queda transparente
  }

  const palmera = document.getElementById("bannerPalmera");
  if (palmera) {
    palmera.style.filter = "saturate(300%) brightness(1.25) drop-shadow(0 0 12px #39FF1470)";

    function glitchPalmera() {
      const flashes = 4 + Math.floor(Math.random() * 3);
      let i = 0;
      function step() {
        if (i >= flashes) {
          palmera.style.filter    = "saturate(300%) brightness(1.25) drop-shadow(0 0 12px #39FF1470)";
          palmera.style.transform = "";
          setTimeout(glitchPalmera, 7000 + Math.random() * 6000);
          return;
        }
        const dx = (Math.random() - 0.5) * 10;
        palmera.style.filter    = `drop-shadow(${dx}px 0 0 rgba(255,0,80,0.65)) drop-shadow(${-dx}px 0 0 rgba(0,200,255,0.65))`;
        palmera.style.transform = `translateX(${dx * 0.25}px)`;
        i++;
        setTimeout(step, 60 + Math.random() * 80);
      }
      step();
    }
    setTimeout(glitchPalmera, 2500 + Math.random() * 3500);
  }

  const pescao = document.getElementById("bannerPescao");
  if (pescao) {
    pescao.style.filter = "saturate(300%) brightness(1.25) drop-shadow(0 0 12px #39FF1470)";

    function glitchPescao() {
      const flashes = 4 + Math.floor(Math.random() * 3);
      let i = 0;
      function step() {
        if (i >= flashes) {
          pescao.style.filter    = "saturate(300%) brightness(1.25) drop-shadow(0 0 12px #39FF1470)";
          pescao.style.transform = "";
          setTimeout(glitchPescao, 6000 + Math.random() * 7000);
          return;
        }
        const dx = (Math.random() - 0.5) * 10;
        pescao.style.filter    = `drop-shadow(${dx}px 0 0 rgba(255,0,80,0.65)) drop-shadow(${-dx}px 0 0 rgba(0,200,255,0.65))`;
        pescao.style.transform = `translateX(${dx * 0.25}px)`;
        i++;
        setTimeout(step, 60 + Math.random() * 80);
      }
      step();
    }
    setTimeout(glitchPescao, 4000 + Math.random() * 4000);
  }

  // ---- GLITCH en el resto de elementos del banner ----
  // Aplica el mismo efecto cromático a: terminal, panel-right, canvases, pescao
  const glitchTargets = [
    { el: document.getElementById("bannerTerminal"),     base: "",  interval: [6000, 5000] },
    { el: document.querySelector(".banner-panel-right"), base: "",  interval: [8000, 6000] },
    { el: document.getElementById("bGraphCanvas"),      base: "",  interval: [11000, 5000], noTransform: true },
    { el: document.getElementById("bChartCanvas"),      base: "",  interval: [13000, 6000], noTransform: true },
    { el: document.getElementById("bChartRightCanvas"), base: "",  interval: [7000, 8000],  noTransform: true },
  ];

  function startElementGlitch({ el, base, interval, noTransform }) {
    if (!el) return;
    function fire() {
      const flashes = 3 + Math.floor(Math.random() * 4);
      let i = 0;
      function step() {
        if (i >= flashes) {
          el.style.filter    = base;
          if (!noTransform) el.style.transform = "";
          setTimeout(fire, interval[0] + Math.random() * interval[1]);
          return;
        }
        const dx = (Math.random() - 0.5) * 8;
        el.style.filter    = `drop-shadow(${dx}px 0 0 rgba(255,0,80,0.6)) drop-shadow(${-dx}px 0 0 rgba(0,200,255,0.6))`;
        if (!noTransform) el.style.transform = `translateX(${dx * 0.2}px)`;
        i++;
        setTimeout(step, 55 + Math.random() * 75);
      }
      step();
    }
    setTimeout(fire, interval[0] * Math.random()); // stagger inicial
  }

  glitchTargets.forEach(startElementGlitch);

  const glitchCanvas = document.getElementById("bannerGlitch");
  if (glitchCanvas) {
    const glCtx = glitchCanvas.getContext("2d");
    let burstActive = false;
    let burstEnd = 0;
    let nextBurstAt = Date.now() + 3000 + Math.random() * 3000;
    let glFrame = 0;

    function resizeGlitch() {
      glitchCanvas.width  = glitchCanvas.offsetWidth  || glitchCanvas.parentElement.offsetWidth;
      glitchCanvas.height = glitchCanvas.offsetHeight || 300;
    }
    resizeGlitch();
    window.addEventListener("resize", resizeGlitch);

    function drawGlitchBars() {
      glFrame++;
      const now = Date.now();
      if (!burstActive && now > nextBurstAt) {
        burstActive = true;
        burstEnd    = now + 250 + Math.random() * 450;
      }
      if (burstActive && now > burstEnd) {
        burstActive = false;
        nextBurstAt = now + 3000 + Math.random() * 3000;
      }

      if (burstActive || glFrame % 3 === 0) {
        const W = glitchCanvas.width, H = glitchCanvas.height;
        glCtx.clearRect(0, 0, W, H);
        const numBars = burstActive ? 10 + Math.floor(Math.random() * 12) : 2 + Math.floor(Math.random() * 3);

        for (let i = 0; i < numBars; i++) {
          const y = Math.random() * H;
          // Barras más variadas: ocasionalmente muy grandes
          const roll = Math.random();
          const barH = roll < 0.08 ? 8 + Math.random() * 22
                     : roll < 0.25 ? 3 + Math.random() * 6
                     : 1;
          const barW = (0.08 + Math.random() * 0.72) * W;
          const x = Math.random() * (W - barW);
          const isRed = Math.random() < (burstActive ? 0.28 : 0.12);
          const alpha = 0.25 + Math.random() * 0.55;
          glCtx.fillStyle = isRed ? `rgba(255,50,0,${alpha.toFixed(2)})` : `rgba(57,255,20,${alpha.toFixed(2)})`;
          glCtx.fillRect(x, y, barW, barH);
        }
      } else if (glFrame % 3 === 1) {
        glCtx.clearRect(0, 0, glitchCanvas.width, glitchCanvas.height);
      }

      requestAnimationFrame(drawGlitchBars);
    }
    drawGlitchBars();
  }

});
