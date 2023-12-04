class Play extends Phaser.Scene{
    constructor() {
        super('playScene');
    }

    preload() {
        //Sprites and backgrounds
        this.load.image('background', './assets/DigChampsBackgroundV2.png');
        this.load.image('shovel', './assets/DigChampsP1.png');
        this.load.image('snail', './assets/Snail.png');
        this.load.image('emptyspace', './assets/emptyspace.png');
        this.load.image('starttext', './assets/P1StartText.png');
       
       //Sprite sheet
        this.load.path = './assets/'
        this.load.spritesheet('walk', 'DigChampsP1Walk.png', {
            frameWidth: 16,
            frameHeight: 16
        })

    }//End of preload

        // Define a function to check for collisions
        checkCollision(object1, object2) {
        return Phaser.Geom.Intersects.RectangleToRectangle(object1.getBounds(), object2.getBounds());
    }

    create() {
            //Background
            this.DigChampsBackgroundV2 = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
            this.backgroundSpeed = 4;

            // Set the scale to fit the bounding box
            this.DigChampsBackgroundV2.setScale(game.config.width / this.DigChampsBackgroundV2.width, game.config.height / this.DigChampsBackgroundV2.height);
        
            this.physics.world.setBounds(0, 0, game.config.width, game.config.height);

            //Empty space for ground collision
            this.emptyspaceBottom = this.add.tileSprite(0, 376, 640, 64, 'emptyspace').setOrigin(0, 0);
    
            //Create Player
            this.DigChampsP1 = this.physics.add.sprite(game.config.width / 7, game.config.height / 1.9 - borderUISize - borderPadding, 'shovel').setOrigin(0.5, 0);
            this.DigChampsP1.setScale(0.8);
        
            this.physics.add.collider(this.DigChampsP1, this.emptyspaceBottom); // Add a collider between player and ground

            //Create enemy
            this.Snail = this.physics.add.sprite(game.config.width / 7, game.config.height / 1.9 - borderUISize - borderPadding, 'snail').setOrigin(0.5, 0);
            this.Snail.setScale(0.8);


            // Add Start Text
        this.P1StartText = this.add.P1StartText(game.config.width / 2, game.config.height / 2, 'starttext');
        this.P1StartText.setAlpha(1); // Set initial alpha to fully visible

        // Create a tween to fade out the intro image
        this.tweens.add({
            targets: this.P1StartText,
            alpha: 0,
            duration: 2000, // Adjust the duration as needed
            ease: 'Linear',
            onComplete: function () {
                // Remove the intro image when the fade-out is complete
                this.P1StartText.destroy();
            },
            callbackScope: this
        });

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

        // Create walking animation
        this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('walk', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1 // -1 means loop indefinitely
    });  

    //camera
    this.cameras.main.setBounds(0, 0, game.config.width, game.config.height);
    this.cameras.main.startFollow(this.DigChampsP1, true, 0.25, 0.25);
    this.physics.world.setBounds(0, 0, game.config.width, game.config.height);

    }//End of create
        

    update(){
        this.DigChampsP1.update();
        this.Snail.update();

        
    // Play walking animation when moving left
    if (keyLEFT.isDown && !this.checkCollision(this.DigChampsP1, this.emptyspaceBottom)) {
        this.DigChampsP1.setVelocityX(-300);
        this.DigChampsP1.anims.play('walk', true);
    } 
    // Play walking animation when moving right
    else if (keyRIGHT.isDown && !this.checkCollision(this.DigChampsP1, this.emptyspaceBottom)) {
        this.DigChampsP1.setVelocityX(300);
        this.DigChampsP1.anims.play('walk', true);

         // Update the background position to create the loop
         //this.DigChampsBackground.tilePositionX += 3; // Adjust the value based on your needs

        // Check if the background has scrolled beyond a certain point to reset it
        if (this.DigChampsBackground.tilePositionX > someThresholdValue) {
            this.DigChampsBackground.tilePositionX = 0;
        }
    } 
    // Stop the player sprite if neither LEFT nor RIGHT key is pressed
    else {
        this.DigChampsP1.setVelocityX(0);
        this.DigChampsP1.anims.stop('walk');
        this.DigChampsP1.setFrame(0); // Set the sprite frame to the first frame
    }

    // Jumping logic
    if (Phaser.Input.Keyboard.JustDown(keyUP) && this.DigChampsP1.body.onFloor()) {
        this.DigChampsP1.setVelocityY(-500);
    }
    }//End of update


}//End of class