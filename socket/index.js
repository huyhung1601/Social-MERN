const app = require("express")();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: { origin: "*" },
});
const formatMessage = require("./utils/messages");
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
  } = require('./utils/users');
//Run when client connects
io.on("connection", (socket) => {
    //When user join room
    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room)
        //Welcome current user
        socket.emit("message", formatMessage("wemet", `welcome ${username} to room ${room}` ));

        //Broadcast when a user connets
        socket.broadcast.to(user.room).emit(
        "message",
        formatMessage("wemet", `${username} has joined the ${room}`)
        );toString()
        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });    
     });
     //Run when a client disconnect
        socket.on('disconnect', () => {
          console.log("one left")
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit(
            'message',
            formatMessage('wemet', `${user.username} has left the chat`)
            );
    
            // Send users and room info
            io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
            });
        }  
  }); 

  //Listen for chatMsg
  socket.on("chatMsg", (msg) => {
    const user =getCurrentUser(socket.id)
    socket.broadcast.to(user.room).emit("chatMsg", formatMessage(user.username, msg));
  });
});
const PORT = process.env.PORT || 8900;

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const io = require('socket.io')(8900,{
//     cors:{
//         origin:"http://localhost:3000"
//     }
// })

// let users= [];

// const addUser = (userId, socketId) =>{
//     !users.some(user=>user.userId === userId) &&
//     users.push({userId, socketId})
// }

// const removeUser = (socketId)=>{
//     users = users.filter(user=>user.socketId !== socketId)
// }
// io.on("connection",(socket)=>{
//     //when connect
//     console.log("a user connented")
//     //take userId and socketId from user
//     socket.on("addUser", (userId)=>{
//         addUser(userId, socket.id)
//         io.emit("getUsers", users)
//     });

//     //send and get message

//     // when disconnect
//     socket.on("disconnect",()=>{
//         console.log("a user disconnected!")
//         removeUser(socket.id)
//         io.emit("getUsers", users)
//     })
// })
