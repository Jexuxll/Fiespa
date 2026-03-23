// CONFIGURACIÓN GOOGLE FORMS
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdnVUO847DbfLZRgosgbX6uupVWoaPryeoUuuZPyc-aR_xEUA/formResponse";
const ENTRY_ALIAS = "entry.788093874";
const ENTRY_CAPITULO = "entry.138641531";
const ENTRY_RESPUESTA = "entry.1826188647";

// FUNCIÓN DE ENVÍO
function enviarAGoogleForms(alias, capitulo, respuesta) {
  const datos = new URLSearchParams();

  datos.append(ENTRY_ALIAS, alias);
  datos.append(ENTRY_CAPITULO, capitulo);
  datos.append(ENTRY_RESPUESTA, respuesta);

  fetch(FORM_URL, {
    method: "POST",
    mode: "no-cors",
    body: datos
  });
}

// ===============================
// CONFIGURACIÓN DE CAPÍTULOS
// ===============================

const capitulos = [
  {
    id: "INF_01",
    fecha: "2026-01-01",
    titulo: "Registro 01",
    mensajes: [
      "Registro 01...",
      "El paciente cero ha dejado de responder a los mensajes.",
      "Las cámaras del laboratorio muestran movimiento en la zona húmeda.",
      "El agua parece… agitarse sola."
    ],
    opciones: [
      {
        texto: "Revisar cámaras del laboratorio",
        respuesta: "Accediendo a cámaras... Se detecta actividad biológica desconocida."
      },
      {
        texto: "Ignorar anomalía",
        respuesta: "Anomalía registrada. Sin acción."
      },
      {
        texto: "Bloquear acceso al área",
        respuesta: "Zona sellada. Presión interna aumentando."
      }
    ]
  },

  {
    id: "INF_02",
    fecha: "2026-03-04",
    titulo: "Registro 02",
    mensajes: [
      "Registro 02...",
      "Se ha encontrado agua salada en zonas donde no debería haberla.",
      "El paciente cero dejó una nota en el sistema:",
      "\"No es un virus… es una adaptación.\""
    ],
    opciones: [
      {
        texto: "Analizar muestra",
        respuesta: "Muestra analizada. Resultado: mutación activa."
      },
      {
        texto: "Intentar contactar con el paciente",
        respuesta: "Sin respuesta. Señal inestable."
      },
      {
        texto: "Cerrar el laboratorio",
        respuesta: "Protocolo de cierre iniciado."
      }
    ]
  },

  {
    id: "INF_03",
    fecha: "2026-01-07",
    titulo: "Registro 03",
    mensajes: [
      "Registro 03...",
      "Se escuchan golpes en los conductos.",
      "Las cámaras muestran una silueta…",
      "No parece completamente humana."
    ],
    opciones: [
      {
        texto: "Abrir compuertas",
        respuesta: "Compuertas abiertas. Movimiento detectado."
      },
      {
        texto: "Activar sistema de contención",
        respuesta: "Sistema de contención activo."
      },
      {
        texto: "Apagar cámaras",
        respuesta: "Cámaras desactivadas. Sin señal."
      }
    ]
  },

  {
    id: "INF_04",
    fecha: "2026-01-10",
    titulo: "Registro 04",
    mensajes: [
      "Registro 04...",
      "El sistema ha detectado agua en los pasillos principales.",
      "Algo se mueve bajo la superficie.",
      "Se ha perdido contacto con el paciente cero definitivamente."
    ],
    opciones: [
      {
        texto: "Drenar el sistema",
        respuesta: "Drenaje iniciado. Ruido de arrastre detectado."
      },
      {
        texto: "Investigar manualmente",
        respuesta: "Puerta abierta. Sensores indican humedad extrema."
      },
      {
        texto: "Abandonar el sistema",
        respuesta: "Salida registrada. El sistema continuará sin supervisión."
      }
    ]
  }
];



function obtenerCapituloDisponible() {
  const hoy = new Date();

  let disponible = null;

  capitulos.forEach(cap => {
    const fechaCap = new Date(cap.fecha);
    if (hoy >= fechaCap) {
      disponible = cap;
    }
  });

  return disponible;
}


// ===============================
// ELEMENTOS DOM
// ===============================

const login = document.getElementById("login");
const sistema = document.getElementById("sistema");
const saludo = document.getElementById("saludo");
const mensajesDiv = document.getElementById("mensajes");
const opcionesDiv = document.getElementById("opciones");

// ===============================
// LOGIN
// ===============================

const CLAVE_SECRETA = "PABLO";

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const alias = document.getElementById("alias").value.trim();
  const clave = document.getElementById("clave").value.trim();
  const error = document.getElementById("error");

  if (!alias || !clave) return;

  if (clave !== CLAVE_SECRETA) {
    error.textContent = "CLAVE INCORRECTA.";
    return;
  }

  localStorage.setItem("alias", alias);
  iniciarSistema(alias);
});

// Autologin
const aliasGuardado = localStorage.getItem("alias");
if (aliasGuardado) {
  iniciarSistema(aliasGuardado);
}

// ===============================
// INICIAR SISTEMA
// ===============================

function iniciarSistema(alias) {
  login.classList.add("oculto");
  sistema.classList.remove("oculto");
  saludo.textContent = `Usuario ${alias} autorizado.`;
  document.querySelector(".terminal").classList.add("activo");

  renderizarListaCapitulos();
}


// ===============================
// CAPÍTULOS POR FECHA
// ===============================

function renderizarListaCapitulos() {
  const lista = document.getElementById("listaCapitulos");
  lista.innerHTML = "";

  const hoy = new Date();

  capitulos.forEach((cap, index) => {
    const fechaCap = new Date(cap.fecha);
    const desbloqueado = hoy >= fechaCap;

    const btn = document.createElement("button");
    btn.className = "capituloBtn";

    if (desbloqueado) {
      btn.textContent = cap.id;
      btn.onclick = () => abrirCapitulo(index);
    } else {
      btn.textContent = "[ BLOQUEADO ]";
      btn.classList.add("bloqueado");
    }

    lista.appendChild(btn);
  });
}

function abrirCapitulo(index) {
  capituloActual = index;
  mostrarCapitulo();
}


// ===============================
// MOSTRAR CAPÍTULO
// ===============================

function mostrarCapitulo() {
  const cap = capitulos[capituloActual];
  const claveDecision = "decision_" + cap.id;

  mensajesDiv.innerHTML = "";
  opcionesDiv.innerHTML = "";

  // Si ya respondió este capítulo
  const decisionGuardada = localStorage.getItem(claveDecision);
  if (decisionGuardada) {
    mostrarMensaje("> Decisión registrada: " + decisionGuardada);
    return;
  }

  cap.mensajes.forEach((texto, i) => {
    setTimeout(() => {
      mostrarMensaje("> " + texto);

      if (i === cap.mensajes.length - 1) {
        setTimeout(mostrarOpciones, 800);
      }
    }, i * 1000);
  });
}

function mostrarMensaje(texto) {
  const p = document.createElement("p");
  p.className = "mensaje";
  p.textContent = texto;
  mensajesDiv.appendChild(p);

  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
}

// ===============================
// OPCIONES
// ===============================

function mostrarOpciones() {
  const cap = capitulos[capituloActual];

  cap.opciones.forEach((op) => {
    const btn = document.createElement("button");
    btn.textContent = "> " + op.texto;

    btn.onclick = () => {
      responder(op);
    };

    opcionesDiv.appendChild(btn);
  });
}

function responder(opcion) {
  const cap = capitulos[capituloActual];
  const claveDecision = "decision_" + cap.id;

  localStorage.setItem(claveDecision, opcion.texto);

  // Enviar a Google Forms
  const alias = localStorage.getItem("alias") || "SIN_ALIAS";
  enviarAGoogleForms(alias, cap.id, opcion.texto);

  opcionesDiv.innerHTML = "";

  mostrarMensaje("> " + opcion.respuesta);
}
