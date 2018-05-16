# pointy
Versa and Ionic disc golf / golf score keeper.

First off I'll give credit to the resources I'm using (as best as I can remember).

Space Invader png came from https://www.game.es/videojuegos

Images from https://www.iconfinder.com
 * back.png
 * course.png
 * green-light.png
 * pick-players.png
 * previous-hole.png
 * user-green.png
 
Cthulhu from http://www.softicons.com/object-icons/richs-misc-icons-by-rich-d/cthulhu-icon
 The licensor does not endorse this application in any way.
 I have made no change to the Cthulhu image
 Link to the license https://creativecommons.org/licenses/by-nc-sa/3.0/

Data
 Got the course data for Flatrocks / Eagles Next from https://www.dgcoursereview.com/course.php?id=60
 

The code contains examples how how to use some the FitBit sdk items.

Some of the controls that caused me the most problems and exmaples might help others are:
  tile-list -- screen-select-players.gui
  scrollview -- screen-game.gui
  alert -- Show the user an alert type screen.
  
The also uses a mutli-screen concept which can be seen with indux.gui

One course (Flat Rocks A and B in central Ohio) is loaded.
There is also a generic par 3 course loaded that will work for most courses.

To setup default game, course and players use the companion app.

Usage:
1. Pick a course
2. Pick a game
3. Pick players
4. Start

Notes:
   Game header H1 | P3 | TP3
      H1 = Hole 1
      P3 = Par 3
      TP 3 = Total Par 3

   Pressing on the header on the game ( i.e. H1 | P3 | TP3) will bring up the hole details.
   Pressing on the flag on the hole details brings up the course details.
