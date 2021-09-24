import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const processDefault = xhr => {
  console.log('[Geometry]: ' + (xhr.loaded / xhr.total * 100).toFixed(2) + "% loaded");
}

class SimplyThree {

  _renderer = null;
  _scene = null;
  _camera = null;
  _control = null;

  _threeDom = null;

  constructor ({ id }) {
    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    this._threeDom = document.querySelector(`#${id}`);
    this._threeDom.appendChild(this._renderer.domElement);

    // this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(this._threeDom.offsetWidth, this._threeDom.offsetHeight);

    this._scene = new THREE.Scene();
    this.initCamera();
    this._control = new OrbitControls(this._camera, this._renderer.domElement);

    this.initLights();
    this.initMesh();
  }

  render () {
    this._animate();
  }

  _animate () {
    this._renderer.render(this._scene, this._camera);
    this._control.update();
    requestAnimationFrame(this._animate.bind(this));
  }

  initCamera () {
    this._camera = new THREE.PerspectiveCamera(45, this._threeDom.offsetWidth / this._threeDom.offsetHeight, 0.05, 1000);
    this._camera.position.set(12, 12, 12);
    this._camera.lookAt(0, 0, 0);
  }

  initLights () {
    this.addLight(new THREE.AmbientLight(0x404040));
    this.addLight(new THREE.SpotLight(0xffffff), light => {
      light.position.set(20, 20, 20);
      light.castShadow = true;
    });
  }

  initMesh () {
    const pl = new THREE.PlaneGeometry(40, 40, 40);
    const mtl = new THREE.MeshPhongMaterial(0x73777a);
    this.addMesh(new THREE.Mesh(pl, mtl), mesh => {
      mesh.position.set(0, 0, 0);
      mesh.receiveShadow = true;
      mesh.rotation.x = - Math.PI * 1 / 2;
    });
  }

  initControl (control, config) {
    this._control = control;
    config?.(this._control);
  }

  addLight (light, config) {
    config?.(light);
    this._scene.add(light);
  }

  addMesh (mesh, config) {
    config?.(mesh);
    this._scene.add(mesh);
  }

  static loadGLTF (_3dFilePath, success, process = processDefault, error = console.log) {
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("../../../assets/js/draco/gltf/");
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.load(_3dFilePath, success, process, error);
  }

  /**
   * 异步加载 .gltf & .glb 3d 文件
   * @param {*} _3dFilePath 
   * @returns {Promise}
   */
  static asyncLoadGLTF (_3dFilePath) {
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("../../../assets/js/draco/gltf/");
    gltfLoader.setDRACOLoader(dracoLoader);
    return new Promise((resolve, reject) => {
      gltfLoader.load(_3dFilePath, resolve, xhr => {
        console.log('[GLTF]: ' + (xhr.loaded / xhr.total * 100).toFixed(2) + "% loaded");
      }, reject);
    });
  }

  static loadObj (_3dFilePath) {
    const objLoader = new OBJLoader();
    return new Promise((resolve, reject) => {
      objLoader.load(_3dFilePath, resolve, xhr => {
        console.log('[OBJ]: ' + (xhr.loaded / xhr.total * 100).toFixed(2) + "% loaded");
      }, reject);
    })
  }

  // 递归遍历 让 3d 对象产生阴影
  static traverseCastShadow (_3dObj) {
    const obj = _3dObj;
    obj.children && obj.children.forEach(item => {
      Reflect.has(item, "castShadow") && Reflect.set(item, "castShadow", true);
      Reflect.has(item, "receiveShadow") && Reflect.set(item, "receiveShadow", true);
      if (item.children && item.children.length > 0) {
        ThreeComponent.traverseCastShadow(item);
      }
    });
    return obj;
  }
}

export { SimplyThree };