class DigChampsLevel1 extends Phaser.Scene{
    constructor() {
        super('digchampslevel1Scene');
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('shovel', 'DigChampsP1Walk.png', {
            frameWidth: 16,
            frameHeight: 16
        })

        this.load.image('digchampsbackgroundv2Image', 'DigChampsBackgroundV2.png');
        this.load.tilemapTiledJSON('digchampslevel1JSON', 'DigChampsLevel1.json')


        /*
        //Sprites and backgrounds
        this.load.image('background', './assets/DigChampsBackgroundV2.png');
        this.load.image('shovel', './assets/DigChampsP1.png');
        this.load.image('snail', './assets/Snail.png');
        //this.load.image('emptyspace', './assets/emptyspace.png');
        this.load.image('ground', './assets/DCGroundCollision.png');
        this.load.image('starttext', './assets/P1StartText.png');
       */
       //Sprite sheet
       //this.load.spritesheet('walk', './assets/DigChampsP1Walk.png', {frameWidth: 300, frameHeight: 300, startFrame: 0, endFrame: 3});
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

        //velocity constant
        this.VEL = 100;

        //tilemap info
        const map = this.add.tilemap('digchampslevel1JSON');
        const tileset = map.addTileSetImage('DigChampsBackgroundV2', 'digchampsbackgroundv2Image' );

        const bgLayer = map.createLayer('Background', tileset, 0, 0);
        const groundLayer = map.createLayer('Ground', tileset, 0, 0);


        /*
            //Background
            this.DigChampsBackgroundV2 = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

            // Set the scale to fit the bounding box
            this.DigChampsBackgroundV2.setScale(game.config.width / this.DigChampsBackgroundV2.width, game.config.height / this.DigChampsBackgroundV2.height);
        
            //this.physics.world.setBounds(0, 0, game.config.width, game.config.height);

            //Empty space for ground collision, currently under the actual ground
            this.DCGroundCollision = this.add.tileSprite(0, 0, 640, 360, 'ground').setOrigin(0, 0); //360 is the height
    
            //Create Player
            this.DigChampsP1 = this.physics.add.sprite(game.config.width / 7, game.config.height / 1.9 - borderUISize - borderPadding, 'shovel').setOrigin(0.5, 0);
            //this.DigChampsP1.setBounce(0.2); // our player will bounce from items
            this.DigChampsP1.setScale(0.8);
            // Add a collider between player and ground
            this.physics.add.collider(this.DigChampsP1, this.DCGroundCollision); 
            this.physics.world.enable(this.DigChampsP1);

            // Set the boundaries of our game world
            //this.physics.world.setBounds = (0, 0, this.DCGroundCollision.width, this.DCGroundCollision.width.height);
            this.physics.world.bounds.width = this.DCGroundCollision.width;
           this.physics.world.bounds.height = this.DCGroundCollision.height;

            

            //Create enemy
            this.Snail = this.physics.add.sprite(game.config.width / 1.5, game.config.height / 1.58 - borderUISize - borderPadding, 'snail').setOrigin(0.5, 0);
            this.Snail.setScale(0.8);
            // Add a collider between enemy and ground
            this.physics.add.collider(this.Snail, this.DCGroundCollision); 

            // Add Player 1 Start Text
        this.P1StartText = this.add.sprite(game.config.width / 2, game.config.height / 2, 'starttext');
        this.P1StartText.setAlpha(1); // Set initial alpha to fully visible

        // Create a tween to fade out the intro image
        this.tweens.add({
            targets: this.P1StartText,
            alpha: 1,
            duration: 2000, // Adjust the duration as needed
            ease: 'Linear',
            onComplete: function () {
                // Remove the text image when the fade-out is complete
                this.P1StartText.destroy();
            },
            callbackScope: this
        });
        //End of Start text

        //Set up other properties for the player
        this.DigChampsP1.setCollideWorldBounds(true);
        //this.DigChampsP1.setBounce(0.5);
        this.DigChampsP1.setImmovable();
        this.DigChampsP1.setMaxVelocity(0, 600);
        this.DigChampsP1.setDragX(200);
        this.DigChampsP1.setDragY(200);

        
    // Create colliders between the player
        this.physics.add.collider(this.DigChampsP1, this.Snail, this.handleCollision, null, this);
        this.physics.add.collider(this.DigChampsP1, this.DCGroundCollision, this.handleCollision, null, this);

    // Randomly spawn enemies on the right side
    this.Snail = new Snail(
        this,
        game.config.width + borderUISize * 6,
        Phaser.Math.Between(this.minY, this.maxY),
        'snail',
        0,
        this.minY,
        this.maxY
      ).setOrigin(0, 0);

        //Define keys
        /*keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
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

    this.cursors = this.input.keyboard.createCursorKeys();
*/
    }//End of create method
        

    update(){
        /*
        console.log(this.cursors.left.isDown, this.cursors.right.isDown);

    if (this.cursors.left.isDown) { // if the left arrow key is down
        console.log('Setting velocityX:', -200);
        this.DigChampsP1.setVelocityX(-200); // move left
    }
    else if (this.cursors.right.isDown){ // if the right arrow key is down
        console.log('Setting velocityX:', 200);
        this.DigChampsP1.setVelocityX(200); // move right
    }
    else {
        // Reset velocity when no key is pressed
        this.DigChampsP1.setVelocityX(0);
    }

    if ((this.cursors.space.isDown || this.cursors.up.isDown && this.DigChampsP1.body.onFloor()))
    {
        this.DigChampsP1.setVelocityY(-300); // jump up
    }

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
    
        
        this.DigChampsP1.update();
        this.Snail.update();

    */
    }//End of update


}//End of class