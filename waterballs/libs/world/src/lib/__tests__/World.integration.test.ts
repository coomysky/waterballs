import { World } from '../entities/World';
import { Hero } from '../entities/Hero';
import { Water } from '../entities/Water';
import { Fire } from '../entities/Fire';
import { Sprite } from '../entities/Sprite';
import { FireFireCollisionHandler } from '../entities/handlers/FireFireCollisionHandler';
import { WaterWaterCollisionHandler } from '../entities/handlers/WaterWaterCollisionHandler';
import { WaterFireCollisionHandler } from '../entities/handlers/WaterFireCollisionHandler';
import { HeroFireCollisionHandler } from '../entities/handlers/HeroFireCollisionHandler';
import { HeroWaterCollisionHandler } from '../entities/handlers/HeroWaterCollisionHandler';
import { HHCollisionHandler } from '../entities/handlers/HHCollisionHandler';
import { NullCollisionHandler } from '../entities/handlers/NullCollisionHandler';

function setupCollisionHandlers() {
    const nullHandler = new NullCollisionHandler();
    const heroHeroHandler = new HHCollisionHandler(nullHandler);
    const fireFireHandler = new FireFireCollisionHandler(heroHeroHandler);
    const waterWaterHandler = new WaterWaterCollisionHandler(fireFireHandler);
    const waterFireHandler = new WaterFireCollisionHandler(waterWaterHandler);
    const heroFireHandler = new HeroFireCollisionHandler(waterFireHandler);
    const heroWaterHandler = new HeroWaterCollisionHandler(heroFireHandler);
    Sprite.setCollisionHandler(heroWaterHandler);
}

describe('水球球特務有限公司：應該可以很長的世界 Ａ＿＿Ａ', () => {
    let world: World;

    beforeEach(() => {
        world = new World(30);
        setupCollisionHandlers();
    });

    describe('世界的基本設定 30 公分應該夠用', () => {
        it('應該有 30 公分', () => {
            expect(world.getSize()).toBe(30);
        });
    });

    describe('給我撞起來', () => {
        describe('Hero vs Water, Hp up up', () => {
            it('HP up up +++', () => {
                const hero = new Hero(0, world);
                const water = new Water(1, world);
                world.addSprite(hero);
                world.addSprite(water);

                const initialHp = hero.getHp();
                hero.moveTo(1);

                expect(hero.getHp()).toBe(initialHp + 10);
                expect(hero.getCoords()).toBe(1);
                expect(world.getSprites()).toHaveLength(1);
                expect(world.getSprites()[0]).toBe(hero);
            });
        });

        describe('Hero vs Fire, Hp down down', () => {
            it('有夠燙 ～～～', () => {
                const hero = new Hero(0, world);
                const fire = new Fire(1, world);
                world.addSprite(hero);
                world.addSprite(fire);

                const initialHp = hero.getHp();
                hero.moveTo(1);

                expect(hero.getHp()).toBe(initialHp - 10);
                expect(hero.getCoords()).toBe(1);
                expect(world.getSprites()).toHaveLength(1);
                expect(world.getSprites()[0]).toBe(hero);
            });
        });

        describe('元素對決', () => {
            it('水火不容', () => {
                const water = new Water(0, world);
                const fire = new Fire(1, world);
                world.addSprite(water);
                world.addSprite(fire);

                water.moveTo(1);
                expect(world.getSprites()).toHaveLength(0);
            });

            it('火撞上水 被滅拉', () => {
                const water = new Water(1, world);
                const fire = new Fire(0, world);
                world.addSprite(water);
                world.addSprite(fire);

                fire.moveTo(1);
                expect(world.getSprites()).toHaveLength(0);
            });
        });

        describe('同屬性的相遇', () => {
            it('水球 ＋ 水球 還是水球', () => {
                const water1 = new Water(0, world);
                const water2 = new Water(1, world);
                world.addSprite(water1);
                world.addSprite(water2);

                water1.moveTo(1);
                expect(water1.getCoords()).toBe(0);
                expect(water2.getCoords()).toBe(1);
                expect(world.getSprites()).toHaveLength(2);
            });

            it('火寶 ＋ 火寶 會變噴火龍？', () => {
                const fire1 = new Fire(0, world);
                const fire2 = new Fire(1, world);
                world.addSprite(fire1);
                world.addSprite(fire2);

                fire1.moveTo(1);
                expect(fire1.getCoords()).toBe(0);
                expect(fire2.getCoords()).toBe(1);
                expect(world.getSprites()).toHaveLength(2);
            });
        });
    });
});
