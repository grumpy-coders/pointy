import document from 'document';
import {
  screenGameInit
} from './game.js';
import {
  screenSelectPlayersInit
} from './select-player.js';
import {
  selectCourse
} from './select-item.js'
import {
  selectGame
} from './select-item.js'
import {
  me
} from "appbit";
import * as st from './screen-tools.js'
import * as constants from '../constants.js'
import * as fs from 'fs';
import {
  GameState
} from '../classes/GameState.js'
import {
  unbindEvents
} from './alert.js';

/** @function screenMainInit
 * Sets up the main screen.
 * @param {object} gameState  The current game state.
 */
export function screenMainInit(gameState) {

  if (gameState == null) {
    console.log('gameState is null');
    let gameID = getDefaultID(constants.DEFAULT_GAME_FILE_PATH);
    let courseID = getDefaultID(constants.DEFAULT_GAME_FILE_PATH);

    gameState = new GameState(gameID, courseID, [])

  }

  document.onkeypress = function (e) {
    e.preventDefault();
    switch (e.key) {
      case "up":
        console.log('main.up');
        break;
      case "down":
        console.log('main.down');
        break;
      case "back":
        console.log('main.back');
        let srnYorN = document.getElementById('srnYorN');
        srnYorN.getElementById('title').text = 'Exit?';
        srnYorN.getElementById('btnYes').onclick = function () {
          me.exit();
        }
        srnYorN.getElementById('btnNo').onclick = function () {
          st.showScreen('srnMain');
        }
        st.showScreen(srnYorN.id);
    }
  }

  let scrMain = document.getElementById('srnMain');
  let btnSelectGame = scrMain.getElementById('btnSelectGame')
  if (gameState.game == null) {
    btnSelectGame.text = 'Pick Game';
  } else {
    btnSelectGame.text = gameState.game.Name.substring(0, 11).trim();
  }
  btnSelectGame.onclick = function () {
    selectGame(gameState);
  }

  let btnSelectCourse = scrMain.getElementById('btnSelectCourse');
  if (gameState.game == null) {
    btnSelectCourse.text = 'Pick Course';
  } else {
    btnSelectCourse.text = gameState.course.courseName.substring(0, 11).trim();
  }
  btnSelectCourse.onclick = function () {
    selectCourse(gameState);
  }

  let btnPickPlayers = scrMain.getElementById('btnPickPlayers');
  btnPickPlayers.text = 'Pick Players';
  btnPickPlayers.onclick = function () {
    screenSelectPlayersInit(gameState);
  }

  scrMain.getElementById('btnStart').onclick = function () {
    // Unbind the click fixes the "Fitbit OS Simulator" from lossing connection.
    document.onkeypress = null;
    scrMain.getElementById('btnStart').onclick = null;
    btnSelectGame.onclick = null;
    btnSelectCourse.onclick = null;
    btnPickPlayers.onclick = null;
    screenGameInit(gameState);
  }
  scrMain.getElementsByClassName("main-button").forEach((element, index) => {
    element.height = gameState.deviceInfo.squareButtonIconSize;
  });
  st.showScreen(scrMain.id);
}

/** @function getDefaultID
 * Get the ID from the default file.
 * @param {string} defaultFilePath Path to default file.
 */
function getDefaultID(defaultFilePath) {
  let id;
  try {
    id = JSON.parse(fs.readFileSync(defaultFilePath, 'json')).selected;
  } catch (error) {
    id = 0;
  }
  return id;
}