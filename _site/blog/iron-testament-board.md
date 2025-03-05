---
layout: post
tags: posts
title: Building the board for Iron Testament
summary: In order to create a level-designer-friendly board editor for my upcoming turn based strategy game, I set out to learn editor scripting and tools development.
image: board.png
date: 2024-06-17
---
<div class = "textspace">
<p><a href = "/projects/iron-testament" class="highlight underline">Iron Testament</a> is the first major project by <a href = "https://rat-economy.com" class="highlight underline">Rat Economy</a>, a studio I co-founded and where I work as programming lead. It is a turn-based strategy game where you play as the last human on Earth as they lead their band of fanatical robots to take back the planet for the forces of life. Inspired by games like XCOM and Into the Breach it features a mixture of tactical combat and team management. </p>

<p>The first order of business when developing the prototype for Iron Testament was to create a board system. A board is made up of tiles (individual spaces on a grid) that are of different types such as ground, objectives that need to be reached, and extract points for leaving a level. The board itself then needs to be able to contain all of the game tiles, find all tiles within a radius, and keep track of where units were on the board. </p>
<img class="rounded-2xl border border-gray-400 border-2 w-full md:w-3/5 md:float-left mr-6 my-4" src = "/images/blog/tile-mat.gif">

<p> First, I implemented a class to define a Tile. This simple class defines the type of tile, the position, and helper functions to find its neighbours.</p>



<p class = ""> As art is still in development, we are using different materials to signal different tile types. In order to avoid designers having to change each tile's material individually, I threw together a simple <a href = "https://learn.unity.com/tutorial/editor-scripting" class = "highlight underline">editor script</a>. This contains a simple override for OnInspectorGUI that keeps track of when the tiletype is changed, and if so, it updates the tile to the correct material by calling a helper function on the Tile class itself.</p>

<p>
Next, I needed to define a Board. This was a more complex class, but essentially is made up of a 2d array of Tiles with extra data to track currently selected tiles and what tile someone is hovering over. I also added helper functions to find all tiles within a radius (useful for determining where a unit can move to) and functions to get a Tile's data from position or vice-versa.</p>

<img class="rounded-2xl border border-gray-400 border-2 w-full md:w-1/2 md:float-right md:ml-6 my-4" src = "/images/blog/board-inspector.png">
<p>However, a problem quickly became apparent with how I had set everything up: how was I going to connect the visual side of the level (the tile objects that level designers set up) with the code representation of the level (the 2d array of Tiles in Board)? 

To do this, I created another editor script providing a custom inspector for the Board class. Below the default inspector elements, I added a button labeled "Save Level Data". This calls a function that loops through each possible position that a tile could be in (0,0) to (maxrows, maxcols) and checks if a tile is present; if so, it adds it to a saved list of Tiles in BoardTools.cs. While finding the tiles, I also had this function do some setup of their data (saving their positions, etc) so no one would have to enter that manually. While this function isn't incredibly efficient, because it is running only in the editor it will not effect the performance of the game.

When a level is loaded, the game will find the saved list of Tiles on BoardTools.cs and construct a 2d array according to the saved information. This allows all of the designing of a level be done in the editor and, with the save button, the code-representation of that level to be automatically generated without any additional work.

I also added two buttons to spawn default and objective tiles just to eliminate the need to search for the correct prefab as well as a button that automatically generates a board of the maximum size to speed up the design process. The goofy little level I have pictured in the header of this article is created from that default map generator.

After some consideration, I realized that having to hit a save button manually every time a change is made to a level could be annoying and cause errors down the production pipeline. To make this seamless, I created a script deriving from UnityEditor.AssetModificationProcessor. This contains a built-in function, <a href = "https://docs.unity3d.com/ScriptReference/AssetModificationProcessor.OnWillSaveAssets.html" class = "highlight underline">OnWillSaveAssets</a>, that runs every time a scene is saved. My implementation of this checks if the scene contains a Board, then runs the save level function if so. This means the leveldata is saved behind the scenes and designers don't need to worry about it.
</p>
</div>

<div class = "textspace">
<p>Anyway, this is a very simple implementation of the board to kick off programming. Many of the systems will change to conform to gameplay and design needs, so I may write a second entry about the board later on in development.</p>
<p>For now, I'll get back to development. Make sure to check out <a href = "/projects/iron-testament" class = "highlight underline">Iron Testament</a> and follow Rat Economy on <a href = "https://rat-economy.itch.io/" class = "highlight underline">Itch.io</a>, <a href = "https://www.youtube.com/@rat-economy" class = "highlight underline">Youtube</a>, and <a href = "https://www.linkedin.com/company/rat-economy" class = "highlight underline">LinkedIn</a> to keep up with development. Thanks and see y'all later!
</div>