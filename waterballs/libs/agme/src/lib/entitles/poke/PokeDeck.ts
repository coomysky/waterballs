        import { AbstractDeck } from '../AbstractDeck';
import { PokeCard, CardRank, CardSuit } from './PokeCard';

export class PokeDeck extends AbstractDeck<PokeCard> {
    private static readonly SUITS = [CardSuit.Club, CardSuit.Diamond, CardSuit.Heart, CardSuit.Spade];
    private static readonly RANKS = [
        CardRank.Two, CardRank.Three, CardRank.Four, CardRank.Five,
        CardRank.Six, CardRank.Seven, CardRank.Eight, CardRank.Nine,
        CardRank.Ten, CardRank.Jack, CardRank.Queen, CardRank.King,
        CardRank.Ace
    ];

    public initialize(): void {
        this.cards = PokeDeck.SUITS.flatMap(suit => 
            PokeDeck.RANKS.map(rank => new PokeCard(rank, suit))
        );
        this.shuffle();
    }
}