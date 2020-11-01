'use strict';

const EditShape = function (parent) {
  EventEmitter.call(this);
  this.parent = parent;
  this.x = this.parent.x + this.parent.image.width;
  this.y = this.parent.y - this.parent.image.height / 2;
  this.image = new Image();
  this.image.src = './images/move.png';
  this.h = 0;
  this.w = 0;
};

EditShape.prototype.draw = function () {
  if (this.image) {
    this.parent.parent.ctx.save();
    this.parent.parent.ctx.drawImage(this.image, this.x, this.y);
    this.parent.parent.ctx.restore();
  }
};

EditShape.prototype.update = function () {
  if (this.parent.isGrab || this.parent.isStart) {
    this.y = (this.h + this.parent.y - this.parent.image.height / 2) - this.parent.parent.camera.yView;
    this.x = (this.w + this.parent.x + this.parent.image.width) - this.parent.parent.camera.xView;
  }

  if (this.parent.parent.mousePos.x > this.x
    && this.parent.parent.mousePos.x < this.x + this.image.width
    && this.parent.parent.mousePos.y > this.y
    && this.parent.parent.mousePos.y < this.y + this.image.height) {
    this.emit('mousemove');

    if (this.parent.parent.isMouseDown) {
      this.emit('mousedown');
    } else {
      this.emit('mouseup');
    }
  }
};

Object.setPrototypeOf(EditShape.prototype, EventEmitter.prototype);
