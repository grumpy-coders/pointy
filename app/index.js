/*
 * Entry point for the watch app
 *!* ******************************************************************************
 *!* Images *!*
 * Space Invader png came from https://www.game.es/videojuegos
 * Images from https://www.iconfinder.com
 *    -- back.png
 *    -- course.png
 *    -- green-light.png
 *    -- pick-players.png
 *    -- previous-hole.png
 *    -- user-green.png
 * Abacus.png (icon.png) from Aha-Soft
 * Cthulhu from http://www.softicons.com/object-icons/richs-misc-icons-by-rich-d/cthulhu-icon
 *    -- The licensor does not endorse this application in any way.
 *    -- I have made no change to the Cthulhu image
 *    -- Link to the license https://creativecommons.org/licenses/by-nc-sa/3.0/
 *!* ******************************************************************************
 *!* Data *!*
 * Got the course data for Flatrocks / Eagles Next from https://www.dgcoursereview.com/course.php?id=60
 *!* ******************************************************************************
 */
import document from 'document';
import {
	screenMainInit
} from './screens/main.js'
import {
	GameState
} from './classes/GameState.js'
import * as sm from './settings-manager.js';
import * as constants from './constants.js';

sm.setupMessaging();
screenMainInit(null);
