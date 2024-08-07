export default (io) => {
  io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, room }) => {
      username = username.toUpperCase();
      
      // entra em uma chat privado (sala)
      socket.join(room);

      socket.emit('chatMessage', `Bem vindo ${username} a sala sobre ${room}`);
      socket.broadcast.to(room).emit('serverMessage', `${username} acabou de entrar na sala`);

      socket.on('roomClientMessage', ({ message, room }) => {
        io
          .to(room)
          .emit('chatMessage', `${username}: ${message}`)
      });

      socket.on('disconnect', () => {
        socket.broadcast.emit('serverMessage', `${username} saiu da sala.`);
      });    
    })
  })
}