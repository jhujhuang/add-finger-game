var Server = require('express');
var app = Server();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/views/index.html');
});

app.use(Server.static(__dirname + '/public'));

// Socket.io Communication
io.sockets.on('connection', require('./routes/socket'));

http.listen(3000, function(){
  console.log('listening on *:3000');
});
