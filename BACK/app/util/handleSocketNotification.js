const sendSocketNotification = (io, fullCount, halfCount) => {
  io.emit("scrapingInfo", {
    fullCount,
    halfCount,
    date: new Date(),
  });
};


module.exports = {
    sendSocketNotification
}