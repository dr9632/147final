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
	// Start state
	game.state.start('boot');
}