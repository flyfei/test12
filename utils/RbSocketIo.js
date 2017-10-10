var rbEventEmitter = require('./RbEventEmitter');

function init(server) {
	var io = require('socket.io').listen(server);
	io.on('connection', function(socket){
		console.log('a user connected');
		rbEventEmitter.on('LOCAL_FWD', function(message) {
			console.log('Received local message' + message);
			socket.emit('news', message);
			// socket.broadcast.to(xxx).emit('YYY', message);
		});
	});
}

function emit(msg) {
	rbEventEmitter.emit('LOCAL_FWD', msg);
}

module.exports = {
	init,
	emit,
};