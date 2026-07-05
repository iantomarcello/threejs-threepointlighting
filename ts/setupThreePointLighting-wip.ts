/**
 * A class based three point lighting setup in Three.js
 */

import { Light, Scene, Vector3 } from 'three';
import { PointLight, DirectionalLight } from 'three';

export class setupThreePointLighting {
  _scene?: Scene;
  _cameraFar!: number;
  _intensity!: number;
  _isDirectional?: Boolean;
  keyLight!: Light;
  fillLight!: Light;
  backLight!: Light;
  _target: Vector3 = new Vector3();

  constructor(scene: Scene, cameraFar: number, intensity: number = 2, isDirectional: boolean = false) {
    if ( cameraFar == null ) {
      console.error('Error, parameter `cameraFar` is undefined');
      return;
    }

    this._scene = scene;
    this._cameraFar = cameraFar;
    this._intensity = intensity;
    this._isDirectional = isDirectional;

    this.assignLights();
  }

  private assignLights() {
    let { keyLight, fillLight, backLight, _target, _cameraFar, _intensity } = this;

    if ( this._isDirectional ) {
      keyLight = new DirectionalLight(0xffffff, _intensity);
      keyLight.position.set(-_cameraFar / 2, _cameraFar / 4, _cameraFar / 2);
      keyLight.lookAt(_target);

      fillLight = new DirectionalLight(0xffffff, _intensity * 0.5);
      fillLight.position.set(_cameraFar / 2, _cameraFar / 4, _cameraFar / 2);
      fillLight.lookAt(_target);

      backLight = new DirectionalLight(0xffffff, _intensity * 0.3);
      backLight.position.set(_cameraFar / 5, _cameraFar / 5, _cameraFar / 4);
      backLight.lookAt(_target);

    } else {
      keyLight = new PointLight(0xffffff, _intensity, _cameraFar * 2, 2);
      keyLight.position.set(-_cameraFar / 2, _cameraFar / 4, _cameraFar / 2);

      fillLight = new PointLight(0xffffff, _intensity * 0.5, _cameraFar * 2, 2);
      fillLight.position.set(_cameraFar / 2, _cameraFar / 4, _cameraFar / 2);

      backLight = new PointLight(0xffffff, _intensity * 0.3, _cameraFar * 2, 2);
      backLight.position.set(_cameraFar / 5, _cameraFar / 5, _cameraFar / 4);
    }
  }


  setDirectionalLightTarget(target: Vector3) {
    let { keyLight, fillLight, backLight, _target, _cameraFar, _intensity } = this;
    this._target = target;
    keyLight.lookAt(target);
    fillLight.lookAt(target);
    backLight.lookAt(target);
  }

  init() {
    let { _scene: scene, keyLight, fillLight, backLight } = this;

    if ( scene ) {
      scene.add(keyLight);
      scene.add(fillLight);
      scene.add(backLight);
    } else {
      console.log('scene is not defined, returning lights instances.');
    }

    return [keyLight, fillLight, backLight];
  }
}