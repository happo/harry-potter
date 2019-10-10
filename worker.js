self.addEventListener('message', e => {
  const data = new Uint8ClampedArray(e.data);

  for (let i = 0; i < data.length; i += 4) {
    data[i] = 100; // red
    data[i + 1] = 255 - data[i + 1]; // green
    data[i + 2] = 255 - data[i + 2]; // blue
  }

  self.postMessage(data.buffer, [data.buffer]);
});
