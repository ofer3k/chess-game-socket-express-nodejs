//player side

var board;
var game;
var socket = io();
const sidebarTemplate=document.getElementById('sidebar-template').innerHTML
//recieve username and room from the query selector
const{username,room}=Qs.parse(location.search,{ ignoreQueryPrefix:true})

window.onload = function () {initGame();};

var initGame = function() {
   var cfg = {
       draggable: true,
       position: 'start',
       onDrop: handleMove,
   };
   
   board = new ChessBoard('gameBoard', cfg);
   game = new Chess();
};

var handleMove = function(source, target ) {
    var move = game.move({from: source, to: target});
    if (move === null)  return 'snapback';
    else socket.emit('move', move,room,username);

    if(game.game_over()){
        socket.emit('gameOver',room,username)
    }
};

socket.on('move', function(msg) {
    game.move(msg);
    board.position(game.fen());
});

socket.on('message',function(msg){
    alert(msg)
})
socket.on('roomData',({room,users})=>{
    const html=Mustache.render(sidebarTemplate,{
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML=html
})

socket.emit('join',{username,room},(error)=>{
    if(error){
        alert(error)
        location.href='/'
    }

})
