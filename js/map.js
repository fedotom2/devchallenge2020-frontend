'use strict';

function Map(width, height) {
  // map dimensions
  this.width = width;
  this.height = height;

  // map texture
  this.image = null;
}

// creates a prodedural generated map (you can use an image instead)
Map.prototype.generate = function(src) {
  let ctx = document.createElement('canvas').getContext('2d');
  ctx.canvas.width = this.width;
  ctx.canvas.height = this.height;
  const that = this;

  ctx.save();
  const image = new Image();
  image.src = src;
  image.addEventListener('load', function (e) {
    const ptrn = ctx.createPattern(image, 'repeat');
    ctx.fillStyle = ptrn;
    for (let x = 0, i = 0; i < 10; x += image.width, i++) {
      ctx.beginPath();
      ctx.rect(x, 0, image.width, image.height);
      ctx.fill();
      ctx.closePath();
    }

    ctx.restore();

    // store the generate map as this image texture
    that.image = new Image();
    that.image.src = ctx.canvas.toDataURL('image/png');

    // Clear context
    ctx = null;
  }, false);

};

// draw the map adjusted to camera
Map.prototype.draw = function(xView, yView) {
  // easiest way: draw the entire map changing only the destination coordinate in canvas
  // canvas will cull the image by itself (no performance gaps -> in hardware accelerated environments, at least)
  /*context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -xView, -yView, this.image.width, this.image.height);*/

  // didactic way ( "s" is for "source" and "d" is for "destination" in the variable names):

  if (this.image) {
    let sx, sy, dx, dy;
    let sWidth, sHeight, dWidth, dHeight;

    // offset point to crop the image
    sx = xView;
    sy = yView;

    // dimensions of cropped image
    sWidth = this.parent.width;
    sHeight = this.parent.height;

    // if cropped image is smaller than canvas we need to change the source dimensions
    if (this.image.width - sx < sWidth) {
      sWidth = this.image.width - sx;
    }
    if (this.image.height - sy < sHeight) {
      sHeight = this.image.height - sy;
    }

    // location on canvas to draw the croped image
    dx = 0;
    dy = 0;
    // match destination with source to not scale the image
    dWidth = sWidth;
    dHeight = sHeight;

    this.parent.ctx.drawImage(this.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }
};
