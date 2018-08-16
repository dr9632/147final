var load = function(game) {
};

load.prototype = {
	preload: function() {
		// Load loading bar
		let loadBar = this.add.sprite(game.width/2, game.height/2, 'load');
		loadBar.anchor.set(0.5);
		game.load.setPreloadSprite(loadBar);

		// Load all the assets
		// Graphic
		game.load.path = 'assets/img/';
		game.load.spritesheet('egg', 'egg.png', 15, 14);
		game.load.spritesheet('bb', 'bb.png', 15, 14);
		game.load.image('pix', 'fragment.png');
		// Sound
		game.load.path = 'assets/audio/';
	},
	create: function() {
		game.state.start('menu');
	}
}