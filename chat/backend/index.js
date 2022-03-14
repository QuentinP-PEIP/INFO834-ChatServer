const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({

    extended : true
  
  }));
  
app.use(bodyParser.json());

app.use('/api/auth', userRoutes);

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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

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

var Message = require('./models/message');

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        (new Message({ contenu: msg, utilisateura: "Quentin", utilisateurb: "Romain"}) ).save(function (err, message) {
            if (err) return console.error(err);
            console.log("Message de " + message.utilisateura + " à destination de " + message.utilisateurb + " a été stocké");
          });
        console.log('message : ' + msg);
      });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});