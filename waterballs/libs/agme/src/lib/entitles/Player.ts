import { Game } from './Game';
import { Card } from './Card';

export abstract class Player {
    private name: string;
    private points: number;
    private game: Game | null;
    private cards: Card[];


    constructor() {
        this.name = '';
        this.game = null;
        this.points = 0;
        this.cards = [];
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
        this.cards.push(card)    
    }

    public getCards(): Card[] {
        return [...this.cards];
    }

    public removeCard(indexOrCard: number | Card): Card {
        let index: number;
        if (indexOrCard instanceof Card) {
            index = this.cards.findIndex(c => c.equals(indexOrCard));
            if (index === -1) {
                throw new Error('Card not found in hand');
            }
        } else {
            index = indexOrCard;
            if (index < 0 || index >= this.cards.length) {
                throw new Error('Invalid card index');
            }
        }
        return this.cards.splice(index, 1)[0];
    }


    public setGame(game: Game): void {
        this.game = game;
    }

    public getGame(): Game | null {
        return this.game;
    }
    

    public addPoint(): void {
        this.points++;
    }

    public getPoints(): number {
        return this.points;
    }
   

    public playCard(card: Card): Card {
        console.log(`${this.getName()} shows ${card.toString()}`);
        return this.removeCard(card);
    }

    public abstract takeRound(): Card;
}
