const express = require('express');
const mongoose = require('mongoose');
const path  = require('path');
const cors = require('cors'); 

const app = express();

const server = require('http').Server(app); // server supports http protocol
const io = require('socket.io')(server); // websocket requests

mongoose.connect('mongodb+srv://USER:PASSWORD@cluster0-q8v9x.mongodb.net/omnistack7?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// creating our own middleware
app.use((req, res, next) => {
    req.io = io;

    next();
})

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resizeds')));

app.use(require('./routes'));

server.listen(3333);
