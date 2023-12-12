class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }


    preload() {
      this.load.path = './assets/';
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
  //this.add.image(0, 0, 'title').setOrigin(0, 0);

  //Sounds and looping BGM
  this.DigChampsMusic = this.sound.add('DigChampsBGM', { loop: true });
  this.DigChampsSelectSfx = this.sound.add('SoundEffect', { loop: false });
  this.DigChampsMusic.play();
  this.DigChampsMusic.setVolume(0.2);

  const titleText = this.add.text(360, 210, "DIG CHAMPS");
  //titleText.fontFamily = 'Times New Roman';
  titleText.setFontSize(20); 
  titleText.setOrigin(0.5, 0.5); // Center the text

  // Add Press Space text
  this.SpaceButtonText = this.add.sprite(365, 400, 'PressSpace');
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