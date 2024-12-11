import { Card, CardSuit, CardRank } from "./Card";

export class Deck {
    private static readonly SUITS = [CardSuit.Club, CardSuit.Diamond, CardSuit.Heart, CardSuit.Spade];
    private static readonly RANKS = [
        CardRank.Two, CardRank.Three, CardRank.Four, CardRank.Five,
        CardRank.Six, CardRank.Seven, CardRank.Eight, CardRank.Nine,
        CardRank.Ten, CardRank.Jack, CardRank.Queen, CardRank.King,
        CardRank.Ace
    ];

    private cards: Card[] = [];

    constructor() {
        this.initialize();
    }

    private initialize(): void {
        this.cards = Deck.SUITS.flatMap(suit => 
            Deck.RANKS.map(rank => new Card(rank, suit))
        );
        this.shuffle();
    }

    public shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    public drawCard(): Card {
        const card = this.cards.pop();
        if (!card) {
            throw new Error('No cards left in deck');
        }
        return card;
    }

    public getCards(): Card[] {
        return [...this.cards];
    }
}
