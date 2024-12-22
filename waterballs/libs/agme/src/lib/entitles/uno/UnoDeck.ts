import { UnoCard, CardColor } from './UnoCard';
import { AbstractDeck } from '../AbstractDeck';

export class UnoDeck extends AbstractDeck<UnoCard> {
    private static readonly COLORS = [CardColor.RED, CardColor.BLUE, CardColor.GREEN, CardColor.YELLOW];
    private static readonly NUMBERS = Array.from({ length: 10 }, (_, i) => i); // 0-9

    public initialize(): void {
        this.cards = UnoDeck.COLORS.flatMap(color => 
            UnoDeck.NUMBERS.flatMap(number => {
                const cards = [new UnoCard(color, number)];
                if (number !== 0) {
                    cards.push(new UnoCard(color, number));
                }
                return cards;
            })
        );
        this.shuffle();
    }

    public reshuffleDiscardPile(discardPile: UnoCard[]): void {
        // 保留最上面的一張牌
        const topCard = discardPile.pop();
        if (topCard) {
            // 將其餘棄牌加入牌堆並洗牌
            this.cards.push(...discardPile);
            this.shuffle();
            // 將最上面的牌放回棄牌堆
            discardPile.length = 0;
            discardPile.push(topCard);
        }
    }
}
