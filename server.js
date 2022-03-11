const express = require("express");
const app = express()
const port = process.env.PORT || 5000;
app.use(express.static("Frontend"))
require("./Backend/Router/router")(app)
const server = app.listen(port,()=>{
    console.log(`listen from port no ${port}`)
})
const io = require("socket.io")(server)
let user ={}
io.on("connection",socket=>{
    socket.on("new_user",(newuser)=>{
        socket.broadcast.emit("newuser",newuser)
     user[socket.id] = newuser
    })
    socket.on("msg",(massage)=>{
        socket.broadcast.emit("usermsg",massage)
    })
    socket.on("disconnect",(massage)=>{
        // console.log(user)
        // console.log(user[socket.id])
        socket.broadcast.emit("leftuser",user[socket.id])
    })
})
