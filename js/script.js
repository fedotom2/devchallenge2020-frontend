'use strict';

const button1 = new Button(100, 100, 100, 50, 'Click', 'green', false, () => alert('Hello!'));
button1.on('mousemove', (e) => {
  game.canvas.style.cursor = 'pointer';
  if (e.x < button1.x && e.x > button1.x + button1.width && e.y < button1.y && e.y > button1.y + button1.height)
    button1.emit('mouseout');
});

const button2 = new Button(210, 100, 100, 50, 'Click', 'green', false, () => alert('Hello 2!'));
button2.on('mousemove', (e) => {
  game.canvas.style.cursor = 'pointer';
});

const game = new Game(canvas);
game.add(button1);
game.add(button2);
game.start();

game.on('mousemove', (e) => {
  game.canvas.style.cursor = 'auto';
  game.setMousePos(e);
  for (let object of game.objects) {
    if (game.mousePos.x > object.x && game.mousePos.x < object.x + object.width
      && game.mousePos.y > object.y && game.mousePos.y < object.y + object.height) {
      object.emit('mousemove', game.mousePos);
    }
  }
});

window.addEventListener('mousemove', (e) => game.emit('mousemove', e));
window.addEventListener('click', (e) => game.click(e));
