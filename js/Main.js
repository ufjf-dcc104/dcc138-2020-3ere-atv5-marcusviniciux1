import AssetManager from "./AssetManager.js";
import CenaJogo from "./CenaJogo.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaFim from "./CenaFim.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";

const input = new InputManager();
const mixer= new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("rogueknight", "assets/rogueknight.png");
assets.carregaImagem("grama", "assets/grama.png");
assets.carregaImagem("cogu", "assets/cogu.png");
assets.carregaImagem("arvore", "assets/arvore.png");
assets.carregaImagem("cerca1", "assets/cerca1.png");
assets.carregaImagem("cerca2", "assets/cerca2.png");
assets.carregaImagem("cerca3", "assets/cerca3.png");
assets.carregaImagem("cerca4", "assets/cerca4.png");
assets.carregaImagem("orc1", "assets/orc1.png");
assets.carregaImagem("flor", "assets/flor.png");
assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("orc", "assets/orc.png");
assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaAudio("moeda", "assets/coin.wav");
assets.carregaAudio("cogusom", "assets/cogusom.wav");
assets.carregaAudio("boom", "assets/boom.wav");

const canvas = document.querySelector("canvas");
canvas.width = 15*32;
canvas.height = 11*32;
input.configurarTeclado({
  ArrowLeft: "MOVE_ESQUERDA",
  ArrowRight: "MOVE_DIREITA",
  ArrowUp: "MOVE_CIMA",
  ArrowDown: "MOVE_BAIXO",
  " ": "PROXIMA_CENA",
});

const game = new Game(canvas, assets, input);

const cena0 = new CenaCarregando();
const cena1 = new CenaJogo();
const cena2 = new CenaJogo();
const cena3 = new CenaFim();
game.adicionarCena("carregando", cena0);
game.adicionarCena("jogo", cena1, 1);
game.adicionarCena("jogo2", cena2, 2);
game.adicionarCena("fim", cena3);

game.iniciar();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "s":
      game.iniciar();
      break;
    case "S":
      game.parar();
      break;
    case "c":
      assets.play("moeda");
      break;
    case "b":
      assets.play("boom");
      break;
  }
});
