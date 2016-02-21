/**
 * This class manages game interactions and communication with the renderer.
 * @param {Object} socket The socket associated with the current session.
 * @param {Object} containerEl The container element of the canvas.
 * @param {Object} canvasEl The canvas to which the drawing class will render.
 * @param {Object} drawing The drawing object associated with the game.
 * @param {function()} endGame The callback used to end the game and return to the lobby.
 */
function Game(socket, containerEl, canvasEl, drawing, viewport, endGame) {
  this.socket = socket;
  this.containerEl = containerEl;
  this.canvasEl = canvasEl;
  this.drawing = drawing;
  this.viewport = viewport;
  this.endGame = endGame;
  this.self = {};
  this.players = [];
  this.entities = [];
}

/**
 * Factory method for the Game class.
 * @param {Object} socket The socket associated with the current session.
 * @param {Object} containerEl The container element of the canvas.
 * @param {function()} endGame The callback used to end the game and return to the lobby.
 * @return {Game}
 */
Game.create = function(socket, containerEl, endGame) {
  var canvasEl = $('<canvas>').prop('id', 'canvas');
  var drawing = Drawing.create(this, canvasEl);
  var viewport = Viewport.create();
  return new Game(socket, containerEl, canvasEl, drawing, viewport, endGame);
}

/**
 * Initializes the game object and the drawing object.
 */
Game.prototype.init = function() {
  this.containerEl.append(this.canvasEl);
  Input.applyEventHandlers();
  Input.addMouseTracker(this.canvasEl[0], 'canvas');
  this.drawing.init();
}

/**
 * Starts the game.
 */
Game.prototype.start = function() {
  this.containerEl.show();
  with (this) {
    socket.on('game-update', function(data) {
      self = data.self;
      players = data.players;
      entities = data.entities;
    });
  }
}

/**
 * Updates the game.
 */
Game.prototype.update = function() {
  with (this) {
    viewport.update(self.x, self.y);
    var coords = viewport.toAbsoluteCOords(Input.MOUSE);
    socket.emit('player-action', {
      mouseX: coords[0],
      mouseY: coords[1],
      leftClick: Input.LEFT_CLICK,
      rightClick: Input.RIGHT_CLICK
    });
  }
}

/**
 * Draws the game to the canvas.
 */
Game.prototype.draw = function() {

}
