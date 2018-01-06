var rpio = require('rpio');
var PythonShell = require('python-shell');
var StepperWiringPi = require("stepper-wiringpi");

/*
 * Run CoinTicker Python script
 * @url https://github.com/extrabacon/python-shell
 */
var options = {
    mode: 'text',
    pythonPath: '/usr/bin/python',
    pythonOptions: ['-u'],
    scriptPath: './CoinTicker',
    args: ['./CoinTicker/trades.yml']
};

var shell1 = PythonShell.run('stepper.py', {scriptPath: './', args: ['5']}, function (err, results) {
    if (err) throw err;
    console.log('results: %j', results);
});

var shell2 = PythonShell.run('run.py', options, function (err, results) {
    if (err) throw err;
    console.log('results: %j', results);
});

rpio.open(12, rpio.OUTPUT, rpio.LOW);

for (var i = 0; i < 5; i++) {
    /* On for 1 second */
    rpio.write(12, rpio.HIGH);
    rpio.sleep(1);

    /* Off for half a second (500ms) */
    rpio.write(12, rpio.LOW);
    rpio.msleep(500);
}
