import { PokeGame } from '../poke/PokeGame';
import { UnoGame } from '../uno/UnoGame';
import { PokerPlayer } from '../poke/PokerPlayer';
import { UnoPlayer } from '../uno/UnoPlayer';

describe('史詩級卡牌遊戲大亂鬥', () => {
    describe('德州撲克：這不是德州撲克', () => {
        test('全AI對戰：機器人大亂鬥', () => {
            const aiGame = new PokeGame();
            const allAiPlayers = [
                new PokerPlayer('AI戰士'),
                new PokerPlayer('AI法師'),
                new PokerPlayer('AI盜賊'),
                new PokerPlayer('AI祭司')
            ];
            aiGame.setPlayers(allAiPlayers);
            aiGame.start();

            // 
            expect(aiGame.getPlayers().length).toBe(4);

            // 進行遊戲
            while (!aiGame.isGameOver()) {
                const currentPlayer = aiGame.getCurrentPlayer();
                const initialCardCount = currentPlayer.getCards().length;
                const playedCard = currentPlayer.takeRound(null);
                
                // 檢查每個回合的狀態
                expect(playedCard).toBeDefined();
                expect(currentPlayer.getCards().length).toBe(initialCardCount - 1);
                aiGame.playRound();
            }

        
            expect(aiGame.getRounds()).toBe(13);
            const winner = aiGame.getWinner();
            expect(winner).toBeDefined();
            expect(allAiPlayers).toContain(winner);
            expect(winner?.getPoints()).toBeGreaterThan(0);
        });
    });

    describe('UNO： 我公司樓下有間餐廳也叫UNO', () => {
        test('全AI對戰：UNO機器人大賽', () => {
            const aiGame = new UnoGame();
            const allAiPlayers = [
                new UnoPlayer('AI紅隊'),
                new UnoPlayer('AI藍隊'),
                new UnoPlayer('AI綠隊'),
                new UnoPlayer('AI黃隊')
            ];
            aiGame.setPlayers(allAiPlayers);
            aiGame.start();

            // 檢查初始狀態
            expect(aiGame.getPlayers().length).toBe(4);

            // 進行遊戲
            let maxRounds = 100; // <-- 怕無限列車
            while (!aiGame.isGameOver() && maxRounds > 0) {
                const currentPlayer = aiGame.getCurrentPlayer();
                const topCard = aiGame.getCurrentCard();
                const playableCards = currentPlayer.getPlayableCards(topCard);
                const initialCardCount = currentPlayer.getCards().length;
                
                // 進行回合
                const playedCard = aiGame.playRound();
                
                // 如果沒有可出的牌，檢查是否有抽牌
                if (playableCards.length === 0) {
                    expect(currentPlayer.getCards().length).toBeGreaterThan(initialCardCount);
                } else if (playedCard) {
                    // 如果有出牌，檢查手牌數量是否減少
                    expect(currentPlayer.getCards().length).toBe(initialCardCount - 1);
                }
                
                maxRounds--;
            }

            
            expect(maxRounds).toBeGreaterThan(0); 
            const winner = aiGame.getWinner();
            expect(winner).toBeDefined();
            expect(allAiPlayers).toContain(winner);
            expect(winner?.getCards().length).toBe(0); // UNO 贏家手牌應該為 0
        });
    });
});
