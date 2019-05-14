#pragma glslify: noise = require(./perlinNoise3d.glsl);
#pragma glslify: snoise = require(./simplexNoise.glsl);
#pragma glslify: cnoise = require(./pNoise4d.glsl);


uniform vec2 u_resolution;  
uniform float u_time;
uniform float u_bass;
uniform float u_high;
varying vec3 vUv; 
varying float n;


void main() {
  vUv = position; 

  n = cnoise(vec4(vUv*(u_high+1.), u_time/100.))+0.5;
  n*=u_bass+1.;

  vec4 modelViewPosition = modelViewMatrix * vec4(vUv*(n+0.2), 1.);
  gl_Position = projectionMatrix * modelViewPosition;
}