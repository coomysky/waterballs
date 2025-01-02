import { CollisionHandler } from "../CollisionHandler";
import { Sprite } from "../Sprite";
import { World } from "../World";

export class NullCollisionHandler extends CollisionHandler {
    constructor() {
        super(null);
    }

    public collideTo(sprite1: Sprite, sprite2: Sprite, world: World): void {
        // the end
        return;
    }
}
