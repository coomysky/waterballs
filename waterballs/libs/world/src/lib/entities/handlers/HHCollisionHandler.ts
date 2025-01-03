import { CollisionHandler } from "../CollisionHandler";
import { Sprite } from "../Sprite";
import { World } from "../World";
import { Hero } from "../Hero";

export class HHCollisionHandler extends CollisionHandler {
    public collideTo(sprite1: Sprite, sprite2: Sprite, world: World): void {
        if (sprite1 instanceof Hero && sprite2 instanceof Hero) {
            console.log("Hi 沒事");
            return;
        } else if (this.next) {
            this.next.collideTo(sprite1, sprite2, world);
        }
    }
}
