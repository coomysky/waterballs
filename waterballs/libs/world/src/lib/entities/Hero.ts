import { Sprite } from './Sprite';
import { World } from './World';

export class Hero extends Sprite {
    constructor(coords: number, world: World) {
        super(30, world); 
        this.setCoords(coords);
    }

    display(): string {
        return 'H';
    }
   
}
