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
        range: [0, 150],
    });

    /**
    * Inject Servo and Piezo into the REPL
    * @type {object}
    */
    this.repl.inject({
        servo: servo,
    });

    servo.min();

    process.exit();

});
