import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from 'cors';

const app = express();
const port = 3000;

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    socket.on("message", (data) => {
        console.log(data);
        socket.broadcast.emit('receive-message', data); // Broadcast message to other clients
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

app.use(cors());

app.get('/', (req, res) => {
    res.end("hello world");
});

server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
