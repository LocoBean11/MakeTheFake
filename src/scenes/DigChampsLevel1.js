class DigChampsLevel1 extends Phaser.Scene{
    constructor() {
        super("digchampslevel1Scene");
        //Initialize score and player properties
        this.score = 0;
        this.DigChampsP1V2 = null;
        this.DigChampsP1V2LastDeathPosition = { x: 0, y: 0 };
    }
    
    preload() {
        this.load.path = './assets/';

        //Load the texture atlas
        //this.load.atlas('Player1', 'DigChampsP1V2.png', 'DigChampsP1V2.json');

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

        this.load.spritesheet('invisibleBarrier', 'InvisibleBarrier.png', {
            frameWidth: 234,
            frameHeight: 480
        })

        this.load.spritesheet('Cave', 'CaveOpening.png', {
            frameWidth: 672,
            frameHeight: 369
        })
        
        this.load.image('DigChampsBGImage', 'DigChampsBG.png');
        this.load.tilemapTiledJSON('DigChampsLevel1JSON', 'DigChampsLevel1.json');

         // Load audio 
        this.load.path = './assets/audio/';
        this.load.audio('DigChampsBGM', 'DigChampsMusic.wav');
        this.load.audio('Hit', 'DCGameOverSE.wav');
        this.load.audio('Jump', 'DigChampsP1Jump.wav');
        this.load.audio('ToolSwing', 'DigChampsTool.wav');
        this.load.audio('LevelClear', 'DigChampsLevelClear.wav');
        this.load.audio('Jingle', 'DCGameOverJingle.wav');
        
        }//End of preload

    demonFollows() {
        //Check if Demon exists
        if (this.DemonSS && this.DemonSS.active) {
            this.physics.moveToObject(this.DemonSS, this.DigChampsP1V2, 200);
        }
    }

    create() {
        //Velocity constant
        this.VEL = 100;

        //Game win constant
        this.winPointX = 4000; 

        //Sounds and looping BGM
        this.DigChampsMusic = this.sound.add('DigChampsBGM');
        this.DCGameOverSE = this.sound.add('Hit');
        this.DCGameOverJingle = this.sound.add('Jingle');
        this.DigChampsP1Jump = this.sound.add('Jump');
        this.DigChampsTool = this.sound.add('ToolSwing');
        this.DigChampsLevelClear = this.sound.add('LevelClear');
        
        //Tilemap info
        const map = this.add.tilemap('DigChampsLevel1JSON');
        const tileset = map.addTilesetImage('DigChampsBG', 'DigChampsBGImage');

        const groundLayer = map.createLayer('Ground', tileset, 0, 0);
        const bgLayer = map.createLayer('Background', tileset, 0, 0);
        
        // Initialize variables
        this.backgroundWidth = bgLayer.width;

        // Set the scroll factor for the background layer
        bgLayer.setScrollFactor(0);

        // Initialize variables
        this.backgroundWidth = bgLayer.width;

        groundLayer.setScrollFactor(0); 

        //Add the player
        this.DigChampsP1V2 = this.physics.add.sprite(200, 275, 'Player1', 0);
        this.DigChampsP1V2.setScale(1.7);

        //Set up other properties for the player
        this.physics.world.enable(this.DigChampsP1V2);
        // Set player physics body size in pixels
        this.DigChampsP1V2.body.setSize(86, 92); 
         // Set player origin to the center
         this.DigChampsP1V2.setOrigin(0.5, 0.5);
        this.DigChampsP1V2.setImmovable();
        this.DigChampsP1V2.setMaxVelocity(600, 700);

      // Create idle animation for Player
      this.anims.create({
        key: 'Idle',
        frameWidth: 87,
        frameHeight: 92,
        frameRate: 1,
        frames: this.anims.generateFrameNumbers('Player1', {
        start: 0,
        end: 0,
        }),
        repeat: 1,
    });
    
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

        //Create digging animation for Player
        this.anims.create({
            key: 'Dig',
            frameWidth: 160,
            frameHeight: 92,
            frameRate: 15,
            frames: this.anims.generateFrameNumbers('Player1', {
            start: 5,
            end: 5,
            repeat: 1,
            onComplete: function () {
              this.DigChampsP1V2.anims.stop('Dig', true);
              this.DigChampsP1V2.anims.play('Idle', true);
              this.DigChampsP1V2.setFrame(0);
            },
            callbackScope: this,
            }),
            
        });

        // Create death flash animation for Player
        this.anims.create({
            key: 'DeathFlash',
            frameRate: 6,
            frames: this.anims.generateFrameNumbers('Player1', {
            start: 3,
            end: 4,
            }),
            repeat: 6,
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
        //End of Player animations

        //Add Block
        this.Block = this.physics.add.sprite(2100, 317, 'Block', 0);
        this.Block.setScale(1);

        this.physics.world.enable(this.Block);
        this.Block.setImmovable();
        // Set Block physics body size
        this.Block.body.setSize(79, 71);
         // Set Block origin to the center
         this.Block.setOrigin(0.5, 0.5);
        //this.Block.setVelocityX(100, 0);
        this.Block.setMaxVelocity(100, 0);
        
        //Collision between Player and Block
       this.physics.world.enable([this.DigChampsP1V2, this.Block]);

       // Set up collision between player and block
       this.physics.add.collider(this.DigChampsP1V2, this.Block, this.handleBlockCollision, null, this);
       
        //Add Snail enemy
        this.Snail = this.physics.add.sprite(1000, 295, 'Snail', 0);
        this.Snail.setScale(0.9);

        this.physics.world.enable(this.Snail);
        // Set snail physics body size
        this.Snail.body.setSize(167, 121);
         // Set snail origin to the center
         this.Snail.setOrigin(0.5, 0.5);
        this.Snail.setImmovable();
        this.Snail.setMaxVelocity(600, 0);

       //Collision between Player and Snail
       this.physics.world.enable([this.DigChampsP1V2, this.Snail]);

        // Set up collision between player and snail
        this.physics.add.collider(this.DigChampsP1V2, this.Snail, this.handleCollision, null, this);
        //Snail moves so slowly it's more of an obstacle than an enemy, only needs collision with player, worm and demon

        //Add Worm enemy
        this.Worm = this.physics.add.sprite(2000, 340, 'Worm', 0); //The Worm's placement on the Y-axis is intentional to make it seem as if it is burrowing through the ground  
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

       //Collision between Worm and Block
       this.physics.world.enable([this.Worm, this.Block]);

       // Set up collision between Worm and Block
       this.physics.add.collider(this.Worm, this.Block, this.handleBlockCollision, null, this);

        //Add Demon enemy
        this.DemonSS = this.physics.add.sprite(4000, 280, 'Demon', 100);
        //this.Demon.body.setCollideWorldBounds(true);
        this.DemonSS.setScale(0.9);

        this.physics.world.enable(this.DemonSS);
        // Set Demon physics body size
        this.DemonSS.body.setSize(105, 157);
         // Set Demon origin to the center
         this.DemonSS.setOrigin(0.5, 0.5);
        this.DemonSS.setImmovable(true);
        this.DemonSS.setMaxVelocity(1000, 0);

       //Collision between Player and Demon
       this.physics.world.enable([this.DigChampsP1V2, this.DemonSS]);

        // Set up collision between player and demon
        this.physics.add.collider(this.DigChampsP1V2, this.DemonSS, this.handleCollision, null, this);

        //Collision between Snail and Demon
       this.physics.world.enable([this.Snail, this.DemonSS]);

       // Set up collision between Snail and Demon
       this.physics.add.collider(this.Snail, this.DemonSS, this.handleEnemyCollision, null, this);

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

      this.CaveOpening = this.physics.add.sprite(4440, 132, 'Cave', 0);
      this.CaveOpening.setScale(1.2);

      //Set up other properties for the cave
      this.physics.world.enable(this.CaveOpening);
      // Set player physics body size in pixels
      this.CaveOpening.body.setSize(700, 75); 
      this.CaveOpening.setImmovable(true);
      this.CaveOpening.setMaxVelocity(600, 0);

       //Collision between Player and Cave
     this.physics.world.enable([this.DigChampsP1V2, this.CaveOpening]);

     // Set up collision between player and cave
     this.physics.add.collider(this.DigChampsP1V2, this.CaveOpening, null, this);
      
        // Store the tilemap for later use
        this.tilemap = map;

        // Add Player 1 Start Text
        this.P1StartText = this.add.sprite(370, 240, 'starttext');
        this.P1StartText.setAlpha(1); // Set initial alpha to fully visible
        this.P1StartText.setScale(1);

        // Create a tween to fade out the start text
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
        this.P1LifeIcon.setScale(0.5);

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
        this.P1LifeIcon2.setScale(0.5);

        this.physics.world.enable(this.P1LifeIcon2);
        // Set P1LifeIcon2 physics body size
        this.P1LifeIcon2.body.setSize(108, 123);
         // Set P1LifeIcon2 origin to the center
         this.P1LifeIcon2.setOrigin(0.5, 0.5);
        this.P1LifeIcon2.setImmovable(true);
        this.P1LifeIcon2.setVelocityX(0, 0);
        this.P1LifeIcon2.setMaxVelocity(430, 0);

        this.LivesRemaining = 3;

        //Score text
        this.scoreText = this.add.text(16, 16, '0000', { fontSize: '50px', fontFamily: 'Roboto Mono', fill: '#74f059' });
        
        //Enemy Collision flag
        this.EnemyCollision = false;

        // Game Over flag
        this.gameOver = false;

        //Check if player is still alive
        this.DigChampsP1V2Alive = true;

        // invisible Barrier to prevent player from walking left when the game starts
        this.InvisibleBarrier = this.physics.add.sprite(-100, 120, 'invisibleBarrier', 0);
        this.InvisibleBarrier.setVisible(false); 
        this.InvisibleBarrier.setImmovable(); 
        this.physics.world.enable(this.InvisibleBarrier);
        this.InvisibleBarrier.setMaxVelocity(1000, 0);

        //Create cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
    
    }//End of create method
        
    update(){
        this.demonFollows();

        // Adjust the score text position based on the camera's scroll position
        this.scoreText.x = this.cameras.main.scrollX + 16;
        this.scoreText.y = this.cameras.main.scrollY + 16;

        // Player movement logic
        if (this.allowPlayerMovement) {
        
        const speed = 430;
    
        //Checks to make sure Player is alive
        if(this.DigChampsP1V2Alive){

            //Left key
        if (this.cursors.left.isDown && !this.physics.overlap(this.DigChampsP1V2, this.InvisibleBarrier)) {
            this.DigChampsP1V2.setVelocityX(-speed);
            this.DigChampsP1V2.setFlipX(true); // Flip the sprite on the x-axis
            this.DigChampsP1V2.anims.play('Walk', true);
            this.DigChampsP1V2.body.setSize(87, 92);

            if(this.LivesRemaining > 1 && this.LivesRemaining <= 3 ){
                this.P1LifeIcon.setVelocityX(-speed); //Icon follows the player
            }

            if(this.LivesRemaining == 3 ){
                this.P1LifeIcon2.setVelocityX(-speed); //Icon follows the player
            }
            
         // Scroll the background left
         this.cameras.main.scrollX -= speed * this.game.loop.delta / 1000;
         console.log('Player position:', this.DigChampsP1V2.x, this.DigChampsP1V2.y);

         //Right key
    } else if (this.cursors.right.isDown) {
        this.DigChampsP1V2.setVelocityX(speed);
        this.DigChampsP1V2.setFlipX(false); // Reset the flip
        this.DigChampsP1V2.anims.play('Walk', true);
        this.DigChampsP1V2.body.setSize(87, 92);

        if(this.LivesRemaining > 1 && this.LivesRemaining <= 3 ){
            this.P1LifeIcon.setVelocityX(speed); //Icon follows the player
        }

        if(this.LivesRemaining == 3 ){
            this.P1LifeIcon2.setVelocityX(speed); //Icon follows the player
        }

        this.cameras.main.scrollX += speed * this.game.loop.delta / 1000;
        
        //Idle
    } else {
        this.DigChampsP1V2.setVelocityX(0);
        //this.DigChampsP1V2.anims.play('Idle');

        if(this.LivesRemaining > 1 && this.LivesRemaining <= 3 ){
            this.P1LifeIcon.setVelocityX(0); //Icon follows the player
        }

        if(this.LivesRemaining == 3 ){
            this.P1LifeIcon2.setVelocityX(0); //Icon follows the player
        }
        
    }

    //Jumping logic
    if (this.cursors.up.isDown) { 
        if(this.DigChampsP1V2.body.onFloor() || this.physics.overlap(this.DigChampsP1V2, this.Block)) {
        this.DigChampsP1V2.body.setVelocityY(-500);
       this.DigChampsP1Jump.play();
       this.DigChampsP1Jump.setVolume(0.12);
        }
    }

    //Attack/dig
    if (this.cursors.space.isDown && (this.DigChampsP1V2.body.onFloor() || this.physics.overlap(this.DigChampsP1V2, this.Block))) {
        this.DigChampsP1V2.body.setSize(120, 92);
        this.DigChampsP1V2.setOrigin(0.5, 0.5);
        this.DigChampsP1V2.anims.play('Dig');  
    }//End of if statment
    
}//End of Player movement logic

    // Snail movement
    this.Snail.x -= 0.01;

    if(!this.EnemyCollision){
        if(!this.BlockCollision){
        this.Worm.x -= 3;
       }
    }
    
    else {
        this.Worm.x += 3;
    }
    
}//End of PlayerAllowedMovement

    //Check if player is colliding with block
    const isPlayerCollidingWithBlock = this.physics.collide(this.DigChampsP1V2, this.Block);

    // If true, stop player movement on x-axis
    if (isPlayerCollidingWithBlock) {
    this.DigChampsP1V2.setVelocityX(0);
    
    // Update the camera's scroll position based on the player's position
    this.cameras.main.scrollX = this.DigChampsP1V2.x - this.cameras.main.width / 4;
    }

    //Player standing on the block
    if (this.DigChampsP1V2.body.onFloor() && Phaser.Geom.Intersects.RectangleToRectangle(
        this.DigChampsP1V2.getBounds(), this.Block.getBounds())) 
        {
        this.DigChampsP1V2.setVelocityY(0); // Stop vertical movement
        }

    // If player is colliding with the block and space is pressed, destroy the block
    if (isPlayerCollidingWithBlock && this.cursors.space.isDown) {
        this.DigChampsTool.play();
        this.DigChampsTool.setVolume(0.1);
        this.destroyBlock();
    }
    //Check if player is colliding with snail
    const isPlayerCollidingWithSnail = this.physics.collide(this.DigChampsP1V2, this.Snail);
    
    // If player is colliding with the snail and space is pressed, destroy the snail
    if (isPlayerCollidingWithSnail && this.cursors.space.isDown) {
        this.DigChampsTool.play();
        this.DigChampsTool.setVolume(0.1);
        this.destroySnail();
        this.increaseScore(10);
    }
        //Check if player is colliding with worm
    const isPlayerCollidingWithWorm = this.physics.collide(this.DigChampsP1V2, this.Worm);
    
    // If player is colliding with the worm and space is pressed, destroy the worm
    if (isPlayerCollidingWithWorm && this.cursors.space.isDown) {
        this.DigChampsTool.play();
        this.DigChampsTool.setVolume(0.1);
        this.destroyWorm();
        this.increaseScore(20);
    }

     //Check if player is colliding with demon
     const isPlayerCollidingWithDemonSS = this.physics.collide(this.DigChampsP1V2, this.DemonSS);
    
     // If player is colliding with the demon and space is pressed, destroy the demon
     if (isPlayerCollidingWithDemonSS && this.cursors.space.isDown) {
        this.DigChampsTool.play();
        this.DigChampsTool.setVolume(0.1);
         this.destroyDemonSS();
         this.increaseScore(50);
     }

     // Check for collision between Worm and Block
    const isWormCollidingWithBlock = this.physics.collide(this.Worm, this.Block);

    // If Worm is colliding with the Block, reverse its direction
    if (isWormCollidingWithBlock) {
        // Reverse the Worm's direction
        this.Worm.setVelocityX(-this.Worm.body.velocity.x);
       this.Worm.x -= 3;
    }
     
      // Check for victory
    if (this.DigChampsP1V2.x >= this.winPointX) {
        this.winGame();
    }
    
    }//End of update method
    
    // Callback function for collision between player and enemies
    handleCollision() {
        if(this.LivesRemaining == 3){
            this.P1LifeIcon.setVelocityX(0);
            this.DigChampsP1V2.anims.play('DeathFlash'); //Play death animation
            this.DCGameOverSE.play();
            
            setTimeout(() => {
                this.allowPlayerMovement = true;
                }, 100);   
    
            this.P1LifeIcon2.destroy();
            this.P1LifeIcon.x = 120;

            // Respawn the player to the left
        this.DigChampsP1V2.x -= 20; // Ad
        this.DigChampsP1V2.y = 250; // Set the respawn Y position
        this.DigChampsP1V2.setVelocity(0, 0); // Reset the player's velocity
        }

        if(this.LivesRemaining == 2){
            this.DigChampsP1V2.anims.play('DeathFlash'); //Play death animation
            this.DCGameOverSE.play();
            this.P1LifeIcon.destroy();
        }
    
        this.DigChampsP1V2Alive = false;

            this.DigChampsP1V2.x = 100;
            this.DigChampsP1V2.y = 250;
            this.DigChampsP1V2.setVelocityX(0);
            //this.DigChampsP1V2.setAlpha(1);
            this.DigChampsP1V2Alive = true;

        //Cameras
           this.cameras.main.startFollow(this.DigChampsP1V2, true, 0, 0);
           this.cameras.main.setScroll(0, 0);

    this.LivesRemaining --;

    // Check for GAME OVER
    if (this.LivesRemaining == 0) {
        this.DigChampsP1V2.anims.play('DeathFlash'); //Play death animation
        this.gameOver = true;
      
           this.DCGameOverJingle.play();
           this.scene.start("gameoverScene", { score: this.score }); 
        
    }//End of if statement

    }//End of handleCollision

    // Callback function for collision between enemies
    handleEnemyCollision() {
        this.Worm.setFlipX(true); // Flip the sprite on the x-axis
        this.EnemyCollision = !this.EnemyCollision;
    }//End of Enemy Collision

     // Callback function for collision between block and worm
     handleBlockCollision() {
       this.Worm.setFlipX(true);
        this.BlockCollision = !this.BlockCollision;
   }//End of Block Collision

    destroyBlock() {
    this.Block.destroy();
    }//End of destroyBlock method

    destroySnail() {
        this.Snail.destroy();
        }//End of destroySnail method

        destroyWorm() { 
            this.Worm.destroy();
            }//End of destroyWorm method
            
        destroyDemonSS() {
            this.DemonSS.destroy();
             }//End of destroyDemonSS method
    
    //Add points to score
    increaseScore(points) {
        this.score += points;
        this.scoreText.setText('00' + this.score);
        
    }
        //Win game condition
    winGame() {
        // Play victory sound
        this.DigChampsLevelClear.play();
        // Stop player movement
        this.allowPlayerMovement = false;
        this.DigChampsP1V2.setVelocity(0);
        this.P1LifeIcon.setVelocityX(0);
       // this.P1LifeIcon2.setVelocityX(0);
        
        // Transition to the next scene after a delay
        this.time.delayedCall(1000, () => {
            this.scene.start("winscreenScene");
        });
    }//End of winGame

}//End of class