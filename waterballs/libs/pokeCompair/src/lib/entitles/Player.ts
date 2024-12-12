import { Game } from './Game';
import { Hand } from './Hand';
import { Card } from './Card';

export abstract class Player {
    private name: string;
    private hand: Hand;
    private points: number;
    private hasChangeHands: boolean;
    private game: Game | null;

    constructor() {
        this.name = '';
        this.hand = new Hand();
        this.hasChangeHands = false; // default
        this.game = null;
        this.points = 0;
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
        return this.hand;
    }

    public setHand(hand: Hand): void {
        this.hand = hand;
        hand.setOwner(this);
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

    public getHasChangeHands(): boolean {
        return this.hasChangeHands;
    }

    public setHasChangeHands(value: boolean): void {
        this.hasChangeHands = value;
    }

    public selectExchangeHands(player: Player): void {
        if (player === this) {
            throw new Error('Cannot exchange hands with yourself');
        }
        this.getGame()?.exchangeHands(this, player);
    }

    public addCard(card: Card): void {
        this.hand.addCard(card);
    }

    public getCards(): Card[] {
        return this.hand.getCards();
    }

    public showCard(card: Card): Card {
        console.log(`${this.getName()} shows ${card.toString()}`);
        return this.hand.removeCard(card);
    }

    public abstract takeRound(): Card;
}
