class Play extends Phaser.Scene{
    constructor() {
        super('playScene');
    }

    preload() {
        //Sprites and backgrounds
        this.load.image('background', './assets/DigChampsBackground.png');
        this.load.image('shovel', './assets/this.DigChampsP1.png');
    }//End of preload

    create() {
        this.DigChampsBackground = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        this.DigChampsP1 = this.physics.add.sprite(game.config.width /7, game.config.height /2 - borderUISize - borderPadding, 'shovel').setOrigin(0.5, 0);
        this.p1Tooth.setScale(1.6);

         //Set up other properties for the player
        this.DigChampsP1.setCollideWorldBounds(true);
        this.DigChampsP1.setBounce(0.5);
        this.DigChampsP1.setImmovable();
        this.DigChampsP1.setMaxVelocity(0, 600);
        this.DigChampsP1.setDragX(200);
        this.DigChampsP1.setDragY(200);

    }//End of create
        

    update(){
        this.DigChampsP1.update();

    }//End of update


}