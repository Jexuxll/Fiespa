const CLAVE_SECRETA = "PABLO";
const USUARIO_POR_DEFECTO = "Usuario";
let nombreJugador = localStorage.getItem("nombreJugador") || "";

function actualizarAlturaViewport() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

actualizarAlturaViewport();
window.addEventListener("resize", actualizarAlturaViewport);
window.addEventListener("orientationchange", actualizarAlturaViewport);

// ===============================
// GOOGLE FORMS (ENVÍO DE RESPUESTAS)
// ===============================

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdnVUO847DbfLZRgosgbX6uupVWoaPryeoUuuZPyc-aR_xEUA/formResponse";
const ENTRY_ALIAS = "entry.788093874";
const ENTRY_CAPITULO = "entry.138641531";
const ENTRY_RESPUESTA1 = "entry.1826188647";
const ENTRY_RESPUESTA2 = "entry.454956127";

function enviarAGoogleForms(capId){

  const alias = localStorage.getItem("nombreJugador") || "Anonimo";
  const capitulo = capId;

  const r1 = localStorage.getItem("opcion_" + capId + "_1") || "";
  const r2 = localStorage.getItem("opcion_" + capId + "_2") || "";

  console.log("Enviando:", {alias, capitulo, r1, r2});

  const datos = new URLSearchParams();

  datos.append(ENTRY_ALIAS, alias);
  datos.append(ENTRY_CAPITULO, capitulo);
  datos.append(ENTRY_RESPUESTA1, r1);
  datos.append(ENTRY_RESPUESTA2, r2);

  fetch(FORM_URL, {
    method: "POST",
    mode: "no-cors",
    body: datos
  });
}



// SONIDO
let sonidoTecla = document.getElementById("tecleo");
if (sonidoTecla) {
  sonidoTecla.volume = 0.15;
}

let audioHabilitado = true;
const audiosActivos = new Set();

function detenerTodoAudio() {
  if (sonidoTecla) {
    sonidoTecla.pause();
    sonidoTecla.currentTime = 0;
  }

  audiosActivos.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });

  audiosActivos.clear();
}

function pausarAudioPorSalida() {
  audioHabilitado = false;
  detenerTodoAudio();
}

function restaurarAudio() {
  audioHabilitado = true;
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    pausarAudioPorSalida();
  } else {
    restaurarAudio();
  }
});

window.addEventListener("pagehide", pausarAudioPorSalida);
window.addEventListener("beforeunload", pausarAudioPorSalida);
window.addEventListener("blur", pausarAudioPorSalida);
window.addEventListener("focus", restaurarAudio);

const btnReiniciar = document.getElementById("btnReiniciar");
if (btnReiniciar) {
  btnReiniciar.addEventListener("click", () => {
    pausarAudioPorSalida();
    window.location.reload();
  });
}

let escrituraEnCurso = null;

function saltarAnimacionEscritura() {
  if (escrituraEnCurso) {
    const estado = escrituraEnCurso;
    clearTimeout(estado.timeoutId);
    estado.div.textContent = estado.texto;
    escrituraEnCurso = null;
    detenerTodoAudio();

    if (estado.callback) {
      estado.callback();
    }
  }
}

function esCampoTexto(elemento) {
  if (!elemento) return false;
  const tag = elemento.tagName;
  return tag === "INPUT" || tag === "TEXTAREA";
}

function debeIgnorarToqueAvance(elemento) {
  if (!elemento || !elemento.closest) return false;
  return Boolean(elemento.closest("button, input, textarea"));
}

document.addEventListener("pointerdown", (e) => {
  if (debeIgnorarToqueAvance(e.target)) return;
  saltarAnimacionEscritura();
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  if (esCampoTexto(document.activeElement)) return;

  e.preventDefault();
  saltarAnimacionEscritura();
});

// ===============================
// INTRO (ANTES DEL CHAT)
// ===============================

function pedirNombre() {

  // Si ya existe, saltamos
  if (nombreJugador) {
    setTimeout(() => comprobarNuevosCapitulos(), 800);
    return;
  }

  agregarMensajeSistema("PABLO_ADMIN: ¿Hay alguien ahí? ¿Quién eres?", () => {

    opcionesDiv.innerHTML = "";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "ESCRIBE TU NOMBRE...";
    input.className = "inputNombre";

    input.addEventListener("keydown", function(e){
      if(e.key === "Enter" && input.value.trim() !== ""){

        nombreJugador = input.value.trim();
        localStorage.setItem("nombreJugador", nombreJugador);

        opcionesDiv.innerHTML = "";

        agregarMensajeJugador("Soy " + nombreJugador, () => {
          setTimeout(() => comprobarNuevosCapitulos(), 800);
        });
      }
    });

    opcionesDiv.appendChild(input);
    input.focus();
  });
}

// ===============================
// CAPÍTULOS
// ===============================

const capitulos = [
  {
    id: "CHAT_01",
    fecha: "2026-01-01",
    pasos: [
      {
        mensajes: [
          () =>`${nombreJugador || "Usuario"}, menos mal que te conectas...`,
          "Llevo días encerrado en el laboratorio de la facultad.",
          "Encontré algo en los archivos muertos.",
          "Una muestra congelada de la Fosa de las Marianas.",
          "La llamaban Cepa-0.",
          "La he descongelado en secreto."
        ]
      },
      {
        opciones: [
          {
            texto: "Regañar",
            mensajes: [
              "¿Estás loco?",
              "¡Devuelve eso antes de que te pillen!"
            ]
          },
          {
            texto: "Preguntar sobre la muestra",
            mensajes: [
              "¿Y qué es?", 
              "¿Está viva?"
            ]
          }
        ],
        respuesta: [ 
              "No es como pensamos.",
              "Reacciona a mí.",
              "Cuando acerco la mano, el líquido viscoso del interior del frasco vibra.",
              "Siento que... me está estudiando a través del cristal."
            ]
      },
      {
        opciones: [
          {
            texto: "Avisar del peligro",
            mensajes: [
            "Aléjate de ahí, Pablo.", 
            "No me da buena espina."
            ],
          },
          {
            texto: "Mostrar curiosidad",
            mensajes: [
            "Toca el cristal.", 
            "A ver qué hace si te acercas más."
            ]
          }
        ],
        respuesta: [ 
              "Mierda, oigo pasos en el pasillo.",
              "Creo que los de seguridad están haciendo ronda.",
              "Me desconecto rápido.",
              "No le digas a nadie que has hablado conmigo.",
              "Vuelve a entrar en 2 días, por favor."
        ]
      }
    ]
  },

  {
    id: "CHAT_02",
    fecha: "2026-01-03",
    pasos: [
      {
        mensajes: [
          () =>`${nombreJugador || "Usuario"}, he tenido que sacar la muestra del edificio.`,
          "La tengo en mi casa. Hubo un accidente.",
          "El frasco se agrietó y me corté al intentar meterlo en la mochila."
        ],
      },
      {
      opciones: [
        {
          texto: "Insistir en el peligro",
          mensajes: [
            "¡Vete a urgencias ahora mismo!",
            "Puedes infectarte."
          ]
        },
        {
          texto: "Preguntar por la herida",
          mensajes: [
            "¿Te duele?",
            "¿Qué ha pasado con la herida?"
          ]
        }
      ],
      respuesta: [ 
            "Ese es el tema.",
            "No sangra.",
            "La piel se ha sellado sola, pero está... fría.",
            "Muy fría. Y húmeda.",
            "Lo más raro es que mi mente va a mil por hora.",
            "Siento que he estado dormido toda mi vida y acabo de despertar."
      ]
    },
    {
      opciones: [
        {
          texto: "Recomendar ir al médico",
          mensajes: [
          "Eso no es normal, Pablo.", 
          "Es una infección cerebral, pide ayuda."
          ]
        },
        {
          texto: "Mostrar apoyo",
          mensajes: [
          "Suena a que te ha mejorado.", 
          "¿Qué más sientes?"
          ]
        }
      ],  
      respuesta: [ 
          "Tengo muchísima sed.",
          "Pero el agua del grifo me sabe a metal, como a sangre vieja.",
          "Necesito preparar agua con sal.",
          "La piel me pica horrores.",
          "Me tengo que ir, hablamos en 48 horas... si sigo aquí."
        ]
      }
    ]
  },

  {
    id: "CHAT_03",
    fecha: "2026-01-05",
    pasos: [
      {
        mensajes: [
          "He tapado todas las ventanas de casa.",
          "La luz del sol hace un ruido espantoso.",
          "Sí, un ruido.",
          "Mis sentidos se están mezclando.",
          "Todo me huele a salitre y a abismo."
        ]
      },
      {
        opciones: [
          {
            texto: "Mostrar preocupación",
            mensajes: [
              "Voy a ir a tu casa.",
              "Ábreme la puerta en cuanto llegue."
            ]
          },
          {
            texto: "Calmarlo y preguntar",
            mensajes: [
              "Intenta calmarte.",
              "Describe exactamente qué ves o qué oyes."
            ]
          }
        ],
        respuesta: [ 
            "Cierro los ojos y veo corrientes oscuras.",
            "La Cepa-0 no es un virus... es una red.",
            "Y quiere conectarse.",
            "Quiere que os conectéis todos.",
            "Dice que la superficie es un error."
        ]
      },
      {
        opciones: [
          {
            texto: "Advertir del peligro",
            mensajes: [
            "No me metas en tus locuras.", 
            "Voy a llamar a la policía."
            ]
          },
          {
            texto: "Mostrar interés",
            mensajes: [
            "¿Conectarnos cómo?", 
            "¿A través de ti?"
            ]
          }
        ],
        respuesta: [ 
            "No puedo teclear bien.",
            "Mis dedos... están perdiendo su forma humana.",
            "Están resbaladizos.",
            "El teclado está empapado.",
            "Necesito sumergirme en la bañera ya.",
            "Conéctate en un par de días."
        ]
      }
    ]
  },

  {
    id: "CHAT_04",
    fecha: "2026-01-05",
    pasos: [
      {
        mensajes: [
          "¿Sigues ahí? El agua de la bañera está negra.",
          "Llevo horas dentro.",
          "O días, no lo sé.",
          "He entendido el mensaje.",
          "La individualidad es nuestro mayor defecto.",
          "En la profundidad, todos nadan juntos.",
          "Todos son uno."
        ]
      },
      {
        opciones: [
          {
            texto: "Intentar hacerle entrar en razón",
            mensajes: [
              "Te estás perdiendo.",
              "Lucha contra eso, recuerda quién eres."
            ]
          },
          {
            texto: "Entender y aceptar",
            mensajes: [
              "Suena a que has encontrado la paz que buscabas."
            ]
          }
        ],
        respuesta: [ 
              "He estado analizando tu patrón de respuestas, " + (nombreJugador || "Usuario") + ".",
              "La muestra me pide que seleccione a los aptos.",
              "No todos pueden sobrevivir a la inmensa presión del abismo."
        ]
      },
      {
        opciones: [
          {
            texto: "Mostrar rechazo",
            mensajes: [
            "Ni se te ocurra acercarte a mí con esa cosa."
            ]
          },
          {
            texto: "Unirte a él",
            mensajes: [
            "¿Y bien?", 
            "¿Crees que yo sería apta para el cambio?"
            ]
          }
        ],
        respuesta: [ 
              "El cristal de la pantalla se está empañando por dentro.",
              "Ya casi no veo las letras brillantes.",
              "El baño se me ha quedado pequeño.",
              "El océano llama.",
              "Te diré dónde ir.",
              "Pronto."
        ]
      }
    ]
  },

  {
    id: "CHAT_05",
    fecha: "2026-01-05",
    pasos: [
      {
        mensajes: [
          "Este es mi último mensaje.",
          "El aire terrestre me quema los pulmones.",
          "Ya no puedo respirar aquí arriba.",
          "Me llevo la muestra.",
          "O ella me lleva a mí.",
          "He enviado las coordenadas físicas de la extracción a vuestro correo postal."
        ]
      },
      {
        opciones: [
          {
            texto: "...",
            mensajes: [
              " "
            ]
          }
        ],
        respuesta: [
            "Si vienes a las coordenadas, ven preparado para dejar tu piel seca atrás.",
            "La marea no espera."
        ]
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

  const clave = document.getElementById("clave").value.trim();
  const error = document.getElementById("error");
  const alias = USUARIO_POR_DEFECTO;

  if (clave !== CLAVE_SECRETA) {
    error.textContent = "CLAVE INCORRECTA.";
    return;
  }

  localStorage.setItem("alias", alias);

  // 🔥 NO LIMPIAR HISTORIAL, mantenerlo
  // localStorage.removeItem("chatHistorial");

  iniciarSistema(alias);
});

const claveInput = document.getElementById("clave");
if (claveInput) {
  claveInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById("loginForm").requestSubmit();
    }
  });
}

const aliasGuardado = localStorage.getItem("alias");
if (aliasGuardado) iniciarSistema(USUARIO_POR_DEFECTO);

// ===============================
// INICIO SISTEMA
// ===============================

function iniciarSistema(alias) {
  login.classList.add("oculto");
  sistema.classList.remove("oculto");
  saludo.textContent = `ACCESO A TERMINAL AUTORIZADO.`;

  mensajesDiv.innerHTML = "";
  opcionesDiv.innerHTML = "";
  mensajesDiv.innerHTML = "";
  opcionesDiv.innerHTML = "";

  const historial = localStorage.getItem("chatHistorial");
  const capIndex = localStorage.getItem("capituloActual");
  const pasoIndex = localStorage.getItem("pasoActual");

  lanzarIntro(() => {
    if (historial) {
      mensajesDiv.innerHTML = historial;
    }

    if (capIndex !== null && pasoIndex !== null) {
      lanzarCapitulo(parseInt(capIndex), parseInt(pasoIndex));
    } else {
      comprobarNuevosCapitulos();
    }
  });
}


// ===============================
// INTRO
// ===============================

function lanzarIntro(callback) {

  mensajesDiv.innerHTML = "";

  const intro = [
    "INICIANDO PROTOCOLO DE CONEXIÓN...",
    "SERVIDOR: SECURE_HOST_1984",
    "ESTADO: ENCRIPTACIÓN ACTIVA",
    "> Conexión entrante detectada."
  ];

  let i = 0;

  function siguiente() {
    if (i < intro.length) {
      agregarMensajeSistema(intro[i], () => {
        i++;
        setTimeout(siguiente, 500);
      });
    } else {
      // una vez el intro se ha completado, borramos el texto de carga
      mensajesDiv.innerHTML = "";

      if (nombreJugador) {
        if (callback) {
          callback();
        } else {
          comprobarNuevosCapitulos();
        }
      } else {
        pedirNombre();
      }
    }
  }

  siguiente();
}

// ===============================
// CONTROL CAPÍTULOS
// ===============================

function comprobarNuevosCapitulos() {

  const hoy = new Date();

  for (let i = 0; i < capitulos.length; i++) {

    const cap = capitulos[i];
    const anterior = capitulos[i - 1];

    const decision = localStorage.getItem("decision_" + cap.id);

    if (hoy >= new Date(cap.fecha)) {

      // 🔥 SI NO HA RESPONDIDO ESTE CAPÍTULO → LO REPRODUCIMOS DESDE 0
      if (!decision) {

        // SOLO si el anterior está completado
        if (i === 0 || localStorage.getItem("decision_" + anterior.id)) {
          lanzarCapitulo(i);
        }

        break;
      }

      // SI YA ESTÁ COMPLETADO → PASA AL SIGUIENTE
    }
  }
}


// ===============================
// LANZAR CAPÍTULO
// ===============================

function lanzarCapitulo(index, pasoInicial = 0){

  const cap = capitulos[index];
  let pasoActual = pasoInicial;

  // Guardar estado
  localStorage.setItem("capituloActual", index);
  localStorage.setItem("pasoActual", pasoActual);

  function ejecutarPaso(){

    // Insertar marcador de fecha al inicio del capítulo (estilo WhatsApp)
    if (pasoActual === 0 && !localStorage.getItem("cap_fecha_" + cap.id)) {
      localStorage.setItem("cap_fecha_" + cap.id, "guardada");
      const [y, m, d] = cap.fecha.split("-");
      const fechaFormateada = `${d}/${m}/${y}`;
      const div = document.createElement("div");
      div.className = "fechaCapitulo";
      div.textContent = `— ${fechaFormateada} —`;
      mensajesDiv.appendChild(div);
      guardarHistorial();
      ejecutarPaso();
      return;
    }

    const paso = cap.pasos[pasoActual];

      if(!paso){

        // 🔥 MARCAR CAPÍTULO COMO COMPLETADO
        localStorage.setItem("decision_" + cap.id, "completado");

        // Limpiar pasos del capítulo
        for(let p = 0; p < cap.pasos.length; p++){
          localStorage.removeItem("paso_" + cap.id + "_" + p);
          localStorage.removeItem("opcion_" + cap.id + "_" + p);
        }

        // Limpiar estado del capítulo
        localStorage.removeItem("capituloActual");
        localStorage.removeItem("pasoActual");
        localStorage.removeItem("enviado_" + cap.id);

        comprobarNuevosCapitulos();
        return;
      }


    // 🔥 MENSAJES (VARIOS)
    if(paso.mensajes){

      let i = 0;

      function escribirMensajes(){
        if(i < paso.mensajes.length){

          let texto = paso.mensajes[i];

          // 👇 soporta funciones como la del nombre
          if(typeof texto === "function"){
            texto = texto();
          }

          agregarMensajeSistema(texto, ()=>{
            i++;
            setTimeout(escribirMensajes, 400);
          });

        }else{
          pasoActual++;
          localStorage.setItem("pasoActual", pasoActual);
          guardarHistorial();
          setTimeout(ejecutarPaso, 400);
        }
      }

      escribirMensajes();
      return;
    }

    // 🔥 OPCIONES
    if(paso.opciones){
      // Verificar si ya se respondió este paso
      const opcionGuardada = localStorage.getItem("opcion_" + cap.id + "_" + pasoActual);
      if(opcionGuardada){
        // Simular la selección
        const op = paso.opciones.find(o => o.texto === opcionGuardada);
        if(op){
          opcionesDiv.innerHTML = "";

          // � RESPUESTA (usa la del paso si no hay propia)
          let respuestaFinal = op.respuesta || paso.respuesta;

          let j = 0;

          function escribirRespuesta(){
            if(j < respuestaFinal.length){
              agregarMensajeSistema(respuestaFinal[j], ()=>{
                j++;
                setTimeout(escribirRespuesta, 400);
              });
            }else{
              pasoActual++;
              localStorage.setItem("pasoActual", pasoActual);
              guardarHistorial();
              setTimeout(ejecutarPaso, 400);
            }
          }

          escribirRespuesta();
        } else {
          mostrarOpcionesPaso(paso);
        }
      } else {
        mostrarOpcionesPaso(paso);
      }
    }
  }

  function mostrarOpcionesPaso(paso){

    opcionesDiv.innerHTML = "";

    paso.opciones.forEach(op => {

      const btn = document.createElement("button");
      btn.textContent = op.texto;

      btn.onclick = ()=>{
        // Marcar paso como respondido y guardar opción
        localStorage.setItem("paso_" + cap.id + "_" + pasoActual, "respondido");
        localStorage.setItem("opcion_" + cap.id + "_" + pasoActual, op.texto);

        // 🚀 ENVIAR CUANDO YA HAY 2 RESPUESTAS
        const r1 = localStorage.getItem("opcion_" + cap.id + "_1");
        const r2 = localStorage.getItem("opcion_" + cap.id + "_2");

        const yaEnviado = localStorage.getItem("enviado_" + cap.id);

        if(r1 && r2 && !yaEnviado){
          enviarAGoogleForms(cap.id);
          localStorage.setItem("enviado_" + cap.id, "true");
        }

        opcionesDiv.innerHTML = "";

        // 🟢 MENSAJES DEL JUGADOR
        let i = 0;

        function escribirJugador(){
          if(i < op.mensajes.length){
            agregarMensajeJugador(op.mensajes[i], ()=>{
              i++;
              setTimeout(escribirJugador, 300);
            });
          }else{
            guardarHistorial();
            setTimeout(escribirRespuesta, 400);
          }
        }

        // 🔴 RESPUESTA (usa la del paso si no hay propia)
        let respuestaFinal = op.respuesta || paso.respuesta;

        let j = 0;

        function escribirRespuesta(){
          if(j < respuestaFinal.length){
            agregarMensajeSistema(respuestaFinal[j], ()=>{
              j++;
              setTimeout(escribirRespuesta, 400);
            });
          }else{
            pasoActual++;
            localStorage.setItem("pasoActual", pasoActual);
            guardarHistorial();
            setTimeout(ejecutarPaso, 400);
          }
        }

        escribirJugador();
      };

      opcionesDiv.appendChild(btn);
    });
  }

  ejecutarPaso();
}

// ===============================
// EFECTO ESCRITURA PRO
// ===============================

function escribirTexto(div, texto, callback) {

  let i = 0;
  let timeoutId = null;

  escrituraEnCurso = {
    div,
    texto,
    callback,
    timeoutId
  };

  function escribir() {

    if (i < texto.length) {

      div.textContent = texto.substring(0, i) + "█";

      if (texto[i] !== " " && audioHabilitado && sonidoTecla && !document.hidden) {
        const clip = sonidoTecla.cloneNode(true);
        clip.volume = 0.15;
        clip.currentTime = 0;

        audiosActivos.add(clip);

        const limpiarClip = () => {
          audiosActivos.delete(clip);
        };

        clip.addEventListener("ended", limpiarClip, { once: true });
        clip.addEventListener("error", limpiarClip, { once: true });

        clip.play().catch(() => {});
      }

      let velocidad = 20 + Math.random() * 40;

      if (texto[i] === "." || texto[i] === ",") {
        velocidad = 300;
      }

      i++;
      mensajesDiv.scrollTop = mensajesDiv.scrollHeight;

      timeoutId = setTimeout(escribir, velocidad);
      if (escrituraEnCurso) {
        escrituraEnCurso.timeoutId = timeoutId;
      }

    } else {

      div.textContent = texto;
      escrituraEnCurso = null;

      // No guardar aquí

      if (callback) callback();
    }
  }

  escribir();
}

// ===============================
// MENSAJES
// ===============================

function agregarMensajeSistema(texto, callback) {
  const div = document.createElement("div");
  div.className = "mensajeSistema";
  mensajesDiv.appendChild(div);

  escribirTexto(div, texto, callback);
}

function agregarMensajeJugador(texto, callback) {
  const div = document.createElement("div");
  div.className = "mensajeJugador";
  mensajesDiv.appendChild(div);

  escribirTexto(div, texto, callback);
}

// ===============================
// OPCIONES
// ===============================

function mostrarOpciones(index) {
  const cap = capitulos[index];
  opcionesDiv.innerHTML = "";

  cap.opciones.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op.texto;

    btn.onclick = () => {
      opcionesDiv.innerHTML = "";

      mostrarJugadorMultiple(op.mensajes || op.texto, () => {

        setTimeout(() => {

          mostrarRespuestaMultiple(op.respuesta, () => {

            localStorage.setItem("decision_" + cap.id, op.texto);

            setTimeout(() => comprobarNuevosCapitulos(), 800);

          });

        }, 500);

      });

    };


    opcionesDiv.appendChild(btn);
  });
}

// ===============================
// RESPUESTA
// ===============================

function responder(opcion, cap) {

  localStorage.setItem("decision_" + cap.id, opcion.texto);
  opcionesDiv.innerHTML = "";

  agregarMensajeJugador(opcion.texto, () => {

    setTimeout(() => {

      agregarMensajeSistema(opcion.respuesta, () => {
        setTimeout(() => comprobarNuevosCapitulos(), 800);
      });

    }, 500);

  });
}

function mostrarRespuestaMultiple(respuestas, callback){

  // Si es solo texto normal → lo convertimos en array
  if(!Array.isArray(respuestas)){
    respuestas = [respuestas];
  }

  let i = 0;

  function siguiente(){

    if(i < respuestas.length){

      agregarMensajeSistema(respuestas[i], () => {
        i++;
        setTimeout(siguiente, 600);
      });

    } else {
      if(callback) callback();
    }

  }

  siguiente();
}

function mostrarJugadorMultiple(respuestas, callback){

  if(!Array.isArray(respuestas)){
    respuestas = [respuestas];
  }

  let i = 0;

  function siguiente(){

    if(i < respuestas.length){

      agregarMensajeJugador(respuestas[i], () => {
        i++;
        setTimeout(siguiente, 500);
      });

    } else {
      if(callback) callback();
    }

  }

  siguiente();
}

let guardandoChat = false;

// ===============================
// GUARDAR HISTORIAL
// ===============================

function guardarHistorial() {
  localStorage.setItem("chatHistorial", mensajesDiv.innerHTML);
}

// CAMBIAR EL EL EXCEL EL TIPO DE OPCIONES PARA DIFERENCIAR BUENA DE MALA
// CAMBIAR INTRO Y FINAL
// CONFIRMACION DE OPCIONES (¿ESTÁS SEGURO? SÍ/NO)