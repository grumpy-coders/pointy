import document from "document";
import { showScreen } from "./screenTools.js";
import { screenCourseDetailsInit } from "./screen-course-details.js";

/** @function showHoleDetails
* Updates the hole details screen then shows it.
* @param {object} gameState  The current game state.
*/
export function screenHoleDetailsInit(gameState) {    
  if ( gameState.currentHole < 0 || gameState.currentHole > gameState.course.holes.lenght) {
    conole.log("Really? How in the did this happen?");
    return;
  }
  
  let srnHoleDetails = document.getElementById("srnHoleDetails");
  if (srnHoleDetails == null) {
    console.log("srnHoleDetails is null");
    return;
  }
  srnHoleDetails.getElementById('btnCourseDetails').onclick = function() { screenCourseDetailsInit(gameState); }
  srnHoleDetails.getElementById('btnBack').onclick = function() { showScreen('srnGame'); }
   
  let index = gameState.currentHole - 1;
  srnHoleDetails.getElementById('txtHole').text = "Hole " + gameState.currentHole;
  srnHoleDetails.getElementById('txtPar').text = "Par: " + gameState.course.holes[index].par;
  srnHoleDetails.getElementById('txtDistance').text = "Distance: " + gameState.course.holes[index].stdistance;
  srnHoleDetails.getElementById('txtLgDistance').text = "Long Distance: " + gameState.course.holes[index].ltdistance;
  let imagePath = gameState.course.holes[index].image;
  console.log('ip: ' + imagePath);
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