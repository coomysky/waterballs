import { Card, Deck } from './interfaces';

export abstract class AbstractDeck<T extends Card> implements Deck<T> {
    protected cards: T[] = [];

    constructor() {
        this.initialize();
    }

    public getCards(): T[] {
        return [...this.cards];
    }

    public shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    public drawCard(): T {
        if (this.cards.length === 0) {
            throw new Error('No cards left in deck');
        }
        return this.cards.pop()!;
    }

    public addCard(card: T): void {
        this.cards.push(card);
    }

    public abstract initialize(): void;
}
