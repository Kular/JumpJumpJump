/* Macro */
var PLAYER_MASS = 10;
var GRAVITY_ACCELERATION = -200;
var NUM_BOUNCING = 2;

/* Global Variables */
var g_CollisionPoint;
var g_SpringPainter;


if (typeof g_TagOfLayer == "undefined") {
	var g_TagOfLayer = {
		MenuLayer: 0,
		PlayerLayer: 1,
		ControlLayer: 2,
		BackgroundLayer: 3,
		ItemsLayer: 4
	};
};

/* Global enum */
if (typeof g_CollisionType == "undefined") {
	var g_CollisionType = {
		Player: 1,
		Spring: 2,
		Wall: 3
	};
};

/* Helper Method */

/// K of spring with length: len
function GetK(len) {
	var k = 300;

	// TODO: do some calculation with spring length
	var kk;

	return k;
};