'use strict';

const styles = {
  green: '#4caf50',
  blue: '#008CBA',
  red: '#f44336',
  grey: '#e7e7e7',
  black: '#555555',
  yellow: '#f4c536'
};

const Button = function (x, y, width, height, text, color, isFill, handler) {
  EventEmitter.call(this);
  this.parent = null;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.text = text;
  this.color = color;
  this.handler = handler;
  this.style = styles[color];
  this.isFill = isFill;
  this.bgAlpha = isFill ? 1 : 0;
  this.textColor = hexToRgb(this.style);
};

Button.prototype.draw = function () {
  const fillColor = hexToRgb(this.style);
  const textWidth = this.parent.ctx.measureText(this.text).width;
  this.parent.ctx.strokeStyle = this.style;
  this.parent.ctx.fillStyle = `rgba(${ fillColor.r }, ${ fillColor.g }, ${ fillColor.b }, ${ this.bgAlpha })`;
  roundRect(this.parent.ctx, this.x, this.y, this.width, this.height, 5, true, true);
  this.parent.ctx.fillStyle = `rgb(${ this.textColor.r }, ${ this.textColor.g }, ${ this.textColor.b })`;
  this.parent.ctx.font = '20px Arial';
  this.parent.ctx.fillText(this.text, this.x + (this.width / 2) - (textWidth / 2), this.y + (this.height / 2) + 10);
};

Button.prototype.update = function () {
  const fillColor = hexToRgb(this.style);

  if (this.parent.mousePos.x > this.x && this.parent.mousePos.x < this.x + this.width
    && this.parent.mousePos.y > this.y && this.parent.mousePos.y < this.y + this.height) {
    this.emit('mousemove');

    if (this.parent.isClick) {
      this.parent.isClick = false;
      this.emit('click');
    }

    if (this.isFill) {
      if (this.bgAlpha > 0)
        this.bgAlpha -= 0.05;
      if (this.textColor.r > fillColor.r)
        this.textColor.r -= 10;
      if (this.textColor.g > fillColor.g)
        this.textColor.g -= 10;
      if (this.textColor.b > fillColor.b)
        this.textColor.b -= 10;
    } else {
      if (this.bgAlpha < 1)
        this.bgAlpha += 0.05;
      if (this.textColor.r < 256)
        this.textColor.r += 10;
      if (this.textColor.g < 256)
        this.textColor.g += 10;
      if (this.textColor.b < 256)
        this.textColor.b += 10;
    }
  } else {
    if (this.isFill) {
      if (this.bgAlpha < 1)
        this.bgAlpha += 0.05;
      if (this.textColor.r < 256)
        this.textColor.r += 10;
      if (this.textColor.g < 256)
        this.textColor.g += 10;
      if (this.textColor.b < 256)
        this.textColor.b += 10;
    } else {
      if (this.bgAlpha > 0)
        this.bgAlpha -= 0.05;
      if (this.textColor.r > fillColor.r)
        this.textColor.r -= 10;
      if (this.textColor.g > fillColor.g)
        this.textColor.g -= 10;
      if (this.textColor.b > fillColor.b)
        this.textColor.b -= 10;
    }
  }
};

Button.prototype.setColor = function (color) {
  this.color = color;
  this.style = styles[this.color];
  this.textColor = hexToRgb(this.style);
};

Object.setPrototypeOf(Button.prototype, EventEmitter.prototype);
