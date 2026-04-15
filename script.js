// Animação de rotação da pequena planeta
const littlePlanet = document.querySelector('.little-planet');
let start;
function rotatePlanet(timestamp) {
    if (!littlePlanet) return;

    if (!start) start = timestamp;
    const elapsed = timestamp - start;

    const angleLP = elapsed * 0.01; // Ajuste a velocidade de rotação aqui
    littlePlanet.style.transform = `rotate(${angleLP}deg)`;
    requestAnimationFrame(rotatePlanet);
}
rotatePlanet();

// Animação de órbita do OVNI
const radiusX= 250;
const radiusY = 60;
const speed = 0.001;
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