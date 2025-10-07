const botonManual = document.getElementById("vista__al__manual");
const audioManual = document.getElementById("audio__manual");
botonManual.addEventListener("click", () => {
  audioManual.currentTime = 0; // Reinicia el audio
  audioManual.play();
});

const botonIniciar = document.getElementById("boton__iniciar");
const audioJugar = document.getElementById("audio__jugar");
const pantallaNegra = document.getElementById("pantalla__negra");

botonIniciar.addEventListener("click", () => {
  audioJugar.currentTime = 0;
  audioJugar.play();

  pantallaNegra.style.opacity = "1";
  pantallaNegra.style.pointerEvents = "auto";

  // Espera 1.5 segundos antes de redirigir
  setTimeout(() => {
    window.location.href = "#";
  }, 3500);
});

document.getElementById("vista__al__manual").addEventListener("click", () => {
  window.open(encodeURI("manual/como se juega.html"), "_blank");
});

window.addEventListener("DOMContentLoaded", () => {
  const musica = document.getElementById("musica__menu");

  // Intenta reproducir la música
  musica.play().catch(() => {
    document.addEventListener(
      "click",
      () => {
        musica.play();
      },
      { once: true }
    );
  });

  // Función para hacer fade-out del volumen
  function fadeOutAudio(audio, velocidad = 0.05, intervalo = 200) {
    const fade = setInterval(() => {
      if (audio.volume > velocidad) {
        audio.volume -= velocidad;
      } else {
        audio.volume = 0;
        audio.pause();
        audio.currentTime = 0;
        clearInterval(fade);
      }
    }, intervalo);
  }

  // Detecta clic en cualquier botón
  const botones = document.querySelectorAll(
    "#vista__al__manual, #boton__iniciar"
  );
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      fadeOutAudio(musica);
    });
  });
});

document.getElementById("boton__iniciar").addEventListener("click", () => {
  const musica = document.getElementById("musica__menu");
  const pantalla = document.getElementById("pantalla__negra");

  // Activar pantalla negra
  pantalla.style.opacity = "1";
  pantalla.style.pointerEvents = "auto";

  // Fade-out de volumen sin detener la música
  const fade = setInterval(() => {
    if (musica.volume > 0.05) {
      musica.volume -= 0.05;
    } else {
      musica.volume = 0;
      clearInterval(fade);
    }
  }, 150);

  // Redirigir después de 1.5 segundos
  setTimeout(() => {
    window.location.href = "juego.html";
  }, 2500);
});
