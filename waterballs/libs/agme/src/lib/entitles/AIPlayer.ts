import { Player } from './Player';
import { Card } from './Card';

export class AIPlayer extends Player {
    constructor() {
        super();
    }

    public takeRound(): Card {
        if (this.getCards().length === 0) {
            throw new Error('No cards in hand');
        }

        const randomIndex = Math.floor(Math.random() * this.getCards().length);

        const card = this.getCards()[randomIndex];
        return this.playCard(card);
    }
}
