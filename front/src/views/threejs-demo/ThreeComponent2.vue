<template>
  <div class="three-window" id="three-window">
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { getTextGeometry } from "../../utils/threeUtils";

export default {
  mounted () {
    const threeDom = document.querySelector("#three-window");
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.shadowMap.enabled = true;
    renderer.setSize(threeDom.offsetWidth, threeDom.offsetHeight, false);
    threeDom.appendChild(renderer.domElement);
    

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, threeDom.offsetWidth / threeDom.offsetHeight, 0.1, 2000);
    camera.position.set(12, 36, 24);
    const controls = new OrbitControls(camera, renderer.domElement);

    addPlaneGround(scene);
    addLight(scene);
    const box = addBoxGeometry(scene);
    scene.add(new THREE.AxesHelper(80));


    const animate = function () {
      requestAnimationFrame(animate);
      box.rotation.y += 0.01;
      // TWEEN.update();
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    function addBoxGeometry (scene) {
      const geometry = new THREE.IcosahedronGeometry(3.0, 1);
      const material = new THREE.MeshStandardMaterial({ color: 0x00ffff, metalness: 0.1, wireframe: true });
      // material.map = new THREE.TextureLoader().load("../../assets/poly_background.png");
      const box = new THREE.Mesh(geometry, material);
      box.castShadow = true;
      box.position.set(0, 1, 0);
      scene.add(box);
      return box;
    }

    function addPlaneGround (scene) {
      const plane = new THREE.PlaneGeometry(400, 400);
      const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x73777a, metalness: 0.1, side: THREE.DoubleSide });
      const planeMesh = new THREE.Mesh(plane, planeMaterial);
      planeMesh.rotation.x = Math.PI * 1 / 2;
      planeMesh.position.set(0, -3, 0);
      planeMesh.receiveShadow = true;
      scene.add(planeMesh);
    }

    function addLight (scene) {
      scene.add(new THREE.AmbientLight(0x222244, 1.5));
      const light = new THREE.DirectionalLight({ color: 0x222244 });
      light.castShadow = true;
      light.position.set(8, 8, 8);
      scene.add(light);
    }
  }
}
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.three-window {
  height: 100%;
  width: 100%;
  position: relative;
  padding: 0;
}

.btn-container {
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
}

.btn-container button {
  margin-left: 0.5rem;
  padding: 0.2rem 0.5rem;
}
</style>
