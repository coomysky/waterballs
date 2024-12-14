import { Game } from '../Game';
import { Player } from '../Player';
import { HumanPlayer } from '../HumanPlayer';
import { AIPlayer } from '../AIPlayer';

describe('遊戲流程測試', () => {
    let game: Game;
    let players: Player[];

    beforeEach(() => {
        game = new Game();
        players = [
            new AIPlayer(),
            new AIPlayer(),
            new AIPlayer(),
            new AIPlayer()
        ];

        // 設置玩家名稱
        players.forEach((player, index) => {
            player.setName(`P${index + 1}`);
        });
    });

    describe('完整遊戲流程', () => {
        it('應該可以完整執行一場遊戲', () => {
            // 開始遊戲並發牌
            game.startGame(players);
            
            // 檢查初始狀態
            expect(game.getCurrentRound()).toBe(0);
            expect(game.getPlayers().length).toBe(4);
            
            // 檢查每個玩家的初始手牌
            players.forEach(player => {
                expect(player.getCards().length).toBe(13);
            });

            // 進行 13 回合
            for (let i = 0; i < 13; i++) {
                expect(game.getCurrentRound()).toBe(i);
                
                // 每個回合都應該有出牌
                game.playRound();

                expect(game.getPlayedCards().length).toBe(4);
                
                // 檢查回合數增加
                expect(game.getCurrentRound()).toBe(i + 1);
            }

            // 檢查遊戲結束狀態
            expect(game.getCurrentRound()).toBe(13);
            
            // 確認所有玩家都出完牌了
            players.forEach(player => {
                expect(player.getCards().length).toBe(0);
            });

            // 確認遊戲有贏家，且贏家有得分
            const winner = game.getWinner();
            expect(winner).toBeDefined();
            expect(winner.getPoints()).toBeGreaterThan(0);

            // 確認遊戲結束後不能再進行回合
            expect(() => game.playRound())
                .toThrow('Game is over');
        });

        it('應該可以正確處理換手牌功能', () => {
            // 先設置玩家，但不開始遊戲（避免自動執行回合）
            game.setPlayers(players);
            game.drawInitCard();  // 發初始手牌

            // 記錄初始手牌
            const p1Cards = [...players[0].getCards()];
            const p2Cards = [...players[1].getCards()];

            // 執行換手牌
            players[0].selectExchangeHands(players[1]);

            // 檢查手牌是否正確交換
            expect(players[0].getCards()).toEqual(p2Cards);
            expect(players[1].getCards()).toEqual(p1Cards);
            expect(players[0].getHasChangeHands()).toBe(true);

            // 確認不能重複換手牌
            expect(() => game.exchangeHands(players[0], players[2]))
                .toThrow('Exchange hands privilege already used');

            // 確認不能與自己換手牌
            expect(() => game.exchangeHands(players[2], players[2]))
                .toThrow('Cannot exchange hands with yourself');
        });
    });

    describe('真人玩家測試', () => {
        let game: Game;
        let humanPlayer: HumanPlayer;
        let aiPlayers: AIPlayer[];

        beforeEach(() => {
            game = new Game();
            humanPlayer = new HumanPlayer();
            humanPlayer.setName('Human');

            aiPlayers = Array(3).fill(null).map((_, i) => {
                const player = new AIPlayer();
                player.setName(`AI${i + 1}`);
                return player;
            });

            // 設置所有玩家
            game.startGame([humanPlayer, ...aiPlayers]);
        });

        it('真人玩家必須手動選擇卡牌', () => {
            // 檢查初始狀態
            expect(humanPlayer.getCards().length).toBe(13);
            
            // 嘗試直接調用 takeRound 應該拋出錯誤
            expect(() => humanPlayer.takeRound())
                .toThrow('Human player must choose a card');
            
            // 手動選擇一張牌
            const selectedCard = humanPlayer.getCards()[0];
            const playedCard = humanPlayer.chooseCard(selectedCard);
            
            // 確認卡牌被正確打出
            expect(playedCard).toBeDefined();
            expect(playedCard.equals(selectedCard)).toBe(true);
            expect(humanPlayer.getCards().length).toBe(12);
        });

        it('真人玩家不能選擇不存在於手牌中的卡牌', () => {
            // 從另一個玩家取得一張牌
            const otherPlayerCard = aiPlayers[0].getCards()[0];
            
            // 嘗試選擇不存在於手牌中的卡牌應該拋出錯誤
            expect(() => humanPlayer.chooseCard(otherPlayerCard))
                .toThrow('Card not in hand');
            
            // 確認手牌數量沒有變化
            expect(humanPlayer.getCards().length).toBe(13);
        });

        it('真人玩家可以選擇與其他玩家換牌', () => {
            // 記錄初始手牌
            const humanCards = [...humanPlayer.getCards()];
            const aiCards = [...aiPlayers[0].getCards()];
            
            // 執行換牌
            humanPlayer.selectExchangeHands(aiPlayers[0]);
            
            // 驗證手牌已經交換
            expect(humanPlayer.getCards()).toEqual(aiCards);
            expect(aiPlayers[0].getCards()).toEqual(humanCards);
            
            // 確認已經使用過換牌特權
            expect(humanPlayer.getHasChangeHands()).toBe(true);
            
            // 不能再次換牌
            expect(() => humanPlayer.selectExchangeHands(aiPlayers[1]))
                .toThrow('Exchange hands privilege already used');
        });

        it('真人玩家不能與自己換牌', () => {
            expect(() => humanPlayer.selectExchangeHands(humanPlayer))
                .toThrow('Cannot exchange hands with yourself');
        });

        it('回合中有玩家沒有手牌的情況', () => {
            // 移除真人玩家的所有手牌
            while (humanPlayer.getCards().length > 0) {
                const card = humanPlayer.getCards()[0];
                humanPlayer.showCard(card);
            }
            
            // 執行回合
            game.playRound();
            
            // 檢查只有還有手牌的玩家出牌
            const playedCards = game.getPlayedCards();
            expect(playedCards.length).toBe(3); // 只有3個AI玩家出牌
            
            // 確認沒有手牌的玩家沒有參與這回合
            const playedPlayerNames = playedCards.map(pc => pc.player.getName());
            expect(playedPlayerNames).not.toContain(humanPlayer.getName());
            
            // 檢查回合數仍然正確增加
            expect(game.getCurrentRound()).toBe(1);
        });
    });
});
