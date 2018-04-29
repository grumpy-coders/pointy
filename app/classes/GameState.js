import * as fs from 'fs';
import { DeviceInfo } from 'DeviceInfo.js';

/** @class GameState
* Contains all of the information about the state of the current game.
*/
export class GameState {
  
  deviceInfo = new DeviceInfo();
  game = null;
  players = null;
  currentHole = 1;

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
  getAvailablePlayers() { return fs.readFileSync('./resources/players/players.json', 'json'); }
  
  /**
   * Sets the current course.
   * @return {null} Returns void.
  */
  setCourse(courseID) {
    let courses = fs.readFileSync('./resources/courses/courses.json', 'json');
    let courseData = null;

    for (let i = 0; i < courses.length; i++) {
      if (courseID == courses[i].courseID) {
        this.course = fs.readFileSync(courses[i].path, 'json');
        break;
      }
    }
  }

  /**
   * Sets the current game.
   * @return {null} Returns void.
  */
  setGame(gameID) {
     this.game = { gameID: 1, name: "Disc Golf" }
  }

  /**
   * Sets the current players.
   * @return {null} Returns void.
  */
  setPlayers(playerIDs) {                  
    if (playerIDs == null || typeof playerIDs == 'undefined' || playerIDs.length < 1) {
      this.players = null;
    }
    let player0 = { playerID: 1, firstName: "Tom" };
    let player1 = { playerID: 2, firstName: "Wade" };
    let player2 = { playerID: 3, firstName: "Ben" };
    let player3 = { playerID: 4, firstName: "Jack" };
    let player4 = { playerID: 5, firstName: "Sam" };
    let player5 = { playerID: 6, firstName: "Bill" };
    let allPlayers = [player0, player1, player2, player3, player4, player5];             
    let selectedPlayers = new Array(playerIDs.length);

    for (let pi = 0; pi < playerIDs.length; pi++) {                
      for (let playerIndex in allPlayers) {
        if (allPlayers[playerIndex].playerID == playerIDs[pi]) {
          selectedPlayers[pi] = allPlayers[playerIndex];
          // Add the holes to the player.  
          // Will switch to .fill when fitbit sdk supports it.     
          selectedPlayers[pi].holes =  new Array(this.course.holes.length);
          for (let h = 0; h < selectedPlayers[pi].holes.length; h++ ) { selectedPlayers[pi].holes[h] = 0; }
          break;
        }
      }
    }           
    this.players = selectedPlayers;

  }
  
  /**
   * Gets a string version of the object.
   * @return {string} String version of the object.
  */
  toString() { return 'game: ' + this.game.name + '(' +  this.game.gameID + ') | ' + 'players: ' + this.players.length; }
    
}