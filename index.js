const video = document.querySelector('video');

const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

const canvas2 = document.querySelector('#canvas2');
const ctx2 = canvas2.getContext('2d');

const worker = new Worker('worker.js');

video.addEventListener('loadedmetadata', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas2.width = video.videoWidth;
  canvas2.height = video.videoHeight;
});

video.addEventListener('play', () => {
  const tick = () => {
    ctx.drawImage(video, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    worker.postMessage(imageData.data.buffer, [imageData.data.buffer]);
  };

  worker.addEventListener('message', e => {
    const imageData = new ImageData(
      new Uint8ClampedArray(e.data),
      canvas.width,
      canvas.height,
    );

    ctx.putImageData(imageData, 0, 0);
    ctx2.putImageData(imageData, 0, 0);
    requestAnimationFrame(tick);
  });

  tick();
});

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;
  video.play();
});
