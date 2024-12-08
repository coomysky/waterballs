import { Game } from '../Game';
import { Player } from '../Player';

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

            expect(() => game.setPlayers(players)).toThrow('should has 4 players');
        });

        it('should allow exactly 4 players', () => {
            const players: Player[] = [
                new Player(),
                new Player(),
                new Player(),
                new Player()
            ];

            game.setPlayers(players);
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

            expect(() => game.setPlayers(players)).toThrow('should has 4 players');
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

            game.setPlayers(players);
            
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
});
