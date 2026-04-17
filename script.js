// Animação de rotação da pequena planeta
const littlePlanet = document.querySelector('.little-planet');
let start;
let speedLP = 0.2; // Velocidade de rotação do Little Planet
let angleLP = 0; // angulo inicial do Little Planet

function rotatePlanet() {
    if (!littlePlanet) return;

    angleLP += speedLP; // Ajuste a velocidade de rotação aqui
    littlePlanet.style.transform = `rotate(${angleLP}deg)`;
    requestAnimationFrame(rotatePlanet);
}
rotatePlanet();

// Animação de órbita do OVNI
const radiusX= 250;
const radiusY = 60;
const speed = 0.0004;
const ovni = document.querySelector('.ovni');

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
    let speedLpLimitor = 20 || -20; // Limite para a velocidade de rotação
    document.addEventListener('keydown', (event)=>{
        if (event.key === 'ArrowLeft'){
            speedLP -= 0.1;
            console.log('Girando para esquerda');
            if (speedLP < -speedLpLimitor) {
                speedLP = -speedLpLimitor; // Limita a velocidade máxima para a esquerda
                console.log('Velocidade máxima para a esquerda atingida');
            }     
        } else if (event.key === 'ArrowRight'){
            speedLP += 0.1;
            console.log('Girando para direita');
            if (speedLP > speedLpLimitor) {
                speedLP = speedLpLimitor; // Limita a velocidade máxima para a direita
                console.log('Velocidade máxima para a direita atingida');
            }
    }});
    }

    document.addEventListener('keyup', (event)=>{
        if (event.key === 'ArrowLeft'){
            do {
                speedLP += 0.1;
            }
                while (speedLP<0.2);
        } else if (event.key === 'ArrowRight'){
            speedLP -= 0.1;
           do { speedLP -= 0.1;
            } while (speedLP> 0.2) 

    }});
    
adjustPlanetRotation();