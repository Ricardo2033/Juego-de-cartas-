const coordenadasCartasDeMano = {
    enemigo: ["me1","me2","me3","me4","me5"],
    jugador: ["mj1","mj2","mj3","mj4","mj5"]
};

const coordenadasDeTablero = {
    enemigo: ["e1","e2","e3","e4","e5","e6","e7","e8","e9","e10"],
    jugador: ["a1","a2","a3","a4","a5","a6","a7","a8","a9","a10"]
};

function estaLibre(pos) {
    return estadoCasillas[pos] === null;
}

function invocarCarta(pos, carta) {
  if (estaLibre(pos)) {
    estadoCasillas[pos] = carta;
    const casilla = document.querySelector(`[data-pos="${pos}"]`);
    casilla.textContent = carta.nombre; // o casilla.appendChild(imagen)
  } else {
    console.log("Casilla ocupada");
  }
}
