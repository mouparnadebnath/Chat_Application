import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import authroute from './routes/auth.route.js'
import { connectDatabase } from './database/db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import messageRoute from './routes/message.Route.js'
import userRoute from './routes/userRoute.js'
import bodyParser from 'body-parser';
import { app,server } from './socket/socket.js';

dotenv.config()
const __dirname = path.resolve();

const PORT=process.env.PORT || 5000
      
app.use(bodyParser.json({ limit: '20mb' }))
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:'*'
}))
app.use(cookieParser())
app.use('/api/auth',authroute)
app.use("/api/message",messageRoute)
app.use("/api/users", userRoute)

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

server.listen(PORT,()=>{
    connectDatabase()
    console.log(`server listening on port ${PORT}`)
})