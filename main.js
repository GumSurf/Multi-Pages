// Fonction pour stocker des données dans localStorage
function stockerDonnees() {
    // Exemple : stocker un message dans localStorage
    localStorage.setItem('message', 'Bonjour depuis la première page !');
  }
  
  // Fonction pour créer une scène 3D simple avec Three.js
  function creerScene() {
    // Vérifier si des données existent dans localStorage
    const message = localStorage.getItem('message');
  
    // Créer une scène, un cube rouge et une caméra
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
  
    // Créer un moteur de rendu
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  
    // Fonction d'animation de la scène
    function animate() {
      requestAnimationFrame(animate);
  
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
  
      renderer.render(scene, camera);
    }
  
    animate();
  
    // Stocker des données dans localStorage lors du chargement de la scène
    stockerDonnees();
  
    // Vérifier si des données existent dans localStorage
    if (message) {
      // Si des données existent, créer un bloc vert
      const geometryGreen = new THREE.BoxGeometry(1, 1, 1);
      const materialGreen = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cubeGreen = new THREE.Mesh(geometryGreen, materialGreen);
      scene.add(cubeGreen);
    }
  }
  
  // Créer la scène 3D lorsque le DOM est chargé
  document.addEventListener('DOMContentLoaded', creerScene);
  