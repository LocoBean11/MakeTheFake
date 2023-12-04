class Snail extends Phaser.GameObjects.Sprites{
    constructor(scene, x, y, texture, frame) { 
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        
        this.moveSpeed = 10; //pixels per frame
    }

    update(){
         //move the snail left    
         this.x -= this.moveSpeed;
         //wrap around from left edge to right edge
         if(this.x <= 0 - this.width) {
             this.reset();
         }    
     }
    }