document.getElementById('musicaCombate').play();

function reproducirSonidoSeleccionCarta() {
  const sonido = document.getElementById('sonidoSeleccionCarta');
  if (sonido) {
    sonido.currentTime = 0;
    sonido.play(); // ✅ no afecta a musicaFondo
  }
}

document.getElementById('sonidoGolpe').play();
