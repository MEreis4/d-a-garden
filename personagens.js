class Personagem {  // classe base (pai)
  constructor(informacoes) {    //esse é o construtor. Ele inicializa as propriedades pra eu usar
    this.name = informacoes.name;
    this.posX = informacoes.posX; //this significa a propriedade daquele "new object"
    this.posY = informacoes.posY; //aqui quer dizer que a posY na declaração daquele objeto remete a propriedade posY que está no construtor.
    this.spdX = informacoes.spdX;
    this.spdY = informacoes.spdY;
    this.isDead = informacoes.isDead;
    this.isRespawning = false;
    this.scale = informacoes.scale || 1;
    this.direcao = 1;

    this.element = document.createElement("div");   //element é uma propriedade nativa de uma classe, ou seja, não precisa dar seu parâmetro na hora de criar o objeto
    this.element.classList.add(informacoes.nomeClasseCss);
    // this.element.style.position = "absolute";
    // this.element.style.background = `url(${informacoes.sprite})`;
    // this.element.style.backgroundSize = "cover";

    const dAContainer = document.querySelector(".sky"); // (lembrete) querySelector pega o primeiro elemento no documento com essa classe css
    dAContainer.appendChild(this.element);

    this.render();
  }

  // determina a posição do personagem
  render() {
    if (this.isDead) return;

    const flipX = this.scale * this.direcao;

    this.element.style.transform = `translate(${this.posX}px, ${this.posY}px) scale(${flipX}, ${this.scale})`;
    console.log(`Rendering at ${this.posX}, ${this.posY}`);
  }

  // checa os limites da borda e "mata" (deleta) o personagem caso tenha passado dela.
  checarLimites() {
    const larguraTela = window.innerWidth;
    const alturaTela = window.innerHeight;
    if ( (this.spdX > 0 && this.posX > larguraTela + 1200) || 
         (this.spdX < 0 && this.posX < -10000) ) {
      this.element.remove();
      this.isDead = true;
      this.isRespawning = false;
      this.posX = 0;
      this.posY = 0;
      console.log(this.isDead);
      console.log(this.name + " is currently dead :>");
    }
  }

  //respawnar personagem depois de um período de tempo aleatório caso tenha sido excluido
  async respawn() {
    if (!this.isDead || this.isRespawning) return;
    const larguraTela = window.innerWidth;
    const alturaTela = window.innerHeight;
    let cooldown = Math.floor(Math.random() * 15000) + 5000; // Entre 5 e 20 segundos

    this.isRespawning = true;
    try {
      console.log(this.name + " cooldown: " + cooldown);
      await wait(cooldown);

      // 50% de chance de vir da esquerda
      const virDaEsquerda = Math.random();
      console.log(virDaEsquerda);

      if (virDaEsquerda > 0.5){
        this.posX = -1000;
        this.spdX = Math.abs(this.spdX); // Garante que a velocidade X seja positiva (vai p/ direita)
        this.direcao = 1; // Olhando para a direita
      } else{
        this.posX = larguraTela + 1000;
        this.spdX = -Math.abs(this.spdX);
        this.direcao = -1; // Olhando para a esquerda (flip)
      }

      // this.posY = Math.floor(Math.random() * (alturaTela - 200)) + 100;

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
    
    // 1. Variáveis de Estado
    this.timerDeMudanca = 0;
    
    // 2. Variáveis de Animação
    this.frameTimer = 0; // Conta o tempo para trocar de quadro
    this.frameIndex = 0; // O quadro atual (0, 1, 2...)
    
    // Deixamos a array montada aqui para não recriar todo frame
    this.spritesheet = [
      {x:-5, y: -2920}, {x:-5, y: -732}, {x:-5, y: -1462}, {x:-5, y: -732},   // idle
      {x:-5, y: -3650}, {x:-5, y: -4380}, {x:-5, y: -5}, {x:-5, y: -4380},    // down
      {x:-5, y: -2191}, {x:-5, y: -5110}, {x:-5, y: -5840}, {x:-5, y: -5110}  // up
    ];
    
    this.idleTails = this.spritesheet.slice(0,4);
    this.downTails = this.spritesheet.slice(4,8);
    this.upTails = this.spritesheet.slice(8, this.spritesheet.length);
    console.log(this.idleTails, this.downTails, this.upTails)
    
    // Define a animação inicial
    this.animacaoAtual = this.idleTails;
  }

  mover (){
    if(this.isDead) return;
    
    // momentos das animações
    this.timerDeMudanca--;

    if(this.timerDeMudanca <= 0){
      let positionY = Math.floor(Math.random() * 3);

      if (positionY === 2){
        this.spdY = -1.5;
        this.animacaoAtual = this.upTails;
      }
      else if (positionY === 0){
        this.spdY = 1.5;
        this.animacaoAtual = this.downTails;
      }
      else {
        this.spdY = 0;
        this.animacaoAtual = this.idleTails;
      }
      
      this.frameIndex = 0; // Reseta a animação ao mudar de estado
      this.timerDeMudanca = Math.floor(Math.random() * 60) + 30;
    }

    // toca-frames
    this.frameTimer--; // vai diminuindo dependendo do tempo que eu decidir no final do if
    
    if(this.frameTimer <= 0) {
        // Pula para o próximo quadro
        this.frameIndex++;
        
        // Se passou do limite da array, volta para o começo (faz o loop da animação)
        if(this.frameIndex >= this.animacaoAtual.length) {
            this.frameIndex = 0;
        }
        
        // Pega as coordenadas X e Y do quadro atual
        let frame = this.animacaoAtual[this.frameIndex];
        this.element.style.backgroundPosition = `${frame.x}px ${frame.y}px`;
        
        // Define a velocidade da animação do sprite (aumente para ficar mais lento)
        this.frameTimer = 2; 
    }
    
    this.posY += this.spdY;
    this.posX += this.spdX;
  }
}

const tails = new Tails({   // aqui eu estou criando um novo objeto que herda da classe Tails (filha), que também herda da classe Personagens (pai)
  name: "Tails",
  nomeClasseCss: "tails",
  sprite: "img/tails-sprites.png",
  posX: -1000,
  posY: 0,
  spdX: 8,
  spdY: 0,
  scale: 0.2,
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