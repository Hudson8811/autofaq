import * as THREE from 'three';
//import { RoomEnvironment } from './jsm/environments/RoomEnvironment.js';
//import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
//import { KTX2Loader } from 'js/jsm/loaders/KTX2Loader.js';
//import { MeshoptDecoder } from './jsm/libs/meshopt_decoder.module.js';

var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

$(document).ready(function() {

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	function onDocumentMouseMove( event ) {
		mouseX = ( event.clientX - windowHalfX ) / 2;
		mouseY = ( event.clientY - windowHalfY ) / 2;
	}


	if (window.innerWidth > 1200 && $('#model3d').length > 0) {
		let camera, controls, scene, renderer;
		let camera2, controls2, scene2, renderer2;
		let spotLight, spotLight2, spotLight3;
		init();
		animate();

		function init() {
			const container = document.getElementById('model3d');
			const wrapper = document.getElementById('container3d');
			renderer = new THREE.WebGLRenderer( {  alpha: true, antialias: true } );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( wrapper.offsetWidth, wrapper.offsetWidth );
			renderer.toneMapping = THREE.ACESFilmicToneMapping;
			renderer.toneMappingExposure = 3;
			renderer.setClearColor( 0x000000, 0 );
			renderer.outputEncoding = THREE.sRGBEncoding;
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFSoftShadowMap;
			container.appendChild( renderer.domElement );

			camera = new THREE.PerspectiveCamera( 45, 1, 1, 1000 );
			camera.position.set( 7.4, 0, 0 );
			camera.lookAt( 0, 1, 0 );

			scene = new THREE.Scene();

			const light = new THREE.AmbientLight( 0x333333, 0.9  );
			scene.add( light );


			spotLight = new THREE.SpotLight( 0xffffff, 1.5 );
			spotLight.position.set( 1.8925437206586615, 6.562070933976482, -6.987850174038494,1 );
			spotLight.angle = Math.PI / 9;
			spotLight.penumbra = 0.1;
			spotLight.decay = 1;
			spotLight.distance = 0;
			spotLight.castShadow = true;
			spotLight.shadow.mapSize.width = 2048;
			spotLight.shadow.mapSize.height = 2048;
			spotLight.shadow.camera.near = 0.5;
			spotLight.shadow.camera.far = 500;
			spotLight.shadow.focus = 1;
			spotLight.shadow.radius = 40;
			scene.add( spotLight );


			spotLight2 = new THREE.SpotLight( 0xffffff, 1.5 );
			spotLight2.position.set( 6.037545724065725, 2.727324217791399, 9.004396247778892 );
			spotLight2.angle = Math.PI / 9;
			spotLight2.penumbra = 0.1;
			spotLight2.decay = 1;
			spotLight2.distance = 0;
			spotLight2.castShadow = true;
			spotLight2.shadow.mapSize.width = 2048;
			spotLight2.shadow.mapSize.height = 2048;
			spotLight2.shadow.camera.near = 0.5;
			spotLight2.shadow.camera.far = 500;
			spotLight2.shadow.focus = 1;
			spotLight2.shadow.radius = 40;
			scene.add( spotLight2 );


			spotLight3 = new THREE.SpotLight( 0xffffff, 0.22 );
			spotLight3.position.set( 11, 0, 0 );
			spotLight3.angle = Math.PI / 9;
			spotLight3.penumbra = 0.1;
			spotLight3.decay = 1;
			spotLight3.distance = 0;
			spotLight3.castShadow = false;
			scene.add( spotLight3 );

			const loader = new GLTFLoader().setPath( 'images/' );

			loader.load( 'scene.glb', function( gltf ) {
				gltf.scene.traverse( function( node ) {
					if ( node.isMesh ) {
						node.castShadow = true;
						node.receiveShadow = true;
					}
				} );
				scene.add( gltf.scene );
			} );


			window.addEventListener( 'resize', onWindowResize, false );
			$('.first-screen__3d-preloader').fadeOut(500);
			$('#model3d').css('opacity',1);
		}

		function onWindowResize() {
			camera.aspect = 1;
			camera.updateProjectionMatrix();

			const wrapper = document.getElementById('container3d');
			renderer.setSize( wrapper.offsetWidth, wrapper.offsetWidth );
			render();
		}



		function animate() {
			requestAnimationFrame( animate );
			render();
		}
		function render() {
			scene.traverse(function (child) {
				if ( child.isMesh ) {
					child.rotation.y = ( -mouseX * 0.002 );
					child.rotation.z = ( -mouseY * 0.001 );
				}

			});
			renderer.render( scene, camera );
		}




	}


	if (window.innerWidth > 1200 && $('#model3d2').length > 0) {
		let camera2, controls2, scene2, renderer2, spotLight3;
		init2();
		animate2();

		function init2() {
			const container = document.getElementById('model3d2');
			const wrapper = document.getElementById('container3d2');
			renderer2 = new THREE.WebGLRenderer( {  alpha: true, antialias: true } );
			renderer2.setPixelRatio( window.devicePixelRatio );
			renderer2.setSize( wrapper.offsetWidth, wrapper.offsetWidth );
			renderer2.setClearColor( 0x000000, 0 );
			renderer2.outputEncoding = THREE.sRGBEncoding;
			renderer2.shadowMap.enabled = true;
			renderer2.shadowMap.type = THREE.PCFSoftShadowMap;
			container.appendChild( renderer2.domElement );

			camera2 = new THREE.PerspectiveCamera( 45, 1, 0.1, 200 );
			camera2.position.set( 2.6, 0, 0 );
			camera2.lookAt( 0, 0, 0 );

			scene2 = new THREE.Scene();

			const light2 = new THREE.AmbientLight( 0x61A1F6, 0.8  );
			scene2.add( light2 );

			spotLight3 = new THREE.SpotLight( 0xffffff, 1 );
			spotLight3.position.set( 5, 0, 0 );
			spotLight3.angle = Math.PI / 10;
			spotLight3.penumbra = 0.1;
			spotLight3.decay = 1;
			spotLight3.distance = 0;
			spotLight3.castShadow = false;
			scene2.add( spotLight3 );

			const loader = new GLTFLoader().setPath( 'images/' );

			loader.load( 'earth.glb', function( gltf ) {
				gltf.scene.traverse( function( node ) {
					if ( node.isMesh ) {
						node.castShadow = true;
						node.receiveShadow = true;
					}
				} );
				scene2.add( gltf.scene );
			} );

			window.addEventListener( 'resize', onWindowResize2, false );
		}

		function onWindowResize2() {
			camera2.aspect = 1;
			camera2.updateProjectionMatrix();
			const wrapper = document.getElementById('container3d2');
			renderer2.setSize( wrapper.offsetWidth, wrapper.offsetWidth );
			render2();
		}


		function animate2() {
			requestAnimationFrame( animate2 );
			render2();
		}
		function render2() {
			scene2.traverse(function (child) {
				if ( child.isMesh ) {
					child.rotation.y = ( -mouseX * 0.004 );
					//child.rotation.z = ( -mouseY * 0.001 );
				}

			});
			renderer2.render( scene2, camera2 );
		}
	}
});












