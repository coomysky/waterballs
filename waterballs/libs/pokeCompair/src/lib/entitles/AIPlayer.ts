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
        // AI 玩家自動選擇第一張牌
        const card = this.getCards()[0];
        return this.showCard(card);
    }
}
