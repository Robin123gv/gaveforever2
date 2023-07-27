const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRID_SIZE = 20;
const GRID_WIDTH = canvas.width / GRID_SIZE;
const GRID_HEIGHT = canvas.height / GRID_SIZE;

let snake = [
  { x: 10, y: 10 },
];
let direction = { x: 1, y: 0 };
let food = { x: 15, y: 10 };

function drawSnake() {
  ctx.fillStyle = 'green';
  for (const segment of snake) {
    ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
  }
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);
  
  if (head.x === food.x && head.y === food.y) {
    food = { x: Math.floor(Math.random() * GRID_WIDTH), y: Math.floor(Math.random() * GRID_HEIGHT) };
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.y < 0 || head.x >= GRID_WIDTH || head.y >= GRID_HEIGHT) {
    return true; // Hit the wall
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true; // Hit itself
    }
  }

  return false;
}

function update() {
  if (checkCollision()) {
    alert('Game Over!');
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 };
    food = { x: 15, y: 10 };
  }

  moveSnake();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();

  setTimeout(update, 100); // Run the update function every 100 milliseconds
}

// Listen for arrow key presses to change the direction of the snake
document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  switch (key) {
    case 'arrowup':
    case 'w':
      if (direction.y !== 1) {
        direction = { x: 0, y: -1 };
      }
      break;
    case 'arrowdown':
    case 's':
      if (direction.y !== -1) {
        direction = { x: 0, y: 1 };
      }
      break;
    case 'arrowleft':
    case 'a':
      if (direction.x !== 1) {
        direction = { x: -1, y: 0 };
      }
      break;
    case 'arrowright':
    case 'd':
      if (direction.x !== -1) {
        direction = { x: 1, y: 0 };
      }
      break;
  }
});

update();
