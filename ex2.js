var vertexes = new Float32Array([
  -.5,-.5,-.5,1, // 0
  .5,-.5,-.5,1, // 1
  -.5,.5,-.5,1, // 2
  -.5,-.5,.5,1, // 3
  .5,.5,-.5,1, // 4
  .5,-.5,.5,1, // 5
  -.5,.5,.5,1, // 6
  .5,.5,.5,1, // 7
]);

// TODO: break up into tripples
var indecies = new Int16Array([
  0,3,6,2,
  0,2,4,1,
  0,3,5,1,
  7,6,3,5,
  7,5,1,4,
  7,4,2,5,
]);

var gl = initGL(document.getElementById('ex1'));
setupGL(gl, [0.0, 0.0, 0.0, 1.0], gl.TRUE);

var shaders = [
  createSimpleShader(gl, gl.VERTEX_SHADER, document.getElementById('v2').text),
  createSimpleShader(gl, gl.FRAGMENT_SHADER, document.getElementById('f2').text)
];

var program = createSimpleProgram(gl, shaders, true);

gl.uniform4f(gl.getUniformLocation(program, 'iA'), 1, 0, 0, 0);
gl.uniform4f(gl.getUniformLocation(program, 'kA'), 1, 1, 1, 1);

// create buffers
createSimpleBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, gl.STATIC_DRAW);
configureAttribute(gl, program, {
  name: '',
  nmemb: 
})
// start program