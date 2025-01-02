import { CollisionHandler } from "../CollisionHandler";
import { Sprite } from "../Sprite";
import { World } from "../World";
import { Water } from "../Water";
import { Fire } from "../Fire";

export class WaterFireCollisionHandler extends CollisionHandler {
    public collideTo(sprite1: Sprite, sprite2: Sprite, world: World): void {
        if (sprite1 instanceof Water && sprite2 instanceof Fire) {
            console.log(`互相傷害啊`);
            world.removeSprite(sprite1);
            world.removeSprite(sprite2);
        } else if (sprite2 instanceof Water && sprite1 instanceof Fire) {
            world.removeSprite(sprite1);
            world.removeSprite(sprite2);
        } else if (this.next) {
            this.next.collideTo(sprite1, sprite2, world);
        }
    }
}
