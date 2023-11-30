//Aaron Rodriguez
//Game Title: Dig Champs
//


let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH
},
physics: {
    default: 'arcade',
    arcade: {
        //debug: true,
        gravity: {
            x: 0,
            y: 0
        }
    }
},
scene: [ Title, Play ]
}

    //define game
let game = new Phaser.Game(config);

// define globals
const textSpacer = 64;
let DigChampsP1 = null;

let highScore;
let newHighScore = false;
//let cursors;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyUP, keyRIGHT, keyLEFT;