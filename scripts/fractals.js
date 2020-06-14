const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const slider = document.getElementById('slider');
const baseDisplay = document.getElementById('base-value');

const MAX_DEPTH = 5;

function drawFractal(x0, y0, w, h, depth, n) {
  context.fillStyle = 'hsl(' + 360 * Math.random() + ', 75%, 50%)';
  context.fillRect(x0, y0, w, h);
  if (depth < MAX_DEPTH) {
    ++depth;
    for (var i = (-1/2)*(n%2-1); i < n; i += 2) {
      drawFractal(x0 + i*w/n, y0+10, w/n, h, depth, n);
    }
  }
}

baseDisplay.value = slider.value;
drawFractal(0, 0, canvas.width, 5, 0, slider.value);

slider.addEventListener('input', () => {
  baseDisplay.value = slider.value;
});

slider.addEventListener('change', () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawFractal(0, 0, canvas.width, 5, 0, slider.value);
});
