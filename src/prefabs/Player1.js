class Player1 extends Phaser.GameObjects.Sprites{
    constructor(scene, x, y, texture, frame) { 
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        
        this.moveSpeed = 8; //pixels per frame
    }

    update(){

    }



}