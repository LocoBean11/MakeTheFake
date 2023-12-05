class DigChampsLevel1 extends Phaser.Scene{
    constructor() {
        super('digchampslevel1Scene');
    }

    preload() {
        //this.load.image('Player1', './assets/DigChampsP1Single.png');
        this.load.path = './assets/';
        this.load.spritesheet('Player1', 'DigChampsP1Single.png', {
            frameWidth: 90,
            frameHeight: 90
        })
        //Set the scale

        this.load.spritesheet('Snail', 'Snail.png', {
            frameWidth: 200,
            frameHeight: 200
        })
        //Set the scale
        
        this.load.image('DigChampsBGImage', 'DigChampsBG.png');
        this.load.tilemapTiledJSON('DigChampsLevel1JSON', 'DigChampsLevel1.json');
        //this.load.image('Snail', 'Snail.png');

        }//End of preload

        //this.load.image('snail', './assets/Snail.png');

        //Sprites and backgrounds
        //this.load.image('background', './assets/DigChampsBackgroundV2.png');
       // this.load.image('shovel', './assets/DigChampsP1.png');
        //this.load.image('emptyspace', './assets/emptyspace.png');
        //this.load.image('ground', './assets/DCGroundCollision.png');
        //this.load.image('starttext', './assets/P1StartText.png');
       
       //Sprite sheet
       //this.load.spritesheet('walk', './assets/DigChampsP1Walk.png', {frameWidth: 300, frameHeight: 300, startFrame: 0, endFrame: 3});
       /*
        // Define a function to check for collisions
        checkCollision(object1, object2) {
        return Phaser.Geom.Intersects.RectangleToRectangle(object1.getBounds(), object2.getBounds());
    }
    */
    create() {

        //Velocity constant
        this.VEL = 100;

        //Tilemap info
        const map = this.add.tilemap('DigChampsLevel1JSON');
        const tileset = map.addTilesetImage('DigChampsBG', 'DigChampsBGImage');

        const groundLayer = map.createLayer('Ground', tileset, 0, 0);
        const bgLayer = map.createLayer('Background', tileset, 0, 0);
        
        //Add Player
        //this.DigChampsP1Single = this.physics.add.sprite(DigChampsP1Single.x, DigChampsP1Single.y, 'Player1', 0); 
        this.DigChampsP1Single = this.physics.add.sprite(100, 250, 'Player1', 0);
        this.DigChampsP1Single.setCollideWorldBounds(true);
        //this.DigChampsP1Single.body.setCollideWorldBounds(true);
        this.DigChampsP1Single.setScale(1.6);

        // Set player origin to the center
        //this.DigChampsP1Single.setOrigin(0.5, 0.5);

        // Set player physics body size
       // this.DigChampsP1Single.body.setSize(90, 90); // Replace width and height with appropriate values

         //Set up other properties for the player
        //this.DigChampsP1Single.setCollideWorldBounds(true);
        this.physics.world.enable(this.DigChampsP1Single);
        // Set player physics body size
        this.DigChampsP1Single.body.setSize(90, 90);
         // Set player origin to the center
         this.DigChampsP1Single.setOrigin(0.5, 0.5);
        this.DigChampsP1Single.setImmovable();
        this.DigChampsP1Single.setMaxVelocity(600, 600);
       this.DigChampsP1Single.setDragX(200);
       this.DigChampsP1Single.setDragY(200);

        // Create walking animation
        this.anims.create({
            key: 'walk',
            frameRate: 8,
            repeat: 1,
            frames: this.anims.generateFrameNumbers('Player1', {start: 0, end: 0}),
        });

        //Add snail
        this.Snail = this.physics.add.sprite(500, 295, 'Snail', 0);
        this.Snail.body.setCollideWorldBounds(true);
        this.Snail.setScale(0.9);

        this.physics.world.enable(this.Snail);
        // Set player physics body size
        this.Snail.body.setSize(165, 160);
         // Set player origin to the center
         this.Snail.setOrigin(0.5, 0.5);
        this.Snail.setImmovable();
        this.Snail.setMaxVelocity(600, 600);
       this.Snail.setDragX(200);
       this.Snail.setDragY(200);

        this.cursors = this.input.keyboard.createCursorKeys();

        //this.physics.world.debugGraphic.setAlpha(0.75);
       // this.physics.world.debugBodyColor = 0x00ff00; // Set debug body color to green
       // this.physics.world.drawDebug = true;
        
        //camera
        //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightPixels);
       // this.cameras.main.startFollow(this.DigChampsP1Single, true, 0.25, 0.25);
        //this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightPixels);

        //Collision
        groundLayer.setCollisionByProperty({
            Collides: true
        })
        
        this.physics.add.collider(groundLayer, this.DigChampsP1Single);
        this.physics.world.enable(this.DigChampsP1Single);
        this.physics.add.collider(groundLayer, this.Snail);
        this.physics.world.enable(this.Snail);
        groundLayer.setCollisionByExclusion([-1]);

         // set the boundaries of our game world
        this.physics.world.bounds.width = groundLayer.width;
        this.physics.world.bounds.height = groundLayer.height;

        console.log('groundLayer:', groundLayer);
        console.log('Player position:', this.DigChampsP1Single.x, this.DigChampsP1Single.y);
        
            //Background
           // this.DigChampsBackgroundV2 = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

            // Set the scale to fit the bounding box
          //  this.DigChampsBackgroundV2.setScale(game.config.width / this.DigChampsBackgroundV2.width, game.config.height / this.DigChampsBackgroundV2.height);
        
            //this.physics.world.setBounds(0, 0, game.config.width, game.config.height);

            //Empty space for ground collision, currently under the actual ground
           // this.DCGroundCollision = this.add.tileSprite(0, 0, 640, 360, 'ground').setOrigin(0, 0); //360 is the height
    
            
            // Add a collider between player and ground
           // this.physics.add.collider(this.DigChampsP1, this.DCGroundCollision); 
           // this.physics.world.enable(this.DigChampsP1);

            // Set the boundaries of our game world
            //this.physics.world.setBounds = (0, 0, this.DCGroundCollision.width, this.DCGroundCollision.width.height);
           // this.physics.world.bounds.width = this.DCGroundCollision.width;
          // this.physics.world.bounds.height = this.DCGroundCollision.height;

            //Create enemy
           // this.Snail = this.physics.add.sprite(game.config.width / 1.5, game.config.height / 1.58 - borderUISize - borderPadding, 'snail').setOrigin(0.5, 0);
          //  this.Snail.setScale(0.8);
            // Add a collider between enemy and ground
          //  this.physics.add.collider(this.Snail, this.DCGroundCollision); 

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

    // Create colliders between the player
       // this.physics.add.collider(this.DigChampsP1, this.Snail, this.handleCollision, null, this);
       // this.physics.add.collider(this.DigChampsP1, this.DCGroundCollision, this.handleCollision, null, this);
/*
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
*/
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

            //this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // Game Over flag
        this.gameOver = false;

    this.cursors = this.input.keyboard.createCursorKeys();

    }//End of create method
        

    update(){
        
        //this.direction = new Phaser.Math.Vector2(0)
        console.log(this.cursors.left.isDown, this.cursors.right.isDown);
        const speed = 400;

    if (this.cursors.left.isDown) {
        this.DigChampsP1Single.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
        this.DigChampsP1Single.setVelocityX(speed);
    } else {
        this.DigChampsP1Single.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.DigChampsP1Single.body.onFloor()) {
        this.DigChampsP1Single.setVelocityY(-300);
    }

/*
    if ((this.cursors.left.isDown)) { // if the left arrow key is down
        console.log('Setting velocityX:', -300);
        //this.DigChampsP1Single.body.setVelocityX(-200); // move left
        //this.direction.x = -1;
        this.DigChampsP1Single.setVelocityX(-300); // move left
    }
    else if ((this.cursors.right.isDown)) { // if the right arrow key is down
        console.log('Setting velocityX:', 300);
        //this.DigChampsP1Single.body.setVelocityX(200); // move right
        //this.direction.x = 1;
        this.DigChampsP1Single.setVelocityX(300); // move right
    }

    //if(!this.cursors.left.isDown && !this.cursors.right.isDown) {
    //    this.DigChampsP1Single.setVelocityX(0);
    //}

    if ((this.cursors.up.isDown && this.DigChampsP1Single.body.onFloor()))
    {
        this.DigChampsP1Single.setVelocityY(-300); // jump up
       
    }
    */
        //this.direction.normalize();
        //this.DigChampsP1Single.setVelocityX(this.VEL * this.direction.x);

        //this.DigChampsP1Single.update();
        //this.Snail.update();
    }//End of update

        /*
        
    // Check for collisions between player and snail
    //if (this.checkCollision(this.DigChampsP1, this.Snail)) {
    
    //Play death animation
    //this.sound.play('hitHurt', { volume: 0.2 }); 
    //this.sound.play('gameover', { volume: 0.2 }); 
    //this.DigChampsP1.destroy();
    //this.DigChampsP1 = this.physics.add.sprite(this.DigChampsP1.x, this.DigChampsP1.y, 'toothdeath').setOrigin(0.5, 0);
   // this.DigChampsP1.setScale(1.6);
    
    //this.backgroundMusic.stop();
    //}//end of if statement
    */


}//End of class