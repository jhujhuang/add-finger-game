/*
 * Serve content over a socket
 */

function Player(pId) {
  this.left = 1;
  this.right = 1;
  this.pId = pId;
  this.addLeft = function(n) {
    this.left = (this.left + n) % 10;
  };
  this.addRight = function(n) {
    this.right = (this.right + n) % 10;
  };
}

var counter = 0;

module.exports = function (socket) {
  socket.emit('send:data', {
    left: 1,
    right: 1,
    pId: counter
  });
  var newPlayer = new Player(counter);
  counter = counter + 1;

  // TODO: DELETE

  setInterval(function () {
    socket.emit('send:time', {
      time: (new Date()).toString()
    });
  }, 1000);
};
