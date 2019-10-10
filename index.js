const video = document.querySelector('video');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const worker = new Worker('worker.js');

video.addEventListener('loadedmetadata', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
});

video.addEventListener('play', () => {
  const tick = () => {
    ctx.drawImage(video, 0, 0);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    worker.postMessage({
      buffer: pixels.data.buffer,
      width: canvas.width,
      height: canvas.height,
    });
  };

  worker.addEventListener('message', e => {
    const imageData = new ImageData(
      new Uint8ClampedArray(e.data.buffer),
      e.data.width,
      e.data.height,
    );

    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(tick);
  });

  tick();
});

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;
  video.play();
});
