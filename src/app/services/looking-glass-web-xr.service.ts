import {Injectable} from '@angular/core';
import {LookingGlassWebXRPolyfill} from "@lookingglass/webxr";

@Injectable({
    providedIn: 'root'
})
export class LookingGlassWebXrService {
    public createPolyfill() {
        LookingGlassWebXRPolyfill.init({
            //quiltResolution: 8,
            numViews: 45,
            targetY: 1,
            targetZ: 0,
            targetDiam: 3,
            fovy: (14 * Math.PI) / 180,
        });
    }
}
