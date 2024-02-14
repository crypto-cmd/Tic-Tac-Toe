const port = 8000;
import { instrument } from "@socket.io/admin-ui";
import { v4 as uuid, validate as is_uuid } from "uuid";
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log(`New User connected:${socket.id}`);
  socket.on("move", (data) => {
    const sids = io.of("/").adapter.sids;
    const roomsSet = sids.get(socket.id);
    if (!roomsSet) {
      console.log("Cannot get rooms set from socket id", socket.id);
    }
    const rooms = Array.from(roomsSet!).filter((room) => is_uuid(room));
    rooms.forEach((room) => {
      io.to(room).emit("update-lastmove", data);
    });
  });
  socket.on("check-connection", async (connection) => {
    console.log("Current socket", socket.id);
    const sockets = await io.allSockets();
    console.log("All sockets", sockets);
    console.log("Check connection existence", connection);
    const exists = sockets.has(connection);
    console.log(`${connection} connection existence: ${exists}`);
    console.log("Emit to socket id ", socket.id);
    if (exists) {
      io.to(socket.id).emit("connection-status", connection);
      return;
    } else {
      io.to(socket.id).emit("connection-status", "");
    }
  });
  socket.on("add-player-to-room", async ({ nextPlayerId, roomId }) => {
    if (!nextPlayerId) console.error(nextPlayerId + " is undefined");

    const room = roomId || uuid();
    console.log("Adding player to room", { nextPlayerId, room });
    socket.join(room);
    const otherPlayerSocket = io.sockets.sockets.get(nextPlayerId);
    if (!otherPlayerSocket) {
      console.info("No other player socket for id", nextPlayerId);
      return;
    }
    io.sockets.sockets.get(nextPlayerId)!.join(room);
    io.to(socket.id).emit("added-to-room", room, 1);
    io.to(nextPlayerId).emit("added-to-room", room, 2);
  });
  socket.on("disconnect", () => {
    io.emit("removed-from-room");
  });
});

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
instrument(io, { auth: false });
