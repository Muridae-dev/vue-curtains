<template>
  <Curtains id="CurtainsCanvas">
    <div class="plane-container">
      <Plane
        v-for="n in 8"
        id="BasicPlane"
        :params="planeParams"
        @render="onRender"
      >
        <img src="@/assets/images/DSCF4951.jpeg" />
      </Plane>
    </div>
  </Curtains>
</template>

<script setup>
import { Curtains, Plane } from "vue-curtains";
import { planeFs } from "./shaders/mouseShaders";
import { planeVs } from "./shaders/defaultShaders";
import { onMounted, ref } from "vue";

const planeParams = {
  vertexShader: planeVs,
  fragmentShader: planeFs,
  uniforms: {
    time: {
      name: "uTime",
      type: "1f",
      value: 0,
    },
    mouse: {
      name: "uMouse",
      type: "2f",
      value: [0, 0],
    },
    mousePlane: {
      name: "uMousePlane",
      type: "2f",
      value: [0, 0],
    },
  },
};

const mousePos = ref({ x: 0, y: 0 });

onMounted(() => {
  window.addEventListener("mousemove", (e) => {
    mousePos.value = {
      x: e.clientX,
      y: e.clientY,
    };
  });
});

const onRender = (plane) => {
  plane.uniforms.time.value++;

  const boundingRect = plane.getBoundingRect();
  const centerX = boundingRect.left + boundingRect.width / 2;
  const centerY = boundingRect.top + boundingRect.height / 2;

  // Normalize mouse position relative to the window
  const dx = (mousePos.value.x - centerX) / window.innerWidth;
  const dy = (mousePos.value.y - centerY) / window.innerHeight;

  // Normalize mouse position for plane (relative to the plane's coordinates)
  const planeMouse = plane.mouseToPlaneCoords(mousePos.value);

  // Pass the normalized mouse position to the shader
  plane.uniforms.mousePlane.value = [planeMouse.x, planeMouse.y];
};
</script>

<style>
#app {
  min-height: 100vh;
}

#CurtainsCanvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.plane-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#BasicPlane {
  width: 20vw;
  aspect-ratio: 6/10;
}

#BasicPlane img {
  display: none;
}
</style>
