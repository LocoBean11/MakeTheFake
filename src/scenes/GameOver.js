class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }

   // init(data) {
    //    this.P1score = data.P1score;
   // }
    preload(){
        this.load.spritesheet('GameOver', 'DCGameOverScreen.png', {
            frameWidth: 740,
            frameHeight: 480
        })

    }//End of preload

create() {
    this.add.sprite(740, 480, 'GameOver', 0);
    
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
    this.time.delayedCall(2500, () => { 
        if (this.cursors.space.isDown) {
        //this.sound.play('select', { volume: 0.2 }); 
        this.scene.start("titleScene");
      }
        
    });
    
    
  }
}