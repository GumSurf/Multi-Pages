import * as functions from './windowManager.js';

let scene, camera, renderer, cubes = [], world;
let pixR = window.devicePixelRatio ? window.devicePixelRatio : 1;
let today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.setMilliseconds(0);
today = today.getTime();

let sceneOffsetTarget = { x: 0, y: 0 };
let sceneOffset = { x: 0, y: 0 };

function init() {
    setTimeout(() => {
        createScene();
        setupWindowManager();
        createCube();
        resize();
        updateWindowShape(false);
        renderScene();
        window.addEventListener('resize', resize);
    }, 500)
}

function createScene() {
    camera = new THREE.OrthographicCamera(0, 0, window.innerWidth, window.innerHeight, -10000, 10000);
    camera.position.z = 2.5; // Position de la caméra

    // Création de la scène
    scene = new THREE.Scene();
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({ antialias: true, depthBuffer: true });
    renderer.setPixelRatio(pixR);

    world = new THREE.Object3D();
    scene.add(world);

    renderer.domElement.setAttribute("id", "scene");
    document.body.appendChild(renderer.domElement);

}

function setupWindowManager() {
    functions.init();
}

function createCube() {
    const storedWindows = functions.getStoredWindows();

    cubes.forEach((c) => {
        world.remove(c);
    })

    cubes = [];

    for (let index = 0; index < storedWindows.length; index++) {
        let win = storedWindows[index];
        let c = new THREE.Color();
        c.setHSL(index * .1, 1.0, .5);

        let size = 100 + index * 50;
        let cube = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshBasicMaterial({ color: c, wireframe: true }));

        cube.position.x = win.shape.x + (win.shape.w * .5);
        cube.position.y = win.shape.y + (win.shape.h * .5);

        cubes.push(cube);
        world.add(cube);
    }
}

function renderScene() {
    // Création du rendu WebGL
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    functions.updateShape();

    let time = getTime();

    const storedWindows = functions.getStoredWindows();

    let falloff = .05;
    sceneOffset.x = sceneOffset.x + ((sceneOffsetTarget.x - sceneOffset.x) * falloff);
    sceneOffset.y = sceneOffset.y + ((sceneOffsetTarget.y - sceneOffset.y) * falloff);

    console.log("sceneOffset.x =", sceneOffset.x);
    world.position.x = sceneOffset.x;
    world.position.y = sceneOffset.y;

    for (let index = 0; index < cubes.length; index++) {
        let cube = cubes[index];
        let win = storedWindows[index];

        let posTarget = { x: win.shape.x + (win.shape.w * .5), y: win.shape.y + (win.shape.h * .5) }

        cube.position.x = cube.position.x + (posTarget.x - cube.position.x) * falloff;
        cube.position.y = cube.position.y + (posTarget.y - cube.position.y) * falloff;
        cube.rotation.x = time * .5;
        cube.rotation.y = time * .3;
    };
    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);
}

export function updateWindowShape(easing = true) {
    sceneOffsetTarget = { x: -window.screenX, y: -window.screenY };
    if (!easing) sceneOffset = sceneOffsetTarget;
    console.log("offsettarget =", sceneOffsetTarget);
}

function resize() {
    camera = new THREE.OrthographicCamera(0, window.innerWidth, 0, window.innerHeight, -10000, 10000);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    console.log("RESIZE !!!");
}

function getTime() {
    return (new Date().getTime() - today) / 1000.0;
}

init();

export { createCube };