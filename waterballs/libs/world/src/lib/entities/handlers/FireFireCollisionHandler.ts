import { CollisionHandler } from "../CollisionHandler";
import { Sprite } from "../Sprite";
import { World } from "../World";
import { Fire } from "../Fire";

export class FireFireCollisionHandler extends CollisionHandler {
    public collideTo(sprite1: Sprite, sprite2: Sprite, world: World): void {
        if (sprite1 instanceof Fire && sprite2 instanceof Fire) {
            console.log("Hi 沒事");
            return;
        } else if (this.next) {
            this.next.collideTo(sprite1, sprite2, world);
        }
    }
}
