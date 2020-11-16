//server side
require('./data/indexData')
var express = require('express');
var app = express();
const {addUser,removeUser,getUser,getUsersInRoom}=require('./utils/users')
app.use(express.static('public'));
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/default.html');
});
app.get('/signin', function(req, res) {
    res.sendFile(__dirname + '/public/signUp.html');
});

//app listen
http.listen(port, function() {
    console.log('the game of chess is running on: ' + port);
});

io.on('connection', function(socket) {
    
    //join room
    socket.on('join',({username,room},callback)=>{
                
        const{error,user}=addUser({id:socket.id,username,room})
        if(error){
            return callback(error)
        }
        socket.join(user.room)
        socket.emit('message','welcome '+user.username)
        socket.broadcast.to(user.room).emit('message',user.username+' has joined the room')

        //room data
        io.to(user.room).emit('roomData',{
            room:user.room,
            users:getUsersInRoom(user.room)
        })
        
        callback()
    })
    
    // move
    socket.on('move', function(msg,room) {
        socket.broadcast.to(room).emit('move', msg); 
        
     });
     //game over
     socket.on('gameOver',(room,username)=>{
         socket.to(room).emit('message','you have lost the game')
         socket.emit('message','you won the game!')
        
     })
     //disconnect
     socket.on('disconnect',()=>{
         const user=removeUser(socket.id)
         if(user){
             io.to(user.room).emit('message',user.username+' has left the room')
         }
         io.to(user.room).emit('roomData',{
            room:user.room,
            users:getUsersInRoom(user.room)
        })
     })
});