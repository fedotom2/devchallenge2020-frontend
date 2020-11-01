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
  this.isMouseDown = false;
  this.map = null;
  this.camera = null;
};

Game.prototype.add = function (object) {
  object.parent = this;
  this.objects.push(object);
};

Game.prototype.draw = function () {
  // this.ctx.clearRect(0, 0, this.width, this.height);
  this.ctx.save();
  this.ctx.fillStyle = '#69df89';
  this.ctx.fillRect(0, 0, this.width, this.height);
  this.ctx.restore();
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
  const that = this;
  window.addEventListener('mousemove', (e) => that.mousemove(e));
  window.addEventListener('click', (e) => that.click(e));
  window.addEventListener('resize', (e) => that.resize(e));
  window.addEventListener('mousedown', (e) => that.mousedown(e));
  window.addEventListener('mouseup', (e) => that.mouseup(e));

  this.loop();
};

Game.prototype.setMousePos = function (e) {
  const rect = this.canvas.getBoundingClientRect();
  this.mousePos.x = (e.clientX - rect.left) / (rect.right - rect.left) * this.width;
  this.mousePos.y = (e.clientY - rect.top) / (rect.bottom - rect.top) * this.height;
};

Game.prototype.mousemove = function (e) {
  this.canvas.style.cursor = 'auto';
  this.setMousePos(e);
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

Game.prototype.mousedown = function (e) {
  this.isMouseDown = true;
};

Game.prototype.mouseup = function (e) {
  this.isMouseDown = false;
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
