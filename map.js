function Map () {
	// body...
	  this.grid = [
  // x
  // 0  1  2  3  4  5  6  7  8  9     y
     0, 0, 0, 0, 0, 0, 1, 1, 0, 0, // 0
     0, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 1
     0, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 2
     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 3
     0, 0, 0, 0, 1, 0, 0, 0, 1, 0, // 4
     0, 0, 0, 0, 1, 0, 0, 0, 1, 0, // 5
     0, 0, 0, 0, 0, 0, 0, 0, 1, 1, // 6
     0, 0, 0, 0, 0, 0, 1, 1, 0, 0, // 7
     0, 0, 0, 0, 0, 0, 0, 1, 0, 0, // 8
     0, 0, 0, 0, 0, 0, 0, 1, 0, 0  // 9
  ]

  this.width = 1000
  this.height = 1000

  this.blockSize = 100
  this.wallHeight = this.blockSize
}

Map.prototype.get = function(x, y) {
	// body...
	if( x < 0 || x >= this.width || y < 0 || y>= this.height)
	{
		return 1
	}

	x = Math.floor(x / this.blockSize)
	y = Math.floor(y / this.blockSize)

	return this.grid[x + y*this.width/this.blockSize]
};

Map.prototype.draw = function(canvas, camera) {
	// body...
	var scale = 0.2
	var blockSize = this.blockSize * scale
	var context = canvas.getContext('2d')

	for (var x = 0; x < this.width; x+=this.blockSize) {
		for(var y = 0; y < this.height; y+=this.blockSize)
		{
			if( this.get(x,y) ){
				context.fillStyle = "#000"
			}
			else
			{
				context.fillStyle = "#fff"
			}
			context.fillRect(x*scale, y*scale, blockSize, blockSize)
		}
	};

	var angle = camera.fov / 2
	context.beginPath()
	context.moveTo(camera.x * scale, camera.y*scale)
	context.lineTo((camera.x + Math.cos((camera.angle - angle) * DEG) * camera.maxDistance) * scale,
                 (camera.y + Math.sin((camera.angle - angle) * DEG) * camera.maxDistance) * scale)
	context.lineTo((camera.x + Math.cos((camera.angle + angle) * DEG) * camera.maxDistance) * scale,
                 (camera.y + Math.sin((camera.angle + angle) * DEG) * camera.maxDistance) * scale)
  
	context.fillStyle = "#00f"
	context.globalAlpha = 0.2
	context.fill()
	context.globalAlpha = 1

	context.fillStyle = "#900"
  	context.fillRect(camera.x * scale - blockSize / 2, camera.y * scale - blockSize / 2, blockSize, blockSize)


};