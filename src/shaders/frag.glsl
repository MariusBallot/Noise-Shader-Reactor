#pragma glslify: cnoise = require(./pNoise4d.glsl);
      
uniform vec3 colorA; 
uniform vec3 colorB; 
uniform vec2 u_resolution;
uniform float u_time;
varying vec3 vUv;
varying float n;


void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;


  gl_FragColor = vec4(mix(colorA, colorB, 1.-n), 1.);
}