var play = function(game) {
	this.critt;
};

play.prototype = {
	create: function() {
		this.critt = new Critter(game, 'bb');
		game.add.existing(this.critt);
	},
	update: function() {
		//this.crittMov();
	},
	crittMov: function() {
		this.critt.body.x = game.rnd.between(this.critt.body.x-1,this.critt.body.x+1);
		this.critt.body.y = game.rnd.between(this.critt.body.y-1,this.critt.body.y+1);
	},
	render: function() {
		//game.debug.text('critter pos x:' + this.critt.body.x, 16, 16, 'yellow');
		//game.debug.text('critter pos y:' + this.critt.body.y, 16, 32, 'yellow');
	}
}