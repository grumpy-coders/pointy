# pointy
Versa and Ionic disc golf / golf score keeper.

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
