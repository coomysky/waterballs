import { Sprite } from './Sprite';
import { World } from './World';

export class Water extends Sprite {
    constructor(coords: number, world: World) {
        super(10, world); 
        this.setCoords(coords);
    }

    display(): string {
        return 'W';
    }

}