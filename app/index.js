/*
 * Entry point for the watch app
 * Space Invader png came from https://www.game.es/videojuegos
 * Images from https://www.iconfinder.com
 * Abacus.png (icon.png) from Aha-Soft
 * Got the course data for Flatrocks / Eagles Next from https://www.dgcoursereview.com/course.php?id=60
 */
import document from 'document';
import { screenMainInit } from './screen-main.js'
import { GameState } from './classes/GameState.js'

screenMainInit(new GameState(0, 0, []));