class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }


    preload() {
      //this.load.image('title', './assets/Toothachetitle.png'); 
  }

create() {
  //this.add.image(0, 0, 'title').setOrigin(0, 0);
  
  const titleText = this.add.text(360, 210, "DIG CHAMPS")
  //titleText.fontFamily = 'Times New Roman';
  titleText.setFontSize(20); 
  titleText.setOrigin(0.5, 0.5); // Center the text

  const title2Text = this.add.text(360, 405, "Press Space");
  title2Text.setFontSize(17); 
  title2Text.setOrigin(0.5, 0.5); // Center the text

      //Define cursor keys
      this.cursors = this.input.keyboard.createCursorKeys();
}

      update() {
      if (this.cursors.space.isDown) {
        //this.sound.play('select', { volume: 0.2 }); 
        this.scene.start("digchampslevel1Scene"); 
        //this.titlescreenMusic.stop();  
      }
     
      
  }//End of update

}//end of class