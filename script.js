// Animação de rotação do Little Planet
const littlePlanet = document.querySelector(".little-planet");
let start;
let speedLP = 0.2; // Velocidade de rotação do Little Planet
let angleLP = 0; // angulo inicial do Little Planet
let isRotatingtoLeft = false; // Variável para controlar o estado de rotação do Little Planet para a esquerda
let isRotatingtoRight = false; // Variável para controlar o estado de rotação do Little Planet para a direita

function rotatePlanet() {
  if (!littlePlanet) return;
  let speedLpLimitor = 20; // Limite para a velocidade de rotação

  angleLP -= speedLP; // Ajuste a velocidade de rotação aqui
  littlePlanet.style.transform = `rotate(${angleLP}deg)`;

  // Aumenta a velocidade de rotação para a esquerda ou direita com base nas setas pressionadas
  if (isRotatingtoLeft) {
    speedLP += 0.1;
    if (speedLP > speedLpLimitor) {
      speedLP = speedLpLimitor; // Limita a velocidade máxima para a esquerda
      console.log("Velocidade máxima para a esquerda atingida");
    }
  } else if (!isRotatingtoLeft) {
    if (speedLP > 0.2) {
      speedLP -= 0.03; // Retorna à velocidade normal quando a seta esquerda é solta
    }
  }

  if (isRotatingtoRight) {
    speedLP -= 0.1;
    if (speedLP < -speedLpLimitor) {
      speedLP = -speedLpLimitor; // Limita a velocidade máxima para a direita
      console.log("Velocidade máxima para a direita atingida");
    }
  } else if (!isRotatingtoRight) {
    if (speedLP < 0.2) {
      speedLP += 0.03; // Retorna à velocidade normal quando a seta direita é solta
    }
  }
  // requestAnimationFrame é usado para criar uma animação suave, chamando a função rotatePlanet repetidamente para atualizar a rotação do planeta em cada frame.
  requestAnimationFrame(rotatePlanet);
}
rotatePlanet();

// Animação de órbita do OVNI
const radiusX = 250;
const radiusY = 60;
const speed = 0.0004;
const ovni = document.querySelector(".ovni");

function orbitingAnimation(timestamp) {
  if (!ovni) return;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  if (!start) start = timestamp;
  const elapsed = timestamp - start;

  const angle = elapsed * speed;
  const x = centerX + radiusX * Math.cos(angle);
  const y = centerY + radiusY * Math.sin(angle);
  ovni.style.transform = `translate(${x - 25}px, ${y - 25}px)`; // Ajuste para centralizar o OVNI

  if (y > centerY) {
    ovni.style.zIndex = 0; // OVNI atrás do planeta
  } else {
    ovni.style.zIndex = 2; // OVNI à frente do planeta
  }
  requestAnimationFrame(orbitingAnimation);
}
orbitingAnimation();

//manipulação a rotação do planeta com as setas do teclado
function adjustPlanetRotation() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotatingtoLeft) {
        isRotatingtoLeft = true;
        console.log(`Rodando para a esquerda: ${isRotatingtoLeft}`);
      }
    } else if (event.key === "ArrowRight") {
      if (!isRotatingtoRight) {
        isRotatingtoRight = true;
        console.log(`Rodando para a direita: ${isRotatingtoRight}`);
      }
    }
  });
  document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") {
      if (isRotatingtoLeft) {
        isRotatingtoLeft = false;
        console.log(`Rodando para a esquerda: ${isRotatingtoLeft}`);
      }
    } else if (event.key === "ArrowRight") {
      if (isRotatingtoRight) {
        isRotatingtoRight = false;
        console.log(`Rodando para a direita: ${isRotatingtoRight}`);
      }
    }
  });
}
adjustPlanetRotation();
