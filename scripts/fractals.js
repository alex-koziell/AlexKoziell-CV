const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const slider = document.getElementById('base-slider');
const baseDisplay = document.getElementById('base-value');

const MAX_DEPTH = 6;
const LEVEL_HEIGHT = 10;
const LEVEL_SEP = 15;

function drawFractal(x0, y0, w, h, depth, n) {
  context.fillStyle = 'hsl(' + 360 * Math.random() + ', 75%, 50%)';
  context.fillRect(x0, y0, w, h);
  if (depth < MAX_DEPTH) {
    ++depth;
    for (var i = (-1/2)*(n%2-1); i < n; i += 2) {
      drawFractal(x0 + i*w/n, y0+LEVEL_SEP, w/n, h, depth, n);
    }
  }
}

baseDisplay.value = slider.value;
drawFractal(0, 0, canvas.width, LEVEL_HEIGHT, 0, slider.value);

slider.addEventListener('input', () => {
  baseDisplay.value = slider.value;
});

slider.addEventListener('change', () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawFractal(0, 0, canvas.width, LEVEL_HEIGHT, 0, slider.value);
});
