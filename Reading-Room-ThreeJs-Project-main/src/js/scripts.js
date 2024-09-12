import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

import nebula from '../img/nebula.jpg';
import stars from '../img/stars.jpg';
import tabletop from "../img/tabletop.jpg";
import tabletop1 from "../img/tabletop1.jpg";
import tabletop2 from "../img/tabletop2.jpg";
import tabletop3 from   "../img/tabletop3.jpg";
import tabletop4 from   "../img/tabletop4.jpg";
import book1 from   "../img/book1.jpg";
import book2 from   "../img/book_back.jpg";
import book3 from   "../img/book1font.jpg";
import book4 from   "../img/book1back.jpg";
import book5 from   "../img/book1ide1.jpg";
import book6 from   "../img/book1side2.jpg";
import book7 from   "../img/book1top.jpg";
import penstand from   "../img/penstand.jpg";


//renderer
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(-50, 50, 25);
camera.lookAt(0, 12, 0);

//Orbit Control
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

//Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
ambientLight.position.set(30, 200, 4);
scene.add(ambientLight);

//pointLight
const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
pointLight.position.set(30, 200, 5);
pointLight.castShadow = true; // default false
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
scene.add(pointLight);

//dinstance of point light object
const lightRotateobj = new THREE.Object3D();
lightRotateobj.add(pointLight);
scene.add(lightRotateobj);
//add Fog
scene.fog = new THREE.Fog(0xFFFFFF, 0.1, 900);

//Helper
// const gui = new dat.GUI();
// const pLightHelper = new THREE.PointLightHelper(pointLight, 5);
// scene.add(pLightHelper);

const textureLoader = new THREE.TextureLoader();
//scene.background = textureLoader.load(stars);
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    nebula,
    nebula,
    stars,
    stars,
    stars,
    stars
]);

//Object: Plane
const planeGeometry = new THREE.PlaneGeometry(150, 150, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;


const tableTextures = [
  tabletop,
  tabletop1,
  tabletop2,
  tabletop3,
  tabletop4
];
let tableTextureNo = 1;
let tableTexture = new THREE.TextureLoader().load(
  tableTextures[tableTextureNo]
);
// tableTexture.wrapS = THREE.RepeatWrapping;
// tableTexture.wrapT = THREE.RepeatWrapping;
// tableTexture.repeat.set(1, 1);
// tableTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const tableMaterial = new THREE.MeshStandardMaterial({
  map: tableTexture,
});

 function createWood(length, width, height, positionX, positionY, positionZ) {
    const woodBoxGeo = new THREE.BoxGeometry(length, height, width);
    const woodBox = new THREE.Mesh(woodBoxGeo, tableMaterial);
    scene.add(woodBox);
    woodBox.position.set(positionX, positionY, positionZ);
    woodBox.castShadow = true;
    woodBox.receiveShadow = true;

   return woodBox
 }

function createSideTableElement(length, width, height, positionX, positionY, positionZ) {
  const woodBoxGeo = new THREE.BoxGeometry(length, height, width);
  const woodBox = new THREE.Mesh(woodBoxGeo, tableMaterial);
  woodBox.position.set(positionX, positionY, positionZ);
  woodBox.castShadow = true;
  woodBox.receiveShadow = true;

 return woodBox
}

let objectSupportTexture = new THREE.TextureLoader().load(
  tabletop
);
// objectSupportTexture.wrapS = THREE.RepeatWrapping;
// objectSupportTexture.wrapT = THREE.RepeatWrapping;
// objectSupportTexture.repeat.set(1, 1);
// objectSupportTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

function createCylinderObject(radiusTop, radiusBottom, height, posX, posY, posZ, angle) {
  const objectSupportGeo = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 36);
  const objectSupportMat = new THREE.MeshStandardMaterial({
    map: objectSupportTexture,
    side: THREE.DoubleSide,
  });
  const objectSupport = new THREE.Mesh(objectSupportGeo, objectSupportMat);
  objectSupport.position.set(posX, posY, posZ);
  objectSupport.rotation.x = THREE.MathUtils.degToRad(angle);
  objectSupport.castShadow = true;
  objectSupport.receiveShadow = true;
  return objectSupport;
}

//Create table              // 30, 18, 0.6, 0, 12, 0
const tableTop = createWood(30, 18, 0.6, 0, 12, 0); // 15 9 0.3
const drawer1Back = createWood(15, 0.3, 3, -7.5, 10.5, 0);
const drawer2Back = createWood(15, 0.3, 3, 7.5, 10.5, 0);
const drawerMid = createWood(0.3, 9, 3, 0, 10.5, 4.5);
const drawerLeft = createWood(0.3, 9, 3, -14.85, 10.5, 4.5);
const drawerRight = createWood(0.3, 9, 3, 14.85, 10.5, 4.5);
const drawer1Font = createWood(14.6, 0.3, 3, -7.4, 10.5, 8.85);
const drawer2Font = createWood(14.6, 0.3, 3, 7.4, 10.5, 8.85);
const drawer1bottom = createWood(14.6, 9, 0.3, -7.4, 9, 4.4);
const drawer2Bottom = createWood(14.6, 9, 0.3, 7.4, 9, 4.4);

// Table support far , table coord : 30, 18, 0.6, 0, 12, 0
tableTop.add(createCylinderObject(0.6, 0.4, 12.25, 11.4, -6, -7, 15));
// Table support near
tableTop.add(createCylinderObject(0.6, 0.4, 9.1, 11.4, -7.5, 7, -15));
//Drawer handle
tableTop.add(createCylinderObject(0.3, 0.05, 1, -7.425, -1.8, 9.1, 90));
tableTop.add(createCylinderObject(0.3, 0.05, 1, 7.425, -1.8, 9.1, 90));

//warDrobe base
const sideTableTop = createWood(13, 18, 0.5, -17, 8.8, 0);
sideTableTop.add(createSideTableElement(13, 17, 0.5, 0, -4.22, 0));
sideTableTop.add(createSideTableElement(13, 17, 0.5, 0, -8.4, 0));
//warDrobe sides left & right
sideTableTop.add(createSideTableElement(0.5, 17, 8.3, -6.25, -4.225, 0));
sideTableTop.add(createSideTableElement(0.5, 17, 8.3, 6.25, -4.225, 0));
//warDrobe back
sideTableTop.add(createSideTableElement(13, 0.5, 8.2, 0, -4.225, -8.75));
//warDrobe font
sideTableTop.add(createSideTableElement(13, 0.5, 3.9, 0, -2.3, 8.75));
sideTableTop.add(createSideTableElement(13, 0.5, 3.9, 0, -6.3, 8.75));
//warDrobe Drawer handle
sideTableTop.add(createCylinderObject(0.3, 0.05, 1, 0, -2.3, 9.1, 90));
sideTableTop.add(createCylinderObject(0.3, 0.05, 1, 0, -6.3, 9.1, 90));

//BookShelf base
const bookShelfLowerBack = createWood(13, 0.5, 3, -17, 10.3, -8.75);
bookShelfLowerBack.add(createSideTableElement(0.5, 9, 3, 6.25, 0, 4.5));
// BookShelf back
const bookShelfUpperBack = createWood(20, 0.5, 22, -13.5, 22.8, -8.75); // 8.5 11 
bookShelfUpperBack.add(createSideTableElement(0.5, 6, 3, -10, -12.5, 3));

bookShelfUpperBack.add(createSideTableElement(0.5, 6, 22, -10, 0, 3));
bookShelfUpperBack.add(createSideTableElement(0.5, 6, 22, 2, 0, 3));

bookShelfUpperBack.add(createSideTableElement(12, 6, 0.5, -4, 10.75, 3));
bookShelfUpperBack.add(createSideTableElement(12, 6, 0.5, -4, 4.75, 3));
bookShelfUpperBack.add(createSideTableElement(12, 6, 0.5, -4, -1.25, 3));
bookShelfUpperBack.add(createSideTableElement(12, 6, 0.5, -4, -7.75, 3));

function createCylinderShelfElement(posX, posY, posZ) {
  const cylindergeometry = new THREE.CylinderGeometry(5.9, 5.28, 1, 63, 1, false, 0, 1.64619455048105);
  // const cylindermaterial = new THREE.MeshStandardMaterial( 
  //   { 
  //     map: objectSupportTexture,
  //     side: THREE.DoubleSide 
  //   } ); 
  const cylindereObj = new THREE.Mesh( cylindergeometry, tableMaterial );
  cylindereObj.position.set(posX, posY, posZ);
  cylindereObj.castShadow = true;
  cylindereObj.receiveShadow = true;
  return cylindereObj;
}
//round shelf
bookShelfUpperBack.add(createCylinderShelfElement(2, 4, 0));
bookShelfUpperBack.add(createCylinderShelfElement(2, -3, 0));

//Object: Chair
//Chair Seat
const chairSeatGeometry = new THREE.CylinderGeometry(3, 3, 1, 34, 1, false, 5.04539780166521, 6.283185307179586);
const chairSeatMaterial = new THREE.MeshBasicMaterial( 
  { 
    color: 0x333300
  } ); 
const chairSeat = new THREE.Mesh( chairSeatGeometry, chairSeatMaterial );
chairSeat.position.set(0, 5, 13);
chairSeat.castShadow = true;
chairSeat.receiveShadow = true;
scene.add(chairSeat);

//Chair Seat Foam
const chairSeatGeometry1 = new THREE.CylinderGeometry(3, 2.5, 1.5, 34, 1, false, 5.04539780166521, 6.283185307179586);
const chairSeatMaterial1 = new THREE.MeshBasicMaterial( { color: 0x000000} ); 
const chairSeatFoam = new THREE.Mesh( chairSeatGeometry1, chairSeatMaterial1 );
chairSeatFoam.position.set(0, 0.5, 0);
chairSeatFoam.castShadow = true;
chairSeatFoam.receiveShadow = true;
chairSeat.add(chairSeatFoam);

chairSeat.add(createCylinderObject(0.2, 0.2, 7, 0, 3, 3.6, 15));

chairSeat.add(createCylinderObject(0.2, 0.2, 7, 0.9, 3, 3.45, 15));
chairSeat.add(createCylinderObject(0.2, 0.2, 7, -0.9, 3, 3.45, 15));

chairSeat.add(createCylinderObject(0.2, 0.2, 7, 1.8, 3, 3, 15));
chairSeat.add(createCylinderObject(0.2, 0.2, 7, -1.8, 3, 3, 15));

chairSeat.add(createCylinderObject(0.2, 0.2, 7, 2.35, 3, 2.35, 15));
chairSeat.add(createCylinderObject(0.2, 0.2, 7, -2.35, 3, 2.35, 15));

chairSeat.add(createCylinderObject(0.2, 0.2, 7, 2.7, 3, 1.5, 15));
chairSeat.add(createCylinderObject(0.2, 0.2, 7, -2.7, 3, 1.5, 15));

chairSeat.add(createCylinderObject(0.2, 0.2, 6, 2.85, 3, 0.5, 15));
chairSeat.add(createCylinderObject(0.2, 0.2, 6, -2.85, 3, 0.5, 15));

//leg
chairSeat.add(createCylinderObject(0.2, 0.2, 5, 2.35, -2.5, 1.8, -15));
chairSeat.add(createCylinderObject(0.2, 0.2, 5, -2.35, -2.5, 1.8, -15));

chairSeat.add(createCylinderObject(0.2, 0.2, 5, 2.35, -2.5, -1.8, 15));
chairSeat.add(createCylinderObject(0.2, 0.2, 5, -2.35, -2.5, -1.8, 15));

chairSeat.add(createCylinderObject(0.2, 0.2, 4, 2.4, -4, 0, 90));
chairSeat.add(createCylinderObject(0.2, 0.2, 4, -2.4, -4, 0, 90));

//decorations
const bookTextures = [
  book1,
  book2,
  penstand
];

function addNewBook(length, height, width, positionX, positionY, positionZ, bookTextureNo) {
  const bookGeo = new THREE.BoxGeometry(length, height, width, 10, 10, 10);
  let bookTexture = new THREE.TextureLoader().load(
    bookTextures[bookTextureNo]
  );
  const bookMat = new THREE.MeshStandardMaterial({
    map: bookTexture,
  });
  const newBook = new THREE.Mesh(bookGeo, bookMat);
  newBook.position.set(positionX, positionY, positionZ);
  newBook.castShadow = true;
  newBook.receiveShadow = true;

 return newBook
}
//sideTableTop: 13, 18, 0.5
sideTableTop.add(addNewBook(0.5, 5, 3, -5.75, 1.5, -6.9, 0));
sideTableTop.add(addNewBook(0.5, 5, 3, -5.14, 1.5, -6.9, 0));

//Object: pen stand
tableTop.add(addNewBook(0.1, 1, 1, 11, 0.9, -4, 2));
tableTop.add(addNewBook(0.1, 1, 1, 12, 0.9, -4, 2));
tableTop.add(addNewBook(1, 0.1, 1, 11.5, 0.4, -4, 2));
tableTop.add(addNewBook(1, 0.1, 0.1, 11.5, 0.2, -4.5, 2));
tableTop.add(addNewBook(1, 0.1, 0.1, 11.5, 0.4, -4.5, 2));
tableTop.add(addNewBook(1, 0.1, 0.1, 11.5, 0.6, -4.5, 2));
tableTop.add(addNewBook(1, 0.1, 0.1, 11.5, 0.8, -4.5, 2));
tableTop.add(addNewBook(1, 0.1, 0.1, 11.5, 1, -4.5, 2));
tableTop.add(addNewBook(1, 0.1, 0.1, 11.5, 1.2, -4.5, 2));
tableTop.add(addNewBook(1, 0.1, 0.1, 11.5, 1.4, -4.5, 2));

tableTop.add(addNewBook(1, 0.1, 0.1, 11.5, 0.2, -3.5, 2));
tableTop.add(addNewBook(1, 0.1, 0.1, 11.5, 0.4, -3.5, 2));
tableTop.add(addNewBook(1, 0.1, 0.1, 11.5, 0.6, -3.5, 2));
tableTop.add(addNewBook(1, 0.1, 0.1, 11.5, 0.8, -3.5, 2));
tableTop.add(addNewBook(1, 0.1, 0.1, 11.5, 1, -3.5, 2));
tableTop.add(addNewBook(1, 0.1, 0.1, 11.5, 1.2, -3.5, 2));
tableTop.add(addNewBook(1, 0.1, 0.1, 11.5, 1.4, -3.5, 2));
tableTop.add(createCylinderObject(0.05, 0.02, 1.5, 11.4, 1, -4, 40));

const allSideBookGeo = new THREE.BoxGeometry(3, 0.6, 5, 10, 5, 50);
const allSideBookMat = [
  new THREE.MeshStandardMaterial({map: textureLoader.load(book5)}),
  new THREE.MeshStandardMaterial({map: textureLoader.load(book4)}),
  new THREE.MeshStandardMaterial({map: textureLoader.load(book3)}),
  new THREE.MeshStandardMaterial({map: textureLoader.load(book6)}),
  new THREE.MeshStandardMaterial({map: textureLoader.load(book7)}),
  new THREE.MeshStandardMaterial({map: textureLoader.load(book7)})
];
const wholeBook = new THREE.Mesh(allSideBookGeo, allSideBookMat);
tableTop.add(wholeBook);
wholeBook.position.set(-11, 0.6, 4);
wholeBook.castShadow = true;
wholeBook.receiveShadow = true;


const clock = new THREE.Clock();
//Animate over time
function animate(time) {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

//Light rotattion around the room
function lightMove() {
    const time = clock.getElapsedTime();
  
    pointLight.position.x = Math.sin(time) * 80;
    pointLight.position.y = 60;
    pointLight.position.z = Math.cos(time) * 80;
  
    lightRotateobj.rotation.y += 0.01;
  
    requestAnimationFrame(lightMove);
  }
  
  lightMove();

// Camera move using keyboard interaction
let cameraRotationVar = 30;
let cameraPositionY = 50;

  function moveCamera() {
    camera.position.x = Math.sin(cameraRotationVar) * 100;
    camera.position.y = cameraPositionY;
    camera.position.z = Math.cos(cameraRotationVar) * 28.86;
    camera.lookAt(0, 12, 0);
    renderer.render(scene, camera);
  }
  
  document.onkeydown = checkKey;
  
  function checkKey(e) {
    if (e.keyCode == "38") {
      // up key
      cameraPositionY += 1;
      if (cameraPositionY > 80) {
        cameraPositionY = 80;
      }
      moveCamera();
    } else if (e.keyCode == "40") {
      // down arrow
      cameraPositionY -= 1;
      if (cameraPositionY < 20) {
        cameraPositionY = 20;
      }
      moveCamera();
    } else if (e.keyCode == "37") {
      // left arrow
      cameraRotationVar += 0.03;
      moveCamera();
    } else if (e.keyCode == "39") {
      // right arrow
      cameraRotationVar -= 0.03;
      moveCamera();
    }
  }

// --------------For changing table texture with mouseclick--------------
addEventListener("click", (event) => {
  tableTextureNo += 1;
  tableTextureNo = tableTextureNo % 4;

  tableTexture.dispose();
  tableTexture = new THREE.TextureLoader().load(tableTextures[tableTextureNo]);
  tableMaterial.map = tableTexture;
  uniforms["u_texture"].value = tableTexture;

});

//Makes the Canvas responsive 
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});