const chat = (io) => {
    console.log('live : ', io.opts)
  io.use((socket, next) => {
    console.log("SOCKEt :-)");
    next()
  });

  io.on("connection", (socket) => {
    // notify the existing users
    // socket.emit("users", users);
    socket.broadcast.emit('user connected', {
        userID: socket.id,
        username: socket.username,
     })
  });
};

module.exports = chat;
