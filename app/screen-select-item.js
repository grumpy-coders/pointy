import document from "document";
import * as screenTools from "./screenTools.js";
import * as fs from 'fs';

/** @function selectCourseInit
* Sets the screen-select-item up for courses.
*/
export function selectCourse() {
  console.log('selectCourse: begin')
  let srnSelectItem = setupSelectItem();
  let items = fs.readFileSync('./resources/courses/courses.json', 'json');
  for (let i = 0; i < courses.length; i++) {
      let item = srnSelectItem.getElementById('');
      item.text = courses[i].courseName;
      item.style.display = 'inline';
      item.itemID = courses[i].courseID
  }  
  screenTools.showScreen(srnSelectItem.id);  
}

/** @function selectGameInit
* Updates the course screen and shows the screen.
* Sets the screen-select-item up for games.
*/
export function selectGame() {
  console.log('selectGame: begin')
  let srnSelectItem = setupSelectItem();
  
  screenTools.showScreen(srnSelectItem.id);  
}

/** @function setupSelectItem
* Hides all of the selectable items
* @return Returns a reference to the select-item screen.
*/
function setupSelectItem() {
  let srnSelectItem = document.getElementById("srnSelectItem");
    
   srnSelectItem.getElementsByClassName('selectable-item').forEach(function(item) { 
   if (typeof item.style != 'undefined') {
     item.style.display = "none"; 
     item.onclick = null;
   }
  });
  
  return srnSelectItem;
}

/** @function removeOnclickEvents
* Removes all of the current onclick bindings from the selectable items.
*/
function removeOnclickEvents() {
  
}
