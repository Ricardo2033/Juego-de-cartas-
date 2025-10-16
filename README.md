# Juego de cartas — Guía del juego

Este repositorio contiene una versión web (HTML/CSS/JS) de un juego de cartas. Este README describe exclusivamente las reglas del juego, controles, tipos de cartas y cómo se puntúa.

## Objetivo

Ser el jugador con más puntos al final de la partida. El juego reparte cartas a cada jugador y se juegan rondas donde se comparan atributos o se usan efectos especiales.

## Componentes

- Baraja: conjunto de cartas con distintos atributos (ataque, defensa, rareza, efectos).
- Mano: cada jugador recibe un número de cartas (por ejemplo 5).
- Pila de descartes (opcional).

## Preparación

1. Mezclar la baraja.
2. Repartir 5 cartas a cada jugador.
3. Definir quién inicia (random o por criterio).

## Turno de juego (flujo básico)

1. El jugador activo elige una carta de su mano.
2. Dependiendo de la modalidad (por ejemplo comparar ataque o usar efecto), se resuelve la comparación con la carta del oponente.
3. El ganador obtiene puntos según la diferencia de atributos o según la carta jugada.
4. Las cartas jugadas van a la pila de descartes.
5. Se roba hasta volver a tener 5 cartas (si la baraja todavía tiene cartas).
6. Pasa el turno al siguiente jugador.

## Reglas comunes (ejemplos)

- Comparar atributo: si la carta A tiene ataque 8 y la carta B tiene ataque 6, A gana y obtiene 2 puntos.
- Efectos especiales: algunas cartas pueden doblar puntos, robar cartas o anular una jugada.
- Empates: se aplica desempate por rareza o se considera empate y no se otorgan puntos.

## Controles

- Clic sobre una carta para seleccionarla.
- Botón `Jugar` para confirmar la jugada.
- `Manual` o `Cómo jugar` abre las reglas (si el proyecto tiene una pantalla de manual).

## Puntuación (modelo sugerido)

- Diferencia de atributo simple: puntos = |atributoA - atributoB|.
- Bonus por rareza: cartas raras añaden +1 o +2 puntos cuando ganan.
- Puntos por efecto: algunos efectos suman puntos adicionales según su descripción.

## Fin de la partida

La partida termina cuando la baraja se agota y los jugadores han jugado todas sus manos, o cuando se alcanza un número de rondas fijo. Gana el jugador con más puntos.

## Extensiones y variaciones

- Modo campaña: sucesivas partidas con efectos persistentes.
- Modo draft: los jugadores eligen cartas de un pool común antes de jugar.
- IA: implementar una IA simple que priorice ataque o rareza.

## Notas técnicas rápidas

- Las imágenes y sonidos están en `assets/`.
- Código principal en `JS/`.

---
Si quieres, puedo:
- Añadir reglas completas directamente al juego (pantalla de reglas accesible desde `index.html`).
- Incluir ejemplos de cartas y una tabla con atributos en este README.
# Juego de cartas 🎴

Proyecto web estático con una interfaz para un juego de cartas. Pensado como demo o prototipo: HTML, CSS y JavaScript sencillos. Está preparado para desarrollarlo localmente y crear builds con Parcel.

## Estructura del repositorio

- `index.html` / `juego.html` — páginas principales del proyecto.
- `JS/` — código fuente JavaScript (lógica del juego, IA, menú, sonidos).
- `styles/` — hojas de estilo y fuentes.
- `assets/` — imágenes y sonido usados por el juego.
- `dist/` — carpeta generada por el bundler (build). No tracked en Git si está en `.gitignore`.

## Requisitos

- Navegador moderno (Chrome, Edge, Firefox).
- Node.js + npm (opcional, sólo si quieres usar Parcel para builds).

## Ejecutar localmente

Sin herramientas: abre `index.html` o `juego.html` en el navegador.

Con un servidor simple (recomendado para evitar problemas de rutas):

```powershell
# Servir la carpeta actual en el puerto 8000 (PowerShell)
python -m http.server 8000
# luego abre http://localhost:8000
```

Con Parcel (instalación opcional):

```powershell
npm install
npx parcel index.html
# o para build optimizado:
npx parcel build index.html --dist-dir dist
```

Si vas a usar Parcel a menudo, puedes añadir scripts en `package.json`:

```json
"scripts": {
  "dev": "parcel index.html",
  "build": "parcel build index.html --dist-dir dist"
}
```

## Manejo de archivos grandes

- `node_modules/` no debe subirse al repositorio; usa `.gitignore` para ignorarlo.
- Si necesitas conservar binarios grandes (por ejemplo ejecutables), súbelos a GitHub Releases o usa Git LFS (requiere cuota en GitHub).
- Si el push falla con errores GH001 (archivos >100MB) o advertencias (>50MB), es porque hay archivos en el historial que exceden los límites. En este proyecto se resolvió creando una rama limpia sin los binarios grandes.

## Buenas prácticas

- Mantén `package.json` y `package-lock.json` en el repo para sincronizar dependencias, en lugar de versionar `node_modules/`.
- Usa nombres de archivo sin espacios ni tildes para evitar problemas con scripts y servidores case-sensitive (prefiere `-` y lowercase).
- Para imágenes grandes, optimízalas (WebP o compresión) y usa `background-size: cover` para fondos.

## Próximos pasos sugeridos

- Añadir tests básicos (scripts que validen rutas de assets y la carga de las páginas).
- Implementar la lógica de juego en `JS/` (barajar, repartir, turnos, IA básica).
- Mejorar accesibilidad (atributos `alt` en imágenes, etiquetas semánticas, control por teclado).

Si quieres, puedo:
- Añadir scripts `dev`/`build` en `package.json`.
- Normalizar nombres de archivos en `assets/` (remover espacios/mayúsculas).
- Crear una Release con los binarios grandes y actualizar el README con enlaces.

---
Licencia: MIT
# Juego de cartas

Pequeño proyecto de ejemplo: una interfaz web para un juego de cartas. El repositorio contiene una página estática (`index.html`) y estilos (`styles.css`).

## Contenido

- `index.html` — Página principal con la interfaz del juego.
- `styles.css` — Estilos para la página.

## Requisitos

Solo necesitas un navegador moderno (Chrome, Edge, Firefox, etc.). No hay dependencias externas.

## Cómo ejecutar

1. Abre el archivo `index.html` en tu navegador (doble clic o arrastrar al navegador).
2. Si quieres servirlo desde un servidor local (opcional), puedes usar Python o una extensión de VS Code. Por ejemplo, con Python 3:

```powershell
# Abre PowerShell en la carpeta del proyecto y ejecuta:
python -m http.server 8000; # luego abre http://localhost:8000
```

## Objetivos y próximos pasos

- Añadir `script.js` para la lógica del juego (barajar, repartir, turnos).
- Implementar una pequeña demo jugable y controles para el jugador.
- Mejorar el diseño y la accesibilidad.

Si quieres, puedo crear los siguientes cambios ahora:

- Añadir `script.js` con la lógica básica del juego.
- Añadir un README más detallado con reglas del juego y ejemplos.

Indica qué prefieres y lo hago.
mt09

---
Licencia: MIT
