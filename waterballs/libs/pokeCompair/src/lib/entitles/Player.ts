import { Game } from './Game';
import { Hand } from './Hand';

export class Player {
    private name: string;
    private hand: Hand;
    private points: number;
    private hasChangeHands: boolean;
    private game: Game | null;

    constructor() {
        this.name =  '';
        this.hand = new Hand();
        this.points = 0; // default
        this.hasChangeHands = false; // default
        this.game = null;
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

    public getHand(): Hand {
        if (!this.hand) {
            throw new Error('Player has no hand');
        }
        return this.hand;
    }

    public setGame(game: Game): void {
        this.game = game;
    }

    public getGame(): Game | null {
        return this.game;
    }
    
    public setHand(hand: Hand): void {
        this.hand = hand;
        this.hand.setOwner(this);
    }

    public getpoints(): number {
        return this.points;
    }

    public addPoints(): void {
        this.points += 1;
    }

    public getHasChangeHands(): boolean {
        return this.hasChangeHands;
    }

}

