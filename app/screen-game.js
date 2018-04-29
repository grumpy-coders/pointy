import document from "document";
import * as screenTools from "./screenTools.js";
import * as constants from './constants.js';
import { screenHoleDetailsInit } from './screen-hole-details.js';

/** @function startGame
* Starts a new game
* @param {object} gameState Details about the game.
*/
export function screenGameInit(gameState) {  
  let srnGame = document.getElementById("srnGame");
      
  srnGame.getElementById('txtHole').getElementById('header').onclick = function() { 
    console.log('header.onclick');
    screenHoleDetailsInit(gameState); 
  }
    
  srnGame.getElementById('btnPreviousHole').onclick = function() { 
    if (gameState.currentHole == 1) {
      console.log('Nope not today. There is not hole 0');
      return;
    }      
    gameState.currentHole--; 
    changeHole(srnGame, gameState); 
  }
  
  srnGame.getElementById('btnNextHole').onclick = function() {
    gameState.currentHole++;
    changeHole(srnGame, gameState); 
  }
  
  
  for(let i = 0; i < gameState.players.length; i++) {
    let player = gameState.players[i];
        
    srnGame.getElementById("sv" + i).style.display = "inline";
    let playerState = srnGame.getElementById("gamePlayer" + i);
    
    playerState.getElementById("playerIndex").text = i;
    playerState.getElementById('bottomLine').style.fill = playerState.style.fill;
    playerState.getElementById('totalScore').style.fill = playerState.style.fill;        
    playerState.style.display = "inline";
    
    let name = playerState.getElementById('name');
    name.text = player.firstName
    name.style.fill = playerState.style.fill;
             
    let score = playerState.getElementById('score');
    score.text = 0;    
    score.style.fill = playerState.style.fill;
    
    // Hack...cough...hack (Should be drawing a polygon)
    console.log(player.firstName + " color: " + playerState.style.fill);
    let btnUp = playerState.getElementById('btnUp');
    let btnDown = playerState.getElementById('btnDown');
    
    switch(playerState.style.fill) {
      case constants.PURPLE:
        btnUp.href = "graphics\\up-purple.png";
        btnDown.href = "graphics\\down-purple.png";
        break;
      case constants.ORANGE:
        btnUp.href = "graphics\\up-orange.png";
        btnDown.href = "graphics\\down-orange.png";
        break;
      case constants.YELLOW:
        btnUp.href = "graphics\\up-yellow.png";
        btnDown.href = "graphics\\down-yellow.png";
        break;
      case constants.GREEN:
        btnUp.href = "graphics\\up-green.png";
        btnDown.href = "graphics\\down-green.png";
        break;
      case constants.CYAN:
        btnUp.href = "graphics\\up-cyan.png";
        btnDown.href = "graphics\\down-cyan.png";
        break;
      case constants.WHITE:
        btnUp.href = "graphics\\up-white.png";
        btnDown.href = "graphics\\down-white.png";
        break;
    }
    
    btnUp.onclick =  function() { changeScore(gameState, playerState, 1) };
    btnDown.onclick =  function() { changeScore(gameState, playerState, -1) };   
        
  }
  changeHole(srnGame, gameState);
  // This fixes the screen loadding with all the scrollview items overlapping in the frist position.
  srnGame.getElementById("scrollview").value = 0;
  screenTools.showScreen(srnGame.id);  
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
  let player = gameState.players[playerState.getElementById('playerIndex').text];
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
* @param {srnGame} Game screen
* @param {object} gameState Current state of the game.
*/
function changeHole(srnGame, gameState) {
    
  if ( gameState.currentHole > gameState.course.holes.lenght) {
    gameState.currentHole = gameState.course.holes.lenght;
    conole.log("Game Over");
    return;
  }
  
  srnGame.getElementById("txtHole").getElementById("header").text = "H " + gameState.currentHole + " | P " + gameState.course.holes[gameState.currentHole -1].par;  
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
export function endGame(game) {
  screenTools.hideElements(document.getElementById("srnGame"), 'scrollview-player'); 
}