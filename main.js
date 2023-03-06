import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

// axis rotation enables
let x = false;
let y = false;
let z = false;

let scene = new THREE.Scene();

//WebGL engine
let renderer = new THREE.WebGLRenderer({
    canvas : document.querySelector('#canvas'),
    antialias: true
}); 
renderer.outputEncoding = THREE.sRGBEncoding;
//renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

let camera = new THREE.PerspectiveCamera(30, 1);

const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 0, 5);
controls.update();

scene.background = new THREE.Color('white');
//let light = new THREE.DirectionalLight(0xffff00, 10);
//scene.add(light);


let loader = new GLTFLoader();
loader.load('shiba/scene.gltf', function(gltf){
    scene.add(gltf.scene);

    function animate(){
        requestAnimationFrame(animate)
        
        // rotation
        if (x) {
            gltf.scene.rotation.x += 0.01;
        }
        if (y) {
            gltf.scene.rotation.y += 0.01;
        }
        if (z) {
            gltf.scene.rotation.z += 0.01;
        }

        // required if controls.enableDamping or controls.autoRotate are set to true
	    controls.update();

        renderer.render(scene, camera);
    }
    animate();
});