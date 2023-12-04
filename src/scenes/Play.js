class Play extends Phaser.Scene{
    constructor() {
        super('playScene');
    }

    preload() {
        //Sprites and backgrounds
        this.load.image('background', './assets/DigChampsBackgroundV2.png');
        this.load.image('shovel', './assets/DigChampsP1.png');
        this.load.image('snail', './assets/Snail.png');
        //this.load.image('emptyspace', './assets/emptyspace.png');
        this.load.image('ground', './assets/DCGroundCollision.png');
        this.load.image('starttext', './assets/P1StartText.png');
       
       //Sprite sheet
       this.load.spritesheet('walk', './assets/DigChampsP1Walk.png', {frameWidth: 300, frameHeight: 300, startFrame: 0, endFrame: 3});
       /* this.load.path = './assets/'
        this.load.spritesheet('walk', 'DigChampsP1Walk.png', {
            frameWidth: 16,
            frameHeight: 16
        })
*/
    }//End of preload

        // Define a function to check for collisions
        checkCollision(object1, object2) {
        return Phaser.Geom.Intersects.RectangleToRectangle(object1.getBounds(), object2.getBounds());
    }

    create() {
            //Background
            this.DigChampsBackgroundV2 = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
            //this.backgroundSpeed = 4;

            // Set the scale to fit the bounding box
            this.DigChampsBackgroundV2.setScale(game.config.width / this.DigChampsBackgroundV2.width, game.config.height / this.DigChampsBackgroundV2.height);
        
            this.physics.world.setBounds(0, 0, game.config.width, game.config.height);

            //Empty space for ground collision, currently under the actual ground
            this.DCGroundCollision = this.add.tileSprite(0, 0, 640, 400, 'ground').setOrigin(0, 0);
    
            //Create Player
            this.DigChampsP1 = this.physics.add.sprite(game.config.width / 7, game.config.height / 1.9 - borderUISize - borderPadding, 'shovel').setOrigin(0.5, 0);
            this.DigChampsP1.setScale(0.8);

            // set the boundaries of our game world
            this.physics.world.bounds.width = this.DCGroundCollision.width;
            this.physics.world.bounds.height = this.DCGroundCollision.height;
            // Add a collider between player and ground
            this.physics.add.collider(this.DigChampsP1, this.DCGroundCollision); 

            //Create enemy
            this.Snail = this.physics.add.sprite(game.config.width / 1.5, game.config.height / 1.58 - borderUISize - borderPadding, 'snail').setOrigin(0.5, 0);
            this.Snail.setScale(0.8);

            // Add a collider between enemy and ground
            this.physics.add.collider(this.Snail, this.DCGroundCollision); 


            // Add Start Text
        /*this.P1StartText = this.add.P1StartText(game.config.width / 2, game.config.height / 2, 'starttext');
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
*/

        //Set up other properties for the player
        this.DigChampsP1.setCollideWorldBounds(true);
        this.DigChampsP1.setBounce(0.5);
        this.DigChampsP1.setImmovable();
        this.DigChampsP1.setMaxVelocity(0, 600);
        this.DigChampsP1.setDragX(200);
        this.DigChampsP1.setDragY(200);

        
    // Create colliders between the player, food and borders
        this.physics.add.collider(this.DigChampsP1, this.Snail, this.handleCollision, null, this);
        this.physics.add.collider(this.DigChampsP1, this.DCGroundCollision, this.handleCollision, null, this);


        
    // Randomly spawn enemies on the right side
    /*this.Snail = new Snail(
        this,
        game.config.width + borderUISize * 6,
        Phaser.Math.Between(this.minY, this.maxY),
        'snail',
        0,
        this.minY,
        this.maxY
      ).setOrigin(0, 0);
*/
        //Define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //Initialize the score
        this.p1Score = 0;

        //Display score
        let scoreConfig = {
            fontFamily: 'Comic Sans',
            fontSize: '30px',
            color: '#39FF14',
            align: 'left',
            fixedWidth: 200
            }

            this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // Create walking animation
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('walk', {start: 0, end: 3}),
            frameRate: 8,
            repeat: -1,
        });

        // Game Over flag
        this.gameOver = false;
/*
    //camera
    this.cameras.main.setBounds(0, 0, game.config.width, game.config.height);
    this.cameras.main.startFollow(this.DigChampsP1, true, 0.25, 0.25);
    this.physics.world.setBounds(0, 0, game.config.width, game.config.height);
*/
    }//End of create
        

    update(){
        

        /*
    // Check for collisions between player and snail
    if (this.checkCollision(this.DigChampsP1, this.Snail)) {
    
    //Play death animation
    this.sound.play('hitHurt', { volume: 0.2 }); 
    this.sound.play('gameover', { volume: 0.2 }); 
    this.DigChampsP1.destroy();
    this.DigChampsP1 = this.physics.add.sprite(this.DigChampsP1.x, this.DigChampsP1.y, 'toothdeath').setOrigin(0.5, 0);
    this.DigChampsP1.setScale(1.6);
    
    this.backgroundMusic.stop();
    }//end of if statement
        
    // Jumping logic
    if (Phaser.Input.Keyboard.JustDown(keyUP) && this.DigChampsP1.body.onFloor()) {
        this.DigChampsP1.setVelocityY(-500);
    }*/
    // Play walking animation when moving left
    if (keyLEFT.isDown && !this.checkCollision(this.DigChampsP1, this.DCGroundCollision)) {
        this.DigChampsP1.setVelocityX(-300);
        

    } 
    // Play walking animation when moving right
    else if (keyRIGHT.isDown && !this.checkCollision(this.DigChampsP1, this.DCGroundCollision)) {
        this.DigChampsP1.setVelocityX(300);
        
    } 
    // Stop the player sprite if neither LEFT nor RIGHT key is pressed
    else {
        this.DigChampsP1.setVelocityX(0);
        this.DigChampsP1.anims.stop('walk');
        this.DigChampsP1.setFrame(0); // Set the sprite frame to the first frame
    }

        this.DigChampsP1.update();
        this.Snail.update();

    
    }//End of update


}//End of class