attribute vec4 aPos;

attribute vec4 aColor;
varying vec4 vColor;

void main() {
  vColor = aColor;
  gl_Position = aPos;
}