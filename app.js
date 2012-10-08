var fs = require('fs');
var db_helper = require("./db_helper.js");

var http = require ('http').createServer(function handler(req, res) {
  fs.readFile(__dirname + '/index.html', function(err, data) {
     if (err) {
	res.writeHead(500);
	return res.end('Error loading index.html');
     } else {
	res.writeHead(200);
	res.end(data);
     }
   });
}).listen(3000);

var io = require('socket.io').listen(http);
io.sockets.on('connection', function(client) {
   console.log('Client connected');

db_helper.get_employees(function(employees) {
	client.emit('populate', employees);
   });

   client.on('add employee', function(data) {
db_helper.add_employee(data, function(lastId) {
	db_helper.get_employees(function(employees) {
		client.emit('populate', employees);
	});
	});
   });
});
