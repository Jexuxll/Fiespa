let activo = true;
let infeccion = 0;
const virusList = [];

document.getElementById("toggleGame").onclick = () => {
  activo = !activo;
  document.querySelectorAll(".virus").forEach(v => v.remove());
  virusList.length = 0;
};

function crearVirus() {
  if (!activo) return;

  const v = document.createElement("div");

const tipos = [/*"tipo1",*/ "tipo2", "tipo3", /*"tipo4",*/ "tipo5"];
const tipo = tipos[Math.floor(Math.random() * tipos.length)];

v.className = "virus " + tipo;


  let x = Math.random() * (innerWidth - 40);
  let y = Math.random() * (innerHeight - 40);
  let dx = (Math.random() - 0.5) * 2;
  let dy = (Math.random() - 0.5) * 2;

  v.style.left = x + "px";
  v.style.top = y + "px";

 v.onclick = () => {
  infeccion++;
  actualizar();

  const x = parseFloat(v.style.left);
  const y = parseFloat(v.style.top);

  /* SPLASH GRANDE */
  const splat = document.createElement("div");
  splat.className = "splat";
  splat.style.left = x - 20 + "px";
  splat.style.top = y - 10 + "px";
  document.body.appendChild(splat);
  setTimeout(() => splat.remove(), 400);

  /* MANCHA */
  const mancha = document.createElement("div");
  mancha.className = "mancha";
  mancha.style.left = x - 25 + "px";
  mancha.style.top = y - 15 + "px";
  document.body.appendChild(mancha);
  setTimeout(() => mancha.remove(), 8000);

  /* PARTÍCULAS (AHORA VISIBLES) */
  for (let i = 0; i < 10; i++) {
    const p = document.createElement("div");
    p.className = "particula";
    p.style.left = x + 10 + "px";
    p.style.top = y + 10 + "px";

    const dx = (Math.random() - 0.5) * 120 + "px";
    const dy = (Math.random() - 0.5) * 120 + "px";
    p.style.setProperty("--dx", dx);
    p.style.setProperty("--dy", dy);

    document.body.appendChild(p);
    setTimeout(() => p.remove(), 600);
  }

  v.remove();
};



  document.body.appendChild(v);
  virusList.push({ el: v, x, y, dx, dy });
}


function moverVirus() {
  virusList.forEach((v) => {
    const rect = v.el.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    v.x += v.dx;
    v.y += v.dy;

    if (v.x < 0 || v.x > innerWidth - w) v.dx *= -1;
    if (v.y < 0 || v.y > innerHeight - h) v.dy *= -1;

    v.el.style.left = v.x + "px";
    v.el.style.top = v.y + "px";
  });

  requestAnimationFrame(moverVirus);
}


function actualizar() {
  document.getElementById("estado").textContent =
    `Infección global: ${infeccion}%`;
}

setInterval(crearVirus, 1500);
moverVirus();

if (document.querySelectorAll(".mancha").length > 20) {
  document.querySelector(".mancha")?.remove();
}
