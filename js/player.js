'use strict';

const Player = function (radius) {
  EventEmitter.call(this);
  this.radius = radius;
  this.x = this.radius;
  this.y = this.radius;
  this.h = this.y;
  this.mass = 5;
  this.velocity = 40;
  this.angle = (45 * Math.PI) / 180;
  this.isFix = false;
  this.isStart = false;
  this.isFirstStart = true;
};

Player.prototype.draw = function () {
  this.parent.ctx.fillStyle = '#000';
  this.parent.ctx.beginPath();
  this.parent.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  this.parent.ctx.closePath();
  this.parent.ctx.fill();
};

Player.prototype.update = function () {
    if (!this.parent.isClick && !this.isFix) {
      this.y = this.parent.mousePos.y;
    }
    else{
      if (this.parent.mousePos.x > this.x - this.radius && this.parent.mousePos.x < this.x + this.radius) {
        this.h = this.parent.mousePos.y;
        this.isFix = true;
      }
    }

  if (this.isStart) {
    if (this.y + this.radius < this.parent.height || this.isFirstStart) {
      this.isFirstStart = false;
      this.x += this.velocity * Math.cos(this.angle);
      this.y = this.h - (this.x / Math.cos(this.angle)) * Math.sin(this.angle) + (Math.pow(this.x, 2) / (2 * Math.pow(this.velocity * Math.cos(this.angle), 2)));
    }

    if (this.y + this.radius > this.parent.height)
      this.y = this.parent.height - this.radius;
  }
};

Object.setPrototypeOf(Player.prototype, EventEmitter.prototype);
