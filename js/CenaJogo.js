import Mapa from "./Mapa.js";
import modeloMapa1 from "../maps/mapa1.js";
import Cena from "./Cena.js";
import Sprite from "./Sprite.js";

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
          if (!this.aRemover.includes(b)) 
            {
                this.aRemover.push(b)    
            }
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
        this.assets.play("boom");  
      }
      preparar(){
        super.preparar();
        const mapa1 = new Mapa(11, 15, 32);
        mapa1.carregaMapa(modeloMapa1)
        this.configuraMapa(mapa1);
        
        const pc = new Sprite({ x: 50, y:180, assets: this.assets});
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
        
        const en1 = new Sprite({ x: 360, y:70, color: "red", controlar: perseguePC, tags:["enemy"], assets: this.assets});
        en1.controlar = perseguePC;
        this.adicionar(en1);
        this.adicionar(new Sprite({ x: 360, y: 260, vy: 10, color: "red", controlar: perseguePC, tags:["enemy"], assets: this.assets}));
        
        this.adicionar(new Sprite({ x: 230, y: 50, tags: ["cogu"], assets: this.assets }));
        this.adicionar(new Sprite({ x: 230, y: 166, tags: ["cogu"], assets: this.assets }));
        this.adicionar(new Sprite({ x: 230, y: 290, tags: ["cogu"], assets: this.assets }));
        
        //this.adicionaSpritesAleatorios(10);
        //this.reposicionarSprite(4000);

      }
}