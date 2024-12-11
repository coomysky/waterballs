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

    describe('初始抽牌每個玩家手中要有五張手牌', () => {
        let players: Player[];

        beforeEach(() => {
            players = [
                new Player(),
                new Player(),
                new Player(),
                new Player()
            ];
            game.setPlayers(players);
        });

       

        it('每個人要發五張牌', () => {
            game.drawInitCard();
            
            for (const player of players) {
                expect(player.getCards().length).toBe(5);
            }
        });

        it('牌堆沒牌抽不到牌應該要拋錯誤', () => {
            // Create a deck with only 19 cards (not enough for 4 players to get 5 cards each)
            const deck = new Deck();
            for (let i = 0; i < 21; i++) {
                deck.drawCard();  // Remove cards until there aren't enough
            }
            game.setDeck(deck);

            expect(() => game.drawInitCard()).toThrow('Not enough cards in deck for draw phase');
        });
    });

    describe('Game Start', () => {
        beforeEach(() => {
            const players: Player[] = [
                new Player(),
                new Player(),
                new Player(),
                new Player()
            ];
            game.setPlayers(players);
        });

        it('應該要在遊戲開始時翻出第一張牌且放到檯面上', () => {
        
            expect(game.getTableCards().length).toBe(0); // 遊戲開始前檯面上沒有牌

            
            game.start();
            
            const currentCard = game.getCurrentCard();
            const tableCards = game.getTableCards()
            expect(tableCards).not.toBeNull(); // 遊戲開始後檯面上有牌
            expect(currentCard).toEqual(tableCards[0]); // 最新的牌應該跟是檯面上的牌一樣

        });

        it('翻出的牌應該要從牌堆中移除', () => {
            const initialDeckCount = game.getDeck().getCardsCount();
            
            game.start();
            
            expect(game.getDeck().getCardsCount()).toBe(initialDeckCount - 1);
        });
    });

    describe('輪流出牌', () => {
        let players: Player[];
        let deck: Deck;

        beforeEach(() => {
            players = [
                new Player(),
                new Player(),
                new Player(),
                new Player()
            ];
            game.setPlayers(players);
            
            // 初始化牌堆
            deck = new Deck();
            game.setDeck(deck);
            
            // 開始遊戲
            game.start();
            game.drawInitCard();
        });

        it('玩家應該按照順序輪流出牌', () => {
            const firstPlayer = game.getCurrentPlayer();
            expect(firstPlayer).toBe(players[0]);

            // 假設第一位玩家出了一張牌
            game.playCard(firstPlayer.getCards()[0]);
            expect(game.getCurrentPlayer()).toBe(players[1]);

            // 第二位玩家出牌
            game.playCard(players[1].getCards()[0]);
            expect(game.getCurrentPlayer()).toBe(players[2]);

            // 第三位玩家出牌
            game.playCard(players[2].getCards()[0]);
            expect(game.getCurrentPlayer()).toBe(players[3]);

            // 第四位玩家出牌
            game.playCard(players[3].getCards()[0]);
            expect(game.getCurrentPlayer()).toBe(players[0]); // 回到第一位玩家
        });

        it('玩家出的牌必須與檯面上的牌顏色或數字相同', () => {
            const currentPlayer = game.getCurrentPlayer();
            const topCard = game.getCurrentCard();
            if (!topCard) {
                throw new Error('No card on table');
            }

            // 創建一張不能出的牌（顏色和數字都不同）
            let invalidColor = Object.values(Color).find(color => color !== topCard.getColor());
            if (!invalidColor) {
                throw new Error('Cannot find invalid color');
            }
            const invalidCard = new Card(invalidColor, (topCard.getNumber() + 1) % 10);
            
            // 將這張牌加入玩家手牌
            currentPlayer.addCard(invalidCard);
            
            // 嘗試出這張牌應該會失敗
            expect(() => game.playCard(invalidCard)).toThrow('Card is not playable');
        });

        it('當牌堆沒牌時，應該重新洗牌', () => {
            // 抽光牌堆中的牌
            while (game.getDeck().getCardsCount() > 0) {
                game.getDeck().drawCard();
            }

            // 當前玩家抽牌
            game.drawCardFromDeck();

            // 確認玩家有拿到牌（表示重新洗牌成功）
            expect(game.getCurrentPlayer().getCards().length).toBeGreaterThan(0);
        });

        it('玩家手上沒有可出的牌時必須抽牌', () => {
            const currentPlayer = game.getCurrentPlayer();
            const initialHandSize = currentPlayer.getCards().length;
            const topCard = game.getCurrentCard();
            if (!topCard) {
                throw new Error('No card on table');
            }

            // 確保玩家手上沒有可出的牌
            while (currentPlayer.hasPlayableCard(topCard)) {
                currentPlayer.playCard(currentPlayer.getCards()[0]);
            }

            // 玩家抽牌
            game.drawCardFromDeck();

            // 確認玩家手牌數量增加
            expect(game.getCurrentPlayer().getCards().length).toBe(initialHandSize + 1);
        });
    });
});
