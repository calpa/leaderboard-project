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
        socket.emit('update_player', {
            id: 1,
            scores: (100 + Math.random() * 100).toFixed(2)
        })
    }, 5000)
});

httpServer.listen(8080)