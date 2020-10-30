'use strict';

const game = new Game(canvas);
const button1 = new Button(game.width - 150, 50, 100, 50, 'Start', 'green', false);
const player = new Player(20);

button1.on('mousemove', (e) => {
  game.canvas.style.cursor = 'pointer';
});

button1.on('click', () => {
  player.isStart = true;
});

game.add(button1);
game.add(player);
game.start();

game.on('mousemove', (e) => {
  game.canvas.style.cursor = 'auto';
  game.setMousePos(e);
});

window.addEventListener('mousemove', (e) => game.emit('mousemove', e));
window.addEventListener('click', (e) => game.click(e));
window.addEventListener('resize', (e) => game.resize(e));
