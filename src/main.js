//Aaron Rodriguez
//Game Title: Dig Champs
//

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
        debug: true
    }
},
//zoom: 2,
scene: [ Title, DigChampsLevel1 ]
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