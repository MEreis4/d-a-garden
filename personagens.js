class Personagem {  // classe base (pai)
  constructor(informacoes) {    //esse é o construtor. Ele inicializa as propriedades pra eu usar
    this.name = informacoes.name;
    this.posX = informacoes.posX; //this significa a propriedade daquele "new object"
    this.posY = informacoes.posY; //aqui quer dizer que a posY na declaração daquele objeto remete a propriedade posY que está no construtor.
    this.spdX = informacoes.spdX;
    this.spdY = informacoes.spdY;
    this.isDead = informacoes.isDead;
    this.isRespawning = false;

    this.element = document.createElement("div");   //element é uma propriedade nativa de uma classe, ou seja, não precisa dar seu parâmetro na hora de criar o objeto
    this.element.classList.add(informacoes.nomeClasseCss);
    // this.element.style.position = "absolute";
    // this.element.style.background = `url(${informacoes.sprite})`;
    // this.element.style.backgroundSize = "cover";

    const dAContainer = document.querySelector(".sky"); // (lembrete) querySelector pega o primeiro elemento no documento com essa classe css
    dAContainer.appendChild(this.element);

    this.render();
  }
  // determinar posição do personagem
  render() {
    if (this.isDead) return;
    this.element.style.transform = `translate(${this.posX}px, ${this.posY}px)`;
    console.log(`Rendering at ${this.posX}, ${this.posY}`);
  }

  // animarSprite(larguraDoFrame, frameAtual) {
  //     if (this.isDead) return;
  //     let posicaoX = -(frameAtual * larguraDoFrame);
  //     this.element.style.backgroundPosition = `${posicaoX}px 0px`;
  // }
  
  //verificar se o personagem está dentro ou fora da tela, se estiver, exclui o personagem
  checarLimites() {
    const larguraTela = window.innerWidth;
    const alturaTela = window.innerHeight;

    if (
      this.posX < -1000 ||
      this.posX > larguraTela + 100 ||
      this.posY < -100 ||
      this.posY > alturaTela + 100
    ) {
      this.element.remove();
      this.isDead = true;
      this.isRespawning = false;
      this.posX = -1000;
      console.log(this.isDead);
      console.log(this.name + " is currently dead :>");
    }
  }

  //respawnar personagem depois de um período de tempo aleatório caso tenha sido excluido
  async respawn() {
    let cooldown = await Math.floor(Math.random() * 20001);
    if (!this.isDead || this.isRespawning) return;

    this.isRespawning = true;
    try {
      console.log(this.name + " cooldown: " + cooldown)
      await wait(cooldown);
      this.isDead = false;
      this.isRespawning = false;

      if (!this.element.parentNode) {
        document.querySelector(".sky").appendChild(this.element);
      }

      this.render();
      console.log(`${this.name} respawned`);
    } catch (erro) {
      console.warn(erro);
    }
  }

  //movimento génerico para todos os personagens
  mover() {
    if (this.isDead) return;
    this.posX += this.spdX;
    this.posY += this.spdY;
  }
}

class Tails extends Personagem {    // classe filha 
  constructor(informacoes) {
    super(informacoes);     // super() chama os parametros da classe pai para que funcionem nessa classe também.
    this.timerDeMudanca = 0;
  }

  async mover (){
    if(this.isDead) return;
    const spritesheet = [
      {x:-5, y: -2920},
      {x:-5, y: -773},
      {x:-5, y: -1462},
      {x:-5, y: -3650},
      {x:-5, y: -4380},
      {x:-5, y: -5},
      {x:-5, y: -2191},
      {x:-5, y: -5110},
      {x:-5, y: -5840}
    ]
    const idleTails = spritesheet.slice(0,2);
    const downTails = spritesheet.slice(3,5);
    const upTails = spritesheet.slice(6,8);

    const playSequence = async (sequence) => {
      for (const frame of sequence){
        this.element.style.backgroundPosition = `${frame.x}px ${frame.y}px`;
      }
    }
    
    this.timerDeMudanca--;

    if(this.timerDeMudanca <= 0){
      let positionY = Math.floor(Math.random() * 3)

      if (positionY === 2){
        console.log(this.name + " está subindo");
        this.spdY = -1.5;
      await playSequence(upTails);
      }
      else if (positionY === 0){
        console.log(this.name + " está descendo")
        this.spdY = 1.5;
        await playSequence(downTails);
      }
      else {
        console.log(this.name + " está indo reto")
        this.spdY = 0;
        await playSequence(idleTails);
      }
      
      
      this.timerDeMudanca = Math.floor(Math.random() * 60) + 30;
    }
    
    this.posY += this.spdY;
    this.posX += this.spdX;

    if(this.posY < 20) this.posY = 20;
    if (this.posY > 500) this.posY = 500;
  }
  
}

const tails = new Tails({   // aqui eu estou criando um novo objeto que herda da classe Tails (filha), que também herda da classe Personagens (pai)
  name: "Tails",
  nomeClasseCss: "tails",
  sprite: "img/tails-sprites.png",
  posX: -1000,
  posY: 0,
  spdX: 3,
  spdY: 0,
  isDead: false
});

//loop para que a animação ocorra
const tailsAnimation = () => {
  if (tails.isDead) tails.respawn();
  tails.mover();
  tails.render();
  tails.checarLimites();
  requestAnimationFrame(tailsAnimation);
};
tailsAnimation();