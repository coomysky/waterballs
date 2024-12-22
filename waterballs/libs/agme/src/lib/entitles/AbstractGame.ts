import { Card, Deck, Game, Player } from "./interfaces";

export abstract class AbstractGame<T extends Card> implements Game<T> {
    protected players: Player<T>[] = [];
    protected currentPlayerIndex = 0;
    protected tableCards: T[] = [];
    protected deck: Deck<T>;
    protected rounds = 0;

    constructor(deck: Deck<T>) {
        this.deck = deck;
    }

    public getPlayers(): Player<T>[] {
        return [...this.players];
    }

    public getDeck(): Deck<T> {
        return this.deck;
    }

    public getTableCards(): T[] {
        return [...this.tableCards];
    }

    public getRounds(): number {
        return this.rounds;
    }

    public getMaxRounds(): number | undefined {
        return undefined;
    }

    public setPlayers(players: Player<T>[]): void {
        this.players = players;
        this.players.forEach(player => player.setGame(this));
    }

    public start(): void {
        if (this.players.length === 0) {
            throw new Error('No players in the game');
        }

        this.deck.shuffle();
        this.dealInitialCards();
        this.initializeTableCards();
        this.rounds = 0;
        
        // 執行遊戲到遊戲結束
        while (!this.isGameOver()) {
            this.playRound();
        }
        
        const winner = this.getWinner();
        if (winner) {
            console.log(`Game Over! ${winner.getName()} wins!`);
        }
    }

    public playRound(): T | null {
        const currentPlayer = this.getCurrentPlayer();
        const playedCard = currentPlayer.takeRound(this.tableCards[this.tableCards.length - 1]);
        
        if (playedCard) {
            this.tableCards.push(playedCard);
            this.afterPlayCard(this.tableCards);
            this.moveToNextPlayer();
            
            // 當所有玩家都出過牌後算一個回合結束
            if (this.currentPlayerIndex === 0) {
                this.rounds++;
                console.log(`Round ${this.rounds} completed`);
            }
        } else {
            // 如果沒有牌要換下一個人
            this.moveToNextPlayer();
        }

        return playedCard;
    }

    public drawCard(): void {
        this.beforeDrawCardCheck();
        const currentPlayer = this.getCurrentPlayer();
        const card = this.deck.drawCard();
        if (card) {
            currentPlayer.addCard(card);
        }
    }

    public getCurrentPlayer(): Player<T> {
        return this.players[this.currentPlayerIndex];
    }

    public moveToNextPlayer(): void {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    public dealInitialCards(): void {
        const initialCards = this.getInitialCardCount();
        for (let i = 0; i < initialCards; i++) {
            this.players.forEach(player => {
                const card = this.deck.drawCard();
                if (card) {
                    player.addCard(card);
                }
            });
        }
    }

    public getCurrentCard(): T | null {
        if (this.tableCards.length === 0) {
            return null;
        }
        return this.tableCards[this.tableCards.length - 1];
    }


    public abstract getInitialCardCount(): number;
    public abstract beforeDrawCardCheck(): void;
    public abstract initializeTableCards(): void;
    public abstract afterPlayCard(tableCards: T[]): void;
    public abstract isGameOver(): boolean;
    public abstract getWinner(): Player<T> | null;
}
