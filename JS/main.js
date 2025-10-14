// Estado inicial de las casillas del tablero
let puntosJugador = 0;
let puntosIA = 0;

const coordenadasCartasDeMano = {
    enemigo: ["me1","me2","me3","me4","me5"],
    jugador: ["mj1","mj2","mj3","mj4","mj5"]
};

const coordenadasDeTablero = {
    enemigo: ["e1","e2","e3","e4","e5"],
    jugador: ["a1","a2","a3","a4","a5"]
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

// Evento para ampliar la carta al hacer clic derecho

document.addEventListener('contextmenu', function (event) {
  const carta = event.target.closest('.carta-mano-img');
  const casilla = event.target.closest('.casilla-mano');

  if (carta && casilla && casilla.closest('.mano-jugador')) {
    event.preventDefault(); // Evita el menú contextual

    const vista = document.getElementById('vista-ampliada');
    const imagen = document.getElementById('imagen-ampliada');

    imagen.src = carta.src;
    imagen.alt = carta.alt;
    vista.classList.remove('oculto');
  }
});


// Cerrar la vista ampliada al hacer clic en cualquier parte
document.getElementById('vista-ampliada').addEventListener('click', () => {
  document.getElementById('vista-ampliada').classList.add('oculto');
});

/*selección de y colocación de cartas al tablero*/
let cartaSeleccionada = null;

document.querySelector('.mano-jugador').addEventListener('click', function (event) {
  if (turnoActual !== 'jugador') return; // ⛔ Bloquea si no es turno del jugador

  const carta = event.target.closest('.carta-mano-img');
  const casillaMano = event.target.closest('.casilla-mano');

  if (!carta || !casillaMano) return;

  cartaSeleccionada = { carta, casillaMano };
  carta.classList.add('seleccionada');
  reproducirSonidoSeleccionCarta();
});



document.querySelector('.fila-jugador').addEventListener('click', function (event) {
  if (turnoActual !== 'jugador') return; // ⛔ Bloquea si no es turno del jugador

  const casilla = event.target.closest('.casilla');
  if (!casilla || casilla.children.length > 0 || !cartaSeleccionada) return;

  const { carta, casillaMano } = cartaSeleccionada;
  casilla.appendChild(carta);
  carta.classList.remove('seleccionada');
  carta.classList.add('invocada');
  casillaMano.innerHTML = '';
  reponerCartaEnMano('jugador');            
  cartaSeleccionada = null;

  habilitarSeleccionDeAtaque();


  cambiarTurno(); // ✅ Solo se llama si el jugador jugó en su turno
});






function verificarCombate(casillaJugador, casillaEnemigo) {
  const cartaJugador = casillaJugador.querySelector('img');
  const cartaEnemigo = casillaEnemigo.querySelector('img');
  if (!cartaJugador || !cartaEnemigo) return;

  const ataqueJugador = parseInt(cartaJugador.dataset.ataque);
  const ataqueEnemigo = parseInt(cartaEnemigo.dataset.ataque);

  let resultado = '';
  if (ataqueJugador > ataqueEnemigo) {
    resultado = 'jugador';
    casillaEnemigo.innerHTML = '';
  } else if (ataqueJugador < ataqueEnemigo) {
    resultado = 'enemigo';
    casillaJugador.innerHTML = '';
  } else {
    resultado = 'empate';
    casillaJugador.innerHTML = '';
    casillaEnemigo.innerHTML = '';
  }

  mostrarCombateVisual(cartaJugador, cartaEnemigo, resultado);
}




function ejecutarCombate() {
  const casillasJugador = document.querySelectorAll('.fila-jugador .casilla');
  const casillasEnemigo = document.querySelectorAll('.fila-enemigo .casilla');

  casillasJugador.forEach((casilla, index) => {
    verificarCombate(casilla, casillasEnemigo[index]);
  });
}

function habilitarSeleccionDeObjetivo() {
  const cartasEnemigas = document.querySelectorAll('.fila-enemigo .casilla img');

  cartasEnemigas.forEach(cartaEnemiga => {
    cartaEnemiga.addEventListener('click', () => {
      const cartaJugador = document.querySelector('.activa-jugador');
      if (!cartaJugador) return;

      const ataqueJugador = parseInt(cartaJugador.dataset.ataque);
      const ataqueEnemigo = parseInt(cartaEnemiga.dataset.ataque);

      console.log(`🧮 Ataque: ${cartaJugador.dataset.nombre} (${ataqueJugador}) vs ${cartaEnemiga.dataset.nombre} (${ataqueEnemigo})`);

      if (ataqueJugador > ataqueEnemigo) {
        cartaEnemiga.parentElement.innerHTML = '';
        console.log(`💥 ${cartaJugador.dataset.nombre} destruyó a ${cartaEnemiga.dataset.nombre}`);
      } else if (ataqueJugador < ataqueEnemigo) {
        cartaJugador.parentElement.innerHTML = '';
        console.log(`💀 ${cartaJugador.dataset.nombre} fue destruido por ${cartaEnemiga.dataset.nombre}`);
      } else {
        cartaJugador.parentElement.innerHTML = '';
        cartaEnemiga.parentElement.innerHTML = '';
        console.log(`⚔️ ¡Empate entre ${cartaJugador.dataset.nombre} y ${cartaEnemiga.dataset.nombre}!`);
      }

      cartaJugador.classList.remove('activa-jugador'); // desactiva la carta
      setTimeout(cambiarTurno, 1000); // cambia turno después del ataque
    });
  });
}

function mostrarCombateVisual(cartaJugador, cartaEnemigo, resultado) {
  const pantalla = document.getElementById('pantalla-combate');
  const cartaJ = pantalla.querySelector('.carta-combate.jugador');
  const cartaE = pantalla.querySelector('.carta-combate.enemigo');

  cartaJ.style.backgroundImage = `url(${cartaJugador.src})`;
  cartaE.style.backgroundImage = `url(${cartaEnemigo.src})`;

  pantalla.classList.remove('combate-oculto');

  // Animación de derrota
  setTimeout(() => {
    if (resultado === 'jugador') {
      cartaE.classList.add('carta-derrotada');
    } else if (resultado === 'enemigo') {
      cartaJ.classList.add('carta-derrotada');
    } else {
      cartaJ.classList.add('carta-derrotada');
      cartaE.classList.add('carta-derrotada');
    }
  }, 2000);

  // Ocultar después de animación
  setTimeout(() => {
    pantalla.classList.add('combate-oculto');
    cartaJ.style.backgroundImage = '';
    cartaE.style.backgroundImage = '';
    cartaJ.classList.remove('carta-derrotada');
    cartaE.classList.remove('carta-derrotada');
  }, 4000);
}


function habilitarSeleccionDeAtaque() {
  const tableroJugador = document.querySelector('.fila-jugador');
  const tableroEnemigo = document.querySelector('.fila-enemigo');

  // Paso 1: seleccionar carta atacante del jugador
tableroJugador.addEventListener('click', function (event) {
  const carta = event.target.closest('img');
  if (!carta || !carta.classList.contains('invocada')) return;

  // Limpiar selecciones anteriores
  document.querySelectorAll('.activa-jugador').forEach(c => c.classList.remove('activa-jugador'));
  document.querySelectorAll('.casilla-jugador-activa').forEach(c => c.classList.remove('casilla-jugador-activa'));

  // Marcar carta y su casilla
  carta.classList.add('activa-jugador');
  carta.parentElement.classList.add('casilla-jugador-activa');

  console.log(`🟢 Carta atacante seleccionada: ${carta.dataset.nombre}`);
});


  // Paso 2: seleccionar carta enemiga como objetivo
tableroEnemigo.addEventListener('click', function (event) {
  const cartaEnemiga = event.target.closest('img');
  const cartaJugador = document.querySelector('.activa-jugador');

  if (!cartaEnemiga || !cartaJugador) return;

  const ataqueJugador = parseInt(cartaJugador.dataset.ataque);
  const ataqueEnemigo = parseInt(cartaEnemiga.dataset.ataque);

  const casillaObjetivo = cartaEnemiga.parentElement;
  casillaObjetivo.classList.add('casilla-objetivo-jugador');

  let resultado = '';
  if (ataqueJugador > ataqueEnemigo) {
  resultado = 'jugador';
  cartaEnemiga.parentElement.innerHTML = '';
  puntosJugador += 50;
} else if (ataqueJugador < ataqueEnemigo) {
  resultado = 'enemigo';
  cartaJugador.parentElement.innerHTML = '';
  puntosIA += 50;
} else {
  resultado = 'empate';
  cartaJugador.parentElement.innerHTML = '';
  cartaEnemiga.parentElement.innerHTML = '';
}

// 🧮 Actualizar marcador en pantalla
document.getElementById('puntos-jugador').textContent = puntosJugador;
document.getElementById('puntos-ia').textContent = puntosIA;

  mostrarCombateVisual(cartaJugador, cartaEnemiga, resultado);

  setTimeout(() => {
    cartaJugador.classList.remove('activa-jugador');
    casillaObjetivo.classList.remove('casilla-objetivo-jugador');
    cambiarTurno();
  }, 2000);
});

}


function invocarCartaIA(carta, casillasTablero, callback) {
  const casillaTablero = Array.from(casillasTablero).find(c => c.children.length === 0);
  if (!carta || !casillaTablero) {
    callback();
    return;
  }

  const casillaMano = carta.parentElement;

  casillaTablero.classList.add('casilla-ia-activa');
  carta.classList.remove('repartida', 'seleccionada');
  carta.classList.add('invocada');

  // ✅ Ocultar visualmente la carta (boca abajo)
  carta.classList.add('boca-abajo'); // clase que puedes definir en CSS
  casillaTablero.classList.add('carta-boca-abajo'); // si usas fondo en la casilla

  casillaTablero.appendChild(carta);
  casillaMano.innerHTML = '';
  reponerCartaEnMano('ia');

  setTimeout(() => {
    casillaTablero.classList.remove('casilla-ia-activa');
    console.log(`🤖 La IA invocó a ${carta.dataset.nombre}`);
    callback();
  }, 1000);
}




function atacarJugadorIA() {
  const cartasIA = document.querySelectorAll('.fila-enemigo .casilla img');
  const cartasJugador = document.querySelectorAll('.fila-jugador .casilla img');

  if (cartasIA.length === 0 || cartasJugador.length === 0) {
    console.log("⚠️ No hay cartas disponibles para combatir.");
    setTimeout(cambiarTurno, 1000);
    return;
  }

  const cartaIA = cartasIA[0];
  const ataqueIA = parseInt(cartaIA.dataset.ataque);

  let cartaObjetivo = null;
  let mejorDiferencia = -Infinity;

  cartasJugador.forEach(carta => {
    const ataqueJugador = parseInt(carta.dataset.ataque);
    const diferencia = ataqueIA - ataqueJugador;

    if (diferencia > 0 && diferencia > mejorDiferencia) {
      mejorDiferencia = diferencia;
      cartaObjetivo = carta;
    }
  });

  if (!cartaObjetivo) {
    console.log("🤖 La IA no encontró un objetivo que pueda vencer. Pasa el turno.");
    setTimeout(cambiarTurno, 1000);
    return;
  }

  const casillaObjetivo = cartaObjetivo.parentElement;
  const casillaIA = cartaIA.parentElement;

// Marcar carta atacante y su casilla
cartaIA.classList.add('carta-ia-activa');
cartaIA.parentElement.classList.add('casilla-ia-activa');
casillaObjetivo.classList.add('casilla-objetivo-ia');


  console.log(`🤖 La IA seleccionó ${cartaIA.dataset.nombre} para atacar a ${cartaObjetivo.dataset.nombre}`);
  animacionEnCurso = true;

setTimeout(() => {
  const ataqueJugador = parseInt(cartaObjetivo.dataset.ataque);
  let resultado = '';

  if (ataqueIA > ataqueJugador) {
    resultado = 'enemigo';
    if (resultado === 'enemigo' || resultado === 'jugador' || resultado === 'empate') {
  document.getElementById('sonidoGolpe').play();
}
    cartaObjetivo.parentElement.innerHTML = '';
    puntosIA += 50;
  } else if (ataqueIA < ataqueJugador) {
    resultado = 'jugador';
    if (resultado === 'enemigo' || resultado === 'jugador' || resultado === 'empate') {
  document.getElementById('sonidoGolpe').play();
}
    cartaIA.parentElement.innerHTML = '';
    puntosJugador += 50;
  } else {
    resultado = 'empate';
    cartaIA.parentElement.innerHTML = '';
    cartaObjetivo.parentElement.innerHTML = '';
  }

  // Actualizar marcador en pantalla
  document.getElementById('puntos-jugador').textContent = puntosJugador;
  document.getElementById('puntos-ia').textContent = puntosIA;

  mostrarCombateVisual(cartaObjetivo, cartaIA, resultado);

  setTimeout(() => {
    cartaIA.classList.remove('carta-ia-activa');
    cartaIA.parentElement.classList.remove('casilla-ia-activa');
    casillaObjetivo.classList.remove('casilla-objetivo-ia');
    animacionEnCurso = false;
    cambiarTurno();
  }, 2000);
}, 1000);
}


function invocarCartaInteligenteIA(callback) {
  const cartasEnMano = Array.from(document.querySelectorAll('.mano-enemigo .carta-mano-img'));
  const casillas = Array.from(document.querySelectorAll('.fila-enemigo .casilla'));

  if (cartasEnMano.length === 0) {
    callback();
    return;
  }

  const casillaLibre = casillas.find(c => c.children.length === 0);
  if (!casillaLibre) {
    callback();
    return;
  }

  // Elegir la carta con mayor ataque
  let cartaSeleccionada = null;
  let mejorAtaque = -Infinity;

  cartasEnMano.forEach(carta => {
    const ataque = parseInt(carta.dataset.ataque);
    if (ataque > mejorAtaque) {
      mejorAtaque = ataque;
      cartaSeleccionada = carta;
    }
  });

  if (!cartaSeleccionada) {
    callback();
    return;
  }

  const casillaMano = cartaSeleccionada.parentElement;

  casillaLibre.classList.add('casilla-ia-activa');
  cartaSeleccionada.classList.remove('repartida', 'seleccionada');
  cartaSeleccionada.classList.add('invocada');
  casillaLibre.appendChild(cartaSeleccionada);

  casillaMano.innerHTML = '';           // ✅ vacía la casilla de la mano
  reponerCartaEnMano('ia');             // ✅ repone en la casilla vacía

  setTimeout(() => {
    casillaLibre.classList.remove('casilla-ia-activa');
    console.log(`🤖 La IA invocó a ${cartaSeleccionada.dataset.nombre} con ${mejorAtaque} de ataque`);
    callback();
  }, 1000);
}




function simularHoverIA(casillas, callbackFinal) {
  let index = 0;

  function marcarSiguiente() {
    if (index >= casillas.length) {
      callbackFinal(); // ✅ esto activa la siguiente fase
      return;
    }
    

    const casilla = casillas[index];
    if (casilla.children.length === 0) {
      casilla.classList.add('casilla-ia-hover');
      setTimeout(() => {
        casilla.classList.remove('casilla-ia-hover');
        index++;
        marcarSiguiente();
      }, 300);
    } else {
      index++;
      marcarSiguiente();
    }
  }

  marcarSiguiente();
}


let tiempoRestante = 5 * 60; // 5 minutos en segundos
const timerElemento = document.getElementById('timer');

function iniciarTimer() {
  const intervalo = setInterval(() => {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;

    timerElemento.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    if (tiempoRestante <= 0) {
      clearInterval(intervalo);
      finalizarDuelo();
    }

    tiempoRestante--;
  }, 1000);
}

function finalizarDuelo() {
  alert("⏰ ¡Se acabó el tiempo! El duelo ha terminado.");
  // Aquí puedes agregar lógica para decidir el ganador o reiniciar
}

function finalizarDuelo() {
  const pantalla = document.createElement('div');
  pantalla.id = 'pantalla-final';

  const mensaje = document.createElement('div');
  mensaje.id = 'mensaje-final';

  if (puntosJugador > puntosIA) {
    mensaje.textContent = '🏆 ¡Has ganado!';
    mensaje.style.color = '#00ff00';
  } else if (puntosJugador < puntosIA) {
    mensaje.textContent = '💀 Has perdido';
    mensaje.style.color = '#ff4444';
  } else {
    mensaje.textContent = '🤝 ¡Empate!';
    mensaje.style.color = '#ffaa00';
  }

  pantalla.appendChild(mensaje);
  document.body.appendChild(pantalla);

  // Activar transición
  setTimeout(() => {
    pantalla.style.opacity = '1';
    mensaje.style.fontSize = '64px';
    mensaje.style.opacity = '1';
  }, 100); // pequeño retardo para que el DOM lo registre
}

function mostrarTransicionInicio(callback) {
  const pantalla = document.getElementById('pantalla-inicio');
  const titulo = pantalla.querySelector('h1');

  // Activar animación de texto
  setTimeout(() => {
    titulo.style.fontSize = '64px';
    titulo.style.opacity = '1';
  }, 100);

  // Desvanecer pantalla negra
  setTimeout(() => {
    pantalla.style.opacity = '0';
  }, 2000);

  // Eliminar del DOM y continuar con el juego
  setTimeout(() => {
    pantalla.remove();
    if (typeof callback === 'function') callback(); // ⬅️ Aquí se inicia el juego
  }, 3000); // ⏱️ Ajustado a 3 segundos para evitar que se quede colgado
}



























