'use strict';

const game = new Game(canvas);
const camera = new Camera(0, 0, game.width, game.height, 8000, game.height);
const map = new Map(8000, game.height);
const button1 = new Button(game.width - 150, 50, 100, 50, 'Start', 'green', false);
const player = new Player(20);

map.generate('./images/BG.png');
camera.follow(player, game.width / 2, game.height / 2);

button1.on('mousemove', (e) => {
  game.canvas.style.cursor = 'pointer';
});

button1.on('click', () => {
  player.isStart = true;
});

game.setCamera(camera);
game.setMap(map);
game.add(button1);
game.add(player);
game.start();

game.on('mousemove', (e) => {
  game.canvas.style.cursor = 'auto';
  game.setMousePos(e);
});
