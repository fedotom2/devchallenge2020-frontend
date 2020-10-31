'use strict';

const Player = function (src) {
  EventEmitter.call(this);
  this.image = new Image();
  this.image.src = src;
  this.x = this.image.width;
  this.y = 0;
  this.h = this.y;
  this.mass = 5;
  this.velocity = 80;
  this.rad = Math.PI / 180;
  this.angle = 45;
  this.angle1 = this.angle;
  this.isFix = false;
  this.isStart = false;
  this.isFirstStart = true;
};

Player.prototype.draw = function () {
  if (this.image) {
    this.parent.ctx.save();
    this.parent.ctx.translate(this.x - this.parent.camera.xView, this.y - this.parent.camera.yView);
    this.parent.ctx.rotate(this.angle1 * this.rad);
    this.parent.ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2, this.image.width, this.image.height);
    this.parent.ctx.rotate(-this.angle1 * this.rad);
    this.parent.ctx.translate(-(this.x - this.parent.camera.xView), -(this.y - this.parent.camera.yView));
    this.parent.ctx.restore();
  }
};

Player.prototype.update = function () {
    if (!this.parent.isClick && !this.isFix) {
      if (this.parent.mousePos.y < this.parent.height - 128 - this.image.height / 2)
        this.y = this.parent.mousePos.y + this.image.height / 4;
    }
    else{
      if (this.parent.mousePos.x > this.x - this.image.width / 2 && this.parent.mousePos.x < this.x + this.image.width / 2) {
        this.h = this.parent.mousePos.y;
        this.isFix = true;
      }
    }

  if (this.isStart) {
    if (this.y + this.image.height / 2 < this.parent.height - 128 || this.isFirstStart) {
      this.isFirstStart = false;
      this.x += this.velocity * Math.cos(this.angle * this.rad);
      this.y = this.h - (this.x / Math.cos(this.angle * this.rad))
        * Math.sin(this.angle * this.rad)
        + (Math.pow(this.x, 2) / (2 * Math.pow(this.velocity * Math.cos(this.angle * this.rad), 2)));

      if (this.angle1 < 180 - this.angle)
        this.angle1 += this.velocity > this.angle ? this.velocity / this.angle : this.angle / this.velocity;
    }

    if (180 - this.angle < 90)
      if (this.y + this.image.height / 2 > this.parent.height - 128)
        this.y = this.parent.height - 128 - this.image.height / 2;
    else
      if (this.y + this.image.width > this.parent.height - 128)
        this.y = this.parent.height - 128 - this.image.width / 4;
  }
};

Object.setPrototypeOf(Player.prototype, EventEmitter.prototype);
