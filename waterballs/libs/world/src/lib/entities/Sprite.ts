import { CollisionHandler } from "./CollisionHandler";
import { World } from "./World";

export abstract class Sprite {
    private hp: number;
    private coords: number;
    private world: World;

    private static collisionHandler: CollisionHandler;

    constructor(hp: number, world: World) {
        this.hp = hp;
        this.coords = 0;
        this.world = world;
    }

    getHp(): number {
        return this.hp;
    }

    setHp(hp: number) {
        if (hp < 0) {
            this.hp = 0;
            this.world.removeSprite(this);
        } else {
            this.hp = hp;
        }
    }

    getWorld(): World {
        return this.world;
    }

    setWorld(world: World ) {
        this.world = world;
    }

    getCoords(): number {
        return this.coords;
    }

    setCoords(coords: number) {
        if (coords < 0 || coords >= this.world.getSize()) {
            throw new Error('座標超出範圍');
        }
        this.coords = coords;
    }


    public static setCollisionHandler(handler: CollisionHandler) {
        Sprite.collisionHandler = handler;
    }

    public moveTo(targetCoords: number): void {
        if (targetCoords < 0 || targetCoords >= this.world.getSize()) {
            throw new Error('目標座標超出範圍');
        }
        
        this.world.moveSprite(this, targetCoords);
    }

    public collideWith(other: Sprite): boolean {
        if (Sprite.collisionHandler) {
            Sprite.collisionHandler.collideTo(this, other, this.world);
            return true;
        }
        return false;
    }

    abstract display(): string;
}