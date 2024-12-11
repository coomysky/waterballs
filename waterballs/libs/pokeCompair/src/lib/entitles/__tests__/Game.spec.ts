import { Game } from '../Game';
import { Player } from '../Player';
import { Deck } from '../Deck';

describe('Game Initialization', () => {
    let game: Game;

    beforeEach(() => {
        game = new Game();
    });

    describe('Player Setup', () => {
        it('should not allow less than 4 players', () => {
            const players: Player[] = [
                new Player(),
                new Player(),
                new Player()
            ];

            expect(() => game.startGame(players)).toThrow('should has 4 players');
        });

        it('should allow exactly 4 players', () => {
            const players: Player[] = [
                new Player(),
                new Player(),
                new Player(),
                new Player()
            ];

            game.startGame(players);
            expect(game.getPlayers().length).toBe(4);
        });

        it('should not allow more than 4 players', () => {
            const players: Player[] = [
                new Player(),
                new Player(),
                new Player(),
                new Player(),
                new Player()
            ];

            expect(() => game.startGame(players)).toThrow('should has 4 players');
        });
    });

    describe('Player Naming', () => {
        it('should allow players to set their names', () => {
            const players: Player[] = [
                new Player(),
                new Player(),
                new Player(),
                new Player()
            ];

            game.startGame(players);
            
            players[0].setName('P1');
            players[1].setName('P2');
            players[2].setName('P3');
            players[3].setName('P4');

            const gamePlayers = game.getPlayers();
            expect(gamePlayers[0].getName()).toBe('P1');
            expect(gamePlayers[1].getName()).toBe('P2');
            expect(gamePlayers[2].getName()).toBe('P3');
            expect(gamePlayers[3].getName()).toBe('P4');
        });

        it('should not allow empty player names', () => {
            const player = new Player();
            expect(() => player.setName('')).toThrow('Player name cannot be empty');
        });
    });

    describe('初始抽牌每個玩家手中要有13張手牌', () => {
        let players: Player[];

        beforeEach(() => {
            players = [
                new Player(),
                new Player(),
                new Player(),
                new Player()
            ];
            game.startGame(players);
        });

        it('每個人要發13張牌', () => {
            game.drawInitCard();
            
            for (const player of players) {
                expect(player.getHand().getCards().length).toBe(13);
            }
        });

        it('牌堆沒牌抽不到牌應該要拋錯誤', () => {
            const deck = new Deck();
            for (let i = 0; i < 51; i++) {
                deck.drawCard();  // 只留一張牌
            }
            game.setDeck(deck);

            expect(() => game.drawInitCard()).toThrow('No cards left in deck');
        });
    });
});
