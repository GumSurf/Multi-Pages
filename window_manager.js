function handleWindowResize(camera, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export function initializeWindowManager(camera, renderer) {
    handleWindowResize(camera, renderer);

    window.addEventListener('resize', () => handleWindowResize(camera, renderer));
}