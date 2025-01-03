import { World } from "./World";
import { Sprite } from "./Sprite";

export abstract class CollisionHandler {
    protected next: CollisionHandler | null = null;

    constructor(next: CollisionHandler | null = null) {
        this.next = next;
    }

    public abstract collideTo(sprite1: Sprite, sprite2: Sprite, world: World): void;
}