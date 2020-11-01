'use strict';

const Player = function (src) {
  EventEmitter.call(this);
  const that = this;
  this.parent = null;
  this.simulationSpeed = 1;
  this.image = new Image();
  this.image.src = src;
  this.x = this.image.width;
  this.y = this.image.height;
  this.h = this.y;
  this.velocity = 10;
  this.rad = Math.PI / 180;
  this.angle = 10;
  this.angle1 = this.angle;
  this.isStart = false;
  this.isRefresh = false;
  this.isFirstStart = true;
  this.isGrab = false;
  this.editshape = new EditShape(this);
  this.editshape.on('mousemove', (e) => {
    that.parent.canvas.style.cursor = 'grab';
  });
  this.editshape.on('mousedown', (e) => {
    that.parent.canvas.style.cursor = 'grabbing';
    if (that.editshape.y >= that.y - that.image.height / 2 && that.editshape.y <= (that.y - that.image.height / 2) + 70) {
      that.editshape.y = that.parent.mousePos.y - that.editshape.image.height / 2;
    } else {
      if (that.editshape.y < that.y - that.image.height / 2)
        that.editshape.y = that.y - that.image.height / 2;
      if (that.editshape.y > (that.y - that.image.height / 2) + 70)
        that.editshape.y = (that.y - that.image.height / 2) + 70;
    }

    if (that.editshape.x >= that.x + that.image.width - that.parent.camera.xView
      && that.editshape.x <= (that.x + that.image.width) + 70 - that.parent.camera.xView) {
      that.editshape.x = that.parent.mousePos.x - that.editshape.image.width / 2;
    } else {
      if (that.editshape.x < that.x + that.image.width - that.parent.camera.xView)
        that.editshape.x = that.x + that.image.width;
      if (that.editshape.x > (that.x + that.image.width) + 70 - that.parent.camera.xView)
        that.editshape.x = (that.x + that.image.width) + 70;
    }

    that.velocity = (that.editshape.x - that.x - that.image.width) + 10 + that.parent.camera.xView;
    that.angle = (that.editshape.y - that.y + that.image.height / 2) + 10;
    that.angle1 = that.angle;
  });
  this.editshape.on('mouseup', (e) => {
    that.parent.canvas.style.cursor = 'grab';
    that.editshape.h = that.angle;
    that.editshape.w = that.velocity;
  });
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

  if (!this.isStart && !this.isRefresh) {
    this.parent.ctx.save();
    this.parent.ctx.strokeStyle = '#000';
    this.parent.ctx.setLineDash([5, 15]);
    this.parent.ctx.strokeRect(this.x + this.image.width - this.parent.camera.xView, this.y - this.image.height / 2 - this.parent.camera.yView, 130, 130);
    this.parent.ctx.restore();
    this.editshape.draw();
  }
};

Player.prototype.update = function () {
  if (this.isStart) {
    if (this.y + this.image.height / 2 < this.parent.height - 128 || this.isFirstStart) {
      this.isFirstStart = false;
      this.x += this.velocity * Math.cos(this.angle * this.rad) * this.simulationSpeed;
      this.y = this.h - (this.x / Math.cos(this.angle * this.rad))
        * Math.sin(this.angle * this.rad)
        + (Math.pow(this.x, 2) / (2 * Math.pow(this.velocity * Math.cos(this.angle * this.rad), 2)));

      if (this.angle1 < 180 - this.angle)
        this.angle1 += this.velocity > this.angle ? this.velocity / this.angle : this.angle / this.velocity;
    }

    if (this.y + this.image.height / 2 > this.parent.height - 128) {
      this.y = this.parent.height - 128 - this.image.height / 2;
      this.emit('refresh');
    }
  } else {
    this.editshape.update();

    if (this.parent.mousePos.x > this.x - this.image.width / 2 - this.parent.camera.xView
      && this.parent.mousePos.x < this.x + this.image.width / 2 - this.parent.camera.xView
      && this.parent.mousePos.y > this.y - this.image.height / 2 - this.parent.camera.yView
      && this.parent.mousePos.y < this.y + this.image.height / 2 - this.parent.camera.yView) {
      this.emit('mousemove');

      if (this.parent.isMouseDown) {
        this.emit('mousedown');

        if (this.parent.mousePos.y < this.parent.height - 128 - this.image.height / 2) {
          this.y = this.parent.mousePos.y + this.image.height / 4;
          this.h = this.parent.mousePos.y + this.image.height / 4;
        }
      } else {
        this.emit('mouseup');
      }
    }
  }
};

Object.setPrototypeOf(Player.prototype, EventEmitter.prototype);
