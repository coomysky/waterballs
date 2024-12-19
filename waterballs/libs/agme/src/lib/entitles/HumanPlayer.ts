import { Player } from './Player';
import { Card } from './Card';

export class HumanPlayer extends Player {
    private selectedCard: Card | null = null;

    constructor() {
        super();
    }

    public takeRound(): Card {
        if (this.getCards().length === 0) {
            throw new Error('No cards in hand');
        }

        if (!this.selectedCard) {
            throw new Error('Human player must choose a card');
        }

        const card = this.selectedCard;
        this.selectedCard = null;
        return this.playCard(card);
    }

    public chooseCard(card: Card): Card {
        if (!this.getCards().some(c => c.equals(card))) {
            throw new Error('Selected card is not in hand');
        }
        this.selectedCard = card;
        return card;
    }
}
