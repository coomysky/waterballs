import { DistanceBasedStrategy } from './DistanceBasedStrategy';

export class RevertDistanceBasedStrategy extends DistanceBasedStrategy {
  
  protected compareScore(scoreA: number, scoreB: number): number {
    return scoreB - scoreA; // 選遠的
  }
}