import Mapa from "./Mapa.js";
import Cena from "./Cena.js";
import Sprite from "./Sprite.js";
import mapa1 from "../maps/mapa1.js";
import mapa2 from "../maps/mapa2.js";

export default class CenaJogo extends Cena {
    quandoColidir(a, b) {
        if (a.tags.has("pc") && b.tags.has("enemy")) {
          if (!this.aRemover.includes(a)) 
            {
                this.aRemover.push(a)    
            }
            if (!this.aRemover.includes(b)) 
            {
                this.aRemover.push(b)    
            }
            this.game.selecionaCena("fim");
        }
        else if (a.tags.has("pc") && b.tags.has("cogu")) {
          this.assets.play("cogusom");
          this.game.pontuacao();
          if (!this.aRemover.includes(b)) 
            {
              this.aRemover.push(b)    
            }
        }
        else if (a.tags.has("pc") && b.tags.has("flor"))
        {
            if (!this.aRemover.includes(b)) 
            {
                this.aRemover.push(b)    
            }
            this.game.selecionaCena("jogo2");
        }
        else if (a.tags.has("enemy") && b.tags.has("cogu"))
        {
          return;
        }
        else if (a.tags.has("enemy") && b.tags.has("flor"))
        {
            return;
        }
        else{
          if (!this.aRemover.includes(a)) 
          {
              this.aRemover.push(a)    
          }
          if (!this.aRemover.includes(b)) 
          {
              this.aRemover.push(b)    
          }
        } 
      }
      preparar(){
        super.preparar();
        const map = new Mapa(11, 15, 32);

        if (this.mapa == 1)
        {
            map.carregaMapa(mapa1);
            this.configuraMapa(map);
        }
        else if (this.mapa == 2)
        {
            map.carregaMapa(mapa2);
            this.configuraMapa(map);
        }
        
        const pc = new Sprite({ x: 50, y:180, w:30, h:30, assets: this.assets});
        pc.tags.add("pc");
        const cena = this;
        pc.controlar = function(dt){
          if(cena.input.comandos.get("MOVE_ESQUERDA")){
            this.vx = -50;
          } else if(cena.input.comandos.get("MOVE_DIREITA")){
            this.vx = +50;
          } else{
            this.vx = 0;
          }
          if(cena.input.comandos.get("MOVE_CIMA")){
            this.vy = -50;
          } else if(cena.input.comandos.get("MOVE_BAIXO")){
            this.vy = +50;
          } else{
            this.vy = 0;
          }
        };
        this.adicionar(pc);
        
        function perseguePC(dt){
          this.vx = 15*Math.sign(pc.x - this.x);
          this.vy = 15*Math.sign(pc.y - this.y);
        }
        
        const en1 = new Sprite({ x: 360, y:70, w:30, h:30, color: "red", controlar: perseguePC, tags:["enemy"], assets: this.assets});
        en1.controlar = perseguePC;
        this.adicionar(en1);
        this.adicionar(new Sprite({ x: 360, y: 260, w:30, h:30, color: "red", controlar: perseguePC, tags:["enemy"], assets: this.assets}));
        
        this.adicionar(new Sprite({ x: 240, y: 55, w:30, h:30, tags: ["cogu"], assets: this.assets }));
        this.adicionar(new Sprite({ x: 240, y: 166, w:30, h:30, tags: ["cogu"], assets: this.assets }));
        this.adicionar(new Sprite({ x: 240, y: 290, w:30, h:30, tags: ["cogu"], assets: this.assets }));
        this.adicionar(new Sprite({ x: 440, y: 166, w:30, h:30,tags: ["flor"], assets: this.assets }));

        //this.adicionaSpritesAleatorios(10);
        //this.reposicionarSprite(4000);

      }
}