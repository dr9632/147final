var play = function(game) {
	this.feed, this.foodVal;
	this.pet, this.config;
	this.menu;
	this.menuText = [];
	this.configOpen = false;
};

play.prototype = {
	create: function() {
		// Set game not to pause while running
		game.stage.disableVisibilityChange = true;
		game.add.existing(critter);
		this.foodVal = 0x000000;

		// Placing buttons
		this.feed = game.add.button(game.width/2-52, game.height/2+64, 'feed', function(){critter.feed(this.foodVal); critter.hunger += 10;}, this);
		this.pet = game.add.button(game.width/2-16, game.height/2+64, 'pet', function(){critter.pet(); critter.love += 10;}, this);
		this.config = game.add.button(game.width/2+20, game.height/2+64, 'config', function(){
			if (!this.configOpen) {
				console.log("config menu opened. click anywhere to close");
				this.configOpen = true;

				let g = game.add.graphics();
				g.beginFill(0xffffff);
				g.drawRect(game.width/2+60, 0, game.width-(game.width/2+60), game.height);
				g.endFill();

				// transform primitive into sprite and destroy primitive
				this.menu = game.add.sprite(game.width/2+60, 0, g.generateTexture());
				this.menu.alpha = 0.7;
				g.destroy();
				
				// Food mods
				let style = {font: '21px Helvetica', fill: '#000'};
				this.menuText[0] = game.add.text(this.menu.x+16, 12, 'Food Palette Change', style);

				style = {font: '16px Helvetica', fill: '#000'};
				this.menuText[1] = game.add.text(this.menu.x+16, 36, 'R', style);
				this.menuText[2] = game.add.text(this.menu.x+36, 36, '[ - ]', style);
				this.menuText[2].inputEnabled = true;
				this.menuText[2].events.onInputUp.add(function() {this.foodVal = this.modFoodVal(-1, 0, 0)}, this);
				this.menuText[3] = game.add.text(this.menu.x+64, 36, '[ + ]', style);
				this.menuText[3].inputEnabled = true;
				this.menuText[3].events.onInputUp.add(function() {this.foodVal = this.modFoodVal(1, 0, 0)}, this);
				
				this.menuText[4] = game.add.text(this.menu.x+16, 52, 'G', style);
				this.menuText[5] = game.add.text(this.menu.x+36, 52, '[ - ]', style);
				this.menuText[5].inputEnabled = true;
				this.menuText[5].events.onInputUp.add(function() {this.foodVal = this.modFoodVal(0, -1, 0)}, this);
				this.menuText[6] = game.add.text(this.menu.x+64, 52, '[ + ]', style);
				this.menuText[6].inputEnabled = true;
				this.menuText[6].events.onInputUp.add(function() {this.foodVal = this.modFoodVal(0, 1, 0)}, this);
				
				this.menuText[7] = game.add.text(this.menu.x+16, 70, 'B', style);
				this.menuText[8] = game.add.text(this.menu.x+36, 70, '[ - ]', style);
				this.menuText[8].inputEnabled = true;
				this.menuText[8].events.onInputUp.add(function() {this.foodVal = this.modFoodVal(0, 0, -1)}, this);
				this.menuText[9] = game.add.text(this.menu.x+64, 70, '[ + ]', style);
				this.menuText[9].inputEnabled = true;
				this.menuText[9].events.onInputUp.add(function() {this.foodVal = this.modFoodVal(0, 0, 1)}, this);
				
				// Temp mods
				style = {font: '21px Helvetica', fill: '#000'};
				this.menuText[0] = game.add.text(this.menu.x+16, 108, 'Temperature Change', style);

				style = {font: '16px Helvetica', fill: '#000'};
				this.menuText[10] = game.add.text(this.menu.x+36, 130, '[ - ]', style);
				this.menuText[10].inputEnabled = true;
				this.menuText[10].events.onInputUp.add(function() {this.temp--;}, critter);
				this.menuText[11] = game.add.text(this.menu.x+64, 130, '[ + ]', style);
				this.menuText[11].inputEnabled = true;
				this.menuText[11].events.onInputUp.add(function() {this.temp++;}, critter);
			}
		}, this);

		game.input.onDown.add(function() {
			if (this.configOpen) {
				if (event.x - game.width/2 - 60 < game.width/2+60) {
					this.menu.destroy();
					for (let i = 0; i < this.menuText.length; i++)
						this.menuText[i].destroy();
					this.configOpen = false;
				}
			}
		}, this);

		// Tick down hunger and love number every 10 sec while running
		game.timer = game.time.create(true);
		game.timer.loop(5000, function() {
			this.hunger--;
			this.love--;
			if (this.temp < 0 || this.temp > 40)
				this.health -= 3;
			this.tintvar();
			updateCache();
		}, critter);
		game.timer.start();
	},
	modFoodVal: function(r, g, b) {
		let col = Phaser.Color.hexToRGBArray(this.foodVal);

		// Modify RGB
		col[0] = col[0] * 255 + r;
		col[1] = col[1] * 255 + g;
		col[2] = col[2] * 255 + b;

		for (let i = 0; i < 3; i++) {
			if (col[i] > 255)
				col[i] = 255;
			if (col[i] < 0)
				col[i] = 0;

			col[i] = col[i]/255;
		}
		
		col = Phaser.Color.RGBArrayToHex(col);

		return col;
	},
	update: function() {
	},
	render: function() {
		game.debug.text('critter lv: ' + critter.lv, 16, 16, 'yellow');
		game.debug.text('critter age: ' + Math.floor(critter.age/60000), 16, 32, 'yellow');
		game.debug.text('critter hunger: ' + Math.floor(critter.hunger), 16, 48, 'yellow');
		game.debug.text('critter love: ' + Math.floor(critter.love), 16, 64, 'yellow');
		game.debug.text('critter health: ' + Math.floor(critter.health), 16, 80, 'yellow');
		game.debug.text('critter color: ' + critter.color.toString(16), 16, 96, 'yellow');
		game.debug.text('critter growth: ' + critter.growth, 16, 112, 'yellow');
		
		let str;
		if (critter.env == 0) str = "neutral";
		else if (critter.env == 1) str = "land";
		else if (critter.env == 2) str = "water";
		else str = "unknown";
		game.debug.text('Env type: ' + str, 16, 132, 'yellow');
		game.debug.text('Env temp: ' + critter.temp, 16, 148, 'yellow');
		
		game.debug.text('foodVal: ' + this.foodVal.toString(16), 16, 216, 'yellow');
		//game.debug.text('' + Phaser.Color.RGBArrayToHex(this.er).toString(16), 16, 144, 'yellow');
	}
}