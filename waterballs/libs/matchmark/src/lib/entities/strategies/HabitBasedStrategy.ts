import { Individual } from '../Individual';
import { AbstractStrategy } from './AbstractStrategy';

export class HabitBasedStrategy extends AbstractStrategy {
  protected calculateScore(individual: Individual, candidate: Individual): number {
    const set1 = new Set(individual.habits);
    return candidate.habits.filter(habit => set1.has(habit)).length;
  }

  protected compareScore(scoreA: number, scoreB: number): number {
    return scoreB - scoreA; // 選性趣多的
  }
}