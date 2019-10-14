const MAX_EUCLIDEAN_DISTANCE = Math.sqrt(255 ** 2 * 4);

let bg;

self.addEventListener('message', e => {
  if (e.data.bg) {
    console.log('Setting background');
    bg = new Uint8ClampedArray(e.data.bg);
    return;
  }
  if (!bg) {
    // no background ready yet
    console.log('no background yet');
    self.postMessage(e.data.frame, [e.data.frame]);
    return;
  }
  const data = new Uint8ClampedArray(e.data.frame);

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];
    const alpha = data[i + 3];

    const bgRed = bg[i];
    const bgGreen = bg[i + 1];
    const bgBlue = bg[i + 2];
    const bgAlpha = bg[i + 3];

    const euclideanDistance =
      Math.sqrt(
        (red - bgRed) ** 2 +
          (green - bgGreen) ** 2 +
          (blue - blue) ** 2 +
          (alpha - bgAlpha) ** 2,
      ) / MAX_EUCLIDEAN_DISTANCE;
    if (euclideanDistance < 0.05) {
      data[i + 3] = 0;
    }
  }

  self.postMessage(data.buffer, [data.buffer]);
});
