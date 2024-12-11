import { Game } from '../Game';
import { Player } from '../Player';

describe('遊戲流程測試', () => {
    let game: Game;
    let players: Player[];

    beforeEach(() => {
        game = new Game();
        players = [
            new Player(),
            new Player(),
            new Player(),
            new Player()
        ];

        // 設置玩家名稱和類型
        players.forEach((player, index) => {
            player.setName(`P${index + 1}`);
            player.setIsHuman(false); // 在測試中都設為 AI 玩家
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
});
