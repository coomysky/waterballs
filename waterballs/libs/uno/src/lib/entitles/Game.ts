import { Deck } from "./Deck";
import { Card } from "./Card";
import { Player } from "./Player";

export class Game {
    private players: Player[];
    private tableCards: Card[];
    private currentCard: Card | null;
    private deck: Deck;
    private currentPlayerIndex : number;

    constructor() {
        this.players = [];
        this.tableCards = [];
        this.currentCard = null;
        this.deck = new Deck();
        this.currentPlayerIndex = 0;

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

    public getCurrentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }

    public start(): void {
        this.deck.shuffle();
        const card = this.deck.drawCard();
        if (!card) {
            throw new Error("Deck is empty");
        }
        this.setTableCards(card);
    }

    public drawInitCard(): void {
        if (this.players.length !== 4) {
            throw new Error("Cannot start draw phase without 4 players");
        }

        // 每個人抽五張牌
        for (let i = 0; i < 5; i++) {
            for (const player of this.players) {
                const card = this.deck.drawCard();
                if (!card) {
                    throw new Error("Not enough cards in deck for draw phase");
                }
                player.addCard(card);
            }
        }
    }

    public playCard(card: Card): void {
        const currentPlayer = this.getCurrentPlayer();
        
        if (!this.currentCard) {
            throw new Error('No current card on table');
        }

        if (!card.isPlayable(this.currentCard)) {
            throw new Error('Card is not playable');
        }

        const playedCard = currentPlayer.playCard(card);
        this.setTableCards(playedCard);
        this.nextTurn();
    }

    public drawCardFromDeck(): void {
        const currentPlayer = this.getCurrentPlayer();
        const card = this.deck.drawCard();
        
        if (!card) {
            this.reshuffleTableCards();
            const newCard = this.deck.drawCard();
            if (!newCard) {
                throw new Error('No cards left in deck after reshuffle');
            }
            currentPlayer.addCard(newCard);
        } else {
            currentPlayer.addCard(card);
        }
        
        this.nextTurn();
    }

    private nextTurn(): void {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 4;
    }

    private reshuffleTableCards(): void {
        if (this.tableCards.length <= 1) {
            return;
        }
        
        // Keep the top card
        const topCard = this.tableCards.pop();
        
        // Add remaining cards back to deck and shuffle
        this.tableCards.forEach(card => this.deck.setCards(card));
        this.tableCards = [];
        
        if (topCard) {
            this.setTableCards(topCard);
        }
        
        this.deck.shuffle();
    }
}