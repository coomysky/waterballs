import { AbstractPlayer } from '../AbstractPlayer';
import { UnoCard } from './UnoCard';

export class UnoPlayer extends AbstractPlayer<UnoCard> {
    public getPlayableCards(topCard: UnoCard | null): UnoCard[] {
        if (!topCard) return [...this.cards];
        return this.cards.filter(card => 
            card.getColor() === topCard.getColor() || 
            card.getNumber() === topCard.getNumber()
        );
    }

    public playableCardsCheck(playableCards: UnoCard[]): void {
        if (playableCards.length === 0) {
            // 如果沒有可出的牌，抽一張牌
            const game = this.getGame();
            if (game) {
                game.drawCard();
            }
        }
    }
}