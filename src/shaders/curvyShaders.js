export const planeVs = `precision mediump float;

      // those are the mandatory attributes that the lib sets
      attribute vec3 aVertexPosition;
      attribute vec2 aTextureCoord;

      // those are mandatory uniforms that the lib sets and that contain our model view and projection matrix
      uniform mat4 uMVMatrix;
      uniform mat4 uPMatrix;

      uniform float uTime;

      // our texture matrix that will handle image cover
      uniform mat4 uTextureMatrix0;

      // pass your vertex and texture coords to the fragment shader
      varying vec3 vVertexPosition;
      varying vec2 vTextureCoord;

      void main() {
        vec3 vertexPosition = aVertexPosition;

        float offset = 1.0 / 100.0;
        float uTimeOffset = uTime / 40.0;
        float wave = sin(vertexPosition.y + uTimeOffset);
        float sharpWave = sqrt(abs(wave)) * sign(wave);

        float waveX = sin(vertexPosition.y + uTimeOffset);
        float sharpWaveX = sqrt(abs(waveX)) * sign(waveX);

        // vertexPosition.x += sin(wave);
        // vertexPosition.y -= 0.2;
        // vertexPosition.z += sin(waveX * offset);



        gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
        // This is what essentially scales the image correctly to the width of the container
        vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
      }`;

export const planeFs = `precision mediump float;

      // get our varyings
      varying vec3 vVertexPosition;
      varying vec2 vTextureCoord;

      // the uniform we declared inside our javascript
      uniform float uTime;

      // our texture sampler (default name, to use a different name please refer to the documentation)
      uniform sampler2D uSampler0;

      void main() {
        float offset = 1.0 / 100.0;
        float uTimeOffset = uTime / 40.0;
        float wave = sin(vTextureCoord.y + uTimeOffset);
        float sharpWave = sqrt(abs(wave)) * sign(wave);

        vec2 rUV = vTextureCoord + vec2(sharpWave * offset, 0.001);
        vec2 gUV = vTextureCoord + vec2(sharpWave * -offset, -0.001);
        vec2 bUV = vTextureCoord + vec2(sharpWave * 0.02, 0.0);

        float r = texture2D(uSampler0, rUV).r;
        float g = texture2D(uSampler0, gUV).g;
        float b = texture2D(uSampler0, bUV).b;


        gl_FragColor = vec4(r, g, b, 1.0);
      }`;
