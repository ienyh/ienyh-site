<template>
  <div class="three-window" id="three">
    <div class="btn-container">
      <button>正视图</button>
      <button>左视图</button>
      <button>俯视图</button>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import * as ThreeStats from "three-stats";
import TWEEN from "@tweenjs/tween.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { loadGLTF, traverseCastShadow } from "../../utils/threeUtils";

export default {
  data () {
    return {
      currentHeightLight: 0, // 当前高亮楼层坐标
    }
  },
  mounted () {
    const threeDom = document.querySelector("#three");
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.shadowMap.enabled = true;
    renderer.setSize(threeDom.offsetWidth, threeDom.offsetHeight, false);
    threeDom.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, threeDom.offsetWidth / threeDom.offsetHeight, 0.1, 4000);
    camera.position.set(18, 65, 85);

    const boxGroup = new THREE.Group();
    const geometry = new THREE.BoxGeometry(30, 3, 30);
    for (let i = 0; i < 20; i++) {
      const material = new THREE.MeshBasicMaterial({ color: 0x373d41});
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(60, i * 3, 0);
      cube.index = i; // 设置 cube 额外属性记录 index
      cube.isFloat = false; // 设置 cube 额外属性记录 是否浮动 isFloat
      boxGroup.add(cube);
    }
    scene.add(boxGroup);

    let beforeX, beforeY, afterX, afterY;
    threeDom.addEventListener('mousedown', e => {
      [ beforeX, beforeY ] = [ e.offsetX, e.offsetY ];
    });

    threeDom.addEventListener('mouseup', e => {
      [ afterX, afterY ] = [ e.offsetX, e.offsetY ];
    });

    // 添加场景交互
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    threeDom.addEventListener("click", (event) => {
      if (beforeX === afterX && beforeY === afterY) {
        mouse.x = (event.offsetX / threeDom.offsetWidth) * 2 - 1;
        mouse.y = - (event.offsetY / threeDom.offsetHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera); // 更新鼠标和射线位置
        const intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0 && Reflect.has(intersects[0].object, "index")) {
          boxGroup.children[this.currentHeightLight].material.color.set(0x373d41);
          this.currentHeightLight = this.changeHighLight(intersects[0].object);
          const boxes = boxGroup.children;
          for (let i = 0; i < boxes.length; i++) {
            // 使用 tween.js 添加楼层上升和下降补间动画
            const tween = new TWEEN.Tween(boxes[i].position);
            const positionY = boxes[i].position.y;
            // 记录 bug: 貌似点的太快谁出现位置错乱
            if (i >= this.currentHeightLight + 1 && !boxes[i].isFloat) {
              tween.to({ y: positionY + 3 }, 200);
              boxes[i].isFloat = true;
            }
            if (i < this.currentHeightLight + 1 && boxes[i].isFloat) {
              tween.to({ y: positionY - 3 }, 150);
              boxes[i].isFloat = false;
            }
            tween.start();
          }
        }
      }
    });

    // 添加 background
    const plane = new THREE.PlaneGeometry(1000, 1000);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x000066, side: THREE.DoubleSide });
    const planeMesh = new THREE.Mesh(plane, planeMaterial);
    planeMesh.rotation.x = Math.PI * 1 / 2;
    planeMesh.position.set(0, -8, -8);
    planeMesh.receiveShadow = true;
    scene.add(planeMesh);
    // 添加灯光
    scene.add(new THREE.AmbientLight(0x222244, 1.5));
    const light = new THREE.DirectionalLight({ color: 0x222244 });
    light.castShadow = true;
    light.position.set(8, 8, 10);
    scene.add(light);
    // 引入相机控制器
    const controls = new OrbitControls(camera, renderer.domElement);

    scene.add(new THREE.AxesHelper(80));

    const stats = new ThreeStats.Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.left = '0px';
    threeDom.appendChild(stats.domElement);

    // 设置一个动画函数
    const animate = function () {
      // 一秒钟调用 60 次，也就是以每秒 60 帧的频率来绘制场景。
      requestAnimationFrame(animate);
      // cube.rotation.y += 0.01;
      TWEEN.update();
      stats.update();
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("resize", () => {
      camera.aspect = threeDom.offsetWidth / threeDom.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(threeDom.offsetWidth, threeDom.offsetHeight)
    });

    loadGLTF("3d/pig/pig.glb")
      .then(res => res.scene)
      .then(res => {
        res.scale.set(1, 1, 1);
        res.position.set(0, 86, 0);
        res = traverseCastShadow(res);
        scene.add(res);
      })
      .catch(console.warn);

    function initChangeCameraBtn () {
      const [ front, left, top ] = document.querySelector(".btn-container").children;
      front.addEventListener("click", () => {
        const cameraTween = new TWEEN.Tween(camera.position);
        cameraTween.to({ x: 0, y: 24, z: 144 }, 1000);
        cameraTween.start();
      });
      left.addEventListener("click", () => {
        const cameraTween = new TWEEN.Tween(camera.position);
        cameraTween.to({ x: -144, y: 24, z: 0 }, 1000);
        cameraTween.start();
      });
      top.addEventListener("click", () => {
        const cameraTween = new TWEEN.Tween(camera.position);
        cameraTween.to({ x: 0, y: 144, z: 0 }, 1000);
        cameraTween.start();
      });
    }
    initChangeCameraBtn();
  },
  methods: {
    changeHighLight (_3dObj) {
      // 设置高亮效果
      _3dObj.material.color.set("#73777a");
      // _3dObj.material.transparent = true;
      // _3dObj.material.opacty = 0.5;
      return _3dObj.index;
    },
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
