import { CollisionHandler } from "../CollisionHandler";
import { Sprite } from "../Sprite";
import { World } from "../World";
import { Water } from "../Water";

export class WaterWaterCollisionHandler extends CollisionHandler {
    public collideTo(sprite1: Sprite, sprite2: Sprite, world: World): void {
        if (sprite1 instanceof Water && sprite2 instanceof Water) {
            console.log(`Hi ~~`);
            return;
        } else if (this.next) {
            this.next.collideTo(sprite1, sprite2, world);
        }
    }
}
