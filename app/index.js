/*
 * Entry point for the watch app
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