const next = require('next');
const http = require('http');
const socketIo = require('socket.io');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
let io;
const creeateserver = (server) => {
  const httpServer = http.createServer(server);
  io = socketIo(httpServer);
  return { httpServer, io };
};

module.exports = { app, io, creeateserver };
