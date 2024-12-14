import { Player } from './Player';
import { Card } from './Card';

export class HumanPlayer extends Player {
    constructor() {
        super();
    }

    public takeRound(): Card {
        if (this.getCards().length === 0) {
            throw new Error('No cards in hand');
        }
        throw new Error('Human player must choose a card');
    }

    public chooseCard(card: Card): Card {
        console.log('Your current cards:');
        this.getCards().forEach((c, index) => {
            console.log(`${index + 1}. ${c.toString()}`);
        });
        
        if (!this.getCards().includes(card)) {
            throw new Error('Card not in hand');
        }
        return this.showCard(card);
    }
}
