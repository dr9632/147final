// Gloabl vars
// General
var game;
var bgcolor;
var pixbit = 6;

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
}

function critterInit() {
	// Initialize critter based on level from local data
	if (gochiData.lv == 0)
		critter = new Critter(game, 'egg');
	if (gochiData.lv == 1)
		critter = new Critter(game, 'bb');
}