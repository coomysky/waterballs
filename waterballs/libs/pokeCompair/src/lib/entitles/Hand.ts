import { Card } from "./Card";
import { Player } from "./Player";

export class Hand {
    private cards: Card[];
    private owner: Player | null;

    constructor() {
        this.cards =  [];
        this.owner = null;
    }

    
    public setOwner(owner: Player): void {
        this.owner = owner;
    }

    public getOwner(): Player | null {
        return this.owner;
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
}   