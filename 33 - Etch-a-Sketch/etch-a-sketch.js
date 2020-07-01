// Select the elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;
const slider = document.querySelector('.slider');
const background = document.querySelector('.wes-a-sketch');
const rainbowButton = document.querySelector('.rainbow');
let rainbowMode = false;
const CANVAS_BACKGROUND = '212, 217, 221';
const DEFAULT_STROKE_COLOR = '#515054'

// Setup our canvas for drawing
// Make variables called height and width from the same properties on our canavas
const { width, height } = canvas;

// Create random x and y starting points on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `${DEFAULT_STROKE_COLOR}`;
ctx.beginPath(); // Start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Draw on the canvas
function draw({ key }) {
  if (rainbowMode) {
    // Increment the hue
    hue += 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  }
  else {
    ctx.strokeStyle = DEFAULT_STROKE_COLOR;
  }
  // Start the path
  ctx.beginPath();
  ctx.moveTo(x, y);
  // Move our x and y values depending on what the user did
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      rotateKnob('left', 'up');
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      rotateKnob('left', 'down');
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      rotateKnob('right', 'left');
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      rotateKnob('right', 'right');
      break;
    default:
      break;
  }
  
  // Ensure line remains on the canvas
  if (x > width) {
    x = width;
  }
  else if (x < 0) {
    x = 0;
  }
  if (y > height) {
    y = height;
  }
  else if (y < 0) {
    y = 0;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// Used to shrink the line dot after enlarging it with the slider
function vigorousStroke() {
  ctx.stroke();ctx.stroke();ctx.stroke();ctx.stroke();ctx.stroke();ctx.stroke();ctx.stroke();ctx.stroke();
}

function handleSlider() {
  console.log(`slider.value ${slider.value}  and ctx.lineWidth ${ctx.lineWidth}`);
  if (slider.value < ctx.lineWidth) {
    ctx.strokeStyle = `rgb(${CANVAS_BACKGROUND})`;
    vigorousStroke();
    ctx.lineWidth = slider.value;
    ctx.strokeStyle = DEFAULT_STROKE_COLOR;
    ctx.stroke();
  }
  else {
    ctx.strokeStyle = DEFAULT_STROKE_COLOR;
    ctx.lineWidth = slider.value;
    ctx.stroke();
  }
}

function handleRainbowButton() {
  if (rainbowMode === false) {
    rainbowMode = true;
    rainbowButton.classList.add('on');
  }
  else {
    rainbowMode = false;
    rainbowButton.classList.remove('on');
  }
  
}

// Handler for the keys
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

// Clear / Shake function
function clearCanvas() {
  canvas.classList.add('shake');
  background.classList.add('shake');
  
  // Gradually shake away the drawing. Takes 3-4 shakes.
  ctx.fillStyle = `rgba(${CANVAS_BACKGROUND}, 0.8)`
  ctx.rect(0, 0, width, height);
  ctx.fill();

  ctx.beginPath();  // Removes ctx.rect above from the path

  canvas.addEventListener(
    'animationend',
    function() {
      canvas.classList.remove('shake');
      background.classList.remove('shake');
    },
    { once: true }
  );
}

// Rotate the knobs while drawing
function rotateKnob(side, direction) {
  switch(direction) {
    case 'right':
      direction = 'rotateRight';
      break;
    case 'left':
      direction = 'rotateLeft';
      break;
    case 'up':
      direction = 'rotateRight';
      break;
    case 'down':
      direction = 'rotateLeft';
      break;
    default:
      break;
  }
    
  if (side === 'left') {
    side = document.querySelector('.left-knob');
  }
  else {
    side = document.querySelector('.right-knob');
  }

  side.classList.add(direction);

  side.addEventListener(
    'animationend',
    function() {
      side.classList.remove(direction);
    },
    { once: true }
  );
}

// Listen for arrow keys
window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);

// Listen for changes to the line width slider
slider.addEventListener('input', handleSlider);

// List for click on rainbow button
rainbowButton.addEventListener('click', handleRainbowButton);
