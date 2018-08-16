var gameover = function(game) {
};

gameover.prototype = {
	create: function() {
		localStorage.removeItem('gochiData');
		critter.destroy();
		game.add.sprite(game.width/2, game.height/2, 'rip');
		let style = {font: '11px Press Start 2P', fill: '#fff'};
		let msg = game.add.text(game.width/2, game.height/2 + 52, 'Your tiny friend is dead :(', style);
		msg.anchor.set(0.5);
	}
}