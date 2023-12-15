class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }
  
    preload(){

    }//End of preload

    create(){
    this.add.text(320, 100, "CREDITS");
    this.add.text(200, 200, "Art and Programming: Aaron Rodriguez");
    this.add.text(240, 300, "Art, Sound Effects and Game \n Concept from Regular Show");

    this.add.text(240, 400, "Press SPACE key to \n return to title screen");

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