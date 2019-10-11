const lowerBlue = [0, 0, 100];
const upperBlue = [150, 150, 255];

self.addEventListener('message', e => {
  const data = new Uint8ClampedArray(e.data);

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    // if (
    //   red >= lowerBlue[0] &&
    //   green >= lowerBlue[1] &&
    //   blue >= lowerBlue[2] &&
    //   red <= upperBlue[0] &&
    //   green <= upperBlue[1] &&
    //   blue <= upperBlue[2]
    // ) {
    //   data[i + 3] = 0;
    // }
    if (blue > (green + red) * 0.7) {
      data[i + 3] = 0;
    }
  }

  self.postMessage(data.buffer, [data.buffer]);
});
