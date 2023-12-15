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

        //Sounds and looping BGM
    this.DigChampsMusic = this.sound.add('DigChampsBGM', { loop: true });
    this.DigChampsMusic.stop();

     //Create cursor keys
     this.cursors = this.input.keyboard.createCursorKeys();
     
    }//End of create

    update(){
        this.sound.removeByKey('DigChampsBGM'); 
    this.time.delayedCall(4000, () => { 
        this.scene.start("titleScene"); 
    });
    if (this.cursors.space.isDown) {
        //this.sound.play('select', { volume: 0.2 }); 
        this.scene.start("titleScene"); 
       // this.DigChampsSelectSfx.play();
      }
     
        
    }
}//End of Winscreen class