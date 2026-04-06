import { WebSocketServer, WebSocket } from "ws";
import express from "express";
import cors from "cors";
import http from "http";
const app = express();
app.use(cors()); // Taaki frontend (React) backend se baat kar sake
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
let allSockets = []; // Saare connected users ka data yahan rahega
wss.on("connection", (socket) => {
    console.log("Naya banda connect hua! ");
    // Jab user koi message bhejta hai
    socket.on("message", (message) => {
        // Message hamesha 'Buffer' (bytes) mein aata hai, use string banao phir JSON object
        const parsedMessage = JSON.parse(message.toString());
        /*
        {
            "type" : "join",
            "payload" : {
                "roomId" : "adsadsads"
            }
        }
        */
        // CASE 1: JOIN ROOM
        if (parsedMessage.type === "join") {
            allSockets.push({
                socket,
                roomId: parsedMessage.payload.roomId
            });
            console.log("User joined room: " + parsedMessage.payload.roomId);
        }
        /*
        {
            "type" : "chat",
            "payload" : {
                "message" : "hello"
            }
        }
        */
        // CASE 2: CHAT MESSAGE
        if (parsedMessage.type === "chat") {
            // 1. Pata karo ye message bhejne wala kaun hai aur kis room mein hai
            const currentUser = allSockets.find((x) => x.socket === socket);
            const currentUserRoom = currentUser?.roomId;
            if (currentUserRoom) {
                // 2. Loop chalao aur sirf unhe bhejo jo SAME room mein hain
                allSockets.forEach((user) => {
                    // LOGIC: Room match ho par socket alag ho (khud ko wapas nahi bhejna)
                    if (user.roomId === currentUserRoom && user.socket !== socket) {
                        user.socket.send(parsedMessage.payload.message);
                    }
                });
            }
        }
    });
    // CASE 3: DISCONNECT
    socket.on("close", () => {
        // Array se us socket ko nikal do taaki server par bojh na pade
        allSockets = allSockets.filter(user => user.socket !== socket);
        console.log("User chala gaya 🔌");
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map