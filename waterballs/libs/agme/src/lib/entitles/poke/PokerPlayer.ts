import { AbstractPlayer } from '../AbstractPlayer';
import { PokeCard } from './PokeCard';

export class PokerPlayer extends AbstractPlayer<PokeCard> {
    private points = 0;

    public getPlayableCards(topCard: PokeCard | null): PokeCard[] {
        return [...this.cards];
    }

    public getPoints(): number {
        return this.points;
    }

    public addPoints(points = 1): void {
        this.points += points;
    }

    public resetPoints(): void {
        this.points = 0;
    }

    public playableCardsCheck(playableCards: PokeCard[]): void {
        // 撲克牌一定要出牌
        if (playableCards.length === 0) {
            throw new Error('No playable cards');
        }
    }
}
