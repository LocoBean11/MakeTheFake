//Aaron Rodriguez
//Game Title: Dig Champs
//Phaser 3 components used: Physics system, text objects, animation manager, tween manager, timers and tilemaps
//Grader mode/Debug mode: Please turn on debug mode if the game happens to be too difficult

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
            y: 900
        },
        debug: false
        //true
    }
},
//zoom: 2,
scene: [ Title, DigChampsLevel1, GameOver, WinScreen, Credits]
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