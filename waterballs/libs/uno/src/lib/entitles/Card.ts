export enum Color {
    BLUE = 'BLUE',
    RED = 'RED',
    YELLOW = 'YELLOW',
    GREEN = 'GREEN'
}

export class Card {
    constructor(
        private color: Color,
        private number: number
    ) {
        if (number < 0 || number > 9) {
            throw new Error('Card number must be between 0 and 9');
        }
    }

    public getColor(): Color {
        return this.color;
    }

    public getNumber(): number {
        return this.number;
    }
    //NOTE: the color or number must be the same
    public isPlayable(other: Card): boolean {
        return this.color === other.color || this.number === other.number;
    }
}
