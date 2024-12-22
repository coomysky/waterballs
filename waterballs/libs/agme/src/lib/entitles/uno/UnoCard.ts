import { Card } from '../interfaces';

export enum CardColor {
    BLUE = 'BLUE',
    RED = 'RED',
    GREEN = 'GREEN',
    YELLOW = 'YELLOW'
}

export class UnoCard implements Card {
    constructor(
        private color: CardColor,
        private number: number
    ) {}

    public getColor(): CardColor {
        return this.color;
    }

    public getNumber(): number {
        return this.number;
    }

    public toString(): string {
        return `${this.color} ${this.number}`;
    }

    public equals(other: UnoCard): boolean {
        return this.color === other.color && this.number === other.number;
    }
}
