const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const mongoose = require('mongoose');

const conversationRoutes = require('./routes/conversation');
const messageRoutes = require('./routes/message');
const userRoutes = require('./routes/user');

let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended : true
}));
  
app.use(bodyParser.json());

app.use('/', userRoutes);
app.use('/signup', userRoutes);
app.use('/:id', userRoutes);
app.use(conversationRoutes);
app.use(messageRoutes);
// app.use('/chat', authMW);


const connectDb = async () => {
    await mongoose.connect('mongodb://localhost:27017/chat', {useNewUrlParser: true, useUnifiedTopology : true}).then(
        () => {
            console.log(`Connected to database`)
        },
        error => {
            console.error(`Connection error: ${error.stack}`)
            process.exit(1)
        }
    )
}
  
connectDb().catch(error => console.error(error))

//////////////////////////////

app.get('/chat', (req, res) => {
    var path = require('path');
    var parentDir = path.dirname(path.dirname(__dirname + '/index.js'));
    res.sendFile(parentDir + '/frontend/chat.html');
});

app.get('/', (req, res) => {
  var path = require('path');
  var parentDir = path.dirname(path.dirname(__dirname + '/index.js'));
  res.sendFile(parentDir + '/frontend/auth.html');
});

app.get('/signup', (req, res) => {
  var path = require('path');
  var parentDir = path.dirname(path.dirname(__dirname + '/index.js'));
  res.sendFile(parentDir + '/frontend/signup.html');
});

app.get('/:id', (req, res) => {
  var path = require('path');
  var parentDir = path.dirname(path.dirname(__dirname + '/index.js'));
  res.sendFile(parentDir + '/frontend/accueil.html');
});

app.get('/conversation', (req, res) => {
  var path = require('path');
  var parentDir = path.dirname(path.dirname(__dirname + '/index.js'));
  res.sendFile(parentDir + '/frontend/conversation.html');
});

var Message = require('./models/message');

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        (new Message({ contenu: msg, senderId: "Quentin"}) ).save(function (err, message) {
            if (err) return console.error(err);
            console.log("Message de " + message.utilisateura + " ?? destination de " + message.utilisateurb + " a ??t?? stock??");
          });
        console.log('message : ' + msg);
      });
  });

///////////////////////////////////////

server.listen(3000, () => {
  console.log('listening on *:3000');
});