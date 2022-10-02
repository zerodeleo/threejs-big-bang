import './style.css'
import * as THREE from 'three'
import { BoxGeometry, Material } from 'three';
import { rand, randCoordinate, randNegPos } from './utils';

// Canvas
const canvas = document.querySelector('.webgl');

// Scene
const scene = new THREE.Scene();

const arr = Array(10000).fill('');

// Object
const meshes = arr.map(() => {
    const geometry = new THREE.SphereGeometry(rand());
    const material = new THREE.MeshBasicMaterial({ color: `rgba(${rand(255)},${rand(255)},255)` });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    return mesh;
})

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(90,aspectRatio);
camera.position.z = 100;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
});

const tick = () => {
    meshes.forEach(mesh => mesh);
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();

const SPEED = 0.5;
let coordinates = [];
const pop = () => {
    meshes.forEach((mesh, i) => {
        mesh
            .position
            .set(
                coordinates[i][0] + mesh.position.x,
                coordinates[i][1] + mesh.position.y,
                coordinates[i][2] + mesh.position.z
            );
    })
    window.requestAnimationFrame(pop);
};

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

window.addEventListener('load', () => {
    coordinates = meshes.map(() => [
        rand() * randNegPos() / SPEED,
        rand() * randNegPos() / SPEED,
        rand() * randNegPos() / SPEED
    ])
    pop();
});
