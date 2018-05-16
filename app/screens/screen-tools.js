import document from "document";

/** @function showScreen
 * Hides all of the screens then shows the passed screen.
 * @param {string} screenName  Name of the screen to show; pass "none" to hide all screens.
 */
export function showScreen(screenName) {
  let screens = document.getElementsByClassName('screen');
  for (let s = 0, length = screens.length; s < length; s++) {
    if (screens[s].id == screenName) {
      screens[s].style.display = "inline";
    } else {
      screens[s].style.display = "none";
    }
  }   
}

/** @function hideElements
 * Hides all of the classes on a screen.
 * @param {object} screen Screen object.
 * @param {string} className Name of the class to hid.
 */
export function hideElements(screen, className) {
  let elements = screen.getElementsByClassName(className)
  for (let e = 0, length = elements.length; e < length; e++) {
    elements[e].style.display = "none";
  }
}