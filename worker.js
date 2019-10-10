self.addEventListener('message', e => {
  const imageData = new ImageData(
    new Uint8ClampedArray(e.data.buffer),
    e.data.width,
    e.data.height,
  );

  const result = {
    buffer: imageData.data.buffer,
    width: imageData.width,
    height: imageData.height,
  };

  self.postMessage(result);
});
