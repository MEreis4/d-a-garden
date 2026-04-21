class Personagem{       // classe base (mãe)
    constructor(nomeClasseCss, posX, posY, spdX, spdY, sprite, isDead){     //esse é o construtor. Ele inicializa as propriedades pra eu usar
        this.posX = posX;   //this significa a propriedade daquele "new object"
        this.posY = posY;   //aqui quer dizer que a posY na declaração daquele objeto remete a propriedade posY que está no construtor.
        this.spdX = spdX;
        this.spdY = spdY;
        this.isDead = isDead;

        this.element = document.createElement('div');
        this.element.classList.add(nomeClasseCss);
        this.element.style.position = "absolute";
        this.element.style.background = `url(${sprite})`;

        const gameContainer = document.querySelector('.sky')
        gameContainer.appendChild(this.element);

        this.render();
    }

    render(){
        if (this.isDead) return;
        this.element.style.transform = `translate(${this.posX}px ${this.posY}px)`;
        console.log(`Rendering at ${this.posX}, ${this.posY}`);
    }
    
    // animarSprite(larguraDoFrame, frameAtual) {
    //     if (this.isDead) return;
    //     let posicaoX = -(frameAtual * larguraDoFrame);
    //     this.element.style.backgroundPosition = `${posicaoX}px 0px`;
    // }

    // checarLimites(){
    //     const larguraTela = window.innerWidth;
    //     const alturaTela = window.innerHeight;

    //     if (this.posX < - 100 || this.posX > larguraTela + 100 ||
    //         this.posY < - 100 || this.posY > alturaTela + 100){
    //             this.element.remove();
    //             this.isDead = true
    //     }
    // }
    
    mover(){
        if (this.isDead) return;
        this.posX += this.spdX
        this.posY += this.spdY
    }
}

class Tails extends Personagem{
    constructor(nomeClasseCss,posX,posY,spdX,spdY,sprite,isDead){
        super(nomeClasseCss,posX,posY,spdX,spdY,sprite,isDead)
        this.element.style.width = "200px";
        this.element.style.height = "100px"
    }
}

const tails = new Tails("tails", "50px", "50px" , 1, 1, "img/tails_sprites.png", false);

const loop = () =>{
tails.mover();
tails.render();
if (!tails.isDead) requestAnimationFrame(loop)
}
loop()