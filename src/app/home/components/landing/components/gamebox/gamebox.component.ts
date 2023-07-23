import {
  Component,
  HostListener,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-gamebox',
  templateUrl: './gamebox.component.html',
  styleUrls: ['./gamebox.component.scss'],
})
export class GameboxComponent implements AfterViewInit {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private canvasSizes: { width: number; height: number };
  private box: THREE.Mesh;
  private canvas: HTMLCanvasElement;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.canvas = this.elementRef.nativeElement.querySelector('#canvas-box');
    if (this.canvas) {
      this.initThreeJs();
    }
  }

  initThreeJs(): void {
    this.scene = new THREE.Scene();

    const textureLoader = new THREE.TextureLoader();

    const textures = [
      textureLoader.load(
        '../../../../../../assets/three/box-texture-sideright.jpg'
      ),
      textureLoader.load(
        '../../../../../../assets/three/box-texture-sidetop.jpg'
      ),
      textureLoader.load(
        '../../../../../../assets/three/box-texture-sidetop.jpg'
      ),
      textureLoader.load(
        '../../../../../../assets/three/box-texture-sidetop.jpg'
      ),
      textureLoader.load('../../../../../../assets/three/box-texture-top.jpg'),
      textureLoader.load(
        '../../../../../../assets/three/box-texture-sideright.jpg'
      ),
    ];

    const materials = textures.map(
      (texture) => new THREE.MeshStandardMaterial({ map: texture })
    );

    this.box = new THREE.Mesh(
      new THREE.BoxGeometry(15.5, 11, 3.5, 100),
      materials
    );

    this.box.rotation.x = 10;
    this.box.rotation.y = 100;

    this.scene.add(this.box);

    // Create directional light from the left
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(-10, 5, 0); // Adjust position from the left side
    directionalLight.castShadow = true; // Enable shadow casting
    this.scene.add(directionalLight);

    // Create a spot light from the top
    const spotLightTop = new THREE.SpotLight(0xffffff, 4);
    spotLightTop.position.set(0, 10, 0); // Adjust position from the top side
    spotLightTop.castShadow = true; // Enable shadow casting
    this.scene.add(spotLightTop);

    // Create a spot light from the bottom
    const spotLightBottom = new THREE.SpotLight(0xffffff, 3);
    spotLightBottom.position.set(0, -10, 0); // Adjust position from the bottom side
    spotLightBottom.castShadow = true; // Enable shadow casting
    this.scene.add(spotLightBottom);
    // Create a spot light from the right
    const spotLightRight = new THREE.SpotLight(0xffffff, 4);
    spotLightRight.position.set(10, 5, 0); // Adjust position from the right side
    spotLightRight.castShadow = true; // Enable shadow casting
    this.scene.add(spotLightRight);

    this.canvasSizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.canvasSizes.width / this.canvasSizes.height,
      0.001,
      1000
    );
    this.camera.position.z = 30;
    this.scene.add(this.camera);

    if (!this.canvas) {
      return;
    }

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(this.canvasSizes.width, this.canvasSizes.height);

    window.addEventListener('resize', () => {
      this.canvasSizes.width = window.innerWidth;
      this.canvasSizes.height = window.innerHeight;

      this.camera.aspect = this.canvasSizes.width / this.canvasSizes.height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.canvasSizes.width, this.canvasSizes.height);
      this.renderer.render(this.scene, this.camera);
    });

    this.animateGeometry();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    this.box.rotation.x = scrollY * 0.003;

    this.renderer.render(this.scene, this.camera);
  }

  private animateGeometry(): void {
    const animate = () => {
      this.onScroll(null); // Call onScroll to update rotation based on scroll position
      requestAnimationFrame(animate);
    };
    animate();
  }
}
