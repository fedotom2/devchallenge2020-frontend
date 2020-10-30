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
  this.map = null;
  this.camera = null;
};

Game.prototype.add = function (object) {
  object.parent = this;
  this.objects.push(object);
};

Game.prototype.draw = function () {
  this.ctx.clearRect(0, 0, this.width, this.height);
  if (this.map)
    this.map.draw(this.camera.xView, this.camera.yView);
   for (let object of this.objects)
    if (object.draw)
      object.draw();
};

Game.prototype.update = function () {
  for (let object of this.objects)
    if (object.update)
      object.update();

  if (this.camera)
    this.camera.update();

  this.isClick = false;
};

Game.prototype.loop = function () {
  this.draw();
  this.update();
  requestAnimationFrame(this.loop.bind(this));
};

Game.prototype.start = function () {
  window.addEventListener('mousemove', (e) => game.emit('mousemove', e));
  window.addEventListener('click', (e) => game.click(e));
  window.addEventListener('resize', (e) => game.resize(e));
  this.loop();
};

Game.prototype.setMousePos = function (e) {
  const rect = this.canvas.getBoundingClientRect();
  this.mousePos.x = (e.clientX - rect.left) / (rect.right - rect.left) * this.width;
  this.mousePos.y = (e.clientY - rect.top) / (rect.bottom - rect.top) * this.height;
};

Game.prototype.click = function (e) {
  this.isClick = true;
};

Game.prototype.resize = function (e) {
  this.width = window.innerWidth;
  this.height = window.innerHeight;
  this.canvas.width = this.width;
  this.canvas.height = this.height;
};

Game.prototype.setMap = function (map) {
  map.parent = this;
  this.map = map;
};

Game.prototype.setCamera = function (camera) {
  camera.parent = this;
  this.camera = camera;
};

Object.setPrototypeOf(Game.prototype, EventEmitter.prototype);
