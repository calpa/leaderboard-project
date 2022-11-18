import { createServer } from "http";
import { Server } from "socket.io";

import players from './players.json'

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    console.log('connected')
    socket.on('request_all_players', (message) => {
        socket.emit("request_all_players_success", players)
    })

    setInterval(() => {
        socket.emit('update', [])
    }, 1000)
});

httpServer.listen(8080)