const grimorio = [
    { nombre: "angel de la muerte", img: "assets/cards/angel_de_la_muerte.webp" },
    { nombre: "Compsognathus", img: "assets/cards/compsognathus.webp" },
    { nombre: "Dilophosaurus", img: "assets/cards/dilophosaurus.webp" },
    { nombre: "dimorphodon", img: "assets/cards/dimorphodon.webp" },
    { nombre: "Espina blanca", img: "assets/cards/espina_blanca.webp" },
    { nombre: "facehugger", img: "assets/cards/facehugger.webp" },
    { nombre: "Giganotosaurus", img: "assets/cards/giganotosaurus.webp" },
    { nombre: "metricantosaurus", img: "assets/cards/metricantosaurus.webp" },
    { nombre: "Spinosaurio", img: "assets/cards/spinosaurio.webp" },
    { nombre: "Styracosaurus", img: "assets/cards/styracosaurus.webp" },
    { nombre: "Tiranosaurus-rex", img: "assets/cards/tiranosaurus_rex.webp" },
    { nombre: "utaraptor", img: "assets/cards/utaraptor.webp" },
    { nombre: "Velociraptor", img: "assets/cards/velociraptor.webp" },
    { nombre: "xenomorfo", img: "assets/cards/xenomorfo.webp" },
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
  const {
    contenedorSelector, // ej. '.mano-jugador' o '.mano-enemigo'
    prefijoPos           // ej. 'mj' o 'me'
  } = opciones;

  const contenedor = document.querySelector(contenedorSelector);
  if (!contenedor) {
    console.warn(`❌ Contenedor no encontrado: ${contenedorSelector}`);
    return;
  }

  contenedor.innerHTML = ''; // Limpia el contenedor

  cartas.forEach((carta, index) => {
    const casilla = document.createElement('div');
    casilla.classList.add('casilla-mano');
    casilla.dataset.pos = `${prefijoPos}${index + 1}`;

    const img = document.createElement('img');
    img.src = carta.img;
    img.alt = carta.nombre;
    img.classList.add('carta-mano-img');
    img.dataset.nombre = carta.nombre;

    img.onerror = () => {
      console.error("❌ No se pudo cargar:", img.src);
      casilla.textContent = "⚠️ Imagen no encontrada";
    };

    casilla.appendChild(img);
    contenedor.appendChild(casilla);
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
}

window.addEventListener('DOMContentLoaded', iniciarJuego);