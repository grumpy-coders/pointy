import document from "document";
import * as st from "./screen-tools.js";
import * as constants from '../constants.js';
import {
	screenHoleDetailsInit
} from './hole-details.js';
import {
	screenMainInit
} from './main.js';
import {
	GameState
} from '../classes/GameState.js';
import * as alert from "./alert.js";

/** @function startGame
 * Starts a new game
 * @param {object} gameState Details about the game.
 */
export function screenGameInit(gameState) {

	if (gameState.game == null) {
		alert.show('You must select a game.', function () {
			st.showScreen('srnMain');
		});
		return;
	}

	if (gameState.course == null) {
		alert.show('You must select a course.', function () {
			st.showScreen('srnMain');
		});
		return;
	}

	if (gameState.players == null || gameState.players.length < 1) {
		alert.show('You must select a player.', function () {
			st.showScreen('srnMain');
		});
		return;
	}

	let srnGame = document.getElementById("srnGame");

	for (let i = 0, length = gameState.players.length; i < length; i++) {
		let player = gameState.players[i];

		srnGame.getElementById("sv" + i).style.display = "inline";
		let playerState = srnGame.getElementById("gamePlayer" + i);

		playerState.getElementById("playerIndex").value = i;
		playerState.getElementById('bottomLine').style.fill = playerState.style.fill;
		playerState.getElementById('totalScore').style.fill = playerState.style.fill;
		playerState.style.display = "inline";

		let name = playerState.getElementById('name');
		name.text = player.name
		name.style.fill = playerState.style.fill;

		let score = playerState.getElementById('score');
		score.text = 0;
		score.style.fill = playerState.style.fill;

		let btnUp = playerState.getElementById('btnUp');
		btnUp.style.fill = playerState.style.fill;
		btnUp.getElementById('text').style.fill = playerState.style.fill;
		btnUp.onclick = function () {
			changeScore(gameState, playerState, 1)
		};

		let btnDown = playerState.getElementById('btnDown');
		btnDown.style.fill = playerState.style.fill;
		btnDown.getElementById('text').style.fill = playerState.style.fill;
		btnDown.onclick = function () {
			changeScore(gameState, playerState, -1)
		};

	}
	bindEvents(gameState, srnGame);
	changeHole(srnGame, gameState, 0);
	// This fixes the screen loadding with all the scrollview items overlapping in the frist position.
	srnGame.getElementById("scrollview").value = 0;
	st.showScreen(srnGame.id);
}

/** @function bindEvents
 * Sets up the evnets for the game screen.
 * @param {object} gameState Details about the game.
 * @param {object} srnGame Reference to the game screen.
 */
export function bindEvents(gameState, srnGame) {
	console.log('enableGameEvents');
	if (!srnGame) {
		srnGame = document.getElementById("srnGame");
	}

	srnGame.getElementById('txtHole').onclick = function () {
		unbindEvents(false);
		screenHoleDetailsInit(gameState.currentHole, gameState);
	}

	srnGame.getElementById('btnFinish').onclick = function () {
		endGame(gameState);
	}
	// srnGame.getElementById('btnPreviousHole').onclick = function() { changeHole(srnGame, gameState, -1) }
	// srnGame.getElementById('btnNextHole').onclick = function() {changeHole(srnGame, gameState, 1);}

	document.onkeypress = function (e) {
		e.preventDefault();
		switch (e.key) {
			case "up":
				changeHole(srnGame, gameState, 1);
				break;
			case "down":
				changeHole(srnGame, gameState, -1);
				break;
			case "back":
				endGame(gameState);
		}
	}


	let scrollView = srnGame.getElementById("scrollview");
	scrollView.onmousedown = function (evt) {
		gameState.lastY = evt.screenY;
		gameState.lastX = evt.screenX;
	}

	scrollView.onmouseup = function (evt) {
		let yMove = evt.screenY - gameState.lastY;
		let xMove = evt.screenX - gameState.lastX;

		if (yMove < -60) {
			// console.log('swipe up')  
		};

		if (yMove > 60) {
			// console.log('swipe down')
		};

		if (xMove < -60) {
			//console.log('swipe left');
			changeHole(srnGame, gameState, 1);
		};

		if (xMove > 60) {
			// console.log('swipe right')
			changeHole(srnGame, gameState, -1);
		};

	}


}

/** @function changeScore
 * Changes the score of a player.
 * @param {object} gameState Current state of the game.
 * @param {object} playerState The object that contains the current state of the player.
 * @param {int} changeAmount The amount to change the socre by postive number for higher, negative numbers for lower.
 */
function changeScore(gameState, playerState, changeAmount) {
	let score = playerState.getElementById('score');
	score.text = Number(score.text) + changeAmount
	let holeIndex = gameState.currentHole - 1;
	let player = gameState.players[playerState.getElementById('playerIndex').value];
	player.holes[holeIndex] = score.text;
	score.style.fill = (score.text > gameState.course.holes[holeIndex].par) ? constants.RED_HEX : playerState.style.fill;
	updateTotalScore(gameState, player, playerState);
}

/** @function updateTotalScore
 * Updates the display of the players total score.
 * @param {object} gameState Current state of the game.
 * @param {object} player The player obect.
 * @param {object} playerState The object that contains the current state of the player.
 */
function updateTotalScore(gameState, player, playerState) {
	let totalScore = 0;
	for (let i = 0, length = player.holes.length; i < length && i < gameState.currentHole; i++) {
		totalScore += parseInt(player.holes[i]);
	}
	playerState.getElementById('totalScore').text = 'Total: ' + totalScore;
}

/** @function changeHole
 * Changes the current hole.
 * @param {object} Game screen
 * @param {object} gameState Current state of the game.
 */
function changeHole(srnGame, gameState, modifier) {

	if (typeof gameState.course.holes == 'undefined') {
		console.error("No Couse Selected");
		return;
	}

	let newHole = gameState.currentHole + modifier;

	if (newHole > gameState.course.holes.length) {
		console.log("Game Over");
		return;
	}

	if (newHole < 1) {
		console.log('Nope not today. There is not hole 0');
		return;
	}

	gameState.currentHole = newHole;
	srnGame.getElementById("txtHole").text = "H" + gameState.currentHole + " | P" + gameState.course.holes[gameState.currentHole - 1].par + ' | TP' + getTotalPar(gameState);
	for (let playerIndex = 0, length = gameState.players.length; playerIndex < length; playerIndex++) {
		let playerState = srnGame.getElementById("gamePlayer" + playerIndex);
		let player = gameState.players[playerIndex];
		let score = player.holes[gameState.currentHole - 1];
		playerState.getElementById('score').text = score;
		playerState.getElementById('score').style.fill = (score > gameState.course.holes[gameState.currentHole - 1].par) ? constants.RED_HEX : playerState.style.fill;
		updateTotalScore(gameState, player, playerState);
	}
}

/** @function endGame
 * Ends a game
 * @param {object} gameInfo Details about the game.
 */
export function endGame(gameState) {
	let srnYorN = document.getElementById('srnYorN');
	srnYorN.getElementById('title').text = 'End Game?';
	srnYorN.getElementById('btnYes').onclick = function () {
		unbindEvents(true);
		screenMainInit(new GameState(0, 0, []));
	}
	srnYorN.getElementById('btnNo').onclick = function () {
		srnYorN.getElementById('btnNo').onclick = null;
		screenTools.showScreen('srnGame');
	}
	st.showScreen(srnYorN.id);
}

/** @function getTotalPar
 * Gets the total par up to the current hole.
 * @param {object} gameState Current state of the game.
 */
function getTotalPar(gameState) {
	let total = 0;
	for (let h = 0, length = gameState.course.holes.length; h < length && h < gameState.currentHole; h++) {
		total += gameState.course.holes[h].par;
	}
	return total;
}

/** @function unbindEvents
 * Unbinds all of the events
 * @param {bool} hide Hide the player elements
 */
export function unbindEvents(hide) {
	let srnGame = document.getElementById("srnGame");
	srnGame.getElementById('txtHole').onclick = null;
	srnGame.getElementById('btnFinish').onclick = null;
	srnGame.getElementById('scrollview').onmousedown = null;
	srnGame.getElementById('scrollview').onmouseup = null;

	document.onkeypress = null;
	let players = srnGame.getElementsByClassName("player");
	for (let p = 0, length = players.length; p < players; p++) {
		let player = players[p];
		player.getElementById('btnDown').onclick = null;
		player.getElementById('btnUp').onclick = null;
		if (hide) {
			player.style.display = 'none';
		}
	}
}
