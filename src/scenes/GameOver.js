class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }

    init(data) {
        this.P1score = data.P1score;
    }
    preload(){
        
    }

create() {
    /*
    this.add.image(0, 0, 'gameover').setOrigin(0, 0);
    this.selectSoundEffect = this.sound.add('select'); 

    const gameOverText = this.add.text(320, 100, "GAME OVER");
    gameOverText.setFontSize(48); // Set the desired font size
    gameOverText.setOrigin(0.5, 0.5); // Center the text

    this.add.text(240, 150, "Your score was \n       " + this.P1score);
    this.add.text(170, 200, "Press UP arrow key to restart");
    this.add.text(100, 250, "Press DOWN arrow key to return to Title Screen");

     //Create cursor keys
     this.cursors = this.input.keyboard.createCursorKeys();
    */
  }


  update() {
    if (this.cursors.space.isDown) {
        this.sound.play('select', { volume: 0.2 }); 
        this.scene.start("playScene");    
      }
    
  }
}