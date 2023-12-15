class WinScreen extends Phaser.Scene {
    constructor() {
        super("winscreenScene");
    }
  
    preload(){
        this.load.path = './assets/';
        this.load.spritesheet('YouWin', 'YouWinText.png', {
            frameWidth: 740,
            frameHeight: 480
        })
        
        // Load audio 
        this.load.path = './assets/audio/';
        this.load.audio('DigChampsBGM', 'DigChampsMusic.wav');

    }//End of preload

    create(){
        // Add You Win text
    this.YouWinText = this.add.sprite(360, 150, 'YouWin');
    this.YouWinText.setScale(1.4);

    this.add.text(250, 400, "Press SPACE key to \n return to title screen");

    //Sounds and looping BGM
    this.DigChampsMusic = this.sound.add('DigChampsBGM', { loop: true });
    this.DigChampsMusic.stop();

     //Create cursor keys
     this.cursors = this.input.keyboard.createCursorKeys();
     
    }//End of create

    update(){
        this.sound.removeByKey('DigChampsBGM'); 
    if (this.cursors.space.isDown) { 
        this.scene.start("titleScene"); 
      }
    }

}//End of Winscreen class