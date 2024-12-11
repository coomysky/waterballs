export enum CardSuit {
    Club = 0,
    Diamond = 1,
    Heart = 2,
    Spade = 3,
}

export enum CardRank {
    Ace = 13,
    Two = 1,
    Three = 2,
    Four = 3,
    Five = 4,
    Six = 5,
    Seven = 6,
    Eight = 7,
    Nine = 8,
    Ten = 9,
    Jack = 10,
    Queen = 11,
    King = 12,
}

export class Card {
    constructor(
        private rank: CardRank,
        private suit: CardSuit,
    ) {
        if (rank < 0 || rank > 13) {
            throw new Error('Card rank must be between 1 and 13');
        }
    }
    public set Rank(rank: CardRank) {
        if (rank < 0 || rank > 13) {
            throw new Error('Card rank must be between 1 and 13');
        }
        this.rank = rank;
    }

    public set Suit(suit: CardSuit) {
        this.suit = suit;
    }
}