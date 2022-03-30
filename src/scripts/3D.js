import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

let particals = new Array();
let particalsSkelete = new Array();


let container = document.querySelector('header');

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, 721);
renderer.setClearColor(0x000000);
container.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

var Light = new THREE.AmbientLight(0xffffff);
scene.add(Light);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.update();

let Geometry = new THREE.SphereGeometry(0.02, 100, 100);
let material1 = new THREE.MeshPhongMaterial({color : 0xffffff});
let material2 = new THREE.MeshPhongMaterial({color : 0xffff80});

let maxX = 10;
let minX = -10;
let maxY = 4;
let minY = -4;

const count = 600;

for(let i = 0; i<count;i+=2){
    particals.push(new THREE.Mesh(Geometry, material1));
    scene.add(particals[i]);
    particals.push(new THREE.Mesh(Geometry, material2));
    scene.add(particals[i+1]);
}
const loader = new THREE.TextureLoader();
const Plane = new THREE.BoxGeometry(20, 0.01, 10);
const Pmaterial = new THREE.MeshBasicMaterial( { map:loader.load('/src/icons/Background.PNG') } );
let cube = new THREE.Mesh( Plane, Pmaterial );
cube.position.z = -0.1
cube.rotation.x = Math.PI/2;
cube.receiveShadow = true;
scene.add( cube );

//Физика
let world = new CANNON.World();
world.gravity.set(0,0,0);
let CannonDebugRenderer = new THREE.CannonDebugRenderer(scene, world)

let sphereCursor = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(0, 0, 0)
})
let sphereShapeCursor = new CANNON.Sphere(0.5)
sphereCursor.addShape(sphereShapeCursor)
world.addBody(sphereCursor)

let sphereShape = new CANNON.Sphere(0.02)
for(let i = 0; i < count; i++){
    particalsSkelete.push(new CANNON.Body({mass: 9,velocity:new CANNON.Vec3(0.00001,0.00001,0.00001), position: new CANNON.Vec3(Math.random() * (maxX - minX) + minX,  Math.random() * (maxY - minY) + minY, 0)}));
    particalsSkelete[i].addShape(sphereShape);
    world.addBody(particalsSkelete[i]);
}

loading();
function loading(){
    requestAnimationFrame(loading);
    renderer.render(scene, camera);
    // CannonDebugRenderer.update();
    world.step(1/60);
    for(let i = 0; i<count;i+=2){
        if(particalsSkelete[i].position.x >= 9.5) particalsSkelete[i].position.x = -9.5;
        if(particalsSkelete[i].position.y <= -4.5) particalsSkelete[i].position.y = 4.5;
        particalsSkelete[i].position.x += 0.01;
        particalsSkelete[i].position.y += -0.01;
        particalsSkelete[i].position.z = 0;


        if(particalsSkelete[i+1].position.x <= -9.5) particalsSkelete[i+1].position.x = 9.5;
        if(particalsSkelete[i+1].position.y >= 4.5) particalsSkelete[i+1].position.y = -4.5;

        particalsSkelete[i+1].position.x += -0.01;
        particalsSkelete[i+1].position.y += 0.01;
        particalsSkelete[i+1].position.z = 0;

        particals[i].position.x = particalsSkelete[i].position.x;
        particals[i].position.y = particalsSkelete[i].position.y;

        particals[i+1].position.x = particalsSkelete[i+1].position.x;
        particals[i+1].position.y = particalsSkelete[i+1].position.y;
    }
}
document.addEventListener("mousemove",(e)=>{
    sphereCursor.position.x = ((e.clientX/(window.innerWidth/2))-1)*9;
    sphereCursor.position.y = -((e.clientY/(window.innerHeight/2))-1)*4;
})
