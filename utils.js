/**
 * 
 * @param {HTMLElement} ele
 * @returns {WebGLRenderingContext} a webgl context
 */
function initGL(ele) {
  var gl = ele.getContext('webgl');
  if (gl != null) {
    return gl;
  }
  
  gl = ele.getContext('webgl-experemental');

  if (gl != null) {
    console.warn('webgl not fully supported, fallback to experimental');
    return gl;
  }

  console.error('webgl not supported');
  throw new Error('UnsupportedError');

  return null;
  
}

function setupGL(gl, glClear, is3D) {
  gl.clearColor(...glClear);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  if (is3D) {
    gl.enable(gl.DEPTH_TEST);
	  gl.enable(gl.CULL_FACE);
	  gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);
  }
}

function createSimpleShader(gl, shaderType, code) {

  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, code);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    debugger
		throw new Error({msg: 'CompilationError', log: gl.getShaderInfoLog(shader)});
  }

  return shader;
}

function createSimpleProgram(gl, shaders, validate) {
  var program = gl.createProgram();
  for (var i in shaders) {
    gl.attachShader(program, shaders[i]);
  }

  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)){
    throw new Error({msg: 'LinkError', log: gl.getProgramInfoLog(program)});
  }

  if (!validate) {
    return program;
  }

  gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		throw new Error({msg: 'ValidationError', log: gl.getProgramInfoLog(program)});
  }

  return program;
}

function createSimpleBuffer(gl, bufferType, usageType, formattedBufferObj) {
  var buffer = gl.createBuffer();
  gl.bindBuffer(bufferType, buffer);
  gl.bufferData(bufferType, formattedBufferObj, usageType);
  return buffer;
}

/**
 * @param {WebglContext} gl
 * @param {WebglProgram} program
 * @param {Object} attr
 * @param {string} attr.name
 * @param {number} attr.nmemb
 * @param {number} attr.type
 * @param {boolean} attr.normalised
 * @param {number} attr.size
 * @param {number} attr.offset
 */ 
function configureAttribute(gl, program, attr) {
  var loc = gl.getAttribLocation(program, attr.name);
  gl.vertexAttribPointer(
    loc,
    attr.npmemb,
    attr.type,
    attr.normalised,
    attr.size,
    attr.offset
  );
  gl.enableVertexAttribArray(loc);
}