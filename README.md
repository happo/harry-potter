# Invisible Cloak

This is an experiment with doing video manipulation in the browser using the
`video` element to capture the internal camera, a few `canvas`es to draw on, and
a web worker to do the pixel manipulation.

There's a demo available at https://invisibility-cloak.now.sh

## How it works

1. The stream from your camera is displayed in a (hidden) video element.
2. The first frame of the video is captured and drawn into a `canvas`, used as a
background
3. An animation loop (using `requestAnimationFrame`) is drawing video frames to
a canvas. The resulting pixels are captured and sent (via a shared buffer) to a
web worker.
4. The web worker finds blue(ish) pxels and makes them transparent. Then sends
the pixels over to the main thread (via a shared buffer).
5. The main thread paints the modified pixels in a `canvas`, displayed on top of
the background canvas (with the still image).
