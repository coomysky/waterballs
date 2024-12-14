import { HabitBasedStrategy } from './HabitBasedStrategy';

export class RevertHabitBasedStrategy extends HabitBasedStrategy {

  protected compareScore(scoreA: number, scoreB: number): number {
    return scoreA - scoreB; // 選性趣少的
  }
}