import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as BABYLON from 'babylonjs';

@Component({
  selector: 'app-root',
  template: `<canvas #renderCanvas></canvas>`,
  styles: [`canvas { width: 100%; height: 100%; display: block; }`]
})
export class AppComponent implements OnInit {
  @ViewChild('renderCanvas', { static: true }) renderCanvas!: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
    const canvas = this.renderCanvas.nativeElement;

    try {
      const engine = new BABYLON.Engine(canvas, true);

      // Basic scene setup
      const scene = new BABYLON.Scene(engine);
      const camera = new BABYLON.ArcRotateCamera(
        'camera',
        Math.PI / 2,
        Math.PI / 2,
        4,
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(canvas, true);

      const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
      BABYLON.MeshBuilder.CreateSphere('sphere', {}, scene);

      // Render the scene
      engine.runRenderLoop(() => scene.render());

      // Handle window resize
      window.addEventListener('resize', () => engine.resize());
    } catch (error) {
      console.error('WebGL not supported:', error);
      alert('Your browser or device does not support WebGL. Please update or try another browser.');
    }
  }
}
