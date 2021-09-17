import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

class ThreeComponent {

  _renderer = null;
  _scene = null;
  _camera = null;

  _threeDom = null;

  constructor ({ id }) {
    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this._threeDom = document.querySelector(`#${id}`);
    this._threeDom.appendChild(this._renderer.domElement);

  }


  /**
   * 异步加载 .gltf & .glb 3d 文件
   * @param {*} _3dFilePath 
   * @returns {Promise}
   */
  static loadGLTF (_3dFilePath) {
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("js/draco/gltf/");
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

export { ThreeComponent };