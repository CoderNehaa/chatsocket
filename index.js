import express from "express";
import cors from "cors";
import http from "http";
import {Server} from "socket.io";

import {connectDB} from "./config.js"

const app = express()

// 1. create server
const server = http.createServer(app);

// 2. create socket server
const io = new Server(server, {
    cors    :{
        origin:"*",
        methods:["GET", "POST"]
    }
})

// 3. use socket events
io.on('connection', (socket) => {
    console.log("Connection is established");

    socket.on("join", (userName) => {
        socket.userName = userName;
    })

    socket.on("new-message", (message) => {
        let userMessage = {
            userName:socket.userName,
            message:message
        }

        const newChat = new chatModel({
            username:socket.userName,
            message:message,
            timestamp: new Date()
        })
        newChat.save();




        
        socket.broadcast.emit("broadcast_message", userMessage)
    })

    socket.on('disconnect', () => {
        console.log("Socket is disconnected");
    })
})

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
    connectDB();
})