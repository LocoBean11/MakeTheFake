class DigChampsLevel1 extends Phaser.Scene{
    constructor() {
        super("digchampslevel1Scene");
    }

    preload() {
        //this.load.image('Player1', './assets/DigChampsP1Single.png');
        this.load.path = './assets/';
        this.load.spritesheet('Player1', 'DigChampsP1V2.png', {
            frameWidth: 84,
            frameHeight: 90
        })

        this.load.spritesheet('Snail', 'Snail.png', {
            frameWidth: 200,
            frameHeight: 200
        })
        
        this.load.image('DigChampsBGImage', 'DigChampsBG.png');
        this.load.tilemapTiledJSON('DigChampsLevel1JSON', 'DigChampsLevel1.json');

        this.load.spritesheet('starttext', 'P1StartText.png', {
            frameWidth: 150,
            frameHeight: 101
        })
        
        }//End of preload

         // Define a collision callback function
        // handleCollision(Snail) {
         //   this.resetSnail(Snail);
       // }

         // Define a function to check for collisions
        checkCollision(object1, object2) {
        return Phaser.Geom.Intersects.RectangleToRectangle(object1.getBounds(), object2.getBounds());
    }
       
    create() {
        
        //Velocity constant
        this.VEL = 100;

        //Tilemap info
        const map = this.add.tilemap('DigChampsLevel1JSON');
        const tileset = map.addTilesetImage('DigChampsBG', 'DigChampsBGImage');

        const groundLayer = map.createLayer('Ground', tileset, 0, 0);
        const bgLayer = map.createLayer('Background', tileset, 0, 0);

        // Initialize variables
        this.backgroundWidth = bgLayer.width;

        groundLayer.setScrollFactor(0); // Fix the background layer

        //this.DigChampsBG = this.add.tilesprite(320, 240, 640, 480);
        
        //Add Player
        //this.DigChampsP1Single = this.physics.add.sprite(DigChampsP1Single.x, DigChampsP1Single.y, 'Player1', 0); 
        this.DigChampsP1V2 = this.physics.add.sprite(100, 250, 'Player1', 0);
        //this.DigChampsP1V2.setCollideWorldBounds(true);
        //this.DigChampsP1V2.body.setCollideWorldBounds(true);
        this.DigChampsP1V2.setScale(1.7);

         //Set up other properties for the player

        this.physics.world.enable(this.DigChampsP1V2);
        // Set player physics body size in pixels
        this.DigChampsP1V2.body.setSize(84, 90); 
         // Set player origin to the center
         this.DigChampsP1V2.setOrigin(0.5, 0.5);
        this.DigChampsP1V2.setImmovable();
        this.DigChampsP1V2.setMaxVelocity(600, 600);
       //this.DigChampsP1V2.setDragX(200);
       this.DigChampsP1V2.setDragY(200);

        // Create walking animation
        this.anims.create({
            key: 'Player1',
            frameRate: 15,

            frames: this.anims.generateFrameNumbers('Player1', {
            start: 1,
            end: 2,
        }),
        repeat: 1
        });
        
        //Add snail
        this.Snail = this.physics.add.sprite(650, 295, 'Snail', 0);
        this.Snail.body.setCollideWorldBounds(true);
        this.Snail.setScale(0.9);

        // Set player physics body size
        this.Snail.body.setSize(167, 121);
         // Set player origin to the center
         this.Snail.setOrigin(0.5, 0.5);
        this.Snail.setImmovable();
        this.Snail.setMaxVelocity(600, 600);
       this.Snail.setDragX(200);
       this.Snail.setDragY(200);

       //Collision between Player and Snail
       this.physics.world.enable([this.DigChampsP1V2, this.Snail]);

        // Set up collision between player and snail
        this.physics.add.collider(this.DigChampsP1V2, this.Snail, this.handleCollision, null, this);

        //Create cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //camera
        //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightPixels);
        //this.cameras.main.startFollow(this.DigChampsP1Single, true, 0.25, 0.25);
        //this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightPixels);

        //Collision between player, enemies and ground
        groundLayer.setCollisionByProperty({
            Collides: true
        })
        
        this.physics.add.collider(groundLayer, this.DigChampsP1V2);
        this.physics.world.enable(this.DigChampsP1V2);
        this.physics.add.collider(groundLayer, this.Snail);
        this.physics.world.enable(this.Snail);
        //groundLayer.setCollisionByExclusion([-1]); //Turns ground collison on and off

         // Set the boundaries of our game world
        this.physics.world.bounds.width = groundLayer.width;
        this.physics.world.bounds.height = groundLayer.height;

        // Store the tilemap for later use
        this.tilemap = map;

        // Add Player 1 Start Text
        this.P1StartText = this.add.sprite(370, 240, 'starttext');
        this.P1StartText.setAlpha(1); // Set initial alpha to fully visible
        this.P1StartText.setScale(1);

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
        //End of Player 1 Start text
                    
        //Initialize the score
        this.p1Score = 0;

        //Display score
        let scoreConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '30px',
            color: '#39FF14',
            align: 'left',
            fixedWidth: 200
            }

          //  this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // Game Over flag
        this.gameOver = false;

        this.DigChampsP1V2Alive = true;

    this.cursors = this.input.keyboard.createCursorKeys();

     // Add the scrollBackground function
    // this.scrollBackground = function (speed) {
      //  this.cameras.main.scrollX += speed * this.game.loop.delta / 1000;

       // if (this.cameras.main.scrollX > this.backgroundWidth) {
            this.cameras.main.scrollX = 0;
       // }
   // }

    // set bounds so the camera won't go outside the game world
    //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    //this.cameras.main.startFollow(this.DigChampsP1Single);

    }//End of create method
        
    update(){
        
         // Set the background position based on the player's position
        //this.groundLayer.x = this.DigChampsP1V2.x / 4; // Adjust the division factor as needed

        //this.direction = new Phaser.Math.Vector2(0)
        //console.log(this.cursors.left.isDown, this.cursors.right.isDown);
        const speed = 430;
    if(this.DigChampsP1V2Alive){
    if (this.cursors.left.isDown) {
        this.DigChampsP1V2.anims.play('Player1');
        this.DigChampsP1V2.setVelocityX(-speed);
        //this.scrollBackground(-speed);
        
         // Scroll the background left
         this.cameras.main.scrollX -= speed * this.game.loop.delta / 1000;

          // Check if the camera reached the beginning of the background
      //  if (this.cameras.main.scrollX < 0) {
            // Reset the camera to create a looping effect
           //this.cameras.main.scrollX = this.backgroundWidth;
      //  }

    } else if (this.cursors.right.isDown) {
        this.DigChampsP1V2.anims.play('Player1');
        this.DigChampsP1V2.setVelocityX(speed);
        //this.scrollBackground(speed);
        // Scroll the background right
        this.cameras.main.scrollX += speed * this.game.loop.delta / 1000;

        // Check if the camera reached the end of the background
       // if (this.cameras.main.scrollX > this.backgroundWidth) {
            // Reset the camera to create a looping effect
            //this.cameras.main.scrollX = 0;
     //   }
        
    } else {
        this.DigChampsP1V2.setVelocityX(0);
        //this.DigChampsP1V2.anims.stop('Player1');
    }

    if (this.cursors.up.isDown && this.DigChampsP1V2.body.onFloor()) {
        this.DigChampsP1V2.setVelocityY(-500);
    }
     // Scroll the background based on player movement
    // this.scrollBackground(this.DigChampsP1V2.body.velocity.x);
    
    // Scroll the background based on player movement
    //this.cameras.main.scrollX += this.DigChampsP1V2.body.velocity.x;

    // Basic collision check
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.DigChampsP1V2.getBounds(), this.Snail.getBounds())) {
        // Handle collision
        // For example, you might want to play a sound or trigger some other action
        // this.sound.play('hitHurt', { volume: 0.2 });
        // this.DigChampsP1Single.destroy();
        // this.Snail.destroy();
    }

    // Snail movement
    this.Snail.x -= 0.01;

        // Update the snail's position and scroll with the camera
        this.Snail.x -= this.DigChampsP1V2.body.velocity.x * this.game.loop.delta / 1000;

        // Reset the snail's position if it goes off-screen
        if (this.Snail.x < -this.Snail.width) {
            this.Snail.x = this.sys.game.config.width + this.Snail.width;
        }
    
        //this.direction.normalize();
        //this.DigChampsP1Single.setVelocityX(this.VEL * this.direction.x);
        //this.DigChampsP1Single.update();
        //this.Snail.update();
}
    }//End of update
   // scrollBackground(speed) {
        // Scroll the background
     //   this.cameras.main.scrollX += speed * this.game.loop.delta / 1000;
    
        // Check if the camera reached the end of the background
       // if (this.cameras.main.scrollX > this.backgroundWidth) {
            // Reset the camera to create a looping effect
         //   this.cameras.main.scrollX = 0;
        //}
   // }
   // handleBackgroundLoop() {
      //  if (this.cameras.main.scrollX < 0) {
      //      this.cameras.main.scrollX = this.backgroundWidth;
       // } else if (this.cameras.main.scrollX > this.backgroundWidth) {
       //     this.cameras.main.scrollX = 0;
       // }
   // }
    // Callback function for collision handling
    handleCollision(DigChampsP1V2, Snail) {
        //if (this.DigChampsP1Single.checkCollision(this.DigChampsP1, this.Snail)) {
        this.DigChampsP1V2Alive = false;
            //Play death animation
            //this.sound.play('hitHurt', { volume: 0.2 }); 
            //this.sound.play('gameover', { volume: 0.2 }); 
            this.DigChampsP1V2.destroy();
        
    }//End of handle collision

}//End of class