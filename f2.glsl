uniform float kA;
uniform vec3 iA;
// objNormal pointNormal(s)

varying vec4 vColor;

void main() {
  gl_FragColor = vColor.xyz * (iA.x * kA, iA.y * kA, iA.z * kA), vColor.w;
}