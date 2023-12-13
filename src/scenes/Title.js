class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }


    preload() {
      this.load.path = './assets/';

      this.load.spritesheet('TitleBG', 'DigChampsTitleBG.png', {
        frameWidth: 740,
        frameHeight: 480
      })

      this.load.spritesheet('Player1TS', 'DigChampsPlayerTS.png', {
        frameWidth: 112,
        frameHeight: 110
      })

      this.load.spritesheet('Player2TS', 'DigChampsPlayer2TS.png', {
        frameWidth: 126,
        frameHeight: 105
      })

      this.load.spritesheet('SnailTS', 'SnailTS.png', {
        frameWidth: 146,
        frameHeight: 116
      })

    this.load.spritesheet('WormTS', 'WormTS.png', {
      frameWidth: 88,
      frameHeight: 131
    })

      this.load.spritesheet('PressSpace', 'SpaceButtonText.png', {
        frameWidth: 207,
        frameHeight: 29
    })

      // Load audio based on object properties in the tilemap
  this.load.path = './assets/audio/';
  this.load.audio('DigChampsBGM', 'DigChampsMusic.wav');
  this.load.audio('SoundEffect', 'DigChampsSelectSfx.wav');
  
  }//End of preload

create() {
  this.DigChampsTitleBG = this.add.sprite(370, 240, 'TitleBG', 0);

  //Add the players that appear on title screen

  this.DigChampsPlayerTS = this.physics.add.sprite(250, 315, 'Player1TS', 0);
  // this.DigChampsPlayerTS.body.setCollideWorldBounds(true);
   this.DigChampsPlayerTS.setScale(1.7);

   //Set up other properties for the player

   this.physics.world.enable(this.DigChampsPlayerTS);
   // Set player physics body size in pixels
   this.DigChampsPlayerTS.body.setSize(110, 110); 
    // Set player origin to the center
    this.DigChampsPlayerTS.setOrigin(0.5, 0.5);
   this.DigChampsPlayerTS.setImmovable();
   this.DigChampsPlayerTS.setMaxVelocity(600, 0);


   this.DigChampsPlayer2TS = this.physics.add.sprite(490, 320, 'Player2TS', 0);
  // this.DigChampsP1V2.body.setCollideWorldBounds(true);
   this.DigChampsPlayer2TS.setScale(1.7);

   //Set up other properties for the player

   this.physics.world.enable(this.DigChampsPlayer2TS);
   // Set player physics body size in pixels
   this.DigChampsPlayer2TS.body.setSize(125, 105); 
    // Set player origin to the center
    this.DigChampsPlayer2TS.setOrigin(0.5, 0.5);
   this.DigChampsPlayer2TS.setImmovable();
   this.DigChampsPlayer2TS.setMaxVelocity(600, 0);

   // Create walking animations for Player 1
   let player1TSanimation;

   const restartAnimation1 = () => {
    this.DigChampsPlayerTS.anims.restart();
  };

   this.anims.create({
    key: 'Walking1',
    frameRate: 16,
    delay: 1000,
    duration: 1000,
    frames: this.anims.generateFrameNumbers('Player1TS', {
    start: 1,
    end: 5,
    }),
    repeat: -1,
    yoyo: true,
    });
    this.DigChampsPlayerTS.anims.play('Walking1');

  this.time.delayedCall(3000, restartAnimation1);

  // Create walking animation for Player 2
  let player2TSanimation;

  // Function to restart the tween
  const restartAnimation2 = () => {
    this.DigChampsPlayer2TS.anims.restart();
  };

   this.anims.create({
    key: 'Walking2',
    frameRate: 14,
    delay: 1000,
    duration: 1000,
    frames: this.anims.generateFrameNumbers('Player2TS', {
    start: 1,
    end: 5,
    }),
    repeat: -1,
    });
    this.DigChampsPlayer2TS.anims.play('Walking2');

  this.time.delayedCall(3000, restartAnimation2);

  //Add enemies
  this.SnailTS = this.add.sprite(640, 335, 'SnailTS', 0);
  this.SnailTS.setScale(0.8);

  this.WormTS = this.add.sprite(100, 330, 'WormTS', 0);
  this.WormTS.setScale(0.8);

  //Sounds and looping BGM
  this.DigChampsMusic = this.sound.add('DigChampsBGM', { loop: true });
  this.DigChampsSelectSfx = this.sound.add('SoundEffect', { loop: false });
  this.DigChampsMusic.play();
  this.DigChampsMusic.setVolume(0.2);

  const titleText = this.add.text(360, 150, "DIG CHAMPS");
  //titleText.fontFamily = 'Times New Roman';
  titleText.setFontSize(20); 
  titleText.setOrigin(0.5, 0.5); // Center the text

  // Add Press Space text
  this.SpaceButtonText = this.add.sprite(365, 430, 'PressSpace');
  this.SpaceButtonText.setScale(1.4);

  // Define spaceButtonTween in the outer scope
  let spaceButtonTween;

   // Function to restart the tween
   const restartTween = () => {
    spaceButtonTween.restart();
  };

  spaceButtonTween = this.tweens.add({
    targets: this.SpaceButtonText,
    alpha: { from: 1, to: 0 },
    duration: 100,
    delay: 1000,
    ease: 'Sine.InOut',
    repeat: -1,
    yoyo: true,
  });

  // Set up a delayed call to restart the tween after a certain time
  this.time.delayedCall(3000, restartTween);

   // Set up a delayed call to restart the tween after a certain time
   //this.time.delayedCall(4000, () => {
  //  spaceButtonTween.restart();
  //});
  
  //End of SpaceTextButton tween
  
      //Define cursor keys
      this.cursors = this.input.keyboard.createCursorKeys();
}

      update() {
        
      if (this.cursors.space.isDown) {
        //this.sound.play('select', { volume: 0.2 }); 
        this.scene.start("digchampslevel1Scene"); 
        this.DigChampsSelectSfx.play();
      }
     
      
  }//End of update

}//end of class