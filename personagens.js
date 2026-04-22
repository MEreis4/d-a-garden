class Personagem{       // classe base (mãe)
    constructor(informacoes){     //esse é o construtor. Ele inicializa as propriedades pra eu usar
        this.posX = informacoes.posX;   //this significa a propriedade daquele "new object"
        this.posY = informacoes.posY;   //aqui quer dizer que a posY na declaração daquele objeto remete a propriedade posY que está no construtor.
        this.spdX = informacoes.spdX;
        this.spdY = informacoes.spdY;
        this.isDead = informacoes.isDead;

        this.element = document.createElement('div');
        this.element.classList.add(informacoes.nomeClasseCss);
        this.element.style.position = "absolute";
        this.element.style.background = `url(${informacoes.sprite})`;
        this.element.style.backgroundSize = "cover";

        const dAContainer = document.querySelector('.sky')
        dAContainer.appendChild(this.element);

        this.render();
    }

    render(){
        if (this.isDead) return;
        this.element.style.transform = `translate(${this.posX}px, ${this.posY}px)`;
        console.log(`Rendering at ${this.posX}, ${this.posY}`);
    }
    
    // animarSprite(larguraDoFrame, frameAtual) {
    //     if (this.isDead) return;
    //     let posicaoX = -(frameAtual * larguraDoFrame);
    //     this.element.style.backgroundPosition = `${posicaoX}px 0px`;
    // }

    checarLimites(){
        const larguraTela = window.innerWidth;
        const alturaTela = window.innerHeight;

        if (this.posX < - 100 || this.posX > larguraTela + 100 ||
            this.posY < - 100 || this.posY > alturaTela + 100){
                this.element.remove();
                this.isDead = true
        }
    }
    
    mover(){
        if (this.isDead) return;
        this.posX += this.spdX
        this.posY += this.spdY
    }
}

class Tails extends Personagem{
    constructor(informacoes){
        super(informacoes)
        this.element.style.width = "200px";
        this.element.style.height = "110px"
    }
}

const tails = new Tails({
    nomeClasseCss: "tails", sprite: "img/tails-sprites.png", posX: 0, posY: 0, spdX: 1, spdY:0, isDead: false
});

const loop = () =>{
tails.mover();
tails.render();
if (!tails.isDead) requestAnimationFrame(loop)
}
loop()