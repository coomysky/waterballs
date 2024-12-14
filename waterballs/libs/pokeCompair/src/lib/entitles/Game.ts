import { Deck } from "./Deck";
import { Player } from "./Player";
import { Card } from "./Card";

export interface PlayedCard {
    player: Player;
    card: Card;
}

export class Game {
    private players: Player[];
    private deck: Deck;
    private currentPlayerIndex: number;
    private playedCards: PlayedCard[];
    private rounds: number;
    private exchangedHands: Map<Player, { target: Player, roundsLeft: number }> = new Map();
    private readonly MAX_ROUNDS = 13;

    constructor() {
        this.players = [];
        this.deck = new Deck();
        this.currentPlayerIndex = 0;
        this.playedCards = [];
        this.rounds = 0;
    }
    
    public getCurrentPlayer(): Player {
        if (this.players.length === 0) {
            throw new Error("No players in game");
        }
        
        return this.players[this.currentPlayerIndex];
    }

    public getCurrentRound(): number {
        return this.rounds;
    }

    public nextRound(): void {
        this.rounds++;
        this.playedCards = [];
    }  

    public nextPlayer(): void {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    public getPlayedCards(): PlayedCard[] {
        return [...this.playedCards];
    }

    public addPlayedCard(playedCard: PlayedCard): void {
        this.playedCards.push(playedCard);
    }

    public addPlayer(player: Player): void {
        console.log(`Player ${player.getName()} joined the game`);
        this.players.push(player);
        player.setGame(this);
    }

    public endGame(): void {
        this.players = [];
        this.deck = new Deck();
        this.currentPlayerIndex = 0;
        this.playedCards = [];
        this.rounds = 0;
    }
    public playRound(){
        if (this.rounds >= this.MAX_ROUNDS) {
            const winner = this.getWinner();
            console.log(`Game is over. Winner is ${winner.getName()} with ${winner.getPoints()} points`);
            this.endGame();
            throw new Error(`Game is over`);
        }

        // 先增加回合數
        this.rounds++;
        console.log(`Round ${this.rounds}`);
        
        this.playedCards = [];
        const activePlayers = this.players.filter(p => p.getCards().length > 0);
        
        activePlayers.forEach(player => {
            const card = player.takeRound();
            console.log(`${player.getName()} played ${card.Suit} of ${card.Rank}`);
            this.addPlayedCard({ player, card });
        });

        const winner = this.determineWinner(this.playedCards);
        if (winner) {
            console.log(`Player ${winner.getName()} wins this round!`);
            console.log(`Player ${winner.getName()} gets a point!`);
            winner.addPoint();
        }

        this.updateExchangedHands();
    }

    public determineWinner(playedCards: PlayedCard[]): Player | null {
        if (playedCards.length === 0) return null;

        let winningCard = playedCards[0];
        for (let i = 1; i < playedCards.length; i++) {
            if (playedCards[i].card.compareTo(winningCard.card) > 0) {
                winningCard = playedCards[i];
            }
        }
        return winningCard.player;
    }

    public getPlayers(): Player[] {
        return [...this.players];
    }

    public removePlayer(player: Player): void {
        this.players = this.players.filter((p) => p !== player);
    }

    public setPlayers(players: Player[]): void {
        if (players.length !== 4) {
            throw new Error("should has 4 players");
        }
        this.players = [];
        players.forEach((player) => {
            this.addPlayer(player);
        });
    }

    public startGame(players: Player[]): void {
        if (this.rounds > 0) {
            throw new Error('Game has already started');
        }
        this.setPlayers(players);
        this.drawInitCard();
    }

    public drawInitCard(): void {
        if (this.players.length !== 4 ) {
            throw new Error("Cannot start draw phase without 4 players");
        }

        // 每個玩家抽13張牌
        for (const player of this.players) {
            for (let i = 0; i < 13; i++) {
                const card = this.deck.drawCard();
                player.addCard(card);
            }
        }
    }

    public setDeck(deck: Deck): void {
        this.deck = deck;
    }

    public getDeck(): Deck {
        return this.deck;
    }

    public exchangeHands(player1: Player, player2: Player): void {
        if (player1 === player2) {
            throw new Error('Cannot exchange hands with yourself');
        }
        if (player1.getHasChangeHands()) {
            throw new Error('Exchange hands privilege already used');
        }

        const hand1 = player1.getHand();
        const hand2 = player2.getHand();

        player1.setHand(hand2);
        player2.setHand(hand1);

        player1.setHasChangeHands(true);
        this.exchangedHands.set(player1, { target: player2, roundsLeft: 3 });
    }

    private updateExchangedHands(): void {
        for (const [player, exchange] of this.exchangedHands.entries()) {
            exchange.roundsLeft--;
            if (exchange.roundsLeft === 0) {
                const hand1 = player.getHand();
                const hand2 = exchange.target.getHand();
                player.setHand(hand2);
                exchange.target.setHand(hand1);
                this.exchangedHands.delete(player);
            }
        }
    }

    public getWinner(): Player {
        if (this.rounds < this.MAX_ROUNDS) {
            throw new Error('Game is not over yet');
        }

        let maxPoints = -1;
        let winner: Player | null = null;

        for (const player of this.players) {
            if (player.getPoints() > maxPoints) {
                maxPoints = player.getPoints();
                winner = player;
            }
        }

        if (!winner) {
            throw new Error('No winner found');
        }

        return winner;
    }
}