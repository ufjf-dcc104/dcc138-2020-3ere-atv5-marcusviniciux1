import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Sprite from "./Sprite.js";
import Mixer from "./Mixer.js";
import Mapa from "./Mapa.js";
import modeloMapa1 from "../maps/mapa1.js";

const mixer= new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("orc", "assets/orc.png");
assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaAudio("moeda", "assets/coin.wav");
assets.carregaAudio("boom", "assets/boom.wav");

const canvas = document.querySelector("canvas");
canvas.width = 15*32;
canvas.height = 11*32;
const cena1 = new Cena(canvas, assets);

const mapa1 = new Mapa(11, 15, 32);
mapa1.carregaMapa(modeloMapa1)
cena1.configuraMapa(mapa1);

const pc = new Sprite({ x: 50, vx: 10 });
const en1 = new Sprite({ x: 140, color: "red" });

cena1.adicionar(pc);
cena1.adicionar(en1);
cena1.adicionar(new Sprite({ y: 70, color: "red" }));

cena1.iniciar();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "s":
      cena1.iniciar();
      break;
    case "S":
      cena1.parar();
      break;
      case "c":
      assets.play("moeda");
      break;
      case "b":
      assets.play("boom");
      break;
  }
});
