import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {PerspectiveCamera, Plane, PlaneHelper, Scene, Vector3, WebGLRenderer} from 'three';
import {LumaSplatsThree} from '@lumaai/luma-web';
import {LookingGlassWebXrService} from "../../services/looking-glass-web-xr.service";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {VRButton} from "three/examples/jsm/webxr/VRButton";
import {FormsModule} from "@angular/forms";
import {ThreeMFLoader} from "three/examples/jsm/loaders/3MFLoader";

@Component({
    selector: 'luma-canvas',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './luma-canvas.component.html',
    styleUrl: './luma-canvas.component.css'
})
export class LumaCanvasComponent implements AfterViewInit, OnChanges {

    @Input()
    public showFocusPlane = true;

    @ViewChild('lumaCanvas')
    public lumaCanvas!: ElementRef<HTMLCanvasElement>;

    public targetZ = 0;

    private _scene = new Scene();
    private _splat?: LumaSplatsThree;
    private _focusPlane = this.createFocusPlane();

    constructor(private webXrService: LookingGlassWebXrService) {
    }

    public ngAfterViewInit() {
        this.webXrService.createPolyfill();
        this.createRenderer();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['showFocusPlane']) {
            this.onShowFocusPlane(this.showFocusPlane);
        }
    }

    public onTargetZChange(value: number) {
        this.webXrService.update({targetX: value});
    }

    public loadSplat(url: string) {
        if (this._splat) {
            this._scene.remove(this._splat);
        }

        this._splat = new LumaSplatsThree({
            source: url
        });
        this._scene.add(this._splat);
    }

    private createRenderer() {
        const renderer = new WebGLRenderer({
            canvas: this.lumaCanvas.nativeElement,
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight, false);
        renderer.xr.enabled = true;

        const lumaCanvas = this.lumaCanvas;

        setTimeout(function () {
            renderer.xr.enabled = true
            lumaCanvas.nativeElement.insertAdjacentElement('afterend', VRButton.createButton(renderer))
        }, 2000)

        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 2;

        const controls = new OrbitControls(camera, this.lumaCanvas.nativeElement);
        controls.enableDamping = true;

        renderer.setAnimationLoop(() => {
            controls.update();
            renderer.render(this._scene, camera);
        });
    }

    private createFocusPlane(): PlaneHelper {
        const plane = new Plane(new Vector3(1, 1, 0.2), 3);
        return new PlaneHelper(plane, 1, 0xffff00);
    }

    private onShowFocusPlane(enabled: boolean) {
        if (enabled) {

        }
    }
}
