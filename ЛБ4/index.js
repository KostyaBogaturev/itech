let express = require("express"); // отдельная переменная для удобства
let app = express();

let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.static('public')); // указание каталога для статических ресурсов, в котором будет расположен подключаемый файл css.

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('send message', function(msg) {
	io.emit('receive message', msg);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});