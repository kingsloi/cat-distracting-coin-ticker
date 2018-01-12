/* global require process */
var five = require('johnny-five');
var raspi = require('raspi-io');

var board = new five.Board({
    io: new raspi(),
});

board.on('ready', function() {
    /**
    * Setup Servo on pin 35
    * @type {five}
    */
    var servo = new five.Servo({
        pin: 'P1-35',
        range: [0, 165],
    });

    /**
    * Setup Piezo on pin 33
    * @type {five}
    */
    var piezo = new five.Piezo('P1-33');

    /**
    * Inject Servo and Piezo into the REPL
    * @type {object}
    */
    this.repl.inject({
        servo: servo,
        piezo: piezo
    });

    /**
    * Play the Stanger Things theme song (fitting right?)
    * @type {Number}
    */
    piezo.play({
        tempo: 100,
        song: [
            ['C4', 1/4],
            [null, 1/4],
            ['E4', 1/4],
            [null, 1/4],
            ['G4', 1/4],
            [null, 1/4],
            ['B4', 1/4],
            [null, 1/4],
            [null, 1/4],
            [null, 1/4],
            ['B4', 1/4],
            [null, 1/4],
            ['G4', 1/4],
            [null, 1/4],
            ['E4', 1/4],
            [null, 1/4],
            ['C4', 1/4],
            [null, 1/4],
            ['E4', 1/4],
            [null, 1/4],
            ['G4', 1/4],
            [null, 1/4],
            ['B4', 1/4],
            [null, 1/4],
            [null, 1/4],
            [null, 1/4],
            ['B4', 1/4],
            [null, 1/4],
            ['G4', 1/4],
            [null, 1/4],
            ['E4', 1/4],
            [null, 1/4],
            ['C4', 1/4],
            [null, 1/4],
            ['E4', 1/4],
            [null, 1/4],
            ['G4', 1/4],
            [null, 1/4],
            ['B4', 1/4],
            [null, 1/4],
            [null, 1/4],
            [null, 1/4],
            ['B4', 1/4],
            [null, 1/4],
            ['G4', 1/4],
            [null, 1/4],
            ['E4', 1/4],
            [null, 1/4],
            ['C4', 1/4],
            [null, 1/4],
            ['E4', 1/4],
            [null, 1/4],
        ],
    });

    /**
    * After the song has played (roughly 8 seconds +/- 1-2 seconds),
    * quit the process so we can run it save memory and run it again.
    */
    setTimeout(function() {

        /**
        * Move Servo a random degree between 45 - 90 to open the latch
        * enough for a few treats to fall out
        */
        var randomDegree = Math.floor(Math.random() * (90 - 45 + 1)) + 45;
        servo.to(randomDegree, 150, 20);

        /**
        * Once the latch open event has finished, close it immediately
        * so only a few treats fall out, and not 100s
        */
        servo.on('move:complete', function() {
            servo.max();

            // Buenas Noches
            process.exit();
        });
    }, 10000);
});
