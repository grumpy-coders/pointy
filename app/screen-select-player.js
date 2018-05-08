import document from "document";
import * as screenTools from "./screenTools.js";


/** @function screenSelectPlayersInit
* Sets up the select players screen.
* @param {object} gameState Details about the game.
*/

let mystate = {}

export function screenSelectPlayersInit(gameState) {
  let screen = document.getElementById('srnSelectPlayers'); 
  
  if (gameState.players.length < 1) {
    let availablePlayers = gameState.getAvailablePlayers();
    
    screen.getElementById('btnDone').onclick = function() { setSelectedPlayers(gameState); }
    if (gameState.deviceInfo.modelName == 'Versa') {
      screen.getElementById('done-tile').height = gameState.deviceInfo.squareButtonIconSize;  
    } else {
      screen.getElementById('done-tile').height = gameState.deviceInfo.squareButtonIconSize + 15;  
    }
    screenTools.hideElements(screen, 'select-player-tile');


    for (let playerIndex = 0;  playerIndex < availablePlayers.length; playerIndex++) {
      let cbTile = screen.getElementById('chk' + playerIndex);
      if (cbTile != null) {
        cbTile.text = availablePlayers[playerIndex].displayName;
        cbTile.playerID = availablePlayers[playerIndex].playerID;
        cbTile.style.display = 'inline';

        /*
        cbTile.firstChild.onclick = (evt) => {
          console.log('here');
          console.log(cbTile.firstChild.value);
          cbTile.fill = cbTile.firstChild.value == 0 ? 'fb-green' : 'fb-white';
          //cbTile.firstChild.fill = cbTile.fill;
          console.log(cbTile.fill);
        }
        */
        
        console.log('Setting Up: ' + cbTile.text + " | " + "Display: " + cbTile.style.display + " | Height: " + cbTile.height);
      }
    }
    screen.getElementById('tile-list').value = 0;
  }  
  screenTools.showScreen(screen.id);
  
}

/** @function setSelectedPlayers
* Update the gameState with selected players
* @param {object} gameState Details about the game.
*/
function setSelectedPlayers(gameState) {  
   
 /*
    document.getElementById('srnSelectPlayers').getElementsByClassName("select-player-tile").forEach((tile, index) => {
      console.log(tile.text + ' | value: ' + tile.firstChild.value); 
    });
 */
  
  let selectedPlayers = [];
  let pi = 0;
  let tiles = document.getElementById('srnSelectPlayers').getElementsByClassName("select-player-tile");
  for (let tileIndex = 0;  tileIndex < tiles.length; tileIndex++) {
    if (tiles[tileIndex].firstChild.value) {
      selectedPlayers[pi] = tiles[tileIndex].playerID
      pi++;
    }
  }
  
  gameState.setPlayers(selectedPlayers);
  document.getElementById('srnMain').getElementById('btnPickPlayers').text = gameState.getPickPlayersText();
  screenTools.showScreen('srnMain');
  
  // for (let i = 0;  i < selectedPlayers.length; i++) {
  //  console.log('playerID: ' + selectedPlayers[i]);
  //}
  
}
  