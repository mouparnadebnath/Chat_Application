import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["https://chat-application-kqbt.onrender.com/"],
		methods: ["GET", "POST"],
	},
});

export const getReceiverSocketId = (receiver_Id) => {
	return userSocketMap[receiver_Id];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

// for video call
socket.on("callUser",(data)=>{
	io.to(data.userTocall).emit("callUser",{signal:data.signalData,from:data.from,name:data.name})
})

socket.on("answerCall",(data)=>{
	io.to(data.to).emit("callAccepted",data.signal)
})
	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		socket.broadcast.emit("callEnded")
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };
