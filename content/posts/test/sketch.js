let NUM_STARS = 1000;
let stars = [];
let backgroundStars = [];

function setup() {
  var w = floor(min((windowWidth * 0.9), 1024));
  var h = floor(w * 3 / 4);
  var canvas = createCanvas(w, h);
  canvas.parent('sketch-holder');
  smooth();
  pixelDensity(1);
  colorMode(HSB, 360, 100, 100);
  
  nebula = new Nebula();
  
  for (let i = 0; i < NUM_STARS; i++) {
    stars[i] = new Star();
    backgroundStars[i] = new BackgroundStar();
    backgroundStars[i].v = 0;
  }
}

function windowResized() {
  var w = floor(min((windowWidth * 0.9), 1024));
  var h = floor(w * 3 / 4);
  resizeCanvas(w, h);
}

function draw() {
  background(0);
  nebula.draw();

  translate(width / 2, height / 2);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].draw();
  }
  
  for (let i = 0; i < backgroundStars.length; i++) {
    backgroundStars[i].draw();
  }
}
