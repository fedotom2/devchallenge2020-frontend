'use strict';

const Player = function (src) {
  EventEmitter.call(this);
  this.x = 0;
  this.y = 0;
  this.h = this.y;
  this.mass = 5;
  this.velocity = 30;
  this.angle = (45 * Math.PI) / 180;
  this.isFix = false;
  this.isStart = false;
  this.isFirstStart = true;
  this.image = new Image();
  this.image.src = src;
};

Player.prototype.draw = function () {
  if (this.image) {
    this.parent.ctx.save();
    this.parent.ctx.translate(this.x - this.parent.camera.xView, this.y - this.parent.camera.yView);
    this.parent.ctx.rotate(this.angle);
    this.parent.ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2, this.image.width, this.image.height);
    this.parent.ctx.rotate(-this.angle);
    this.parent.ctx.translate(-(this.x - this.parent.camera.xView), -(this.y - this.parent.camera.yView));
    this.parent.ctx.restore();
  }
};

Player.prototype.update = function () {
    if (!this.parent.isClick && !this.isFix) {
      if (this.parent.mousePos.y < this.parent.height - 128 - this.image.height / 2)
        this.y = this.parent.mousePos.y - this.image.height / 2;
    }
    else{
      if (this.parent.mousePos.x > this.x - this.image.width / 2 && this.parent.mousePos.x < this.x + this.image.width / 2) {
        this.h = this.parent.mousePos.y;
        this.isFix = true;
      }
    }

  if (this.isStart) {
    if (this.y + this.image.height < this.parent.height - 128 || this.isFirstStart) {
      this.isFirstStart = false;
      this.x += this.velocity * Math.cos(this.angle);
      this.y = this.h - (this.x / Math.cos(this.angle)) * Math.sin(this.angle) + (Math.pow(this.x, 2) / (2 * Math.pow(this.velocity * Math.cos(this.angle), 2)));
    }

    if (this.y + this.image.height > this.parent.height - 128)
      this.y = this.parent.height - 128 - this.image.height;
  }
};

Object.setPrototypeOf(Player.prototype, EventEmitter.prototype);
