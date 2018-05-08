import document from "document";
import * as screenTools from "./screenTools.js";
import * as constants from './constants.js';
import { screenHoleDetailsInit } from './screen-hole-details.js';
import { screenMainInit } from './screen-main.js';
import { GameState } from './classes/GameState.js';

/** @function startGame
* Starts a new game
* @param {object} gameState Details about the game.
*/
export function screenGameInit(gameState) {  
  let srnGame = document.getElementById("srnGame");
    
  for(let i = 0; i < gameState.players.length; i++) {
    let player = gameState.players[i];    
        
    srnGame.getElementById("sv" + i).style.display = "inline";
    let playerState = srnGame.getElementById("gamePlayer" + i);
    
    
    playerState.getElementById("playerIndex").value = i;
    playerState.getElementById('bottomLine').style.fill = playerState.style.fill;
    playerState.getElementById('totalScore').style.fill = playerState.style.fill;        
    playerState.style.display = "inline";
    
    let name = playerState.getElementById('name');
    name.text = player.firstName
    name.style.fill = playerState.style.fill;
             
    let score = playerState.getElementById('score');
    score.text = 0;    
    score.style.fill = playerState.style.fill;
        
    let btnUp = playerState.getElementById('btnUp');    
    btnUp.style.fill = playerState.style.fill;
    btnUp.getElementById('text').style.fill = playerState.style.fill;
    btnUp.onclick =  function() { changeScore(gameState, playerState, 1) };
    
    let btnDown = playerState.getElementById('btnDown');
    btnDown.style.fill = playerState.style.fill;
    btnDown.getElementById('text').style.fill = playerState.style.fill;       
    btnDown.onclick =  function() { changeScore(gameState, playerState, -1) };   
        
  }
  enableGameEvents(gameState, srnGame);
  changeHole(srnGame, gameState, 0);
  // This fixes the screen loadding with all the scrollview items overlapping in the frist position.
  srnGame.getElementById("scrollview").value = 0;
  screenTools.showScreen(srnGame.id);  
}

/** @function enableGameEvents
* Sets up the evnets for the game screen.
* @param {object} gameState Details about the game.
* @param {object} srnGame Reference to the game screen.
*/
export function enableGameEvents(gameState, srnGame) {
  console.log('enableGameEvents');
  if (!srnGame) {
    srnGame = document.getElementById("srnGame");
  }
  
  srnGame.getElementById('txtHole').onclick = function() { screenHoleDetailsInit(gameState.currentHole, gameState); }
  srnGame.getElementById('btnFinish').onclick = function() { endGame(gameState); }

  document.onkeypress = function(e) {
      e.preventDefault();
      console.log('hardware button');
      console.log('e.key: ' + e.key);
      switch (e.key) {
        case "up":
            console.log('hole up');
            changeHole(srnGame, gameState, 1);          
          break;
        case "down":
            console.log('hole down');
            changeHole(srnGame, gameState, -1);
          break;
        case "back":
          console.log('back');
          endGame(gameState);
      }
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
  let holeIndex = gameState.currentHole -1;
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
  for (let i = 0; i < player.holes.length && i < gameState.currentHole; i++) {
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
  let newHole =  gameState.currentHole + modifier;

  if (newHole > gameState.course.holes.length) {
    console.log("Game Over");
    return;
  }
  
  if (newHole < 1) {
    console.log('Nope not today. There is not hole 0');
    return;
  }
  
  gameState.currentHole = newHole;    
  srnGame.getElementById("txtHole").text = "H" + gameState.currentHole + " | P" + gameState.course.holes[gameState.currentHole -1].par + ' | TP' + getTotalPar(gameState);  
  for (let playerIndex = 0;  playerIndex < gameState.players.length; playerIndex++) {
    let playerState = srnGame.getElementById("gamePlayer" +  playerIndex);
    let player =  gameState.players[playerIndex];
    let score = player.holes[gameState.currentHole -1];
    playerState.getElementById('score').text = score;      
    playerState.getElementById('score').style.fill = (score > gameState.course.holes[gameState.currentHole -1].par) ? constants.RED_HEX : playerState.style.fill;
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
  srnYorN.getElementById('btnYes').onclick = function() { 
    unbindEvents()
    screenMainInit(new GameState(0, 0, [])); 
  }
  srnYorN.getElementById('btnNo').onclick = function() { 
    srnYorN.getElementById('btnNo').onclick = null;
    screenTools.showScreen('srnGame'); 
  }
  screenTools.showScreen(srnYorN.id);    
}

/** @function getTotalPar
* Gets the total par up to the current hole.
* @param {object} gameState Current state of the game.
*/
function getTotalPar(gameState) {
  let total = 0;  
  for (let h = 0;  h < gameState.course.holes.length && h < gameState.currentHole; h++) { 
    total += gameState.course.holes[h].par; 
  }
  return total;
}

/** @function unbindEvents
* Unbinds all of the events
*/
function unbindEvents() {
  let srnGame = document.getElementById("srnGame");  
  srnGame.getElementById('txtHole').onclick = null;
  srnGame.getElementById('btnFinish').onclick = null;
  document.onkeypress = null;
  let players = srnGame.getElementsByClassName("player");
  for (let p = 0;  p < players.length; p++) {
    let player = players[p];
    player.getElementById('btnDown').onclick = null;
    player.getElementById('btnUp').onclick = null;
    player.style.display = 'none';
  }
}