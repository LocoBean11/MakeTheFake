class WinScreen extends Phaser.Scene {
    constructor() {
        super("winscreenScene");
    }
  
    preload(){
        // Load audio 
        this.load.path = './assets/audio/';
        this.load.audio('DigChampsBGM', 'DigChampsMusic.wav');

    }//End of preload

    create(){
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