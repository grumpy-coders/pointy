/*
 * Entry point for the watch app
 * Space Invader png came from https://www.game.es/videojuegos
 * Images from https://www.iconfinder.com
 * Abacus.png (icon.png) from Aha-Soft
 * Got the course data for Flatrocks / Eagles Next from https://www.dgcoursereview.com/course.php?id=60
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