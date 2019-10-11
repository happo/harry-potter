self.addEventListener('message', e => {
  const data = new Uint8ClampedArray(e.data);

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];
    if (blue > (green + red) * 0.7) {
      data[i + 3] = 0;
    }
  }

  self.postMessage(data.buffer, [data.buffer]);
});
