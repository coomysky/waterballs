import { Card, Color } from "./Card";

export class Deck {
    private cards: Card[] = [];

    constructor() {
        this.initialize();
    }

    private initialize(): void {
        // Create 40 cards: 4 colors x 10 numbers (0-9)
        Object.values(Color).forEach(color => {
            for (let number = 0; number <= 9; number++) {
                this.cards.push(new Card(color, number));
            }
        });
    }

    public shuffle(): void {
        
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    public drawCard(): Card | undefined {
        return this.cards.pop();
    }

    public setCards(card: Card): void {
        this.cards.push(card);
    }

    public getCardsCount(): number {
        return this.cards.length;
    }

    public isEmpty(): boolean {
        return this.cards.length === 0;
    }

    public getAllCards(): Card[] {
        return [...this.cards]; 
    }
}
