import document from "document";
import * as fs from 'fs';

/** @function showScreen
* Hides all of the screens then shows the passed screen.
* @param {string} screenName  Name of the screen to show; pass "none" to hide all screens.
*/
export function showScreen(screenName) {
  
   document.getElementsByClassName('screen').forEach(function(screen) { 
   if (typeof screen.style != 'undefined') {
     screen.style.display = "none"; 
   }
  });
  
  if (screenName != "none") {
    document.getElementById(screenName).style.display = "inline";
  }
  
}

/** @function hideElements
* Hides all of the classes on a screen.
* @param {object} screen Screen object.
* @param {string} className Name of the class to hid.
*/
export function hideElements(screen, className) {
  let elements = screen.getElementsByClassName(className)
  for (let e = 0; e < elements.length; e++ ) { elements[e].style.display = "none"; }
}

/** @function listProperties
* Lists all of the properties for a given object.
*/
export function listProperties(object) {
 for(var key in object) {
   try{
     console.log('Key: ' + key + ' | value: ' + object[key]);
   } catch (error) {
    // Some values throw an error when trying to access them.
    console.log('Key: ' + key + ' | Error: ' + error.message);
   }
  }   
}
