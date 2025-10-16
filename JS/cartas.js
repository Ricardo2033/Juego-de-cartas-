const grimorio = [
    { nombre: "angel de la muerte", ataque: 1800, defensa: 2000, img: "assets/cards/angel_de_la_muerte.webp" },
    { nombre: "Compsognathus", ataque: 300, defensa: 0, img: "assets/cards/compsognathus.webp" },
    { nombre: "Dilophosaurus", ataque: 1400, defensa: 1000, img: "assets/cards/dilophosaurus.webp" },
    { nombre: "dimorphodon", ataque: 600, defensa: 200, img: "assets/cards/dimorphodon.webp" },
    { nombre: "Espina blanca", ataque: 2400, defensa: 2500, img: "assets/cards/espina_blanca.webp" },
    { nombre: "facehugger", ataque: 200, defensa: 0, img: "assets/cards/facehugger.webp" },
    { nombre: "Giganotosaurus", ataque: 2290, defensa: 1700, img: "assets/cards/giganotosaurus.webp" },
    { nombre: "metricantosaurus", ataque: 1120, defensa: 900, img: "assets/cards/metricantosaurus.webp" },
    { nombre: "Spinosaurio", ataque: 3500, defensa: 2400, img: "assets/cards/spinosaurio.webp" },
    { nombre: "Styracosaurus", ataque: 1500, defensa: 2500, img: "assets/cards/styracosaurus.webp" },
    { nombre: "Tiranosaurus-rex", ataque: 3460, defensa: 2400, img: "assets/cards/tiranosaurus_rex.webp" },
    { nombre: "utaraptor", ataque: 2000, defensa: 1700, img: "assets/cards/utaraptor.webp" },
    { nombre: "Velociraptor", ataque: 700, defensa: 500, img: "assets/cards/velociraptor.webp" },
    { nombre: "xenomorfo", ataque: 2000, defensa: 2300, img: "assets/cards/xenomorfo.webp" },
    { nombre: "birkin", ataque: 2700, defensa: 3000, img: "assets/cards/birkin.webp" },
    { nombre: "doom", ataque: 4500, defensa: 4500, img: "assets/cards/Doom.webp" },
    { nombre: "dragon", ataque: 3690, defensa: 4500, img: "assets/cards/dragon.webp" },
    { nombre: "goku", ataque: 3900, defensa: 4000, img: "assets/cards/Goku.webp" },
    { nombre: "kratos", ataque: 4000, defensa: 4000, img: "assets/cards/Kratos.webp" },
    { nombre: "marine", ataque: 2080, defensa: 1000, img: "assets/cards/Marine_colonial.webp" },
    { nombre: "nemesis", ataque: 3500, defensa: 2000, img: "assets/cards/Nemesis.webp" },
    { nombre: "peacemaker", ataque: 2500, defensa: 1500, img: "assets/cards/peacemaker.webp" },
    { nombre: "piramihead", ataque: 3950, defensa: 5000, img: "assets/cards/piramihead.webp" },
    { nombre: "ultron", ataque: 3500, defensa: 4500, img: "assets/cards/Ultron.webp" },
    { nombre: "xeno", ataque: 4300, defensa: 3000, img: "assets/cards/xeno.webp" },
    { nombre: "zeus", ataque: 3960, defensa: 4000, img: "assets/cards/zeus.webp" },
];

function repartirCartasAleatorias(grimorioOriginal, cantidad) {
  const copia = [...grimorioOriginal];
  const mano = [];

  for (let i = 0; i < cantidad && copia.length > 0; i++) {
    const index = Math.floor(Math.random() * copia.length);
    mano.push(copia.splice(index, 1)[0]);
  }

  return mano;
}


function generarMano(cartas, opciones) {
  const { contenedorSelector, prefijoPos } = opciones;
  const contenedor = document.querySelector(contenedorSelector);
  if (!contenedor) {
    console.warn(`❌ Contenedor no encontrado: ${contenedorSelector}`);
    return;
  }

  contenedor.innerHTML = '';

  // Paso 1: crear casillas vacías
  cartas.forEach((_, index) => {
    const casilla = document.createElement('div');
    casilla.classList.add('casilla-mano');
    casilla.dataset.pos = `${prefijoPos}${index + 1}`;
    contenedor.appendChild(casilla);
  });

  // Paso 2: insertar cartas con animación
  cartas.forEach((carta, i) => {
    const index = cartas.length - 1 - i; // derecha a izquierda
    const casilla = contenedor.querySelector(`[data-pos="${prefijoPos}${index + 1}"]`);

const img = crearCarta(carta);


    img.onerror = () => {
      console.error("❌ No se pudo cargar:", img.src);
      casilla.textContent = "⚠️ Imagen no encontrada";
    };

    setTimeout(() => {
      img.classList.add('repartida');
      casilla.appendChild(img);
    }, i * 110); // retraso progresivo
  });
}



function iniciarJuego() {
  const manoJugador = repartirCartasAleatorias(grimorio, 5);
  const manoEnemigo = repartirCartasAleatorias(grimorio, 5);

  generarMano(manoJugador, {
    contenedorSelector: '.mano-jugador',
    prefijoPos: 'mj'
  });

  generarMano(manoEnemigo, {
    contenedorSelector: '.mano-enemigo',
    prefijoPos: 'me'
  });
  iniciarTimer()

}

window.addEventListener('DOMContentLoaded', iniciarJuego);


function crearCarta(grimorioItem) {
  const carta = document.createElement('img');
  carta.src = grimorioItem.img;
  carta.alt = grimorioItem.nombre;
  carta.classList.add('carta-mano-img');
  carta.dataset.ataque = grimorioItem.ataque;
  carta.dataset.defensa = grimorioItem.defensa;
  carta.dataset.nombre = grimorioItem.nombre;
  return carta;
}

window.addEventListener('DOMContentLoaded', () => {
  mostrarTransicionInicio(iniciarJuego);
});

function reponerCartaEnMano(jugador) {
  const cartaNueva = crearCarta(grimorio[Math.floor(Math.random() * grimorio.length)]);
  const contenedor = jugador === 'jugador'
    ? document.querySelector('.mano-jugador')
    : document.querySelector('.mano-enemigo');

  const casillaLibre = Array.from(contenedor.children).find(c => c.children.length === 0);
  if (!casillaLibre) return;

  cartaNueva.classList.add('carta-mano-img', 'repartida'); // ✅ ambas clases
  casillaLibre.appendChild(cartaNueva);
}



