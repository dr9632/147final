// Constructor
function Critter(game, key) {
	Phaser.Sprite.call(this, game, game.width/2, game.height/2, key);
	game.physics.enable(this);
	this.body.collideWorldBounds = true;

	this.lv = gochiData.lv;
	// Animation setting
	if (this.lv < 3)
		this.animations.add('idle', [0, 1], 1, true);
	else if (this.lv < 7)
		this.animations.add('idle', [0, 1, 0, 2], 1, true);
	this.animations.play('idle');

	this.health = gochiData.health;
	this.growth = gochiData.growth;
	// Default color is white
	this.color = gochiData.color;
	this.tint = this.color;
	// Get current time (when prefab is called) and calculate diff w/ initialized time
	let curr = new Date();
	this.age = curr.getTime() - gochiData.init_time;

	this.hunger = gochiData.hunger;
	this.love = gochiData.love;
	
	// Envrironment setting
	// Default: 0
	// Land: 1
	// Air: 2
	this.env = gochiData.env;
	// Warm or cold (netural = 20)
	// Below 0 is too cold, over 40 is too hot (health drops)
	this.temp = gochiData.temp;
	// Temperature adaptation mod number
	this.modNum = 0;

	// Evolution modification number
	if (gochiData.evo_mod != null)
		this.evo_mod = gochiData.evo_mod;
}

// Set prototype
Critter.prototype = Object.create(Phaser.Sprite.prototype);
Critter.prototype.constructor = Critter;

// Prefab class functions
Critter.prototype.update = function() {
	// Check if critter is still alive
	this.isAlive();
	this.growUp();

	// Update elapsed time
	this.age = new Date() - gochiData.init_time;
	
	// Capping stuff
	if (this.hunger > 100)
		this.hunger = 100;
	if (this.love > 100)
		this.love = 100;
	if (this.health > 100)
		this.health = 100;
}

Critter.prototype.hecticTemp = function() {
	return this.temp > -20 && this.temp < 60;
}

Critter.prototype.isAlive = function() {
	if (this.hunger < 0 || this.love < 0 || this.health < 0 || !this.hecticTemp())
		game.state.start('gameover');
}

Critter.prototype.growUp = function() {
	if (this.age/3600000 > this.lv * 2 + 1)
		this.growth += 1;
	if (this.growth >= 100) {
		let curr = new Date();
		gochiData = {
			lv: this.lv + 1,
			growth: 0,
			health: this.health,
			color: this.color,
			init_time: curr.getTime(),
			hunger: this.hunger,
			love: this.love,
			env: this.env,
			temp: this.temp
		}
		if (gochiData.lv > 0 && gochiData.lv < 4) {
			var temp_evoNo = 0;
			gochiData.evo_mod = 0;
			if (this.temp < 15) {
				temp_evoNo--;
				if (this.temp < 0)
					temp_evoNo--;
			}
			else if (this.temp > 25) {
				temp_evoNo++;
				if (this.temp > 40)
					temp_evoNo++;
			}
			gochiData.evo_mod += temp_evoNo;
		}
		if (gochiData.lv == 3) {
			gochiData.evo_gene = [];
			if (gochiData.evo_mod < 0)
				gochiData.evo_gene[0] = 'icy';
			else if (gochiData.evo_mod > 0)
				gochiData.evo_gene[0] = 'hot';
			else
				gochiData.evo_gene[0] = 'mid';
		}

		localStorage.setItem('gochiData', JSON.stringify(gochiData));
		
		this.destroy();
		critterInit();
		game.add.existing(critter);
	}
}

Critter.prototype.tintvar = function() {
	let t_color;
	if (this.temp < 15)
		t_color = 0x010100;
	else if (this.temp < 0)
		t_color = 0x020200;
	else if (this.temp > 25)
		t_color = 0x000101;
	else if (this.temp > 40)
		t_color = 0x000202;
	else
		t_color = 0x000000;

	this.color -= t_color;
}

Critter.prototype.feed = function(co_mod) {
	this.health += 10;
	if (this.love > 50) {
		if (this.color + co_mod > 0xffffff)
			this.color = 0xffffff;
		else
			this.color += co_mod;
	}
	else {
		if (this.color - co_mod < 0x000000)
			this.color = 0x000000;
		else
			this.color -= co_mod;
	}

	if (this.hunger < 90) {
		if (this.lv == 0)
			this.growth += 5;
		else
			this.growth += Math.ceil(5/this.lv);
	}
}

Critter.prototype.pet = function() {
	if (this.love < 70) {
		if (this.lv == 0)
			this.growth += 10;
		else
			this.growth += Math.ceil(10/this.lv);
	}
}