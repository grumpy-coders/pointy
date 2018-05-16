import document from "document";
import {
  showScreen
} from "./screen-tools.js";
import {
  screenCourseDetailsInit
} from "./course-details.js";
import * as srnGame from "./game-golf.js";

/** @function showHoleDetails
 * Updates the hole details screen then shows it.
 * @param {object} gameState  The current game state.
 */
export function screenHoleDetailsInit(holeToShow, gameState) {
  if (holeToShow <= 0 || holeToShow > gameState.course.holes.length) {
    console.log("No more holes");
    return;
  }
  document.onkeypress = function (e) {
    e.preventDefault();
    switch (e.key) {
      case "up":
        screenHoleDetailsInit(holeToShow + 1, gameState);
        break;
      case "down":
        screenHoleDetailsInit(holeToShow - 1, gameState);
        break;
      case "back":
        unbindEvents();
        srnGame.bindEvents(gameState, null);
        showScreen('srnGame');
    }
  }

  let srnHoleDetails = document.getElementById("srnHoleDetails");
  let scrollview = srnHoleDetails.getElementById("scrollview");
  
  scrollview.onmousedown = function (evt) {
		gameState.lastY = evt.screenY;
		gameState.lastX = evt.screenX;
	}

	scrollview.onmouseup = function (evt) {
		let yMove = evt.screenY - gameState.lastY;
		let xMove = evt.screenX - gameState.lastX;

		if (yMove < -60) {
			// console.log('swipe up')  
		};

		if (yMove > 60) {
			// console.log('swipe down')
		};

		if (xMove < -60) {
			// console.log('swipe left');
			screenHoleDetailsInit(holeToShow + 1, gameState);
		};

		if (xMove > 60) {
			// console.log('swipe right')
			screenHoleDetailsInit(holeToShow - 1, gameState);
		};

	}
  

  srnHoleDetails.getElementById('btnCourseDetails').onclick = function () {
    screenCourseDetailsInit(gameState);
  }

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

/** @function unbindEvents
 * Unbinds all of the events
 * @param {bool} hide Hide the player elements
 */
function unbindEvents() {
  
  document.onkeypress = null;
  let srnHoleDetails = document.getElementById("srnHoleDetails");
  srnHoleDetails.getElementById("scrollview").onmousedown = null;
  srnHoleDetails.getElementById("scrollview").onmouseup = null;
  srnHoleDetails.getElementById('btnCourseDetails').onclick = null;
}