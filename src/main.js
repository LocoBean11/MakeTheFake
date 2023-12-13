//Aaron Rodriguez
//Game Title: Dig Champs
//Phaser 3 components used: Physics system, text objects, animation manager, tween manager, 

let config = {
    type: Phaser.AUTO,
    width: 735,
    height: 480,
    scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH
},
physics: {
    default: "arcade",
    arcade: {
        gravity: {
            y: 500
        },
        debug: //false
        true
    }
},
//zoom: 2,
scene: [ Title, DigChampsLevel1, GameOver, WinScreen]
}

    //define game
    const game = new Phaser.Game(config);
    //let game = new Phaser.Game(config);
/*
// define globals
const textSpacer = 64;
let DigChampsP1Single = null;

let highScore;
let newHighScore = false;
//let cursors;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//let keyUP, keyRIGHT, keyLEFT;
*/