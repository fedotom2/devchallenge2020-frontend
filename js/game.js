'use strict';

const Game = function (canvas) {
  EventEmitter.call(this);
  this.canvas = canvas;
  this.width = window.innerWidth;
  this.height = window.innerHeight;
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.ctx = this.canvas.getContext('2d');
  this.objects = [];
  this.mousePos = { x: 0, y: 0 };
  this.isClick = false;
};

Game.prototype.add = function (object) {
  object.parent = this;
  this.objects.push(object);
};

Game.prototype.draw = function () {
  this.ctx.clearRect(0, 0, this.width, this.height);
  for (let object of this.objects)
    object.draw();
};

Game.prototype.update = function () {
  for (let object of this.objects)
    object.update();

  this.isClick = false;
};

Game.prototype.start = function () {
  this.draw();
  this.update();
  requestAnimationFrame(this.start.bind(this));
};

Game.prototype.setMousePos = function (e) {
  const rect = this.canvas.getBoundingClientRect();
  this.mousePos.x = (e.clientX - rect.left) / (rect.right - rect.left) * this.width;
  this.mousePos.y = (e.clientY - rect.top) / (rect.bottom - rect.top) * this.height;
};

Game.prototype.click = function (e) {
  this.isClick = true;
};

Object.setPrototypeOf(Game.prototype, EventEmitter.prototype);
