import { Individual } from '../Individual';
import { Strategy } from './Strategy';

export abstract class AbstractStrategy implements Strategy {
  match(individual: Individual, candidates: Individual[]): Individual {
    if (candidates.length === 0) {
      throw new Error('No candidates available for matching');
    }

    return candidates
      .filter((candidate) => candidate.id !== individual.id)
      .sort((a, b) => {
        const scoreA = this.calculateScore(individual, a);
        const scoreB = this.calculateScore(individual, b);
        
        if (scoreA === scoreB) {
          return a.id - b.id; // 相同時選擇 ID 小的
        }
        
        return this.compareScore(scoreA, scoreB);
      })[0];
  }

  protected abstract calculateScore(individual: Individual, candidate: Individual): number;
  protected abstract compareScore(scoreA: number, scoreB: number): number;
}
