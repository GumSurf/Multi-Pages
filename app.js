import * as functions from './windowManager.js';
import './window_manager.js';

let scene, camera, renderer, cube = [];

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
    
}

function renderScene() {
    // Création du rendu WebGL
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Création d'un cube avec une géométrie et un matériau
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Couleur verte
    cube = new THREE.Mesh(geometry, material);

    // Ajout du cube à la scène
    scene.add(cube);
}

function resize() {

}

function animate() {
    requestAnimationFrame(animate);

    // Rotation du cube sur les axes x et y
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Rendu de la scène avec la caméra
    renderer.render(scene, camera);
}

init();