import {Injectable} from '@angular/core';
// @ts-ignore: For some reason, this import isn't working properly when using auto-generated imports.
// This is the proper import statement as suggested by Bryan from Looking Glass Factory.
import {LookingGlassWebXRPolyfill} from "@lookingglass/webxr";
import {ViewControlArgs} from "@lookingglass/webxr/dist/LookingGlassConfig";

@Injectable({
    providedIn: 'root'
})
export class LookingGlassWebXrService {

    private polyfill?: LookingGlassWebXRPolyfill;

    public createPolyfill() {
        this.polyfill = new LookingGlassWebXRPolyfill({
            numViews: 45,
            targetY: 1,
            targetZ: -0.5, // This is the value we need to change to move the focus back and forth. We can also dynamically change these using the updat() method.
            targetDiam: 3,
            fovy: (14 * Math.PI) / 180,
        });
    }

    public update(config: Partial<ViewControlArgs>) {
        this.polyfill.update(config);
    }
}
