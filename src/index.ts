// filepath: f:\Projects\2025\PCCC\Demo\Demo3d\demo_v2.0\src\index.ts
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// init camera
const isocamera = false;

let camera: THREE.OrthographicCamera | THREE.PerspectiveCamera;

let cameraSettings = {
    position: new THREE.Vector3(),
    lookAt: new THREE.Vector3(),
    fov: 45,
    far: 250,
};

if (isocamera) {
    const aspect = window.innerWidth / window.innerHeight;
    const d = 20;
    camera = new THREE.OrthographicCamera(
        -d * aspect,
        d * aspect,
        d,
        -d,
        1,
        4000
    );

    camera.position.set(20, 20, 20);
    camera.rotation.order = "YXZ";
    camera.rotation.y = -Math.PI / 4;
    camera.rotation.x = Math.atan(-1 / Math.sqrt(2));
} else {
    let cameraPositionFront = {
        fov: 15,
        far: 250,
        position: new THREE.Vector3(0, 7, 60),
        lookAt: new THREE.Vector3(0, 5, 0),
    };
    let cameraPositionAngled = {
        fov: 45,
        far: 250,
        position: new THREE.Vector3(15, 15, 20),
        lookAt: new THREE.Vector3(0, 5, 0),
    };
    let cameraPositionISO = {
        fov: 15,
        far: 250,
        position: new THREE.Vector3(50, 20, 50),
        lookAt: new THREE.Vector3(0, 5, 0),
    };
    cameraSettings = cameraPositionAngled;
    camera = new THREE.PerspectiveCamera(
        cameraSettings.fov,
        window.innerWidth / window.innerHeight,
        0.1,
        cameraSettings.far
    );
    camera.position.copy(cameraSettings.position);
}

// init renderer
const canvas = document.querySelector('.webgl') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", (event) => {
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// add light 
// Add ambient and directional lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);


// Add a light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// init controls
let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = true;
controls.target = cameraSettings.lookAt;


// Load a 3D model
const loader = new GLTFLoader();
loader.load(
    '../building_models/models_1k.glb', // Path to your 3D model
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
    },
    undefined,
    (error) => {
        console.error('An error occurred while loading the model:', error);
    }
);

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();