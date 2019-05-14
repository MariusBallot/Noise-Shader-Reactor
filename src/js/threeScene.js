import * as THREE from 'three';
import SphereShader from './SphereShader';
import OrbitControls from 'orbit-controls-es6';
import SoundReactor from './SoundReactor';

class ThreeScene {

    constructor() {
        this.camera
        this.scene
        this.renderer
        this.sphere
        this.controls
        this.soundReactor
        this.composer
    }

    init() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 5)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enabled = true;
        this.controls.maxDistance = 1500;
        this.controls.minDistance = 0;
        this.controls.zoomSpeed = 0.2;


        this.sphere = new SphereShader();
        this.scene.add(this.sphere.mesh);

        this.soundReactor = new SoundReactor();


        this.bind()
    }

    update() {
        this.renderer.render(this.scene, this.camera)
        this.sphere.uniforms.u_time.value++;
        this.sphere.mesh.rotateY += 0.1;

        if (this.soundReactor.isPlaying) {
            this.soundReactor.update();
            this.sphere.uniforms.u_bass.value = this.soundReactor.fdata[5] / 256;
            this.sphere.uniforms.u_high.value = this.soundReactor.fdata[500] / 256;

        }
    }

    resizeCanvas() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix();
    }

    bind() {
        this.resizeCanvas = this.resizeCanvas.bind(this)
        window.addEventListener('resize', this.resizeCanvas)

    }
}

export { ThreeScene as default }