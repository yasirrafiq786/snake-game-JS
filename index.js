/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

document.addEventListener("keydown", handle_direction);

let changing_direction = false;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

let dx = 0;
let dy = 10;

function start() {
  if (hasGameEnded()) return;
  changing_direction = false;

  setTimeout(function onTick() {
    clearCanvas();
    moveSnake();
    drawSnake();
    start();
  }, 100);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
}

function handle_direction(event) {
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (changing_direction) true;

  changing_direction = true;
  const keyPressed = event.keyCode;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function hasGameEnded() {
  for (let i = 1; i < snake.length; i++) {
    const has_collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (has_collided) return true;
  }

  const hitLeftWall = snake[0].x <= 0;
  const hitRightWall = snake[0].x >= 390;
  const hitTopWall = snake[0].y <= 0;
  const hitBottomWall = snake[0].y >= 390;

  return hitLeftWall || hitBottomWall || hitRightWall || hitTopWall;
}

start();
