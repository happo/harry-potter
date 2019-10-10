const video = document.querySelector('video');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

video.addEventListener('loadedmetadata', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
});

video.addEventListener('play', () => {
  const tick = () => {
    ctx.drawImage(video, 0, 0);
    requestAnimationFrame(tick);
  };
  tick();
});

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;
  video.play();
});
