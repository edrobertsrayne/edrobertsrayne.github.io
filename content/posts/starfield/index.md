+++
title = 'Starfield'
description = ''
date = 2024-02-22T14:15:05Z
categories = ['Visualiations']
tags = ['javascript', 'p5js']
+++

{{< sketch "/starfield/index.html" >}}

A starfield visualisation in [P5.js](https://p5js.org/) based on Daniel
Shiffman's Coding Challenge 1. This is my first test of writing a P5 sketch that
I can embed into this site. You can see the simulation in all its glory by
clicking on the `Fullscreen` button.

{{<youtube 17WoOqgXsRM >}}

As well as converting Daniel's code - based on code from
[Bryn Mawr College](https://www.cs.brynmawr.edu/gxk2013/examples/transformations/starfield/)
to the P5.js library, I've added a couple of extra details:

- Stars are created with different radii and colours.
- A background of stars distributed using
  [OpenSimplexNoise](https://gist.github.com/PARC6502/85c99c04c9b3c6ae52c3c27605b4df0a)
  has been added.
- Nebula-style backgrounds added, also using OpenSimplexNoise.

To reduce the amount of computation requried, the nebula images are generated
based on the original screen size. In fullscreen mode the original image is
scaled to cover the whole screen rather than being recalculated.

Source code for this visualisation is available on
[Github](https://github.com/edrobertsrayne/starfield).
