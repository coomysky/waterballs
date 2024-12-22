import { AbstractGame } from '../AbstractGame';
import { UnoCard } from './UnoCard';
import { UnoDeck } from './UnoDeck';
import { Player } from '../interfaces';

export class UnoGame extends AbstractGame<UnoCard> {
    protected override deck: UnoDeck;

    constructor() {
        const deck = new UnoDeck();
        super(deck);
        this.deck = deck;
    }

    public override getInitialCardCount(): number {
        return 5;
    }

    public override initializeTableCards(): void {
        this.tableCards = [this.deck.drawCard()];
    }

    public override afterPlayCard(tableCards: UnoCard[]): void {
        // uno 不用回合檢查處理
    }

    public override beforeDrawCardCheck(): void {
        // 如果牌堆空了把桌面上的牌除了最上面那張放回牌堆
        if (this.deck.getCards().length === 0) {
            const cardsToReturn = this.tableCards.slice(0, -1);
            this.deck.reshuffleDiscardPile(cardsToReturn);
            this.tableCards = this.tableCards.slice(-1);
        }
    }

    public override isGameOver(): boolean {
        return this.players.some(player => player.getCards().length === 0);
    }

    public override getWinner(): Player<UnoCard> | null {
        const winner = this.players.find(player => player.getCards().length === 0);
        return winner || null;
    }
    
}