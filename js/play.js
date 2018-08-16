var play = function(game) {
	this.feed, this.pet, this.config;
};

play.prototype = {
	create: function() {
		// Set game not to pause while running
		game.stage.disableVisibilityChange = true;
		game.add.existing(critter);

		// Placing buttons
		this.feed = game.add.button(game.width/2-52, game.height/2 + 64, 'feed', function(){critter.hunger += 10;});
		this.pet = game.add.button(game.width/2-16, game.height/2 + 64, 'pet', function(){critter.love += 10;});
		this.config = game.add.button(game.width/2+20, game.height/2 + 64, 'config');

		// Tick down hunger and love number every 10 sec while running
		game.timer = game.time.create(true);
		game.timer.loop(5000, function() {this.hunger--; this.love--;}, critter);
		game.timer.start();
	},
	update: function() {
	},
	render: function() {
		game.debug.text('critter lv: ' + critter.lv, 16, 16, 'yellow');
		game.debug.text('critter age: ' + Math.floor(critter.age/60000), 16, 32, 'yellow');
		game.debug.text('critter hunger: ' + Math.floor(critter.hunger), 16, 48, 'yellow');
		game.debug.text('critter love: ' + Math.floor(critter.love), 16, 64, 'yellow');
	}
}