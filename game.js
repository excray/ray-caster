
function Game (canvas) {
	// body...
	var self = this
	this.keyPressed = {}

	$(canvas).on('keydown keyup', function(e) {
		var  keyName = Game.keys[e.which]

		if(keyName) {
			self.keyPressed[keyName] = e.type === 'keydown'
			e.preventDefault()
		}
	})
}	


Game.keys = {
	32: 'space',
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down'
}

Game.prototype.onFrame = function(callback) {
	// body...
  var self = this
  if (window.requestAnimationFrame) {
    requestAnimationFrame(function() {
      callback()
      // requestAnimationFrame only calls our callback once, we need to
      // schedule the next call ourself.
      self.onFrame(callback)
    })
  } 
  
};
