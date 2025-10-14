let turnoActual = 'jugador';
let animacionEnCurso = false;

function cambiarTurno() {
  turnoActual = turnoActual === 'jugador' ? 'enemigo' : 'jugador';
  console.log(`🔁 Turno actual: ${turnoActual}`);

  if (turnoActual === 'enemigo') {
    setTimeout(turnoEnemigo, 1000);
  }
}

function turnoEnemigo() {
  if (animacionEnCurso) {
    console.log("⏳ La IA espera a que termine la animación.");
    cambiarTurno(); // ✅ pasa el turno sin actuar
    return;
  }

  const cartasEnMano = document.querySelectorAll('.mano-enemigo .carta-mano-img');
  const casillasTablero = Array.from(document.querySelectorAll('.fila-enemigo .casilla'));
  const cartasJugador = document.querySelectorAll('.fila-jugador .casilla img');
  const cartasIA = document.querySelectorAll('.fila-enemigo .casilla img');

  const casillaLibre = casillasTablero.find(c => c.children.length === 0);
  const puedeInvocar = cartasEnMano.length > 0 && casillaLibre;
  const puedeAtacar = cartasIA.length > 0 && cartasJugador.length > 0;

  if (!puedeInvocar && !puedeAtacar) {
    console.log("🤖 La IA no puede actuar.");
    cambiarTurno();
    return;
  }

  console.log(`🤖 La IA está evaluando su turno...`);

  if (puedeInvocar) {
    invocarCartaInteligenteIA(() => {
      const cartasIAActualizadas = document.querySelectorAll('.fila-enemigo .casilla img');
      const cartasJugadorActualizadas = document.querySelectorAll('.fila-jugador .casilla img');

      if (cartasIAActualizadas.length > 0 && cartasJugadorActualizadas.length > 0) {
        atacarJugadorIA(); // ✅ ataca directamente sin setTimeout
      } else {
        cambiarTurno();
      }
    });
  } else if (puedeAtacar) {
    atacarJugadorIA();
  }
}







