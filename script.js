// Animação de rotação do Little Planet
const littlePlanet = document.querySelector(".little-planet"); //querySelector pega o primeiro elemento no documento com essa classe css
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
const radiusX = 450;
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

// Animação de idle do planeta usando JavaScript para controlar os frames da sprite (sim, usei IA).

// 1. Função auxiliar para criar as pausas (delay)
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function planetIdleAnimation() {
  const sprites = [
    { x: -8, y: -8 },
    { x: -749, y: -8 },
    { x: -8, y: -744 },
    { x: -749, y: -744 },
    { x: -1490, y: -8 },
    { x: -1490, y: -744 },
    { x: -8, y: -8 }, // Fim do Great Vulcan (Index 6)
    { x: -8, y: -1480 },
    { x: -749, y: -1480 },
    { x: -1490, y: -1480 },
    { x: -2231, y: -8 },
    { x: -2231, y: -744 },
    { x: -8, y: -8 }, // Fim do Little Vulcan (Index 12)
  ];

  const greatVulcan = sprites.slice(0, 7);
  const littleVulcan = sprites.slice(7, 13);

  // Função interna para rodar uma sequência específica
  async function playSequence(sequence) {
    for (const frame of sequence) {
      littlePlanet.style.backgroundPosition = `${frame.x}px ${frame.y}px`;
      await wait(100); // Velocidade da animação (100ms por frame)
    }
  }

  // Loop infinito do ciclo completo
  while (true) {
    // 1. Anima o Great Vulcan
    await playSequence(greatVulcan);

    // 2. Espera 3 segundos
    await wait(3000);

    // 3. Anima o Little Vulcan
    await playSequence(littleVulcan);

    // 4. Espera 5 segundos antes de reiniciar o ciclo
    await wait(5000);
  }
}

// Inicia a animação apenas uma vez
planetIdleAnimation();

// Tela de Carregamento
let isLoading = true;
const sonicWaiting = document.querySelector(".sonic-loading");
const loadingOverlay = document.querySelector(".sonic-overlay");

const sonicSprites = [
  {x: -2964, y: -10},
  {x: -2223, y: -10},
  {x: -744, y: -10},
  {x: -1483, y: -10},
  {x: -7, y: -10}
]

async function loadingScreen() {
  let progress = 0;

 async function playSequence(sequence){
    while (isLoading){
      for (const frame of sequence){
        sonicWaiting.style.backgroundPosition = `${frame.x}px, ${frame.y}px`;
        await wait(100);
      }
    }
  }

  playSequence(sonicSprites);

  const assets = [
    { nome: "Present Planet", src: "img/preplanet_sprites.png" },
    { nome: "Ovni", src: "img/ovni.png" },
    { nome: "Tails", src: "img/tails-sprites.png" },
    { nome: "Dubious Depths", src: "audio/dubious-depths.mp3" }
  ];

  const loaders = assets.map(({ nome: name, src: src }) => {
    return new Promise((resolve) => {
      let ass;
      if (src.endsWith(".png")) ass = new Image();
      else if (src.endsWith(".mp3")) ass = new Audio();

      
      const afterLoad = () => {
        progress++;
        console.log(name + " loaded sucessfuly");
        resolve();
      };
      
      if (src.endsWith(".mp3")) ass.oncanplaythrough = afterLoad;
      if (src.endsWith(".png")) ass.onload = afterLoad;
      
      ass.src = src;
    });
  });
  
  await Promise.all(loaders);
  
  isLoading = false;
  console.log(progress + " assets loaded!");
  loadingOverlay.style.animation = "megaDriveFade 1s steps(4) forwards";
}
loadingScreen();


function playAudio(){
  const dubiousDepths = new Audio('audio/dubious-depths.mp3');
  dubiousDepths.loop = true;
  dubiousDepths.play();
}
playAudio();
