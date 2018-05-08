import document from "document";
import * as screenTools from "./screenTools.js";
import * as fs from 'fs';

/** @function selectCourseInit
* Sets the screen-select-item up for courses.
*/
export function selectCourse(gameState) {
  let srnSelectItem = setupSelectItem();  
  let items = fs.readFileSync(gameState.getCoursesPath(), 'json');
  for (let i = 0; i < items.length; i++) {

      let item = srnSelectItem.getElementById('item' + i);     
      item.style.display = 'inline';
          
      let label = item.getElementById('label');
      label.text = items[i].Name;
      label.itemID = parseInt(items[i].id);
      label.onclick = function(item) {
        document.onkeypress = null;
        gameState.setCourse(label.itemID)
        document.getElementById("srnMain").getElementById('btnSelectCourse').text = formatText(label.text);
        screenTools.showScreen('srnMain');
      };          
  }
  srnSelectItem.getElementById('tile-list').value = 0;
  screenTools.showScreen(srnSelectItem.id);  
}


/** @function selectGameInit
* Updates the course screen and shows the screen.
* Sets the screen-select-item up for games.
*/
export function selectGame(gameState) {
  console.log('selectGame: begin')
  let srnSelectItem = setupSelectItem();
  
  let items = fs.readFileSync(gameState.getGamesPath(), 'json');
  for (let i = 0; i < items.length; i++) {

      let item = srnSelectItem.getElementById('item' + i);     
      item.style.display = 'inline';
          
      let label = item.getElementById('label');
      label.text = items[i].Name;
      label.itemID = parseInt(items[i].id);
      label.onclick = function(item) {
        document.onkeypress = null;
        gameState.setGame(label.itemID)
        document.getElementById("srnMain").getElementById('btnSelectGame').text = formatText(label.text);
        screenTools.showScreen('srnMain');
      };          
  }
  srnSelectItem.getElementById('tile-list').value = 0;
  screenTools.showScreen(srnSelectItem.id);
}

/** @function formatText
* Formats the text to show in combo button.
* @return Returns a reference to the select-item screen.
*/
function formatText(string) {
  return string.substring(0,11).trim();
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
  bindEvents();
  return srnSelectItem;
}

/** @function bindEvents
* Creates the event bindings for the screen.
*/
function bindEvents() {
  document.onkeypress = function(e) {
    e.preventDefault();
    switch (e.key) {
      case "up": 
        console.log('up');
        break;
      case "down":
        console.log('down');
        break;
      case "back":
        document.onkeypress = null;
        screenTools.showScreen('srnMain');
    }
  }
}
