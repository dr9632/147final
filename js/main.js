// Gloabl vars
// General
var game;
var bgcolor;

// Game elements
var env, pixColor;
var critter, gochiData;

window.onload = function() {
	// Define game
	game = new Phaser.Game(700, 500, Phaser.AUTO, 'game');

	// Define states
	game.state.add('boot', boot);
	game.state.add('load', load);
	game.state.add('menu', menu);
	game.state.add('play', play);
	game.state.add('gameover', gameover);
	// Start state
	game.state.start('boot');
};

function critterInit() {
	// Initialize critter based on level from local data
	if (gochiData.lv == 0)
		critter = new Critter(game, 'egg');
	if (gochiData.lv == 1 || gochiData.lv == 2)
		critter = new Critter(game, 'bb');
	if (gochiData.lv > 2 && gochiData.lv < 6) {
		if (gochiData.evo_mod < 0)
			critter = new Critter(game, 'furry');
		else if (gochiData.evo_mod > 0)
			critter = new Critter(game, 'fiery');
		else
			critter = new Critter(game, 'newt');
	}
	/*
	lv 6~10: environment adaptation (even more sprtieseafada
	*/
}

function updateCache() {
	gochiData.growth = critter.growth;
	gochiData.health = critter.health;
	gochiData.hunger = critter.hunger;
	gochiData.love = critter.love;
	gochiData.env = critter.env;
	gochiData.temp = critter.temp;
	
	localStorage.setItem('gochiData', JSON.stringify(gochiData));
}