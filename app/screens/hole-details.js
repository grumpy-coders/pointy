import document from "document";
import { showScreen } from "./screenTools.js";
import { screenCourseDetailsInit } from "./screen-course-details.js";
import { enableGameEvents } from "./screen-game.js";

/** @function showHoleDetails
* Updates the hole details screen then shows it.
* @param {object} gameState  The current game state.
*/
export function screenHoleDetailsInit(holeToShow, gameState) {    
  if ( holeToShow <= 0 || holeToShow > gameState.course.holes.length) {
    console.log("No more holes");
    return;
  }   
  document.onkeypress = function(e) {
    e.preventDefault();
    switch (e.key) {
      case "up": 
        screenHoleDetailsInit(holeToShow + 1, gameState);
        break;
      case "down":
        screenHoleDetailsInit(holeToShow - 1, gameState);
        break;
      case "back":
        enableGameEvents(gameState, null);
        showScreen('srnGame');
    }
  }
    
  let srnHoleDetails = document.getElementById("srnHoleDetails");
  
  srnHoleDetails.getElementById('btnCourseDetails').onclick = function() { screenCourseDetailsInit(gameState); }
     
  let index = holeToShow - 1;
  srnHoleDetails.getElementById('txtHole').text = "Hole " + holeToShow;
  srnHoleDetails.getElementById('txtPar').text = "Par: " + gameState.course.holes[index].par;
  srnHoleDetails.getElementById('txtDistance').text = "Distance: " + gameState.course.holes[index].stdistance;
  srnHoleDetails.getElementById('txtLgDistance').text = "Long Distance: " + gameState.course.holes[index].ltdistance;
  let imagePath = gameState.course.holes[index].image;
  let image = srnHoleDetails.getElementById('imgHole');      
  if (typeof imagePath != 'undefined' && imagePath != '') {
    image.href = imagePath;
    image.style.display = "inline";
  } else {
    image.href = "";
    image.style.display = "none;"
  }
  
  srnHoleDetails.getElementById("scrollview").value = 0;
  showScreen(srnHoleDetails.id);
}
