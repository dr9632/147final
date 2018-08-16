﻿var load = function(game) {
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
		// UI
		game.load.image('feed', 'feed_btn.png');
		game.load.image('pet', 'pet_btn.png');
		game.load.image('config', 'config_btn.png');
		// Sprites
		game.load.spritesheet('egg', 'egg.png', 15, 14);
		game.load.spritesheet('bb', 'bb.png', 15, 14);
		game.load.image('pix', 'fragment.png');
		// Sound
		game.load.path = 'assets/audio/';
	},
	create: function() {
		if (localStorage.getItem('gochiData') != null) {
			gochiData = JSON.parse(localStorage.getItem('gochiData'));
			console.log("Retrieving prev data");
			console.log(gochiData);
		}
		else {
			console.log("No previous data found. Creating new data.");
			let curr = new Date();
			gochiData = {
				lv: 0,
				init_time: curr.getTime(),
				hunger: 100,
				love: 100
			}
			localStorage.setItem('gochiData', JSON.stringify(gochiData));
		}
		
		// Initialize critter based on level from local data
		if (gochiData.lv == 0)
			critter = new Critter(game, 'egg');
		if (gochiData.lv == 1)
			critter = new Critter(game, 'bb');

		game.state.start('menu');
	}
}