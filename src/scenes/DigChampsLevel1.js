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

        this.load.spritesheet('Worm', 'Worm.png', {
            frameWidth: 245,
            frameHeight: 282
        })

        this.load.spritesheet('Demon', 'DemonSS.png', {
            frameWidth: 110,
            frameHeight: 156
        })

        this.load.spritesheet('LifeIcon', 'P1LifeIcon.png', {
           frameWidth: 108,
           frameHeight: 123
        })

        this.load.spritesheet('starttext', 'P1StartText.png', {
            frameWidth: 150,
            frameHeight: 101
        })
        
        this.load.image('DigChampsBGImage', 'DigChampsBG.png');
        this.load.tilemapTiledJSON('DigChampsLevel1JSON', 'DigChampsLevel1.json');

        //this.load.image('P1LifeIconImage', 'P1LifeIcon.png');
        //this.load.tilemapTiledJSON('P1LifeIconTiledJSON', 'P1LifeIconTiled.json');

         // Load audio based on object properties in the tilemap
        this.load.path = './assets/audio/';
        this.load.audio('DigChampsBGM', 'DigChampsMusic.wav');

        }//End of preload

         // Define a function to check for collisions
        checkCollision(object1, object2) {
        return Phaser.Geom.Intersects.RectangleToRectangle(object1.getBounds(), object2.getBounds());
    }

    demonFollows () {
        this.physics.moveToObject(this.DemonSS, this.DigChampsP1V2, 3 00);

    }
    create() {
        
        //Velocity constant
        this.VEL = 100;

        //Sounds and looping BGM
        this.DigChampsMusic = this.sound.add('DigChampsBGM', { loop: true });

        //Tilemap info
        const map = this.add.tilemap('DigChampsLevel1JSON');
        const tileset = map.addTilesetImage('DigChampsBG', 'DigChampsBGImage');

       // const image = this.add.tilemap('P1LifeIconTiledJSON');
       // const tileimage = map.addTilesetImage('P1LifeIcon', 'P1LifeIconImage');

        const groundLayer = map.createLayer('Ground', tileset, 0, 0);
        const bgLayer = map.createLayer('Background', tileset, 0, 0);
        //const lifeLayer = map.createLayer('Layer1', tileset, 0, 0);
        
        // Initialize variables
        this.backgroundWidth = bgLayer.width;

        // Set the scroll factor for the background layer
        bgLayer.setScrollFactor(0);

        // set bounds so the camera won't go outside the game world

       // this.cameras.main.startFollow(this.DigChampsP1V2, true, 0, 0);
      // this.cameras.main.setScroll(0, 0);
       // this.cameras.main.setScrollFactor(0);
       // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); 
       // this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightPixels);

        // Initialize variables
        this.backgroundWidth = bgLayer.width;

        groundLayer.setScrollFactor(0); // Fix the background layer
        
        //Add Player
        //this.DigChampsP1Single = this.physics.add.sprite(DigChampsP1Single.x, DigChampsP1Single.y, 'Player1', 0); 
        this.DigChampsP1V2 = this.physics.add.sprite(100, 250, 'Player1', 0);
       // this.DigChampsP1V2.body.setCollideWorldBounds(true);
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
        
        //Add Snail enemy
        this.Snail = this.physics.add.sprite(650, 295, 'Snail', 0);
        this.Snail.body.setCollideWorldBounds(true);
        this.Snail.setScale(0.9);

        this.Snail.setGravityY(0);
        this.physics.world.enable(this.Snail);
        // Set snail physics body size
        this.Snail.body.setSize(167, 121);
         // Set snail origin to the center
         this.Snail.setOrigin(0.5, 0.5);
        this.Snail.setImmovable();
        this.Snail.setMaxVelocity(600, 0);
       //this.Snail.setDragX(200);
       //this.Snail.setDragY(200);

       //Collision between Player and Snail
       this.physics.world.enable([this.DigChampsP1V2, this.Snail]);

        // Set up collision between player and snail
        this.physics.add.collider(this.DigChampsP1V2, this.Snail, this.handleCollision, null, this);

        //Add Worm enemy
        this.Worm = this.physics.add.sprite(4000, 340, 'Worm', 0);
        //this.Worm.body.setCollideWorldBounds(true);
        this.Worm.setScale(0.9);

        this.physics.world.enable(this.Worm);
        // Set worm physics body size
        this.Worm.body.setSize(88, 60);
         // Set worm origin to the center
         this.Worm.setOrigin(0.5, 0.5);
        this.Worm.setImmovable(true);
        this.Worm.setMaxVelocity(600, 0);
       //this.Worm.setDragX(200);
       this.Worm.setDragY(200);

       //Collision between Player and Worm
       this.physics.world.enable([this.DigChampsP1V2, this.Worm]);

        // Set up collision between player and worm
        this.physics.add.collider(this.DigChampsP1V2, this.Worm, this.handleCollision, null, this);

        //Add Demon enemy
        this.DemonSS = this.physics.add.sprite(1000, 280, 'Demon', 100);
        //this.Demon.body.setCollideWorldBounds(true);
        this.DemonSS.setScale(0.9);
        //this.physics.moveToObject(this.DemonSS, this.DigChampsP1V2);

        this.physics.world.enable(this.DemonSS);
        // Set Demon physics body size
        this.DemonSS.body.setSize(105, 157);
         // Set Demon origin to the center
         this.DemonSS.setOrigin(0.5, 0.5);
        this.DemonSS.setImmovable(true);
        //this.DemonSS.setVelocityX(100, 0);
        this.DemonSS.setMaxVelocity(600, 0);
       //this.Demon.setDragX(200);
       //this.DemonSS.setDragY(200);

       //Collision between Player and Worm
       this.physics.world.enable([this.DigChampsP1V2, this.DemonSS]);

        // Set up collision between player and worm
        this.physics.add.collider(this.DigChampsP1V2, this.DemonSS, this.handleCollision, null, this);

        // Create walking animation
        this.anims.create({
            key: 'Demon',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('Demon', {
            start: 1,
            end: 2,
        }),
        repeat: -1
        });
        this.DemonSS.play('Demon');

        //Create cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //Collision between player, enemies and ground
        groundLayer.setCollisionByProperty({
            Collides: true
        })
        
        this.physics.add.collider(groundLayer, this.DigChampsP1V2);
        this.physics.world.enable(this.DigChampsP1V2);
        this.physics.add.collider(groundLayer, this.Snail);
        this.physics.world.enable(this.Snail);
        this.physics.add.collider(groundLayer, this.Worm);
        this.physics.world.enable(this.Worm);
        this.physics.add.collider(groundLayer, this.DemonSS);
        this.physics.world.enable(this.DemonSS);

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
            duration: 1000,
            ease: 'Linear',
            onComplete: function () {
                this.P1StartText.destroy();

                // Allow player movement after the Player 1 Start text disappears
            setTimeout(() => {
                this.allowPlayerMovement = true;
                }, 100);
            },
            callbackScope: this,
        });
        //End of Player 1 Start text

        //Player 1 Life Icon
        this.P1LifeIcon = this.add.sprite(50, 440, 'LifeIcon');
        //this.P1LifeIcon = this.add.sprite(this.groundLayer.width, this.groundLayer.height, 'LifeIcon');
        this.P1LifeIcon.setScale(0.5);
        //this.physics.world.enable(P1LifeIcon); // Enable physics for each life icon if needed
        //this.P1LifeIcon.setMaxVelocity(600, 0);

        this.P1LifeIcon = this.add.sprite(100, 435, 'LifeIcon');
        this.P1LifeIcon.setScale(0.5);

        // LifeIcon group
        this.lifeCounterIcons = this.add.group({
        key: 'LifeIcon',
        repeat: this.P1Lives - 3, // Set the number of initial lives
        setXY: { x: 50, y: game.config.height - 440 } // Adjust the spacing between life images
        });

        // Iterate over each child in the group to set the scroll factor
        this.lifeCounterIcons.children.iterate((P1LifeIcon) => {
            this.P1LifeIcon.moves(false);
            P1LifeIcon.setScrollFactor(0);
            P1LifeIcon.setDepth(1);
            this.physics.world.enable(P1LifeIcon); // Enable physics for each life icon if needed
        });

        // Example of updating life icons when a life is lost
        // Call this function whenever a life is lost
        function updateLifeIcons() {
            this.lifeCounterIcons.children.iterate((P1LifeIcon, index) => {
                P1LifeIcon.visible = index < this.P1Lives;
            });
        }

        // Call updateLifeIcons() in your create method to initialize the life icons
        updateLifeIcons.call(this);
      
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

        //Check if player is still alive
        this.DigChampsP1V2Alive = true;

        //Create cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
    
    }//End of create method
        
    update(){

        this.demonFollows();
        
         // Set the background position based on the player's position
        //this.groundLayer.x = this.DigChampsP1V2.x / 4; // Adjust the division factor as needed

        //this.direction = new Phaser.Math.Vector2(0)
         // Debugging statements
    //console.log('Player position:', this.DigChampsP1V2.x, this.DigChampsP1V2.y);
    //console.log('Demon position:', this.DemonSS.x, this.DemonSS.y);
   // console.log('Direction:', normalizedDirectionX, normalizedDirectionY);

        if (this.allowPlayerMovement) {
        // Player movement logic...
        const speed = 430;

    if(this.DigChampsP1V2Alive){
    if (this.cursors.left.isDown) {
        this.DigChampsP1V2.anims.play('Player1');
        this.DigChampsP1V2.setVelocityX(-speed);
        //this.scrollBackground(-speed);
        
         // Scroll the background left
         this.cameras.main.scrollX -= speed * this.game.loop.delta / 1000;

          // Check if the camera reached the beginning of the background
       // if (this.cameras.main.scrollX < 0) {
            // Reset the camera to create a looping effect
      //     this.cameras.main.scrollX = this.backgroundWidth;
      //  }

    } else if (this.cursors.right.isDown) {
        this.DigChampsP1V2.anims.play('Player1');
        this.DigChampsP1V2.setVelocityX(speed);

        this.cameras.main.scrollX += speed * this.game.loop.delta / 1000;

        // Check if the camera reached the end of the background
       //if (this.cameras.main.scrollX > this.backgroundWidth) {
            // Reset the camera to create a looping effect
            //this.cameras.main.scrollX = 0;
       // }
        
    } else {
        this.DigChampsP1V2.setVelocityX(0);
        //this.DigChampsP1V2.anims.stop('Player1');
    }

    if (this.cursors.up.isDown && this.DigChampsP1V2.body.onFloor()) {
        this.DigChampsP1V2.setVelocityY(-500);
    }
    /*
     // Calculate direction from Demon to player
     const directionX = this.DigChampsP1V2.x - this.DemonSS.x;

     // Normalize direction
     const length = Math.abs(directionX);
     const normalizedDirectionX = directionX / length;

     // Set Demon's velocity based on normalized direction
     const demonSpeed = 2; // Adjust speed as needed
     this.DemonSS.setVelocity(normalizedDirectionX * demonSpeed * demonSpeed);

     // Play the Demon's animation
     this.DemonSS.anims.play('Demon', true);
*/
    //}
}//Player movement logic
    // Basic collision check
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.DigChampsP1V2.getBounds(), this.Snail.getBounds())) {
        // this.sound.play('hitHurt', { volume: 0.2 });
        // this.DigChampsP1Single.destroy();
        // this.Snail.destroy();
    }

    // Snail movement
    this.Snail.x -= 0.01;
    this.Worm.x -= 3;
   // this.DemonSS.x = -6;
   

        //this.direction.normalize();
        //this.DigChampsP1Single.update();
        //this.Snail.update();
    
}//End of Player allowedMovement

    }//End of update
    
   // }
    handleBackgroundLoop() {
        if (this.cameras.main.scrollX < 0) {
            this.cameras.main.scrollX = this.backgroundWidth;
        } else if (this.cameras.main.scrollX > this.backgroundWidth) {
            this.cameras.main.scrollX = 0;
        }
    }
    
    // Callback function for collision handling
    handleCollision(DigChampsP1V2, Snail) {
        //if (this.DigChampsP1Single.checkCollision(this.DigChampsP1, this.Snail)) {
        this.DigChampsP1V2Alive = false;
        this.DigChampsMusic.stop();
            //Play death animation
            //this.sound.play('hitHurt', { volume: 0.2 }); 
            //this.sound.play('gameover', { volume: 0.2 }); 
            this.DigChampsP1V2.destroy();
            
             // Remove a life image from the group
             
    const lifeImage = this.lifeCounterIcons.getFirstAlive();
    if (lifeImage) {
        lifeImage.setAlpha(0); // Hide the image
        lifeImage.setActive(false).setVisible(false); // Deactivate and hide
    }

    // Decrement lives
    this.P1Lives--;

    // Check for game over
    if (this.P1Lives === 0) {
        this.gameOver = true;
        // Perform game over actions (e.g., show a game over screen)
    }

    }//End of handle collision

    // Inside a function to restart the game
    restartGame() {
    // Reset lives
    this.playerLives = 3;

    // Reset life counter images
    this.lifeCounterGroup.clear(true, true); // Clear and destroy existing images

    // Create new life counter images
    this.lifeCounterGroup.createMultiple({
        key: 'lifeImage', // Replace 'lifeImage' with the key of your life counter image
        repeat: this.playerLives - 1, // Set the number of initial lives
        setXY: { x: 16, y: 16, stepX: 40 } // Adjust the spacing between life images
    });
    
    }//End of restartGame
    
}//End of class