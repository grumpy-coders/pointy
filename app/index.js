/*
 * Entry point for the watch app
 * ng = newgame
 * Space Invador png came from https://www.game.es/videojuegos
 * Images from https://www.iconfinder.com
 * Abacus.png (icon.png) from Aha-Soft
 * Got the course data for Flatrocks from https://www.dgcoursereview.com/course.php?id=60
 */
import document from 'document';
import { showScreen } from './screenTools.js';
import { screenGameInit } from './screen-game.js';
import { createGameState } from './createGameState.js';
import { screenSelectPlayersInit } from './screen-select-player.js';
import { GameState } from './classes/GameState.js'
import { selectCourse } from './screen-select-item.js'
import { selectGame } from './screen-select-item.js'

//var gameState = createGameState(1, 1, [1,2,3,4,5,6]);

var gameState = new GameState(0, 0, []);
//console.log(gameState.deviceInfo.toString());
console.log(gameState.toString());

screenMainInit();

function screenMainInit() {
  let scrMain = document.getElementById('srnMain');
  scrMain.getElementById('btnSelectCourse').onclick = function() { selectCourse(gameState); }
  scrMain.getElementById('btnSelectGame').onclick = function() { selectGame(gameState); }    
  scrMain.getElementById('btnPickPlayers').onclick = function() { screenSelectPlayersInit(gameState); }
  scrMain.getElementById('ngBtnStart').onclick = function() { screenGameInit(gameState); }  
  scrMain.getElementsByClassName("main-button").forEach((element, index) => { element.height = gameState.deviceInfo.squareButtonIconSize;}  );
  showScreen("srnMain");
}
