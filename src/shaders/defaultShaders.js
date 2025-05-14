export const planeVs = `precision mediump float;

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uTextureMatrix0;

varying vec2 vTextureCoord;

uniform vec2 uMousePlane;

void main() {
  vec3 vertexPosition = aVertexPosition;

  gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
        // This is what essentially scales the image correctly to the width of the container
        vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
}


`;
