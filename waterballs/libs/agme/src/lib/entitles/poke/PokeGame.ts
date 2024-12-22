import { AbstractGame } from '../AbstractGame';
import { PlayedCard } from '../interfaces';
import { PokeCard } from './PokeCard';
import { PokerPlayer } from './PokerPlayer';
import { PokeDeck } from './PokeDeck';

export class PokeGame extends AbstractGame<PokeCard> {
    protected override deck: PokeDeck;
    private playedCards: PlayedCard<PokeCard>[] = [];

    constructor() {
        const deck = new PokeDeck();
        super(deck);
        this.deck = deck;
    }

    public override initializeTableCards(): void {
        // 撲克牌遊戲不需要初始翻牌
    }
    
    public override afterPlayCard(tableCards: PokeCard[]): void {
        const lastCard = tableCards[tableCards.length - 1];
        const currentPlayer = this.getCurrentPlayer();
        // 行別太麻煩搬過來自己處理格式
        this.playedCards.push({
            player: currentPlayer as PokerPlayer,
            card: lastCard
        });

        if (this.playedCards.length === this.players.length) {
            this.handleRoundEnd();
        }
    }

    private handleRoundEnd(): void {
        const winner = this.determineRoundWinner();
        if (winner) {
            winner.addPoints();
        }
        this.playedCards = [];
        this.tableCards = [];
    }

    public override beforeDrawCardCheck(): void {
        // Poke 不需要補牌
    }

    public override getInitialCardCount(): number {
        return 13;
    }

    public override isGameOver(): boolean {
        return this.rounds >= 13;
    }

    public override getWinner(): PokerPlayer | null {
        let maxPoints = -1;
        let winner: PokerPlayer | null = null;
        
        for (const player of this.players) {
            const pointPlayer = player as PokerPlayer;
            const points = pointPlayer.getPoints();
            if (points > maxPoints) {
                maxPoints = points;
                winner = pointPlayer;
            }
        }
        
        return winner;
    }

    private determineRoundWinner(): PokerPlayer | null {
        const playedCards = this.playedCards;
        if (playedCards.length === 0) return null;

        let winningCard = playedCards[0];
        for (let i = 1; i < playedCards.length; i++) {
            if (playedCards[i].card.compareTo(winningCard.card) > 0) {
                winningCard = playedCards[i];
            }
        }
        return winningCard.player as PokerPlayer;
    }
}