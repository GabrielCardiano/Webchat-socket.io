import express from 'express';
import cors from 'cors';

import { createServer } from 'http';
import { dirname } from 'path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

import roomsSocket from './sockets/roomsSocket.js';

const __dirname = dirname(fileURLToPath(import.meta.url))


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  }
});

app.use(express.static(__dirname + '/public'));
app.use(cors());

roomsSocket(io);

// teste socke.io is connected
// io.on('connection', (socket) => {
//   console.log('Welcome user.');

//   socket.disconnect('disconnect', "A user disconnected.")
// })

httpServer.listen(3000, () => {
  console.log('Server running at port 3000');
});