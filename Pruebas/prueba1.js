const CLAVE_SECRETA = "PABLO";

// ===============================
// CAPÍTULOS COMO CHAT
// ===============================

const capitulos = [
  {
    id: "CHAT_01",
    fecha: "2026-01-01",
    mensajes: [
      "¿Hay alguien ahí?",
      "Si estás viendo esto… es que entraste en el sistema.",
      "No sé cuánto tiempo me queda.",
      "Algo va mal con el agua del laboratorio.",
      "Se mueve sola."
    ],
    opciones: [
      {
        texto: "¿Dónde estás?",
        respuesta: "En la zona húmeda… o lo que queda de ella."
      },
      {
        texto: "Sal de ahí ahora",
        respuesta: "No puedo. Las puertas no responden."
      },
      {
        texto: "¿Qué has hecho?",
        respuesta: "Solo probé una muestra… pensé que era segura."
      }
    ]
  },
  {
    id: "CHAT_02",
    fecha: "2026-01-04",
    mensajes: [
      "Sigues ahí… bien.",
      "He empezado a notar cosas raras.",
      "La piel me arde cuando se seca.",
      "Pero cuando me mojo… se me pasa.",
      "Creo que no es un virus."
    ],
    opciones: [
      {
        texto: "¿Entonces qué es?",
        respuesta: "Una adaptación… como si mi cuerpo estuviera cambiando."
      },
      {
        texto: "Eso no suena bien",
        respuesta: "No, no lo suena."
      },
      {
        texto: "Busca una salida",
        respuesta: "El pasillo está inundado."
      }
    ]
  },
  {
    id: "CHAT_03",
    fecha: "2026-01-07",
    mensajes: [
      "No soy el único aquí.",
      "Escucho cosas en los conductos.",
      "Como si algo arrastrara el cuerpo por el metal.",
      "Antes no estaban."
    ],
    opciones: [
      {
        texto: "¿Puedes verlos?",
        respuesta: "Solo sombras… pero se mueven demasiado rápido."
      },
      {
        texto: "Escóndete",
        respuesta: "El agua ya me llega a las rodillas."
      },
      {
        texto: "Intenta salir nadando",
        respuesta: "Nunca pensé que eso sería una opción real."
      }
    ]
  },
  {
    id: "CHAT_04",
    fecha: "2026-01-10",
    mensajes: [
      "Creo que lo entiendo ahora.",
      "No está intentando matarme.",
      "Está intentando cambiarme.",
      "El agua… me llama."
    ],
    opciones: [
      {
        texto: "Resiste",
        respuesta: "No sé si quiero hacerlo."
      },
      {
        texto: "Sal de ahí ya",
        respuesta: "Demasiado tarde."
      },
      {
        texto: "¿Qué ves?",
        respuesta: "Algo moviéndose bajo la superficie… esperándome."
      }
    ]
  }
];

// ===============================
// ELEMENTOS
// ===============================

const login = document.getElementById("login");
const sistema = document.getElementById("sistema");
const saludo = document.getElementById("saludo");
const mensajesDiv = document.getElementById("mensajes");
const opcionesDiv = document.getElementById("opciones");

// ===============================
// LOGIN
// ===============================

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const alias = document.getElementById("alias").value.trim();
  const clave = document.getElementById("clave").value.trim();
  const error = document.getElementById("error");

  if (!alias || clave !== CLAVE_SECRETA) {
    error.textContent = "CLAVE INCORRECTA.";
    return;
  }

  localStorage.setItem("alias", alias);
  iniciarSistema(alias);
});

const aliasGuardado = localStorage.getItem("alias");
if (aliasGuardado) iniciarSistema(aliasGuardado);

// ===============================
// SISTEMA
// ===============================

function iniciarSistema(alias) {
  login.classList.add("oculto");
  sistema.classList.remove("oculto");
  saludo.textContent = `Usuario ${alias} autorizado.`;
  document.querySelector(".terminal").classList.add("activo");

  cargarHistorial();
  comprobarNuevosCapitulos();
}

// ===============================
// CHAT CONTINUO
// ===============================

function cargarHistorial() {
  const historial = localStorage.getItem("chatHistorial");
  if (historial) {
    mensajesDiv.innerHTML = historial;
  }
}

function guardarHistorial() {
  localStorage.setItem("chatHistorial", mensajesDiv.innerHTML);
}

function comprobarNuevosCapitulos() {
  const hoy = new Date();

  capitulos.forEach((cap, index) => {
    const claveVisto = "cap_visto_" + cap.id;

    if (hoy >= new Date(cap.fecha) && !localStorage.getItem(claveVisto)) {
      lanzarCapitulo(index);
      localStorage.setItem(claveVisto, "1");
    }
  });
}

function lanzarCapitulo(index) {
  const cap = capitulos[index];
  const claveDecision = "decision_" + cap.id;

  cap.mensajes.forEach((texto, i) => {
    setTimeout(() => {
      agregarMensajeSistema(texto);

      if (i === cap.mensajes.length - 1) {
        const decisionGuardada = localStorage.getItem(claveDecision);
        if (!decisionGuardada) {
          setTimeout(() => mostrarOpciones(index), 600);
        }
      }
    }, i * 1000);
  });
}

function agregarMensajeSistema(texto) {
  const div = document.createElement("div");
  div.className = "mensajeSistema";
  div.textContent = texto;
  mensajesDiv.appendChild(div);
  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
  guardarHistorial();
}

function agregarMensajeJugador(texto) {
  const div = document.createElement("div");
  div.className = "mensajeJugador";
  div.textContent = texto;
  mensajesDiv.appendChild(div);
  mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
  guardarHistorial();
}

function mostrarOpciones(index) {
  const cap = capitulos[index];

  opcionesDiv.innerHTML = "";

  cap.opciones.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op.texto;

    btn.onclick = () => responder(op, cap);
    opcionesDiv.appendChild(btn);
  });
}

function responder(opcion, cap) {
  const claveDecision = "decision_" + cap.id;

  localStorage.setItem(claveDecision, opcion.texto);
  opcionesDiv.innerHTML = "";

  agregarMensajeJugador(opcion.texto);

  setTimeout(() => {
    agregarMensajeSistema(opcion.respuesta);
  }, 600);
}