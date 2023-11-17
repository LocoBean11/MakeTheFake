class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('background', '.assets/DigChampsbackground');
        this.load.image('shovel', '.assets/this.shovel.png');
    }

    create(){
        this.p1Shovel = this.physics.add.sprite(game.config.width /7, game.config.height /2 - borderUISize - borderPadding, 'shovel').setOrigin(0.5, 0);

    }
        

    update(){

    }


}