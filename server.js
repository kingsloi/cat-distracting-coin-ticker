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
        var child = sudo(['node', __dirname + '/index.js']);

        child.stdout.on('data', function (data) {
            console.log(data.toString());
        });
    });

    client.on('minBtnClicked', function() {
        var child = sudo(['node', __dirname + '/min.js']);
        io.emit('motorMoved', 'min');
        child.stdout.on('data', function (data) {
            console.log(data.toString());
        });
    });

    client.on('maxBtnClicked', function() {
        var child = sudo(['node', __dirname + '/max.js']);

        io.emit('motorMoved', 'max');
        child.stdout.on('data', function (data) {
            console.log(data.toString());
        });
    });
});

server.listen(3000);
