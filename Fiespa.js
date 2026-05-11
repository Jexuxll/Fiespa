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
