import { Card } from "../interfaces";
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

export class PokeCard implements Card {
    private static readonly RANK_NAMES: Record<CardRank, string> = {
        [CardRank.Ace]: 'A',
        [CardRank.Two]: '2',
        [CardRank.Three]: '3',
        [CardRank.Four]: '4',
        [CardRank.Five]: '5',
        [CardRank.Six]: '6',
        [CardRank.Seven]: '7',
        [CardRank.Eight]: '8',
        [CardRank.Nine]: '9',
        [CardRank.Ten]: '10',
        [CardRank.Jack]: 'J',
        [CardRank.Queen]: 'Q',
        [CardRank.King]: 'K'
    };

    private static readonly SUIT_NAMES: Record<CardSuit, string> = {
        [CardSuit.Club]: '梅花',
        [CardSuit.Diamond]: '方塊',
        [CardSuit.Heart]: '紅心',
        [CardSuit.Spade]: '黑桃'
    };

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
 
    public getRankDisplay(): string {
        return PokeCard.RANK_NAMES[this.rank];
    }

    public getSuitDisplay(): string {
        return PokeCard.SUIT_NAMES[this.suit];
    }

    public toString(): string {
        return `${this.getRankDisplay()} [${this.getSuitDisplay()}]`;
    }

    public equals(other: PokeCard): boolean {
        return this.rank === other.rank && this.suit === other.suit;
    }

    public compareTo(other: PokeCard): number {
        if (this.rank === other.rank) {
            return this.suit - other.suit;
        }
        return this.rank - other.rank;
    }
}