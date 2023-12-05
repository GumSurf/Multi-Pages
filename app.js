import * as functions from './windowManager.js';
import './window_manager.js';

let scene, camera, renderer, cubes = [];
let today = new Date();

function init() {
    createScene();
    setupWindowManager();
    createCube();
    resize();
    renderScene();
    animate();
}

function createScene() {
    // Création de la scène
    scene = new THREE.Scene();

    // Création d'une caméra (PerspectiveCamera)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5); // Position de la caméra

}

function setupWindowManager() {
    functions.init();
}

function createCube() {
    const storedWindows = functions.getStoredWindows();

    cubes.forEach((c) => {
        scene.remove(c);
    })

    cubes = [];

    for (let index = 1; index < storedWindows.length + 1; index++) {
        let c = new THREE.Color();
        c.setHSL(index * .1, 1.0, .5);

        let size = index;
        let cube = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshBasicMaterial({ color: c, wireframe: true }));
        cubes.push(cube);
        scene.add(cube);
    }
}

function renderScene() {
    // Création du rendu WebGL
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function resize() {

}

function getTime() {
    return (new Date().getTime() - today) / 1000.0;
}

function animate() {
    requestAnimationFrame(animate);
    let time = getTime();

    cubes.forEach(cube => {
        cube.rotation.x = time * 0.5;
        cube.rotation.y = time * 0.3;
    });

    // Rendu de la scène avec la caméra
    renderer.render(scene, camera);
}

// Fonction de mise à jour de la taille du rendu lorsque la fenêtre est redimensionnée
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  // Écouteur d'événement pour la redimensionnement de la fenêtre
  window.addEventListener('resize', onWindowResize);

init();

export { createCube };