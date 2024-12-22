import { Card, Game, Player } from './interfaces';

export abstract class AbstractPlayer<T extends Card> implements Player<T> {
    protected cards: T[] = [];
    protected selectedCard: T | null = null;
    private _game: Game<T> | null = null;
    private _name: string;
    private _isHuman: boolean;

    constructor(name: string, isHuman = false) {
        this._name = name;
        this._isHuman = isHuman;
    }

    public getName(): string {
        return this._name;
    }

    public isHuman(): boolean {
        return this._isHuman;
    }

    public setGame(game: Game<T>): void {
        this._game = game;
    }

    public getGame(): Game<T> | null {
        return this._game;
    }

    public takeRound(topCard: T | null): T | null {
        const playableCards = this.getPlayableCards(topCard || null);
        this.playableCardsCheck(playableCards);
        // 如果沒有可出的牌回傳 null
        if (!playableCards || playableCards.length === 0) {
            return null;
        }

        if (this.isHuman()) {
            return this.takeHumanRound(playableCards);
        } else {
            return this.takeAIRound(playableCards);
        }
    }

    public takeHumanRound(playableCards: T[]): T | null {
        if (!this.getSelectedCard()) {
            throw new Error('No card selected');
        }
        const card = this.removeCard(this.getSelectedCard()!);
        this.selectedCard = null;
        return card;
    }

    protected takeAIRound(playableCards: T[]): T | null {
        // AI 隨機選一張可出的牌
        if (!playableCards || playableCards.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * playableCards.length);
        return this.removeCard(playableCards[randomIndex]);
    }

    public addCard(card: T): void {
        this.cards.push(card);
    }

    public removeCard(card: T): T {
        const index = this.cards.findIndex(c => c.equals(card));
        if (index === -1) {
            throw new Error('Card not found');
        }
        return this.cards.splice(index, 1)[0];
    }

    public getCards(): T[] {
        return [...this.cards];
    }

    public getSelectedCard(): T | null {
        return this.selectedCard;
    }

    public selectCard(card: T): void {
        if (!this.cards.includes(card)) {
            throw new Error('Card not found in player\'s hand');
        }
        this.selectedCard = card;
    }

    public abstract getPlayableCards(topCard: T | null): T[];
    public abstract playableCardsCheck(playableCards: T[]): void;
}
