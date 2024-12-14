import { Individual } from '../Individual';
import { AbstractStrategy } from './AbstractStrategy';

export class DistanceBasedStrategy extends AbstractStrategy {
  protected calculateScore(individual: Individual, candidate: Individual): number {
    return Math.pow(candidate.coord.y - individual.coord.y, 2) + 
           Math.pow(candidate.coord.x - individual.coord.x, 2);
  }

  protected compareScore(scoreA: number, scoreB: number): number {
    return scoreA - scoreB; // 選距離近的
  }
}