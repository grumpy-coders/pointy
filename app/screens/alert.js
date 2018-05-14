import { showScreen } from "./screen-tools.js";
import * as st from './screen-tools.js';
import document from "document";
import * as tools from "./tools.js";

/** @function show
 * Shows an alert to the user
 * @param {object} message Message to show the user.
 * @param {func} Function to run when the user presses ok.
 */
export function show(message, func) {
  let alert = document.getElementById('srnAlert');
  if (alert == null) {
    console.error("Can't find Alert");
    return;
  }
  // tools.listProperties(alert);
  alert.getElementById('message').text = message;
  alert.getElementById('btnOk').onclick = func;
  bindEvents(func);
  st.showScreen(alert.id);
}

/** @function bindEvents
 * Sets up the evnets for the alert screen.
 */
function bindEvents(func) {
  	document.onkeypress = function (e) {
		e.preventDefault();
		switch (e.key) {
			case "up":
				break;
			case "down":
				break;
			case "back":
        unbindEvents();
				func();
		}
	}
}

/** @function unbindEvents
 * Sets up the evnets for the alert screen.
 */
export function unbindEvents() {
  document.onkeypress = null;
  document.getElementById('srnAlert').getElementById('btnOk').onclick = null;
}




