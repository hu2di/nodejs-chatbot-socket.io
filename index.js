var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Include .html file
app.get('/', function(req, res) {
	//res.send('<h1>Hello World</h1>');
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	//User connected
	console.log('a user connected');
	//User disconnected
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	//Show message send from user
	socket.on('chat message', function(msg) {
		console.log('message: ' + msg);
		//Broadcast message to all user
		io.emit('chat message', msg);
	});
});

//Listen port 3000
http.listen(4000, function() {
	console.log('listening on *:4000');
});