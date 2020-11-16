const express=require('express')
require('./db/mongoose')
const userRouter=require('./routers/userRouter')
var bodyParser = require('body-parser');



const app=express()
const port= process.env.PORT||3001

app.use(express.json())
app.use(express.static(__dirname + './../data'));
app.use(userRouter)
app.use(bodyParser.json()); 
// app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
}));
// support encoded bodies


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/welcome.html');
});
app.get('/signUp', function(req, res) {
    res.sendFile(__dirname + '/register.html');
});

app.listen(port,()=>{
    console.log('data server is running on '+port)
})

