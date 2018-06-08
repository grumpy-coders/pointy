import * as fs from 'fs';
import {
	DeviceInfo
} from 'DeviceInfo.js';
import * as constants from '../constants.js';

/** @class GameState
 * Contains all of the information about the state of the current game.
 */
export class GameState {

	deviceInfo = new DeviceInfo();
	game = null;
	players = null;
	currentHole = 1;
	lastX = 0;
	lastY = 0;

	/**
	 * Create a GameState
	 * @param {int} gameId Id of the game
	 * @param {int} courseId Id of the course
	 * @param {int[]} List of player ids
	 */
	constructor(gameID, courseID, playerIDs) {
		this.setCourse(courseID);
		this.setGame(gameID);
		this.setPlayers(playerIDs);
	}

	/**
	 * Gets the available players.
	 * @return {array} The list of players.
	 */
	getAvailablePlayers() {
		try {
			return JSON.parse(fs.readFileSync(constants.PLAYERS_FILE_PATH, 'json'));
		} catch (error) {
			// console.log(error.message);
			if (error.message == "Couldn't find file: players.json") {
				return [];
			}
			console.error(error.message);
		}
	}

	/**
	 * Sets the current course.
	 * @return {null} Returns void.
	 */
	setCourse(courseID) {
		if (courseID < 1) {
			this.course = null;
			return;
		}
		// console.log(`setCourse Id: ${courseID}`)
		let courses = fs.readFileSync(this.getCoursesPath(), 'json');
		for (let i = 0; i < courses.length; i++) {
			if (courseID == courses[i].id) {
				// console.log(`setting course: ${courses[i].path}`);
				this.course = fs.readFileSync(courses[i].path, 'json');
				break;
			}
		}

		if (this.course == null) {
			console.error(`Course: ${courseID} Not Found.`);
		}
		this.addPlayerHoles();
	}

	/**
	 * Gets the path to course json file.
	 * @return {string} Returns path to courses.json.
	 */
	getCoursesPath() {
		return './resources/courses/courses.json';
	}

	/**
	 * Gets the path to course json file.
	 * @return {string} Returns path to courses.json.
	 */
	getGamesPath() {
		return './resources/games/games.json';
	}

	/**
	 * Sets the current game.
	 * @return {null} Returns void.
	 */
	setGame(gameID) {
		if (gameID < 1) {
			this.game = null;
			return;
		}

		let games = fs.readFileSync(this.getGamesPath(), 'json');
		for (let i = 0; i < games.length; i++) {
			if (gameID == games[i].id) {
				// At some point add support for more games.
				// this.game = fs.readFileSync(courses[i].path, 'json');
				this.game = games[i];
				break;
			}
		}

	}

	/**
	 * Sets the current players.
	 * @return {null} Returns void.
	 */
	setPlayers(playerIDs) {
		if (playerIDs == null || typeof playerIDs == 'undefined' || playerIDs.length < 1) {
			this.players = null;
		}

		let allPlayers = this.getAvailablePlayers();
		let selectedPlayers = new Array(playerIDs.length);

		for (let pi = 0; pi < playerIDs.length; pi++) {
			for (let playerIndex in allPlayers) {
				if (allPlayers[playerIndex].playerID == playerIDs[pi]) {
					selectedPlayers[pi] = allPlayers[playerIndex];
					// console.log(`allPlayers[playerIndex]: ${allPlayers[playerIndex].playerID} | ${allPlayers[playerIndex].name}`);
					// Add the holes to the player.  
					// Will switch to .fill when fitbit sdk supports it.
					if (this.course != null && this.course.holes.length > 0) {
						selectedPlayers[pi].holes = new Array(this.course.holes.length);
						for (let h = 0; h < selectedPlayers[pi].holes.length; h++) {
							selectedPlayers[pi].holes[h] = 0;
						}
					}
					break;
				}
			}
		}
		this.players = selectedPlayers;
	}

	addPlayerHoles() {
		if (this.players == null || this.players.length < 1 || this.course == null || this.course.holes.length < 1) {
			return;
		}

		for (let pi = 0; pi < this.players.length; pi++) {
			this.players[pi].holes = new Int8Array(this.course.holes.length);
		}

	}

	/**
	 * Gets a string version of the object.
	 * @return {string} String version of the object.
	 */
	getPickPlayersText() {
		if (this.players.length == 0) {
			return "Pick Players";
		} else {
			return this.players.length + (this.players.length == 1 ? " Player" : " Players");
		}
	}

	/**
	 * Gets a string version of the object.
	 * @return {string} String version of the object.
	 */
	toString() {
		return 'game: ' + this.game.name + '(' + this.game.id + ') | ' + 'players: ' + this.players.length;
	}

}
