/* global require __dirname */
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var sudo = require('sudo');

var clickCount = 0;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next) { // eslint-disable-line no-unused-vars
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(client) {
    client.on('feedBtnClicked', function() {
        clickCount++;
        io.emit('buttonUpdate', clickCount);
        var child = sudo(['node', __dirname + '/feeder.js', '--task=treat']);

        child.stdout.on('data', function (data) {
            console.log(data.toString());
        });
    });

    client.on('openBtnClicked', function() {
        var child = sudo(['node', __dirname + '/feeder.js', '--task=open']);
        io.emit('motorMoved', 'open');
        child.stdout.on('data', function (data) {
            console.log(data.toString());
        });
    });

    client.on('closeBtnClicked', function() {
        var child = sudo(['node', __dirname + '/feeder.js', '--task=close']);

        io.emit('motorMoved', 'close');
        child.stdout.on('data', function (data) {
            console.log(data.toString());
        });
    });

    client.on('sweepBtnClicked', function() {
        var child = sudo(['node', __dirname + '/feeder.js', '--task=sweep']);
        io.emit('motorMoved', 'sweep');
        child.stdout.on('data', function (data) {
            console.log(data.toString());
        });
    });
});

server.listen(3000);
