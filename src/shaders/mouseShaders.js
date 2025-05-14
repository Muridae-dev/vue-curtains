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

  // Calculate the direction from the center to the mouse position
  vec2 direction = normalize(uMousePlane); // Direction from the plane to the mouse
  float strength = length(uMousePlane); // How strong the effect is

  // Adjust tilt based on position relative to center
  float xTilt = (vertexPosition.x - 0.5) * -direction.x;
  float yTilt = (vertexPosition.y - 0.5) * -direction.y;

  float tiltStrength = 0.3; // Strength of the tilt effect

  // Apply tilt to the z-position of the vertex
  vertexPosition.z += (xTilt + yTilt) * tiltStrength * strength;

  // Apply the final transformation using the projection and model view matrices
  gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

  // Handle the texture coordinates
  vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
}


`;

export const planeFs = `precision mediump float;

    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;

    uniform vec2 uMousePlane;
    uniform sampler2D uSampler0;

    void main() {
    // Center the mouse position around (0.0)
    vec2 centeredMouse = uMousePlane - vec2(0.5);

    float strength = length(centeredMouse); // 0 to ~0.7
    vec2 direction = normalize(centeredMouse);

    float offset = 0.005; // tweak this for more or less RGB shift

    vec2 rUV = vTextureCoord + direction * offset * strength;
    vec2 gUV = vTextureCoord;
    vec2 bUV = vTextureCoord - direction * offset * strength;

    float r = texture2D(uSampler0, rUV).r;
    float g = texture2D(uSampler0, gUV).g;
    float b = texture2D(uSampler0, bUV).b;

    gl_FragColor = vec4(r, g, b, 1.0);
    }
    `;
