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
}   