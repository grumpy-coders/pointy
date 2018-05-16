import * as messaging from "messaging";
import * as fs from 'fs';
import * as constants from './constants';
import * as tools from './tools.js';

/** @function setupMessaging
 * Sets up the message handling for settings
 */
export function setupMessaging() {

	console.log('setupMessaging: begin');

	messaging.peerSocket.onmessage = function (evt) {
		console.log(`evt.data.key: ${evt.data.key}`);
		
	switch (evt.data.key) {
		case 'players':
			updatePlayers(evt.data.newValue);
			break;
		case 'defaultCourse':
			saveDefault(constants.DEFAULT_COURSE_FILE_PATH, evt.data.newValue);
			break;
		case 'defaultGame':
			saveDefault(constants.DEFAULT_GAME_FILE_PATH, evt.data.newValue);
			break;
		}
	}

	// Message socket opens
	messaging.peerSocket.onopen = function () {
		console.log("setupMessaging: App Socket Open");
	};

	// Message socket closes
	messaging.peerSocket.onclose = function () {
		console.log("setupMessaging: App Socket Closed");
	};

	console.log('setupMessaging: end');
}

/** @function updateDefaultGame
 * Updates the default game cache from the companion settings.
 * @param {string} filepath Path to the the save file.
 * @param {string} companionData JSON course data in string format from the companion app.
 */
function saveDefault(filePath, companionData) {
	fs.writeFileSync(filePath, companionData, 'json');
}

/** @function updatePlayers
 * Updates the player cache from the companion settings.
 * Try to preserve the playerIDs.
 * @param {string} playerData JSON player data in string format from the companion app.
 */
function updatePlayers(playerData) {
	console.log(`playerData: ${playerData}`);
	let newPlayers = JSON.parse(playerData);
	let currentPlayers;

	try {
		currentPlayers = JSON.parse(fs.readFileSync(constants.PLAYERS_FILE_PATH, 'json'));
	} catch (error) {
		if (error.message == "Couldn't find file: players.json") {
			currentPlayers = [];
		} else {
			console.error(error.message);
			return;
		}
	}
	let newID = currentPlayers.length;
	let found = false;
	// Add new players
	for (let p = 0; p < newPlayers.length; p++) {
		found = false;
		for (let c = 0; c < currentPlayers.length; c++) {
			if (newPlayers[p].name == currentPlayers[c].name) {
				found = true;
				break;
			}
		}
		if (!found) {
			currentPlayers[newID] = {
				playerID: newID,
				name: newPlayers[p].name
			};
			newID++;
		}
	}
	// Remove deleted players
	for (let c = currentPlayers.length - 1; c >= 0; c--) {
		found = false;
		for (let p = 0; p < newPlayers.length; p++) {
			if (newPlayers[p].name == currentPlayers[c].name) {
				found = true;
				break;
			}
		}
		if (!found && currentPlayers[c] == 'undefined') {
			delete currentPlayers[c];
		}
	}

	currentPlayers = currentPlayers.filter(val => val); // Reindex the array		
	fs.writeFileSync(constants.PLAYERS_FILE_PATH, JSON.stringify(currentPlayers), 'json');

}