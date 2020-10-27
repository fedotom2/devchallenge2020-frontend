'use strict';

const mousePos = { x: 0, y: 0 };
let isClick = false;

const componentToHex = (c) => {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

const rgbToHex = (r, g, b) =>
  '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const getMousePos = (canvas, evt) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
    y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
  };
};

const roundRect = (ctx, x, y, width, height, radius, fill, stroke) => {
  if (stroke === undefined)
    stroke = true;

  if (radius === undefined)
    radius = 5;

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();

  if (fill)
    ctx.fill();

  if (stroke)
    ctx.stroke();
};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const Button = function (x, y, width, height, text, color, isFill, handler) {
  const styles = {
    green: '#4caf50',
    blue: '#008CBA',
    red: '#f44336',
    grey: '#e7e7e7',
    black: '#555555'
  };

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
  const textWidth = ctx.measureText(this.text).width;
  ctx.strokeStyle = this.style;
  ctx.fillStyle = `rgba(${ fillColor.r }, ${ fillColor.g }, ${ fillColor.b }, ${ this.bgAlpha })`;
  roundRect(ctx, this.x, this.y, this.width, this.height, 5, true, true);
  ctx.fillStyle = `rgb(${ this.textColor.r }, ${ this.textColor.g }, ${ this.textColor.b })`;
  ctx.font = '20px Arial';
  ctx.fillText(this.text, this.x + (this.width / 2) - (textWidth / 2), this.y + (this.height / 2) + 10);
};

Button.prototype.update = function () {
  const fillColor = hexToRgb(this.style);

  if (mousePos.x > this.x && mousePos.x < this.x + this.width
    && mousePos.y > this.y && mousePos.y < this.y + this.height) {
    if (isClick) {
      isClick = false;
      this.handler();
    }

    canvas.style.cursor = 'pointer';

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
    canvas.style.cursor = 'auto';

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

const button = new Button(100, 100, 100, 50, 'Click me!', 'green', true, () => {
  console.log('Hello World!');
});

const draw = () => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  button.draw();
};

const update = () => {
  button.update();

  isClick = false;
};

const loop = () => {
  draw();
  update();

  requestAnimationFrame(loop);
};

loop();

window.addEventListener('mousemove', (e) => {
  const pos = getMousePos(canvas, e);
  mousePos.x = pos.x;
  mousePos.y = pos.y;
});

window.addEventListener('click', (e) => {
  isClick = true;
});