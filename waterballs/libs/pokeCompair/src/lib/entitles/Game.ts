import { Deck } from "./Deck";
import { Player } from "./Player";
import { Hand } from "./Hand";

export class Game {
    private players: Player[];
    private deck: Deck;

    constructor() {
        this.players = [];
        this.deck = new Deck();
    }

    public addPlayer(player: Player): void {
        this.players.push(player);
        player.setGame(this);
    }

    public getPlayers(): Player[] {
        return [...this.players];
    }

    public removePlayer(player: Player): void {
        this.players = this.players.filter((p) => p !== player);
    }

    public startGame(players: Player[]): void {
        if (players.length !== 4) {
            throw new Error("should has 4 players");
        }
        this.players = [];
        players.forEach((player) => {
            this.addPlayer(player);
        });
    }

    public drawInitCard(): void {
        if (this.players.length !== 4) {
            throw new Error("Cannot start draw phase without 4 players");
        }

        // 每個人抽13張牌
        for (let i = 0; i < 13; i++) {
            for (const player of this.players) {
                const card = this.deck.drawCard();
                if (!card) {
                    throw new Error("Not enough cards in deck for draw phase");
                }
                player.getHand().addCard(card);
            }
        }
    }

    public setDeck(deck: Deck): void {
        this.deck = deck;
    }

    public getDeck(): Deck {
        return this.deck;
    }
}