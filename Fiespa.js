const MENSAJES_DECISION = {
  A: "Has demostrado lealtad. Algunos sobreviven gracias a gestos como el tuyo.",
  B: "Has priorizado el avance. No todos pueden seguir el ritmo.",
  C: "Has tomado una decisión fría. A veces la supervivencia exige sacrificios."
};

// ==========================
// CONTADOR REGRESIVO
// ==========================
const fechaObjetivo = new Date("2026-04-31 23:59:59").getTime();

const intervalo = setInterval(() => {
  const ahora = new Date().getTime();
  const diferencia = fechaObjetivo - ahora;

  if (diferencia <= 0) {
    clearInterval(intervalo);
    document.getElementById("contador").textContent = "¡Tiempo terminado!";
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
// SISTEMA DE REGISTRO / HISTORIA
// ==========================

const CAPITULO = "INF_01";

// ⚠️ CAMBIA ESTO POR TU GOOGLE FORM
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdnVUO847DbfLZRgosgbX6uupVWoaPryeoUuuZPyc-aR_xEUA/formResponse";
const ENTRY_ALIAS = "entry.788093874";
const ENTRY_CAPITULO = "entry.138641531";
const ENTRY_RESPUESTA = "entry.1826188647";

const aliasGuardado = localStorage.getItem("alias");

const registro = document.getElementById("registro");
const decision = document.getElementById("decision");
const saludo = document.getElementById("saludo");

if (aliasGuardado) {
  mostrarDecision(aliasGuardado);
}

document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const alias = document.getElementById("alias").value.trim();

  if (alias) {
    localStorage.setItem("alias", alias);
    mostrarDecision(alias);
  }
});

function mostrarDecision(alias) {
  registro.style.display = "none";
  decision.style.display = "block";
  saludo.textContent = `Bienvenid@, ${alias}. Tu perfil ha sido localizado.`;
}

let opcionSeleccionada = null;
const CLAVE_DECISION = "decision_INF_01";


function enviarDecision(opcion) {

  // ⛔ Bloqueo inmediato
  if (localStorage.getItem(CLAVE_DECISION)) return;

  opcionSeleccionada = opcion;

  const textos = {
    A: "Le ayudas",
    B: "Continúas",
    C: "Lo utilizas como distracción"
  };

  document.getElementById("popupTexto").textContent =
    `Has elegido:\n\n"${textos[opcion]}".\n\nEsta decisión no podrá ser revertida.`;

  document.getElementById("popupConfirmacion").classList.remove("oculto");
}

document.getElementById("popupOk").onclick = () => {
  document.getElementById("popupConfirmacion").classList.add("oculto");
  registrarDecision(opcionSeleccionada);
};

document.getElementById("popupCancel").onclick = () => {
  opcionSeleccionada = null;
  document.getElementById("popupConfirmacion").classList.add("oculto");
};

function registrarDecision(opcion) {

  // 🔐 Bloqueo definitivo
  if (localStorage.getItem(CLAVE_DECISION)) return;

  const datos = new URLSearchParams();
  const alias = localStorage.getItem("alias") || "SIN_ALIAS";

  const textos = {
    A: "Le ayudas",
    B: "Continúas",
    C: "Lo utilizas como distracción"
  };

  datos.append(ENTRY_ALIAS, alias);
  datos.append(ENTRY_CAPITULO, "INF_01");
  datos.append(ENTRY_RESPUESTA, textos[opcion]);

  fetch(FORM_URL, {
    method: "POST",
    mode: "no-cors",
    body: datos
  });

  localStorage.setItem(CLAVE_DECISION, opcion);

  mostrarResultado(opcion);
}

function mostrarResultado(opcion) {
  const pregunta = document.getElementById("pregunta");

  pregunta.classList.add("ocultar");

  document.querySelector("#respuestas").style.display = "none";

  document.getElementById("respuesta").textContent =
    MENSAJES_DECISION[opcion];
}



document.addEventListener("DOMContentLoaded", () => {
  const decision = localStorage.getItem(CLAVE_DECISION);

  if (decision) {
    document.getElementById("pregunta").classList.add("ocultar");
    mostrarResultado(decision);
  }
});


// ==========================
// CARRUSEL AUTOMÁTICO
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);

  if (!viewport || slides.length === 0) return;

  const visible = 3;
  const gap = 24;

  // Clonamos las primeras imágenes
  for (let i = 0; i < visible; i++) {
    const clone = slides[i].cloneNode(true);
    clone.classList.add("clone");
    track.appendChild(clone);
  }

  let index = 0;

  function slideWidth() {
    return slides[0].offsetWidth + gap;
  }

  function move() {
    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(-${index * slideWidth()}px)`;
  }

  setInterval(() => {
    index++;
    move();

    // Cuando llegamos al final "falso"
    if (index === slides.length) {
      setTimeout(() => {
        track.style.transition = "none";
        index = 0;
        track.style.transform = `translateX(0px)`;
      }, 650); // un poco más que la transición
    }
  }, 4000);
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
// TRANSICIONES DESPUÉS DE CARGA
// ==========================

window.addEventListener("load", () => {
  document.body.classList.remove("no-transition");
});
