# THREE point lighting
A simple helper function to create a plain three point lighting in [THREEJS](https://threejs.org/).

# Getting Started
Quick example:
```js
// main.js, that runs the webgl
import { setupThreePointLighting } from './js/esm/setupThreePointLighting';

// Here goes setupc odes for scenes and camera and etc.

// Here goes the light
setupThreePointLighting({
  scene: scene, // the scene
  cameraFar: camera.far, // the far plane of the camera
  intensity: 3, // intensity you like
  isDirectional: true, // light types: true gives DirectionalLight; false gives PointLights
});

// and thus lights are up.
```

# Manipulate the generated lights
The function returns the lights instances, should you like to update somethings.
```js
// Get those lights
const [keyLight, fillLight, backLight] = setupThreePointLighting({
  scene: scene,
  cameraFar: camera.far,
  intensity: 3,
  isDirectional: true,
});

// say key light isn't intense enough.
keyLight.intensity = 4;

// say fill light should be red.
fillLight.color.set('#ff0000');

// say back light should be higher.
backLight.position.y += 15;

```

### Happy lighting.