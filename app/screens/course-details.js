import document from "document";
import { showScreen } from "./screen-tools.js";


/** @function screenCourseDetailsInit
* Updates the course screen and shows the screen.
* @param {object} gameState  The current game state.
*/
export function screenCourseDetailsInit(gameState) {
  console.log("screenCourseDetailsInit");
  let courseDetailsScreen = document.getElementById("srnCourseDetails");
    
  courseDetailsScreen.getElementById('txtBack').getElementById('header').onclick = function() { showScreen("srnHoleDetails"); }    
  courseDetailsScreen.getElementById("txtCourseName").getElementById('copy').text = gameState.course.courseName;
  courseDetailsScreen.getElementById("txtParkName").getElementById('copy').text = gameState.course.parkName;
  courseDetailsScreen.getElementById("txtTerrain").getElementById('copy').text = gameState.course.terrain;
  courseDetailsScreen.getElementById("txtUnits").getElementById('copy').text = gameState.course.distanceUnits;
  courseDetailsScreen.getElementById("txtHoleType").getElementById('copy').text = gameState.course.holeType;
  courseDetailsScreen.getElementById("txtDescription").getElementById('copy').text = gameState.course.description;  
  showScreen(courseDetailsScreen.id);
}