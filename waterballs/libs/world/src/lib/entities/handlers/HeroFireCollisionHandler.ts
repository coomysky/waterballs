import { CollisionHandler } from "../CollisionHandler";
import { Sprite } from "../Sprite";
import { World } from "../World";
import { Hero } from "../Hero";
import { Fire } from "../Fire";

export class HeroFireCollisionHandler extends CollisionHandler {
    public collideTo(sprite1: Sprite, sprite2: Sprite, world: World): void {
        if (sprite1 instanceof Hero && sprite2 instanceof Fire) {
            sprite1.setHp(sprite1.getHp() - 10);
            console.log(`Hero: 燙燙～～`);
            world.removeSprite(sprite2);
            if (sprite1.getHp() > 0) {
                console.log(`Hero moved to${sprite2.getCoords()}`);
                sprite1.setCoords(sprite2.getCoords());
            }
        } else if (sprite2 instanceof Hero && sprite1 instanceof Fire) {
            sprite2.setHp(sprite2.getHp() - 10);
            world.removeSprite(sprite1);
            if (sprite2.getHp() > 0) {
                sprite2.setCoords(sprite1.getCoords());
            }
        } else if (this.next) {
            this.next.collideTo(sprite1, sprite2, world);
        }
    }
}
