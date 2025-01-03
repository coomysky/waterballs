import { CollisionHandler } from "../CollisionHandler";
import { Sprite } from "../Sprite";
import { World } from "../World";
import { Hero } from "../Hero";
import { Water } from "../Water";

export class HeroWaterCollisionHandler extends CollisionHandler {
    public collideTo(sprite1: Sprite, sprite2: Sprite, world: World): void {
        if (sprite1 instanceof Hero && sprite2 instanceof Water) {
            // 英雄碰到水，增加生命值並移動到水的位置
            sprite1.setHp(sprite1.getHp() + 10);
            world.removeSprite(sprite2);
            sprite1.setCoords(sprite2.getCoords());
        } else if (sprite2 instanceof Hero && sprite1 instanceof Water) {
            sprite2.setHp(sprite2.getHp() + 10);
            world.removeSprite(sprite1);
            sprite2.setCoords(sprite1.getCoords());
        } else if (this.next) {
            this.next.collideTo(sprite1, sprite2, world);
        }
    }
}
