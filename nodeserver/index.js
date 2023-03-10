
const io = require("socket.io")(8000);
console.log(`Server is listening on port ${io}`);
//node server which will handle socket io connection
const users={};
io.on('connection',(socket)=>{
    socket.on('new-user-joined',(name)=>{
    users[socket.id]=name;
    socket.broadcast.emit('user-joined',name);
    socket.emit('online', {name: users[socket.id]});
    })
    socket.on('send', (message)=>{
        socket.broadcast.emit('receive', {message:message, name: users[socket.id]});
    });
    socket.on("disconnect",(message)=>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    })
});
