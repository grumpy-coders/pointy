import document from "document";
import * as st from "./screen-tools.js";
import * as alert from "./alert.js";


/** @function screenSelectPlayersInit
 * Sets up the select players screen.
 * @param {object} gameState Details about the game.
 */
export function screenSelectPlayersInit(gameState) {
	let screen = document.getElementById('srnSelectPlayers');

	if (gameState.players.length < 1) {
		let availablePlayers = gameState.getAvailablePlayers();
    
    if (availablePlayers.length < 1) {
      alert.show('Setup players in companion app.', function() {
        st.showScreen('srnMain');
      } );
      return;
    }

		screen.getElementById('btnDone').onclick = function () {
			setSelectedPlayers(gameState);
		}
		if (gameState.deviceInfo.modelName == 'Versa') {
			screen.getElementById('done-tile').height = gameState.deviceInfo.squareButtonIconSize;
		} else {
			screen.getElementById('done-tile').height = gameState.deviceInfo.squareButtonIconSize + 15;
		}
		st.hideElements(screen, 'select-player-tile');

		for (let playerIndex = 0; playerIndex < availablePlayers.length; playerIndex++) {
			if (availablePlayers[playerIndex] == null) {
				continue;
			}
			let cbTile = screen.getElementById('chk' + playerIndex);
			if (cbTile != null) {
				cbTile.text = availablePlayers[playerIndex].name;
				cbTile.playerID = availablePlayers[playerIndex].playerID;
				cbTile.style.display = 'inline';
				cbTile.getElementById('checkbox').getElementById('header').getElementById('text').style.fill = 'fb-yellow';
				cbTile.firstChild.value = 0;
				cbTile.firstChild.onclick = function () {
					cbTile.getElementById('checkbox').getElementById('header').getElementById('text').style.fill = cbTile.firstChild.value == 0 ? 'fb-green' : 'fb-yellow';
				}
			}
		}
		screen.getElementById('tile-list').value = 0;
	}
	st.showScreen(screen.id);
}

/** @function setSelectedPlayers
 * Update the gameState with selected players
 * @param {object} gameState Details about the game.
 */
function setSelectedPlayers(gameState) {
	document.getElementById('srnSelectPlayers').getElementById('btnDone').onclick = null;
	let selectedPlayers = [];
	let pi = 0;
	let tiles = document.getElementById('srnSelectPlayers').getElementsByClassName("select-player-tile");
	for (let tileIndex = 0; tileIndex < tiles.length; tileIndex++) {
		tiles[tileIndex].firstChild.onclick = null;

		if (tiles[tileIndex].firstChild.value) {
			selectedPlayers[pi] = tiles[tileIndex].playerID
			console.log(`selectedPlayers[pi] ${selectedPlayers[pi]}`);
			pi++;
		}
	}

	gameState.setPlayers(selectedPlayers);
	document.getElementById('srnMain').getElementById('btnPickPlayers').text = gameState.getPickPlayersText();
	st.showScreen('srnMain');

}