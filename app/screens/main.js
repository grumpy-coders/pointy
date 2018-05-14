import document from 'document';
import { showScreen } from './screenTools.js';
import { screenGameInit } from './screen-game.js';
import { createGameState } from './createGameState.js';
import { screenSelectPlayersInit } from './screen-select-player.js';
import { selectCourse } from './screen-select-item.js'
import { selectGame } from './screen-select-item.js'
import { me } from "appbit";
import * as screenTools from './screenTools.js'

/** @function screenMainInit
* Sets up the main screen.
*/
export function screenMainInit(gameState) {
  
  document.onkeypress = function(e) {
    e.preventDefault();
    switch (e.key) {
      case "up":
        console.log('main.up');
        break;
      case "down":
        console.log('main.down');
        break;
      case "back":
        let srnYorN = document.getElementById('srnYorN');
        srnYorN.getElementById('title').text = 'Exit?';
        srnYorN.getElementById('btnYes').onclick = function() { me.exit(); }
        srnYorN.getElementById('btnNo').onclick = function() { showScreen('srnMain'); }
        screenTools.showScreen(srnYorN.id);
    }
  }

    
  let scrMain = document.getElementById('srnMain');
  
  let btnSelectGame = scrMain.getElementById('btnSelectGame')
  btnSelectGame.text = 'Pick Game';
  btnSelectGame.onclick = function() { selectGame(gameState); }    
  
  let btnSelectCourse = scrMain.getElementById('btnSelectCourse');
  btnSelectCourse.text = 'Pick Course';
  btnSelectCourse.onclick = function() { selectCourse(gameState); }
  
  let btnPickPlayers = scrMain.getElementById('btnPickPlayers');
  btnPickPlayers.text = 'Pick Players';
  btnPickPlayers.onclick = function() { screenSelectPlayersInit(gameState); }
  
  scrMain.getElementById('btnStart').onclick = function() {
    // Unbind the click fixes the "Fitbit OS Simulator" from lossing connection.
    document.onkeypress = null;
    scrMain.getElementById('btnStart').onclick = null;
    btnSelectGame.onclick = null;
    btnSelectCourse.onclick = null;
    btnPickPlayers.onclick = null;    
    screenGameInit(gameState); 
  }  
  scrMain.getElementsByClassName("main-button").forEach((element, index) => { element.height = gameState.deviceInfo.squareButtonIconSize;}  );  
  showScreen(scrMain.id);
}

