#!/usr/bin/env node


var app = require('../app');
var debug = require('debug')('mocha-chai:server');
var http = require('http');
const chat = require('../controllers/socket');


var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

//Socket io !
var server = http.createServer(app);

const io = require('socket.io')(server, {
  //same path as the client
  path: '/socket.io',
  cors: {
     origin: [process.env.DOMAIN],
     methods: ['GET', 'POST'],
  //    allowedHeaders: ['content-type']
      credentials: false
  },
})
global.io=io
chat(io)
////////////////////////::/

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);



function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
