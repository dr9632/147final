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
		this.foodVal = 0x000001;

		// Placing buttons
		this.feed = game.add.button(game.width/2-52, game.height/2+64, 'feed', function(){critter.hunger += 10; critter.feed(this.foodVal);}, this);
		this.pet = game.add.button(game.width/2-16, game.height/2+64, 'pet', function(){critter.love += 10;});
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
				
				let style = {font: '16px Helvetica', fill: '#000'};
				this.menuText[0] = game.add.text(this.menu.x+16, 12, 'Envrionment Change', style);
			}
		}, this);

		game.input.onDown.add(function() {
			if (this.configOpen) {
				if (event.x > game.width/2+60) {
					this.menu.destroy();
					for (let i = 0; i < this.menuText.length; i++)
						this.menuText[i].destroy();
					this.configOpen = false;
				}
			}
		}, this);

		// Tick down hunger and love number every 10 sec while running
		game.timer = game.time.create(true);
		game.timer.loop(5000, function() {this.hunger--; this.love--;}, critter);
		game.timer.start();
	},
	createMenuObj: function() {
		let obj = null;
		
		// create primitive
		let g = game.add.graphics();
		g.beginFill(0xffffff);
		g.drawRect(game.width/2+50, 16, game.width-(game.width/2+50), game.height-16);
		g.endFill();

		// transform primitive into sprite and destroy primitive
		obj = game.add.sprite(game.width/2+50, 16, g.generateTexture());
		//obj.alpha = 0.7;
		g.destroy();

		console.log("destroy and return");

		return obj;
	},
	update: function() {
	},
	render: function() {
		game.debug.text('critter lv: ' + critter.lv, 16, 16, 'yellow');
		game.debug.text('critter age: ' + Math.floor(critter.age/60000), 16, 32, 'yellow');
		game.debug.text('critter hunger: ' + Math.floor(critter.hunger), 16, 48, 'yellow');
		game.debug.text('critter love: ' + Math.floor(critter.love), 16, 64, 'yellow');
		game.debug.text('critter color: ' + critter.color.toString(16), 16, 80, 'yellow');
		
		//game.debug.text('' + Phaser.Color.hexToRGBArray(0xfffffe), 16, 128, 'yellow');
		//game.debug.text('' + Phaser.Color.RGBArrayToHex(this.er).toString(16), 16, 144, 'yellow');
	}
}