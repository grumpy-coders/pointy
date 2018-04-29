import document from "document";
import * as screenTools from "./screenTools.js";

/** @function screenSelectPlayersInit
* Sets up the select players screen.
* @param {object} gameState Details about the game.
*/
export function screenSelectPlayersInit(gameState) {
  let availablePlayers = gameState.getAvailablePlayers();
  let screen = document.getElementById('srnSelectPlayers');
    
  screen.getElementById('btnDone').onclick = function() { console.log('here'); setSelectedPlayers(gameState); }
  
  screenTools.hideAllClass(screen, 'checkbox-tile');
    
  for (let playerIndex = 0;  playerIndex < availablePlayers.length; playerIndex++) {
    let cbTile = screen.getElementById('chk' + playerIndex);
    if (cbTile != null) {
      cbTile.text = availablePlayers[playerIndex].displayName;
      cbTile.style.display = "inline";  
      console.log('Setting Up: ' + cbTile.text + " | " + "Display: " + cbTile.style.display + " | Height: " + cbTile.height);
    }
  }
    
  screen.getElementById('tile-list').value = 0;
  screenTools.showScreen(screen.id);
  
}

/** @function setSelectedPlayers
* Update the gameState with selected players
* @param {object} gameState Details about the game.
*/
function setSelectedPlayers(gameState) {
  console.log('setSelectedPlayers');
  let screen = document.getElementById('srnSelectPlayers');
  let checkboxes = screen.getElementsByClassName("cb-tile");
  let availablePlayers = gameState.getAvailablePlayers();
  
  for (let i = 0;  i < checkboxes.length; i++) {
    let checkbox = checkboxes[i];
    if (checkbox.style.display = "inline"){
        console.log("selected: " + checkbox.text);
    }
    
  }

  
}