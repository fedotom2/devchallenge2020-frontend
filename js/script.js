'use strict';

const game = new Game(canvas);
const camera = new Camera(0, 0, game.width, game.height, 8000, game.height);
const map = new Map(8000, game.height);
const player = new Player('./images/player.png');
const label1 = new Label(game.width - 150, 50, 'X: ', '', player, 'x');
const label2 = new Label(game.width - 150, 80, 'α: ', '', player, 'angle');
const label3 = new Label(game.width - 150, 110, 'v: ', '', player, 'velocity');
const button1 = new Button(game.width - 150, 130, 100, 50, 'Start', 'green', false);
const button2 = new Button(game.width - 150, 200, 100, 50, '1x', 'yellow', false);

map.generate('./images/BG.png', './images/2.png');
camera.follow(player, game.width / 2, game.height / 2);

button1.on('mousemove', (e) => {
  game.canvas.style.cursor = 'pointer';
});

button1.on('click', (e) => {
  if (player.isRefresh) {
    player.x = player.image.width;
    player.y = player.image.height;
    player.angle = 10;
    player.angle1 = 10;
    player.velocity = 10;
    player.editshape.h = 0;
    player.editshape.w = 0;
    player.editshape.x = player.x + player.image.width;
    player.editshape.y = player.y - player.image.height / 2;
    button1.text = 'Start';
    button1.setColor('green');
    player.isRefresh = false;
  } else {
    if (player.isStart) {
      button1.text = 'Start';
      button1.setColor('green');
      player.isStart = false;
    } else {
      button1.text = 'Pause';
      button1.setColor('blue');
      player.isStart = true;
    }
  }
});

button2.on('mousemove', (e) => {
  game.canvas.style.cursor = 'pointer';
});

button2.on('click', (e) => {
  player.simulationSpeed = ++player.simulationSpeed <= 3 ? player.simulationSpeed : 1;
  button2.text = `${ player.simulationSpeed }x`;
});

player.on('mousemove', (e) => {
  game.canvas.style.cursor = 'grab';
});

player.on('mousedown', (e) => {
  game.canvas.style.cursor = 'grabbing';
  player.isGrab = true;
});

player.on('mouseup', (e) => {
  game.canvas.style.cursor = 'grab';
  player.isGrab = false;
});

player.on('refresh', (e) => {
  button1.text = 'Refresh';
  button1.setColor('yellow');
  player.isStart = false;
  player.isRefresh = true;
});

game.setCamera(camera);
game.setMap(map);
game.add(button1);
game.add(button2);
game.add(label1);
game.add(label2);
game.add(label3);
game.add(player);
game.start();
