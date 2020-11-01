'use strict';

const Label = function (x, y, prefix, suffix, object, field, size) {
  this.parent = null;
  this.x = x;
  this.y = y;
  this.prefix = prefix;
  this.suffix = suffix;
  this.object = object;
  this.field = field;
  this.text = this.prefix + this.object[this.field] + this.suffix;
  this.size = size || 20;
};

Label.prototype.draw = function () {
  this.parent.ctx.save();
  this.parent.ctx.fillStyle = '#000';
  this.parent.ctx.font = `${ this.size }px Arial`;
  this.parent.ctx.fillText(this.text, this.x, this.y);
  this.parent.ctx.restore();
};

Label.prototype.update = function () {
  const value = this.object[this.field];
  if (typeof value === 'number' && isFinite(value)) {
    this.text = this.prefix + Math.round(value) + this.suffix;
  }

  if (typeof value === 'string') {
    this.text = this.prefix + value + this.suffix;
  }
};
