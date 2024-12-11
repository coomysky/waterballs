import { Card } from './Card';

export class Player {
    private name: string;
    private cards: Card[] = [];

    constructor() {
        this.name =  '';
    }

    public setName(name: string): void {
        if (!name) {
            throw new Error('Player name cannot be empty');
        }

        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public addCard(card: Card): void {
        this.cards.push(card);
    }

    public getCards(): Card[] {
        return [...this.cards];
    }

    public playCard(card: Card): Card {
        const index = this.cards.findIndex(c => c.getColor() === card.getColor() && c.getNumber() === card.getNumber());
        if (index === -1) {
            throw new Error('Card not in hand');
        }
        return this.cards.splice(index, 1)[0];
    }

    public hasPlayableCard(currentCard: Card): boolean {
        return this.cards.some(card => card.isPlayable(currentCard));
    }
}
