const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('offer', (offer) => {
    console.log('offer', offer);
    io.emit('broadcasting', offer);
  });
  socket.on('answer', (answer) => {
    io.emit('new peer', answer);
  })
});

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: ['index.html'],
  maxAge: '1d',
  redirect: false,
  setHeaders: (res) => {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('public', options));

http.listen(3030, () => {
  console.log('listening on *:3030');
});