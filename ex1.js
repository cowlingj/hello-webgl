var interpollationStr = ['pos', 'color'];

var vShader = `
precision mediump float;

attribute vec2 ${interpollationStr[0]};

attribute vec3 ${interpollationStr[1]};
varying vec3 v_${interpollationStr[1]};

void main() {
  v_${interpollationStr[1]} = ${interpollationStr[1]}; 
  gl_Position = vec4(${interpollationStr[0]}, 0.0, 1.0);
}
`;

var fShader = `
precision mediump float;

varying vec3 v_${interpollationStr[1]};

void main() {
  gl_FragColor = vec4(v_${interpollationStr[1]}, 1.0);
}
`;

triangle = new Float32Array([
  .5, -.5,
  0, .5,
  -.5, -.5
]);

colors = new Float32Array([
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
]);

var gl = initGL(document.getElementById('ex1'));
setupGL(gl, [0.0, 0.0, 0.0, 1.0], false);

var shaders = [
  createSimpleShader(gl, gl.VERTEX_SHADER, vShader),
  createSimpleShader(gl, gl.FRAGMENT_SHADER, fShader)
];

var program = createSimpleProgram(gl, shaders, true);

createSimpleBuffer(gl, gl.ARRAY_BUFFER, gl.STATIC_DRAW, triangle);
configureAttribute(gl, program,
  {
    name: interpollationStr[0],
    npmemb: 2,
    type: gl.FLOAT,
    normalised: true,
    size: 2 * Float32Array.BYTES_PER_ELEMENT,
    offset: 0
  })

createSimpleBuffer(gl, gl.ARRAY_BUFFER, gl.STATIC_DRAW, colors);
configureAttribute(gl, program,
  {
    name: interpollationStr[1],
    npmemb: 3,
    type: gl.FLOAT,
    normalised: true,
    size: 3 * Float32Array.BYTES_PER_ELEMENT,
    offset: 0
  })

gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 3);