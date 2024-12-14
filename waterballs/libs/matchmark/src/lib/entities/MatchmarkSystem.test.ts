import { Individual, IndividualProps } from './Individual';
import { MatchmarkSystem } from './MatchmarkSystem';
import { DistanceBasedStrategy } from './strategies/DistanceBasedStrategy';
import { HabitBasedStrategy } from './strategies/HabitBasedStrategy';
import { RevertDistanceBasedStrategy } from './strategies/RevertDistanceBasedStrategy';
import { RevertHabitBasedStrategy } from './strategies/RevertHabitBasedStrategy';

describe('月老系統整合測試..', () => {
  let matchmarkSystem: MatchmarkSystem;
  let individuals: IndividualProps[];

  beforeEach(() => {
    individuals = [
      {
        id: 1,
        gender: 'MALE',
        age: 25,
        intro: '我喜歡運動和閱讀',
        habits: ['運動', '閱讀', '旅遊'],
        coord: { x: 0, y: 0 }
      },
      {
        id: 2,
        gender: 'FEMALE',
        age: 23,
        intro: '喜歡烹飪和看電影',
        habits: ['烹飪', '電影', '旅遊'],
        coord: { x: 3, y: 4 }
      },
      {
        id: 3,
        gender: 'MALE',
        age: 28,
        intro: '熱愛運動和音樂',
        habits: ['運動', '音樂'],
        coord: { x: 6, y: 8 }
      },
      {
        id: 4,
        gender: 'FEMALE',
        age: 26,
        intro: '喜歡閱讀和運動',
        habits: ['運動', '閱讀', '音樂', '旅遊'],
        coord: { x: 1, y: 1 }
      }
    ];

    matchmarkSystem = new MatchmarkSystem(individuals);
  });

  describe('近水樓台先得月 - 距離策略', () => {
    it('應該配對到最近的對象，是多想黏再一起？', () => {
      const strategy = new DistanceBasedStrategy();
      const individual = new Individual(individuals[0]); // 位於 (0,0)
      const match = matchmarkSystem.match(individual, strategy);
      
      // 最近的應該是 id=4 的個體，位於 (1,1)
      expect(match.id).toBe(4);
    });

    it('應該配對到最遠的對象，是不是怕見到面！ 顆顆', () => {
      const strategy = new RevertDistanceBasedStrategy();
      const individual = new Individual(individuals[0]); // 位於 (0,0)
      const match = matchmarkSystem.match(individual, strategy);
      
      // 最遠的應該是 id=3 的個體，位於 (6,8)
      expect(match.id).toBe(3);
    });
  });

  describe('臭味相投 - 興趣策略', () => {
    it('應該配對到興趣最相投的對象，一起燃燒小宇宙的概念吧', () => {
      const strategy = new HabitBasedStrategy();
      const individual = new Individual(individuals[0]); 
      const match = matchmarkSystem.match(individual, strategy);
      
      // id=4 的個體有最多共同興趣 ['運動', '閱讀', '旅遊']
      expect(match.id).toBe(4);
    });

    it('應該配對到興趣最不合的對象,是要找吵架的對象媽？ ＸＤＤ', () => {
      const strategy = new RevertHabitBasedStrategy();
      const individual = new Individual(individuals[0]); 
      const match = matchmarkSystem.match(individual, strategy);
      
      // id=2 的個體有最少共同興趣 ['旅遊']
      expect(match.id).toBe(2);
    });
  });

  describe('奇奇怪怪的情況', () => {
    it('系統裡只有一個人時要拋出錯誤，孤單寂寞覺得冷', () => {
      const props = individuals[0];
      const soloSystem = new MatchmarkSystem([props]);
      const strategy = new DistanceBasedStrategy();
      const individual = new Individual(props);
      
      expect(() => soloSystem.match(individual, strategy)).toThrow('你很衰 現在沒人可以配對！');
    });

    it('距離一樣時要選ID小的，畢竟先來後到很重要', () => {
      const sameDistanceIndividuals: IndividualProps[] = [
        {
          id: 1,
          gender: 'MALE',
          age: 25,
          intro: 'test',
          habits: ['運動'],
          coord: { x: 0, y: 0 }
        },
        {
          id: 2,
          gender: 'FEMALE',
          age: 23,
          intro: 'test',
          habits: ['閱讀'],
          coord: { x: 3, y: 0 }
        },
        {
          id: 3,
          gender: 'FEMALE',
          age: 24,
          intro: 'test',
          habits: ['音樂'],
          coord: { x: 3, y: 0 } // 跟 id=2 的位置一樣
        }
      ];

      const system = new MatchmarkSystem(sameDistanceIndividuals);
      const strategy = new DistanceBasedStrategy();
      const individual = new Individual(sameDistanceIndividuals[0]);
      const match = system.match(individual, strategy);
      
      // 當距離相同時，選擇 ID 小的
      expect(match.id).toBe(2);
    });

    it('共同興趣數量一樣時要選ID小的，誰叫你動作慢', () => {
      const sameHabitsIndividuals: IndividualProps[] = [
        {
          id: 1,
          gender: 'MALE',
          age: 25,
          intro: 'test',
          habits: ['運動', '閱讀'],
          coord: { x: 0, y: 0 }
        },
        {
          id: 2,
          gender: 'FEMALE',
          age: 23,
          intro: 'test',
          habits: ['運動', '音樂'],
          coord: { x: 1, y: 1 }
        },
        {
          id: 3,
          gender: 'FEMALE',
          age: 24,
          intro: 'test',
          habits: ['運動', '旅遊'],
          coord: { x: 2, y: 2 }
        }
      ];

      const system = new MatchmarkSystem(sameHabitsIndividuals);
      const strategy = new HabitBasedStrategy();
      const individual = new Individual(sameHabitsIndividuals[0]);
      const match = system.match(individual, strategy);
      
      // 共同興趣數量相同時，選擇 ID 小的
      expect(match.id).toBe(2);
    });
  });
});
