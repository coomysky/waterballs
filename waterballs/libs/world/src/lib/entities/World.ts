import { Sprite } from './Sprite';

import { FireFireCollisionHandler } from './handlers/FireFireCollisionHandler';
import { WaterWaterCollisionHandler } from './handlers/WaterWaterCollisionHandler';
import { WaterFireCollisionHandler } from './handlers/WaterFireCollisionHandler';
import { HeroFireCollisionHandler } from './handlers/HeroFireCollisionHandler';
import { HeroWaterCollisionHandler } from './handlers/HeroWaterCollisionHandler';
import { NullCollisionHandler } from './handlers/NullCollisionHandler';
import { HHCollisionHandler } from './handlers/HHCollisionHandler';

export class World {
  private sprites: Sprite[] = [];
  private width: number;

  constructor(width: number) {
    this.width = width;
    
    const nullHandler = new NullCollisionHandler();
    const heroHeroHandler = new HHCollisionHandler(nullHandler);
    const fireFireHandler = new FireFireCollisionHandler(heroHeroHandler);
    const waterWaterHandler = new WaterWaterCollisionHandler(fireFireHandler);
    const waterFireHandler = new WaterFireCollisionHandler(waterWaterHandler);
    const heroFireHandler = new HeroFireCollisionHandler(waterFireHandler);
    const heroWaterHandler = new HeroWaterCollisionHandler(heroFireHandler);

    Sprite.setCollisionHandler(heroWaterHandler);
  }

  addSprite(sprite: Sprite) {
    this.sprites.push(sprite);
    sprite.setWorld(this);
  }

  removeSprite(sprite: Sprite) {
    const index = this.sprites.indexOf(sprite);
    if (index !== -1) {
      this.sprites.splice(index, 1);
    }
  }

  getSprites(): Sprite[] {
    return [...this.sprites];
  }


  public moveSprite(sprite: Sprite, targetCoords: number): boolean {
    const targetSprite = this.sprites.find(s => s !== sprite && s.getCoords() === targetCoords);
    
    if (targetSprite) {
      // 如果有其他生命觸發碰撞
      sprite.collideWith(targetSprite);
      return true;
    }
    sprite.setCoords(targetCoords);
    return false;
  }

  getSize(): number {    
    return this.width;
  }

  display(): string {
    const worldMap = new Array(this.width).fill('.');
    this.sprites.forEach(sprite => {
      worldMap[sprite.getCoords()] = sprite.display();
    });
    return worldMap.join('');
  }
}