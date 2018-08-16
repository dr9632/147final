// Constructor
function Critter(game, key, lv) {
	Phaser.Sprite.call(this, game, game.width/2, game.height/2, key);
	game.physics.enable(this);
	this.body.collideWorldBounds = true;
	this.animations.add('idle', [0, 1], 1, true);
	this.animations.play('idle');

	this.lv = lv;
	// Default color is white
	this.color = 0xffffff;
	this.tint = this.color;
	this.age = 0;
	this.hunger = 100;
	this.love = 100;
	
	// Envrironment setting
	// Default: 0
	// Land: 1
	// Air: 2
	this.env = 0;
	// Warm or cold (netural = 50)
	this.temp = 50;
}

// Set prototype
Critter.prototype = Object.create(Phaser.Sprite.prototype);
Critter.prototype.constructor = Critter;

// Prefab class functions
Critter.prototype.update = function() {
}

Critter.prototype.tintvar = function() {
	let t_color;
	if (this.temp < 50)
		t_color = 0x222200;
	else if (this.temp > 50)
		t_color = 0x002222;
	else
		t_color = 0x000000;

	return this.color - t_color;
}