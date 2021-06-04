/**
 * A quick three point lighting setup in Three.js
 * @author Ian Yong (iantomarcello)
 */

import { Light, Scene, Vector3 } from 'three';
import { PointLight, DirectionalLight } from 'three';

/**
 * Interface for the arguement in the main function.
 */
interface setupThreePointLightingOption {
  scene?: Scene,
  cameraFar: number,
  intensity?: number,
  isDirectional?: Boolean,
};

export function setupThreePointLighting(options : setupThreePointLightingOption) {
  let { scene, cameraFar, intensity, isDirectional } = options;
  intensity = intensity ?? 2; 
  isDirectional = isDirectional ?? false;

  let keyLight : Light, fillLight : Light, backLight : Light;

  if ( isDirectional ) {
    keyLight = new DirectionalLight(0xffffff, intensity);
    keyLight.position.set(-cameraFar / 2, cameraFar / 4, cameraFar / 2);
    keyLight.lookAt(new Vector3());

    fillLight = new DirectionalLight(0xffffff, intensity * 0.2);
    fillLight.position.set(cameraFar / 2, cameraFar / 4, cameraFar / 2);
    fillLight.lookAt(new Vector3());

    backLight = new DirectionalLight(0xffffff, intensity * 0.2);
    backLight.position.set(0, cameraFar / 5, -cameraFar / 2);
    backLight.lookAt(new Vector3());
  } else {
    keyLight = new PointLight(0xffffff, intensity, cameraFar, 1);
    keyLight.position.set(-cameraFar / 2, cameraFar / 4, cameraFar / 2);

    fillLight = new PointLight(0xffffff, intensity * 0.5, cameraFar, 1);
    fillLight.position.set(cameraFar / 2, cameraFar / 4, cameraFar / 2);

    backLight = new PointLight(0xffffff, intensity * 0.3, cameraFar, 1);
    backLight.position.set(0, cameraFar / 5, -cameraFar / 2);
  }

  if ( scene ) {
    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);
  } else {
    console.log('scene is not defined, returning lights instances.');
  }

  return [keyLight, fillLight, backLight];
}

export type { setupThreePointLightingOption as Option };