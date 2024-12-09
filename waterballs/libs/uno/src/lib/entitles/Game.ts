import { Deck } from "./Deck";
import { Card } from "./Card";
import { Player } from "./Player";

export class Game {
    private players: Player[];
    private tableCards: Card[];
    private currentCard: Card | null;
    private deck: Deck;

    constructor() {
        this.players = [];
        this.tableCards = [];
        this.currentCard = null;
        this.deck = new Deck()
    }

    public setPlayers(players: Player[]) {
        if (players.length !== 4) {
            throw new Error("should has 4 players");
        }
        this.players = players;
    }

    public setDeck(deck: Deck) {
        this.deck = deck;
    }

    public setTableCards(card: Card) {
        this.tableCards.push(card);
        this.currentCard = card;
    }

    public setCurrentCards(card: Card) {
        this.currentCard = card;
    }

    public getPlayers(): Player[] {
        return this.players;
    }

    public getTableCards(): Card[] {
        return this.tableCards;
    }

    public getCurrentCard(): Card | null {
        return this.currentCard;
    }

    public getDeck(): Deck {
        return this.deck;
    }

    public start(): void {
        this.deck.shuffle();
        const card = this.deck.drawCard();
        if (!card) {
            throw new Error("Deck is empty");
        }
        this.setTableCards(card);
    }

}