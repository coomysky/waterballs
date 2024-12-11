import { Deck } from '../Deck';
import { Card, Color } from '../Card';

describe('Deck', () => {
    let deck: Deck;

    beforeEach(() => {
        deck = new Deck();
    });

    describe('Initialization', () => {
        it('should initialize with 40 cards', () => {
            expect(deck.getCardsCount()).toBe(40);
        });

        it('應該要有 10 個顏色和四個花色', () => {
            const cards = deck.getAllCards();
            const colorCount = cards.reduce((counts, card) => {
                const color = card.getColor();
                return counts.set(color, (counts.get(color) || 0) + 1);
            }, new Map<Color, number>());

            const numberCount = cards.reduce((counts, card) => {
                const number = card.getNumber();
                return counts.set(number, (counts.get(number) || 0) + 1);
            }, new Map<number, number>());

            console.log(colorCount);
            console.log(numberCount);


            // 檢查每個顏色出現 10 次
            colorCount.forEach((count) => expect(count).toBe(10));

            // 檢查每個數字出現 4 次
            numberCount.forEach((count) => expect(count).toBe(4));
        });
    });

    describe('Shuffle', () => {
        it('確認洗牌後牌的數量不變', () => {
            const beforeCount = deck.getCardsCount();
            deck.shuffle();
            const afterCount = deck.getCardsCount();
            expect(afterCount).toBe(beforeCount);
        });

        it('確認洗牌後牌的順序有改變', () => {
            const originalOrder = [...deck.getAllCards()];
            deck.shuffle();
            const newOrder = deck.getAllCards();

            const differentPositions = originalOrder.filter(
                (card, index) => !card.isPlayable(newOrder[index])
            ).length;

            // 順序有超過一半有變
            expect(differentPositions).toBeGreaterThan(originalOrder.length * 0.5);
        });
    });

    describe('Drawing Cards', () => {
        it('確認可以抽取所有牌, 確認牌堆空時回傳 undefined', () => {
            const totalCards = deck.getCardsCount();
            const drawnCards: Card[] = [];

            for (let i = 0; i < totalCards; i++) {
                const card = deck.drawCard();
                expect(card).toBeDefined();
                if (card) {  
                    drawnCards.push(card);  
                }
            }

            expect(deck.isEmpty()).toBe(true);
            expect(deck.drawCard()).toBeUndefined();
        });
    });
});
