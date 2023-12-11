class DigChampsLevel1 extends Phaser.Scene{
    constructor() {
        super("digchampslevel1Scene");
    }

    preload() {
        //this.load.image('Player1', './assets/DigChampsP1Single.png');
        this.load.path = './assets/';

        this.load.spritesheet('Player1', 'DigChampsP1V2.png', {frameWidth: 87,  frameHeight: 92 })
        
        this.load.spritesheet('Snail', 'Snail.png', { frameWidth: 200, frameHeight: 200})
            
        this.load.spritesheet('Worm', 'Worm.png', { frameWidth: 245, frameHeight: 282 })
          
        this.load.spritesheet('Demon', 'DemonSS.png', { frameWidth: 110, frameHeight: 156 })
        
        this.load.spritesheet('LifeIcon', 'P1LifeIcon.png', { frameWidth: 108, frameHeight: 123 })
        
        this.load.spritesheet('starttext', 'P1StartText.png', {  frameWidth: 150,
            frameHeight: 101
        })
           
        this.load.spritesheet('Block', 'Block.png', {
            frameWidth: 80,
            frameHeight: 72
        })
        
        this.load.image('DigChampsBGImage', 'DigChampsBG.png');
        this.load.tilemapTiledJSON('DigChampsLevel1JSON', 'DigChampsLevel1.json');

         // Load audio 
        this.load.path = './assets/audio/';
        this.load.audio('DigChampsBGM', 'DigChampsMusic.wav');

        }//End of preload

         // Define a function to check for collisions
        //checkCollision(object1, object2) {
       // return Phaser.Geom.Intersects.RectangleToRectangle(object1.getBounds(), object2.getBounds());
   // }

    demonFollows() {
        this.physics.moveToObject(this.DemonSS, this.DigChampsP1V2, 100);

    }

    create() {
        
        //Velocity constant
        this.VEL = 100;

        //Sounds and looping BGM
        this.DigChampsMusic = this.sound.add('DigChampsBGM', { loop: true });

        //Tilemap info
        const map = this.add.tilemap('DigChampsLevel1JSON');
        const tileset = map.addTilesetImage('DigChampsBG', 'DigChampsBGImage');

        const groundLayer = map.createLayer('Ground', tileset, 0, 0);
        const bgLayer = map.createLayer('Background', tileset, 0, 0);
        
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
    
        this.DigChampsP1V2 = this.physics.add.sprite(200, 275, 'Player1', 0);
       // this.DigChampsP1V2.body.setCollideWorldBounds(true);
        this.DigChampsP1V2.setScale(1.7);

        //Set up other properties for the player

        this.physics.world.enable(this.DigChampsP1V2);
        // Set player physics body size in pixels
        this.DigChampsP1V2.body.setSize(86, 92); 
         // Set player origin to the center
         this.DigChampsP1V2.setOrigin(0.5, 0.5);
        this.DigChampsP1V2.setImmovable();
        this.DigChampsP1V2.setMaxVelocity(600, 400);
       //this.DigChampsP1V2.setDragX(200);
      // this.DigChampsP1V2.setDragY(200);

        // Create walking animation for Player
        this.anims.create({
            key: 'Walk',
            frameRate: 15,
            frames: this.anims.generateFrameNumbers('Player1', {
            start: 1,
            end: 2,
            }),
            repeat: 1,
        });

        // Create digging animation for Player
        this.anims.create({
            key: 'Dig',
            frameRate: 15,
            frameWidth: 86,
            frameHeight: 92,
            frames: this.anims.generateFrameNumbers('Player1', {
            start: 5,
            end: 5,
            }),
            repeat: 1,
        });

        // Create death animation for Player
        this.anims.create({
            key: 'DeathFlash',
            frameRate: 6,
            frames: this.anims.generateFrameNumbers('Player1', {
            start: 3,
            end: 4,
            }),
            repeat: 6,
            onComplete: function (animation, frame, gameObject) {
                // This function will be called when the animation completes
                gameObject.setTexture('DeathFlash', frame.textureFrame); // Set sprite texture to the last frame
            }
        });

        // Create hit frame that plays after Player flashes 
        this.anims.create({
            key: 'HitFrame',
            frameRate: 6,
            frames: this.anims.generateFrameNumbers('Player1', {
            start: 3,
            end: 3,
            }),
            repeat: 1,
        });


        //Add Snail enemy
        this.Snail = this.physics.add.sprite(500, 295, 'Snail', 0);
        //this.Snail.body.setCollideWorldBounds(true);
        this.Snail.setScale(0.9);

        //this.Snail.setGravityY(0);
        this.physics.world.enable(this.Snail);
        // Set snail physics body size
        this.Snail.body.setSize(167, 121);
         // Set snail origin to the center
         this.Snail.setOrigin(0.5, 0.5);
        this.Snail.setImmovable();
        this.Snail.setMaxVelocity(600, 0);
       //this.Snail.setDragX(200);

       //Collision between Player and Snail
       this.physics.world.enable([this.DigChampsP1V2, this.Snail]);

        // Set up collision between player and snail
        this.physics.add.collider(this.DigChampsP1V2, this.Snail, this.handleCollision, null, this);

        //Add Worm enemy
        this.Worm = this.physics.add.sprite(4000, 340, 'Worm', 0); 
        //The Worm's placement on the Y-axis is intentional to make it seem as if it is burrowing through the ground
        //this.Worm.body.setCollideWorldBounds(true);
        this.Worm.setScale(0.9);

        this.physics.world.enable(this.Worm);
        // Set worm physics body size
        this.Worm.body.setSize(88, 60);
         // Set worm origin to the center
         this.Worm.setOrigin(0.5, 0.5);
        this.Worm.setImmovable();
        this.Worm.setMaxVelocity(600, 0);
       //this.Worm.setDragX(200);
       this.Worm.setDragY(200);

       //Collision between Player and Worm
       this.physics.world.enable([this.DigChampsP1V2, this.Worm]);

        // Set up collision between player and worm
        this.physics.add.collider(this.DigChampsP1V2, this.Worm, this.handleCollision, null, this);

         //Collision between Snail and Worm
       this.physics.world.enable([this.Snail, this.Worm]);

       // Set up collision between Snail and Worm
       this.physics.add.collider(this.Snail, this.Worm, this.handleEnemyCollision, null, this);

        //Add Demon enemy
        this.DemonSS = this.physics.add.sprite(5000, 280, 'Demon', 100);
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
        this.DemonSS.setMaxVelocity(1000, 0);
       //this.Demon.setDragX(200);
       //this.DemonSS.setDragY(200);

       //Collision between Player and Demon
       this.physics.world.enable([this.DigChampsP1V2, this.DemonSS]);

        // Set up collision between player and demon
        this.physics.add.collider(this.DigChampsP1V2, this.DemonSS, this.handleCollision, null, this);

        //Collision between Worm and Demon
       this.physics.world.enable([this.Worm, this.DemonSS]);

       // Set up collision between Worm and Demon
       this.physics.add.collider(this.Worm, this.DemonSS, this.handleEnemyCollision, null, this);

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

        //Add Block
        this.Block = this.physics.add.sprite(1000, 315, 'Block', 0);
        this.Block.setScale(1);

        this.physics.world.enable(this.Block);
        // Set Demon physics body size
        this.Block.body.setSize(80, 72);
         // Set Demon origin to the center
         this.Block.setOrigin(0.5, 0.5);
        this.Block.setImmovable(true);
        //this.DemonSS.setVelocityX(100, 0);
        this.Block.setMaxVelocity(1000, 0);
        
        //Collision between Player and Demon
       this.physics.world.enable([this.DigChampsP1V2, this.Block]);

       // Set up collision between player and block
       this.physics.add.collider(this.DigChampsP1V2, this.Block, this.handleBlockCollision, null, this);

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

        //Add first Life Icon
        this.P1LifeIcon = this.physics.add.sprite(120, 430, 'LifeIcon', 0);
        //this.Demon.body.setCollideWorldBounds(true);
        this.P1LifeIcon.setScale(0.5);
        //this.physics.moveToObject(this.DemonSS, this.DigChampsP1V2);

        this.physics.world.enable(this.P1LifeIcon);
        // Set P1LifeIcon physics body size
        this.P1LifeIcon.body.setSize(108, 123);
         // Set P1LifeIcon origin to the center
         this.P1LifeIcon.setOrigin(0.5, 0.5);
        this.P1LifeIcon.setImmovable(true);
        this.P1LifeIcon.setVelocityX(0, 0);
        this.P1LifeIcon.setMaxVelocity(430, 0);

        //Add second Life Icon
        this.P1LifeIcon2 = this.physics.add.sprite(180, 430, 'LifeIcon', 0);
        //this.Demon.body.setCollideWorldBounds(true);
        this.P1LifeIcon2.setScale(0.5);
        //this.physics.moveToObject(this.DemonSS, this.DigChampsP1V2);

        this.physics.world.enable(this.P1LifeIcon2);
        // Set P1LifeIcon physics body size
        this.P1LifeIcon2.body.setSize(108, 123);
         // Set P1LifeIcon origin to the center
         this.P1LifeIcon2.setOrigin(0.5, 0.5);
        this.P1LifeIcon2.setImmovable(true);
        this.P1LifeIcon2.setVelocityX(0, 0);
        this.P1LifeIcon2.setMaxVelocity(430, 0);

        this.LivesRemaining = 3;

        // LifeIcon group
        this.lifeCounterIcons = this.add.group({
        key: 'LifeIcon',
        repeat: this.P1Lives - 3, // Set the number of initial lives
        //setXY: { x: 50, y: game.config.height - 440 } // Adjust the spacing between life images
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
            fontFamily: 'Roboto Mono',
            fontSize: '50px',
            color: '#74f059',
            //align: 'left',
            fixedWidth: 100
            }

        this.scoreLeft = this.add.text(this.backgroundWidth, this.backgroundHeight, this.p1Score, scoreConfig);

        //Enemy Collision flag
        this.EnemyCollision = false;

        // Game Over flag
        this.gameOver = false;

        //Check if player is still alive
        this.DigChampsP1V2Alive = true;

        //Create cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
    
    }//End of create method
        
    update(){
        this.demonFollows();

        //this.direction = new Phaser.Math.Vector2(0)

        // Player movement logic
        if (this.allowPlayerMovement) {
        
        const speed = 430;

        if(this.DigChampsP1V2Alive){

        if (this.cursors.left.isDown) {
            this.DigChampsP1V2.setVelocityX(-speed);
            this.DigChampsP1V2.setFlipX(true); // Flip the sprite on the x-axis
            this.DigChampsP1V2.anims.play('Walk', true);

            if(this.LivesRemaining > 1 && this.LivesRemaining <= 3 ){
                this.P1LifeIcon.setVelocityX(-speed); //Icon follows the player
            }

            if(this.LivesRemaining == 3 ){
                this.P1LifeIcon2.setVelocityX(-speed); //Icon follows the player
            }
            
         // Scroll the background left
         this.cameras.main.scrollX -= speed * this.game.loop.delta / 1000;
         console.log('Player position:', this.DigChampsP1V2.x, this.DigChampsP1V2.y);

    } else if (this.cursors.right.isDown) {
        this.DigChampsP1V2.setVelocityX(speed);
        this.DigChampsP1V2.setFlipX(false); // Reset the flip
        this.DigChampsP1V2.anims.play('Walk', true);
        if(this.LivesRemaining > 1 && this.LivesRemaining <= 3 ){
            this.P1LifeIcon.setVelocityX(speed); //Icon follows the player
        }

        if(this.LivesRemaining == 3 ){
            this.P1LifeIcon2.setVelocityX(speed); //Icon follows the player
        }

        this.cameras.main.scrollX += speed * this.game.loop.delta / 1000;
        
    } else {
        this.DigChampsP1V2.setVelocityX(0);
        if(this.LivesRemaining > 1 && this.LivesRemaining <= 3 ){
            this.P1LifeIcon.setVelocityX(0); //Icon follows the player
        }

        if(this.LivesRemaining == 3 ){
            this.P1LifeIcon2.setVelocityX(0); //Icon follows the player
        }
        
        
    }

    if (this.cursors.up.isDown && this.DigChampsP1V2.body.onFloor()) {
        this.DigChampsP1V2.setVelocityY(-500);
        this.DigChampsP1V2.anims.stop();
    }

    if(this.cursors.space.isDown && this.DigChampsP1V2.body.onFloor()) {
        this.DigChampsP1V2.anims.play('Dig');
    }
    
}//End of Player movement logic

    // Basic collision check
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.DigChampsP1V2.getBounds(), this.Snail.getBounds())) {
        // this.sound.play('hitHurt', { volume: 0.2 });
    }

    // Snail movement
    this.Snail.x -= 0.01;
    if(!this.EnemyCollision){
    this.Worm.x -= 3;
    }
    else{
        this.Worm.x += 3;
    }
    
        //this.direction.normalize();
        //this.DigChampsP1Single.update();
        //this.Snail.update();
    
}//End of PlayerAllowedMovement

    }//End of update
    
   // }
   // handleBackgroundLoop() {
     //   if (this.cameras.main.scrollX < 0) {
      //      this.cameras.main.scrollX = this.backgroundWidth;
       // } else if (this.cameras.main.scrollX > this.backgroundWidth) {
       //     this.cameras.main.scrollX = 0;
       // }
    //}
    
    // Callback function for collision between player and enemies
    handleCollision() {
        if(this.LivesRemaining == 3){
            this.P1LifeIcon.setVelocityX(0);
            this.DigChampsP1V2.anims.play('DeathFlash'); //Play death animation
             // Pause the game briefly
            
            //this.DigChampsP1V2.anims.play('Hitframe');   
    
            this.P1LifeIcon2.destroy();
            this.P1LifeIcon.x = 120;
        }

        if(this.LivesRemaining == 2){
            this.P1LifeIcon.destroy();
        }
    
        this.DigChampsP1V2Alive = false;
        this.DigChampsMusic.stop();
            
            //this.sound.play('hitHurt', { volume: 0.2 }); 
            //this.sound.play('gameover', { volume: 0.2 }); 
            //this.DigChampsP1V2.destroy();
           // this.DigChampsP1V2.setAlpha(0);
            this.DigChampsP1V2.x = 100;
            this.DigChampsP1V2.y = 250;
            this.DigChampsP1V2.setVelocityX(0);
            //this.DigChampsP1V2.setAlpha(1);
            this.DigChampsP1V2Alive = true;

           this.cameras.main.startFollow(this.DigChampsP1V2, true, 0, 0);
           this.cameras.main.setScroll(0, 0);

    this.LivesRemaining --;

    // Check for GAME OVER
    if (this.LivesRemaining == 0) {
        this.gameOver = true;
        
        this.time.delayedCall(2000, () => { 
           // this.scene.physics.world.pause(); //Cannot read properties of undefined - Why does world not work???
            this.scene.start("gameoverScene", { score: this.p1Score });
        });

    }//End of if statement

    }//End of handleCollision

    // Callback function for collision between enemies
    handleEnemyCollision() {
        this.Worm.setFlipX(true); // Flip the sprite on the x-axix
        this.EnemyCollision = !this.EnemyCollision;
    }//End of Enemy Collision

     // Callback function for collision between block and sprites
     handleBlockCollision() {
        
    }//End of Block Collision

     // Resets the game if the player loses a life
     resetGame() {

            //const DigChampsP1V2Spawn = map.findObject('Spawns', obj => obj.name === 'DigChampsP1V2Spawn');
             //Replace 32 with coordinates slimeSpawn.x and y 
            //this.DigChampsP1V2 = this.physics.add.sprite(DigChampsP1V2Spawn.x, DigChampsP1V2Spawn.y, 'Player1', 0); 
     }//End of restartGame

    // Restarts the game once a GAME OVER occurs
    restartGame() {
    // Reset lives
    this.LivesRemaining = 3;

    this.scene.start("digchampslevel1Scene"); 

    // Reset life counter images
   // this.lifeCounterGroup.clear(true, true); // Clear and destroy existing images

    // Create new life counter images
    //this.lifeCounterGroup.createMultiple({
    //    key: 'lifeImage', // Replace 'lifeImage' with the key of your life counter image
     //   repeat: this.playerLives - 1, // Set the number of initial lives
     //   setXY: { x: 16, y: 16, stepX: 40 } // Adjust the spacing between life images
   // });
    
    }//End of restartGame
    
}//End of class