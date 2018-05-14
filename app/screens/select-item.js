import document from "document";
import * as screenTools from "./screen-tools.js";
import * as fs from 'fs';

//import * as tools from './tools.js';

/** @function setupItem
 * Sets up the select item.
 */
function setupItem(gameState, methodName, item, element, button) {

	if (typeof item.enabled != "undefined" && !item.enabled) {
		return;
	}

	let label = element.getElementById('label');
	label.text = item.Name;
	label.itemID = parseInt(item.id);
	label.style.fill = button.style.fill;
	label.getElementById('text').style.fill = label.style.fill;
	label.onclick = function (item) {
		document.onkeypress = null;
		console.log(methodName);
		switch (methodName) {
			case 'setCourse':
				gameState.setCourse(label.itemID);
				break;
			case 'selectGame':
				gameState.setGame(label.itemID);
				break;
		}
		//eval(methodName)(label.itemID);
		// tools.listProperties(label);
		// func(label.itemID)
		button.text = label.text.substring(0, 11).trim();
		screenTools.showScreen('srnMain');
	};
	element.style.display = 'inline';
}

/** @function selectCourse
 * Sets the screen-select-item up for courses.
 */
export function selectCourse(gameState) {
	setupSelectItem(gameState, 'setCourse', document.getElementById("srnMain").getElementById('btnSelectCourse'), gameState.getCoursesPath());
}

/** @function selectGame
 * Updates the course screen and shows the screen.
 * Sets the screen-select-item up for games.
 */
export function selectGame(gameState) {
	setupSelectItem(gameState, 'selectGame', document.getElementById("srnMain").getElementById('btnSelectGame'), gameState.getGamesPath());
}

/** @function setupSelectItem
 * Hides all of the selectable items, that are not in the list of items
 * Sets up the event binds and shows the screen.
 */
function setupSelectItem(gameState, methodName, button, filePath) {
	let srnSelectItem = document.getElementById("srnSelectItem");
	let items = srnSelectItem.getElementsByClassName('select-player-tile');
	for (let i = 0, length = items.length; i < length; i++) {
		items[i].style.display = 'none';
		items[i].onclick = null;
	}

	let items = fs.readFileSync(filePath, 'json');
	for (let i = 0, length = items.length; i < length; i++) {
		setupItem(gameState, methodName, items[i], srnSelectItem.getElementById('item' + i), button)
	}

	bindEvents();
	srnSelectItem.getElementById('tile-list').value = 0;
	screenTools.showScreen(srnSelectItem.id);
}

/** @function bindEvents
 * Removes the event bindings for the screen.
 */
function unbindEvents(srnSelectItem) {
	document.onkeypress = null;
	let items = srnSelectItem.getElementsByClassName('select-player-tile');
	for (let i = 0, length = items.length; i < length; i++) {
		items[i].onclick = null;
	}
}

/** @function bindEvents
 * Creates the event bindings for the screen.
 */
function bindEvents() {
	document.onkeypress = function (e) {
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