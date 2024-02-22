class Nebula {
    constructor() {
      this.noise = new OpenSimplexNoise2D(Date.now());
      this.buffer = new Array(width * height);
      this.imgBlue = createGraphics(width, height);
      this.imgRed = createGraphics(width, height);
  
      this.xoff = 0.002;
      this.yoff = 0.002;
  
      this.imgBlue.loadPixels();
      this.imgRed.loadPixels();
  
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          let n = this.noise.noise(x * this.xoff, y * this.yoff);
          let b = map(n, -1, 1, 0, 30);
          let c = color(220, 50, b);
          this.imgBlue.set(x, y, c);
  
          n = this.noise.noise(x * this.xoff + 10000, y * this.yoff + 10000);
          b = map(n, -1, 1, 0, 30);
          this.imgRed.set(x, y, color(5, 40, b));
        }
      }
  
      // this.red.updatePixels();
      this.imgRed.updatePixels();
      this.imgBlue.updatePixels();
      // this.img.blend(this.red, 0, 0, width, height, 0, 0, width, height, LIGHTEST);
    }
  
    draw() {
      blendMode(LIGHTEST);
      image(this.imgBlue, 0, 0);
      image(this.imgRed, 0, 0);
      blendMode(BLEND);
    }
  }
  