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

        // var test = child.fork(__dirname + '/index.js');

        var child = sudo(['node', __dirname + '/index.js']);

        child.stdout.on('data', function (data) {
            console.log(data.toString());
        });
    });
});

server.listen(3000);