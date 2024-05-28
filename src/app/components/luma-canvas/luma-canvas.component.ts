import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {LumaSplatsThree} from '@lumaai/luma-web';
import {LookingGlassWebXrService} from "../../services/looking-glass-web-xr.service";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

@Component({
    selector: 'luma-canvas',
    standalone: true,
    imports: [],
    templateUrl: './luma-canvas.component.html',
    styleUrl: './luma-canvas.component.css'
})
export class LumaCanvasComponent implements AfterViewInit {

    @ViewChild('lumaCanvas')
    private lumaCanvas!: ElementRef<HTMLCanvasElement>;

    constructor(private webXrService: LookingGlassWebXrService) {
    }

    ngAfterViewInit() {
        this.webXrService.createPolyfill();
        this.createRenderer();
    }

    private createRenderer() {
        const renderer = new WebGLRenderer({
            canvas: this.lumaCanvas.nativeElement,
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight, false);
        renderer.xr.enabled = true;

        const scene = new Scene();
        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 2;

        const controls = new OrbitControls(camera, this.lumaCanvas.nativeElement);
        controls.enableDamping = true;

        const splat = new LumaSplatsThree({
            source: 'https://lumalabs.ai/capture/d80d4876-cf71-4b8a-8b5b-49ffac44cd4a'
        });
        scene.add(splat);

        renderer.setAnimationLoop(() => {
            controls.update();
            renderer.render(scene, camera);
        });
    }
}
