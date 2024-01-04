const express = require('express');
const app = express();
const path=require('path');
const http=require("http");
const {Server}=require("socket.io");
const server=http.createServer(app);
const io=new Server(server);

const users={};

io.on("connection",(socket)=>{
    socket.on("new-user-joined",(names)=>{
        users[socket.id]=names;
        io.emit('user-joined',names);
    })

    socket.on("send",(message)=>{
        io.emit('receive',{message:message,names:users[socket.id]});
    })
});


app.use(express.static(path.resolve("./public")));
app.get("/",(req,res)=>{
    return res.sendfile("/public/index.html");
})
server.listen(9000,()=>console.log(`Server started at Port 9000`));