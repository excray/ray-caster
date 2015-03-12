

function Camera () {
	// body...
	this.x = 0
	this.y = 500

	this.angle = 0
	this.fov = 60

	this.maxDistance = 1500
}

Camera.prototype.project = function(map, canvas) {	
	// body...
	var angle = this.angle - this.fov/2
	var angleInc = this.fov/canvas.width
	var distanceFromScreen = (canvas.width/2)*Math.tan((this.fov/2)*DEG)
	
	var context = canvas.getContext("2d")

	for (var x = 0; x < canvas.width; x++) {
		var distance = this.castRay(angle, map)
		angle += angleInc

		distance = distance * Math.cos((angle - this.angle)*DEG)

		sliceHeight = (map.wallHeight / distance) * distanceFromScreen
		y = canvas.height/2 - sliceHeight/2

		context.fillStyle = '#f0f'
		context.fillRect(x, y, 1, sliceHeight)

		context.fillStyle = '#000'
		context.globalAlpha = distance / this.maxDistance
		context.fillRect(x, y, 1, sliceHeight)
		context.globalAlpha = 1

	};

};

Camera.prototype.castRay = function(angle, map) {
	// body...

	var x = this.x
	var y = this.y

	var xInc = Math.cos(angle*DEG)*1
	var yInc = Math.sin(angle*DEG)*1
	//todo: i+= 5
	for(var i = 0; i < this.maxDistance; i+=1)
	{
		x += xInc
		y += yInc

		var hit = map.get(x, y)
		if(hit) return i;
	}
	
}
Camera.prototype.move = function(dist) {
	// body...
	this.x += Math.cos(this.angle*DEG) *dist
	this.y += Math.sin(this.angle*DEG) * dist
};
