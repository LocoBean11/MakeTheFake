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
/*
    const gameOverText = this.add.text(320, 100, "GAME OVER");
    gameOverText.setFontSize(48); // Set the desired font size
    gameOverText.setOrigin(0.5, 0.5); // Center the text
*/
    //this.add.text(240, 150, "Your score was \n       " + this.P1score);
    //this.add.text(170, 200, "Press SPACE arrow key to restart");
    //this.add.text(100, 250, "Press DOWN arrow key to return to Title Screen");

     //Create cursor keys
     this.cursors = this.input.keyboard.createCursorKeys();
    
  }

  update() {
    this.sound.removeByKey('DigChampsBGM'); // This worked!!!
    this.time.delayedCall(4000, () => { 
        this.scene.start("titleScene");
     
        
    });
    
  }//End of update

}//End of GameOver