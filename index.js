const video = document.querySelector('video');

const captureCanvas = document.querySelector('#capture-canvas');
const captureCtx = captureCanvas.getContext('2d');

const outputCanvas = document.querySelector('#output-canvas');
const outputCtx = outputCanvas.getContext('2d');

const stillCanvas = document.querySelector('#still-canvas');
const stillCtx = stillCanvas.getContext('2d');

const startButton = document.querySelector('#start-button');
const startContainer = document.querySelector('#start-container');

const worker = new Worker('worker.js');

let phase = 'initial';

video.addEventListener('loadedmetadata', () => {
  captureCanvas.width = video.videoWidth;
  captureCanvas.height = video.videoHeight;
  stillCanvas.width = video.videoWidth;
  stillCanvas.height = video.videoHeight;
  outputCanvas.width = video.videoWidth;
  outputCanvas.height = video.videoHeight;
});

function captureStillImage() {
  setTimeout(() => {
    stillCtx.drawImage(video, 0, 0);
  }, 200);
}

function processOneFrame() {
  captureCtx.drawImage(video, 0, 0);
  const imageData = captureCtx.getImageData(
    0,
    0,
    captureCanvas.width,
    captureCanvas.height,
  );
  worker.postMessage(imageData.data.buffer, [imageData.data.buffer]);
}

video.addEventListener('play', () => {
  function tick() {
    if (phase !== 'initial') {
      return;
    }
    outputCtx.drawImage(video, 0, 0);
    requestAnimationFrame(tick);
  }
  tick();
});

worker.addEventListener('message', e => {
  const imageData = new ImageData(
    new Uint8ClampedArray(e.data),
    captureCanvas.width,
    captureCanvas.height,
  );

  outputCtx.putImageData(imageData, 0, 0);
  requestAnimationFrame(processOneFrame);
});

startButton.addEventListener('click', () => {
  phase = 'running';
  captureStillImage();
  processOneFrame();
  startContainer.style.display = 'none';
})

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;
  video.play();
});
