import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";


// 递归遍历 让 3d 对象产生阴影
export function traverseCastShadow (_3dObj) {
  const obj = _3dObj;
  obj.children && obj.children.forEach(item => {
    Reflect.has(item, "castShadow") && Reflect.set(item, "castShadow", true);
    Reflect.has(item, "receiveShadow") && Reflect.set(item, "receiveShadow", true);
    if (item.children && item.children.length > 0) {
      traverseCastShadow(item);
    }
  });
  return obj;
}

/**
 * 异步加载 .gltf & .glb 3d 文件
 * @param {*} _3dFilePath 
 * @returns {Promise}
 */
export function loadGLTF (_3dFilePath) {
  const gltfLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("js/draco/gltf/");
  gltfLoader.setDRACOLoader(dracoLoader);
  return new Promise((resolve, reject) => {
    gltfLoader.load(_3dFilePath, resolve, xhr => {
      console.log((xhr.loaded / xhr.total * 100).toFixed(2) + "% loaded");
    }, reject);
  });
}

/**
 * error
 */
export async function getTextGeometry (fontPath, str) {
  const loader = new THREE.FontLoader();
  loader.load(fontPath, (font) => {
    const fontGeometry = new THREE.TextGeometry(str, {
      font: font,
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelSegments: 5,
    });
    console.log(fontGeometry);
    return Promise.resolve(fontGeometry);
  }, undefined, (err) => {
    console.log(err);
  });
  return Promise.reject("load error");
}
