class Play extends Phaser.Scene{
    constructor() {
        super('playScene');
    }

    preload() {
        //Sprites and backgrounds
        this.load.image('background', './assets/DigChampsBackground.png');
        this.load.image('shovel', './assets/DigChampsP1.png');
        this.load.image('emptyspace', './assets/emptyspace.png');

    }//End of preload

        // Define a function to check for collisions
        checkCollision(object1, object2) {
        return Phaser.Geom.Intersects.RectangleToRectangle(object1.getBounds(), object2.getBounds());
    }

    create() {
        this.DigChampsBackground = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        
        // Set the scale to fit the bounding box
        this.DigChampsBackground.setScale(game.config.width / this.DigChampsBackground.width, game.config.height / this.DigChampsBackground.height);

        this.DigChampsP1 = this.physics.add.sprite(game.config.width /7, game.config.height /2 - borderUISize - borderPadding, 'shovel').setOrigin(0.5, 0);
        this.DigChampsP1.setScale(0.8);

        this.emptyspaceBottom = this.add.tileSprite(0, 376, 640, 64, 'emptyspace').setOrigin(0, 0);

        //Define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //Initialize the score
        this.p1Score = 0;

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

        if (Phaser.Input.Keyboard.JustDown(keyUP) && this.DigChampsP1.body.onFloor()) {
            // Check if the UP key is just pressed and the player is on the floor
            this.DigChampsP1.setVelocityY(-500); // Set a negative velocity for upward movement
        }
    
        if (keyLEFT.isDown && !this.checkCollision(this.DigChampsP1, this.emptyspaceBottom)) {
            // Move the player sprite left
            this.DigChampsP1.setVelocityX(-300);
        } else if (keyRIGHT.isDown && !this.checkCollision(this.DigChampsP1, this.emptyspaceBottom)) {
            // Move the player sprite right
            this.DigChampsP1.setVelocityX(300);
        } else {
            // Stop the player sprite if neither LEFT nor RIGHT key is pressed
            this.DigChampsP1.setVelocityX(0);
        }
    

    }//End of update


}//End of class