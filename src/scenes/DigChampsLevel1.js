class DigChampsLevel1 extends Phaser.Scene{
    constructor() {
        super("digchampslevel1Scene");
    }

    preload() {
        //this.load.image('Player1', './assets/DigChampsP1Single.png');
        this.load.path = './assets/';
        this.load.spritesheet('Player1', 'DigChampsP1Single.png', {
            frameWidth: 90,
            frameHeight: 90
        })
        this.load.spritesheet('Walk', 'DigChampsP1V2.png', {
            frameWidth: 90,
            frameHeight: 90
        })

        this.load.spritesheet('Snail', 'Snail.png', {
            frameWidth: 200,
            frameHeight: 200
        })
        
        this.load.image('DigChampsBGImage', 'DigChampsBG.png');
        this.load.tilemapTiledJSON('DigChampsLevel1JSON', 'DigChampsLevel1.json');
        

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

        groundLayer.setScrollFactor(0); // Fix the background layer

        //this.DigChampsBG = this.add.tilesprite(320, 240, 640, 480);

        //this.DigChampsBG.setScale(game.config.width / this.DigChampsBG.width, game.config.height / this.DigChampsBG.height);
        
        //Add Player
        //this.DigChampsP1Single = this.physics.add.sprite(DigChampsP1Single.x, DigChampsP1Single.y, 'Player1', 0); 
        this.DigChampsP1Single = this.physics.add.sprite(100, 250, 'Player1', 0);
        this.DigChampsP1Single.setCollideWorldBounds(true);
        this.DigChampsP1Single.body.setCollideWorldBounds(true);
        this.DigChampsP1Single.setScale(1.6);

         //Set up other properties for the player

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
            key: 'Walk',
            frameRate: 8,
            repeat: 1,
            frames: this.anims.generateFrameNumbers('Walk', {start: 0, end: 6}),
        });

        //Add snail
        this.Snail = this.physics.add.sprite(500, 295, 'Snail', 0);
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
       this.physics.world.enable([this.DigChampsP1Single, this.Snail]);

        // Set up collision between player and snail
        this.physics.add.collider(this.DigChampsP1Single, this.Snail, this.handleCollision, null, this);


        this.cursors = this.input.keyboard.createCursorKeys();
        
        //camera
        //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightPixels);
        //this.cameras.main.startFollow(this.DigChampsP1Single, true, 0.25, 0.25);
        //this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightPixels);

        //Collision between player, enemies and ground
        groundLayer.setCollisionByProperty({
            Collides: true
        })
        
        this.physics.add.collider(groundLayer, this.DigChampsP1Single);
        this.physics.world.enable(this.DigChampsP1Single);
        this.physics.add.collider(groundLayer, this.Snail);
        this.physics.world.enable(this.Snail);
        groundLayer.setCollisionByExclusion([-1]);

         // Set the boundaries of our game world
        this.physics.world.bounds.width = groundLayer.width;
        this.physics.world.bounds.height = groundLayer.height;
        
            //Background
           // this.DigChampsBackgroundV2 = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

            // Set the scale to fit the bounding box
          //  this.DigChampsBackgroundV2.setScale(game.config.width / this.DigChampsBackgroundV2.width, game.config.height / this.DigChampsBackgroundV2.height);

            //Empty space for ground collision, currently under the actual ground
           // this.DCGroundCollision = this.add.tileSprite(0, 0, 640, 360, 'ground').setOrigin(0, 0); //360 is the height
    
            // Add a collider between player and ground
           // this.physics.add.collider(this.DigChampsP1, this.DCGroundCollision); 
           // this.physics.world.enable(this.DigChampsP1);

            // Set the boundaries of our game world
            //this.physics.world.setBounds = (0, 0, this.DCGroundCollision.width, this.DCGroundCollision.width.height);
           // this.physics.world.bounds.width = this.DCGroundCollision.width;
          // this.physics.world.bounds.height = this.DCGroundCollision.height;

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
        //End of Plyaer 1 Start text

    // Create colliders between the player
        //this.physics.add.collider(this.DigChampsP1, this.DCGroundCollision, this.handleCollision, null, this);
    
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

        this.DigChampsP1SingleAlive = true;

    this.cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    //this.cameras.main.startFollow(this.DigChampsP1Single);

    }//End of create method
        
    update(){
        
        //this.direction = new Phaser.Math.Vector2(0)
        //console.log(this.cursors.left.isDown, this.cursors.right.isDown);
        const speed = 400;
    if(this.DigChampsP1SingleAlive){
    if (this.cursors.left.isDown) {
        this.DigChampsP1Single.setVelocityX(-speed);

         // Scroll the background left
         //this.cameras.main.scrollX -= speed * this.game.loop.delta / 1000;

          // Check if the camera reached the beginning of the background
        if (this.cameras.main.scrollX < 0) {
            // Reset the camera to create a looping effect
           // this.cameras.main.scrollX = this.backgroundWidth;
        }

    } else if (this.cursors.right.isDown) {
        this.DigChampsP1Single.setVelocityX(speed);

        // Scroll the background right
        //this.cameras.main.scrollX += speed * this.game.loop.delta / 1000;

        // Check if the camera reached the end of the background
        if (this.cameras.main.scrollX > this.backgroundWidth) {
            // Reset the camera to create a looping effect
           // this.cameras.main.scrollX = 0;
        }
        
    } else {
        this.DigChampsP1Single.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.DigChampsP1Single.body.onFloor()) {
        this.DigChampsP1Single.setVelocityY(-300);
    }

    // Basic collision check
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.DigChampsP1Single.getBounds(), this.Snail.getBounds())) {
        // Handle collision
        // For example, you might want to play a sound or trigger some other action
        // this.sound.play('hitHurt', { volume: 0.2 });
        // this.DigChampsP1Single.destroy();
        // this.Snail.destroy();
    }

    //if(this.DigChampsP1Single.Collides(this.Snail)){

    //}

        //this.direction.normalize();
        //this.DigChampsP1Single.setVelocityX(this.VEL * this.direction.x);
        //this.DigChampsP1Single.update();
        //this.Snail.update();
}
    }//End of update

    // Callback function for collision handling
    handleCollision(DigChampsP1Single, Snail) {
        //if (this.DigChampsP1Single.checkCollision(this.DigChampsP1, this.Snail)) {
        this.DigChampsP1SingleAlive = false;
            //Play death animation
            //this.sound.play('hitHurt', { volume: 0.2 }); 
            //this.sound.play('gameover', { volume: 0.2 }); 
            this.DigChampsP1Single.destroy();
        
    //}//End of if statement

    }//end of handle collision
    //Reset method for foodItem
    //(Snail) {
        // Reposition the food item to the right side of the screen
        //Snail.x = game.config.width + borderUISize * 6;
        //foodItem.y = Phaser.Math.Between(this.minY, this.maxY);
   // }


}//End of class