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

        // 執行所有回合
        game.startRounds();

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
});

describe('玩家測試', () => {
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

        game.startGame([humanPlayer, ...aiPlayers]);
    });

    it('真人玩家必須手動選擇卡牌', () => {
        expect(humanPlayer.getCards().length).toBe(13);
        
        // 未選擇卡牌時應該拋出錯誤
        expect(() => humanPlayer.takeRound())
            .toThrow('Human player must choose a card');
        
        // 手動選擇一張牌
        const selectedCard = humanPlayer.getCards()[0];
        const card = humanPlayer.chooseCard(selectedCard);
        
        expect(card).toBeDefined();
        expect(card.equals(selectedCard)).toBe(true);
        
        const playedCard = humanPlayer.playCard(selectedCard);
        expect(playedCard.equals(selectedCard)).toBe(true);
        expect(humanPlayer.getCards().length).toBe(12);
    });
});
