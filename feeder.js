#!/usr/bin/env node
/* global require process */
const five = require('johnny-five');

const raspi = require('raspi-io');

const argv = require('yargs')
    .usage('Usage: $0 -task [treat|open|close|sweep]')
    .demandOption(['task'])
    .argv;

const board = new five.Board({
    io: new raspi(),
});

board.on('ready', function() {
    /**
    * Setup Servo on pin 35
    * @type {five}
    */
    const servo = new five.Servo({
        pin: 'P1-35',
        range: [0, 150],
    });

    /**
    * Setup Piezo on pin 33
    * @type {five}
    */
    const piezo = new five.Piezo('P1-33');

    /**
    * Inject Servo and Piezo into the REPL
    * @type {object}
    */
    this.repl.inject({
        servo: servo,
        piezo: piezo
    });

    /**
     * Do the task
     */
    switch(argv.task) {
        case 'treat':
            /**
            * Play the Stanger Things theme song (fitting right?)
            * @type {Number}
            */
            piezo.play({
                tempo: 200,
                song: [
                    ['A4', 1],
                    [null, 1],
                    ['A4', 1],
                    [null, 1],
                    ['A4', 1],
                    [null, 1],
                    ['A4', 1],
                ],
            });

            /**
            * After the song has played (roughly 6 seconds +/- 1-2 seconds),
            * quit the process so we can run it save memory and run it again.
            */
            setTimeout(function() {

                /**
                * Move Servo a random degree between 45 - 90 to open the latch
                * enough for a few treats to fall out
                */
               var randomDegree = Math.floor(Math.random() * (115 - 90 + 1)) + 90;
                servo.to(randomDegree, 150, 20);
            }, 8000);

            /**
            * Once the latch open event has finished, close it immediately
            * so only a few treats fall out, and not 100s
            */
            servo.on('move:complete', function() {
                servo.max();

                setTimeout(function() {
                    servo.to(140);
                }, 2500);

                setTimeout(function() {
                    // Buenas Noches
                    process.exit();
                }, 5000);
            });

            break;
        case 'open':
            servo.min();
            setTimeout(function() {
                // Buenas Noches
                process.exit();
            }, 5000);
            break;
        case 'close':
            servo.max();
            setTimeout(function() {
                // Buenas Noches
                process.exit();
            }, 5000);
            break;
        case 'sweep':
            servo.sweep();
            break;
        default:
            console.log(`No task found with name '${argv.task}'. Quitting.`);
            process.exit();
    }

});
