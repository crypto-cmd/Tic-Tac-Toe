const { v4: uuid, validate: is_uuid } = require('uuid');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
	cors: { origin: '*' }
});

io.on('connection', socket => {
	console.log(`New User connected:${socket.id}`);
	socket.on('move', data => {
		const sids = io.of('/').adapter.sids;
		const rooms = Array.from(sids.get(socket.id)).filter(room => is_uuid(room));
		rooms.forEach(room => {
			io.to(room).emit('update-lastmove', data);
		});
	});
	socket.on('check-connection', async connection => {
		const sockets = await io.allSockets();
		const exists = sockets.has(connection);
		io.to(socket.id).emit('connection-status', exists);
	});
	socket.on('add-player-to-room', async ({ nextPlayerId, roomId }) => {
		if (!nextPlayerId) console.error(nextPlayerId + ' is undefined');

		const room = roomId || uuid();
		socket.join(room);
		io.sockets.sockets.get(nextPlayerId).join(room);
		io.to(socket.id).emit('added-to-room', room, 1);
		io.to(nextPlayerId).emit('added-to-room', room, 2);
	});
	socket.on('disconnect', () => {
		io.emit('removed-from-room');
	});
});

server.listen();
