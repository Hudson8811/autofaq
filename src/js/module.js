import * as THREE from 'three';
//import { RoomEnvironment } from './jsm/environments/RoomEnvironment.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
//import { KTX2Loader } from 'js/jsm/loaders/KTX2Loader.js';
//import { MeshoptDecoder } from './jsm/libs/meshopt_decoder.module.js';

var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

$(document).ready(function() {
	let camera, scene, renderer;
	let spotLight, lightHelper, shadowCameraHelper;
	init();
	animate();

	function init() {

		const container = document.getElementById('model3d');

		renderer = new THREE.WebGLRenderer( {  alpha: true, antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1;
		renderer.setClearColor( 0x000000, 0 );
		renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;
		container.appendChild( renderer.domElement );

		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
		camera.position.set( 0, 0, 0 );

		//const environment = new RoomEnvironment();
		//const pmremGenerator = new THREE.PMREMGenerator( renderer );

		scene = new THREE.Scene();
		//scene.background = new THREE.Color( 0xffffff );
		//scene.environment = pmremGenerator.fromScene( environment ).texture;


		//light

		const ambient = new THREE.AmbientLight( 0xffffff, 1 );
		scene.add( ambient );

		/*
		spotLight = new THREE.SpotLight( 0xffffff, 1 );
		spotLight.position.set( 0, 10, 35 );
		spotLight.angle = Math.PI / 4;
		spotLight.penumbra = 0.1;
		spotLight.decay = 2;
		spotLight.distance = 200;

		spotLight.castShadow = true;
		spotLight.shadow.camera.far = 200;
		spotLight.shadow.mapSize.width = 256;
		spotLight.shadow.mapSize.height = 256;
		spotLight.shadow.bias = - 0.002;
		spotLight.shadow.radius = 4;
		spotLight.shadow.focus = 1;
		spotLight.shadowDarkness = 1;
		scene.add( spotLight );*/


		var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );

		directionalLight.position.set( 0, 10, 35 ).normalize();
		directionalLight.castShadow = true;
		directionalLight.shadow.mapSize.width = 2048;  // default
		directionalLight.shadow.mapSize.height = 2048; // default
		directionalLight.shadow.camera.near = 0.5;    // default
		directionalLight.shadow.camera.far = 1000;     // default
		scene.add( directionalLight );


		directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );

		directionalLight.position.set( -20, -10, 35 ).normalize();
		directionalLight.castShadow = true;
		directionalLight.shadow.mapSize.width = 2048;  // default
		directionalLight.shadow.mapSize.height = 2048; // default
		directionalLight.shadow.camera.near = 0.5;    // default
		directionalLight.shadow.camera.far = 1000;     // default
		scene.add( directionalLight );

/*
		spotLight = new THREE.SpotLight( 0xffffff, 1 );
		spotLight.position.set( -20, -10, 35 );
		spotLight.angle = Math.PI / 4;
		spotLight.penumbra = 0.1;
		spotLight.decay = 2;
		spotLight.distance = 200;

		spotLight.castShadow = true;
		spotLight.shadow.camera.far = 200;
		spotLight.shadow.mapSize.width = 256;
		spotLight.shadow.mapSize.height = 256;
		spotLight.shadow.bias = - 0.002;
		spotLight.shadow.radius = 4;
		spotLight.shadow.focus = 1;
		spotLight.shadowDarkness = 1;
		scene.add( spotLight );
*/




		const loader = new GLTFLoader().setPath( 'images/' );

		loader.load( 'SA_20_Static.glb', function( gltf ) {
			gltf.scene.traverse( function( node ) {
				if ( node.isMesh ) {
					node.castShadow = true;
					node.receiveShadow = true;

					node.position.y = 0;
					node.rotation.x = 1;
					node.rotation.y = 4;
					node.rotation.z = 0.4;
				}
			} );


			scene.add( gltf.scene );
		} );


		const controls = new OrbitControls( camera, renderer.domElement );
		controls.addEventListener( 'change', render ); // use if there is no animation loop
		controls.minDistance = 15;
		controls.maxDistance = 15;
		controls.target.set( 1, 0, 0 );
		controls.update();



		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		window.addEventListener( 'resize', onWindowResize, false );
	}

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

		render();

	}
/*

	function onWindowResize() {
		if (window.innerWidth > 1000) {
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;
			camera.aspect = 465 / 215;
			camera.updateProjectionMatrix();
			renderer.setSize( 800, 400 );
		}
	}*/
	function onDocumentMouseMove( event ) {
		mouseX = ( event.clientX - windowHalfX ) / 2;
		mouseY = ( event.clientY - windowHalfY ) / 2;
	}
//
	function animate() {
		requestAnimationFrame( animate );
		render();
	}
	function render() {
		//camera.position.z += ( mouseX - camera.position.z ) * .09;
		scene.traverse(function (child) {
			if ( child.isMesh ) {
				child.rotation.y = ( mouseX * 0.002  + 3 );
				child.rotation.x = ( mouseY * 0.001 + 1 );
				child.rotation.z = ( mouseX * 0.001 + 0.4 );
			}

		});
		//camera.position.y += ( - mouseY - camera.position.y ) * .05;
		camera.lookAt( scene.position );
		renderer.render( scene, camera );
	}


});












