const port = 8000;
import { instrument } from '@socket.io/admin-ui';
import { v4 as uuid, validate as is_uuid } from 'uuid';
import express from "express"
import { createServer } from 'http';
import {Server} from 'socket.io';
const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: { origin: '*' }
});

io.on('connection', socket => {
	console.log(`New User connected:${socket.id}`);
	socket.on('move', data => {
		const sids = socket.of('/').adapter.sids;
		const rooms = Array.from(sids.get(socket.id)).filter(room => is_uuid(room));
		rooms.forEach(room => {
			socket.to(room).emit('update-lastmove', data);
		});
	});
	socket.on('check-connection', async connection => {
		const sockets = await socket.allSockets();
		const exists = sockets.has(connection);
		console.log(`${connection} connection existence: ${exists}`);
		socket.to(socket.id).emit('connection-status', exists);
	});
	socket.on('add-player-to-room', async ({ nextPlayerId, roomId }) => {
		if (!nextPlayerId) console.error(nextPlayerId + ' is undefined');

		const room = roomId || uuid();
		socket.join(room);
		socket.sockets.sockets.get(nextPlayerId).join(room);
		socket.to(socket.id).emit('added-to-room', room, 1);
		socket.to(nextPlayerId).emit('added-to-room', room, 2);
	});
	socket.on('disconnect', () => {
		socket.emit('removed-from-room');
	});
});

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
instrument(io, { auth: false });
