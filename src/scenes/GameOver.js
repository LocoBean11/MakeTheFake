class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }

   // init(data) {
    //    this.P1score = data.P1score;
   // }
    preload(){
        this.load.path = './assets/';
        this.load.spritesheet('GameOver', 'DCGameOverScreen.png', {
            frameWidth: 740,
            frameHeight: 480
        })
        this.load.spritesheet('GameOverText', 'GameOverText.png', {
            frameWidth: 740,
            frameHeight: 480
        })

        // Load audio 
        this.load.path = './assets/audio/';
        this.load.audio('DigChampsBGM', 'DigChampsMusic.wav');

    }//End of preload

create() {
    //Sounds and looping BGM
    this.DigChampsMusic = this.sound.add('DigChampsBGM', { loop: true });
    this.DigChampsMusic.stop();

    this.DCGameOverScreen = this.add.sprite(370, 240, 'GameOver', 0);
    
    // Add Press Space text
    this.GameOverText = this.add.sprite(360, 220, 'GameOverText');
    this.GameOverText.setScale(1.6);

    this.add.text(360, 250, "Your score was \n       " + this.score);
    this.add.text(250, 400, "Press SPACE arrow key to \n return to title screen");

     //Create cursor keys
     this.cursors = this.input.keyboard.createCursorKeys();
    
  }

  update() {
    this.sound.removeByKey('DigChampsBGM'); // This worked!!!
    if(this.cursors.space.isDown){
        this.scene.start("titleScene");
    }

    
  }//End of update

}//End of GameOver